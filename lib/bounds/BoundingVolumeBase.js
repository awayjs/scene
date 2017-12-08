"use strict";
var core_1 = require("@awayjs/core");
var BoundingVolumeBase = (function () {
    function BoundingVolumeBase(entity) {
        this._pInvalidated = true;
        this._entity = entity;
    }
    BoundingVolumeBase.prototype.dispose = function () {
        this._entity = null;
        this._pBoundsPrimitive = null;
    };
    Object.defineProperty(BoundingVolumeBase.prototype, "boundsPrimitive", {
        get: function () {
            if (this._pBoundsPrimitive == null) {
                this._pBoundsPrimitive = this._pCreateBoundsPrimitive();
                this._pInvalidated = true;
            }
            if (this._pInvalidated)
                this._pUpdate();
            return this._pBoundsPrimitive;
        },
        enumerable: true,
        configurable: true
    });
    BoundingVolumeBase.prototype.nullify = function () {
        throw new core_1.AbstractMethodError();
    };
    BoundingVolumeBase.prototype.isInFrustum = function (planes, numPlanes) {
        throw new core_1.AbstractMethodError();
    };
    BoundingVolumeBase.prototype.clone = function () {
        throw new core_1.AbstractMethodError();
    };
    BoundingVolumeBase.prototype.rayIntersection = function (position, direction, targetNormal) {
        return -1;
    };
    BoundingVolumeBase.prototype.classifyToPlane = function (plane) {
        throw new core_1.AbstractMethodError();
    };
    BoundingVolumeBase.prototype._pUpdate = function () {
        this._pInvalidated = false;
    };
    BoundingVolumeBase.prototype.invalidate = function () {
        this._pInvalidated = true;
    };
    BoundingVolumeBase.prototype._pCreateBoundsPrimitive = function () {
        throw new core_1.AbstractMethodError();
    };
    return BoundingVolumeBase;
}());
exports.BoundingVolumeBase = BoundingVolumeBase;
