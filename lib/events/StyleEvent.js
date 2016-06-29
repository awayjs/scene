"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventBase_1 = require("@awayjs/core/lib/events/EventBase");
var StyleEvent = (function (_super) {
    __extends(StyleEvent, _super);
    function StyleEvent(type, style) {
        _super.call(this, type);
        this._style = style;
    }
    Object.defineProperty(StyleEvent.prototype, "style", {
        get: function () {
            return this._style;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Clones the event.
     * @return An exact duplicate of the current object.
     */
    StyleEvent.prototype.clone = function () {
        return new StyleEvent(this.type, this._style);
    };
    /**
     *
     */
    StyleEvent.INVALIDATE_PROPERTIES = "invalidateProperties";
    return StyleEvent;
}(EventBase_1.EventBase));
exports.StyleEvent = StyleEvent;
