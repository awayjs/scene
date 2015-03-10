var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BlendMode = require("awayjs-core/lib/data/BlendMode");
var ColorTransform = require("awayjs-core/lib/geom/ColorTransform");
var AbstractMethodError = require("awayjs-core/lib/errors/AbstractMethodError");
var Event = require("awayjs-core/lib/events/Event");
var AssetBase = require("awayjs-core/lib/library/AssetBase");
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
            return MaterialBase.assetType;
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
    MaterialBase.assetType = "[asset Material]";
    return MaterialBase;
})(AssetBase);
module.exports = MaterialBase;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9tYXRlcmlhbHMvTWF0ZXJpYWxCYXNlLnRzIl0sIm5hbWVzIjpbIk1hdGVyaWFsQmFzZSIsIk1hdGVyaWFsQmFzZS5jb25zdHJ1Y3RvciIsIk1hdGVyaWFsQmFzZS5hc3NldFR5cGUiLCJNYXRlcmlhbEJhc2UuYWxwaGEiLCJNYXRlcmlhbEJhc2UuY29sb3JUcmFuc2Zvcm0iLCJNYXRlcmlhbEJhc2UuYWxwaGFCbGVuZGluZyIsIk1hdGVyaWFsQmFzZS5oZWlnaHQiLCJNYXRlcmlhbEJhc2UuYW5pbWF0aW9uU2V0IiwiTWF0ZXJpYWxCYXNlLmxpZ2h0UGlja2VyIiwiTWF0ZXJpYWxCYXNlLm1pcG1hcCIsIk1hdGVyaWFsQmFzZS5zbW9vdGgiLCJNYXRlcmlhbEJhc2UucmVwZWF0IiwiTWF0ZXJpYWxCYXNlLmNvbG9yIiwiTWF0ZXJpYWxCYXNlLnRleHR1cmUiLCJNYXRlcmlhbEJhc2UuYW5pbWF0ZVVWcyIsIk1hdGVyaWFsQmFzZS5lbmFibGVMaWdodEZhbGxPZmYiLCJNYXRlcmlhbEJhc2UuZGlmZnVzZUxpZ2h0U291cmNlcyIsIk1hdGVyaWFsQmFzZS5zcGVjdWxhckxpZ2h0U291cmNlcyIsIk1hdGVyaWFsQmFzZS5kaXNwb3NlIiwiTWF0ZXJpYWxCYXNlLmJvdGhTaWRlcyIsIk1hdGVyaWFsQmFzZS5ibGVuZE1vZGUiLCJNYXRlcmlhbEJhc2UuYWxwaGFQcmVtdWx0aXBsaWVkIiwiTWF0ZXJpYWxCYXNlLmFscGhhVGhyZXNob2xkIiwiTWF0ZXJpYWxCYXNlLndpZHRoIiwiTWF0ZXJpYWxCYXNlLmlBZGRPd25lciIsIk1hdGVyaWFsQmFzZS5pUmVtb3ZlT3duZXIiLCJNYXRlcmlhbEJhc2UuaU93bmVycyIsIk1hdGVyaWFsQmFzZS5fcEludmFsaWRhdGVQYXNzZXMiLCJNYXRlcmlhbEJhc2UuaW52YWxpZGF0ZUFuaW1hdGlvbiIsIk1hdGVyaWFsQmFzZS5fcEludmFsaWRhdGVSZW5kZXJPYmplY3QiLCJNYXRlcmlhbEJhc2Uub25MaWdodHNDaGFuZ2UiLCJNYXRlcmlhbEJhc2UuX3BOb3RpZnlTaXplQ2hhbmdlZCIsIk1hdGVyaWFsQmFzZS5faUFkZFJlbmRlck9iamVjdCIsIk1hdGVyaWFsQmFzZS5faVJlbW92ZVJlbmRlck9iamVjdCIsIk1hdGVyaWFsQmFzZS5nZXRSZW5kZXJPYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQU8sU0FBUyxXQUFlLGdDQUFnQyxDQUFDLENBQUM7QUFDakUsSUFBTyxjQUFjLFdBQWMscUNBQXFDLENBQUMsQ0FBQztBQUUxRSxJQUFPLG1CQUFtQixXQUFhLDRDQUE0QyxDQUFDLENBQUM7QUFDckYsSUFBTyxLQUFLLFdBQWdCLDhCQUE4QixDQUFDLENBQUM7QUFFNUQsSUFBTyxTQUFTLFdBQWUsbUNBQW1DLENBQUMsQ0FBQztBQVVwRSxJQUFPLGFBQWEsV0FBYyx5Q0FBeUMsQ0FBQyxDQUFDO0FBQzdFLElBQU8sb0JBQW9CLFdBQWEsZ0RBQWdELENBQUMsQ0FBQztBQUsxRixBQVdBOzs7Ozs7Ozs7O0dBREc7SUFDRyxZQUFZO0lBQVNBLFVBQXJCQSxZQUFZQSxVQUFrQkE7SUEyRW5DQTs7T0FFR0E7SUFDSEEsU0E5RUtBLFlBQVlBO1FBQWxCQyxpQkF5bUJDQTtRQXpoQkNBLGlCQUFPQSxDQUFDQTtRQTNFREEsbUJBQWNBLEdBQVdBLEtBQUtBLENBQUNBO1FBQy9CQSxXQUFNQSxHQUFVQSxDQUFDQSxDQUFDQTtRQUdsQkEsbUJBQWNBLEdBQXdCQSxJQUFJQSxLQUFLQSxFQUFpQkEsQ0FBQ0E7UUFFbEVBLHFCQUFnQkEsR0FBVUEsQ0FBQ0EsQ0FBQ0E7UUFDNUJBLGlCQUFZQSxHQUFXQSxLQUFLQSxDQUFDQTtRQUM1QkEsd0JBQW1CQSxHQUFXQSxJQUFJQSxDQUFDQTtRQUNuQ0EsMEJBQXFCQSxHQUFVQSxJQUFJQSxDQUFDQTtRQUNwQ0EseUJBQW9CQSxHQUFVQSxJQUFJQSxDQUFDQTtRQWlCM0NBOzs7O1dBSUdBO1FBQ0lBLGlCQUFZQSxHQUFVQSxDQUFDQSxDQUFDQTtRQUV4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QUFhQSxDQUFDQSxhQUFhQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQTtRQUVuRUEsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0E7SUFDdkNBLENBQUNBO0lBRU0vQix3Q0FBaUJBLEdBQXhCQSxVQUF5QkEsWUFBMEJBO1FBRWxEZ0MsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0E7UUFFdkNBLE1BQU1BLENBQUNBLFlBQVlBLENBQUNBO0lBQ3JCQSxDQUFDQTtJQUVNaEMsMkNBQW9CQSxHQUEzQkEsVUFBNEJBLFlBQTBCQTtRQUVyRGlDLElBQUlBLENBQUNBLGNBQWNBLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLGNBQWNBLENBQUNBLE9BQU9BLENBQUNBLFlBQVlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO1FBRXpFQSxNQUFNQSxDQUFDQSxZQUFZQSxDQUFDQTtJQUNyQkEsQ0FBQ0E7SUFFRGpDOzs7OztPQUtHQTtJQUNJQSxzQ0FBZUEsR0FBdEJBLFVBQXVCQSxjQUE4QkE7UUFFcERrQyxNQUFNQSxJQUFJQSxtQkFBbUJBLEVBQUVBLENBQUNBO0lBQ2pDQSxDQUFDQTtJQXRtQmFsQyxzQkFBU0EsR0FBVUEsa0JBQWtCQSxDQUFDQTtJQXVtQnJEQSxtQkFBQ0E7QUFBREEsQ0F6bUJBLEFBeW1CQ0EsRUF6bUIwQixTQUFTLEVBeW1CbkM7QUFFRCxBQUFzQixpQkFBYixZQUFZLENBQUMiLCJmaWxlIjoibWF0ZXJpYWxzL01hdGVyaWFsQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmxlbmRNb2RlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9kYXRhL0JsZW5kTW9kZVwiKTtcbmltcG9ydCBDb2xvclRyYW5zZm9ybVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vQ29sb3JUcmFuc2Zvcm1cIik7XG5pbXBvcnQgTWF0cml4M0RcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9NYXRyaXgzRFwiKTtcbmltcG9ydCBBYnN0cmFjdE1ldGhvZEVycm9yXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2Vycm9ycy9BYnN0cmFjdE1ldGhvZEVycm9yXCIpO1xuaW1wb3J0IEV2ZW50XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2V2ZW50cy9FdmVudFwiKTtcbmltcG9ydCBJQXNzZXRcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9JQXNzZXRcIik7XG5pbXBvcnQgQXNzZXRCYXNlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0Fzc2V0QmFzZVwiKTtcbmltcG9ydCBUZXh0dXJlMkRCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvdGV4dHVyZXMvVGV4dHVyZTJEQmFzZVwiKTtcblxuaW1wb3J0IElBbmltYXRpb25TZXRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9hbmltYXRvcnMvSUFuaW1hdGlvblNldFwiKTtcbmltcG9ydCBJQW5pbWF0b3JcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2FuaW1hdG9ycy9JQW5pbWF0b3JcIik7XG5pbXBvcnQgSVJlbmRlck9iamVjdE93bmVyXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvSVJlbmRlck9iamVjdE93bmVyXCIpO1xuaW1wb3J0IElSZW5kZXJhYmxlT3duZXJcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0lSZW5kZXJhYmxlT3duZXJcIik7XG5pbXBvcnQgSVJlbmRlck9iamVjdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3Bvb2wvSVJlbmRlck9iamVjdFwiKTtcbmltcG9ydCBJUmVuZGVyYWJsZVBvb2xcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wb29sL0lSZW5kZXJhYmxlUG9vbFwiKTtcbmltcG9ydCBDYW1lcmFcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZW50aXRpZXMvQ2FtZXJhXCIpO1xuaW1wb3J0IE1hdGVyaWFsRXZlbnRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9ldmVudHMvTWF0ZXJpYWxFdmVudFwiKTtcbmltcG9ydCBSZW5kZXJhYmxlT3duZXJFdmVudFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9ldmVudHMvUmVuZGVyYWJsZU93bmVyRXZlbnRcIik7XG5pbXBvcnQgTGlnaHRQaWNrZXJCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvbWF0ZXJpYWxzL2xpZ2h0cGlja2Vycy9MaWdodFBpY2tlckJhc2VcIik7XG5pbXBvcnQgSVJlbmRlcmVyXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9yZW5kZXIvSVJlbmRlcmVyXCIpO1xuXG5cbi8qKlxuICogTWF0ZXJpYWxCYXNlIGZvcm1zIGFuIGFic3RyYWN0IGJhc2UgY2xhc3MgZm9yIGFueSBtYXRlcmlhbC5cbiAqIEEgbWF0ZXJpYWwgY29uc2lzdHMgb2Ygc2V2ZXJhbCBwYXNzZXMsIGVhY2ggb2Ygd2hpY2ggY29uc3RpdHV0ZXMgYXQgbGVhc3Qgb25lIHJlbmRlciBjYWxsLiBTZXZlcmFsIHBhc3NlcyBjb3VsZFxuICogYmUgdXNlZCBmb3Igc3BlY2lhbCBlZmZlY3RzIChyZW5kZXIgbGlnaHRpbmcgZm9yIG1hbnkgbGlnaHRzIGluIHNldmVyYWwgcGFzc2VzLCByZW5kZXIgYW4gb3V0bGluZSBpbiBhIHNlcGFyYXRlXG4gKiBwYXNzKSBvciB0byBwcm92aWRlIGFkZGl0aW9uYWwgcmVuZGVyLXRvLXRleHR1cmUgcGFzc2VzIChyZW5kZXJpbmcgZGlmZnVzZSBsaWdodCB0byB0ZXh0dXJlIGZvciB0ZXh0dXJlLXNwYWNlXG4gKiBzdWJzdXJmYWNlIHNjYXR0ZXJpbmcsIG9yIHJlbmRlcmluZyBhIGRlcHRoIG1hcCBmb3Igc3BlY2lhbGl6ZWQgc2VsZi1zaGFkb3dpbmcpLlxuICpcbiAqIEF3YXkzRCBwcm92aWRlcyBkZWZhdWx0IG1hdGVyaWFscyB0cm91Z2ggU2luZ2xlUGFzc01hdGVyaWFsQmFzZSBhbmQgVHJpYW5nbGVNYXRlcmlhbCwgd2hpY2ggdXNlIG1vZHVsYXJcbiAqIG1ldGhvZHMgdG8gYnVpbGQgdGhlIHNoYWRlciBjb2RlLiBNYXRlcmlhbEJhc2UgY2FuIGJlIGV4dGVuZGVkIHRvIGJ1aWxkIHNwZWNpZmljIGFuZCBoaWdoLXBlcmZvcm1hbnQgY3VzdG9tXG4gKiBzaGFkZXJzLCBvciBlbnRpcmUgbmV3IG1hdGVyaWFsIGZyYW1ld29ya3MuXG4gKi9cbmNsYXNzIE1hdGVyaWFsQmFzZSBleHRlbmRzIEFzc2V0QmFzZSBpbXBsZW1lbnRzIElSZW5kZXJPYmplY3RPd25lclxue1xuXHRwdWJsaWMgc3RhdGljIGFzc2V0VHlwZTpzdHJpbmcgPSBcIlthc3NldCBNYXRlcmlhbF1cIjtcblxuXHRwcml2YXRlIF9jb2xvclRyYW5zZm9ybTpDb2xvclRyYW5zZm9ybTtcblx0cHJpdmF0ZSBfYWxwaGFCbGVuZGluZzpib29sZWFuID0gZmFsc2U7XG5cdHByaXZhdGUgX2FscGhhOm51bWJlciA9IDE7XG5cdFxuXHRwcml2YXRlIF9zaXplQ2hhbmdlZDpNYXRlcmlhbEV2ZW50O1xuXHRwcml2YXRlIF9yZW5kZXJPYmplY3RzOkFycmF5PElSZW5kZXJPYmplY3Q+ID0gbmV3IEFycmF5PElSZW5kZXJPYmplY3Q+KCk7XG5cblx0cHVibGljIF9wQWxwaGFUaHJlc2hvbGQ6bnVtYmVyID0gMDtcblx0cHVibGljIF9wQW5pbWF0ZVVWczpib29sZWFuID0gZmFsc2U7XG5cdHByaXZhdGUgX2VuYWJsZUxpZ2h0RmFsbE9mZjpib29sZWFuID0gdHJ1ZTtcblx0cHJpdmF0ZSBfc3BlY3VsYXJMaWdodFNvdXJjZXM6bnVtYmVyID0gMHgwMTtcblx0cHJpdmF0ZSBfZGlmZnVzZUxpZ2h0U291cmNlczpudW1iZXIgPSAweDAzO1xuXG5cdC8qKlxuXHQgKiBBbiBvYmplY3QgdG8gY29udGFpbiBhbnkgZXh0cmEgZGF0YS5cblx0ICovXG5cdHB1YmxpYyBleHRyYTpPYmplY3Q7XG5cblx0LyoqXG5cdCAqIEEgdmFsdWUgdGhhdCBjYW4gYmUgdXNlZCBieSBtYXRlcmlhbHMgdGhhdCBvbmx5IHdvcmsgd2l0aCBhIGdpdmVuIHR5cGUgb2YgcmVuZGVyZXIuIFRoZSByZW5kZXJlciBjYW4gdGVzdCB0aGVcblx0ICogY2xhc3NpZmljYXRpb24gdG8gY2hvb3NlIHdoaWNoIHJlbmRlciBwYXRoIHRvIHVzZS4gRm9yIGV4YW1wbGUsIGEgZGVmZXJyZWQgbWF0ZXJpYWwgY291bGQgc2V0IHRoaXMgdmFsdWUgc29cblx0ICogdGhhdCB0aGUgZGVmZXJyZWQgcmVuZGVyZXIga25vd3Mgbm90IHRvIHRha2UgdGhlIGZvcndhcmQgcmVuZGVyaW5nIHBhdGguXG5cdCAqXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRwdWJsaWMgX2lDbGFzc2lmaWNhdGlvbjpzdHJpbmc7XG5cblxuXHQvKipcblx0ICogQW4gaWQgZm9yIHRoaXMgbWF0ZXJpYWwgdXNlZCB0byBzb3J0IHRoZSByZW5kZXJhYmxlcyBieSBzaGFkZXIgcHJvZ3JhbSwgd2hpY2ggcmVkdWNlcyBQcm9ncmFtIHN0YXRlIGNoYW5nZXMuXG5cdCAqXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRwdWJsaWMgX2lNYXRlcmlhbElkOm51bWJlciA9IDA7XG5cblx0cHVibGljIF9pQmFzZVNjcmVlblBhc3NJbmRleDpudW1iZXIgPSAwO1xuXG5cdHByaXZhdGUgX2JvdGhTaWRlczpib29sZWFuID0gZmFsc2U7IC8vIHVwZGF0ZVxuXHRwcml2YXRlIF9hbmltYXRpb25TZXQ6SUFuaW1hdGlvblNldDtcblxuXHQvKipcblx0ICogQSBsaXN0IG9mIG1hdGVyaWFsIG93bmVycywgcmVuZGVyYWJsZXMgb3IgY3VzdG9tIEVudGl0aWVzLlxuXHQgKi9cblx0cHJpdmF0ZSBfb3duZXJzOkFycmF5PElSZW5kZXJhYmxlT3duZXI+O1xuXG5cdHByaXZhdGUgX2FscGhhUHJlbXVsdGlwbGllZDpib29sZWFuO1xuXG5cdHB1YmxpYyBfcEJsZW5kTW9kZTpzdHJpbmcgPSBCbGVuZE1vZGUuTk9STUFMO1xuXG5cdHByaXZhdGUgX21pcG1hcDpib29sZWFuID0gdHJ1ZTtcblx0cHJpdmF0ZSBfc21vb3RoOmJvb2xlYW4gPSB0cnVlO1xuXHRwcml2YXRlIF9yZXBlYXQ6Ym9vbGVhbiA9IGZhbHNlO1xuXHRwcml2YXRlIF9jb2xvcjpudW1iZXIgPSAweEZGRkZGRjtcblx0cHVibGljIF9wVGV4dHVyZTpUZXh0dXJlMkRCYXNlO1xuXG5cdHB1YmxpYyBfcExpZ2h0UGlja2VyOkxpZ2h0UGlja2VyQmFzZTtcblxuXHRwdWJsaWMgX3BIZWlnaHQ6bnVtYmVyID0gMTtcblx0cHVibGljIF9wV2lkdGg6bnVtYmVyID0gMTtcblxuXHRwcml2YXRlIF9vbkxpZ2h0Q2hhbmdlRGVsZWdhdGU6KGV2ZW50OkV2ZW50KSA9PiB2b2lkO1xuXG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGFzc2V0VHlwZSgpOnN0cmluZ1xuXHR7XG5cdFx0cmV0dXJuIE1hdGVyaWFsQmFzZS5hc3NldFR5cGU7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlcyBhIG5ldyBNYXRlcmlhbEJhc2Ugb2JqZWN0LlxuXHQgKi9cblx0Y29uc3RydWN0b3IoKVxuXHR7XG5cdFx0c3VwZXIoKTtcblxuXHRcdHRoaXMuX2lNYXRlcmlhbElkID0gTnVtYmVyKHRoaXMuaWQpO1xuXG5cdFx0dGhpcy5fb3duZXJzID0gbmV3IEFycmF5PElSZW5kZXJhYmxlT3duZXI+KCk7XG5cblx0XHR0aGlzLl9vbkxpZ2h0Q2hhbmdlRGVsZWdhdGUgPSAoZXZlbnQ6RXZlbnQpID0+IHRoaXMub25MaWdodHNDaGFuZ2UoZXZlbnQpO1xuXG5cdFx0dGhpcy5hbHBoYVByZW11bHRpcGxpZWQgPSBmYWxzZTsgLy9UT0RPOiB3b3JrIG91dCB3aHkgdGhpcyBpcyBkaWZmZXJlbnQgZm9yIFdlYkdMXG5cdH1cblxuXHQvKipcblx0ICogVGhlIGFscGhhIG9mIHRoZSBzdXJmYWNlLlxuXHQgKi9cblx0cHVibGljIGdldCBhbHBoYSgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2FscGhhO1xuXHR9XG5cblx0cHVibGljIHNldCBhbHBoYSh2YWx1ZTpudW1iZXIpXG5cdHtcblx0XHRpZiAodmFsdWUgPiAxKVxuXHRcdFx0dmFsdWUgPSAxO1xuXHRcdGVsc2UgaWYgKHZhbHVlIDwgMClcblx0XHRcdHZhbHVlID0gMDtcblxuXHRcdGlmICh0aGlzLl9hbHBoYSA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX2FscGhhID0gdmFsdWU7XG5cblx0XHRpZiAodGhpcy5fY29sb3JUcmFuc2Zvcm0gPT0gbnVsbClcblx0XHRcdHRoaXMuX2NvbG9yVHJhbnNmb3JtID0gbmV3IENvbG9yVHJhbnNmb3JtKCk7XG5cblx0XHR0aGlzLl9jb2xvclRyYW5zZm9ybS5hbHBoYU11bHRpcGxpZXIgPSB2YWx1ZTtcblxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlUmVuZGVyT2JqZWN0KCk7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIENvbG9yVHJhbnNmb3JtIG9iamVjdCB0byB0cmFuc2Zvcm0gdGhlIGNvbG91ciBvZiB0aGUgbWF0ZXJpYWwgd2l0aC4gRGVmYXVsdHMgdG8gbnVsbC5cblx0ICovXG5cdHB1YmxpYyBnZXQgY29sb3JUcmFuc2Zvcm0oKTpDb2xvclRyYW5zZm9ybVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2NvbG9yVHJhbnNmb3JtO1xuXHR9XG5cblx0cHVibGljIHNldCBjb2xvclRyYW5zZm9ybSh2YWx1ZTpDb2xvclRyYW5zZm9ybSlcblx0e1xuXHRcdHRoaXMuX2NvbG9yVHJhbnNmb3JtID0gdmFsdWU7XG5cblx0XHR0aGlzLl9wSW52YWxpZGF0ZVJlbmRlck9iamVjdCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB3aGV0aGVyIG9yIG5vdCB0aGUgbWF0ZXJpYWwgaGFzIHRyYW5zcGFyZW5jeS4gSWYgYmluYXJ5IHRyYW5zcGFyZW5jeSBpcyBzdWZmaWNpZW50LCBmb3Jcblx0ICogZXhhbXBsZSB3aGVuIHVzaW5nIHRleHR1cmVzIG9mIGZvbGlhZ2UsIGNvbnNpZGVyIHVzaW5nIGFscGhhVGhyZXNob2xkIGluc3RlYWQuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGFscGhhQmxlbmRpbmcoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fYWxwaGFCbGVuZGluZztcblx0fVxuXG5cdHB1YmxpYyBzZXQgYWxwaGFCbGVuZGluZyh2YWx1ZTpib29sZWFuKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2FscGhhQmxlbmRpbmcgPT0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9hbHBoYUJsZW5kaW5nID0gdmFsdWU7XG5cblx0XHR0aGlzLl9wSW52YWxpZGF0ZVJlbmRlck9iamVjdCgpO1xuXHR9XG5cdFxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgaGVpZ2h0KCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcEhlaWdodDtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBhbmltYXRpb25TZXQoKTpJQW5pbWF0aW9uU2V0XG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fYW5pbWF0aW9uU2V0O1xuXHR9XG5cblxuXHQvKipcblx0ICogVGhlIGxpZ2h0IHBpY2tlciB1c2VkIGJ5IHRoZSBtYXRlcmlhbCB0byBwcm92aWRlIGxpZ2h0cyB0byB0aGUgbWF0ZXJpYWwgaWYgaXQgc3VwcG9ydHMgbGlnaHRpbmcuXG5cdCAqXG5cdCAqIEBzZWUgTGlnaHRQaWNrZXJCYXNlXG5cdCAqIEBzZWUgU3RhdGljTGlnaHRQaWNrZXJcblx0ICovXG5cdHB1YmxpYyBnZXQgbGlnaHRQaWNrZXIoKTpMaWdodFBpY2tlckJhc2Vcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wTGlnaHRQaWNrZXI7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGxpZ2h0UGlja2VyKHZhbHVlOkxpZ2h0UGlja2VyQmFzZSlcblx0e1xuXHRcdGlmICh0aGlzLl9wTGlnaHRQaWNrZXIgPT0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHRpZiAodGhpcy5fcExpZ2h0UGlja2VyKVxuXHRcdFx0dGhpcy5fcExpZ2h0UGlja2VyLnJlbW92ZUV2ZW50TGlzdGVuZXIoRXZlbnQuQ0hBTkdFLCB0aGlzLl9vbkxpZ2h0Q2hhbmdlRGVsZWdhdGUpO1xuXG5cdFx0dGhpcy5fcExpZ2h0UGlja2VyID0gdmFsdWU7XG5cblx0XHRpZiAodGhpcy5fcExpZ2h0UGlja2VyKVxuXHRcdFx0dGhpcy5fcExpZ2h0UGlja2VyLmFkZEV2ZW50TGlzdGVuZXIoRXZlbnQuQ0hBTkdFLCB0aGlzLl9vbkxpZ2h0Q2hhbmdlRGVsZWdhdGUpO1xuXG5cdFx0dGhpcy5fcEludmFsaWRhdGVSZW5kZXJPYmplY3QoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgd2hldGhlciBvciBub3QgYW55IHVzZWQgdGV4dHVyZXMgc2hvdWxkIHVzZSBtaXBtYXBwaW5nLiBEZWZhdWx0cyB0byB0cnVlLlxuXHQgKi9cblx0cHVibGljIGdldCBtaXBtYXAoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fbWlwbWFwO1xuXHR9XG5cblx0cHVibGljIHNldCBtaXBtYXAodmFsdWU6Ym9vbGVhbilcblx0e1xuXHRcdGlmICh0aGlzLl9taXBtYXAgPT0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9taXBtYXAgPSB2YWx1ZTtcblxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlUGFzc2VzKCk7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHdoZXRoZXIgb3Igbm90IGFueSB1c2VkIHRleHR1cmVzIHNob3VsZCB1c2Ugc21vb3RoaW5nLiBEZWZhdWx0cyB0byB0cnVlLlxuXHQgKi9cblx0cHVibGljIGdldCBzbW9vdGgoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fc21vb3RoO1xuXHR9XG5cblx0cHVibGljIHNldCBzbW9vdGgodmFsdWU6Ym9vbGVhbilcblx0e1xuXHRcdGlmICh0aGlzLl9zbW9vdGggPT0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9zbW9vdGggPSB2YWx1ZTtcblxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlUGFzc2VzKCk7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHdoZXRoZXIgb3Igbm90IGFueSB1c2VkIHRleHR1cmVzIHNob3VsZCBiZSB0aWxlZC4gSWYgc2V0IHRvIGZhbHNlLCB0ZXh0dXJlIHNhbXBsZXMgYXJlIGNsYW1wZWQgdG9cblx0ICogdGhlIHRleHR1cmUncyBib3JkZXJzIHdoZW4gdGhlIHV2IGNvb3JkaW5hdGVzIGFyZSBvdXRzaWRlIHRoZSBbMCwgMV0gaW50ZXJ2YWwuIERlZmF1bHRzIHRvIGZhbHNlLlxuXHQgKi9cblx0cHVibGljIGdldCByZXBlYXQoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcmVwZWF0O1xuXHR9XG5cblx0cHVibGljIHNldCByZXBlYXQodmFsdWU6Ym9vbGVhbilcblx0e1xuXHRcdGlmICh0aGlzLl9yZXBlYXQgPT0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9yZXBlYXQgPSB2YWx1ZTtcblxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlUGFzc2VzKCk7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIGRpZmZ1c2UgcmVmbGVjdGl2aXR5IGNvbG9yIG9mIHRoZSBzdXJmYWNlLlxuXHQgKi9cblx0cHVibGljIGdldCBjb2xvcigpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2NvbG9yO1xuXHR9XG5cblx0cHVibGljIHNldCBjb2xvcih2YWx1ZTpudW1iZXIpXG5cdHtcblx0XHRpZiAodGhpcy5fY29sb3IgPT0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9jb2xvciA9IHZhbHVlO1xuXG5cdFx0dGhpcy5fcEludmFsaWRhdGVQYXNzZXMoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgdGV4dHVyZSBvYmplY3QgdG8gdXNlIGZvciB0aGUgYWxiZWRvIGNvbG91ci5cblx0ICovXG5cdHB1YmxpYyBnZXQgdGV4dHVyZSgpOlRleHR1cmUyREJhc2Vcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wVGV4dHVyZTtcblx0fVxuXG5cdHB1YmxpYyBzZXQgdGV4dHVyZSh2YWx1ZTpUZXh0dXJlMkRCYXNlKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3BUZXh0dXJlID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fcFRleHR1cmUgPSB2YWx1ZTtcblxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlUGFzc2VzKCk7XG5cblx0XHR0aGlzLl9wSGVpZ2h0ID0gdGhpcy5fcFRleHR1cmUuaGVpZ2h0O1xuXHRcdHRoaXMuX3BXaWR0aCA9IHRoaXMuX3BUZXh0dXJlLndpZHRoO1xuXG5cdFx0dGhpcy5fcE5vdGlmeVNpemVDaGFuZ2VkKCk7XG5cdH1cblxuXHQvKipcblx0ICogU3BlY2lmaWVzIHdoZXRoZXIgb3Igbm90IHRoZSBVViBjb29yZGluYXRlcyBzaG91bGQgYmUgYW5pbWF0ZWQgdXNpbmcgYSB0cmFuc2Zvcm1hdGlvbiBtYXRyaXguXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGFuaW1hdGVVVnMoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcEFuaW1hdGVVVnM7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGFuaW1hdGVVVnModmFsdWU6Ym9vbGVhbilcblx0e1xuXHRcdGlmICh0aGlzLl9wQW5pbWF0ZVVWcyA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3BBbmltYXRlVVZzID0gdmFsdWU7XG5cblx0XHR0aGlzLl9wSW52YWxpZGF0ZVBhc3NlcygpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFdoZXRoZXIgb3Igbm90IHRvIHVzZSBmYWxsT2ZmIGFuZCByYWRpdXMgcHJvcGVydGllcyBmb3IgbGlnaHRzLiBUaGlzIGNhbiBiZSB1c2VkIHRvIGltcHJvdmUgcGVyZm9ybWFuY2UgYW5kXG5cdCAqIGNvbXBhdGliaWxpdHkgZm9yIGNvbnN0cmFpbmVkIG1vZGUuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGVuYWJsZUxpZ2h0RmFsbE9mZigpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9lbmFibGVMaWdodEZhbGxPZmY7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGVuYWJsZUxpZ2h0RmFsbE9mZih2YWx1ZTpib29sZWFuKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2VuYWJsZUxpZ2h0RmFsbE9mZiA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX2VuYWJsZUxpZ2h0RmFsbE9mZiA9IHZhbHVlO1xuXG5cdFx0dGhpcy5fcEludmFsaWRhdGVQYXNzZXMoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBEZWZpbmUgd2hpY2ggbGlnaHQgc291cmNlIHR5cGVzIHRvIHVzZSBmb3IgZGlmZnVzZSByZWZsZWN0aW9ucy4gVGhpcyBhbGxvd3MgY2hvb3NpbmcgYmV0d2VlbiByZWd1bGFyIGxpZ2h0c1xuXHQgKiBhbmQvb3IgbGlnaHQgcHJvYmVzIGZvciBkaWZmdXNlIHJlZmxlY3Rpb25zLlxuXHQgKlxuXHQgKiBAc2VlIGF3YXkzZC5tYXRlcmlhbHMuTGlnaHRTb3VyY2VzXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGRpZmZ1c2VMaWdodFNvdXJjZXMoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9kaWZmdXNlTGlnaHRTb3VyY2VzO1xuXHR9XG5cblx0cHVibGljIHNldCBkaWZmdXNlTGlnaHRTb3VyY2VzKHZhbHVlOm51bWJlcilcblx0e1xuXHRcdGlmICh0aGlzLl9kaWZmdXNlTGlnaHRTb3VyY2VzID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fZGlmZnVzZUxpZ2h0U291cmNlcyA9IHZhbHVlO1xuXG5cdFx0dGhpcy5fcEludmFsaWRhdGVQYXNzZXMoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBEZWZpbmUgd2hpY2ggbGlnaHQgc291cmNlIHR5cGVzIHRvIHVzZSBmb3Igc3BlY3VsYXIgcmVmbGVjdGlvbnMuIFRoaXMgYWxsb3dzIGNob29zaW5nIGJldHdlZW4gcmVndWxhciBsaWdodHNcblx0ICogYW5kL29yIGxpZ2h0IHByb2JlcyBmb3Igc3BlY3VsYXIgcmVmbGVjdGlvbnMuXG5cdCAqXG5cdCAqIEBzZWUgYXdheTNkLm1hdGVyaWFscy5MaWdodFNvdXJjZXNcblx0ICovXG5cdHB1YmxpYyBnZXQgc3BlY3VsYXJMaWdodFNvdXJjZXMoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9zcGVjdWxhckxpZ2h0U291cmNlcztcblx0fVxuXG5cdHB1YmxpYyBzZXQgc3BlY3VsYXJMaWdodFNvdXJjZXModmFsdWU6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3NwZWN1bGFyTGlnaHRTb3VyY2VzID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fc3BlY3VsYXJMaWdodFNvdXJjZXMgPSB2YWx1ZTtcblxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlUGFzc2VzKCk7XG5cdH1cblxuXHQvKipcblx0ICogQ2xlYW5zIHVwIHJlc291cmNlcyBvd25lZCBieSB0aGUgbWF0ZXJpYWwsIGluY2x1ZGluZyBwYXNzZXMuIFRleHR1cmVzIGFyZSBub3Qgb3duZWQgYnkgdGhlIG1hdGVyaWFsIHNpbmNlIHRoZXlcblx0ICogY291bGQgYmUgdXNlZCBieSBvdGhlciBtYXRlcmlhbHMgYW5kIHdpbGwgbm90IGJlIGRpc3Bvc2VkLlxuXHQgKi9cblx0cHVibGljIGRpc3Bvc2UoKVxuXHR7XG5cdFx0dmFyIGk6bnVtYmVyO1xuXHRcdHZhciBsZW46bnVtYmVyO1xuXG5cdFx0bGVuID0gdGhpcy5fcmVuZGVyT2JqZWN0cy5sZW5ndGg7XG5cdFx0Zm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKVxuXHRcdFx0dGhpcy5fcmVuZGVyT2JqZWN0c1tpXS5kaXNwb3NlKCk7XG5cblx0XHR0aGlzLl9yZW5kZXJPYmplY3RzID0gbmV3IEFycmF5PElSZW5kZXJPYmplY3Q+KCk7XG5cdH1cblxuXHQvKipcblx0ICogRGVmaW5lcyB3aGV0aGVyIG9yIG5vdCB0aGUgbWF0ZXJpYWwgc2hvdWxkIGN1bGwgdHJpYW5nbGVzIGZhY2luZyBhd2F5IGZyb20gdGhlIGNhbWVyYS5cblx0ICovXG5cdHB1YmxpYyBnZXQgYm90aFNpZGVzKCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2JvdGhTaWRlcztcblx0fVxuXG5cdHB1YmxpYyBzZXQgYm90aFNpZGVzKHZhbHVlOmJvb2xlYW4pXG5cdHtcblx0XHRpZiAodGhpcy5fYm90aFNpZGVzID0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9ib3RoU2lkZXMgPSB2YWx1ZTtcblxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlUGFzc2VzKCk7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIGJsZW5kIG1vZGUgdG8gdXNlIHdoZW4gZHJhd2luZyB0aGlzIHJlbmRlcmFibGUuIFRoZSBmb2xsb3dpbmcgYmxlbmQgbW9kZXMgYXJlIHN1cHBvcnRlZDpcblx0ICogPHVsPlxuXHQgKiA8bGk+QmxlbmRNb2RlLk5PUk1BTDogTm8gYmxlbmRpbmcsIHVubGVzcyB0aGUgbWF0ZXJpYWwgaW5oZXJlbnRseSBuZWVkcyBpdDwvbGk+XG5cdCAqIDxsaT5CbGVuZE1vZGUuTEFZRVI6IEZvcmNlIGJsZW5kaW5nLiBUaGlzIHdpbGwgZHJhdyB0aGUgb2JqZWN0IHRoZSBzYW1lIGFzIE5PUk1BTCwgYnV0IHdpdGhvdXQgd3JpdGluZyBkZXB0aCB3cml0ZXMuPC9saT5cblx0ICogPGxpPkJsZW5kTW9kZS5NVUxUSVBMWTwvbGk+XG5cdCAqIDxsaT5CbGVuZE1vZGUuQUREPC9saT5cblx0ICogPGxpPkJsZW5kTW9kZS5BTFBIQTwvbGk+XG5cdCAqIDwvdWw+XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGJsZW5kTW9kZSgpOnN0cmluZ1xuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BCbGVuZE1vZGU7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGJsZW5kTW9kZSh2YWx1ZTpzdHJpbmcpXG5cdHtcblx0XHRpZiAodGhpcy5fcEJsZW5kTW9kZSA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3BCbGVuZE1vZGUgPSB2YWx1ZTtcblxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlUmVuZGVyT2JqZWN0KCk7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHdoZXRoZXIgdmlzaWJsZSB0ZXh0dXJlcyAob3Igb3RoZXIgcGl4ZWxzKSB1c2VkIGJ5IHRoaXMgbWF0ZXJpYWwgaGF2ZVxuXHQgKiBhbHJlYWR5IGJlZW4gcHJlbXVsdGlwbGllZC4gVG9nZ2xlIHRoaXMgaWYgeW91IGFyZSBzZWVpbmcgYmxhY2sgaGFsb3MgYXJvdW5kIHlvdXJcblx0ICogYmxlbmRlZCBhbHBoYSBlZGdlcy5cblx0ICovXG5cdHB1YmxpYyBnZXQgYWxwaGFQcmVtdWx0aXBsaWVkKCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2FscGhhUHJlbXVsdGlwbGllZDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgYWxwaGFQcmVtdWx0aXBsaWVkKHZhbHVlOmJvb2xlYW4pXG5cdHtcblx0XHRpZiAodGhpcy5fYWxwaGFQcmVtdWx0aXBsaWVkID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fYWxwaGFQcmVtdWx0aXBsaWVkID0gdmFsdWU7XG5cblx0XHR0aGlzLl9wSW52YWxpZGF0ZVBhc3NlcygpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBtaW5pbXVtIGFscGhhIHZhbHVlIGZvciB3aGljaCBwaXhlbHMgc2hvdWxkIGJlIGRyYXduLiBUaGlzIGlzIHVzZWQgZm9yIHRyYW5zcGFyZW5jeSB0aGF0IGlzIGVpdGhlclxuXHQgKiBpbnZpc2libGUgb3IgZW50aXJlbHkgb3BhcXVlLCBvZnRlbiB1c2VkIHdpdGggdGV4dHVyZXMgZm9yIGZvbGlhZ2UsIGV0Yy5cblx0ICogUmVjb21tZW5kZWQgdmFsdWVzIGFyZSAwIHRvIGRpc2FibGUgYWxwaGEsIG9yIDAuNSB0byBjcmVhdGUgc21vb3RoIGVkZ2VzLiBEZWZhdWx0IHZhbHVlIGlzIDAgKGRpc2FibGVkKS5cblx0ICovXG5cdHB1YmxpYyBnZXQgYWxwaGFUaHJlc2hvbGQoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wQWxwaGFUaHJlc2hvbGQ7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGFscGhhVGhyZXNob2xkKHZhbHVlOm51bWJlcilcblx0e1xuXHRcdGlmICh2YWx1ZSA8IDApXG5cdFx0XHR2YWx1ZSA9IDA7XG5cdFx0ZWxzZSBpZiAodmFsdWUgPiAxKVxuXHRcdFx0dmFsdWUgPSAxO1xuXG5cdFx0aWYgKHRoaXMuX3BBbHBoYVRocmVzaG9sZCA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3BBbHBoYVRocmVzaG9sZCA9IHZhbHVlO1xuXG5cdFx0dGhpcy5fcEludmFsaWRhdGVQYXNzZXMoKTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCB3aWR0aCgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BXaWR0aDtcblx0fVxuXG5cdC8vXG5cdC8vIE1BVEVSSUFMIE1BTkFHRU1FTlRcblx0Ly9cblx0LyoqXG5cdCAqIE1hcmsgYW4gSVJlbmRlcmFibGVPd25lciBhcyBvd25lciBvZiB0aGlzIG1hdGVyaWFsLlxuXHQgKiBBc3N1cmVzIHdlJ3JlIG5vdCB1c2luZyB0aGUgc2FtZSBtYXRlcmlhbCBhY3Jvc3MgcmVuZGVyYWJsZXMgd2l0aCBkaWZmZXJlbnQgYW5pbWF0aW9ucywgc2luY2UgdGhlXG5cdCAqIFByb2dyYW1zIGRlcGVuZCBvbiBhbmltYXRpb24uIFRoaXMgbWV0aG9kIG5lZWRzIHRvIGJlIGNhbGxlZCB3aGVuIGEgbWF0ZXJpYWwgaXMgYXNzaWduZWQuXG5cdCAqXG5cdCAqIEBwYXJhbSBvd25lciBUaGUgSVJlbmRlcmFibGVPd25lciB0aGF0IGhhZCB0aGlzIG1hdGVyaWFsIGFzc2lnbmVkXG5cdCAqXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHVibGljIGlBZGRPd25lcihvd25lcjpJUmVuZGVyYWJsZU93bmVyKVxuXHR7XG5cdFx0dGhpcy5fb3duZXJzLnB1c2gob3duZXIpO1xuXG5cdFx0dmFyIGFuaW1hdGlvblNldDpJQW5pbWF0aW9uU2V0O1xuXHRcdHZhciBhbmltYXRvcjpJQW5pbWF0b3IgPSA8SUFuaW1hdG9yPiBvd25lci5hbmltYXRvcjtcblxuXHRcdGlmIChhbmltYXRvcilcblx0XHRcdGFuaW1hdGlvblNldCA9IDxJQW5pbWF0aW9uU2V0PiBhbmltYXRvci5hbmltYXRpb25TZXQ7XG5cblx0XHRpZiAob3duZXIuYW5pbWF0b3IpIHtcblx0XHRcdGlmICh0aGlzLl9hbmltYXRpb25TZXQgJiYgYW5pbWF0aW9uU2V0ICE9IHRoaXMuX2FuaW1hdGlvblNldCkge1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJBIE1hdGVyaWFsIGluc3RhbmNlIGNhbm5vdCBiZSBzaGFyZWQgYWNyb3NzIG1hdGVyaWFsIG93bmVycyB3aXRoIGRpZmZlcmVudCBhbmltYXRpb24gc2V0c1wiKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmICh0aGlzLl9hbmltYXRpb25TZXQgIT0gYW5pbWF0aW9uU2V0KSB7XG5cblx0XHRcdFx0XHR0aGlzLl9hbmltYXRpb25TZXQgPSBhbmltYXRpb25TZXQ7XG5cblx0XHRcdFx0XHR0aGlzLmludmFsaWRhdGVBbmltYXRpb24oKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdG93bmVyLmRpc3BhdGNoRXZlbnQobmV3IFJlbmRlcmFibGVPd25lckV2ZW50KFJlbmRlcmFibGVPd25lckV2ZW50LlJFTkRFUl9PQkpFQ1RfT1dORVJfVVBEQVRFRCwgdGhpcykpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlbW92ZXMgYW4gSVJlbmRlcmFibGVPd25lciBhcyBvd25lci5cblx0ICogQHBhcmFtIG93bmVyXG5cdCAqXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHVibGljIGlSZW1vdmVPd25lcihvd25lcjpJUmVuZGVyYWJsZU93bmVyKVxuXHR7XG5cdFx0dGhpcy5fb3duZXJzLnNwbGljZSh0aGlzLl9vd25lcnMuaW5kZXhPZihvd25lciksIDEpO1xuXG5cdFx0aWYgKHRoaXMuX293bmVycy5sZW5ndGggPT0gMCkge1xuXHRcdFx0dGhpcy5fYW5pbWF0aW9uU2V0ID0gbnVsbDtcblxuXHRcdFx0dGhpcy5pbnZhbGlkYXRlQW5pbWF0aW9uKCk7XG5cdFx0fVxuXG5cdFx0b3duZXIuZGlzcGF0Y2hFdmVudChuZXcgUmVuZGVyYWJsZU93bmVyRXZlbnQoUmVuZGVyYWJsZU93bmVyRXZlbnQuUkVOREVSX09CSkVDVF9PV05FUl9VUERBVEVELCB0aGlzKSk7XG5cdH1cblxuXHQvKipcblx0ICogQSBsaXN0IG9mIHRoZSBJUmVuZGVyYWJsZU93bmVycyB0aGF0IHVzZSB0aGlzIG1hdGVyaWFsXG5cdCAqXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGlPd25lcnMoKTpBcnJheTxJUmVuZGVyYWJsZU93bmVyPlxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX293bmVycztcblx0fVxuXG5cdC8qKlxuXHQgKiBNYXJrcyB0aGUgc2hhZGVyIHByb2dyYW1zIGZvciBhbGwgcGFzc2VzIGFzIGludmFsaWQsIHNvIHRoZXkgd2lsbCBiZSByZWNvbXBpbGVkIGJlZm9yZSB0aGUgbmV4dCB1c2UuXG5cdCAqXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRwdWJsaWMgX3BJbnZhbGlkYXRlUGFzc2VzKClcblx0e1xuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fcmVuZGVyT2JqZWN0cy5sZW5ndGg7XG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgbGVuOyBpKyspXG5cdFx0XHR0aGlzLl9yZW5kZXJPYmplY3RzW2ldLmludmFsaWRhdGVQYXNzZXMoKTtcblx0fVxuXG5cdHByaXZhdGUgaW52YWxpZGF0ZUFuaW1hdGlvbigpXG5cdHtcblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX3JlbmRlck9iamVjdHMubGVuZ3RoO1xuXHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IGxlbjsgaSsrKVxuXHRcdFx0dGhpcy5fcmVuZGVyT2JqZWN0c1tpXS5pbnZhbGlkYXRlQW5pbWF0aW9uKCk7XG5cdH1cblx0XG5cdHB1YmxpYyBfcEludmFsaWRhdGVSZW5kZXJPYmplY3QoKVxuXHR7XG5cdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9yZW5kZXJPYmplY3RzLmxlbmd0aDtcblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBsZW47IGkrKylcblx0XHRcdHRoaXMuX3JlbmRlck9iamVjdHNbaV0uaW52YWxpZGF0ZVJlbmRlck9iamVjdCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENhbGxlZCB3aGVuIHRoZSBsaWdodCBwaWNrZXIncyBjb25maWd1cmF0aW9uIGNoYW5nZWQuXG5cdCAqL1xuXHRwcml2YXRlIG9uTGlnaHRzQ2hhbmdlKGV2ZW50OkV2ZW50KVxuXHR7XG5cdFx0dGhpcy5fcEludmFsaWRhdGVSZW5kZXJPYmplY3QoKTtcblx0fVxuXG5cdHB1YmxpYyBfcE5vdGlmeVNpemVDaGFuZ2VkKClcblx0e1xuXHRcdGlmICghdGhpcy5fc2l6ZUNoYW5nZWQpXG5cdFx0XHR0aGlzLl9zaXplQ2hhbmdlZCA9IG5ldyBNYXRlcmlhbEV2ZW50KE1hdGVyaWFsRXZlbnQuU0laRV9DSEFOR0VEKTtcblxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCh0aGlzLl9zaXplQ2hhbmdlZCk7XG5cdH1cblxuXHRwdWJsaWMgX2lBZGRSZW5kZXJPYmplY3QocmVuZGVyT2JqZWN0OklSZW5kZXJPYmplY3QpOklSZW5kZXJPYmplY3Rcblx0e1xuXHRcdHRoaXMuX3JlbmRlck9iamVjdHMucHVzaChyZW5kZXJPYmplY3QpO1xuXG5cdFx0cmV0dXJuIHJlbmRlck9iamVjdDtcblx0fVxuXG5cdHB1YmxpYyBfaVJlbW92ZVJlbmRlck9iamVjdChyZW5kZXJPYmplY3Q6SVJlbmRlck9iamVjdCk6SVJlbmRlck9iamVjdFxuXHR7XG5cdFx0dGhpcy5fcmVuZGVyT2JqZWN0cy5zcGxpY2UodGhpcy5fcmVuZGVyT2JqZWN0cy5pbmRleE9mKHJlbmRlck9iamVjdCksIDEpO1xuXG5cdFx0cmV0dXJuIHJlbmRlck9iamVjdDtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcGFyYW0gcmVuZGVyZXJcblx0ICpcblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwdWJsaWMgZ2V0UmVuZGVyT2JqZWN0KHJlbmRlcmFibGVQb29sOklSZW5kZXJhYmxlUG9vbCk6SVJlbmRlck9iamVjdFxuXHR7XG5cdFx0dGhyb3cgbmV3IEFic3RyYWN0TWV0aG9kRXJyb3IoKTtcblx0fVxufVxuXG5leHBvcnQgPSBNYXRlcmlhbEJhc2U7Il19