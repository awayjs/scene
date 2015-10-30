import ImageBase					= require("awayjs-core/lib/data/ImageBase");
import SamplerBase					= require("awayjs-core/lib/data/SamplerBase");
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
	private _imageIndex:Object = new Object();
	private _samplers:Object = new Object();
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
		return this._images[index] || this.parentMesh.getImageAt(index) || this.material.getImageAt(index);
	}

	public getImageIndex(image:ImageBase):number
	{
		return this._imageIndex[image.id] || this.parentMesh.getImageIndex(image) || this.material.getImageIndex(image);
	}

	public addImageAt(image:ImageBase, index:number)
	{
		this._images[index] = image;
		this._imageIndex[image.id] = index;
	}

	public removeImageAt(image:ImageBase, index:number)
	{
		this._images[index] = null;
		delete this._imageIndex[image.id];
	}


	public getSamplerAt(texture:TextureBase, index:number = 0):SamplerBase
	{
		if (!this._samplers[texture.id] || !this._samplers[texture.id][index])
			return this.parentMesh.getSamplerAt(texture, index) || texture.getSamplerAt(index);

		return this._samplers[texture.id][index];
	}

	public addSamplerAt(sampler:SamplerBase, texture:TextureBase, index:number = 0)
	{
		if (!this._samplers[texture.id])
			this._samplers[texture.id] = new Array<SamplerBase>();

		this._samplers[texture.id][index] = sampler;
	}

	public removeSamplerAt(texture:TextureBase, index:number = 0)
	{
		if (!this._samplers[texture.id])
			return;

		delete this._samplers[texture.id][index];
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
		this.material = null;
		this.parentMesh = null;

		this._clearInterfaces();
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