var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AssetType = require("awayjs-core/lib/library/AssetType");
var DisplayObject = require("awayjs-display/lib/base/DisplayObject");
var BoundsType = require("awayjs-display/lib/bounds/BoundsType");
/**
 * A Line Segment primitive.
 */
var LineSegment = (function (_super) {
    __extends(LineSegment, _super);
    /**
     * Create a line segment
     *
     * @param startPosition Start position of the line segment
     * @param endPosition Ending position of the line segment
     * @param thickness Thickness of the line
     */
    function LineSegment(material, startPosition, endPosition, thickness) {
        if (thickness === void 0) { thickness = 1; }
        _super.call(this);
        this._pIsEntity = true;
        this.material = material;
        this._startPosition = startPosition;
        this._endPosition = endPosition;
        this._halfThickness = thickness * 0.5;
        //default bounds type
        this._boundsType = BoundsType.AXIS_ALIGNED_BOX;
    }
    Object.defineProperty(LineSegment.prototype, "animator", {
        /**
         * Defines the animator of the line segment. Act on the line segment's geometry. Defaults to null
         */
        get: function () {
            return this._animator;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineSegment.prototype, "assetType", {
        /**
         *
         */
        get: function () {
            return AssetType.LINE_SEGMENT;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineSegment.prototype, "startPostion", {
        /**
         *
         */
        get: function () {
            return this._startPosition;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineSegment.prototype, "startPosition", {
        set: function (value) {
            if (this._startPosition == value)
                return;
            this._startPosition = value;
            this.notifyRenderableUpdate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineSegment.prototype, "endPosition", {
        /**
         *
         */
        get: function () {
            return this._endPosition;
        },
        set: function (value) {
            if (this._endPosition == value)
                return;
            this._endPosition = value;
            this.notifyRenderableUpdate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineSegment.prototype, "material", {
        /**
         *
         */
        get: function () {
            return this._material;
        },
        set: function (value) {
            if (this.material)
                this.material.iRemoveOwner(this);
            this._material = value;
            if (this.material)
                this.material.iAddOwner(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineSegment.prototype, "thickness", {
        /**
         *
         */
        get: function () {
            return this._halfThickness * 2;
        },
        set: function (value) {
            if (this._halfThickness == value)
                return;
            this._halfThickness = value * 0.5;
            this.notifyRenderableUpdate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineSegment.prototype, "uvTransform", {
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
    LineSegment.prototype.dispose = function () {
        this._startPosition = null;
        this._endPosition = null;
    };
    /**
     * @protected
     */
    LineSegment.prototype._pUpdateBoxBounds = function () {
        _super.prototype._pUpdateBoxBounds.call(this);
        this._pBoxBounds.x = Math.min(this._startPosition.x, this._endPosition.x);
        this._pBoxBounds.y = Math.min(this._startPosition.y, this._endPosition.y);
        this._pBoxBounds.z = Math.min(this._startPosition.z, this._endPosition.z);
        this._pBoxBounds.width = Math.abs(this._startPosition.x - this._endPosition.x);
        this._pBoxBounds.height = Math.abs(this._startPosition.y - this._endPosition.y);
        this._pBoxBounds.depth = Math.abs(this._startPosition.z - this._endPosition.z);
    };
    LineSegment.prototype._pUpdateSphereBounds = function () {
        _super.prototype._pUpdateSphereBounds.call(this);
        this._pUpdateBoxBounds();
        var halfWidth = (this._endPosition.x - this._startPosition.x) / 2;
        var halfHeight = (this._endPosition.y - this._startPosition.y) / 2;
        var halfDepth = (this._endPosition.z - this._startPosition.z) / 2;
        this._pSphereBounds.x = this._startPosition.x + halfWidth;
        this._pSphereBounds.y = this._startPosition.y + halfHeight;
        this._pSphereBounds.z = this._startPosition.z + halfDepth;
        this._pSphereBounds.radius = Math.sqrt(halfWidth * halfWidth + halfHeight * halfHeight + halfDepth * halfDepth);
    };
    /**
     * @private
     */
    LineSegment.prototype.notifyRenderableUpdate = function () {
        var len = this._pRenderables.length;
        for (var i = 0; i < len; i++)
            this._pRenderables[i].invalidateGeometry();
    };
    LineSegment.prototype._iCollectRenderables = function (rendererPool) {
        // Since this getter is invoked every iteration of the render loop, and
        // the prefab construct could affect the sub-meshes, the prefab is
        // validated here to give it a chance to rebuild.
        if (this._iSourcePrefab)
            this._iSourcePrefab._iValidate();
        this._iCollectRenderable(rendererPool);
    };
    LineSegment.prototype._iCollectRenderable = function (rendererPool) {
        rendererPool.applyLineSegment(this);
    };
    LineSegment.prototype._pRegisterEntity = function (partition) {
        partition._iRegisterEntity(this);
    };
    LineSegment.prototype._pUnregisterEntity = function (partition) {
        partition._iUnregisterEntity(this);
    };
    return LineSegment;
})(DisplayObject);
module.exports = LineSegment;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9MaW5lU2VnbWVudC50cyJdLCJuYW1lcyI6WyJMaW5lU2VnbWVudCIsIkxpbmVTZWdtZW50LmNvbnN0cnVjdG9yIiwiTGluZVNlZ21lbnQuYW5pbWF0b3IiLCJMaW5lU2VnbWVudC5hc3NldFR5cGUiLCJMaW5lU2VnbWVudC5zdGFydFBvc3Rpb24iLCJMaW5lU2VnbWVudC5zdGFydFBvc2l0aW9uIiwiTGluZVNlZ21lbnQuZW5kUG9zaXRpb24iLCJMaW5lU2VnbWVudC5tYXRlcmlhbCIsIkxpbmVTZWdtZW50LnRoaWNrbmVzcyIsIkxpbmVTZWdtZW50LnV2VHJhbnNmb3JtIiwiTGluZVNlZ21lbnQuZGlzcG9zZSIsIkxpbmVTZWdtZW50Ll9wVXBkYXRlQm94Qm91bmRzIiwiTGluZVNlZ21lbnQuX3BVcGRhdGVTcGhlcmVCb3VuZHMiLCJMaW5lU2VnbWVudC5ub3RpZnlSZW5kZXJhYmxlVXBkYXRlIiwiTGluZVNlZ21lbnQuX2lDb2xsZWN0UmVuZGVyYWJsZXMiLCJMaW5lU2VnbWVudC5faUNvbGxlY3RSZW5kZXJhYmxlIiwiTGluZVNlZ21lbnQuX3BSZWdpc3RlckVudGl0eSIsIkxpbmVTZWdtZW50Ll9wVW5yZWdpc3RlckVudGl0eSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBR0EsSUFBTyxTQUFTLFdBQWUsbUNBQW1DLENBQUMsQ0FBQztBQUdwRSxJQUFPLGFBQWEsV0FBYyx1Q0FBdUMsQ0FBQyxDQUFDO0FBRTNFLElBQU8sVUFBVSxXQUFlLHNDQUFzQyxDQUFDLENBQUM7QUFReEUsQUFHQTs7R0FERztJQUNHLFdBQVc7SUFBU0EsVUFBcEJBLFdBQVdBLFVBQXNCQTtJQWlIdENBOzs7Ozs7T0FNR0E7SUFDSEEsU0F4SEtBLFdBQVdBLENBd0hKQSxRQUFxQkEsRUFBRUEsYUFBc0JBLEVBQUVBLFdBQW9CQSxFQUFFQSxTQUFvQkE7UUFBcEJDLHlCQUFvQkEsR0FBcEJBLGFBQW9CQTtRQUVwR0EsaUJBQU9BLENB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bUJBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBO0lBQ3hDQSxDQUFDQTtJQUVNZCx5Q0FBbUJBLEdBQTFCQSxVQUEyQkEsWUFBMEJBO1FBRXBEZSxZQUFZQSxDQUFDQSxnQkFBZ0JBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO0lBQ3JDQSxDQUFDQTtJQUVNZixzQ0FBZ0JBLEdBQXZCQSxVQUF3QkEsU0FBbUJBO1FBRTFDZ0IsU0FBU0EsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtJQUNsQ0EsQ0FBQ0E7SUFFTWhCLHdDQUFrQkEsR0FBekJBLFVBQTBCQSxTQUFtQkE7UUFFNUNpQixTQUFTQSxDQUFDQSxrQkFBa0JBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO0lBQ3BDQSxDQUFDQTtJQUNGakIsa0JBQUNBO0FBQURBLENBL01BLEFBK01DQSxFQS9NeUIsYUFBYSxFQStNdEM7QUFFRCxBQUFxQixpQkFBWixXQUFXLENBQUMiLCJmaWxlIjoiZW50aXRpZXMvTGluZVNlZ21lbnQuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsi77u/aW1wb3J0IE1hdHJpeDNEXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vTWF0cml4M0RcIik7XHJcbmltcG9ydCBVVlRyYW5zZm9ybVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9VVlRyYW5zZm9ybVwiKTtcclxuaW1wb3J0IFZlY3RvcjNEXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vVmVjdG9yM0RcIik7XHJcbmltcG9ydCBBc3NldFR5cGVcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvQXNzZXRUeXBlXCIpO1xyXG5cclxuaW1wb3J0IElBbmltYXRvclx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYW5pbWF0b3JzL0lBbmltYXRvclwiKTtcclxuaW1wb3J0IERpc3BsYXlPYmplY3RcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0Rpc3BsYXlPYmplY3RcIik7XHJcbmltcG9ydCBJUmVuZGVyYWJsZU93bmVyXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9JUmVuZGVyYWJsZU93bmVyXCIpO1xyXG5pbXBvcnQgQm91bmRzVHlwZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYm91bmRzL0JvdW5kc1R5cGVcIik7XHJcbmltcG9ydCBQYXJ0aXRpb25cdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3BhcnRpdGlvbi9QYXJ0aXRpb25cIik7XHJcbmltcG9ydCBFbnRpdHlOb2RlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vRW50aXR5Tm9kZVwiKTtcclxuaW1wb3J0IElSZW5kZXJlclBvb2xcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wb29sL0lSZW5kZXJlclBvb2xcIik7XHJcbmltcG9ydCBNYXRlcmlhbEV2ZW50XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZXZlbnRzL01hdGVyaWFsRXZlbnRcIik7XHJcbmltcG9ydCBJRW50aXR5XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2VudGl0aWVzL0lFbnRpdHlcIik7XHJcbmltcG9ydCBNYXRlcmlhbEJhc2VcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL21hdGVyaWFscy9NYXRlcmlhbEJhc2VcIik7XHJcblxyXG4vKipcclxuICogQSBMaW5lIFNlZ21lbnQgcHJpbWl0aXZlLlxyXG4gKi9cclxuY2xhc3MgTGluZVNlZ21lbnQgZXh0ZW5kcyBEaXNwbGF5T2JqZWN0IGltcGxlbWVudHMgSUVudGl0eSwgSVJlbmRlcmFibGVPd25lclxyXG57XHJcblx0cHJpdmF0ZSBfYW5pbWF0b3I6SUFuaW1hdG9yO1xyXG5cdHByaXZhdGUgX21hdGVyaWFsOk1hdGVyaWFsQmFzZTtcclxuXHRwcml2YXRlIF91dlRyYW5zZm9ybTpVVlRyYW5zZm9ybTtcclxuXHJcblx0cHVibGljIF9zdGFydFBvc2l0aW9uOlZlY3RvcjNEO1xyXG5cdHB1YmxpYyBfZW5kUG9zaXRpb246VmVjdG9yM0Q7XHJcblx0cHVibGljIF9oYWxmVGhpY2tuZXNzOm51bWJlcjtcclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIERlZmluZXMgdGhlIGFuaW1hdG9yIG9mIHRoZSBsaW5lIHNlZ21lbnQuIEFjdCBvbiB0aGUgbGluZSBzZWdtZW50J3MgZ2VvbWV0cnkuIERlZmF1bHRzIHRvIG51bGxcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGFuaW1hdG9yKCk6SUFuaW1hdG9yXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2FuaW1hdG9yO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGFzc2V0VHlwZSgpOnN0cmluZ1xyXG5cdHtcclxuXHRcdHJldHVybiBBc3NldFR5cGUuTElORV9TRUdNRU5UO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHN0YXJ0UG9zdGlvbigpOlZlY3RvcjNEXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3N0YXJ0UG9zaXRpb247XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHN0YXJ0UG9zaXRpb24odmFsdWU6VmVjdG9yM0QpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX3N0YXJ0UG9zaXRpb24gPT0gdmFsdWUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9zdGFydFBvc2l0aW9uID0gdmFsdWU7XHJcblxyXG5cdFx0dGhpcy5ub3RpZnlSZW5kZXJhYmxlVXBkYXRlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgZW5kUG9zaXRpb24oKTpWZWN0b3IzRFxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9lbmRQb3NpdGlvbjtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgZW5kUG9zaXRpb24odmFsdWU6VmVjdG9yM0QpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX2VuZFBvc2l0aW9uID09IHZhbHVlKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fZW5kUG9zaXRpb24gPSB2YWx1ZTtcclxuXHJcblx0XHR0aGlzLm5vdGlmeVJlbmRlcmFibGVVcGRhdGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCBtYXRlcmlhbCgpOk1hdGVyaWFsQmFzZVxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9tYXRlcmlhbDtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgbWF0ZXJpYWwodmFsdWU6TWF0ZXJpYWxCYXNlKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLm1hdGVyaWFsKVxyXG5cdFx0XHR0aGlzLm1hdGVyaWFsLmlSZW1vdmVPd25lcih0aGlzKTtcclxuXHJcblx0XHR0aGlzLl9tYXRlcmlhbCA9IHZhbHVlO1xyXG5cclxuXHRcdGlmICh0aGlzLm1hdGVyaWFsKVxyXG5cdFx0XHR0aGlzLm1hdGVyaWFsLmlBZGRPd25lcih0aGlzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCB0aGlja25lc3MoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5faGFsZlRoaWNrbmVzcyoyO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCB0aGlja25lc3ModmFsdWU6bnVtYmVyKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9oYWxmVGhpY2tuZXNzID09IHZhbHVlKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5faGFsZlRoaWNrbmVzcyA9IHZhbHVlKjAuNTtcclxuXHJcblx0XHR0aGlzLm5vdGlmeVJlbmRlcmFibGVVcGRhdGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCB1dlRyYW5zZm9ybSgpOlVWVHJhbnNmb3JtXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3V2VHJhbnNmb3JtO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCB1dlRyYW5zZm9ybSh2YWx1ZTpVVlRyYW5zZm9ybSlcclxuXHR7XHJcblx0XHR0aGlzLl91dlRyYW5zZm9ybSA9IHZhbHVlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlIGEgbGluZSBzZWdtZW50XHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3RhcnRQb3NpdGlvbiBTdGFydCBwb3NpdGlvbiBvZiB0aGUgbGluZSBzZWdtZW50XHJcblx0ICogQHBhcmFtIGVuZFBvc2l0aW9uIEVuZGluZyBwb3NpdGlvbiBvZiB0aGUgbGluZSBzZWdtZW50XHJcblx0ICogQHBhcmFtIHRoaWNrbmVzcyBUaGlja25lc3Mgb2YgdGhlIGxpbmVcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcihtYXRlcmlhbDpNYXRlcmlhbEJhc2UsIHN0YXJ0UG9zaXRpb246VmVjdG9yM0QsIGVuZFBvc2l0aW9uOlZlY3RvcjNELCB0aGlja25lc3M6bnVtYmVyID0gMSlcclxuXHR7XHJcblx0XHRzdXBlcigpO1xyXG5cclxuXHRcdHRoaXMuX3BJc0VudGl0eSA9IHRydWU7XHJcblxyXG5cdFx0dGhpcy5tYXRlcmlhbCA9IG1hdGVyaWFsO1xyXG5cclxuXHRcdHRoaXMuX3N0YXJ0UG9zaXRpb24gPSBzdGFydFBvc2l0aW9uO1xyXG5cdFx0dGhpcy5fZW5kUG9zaXRpb24gPSBlbmRQb3NpdGlvbjtcclxuXHRcdHRoaXMuX2hhbGZUaGlja25lc3MgPSB0aGlja25lc3MqMC41O1xyXG5cclxuXHRcdC8vZGVmYXVsdCBib3VuZHMgdHlwZVxyXG5cdFx0dGhpcy5fYm91bmRzVHlwZSA9IEJvdW5kc1R5cGUuQVhJU19BTElHTkVEX0JPWDtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBkaXNwb3NlKClcclxuXHR7XHJcblx0XHR0aGlzLl9zdGFydFBvc2l0aW9uID0gbnVsbDtcclxuXHRcdHRoaXMuX2VuZFBvc2l0aW9uID0gbnVsbDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwcm90ZWN0ZWRcclxuXHQgKi9cclxuXHRwdWJsaWMgX3BVcGRhdGVCb3hCb3VuZHMoKVxyXG5cdHtcclxuXHRcdHN1cGVyLl9wVXBkYXRlQm94Qm91bmRzKCk7XHJcblxyXG5cdFx0dGhpcy5fcEJveEJvdW5kcy54ID0gTWF0aC5taW4odGhpcy5fc3RhcnRQb3NpdGlvbi54LCB0aGlzLl9lbmRQb3NpdGlvbi54KTtcclxuXHRcdHRoaXMuX3BCb3hCb3VuZHMueSA9IE1hdGgubWluKHRoaXMuX3N0YXJ0UG9zaXRpb24ueSwgdGhpcy5fZW5kUG9zaXRpb24ueSk7XHJcblx0XHR0aGlzLl9wQm94Qm91bmRzLnogPSBNYXRoLm1pbih0aGlzLl9zdGFydFBvc2l0aW9uLnosIHRoaXMuX2VuZFBvc2l0aW9uLnopO1xyXG5cdFx0dGhpcy5fcEJveEJvdW5kcy53aWR0aCA9IE1hdGguYWJzKHRoaXMuX3N0YXJ0UG9zaXRpb24ueCAtIHRoaXMuX2VuZFBvc2l0aW9uLngpO1xyXG5cdFx0dGhpcy5fcEJveEJvdW5kcy5oZWlnaHQgPSBNYXRoLmFicyh0aGlzLl9zdGFydFBvc2l0aW9uLnkgLSB0aGlzLl9lbmRQb3NpdGlvbi55KTtcclxuXHRcdHRoaXMuX3BCb3hCb3VuZHMuZGVwdGggPSBNYXRoLmFicyh0aGlzLl9zdGFydFBvc2l0aW9uLnogLSB0aGlzLl9lbmRQb3NpdGlvbi56KTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBfcFVwZGF0ZVNwaGVyZUJvdW5kcygpXHJcblx0e1xyXG5cdFx0c3VwZXIuX3BVcGRhdGVTcGhlcmVCb3VuZHMoKTtcclxuXHJcblx0XHR0aGlzLl9wVXBkYXRlQm94Qm91bmRzKCk7XHJcblxyXG5cdFx0dmFyIGhhbGZXaWR0aDpudW1iZXIgPSAodGhpcy5fZW5kUG9zaXRpb24ueCAtIHRoaXMuX3N0YXJ0UG9zaXRpb24ueCkvMjtcclxuXHRcdHZhciBoYWxmSGVpZ2h0Om51bWJlciA9ICh0aGlzLl9lbmRQb3NpdGlvbi55IC0gdGhpcy5fc3RhcnRQb3NpdGlvbi55KS8yO1xyXG5cdFx0dmFyIGhhbGZEZXB0aDpudW1iZXIgPSAodGhpcy5fZW5kUG9zaXRpb24ueiAtIHRoaXMuX3N0YXJ0UG9zaXRpb24ueikvMjtcclxuXHRcdHRoaXMuX3BTcGhlcmVCb3VuZHMueCA9IHRoaXMuX3N0YXJ0UG9zaXRpb24ueCArIGhhbGZXaWR0aDtcclxuXHRcdHRoaXMuX3BTcGhlcmVCb3VuZHMueSA9IHRoaXMuX3N0YXJ0UG9zaXRpb24ueSArIGhhbGZIZWlnaHQ7XHJcblx0XHR0aGlzLl9wU3BoZXJlQm91bmRzLnogPSB0aGlzLl9zdGFydFBvc2l0aW9uLnogKyBoYWxmRGVwdGg7XHJcblx0XHR0aGlzLl9wU3BoZXJlQm91bmRzLnJhZGl1cyA9IE1hdGguc3FydChoYWxmV2lkdGgqaGFsZldpZHRoICsgaGFsZkhlaWdodCpoYWxmSGVpZ2h0ICsgaGFsZkRlcHRoKmhhbGZEZXB0aCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgbm90aWZ5UmVuZGVyYWJsZVVwZGF0ZSgpXHJcblx0e1xyXG5cdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9wUmVuZGVyYWJsZXMubGVuZ3RoO1xyXG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgbGVuOyBpKyspXHJcblx0XHRcdHRoaXMuX3BSZW5kZXJhYmxlc1tpXS5pbnZhbGlkYXRlR2VvbWV0cnkoKTsgLy9UT0RPIGltcHJvdmUgcGVyZm9ybWFuY2UgYnkgb25seSB1c2luZyBvbmUgZ2VvbWV0cnkgZm9yIGFsbCBsaW5lIHNlZ21lbnRzXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgX2lDb2xsZWN0UmVuZGVyYWJsZXMocmVuZGVyZXJQb29sOklSZW5kZXJlclBvb2wpXHJcblx0e1xyXG5cdFx0Ly8gU2luY2UgdGhpcyBnZXR0ZXIgaXMgaW52b2tlZCBldmVyeSBpdGVyYXRpb24gb2YgdGhlIHJlbmRlciBsb29wLCBhbmRcclxuXHRcdC8vIHRoZSBwcmVmYWIgY29uc3RydWN0IGNvdWxkIGFmZmVjdCB0aGUgc3ViLW1lc2hlcywgdGhlIHByZWZhYiBpc1xyXG5cdFx0Ly8gdmFsaWRhdGVkIGhlcmUgdG8gZ2l2ZSBpdCBhIGNoYW5jZSB0byByZWJ1aWxkLlxyXG5cdFx0aWYgKHRoaXMuX2lTb3VyY2VQcmVmYWIpXHJcblx0XHRcdHRoaXMuX2lTb3VyY2VQcmVmYWIuX2lWYWxpZGF0ZSgpO1xyXG5cclxuXHRcdHRoaXMuX2lDb2xsZWN0UmVuZGVyYWJsZShyZW5kZXJlclBvb2wpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIF9pQ29sbGVjdFJlbmRlcmFibGUocmVuZGVyZXJQb29sOklSZW5kZXJlclBvb2wpXHJcblx0e1xyXG5cdFx0cmVuZGVyZXJQb29sLmFwcGx5TGluZVNlZ21lbnQodGhpcyk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgX3BSZWdpc3RlckVudGl0eShwYXJ0aXRpb246UGFydGl0aW9uKVxyXG5cdHtcclxuXHRcdHBhcnRpdGlvbi5faVJlZ2lzdGVyRW50aXR5KHRoaXMpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIF9wVW5yZWdpc3RlckVudGl0eShwYXJ0aXRpb246UGFydGl0aW9uKVxyXG5cdHtcclxuXHRcdHBhcnRpdGlvbi5faVVucmVnaXN0ZXJFbnRpdHkodGhpcyk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgPSBMaW5lU2VnbWVudDsiXX0=