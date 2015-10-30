import ImageBase					= require("awayjs-core/lib/data/ImageBase");
import SamplerBase					= require("awayjs-core/lib/data/SamplerBase");
import Sampler2D					= require("awayjs-core/lib/data/Sampler2D");
import Image2D						= require("awayjs-core/lib/data/Image2D");
import Matrix3D						= require("awayjs-core/lib/geom/Matrix3D");
import Rectangle					= require("awayjs-core/lib/geom/Rectangle");
import UVTransform					= require("awayjs-core/lib/geom/UVTransform");
import ColorTransform				= require("awayjs-core/lib/geom/ColorTransform");

import IRenderer					= require("awayjs-display/lib/IRenderer");
import IAnimator					= require("awayjs-display/lib/animators/IAnimator");
import DisplayObject				= require("awayjs-display/lib/base/DisplayObject");
import IRenderableOwner				= require("awayjs-display/lib/base/IRenderableOwner");
import BoundsType					= require("awayjs-display/lib/bounds/BoundsType");
import IEntity						= require("awayjs-display/lib/entities/IEntity");
import MaterialEvent				= require("awayjs-display/lib/events/MaterialEvent");
import MaterialBase					= require("awayjs-display/lib/materials/MaterialBase");
import TextureBase					= require("awayjs-display/lib/textures/TextureBase");


/**
 * The Billboard class represents display objects that represent bitmap images.
 * These can be images that you load with the <code>flash.Assets</code> or
 * <code>flash.display.Loader</code> classes, or they can be images that you
 * create with the <code>Billboard()</code> constructor.
 *
 * <p>The <code>Billboard()</code> constructor allows you to create a Billboard
 * object that contains a reference to a Image2D object. After you create a
 * Billboard object, use the <code>addChild()</code> or <code>addChildAt()</code>
 * method of the parent DisplayObjectContainer instance to place the bitmap on
 * the display list.</p>
 *
 * <p>A Billboard object can share its Image2D reference among several Billboard
 * objects, independent of translation or rotation properties. Because you can
 * create multiple Billboard objects that reference the same Image2D object,
 * multiple display objects can use the same complex Image2D object without
 * incurring the memory overhead of a Image2D object for each display
 * object instance.</p>
 *
 * <p>A Image2D object can be drawn to the screen by a Billboard object in one
 * of two ways: by using the default hardware renderer with a single hardware surface,
 * or by using the slower software renderer when 3D acceleration is not available.</p>
 *
 * <p>If you would prefer to perform a batch rendering command, rather than using a
 * single surface for each Billboard object, you can also draw to the screen using the
 * <code>drawTiles()</code> or <code>drawTriangles()</code> methods which are
 * available to <code>flash.display.Tilesheet</code> and <code>flash.display.Graphics
 * objects.</code></p>
 *
 * <p><b>Note:</b> The Billboard class is not a subclass of the InteractiveObject
 * class, so it cannot dispatch mouse events. However, you can use the
 * <code>addEventListener()</code> method of the display object container that
 * contains the Billboard object.</p>
 */

class Billboard extends DisplayObject implements IEntity, IRenderableOwner
{
	private _images:Array<ImageBase> = new Array<ImageBase>();
	private _imageIndex:Object = new Object();
	private _samplers:Object = new Object();

	public static assetType:string = "[asset Billboard]";

	private _animator:IAnimator;
	private _billboardWidth:number;
	private _billboardHeight:number;
	private _billboardRect:Rectangle;
	private _material:MaterialBase;
	private _uvTransform:UVTransform;
	private _colorTransform:ColorTransform;
	private _parentColorTransform:ColorTransform;

	private onTextureChangedDelegate:(event:MaterialEvent) => void;


	/**
	 * Defines the animator of the mesh. Act on the mesh's geometry. Defaults to null
	 */
	public get animator():IAnimator
	{
		return this._animator;
	}

	/**
	 *
	 */
	public get assetType():string
	{
		return Billboard.assetType;
	}

	/**
	 * The Image2D object being referenced.
	 */
	public image2D:Image2D; //TODO

	/**
	 *
	 */
	public get billboardRect():Rectangle
	{
		return this._billboardRect;
	}

	/**
	 *
	 */
	public get billboardHeight():number
	{
		return this._billboardHeight;
	}

