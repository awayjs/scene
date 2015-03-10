var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BlendMode = require("awayjs-core/lib/base/BlendMode");
var ColorTransform = require("awayjs-core/lib/geom/ColorTransform");
var AbstractMethodError = require("awayjs-core/lib/errors/AbstractMethodError");
var Event = require("awayjs-core/lib/events/Event");
var AssetType = require("awayjs-core/lib/library/AssetType");
var NamedAssetBase = require("awayjs-core/lib/library/NamedAssetBase");
var MaterialEvent = require("awayjs-display/lib/events/MaterialEvent");
var RenderableOwnerEvent = require("awayjs-display/lib/events/RenderableOwnerEvent");
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
    /**
     * Creates a new MaterialBase object.
     */
    function MaterialBase() {
        var _this = this;
        _super.call(this);
        this._alphaBlending = false;
        this._alpha = 1;
        this._renderObjects = new Array();
        this._pAlphaThreshold = 0;
        this._pAnimateUVs = false;
        this._enableLightFallOff = true;
        this._specularLightSources = 0x01;
        this._diffuseLightSources = 0x03;
        /**
         * An id for this material used to sort the renderables by shader program, which reduces Program state changes.
         *
         * @private
         */
        this._iMaterialId = 0;
        this._iBaseScreenPassIndex = 0;
        this._bothSides = false; // update
        this._pBlendMode = BlendMode.NORMAL;
        this._mipmap = true;
        this._smooth = true;
        this._repeat = false;
        this._color = 0xFFFFFF;
        this._pHeight = 1;
        this._pWidth = 1;
        this._iMaterialId = Number(this.id);
        this._owners = new Array();
        this._onLightChangeDelegate = function (event) { return _this.onLightsChange(event); };
        this.alphaPremultiplied = false; //TODO: work out why this is different for WebGL
    }
    Object.defineProperty(MaterialBase.prototype, "assetType", {
        /**
         *
         */
        get: function () {
            return AssetType.MATERIAL;
            ;
        },
        enumerable: true,
        configurable: true
    });
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
                this._colorTransform = new ColorTransform();
            this._colorTransform.alphaMultiplier = value;
            this._pInvalidateRenderObject();
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
            this._pInvalidateRenderObject();
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
            this._pInvalidateRenderObject();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterialBase.prototype, "height", {
        /**
         *
         */
        get: function () {
            return this._pHeight;
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
                this._pLightPicker.removeEventListener(Event.CHANGE, this._onLightChangeDelegate);
            this._pLightPicker = value;
            if (this._pLightPicker)
                this._pLightPicker.addEventListener(Event.CHANGE, this._onLightChangeDelegate);
            this._pInvalidateRenderObject();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterialBase.prototype, "mipmap", {
        /**
         * Indicates whether or not any used textures should use mipmapping. Defaults to true.
         */
        get: function () {
            return this._mipmap;
        },
        set: function (value) {
            if (this._mipmap == value)
                return;
            this._mipmap = value;
            this._pInvalidatePasses();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterialBase.prototype, "smooth", {
        /**
         * Indicates whether or not any used textures should use smoothing. Defaults to true.
         */
        get: function () {
            return this._smooth;
        },
        set: function (value) {
            if (this._smooth == value)
                return;
            this._smooth = value;
            this._pInvalidatePasses();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterialBase.prototype, "repeat", {
        /**
         * Indicates whether or not any used textures should be tiled. If set to false, texture samples are clamped to
         * the texture's borders when the uv coordinates are outside the [0, 1] interval. Defaults to false.
         */
        get: function () {
            return this._repeat;
        },
        set: function (value) {
            if (this._repeat == value)
                return;
            this._repeat = value;
            this._pInvalidatePasses();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterialBase.prototype, "color", {
        /**
         * The diffuse reflectivity color of the surface.
         */
        get: function () {
            return this._color;
        },
        set: function (value) {
            if (this._color == value)
                return;
            this._color = value;
            this._pInvalidatePasses();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterialBase.prototype, "texture", {
        /**
         * The texture object to use for the albedo colour.
         */
        get: function () {
            return this._pTexture;
        },
        set: function (value) {
            if (this._pTexture == value)
                return;
            this._pTexture = value;
            this._pInvalidatePasses();
            this._pHeight = this._pTexture.height;
            this._pWidth = this._pTexture.width;
            this._pNotifySizeChanged();
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
            this._pInvalidatePasses();
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
            this._pInvalidatePasses();
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
            this._pInvalidatePasses();
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
            this._pInvalidatePasses();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Cleans up resources owned by the material, including passes. Textures are not owned by the material since they
     * could be used by other materials and will not be disposed.
     */
    MaterialBase.prototype.dispose = function () {
        var i;
        var len;
        len = this._renderObjects.length;
        for (i = 0; i < len; i++)
            this._renderObjects[i].dispose();
        this._renderObjects = new Array();
    };
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
            this._pInvalidatePasses();
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
            this._pInvalidateRenderObject();
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
            this._pInvalidatePasses();
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
            this._pInvalidatePasses();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterialBase.prototype, "width", {
        /**
         *
         */
        get: function () {
            return this._pWidth;
        },
        enumerable: true,
        configurable: true
    });
    //
    // MATERIAL MANAGEMENT
    //
    /**
     * Mark an IRenderableOwner as owner of this material.
     * Assures we're not using the same material across renderables with different animations, since the
     * Programs depend on animation. This method needs to be called when a material is assigned.
     *
     * @param owner The IRenderableOwner that had this material assigned
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
        owner.dispatchEvent(new RenderableOwnerEvent(RenderableOwnerEvent.RENDER_OBJECT_OWNER_UPDATED, this));
    };
    /**
     * Removes an IRenderableOwner as owner.
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
        owner.dispatchEvent(new RenderableOwnerEvent(RenderableOwnerEvent.RENDER_OBJECT_OWNER_UPDATED, this));
    };
    Object.defineProperty(MaterialBase.prototype, "iOwners", {
        /**
         * A list of the IRenderableOwners that use this material
         *
         * @private
         */
        get: function () {
            return this._owners;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Marks the shader programs for all passes as invalid, so they will be recompiled before the next use.
     *
     * @private
     */
    MaterialBase.prototype._pInvalidatePasses = function () {
        var len = this._renderObjects.length;
        for (var i = 0; i < len; i++)
            this._renderObjects[i].invalidatePasses();
    };
    MaterialBase.prototype.invalidateAnimation = function () {
        var len = this._renderObjects.length;
        for (var i = 0; i < len; i++)
            this._renderObjects[i].invalidateAnimation();
    };
    MaterialBase.prototype._pInvalidateRenderObject = function () {
        var len = this._renderObjects.length;
        for (var i = 0; i < len; i++)
            this._renderObjects[i].invalidateRenderObject();
    };
    /**
     * Called when the light picker's configuration changed.
     */
    MaterialBase.prototype.onLightsChange = function (event) {
        this._pInvalidateRenderObject();
    };
    MaterialBase.prototype._pNotifySizeChanged = function () {
        if (!this._sizeChanged)
            this._sizeChanged = new MaterialEvent(MaterialEvent.SIZE_CHANGED);
        this.dispatchEvent(this._sizeChanged);
    };
    MaterialBase.prototype._iAddRenderObject = function (renderObject) {
        this._renderObjects.push(renderObject);
        return renderObject;
    };
    MaterialBase.prototype._iRemoveRenderObject = function (renderObject) {
        this._renderObjects.splice(this._renderObjects.indexOf(renderObject), 1);
        return renderObject;
    };
    /**
     *
     * @param renderer
     *
     * @internal
     */
    MaterialBase.prototype.getRenderObject = function (renderablePool) {
        throw new AbstractMethodError();
    };
    return MaterialBase;
})(NamedAssetBase);
module.exports = MaterialBase;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9tYXRlcmlhbHMvTWF0ZXJpYWxCYXNlLnRzIl0sIm5hbWVzIjpbIk1hdGVyaWFsQmFzZSIsIk1hdGVyaWFsQmFzZS5jb25zdHJ1Y3RvciIsIk1hdGVyaWFsQmFzZS5hc3NldFR5cGUiLCJNYXRlcmlhbEJhc2UuYWxwaGEiLCJNYXRlcmlhbEJhc2UuY29sb3JUcmFuc2Zvcm0iLCJNYXRlcmlhbEJhc2UuYWxwaGFCbGVuZGluZyIsIk1hdGVyaWFsQmFzZS5oZWlnaHQiLCJNYXRlcmlhbEJhc2UuYW5pbWF0aW9uU2V0IiwiTWF0ZXJpYWxCYXNlLmxpZ2h0UGlja2VyIiwiTWF0ZXJpYWxCYXNlLm1pcG1hcCIsIk1hdGVyaWFsQmFzZS5zbW9vdGgiLCJNYXRlcmlhbEJhc2UucmVwZWF0IiwiTWF0ZXJpYWxCYXNlLmNvbG9yIiwiTWF0ZXJpYWxCYXNlLnRleHR1cmUiLCJNYXRlcmlhbEJhc2UuYW5pbWF0ZVVWcyIsIk1hdGVyaWFsQmFzZS5lbmFibGVMaWdodEZhbGxPZmYiLCJNYXRlcmlhbEJhc2UuZGlmZnVzZUxpZ2h0U291cmNlcyIsIk1hdGVyaWFsQmFzZS5zcGVjdWxhckxpZ2h0U291cmNlcyIsIk1hdGVyaWFsQmFzZS5kaXNwb3NlIiwiTWF0ZXJpYWxCYXNlLmJvdGhTaWRlcyIsIk1hdGVyaWFsQmFzZS5ibGVuZE1vZGUiLCJNYXRlcmlhbEJhc2UuYWxwaGFQcmVtdWx0aXBsaWVkIiwiTWF0ZXJpYWxCYXNlLmFscGhhVGhyZXNob2xkIiwiTWF0ZXJpYWxCYXNlLndpZHRoIiwiTWF0ZXJpYWxCYXNlLmlBZGRPd25lciIsIk1hdGVyaWFsQmFzZS5pUmVtb3ZlT3duZXIiLCJNYXRlcmlhbEJhc2UuaU93bmVycyIsIk1hdGVyaWFsQmFzZS5fcEludmFsaWRhdGVQYXNzZXMiLCJNYXRlcmlhbEJhc2UuaW52YWxpZGF0ZUFuaW1hdGlvbiIsIk1hdGVyaWFsQmFzZS5fcEludmFsaWRhdGVSZW5kZXJPYmplY3QiLCJNYXRlcmlhbEJhc2Uub25MaWdodHNDaGFuZ2UiLCJNYXRlcmlhbEJhc2UuX3BOb3RpZnlTaXplQ2hhbmdlZCIsIk1hdGVyaWFsQmFzZS5faUFkZFJlbmRlck9iamVjdCIsIk1hdGVyaWFsQmFzZS5faVJlbW92ZVJlbmRlck9iamVjdCIsIk1hdGVyaWFsQmFzZS5nZXRSZW5kZXJPYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQU8sU0FBUyxXQUFlLGdDQUFnQyxDQUFDLENBQUM7QUFDakUsSUFBTyxjQUFjLFdBQWMscUNBQXFDLENBQUMsQ0FBQztBQUUxRSxJQUFPLG1CQUFtQixXQUFhLDRDQUE0QyxDQUFDLENBQUM7QUFDckYsSUFBTyxLQUFLLFdBQWdCLDhCQUE4QixDQUFDLENBQUM7QUFDNUQsSUFBTyxTQUFTLFdBQWUsbUNBQW1DLENBQUMsQ0FBQztBQUVwRSxJQUFPLGNBQWMsV0FBYyx3Q0FBd0MsQ0FBQyxDQUFDO0FBVTdFLElBQU8sYUFBYSxXQUFjLHlDQUF5QyxDQUFDLENBQUM7QUFDN0UsSUFBTyxvQkFBb0IsV0FBYSxnREFBZ0QsQ0FBQyxDQUFDO0FBSzFGLEFBV0E7Ozs7Ozs7Ozs7R0FERztJQUNHLFlBQVk7SUFBU0EsVUFBckJBLFlBQVlBLFVBQXVCQTtJQXlFeENBOztPQUVHQTtJQUNIQSxTQTVFS0EsWUFBWUE7UUFBbEJDLGlCQXVtQkNBO1FBemhCQ0EsaUJBQU9BLENBQUNBO1FBM0VEQSxtQkFBY0EsR0FBV0EsS0FBS0EsQ0FBQ0E7UUFDL0JBLFdBQU1BLEdBQVVBLENBQUNBLENBQUNBO1FBR2xCQSxtQkFBY0EsR0FBd0JBLElBQUlBLEtBQUtBLEVBQWlCQSxDQUFDQTtRQUVsRUEscUJBQWdCQSxHQUFVQSxDQUFDQSxDQUFDQTtRQUM1QkEsaUJBQVlBLEdBQVdBLEtBQUtBLENBQUNBO1FBQzVCQSx3QkFBbUJBLEdBQVdBLElBQUlBLENBQUNBO1FBQ25DQSwwQkFBcUJBLEdBQVVBLElBQUlBLENBQUNBO1FBQ3BDQSx5QkFBb0JBLEdBQVVBLElBQUlBLENBQUNBO1FBaUIzQ0E7Ozs7V0FJ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WUFBWUEsQ0FBQ0E7WUFDdEJBLElBQUlBLENBQUNBLFlBQVlBLEdBQUdBLElBQUlBLGFBQWFBLENBQUNBLGFBQWFBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBO1FBRW5FQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQTtJQUN2Q0EsQ0FBQ0E7SUFFTS9CLHdDQUFpQkEsR0FBeEJBLFVBQXlCQSxZQUEwQkE7UUFFbERnQyxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQTtRQUV2Q0EsTUFBTUEsQ0FBQ0EsWUFBWUEsQ0FBQ0E7SUFDckJBLENBQUNBO0lBRU1oQywyQ0FBb0JBLEdBQTNCQSxVQUE0QkEsWUFBMEJBO1FBRXJEaUMsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsWUFBWUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFFekVBLE1BQU1BLENBQUNBLFlBQVlBLENBQUNBO0lBQ3JCQSxDQUFDQTtJQUVEakM7Ozs7O09BS0dBO0lBQ0lBLHNDQUFlQSxHQUF0QkEsVUFBdUJBLGNBQThCQTtRQUVwRGtDLE1BQU1BLElBQUlBLG1CQUFtQkEsRUFBRUEsQ0FBQ0E7SUFDakNBLENBQUNBO0lBQ0ZsQyxtQkFBQ0E7QUFBREEsQ0F2bUJBLEFBdW1CQ0EsRUF2bUIwQixjQUFjLEVBdW1CeEM7QUFFRCxBQUFzQixpQkFBYixZQUFZLENBQUMiLCJmaWxlIjoibWF0ZXJpYWxzL01hdGVyaWFsQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmxlbmRNb2RlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9iYXNlL0JsZW5kTW9kZVwiKTtcclxuaW1wb3J0IENvbG9yVHJhbnNmb3JtXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9Db2xvclRyYW5zZm9ybVwiKTtcclxuaW1wb3J0IE1hdHJpeDNEXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vTWF0cml4M0RcIik7XHJcbmltcG9ydCBBYnN0cmFjdE1ldGhvZEVycm9yXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2Vycm9ycy9BYnN0cmFjdE1ldGhvZEVycm9yXCIpO1xyXG5pbXBvcnQgRXZlbnRcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0V2ZW50XCIpO1xyXG5pbXBvcnQgQXNzZXRUeXBlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0Fzc2V0VHlwZVwiKTtcclxuaW1wb3J0IElBc3NldFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0lBc3NldFwiKTtcclxuaW1wb3J0IE5hbWVkQXNzZXRCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9OYW1lZEFzc2V0QmFzZVwiKTtcclxuaW1wb3J0IFRleHR1cmUyREJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi90ZXh0dXJlcy9UZXh0dXJlMkRCYXNlXCIpO1xyXG5cclxuaW1wb3J0IElBbmltYXRpb25TZXRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9hbmltYXRvcnMvSUFuaW1hdGlvblNldFwiKTtcclxuaW1wb3J0IElBbmltYXRvclx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYW5pbWF0b3JzL0lBbmltYXRvclwiKTtcclxuaW1wb3J0IElSZW5kZXJPYmplY3RPd25lclx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0lSZW5kZXJPYmplY3RPd25lclwiKTtcclxuaW1wb3J0IElSZW5kZXJhYmxlT3duZXJcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0lSZW5kZXJhYmxlT3duZXJcIik7XHJcbmltcG9ydCBJUmVuZGVyT2JqZWN0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcG9vbC9JUmVuZGVyT2JqZWN0XCIpO1xyXG5pbXBvcnQgSVJlbmRlcmFibGVQb29sXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcG9vbC9JUmVuZGVyYWJsZVBvb2xcIik7XHJcbmltcG9ydCBDYW1lcmFcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZW50aXRpZXMvQ2FtZXJhXCIpO1xyXG5pbXBvcnQgTWF0ZXJpYWxFdmVudFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2V2ZW50cy9NYXRlcmlhbEV2ZW50XCIpO1xyXG5pbXBvcnQgUmVuZGVyYWJsZU93bmVyRXZlbnRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZXZlbnRzL1JlbmRlcmFibGVPd25lckV2ZW50XCIpO1xyXG5pbXBvcnQgTGlnaHRQaWNrZXJCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvbWF0ZXJpYWxzL2xpZ2h0cGlja2Vycy9MaWdodFBpY2tlckJhc2VcIik7XHJcbmltcG9ydCBJUmVuZGVyZXJcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3JlbmRlci9JUmVuZGVyZXJcIik7XHJcblxyXG5cclxuLyoqXHJcbiAqIE1hdGVyaWFsQmFzZSBmb3JtcyBhbiBhYnN0cmFjdCBiYXNlIGNsYXNzIGZvciBhbnkgbWF0ZXJpYWwuXHJcbiAqIEEgbWF0ZXJpYWwgY29uc2lzdHMgb2Ygc2V2ZXJhbCBwYXNzZXMsIGVhY2ggb2Ygd2hpY2ggY29uc3RpdHV0ZXMgYXQgbGVhc3Qgb25lIHJlbmRlciBjYWxsLiBTZXZlcmFsIHBhc3NlcyBjb3VsZFxyXG4gKiBiZSB1c2VkIGZvciBzcGVjaWFsIGVmZmVjdHMgKHJlbmRlciBsaWdodGluZyBmb3IgbWFueSBsaWdodHMgaW4gc2V2ZXJhbCBwYXNzZXMsIHJlbmRlciBhbiBvdXRsaW5lIGluIGEgc2VwYXJhdGVcclxuICogcGFzcykgb3IgdG8gcHJvdmlkZSBhZGRpdGlvbmFsIHJlbmRlci10by10ZXh0dXJlIHBhc3NlcyAocmVuZGVyaW5nIGRpZmZ1c2UgbGlnaHQgdG8gdGV4dHVyZSBmb3IgdGV4dHVyZS1zcGFjZVxyXG4gKiBzdWJzdXJmYWNlIHNjYXR0ZXJpbmcsIG9yIHJlbmRlcmluZyBhIGRlcHRoIG1hcCBmb3Igc3BlY2lhbGl6ZWQgc2VsZi1zaGFkb3dpbmcpLlxyXG4gKlxyXG4gKiBBd2F5M0QgcHJvdmlkZXMgZGVmYXVsdCBtYXRlcmlhbHMgdHJvdWdoIFNpbmdsZVBhc3NNYXRlcmlhbEJhc2UgYW5kIFRyaWFuZ2xlTWF0ZXJpYWwsIHdoaWNoIHVzZSBtb2R1bGFyXHJcbiAqIG1ldGhvZHMgdG8gYnVpbGQgdGhlIHNoYWRlciBjb2RlLiBNYXRlcmlhbEJhc2UgY2FuIGJlIGV4dGVuZGVkIHRvIGJ1aWxkIHNwZWNpZmljIGFuZCBoaWdoLXBlcmZvcm1hbnQgY3VzdG9tXHJcbiAqIHNoYWRlcnMsIG9yIGVudGlyZSBuZXcgbWF0ZXJpYWwgZnJhbWV3b3Jrcy5cclxuICovXHJcbmNsYXNzIE1hdGVyaWFsQmFzZSBleHRlbmRzIE5hbWVkQXNzZXRCYXNlIGltcGxlbWVudHMgSVJlbmRlck9iamVjdE93bmVyXHJcbntcclxuXHRwcml2YXRlIF9jb2xvclRyYW5zZm9ybTpDb2xvclRyYW5zZm9ybTtcclxuXHRwcml2YXRlIF9hbHBoYUJsZW5kaW5nOmJvb2xlYW4gPSBmYWxzZTtcclxuXHRwcml2YXRlIF9hbHBoYTpudW1iZXIgPSAxO1xyXG5cdFxyXG5cdHByaXZhdGUgX3NpemVDaGFuZ2VkOk1hdGVyaWFsRXZlbnQ7XHJcblx0cHJpdmF0ZSBfcmVuZGVyT2JqZWN0czpBcnJheTxJUmVuZGVyT2JqZWN0PiA9IG5ldyBBcnJheTxJUmVuZGVyT2JqZWN0PigpO1xyXG5cclxuXHRwdWJsaWMgX3BBbHBoYVRocmVzaG9sZDpudW1iZXIgPSAwO1xyXG5cdHB1YmxpYyBfcEFuaW1hdGVVVnM6Ym9vbGVhbiA9IGZhbHNlO1xyXG5cdHByaXZhdGUgX2VuYWJsZUxpZ2h0RmFsbE9mZjpib29sZWFuID0gdHJ1ZTtcclxuXHRwcml2YXRlIF9zcGVjdWxhckxpZ2h0U291cmNlczpudW1iZXIgPSAweDAxO1xyXG5cdHByaXZhdGUgX2RpZmZ1c2VMaWdodFNvdXJjZXM6bnVtYmVyID0gMHgwMztcclxuXHJcblx0LyoqXHJcblx0ICogQW4gb2JqZWN0IHRvIGNvbnRhaW4gYW55IGV4dHJhIGRhdGEuXHJcblx0ICovXHJcblx0cHVibGljIGV4dHJhOk9iamVjdDtcclxuXHJcblx0LyoqXHJcblx0ICogQSB2YWx1ZSB0aGF0IGNhbiBiZSB1c2VkIGJ5IG1hdGVyaWFscyB0aGF0IG9ubHkgd29yayB3aXRoIGEgZ2l2ZW4gdHlwZSBvZiByZW5kZXJlci4gVGhlIHJlbmRlcmVyIGNhbiB0ZXN0IHRoZVxyXG5cdCAqIGNsYXNzaWZpY2F0aW9uIHRvIGNob29zZSB3aGljaCByZW5kZXIgcGF0aCB0byB1c2UuIEZvciBleGFtcGxlLCBhIGRlZmVycmVkIG1hdGVyaWFsIGNvdWxkIHNldCB0aGlzIHZhbHVlIHNvXHJcblx0ICogdGhhdCB0aGUgZGVmZXJyZWQgcmVuZGVyZXIga25vd3Mgbm90IHRvIHRha2UgdGhlIGZvcndhcmQgcmVuZGVyaW5nIHBhdGguXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBfaUNsYXNzaWZpY2F0aW9uOnN0cmluZztcclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIEFuIGlkIGZvciB0aGlzIG1hdGVyaWFsIHVzZWQgdG8gc29ydCB0aGUgcmVuZGVyYWJsZXMgYnkgc2hhZGVyIHByb2dyYW0sIHdoaWNoIHJlZHVjZXMgUHJvZ3JhbSBzdGF0ZSBjaGFuZ2VzLlxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwdWJsaWMgX2lNYXRlcmlhbElkOm51bWJlciA9IDA7XHJcblxyXG5cdHB1YmxpYyBfaUJhc2VTY3JlZW5QYXNzSW5kZXg6bnVtYmVyID0gMDtcclxuXHJcblx0cHJpdmF0ZSBfYm90aFNpZGVzOmJvb2xlYW4gPSBmYWxzZTsgLy8gdXBkYXRlXHJcblx0cHJpdmF0ZSBfYW5pbWF0aW9uU2V0OklBbmltYXRpb25TZXQ7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEEgbGlzdCBvZiBtYXRlcmlhbCBvd25lcnMsIHJlbmRlcmFibGVzIG9yIGN1c3RvbSBFbnRpdGllcy5cclxuXHQgKi9cclxuXHRwcml2YXRlIF9vd25lcnM6QXJyYXk8SVJlbmRlcmFibGVPd25lcj47XHJcblxyXG5cdHByaXZhdGUgX2FscGhhUHJlbXVsdGlwbGllZDpib29sZWFuO1xyXG5cclxuXHRwdWJsaWMgX3BCbGVuZE1vZGU6c3RyaW5nID0gQmxlbmRNb2RlLk5PUk1BTDtcclxuXHJcblx0cHJpdmF0ZSBfbWlwbWFwOmJvb2xlYW4gPSB0cnVlO1xyXG5cdHByaXZhdGUgX3Ntb290aDpib29sZWFuID0gdHJ1ZTtcclxuXHRwcml2YXRlIF9yZXBlYXQ6Ym9vbGVhbiA9IGZhbHNlO1xyXG5cdHByaXZhdGUgX2NvbG9yOm51bWJlciA9IDB4RkZGRkZGO1xyXG5cdHB1YmxpYyBfcFRleHR1cmU6VGV4dHVyZTJEQmFzZTtcclxuXHJcblx0cHVibGljIF9wTGlnaHRQaWNrZXI6TGlnaHRQaWNrZXJCYXNlO1xyXG5cclxuXHRwdWJsaWMgX3BIZWlnaHQ6bnVtYmVyID0gMTtcclxuXHRwdWJsaWMgX3BXaWR0aDpudW1iZXIgPSAxO1xyXG5cclxuXHRwcml2YXRlIF9vbkxpZ2h0Q2hhbmdlRGVsZWdhdGU6KGV2ZW50OkV2ZW50KSA9PiB2b2lkO1xyXG5cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGFzc2V0VHlwZSgpOnN0cmluZ1xyXG5cdHtcclxuXHRcdHJldHVybiBBc3NldFR5cGUuTUFURVJJQUw7O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhIG5ldyBNYXRlcmlhbEJhc2Ugb2JqZWN0LlxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKClcclxuXHR7XHJcblx0XHRzdXBlcigpO1xyXG5cclxuXHRcdHRoaXMuX2lNYXRlcmlhbElkID0gTnVtYmVyKHRoaXMuaWQpO1xyXG5cclxuXHRcdHRoaXMuX293bmVycyA9IG5ldyBBcnJheTxJUmVuZGVyYWJsZU93bmVyPigpO1xyXG5cclxuXHRcdHRoaXMuX29uTGlnaHRDaGFuZ2VEZWxlZ2F0ZSA9IChldmVudDpFdmVudCkgPT4gdGhpcy5vbkxpZ2h0c0NoYW5nZShldmVudCk7XHJcblxyXG5cdFx0dGhpcy5hbHBoYVByZW11bHRpcGxpZWQgPSBmYWxzZTsgLy9UT0RPOiB3b3JrIG91dCB3aHkgdGhpcyBpcyBkaWZmZXJlbnQgZm9yIFdlYkdMXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgYWxwaGEgb2YgdGhlIHN1cmZhY2UuXHJcblx0ICovXHJcblx0cHVibGljIGdldCBhbHBoYSgpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9hbHBoYTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgYWxwaGEodmFsdWU6bnVtYmVyKVxyXG5cdHtcclxuXHRcdGlmICh2YWx1ZSA+IDEpXHJcblx0XHRcdHZhbHVlID0gMTtcclxuXHRcdGVsc2UgaWYgKHZhbHVlIDwgMClcclxuXHRcdFx0dmFsdWUgPSAwO1xyXG5cclxuXHRcdGlmICh0aGlzLl9hbHBoYSA9PSB2YWx1ZSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX2FscGhhID0gdmFsdWU7XHJcblxyXG5cdFx0aWYgKHRoaXMuX2NvbG9yVHJhbnNmb3JtID09IG51bGwpXHJcblx0XHRcdHRoaXMuX2NvbG9yVHJhbnNmb3JtID0gbmV3IENvbG9yVHJhbnNmb3JtKCk7XHJcblxyXG5cdFx0dGhpcy5fY29sb3JUcmFuc2Zvcm0uYWxwaGFNdWx0aXBsaWVyID0gdmFsdWU7XHJcblxyXG5cdFx0dGhpcy5fcEludmFsaWRhdGVSZW5kZXJPYmplY3QoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBDb2xvclRyYW5zZm9ybSBvYmplY3QgdG8gdHJhbnNmb3JtIHRoZSBjb2xvdXIgb2YgdGhlIG1hdGVyaWFsIHdpdGguIERlZmF1bHRzIHRvIG51bGwuXHJcblx0ICovXHJcblx0cHVibGljIGdldCBjb2xvclRyYW5zZm9ybSgpOkNvbG9yVHJhbnNmb3JtXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2NvbG9yVHJhbnNmb3JtO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBjb2xvclRyYW5zZm9ybSh2YWx1ZTpDb2xvclRyYW5zZm9ybSlcclxuXHR7XHJcblx0XHR0aGlzLl9jb2xvclRyYW5zZm9ybSA9IHZhbHVlO1xyXG5cclxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlUmVuZGVyT2JqZWN0KCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJbmRpY2F0ZXMgd2hldGhlciBvciBub3QgdGhlIG1hdGVyaWFsIGhhcyB0cmFuc3BhcmVuY3kuIElmIGJpbmFyeSB0cmFuc3BhcmVuY3kgaXMgc3VmZmljaWVudCwgZm9yXHJcblx0ICogZXhhbXBsZSB3aGVuIHVzaW5nIHRleHR1cmVzIG9mIGZvbGlhZ2UsIGNvbnNpZGVyIHVzaW5nIGFscGhhVGhyZXNob2xkIGluc3RlYWQuXHJcblx0ICovXHJcblx0cHVibGljIGdldCBhbHBoYUJsZW5kaW5nKCk6Ym9vbGVhblxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9hbHBoYUJsZW5kaW5nO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBhbHBoYUJsZW5kaW5nKHZhbHVlOmJvb2xlYW4pXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX2FscGhhQmxlbmRpbmcgPT0gdmFsdWUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9hbHBoYUJsZW5kaW5nID0gdmFsdWU7XHJcblxyXG5cdFx0dGhpcy5fcEludmFsaWRhdGVSZW5kZXJPYmplY3QoKTtcclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGhlaWdodCgpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9wSGVpZ2h0O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGFuaW1hdGlvblNldCgpOklBbmltYXRpb25TZXRcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fYW5pbWF0aW9uU2V0O1xyXG5cdH1cclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBsaWdodCBwaWNrZXIgdXNlZCBieSB0aGUgbWF0ZXJpYWwgdG8gcHJvdmlkZSBsaWdodHMgdG8gdGhlIG1hdGVyaWFsIGlmIGl0IHN1cHBvcnRzIGxpZ2h0aW5nLlxyXG5cdCAqXHJcblx0ICogQHNlZSBMaWdodFBpY2tlckJhc2VcclxuXHQgKiBAc2VlIFN0YXRpY0xpZ2h0UGlja2VyXHJcblx0ICovXHJcblx0cHVibGljIGdldCBsaWdodFBpY2tlcigpOkxpZ2h0UGlja2VyQmFzZVxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9wTGlnaHRQaWNrZXI7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IGxpZ2h0UGlja2VyKHZhbHVlOkxpZ2h0UGlja2VyQmFzZSlcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fcExpZ2h0UGlja2VyID09IHZhbHVlKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0aWYgKHRoaXMuX3BMaWdodFBpY2tlcilcclxuXHRcdFx0dGhpcy5fcExpZ2h0UGlja2VyLnJlbW92ZUV2ZW50TGlzdGVuZXIoRXZlbnQuQ0hBTkdFLCB0aGlzLl9vbkxpZ2h0Q2hhbmdlRGVsZWdhdGUpO1xyXG5cclxuXHRcdHRoaXMuX3BMaWdodFBpY2tlciA9IHZhbHVlO1xyXG5cclxuXHRcdGlmICh0aGlzLl9wTGlnaHRQaWNrZXIpXHJcblx0XHRcdHRoaXMuX3BMaWdodFBpY2tlci5hZGRFdmVudExpc3RlbmVyKEV2ZW50LkNIQU5HRSwgdGhpcy5fb25MaWdodENoYW5nZURlbGVnYXRlKTtcclxuXHJcblx0XHR0aGlzLl9wSW52YWxpZGF0ZVJlbmRlck9iamVjdCgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSW5kaWNhdGVzIHdoZXRoZXIgb3Igbm90IGFueSB1c2VkIHRleHR1cmVzIHNob3VsZCB1c2UgbWlwbWFwcGluZy4gRGVmYXVsdHMgdG8gdHJ1ZS5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IG1pcG1hcCgpOmJvb2xlYW5cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fbWlwbWFwO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBtaXBtYXAodmFsdWU6Ym9vbGVhbilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fbWlwbWFwID09IHZhbHVlKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fbWlwbWFwID0gdmFsdWU7XHJcblxyXG5cdFx0dGhpcy5fcEludmFsaWRhdGVQYXNzZXMoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluZGljYXRlcyB3aGV0aGVyIG9yIG5vdCBhbnkgdXNlZCB0ZXh0dXJlcyBzaG91bGQgdXNlIHNtb290aGluZy4gRGVmYXVsdHMgdG8gdHJ1ZS5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHNtb290aCgpOmJvb2xlYW5cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fc21vb3RoO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBzbW9vdGgodmFsdWU6Ym9vbGVhbilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fc21vb3RoID09IHZhbHVlKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fc21vb3RoID0gdmFsdWU7XHJcblxyXG5cdFx0dGhpcy5fcEludmFsaWRhdGVQYXNzZXMoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluZGljYXRlcyB3aGV0aGVyIG9yIG5vdCBhbnkgdXNlZCB0ZXh0dXJlcyBzaG91bGQgYmUgdGlsZWQuIElmIHNldCB0byBmYWxzZSwgdGV4dHVyZSBzYW1wbGVzIGFyZSBjbGFtcGVkIHRvXHJcblx0ICogdGhlIHRleHR1cmUncyBib3JkZXJzIHdoZW4gdGhlIHV2IGNvb3JkaW5hdGVzIGFyZSBvdXRzaWRlIHRoZSBbMCwgMV0gaW50ZXJ2YWwuIERlZmF1bHRzIHRvIGZhbHNlLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgcmVwZWF0KCk6Ym9vbGVhblxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9yZXBlYXQ7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHJlcGVhdCh2YWx1ZTpib29sZWFuKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9yZXBlYXQgPT0gdmFsdWUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9yZXBlYXQgPSB2YWx1ZTtcclxuXHJcblx0XHR0aGlzLl9wSW52YWxpZGF0ZVBhc3NlcygpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGRpZmZ1c2UgcmVmbGVjdGl2aXR5IGNvbG9yIG9mIHRoZSBzdXJmYWNlLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgY29sb3IoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fY29sb3I7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IGNvbG9yKHZhbHVlOm51bWJlcilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fY29sb3IgPT0gdmFsdWUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9jb2xvciA9IHZhbHVlO1xyXG5cclxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlUGFzc2VzKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgdGV4dHVyZSBvYmplY3QgdG8gdXNlIGZvciB0aGUgYWxiZWRvIGNvbG91ci5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHRleHR1cmUoKTpUZXh0dXJlMkRCYXNlXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BUZXh0dXJlO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCB0ZXh0dXJlKHZhbHVlOlRleHR1cmUyREJhc2UpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX3BUZXh0dXJlID09IHZhbHVlKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fcFRleHR1cmUgPSB2YWx1ZTtcclxuXHJcblx0XHR0aGlzLl9wSW52YWxpZGF0ZVBhc3NlcygpO1xyXG5cclxuXHRcdHRoaXMuX3BIZWlnaHQgPSB0aGlzLl9wVGV4dHVyZS5oZWlnaHQ7XHJcblx0XHR0aGlzLl9wV2lkdGggPSB0aGlzLl9wVGV4dHVyZS53aWR0aDtcclxuXHJcblx0XHR0aGlzLl9wTm90aWZ5U2l6ZUNoYW5nZWQoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNwZWNpZmllcyB3aGV0aGVyIG9yIG5vdCB0aGUgVVYgY29vcmRpbmF0ZXMgc2hvdWxkIGJlIGFuaW1hdGVkIHVzaW5nIGEgdHJhbnNmb3JtYXRpb24gbWF0cml4LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgYW5pbWF0ZVVWcygpOmJvb2xlYW5cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcEFuaW1hdGVVVnM7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IGFuaW1hdGVVVnModmFsdWU6Ym9vbGVhbilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fcEFuaW1hdGVVVnMgPT0gdmFsdWUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9wQW5pbWF0ZVVWcyA9IHZhbHVlO1xyXG5cclxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlUGFzc2VzKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBXaGV0aGVyIG9yIG5vdCB0byB1c2UgZmFsbE9mZiBhbmQgcmFkaXVzIHByb3BlcnRpZXMgZm9yIGxpZ2h0cy4gVGhpcyBjYW4gYmUgdXNlZCB0byBpbXByb3ZlIHBlcmZvcm1hbmNlIGFuZFxyXG5cdCAqIGNvbXBhdGliaWxpdHkgZm9yIGNvbnN0cmFpbmVkIG1vZGUuXHJcblx0ICovXHJcblx0cHVibGljIGdldCBlbmFibGVMaWdodEZhbGxPZmYoKTpib29sZWFuXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2VuYWJsZUxpZ2h0RmFsbE9mZjtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgZW5hYmxlTGlnaHRGYWxsT2ZmKHZhbHVlOmJvb2xlYW4pXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX2VuYWJsZUxpZ2h0RmFsbE9mZiA9PSB2YWx1ZSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX2VuYWJsZUxpZ2h0RmFsbE9mZiA9IHZhbHVlO1xyXG5cclxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlUGFzc2VzKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEZWZpbmUgd2hpY2ggbGlnaHQgc291cmNlIHR5cGVzIHRvIHVzZSBmb3IgZGlmZnVzZSByZWZsZWN0aW9ucy4gVGhpcyBhbGxvd3MgY2hvb3NpbmcgYmV0d2VlbiByZWd1bGFyIGxpZ2h0c1xyXG5cdCAqIGFuZC9vciBsaWdodCBwcm9iZXMgZm9yIGRpZmZ1c2UgcmVmbGVjdGlvbnMuXHJcblx0ICpcclxuXHQgKiBAc2VlIGF3YXkzZC5tYXRlcmlhbHMuTGlnaHRTb3VyY2VzXHJcblx0ICovXHJcblx0cHVibGljIGdldCBkaWZmdXNlTGlnaHRTb3VyY2VzKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2RpZmZ1c2VMaWdodFNvdXJjZXM7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IGRpZmZ1c2VMaWdodFNvdXJjZXModmFsdWU6bnVtYmVyKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9kaWZmdXNlTGlnaHRTb3VyY2VzID09IHZhbHVlKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fZGlmZnVzZUxpZ2h0U291cmNlcyA9IHZhbHVlO1xyXG5cclxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlUGFzc2VzKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEZWZpbmUgd2hpY2ggbGlnaHQgc291cmNlIHR5cGVzIHRvIHVzZSBmb3Igc3BlY3VsYXIgcmVmbGVjdGlvbnMuIFRoaXMgYWxsb3dzIGNob29zaW5nIGJldHdlZW4gcmVndWxhciBsaWdodHNcclxuXHQgKiBhbmQvb3IgbGlnaHQgcHJvYmVzIGZvciBzcGVjdWxhciByZWZsZWN0aW9ucy5cclxuXHQgKlxyXG5cdCAqIEBzZWUgYXdheTNkLm1hdGVyaWFscy5MaWdodFNvdXJjZXNcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHNwZWN1bGFyTGlnaHRTb3VyY2VzKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3NwZWN1bGFyTGlnaHRTb3VyY2VzO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBzcGVjdWxhckxpZ2h0U291cmNlcyh2YWx1ZTpudW1iZXIpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX3NwZWN1bGFyTGlnaHRTb3VyY2VzID09IHZhbHVlKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fc3BlY3VsYXJMaWdodFNvdXJjZXMgPSB2YWx1ZTtcclxuXHJcblx0XHR0aGlzLl9wSW52YWxpZGF0ZVBhc3NlcygpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2xlYW5zIHVwIHJlc291cmNlcyBvd25lZCBieSB0aGUgbWF0ZXJpYWwsIGluY2x1ZGluZyBwYXNzZXMuIFRleHR1cmVzIGFyZSBub3Qgb3duZWQgYnkgdGhlIG1hdGVyaWFsIHNpbmNlIHRoZXlcclxuXHQgKiBjb3VsZCBiZSB1c2VkIGJ5IG90aGVyIG1hdGVyaWFscyBhbmQgd2lsbCBub3QgYmUgZGlzcG9zZWQuXHJcblx0ICovXHJcblx0cHVibGljIGRpc3Bvc2UoKVxyXG5cdHtcclxuXHRcdHZhciBpOm51bWJlcjtcclxuXHRcdHZhciBsZW46bnVtYmVyO1xyXG5cclxuXHRcdGxlbiA9IHRoaXMuX3JlbmRlck9iamVjdHMubGVuZ3RoO1xyXG5cdFx0Zm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKVxyXG5cdFx0XHR0aGlzLl9yZW5kZXJPYmplY3RzW2ldLmRpc3Bvc2UoKTtcclxuXHJcblx0XHR0aGlzLl9yZW5kZXJPYmplY3RzID0gbmV3IEFycmF5PElSZW5kZXJPYmplY3Q+KCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEZWZpbmVzIHdoZXRoZXIgb3Igbm90IHRoZSBtYXRlcmlhbCBzaG91bGQgY3VsbCB0cmlhbmdsZXMgZmFjaW5nIGF3YXkgZnJvbSB0aGUgY2FtZXJhLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgYm90aFNpZGVzKCk6Ym9vbGVhblxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9ib3RoU2lkZXM7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IGJvdGhTaWRlcyh2YWx1ZTpib29sZWFuKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9ib3RoU2lkZXMgPSB2YWx1ZSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX2JvdGhTaWRlcyA9IHZhbHVlO1xyXG5cclxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlUGFzc2VzKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgYmxlbmQgbW9kZSB0byB1c2Ugd2hlbiBkcmF3aW5nIHRoaXMgcmVuZGVyYWJsZS4gVGhlIGZvbGxvd2luZyBibGVuZCBtb2RlcyBhcmUgc3VwcG9ydGVkOlxyXG5cdCAqIDx1bD5cclxuXHQgKiA8bGk+QmxlbmRNb2RlLk5PUk1BTDogTm8gYmxlbmRpbmcsIHVubGVzcyB0aGUgbWF0ZXJpYWwgaW5oZXJlbnRseSBuZWVkcyBpdDwvbGk+XHJcblx0ICogPGxpPkJsZW5kTW9kZS5MQVlFUjogRm9yY2UgYmxlbmRpbmcuIFRoaXMgd2lsbCBkcmF3IHRoZSBvYmplY3QgdGhlIHNhbWUgYXMgTk9STUFMLCBidXQgd2l0aG91dCB3cml0aW5nIGRlcHRoIHdyaXRlcy48L2xpPlxyXG5cdCAqIDxsaT5CbGVuZE1vZGUuTVVMVElQTFk8L2xpPlxyXG5cdCAqIDxsaT5CbGVuZE1vZGUuQUREPC9saT5cclxuXHQgKiA8bGk+QmxlbmRNb2RlLkFMUEhBPC9saT5cclxuXHQgKiA8L3VsPlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgYmxlbmRNb2RlKCk6c3RyaW5nXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BCbGVuZE1vZGU7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IGJsZW5kTW9kZSh2YWx1ZTpzdHJpbmcpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX3BCbGVuZE1vZGUgPT0gdmFsdWUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9wQmxlbmRNb2RlID0gdmFsdWU7XHJcblxyXG5cdFx0dGhpcy5fcEludmFsaWRhdGVSZW5kZXJPYmplY3QoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluZGljYXRlcyB3aGV0aGVyIHZpc2libGUgdGV4dHVyZXMgKG9yIG90aGVyIHBpeGVscykgdXNlZCBieSB0aGlzIG1hdGVyaWFsIGhhdmVcclxuXHQgKiBhbHJlYWR5IGJlZW4gcHJlbXVsdGlwbGllZC4gVG9nZ2xlIHRoaXMgaWYgeW91IGFyZSBzZWVpbmcgYmxhY2sgaGFsb3MgYXJvdW5kIHlvdXJcclxuXHQgKiBibGVuZGVkIGFscGhhIGVkZ2VzLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgYWxwaGFQcmVtdWx0aXBsaWVkKCk6Ym9vbGVhblxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9hbHBoYVByZW11bHRpcGxpZWQ7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IGFscGhhUHJlbXVsdGlwbGllZCh2YWx1ZTpib29sZWFuKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9hbHBoYVByZW11bHRpcGxpZWQgPT0gdmFsdWUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9hbHBoYVByZW11bHRpcGxpZWQgPSB2YWx1ZTtcclxuXHJcblx0XHR0aGlzLl9wSW52YWxpZGF0ZVBhc3NlcygpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIG1pbmltdW0gYWxwaGEgdmFsdWUgZm9yIHdoaWNoIHBpeGVscyBzaG91bGQgYmUgZHJhd24uIFRoaXMgaXMgdXNlZCBmb3IgdHJhbnNwYXJlbmN5IHRoYXQgaXMgZWl0aGVyXHJcblx0ICogaW52aXNpYmxlIG9yIGVudGlyZWx5IG9wYXF1ZSwgb2Z0ZW4gdXNlZCB3aXRoIHRleHR1cmVzIGZvciBmb2xpYWdlLCBldGMuXHJcblx0ICogUmVjb21tZW5kZWQgdmFsdWVzIGFyZSAwIHRvIGRpc2FibGUgYWxwaGEsIG9yIDAuNSB0byBjcmVhdGUgc21vb3RoIGVkZ2VzLiBEZWZhdWx0IHZhbHVlIGlzIDAgKGRpc2FibGVkKS5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGFscGhhVGhyZXNob2xkKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BBbHBoYVRocmVzaG9sZDtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgYWxwaGFUaHJlc2hvbGQodmFsdWU6bnVtYmVyKVxyXG5cdHtcclxuXHRcdGlmICh2YWx1ZSA8IDApXHJcblx0XHRcdHZhbHVlID0gMDtcclxuXHRcdGVsc2UgaWYgKHZhbHVlID4gMSlcclxuXHRcdFx0dmFsdWUgPSAxO1xyXG5cclxuXHRcdGlmICh0aGlzLl9wQWxwaGFUaHJlc2hvbGQgPT0gdmFsdWUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9wQWxwaGFUaHJlc2hvbGQgPSB2YWx1ZTtcclxuXHJcblx0XHR0aGlzLl9wSW52YWxpZGF0ZVBhc3NlcygpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHdpZHRoKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BXaWR0aDtcclxuXHR9XHJcblxyXG5cdC8vXHJcblx0Ly8gTUFURVJJQUwgTUFOQUdFTUVOVFxyXG5cdC8vXHJcblx0LyoqXHJcblx0ICogTWFyayBhbiBJUmVuZGVyYWJsZU93bmVyIGFzIG93bmVyIG9mIHRoaXMgbWF0ZXJpYWwuXHJcblx0ICogQXNzdXJlcyB3ZSdyZSBub3QgdXNpbmcgdGhlIHNhbWUgbWF0ZXJpYWwgYWNyb3NzIHJlbmRlcmFibGVzIHdpdGggZGlmZmVyZW50IGFuaW1hdGlvbnMsIHNpbmNlIHRoZVxyXG5cdCAqIFByb2dyYW1zIGRlcGVuZCBvbiBhbmltYXRpb24uIFRoaXMgbWV0aG9kIG5lZWRzIHRvIGJlIGNhbGxlZCB3aGVuIGEgbWF0ZXJpYWwgaXMgYXNzaWduZWQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb3duZXIgVGhlIElSZW5kZXJhYmxlT3duZXIgdGhhdCBoYWQgdGhpcyBtYXRlcmlhbCBhc3NpZ25lZFxyXG5cdCAqXHJcblx0ICogQGludGVybmFsXHJcblx0ICovXHJcblx0cHVibGljIGlBZGRPd25lcihvd25lcjpJUmVuZGVyYWJsZU93bmVyKVxyXG5cdHtcclxuXHRcdHRoaXMuX293bmVycy5wdXNoKG93bmVyKTtcclxuXHJcblx0XHR2YXIgYW5pbWF0aW9uU2V0OklBbmltYXRpb25TZXQ7XHJcblx0XHR2YXIgYW5pbWF0b3I6SUFuaW1hdG9yID0gPElBbmltYXRvcj4gb3duZXIuYW5pbWF0b3I7XHJcblxyXG5cdFx0aWYgKGFuaW1hdG9yKVxyXG5cdFx0XHRhbmltYXRpb25TZXQgPSA8SUFuaW1hdGlvblNldD4gYW5pbWF0b3IuYW5pbWF0aW9uU2V0O1xyXG5cclxuXHRcdGlmIChvd25lci5hbmltYXRvcikge1xyXG5cdFx0XHRpZiAodGhpcy5fYW5pbWF0aW9uU2V0ICYmIGFuaW1hdGlvblNldCAhPSB0aGlzLl9hbmltYXRpb25TZXQpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJBIE1hdGVyaWFsIGluc3RhbmNlIGNhbm5vdCBiZSBzaGFyZWQgYWNyb3NzIG1hdGVyaWFsIG93bmVycyB3aXRoIGRpZmZlcmVudCBhbmltYXRpb24gc2V0c1wiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRpZiAodGhpcy5fYW5pbWF0aW9uU2V0ICE9IGFuaW1hdGlvblNldCkge1xyXG5cclxuXHRcdFx0XHRcdHRoaXMuX2FuaW1hdGlvblNldCA9IGFuaW1hdGlvblNldDtcclxuXHJcblx0XHRcdFx0XHR0aGlzLmludmFsaWRhdGVBbmltYXRpb24oKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRvd25lci5kaXNwYXRjaEV2ZW50KG5ldyBSZW5kZXJhYmxlT3duZXJFdmVudChSZW5kZXJhYmxlT3duZXJFdmVudC5SRU5ERVJfT0JKRUNUX09XTkVSX1VQREFURUQsIHRoaXMpKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbW92ZXMgYW4gSVJlbmRlcmFibGVPd25lciBhcyBvd25lci5cclxuXHQgKiBAcGFyYW0gb3duZXJcclxuXHQgKlxyXG5cdCAqIEBpbnRlcm5hbFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBpUmVtb3ZlT3duZXIob3duZXI6SVJlbmRlcmFibGVPd25lcilcclxuXHR7XHJcblx0XHR0aGlzLl9vd25lcnMuc3BsaWNlKHRoaXMuX293bmVycy5pbmRleE9mKG93bmVyKSwgMSk7XHJcblxyXG5cdFx0aWYgKHRoaXMuX293bmVycy5sZW5ndGggPT0gMCkge1xyXG5cdFx0XHR0aGlzLl9hbmltYXRpb25TZXQgPSBudWxsO1xyXG5cclxuXHRcdFx0dGhpcy5pbnZhbGlkYXRlQW5pbWF0aW9uKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0b3duZXIuZGlzcGF0Y2hFdmVudChuZXcgUmVuZGVyYWJsZU93bmVyRXZlbnQoUmVuZGVyYWJsZU93bmVyRXZlbnQuUkVOREVSX09CSkVDVF9PV05FUl9VUERBVEVELCB0aGlzKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBIGxpc3Qgb2YgdGhlIElSZW5kZXJhYmxlT3duZXJzIHRoYXQgdXNlIHRoaXMgbWF0ZXJpYWxcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHVibGljIGdldCBpT3duZXJzKCk6QXJyYXk8SVJlbmRlcmFibGVPd25lcj5cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fb3duZXJzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTWFya3MgdGhlIHNoYWRlciBwcm9ncmFtcyBmb3IgYWxsIHBhc3NlcyBhcyBpbnZhbGlkLCBzbyB0aGV5IHdpbGwgYmUgcmVjb21waWxlZCBiZWZvcmUgdGhlIG5leHQgdXNlLlxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwdWJsaWMgX3BJbnZhbGlkYXRlUGFzc2VzKClcclxuXHR7XHJcblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX3JlbmRlck9iamVjdHMubGVuZ3RoO1xyXG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgbGVuOyBpKyspXHJcblx0XHRcdHRoaXMuX3JlbmRlck9iamVjdHNbaV0uaW52YWxpZGF0ZVBhc3NlcygpO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBpbnZhbGlkYXRlQW5pbWF0aW9uKClcclxuXHR7XHJcblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX3JlbmRlck9iamVjdHMubGVuZ3RoO1xyXG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgbGVuOyBpKyspXHJcblx0XHRcdHRoaXMuX3JlbmRlck9iamVjdHNbaV0uaW52YWxpZGF0ZUFuaW1hdGlvbigpO1xyXG5cdH1cclxuXHRcclxuXHRwdWJsaWMgX3BJbnZhbGlkYXRlUmVuZGVyT2JqZWN0KClcclxuXHR7XHJcblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX3JlbmRlck9iamVjdHMubGVuZ3RoO1xyXG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgbGVuOyBpKyspXHJcblx0XHRcdHRoaXMuX3JlbmRlck9iamVjdHNbaV0uaW52YWxpZGF0ZVJlbmRlck9iamVjdCgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2FsbGVkIHdoZW4gdGhlIGxpZ2h0IHBpY2tlcidzIGNvbmZpZ3VyYXRpb24gY2hhbmdlZC5cclxuXHQgKi9cclxuXHRwcml2YXRlIG9uTGlnaHRzQ2hhbmdlKGV2ZW50OkV2ZW50KVxyXG5cdHtcclxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlUmVuZGVyT2JqZWN0KCk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgX3BOb3RpZnlTaXplQ2hhbmdlZCgpXHJcblx0e1xyXG5cdFx0aWYgKCF0aGlzLl9zaXplQ2hhbmdlZClcclxuXHRcdFx0dGhpcy5fc2l6ZUNoYW5nZWQgPSBuZXcgTWF0ZXJpYWxFdmVudChNYXRlcmlhbEV2ZW50LlNJWkVfQ0hBTkdFRCk7XHJcblxyXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KHRoaXMuX3NpemVDaGFuZ2VkKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBfaUFkZFJlbmRlck9iamVjdChyZW5kZXJPYmplY3Q6SVJlbmRlck9iamVjdCk6SVJlbmRlck9iamVjdFxyXG5cdHtcclxuXHRcdHRoaXMuX3JlbmRlck9iamVjdHMucHVzaChyZW5kZXJPYmplY3QpO1xyXG5cclxuXHRcdHJldHVybiByZW5kZXJPYmplY3Q7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgX2lSZW1vdmVSZW5kZXJPYmplY3QocmVuZGVyT2JqZWN0OklSZW5kZXJPYmplY3QpOklSZW5kZXJPYmplY3RcclxuXHR7XHJcblx0XHR0aGlzLl9yZW5kZXJPYmplY3RzLnNwbGljZSh0aGlzLl9yZW5kZXJPYmplY3RzLmluZGV4T2YocmVuZGVyT2JqZWN0KSwgMSk7XHJcblxyXG5cdFx0cmV0dXJuIHJlbmRlck9iamVjdDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHJlbmRlcmVyXHJcblx0ICpcclxuXHQgKiBAaW50ZXJuYWxcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0UmVuZGVyT2JqZWN0KHJlbmRlcmFibGVQb29sOklSZW5kZXJhYmxlUG9vbCk6SVJlbmRlck9iamVjdFxyXG5cdHtcclxuXHRcdHRocm93IG5ldyBBYnN0cmFjdE1ldGhvZEVycm9yKCk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgPSBNYXRlcmlhbEJhc2U7Il19