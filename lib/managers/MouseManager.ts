import { Vector3D } from '@awayjs/core';
import { Stage } from '@awayjs/stage';

import { PickingCollision, RaycastPicker, ContainerNode } from '@awayjs/view';
import { FocusEvent } from '../events/FocusEvent';

import { KeyboardEvent } from '../events/KeyboardEvent';
import { MouseEvent as AwayMouseEvent } from '../events/MouseEvent';
import { TouchEvent as AwayTouchEvent } from '../events/TouchEvent';
import { PointerEvent } from '../events/PointerEvent';

import { IInputRecorder } from './IInputRecorder';
import { MouseButtons } from '../base/MouseButtons';

/**
 * MouseManager enforces a singleton pattern and is not intended to be instanced.
 * it provides a manager class for detecting mouse hits on scene objects and sending out mouse events.
 */
export class MouseManager {
	private static _instance: MouseManager;
	public static inputRecorder: IInputRecorder;

	private _stage: Stage;
	private static _instancePool: Record<number, MouseManager> = {};
	private _pickerLookup: Array<RaycastPicker> = new Array<RaycastPicker>();
	private _pointerDataArray: Record<number, PointerData> = {};

	private _updateDirty: boolean;

	private _mouseDragCollision: PickingCollision;     // entity hit on mouse-down
	private _mouseDragging: boolean;            // true while mosue is dragged
	private _focusNode: ContainerNode;       // entity currently in focus

	public allowKeyInput: boolean=true;

	private _eventBubbling: boolean=true;           //  should events bubble up
	private _allowFocusOnUnfocusable: boolean=true;  // should unfocus-able object steal focus ?

	private _showCursor: boolean;
	private _cursorType: 'pointer' | 'auto'  = 'auto';

	private _nullVector: Vector3D = new Vector3D();

	private static _touchToMouseDict: Record<string, string> = {
		touchstart: 'mousedown',
		touchend: 'mouseup',
		touchmove: 'mousemove',
	}

	public static _pointerDict: Record<string, PointerEvent> = {
		mouseup: new AwayMouseEvent(AwayMouseEvent.MOUSE_UP),
		mouseupoutside: new AwayMouseEvent(AwayMouseEvent.MOUSE_UP_OUTSIDE),
		click: new AwayMouseEvent(AwayMouseEvent.CLICK),
		mouseout: new AwayMouseEvent(AwayMouseEvent.MOUSE_OUT),
		mousedown: new AwayMouseEvent(AwayMouseEvent.MOUSE_DOWN),
		mousemove: new AwayMouseEvent(AwayMouseEvent.MOUSE_MOVE),
		mouseover: new AwayMouseEvent(AwayMouseEvent.MOUSE_OVER),
		mousewheel: new AwayMouseEvent(AwayMouseEvent.MOUSE_WHEEL),
		dblclick: new AwayMouseEvent(AwayMouseEvent.DOUBLE_CLICK),
		rollover: new AwayMouseEvent(AwayMouseEvent.ROLL_OVER),
		rollout: new AwayMouseEvent(AwayMouseEvent.ROLL_OUT),
		touchend: new AwayTouchEvent(AwayTouchEvent.TOUCH_END),
		touchtap: new AwayTouchEvent(AwayTouchEvent.TOUCH_TAP),
		touchout: new AwayTouchEvent(AwayTouchEvent.TOUCH_OUT),
		touchstart: new AwayTouchEvent(AwayTouchEvent.TOUCH_BEGIN),
		touchmove: new AwayTouchEvent(AwayTouchEvent.TOUCH_MOVE),
		touchover: new AwayTouchEvent(AwayTouchEvent.TOUCH_OVER),
		touchrollover: new AwayTouchEvent(AwayTouchEvent.TOUCH_ROLL_OVER),
		touchrollout: new AwayTouchEvent(AwayTouchEvent.TOUCH_ROLL_OUT),

	}

	private _dragOut: AwayMouseEvent = new AwayMouseEvent(AwayMouseEvent.DRAG_OUT);
	private _dragOver: AwayMouseEvent = new AwayMouseEvent(AwayMouseEvent.DRAG_OVER);

	private _dragMove: AwayMouseEvent = new AwayMouseEvent(AwayMouseEvent.DRAG_MOVE);
	private _dragStart: AwayMouseEvent = new AwayMouseEvent(AwayMouseEvent.DRAG_START);
	private _dragStop: AwayMouseEvent = new AwayMouseEvent(AwayMouseEvent.DRAG_STOP);

