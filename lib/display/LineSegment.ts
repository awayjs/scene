import { Vector3D, Matrix3D, Box, Sphere } from '@awayjs/core';

import { PickingCollision, _Pick_PickableBase,
	PickEntity, IEntityTraverser, IEntity, 
	IPickable} from '@awayjs/view';

import { IMaterial } from '@awayjs/renderer';

import { DisplayObject } from './DisplayObject';

/**
 * A Line Segment primitive.
 */
export class LineSegment extends DisplayObject implements IPickable {
	public static assetType: string = '[asset LineSegment]';

	public _startPosition: Vector3D;
	public _endPosition: Vector3D;
	public _halfThickness: number;

	public _pickObjects: Record<number, _Pick_PickableBase> = {};

	/**
	 *
	 */
	public get assetType(): string {
		return LineSegment.assetType;
	}

	/**
	 *
	 */
	public get startPosition(): Vector3D {
		return this._startPosition;
	}

	public set startPosition(value: Vector3D) {
		if (this._startPosition == value)
			return;

		this._startPosition = value;

		this.invalidateElements();
	}

	/**
	 *
	 */
	public get endPosition(): Vector3D {
		return this._endPosition;
	}

	public set endPosition(value: Vector3D) {
		if (this._endPosition == value)
			return;

		this._endPosition = value;

		this.invalidateElements();
	}

	/**
	 *
	 */
	public get thickness(): number {
		return this._halfThickness * 2;
	}

	public set thickness(value: number) {
		if (this._halfThickness == value)
			return;

		this._halfThickness = value * 0.5;

		this.invalidateElements();
	}

	/**
	 * Create a line segment
	 *
	 * @param startPosition Start position of the line segment
	 * @param endPosition Ending position of the line segment
	 * @param thickness Thickness of the line
	 */
	constructor(material: IMaterial, startPosition: Vector3D, endPosition: Vector3D, thickness: number = 1) {
		super();

		this.material = material;

		this._startPosition = startPosition;
		this._endPosition = endPosition;
		this._halfThickness = thickness * 0.5;
	}

	public invalidateElements(): void {
		for (const key in this._pickObjects)
			this._pickObjects[key]._onInvalidateElements();

		super.invalidateElements();
	}

	public getEntity(): IEntity {
		return this;
	}

	public _acceptTraverser(traverser: IEntityTraverser): void {
		traverser.applyTraversable(this);
	}
}

import { LineElements } from '@awayjs/renderer';

import { _Stage_ElementsBase, _Render_MaterialBase, _Render_RenderableBase,
	RenderEntity, MaterialUtils, Style } from '@awayjs/renderer';

/**
 * @class away.pool._Render_LineSegment
 */
export class _Render_LineSegment extends _Render_RenderableBase {
	private static _lineGraphics: Object = {};

	/**
     * //TODO
     *
     * @returns {base.LineElements}
     * @protected
     */
	protected _getStageElements(): _Stage_ElementsBase {
		const lineSegment: LineSegment = <LineSegment> this.renderable;
		const elements: LineElements = _Render_LineSegment._lineGraphics[lineSegment.id]
			|| (_Render_LineSegment._lineGraphics[lineSegment.id] = new LineElements());

		const start: Vector3D = lineSegment.startPosition;
		const end: Vector3D = lineSegment.endPosition;

		const positions: Float32Array = new Float32Array(6);
		const thickness: Float32Array = new Float32Array(1);

		positions[0] = start.x;
		positions[1] = start.y;
		positions[2] = start.z;
		positions[3] = end.x;
		positions[4] = end.y;
		positions[5] = end.z;
		thickness[0] = lineSegment.thickness;

		elements.setPositions(positions);
		elements.setThickness(thickness);

		return this._stage.abstractions.getAbstraction<_Stage_ElementsBase>(elements);
	}

	protected _getRenderMaterial(): _Render_MaterialBase {
		return this.entity.renderer
			.getRenderElements(this.stageElements.elements).abstractions
			.getAbstraction<_Render_MaterialBase>(
				(<LineSegment> this.renderable).material
				|| MaterialUtils.getDefaultColorMaterial()
			);
	}

	protected _getStyle(): Style {
		return this.renderable.style;
	}
}

/**
 * @class away.pool._Render_Shape
 */
export class _Pick_LineSegment extends _Pick_PickableBase {

	public hitTestPoint(x: number, y: number, z: number): boolean {
		return true;
	}

	public getBoxBounds(matrix3D: Matrix3D = null, strokeFlag: boolean = true,
		cache: Box = null, target: Box = null): Box {
		if (this._orientedBoxBoundsDirty) {
			this._orientedBoxBoundsDirty = false;

			const lineSegment: LineSegment = <LineSegment> this.pickable;
			const startPosition: Vector3D = lineSegment.startPosition;
			const endPosition: Vector3D = lineSegment.endPosition;

			this._orientedBoxBounds = new Box(Math.min(startPosition.x, endPosition.x),
				Math.min(startPosition.y, endPosition.y),
				Math.min(startPosition.z, endPosition.z),
				Math.abs(startPosition.x - endPosition.x),
				Math.abs(startPosition.y - endPosition.y),
				Math.abs(startPosition.z - endPosition.z));
		}

		return (matrix3D ?
			matrix3D.transformBox(this._orientedBoxBounds) :
			this._orientedBoxBounds).union(target, target || cache);
	}

	public getSphereBounds(center: Vector3D, matrix3D: Matrix3D = null, strokeFlag: boolean = true,
		cache: Sphere = null, target: Sphere = null): Sphere {
		if (this._orientedSphereBoundsDirty) {
			this._orientedSphereBoundsDirty = false;

			const lineSegment: LineSegment = <LineSegment> this.pickable;
			const startPosition: Vector3D = lineSegment.startPosition;
			const endPosition: Vector3D = lineSegment.endPosition;

			const halfWidth: number = (endPosition.x - startPosition.x) / 2;
			const halfHeight: number = (endPosition.y - startPosition.y) / 2;
			const halfDepth: number = (endPosition.z - startPosition.z) / 2;

			this._orientedSphereBounds = new Sphere(startPosition.x + halfWidth,
				startPosition.y + halfHeight,
				startPosition.z + halfDepth,
				Math.sqrt(halfWidth * halfWidth + halfHeight * halfHeight + halfDepth * halfDepth));
		}

		return (matrix3D ?
			matrix3D.transformSphere(this._orientedSphereBounds) :
			this._orientedSphereBounds).union(target, target || cache);
	}

	public testCollision(collision: PickingCollision, closestFlag: boolean): boolean {
		collision.pickable = null;
		//TODO
		return false;
	}
}

RenderEntity.registerRenderable(_Render_LineSegment, LineSegment);
PickEntity.registerPickable(_Pick_LineSegment, LineSegment);