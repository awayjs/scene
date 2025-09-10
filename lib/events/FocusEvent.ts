import { EventBase } from '@awayjs/core';

import { IEntity, View, INode, IPickable } from '@awayjs/view';
import FrameScriptManager from '../managers/FrameScriptManager';
/**
 * A FocusEvent is dispatched when a entity is focused
 */
export class FocusEvent extends EventBase {

	/**
	 * Defines the value of the type property of a focusIn3d event object.
	 */
	public static FOCUS_IN: string = 'focusIn3d';
	/**
	 * Defines the value of the type property of a focusOut3d event object.
	 */
	public static FOCUS_OUT: string = 'focusOut3d';

	/**
	 * The view object inside which the event took place.
	 */
	public view: View;

	/**
	 * The entity inside which the event took place.
	 */
	public entity: IEntity;

	/**
	 * True if the focus was set by mouse-interaction
	 */
	public invokedByMouse: IEntity;

	/**
	 * The pickable owner inside which the event took place.
	 */
	public pickable: IPickable;

	public commonAncestor: INode;

	/**
	 * Create a new MouseEvent object.
	 * @param type The type of the MouseEvent.
	 */
	constructor(type: string) {
		super(type);
	}

	/**
	 * Creates a copy of the MouseEvent object and sets the value of each property to match that of the original.
	 */
	public clone(): FocusEvent {
		const result: FocusEvent = new FocusEvent(this.type);

		/* TODO: Debug / test - look into isDefaultPrevented
		 if (isDefaultPrevented())
		 result.preventDefault();
		 */

		result.view = this.view;
		result.entity = this.entity;

		return result;
	}

	public _dispatchEvent(dispatcher: INode) {
		dispatcher.container.dispatchEvent(this);
		FrameScriptManager.execute_queue();
	}
}