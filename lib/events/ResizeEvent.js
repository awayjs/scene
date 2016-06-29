"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventBase_1 = require("@awayjs/core/lib/events/EventBase");
var ResizeEvent = (function (_super) {
    __extends(ResizeEvent, _super);
    function ResizeEvent(type, oldHeight, oldWidth) {
        if (oldHeight === void 0) { oldHeight = NaN; }
        if (oldWidth === void 0) { oldWidth = NaN; }
        _super.call(this, type);
        this._oldHeight = oldHeight;
        this._oldWidth = oldWidth;
    }
    Object.defineProperty(ResizeEvent.prototype, "oldHeight", {
        get: function () {
            return this._oldHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResizeEvent.prototype, "oldWidth", {
        get: function () {
            return this._oldWidth;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Clones the event.
     *
     * @return An exact duplicate of the current object.
     */
    ResizeEvent.prototype.clone = function () {
        return new ResizeEvent(this.type, this._oldHeight, this._oldWidth);
    };
    ResizeEvent.RESIZE = "resize";
    return ResizeEvent;
}(EventBase_1.EventBase));
exports.ResizeEvent = ResizeEvent;
