"use strict";
var Vector3D_1 = require("@awayjs/core/lib/geom/Vector3D");
var TouchPoint_1 = require("../base/TouchPoint");
var MouseEvent_1 = require("../events/MouseEvent");
var FrameScriptManager_1 = require("../managers/FrameScriptManager");
/**
 * MouseManager enforces a singleton pattern and is not intended to be instanced.
 * it provides a manager class for detecting mouse hits on scene objects and sending out mouse events.
 */
var MouseManager = (function () {
    /**
     * Creates a new <code>MouseManager</code> object.
     */
    function MouseManager() {
        var _this = this;
        this._viewLookup = new Array();
        this._nullVector = new Vector3D_1.Vector3D();
        this._queuedEvents = new Array();
        this._mouseUp = new MouseEvent_1.MouseEvent(MouseEvent_1.MouseEvent.MOUSE_UP);
        this._mouseClick = new MouseEvent_1.MouseEvent(MouseEvent_1.MouseEvent.CLICK);
        this._mouseOut = new MouseEvent_1.MouseEvent(MouseEvent_1.MouseEvent.MOUSE_OUT);
        this._mouseDown = new MouseEvent_1.MouseEvent(MouseEvent_1.MouseEvent.MOUSE_DOWN);
        this._mouseMove = new MouseEvent_1.MouseEvent(MouseEvent_1.MouseEvent.MOUSE_MOVE);
        this._mouseOver = new MouseEvent_1.MouseEvent(MouseEvent_1.MouseEvent.MOUSE_OVER);
        this._mouseWheel = new MouseEvent_1.MouseEvent(MouseEvent_1.MouseEvent.MOUSE_WHEEL);
        this._mouseDoubleClick = new MouseEvent_1.MouseEvent(MouseEvent_1.MouseEvent.DOUBLE_CLICK);
        this.onClickDelegate = function (event) { return _this.onClick(event); };
        this.onDoubleClickDelegate = function (event) { return _this.onDoubleClick(event); };
        this.onMouseDownDelegate = function (event) { return _this.onMouseDown(event); };
        this.onMouseMoveDelegate = function (event) { return _this.onMouseMove(event); };
        this.onMouseUpDelegate = function (event) { return _this.onMouseUp(event); };
        this.onMouseWheelDelegate = function (event) { return _this.onMouseWheel(event); };
        this.onMouseOverDelegate = function (event) { return _this.onMouseOver(event); };
        this.onMouseOutDelegate = function (event) { return _this.onMouseOut(event); };
    }
    MouseManager.getInstance = function () {
        if (this._instance)
            return this._instance;
        return (this._instance = new MouseManager());
    };
    MouseManager.prototype.fireMouseEvents = function (forceMouseMove) {
        // If colliding object has changed, queue over/out events.
        if (this._iCollision != this._previousCollidingObject) {
            if (this._previousCollidingObject)
                this.queueDispatch(this._mouseOut, this._mouseMoveEvent, this._previousCollidingObject);
            if (this._iCollision)
                this.queueDispatch(this._mouseOver, this._mouseMoveEvent);
        }
        // Fire mouse move events here if forceMouseMove is on.
        if (forceMouseMove && this._iCollision)
            this.queueDispatch(this._mouseMove, this._mouseMoveEvent);
        var event;
        var dispatcher;
        // Dispatch all queued events.
        var len = this._queuedEvents.length;
        for (var i = 0; i < len; ++i) {
            event = this._queuedEvents[i];
            dispatcher = event.entity;
            // bubble event up the heirarchy until the top level parent is reached
            while (dispatcher) {
                if (dispatcher._iIsMouseEnabled())
                    dispatcher.dispatchEvent(event);
                dispatcher = dispatcher.parent;
            }
            // not totally sure, but i think just calling it is easier and cheaper than any options for that
            // if nothing is queued, the function will return directly anyway
            FrameScriptManager_1.FrameScriptManager.execute_queue();
        }
        this._queuedEvents.length = 0;
        this._previousCollidingObject = this._iCollision;
        this._iUpdateDirty = false;
    };
    //		public addViewLayer(view:View)
    //		{
    //			var stg:Stage = view.stage;
    //
    //			// Add instance to mouse3dmanager to fire mouse events for multiple views
    //			if (!view.stageGL.mouse3DManager)
    //				view.stageGL.mouse3DManager = this;
    //
    //			if (!hasKey(view))
    //				_view3Ds[view] = 0;
    //
    //			_childDepth = 0;
    //			traverseDisplayObjects(stg);
    //			_viewCount = _childDepth;
    //		}
    MouseManager.prototype.registerView = function (view) {
        if (view && view.htmlElement) {
            view.htmlElement.addEventListener("click", this.onClickDelegate);
            view.htmlElement.addEventListener("dblclick", this.onDoubleClickDelegate);
            view.htmlElement.addEventListener("touchstart", this.onMouseDownDelegate);
            view.htmlElement.addEventListener("mousedown", this.onMouseDownDelegate);
            view.htmlElement.addEventListener("touchmove", this.onMouseMoveDelegate);
            view.htmlElement.addEventListener("mousemove", this.onMouseMoveDelegate);
            view.htmlElement.addEventListener("mouseup", this.onMouseUpDelegate);
            view.htmlElement.addEventListener("touchend", this.onMouseUpDelegate);
            view.htmlElement.addEventListener("mousewheel", this.onMouseWheelDelegate);
            view.htmlElement.addEventListener("mouseover", this.onMouseOverDelegate);
            view.htmlElement.addEventListener("mouseout", this.onMouseOutDelegate);
            this._viewLookup.push(view);
        }
    };
    MouseManager.prototype.unregisterView = function (view) {
        if (view && view.htmlElement) {
            view.htmlElement.removeEventListener("click", this.onClickDelegate);
            view.htmlElement.removeEventListener("dblclick", this.onDoubleClickDelegate);
            view.htmlElement.removeEventListener("touchstart", this.onMouseDownDelegate);
            view.htmlElement.removeEventListener("mousedown", this.onMouseDownDelegate);
            view.htmlElement.removeEventListener("touchmove", this.onMouseMoveDelegate);
            view.htmlElement.removeEventListener("mousemove", this.onMouseMoveDelegate);
            view.htmlElement.removeEventListener("touchend", this.onMouseUpDelegate);
            view.htmlElement.removeEventListener("mouseup", this.onMouseUpDelegate);
            view.htmlElement.removeEventListener("mousewheel", this.onMouseWheelDelegate);
            view.htmlElement.removeEventListener("mouseover", this.onMouseOverDelegate);
            view.htmlElement.removeEventListener("mouseout", this.onMouseOutDelegate);
            this._viewLookup.slice(this._viewLookup.indexOf(view), 1);
        }
    };
    // ---------------------------------------------------------------------
    // Private.
    // ---------------------------------------------------------------------
    MouseManager.prototype.queueDispatch = function (event, sourceEvent, collision) {
        if (collision === void 0) { collision = null; }
        // 2D properties.
        if (sourceEvent) {
            event.ctrlKey = sourceEvent.ctrlKey;
            event.altKey = sourceEvent.altKey;
            event.shiftKey = sourceEvent.shiftKey;
            event.screenX = (sourceEvent.clientX != null) ? sourceEvent.clientX : sourceEvent.changedTouches[0].clientX;
            event.screenY = (sourceEvent.clientY != null) ? sourceEvent.clientY : sourceEvent.changedTouches[0].clientY;
        }
        if (collision == null)
            collision = this._iCollision;
        // 3D properties.
        if (collision) {
            // Object.
            event.entity = collision.entity;
            event.renderable = collision.renderable;
            // UV.
            event.uv = collision.uv;
            // Position.
            event.position = collision.position ? collision.position.clone() : null;
            // Normal.
            event.normal = collision.normal ? collision.normal.clone() : null;
            // Face index.
            event.elementIndex = collision.elementIndex;
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
    // Listeners.
    // ---------------------------------------------------------------------
    MouseManager.prototype.onMouseMove = function (event) {
        event.preventDefault();
        this.updateColliders(event);
        if (this._iCollision)
            this.queueDispatch(this._mouseMove, this._mouseMoveEvent = event);
    };
    MouseManager.prototype.onMouseOut = function (event) {
        this._iActiveDiv = null;
        this.updateColliders(event);
        if (this._iCollision)
            this.queueDispatch(this._mouseOut, event);
    };
    MouseManager.prototype.onMouseOver = function (event) {
        this._iActiveDiv = event.target;
        this.updateColliders(event);
        if (this._iCollision)
            this.queueDispatch(this._mouseOver, event);
    };
    MouseManager.prototype.onClick = function (event) {
        this.updateColliders(event);
        if (this._iCollision)
            this.queueDispatch(this._mouseClick, event);
    };
    MouseManager.prototype.onDoubleClick = function (event) {
        this.updateColliders(event);
        if (this._iCollision)
            this.queueDispatch(this._mouseDoubleClick, event);
    };
    MouseManager.prototype.onMouseDown = function (event) {
        event.preventDefault();
        this._iActiveDiv = event.target;
        this.updateColliders(event);
        if (this._iCollision)
            this.queueDispatch(this._mouseDown, event);
    };
    MouseManager.prototype.onMouseUp = function (event) {
        event.preventDefault();
        this.updateColliders(event);
        if (this._iCollision)
            this.queueDispatch(this._mouseUp, event);
    };
    MouseManager.prototype.onMouseWheel = function (event) {
        this.updateColliders(event);
        if (this._iCollision)
            this.queueDispatch(this._mouseWheel, event);
    };
    MouseManager.prototype.updateColliders = function (event) {
        var view;
        var bounds;
        var mouseX = (event.clientX != null) ? event.clientX : event.changedTouches[0].clientX;
        var mouseY = (event.clientY != null) ? event.clientY : event.changedTouches[0].clientY;
        var len = this._viewLookup.length;
        for (var i = 0; i < len; i++) {
            view = this._viewLookup[i];
            view._pTouchPoints.length = 0;
            bounds = view.htmlElement.getBoundingClientRect();
            if (event.touches) {
                var touch;
                var len = event.touches.length;
                for (var i = 0; i < len; i++) {
                    touch = event.touches[i];
                    view._pTouchPoints.push(new TouchPoint_1.TouchPoint(touch.clientX + bounds.left, touch.clientY + bounds.top, touch.identifier));
                }
            }
            if (this._iUpdateDirty)
                continue;
            if (mouseX < bounds.left || mouseX > bounds.right || mouseY < bounds.top || mouseY > bounds.bottom) {
                view._pMouseX = null;
                view._pMouseY = null;
            }
            else {
                view._pMouseX = mouseX + bounds.left;
                view._pMouseY = mouseY + bounds.top;
                view.updateCollider();
                if (view.layeredView && this._iCollision)
                    break;
            }
        }
        this._iUpdateDirty = true;
    };
    return MouseManager;
}());
exports.MouseManager = MouseManager;
