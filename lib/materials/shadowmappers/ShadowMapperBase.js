"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AbstractMethodError_1 = require("@awayjs/core/lib/errors/AbstractMethodError");
var AssetBase_1 = require("@awayjs/core/lib/library/AssetBase");
var ShadowMapperBase = (function (_super) {
    __extends(ShadowMapperBase, _super);
    function ShadowMapperBase() {
        _super.apply(this, arguments);
        this._pDepthMapSize = 2048;
        this._autoUpdateShadows = true;
    }
    Object.defineProperty(ShadowMapperBase.prototype, "autoUpdateShadows", {
        get: function () {
            return this._autoUpdateShadows;
        },
        set: function (value) {
            this._autoUpdateShadows = value;
        },
        enumerable: true,
        configurable: true
    });
    ShadowMapperBase.prototype.updateShadows = function () {
        this._iShadowsInvalid = true;
    };
    ShadowMapperBase.prototype.iSetDepthMap = function (depthMap) {
        if (this._depthMap && !this._explicitDepthMap)
            this._depthMap.dispose();
        this._depthMap = depthMap;
    };
    Object.defineProperty(ShadowMapperBase.prototype, "light", {
        get: function () {
            return this._pLight;
        },
        set: function (value) {
            this._pLight = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShadowMapperBase.prototype, "depthMap", {
        get: function () {
            if (!this._depthMap)
                this._depthMap = this.pCreateDepthTexture();
            return this._depthMap;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShadowMapperBase.prototype, "depthMapSize", {
        get: function () {
            return this._pDepthMapSize;
        },
        set: function (value) {
            if (value == this._pDepthMapSize)
                return;
            this._pSetDepthMapSize(value);
        },
        enumerable: true,
        configurable: true
    });
    ShadowMapperBase.prototype.dispose = function () {
        if (this._depthMap && !this._explicitDepthMap)
            this._depthMap.dispose();
        this._depthMap = null;
    };
    ShadowMapperBase.prototype.pCreateDepthTexture = function () {
        throw new AbstractMethodError_1.AbstractMethodError();
    };
    ShadowMapperBase.prototype.iRenderDepthMap = function (camera, scene, renderer) {
        this._iShadowsInvalid = false;
        this.pUpdateDepthProjection(camera);
        if (!this._depthMap)
            this._depthMap = this.pCreateDepthTexture();
        this.pDrawDepthMap(scene, this._depthMap, renderer);
    };
    ShadowMapperBase.prototype.pUpdateDepthProjection = function (camera) {
        throw new AbstractMethodError_1.AbstractMethodError();
    };
    ShadowMapperBase.prototype.pDrawDepthMap = function (scene, target, renderer) {
        throw new AbstractMethodError_1.AbstractMethodError();
    };
    ShadowMapperBase.prototype._pSetDepthMapSize = function (value) {
        this._pDepthMapSize = value;
        if (this._explicitDepthMap) {
            throw Error("Cannot set depth map size for the current renderer.");
        }
        else if (this._depthMap) {
            this._depthMap.dispose();
            this._depthMap = null;
        }
    };
    return ShadowMapperBase;
}(AssetBase_1.AssetBase));
exports.ShadowMapperBase = ShadowMapperBase;
