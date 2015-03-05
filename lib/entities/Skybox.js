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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9Ta3lib3gudHMiXSwibmFtZXMiOlsiU2t5Ym94IiwiU2t5Ym94LmNvbnN0cnVjdG9yIiwiU2t5Ym94LmFscGhhVGhyZXNob2xkIiwiU2t5Ym94Lm1pcG1hcCIsIlNreWJveC5zbW9vdGgiLCJTa3lib3gubGlnaHRQaWNrZXIiLCJTa3lib3guYW5pbWF0aW9uU2V0IiwiU2t5Ym94LmJsZW5kTW9kZSIsIlNreWJveC5fcEludmFsaWRhdGVSZW5kZXJPYmplY3QiLCJTa3lib3guX3BJaW52YWxpZGF0ZVBhc3NlcyIsIlNreWJveC5pT3duZXJzIiwiU2t5Ym94LmFuaW1hdG9yIiwiU2t5Ym94LnV2VHJhbnNmb3JtIiwiU2t5Ym94LmN1YmVNYXAiLCJTa3lib3guYXNzZXRUeXBlIiwiU2t5Ym94LmNhc3RzU2hhZG93cyIsIlNreWJveC5kaXNwb3NlIiwiU2t5Ym94Ll9pQ29sbGVjdFJlbmRlcmFibGVzIiwiU2t5Ym94Ll9pQ29sbGVjdFJlbmRlcmFibGUiLCJTa3lib3guX2lBZGRSZW5kZXJPYmplY3QiLCJTa3lib3guX2lSZW1vdmVSZW5kZXJPYmplY3QiLCJTa3lib3guX2lBZGRSZW5kZXJhYmxlIiwiU2t5Ym94Ll9pUmVtb3ZlUmVuZGVyYWJsZSIsIlNreWJveC5nZXRSZW5kZXJPYmplY3QiLCJTa3lib3guX3BSZWdpc3RlckVudGl0eSIsIlNreWJveC5fcFVucmVnaXN0ZXJFbnRpdHkiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQU8sU0FBUyxXQUFlLGdDQUFnQyxDQUFDLENBQUM7QUFFakUsSUFBTyxTQUFTLFdBQWUsbUNBQW1DLENBQUMsQ0FBQztBQUtwRSxJQUFPLGFBQWEsV0FBYyx1Q0FBdUMsQ0FBQyxDQUFDO0FBRzNFLElBQU8sVUFBVSxXQUFlLHNDQUFzQyxDQUFDLENBQUM7QUFXeEUsQUFLQTs7OztHQURHO0lBQ0csTUFBTTtJQUFTQSxVQUFmQSxNQUFNQSxVQUFzQkE7SUF5TGpDQTs7OztP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QSxDQXhTQSxBQXdTQ0EsRUF4U29CLGFBQWEsRUF3U2pDO0FBRUQsQUFBZ0IsaUJBQVAsTUFBTSxDQUFDIiwiZmlsZSI6ImVudGl0aWVzL1NreWJveC5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmxlbmRNb2RlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9iYXNlL0JsZW5kTW9kZVwiKTtcclxuaW1wb3J0IFVWVHJhbnNmb3JtXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1VWVHJhbnNmb3JtXCIpO1xyXG5pbXBvcnQgQXNzZXRUeXBlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0Fzc2V0VHlwZVwiKTtcclxuaW1wb3J0IEN1YmVUZXh0dXJlQmFzZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL3RleHR1cmVzL0N1YmVUZXh0dXJlQmFzZVwiKTtcclxuXHJcbmltcG9ydCBJQW5pbWF0aW9uU2V0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYW5pbWF0b3JzL0lBbmltYXRpb25TZXRcIik7XHJcbmltcG9ydCBJQW5pbWF0b3JcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2FuaW1hdG9ycy9JQW5pbWF0b3JcIik7XHJcbmltcG9ydCBEaXNwbGF5T2JqZWN0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9EaXNwbGF5T2JqZWN0XCIpO1xyXG5pbXBvcnQgSVJlbmRlcmFibGVPd25lclx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvSVJlbmRlcmFibGVPd25lclwiKTtcclxuaW1wb3J0IElSZW5kZXJPYmplY3RPd25lclx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0lSZW5kZXJPYmplY3RPd25lclwiKTtcclxuaW1wb3J0IEJvdW5kc1R5cGVcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2JvdW5kcy9Cb3VuZHNUeXBlXCIpO1xyXG5pbXBvcnQgUGFydGl0aW9uXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vUGFydGl0aW9uXCIpO1xyXG5pbXBvcnQgSVJlbmRlcmFibGVcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3Bvb2wvSVJlbmRlcmFibGVcIik7XHJcbmltcG9ydCBJUmVuZGVyYWJsZVBvb2xcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wb29sL0lSZW5kZXJhYmxlUG9vbFwiKTtcclxuaW1wb3J0IElSZW5kZXJPYmplY3RcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wb29sL0lSZW5kZXJPYmplY3RcIik7XHJcbmltcG9ydCBTa3lib3hOb2RlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vU2t5Ym94Tm9kZVwiKTtcclxuaW1wb3J0IElSZW5kZXJlclBvb2xcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wb29sL0lSZW5kZXJlclBvb2xcIik7XHJcbmltcG9ydCBJRW50aXR5XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2VudGl0aWVzL0lFbnRpdHlcIik7XHJcbmltcG9ydCBMaWdodFBpY2tlckJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9tYXRlcmlhbHMvbGlnaHRwaWNrZXJzL0xpZ2h0UGlja2VyQmFzZVwiKTtcclxuaW1wb3J0IE1hdGVyaWFsQmFzZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvbWF0ZXJpYWxzL01hdGVyaWFsQmFzZVwiKTtcclxuXHJcbi8qKlxyXG4gKiBBIFNreWJveCBjbGFzcyBpcyB1c2VkIHRvIHJlbmRlciBhIHNreSBpbiB0aGUgc2NlbmUuIEl0J3MgYWx3YXlzIGNvbnNpZGVyZWQgc3RhdGljIGFuZCAnYXQgaW5maW5pdHknLCBhbmQgYXNcclxuICogc3VjaCBpdCdzIGFsd2F5cyBjZW50ZXJlZCBhdCB0aGUgY2FtZXJhJ3MgcG9zaXRpb24gYW5kIHNpemVkIHRvIGV4YWN0bHkgZml0IHdpdGhpbiB0aGUgY2FtZXJhJ3MgZnJ1c3R1bSwgZW5zdXJpbmdcclxuICogdGhlIHNreSBib3ggaXMgYWx3YXlzIGFzIGxhcmdlIGFzIHBvc3NpYmxlIHdpdGhvdXQgYmVpbmcgY2xpcHBlZC5cclxuICovXHJcbmNsYXNzIFNreWJveCBleHRlbmRzIERpc3BsYXlPYmplY3QgaW1wbGVtZW50cyBJRW50aXR5LCBJUmVuZGVyYWJsZU93bmVyLCBJUmVuZGVyT2JqZWN0T3duZXJcclxue1xyXG5cdHByaXZhdGUgX2N1YmVNYXA6Q3ViZVRleHR1cmVCYXNlO1xyXG5cdHB1YmxpYyBfcEFscGhhVGhyZXNob2xkOm51bWJlciA9IDA7XHJcblx0cHJpdmF0ZSBfYW5pbWF0aW9uU2V0OklBbmltYXRpb25TZXQ7XHJcblx0cHVibGljIF9wTGlnaHRQaWNrZXI6TGlnaHRQaWNrZXJCYXNlO1xyXG5cdHB1YmxpYyBfcEJsZW5kTW9kZTpzdHJpbmcgPSBCbGVuZE1vZGUuTk9STUFMO1xyXG5cdHByaXZhdGUgX3JlbmRlck9iamVjdHM6QXJyYXk8SVJlbmRlck9iamVjdD4gPSBuZXcgQXJyYXk8SVJlbmRlck9iamVjdD4oKTtcclxuXHRwcml2YXRlIF9yZW5kZXJhYmxlczpBcnJheTxJUmVuZGVyYWJsZT4gPSBuZXcgQXJyYXk8SVJlbmRlcmFibGU+KCk7XHJcblx0cHJpdmF0ZSBfdXZUcmFuc2Zvcm06VVZUcmFuc2Zvcm07XHJcblx0cHJpdmF0ZSBfb3duZXJzOkFycmF5PElSZW5kZXJhYmxlT3duZXI+O1xyXG5cdHByaXZhdGUgX21pcG1hcDpib29sZWFuID0gZmFsc2U7XHJcblx0cHJpdmF0ZSBfc21vb3RoOmJvb2xlYW4gPSB0cnVlO1xyXG5cdFxyXG5cdHByaXZhdGUgX21hdGVyaWFsOk1hdGVyaWFsQmFzZTtcclxuXHRwcml2YXRlIF9hbmltYXRvcjpJQW5pbWF0b3I7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBtaW5pbXVtIGFscGhhIHZhbHVlIGZvciB3aGljaCBwaXhlbHMgc2hvdWxkIGJlIGRyYXduLiBUaGlzIGlzIHVzZWQgZm9yIHRyYW5zcGFyZW5jeSB0aGF0IGlzIGVpdGhlclxyXG5cdCAqIGludmlzaWJsZSBvciBlbnRpcmVseSBvcGFxdWUsIG9mdGVuIHVzZWQgd2l0aCB0ZXh0dXJlcyBmb3IgZm9saWFnZSwgZXRjLlxyXG5cdCAqIFJlY29tbWVuZGVkIHZhbHVlcyBhcmUgMCB0byBkaXNhYmxlIGFscGhhLCBvciAwLjUgdG8gY3JlYXRlIHNtb290aCBlZGdlcy4gRGVmYXVsdCB2YWx1ZSBpcyAwIChkaXNhYmxlZCkuXHJcblx0ICovXHJcblx0cHVibGljIGdldCBhbHBoYVRocmVzaG9sZCgpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9wQWxwaGFUaHJlc2hvbGQ7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IGFscGhhVGhyZXNob2xkKHZhbHVlOm51bWJlcilcclxuXHR7XHJcblx0XHRpZiAodmFsdWUgPCAwKVxyXG5cdFx0XHR2YWx1ZSA9IDA7XHJcblx0XHRlbHNlIGlmICh2YWx1ZSA+IDEpXHJcblx0XHRcdHZhbHVlID0gMTtcclxuXHJcblx0XHRpZiAodGhpcy5fcEFscGhhVGhyZXNob2xkID09IHZhbHVlKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fcEFscGhhVGhyZXNob2xkID0gdmFsdWU7XHJcblxyXG5cdFx0dGhpcy5fcElpbnZhbGlkYXRlUGFzc2VzKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJbmRpY2F0ZXMgd2hldGhlciBvciBub3QgdGhlIFNreWJveCB0ZXh0dXJlIHNob3VsZCB1c2UgbWlwbWFwcGluZy4gRGVmYXVsdHMgdG8gZmFsc2UuXHJcblx0ICovXHJcblx0cHVibGljIGdldCBtaXBtYXAoKTpib29sZWFuXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX21pcG1hcDtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgbWlwbWFwKHZhbHVlOmJvb2xlYW4pXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX21pcG1hcCA9PSB2YWx1ZSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX21pcG1hcCA9IHZhbHVlO1xyXG5cclxuXHRcdHRoaXMuX3BJaW52YWxpZGF0ZVBhc3NlcygpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSW5kaWNhdGVzIHdoZXRoZXIgb3Igbm90IHRoZSBTa3lib3ggdGV4dHVyZSBzaG91bGQgdXNlIHNtb290aGluZy4gRGVmYXVsdHMgdG8gdHJ1ZS5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHNtb290aCgpOmJvb2xlYW5cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fc21vb3RoO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBzbW9vdGgodmFsdWU6Ym9vbGVhbilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fc21vb3RoID09IHZhbHVlKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fc21vb3RoID0gdmFsdWU7XHJcblxyXG5cdFx0dGhpcy5fcElpbnZhbGlkYXRlUGFzc2VzKCk7XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIFRoZSBsaWdodCBwaWNrZXIgdXNlZCBieSB0aGUgbWF0ZXJpYWwgdG8gcHJvdmlkZSBsaWdodHMgdG8gdGhlIG1hdGVyaWFsIGlmIGl0IHN1cHBvcnRzIGxpZ2h0aW5nLlxyXG5cdCAqXHJcblx0ICogQHNlZSBMaWdodFBpY2tlckJhc2VcclxuXHQgKiBAc2VlIFN0YXRpY0xpZ2h0UGlja2VyXHJcblx0ICovXHJcblx0cHVibGljIGdldCBsaWdodFBpY2tlcigpOkxpZ2h0UGlja2VyQmFzZVxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9wTGlnaHRQaWNrZXI7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgYW5pbWF0aW9uU2V0KCk6SUFuaW1hdGlvblNldFxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9hbmltYXRpb25TZXQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgYmxlbmQgbW9kZSB0byB1c2Ugd2hlbiBkcmF3aW5nIHRoaXMgcmVuZGVyYWJsZS4gVGhlIGZvbGxvd2luZyBibGVuZCBtb2RlcyBhcmUgc3VwcG9ydGVkOlxyXG5cdCAqIDx1bD5cclxuXHQgKiA8bGk+QmxlbmRNb2RlLk5PUk1BTDogTm8gYmxlbmRpbmcsIHVubGVzcyB0aGUgbWF0ZXJpYWwgaW5oZXJlbnRseSBuZWVkcyBpdDwvbGk+XHJcblx0ICogPGxpPkJsZW5kTW9kZS5MQVlFUjogRm9yY2UgYmxlbmRpbmcuIFRoaXMgd2lsbCBkcmF3IHRoZSBvYmplY3QgdGhlIHNhbWUgYXMgTk9STUFMLCBidXQgd2l0aG91dCB3cml0aW5nIGRlcHRoIHdyaXRlcy48L2xpPlxyXG5cdCAqIDxsaT5CbGVuZE1vZGUuTVVMVElQTFk8L2xpPlxyXG5cdCAqIDxsaT5CbGVuZE1vZGUuQUREPC9saT5cclxuXHQgKiA8bGk+QmxlbmRNb2RlLkFMUEhBPC9saT5cclxuXHQgKiA8L3VsPlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgYmxlbmRNb2RlKCk6c3RyaW5nXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BCbGVuZE1vZGU7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IGJsZW5kTW9kZSh2YWx1ZTpzdHJpbmcpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX3BCbGVuZE1vZGUgPT0gdmFsdWUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9wQmxlbmRNb2RlID0gdmFsdWU7XHJcblxyXG5cdFx0dGhpcy5fcEludmFsaWRhdGVSZW5kZXJPYmplY3QoKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBfcEludmFsaWRhdGVSZW5kZXJPYmplY3QoKVxyXG5cdHtcclxuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fcmVuZGVyT2JqZWN0cy5sZW5ndGg7XHJcblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBsZW47IGkrKylcclxuXHRcdFx0dGhpcy5fcmVuZGVyT2JqZWN0c1tpXS5pbnZhbGlkYXRlUmVuZGVyT2JqZWN0KCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYXJrcyB0aGUgc2hhZGVyIHByb2dyYW1zIGZvciBhbGwgcGFzc2VzIGFzIGludmFsaWQsIHNvIHRoZXkgd2lsbCBiZSByZWNvbXBpbGVkIGJlZm9yZSB0aGUgbmV4dCB1c2UuXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBfcElpbnZhbGlkYXRlUGFzc2VzKClcclxuXHR7XHJcblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX3JlbmRlck9iamVjdHMubGVuZ3RoO1xyXG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgbGVuOyBpKyspXHJcblx0XHRcdHRoaXMuX3JlbmRlck9iamVjdHNbaV0uaW52YWxpZGF0ZVBhc3NlcygpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQSBsaXN0IG9mIHRoZSBJUmVuZGVyYWJsZU93bmVycyB0aGF0IHVzZSB0aGlzIG1hdGVyaWFsXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgaU93bmVycygpOkFycmF5PElSZW5kZXJhYmxlT3duZXI+XHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX293bmVycztcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXQgYW5pbWF0b3IoKTpJQW5pbWF0b3JcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fYW5pbWF0b3I7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgdXZUcmFuc2Zvcm0oKTpVVlRyYW5zZm9ybVxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl91dlRyYW5zZm9ybTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgdXZUcmFuc2Zvcm0odmFsdWU6VVZUcmFuc2Zvcm0pXHJcblx0e1xyXG5cdFx0dGhpcy5fdXZUcmFuc2Zvcm0gPSB2YWx1ZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCogVGhlIGN1YmUgdGV4dHVyZSB0byB1c2UgYXMgdGhlIHNreWJveC5cclxuXHQqL1xyXG5cdHB1YmxpYyBnZXQgY3ViZU1hcCgpOkN1YmVUZXh0dXJlQmFzZVxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9jdWJlTWFwO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBjdWJlTWFwKHZhbHVlOkN1YmVUZXh0dXJlQmFzZSlcclxuXHR7XHJcblx0XHRpZiAodmFsdWUgJiYgdGhpcy5fY3ViZU1hcCAmJiAodmFsdWUuZm9ybWF0ICE9IHRoaXMuX2N1YmVNYXAuZm9ybWF0KSlcclxuXHRcdFx0dGhpcy5fcEludmFsaWRhdGVSZW5kZXJPYmplY3QoKTtcclxuXHJcblx0XHR0aGlzLl9jdWJlTWFwID0gdmFsdWU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGUgYSBuZXcgU2t5Ym94IG9iamVjdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBtYXRlcmlhbFx0VGhlIG1hdGVyaWFsIHdpdGggd2hpY2ggdG8gcmVuZGVyIHRoZSBTa3lib3guXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoY3ViZU1hcDpDdWJlVGV4dHVyZUJhc2UgPSBudWxsKVxyXG5cdHtcclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0dGhpcy5fcElzRW50aXR5ID0gdHJ1ZTtcclxuXHRcdHRoaXMuX293bmVycyA9IG5ldyBBcnJheTxJUmVuZGVyYWJsZU93bmVyPih0aGlzKTtcclxuXHJcblx0XHR0aGlzLmN1YmVNYXAgPSBjdWJlTWFwO1xyXG5cclxuXHRcdC8vZGVmYXVsdCBib3VuZHMgdHlwZVxyXG5cdFx0dGhpcy5fYm91bmRzVHlwZSA9IEJvdW5kc1R5cGUuTlVMTDtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXQgYXNzZXRUeXBlKCk6c3RyaW5nXHJcblx0e1xyXG5cdFx0cmV0dXJuIEFzc2V0VHlwZS5TS1lCT1g7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0IGNhc3RzU2hhZG93cygpOmJvb2xlYW5cclxuXHR7XHJcblx0XHRyZXR1cm4gZmFsc2U7IC8vVE9ET1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2xlYW5zIHVwIHJlc291cmNlcyBvd25lZCBieSB0aGUgbWF0ZXJpYWwsIGluY2x1ZGluZyBwYXNzZXMuIFRleHR1cmVzIGFyZSBub3Qgb3duZWQgYnkgdGhlIG1hdGVyaWFsIHNpbmNlIHRoZXlcclxuXHQgKiBjb3VsZCBiZSB1c2VkIGJ5IG90aGVyIG1hdGVyaWFscyBhbmQgd2lsbCBub3QgYmUgZGlzcG9zZWQuXHJcblx0ICovXHJcblx0cHVibGljIGRpc3Bvc2UoKVxyXG5cdHtcclxuXHRcdHZhciBpOm51bWJlcjtcclxuXHRcdHZhciBsZW46bnVtYmVyO1xyXG5cclxuXHRcdGxlbiA9IHRoaXMuX3JlbmRlck9iamVjdHMubGVuZ3RoO1xyXG5cdFx0Zm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKVxyXG5cdFx0XHR0aGlzLl9yZW5kZXJPYmplY3RzW2ldLmRpc3Bvc2UoKTtcclxuXHJcblx0XHR0aGlzLl9yZW5kZXJPYmplY3RzID0gbmV3IEFycmF5PElSZW5kZXJPYmplY3Q+KCk7XHJcblxyXG5cdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9yZW5kZXJhYmxlcy5sZW5ndGg7XHJcblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBsZW47IGkrKylcclxuXHRcdFx0dGhpcy5fcmVuZGVyYWJsZXNbaV0uZGlzcG9zZSgpO1xyXG5cclxuXHRcdHRoaXMuX3JlbmRlcmFibGVzID0gbmV3IEFycmF5PElSZW5kZXJhYmxlPigpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIF9pQ29sbGVjdFJlbmRlcmFibGVzKHJlbmRlcmVyUG9vbDpJUmVuZGVyZXJQb29sKVxyXG5cdHtcclxuXHRcdC8vc2t5Ym94IGRvIG5vdCBnZXQgY29sbGVjdGVkIGluIHRoZSBzdGFuZGFyZCBlbnRpdHkgbGlzdFxyXG5cdH1cclxuXHJcblx0cHVibGljIF9pQ29sbGVjdFJlbmRlcmFibGUocmVuZGVyZXJQb29sOklSZW5kZXJlclBvb2wpXHJcblx0e1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBfaUFkZFJlbmRlck9iamVjdChyZW5kZXJPYmplY3Q6SVJlbmRlck9iamVjdCk6SVJlbmRlck9iamVjdFxyXG5cdHtcclxuXHRcdHRoaXMuX3JlbmRlck9iamVjdHMucHVzaChyZW5kZXJPYmplY3QpO1xyXG5cclxuXHRcdHJldHVybiByZW5kZXJPYmplY3Q7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgX2lSZW1vdmVSZW5kZXJPYmplY3QocmVuZGVyT2JqZWN0OklSZW5kZXJPYmplY3QpOklSZW5kZXJPYmplY3RcclxuXHR7XHJcblx0XHR0aGlzLl9yZW5kZXJPYmplY3RzLnNwbGljZSh0aGlzLl9yZW5kZXJPYmplY3RzLmluZGV4T2YocmVuZGVyT2JqZWN0KSwgMSk7XHJcblxyXG5cdFx0cmV0dXJuIHJlbmRlck9iamVjdDtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBfaUFkZFJlbmRlcmFibGUocmVuZGVyYWJsZTpJUmVuZGVyYWJsZSk6SVJlbmRlcmFibGVcclxuXHR7XHJcblx0XHR0aGlzLl9yZW5kZXJhYmxlcy5wdXNoKHJlbmRlcmFibGUpO1xyXG5cclxuXHRcdHJldHVybiByZW5kZXJhYmxlO1xyXG5cdH1cclxuXHJcblxyXG5cdHB1YmxpYyBfaVJlbW92ZVJlbmRlcmFibGUocmVuZGVyYWJsZTpJUmVuZGVyYWJsZSk6SVJlbmRlcmFibGVcclxuXHR7XHJcblx0XHR2YXIgaW5kZXg6bnVtYmVyID0gdGhpcy5fcmVuZGVyYWJsZXMuaW5kZXhPZihyZW5kZXJhYmxlKTtcclxuXHJcblx0XHR0aGlzLl9yZW5kZXJhYmxlcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG5cclxuXHRcdHJldHVybiByZW5kZXJhYmxlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gcmVuZGVyZXJcclxuXHQgKlxyXG5cdCAqIEBpbnRlcm5hbFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXRSZW5kZXJPYmplY3QocmVuZGVyYWJsZVBvb2w6SVJlbmRlcmFibGVQb29sKVxyXG5cdHtcclxuXHRcdHJldHVybiByZW5kZXJhYmxlUG9vbC5nZXRTa3lib3hSZW5kZXJPYmplY3QodGhpcyk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgX3BSZWdpc3RlckVudGl0eShwYXJ0aXRpb246UGFydGl0aW9uKVxyXG5cdHtcclxuXHRcdHBhcnRpdGlvbi5faVJlZ2lzdGVyU2t5Ym94KHRoaXMpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIF9wVW5yZWdpc3RlckVudGl0eShwYXJ0aXRpb246UGFydGl0aW9uKVxyXG5cdHtcclxuXHRcdHBhcnRpdGlvbi5faVVucmVnaXN0ZXJTa3lib3godGhpcyk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgPSBTa3lib3g7Il19