"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Matrix3D_1 = require("@awayjs/core/lib/geom/Matrix3D");
var Matrix3DUtils_1 = require("@awayjs/core/lib/geom/Matrix3DUtils");
var Vector3D_1 = require("@awayjs/core/lib/geom/Vector3D");
var LightBase_1 = require("../display/LightBase");
var BoundsType_1 = require("../bounds/BoundsType");
var CubeMapShadowMapper_1 = require("../materials/shadowmappers/CubeMapShadowMapper");
var PointLight = (function (_super) {
    __extends(PointLight, _super);
    function PointLight() {
        _super.call(this);
        this._pRadius = 90000;
        this._pFallOff = 100000;
        this._pIsEntity = true;
        this._pFallOffFactor = 1 / (this._pFallOff * this._pFallOff - this._pRadius * this._pRadius);
        //default bounds type
        this._boundsType = BoundsType_1.BoundsType.SPHERE;
    }
    Object.defineProperty(PointLight.prototype, "assetType", {
        get: function () {
            return PointLight.assetType;
        },
        enumerable: true,
        configurable: true
    });
    PointLight.prototype.pCreateShadowMapper = function () {
        return new CubeMapShadowMapper_1.CubeMapShadowMapper();
    };
    Object.defineProperty(PointLight.prototype, "radius", {
        get: function () {
            return this._pRadius;
        },
        set: function (value) {
            this._pRadius = value;
            if (this._pRadius < 0) {
                this._pRadius = 0;
            }
            else if (this._pRadius > this._pFallOff) {
                this._pFallOff = this._pRadius;
                this._pInvalidateBounds();
            }
            this._pFallOffFactor = 1 / (this._pFallOff * this._pFallOff - this._pRadius * this._pRadius);
        },
        enumerable: true,
        configurable: true
    });
    PointLight.prototype.iFallOffFactor = function () {
        return this._pFallOffFactor;
    };
    Object.defineProperty(PointLight.prototype, "fallOff", {
        get: function () {
            return this._pFallOff;
        },
        set: function (value) {
            this._pFallOff = value;
            if (this._pFallOff < 0)
                this._pFallOff = 0;
            if (this._pFallOff < this._pRadius)
                this._pRadius = this._pFallOff;
            this._pFallOffFactor = 1 / (this._pFallOff * this._pFallOff - this._pRadius * this._pRadius);
            this._pInvalidateBounds();
        },
        enumerable: true,
        configurable: true
    });
    PointLight.prototype._pUpdateSphereBounds = function () {
        _super.prototype._pUpdateSphereBounds.call(this);
        this._pSphereBounds.radius = this._pFallOff;
    };
    PointLight.prototype.iGetObjectProjectionMatrix = function (entity, cameraTransform, target) {
        if (target === void 0) { target = null; }
        var raw = Matrix3DUtils_1.Matrix3DUtils.RAW_DATA_CONTAINER;
        var m = new Matrix3D_1.Matrix3D();
        // todo: do not use lookAt on Light
        m.copyFrom(entity.getRenderSceneTransform(cameraTransform));
        m.append(this._pParent.inverseSceneTransform);
        this.lookAt(m.position);
        m.copyFrom(entity.getRenderSceneTransform(cameraTransform));
        m.append(this.inverseSceneTransform);
        var box = entity.getBox();
        var v1 = m.deltaTransformVector(new Vector3D_1.Vector3D(box.left, box.bottom, box.front));
        var v2 = m.deltaTransformVector(new Vector3D_1.Vector3D(box.right, box.top, box.back));
        var d1 = v1.x * v1.x + v1.y * v1.y + v1.z * v1.z;
        var d2 = v2.x * v2.x + v2.y * v2.y + v2.z * v2.z;
        var d = Math.sqrt(d1 > d2 ? d1 : d2);
        var zMin;
        var zMax;
        var z = m.rawData[14];
        zMin = z - d;
        zMax = z + d;
        raw[5] = raw[0] = zMin / d;
        raw[10] = zMax / (zMax - zMin);
        raw[11] = 1;
        raw[1] = raw[2] = raw[3] = raw[4] = raw[6] = raw[7] = raw[8] = raw[9] = raw[12] = raw[13] = raw[15] = 0;
        raw[14] = -zMin * raw[10];
        if (!target)
            target = new Matrix3D_1.Matrix3D();
        target.copyRawDataFrom(raw);
        target.prepend(m);
        return target;
    };
    PointLight.assetType = "[light PointLight]";
    return PointLight;
}(LightBase_1.LightBase));
exports.PointLight = PointLight;
