"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AxisAlignedBoundingBox_1 = require("./AxisAlignedBoundingBox");
/**
 * AxisAlignedBoundingBox represents a bounding box volume that has its planes aligned to the local coordinate axes of the bounded object.
 * This is useful for most meshes.
 */
var AxisAlignedBoundingBox2D = (function (_super) {
    __extends(AxisAlignedBoundingBox2D, _super);
    /**
     * Creates a new <code>AxisAlignedBoundingBox</code> object.
     */
    function AxisAlignedBoundingBox2D(entity) {
        return _super.call(this, entity) || this;
    }
    AxisAlignedBoundingBox2D.prototype.rayIntersection = function (position, direction, targetNormal) {
        if (this._pInvalidated)
            this._pUpdate();
        var halfExtentsX = this._box.width / 2;
        var halfExtentsY = this._box.height / 2;
        var centerX = this._box.x + halfExtentsX;
        var centerY = this._box.y + halfExtentsY;
        var px = position.x - centerX;
        var py = position.y - centerY;
        var pz = position.z;
        var vx = direction.x;
        var vy = direction.y;
        var vz = direction.z;
        var ix;
        var iy;
        var intersects;
        var rayEntryDistance;
        if (!intersects && vz < 0) {
            rayEntryDistance = -pz / vz;
            if (rayEntryDistance > 0) {
                ix = px + rayEntryDistance * vx;
                iy = py + rayEntryDistance * vy;
                if (iy > -halfExtentsY && iy < halfExtentsY && ix > -halfExtentsX && ix < halfExtentsX) {
                    targetNormal.x = 0;
                    targetNormal.y = 0;
                    targetNormal.z = 1;
                    intersects = true;
                }
            }
        }
        if (!intersects && vz > 0) {
            rayEntryDistance = -pz / vz;
            if (rayEntryDistance > 0) {
                ix = px + rayEntryDistance * vx;
                iy = py + rayEntryDistance * vy;
                if (iy > -halfExtentsY && iy < halfExtentsY && ix > -halfExtentsX && ix < halfExtentsX) {
                    targetNormal.x = 0;
                    targetNormal.y = 0;
                    targetNormal.z = -1;
                    intersects = true;
                }
            }
        }
        return intersects ? rayEntryDistance : -1;
    };
    return AxisAlignedBoundingBox2D;
}(AxisAlignedBoundingBox_1.AxisAlignedBoundingBox));
exports.AxisAlignedBoundingBox2D = AxisAlignedBoundingBox2D;
