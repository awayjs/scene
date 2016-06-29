"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventBase_1 = require("@awayjs/core/lib/events/EventBase");
/**
 * A MouseEvent is dispatched when a mouse event occurs over a mouseEnabled object in View.
 * TODO: we don't have screenZ data, tho this should be easy to implement
 */
var MouseEvent = (function (_super) {
    __extends(MouseEvent, _super);
    /**
     * Create a new MouseEvent object.
     * @param type The type of the MouseEvent.
     */
    function MouseEvent(type) {
        _super.call(this, type);
        // Private.
        this._iAllowedToPropagate = true;
    }
    Object.defineProperty(MouseEvent.prototype, "bubbles", {
        /**
         * @inheritDoc
         */
        get: function () {
            var doesBubble = this._iAllowedToPropagate;
            this._iAllowedToPropagate = true;
            // Don't bubble if propagation has been stopped.
            return doesBubble;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @inheritDoc
     */
    MouseEvent.prototype.stopPropagation = function () {
        this._iAllowedToPropagate = false;
        if (this._iParentEvent)
            this._iParentEvent.stopPropagation();
    };
    /**
     * @inheritDoc
     */
    MouseEvent.prototype.stopImmediatePropagation = function () {
        this._iAllowedToPropagate = false;
        if (this._iParentEvent)
            this._iParentEvent.stopImmediatePropagation();
    };
    /**
     * Creates a copy of the MouseEvent object and sets the value of each property to match that of the original.
     */
    MouseEvent.prototype.clone = function () {
        var result = new MouseEvent(this.type);
        /* TODO: Debug / test - look into isDefaultPrevented
         if (isDefaultPrevented())
         result.preventDefault();
         */
        result.screenX = this.screenX;
        result.screenY = this.screenY;
        result.view = this.view;
        result.entity = this.entity;
        result.renderable = this.renderable;
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
        return result;
    };
    Object.defineProperty(MouseEvent.prototype, "scenePosition", {
        /**
         * The position in scene space where the event took place
         */
        get: function () {
            return this.entity.sceneTransform.transformVector(this.position);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MouseEvent.prototype, "sceneNormal", {
        /**
         * The normal in scene space where the event took place
         */
        get: function () {
            var sceneNormal = this.entity.sceneTransform.deltaTransformVector(this.normal);
            sceneNormal.normalize();
            return sceneNormal;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Defines the value of the type property of a mouseOver3d event object.
     */
    MouseEvent.MOUSE_OVER = "mouseOver3d";
    /**
     * Defines the value of the type property of a mouseOut3d event object.
     */
    MouseEvent.MOUSE_OUT = "mouseOut3d";
    /**
     * Defines the value of the type property of a mouseUp3d event object.
     */
    MouseEvent.MOUSE_UP = "mouseUp3d";
    /**
     * Defines the value of the type property of a mouseDown3d event object.
     */
    MouseEvent.MOUSE_DOWN = "mouseDown3d";
    /**
     * Defines the value of the type property of a mouseMove3d event object.
     */
    MouseEvent.MOUSE_MOVE = "mouseMove3d";
    /**
     * Defines the value of the type property of a rollOver3d event object.
     */
    //		public static ROLL_OVER : string = "rollOver3d";
    /**
     * Defines the value of the type property of a rollOut3d event object.
     */
    //		public static ROLL_OUT : string = "rollOut3d";
    /**
     * Defines the value of the type property of a click3d event object.
     */
    MouseEvent.CLICK = "click3d";
    /**
     * Defines the value of the type property of a doubleClick3d event object.
     */
    MouseEvent.DOUBLE_CLICK = "doubleClick3d";
    /**
     * Defines the value of the type property of a mouseWheel3d event object.
     */
    MouseEvent.MOUSE_WHEEL = "mouseWheel3d";
    return MouseEvent;
}(EventBase_1.EventBase));
exports.MouseEvent = MouseEvent;
