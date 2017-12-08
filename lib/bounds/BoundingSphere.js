"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core_1 = require("@awayjs/core");
var graphics_1 = require("@awayjs/graphics");
var PrimitiveSpherePrefab_1 = require("../prefabs/PrimitiveSpherePrefab");
var BoundingVolumeBase_1 = require("./BoundingVolumeBase");
var BoundingSphere = (function (_super) {
    __extends(BoundingSphere, _super);
    function BoundingSphere(entity) {
        var _this = _super.call(this, entity) || this;
        _this._radius = 0;
        _this._centerX = 0;
        _this._centerY = 0;
        _this._centerZ = 0;
        return _this;
    }
    BoundingSphere.prototype.nullify = function () {
        this._centerX = this._centerY = this._centerZ = 0;
        this._radius = 0;
    };
    BoundingSphere.prototype.isInFrustum = function (planes, numPlanes) {
        if (this._pInvalidated)
            this._pUpdate();
        for (var i = 0; i < numPlanes; ++i) {
            var plane = planes[i];
            var flippedExtentX = plane.a < 0 ? -this._radius : this._radius;
            var flippedExtentY = plane.b < 0 ? -this._radius : this._radius;
            var flippedExtentZ = plane.c < 0 ? -this._radius : this._radius;
            var projDist = plane.a * (this._centerX + flippedExtentX) + plane.b * (this._centerY + flippedExtentY) + plane.c * (this._centerZ + flippedExtentZ) - plane.d;
            if (projDist < 0) {
                return false;
            }
        }
        return true;
    };
    BoundingSphere.prototype.rayIntersection = function (position, direction, targetNormal) {
        if (this._pInvalidated)
            this._pUpdate();
        return this._sphere.rayIntersection(position, direction, targetNormal);
    };
    //@override
    BoundingSphere.prototype.classifyToPlane = function (plane) {
        var a = plane.a;
        var b = plane.b;
        var c = plane.c;
        var dd = a * this._centerX + b * this._centerY + c * this._centerZ - plane.d;
        if (a < 0)
            a = -a;
        if (b < 0)
            b = -b;
        if (c < 0)
            c = -c;
        var rr = (a + b + c) * this._radius;
        return dd > rr ? core_1.PlaneClassification.FRONT : dd < -rr ? core_1.PlaneClassification.BACK : core_1.PlaneClassification.INTERSECT;
    };
    BoundingSphere.prototype._pUpdate = function () {
        _super.prototype._pUpdate.call(this);
        this._sphere = this._entity.getSphere();
        var matrix = this._entity.transform.concatenatedMatrix3D;
        var cx = this._sphere.x;
        var cy = this._sphere.y;
        var cz = this._sphere.z;
        var r = this._sphere.radius;
        var raw = matrix._rawData;
        var m11 = raw[0], m12 = raw[4], m13 = raw[8], m14 = raw[12];
        var m21 = raw[1], m22 = raw[5], m23 = raw[9], m24 = raw[13];
        var m31 = raw[2], m32 = raw[6], m33 = raw[10], m34 = raw[14];
        this._centerX = cx * m11 + cy * m12 + cz * m13 + m14;
        this._centerY = cx * m21 + cy * m22 + cz * m23 + m24;
        this._centerZ = cx * m31 + cy * m32 + cz * m33 + m34;
        var rx = m11 + m12 + m13;
        var ry = m21 + m22 + m23;
        var rz = m31 + m32 + m33;
        this._radius = r * Math.sqrt((rx * rx + ry * ry + rz * rz) / 3);
        if (this._prefab) {
            this._prefab.radius = r;
            this._pBoundsPrimitive.x = cx;
            this._pBoundsPrimitive.y = cy;
            this._pBoundsPrimitive.z = cz;
            this._pBoundsPrimitive.transform.matrix3D = matrix;
        }
    };
    BoundingSphere.prototype._pCreateBoundsPrimitive = function () {
        this._prefab = new PrimitiveSpherePrefab_1.PrimitiveSpherePrefab(null, graphics_1.ElementsType.LINE);
        return this._prefab.getNewObject();
    };
    return BoundingSphere;
}(BoundingVolumeBase_1.BoundingVolumeBase));
exports.BoundingSphere = BoundingSphere;
