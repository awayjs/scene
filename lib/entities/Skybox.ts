import BlendMode					= require("awayjs-core/lib/data/BlendMode");
import ImageBase					= require("awayjs-core/lib/data/ImageBase");
import SamplerBase					= require("awayjs-core/lib/data/SamplerBase");
import UVTransform					= require("awayjs-core/lib/geom/UVTransform");
import ColorTransform				= require("awayjs-core/lib/geom/ColorTransform");

import IRenderer					= require("awayjs-display/lib/IRenderer");
import IAnimationSet				= require("awayjs-display/lib/animators/IAnimationSet");
import IAnimator					= require("awayjs-display/lib/animators/IAnimator");
import DisplayObject				= require("awayjs-display/lib/base/DisplayObject");
import IRenderableOwner				= require("awayjs-display/lib/base/IRenderableOwner");
import IRenderOwner					= require("awayjs-display/lib/base/IRenderOwner");
import BoundsType					= require("awayjs-display/lib/bounds/BoundsType");
import IRenderable					= require("awayjs-display/lib/pool/IRenderable");
import IRender						= require("awayjs-display/lib/pool/IRender");
import IEntity						= require("awayjs-display/lib/entities/IEntity");
import RenderableOwnerEvent			= require("awayjs-display/lib/events/RenderableOwnerEvent");
import LightPickerBase				= require("awayjs-display/lib/materials/lightpickers/LightPickerBase");
import MaterialBase					= require("awayjs-display/lib/materials/MaterialBase");
import SingleCubeTexture			= require("awayjs-display/lib/textures/SingleCubeTexture");
import TextureBase					= require("awayjs-display/lib/textures/TextureBase");

/**
 * A Skybox class is used to render a sky in the scene. It's always considered static and 'at infinity', and as
 * such it's always centered at the camera's position and sized to exactly fit within the camera's frustum, ensuring
 * the sky box is always as large as possible without being clipped.
 */
class Skybox extends DisplayObject implements IEntity, IRenderableOwner, IRenderOwner
{
	private _images:Array<ImageBase> = new Array<ImageBase>();
	private _imageCount:Array<number> = new Array<number>();
	private _imageIndex:Object = new Object();
	private _samplers:Array<SamplerBase> = new Array<SamplerBase>();
	private _samplerIndices:Object = new Object();

	public static assetType:string = "[asset Skybox]";

	private _cubeMap:SingleCubeTexture;
	public _pAlphaThreshold:number = 0;
	private _animationSet:IAnimationSet;
	public _pLightPicker:LightPickerBase;
	public _pBlendMode:string = BlendMode.NORMAL;
	private _renders:Array<IRender> = new Array<IRender>();
	private _renderables:Array<IRenderable> = new Array<IRenderable>();
	private _uvTransform:UVTransform;
	private _colorTransform:ColorTransform;
	private _owners:Array<IRenderableOwner>;
	private _imageRect:boolean = false;
	private _mipmap:boolean = false;
	private _smooth:boolean = true;

	private _animator:IAnimator;

	/**
	 * The minimum alpha value for which pixels should be drawn. This is used for transparency that is either
	 * invisible or entirely opaque, often used with textures for foliage, etc.
	 * Recommended values are 0 to disable alpha, or 0.5 to create smooth edges. Default value is 0 (disabled).
	 */
	public get alphaThreshold():number
	{
		return this._pAlphaThreshold;
	}

	public set alphaThreshold(value:number)
	{
		if (value < 0)
			value = 0;
		else if (value > 1)
			value = 1;

		if (this._pAlphaThreshold == value)
			return;

		this._pAlphaThreshold = value;

		this._pIinvalidatePasses();
	}

	/**
	 * Indicates whether or not the Skybox texture should use imageRects. Defaults to false.
	 */
	public get imageRect():boolean
	{
		return this._imageRect;
	}

	public set imageRect(value:boolean)
	{
		if (this._imageRect == value)
			return;

		this._imageRect = value;

		this._pIinvalidatePasses();
	}
	/**
	 * Indicates whether or not the Skybox texture should use mipmapping. Defaults to false.
	 */
	public get mipmap():boolean
	{
		return this._mipmap;
	}

