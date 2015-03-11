var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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
            return LineSegment.assetType;
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
    LineSegment.assetType = "[asset LineSegment]";
    return LineSegment;
})(DisplayObject);
module.exports = LineSegment;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9MaW5lU2VnbWVudC50cyJdLCJuYW1lcyI6WyJMaW5lU2VnbWVudCIsIkxpbmVTZWdtZW50LmNvbnN0cnVjdG9yIiwiTGluZVNlZ21lbnQuYW5pbWF0b3IiLCJMaW5lU2VnbWVudC5hc3NldFR5cGUiLCJMaW5lU2VnbWVudC5zdGFydFBvc3Rpb24iLCJMaW5lU2VnbWVudC5zdGFydFBvc2l0aW9uIiwiTGluZVNlZ21lbnQuZW5kUG9zaXRpb24iLCJMaW5lU2VnbWVudC5tYXRlcmlhbCIsIkxpbmVTZWdtZW50LnRoaWNrbmVzcyIsIkxpbmVTZWdtZW50LnV2VHJhbnNmb3JtIiwiTGluZVNlZ21lbnQuZGlzcG9zZSIsIkxpbmVTZWdtZW50Ll9wVXBkYXRlQm94Qm91bmRzIiwiTGluZVNlZ21lbnQuX3BVcGRhdGVTcGhlcmVCb3VuZHMiLCJMaW5lU2VnbWVudC5ub3RpZnlSZW5kZXJhYmxlVXBkYXRlIiwiTGluZVNlZ21lbnQuX2lDb2xsZWN0UmVuZGVyYWJsZXMiLCJMaW5lU2VnbWVudC5faUNvbGxlY3RSZW5kZXJhYmxlIiwiTGluZVNlZ21lbnQuX3BSZWdpc3RlckVudGl0eSIsIkxpbmVTZWdtZW50Ll9wVW5yZWdpc3RlckVudGl0eSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBS0EsSUFBTyxhQUFhLFdBQWMsdUNBQXVDLENBQUMsQ0FBQztBQUUzRSxJQUFPLFVBQVUsV0FBZSxzQ0FBc0MsQ0FBQyxDQUFDO0FBUXhFLEFBR0E7O0dBREc7SUFDRyxXQUFXO0lBQVNBLFVBQXBCQSxXQUFXQSxVQUFzQkE7SUFrSHRDQTs7Ozs7O09BTUdBO0lBQ0hBLFNBekhLQSxXQUFXQSxDQXlISkEsUUFBcUJBLEVBQUVBLGFBQXNCQSxFQUFFQSxXQUFvQkEsRUFBRUEsU0FBb0JBO1FBQXBCQyx5QkFBb0JBLEdBQXBCQSxhQUFvQkE7UUFFcEdBLGlCQUFPQSxDQUFDQTtRQUVSQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxJQUFJ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Q0E7SUFFTWQseUNBQW1CQSxHQUExQkEsVUFBMkJBLFlBQTBCQTtRQUVwRGUsWUFBWUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtJQUNyQ0EsQ0FBQ0E7SUFFTWYsc0NBQWdCQSxHQUF2QkEsVUFBd0JBLFNBQW1CQTtRQUUxQ2dCLFNBQVNBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7SUFDbENBLENBQUNBO0lBRU1oQix3Q0FBa0JBLEdBQXpCQSxVQUEwQkEsU0FBbUJBO1FBRTVDaUIsU0FBU0EsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtJQUNwQ0EsQ0FBQ0E7SUE3TWFqQixxQkFBU0EsR0FBVUEscUJBQXFCQSxDQUFDQTtJQThNeERBLGtCQUFDQTtBQUFEQSxDQWhOQSxBQWdOQ0EsRUFoTnlCLGFBQWEsRUFnTnRDO0FBRUQsQUFBcUIsaUJBQVosV0FBVyxDQUFDIiwiZmlsZSI6ImVudGl0aWVzL0xpbmVTZWdtZW50LmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbIu+7v2ltcG9ydCBNYXRyaXgzRFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL01hdHJpeDNEXCIpO1xyXG5pbXBvcnQgVVZUcmFuc2Zvcm1cdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vVVZUcmFuc2Zvcm1cIik7XHJcbmltcG9ydCBWZWN0b3IzRFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1ZlY3RvcjNEXCIpO1xyXG5cclxuaW1wb3J0IElBbmltYXRvclx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYW5pbWF0b3JzL0lBbmltYXRvclwiKTtcclxuaW1wb3J0IERpc3BsYXlPYmplY3RcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0Rpc3BsYXlPYmplY3RcIik7XHJcbmltcG9ydCBJUmVuZGVyYWJsZU93bmVyXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9JUmVuZGVyYWJsZU93bmVyXCIpO1xyXG5pbXBvcnQgQm91bmRzVHlwZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYm91bmRzL0JvdW5kc1R5cGVcIik7XHJcbmltcG9ydCBQYXJ0aXRpb25cdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3BhcnRpdGlvbi9QYXJ0aXRpb25cIik7XHJcbmltcG9ydCBFbnRpdHlOb2RlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vRW50aXR5Tm9kZVwiKTtcclxuaW1wb3J0IElSZW5kZXJlclBvb2xcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wb29sL0lSZW5kZXJlclBvb2xcIik7XHJcbmltcG9ydCBNYXRlcmlhbEV2ZW50XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZXZlbnRzL01hdGVyaWFsRXZlbnRcIik7XHJcbmltcG9ydCBJRW50aXR5XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2VudGl0aWVzL0lFbnRpdHlcIik7XHJcbmltcG9ydCBNYXRlcmlhbEJhc2VcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL21hdGVyaWFscy9NYXRlcmlhbEJhc2VcIik7XHJcblxyXG4vKipcclxuICogQSBMaW5lIFNlZ21lbnQgcHJpbWl0aXZlLlxyXG4gKi9cclxuY2xhc3MgTGluZVNlZ21lbnQgZXh0ZW5kcyBEaXNwbGF5T2JqZWN0IGltcGxlbWVudHMgSUVudGl0eSwgSVJlbmRlcmFibGVPd25lclxyXG57XHJcblx0cHVibGljIHN0YXRpYyBhc3NldFR5cGU6c3RyaW5nID0gXCJbYXNzZXQgTGluZVNlZ21lbnRdXCI7XHJcblxyXG5cdHByaXZhdGUgX2FuaW1hdG9yOklBbmltYXRvcjtcclxuXHRwcml2YXRlIF9tYXRlcmlhbDpNYXRlcmlhbEJhc2U7XHJcblx0cHJpdmF0ZSBfdXZUcmFuc2Zvcm06VVZUcmFuc2Zvcm07XHJcblxyXG5cdHB1YmxpYyBfc3RhcnRQb3NpdGlvbjpWZWN0b3IzRDtcclxuXHRwdWJsaWMgX2VuZFBvc2l0aW9uOlZlY3RvcjNEO1xyXG5cdHB1YmxpYyBfaGFsZlRoaWNrbmVzczpudW1iZXI7XHJcblxyXG5cdC8qKlxyXG5cdCAqIERlZmluZXMgdGhlIGFuaW1hdG9yIG9mIHRoZSBsaW5lIHNlZ21lbnQuIEFjdCBvbiB0aGUgbGluZSBzZWdtZW50J3MgZ2VvbWV0cnkuIERlZmF1bHRzIHRvIG51bGxcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGFuaW1hdG9yKCk6SUFuaW1hdG9yXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2FuaW1hdG9yO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGFzc2V0VHlwZSgpOnN0cmluZ1xyXG5cdHtcclxuXHRcdHJldHVybiBMaW5lU2VnbWVudC5hc3NldFR5cGU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgc3RhcnRQb3N0aW9uKCk6VmVjdG9yM0RcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fc3RhcnRQb3NpdGlvbjtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgc3RhcnRQb3NpdGlvbih2YWx1ZTpWZWN0b3IzRClcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fc3RhcnRQb3NpdGlvbiA9PSB2YWx1ZSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX3N0YXJ0UG9zaXRpb24gPSB2YWx1ZTtcclxuXHJcblx0XHR0aGlzLm5vdGlmeVJlbmRlcmFibGVVcGRhdGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCBlbmRQb3NpdGlvbigpOlZlY3RvcjNEXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2VuZFBvc2l0aW9uO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBlbmRQb3NpdGlvbih2YWx1ZTpWZWN0b3IzRClcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fZW5kUG9zaXRpb24gPT0gdmFsdWUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9lbmRQb3NpdGlvbiA9IHZhbHVlO1xyXG5cclxuXHRcdHRoaXMubm90aWZ5UmVuZGVyYWJsZVVwZGF0ZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IG1hdGVyaWFsKCk6TWF0ZXJpYWxCYXNlXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX21hdGVyaWFsO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBtYXRlcmlhbCh2YWx1ZTpNYXRlcmlhbEJhc2UpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMubWF0ZXJpYWwpXHJcblx0XHRcdHRoaXMubWF0ZXJpYWwuaVJlbW92ZU93bmVyKHRoaXMpO1xyXG5cclxuXHRcdHRoaXMuX21hdGVyaWFsID0gdmFsdWU7XHJcblxyXG5cdFx0aWYgKHRoaXMubWF0ZXJpYWwpXHJcblx0XHRcdHRoaXMubWF0ZXJpYWwuaUFkZE93bmVyKHRoaXMpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHRoaWNrbmVzcygpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9oYWxmVGhpY2tuZXNzKjI7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHRoaWNrbmVzcyh2YWx1ZTpudW1iZXIpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX2hhbGZUaGlja25lc3MgPT0gdmFsdWUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9oYWxmVGhpY2tuZXNzID0gdmFsdWUqMC41O1xyXG5cclxuXHRcdHRoaXMubm90aWZ5UmVuZGVyYWJsZVVwZGF0ZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHV2VHJhbnNmb3JtKCk6VVZUcmFuc2Zvcm1cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fdXZUcmFuc2Zvcm07XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHV2VHJhbnNmb3JtKHZhbHVlOlVWVHJhbnNmb3JtKVxyXG5cdHtcclxuXHRcdHRoaXMuX3V2VHJhbnNmb3JtID0gdmFsdWU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGUgYSBsaW5lIHNlZ21lbnRcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdGFydFBvc2l0aW9uIFN0YXJ0IHBvc2l0aW9uIG9mIHRoZSBsaW5lIHNlZ21lbnRcclxuXHQgKiBAcGFyYW0gZW5kUG9zaXRpb24gRW5kaW5nIHBvc2l0aW9uIG9mIHRoZSBsaW5lIHNlZ21lbnRcclxuXHQgKiBAcGFyYW0gdGhpY2tuZXNzIFRoaWNrbmVzcyBvZiB0aGUgbGluZVxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKG1hdGVyaWFsOk1hdGVyaWFsQmFzZSwgc3RhcnRQb3NpdGlvbjpWZWN0b3IzRCwgZW5kUG9zaXRpb246VmVjdG9yM0QsIHRoaWNrbmVzczpudW1iZXIgPSAxKVxyXG5cdHtcclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0dGhpcy5fcElzRW50aXR5ID0gdHJ1ZTtcclxuXHJcblx0XHR0aGlzLm1hdGVyaWFsID0gbWF0ZXJpYWw7XHJcblxyXG5cdFx0dGhpcy5fc3RhcnRQb3NpdGlvbiA9IHN0YXJ0UG9zaXRpb247XHJcblx0XHR0aGlzLl9lbmRQb3NpdGlvbiA9IGVuZFBvc2l0aW9uO1xyXG5cdFx0dGhpcy5faGFsZlRoaWNrbmVzcyA9IHRoaWNrbmVzcyowLjU7XHJcblxyXG5cdFx0Ly9kZWZhdWx0IGJvdW5kcyB0eXBlXHJcblx0XHR0aGlzLl9ib3VuZHNUeXBlID0gQm91bmRzVHlwZS5BWElTX0FMSUdORURfQk9YO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGRpc3Bvc2UoKVxyXG5cdHtcclxuXHRcdHRoaXMuX3N0YXJ0UG9zaXRpb24gPSBudWxsO1xyXG5cdFx0dGhpcy5fZW5kUG9zaXRpb24gPSBudWxsO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHByb3RlY3RlZFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBfcFVwZGF0ZUJveEJvdW5kcygpXHJcblx0e1xyXG5cdFx0c3VwZXIuX3BVcGRhdGVCb3hCb3VuZHMoKTtcclxuXHJcblx0XHR0aGlzLl9wQm94Qm91bmRzLnggPSBNYXRoLm1pbih0aGlzLl9zdGFydFBvc2l0aW9uLngsIHRoaXMuX2VuZFBvc2l0aW9uLngpO1xyXG5cdFx0dGhpcy5fcEJveEJvdW5kcy55ID0gTWF0aC5taW4odGhpcy5fc3RhcnRQb3NpdGlvbi55LCB0aGlzLl9lbmRQb3NpdGlvbi55KTtcclxuXHRcdHRoaXMuX3BCb3hCb3VuZHMueiA9IE1hdGgubWluKHRoaXMuX3N0YXJ0UG9zaXRpb24ueiwgdGhpcy5fZW5kUG9zaXRpb24ueik7XHJcblx0XHR0aGlzLl9wQm94Qm91bmRzLndpZHRoID0gTWF0aC5hYnModGhpcy5fc3RhcnRQb3NpdGlvbi54IC0gdGhpcy5fZW5kUG9zaXRpb24ueCk7XHJcblx0XHR0aGlzLl9wQm94Qm91bmRzLmhlaWdodCA9IE1hdGguYWJzKHRoaXMuX3N0YXJ0UG9zaXRpb24ueSAtIHRoaXMuX2VuZFBvc2l0aW9uLnkpO1xyXG5cdFx0dGhpcy5fcEJveEJvdW5kcy5kZXB0aCA9IE1hdGguYWJzKHRoaXMuX3N0YXJ0UG9zaXRpb24ueiAtIHRoaXMuX2VuZFBvc2l0aW9uLnopO1xyXG5cdH1cclxuXHJcblx0cHVibGljIF9wVXBkYXRlU3BoZXJlQm91bmRzKClcclxuXHR7XHJcblx0XHRzdXBlci5fcFVwZGF0ZVNwaGVyZUJvdW5kcygpO1xyXG5cclxuXHRcdHRoaXMuX3BVcGRhdGVCb3hCb3VuZHMoKTtcclxuXHJcblx0XHR2YXIgaGFsZldpZHRoOm51bWJlciA9ICh0aGlzLl9lbmRQb3NpdGlvbi54IC0gdGhpcy5fc3RhcnRQb3NpdGlvbi54KS8yO1xyXG5cdFx0dmFyIGhhbGZIZWlnaHQ6bnVtYmVyID0gKHRoaXMuX2VuZFBvc2l0aW9uLnkgLSB0aGlzLl9zdGFydFBvc2l0aW9uLnkpLzI7XHJcblx0XHR2YXIgaGFsZkRlcHRoOm51bWJlciA9ICh0aGlzLl9lbmRQb3NpdGlvbi56IC0gdGhpcy5fc3RhcnRQb3NpdGlvbi56KS8yO1xyXG5cdFx0dGhpcy5fcFNwaGVyZUJvdW5kcy54ID0gdGhpcy5fc3RhcnRQb3NpdGlvbi54ICsgaGFsZldpZHRoO1xyXG5cdFx0dGhpcy5fcFNwaGVyZUJvdW5kcy55ID0gdGhpcy5fc3RhcnRQb3NpdGlvbi55ICsgaGFsZkhlaWdodDtcclxuXHRcdHRoaXMuX3BTcGhlcmVCb3VuZHMueiA9IHRoaXMuX3N0YXJ0UG9zaXRpb24ueiArIGhhbGZEZXB0aDtcclxuXHRcdHRoaXMuX3BTcGhlcmVCb3VuZHMucmFkaXVzID0gTWF0aC5zcXJ0KGhhbGZXaWR0aCpoYWxmV2lkdGggKyBoYWxmSGVpZ2h0KmhhbGZIZWlnaHQgKyBoYWxmRGVwdGgqaGFsZkRlcHRoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBub3RpZnlSZW5kZXJhYmxlVXBkYXRlKClcclxuXHR7XHJcblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX3BSZW5kZXJhYmxlcy5sZW5ndGg7XHJcblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBsZW47IGkrKylcclxuXHRcdFx0dGhpcy5fcFJlbmRlcmFibGVzW2ldLmludmFsaWRhdGVHZW9tZXRyeSgpOyAvL1RPRE8gaW1wcm92ZSBwZXJmb3JtYW5jZSBieSBvbmx5IHVzaW5nIG9uZSBnZW9tZXRyeSBmb3IgYWxsIGxpbmUgc2VnbWVudHNcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBfaUNvbGxlY3RSZW5kZXJhYmxlcyhyZW5kZXJlclBvb2w6SVJlbmRlcmVyUG9vbClcclxuXHR7XHJcblx0XHQvLyBTaW5jZSB0aGlzIGdldHRlciBpcyBpbnZva2VkIGV2ZXJ5IGl0ZXJhdGlvbiBvZiB0aGUgcmVuZGVyIGxvb3AsIGFuZFxyXG5cdFx0Ly8gdGhlIHByZWZhYiBjb25zdHJ1Y3QgY291bGQgYWZmZWN0IHRoZSBzdWItbWVzaGVzLCB0aGUgcHJlZmFiIGlzXHJcblx0XHQvLyB2YWxpZGF0ZWQgaGVyZSB0byBnaXZlIGl0IGEgY2hhbmNlIHRvIHJlYnVpbGQuXHJcblx0XHRpZiAodGhpcy5faVNvdXJjZVByZWZhYilcclxuXHRcdFx0dGhpcy5faVNvdXJjZVByZWZhYi5faVZhbGlkYXRlKCk7XHJcblxyXG5cdFx0dGhpcy5faUNvbGxlY3RSZW5kZXJhYmxlKHJlbmRlcmVyUG9vbCk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgX2lDb2xsZWN0UmVuZGVyYWJsZShyZW5kZXJlclBvb2w6SVJlbmRlcmVyUG9vbClcclxuXHR7XHJcblx0XHRyZW5kZXJlclBvb2wuYXBwbHlMaW5lU2VnbWVudCh0aGlzKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBfcFJlZ2lzdGVyRW50aXR5KHBhcnRpdGlvbjpQYXJ0aXRpb24pXHJcblx0e1xyXG5cdFx0cGFydGl0aW9uLl9pUmVnaXN0ZXJFbnRpdHkodGhpcyk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgX3BVbnJlZ2lzdGVyRW50aXR5KHBhcnRpdGlvbjpQYXJ0aXRpb24pXHJcblx0e1xyXG5cdFx0cGFydGl0aW9uLl9pVW5yZWdpc3RlckVudGl0eSh0aGlzKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCA9IExpbmVTZWdtZW50OyJdfQ==