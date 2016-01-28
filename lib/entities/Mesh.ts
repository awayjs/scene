import ImageBase					= require("awayjs-core/lib/image/ImageBase");
import SamplerBase					= require("awayjs-core/lib/image/SamplerBase");
import Box							= require("awayjs-core/lib/geom/Box");
import Matrix						= require("awayjs-core/lib/geom/Matrix");
import Point						= require("awayjs-core/lib/geom/Point");
import Vector3D						= require("awayjs-core/lib/geom/Vector3D");

import IRenderer					= require("awayjs-display/lib/IRenderer");
import IAnimator					= require("awayjs-display/lib/animators/IAnimator");
import DisplayObject				= require("awayjs-display/lib/base/DisplayObject");
import ISubMesh						= require("awayjs-display/lib/base/ISubMesh");
import Geometry						= require("awayjs-display/lib/base/Geometry");
import SubGeometryBase				= require("awayjs-display/lib/base/SubGeometryBase");
import CurveSubGeometry				= require("awayjs-display/lib/base/CurveSubGeometry");
import GeometryEvent				= require("awayjs-display/lib/events/GeometryEvent");
import DisplayObjectContainer		= require("awayjs-display/lib/containers/DisplayObjectContainer");
import SubMeshPool					= require("awayjs-display/lib/pool/SubMeshPool");
import IEntity						= require("awayjs-display/lib/entities/IEntity");
import MaterialBase					= require("awayjs-display/lib/materials/MaterialBase");
import TextureBase					= require("awayjs-display/lib/textures/TextureBase");
import SubGeometryUtils				= require("awayjs-display/lib/utils/SubGeometryUtils");
import Style						= require("awayjs-display/lib/base/Style");
import StyleEvent					= require("awayjs-display/lib/events/StyleEvent");

/**
 * Mesh is an instance of a Geometry, augmenting it with a presence in the scene graph, a material, and an animation
 * state. It consists out of SubMeshes, which in turn correspond to SubGeometries. SubMeshes allow different parts
 * of the geometry to be assigned different materials.
 */
class Mesh extends DisplayObjectContainer implements IEntity
{
	private static _meshes:Array<Mesh> = new Array<Mesh>();

	public static assetType:string = "[asset Mesh]";

	private _uvTransform:Matrix;
	private _style:Style;

	private _center:Vector3D;
	public _subMeshes:Array<ISubMesh>;
	public _geometry:Geometry;
	private _material:MaterialBase;
	private _animator:IAnimator;
	private _castsShadows:boolean = true;
	private _shareAnimationGeometry:boolean = true;

	public _onGeometryBoundsInvalidDelegate:(event:GeometryEvent) => void;
	public _onSubGeometryAddedDelegate:(event:GeometryEvent) => void;
	public _onSubGeometryRemovedDelegate:(event:GeometryEvent) => void;
	private _onInvalidatePropertiesDelegate:(event:StyleEvent) => void;

	//temp point used in hit testing
	private _tempPoint:Point = new Point();
	/**
	 * Defines the animator of the mesh. Act on the mesh's geometry.  Default value is <code>null</code>.
	 */
	public get animator():IAnimator
	{
		return this._animator;
	}

	public set animator(value:IAnimator)
	{
		if (this._animator)
			this._animator.removeOwner(this);

		this._animator = value;

		var len:number = this._subMeshes.length;
		var subMesh:ISubMesh;

		for (var i:number = 0; i < len; ++i) {
			subMesh = this._subMeshes[i];

			// cause material to be unregistered and registered again to work with the new animation type (if possible)
			if (subMesh.material) {
				subMesh.material.iRemoveOwner(subMesh);
				subMesh.material.iAddOwner(subMesh);
			}

			//invalidate any existing renderables in case they need to pull new geometry
			subMesh.invalidateGeometry();
		}

		if (this._animator)
			this._animator.addOwner(this);
	}

	/**
	 *
	 */
	public get assetType():string
	{
		return Mesh.assetType;
	}

	/**
	 * Indicates whether or not the Mesh can cast shadows. Default value is <code>true</code>.
	 */
	public get castsShadows():boolean
	{
		return this._castsShadows;
	}

	public set castsShadows(value:boolean)
	{
		this._castsShadows = value;
	}

	/**
	 * The geometry used by the mesh that provides it with its shape.
	 */
	public get geometry():Geometry
	{
		if (this._iSourcePrefab)
			this._iSourcePrefab._iValidate();

		return this._geometry;
	}

