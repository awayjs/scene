import BlendMode					= require("awayjs-core/lib/image/BlendMode");
import ImageBase					= require("awayjs-core/lib/image/ImageBase");
import SamplerBase					= require("awayjs-core/lib/image/SamplerBase");
import Sampler2D					= require("awayjs-core/lib/image/Sampler2D");
import ColorTransform				= require("awayjs-core/lib/geom/ColorTransform");
import Matrix3D						= require("awayjs-core/lib/geom/Matrix3D");
import Rectangle					= require("awayjs-core/lib/geom/Rectangle");
import AbstractMethodError			= require("awayjs-core/lib/errors/AbstractMethodError");
import AssetEvent					= require("awayjs-core/lib/events/AssetEvent");
import AssetBase					= require("awayjs-core/lib/library/AssetBase");

import IAnimationSet				= require("awayjs-display/lib/animators/IAnimationSet");
import IAnimator					= require("awayjs-display/lib/animators/IAnimator");
import IRenderOwner					= require("awayjs-display/lib/base/IRenderOwner");
import IRenderableOwner				= require("awayjs-display/lib/base/IRenderableOwner");
import Camera						= require("awayjs-display/lib/entities/Camera");
import RenderOwnerEvent				= require("awayjs-display/lib/events/RenderOwnerEvent");
import LightPickerBase				= require("awayjs-display/lib/materials/lightpickers/LightPickerBase");
import TextureBase					= require("awayjs-display/lib/textures/TextureBase");
import Single2DTexture				= require("awayjs-display/lib/textures/Single2DTexture");
import Style						= require("awayjs-display/lib/base/Style");
import StyleEvent					= require("awayjs-display/lib/events/StyleEvent");

/**
 * MaterialBase forms an abstract base class for any material.
 * A material consists of several passes, each of which constitutes at least one render call. Several passes could
 * be used for special effects (render lighting for many lights in several passes, render an outline in a separate
 * pass) or to provide additional render-to-texture passes (rendering diffuse light to texture for texture-space
 * subsurface scattering, or rendering a depth map for specialized self-shadowing).
 *
 * Away3D provides default materials trough SinglePassMaterialBase and TriangleMaterial, which use modular
 * methods to build the shader code. MaterialBase can be extended to build specific and high-performant custom
 * shaders, or entire new material frameworks.
 */
class MaterialBase extends AssetBase implements IRenderOwner
{
	private _textures:Array<TextureBase> = new Array<TextureBase>();
	private _colorTransform:ColorTransform;
	private _pUseColorTransform:boolean = false;
	private _alphaBlending:boolean = false;
	private _alpha:number = 1;

	public _pAlphaThreshold:number = 0;
	public _pAnimateUVs:boolean = false;
	private _enableLightFallOff:boolean = true;
	private _specularLightSources:number = 0x01;
	private _diffuseLightSources:number = 0x03;
	private _onInvalidatePropertiesDelegate:(event:StyleEvent) => void;
	private _style:Style = new Style();

	/**
	 * An object to contain any extra data.
	 */
	public extra:Object;

	/**
	 * A value that can be used by materials that only work with a given type of renderer. The renderer can test the
	 * classification to choose which render path to use. For example, a deferred material could set this value so
	 * that the deferred renderer knows not to take the forward rendering path.
	 *
	 * @private
	 */
	public _iClassification:string;

	public _iBaseScreenPassIndex:number = 0;

	private _bothSides:boolean = false; // update
	private _animationSet:IAnimationSet;

	/**
	 * A list of material owners, renderables or custom Entities.
	 */
	private _owners:Array<IRenderableOwner> = new Array<IRenderableOwner>();

	private _alphaPremultiplied:boolean;

	public _pBlendMode:string = BlendMode.NORMAL;

	private _imageRect:boolean = false;
	private _curves:boolean = false;

	public _pLightPicker:LightPickerBase;

	private _onLightChangeDelegate:(event:AssetEvent) => void;
	private _onTextureInvalidateDelegate:(event:AssetEvent) => void;

	/**
	 * Creates a new MaterialBase object.
	 */
	constructor(image?:ImageBase, alpha?:number);
	constructor(color?:number, alpha?:number);
	constructor(imageColor:any = null, alpha:number = 1)
	{
		super();

		this._onInvalidatePropertiesDelegate = (event:StyleEvent) => this._onInvalidateProperties(event);
		this._style.addEventListener(StyleEvent.INVALIDATE_PROPERTIES, this._onInvalidatePropertiesDelegate);

		if (imageColor instanceof ImageBase)
			this._style.image = <ImageBase> imageColor;
		else if (imageColor)
			this._style.color = Number(imageColor);

		this.alpha = alpha;

		this._onLightChangeDelegate = (event:AssetEvent) => this.onLightsChange(event);
		this._onTextureInvalidateDelegate = (event:AssetEvent) => this.onTextureInvalidate(event);

		this.alphaPremultiplied = false; //TODO: work out why this is different for WebGL
	}

