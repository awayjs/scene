var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BlendMode = require("awayjs-core/lib/data/BlendMode");
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
            return Skybox.assetType;
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
    Skybox.assetType = "[asset Skybox]";
    return Skybox;
})(DisplayObject);
module.exports = Skybox;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9Ta3lib3gudHMiXSwibmFtZXMiOlsiU2t5Ym94IiwiU2t5Ym94LmNvbnN0cnVjdG9yIiwiU2t5Ym94LmFscGhhVGhyZXNob2xkIiwiU2t5Ym94Lm1pcG1hcCIsIlNreWJveC5zbW9vdGgiLCJTa3lib3gubGlnaHRQaWNrZXIiLCJTa3lib3guYW5pbWF0aW9uU2V0IiwiU2t5Ym94LmJsZW5kTW9kZSIsIlNreWJveC5fcEludmFsaWRhdGVSZW5kZXJPYmplY3QiLCJTa3lib3guX3BJaW52YWxpZGF0ZVBhc3NlcyIsIlNreWJveC5pT3duZXJzIiwiU2t5Ym94LmFuaW1hdG9yIiwiU2t5Ym94LnV2VHJhbnNmb3JtIiwiU2t5Ym94LmN1YmVNYXAiLCJTa3lib3guYXNzZXRUeXBlIiwiU2t5Ym94LmNhc3RzU2hhZG93cyIsIlNreWJveC5kaXNwb3NlIiwiU2t5Ym94Ll9pQ29sbGVjdFJlbmRlcmFibGVzIiwiU2t5Ym94Ll9pQ29sbGVjdFJlbmRlcmFibGUiLCJTa3lib3guX2lBZGRSZW5kZXJPYmplY3QiLCJTa3lib3guX2lSZW1vdmVSZW5kZXJPYmplY3QiLCJTa3lib3guX2lBZGRSZW5kZXJhYmxlIiwiU2t5Ym94Ll9pUmVtb3ZlUmVuZGVyYWJsZSIsIlNreWJveC5nZXRSZW5kZXJPYmplY3QiLCJTa3lib3guX3BSZWdpc3RlckVudGl0eSIsIlNreWJveC5fcFVucmVnaXN0ZXJFbnRpdHkiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQU8sU0FBUyxXQUFlLGdDQUFnQyxDQUFDLENBQUM7QUFNakUsSUFBTyxhQUFhLFdBQWMsdUNBQXVDLENBQUMsQ0FBQztBQUczRSxJQUFPLFVBQVUsV0FBZSxzQ0FBc0MsQ0FBQyxDQUFDO0FBV3hFLEFBS0E7Ozs7R0FERztJQUNHLE1BQU07SUFBU0EsVUFBZkEsTUFBTUEsVUFBc0JBO0lBMkxqQ0E7Ozs7T0FJR0E7SUFDSEEsU0FoTUtBLE1BQU1BLENBZ01DQSxPQUE4QkE7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Q0ExU0EsQUEwU0NBLEVBMVNvQixhQUFhLEVBMFNqQztBQUVELEFBQWdCLGlCQUFQLE1BQU0sQ0FBQyIsImZpbGUiOiJlbnRpdGllcy9Ta3lib3guanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJsZW5kTW9kZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZGF0YS9CbGVuZE1vZGVcIik7XHJcbmltcG9ydCBVVlRyYW5zZm9ybVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9VVlRyYW5zZm9ybVwiKTtcclxuaW1wb3J0IEN1YmVUZXh0dXJlQmFzZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL3RleHR1cmVzL0N1YmVUZXh0dXJlQmFzZVwiKTtcclxuXHJcbmltcG9ydCBJQW5pbWF0aW9uU2V0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYW5pbWF0b3JzL0lBbmltYXRpb25TZXRcIik7XHJcbmltcG9ydCBJQW5pbWF0b3JcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2FuaW1hdG9ycy9JQW5pbWF0b3JcIik7XHJcbmltcG9ydCBEaXNwbGF5T2JqZWN0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9EaXNwbGF5T2JqZWN0XCIpO1xyXG5pbXBvcnQgSVJlbmRlcmFibGVPd25lclx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvSVJlbmRlcmFibGVPd25lclwiKTtcclxuaW1wb3J0IElSZW5kZXJPYmplY3RPd25lclx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0lSZW5kZXJPYmplY3RPd25lclwiKTtcclxuaW1wb3J0IEJvdW5kc1R5cGVcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2JvdW5kcy9Cb3VuZHNUeXBlXCIpO1xyXG5pbXBvcnQgUGFydGl0aW9uXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vUGFydGl0aW9uXCIpO1xyXG5pbXBvcnQgSVJlbmRlcmFibGVcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3Bvb2wvSVJlbmRlcmFibGVcIik7XHJcbmltcG9ydCBJUmVuZGVyYWJsZVBvb2xcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wb29sL0lSZW5kZXJhYmxlUG9vbFwiKTtcclxuaW1wb3J0IElSZW5kZXJPYmplY3RcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wb29sL0lSZW5kZXJPYmplY3RcIik7XHJcbmltcG9ydCBTa3lib3hOb2RlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vU2t5Ym94Tm9kZVwiKTtcclxuaW1wb3J0IElSZW5kZXJlclBvb2xcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wb29sL0lSZW5kZXJlclBvb2xcIik7XHJcbmltcG9ydCBJRW50aXR5XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2VudGl0aWVzL0lFbnRpdHlcIik7XHJcbmltcG9ydCBMaWdodFBpY2tlckJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9tYXRlcmlhbHMvbGlnaHRwaWNrZXJzL0xpZ2h0UGlja2VyQmFzZVwiKTtcclxuaW1wb3J0IE1hdGVyaWFsQmFzZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvbWF0ZXJpYWxzL01hdGVyaWFsQmFzZVwiKTtcclxuXHJcbi8qKlxyXG4gKiBBIFNreWJveCBjbGFzcyBpcyB1c2VkIHRvIHJlbmRlciBhIHNreSBpbiB0aGUgc2NlbmUuIEl0J3MgYWx3YXlzIGNvbnNpZGVyZWQgc3RhdGljIGFuZCAnYXQgaW5maW5pdHknLCBhbmQgYXNcclxuICogc3VjaCBpdCdzIGFsd2F5cyBjZW50ZXJlZCBhdCB0aGUgY2FtZXJhJ3MgcG9zaXRpb24gYW5kIHNpemVkIHRvIGV4YWN0bHkgZml0IHdpdGhpbiB0aGUgY2FtZXJhJ3MgZnJ1c3R1bSwgZW5zdXJpbmdcclxuICogdGhlIHNreSBib3ggaXMgYWx3YXlzIGFzIGxhcmdlIGFzIHBvc3NpYmxlIHdpdGhvdXQgYmVpbmcgY2xpcHBlZC5cclxuICovXHJcbmNsYXNzIFNreWJveCBleHRlbmRzIERpc3BsYXlPYmplY3QgaW1wbGVtZW50cyBJRW50aXR5LCBJUmVuZGVyYWJsZU93bmVyLCBJUmVuZGVyT2JqZWN0T3duZXJcclxue1xyXG5cdHB1YmxpYyBzdGF0aWMgYXNzZXRUeXBlOnN0cmluZyA9IFwiW2Fzc2V0IFNreWJveF1cIjtcclxuXHJcblx0cHJpdmF0ZSBfY3ViZU1hcDpDdWJlVGV4dHVyZUJhc2U7XHJcblx0cHVibGljIF9wQWxwaGFUaHJlc2hvbGQ6bnVtYmVyID0gMDtcclxuXHRwcml2YXRlIF9hbmltYXRpb25TZXQ6SUFuaW1hdGlvblNldDtcclxuXHRwdWJsaWMgX3BMaWdodFBpY2tlcjpMaWdodFBpY2tlckJhc2U7XHJcblx0cHVibGljIF9wQmxlbmRNb2RlOnN0cmluZyA9IEJsZW5kTW9kZS5OT1JNQUw7XHJcblx0cHJpdmF0ZSBfcmVuZGVyT2JqZWN0czpBcnJheTxJUmVuZGVyT2JqZWN0PiA9IG5ldyBBcnJheTxJUmVuZGVyT2JqZWN0PigpO1xyXG5cdHByaXZhdGUgX3JlbmRlcmFibGVzOkFycmF5PElSZW5kZXJhYmxlPiA9IG5ldyBBcnJheTxJUmVuZGVyYWJsZT4oKTtcclxuXHRwcml2YXRlIF91dlRyYW5zZm9ybTpVVlRyYW5zZm9ybTtcclxuXHRwcml2YXRlIF9vd25lcnM6QXJyYXk8SVJlbmRlcmFibGVPd25lcj47XHJcblx0cHJpdmF0ZSBfbWlwbWFwOmJvb2xlYW4gPSBmYWxzZTtcclxuXHRwcml2YXRlIF9zbW9vdGg6Ym9vbGVhbiA9IHRydWU7XHJcblx0XHJcblx0cHJpdmF0ZSBfbWF0ZXJpYWw6TWF0ZXJpYWxCYXNlO1xyXG5cdHByaXZhdGUgX2FuaW1hdG9yOklBbmltYXRvcjtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIG1pbmltdW0gYWxwaGEgdmFsdWUgZm9yIHdoaWNoIHBpeGVscyBzaG91bGQgYmUgZHJhd24uIFRoaXMgaXMgdXNlZCBmb3IgdHJhbnNwYXJlbmN5IHRoYXQgaXMgZWl0aGVyXHJcblx0ICogaW52aXNpYmxlIG9yIGVudGlyZWx5IG9wYXF1ZSwgb2Z0ZW4gdXNlZCB3aXRoIHRleHR1cmVzIGZvciBmb2xpYWdlLCBldGMuXHJcblx0ICogUmVjb21tZW5kZWQgdmFsdWVzIGFyZSAwIHRvIGRpc2FibGUgYWxwaGEsIG9yIDAuNSB0byBjcmVhdGUgc21vb3RoIGVkZ2VzLiBEZWZhdWx0IHZhbHVlIGlzIDAgKGRpc2FibGVkKS5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGFscGhhVGhyZXNob2xkKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BBbHBoYVRocmVzaG9sZDtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgYWxwaGFUaHJlc2hvbGQodmFsdWU6bnVtYmVyKVxyXG5cdHtcclxuXHRcdGlmICh2YWx1ZSA8IDApXHJcblx0XHRcdHZhbHVlID0gMDtcclxuXHRcdGVsc2UgaWYgKHZhbHVlID4gMSlcclxuXHRcdFx0dmFsdWUgPSAxO1xyXG5cclxuXHRcdGlmICh0aGlzLl9wQWxwaGFUaHJlc2hvbGQgPT0gdmFsdWUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9wQWxwaGFUaHJlc2hvbGQgPSB2YWx1ZTtcclxuXHJcblx0XHR0aGlzLl9wSWludmFsaWRhdGVQYXNzZXMoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluZGljYXRlcyB3aGV0aGVyIG9yIG5vdCB0aGUgU2t5Ym94IHRleHR1cmUgc2hvdWxkIHVzZSBtaXBtYXBwaW5nLiBEZWZhdWx0cyB0byBmYWxzZS5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IG1pcG1hcCgpOmJvb2xlYW5cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fbWlwbWFwO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBtaXBtYXAodmFsdWU6Ym9vbGVhbilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fbWlwbWFwID09IHZhbHVlKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fbWlwbWFwID0gdmFsdWU7XHJcblxyXG5cdFx0dGhpcy5fcElpbnZhbGlkYXRlUGFzc2VzKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJbmRpY2F0ZXMgd2hldGhlciBvciBub3QgdGhlIFNreWJveCB0ZXh0dXJlIHNob3VsZCB1c2Ugc21vb3RoaW5nLiBEZWZhdWx0cyB0byB0cnVlLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgc21vb3RoKCk6Ym9vbGVhblxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9zbW9vdGg7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHNtb290aCh2YWx1ZTpib29sZWFuKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9zbW9vdGggPT0gdmFsdWUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9zbW9vdGggPSB2YWx1ZTtcclxuXHJcblx0XHR0aGlzLl9wSWludmFsaWRhdGVQYXNzZXMoKTtcclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0ICogVGhlIGxpZ2h0IHBpY2tlciB1c2VkIGJ5IHRoZSBtYXRlcmlhbCB0byBwcm92aWRlIGxpZ2h0cyB0byB0aGUgbWF0ZXJpYWwgaWYgaXQgc3VwcG9ydHMgbGlnaHRpbmcuXHJcblx0ICpcclxuXHQgKiBAc2VlIExpZ2h0UGlja2VyQmFzZVxyXG5cdCAqIEBzZWUgU3RhdGljTGlnaHRQaWNrZXJcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGxpZ2h0UGlja2VyKCk6TGlnaHRQaWNrZXJCYXNlXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BMaWdodFBpY2tlcjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCBhbmltYXRpb25TZXQoKTpJQW5pbWF0aW9uU2V0XHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2FuaW1hdGlvblNldDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBibGVuZCBtb2RlIHRvIHVzZSB3aGVuIGRyYXdpbmcgdGhpcyByZW5kZXJhYmxlLiBUaGUgZm9sbG93aW5nIGJsZW5kIG1vZGVzIGFyZSBzdXBwb3J0ZWQ6XHJcblx0ICogPHVsPlxyXG5cdCAqIDxsaT5CbGVuZE1vZGUuTk9STUFMOiBObyBibGVuZGluZywgdW5sZXNzIHRoZSBtYXRlcmlhbCBpbmhlcmVudGx5IG5lZWRzIGl0PC9saT5cclxuXHQgKiA8bGk+QmxlbmRNb2RlLkxBWUVSOiBGb3JjZSBibGVuZGluZy4gVGhpcyB3aWxsIGRyYXcgdGhlIG9iamVjdCB0aGUgc2FtZSBhcyBOT1JNQUwsIGJ1dCB3aXRob3V0IHdyaXRpbmcgZGVwdGggd3JpdGVzLjwvbGk+XHJcblx0ICogPGxpPkJsZW5kTW9kZS5NVUxUSVBMWTwvbGk+XHJcblx0ICogPGxpPkJsZW5kTW9kZS5BREQ8L2xpPlxyXG5cdCAqIDxsaT5CbGVuZE1vZGUuQUxQSEE8L2xpPlxyXG5cdCAqIDwvdWw+XHJcblx0ICovXHJcblx0cHVibGljIGdldCBibGVuZE1vZGUoKTpzdHJpbmdcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcEJsZW5kTW9kZTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgYmxlbmRNb2RlKHZhbHVlOnN0cmluZylcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fcEJsZW5kTW9kZSA9PSB2YWx1ZSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX3BCbGVuZE1vZGUgPSB2YWx1ZTtcclxuXHJcblx0XHR0aGlzLl9wSW52YWxpZGF0ZVJlbmRlck9iamVjdCgpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIF9wSW52YWxpZGF0ZVJlbmRlck9iamVjdCgpXHJcblx0e1xyXG5cdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9yZW5kZXJPYmplY3RzLmxlbmd0aDtcclxuXHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IGxlbjsgaSsrKVxyXG5cdFx0XHR0aGlzLl9yZW5kZXJPYmplY3RzW2ldLmludmFsaWRhdGVSZW5kZXJPYmplY3QoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1hcmtzIHRoZSBzaGFkZXIgcHJvZ3JhbXMgZm9yIGFsbCBwYXNzZXMgYXMgaW52YWxpZCwgc28gdGhleSB3aWxsIGJlIHJlY29tcGlsZWQgYmVmb3JlIHRoZSBuZXh0IHVzZS5cclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHVibGljIF9wSWludmFsaWRhdGVQYXNzZXMoKVxyXG5cdHtcclxuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fcmVuZGVyT2JqZWN0cy5sZW5ndGg7XHJcblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBsZW47IGkrKylcclxuXHRcdFx0dGhpcy5fcmVuZGVyT2JqZWN0c1tpXS5pbnZhbGlkYXRlUGFzc2VzKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBIGxpc3Qgb2YgdGhlIElSZW5kZXJhYmxlT3duZXJzIHRoYXQgdXNlIHRoaXMgbWF0ZXJpYWxcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHVibGljIGdldCBpT3duZXJzKCk6QXJyYXk8SVJlbmRlcmFibGVPd25lcj5cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fb3duZXJzO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGdldCBhbmltYXRvcigpOklBbmltYXRvclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9hbmltYXRvcjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCB1dlRyYW5zZm9ybSgpOlVWVHJhbnNmb3JtXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3V2VHJhbnNmb3JtO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCB1dlRyYW5zZm9ybSh2YWx1ZTpVVlRyYW5zZm9ybSlcclxuXHR7XHJcblx0XHR0aGlzLl91dlRyYW5zZm9ybSA9IHZhbHVlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0KiBUaGUgY3ViZSB0ZXh0dXJlIHRvIHVzZSBhcyB0aGUgc2t5Ym94LlxyXG5cdCovXHJcblx0cHVibGljIGdldCBjdWJlTWFwKCk6Q3ViZVRleHR1cmVCYXNlXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2N1YmVNYXA7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IGN1YmVNYXAodmFsdWU6Q3ViZVRleHR1cmVCYXNlKVxyXG5cdHtcclxuXHRcdGlmICh2YWx1ZSAmJiB0aGlzLl9jdWJlTWFwICYmICh2YWx1ZS5mb3JtYXQgIT0gdGhpcy5fY3ViZU1hcC5mb3JtYXQpKVxyXG5cdFx0XHR0aGlzLl9wSW52YWxpZGF0ZVJlbmRlck9iamVjdCgpO1xyXG5cclxuXHRcdHRoaXMuX2N1YmVNYXAgPSB2YWx1ZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZSBhIG5ldyBTa3lib3ggb2JqZWN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG1hdGVyaWFsXHRUaGUgbWF0ZXJpYWwgd2l0aCB3aGljaCB0byByZW5kZXIgdGhlIFNreWJveC5cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcihjdWJlTWFwOkN1YmVUZXh0dXJlQmFzZSA9IG51bGwpXHJcblx0e1xyXG5cdFx0c3VwZXIoKTtcclxuXHJcblx0XHR0aGlzLl9wSXNFbnRpdHkgPSB0cnVlO1xyXG5cdFx0dGhpcy5fb3duZXJzID0gbmV3IEFycmF5PElSZW5kZXJhYmxlT3duZXI+KHRoaXMpO1xyXG5cclxuXHRcdHRoaXMuY3ViZU1hcCA9IGN1YmVNYXA7XHJcblxyXG5cdFx0Ly9kZWZhdWx0IGJvdW5kcyB0eXBlXHJcblx0XHR0aGlzLl9ib3VuZHNUeXBlID0gQm91bmRzVHlwZS5OVUxMO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGdldCBhc3NldFR5cGUoKTpzdHJpbmdcclxuXHR7XHJcblx0XHRyZXR1cm4gU2t5Ym94LmFzc2V0VHlwZTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXQgY2FzdHNTaGFkb3dzKCk6Ym9vbGVhblxyXG5cdHtcclxuXHRcdHJldHVybiBmYWxzZTsgLy9UT0RPXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDbGVhbnMgdXAgcmVzb3VyY2VzIG93bmVkIGJ5IHRoZSBtYXRlcmlhbCwgaW5jbHVkaW5nIHBhc3Nlcy4gVGV4dHVyZXMgYXJlIG5vdCBvd25lZCBieSB0aGUgbWF0ZXJpYWwgc2luY2UgdGhleVxyXG5cdCAqIGNvdWxkIGJlIHVzZWQgYnkgb3RoZXIgbWF0ZXJpYWxzIGFuZCB3aWxsIG5vdCBiZSBkaXNwb3NlZC5cclxuXHQgKi9cclxuXHRwdWJsaWMgZGlzcG9zZSgpXHJcblx0e1xyXG5cdFx0dmFyIGk6bnVtYmVyO1xyXG5cdFx0dmFyIGxlbjpudW1iZXI7XHJcblxyXG5cdFx0bGVuID0gdGhpcy5fcmVuZGVyT2JqZWN0cy5sZW5ndGg7XHJcblx0XHRmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspXHJcblx0XHRcdHRoaXMuX3JlbmRlck9iamVjdHNbaV0uZGlzcG9zZSgpO1xyXG5cclxuXHRcdHRoaXMuX3JlbmRlck9iamVjdHMgPSBuZXcgQXJyYXk8SVJlbmRlck9iamVjdD4oKTtcclxuXHJcblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX3JlbmRlcmFibGVzLmxlbmd0aDtcclxuXHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IGxlbjsgaSsrKVxyXG5cdFx0XHR0aGlzLl9yZW5kZXJhYmxlc1tpXS5kaXNwb3NlKCk7XHJcblxyXG5cdFx0dGhpcy5fcmVuZGVyYWJsZXMgPSBuZXcgQXJyYXk8SVJlbmRlcmFibGU+KCk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgX2lDb2xsZWN0UmVuZGVyYWJsZXMocmVuZGVyZXJQb29sOklSZW5kZXJlclBvb2wpXHJcblx0e1xyXG5cdFx0Ly9za3lib3ggZG8gbm90IGdldCBjb2xsZWN0ZWQgaW4gdGhlIHN0YW5kYXJkIGVudGl0eSBsaXN0XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgX2lDb2xsZWN0UmVuZGVyYWJsZShyZW5kZXJlclBvb2w6SVJlbmRlcmVyUG9vbClcclxuXHR7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIF9pQWRkUmVuZGVyT2JqZWN0KHJlbmRlck9iamVjdDpJUmVuZGVyT2JqZWN0KTpJUmVuZGVyT2JqZWN0XHJcblx0e1xyXG5cdFx0dGhpcy5fcmVuZGVyT2JqZWN0cy5wdXNoKHJlbmRlck9iamVjdCk7XHJcblxyXG5cdFx0cmV0dXJuIHJlbmRlck9iamVjdDtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBfaVJlbW92ZVJlbmRlck9iamVjdChyZW5kZXJPYmplY3Q6SVJlbmRlck9iamVjdCk6SVJlbmRlck9iamVjdFxyXG5cdHtcclxuXHRcdHRoaXMuX3JlbmRlck9iamVjdHMuc3BsaWNlKHRoaXMuX3JlbmRlck9iamVjdHMuaW5kZXhPZihyZW5kZXJPYmplY3QpLCAxKTtcclxuXHJcblx0XHRyZXR1cm4gcmVuZGVyT2JqZWN0O1xyXG5cdH1cclxuXHJcblx0cHVibGljIF9pQWRkUmVuZGVyYWJsZShyZW5kZXJhYmxlOklSZW5kZXJhYmxlKTpJUmVuZGVyYWJsZVxyXG5cdHtcclxuXHRcdHRoaXMuX3JlbmRlcmFibGVzLnB1c2gocmVuZGVyYWJsZSk7XHJcblxyXG5cdFx0cmV0dXJuIHJlbmRlcmFibGU7XHJcblx0fVxyXG5cclxuXHJcblx0cHVibGljIF9pUmVtb3ZlUmVuZGVyYWJsZShyZW5kZXJhYmxlOklSZW5kZXJhYmxlKTpJUmVuZGVyYWJsZVxyXG5cdHtcclxuXHRcdHZhciBpbmRleDpudW1iZXIgPSB0aGlzLl9yZW5kZXJhYmxlcy5pbmRleE9mKHJlbmRlcmFibGUpO1xyXG5cclxuXHRcdHRoaXMuX3JlbmRlcmFibGVzLnNwbGljZShpbmRleCwgMSk7XHJcblxyXG5cdFx0cmV0dXJuIHJlbmRlcmFibGU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSByZW5kZXJlclxyXG5cdCAqXHJcblx0ICogQGludGVybmFsXHJcblx0ICovXHJcblx0cHVibGljIGdldFJlbmRlck9iamVjdChyZW5kZXJhYmxlUG9vbDpJUmVuZGVyYWJsZVBvb2wpXHJcblx0e1xyXG5cdFx0cmV0dXJuIHJlbmRlcmFibGVQb29sLmdldFNreWJveFJlbmRlck9iamVjdCh0aGlzKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBfcFJlZ2lzdGVyRW50aXR5KHBhcnRpdGlvbjpQYXJ0aXRpb24pXHJcblx0e1xyXG5cdFx0cGFydGl0aW9uLl9pUmVnaXN0ZXJTa3lib3godGhpcyk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgX3BVbnJlZ2lzdGVyRW50aXR5KHBhcnRpdGlvbjpQYXJ0aXRpb24pXHJcblx0e1xyXG5cdFx0cGFydGl0aW9uLl9pVW5yZWdpc3RlclNreWJveCh0aGlzKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCA9IFNreWJveDsiXX0=