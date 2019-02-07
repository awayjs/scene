import {Vector3D, Matrix3D, Box, Sphere} from "@awayjs/core";

import {PickingCollision, PartitionBase, _Pick_PickableBase, PickEntity, IEntityTraverser, EntityNode} from "@awayjs/view";

import {RenderableEvent, IMaterial} from "@awayjs/renderer";

import {DisplayObject} from "./DisplayObject";

/**
 * A Line Segment primitive.
 */
export class LineSegment extends DisplayObject
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
			
	public invalidateStyle():void
	{
		this.dispatchEvent(new RenderableEvent(RenderableEvent.INVALIDATE_STYLE, this));
	}
}

import {AssetEvent} from "@awayjs/core";

import {LineElements} from "@awayjs/graphics";

import {_Stage_ElementsBase, _Render_MaterialBase, _Render_RenderableBase, RenderEntity, MaterialUtils, Style} from "@awayjs/renderer";


/**
 * @class away.pool._Render_LineSegment
 */
export class _Render_LineSegment extends _Render_RenderableBase
{
    private static _lineGraphics:Object = new Object();

    /**
     * //TODO
     *
     * @returns {base.LineElements}
     * @protected
     */
    protected _getStageElements():_Stage_ElementsBase
    {
        var elements:LineElements = _Render_LineSegment._lineGraphics[(<LineSegment> this._asset).id] || (_Render_LineSegment._lineGraphics[(<LineSegment> this._asset).id] = new LineElements());

        var start:Vector3D = (<LineSegment> this._asset).startPosition;
        var end:Vector3D = (<LineSegment> this._asset).endPosition;

        var positions:Float32Array = new Float32Array(6);
        var thickness:Float32Array = new Float32Array(1);

        positions[0] = start.x;
        positions[1] = start.y;
        positions[2] = start.z;
        positions[3] = end.x;
        positions[4] = end.y;
        positions[5] = end.z;
        thickness[0] = (<LineSegment> this._asset).thickness;

        elements.setPositions(positions);
        elements.setThickness(thickness);

        return <_Stage_ElementsBase> this._stage.getAbstraction(elements);
    }

    protected _getRenderMaterial():_Render_MaterialBase
    {
        return this.renderGroup.getRenderElements(this.stageElements.elements).getAbstraction((<LineSegment> this._asset).material || MaterialUtils.getDefaultColorMaterial());
	}
	
	protected _getStyle():Style
    {
        return (<LineSegment> this._asset).style;
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
		
		this._onInvalidateElementsDelegate = (event:RenderableEvent) => this._onInvalidateElements(event);

		this._asset.addEventListener(RenderableEvent.INVALIDATE_ELEMENTS, this._onInvalidateElementsDelegate);
    }
	
	public _onInvalidateElements(event:RenderableEvent):void
    {
		this._lineSegmentBoxDirty = true;
		this._lineSegmentSphereDirty = true;
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
		if (this._lineSegmentBoxDirty) {
			this._lineSegmentBoxDirty = false;

			var startPosition:Vector3D = (<LineSegment> this._asset).startPosition;
			var endPosition:Vector3D = (<LineSegment> this._asset).endPosition;

			this._lineSegmentBox = new Box(Math.min(startPosition.x, endPosition.x), 
										Math.min(startPosition.y, endPosition.y),
										Math.min(startPosition.z, endPosition.z),
										Math.abs(startPosition.x - endPosition.x),
										Math.abs(startPosition.y - endPosition.y),
										Math.abs(startPosition.z - endPosition.z));
		}

		return (matrix3D? matrix3D.transformBox(this._lineSegmentBox) : this._lineSegmentBox).union(target, target || cache);
	}

	public getSphereBounds(center:Vector3D, matrix3D:Matrix3D = null, strokeFlag:boolean = true, cache:Sphere = null, target:Sphere = null):Sphere
	{
		if (this._lineSegmentSphereDirty) {
			this._lineSegmentSphereDirty = false;

			var startPosition:Vector3D = (<LineSegment> this._asset).startPosition;
			var endPosition:Vector3D = (<LineSegment> this._asset).endPosition;

			var halfWidth:number = (endPosition.x - startPosition.x)/2;
			var halfHeight:number = (endPosition.y - startPosition.y)/2;
			var halfDepth:number = (endPosition.z - startPosition.z)/2;
	
			this._lineSegmentSphere = new Sphere(startPosition.x + halfWidth, 
									startPosition.y + halfHeight,
									startPosition.z + halfDepth,
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