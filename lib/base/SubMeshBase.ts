import ImageBase					= require("awayjs-core/lib/image/ImageBase");
import SamplerBase					= require("awayjs-core/lib/image/SamplerBase");
import AbstractMethodError			= require("awayjs-core/lib/errors/AbstractMethodError");
import AssetEvent					= require("awayjs-core/lib/events/AssetEvent");
import Matrix3D						= require("awayjs-core/lib/geom/Matrix3D");
import UVTransform					= require("awayjs-core/lib/geom/UVTransform");
import ColorTransform				= require("awayjs-core/lib/geom/ColorTransform");
import AssetBase					= require("awayjs-core/lib/library/AssetBase");

import IAnimator					= require("awayjs-display/lib/animators/IAnimator");
import Camera						= require("awayjs-display/lib/entities/Camera");
import Mesh							= require("awayjs-display/lib/entities/Mesh");
import RenderableOwnerEvent			= require("awayjs-display/lib/events/RenderableOwnerEvent");
import MaterialBase					= require("awayjs-display/lib/materials/MaterialBase");
import TextureBase					= require("awayjs-display/lib/textures/TextureBase");

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
	private _images:Array<ImageBase> = new Array<ImageBase>();
	private _samplers:Object = new Array<ImageBase>();
	public _uvTransform:UVTransform;

	public _iIndex:number = 0;

	public _material:MaterialBase;

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
		return this.parentMesh.animator;
	}

	/**
	 * The material used to render the current TriangleSubMesh. If set to null, its parent Mesh's material will be used instead.
	 */
	public get material():MaterialBase
	{
		return this._material || this.parentMesh.material;
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
		return this.parentMesh.sceneTransform;
	}

	/**
	 * The entity that that initially provided the IRenderable to the render pipeline (ie: the owning Mesh object).
	 */
	public parentMesh:Mesh;
	/**
	 *
	 */
	public get uvTransform():UVTransform
	{
		return this._uvTransform || this.parentMesh.uvTransform;
	}

	public set uvTransform(value:UVTransform)
	{
		this._uvTransform = value;
	}


	public getImageAt(index:number):ImageBase
	{
		return this._images[index] || this.parentMesh.getImageAt(index);
	}

	public addImageAt(image:ImageBase, index:number)
	{
		this._images[index] = image;
	}

	public removeImageAt(index:number)
	{
		this._images[index] = null;
	}


	public getSamplerAt(index:number):SamplerBase
	{
		return this._samplers[index] || this.parentMesh.getSamplerAt(index);
	}

	public addSamplerAt(sampler:SamplerBase, index:number)
	{
		this._samplers[index] = sampler;
	}

	public removeSamplerAt(index:number)
	{
		this._samplers[index] = null;
	}


	/**
	 * Creates a new SubMeshBase object
	 */
	constructor(parentMesh:Mesh, material:MaterialBase = null)
	{
		super();

		this.parentMesh = parentMesh;
		this.material = material;
	}

	/**
	 *
	 */
	public dispose()
	{
		super.dispose();

		this.material = null;
		this.parentMesh = null;
	}

	/**
	 *
	 * @param camera
	 * @returns {away.geom.Matrix3D}
	 */
	public getRenderSceneTransform(camera:Camera):Matrix3D
	{
		return this.parentMesh.getRenderSceneTransform(camera);
	}

	public invalidateGeometry()
	{
		this.dispatchEvent(new RenderableOwnerEvent(RenderableOwnerEvent.INVALIDATE_GEOMETRY, this));
	}

	public invalidateRenderOwner()
	{
		this.dispatchEvent(new RenderableOwnerEvent(RenderableOwnerEvent.INVALIDATE_RENDER_OWNER, this));
	}

	public _iGetExplicitMaterial():MaterialBase
	{
		return this._material;
	}

	public clear()
	{
		this.dispatchEvent(new AssetEvent(AssetEvent.CLEAR, this));
	}
}

export = SubMeshBase;