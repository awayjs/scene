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
        var _this = this;
        if (thickness === void 0) { thickness = 1; }
        _super.call(this);
        this._pIsEntity = true;
        this.onSizeChangedDelegate = function (event) { return _this.onSizeChanged(event); };
        this.material = material;
        this._startPosition = startPosition;
        this._endPosition = endPosition;
        this._halfThickness = thickness * 0.5;
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
    LineSegment.prototype.pCreateEntityPartitionNode = function () {
        return new EntityNode(this);
    };
    /**
     * @protected
     */
    LineSegment.prototype.pUpdateBounds = function () {
        this._pBounds.fromExtremes(this._startPosition.x, this._startPosition.y, this._startPosition.z, this._endPosition.x, this._endPosition.y, this._endPosition.z);
        _super.prototype.pUpdateBounds.call(this);
    };
    /**
     * @private
     */
    LineSegment.prototype.onSizeChanged = function (event) {
        this.notifyRenderableUpdate();
    };
    /**
     * @private
     */
    LineSegment.prototype.notifyRenderableUpdate = function () {
        var len = this._pRenderables.length;
        for (var i = 0; i < len; i++)
            this._pRenderables[i].invalidateVertexData("vertices");
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
        //TODO
    };
    return LineSegment;
})(DisplayObject);
module.exports = LineSegment;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9MaW5lU2VnbWVudC50cyJdLCJuYW1lcyI6WyJMaW5lU2VnbWVudCIsIkxpbmVTZWdtZW50LmNvbnN0cnVjdG9yIiwiTGluZVNlZ21lbnQuYW5pbWF0b3IiLCJMaW5lU2VnbWVudC5hc3NldFR5cGUiLCJMaW5lU2VnbWVudC5zdGFydFBvc3Rpb24iLCJMaW5lU2VnbWVudC5zdGFydFBvc2l0aW9uIiwiTGluZVNlZ21lbnQuZW5kUG9zaXRpb24iLCJMaW5lU2VnbWVudC5tYXRlcmlhbCIsIkxpbmVTZWdtZW50LnRoaWNrbmVzcyIsIkxpbmVTZWdtZW50LnV2VHJhbnNmb3JtIiwiTGluZVNlZ21lbnQuZGlzcG9zZSIsIkxpbmVTZWdtZW50LnBDcmVhdGVFbnRpdHlQYXJ0aXRpb25Ob2RlIiwiTGluZVNlZ21lbnQucFVwZGF0ZUJvdW5kcyIsIkxpbmVTZWdtZW50Lm9uU2l6ZUNoYW5nZWQiLCJMaW5lU2VnbWVudC5ub3RpZnlSZW5kZXJhYmxlVXBkYXRlIiwiTGluZVNlZ21lbnQuX2lDb2xsZWN0UmVuZGVyYWJsZXMiLCJMaW5lU2VnbWVudC5faUNvbGxlY3RSZW5kZXJhYmxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFHQSxJQUFPLFNBQVMsV0FBZSxtQ0FBbUMsQ0FBQyxDQUFDO0FBR3BFLElBQU8sYUFBYSxXQUFjLHVDQUF1QyxDQUFDLENBQUM7QUFFM0UsSUFBTyxVQUFVLFdBQWUseUNBQXlDLENBQUMsQ0FBQztBQUUzRSxJQUFPLGFBQWEsV0FBYyx5Q0FBeUMsQ0FBQyxDQUFDO0FBSTdFLEFBR0E7O0dBREc7SUFDRyxXQUFXO0lBQVNBLFVBQXBCQSxXQUFXQSxVQUFzQkE7SUEySHRDQTs7Ozs7O09BTUdBO0lBQ0hBLFNBbElLQSxXQUFXQSxDQWtJSkEsUUFBcUJBLEVBQUVBLGFBQXNCQSxFQUFFQSxXQUFvQkEsRUFBRUEsU0FBb0JBO1FBbEl0R0MsaUJBME1DQTtRQXhFaUZBLHlCQUFvQkEsR0FBcEJBLGFB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QW1CQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQTtJQUN4Q0EsQ0FBQ0E7SUFFTWYseUNBQW1CQSxHQUExQkEsVUFBMkJBLFlBQTBCQTtRQUVwRGdCLE1BQU1BO0lBQ1BBLENBQUNBO0lBQ0ZoQixrQkFBQ0E7QUFBREEsQ0ExTUEsQUEwTUNBLEVBMU15QixhQUFhLEVBME10QztBQUVELEFBQXFCLGlCQUFaLFdBQVcsQ0FBQyIsImZpbGUiOiJlbnRpdGllcy9MaW5lU2VnbWVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyLvu79pbXBvcnQgTWF0cml4M0RcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9NYXRyaXgzRFwiKTtcclxuaW1wb3J0IFVWVHJhbnNmb3JtXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1VWVHJhbnNmb3JtXCIpO1xyXG5pbXBvcnQgVmVjdG9yM0RcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9WZWN0b3IzRFwiKTtcclxuaW1wb3J0IEFzc2V0VHlwZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9Bc3NldFR5cGVcIik7XHJcblxyXG5pbXBvcnQgSUFuaW1hdG9yXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9hbmltYXRvcnMvSUFuaW1hdG9yXCIpO1xyXG5pbXBvcnQgRGlzcGxheU9iamVjdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvRGlzcGxheU9iamVjdFwiKTtcclxuaW1wb3J0IElSZW5kZXJhYmxlT3duZXJcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0lSZW5kZXJhYmxlT3duZXJcIik7XHJcbmltcG9ydCBFbnRpdHlOb2RlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vRW50aXR5Tm9kZVwiKTtcclxuaW1wb3J0IElSZW5kZXJlclBvb2xcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wb29sL0lSZW5kZXJlclBvb2xcIik7XHJcbmltcG9ydCBNYXRlcmlhbEV2ZW50XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZXZlbnRzL01hdGVyaWFsRXZlbnRcIik7XHJcbmltcG9ydCBJRW50aXR5XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2VudGl0aWVzL0lFbnRpdHlcIik7XHJcbmltcG9ydCBNYXRlcmlhbEJhc2VcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL21hdGVyaWFscy9NYXRlcmlhbEJhc2VcIik7XHJcblxyXG4vKipcclxuICogQSBMaW5lIFNlZ21lbnQgcHJpbWl0aXZlLlxyXG4gKi9cclxuY2xhc3MgTGluZVNlZ21lbnQgZXh0ZW5kcyBEaXNwbGF5T2JqZWN0IGltcGxlbWVudHMgSUVudGl0eSwgSVJlbmRlcmFibGVPd25lclxyXG57XHJcblx0cHJpdmF0ZSBfYW5pbWF0b3I6SUFuaW1hdG9yO1xyXG5cdHByaXZhdGUgX21hdGVyaWFsOk1hdGVyaWFsQmFzZTtcclxuXHRwcml2YXRlIF91dlRyYW5zZm9ybTpVVlRyYW5zZm9ybTtcclxuXHJcblx0cHJpdmF0ZSBvblNpemVDaGFuZ2VkRGVsZWdhdGU6KGV2ZW50Ok1hdGVyaWFsRXZlbnQpID0+IHZvaWQ7XHJcblxyXG5cdHB1YmxpYyBfc3RhcnRQb3NpdGlvbjpWZWN0b3IzRDtcclxuXHRwdWJsaWMgX2VuZFBvc2l0aW9uOlZlY3RvcjNEO1xyXG5cdHB1YmxpYyBfaGFsZlRoaWNrbmVzczpudW1iZXI7XHJcblxyXG5cclxuXHQvKipcclxuXHQgKiBEZWZpbmVzIHRoZSBhbmltYXRvciBvZiB0aGUgbGluZSBzZWdtZW50LiBBY3Qgb24gdGhlIGxpbmUgc2VnbWVudCdzIGdlb21ldHJ5LiBEZWZhdWx0cyB0byBudWxsXHJcblx0ICovXHJcblx0cHVibGljIGdldCBhbmltYXRvcigpOklBbmltYXRvclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9hbmltYXRvcjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCBhc3NldFR5cGUoKTpzdHJpbmdcclxuXHR7XHJcblx0XHRyZXR1cm4gQXNzZXRUeXBlLkxJTkVfU0VHTUVOVDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCBzdGFydFBvc3Rpb24oKTpWZWN0b3IzRFxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9zdGFydFBvc2l0aW9uO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBzdGFydFBvc2l0aW9uKHZhbHVlOlZlY3RvcjNEKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9zdGFydFBvc2l0aW9uID09IHZhbHVlKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fc3RhcnRQb3NpdGlvbiA9IHZhbHVlO1xyXG5cclxuXHRcdHRoaXMubm90aWZ5UmVuZGVyYWJsZVVwZGF0ZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGVuZFBvc2l0aW9uKCk6VmVjdG9yM0RcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fZW5kUG9zaXRpb247XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IGVuZFBvc2l0aW9uKHZhbHVlOlZlY3RvcjNEKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9lbmRQb3NpdGlvbiA9PSB2YWx1ZSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX2VuZFBvc2l0aW9uID0gdmFsdWU7XHJcblxyXG5cdFx0dGhpcy5ub3RpZnlSZW5kZXJhYmxlVXBkYXRlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgbWF0ZXJpYWwoKTpNYXRlcmlhbEJhc2VcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fbWF0ZXJpYWw7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IG1hdGVyaWFsKHZhbHVlOk1hdGVyaWFsQmFzZSlcclxuXHR7XHJcblx0XHRpZiAodmFsdWUgPT0gdGhpcy5fbWF0ZXJpYWwpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHRpZiAodGhpcy5fbWF0ZXJpYWwpIHtcclxuXHRcdFx0dGhpcy5fbWF0ZXJpYWwuaVJlbW92ZU93bmVyKHRoaXMpO1xyXG5cdFx0XHR0aGlzLl9tYXRlcmlhbC5yZW1vdmVFdmVudExpc3RlbmVyKE1hdGVyaWFsRXZlbnQuU0laRV9DSEFOR0VELCB0aGlzLm9uU2l6ZUNoYW5nZWREZWxlZ2F0ZSk7XHJcblx0XHR9XHJcblxyXG5cclxuXHRcdHRoaXMuX21hdGVyaWFsID0gdmFsdWU7XHJcblxyXG5cdFx0aWYgKHRoaXMuX21hdGVyaWFsKSB7XHJcblx0XHRcdHRoaXMuX21hdGVyaWFsLmlBZGRPd25lcih0aGlzKTtcclxuXHRcdFx0dGhpcy5fbWF0ZXJpYWwuYWRkRXZlbnRMaXN0ZW5lcihNYXRlcmlhbEV2ZW50LlNJWkVfQ0hBTkdFRCwgdGhpcy5vblNpemVDaGFuZ2VkRGVsZWdhdGUpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHRoaWNrbmVzcygpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9oYWxmVGhpY2tuZXNzKjI7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHRoaWNrbmVzcyh2YWx1ZTpudW1iZXIpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX2hhbGZUaGlja25lc3MgPT0gdmFsdWUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9oYWxmVGhpY2tuZXNzID0gdmFsdWUqMC41O1xyXG5cclxuXHRcdHRoaXMubm90aWZ5UmVuZGVyYWJsZVVwZGF0ZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHV2VHJhbnNmb3JtKCk6VVZUcmFuc2Zvcm1cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fdXZUcmFuc2Zvcm07XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHV2VHJhbnNmb3JtKHZhbHVlOlVWVHJhbnNmb3JtKVxyXG5cdHtcclxuXHRcdHRoaXMuX3V2VHJhbnNmb3JtID0gdmFsdWU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGUgYSBsaW5lIHNlZ21lbnRcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdGFydFBvc2l0aW9uIFN0YXJ0IHBvc2l0aW9uIG9mIHRoZSBsaW5lIHNlZ21lbnRcclxuXHQgKiBAcGFyYW0gZW5kUG9zaXRpb24gRW5kaW5nIHBvc2l0aW9uIG9mIHRoZSBsaW5lIHNlZ21lbnRcclxuXHQgKiBAcGFyYW0gdGhpY2tuZXNzIFRoaWNrbmVzcyBvZiB0aGUgbGluZVxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKG1hdGVyaWFsOk1hdGVyaWFsQmFzZSwgc3RhcnRQb3NpdGlvbjpWZWN0b3IzRCwgZW5kUG9zaXRpb246VmVjdG9yM0QsIHRoaWNrbmVzczpudW1iZXIgPSAxKVxyXG5cdHtcclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0dGhpcy5fcElzRW50aXR5ID0gdHJ1ZTtcclxuXHJcblx0XHR0aGlzLm9uU2l6ZUNoYW5nZWREZWxlZ2F0ZSA9IChldmVudDpNYXRlcmlhbEV2ZW50KSA9PiB0aGlzLm9uU2l6ZUNoYW5nZWQoZXZlbnQpO1xyXG5cclxuXHRcdHRoaXMubWF0ZXJpYWwgPSBtYXRlcmlhbDtcclxuXHJcblx0XHR0aGlzLl9zdGFydFBvc2l0aW9uID0gc3RhcnRQb3NpdGlvbjtcclxuXHRcdHRoaXMuX2VuZFBvc2l0aW9uID0gZW5kUG9zaXRpb247XHJcblx0XHR0aGlzLl9oYWxmVGhpY2tuZXNzID0gdGhpY2tuZXNzKjAuNTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBkaXNwb3NlKClcclxuXHR7XHJcblx0XHR0aGlzLl9zdGFydFBvc2l0aW9uID0gbnVsbDtcclxuXHRcdHRoaXMuX2VuZFBvc2l0aW9uID0gbnVsbDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwcm90ZWN0ZWRcclxuXHQgKi9cclxuXHRwdWJsaWMgcENyZWF0ZUVudGl0eVBhcnRpdGlvbk5vZGUoKTpFbnRpdHlOb2RlXHJcblx0e1xyXG5cdFx0cmV0dXJuIG5ldyBFbnRpdHlOb2RlKHRoaXMpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHByb3RlY3RlZFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBwVXBkYXRlQm91bmRzKClcclxuXHR7XHJcblx0XHR0aGlzLl9wQm91bmRzLmZyb21FeHRyZW1lcyh0aGlzLl9zdGFydFBvc2l0aW9uLngsIHRoaXMuX3N0YXJ0UG9zaXRpb24ueSwgdGhpcy5fc3RhcnRQb3NpdGlvbi56LCB0aGlzLl9lbmRQb3NpdGlvbi54LCB0aGlzLl9lbmRQb3NpdGlvbi55LCB0aGlzLl9lbmRQb3NpdGlvbi56KTtcclxuXHJcblx0XHRzdXBlci5wVXBkYXRlQm91bmRzKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgb25TaXplQ2hhbmdlZChldmVudDpNYXRlcmlhbEV2ZW50KVxyXG5cdHtcclxuXHRcdHRoaXMubm90aWZ5UmVuZGVyYWJsZVVwZGF0ZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIG5vdGlmeVJlbmRlcmFibGVVcGRhdGUoKVxyXG5cdHtcclxuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fcFJlbmRlcmFibGVzLmxlbmd0aDtcclxuXHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IGxlbjsgaSsrKVxyXG5cdFx0XHR0aGlzLl9wUmVuZGVyYWJsZXNbaV0uaW52YWxpZGF0ZVZlcnRleERhdGEoXCJ2ZXJ0aWNlc1wiKTsgLy9UT0RPXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgX2lDb2xsZWN0UmVuZGVyYWJsZXMocmVuZGVyZXJQb29sOklSZW5kZXJlclBvb2wpXHJcblx0e1xyXG5cdFx0Ly8gU2luY2UgdGhpcyBnZXR0ZXIgaXMgaW52b2tlZCBldmVyeSBpdGVyYXRpb24gb2YgdGhlIHJlbmRlciBsb29wLCBhbmRcclxuXHRcdC8vIHRoZSBwcmVmYWIgY29uc3RydWN0IGNvdWxkIGFmZmVjdCB0aGUgc3ViLW1lc2hlcywgdGhlIHByZWZhYiBpc1xyXG5cdFx0Ly8gdmFsaWRhdGVkIGhlcmUgdG8gZ2l2ZSBpdCBhIGNoYW5jZSB0byByZWJ1aWxkLlxyXG5cdFx0aWYgKHRoaXMuX2lTb3VyY2VQcmVmYWIpXHJcblx0XHRcdHRoaXMuX2lTb3VyY2VQcmVmYWIuX2lWYWxpZGF0ZSgpO1xyXG5cclxuXHRcdHRoaXMuX2lDb2xsZWN0UmVuZGVyYWJsZShyZW5kZXJlclBvb2wpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIF9pQ29sbGVjdFJlbmRlcmFibGUocmVuZGVyZXJQb29sOklSZW5kZXJlclBvb2wpXHJcblx0e1xyXG5cdFx0Ly9UT0RPXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgPSBMaW5lU2VnbWVudDsiXX0=