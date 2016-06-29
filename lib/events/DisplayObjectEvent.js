"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventBase_1 = require("@awayjs/core/lib/events/EventBase");
var DisplayObjectEvent = (function (_super) {
    __extends(DisplayObjectEvent, _super);
    function DisplayObjectEvent(type, object) {
        _super.call(this, type);
        this._object = object;
    }
    Object.defineProperty(DisplayObjectEvent.prototype, "object", {
        get: function () {
            return this._object;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Clones the event.
     * @return An exact duplicate of the current object.
     */
    DisplayObjectEvent.prototype.clone = function () {
        return new DisplayObjectEvent(this.type, this._object);
    };
    /**
     *
     */
    DisplayObjectEvent.VISIBLITY_UPDATED = "visiblityUpdated";
    /**
     *
     */
    DisplayObjectEvent.SCENETRANSFORM_CHANGED = "scenetransformChanged";
    /**
     *
     */
    DisplayObjectEvent.SCENE_CHANGED = "sceneChanged";
    /**
     *
     */
    DisplayObjectEvent.PARTITION_CHANGED = "partitionChanged";
    /**
     *
     */
    DisplayObjectEvent.INVALIDATE_PARTITION_BOUNDS = "invalidatePartitionBounds";
    return DisplayObjectEvent;
}(EventBase_1.EventBase));
exports.DisplayObjectEvent = DisplayObjectEvent;
