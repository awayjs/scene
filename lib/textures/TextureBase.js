"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AssetBase_1 = require("@awayjs/core/lib/library/AssetBase");
/**
 *
 */
var TextureBase = (function (_super) {
    __extends(TextureBase, _super);
    /**
     *
     */
    function TextureBase() {
        _super.call(this);
        this._numImages = 0;
        this._images = new Array();
        this._samplers = new Array();
    }
    TextureBase.prototype.getNumImages = function () {
        return this._numImages;
    };
    TextureBase.prototype.setNumImages = function (value) {
        if (this._numImages == value)
            return;
        this._numImages = value;
        this._images.length = value;
        this._samplers.length = value;
        this.invalidate();
    };
    TextureBase.prototype.getImageAt = function (index) {
        return this._images[index];
    };
    TextureBase.prototype.setImageAt = function (image, index) {
        this._images[index] = image;
        this.invalidate();
    };
    TextureBase.prototype.getSamplerAt = function (index) {
        return this._samplers[index];
    };
    TextureBase.prototype.setSamplerAt = function (sampler, index) {
        this._samplers[index] = sampler;
        this.invalidate();
    };
    return TextureBase;
}(AssetBase_1.AssetBase));
exports.TextureBase = TextureBase;
