"use strict";
var Vector3D_1 = require("@awayjs/core/lib/geom/Vector3D");
var TouchEvent_1 = require("../events/TouchEvent");
var TouchManager = (function () {
    function TouchManager() {
        var _this = this;
        this._updateDirty = true;
        this._nullVector = new Vector3D_1.Vector3D();
        this._queuedEvents = new Array();
        this._touchOut = new TouchEvent_1.TouchEvent(TouchEvent_1.TouchEvent.TOUCH_OUT);
        this._touchBegin = new TouchEvent_1.TouchEvent(TouchEvent_1.TouchEvent.TOUCH_BEGIN);
        this._touchMove = new TouchEvent_1.TouchEvent(TouchEvent_1.TouchEvent.TOUCH_MOVE);
        this._touchEnd = new TouchEvent_1.TouchEvent(TouchEvent_1.TouchEvent.TOUCH_END);
        this._touchOver = new TouchEvent_1.TouchEvent(TouchEvent_1.TouchEvent.TOUCH_OVER);
        this._touchPoints = new Array();
        this._touchPointFromId = new Object();
        TouchManager._iCollisionFromTouchId = new Object();
        TouchManager._previousCollidingObjectFromTouchId = new Object();
        this.onTouchBeginDelegate = function (event) { return _this.onTouchBegin(event); };
        this.onTouchMoveDelegate = function (event) { return _this.onTouchMove(event); };
        this.onTouchEndDelegate = function (event) { return _this.onTouchEnd(event); };
    }
    TouchManager.getInstance = function () {
        if (this._instance)
            return this._instance;
        return (this._instance = new TouchManager());
    };
    // ---------------------------------------------------------------------
    // Interface.
    // ---------------------------------------------------------------------
    TouchManager.prototype.updateCollider = function (forceTouchMove) {
        //if (forceTouchMove || this._updateDirty) { // If forceTouchMove is off, and no 2D Touch events dirty the update, don't update either.
        //	for (var i:number; i < this._numTouchPoints; ++i) {
        //		this._touchPoint = this._touchPoints[ i ];
        //		this._iCollision = this._touchPicker.getViewCollision(this._touchPoint.x, this._touchPoint.y, this._view);
        //		TouchManager._iCollisionFromTouchId[ this._touchPoint.id ] = this._iCollision;
        //	}
        //}
    };
    TouchManager.prototype.fireTouchEvents = function (forceTouchMove) {
        var i;
        for (i = 0; i < this._numTouchPoints; ++i) {
            this._touchPoint = this._touchPoints[i];
            // If colliding object has changed, queue over/out events.
            this._iCollision = TouchManager._iCollisionFromTouchId[this._touchPoint.id];
            this._previousCollidingObject = TouchManager._previousCollidingObjectFromTouchId[this._touchPoint.id];
            if (this._iCollision != this._previousCollidingObject) {
                if (this._previousCollidingObject)
                    this.queueDispatch(this._touchOut, this._touchMoveEvent, this._previousCollidingObject, this._touchPoint);
                if (this._iCollision)
                    this.queueDispatch(this._touchOver, this._touchMoveEvent, this._iCollision, this._touchPoint);
            }
            // Fire Touch move events here if forceTouchMove is on.
            if (forceTouchMove && this._iCollision)
                this.queueDispatch(this._touchMove, this._touchMoveEvent, this._iCollision, this._touchPoint);
        }
        var event;
        var dispatcher;
        // Dispatch all queued events.
        var len = this._queuedEvents.length;
        for (i = 0; i < len; ++i) {
            // Only dispatch from first implicitly enabled object ( one that is not a child of a TouchChildren = false hierarchy ).
            event = this._queuedEvents[i];
            dispatcher = event.entity;
            while (dispatcher && !dispatcher._iIsMouseEnabled())
                dispatcher = dispatcher.parent;
            if (dispatcher)
                dispatcher.dispatchEvent(event);
        }
        this._queuedEvents.length = 0;
        this._updateDirty = false;
        for (i = 0; i < this._numTouchPoints; ++i) {
            this._touchPoint = this._touchPoints[i];
            TouchManager._previousCollidingObjectFromTouchId[this._touchPoint.id] = TouchManager._iCollisionFromTouchId[this._touchPoint.id];
        }
    };
    TouchManager.prototype.registerView = function (view) {
        view.htmlElement.addEventListener("touchstart", this.onTouchBeginDelegate);
        view.htmlElement.addEventListener("touchmove", this.onTouchMoveDelegate);
        view.htmlElement.addEventListener("touchend", this.onTouchEndDelegate);
    };
    TouchManager.prototype.unregisterView = function (view) {
        view.htmlElement.removeEventListener("touchstart", this.onTouchBeginDelegate);
        view.htmlElement.removeEventListener("touchmove", this.onTouchMoveDelegate);
        view.htmlElement.removeEventListener("touchend", this.onTouchEndDelegate);
    };
    // ---------------------------------------------------------------------
    // Private.
    // ---------------------------------------------------------------------
    TouchManager.prototype.queueDispatch = function (event, sourceEvent, collider, touch) {
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
            event.entity = collider.entity;
            event.renderable = collider.renderable;
            // UV.
            event.uv = collider.uv;
            // Position.
            event.position = collider.position ? collider.position.clone() : null;
            // Normal.
            event.normal = collider.normal ? collider.normal.clone() : null;
            // ElementsIndex.
            event.elementIndex = collider.elementIndex;
        }
        else {
            // Set all to null.
            event.uv = null;
            event.entity = null;
            event.position = this._nullVector;
            event.normal = this._nullVector;
            event.elementIndex = 0;
        }
        // Store event to be dispatched later.
        this._queuedEvents.push(event);
    };
    // ---------------------------------------------------------------------
    // Event handlers.
    // ---------------------------------------------------------------------
    TouchManager.prototype.onTouchBegin = function (event) {
        var touch = new TouchPoint();
        //touch.id = event.touchPointID;
        //touch.x = event.stageX;
        //touch.y = event.stageY;
        this._numTouchPoints++;
        this._touchPoints.push(touch);
        this._touchPointFromId[touch.id] = touch;
        //this.updateCollider(event); // ensures collision check is done with correct mouse coordinates on mobile
        this._iCollision = TouchManager._iCollisionFromTouchId[touch.id];
        if (this._iCollision)
            this.queueDispatch(this._touchBegin, event, this._iCollision, touch);
        this._updateDirty = true;
    };
    TouchManager.prototype.onTouchMove = function (event) {
        //var touch:TouchPoint = this._touchPointFromId[ event.touchPointID ];
        //
        //if (!touch) return;
        //
        ////touch.x = event.stageX;
        ////touch.y = event.stageY;
        //
        //this._iCollision = TouchManager._iCollisionFromTouchId[ touch.id ];
        //
        //if (this._iCollision)
        //	this.queueDispatch(this._touchMove, this._touchMoveEvent = event, this._iCollision, touch);
        //
        //this._updateDirty = true;
    };
    TouchManager.prototype.onTouchEnd = function (event) {
        //var touch:TouchPoint = this._touchPointFromId[ event.touchPointID ];
        //
        //if (!touch) return;
        //
        //this._iCollision = TouchManager._iCollisionFromTouchId[ touch.id ];
        //if (this._iCollision)
        //	this.queueDispatch(this._touchEnd, event, this._iCollision, touch);
        //
        //this._touchPointFromId[ touch.id ] = null;
        //this._numTouchPoints--;
        //this._touchPoints.splice(this._touchPoints.indexOf(touch), 1);
        //
        //this._updateDirty = true;
    };
    return TouchManager;
}());
exports.TouchManager = TouchManager;
var TouchPoint = (function () {
    function TouchPoint() {
    }
    return TouchPoint;
}());
