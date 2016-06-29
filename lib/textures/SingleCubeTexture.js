"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TextureBase_1 = require("../textures/TextureBase");
var SingleCubeTexture = (function (_super) {
    __extends(SingleCubeTexture, _super);
    function SingleCubeTexture(imageCube) {
        if (imageCube === void 0) { imageCube = null; }
        _super.call(this);
        this.setNumImages(1);
        this.imageCube = imageCube;
    }
    Object.defineProperty(SingleCubeTexture.prototype, "assetType", {
        /**
         *
         * @returns {string}
         */
        get: function () {
            return SingleCubeTexture.assetType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SingleCubeTexture.prototype, "samplerCube", {
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
    Object.defineProperty(SingleCubeTexture.prototype, "imageCube", {
        /**
         *
         * @returns {ImageCube}
         */
        get: function () {
            return this._images[0];
        },
        set: function (value) {
            if (this._images[0] == value)
                return;
            this.setImageAt(value, 0);
        },
        enumerable: true,
        configurable: true
    });
    SingleCubeTexture.assetType = "[texture SingleCubeTexture]";
    return SingleCubeTexture;
}(TextureBase_1.TextureBase));
exports.SingleCubeTexture = SingleCubeTexture;
