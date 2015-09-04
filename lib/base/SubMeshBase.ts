import AbstractMethodError			= require("awayjs-core/lib/errors/AbstractMethodError");
import Matrix3D						= require("awayjs-core/lib/geom/Matrix3D");
import UVTransform					= require("awayjs-core/lib/geom/UVTransform");
import ColorTransform				= require("awayjs-core/lib/geom/ColorTransform");
import AssetBase					= require("awayjs-core/lib/library/AssetBase");

import IAnimator					= require("awayjs-display/lib/animators/IAnimator");
import IRenderable					= require("awayjs-display/lib/pool/IRenderable");
import Camera						= require("awayjs-display/lib/entities/Camera");
import Mesh							= require("awayjs-display/lib/entities/Mesh");
import MaterialBase					= require("awayjs-display/lib/materials/MaterialBase");

/**
 * SubMeshBase wraps a TriangleSubGeometry as a scene graph instantiation. A SubMeshBase is owned by a Mesh object.
 *
 *
 * @see away.base.TriangleSubGeometry
 * @see away.entities.Mesh
 *
 * @class away.base.SubMeshBase
 */
class SubMeshBase extends AssetBase
{
	private _parentMesh:Mesh;
	public _uvTransform:UVTransform;

	public _iIndex:number = 0;

	public _material:MaterialBase;
	private _renderables:Array<IRenderable> = new Array<IRenderable>();

	//TODO test shader picking
//		public get shaderPickingDetails():boolean
//		{
//
//			return this.sourceEntity.shaderPickingDetails;
//		}

	/**
	 * The animator object that provides the state for the TriangleSubMesh's animation.
	 */
	public get animator():IAnimator
	{
		return this._parentMesh.animator;
	}

	/**
	 * The material used to render the current TriangleSubMesh. If set to null, its parent Mesh's material will be used instead.
	 */
	public get material():MaterialBase
	{
		return this._material || this._parentMesh.material;
	}

	public set material(value:MaterialBase)
	{
		if (this.material)
			this.material.iRemoveOwner(this);

		this._material = value;

		if (this.material)
			this.material.iAddOwner(this);
	}

	/**
	 * The scene transform object that transforms from model to world space.
	 */
	public get sceneTransform():Matrix3D
	{
		return this._parentMesh.sceneTransform;
	}

	/**
	 * The entity that that initially provided the IRenderable to the render pipeline (ie: the owning Mesh object).
	 */
	public get parentMesh():Mesh
	{
		return this._parentMesh;
	}

	/**
	 *
	 */
	public get uvTransform():UVTransform
	{
		return this._uvTransform || this._parentMesh.uvTransform;
	}

	public set uvTransform(value:UVTransform)
	{
		this._uvTransform = value;
	}

	/**
	 * Creates a new SubMeshBase object
	 */
	constructor(parentMesh:Mesh, material:MaterialBase = null)
	{
		super();

		this._parentMesh = parentMesh;
		this.material = material;
	}

	/**
	 *
	 */
	public dispose()
	{
		this.material = null;
		this._parentMesh = null;

		this._clearInterfaces();
	}

	/**
	 *
	 * @param camera
	 * @returns {away.geom.Matrix3D}
	 */
	public getRenderSceneTransform(camera:Camera):Matrix3D
	{
		return this._parentMesh.getRenderSceneTransform(camera);
	}

	public _iAddRenderable(renderable:IRenderable):IRenderable
	{
		this._renderables.push(renderable);

		return renderable;
	}


	public _iRemoveRenderable(renderable:IRenderable):IRenderable
	{
		this._renderables.splice(this._renderables.indexOf(renderable), 1);

		return renderable;
	}

	public _iInvalidateRenderableGeometry()
	{
		var len:number = this._renderables.length;
		for (var i:number = 0; i < len; i++)
			this._renderables[i].invalidateGeometry();
	}

	public _iGetExplicitMaterial():MaterialBase
	{
		return this._material;
	}

	public _clearInterfaces()
	{
		for (var i:number = this._renderables.length - 1; i >= 0; i--)
			this._renderables[i].dispose();
	}
}

export = SubMeshBase;