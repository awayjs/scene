var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AssetType = require("awayjs-core/lib/library/AssetType");
var DisplayObject = require("awayjs-display/lib/base/DisplayObject");
var EntityNode = require("awayjs-display/lib/partition/EntityNode");
var MaterialEvent = require("awayjs-display/lib/events/MaterialEvent");
/**
 * The Billboard class represents display objects that represent bitmap images.
 * These can be images that you load with the <code>flash.Assets</code> or
 * <code>flash.display.Loader</code> classes, or they can be images that you
 * create with the <code>Billboard()</code> constructor.
 *
 * <p>The <code>Billboard()</code> constructor allows you to create a Billboard
 * object that contains a reference to a BitmapData object. After you create a
 * Billboard object, use the <code>addChild()</code> or <code>addChildAt()</code>
 * method of the parent DisplayObjectContainer instance to place the bitmap on
 * the display list.</p>
 *
 * <p>A Billboard object can share its BitmapData reference among several Billboard
 * objects, independent of translation or rotation properties. Because you can
 * create multiple Billboard objects that reference the same BitmapData object,
 * multiple display objects can use the same complex BitmapData object without
 * incurring the memory overhead of a BitmapData object for each display
 * object instance.</p>
 *
 * <p>A BitmapData object can be drawn to the screen by a Billboard object in one
 * of two ways: by using the default hardware renderer with a single hardware surface,
 * or by using the slower software renderer when 3D acceleration is not available.</p>
 *
 * <p>If you would prefer to perform a batch rendering command, rather than using a
 * single surface for each Billboard object, you can also draw to the screen using the
 * <code>drawTiles()</code> or <code>drawTriangles()</code> methods which are
 * available to <code>flash.display.Tilesheet</code> and <code>flash.display.Graphics
 * objects.</code></p>
 *
 * <p><b>Note:</b> The Billboard class is not a subclass of the InteractiveObject
 * class, so it cannot dispatch mouse events. However, you can use the
 * <code>addEventListener()</code> method of the display object container that
 * contains the Billboard object.</p>
 */
