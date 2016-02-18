import Point					= require("awayjs-core/lib/geom/Point");
import Box						= require("awayjs-core/lib/geom/Box");
import Vector3D					= require("awayjs-core/lib/geom/Vector3D");
import Sphere					= require("awayjs-core/lib/geom/Sphere");
import Matrix					= require("awayjs-core/lib/geom/Matrix");
import Matrix3D					= require("awayjs-core/lib/geom/Matrix3D");
import AssetBase				= require("awayjs-core/lib/library/AssetBase");

import ElementsBase				= require("awayjs-display/lib/graphics/ElementsBase");
import TriangleElements			= require("awayjs-display/lib/graphics/TriangleElements");
import Graphic					= require("awayjs-display/lib/graphics/Graphic");
import GraphicsEvent			= require("awayjs-display/lib/events/GraphicsEvent");
import Style					= require("awayjs-display/lib/base/Style");
import MaterialBase				= require("awayjs-display/lib/materials/MaterialBase");
import IAnimator 				= require("awayjs-display/lib/animators/IAnimator");
import ElementsEvent			= require("awayjs-display/lib/events/ElementsEvent");
import StyleEvent				= require("awayjs-display/lib/events/StyleEvent");
import IEntity					= require("awayjs-display/lib/entities/IEntity");
import IPickingCollider			= require("awayjs-display/lib/pick/IPickingCollider");
import PickingCollisionVO		= require("awayjs-display/lib/pick/PickingCollisionVO");
import CollectorBase			= require("awayjs-display/lib/traverse/CollectorBase");
import ElementsUtils			= require("awayjs-display/lib/utils/ElementsUtils");
import ParticleData				= require("awayjs-display/lib/animators/data/ParticleData");

/**
 *
 * Graphics is a collection of SubGeometries, each of which contain the actual geometrical data such as vertices,
 * normals, uvs, etc. It also contains a reference to an animation class, which defines how the geometry moves.
 * A Graphics object is assigned to a Mesh, a scene graph occurence of the geometry, which in turn assigns
 * the SubGeometries to its respective TriangleGraphic objects.
 *
 *
 *
 * @see away.core.base.SubGraphics
 * @see away.entities.Mesh
 *
 * @class Graphics
 */
class Graphics extends AssetBase
{
	public static assetType:string = "[asset Graphics]";

	private _onInvalidatePropertiesDelegate:(event:StyleEvent) => void;
	private _onInvalidateVerticesDelegate:(event:ElementsEvent) => void;

	private _boxBounds:Box;
	private _boxBoundsInvalid:boolean = true;
	private _sphereBounds:Sphere;
	private _sphereBoundsInvalid = true;

	private _material:MaterialBase;
	private _graphics:Array<Graphic> = new Array<Graphic>();
	private _animator:IAnimator;
	private _uvTransform:Matrix;
	private _style:Style;

	public sourceEntity:IEntity;

	public get assetType():string
	{
		return Graphics.assetType;
	}

	public particles:Array<ParticleData>;

	public numParticles:number /*uint*/;

	public get count():number
	{
		return this._graphics.length;
	}

	/**
	 * Defines the animator of the graphics object.  Default value is <code>null</code>.
	 */
	public get animator():IAnimator
	{
		return this._animator;
	}

	public set animator(value:IAnimator)
	{
		this._animator = value;

		var len:number = this._graphics.length;
		var graphic:Graphic;

		for (var i:number = 0; i < len; ++i) {
			graphic = this._graphics[i];

			// cause material to be unregistered and registered again to work with the new animation type (if possible)
			if (graphic.material) {
				graphic.material.iRemoveOwner(graphic);
				graphic.material.iAddOwner(graphic);
			}

			//invalidate any existing graphic objects in case they need to pull new elements
			graphic.invalidateElements();
		}
	}

	/*
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
	 * The material with which to render the Graphics.
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
		var len:number = this._graphics.length;
		var graphic:Graphic;

		if (this._material)
			for (i = 0; i < len; i++)
				if (!(graphic = this._graphics[i])._iGetExplicitMaterial())
					this._material.iRemoveOwner(graphic);

		this._material = value;

		if (this._material)
			for (i = 0; i < len; i++)
				if (!(graphic = this._graphics[i])._iGetExplicitMaterial())
					this._material.iAddOwner(graphic);
	}

	/**
	 * Creates a new Graphics object.
	 */
	constructor(sourceEntity:IEntity)
	{
		super();

		this._onInvalidatePropertiesDelegate = (event:StyleEvent) => this._onInvalidateProperties(event);
		this._onInvalidateVerticesDelegate = (event:ElementsEvent) => this._onInvalidateVertices(event);

		this.sourceEntity = sourceEntity;
	}

	/**
	 * Adds a GraphicBase wrapping a Elements.
	 *
	 * @param elements
	 */
	public addGraphic(elements:ElementsBase, material:MaterialBase = null, style:Style = null, uvTransform:Matrix = null)
	{
		var newGraphic:Graphic;

		if (Graphic._available.length) {
			newGraphic = Graphic._available.pop();
			newGraphic.parent = this;
			newGraphic.elements = elements;
			newGraphic.material = material;
			newGraphic.style = style;
			newGraphic.uvTransform = uvTransform;
		} else {
			newGraphic = new Graphic(this._graphics.length, this, elements, material, style, uvTransform);
		}

		this._graphics.push(newGraphic);

		elements.addEventListener(ElementsEvent.INVALIDATE_VERTICES, this._onInvalidateVerticesDelegate);

		this._invalidateBounds();
	}

