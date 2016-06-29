"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DisplayObject_1 = require("../display/DisplayObject");
var BoundsType_1 = require("../bounds/BoundsType");
var RenderableEvent_1 = require("../events/RenderableEvent");
var StyleEvent_1 = require("../events/StyleEvent");
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
        this._onInvalidatePropertiesDelegate = function (event) { return _this._onInvalidateProperties(event); };
        this._pIsEntity = true;
        this.material = material;
        this._startPosition = startPosition;
        this._endPosition = endPosition;
        this._halfThickness = thickness * 0.5;
        //default bounds type
        this._boundsType = BoundsType_1.BoundsType.AXIS_ALIGNED_BOX;
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
            this.invalidateElements();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineSegment.prototype, "style", {
        /**
         * The style used to render the current LineSegment. If set to null, the default style of the material will be used instead.
         */
        get: function () {
            return this._style;
        },
        set: function (value) {
            if (this._style == value)
                return;
            if (this._style)
                this._style.removeEventListener(StyleEvent_1.StyleEvent.INVALIDATE_PROPERTIES, this._onInvalidatePropertiesDelegate);
            this._style = value;
            if (this._style)
                this._style.addEventListener(StyleEvent_1.StyleEvent.INVALIDATE_PROPERTIES, this._onInvalidatePropertiesDelegate);
            this.invalidateSurface();
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
        this.dispatchEvent(new RenderableEvent_1.RenderableEvent(RenderableEvent_1.RenderableEvent.INVALIDATE_ELEMENTS, this)); //TODO improve performance by only using one geometry for all line segments
    };
    LineSegment.prototype.invalidateSurface = function () {
        this.dispatchEvent(new RenderableEvent_1.RenderableEvent(RenderableEvent_1.RenderableEvent.INVALIDATE_SURFACE, this));
    };
    LineSegment.prototype._onInvalidateProperties = function (event) {
        this.invalidateSurface();
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
    LineSegment.prototype._iTestCollision = function (pickingCollision, pickingCollider) {
        return false; //TODO: detect line collisions
    };
    LineSegment.prototype._acceptTraverser = function (traverser) {
        traverser.applyRenderable(this);
    };
    LineSegment.assetType = "[asset LineSegment]";
    return LineSegment;
}(DisplayObject_1.DisplayObject));
exports.LineSegment = LineSegment;
