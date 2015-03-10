var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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
            return Billboard.assetType;
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
    Billboard.assetType = "[asset Billboard]";
    return Billboard;
})(DisplayObject);
module.exports = Billboard;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9CaWxsYm9hcmQudHMiXSwibmFtZXMiOlsiQmlsbGJvYXJkIiwiQmlsbGJvYXJkLmNvbnN0cnVjdG9yIiwiQmlsbGJvYXJkLmFuaW1hdG9yIiwiQmlsbGJvYXJkLmFzc2V0VHlwZSIsIkJpbGxib2FyZC5iaWxsYm9hcmRIZWlnaHQiLCJCaWxsYm9hcmQuYmlsbGJvYXJkV2lkdGgiLCJCaWxsYm9hcmQubWF0ZXJpYWwiLCJCaWxsYm9hcmQudXZUcmFuc2Zvcm0iLCJCaWxsYm9hcmQuX3BVcGRhdGVCb3hCb3VuZHMiLCJCaWxsYm9hcmQuX2lUZXN0Q29sbGlzaW9uIiwiQmlsbGJvYXJkLm9uU2l6ZUNoYW5nZWQiLCJCaWxsYm9hcmQuX2lDb2xsZWN0UmVuZGVyYWJsZXMiLCJCaWxsYm9hcmQuX2lDb2xsZWN0UmVuZGVyYWJsZSIsIkJpbGxib2FyZC5fcFJlZ2lzdGVyRW50aXR5IiwiQmlsbGJvYXJkLl9wVW5yZWdpc3RlckVudGl0eSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBS0EsSUFBTyxhQUFhLFdBQWMsdUNBQXVDLENBQUMsQ0FBQztBQUUzRSxJQUFPLFVBQVUsV0FBZSxzQ0FBc0MsQ0FBQyxDQUFDO0FBS3hFLElBQU8sYUFBYSxXQUFjLHlDQUF5QyxDQUFDLENBQUM7QUFHN0UsQUFtQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQUZHO0lBRUcsU0FBUztJQUFTQSxVQUFsQkEsU0FBU0EsVUFBc0JBO0lBa0hwQ0EsU0FsSEtBLFNBQVNBLENBa0hGQSxRQUFxQkEsRUFBRUEsYUFBNkJBLEVBQUVBLFNBQXlCQTtRQWxINUZDLGlCQW9NQ0E7UUFsRm1DQSw2QkFBNkJBLEdBQTdCQSxzQkFBNkJBO1FBQUVBLHlCQUF5QkEsR0FBekJBLGlCQUF5QkE7UUFFMUZBLGlCQUFPQSxDQUFDQTtRQUVSQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUV2QkEsSUFBSUEsQ0FBQ0Es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Q0FBQ0EsY0FBY0EsQ0FBQ0EsVUFBVUEsRUFBRUEsQ0FBQ0E7UUFFbENBLElBQUlBLENBQUNBLG1CQUFtQkEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0E7SUFDeENBLENBQUNBO0lBRU1YLHVDQUFtQkEsR0FBMUJBLFVBQTJCQSxZQUEwQkE7UUFFcERZLFlBQVlBLENBQUNBLGNBQWNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO0lBQ25DQSxDQUFDQTtJQUVNWixvQ0FBZ0JBLEdBQXZCQSxVQUF3QkEsU0FBbUJBO1FBRTFDYSxTQUFTQSxDQUFDQSxnQkFBZ0JBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO0lBQ2xDQSxDQUFDQTtJQUVNYixzQ0FBa0JBLEdBQXpCQSxVQUEwQkEsU0FBbUJBO1FBRTVDYyxTQUFTQSxDQUFDQSxrQkFBa0JBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO0lBQ3BDQSxDQUFDQTtJQWpNYWQsbUJBQVNBLEdBQVVBLG1CQUFtQkEsQ0FBQ0E7SUFrTXREQSxnQkFBQ0E7QUFBREEsQ0FwTUEsQUFvTUNBLEVBcE11QixhQUFhLEVBb01wQztBQUVELEFBQW1CLGlCQUFWLFNBQVMsQ0FBQyIsImZpbGUiOiJlbnRpdGllcy9CaWxsYm9hcmQuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJpdG1hcERhdGFcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2RhdGEvQml0bWFwRGF0YVwiKTtcbmltcG9ydCBNYXRyaXgzRFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL01hdHJpeDNEXCIpO1xuaW1wb3J0IFVWVHJhbnNmb3JtXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1VWVHJhbnNmb3JtXCIpO1xuXG5pbXBvcnQgSUFuaW1hdG9yXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9hbmltYXRvcnMvSUFuaW1hdG9yXCIpO1xuaW1wb3J0IERpc3BsYXlPYmplY3RcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0Rpc3BsYXlPYmplY3RcIik7XG5pbXBvcnQgSVJlbmRlcmFibGVPd25lclx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvSVJlbmRlcmFibGVPd25lclwiKTtcbmltcG9ydCBCb3VuZHNUeXBlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9ib3VuZHMvQm91bmRzVHlwZVwiKTtcbmltcG9ydCBQYXJ0aXRpb25cdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3BhcnRpdGlvbi9QYXJ0aXRpb25cIik7XG5pbXBvcnQgRW50aXR5Tm9kZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcGFydGl0aW9uL0VudGl0eU5vZGVcIik7XG5pbXBvcnQgSVJlbmRlcmVyUG9vbFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3Bvb2wvSVJlbmRlcmVyUG9vbFwiKTtcbmltcG9ydCBJRW50aXR5XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2VudGl0aWVzL0lFbnRpdHlcIik7XG5pbXBvcnQgTWF0ZXJpYWxFdmVudFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2V2ZW50cy9NYXRlcmlhbEV2ZW50XCIpO1xuaW1wb3J0IE1hdGVyaWFsQmFzZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvbWF0ZXJpYWxzL01hdGVyaWFsQmFzZVwiKTtcblxuLyoqXG4gKiBUaGUgQmlsbGJvYXJkIGNsYXNzIHJlcHJlc2VudHMgZGlzcGxheSBvYmplY3RzIHRoYXQgcmVwcmVzZW50IGJpdG1hcCBpbWFnZXMuXG4gKiBUaGVzZSBjYW4gYmUgaW1hZ2VzIHRoYXQgeW91IGxvYWQgd2l0aCB0aGUgPGNvZGU+Zmxhc2guQXNzZXRzPC9jb2RlPiBvclxuICogPGNvZGU+Zmxhc2guZGlzcGxheS5Mb2FkZXI8L2NvZGU+IGNsYXNzZXMsIG9yIHRoZXkgY2FuIGJlIGltYWdlcyB0aGF0IHlvdVxuICogY3JlYXRlIHdpdGggdGhlIDxjb2RlPkJpbGxib2FyZCgpPC9jb2RlPiBjb25zdHJ1Y3Rvci5cbiAqXG4gKiA8cD5UaGUgPGNvZGU+QmlsbGJvYXJkKCk8L2NvZGU+IGNvbnN0cnVjdG9yIGFsbG93cyB5b3UgdG8gY3JlYXRlIGEgQmlsbGJvYXJkXG4gKiBvYmplY3QgdGhhdCBjb250YWlucyBhIHJlZmVyZW5jZSB0byBhIEJpdG1hcERhdGEgb2JqZWN0LiBBZnRlciB5b3UgY3JlYXRlIGFcbiAqIEJpbGxib2FyZCBvYmplY3QsIHVzZSB0aGUgPGNvZGU+YWRkQ2hpbGQoKTwvY29kZT4gb3IgPGNvZGU+YWRkQ2hpbGRBdCgpPC9jb2RlPlxuICogbWV0aG9kIG9mIHRoZSBwYXJlbnQgRGlzcGxheU9iamVjdENvbnRhaW5lciBpbnN0YW5jZSB0byBwbGFjZSB0aGUgYml0bWFwIG9uXG4gKiB0aGUgZGlzcGxheSBsaXN0LjwvcD5cbiAqXG4gKiA8cD5BIEJpbGxib2FyZCBvYmplY3QgY2FuIHNoYXJlIGl0cyBCaXRtYXBEYXRhIHJlZmVyZW5jZSBhbW9uZyBzZXZlcmFsIEJpbGxib2FyZFxuICogb2JqZWN0cywgaW5kZXBlbmRlbnQgb2YgdHJhbnNsYXRpb24gb3Igcm90YXRpb24gcHJvcGVydGllcy4gQmVjYXVzZSB5b3UgY2FuXG4gKiBjcmVhdGUgbXVsdGlwbGUgQmlsbGJvYXJkIG9iamVjdHMgdGhhdCByZWZlcmVuY2UgdGhlIHNhbWUgQml0bWFwRGF0YSBvYmplY3QsXG4gKiBtdWx0aXBsZSBkaXNwbGF5IG9iamVjdHMgY2FuIHVzZSB0aGUgc2FtZSBjb21wbGV4IEJpdG1hcERhdGEgb2JqZWN0IHdpdGhvdXRcbiAqIGluY3VycmluZyB0aGUgbWVtb3J5IG92ZXJoZWFkIG9mIGEgQml0bWFwRGF0YSBvYmplY3QgZm9yIGVhY2ggZGlzcGxheVxuICogb2JqZWN0IGluc3RhbmNlLjwvcD5cbiAqXG4gKiA8cD5BIEJpdG1hcERhdGEgb2JqZWN0IGNhbiBiZSBkcmF3biB0byB0aGUgc2NyZWVuIGJ5IGEgQmlsbGJvYXJkIG9iamVjdCBpbiBvbmVcbiAqIG9mIHR3byB3YXlzOiBieSB1c2luZyB0aGUgZGVmYXVsdCBoYXJkd2FyZSByZW5kZXJlciB3aXRoIGEgc2luZ2xlIGhhcmR3YXJlIHN1cmZhY2UsXG4gKiBvciBieSB1c2luZyB0aGUgc2xvd2VyIHNvZnR3YXJlIHJlbmRlcmVyIHdoZW4gM0QgYWNjZWxlcmF0aW9uIGlzIG5vdCBhdmFpbGFibGUuPC9wPlxuICpcbiAqIDxwPklmIHlvdSB3b3VsZCBwcmVmZXIgdG8gcGVyZm9ybSBhIGJhdGNoIHJlbmRlcmluZyBjb21tYW5kLCByYXRoZXIgdGhhbiB1c2luZyBhXG4gKiBzaW5nbGUgc3VyZmFjZSBmb3IgZWFjaCBCaWxsYm9hcmQgb2JqZWN0LCB5b3UgY2FuIGFsc28gZHJhdyB0byB0aGUgc2NyZWVuIHVzaW5nIHRoZVxuICogPGNvZGU+ZHJhd1RpbGVzKCk8L2NvZGU+IG9yIDxjb2RlPmRyYXdUcmlhbmdsZXMoKTwvY29kZT4gbWV0aG9kcyB3aGljaCBhcmVcbiAqIGF2YWlsYWJsZSB0byA8Y29kZT5mbGFzaC5kaXNwbGF5LlRpbGVzaGVldDwvY29kZT4gYW5kIDxjb2RlPmZsYXNoLmRpc3BsYXkuR3JhcGhpY3NcbiAqIG9iamVjdHMuPC9jb2RlPjwvcD5cbiAqXG4gKiA8cD48Yj5Ob3RlOjwvYj4gVGhlIEJpbGxib2FyZCBjbGFzcyBpcyBub3QgYSBzdWJjbGFzcyBvZiB0aGUgSW50ZXJhY3RpdmVPYmplY3RcbiAqIGNsYXNzLCBzbyBpdCBjYW5ub3QgZGlzcGF0Y2ggbW91c2UgZXZlbnRzLiBIb3dldmVyLCB5b3UgY2FuIHVzZSB0aGVcbiAqIDxjb2RlPmFkZEV2ZW50TGlzdGVuZXIoKTwvY29kZT4gbWV0aG9kIG9mIHRoZSBkaXNwbGF5IG9iamVjdCBjb250YWluZXIgdGhhdFxuICogY29udGFpbnMgdGhlIEJpbGxib2FyZCBvYmplY3QuPC9wPlxuICovXG5cbmNsYXNzIEJpbGxib2FyZCBleHRlbmRzIERpc3BsYXlPYmplY3QgaW1wbGVtZW50cyBJRW50aXR5LCBJUmVuZGVyYWJsZU93bmVyXG57XG5cdHB1YmxpYyBzdGF0aWMgYXNzZXRUeXBlOnN0cmluZyA9IFwiW2Fzc2V0IEJpbGxib2FyZF1cIjtcblxuXHRwcml2YXRlIF9hbmltYXRvcjpJQW5pbWF0b3I7XG5cdHByaXZhdGUgX2JpbGxib2FyZFdpZHRoOm51bWJlcjtcblx0cHJpdmF0ZSBfYmlsbGJvYXJkSGVpZ2h0Om51bWJlcjtcblx0cHJpdmF0ZSBfbWF0ZXJpYWw6TWF0ZXJpYWxCYXNlO1xuXHRwcml2YXRlIF91dlRyYW5zZm9ybTpVVlRyYW5zZm9ybTtcblxuXHRwcml2YXRlIG9uU2l6ZUNoYW5nZWREZWxlZ2F0ZTooZXZlbnQ6TWF0ZXJpYWxFdmVudCkgPT4gdm9pZDtcblxuXHQvKipcblx0ICogRGVmaW5lcyB0aGUgYW5pbWF0b3Igb2YgdGhlIG1lc2guIEFjdCBvbiB0aGUgbWVzaCdzIGdlb21ldHJ5LiBEZWZhdWx0cyB0byBudWxsXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGFuaW1hdG9yKCk6SUFuaW1hdG9yXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fYW5pbWF0b3I7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgYXNzZXRUeXBlKCk6c3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gQmlsbGJvYXJkLmFzc2V0VHlwZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgQml0bWFwRGF0YSBvYmplY3QgYmVpbmcgcmVmZXJlbmNlZC5cblx0ICovXG5cdHB1YmxpYyBiaXRtYXBEYXRhOkJpdG1hcERhdGE7IC8vVE9ET1xuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBiaWxsYm9hcmRIZWlnaHQoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9iaWxsYm9hcmRIZWlnaHQ7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgYmlsbGJvYXJkV2lkdGgoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9iaWxsYm9hcmRXaWR0aDtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBtYXRlcmlhbCgpOk1hdGVyaWFsQmFzZVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX21hdGVyaWFsO1xuXHR9XG5cblx0cHVibGljIHNldCBtYXRlcmlhbCh2YWx1ZTpNYXRlcmlhbEJhc2UpXG5cdHtcblx0XHRpZiAodmFsdWUgPT0gdGhpcy5fbWF0ZXJpYWwpXG5cdFx0XHRyZXR1cm47XG5cblx0XHRpZiAodGhpcy5fbWF0ZXJpYWwpIHtcblx0XHRcdHRoaXMuX21hdGVyaWFsLmlSZW1vdmVPd25lcih0aGlzKTtcblx0XHRcdHRoaXMuX21hdGVyaWFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoTWF0ZXJpYWxFdmVudC5TSVpFX0NIQU5HRUQsIHRoaXMub25TaXplQ2hhbmdlZERlbGVnYXRlKTtcblx0XHR9XG5cblxuXHRcdHRoaXMuX21hdGVyaWFsID0gdmFsdWU7XG5cblx0XHRpZiAodGhpcy5fbWF0ZXJpYWwpIHtcblx0XHRcdHRoaXMuX21hdGVyaWFsLmlBZGRPd25lcih0aGlzKTtcblx0XHRcdHRoaXMuX21hdGVyaWFsLmFkZEV2ZW50TGlzdGVuZXIoTWF0ZXJpYWxFdmVudC5TSVpFX0NIQU5HRUQsIHRoaXMub25TaXplQ2hhbmdlZERlbGVnYXRlKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQ29udHJvbHMgd2hldGhlciBvciBub3QgdGhlIEJpbGxib2FyZCBvYmplY3QgaXMgc25hcHBlZCB0byB0aGUgbmVhcmVzdCBwaXhlbC5cblx0ICogVGhpcyB2YWx1ZSBpcyBpZ25vcmVkIGluIHRoZSBuYXRpdmUgYW5kIEhUTUw1IHRhcmdldHMuXG5cdCAqIFRoZSBQaXhlbFNuYXBwaW5nIGNsYXNzIGluY2x1ZGVzIHBvc3NpYmxlIHZhbHVlczpcblx0ICogPHVsPlxuXHQgKiAgIDxsaT48Y29kZT5QaXhlbFNuYXBwaW5nLk5FVkVSPC9jb2RlPiAtIE5vIHBpeGVsIHNuYXBwaW5nIG9jY3Vycy48L2xpPlxuXHQgKiAgIDxsaT48Y29kZT5QaXhlbFNuYXBwaW5nLkFMV0FZUzwvY29kZT4gLSBUaGUgaW1hZ2UgaXMgYWx3YXlzIHNuYXBwZWQgdG9cblx0ICogdGhlIG5lYXJlc3QgcGl4ZWwsIGluZGVwZW5kZW50IG9mIHRyYW5zZm9ybWF0aW9uLjwvbGk+XG5cdCAqICAgPGxpPjxjb2RlPlBpeGVsU25hcHBpbmcuQVVUTzwvY29kZT4gLSBUaGUgaW1hZ2UgaXMgc25hcHBlZCB0byB0aGVcblx0ICogbmVhcmVzdCBwaXhlbCBpZiBpdCBpcyBkcmF3biB3aXRoIG5vIHJvdGF0aW9uIG9yIHNrZXcgYW5kIGl0IGlzIGRyYXduIGF0IGFcblx0ICogc2NhbGUgZmFjdG9yIG9mIDk5LjklIHRvIDEwMC4xJS4gSWYgdGhlc2UgY29uZGl0aW9ucyBhcmUgc2F0aXNmaWVkLCB0aGVcblx0ICogYml0bWFwIGltYWdlIGlzIGRyYXduIGF0IDEwMCUgc2NhbGUsIHNuYXBwZWQgdG8gdGhlIG5lYXJlc3QgcGl4ZWwuXG5cdCAqIFdoZW4gdGFyZ2V0aW5nIEZsYXNoIFBsYXllciwgdGhpcyB2YWx1ZSBhbGxvd3MgdGhlIGltYWdlIHRvIGJlIGRyYXduIGFzIGZhc3Rcblx0ICogYXMgcG9zc2libGUgdXNpbmcgdGhlIGludGVybmFsIHZlY3RvciByZW5kZXJlci48L2xpPlxuXHQgKiA8L3VsPlxuXHQgKi9cblx0cHVibGljIHBpeGVsU25hcHBpbmc6c3RyaW5nOyAvL1RPRE9cblxuXHQvKipcblx0ICogQ29udHJvbHMgd2hldGhlciBvciBub3QgdGhlIGJpdG1hcCBpcyBzbW9vdGhlZCB3aGVuIHNjYWxlZC4gSWZcblx0ICogPGNvZGU+dHJ1ZTwvY29kZT4sIHRoZSBiaXRtYXAgaXMgc21vb3RoZWQgd2hlbiBzY2FsZWQuIElmXG5cdCAqIDxjb2RlPmZhbHNlPC9jb2RlPiwgdGhlIGJpdG1hcCBpcyBub3Qgc21vb3RoZWQgd2hlbiBzY2FsZWQuXG5cdCAqL1xuXHRwdWJsaWMgc21vb3RoaW5nOmJvb2xlYW47IC8vVE9ET1xuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCB1dlRyYW5zZm9ybSgpOlVWVHJhbnNmb3JtXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fdXZUcmFuc2Zvcm07XG5cdH1cblxuXHRwdWJsaWMgc2V0IHV2VHJhbnNmb3JtKHZhbHVlOlVWVHJhbnNmb3JtKVxuXHR7XG5cdFx0dGhpcy5fdXZUcmFuc2Zvcm0gPSB2YWx1ZTtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKG1hdGVyaWFsOk1hdGVyaWFsQmFzZSwgcGl4ZWxTbmFwcGluZzpzdHJpbmcgPSBcImF1dG9cIiwgc21vb3RoaW5nOmJvb2xlYW4gPSBmYWxzZSlcblx0e1xuXHRcdHN1cGVyKCk7XG5cblx0XHR0aGlzLl9wSXNFbnRpdHkgPSB0cnVlO1xuXG5cdFx0dGhpcy5vblNpemVDaGFuZ2VkRGVsZWdhdGUgPSAoZXZlbnQ6TWF0ZXJpYWxFdmVudCkgPT4gdGhpcy5vblNpemVDaGFuZ2VkKGV2ZW50KTtcblxuXHRcdHRoaXMubWF0ZXJpYWwgPSBtYXRlcmlhbDtcblxuXHRcdHRoaXMuX2JpbGxib2FyZFdpZHRoID0gbWF0ZXJpYWwud2lkdGg7XG5cdFx0dGhpcy5fYmlsbGJvYXJkSGVpZ2h0ID0gbWF0ZXJpYWwuaGVpZ2h0O1xuXG5cdFx0Ly9kZWZhdWx0IGJvdW5kcyB0eXBlXG5cdFx0dGhpcy5fYm91bmRzVHlwZSA9IEJvdW5kc1R5cGUuQVhJU19BTElHTkVEX0JPWDtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcHJvdGVjdGVkXG5cdCAqL1xuXHRwdWJsaWMgX3BVcGRhdGVCb3hCb3VuZHMoKVxuXHR7XG5cdFx0c3VwZXIuX3BVcGRhdGVCb3hCb3VuZHMoKTtcblxuXHRcdHRoaXMuX3BCb3hCb3VuZHMud2lkdGggPSB0aGlzLl9iaWxsYm9hcmRXaWR0aDtcblx0XHR0aGlzLl9wQm94Qm91bmRzLmhlaWdodCA9IHRoaXMuX2JpbGxib2FyZEhlaWdodDtcblx0fVxuXG5cdC8qKlxuXHQgKiAvL1RPRE9cblx0ICpcblx0ICogQHBhcmFtIHNob3J0ZXN0Q29sbGlzaW9uRGlzdGFuY2Vcblx0ICogQHBhcmFtIGZpbmRDbG9zZXN0XG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxuXHQgKlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHB1YmxpYyBfaVRlc3RDb2xsaXNpb24oc2hvcnRlc3RDb2xsaXNpb25EaXN0YW5jZTpudW1iZXIsIGZpbmRDbG9zZXN0OmJvb2xlYW4pOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9wUGlja2luZ0NvbGxpZGVyLnRlc3RCaWxsYm9hcmRDb2xsaXNpb24odGhpcywgdGhpcy5fcFBpY2tpbmdDb2xsaXNpb25WTywgc2hvcnRlc3RDb2xsaXNpb25EaXN0YW5jZSk7XG5cdH1cblxuXHQvKipcblx0ICogQHByaXZhdGVcblx0ICovXG5cdHByaXZhdGUgb25TaXplQ2hhbmdlZChldmVudDpNYXRlcmlhbEV2ZW50KVxuXHR7XG5cdFx0dGhpcy5fYmlsbGJvYXJkV2lkdGggPSB0aGlzLl9tYXRlcmlhbC53aWR0aDtcblx0XHR0aGlzLl9iaWxsYm9hcmRIZWlnaHQgPSB0aGlzLl9tYXRlcmlhbC5oZWlnaHQ7XG5cblx0XHR0aGlzLl9wSW52YWxpZGF0ZUJvdW5kcygpO1xuXG5cdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9wUmVuZGVyYWJsZXMubGVuZ3RoO1xuXHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IGxlbjsgaSsrKVxuXHRcdFx0dGhpcy5fcFJlbmRlcmFibGVzW2ldLmludmFsaWRhdGVHZW9tZXRyeSgpO1xuXHR9XG5cblx0cHVibGljIF9pQ29sbGVjdFJlbmRlcmFibGVzKHJlbmRlcmVyUG9vbDpJUmVuZGVyZXJQb29sKVxuXHR7XG5cdFx0Ly8gU2luY2UgdGhpcyBnZXR0ZXIgaXMgaW52b2tlZCBldmVyeSBpdGVyYXRpb24gb2YgdGhlIHJlbmRlciBsb29wLCBhbmRcblx0XHQvLyB0aGUgcHJlZmFiIGNvbnN0cnVjdCBjb3VsZCBhZmZlY3QgdGhlIHN1Yi1tZXNoZXMsIHRoZSBwcmVmYWIgaXNcblx0XHQvLyB2YWxpZGF0ZWQgaGVyZSB0byBnaXZlIGl0IGEgY2hhbmNlIHRvIHJlYnVpbGQuXG5cdFx0aWYgKHRoaXMuX2lTb3VyY2VQcmVmYWIpXG5cdFx0XHR0aGlzLl9pU291cmNlUHJlZmFiLl9pVmFsaWRhdGUoKTtcblxuXHRcdHRoaXMuX2lDb2xsZWN0UmVuZGVyYWJsZShyZW5kZXJlclBvb2wpO1xuXHR9XG5cblx0cHVibGljIF9pQ29sbGVjdFJlbmRlcmFibGUocmVuZGVyZXJQb29sOklSZW5kZXJlclBvb2wpXG5cdHtcblx0XHRyZW5kZXJlclBvb2wuYXBwbHlCaWxsYm9hcmQodGhpcyk7XG5cdH1cblxuXHRwdWJsaWMgX3BSZWdpc3RlckVudGl0eShwYXJ0aXRpb246UGFydGl0aW9uKVxuXHR7XG5cdFx0cGFydGl0aW9uLl9pUmVnaXN0ZXJFbnRpdHkodGhpcyk7XG5cdH1cblxuXHRwdWJsaWMgX3BVbnJlZ2lzdGVyRW50aXR5KHBhcnRpdGlvbjpQYXJ0aXRpb24pXG5cdHtcblx0XHRwYXJ0aXRpb24uX2lVbnJlZ2lzdGVyRW50aXR5KHRoaXMpO1xuXHR9XG59XG5cbmV4cG9ydCA9IEJpbGxib2FyZDsiXX0=