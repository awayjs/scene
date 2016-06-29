"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Matrix3DUtils_1 = require("@awayjs/core/lib/geom/Matrix3DUtils");
var Matrix3D_1 = require("@awayjs/core/lib/geom/Matrix3D");
var Vector3D_1 = require("@awayjs/core/lib/geom/Vector3D");
var LightBase_1 = require("../display/LightBase");
var HierarchicalProperties_1 = require("../base/HierarchicalProperties");
var BoundsType_1 = require("../bounds/BoundsType");
var DirectionalShadowMapper_1 = require("../materials/shadowmappers/DirectionalShadowMapper");
var DirectionalLight = (function (_super) {
    __extends(DirectionalLight, _super);
    function DirectionalLight(xDir, yDir, zDir) {
        if (xDir === void 0) { xDir = 0; }
        if (yDir === void 0) { yDir = -1; }
        if (zDir === void 0) { zDir = 1; }
        _super.call(this);
        this._pAabbPoints = new Array(24);
        this._pIsEntity = true;
        this.direction = new Vector3D_1.Vector3D(xDir, yDir, zDir);
        this._sceneDirection = new Vector3D_1.Vector3D();
        //default bounds type
        this._boundsType = BoundsType_1.BoundsType.NULL;
    }
    Object.defineProperty(DirectionalLight.prototype, "assetType", {
        get: function () {
            return DirectionalLight.assetType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DirectionalLight.prototype, "sceneDirection", {
        get: function () {
            if (this._hierarchicalPropsDirty & HierarchicalProperties_1.HierarchicalProperties.SCENE_TRANSFORM)
                this.pUpdateSceneTransform();
            return this._sceneDirection;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DirectionalLight.prototype, "direction", {
        get: function () {
            return this._direction;
        },
        set: function (value) {
            this._direction = value;
            if (!this._tmpLookAt)
                this._tmpLookAt = new Vector3D_1.Vector3D();
            this._tmpLookAt.x = this.x + this._direction.x;
            this._tmpLookAt.y = this.y + this._direction.y;
            this._tmpLookAt.z = this.z + this._direction.z;
            this.lookAt(this._tmpLookAt);
        },
        enumerable: true,
        configurable: true
    });
    //@override
    DirectionalLight.prototype.pUpdateSceneTransform = function () {
        _super.prototype.pUpdateSceneTransform.call(this);
        this.sceneTransform.copyColumnTo(2, this._sceneDirection);
        this._sceneDirection.normalize();
    };
    //@override
    DirectionalLight.prototype.pCreateShadowMapper = function () {
        return new DirectionalShadowMapper_1.DirectionalShadowMapper();
    };
    //override
    DirectionalLight.prototype.iGetObjectProjectionMatrix = function (entity, cameraTransform, target) {
        if (target === void 0) { target = null; }
        var raw = Matrix3DUtils_1.Matrix3DUtils.RAW_DATA_CONTAINER;
        var m = new Matrix3D_1.Matrix3D();
        m.copyFrom(entity.getRenderSceneTransform(cameraTransform));
        m.append(this.inverseSceneTransform);
        if (!this._projAABBPoints)
            this._projAABBPoints = [];
        m.transformVectors(this._pAabbPoints, this._projAABBPoints);
        var xMin = Infinity, xMax = -Infinity;
        var yMin = Infinity, yMax = -Infinity;
        var zMin = Infinity, zMax = -Infinity;
        var d;
        for (var i = 0; i < 24;) {
            d = this._projAABBPoints[i++];
            if (d < xMin)
                xMin = d;
            if (d > xMax)
                xMax = d;
            d = this._projAABBPoints[i++];
            if (d < yMin)
                yMin = d;
            if (d > yMax)
                yMax = d;
            d = this._projAABBPoints[i++];
            if (d < zMin)
                zMin = d;
            if (d > zMax)
                zMax = d;
        }
        var invXRange = 1 / (xMax - xMin);
        var invYRange = 1 / (yMax - yMin);
        var invZRange = 1 / (zMax - zMin);
        raw[0] = 2 * invXRange;
        raw[5] = 2 * invYRange;
        raw[10] = invZRange;
        raw[12] = -(xMax + xMin) * invXRange;
        raw[13] = -(yMax + yMin) * invYRange;
        raw[14] = -zMin * invZRange;
        raw[1] = raw[2] = raw[3] = raw[4] = raw[6] = raw[7] = raw[8] = raw[9] = raw[11] = 0;
        raw[15] = 1;
        if (!target)
            target = new Matrix3D_1.Matrix3D();
        target.copyRawDataFrom(raw);
        target.prepend(m);
        return target;
    };
    /**
     * //TODO
     *
     * @protected
     */
    DirectionalLight.prototype._pUpdateBoxBounds = function () {
        _super.prototype._pUpdateBoxBounds.call(this);
        //update points
        var minX = this._pBoxBounds.x;
        var minY = this._pBoxBounds.y - this._pBoxBounds.height;
        var minZ = this._pBoxBounds.z;
        var maxX = this._pBoxBounds.x + this._pBoxBounds.width;
        var maxY = this._pBoxBounds.y;
        var maxZ = this._pBoxBounds.z + this._pBoxBounds.depth;
        this._pAabbPoints[0] = minX;
        this._pAabbPoints[1] = minY;
        this._pAabbPoints[2] = minZ;
        this._pAabbPoints[3] = maxX;
        this._pAabbPoints[4] = minY;
        this._pAabbPoints[5] = minZ;
        this._pAabbPoints[6] = minX;
        this._pAabbPoints[7] = maxY;
        this._pAabbPoints[8] = minZ;
        this._pAabbPoints[9] = maxX;
        this._pAabbPoints[10] = maxY;
        this._pAabbPoints[11] = minZ;
        this._pAabbPoints[12] = minX;
        this._pAabbPoints[13] = minY;
        this._pAabbPoints[14] = maxZ;
        this._pAabbPoints[15] = maxX;
        this._pAabbPoints[16] = minY;
        this._pAabbPoints[17] = maxZ;
        this._pAabbPoints[18] = minX;
        this._pAabbPoints[19] = maxY;
        this._pAabbPoints[20] = maxZ;
        this._pAabbPoints[21] = maxX;
        this._pAabbPoints[22] = maxY;
        this._pAabbPoints[23] = maxZ;
    };
    DirectionalLight.assetType = "[light DirectionalLight]";
    return DirectionalLight;
}(LightBase_1.LightBase));
exports.DirectionalLight = DirectionalLight;
