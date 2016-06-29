"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Image2D_1 = require("@awayjs/core/lib/image/Image2D");
var MaterialBase_1 = require("../materials/MaterialBase");
var Single2DTexture_1 = require("../textures/Single2DTexture");
/**
 * BasicMaterial forms an abstract base class for the default shaded materials provided by Stage,
 * using material methods to define their appearance.
 */
var BasicMaterial = (function (_super) {
    __extends(BasicMaterial, _super);
    function BasicMaterial(imageColor, alpha) {
        if (imageColor === void 0) { imageColor = null; }
        if (alpha === void 0) { alpha = 1; }
        _super.call(this, imageColor, alpha);
        this._preserveAlpha = false;
        //set a texture if an image is present
        if (imageColor instanceof Image2D_1.Image2D)
            this.texture = new Single2DTexture_1.Single2DTexture();
    }
    Object.defineProperty(BasicMaterial.prototype, "assetType", {
        /**
         *
         */
        get: function () {
            return BasicMaterial.assetType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BasicMaterial.prototype, "preserveAlpha", {
        /**
         * Indicates whether alpha should be preserved - defaults to false
         */
        get: function () {
            return this._preserveAlpha;
        },
        set: function (value) {
            if (this._preserveAlpha == value)
                return;
            this._preserveAlpha = value;
            this.invalidate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BasicMaterial.prototype, "texture", {
        /**
         * The texture object to use for the albedo colour.
         */
        get: function () {
            return this._texture;
        },
        set: function (value) {
            if (this._texture == value)
                return;
            if (this._texture)
                this.removeTexture(this._texture);
            this._texture = value;
            if (this._texture)
                this.addTexture(this._texture);
            this.invalidateTexture();
        },
        enumerable: true,
        configurable: true
    });
    BasicMaterial.assetType = "[materials BasicMaterial]";
    return BasicMaterial;
}(MaterialBase_1.MaterialBase));
exports.BasicMaterial = BasicMaterial;
