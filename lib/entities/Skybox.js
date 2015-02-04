var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var NullBounds = require("awayjs-core/lib/bounds/NullBounds");
var AssetType = require("awayjs-core/lib/library/AssetType");
var DisplayObject = require("awayjs-display/lib/base/DisplayObject");
var BlendMode = require("awayjs-display/lib/base/BlendMode");
var SkyboxNode = require("awayjs-display/lib/partition/SkyboxNode");
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
         * Indicates whether or not any used textures should use mipmapping. Defaults to true.
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
         * Indicates whether or not any used textures should use smoothing.
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
            if (value && this._cubeMap && (value.hasMipmaps != this._cubeMap.hasMipmaps || value.format != this._cubeMap.format))
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
    /**
     * @protected
     */
    Skybox.prototype.pInvalidateBounds = function () {
        // dead end
    };
    /**
     * @protected
     */
    Skybox.prototype.pCreateEntityPartitionNode = function () {
        return new SkyboxNode(this);
    };
    /**
     * @protected
     */
    Skybox.prototype.pCreateDefaultBoundingVolume = function () {
        return new NullBounds();
    };
    /**
     * @protected
     */
    Skybox.prototype.pUpdateBounds = function () {
        this._pBoundsInvalid = false;
    };
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
    return Skybox;
})(DisplayObject);
module.exports = Skybox;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9Ta3lib3gudHMiXSwibmFtZXMiOlsiU2t5Ym94IiwiU2t5Ym94LmNvbnN0cnVjdG9yIiwiU2t5Ym94LmFscGhhVGhyZXNob2xkIiwiU2t5Ym94Lm1pcG1hcCIsIlNreWJveC5zbW9vdGgiLCJTa3lib3gubGlnaHRQaWNrZXIiLCJTa3lib3guYW5pbWF0aW9uU2V0IiwiU2t5Ym94LmJsZW5kTW9kZSIsIlNreWJveC5fcEludmFsaWRhdGVSZW5kZXJPYmplY3QiLCJTa3lib3guX3BJaW52YWxpZGF0ZVBhc3NlcyIsIlNreWJveC5pT3duZXJzIiwiU2t5Ym94LmFuaW1hdG9yIiwiU2t5Ym94LnV2VHJhbnNmb3JtIiwiU2t5Ym94LmN1YmVNYXAiLCJTa3lib3guYXNzZXRUeXBlIiwiU2t5Ym94LnBJbnZhbGlkYXRlQm91bmRzIiwiU2t5Ym94LnBDcmVhdGVFbnRpdHlQYXJ0aXRpb25Ob2RlIiwiU2t5Ym94LnBDcmVhdGVEZWZhdWx0Qm91bmRpbmdWb2x1bWUiLCJTa3lib3gucFVwZGF0ZUJvdW5kcyIsIlNreWJveC5jYXN0c1NoYWRvd3MiLCJTa3lib3guZGlzcG9zZSIsIlNreWJveC5faUNvbGxlY3RSZW5kZXJhYmxlcyIsIlNreWJveC5faUNvbGxlY3RSZW5kZXJhYmxlIiwiU2t5Ym94Ll9pQWRkUmVuZGVyT2JqZWN0IiwiU2t5Ym94Ll9pUmVtb3ZlUmVuZGVyT2JqZWN0IiwiU2t5Ym94Ll9pQWRkUmVuZGVyYWJsZSIsIlNreWJveC5faVJlbW92ZVJlbmRlcmFibGUiLCJTa3lib3guZ2V0UmVuZGVyT2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxJQUFPLFVBQVUsV0FBZSxtQ0FBbUMsQ0FBQyxDQUFDO0FBRXJFLElBQU8sU0FBUyxXQUFlLG1DQUFtQyxDQUFDLENBQUM7QUFLcEUsSUFBTyxhQUFhLFdBQWMsdUNBQXVDLENBQUMsQ0FBQztBQUMzRSxJQUFPLFNBQVMsV0FBZSxtQ0FBbUMsQ0FBQyxD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QUNBLE1BQU1BLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO1FBRW5DQSxNQUFNQSxDQUFDQSxVQUFVQSxDQUFDQTtJQUNuQkEsQ0FBQ0E7SUFFRDFCOzs7OztPQUtHQTtJQUNJQSxnQ0FBZUEsR0FBdEJBLFVBQXVCQSxjQUE4QkE7UUFFcEQyQixNQUFNQSxDQUFDQSxjQUFjQSxDQUFDQSxxQkFBcUJBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO0lBQ25EQSxDQUFDQTtJQUNGM0IsYUFBQ0E7QUFBREEsQ0EzVEEsQUEyVENBLEVBM1RvQixhQUFhLEVBMlRqQztBQUVELEFBQWdCLGlCQUFQLE1BQU0sQ0FBQyIsImZpbGUiOiJlbnRpdGllcy9Ta3lib3guanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJvdW5kaW5nVm9sdW1lQmFzZVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ib3VuZHMvQm91bmRpbmdWb2x1bWVCYXNlXCIpO1xyXG5pbXBvcnQgTnVsbEJvdW5kc1x0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvYm91bmRzL051bGxCb3VuZHNcIik7XHJcbmltcG9ydCBVVlRyYW5zZm9ybVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9VVlRyYW5zZm9ybVwiKTtcclxuaW1wb3J0IEFzc2V0VHlwZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9Bc3NldFR5cGVcIik7XHJcbmltcG9ydCBDdWJlVGV4dHVyZUJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi90ZXh0dXJlcy9DdWJlVGV4dHVyZUJhc2VcIik7XHJcblxyXG5pbXBvcnQgSUFuaW1hdGlvblNldFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2FuaW1hdG9ycy9JQW5pbWF0aW9uU2V0XCIpO1xyXG5pbXBvcnQgSUFuaW1hdG9yXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9hbmltYXRvcnMvSUFuaW1hdG9yXCIpO1xyXG5pbXBvcnQgRGlzcGxheU9iamVjdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvRGlzcGxheU9iamVjdFwiKTtcclxuaW1wb3J0IEJsZW5kTW9kZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9CbGVuZE1vZGVcIik7XHJcbmltcG9ydCBJUmVuZGVyYWJsZU93bmVyXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9JUmVuZGVyYWJsZU93bmVyXCIpO1xyXG5pbXBvcnQgSVJlbmRlck9iamVjdE93bmVyXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvSVJlbmRlck9iamVjdE93bmVyXCIpO1xyXG5pbXBvcnQgSVJlbmRlcmFibGVcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3Bvb2wvSVJlbmRlcmFibGVcIik7XHJcbmltcG9ydCBJUmVuZGVyYWJsZVBvb2xcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wb29sL0lSZW5kZXJhYmxlUG9vbFwiKTtcclxuaW1wb3J0IElSZW5kZXJPYmplY3RcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wb29sL0lSZW5kZXJPYmplY3RcIik7XHJcbmltcG9ydCBTa3lib3hOb2RlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vU2t5Ym94Tm9kZVwiKTtcclxuaW1wb3J0IElSZW5kZXJlclBvb2xcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wb29sL0lSZW5kZXJlclBvb2xcIik7XHJcbmltcG9ydCBJRW50aXR5XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2VudGl0aWVzL0lFbnRpdHlcIik7XHJcbmltcG9ydCBMaWdodFBpY2tlckJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9tYXRlcmlhbHMvbGlnaHRwaWNrZXJzL0xpZ2h0UGlja2VyQmFzZVwiKTtcclxuaW1wb3J0IE1hdGVyaWFsQmFzZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvbWF0ZXJpYWxzL01hdGVyaWFsQmFzZVwiKTtcclxuXHJcbi8qKlxyXG4gKiBBIFNreWJveCBjbGFzcyBpcyB1c2VkIHRvIHJlbmRlciBhIHNreSBpbiB0aGUgc2NlbmUuIEl0J3MgYWx3YXlzIGNvbnNpZGVyZWQgc3RhdGljIGFuZCAnYXQgaW5maW5pdHknLCBhbmQgYXNcclxuICogc3VjaCBpdCdzIGFsd2F5cyBjZW50ZXJlZCBhdCB0aGUgY2FtZXJhJ3MgcG9zaXRpb24gYW5kIHNpemVkIHRvIGV4YWN0bHkgZml0IHdpdGhpbiB0aGUgY2FtZXJhJ3MgZnJ1c3R1bSwgZW5zdXJpbmdcclxuICogdGhlIHNreSBib3ggaXMgYWx3YXlzIGFzIGxhcmdlIGFzIHBvc3NpYmxlIHdpdGhvdXQgYmVpbmcgY2xpcHBlZC5cclxuICovXHJcbmNsYXNzIFNreWJveCBleHRlbmRzIERpc3BsYXlPYmplY3QgaW1wbGVtZW50cyBJRW50aXR5LCBJUmVuZGVyYWJsZU93bmVyLCBJUmVuZGVyT2JqZWN0T3duZXJcclxue1xyXG5cdHByaXZhdGUgX2N1YmVNYXA6Q3ViZVRleHR1cmVCYXNlO1xyXG5cdHB1YmxpYyBfcEFscGhhVGhyZXNob2xkOm51bWJlciA9IDA7XHJcblx0cHJpdmF0ZSBfYW5pbWF0aW9uU2V0OklBbmltYXRpb25TZXQ7XHJcblx0cHVibGljIF9wTGlnaHRQaWNrZXI6TGlnaHRQaWNrZXJCYXNlO1xyXG5cdHB1YmxpYyBfcEJsZW5kTW9kZTpzdHJpbmcgPSBCbGVuZE1vZGUuTk9STUFMO1xyXG5cdHByaXZhdGUgX3JlbmRlck9iamVjdHM6QXJyYXk8SVJlbmRlck9iamVjdD4gPSBuZXcgQXJyYXk8SVJlbmRlck9iamVjdD4oKTtcclxuXHRwcml2YXRlIF9yZW5kZXJhYmxlczpBcnJheTxJUmVuZGVyYWJsZT4gPSBuZXcgQXJyYXk8SVJlbmRlcmFibGU+KCk7XHJcblx0cHJpdmF0ZSBfdXZUcmFuc2Zvcm06VVZUcmFuc2Zvcm07XHJcblx0cHJpdmF0ZSBfb3duZXJzOkFycmF5PElSZW5kZXJhYmxlT3duZXI+O1xyXG5cdHByaXZhdGUgX21pcG1hcDpib29sZWFuID0gZmFsc2U7XHJcblx0cHJpdmF0ZSBfc21vb3RoOmJvb2xlYW4gPSB0cnVlO1xyXG5cdFxyXG5cdHByaXZhdGUgX21hdGVyaWFsOk1hdGVyaWFsQmFzZTtcclxuXHRwcml2YXRlIF9hbmltYXRvcjpJQW5pbWF0b3I7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBtaW5pbXVtIGFscGhhIHZhbHVlIGZvciB3aGljaCBwaXhlbHMgc2hvdWxkIGJlIGRyYXduLiBUaGlzIGlzIHVzZWQgZm9yIHRyYW5zcGFyZW5jeSB0aGF0IGlzIGVpdGhlclxyXG5cdCAqIGludmlzaWJsZSBvciBlbnRpcmVseSBvcGFxdWUsIG9mdGVuIHVzZWQgd2l0aCB0ZXh0dXJlcyBmb3IgZm9saWFnZSwgZXRjLlxyXG5cdCAqIFJlY29tbWVuZGVkIHZhbHVlcyBhcmUgMCB0byBkaXNhYmxlIGFscGhhLCBvciAwLjUgdG8gY3JlYXRlIHNtb290aCBlZGdlcy4gRGVmYXVsdCB2YWx1ZSBpcyAwIChkaXNhYmxlZCkuXHJcblx0ICovXHJcblx0cHVibGljIGdldCBhbHBoYVRocmVzaG9sZCgpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9wQWxwaGFUaHJlc2hvbGQ7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IGFscGhhVGhyZXNob2xkKHZhbHVlOm51bWJlcilcclxuXHR7XHJcblx0XHRpZiAodmFsdWUgPCAwKVxyXG5cdFx0XHR2YWx1ZSA9IDA7XHJcblx0XHRlbHNlIGlmICh2YWx1ZSA+IDEpXHJcblx0XHRcdHZhbHVlID0gMTtcclxuXHJcblx0XHRpZiAodGhpcy5fcEFscGhhVGhyZXNob2xkID09IHZhbHVlKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fcEFscGhhVGhyZXNob2xkID0gdmFsdWU7XHJcblxyXG5cdFx0dGhpcy5fcElpbnZhbGlkYXRlUGFzc2VzKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJbmRpY2F0ZXMgd2hldGhlciBvciBub3QgYW55IHVzZWQgdGV4dHVyZXMgc2hvdWxkIHVzZSBtaXBtYXBwaW5nLiBEZWZhdWx0cyB0byB0cnVlLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgbWlwbWFwKCk6Ym9vbGVhblxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9taXBtYXA7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IG1pcG1hcCh2YWx1ZTpib29sZWFuKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9taXBtYXAgPT0gdmFsdWUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9taXBtYXAgPSB2YWx1ZTtcclxuXHJcblx0XHR0aGlzLl9wSWludmFsaWRhdGVQYXNzZXMoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluZGljYXRlcyB3aGV0aGVyIG9yIG5vdCBhbnkgdXNlZCB0ZXh0dXJlcyBzaG91bGQgdXNlIHNtb290aGluZy5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHNtb290aCgpOmJvb2xlYW5cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fc21vb3RoO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBzbW9vdGgodmFsdWU6Ym9vbGVhbilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fc21vb3RoID09IHZhbHVlKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fc21vb3RoID0gdmFsdWU7XHJcblxyXG5cdFx0dGhpcy5fcElpbnZhbGlkYXRlUGFzc2VzKCk7XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIFRoZSBsaWdodCBwaWNrZXIgdXNlZCBieSB0aGUgbWF0ZXJpYWwgdG8gcHJvdmlkZSBsaWdodHMgdG8gdGhlIG1hdGVyaWFsIGlmIGl0IHN1cHBvcnRzIGxpZ2h0aW5nLlxyXG5cdCAqXHJcblx0ICogQHNlZSBMaWdodFBpY2tlckJhc2VcclxuXHQgKiBAc2VlIFN0YXRpY0xpZ2h0UGlja2VyXHJcblx0ICovXHJcblx0cHVibGljIGdldCBsaWdodFBpY2tlcigpOkxpZ2h0UGlja2VyQmFzZVxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9wTGlnaHRQaWNrZXI7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgYW5pbWF0aW9uU2V0KCk6SUFuaW1hdGlvblNldFxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9hbmltYXRpb25TZXQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgYmxlbmQgbW9kZSB0byB1c2Ugd2hlbiBkcmF3aW5nIHRoaXMgcmVuZGVyYWJsZS4gVGhlIGZvbGxvd2luZyBibGVuZCBtb2RlcyBhcmUgc3VwcG9ydGVkOlxyXG5cdCAqIDx1bD5cclxuXHQgKiA8bGk+QmxlbmRNb2RlLk5PUk1BTDogTm8gYmxlbmRpbmcsIHVubGVzcyB0aGUgbWF0ZXJpYWwgaW5oZXJlbnRseSBuZWVkcyBpdDwvbGk+XHJcblx0ICogPGxpPkJsZW5kTW9kZS5MQVlFUjogRm9yY2UgYmxlbmRpbmcuIFRoaXMgd2lsbCBkcmF3IHRoZSBvYmplY3QgdGhlIHNhbWUgYXMgTk9STUFMLCBidXQgd2l0aG91dCB3cml0aW5nIGRlcHRoIHdyaXRlcy48L2xpPlxyXG5cdCAqIDxsaT5CbGVuZE1vZGUuTVVMVElQTFk8L2xpPlxyXG5cdCAqIDxsaT5CbGVuZE1vZGUuQUREPC9saT5cclxuXHQgKiA8bGk+QmxlbmRNb2RlLkFMUEhBPC9saT5cclxuXHQgKiA8L3VsPlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgYmxlbmRNb2RlKCk6c3RyaW5nXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BCbGVuZE1vZGU7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IGJsZW5kTW9kZSh2YWx1ZTpzdHJpbmcpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX3BCbGVuZE1vZGUgPT0gdmFsdWUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9wQmxlbmRNb2RlID0gdmFsdWU7XHJcblxyXG5cdFx0dGhpcy5fcEludmFsaWRhdGVSZW5kZXJPYmplY3QoKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBfcEludmFsaWRhdGVSZW5kZXJPYmplY3QoKVxyXG5cdHtcclxuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fcmVuZGVyT2JqZWN0cy5sZW5ndGg7XHJcblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBsZW47IGkrKylcclxuXHRcdFx0dGhpcy5fcmVuZGVyT2JqZWN0c1tpXS5pbnZhbGlkYXRlUmVuZGVyT2JqZWN0KCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYXJrcyB0aGUgc2hhZGVyIHByb2dyYW1zIGZvciBhbGwgcGFzc2VzIGFzIGludmFsaWQsIHNvIHRoZXkgd2lsbCBiZSByZWNvbXBpbGVkIGJlZm9yZSB0aGUgbmV4dCB1c2UuXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBfcElpbnZhbGlkYXRlUGFzc2VzKClcclxuXHR7XHJcblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX3JlbmRlck9iamVjdHMubGVuZ3RoO1xyXG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgbGVuOyBpKyspXHJcblx0XHRcdHRoaXMuX3JlbmRlck9iamVjdHNbaV0uaW52YWxpZGF0ZVBhc3NlcygpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQSBsaXN0IG9mIHRoZSBJUmVuZGVyYWJsZU93bmVycyB0aGF0IHVzZSB0aGlzIG1hdGVyaWFsXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgaU93bmVycygpOkFycmF5PElSZW5kZXJhYmxlT3duZXI+XHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX293bmVycztcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXQgYW5pbWF0b3IoKTpJQW5pbWF0b3JcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fYW5pbWF0b3I7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgdXZUcmFuc2Zvcm0oKTpVVlRyYW5zZm9ybVxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl91dlRyYW5zZm9ybTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgdXZUcmFuc2Zvcm0odmFsdWU6VVZUcmFuc2Zvcm0pXHJcblx0e1xyXG5cdFx0dGhpcy5fdXZUcmFuc2Zvcm0gPSB2YWx1ZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCogVGhlIGN1YmUgdGV4dHVyZSB0byB1c2UgYXMgdGhlIHNreWJveC5cclxuXHQqL1xyXG5cdHB1YmxpYyBnZXQgY3ViZU1hcCgpOkN1YmVUZXh0dXJlQmFzZVxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9jdWJlTWFwO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBjdWJlTWFwKHZhbHVlOkN1YmVUZXh0dXJlQmFzZSlcclxuXHR7XHJcblx0XHRpZiAodmFsdWUgJiYgdGhpcy5fY3ViZU1hcCAmJiAodmFsdWUuaGFzTWlwbWFwcyAhPSB0aGlzLl9jdWJlTWFwLmhhc01pcG1hcHMgfHwgdmFsdWUuZm9ybWF0ICE9IHRoaXMuX2N1YmVNYXAuZm9ybWF0KSlcclxuXHRcdFx0dGhpcy5fcEludmFsaWRhdGVSZW5kZXJPYmplY3QoKTtcclxuXHJcblx0XHR0aGlzLl9jdWJlTWFwID0gdmFsdWU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGUgYSBuZXcgU2t5Ym94IG9iamVjdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBtYXRlcmlhbFx0VGhlIG1hdGVyaWFsIHdpdGggd2hpY2ggdG8gcmVuZGVyIHRoZSBTa3lib3guXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoY3ViZU1hcDpDdWJlVGV4dHVyZUJhc2UgPSBudWxsKVxyXG5cdHtcclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0dGhpcy5fcElzRW50aXR5ID0gdHJ1ZTtcclxuXHRcdHRoaXMuX293bmVycyA9IG5ldyBBcnJheTxJUmVuZGVyYWJsZU93bmVyPih0aGlzKTtcclxuXHJcblx0XHR0aGlzLmN1YmVNYXAgPSBjdWJlTWFwO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGdldCBhc3NldFR5cGUoKTpzdHJpbmdcclxuXHR7XHJcblx0XHRyZXR1cm4gQXNzZXRUeXBlLlNLWUJPWDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwcm90ZWN0ZWRcclxuXHQgKi9cclxuXHRwdWJsaWMgcEludmFsaWRhdGVCb3VuZHMoKVxyXG5cdHtcclxuXHRcdC8vIGRlYWQgZW5kXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAcHJvdGVjdGVkXHJcblx0ICovXHJcblx0cHVibGljIHBDcmVhdGVFbnRpdHlQYXJ0aXRpb25Ob2RlKCk6U2t5Ym94Tm9kZVxyXG5cdHtcclxuXHRcdHJldHVybiBuZXcgU2t5Ym94Tm9kZSh0aGlzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwcm90ZWN0ZWRcclxuXHQgKi9cclxuXHRwdWJsaWMgcENyZWF0ZURlZmF1bHRCb3VuZGluZ1ZvbHVtZSgpOkJvdW5kaW5nVm9sdW1lQmFzZVxyXG5cdHtcclxuXHRcdHJldHVybiA8Qm91bmRpbmdWb2x1bWVCYXNlPiBuZXcgTnVsbEJvdW5kcygpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHByb3RlY3RlZFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBwVXBkYXRlQm91bmRzKClcclxuXHR7XHJcblx0XHR0aGlzLl9wQm91bmRzSW52YWxpZCA9IGZhbHNlO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGdldCBjYXN0c1NoYWRvd3MoKTpib29sZWFuXHJcblx0e1xyXG5cdFx0cmV0dXJuIGZhbHNlOyAvL1RPRE9cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENsZWFucyB1cCByZXNvdXJjZXMgb3duZWQgYnkgdGhlIG1hdGVyaWFsLCBpbmNsdWRpbmcgcGFzc2VzLiBUZXh0dXJlcyBhcmUgbm90IG93bmVkIGJ5IHRoZSBtYXRlcmlhbCBzaW5jZSB0aGV5XHJcblx0ICogY291bGQgYmUgdXNlZCBieSBvdGhlciBtYXRlcmlhbHMgYW5kIHdpbGwgbm90IGJlIGRpc3Bvc2VkLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBkaXNwb3NlKClcclxuXHR7XHJcblx0XHR2YXIgaTpudW1iZXI7XHJcblx0XHR2YXIgbGVuOm51bWJlcjtcclxuXHJcblx0XHRsZW4gPSB0aGlzLl9yZW5kZXJPYmplY3RzLmxlbmd0aDtcclxuXHRcdGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKylcclxuXHRcdFx0dGhpcy5fcmVuZGVyT2JqZWN0c1tpXS5kaXNwb3NlKCk7XHJcblxyXG5cdFx0dGhpcy5fcmVuZGVyT2JqZWN0cyA9IG5ldyBBcnJheTxJUmVuZGVyT2JqZWN0PigpO1xyXG5cclxuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fcmVuZGVyYWJsZXMubGVuZ3RoO1xyXG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgbGVuOyBpKyspXHJcblx0XHRcdHRoaXMuX3JlbmRlcmFibGVzW2ldLmRpc3Bvc2UoKTtcclxuXHJcblx0XHR0aGlzLl9yZW5kZXJhYmxlcyA9IG5ldyBBcnJheTxJUmVuZGVyYWJsZT4oKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBfaUNvbGxlY3RSZW5kZXJhYmxlcyhyZW5kZXJlclBvb2w6SVJlbmRlcmVyUG9vbClcclxuXHR7XHJcblx0XHQvL3NreWJveCBkbyBub3QgZ2V0IGNvbGxlY3RlZCBpbiB0aGUgc3RhbmRhcmQgZW50aXR5IGxpc3RcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBfaUNvbGxlY3RSZW5kZXJhYmxlKHJlbmRlcmVyUG9vbDpJUmVuZGVyZXJQb29sKVxyXG5cdHtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgX2lBZGRSZW5kZXJPYmplY3QocmVuZGVyT2JqZWN0OklSZW5kZXJPYmplY3QpOklSZW5kZXJPYmplY3RcclxuXHR7XHJcblx0XHR0aGlzLl9yZW5kZXJPYmplY3RzLnB1c2gocmVuZGVyT2JqZWN0KTtcclxuXHJcblx0XHRyZXR1cm4gcmVuZGVyT2JqZWN0O1xyXG5cdH1cclxuXHJcblx0cHVibGljIF9pUmVtb3ZlUmVuZGVyT2JqZWN0KHJlbmRlck9iamVjdDpJUmVuZGVyT2JqZWN0KTpJUmVuZGVyT2JqZWN0XHJcblx0e1xyXG5cdFx0dGhpcy5fcmVuZGVyT2JqZWN0cy5zcGxpY2UodGhpcy5fcmVuZGVyT2JqZWN0cy5pbmRleE9mKHJlbmRlck9iamVjdCksIDEpO1xyXG5cclxuXHRcdHJldHVybiByZW5kZXJPYmplY3Q7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgX2lBZGRSZW5kZXJhYmxlKHJlbmRlcmFibGU6SVJlbmRlcmFibGUpOklSZW5kZXJhYmxlXHJcblx0e1xyXG5cdFx0dGhpcy5fcmVuZGVyYWJsZXMucHVzaChyZW5kZXJhYmxlKTtcclxuXHJcblx0XHRyZXR1cm4gcmVuZGVyYWJsZTtcclxuXHR9XHJcblxyXG5cclxuXHRwdWJsaWMgX2lSZW1vdmVSZW5kZXJhYmxlKHJlbmRlcmFibGU6SVJlbmRlcmFibGUpOklSZW5kZXJhYmxlXHJcblx0e1xyXG5cdFx0dmFyIGluZGV4Om51bWJlciA9IHRoaXMuX3JlbmRlcmFibGVzLmluZGV4T2YocmVuZGVyYWJsZSk7XHJcblxyXG5cdFx0dGhpcy5fcmVuZGVyYWJsZXMuc3BsaWNlKGluZGV4LCAxKTtcclxuXHJcblx0XHRyZXR1cm4gcmVuZGVyYWJsZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHJlbmRlcmVyXHJcblx0ICpcclxuXHQgKiBAaW50ZXJuYWxcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0UmVuZGVyT2JqZWN0KHJlbmRlcmFibGVQb29sOklSZW5kZXJhYmxlUG9vbClcclxuXHR7XHJcblx0XHRyZXR1cm4gcmVuZGVyYWJsZVBvb2wuZ2V0U2t5Ym94UmVuZGVyT2JqZWN0KHRoaXMpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0ID0gU2t5Ym94OyJdfQ==