	public set mipmap(value:boolean)
	{
		if (this._mipmap == value)
			return;

		this._mipmap = value;

		this._pIinvalidatePasses();
	}

	/**
	 * Indicates whether or not the Skybox texture should use smoothing. Defaults to true.
	 */
	public get smooth():boolean
	{
		return this._smooth;
	}

	public set smooth(value:boolean)
	{
		if (this._smooth == value)
			return;

		this._smooth = value;

		this._pIinvalidatePasses();
	}
	
	/**
	 * The light picker used by the material to provide lights to the material if it supports lighting.
	 *
	 * @see LightPickerBase
	 * @see StaticLightPicker
	 */
	public get lightPicker():LightPickerBase
	{
		return this._pLightPicker;
	}

	/**
	 *
	 */
	public get animationSet():IAnimationSet
	{
		return this._animationSet;
	}

	/**
	 * The blend mode to use when drawing this renderable. The following blend modes are supported:
	 * <ul>
	 * <li>BlendMode.NORMAL: No blending, unless the material inherently needs it</li>
	 * <li>BlendMode.LAYER: Force blending. This will draw the object the same as NORMAL, but without writing depth writes.</li>
	 * <li>BlendMode.MULTIPLY</li>
	 * <li>BlendMode.ADD</li>
	 * <li>BlendMode.ALPHA</li>
	 * </ul>
	 */
	public get blendMode():string
	{
		return this._pBlendMode;
	}

	public set blendMode(value:string)
	{
		if (this._pBlendMode == value)
			return;

		this._pBlendMode = value;

		this._pInvalidateRender();
	}

	public _pInvalidateRender()
	{
		var len:number = this._renders.length;
		for (var i:number = 0; i < len; i++)
			this._renders[i].invalidateRender();
	}

	/**
	 * Marks the shader programs for all passes as invalid, so they will be recompiled before the next use.
	 *
	 * @private
	 */
	public _pIinvalidatePasses()
	{
		var len:number = this._renders.length;
		for (var i:number = 0; i < len; i++)
			this._renders[i].invalidatePasses();
	}

	/**
	 * A list of the IRenderableOwners that use this material
	 *
	 * @private
	 */
	public get iOwners():Array<IRenderableOwner>
	{
		return this._owners;
	}

	public get animator():IAnimator
	{
		return this._animator;
	}

	/**
	 *
	 */
	public get uvTransform():UVTransform
	{
		return this._uvTransform;
	}

	public set uvTransform(value:UVTransform)
	{
		this._uvTransform = value;
	}
	/**
	 *
	 */
	public get colorTransform():ColorTransform
	{
		return this._colorTransform;// || this._pParentMesh._colorTransform;
	}

	public set colorTransform(value:ColorTransform)
	{
		this._colorTransform = value;
	}
	/**
	* The cube texture to use as the skybox.
	*/
	public get cubeMap():SingleCubeTexture
	{
		return this._cubeMap;
	}

	public set cubeMap(value:SingleCubeTexture)
	{
		if (this._cubeMap == value)
			return;

		if (this._cubeMap)
			this._cubeMap.iRemoveOwner(this);

		this._cubeMap = value;

		if (this._cubeMap)
			this._cubeMap.iAddOwner(this);

		this._pIinvalidatePasses();
	}

	/**
	 * Create a new Skybox object.
	 *
	 * @param material	The material with which to render the Skybox.
	 */
	constructor(cubeMap:SingleCubeTexture = null)
	{
		super();

		this._pIsEntity = true;
		this._owners = new Array<IRenderableOwner>(this);

		this.cubeMap = cubeMap;

		//default bounds type
		this._boundsType = BoundsType.NULL;
	}

	public get assetType():string
	{
		return Skybox.assetType;
	}

	public get castsShadows():boolean
	{
		return false; //TODO
	}

	public getNumImages():number
	{
		return this._images.length;
	}

	public getImageAt(index:number):ImageBase
	{
		return this._images[index];
	}

	public getImageIndex(image:ImageBase):number
	{
		return this._imageIndex[image.id];
	}