	public set geometry(value:Geometry)
	{
		if (this._geometry == value)
			return;

		var i:number;

		if (this._geometry) {
			this._geometry.removeEventListener(GeometryEvent.BOUNDS_INVALID, this._onGeometryBoundsInvalidDelegate);
			this._geometry.removeEventListener(GeometryEvent.SUB_GEOMETRY_ADDED, this._onSubGeometryAddedDelegate);
			this._geometry.removeEventListener(GeometryEvent.SUB_GEOMETRY_REMOVED, this._onSubGeometryRemovedDelegate);

			for (i = 0; i < this._subMeshes.length; ++i) {
				this._subMeshes[i].clear();
				this._subMeshes[i].dispose();
			}

			this._subMeshes.length = 0;
		}

		this._geometry = value;

		if (this._geometry) {

			this._geometry.addEventListener(GeometryEvent.BOUNDS_INVALID, this._onGeometryBoundsInvalidDelegate);
			this._geometry.addEventListener(GeometryEvent.SUB_GEOMETRY_ADDED, this._onSubGeometryAddedDelegate);
			this._geometry.addEventListener(GeometryEvent.SUB_GEOMETRY_REMOVED, this._onSubGeometryRemovedDelegate);

			var subGeoms:Array<SubGeometryBase> = this._geometry.subGeometries;

			for (i = 0; i < subGeoms.length; ++i)
				this.addSubMesh(subGeoms[i]);
		}
	}

	/**
	 * The material with which to render the Mesh.
	 */
	public get material():MaterialBase
	{
		return this._material;
	}

	public set material(value:MaterialBase)
	{
		if (value == this._material)
			return;

		var i:number;
		var len:number = this._subMeshes.length;
		var subMesh:ISubMesh;

		if (this._material)
			for (i = 0; i < len; i++)
				if ((subMesh = this._subMeshes[i]).material == this._material)
					this._material.iRemoveOwner(subMesh);

		this._material = value;

		if (this._material)
			for (i = 0; i < len; i++)
				if ((subMesh = this._subMeshes[i]).material == this._material)
					this._material.iAddOwner(subMesh);
	}

	/**
	 * Indicates whether or not the mesh share the same animation geometry.
	 */
	public get shareAnimationGeometry():boolean
	{
		return this._shareAnimationGeometry;
	}

	public set shareAnimationGeometry(value:boolean)
	{
		this._shareAnimationGeometry = value;
	}

	/**
	 * The SubMeshes out of which the Mesh consists. Every SubMesh can be assigned a material to override the Mesh's
	 * material.
	 */
	public get subMeshes():Array<ISubMesh>
	{
		// Since this getter is invoked every iteration of the render loop, and
		// the prefab construct could affect the sub-meshes, the prefab is
		// validated here to give it a chance to rebuild.
		if (this._iSourcePrefab)
			this._iSourcePrefab._iValidate();

		return this._subMeshes;
	}

	/**
	 *
	 */
	public get uvTransform():Matrix
	{
		return this._uvTransform;
	}

	public set uvTransform(value:Matrix)
	{
		this._uvTransform = value;
	}

	/**
	 *
	 */
	public get style():Style
	{
		return this._style;
	}

	public set style(value:Style)
	{
		if (this._style == value)
			return;

		if (this._style)
			this._style.removeEventListener(StyleEvent.INVALIDATE_PROPERTIES, this._onInvalidatePropertiesDelegate);

		this._style = value;

		if (this._style)
			this._style.addEventListener(StyleEvent.INVALIDATE_PROPERTIES, this._onInvalidatePropertiesDelegate);

		this._iInvalidateRenderOwners();
	}

	/**
	 * Create a new Mesh object.
	 *
	 * @param geometry                    The geometry used by the mesh that provides it with its shape.
	 * @param material    [optional]        The material with which to render the Mesh.
	 */
	constructor(geometry:Geometry, material:MaterialBase = null)
	{
		super();

		this._pIsEntity = true;

		this._subMeshes = new Array<ISubMesh>();

		this._onGeometryBoundsInvalidDelegate = (event:GeometryEvent) => this.onGeometryBoundsInvalid(event);
		this._onSubGeometryAddedDelegate = (event:GeometryEvent) => this.onSubGeometryAdded(event);
		this._onSubGeometryRemovedDelegate = (event:GeometryEvent) => this.onSubGeometryRemoved(event);
		this._onInvalidatePropertiesDelegate = (event:StyleEvent) => this._onInvalidateProperties(event);

		//this should never happen, but if people insist on trying to create their meshes before they have geometry to fill it, it becomes necessary
		this.geometry = geometry || new Geometry();

		this.material = material;
	}