	public removeGraphic(graphic:Graphic)
	{
		this._graphics.splice(this._graphics.indexOf(graphic), 1);

		graphic.elements.removeEventListener(ElementsEvent.INVALIDATE_VERTICES, this._onInvalidateVerticesDelegate);

		graphic.elements = null;
		graphic.material = null;
		graphic.style = null;

		this._invalidateBounds();
	}

	public getGraphicAt(index:number):Graphic
	{
		return this._graphics[index];
	}

	public applyTransformation(transform:Matrix3D)
	{
		var len:number = this._graphics.length;
		for (var i:number = 0; i < len; ++i)
			this._graphics[i].elements.applyTransformation(transform);
	}

	public copyTo(graphics:Graphics)
	{
		graphics.material = this._material;
		graphics.style = this.style;
		graphics.particles = this.particles;
		graphics.numParticles = this.numParticles;
		graphics.uvTransform = this.uvTransform;
		var graphic:Graphic;
		var len:number = this._graphics.length;
		for (var i:number = 0; i < len; ++i) {
			graphic = this._graphics[i];
			graphics.addGraphic(graphic.elements, graphic._iGetExplicitMaterial(), graphic._iGetExplicitStyle(), graphic._iGetExplicitUVTransform());
		}

		if (this._animator)
			graphics.animator = this._animator.clone();
	}

	/**
	 * Scales the geometry.
	 * @param scale The amount by which to scale.
	 */
	public scale(scale:number)
	{
		var len:number = this._graphics.length;
		for (var i:number = 0; i < len; ++i)
			this._graphics[i].elements.scale(scale);
	}

	public clear()
	{
		for (var i:number = this._graphics.length - 1; i>=0; i--)
			this._graphics[i].clear();
	}

	/**
	 * Clears all resources used by the Graphics object, including SubGeometries.
	 */
	public dispose()
	{
		this.material = null;

		for (var i:number = this._graphics.length - 1; i>=0; i--)
			this._graphics[i].dispose();

		if (this._animator)
			this._animator.dispose();
	}

	/**
	 * Scales the uv coordinates (tiling)
	 * @param scaleU The amount by which to scale on the u axis. Default is 1;
	 * @param scaleV The amount by which to scale on the v axis. Default is 1;
	 */
	public scaleUV(scaleU:number = 1, scaleV:number = 1)
	{
		var len:number = this._graphics.length;

		for (var i:number = 0; i < len; ++i)
			this._graphics[i].elements.scaleUV(scaleU, scaleV);
	}

	public getBoxBounds():Box
	{
		if (this._boxBoundsInvalid) {
			this._boxBoundsInvalid = false;

			if (!this._boxBounds)
				this._boxBounds = new Box();

			if (this._graphics.length) {
				this._boxBounds.setBoundIdentity();
				var len:number = this._graphics.length;
				for (var i:number = 0; i < len; i++)
					this._boxBounds = this._graphics[i].elements.getBoxBounds(this._boxBounds);
			} else {
				this._boxBounds.setEmpty();
			}
		}

		return this._boxBounds;
	}


	public getSphereBounds(center:Vector3D, target:Sphere = null):Sphere
	{
		var len:number = this._graphics.length;
		for (var i:number = 0; i < len; i++)
			target = this._graphics[i].elements.getSphereBounds(center, target);

		return target;
	}

	private _invalidateBounds()
	{
		this._boxBoundsInvalid = true;
		this._sphereBoundsInvalid = true;

		if (this.hasEventListener(GraphicsEvent.BOUNDS_INVALID))
			this.dispatchEvent(new GraphicsEvent(GraphicsEvent.BOUNDS_INVALID));
	}

	public _iInvalidateRenderOwners()
	{
		var len:number = this._graphics.length;
		for (var i:number = 0; i < len; ++i)
			this._graphics[i].invalidateRenderOwner();
	}


	public invalidateElements()
	{
		var len:number = this._graphics.length;
		for (var i:number = 0; i < len; ++i)
			this._graphics[i].invalidateElements();
	}

	public _hitTestPointInternal(x:number, y:number):boolean
	{
		//TODO: handle lines as well
		var len:number = this._graphics.length;
		for(var i:number = 0; i < len; i++)
			if (ElementsUtils.hitTestTriangleElements(x, y, 0, this.getBoxBounds(), <TriangleElements> this._graphics[i].elements))
				return true;

		return false;
	}

	public acceptTraverser(traverser:CollectorBase)
	{
		var len:number = this._graphics.length;
		for (var i:number = 0; i < len; i++)
			traverser.applyRenderable(this._graphics[i]);
	}

	private _onInvalidateProperties(event:StyleEvent)
	{
		this._iInvalidateRenderOwners();
	}

	private _onInvalidateVertices(event:ElementsEvent)
	{
		if (event.attributesView != (<TriangleElements> event.target).positions)
			return;

		this._invalidateBounds();
	}
}

export = Graphics;