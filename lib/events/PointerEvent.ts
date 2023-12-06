import { Point, Vector3D, EventBase } from '@awayjs/core';

import { ContainerNode, INode, ITraversable, View, IPartitionContainer } from '@awayjs/view';

import { IMaterial } from '@awayjs/renderer';

/**
 * A MouseEvent is dispatched when a mouse event occurs over a mouseEnabled object in View.
 * TODO: we don't have screenZ data, tho this should be easy to implement
 */
export class PointerEvent extends EventBase {
	// Private.
	public _iParentEvent: PointerEvent;
	public commonAncestor: INode;

	/**
	 * The horizontal coordinate at which the event occurred in view coordinates.
	 */
	public screenX: number;

	/**
	 * The vertical coordinate at which the event occurred in view coordinates.
	 */
	public screenY: number;

	/**
	 * The view object inside which the event took place.
	 */
	public view: View;

	/**
	 * The container inside which the event took place.
	 */
	public containerNode: ContainerNode;

	/**
	 * The entity of the picker inside which the event took place.
	 */
	public rootNode: ContainerNode;

	/**
	 * The traversable owner inside which the event took place.
	 */
	public traversable: ITraversable;

	/**
	 * The material of the 3d element inside which the event took place.
	 */
	public material: IMaterial;

	/**
	 * The uv coordinate inside the draw primitive where the event took place.
	 */
	public uv: Point;

	/**
	 * The index of the elements where the event took place.
	 */
	public elementIndex: number;

	/**
	 * The position in object space where the event took place
	 */
	public position: Vector3D;

	/**
	 * The normal in object space where the event took place
	 */
	public normal: Vector3D;

	/**
	 * Indicates whether the Control key is active (true) or inactive (false).
	 */
	public ctrlKey: boolean;

	/**
	 * Indicates whether the Alt key is active (true) or inactive (false).
	 */
	public altKey: boolean;

	/**
	 * Indicates whether the Shift key is active (true) or inactive (false).
	 */
	public shiftKey: boolean;

	/**
	 * Create a new MouseEvent object.
	 * @param type The type of the MouseEvent.
	 */
	constructor(type: string) {
		super(type);
	}

	/**
	 * @inheritDoc
	 */
	public get bubbles(): boolean {
		const doesBubble: boolean = this._iAllowedToPropagate && this._iAllowedToImmediatlyPropagate;
		this._iAllowedToPropagate = true;
		this._iAllowedToImmediatlyPropagate = true;

		// Don't bubble if propagation has been stopped.
		return doesBubble;
	}

	/**
	 * @inheritDoc
	 */
	public stopPropagation(): void {
		this._iAllowedToPropagate = false;

		if (this._iParentEvent)
			this._iParentEvent.stopPropagation();
	}

	/**
	 * @inheritDoc
	 */
	public stopImmediatePropagation(): void {
		this._iAllowedToPropagate = false;
		this._iAllowedToImmediatlyPropagate = false;

		if (this._iParentEvent)
			this._iParentEvent.stopImmediatePropagation();
	}

	/**
	 * The position in scene space where the event took place
	 */
	public get scenePosition(): Vector3D {
		return this.containerNode.getMatrix3D().transformVector(this.position);
	}

	/**
	 * The normal in scene space where the event took place
	 */
	public get sceneNormal(): Vector3D {
		const sceneNormal: Vector3D = this.containerNode.getMatrix3D().deltaTransformVector(this.normal);
		sceneNormal.normalize();

		return sceneNormal;
	}

	public _dispatchEvent(dispatcher: ContainerNode, target: IPartitionContainer) {
	}
}