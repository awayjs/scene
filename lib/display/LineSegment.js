"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var graphics_1 = require("@awayjs/graphics");
var BoundsType_1 = require("../bounds/BoundsType");
var DisplayObject_1 = require("./DisplayObject");
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
        var _this = _super.call(this) || this;
        _this._pIsEntity = true;
        _this.material = material;
        _this._startPosition = startPosition;
        _this._endPosition = endPosition;
        _this._halfThickness = thickness * 0.5;
        //default bounds type
        _this._boundsType = BoundsType_1.BoundsType.AXIS_ALIGNED_BOX;
        return _this;
    }
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
            this.invalidateElements();
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
            this.invalidateElements();
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
            this.invalidateElements();
        },
        enumerable: true,
        configurable: true
    });
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
    LineSegment.prototype.invalidateElements = function () {
        this.dispatchEvent(new graphics_1.RenderableEvent(graphics_1.RenderableEvent.INVALIDATE_ELEMENTS, this)); //TODO improve performance by only using one geometry for all line segments
    };
    LineSegment.prototype.invalidateMaterial = function () {
        this.dispatchEvent(new graphics_1.RenderableEvent(graphics_1.RenderableEvent.INVALIDATE_MATERIAL, this));
    };
    LineSegment.prototype._acceptTraverser = function (traverser) {
        traverser[LineSegment.traverseName](this);
    };
    return LineSegment;
}(DisplayObject_1.DisplayObject));
LineSegment.traverseName = graphics_1.TraverserBase.addRenderableName("applyLineSegment");
LineSegment.assetType = "[asset LineSegment]";
exports.LineSegment = LineSegment;
