"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core_1 = require("@awayjs/core");
var BoundingVolumeBase_1 = require("../bounds/BoundingVolumeBase");
var NullBounds = (function (_super) {
    __extends(NullBounds, _super);
    function NullBounds(alwaysIn) {
        if (alwaysIn === void 0) { alwaysIn = true; }
        var _this = _super.call(this, null) || this;
        _this._alwaysIn = alwaysIn;
        return _this;
    }
    //@override
    NullBounds.prototype.clone = function () {
        return new NullBounds(this._alwaysIn);
    };
    //@override
    NullBounds.prototype.isInFrustum = function (planes, numPlanes) {
        return this._alwaysIn;
    };
    NullBounds.prototype.classifyToPlane = function (plane) {
        return core_1.PlaneClassification.INTERSECT;
    };
    return NullBounds;
}(BoundingVolumeBase_1.BoundingVolumeBase));
exports.NullBounds = NullBounds;