	/**
	 * The alpha of the surface.
	 */
	public get alpha():number
	{
		return this._alpha;
	}

	public set alpha(value:number)
	{
		if (value > 1)
			value = 1;
		else if (value < 0)
			value = 0;

		if (this._alpha == value)
			return;

		this._alpha = value;

		if (this._colorTransform == null)
			this._colorTransform = new ColorTransform();

		this._colorTransform.alphaMultiplier = value;

		this.invalidate();
	}

	/**
	 * The ColorTransform object to transform the colour of the material with. Defaults to null.
	 */
	public get colorTransform():ColorTransform
	{
		return this._colorTransform;
	}

	public set colorTransform(value:ColorTransform)
	{
		this._colorTransform = value;

		this.invalidate();
	}

	/**
	 * Indicates whether or not the material has transparency. If binary transparency is sufficient, for
	 * example when using textures of foliage, consider using alphaThreshold instead.
	 */
	public get alphaBlending():boolean
	{
		return this._alphaBlending;
	}

	public set alphaBlending(value:boolean)
	{
		if (this._alphaBlending == value)
			return;

		this._alphaBlending = value;

		this.invalidate();
	}

	/**
	 *
	 */
	public get animationSet():IAnimationSet
	{
		return this._animationSet;
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

	public set lightPicker(value:LightPickerBase)
	{
		if (this._pLightPicker == value)
			return;

		if (this._pLightPicker)
			this._pLightPicker.removeEventListener(AssetEvent.INVALIDATE, this._onLightChangeDelegate);

		this._pLightPicker = value;

		if (this._pLightPicker)
			this._pLightPicker.addEventListener(AssetEvent.INVALIDATE, this._onLightChangeDelegate);

		this.invalidate();
	}

	/**
	 * Indicates whether material should use curves. Defaults to false.
	 */
	public get curves():boolean
	{
		return this._curves;
	}

	public set curves(value:boolean)
	{
		if (this._curves == value)
			return;

		this._curves = value;

		this.invalidatePasses();
	}

	/**
	 * Indicates whether or not any used textures should use an atlas. Defaults to false.
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

		this.invalidatePasses();
	}


	/**
	 * The style used to render the current TriangleGraphic. If set to null, its parent Mesh's style will be used instead.
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

		this.invalidatePasses();
	}

	/**
	 * Specifies whether or not the UV coordinates should be animated using a transformation matrix.
	 */
	public get animateUVs():boolean
	{
		return this._pAnimateUVs;
	}

	public set animateUVs(value:boolean)
	{
		if (this._pAnimateUVs == value)
			return;

		this._pAnimateUVs = value;

		this.invalidatePasses();
	}

	/**
	 * Specifies whether or not the UV coordinates should be animated using a transformation matrix.
	 */
	public get useColorTransform():boolean
	{
		return this._pUseColorTransform;
	}

	public set useColorTransform(value:boolean)
	{
		if (this._pUseColorTransform == value)
			return;

		this._pUseColorTransform = value;

		this.invalidatePasses();
	}

	/**
	 * Whether or not to use fallOff and radius properties for lights. This can be used to improve performance and
	 * compatibility for constrained mode.
	 */
	public get enableLightFallOff():boolean
	{
		return this._enableLightFallOff;
	}

	public set enableLightFallOff(value:boolean)
	{
		if (this._enableLightFallOff == value)
			return;

		this._enableLightFallOff = value;

		this.invalidatePasses();
	}

	/**
	 * Define which light source types to use for diffuse reflections. This allows choosing between regular lights
	 * and/or light probes for diffuse reflections.
	 *
	 * @see away3d.materials.LightSources
	 */
	public get diffuseLightSources():number
	{
		return this._diffuseLightSources;
	}

	public set diffuseLightSources(value:number)
	{
		if (this._diffuseLightSources == value)
			return;

		this._diffuseLightSources = value;

		this.invalidatePasses();
	}

	/**
	 * Define which light source types to use for specular reflections. This allows choosing between regular lights
	 * and/or light probes for specular reflections.
	 *
	 * @see away3d.materials.LightSources
	 */
	public get specularLightSources():number
	{
		return this._specularLightSources;
	}

	public set specularLightSources(value:number)
	{
		if (this._specularLightSources == value)
			return;

		this._specularLightSources = value;

		this.invalidatePasses();
	}

	/**
	 * Defines whether or not the material should cull triangles facing away from the camera.
	 */
	public get bothSides():boolean
	{
		return this._bothSides;
	}

	public set bothSides(value:boolean)
	{
		if (this._bothSides = value)
			return;

		this._bothSides = value;

		this.invalidatePasses();
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

		this.invalidate();
	}

	/**
	 * Indicates whether visible textures (or other pixels) used by this material have
	 * already been premultiplied. Toggle this if you are seeing black halos around your
	 * blended alpha edges.
	 */
	public get alphaPremultiplied():boolean
	{
		return this._alphaPremultiplied;
	}

	public set alphaPremultiplied(value:boolean)
	{
		if (this._alphaPremultiplied == value)
			return;

		this._alphaPremultiplied = value;

		this.invalidatePasses();
	}

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

		this.invalidatePasses();
	}

