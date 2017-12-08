"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core_1 = require("@awayjs/core");
var graphics_1 = require("@awayjs/graphics");
var BoundsType_1 = require("../bounds/BoundsType");
var DisplayObject_1 = require("./DisplayObject");
/**
 * A Skybox class is used to render a sky in the scene. It's always considered static and 'at infinity', and as
 * such it's always centered at the camera's position and sized to exactly fit within the camera's frustum, ensuring
 * the sky box is always as large as possible without being clipped.
 */
var Skybox = (function (_super) {
    __extends(Skybox, _super);
    /**
     * Create a new Skybox object.
     *
     * @param material	The material with which to render the Skybox.
     */
    function Skybox(image) {
        if (image === void 0) { image = null; }
        var _this = _super.call(this) || this;
        _this._textures = new Array();
        _this._pAlphaThreshold = 0;
        _this._pBlendMode = graphics_1.BlendMode.NORMAL;
        _this._curves = false;
        _this._imageRect = false;
        _this._onTextureInvalidateDelegate = function (event) { return _this.onTextureInvalidate(event); };
        _this._pIsEntity = true;
        _this._owners = new Array(_this);
        _this.style = new graphics_1.Style();
        _this.style.image = image;
        _this.texture = new graphics_1.SingleCubeTexture();
        //default bounds type
        _this._boundsType = BoundsType_1.BoundsType.NULL;
        return _this;
    }
    Object.defineProperty(Skybox.prototype, "bothSides", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Skybox.prototype, "traverseName", {
        get: function () {
            return Skybox.traverseName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Skybox.prototype, "alphaThreshold", {
        /**
         * The minimum alpha value for which pixels should be drawn. This is used for transparency that is either
         * invisible or entirely opaque, often used with textures for foliage, etc.
         * Recommended values are 0 to disable alpha, or 0.5 to create smooth edges. Default value is 0 (disabled).
         */
        get: function () {
            return this._pAlphaThreshold;
        },
        set: function (value) {
            if (value < 0)
                value = 0;
            else if (value > 1)
                value = 1;
            if (this._pAlphaThreshold == value)
                return;
            this._pAlphaThreshold = value;
            this.invalidatePasses();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Skybox.prototype, "curves", {
        /**
         * Indicates whether skybox should use curves. Defaults to false.
         */
        get: function () {
            return this._curves;
        },
        set: function (value) {
            if (this._curves == value)
                return;
            this._curves = value;
            this.invalidatePasses();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Skybox.prototype, "imageRect", {
        /**
         * Indicates whether or not the Skybox texture should use imageRects. Defaults to false.
         */
        get: function () {
            return this._imageRect;
        },
        set: function (value) {
            if (this._imageRect == value)
                return;
            this._imageRect = value;
            this.invalidatePasses();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Skybox.prototype, "lightPicker", {
        /**
         * The light picker used by the material to provide lights to the material if it supports lighting.
         *
         * @see LightPickerBase
         * @see StaticLightPicker
         */
        get: function () {
            return this._pLightPicker;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Skybox.prototype, "animationSet", {
        /**
         *
         */
        get: function () {
            return this._animationSet;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Skybox.prototype, "blendMode", {
        /**
         * The blend mode to use when drawing this renderable. The following blend modes are supported:
         * <ul>
         * <li>BlendMode.NORMAL: No blending, unless the material inherently needs it</li>
         * <li>BlendMode.LAYER: Force blending. This will draw the object the same as NORMAL, but without writing depth writes.</li>
         * <li>BlendMode.MULTIPLY</li>
         * <li>BlendMode.ADD</li>
         * <li>BlendMode.ALPHA</li>
         * </ul>
         */
        get: function () {
            return this._pBlendMode;
        },
        set: function (value) {
            if (this._pBlendMode == value)
                return;
            this._pBlendMode = value;
            this.invalidate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Skybox.prototype, "iOwners", {
        /**
         * A list of the IRenderables that use this material
         *
         * @private
         */
        get: function () {
            return this._owners;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Skybox.prototype, "texture", {
        /**
        * The cube texture to use as the skybox.
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
            this.invalidatePasses();
        },
        enumerable: true,
        configurable: true
    });
    Skybox.prototype.getNumTextures = function () {
        return this._textures.length;
    };
    Skybox.prototype.getTextureAt = function (index) {
        return this._textures[index];
    };
    Object.defineProperty(Skybox.prototype, "assetType", {
        get: function () {
            return Skybox.assetType;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Marks the shader programs for all passes as invalid, so they will be recompiled before the next use.
     *
     * @private
     */
    Skybox.prototype.invalidatePasses = function () {
        this.dispatchEvent(new graphics_1.MaterialEvent(graphics_1.MaterialEvent.INVALIDATE_PASSES, this));
    };
    Skybox.prototype.invalidateElements = function () {
        this.dispatchEvent(new graphics_1.RenderableEvent(graphics_1.RenderableEvent.INVALIDATE_ELEMENTS, this));
    };
    Skybox.prototype.invalidateMaterial = function () {
        this.dispatchEvent(new graphics_1.RenderableEvent(graphics_1.RenderableEvent.INVALIDATE_MATERIAL, this));
    };
    Skybox.prototype.addTexture = function (texture) {
        this._textures.push(texture);
        texture.addEventListener(core_1.AssetEvent.INVALIDATE, this._onTextureInvalidateDelegate);
        this.onTextureInvalidate();
    };
    Skybox.prototype.removeTexture = function (texture) {
        this._textures.splice(this._textures.indexOf(texture), 1);
        texture.removeEventListener(core_1.AssetEvent.INVALIDATE, this._onTextureInvalidateDelegate);
        this.onTextureInvalidate();
    };
    Skybox.prototype.onTextureInvalidate = function (event) {
        if (event === void 0) { event = null; }
        this.invalidate();
    };
    Skybox.prototype._onInvalidateProperties = function (event) {
        this.invalidateMaterial();
        this.invalidatePasses();
    };
    Skybox.prototype._acceptTraverser = function (traverser) {
        traverser.applyRenderable(this);
    };
    Skybox.prototype.iAddOwner = function (owner) {
    };
    /**
     * Removes an IEntity as owner.
     * @param owner
     *
     * @internal
     */
    Skybox.prototype.iRemoveOwner = function (owner) {
    };
    return Skybox;
}(DisplayObject_1.DisplayObject));
Skybox.traverseName = graphics_1.TraverserBase.addEntityName("applySkybox");
Skybox.assetType = "[asset Skybox]";
exports.Skybox = Skybox;
