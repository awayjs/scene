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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9CaWxsYm9hcmQudHMiXSwibmFtZXMiOlsiQmlsbGJvYXJkIiwiQmlsbGJvYXJkLmNvbnN0cnVjdG9yIiwiQmlsbGJvYXJkLmFuaW1hdG9yIiwiQmlsbGJvYXJkLmFzc2V0VHlwZSIsIkJpbGxib2FyZC5iaWxsYm9hcmRIZWlnaHQiLCJCaWxsYm9hcmQuYmlsbGJvYXJkV2lkdGgiLCJCaWxsYm9hcmQubWF0ZXJpYWwiLCJCaWxsYm9hcmQudXZUcmFuc2Zvcm0iLCJCaWxsYm9hcmQucENyZWF0ZUVudGl0eVBhcnRpdGlvbk5vZGUiLCJCaWxsYm9hcmQucFVwZGF0ZUJvdW5kcyIsIkJpbGxib2FyZC5faVRlc3RDb2xsaXNpb24iLCJCaWxsYm9hcmQub25TaXplQ2hhbmdlZCIsIkJpbGxib2FyZC5faUNvbGxlY3RSZW5kZXJhYmxlcyIsIkJpbGxib2FyZC5faUNvbGxlY3RSZW5kZXJhYmxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFHQSxJQUFPLFNBQVMsV0FBYyxtQ0FBbUMsQ0FBQyxDQUFDO0FBR25FLElBQU8sYUFBYSxXQUFhLHVDQUF1QyxDQUFDLENBQUM7QUFFMUUsSUFBTyxVQUFVLFdBQWMseUNBQXlDLENBQUMsQ0FBQztBQUcxRSxJQUFPLGFBQWEsV0FBYSx5Q0FBeUMsQ0FBQyxDQUFDO0FBRzVFLEFBbUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FGRztJQUVHLFNBQVM7SUFBU0EsVUFBbEJBLFNBQVNBLFVBQXNCQTtJQWdIcENBLFNBaEhLQSxTQUFTQSxDQWdIRkEsUUFBcUJBLEVBQUVBLGFBQTZCQSxFQUFFQSxTQUF5QkE7UUFoSDVGQyxpQkE0TENBO1FBNUVtQ0EsNkJBQTZCQSxHQUE3QkEsc0JBQTZCQTtRQUFFQSx5QkFBeUJBLEdBQXpCQSxpQkFBeUJBO1FBRTFGQSxpQkFBT0EsQ0FBQ0E7UUFFUkEsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsSUFBSUEsQ0FBQ0E7UUFFdkJB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Q2pEQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQTtZQUN2QkEsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsVUFBVUEsRUFBRUEsQ0FBQ0E7UUFFbENBLElBQUlBLENBQUNBLG1CQUFtQkEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0E7SUFDeENBLENBQUNBO0lBRU1aLHVDQUFtQkEsR0FBMUJBLFVBQTJCQSxZQUEwQkE7UUFFcERhLFlBQVlBLENBQUNBLGNBQWNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO0lBQ25DQSxDQUFDQTtJQUNGYixnQkFBQ0E7QUFBREEsQ0E1TEEsQUE0TENBLEVBNUx1QixhQUFhLEVBNExwQztBQUVELEFBQW1CLGlCQUFWLFNBQVMsQ0FBQyIsImZpbGUiOiJlbnRpdGllcy9CaWxsYm9hcmQuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJpdG1hcERhdGFcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9iYXNlL0JpdG1hcERhdGFcIik7XHJcbmltcG9ydCBNYXRyaXgzRFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9NYXRyaXgzRFwiKTtcclxuaW1wb3J0IFVWVHJhbnNmb3JtXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9VVlRyYW5zZm9ybVwiKTtcclxuaW1wb3J0IEFzc2V0VHlwZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvQXNzZXRUeXBlXCIpO1xyXG5cclxuaW1wb3J0IElBbmltYXRvclx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2FuaW1hdG9ycy9JQW5pbWF0b3JcIik7XHJcbmltcG9ydCBEaXNwbGF5T2JqZWN0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvRGlzcGxheU9iamVjdFwiKTtcclxuaW1wb3J0IElSZW5kZXJhYmxlT3duZXJcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9JUmVuZGVyYWJsZU93bmVyXCIpO1xyXG5pbXBvcnQgRW50aXR5Tm9kZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3BhcnRpdGlvbi9FbnRpdHlOb2RlXCIpO1xyXG5pbXBvcnQgSVJlbmRlcmVyUG9vbFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wb29sL0lSZW5kZXJlclBvb2xcIik7XHJcbmltcG9ydCBJRW50aXR5XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9JRW50aXR5XCIpO1xyXG5pbXBvcnQgTWF0ZXJpYWxFdmVudFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9ldmVudHMvTWF0ZXJpYWxFdmVudFwiKTtcclxuaW1wb3J0IE1hdGVyaWFsQmFzZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL21hdGVyaWFscy9NYXRlcmlhbEJhc2VcIik7XHJcblxyXG4vKipcclxuICogVGhlIEJpbGxib2FyZCBjbGFzcyByZXByZXNlbnRzIGRpc3BsYXkgb2JqZWN0cyB0aGF0IHJlcHJlc2VudCBiaXRtYXAgaW1hZ2VzLlxyXG4gKiBUaGVzZSBjYW4gYmUgaW1hZ2VzIHRoYXQgeW91IGxvYWQgd2l0aCB0aGUgPGNvZGU+Zmxhc2guQXNzZXRzPC9jb2RlPiBvclxyXG4gKiA8Y29kZT5mbGFzaC5kaXNwbGF5LkxvYWRlcjwvY29kZT4gY2xhc3Nlcywgb3IgdGhleSBjYW4gYmUgaW1hZ2VzIHRoYXQgeW91XHJcbiAqIGNyZWF0ZSB3aXRoIHRoZSA8Y29kZT5CaWxsYm9hcmQoKTwvY29kZT4gY29uc3RydWN0b3IuXHJcbiAqXHJcbiAqIDxwPlRoZSA8Y29kZT5CaWxsYm9hcmQoKTwvY29kZT4gY29uc3RydWN0b3IgYWxsb3dzIHlvdSB0byBjcmVhdGUgYSBCaWxsYm9hcmRcclxuICogb2JqZWN0IHRoYXQgY29udGFpbnMgYSByZWZlcmVuY2UgdG8gYSBCaXRtYXBEYXRhIG9iamVjdC4gQWZ0ZXIgeW91IGNyZWF0ZSBhXHJcbiAqIEJpbGxib2FyZCBvYmplY3QsIHVzZSB0aGUgPGNvZGU+YWRkQ2hpbGQoKTwvY29kZT4gb3IgPGNvZGU+YWRkQ2hpbGRBdCgpPC9jb2RlPlxyXG4gKiBtZXRob2Qgb2YgdGhlIHBhcmVudCBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIGluc3RhbmNlIHRvIHBsYWNlIHRoZSBiaXRtYXAgb25cclxuICogdGhlIGRpc3BsYXkgbGlzdC48L3A+XHJcbiAqXHJcbiAqIDxwPkEgQmlsbGJvYXJkIG9iamVjdCBjYW4gc2hhcmUgaXRzIEJpdG1hcERhdGEgcmVmZXJlbmNlIGFtb25nIHNldmVyYWwgQmlsbGJvYXJkXHJcbiAqIG9iamVjdHMsIGluZGVwZW5kZW50IG9mIHRyYW5zbGF0aW9uIG9yIHJvdGF0aW9uIHByb3BlcnRpZXMuIEJlY2F1c2UgeW91IGNhblxyXG4gKiBjcmVhdGUgbXVsdGlwbGUgQmlsbGJvYXJkIG9iamVjdHMgdGhhdCByZWZlcmVuY2UgdGhlIHNhbWUgQml0bWFwRGF0YSBvYmplY3QsXHJcbiAqIG11bHRpcGxlIGRpc3BsYXkgb2JqZWN0cyBjYW4gdXNlIHRoZSBzYW1lIGNvbXBsZXggQml0bWFwRGF0YSBvYmplY3Qgd2l0aG91dFxyXG4gKiBpbmN1cnJpbmcgdGhlIG1lbW9yeSBvdmVyaGVhZCBvZiBhIEJpdG1hcERhdGEgb2JqZWN0IGZvciBlYWNoIGRpc3BsYXlcclxuICogb2JqZWN0IGluc3RhbmNlLjwvcD5cclxuICpcclxuICogPHA+QSBCaXRtYXBEYXRhIG9iamVjdCBjYW4gYmUgZHJhd24gdG8gdGhlIHNjcmVlbiBieSBhIEJpbGxib2FyZCBvYmplY3QgaW4gb25lXHJcbiAqIG9mIHR3byB3YXlzOiBieSB1c2luZyB0aGUgZGVmYXVsdCBoYXJkd2FyZSByZW5kZXJlciB3aXRoIGEgc2luZ2xlIGhhcmR3YXJlIHN1cmZhY2UsXHJcbiAqIG9yIGJ5IHVzaW5nIHRoZSBzbG93ZXIgc29mdHdhcmUgcmVuZGVyZXIgd2hlbiAzRCBhY2NlbGVyYXRpb24gaXMgbm90IGF2YWlsYWJsZS48L3A+XHJcbiAqXHJcbiAqIDxwPklmIHlvdSB3b3VsZCBwcmVmZXIgdG8gcGVyZm9ybSBhIGJhdGNoIHJlbmRlcmluZyBjb21tYW5kLCByYXRoZXIgdGhhbiB1c2luZyBhXHJcbiAqIHNpbmdsZSBzdXJmYWNlIGZvciBlYWNoIEJpbGxib2FyZCBvYmplY3QsIHlvdSBjYW4gYWxzbyBkcmF3IHRvIHRoZSBzY3JlZW4gdXNpbmcgdGhlXHJcbiAqIDxjb2RlPmRyYXdUaWxlcygpPC9jb2RlPiBvciA8Y29kZT5kcmF3VHJpYW5nbGVzKCk8L2NvZGU+IG1ldGhvZHMgd2hpY2ggYXJlXHJcbiAqIGF2YWlsYWJsZSB0byA8Y29kZT5mbGFzaC5kaXNwbGF5LlRpbGVzaGVldDwvY29kZT4gYW5kIDxjb2RlPmZsYXNoLmRpc3BsYXkuR3JhcGhpY3NcclxuICogb2JqZWN0cy48L2NvZGU+PC9wPlxyXG4gKlxyXG4gKiA8cD48Yj5Ob3RlOjwvYj4gVGhlIEJpbGxib2FyZCBjbGFzcyBpcyBub3QgYSBzdWJjbGFzcyBvZiB0aGUgSW50ZXJhY3RpdmVPYmplY3RcclxuICogY2xhc3MsIHNvIGl0IGNhbm5vdCBkaXNwYXRjaCBtb3VzZSBldmVudHMuIEhvd2V2ZXIsIHlvdSBjYW4gdXNlIHRoZVxyXG4gKiA8Y29kZT5hZGRFdmVudExpc3RlbmVyKCk8L2NvZGU+IG1ldGhvZCBvZiB0aGUgZGlzcGxheSBvYmplY3QgY29udGFpbmVyIHRoYXRcclxuICogY29udGFpbnMgdGhlIEJpbGxib2FyZCBvYmplY3QuPC9wPlxyXG4gKi9cclxuXHJcbmNsYXNzIEJpbGxib2FyZCBleHRlbmRzIERpc3BsYXlPYmplY3QgaW1wbGVtZW50cyBJRW50aXR5LCBJUmVuZGVyYWJsZU93bmVyXHJcbntcclxuXHRwcml2YXRlIF9hbmltYXRvcjpJQW5pbWF0b3I7XHJcblx0cHJpdmF0ZSBfYmlsbGJvYXJkV2lkdGg6bnVtYmVyO1xyXG5cdHByaXZhdGUgX2JpbGxib2FyZEhlaWdodDpudW1iZXI7XHJcblx0cHJpdmF0ZSBfbWF0ZXJpYWw6TWF0ZXJpYWxCYXNlO1xyXG5cdHByaXZhdGUgX3V2VHJhbnNmb3JtOlVWVHJhbnNmb3JtO1xyXG5cclxuXHRwcml2YXRlIG9uU2l6ZUNoYW5nZWREZWxlZ2F0ZTooZXZlbnQ6TWF0ZXJpYWxFdmVudCkgPT4gdm9pZDtcclxuXHJcblx0LyoqXHJcblx0ICogRGVmaW5lcyB0aGUgYW5pbWF0b3Igb2YgdGhlIG1lc2guIEFjdCBvbiB0aGUgbWVzaCdzIGdlb21ldHJ5LiBEZWZhdWx0cyB0byBudWxsXHJcblx0ICovXHJcblx0cHVibGljIGdldCBhbmltYXRvcigpOklBbmltYXRvclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9hbmltYXRvcjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCBhc3NldFR5cGUoKTpzdHJpbmdcclxuXHR7XHJcblx0XHRyZXR1cm4gQXNzZXRUeXBlLkJJTExCT0FSRDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBCaXRtYXBEYXRhIG9iamVjdCBiZWluZyByZWZlcmVuY2VkLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBiaXRtYXBEYXRhOkJpdG1hcERhdGE7IC8vVE9ET1xyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgYmlsbGJvYXJkSGVpZ2h0KCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2JpbGxib2FyZEhlaWdodDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCBiaWxsYm9hcmRXaWR0aCgpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9iaWxsYm9hcmRXaWR0aDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCBtYXRlcmlhbCgpOk1hdGVyaWFsQmFzZVxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9tYXRlcmlhbDtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgbWF0ZXJpYWwodmFsdWU6TWF0ZXJpYWxCYXNlKVxyXG5cdHtcclxuXHRcdGlmICh2YWx1ZSA9PSB0aGlzLl9tYXRlcmlhbClcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdGlmICh0aGlzLl9tYXRlcmlhbCkge1xyXG5cdFx0XHR0aGlzLl9tYXRlcmlhbC5pUmVtb3ZlT3duZXIodGhpcyk7XHJcblx0XHRcdHRoaXMuX21hdGVyaWFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoTWF0ZXJpYWxFdmVudC5TSVpFX0NIQU5HRUQsIHRoaXMub25TaXplQ2hhbmdlZERlbGVnYXRlKTtcclxuXHRcdH1cclxuXHJcblxyXG5cdFx0dGhpcy5fbWF0ZXJpYWwgPSB2YWx1ZTtcclxuXHJcblx0XHRpZiAodGhpcy5fbWF0ZXJpYWwpIHtcclxuXHRcdFx0dGhpcy5fbWF0ZXJpYWwuaUFkZE93bmVyKHRoaXMpO1xyXG5cdFx0XHR0aGlzLl9tYXRlcmlhbC5hZGRFdmVudExpc3RlbmVyKE1hdGVyaWFsRXZlbnQuU0laRV9DSEFOR0VELCB0aGlzLm9uU2l6ZUNoYW5nZWREZWxlZ2F0ZSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDb250cm9scyB3aGV0aGVyIG9yIG5vdCB0aGUgQmlsbGJvYXJkIG9iamVjdCBpcyBzbmFwcGVkIHRvIHRoZSBuZWFyZXN0IHBpeGVsLlxyXG5cdCAqIFRoaXMgdmFsdWUgaXMgaWdub3JlZCBpbiB0aGUgbmF0aXZlIGFuZCBIVE1MNSB0YXJnZXRzLlxyXG5cdCAqIFRoZSBQaXhlbFNuYXBwaW5nIGNsYXNzIGluY2x1ZGVzIHBvc3NpYmxlIHZhbHVlczpcclxuXHQgKiA8dWw+XHJcblx0ICogICA8bGk+PGNvZGU+UGl4ZWxTbmFwcGluZy5ORVZFUjwvY29kZT4gLSBObyBwaXhlbCBzbmFwcGluZyBvY2N1cnMuPC9saT5cclxuXHQgKiAgIDxsaT48Y29kZT5QaXhlbFNuYXBwaW5nLkFMV0FZUzwvY29kZT4gLSBUaGUgaW1hZ2UgaXMgYWx3YXlzIHNuYXBwZWQgdG9cclxuXHQgKiB0aGUgbmVhcmVzdCBwaXhlbCwgaW5kZXBlbmRlbnQgb2YgdHJhbnNmb3JtYXRpb24uPC9saT5cclxuXHQgKiAgIDxsaT48Y29kZT5QaXhlbFNuYXBwaW5nLkFVVE88L2NvZGU+IC0gVGhlIGltYWdlIGlzIHNuYXBwZWQgdG8gdGhlXHJcblx0ICogbmVhcmVzdCBwaXhlbCBpZiBpdCBpcyBkcmF3biB3aXRoIG5vIHJvdGF0aW9uIG9yIHNrZXcgYW5kIGl0IGlzIGRyYXduIGF0IGFcclxuXHQgKiBzY2FsZSBmYWN0b3Igb2YgOTkuOSUgdG8gMTAwLjElLiBJZiB0aGVzZSBjb25kaXRpb25zIGFyZSBzYXRpc2ZpZWQsIHRoZVxyXG5cdCAqIGJpdG1hcCBpbWFnZSBpcyBkcmF3biBhdCAxMDAlIHNjYWxlLCBzbmFwcGVkIHRvIHRoZSBuZWFyZXN0IHBpeGVsLlxyXG5cdCAqIFdoZW4gdGFyZ2V0aW5nIEZsYXNoIFBsYXllciwgdGhpcyB2YWx1ZSBhbGxvd3MgdGhlIGltYWdlIHRvIGJlIGRyYXduIGFzIGZhc3RcclxuXHQgKiBhcyBwb3NzaWJsZSB1c2luZyB0aGUgaW50ZXJuYWwgdmVjdG9yIHJlbmRlcmVyLjwvbGk+XHJcblx0ICogPC91bD5cclxuXHQgKi9cclxuXHRwdWJsaWMgcGl4ZWxTbmFwcGluZzpzdHJpbmc7IC8vVE9ET1xyXG5cclxuXHQvKipcclxuXHQgKiBDb250cm9scyB3aGV0aGVyIG9yIG5vdCB0aGUgYml0bWFwIGlzIHNtb290aGVkIHdoZW4gc2NhbGVkLiBJZlxyXG5cdCAqIDxjb2RlPnRydWU8L2NvZGU+LCB0aGUgYml0bWFwIGlzIHNtb290aGVkIHdoZW4gc2NhbGVkLiBJZlxyXG5cdCAqIDxjb2RlPmZhbHNlPC9jb2RlPiwgdGhlIGJpdG1hcCBpcyBub3Qgc21vb3RoZWQgd2hlbiBzY2FsZWQuXHJcblx0ICovXHJcblx0cHVibGljIHNtb290aGluZzpib29sZWFuOyAvL1RPRE9cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHV2VHJhbnNmb3JtKCk6VVZUcmFuc2Zvcm1cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fdXZUcmFuc2Zvcm07XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHV2VHJhbnNmb3JtKHZhbHVlOlVWVHJhbnNmb3JtKVxyXG5cdHtcclxuXHRcdHRoaXMuX3V2VHJhbnNmb3JtID0gdmFsdWU7XHJcblx0fVxyXG5cclxuXHRjb25zdHJ1Y3RvcihtYXRlcmlhbDpNYXRlcmlhbEJhc2UsIHBpeGVsU25hcHBpbmc6c3RyaW5nID0gXCJhdXRvXCIsIHNtb290aGluZzpib29sZWFuID0gZmFsc2UpXHJcblx0e1xyXG5cdFx0c3VwZXIoKTtcclxuXHJcblx0XHR0aGlzLl9wSXNFbnRpdHkgPSB0cnVlO1xyXG5cclxuXHRcdHRoaXMub25TaXplQ2hhbmdlZERlbGVnYXRlID0gKGV2ZW50Ok1hdGVyaWFsRXZlbnQpID0+IHRoaXMub25TaXplQ2hhbmdlZChldmVudCk7XHJcblxyXG5cdFx0dGhpcy5tYXRlcmlhbCA9IG1hdGVyaWFsO1xyXG5cclxuXHRcdHRoaXMuX2JpbGxib2FyZFdpZHRoID0gbWF0ZXJpYWwud2lkdGg7XHJcblx0XHR0aGlzLl9iaWxsYm9hcmRIZWlnaHQgPSBtYXRlcmlhbC5oZWlnaHQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAcHJvdGVjdGVkXHJcblx0ICovXHJcblx0cHVibGljIHBDcmVhdGVFbnRpdHlQYXJ0aXRpb25Ob2RlKCk6RW50aXR5Tm9kZVxyXG5cdHtcclxuXHRcdHJldHVybiBuZXcgRW50aXR5Tm9kZSh0aGlzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwcm90ZWN0ZWRcclxuXHQgKi9cclxuXHRwdWJsaWMgcFVwZGF0ZUJvdW5kcygpXHJcblx0e1xyXG5cdFx0dGhpcy5fcEJvdW5kcy5mcm9tRXh0cmVtZXMoMCwgMCwgMCwgdGhpcy5fYmlsbGJvYXJkV2lkdGgsIHRoaXMuX2JpbGxib2FyZEhlaWdodCwgMCk7XHJcblxyXG5cdFx0c3VwZXIucFVwZGF0ZUJvdW5kcygpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogLy9UT0RPXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc2hvcnRlc3RDb2xsaXNpb25EaXN0YW5jZVxyXG5cdCAqIEBwYXJhbSBmaW5kQ2xvc2VzdFxyXG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxyXG5cdCAqXHJcblx0ICogQGludGVybmFsXHJcblx0ICovXHJcblx0cHVibGljIF9pVGVzdENvbGxpc2lvbihzaG9ydGVzdENvbGxpc2lvbkRpc3RhbmNlOm51bWJlciwgZmluZENsb3Nlc3Q6Ym9vbGVhbik6Ym9vbGVhblxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9wUGlja2luZ0NvbGxpZGVyLnRlc3RCaWxsYm9hcmRDb2xsaXNpb24odGhpcywgdGhpcy5fcFBpY2tpbmdDb2xsaXNpb25WTywgc2hvcnRlc3RDb2xsaXNpb25EaXN0YW5jZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgb25TaXplQ2hhbmdlZChldmVudDpNYXRlcmlhbEV2ZW50KVxyXG5cdHtcclxuXHRcdHRoaXMuX2JpbGxib2FyZFdpZHRoID0gdGhpcy5fbWF0ZXJpYWwud2lkdGg7XHJcblx0XHR0aGlzLl9iaWxsYm9hcmRIZWlnaHQgPSB0aGlzLl9tYXRlcmlhbC5oZWlnaHQ7XHJcblxyXG5cdFx0dGhpcy5fcEJvdW5kc0ludmFsaWQgPSB0cnVlO1xyXG5cclxuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fcFJlbmRlcmFibGVzLmxlbmd0aDtcclxuXHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IGxlbjsgaSsrKVxyXG5cdFx0XHR0aGlzLl9wUmVuZGVyYWJsZXNbaV0uaW52YWxpZGF0ZVZlcnRleERhdGEoXCJ2ZXJ0aWNlc1wiKTsgLy9UT0RPXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgX2lDb2xsZWN0UmVuZGVyYWJsZXMocmVuZGVyZXJQb29sOklSZW5kZXJlclBvb2wpXHJcblx0e1xyXG5cdFx0Ly8gU2luY2UgdGhpcyBnZXR0ZXIgaXMgaW52b2tlZCBldmVyeSBpdGVyYXRpb24gb2YgdGhlIHJlbmRlciBsb29wLCBhbmRcclxuXHRcdC8vIHRoZSBwcmVmYWIgY29uc3RydWN0IGNvdWxkIGFmZmVjdCB0aGUgc3ViLW1lc2hlcywgdGhlIHByZWZhYiBpc1xyXG5cdFx0Ly8gdmFsaWRhdGVkIGhlcmUgdG8gZ2l2ZSBpdCBhIGNoYW5jZSB0byByZWJ1aWxkLlxyXG5cdFx0aWYgKHRoaXMuX2lTb3VyY2VQcmVmYWIpXHJcblx0XHRcdHRoaXMuX2lTb3VyY2VQcmVmYWIuX2lWYWxpZGF0ZSgpO1xyXG5cclxuXHRcdHRoaXMuX2lDb2xsZWN0UmVuZGVyYWJsZShyZW5kZXJlclBvb2wpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIF9pQ29sbGVjdFJlbmRlcmFibGUocmVuZGVyZXJQb29sOklSZW5kZXJlclBvb2wpXHJcblx0e1xyXG5cdFx0cmVuZGVyZXJQb29sLmFwcGx5QmlsbGJvYXJkKHRoaXMpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0ID0gQmlsbGJvYXJkOyJdfQ==