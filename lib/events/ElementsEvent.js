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
 * @class away.events.ElementsEvent
 * @see away.core.base.Graphics
 */
var ElementsEvent = (function (_super) {
    __extends(ElementsEvent, _super);
    /**
     * Create a new GraphicsEvent
     * @param type The event type.
     * @param attributesView An optional data type of the vertex data being updated.
     */
    function ElementsEvent(type, attributesView) {
        _super.call(this, type);
        this._attributesView = attributesView;
    }
    Object.defineProperty(ElementsEvent.prototype, "attributesView", {
        /**
         * The attributes view of the vertex data.
         */
        get: function () {
            return this._attributesView;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Clones the event.
     *
     * @return An exact duplicate of the current object.
     */
    ElementsEvent.prototype.clone = function () {
        return new ElementsEvent(this.type, this._attributesView);
    };
    /**
     * Dispatched when a Elements's index data has been updated.
     */
    ElementsEvent.INVALIDATE_INDICES = "invalidateIndices";
    /**
     * Dispatched when a Elements's index data has been disposed.
     */
    ElementsEvent.CLEAR_INDICES = "clearIndices";
    /**
     * Dispatched when a Elements's vertex data has been updated.
     */
    ElementsEvent.INVALIDATE_VERTICES = "invalidateVertices";
    /**
     * Dispatched when a Elements's vertex data has been disposed.
     */
    ElementsEvent.CLEAR_VERTICES = "clearVertices";
    return ElementsEvent;
}(EventBase_1.EventBase));
exports.ElementsEvent = ElementsEvent;
