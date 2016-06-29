"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventBase_1 = require("@awayjs/core/lib/events/EventBase");
/**
 * Dispatched to notify changes in a sub geometry object's state.
 *
 * @class away.events.RenderableEvent
 * @see away.core.base.Graphics
 */
var RenderableEvent = (function (_super) {
    __extends(RenderableEvent, _super);
    /**
     * Create a new GraphicsEvent
     * @param type The event type.
     * @param dataType An optional data type of the vertex data being updated.
     */
    function RenderableEvent(type, renderable) {
        _super.call(this, type);
        this._renderable = renderable;
    }
    Object.defineProperty(RenderableEvent.prototype, "renderable", {
        /**
         * The renderobject owner of the renderable owner.
         */
        get: function () {
            return this._renderable;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Clones the event.
     *
     * @return An exact duplicate of the current object.
     */
    RenderableEvent.prototype.clone = function () {
        return new RenderableEvent(this.type, this._renderable);
    };
    /**
     * Dispatched when a Renderable owners's render object owner has been updated.
     */
    RenderableEvent.INVALIDATE_SURFACE = "invalidateRenderable";
    /**
     *
     */
    RenderableEvent.INVALIDATE_ELEMENTS = "invalidateElements";
    return RenderableEvent;
}(EventBase_1.EventBase));
exports.RenderableEvent = RenderableEvent;
