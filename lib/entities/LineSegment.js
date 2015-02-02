var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AssetType = require("awayjs-core/lib/library/AssetType");
var DisplayObject = require("awayjs-display/lib/base/DisplayObject");
var EntityNode = require("awayjs-display/lib/partition/EntityNode");
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
    return LineSegment;
})(DisplayObject);
module.exports = LineSegment;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9saW5lc2VnbWVudC50cyJdLCJuYW1lcyI6WyJMaW5lU2VnbWVudCIsIkxpbmVTZWdtZW50LmNvbnN0cnVjdG9yIiwiTGluZVNlZ21lbnQuYW5pbWF0b3IiLCJMaW5lU2VnbWVudC5hc3NldFR5cGUiLCJMaW5lU2VnbWVudC5zdGFydFBvc3Rpb24iLCJMaW5lU2VnbWVudC5zdGFydFBvc2l0aW9uIiwiTGluZVNlZ21lbnQuZW5kUG9zaXRpb24iLCJMaW5lU2VnbWVudC5tYXRlcmlhbCIsIkxpbmVTZWdtZW50LnRoaWNrbmVzcyIsIkxpbmVTZWdtZW50LnV2VHJhbnNmb3JtIiwiTGluZVNlZ21lbnQuZGlzcG9zZSIsIkxpbmVTZWdtZW50LnBDcmVhdGVFbnRpdHlQYXJ0aXRpb25Ob2RlIiwiTGluZVNlZ21lbnQucFVwZGF0ZUJvdW5kcyIsIkxpbmVTZWdtZW50Lm5vdGlmeVJlbmRlcmFibGVVcGRhdGUiLCJMaW5lU2VnbWVudC5faUNvbGxlY3RSZW5kZXJhYmxlcyIsIkxpbmVTZWdtZW50Ll9pQ29sbGVjdFJlbmRlcmFibGUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUdBLElBQU8sU0FBUyxXQUFlLG1DQUFtQyxDQUFDLENBQUM7QUFHcEUsSUFBTyxhQUFhLFdBQWMsdUNBQXVDLENBQUMsQ0FBQztBQUUzRSxJQUFPLFVBQVUsV0FBZSx5Q0FBeUMsQ0FBQyxDQUFDO0FBTTNFLEFBR0E7O0dBREc7SUFDRyxXQUFXO0lBQVNBLFVBQXBCQSxXQUFXQSxVQUFzQkE7SUFpSHRDQTs7Ozs7O09BTUdBO0lBQ0hBLFNBeEhLQSxXQUFXQSxDQXdISkEsUUFBcUJBLEVBQUVBLGFBQXNCQSxFQUFFQSxXQUFvQkEsRUFBRUEsU0FBb0JBO1FBQXBCQyx5QkFBb0JBLEdBQXBCQSxhQUFvQkE7UUFFcEdBLGlCQUFPQSxDQUFDQTtRQUVSQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUV2QkEsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsUUFBUUEsQ0FBQ0E7UUFFekJBLElBQUlBLENBQUNBLGNBQWNBLEdBQUdBLGFBQWFBLENBQUNBO1FBQ3BDQSxJQUFJQSxDQUFDQSxZQUFZQSxHQUFHQSxXQUFXQSxDQUFDQTtRQUNoQ0EsSUFBSUEsQ0FBQ0EsY0FBY0EsR0FBR0EsU0FBU0EsR0FBQ0EsR0FBR0EsQ0FBQ0E7SUFDckNBLENBQUNBO0lBckhERCxzQkFBV0EsaUNBQVFBO1FBSG5CQTs7V0FFR0E7YUFDSEE7WUFFQ0UsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0E7UUFDdkJBLENBQUNBOzs7T0FBQUY7SUFLREEsc0JBQVdBLGtDQUFTQTtRQUhwQkE7O1dBRUdBO2FBQ0hBO1lBRUNHLE1BQU1BLENBQUNBLFNBQVNBLENBQUNBLFlBQVlBLENBQUNBO1FBQy9CQSxDQUFDQTs7O09BQUFIO0lBS0RBLHNCQUFXQSxxQ0FBWUE7UUFIdkJBOztXQUVHQTthQUNIQTtZQUVDSSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQTtRQUM1QkEsQ0FBQ0E7OztPQUFBSjtJQUVEQSxzQkFBV0Esc0NBQWFBO2FBQXhCQSxVQUF5QkEsS0FBY0E7WUFFdENLLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLGNBQWNBLElBQUlBLEtBQUtBLENBQUNBO2dCQUNoQ0EsTUFBTUEsQ0FBQ0E7WUFFUkEsSUFBSUEsQ0FBQ0EsY0FBY0EsR0FBR0EsS0FBS0EsQ0FBQ0E7WUFFNUJBLElBQUlBLENBQUNBLHNCQUFzQkEsRUFBRUEsQ0FBQ0E7UUFDL0JBLENBQUNBOzs7T0FBQUw7SUFLREEsc0JBQVdBLG9DQUFXQTtRQUh0QkE7O1dBRUdBO2FBQ0hBO1lBRUNNLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBO1FBQzFCQSxDQUFDQTthQUVETixVQUF1QkEsS0FBY0E7WUFFcENNLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFlBQVlBLElBQUlBLEtBQUtBLENBQUNBO2dCQUM5QkEsTUFBTUEsQ0FBQ0E7WUFFUkEsSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsS0FBS0EsQ0FBQ0E7WUFFMUJBLElBQUlBLENBQUNBLHNCQUFzQkEsRUFBRUEsQ0FBQ0E7UUFDL0JBLENBQUNBOzs7T0FWQU47SUFlREEsc0JBQVdBLGlDQUFRQTtRQUhuQkE7O1dBRUdBO2FBQ0hBO1lBRUNPLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBO1FBQ3ZCQSxDQUFDQTthQUVEUCxVQUFvQkEsS0FBa0JBO1lBRXJDTyxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQTtnQkFDakJBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLFlBQVlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1lBRWxDQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxLQUFLQSxDQUFDQTtZQUV2QkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7Z0JBQ2pCQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtRQUNoQ0EsQ0FBQ0E7OztPQVhBUDtJQWdCREEsc0JBQVdBLGtDQUFTQTtRQUhwQkE7O1dBRUdBO2FBQ0hBO1lBRUNRLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLGNBQWNBLEdBQUNBLENBQUNBLENBQUNBO1FBQzlCQSxDQUFDQTthQUVEUixVQUFxQkEsS0FBWUE7WUFFaENRLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLGNBQWNBLElBQUlBLEtBQUtBLENBQUNBO2dCQUNoQ0EsTUFBTUEsQ0FBQ0E7WUFFUkEsSUFBSUEsQ0FBQ0EsY0FBY0EsR0FBR0EsS0FBS0EsR0FBQ0EsR0FBR0EsQ0FBQ0E7WUFFaENBLElBQUlBLENBQUNBLHNCQUFzQkEsRUFBRUEsQ0FBQ0E7UUFDL0JBLENBQUNBOzs7T0FWQVI7SUFlREEsc0JBQVdBLG9DQUFXQTtRQUh0QkE7O1dBRUdBO2FBQ0hBO1lBRUNTLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBO1FBQzFCQSxDQUFDQTthQUVEVCxVQUF1QkEsS0FBaUJBO1lBRXZDUyxJQUFJQSxDQUFDQSxZQUFZQSxHQUFHQSxLQUFLQSxDQUFDQTtRQUMzQkEsQ0FBQ0E7OztPQUxBVDtJQTJCTUEsNkJBQU9BLEdBQWRBO1FBRUNVLElBQUlBLENBQUNBLGNBQWNBLEdBQUdBLElBQUlBLENBQUNBO1FBQzNCQSxJQUFJQSxDQUFDQSxZQUFZQSxHQUFHQSxJQUFJQSxDQUFDQTtJQUMxQkEsQ0FBQ0E7SUFFRFY7O09BRUdBO0lBQ0lBLGdEQUEwQkEsR0FBakNBO1FBRUNXLE1BQU1BLENBQUNBLElBQUlBLFVBQVVBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO0lBQzdCQSxDQUFDQTtJQUVEWDs7T0FFR0E7SUFDSUEsbUNBQWFBLEdBQXBCQTtRQUVDWSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxZQUFZQSxDQUFDQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUUvSkEsZ0JBQUtBLENBQUNBLGFBQWFBLFdBQUVBLENBQUNBO0lBQ3ZCQSxDQUFDQTtJQUVEWjs7T0FFR0E7SUFDS0EsNENBQXNCQSxHQUE5QkE7UUFFQ2EsSUFBSUEsR0FBR0EsR0FBVUEsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7UUFDM0NBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQVVBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLEdBQUdBLEVBQUVBLENBQUNBLEVBQUVBO1lBQ2xDQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxrQkFBa0JBLEVBQUVBLENBQUNBO0lBQzdDQSxDQUFDQTtJQUVNYiwwQ0FBb0JBLEdBQTNCQSxVQUE0QkEsWUFBMEJBO1FBRXJEYyxBQUdBQSx1RUFIdUVBO1FBQ3ZFQSxrRUFBa0VBO1FBQ2xFQSxpREFBaURBO1FBQ2pEQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQTtZQUN2QkEsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsVUFBVUEsRUFBRUEsQ0FBQ0E7UUFFbENBLElBQUlBLENBQUNBLG1CQUFtQkEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0E7SUFDeENBLENBQUNBO0lBRU1kLHlDQUFtQkEsR0FBMUJBLFVBQTJCQSxZQUEwQkE7UUFFcERlLFlBQVlBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7SUFDckNBLENBQUNBO0lBQ0ZmLGtCQUFDQTtBQUFEQSxDQXRMQSxBQXNMQ0EsRUF0THlCLGFBQWEsRUFzTHRDO0FBRUQsQUFBcUIsaUJBQVosV0FBVyxDQUFDIiwiZmlsZSI6ImVudGl0aWVzL0xpbmVTZWdtZW50LmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbIu+7v2ltcG9ydCBNYXRyaXgzRFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL01hdHJpeDNEXCIpO1xuaW1wb3J0IFVWVHJhbnNmb3JtXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1VWVHJhbnNmb3JtXCIpO1xuaW1wb3J0IFZlY3RvcjNEXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vVmVjdG9yM0RcIik7XG5pbXBvcnQgQXNzZXRUeXBlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0Fzc2V0VHlwZVwiKTtcblxuaW1wb3J0IElBbmltYXRvclx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYW5pbWF0b3JzL0lBbmltYXRvclwiKTtcbmltcG9ydCBEaXNwbGF5T2JqZWN0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9EaXNwbGF5T2JqZWN0XCIpO1xuaW1wb3J0IElSZW5kZXJhYmxlT3duZXJcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0lSZW5kZXJhYmxlT3duZXJcIik7XG5pbXBvcnQgRW50aXR5Tm9kZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcGFydGl0aW9uL0VudGl0eU5vZGVcIik7XG5pbXBvcnQgSVJlbmRlcmVyUG9vbFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3Bvb2wvSVJlbmRlcmVyUG9vbFwiKTtcbmltcG9ydCBNYXRlcmlhbEV2ZW50XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZXZlbnRzL01hdGVyaWFsRXZlbnRcIik7XG5pbXBvcnQgSUVudGl0eVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9JRW50aXR5XCIpO1xuaW1wb3J0IE1hdGVyaWFsQmFzZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvbWF0ZXJpYWxzL01hdGVyaWFsQmFzZVwiKTtcblxuLyoqXG4gKiBBIExpbmUgU2VnbWVudCBwcmltaXRpdmUuXG4gKi9cbmNsYXNzIExpbmVTZWdtZW50IGV4dGVuZHMgRGlzcGxheU9iamVjdCBpbXBsZW1lbnRzIElFbnRpdHksIElSZW5kZXJhYmxlT3duZXJcbntcblx0cHJpdmF0ZSBfYW5pbWF0b3I6SUFuaW1hdG9yO1xuXHRwcml2YXRlIF9tYXRlcmlhbDpNYXRlcmlhbEJhc2U7XG5cdHByaXZhdGUgX3V2VHJhbnNmb3JtOlVWVHJhbnNmb3JtO1xuXG5cdHB1YmxpYyBfc3RhcnRQb3NpdGlvbjpWZWN0b3IzRDtcblx0cHVibGljIF9lbmRQb3NpdGlvbjpWZWN0b3IzRDtcblx0cHVibGljIF9oYWxmVGhpY2tuZXNzOm51bWJlcjtcblxuXG5cdC8qKlxuXHQgKiBEZWZpbmVzIHRoZSBhbmltYXRvciBvZiB0aGUgbGluZSBzZWdtZW50LiBBY3Qgb24gdGhlIGxpbmUgc2VnbWVudCdzIGdlb21ldHJ5LiBEZWZhdWx0cyB0byBudWxsXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGFuaW1hdG9yKCk6SUFuaW1hdG9yXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fYW5pbWF0b3I7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgYXNzZXRUeXBlKCk6c3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gQXNzZXRUeXBlLkxJTkVfU0VHTUVOVDtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBzdGFydFBvc3Rpb24oKTpWZWN0b3IzRFxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3N0YXJ0UG9zaXRpb247XG5cdH1cblxuXHRwdWJsaWMgc2V0IHN0YXJ0UG9zaXRpb24odmFsdWU6VmVjdG9yM0QpXG5cdHtcblx0XHRpZiAodGhpcy5fc3RhcnRQb3NpdGlvbiA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3N0YXJ0UG9zaXRpb24gPSB2YWx1ZTtcblxuXHRcdHRoaXMubm90aWZ5UmVuZGVyYWJsZVVwZGF0ZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGVuZFBvc2l0aW9uKCk6VmVjdG9yM0Rcblx0e1xuXHRcdHJldHVybiB0aGlzLl9lbmRQb3NpdGlvbjtcblx0fVxuXG5cdHB1YmxpYyBzZXQgZW5kUG9zaXRpb24odmFsdWU6VmVjdG9yM0QpXG5cdHtcblx0XHRpZiAodGhpcy5fZW5kUG9zaXRpb24gPT0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9lbmRQb3NpdGlvbiA9IHZhbHVlO1xuXG5cdFx0dGhpcy5ub3RpZnlSZW5kZXJhYmxlVXBkYXRlKCk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgbWF0ZXJpYWwoKTpNYXRlcmlhbEJhc2Vcblx0e1xuXHRcdHJldHVybiB0aGlzLl9tYXRlcmlhbDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgbWF0ZXJpYWwodmFsdWU6TWF0ZXJpYWxCYXNlKVxuXHR7XG5cdFx0aWYgKHRoaXMubWF0ZXJpYWwpXG5cdFx0XHR0aGlzLm1hdGVyaWFsLmlSZW1vdmVPd25lcih0aGlzKTtcblxuXHRcdHRoaXMuX21hdGVyaWFsID0gdmFsdWU7XG5cblx0XHRpZiAodGhpcy5tYXRlcmlhbClcblx0XHRcdHRoaXMubWF0ZXJpYWwuaUFkZE93bmVyKHRoaXMpO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHRoaWNrbmVzcygpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2hhbGZUaGlja25lc3MqMjtcblx0fVxuXG5cdHB1YmxpYyBzZXQgdGhpY2tuZXNzKHZhbHVlOm51bWJlcilcblx0e1xuXHRcdGlmICh0aGlzLl9oYWxmVGhpY2tuZXNzID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5faGFsZlRoaWNrbmVzcyA9IHZhbHVlKjAuNTtcblxuXHRcdHRoaXMubm90aWZ5UmVuZGVyYWJsZVVwZGF0ZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHV2VHJhbnNmb3JtKCk6VVZUcmFuc2Zvcm1cblx0e1xuXHRcdHJldHVybiB0aGlzLl91dlRyYW5zZm9ybTtcblx0fVxuXG5cdHB1YmxpYyBzZXQgdXZUcmFuc2Zvcm0odmFsdWU6VVZUcmFuc2Zvcm0pXG5cdHtcblx0XHR0aGlzLl91dlRyYW5zZm9ybSA9IHZhbHVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZSBhIGxpbmUgc2VnbWVudFxuXHQgKlxuXHQgKiBAcGFyYW0gc3RhcnRQb3NpdGlvbiBTdGFydCBwb3NpdGlvbiBvZiB0aGUgbGluZSBzZWdtZW50XG5cdCAqIEBwYXJhbSBlbmRQb3NpdGlvbiBFbmRpbmcgcG9zaXRpb24gb2YgdGhlIGxpbmUgc2VnbWVudFxuXHQgKiBAcGFyYW0gdGhpY2tuZXNzIFRoaWNrbmVzcyBvZiB0aGUgbGluZVxuXHQgKi9cblx0Y29uc3RydWN0b3IobWF0ZXJpYWw6TWF0ZXJpYWxCYXNlLCBzdGFydFBvc2l0aW9uOlZlY3RvcjNELCBlbmRQb3NpdGlvbjpWZWN0b3IzRCwgdGhpY2tuZXNzOm51bWJlciA9IDEpXG5cdHtcblx0XHRzdXBlcigpO1xuXG5cdFx0dGhpcy5fcElzRW50aXR5ID0gdHJ1ZTtcblxuXHRcdHRoaXMubWF0ZXJpYWwgPSBtYXRlcmlhbDtcblxuXHRcdHRoaXMuX3N0YXJ0UG9zaXRpb24gPSBzdGFydFBvc2l0aW9uO1xuXHRcdHRoaXMuX2VuZFBvc2l0aW9uID0gZW5kUG9zaXRpb247XG5cdFx0dGhpcy5faGFsZlRoaWNrbmVzcyA9IHRoaWNrbmVzcyowLjU7XG5cdH1cblxuXHRwdWJsaWMgZGlzcG9zZSgpXG5cdHtcblx0XHR0aGlzLl9zdGFydFBvc2l0aW9uID0gbnVsbDtcblx0XHR0aGlzLl9lbmRQb3NpdGlvbiA9IG51bGw7XG5cdH1cblxuXHQvKipcblx0ICogQHByb3RlY3RlZFxuXHQgKi9cblx0cHVibGljIHBDcmVhdGVFbnRpdHlQYXJ0aXRpb25Ob2RlKCk6RW50aXR5Tm9kZVxuXHR7XG5cdFx0cmV0dXJuIG5ldyBFbnRpdHlOb2RlKHRoaXMpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwcm90ZWN0ZWRcblx0ICovXG5cdHB1YmxpYyBwVXBkYXRlQm91bmRzKClcblx0e1xuXHRcdHRoaXMuX3BCb3VuZHMuZnJvbUV4dHJlbWVzKHRoaXMuX3N0YXJ0UG9zaXRpb24ueCwgdGhpcy5fc3RhcnRQb3NpdGlvbi55LCB0aGlzLl9zdGFydFBvc2l0aW9uLnosIHRoaXMuX2VuZFBvc2l0aW9uLngsIHRoaXMuX2VuZFBvc2l0aW9uLnksIHRoaXMuX2VuZFBvc2l0aW9uLnopO1xuXG5cdFx0c3VwZXIucFVwZGF0ZUJvdW5kcygpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRwcml2YXRlIG5vdGlmeVJlbmRlcmFibGVVcGRhdGUoKVxuXHR7XG5cdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9wUmVuZGVyYWJsZXMubGVuZ3RoO1xuXHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IGxlbjsgaSsrKVxuXHRcdFx0dGhpcy5fcFJlbmRlcmFibGVzW2ldLmludmFsaWRhdGVHZW9tZXRyeSgpOyAvL1RPRE8gaW1wcm92ZSBwZXJmb3JtYW5jZSBieSBvbmx5IHVzaW5nIG9uZSBnZW9tZXRyeSBmb3IgYWxsIGxpbmUgc2VnbWVudHNcblx0fVxuXG5cdHB1YmxpYyBfaUNvbGxlY3RSZW5kZXJhYmxlcyhyZW5kZXJlclBvb2w6SVJlbmRlcmVyUG9vbClcblx0e1xuXHRcdC8vIFNpbmNlIHRoaXMgZ2V0dGVyIGlzIGludm9rZWQgZXZlcnkgaXRlcmF0aW9uIG9mIHRoZSByZW5kZXIgbG9vcCwgYW5kXG5cdFx0Ly8gdGhlIHByZWZhYiBjb25zdHJ1Y3QgY291bGQgYWZmZWN0IHRoZSBzdWItbWVzaGVzLCB0aGUgcHJlZmFiIGlzXG5cdFx0Ly8gdmFsaWRhdGVkIGhlcmUgdG8gZ2l2ZSBpdCBhIGNoYW5jZSB0byByZWJ1aWxkLlxuXHRcdGlmICh0aGlzLl9pU291cmNlUHJlZmFiKVxuXHRcdFx0dGhpcy5faVNvdXJjZVByZWZhYi5faVZhbGlkYXRlKCk7XG5cblx0XHR0aGlzLl9pQ29sbGVjdFJlbmRlcmFibGUocmVuZGVyZXJQb29sKTtcblx0fVxuXG5cdHB1YmxpYyBfaUNvbGxlY3RSZW5kZXJhYmxlKHJlbmRlcmVyUG9vbDpJUmVuZGVyZXJQb29sKVxuXHR7XG5cdFx0cmVuZGVyZXJQb29sLmFwcGx5TGluZVNlZ21lbnQodGhpcyk7XG5cdH1cbn1cblxuZXhwb3J0ID0gTGluZVNlZ21lbnQ7Il19