	//
	// MATERIAL MANAGEMENT
	//
	/**
	 * Mark an IRenderableOwner as owner of this material.
	 * Assures we're not using the same material across renderables with different animations, since the
	 * Programs depend on animation. This method needs to be called when a material is assigned.
	 *
	 * @param owner The IRenderableOwner that had this material assigned
	 *
	 * @internal
	 */
	public iAddOwner(owner:IRenderableOwner)
	{
		this._owners.push(owner);

		var animationSet:IAnimationSet;
		var animator:IAnimator = <IAnimator> owner.animator;

		if (animator)
			animationSet = <IAnimationSet> animator.animationSet;

		if (owner.animator) {
			if (this._animationSet && animationSet != this._animationSet) {
				throw new Error("A Material instance cannot be shared across material owners with different animation sets");
			} else {
				if (this._animationSet != animationSet) {

					this._animationSet = animationSet;

					this.invalidateAnimation();
				}
			}
		}

		owner.invalidateRenderOwner();
	}

	/**
	 * Removes an IRenderableOwner as owner.
	 * @param owner
	 *
	 * @internal
	 */
	public iRemoveOwner(owner:IRenderableOwner)
	{
		this._owners.splice(this._owners.indexOf(owner), 1);

		if (this._owners.length == 0) {
			this._animationSet = null;

			this.invalidateAnimation();
		}

		owner.invalidateRenderOwner();
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

	public getNumTextures():number
	{
		return this._textures.length;
	}

	public getTextureAt(index:number):TextureBase
	{
		return this._textures[index];
	}

	/**
	 * Marks the shader programs for all passes as invalid, so they will be recompiled before the next use.
	 *
	 * @private
	 */
	public invalidatePasses()
	{
		this.dispatchEvent(new RenderOwnerEvent(RenderOwnerEvent.INVALIDATE_PASSES, this));
	}

	private invalidateAnimation()
	{
		this.dispatchEvent(new RenderOwnerEvent(RenderOwnerEvent.INVALIDATE_ANIMATION, this));
	}

	public invalidateRenderOwners()
	{
		var len:number = this._owners.length;
		for (var i:number = 0; i < len; i++)
			this._owners[i].invalidateRenderOwner();
	}

	/**
	 * Called when the light picker's configuration changed.
	 */
	private onLightsChange(event:AssetEvent)
	{
		this.invalidate();
	}

	public invalidateTexture()
	{
		this.dispatchEvent(new RenderOwnerEvent(RenderOwnerEvent.INVALIDATE_TEXTURE, this));
	}

	public addTextureAt(texture:TextureBase, index:number)
	{
		var i:number = this._textures.indexOf(texture);

		if (i == index)
			return;
		else if (i != -1)
			this._textures.splice(i, 1);

		this._textures.splice(index, 0, texture);

		texture.addEventListener(AssetEvent.INVALIDATE, this._onTextureInvalidateDelegate);

		this.onTextureInvalidate();
	}

	public addTexture(texture:TextureBase)
	{
		if (this._textures.indexOf(texture) != -1)
			return;

		this._textures.push(texture);

		texture.addEventListener(AssetEvent.INVALIDATE, this._onTextureInvalidateDelegate);

		this.onTextureInvalidate();
	}
	
	public removeTexture(texture:TextureBase)
	{
		this._textures.splice(this._textures.indexOf(texture), 1);

		texture.removeEventListener(AssetEvent.INVALIDATE, this._onTextureInvalidateDelegate);

		this.onTextureInvalidate();
	}
	
	private onTextureInvalidate(event:AssetEvent = null)
	{
		this.invalidatePasses();

		//invalidate renderables for number of images getter (in case it has changed)
		this.invalidateRenderOwners();
	}

	private _onInvalidateProperties(event:StyleEvent)
	{
		this.invalidatePasses();
	}
}

export = MaterialBase;