import {Rectangle, Matrix3D, Box, Vector3D, Sphere} from "@awayjs/core";

import {ImageSampler, Image2D, ImageUtils} from "@awayjs/stage";

import {PickingCollision, PartitionBase, PickEntity, _Pick_PickableBase, EntityNode} from "@awayjs/view";

import {RenderableEvent, MaterialEvent, IMaterial, ITexture, StyleEvent} from "@awayjs/renderer";

import {DisplayObjectContainer} from "./DisplayObjectContainer";

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
export class Billboard extends DisplayObjectContainer
{
	public static assetType:string = "[asset Billboard]";

	private _width:number;
	private _height:number;
	private _billboardWidth:number;
	private _billboardHeight:number;
	private _billboardRect:Rectangle;

	private _onInvalidateTextureDelegate:(event:MaterialEvent) => void;

	public preserveDimensions:boolean = false;

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

	
	/**
	 *
	 */
	public get width():number
	{
		return this._width;
	}
	
	public set width(val:number)
	{
		if (this._width == val)
			return;

		this._width = val;

		this.scaleX = this._width/this._billboardRect.width;
	}
	
	/**
	 *
	 */
	public get height():number
	{
		return this._height;
	}

	public set height(val:number)
	{
		if (this._height == val)
			return;

		this._height = val;

		this.scaleY = this._height/this._billboardRect.height;
	}

	constructor(material:IMaterial, pixelSnapping:string = "auto", smoothing:boolean = false)
	{
		super();

		this._onInvalidateTextureDelegate = (event:MaterialEvent) => this._onInvalidateTexture(event);

		this.material = material;

		this._updateDimensions();
	}

	public isEntity():boolean
	{
		return true;
	}
	
	public clone():Billboard
	{
		var newInstance:Billboard = new Billboard(this.material);

		this.copyTo(newInstance);

		return newInstance;
	}

	public _acceptTraverser(traverser:IEntityTraverser):void
	{
		traverser.applyTraversable(this);
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

		this.invalidate();

		this.invalidateElements();

		if (!this.preserveDimensions) {
			this._width = this._billboardRect.width*this.scaleX;
			this._height = this._billboardRect.height*this.scaleY;
		} else {
			this.scaleX = this._width/this._billboardRect.width;
			this.scaleY = this._height/this._billboardRect.height;
		}
	}


	public invalidateElements():void
	{
		this.dispatchEvent(new RenderableEvent(RenderableEvent.INVALIDATE_ELEMENTS, this));
	}
	
	public invalidateMaterial():void
	{
		this.dispatchEvent(new RenderableEvent(RenderableEvent.INVALIDATE_MATERIAL, this));
	}
		
	public invalidateStyle():void
	{
		this.dispatchEvent(new RenderableEvent(RenderableEvent.INVALIDATE_STYLE, this));
	}

	public _onInvalidateProperties(event:StyleEvent = null):void
	{
		this.invalidateStyle();

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

import {MaterialUtils, _Stage_ElementsBase, _Render_MaterialBase, _Render_RenderableBase, RenderEntity, Style} from "@awayjs/renderer";

import {TriangleElements} from "@awayjs/graphics";
import { IEntityTraverser } from "@awayjs/view";

/**
 * @class away.pool.RenderableListItem
 */
export class _Render_Billboard extends _Render_RenderableBase
{
    private static _samplerElements:Object = new Object();

    public _id:string;

    /**
     * //TODO
     *
     * @returns {away.base.TriangleElements}
     */
    protected _getStageElements():_Stage_ElementsBase
    {
        var width:number = (<Billboard> this._asset).billboardWidth;
        var height:number = (<Billboard> this._asset).billboardHeight;
        var billboardRect:Rectangle = (<Billboard> this._asset).billboardRect;

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
        return this.renderGroup.getRenderElements(this.stageElements.elements).getAbstraction((<Billboard> this._asset).material || MaterialUtils.getDefaultColorMaterial());
	}
		
	protected _getStyle():Style
    {
        return (<Billboard> this._asset).style;
    }
}

/**
 * @class away.pool._Render_Shape
 */
export class _Pick_Billboard extends _Pick_PickableBase
{
	private _billboardBox:Box;
	private _billboardBoxDirty:boolean = true;
	private _onInvalidateElementsDelegate:(event:RenderableEvent) => void;

    /**
     * //TODO
     *
     * @param renderEntity
     * @param shape
     * @param level
     * @param indexOffset
     */
    constructor(billboard:Billboard, pickEntity:PickEntity)
    {
        super(billboard, pickEntity);

		this._onInvalidateElementsDelegate = (event:RenderableEvent) => this._onInvalidateElements(event);

		this._asset.addEventListener(RenderableEvent.INVALIDATE_ELEMENTS, this._onInvalidateElementsDelegate);
    }
	
	public _onInvalidateElements(event:RenderableEvent):void
    {
		this._billboardBoxDirty = true;
	}

    public onClear(event:AssetEvent):void
    {
		this._asset.removeEventListener(RenderableEvent.INVALIDATE_ELEMENTS, this._onInvalidateElementsDelegate);

        super.onClear(event);
	}
	
	public hitTestPoint(x:number, y:number, z:number):boolean
	{
		return true;
	}

	public getBoxBounds(matrix3D:Matrix3D = null, strokeFlag:boolean = true, cache:Box = null, target:Box = null):Box
	{
		if (this._billboardBoxDirty) {
			this._billboardBoxDirty = false;

			var billboardRect:Rectangle = (<Billboard> this._asset).billboardRect
			this._billboardBox = new Box(billboardRect.x, billboardRect.y, 0, billboardRect.width, billboardRect.height, 0);
		}

		return (matrix3D? matrix3D.transformBox(this._billboardBox) : this._billboardBox).union(target, target || cache);
	}

	public getSphereBounds(center:Vector3D, matrix3D:Matrix3D = null, strokeFlag:boolean = true, cache:Sphere = null, target:Sphere = null):Sphere
	{
		//TODO
		return target;
	}

	public testCollision(collision:PickingCollision, closestFlag:boolean):boolean
	{
		collision.pickable = null;

		//if (this._testGraphicCollision(<RenderableBase> this._renderablePool.getItem(billboard), pickingCollision, shortestCollisionDistance)) {
		//	shortestCollisionDistance = pickingCollision.rayEntryDistance;
		//
		//	pickingCollision.renderable = billboard;
		//
		//	return true;
		//}

		return false;
	}
}

RenderEntity.registerRenderable(_Render_Billboard, Billboard);
PickEntity.registerPickable(_Pick_Billboard, Billboard);
PartitionBase.registerAbstraction(EntityNode, Billboard);