	private _focusIn: FocusEvent = new FocusEvent(FocusEvent.FOCUS_IN);
	private _focusOut: FocusEvent = new FocusEvent(FocusEvent.FOCUS_OUT);

	private _useSoftkeyboard: boolean = false;

	private _isAVM1Dragging: Boolean = false;

	public startDragObject(collision?: PickingCollision) {
		this._isAVM1Dragging = true;

		// we MUST overrider collision target if present, because draggable !== drag emitter
		if (collision)
			this._mouseDragCollision = collision;
	}

	public stopDragObject() {
		this._isAVM1Dragging = false;
	}

	public get showCursor(): boolean {
		return this._showCursor;
	}

	public set showCursor(value: boolean) {
		this._showCursor = value;
		this.cursorType = this._cursorType;
	}

	public set cursorType(t: 'pointer' | 'auto') {
		this._cursorType = t;
		this._stage.container.style.cursor = this._showCursor ? t : 'none';
	}

	public get cursorType() {
		return this._cursorType;
	}

	public get eventBubbling(): boolean {
		return this._eventBubbling;
	}

	public set eventBubbling(value: boolean) {
		this._eventBubbling = value;
	}

	/**
	 * Creates a new <code>MouseManager</code> object.
	 */
	constructor(stage: Stage) {
		this._stage = stage;
		this.onDoubleClick = this.onDoubleClick.bind(this);
		this.onMouseDown = this.onMouseDown.bind(this);
		this.onMouseMove = this.onMouseMove.bind(this);
		this.onMouseUp = this.onMouseUp.bind(this);
		this.onMouseWheel = this.onMouseWheel.bind(this);
		this.onMouseOver = this.onMouseOver.bind(this);
		this.onMouseOut = this.onMouseOut.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.onKeyUp = this.onKeyUp.bind(this);

		this._showCursor = true;
		this._mouseDragging = false;

		//register stage
		const container = this._stage.container;
		container.addEventListener('touchstart', this.onMouseDown);
		container.addEventListener('mousedown', this.onMouseDown);

		window.addEventListener('touchmove', this.onMouseMove);
		window.addEventListener('mousemove', this.onMouseMove);
		window.addEventListener('mouseup', this.onMouseUp);

		container.addEventListener('touchend', this.onMouseUp);
		container.addEventListener('mousewheel', this.onMouseWheel);
		container.addEventListener('mouseover', this.onMouseOver);
		container.addEventListener('mouseout', this.onMouseOut);

		window.addEventListener('keydown', this.onKeyDown);
		window.addEventListener('keyup', this.onKeyUp);

		// supress context menu
		container.addEventListener('contextmenu', e => e.preventDefault());
	}

	public set useSoftkeyboard(value: boolean) {

		this._useSoftkeyboard = value;
		// todo: improve this, so that we can
		//	- use device-softkeyboard on tablet / mobide
		//	- optionally use a custom softkeyboard
		if (!value) {
			window.addEventListener('keydown', this.onKeyDown);
			window.addEventListener('keyup', this.onKeyUp);
		} else if (value) {
			window.removeEventListener('keydown', this.onKeyDown);
			window.removeEventListener('keyup', this.onKeyUp);
		}
	}

	public get useSoftkeyboard(): boolean {
		return this._useSoftkeyboard;
	}

	public dispose() {
		//unregister stage
		const container = this._stage.container;
		container.removeEventListener('dblclick', this.onDoubleClick);
		container.removeEventListener('touchstart', this.onMouseDown);
		container.removeEventListener('mousedown', this.onMouseDown);
		window.removeEventListener('touchmove', this.onMouseMove);
		window.removeEventListener('mousemove', this.onMouseMove);
		window.removeEventListener('mouseup', this.onMouseUp);
		container.removeEventListener('touchend', this.onMouseUp);
		container.removeEventListener('wheel', this.onMouseWheel);
		container.removeEventListener('mouseover', this.onMouseOver);
		container.removeEventListener('mouseout', this.onMouseOut);
		window.removeEventListener('keydown', this.onKeyDown);
		window.removeEventListener('keyup', this.onKeyUp);

		this._stage = null;

		this._dragOut = null;
		this._dragOver = null;
		this._dragMove = null;
		this._dragStart = null;
		this._dragStop = null;

	}

	public static clearInstance(stage: Stage) {
		if (this._instancePool[stage.id]) {
			this._instancePool[stage.id].dispose();
			delete this._instancePool[stage.id];
		}
	}

	public static getInstance(stage: Stage): MouseManager {
		return this._instancePool[stage.id]
			|| (this._instancePool[stage.id] = new MouseManager(stage));

	}

