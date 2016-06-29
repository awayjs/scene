"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventBase_1 = require("@awayjs/core/lib/events/EventBase");
var TransformEvent = (function (_super) {
    __extends(TransformEvent, _super);
    function TransformEvent(type, transform) {
        _super.call(this, type);
        this._transform = transform;
    }
    Object.defineProperty(TransformEvent.prototype, "transform", {
        get: function () {
            return this._transform;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Clones the event.
     * @return An exact duplicate of the current object.
     */
    TransformEvent.prototype.clone = function () {
        return new TransformEvent(this.type, this._transform);
    };
    /**
     *
     */
    TransformEvent.INVALIDATE_MATRIX3D = "invalidateMatrix3D";
    /**
     *
     */
    TransformEvent.INVALIDATE_COLOR_TRANSFORM = "invalidateColorTransform";
    return TransformEvent;
}(EventBase_1.EventBase));
exports.TransformEvent = TransformEvent;
