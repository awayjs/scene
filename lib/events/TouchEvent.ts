import { ContainerNode, IPartitionContainer } from '@awayjs/view';

import FrameScriptManager from '../managers/FrameScriptManager';
import { PointerEvent } from './PointerEvent';

/**
 * A touchEvent is dispatched when a touch event occurs over a touchEnabled object in View.
 * TODO: we don't have screenZ data, tho this should be easy to implement
 */
export class TouchEvent extends PointerEvent {

	/**
	 * Defines the value of the type property of a touchOver3d event object.
	 */
	public static TOUCH_OVER: string = 'touchOver3d';

	/**
	 * Defines the value of the type property of a touchOut3d event object.
	 */
	public static TOUCH_OUT: string = 'touchOut3d';

	/**
	 * Defines the value of the type property of a rollOver3d event object.
	 */
	public static TOUCH_ROLL_OVER: string = 'touchRollOver3d';

	/**
	 * Defines the value of the type property of a rollOut3d event object.
	 */
	public static TOUCH_ROLL_OUT: string = 'touchRollOut3d';
	/**
	 * Defines the value of the type property of a touchUp3d event object.
	 */
	public static TOUCH_END: string = 'touchUp3d';

	/**
	 * Defines the value of the type property of a touchDown3d event object.
	 */
	public static TOUCH_BEGIN: string = 'touchDown3d';

	/**
	 * Defines the value of the type property of a touchMove3d event object.
	 */
	public static TOUCH_MOVE: string = 'touchMove3d';

	/**
	 * Defines the value of the type property of a click3d event object.
	 */
	public static TOUCH_TAP: string = 'tap3d';

	/**
	 * Unique identifier of associated touchPoint
	 */
	public touchPointID: number = 0;

	/**
	 * Create a new touchEvent object.
	 * @param type The type of the touchEvent.
	 */
	constructor(type: string) {
		super(type);
	}

	/**
	 * Creates a copy of the touchEvent object and sets the value of each property to match that of the original.
	 */
	public clone(): TouchEvent {
		const result: TouchEvent = new TouchEvent(this.type);

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
		result.touchPointID = this.touchPointID;

		result.ctrlKey = this.ctrlKey;
		result.shiftKey = this.shiftKey;

		result._iParentEvent = this;
		result._iAllowedToPropagate = this._iAllowedToPropagate;

		return result;
	}

	public _dispatchEvent(dispatcher: ContainerNode, target: IPartitionContainer) {
		if (!dispatcher.isMouseDisabled() || this.type == TouchEvent.TOUCH_OUT || this.type == TouchEvent.TOUCH_ROLL_OUT) {
			dispatcher.container.dispatchEvent(this, target);
			FrameScriptManager.execute_queue();
		}
	}
}