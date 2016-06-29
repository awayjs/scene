"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Vector3D_1 = require("@awayjs/core/lib/geom/Vector3D");
var DisplayObjectNode_1 = require("../partition/DisplayObjectNode");
/**
 * @class away.partition.EntityNode
 */
var EntityNode = (function (_super) {
    __extends(EntityNode, _super);
    function EntityNode(displayObject, partition) {
        _super.call(this, displayObject, partition);
        this.numEntities = 1;
        this._maskPosition = new Vector3D_1.Vector3D();
        this._partition = partition;
    }
    EntityNode.prototype.onClear = function (event) {
        _super.prototype.onClear.call(this, event);
        this._partition = null;
    };
    /**
     *
     * @param planes
     * @param numPlanes
     * @returns {boolean}
     */
    EntityNode.prototype.isInFrustum = function (planes, numPlanes) {
        if (!this._displayObject._iIsVisible())
            return false;
        return true; // todo: hack for 2d. attention. might break stuff in 3d.
        //return this._bounds.isInFrustum(planes, numPlanes);
    };
    /**
     * @inheritDoc
     */
    EntityNode.prototype.isIntersectingRay = function (globalRayPosition, globalRayDirection) {
        if (!this._displayObject._iIsVisible() || !this.isIntersectingMasks(globalRayPosition, globalRayDirection, this._displayObject._iAssignedMasks()))
            return false;
        var pickingCollision = this._displayObject._iPickingCollision;
        pickingCollision.rayPosition = this._displayObject.inverseSceneTransform.transformVector(globalRayPosition);
        pickingCollision.rayDirection = this._displayObject.inverseSceneTransform.deltaTransformVector(globalRayDirection);
        if (!pickingCollision.normal)
            pickingCollision.normal = new Vector3D_1.Vector3D();
        var rayEntryDistance = this.bounds.rayIntersection(pickingCollision.rayPosition, pickingCollision.rayDirection, pickingCollision.normal);
        if (rayEntryDistance < 0)
            return false;
        pickingCollision.rayEntryDistance = rayEntryDistance;
        pickingCollision.globalRayPosition = globalRayPosition;
        pickingCollision.globalRayDirection = globalRayDirection;
        pickingCollision.rayOriginIsInsideBounds = rayEntryDistance == 0;
        return true;
    };
    /**
     *
     * @returns {boolean}
     */
    EntityNode.prototype.isRenderable = function () {
        return this._displayObject._iAssignedColorTransform()._isRenderable();
    };
    /**
     * @inheritDoc
     */
    EntityNode.prototype.acceptTraverser = function (traverser) {
        if (traverser.enterNode(this))
            traverser.applyEntity(this._displayObject);
    };
    EntityNode.prototype._onInvalidatePartitionBounds = function (event) {
        this.bounds.invalidate();
        this._partition.iMarkForUpdate(this);
    };
    EntityNode.prototype.isIntersectingMasks = function (globalRayPosition, globalRayDirection, masks) {
        //horrible hack for 2d masks
        if (masks != null) {
            this._maskPosition.x = globalRayPosition.x + globalRayDirection.x * 1000;
            this._maskPosition.y = globalRayPosition.y + globalRayDirection.y * 1000;
            var numLayers = masks.length;
            var children;
            var numChildren;
            var layerHit;
            for (var i = 0; i < numLayers; i++) {
                children = masks[i];
                numChildren = children.length;
                layerHit = false;
                for (var j = 0; j < numChildren; j++) {
                    if (children[j].hitTestPoint(this._maskPosition.x, this._maskPosition.y, true, true)) {
                        layerHit = true;
                        break;
                    }
                }
                if (!layerHit)
                    return false;
            }
        }
        return true;
    };
    return EntityNode;
}(DisplayObjectNode_1.DisplayObjectNode));
exports.EntityNode = EntityNode;
