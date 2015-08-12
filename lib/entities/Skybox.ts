import BlendMode					= require("awayjs-core/lib/data/BlendMode");
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
import LightPickerBase				= require("awayjs-display/lib/materials/lightpickers/LightPickerBase");
import MaterialBase					= require("awayjs-display/lib/materials/MaterialBase");
import SingleCubeTexture			= require("awayjs-display/lib/textures/SingleCubeTexture");

/**
 * A Skybox class is used to render a sky in the scene. It's always considered static and 'at infinity', and as
 * such it's always centered at the camera's position and sized to exactly fit within the camera's frustum, ensuring
 * the sky box is always as large as possible without being clipped.
 */
class Skybox extends DisplayObject implements IEntity, IRenderableOwner, IRenderOwner
{
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
		//if (value && this._cubeMap && (value.format != this._cubeMap.format))
		if (value && this._cubeMap)
			this._pInvalidateRender();

		this._cubeMap = value;
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
}

export = Skybox;