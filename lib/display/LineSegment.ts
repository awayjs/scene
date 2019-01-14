import {Vector3D, Matrix3D, Box, Sphere} from "@awayjs/core";

import {PickingCollision, PartitionBase, _Pick_PickableBase, PickEntity, IEntityTraverser, EntityNode} from "@awayjs/view";

import {IRenderable, RenderableEvent, IMaterial} from "@awayjs/renderer";

import {DisplayObject} from "./DisplayObject";

/**
 * A Line Segment primitive.
 */
export class LineSegment extends DisplayObject implements IRenderable
{
	public static assetType:string = "[asset LineSegment]";

	public _startPosition:Vector3D;
	public _endPosition:Vector3D;
	public _halfThickness:number;
	
	/**
	 *
	 */
	public get assetType():string
	{
		return LineSegment.assetType;
	}

	/**
	 *
	 */
	public get startPosition():Vector3D
	{
		return this._startPosition;
	}

	public set startPosition(value:Vector3D)
	{
		if (this._startPosition == value)
			return;

		this._startPosition = value;

		this.invalidateElements();
	}

	/**
	 *
	 */
	public get endPosition():Vector3D
	{
		return this._endPosition;
	}

	public set endPosition(value:Vector3D)
	{
		if (this._endPosition == value)
			return;

		this._endPosition = value;

		this.invalidateElements();
	}

	/**
	 *
	 */
	public get thickness():number
	{
		return this._halfThickness*2;
	}

	public set thickness(value:number)
	{
		if (this._halfThickness == value)
			return;

		this._halfThickness = value*0.5;

		this.invalidateElements();
	}

	/**
	 * Create a line segment
	 *
	 * @param startPosition Start position of the line segment
	 * @param endPosition Ending position of the line segment
	 * @param thickness Thickness of the line
	 */
	constructor(material:IMaterial, startPosition:Vector3D, endPosition:Vector3D, thickness:number = 1)
	{
		super();

		this.material = material;

		this._startPosition = startPosition;
		this._endPosition = endPosition;
		this._halfThickness = thickness*0.5;
	}

	public isEntity():boolean
	{
		return true;
	}

	public _acceptTraverser(traverser:IEntityTraverser):void
	{
		traverser.applyTraversable(this);
	}

	/**
	 * @private
	 */
	public invalidateElements():void
	{
		this.dispatchEvent(new RenderableEvent(RenderableEvent.INVALIDATE_ELEMENTS, this));//TODO improve performance by only using one geometry for all line segments

		this.invalidate();
	}

	public invalidateMaterial():void
	{
		this.dispatchEvent(new RenderableEvent(RenderableEvent.INVALIDATE_MATERIAL, this));
	}
}

import {AssetEvent} from "@awayjs/core";

import {LineElements} from "@awayjs/graphics";

import {_Stage_ElementsBase, _Render_MaterialBase, _Render_RenderableBase, RenderEntity, MaterialUtils} from "@awayjs/renderer";


/**
 * @class away.pool._Render_LineSegment
 */
export class _Render_LineSegment extends _Render_RenderableBase
{
    private static _lineGraphics:Object = new Object();

    /**
     *
     */
    private _lineSegment:LineSegment;

    /**
     * //TODO
     *
     * @param pool
     * @param graphic
     * @param level
     * @param dataOffset
     */
    constructor(lineSegment:LineSegment, renderStatePool:RenderEntity)
    {
        super(lineSegment, renderStatePool);

        this._lineSegment = lineSegment;
    }

    public onClear(event:AssetEvent):void
    {
        super.onClear(event);

        this._lineSegment = null;
    }

    /**
     * //TODO
     *
     * @returns {base.LineElements}
     * @protected
     */
    protected _getStageElements():_Stage_ElementsBase
    {
        var elements:LineElements = _Render_LineSegment._lineGraphics[this._lineSegment.id] || (_Render_LineSegment._lineGraphics[this._lineSegment.id] = new LineElements());

        var start:Vector3D = this._lineSegment.startPosition;
        var end:Vector3D = this._lineSegment.endPosition;

        var positions:Float32Array = new Float32Array(6);
        var thickness:Float32Array = new Float32Array(1);

        positions[0] = start.x;
        positions[1] = start.y;
        positions[2] = start.z;
        positions[3] = end.x;
        positions[4] = end.y;
        positions[5] = end.z;
        thickness[0] = this._lineSegment.thickness;

        elements.setPositions(positions);
        elements.setThickness(thickness);

        return <_Stage_ElementsBase> this._stage.getAbstraction(elements);
    }

