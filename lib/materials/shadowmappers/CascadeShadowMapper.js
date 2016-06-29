"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Matrix3DUtils_1 = require("@awayjs/core/lib/geom/Matrix3DUtils");
var Rectangle_1 = require("@awayjs/core/lib/geom/Rectangle");
var AssetEvent_1 = require("@awayjs/core/lib/events/AssetEvent");
var FreeMatrixProjection_1 = require("@awayjs/core/lib/projections/FreeMatrixProjection");
var Camera_1 = require("../../display/Camera");
var DirectionalShadowMapper_1 = require("../../materials/shadowmappers/DirectionalShadowMapper");
var CascadeShadowMapper = (function (_super) {
    __extends(CascadeShadowMapper, _super);
    function CascadeShadowMapper(numCascades) {
        if (numCascades === void 0) { numCascades = 3; }
        _super.call(this);
        this._pScissorRectsInvalid = true;
        if (numCascades < 1 || numCascades > 4)
            throw new Error("numCascades must be an integer between 1 and 4");
        this._numCascades = numCascades;
        this.init();
    }
    CascadeShadowMapper.prototype.getSplitRatio = function (index /*uint*/) {
        return this._splitRatios[index];
    };
    CascadeShadowMapper.prototype.setSplitRatio = function (index /*uint*/, value) {
        if (value < 0)
            value = 0;
        else if (value > 1)
            value = 1;
        if (index >= this._numCascades)
            throw new Error("index must be smaller than the number of cascades!");
        this._splitRatios[index] = value;
    };
    CascadeShadowMapper.prototype.getDepthProjections = function (partition /*uint*/) {
        return this._depthCameras[partition].viewProjection;
    };
    CascadeShadowMapper.prototype.init = function () {
        this._splitRatios = new Array(this._numCascades);
        this._nearPlaneDistances = new Array(this._numCascades);
        var s = 1;
        for (var i = this._numCascades - 1; i >= 0; --i) {
            this._splitRatios[i] = s;
            s *= .4;
        }
        this._texOffsetsX = Array(-1, 1, -1, 1);
        this._texOffsetsY = Array(1, 1, -1, -1);
        this._pScissorRects = new Array(4);
        this._depthLenses = new Array();
        this._depthCameras = new Array();
        for (i = 0; i < this._numCascades; ++i) {
            this._depthLenses[i] = new FreeMatrixProjection_1.FreeMatrixProjection();
            this._depthCameras[i] = new Camera_1.Camera(this._depthLenses[i]);
        }
    };
    CascadeShadowMapper.prototype._pSetDepthMapSize = function (value /*uint*/) {
        _super.prototype._pSetDepthMapSize.call(this, value);
        this.invalidateScissorRects();
    };
    CascadeShadowMapper.prototype.invalidateScissorRects = function () {
        this._pScissorRectsInvalid = true;
    };
    Object.defineProperty(CascadeShadowMapper.prototype, "numCascades", {
        get: function () {
            return this._numCascades;
        },
        set: function (value /*int*/) {
            if (value == this._numCascades)
                return;
            if (value < 1 || value > 4)
                throw new Error("numCascades must be an integer between 1 and 4");
            this._numCascades = value;
            this.invalidateScissorRects();
            this.init();
            this.dispatchEvent(new AssetEvent_1.AssetEvent(AssetEvent_1.AssetEvent.INVALIDATE, this));
        },
        enumerable: true,
        configurable: true
    });
    CascadeShadowMapper.prototype.pDrawDepthMap = function (scene, target, renderer) {
        if (this._pScissorRectsInvalid)
            this.updateScissorRects();
        renderer.cullPlanes = this._pCullPlanes;
        renderer._iRenderCascades(this._pOverallDepthCamera, scene, target.image2D, this._numCascades, this._pScissorRects, this._depthCameras);
    };
    CascadeShadowMapper.prototype.updateScissorRects = function () {
        var half = this._pDepthMapSize * .5;
        this._pScissorRects[0] = new Rectangle_1.Rectangle(0, 0, half, half);
        this._pScissorRects[1] = new Rectangle_1.Rectangle(half, 0, half, half);
        this._pScissorRects[2] = new Rectangle_1.Rectangle(0, half, half, half);
        this._pScissorRects[3] = new Rectangle_1.Rectangle(half, half, half, half);
        this._pScissorRectsInvalid = false;
    };
    CascadeShadowMapper.prototype.pUpdateDepthProjection = function (camera) {
        var matrix;
        var projection = camera.projection;
        var projectionNear = projection.near;
        var projectionRange = projection.far - projectionNear;
        this.pUpdateProjectionFromFrustumCorners(camera, camera.projection.frustumCorners, this._pMatrix);
        this._pMatrix.appendScale(.96, .96, 1);
        this._pOverallDepthProjection.matrix = this._pMatrix;
        this.pUpdateCullPlanes(camera);
        for (var i = 0; i < this._numCascades; ++i) {
            matrix = this._depthLenses[i].matrix;
            this._nearPlaneDistances[i] = projectionNear + this._splitRatios[i] * projectionRange;
            this._depthCameras[i].transform.matrix3D = this._pOverallDepthCamera.transform.matrix3D;
            this.updateProjectionPartition(matrix, this._splitRatios[i], this._texOffsetsX[i], this._texOffsetsY[i]);
            this._depthLenses[i].matrix = matrix;
        }
    };
    CascadeShadowMapper.prototype.updateProjectionPartition = function (matrix, splitRatio, texOffsetX, texOffsetY) {
        var raw = Matrix3DUtils_1.Matrix3DUtils.RAW_DATA_CONTAINER;
        var xN, yN, zN;
        var xF, yF, zF;
        var minX = Number.POSITIVE_INFINITY, minY = Number.POSITIVE_INFINITY, minZ;
        var maxX = Number.NEGATIVE_INFINITY, maxY = Number.NEGATIVE_INFINITY, maxZ = Number.NEGATIVE_INFINITY;
        var i = 0;
        while (i < 12) {
            xN = this._pLocalFrustum[i];
            yN = this._pLocalFrustum[i + 1];
            zN = this._pLocalFrustum[i + 2];
            xF = xN + (this._pLocalFrustum[i + 12] - xN) * splitRatio;
            yF = yN + (this._pLocalFrustum[i + 13] - yN) * splitRatio;
            zF = zN + (this._pLocalFrustum[i + 14] - zN) * splitRatio;
            if (xN < minX)
                minX = xN;
            if (xN > maxX)
                maxX = xN;
            if (yN < minY)
                minY = yN;
            if (yN > maxY)
                maxY = yN;
            if (zN > maxZ)
                maxZ = zN;
            if (xF < minX)
                minX = xF;
            if (xF > maxX)
                maxX = xF;
            if (yF < minY)
                minY = yF;
            if (yF > maxY)
                maxY = yF;
            if (zF > maxZ)
                maxZ = zF;
            i += 3;
        }
        minZ = 1;
        var w = (maxX - minX);
        var h = (maxY - minY);
        var d = 1 / (maxZ - minZ);
        if (minX < 0)
            minX -= this._pSnap; // because int() rounds up for < 0
        if (minY < 0)
            minY -= this._pSnap;
        minX = Math.floor(minX / this._pSnap) * this._pSnap;
        minY = Math.floor(minY / this._pSnap) * this._pSnap;
        var snap2 = 2 * this._pSnap;
        w = Math.floor(w / snap2 + 1) * snap2;
        h = Math.floor(h / snap2 + 1) * snap2;
        maxX = minX + w;
        maxY = minY + h;
        w = 1 / w;
        h = 1 / h;
        raw[0] = 2 * w;
        raw[5] = 2 * h;
        raw[10] = d;
        raw[12] = -(maxX + minX) * w;
        raw[13] = -(maxY + minY) * h;
        raw[14] = -minZ * d;
        raw[15] = 1;
        raw[1] = raw[2] = raw[3] = raw[4] = raw[6] = raw[7] = raw[8] = raw[9] = raw[11] = 0;
        matrix.copyRawDataFrom(raw);
        matrix.appendScale(.96, .96, 1);
        matrix.appendTranslation(texOffsetX, texOffsetY, 0);
        matrix.appendScale(.5, .5, 1);
    };
    Object.defineProperty(CascadeShadowMapper.prototype, "_iNearPlaneDistances", {
        get: function () {
            return this._nearPlaneDistances;
        },
        enumerable: true,
        configurable: true
    });
    return CascadeShadowMapper;
}(DirectionalShadowMapper_1.DirectionalShadowMapper));
exports.CascadeShadowMapper = CascadeShadowMapper;
