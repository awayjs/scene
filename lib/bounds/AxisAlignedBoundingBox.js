"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PlaneClassification_1 = require("@awayjs/core/lib/geom/PlaneClassification");
var ElementsType_1 = require("../graphics/ElementsType");
var BoundingVolumeBase_1 = require("../bounds/BoundingVolumeBase");
var PrimitiveCubePrefab_1 = require("../prefabs/PrimitiveCubePrefab");
/**
 * AxisAlignedBoundingBox represents a bounding box volume that has its planes aligned to the local coordinate axes of the bounded object.
 * This is useful for most sprites.
 */
var AxisAlignedBoundingBox = (function (_super) {
    __extends(AxisAlignedBoundingBox, _super);
    /**
     * Creates a new <code>AxisAlignedBoundingBox</code> object.
     */
    function AxisAlignedBoundingBox(entity) {
        _super.call(this, entity);
        this._x = 0;
        this._y = 0;
        this._z = 0;
        this._width = 0;
        this._height = 0;
        this._depth = 0;
        this._centerX = 0;
        this._centerY = 0;
        this._centerZ = 0;
        this._halfExtentsX = 0;
        this._halfExtentsY = 0;
        this._halfExtentsZ = 0;
    }
    /**
     * @inheritDoc
     */
    AxisAlignedBoundingBox.prototype.nullify = function () {
        this._x = this._y = this._z = 0;
        this._width = this._height = this._depth = 0;
        this._centerX = this._centerY = this._centerZ = 0;
        this._halfExtentsX = this._halfExtentsY = this._halfExtentsZ = 0;
    };
    /**
     * @inheritDoc
     */
    AxisAlignedBoundingBox.prototype.isInFrustum = function (planes, numPlanes) {
        if (this._pInvalidated)
            this._pUpdate();
        for (var i = 0; i < numPlanes; ++i) {
            var plane = planes[i];
            var a = plane.a;
            var b = plane.b;
            var c = plane.c;
            var flippedExtentX = a < 0 ? -this._halfExtentsX : this._halfExtentsX;
            var flippedExtentY = b < 0 ? -this._halfExtentsY : this._halfExtentsY;
            var flippedExtentZ = c < 0 ? -this._halfExtentsZ : this._halfExtentsZ;
            var projDist = a * (this._centerX + flippedExtentX) + b * (this._centerY + flippedExtentY) + c * (this._centerZ + flippedExtentZ) - plane.d;
            if (projDist < 0)
                return false;
        }
        return true;
    };
    AxisAlignedBoundingBox.prototype.rayIntersection = function (position, direction, targetNormal) {
        if (this._pInvalidated)
            this._pUpdate();
        return this._box.rayIntersection(position, direction, targetNormal);
    };
    AxisAlignedBoundingBox.prototype.classifyToPlane = function (plane) {
        var a = plane.a;
        var b = plane.b;
        var c = plane.c;
        var centerDistance = a * this._centerX + b * this._centerY + c * this._centerZ - plane.d;
        if (a < 0)
            a = -a;
        if (b < 0)
            b = -b;
        if (c < 0)
            c = -c;
        var boundOffset = a * this._halfExtentsX + b * this._halfExtentsY + c * this._halfExtentsZ;
        return centerDistance > boundOffset ? PlaneClassification_1.PlaneClassification.FRONT : centerDistance < -boundOffset ? PlaneClassification_1.PlaneClassification.BACK : PlaneClassification_1.PlaneClassification.INTERSECT;
    };
    AxisAlignedBoundingBox.prototype._pUpdate = function () {
        _super.prototype._pUpdate.call(this);
        this._box = this._pEntity.getBox();
        var matrix = this._pEntity.sceneTransform;
        var hx = this._box.width / 2;
        var hy = this._box.height / 2;
        var hz = this._box.depth / 2;
        var cx = this._box.x + hx;
        var cy = this._box.y + hy;
        var cz = this._box.z + hz;
        var raw = matrix.rawData;
        var m11 = raw[0], m12 = raw[4], m13 = raw[8], m14 = raw[12];
        var m21 = raw[1], m22 = raw[5], m23 = raw[9], m24 = raw[13];
        var m31 = raw[2], m32 = raw[6], m33 = raw[10], m34 = raw[14];
        this._centerX = cx * m11 + cy * m12 + cz * m13 + m14;
        this._centerY = cx * m21 + cy * m22 + cz * m23 + m24;
        this._centerZ = cx * m31 + cy * m32 + cz * m33 + m34;
        this._halfExtentsX = Math.abs(hx * m11 + hy * m12 + hz * m13);
        this._halfExtentsY = Math.abs(hx * m21 + hy * m22 + hz * m23);
        this._halfExtentsZ = Math.abs(hx * m31 + hy * m32 + hz * m33);
        if (this._prefab) {
            this._prefab.width = this._box.width;
            this._prefab.height = this._box.height;
            this._prefab.depth = this._box.depth;
            this._pBoundsPrimitive.transform.matrix3D = matrix;
        }
        this._width = this._halfExtentsX * 2;
        this._height = this._halfExtentsY * 2;
        this._depth = this._halfExtentsZ * 2;
        this._x = this._centerX - this._halfExtentsX;
        this._y = this._centerY - this._halfExtentsY;
        this._z = this._centerZ - this._halfExtentsZ;
    };
    AxisAlignedBoundingBox.prototype._pCreateBoundsPrimitive = function () {
        this._prefab = new PrimitiveCubePrefab_1.PrimitiveCubePrefab(null, ElementsType_1.ElementsType.LINE);
        return this._prefab.getNewObject();
    };
    return AxisAlignedBoundingBox;
}(BoundingVolumeBase_1.BoundingVolumeBase));
exports.AxisAlignedBoundingBox = AxisAlignedBoundingBox;