    protected _getRenderMaterial():_Render_MaterialBase
    {
        return this.renderGroup.getRenderElements(this.stageElements.elements).getAbstraction(this._lineSegment.material || MaterialUtils.getDefaultColorMaterial());
    }
}

/**
 * @class away.pool._Render_Shape
 */
export class _Pick_LineSegment extends _Pick_PickableBase
{
	private _lineSegmentBox:Box;
	private _lineSegmentBoxDirty:boolean = true;
	private _lineSegmentSphere:Sphere;
	private _lineSegmentSphereDirty:boolean = true;
	private _onInvalidateElementsDelegate:(event:RenderableEvent) => void;

    /**
     *
     */
    private _lineSegment:LineSegment;

    /**
     * //TODO
     *
     * @param renderEntity
     * @param shape
     * @param level
     * @param indexOffset
     */
    constructor(lineSegment:LineSegment, pickEntity:PickEntity)
    {
        super(lineSegment, pickEntity);

		this._lineSegment = lineSegment;
		
		this._onInvalidateElementsDelegate = (event:RenderableEvent) => this._onInvalidateElements(event);

		this._lineSegment.addEventListener(RenderableEvent.INVALIDATE_ELEMENTS, this._onInvalidateElementsDelegate);
    }
	
	public _onInvalidateElements(event:RenderableEvent):void
    {
		this._lineSegmentBoxDirty = true;
		this._lineSegmentSphereDirty = true;
	}

    public onClear(event:AssetEvent):void
    {
        super.onClear(event);

		this._lineSegment.removeEventListener(RenderableEvent.INVALIDATE_ELEMENTS, this._onInvalidateElementsDelegate);
        this._lineSegment = null;
	}
	
	public hitTestPoint(x:number, y:number, z:number):boolean
	{
		return true;
	}

	public getBoxBounds(matrix3D:Matrix3D = null, strokeFlag:boolean = true, cache:Box = null, target:Box = null):Box
	{
		if (this._lineSegmentBoxDirty) {
			this._lineSegmentBoxDirty = false;

			this._lineSegmentBox = new Box(Math.min(this._lineSegment.startPosition.x, this._lineSegment.endPosition.x), 
										Math.min(this._lineSegment.startPosition.y, this._lineSegment.endPosition.y),
										Math.min(this._lineSegment.startPosition.z, this._lineSegment.endPosition.z),
										Math.abs(this._lineSegment.startPosition.x - this._lineSegment.endPosition.x),
										Math.abs(this._lineSegment.startPosition.y - this._lineSegment.endPosition.y),
										Math.abs(this._lineSegment.startPosition.z - this._lineSegment.endPosition.z));
		}

		return (matrix3D? matrix3D.transformBox(this._lineSegmentBox) : this._lineSegmentBox).union(target, target || cache);
	}

	public getSphereBounds(center:Vector3D, matrix3D:Matrix3D = null, strokeFlag:boolean = true, cache:Sphere = null, target:Sphere = null):Sphere
	{
		if (this._lineSegmentSphereDirty) {
			this._lineSegmentSphereDirty = false;

			var halfWidth:number = (this._lineSegment.endPosition.x - this._lineSegment.startPosition.x)/2;
			var halfHeight:number = (this._lineSegment.endPosition.y - this._lineSegment.startPosition.y)/2;
			var halfDepth:number = (this._lineSegment.endPosition.z - this._lineSegment.startPosition.z)/2;
	
			this._lineSegmentSphere = new Sphere(this._lineSegment.startPosition.x + halfWidth, 
									this._lineSegment.startPosition.y + halfHeight,
									this._lineSegment.startPosition.z + halfDepth,
									Math.sqrt(halfWidth*halfWidth + halfHeight*halfHeight + halfDepth*halfDepth));
		}

		return (matrix3D? matrix3D.transformSphere(this._lineSegmentSphere) : this._lineSegmentSphere).union(target, target || cache);
	}

	public testCollision(collision:PickingCollision, closestFlag:boolean):boolean
	{
		collision.pickable = null;
		//TODO
		return false;
	}
}

RenderEntity.registerRenderable(_Render_LineSegment, LineSegment);
PickEntity.registerPickable(_Pick_LineSegment, LineSegment);
PartitionBase.registerAbstraction(EntityNode, LineSegment);