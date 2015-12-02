import BlendMode					= require("awayjs-core/lib/data/BlendMode");
import ImageBase					= require("awayjs-core/lib/data/ImageBase");
import ColorTransform				= require("awayjs-core/lib/geom/ColorTransform");
import Matrix3D						= require("awayjs-core/lib/geom/Matrix3D");
import Rectangle					= require("awayjs-core/lib/geom/Rectangle");
import AbstractMethodError			= require("awayjs-core/lib/errors/AbstractMethodError");
import Event						= require("awayjs-core/lib/events/Event");
import IAsset						= require("awayjs-core/lib/library/IAsset");
import AssetBase					= require("awayjs-core/lib/library/AssetBase");

import IAnimationSet				= require("awayjs-display/lib/animators/IAnimationSet");
import IAnimator					= require("awayjs-display/lib/animators/IAnimator");
import IRenderOwner					= require("awayjs-display/lib/base/IRenderOwner");
import IRenderableOwner				= require("awayjs-display/lib/base/IRenderableOwner");
import IRender						= require("awayjs-display/lib/pool/IRender");
import Camera						= require("awayjs-display/lib/entities/Camera");
import MaterialEvent				= require("awayjs-display/lib/events/MaterialEvent");
import RenderableOwnerEvent			= require("awayjs-display/lib/events/RenderableOwnerEvent");
import LightPickerBase				= require("awayjs-display/lib/materials/lightpickers/LightPickerBase");
import TextureBase					= require("awayjs-display/lib/textures/TextureBase");
import Single2DTexture				= require("awayjs-display/lib/textures/Single2DTexture");


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
	private _images:Array<ImageBase> = new Array<ImageBase>();
	private _imageCount:Array<number> = new Array<number>();
	private _imageIndex:Object = new Object();
	private _colorTransform:ColorTransform;
	private _pUseColorTransform:boolean = false;
	private _alphaBlending:boolean = false;
	private _alpha:number = 1;
	
	private _textureChanged:MaterialEvent;
	private _renders:Array<IRender> = new Array<IRender>();

	public _pAlphaThreshold:number = 0;
	public _pAnimateUVs:boolean = false;
	private _enableLightFallOff:boolean = true;
	private _specularLightSources:number = 0x01;
	private _diffuseLightSources:number = 0x03;

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
	private _mipmap:boolean = true;
	private _smooth:boolean = true;
	private _repeat:boolean = false;
	private _color:number = 0xFFFFFF;
	public _pTexture:TextureBase;

	public _pLightPicker:LightPickerBase;

	private _onLightChangeDelegate:(event:Event) => void;

	/**
	 * Creates a new MaterialBase object.
	 */
	constructor()
	{
		super();

		this._onLightChangeDelegate = (event:Event) => this.onLightsChange(event);

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

		this._pInvalidateRender();
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

		this._pInvalidateRender();
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

		this._pInvalidateRender();
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
			this._pLightPicker.removeEventListener(Event.CHANGE, this._onLightChangeDelegate);

		this._pLightPicker = value;

		if (this._pLightPicker)
			this._pLightPicker.addEventListener(Event.CHANGE, this._onLightChangeDelegate);

		this._pInvalidateRender();
	}

	/**
	 * Indicates whether or not any used textures should use mipmapping. Defaults to true.
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

		this._pInvalidatePasses();
	}

	/**
	 * Indicates whether or not any used textures should use mipmapping. Defaults to true.
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

		this._pInvalidatePasses();
	}

	/**
	 * Indicates whether or not any used textures should use smoothing. Defaults to true.
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

		this._pInvalidatePasses();
	}

	/**
	 * Indicates whether or not any used textures should be tiled. If set to false, texture samples are clamped to
	 * the texture's borders when the uv coordinates are outside the [0, 1] interval. Defaults to false.
	 */
	public get repeat():boolean
	{
		return this._repeat;
	}

	public set repeat(value:boolean)
	{
		if (this._repeat == value)
			return;

		this._repeat = value;

		this._pInvalidatePasses();
	}

	/**
	 * The diffuse reflectivity color of the surface.
	 */
	public get color():number
	{
		return this._color;
	}

	public set color(value:number)
	{
		if (this._color == value)
			return;

		this._color = value;

		this._pInvalidatePasses();
	}

	/**
	 * The texture object to use for the albedo colour.
	 */
	public get texture():TextureBase
	{
		return this._pTexture;
	}

	public set texture(value:TextureBase)
	{
		if (this._pTexture == value)
			return;

		if (this._pTexture)
			this._pTexture.iRemoveOwner(this);

		this._pTexture = value;

		if (this._pTexture)
			this._pTexture.iAddOwner(this);

		this._pInvalidatePasses();

		this._pNotifyTextureChanged();
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

		this._pInvalidatePasses();
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
		this._pInvalidatePasses();
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

		this._pInvalidatePasses();
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

		this._pInvalidatePasses();
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

		this._pInvalidatePasses();
	}

	/**
	 * Cleans up resources owned by the material, including passes. Textures are not owned by the material since they
	 * could be used by other materials and will not be disposed.
	 */
	public dispose()
	{
		this._clearInterfaces();
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

		this._pInvalidatePasses();
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

		this._pInvalidatePasses();
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

		this._pInvalidatePasses();
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

		owner.dispatchEvent(new RenderableOwnerEvent(RenderableOwnerEvent.RENDER_OWNER_UPDATED, this));
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

		owner.dispatchEvent(new RenderableOwnerEvent(RenderableOwnerEvent.RENDER_OWNER_UPDATED, this));
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

	private invalidateAnimation()
	{
		var len:number = this._renders.length;
		for (var i:number = 0; i < len; i++)
			this._renders[i].invalidateAnimation();
	}
	
	public _pInvalidateRender()
	{
		var len:number = this._renders.length;
		for (var i:number = 0; i < len; i++)
			this._renders[i].invalidateRender();
	}

	public _pUpdateRender()
	{
		var len:number = this._owners.length;
		for (var i:number = 0; i < len; i++)
			this._owners[i].dispatchEvent(new RenderableOwnerEvent(RenderableOwnerEvent.RENDER_OWNER_UPDATED, this));
	}

	/**
	 * Called when the light picker's configuration changed.
	 */
	private onLightsChange(event:Event)
	{
		this._pInvalidateRender();
	}

	public _pNotifyTextureChanged()
	{
		if (!this._textureChanged)
			this._textureChanged = new MaterialEvent(MaterialEvent.TEXTURE_CHANGED);

		this.dispatchEvent(this._textureChanged);
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

	public _clearInterfaces()
	{
		for (var i:number = this._renders.length - 1; i >= 0; i--)
			this._renders[i].dispose();
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
}

export = MaterialBase;