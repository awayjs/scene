"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SamplerCube_1 = require("@awayjs/core/lib/image/SamplerCube");
var ErrorBase_1 = require("@awayjs/core/lib/errors/ErrorBase");
var LightBase_1 = require("../display/LightBase");
var BoundsType_1 = require("../bounds/BoundsType");
var LightProbe = (function (_super) {
    __extends(LightProbe, _super);
    function LightProbe(diffuseMap, specularMap) {
        if (specularMap === void 0) { specularMap = null; }
        _super.call(this);
        this.diffuseSampler = new SamplerCube_1.SamplerCube();
        this.specularSampler = new SamplerCube_1.SamplerCube();
        this._pIsEntity = true;
        this.diffuseMap = diffuseMap;
        this.specularMap = specularMap;
        //default bounds type
        this._boundsType = BoundsType_1.BoundsType.NULL;
    }
    Object.defineProperty(LightProbe.prototype, "assetType", {
        get: function () {
            return LightProbe.assetType;
        },
        enumerable: true,
        configurable: true
    });
    //@override
    LightProbe.prototype.iGetObjectProjectionMatrix = function (entity, cameraTransform, target) {
        if (target === void 0) { target = null; }
        throw new ErrorBase_1.ErrorBase("Object projection matrices are not supported for LightProbe objects!");
    };
    LightProbe.assetType = "[light LightProbe]";
    return LightProbe;
}(LightBase_1.LightBase));
exports.LightProbe = LightProbe;
