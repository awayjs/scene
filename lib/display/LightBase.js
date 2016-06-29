"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AbstractMethodError_1 = require("@awayjs/core/lib/errors/AbstractMethodError");
var DisplayObjectContainer_1 = require("../display/DisplayObjectContainer");
var LightEvent_1 = require("../events/LightEvent");
var LightBase = (function (_super) {
    __extends(LightBase, _super);
    function LightBase() {
        _super.call(this);
        this._color = 0xffffff;
        this._colorR = 1;
        this._colorG = 1;
        this._colorB = 1;
        this._ambientColor = 0xffffff;
        this._ambient = 0;
        this._iAmbientR = 0;
        this._iAmbientG = 0;
        this._iAmbientB = 0;
        this._specular = 1;
        this._iSpecularR = 1;
        this._iSpecularG = 1;
        this._iSpecularB = 1;
        this._diffuse = 1;
        this._iDiffuseR = 1;
        this._iDiffuseG = 1;
        this._iDiffuseB = 1;
        this._shadowsEnabled = false;
    }
    Object.defineProperty(LightBase.prototype, "shadowsEnabled", {
        get: function () {
            return this._shadowsEnabled;
        },
        set: function (value) {
            if (this._shadowsEnabled == value)
                return;
            this._shadowsEnabled = value;
            if (value) {
                if (this._shadowMapper == null)
                    this._shadowMapper = this.pCreateShadowMapper();
                this._shadowMapper.light = this;
            }
            else {
                this._shadowMapper.dispose();
                this._shadowMapper = null;
            }
            //*/
            this.dispatchEvent(new LightEvent_1.LightEvent(LightEvent_1.LightEvent.CASTS_SHADOW_CHANGE));
        },
        enumerable: true,
        configurable: true
    });
    LightBase.prototype.pCreateShadowMapper = function () {
        throw new AbstractMethodError_1.AbstractMethodError();
    };
    Object.defineProperty(LightBase.prototype, "specular", {
        get: function () {
            return this._specular;
        },
        set: function (value) {
            if (value < 0)
                value = 0;
            this._specular = value;
            this.updateSpecular();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LightBase.prototype, "diffuse", {
        get: function () {
            return this._diffuse;
        },
        set: function (value) {
            if (value < 0)
                value = 0;
            this._diffuse = value;
            this.updateDiffuse();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LightBase.prototype, "color", {
        get: function () {
            return this._color;
        },
        set: function (value) {
            this._color = value;
            this._colorR = ((this._color >> 16) & 0xff) / 0xff;
            this._colorG = ((this._color >> 8) & 0xff) / 0xff;
            this._colorB = (this._color & 0xff) / 0xff;
            this.updateDiffuse();
            this.updateSpecular();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LightBase.prototype, "ambient", {
        get: function () {
            return this._ambient;
        },
        set: function (value) {
            if (value < 0)
                value = 0;
            else if (value > 1)
                value = 1;
            this._ambient = value;
            this.updateAmbient();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LightBase.prototype, "ambientColor", {
        get: function () {
            return this._ambientColor;
        },
        set: function (value) {
            this._ambientColor = value;
            this.updateAmbient();
        },
        enumerable: true,
        configurable: true
    });
    LightBase.prototype.updateAmbient = function () {
        this._iAmbientR = ((this._ambientColor >> 16) & 0xff) / 0xff * this._ambient;
        this._iAmbientG = ((this._ambientColor >> 8) & 0xff) / 0xff * this._ambient;
        this._iAmbientB = (this._ambientColor & 0xff) / 0xff * this._ambient;
    };
    LightBase.prototype.iGetObjectProjectionMatrix = function (entity, cameraTransform, target) {
        if (target === void 0) { target = null; }
        throw new AbstractMethodError_1.AbstractMethodError();
    };
    LightBase.prototype.updateSpecular = function () {
        this._iSpecularR = this._colorR * this._specular;
        this._iSpecularG = this._colorG * this._specular;
        this._iSpecularB = this._colorB * this._specular;
    };
    LightBase.prototype.updateDiffuse = function () {
        this._iDiffuseR = this._colorR * this._diffuse;
        this._iDiffuseG = this._colorG * this._diffuse;
        this._iDiffuseB = this._colorB * this._diffuse;
    };
    Object.defineProperty(LightBase.prototype, "shadowMapper", {
        get: function () {
            return this._shadowMapper;
        },
        set: function (value) {
            this._shadowMapper = value;
            this._shadowMapper.light = this;
        },
        enumerable: true,
        configurable: true
    });
    return LightBase;
}(DisplayObjectContainer_1.DisplayObjectContainer));
exports.LightBase = LightBase;