	/**
	 *
	 */
	public get billboardWidth():number
	{
		return this._billboardWidth;
	}

	/**
	 *
	 */
	public get material():MaterialBase
	{
		return this._material;
	}

	public set material(value:MaterialBase)
	{
		if (value == this._material)
			return;

		if (this._material) {
			this._material.iRemoveOwner(this);
			this._material.removeEventListener(MaterialEvent.TEXTURE_CHANGED, this.onTextureChangedDelegate);
		}


		this._material = value;

		if (this._material) {
			this._material.iAddOwner(this);
			this._material.addEventListener(MaterialEvent.TEXTURE_CHANGED, this.onTextureChangedDelegate);
		}
	}

	/**
	 * Controls whether or not the Billboard object is snapped to the nearest pixel.
	 * This value is ignored in the native and HTML5 targets.
	 * The PixelSnapping class includes possible values:
	 * <ul>
	 *   <li><code>PixelSnapping.NEVER</code> - No pixel snapping occurs.</li>
	 *   <li><code>PixelSnapping.ALWAYS</code> - The image is always snapped to
	 * the nearest pixel, independent of transformation.</li>
	 *   <li><code>PixelSnapping.AUTO</code> - The image is snapped to the
	 * nearest pixel if it is drawn with no rotation or skew and it is drawn at a
	 * scale factor of 99.9% to 100.1%. If these conditions are satisfied, the
	 * bitmap image is drawn at 100% scale, snapped to the nearest pixel.
	 * When targeting Flash Player, this value allows the image to be drawn as fast
	 * as possible using the internal vector renderer.</li>
	 * </ul>
	 */
	public pixelSnapping:string; //TODO

