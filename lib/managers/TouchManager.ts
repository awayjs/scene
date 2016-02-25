import Vector3D						= require("awayjs-core/lib/geom/Vector3D");

import DisplayObject				= require("awayjs-display/lib/display/DisplayObject");
import View							= require("awayjs-display/lib/View");
import PickingCollisionVO			= require("awayjs-display/lib/pick/PickingCollisionVO");
import AwayTouchEvent				= require("awayjs-display/lib/events/TouchEvent");

class TouchManager
{
	private static _instance:TouchManager;

	private _updateDirty:boolean = true;
	private _nullVector:Vector3D = new Vector3D();
	private _numTouchPoints:number;
	private _touchPoint:TouchPoint;
	private _iCollidingObject:PickingCollisionVO;
	private _previousCollidingObject:PickingCollisionVO;
	public static _iCollidingObjectFromTouchId:Object;
	public static _previousCollidingObjectFromTouchId:Object;
	private _queuedEvents:Array<AwayTouchEvent> = new Array<AwayTouchEvent>();
	
	private _touchPoints:Array<TouchPoint>;
	private _touchPointFromId:Object;
	
	private _touchMoveEvent:TouchEvent;

	private _touchOut:AwayTouchEvent = new AwayTouchEvent(AwayTouchEvent.TOUCH_OUT);
	private _touchBegin:AwayTouchEvent = new AwayTouchEvent(AwayTouchEvent.TOUCH_BEGIN);
	private _touchMove:AwayTouchEvent = new AwayTouchEvent(AwayTouchEvent.TOUCH_MOVE);
	private _touchEnd:AwayTouchEvent = new AwayTouchEvent(AwayTouchEvent.TOUCH_END);
	private _touchOver:AwayTouchEvent = new AwayTouchEvent(AwayTouchEvent.TOUCH_OVER);

	private onTouchBeginDelegate:(event:TouchEvent) => void;
	private onTouchMoveDelegate:(event:TouchEvent) => void;
	private onTouchEndDelegate:(event:TouchEvent) => void;
	
	constructor()
	{
		this._touchPoints = new Array<TouchPoint>();
		this._touchPointFromId = new Object();
		TouchManager._iCollidingObjectFromTouchId = new Object();
		TouchManager._previousCollidingObjectFromTouchId = new Object();

		this.onTouchBeginDelegate = (event:TouchEvent) => this.onTouchBegin(event);
		this.onTouchMoveDelegate = (event:TouchEvent) => this.onTouchMove(event);
		this.onTouchEndDelegate = (event:TouchEvent) => this.onTouchEnd(event);
	}

	public static getInstance():TouchManager
	{
		if (this._instance)
			return this._instance;

		return (this._instance = new TouchManager());
	}

	// ---------------------------------------------------------------------
	// Interface.
	// ---------------------------------------------------------------------
	
	public updateCollider(forceTouchMove:boolean)
	{
		//if (forceTouchMove || this._updateDirty) { // If forceTouchMove is off, and no 2D Touch events dirty the update, don't update either.
		//	for (var i:number; i < this._numTouchPoints; ++i) {
		//		this._touchPoint = this._touchPoints[ i ];
		//		this._iCollidingObject = this._touchPicker.getViewCollision(this._touchPoint.x, this._touchPoint.y, this._view);
		//		TouchManager._iCollidingObjectFromTouchId[ this._touchPoint.id ] = this._iCollidingObject;
		//	}
		//}
	}
	
