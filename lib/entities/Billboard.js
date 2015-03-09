var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AssetType = require("awayjs-core/lib/library/AssetType");
var DisplayObject = require("awayjs-display/lib/base/DisplayObject");
var BoundsType = require("awayjs-display/lib/bounds/BoundsType");
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
        //default bounds type
        this._boundsType = BoundsType.AXIS_ALIGNED_BOX;
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
    Billboard.prototype._pUpdateBoxBounds = function () {
        _super.prototype._pUpdateBoxBounds.call(this);
        this._pBoxBounds.width = this._billboardWidth;
        this._pBoxBounds.height = this._billboardHeight;
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
        this._pInvalidateBounds();
        var len = this._pRenderables.length;
        for (var i = 0; i < len; i++)
            this._pRenderables[i].invalidateGeometry();
    };
    Billboard.prototype._iCollectRenderables = function (rendererPool) {
        // Since this getter is invoked every iteration of the render loop, and
        // the prefab construct could affect the sub-meshes, the prefab is
        // validated here to give it a chance to rebuild.
        if (this._iSourcePrefab)
            this._iSourcePrefab._iValidate();
        this._iCollectRenderable(rendererPool);
    };
    Billboard.prototype._iCollectRenderable = function (rendererPool) {
        rendererPool.applyBillboard(this);
    };
    Billboard.prototype._pRegisterEntity = function (partition) {
        partition._iRegisterEntity(this);
    };
    Billboard.prototype._pUnregisterEntity = function (partition) {
        partition._iUnregisterEntity(this);
    };
    return Billboard;
})(DisplayObject);
module.exports = Billboard;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9CaWxsYm9hcmQudHMiXSwibmFtZXMiOlsiQmlsbGJvYXJkIiwiQmlsbGJvYXJkLmNvbnN0cnVjdG9yIiwiQmlsbGJvYXJkLmFuaW1hdG9yIiwiQmlsbGJvYXJkLmFzc2V0VHlwZSIsIkJpbGxib2FyZC5iaWxsYm9hcmRIZWlnaHQiLCJCaWxsYm9hcmQuYmlsbGJvYXJkV2lkdGgiLCJCaWxsYm9hcmQubWF0ZXJpYWwiLCJCaWxsYm9hcmQudXZUcmFuc2Zvcm0iLCJCaWxsYm9hcmQuX3BVcGRhdGVCb3hCb3VuZHMiLCJCaWxsYm9hcmQuX2lUZXN0Q29sbGlzaW9uIiwiQmlsbGJvYXJkLm9uU2l6ZUNoYW5nZWQiLCJCaWxsYm9hcmQuX2lDb2xsZWN0UmVuZGVyYWJsZXMiLCJCaWxsYm9hcmQuX2lDb2xsZWN0UmVuZGVyYWJsZSIsIkJpbGxib2FyZC5fcFJlZ2lzdGVyRW50aXR5IiwiQmlsbGJvYXJkLl9wVW5yZWdpc3RlckVudGl0eSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBR0EsSUFBTyxTQUFTLFdBQWUsbUNBQW1DLENBQUMsQ0FBQztBQUdwRSxJQUFPLGFBQWEsV0FBYyx1Q0FBdUMsQ0FBQyxDQUFDO0FBRTNFLElBQU8sVUFBVSxXQUFlLHNDQUFzQyxDQUFDLENBQUM7QUFLeEUsSUFBTyxhQUFhLFdBQWMseUNBQXlDLENBQUMsQ0FBQztBQUc3RSxBQW1DQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBRkc7SUFFRyxTQUFTO0lBQVNBLFVBQWxCQSxTQUFTQSxVQUFzQkE7SUFnSHBDQSxTQWhIS0EsU0FBU0EsQ0FnSEZBLFFBQXFCQSxFQUFFQSxhQUE2QkEsRUFBRUEsU0FBeUJBO1FBaEg1RkMsaUJBa01DQTtRQWxGbUNBLDZCQUE2QkEsR0FBN0JBLHNCQUE2QkE7UUFBRUEseUJBQXlCQSxHQUF6QkEsaUJBQXlCQTtRQUUxRkEsaUJBQU9BLENBQUNBO1FBRVJBLElBQUlBLENBQUNBLFVBQVVB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LElBQUlBLENBQUNBLGNBQWNBLENBQUNBO1lBQ3ZCQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxVQUFVQSxFQUFFQSxDQUFDQTtRQUVsQ0EsSUFBSUEsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQTtJQUN4Q0EsQ0FBQ0E7SUFFTVgsdUNBQW1CQSxHQUExQkEsVUFBMkJBLFlBQTBCQTtRQUVwRFksWUFBWUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7SUFDbkNBLENBQUNBO0lBRU1aLG9DQUFnQkEsR0FBdkJBLFVBQXdCQSxTQUFtQkE7UUFFMUNhLFNBQVNBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7SUFDbENBLENBQUNBO0lBRU1iLHNDQUFrQkEsR0FBekJBLFVBQTBCQSxTQUFtQkE7UUFFNUNjLFNBQVNBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7SUFDcENBLENBQUNBO0lBQ0ZkLGdCQUFDQTtBQUFEQSxDQWxNQSxBQWtNQ0EsRUFsTXVCLGFBQWEsRUFrTXBDO0FBRUQsQUFBbUIsaUJBQVYsU0FBUyxDQUFDIiwiZmlsZSI6ImVudGl0aWVzL0JpbGxib2FyZC5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQml0bWFwRGF0YVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZGF0YS9CaXRtYXBEYXRhXCIpO1xyXG5pbXBvcnQgTWF0cml4M0RcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9NYXRyaXgzRFwiKTtcclxuaW1wb3J0IFVWVHJhbnNmb3JtXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1VWVHJhbnNmb3JtXCIpO1xyXG5pbXBvcnQgQXNzZXRUeXBlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0Fzc2V0VHlwZVwiKTtcclxuXHJcbmltcG9ydCBJQW5pbWF0b3JcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2FuaW1hdG9ycy9JQW5pbWF0b3JcIik7XHJcbmltcG9ydCBEaXNwbGF5T2JqZWN0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9EaXNwbGF5T2JqZWN0XCIpO1xyXG5pbXBvcnQgSVJlbmRlcmFibGVPd25lclx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvSVJlbmRlcmFibGVPd25lclwiKTtcclxuaW1wb3J0IEJvdW5kc1R5cGVcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2JvdW5kcy9Cb3VuZHNUeXBlXCIpO1xyXG5pbXBvcnQgUGFydGl0aW9uXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vUGFydGl0aW9uXCIpO1xyXG5pbXBvcnQgRW50aXR5Tm9kZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcGFydGl0aW9uL0VudGl0eU5vZGVcIik7XHJcbmltcG9ydCBJUmVuZGVyZXJQb29sXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcG9vbC9JUmVuZGVyZXJQb29sXCIpO1xyXG5pbXBvcnQgSUVudGl0eVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9JRW50aXR5XCIpO1xyXG5pbXBvcnQgTWF0ZXJpYWxFdmVudFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2V2ZW50cy9NYXRlcmlhbEV2ZW50XCIpO1xyXG5pbXBvcnQgTWF0ZXJpYWxCYXNlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9tYXRlcmlhbHMvTWF0ZXJpYWxCYXNlXCIpO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBCaWxsYm9hcmQgY2xhc3MgcmVwcmVzZW50cyBkaXNwbGF5IG9iamVjdHMgdGhhdCByZXByZXNlbnQgYml0bWFwIGltYWdlcy5cclxuICogVGhlc2UgY2FuIGJlIGltYWdlcyB0aGF0IHlvdSBsb2FkIHdpdGggdGhlIDxjb2RlPmZsYXNoLkFzc2V0czwvY29kZT4gb3JcclxuICogPGNvZGU+Zmxhc2guZGlzcGxheS5Mb2FkZXI8L2NvZGU+IGNsYXNzZXMsIG9yIHRoZXkgY2FuIGJlIGltYWdlcyB0aGF0IHlvdVxyXG4gKiBjcmVhdGUgd2l0aCB0aGUgPGNvZGU+QmlsbGJvYXJkKCk8L2NvZGU+IGNvbnN0cnVjdG9yLlxyXG4gKlxyXG4gKiA8cD5UaGUgPGNvZGU+QmlsbGJvYXJkKCk8L2NvZGU+IGNvbnN0cnVjdG9yIGFsbG93cyB5b3UgdG8gY3JlYXRlIGEgQmlsbGJvYXJkXHJcbiAqIG9iamVjdCB0aGF0IGNvbnRhaW5zIGEgcmVmZXJlbmNlIHRvIGEgQml0bWFwRGF0YSBvYmplY3QuIEFmdGVyIHlvdSBjcmVhdGUgYVxyXG4gKiBCaWxsYm9hcmQgb2JqZWN0LCB1c2UgdGhlIDxjb2RlPmFkZENoaWxkKCk8L2NvZGU+IG9yIDxjb2RlPmFkZENoaWxkQXQoKTwvY29kZT5cclxuICogbWV0aG9kIG9mIHRoZSBwYXJlbnQgRGlzcGxheU9iamVjdENvbnRhaW5lciBpbnN0YW5jZSB0byBwbGFjZSB0aGUgYml0bWFwIG9uXHJcbiAqIHRoZSBkaXNwbGF5IGxpc3QuPC9wPlxyXG4gKlxyXG4gKiA8cD5BIEJpbGxib2FyZCBvYmplY3QgY2FuIHNoYXJlIGl0cyBCaXRtYXBEYXRhIHJlZmVyZW5jZSBhbW9uZyBzZXZlcmFsIEJpbGxib2FyZFxyXG4gKiBvYmplY3RzLCBpbmRlcGVuZGVudCBvZiB0cmFuc2xhdGlvbiBvciByb3RhdGlvbiBwcm9wZXJ0aWVzLiBCZWNhdXNlIHlvdSBjYW5cclxuICogY3JlYXRlIG11bHRpcGxlIEJpbGxib2FyZCBvYmplY3RzIHRoYXQgcmVmZXJlbmNlIHRoZSBzYW1lIEJpdG1hcERhdGEgb2JqZWN0LFxyXG4gKiBtdWx0aXBsZSBkaXNwbGF5IG9iamVjdHMgY2FuIHVzZSB0aGUgc2FtZSBjb21wbGV4IEJpdG1hcERhdGEgb2JqZWN0IHdpdGhvdXRcclxuICogaW5jdXJyaW5nIHRoZSBtZW1vcnkgb3ZlcmhlYWQgb2YgYSBCaXRtYXBEYXRhIG9iamVjdCBmb3IgZWFjaCBkaXNwbGF5XHJcbiAqIG9iamVjdCBpbnN0YW5jZS48L3A+XHJcbiAqXHJcbiAqIDxwPkEgQml0bWFwRGF0YSBvYmplY3QgY2FuIGJlIGRyYXduIHRvIHRoZSBzY3JlZW4gYnkgYSBCaWxsYm9hcmQgb2JqZWN0IGluIG9uZVxyXG4gKiBvZiB0d28gd2F5czogYnkgdXNpbmcgdGhlIGRlZmF1bHQgaGFyZHdhcmUgcmVuZGVyZXIgd2l0aCBhIHNpbmdsZSBoYXJkd2FyZSBzdXJmYWNlLFxyXG4gKiBvciBieSB1c2luZyB0aGUgc2xvd2VyIHNvZnR3YXJlIHJlbmRlcmVyIHdoZW4gM0QgYWNjZWxlcmF0aW9uIGlzIG5vdCBhdmFpbGFibGUuPC9wPlxyXG4gKlxyXG4gKiA8cD5JZiB5b3Ugd291bGQgcHJlZmVyIHRvIHBlcmZvcm0gYSBiYXRjaCByZW5kZXJpbmcgY29tbWFuZCwgcmF0aGVyIHRoYW4gdXNpbmcgYVxyXG4gKiBzaW5nbGUgc3VyZmFjZSBmb3IgZWFjaCBCaWxsYm9hcmQgb2JqZWN0LCB5b3UgY2FuIGFsc28gZHJhdyB0byB0aGUgc2NyZWVuIHVzaW5nIHRoZVxyXG4gKiA8Y29kZT5kcmF3VGlsZXMoKTwvY29kZT4gb3IgPGNvZGU+ZHJhd1RyaWFuZ2xlcygpPC9jb2RlPiBtZXRob2RzIHdoaWNoIGFyZVxyXG4gKiBhdmFpbGFibGUgdG8gPGNvZGU+Zmxhc2guZGlzcGxheS5UaWxlc2hlZXQ8L2NvZGU+IGFuZCA8Y29kZT5mbGFzaC5kaXNwbGF5LkdyYXBoaWNzXHJcbiAqIG9iamVjdHMuPC9jb2RlPjwvcD5cclxuICpcclxuICogPHA+PGI+Tm90ZTo8L2I+IFRoZSBCaWxsYm9hcmQgY2xhc3MgaXMgbm90IGEgc3ViY2xhc3Mgb2YgdGhlIEludGVyYWN0aXZlT2JqZWN0XHJcbiAqIGNsYXNzLCBzbyBpdCBjYW5ub3QgZGlzcGF0Y2ggbW91c2UgZXZlbnRzLiBIb3dldmVyLCB5b3UgY2FuIHVzZSB0aGVcclxuICogPGNvZGU+YWRkRXZlbnRMaXN0ZW5lcigpPC9jb2RlPiBtZXRob2Qgb2YgdGhlIGRpc3BsYXkgb2JqZWN0IGNvbnRhaW5lciB0aGF0XHJcbiAqIGNvbnRhaW5zIHRoZSBCaWxsYm9hcmQgb2JqZWN0LjwvcD5cclxuICovXHJcblxyXG5jbGFzcyBCaWxsYm9hcmQgZXh0ZW5kcyBEaXNwbGF5T2JqZWN0IGltcGxlbWVudHMgSUVudGl0eSwgSVJlbmRlcmFibGVPd25lclxyXG57XHJcblx0cHJpdmF0ZSBfYW5pbWF0b3I6SUFuaW1hdG9yO1xyXG5cdHByaXZhdGUgX2JpbGxib2FyZFdpZHRoOm51bWJlcjtcclxuXHRwcml2YXRlIF9iaWxsYm9hcmRIZWlnaHQ6bnVtYmVyO1xyXG5cdHByaXZhdGUgX21hdGVyaWFsOk1hdGVyaWFsQmFzZTtcclxuXHRwcml2YXRlIF91dlRyYW5zZm9ybTpVVlRyYW5zZm9ybTtcclxuXHJcblx0cHJpdmF0ZSBvblNpemVDaGFuZ2VkRGVsZWdhdGU6KGV2ZW50Ok1hdGVyaWFsRXZlbnQpID0+IHZvaWQ7XHJcblxyXG5cdC8qKlxyXG5cdCAqIERlZmluZXMgdGhlIGFuaW1hdG9yIG9mIHRoZSBtZXNoLiBBY3Qgb24gdGhlIG1lc2gncyBnZW9tZXRyeS4gRGVmYXVsdHMgdG8gbnVsbFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgYW5pbWF0b3IoKTpJQW5pbWF0b3JcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fYW5pbWF0b3I7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgYXNzZXRUeXBlKCk6c3RyaW5nXHJcblx0e1xyXG5cdFx0cmV0dXJuIEFzc2V0VHlwZS5CSUxMQk9BUkQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgQml0bWFwRGF0YSBvYmplY3QgYmVpbmcgcmVmZXJlbmNlZC5cclxuXHQgKi9cclxuXHRwdWJsaWMgYml0bWFwRGF0YTpCaXRtYXBEYXRhOyAvL1RPRE9cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGJpbGxib2FyZEhlaWdodCgpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9iaWxsYm9hcmRIZWlnaHQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgYmlsbGJvYXJkV2lkdGgoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fYmlsbGJvYXJkV2lkdGg7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgbWF0ZXJpYWwoKTpNYXRlcmlhbEJhc2VcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fbWF0ZXJpYWw7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IG1hdGVyaWFsKHZhbHVlOk1hdGVyaWFsQmFzZSlcclxuXHR7XHJcblx0XHRpZiAodmFsdWUgPT0gdGhpcy5fbWF0ZXJpYWwpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHRpZiAodGhpcy5fbWF0ZXJpYWwpIHtcclxuXHRcdFx0dGhpcy5fbWF0ZXJpYWwuaVJlbW92ZU93bmVyKHRoaXMpO1xyXG5cdFx0XHR0aGlzLl9tYXRlcmlhbC5yZW1vdmVFdmVudExpc3RlbmVyKE1hdGVyaWFsRXZlbnQuU0laRV9DSEFOR0VELCB0aGlzLm9uU2l6ZUNoYW5nZWREZWxlZ2F0ZSk7XHJcblx0XHR9XHJcblxyXG5cclxuXHRcdHRoaXMuX21hdGVyaWFsID0gdmFsdWU7XHJcblxyXG5cdFx0aWYgKHRoaXMuX21hdGVyaWFsKSB7XHJcblx0XHRcdHRoaXMuX21hdGVyaWFsLmlBZGRPd25lcih0aGlzKTtcclxuXHRcdFx0dGhpcy5fbWF0ZXJpYWwuYWRkRXZlbnRMaXN0ZW5lcihNYXRlcmlhbEV2ZW50LlNJWkVfQ0hBTkdFRCwgdGhpcy5vblNpemVDaGFuZ2VkRGVsZWdhdGUpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ29udHJvbHMgd2hldGhlciBvciBub3QgdGhlIEJpbGxib2FyZCBvYmplY3QgaXMgc25hcHBlZCB0byB0aGUgbmVhcmVzdCBwaXhlbC5cclxuXHQgKiBUaGlzIHZhbHVlIGlzIGlnbm9yZWQgaW4gdGhlIG5hdGl2ZSBhbmQgSFRNTDUgdGFyZ2V0cy5cclxuXHQgKiBUaGUgUGl4ZWxTbmFwcGluZyBjbGFzcyBpbmNsdWRlcyBwb3NzaWJsZSB2YWx1ZXM6XHJcblx0ICogPHVsPlxyXG5cdCAqICAgPGxpPjxjb2RlPlBpeGVsU25hcHBpbmcuTkVWRVI8L2NvZGU+IC0gTm8gcGl4ZWwgc25hcHBpbmcgb2NjdXJzLjwvbGk+XHJcblx0ICogICA8bGk+PGNvZGU+UGl4ZWxTbmFwcGluZy5BTFdBWVM8L2NvZGU+IC0gVGhlIGltYWdlIGlzIGFsd2F5cyBzbmFwcGVkIHRvXHJcblx0ICogdGhlIG5lYXJlc3QgcGl4ZWwsIGluZGVwZW5kZW50IG9mIHRyYW5zZm9ybWF0aW9uLjwvbGk+XHJcblx0ICogICA8bGk+PGNvZGU+UGl4ZWxTbmFwcGluZy5BVVRPPC9jb2RlPiAtIFRoZSBpbWFnZSBpcyBzbmFwcGVkIHRvIHRoZVxyXG5cdCAqIG5lYXJlc3QgcGl4ZWwgaWYgaXQgaXMgZHJhd24gd2l0aCBubyByb3RhdGlvbiBvciBza2V3IGFuZCBpdCBpcyBkcmF3biBhdCBhXHJcblx0ICogc2NhbGUgZmFjdG9yIG9mIDk5LjklIHRvIDEwMC4xJS4gSWYgdGhlc2UgY29uZGl0aW9ucyBhcmUgc2F0aXNmaWVkLCB0aGVcclxuXHQgKiBiaXRtYXAgaW1hZ2UgaXMgZHJhd24gYXQgMTAwJSBzY2FsZSwgc25hcHBlZCB0byB0aGUgbmVhcmVzdCBwaXhlbC5cclxuXHQgKiBXaGVuIHRhcmdldGluZyBGbGFzaCBQbGF5ZXIsIHRoaXMgdmFsdWUgYWxsb3dzIHRoZSBpbWFnZSB0byBiZSBkcmF3biBhcyBmYXN0XHJcblx0ICogYXMgcG9zc2libGUgdXNpbmcgdGhlIGludGVybmFsIHZlY3RvciByZW5kZXJlci48L2xpPlxyXG5cdCAqIDwvdWw+XHJcblx0ICovXHJcblx0cHVibGljIHBpeGVsU25hcHBpbmc6c3RyaW5nOyAvL1RPRE9cclxuXHJcblx0LyoqXHJcblx0ICogQ29udHJvbHMgd2hldGhlciBvciBub3QgdGhlIGJpdG1hcCBpcyBzbW9vdGhlZCB3aGVuIHNjYWxlZC4gSWZcclxuXHQgKiA8Y29kZT50cnVlPC9jb2RlPiwgdGhlIGJpdG1hcCBpcyBzbW9vdGhlZCB3aGVuIHNjYWxlZC4gSWZcclxuXHQgKiA8Y29kZT5mYWxzZTwvY29kZT4sIHRoZSBiaXRtYXAgaXMgbm90IHNtb290aGVkIHdoZW4gc2NhbGVkLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzbW9vdGhpbmc6Ym9vbGVhbjsgLy9UT0RPXHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCB1dlRyYW5zZm9ybSgpOlVWVHJhbnNmb3JtXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3V2VHJhbnNmb3JtO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCB1dlRyYW5zZm9ybSh2YWx1ZTpVVlRyYW5zZm9ybSlcclxuXHR7XHJcblx0XHR0aGlzLl91dlRyYW5zZm9ybSA9IHZhbHVlO1xyXG5cdH1cclxuXHJcblx0Y29uc3RydWN0b3IobWF0ZXJpYWw6TWF0ZXJpYWxCYXNlLCBwaXhlbFNuYXBwaW5nOnN0cmluZyA9IFwiYXV0b1wiLCBzbW9vdGhpbmc6Ym9vbGVhbiA9IGZhbHNlKVxyXG5cdHtcclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0dGhpcy5fcElzRW50aXR5ID0gdHJ1ZTtcclxuXHJcblx0XHR0aGlzLm9uU2l6ZUNoYW5nZWREZWxlZ2F0ZSA9IChldmVudDpNYXRlcmlhbEV2ZW50KSA9PiB0aGlzLm9uU2l6ZUNoYW5nZWQoZXZlbnQpO1xyXG5cclxuXHRcdHRoaXMubWF0ZXJpYWwgPSBtYXRlcmlhbDtcclxuXHJcblx0XHR0aGlzLl9iaWxsYm9hcmRXaWR0aCA9IG1hdGVyaWFsLndpZHRoO1xyXG5cdFx0dGhpcy5fYmlsbGJvYXJkSGVpZ2h0ID0gbWF0ZXJpYWwuaGVpZ2h0O1xyXG5cclxuXHRcdC8vZGVmYXVsdCBib3VuZHMgdHlwZVxyXG5cdFx0dGhpcy5fYm91bmRzVHlwZSA9IEJvdW5kc1R5cGUuQVhJU19BTElHTkVEX0JPWDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwcm90ZWN0ZWRcclxuXHQgKi9cclxuXHRwdWJsaWMgX3BVcGRhdGVCb3hCb3VuZHMoKVxyXG5cdHtcclxuXHRcdHN1cGVyLl9wVXBkYXRlQm94Qm91bmRzKCk7XHJcblxyXG5cdFx0dGhpcy5fcEJveEJvdW5kcy53aWR0aCA9IHRoaXMuX2JpbGxib2FyZFdpZHRoO1xyXG5cdFx0dGhpcy5fcEJveEJvdW5kcy5oZWlnaHQgPSB0aGlzLl9iaWxsYm9hcmRIZWlnaHQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiAvL1RPRE9cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzaG9ydGVzdENvbGxpc2lvbkRpc3RhbmNlXHJcblx0ICogQHBhcmFtIGZpbmRDbG9zZXN0XHJcblx0ICogQHJldHVybnMge2Jvb2xlYW59XHJcblx0ICpcclxuXHQgKiBAaW50ZXJuYWxcclxuXHQgKi9cclxuXHRwdWJsaWMgX2lUZXN0Q29sbGlzaW9uKHNob3J0ZXN0Q29sbGlzaW9uRGlzdGFuY2U6bnVtYmVyLCBmaW5kQ2xvc2VzdDpib29sZWFuKTpib29sZWFuXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BQaWNraW5nQ29sbGlkZXIudGVzdEJpbGxib2FyZENvbGxpc2lvbih0aGlzLCB0aGlzLl9wUGlja2luZ0NvbGxpc2lvblZPLCBzaG9ydGVzdENvbGxpc2lvbkRpc3RhbmNlKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBvblNpemVDaGFuZ2VkKGV2ZW50Ok1hdGVyaWFsRXZlbnQpXHJcblx0e1xyXG5cdFx0dGhpcy5fYmlsbGJvYXJkV2lkdGggPSB0aGlzLl9tYXRlcmlhbC53aWR0aDtcclxuXHRcdHRoaXMuX2JpbGxib2FyZEhlaWdodCA9IHRoaXMuX21hdGVyaWFsLmhlaWdodDtcclxuXHJcblx0XHR0aGlzLl9wSW52YWxpZGF0ZUJvdW5kcygpO1xyXG5cclxuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fcFJlbmRlcmFibGVzLmxlbmd0aDtcclxuXHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IGxlbjsgaSsrKVxyXG5cdFx0XHR0aGlzLl9wUmVuZGVyYWJsZXNbaV0uaW52YWxpZGF0ZUdlb21ldHJ5KCk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgX2lDb2xsZWN0UmVuZGVyYWJsZXMocmVuZGVyZXJQb29sOklSZW5kZXJlclBvb2wpXHJcblx0e1xyXG5cdFx0Ly8gU2luY2UgdGhpcyBnZXR0ZXIgaXMgaW52b2tlZCBldmVyeSBpdGVyYXRpb24gb2YgdGhlIHJlbmRlciBsb29wLCBhbmRcclxuXHRcdC8vIHRoZSBwcmVmYWIgY29uc3RydWN0IGNvdWxkIGFmZmVjdCB0aGUgc3ViLW1lc2hlcywgdGhlIHByZWZhYiBpc1xyXG5cdFx0Ly8gdmFsaWRhdGVkIGhlcmUgdG8gZ2l2ZSBpdCBhIGNoYW5jZSB0byByZWJ1aWxkLlxyXG5cdFx0aWYgKHRoaXMuX2lTb3VyY2VQcmVmYWIpXHJcblx0XHRcdHRoaXMuX2lTb3VyY2VQcmVmYWIuX2lWYWxpZGF0ZSgpO1xyXG5cclxuXHRcdHRoaXMuX2lDb2xsZWN0UmVuZGVyYWJsZShyZW5kZXJlclBvb2wpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIF9pQ29sbGVjdFJlbmRlcmFibGUocmVuZGVyZXJQb29sOklSZW5kZXJlclBvb2wpXHJcblx0e1xyXG5cdFx0cmVuZGVyZXJQb29sLmFwcGx5QmlsbGJvYXJkKHRoaXMpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIF9wUmVnaXN0ZXJFbnRpdHkocGFydGl0aW9uOlBhcnRpdGlvbilcclxuXHR7XHJcblx0XHRwYXJ0aXRpb24uX2lSZWdpc3RlckVudGl0eSh0aGlzKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBfcFVucmVnaXN0ZXJFbnRpdHkocGFydGl0aW9uOlBhcnRpdGlvbilcclxuXHR7XHJcblx0XHRwYXJ0aXRpb24uX2lVbnJlZ2lzdGVyRW50aXR5KHRoaXMpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0ID0gQmlsbGJvYXJkOyJdfQ==