	public setFocus(node: ContainerNode) {
		if (this._focusNode == node)
			return;

		//  in FP6, a mouseclick on non focus-able object still steal the focus
		//  in newer FP they only steal the focus if the the new hit is focusable
		if (this._allowFocusOnUnfocusable || this._focusNode.container.tabEnabled) {
			if (this._focusNode) {
				this.dispatchEvent(this._focusOut, this._focusNode);
				this._focusNode.container.setFocus(false, true);
			}

			this._focusNode = node;

			if (this._focusNode) {
				this.dispatchEvent(this._focusIn, this._focusNode);
				this._focusNode.container.setFocus(true, true);
			}
		}
	}

	public getFocus() {
		return this._focusNode;
	}

	private dispatchEvent(event: PointerEvent | FocusEvent, dispatcher: ContainerNode) {
		if (!this._eventBubbling) {
			if (dispatcher) {
				event._dispatchEvent(dispatcher, dispatcher.container);
			}
			return;
		}

		const target = dispatcher?.container;

		while (dispatcher) {
			if (event.commonAncestor && dispatcher == event.commonAncestor) {
				return;
			}
			event._dispatchEvent(dispatcher, target);

			if (!event._iAllowedToPropagate) {
				dispatcher = null;
			} else {
				dispatcher = dispatcher.parent;
			}
		}
	}

	private setupAndDispatchEvent(event: PointerEvent, pointerData: PointerData,
		collision: PickingCollision, commonAncestor: ContainerNode = null) {

		const sourceEvent = pointerData.sourceEvent;
		if (sourceEvent) {
			if (event instanceof AwayMouseEvent) {
				event.delta = (<WheelEvent> sourceEvent).deltaY;
				event.buttons = (<MouseEvent> sourceEvent).buttons;
			}
			event.ctrlKey = sourceEvent.ctrlKey;
			event.altKey = sourceEvent.altKey;
			event.shiftKey = sourceEvent.shiftKey;
		}

		event = this.setUpEvent(event, pointerData, collision, commonAncestor);
		this.dispatchEvent(event, event.rootNode);
	}

	public fireMouseEvents(forcePicker: RaycastPicker = null): void {
		//if theres nothing to update, return
		if (!forcePicker && !this._updateDirty)
			return;

		for (const key in this._pointerDataArray) {
			this._fireMouseEventsInternal(this._pointerDataArray[key], forcePicker);
		}
	}

