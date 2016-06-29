"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventBase_1 = require("@awayjs/core/lib/events/EventBase");
var TouchEvent = (function (_super) {
    __extends(TouchEvent, _super);
    /**
     * Create a new TouchEvent object.
     * @param type The type of the TouchEvent.
     */
    function TouchEvent(type) {
        _super.call(this, type);
        // Private.
        this._iAllowedToPropagate = true;
    }
    Object.defineProperty(TouchEvent.prototype, "bubbles", {
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
    TouchEvent.prototype.stopPropagation = function () {
        this._iAllowedToPropagate = false;
        if (this._iParentEvent)
            this._iParentEvent.stopPropagation();
    };
    /**
     * @inheritDoc
     */
    TouchEvent.prototype.stopImmediatePropagation = function () {
        this._iAllowedToPropagate = false;
        if (this._iParentEvent)
            this._iParentEvent.stopImmediatePropagation();
    };
    /**
     * Creates a copy of the TouchEvent object and sets the value of each property to match that of the original.
     */
    TouchEvent.prototype.clone = function () {
        var result = new TouchEvent(this.type);
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
        result.ctrlKey = this.ctrlKey;
        result.shiftKey = this.shiftKey;
        result._iParentEvent = this;
        return result;
    };
    Object.defineProperty(TouchEvent.prototype, "scenePosition", {
        /**
         * The position in scene space where the event took place
         */
        get: function () {
            return this.entity.sceneTransform.transformVector(this.position);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TouchEvent.prototype, "sceneNormal", {
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
     *
     */
    TouchEvent.TOUCH_END = "touchEnd3d";
    /**
     *
     */
    TouchEvent.TOUCH_BEGIN = "touchBegin3d";
    /**
     *
     */
    TouchEvent.TOUCH_MOVE = "touchMove3d";
    /**
     *
     */
    TouchEvent.TOUCH_OUT = "touchOut3d";
    /**
     *
     */
    TouchEvent.TOUCH_OVER = "touchOver3d";
    return TouchEvent;
}(EventBase_1.EventBase));
exports.TouchEvent = TouchEvent;
