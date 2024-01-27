import { ContainerNode, IPartitionContainer } from '@awayjs/view';

import FrameScriptManager from '../managers/FrameScriptManager';
import { MouseButtons } from '../base/MouseButtons';
import { PointerEvent } from './PointerEvent';

/**
 * A MouseEvent is dispatched when a mouse event occurs over a mouseEnabled object in View.
 * TODO: we don't have screenZ data, tho this should be easy to implement
 */
export class MouseEvent extends PointerEvent {
	/**
	 * Defines the value of the type property of a mouseOver3d event object.
	 */
	public static MOUSE_OVER: string = 'mouseOver3d';

	/**
	 * Defines the value of the type property of a mouseOut3d event object.
	 */
	public static MOUSE_OUT: string = 'mouseOut3d';

	/**
	 * Defines the value of the type property of a rollOver3d event object.
	 */
	public static ROLL_OVER: string = 'rollOver3d';

	/**
	 * Defines the value of the type property of a rollOut3d event object.
	 */
	public static ROLL_OUT: string = 'rollOut3d';
	/**
	 * Defines the value of the type property of a mouseUp3d event object.
	 */
	public static MOUSE_UP: string = 'mouseUp3d';
	/**
	 * Defines the value of the type property of a mouseUp3d event object.
	 */
	public static MOUSE_UP_OUTSIDE: string = 'mouseUpOutside3d';

	/**
	 * Defines the value of the type property of a mouseDown3d event object.
	 */
	public static MOUSE_DOWN: string = 'mouseDown3d';

	/**
	 * Defines the value of the type property of a mouseMove3d event object.
	 */
	public static MOUSE_MOVE: string = 'mouseMove3d';

	/**
	 * Defines the value of the type property of a dragMove3d event object.
	 */
	public static DRAG_MOVE: string = 'dragMove3d';
	/**
	 * Defines the value of the type property of a dragOut3d event object.
	 */
	public static DRAG_OUT: string = 'dragOut3d';
	/**
	 * Defines the value of the type property of a dragOver3d event object.
	 */
	public static DRAG_OVER: string = 'dragOver3d';
	/**
	 * Defines the value of the type property of a dragStart3d event object.
	 */
	public static DRAG_START: string = 'dragStart3d';
	/**
	 * Defines the value of the type property of a dragStop3d event object.
	 */
	public static DRAG_STOP: string = 'dragStop3d';

	/**
	 * Defines the value of the type property of a click3d event object.
	 */
	public static CLICK: string = 'click3d';

	/**
	 * Defines the value of the type property of a doubleClick3d event object.
	 */
	public static DOUBLE_CLICK: string = 'doubleClick3d';

	/**
	 * Defines the value of the type property of a mouseWheel3d event object.
	 */
	public static MOUSE_WHEEL: string = 'mouseWheel3d';

	/**
	 * Indicates how many lines should be scrolled for each unit the user rotates the mouse wheel.
	 */
	public delta: number;

	/**
	 * Current buttons status
	 */
	public buttons: MouseButtons = 0;

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
	public clone(): MouseEvent {
		const result: MouseEvent = new MouseEvent(this.type);

		/* TODO: Debug / test - look into isDefaultPrevented
		 if (isDefaultPrevented())
		 result.preventDefault();
		 */

		result.screenX = this.screenX;
		result.screenY = this.screenY;

		result.view = this.view;
		result.containerNode = this.containerNode;
		result.rootNode = this.rootNode;
		result.traversable = this.traversable;
		result.material = this.material;
		result.uv = this.uv;
		result.position = this.position;
		result.normal = this.normal;
		result.elementIndex = this.elementIndex;
		result.delta = this.delta;

		result.ctrlKey = this.ctrlKey;
		result.shiftKey = this.shiftKey;

		result._iParentEvent = this;
		result._iAllowedToPropagate = this._iAllowedToPropagate;
		result.buttons = this.buttons;

		return result;
	}

	public _dispatchEvent(dispatcher: ContainerNode, target: IPartitionContainer) {
		if (!dispatcher.isMouseDisabled() || this.type == MouseEvent.MOUSE_OUT || this.type == MouseEvent.ROLL_OUT) {
			dispatcher.container.dispatchEvent(this, target);
			FrameScriptManager.execute_queue();
		}
	}
}