	private _fireMouseEventsInternal(pointerData: PointerData, forcePicker: RaycastPicker = null): void {
		let collision: PickingCollision;
		if (forcePicker) {
			collision = forcePicker.getViewCollision(pointerData.screenX, pointerData.screenY);
		} else if (this._updateDirty) {
			for (let i = 0; i < this._pickerLookup.length; i++)
				if (!collision || this._pickerLookup[i].layeredView)
					collision = this._pickerLookup[i].getViewCollision(pointerData.screenX,
						pointerData.screenY, false, collision);
		}

		let event: PointerEvent;
		let dispatcher: ContainerNode;

		const len = pointerData.queuedEvents.length;
		for (let i = 0; i < len; ++i) {
			event = pointerData.queuedEvents[i];
			dispatcher = collision?.rootNode;

			this.setUpEvent(event, pointerData, collision);

			if (event.type == pointerData.down.type) {
				this._mouseDragging = true;

				// no event-bubbling. dispatch on stage first
				if (!this._eventBubbling)
					this._stage.dispatchEvent(event);

				// @todo: at this point the object under the mouse might have been changed,
				// so we need to recheck the collision ?

				// on Touch dispatch mouseOver Command
				if (!pointerData.isMouse)
					this.setupAndDispatchEvent(pointerData.over, pointerData, collision);

				if (pointerData.id == 0)
					this._mouseDragCollision = collision;

				if (dispatcher) {
					//console.log("onPress", dispatcher)
					this.dispatchEvent(event, dispatcher);
				} else if (this._eventBubbling)
					this._stage.dispatchEvent(event);

				if (this._mouseDragCollision) {
					this.setFocus(this._mouseDragCollision?.rootNode);
					this.setupAndDispatchEvent(this._dragStart, pointerData, this._mouseDragCollision);
				}

			} else if (event.type == pointerData.up.type) {

				// no event-bubbling. dispatch on stage first
				if (!this._eventBubbling)
					this._stage.dispatchEvent(event);

				// @todo: at this point the object under the mouse might have been changed,
				// so we need to recheck the collision ?

				let upContainerNode: ContainerNode = null;
				let upRootNode: ContainerNode = null;
				if (this._isAVM1Dragging && this._mouseDragCollision) {
					// avm1dragging is in process, dispatch the mouse-up on this.
					// mouseDragEntity instead of the current collision
					upRootNode = this._mouseDragCollision.rootNode;
					upContainerNode = this._mouseDragCollision.containerNode;
				} else if (this._mouseDragging && this._mouseDragCollision
					&& this._mouseDragCollision.rootNode != dispatcher) {
					// no avm1dragging is in process, but current collision
					// is not the same as collision that appeared on mouse-down,
					// need to dispatch a MOUSE_UP_OUTSIDE after mouse up
				} else if (this._mouseDragging && this._mouseDragCollision
					&& this._mouseDragCollision.rootNode == dispatcher) {
					// no avm1dragging is in process,
					// current collision is the same as collision that appeared on
					// mouse-down, need to dispatch a MOUSE_CLICK event after mouse up
					upRootNode = this._mouseDragCollision.rootNode;
					upContainerNode = this._mouseDragCollision.containerNode;
				}

				if (upRootNode) {
					//console.log("onRelease", upRootNode)
					this.dispatchEvent(event, upRootNode);
				} else if (this._eventBubbling && dispatcher)
					this.dispatchEvent(event, dispatcher);
				else if (this._eventBubbling)
					this._stage.dispatchEvent(event);

				if (upContainerNode) {
					if (!this._isAVM1Dragging)
						this.setupAndDispatchEvent(pointerData.click, pointerData, this._mouseDragCollision);
					this.setupAndDispatchEvent(this._dragStop, pointerData, this._mouseDragCollision);
				} else if (this._mouseDragging && this._mouseDragCollision) {
					this.setupAndDispatchEvent(pointerData.upOutside, pointerData, this._mouseDragCollision);
				}

				this._mouseDragCollision = null;
				this._mouseDragging = false;
				this._isAVM1Dragging = false;

				//make sure to clear old touch references when no longer needed
				if (pointerData.id != 0)
					delete this._pointerDataArray[pointerData.id];

			} else if (event.type == pointerData.move.type) {

				// no event-bubbling. dispatch on stage first
				if (!this._eventBubbling)
					this._stage.dispatchEvent(event);

				// fire to picker
				if (dispatcher) {
					this.dispatchEvent(event, dispatcher);
				} else if (this._eventBubbling) {
					this._stage.dispatchEvent(event);
				}

				if (this._mouseDragCollision) {
					this.setupAndDispatchEvent(this._dragMove, pointerData, this._mouseDragCollision);
				}

			} else {
				// MouseEvent.MOUSE_OVER / MouseEvent.MOUSE_OUT / MouseEvent.DRAG_OVER / MouseEvent.DRAG_OUT
				this.dispatchEvent(event, dispatcher);
			}
		}

		pointerData.queuedEvents.length = 0;

		pointerData.rollOut.commonAncestor = null;
		pointerData.rollOver.commonAncestor = null;

		const collisionNode: ContainerNode = collision?.rootNode;
		const prevCollisionNode: ContainerNode = pointerData.prevCollision?.rootNode;

		if (collisionNode != prevCollisionNode) {

			//  If colliding object has changed, queue OVER and OUT events.
			//  If the mouse is dragged (mouse-down is hold), use DRAG_OVER and DRAG_OUT as well as MOUSE_OVER MOUSE_OUT
			//  DRAG_OVER and DRAG_OUT are only dispatched on the object that was hit on the mouse-down
			// (_mouseDragEntity)

			//  Store the info if the collision is a enabled Button (_collisionIsEnabledButton)

			if (prevCollisionNode) {
				this.setupAndDispatchEvent(pointerData.out, pointerData, pointerData.prevCollision);

				if (this._mouseDragging && this._mouseDragCollision
					&& this._mouseDragCollision.rootNode == prevCollisionNode)
					this.setupAndDispatchEvent(this._dragOut, pointerData, pointerData.prevCollision);
			}

			if (!prevCollisionNode && collisionNode) {
				// rollout / rollover easy case, can just bubble up
				this.setupAndDispatchEvent(pointerData.rollOut, pointerData, pointerData.prevCollision);
				this.setupAndDispatchEvent(pointerData.rollOver, pointerData, collision);
			}
			if (prevCollisionNode && !collisionNode) {
				// rollout / rollover easy case, can just bubble up
				this.setupAndDispatchEvent(pointerData.rollOut, pointerData, pointerData.prevCollision);
				this.setupAndDispatchEvent(pointerData.rollOver, pointerData, collision);
			}
			if (prevCollisionNode && collisionNode) {
				// rollout / rollover find common ancester and only bubble up to that point
				const parentsPrev: ContainerNode[] = [];
				let parent: ContainerNode = prevCollisionNode;
				while (parent && !parent.container.isAVMScene) {
					parentsPrev.push(parent);
					parent = parent.parent;
				}
				let commonAncestor: ContainerNode = null;
				parent = collisionNode;
				while (parent && !parent.container.isAVMScene) {
					const oldParentIdx = parentsPrev.indexOf(parent);
					if (oldParentIdx == -1) {
						parent = parent.parent;
					} else {
						commonAncestor = parent;
						parent = null;
					}
				}
				if (commonAncestor != prevCollisionNode)
					this.setupAndDispatchEvent(pointerData.rollOut, pointerData,
						pointerData.prevCollision, commonAncestor);

				if (commonAncestor != collisionNode)
					this.setupAndDispatchEvent(pointerData.rollOver, pointerData, collision, commonAncestor);

			}

			pointerData.collisionIsEnabledButton = collisionNode ? (<any> collisionNode).buttonEnabled : false;

			if (collisionNode) {
				this.setupAndDispatchEvent(pointerData.over, pointerData, collision);

				if (this._mouseDragging)
					this.setupAndDispatchEvent(this._dragOver, pointerData, collision);
			}

			pointerData.prevCollision = collision;
		} else {
			//  colliding object has not changed
			//  Check if we need to send any MOUSE_OVER/DRAG_OVER event to handle the case
			//  when a Button has become active while under the mouse.
			const isActiveButton = collisionNode ? (<any> collisionNode).buttonEnabled : false;

			if (pointerData.collisionIsEnabledButton != isActiveButton && isActiveButton) {
				if (pointerData.isMouse)
					this.setupAndDispatchEvent(pointerData.over, pointerData, collision);
				else if (this._mouseDragCollision && this._mouseDragCollision.rootNode == collisionNode)
					this.setupAndDispatchEvent(this._dragOver, pointerData, collision);
			}

			pointerData.collisionIsEnabledButton = isActiveButton;
		}

		// set cursor if not dragging mouse ???
		if (!this._mouseDragging) {
			this.cursorType = collisionNode ? <any>collisionNode.container.getMouseCursor() : 'auto';
		}

		this._updateDirty = false;
	}

