"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core_1 = require("@awayjs/core");
/**
 * @class away.events.CameraEvent
 */
var CameraEvent = (function (_super) {
    __extends(CameraEvent, _super);
    function CameraEvent(type, camera) {
        var _this = _super.call(this, type) || this;
        _this._camera = camera;
        return _this;
    }
    Object.defineProperty(CameraEvent.prototype, "camera", {
        get: function () {
            return this._camera;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Clones the event.
     * @return An exact duplicate of the current object.
     */
    CameraEvent.prototype.clone = function () {
        return new CameraEvent(this.type, this._camera);
    };
    return CameraEvent;
}(core_1.EventBase));
CameraEvent.PROJECTION_CHANGED = "projectionChanged";
exports.CameraEvent = CameraEvent;
