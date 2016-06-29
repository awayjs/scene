"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ErrorBase_1 = require("@awayjs/core/lib/errors/ErrorBase");
var ImageUtils_1 = require("@awayjs/core/lib/utils/ImageUtils");
var MappingMode_1 = require("../textures/MappingMode");
var TextureBase_1 = require("../textures/TextureBase");
var Single2DTexture = (function (_super) {
    __extends(Single2DTexture, _super);
    function Single2DTexture(image2D) {
        if (image2D === void 0) { image2D = null; }
        _super.call(this);
        this.setNumImages(1);
        this.image2D = image2D;
        this._mappingMode = MappingMode_1.MappingMode.NORMAL;
    }
    Object.defineProperty(Single2DTexture.prototype, "assetType", {
        /**
         *
         * @returns {string}
         */
        get: function () {
            return Single2DTexture.assetType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Single2DTexture.prototype, "mappingMode", {
        get: function () {
            return this._mappingMode;
        },
        set: function (value) {
            if (this._mappingMode == value)
                return;
            this._mappingMode = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Single2DTexture.prototype, "sampler2D", {
        /**
         *
         * @returns {Image2D}
         */
        get: function () {
            return this._samplers[0];
        },
        set: function (value) {
            if (this._samplers[0] == value)
                return;
            this.setSamplerAt(value, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Single2DTexture.prototype, "image2D", {
        /**
         *
         * @returns {Image2D}
         */
        get: function () {
            return this._images[0];
        },
        set: function (value) {
            if (this._images[0] == value)
                return;
            if (!ImageUtils_1.ImageUtils.isImage2DValid(value))
                throw new ErrorBase_1.ErrorBase("Invalid image2DData: Width and height must be power of 2 and cannot exceed 2048");
            this.setImageAt(value, 0);
        },
        enumerable: true,
        configurable: true
    });
    Single2DTexture.assetType = "[texture Single2DTexture]";
    return Single2DTexture;
}(TextureBase_1.TextureBase));
exports.Single2DTexture = Single2DTexture;