	public registerPicker(picker: RaycastPicker): void {
		this._pickerLookup.push(picker);
	}

	public unregisterPicker(picker: RaycastPicker): void {
		this._pickerLookup.splice(this._pickerLookup.indexOf(picker), 1);
	}

	public addEventsForSceneBinary(touchMessage: ArrayBuffer, sceneIdx: number = 0): void {

		const newTouchEvent: any = {};
		newTouchEvent.clientX = null;// we get the x position from the active touch
		newTouchEvent.clientY = null;// we get the y position from the active touch
		newTouchEvent.touches = [];
		newTouchEvent.changedTouches = [];
		newTouchEvent.preventDefault = function () { };
		const messageScene: Float32Array = new Float32Array(touchMessage);
		// transfer touches to event
		let i = 0;
		let cnt = 0;
		const touchCnt = 0;
		cnt++;//we temporary added 1 float to transfer fps from java to js. skip this
		const numTouches = messageScene[cnt++];
		const touchtype = messageScene[cnt++];
		const activeTouchID = messageScene[cnt++];

		if ((touchtype != 1) && (touchtype != 6) && (touchtype != 12) && (touchtype != 262) && (touchtype != 518)) {
			// if this is not a UP command, we add all touches
			for (i = 0; i < numTouches; i++) {
				const newTouch: any = {};
				newTouch.identifier = messageScene[cnt++];
				newTouch.clientX = messageScene[cnt++];
				newTouch.clientY = messageScene[cnt++];
				newTouchEvent.touches[i] = newTouch;
				//newTouchEvent.changedTouches[i] = newTouch;
			}
			newTouchEvent.changedTouches[0] = newTouchEvent.touches[activeTouchID];

		} else {
			// if this is a UP command, we add all touches, except the active one
			if (numTouches == 1) {

				const newTouch: any = {};
				newTouch.identifier = messageScene[cnt++];
				newTouch.clientX = messageScene[cnt++];
				newTouch.clientY = messageScene[cnt++];
				newTouchEvent.clientX = newTouch.clientX;
				newTouchEvent.clientY = newTouch.clientY;

			} else {
				for (i = 0; i < numTouches; i++) {
					const newTouch: any = {};
					newTouch.identifier = messageScene[cnt++];
					newTouch.clientX = messageScene[cnt++];
					newTouch.clientY = messageScene[cnt++];
					if (i != activeTouchID) {
						newTouchEvent.touches[touchCnt] = newTouch;
						//newTouchEvent.changedTouches[touchCnt++] = newTouch;
					} else {
						newTouchEvent.clientX = newTouch.clientX;
						newTouchEvent.clientY = newTouch.clientY;
					}
				}
			}
		}

		//console.log("Touch ID:"+touchtype+" activeTouchID "+activeTouchID+" numTouches "+numTouches+" x"+x+" y"+y);
		/*
		 public static final int ACTION_DOWN = 0;
		 public static final int ACTION_POINTER_1_DOWN = 5;
		 public static final int ACTION_POINTER_DOWN = 5;
		 public static final int ACTION_BUTTON_PRESS = 11;
		 public static final int ACTION_POINTER_2_DOWN = 261;
		 public static final int ACTION_POINTER_3_DOWN = 517;

		 public static final int ACTION_UP = 1;
		 public static final int ACTION_POINTER_1_UP = 6;
		 public static final int ACTION_POINTER_UP = 6;
		 public static final int ACTION_BUTTON_RELEASE = 12;
		 public static final int ACTION_POINTER_2_UP = 262;
		 public static final int ACTION_POINTER_3_UP = 518;

		 public static final int ACTION_MOVE = 2;

		 */
		if ((touchtype == 0) || (touchtype == 5) || (touchtype == 11) || (touchtype == 261) || (touchtype == 517)) {
			this.onMouseDown(newTouchEvent);
		} else if ((touchtype == 1) || (touchtype == 6)
				|| (touchtype == 12) || (touchtype == 262) || (touchtype == 518)) {
			this.onMouseUp(newTouchEvent);
		} else if (touchtype == 2) {
			this.onMouseMove(newTouchEvent);
		} else {
			console.log('recieved unknown touch event-type: ' + touchtype);
		}
	}

