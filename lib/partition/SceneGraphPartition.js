"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SceneGraphNode_1 = require("../partition/SceneGraphNode");
var PartitionBase_1 = require("../partition/PartitionBase");
/**
 * @class away.partition.Partition
 */
var SceneGraphPartition = (function (_super) {
    __extends(SceneGraphPartition, _super);
    function SceneGraphPartition() {
        _super.call(this);
        this._sceneGraphNodePool = new SceneGraphNodePool();
    }
    SceneGraphPartition.prototype.traverse = function (traverser) {
        _super.prototype.traverse.call(this, traverser);
    };
    /**
     *
     * @param entity
     * @returns {away.partition.NodeBase}
     */
    SceneGraphPartition.prototype.findParentForNode = function (node) {
        if (node.isSceneGraphNode && (node._displayObject.partition == this || node._displayObject._iIsRoot)) {
            this._rootNode = node;
            return null;
        }
        if (!node.isSceneGraphNode && node._displayObject.isContainer)
            return this._sceneGraphNodePool.getAbstraction(node._displayObject);
        return this._sceneGraphNodePool.getAbstraction(node._displayObject.parent);
    };
    /**
     * @internal
     */
    SceneGraphPartition.prototype._iRegisterEntity = function (displayObject) {
        _super.prototype._iRegisterEntity.call(this, displayObject);
        if (displayObject.isContainer)
            this.iMarkForUpdate(this._sceneGraphNodePool.getAbstraction(displayObject));
    };
    /**
     * @internal
     */
    SceneGraphPartition.prototype._iUnregisterEntity = function (displayObject) {
        _super.prototype._iUnregisterEntity.call(this, displayObject);
        if (displayObject.isContainer)
            this.iRemoveEntity(this._sceneGraphNodePool.getAbstraction(displayObject));
    };
    return SceneGraphPartition;
}(PartitionBase_1.PartitionBase));
exports.SceneGraphPartition = SceneGraphPartition;
/**
 * @class away.pool.SceneGraphNodePool
 */
var SceneGraphNodePool = (function () {
    function SceneGraphNodePool() {
        this._abstractionPool = new Object();
    }
    /**
     * //TODO
     *
     * @param entity
     * @returns EntityNode
     */
    SceneGraphNodePool.prototype.getAbstraction = function (displayObjectContainer) {
        return (this._abstractionPool[displayObjectContainer.id] || (this._abstractionPool[displayObjectContainer.id] = new SceneGraphNode_1.SceneGraphNode(displayObjectContainer, this)));
    };
    /**
     * //TODO
     *
     * @param entity
     */
    SceneGraphNodePool.prototype.clearAbstraction = function (displayObjectContainer) {
        delete this._abstractionPool[displayObjectContainer.id];
    };
    return SceneGraphNodePool;
}());
exports.SceneGraphNodePool = SceneGraphNodePool;