var Billboard = (function (_super) {
    __extends(Billboard, _super);
    function Billboard(material, pixelSnapping, smoothing) {
        var _this = this;
        if (pixelSnapping === void 0) { pixelSnapping = "auto"; }
        if (smoothing === void 0) { smoothing = false; }
        _super.call(this);
        this._pIsEntity = true;
        this.onSizeChangedDelegate = function (event) { return _this.onSizeChanged(event); };
        this.material = material;
        this._billboardWidth = material.width;
        this._billboardHeight = material.height;
    }
    Object.defineProperty(Billboard.prototype, "animator", {
        /**
         * Defines the animator of the mesh. Act on the mesh's geometry. Defaults to null
         */
        get: function () {
            return this._animator;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Billboard.prototype, "assetType", {
        /**
         *
         */
        get: function () {
            return AssetType.BILLBOARD;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Billboard.prototype, "billboardHeight", {
        /**
         *
         */
        get: function () {
            return this._billboardHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Billboard.prototype, "billboardWidth", {
        /**
         *
         */
        get: function () {
            return this._billboardWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Billboard.prototype, "material", {
        /**
         *
         */
        get: function () {
            return this._material;
        },
        set: function (value) {
            if (value == this._material)
                return;
            if (this._material) {
                this._material.iRemoveOwner(this);
                this._material.removeEventListener(MaterialEvent.SIZE_CHANGED, this.onSizeChangedDelegate);
            }
            this._material = value;
            if (this._material) {
                this._material.iAddOwner(this);
                this._material.addEventListener(MaterialEvent.SIZE_CHANGED, this.onSizeChangedDelegate);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Billboard.prototype, "uvTransform", {
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
    /**
     * @protected
     */
    Billboard.prototype.pCreateEntityPartitionNode = function () {
        return new EntityNode(this);
    };
    /**
     * @protected
     */
    Billboard.prototype.pUpdateBounds = function () {
        this._pBounds.fromExtremes(0, 0, 0, this._billboardWidth, this._billboardHeight, 0);
        _super.prototype.pUpdateBounds.call(this);
    };
    /**
     * //TODO
     *
     * @param shortestCollisionDistance
     * @param findClosest
     * @returns {boolean}
     *
     * @internal
     */
    Billboard.prototype._iTestCollision = function (shortestCollisionDistance, findClosest) {
        return this._pPickingCollider.testBillboardCollision(this, this._pPickingCollisionVO, shortestCollisionDistance);
    };
    /**
     * @private
     */
    Billboard.prototype.onSizeChanged = function (event) {
        this._billboardWidth = this._material.width;
        this._billboardHeight = this._material.height;
        this._pBoundsInvalid = true;
        var len = this._pRenderables.length;
        for (var i = 0; i < len; i++)
            this._pRenderables[i].invalidateVertexData("vertices");
    };
    Billboard.prototype._iCollectRenderables = function (renderer) {
        // Since this getter is invoked every iteration of the render loop, and
        // the prefab construct could affect the sub-meshes, the prefab is
        // validated here to give it a chance to rebuild.
        if (this._iSourcePrefab)
            this._iSourcePrefab._iValidate();
        this._iCollectRenderable(renderer);
    };
    Billboard.prototype._iCollectRenderable = function (renderer) {
        renderer.applyBillboard(this);
    };
    return Billboard;
})(DisplayObject);
module.exports = Billboard;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9iaWxsYm9hcmQudHMiXSwibmFtZXMiOlsiQmlsbGJvYXJkIiwiQmlsbGJvYXJkLmNvbnN0cnVjdG9yIiwiQmlsbGJvYXJkLmFuaW1hdG9yIiwiQmlsbGJvYXJkLmFzc2V0VHlwZSIsIkJpbGxib2FyZC5iaWxsYm9hcmRIZWlnaHQiLCJCaWxsYm9hcmQuYmlsbGJvYXJkV2lkdGgiLCJCaWxsYm9hcmQubWF0ZXJpYWwiLCJCaWxsYm9hcmQudXZUcmFuc2Zvcm0iLCJCaWxsYm9hcmQucENyZWF0ZUVudGl0eVBhcnRpdGlvbk5vZGUiLCJCaWxsYm9hcmQucFVwZGF0ZUJvdW5kcyIsIkJpbGxib2FyZC5faVRlc3RDb2xsaXNpb24iLCJCaWxsYm9hcmQub25TaXplQ2hhbmdlZCIsIkJpbGxib2FyZC5faUNvbGxlY3RSZW5kZXJhYmxlcyIsIkJpbGxib2FyZC5faUNvbGxlY3RSZW5kZXJhYmxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFHQSxJQUFPLFNBQVMsV0FBYyxtQ0FBbUMsQ0FBQyxDQUFDO0FBR25FLElBQU8sYUFBYSxXQUFhLHVDQUF1QyxDQUFDLENBQUM7QUFFMUUsSUFBTyxVQUFVLFdBQWMseUNBQXlDLENBQUMsQ0FBQztBQUcxRSxJQUFPLGFBQWEsV0FBYSx5Q0FBeUMsQ0FBQyxDQUFDO0FBRzVFLEFBbUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FGRztJQUVHLFNBQVM7SUFBU0EsVUFBbEJBLFNBQVNBLFVBQXNCQTtJQWdIcENBLFNBaEhLQSxTQUFTQSxDQWdIRkEsUUFBcUJBLEVBQUVBLGFBQTZCQSxFQUFFQSxTQUF5QkE7UUFoSDVGQyxpQkE0TENBO1FBNUVtQ0EsNkJBQTZCQSxHQUE3QkEsc0JBQTZCQTtRQUFFQSx5QkFBeUJBLEdBQXpCQSxpQkFBeUJBO1FBRTFGQSxpQkFBT0EsQ0FBQ0E7UUFFUkEsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsSUFBSUEsQ0FBQ0E7UUFFdkJBLElBQUlBLENBQUNBLHFCQUFxQkEsR0FBR0EsVUFBQ0EsS0FBbUJBLElBQUtBLE9BQUFBLEtBQUlBLENBQUNBLGFBQWFBLENBQUNBLEtBQUtBLENBQUNBLEVBQXpCQSxDQUF5QkEsQ0FBQ0E7UUFFaEZBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLFFBQVFBLENBQUNBO1FBRXpCQSxJQUFJQSxDQUFDQSxlQUFlQSxHQUFHQSxRQUFRQSxDQUFDQSxLQUFLQSxDQUFDQTtRQUN0Q0EsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxHQUFHQSxRQUFRQSxDQUFDQSxNQUFNQSxDQUFDQTtJQUN6Q0EsQ0FBQ0E7SUEvR0RELHNCQUFXQSwrQkFBUUE7UUFIbkJBOztXQUVHQTthQUNIQTtZQUVDRSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQTtRQUN2QkEsQ0FBQ0E7OztPQUFBRjtJQUtEQSxzQkFBV0EsZ0NBQVNBO1FBSHBCQTs7V0FFR0E7YUFDSEE7WUFFQ0csTUFBTUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsU0FBU0EsQ0FBQ0E7UUFDNUJBLENBQUNBOzs7T0FBQUg7SUFVREEsc0JBQVdBLHNDQUFlQTtRQUgxQkE7O1dBRUdBO2FBQ0hBO1lBRUNJLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLGdCQUFnQkEsQ0FBQ0E7UUFDOUJBLENBQUNBOzs7T0FBQUo7SUFLREEsc0JBQVdBLHFDQUFjQTtRQUh6QkE7O1dBRUdBO2FBQ0hBO1lBRUNLLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLGVBQWVBLENBQUNBO1FBQzdCQSxDQUFDQTs7O09BQUFMO0lBS0RBLHNCQUFXQSwrQkFBUUE7UUFIbkJBOztXQUVHQTthQUNIQTtZQUVDTSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQTtRQUN2QkEsQ0FBQ0E7YUFFRE4sVUFBb0JBLEtBQWtCQTtZQUVyQ00sRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsSUFBSUEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0E7Z0JBQzNCQSxNQUFNQSxDQUFDQTtZQUVSQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDcEJBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLFlBQVlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO2dCQUNsQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxhQUFhQSxDQUFDQSxZQUFZQSxFQUFFQSxJQUFJQSxDQUFDQSxxQkFBcUJBLENBQUNBLENBQUNBO1lBQzVGQSxDQUFDQTtZQUdEQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxLQUFLQSxDQUFDQTtZQUV2QkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3BCQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtnQkFDL0JBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsWUFBWUEsRUFBRUEsSUFBSUEsQ0FBQ0EscUJBQXFCQSxDQUFDQSxDQUFDQTtZQUN6RkEsQ0FBQ0E7UUFDRkEsQ0FBQ0E7OztPQW5CQU47SUFpRERBLHNCQUFXQSxrQ0FBV0E7UUFIdEJBOztXQUVHQTthQUNIQTtZQUVDTyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQTtRQUMxQkEsQ0FBQ0E7YUFFRFAsVUFBdUJBLEtBQWlCQTtZQUV2Q08sSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsS0FBS0EsQ0FBQ0E7UUFDM0JBLENBQUNBOzs7T0FMQVA7SUFxQkRBOztPQUVHQTtJQUNJQSw4Q0FBMEJBLEdBQWpDQTtRQUVDUSxNQUFNQSxDQUFDQSxJQUFJQSxVQUFVQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtJQUM3QkEsQ0FBQ0E7SUFFRFI7O09BRUdBO0lBQ0lBLGlDQUFhQSxHQUFwQkE7UUFFQ1MsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsSUFBSUEsQ0FBQ0EsZUFBZUEsRUFBRUEsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUVwRkEsZ0JBQUtBLENBQUNBLGFBQWFBLFdBQUVBLENBQUNBO0lBQ3ZCQSxDQUFDQTtJQUVEVDs7Ozs7Ozs7T0FRR0E7SUFDSUEsbUNBQWVBLEdBQXRCQSxVQUF1QkEseUJBQWdDQSxFQUFFQSxXQUFtQkE7UUFFM0VVLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLGlCQUFpQkEsQ0FBQ0Esc0JBQXNCQSxDQUFDQSxJQUFJQSxFQUFFQSxJQUFJQSxDQUFDQSxvQkFBb0JBLEVBQUVBLHlCQUF5QkEsQ0FBQ0EsQ0FBQ0E7SUFDbEhBLENBQUNBO0lBRURWOztPQUVHQTtJQUNLQSxpQ0FBYUEsR0FBckJBLFVBQXNCQSxLQUFtQkE7UUFFeENXLElBQUlBLENBQUNBLGVBQWVBLEdBQUdBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLEtBQUtBLENBQUNBO1FBQzVDQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLEdBQUdBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLE1BQU1BLENBQUNBO1FBRTlDQSxJQUFJQSxDQUFDQSxlQUFlQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUU1QkEsSUFBSUEsR0FBR0EsR0FBVUEsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7UUFDM0NBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQVVBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLEdBQUdBLEVBQUVBLENBQUNBLEVBQUVBO1lBQ2xDQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxvQkFBb0JBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBO0lBQ3pEQSxDQUFDQTtJQUVNWCx3Q0FBb0JBLEdBQTNCQSxVQUE0QkEsUUFBa0JBO1FBRTdDWSxBQUdBQSx1RUFIdUVBO1FBQ3ZFQSxrRUFBa0VBO1FBQ2xFQSxpREFBaURBO1FBQ2pEQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQTtZQUN2QkEsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsVUFBVUEsRUFBRUEsQ0FBQ0E7UUFFbENBLElBQUlBLENBQUNBLG1CQUFtQkEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7SUFDcENBLENBQUNBO0lBRU1aLHVDQUFtQkEsR0FBMUJBLFVBQTJCQSxRQUFrQkE7UUFFNUNhLFFBQVFBLENBQUNBLGNBQWNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO0lBQy9CQSxDQUFDQTtJQUNGYixnQkFBQ0E7QUFBREEsQ0E1TEEsQUE0TENBLEVBNUx1QixhQUFhLEVBNExwQztBQUVELEFBQW1CLGlCQUFWLFNBQVMsQ0FBQyIsImZpbGUiOiJlbnRpdGllcy9CaWxsYm9hcmQuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJpdG1hcERhdGFcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9iYXNlL0JpdG1hcERhdGFcIik7XG5pbXBvcnQgTWF0cml4M0RcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vTWF0cml4M0RcIik7XG5pbXBvcnQgVVZUcmFuc2Zvcm1cdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1VWVHJhbnNmb3JtXCIpO1xuaW1wb3J0IEFzc2V0VHlwZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvQXNzZXRUeXBlXCIpO1xuXG5pbXBvcnQgSUFuaW1hdG9yXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYW5pbWF0b3JzL0lBbmltYXRvclwiKTtcbmltcG9ydCBEaXNwbGF5T2JqZWN0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvRGlzcGxheU9iamVjdFwiKTtcbmltcG9ydCBJUmVuZGVyYWJsZU93bmVyXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvSVJlbmRlcmFibGVPd25lclwiKTtcbmltcG9ydCBFbnRpdHlOb2RlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcGFydGl0aW9uL0VudGl0eU5vZGVcIik7XG5pbXBvcnQgSVJlbmRlcmVyXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcmVuZGVyL0lSZW5kZXJlclwiKTtcbmltcG9ydCBJRW50aXR5XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9JRW50aXR5XCIpO1xuaW1wb3J0IE1hdGVyaWFsRXZlbnRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZXZlbnRzL01hdGVyaWFsRXZlbnRcIik7XG5pbXBvcnQgTWF0ZXJpYWxCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvbWF0ZXJpYWxzL01hdGVyaWFsQmFzZVwiKTtcblxuLyoqXG4gKiBUaGUgQmlsbGJvYXJkIGNsYXNzIHJlcHJlc2VudHMgZGlzcGxheSBvYmplY3RzIHRoYXQgcmVwcmVzZW50IGJpdG1hcCBpbWFnZXMuXG4gKiBUaGVzZSBjYW4gYmUgaW1hZ2VzIHRoYXQgeW91IGxvYWQgd2l0aCB0aGUgPGNvZGU+Zmxhc2guQXNzZXRzPC9jb2RlPiBvclxuICogPGNvZGU+Zmxhc2guZGlzcGxheS5Mb2FkZXI8L2NvZGU+IGNsYXNzZXMsIG9yIHRoZXkgY2FuIGJlIGltYWdlcyB0aGF0IHlvdVxuICogY3JlYXRlIHdpdGggdGhlIDxjb2RlPkJpbGxib2FyZCgpPC9jb2RlPiBjb25zdHJ1Y3Rvci5cbiAqXG4gKiA8cD5UaGUgPGNvZGU+QmlsbGJvYXJkKCk8L2NvZGU+IGNvbnN0cnVjdG9yIGFsbG93cyB5b3UgdG8gY3JlYXRlIGEgQmlsbGJvYXJkXG4gKiBvYmplY3QgdGhhdCBjb250YWlucyBhIHJlZmVyZW5jZSB0byBhIEJpdG1hcERhdGEgb2JqZWN0LiBBZnRlciB5b3UgY3JlYXRlIGFcbiAqIEJpbGxib2FyZCBvYmplY3QsIHVzZSB0aGUgPGNvZGU+YWRkQ2hpbGQoKTwvY29kZT4gb3IgPGNvZGU+YWRkQ2hpbGRBdCgpPC9jb2RlPlxuICogbWV0aG9kIG9mIHRoZSBwYXJlbnQgRGlzcGxheU9iamVjdENvbnRhaW5lciBpbnN0YW5jZSB0byBwbGFjZSB0aGUgYml0bWFwIG9uXG4gKiB0aGUgZGlzcGxheSBsaXN0LjwvcD5cbiAqXG4gKiA8cD5BIEJpbGxib2FyZCBvYmplY3QgY2FuIHNoYXJlIGl0cyBCaXRtYXBEYXRhIHJlZmVyZW5jZSBhbW9uZyBzZXZlcmFsIEJpbGxib2FyZFxuICogb2JqZWN0cywgaW5kZXBlbmRlbnQgb2YgdHJhbnNsYXRpb24gb3Igcm90YXRpb24gcHJvcGVydGllcy4gQmVjYXVzZSB5b3UgY2FuXG4gKiBjcmVhdGUgbXVsdGlwbGUgQmlsbGJvYXJkIG9iamVjdHMgdGhhdCByZWZlcmVuY2UgdGhlIHNhbWUgQml0bWFwRGF0YSBvYmplY3QsXG4gKiBtdWx0aXBsZSBkaXNwbGF5IG9iamVjdHMgY2FuIHVzZSB0aGUgc2FtZSBjb21wbGV4IEJpdG1hcERhdGEgb2JqZWN0IHdpdGhvdXRcbiAqIGluY3VycmluZyB0aGUgbWVtb3J5IG92ZXJoZWFkIG9mIGEgQml0bWFwRGF0YSBvYmplY3QgZm9yIGVhY2ggZGlzcGxheVxuICogb2JqZWN0IGluc3RhbmNlLjwvcD5cbiAqXG4gKiA8cD5BIEJpdG1hcERhdGEgb2JqZWN0IGNhbiBiZSBkcmF3biB0byB0aGUgc2NyZWVuIGJ5IGEgQmlsbGJvYXJkIG9iamVjdCBpbiBvbmVcbiAqIG9mIHR3byB3YXlzOiBieSB1c2luZyB0aGUgZGVmYXVsdCBoYXJkd2FyZSByZW5kZXJlciB3aXRoIGEgc2luZ2xlIGhhcmR3YXJlIHN1cmZhY2UsXG4gKiBvciBieSB1c2luZyB0aGUgc2xvd2VyIHNvZnR3YXJlIHJlbmRlcmVyIHdoZW4gM0QgYWNjZWxlcmF0aW9uIGlzIG5vdCBhdmFpbGFibGUuPC9wPlxuICpcbiAqIDxwPklmIHlvdSB3b3VsZCBwcmVmZXIgdG8gcGVyZm9ybSBhIGJhdGNoIHJlbmRlcmluZyBjb21tYW5kLCByYXRoZXIgdGhhbiB1c2luZyBhXG4gKiBzaW5nbGUgc3VyZmFjZSBmb3IgZWFjaCBCaWxsYm9hcmQgb2JqZWN0LCB5b3UgY2FuIGFsc28gZHJhdyB0byB0aGUgc2NyZWVuIHVzaW5nIHRoZVxuICogPGNvZGU+ZHJhd1RpbGVzKCk8L2NvZGU+IG9yIDxjb2RlPmRyYXdUcmlhbmdsZXMoKTwvY29kZT4gbWV0aG9kcyB3aGljaCBhcmVcbiAqIGF2YWlsYWJsZSB0byA8Y29kZT5mbGFzaC5kaXNwbGF5LlRpbGVzaGVldDwvY29kZT4gYW5kIDxjb2RlPmZsYXNoLmRpc3BsYXkuR3JhcGhpY3NcbiAqIG9iamVjdHMuPC9jb2RlPjwvcD5cbiAqXG4gKiA8cD48Yj5Ob3RlOjwvYj4gVGhlIEJpbGxib2FyZCBjbGFzcyBpcyBub3QgYSBzdWJjbGFzcyBvZiB0aGUgSW50ZXJhY3RpdmVPYmplY3RcbiAqIGNsYXNzLCBzbyBpdCBjYW5ub3QgZGlzcGF0Y2ggbW91c2UgZXZlbnRzLiBIb3dldmVyLCB5b3UgY2FuIHVzZSB0aGVcbiAqIDxjb2RlPmFkZEV2ZW50TGlzdGVuZXIoKTwvY29kZT4gbWV0aG9kIG9mIHRoZSBkaXNwbGF5IG9iamVjdCBjb250YWluZXIgdGhhdFxuICogY29udGFpbnMgdGhlIEJpbGxib2FyZCBvYmplY3QuPC9wPlxuICovXG5cbmNsYXNzIEJpbGxib2FyZCBleHRlbmRzIERpc3BsYXlPYmplY3QgaW1wbGVtZW50cyBJRW50aXR5LCBJUmVuZGVyYWJsZU93bmVyXG57XG5cdHByaXZhdGUgX2FuaW1hdG9yOklBbmltYXRvcjtcblx0cHJpdmF0ZSBfYmlsbGJvYXJkV2lkdGg6bnVtYmVyO1xuXHRwcml2YXRlIF9iaWxsYm9hcmRIZWlnaHQ6bnVtYmVyO1xuXHRwcml2YXRlIF9tYXRlcmlhbDpNYXRlcmlhbEJhc2U7XG5cdHByaXZhdGUgX3V2VHJhbnNmb3JtOlVWVHJhbnNmb3JtO1xuXG5cdHByaXZhdGUgb25TaXplQ2hhbmdlZERlbGVnYXRlOihldmVudDpNYXRlcmlhbEV2ZW50KSA9PiB2b2lkO1xuXG5cdC8qKlxuXHQgKiBEZWZpbmVzIHRoZSBhbmltYXRvciBvZiB0aGUgbWVzaC4gQWN0IG9uIHRoZSBtZXNoJ3MgZ2VvbWV0cnkuIERlZmF1bHRzIHRvIG51bGxcblx0ICovXG5cdHB1YmxpYyBnZXQgYW5pbWF0b3IoKTpJQW5pbWF0b3Jcblx0e1xuXHRcdHJldHVybiB0aGlzLl9hbmltYXRvcjtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBhc3NldFR5cGUoKTpzdHJpbmdcblx0e1xuXHRcdHJldHVybiBBc3NldFR5cGUuQklMTEJPQVJEO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBCaXRtYXBEYXRhIG9iamVjdCBiZWluZyByZWZlcmVuY2VkLlxuXHQgKi9cblx0cHVibGljIGJpdG1hcERhdGE6Qml0bWFwRGF0YTsgLy9UT0RPXG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGJpbGxib2FyZEhlaWdodCgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2JpbGxib2FyZEhlaWdodDtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBiaWxsYm9hcmRXaWR0aCgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2JpbGxib2FyZFdpZHRoO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IG1hdGVyaWFsKCk6TWF0ZXJpYWxCYXNlXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fbWF0ZXJpYWw7XG5cdH1cblxuXHRwdWJsaWMgc2V0IG1hdGVyaWFsKHZhbHVlOk1hdGVyaWFsQmFzZSlcblx0e1xuXHRcdGlmICh2YWx1ZSA9PSB0aGlzLl9tYXRlcmlhbClcblx0XHRcdHJldHVybjtcblxuXHRcdGlmICh0aGlzLl9tYXRlcmlhbCkge1xuXHRcdFx0dGhpcy5fbWF0ZXJpYWwuaVJlbW92ZU93bmVyKHRoaXMpO1xuXHRcdFx0dGhpcy5fbWF0ZXJpYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihNYXRlcmlhbEV2ZW50LlNJWkVfQ0hBTkdFRCwgdGhpcy5vblNpemVDaGFuZ2VkRGVsZWdhdGUpO1xuXHRcdH1cblxuXG5cdFx0dGhpcy5fbWF0ZXJpYWwgPSB2YWx1ZTtcblxuXHRcdGlmICh0aGlzLl9tYXRlcmlhbCkge1xuXHRcdFx0dGhpcy5fbWF0ZXJpYWwuaUFkZE93bmVyKHRoaXMpO1xuXHRcdFx0dGhpcy5fbWF0ZXJpYWwuYWRkRXZlbnRMaXN0ZW5lcihNYXRlcmlhbEV2ZW50LlNJWkVfQ0hBTkdFRCwgdGhpcy5vblNpemVDaGFuZ2VkRGVsZWdhdGUpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDb250cm9scyB3aGV0aGVyIG9yIG5vdCB0aGUgQmlsbGJvYXJkIG9iamVjdCBpcyBzbmFwcGVkIHRvIHRoZSBuZWFyZXN0IHBpeGVsLlxuXHQgKiBUaGlzIHZhbHVlIGlzIGlnbm9yZWQgaW4gdGhlIG5hdGl2ZSBhbmQgSFRNTDUgdGFyZ2V0cy5cblx0ICogVGhlIFBpeGVsU25hcHBpbmcgY2xhc3MgaW5jbHVkZXMgcG9zc2libGUgdmFsdWVzOlxuXHQgKiA8dWw+XG5cdCAqICAgPGxpPjxjb2RlPlBpeGVsU25hcHBpbmcuTkVWRVI8L2NvZGU+IC0gTm8gcGl4ZWwgc25hcHBpbmcgb2NjdXJzLjwvbGk+XG5cdCAqICAgPGxpPjxjb2RlPlBpeGVsU25hcHBpbmcuQUxXQVlTPC9jb2RlPiAtIFRoZSBpbWFnZSBpcyBhbHdheXMgc25hcHBlZCB0b1xuXHQgKiB0aGUgbmVhcmVzdCBwaXhlbCwgaW5kZXBlbmRlbnQgb2YgdHJhbnNmb3JtYXRpb24uPC9saT5cblx0ICogICA8bGk+PGNvZGU+UGl4ZWxTbmFwcGluZy5BVVRPPC9jb2RlPiAtIFRoZSBpbWFnZSBpcyBzbmFwcGVkIHRvIHRoZVxuXHQgKiBuZWFyZXN0IHBpeGVsIGlmIGl0IGlzIGRyYXduIHdpdGggbm8gcm90YXRpb24gb3Igc2tldyBhbmQgaXQgaXMgZHJhd24gYXQgYVxuXHQgKiBzY2FsZSBmYWN0b3Igb2YgOTkuOSUgdG8gMTAwLjElLiBJZiB0aGVzZSBjb25kaXRpb25zIGFyZSBzYXRpc2ZpZWQsIHRoZVxuXHQgKiBiaXRtYXAgaW1hZ2UgaXMgZHJhd24gYXQgMTAwJSBzY2FsZSwgc25hcHBlZCB0byB0aGUgbmVhcmVzdCBwaXhlbC5cblx0ICogV2hlbiB0YXJnZXRpbmcgRmxhc2ggUGxheWVyLCB0aGlzIHZhbHVlIGFsbG93cyB0aGUgaW1hZ2UgdG8gYmUgZHJhd24gYXMgZmFzdFxuXHQgKiBhcyBwb3NzaWJsZSB1c2luZyB0aGUgaW50ZXJuYWwgdmVjdG9yIHJlbmRlcmVyLjwvbGk+XG5cdCAqIDwvdWw+XG5cdCAqL1xuXHRwdWJsaWMgcGl4ZWxTbmFwcGluZzpzdHJpbmc7IC8vVE9ET1xuXG5cdC8qKlxuXHQgKiBDb250cm9scyB3aGV0aGVyIG9yIG5vdCB0aGUgYml0bWFwIGlzIHNtb290aGVkIHdoZW4gc2NhbGVkLiBJZlxuXHQgKiA8Y29kZT50cnVlPC9jb2RlPiwgdGhlIGJpdG1hcCBpcyBzbW9vdGhlZCB3aGVuIHNjYWxlZC4gSWZcblx0ICogPGNvZGU+ZmFsc2U8L2NvZGU+LCB0aGUgYml0bWFwIGlzIG5vdCBzbW9vdGhlZCB3aGVuIHNjYWxlZC5cblx0ICovXG5cdHB1YmxpYyBzbW9vdGhpbmc6Ym9vbGVhbjsgLy9UT0RPXG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHV2VHJhbnNmb3JtKCk6VVZUcmFuc2Zvcm1cblx0e1xuXHRcdHJldHVybiB0aGlzLl91dlRyYW5zZm9ybTtcblx0fVxuXG5cdHB1YmxpYyBzZXQgdXZUcmFuc2Zvcm0odmFsdWU6VVZUcmFuc2Zvcm0pXG5cdHtcblx0XHR0aGlzLl91dlRyYW5zZm9ybSA9IHZhbHVlO1xuXHR9XG5cblx0Y29uc3RydWN0b3IobWF0ZXJpYWw6TWF0ZXJpYWxCYXNlLCBwaXhlbFNuYXBwaW5nOnN0cmluZyA9IFwiYXV0b1wiLCBzbW9vdGhpbmc6Ym9vbGVhbiA9IGZhbHNlKVxuXHR7XG5cdFx0c3VwZXIoKTtcblxuXHRcdHRoaXMuX3BJc0VudGl0eSA9IHRydWU7XG5cblx0XHR0aGlzLm9uU2l6ZUNoYW5nZWREZWxlZ2F0ZSA9IChldmVudDpNYXRlcmlhbEV2ZW50KSA9PiB0aGlzLm9uU2l6ZUNoYW5nZWQoZXZlbnQpO1xuXG5cdFx0dGhpcy5tYXRlcmlhbCA9IG1hdGVyaWFsO1xuXG5cdFx0dGhpcy5fYmlsbGJvYXJkV2lkdGggPSBtYXRlcmlhbC53aWR0aDtcblx0XHR0aGlzLl9iaWxsYm9hcmRIZWlnaHQgPSBtYXRlcmlhbC5oZWlnaHQ7XG5cdH1cblxuXHQvKipcblx0ICogQHByb3RlY3RlZFxuXHQgKi9cblx0cHVibGljIHBDcmVhdGVFbnRpdHlQYXJ0aXRpb25Ob2RlKCk6RW50aXR5Tm9kZVxuXHR7XG5cdFx0cmV0dXJuIG5ldyBFbnRpdHlOb2RlKHRoaXMpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwcm90ZWN0ZWRcblx0ICovXG5cdHB1YmxpYyBwVXBkYXRlQm91bmRzKClcblx0e1xuXHRcdHRoaXMuX3BCb3VuZHMuZnJvbUV4dHJlbWVzKDAsIDAsIDAsIHRoaXMuX2JpbGxib2FyZFdpZHRoLCB0aGlzLl9iaWxsYm9hcmRIZWlnaHQsIDApO1xuXG5cdFx0c3VwZXIucFVwZGF0ZUJvdW5kcygpO1xuXHR9XG5cblx0LyoqXG5cdCAqIC8vVE9ET1xuXHQgKlxuXHQgKiBAcGFyYW0gc2hvcnRlc3RDb2xsaXNpb25EaXN0YW5jZVxuXHQgKiBAcGFyYW0gZmluZENsb3Nlc3Rcblx0ICogQHJldHVybnMge2Jvb2xlYW59XG5cdCAqXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHVibGljIF9pVGVzdENvbGxpc2lvbihzaG9ydGVzdENvbGxpc2lvbkRpc3RhbmNlOm51bWJlciwgZmluZENsb3Nlc3Q6Ym9vbGVhbik6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BQaWNraW5nQ29sbGlkZXIudGVzdEJpbGxib2FyZENvbGxpc2lvbih0aGlzLCB0aGlzLl9wUGlja2luZ0NvbGxpc2lvblZPLCBzaG9ydGVzdENvbGxpc2lvbkRpc3RhbmNlKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0cHJpdmF0ZSBvblNpemVDaGFuZ2VkKGV2ZW50Ok1hdGVyaWFsRXZlbnQpXG5cdHtcblx0XHR0aGlzLl9iaWxsYm9hcmRXaWR0aCA9IHRoaXMuX21hdGVyaWFsLndpZHRoO1xuXHRcdHRoaXMuX2JpbGxib2FyZEhlaWdodCA9IHRoaXMuX21hdGVyaWFsLmhlaWdodDtcblxuXHRcdHRoaXMuX3BCb3VuZHNJbnZhbGlkID0gdHJ1ZTtcblxuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fcFJlbmRlcmFibGVzLmxlbmd0aDtcblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBsZW47IGkrKylcblx0XHRcdHRoaXMuX3BSZW5kZXJhYmxlc1tpXS5pbnZhbGlkYXRlVmVydGV4RGF0YShcInZlcnRpY2VzXCIpOyAvL1RPRE9cblx0fVxuXG5cdHB1YmxpYyBfaUNvbGxlY3RSZW5kZXJhYmxlcyhyZW5kZXJlcjpJUmVuZGVyZXIpXG5cdHtcblx0XHQvLyBTaW5jZSB0aGlzIGdldHRlciBpcyBpbnZva2VkIGV2ZXJ5IGl0ZXJhdGlvbiBvZiB0aGUgcmVuZGVyIGxvb3AsIGFuZFxuXHRcdC8vIHRoZSBwcmVmYWIgY29uc3RydWN0IGNvdWxkIGFmZmVjdCB0aGUgc3ViLW1lc2hlcywgdGhlIHByZWZhYiBpc1xuXHRcdC8vIHZhbGlkYXRlZCBoZXJlIHRvIGdpdmUgaXQgYSBjaGFuY2UgdG8gcmVidWlsZC5cblx0XHRpZiAodGhpcy5faVNvdXJjZVByZWZhYilcblx0XHRcdHRoaXMuX2lTb3VyY2VQcmVmYWIuX2lWYWxpZGF0ZSgpO1xuXG5cdFx0dGhpcy5faUNvbGxlY3RSZW5kZXJhYmxlKHJlbmRlcmVyKTtcblx0fVxuXG5cdHB1YmxpYyBfaUNvbGxlY3RSZW5kZXJhYmxlKHJlbmRlcmVyOklSZW5kZXJlcilcblx0e1xuXHRcdHJlbmRlcmVyLmFwcGx5QmlsbGJvYXJkKHRoaXMpO1xuXHR9XG59XG5cbmV4cG9ydCA9IEJpbGxib2FyZDsiXX0=