	public fireEventsForSceneFromString(touchMessage: String, _sceneIdx: number = 0): void {

		const newTouchEvent: any = {};
		newTouchEvent.clientX = null;// set the x position from the active touch
		newTouchEvent.clientY = null;// set the y position from the active touch
		newTouchEvent.preventDefault = function () { };
		const touchesFromMessage = touchMessage.split(',');
		// transfer touches to event
		let i = 0;
		let cnt = 0;
		const numTouches = parseInt(touchesFromMessage[cnt++]);
		const touchtype = parseInt(touchesFromMessage[cnt++]);
		const activeTouch = parseInt(touchesFromMessage[cnt++]);
		newTouchEvent.touches = [];
		newTouchEvent.changedTouches = [];
		if ((touchtype != 1) && (touchtype != 6)) {
			for (i = 0; i < numTouches; i++) {
				const newTouch: any = {};
				newTouch.identifier = touchesFromMessage[cnt++];
				newTouch.clientX = touchesFromMessage[cnt++];
				newTouch.clientY = touchesFromMessage[cnt++];
				newTouchEvent.touches[i] = newTouch;
				newTouchEvent.changedTouches[i] = newTouch;
			}
			newTouchEvent.changedTouches[i] = newTouchEvent.touches[activeTouch];
		} else {
			for (i = 0; i < numTouches; i++) {
				if (i != activeTouch) {
					const newTouch: any = {};
					newTouch.identifier = touchesFromMessage[cnt++];
					newTouch.clientX = touchesFromMessage[cnt++];
					newTouch.clientY = touchesFromMessage[cnt++];
					newTouchEvent.touches[i] = newTouch;
					newTouchEvent.changedTouches[i] = newTouch;
				} else {
					newTouchEvent.clientX = touchesFromMessage[cnt++];
					newTouchEvent.clientY = touchesFromMessage[cnt++];
					cnt++;
				}
			}

		}
		if (touchtype == 0) {//mousedown
			this.onMouseDown(newTouchEvent);
		} else if (touchtype == 1) {//mouseup
			this.onMouseUp(newTouchEvent);
		} else if (touchtype == 2) {//mousemove
			this.onMouseMove(newTouchEvent);

		} else if (touchtype == 261) {//mousedownPointer
			this.onMouseDown(newTouchEvent);

		} else if (touchtype == 6) {//mouseupPointer
			this.onMouseUp(newTouchEvent);
		}
	}