	public fireTouchEvents(forceTouchMove:boolean)
	{
		var i:number;
		for (i = 0; i < this._numTouchPoints; ++i) {
			this._touchPoint = this._touchPoints[i];
			// If colliding object has changed, queue over/out events.
			this._iCollidingObject = TouchManager._iCollidingObjectFromTouchId[ this._touchPoint.id ];
			this._previousCollidingObject = TouchManager._previousCollidingObjectFromTouchId[ this._touchPoint.id ];
			if (this._iCollidingObject != this._previousCollidingObject) {
				if (this._previousCollidingObject)
					this.queueDispatch(this._touchOut, this._touchMoveEvent, this._previousCollidingObject, this._touchPoint);
				if (this._iCollidingObject)
					this.queueDispatch(this._touchOver, this._touchMoveEvent, this._iCollidingObject, this._touchPoint);
			}
			// Fire Touch move events here if forceTouchMove is on.
			if (forceTouchMove && this._iCollidingObject)
				this.queueDispatch(this._touchMove, this._touchMoveEvent, this._iCollidingObject, this._touchPoint);
		}

		var event:AwayTouchEvent;
		var dispatcher:DisplayObject;

		// Dispatch all queued events.
		var len:number = this._queuedEvents.length;
		for (i = 0; i < len; ++i) {
			// Only dispatch from first implicitly enabled object ( one that is not a child of a TouchChildren = false hierarchy ).
			event = this._queuedEvents[i];
			dispatcher = event.object;
			
			while (dispatcher && !dispatcher._iIsMouseEnabled())
				dispatcher = dispatcher.parent;
			
			if (dispatcher)
				dispatcher.dispatchEvent(event);
		}
		this._queuedEvents.length = 0;

		this._updateDirty = false;
		
		for (i = 0; i < this._numTouchPoints; ++i) {
			this._touchPoint = this._touchPoints[ i ];
			TouchManager._previousCollidingObjectFromTouchId[ this._touchPoint.id ] = TouchManager._iCollidingObjectFromTouchId[ this._touchPoint.id ];
		}
	}
	
	public registerView(view:View)
	{
		view.htmlElement.addEventListener("touchstart", this.onTouchBeginDelegate);
		view.htmlElement.addEventListener("touchmove", this.onTouchMoveDelegate);
		view.htmlElement.addEventListener("touchend", this.onTouchEndDelegate);
	}
	
	public unregisterView(view:View)
	{
		view.htmlElement.removeEventListener("touchstart", this.onTouchBeginDelegate);
		view.htmlElement.removeEventListener("touchmove", this.onTouchMoveDelegate);
		view.htmlElement.removeEventListener("touchend", this.onTouchEndDelegate);
	}
	
	// ---------------------------------------------------------------------
	// Private.
	// ---------------------------------------------------------------------
	
	private queueDispatch(event:AwayTouchEvent, sourceEvent:TouchEvent, collider:PickingCollisionVO, touch:TouchPoint)
	{
		// 2D properties.
		event.ctrlKey = sourceEvent.ctrlKey;
		event.altKey = sourceEvent.altKey;
		event.shiftKey = sourceEvent.shiftKey;
		event.screenX = touch.x;
		event.screenY = touch.y;
		event.touchPointID = touch.id;
		
		// 3D properties.
		if (collider) {
			// Object.
			event.object = collider.displayObject;
			event.renderable = collider.renderable;
			// UV.
			event.uv = collider.uv;
			// Position.
			event.localPosition = collider.localPosition? collider.localPosition.clone() : null;
			// Normal.
			event.localNormal = collider.localNormal? collider.localNormal.clone() : null;
			// Face index.
			event.index = collider.index;
			// ElementsIndex.
			event.elementsIndex = collider.index;
			
		} else {
			// Set all to null.
			event.uv = null;
			event.object = null;
			event.localPosition = this._nullVector;
			event.localNormal = this._nullVector;
			event.index = 0;
			event.elementsIndex = 0;
		}
		
		// Store event to be dispatched later.
		this._queuedEvents.push(event);
	}
	
	// ---------------------------------------------------------------------
	// Event handlers.
	// ---------------------------------------------------------------------
	
	private onTouchBegin(event:TouchEvent)
	{
		
		var touch:TouchPoint = new TouchPoint();
		//touch.id = event.touchPointID;
		//touch.x = event.stageX;
		//touch.y = event.stageY;
		this._numTouchPoints++;
		this._touchPoints.push(touch);
		this._touchPointFromId[ touch.id ] = touch;

		//this.updateCollider(event); // ensures collision check is done with correct mouse coordinates on mobile

		this._iCollidingObject = TouchManager._iCollidingObjectFromTouchId[ touch.id ];
		if (this._iCollidingObject)
			this.queueDispatch(this._touchBegin, event, this._iCollidingObject, touch);

		this._updateDirty = true;
	}
	
