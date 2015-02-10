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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9saW5lc2VnbWVudC50cyJdLCJuYW1lcyI6WyJMaW5lU2VnbWVudCIsIkxpbmVTZWdtZW50LmNvbnN0cnVjdG9yIiwiTGluZVNlZ21lbnQuYW5pbWF0b3IiLCJMaW5lU2VnbWVudC5hc3NldFR5cGUiLCJMaW5lU2VnbWVudC5zdGFydFBvc3Rpb24iLCJMaW5lU2VnbWVudC5zdGFydFBvc2l0aW9uIiwiTGluZVNlZ21lbnQuZW5kUG9zaXRpb24iLCJMaW5lU2VnbWVudC5tYXRlcmlhbCIsIkxpbmVTZWdtZW50LnRoaWNrbmVzcyIsIkxpbmVTZWdtZW50LnV2VHJhbnNmb3JtIiwiTGluZVNlZ21lbnQuZGlzcG9zZSIsIkxpbmVTZWdtZW50Ll9wVXBkYXRlQm94Qm91bmRzIiwiTGluZVNlZ21lbnQuX3BVcGRhdGVTcGhlcmVCb3VuZHMiLCJMaW5lU2VnbWVudC5ub3RpZnlSZW5kZXJhYmxlVXBkYXRlIiwiTGluZVNlZ21lbnQuX2lDb2xsZWN0UmVuZGVyYWJsZXMiLCJMaW5lU2VnbWVudC5faUNvbGxlY3RSZW5kZXJhYmxlIiwiTGluZVNlZ21lbnQuX3BSZWdpc3RlckVudGl0eSIsIkxpbmVTZWdtZW50Ll9wVW5yZWdpc3RlckVudGl0eSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBR0EsSUFBTyxTQUFTLFdBQWUsbUNBQW1DLENBQUMsQ0FBQztBQUdwRSxJQUFPLGFBQWEsV0FBYyx1Q0FBdUMsQ0FBQyxDQUFDO0FBRTNFLElBQU8sVUFBVSxXQUFlLHNDQUFzQyxDQUFDLENBQUM7QUFReEUsQUFHQTs7R0FERztJQUNHLFdBQVc7SUFBU0EsVUFBcEJBLFdBQVdBLFVBQXNCQTtJQWlIdENBOzs7Ozs7T0FNR0E7SUFDSEEsU0F4SEtBLFdBQVdBLENBd0hKQSxRQUFxQkEsRUFBRUEsYUFBc0JBLEVBQUVBLFdBQW9CQSxFQUFFQSxTQUFvQkE7UUFBcEJDLHlCQUFvQkEsR0FBcEJBLGFBQW9CQTtRQUVwR0EsaUJBQU9BLENB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bUJBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBO0lBQ3hDQSxDQUFDQTtJQUVNZCx5Q0FBbUJBLEdBQTFCQSxVQUEyQkEsWUFBMEJBO1FBRXBEZSxZQUFZQSxDQUFDQSxnQkFBZ0JBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO0lBQ3JDQSxDQUFDQTtJQUVNZixzQ0FBZ0JBLEdBQXZCQSxVQUF3QkEsU0FBbUJBO1FBRTFDZ0IsU0FBU0EsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtJQUNsQ0EsQ0FBQ0E7SUFFTWhCLHdDQUFrQkEsR0FBekJBLFVBQTBCQSxTQUFtQkE7UUFFNUNpQixTQUFTQSxDQUFDQSxrQkFBa0JBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO0lBQ3BDQSxDQUFDQTtJQUNGakIsa0JBQUNBO0FBQURBLENBL01BLEFBK01DQSxFQS9NeUIsYUFBYSxFQStNdEM7QUFFRCxBQUFxQixpQkFBWixXQUFXLENBQUMiLCJmaWxlIjoiZW50aXRpZXMvTGluZVNlZ21lbnQuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsi77u/aW1wb3J0IE1hdHJpeDNEXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vTWF0cml4M0RcIik7XG5pbXBvcnQgVVZUcmFuc2Zvcm1cdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vVVZUcmFuc2Zvcm1cIik7XG5pbXBvcnQgVmVjdG9yM0RcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9WZWN0b3IzRFwiKTtcbmltcG9ydCBBc3NldFR5cGVcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvQXNzZXRUeXBlXCIpO1xuXG5pbXBvcnQgSUFuaW1hdG9yXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9hbmltYXRvcnMvSUFuaW1hdG9yXCIpO1xuaW1wb3J0IERpc3BsYXlPYmplY3RcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0Rpc3BsYXlPYmplY3RcIik7XG5pbXBvcnQgSVJlbmRlcmFibGVPd25lclx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvSVJlbmRlcmFibGVPd25lclwiKTtcbmltcG9ydCBCb3VuZHNUeXBlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9ib3VuZHMvQm91bmRzVHlwZVwiKTtcbmltcG9ydCBQYXJ0aXRpb25cdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3BhcnRpdGlvbi9QYXJ0aXRpb25cIik7XG5pbXBvcnQgRW50aXR5Tm9kZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcGFydGl0aW9uL0VudGl0eU5vZGVcIik7XG5pbXBvcnQgSVJlbmRlcmVyUG9vbFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3Bvb2wvSVJlbmRlcmVyUG9vbFwiKTtcbmltcG9ydCBNYXRlcmlhbEV2ZW50XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZXZlbnRzL01hdGVyaWFsRXZlbnRcIik7XG5pbXBvcnQgSUVudGl0eVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9JRW50aXR5XCIpO1xuaW1wb3J0IE1hdGVyaWFsQmFzZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvbWF0ZXJpYWxzL01hdGVyaWFsQmFzZVwiKTtcblxuLyoqXG4gKiBBIExpbmUgU2VnbWVudCBwcmltaXRpdmUuXG4gKi9cbmNsYXNzIExpbmVTZWdtZW50IGV4dGVuZHMgRGlzcGxheU9iamVjdCBpbXBsZW1lbnRzIElFbnRpdHksIElSZW5kZXJhYmxlT3duZXJcbntcblx0cHJpdmF0ZSBfYW5pbWF0b3I6SUFuaW1hdG9yO1xuXHRwcml2YXRlIF9tYXRlcmlhbDpNYXRlcmlhbEJhc2U7XG5cdHByaXZhdGUgX3V2VHJhbnNmb3JtOlVWVHJhbnNmb3JtO1xuXG5cdHB1YmxpYyBfc3RhcnRQb3NpdGlvbjpWZWN0b3IzRDtcblx0cHVibGljIF9lbmRQb3NpdGlvbjpWZWN0b3IzRDtcblx0cHVibGljIF9oYWxmVGhpY2tuZXNzOm51bWJlcjtcblxuXG5cdC8qKlxuXHQgKiBEZWZpbmVzIHRoZSBhbmltYXRvciBvZiB0aGUgbGluZSBzZWdtZW50LiBBY3Qgb24gdGhlIGxpbmUgc2VnbWVudCdzIGdlb21ldHJ5LiBEZWZhdWx0cyB0byBudWxsXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGFuaW1hdG9yKCk6SUFuaW1hdG9yXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fYW5pbWF0b3I7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgYXNzZXRUeXBlKCk6c3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gQXNzZXRUeXBlLkxJTkVfU0VHTUVOVDtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBzdGFydFBvc3Rpb24oKTpWZWN0b3IzRFxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3N0YXJ0UG9zaXRpb247XG5cdH1cblxuXHRwdWJsaWMgc2V0IHN0YXJ0UG9zaXRpb24odmFsdWU6VmVjdG9yM0QpXG5cdHtcblx0XHRpZiAodGhpcy5fc3RhcnRQb3NpdGlvbiA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3N0YXJ0UG9zaXRpb24gPSB2YWx1ZTtcblxuXHRcdHRoaXMubm90aWZ5UmVuZGVyYWJsZVVwZGF0ZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGVuZFBvc2l0aW9uKCk6VmVjdG9yM0Rcblx0e1xuXHRcdHJldHVybiB0aGlzLl9lbmRQb3NpdGlvbjtcblx0fVxuXG5cdHB1YmxpYyBzZXQgZW5kUG9zaXRpb24odmFsdWU6VmVjdG9yM0QpXG5cdHtcblx0XHRpZiAodGhpcy5fZW5kUG9zaXRpb24gPT0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9lbmRQb3NpdGlvbiA9IHZhbHVlO1xuXG5cdFx0dGhpcy5ub3RpZnlSZW5kZXJhYmxlVXBkYXRlKCk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgbWF0ZXJpYWwoKTpNYXRlcmlhbEJhc2Vcblx0e1xuXHRcdHJldHVybiB0aGlzLl9tYXRlcmlhbDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgbWF0ZXJpYWwodmFsdWU6TWF0ZXJpYWxCYXNlKVxuXHR7XG5cdFx0aWYgKHRoaXMubWF0ZXJpYWwpXG5cdFx0XHR0aGlzLm1hdGVyaWFsLmlSZW1vdmVPd25lcih0aGlzKTtcblxuXHRcdHRoaXMuX21hdGVyaWFsID0gdmFsdWU7XG5cblx0XHRpZiAodGhpcy5tYXRlcmlhbClcblx0XHRcdHRoaXMubWF0ZXJpYWwuaUFkZE93bmVyKHRoaXMpO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHRoaWNrbmVzcygpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2hhbGZUaGlja25lc3MqMjtcblx0fVxuXG5cdHB1YmxpYyBzZXQgdGhpY2tuZXNzKHZhbHVlOm51bWJlcilcblx0e1xuXHRcdGlmICh0aGlzLl9oYWxmVGhpY2tuZXNzID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5faGFsZlRoaWNrbmVzcyA9IHZhbHVlKjAuNTtcblxuXHRcdHRoaXMubm90aWZ5UmVuZGVyYWJsZVVwZGF0ZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHV2VHJhbnNmb3JtKCk6VVZUcmFuc2Zvcm1cblx0e1xuXHRcdHJldHVybiB0aGlzLl91dlRyYW5zZm9ybTtcblx0fVxuXG5cdHB1YmxpYyBzZXQgdXZUcmFuc2Zvcm0odmFsdWU6VVZUcmFuc2Zvcm0pXG5cdHtcblx0XHR0aGlzLl91dlRyYW5zZm9ybSA9IHZhbHVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZSBhIGxpbmUgc2VnbWVudFxuXHQgKlxuXHQgKiBAcGFyYW0gc3RhcnRQb3NpdGlvbiBTdGFydCBwb3NpdGlvbiBvZiB0aGUgbGluZSBzZWdtZW50XG5cdCAqIEBwYXJhbSBlbmRQb3NpdGlvbiBFbmRpbmcgcG9zaXRpb24gb2YgdGhlIGxpbmUgc2VnbWVudFxuXHQgKiBAcGFyYW0gdGhpY2tuZXNzIFRoaWNrbmVzcyBvZiB0aGUgbGluZVxuXHQgKi9cblx0Y29uc3RydWN0b3IobWF0ZXJpYWw6TWF0ZXJpYWxCYXNlLCBzdGFydFBvc2l0aW9uOlZlY3RvcjNELCBlbmRQb3NpdGlvbjpWZWN0b3IzRCwgdGhpY2tuZXNzOm51bWJlciA9IDEpXG5cdHtcblx0XHRzdXBlcigpO1xuXG5cdFx0dGhpcy5fcElzRW50aXR5ID0gdHJ1ZTtcblxuXHRcdHRoaXMubWF0ZXJpYWwgPSBtYXRlcmlhbDtcblxuXHRcdHRoaXMuX3N0YXJ0UG9zaXRpb24gPSBzdGFydFBvc2l0aW9uO1xuXHRcdHRoaXMuX2VuZFBvc2l0aW9uID0gZW5kUG9zaXRpb247XG5cdFx0dGhpcy5faGFsZlRoaWNrbmVzcyA9IHRoaWNrbmVzcyowLjU7XG5cblx0XHQvL2RlZmF1bHQgYm91bmRzIHR5cGVcblx0XHR0aGlzLl9ib3VuZHNUeXBlID0gQm91bmRzVHlwZS5BWElTX0FMSUdORURfQk9YO1xuXHR9XG5cblx0cHVibGljIGRpc3Bvc2UoKVxuXHR7XG5cdFx0dGhpcy5fc3RhcnRQb3NpdGlvbiA9IG51bGw7XG5cdFx0dGhpcy5fZW5kUG9zaXRpb24gPSBudWxsO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwcm90ZWN0ZWRcblx0ICovXG5cdHB1YmxpYyBfcFVwZGF0ZUJveEJvdW5kcygpXG5cdHtcblx0XHRzdXBlci5fcFVwZGF0ZUJveEJvdW5kcygpO1xuXG5cdFx0dGhpcy5fcEJveEJvdW5kcy54ID0gTWF0aC5taW4odGhpcy5fc3RhcnRQb3NpdGlvbi54LCB0aGlzLl9lbmRQb3NpdGlvbi54KTtcblx0XHR0aGlzLl9wQm94Qm91bmRzLnkgPSBNYXRoLm1pbih0aGlzLl9zdGFydFBvc2l0aW9uLnksIHRoaXMuX2VuZFBvc2l0aW9uLnkpO1xuXHRcdHRoaXMuX3BCb3hCb3VuZHMueiA9IE1hdGgubWluKHRoaXMuX3N0YXJ0UG9zaXRpb24ueiwgdGhpcy5fZW5kUG9zaXRpb24ueik7XG5cdFx0dGhpcy5fcEJveEJvdW5kcy53aWR0aCA9IE1hdGguYWJzKHRoaXMuX3N0YXJ0UG9zaXRpb24ueCAtIHRoaXMuX2VuZFBvc2l0aW9uLngpO1xuXHRcdHRoaXMuX3BCb3hCb3VuZHMuaGVpZ2h0ID0gTWF0aC5hYnModGhpcy5fc3RhcnRQb3NpdGlvbi55IC0gdGhpcy5fZW5kUG9zaXRpb24ueSk7XG5cdFx0dGhpcy5fcEJveEJvdW5kcy5kZXB0aCA9IE1hdGguYWJzKHRoaXMuX3N0YXJ0UG9zaXRpb24ueiAtIHRoaXMuX2VuZFBvc2l0aW9uLnopO1xuXHR9XG5cblx0cHVibGljIF9wVXBkYXRlU3BoZXJlQm91bmRzKClcblx0e1xuXHRcdHN1cGVyLl9wVXBkYXRlU3BoZXJlQm91bmRzKCk7XG5cblx0XHR0aGlzLl9wVXBkYXRlQm94Qm91bmRzKCk7XG5cblx0XHR2YXIgaGFsZldpZHRoOm51bWJlciA9ICh0aGlzLl9lbmRQb3NpdGlvbi54IC0gdGhpcy5fc3RhcnRQb3NpdGlvbi54KS8yO1xuXHRcdHZhciBoYWxmSGVpZ2h0Om51bWJlciA9ICh0aGlzLl9lbmRQb3NpdGlvbi55IC0gdGhpcy5fc3RhcnRQb3NpdGlvbi55KS8yO1xuXHRcdHZhciBoYWxmRGVwdGg6bnVtYmVyID0gKHRoaXMuX2VuZFBvc2l0aW9uLnogLSB0aGlzLl9zdGFydFBvc2l0aW9uLnopLzI7XG5cdFx0dGhpcy5fcFNwaGVyZUJvdW5kcy54ID0gdGhpcy5fc3RhcnRQb3NpdGlvbi54ICsgaGFsZldpZHRoO1xuXHRcdHRoaXMuX3BTcGhlcmVCb3VuZHMueSA9IHRoaXMuX3N0YXJ0UG9zaXRpb24ueSArIGhhbGZIZWlnaHQ7XG5cdFx0dGhpcy5fcFNwaGVyZUJvdW5kcy56ID0gdGhpcy5fc3RhcnRQb3NpdGlvbi56ICsgaGFsZkRlcHRoO1xuXHRcdHRoaXMuX3BTcGhlcmVCb3VuZHMucmFkaXVzID0gTWF0aC5zcXJ0KGhhbGZXaWR0aCpoYWxmV2lkdGggKyBoYWxmSGVpZ2h0KmhhbGZIZWlnaHQgKyBoYWxmRGVwdGgqaGFsZkRlcHRoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0cHJpdmF0ZSBub3RpZnlSZW5kZXJhYmxlVXBkYXRlKClcblx0e1xuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fcFJlbmRlcmFibGVzLmxlbmd0aDtcblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBsZW47IGkrKylcblx0XHRcdHRoaXMuX3BSZW5kZXJhYmxlc1tpXS5pbnZhbGlkYXRlR2VvbWV0cnkoKTsgLy9UT0RPIGltcHJvdmUgcGVyZm9ybWFuY2UgYnkgb25seSB1c2luZyBvbmUgZ2VvbWV0cnkgZm9yIGFsbCBsaW5lIHNlZ21lbnRzXG5cdH1cblxuXHRwdWJsaWMgX2lDb2xsZWN0UmVuZGVyYWJsZXMocmVuZGVyZXJQb29sOklSZW5kZXJlclBvb2wpXG5cdHtcblx0XHQvLyBTaW5jZSB0aGlzIGdldHRlciBpcyBpbnZva2VkIGV2ZXJ5IGl0ZXJhdGlvbiBvZiB0aGUgcmVuZGVyIGxvb3AsIGFuZFxuXHRcdC8vIHRoZSBwcmVmYWIgY29uc3RydWN0IGNvdWxkIGFmZmVjdCB0aGUgc3ViLW1lc2hlcywgdGhlIHByZWZhYiBpc1xuXHRcdC8vIHZhbGlkYXRlZCBoZXJlIHRvIGdpdmUgaXQgYSBjaGFuY2UgdG8gcmVidWlsZC5cblx0XHRpZiAodGhpcy5faVNvdXJjZVByZWZhYilcblx0XHRcdHRoaXMuX2lTb3VyY2VQcmVmYWIuX2lWYWxpZGF0ZSgpO1xuXG5cdFx0dGhpcy5faUNvbGxlY3RSZW5kZXJhYmxlKHJlbmRlcmVyUG9vbCk7XG5cdH1cblxuXHRwdWJsaWMgX2lDb2xsZWN0UmVuZGVyYWJsZShyZW5kZXJlclBvb2w6SVJlbmRlcmVyUG9vbClcblx0e1xuXHRcdHJlbmRlcmVyUG9vbC5hcHBseUxpbmVTZWdtZW50KHRoaXMpO1xuXHR9XG5cblx0cHVibGljIF9wUmVnaXN0ZXJFbnRpdHkocGFydGl0aW9uOlBhcnRpdGlvbilcblx0e1xuXHRcdHBhcnRpdGlvbi5faVJlZ2lzdGVyRW50aXR5KHRoaXMpO1xuXHR9XG5cblx0cHVibGljIF9wVW5yZWdpc3RlckVudGl0eShwYXJ0aXRpb246UGFydGl0aW9uKVxuXHR7XG5cdFx0cGFydGl0aW9uLl9pVW5yZWdpc3RlckVudGl0eSh0aGlzKTtcblx0fVxufVxuXG5leHBvcnQgPSBMaW5lU2VnbWVudDsiXX0=