	public getNumSamplers():number
	{
		return this._samplers.length;
	}

	public getSamplerAt(index:number):SamplerBase
	{
		return this._samplers[index];
	}

	public getSamplerIndex(texture:TextureBase, index:number = 0):number
	{
		if (!this._samplerIndices[texture.id])
			this._samplerIndices[texture.id] = new Array<number>();

		return this._samplerIndices[texture.id][index];
	}

	/**
	 * Cleans up resources owned by the material, including passes. Textures are not owned by the material since they
	 * could be used by other materials and will not be disposed.
	 */
	public dispose()
	{
		var i:number;
		var len:number;

		len = this._renders.length;
		for (i = 0; i < len; i++)
			this._renders[i].dispose();

		this._renders = new Array<IRender>();

		var len:number = this._renderables.length;
		for (var i:number = 0; i < len; i++)
			this._renderables[i].dispose();

		this._renderables = new Array<IRenderable>();
	}

	public _applyRenderer(renderer:IRenderer)
	{
		//skybox do not get collected in the standard entity list
	}

	public _pUpdateRender()
	{
		var len:number = this._owners.length;
		for (var i:number = 0; i < len; i++)
			this._owners[i].dispatchEvent(new RenderableOwnerEvent(RenderableOwnerEvent.RENDER_OWNER_UPDATED, this));
	}


	/**
	 * Marks the shader programs for all passes as invalid, so they will be recompiled before the next use.
	 *
	 * @private
	 */
	public _pInvalidatePasses()
	{
		var len:number = this._renders.length;
		for (var i:number = 0; i < len; i++)
			this._renders[i].invalidatePasses();
	}

	public _iAddRender(render:IRender):IRender
	{
		this._renders.push(render);

		return render;
	}

	public _iRemoveRender(render:IRender):IRender
	{
		this._renders.splice(this._renders.indexOf(render), 1);

		return render;
	}

	public _iAddRenderable(renderable:IRenderable):IRenderable
	{
		this._renderables.push(renderable);

		return renderable;
	}


	public _iRemoveRenderable(renderable:IRenderable):IRenderable
	{
		var index:number = this._renderables.indexOf(renderable);

		this._renderables.splice(index, 1);

		return renderable;
	}

	public _iAddImage(image:ImageBase)
	{
		var index:number = this._imageIndex[image.id];
		if (!index) {
			this._imageIndex[image.id] = this._images.length;

			this._images.push(image);
			this._imageCount.push(1);

			this._pInvalidatePasses();

			this._pUpdateRender();
		} else {
			this._imageCount[index]--;
		}
	}

	public _iRemoveImage(image:ImageBase)
	{
		var index:number = this._imageIndex[image.id];
		if (this._imageCount[index] != 1) {
			this._imageCount[index]--;
		} else {
			delete this._imageIndex[image.id];

			this._images.splice(index, 1);
			this._imageCount.splice(index, 1);

			var len:number = this._images.length;
			for (var i:number = index; i < len; i++) {
				this._imageIndex[this._images[i].id] = i;
			}

			this._pInvalidatePasses();

			this._pUpdateRender();
		}
	}


	public _iAddSampler(sampler:SamplerBase, texture:TextureBase, index:number)
	{
		//find free sampler slot
		var i:number = 0;
		var len:number = this._samplers.length;
		while (i < len) {
			if (!this._samplers[i])
				break;

			i++;
		}

		if (!this._samplerIndices[texture.id])
			this._samplerIndices[texture.id] = new Array<number>();

		this._samplerIndices[texture.id][index] = i;

		this._samplers[i] = sampler;

		this._pInvalidatePasses();

		this._pUpdateRender();
	}

	public _iRemoveSampler(texture:TextureBase, index:number)
	{
		var index:number = this._samplerIndices[texture.id][index];

		this._samplers[index] = null;

		//shorten samplers array if sampler at end
		if (index == this._samplers.length - 1) {
			while(index--) {
				if (this._samplers[index] != null)
					break;
			}

			this._samplers.length = index + 1;
		}

		this._pInvalidatePasses();

		this._pUpdateRender();
	}
}

export = Skybox;