	private onTouchMove(event:TouchEvent)
	{
		
		//var touch:TouchPoint = this._touchPointFromId[ event.touchPointID ];
		//
		//if (!touch) return;
		//
		////touch.x = event.stageX;
		////touch.y = event.stageY;
		//
		//this._iCollidingObject = TouchManager._iCollidingObjectFromTouchId[ touch.id ];
		//
		//if (this._iCollidingObject)
		//	this.queueDispatch(this._touchMove, this._touchMoveEvent = event, this._iCollidingObject, touch);
		//
		//this._updateDirty = true;
	}
	
	private onTouchEnd(event:TouchEvent)
	{
		
		//var touch:TouchPoint = this._touchPointFromId[ event.touchPointID ];
		//
		//if (!touch) return;
		//
		//this._iCollidingObject = TouchManager._iCollidingObjectFromTouchId[ touch.id ];
		//if (this._iCollidingObject)
		//	this.queueDispatch(this._touchEnd, event, this._iCollidingObject, touch);
		//
		//this._touchPointFromId[ touch.id ] = null;
		//this._numTouchPoints--;
		//this._touchPoints.splice(this._touchPoints.indexOf(touch), 1);
		//
		//this._updateDirty = true;
	}
}


export = TouchManager;

class TouchPoint
{
	public id:number;
	public x:number;
	public y:number;
}


/**
 * Classes for Touch Interfaces
 */
interface TouchEvent extends UIEvent {
	touches: TouchList;
	targetTouches: TouchList;
	changedTouches: TouchList;
	altKey: boolean;
	metaKey: boolean;
	ctrlKey: boolean;
	shiftKey: boolean;
	rotation: number;
	scale: number;

	// for iOS
	initTouchEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, viewArg: Window, detailArg: number, screenXArg: number, screenYArg: number, clientXArg: number, clientYArg: number, ctrlKeyArg: boolean, altKeyArg: boolean, shiftKeyArg: boolean, metaKeyArg: boolean, touchesArg: TouchList, targetTouchesArg: TouchList, changedTouchesArg: TouchList, scale: number, rotation: number): void

	// for Android
	initTouchEvent(touchesArg: TouchList, targetTouchesArg: TouchList, changedTouchesArg: TouchList, typeArg: string, Aview: Window, screenXArg: number, screenYArg: number, clientXArg: number, clientYArg: number, ctrlKeyArg: boolean, altKeyArg: boolean, shiftKeyArg: boolean, metaKeyArg: boolean);
}

declare var TouchEvent: {
	prototype: TouchEvent;
	new (): TouchEvent;
}

interface TouchList {
	length: number;
	[index: number]: Touch;
	item: (index: number) => Touch;
}

interface Touch {
	identifier: number;
	target: EventTarget;
	screenX: number;
	screenY: number;
	clientX: number;
	clientY: number;
	pageX: number;
	pageY: number;
}

interface Window {
	ontouchstart: (ev: TouchEvent) => any;
	ontouchmove: (ev: TouchEvent) => any;
	ontouchend: (ev: TouchEvent) => any;
	ontouchcancel: (ev: TouchEvent) => any;
	addEventListener(type: string, listener: (ev: TouchEvent) => any, useCapture?: boolean): void;
}

interface Document {
	ontouchstart: (ev: TouchEvent) => any;
	ontouchmove: (ev: TouchEvent) => any;
	ontouchend: (ev: TouchEvent) => any;
	ontouchcancel: (ev: TouchEvent) => any;
	addEventListener(type: string, listener: (ev: TouchEvent) => any, useCapture?: boolean): void;
}

interface HTMLElement {
	ontouchstart: (ev: TouchEvent) => any;
	ontouchmove: (ev: TouchEvent) => any;
	ontouchend: (ev: TouchEvent) => any;
	ontouchcancel: (ev: TouchEvent) => any;
	addEventListener(type: string, listener: (ev: TouchEvent) => any, useCapture?: boolean): void;
}

declare var ontouchstart: (ev: TouchEvent) => any;
declare var ontouchmove: (ev: TouchEvent) => any;
declare var ontouchend: (ev: TouchEvent) => any;
declare var ontouchcancel: (ev: TouchEvent) => any;

declare function addEventListener(type: string, listener: (ev: TouchEvent) => any, useCapture?: boolean): void;

