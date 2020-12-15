import { Vector3D } from '@awayjs/core';
import { Stage } from '@awayjs/stage';

import { PickingCollision, PickEntity, RaycastPicker, IPartitionEntity, IPickingEntity } from '@awayjs/view';

import { KeyboardEvent } from '../events/KeyboardEvent';
import { MouseEvent } from '../events/MouseEvent';
import { FrameScriptManager } from '../managers/FrameScriptManager';

import { IInputRecorder } from './IInputRecorder';

const TMP_POINT = { x: 0, y: 0 };
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
	private _currentFocusEntity: IPickingEntity;       // entity currently in focus

	public allowKeyInput: boolean=true;

	private _collisionIsEnabledButton: boolean=false;

	private _eventBubbling: boolean=true;           //  should events bubble up
	private _allowFocusOnUnfocusable: boolean=true;  // should unfocus-able object steal focus ?

	private _showCursor: boolean;

	private _nullVector: Vector3D = new Vector3D();
	private _queuedEvents: Array<MouseEvent> = new Array<MouseEvent>();

	private _mouseMoveEvent;
	private _mouseUp: MouseEvent = new MouseEvent(MouseEvent.MOUSE_UP);
	private _mouseUpOutside: MouseEvent = new MouseEvent(MouseEvent.MOUSE_UP_OUTSIDE);
	private _mouseClick: MouseEvent = new MouseEvent(MouseEvent.CLICK);
	private _mouseOut: MouseEvent = new MouseEvent(MouseEvent.MOUSE_OUT);
	private _dragOut: MouseEvent = new MouseEvent(MouseEvent.DRAG_OUT);
	private _dragOver: MouseEvent = new MouseEvent(MouseEvent.DRAG_OVER);
	private _mouseDown: MouseEvent = new MouseEvent(MouseEvent.MOUSE_DOWN);
	private _mouseMove: MouseEvent = new MouseEvent(MouseEvent.MOUSE_MOVE);
	private _mouseOver: MouseEvent = new MouseEvent(MouseEvent.MOUSE_OVER);
	private _mouseWheel: MouseEvent = new MouseEvent(MouseEvent.MOUSE_WHEEL);
	private _mouseDoubleClick: MouseEvent = new MouseEvent(MouseEvent.DOUBLE_CLICK);
	private _rollOver: MouseEvent = new MouseEvent(MouseEvent.ROLL_OVER);
	private _rollOut: MouseEvent = new MouseEvent(MouseEvent.ROLL_OUT);

	private _dragMove: MouseEvent = new MouseEvent(MouseEvent.DRAG_MOVE);
	private _dragStart: MouseEvent = new MouseEvent(MouseEvent.DRAG_START);
	private _dragStop: MouseEvent = new MouseEvent(MouseEvent.DRAG_STOP);

	private onClickDelegate: (event) => void;
	private onDoubleClickDelegate: (event) => void;
	private onMouseDownDelegate: (event) => void;
	private onMouseMoveDelegate: (event) => void;
	private onMouseUpDelegate: (event) => void;
	private onMouseWheelDelegate: (event) => void;
	private onMouseOverDelegate: (event) => void;
	private onMouseOutDelegate: (event) => void;
	private onKeyDownDelegate: (event) => void;
	private onKeyUpDelegate: (event) => void;

	private _useSoftkeyboard: boolean = false;

	public buttonEnabledDirty: boolean;
	private _isTouch: Boolean;
	private _isAVM1Dragging: Boolean = false;

	public startDragObject(collision: PickingCollision) {
		this._isAVM1Dragging = true;
		if (!this._mouseDragCollision)
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
		this.onClickDelegate = (event) => this.onClick(event);
		this.onDoubleClickDelegate = (event) => this.onDoubleClick(event);
		this.onMouseDownDelegate = (event) => this.onMouseDown(event);
		this.onMouseMoveDelegate = (event) => this.onMouseMove(event);
		this.onMouseUpDelegate = (event) => this.onMouseUp(event);
		this.onMouseWheelDelegate = (event) => this.onMouseWheel(event);
		this.onMouseOverDelegate = (event) => this.onMouseOver(event);
		this.onMouseOutDelegate = (event) => this.onMouseOut(event);
		this.onKeyDownDelegate = (event) => this.onKeyDown(event);
		this.onKeyUpDelegate = (event) => this.onKeyUp(event);
		this.buttonEnabledDirty = false;
		this._isTouch = (('ontouchstart' in window) || navigator.msMaxTouchPoints > 0);
		this._showCursor = true;
		this._mouseDragging = false;

		//register stage
		const container = this._stage.container;
		container.addEventListener('click', this.onClickDelegate);
		container.addEventListener('dblclick', this.onDoubleClickDelegate);
		container.addEventListener('touchstart', this.onMouseDownDelegate);
		container.addEventListener('mousedown', this.onMouseDownDelegate);
		window.addEventListener('touchmove', this.onMouseMoveDelegate);
		window.addEventListener('mousemove', this.onMouseMoveDelegate);
		window.addEventListener('mouseup', this.onMouseUpDelegate);
		container.addEventListener('touchend', this.onMouseUpDelegate);
		container.addEventListener('touchend', this.onClickDelegate);
		container.addEventListener('mousewheel', this.onMouseWheelDelegate);
		container.addEventListener('mouseover', this.onMouseOverDelegate);
		container.addEventListener('mouseout', this.onMouseOutDelegate);
		window.addEventListener('keydown', this.onKeyDownDelegate);
		window.addEventListener('keyup', this.onKeyUpDelegate);
	}

	public set useSoftkeyboard(value: boolean) {

		this._useSoftkeyboard = value;
		// todo: improve this, so that we can
		//	- use device-softkeyboard on tablet / mobide
		//	- optionally use a custom softkeyboard
		if (!value) {
			window.addEventListener('keydown', this.onKeyDownDelegate);
			window.addEventListener('keyup', this.onKeyUpDelegate);
		} else if (value) {
			window.removeEventListener('keydown', this.onKeyDownDelegate);
			window.removeEventListener('keyup', this.onKeyUpDelegate);
		}
	}

	public get useSoftkeyboard(): boolean {
		return this._useSoftkeyboard;
	}

	public dispose() {
		//unregister stage
		const container = this._stage.container;
		container.removeEventListener('click', this.onClickDelegate);
		container.removeEventListener('dblclick', this.onDoubleClickDelegate);
		container.removeEventListener('touchstart', this.onMouseDownDelegate);
		container.removeEventListener('mousedown', this.onMouseDownDelegate);
		window.removeEventListener('touchmove', this.onMouseMoveDelegate);
		window.removeEventListener('mousemove', this.onMouseMoveDelegate);
		window.removeEventListener('mouseup', this.onMouseUpDelegate);
		container.removeEventListener('touchend', this.onMouseUpDelegate);
		container.removeEventListener('touchend', this.onClickDelegate);
		container.removeEventListener('mousewheel', this.onMouseWheelDelegate);
		container.removeEventListener('mouseover', this.onMouseOverDelegate);
		container.removeEventListener('mouseout', this.onMouseOutDelegate);
		window.removeEventListener('keydown', this.onKeyDownDelegate);
		window.removeEventListener('keyup', this.onKeyUpDelegate);

		this._stage = null;
		this.onClickDelegate = null;
		this.onDoubleClickDelegate = null;
		this.onMouseDownDelegate = null;
		this.onMouseMoveDelegate = null;
		this.onMouseUpDelegate = null;
		this.onMouseWheelDelegate = null;
		this.onMouseOverDelegate = null;
		this.onMouseOutDelegate = null;
		this.onKeyDownDelegate = null;
		this.onKeyUpDelegate = null;

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

	public setFocus(obj: IPickingEntity) {
		if (this._currentFocusEntity == obj) {
			return;
		}
		if (this._currentFocusEntity) {
			this._currentFocusEntity.setFocus(false, false);
		}
		this._currentFocusEntity = obj;

		if (this._currentFocusEntity) {
			this._currentFocusEntity.setFocus(true, false);
		}
	}

	public getFocus() {
		return this._currentFocusEntity;
	}

	private dispatchEvent(event: MouseEvent, dispatcher: IPartitionEntity) {
		if (!this._eventBubbling) {
			if (dispatcher) {
				dispatcher.dispatchEvent(event);
				FrameScriptManager.execute_queue();
			}
			return;
		}

		while (dispatcher) {
			if (event.commonAncestor && dispatcher == event.commonAncestor) {
				return;
			}
			if (dispatcher._iIsMouseEnabled()) {
				dispatcher.dispatchEvent(event);
				FrameScriptManager.execute_queue();
			}
			if (!event._iAllowedToPropagate) {
				dispatcher = null;
			} else {
				dispatcher = dispatcher.parent;
			}
		}
	}

	private setupAndDispatchEvent(event: MouseEvent, sourceEvent, collision: PickingCollision, commonAncestor: IPickingEntity = null) {

		if (sourceEvent) {
			event.delta = sourceEvent.wheelDelta;
			event.ctrlKey = sourceEvent.ctrlKey;
			event.altKey = sourceEvent.altKey;
			event.shiftKey = sourceEvent.shiftKey;
		}

		event = this.setUpEvent(event, collision, commonAncestor);
		this.dispatchEvent(event, event.pickerEntity);
	}

	public fireMouseEvents(forcePicker: RaycastPicker = null): void {

		let collision: PickingCollision;
		if (forcePicker) {
			collision = forcePicker.getViewCollision(this._stage.screenX, this._stage.screenY);
		} else if (this._updateDirty) {
			for (let i = 0; i < this._pickerLookup.length; i++)
				if (!collision || this._pickerLookup[i].layeredView)
					collision = this._pickerLookup[i].getViewCollision(this._stage.screenX, this._stage.screenY, false, collision);
		}

		//if theres nothing to update, return
		if (!forcePicker && !this._updateDirty)
			return;

		let event: MouseEvent;
		let dispatcher: IPickingEntity;
		const len: number = this._queuedEvents.length;
		// Dispatch all queued events.
		/*var logEvents="";
        for (var i: number = 0; i < len; ++i) {
            logEvents+= " / "+this._queuedEvents[i].type;
        }
        console.log(logEvents);*/
		for (let i: number = 0; i < len; ++i) {
			event = this._queuedEvents[i];
			dispatcher = collision?.pickerEntity;

			this.setUpEvent(event, collision);

			if (event.type == MouseEvent.MOUSE_DOWN) {
				this._mouseDragging = true;

				// no event-bubbling. dispatch on stage first
				if (!this._eventBubbling)
					this._stage.dispatchEvent(event);

				// todo: at this point the object under the mouse might have been changed, so we need to recheck the collision

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
				if (this._allowFocusOnUnfocusable || (this._mouseDragCollision && this._mouseDragCollision.pickerEntity.tabEnabled)) {
					if (this._currentFocusEntity)
						this._currentFocusEntity.setFocus(false, true);

					this._currentFocusEntity = this._mouseDragCollision?.pickerEntity;

					if (this._currentFocusEntity)
						this._currentFocusEntity.setFocus(true, true);
				}

				if (this._mouseDragCollision)
					this.setupAndDispatchEvent(this._dragStart, event, this._mouseDragCollision);

			} else if (event.type == MouseEvent.MOUSE_UP) {

				// no event-bubbling. dispatch on stage first
				if (!this._eventBubbling)
					this._stage.dispatchEvent(event);

				// todo: at this point the object under the mouse might have been changed, so we need to recheck the collision

				let upEntity: IPartitionEntity = null;
				let upPickerEntity: IPickingEntity = null;
				if (this._isAVM1Dragging && this._mouseDragCollision) {
					// avm1dragging is in process, dispatch the mouse-up on this._mouseDragEntity instead of the current collision
					upPickerEntity = this._mouseDragCollision.pickerEntity;
					upEntity = this._mouseDragCollision.entity;
				} else if (this._mouseDragging && this._mouseDragCollision && this._mouseDragCollision.pickerEntity != dispatcher) {
					// no avm1dragging is in process, but current collision is not the same as collision that appeared on mouse-down,
					// need to dispatch a MOUSE_UP_OUTSIDE on _mouseDragEntity
					if ((<any> this._mouseDragCollision.pickerEntity).buttonEnabled)
						this.setupAndDispatchEvent(this._mouseOut, event, this._mouseDragCollision);
					if (!this._eventBubbling) {
						this.setupAndDispatchEvent(this._mouseUpOutside, event, this._mouseDragCollision);
					}
				} else if (this._mouseDragging && this._mouseDragCollision && this._mouseDragCollision.pickerEntity == dispatcher) {
					// no avm1dragging is in process, but current collision is not the same as collision that appeared on mouse-down,
					// need to dispatch a MOUSE_UP_OUTSIDE on _mouseDragEntity
					upPickerEntity = this._mouseDragCollision.pickerEntity;
					upEntity = this._mouseDragCollision.entity;
				}

				if (this._mouseDragging && dispatcher)
					this.setupAndDispatchEvent(this._mouseOver, event, collision);

				if (this._isTouch && upEntity)
					this.setupAndDispatchEvent(this._mouseOut, this._mouseMoveEvent, this._mouseDragCollision);

				if (upPickerEntity) {
					//console.log("onRelease", upPickerEntity)
					this.dispatchEvent(event, upPickerEntity);
				} else if (this._eventBubbling && dispatcher)
					this.dispatchEvent(event, dispatcher);
				else if (this._eventBubbling)
					this._stage.dispatchEvent(event);

				if (upEntity)
					this.setupAndDispatchEvent(this._dragStop, event, this._mouseDragCollision);

				this._mouseDragCollision = null;
				this._mouseDragging = false;
				this._isAVM1Dragging = false;

			} else if (event.type == MouseEvent.MOUSE_MOVE) {
				// no event-bubbling. dispatch on stage first
				if (!this._eventBubbling) {
					this._stage.dispatchEvent(event);
				} else {
					if (event.pickerEntity)
                    	this.dispatchEvent(event, event.pickerEntity);
					else
						this._stage.dispatchEvent(event);

				}

				if (this._mouseDragCollision)
					this.setupAndDispatchEvent(this._dragMove, event, this._mouseDragCollision);
			} else {
				// MouseEvent.MOUSE_OVER / MouseEvent.MOUSE_OUT / MouseEvent.DRAG_OVER / MouseEvent.DRAG_OUT
				this.dispatchEvent(event, dispatcher);
			}
		}

		this._queuedEvents.length = 0;

		this._rollOut.commonAncestor = null;
		this._rollOver.commonAncestor = null;

		const collisionEntity: IPickingEntity = collision?.pickerEntity;
		const prevCollisionEntity: IPickingEntity = this._prevCollision?.pickerEntity;

		if (collisionEntity != prevCollisionEntity) {

			//  If colliding object has changed, queue OVER and OUT events.
			//  If the mouse is dragged (mouse-down is hold), use DRAG_OVER and DRAG_OUT instead of MOUSE_OVER MOUSE_OUT
			//  DRAG_OVER and DRAG_OUT are only dispatched on the object that was hit on the mouse-down (_mouseDragEntity)

			//  Store the info if the collision is a enabled Button (_collisionIsEnabledButton)

			if (prevCollisionEntity) {
				if (!this._isTouch && !this._mouseDragging)
					this.setupAndDispatchEvent(this._mouseOut, this._mouseMoveEvent, this._prevCollision);
				else if (this._mouseDragging && this._mouseDragCollision && this._mouseDragCollision.pickerEntity == prevCollisionEntity)
					this.setupAndDispatchEvent(this._dragOut, this._mouseMoveEvent, this._prevCollision);
			}

			if (!prevCollisionEntity && collisionEntity) {
				// rollout / rollover easy case, can just bubble up
				this.setupAndDispatchEvent(this._rollOut, this._mouseMoveEvent, this._prevCollision);
				this.setupAndDispatchEvent(this._rollOver, this._mouseMoveEvent, collision);
			}
			if (prevCollisionEntity && !collisionEntity) {
				// rollout / rollover easy case, can just bubble up
				this.setupAndDispatchEvent(this._rollOut, this._mouseMoveEvent, this._prevCollision);
				this.setupAndDispatchEvent(this._rollOver, this._mouseMoveEvent, collision);
			}
			if (prevCollisionEntity && collisionEntity) {
				// rollout / rollover find common ancester and only bubble up to that point
				const parentsPrev: IPickingEntity[] = [];
				let parent: IPickingEntity = prevCollisionEntity;
				while (parent && !parent.isAVMScene) {
					parentsPrev.push(parent);
					parent = <IPickingEntity> parent.parent;
				}
				let commonAncestor: IPickingEntity = null;
				parent = collisionEntity;
				while (parent && !parent.isAVMScene) {
					const oldParentIdx = parentsPrev.indexOf(parent);
					if (oldParentIdx == -1) {
						parent = <IPickingEntity> parent.parent;
					} else {
						commonAncestor = parent;
						parent = null;
					}
				}
				if (commonAncestor != prevCollisionEntity)
					this.setupAndDispatchEvent(this._rollOut, this._mouseMoveEvent, this._prevCollision, commonAncestor);

				if (commonAncestor != collisionEntity)
					this.setupAndDispatchEvent(this._rollOver, this._mouseMoveEvent, collision, commonAncestor);

			}

			this._collisionIsEnabledButton = collisionEntity ? (<any> collisionEntity).buttonEnabled : false;

			if (collisionEntity) {
				if (!this._isTouch && !this._mouseDragging)
					this.setupAndDispatchEvent(this._mouseOver, this._mouseMoveEvent, collision);
				else if (this._mouseDragging && this._mouseDragCollision && this._mouseDragCollision.pickerEntity == collisionEntity)
					this.setupAndDispatchEvent(this._dragOver, this._mouseMoveEvent, collision);
			}

			this._prevCollision = collision;
		} else {
			//  colliding object has not changed
			//  Check if we need to send any MOUSE_OVER/DRAG_OVER event to handle the case when a Button has become active while under the mouse.
			const isActiveButton = collisionEntity ? (<any> collisionEntity).buttonEnabled : false;

			if (this._collisionIsEnabledButton != isActiveButton && isActiveButton) {
				if (!this._isTouch)
					this.setupAndDispatchEvent(this._mouseOver, this._mouseMoveEvent, collision);
				else if (this._mouseDragCollision && this._mouseDragCollision.pickerEntity == collisionEntity)
					this.setupAndDispatchEvent(this._dragOver, this._mouseMoveEvent, collision);
			}

			this._collisionIsEnabledButton = isActiveButton;
		}

		// set cursor if not dragging mouse
		if (!this._mouseDragging)
			document.body.style.cursor = this._showCursor ? (collisionEntity ? collisionEntity.getMouseCursor() : 'initial') : 'none';

		this._updateDirty = false;
	}

	//		public addSceneLayer(scene:Scene)
	//		{
	//			var stg:Stage = scene.stage;
	//
	//			// Add instance to mouse3dmanager to fire mouse events for multiple scenes
	//			if (!scene.stageGL.mouse3DManager)
	//				scene.stageGL.mouse3DManager = this;
	//
	//			if (!hasKey(scene))
	//				_scene3Ds[scene] = 0;
	//
	//			_childDepth = 0;
	//			traverseDisplayObjects(stg);
	//			_sceneCount = _childDepth;
	//		}

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
		let x: number = 0;
		let y: number = 0;
		if ((touchtype != 1) && (touchtype != 6) && (touchtype != 12) && (touchtype != 262) && (touchtype != 518)) {
			// if this is not a UP command, we add all touches
			for (i = 0; i < numTouches; i++) {
				var newTouch: any = {};
				newTouch.identifier = messageScene[cnt++];
				newTouch.clientX = messageScene[cnt++];
				newTouch.clientY = messageScene[cnt++];
				newTouchEvent.touches[i] = newTouch;
				//newTouchEvent.changedTouches[i] = newTouch;
			}
			newTouchEvent.changedTouches[0] = newTouchEvent.touches[activeTouchID];
			x = newTouchEvent.changedTouches[0].clientX;
			y = newTouchEvent.changedTouches[0].clientY;
		} else {
			// if this is a UP command, we add all touches, except the active one
			if (numTouches == 1) {

				var newTouch: any = {};
				newTouch.identifier = messageScene[cnt++];
				newTouch.clientX = messageScene[cnt++];
				newTouch.clientY = messageScene[cnt++];
				newTouchEvent.clientX = newTouch.clientX;
				newTouchEvent.clientY = newTouch.clientY;
				x = newTouchEvent.clientX;
				y = newTouchEvent.clientY;
			} else {
				for (i = 0; i < numTouches; i++) {
					var newTouch: any = {};
					newTouch.identifier = messageScene[cnt++];
					newTouch.clientX = messageScene[cnt++];
					newTouch.clientY = messageScene[cnt++];
					if (i != activeTouchID) {
						newTouchEvent.touches[touchCnt] = newTouch;
						//newTouchEvent.changedTouches[touchCnt++] = newTouch;
					} else {
						newTouchEvent.clientX = newTouch.clientX;
						newTouchEvent.clientY = newTouch.clientY;
						x = newTouchEvent.clientX;
						y = newTouchEvent.clientY;
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
		} else if ((touchtype == 1) || (touchtype == 6) || (touchtype == 12) || (touchtype == 262) || (touchtype == 518)) {
			this.onMouseUp(newTouchEvent);
		} else if (touchtype == 2) {
			this.onMouseMove(newTouchEvent);
		} else {
			console.log('recieved unknown touch event-type: ' + touchtype);
		}
	}

	public fireEventsForSceneFromString(touchMessage: String, sceneIdx: number = 0): void {

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
				var newTouch: any = {};
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
					var newTouch: any = {};
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
	private setUpEvent(event: MouseEvent, collision: PickingCollision, commonAncestor: IPickingEntity = null): MouseEvent {
		event._iAllowedToImmediatlyPropagate = true;
		event._iAllowedToPropagate = true;
		// 2D properties.
		event.screenX = this._stage.screenX;
		event.screenY = this._stage.screenY;
		//console.log("event", event, collisionEntity, collisionEntity);

		// 3D properties.
		if (collision) {
			event.entity = collision.entity;

			event.pickerEntity = collision.pickerEntity;
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
			event.entity = null;
			event.pickerEntity = null;
			event.traversable = null;
			event.uv = null;
			event.position = this._nullVector;
			event.normal = this._nullVector;
			event.elementIndex = 0;
		}
		event.commonAncestor = commonAncestor;

		return event;
	}

	private queueDispatch(event: MouseEvent, sourceEvent): void {
		// Store event to be dispatched later.
		event.delta = sourceEvent.wheelDelta;
		event.ctrlKey = sourceEvent.ctrlKey;
		event.altKey = sourceEvent.altKey;
		event.shiftKey = sourceEvent.shiftKey;

		this._queuedEvents.push(event);
	}

	// ---------------------------------------------------------------------
	// Listeners.
	// ---------------------------------------------------------------------

	public onKeyDown(event): void {
		!MouseManager.inputRecorder || MouseManager.inputRecorder.recordEvent(event);

		//console.log("Keydown", event);
		if (this.allowKeyInput) {
			event.preventDefault();
			if (this._currentFocusEntity || this._stage) {
				//console.log("dispatch keydown on ", this._currentFocusEntity);
				const newEvent: KeyboardEvent = new KeyboardEvent(KeyboardEvent.KEYDOWN, event.key, event.code);
				newEvent.isShift = event.shiftKey;
				newEvent.isCTRL = event.ctrlKey;
				newEvent.isAlt = event.altKey;
				(<any>newEvent).keyCode = event.keyCode;
				if (this._currentFocusEntity)
					this._currentFocusEntity.dispatchEvent(newEvent);
				if (this._stage)
					this._stage.dispatchEvent(newEvent);
			}
		}

	}

	public onKeyUp(event): void {
		!MouseManager.inputRecorder || MouseManager.inputRecorder.recordEvent(event);

		//console.log("Keyup", event);
		if (this.allowKeyInput) {
			event.preventDefault();

			if (this._currentFocusEntity || this._stage) {
				//console.log("dispatch keydown on ", this._currentFocusEntity);
				const newEvent: KeyboardEvent = new KeyboardEvent(KeyboardEvent.KEYUP, event.key, event.code);
				newEvent.isShift = event.shiftKey;
				newEvent.isCTRL = event.ctrlKey;
				newEvent.isAlt = event.altKey;
				(<any>newEvent).keyCode = event.keyCode;
				if (this._currentFocusEntity)
					this._currentFocusEntity.dispatchEvent(newEvent);
				if (this._stage)
					this._stage.dispatchEvent(newEvent);
			}
		}

	}

	public onMouseMove(event): void {
		!MouseManager.inputRecorder || MouseManager.inputRecorder.recordEvent(event);
		this._isTouch = (event.type != 'mousemove');

		this.updateColliders(event);

		this.queueDispatch(this._mouseMove, this._mouseMoveEvent = event);
	}

	public onMouseOut(event): void {
		!MouseManager.inputRecorder || MouseManager.inputRecorder.recordEvent(event);
		this.updateColliders(event);

		this.queueDispatch(this._mouseOut, event);
	}

	public onMouseOver(event): void {
		!MouseManager.inputRecorder || MouseManager.inputRecorder.recordEvent(event);
		this.updateColliders(event);

		this.queueDispatch(this._mouseOver, event);
	}

	public onClick(event): void {
		!MouseManager.inputRecorder || MouseManager.inputRecorder.recordEvent(event);
		this.updateColliders(event);

		this.queueDispatch(this._mouseClick, event);
	}

	public onDoubleClick(event): void {
		!MouseManager.inputRecorder || MouseManager.inputRecorder.recordEvent(event);
		this.updateColliders(event);

		this.queueDispatch(this._mouseDoubleClick, event);
	}

	private _isDown: boolean = false;

	public onMouseDown(event): void {
		this._isTouch = (event.type != 'mousedown');
		if (this._isDown) {
			return;
		}
		!MouseManager.inputRecorder || MouseManager.inputRecorder.recordEvent(event);
		this._isDown = true;

		this.updateColliders(event);

		//console.log("collisionEntity", collisionEntity);
		if (this._isTouch) {
			event.preventDefault();
			this._stage.container.focus();
		}
		this.queueDispatch(this._mouseDown, event);
	}

	public onMouseUp(event): void {
		if (!this._isDown) {
			return;
		}
		!MouseManager.inputRecorder || MouseManager.inputRecorder.recordEvent(event);
		this._isDown = false;

		this.updateColliders(event);

		if (this._isTouch) {
			event.preventDefault();
			this._stage.container.focus();
		}
		this.queueDispatch(this._mouseUp, event);
	}

	public onMouseWheel(event): void {
		!MouseManager.inputRecorder || MouseManager.inputRecorder.recordEvent(event);
		this.updateColliders(event);

		this.queueDispatch(this._mouseWheel, event);
	}

	private updateColliders(event): void {
		this._stage.interactionHandler(event);

		this._updateDirty = true;
	}
}