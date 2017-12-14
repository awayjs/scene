import {Rectangle, Matrix} from "@awayjs/core";

import {ImageSampler, Image2D, ImageUtils} from "@awayjs/stage";

import {TraverserBase, IRenderable, RenderableEvent, MaterialEvent, IMaterial, ITexture, StyleEvent} from "@awayjs/renderer";

import {BoundsType} from "../bounds/BoundsType";

import {DisplayObjectContainer} from "./DisplayObjectContainer";
import {DisplayObject} from "./DisplayObject";

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

	// todo: billboard needed to extend on DisplayObjectContainer in order for as3web/away3d adapters to compile without errors
// (in away3d Sprite3D extends on ObjectContainer3D)
export class Billboard extends DisplayObjectContainer implements IRenderable
{
	public static traverseName:string = TraverserBase.addRenderableName("applyBillboard");
	
	public static assetType:string = "[asset Billboard]";

	private _billboardWidth:number;
	private _billboardHeight:number;
	private _billboardRect:Rectangle;

	private _onInvalidateTextureDelegate:(event:MaterialEvent) => void;

	/**
	 *
	 */
	public get assetType():string
	{
		return Billboard.assetType;
	}

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
	public get material():IMaterial
	{
		return this._material;
	}

	public set material(value:IMaterial)
	{
		if (value == this._material)
			return;

		if (this._material) {
			this._material.iRemoveOwner(this);
			this._material.removeEventListener(MaterialEvent.INVALIDATE_TEXTURE, this._onInvalidateTextureDelegate);
		}


		this._material = value;

		if (this._material) {
			this._material.iAddOwner(this);
			this._material.addEventListener(MaterialEvent.INVALIDATE_TEXTURE, this._onInvalidateTextureDelegate);
		}
		this._updateDimensions();
	}

	constructor(material:IMaterial, pixelSnapping:string = "auto", smoothing:boolean = false)
	{
		super();

		this._pIsEntity = true;

		this._onInvalidateTextureDelegate = (event:MaterialEvent) => this._onInvalidateTexture(event);

		this.material = material;

		this._updateDimensions();

		//default bounds type
		this._boundsType = BoundsType.AXIS_ALIGNED_BOX;
	}

	/**
	 * @protected
	 */
	public _pUpdateBoxBounds():void
	{
		super._pUpdateBoxBounds();

		this._pBoxBounds.x = 0;
		this._pBoxBounds.y = 0;
		this._pBoxBounds.z = 0;
		this._pBoxBounds.width = this._billboardRect.width;
		this._pBoxBounds.height = this._billboardRect.height;
		this._pBoxBounds.depth = 0;
	}

	
	public clone():Billboard
	{
		var newInstance:Billboard = new Billboard(this.material);

		this.copyTo(newInstance);

		return newInstance;
	}

	public _acceptTraverser(traverser:TraverserBase):void
	{
		traverser[Billboard.traverseName](this);
	}

	private _updateDimensions():void
	{
		var texture:ITexture = this.material.getTextureAt(0);

		var image:Image2D = texture? <Image2D> ((this._style? this._style.getImageAt(texture) : null) || (this.material.style? this.material.style.getImageAt(texture) : null) || texture.getImageAt(0)) : null;

		if (image) {
			var sampler:ImageSampler = <ImageSampler> ((this._style? this._style.getSamplerAt(texture) : null) || (this.material.style? this.material.style.getSamplerAt(texture) : null) || texture.getSamplerAt(0) || ImageUtils.getDefaultSampler());
			if (sampler.imageRect) {
				this._billboardWidth = sampler.imageRect.width*image.width;
				this._billboardHeight = sampler.imageRect.height*image.height;
			} else {
				this._billboardWidth = image.rect.width;
				this._billboardHeight = image.rect.height;
			}

			this._billboardRect = sampler.frameRect || new Rectangle(0, 0, this._billboardWidth, this._billboardHeight);
		} else {
			this._billboardWidth = 1;
			this._billboardHeight = 1;
			this._billboardRect = new Rectangle(0, 0, 1, 1);
		}

		this._pInvalidateBounds();

		this.invalidateElements();

		if (this._width != null)
			this._setScaleX(this._width/this._billboardRect.width);

		if (this._height != null)
			this._setScaleY(this._height/this._billboardRect.height);
	}


