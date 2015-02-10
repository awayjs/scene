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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9iaWxsYm9hcmQudHMiXSwibmFtZXMiOlsiQmlsbGJvYXJkIiwiQmlsbGJvYXJkLmNvbnN0cnVjdG9yIiwiQmlsbGJvYXJkLmFuaW1hdG9yIiwiQmlsbGJvYXJkLmFzc2V0VHlwZSIsIkJpbGxib2FyZC5iaWxsYm9hcmRIZWlnaHQiLCJCaWxsYm9hcmQuYmlsbGJvYXJkV2lkdGgiLCJCaWxsYm9hcmQubWF0ZXJpYWwiLCJCaWxsYm9hcmQudXZUcmFuc2Zvcm0iLCJCaWxsYm9hcmQuX3BVcGRhdGVCb3hCb3VuZHMiLCJCaWxsYm9hcmQuX2lUZXN0Q29sbGlzaW9uIiwiQmlsbGJvYXJkLm9uU2l6ZUNoYW5nZWQiLCJCaWxsYm9hcmQuX2lDb2xsZWN0UmVuZGVyYWJsZXMiLCJCaWxsYm9hcmQuX2lDb2xsZWN0UmVuZGVyYWJsZSIsIkJpbGxib2FyZC5fcFJlZ2lzdGVyRW50aXR5IiwiQmlsbGJvYXJkLl9wVW5yZWdpc3RlckVudGl0eSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBR0EsSUFBTyxTQUFTLFdBQWUsbUNBQW1DLENBQUMsQ0FBQztBQUdwRSxJQUFPLGFBQWEsV0FBYyx1Q0FBdUMsQ0FBQyxDQUFDO0FBRTNFLElBQU8sVUFBVSxXQUFlLHNDQUFzQyxDQUFDLENBQUM7QUFLeEUsSUFBTyxhQUFhLFdBQWMseUNBQXlDLENBQUMsQ0FBQztBQUc3RSxBQW1DQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBRkc7SUFFRyxTQUFTO0lBQVNBLFVBQWxCQSxTQUFTQSxVQUFzQkE7SUFnSHBDQSxTQWhIS0EsU0FBU0EsQ0FnSEZBLFFBQXFCQSxFQUFFQSxhQUE2QkEsRUFBRUEsU0FBeUJBO1FBaEg1RkMsaUJBa01DQTtRQWxGbUNBLDZCQUE2QkEsR0FBN0JBLHNCQUE2QkE7UUFBRUEseUJBQXlCQSxHQUF6QkEsaUJBQXlCQTtRQUUxRkEsaUJBQU9BLENBQUNBO1FBRVJBLElBQUlBLENBQUNBLFVBQVVB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LElBQUlBLENBQUNBLGNBQWNBLENBQUNBO1lBQ3ZCQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxVQUFVQSxFQUFFQSxDQUFDQTtRQUVsQ0EsSUFBSUEsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQTtJQUN4Q0EsQ0FBQ0E7SUFFTVgsdUNBQW1CQSxHQUExQkEsVUFBMkJBLFlBQTBCQTtRQUVwRFksWUFBWUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7SUFDbkNBLENBQUNBO0lBRU1aLG9DQUFnQkEsR0FBdkJBLFVBQXdCQSxTQUFtQkE7UUFFMUNhLFNBQVNBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7SUFDbENBLENBQUNBO0lBRU1iLHNDQUFrQkEsR0FBekJBLFVBQTBCQSxTQUFtQkE7UUFFNUNjLFNBQVNBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7SUFDcENBLENBQUNBO0lBQ0ZkLGdCQUFDQTtBQUFEQSxDQWxNQSxBQWtNQ0EsRUFsTXVCLGFBQWEsRUFrTXBDO0FBRUQsQUFBbUIsaUJBQVYsU0FBUyxDQUFDIiwiZmlsZSI6ImVudGl0aWVzL0JpbGxib2FyZC5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQml0bWFwRGF0YVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvYmFzZS9CaXRtYXBEYXRhXCIpO1xuaW1wb3J0IE1hdHJpeDNEXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vTWF0cml4M0RcIik7XG5pbXBvcnQgVVZUcmFuc2Zvcm1cdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vVVZUcmFuc2Zvcm1cIik7XG5pbXBvcnQgQXNzZXRUeXBlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0Fzc2V0VHlwZVwiKTtcblxuaW1wb3J0IElBbmltYXRvclx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYW5pbWF0b3JzL0lBbmltYXRvclwiKTtcbmltcG9ydCBEaXNwbGF5T2JqZWN0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9EaXNwbGF5T2JqZWN0XCIpO1xuaW1wb3J0IElSZW5kZXJhYmxlT3duZXJcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0lSZW5kZXJhYmxlT3duZXJcIik7XG5pbXBvcnQgQm91bmRzVHlwZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYm91bmRzL0JvdW5kc1R5cGVcIik7XG5pbXBvcnQgUGFydGl0aW9uXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vUGFydGl0aW9uXCIpO1xuaW1wb3J0IEVudGl0eU5vZGVcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3BhcnRpdGlvbi9FbnRpdHlOb2RlXCIpO1xuaW1wb3J0IElSZW5kZXJlclBvb2xcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wb29sL0lSZW5kZXJlclBvb2xcIik7XG5pbXBvcnQgSUVudGl0eVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9JRW50aXR5XCIpO1xuaW1wb3J0IE1hdGVyaWFsRXZlbnRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9ldmVudHMvTWF0ZXJpYWxFdmVudFwiKTtcbmltcG9ydCBNYXRlcmlhbEJhc2VcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL21hdGVyaWFscy9NYXRlcmlhbEJhc2VcIik7XG5cbi8qKlxuICogVGhlIEJpbGxib2FyZCBjbGFzcyByZXByZXNlbnRzIGRpc3BsYXkgb2JqZWN0cyB0aGF0IHJlcHJlc2VudCBiaXRtYXAgaW1hZ2VzLlxuICogVGhlc2UgY2FuIGJlIGltYWdlcyB0aGF0IHlvdSBsb2FkIHdpdGggdGhlIDxjb2RlPmZsYXNoLkFzc2V0czwvY29kZT4gb3JcbiAqIDxjb2RlPmZsYXNoLmRpc3BsYXkuTG9hZGVyPC9jb2RlPiBjbGFzc2VzLCBvciB0aGV5IGNhbiBiZSBpbWFnZXMgdGhhdCB5b3VcbiAqIGNyZWF0ZSB3aXRoIHRoZSA8Y29kZT5CaWxsYm9hcmQoKTwvY29kZT4gY29uc3RydWN0b3IuXG4gKlxuICogPHA+VGhlIDxjb2RlPkJpbGxib2FyZCgpPC9jb2RlPiBjb25zdHJ1Y3RvciBhbGxvd3MgeW91IHRvIGNyZWF0ZSBhIEJpbGxib2FyZFxuICogb2JqZWN0IHRoYXQgY29udGFpbnMgYSByZWZlcmVuY2UgdG8gYSBCaXRtYXBEYXRhIG9iamVjdC4gQWZ0ZXIgeW91IGNyZWF0ZSBhXG4gKiBCaWxsYm9hcmQgb2JqZWN0LCB1c2UgdGhlIDxjb2RlPmFkZENoaWxkKCk8L2NvZGU+IG9yIDxjb2RlPmFkZENoaWxkQXQoKTwvY29kZT5cbiAqIG1ldGhvZCBvZiB0aGUgcGFyZW50IERpc3BsYXlPYmplY3RDb250YWluZXIgaW5zdGFuY2UgdG8gcGxhY2UgdGhlIGJpdG1hcCBvblxuICogdGhlIGRpc3BsYXkgbGlzdC48L3A+XG4gKlxuICogPHA+QSBCaWxsYm9hcmQgb2JqZWN0IGNhbiBzaGFyZSBpdHMgQml0bWFwRGF0YSByZWZlcmVuY2UgYW1vbmcgc2V2ZXJhbCBCaWxsYm9hcmRcbiAqIG9iamVjdHMsIGluZGVwZW5kZW50IG9mIHRyYW5zbGF0aW9uIG9yIHJvdGF0aW9uIHByb3BlcnRpZXMuIEJlY2F1c2UgeW91IGNhblxuICogY3JlYXRlIG11bHRpcGxlIEJpbGxib2FyZCBvYmplY3RzIHRoYXQgcmVmZXJlbmNlIHRoZSBzYW1lIEJpdG1hcERhdGEgb2JqZWN0LFxuICogbXVsdGlwbGUgZGlzcGxheSBvYmplY3RzIGNhbiB1c2UgdGhlIHNhbWUgY29tcGxleCBCaXRtYXBEYXRhIG9iamVjdCB3aXRob3V0XG4gKiBpbmN1cnJpbmcgdGhlIG1lbW9yeSBvdmVyaGVhZCBvZiBhIEJpdG1hcERhdGEgb2JqZWN0IGZvciBlYWNoIGRpc3BsYXlcbiAqIG9iamVjdCBpbnN0YW5jZS48L3A+XG4gKlxuICogPHA+QSBCaXRtYXBEYXRhIG9iamVjdCBjYW4gYmUgZHJhd24gdG8gdGhlIHNjcmVlbiBieSBhIEJpbGxib2FyZCBvYmplY3QgaW4gb25lXG4gKiBvZiB0d28gd2F5czogYnkgdXNpbmcgdGhlIGRlZmF1bHQgaGFyZHdhcmUgcmVuZGVyZXIgd2l0aCBhIHNpbmdsZSBoYXJkd2FyZSBzdXJmYWNlLFxuICogb3IgYnkgdXNpbmcgdGhlIHNsb3dlciBzb2Z0d2FyZSByZW5kZXJlciB3aGVuIDNEIGFjY2VsZXJhdGlvbiBpcyBub3QgYXZhaWxhYmxlLjwvcD5cbiAqXG4gKiA8cD5JZiB5b3Ugd291bGQgcHJlZmVyIHRvIHBlcmZvcm0gYSBiYXRjaCByZW5kZXJpbmcgY29tbWFuZCwgcmF0aGVyIHRoYW4gdXNpbmcgYVxuICogc2luZ2xlIHN1cmZhY2UgZm9yIGVhY2ggQmlsbGJvYXJkIG9iamVjdCwgeW91IGNhbiBhbHNvIGRyYXcgdG8gdGhlIHNjcmVlbiB1c2luZyB0aGVcbiAqIDxjb2RlPmRyYXdUaWxlcygpPC9jb2RlPiBvciA8Y29kZT5kcmF3VHJpYW5nbGVzKCk8L2NvZGU+IG1ldGhvZHMgd2hpY2ggYXJlXG4gKiBhdmFpbGFibGUgdG8gPGNvZGU+Zmxhc2guZGlzcGxheS5UaWxlc2hlZXQ8L2NvZGU+IGFuZCA8Y29kZT5mbGFzaC5kaXNwbGF5LkdyYXBoaWNzXG4gKiBvYmplY3RzLjwvY29kZT48L3A+XG4gKlxuICogPHA+PGI+Tm90ZTo8L2I+IFRoZSBCaWxsYm9hcmQgY2xhc3MgaXMgbm90IGEgc3ViY2xhc3Mgb2YgdGhlIEludGVyYWN0aXZlT2JqZWN0XG4gKiBjbGFzcywgc28gaXQgY2Fubm90IGRpc3BhdGNoIG1vdXNlIGV2ZW50cy4gSG93ZXZlciwgeW91IGNhbiB1c2UgdGhlXG4gKiA8Y29kZT5hZGRFdmVudExpc3RlbmVyKCk8L2NvZGU+IG1ldGhvZCBvZiB0aGUgZGlzcGxheSBvYmplY3QgY29udGFpbmVyIHRoYXRcbiAqIGNvbnRhaW5zIHRoZSBCaWxsYm9hcmQgb2JqZWN0LjwvcD5cbiAqL1xuXG5jbGFzcyBCaWxsYm9hcmQgZXh0ZW5kcyBEaXNwbGF5T2JqZWN0IGltcGxlbWVudHMgSUVudGl0eSwgSVJlbmRlcmFibGVPd25lclxue1xuXHRwcml2YXRlIF9hbmltYXRvcjpJQW5pbWF0b3I7XG5cdHByaXZhdGUgX2JpbGxib2FyZFdpZHRoOm51bWJlcjtcblx0cHJpdmF0ZSBfYmlsbGJvYXJkSGVpZ2h0Om51bWJlcjtcblx0cHJpdmF0ZSBfbWF0ZXJpYWw6TWF0ZXJpYWxCYXNlO1xuXHRwcml2YXRlIF91dlRyYW5zZm9ybTpVVlRyYW5zZm9ybTtcblxuXHRwcml2YXRlIG9uU2l6ZUNoYW5nZWREZWxlZ2F0ZTooZXZlbnQ6TWF0ZXJpYWxFdmVudCkgPT4gdm9pZDtcblxuXHQvKipcblx0ICogRGVmaW5lcyB0aGUgYW5pbWF0b3Igb2YgdGhlIG1lc2guIEFjdCBvbiB0aGUgbWVzaCdzIGdlb21ldHJ5LiBEZWZhdWx0cyB0byBudWxsXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGFuaW1hdG9yKCk6SUFuaW1hdG9yXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fYW5pbWF0b3I7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgYXNzZXRUeXBlKCk6c3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gQXNzZXRUeXBlLkJJTExCT0FSRDtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgQml0bWFwRGF0YSBvYmplY3QgYmVpbmcgcmVmZXJlbmNlZC5cblx0ICovXG5cdHB1YmxpYyBiaXRtYXBEYXRhOkJpdG1hcERhdGE7IC8vVE9ET1xuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBiaWxsYm9hcmRIZWlnaHQoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9iaWxsYm9hcmRIZWlnaHQ7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgYmlsbGJvYXJkV2lkdGgoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9iaWxsYm9hcmRXaWR0aDtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBtYXRlcmlhbCgpOk1hdGVyaWFsQmFzZVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX21hdGVyaWFsO1xuXHR9XG5cblx0cHVibGljIHNldCBtYXRlcmlhbCh2YWx1ZTpNYXRlcmlhbEJhc2UpXG5cdHtcblx0XHRpZiAodmFsdWUgPT0gdGhpcy5fbWF0ZXJpYWwpXG5cdFx0XHRyZXR1cm47XG5cblx0XHRpZiAodGhpcy5fbWF0ZXJpYWwpIHtcblx0XHRcdHRoaXMuX21hdGVyaWFsLmlSZW1vdmVPd25lcih0aGlzKTtcblx0XHRcdHRoaXMuX21hdGVyaWFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoTWF0ZXJpYWxFdmVudC5TSVpFX0NIQU5HRUQsIHRoaXMub25TaXplQ2hhbmdlZERlbGVnYXRlKTtcblx0XHR9XG5cblxuXHRcdHRoaXMuX21hdGVyaWFsID0gdmFsdWU7XG5cblx0XHRpZiAodGhpcy5fbWF0ZXJpYWwpIHtcblx0XHRcdHRoaXMuX21hdGVyaWFsLmlBZGRPd25lcih0aGlzKTtcblx0XHRcdHRoaXMuX21hdGVyaWFsLmFkZEV2ZW50TGlzdGVuZXIoTWF0ZXJpYWxFdmVudC5TSVpFX0NIQU5HRUQsIHRoaXMub25TaXplQ2hhbmdlZERlbGVnYXRlKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQ29udHJvbHMgd2hldGhlciBvciBub3QgdGhlIEJpbGxib2FyZCBvYmplY3QgaXMgc25hcHBlZCB0byB0aGUgbmVhcmVzdCBwaXhlbC5cblx0ICogVGhpcyB2YWx1ZSBpcyBpZ25vcmVkIGluIHRoZSBuYXRpdmUgYW5kIEhUTUw1IHRhcmdldHMuXG5cdCAqIFRoZSBQaXhlbFNuYXBwaW5nIGNsYXNzIGluY2x1ZGVzIHBvc3NpYmxlIHZhbHVlczpcblx0ICogPHVsPlxuXHQgKiAgIDxsaT48Y29kZT5QaXhlbFNuYXBwaW5nLk5FVkVSPC9jb2RlPiAtIE5vIHBpeGVsIHNuYXBwaW5nIG9jY3Vycy48L2xpPlxuXHQgKiAgIDxsaT48Y29kZT5QaXhlbFNuYXBwaW5nLkFMV0FZUzwvY29kZT4gLSBUaGUgaW1hZ2UgaXMgYWx3YXlzIHNuYXBwZWQgdG9cblx0ICogdGhlIG5lYXJlc3QgcGl4ZWwsIGluZGVwZW5kZW50IG9mIHRyYW5zZm9ybWF0aW9uLjwvbGk+XG5cdCAqICAgPGxpPjxjb2RlPlBpeGVsU25hcHBpbmcuQVVUTzwvY29kZT4gLSBUaGUgaW1hZ2UgaXMgc25hcHBlZCB0byB0aGVcblx0ICogbmVhcmVzdCBwaXhlbCBpZiBpdCBpcyBkcmF3biB3aXRoIG5vIHJvdGF0aW9uIG9yIHNrZXcgYW5kIGl0IGlzIGRyYXduIGF0IGFcblx0ICogc2NhbGUgZmFjdG9yIG9mIDk5LjklIHRvIDEwMC4xJS4gSWYgdGhlc2UgY29uZGl0aW9ucyBhcmUgc2F0aXNmaWVkLCB0aGVcblx0ICogYml0bWFwIGltYWdlIGlzIGRyYXduIGF0IDEwMCUgc2NhbGUsIHNuYXBwZWQgdG8gdGhlIG5lYXJlc3QgcGl4ZWwuXG5cdCAqIFdoZW4gdGFyZ2V0aW5nIEZsYXNoIFBsYXllciwgdGhpcyB2YWx1ZSBhbGxvd3MgdGhlIGltYWdlIHRvIGJlIGRyYXduIGFzIGZhc3Rcblx0ICogYXMgcG9zc2libGUgdXNpbmcgdGhlIGludGVybmFsIHZlY3RvciByZW5kZXJlci48L2xpPlxuXHQgKiA8L3VsPlxuXHQgKi9cblx0cHVibGljIHBpeGVsU25hcHBpbmc6c3RyaW5nOyAvL1RPRE9cblxuXHQvKipcblx0ICogQ29udHJvbHMgd2hldGhlciBvciBub3QgdGhlIGJpdG1hcCBpcyBzbW9vdGhlZCB3aGVuIHNjYWxlZC4gSWZcblx0ICogPGNvZGU+dHJ1ZTwvY29kZT4sIHRoZSBiaXRtYXAgaXMgc21vb3RoZWQgd2hlbiBzY2FsZWQuIElmXG5cdCAqIDxjb2RlPmZhbHNlPC9jb2RlPiwgdGhlIGJpdG1hcCBpcyBub3Qgc21vb3RoZWQgd2hlbiBzY2FsZWQuXG5cdCAqL1xuXHRwdWJsaWMgc21vb3RoaW5nOmJvb2xlYW47IC8vVE9ET1xuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCB1dlRyYW5zZm9ybSgpOlVWVHJhbnNmb3JtXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fdXZUcmFuc2Zvcm07XG5cdH1cblxuXHRwdWJsaWMgc2V0IHV2VHJhbnNmb3JtKHZhbHVlOlVWVHJhbnNmb3JtKVxuXHR7XG5cdFx0dGhpcy5fdXZUcmFuc2Zvcm0gPSB2YWx1ZTtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKG1hdGVyaWFsOk1hdGVyaWFsQmFzZSwgcGl4ZWxTbmFwcGluZzpzdHJpbmcgPSBcImF1dG9cIiwgc21vb3RoaW5nOmJvb2xlYW4gPSBmYWxzZSlcblx0e1xuXHRcdHN1cGVyKCk7XG5cblx0XHR0aGlzLl9wSXNFbnRpdHkgPSB0cnVlO1xuXG5cdFx0dGhpcy5vblNpemVDaGFuZ2VkRGVsZWdhdGUgPSAoZXZlbnQ6TWF0ZXJpYWxFdmVudCkgPT4gdGhpcy5vblNpemVDaGFuZ2VkKGV2ZW50KTtcblxuXHRcdHRoaXMubWF0ZXJpYWwgPSBtYXRlcmlhbDtcblxuXHRcdHRoaXMuX2JpbGxib2FyZFdpZHRoID0gbWF0ZXJpYWwud2lkdGg7XG5cdFx0dGhpcy5fYmlsbGJvYXJkSGVpZ2h0ID0gbWF0ZXJpYWwuaGVpZ2h0O1xuXG5cdFx0Ly9kZWZhdWx0IGJvdW5kcyB0eXBlXG5cdFx0dGhpcy5fYm91bmRzVHlwZSA9IEJvdW5kc1R5cGUuQVhJU19BTElHTkVEX0JPWDtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcHJvdGVjdGVkXG5cdCAqL1xuXHRwdWJsaWMgX3BVcGRhdGVCb3hCb3VuZHMoKVxuXHR7XG5cdFx0c3VwZXIuX3BVcGRhdGVCb3hCb3VuZHMoKTtcblxuXHRcdHRoaXMuX3BCb3hCb3VuZHMud2lkdGggPSB0aGlzLl9iaWxsYm9hcmRXaWR0aDtcblx0XHR0aGlzLl9wQm94Qm91bmRzLmhlaWdodCA9IHRoaXMuX2JpbGxib2FyZEhlaWdodDtcblx0fVxuXG5cdC8qKlxuXHQgKiAvL1RPRE9cblx0ICpcblx0ICogQHBhcmFtIHNob3J0ZXN0Q29sbGlzaW9uRGlzdGFuY2Vcblx0ICogQHBhcmFtIGZpbmRDbG9zZXN0XG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxuXHQgKlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHB1YmxpYyBfaVRlc3RDb2xsaXNpb24oc2hvcnRlc3RDb2xsaXNpb25EaXN0YW5jZTpudW1iZXIsIGZpbmRDbG9zZXN0OmJvb2xlYW4pOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9wUGlja2luZ0NvbGxpZGVyLnRlc3RCaWxsYm9hcmRDb2xsaXNpb24odGhpcywgdGhpcy5fcFBpY2tpbmdDb2xsaXNpb25WTywgc2hvcnRlc3RDb2xsaXNpb25EaXN0YW5jZSk7XG5cdH1cblxuXHQvKipcblx0ICogQHByaXZhdGVcblx0ICovXG5cdHByaXZhdGUgb25TaXplQ2hhbmdlZChldmVudDpNYXRlcmlhbEV2ZW50KVxuXHR7XG5cdFx0dGhpcy5fYmlsbGJvYXJkV2lkdGggPSB0aGlzLl9tYXRlcmlhbC53aWR0aDtcblx0XHR0aGlzLl9iaWxsYm9hcmRIZWlnaHQgPSB0aGlzLl9tYXRlcmlhbC5oZWlnaHQ7XG5cblx0XHR0aGlzLl9wSW52YWxpZGF0ZUJvdW5kcygpO1xuXG5cdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9wUmVuZGVyYWJsZXMubGVuZ3RoO1xuXHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IGxlbjsgaSsrKVxuXHRcdFx0dGhpcy5fcFJlbmRlcmFibGVzW2ldLmludmFsaWRhdGVHZW9tZXRyeSgpO1xuXHR9XG5cblx0cHVibGljIF9pQ29sbGVjdFJlbmRlcmFibGVzKHJlbmRlcmVyUG9vbDpJUmVuZGVyZXJQb29sKVxuXHR7XG5cdFx0Ly8gU2luY2UgdGhpcyBnZXR0ZXIgaXMgaW52b2tlZCBldmVyeSBpdGVyYXRpb24gb2YgdGhlIHJlbmRlciBsb29wLCBhbmRcblx0XHQvLyB0aGUgcHJlZmFiIGNvbnN0cnVjdCBjb3VsZCBhZmZlY3QgdGhlIHN1Yi1tZXNoZXMsIHRoZSBwcmVmYWIgaXNcblx0XHQvLyB2YWxpZGF0ZWQgaGVyZSB0byBnaXZlIGl0IGEgY2hhbmNlIHRvIHJlYnVpbGQuXG5cdFx0aWYgKHRoaXMuX2lTb3VyY2VQcmVmYWIpXG5cdFx0XHR0aGlzLl9pU291cmNlUHJlZmFiLl9pVmFsaWRhdGUoKTtcblxuXHRcdHRoaXMuX2lDb2xsZWN0UmVuZGVyYWJsZShyZW5kZXJlclBvb2wpO1xuXHR9XG5cblx0cHVibGljIF9pQ29sbGVjdFJlbmRlcmFibGUocmVuZGVyZXJQb29sOklSZW5kZXJlclBvb2wpXG5cdHtcblx0XHRyZW5kZXJlclBvb2wuYXBwbHlCaWxsYm9hcmQodGhpcyk7XG5cdH1cblxuXHRwdWJsaWMgX3BSZWdpc3RlckVudGl0eShwYXJ0aXRpb246UGFydGl0aW9uKVxuXHR7XG5cdFx0cGFydGl0aW9uLl9pUmVnaXN0ZXJFbnRpdHkodGhpcyk7XG5cdH1cblxuXHRwdWJsaWMgX3BVbnJlZ2lzdGVyRW50aXR5KHBhcnRpdGlvbjpQYXJ0aXRpb24pXG5cdHtcblx0XHRwYXJ0aXRpb24uX2lVbnJlZ2lzdGVyRW50aXR5KHRoaXMpO1xuXHR9XG59XG5cbmV4cG9ydCA9IEJpbGxib2FyZDsiXX0=