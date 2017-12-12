import {AssetEvent, Vector3D} from "@awayjs/core";

import {LineElements} from "@awayjs/graphics";

import {IEntity, ElementsStateBase, MaterialStateBase, RenderStateBase, RenderStatePool, MaterialUtils, RendererBase} from "@awayjs/renderer";

import {LineSegment} from "../display/LineSegment";

/**
 * @class away.pool.GL_LineSegmentRenderable
 */
export class GL_LineSegmentRenderable extends RenderStateBase
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
	constructor(lineSegment:LineSegment, renderStatePool:RenderStatePool)
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
	protected _getElements():ElementsStateBase
	{
		var elements:LineElements = GL_LineSegmentRenderable._lineGraphics[this._lineSegment.id] || (GL_LineSegmentRenderable._lineGraphics[this._lineSegment.id] = new LineElements());

		var start:Vector3D = this._lineSegment.startPostion;
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

		return <ElementsStateBase> this._stage.getAbstraction(elements);
	}

	protected _getMaterial():MaterialStateBase
	{
		return this._renderGroup.getMaterialStatePool(this.elementsGL.elements).getAbstraction(this._lineSegment.material || MaterialUtils.getDefaultColorMaterial());
	}
}