	// ---------------------------------------------------------------------
	// Private.
	// ---------------------------------------------------------------------
	private setUpEvent(event: PointerEvent, pointerData: PointerData,
		collision: PickingCollision, commonAncestor: ContainerNode = null): PointerEvent {
		event._iAllowedToImmediatlyPropagate = true;
		event._iAllowedToPropagate = true;
		// 2D properties.
		event.screenX = pointerData.screenX;
		event.screenY = pointerData.screenY;

		if (event instanceof AwayTouchEvent)
			event.touchPointID = pointerData.id;

		//console.log("event", event, collisionNode, collisionNode);

		// 3D properties.
		if (collision) {
			event.containerNode = collision.containerNode;

			event.rootNode = collision.rootNode;
			// Object.
			event.traversable = collision.traversable;
			// UV.
			event.uv = collision.uv;
			// Position.
			event.position = collision.position?.clone();
			// Normal.
			event.normal = collision.normal?.clone();
			// Face index.
			event.elementIndex = collision.elementIndex;
		} else {
			// Set all to null.
			event.containerNode = null;
			event.rootNode = null;
			event.traversable = null;
			event.uv = null;
			event.position = this._nullVector;
			event.normal = this._nullVector;
			event.elementIndex = 0;
		}
		event.commonAncestor = commonAncestor;

		return event;
	}

	private queueDispatch(pointerData: PointerData, event: PointerEvent, sourceEvent: MouseEvent | TouchEvent | WheelEvent): void {
		// Store event to be dispatched later.
		if (event instanceof AwayMouseEvent) {
			event.delta = (sourceEvent instanceof WheelEvent) ? -3 * sourceEvent.deltaY / 100 : 0;
			event.buttons = (sourceEvent instanceof MouseEvent) ? <MouseButtons> sourceEvent.buttons : MouseButtons.NO_BUTTON;
		}
		event.ctrlKey = sourceEvent.ctrlKey;
		event.altKey = sourceEvent.altKey;
		event.shiftKey = sourceEvent.shiftKey;

		pointerData.queuedEvents.push(event);

		pointerData.sourceEvent = sourceEvent;
	}

	// ---------------------------------------------------------------------
	// Listeners.
	// ---------------------------------------------------------------------

	public onKeyDown(event): void {
		!MouseManager.inputRecorder || MouseManager.inputRecorder.recordEvent(event);

		//console.log("Keydown", event);
		if (this.allowKeyInput) {
			switch (event.keyCode) {
				case 32: // spacebar
				case 37: // left
				case 39: // right
				case 38: // up
				case 40: // down
					event.preventDefault();
					break;
				default:
					break;
			}
			if (this._focusNode || this._stage) {
				//console.log("dispatch keydown on ", this._focusNode);
				const newEvent: KeyboardEvent = new KeyboardEvent(KeyboardEvent.KEYDOWN, event.key, event.code);
				newEvent.isShift = event.shiftKey;
				newEvent.isCTRL = event.ctrlKey;
				newEvent.isAlt = event.altKey;
				(<any>newEvent).keyCode = event.keyCode;
				if (this._focusNode)
					this._focusNode.container.dispatchEvent(newEvent);
				if (this._stage)
					this._stage.dispatchEvent(newEvent);
			}
		}

	}

	public onKeyUp(event): void {
		!MouseManager.inputRecorder || MouseManager.inputRecorder.recordEvent(event);

		//console.log("Keyup", event);
		if (this.allowKeyInput) {
			switch (event.keyCode) {
				case 32: // spacebar
				case 37: // left
				case 39: // right
				case 38: // up
				case 40: // down
					event.preventDefault();
					break;
				default:
					break;
			}

			if (this._focusNode || this._stage) {
				//console.log("dispatch keydown on ", this._focusNode);
				const newEvent: KeyboardEvent = new KeyboardEvent(KeyboardEvent.KEYUP, event.key, event.code);
				newEvent.isShift = event.shiftKey;
				newEvent.isCTRL = event.ctrlKey;
				newEvent.isAlt = event.altKey;
				(<any>newEvent).keyCode = event.keyCode;
				if (this._focusNode)
					this._focusNode.container.dispatchEvent(newEvent);
				if (this._stage)
					this._stage.dispatchEvent(newEvent);
			}
		}

	}

	public onMouseMove(event: MouseEvent | TouchEvent): void {
		!MouseManager.inputRecorder || MouseManager.inputRecorder.recordEvent(event);
		this.updateColliders(event);
	}

	public onMouseOut(event: MouseEvent): void {
		!MouseManager.inputRecorder || MouseManager.inputRecorder.recordEvent(event);
		this.updateColliders(event);
	}

	public onMouseOver(event: MouseEvent): void {
		!MouseManager.inputRecorder || MouseManager.inputRecorder.recordEvent(event);
		this.updateColliders(event);
	}

