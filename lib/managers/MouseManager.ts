import { Vector3D } from '@awayjs/core';
import { Stage } from '@awayjs/stage';

import { PickingCollision, RaycastPicker, ContainerNode, IPartitionContainer, EntityNode } from '@awayjs/view';

import { KeyboardEvent } from '../events/KeyboardEvent';
import { MouseEvent as AwayMouseEvent } from '../events/MouseEvent';
import { FrameScriptManager } from './FrameScriptManager';

import { IInputRecorder } from './IInputRecorder';

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

	private _updateDirty: boolean;
	private _prevCollision: PickingCollision;

	private _mouseDragCollision: PickingCollision;     // entity hit on mouse-down
	private _mouseDragging: boolean;            // true while mosue is dragged
	private _focusContainer: IPartitionContainer;       // entity currently in focus

	public allowKeyInput: boolean=true;

	private _collisionIsEnabledButton: boolean=false;

	private _eventBubbling: boolean=true;           //  should events bubble up
	private _allowFocusOnUnfocusable: boolean=true;  // should unfocus-able object steal focus ?

	private _showCursor: boolean;
	private _cursorType: 'pointer' | 'auto'  = 'auto';

	private _nullVector: Vector3D = new Vector3D();
	private _queuedEvents: Array<AwayMouseEvent> = new Array<AwayMouseEvent>();

	private _mouseMoveEvent;
	private _mouseUp: AwayMouseEvent = new AwayMouseEvent(AwayMouseEvent.MOUSE_UP);
	private _mouseUpOutside: AwayMouseEvent = new AwayMouseEvent(AwayMouseEvent.MOUSE_UP_OUTSIDE);
	private _mouseClick: AwayMouseEvent = new AwayMouseEvent(AwayMouseEvent.CLICK);
	private _mouseOut: AwayMouseEvent = new AwayMouseEvent(AwayMouseEvent.MOUSE_OUT);
	private _dragOut: AwayMouseEvent = new AwayMouseEvent(AwayMouseEvent.DRAG_OUT);
	private _dragOver: AwayMouseEvent = new AwayMouseEvent(AwayMouseEvent.DRAG_OVER);
	private _mouseDown: AwayMouseEvent = new AwayMouseEvent(AwayMouseEvent.MOUSE_DOWN);
	private _mouseMove: AwayMouseEvent = new AwayMouseEvent(AwayMouseEvent.MOUSE_MOVE);
	private _mouseOver: AwayMouseEvent = new AwayMouseEvent(AwayMouseEvent.MOUSE_OVER);
	private _mouseWheel: AwayMouseEvent = new AwayMouseEvent(AwayMouseEvent.MOUSE_WHEEL);
	private _mouseDoubleClick: AwayMouseEvent = new AwayMouseEvent(AwayMouseEvent.DOUBLE_CLICK);
	private _rollOver: AwayMouseEvent = new AwayMouseEvent(AwayMouseEvent.ROLL_OVER);
	private _rollOut: AwayMouseEvent = new AwayMouseEvent(AwayMouseEvent.ROLL_OUT);

	private _dragMove: AwayMouseEvent = new AwayMouseEvent(AwayMouseEvent.DRAG_MOVE);
	private _dragStart: AwayMouseEvent = new AwayMouseEvent(AwayMouseEvent.DRAG_START);
	private _dragStop: AwayMouseEvent = new AwayMouseEvent(AwayMouseEvent.DRAG_STOP);

	private _useSoftkeyboard: boolean = false;

	public buttonEnabledDirty: boolean;
	private _isTouch: Boolean;
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
		this.onClick = this.onClick.bind(this);
		this.onDoubleClick = this.onDoubleClick.bind(this);
		this.onMouseDown = this.onMouseDown.bind(this);
		this.onMouseMove = this.onMouseMove.bind(this);
		this.onMouseUp = this.onMouseUp.bind(this);
		this.onMouseWheel = this.onMouseWheel.bind(this);
		this.onMouseOver = this.onMouseOver.bind(this);
		this.onMouseOut = this.onMouseOut.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.onKeyUp = this.onKeyUp.bind(this);

		this.buttonEnabledDirty = false;
		this._isTouch = (('ontouchstart' in self) || navigator.msMaxTouchPoints > 0);
		this._showCursor = true;
		this._mouseDragging = false;

		//register stage
		const container = this._stage.container;
		container.addEventListener('click', this.onClick);
		container.addEventListener('dblclick', this.onClick);
		container.addEventListener('touchstart', this.onMouseDown);
		container.addEventListener('mousedown', this.onMouseDown);

		window.addEventListener('touchmove', this.onMouseMove);
		window.addEventListener('mousemove', this.onMouseMove);
		window.addEventListener('mouseup', this.onMouseUp);

		container.addEventListener('touchend', this.onMouseUp);
		container.addEventListener('touchend', this.onClick);
		container.addEventListener('mousewheel', this.onMouseWheel);
		container.addEventListener('mouseover', this.onMouseOver);
		container.addEventListener('mouseout', this.onMouseOut);

		window.addEventListener('keydown', this.onKeyDown);
		window.addEventListener('keyup', this.onKeyUp);

		// supress context menu
		window.addEventListener('contextmenu', e => e.preventDefault());
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
		container.removeEventListener('click', this.onClick);
		container.removeEventListener('dblclick', this.onDoubleClick);
		container.removeEventListener('touchstart', this.onMouseDown);
		container.removeEventListener('mousedown', this.onMouseDown);
		window.removeEventListener('touchmove', this.onMouseMove);
		window.removeEventListener('mousemove', this.onMouseMove);
		window.removeEventListener('mouseup', this.onMouseUp);
		container.removeEventListener('touchend', this.onMouseUp);
		container.removeEventListener('touchend', this.onClick);
		container.removeEventListener('wheel', this.onMouseWheel);
		container.removeEventListener('mouseover', this.onMouseOver);
		container.removeEventListener('mouseout', this.onMouseOut);
		window.removeEventListener('keydown', this.onKeyDown);
		window.removeEventListener('keyup', this.onKeyUp);

		this._stage = null;

		this._mouseMoveEvent = null;
		this._mouseUp = null;
		this._mouseUpOutside = null;
		this._mouseClick = null;
		this._mouseOut = null;
		this._dragOut = null;
		this._dragOver = null;
		this._mouseDown = null;
		this._mouseMove = null;
		this._mouseOver = null;
		this._mouseWheel = null;
		this._mouseDoubleClick = null;
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

	public setFocus(obj: IPartitionContainer) {
		if (this._focusContainer == obj) {
			return;
		}
		if (this._focusContainer) {
			this._focusContainer.setFocus(false, false);
		}
		this._focusContainer = obj;

		if (this._focusContainer) {
			this._focusContainer.setFocus(true, false);
		}
	}

	public getFocus() {
		return this._focusContainer;
	}

	private dispatchEvent(event: AwayMouseEvent, dispatcher: ContainerNode) {
		if (!this._eventBubbling) {
			if (dispatcher) {
				dispatcher.container.dispatchEvent(event);
				FrameScriptManager.execute_queue();
			}
			return;
		}

		while (dispatcher) {
			if (event.commonAncestor && dispatcher == event.commonAncestor) {
				return;
			}
			if (!dispatcher.isMouseDisabled()) {
				dispatcher.container.dispatchEvent(event);
				FrameScriptManager.execute_queue();
			}
			if (!event._iAllowedToPropagate) {
				dispatcher = null;
			} else {
				dispatcher = dispatcher.parent;
			}
		}
	}

	private setupAndDispatchEvent(event: AwayMouseEvent, sourceEvent,
		collision: PickingCollision, commonAncestor: ContainerNode = null) {

		if (sourceEvent) {
			event.delta = sourceEvent.wheelDelta;
			event.ctrlKey = sourceEvent.ctrlKey;
			event.altKey = sourceEvent.altKey;
			event.shiftKey = sourceEvent.shiftKey;
		}

		event = this.setUpEvent(event, collision, commonAncestor);
		this.dispatchEvent(event, event.rootNode);
	}

	public fireMouseEvents(forcePicker: RaycastPicker = null): void {

		let collision: PickingCollision;
		if (forcePicker) {
			collision = forcePicker.getViewCollision(this._stage.screenX, this._stage.screenY);
		} else if (this._updateDirty) {
			for (let i = 0; i < this._pickerLookup.length; i++)
				if (!collision || this._pickerLookup[i].layeredView)
					collision = this._pickerLookup[i].getViewCollision(this._stage.screenX,
						this._stage.screenY, false, collision);
		}

		//if theres nothing to update, return
		if (!forcePicker && !this._updateDirty)
			return;

		let event: AwayMouseEvent;
		let dispatcher: ContainerNode;

		const len = this._queuedEvents.length;
		for (let i = 0; i < len; ++i) {
			event = this._queuedEvents[i];
			dispatcher = collision?.rootNode;

			this.setUpEvent(event, collision);

			if (event.type == AwayMouseEvent.MOUSE_DOWN) {
				this._mouseDragging = true;

				// no event-bubbling. dispatch on stage first
				if (!this._eventBubbling)
					this._stage.dispatchEvent(event);

				// @todo: at this point the object under the mouse might have been changed,
				// so we need to recheck the collision ?

				// on Touch dispatch mouseOver Command
				if (this._isTouch)
					this.setupAndDispatchEvent(this._mouseOver, this._mouseMoveEvent, collision);

				this._mouseDragCollision = collision;

				if (dispatcher) {
					//console.log("onPress", dispatcher)
					this.dispatchEvent(event, dispatcher);
				} else if (this._eventBubbling)
					this._stage.dispatchEvent(event);

				//  in FP6, a mouseclick on non focus-able object still steal the focus
				//  in newer FP they only steal the focus if the the new hit is focusable
				if (this._allowFocusOnUnfocusable || this._mouseDragCollision?.rootNode.container.tabEnabled) {
					if (this._focusContainer)
						this._focusContainer.setFocus(false, true);

					this._focusContainer = this._mouseDragCollision?.rootNode?.container;

					if (this._focusContainer)
						this._focusContainer.setFocus(true, true);
				}

				if (this._mouseDragCollision)
					this.setupAndDispatchEvent(this._dragStart, event, this._mouseDragCollision);

			} else if (event.type == AwayMouseEvent.MOUSE_UP) {

				// no event-bubbling. dispatch on stage first
				if (!this._eventBubbling)
					this._stage.dispatchEvent(event);

				// @todo: at this point the object under the mouse might have been changed,
				// so we need to recheck the collision ?

				let upEntityNode: EntityNode = null;
				let upRootNode: ContainerNode = null;
				if (this._isAVM1Dragging && this._mouseDragCollision) {
					// avm1dragging is in process, dispatch the mouse-up on this.
					// mouseDragEntity instead of the current collision
					upRootNode = this._mouseDragCollision.rootNode;
					upEntityNode = this._mouseDragCollision.entityNode;
				} else if (this._mouseDragging && this._mouseDragCollision
					&& this._mouseDragCollision.rootNode != dispatcher) {
					// no avm1dragging is in process, but current collision
					// is not the same as collision that appeared on mouse-down,
					// need to dispatch a MOUSE_UP_OUTSIDE on _mouseDragEntity
					if ((<any> this._mouseDragCollision.rootNode).buttonEnabled)
						this.setupAndDispatchEvent(this._mouseOut, event, this._mouseDragCollision);
					if (!this._eventBubbling) {
						this.setupAndDispatchEvent(this._mouseUpOutside, event, this._mouseDragCollision);
					}
				} else if (this._mouseDragging && this._mouseDragCollision
					&& this._mouseDragCollision.rootNode == dispatcher) {
					// no avm1dragging is in process,
					// but current collision is not the same as collision that appeared on mouse-down,
					// need to dispatch a MOUSE_UP_OUTSIDE on _mouseDragEntity
					upRootNode = this._mouseDragCollision.rootNode;
					upEntityNode = this._mouseDragCollision.entityNode;
				}

				if (this._mouseDragging && dispatcher)
					this.setupAndDispatchEvent(this._mouseOver, event, collision);

				if (this._isTouch && upEntityNode)
					this.setupAndDispatchEvent(this._mouseOut, this._mouseMoveEvent, this._mouseDragCollision);

				if (upRootNode) {
					//console.log("onRelease", upRootNode)
					this.dispatchEvent(event, upRootNode);
				} else if (this._eventBubbling && dispatcher)
					this.dispatchEvent(event, dispatcher);
				else if (this._eventBubbling)
					this._stage.dispatchEvent(event);

				if (upEntityNode)
					this.setupAndDispatchEvent(this._dragStop, event, this._mouseDragCollision);

				this._mouseDragCollision = null;
				this._mouseDragging = false;
				this._isAVM1Dragging = false;

			} else if (event.type == AwayMouseEvent.MOUSE_MOVE) {

				// no event-bubbling. dispatch on stage first
				if (!this._eventBubbling) {
					this._stage.dispatchEvent(event);
				}

				// fire to picker
				if (event.rootNode) {
					this.dispatchEvent(event, event.rootNode);
				}

				if (this._mouseDragCollision) {
					this.setupAndDispatchEvent(this._dragMove, event, this._mouseDragCollision);
				}

				// if bubling is exist, fire to stage late
				if (this._eventBubbling) {
					this._stage.dispatchEvent(event);
				}

			} else {
				// MouseEvent.MOUSE_OVER / MouseEvent.MOUSE_OUT / MouseEvent.DRAG_OVER / MouseEvent.DRAG_OUT
				this.dispatchEvent(event, dispatcher);
			}
		}

		this._queuedEvents.length = 0;

		this._rollOut.commonAncestor = null;
		this._rollOver.commonAncestor = null;

		const collisionNode: ContainerNode = collision?.rootNode;
		const prevCollisionNode: ContainerNode = this._prevCollision?.rootNode;

		if (collisionNode != prevCollisionNode) {

			//  If colliding object has changed, queue OVER and OUT events.
			//  If the mouse is dragged (mouse-down is hold), use DRAG_OVER and DRAG_OUT instead of MOUSE_OVER MOUSE_OUT
			//  DRAG_OVER and DRAG_OUT are only dispatched on the object that was hit on the mouse-down
			// (_mouseDragEntity)

			//  Store the info if the collision is a enabled Button (_collisionIsEnabledButton)

			if (prevCollisionNode) {
				if (!this._isTouch && !this._mouseDragging)
					this.setupAndDispatchEvent(this._mouseOut, this._mouseMoveEvent, this._prevCollision);
				else if (this._mouseDragging && this._mouseDragCollision
					&& this._mouseDragCollision.rootNode == prevCollisionNode)
					this.setupAndDispatchEvent(this._dragOut, this._mouseMoveEvent, this._prevCollision);
			}

			if (!prevCollisionNode && collisionNode) {
				// rollout / rollover easy case, can just bubble up
				this.setupAndDispatchEvent(this._rollOut, this._mouseMoveEvent, this._prevCollision);
				this.setupAndDispatchEvent(this._rollOver, this._mouseMoveEvent, collision);
			}
			if (prevCollisionNode && !collisionNode) {
				// rollout / rollover easy case, can just bubble up
				this.setupAndDispatchEvent(this._rollOut, this._mouseMoveEvent, this._prevCollision);
				this.setupAndDispatchEvent(this._rollOver, this._mouseMoveEvent, collision);
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
					this.setupAndDispatchEvent(this._rollOut, this._mouseMoveEvent,
						this._prevCollision, commonAncestor);

				if (commonAncestor != collisionNode)
					this.setupAndDispatchEvent(this._rollOver, this._mouseMoveEvent, collision, commonAncestor);

			}

			this._collisionIsEnabledButton = collisionNode ? (<any> collisionNode).buttonEnabled : false;

			if (collisionNode) {
				if (!this._isTouch && !this._mouseDragging)
					this.setupAndDispatchEvent(this._mouseOver, this._mouseMoveEvent, collision);
				else if (this._mouseDragging && this._mouseDragCollision &&
					this._mouseDragCollision.rootNode == collisionNode)
					this.setupAndDispatchEvent(this._dragOver, this._mouseMoveEvent, collision);
			}

			this._prevCollision = collision;
		} else {
			//  colliding object has not changed
			//  Check if we need to send any MOUSE_OVER/DRAG_OVER event to handle the case
			//  when a Button has become active while under the mouse.
			const isActiveButton = collisionNode ? (<any> collisionNode).buttonEnabled : false;

			if (this._collisionIsEnabledButton != isActiveButton && isActiveButton) {
				if (!this._isTouch)
					this.setupAndDispatchEvent(this._mouseOver, this._mouseMoveEvent, collision);
				else if (this._mouseDragCollision && this._mouseDragCollision.rootNode == collisionNode)
					this.setupAndDispatchEvent(this._dragOver, this._mouseMoveEvent, collision);
			}

			this._collisionIsEnabledButton = isActiveButton;
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
	private setUpEvent(event: AwayMouseEvent,
		collision: PickingCollision, commonAncestor: ContainerNode = null): AwayMouseEvent {
		event._iAllowedToImmediatlyPropagate = true;
		event._iAllowedToPropagate = true;
		// 2D properties.
		event.screenX = this._stage.screenX;
		event.screenY = this._stage.screenY;
		//console.log("event", event, collisionNode, collisionNode);

		// 3D properties.
		if (collision) {
			event.entityNode = collision.entityNode;

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
			event.entityNode = null;
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

	private queueDispatch(event: AwayMouseEvent, sourceEvent: MouseEvent | TouchEvent | WheelEvent): void {
		// Store event to be dispatched later.
		event.delta = (sourceEvent instanceof WheelEvent) ? sourceEvent.deltaY : 0;
		event.ctrlKey = sourceEvent.ctrlKey;
		event.altKey = sourceEvent.altKey;
		event.shiftKey = sourceEvent.shiftKey;
		event.button = (sourceEvent instanceof MouseEvent) ? <0> sourceEvent.button : 0;

		this._queuedEvents.push(event);
	}

	// ---------------------------------------------------------------------
	// Listeners.
	// ---------------------------------------------------------------------

	public onKeyDown(event): void {
		!MouseManager.inputRecorder || MouseManager.inputRecorder.recordEvent(event);

		//console.log("Keydown", event);
		if (this.allowKeyInput) {
			//event.preventDefault();
			if (this._focusContainer || this._stage) {
				//console.log("dispatch keydown on ", this._focusContainer);
				const newEvent: KeyboardEvent = new KeyboardEvent(KeyboardEvent.KEYDOWN, event.key, event.code);
				newEvent.isShift = event.shiftKey;
				newEvent.isCTRL = event.ctrlKey;
				newEvent.isAlt = event.altKey;
				(<any>newEvent).keyCode = event.keyCode;
				if (this._focusContainer)
					this._focusContainer.dispatchEvent(newEvent);
				if (this._stage)
					this._stage.dispatchEvent(newEvent);
			}
		}

	}

	public onKeyUp(event): void {
		!MouseManager.inputRecorder || MouseManager.inputRecorder.recordEvent(event);

		//console.log("Keyup", event);
		if (this.allowKeyInput) {
			//event.preventDefault();

			if (this._focusContainer || this._stage) {
				//console.log("dispatch keydown on ", this._focusContainer);
				const newEvent: KeyboardEvent = new KeyboardEvent(KeyboardEvent.KEYUP, event.key, event.code);
				newEvent.isShift = event.shiftKey;
				newEvent.isCTRL = event.ctrlKey;
				newEvent.isAlt = event.altKey;
				(<any>newEvent).keyCode = event.keyCode;
				if (this._focusContainer)
					this._focusContainer.dispatchEvent(newEvent);
				if (this._stage)
					this._stage.dispatchEvent(newEvent);
			}
		}

	}

	public onMouseMove(event: MouseEvent | TouchEvent): void {
		!MouseManager.inputRecorder || MouseManager.inputRecorder.recordEvent(event);
		this._isTouch = (event.type != 'mousemove');

		this.updateColliders(event);

		this.queueDispatch(this._mouseMove, this._mouseMoveEvent = event);
	}

	public onMouseOut(event: MouseEvent): void {
		!MouseManager.inputRecorder || MouseManager.inputRecorder.recordEvent(event);
		this.updateColliders(event);

		this.queueDispatch(this._mouseOut, event);
	}

	public onMouseOver(event: MouseEvent): void {
		!MouseManager.inputRecorder || MouseManager.inputRecorder.recordEvent(event);
		this.updateColliders(event);

		this.queueDispatch(this._mouseOver, event);
	}

	public onClick(event: MouseEvent): void {
		!MouseManager.inputRecorder || MouseManager.inputRecorder.recordEvent(event);
		this.updateColliders(event);
		this.queueDispatch(this._mouseClick, event);
	}

	public onDoubleClick(event: MouseEvent): void {
		!MouseManager.inputRecorder || MouseManager.inputRecorder.recordEvent(event);
		this.updateColliders(event);

		// prevent middle and second button
		if (event instanceof MouseEvent && event.buttons & 0b110) {
			event.preventDefault();
		}

		this.queueDispatch(this._mouseDoubleClick, event);
	}

	private _isDown: boolean = false;

	public onMouseDown(event: MouseEvent | TouchEvent): void {
		this._isTouch = (event.type !== 'mousedown');
		if (this._isDown) {
			return;
		}

		!MouseManager.inputRecorder || MouseManager.inputRecorder.recordEvent(event);
		this._isDown = true;

		this.updateColliders(event);

		let prevent = this._isTouch;

		// prevent middle and second button
		if (event instanceof MouseEvent && event.buttons & 0b110) {
			prevent = true;
		}

		if (prevent) {
			event.preventDefault();
			this._stage.container.focus();
		}

		this.queueDispatch(this._mouseDown, event);
	}

	public onMouseUp(event: MouseEvent | TouchEvent): void {
		if (!this._isDown) {
			return;
		}

		!MouseManager.inputRecorder || MouseManager.inputRecorder.recordEvent(event);
		this._isDown = false;

		this.updateColliders(event);

		let prevent = this._isTouch;
		// prevent middle and second button
		if (event instanceof MouseEvent && event.button === 1) {
			prevent = true;
		}

		if (prevent) {
			event.preventDefault();
			this._stage.container.focus();
		}

		this.queueDispatch(this._mouseUp, event);
	}

	public onMouseWheel(event: WheelEvent): void {
		!MouseManager.inputRecorder || MouseManager.inputRecorder.recordEvent(event);
		this.updateColliders(event);

		this.queueDispatch(this._mouseWheel, event);
	}

	private updateColliders(event: Event): void {
		this._stage.interactionHandler(event);

		this._updateDirty = true;
	}
}