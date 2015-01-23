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
    return Billboard;
})(DisplayObject);
module.exports = Billboard;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9iaWxsYm9hcmQudHMiXSwibmFtZXMiOlsiQmlsbGJvYXJkIiwiQmlsbGJvYXJkLmNvbnN0cnVjdG9yIiwiQmlsbGJvYXJkLmFuaW1hdG9yIiwiQmlsbGJvYXJkLmFzc2V0VHlwZSIsIkJpbGxib2FyZC5iaWxsYm9hcmRIZWlnaHQiLCJCaWxsYm9hcmQuYmlsbGJvYXJkV2lkdGgiLCJCaWxsYm9hcmQubWF0ZXJpYWwiLCJCaWxsYm9hcmQudXZUcmFuc2Zvcm0iLCJCaWxsYm9hcmQucENyZWF0ZUVudGl0eVBhcnRpdGlvbk5vZGUiLCJCaWxsYm9hcmQucFVwZGF0ZUJvdW5kcyIsIkJpbGxib2FyZC5faVRlc3RDb2xsaXNpb24iLCJCaWxsYm9hcmQub25TaXplQ2hhbmdlZCIsIkJpbGxib2FyZC5faUNvbGxlY3RSZW5kZXJhYmxlcyIsIkJpbGxib2FyZC5faUNvbGxlY3RSZW5kZXJhYmxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFHQSxJQUFPLFNBQVMsV0FBYyxtQ0FBbUMsQ0FBQyxDQUFDO0FBR25FLElBQU8sYUFBYSxXQUFhLHVDQUF1QyxDQUFDLENBQUM7QUFFMUUsSUFBTyxVQUFVLFdBQWMseUNBQXlDLENBQUMsQ0FBQztBQUcxRSxJQUFPLGFBQWEsV0FBYSx5Q0FBeUMsQ0FBQyxDQUFDO0FBRzVFLEFBbUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FGRztJQUVHLFNBQVM7SUFBU0EsVUFBbEJBLFNBQVNBLFVBQXNCQTtJQWdIcENBLFNBaEhLQSxTQUFTQSxDQWdIRkEsUUFBcUJBLEVBQUVBLGFBQTZCQSxFQUFFQSxTQUF5QkE7UUFoSDVGQyxpQkE0TENBO1FBNUVtQ0EsNkJBQTZCQSxHQUE3QkEsc0JBQTZCQTtRQUFFQSx5QkFBeUJBLEdBQXpCQSxpQkFBeUJBO1FBRTFGQSxpQkFBT0EsQ0FBQ0E7UUFFUkEsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsSUFBSUEsQ0FBQ0E7UUFFdkJB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Q2pEQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQTtZQUN2QkEsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsVUFBVUEsRUFBRUEsQ0FBQ0E7UUFFbENBLElBQUlBLENBQUNBLG1CQUFtQkEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0E7SUFDeENBLENBQUNBO0lBRU1aLHVDQUFtQkEsR0FBMUJBLFVBQTJCQSxZQUEwQkE7UUFFcERhLFlBQVlBLENBQUNBLGNBQWNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO0lBQ25DQSxDQUFDQTtJQUNGYixnQkFBQ0E7QUFBREEsQ0E1TEEsQUE0TENBLEVBNUx1QixhQUFhLEVBNExwQztBQUVELEFBQW1CLGlCQUFWLFNBQVMsQ0FBQyIsImZpbGUiOiJlbnRpdGllcy9CaWxsYm9hcmQuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJpdG1hcERhdGFcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9iYXNlL0JpdG1hcERhdGFcIik7XG5pbXBvcnQgTWF0cml4M0RcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vTWF0cml4M0RcIik7XG5pbXBvcnQgVVZUcmFuc2Zvcm1cdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1VWVHJhbnNmb3JtXCIpO1xuaW1wb3J0IEFzc2V0VHlwZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvQXNzZXRUeXBlXCIpO1xuXG5pbXBvcnQgSUFuaW1hdG9yXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYW5pbWF0b3JzL0lBbmltYXRvclwiKTtcbmltcG9ydCBEaXNwbGF5T2JqZWN0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvRGlzcGxheU9iamVjdFwiKTtcbmltcG9ydCBJUmVuZGVyYWJsZU93bmVyXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvSVJlbmRlcmFibGVPd25lclwiKTtcbmltcG9ydCBFbnRpdHlOb2RlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcGFydGl0aW9uL0VudGl0eU5vZGVcIik7XG5pbXBvcnQgSVJlbmRlcmVyUG9vbFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wb29sL0lSZW5kZXJlclBvb2xcIik7XG5pbXBvcnQgSUVudGl0eVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZW50aXRpZXMvSUVudGl0eVwiKTtcbmltcG9ydCBNYXRlcmlhbEV2ZW50XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2V2ZW50cy9NYXRlcmlhbEV2ZW50XCIpO1xuaW1wb3J0IE1hdGVyaWFsQmFzZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL21hdGVyaWFscy9NYXRlcmlhbEJhc2VcIik7XG5cbi8qKlxuICogVGhlIEJpbGxib2FyZCBjbGFzcyByZXByZXNlbnRzIGRpc3BsYXkgb2JqZWN0cyB0aGF0IHJlcHJlc2VudCBiaXRtYXAgaW1hZ2VzLlxuICogVGhlc2UgY2FuIGJlIGltYWdlcyB0aGF0IHlvdSBsb2FkIHdpdGggdGhlIDxjb2RlPmZsYXNoLkFzc2V0czwvY29kZT4gb3JcbiAqIDxjb2RlPmZsYXNoLmRpc3BsYXkuTG9hZGVyPC9jb2RlPiBjbGFzc2VzLCBvciB0aGV5IGNhbiBiZSBpbWFnZXMgdGhhdCB5b3VcbiAqIGNyZWF0ZSB3aXRoIHRoZSA8Y29kZT5CaWxsYm9hcmQoKTwvY29kZT4gY29uc3RydWN0b3IuXG4gKlxuICogPHA+VGhlIDxjb2RlPkJpbGxib2FyZCgpPC9jb2RlPiBjb25zdHJ1Y3RvciBhbGxvd3MgeW91IHRvIGNyZWF0ZSBhIEJpbGxib2FyZFxuICogb2JqZWN0IHRoYXQgY29udGFpbnMgYSByZWZlcmVuY2UgdG8gYSBCaXRtYXBEYXRhIG9iamVjdC4gQWZ0ZXIgeW91IGNyZWF0ZSBhXG4gKiBCaWxsYm9hcmQgb2JqZWN0LCB1c2UgdGhlIDxjb2RlPmFkZENoaWxkKCk8L2NvZGU+IG9yIDxjb2RlPmFkZENoaWxkQXQoKTwvY29kZT5cbiAqIG1ldGhvZCBvZiB0aGUgcGFyZW50IERpc3BsYXlPYmplY3RDb250YWluZXIgaW5zdGFuY2UgdG8gcGxhY2UgdGhlIGJpdG1hcCBvblxuICogdGhlIGRpc3BsYXkgbGlzdC48L3A+XG4gKlxuICogPHA+QSBCaWxsYm9hcmQgb2JqZWN0IGNhbiBzaGFyZSBpdHMgQml0bWFwRGF0YSByZWZlcmVuY2UgYW1vbmcgc2V2ZXJhbCBCaWxsYm9hcmRcbiAqIG9iamVjdHMsIGluZGVwZW5kZW50IG9mIHRyYW5zbGF0aW9uIG9yIHJvdGF0aW9uIHByb3BlcnRpZXMuIEJlY2F1c2UgeW91IGNhblxuICogY3JlYXRlIG11bHRpcGxlIEJpbGxib2FyZCBvYmplY3RzIHRoYXQgcmVmZXJlbmNlIHRoZSBzYW1lIEJpdG1hcERhdGEgb2JqZWN0LFxuICogbXVsdGlwbGUgZGlzcGxheSBvYmplY3RzIGNhbiB1c2UgdGhlIHNhbWUgY29tcGxleCBCaXRtYXBEYXRhIG9iamVjdCB3aXRob3V0XG4gKiBpbmN1cnJpbmcgdGhlIG1lbW9yeSBvdmVyaGVhZCBvZiBhIEJpdG1hcERhdGEgb2JqZWN0IGZvciBlYWNoIGRpc3BsYXlcbiAqIG9iamVjdCBpbnN0YW5jZS48L3A+XG4gKlxuICogPHA+QSBCaXRtYXBEYXRhIG9iamVjdCBjYW4gYmUgZHJhd24gdG8gdGhlIHNjcmVlbiBieSBhIEJpbGxib2FyZCBvYmplY3QgaW4gb25lXG4gKiBvZiB0d28gd2F5czogYnkgdXNpbmcgdGhlIGRlZmF1bHQgaGFyZHdhcmUgcmVuZGVyZXIgd2l0aCBhIHNpbmdsZSBoYXJkd2FyZSBzdXJmYWNlLFxuICogb3IgYnkgdXNpbmcgdGhlIHNsb3dlciBzb2Z0d2FyZSByZW5kZXJlciB3aGVuIDNEIGFjY2VsZXJhdGlvbiBpcyBub3QgYXZhaWxhYmxlLjwvcD5cbiAqXG4gKiA8cD5JZiB5b3Ugd291bGQgcHJlZmVyIHRvIHBlcmZvcm0gYSBiYXRjaCByZW5kZXJpbmcgY29tbWFuZCwgcmF0aGVyIHRoYW4gdXNpbmcgYVxuICogc2luZ2xlIHN1cmZhY2UgZm9yIGVhY2ggQmlsbGJvYXJkIG9iamVjdCwgeW91IGNhbiBhbHNvIGRyYXcgdG8gdGhlIHNjcmVlbiB1c2luZyB0aGVcbiAqIDxjb2RlPmRyYXdUaWxlcygpPC9jb2RlPiBvciA8Y29kZT5kcmF3VHJpYW5nbGVzKCk8L2NvZGU+IG1ldGhvZHMgd2hpY2ggYXJlXG4gKiBhdmFpbGFibGUgdG8gPGNvZGU+Zmxhc2guZGlzcGxheS5UaWxlc2hlZXQ8L2NvZGU+IGFuZCA8Y29kZT5mbGFzaC5kaXNwbGF5LkdyYXBoaWNzXG4gKiBvYmplY3RzLjwvY29kZT48L3A+XG4gKlxuICogPHA+PGI+Tm90ZTo8L2I+IFRoZSBCaWxsYm9hcmQgY2xhc3MgaXMgbm90IGEgc3ViY2xhc3Mgb2YgdGhlIEludGVyYWN0aXZlT2JqZWN0XG4gKiBjbGFzcywgc28gaXQgY2Fubm90IGRpc3BhdGNoIG1vdXNlIGV2ZW50cy4gSG93ZXZlciwgeW91IGNhbiB1c2UgdGhlXG4gKiA8Y29kZT5hZGRFdmVudExpc3RlbmVyKCk8L2NvZGU+IG1ldGhvZCBvZiB0aGUgZGlzcGxheSBvYmplY3QgY29udGFpbmVyIHRoYXRcbiAqIGNvbnRhaW5zIHRoZSBCaWxsYm9hcmQgb2JqZWN0LjwvcD5cbiAqL1xuXG5jbGFzcyBCaWxsYm9hcmQgZXh0ZW5kcyBEaXNwbGF5T2JqZWN0IGltcGxlbWVudHMgSUVudGl0eSwgSVJlbmRlcmFibGVPd25lclxue1xuXHRwcml2YXRlIF9hbmltYXRvcjpJQW5pbWF0b3I7XG5cdHByaXZhdGUgX2JpbGxib2FyZFdpZHRoOm51bWJlcjtcblx0cHJpdmF0ZSBfYmlsbGJvYXJkSGVpZ2h0Om51bWJlcjtcblx0cHJpdmF0ZSBfbWF0ZXJpYWw6TWF0ZXJpYWxCYXNlO1xuXHRwcml2YXRlIF91dlRyYW5zZm9ybTpVVlRyYW5zZm9ybTtcblxuXHRwcml2YXRlIG9uU2l6ZUNoYW5nZWREZWxlZ2F0ZTooZXZlbnQ6TWF0ZXJpYWxFdmVudCkgPT4gdm9pZDtcblxuXHQvKipcblx0ICogRGVmaW5lcyB0aGUgYW5pbWF0b3Igb2YgdGhlIG1lc2guIEFjdCBvbiB0aGUgbWVzaCdzIGdlb21ldHJ5LiBEZWZhdWx0cyB0byBudWxsXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGFuaW1hdG9yKCk6SUFuaW1hdG9yXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fYW5pbWF0b3I7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgYXNzZXRUeXBlKCk6c3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gQXNzZXRUeXBlLkJJTExCT0FSRDtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgQml0bWFwRGF0YSBvYmplY3QgYmVpbmcgcmVmZXJlbmNlZC5cblx0ICovXG5cdHB1YmxpYyBiaXRtYXBEYXRhOkJpdG1hcERhdGE7IC8vVE9ET1xuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBiaWxsYm9hcmRIZWlnaHQoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9iaWxsYm9hcmRIZWlnaHQ7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgYmlsbGJvYXJkV2lkdGgoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9iaWxsYm9hcmRXaWR0aDtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBtYXRlcmlhbCgpOk1hdGVyaWFsQmFzZVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX21hdGVyaWFsO1xuXHR9XG5cblx0cHVibGljIHNldCBtYXRlcmlhbCh2YWx1ZTpNYXRlcmlhbEJhc2UpXG5cdHtcblx0XHRpZiAodmFsdWUgPT0gdGhpcy5fbWF0ZXJpYWwpXG5cdFx0XHRyZXR1cm47XG5cblx0XHRpZiAodGhpcy5fbWF0ZXJpYWwpIHtcblx0XHRcdHRoaXMuX21hdGVyaWFsLmlSZW1vdmVPd25lcih0aGlzKTtcblx0XHRcdHRoaXMuX21hdGVyaWFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoTWF0ZXJpYWxFdmVudC5TSVpFX0NIQU5HRUQsIHRoaXMub25TaXplQ2hhbmdlZERlbGVnYXRlKTtcblx0XHR9XG5cblxuXHRcdHRoaXMuX21hdGVyaWFsID0gdmFsdWU7XG5cblx0XHRpZiAodGhpcy5fbWF0ZXJpYWwpIHtcblx0XHRcdHRoaXMuX21hdGVyaWFsLmlBZGRPd25lcih0aGlzKTtcblx0XHRcdHRoaXMuX21hdGVyaWFsLmFkZEV2ZW50TGlzdGVuZXIoTWF0ZXJpYWxFdmVudC5TSVpFX0NIQU5HRUQsIHRoaXMub25TaXplQ2hhbmdlZERlbGVnYXRlKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQ29udHJvbHMgd2hldGhlciBvciBub3QgdGhlIEJpbGxib2FyZCBvYmplY3QgaXMgc25hcHBlZCB0byB0aGUgbmVhcmVzdCBwaXhlbC5cblx0ICogVGhpcyB2YWx1ZSBpcyBpZ25vcmVkIGluIHRoZSBuYXRpdmUgYW5kIEhUTUw1IHRhcmdldHMuXG5cdCAqIFRoZSBQaXhlbFNuYXBwaW5nIGNsYXNzIGluY2x1ZGVzIHBvc3NpYmxlIHZhbHVlczpcblx0ICogPHVsPlxuXHQgKiAgIDxsaT48Y29kZT5QaXhlbFNuYXBwaW5nLk5FVkVSPC9jb2RlPiAtIE5vIHBpeGVsIHNuYXBwaW5nIG9jY3Vycy48L2xpPlxuXHQgKiAgIDxsaT48Y29kZT5QaXhlbFNuYXBwaW5nLkFMV0FZUzwvY29kZT4gLSBUaGUgaW1hZ2UgaXMgYWx3YXlzIHNuYXBwZWQgdG9cblx0ICogdGhlIG5lYXJlc3QgcGl4ZWwsIGluZGVwZW5kZW50IG9mIHRyYW5zZm9ybWF0aW9uLjwvbGk+XG5cdCAqICAgPGxpPjxjb2RlPlBpeGVsU25hcHBpbmcuQVVUTzwvY29kZT4gLSBUaGUgaW1hZ2UgaXMgc25hcHBlZCB0byB0aGVcblx0ICogbmVhcmVzdCBwaXhlbCBpZiBpdCBpcyBkcmF3biB3aXRoIG5vIHJvdGF0aW9uIG9yIHNrZXcgYW5kIGl0IGlzIGRyYXduIGF0IGFcblx0ICogc2NhbGUgZmFjdG9yIG9mIDk5LjklIHRvIDEwMC4xJS4gSWYgdGhlc2UgY29uZGl0aW9ucyBhcmUgc2F0aXNmaWVkLCB0aGVcblx0ICogYml0bWFwIGltYWdlIGlzIGRyYXduIGF0IDEwMCUgc2NhbGUsIHNuYXBwZWQgdG8gdGhlIG5lYXJlc3QgcGl4ZWwuXG5cdCAqIFdoZW4gdGFyZ2V0aW5nIEZsYXNoIFBsYXllciwgdGhpcyB2YWx1ZSBhbGxvd3MgdGhlIGltYWdlIHRvIGJlIGRyYXduIGFzIGZhc3Rcblx0ICogYXMgcG9zc2libGUgdXNpbmcgdGhlIGludGVybmFsIHZlY3RvciByZW5kZXJlci48L2xpPlxuXHQgKiA8L3VsPlxuXHQgKi9cblx0cHVibGljIHBpeGVsU25hcHBpbmc6c3RyaW5nOyAvL1RPRE9cblxuXHQvKipcblx0ICogQ29udHJvbHMgd2hldGhlciBvciBub3QgdGhlIGJpdG1hcCBpcyBzbW9vdGhlZCB3aGVuIHNjYWxlZC4gSWZcblx0ICogPGNvZGU+dHJ1ZTwvY29kZT4sIHRoZSBiaXRtYXAgaXMgc21vb3RoZWQgd2hlbiBzY2FsZWQuIElmXG5cdCAqIDxjb2RlPmZhbHNlPC9jb2RlPiwgdGhlIGJpdG1hcCBpcyBub3Qgc21vb3RoZWQgd2hlbiBzY2FsZWQuXG5cdCAqL1xuXHRwdWJsaWMgc21vb3RoaW5nOmJvb2xlYW47IC8vVE9ET1xuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCB1dlRyYW5zZm9ybSgpOlVWVHJhbnNmb3JtXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fdXZUcmFuc2Zvcm07XG5cdH1cblxuXHRwdWJsaWMgc2V0IHV2VHJhbnNmb3JtKHZhbHVlOlVWVHJhbnNmb3JtKVxuXHR7XG5cdFx0dGhpcy5fdXZUcmFuc2Zvcm0gPSB2YWx1ZTtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKG1hdGVyaWFsOk1hdGVyaWFsQmFzZSwgcGl4ZWxTbmFwcGluZzpzdHJpbmcgPSBcImF1dG9cIiwgc21vb3RoaW5nOmJvb2xlYW4gPSBmYWxzZSlcblx0e1xuXHRcdHN1cGVyKCk7XG5cblx0XHR0aGlzLl9wSXNFbnRpdHkgPSB0cnVlO1xuXG5cdFx0dGhpcy5vblNpemVDaGFuZ2VkRGVsZWdhdGUgPSAoZXZlbnQ6TWF0ZXJpYWxFdmVudCkgPT4gdGhpcy5vblNpemVDaGFuZ2VkKGV2ZW50KTtcblxuXHRcdHRoaXMubWF0ZXJpYWwgPSBtYXRlcmlhbDtcblxuXHRcdHRoaXMuX2JpbGxib2FyZFdpZHRoID0gbWF0ZXJpYWwud2lkdGg7XG5cdFx0dGhpcy5fYmlsbGJvYXJkSGVpZ2h0ID0gbWF0ZXJpYWwuaGVpZ2h0O1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwcm90ZWN0ZWRcblx0ICovXG5cdHB1YmxpYyBwQ3JlYXRlRW50aXR5UGFydGl0aW9uTm9kZSgpOkVudGl0eU5vZGVcblx0e1xuXHRcdHJldHVybiBuZXcgRW50aXR5Tm9kZSh0aGlzKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcHJvdGVjdGVkXG5cdCAqL1xuXHRwdWJsaWMgcFVwZGF0ZUJvdW5kcygpXG5cdHtcblx0XHR0aGlzLl9wQm91bmRzLmZyb21FeHRyZW1lcygwLCAwLCAwLCB0aGlzLl9iaWxsYm9hcmRXaWR0aCwgdGhpcy5fYmlsbGJvYXJkSGVpZ2h0LCAwKTtcblxuXHRcdHN1cGVyLnBVcGRhdGVCb3VuZHMoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiAvL1RPRE9cblx0ICpcblx0ICogQHBhcmFtIHNob3J0ZXN0Q29sbGlzaW9uRGlzdGFuY2Vcblx0ICogQHBhcmFtIGZpbmRDbG9zZXN0XG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxuXHQgKlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHB1YmxpYyBfaVRlc3RDb2xsaXNpb24oc2hvcnRlc3RDb2xsaXNpb25EaXN0YW5jZTpudW1iZXIsIGZpbmRDbG9zZXN0OmJvb2xlYW4pOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9wUGlja2luZ0NvbGxpZGVyLnRlc3RCaWxsYm9hcmRDb2xsaXNpb24odGhpcywgdGhpcy5fcFBpY2tpbmdDb2xsaXNpb25WTywgc2hvcnRlc3RDb2xsaXNpb25EaXN0YW5jZSk7XG5cdH1cblxuXHQvKipcblx0ICogQHByaXZhdGVcblx0ICovXG5cdHByaXZhdGUgb25TaXplQ2hhbmdlZChldmVudDpNYXRlcmlhbEV2ZW50KVxuXHR7XG5cdFx0dGhpcy5fYmlsbGJvYXJkV2lkdGggPSB0aGlzLl9tYXRlcmlhbC53aWR0aDtcblx0XHR0aGlzLl9iaWxsYm9hcmRIZWlnaHQgPSB0aGlzLl9tYXRlcmlhbC5oZWlnaHQ7XG5cblx0XHR0aGlzLl9wQm91bmRzSW52YWxpZCA9IHRydWU7XG5cblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX3BSZW5kZXJhYmxlcy5sZW5ndGg7XG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgbGVuOyBpKyspXG5cdFx0XHR0aGlzLl9wUmVuZGVyYWJsZXNbaV0uaW52YWxpZGF0ZVZlcnRleERhdGEoXCJ2ZXJ0aWNlc1wiKTsgLy9UT0RPXG5cdH1cblxuXHRwdWJsaWMgX2lDb2xsZWN0UmVuZGVyYWJsZXMocmVuZGVyZXJQb29sOklSZW5kZXJlclBvb2wpXG5cdHtcblx0XHQvLyBTaW5jZSB0aGlzIGdldHRlciBpcyBpbnZva2VkIGV2ZXJ5IGl0ZXJhdGlvbiBvZiB0aGUgcmVuZGVyIGxvb3AsIGFuZFxuXHRcdC8vIHRoZSBwcmVmYWIgY29uc3RydWN0IGNvdWxkIGFmZmVjdCB0aGUgc3ViLW1lc2hlcywgdGhlIHByZWZhYiBpc1xuXHRcdC8vIHZhbGlkYXRlZCBoZXJlIHRvIGdpdmUgaXQgYSBjaGFuY2UgdG8gcmVidWlsZC5cblx0XHRpZiAodGhpcy5faVNvdXJjZVByZWZhYilcblx0XHRcdHRoaXMuX2lTb3VyY2VQcmVmYWIuX2lWYWxpZGF0ZSgpO1xuXG5cdFx0dGhpcy5faUNvbGxlY3RSZW5kZXJhYmxlKHJlbmRlcmVyUG9vbCk7XG5cdH1cblxuXHRwdWJsaWMgX2lDb2xsZWN0UmVuZGVyYWJsZShyZW5kZXJlclBvb2w6SVJlbmRlcmVyUG9vbClcblx0e1xuXHRcdHJlbmRlcmVyUG9vbC5hcHBseUJpbGxib2FyZCh0aGlzKTtcblx0fVxufVxuXG5leHBvcnQgPSBCaWxsYm9hcmQ7Il19