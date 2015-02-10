var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BlendMode = require("awayjs-core/lib/base/BlendMode");
var AssetType = require("awayjs-core/lib/library/AssetType");
var DisplayObject = require("awayjs-display/lib/base/DisplayObject");
var BoundsType = require("awayjs-display/lib/bounds/BoundsType");
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
    function Skybox(cubeMap) {
        if (cubeMap === void 0) { cubeMap = null; }
        _super.call(this);
        this._pAlphaThreshold = 0;
        this._pBlendMode = BlendMode.NORMAL;
        this._renderObjects = new Array();
        this._renderables = new Array();
        this._mipmap = false;
        this._smooth = true;
        this._pIsEntity = true;
        this._owners = new Array(this);
        this.cubeMap = cubeMap;
        //default bounds type
        this._boundsType = BoundsType.NULL;
    }
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
            this._pIinvalidatePasses();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Skybox.prototype, "mipmap", {
        /**
         * Indicates whether or not the Skybox texture should use mipmapping. Defaults to false.
         */
        get: function () {
            return this._mipmap;
        },
        set: function (value) {
            if (this._mipmap == value)
                return;
            this._mipmap = value;
            this._pIinvalidatePasses();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Skybox.prototype, "smooth", {
        /**
         * Indicates whether or not the Skybox texture should use smoothing. Defaults to true.
         */
        get: function () {
            return this._smooth;
        },
        set: function (value) {
            if (this._smooth == value)
                return;
            this._smooth = value;
            this._pIinvalidatePasses();
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
            this._pInvalidateRenderObject();
        },
        enumerable: true,
        configurable: true
    });
    Skybox.prototype._pInvalidateRenderObject = function () {
        var len = this._renderObjects.length;
        for (var i = 0; i < len; i++)
            this._renderObjects[i].invalidateRenderObject();
    };
    /**
     * Marks the shader programs for all passes as invalid, so they will be recompiled before the next use.
     *
     * @private
     */
    Skybox.prototype._pIinvalidatePasses = function () {
        var len = this._renderObjects.length;
        for (var i = 0; i < len; i++)
            this._renderObjects[i].invalidatePasses();
    };
    Object.defineProperty(Skybox.prototype, "iOwners", {
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
    Object.defineProperty(Skybox.prototype, "animator", {
        get: function () {
            return this._animator;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Skybox.prototype, "uvTransform", {
        /**
         *
         */
        get: function () {
            return this._uvTransform;
        },
        set: function (value) {
            this._uvTransform = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Skybox.prototype, "cubeMap", {
        /**
        * The cube texture to use as the skybox.
        */
        get: function () {
            return this._cubeMap;
        },
        set: function (value) {
            if (value && this._cubeMap && (value.format != this._cubeMap.format))
                this._pInvalidateRenderObject();
            this._cubeMap = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Skybox.prototype, "assetType", {
        get: function () {
            return AssetType.SKYBOX;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Skybox.prototype, "castsShadows", {
        get: function () {
            return false; //TODO
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Cleans up resources owned by the material, including passes. Textures are not owned by the material since they
     * could be used by other materials and will not be disposed.
     */
    Skybox.prototype.dispose = function () {
        var i;
        var len;
        len = this._renderObjects.length;
        for (i = 0; i < len; i++)
            this._renderObjects[i].dispose();
        this._renderObjects = new Array();
        var len = this._renderables.length;
        for (var i = 0; i < len; i++)
            this._renderables[i].dispose();
        this._renderables = new Array();
    };
    Skybox.prototype._iCollectRenderables = function (rendererPool) {
        //skybox do not get collected in the standard entity list
    };
    Skybox.prototype._iCollectRenderable = function (rendererPool) {
    };
    Skybox.prototype._iAddRenderObject = function (renderObject) {
        this._renderObjects.push(renderObject);
        return renderObject;
    };
    Skybox.prototype._iRemoveRenderObject = function (renderObject) {
        this._renderObjects.splice(this._renderObjects.indexOf(renderObject), 1);
        return renderObject;
    };
    Skybox.prototype._iAddRenderable = function (renderable) {
        this._renderables.push(renderable);
        return renderable;
    };
    Skybox.prototype._iRemoveRenderable = function (renderable) {
        var index = this._renderables.indexOf(renderable);
        this._renderables.splice(index, 1);
        return renderable;
    };
    /**
     *
     * @param renderer
     *
     * @internal
     */
    Skybox.prototype.getRenderObject = function (renderablePool) {
        return renderablePool.getSkyboxRenderObject(this);
    };
    Skybox.prototype._pRegisterEntity = function (partition) {
        partition._iRegisterSkybox(this);
    };
    Skybox.prototype._pUnregisterEntity = function (partition) {
        partition._iUnregisterSkybox(this);
    };
    return Skybox;
})(DisplayObject);
module.exports = Skybox;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9za3lib3gudHMiXSwibmFtZXMiOlsiU2t5Ym94IiwiU2t5Ym94LmNvbnN0cnVjdG9yIiwiU2t5Ym94LmFscGhhVGhyZXNob2xkIiwiU2t5Ym94Lm1pcG1hcCIsIlNreWJveC5zbW9vdGgiLCJTa3lib3gubGlnaHRQaWNrZXIiLCJTa3lib3guYW5pbWF0aW9uU2V0IiwiU2t5Ym94LmJsZW5kTW9kZSIsIlNreWJveC5fcEludmFsaWRhdGVSZW5kZXJPYmplY3QiLCJTa3lib3guX3BJaW52YWxpZGF0ZVBhc3NlcyIsIlNreWJveC5pT3duZXJzIiwiU2t5Ym94LmFuaW1hdG9yIiwiU2t5Ym94LnV2VHJhbnNmb3JtIiwiU2t5Ym94LmN1YmVNYXAiLCJTa3lib3guYXNzZXRUeXBlIiwiU2t5Ym94LmNhc3RzU2hhZG93cyIsIlNreWJveC5kaXNwb3NlIiwiU2t5Ym94Ll9pQ29sbGVjdFJlbmRlcmFibGVzIiwiU2t5Ym94Ll9pQ29sbGVjdFJlbmRlcmFibGUiLCJTa3lib3guX2lBZGRSZW5kZXJPYmplY3QiLCJTa3lib3guX2lSZW1vdmVSZW5kZXJPYmplY3QiLCJTa3lib3guX2lBZGRSZW5kZXJhYmxlIiwiU2t5Ym94Ll9pUmVtb3ZlUmVuZGVyYWJsZSIsIlNreWJveC5nZXRSZW5kZXJPYmplY3QiLCJTa3lib3guX3BSZWdpc3RlckVudGl0eSIsIlNreWJveC5fcFVucmVnaXN0ZXJFbnRpdHkiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQU8sU0FBUyxXQUFlLGdDQUFnQyxDQUFDLENBQUM7QUFFakUsSUFBTyxTQUFTLFdBQWUsbUNBQW1DLENBQUMsQ0FBQztBQUtwRSxJQUFPLGFBQWEsV0FBYyx1Q0FBdUMsQ0FBQyxDQUFDO0FBRzNFLElBQU8sVUFBVSxXQUFlLHNDQUFzQyxDQUFDLENBQUM7QUFXeEUsQUFLQTs7OztHQURHO0lBQ0csTUFBTTtJQUFTQSxVQUFmQSxNQUFNQSxVQUFzQkE7SUF5TGpDQTs7OztP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QSxDQXhTQSxBQXdTQ0EsRUF4U29CLGFBQWEsRUF3U2pDO0FBRUQsQUFBZ0IsaUJBQVAsTUFBTSxDQUFDIiwiZmlsZSI6ImVudGl0aWVzL1NreWJveC5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmxlbmRNb2RlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9iYXNlL0JsZW5kTW9kZVwiKTtcbmltcG9ydCBVVlRyYW5zZm9ybVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9VVlRyYW5zZm9ybVwiKTtcbmltcG9ydCBBc3NldFR5cGVcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvQXNzZXRUeXBlXCIpO1xuaW1wb3J0IEN1YmVUZXh0dXJlQmFzZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL3RleHR1cmVzL0N1YmVUZXh0dXJlQmFzZVwiKTtcblxuaW1wb3J0IElBbmltYXRpb25TZXRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9hbmltYXRvcnMvSUFuaW1hdGlvblNldFwiKTtcbmltcG9ydCBJQW5pbWF0b3JcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2FuaW1hdG9ycy9JQW5pbWF0b3JcIik7XG5pbXBvcnQgRGlzcGxheU9iamVjdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvRGlzcGxheU9iamVjdFwiKTtcbmltcG9ydCBJUmVuZGVyYWJsZU93bmVyXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9JUmVuZGVyYWJsZU93bmVyXCIpO1xuaW1wb3J0IElSZW5kZXJPYmplY3RPd25lclx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0lSZW5kZXJPYmplY3RPd25lclwiKTtcbmltcG9ydCBCb3VuZHNUeXBlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9ib3VuZHMvQm91bmRzVHlwZVwiKTtcbmltcG9ydCBQYXJ0aXRpb25cdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3BhcnRpdGlvbi9QYXJ0aXRpb25cIik7XG5pbXBvcnQgSVJlbmRlcmFibGVcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3Bvb2wvSVJlbmRlcmFibGVcIik7XG5pbXBvcnQgSVJlbmRlcmFibGVQb29sXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcG9vbC9JUmVuZGVyYWJsZVBvb2xcIik7XG5pbXBvcnQgSVJlbmRlck9iamVjdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3Bvb2wvSVJlbmRlck9iamVjdFwiKTtcbmltcG9ydCBTa3lib3hOb2RlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vU2t5Ym94Tm9kZVwiKTtcbmltcG9ydCBJUmVuZGVyZXJQb29sXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcG9vbC9JUmVuZGVyZXJQb29sXCIpO1xuaW1wb3J0IElFbnRpdHlcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZW50aXRpZXMvSUVudGl0eVwiKTtcbmltcG9ydCBMaWdodFBpY2tlckJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9tYXRlcmlhbHMvbGlnaHRwaWNrZXJzL0xpZ2h0UGlja2VyQmFzZVwiKTtcbmltcG9ydCBNYXRlcmlhbEJhc2VcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL21hdGVyaWFscy9NYXRlcmlhbEJhc2VcIik7XG5cbi8qKlxuICogQSBTa3lib3ggY2xhc3MgaXMgdXNlZCB0byByZW5kZXIgYSBza3kgaW4gdGhlIHNjZW5lLiBJdCdzIGFsd2F5cyBjb25zaWRlcmVkIHN0YXRpYyBhbmQgJ2F0IGluZmluaXR5JywgYW5kIGFzXG4gKiBzdWNoIGl0J3MgYWx3YXlzIGNlbnRlcmVkIGF0IHRoZSBjYW1lcmEncyBwb3NpdGlvbiBhbmQgc2l6ZWQgdG8gZXhhY3RseSBmaXQgd2l0aGluIHRoZSBjYW1lcmEncyBmcnVzdHVtLCBlbnN1cmluZ1xuICogdGhlIHNreSBib3ggaXMgYWx3YXlzIGFzIGxhcmdlIGFzIHBvc3NpYmxlIHdpdGhvdXQgYmVpbmcgY2xpcHBlZC5cbiAqL1xuY2xhc3MgU2t5Ym94IGV4dGVuZHMgRGlzcGxheU9iamVjdCBpbXBsZW1lbnRzIElFbnRpdHksIElSZW5kZXJhYmxlT3duZXIsIElSZW5kZXJPYmplY3RPd25lclxue1xuXHRwcml2YXRlIF9jdWJlTWFwOkN1YmVUZXh0dXJlQmFzZTtcblx0cHVibGljIF9wQWxwaGFUaHJlc2hvbGQ6bnVtYmVyID0gMDtcblx0cHJpdmF0ZSBfYW5pbWF0aW9uU2V0OklBbmltYXRpb25TZXQ7XG5cdHB1YmxpYyBfcExpZ2h0UGlja2VyOkxpZ2h0UGlja2VyQmFzZTtcblx0cHVibGljIF9wQmxlbmRNb2RlOnN0cmluZyA9IEJsZW5kTW9kZS5OT1JNQUw7XG5cdHByaXZhdGUgX3JlbmRlck9iamVjdHM6QXJyYXk8SVJlbmRlck9iamVjdD4gPSBuZXcgQXJyYXk8SVJlbmRlck9iamVjdD4oKTtcblx0cHJpdmF0ZSBfcmVuZGVyYWJsZXM6QXJyYXk8SVJlbmRlcmFibGU+ID0gbmV3IEFycmF5PElSZW5kZXJhYmxlPigpO1xuXHRwcml2YXRlIF91dlRyYW5zZm9ybTpVVlRyYW5zZm9ybTtcblx0cHJpdmF0ZSBfb3duZXJzOkFycmF5PElSZW5kZXJhYmxlT3duZXI+O1xuXHRwcml2YXRlIF9taXBtYXA6Ym9vbGVhbiA9IGZhbHNlO1xuXHRwcml2YXRlIF9zbW9vdGg6Ym9vbGVhbiA9IHRydWU7XG5cdFxuXHRwcml2YXRlIF9tYXRlcmlhbDpNYXRlcmlhbEJhc2U7XG5cdHByaXZhdGUgX2FuaW1hdG9yOklBbmltYXRvcjtcblxuXHQvKipcblx0ICogVGhlIG1pbmltdW0gYWxwaGEgdmFsdWUgZm9yIHdoaWNoIHBpeGVscyBzaG91bGQgYmUgZHJhd24uIFRoaXMgaXMgdXNlZCBmb3IgdHJhbnNwYXJlbmN5IHRoYXQgaXMgZWl0aGVyXG5cdCAqIGludmlzaWJsZSBvciBlbnRpcmVseSBvcGFxdWUsIG9mdGVuIHVzZWQgd2l0aCB0ZXh0dXJlcyBmb3IgZm9saWFnZSwgZXRjLlxuXHQgKiBSZWNvbW1lbmRlZCB2YWx1ZXMgYXJlIDAgdG8gZGlzYWJsZSBhbHBoYSwgb3IgMC41IHRvIGNyZWF0ZSBzbW9vdGggZWRnZXMuIERlZmF1bHQgdmFsdWUgaXMgMCAoZGlzYWJsZWQpLlxuXHQgKi9cblx0cHVibGljIGdldCBhbHBoYVRocmVzaG9sZCgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BBbHBoYVRocmVzaG9sZDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgYWxwaGFUaHJlc2hvbGQodmFsdWU6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHZhbHVlIDwgMClcblx0XHRcdHZhbHVlID0gMDtcblx0XHRlbHNlIGlmICh2YWx1ZSA+IDEpXG5cdFx0XHR2YWx1ZSA9IDE7XG5cblx0XHRpZiAodGhpcy5fcEFscGhhVGhyZXNob2xkID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fcEFscGhhVGhyZXNob2xkID0gdmFsdWU7XG5cblx0XHR0aGlzLl9wSWludmFsaWRhdGVQYXNzZXMoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgd2hldGhlciBvciBub3QgdGhlIFNreWJveCB0ZXh0dXJlIHNob3VsZCB1c2UgbWlwbWFwcGluZy4gRGVmYXVsdHMgdG8gZmFsc2UuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IG1pcG1hcCgpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9taXBtYXA7XG5cdH1cblxuXHRwdWJsaWMgc2V0IG1pcG1hcCh2YWx1ZTpib29sZWFuKVxuXHR7XG5cdFx0aWYgKHRoaXMuX21pcG1hcCA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX21pcG1hcCA9IHZhbHVlO1xuXG5cdFx0dGhpcy5fcElpbnZhbGlkYXRlUGFzc2VzKCk7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHdoZXRoZXIgb3Igbm90IHRoZSBTa3lib3ggdGV4dHVyZSBzaG91bGQgdXNlIHNtb290aGluZy4gRGVmYXVsdHMgdG8gdHJ1ZS5cblx0ICovXG5cdHB1YmxpYyBnZXQgc21vb3RoKCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3Ntb290aDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgc21vb3RoKHZhbHVlOmJvb2xlYW4pXG5cdHtcblx0XHRpZiAodGhpcy5fc21vb3RoID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fc21vb3RoID0gdmFsdWU7XG5cblx0XHR0aGlzLl9wSWludmFsaWRhdGVQYXNzZXMoKTtcblx0fVxuXHRcblx0LyoqXG5cdCAqIFRoZSBsaWdodCBwaWNrZXIgdXNlZCBieSB0aGUgbWF0ZXJpYWwgdG8gcHJvdmlkZSBsaWdodHMgdG8gdGhlIG1hdGVyaWFsIGlmIGl0IHN1cHBvcnRzIGxpZ2h0aW5nLlxuXHQgKlxuXHQgKiBAc2VlIExpZ2h0UGlja2VyQmFzZVxuXHQgKiBAc2VlIFN0YXRpY0xpZ2h0UGlja2VyXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGxpZ2h0UGlja2VyKCk6TGlnaHRQaWNrZXJCYXNlXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcExpZ2h0UGlja2VyO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGFuaW1hdGlvblNldCgpOklBbmltYXRpb25TZXRcblx0e1xuXHRcdHJldHVybiB0aGlzLl9hbmltYXRpb25TZXQ7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIGJsZW5kIG1vZGUgdG8gdXNlIHdoZW4gZHJhd2luZyB0aGlzIHJlbmRlcmFibGUuIFRoZSBmb2xsb3dpbmcgYmxlbmQgbW9kZXMgYXJlIHN1cHBvcnRlZDpcblx0ICogPHVsPlxuXHQgKiA8bGk+QmxlbmRNb2RlLk5PUk1BTDogTm8gYmxlbmRpbmcsIHVubGVzcyB0aGUgbWF0ZXJpYWwgaW5oZXJlbnRseSBuZWVkcyBpdDwvbGk+XG5cdCAqIDxsaT5CbGVuZE1vZGUuTEFZRVI6IEZvcmNlIGJsZW5kaW5nLiBUaGlzIHdpbGwgZHJhdyB0aGUgb2JqZWN0IHRoZSBzYW1lIGFzIE5PUk1BTCwgYnV0IHdpdGhvdXQgd3JpdGluZyBkZXB0aCB3cml0ZXMuPC9saT5cblx0ICogPGxpPkJsZW5kTW9kZS5NVUxUSVBMWTwvbGk+XG5cdCAqIDxsaT5CbGVuZE1vZGUuQUREPC9saT5cblx0ICogPGxpPkJsZW5kTW9kZS5BTFBIQTwvbGk+XG5cdCAqIDwvdWw+XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGJsZW5kTW9kZSgpOnN0cmluZ1xuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BCbGVuZE1vZGU7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGJsZW5kTW9kZSh2YWx1ZTpzdHJpbmcpXG5cdHtcblx0XHRpZiAodGhpcy5fcEJsZW5kTW9kZSA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3BCbGVuZE1vZGUgPSB2YWx1ZTtcblxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlUmVuZGVyT2JqZWN0KCk7XG5cdH1cblxuXHRwdWJsaWMgX3BJbnZhbGlkYXRlUmVuZGVyT2JqZWN0KClcblx0e1xuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fcmVuZGVyT2JqZWN0cy5sZW5ndGg7XG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgbGVuOyBpKyspXG5cdFx0XHR0aGlzLl9yZW5kZXJPYmplY3RzW2ldLmludmFsaWRhdGVSZW5kZXJPYmplY3QoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBNYXJrcyB0aGUgc2hhZGVyIHByb2dyYW1zIGZvciBhbGwgcGFzc2VzIGFzIGludmFsaWQsIHNvIHRoZXkgd2lsbCBiZSByZWNvbXBpbGVkIGJlZm9yZSB0aGUgbmV4dCB1c2UuXG5cdCAqXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRwdWJsaWMgX3BJaW52YWxpZGF0ZVBhc3NlcygpXG5cdHtcblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX3JlbmRlck9iamVjdHMubGVuZ3RoO1xuXHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IGxlbjsgaSsrKVxuXHRcdFx0dGhpcy5fcmVuZGVyT2JqZWN0c1tpXS5pbnZhbGlkYXRlUGFzc2VzKCk7XG5cdH1cblxuXHQvKipcblx0ICogQSBsaXN0IG9mIHRoZSBJUmVuZGVyYWJsZU93bmVycyB0aGF0IHVzZSB0aGlzIG1hdGVyaWFsXG5cdCAqXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGlPd25lcnMoKTpBcnJheTxJUmVuZGVyYWJsZU93bmVyPlxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX293bmVycztcblx0fVxuXG5cdHB1YmxpYyBnZXQgYW5pbWF0b3IoKTpJQW5pbWF0b3Jcblx0e1xuXHRcdHJldHVybiB0aGlzLl9hbmltYXRvcjtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCB1dlRyYW5zZm9ybSgpOlVWVHJhbnNmb3JtXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fdXZUcmFuc2Zvcm07XG5cdH1cblxuXHRwdWJsaWMgc2V0IHV2VHJhbnNmb3JtKHZhbHVlOlVWVHJhbnNmb3JtKVxuXHR7XG5cdFx0dGhpcy5fdXZUcmFuc2Zvcm0gPSB2YWx1ZTtcblx0fVxuXG5cdC8qKlxuXHQqIFRoZSBjdWJlIHRleHR1cmUgdG8gdXNlIGFzIHRoZSBza3lib3guXG5cdCovXG5cdHB1YmxpYyBnZXQgY3ViZU1hcCgpOkN1YmVUZXh0dXJlQmFzZVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2N1YmVNYXA7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGN1YmVNYXAodmFsdWU6Q3ViZVRleHR1cmVCYXNlKVxuXHR7XG5cdFx0aWYgKHZhbHVlICYmIHRoaXMuX2N1YmVNYXAgJiYgKHZhbHVlLmZvcm1hdCAhPSB0aGlzLl9jdWJlTWFwLmZvcm1hdCkpXG5cdFx0XHR0aGlzLl9wSW52YWxpZGF0ZVJlbmRlck9iamVjdCgpO1xuXG5cdFx0dGhpcy5fY3ViZU1hcCA9IHZhbHVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZSBhIG5ldyBTa3lib3ggb2JqZWN0LlxuXHQgKlxuXHQgKiBAcGFyYW0gbWF0ZXJpYWxcdFRoZSBtYXRlcmlhbCB3aXRoIHdoaWNoIHRvIHJlbmRlciB0aGUgU2t5Ym94LlxuXHQgKi9cblx0Y29uc3RydWN0b3IoY3ViZU1hcDpDdWJlVGV4dHVyZUJhc2UgPSBudWxsKVxuXHR7XG5cdFx0c3VwZXIoKTtcblxuXHRcdHRoaXMuX3BJc0VudGl0eSA9IHRydWU7XG5cdFx0dGhpcy5fb3duZXJzID0gbmV3IEFycmF5PElSZW5kZXJhYmxlT3duZXI+KHRoaXMpO1xuXG5cdFx0dGhpcy5jdWJlTWFwID0gY3ViZU1hcDtcblxuXHRcdC8vZGVmYXVsdCBib3VuZHMgdHlwZVxuXHRcdHRoaXMuX2JvdW5kc1R5cGUgPSBCb3VuZHNUeXBlLk5VTEw7XG5cdH1cblxuXHRwdWJsaWMgZ2V0IGFzc2V0VHlwZSgpOnN0cmluZ1xuXHR7XG5cdFx0cmV0dXJuIEFzc2V0VHlwZS5TS1lCT1g7XG5cdH1cblxuXHRwdWJsaWMgZ2V0IGNhc3RzU2hhZG93cygpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiBmYWxzZTsgLy9UT0RPXG5cdH1cblxuXHQvKipcblx0ICogQ2xlYW5zIHVwIHJlc291cmNlcyBvd25lZCBieSB0aGUgbWF0ZXJpYWwsIGluY2x1ZGluZyBwYXNzZXMuIFRleHR1cmVzIGFyZSBub3Qgb3duZWQgYnkgdGhlIG1hdGVyaWFsIHNpbmNlIHRoZXlcblx0ICogY291bGQgYmUgdXNlZCBieSBvdGhlciBtYXRlcmlhbHMgYW5kIHdpbGwgbm90IGJlIGRpc3Bvc2VkLlxuXHQgKi9cblx0cHVibGljIGRpc3Bvc2UoKVxuXHR7XG5cdFx0dmFyIGk6bnVtYmVyO1xuXHRcdHZhciBsZW46bnVtYmVyO1xuXG5cdFx0bGVuID0gdGhpcy5fcmVuZGVyT2JqZWN0cy5sZW5ndGg7XG5cdFx0Zm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKVxuXHRcdFx0dGhpcy5fcmVuZGVyT2JqZWN0c1tpXS5kaXNwb3NlKCk7XG5cblx0XHR0aGlzLl9yZW5kZXJPYmplY3RzID0gbmV3IEFycmF5PElSZW5kZXJPYmplY3Q+KCk7XG5cblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX3JlbmRlcmFibGVzLmxlbmd0aDtcblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBsZW47IGkrKylcblx0XHRcdHRoaXMuX3JlbmRlcmFibGVzW2ldLmRpc3Bvc2UoKTtcblxuXHRcdHRoaXMuX3JlbmRlcmFibGVzID0gbmV3IEFycmF5PElSZW5kZXJhYmxlPigpO1xuXHR9XG5cblx0cHVibGljIF9pQ29sbGVjdFJlbmRlcmFibGVzKHJlbmRlcmVyUG9vbDpJUmVuZGVyZXJQb29sKVxuXHR7XG5cdFx0Ly9za3lib3ggZG8gbm90IGdldCBjb2xsZWN0ZWQgaW4gdGhlIHN0YW5kYXJkIGVudGl0eSBsaXN0XG5cdH1cblxuXHRwdWJsaWMgX2lDb2xsZWN0UmVuZGVyYWJsZShyZW5kZXJlclBvb2w6SVJlbmRlcmVyUG9vbClcblx0e1xuXG5cdH1cblxuXHRwdWJsaWMgX2lBZGRSZW5kZXJPYmplY3QocmVuZGVyT2JqZWN0OklSZW5kZXJPYmplY3QpOklSZW5kZXJPYmplY3Rcblx0e1xuXHRcdHRoaXMuX3JlbmRlck9iamVjdHMucHVzaChyZW5kZXJPYmplY3QpO1xuXG5cdFx0cmV0dXJuIHJlbmRlck9iamVjdDtcblx0fVxuXG5cdHB1YmxpYyBfaVJlbW92ZVJlbmRlck9iamVjdChyZW5kZXJPYmplY3Q6SVJlbmRlck9iamVjdCk6SVJlbmRlck9iamVjdFxuXHR7XG5cdFx0dGhpcy5fcmVuZGVyT2JqZWN0cy5zcGxpY2UodGhpcy5fcmVuZGVyT2JqZWN0cy5pbmRleE9mKHJlbmRlck9iamVjdCksIDEpO1xuXG5cdFx0cmV0dXJuIHJlbmRlck9iamVjdDtcblx0fVxuXG5cdHB1YmxpYyBfaUFkZFJlbmRlcmFibGUocmVuZGVyYWJsZTpJUmVuZGVyYWJsZSk6SVJlbmRlcmFibGVcblx0e1xuXHRcdHRoaXMuX3JlbmRlcmFibGVzLnB1c2gocmVuZGVyYWJsZSk7XG5cblx0XHRyZXR1cm4gcmVuZGVyYWJsZTtcblx0fVxuXG5cblx0cHVibGljIF9pUmVtb3ZlUmVuZGVyYWJsZShyZW5kZXJhYmxlOklSZW5kZXJhYmxlKTpJUmVuZGVyYWJsZVxuXHR7XG5cdFx0dmFyIGluZGV4Om51bWJlciA9IHRoaXMuX3JlbmRlcmFibGVzLmluZGV4T2YocmVuZGVyYWJsZSk7XG5cblx0XHR0aGlzLl9yZW5kZXJhYmxlcy5zcGxpY2UoaW5kZXgsIDEpO1xuXG5cdFx0cmV0dXJuIHJlbmRlcmFibGU7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHBhcmFtIHJlbmRlcmVyXG5cdCAqXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHVibGljIGdldFJlbmRlck9iamVjdChyZW5kZXJhYmxlUG9vbDpJUmVuZGVyYWJsZVBvb2wpXG5cdHtcblx0XHRyZXR1cm4gcmVuZGVyYWJsZVBvb2wuZ2V0U2t5Ym94UmVuZGVyT2JqZWN0KHRoaXMpO1xuXHR9XG5cblx0cHVibGljIF9wUmVnaXN0ZXJFbnRpdHkocGFydGl0aW9uOlBhcnRpdGlvbilcblx0e1xuXHRcdHBhcnRpdGlvbi5faVJlZ2lzdGVyU2t5Ym94KHRoaXMpO1xuXHR9XG5cblx0cHVibGljIF9wVW5yZWdpc3RlckVudGl0eShwYXJ0aXRpb246UGFydGl0aW9uKVxuXHR7XG5cdFx0cGFydGl0aW9uLl9pVW5yZWdpc3RlclNreWJveCh0aGlzKTtcblx0fVxufVxuXG5leHBvcnQgPSBTa3lib3g7Il19