	/**
	 * Controls whether or not the bitmap is smoothed when scaled. If
	 * <code>true</code>, the bitmap is smoothed when scaled. If
	 * <code>false</code>, the bitmap is not smoothed when scaled.
	 */
	public smoothing:boolean; //TODO

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
		// outputs the concaneted color-transform
		return this._colorTransform;// || this._pParentMesh._colorTransform;
	}

	public set colorTransform(value:ColorTransform)
	{
		// set this on the inheritet colorTransform
		this.transform.colorTransform = value;
		// new calculate the concaneted transform
		this._applyColorTransform();

	}

	public get parentColorTransform():ColorTransform
	{
		return this._parentColorTransform;
	}

	public set parentColorTransform(value:ColorTransform)
	{
		// we will never modify the parentColorTransform directly, so save to set as reference (?)
		this._parentColorTransform = value;
		this._applyColorTransform();
	}

	private _applyColorTransform()
	{
		this._colorTransform=new ColorTransform();
		if ((this._parentColorTransform)&&(this.transform.colorTransform)){
			// if this mc has a parent-colortransform applied, we need to concanete the transforms.
			this._colorTransform.alphaMultiplier   = this.transform.colorTransform.alphaMultiplier * this._parentColorTransform.alphaMultiplier;
			this._colorTransform.redMultiplier     = this.transform.colorTransform.redMultiplier * this._parentColorTransform.redMultiplier;
			this._colorTransform.blueMultiplier    = this.transform.colorTransform.blueMultiplier * this._parentColorTransform.blueMultiplier;
			this._colorTransform.greenMultiplier   = this.transform.colorTransform.greenMultiplier * this._parentColorTransform.greenMultiplier;
			this._colorTransform.alphaOffset       = this.transform.colorTransform.alphaOffset + this._parentColorTransform.alphaOffset;
			this._colorTransform.redOffset         = this.transform.colorTransform.redOffset + this._parentColorTransform.redOffset;
			this._colorTransform.blueOffset        = this.transform.colorTransform.blueOffset + this._parentColorTransform.blueOffset;
			this._colorTransform.greenOffset       = this.transform.colorTransform.greenOffset + this._parentColorTransform.greenOffset;
		}
		else if (this.transform.colorTransform){
			this._colorTransform.alphaMultiplier   = this.transform.colorTransform.alphaMultiplier;
			this._colorTransform.redMultiplier     = this.transform.colorTransform.redMultiplier;
			this._colorTransform.blueMultiplier    = this.transform.colorTransform.blueMultiplier;
			this._colorTransform.greenMultiplier   = this.transform.colorTransform.greenMultiplier;
			this._colorTransform.alphaOffset       = this.transform.colorTransform.alphaOffset;
			this._colorTransform.redOffset         = this.transform.colorTransform.redOffset;
			this._colorTransform.blueOffset        = this.transform.colorTransform.blueOffset;
			this._colorTransform.greenOffset       = this.transform.colorTransform.greenOffset;
		}
		else if (this._parentColorTransform){
			this._colorTransform.alphaMultiplier   = this._parentColorTransform.alphaMultiplier;
			this._colorTransform.redMultiplier     = this._parentColorTransform.redMultiplier;
			this._colorTransform.blueMultiplier    = this._parentColorTransform.blueMultiplier;
			this._colorTransform.greenMultiplier   = this._parentColorTransform.greenMultiplier;
			this._colorTransform.alphaOffset       = this._parentColorTransform.alphaOffset;
			this._colorTransform.redOffset         = this._parentColorTransform.redOffset;
			this._colorTransform.blueOffset        = this._parentColorTransform.blueOffset;
			this._colorTransform.greenOffset       = this._parentColorTransform.greenOffset;
		}
	}

	constructor(material:MaterialBase, pixelSnapping:string = "auto", smoothing:boolean = false)
	{
		super();

		this._pIsEntity = true;

		this.onTextureChangedDelegate = (event:MaterialEvent) => this.onTextureChanged(event);

		this.material = material;

		this._updateDimensions();

		//default bounds type
		this._boundsType = BoundsType.AXIS_ALIGNED_BOX;
	}

	/**
	 * @protected
	 */
	public _pUpdateBoxBounds()
	{
		super._pUpdateBoxBounds();

		this._pBoxBounds.width = this._billboardRect.width;
		this._pBoxBounds.height = this._billboardRect.height;
	}

	public clone():DisplayObject
	{
		var clone:Billboard = new Billboard(this.material);
		return clone;
	}

	public getImageAt(index:number):ImageBase
	{
		return this._images[index] || this.material.getImageAt(index);
	}

	public getImageIndex(image:ImageBase):number
	{
		return this._imageIndex[image.id] || this.material.getImageIndex(image);
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
			return texture.getSamplerAt(index);

		return this._samplers[texture.id][index];
	}

	public addSamplerAt(sampler:SamplerBase, texture:TextureBase, index:number = 0)
	{
		if (!this._samplers[texture.id])
			this._samplers[texture.id] = new Array<SamplerBase>();

		this._samplers[texture.id][index] = sampler;

		if (texture == this.material.texture && !index)
			this._updateDimensions();
	}

	public removeSamplerAt(sampler:SamplerBase, texture:TextureBase, index:number = 0)
	{
		if (!this._samplers[texture.id])
			return;

		delete this._samplers[texture.id][index];

		if (texture == this.material.texture && !index)
			this._updateDimensions();
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
		return this._pPickingCollider.testBillboardCollision(this, this.material, this._pPickingCollisionVO, shortestCollisionDistance);
	}

	/**
	 * @private
	 */
	private onTextureChanged(event:MaterialEvent)
	{
		this._updateDimensions();
	}

	public _applyRenderer(renderer:IRenderer)
	{
		// Since this getter is invoked every iteration of the render loop, and
		// the prefab construct could affect the sub-meshes, the prefab is
		// validated here to give it a chance to rebuild.
		if (this._iSourcePrefab)
			this._iSourcePrefab._iValidate();

		renderer._iApplyRenderableOwner(this);
	}

	private _updateDimensions()
	{
		var image:Image2D = <Image2D> this.getImageAt(0);

		if (image) {
			var sampler:Sampler2D = <Sampler2D> this.getSamplerAt(this.material.texture);
			var rect:Rectangle = sampler.imageRect || image.rect;
			this._billboardWidth = rect.width;
			this._billboardHeight = rect.height;
			this._billboardRect = sampler.frameRect || new Rectangle(0, 0, this._billboardWidth, this._billboardHeight);
		} else {
			this._billboardWidth = 1;
			this._billboardHeight = 1;
			this._billboardRect = new Rectangle(0, 0, 1, 1);
		}

		this._pInvalidateBounds();

		var len:number = this._pRenderables.length;
		for (var i:number = 0; i < len; i++)
			this._pRenderables[i].invalidateGeometry();
	}
}

export = Billboard;