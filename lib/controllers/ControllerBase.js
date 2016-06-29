"use strict";
var AbstractMethodError_1 = require("@awayjs/core/lib/errors/AbstractMethodError");
var ControllerBase = (function () {
    function ControllerBase(targetObject) {
        if (targetObject === void 0) { targetObject = null; }
        this._pAutoUpdate = true;
        this.targetObject = targetObject;
    }
    ControllerBase.prototype.pNotifyUpdate = function () {
        if (this._pTargetObject)
            this._pTargetObject.invalidatePartitionBounds();
    };
    Object.defineProperty(ControllerBase.prototype, "targetObject", {
        get: function () {
            return this._pTargetObject;
        },
        set: function (val) {
            if (this._pTargetObject == val)
                return;
            if (this._pTargetObject && this._pAutoUpdate)
                this._pTargetObject._iController = null;
            this._pTargetObject = val;
            if (this._pTargetObject && this._pAutoUpdate)
                this._pTargetObject._iController = this;
            this.pNotifyUpdate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ControllerBase.prototype, "autoUpdate", {
        get: function () {
            return this._pAutoUpdate;
        },
        set: function (val) {
            if (this._pAutoUpdate == val)
                return;
            this._pAutoUpdate = val;
            if (this._pTargetObject) {
                if (this._pAutoUpdate)
                    this._pTargetObject._iController = this;
                else
                    this._pTargetObject._iController = null;
            }
        },
        enumerable: true,
        configurable: true
    });
    ControllerBase.prototype.update = function (interpolate) {
        if (interpolate === void 0) { interpolate = true; }
        throw new AbstractMethodError_1.AbstractMethodError();
    };
    ControllerBase.prototype.updateController = function () {
        if (this._pControllerDirty && this._pAutoUpdate) {
            this._pControllerDirty = false;
            this.pNotifyUpdate();
        }
    };
    return ControllerBase;
}());
exports.ControllerBase = ControllerBase;
