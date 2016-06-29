"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AbstractionBase_1 = require("@awayjs/core/lib/library/AbstractionBase");
var AxisAlignedBoundingBox_1 = require("../bounds/AxisAlignedBoundingBox");
var BoundingSphere_1 = require("../bounds/BoundingSphere");
var BoundsType_1 = require("../bounds/BoundsType");
var NullBounds_1 = require("../bounds/NullBounds");
var DisplayObjectEvent_1 = require("../events/DisplayObjectEvent");
/**
 * @class away.partition.EntityNode
 */
var DisplayObjectNode = (function (_super) {
    __extends(DisplayObjectNode, _super);
    function DisplayObjectNode(displayObject, pool) {
        var _this = this;
        _super.call(this, displayObject, pool);
        this.numEntities = 0;
        this.isSceneGraphNode = false;
        this._boundsDirty = true;
        this._onInvalidatePartitionBoundsDelegate = function (event) { return _this._onInvalidatePartitionBounds(event); };
        this._displayObject = displayObject;
        this._displayObject.addEventListener(DisplayObjectEvent_1.DisplayObjectEvent.INVALIDATE_PARTITION_BOUNDS, this._onInvalidatePartitionBoundsDelegate);
        this._boundsType = this._displayObject.boundsType;
    }
    Object.defineProperty(DisplayObjectNode.prototype, "debugVisible", {
        get: function () {
            return this._displayObject.debugVisible;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObjectNode.prototype, "bounds", {
        /**
         * @internal
         */
        get: function () {
            if (this._boundsDirty)
                this._updateBounds();
            return this._bounds;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     * @returns {boolean}
     */
    DisplayObjectNode.prototype.isCastingShadow = function () {
        return this._displayObject.castsShadows;
    };
    /**
     *
     * @returns {boolean}
     */
    DisplayObjectNode.prototype.isMask = function () {
        return this._displayObject.maskMode;
    };
    DisplayObjectNode.prototype.onClear = function (event) {
        _super.prototype.onClear.call(this, event);
        this._displayObject.removeEventListener(DisplayObjectEvent_1.DisplayObjectEvent.INVALIDATE_PARTITION_BOUNDS, this._onInvalidatePartitionBoundsDelegate);
        this._displayObject = null;
        if (this._bounds)
            this._bounds.dispose();
        this._bounds = null;
    };
    DisplayObjectNode.prototype.onInvalidate = function (event) {
        _super.prototype.onInvalidate.call(this, event);
        if (this._boundsType != this._displayObject.boundsType) {
            this._boundsType = this._displayObject.boundsType;
            this._boundsDirty = true;
        }
    };
    /**
     *
     * @param planes
     * @param numPlanes
     * @returns {boolean}
     */
    DisplayObjectNode.prototype.isInFrustum = function (planes, numPlanes) {
        return true;
    };
    /**
     * @inheritDoc
     */
    DisplayObjectNode.prototype.isIntersectingRay = function (rayPosition, rayDirection) {
        return true;
    };
    /**
     *
     * @returns {boolean}
     */
    DisplayObjectNode.prototype.isRenderable = function () {
        return true;
    };
    /**
     * @inheritDoc
     */
    DisplayObjectNode.prototype.acceptTraverser = function (traverser) {
        // do nothing here
    };
    DisplayObjectNode.prototype._onInvalidatePartitionBounds = function (event) {
        // do nothing here
    };
    DisplayObjectNode.prototype._updateBounds = function () {
        if (this._bounds)
            this._bounds.dispose();
        if (this._boundsType == BoundsType_1.BoundsType.AXIS_ALIGNED_BOX)
            this._bounds = new AxisAlignedBoundingBox_1.AxisAlignedBoundingBox(this._displayObject);
        else if (this._boundsType == BoundsType_1.BoundsType.SPHERE)
            this._bounds = new BoundingSphere_1.BoundingSphere(this._displayObject);
        else if (this._boundsType == BoundsType_1.BoundsType.NULL)
            this._bounds = new NullBounds_1.NullBounds();
        this._boundsDirty = false;
    };
    return DisplayObjectNode;
}(AbstractionBase_1.AbstractionBase));
exports.DisplayObjectNode = DisplayObjectNode;
