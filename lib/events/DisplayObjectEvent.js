"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core_1 = require("@awayjs/core");
var DisplayObjectEvent = (function (_super) {
    __extends(DisplayObjectEvent, _super);
    function DisplayObjectEvent(type, object) {
        var _this = _super.call(this, type) || this;
        _this._object = object;
        return _this;
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
    return DisplayObjectEvent;
}(core_1.EventBase));
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
exports.DisplayObjectEvent = DisplayObjectEvent;
