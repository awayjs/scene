var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Event = require("awayjs-core/lib/events/Event");
var NamedAssetBase = require("awayjs-core/lib/library/NamedAssetBase");
var BlendMode = require("awayjs-display/lib/base/BlendMode");
var MaterialEvent = require("awayjs-display/lib/events/MaterialEvent");
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
        this._mipmap = false;
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
            this._pInvalidateProperties();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterialBase.prototype, "smooth", {
        /**
         * Indicates whether or not any used textures should use smoothing.
         */
        get: function () {
            return this._smooth;
        },
        set: function (value) {
            if (this._smooth == value)
                return;
            this._smooth = value;
            this._pInvalidateProperties();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterialBase.prototype, "repeat", {
        /**
         * Indicates whether or not any used textures should be tiled. If set to false, texture samples are clamped to
         * the texture's borders when the uv coordinates are outside the [0, 1] interval.
         */
        get: function () {
            return this._repeat;
        },
        set: function (value) {
            if (this._repeat == value)
                return;
            this._repeat = value;
            this._pInvalidateProperties();
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
            this._pInvalidateProperties();
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
            this._pInvalidateProperties();
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
            this._pInvalidateProperties();
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
            this._pInvalidateProperties();
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
            this._pInvalidateProperties();
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
            this._pInvalidateProperties();
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
            this._pInvalidateProperties();
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
            this._pInvalidateProperties();
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
            this._pInvalidateProperties();
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
    MaterialBase.prototype._pInvalidateProperties = function () {
        var len = this._renderObjects.length;
        for (var i = 0; i < len; i++)
            this._renderObjects[i].invalidateProperties();
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
        return renderablePool.getMaterialRenderObject(this);
    };
    return MaterialBase;
})(NamedAssetBase);
module.exports = MaterialBase;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9tYXRlcmlhbHMvbWF0ZXJpYWxiYXNlLnRzIl0sIm5hbWVzIjpbIk1hdGVyaWFsQmFzZSIsIk1hdGVyaWFsQmFzZS5jb25zdHJ1Y3RvciIsIk1hdGVyaWFsQmFzZS5oZWlnaHQiLCJNYXRlcmlhbEJhc2UuYW5pbWF0aW9uU2V0IiwiTWF0ZXJpYWxCYXNlLmxpZ2h0UGlja2VyIiwiTWF0ZXJpYWxCYXNlLm1pcG1hcCIsIk1hdGVyaWFsQmFzZS5zbW9vdGgiLCJNYXRlcmlhbEJhc2UucmVwZWF0IiwiTWF0ZXJpYWxCYXNlLmNvbG9yIiwiTWF0ZXJpYWxCYXNlLnRleHR1cmUiLCJNYXRlcmlhbEJhc2UuYW5pbWF0ZVVWcyIsIk1hdGVyaWFsQmFzZS5lbmFibGVMaWdodEZhbGxPZmYiLCJNYXRlcmlhbEJhc2UuZGlmZnVzZUxpZ2h0U291cmNlcyIsIk1hdGVyaWFsQmFzZS5zcGVjdWxhckxpZ2h0U291cmNlcyIsIk1hdGVyaWFsQmFzZS5kaXNwb3NlIiwiTWF0ZXJpYWxCYXNlLmJvdGhTaWRlcyIsIk1hdGVyaWFsQmFzZS5ibGVuZE1vZGUiLCJNYXRlcmlhbEJhc2UuYWxwaGFQcmVtdWx0aXBsaWVkIiwiTWF0ZXJpYWxCYXNlLmFscGhhVGhyZXNob2xkIiwiTWF0ZXJpYWxCYXNlLndpZHRoIiwiTWF0ZXJpYWxCYXNlLmlBZGRPd25lciIsIk1hdGVyaWFsQmFzZS5pUmVtb3ZlT3duZXIiLCJNYXRlcmlhbEJhc2UuaU93bmVycyIsIk1hdGVyaWFsQmFzZS5fcEludmFsaWRhdGVQcm9wZXJ0aWVzIiwiTWF0ZXJpYWxCYXNlLmludmFsaWRhdGVBbmltYXRpb24iLCJNYXRlcmlhbEJhc2UuX3BJbnZhbGlkYXRlUmVuZGVyT2JqZWN0IiwiTWF0ZXJpYWxCYXNlLm9uTGlnaHRzQ2hhbmdlIiwiTWF0ZXJpYWxCYXNlLl9wTm90aWZ5U2l6ZUNoYW5nZWQiLCJNYXRlcmlhbEJhc2UuX2lBZGRSZW5kZXJPYmplY3QiLCJNYXRlcmlhbEJhc2Uu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QSxJQUFJQSxDQUFDQSxZQUFZQSxHQUFHQSxJQUFJQSxhQUFhQSxDQUFDQSxhQUFhQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQTtRQUVuRUEsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0E7SUFDdkNBLENBQUNBO0lBRU0zQix3Q0FBaUJBLEdBQXhCQSxVQUF5QkEsWUFBMEJBO1FBRWxENEIsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0E7UUFFdkNBLE1BQU1BLENBQUNBLFlBQVlBLENBQUNBO0lBQ3JCQSxDQUFDQTtJQUVNNUIsMkNBQW9CQSxHQUEzQkEsVUFBNEJBLFlBQTBCQTtRQUVyRDZCLElBQUlBLENBQUNBLGNBQWNBLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLGNBQWNBLENBQUNBLE9BQU9BLENBQUNBLFlBQVlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO1FBRXpFQSxNQUFNQSxDQUFDQSxZQUFZQSxDQUFDQTtJQUNyQkEsQ0FBQ0E7SUFFRDdCOzs7OztPQUtHQTtJQUNJQSxzQ0FBZUEsR0FBdEJBLFVBQXVCQSxjQUE4QkE7UUFFcEQ4QixNQUFNQSxDQUFDQSxjQUFjQSxDQUFDQSx1QkFBdUJBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO0lBQ3JEQSxDQUFDQTtJQUNGOUIsbUJBQUNBO0FBQURBLENBeGhCQSxBQXdoQkNBLEVBeGhCMEIsY0FBYyxFQXdoQnhDO0FBRUQsQUFBc0IsaUJBQWIsWUFBWSxDQUFDIiwiZmlsZSI6Im1hdGVyaWFscy9NYXRlcmlhbEJhc2UuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1hdHJpeDNEXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vTWF0cml4M0RcIik7XG5pbXBvcnQgRXZlbnRcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0V2ZW50XCIpO1xuaW1wb3J0IEFzc2V0VHlwZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9Bc3NldFR5cGVcIik7XG5pbXBvcnQgSUFzc2V0XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvSUFzc2V0XCIpO1xuaW1wb3J0IE5hbWVkQXNzZXRCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9OYW1lZEFzc2V0QmFzZVwiKTtcbmltcG9ydCBUZXh0dXJlMkRCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvdGV4dHVyZXMvVGV4dHVyZTJEQmFzZVwiKTtcblxuaW1wb3J0IElBbmltYXRpb25TZXRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9hbmltYXRvcnMvSUFuaW1hdGlvblNldFwiKTtcbmltcG9ydCBJQW5pbWF0b3JcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2FuaW1hdG9ycy9JQW5pbWF0b3JcIik7XG5pbXBvcnQgQmxlbmRNb2RlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0JsZW5kTW9kZVwiKTtcbmltcG9ydCBJUmVuZGVyT2JqZWN0T3duZXJcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9JUmVuZGVyT2JqZWN0T3duZXJcIik7XG5pbXBvcnQgSVJlbmRlcmFibGVPd25lclx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvSVJlbmRlcmFibGVPd25lclwiKTtcbmltcG9ydCBJUmVuZGVyT2JqZWN0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcG9vbC9JUmVuZGVyT2JqZWN0XCIpO1xuaW1wb3J0IElSZW5kZXJhYmxlUG9vbFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3Bvb2wvSVJlbmRlcmFibGVQb29sXCIpO1xuaW1wb3J0IENhbWVyYVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9DYW1lcmFcIik7XG5pbXBvcnQgTWF0ZXJpYWxFdmVudFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2V2ZW50cy9NYXRlcmlhbEV2ZW50XCIpO1xuaW1wb3J0IExpZ2h0UGlja2VyQmFzZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL21hdGVyaWFscy9saWdodHBpY2tlcnMvTGlnaHRQaWNrZXJCYXNlXCIpO1xuaW1wb3J0IElSZW5kZXJlclx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcmVuZGVyL0lSZW5kZXJlclwiKTtcblxuXG4vKipcbiAqIE1hdGVyaWFsQmFzZSBmb3JtcyBhbiBhYnN0cmFjdCBiYXNlIGNsYXNzIGZvciBhbnkgbWF0ZXJpYWwuXG4gKiBBIG1hdGVyaWFsIGNvbnNpc3RzIG9mIHNldmVyYWwgcGFzc2VzLCBlYWNoIG9mIHdoaWNoIGNvbnN0aXR1dGVzIGF0IGxlYXN0IG9uZSByZW5kZXIgY2FsbC4gU2V2ZXJhbCBwYXNzZXMgY291bGRcbiAqIGJlIHVzZWQgZm9yIHNwZWNpYWwgZWZmZWN0cyAocmVuZGVyIGxpZ2h0aW5nIGZvciBtYW55IGxpZ2h0cyBpbiBzZXZlcmFsIHBhc3NlcywgcmVuZGVyIGFuIG91dGxpbmUgaW4gYSBzZXBhcmF0ZVxuICogcGFzcykgb3IgdG8gcHJvdmlkZSBhZGRpdGlvbmFsIHJlbmRlci10by10ZXh0dXJlIHBhc3NlcyAocmVuZGVyaW5nIGRpZmZ1c2UgbGlnaHQgdG8gdGV4dHVyZSBmb3IgdGV4dHVyZS1zcGFjZVxuICogc3Vic3VyZmFjZSBzY2F0dGVyaW5nLCBvciByZW5kZXJpbmcgYSBkZXB0aCBtYXAgZm9yIHNwZWNpYWxpemVkIHNlbGYtc2hhZG93aW5nKS5cbiAqXG4gKiBBd2F5M0QgcHJvdmlkZXMgZGVmYXVsdCBtYXRlcmlhbHMgdHJvdWdoIFNpbmdsZVBhc3NNYXRlcmlhbEJhc2UgYW5kIFRyaWFuZ2xlTWF0ZXJpYWwsIHdoaWNoIHVzZSBtb2R1bGFyXG4gKiBtZXRob2RzIHRvIGJ1aWxkIHRoZSBzaGFkZXIgY29kZS4gTWF0ZXJpYWxCYXNlIGNhbiBiZSBleHRlbmRlZCB0byBidWlsZCBzcGVjaWZpYyBhbmQgaGlnaC1wZXJmb3JtYW50IGN1c3RvbVxuICogc2hhZGVycywgb3IgZW50aXJlIG5ldyBtYXRlcmlhbCBmcmFtZXdvcmtzLlxuICovXG5jbGFzcyBNYXRlcmlhbEJhc2UgZXh0ZW5kcyBOYW1lZEFzc2V0QmFzZSBpbXBsZW1lbnRzIElSZW5kZXJPYmplY3RPd25lclxue1xuXHRwcml2YXRlIF9zaXplQ2hhbmdlZDpNYXRlcmlhbEV2ZW50O1xuXHRwcml2YXRlIF9yZW5kZXJPYmplY3RzOkFycmF5PElSZW5kZXJPYmplY3Q+ID0gbmV3IEFycmF5PElSZW5kZXJPYmplY3Q+KCk7XG5cblx0cHVibGljIF9wQWxwaGFUaHJlc2hvbGQ6bnVtYmVyID0gMDtcblx0cHVibGljIF9wQW5pbWF0ZVVWczpib29sZWFuID0gZmFsc2U7XG5cdHByaXZhdGUgX2VuYWJsZUxpZ2h0RmFsbE9mZjpib29sZWFuID0gdHJ1ZTtcblx0cHJpdmF0ZSBfc3BlY3VsYXJMaWdodFNvdXJjZXM6bnVtYmVyID0gMHgwMTtcblx0cHJpdmF0ZSBfZGlmZnVzZUxpZ2h0U291cmNlczpudW1iZXIgPSAweDAzO1xuXG5cdC8qKlxuXHQgKiBBbiBvYmplY3QgdG8gY29udGFpbiBhbnkgZXh0cmEgZGF0YS5cblx0ICovXG5cdHB1YmxpYyBleHRyYTpPYmplY3Q7XG5cblx0LyoqXG5cdCAqIEEgdmFsdWUgdGhhdCBjYW4gYmUgdXNlZCBieSBtYXRlcmlhbHMgdGhhdCBvbmx5IHdvcmsgd2l0aCBhIGdpdmVuIHR5cGUgb2YgcmVuZGVyZXIuIFRoZSByZW5kZXJlciBjYW4gdGVzdCB0aGVcblx0ICogY2xhc3NpZmljYXRpb24gdG8gY2hvb3NlIHdoaWNoIHJlbmRlciBwYXRoIHRvIHVzZS4gRm9yIGV4YW1wbGUsIGEgZGVmZXJyZWQgbWF0ZXJpYWwgY291bGQgc2V0IHRoaXMgdmFsdWUgc29cblx0ICogdGhhdCB0aGUgZGVmZXJyZWQgcmVuZGVyZXIga25vd3Mgbm90IHRvIHRha2UgdGhlIGZvcndhcmQgcmVuZGVyaW5nIHBhdGguXG5cdCAqXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRwdWJsaWMgX2lDbGFzc2lmaWNhdGlvbjpzdHJpbmc7XG5cblxuXHQvKipcblx0ICogQW4gaWQgZm9yIHRoaXMgbWF0ZXJpYWwgdXNlZCB0byBzb3J0IHRoZSByZW5kZXJhYmxlcyBieSBzaGFkZXIgcHJvZ3JhbSwgd2hpY2ggcmVkdWNlcyBQcm9ncmFtIHN0YXRlIGNoYW5nZXMuXG5cdCAqXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRwdWJsaWMgX2lNYXRlcmlhbElkOm51bWJlciA9IDA7XG5cblx0cHVibGljIF9pQmFzZVNjcmVlblBhc3NJbmRleDpudW1iZXIgPSAwO1xuXG5cdHByaXZhdGUgX2JvdGhTaWRlczpib29sZWFuID0gZmFsc2U7IC8vIHVwZGF0ZVxuXHRwcml2YXRlIF9hbmltYXRpb25TZXQ6SUFuaW1hdGlvblNldDtcblxuXHQvKipcblx0ICogQSBsaXN0IG9mIG1hdGVyaWFsIG93bmVycywgcmVuZGVyYWJsZXMgb3IgY3VzdG9tIEVudGl0aWVzLlxuXHQgKi9cblx0cHJpdmF0ZSBfb3duZXJzOkFycmF5PElSZW5kZXJhYmxlT3duZXI+O1xuXG5cdHByaXZhdGUgX2FscGhhUHJlbXVsdGlwbGllZDpib29sZWFuO1xuXG5cdHB1YmxpYyBfcEJsZW5kTW9kZTpzdHJpbmcgPSBCbGVuZE1vZGUuTk9STUFMO1xuXG5cdHByaXZhdGUgX21pcG1hcDpib29sZWFuID0gZmFsc2U7XG5cdHByaXZhdGUgX3Ntb290aDpib29sZWFuID0gdHJ1ZTtcblx0cHJpdmF0ZSBfcmVwZWF0OmJvb2xlYW4gPSBmYWxzZTtcblx0cHJpdmF0ZSBfY29sb3I6bnVtYmVyID0gMHhGRkZGRkY7XG5cdHB1YmxpYyBfcFRleHR1cmU6VGV4dHVyZTJEQmFzZTtcblxuXHRwdWJsaWMgX3BMaWdodFBpY2tlcjpMaWdodFBpY2tlckJhc2U7XG5cblx0cHVibGljIF9wSGVpZ2h0Om51bWJlciA9IDE7XG5cdHB1YmxpYyBfcFdpZHRoOm51bWJlciA9IDE7XG5cblx0cHJpdmF0ZSBfb25MaWdodENoYW5nZURlbGVnYXRlOihldmVudDpFdmVudCkgPT4gdm9pZDtcblxuXHQvKipcblx0ICogQ3JlYXRlcyBhIG5ldyBNYXRlcmlhbEJhc2Ugb2JqZWN0LlxuXHQgKi9cblx0Y29uc3RydWN0b3IoKVxuXHR7XG5cdFx0c3VwZXIoKTtcblxuXHRcdHRoaXMuX2lNYXRlcmlhbElkID0gTnVtYmVyKHRoaXMuaWQpO1xuXG5cdFx0dGhpcy5fb3duZXJzID0gbmV3IEFycmF5PElSZW5kZXJhYmxlT3duZXI+KCk7XG5cblx0XHR0aGlzLl9vbkxpZ2h0Q2hhbmdlRGVsZWdhdGUgPSAoZXZlbnQ6RXZlbnQpID0+IHRoaXMub25MaWdodHNDaGFuZ2UoZXZlbnQpO1xuXG5cdFx0dGhpcy5hbHBoYVByZW11bHRpcGxpZWQgPSBmYWxzZTsgLy9UT0RPOiB3b3JrIG91dCB3aHkgdGhpcyBpcyBkaWZmZXJlbnQgZm9yIFdlYkdMXG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgaGVpZ2h0KCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcEhlaWdodDtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBhbmltYXRpb25TZXQoKTpJQW5pbWF0aW9uU2V0XG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fYW5pbWF0aW9uU2V0O1xuXHR9XG5cblxuXHQvKipcblx0ICogVGhlIGxpZ2h0IHBpY2tlciB1c2VkIGJ5IHRoZSBtYXRlcmlhbCB0byBwcm92aWRlIGxpZ2h0cyB0byB0aGUgbWF0ZXJpYWwgaWYgaXQgc3VwcG9ydHMgbGlnaHRpbmcuXG5cdCAqXG5cdCAqIEBzZWUgTGlnaHRQaWNrZXJCYXNlXG5cdCAqIEBzZWUgU3RhdGljTGlnaHRQaWNrZXJcblx0ICovXG5cdHB1YmxpYyBnZXQgbGlnaHRQaWNrZXIoKTpMaWdodFBpY2tlckJhc2Vcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wTGlnaHRQaWNrZXI7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGxpZ2h0UGlja2VyKHZhbHVlOkxpZ2h0UGlja2VyQmFzZSlcblx0e1xuXHRcdGlmICh0aGlzLl9wTGlnaHRQaWNrZXIgPT0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHRpZiAodGhpcy5fcExpZ2h0UGlja2VyKVxuXHRcdFx0dGhpcy5fcExpZ2h0UGlja2VyLnJlbW92ZUV2ZW50TGlzdGVuZXIoRXZlbnQuQ0hBTkdFLCB0aGlzLl9vbkxpZ2h0Q2hhbmdlRGVsZWdhdGUpO1xuXG5cdFx0dGhpcy5fcExpZ2h0UGlja2VyID0gdmFsdWU7XG5cblx0XHRpZiAodGhpcy5fcExpZ2h0UGlja2VyKVxuXHRcdFx0dGhpcy5fcExpZ2h0UGlja2VyLmFkZEV2ZW50TGlzdGVuZXIoRXZlbnQuQ0hBTkdFLCB0aGlzLl9vbkxpZ2h0Q2hhbmdlRGVsZWdhdGUpO1xuXG5cdFx0dGhpcy5fcEludmFsaWRhdGVSZW5kZXJPYmplY3QoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgd2hldGhlciBvciBub3QgYW55IHVzZWQgdGV4dHVyZXMgc2hvdWxkIHVzZSBtaXBtYXBwaW5nLiBEZWZhdWx0cyB0byB0cnVlLlxuXHQgKi9cblx0cHVibGljIGdldCBtaXBtYXAoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fbWlwbWFwO1xuXHR9XG5cblx0cHVibGljIHNldCBtaXBtYXAodmFsdWU6Ym9vbGVhbilcblx0e1xuXHRcdGlmICh0aGlzLl9taXBtYXAgPT0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9taXBtYXAgPSB2YWx1ZTtcblxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlUHJvcGVydGllcygpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB3aGV0aGVyIG9yIG5vdCBhbnkgdXNlZCB0ZXh0dXJlcyBzaG91bGQgdXNlIHNtb290aGluZy5cblx0ICovXG5cdHB1YmxpYyBnZXQgc21vb3RoKCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3Ntb290aDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgc21vb3RoKHZhbHVlOmJvb2xlYW4pXG5cdHtcblx0XHRpZiAodGhpcy5fc21vb3RoID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fc21vb3RoID0gdmFsdWU7XG5cblx0XHR0aGlzLl9wSW52YWxpZGF0ZVByb3BlcnRpZXMoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgd2hldGhlciBvciBub3QgYW55IHVzZWQgdGV4dHVyZXMgc2hvdWxkIGJlIHRpbGVkLiBJZiBzZXQgdG8gZmFsc2UsIHRleHR1cmUgc2FtcGxlcyBhcmUgY2xhbXBlZCB0b1xuXHQgKiB0aGUgdGV4dHVyZSdzIGJvcmRlcnMgd2hlbiB0aGUgdXYgY29vcmRpbmF0ZXMgYXJlIG91dHNpZGUgdGhlIFswLCAxXSBpbnRlcnZhbC5cblx0ICovXG5cdHB1YmxpYyBnZXQgcmVwZWF0KCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3JlcGVhdDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgcmVwZWF0KHZhbHVlOmJvb2xlYW4pXG5cdHtcblx0XHRpZiAodGhpcy5fcmVwZWF0ID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fcmVwZWF0ID0gdmFsdWU7XG5cblx0XHR0aGlzLl9wSW52YWxpZGF0ZVByb3BlcnRpZXMoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgZGlmZnVzZSByZWZsZWN0aXZpdHkgY29sb3Igb2YgdGhlIHN1cmZhY2UuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGNvbG9yKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fY29sb3I7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGNvbG9yKHZhbHVlOm51bWJlcilcblx0e1xuXHRcdGlmICh0aGlzLl9jb2xvciA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX2NvbG9yID0gdmFsdWU7XG5cblx0XHR0aGlzLl9wSW52YWxpZGF0ZVByb3BlcnRpZXMoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgdGV4dHVyZSBvYmplY3QgdG8gdXNlIGZvciB0aGUgYWxiZWRvIGNvbG91ci5cblx0ICovXG5cdHB1YmxpYyBnZXQgdGV4dHVyZSgpOlRleHR1cmUyREJhc2Vcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wVGV4dHVyZTtcblx0fVxuXG5cdHB1YmxpYyBzZXQgdGV4dHVyZSh2YWx1ZTpUZXh0dXJlMkRCYXNlKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3BUZXh0dXJlID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fcFRleHR1cmUgPSB2YWx1ZTtcblxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlUHJvcGVydGllcygpO1xuXG5cdFx0dGhpcy5fcEhlaWdodCA9IHRoaXMuX3BUZXh0dXJlLmhlaWdodDtcblx0XHR0aGlzLl9wV2lkdGggPSB0aGlzLl9wVGV4dHVyZS53aWR0aDtcblxuXHRcdHRoaXMuX3BOb3RpZnlTaXplQ2hhbmdlZCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNwZWNpZmllcyB3aGV0aGVyIG9yIG5vdCB0aGUgVVYgY29vcmRpbmF0ZXMgc2hvdWxkIGJlIGFuaW1hdGVkIHVzaW5nIGEgdHJhbnNmb3JtYXRpb24gbWF0cml4LlxuXHQgKi9cblx0cHVibGljIGdldCBhbmltYXRlVVZzKCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BBbmltYXRlVVZzO1xuXHR9XG5cblx0cHVibGljIHNldCBhbmltYXRlVVZzKHZhbHVlOmJvb2xlYW4pXG5cdHtcblx0XHRpZiAodGhpcy5fcEFuaW1hdGVVVnMgPT0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9wQW5pbWF0ZVVWcyA9IHZhbHVlO1xuXG5cdFx0dGhpcy5fcEludmFsaWRhdGVQcm9wZXJ0aWVzKCk7XG5cdH1cblxuXHQvKipcblx0ICogV2hldGhlciBvciBub3QgdG8gdXNlIGZhbGxPZmYgYW5kIHJhZGl1cyBwcm9wZXJ0aWVzIGZvciBsaWdodHMuIFRoaXMgY2FuIGJlIHVzZWQgdG8gaW1wcm92ZSBwZXJmb3JtYW5jZSBhbmRcblx0ICogY29tcGF0aWJpbGl0eSBmb3IgY29uc3RyYWluZWQgbW9kZS5cblx0ICovXG5cdHB1YmxpYyBnZXQgZW5hYmxlTGlnaHRGYWxsT2ZmKCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2VuYWJsZUxpZ2h0RmFsbE9mZjtcblx0fVxuXG5cdHB1YmxpYyBzZXQgZW5hYmxlTGlnaHRGYWxsT2ZmKHZhbHVlOmJvb2xlYW4pXG5cdHtcblx0XHRpZiAodGhpcy5fZW5hYmxlTGlnaHRGYWxsT2ZmID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fZW5hYmxlTGlnaHRGYWxsT2ZmID0gdmFsdWU7XG5cblx0XHR0aGlzLl9wSW52YWxpZGF0ZVByb3BlcnRpZXMoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBEZWZpbmUgd2hpY2ggbGlnaHQgc291cmNlIHR5cGVzIHRvIHVzZSBmb3IgZGlmZnVzZSByZWZsZWN0aW9ucy4gVGhpcyBhbGxvd3MgY2hvb3NpbmcgYmV0d2VlbiByZWd1bGFyIGxpZ2h0c1xuXHQgKiBhbmQvb3IgbGlnaHQgcHJvYmVzIGZvciBkaWZmdXNlIHJlZmxlY3Rpb25zLlxuXHQgKlxuXHQgKiBAc2VlIGF3YXkzZC5tYXRlcmlhbHMuTGlnaHRTb3VyY2VzXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGRpZmZ1c2VMaWdodFNvdXJjZXMoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9kaWZmdXNlTGlnaHRTb3VyY2VzO1xuXHR9XG5cblx0cHVibGljIHNldCBkaWZmdXNlTGlnaHRTb3VyY2VzKHZhbHVlOm51bWJlcilcblx0e1xuXHRcdGlmICh0aGlzLl9kaWZmdXNlTGlnaHRTb3VyY2VzID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fZGlmZnVzZUxpZ2h0U291cmNlcyA9IHZhbHVlO1xuXG5cdFx0dGhpcy5fcEludmFsaWRhdGVQcm9wZXJ0aWVzKCk7XG5cdH1cblxuXHQvKipcblx0ICogRGVmaW5lIHdoaWNoIGxpZ2h0IHNvdXJjZSB0eXBlcyB0byB1c2UgZm9yIHNwZWN1bGFyIHJlZmxlY3Rpb25zLiBUaGlzIGFsbG93cyBjaG9vc2luZyBiZXR3ZWVuIHJlZ3VsYXIgbGlnaHRzXG5cdCAqIGFuZC9vciBsaWdodCBwcm9iZXMgZm9yIHNwZWN1bGFyIHJlZmxlY3Rpb25zLlxuXHQgKlxuXHQgKiBAc2VlIGF3YXkzZC5tYXRlcmlhbHMuTGlnaHRTb3VyY2VzXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHNwZWN1bGFyTGlnaHRTb3VyY2VzKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fc3BlY3VsYXJMaWdodFNvdXJjZXM7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHNwZWN1bGFyTGlnaHRTb3VyY2VzKHZhbHVlOm51bWJlcilcblx0e1xuXHRcdGlmICh0aGlzLl9zcGVjdWxhckxpZ2h0U291cmNlcyA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3NwZWN1bGFyTGlnaHRTb3VyY2VzID0gdmFsdWU7XG5cblx0XHR0aGlzLl9wSW52YWxpZGF0ZVByb3BlcnRpZXMoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDbGVhbnMgdXAgcmVzb3VyY2VzIG93bmVkIGJ5IHRoZSBtYXRlcmlhbCwgaW5jbHVkaW5nIHBhc3Nlcy4gVGV4dHVyZXMgYXJlIG5vdCBvd25lZCBieSB0aGUgbWF0ZXJpYWwgc2luY2UgdGhleVxuXHQgKiBjb3VsZCBiZSB1c2VkIGJ5IG90aGVyIG1hdGVyaWFscyBhbmQgd2lsbCBub3QgYmUgZGlzcG9zZWQuXG5cdCAqL1xuXHRwdWJsaWMgZGlzcG9zZSgpXG5cdHtcblx0XHR2YXIgaTpudW1iZXI7XG5cdFx0dmFyIGxlbjpudW1iZXI7XG5cblx0XHRsZW4gPSB0aGlzLl9yZW5kZXJPYmplY3RzLmxlbmd0aDtcblx0XHRmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspXG5cdFx0XHR0aGlzLl9yZW5kZXJPYmplY3RzW2ldLmRpc3Bvc2UoKTtcblxuXHRcdHRoaXMuX3JlbmRlck9iamVjdHMgPSBuZXcgQXJyYXk8SVJlbmRlck9iamVjdD4oKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBEZWZpbmVzIHdoZXRoZXIgb3Igbm90IHRoZSBtYXRlcmlhbCBzaG91bGQgY3VsbCB0cmlhbmdsZXMgZmFjaW5nIGF3YXkgZnJvbSB0aGUgY2FtZXJhLlxuXHQgKi9cblx0cHVibGljIGdldCBib3RoU2lkZXMoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fYm90aFNpZGVzO1xuXHR9XG5cblx0cHVibGljIHNldCBib3RoU2lkZXModmFsdWU6Ym9vbGVhbilcblx0e1xuXHRcdGlmICh0aGlzLl9ib3RoU2lkZXMgPSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX2JvdGhTaWRlcyA9IHZhbHVlO1xuXG5cdFx0dGhpcy5fcEludmFsaWRhdGVQcm9wZXJ0aWVzKCk7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIGJsZW5kIG1vZGUgdG8gdXNlIHdoZW4gZHJhd2luZyB0aGlzIHJlbmRlcmFibGUuIFRoZSBmb2xsb3dpbmcgYmxlbmQgbW9kZXMgYXJlIHN1cHBvcnRlZDpcblx0ICogPHVsPlxuXHQgKiA8bGk+QmxlbmRNb2RlLk5PUk1BTDogTm8gYmxlbmRpbmcsIHVubGVzcyB0aGUgbWF0ZXJpYWwgaW5oZXJlbnRseSBuZWVkcyBpdDwvbGk+XG5cdCAqIDxsaT5CbGVuZE1vZGUuTEFZRVI6IEZvcmNlIGJsZW5kaW5nLiBUaGlzIHdpbGwgZHJhdyB0aGUgb2JqZWN0IHRoZSBzYW1lIGFzIE5PUk1BTCwgYnV0IHdpdGhvdXQgd3JpdGluZyBkZXB0aCB3cml0ZXMuPC9saT5cblx0ICogPGxpPkJsZW5kTW9kZS5NVUxUSVBMWTwvbGk+XG5cdCAqIDxsaT5CbGVuZE1vZGUuQUREPC9saT5cblx0ICogPGxpPkJsZW5kTW9kZS5BTFBIQTwvbGk+XG5cdCAqIDwvdWw+XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGJsZW5kTW9kZSgpOnN0cmluZ1xuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BCbGVuZE1vZGU7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGJsZW5kTW9kZSh2YWx1ZTpzdHJpbmcpXG5cdHtcblx0XHRpZiAodGhpcy5fcEJsZW5kTW9kZSA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3BCbGVuZE1vZGUgPSB2YWx1ZTtcblxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlUmVuZGVyT2JqZWN0KCk7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHdoZXRoZXIgdmlzaWJsZSB0ZXh0dXJlcyAob3Igb3RoZXIgcGl4ZWxzKSB1c2VkIGJ5IHRoaXMgbWF0ZXJpYWwgaGF2ZVxuXHQgKiBhbHJlYWR5IGJlZW4gcHJlbXVsdGlwbGllZC4gVG9nZ2xlIHRoaXMgaWYgeW91IGFyZSBzZWVpbmcgYmxhY2sgaGFsb3MgYXJvdW5kIHlvdXJcblx0ICogYmxlbmRlZCBhbHBoYSBlZGdlcy5cblx0ICovXG5cdHB1YmxpYyBnZXQgYWxwaGFQcmVtdWx0aXBsaWVkKCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2FscGhhUHJlbXVsdGlwbGllZDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgYWxwaGFQcmVtdWx0aXBsaWVkKHZhbHVlOmJvb2xlYW4pXG5cdHtcblx0XHRpZiAodGhpcy5fYWxwaGFQcmVtdWx0aXBsaWVkID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fYWxwaGFQcmVtdWx0aXBsaWVkID0gdmFsdWU7XG5cblx0XHR0aGlzLl9wSW52YWxpZGF0ZVByb3BlcnRpZXMoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgbWluaW11bSBhbHBoYSB2YWx1ZSBmb3Igd2hpY2ggcGl4ZWxzIHNob3VsZCBiZSBkcmF3bi4gVGhpcyBpcyB1c2VkIGZvciB0cmFuc3BhcmVuY3kgdGhhdCBpcyBlaXRoZXJcblx0ICogaW52aXNpYmxlIG9yIGVudGlyZWx5IG9wYXF1ZSwgb2Z0ZW4gdXNlZCB3aXRoIHRleHR1cmVzIGZvciBmb2xpYWdlLCBldGMuXG5cdCAqIFJlY29tbWVuZGVkIHZhbHVlcyBhcmUgMCB0byBkaXNhYmxlIGFscGhhLCBvciAwLjUgdG8gY3JlYXRlIHNtb290aCBlZGdlcy4gRGVmYXVsdCB2YWx1ZSBpcyAwIChkaXNhYmxlZCkuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGFscGhhVGhyZXNob2xkKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcEFscGhhVGhyZXNob2xkO1xuXHR9XG5cblx0cHVibGljIHNldCBhbHBoYVRocmVzaG9sZCh2YWx1ZTpudW1iZXIpXG5cdHtcblx0XHRpZiAodmFsdWUgPCAwKVxuXHRcdFx0dmFsdWUgPSAwO1xuXHRcdGVsc2UgaWYgKHZhbHVlID4gMSlcblx0XHRcdHZhbHVlID0gMTtcblxuXHRcdGlmICh0aGlzLl9wQWxwaGFUaHJlc2hvbGQgPT0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9wQWxwaGFUaHJlc2hvbGQgPSB2YWx1ZTtcblxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlUHJvcGVydGllcygpO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHdpZHRoKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcFdpZHRoO1xuXHR9XG5cblx0Ly9cblx0Ly8gTUFURVJJQUwgTUFOQUdFTUVOVFxuXHQvL1xuXHQvKipcblx0ICogTWFyayBhbiBJUmVuZGVyYWJsZU93bmVyIGFzIG93bmVyIG9mIHRoaXMgbWF0ZXJpYWwuXG5cdCAqIEFzc3VyZXMgd2UncmUgbm90IHVzaW5nIHRoZSBzYW1lIG1hdGVyaWFsIGFjcm9zcyByZW5kZXJhYmxlcyB3aXRoIGRpZmZlcmVudCBhbmltYXRpb25zLCBzaW5jZSB0aGVcblx0ICogUHJvZ3JhbXMgZGVwZW5kIG9uIGFuaW1hdGlvbi4gVGhpcyBtZXRob2QgbmVlZHMgdG8gYmUgY2FsbGVkIHdoZW4gYSBtYXRlcmlhbCBpcyBhc3NpZ25lZC5cblx0ICpcblx0ICogQHBhcmFtIG93bmVyIFRoZSBJUmVuZGVyYWJsZU93bmVyIHRoYXQgaGFkIHRoaXMgbWF0ZXJpYWwgYXNzaWduZWRcblx0ICpcblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwdWJsaWMgaUFkZE93bmVyKG93bmVyOklSZW5kZXJhYmxlT3duZXIpXG5cdHtcblx0XHR0aGlzLl9vd25lcnMucHVzaChvd25lcik7XG5cblx0XHR2YXIgYW5pbWF0aW9uU2V0OklBbmltYXRpb25TZXQ7XG5cdFx0dmFyIGFuaW1hdG9yOklBbmltYXRvciA9IDxJQW5pbWF0b3I+IG93bmVyLmFuaW1hdG9yO1xuXG5cdFx0aWYgKGFuaW1hdG9yKVxuXHRcdFx0YW5pbWF0aW9uU2V0ID0gPElBbmltYXRpb25TZXQ+IGFuaW1hdG9yLmFuaW1hdGlvblNldDtcblxuXHRcdGlmIChvd25lci5hbmltYXRvcikge1xuXHRcdFx0aWYgKHRoaXMuX2FuaW1hdGlvblNldCAmJiBhbmltYXRpb25TZXQgIT0gdGhpcy5fYW5pbWF0aW9uU2V0KSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIkEgTWF0ZXJpYWwgaW5zdGFuY2UgY2Fubm90IGJlIHNoYXJlZCBhY3Jvc3MgbWF0ZXJpYWwgb3duZXJzIHdpdGggZGlmZmVyZW50IGFuaW1hdGlvbiBzZXRzXCIpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKHRoaXMuX2FuaW1hdGlvblNldCAhPSBhbmltYXRpb25TZXQpIHtcblxuXHRcdFx0XHRcdHRoaXMuX2FuaW1hdGlvblNldCA9IGFuaW1hdGlvblNldDtcblxuXHRcdFx0XHRcdHRoaXMuaW52YWxpZGF0ZUFuaW1hdGlvbigpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFJlbW92ZXMgYW4gSVJlbmRlcmFibGVPd25lciBhcyBvd25lci5cblx0ICogQHBhcmFtIG93bmVyXG5cdCAqXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHVibGljIGlSZW1vdmVPd25lcihvd25lcjpJUmVuZGVyYWJsZU93bmVyKVxuXHR7XG5cdFx0dGhpcy5fb3duZXJzLnNwbGljZSh0aGlzLl9vd25lcnMuaW5kZXhPZihvd25lciksIDEpO1xuXG5cdFx0aWYgKHRoaXMuX293bmVycy5sZW5ndGggPT0gMCkge1xuXHRcdFx0dGhpcy5fYW5pbWF0aW9uU2V0ID0gbnVsbDtcblxuXHRcdFx0dGhpcy5pbnZhbGlkYXRlQW5pbWF0aW9uKCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEEgbGlzdCBvZiB0aGUgSVJlbmRlcmFibGVPd25lcnMgdGhhdCB1c2UgdGhpcyBtYXRlcmlhbFxuXHQgKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0cHVibGljIGdldCBpT3duZXJzKCk6QXJyYXk8SVJlbmRlcmFibGVPd25lcj5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9vd25lcnM7XG5cdH1cblxuXHQvKipcblx0ICogTWFya3MgdGhlIHNoYWRlciBwcm9ncmFtcyBmb3IgYWxsIHBhc3NlcyBhcyBpbnZhbGlkLCBzbyB0aGV5IHdpbGwgYmUgcmVjb21waWxlZCBiZWZvcmUgdGhlIG5leHQgdXNlLlxuXHQgKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0cHVibGljIF9wSW52YWxpZGF0ZVByb3BlcnRpZXMoKVxuXHR7XG5cdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9yZW5kZXJPYmplY3RzLmxlbmd0aDtcblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBsZW47IGkrKylcblx0XHRcdHRoaXMuX3JlbmRlck9iamVjdHNbaV0uaW52YWxpZGF0ZVByb3BlcnRpZXMoKTtcblx0fVxuXG5cdHByaXZhdGUgaW52YWxpZGF0ZUFuaW1hdGlvbigpXG5cdHtcblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX3JlbmRlck9iamVjdHMubGVuZ3RoO1xuXHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IGxlbjsgaSsrKVxuXHRcdFx0dGhpcy5fcmVuZGVyT2JqZWN0c1tpXS5pbnZhbGlkYXRlQW5pbWF0aW9uKCk7XG5cdH1cblx0XG5cdHB1YmxpYyBfcEludmFsaWRhdGVSZW5kZXJPYmplY3QoKVxuXHR7XG5cdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9yZW5kZXJPYmplY3RzLmxlbmd0aDtcblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBsZW47IGkrKylcblx0XHRcdHRoaXMuX3JlbmRlck9iamVjdHNbaV0uaW52YWxpZGF0ZVJlbmRlck9iamVjdCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENhbGxlZCB3aGVuIHRoZSBsaWdodCBwaWNrZXIncyBjb25maWd1cmF0aW9uIGNoYW5nZWQuXG5cdCAqL1xuXHRwcml2YXRlIG9uTGlnaHRzQ2hhbmdlKGV2ZW50OkV2ZW50KVxuXHR7XG5cdFx0dGhpcy5fcEludmFsaWRhdGVSZW5kZXJPYmplY3QoKTtcblx0fVxuXG5cdHB1YmxpYyBfcE5vdGlmeVNpemVDaGFuZ2VkKClcblx0e1xuXHRcdGlmICghdGhpcy5fc2l6ZUNoYW5nZWQpXG5cdFx0XHR0aGlzLl9zaXplQ2hhbmdlZCA9IG5ldyBNYXRlcmlhbEV2ZW50KE1hdGVyaWFsRXZlbnQuU0laRV9DSEFOR0VEKTtcblxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCh0aGlzLl9zaXplQ2hhbmdlZCk7XG5cdH1cblxuXHRwdWJsaWMgX2lBZGRSZW5kZXJPYmplY3QocmVuZGVyT2JqZWN0OklSZW5kZXJPYmplY3QpOklSZW5kZXJPYmplY3Rcblx0e1xuXHRcdHRoaXMuX3JlbmRlck9iamVjdHMucHVzaChyZW5kZXJPYmplY3QpO1xuXG5cdFx0cmV0dXJuIHJlbmRlck9iamVjdDtcblx0fVxuXG5cdHB1YmxpYyBfaVJlbW92ZVJlbmRlck9iamVjdChyZW5kZXJPYmplY3Q6SVJlbmRlck9iamVjdCk6SVJlbmRlck9iamVjdFxuXHR7XG5cdFx0dGhpcy5fcmVuZGVyT2JqZWN0cy5zcGxpY2UodGhpcy5fcmVuZGVyT2JqZWN0cy5pbmRleE9mKHJlbmRlck9iamVjdCksIDEpO1xuXG5cdFx0cmV0dXJuIHJlbmRlck9iamVjdDtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcGFyYW0gcmVuZGVyZXJcblx0ICpcblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwdWJsaWMgZ2V0UmVuZGVyT2JqZWN0KHJlbmRlcmFibGVQb29sOklSZW5kZXJhYmxlUG9vbClcblx0e1xuXHRcdHJldHVybiByZW5kZXJhYmxlUG9vbC5nZXRNYXRlcmlhbFJlbmRlck9iamVjdCh0aGlzKTtcblx0fVxufVxuXG5leHBvcnQgPSBNYXRlcmlhbEJhc2U7Il19