	public onDoubleClick(event: MouseEvent): void {
		!MouseManager.inputRecorder || MouseManager.inputRecorder.recordEvent(event);
		this.updateColliders(event);

		// prevent middle and second button
		if (event instanceof MouseEvent && event.buttons & 0b110) {
			event.preventDefault();
		}
	}

	public onMouseDown(event: MouseEvent | TouchEvent): void {

		!MouseManager.inputRecorder || MouseManager.inputRecorder.recordEvent(event);
		this.updateColliders(event);

		let prevent = (event.type !== 'mousedown');

		// prevent middle and second button
		if (event instanceof MouseEvent && event.buttons & 0b110) {
			prevent = true;
		}

		if (prevent) {
			event.preventDefault();
			this._stage.container.focus();
		}
	}

	public onMouseUp(event: MouseEvent | TouchEvent): void {

		!MouseManager.inputRecorder || MouseManager.inputRecorder.recordEvent(event);

		this.updateColliders(event);

		let prevent = event.type !== 'mouseup';
		// prevent middle and second button
		if (event instanceof MouseEvent && event.button === 1) {
			prevent = true;
		}

		if (prevent) {
			event.preventDefault();
			this._stage.container.focus();
		}
	}

	public onMouseWheel(event: WheelEvent): void {
		!MouseManager.inputRecorder || MouseManager.inputRecorder.recordEvent(event);
		this.updateColliders(event);
	}

	private updateColliders(event: MouseEvent | TouchEvent): void {
		this._stage.interactionHandler(event);

		this._updateDirty = true;

		const mouseData = this._pointerDataArray[0] || (this._pointerDataArray[0] = new PointerData(0, true));

		mouseData.isMouse = (event instanceof MouseEvent);
		const type = (mouseData.isMouse) ? event.type : MouseManager._touchToMouseDict[event.type];
		this.queueDispatch(mouseData, MouseManager._pointerDict[type], event);

		mouseData.screenX = this._stage.screenX;
		mouseData.screenY = this._stage.screenY;

		if ((<TouchEvent> event).changedTouches) {
			for (let i: number = 0; i < (<TouchEvent> event).changedTouches.length; i++) {
				const touch = (<TouchEvent> event).changedTouches[i];
				const touchData = this._pointerDataArray[touch.identifier] || (this._pointerDataArray[touch.identifier] = new PointerData(touch.identifier));
				const point = this._stage.mapWindowToStage(touch.clientX, touch.clientY);
				touchData.screenX = point.x;
				touchData.screenY = point.y;
				this.queueDispatch(touchData, MouseManager._pointerDict[event.type], event);
			}
		}
	}
}

class PointerData {

	public up: PointerEvent;
	public upOutside: PointerEvent;
	public click: PointerEvent;
	public out: PointerEvent;
	public down: PointerEvent;
	public move: PointerEvent;
	public over: PointerEvent;
	public wheel: PointerEvent;
	public doubleClick: PointerEvent;
	public rollOver: PointerEvent;
	public rollOut: PointerEvent;

	constructor(public id: number, public isMouse: boolean = false) {
		if (isMouse) {
			this.up = MouseManager._pointerDict.mouseup;
			this.upOutside = MouseManager._pointerDict.mouseupoutside;
			this.click = MouseManager._pointerDict.click;
			this.out = MouseManager._pointerDict.mouseout;
			this.down = MouseManager._pointerDict.mousedown;
			this.move = MouseManager._pointerDict.mousemove;
			this.over = MouseManager._pointerDict.mouseover;
			this.wheel = MouseManager._pointerDict.mousewheel;
			this.doubleClick = MouseManager._pointerDict.dblclick;
			this.rollOver = MouseManager._pointerDict.rollover;
			this.rollOut = MouseManager._pointerDict.rollout;
		} else {
			this.up = MouseManager._pointerDict.touchend;
			this.click = MouseManager._pointerDict.touchtap;
			this.out = MouseManager._pointerDict.touchout;
			this.down = MouseManager._pointerDict.touchstart;
			this.move = MouseManager._pointerDict.touchmove;
			this.over = MouseManager._pointerDict.touchover;
			this.rollOver = MouseManager._pointerDict.touchrollover;
			this.rollOut = MouseManager._pointerDict.touchrollout;
		}
	}

	sourceEvent: MouseEvent | TouchEvent;

	prevCollision: PickingCollision;

	collisionIsEnabledButton: boolean = false;

	queuedEvents: Array<PointerEvent> = new Array<PointerEvent>();

	screenX: number;
	screenY: number;
}