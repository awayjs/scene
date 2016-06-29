"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BlendMode_1 = require("@awayjs/core/lib/image/BlendMode");
var ImageBase_1 = require("@awayjs/core/lib/image/ImageBase");
var ColorTransform_1 = require("@awayjs/core/lib/geom/ColorTransform");
var AssetEvent_1 = require("@awayjs/core/lib/events/AssetEvent");
var AssetBase_1 = require("@awayjs/core/lib/library/AssetBase");
var SurfaceEvent_1 = require("../events/SurfaceEvent");
var Style_1 = require("../base/Style");
var StyleEvent_1 = require("../events/StyleEvent");
/**
 * MaterialBase forms an abstract base class for any material.
 * A material consists of several passes, each of which constitutes at least one render call. Several passes could
 * be used for special effects (render lighting for many lights in several passes, render an outline in a separate
 * pass) or to provide additional render-to-texture passes (rendering diffuse light to texture for texture-space
 * subsurface scattering, or rendering a depth map for specialized self-shadowing).
 *
 * Away3D provides default materials trough SinglePassMaterialBase and TriangleMaterial, which use modular
 * methods to build the shader code. MaterialBase can be extended to build specific and high-performant custom
 * shaders, or entire new material frameworks.
 */
var MaterialBase = (function (_super) {
    __extends(MaterialBase, _super);
    function MaterialBase(imageColor, alpha) {
        var _this = this;
        if (imageColor === void 0) { imageColor = null; }
        if (alpha === void 0) { alpha = 1; }
        _super.call(this);
        this._textures = new Array();
        this._pUseColorTransform = false;
        this._alphaBlending = false;
        this._alpha = 1;
        this._pAlphaThreshold = 0;
        this._pAnimateUVs = false;
        this._enableLightFallOff = true;
        this._specularLightSources = 0x01;
        this._diffuseLightSources = 0x03;
        this._style = new Style_1.Style();
        this._iBaseScreenPassIndex = 0;
        this._bothSides = false; // update
        /**
         * A list of material owners, renderables or custom Entities.
         */
        this._owners = new Array();
        this._pBlendMode = BlendMode_1.BlendMode.NORMAL;
        this._imageRect = false;
        this._curves = false;
        this._onInvalidatePropertiesDelegate = function (event) { return _this._onInvalidateProperties(event); };
        this._style.addEventListener(StyleEvent_1.StyleEvent.INVALIDATE_PROPERTIES, this._onInvalidatePropertiesDelegate);
        if (imageColor instanceof ImageBase_1.ImageBase)
            this._style.image = imageColor;
        else if (imageColor)
            this._style.color = Number(imageColor);
        this.alpha = alpha;
        this._onLightChangeDelegate = function (event) { return _this.onLightsChange(event); };
        this._onTextureInvalidateDelegate = function (event) { return _this.onTextureInvalidate(event); };
        this.alphaPremultiplied = false; //TODO: work out why this is different for WebGL
    }
    Object.defineProperty(MaterialBase.prototype, "alpha", {
        /**
         * The alpha of the surface.
         */
        get: function () {
            return this._alpha;
        },
        set: function (value) {
            if (value > 1)
                value = 1;
            else if (value < 0)
                value = 0;
            if (this._alpha == value)
                return;
            this._alpha = value;
            if (this._colorTransform == null)
                this._colorTransform = new ColorTransform_1.ColorTransform();
            this._colorTransform.alphaMultiplier = value;
            this.invalidate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterialBase.prototype, "colorTransform", {
        /**
         * The ColorTransform object to transform the colour of the material with. Defaults to null.
         */
        get: function () {
            return this._colorTransform;
        },
        set: function (value) {
            this._colorTransform = value;
            this.invalidate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterialBase.prototype, "alphaBlending", {
        /**
         * Indicates whether or not the material has transparency. If binary transparency is sufficient, for
         * example when using textures of foliage, consider using alphaThreshold instead.
         */
        get: function () {
            return this._alphaBlending;
        },
        set: function (value) {
            if (this._alphaBlending == value)
                return;
            this._alphaBlending = value;
            this.invalidate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterialBase.prototype, "animationSet", {
        /**
         *
         */
        get: function () {
            return this._animationSet;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterialBase.prototype, "lightPicker", {
        /**
         * The light picker used by the material to provide lights to the material if it supports lighting.
         *
         * @see LightPickerBase
         * @see StaticLightPicker
         */
        get: function () {
            return this._pLightPicker;
        },
        set: function (value) {
            if (this._pLightPicker == value)
                return;
            if (this._pLightPicker)
                this._pLightPicker.removeEventListener(AssetEvent_1.AssetEvent.INVALIDATE, this._onLightChangeDelegate);
            this._pLightPicker = value;
            if (this._pLightPicker)
                this._pLightPicker.addEventListener(AssetEvent_1.AssetEvent.INVALIDATE, this._onLightChangeDelegate);
            this.invalidate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterialBase.prototype, "curves", {
        /**
         * Indicates whether material should use curves. Defaults to false.
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
    Object.defineProperty(MaterialBase.prototype, "imageRect", {
        /**
         * Indicates whether or not any used textures should use an atlas. Defaults to false.
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
    Object.defineProperty(MaterialBase.prototype, "style", {
        /**
         * The style used to render the current TriangleGraphic. If set to null, its parent Sprite's style will be used instead.
         */
        get: function () {
            return this._style;
        },
        set: function (value) {
            if (this._style == value)
                return;
            if (this._style)
                this._style.removeEventListener(StyleEvent_1.StyleEvent.INVALIDATE_PROPERTIES, this._onInvalidatePropertiesDelegate);
            this._style = value;
            if (this._style)
                this._style.addEventListener(StyleEvent_1.StyleEvent.INVALIDATE_PROPERTIES, this._onInvalidatePropertiesDelegate);
            this.invalidatePasses();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterialBase.prototype, "animateUVs", {
        /**
         * Specifies whether or not the UV coordinates should be animated using a transformation matrix.
         */
        get: function () {
            return this._pAnimateUVs;
        },
        set: function (value) {
            if (this._pAnimateUVs == value)
                return;
            this._pAnimateUVs = value;
            this.invalidatePasses();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterialBase.prototype, "useColorTransform", {
        /**
         * Specifies whether or not the UV coordinates should be animated using a transformation matrix.
         */
        get: function () {
            return this._pUseColorTransform;
        },
        set: function (value) {
            if (this._pUseColorTransform == value)
                return;
            this._pUseColorTransform = value;
            this.invalidatePasses();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterialBase.prototype, "enableLightFallOff", {
        /**
         * Whether or not to use fallOff and radius properties for lights. This can be used to improve performance and
         * compatibility for constrained mode.
         */
        get: function () {
            return this._enableLightFallOff;
        },
        set: function (value) {
            if (this._enableLightFallOff == value)
                return;
            this._enableLightFallOff = value;
            this.invalidatePasses();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterialBase.prototype, "diffuseLightSources", {
        /**
         * Define which light source types to use for diffuse reflections. This allows choosing between regular lights
         * and/or light probes for diffuse reflections.
         *
         * @see away3d.materials.LightSources
         */
        get: function () {
            return this._diffuseLightSources;
        },
        set: function (value) {
            if (this._diffuseLightSources == value)
                return;
            this._diffuseLightSources = value;
            this.invalidatePasses();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterialBase.prototype, "specularLightSources", {
        /**
         * Define which light source types to use for specular reflections. This allows choosing between regular lights
         * and/or light probes for specular reflections.
         *
         * @see away3d.materials.LightSources
         */
        get: function () {
            return this._specularLightSources;
        },
        set: function (value) {
            if (this._specularLightSources == value)
                return;
            this._specularLightSources = value;
            this.invalidatePasses();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterialBase.prototype, "bothSides", {
        /**
         * Defines whether or not the material should cull triangles facing away from the camera.
         */
        get: function () {
            return this._bothSides;
        },
        set: function (value) {
            if (this._bothSides = value)
                return;
            this._bothSides = value;
            this.invalidatePasses();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterialBase.prototype, "blendMode", {
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
    Object.defineProperty(MaterialBase.prototype, "alphaPremultiplied", {
        /**
         * Indicates whether visible textures (or other pixels) used by this material have
         * already been premultiplied. Toggle this if you are seeing black halos around your
         * blended alpha edges.
         */
        get: function () {
            return this._alphaPremultiplied;
        },
        set: function (value) {
            if (this._alphaPremultiplied == value)
                return;
            this._alphaPremultiplied = value;
            this.invalidatePasses();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterialBase.prototype, "alphaThreshold", {
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
    //
    // MATERIAL MANAGEMENT
    //
    /**
     * Mark an IRenderable as owner of this material.
     * Assures we're not using the same material across renderables with different animations, since the
     * Programs depend on animation. This method needs to be called when a material is assigned.
     *
     * @param owner The IRenderable that had this material assigned
     *
     * @internal
     */
    MaterialBase.prototype.iAddOwner = function (owner) {
        this._owners.push(owner);
        var animationSet;
        var animator = owner.animator;
        if (animator)
            animationSet = animator.animationSet;
        if (owner.animator) {
            if (this._animationSet && animationSet != this._animationSet) {
                throw new Error("A Material instance cannot be shared across material owners with different animation sets");
            }
            else {
                if (this._animationSet != animationSet) {
                    this._animationSet = animationSet;
                    this.invalidateAnimation();
                }
            }
        }
        owner.invalidateSurface();
    };
    /**
     * Removes an IRenderable as owner.
     * @param owner
     *
     * @internal
     */
    MaterialBase.prototype.iRemoveOwner = function (owner) {
        this._owners.splice(this._owners.indexOf(owner), 1);
        if (this._owners.length == 0) {
            this._animationSet = null;
            this.invalidateAnimation();
        }
        owner.invalidateSurface();
    };
    Object.defineProperty(MaterialBase.prototype, "iOwners", {
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
    MaterialBase.prototype.getNumTextures = function () {
        return this._textures.length;
    };
    MaterialBase.prototype.getTextureAt = function (index) {
        return this._textures[index];
    };
    /**
     * Marks the shader programs for all passes as invalid, so they will be recompiled before the next use.
     *
     * @private
     */
    MaterialBase.prototype.invalidatePasses = function () {
        this.dispatchEvent(new SurfaceEvent_1.SurfaceEvent(SurfaceEvent_1.SurfaceEvent.INVALIDATE_PASSES, this));
    };
    MaterialBase.prototype.invalidateAnimation = function () {
        this.dispatchEvent(new SurfaceEvent_1.SurfaceEvent(SurfaceEvent_1.SurfaceEvent.INVALIDATE_ANIMATION, this));
    };
    MaterialBase.prototype.invalidateSurfaces = function () {
        var len = this._owners.length;
        for (var i = 0; i < len; i++)
            this._owners[i].invalidateSurface();
    };
    /**
     * Called when the light picker's configuration changed.
     */
    MaterialBase.prototype.onLightsChange = function (event) {
        this.invalidate();
    };
    MaterialBase.prototype.invalidateTexture = function () {
        this.dispatchEvent(new SurfaceEvent_1.SurfaceEvent(SurfaceEvent_1.SurfaceEvent.INVALIDATE_TEXTURE, this));
    };
    MaterialBase.prototype.addTextureAt = function (texture, index) {
        var i = this._textures.indexOf(texture);
        if (i == index)
            return;
        else if (i != -1)
            this._textures.splice(i, 1);
        this._textures.splice(index, 0, texture);
        texture.addEventListener(AssetEvent_1.AssetEvent.INVALIDATE, this._onTextureInvalidateDelegate);
        this.onTextureInvalidate();
    };
    MaterialBase.prototype.addTexture = function (texture) {
        if (this._textures.indexOf(texture) != -1)
            return;
        this._textures.push(texture);
        texture.addEventListener(AssetEvent_1.AssetEvent.INVALIDATE, this._onTextureInvalidateDelegate);
        this.onTextureInvalidate();
    };
    MaterialBase.prototype.removeTexture = function (texture) {
        this._textures.splice(this._textures.indexOf(texture), 1);
        texture.removeEventListener(AssetEvent_1.AssetEvent.INVALIDATE, this._onTextureInvalidateDelegate);
        this.onTextureInvalidate();
    };
    MaterialBase.prototype.onTextureInvalidate = function (event) {
        if (event === void 0) { event = null; }
        this.invalidatePasses();
        //invalidate renderables for number of images getter (in case it has changed)
        this.invalidateSurfaces();
    };
    MaterialBase.prototype._onInvalidateProperties = function (event) {
        this.invalidatePasses();
    };
    return MaterialBase;
}(AssetBase_1.AssetBase));
exports.MaterialBase = MaterialBase;
