"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Image2D_1 = require("@awayjs/core/lib/image/Image2D");
var Matrix3D_1 = require("@awayjs/core/lib/geom/Matrix3D");
var Matrix3DUtils_1 = require("@awayjs/core/lib/geom/Matrix3DUtils");
var FreeMatrixProjection_1 = require("@awayjs/core/lib/projections/FreeMatrixProjection");
var Camera_1 = require("../../display/Camera");
var ShadowMapperBase_1 = require("../../materials/shadowmappers/ShadowMapperBase");
var Single2DTexture_1 = require("../../textures/Single2DTexture");
var DirectionalShadowMapper = (function (_super) {
    __extends(DirectionalShadowMapper, _super);
    function DirectionalShadowMapper() {
        _super.call(this);
        this._pLightOffset = 10000;
        this._pSnap = 64;
        this._pCullPlanes = [];
        this._pOverallDepthProjection = new FreeMatrixProjection_1.FreeMatrixProjection();
        this._pOverallDepthCamera = new Camera_1.Camera(this._pOverallDepthProjection);
        this._pLocalFrustum = [];
        this._pMatrix = new Matrix3D_1.Matrix3D();
    }
    Object.defineProperty(DirectionalShadowMapper.prototype, "snap", {
        get: function () {
            return this._pSnap;
        },
        set: function (value) {
            this._pSnap = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DirectionalShadowMapper.prototype, "lightOffset", {
        get: function () {
            return this._pLightOffset;
        },
        set: function (value) {
            this._pLightOffset = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DirectionalShadowMapper.prototype, "iDepthProjection", {
        //@arcane
        get: function () {
            return this._pOverallDepthCamera.viewProjection;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DirectionalShadowMapper.prototype, "depth", {
        //@arcane
        get: function () {
            return this._pMaxZ - this._pMinZ;
        },
        enumerable: true,
        configurable: true
    });
    DirectionalShadowMapper.prototype.iSetDepthMap = function (depthMap) {
        if (this._depthMap == depthMap)
            return;
        _super.prototype.iSetDepthMap.call(this, depthMap);
        if (this._depthMap) {
            this._explicitDepthMap = true;
            this._pDepthMapSize = depthMap.image2D.rect.width;
        }
        else {
            this._explicitDepthMap = false;
        }
    };
    DirectionalShadowMapper.prototype.pCreateDepthTexture = function () {
        return new Single2DTexture_1.Single2DTexture(new Image2D_1.Image2D(this._pDepthMapSize, this._pDepthMapSize));
    };
    //@override
    DirectionalShadowMapper.prototype.pDrawDepthMap = function (scene, target, renderer) {
        renderer.cullPlanes = this._pCullPlanes;
        renderer._iRender(this._pOverallDepthCamera, scene, target.image2D);
    };
    //@protected
    DirectionalShadowMapper.prototype.pUpdateCullPlanes = function (camera) {
        var lightFrustumPlanes = this._pOverallDepthCamera.frustumPlanes;
        var viewFrustumPlanes = camera.frustumPlanes;
        this._pCullPlanes.length = 4;
        this._pCullPlanes[0] = lightFrustumPlanes[0];
        this._pCullPlanes[1] = lightFrustumPlanes[1];
        this._pCullPlanes[2] = lightFrustumPlanes[2];
        this._pCullPlanes[3] = lightFrustumPlanes[3];
        var light = this._pLight;
        var dir = light.sceneDirection;
        var dirX = dir.x;
        var dirY = dir.y;
        var dirZ = dir.z;
        var j = 4;
        for (var i = 0; i < 6; ++i) {
            var plane = viewFrustumPlanes[i];
            if (plane.a * dirX + plane.b * dirY + plane.c * dirZ < 0)
                this._pCullPlanes[j++] = plane;
        }
    };
    //@override
    DirectionalShadowMapper.prototype.pUpdateDepthProjection = function (camera) {
        this.pUpdateProjectionFromFrustumCorners(camera, camera.projection.frustumCorners, this._pMatrix);
        this._pOverallDepthProjection.matrix = this._pMatrix;
        this.pUpdateCullPlanes(camera);
    };
    DirectionalShadowMapper.prototype.pUpdateProjectionFromFrustumCorners = function (camera, corners, matrix) {
        var raw = Matrix3DUtils_1.Matrix3DUtils.RAW_DATA_CONTAINER;
        var dir;
        var x, y, z;
        var minX, minY;
        var maxX, maxY;
        var i;
        var light = this._pLight;
        dir = light.sceneDirection;
        this._pOverallDepthCamera.transform.matrix3D = this._pLight.sceneTransform;
        x = Math.floor((camera.x - dir.x * this._pLightOffset) / this._pSnap) * this._pSnap;
        y = Math.floor((camera.y - dir.y * this._pLightOffset) / this._pSnap) * this._pSnap;
        z = Math.floor((camera.z - dir.z * this._pLightOffset) / this._pSnap) * this._pSnap;
        this._pOverallDepthCamera.x = x;
        this._pOverallDepthCamera.y = y;
        this._pOverallDepthCamera.z = z;
        this._pMatrix.copyFrom(this._pOverallDepthCamera.inverseSceneTransform);
        this._pMatrix.prepend(camera.sceneTransform);
        this._pMatrix.transformVectors(corners, this._pLocalFrustum);
        minX = maxX = this._pLocalFrustum[0];
        minY = maxY = this._pLocalFrustum[1];
        this._pMaxZ = this._pLocalFrustum[2];
        i = 3;
        while (i < 24) {
            x = this._pLocalFrustum[i];
            y = this._pLocalFrustum[i + 1];
            z = this._pLocalFrustum[i + 2];
            if (x < minX)
                minX = x;
            if (x > maxX)
                maxX = x;
            if (y < minY)
                minY = y;
            if (y > maxY)
                maxY = y;
            if (z > this._pMaxZ)
                this._pMaxZ = z;
            i += 3;
        }
        this._pMinZ = 1;
        var w = maxX - minX;
        var h = maxY - minY;
        var d = 1 / (this._pMaxZ - this._pMinZ);
        if (minX < 0)
            minX -= this._pSnap; // because int() rounds up for < 0
        if (minY < 0)
            minY -= this._pSnap;
        minX = Math.floor(minX / this._pSnap) * this._pSnap;
        minY = Math.floor(minY / this._pSnap) * this._pSnap;
        var snap2 = 2 * this._pSnap;
        w = Math.floor(w / snap2 + 2) * snap2;
        h = Math.floor(h / snap2 + 2) * snap2;
        maxX = minX + w;
        maxY = minY + h;
        w = 1 / w;
        h = 1 / h;
        raw[0] = 2 * w;
        raw[5] = 2 * h;
        raw[10] = d;
        raw[12] = -(maxX + minX) * w;
        raw[13] = -(maxY + minY) * h;
        raw[14] = -this._pMinZ * d;
        raw[15] = 1;
        raw[1] = raw[2] = raw[3] = raw[4] = raw[6] = raw[7] = raw[8] = raw[9] = raw[11] = 0;
        matrix.copyRawDataFrom(raw);
    };
    return DirectionalShadowMapper;
}(ShadowMapperBase_1.ShadowMapperBase));
exports.DirectionalShadowMapper = DirectionalShadowMapper;