	/**
	 *
	 */
	public bakeTransformations()
	{
		this.geometry.applyTransformation(this.transform.matrix3D);
		this.transform.clearMatrix3D();
	}

	/**
	 * @inheritDoc
	 */
	public dispose()
	{
		this.disposeValues();

		Mesh._meshes.push(this);
	}

	/**
	 * @inheritDoc
	 */
	public disposeValues()
	{
		super.disposeValues();

		this.material = null;
		this.geometry = null;

		if (this._animator)
			this._animator.dispose();
	}

	/**
	 * Clones this Mesh instance along with all it's children, while re-using the same
	 * material, geometry and animation set. The returned result will be a copy of this mesh,
	 * containing copies of all of it's children.
	 *
	 * Properties that are re-used (i.e. not cloned) by the new copy include name,
	 * geometry, and material. Properties that are cloned or created anew for the copy
	 * include subMeshes, children of the mesh, and the animator.
	 *
	 * If you want to copy just the mesh, reusing it's geometry and material while not
	 * cloning it's children, the simplest way is to create a new mesh manually:
	 *
	 * <code>
	 * var clone : Mesh = new Mesh(original.geometry, original.material);
	 * </code>
	 */
	public clone():Mesh
	{
		var newInstance:Mesh = (Mesh._meshes.length)? Mesh._meshes.pop() : new Mesh(this._geometry, this._material);

		this.copyTo(newInstance);

		return newInstance;
	}

	public copyTo(newInstance:Mesh)
	{
		super.copyTo(newInstance);

		if (this.isAsset(Mesh))
			newInstance.geometry = this._geometry;

		newInstance.material = this._material;
		newInstance.castsShadows = this._castsShadows;
		newInstance.shareAnimationGeometry = this._shareAnimationGeometry;

        var len:number = this._subMeshes.length;
        for (var i:number = 0; i < len; ++i){
			newInstance._subMeshes[i].material = this._subMeshes[i]._iGetExplicitMaterial();
			newInstance._subMeshes[i].style = this._subMeshes[i]._iGetExplicitStyle();
			newInstance._subMeshes[i].uvTransform = this._subMeshes[i]._iGetExplicitUVTransform();
		}


        if (this._animator)
			newInstance.animator = this._animator.clone();
    }

	/**
	 * //TODO
	 *
	 * @param subGeometry
	 * @returns {SubMeshBase}
	 */
	public getSubMeshFromSubGeometry(subGeometry:SubGeometryBase):ISubMesh
	{
		return this._subMeshes[this._geometry.subGeometries.indexOf(subGeometry)];
	}

	/**
	 * //TODO
	 *
	 * @protected
	 */
	public _pUpdateBoxBounds()
	{
		super._pUpdateBoxBounds();

		var subGeoms:Array<SubGeometryBase> = this._geometry.subGeometries;
		var len:number = subGeoms.length;
		for (var i:number = 0; i < len; i++)
			this._pBoxBounds = subGeoms[i].getBoxBounds(this._pBoxBounds);
	}


	public _pUpdateSphereBounds()
	{
		super._pUpdateSphereBounds();

		var box:Box = this.getBox();

		if (!this._center)
			this._center = new Vector3D();

		this._center.x = box.x + box.width/2;
		this._center.y = box.y + box.height/2;
		this._center.z = box.z + box.depth/2;

		var subGeoms:Array<SubGeometryBase> = this._geometry.subGeometries;
		var len:number = subGeoms.length;
		for (var i:number = 0; i < len; i++)
			this._pSphereBounds = subGeoms[i].getSphereBounds(this._center, this._pSphereBounds);
	}

	/**
	 * //TODO
	 *
	 * @private
	 */
	private onGeometryBoundsInvalid(event:GeometryEvent)
	{
		this._pInvalidateBounds();
	}

	/**
	 * Called when a SubGeometry was added to the Geometry.
	 *
	 * @private
	 */
	private onSubGeometryAdded(event:GeometryEvent)
	{
		this.addSubMesh(event.subGeometry);
	}

