var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Event = require("awayjs-core/lib/events/Event");
var AssetType = require("awayjs-core/lib/library/AssetType");
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
        this._materialPassData = new Array();
        this._materialData = new Array();
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
        this._pScreenPassesInvalid = true;
        this._pBlendMode = BlendMode.NORMAL;
        this._numPasses = 0;
        this._mipmap = false;
        this._smooth = true;
        this._repeat = false;
        this._color = 0xFFFFFF;
        this._pHeight = 1;
        this._pWidth = 1;
        this._pRequiresBlending = false;
        this._iMaterialId = Number(this.id);
        this._owners = new Array();
        this._passes = new Array();
        this._onPassChangeDelegate = function (event) { return _this.onPassChange(event); };
        this._onLightChangeDelegate = function (event) { return _this.onLightsChange(event); };
        this.alphaPremultiplied = false; //TODO: work out why this is different for WebGL
    }
    Object.defineProperty(MaterialBase.prototype, "assetType", {
        /**
         * @inheritDoc
         */
        get: function () {
            return AssetType.MATERIAL;
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
            this._pInvalidateScreenPasses();
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
         * Indicates whether or not any used textures should use smoothing.
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
         * the texture's borders when the uv coordinates are outside the [0, 1] interval.
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
        this._pClearScreenPasses();
        len = this._materialData.length;
        for (i = 0; i < len; i++)
            this._materialData[i].dispose();
        this._materialData = new Array();
        len = this._materialPassData.length;
        for (i = 0; i < len; i++)
            this._materialPassData[i].dispose();
        this._materialPassData = new Array();
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
            this._pInvalidatePasses();
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
    Object.defineProperty(MaterialBase.prototype, "requiresBlending", {
        /**
         * Indicates whether or not the material requires alpha blending during rendering.
         */
        get: function () {
            return this._pRequiresBlending;
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
    /**
     * Sets the render state for a pass that is independent of the rendered object. This needs to be called before
     * calling renderPass. Before activating a pass, the previously used pass needs to be deactivated.
     * @param pass The pass data to activate.
     * @param stage The Stage object which is currently used for rendering.
     * @param camera The camera from which the scene is viewed.
     * @private
     */
    MaterialBase.prototype._iActivatePass = function (pass, renderer, camera) {
        pass.materialPass._iActivate(pass, renderer, camera);
    };
    /**
     * Clears the render state for a pass. This needs to be called before activating another pass.
     * @param pass The pass to deactivate.
     * @param stage The Stage used for rendering
     *
     * @internal
     */
    MaterialBase.prototype._iDeactivatePass = function (pass, renderer) {
        pass.materialPass._iDeactivate(pass, renderer);
    };
    /**
     * Renders the current pass. Before calling renderPass, activatePass needs to be called with the same index.
     * @param pass The pass used to render the renderable.
     * @param renderable The IRenderable object to draw.
     * @param stage The Stage object used for rendering.
     * @param entityCollector The EntityCollector object that contains the visible scene data.
     * @param viewProjection The view-projection matrix used to project to the screen. This is not the same as
     * camera.viewProjection as it includes the scaling factors when rendering to textures.
     *
     * @internal
     */
    MaterialBase.prototype._iRenderPass = function (pass, renderable, stage, camera, viewProjection) {
        if (this._pLightPicker)
            this._pLightPicker.collectLights(renderable);
        pass.materialPass._iRender(pass, renderable, stage, camera, viewProjection);
    };
    //
    // MATERIAL MANAGEMENT
    //
    /**
     * Mark an IMaterialOwner as owner of this material.
     * Assures we're not using the same material across renderables with different animations, since the
     * Programs depend on animation. This method needs to be called when a material is assigned.
     *
     * @param owner The IMaterialOwner that had this material assigned
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
     * Removes an IMaterialOwner as owner.
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
         * A list of the IMaterialOwners that use this material
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
     * The amount of passes used by the material.
     *
     * @private
     */
    MaterialBase.prototype._iNumScreenPasses = function () {
        return this._numPasses;
    };
    Object.defineProperty(MaterialBase.prototype, "_iScreenPasses", {
        /**
         * A list of the screen passes used in this material
         *
         * @private
         */
        get: function () {
            return this._passes;
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
        var len = this._materialPassData.length;
        for (var i = 0; i < len; i++)
            this._materialPassData[i].invalidate();
        this.invalidateMaterial();
    };
    /**
     * Flags that the screen passes have become invalid and need possible re-ordering / adding / deleting
     */
    MaterialBase.prototype._pInvalidateScreenPasses = function () {
        this._pScreenPassesInvalid = true;
    };
    /**
     * Removes a pass from the material.
     * @param pass The pass to be removed.
     */
    MaterialBase.prototype._pRemoveScreenPass = function (pass) {
        pass.removeEventListener(Event.CHANGE, this._onPassChangeDelegate);
        this._passes.splice(this._passes.indexOf(pass), 1);
        this._numPasses--;
    };
    /**
     * Removes all passes from the material
     */
    MaterialBase.prototype._pClearScreenPasses = function () {
        for (var i = 0; i < this._numPasses; ++i)
            this._passes[i].removeEventListener(Event.CHANGE, this._onPassChangeDelegate);
        this._passes.length = this._numPasses = 0;
    };
    /**
     * Adds a pass to the material
     * @param pass
     */
    MaterialBase.prototype._pAddScreenPass = function (pass) {
        this._passes[this._numPasses++] = pass;
        pass.lightPicker = this._pLightPicker;
        pass.addEventListener(Event.CHANGE, this._onPassChangeDelegate);
        this.invalidateMaterial();
    };
    MaterialBase.prototype._iAddMaterialData = function (materialData) {
        this._materialData.push(materialData);
        return materialData;
    };
    MaterialBase.prototype._iRemoveMaterialData = function (materialData) {
        this._materialData.splice(this._materialData.indexOf(materialData), 1);
        return materialData;
    };
    /**
     * Performs any processing that needs to occur before any of its passes are used.
     *
     * @private
     */
    MaterialBase.prototype._iUpdateMaterial = function () {
    };
    /**
     * Listener for when a pass's shader code changes. It recalculates the render order id.
     */
    MaterialBase.prototype.onPassChange = function (event) {
        this.invalidateMaterial();
    };
    MaterialBase.prototype.invalidateAnimation = function () {
        var len = this._materialData.length;
        for (var i = 0; i < len; i++)
            this._materialData[i].invalidateAnimation();
    };
    MaterialBase.prototype.invalidateMaterial = function () {
        var len = this._materialData.length;
        for (var i = 0; i < len; i++)
            this._materialData[i].invalidateMaterial();
    };
    /**
     * Called when the light picker's configuration changed.
     */
    MaterialBase.prototype.onLightsChange = function (event) {
        this._pInvalidateScreenPasses();
    };
    MaterialBase.prototype._pNotifySizeChanged = function () {
        if (!this._sizeChanged)
            this._sizeChanged = new MaterialEvent(MaterialEvent.SIZE_CHANGED);
        this.dispatchEvent(this._sizeChanged);
    };
    MaterialBase.prototype._iAddMaterialPassData = function (materialPassData) {
        this._materialPassData.push(materialPassData);
        return materialPassData;
    };
    MaterialBase.prototype._iRemoveMaterialPassData = function (materialPassData) {
        this._materialPassData.splice(this._materialPassData.indexOf(materialPassData), 1);
        return materialPassData;
    };
    return MaterialBase;
})(NamedAssetBase);
module.exports = MaterialBase;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9tYXRlcmlhbHMvTWF0ZXJpYWxCYXNlLnRzIl0sIm5hbWVzIjpbIk1hdGVyaWFsQmFzZSIsIk1hdGVyaWFsQmFzZS5jb25zdHJ1Y3RvciIsIk1hdGVyaWFsQmFzZS5hc3NldFR5cGUiLCJNYXRlcmlhbEJhc2UuaGVpZ2h0IiwiTWF0ZXJpYWxCYXNlLmFuaW1hdGlvblNldCIsIk1hdGVyaWFsQmFzZS5saWdodFBpY2tlciIsIk1hdGVyaWFsQmFzZS5taXBtYXAiLCJNYXRlcmlhbEJhc2Uuc21vb3RoIiwiTWF0ZXJpYWxCYXNlLnJlcGVhdCIsIk1hdGVyaWFsQmFzZS5jb2xvciIsIk1hdGVyaWFsQmFzZS50ZXh0dXJlIiwiTWF0ZXJpYWxCYXNlLmFuaW1hdGVVVnMiLCJNYXRlcmlhbEJhc2UuZW5hYmxlTGlnaHRGYWxsT2ZmIiwiTWF0ZXJpYWxCYXNlLmRpZmZ1c2VMaWdodFNvdXJjZXMiLCJNYXRlcmlhbEJhc2Uuc3BlY3VsYXJMaWdodFNvdXJjZXMiLCJNYXRlcmlhbEJhc2UuZGlzcG9zZSIsIk1hdGVyaWFsQmFzZS5ib3RoU2lkZXMiLCJNYXRlcmlhbEJhc2UuYmxlbmRNb2RlIiwiTWF0ZXJpYWxCYXNlLmFscGhhUHJlbXVsdGlwbGllZCIsIk1hdGVyaWFsQmFzZS5hbHBoYVRocmVzaG9sZCIsIk1hdGVyaWFsQmFzZS5yZXF1aXJlc0JsZW5kaW5nIiwiTWF0ZXJpYWxCYXNlLndpZHRoIiwiTWF0ZXJpYWxCYXNlLl9pQWN0aXZhdGVQYXNzIiwiTWF0ZXJpYWxCYXNlLl9pRGVhY3RpdmF0ZVBhc3MiLCJNYXRlcmlhbEJhc2UuX2lSZW5kZXJQYXNzIiwiTWF0ZXJpYWxCYXNlLmlBZGRPd25lciIsIk1hdGVyaWFsQmFzZS5pUmVtb3ZlT3duZXIiLCJNYXRlcmlhbEJhc2UuaU93bmVycyIsIk1hdGVyaWFsQmFzZS5faU51bVNjcmVlblBhc3NlcyIsIk1hdGVyaWFsQmFzZS5faVNjcmVlblBhc3NlcyIsIk1hdGVyaWFsQmFzZS5fcEludmFsaWRhdGVQYXNzZXMiLCJNYXRlcmlhbEJhc2UuX3BJbnZhbGlkYXRlU2NyZWVuUGFzc2VzIiwiTWF0ZXJpYWxCYXNlLl9wUmVtb3ZlU2NyZWVuUGFzcyIsIk1hdGVyaWFsQmFzZS5fcENsZWFyU2NyZWVuUGFzc2VzIiwiTWF0ZXJpYWxCYXNlLl9wQWRkU2NyZWVuUGFzcyIsIk1hdGVyaWFsQmFzZS5faUFkZE1hdGVyaWFsRGF0YSIsIk1hdGVyaWFsQmFzZS5faVJlbW92ZU1hdGVyaWFsRGF0YSIsIk1hdGVyaWFsQmFzZS5faVVwZGF0ZU1hdGVyaWFsIiwiTWF0ZXJpYWxCYXNlLm9uUGFzc0NoYW5nZSIsIk1hdGVyaWFsQmFzZS5pbnZhbGlkYXRlQW5pbWF0aW9uIiwiTWF0ZXJpYWxCYXNlLmludmFsaWRhdGVNYXRlcmlhbCIsIk1hdGVyaWFsQmFzZS5vbkxpZ2h0c0NoYW5nZSIsIk1hdGVyaWFsQmFzZS5fcE5vdGlmeVNpemVDaGFuZ2VkIiwiTWF0ZXJpYWxCYXNlLl9pQWRkTWF0ZXJpYWxQYXNzRGF0YSIsIk1hdGVyaWFsQmFzZS5faVJlbW92ZU1hdGVyaWFsUGFzc0RhdGEiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLElBQU8sS0FBSyxXQUFnQiw4QkFBOEIsQ0FBQyxDQUFDO0FBQzVELElBQU8sU0FBUyxXQUFlLG1DQUFtQyxDQUFDLENBQUM7QUFFcEUsSUFBTyxjQUFjLFdBQWMsd0NBQXdDLENBQUMsQ0FBQztBQUs3RSxJQUFPLFNBQVMsV0FBZSxtQ0FBbUMsQ0FBQyxDQUFDO0FBT3BFLElBQU8sYUFBYSxXQUFjLHlDQUF5QyxDQUFDLENBQUM7QUFNN0UsQUFXQTs7Ozs7Ozs7OztHQURHO0lBQ0csWUFBWTtJQUFTQSxVQUFyQkEsWUFBWUEsVUFBdUJBO0lBbUV4Q0E7O09BRUdBO0lBQ0hBLFNBdEVLQSxZQUFZQTtRQUFsQkMsaUJBNHJCQ0E7UUFwbkJDQSxpQkFBT0EsQ0FBQ0E7UUFyRURBLHNCQUFpQkEsR0FBNEJBLElBQUlBLEtBQUtBLEVBQXFCQSxDQUFDQTtRQUM1RUEsa0JBQWFB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QTtJQUM3Q0EsQ0FBQ0E7SUFFRHhDOztPQUVHQTtJQUNLQSxxQ0FBY0EsR0FBdEJBLFVBQXVCQSxLQUFXQTtRQUVqQ3lDLElBQUlBLENBQUNBLHdCQUF3QkEsRUFBRUEsQ0FBQ0E7SUFDakNBLENBQUNBO0lBRU16QywwQ0FBbUJBLEdBQTFCQTtRQUVDMEMsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0E7WUFDdEJBLElBQUlBLENBQUNBLFlBQVlBLEdBQUdBLElBQUlBLGFBQWFBLENBQUNBLGFBQWFBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBO1FBRW5FQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQTtJQUN2Q0EsQ0FBQ0E7SUFFTTFDLDRDQUFxQkEsR0FBNUJBLFVBQTZCQSxnQkFBa0NBO1FBRTlEMkMsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLENBQUNBLENBQUNBO1FBRTlDQSxNQUFNQSxDQUFDQSxnQkFBZ0JBLENBQUNBO0lBQ3pCQSxDQUFDQTtJQUVNM0MsK0NBQXdCQSxHQUEvQkEsVUFBZ0NBLGdCQUFrQ0E7UUFFakU0QyxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUVuRkEsTUFBTUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQTtJQUN6QkEsQ0FBQ0E7SUFDRjVDLG1CQUFDQTtBQUFEQSxDQTVyQkEsQUE0ckJDQSxFQTVyQjBCLGNBQWMsRUE0ckJ4QztBQUVELEFBQXNCLGlCQUFiLFlBQVksQ0FBQyIsImZpbGUiOiJtYXRlcmlhbHMvTWF0ZXJpYWxCYXNlLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNYXRyaXgzRFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL01hdHJpeDNEXCIpO1xuaW1wb3J0IEV2ZW50XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2V2ZW50cy9FdmVudFwiKTtcbmltcG9ydCBBc3NldFR5cGVcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvQXNzZXRUeXBlXCIpO1xuaW1wb3J0IElBc3NldFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0lBc3NldFwiKTtcbmltcG9ydCBOYW1lZEFzc2V0QmFzZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvTmFtZWRBc3NldEJhc2VcIik7XG5pbXBvcnQgVGV4dHVyZTJEQmFzZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL3RleHR1cmVzL1RleHR1cmUyREJhc2VcIik7XG5cbmltcG9ydCBJQW5pbWF0aW9uU2V0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYW5pbWF0b3JzL0lBbmltYXRpb25TZXRcIik7XG5pbXBvcnQgSUFuaW1hdG9yXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9hbmltYXRvcnMvSUFuaW1hdG9yXCIpO1xuaW1wb3J0IEJsZW5kTW9kZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9CbGVuZE1vZGVcIik7XG5pbXBvcnQgSU1hdGVyaWFsT3duZXJcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0lNYXRlcmlhbE93bmVyXCIpO1xuaW1wb3J0IElTdGFnZVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0lTdGFnZVwiKTtcbmltcG9ydCBJUmVuZGVyYWJsZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcG9vbC9JUmVuZGVyYWJsZVwiKTtcbmltcG9ydCBJTWF0ZXJpYWxEYXRhXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcG9vbC9JTWF0ZXJpYWxEYXRhXCIpO1xuaW1wb3J0IElNYXRlcmlhbFBhc3NEYXRhXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3Bvb2wvSU1hdGVyaWFsUGFzc0RhdGFcIik7XG5pbXBvcnQgQ2FtZXJhXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2VudGl0aWVzL0NhbWVyYVwiKTtcbmltcG9ydCBNYXRlcmlhbEV2ZW50XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZXZlbnRzL01hdGVyaWFsRXZlbnRcIik7XG5pbXBvcnQgTGlnaHRQaWNrZXJCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvbWF0ZXJpYWxzL2xpZ2h0cGlja2Vycy9MaWdodFBpY2tlckJhc2VcIik7XG5pbXBvcnQgSU1hdGVyaWFsUGFzc1x0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL21hdGVyaWFscy9wYXNzZXMvSU1hdGVyaWFsUGFzc1wiKTtcbmltcG9ydCBJUmVuZGVyZXJcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3JlbmRlci9JUmVuZGVyZXJcIik7XG5cblxuLyoqXG4gKiBNYXRlcmlhbEJhc2UgZm9ybXMgYW4gYWJzdHJhY3QgYmFzZSBjbGFzcyBmb3IgYW55IG1hdGVyaWFsLlxuICogQSBtYXRlcmlhbCBjb25zaXN0cyBvZiBzZXZlcmFsIHBhc3NlcywgZWFjaCBvZiB3aGljaCBjb25zdGl0dXRlcyBhdCBsZWFzdCBvbmUgcmVuZGVyIGNhbGwuIFNldmVyYWwgcGFzc2VzIGNvdWxkXG4gKiBiZSB1c2VkIGZvciBzcGVjaWFsIGVmZmVjdHMgKHJlbmRlciBsaWdodGluZyBmb3IgbWFueSBsaWdodHMgaW4gc2V2ZXJhbCBwYXNzZXMsIHJlbmRlciBhbiBvdXRsaW5lIGluIGEgc2VwYXJhdGVcbiAqIHBhc3MpIG9yIHRvIHByb3ZpZGUgYWRkaXRpb25hbCByZW5kZXItdG8tdGV4dHVyZSBwYXNzZXMgKHJlbmRlcmluZyBkaWZmdXNlIGxpZ2h0IHRvIHRleHR1cmUgZm9yIHRleHR1cmUtc3BhY2VcbiAqIHN1YnN1cmZhY2Ugc2NhdHRlcmluZywgb3IgcmVuZGVyaW5nIGEgZGVwdGggbWFwIGZvciBzcGVjaWFsaXplZCBzZWxmLXNoYWRvd2luZykuXG4gKlxuICogQXdheTNEIHByb3ZpZGVzIGRlZmF1bHQgbWF0ZXJpYWxzIHRyb3VnaCBTaW5nbGVQYXNzTWF0ZXJpYWxCYXNlIGFuZCBUcmlhbmdsZU1hdGVyaWFsLCB3aGljaCB1c2UgbW9kdWxhclxuICogbWV0aG9kcyB0byBidWlsZCB0aGUgc2hhZGVyIGNvZGUuIE1hdGVyaWFsQmFzZSBjYW4gYmUgZXh0ZW5kZWQgdG8gYnVpbGQgc3BlY2lmaWMgYW5kIGhpZ2gtcGVyZm9ybWFudCBjdXN0b21cbiAqIHNoYWRlcnMsIG9yIGVudGlyZSBuZXcgbWF0ZXJpYWwgZnJhbWV3b3Jrcy5cbiAqL1xuY2xhc3MgTWF0ZXJpYWxCYXNlIGV4dGVuZHMgTmFtZWRBc3NldEJhc2UgaW1wbGVtZW50cyBJQXNzZXRcbntcblx0cHJpdmF0ZSBfc2l6ZUNoYW5nZWQ6TWF0ZXJpYWxFdmVudDtcblx0cHJpdmF0ZSBfbWF0ZXJpYWxQYXNzRGF0YTpBcnJheTxJTWF0ZXJpYWxQYXNzRGF0YT4gPSBuZXcgQXJyYXk8SU1hdGVyaWFsUGFzc0RhdGE+KCk7XG5cdHByaXZhdGUgX21hdGVyaWFsRGF0YTpBcnJheTxJTWF0ZXJpYWxEYXRhPiA9IG5ldyBBcnJheTxJTWF0ZXJpYWxEYXRhPigpO1xuXG5cdHB1YmxpYyBfcEFscGhhVGhyZXNob2xkOm51bWJlciA9IDA7XG5cdHB1YmxpYyBfcEFuaW1hdGVVVnM6Ym9vbGVhbiA9IGZhbHNlO1xuXHRwcml2YXRlIF9lbmFibGVMaWdodEZhbGxPZmY6Ym9vbGVhbiA9IHRydWU7XG5cdHByaXZhdGUgX3NwZWN1bGFyTGlnaHRTb3VyY2VzOm51bWJlciA9IDB4MDE7XG5cdHByaXZhdGUgX2RpZmZ1c2VMaWdodFNvdXJjZXM6bnVtYmVyID0gMHgwMztcblxuXHQvKipcblx0ICogQW4gb2JqZWN0IHRvIGNvbnRhaW4gYW55IGV4dHJhIGRhdGEuXG5cdCAqL1xuXHRwdWJsaWMgZXh0cmE6T2JqZWN0O1xuXG5cdC8qKlxuXHQgKiBBIHZhbHVlIHRoYXQgY2FuIGJlIHVzZWQgYnkgbWF0ZXJpYWxzIHRoYXQgb25seSB3b3JrIHdpdGggYSBnaXZlbiB0eXBlIG9mIHJlbmRlcmVyLiBUaGUgcmVuZGVyZXIgY2FuIHRlc3QgdGhlXG5cdCAqIGNsYXNzaWZpY2F0aW9uIHRvIGNob29zZSB3aGljaCByZW5kZXIgcGF0aCB0byB1c2UuIEZvciBleGFtcGxlLCBhIGRlZmVycmVkIG1hdGVyaWFsIGNvdWxkIHNldCB0aGlzIHZhbHVlIHNvXG5cdCAqIHRoYXQgdGhlIGRlZmVycmVkIHJlbmRlcmVyIGtub3dzIG5vdCB0byB0YWtlIHRoZSBmb3J3YXJkIHJlbmRlcmluZyBwYXRoLlxuXHQgKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0cHVibGljIF9pQ2xhc3NpZmljYXRpb246c3RyaW5nO1xuXG5cblx0LyoqXG5cdCAqIEFuIGlkIGZvciB0aGlzIG1hdGVyaWFsIHVzZWQgdG8gc29ydCB0aGUgcmVuZGVyYWJsZXMgYnkgc2hhZGVyIHByb2dyYW0sIHdoaWNoIHJlZHVjZXMgUHJvZ3JhbSBzdGF0ZSBjaGFuZ2VzLlxuXHQgKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0cHVibGljIF9pTWF0ZXJpYWxJZDpudW1iZXIgPSAwO1xuXG5cdHB1YmxpYyBfaUJhc2VTY3JlZW5QYXNzSW5kZXg6bnVtYmVyID0gMDtcblxuXHRwcml2YXRlIF9ib3RoU2lkZXM6Ym9vbGVhbiA9IGZhbHNlOyAvLyB1cGRhdGVcblx0cHJpdmF0ZSBfYW5pbWF0aW9uU2V0OklBbmltYXRpb25TZXQ7XG5cdHB1YmxpYyBfcFNjcmVlblBhc3Nlc0ludmFsaWQ6Ym9vbGVhbiA9IHRydWU7XG5cblx0LyoqXG5cdCAqIEEgbGlzdCBvZiBtYXRlcmlhbCBvd25lcnMsIHJlbmRlcmFibGVzIG9yIGN1c3RvbSBFbnRpdGllcy5cblx0ICovXG5cdHByaXZhdGUgX293bmVyczpBcnJheTxJTWF0ZXJpYWxPd25lcj47XG5cblx0cHJpdmF0ZSBfYWxwaGFQcmVtdWx0aXBsaWVkOmJvb2xlYW47XG5cblx0cHVibGljIF9wQmxlbmRNb2RlOnN0cmluZyA9IEJsZW5kTW9kZS5OT1JNQUw7XG5cblx0cHJpdmF0ZSBfbnVtUGFzc2VzOm51bWJlciA9IDA7XG5cdHByaXZhdGUgX3Bhc3NlczpBcnJheTxJTWF0ZXJpYWxQYXNzPjtcblxuXHRwcml2YXRlIF9taXBtYXA6Ym9vbGVhbiA9IGZhbHNlO1xuXHRwcml2YXRlIF9zbW9vdGg6Ym9vbGVhbiA9IHRydWU7XG5cdHByaXZhdGUgX3JlcGVhdDpib29sZWFuID0gZmFsc2U7XG5cdHByaXZhdGUgX2NvbG9yOm51bWJlciA9IDB4RkZGRkZGO1xuXHRwdWJsaWMgX3BUZXh0dXJlOlRleHR1cmUyREJhc2U7XG5cblx0cHVibGljIF9wTGlnaHRQaWNrZXI6TGlnaHRQaWNrZXJCYXNlO1xuXG5cdHB1YmxpYyBfcEhlaWdodDpudW1iZXIgPSAxO1xuXHRwdWJsaWMgX3BXaWR0aDpudW1iZXIgPSAxO1xuXHRwdWJsaWMgX3BSZXF1aXJlc0JsZW5kaW5nOmJvb2xlYW4gPSBmYWxzZTtcblxuXHRwcml2YXRlIF9vblBhc3NDaGFuZ2VEZWxlZ2F0ZTooZXZlbnQ6RXZlbnQpID0+IHZvaWQ7XG5cdHByaXZhdGUgX29uTGlnaHRDaGFuZ2VEZWxlZ2F0ZTooZXZlbnQ6RXZlbnQpID0+IHZvaWQ7XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBuZXcgTWF0ZXJpYWxCYXNlIG9iamVjdC5cblx0ICovXG5cdGNvbnN0cnVjdG9yKClcblx0e1xuXHRcdHN1cGVyKCk7XG5cblx0XHR0aGlzLl9pTWF0ZXJpYWxJZCA9IE51bWJlcih0aGlzLmlkKTtcblxuXHRcdHRoaXMuX293bmVycyA9IG5ldyBBcnJheTxJTWF0ZXJpYWxPd25lcj4oKTtcblx0XHR0aGlzLl9wYXNzZXMgPSBuZXcgQXJyYXk8SU1hdGVyaWFsUGFzcz4oKTtcblxuXHRcdHRoaXMuX29uUGFzc0NoYW5nZURlbGVnYXRlID0gKGV2ZW50OkV2ZW50KSA9PiB0aGlzLm9uUGFzc0NoYW5nZShldmVudCk7XG5cdFx0dGhpcy5fb25MaWdodENoYW5nZURlbGVnYXRlID0gKGV2ZW50OkV2ZW50KSA9PiB0aGlzLm9uTGlnaHRzQ2hhbmdlKGV2ZW50KTtcblxuXHRcdHRoaXMuYWxwaGFQcmVtdWx0aXBsaWVkID0gZmFsc2U7IC8vVE9ETzogd29yayBvdXQgd2h5IHRoaXMgaXMgZGlmZmVyZW50IGZvciBXZWJHTFxuXHR9XG5cblx0LyoqXG5cdCAqIEBpbmhlcml0RG9jXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGFzc2V0VHlwZSgpOnN0cmluZ1xuXHR7XG5cdFx0cmV0dXJuIEFzc2V0VHlwZS5NQVRFUklBTDtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBoZWlnaHQoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wSGVpZ2h0O1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGFuaW1hdGlvblNldCgpOklBbmltYXRpb25TZXRcblx0e1xuXHRcdHJldHVybiB0aGlzLl9hbmltYXRpb25TZXQ7XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBUaGUgbGlnaHQgcGlja2VyIHVzZWQgYnkgdGhlIG1hdGVyaWFsIHRvIHByb3ZpZGUgbGlnaHRzIHRvIHRoZSBtYXRlcmlhbCBpZiBpdCBzdXBwb3J0cyBsaWdodGluZy5cblx0ICpcblx0ICogQHNlZSBMaWdodFBpY2tlckJhc2Vcblx0ICogQHNlZSBTdGF0aWNMaWdodFBpY2tlclxuXHQgKi9cblx0cHVibGljIGdldCBsaWdodFBpY2tlcigpOkxpZ2h0UGlja2VyQmFzZVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BMaWdodFBpY2tlcjtcblx0fVxuXG5cdHB1YmxpYyBzZXQgbGlnaHRQaWNrZXIodmFsdWU6TGlnaHRQaWNrZXJCYXNlKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3BMaWdodFBpY2tlciA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdGlmICh0aGlzLl9wTGlnaHRQaWNrZXIpXG5cdFx0XHR0aGlzLl9wTGlnaHRQaWNrZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihFdmVudC5DSEFOR0UsIHRoaXMuX29uTGlnaHRDaGFuZ2VEZWxlZ2F0ZSk7XG5cblx0XHR0aGlzLl9wTGlnaHRQaWNrZXIgPSB2YWx1ZTtcblxuXHRcdGlmICh0aGlzLl9wTGlnaHRQaWNrZXIpXG5cdFx0XHR0aGlzLl9wTGlnaHRQaWNrZXIuYWRkRXZlbnRMaXN0ZW5lcihFdmVudC5DSEFOR0UsIHRoaXMuX29uTGlnaHRDaGFuZ2VEZWxlZ2F0ZSk7XG5cblx0XHR0aGlzLl9wSW52YWxpZGF0ZVNjcmVlblBhc3NlcygpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB3aGV0aGVyIG9yIG5vdCBhbnkgdXNlZCB0ZXh0dXJlcyBzaG91bGQgdXNlIG1pcG1hcHBpbmcuIERlZmF1bHRzIHRvIHRydWUuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IG1pcG1hcCgpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9taXBtYXA7XG5cdH1cblxuXHRwdWJsaWMgc2V0IG1pcG1hcCh2YWx1ZTpib29sZWFuKVxuXHR7XG5cdFx0aWYgKHRoaXMuX21pcG1hcCA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX21pcG1hcCA9IHZhbHVlO1xuXG5cdFx0dGhpcy5fcEludmFsaWRhdGVQYXNzZXMoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgd2hldGhlciBvciBub3QgYW55IHVzZWQgdGV4dHVyZXMgc2hvdWxkIHVzZSBzbW9vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHNtb290aCgpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9zbW9vdGg7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHNtb290aCh2YWx1ZTpib29sZWFuKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3Ntb290aCA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3Ntb290aCA9IHZhbHVlO1xuXG5cdFx0dGhpcy5fcEludmFsaWRhdGVQYXNzZXMoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgd2hldGhlciBvciBub3QgYW55IHVzZWQgdGV4dHVyZXMgc2hvdWxkIGJlIHRpbGVkLiBJZiBzZXQgdG8gZmFsc2UsIHRleHR1cmUgc2FtcGxlcyBhcmUgY2xhbXBlZCB0b1xuXHQgKiB0aGUgdGV4dHVyZSdzIGJvcmRlcnMgd2hlbiB0aGUgdXYgY29vcmRpbmF0ZXMgYXJlIG91dHNpZGUgdGhlIFswLCAxXSBpbnRlcnZhbC5cblx0ICovXG5cdHB1YmxpYyBnZXQgcmVwZWF0KCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3JlcGVhdDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgcmVwZWF0KHZhbHVlOmJvb2xlYW4pXG5cdHtcblx0XHRpZiAodGhpcy5fcmVwZWF0ID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fcmVwZWF0ID0gdmFsdWU7XG5cblx0XHR0aGlzLl9wSW52YWxpZGF0ZVBhc3NlcygpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBkaWZmdXNlIHJlZmxlY3Rpdml0eSBjb2xvciBvZiB0aGUgc3VyZmFjZS5cblx0ICovXG5cdHB1YmxpYyBnZXQgY29sb3IoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9jb2xvcjtcblx0fVxuXG5cdHB1YmxpYyBzZXQgY29sb3IodmFsdWU6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2NvbG9yID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fY29sb3IgPSB2YWx1ZTtcblxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlUGFzc2VzKCk7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIHRleHR1cmUgb2JqZWN0IHRvIHVzZSBmb3IgdGhlIGFsYmVkbyBjb2xvdXIuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHRleHR1cmUoKTpUZXh0dXJlMkRCYXNlXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcFRleHR1cmU7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHRleHR1cmUodmFsdWU6VGV4dHVyZTJEQmFzZSlcblx0e1xuXHRcdGlmICh0aGlzLl9wVGV4dHVyZSA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3BUZXh0dXJlID0gdmFsdWU7XG5cblx0XHR0aGlzLl9wSW52YWxpZGF0ZVBhc3NlcygpO1xuXG5cdFx0dGhpcy5fcEhlaWdodCA9IHRoaXMuX3BUZXh0dXJlLmhlaWdodDtcblx0XHR0aGlzLl9wV2lkdGggPSB0aGlzLl9wVGV4dHVyZS53aWR0aDtcblxuXHRcdHRoaXMuX3BOb3RpZnlTaXplQ2hhbmdlZCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNwZWNpZmllcyB3aGV0aGVyIG9yIG5vdCB0aGUgVVYgY29vcmRpbmF0ZXMgc2hvdWxkIGJlIGFuaW1hdGVkIHVzaW5nIGEgdHJhbnNmb3JtYXRpb24gbWF0cml4LlxuXHQgKi9cblx0cHVibGljIGdldCBhbmltYXRlVVZzKCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BBbmltYXRlVVZzO1xuXHR9XG5cblx0cHVibGljIHNldCBhbmltYXRlVVZzKHZhbHVlOmJvb2xlYW4pXG5cdHtcblx0XHRpZiAodGhpcy5fcEFuaW1hdGVVVnMgPT0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9wQW5pbWF0ZVVWcyA9IHZhbHVlO1xuXG5cdFx0dGhpcy5fcEludmFsaWRhdGVQYXNzZXMoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBXaGV0aGVyIG9yIG5vdCB0byB1c2UgZmFsbE9mZiBhbmQgcmFkaXVzIHByb3BlcnRpZXMgZm9yIGxpZ2h0cy4gVGhpcyBjYW4gYmUgdXNlZCB0byBpbXByb3ZlIHBlcmZvcm1hbmNlIGFuZFxuXHQgKiBjb21wYXRpYmlsaXR5IGZvciBjb25zdHJhaW5lZCBtb2RlLlxuXHQgKi9cblx0cHVibGljIGdldCBlbmFibGVMaWdodEZhbGxPZmYoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fZW5hYmxlTGlnaHRGYWxsT2ZmO1xuXHR9XG5cblx0cHVibGljIHNldCBlbmFibGVMaWdodEZhbGxPZmYodmFsdWU6Ym9vbGVhbilcblx0e1xuXHRcdGlmICh0aGlzLl9lbmFibGVMaWdodEZhbGxPZmYgPT0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9lbmFibGVMaWdodEZhbGxPZmYgPSB2YWx1ZTtcblxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlUGFzc2VzKCk7XG5cdH1cblxuXHQvKipcblx0ICogRGVmaW5lIHdoaWNoIGxpZ2h0IHNvdXJjZSB0eXBlcyB0byB1c2UgZm9yIGRpZmZ1c2UgcmVmbGVjdGlvbnMuIFRoaXMgYWxsb3dzIGNob29zaW5nIGJldHdlZW4gcmVndWxhciBsaWdodHNcblx0ICogYW5kL29yIGxpZ2h0IHByb2JlcyBmb3IgZGlmZnVzZSByZWZsZWN0aW9ucy5cblx0ICpcblx0ICogQHNlZSBhd2F5M2QubWF0ZXJpYWxzLkxpZ2h0U291cmNlc1xuXHQgKi9cblx0cHVibGljIGdldCBkaWZmdXNlTGlnaHRTb3VyY2VzKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fZGlmZnVzZUxpZ2h0U291cmNlcztcblx0fVxuXG5cdHB1YmxpYyBzZXQgZGlmZnVzZUxpZ2h0U291cmNlcyh2YWx1ZTpudW1iZXIpXG5cdHtcblx0XHRpZiAodGhpcy5fZGlmZnVzZUxpZ2h0U291cmNlcyA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX2RpZmZ1c2VMaWdodFNvdXJjZXMgPSB2YWx1ZTtcblxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlUGFzc2VzKCk7XG5cdH1cblxuXHQvKipcblx0ICogRGVmaW5lIHdoaWNoIGxpZ2h0IHNvdXJjZSB0eXBlcyB0byB1c2UgZm9yIHNwZWN1bGFyIHJlZmxlY3Rpb25zLiBUaGlzIGFsbG93cyBjaG9vc2luZyBiZXR3ZWVuIHJlZ3VsYXIgbGlnaHRzXG5cdCAqIGFuZC9vciBsaWdodCBwcm9iZXMgZm9yIHNwZWN1bGFyIHJlZmxlY3Rpb25zLlxuXHQgKlxuXHQgKiBAc2VlIGF3YXkzZC5tYXRlcmlhbHMuTGlnaHRTb3VyY2VzXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHNwZWN1bGFyTGlnaHRTb3VyY2VzKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fc3BlY3VsYXJMaWdodFNvdXJjZXM7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHNwZWN1bGFyTGlnaHRTb3VyY2VzKHZhbHVlOm51bWJlcilcblx0e1xuXHRcdGlmICh0aGlzLl9zcGVjdWxhckxpZ2h0U291cmNlcyA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3NwZWN1bGFyTGlnaHRTb3VyY2VzID0gdmFsdWU7XG5cblx0XHR0aGlzLl9wSW52YWxpZGF0ZVBhc3NlcygpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENsZWFucyB1cCByZXNvdXJjZXMgb3duZWQgYnkgdGhlIG1hdGVyaWFsLCBpbmNsdWRpbmcgcGFzc2VzLiBUZXh0dXJlcyBhcmUgbm90IG93bmVkIGJ5IHRoZSBtYXRlcmlhbCBzaW5jZSB0aGV5XG5cdCAqIGNvdWxkIGJlIHVzZWQgYnkgb3RoZXIgbWF0ZXJpYWxzIGFuZCB3aWxsIG5vdCBiZSBkaXNwb3NlZC5cblx0ICovXG5cdHB1YmxpYyBkaXNwb3NlKClcblx0e1xuXHRcdHZhciBpOm51bWJlcjtcblx0XHR2YXIgbGVuOm51bWJlcjtcblxuXHRcdHRoaXMuX3BDbGVhclNjcmVlblBhc3NlcygpO1xuXG5cdFx0bGVuID0gdGhpcy5fbWF0ZXJpYWxEYXRhLmxlbmd0aDtcblx0XHRmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspXG5cdFx0XHR0aGlzLl9tYXRlcmlhbERhdGFbaV0uZGlzcG9zZSgpO1xuXG5cdFx0dGhpcy5fbWF0ZXJpYWxEYXRhID0gbmV3IEFycmF5PElNYXRlcmlhbERhdGE+KCk7XG5cblx0XHRsZW4gPSB0aGlzLl9tYXRlcmlhbFBhc3NEYXRhLmxlbmd0aDtcblx0XHRmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspXG5cdFx0XHR0aGlzLl9tYXRlcmlhbFBhc3NEYXRhW2ldLmRpc3Bvc2UoKTtcblxuXHRcdHRoaXMuX21hdGVyaWFsUGFzc0RhdGEgPSBuZXcgQXJyYXk8SU1hdGVyaWFsUGFzc0RhdGE+KCk7XG5cdH1cblxuXHQvKipcblx0ICogRGVmaW5lcyB3aGV0aGVyIG9yIG5vdCB0aGUgbWF0ZXJpYWwgc2hvdWxkIGN1bGwgdHJpYW5nbGVzIGZhY2luZyBhd2F5IGZyb20gdGhlIGNhbWVyYS5cblx0ICovXG5cdHB1YmxpYyBnZXQgYm90aFNpZGVzKCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2JvdGhTaWRlcztcblx0fVxuXG5cdHB1YmxpYyBzZXQgYm90aFNpZGVzKHZhbHVlOmJvb2xlYW4pXG5cdHtcblx0XHRpZiAodGhpcy5fYm90aFNpZGVzID0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9ib3RoU2lkZXMgPSB2YWx1ZTtcblxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlUGFzc2VzKCk7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIGJsZW5kIG1vZGUgdG8gdXNlIHdoZW4gZHJhd2luZyB0aGlzIHJlbmRlcmFibGUuIFRoZSBmb2xsb3dpbmcgYmxlbmQgbW9kZXMgYXJlIHN1cHBvcnRlZDpcblx0ICogPHVsPlxuXHQgKiA8bGk+QmxlbmRNb2RlLk5PUk1BTDogTm8gYmxlbmRpbmcsIHVubGVzcyB0aGUgbWF0ZXJpYWwgaW5oZXJlbnRseSBuZWVkcyBpdDwvbGk+XG5cdCAqIDxsaT5CbGVuZE1vZGUuTEFZRVI6IEZvcmNlIGJsZW5kaW5nLiBUaGlzIHdpbGwgZHJhdyB0aGUgb2JqZWN0IHRoZSBzYW1lIGFzIE5PUk1BTCwgYnV0IHdpdGhvdXQgd3JpdGluZyBkZXB0aCB3cml0ZXMuPC9saT5cblx0ICogPGxpPkJsZW5kTW9kZS5NVUxUSVBMWTwvbGk+XG5cdCAqIDxsaT5CbGVuZE1vZGUuQUREPC9saT5cblx0ICogPGxpPkJsZW5kTW9kZS5BTFBIQTwvbGk+XG5cdCAqIDwvdWw+XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGJsZW5kTW9kZSgpOnN0cmluZ1xuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BCbGVuZE1vZGU7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGJsZW5kTW9kZSh2YWx1ZTpzdHJpbmcpXG5cdHtcblx0XHRpZiAodGhpcy5fcEJsZW5kTW9kZSA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3BCbGVuZE1vZGUgPSB2YWx1ZTtcblxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlUGFzc2VzKCk7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHdoZXRoZXIgdmlzaWJsZSB0ZXh0dXJlcyAob3Igb3RoZXIgcGl4ZWxzKSB1c2VkIGJ5IHRoaXMgbWF0ZXJpYWwgaGF2ZVxuXHQgKiBhbHJlYWR5IGJlZW4gcHJlbXVsdGlwbGllZC4gVG9nZ2xlIHRoaXMgaWYgeW91IGFyZSBzZWVpbmcgYmxhY2sgaGFsb3MgYXJvdW5kIHlvdXJcblx0ICogYmxlbmRlZCBhbHBoYSBlZGdlcy5cblx0ICovXG5cdHB1YmxpYyBnZXQgYWxwaGFQcmVtdWx0aXBsaWVkKCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2FscGhhUHJlbXVsdGlwbGllZDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgYWxwaGFQcmVtdWx0aXBsaWVkKHZhbHVlOmJvb2xlYW4pXG5cdHtcblx0XHRpZiAodGhpcy5fYWxwaGFQcmVtdWx0aXBsaWVkID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fYWxwaGFQcmVtdWx0aXBsaWVkID0gdmFsdWU7XG5cblx0XHR0aGlzLl9wSW52YWxpZGF0ZVBhc3NlcygpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBtaW5pbXVtIGFscGhhIHZhbHVlIGZvciB3aGljaCBwaXhlbHMgc2hvdWxkIGJlIGRyYXduLiBUaGlzIGlzIHVzZWQgZm9yIHRyYW5zcGFyZW5jeSB0aGF0IGlzIGVpdGhlclxuXHQgKiBpbnZpc2libGUgb3IgZW50aXJlbHkgb3BhcXVlLCBvZnRlbiB1c2VkIHdpdGggdGV4dHVyZXMgZm9yIGZvbGlhZ2UsIGV0Yy5cblx0ICogUmVjb21tZW5kZWQgdmFsdWVzIGFyZSAwIHRvIGRpc2FibGUgYWxwaGEsIG9yIDAuNSB0byBjcmVhdGUgc21vb3RoIGVkZ2VzLiBEZWZhdWx0IHZhbHVlIGlzIDAgKGRpc2FibGVkKS5cblx0ICovXG5cdHB1YmxpYyBnZXQgYWxwaGFUaHJlc2hvbGQoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wQWxwaGFUaHJlc2hvbGQ7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGFscGhhVGhyZXNob2xkKHZhbHVlOm51bWJlcilcblx0e1xuXHRcdGlmICh2YWx1ZSA8IDApXG5cdFx0XHR2YWx1ZSA9IDA7XG5cdFx0ZWxzZSBpZiAodmFsdWUgPiAxKVxuXHRcdFx0dmFsdWUgPSAxO1xuXG5cdFx0aWYgKHRoaXMuX3BBbHBoYVRocmVzaG9sZCA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3BBbHBoYVRocmVzaG9sZCA9IHZhbHVlO1xuXG5cdFx0dGhpcy5fcEludmFsaWRhdGVQYXNzZXMoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgd2hldGhlciBvciBub3QgdGhlIG1hdGVyaWFsIHJlcXVpcmVzIGFscGhhIGJsZW5kaW5nIGR1cmluZyByZW5kZXJpbmcuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHJlcXVpcmVzQmxlbmRpbmcoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcFJlcXVpcmVzQmxlbmRpbmc7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgd2lkdGgoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wV2lkdGg7XG5cdH1cblxuXHQvKipcblx0ICogU2V0cyB0aGUgcmVuZGVyIHN0YXRlIGZvciBhIHBhc3MgdGhhdCBpcyBpbmRlcGVuZGVudCBvZiB0aGUgcmVuZGVyZWQgb2JqZWN0LiBUaGlzIG5lZWRzIHRvIGJlIGNhbGxlZCBiZWZvcmVcblx0ICogY2FsbGluZyByZW5kZXJQYXNzLiBCZWZvcmUgYWN0aXZhdGluZyBhIHBhc3MsIHRoZSBwcmV2aW91c2x5IHVzZWQgcGFzcyBuZWVkcyB0byBiZSBkZWFjdGl2YXRlZC5cblx0ICogQHBhcmFtIHBhc3MgVGhlIHBhc3MgZGF0YSB0byBhY3RpdmF0ZS5cblx0ICogQHBhcmFtIHN0YWdlIFRoZSBTdGFnZSBvYmplY3Qgd2hpY2ggaXMgY3VycmVudGx5IHVzZWQgZm9yIHJlbmRlcmluZy5cblx0ICogQHBhcmFtIGNhbWVyYSBUaGUgY2FtZXJhIGZyb20gd2hpY2ggdGhlIHNjZW5lIGlzIHZpZXdlZC5cblx0ICogQHByaXZhdGVcblx0ICovXG5cdHB1YmxpYyBfaUFjdGl2YXRlUGFzcyhwYXNzOklNYXRlcmlhbFBhc3NEYXRhLCByZW5kZXJlcjpJUmVuZGVyZXIsIGNhbWVyYTpDYW1lcmEpIC8vIEFSQ0FORVxuXHR7XG5cdFx0cGFzcy5tYXRlcmlhbFBhc3MuX2lBY3RpdmF0ZShwYXNzLCByZW5kZXJlciwgY2FtZXJhKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDbGVhcnMgdGhlIHJlbmRlciBzdGF0ZSBmb3IgYSBwYXNzLiBUaGlzIG5lZWRzIHRvIGJlIGNhbGxlZCBiZWZvcmUgYWN0aXZhdGluZyBhbm90aGVyIHBhc3MuXG5cdCAqIEBwYXJhbSBwYXNzIFRoZSBwYXNzIHRvIGRlYWN0aXZhdGUuXG5cdCAqIEBwYXJhbSBzdGFnZSBUaGUgU3RhZ2UgdXNlZCBmb3IgcmVuZGVyaW5nXG5cdCAqXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHVibGljIF9pRGVhY3RpdmF0ZVBhc3MocGFzczpJTWF0ZXJpYWxQYXNzRGF0YSwgcmVuZGVyZXI6SVJlbmRlcmVyKSAvLyBBUkNBTkVcblx0e1xuXHRcdHBhc3MubWF0ZXJpYWxQYXNzLl9pRGVhY3RpdmF0ZShwYXNzLCByZW5kZXJlcik7XG5cdH1cblxuXHQvKipcblx0ICogUmVuZGVycyB0aGUgY3VycmVudCBwYXNzLiBCZWZvcmUgY2FsbGluZyByZW5kZXJQYXNzLCBhY3RpdmF0ZVBhc3MgbmVlZHMgdG8gYmUgY2FsbGVkIHdpdGggdGhlIHNhbWUgaW5kZXguXG5cdCAqIEBwYXJhbSBwYXNzIFRoZSBwYXNzIHVzZWQgdG8gcmVuZGVyIHRoZSByZW5kZXJhYmxlLlxuXHQgKiBAcGFyYW0gcmVuZGVyYWJsZSBUaGUgSVJlbmRlcmFibGUgb2JqZWN0IHRvIGRyYXcuXG5cdCAqIEBwYXJhbSBzdGFnZSBUaGUgU3RhZ2Ugb2JqZWN0IHVzZWQgZm9yIHJlbmRlcmluZy5cblx0ICogQHBhcmFtIGVudGl0eUNvbGxlY3RvciBUaGUgRW50aXR5Q29sbGVjdG9yIG9iamVjdCB0aGF0IGNvbnRhaW5zIHRoZSB2aXNpYmxlIHNjZW5lIGRhdGEuXG5cdCAqIEBwYXJhbSB2aWV3UHJvamVjdGlvbiBUaGUgdmlldy1wcm9qZWN0aW9uIG1hdHJpeCB1c2VkIHRvIHByb2plY3QgdG8gdGhlIHNjcmVlbi4gVGhpcyBpcyBub3QgdGhlIHNhbWUgYXNcblx0ICogY2FtZXJhLnZpZXdQcm9qZWN0aW9uIGFzIGl0IGluY2x1ZGVzIHRoZSBzY2FsaW5nIGZhY3RvcnMgd2hlbiByZW5kZXJpbmcgdG8gdGV4dHVyZXMuXG5cdCAqXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHVibGljIF9pUmVuZGVyUGFzcyhwYXNzOklNYXRlcmlhbFBhc3NEYXRhLCByZW5kZXJhYmxlOklSZW5kZXJhYmxlLCBzdGFnZTpJU3RhZ2UsIGNhbWVyYTpDYW1lcmEsIHZpZXdQcm9qZWN0aW9uOk1hdHJpeDNEKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3BMaWdodFBpY2tlcilcblx0XHRcdHRoaXMuX3BMaWdodFBpY2tlci5jb2xsZWN0TGlnaHRzKHJlbmRlcmFibGUpO1xuXG5cdFx0cGFzcy5tYXRlcmlhbFBhc3MuX2lSZW5kZXIocGFzcywgcmVuZGVyYWJsZSwgc3RhZ2UsIGNhbWVyYSwgdmlld1Byb2plY3Rpb24pO1xuXHR9XG5cblx0Ly9cblx0Ly8gTUFURVJJQUwgTUFOQUdFTUVOVFxuXHQvL1xuXHQvKipcblx0ICogTWFyayBhbiBJTWF0ZXJpYWxPd25lciBhcyBvd25lciBvZiB0aGlzIG1hdGVyaWFsLlxuXHQgKiBBc3N1cmVzIHdlJ3JlIG5vdCB1c2luZyB0aGUgc2FtZSBtYXRlcmlhbCBhY3Jvc3MgcmVuZGVyYWJsZXMgd2l0aCBkaWZmZXJlbnQgYW5pbWF0aW9ucywgc2luY2UgdGhlXG5cdCAqIFByb2dyYW1zIGRlcGVuZCBvbiBhbmltYXRpb24uIFRoaXMgbWV0aG9kIG5lZWRzIHRvIGJlIGNhbGxlZCB3aGVuIGEgbWF0ZXJpYWwgaXMgYXNzaWduZWQuXG5cdCAqXG5cdCAqIEBwYXJhbSBvd25lciBUaGUgSU1hdGVyaWFsT3duZXIgdGhhdCBoYWQgdGhpcyBtYXRlcmlhbCBhc3NpZ25lZFxuXHQgKlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHB1YmxpYyBpQWRkT3duZXIob3duZXI6SU1hdGVyaWFsT3duZXIpXG5cdHtcblx0XHR0aGlzLl9vd25lcnMucHVzaChvd25lcik7XG5cblx0XHR2YXIgYW5pbWF0aW9uU2V0OklBbmltYXRpb25TZXQ7XG5cdFx0dmFyIGFuaW1hdG9yOklBbmltYXRvciA9IDxJQW5pbWF0b3I+IG93bmVyLmFuaW1hdG9yO1xuXG5cdFx0aWYgKGFuaW1hdG9yKVxuXHRcdFx0YW5pbWF0aW9uU2V0ID0gPElBbmltYXRpb25TZXQ+IGFuaW1hdG9yLmFuaW1hdGlvblNldDtcblxuXHRcdGlmIChvd25lci5hbmltYXRvcikge1xuXHRcdFx0aWYgKHRoaXMuX2FuaW1hdGlvblNldCAmJiBhbmltYXRpb25TZXQgIT0gdGhpcy5fYW5pbWF0aW9uU2V0KSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIkEgTWF0ZXJpYWwgaW5zdGFuY2UgY2Fubm90IGJlIHNoYXJlZCBhY3Jvc3MgbWF0ZXJpYWwgb3duZXJzIHdpdGggZGlmZmVyZW50IGFuaW1hdGlvbiBzZXRzXCIpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKHRoaXMuX2FuaW1hdGlvblNldCAhPSBhbmltYXRpb25TZXQpIHtcblxuXHRcdFx0XHRcdHRoaXMuX2FuaW1hdGlvblNldCA9IGFuaW1hdGlvblNldDtcblxuXHRcdFx0XHRcdHRoaXMuaW52YWxpZGF0ZUFuaW1hdGlvbigpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFJlbW92ZXMgYW4gSU1hdGVyaWFsT3duZXIgYXMgb3duZXIuXG5cdCAqIEBwYXJhbSBvd25lclxuXHQgKlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHB1YmxpYyBpUmVtb3ZlT3duZXIob3duZXI6SU1hdGVyaWFsT3duZXIpXG5cdHtcblx0XHR0aGlzLl9vd25lcnMuc3BsaWNlKHRoaXMuX293bmVycy5pbmRleE9mKG93bmVyKSwgMSk7XG5cblx0XHRpZiAodGhpcy5fb3duZXJzLmxlbmd0aCA9PSAwKSB7XG5cdFx0XHR0aGlzLl9hbmltYXRpb25TZXQgPSBudWxsO1xuXG5cdFx0XHR0aGlzLmludmFsaWRhdGVBbmltYXRpb24oKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQSBsaXN0IG9mIHRoZSBJTWF0ZXJpYWxPd25lcnMgdGhhdCB1c2UgdGhpcyBtYXRlcmlhbFxuXHQgKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0cHVibGljIGdldCBpT3duZXJzKCk6QXJyYXk8SU1hdGVyaWFsT3duZXI+XG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fb3duZXJzO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBhbW91bnQgb2YgcGFzc2VzIHVzZWQgYnkgdGhlIG1hdGVyaWFsLlxuXHQgKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0cHVibGljIF9pTnVtU2NyZWVuUGFzc2VzKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fbnVtUGFzc2VzO1xuXHR9XG5cblx0LyoqXG5cdCAqIEEgbGlzdCBvZiB0aGUgc2NyZWVuIHBhc3NlcyB1c2VkIGluIHRoaXMgbWF0ZXJpYWxcblx0ICpcblx0ICogQHByaXZhdGVcblx0ICovXG5cdHB1YmxpYyBnZXQgX2lTY3JlZW5QYXNzZXMoKTpBcnJheTxJTWF0ZXJpYWxQYXNzPlxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3Bhc3Nlcztcblx0fVxuXG5cdC8qKlxuXHQgKiBNYXJrcyB0aGUgc2hhZGVyIHByb2dyYW1zIGZvciBhbGwgcGFzc2VzIGFzIGludmFsaWQsIHNvIHRoZXkgd2lsbCBiZSByZWNvbXBpbGVkIGJlZm9yZSB0aGUgbmV4dCB1c2UuXG5cdCAqXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRwdWJsaWMgX3BJbnZhbGlkYXRlUGFzc2VzKClcblx0e1xuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fbWF0ZXJpYWxQYXNzRGF0YS5sZW5ndGg7XG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgbGVuOyBpKyspXG5cdFx0XHR0aGlzLl9tYXRlcmlhbFBhc3NEYXRhW2ldLmludmFsaWRhdGUoKTtcblxuXHRcdHRoaXMuaW52YWxpZGF0ZU1hdGVyaWFsKCk7XG5cdH1cblxuXHQvKipcblx0ICogRmxhZ3MgdGhhdCB0aGUgc2NyZWVuIHBhc3NlcyBoYXZlIGJlY29tZSBpbnZhbGlkIGFuZCBuZWVkIHBvc3NpYmxlIHJlLW9yZGVyaW5nIC8gYWRkaW5nIC8gZGVsZXRpbmdcblx0ICovXG5cdHB1YmxpYyBfcEludmFsaWRhdGVTY3JlZW5QYXNzZXMoKVxuXHR7XG5cdFx0dGhpcy5fcFNjcmVlblBhc3Nlc0ludmFsaWQgPSB0cnVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlbW92ZXMgYSBwYXNzIGZyb20gdGhlIG1hdGVyaWFsLlxuXHQgKiBAcGFyYW0gcGFzcyBUaGUgcGFzcyB0byBiZSByZW1vdmVkLlxuXHQgKi9cblx0cHVibGljIF9wUmVtb3ZlU2NyZWVuUGFzcyhwYXNzOklNYXRlcmlhbFBhc3MpXG5cdHtcblx0XHRwYXNzLnJlbW92ZUV2ZW50TGlzdGVuZXIoRXZlbnQuQ0hBTkdFLCB0aGlzLl9vblBhc3NDaGFuZ2VEZWxlZ2F0ZSk7XG5cdFx0dGhpcy5fcGFzc2VzLnNwbGljZSh0aGlzLl9wYXNzZXMuaW5kZXhPZihwYXNzKSwgMSk7XG5cblx0XHR0aGlzLl9udW1QYXNzZXMtLTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZW1vdmVzIGFsbCBwYXNzZXMgZnJvbSB0aGUgbWF0ZXJpYWxcblx0ICovXG5cdHB1YmxpYyBfcENsZWFyU2NyZWVuUGFzc2VzKClcblx0e1xuXHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IHRoaXMuX251bVBhc3NlczsgKytpKVxuXHRcdFx0dGhpcy5fcGFzc2VzW2ldLnJlbW92ZUV2ZW50TGlzdGVuZXIoRXZlbnQuQ0hBTkdFLCB0aGlzLl9vblBhc3NDaGFuZ2VEZWxlZ2F0ZSk7XG5cblx0XHR0aGlzLl9wYXNzZXMubGVuZ3RoID0gdGhpcy5fbnVtUGFzc2VzID0gMDtcblx0fVxuXG5cdC8qKlxuXHQgKiBBZGRzIGEgcGFzcyB0byB0aGUgbWF0ZXJpYWxcblx0ICogQHBhcmFtIHBhc3Ncblx0ICovXG5cdHB1YmxpYyBfcEFkZFNjcmVlblBhc3MocGFzczpJTWF0ZXJpYWxQYXNzKVxuXHR7XG5cdFx0dGhpcy5fcGFzc2VzW3RoaXMuX251bVBhc3NlcysrXSA9IHBhc3M7XG5cblx0XHRwYXNzLmxpZ2h0UGlja2VyID0gdGhpcy5fcExpZ2h0UGlja2VyO1xuXHRcdHBhc3MuYWRkRXZlbnRMaXN0ZW5lcihFdmVudC5DSEFOR0UsIHRoaXMuX29uUGFzc0NoYW5nZURlbGVnYXRlKTtcblxuXHRcdHRoaXMuaW52YWxpZGF0ZU1hdGVyaWFsKCk7XG5cdH1cblxuXHRwdWJsaWMgX2lBZGRNYXRlcmlhbERhdGEobWF0ZXJpYWxEYXRhOklNYXRlcmlhbERhdGEpOklNYXRlcmlhbERhdGFcblx0e1xuXHRcdHRoaXMuX21hdGVyaWFsRGF0YS5wdXNoKG1hdGVyaWFsRGF0YSk7XG5cblx0XHRyZXR1cm4gbWF0ZXJpYWxEYXRhO1xuXHR9XG5cblx0cHVibGljIF9pUmVtb3ZlTWF0ZXJpYWxEYXRhKG1hdGVyaWFsRGF0YTpJTWF0ZXJpYWxEYXRhKTpJTWF0ZXJpYWxEYXRhXG5cdHtcblx0XHR0aGlzLl9tYXRlcmlhbERhdGEuc3BsaWNlKHRoaXMuX21hdGVyaWFsRGF0YS5pbmRleE9mKG1hdGVyaWFsRGF0YSksIDEpO1xuXG5cdFx0cmV0dXJuIG1hdGVyaWFsRGF0YTtcblx0fVxuXG5cdC8qKlxuXHQgKiBQZXJmb3JtcyBhbnkgcHJvY2Vzc2luZyB0aGF0IG5lZWRzIHRvIG9jY3VyIGJlZm9yZSBhbnkgb2YgaXRzIHBhc3NlcyBhcmUgdXNlZC5cblx0ICpcblx0ICogQHByaXZhdGVcblx0ICovXG5cdHB1YmxpYyBfaVVwZGF0ZU1hdGVyaWFsKClcblx0e1xuXHR9XG5cdFxuXHQvKipcblx0ICogTGlzdGVuZXIgZm9yIHdoZW4gYSBwYXNzJ3Mgc2hhZGVyIGNvZGUgY2hhbmdlcy4gSXQgcmVjYWxjdWxhdGVzIHRoZSByZW5kZXIgb3JkZXIgaWQuXG5cdCAqL1xuXHRwcml2YXRlIG9uUGFzc0NoYW5nZShldmVudDpFdmVudClcblx0e1xuXHRcdHRoaXMuaW52YWxpZGF0ZU1hdGVyaWFsKCk7XG5cdH1cblxuXHRwcml2YXRlIGludmFsaWRhdGVBbmltYXRpb24oKVxuXHR7XG5cdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9tYXRlcmlhbERhdGEubGVuZ3RoO1xuXHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IGxlbjsgaSsrKVxuXHRcdFx0dGhpcy5fbWF0ZXJpYWxEYXRhW2ldLmludmFsaWRhdGVBbmltYXRpb24oKTtcblx0fVxuXHRcblx0cHJpdmF0ZSBpbnZhbGlkYXRlTWF0ZXJpYWwoKVxuXHR7XG5cdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9tYXRlcmlhbERhdGEubGVuZ3RoO1xuXHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IGxlbjsgaSsrKVxuXHRcdFx0dGhpcy5fbWF0ZXJpYWxEYXRhW2ldLmludmFsaWRhdGVNYXRlcmlhbCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENhbGxlZCB3aGVuIHRoZSBsaWdodCBwaWNrZXIncyBjb25maWd1cmF0aW9uIGNoYW5nZWQuXG5cdCAqL1xuXHRwcml2YXRlIG9uTGlnaHRzQ2hhbmdlKGV2ZW50OkV2ZW50KVxuXHR7XG5cdFx0dGhpcy5fcEludmFsaWRhdGVTY3JlZW5QYXNzZXMoKTtcblx0fVxuXG5cdHB1YmxpYyBfcE5vdGlmeVNpemVDaGFuZ2VkKClcblx0e1xuXHRcdGlmICghdGhpcy5fc2l6ZUNoYW5nZWQpXG5cdFx0XHR0aGlzLl9zaXplQ2hhbmdlZCA9IG5ldyBNYXRlcmlhbEV2ZW50KE1hdGVyaWFsRXZlbnQuU0laRV9DSEFOR0VEKTtcblxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCh0aGlzLl9zaXplQ2hhbmdlZCk7XG5cdH1cblxuXHRwdWJsaWMgX2lBZGRNYXRlcmlhbFBhc3NEYXRhKG1hdGVyaWFsUGFzc0RhdGE6SU1hdGVyaWFsUGFzc0RhdGEpOklNYXRlcmlhbFBhc3NEYXRhXG5cdHtcblx0XHR0aGlzLl9tYXRlcmlhbFBhc3NEYXRhLnB1c2gobWF0ZXJpYWxQYXNzRGF0YSk7XG5cblx0XHRyZXR1cm4gbWF0ZXJpYWxQYXNzRGF0YTtcblx0fVxuXG5cdHB1YmxpYyBfaVJlbW92ZU1hdGVyaWFsUGFzc0RhdGEobWF0ZXJpYWxQYXNzRGF0YTpJTWF0ZXJpYWxQYXNzRGF0YSk6SU1hdGVyaWFsUGFzc0RhdGFcblx0e1xuXHRcdHRoaXMuX21hdGVyaWFsUGFzc0RhdGEuc3BsaWNlKHRoaXMuX21hdGVyaWFsUGFzc0RhdGEuaW5kZXhPZihtYXRlcmlhbFBhc3NEYXRhKSwgMSk7XG5cblx0XHRyZXR1cm4gbWF0ZXJpYWxQYXNzRGF0YTtcblx0fVxufVxuXG5leHBvcnQgPSBNYXRlcmlhbEJhc2U7Il19