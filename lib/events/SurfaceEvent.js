"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventBase_1 = require("@awayjs/core/lib/events/EventBase");
var SurfaceEvent = (function (_super) {
    __extends(SurfaceEvent, _super);
    /**
     * Create a new GraphicsEvent
     * @param type The event type.
     * @param dataType An optional data type of the vertex data being updated.
     */
    function SurfaceEvent(type, surface) {
        _super.call(this, type);
        this._surface = surface;
    }
    Object.defineProperty(SurfaceEvent.prototype, "surface", {
        /**
         * The surface of the renderable.
         */
        get: function () {
            return this._surface;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Clones the event.
     *
     * @return An exact duplicate of the current object.
     */
    SurfaceEvent.prototype.clone = function () {
        return new SurfaceEvent(this.type, this._surface);
    };
    SurfaceEvent.INVALIDATE_TEXTURE = "invalidateTexture";
    SurfaceEvent.INVALIDATE_ANIMATION = "invalidateAnimation";
    SurfaceEvent.INVALIDATE_PASSES = "invalidatePasses";
    return SurfaceEvent;
}(EventBase_1.EventBase));
exports.SurfaceEvent = SurfaceEvent;