	/**
	 * Called when a SubGeometry was removed from the Geometry.
	 *
	 * @private
	 */
	private onSubGeometryRemoved(event:GeometryEvent)
	{
		var subMesh:ISubMesh;
		var subGeom:SubGeometryBase = event.subGeometry;
		var len:number = this._subMeshes.length;
		var i:number;

		// Important! This has to be done here, and not delayed until the
		// next render loop, since this may be caused by the geometry being
		// rebuilt IN THE RENDER LOOP. Invalidating and waiting will delay
		// it until the NEXT RENDER FRAME which is probably not desirable.
		for (i = 0; i < len; ++i) {

			subMesh = this._subMeshes[i];

			if (subMesh.subGeometry == subGeom) {
				subMesh.clear();
				subMesh.dispose();

				this._subMeshes.splice(i, 1);

				break;
			}
		}

		--len;
		for (; i < len; ++i)
			this._subMeshes[i]._iIndex = i;
	}

	/**
	 * Adds a SubMeshBase wrapping a SubGeometry.
	 *
	 * @param subGeometry
	 */
	public addSubMesh(subGeometry:SubGeometryBase)
	{
		var subMesh:ISubMesh = SubMeshPool.getNewSubMesh(subGeometry, this, null);
		var len:number = this._subMeshes.length;

		subMesh._iIndex = len;

		this._subMeshes[len] = subMesh;

		this._pInvalidateBounds();
	}

	/**
	 * //TODO
	 *
	 * @param shortestCollisionDistance
	 * @param findClosest
	 * @returns {boolean}
	 *
	 * @internal
	 */
	public _iTestCollision(shortestCollisionDistance:number, findClosest:boolean):boolean
	{
		this._pPickingCollisionVO.renderableOwner = null;

		var subMesh:ISubMesh;

		var len:number = this.subMeshes.length;
		for (var i:number = 0; i < len; ++i) {
			subMesh = this.subMeshes[i];

			if (subMesh.subGeometry._iTestCollision(this._pPickingCollider, subMesh.material, this._pPickingCollisionVO, shortestCollisionDistance)) {
				shortestCollisionDistance = this._pPickingCollisionVO.rayEntryDistance;

				this._pPickingCollisionVO.renderableOwner = subMesh;

				if (!findClosest)
					return true;
			}
		}

		return this._pPickingCollisionVO.renderableOwner != null;
	}

	/**
	 *
	 * @param renderer
	 *
	 * @internal
	 */
	public _applyRenderer(renderer:IRenderer)
	{
		// Since this getter is invoked every iteration of the render loop, and
		// the prefab construct could affect the sub-meshes, the prefab is
		// validated here to give it a chance to rebuild.
		if (this._iSourcePrefab)
			this._iSourcePrefab._iValidate();

		var len:number /*uint*/ = this._subMeshes.length;
		for (var i:number /*uint*/ = 0; i < len; i++)
			renderer._iApplyRenderableOwner(this._subMeshes[i]);
	}

	public _iInvalidateRenderableGeometries()
	{
		var len:number = this._subMeshes.length;
		for (var i:number = 0; i < len; ++i)
			this._subMeshes[i].invalidateGeometry();
	}


	public _iInvalidateRenderOwners()
	{
		var len:number = this._subMeshes.length;
		for (var i:number = 0; i < len; ++i)
			this._subMeshes[i].invalidateRenderOwner();
	}

	public _hitTestPointInternal(x:number, y:number, shapeFlag:boolean, masksFlag:boolean):boolean
	{
		if(this._geometry && this._geometry.subGeometries.length) {
			this._tempPoint.setTo(x,y);
			var local:Point = this.globalToLocal(this._tempPoint, this._tempPoint);
			var box:Box;

			//early out for box test
			if(!(box = this.getBox()).contains(local.x, local.y, 0))
				return false;

			//early out for non-shape tests
			if (!shapeFlag)
				return true;

			//ok do the geometry thing
			var subGeometries:Array<SubGeometryBase> = this._geometry.subGeometries;
			var subGeometriesCount:number = subGeometries.length;
			for(var i:number = 0; i < subGeometriesCount; i++)
				if (SubGeometryUtils.hitTestCurveGeometry(local.x, local.y, 0, box, <CurveSubGeometry> subGeometries[i]))
					return true;
		}

		return super._hitTestPointInternal(x, y, shapeFlag, masksFlag);
	}

	public clear()
	{
		super.clear();

		var len:number = this._subMeshes.length;
		for (var i:number = 0; i < len; i++)
			this._subMeshes[i].clear();
	}

	private _onInvalidateProperties(event:StyleEvent)
	{
		this._iInvalidateRenderOwners();
	}
}

export = Mesh;