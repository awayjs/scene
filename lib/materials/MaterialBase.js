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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9tYXRlcmlhbHMvTWF0ZXJpYWxCYXNlLnRzIl0sIm5hbWVzIjpbIk1hdGVyaWFsQmFzZSIsIk1hdGVyaWFsQmFzZS5jb25zdHJ1Y3RvciIsIk1hdGVyaWFsQmFzZS5hc3NldFR5cGUiLCJNYXRlcmlhbEJhc2UuYWxwaGEiLCJNYXRlcmlhbEJhc2UuY29sb3JUcmFuc2Zvcm0iLCJNYXRlcmlhbEJhc2UuYWxwaGFCbGVuZGluZyIsIk1hdGVyaWFsQmFzZS5oZWlnaHQiLCJNYXRlcmlhbEJhc2UuYW5pbWF0aW9uU2V0IiwiTWF0ZXJpYWxCYXNlLmxpZ2h0UGlja2VyIiwiTWF0ZXJpYWxCYXNlLm1pcG1hcCIsIk1hdGVyaWFsQmFzZS5zbW9vdGgiLCJNYXRlcmlhbEJhc2UucmVwZWF0IiwiTWF0ZXJpYWxCYXNlLmNvbG9yIiwiTWF0ZXJpYWxCYXNlLnRleHR1cmUiLCJNYXRlcmlhbEJhc2UuYW5pbWF0ZVVWcyIsIk1hdGVyaWFsQmFzZS5lbmFibGVMaWdodEZhbGxPZmYiLCJNYXRlcmlhbEJhc2UuZGlmZnVzZUxpZ2h0U291cmNlcyIsIk1hdGVyaWFsQmFzZS5zcGVjdWxhckxpZ2h0U291cmNlcyIsIk1hdGVyaWFsQmFzZS5kaXNwb3NlIiwiTWF0ZXJpYWxCYXNlLmJvdGhTaWRlcyIsIk1hdGVyaWFsQmFzZS5ibGVuZE1vZGUiLCJNYXRlcmlhbEJhc2UuYWxwaGFQcmVtdWx0aXBsaWVkIiwiTWF0ZXJpYWxCYXNlLmFscGhhVGhyZXNob2xkIiwiTWF0ZXJpYWxCYXNlLndpZHRoIiwiTWF0ZXJpYWxCYXNlLmlBZGRPd25lciIsIk1hdGVyaWFsQmFzZS5pUmVtb3ZlT3duZXIiLCJNYXRlcmlhbEJhc2UuaU93bmVycyIsIk1hdGVyaWFsQmFzZS5fcEludmFsaWRhdGVQYXNzZXMiLCJNYXRlcmlhbEJhc2UuaW52YWxpZGF0ZUFuaW1hdGlvbiIsIk1hdGVyaWFsQmFzZS5fcEludmFsaWRhdGVSZW5kZXJPYmplY3QiLCJNYXRlcmlhbEJhc2Uub25MaWdodHNDaGFuZ2UiLCJNYXRlcmlhbEJhc2UuX3BOb3RpZnlTaXplQ2hhbmdlZCIsIk1hdGVyaWFsQmFzZS5faUFkZFJlbmRlck9iamVjdCIsIk1hdGVyaWFsQmFzZS5faVJlbW92ZVJlbmRlck9iamVjdCIsIk1hdGVyaWFsQmFzZS5nZXRSZW5kZXJPYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQU8sU0FBUyxXQUFlLGdDQUFnQyxDQUFDLENBQUM7QUFDakUsSUFBTyxjQUFjLFdBQWMscUNBQXFDLENBQUMsQ0FBQztBQUUxRSxJQUFPLG1CQUFtQixXQUFhLDRDQUE0QyxDQUFDLENBQUM7QUFDckYsSUFBTyxLQUFLLFdBQWdCLDhCQUE4QixDQUFDLENBQUM7QUFFNUQsSUFBTyxTQUFTLFdBQWUsbUNBQW1DLENBQUMsQ0FBQztBQVVwRSxJQUFPLGFBQWEsV0FBYyx5Q0FBeUMsQ0FBQyxDQUFDO0FBQzdFLElBQU8sb0JBQW9CLFdBQWEsZ0RBQWdELENBQUMsQ0FBQztBQUsxRixBQVdBOzs7Ozs7Ozs7O0dBREc7SUFDRyxZQUFZO0lBQVNBLFVBQXJCQSxZQUFZQSxVQUFrQkE7SUEyRW5DQTs7T0FFR0E7SUFDSEEsU0E5RUtBLFlBQVlBO1FBQWxCQyxpQkF5bUJDQTtRQXpoQkNBLGlCQUFPQSxDQUFDQTtRQTNFREEsbUJBQWNBLEdBQVdBLEtBQUtBLENBQUNBO1FBQy9CQSxXQUFNQSxHQUFVQSxDQUFDQSxDQUFDQTtRQUdsQkEsbUJBQWNBLEdBQXdCQSxJQUFJQSxLQUFLQSxFQUFpQkEsQ0FBQ0E7UUFFbEVBLHFCQUFnQkEsR0FBVUEsQ0FBQ0EsQ0FBQ0E7UUFDNUJBLGlCQUFZQSxHQUFXQSxLQUFLQSxDQUFDQTtRQUM1QkEsd0JBQW1CQSxHQUFXQSxJQUFJQSxDQUFDQTtRQUNuQ0EsMEJBQXFCQSxHQUFVQSxJQUFJQSxDQUFDQTtRQUNwQ0EseUJBQW9CQSxHQUFVQSxJQUFJQSxDQUFDQTtRQWlCM0NBOzs7O1dBSUdBO1FBQ0lBLGlCQUFZQSxHQUFVQSxDQUFDQSxDQUFDQTtRQUV4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QUFhQSxDQUFDQSxhQUFhQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQTtRQUVuRUEsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0E7SUFDdkNBLENBQUNBO0lBRU0vQix3Q0FBaUJBLEdBQXhCQSxVQUF5QkEsWUFBMEJBO1FBRWxEZ0MsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0E7UUFFdkNBLE1BQU1BLENBQUNBLFlBQVlBLENBQUNBO0lBQ3JCQSxDQUFDQTtJQUVNaEMsMkNBQW9CQSxHQUEzQkEsVUFBNEJBLFlBQTBCQTtRQUVyRGlDLElBQUlBLENBQUNBLGNBQWNBLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLGNBQWNBLENBQUNBLE9BQU9BLENBQUNBLFlBQVlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO1FBRXpFQSxNQUFNQSxDQUFDQSxZQUFZQSxDQUFDQTtJQUNyQkEsQ0FBQ0E7SUFFRGpDOzs7OztPQUtHQTtJQUNJQSxzQ0FBZUEsR0FBdEJBLFVBQXVCQSxjQUE4QkE7UUFFcERrQyxNQUFNQSxJQUFJQSxtQkFBbUJBLEVBQUVBLENBQUNBO0lBQ2pDQSxDQUFDQTtJQXRtQmFsQyxzQkFBU0EsR0FBVUEsa0JBQWtCQSxDQUFDQTtJQXVtQnJEQSxtQkFBQ0E7QUFBREEsQ0F6bUJBLEFBeW1CQ0EsRUF6bUIwQixTQUFTLEVBeW1CbkM7QUFFRCxBQUFzQixpQkFBYixZQUFZLENBQUMiLCJmaWxlIjoibWF0ZXJpYWxzL01hdGVyaWFsQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmxlbmRNb2RlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9kYXRhL0JsZW5kTW9kZVwiKTtcclxuaW1wb3J0IENvbG9yVHJhbnNmb3JtXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9Db2xvclRyYW5zZm9ybVwiKTtcclxuaW1wb3J0IE1hdHJpeDNEXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vTWF0cml4M0RcIik7XHJcbmltcG9ydCBBYnN0cmFjdE1ldGhvZEVycm9yXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2Vycm9ycy9BYnN0cmFjdE1ldGhvZEVycm9yXCIpO1xyXG5pbXBvcnQgRXZlbnRcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0V2ZW50XCIpO1xyXG5pbXBvcnQgSUFzc2V0XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvSUFzc2V0XCIpO1xyXG5pbXBvcnQgQXNzZXRCYXNlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0Fzc2V0QmFzZVwiKTtcclxuaW1wb3J0IFRleHR1cmUyREJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi90ZXh0dXJlcy9UZXh0dXJlMkRCYXNlXCIpO1xyXG5cclxuaW1wb3J0IElBbmltYXRpb25TZXRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9hbmltYXRvcnMvSUFuaW1hdGlvblNldFwiKTtcclxuaW1wb3J0IElBbmltYXRvclx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYW5pbWF0b3JzL0lBbmltYXRvclwiKTtcclxuaW1wb3J0IElSZW5kZXJPYmplY3RPd25lclx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0lSZW5kZXJPYmplY3RPd25lclwiKTtcclxuaW1wb3J0IElSZW5kZXJhYmxlT3duZXJcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0lSZW5kZXJhYmxlT3duZXJcIik7XHJcbmltcG9ydCBJUmVuZGVyT2JqZWN0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcG9vbC9JUmVuZGVyT2JqZWN0XCIpO1xyXG5pbXBvcnQgSVJlbmRlcmFibGVQb29sXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcG9vbC9JUmVuZGVyYWJsZVBvb2xcIik7XHJcbmltcG9ydCBDYW1lcmFcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZW50aXRpZXMvQ2FtZXJhXCIpO1xyXG5pbXBvcnQgTWF0ZXJpYWxFdmVudFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2V2ZW50cy9NYXRlcmlhbEV2ZW50XCIpO1xyXG5pbXBvcnQgUmVuZGVyYWJsZU93bmVyRXZlbnRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZXZlbnRzL1JlbmRlcmFibGVPd25lckV2ZW50XCIpO1xyXG5pbXBvcnQgTGlnaHRQaWNrZXJCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvbWF0ZXJpYWxzL2xpZ2h0cGlja2Vycy9MaWdodFBpY2tlckJhc2VcIik7XHJcbmltcG9ydCBJUmVuZGVyZXJcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3JlbmRlci9JUmVuZGVyZXJcIik7XHJcblxyXG5cclxuLyoqXHJcbiAqIE1hdGVyaWFsQmFzZSBmb3JtcyBhbiBhYnN0cmFjdCBiYXNlIGNsYXNzIGZvciBhbnkgbWF0ZXJpYWwuXHJcbiAqIEEgbWF0ZXJpYWwgY29uc2lzdHMgb2Ygc2V2ZXJhbCBwYXNzZXMsIGVhY2ggb2Ygd2hpY2ggY29uc3RpdHV0ZXMgYXQgbGVhc3Qgb25lIHJlbmRlciBjYWxsLiBTZXZlcmFsIHBhc3NlcyBjb3VsZFxyXG4gKiBiZSB1c2VkIGZvciBzcGVjaWFsIGVmZmVjdHMgKHJlbmRlciBsaWdodGluZyBmb3IgbWFueSBsaWdodHMgaW4gc2V2ZXJhbCBwYXNzZXMsIHJlbmRlciBhbiBvdXRsaW5lIGluIGEgc2VwYXJhdGVcclxuICogcGFzcykgb3IgdG8gcHJvdmlkZSBhZGRpdGlvbmFsIHJlbmRlci10by10ZXh0dXJlIHBhc3NlcyAocmVuZGVyaW5nIGRpZmZ1c2UgbGlnaHQgdG8gdGV4dHVyZSBmb3IgdGV4dHVyZS1zcGFjZVxyXG4gKiBzdWJzdXJmYWNlIHNjYXR0ZXJpbmcsIG9yIHJlbmRlcmluZyBhIGRlcHRoIG1hcCBmb3Igc3BlY2lhbGl6ZWQgc2VsZi1zaGFkb3dpbmcpLlxyXG4gKlxyXG4gKiBBd2F5M0QgcHJvdmlkZXMgZGVmYXVsdCBtYXRlcmlhbHMgdHJvdWdoIFNpbmdsZVBhc3NNYXRlcmlhbEJhc2UgYW5kIFRyaWFuZ2xlTWF0ZXJpYWwsIHdoaWNoIHVzZSBtb2R1bGFyXHJcbiAqIG1ldGhvZHMgdG8gYnVpbGQgdGhlIHNoYWRlciBjb2RlLiBNYXRlcmlhbEJhc2UgY2FuIGJlIGV4dGVuZGVkIHRvIGJ1aWxkIHNwZWNpZmljIGFuZCBoaWdoLXBlcmZvcm1hbnQgY3VzdG9tXHJcbiAqIHNoYWRlcnMsIG9yIGVudGlyZSBuZXcgbWF0ZXJpYWwgZnJhbWV3b3Jrcy5cclxuICovXHJcbmNsYXNzIE1hdGVyaWFsQmFzZSBleHRlbmRzIEFzc2V0QmFzZSBpbXBsZW1lbnRzIElSZW5kZXJPYmplY3RPd25lclxyXG57XHJcblx0cHVibGljIHN0YXRpYyBhc3NldFR5cGU6c3RyaW5nID0gXCJbYXNzZXQgTWF0ZXJpYWxdXCI7XHJcblxyXG5cdHByaXZhdGUgX2NvbG9yVHJhbnNmb3JtOkNvbG9yVHJhbnNmb3JtO1xyXG5cdHByaXZhdGUgX2FscGhhQmxlbmRpbmc6Ym9vbGVhbiA9IGZhbHNlO1xyXG5cdHByaXZhdGUgX2FscGhhOm51bWJlciA9IDE7XHJcblx0XHJcblx0cHJpdmF0ZSBfc2l6ZUNoYW5nZWQ6TWF0ZXJpYWxFdmVudDtcclxuXHRwcml2YXRlIF9yZW5kZXJPYmplY3RzOkFycmF5PElSZW5kZXJPYmplY3Q+ID0gbmV3IEFycmF5PElSZW5kZXJPYmplY3Q+KCk7XHJcblxyXG5cdHB1YmxpYyBfcEFscGhhVGhyZXNob2xkOm51bWJlciA9IDA7XHJcblx0cHVibGljIF9wQW5pbWF0ZVVWczpib29sZWFuID0gZmFsc2U7XHJcblx0cHJpdmF0ZSBfZW5hYmxlTGlnaHRGYWxsT2ZmOmJvb2xlYW4gPSB0cnVlO1xyXG5cdHByaXZhdGUgX3NwZWN1bGFyTGlnaHRTb3VyY2VzOm51bWJlciA9IDB4MDE7XHJcblx0cHJpdmF0ZSBfZGlmZnVzZUxpZ2h0U291cmNlczpudW1iZXIgPSAweDAzO1xyXG5cclxuXHQvKipcclxuXHQgKiBBbiBvYmplY3QgdG8gY29udGFpbiBhbnkgZXh0cmEgZGF0YS5cclxuXHQgKi9cclxuXHRwdWJsaWMgZXh0cmE6T2JqZWN0O1xyXG5cclxuXHQvKipcclxuXHQgKiBBIHZhbHVlIHRoYXQgY2FuIGJlIHVzZWQgYnkgbWF0ZXJpYWxzIHRoYXQgb25seSB3b3JrIHdpdGggYSBnaXZlbiB0eXBlIG9mIHJlbmRlcmVyLiBUaGUgcmVuZGVyZXIgY2FuIHRlc3QgdGhlXHJcblx0ICogY2xhc3NpZmljYXRpb24gdG8gY2hvb3NlIHdoaWNoIHJlbmRlciBwYXRoIHRvIHVzZS4gRm9yIGV4YW1wbGUsIGEgZGVmZXJyZWQgbWF0ZXJpYWwgY291bGQgc2V0IHRoaXMgdmFsdWUgc29cclxuXHQgKiB0aGF0IHRoZSBkZWZlcnJlZCByZW5kZXJlciBrbm93cyBub3QgdG8gdGFrZSB0aGUgZm9yd2FyZCByZW5kZXJpbmcgcGF0aC5cclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHVibGljIF9pQ2xhc3NpZmljYXRpb246c3RyaW5nO1xyXG5cclxuXHJcblx0LyoqXHJcblx0ICogQW4gaWQgZm9yIHRoaXMgbWF0ZXJpYWwgdXNlZCB0byBzb3J0IHRoZSByZW5kZXJhYmxlcyBieSBzaGFkZXIgcHJvZ3JhbSwgd2hpY2ggcmVkdWNlcyBQcm9ncmFtIHN0YXRlIGNoYW5nZXMuXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBfaU1hdGVyaWFsSWQ6bnVtYmVyID0gMDtcclxuXHJcblx0cHVibGljIF9pQmFzZVNjcmVlblBhc3NJbmRleDpudW1iZXIgPSAwO1xyXG5cclxuXHRwcml2YXRlIF9ib3RoU2lkZXM6Ym9vbGVhbiA9IGZhbHNlOyAvLyB1cGRhdGVcclxuXHRwcml2YXRlIF9hbmltYXRpb25TZXQ6SUFuaW1hdGlvblNldDtcclxuXHJcblx0LyoqXHJcblx0ICogQSBsaXN0IG9mIG1hdGVyaWFsIG93bmVycywgcmVuZGVyYWJsZXMgb3IgY3VzdG9tIEVudGl0aWVzLlxyXG5cdCAqL1xyXG5cdHByaXZhdGUgX293bmVyczpBcnJheTxJUmVuZGVyYWJsZU93bmVyPjtcclxuXHJcblx0cHJpdmF0ZSBfYWxwaGFQcmVtdWx0aXBsaWVkOmJvb2xlYW47XHJcblxyXG5cdHB1YmxpYyBfcEJsZW5kTW9kZTpzdHJpbmcgPSBCbGVuZE1vZGUuTk9STUFMO1xyXG5cclxuXHRwcml2YXRlIF9taXBtYXA6Ym9vbGVhbiA9IHRydWU7XHJcblx0cHJpdmF0ZSBfc21vb3RoOmJvb2xlYW4gPSB0cnVlO1xyXG5cdHByaXZhdGUgX3JlcGVhdDpib29sZWFuID0gZmFsc2U7XHJcblx0cHJpdmF0ZSBfY29sb3I6bnVtYmVyID0gMHhGRkZGRkY7XHJcblx0cHVibGljIF9wVGV4dHVyZTpUZXh0dXJlMkRCYXNlO1xyXG5cclxuXHRwdWJsaWMgX3BMaWdodFBpY2tlcjpMaWdodFBpY2tlckJhc2U7XHJcblxyXG5cdHB1YmxpYyBfcEhlaWdodDpudW1iZXIgPSAxO1xyXG5cdHB1YmxpYyBfcFdpZHRoOm51bWJlciA9IDE7XHJcblxyXG5cdHByaXZhdGUgX29uTGlnaHRDaGFuZ2VEZWxlZ2F0ZTooZXZlbnQ6RXZlbnQpID0+IHZvaWQ7XHJcblxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgYXNzZXRUeXBlKCk6c3RyaW5nXHJcblx0e1xyXG5cdFx0cmV0dXJuIE1hdGVyaWFsQmFzZS5hc3NldFR5cGU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGEgbmV3IE1hdGVyaWFsQmFzZSBvYmplY3QuXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoKVxyXG5cdHtcclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0dGhpcy5faU1hdGVyaWFsSWQgPSBOdW1iZXIodGhpcy5pZCk7XHJcblxyXG5cdFx0dGhpcy5fb3duZXJzID0gbmV3IEFycmF5PElSZW5kZXJhYmxlT3duZXI+KCk7XHJcblxyXG5cdFx0dGhpcy5fb25MaWdodENoYW5nZURlbGVnYXRlID0gKGV2ZW50OkV2ZW50KSA9PiB0aGlzLm9uTGlnaHRzQ2hhbmdlKGV2ZW50KTtcclxuXHJcblx0XHR0aGlzLmFscGhhUHJlbXVsdGlwbGllZCA9IGZhbHNlOyAvL1RPRE86IHdvcmsgb3V0IHdoeSB0aGlzIGlzIGRpZmZlcmVudCBmb3IgV2ViR0xcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBhbHBoYSBvZiB0aGUgc3VyZmFjZS5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGFscGhhKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2FscGhhO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBhbHBoYSh2YWx1ZTpudW1iZXIpXHJcblx0e1xyXG5cdFx0aWYgKHZhbHVlID4gMSlcclxuXHRcdFx0dmFsdWUgPSAxO1xyXG5cdFx0ZWxzZSBpZiAodmFsdWUgPCAwKVxyXG5cdFx0XHR2YWx1ZSA9IDA7XHJcblxyXG5cdFx0aWYgKHRoaXMuX2FscGhhID09IHZhbHVlKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fYWxwaGEgPSB2YWx1ZTtcclxuXHJcblx0XHRpZiAodGhpcy5fY29sb3JUcmFuc2Zvcm0gPT0gbnVsbClcclxuXHRcdFx0dGhpcy5fY29sb3JUcmFuc2Zvcm0gPSBuZXcgQ29sb3JUcmFuc2Zvcm0oKTtcclxuXHJcblx0XHR0aGlzLl9jb2xvclRyYW5zZm9ybS5hbHBoYU11bHRpcGxpZXIgPSB2YWx1ZTtcclxuXHJcblx0XHR0aGlzLl9wSW52YWxpZGF0ZVJlbmRlck9iamVjdCgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIENvbG9yVHJhbnNmb3JtIG9iamVjdCB0byB0cmFuc2Zvcm0gdGhlIGNvbG91ciBvZiB0aGUgbWF0ZXJpYWwgd2l0aC4gRGVmYXVsdHMgdG8gbnVsbC5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGNvbG9yVHJhbnNmb3JtKCk6Q29sb3JUcmFuc2Zvcm1cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fY29sb3JUcmFuc2Zvcm07XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IGNvbG9yVHJhbnNmb3JtKHZhbHVlOkNvbG9yVHJhbnNmb3JtKVxyXG5cdHtcclxuXHRcdHRoaXMuX2NvbG9yVHJhbnNmb3JtID0gdmFsdWU7XHJcblxyXG5cdFx0dGhpcy5fcEludmFsaWRhdGVSZW5kZXJPYmplY3QoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluZGljYXRlcyB3aGV0aGVyIG9yIG5vdCB0aGUgbWF0ZXJpYWwgaGFzIHRyYW5zcGFyZW5jeS4gSWYgYmluYXJ5IHRyYW5zcGFyZW5jeSBpcyBzdWZmaWNpZW50LCBmb3JcclxuXHQgKiBleGFtcGxlIHdoZW4gdXNpbmcgdGV4dHVyZXMgb2YgZm9saWFnZSwgY29uc2lkZXIgdXNpbmcgYWxwaGFUaHJlc2hvbGQgaW5zdGVhZC5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGFscGhhQmxlbmRpbmcoKTpib29sZWFuXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2FscGhhQmxlbmRpbmc7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IGFscGhhQmxlbmRpbmcodmFsdWU6Ym9vbGVhbilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fYWxwaGFCbGVuZGluZyA9PSB2YWx1ZSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX2FscGhhQmxlbmRpbmcgPSB2YWx1ZTtcclxuXHJcblx0XHR0aGlzLl9wSW52YWxpZGF0ZVJlbmRlck9iamVjdCgpO1xyXG5cdH1cclxuXHRcclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgaGVpZ2h0KCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BIZWlnaHQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgYW5pbWF0aW9uU2V0KCk6SUFuaW1hdGlvblNldFxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9hbmltYXRpb25TZXQ7XHJcblx0fVxyXG5cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGxpZ2h0IHBpY2tlciB1c2VkIGJ5IHRoZSBtYXRlcmlhbCB0byBwcm92aWRlIGxpZ2h0cyB0byB0aGUgbWF0ZXJpYWwgaWYgaXQgc3VwcG9ydHMgbGlnaHRpbmcuXHJcblx0ICpcclxuXHQgKiBAc2VlIExpZ2h0UGlja2VyQmFzZVxyXG5cdCAqIEBzZWUgU3RhdGljTGlnaHRQaWNrZXJcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGxpZ2h0UGlja2VyKCk6TGlnaHRQaWNrZXJCYXNlXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BMaWdodFBpY2tlcjtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgbGlnaHRQaWNrZXIodmFsdWU6TGlnaHRQaWNrZXJCYXNlKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9wTGlnaHRQaWNrZXIgPT0gdmFsdWUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHRpZiAodGhpcy5fcExpZ2h0UGlja2VyKVxyXG5cdFx0XHR0aGlzLl9wTGlnaHRQaWNrZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihFdmVudC5DSEFOR0UsIHRoaXMuX29uTGlnaHRDaGFuZ2VEZWxlZ2F0ZSk7XHJcblxyXG5cdFx0dGhpcy5fcExpZ2h0UGlja2VyID0gdmFsdWU7XHJcblxyXG5cdFx0aWYgKHRoaXMuX3BMaWdodFBpY2tlcilcclxuXHRcdFx0dGhpcy5fcExpZ2h0UGlja2VyLmFkZEV2ZW50TGlzdGVuZXIoRXZlbnQuQ0hBTkdFLCB0aGlzLl9vbkxpZ2h0Q2hhbmdlRGVsZWdhdGUpO1xyXG5cclxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlUmVuZGVyT2JqZWN0KCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJbmRpY2F0ZXMgd2hldGhlciBvciBub3QgYW55IHVzZWQgdGV4dHVyZXMgc2hvdWxkIHVzZSBtaXBtYXBwaW5nLiBEZWZhdWx0cyB0byB0cnVlLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgbWlwbWFwKCk6Ym9vbGVhblxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9taXBtYXA7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IG1pcG1hcCh2YWx1ZTpib29sZWFuKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9taXBtYXAgPT0gdmFsdWUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9taXBtYXAgPSB2YWx1ZTtcclxuXHJcblx0XHR0aGlzLl9wSW52YWxpZGF0ZVBhc3NlcygpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSW5kaWNhdGVzIHdoZXRoZXIgb3Igbm90IGFueSB1c2VkIHRleHR1cmVzIHNob3VsZCB1c2Ugc21vb3RoaW5nLiBEZWZhdWx0cyB0byB0cnVlLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgc21vb3RoKCk6Ym9vbGVhblxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9zbW9vdGg7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHNtb290aCh2YWx1ZTpib29sZWFuKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9zbW9vdGggPT0gdmFsdWUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9zbW9vdGggPSB2YWx1ZTtcclxuXHJcblx0XHR0aGlzLl9wSW52YWxpZGF0ZVBhc3NlcygpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSW5kaWNhdGVzIHdoZXRoZXIgb3Igbm90IGFueSB1c2VkIHRleHR1cmVzIHNob3VsZCBiZSB0aWxlZC4gSWYgc2V0IHRvIGZhbHNlLCB0ZXh0dXJlIHNhbXBsZXMgYXJlIGNsYW1wZWQgdG9cclxuXHQgKiB0aGUgdGV4dHVyZSdzIGJvcmRlcnMgd2hlbiB0aGUgdXYgY29vcmRpbmF0ZXMgYXJlIG91dHNpZGUgdGhlIFswLCAxXSBpbnRlcnZhbC4gRGVmYXVsdHMgdG8gZmFsc2UuXHJcblx0ICovXHJcblx0cHVibGljIGdldCByZXBlYXQoKTpib29sZWFuXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3JlcGVhdDtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgcmVwZWF0KHZhbHVlOmJvb2xlYW4pXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX3JlcGVhdCA9PSB2YWx1ZSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX3JlcGVhdCA9IHZhbHVlO1xyXG5cclxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlUGFzc2VzKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgZGlmZnVzZSByZWZsZWN0aXZpdHkgY29sb3Igb2YgdGhlIHN1cmZhY2UuXHJcblx0ICovXHJcblx0cHVibGljIGdldCBjb2xvcigpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9jb2xvcjtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgY29sb3IodmFsdWU6bnVtYmVyKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9jb2xvciA9PSB2YWx1ZSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX2NvbG9yID0gdmFsdWU7XHJcblxyXG5cdFx0dGhpcy5fcEludmFsaWRhdGVQYXNzZXMoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSB0ZXh0dXJlIG9iamVjdCB0byB1c2UgZm9yIHRoZSBhbGJlZG8gY29sb3VyLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgdGV4dHVyZSgpOlRleHR1cmUyREJhc2VcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcFRleHR1cmU7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHRleHR1cmUodmFsdWU6VGV4dHVyZTJEQmFzZSlcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fcFRleHR1cmUgPT0gdmFsdWUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9wVGV4dHVyZSA9IHZhbHVlO1xyXG5cclxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlUGFzc2VzKCk7XHJcblxyXG5cdFx0dGhpcy5fcEhlaWdodCA9IHRoaXMuX3BUZXh0dXJlLmhlaWdodDtcclxuXHRcdHRoaXMuX3BXaWR0aCA9IHRoaXMuX3BUZXh0dXJlLndpZHRoO1xyXG5cclxuXHRcdHRoaXMuX3BOb3RpZnlTaXplQ2hhbmdlZCgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU3BlY2lmaWVzIHdoZXRoZXIgb3Igbm90IHRoZSBVViBjb29yZGluYXRlcyBzaG91bGQgYmUgYW5pbWF0ZWQgdXNpbmcgYSB0cmFuc2Zvcm1hdGlvbiBtYXRyaXguXHJcblx0ICovXHJcblx0cHVibGljIGdldCBhbmltYXRlVVZzKCk6Ym9vbGVhblxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9wQW5pbWF0ZVVWcztcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgYW5pbWF0ZVVWcyh2YWx1ZTpib29sZWFuKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9wQW5pbWF0ZVVWcyA9PSB2YWx1ZSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX3BBbmltYXRlVVZzID0gdmFsdWU7XHJcblxyXG5cdFx0dGhpcy5fcEludmFsaWRhdGVQYXNzZXMoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFdoZXRoZXIgb3Igbm90IHRvIHVzZSBmYWxsT2ZmIGFuZCByYWRpdXMgcHJvcGVydGllcyBmb3IgbGlnaHRzLiBUaGlzIGNhbiBiZSB1c2VkIHRvIGltcHJvdmUgcGVyZm9ybWFuY2UgYW5kXHJcblx0ICogY29tcGF0aWJpbGl0eSBmb3IgY29uc3RyYWluZWQgbW9kZS5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGVuYWJsZUxpZ2h0RmFsbE9mZigpOmJvb2xlYW5cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fZW5hYmxlTGlnaHRGYWxsT2ZmO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBlbmFibGVMaWdodEZhbGxPZmYodmFsdWU6Ym9vbGVhbilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fZW5hYmxlTGlnaHRGYWxsT2ZmID09IHZhbHVlKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fZW5hYmxlTGlnaHRGYWxsT2ZmID0gdmFsdWU7XHJcblxyXG5cdFx0dGhpcy5fcEludmFsaWRhdGVQYXNzZXMoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERlZmluZSB3aGljaCBsaWdodCBzb3VyY2UgdHlwZXMgdG8gdXNlIGZvciBkaWZmdXNlIHJlZmxlY3Rpb25zLiBUaGlzIGFsbG93cyBjaG9vc2luZyBiZXR3ZWVuIHJlZ3VsYXIgbGlnaHRzXHJcblx0ICogYW5kL29yIGxpZ2h0IHByb2JlcyBmb3IgZGlmZnVzZSByZWZsZWN0aW9ucy5cclxuXHQgKlxyXG5cdCAqIEBzZWUgYXdheTNkLm1hdGVyaWFscy5MaWdodFNvdXJjZXNcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGRpZmZ1c2VMaWdodFNvdXJjZXMoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fZGlmZnVzZUxpZ2h0U291cmNlcztcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgZGlmZnVzZUxpZ2h0U291cmNlcyh2YWx1ZTpudW1iZXIpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX2RpZmZ1c2VMaWdodFNvdXJjZXMgPT0gdmFsdWUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9kaWZmdXNlTGlnaHRTb3VyY2VzID0gdmFsdWU7XHJcblxyXG5cdFx0dGhpcy5fcEludmFsaWRhdGVQYXNzZXMoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERlZmluZSB3aGljaCBsaWdodCBzb3VyY2UgdHlwZXMgdG8gdXNlIGZvciBzcGVjdWxhciByZWZsZWN0aW9ucy4gVGhpcyBhbGxvd3MgY2hvb3NpbmcgYmV0d2VlbiByZWd1bGFyIGxpZ2h0c1xyXG5cdCAqIGFuZC9vciBsaWdodCBwcm9iZXMgZm9yIHNwZWN1bGFyIHJlZmxlY3Rpb25zLlxyXG5cdCAqXHJcblx0ICogQHNlZSBhd2F5M2QubWF0ZXJpYWxzLkxpZ2h0U291cmNlc1xyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgc3BlY3VsYXJMaWdodFNvdXJjZXMoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fc3BlY3VsYXJMaWdodFNvdXJjZXM7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHNwZWN1bGFyTGlnaHRTb3VyY2VzKHZhbHVlOm51bWJlcilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fc3BlY3VsYXJMaWdodFNvdXJjZXMgPT0gdmFsdWUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9zcGVjdWxhckxpZ2h0U291cmNlcyA9IHZhbHVlO1xyXG5cclxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlUGFzc2VzKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDbGVhbnMgdXAgcmVzb3VyY2VzIG93bmVkIGJ5IHRoZSBtYXRlcmlhbCwgaW5jbHVkaW5nIHBhc3Nlcy4gVGV4dHVyZXMgYXJlIG5vdCBvd25lZCBieSB0aGUgbWF0ZXJpYWwgc2luY2UgdGhleVxyXG5cdCAqIGNvdWxkIGJlIHVzZWQgYnkgb3RoZXIgbWF0ZXJpYWxzIGFuZCB3aWxsIG5vdCBiZSBkaXNwb3NlZC5cclxuXHQgKi9cclxuXHRwdWJsaWMgZGlzcG9zZSgpXHJcblx0e1xyXG5cdFx0dmFyIGk6bnVtYmVyO1xyXG5cdFx0dmFyIGxlbjpudW1iZXI7XHJcblxyXG5cdFx0bGVuID0gdGhpcy5fcmVuZGVyT2JqZWN0cy5sZW5ndGg7XHJcblx0XHRmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspXHJcblx0XHRcdHRoaXMuX3JlbmRlck9iamVjdHNbaV0uZGlzcG9zZSgpO1xyXG5cclxuXHRcdHRoaXMuX3JlbmRlck9iamVjdHMgPSBuZXcgQXJyYXk8SVJlbmRlck9iamVjdD4oKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERlZmluZXMgd2hldGhlciBvciBub3QgdGhlIG1hdGVyaWFsIHNob3VsZCBjdWxsIHRyaWFuZ2xlcyBmYWNpbmcgYXdheSBmcm9tIHRoZSBjYW1lcmEuXHJcblx0ICovXHJcblx0cHVibGljIGdldCBib3RoU2lkZXMoKTpib29sZWFuXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2JvdGhTaWRlcztcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgYm90aFNpZGVzKHZhbHVlOmJvb2xlYW4pXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX2JvdGhTaWRlcyA9IHZhbHVlKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fYm90aFNpZGVzID0gdmFsdWU7XHJcblxyXG5cdFx0dGhpcy5fcEludmFsaWRhdGVQYXNzZXMoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBibGVuZCBtb2RlIHRvIHVzZSB3aGVuIGRyYXdpbmcgdGhpcyByZW5kZXJhYmxlLiBUaGUgZm9sbG93aW5nIGJsZW5kIG1vZGVzIGFyZSBzdXBwb3J0ZWQ6XHJcblx0ICogPHVsPlxyXG5cdCAqIDxsaT5CbGVuZE1vZGUuTk9STUFMOiBObyBibGVuZGluZywgdW5sZXNzIHRoZSBtYXRlcmlhbCBpbmhlcmVudGx5IG5lZWRzIGl0PC9saT5cclxuXHQgKiA8bGk+QmxlbmRNb2RlLkxBWUVSOiBGb3JjZSBibGVuZGluZy4gVGhpcyB3aWxsIGRyYXcgdGhlIG9iamVjdCB0aGUgc2FtZSBhcyBOT1JNQUwsIGJ1dCB3aXRob3V0IHdyaXRpbmcgZGVwdGggd3JpdGVzLjwvbGk+XHJcblx0ICogPGxpPkJsZW5kTW9kZS5NVUxUSVBMWTwvbGk+XHJcblx0ICogPGxpPkJsZW5kTW9kZS5BREQ8L2xpPlxyXG5cdCAqIDxsaT5CbGVuZE1vZGUuQUxQSEE8L2xpPlxyXG5cdCAqIDwvdWw+XHJcblx0ICovXHJcblx0cHVibGljIGdldCBibGVuZE1vZGUoKTpzdHJpbmdcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcEJsZW5kTW9kZTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgYmxlbmRNb2RlKHZhbHVlOnN0cmluZylcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fcEJsZW5kTW9kZSA9PSB2YWx1ZSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX3BCbGVuZE1vZGUgPSB2YWx1ZTtcclxuXHJcblx0XHR0aGlzLl9wSW52YWxpZGF0ZVJlbmRlck9iamVjdCgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSW5kaWNhdGVzIHdoZXRoZXIgdmlzaWJsZSB0ZXh0dXJlcyAob3Igb3RoZXIgcGl4ZWxzKSB1c2VkIGJ5IHRoaXMgbWF0ZXJpYWwgaGF2ZVxyXG5cdCAqIGFscmVhZHkgYmVlbiBwcmVtdWx0aXBsaWVkLiBUb2dnbGUgdGhpcyBpZiB5b3UgYXJlIHNlZWluZyBibGFjayBoYWxvcyBhcm91bmQgeW91clxyXG5cdCAqIGJsZW5kZWQgYWxwaGEgZWRnZXMuXHJcblx0ICovXHJcblx0cHVibGljIGdldCBhbHBoYVByZW11bHRpcGxpZWQoKTpib29sZWFuXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2FscGhhUHJlbXVsdGlwbGllZDtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgYWxwaGFQcmVtdWx0aXBsaWVkKHZhbHVlOmJvb2xlYW4pXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX2FscGhhUHJlbXVsdGlwbGllZCA9PSB2YWx1ZSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX2FscGhhUHJlbXVsdGlwbGllZCA9IHZhbHVlO1xyXG5cclxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlUGFzc2VzKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgbWluaW11bSBhbHBoYSB2YWx1ZSBmb3Igd2hpY2ggcGl4ZWxzIHNob3VsZCBiZSBkcmF3bi4gVGhpcyBpcyB1c2VkIGZvciB0cmFuc3BhcmVuY3kgdGhhdCBpcyBlaXRoZXJcclxuXHQgKiBpbnZpc2libGUgb3IgZW50aXJlbHkgb3BhcXVlLCBvZnRlbiB1c2VkIHdpdGggdGV4dHVyZXMgZm9yIGZvbGlhZ2UsIGV0Yy5cclxuXHQgKiBSZWNvbW1lbmRlZCB2YWx1ZXMgYXJlIDAgdG8gZGlzYWJsZSBhbHBoYSwgb3IgMC41IHRvIGNyZWF0ZSBzbW9vdGggZWRnZXMuIERlZmF1bHQgdmFsdWUgaXMgMCAoZGlzYWJsZWQpLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgYWxwaGFUaHJlc2hvbGQoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcEFscGhhVGhyZXNob2xkO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBhbHBoYVRocmVzaG9sZCh2YWx1ZTpudW1iZXIpXHJcblx0e1xyXG5cdFx0aWYgKHZhbHVlIDwgMClcclxuXHRcdFx0dmFsdWUgPSAwO1xyXG5cdFx0ZWxzZSBpZiAodmFsdWUgPiAxKVxyXG5cdFx0XHR2YWx1ZSA9IDE7XHJcblxyXG5cdFx0aWYgKHRoaXMuX3BBbHBoYVRocmVzaG9sZCA9PSB2YWx1ZSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX3BBbHBoYVRocmVzaG9sZCA9IHZhbHVlO1xyXG5cclxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlUGFzc2VzKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgd2lkdGgoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcFdpZHRoO1xyXG5cdH1cclxuXHJcblx0Ly9cclxuXHQvLyBNQVRFUklBTCBNQU5BR0VNRU5UXHJcblx0Ly9cclxuXHQvKipcclxuXHQgKiBNYXJrIGFuIElSZW5kZXJhYmxlT3duZXIgYXMgb3duZXIgb2YgdGhpcyBtYXRlcmlhbC5cclxuXHQgKiBBc3N1cmVzIHdlJ3JlIG5vdCB1c2luZyB0aGUgc2FtZSBtYXRlcmlhbCBhY3Jvc3MgcmVuZGVyYWJsZXMgd2l0aCBkaWZmZXJlbnQgYW5pbWF0aW9ucywgc2luY2UgdGhlXHJcblx0ICogUHJvZ3JhbXMgZGVwZW5kIG9uIGFuaW1hdGlvbi4gVGhpcyBtZXRob2QgbmVlZHMgdG8gYmUgY2FsbGVkIHdoZW4gYSBtYXRlcmlhbCBpcyBhc3NpZ25lZC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvd25lciBUaGUgSVJlbmRlcmFibGVPd25lciB0aGF0IGhhZCB0aGlzIG1hdGVyaWFsIGFzc2lnbmVkXHJcblx0ICpcclxuXHQgKiBAaW50ZXJuYWxcclxuXHQgKi9cclxuXHRwdWJsaWMgaUFkZE93bmVyKG93bmVyOklSZW5kZXJhYmxlT3duZXIpXHJcblx0e1xyXG5cdFx0dGhpcy5fb3duZXJzLnB1c2gob3duZXIpO1xyXG5cclxuXHRcdHZhciBhbmltYXRpb25TZXQ6SUFuaW1hdGlvblNldDtcclxuXHRcdHZhciBhbmltYXRvcjpJQW5pbWF0b3IgPSA8SUFuaW1hdG9yPiBvd25lci5hbmltYXRvcjtcclxuXHJcblx0XHRpZiAoYW5pbWF0b3IpXHJcblx0XHRcdGFuaW1hdGlvblNldCA9IDxJQW5pbWF0aW9uU2V0PiBhbmltYXRvci5hbmltYXRpb25TZXQ7XHJcblxyXG5cdFx0aWYgKG93bmVyLmFuaW1hdG9yKSB7XHJcblx0XHRcdGlmICh0aGlzLl9hbmltYXRpb25TZXQgJiYgYW5pbWF0aW9uU2V0ICE9IHRoaXMuX2FuaW1hdGlvblNldCkge1xyXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIkEgTWF0ZXJpYWwgaW5zdGFuY2UgY2Fubm90IGJlIHNoYXJlZCBhY3Jvc3MgbWF0ZXJpYWwgb3duZXJzIHdpdGggZGlmZmVyZW50IGFuaW1hdGlvbiBzZXRzXCIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGlmICh0aGlzLl9hbmltYXRpb25TZXQgIT0gYW5pbWF0aW9uU2V0KSB7XHJcblxyXG5cdFx0XHRcdFx0dGhpcy5fYW5pbWF0aW9uU2V0ID0gYW5pbWF0aW9uU2V0O1xyXG5cclxuXHRcdFx0XHRcdHRoaXMuaW52YWxpZGF0ZUFuaW1hdGlvbigpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdG93bmVyLmRpc3BhdGNoRXZlbnQobmV3IFJlbmRlcmFibGVPd25lckV2ZW50KFJlbmRlcmFibGVPd25lckV2ZW50LlJFTkRFUl9PQkpFQ1RfT1dORVJfVVBEQVRFRCwgdGhpcykpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlcyBhbiBJUmVuZGVyYWJsZU93bmVyIGFzIG93bmVyLlxyXG5cdCAqIEBwYXJhbSBvd25lclxyXG5cdCAqXHJcblx0ICogQGludGVybmFsXHJcblx0ICovXHJcblx0cHVibGljIGlSZW1vdmVPd25lcihvd25lcjpJUmVuZGVyYWJsZU93bmVyKVxyXG5cdHtcclxuXHRcdHRoaXMuX293bmVycy5zcGxpY2UodGhpcy5fb3duZXJzLmluZGV4T2Yob3duZXIpLCAxKTtcclxuXHJcblx0XHRpZiAodGhpcy5fb3duZXJzLmxlbmd0aCA9PSAwKSB7XHJcblx0XHRcdHRoaXMuX2FuaW1hdGlvblNldCA9IG51bGw7XHJcblxyXG5cdFx0XHR0aGlzLmludmFsaWRhdGVBbmltYXRpb24oKTtcclxuXHRcdH1cclxuXHJcblx0XHRvd25lci5kaXNwYXRjaEV2ZW50KG5ldyBSZW5kZXJhYmxlT3duZXJFdmVudChSZW5kZXJhYmxlT3duZXJFdmVudC5SRU5ERVJfT0JKRUNUX09XTkVSX1VQREFURUQsIHRoaXMpKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEEgbGlzdCBvZiB0aGUgSVJlbmRlcmFibGVPd25lcnMgdGhhdCB1c2UgdGhpcyBtYXRlcmlhbFxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGlPd25lcnMoKTpBcnJheTxJUmVuZGVyYWJsZU93bmVyPlxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9vd25lcnM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYXJrcyB0aGUgc2hhZGVyIHByb2dyYW1zIGZvciBhbGwgcGFzc2VzIGFzIGludmFsaWQsIHNvIHRoZXkgd2lsbCBiZSByZWNvbXBpbGVkIGJlZm9yZSB0aGUgbmV4dCB1c2UuXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBfcEludmFsaWRhdGVQYXNzZXMoKVxyXG5cdHtcclxuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fcmVuZGVyT2JqZWN0cy5sZW5ndGg7XHJcblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBsZW47IGkrKylcclxuXHRcdFx0dGhpcy5fcmVuZGVyT2JqZWN0c1tpXS5pbnZhbGlkYXRlUGFzc2VzKCk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGludmFsaWRhdGVBbmltYXRpb24oKVxyXG5cdHtcclxuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fcmVuZGVyT2JqZWN0cy5sZW5ndGg7XHJcblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBsZW47IGkrKylcclxuXHRcdFx0dGhpcy5fcmVuZGVyT2JqZWN0c1tpXS5pbnZhbGlkYXRlQW5pbWF0aW9uKCk7XHJcblx0fVxyXG5cdFxyXG5cdHB1YmxpYyBfcEludmFsaWRhdGVSZW5kZXJPYmplY3QoKVxyXG5cdHtcclxuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fcmVuZGVyT2JqZWN0cy5sZW5ndGg7XHJcblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBsZW47IGkrKylcclxuXHRcdFx0dGhpcy5fcmVuZGVyT2JqZWN0c1tpXS5pbnZhbGlkYXRlUmVuZGVyT2JqZWN0KCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDYWxsZWQgd2hlbiB0aGUgbGlnaHQgcGlja2VyJ3MgY29uZmlndXJhdGlvbiBjaGFuZ2VkLlxyXG5cdCAqL1xyXG5cdHByaXZhdGUgb25MaWdodHNDaGFuZ2UoZXZlbnQ6RXZlbnQpXHJcblx0e1xyXG5cdFx0dGhpcy5fcEludmFsaWRhdGVSZW5kZXJPYmplY3QoKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBfcE5vdGlmeVNpemVDaGFuZ2VkKClcclxuXHR7XHJcblx0XHRpZiAoIXRoaXMuX3NpemVDaGFuZ2VkKVxyXG5cdFx0XHR0aGlzLl9zaXplQ2hhbmdlZCA9IG5ldyBNYXRlcmlhbEV2ZW50KE1hdGVyaWFsRXZlbnQuU0laRV9DSEFOR0VEKTtcclxuXHJcblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQodGhpcy5fc2l6ZUNoYW5nZWQpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIF9pQWRkUmVuZGVyT2JqZWN0KHJlbmRlck9iamVjdDpJUmVuZGVyT2JqZWN0KTpJUmVuZGVyT2JqZWN0XHJcblx0e1xyXG5cdFx0dGhpcy5fcmVuZGVyT2JqZWN0cy5wdXNoKHJlbmRlck9iamVjdCk7XHJcblxyXG5cdFx0cmV0dXJuIHJlbmRlck9iamVjdDtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBfaVJlbW92ZVJlbmRlck9iamVjdChyZW5kZXJPYmplY3Q6SVJlbmRlck9iamVjdCk6SVJlbmRlck9iamVjdFxyXG5cdHtcclxuXHRcdHRoaXMuX3JlbmRlck9iamVjdHMuc3BsaWNlKHRoaXMuX3JlbmRlck9iamVjdHMuaW5kZXhPZihyZW5kZXJPYmplY3QpLCAxKTtcclxuXHJcblx0XHRyZXR1cm4gcmVuZGVyT2JqZWN0O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gcmVuZGVyZXJcclxuXHQgKlxyXG5cdCAqIEBpbnRlcm5hbFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXRSZW5kZXJPYmplY3QocmVuZGVyYWJsZVBvb2w6SVJlbmRlcmFibGVQb29sKTpJUmVuZGVyT2JqZWN0XHJcblx0e1xyXG5cdFx0dGhyb3cgbmV3IEFic3RyYWN0TWV0aG9kRXJyb3IoKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCA9IE1hdGVyaWFsQmFzZTsiXX0=