	public invalidateElements():void
	{
		this.dispatchEvent(new RenderableEvent(RenderableEvent.INVALIDATE_ELEMENTS, this));
	}
	
	public invalidateMaterial():void
	{
		this.dispatchEvent(new RenderableEvent(RenderableEvent.INVALIDATE_MATERIAL, this));
	}

	public _onInvalidateProperties(event:StyleEvent = null):void
	{
		this.invalidateMaterial();

		this._updateDimensions();
	}

	/**
	 * @private
	 */
	private _onInvalidateTexture(event:MaterialEvent):void
	{
		this._updateDimensions();
	}
}

import {AssetEvent} from "@awayjs/core";

import {AttributesBuffer} from "@awayjs/stage";

import {IEntity, MaterialUtils, _Stage_ElementsBase, _Render_MaterialBase, _Render_RenderableBase, RenderEntity} from "@awayjs/renderer";

import {TriangleElements} from "@awayjs/graphics";

/**
 * @class away.pool.RenderableListItem
 */
export class _Render_Billboard extends _Render_RenderableBase
{
    private static _samplerElements:Object = new Object();

    /**
     *
     */
    private _billboard:Billboard;

    public _id:string;

    /**
     * //TODO
     *
     * @param pool
     * @param billboard
     */
    constructor(billboard:Billboard, renderEntity:RenderEntity)
    {
        super(billboard, renderEntity);

        this._billboard = billboard;
    }

    public onClear(event:AssetEvent):void
    {
        super.onClear(event);

        this._billboard = null;
    }

    /**
     * //TODO
     *
     * @returns {away.base.TriangleElements}
     */
    protected _getStageElements():_Stage_ElementsBase
    {
        var texture:ITexture = this._billboard.material.getTextureAt(0);

        var width:number = this._billboard.billboardWidth;
        var height:number = this._billboard.billboardHeight;
        var billboardRect:Rectangle = this._billboard.billboardRect;

        var id:string = width.toString() + height.toString() + billboardRect.toString();

        this._id = id;

        var elements:TriangleElements = _Render_Billboard._samplerElements[id];


        if (!elements) {
            elements = _Render_Billboard._samplerElements[id] = new TriangleElements(new AttributesBuffer(11, 4));
            elements.autoDeriveNormals = false;
            elements.autoDeriveTangents = false;
            elements.setIndices(Array<number>(0, 1, 2, 0, 2, 3));
            elements.setPositions(Array<number>(-billboardRect.x, height-billboardRect.y, 0, width-billboardRect.x, height-billboardRect.y, 0, width-billboardRect.x, -billboardRect.y, 0, -billboardRect.x, -billboardRect.y, 0));
            elements.setNormals(Array<number>(1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0));
            elements.setTangents(Array<number>(0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1));
            elements.setUVs(Array<number>(0, 1, 1, 1, 1, 0, 0, 0));
        } else {
            elements.setPositions(Array<number>(-billboardRect.x, height-billboardRect.y, 0, width-billboardRect.x, height-billboardRect.y, 0, width-billboardRect.x, -billboardRect.y, 0, -billboardRect.x, -billboardRect.y, 0));
        }

        return <_Stage_ElementsBase> this._stage.getAbstraction(elements);
    }

    protected _getRenderMaterial():_Render_MaterialBase
    {
        return this._renderGroup.getRenderElements(this.stageElements.elements).getAbstraction(this._billboard.material || MaterialUtils.getDefaultColorMaterial());
    }

}

RenderEntity.registerRenderable(_Render_Billboard, Billboard);