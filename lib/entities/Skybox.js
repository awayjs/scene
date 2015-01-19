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
            this._pInvalidateProperties();
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
            this._pInvalidateProperties();
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
            this._pInvalidateProperties();
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
    Skybox.prototype._pInvalidateProperties = function () {
        var len = this._renderObjects.length;
        for (var i = 0; i < len; i++)
            this._renderObjects[i].invalidateProperties();
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
    Skybox.prototype._iCollectRenderables = function (renderer) {
        //skybox do not get collected in the standard entity list
    };
    Skybox.prototype._iCollectRenderable = function (renderer) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9za3lib3gudHMiXSwibmFtZXMiOlsiU2t5Ym94IiwiU2t5Ym94LmNvbnN0cnVjdG9yIiwiU2t5Ym94LmFscGhhVGhyZXNob2xkIiwiU2t5Ym94Lm1pcG1hcCIsIlNreWJveC5zbW9vdGgiLCJTa3lib3gubGlnaHRQaWNrZXIiLCJTa3lib3guYW5pbWF0aW9uU2V0IiwiU2t5Ym94LmJsZW5kTW9kZSIsIlNreWJveC5fcEludmFsaWRhdGVSZW5kZXJPYmplY3QiLCJTa3lib3guX3BJbnZhbGlkYXRlUHJvcGVydGllcyIsIlNreWJveC5pT3duZXJzIiwiU2t5Ym94LmFuaW1hdG9yIiwiU2t5Ym94LnV2VHJhbnNmb3JtIiwiU2t5Ym94LmN1YmVNYXAiLCJTa3lib3guYXNzZXRUeXBlIiwiU2t5Ym94LnBJbnZhbGlkYXRlQm91bmRzIiwiU2t5Ym94LnBDcmVhdGVFbnRpdHlQYXJ0aXRpb25Ob2RlIiwiU2t5Ym94LnBDcmVhdGVEZWZhdWx0Qm91bmRpbmdWb2x1bWUiLCJTa3lib3gucFVwZGF0ZUJvdW5kcyIsIlNreWJveC5jYXN0c1NoYWRvd3MiLCJTa3lib3guZGlzcG9zZSIsIlNreWJveC5faUNvbGxlY3RSZW5kZXJhYmxlcyIsIlNreWJveC5faUNvbGxlY3RSZW5kZXJhYmxlIiwiU2t5Ym94Ll9pQWRkUmVuZGVyT2JqZWN0IiwiU2t5Ym94Ll9pUmVtb3ZlUmVuZGVyT2JqZWN0IiwiU2t5Ym94Ll9pQWRkUmVuZGVyYWJsZSIsIlNreWJveC5faVJlbW92ZVJlbmRlcmFibGUiLCJTa3lib3guZ2V0UmVuZGVyT2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxJQUFPLFVBQVUsV0FBZSxtQ0FBbUMsQ0FBQyxDQUFDO0FBRXJFLElBQU8sU0FBUyxXQUFlLG1DQUFtQyxDQUFDLENBQUM7QUFLcEUsSUFBTyxhQUFhLFdBQWMsdUNBQXVDLENBQUMsQ0FBQztBQUMzRSxJQUFPLFNBQVMsV0FBZSxtQ0FBbUMsQ0FBQyxDQUFDO0FBTXBFLElBQU8sVUFBVSxXQUFlLHlDQUF5QyxDQUFDLENBQUM7QUFNM0UsQUFLQTs7OztHQURHO0lBQ0csTUFBTTtJQUFTQSxVQUFmQSxNQUFNQSxVQUFzQkE7SUF5TGpDQTs7OztPQUlHQTtJQUNIQSxTQTlMS0EsTUFBTUEsQ0E4TENBLE9BQThCQTtRQUE5QkMsdUJBQThCQSxHQUE5QkEsY0FBOEJBO1FBRXpDQSxpQkFBT0EsQ0FBQ0E7UUE3TEZBLHFCQUFnQkEsR0FBVUEsQ0FBQ0EsQ0FBQ0E7UUFHNUJBLGdCQUFXQSxHQUFVQSxTQUFTQSxDQUFDQSxNQUFNQSxDQUFDQTtRQUNyQ0EsbUJBQWNBLEdBQXdCQSxJQUFJQSxLQUFLQSxFQUFpQkEsQ0FBQ0E7UUFDakVBLGlCQUFZQSxHQUFzQkEsSUFBSUEsS0FBS0EsRUFBZUEsQ0FBQ0E7UUFHM0RBLFlBQU9BLEdBQVdBLEtBQUtBLENBQUNBO1FBQ3hCQSxZQUFPQSxHQUFXQSxJQUFJQSxDQUFDQTtRQXNMOUJBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLElBQUlBLENBQUNBO1FBQ3ZCQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFHQSxJQUFJQSxLQUFLQSxDQUFtQkEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUFFakRBLElBQUlBLENBQUNBLE9BQU9BLEdBQUdBLE9BQU9BLENBQUNBO0lBQ3hCQSxDQUFDQTtJQWhMREQsc0JBQVdBLGtDQUFjQTtRQUx6QkE7Ozs7V0FJR0E7YUFDSEE7WUFFQ0UsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQTtRQUM5QkEsQ0FBQ0E7YUFFREYsVUFBMEJBLEtBQVlBO1lBRXJDRSxFQUFFQSxDQUFDQSxDQUFDQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDYkEsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDWEEsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2xCQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUVYQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLElBQUlBLEtBQUtBLENBQUNBO2dCQUNsQ0EsTUFBTUEsQ0FBQ0E7WUFFUkEsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxHQUFHQSxLQUFLQSxDQUFDQTtZQUU5QkEsSUFBSUEsQ0FBQ0Esc0JBQXNCQSxFQUFFQSxDQUFDQTtRQUMvQkEsQ0FBQ0E7OztPQWZBRjtJQW9CREEsc0JBQVdBLDBCQUFNQTtRQUhqQkE7O1dBRUdBO2FBQ0hBO1lBRUNHLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBO1FBQ3JCQSxDQUFDQTthQUVESCxVQUFrQkEsS0FBYUE7WUFFOUJHLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLElBQUlBLEtBQUtBLENBQUNBO2dCQUN6QkEsTUFBTUEsQ0FBQ0E7WUFFUkEsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsS0FBS0EsQ0FBQ0E7WUFFckJBLElBQUlBLENBQUNBLHNCQUFzQkEsRUFBRUEsQ0FBQ0E7UUFDL0JBLENBQUNBOzs7T0FWQUg7SUFlREEsc0JBQVdBLDBCQUFNQTtRQUhqQkE7O1dBRUdBO2FBQ0hBO1lBRUNJLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBO1FBQ3JCQSxDQUFDQTthQUVESixVQUFrQkEsS0FBYUE7WUFFOUJJLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLElBQUlBLEtBQUtBLENBQUNBO2dCQUN6QkEsTUFBTUEsQ0FBQ0E7WUFFUkEsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsS0FBS0EsQ0FBQ0E7WUFFckJBLElBQUlBLENBQUNBLHNCQUFzQkEsRUFBRUEsQ0FBQ0E7UUFDL0JBLENBQUNBOzs7T0FWQUo7SUFrQkRBLHNCQUFXQSwrQkFBV0E7UUFOdEJBOzs7OztXQUtHQTthQUNIQTtZQUVDSyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQTtRQUMzQkEsQ0FBQ0E7OztPQUFBTDtJQUtEQSxzQkFBV0EsZ0NBQVlBO1FBSHZCQTs7V0FFR0E7YUFDSEE7WUFFQ00sTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0E7UUFDM0JBLENBQUNBOzs7T0FBQU47SUFZREEsc0JBQVdBLDZCQUFTQTtRQVZwQkE7Ozs7Ozs7OztXQVNHQTthQUNIQTtZQUVDTyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQTtRQUN6QkEsQ0FBQ0E7YUFFRFAsVUFBcUJBLEtBQVlBO1lBRWhDTyxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxJQUFJQSxLQUFLQSxDQUFDQTtnQkFDN0JBLE1BQU1BLENBQUNBO1lBRVJBLElBQUlBLENBQUNBLFdBQVdBLEdBQUdBLEtBQUtBLENBQUNBO1lBRXpCQSxJQUFJQSxDQUFDQSx3QkFBd0JBLEVBQUVBLENBQUNBO1FBQ2pDQSxDQUFDQTs7O09BVkFQO0lBWU1BLHlDQUF3QkEsR0FBL0JBO1FBRUNRLElBQUlBLEdBQUdBLEdBQVVBLElBQUlBLENBQUNBLGNBQWNBLENBQUNBLE1BQU1BLENBQUNBO1FBQzVDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFVQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxHQUFHQSxFQUFFQSxDQUFDQSxFQUFFQTtZQUNsQ0EsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0Esc0JBQXNCQSxFQUFFQSxDQUFDQTtJQUNsREEsQ0FBQ0E7SUFFRFI7Ozs7T0FJR0E7SUFDSUEsdUNBQXNCQSxHQUE3QkE7UUFFQ1MsSUFBSUEsR0FBR0EsR0FBVUEsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsTUFBTUEsQ0FBQ0E7UUFDNUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQVVBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLEdBQUdBLEVBQUVBLENBQUNBLEVBQUVBO1lBQ2xDQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxvQkFBb0JBLEVBQUVBLENBQUNBO0lBQ2hEQSxDQUFDQTtJQU9EVCxzQkFBV0EsMkJBQU9BO1FBTGxCQTs7OztXQUlHQTthQUNIQTtZQUVDVSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQTtRQUNyQkEsQ0FBQ0E7OztPQUFBVjtJQUVEQSxzQkFBV0EsNEJBQVFBO2FBQW5CQTtZQUVDVyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQTtRQUN2QkEsQ0FBQ0E7OztPQUFBWDtJQUtEQSxzQkFBV0EsK0JBQVdBO1FBSHRCQTs7V0FFR0E7YUFDSEE7WUFFQ1ksTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0E7UUFDMUJBLENBQUNBO2FBRURaLFVBQXVCQSxLQUFpQkE7WUFFdkNZLElBQUlBLENBQUNBLFlBQVlBLEdBQUdBLEtBQUtBLENBQUNBO1FBQzNCQSxDQUFDQTs7O09BTEFaO0lBVURBLHNCQUFXQSwyQkFBT0E7UUFIbEJBOztVQUVFQTthQUNGQTtZQUVDYSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQTtRQUN0QkEsQ0FBQ0E7YUFFRGIsVUFBbUJBLEtBQXFCQTtZQUV2Q2EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsSUFBSUEsSUFBSUEsQ0FBQ0EsUUFBUUEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsVUFBVUEsSUFBSUEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsVUFBVUEsSUFBSUEsS0FBS0EsQ0FBQ0EsTUFBTUEsSUFBSUEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ3BIQSxJQUFJQSxDQUFDQSx3QkFBd0JBLEVBQUVBLENBQUNBO1lBRWpDQSxJQUFJQSxDQUFDQSxRQUFRQSxHQUFHQSxLQUFLQSxDQUFDQTtRQUN2QkEsQ0FBQ0E7OztPQVJBYjtJQXlCREEsc0JBQVdBLDZCQUFTQTthQUFwQkE7WUFFQ2MsTUFBTUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsTUFBTUEsQ0FBQ0E7UUFDekJBLENBQUNBOzs7T0FBQWQ7SUFFREE7O09BRUdBO0lBQ0lBLGtDQUFpQkEsR0FBeEJBO1FBRUNlLFdBQVdBO0lBQ1pBLENBQUNBO0lBRURmOztPQUVHQTtJQUNJQSwyQ0FBMEJBLEdBQWpDQTtRQUVDZ0IsTUFBTUEsQ0FBQ0EsSUFBSUEsVUFBVUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7SUFDN0JBLENBQUNBO0lBRURoQjs7T0FFR0E7SUFDSUEsNkNBQTRCQSxHQUFuQ0E7UUFFQ2lCLE1BQU1BLENBQXNCQSxJQUFJQSxVQUFVQSxFQUFFQSxDQUFDQTtJQUM5Q0EsQ0FBQ0E7SUFFRGpCOztPQUVHQTtJQUNJQSw4QkFBYUEsR0FBcEJBO1FBRUNrQixJQUFJQSxDQUFDQSxlQUFlQSxHQUFHQSxLQUFLQSxDQUFDQTtJQUM5QkEsQ0FBQ0E7SUFFRGxCLHNCQUFXQSxnQ0FBWUE7YUFBdkJBO1lBRUNtQixNQUFNQSxDQUFDQSxLQUFLQSxFQUFFQSxNQUFNQTtRQUNyQkEsQ0FBQ0EsR0FEYUE7OztPQUNibkI7SUFFREE7OztPQUdHQTtJQUNJQSx3QkFBT0EsR0FBZEE7UUFFQ29CLElBQUlBLENBQVFBLENBQUNBO1FBQ2JBLElBQUlBLEdBQVVBLENBQUNBO1FBRWZBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLGNBQWNBLENBQUNBLE1BQU1BLENBQUNBO1FBQ2pDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxHQUFHQSxFQUFFQSxDQUFDQSxFQUFFQTtZQUN2QkEsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsT0FBT0EsRUFBRUEsQ0FBQ0E7UUFFbENBLElBQUlBLENBQUNBLGNBQWNBLEdBQUdBLElBQUlBLEtBQUtBLEVBQWlCQSxDQUFDQTtRQUVqREEsSUFBSUEsR0FBR0EsR0FBVUEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7UUFDMUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQVVBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLEdBQUdBLEVBQUVBLENBQUNBLEVBQUVBO1lBQ2xDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxPQUFPQSxFQUFFQSxDQUFDQTtRQUVoQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsSUFBSUEsS0FBS0EsRUFBZUEsQ0FBQ0E7SUFDOUNBLENBQUNBO0lBRU1wQixxQ0FBb0JBLEdBQTNCQSxVQUE0QkEsUUFBa0JBO1FBRTdDcUIseURBQXlEQTtJQUMxREEsQ0FBQ0E7SUFFTXJCLG9DQUFtQkEsR0FBMUJBLFVBQTJCQSxRQUFrQkE7SUFHN0NzQixDQUFDQTtJQUVNdEIsa0NBQWlCQSxHQUF4QkEsVUFBeUJBLFlBQTBCQTtRQUVsRHVCLElBQUlBLENBQUNBLGNBQWNBLENBQUNBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBO1FBRXZDQSxNQUFNQSxDQUFDQSxZQUFZQSxDQUFDQTtJQUNyQkEsQ0FBQ0E7SUFFTXZCLHFDQUFvQkEsR0FBM0JBLFVBQTRCQSxZQUEwQkE7UUFFckR3QixJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxPQUFPQSxDQUFDQSxZQUFZQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUV6RUEsTUFBTUEsQ0FBQ0EsWUFBWUEsQ0FBQ0E7SUFDckJBLENBQUNBO0lBRU14QixnQ0FBZUEsR0FBdEJBLFVBQXVCQSxVQUFzQkE7UUFFNUN5QixJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQTtRQUVuQ0EsTUFBTUEsQ0FBQ0EsVUFBVUEsQ0FBQ0E7SUFDbkJBLENBQUNBO0lBR016QixtQ0FBa0JBLEdBQXpCQSxVQUEwQkEsVUFBc0JBO1FBRS9DMEIsSUFBSUEsS0FBS0EsR0FBVUEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0E7UUFFekRBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLE1BQU1BLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO1FBRW5DQSxNQUFNQSxDQUFDQSxVQUFVQSxDQUFDQTtJQUNuQkEsQ0FBQ0E7SUFFRDFCOzs7OztPQUtHQTtJQUNJQSxnQ0FBZUEsR0FBdEJBLFVBQXVCQSxjQUE4QkE7UUFFcEQyQixNQUFNQSxDQUFDQSxjQUFjQSxDQUFDQSxxQkFBcUJBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO0lBQ25EQSxDQUFDQTtJQUNGM0IsYUFBQ0E7QUFBREEsQ0EzVEEsQUEyVENBLEVBM1RvQixhQUFhLEVBMlRqQztBQUVELEFBQWdCLGlCQUFQLE1BQU0sQ0FBQyIsImZpbGUiOiJlbnRpdGllcy9Ta3lib3guanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJvdW5kaW5nVm9sdW1lQmFzZVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ib3VuZHMvQm91bmRpbmdWb2x1bWVCYXNlXCIpO1xuaW1wb3J0IE51bGxCb3VuZHNcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2JvdW5kcy9OdWxsQm91bmRzXCIpO1xuaW1wb3J0IFVWVHJhbnNmb3JtXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1VWVHJhbnNmb3JtXCIpO1xuaW1wb3J0IEFzc2V0VHlwZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9Bc3NldFR5cGVcIik7XG5pbXBvcnQgQ3ViZVRleHR1cmVCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvdGV4dHVyZXMvQ3ViZVRleHR1cmVCYXNlXCIpO1xuXG5pbXBvcnQgSUFuaW1hdGlvblNldFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2FuaW1hdG9ycy9JQW5pbWF0aW9uU2V0XCIpO1xuaW1wb3J0IElBbmltYXRvclx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYW5pbWF0b3JzL0lBbmltYXRvclwiKTtcbmltcG9ydCBEaXNwbGF5T2JqZWN0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9EaXNwbGF5T2JqZWN0XCIpO1xuaW1wb3J0IEJsZW5kTW9kZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9CbGVuZE1vZGVcIik7XG5pbXBvcnQgSVJlbmRlcmFibGVPd25lclx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvSVJlbmRlcmFibGVPd25lclwiKTtcbmltcG9ydCBJUmVuZGVyT2JqZWN0T3duZXJcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9JUmVuZGVyT2JqZWN0T3duZXJcIik7XG5pbXBvcnQgSVJlbmRlcmFibGVcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3Bvb2wvSVJlbmRlcmFibGVcIik7XG5pbXBvcnQgSVJlbmRlcmFibGVQb29sXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcG9vbC9JUmVuZGVyYWJsZVBvb2xcIik7XG5pbXBvcnQgSVJlbmRlck9iamVjdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3Bvb2wvSVJlbmRlck9iamVjdFwiKTtcbmltcG9ydCBTa3lib3hOb2RlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vU2t5Ym94Tm9kZVwiKTtcbmltcG9ydCBJUmVuZGVyZXJcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3JlbmRlci9JUmVuZGVyZXJcIik7XG5pbXBvcnQgSUVudGl0eVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9JRW50aXR5XCIpO1xuaW1wb3J0IExpZ2h0UGlja2VyQmFzZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL21hdGVyaWFscy9saWdodHBpY2tlcnMvTGlnaHRQaWNrZXJCYXNlXCIpO1xuaW1wb3J0IE1hdGVyaWFsQmFzZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvbWF0ZXJpYWxzL01hdGVyaWFsQmFzZVwiKTtcblxuLyoqXG4gKiBBIFNreWJveCBjbGFzcyBpcyB1c2VkIHRvIHJlbmRlciBhIHNreSBpbiB0aGUgc2NlbmUuIEl0J3MgYWx3YXlzIGNvbnNpZGVyZWQgc3RhdGljIGFuZCAnYXQgaW5maW5pdHknLCBhbmQgYXNcbiAqIHN1Y2ggaXQncyBhbHdheXMgY2VudGVyZWQgYXQgdGhlIGNhbWVyYSdzIHBvc2l0aW9uIGFuZCBzaXplZCB0byBleGFjdGx5IGZpdCB3aXRoaW4gdGhlIGNhbWVyYSdzIGZydXN0dW0sIGVuc3VyaW5nXG4gKiB0aGUgc2t5IGJveCBpcyBhbHdheXMgYXMgbGFyZ2UgYXMgcG9zc2libGUgd2l0aG91dCBiZWluZyBjbGlwcGVkLlxuICovXG5jbGFzcyBTa3lib3ggZXh0ZW5kcyBEaXNwbGF5T2JqZWN0IGltcGxlbWVudHMgSUVudGl0eSwgSVJlbmRlcmFibGVPd25lciwgSVJlbmRlck9iamVjdE93bmVyXG57XG5cdHByaXZhdGUgX2N1YmVNYXA6Q3ViZVRleHR1cmVCYXNlO1xuXHRwdWJsaWMgX3BBbHBoYVRocmVzaG9sZDpudW1iZXIgPSAwO1xuXHRwcml2YXRlIF9hbmltYXRpb25TZXQ6SUFuaW1hdGlvblNldDtcblx0cHVibGljIF9wTGlnaHRQaWNrZXI6TGlnaHRQaWNrZXJCYXNlO1xuXHRwdWJsaWMgX3BCbGVuZE1vZGU6c3RyaW5nID0gQmxlbmRNb2RlLk5PUk1BTDtcblx0cHJpdmF0ZSBfcmVuZGVyT2JqZWN0czpBcnJheTxJUmVuZGVyT2JqZWN0PiA9IG5ldyBBcnJheTxJUmVuZGVyT2JqZWN0PigpO1xuXHRwcml2YXRlIF9yZW5kZXJhYmxlczpBcnJheTxJUmVuZGVyYWJsZT4gPSBuZXcgQXJyYXk8SVJlbmRlcmFibGU+KCk7XG5cdHByaXZhdGUgX3V2VHJhbnNmb3JtOlVWVHJhbnNmb3JtO1xuXHRwcml2YXRlIF9vd25lcnM6QXJyYXk8SVJlbmRlcmFibGVPd25lcj47XG5cdHByaXZhdGUgX21pcG1hcDpib29sZWFuID0gZmFsc2U7XG5cdHByaXZhdGUgX3Ntb290aDpib29sZWFuID0gdHJ1ZTtcblx0XG5cdHByaXZhdGUgX21hdGVyaWFsOk1hdGVyaWFsQmFzZTtcblx0cHJpdmF0ZSBfYW5pbWF0b3I6SUFuaW1hdG9yO1xuXG5cdC8qKlxuXHQgKiBUaGUgbWluaW11bSBhbHBoYSB2YWx1ZSBmb3Igd2hpY2ggcGl4ZWxzIHNob3VsZCBiZSBkcmF3bi4gVGhpcyBpcyB1c2VkIGZvciB0cmFuc3BhcmVuY3kgdGhhdCBpcyBlaXRoZXJcblx0ICogaW52aXNpYmxlIG9yIGVudGlyZWx5IG9wYXF1ZSwgb2Z0ZW4gdXNlZCB3aXRoIHRleHR1cmVzIGZvciBmb2xpYWdlLCBldGMuXG5cdCAqIFJlY29tbWVuZGVkIHZhbHVlcyBhcmUgMCB0byBkaXNhYmxlIGFscGhhLCBvciAwLjUgdG8gY3JlYXRlIHNtb290aCBlZGdlcy4gRGVmYXVsdCB2YWx1ZSBpcyAwIChkaXNhYmxlZCkuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGFscGhhVGhyZXNob2xkKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcEFscGhhVGhyZXNob2xkO1xuXHR9XG5cblx0cHVibGljIHNldCBhbHBoYVRocmVzaG9sZCh2YWx1ZTpudW1iZXIpXG5cdHtcblx0XHRpZiAodmFsdWUgPCAwKVxuXHRcdFx0dmFsdWUgPSAwO1xuXHRcdGVsc2UgaWYgKHZhbHVlID4gMSlcblx0XHRcdHZhbHVlID0gMTtcblxuXHRcdGlmICh0aGlzLl9wQWxwaGFUaHJlc2hvbGQgPT0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9wQWxwaGFUaHJlc2hvbGQgPSB2YWx1ZTtcblxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlUHJvcGVydGllcygpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB3aGV0aGVyIG9yIG5vdCBhbnkgdXNlZCB0ZXh0dXJlcyBzaG91bGQgdXNlIG1pcG1hcHBpbmcuIERlZmF1bHRzIHRvIHRydWUuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IG1pcG1hcCgpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9taXBtYXA7XG5cdH1cblxuXHRwdWJsaWMgc2V0IG1pcG1hcCh2YWx1ZTpib29sZWFuKVxuXHR7XG5cdFx0aWYgKHRoaXMuX21pcG1hcCA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX21pcG1hcCA9IHZhbHVlO1xuXG5cdFx0dGhpcy5fcEludmFsaWRhdGVQcm9wZXJ0aWVzKCk7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHdoZXRoZXIgb3Igbm90IGFueSB1c2VkIHRleHR1cmVzIHNob3VsZCB1c2Ugc21vb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGdldCBzbW9vdGgoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fc21vb3RoO1xuXHR9XG5cblx0cHVibGljIHNldCBzbW9vdGgodmFsdWU6Ym9vbGVhbilcblx0e1xuXHRcdGlmICh0aGlzLl9zbW9vdGggPT0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9zbW9vdGggPSB2YWx1ZTtcblxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlUHJvcGVydGllcygpO1xuXHR9XG5cdFxuXHQvKipcblx0ICogVGhlIGxpZ2h0IHBpY2tlciB1c2VkIGJ5IHRoZSBtYXRlcmlhbCB0byBwcm92aWRlIGxpZ2h0cyB0byB0aGUgbWF0ZXJpYWwgaWYgaXQgc3VwcG9ydHMgbGlnaHRpbmcuXG5cdCAqXG5cdCAqIEBzZWUgTGlnaHRQaWNrZXJCYXNlXG5cdCAqIEBzZWUgU3RhdGljTGlnaHRQaWNrZXJcblx0ICovXG5cdHB1YmxpYyBnZXQgbGlnaHRQaWNrZXIoKTpMaWdodFBpY2tlckJhc2Vcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wTGlnaHRQaWNrZXI7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgYW5pbWF0aW9uU2V0KCk6SUFuaW1hdGlvblNldFxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2FuaW1hdGlvblNldDtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgYmxlbmQgbW9kZSB0byB1c2Ugd2hlbiBkcmF3aW5nIHRoaXMgcmVuZGVyYWJsZS4gVGhlIGZvbGxvd2luZyBibGVuZCBtb2RlcyBhcmUgc3VwcG9ydGVkOlxuXHQgKiA8dWw+XG5cdCAqIDxsaT5CbGVuZE1vZGUuTk9STUFMOiBObyBibGVuZGluZywgdW5sZXNzIHRoZSBtYXRlcmlhbCBpbmhlcmVudGx5IG5lZWRzIGl0PC9saT5cblx0ICogPGxpPkJsZW5kTW9kZS5MQVlFUjogRm9yY2UgYmxlbmRpbmcuIFRoaXMgd2lsbCBkcmF3IHRoZSBvYmplY3QgdGhlIHNhbWUgYXMgTk9STUFMLCBidXQgd2l0aG91dCB3cml0aW5nIGRlcHRoIHdyaXRlcy48L2xpPlxuXHQgKiA8bGk+QmxlbmRNb2RlLk1VTFRJUExZPC9saT5cblx0ICogPGxpPkJsZW5kTW9kZS5BREQ8L2xpPlxuXHQgKiA8bGk+QmxlbmRNb2RlLkFMUEhBPC9saT5cblx0ICogPC91bD5cblx0ICovXG5cdHB1YmxpYyBnZXQgYmxlbmRNb2RlKCk6c3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcEJsZW5kTW9kZTtcblx0fVxuXG5cdHB1YmxpYyBzZXQgYmxlbmRNb2RlKHZhbHVlOnN0cmluZylcblx0e1xuXHRcdGlmICh0aGlzLl9wQmxlbmRNb2RlID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fcEJsZW5kTW9kZSA9IHZhbHVlO1xuXG5cdFx0dGhpcy5fcEludmFsaWRhdGVSZW5kZXJPYmplY3QoKTtcblx0fVxuXG5cdHB1YmxpYyBfcEludmFsaWRhdGVSZW5kZXJPYmplY3QoKVxuXHR7XG5cdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9yZW5kZXJPYmplY3RzLmxlbmd0aDtcblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBsZW47IGkrKylcblx0XHRcdHRoaXMuX3JlbmRlck9iamVjdHNbaV0uaW52YWxpZGF0ZVJlbmRlck9iamVjdCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIE1hcmtzIHRoZSBzaGFkZXIgcHJvZ3JhbXMgZm9yIGFsbCBwYXNzZXMgYXMgaW52YWxpZCwgc28gdGhleSB3aWxsIGJlIHJlY29tcGlsZWQgYmVmb3JlIHRoZSBuZXh0IHVzZS5cblx0ICpcblx0ICogQHByaXZhdGVcblx0ICovXG5cdHB1YmxpYyBfcEludmFsaWRhdGVQcm9wZXJ0aWVzKClcblx0e1xuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fcmVuZGVyT2JqZWN0cy5sZW5ndGg7XG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgbGVuOyBpKyspXG5cdFx0XHR0aGlzLl9yZW5kZXJPYmplY3RzW2ldLmludmFsaWRhdGVQcm9wZXJ0aWVzKCk7XG5cdH1cblxuXHQvKipcblx0ICogQSBsaXN0IG9mIHRoZSBJUmVuZGVyYWJsZU93bmVycyB0aGF0IHVzZSB0aGlzIG1hdGVyaWFsXG5cdCAqXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGlPd25lcnMoKTpBcnJheTxJUmVuZGVyYWJsZU93bmVyPlxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX293bmVycztcblx0fVxuXG5cdHB1YmxpYyBnZXQgYW5pbWF0b3IoKTpJQW5pbWF0b3Jcblx0e1xuXHRcdHJldHVybiB0aGlzLl9hbmltYXRvcjtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCB1dlRyYW5zZm9ybSgpOlVWVHJhbnNmb3JtXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fdXZUcmFuc2Zvcm07XG5cdH1cblxuXHRwdWJsaWMgc2V0IHV2VHJhbnNmb3JtKHZhbHVlOlVWVHJhbnNmb3JtKVxuXHR7XG5cdFx0dGhpcy5fdXZUcmFuc2Zvcm0gPSB2YWx1ZTtcblx0fVxuXG5cdC8qKlxuXHQqIFRoZSBjdWJlIHRleHR1cmUgdG8gdXNlIGFzIHRoZSBza3lib3guXG5cdCovXG5cdHB1YmxpYyBnZXQgY3ViZU1hcCgpOkN1YmVUZXh0dXJlQmFzZVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2N1YmVNYXA7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGN1YmVNYXAodmFsdWU6Q3ViZVRleHR1cmVCYXNlKVxuXHR7XG5cdFx0aWYgKHZhbHVlICYmIHRoaXMuX2N1YmVNYXAgJiYgKHZhbHVlLmhhc01pcG1hcHMgIT0gdGhpcy5fY3ViZU1hcC5oYXNNaXBtYXBzIHx8IHZhbHVlLmZvcm1hdCAhPSB0aGlzLl9jdWJlTWFwLmZvcm1hdCkpXG5cdFx0XHR0aGlzLl9wSW52YWxpZGF0ZVJlbmRlck9iamVjdCgpO1xuXG5cdFx0dGhpcy5fY3ViZU1hcCA9IHZhbHVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZSBhIG5ldyBTa3lib3ggb2JqZWN0LlxuXHQgKlxuXHQgKiBAcGFyYW0gbWF0ZXJpYWxcdFRoZSBtYXRlcmlhbCB3aXRoIHdoaWNoIHRvIHJlbmRlciB0aGUgU2t5Ym94LlxuXHQgKi9cblx0Y29uc3RydWN0b3IoY3ViZU1hcDpDdWJlVGV4dHVyZUJhc2UgPSBudWxsKVxuXHR7XG5cdFx0c3VwZXIoKTtcblxuXHRcdHRoaXMuX3BJc0VudGl0eSA9IHRydWU7XG5cdFx0dGhpcy5fb3duZXJzID0gbmV3IEFycmF5PElSZW5kZXJhYmxlT3duZXI+KHRoaXMpO1xuXG5cdFx0dGhpcy5jdWJlTWFwID0gY3ViZU1hcDtcblx0fVxuXG5cdHB1YmxpYyBnZXQgYXNzZXRUeXBlKCk6c3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gQXNzZXRUeXBlLlNLWUJPWDtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcHJvdGVjdGVkXG5cdCAqL1xuXHRwdWJsaWMgcEludmFsaWRhdGVCb3VuZHMoKVxuXHR7XG5cdFx0Ly8gZGVhZCBlbmRcblx0fVxuXG5cdC8qKlxuXHQgKiBAcHJvdGVjdGVkXG5cdCAqL1xuXHRwdWJsaWMgcENyZWF0ZUVudGl0eVBhcnRpdGlvbk5vZGUoKTpTa3lib3hOb2RlXG5cdHtcblx0XHRyZXR1cm4gbmV3IFNreWJveE5vZGUodGhpcyk7XG5cdH1cblxuXHQvKipcblx0ICogQHByb3RlY3RlZFxuXHQgKi9cblx0cHVibGljIHBDcmVhdGVEZWZhdWx0Qm91bmRpbmdWb2x1bWUoKTpCb3VuZGluZ1ZvbHVtZUJhc2Vcblx0e1xuXHRcdHJldHVybiA8Qm91bmRpbmdWb2x1bWVCYXNlPiBuZXcgTnVsbEJvdW5kcygpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwcm90ZWN0ZWRcblx0ICovXG5cdHB1YmxpYyBwVXBkYXRlQm91bmRzKClcblx0e1xuXHRcdHRoaXMuX3BCb3VuZHNJbnZhbGlkID0gZmFsc2U7XG5cdH1cblxuXHRwdWJsaWMgZ2V0IGNhc3RzU2hhZG93cygpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiBmYWxzZTsgLy9UT0RPXG5cdH1cblxuXHQvKipcblx0ICogQ2xlYW5zIHVwIHJlc291cmNlcyBvd25lZCBieSB0aGUgbWF0ZXJpYWwsIGluY2x1ZGluZyBwYXNzZXMuIFRleHR1cmVzIGFyZSBub3Qgb3duZWQgYnkgdGhlIG1hdGVyaWFsIHNpbmNlIHRoZXlcblx0ICogY291bGQgYmUgdXNlZCBieSBvdGhlciBtYXRlcmlhbHMgYW5kIHdpbGwgbm90IGJlIGRpc3Bvc2VkLlxuXHQgKi9cblx0cHVibGljIGRpc3Bvc2UoKVxuXHR7XG5cdFx0dmFyIGk6bnVtYmVyO1xuXHRcdHZhciBsZW46bnVtYmVyO1xuXG5cdFx0bGVuID0gdGhpcy5fcmVuZGVyT2JqZWN0cy5sZW5ndGg7XG5cdFx0Zm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKVxuXHRcdFx0dGhpcy5fcmVuZGVyT2JqZWN0c1tpXS5kaXNwb3NlKCk7XG5cblx0XHR0aGlzLl9yZW5kZXJPYmplY3RzID0gbmV3IEFycmF5PElSZW5kZXJPYmplY3Q+KCk7XG5cblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX3JlbmRlcmFibGVzLmxlbmd0aDtcblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBsZW47IGkrKylcblx0XHRcdHRoaXMuX3JlbmRlcmFibGVzW2ldLmRpc3Bvc2UoKTtcblxuXHRcdHRoaXMuX3JlbmRlcmFibGVzID0gbmV3IEFycmF5PElSZW5kZXJhYmxlPigpO1xuXHR9XG5cblx0cHVibGljIF9pQ29sbGVjdFJlbmRlcmFibGVzKHJlbmRlcmVyOklSZW5kZXJlcilcblx0e1xuXHRcdC8vc2t5Ym94IGRvIG5vdCBnZXQgY29sbGVjdGVkIGluIHRoZSBzdGFuZGFyZCBlbnRpdHkgbGlzdFxuXHR9XG5cblx0cHVibGljIF9pQ29sbGVjdFJlbmRlcmFibGUocmVuZGVyZXI6SVJlbmRlcmVyKVxuXHR7XG5cblx0fVxuXG5cdHB1YmxpYyBfaUFkZFJlbmRlck9iamVjdChyZW5kZXJPYmplY3Q6SVJlbmRlck9iamVjdCk6SVJlbmRlck9iamVjdFxuXHR7XG5cdFx0dGhpcy5fcmVuZGVyT2JqZWN0cy5wdXNoKHJlbmRlck9iamVjdCk7XG5cblx0XHRyZXR1cm4gcmVuZGVyT2JqZWN0O1xuXHR9XG5cblx0cHVibGljIF9pUmVtb3ZlUmVuZGVyT2JqZWN0KHJlbmRlck9iamVjdDpJUmVuZGVyT2JqZWN0KTpJUmVuZGVyT2JqZWN0XG5cdHtcblx0XHR0aGlzLl9yZW5kZXJPYmplY3RzLnNwbGljZSh0aGlzLl9yZW5kZXJPYmplY3RzLmluZGV4T2YocmVuZGVyT2JqZWN0KSwgMSk7XG5cblx0XHRyZXR1cm4gcmVuZGVyT2JqZWN0O1xuXHR9XG5cblx0cHVibGljIF9pQWRkUmVuZGVyYWJsZShyZW5kZXJhYmxlOklSZW5kZXJhYmxlKTpJUmVuZGVyYWJsZVxuXHR7XG5cdFx0dGhpcy5fcmVuZGVyYWJsZXMucHVzaChyZW5kZXJhYmxlKTtcblxuXHRcdHJldHVybiByZW5kZXJhYmxlO1xuXHR9XG5cblxuXHRwdWJsaWMgX2lSZW1vdmVSZW5kZXJhYmxlKHJlbmRlcmFibGU6SVJlbmRlcmFibGUpOklSZW5kZXJhYmxlXG5cdHtcblx0XHR2YXIgaW5kZXg6bnVtYmVyID0gdGhpcy5fcmVuZGVyYWJsZXMuaW5kZXhPZihyZW5kZXJhYmxlKTtcblxuXHRcdHRoaXMuX3JlbmRlcmFibGVzLnNwbGljZShpbmRleCwgMSk7XG5cblx0XHRyZXR1cm4gcmVuZGVyYWJsZTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcGFyYW0gcmVuZGVyZXJcblx0ICpcblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwdWJsaWMgZ2V0UmVuZGVyT2JqZWN0KHJlbmRlcmFibGVQb29sOklSZW5kZXJhYmxlUG9vbClcblx0e1xuXHRcdHJldHVybiByZW5kZXJhYmxlUG9vbC5nZXRTa3lib3hSZW5kZXJPYmplY3QodGhpcyk7XG5cdH1cbn1cblxuZXhwb3J0ID0gU2t5Ym94OyJdfQ==