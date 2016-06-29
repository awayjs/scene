"use strict";
/**
 * @class away.partition.Partition
 */
var PartitionBase = (function () {
    function PartitionBase() {
        this._abstractionPool = new Object();
        this._updatesMade = false;
    }
    PartitionBase.prototype.getAbstraction = function (displayObject) {
        return (this._abstractionPool[displayObject.id] || (this._abstractionPool[displayObject.id] = new PartitionBase._abstractionClassPool[displayObject.assetType](displayObject, this)));
    };
    /**
     *
     * @param image
     */
    PartitionBase.prototype.clearAbstraction = function (displayObject) {
        this._abstractionPool[displayObject.id] = null;
    };
    PartitionBase.prototype.traverse = function (traverser) {
        if (this._updatesMade)
            this.updateEntities();
        if (this._rootNode) {
            this._rootNode.acceptTraverser(traverser);
        }
    };
    PartitionBase.prototype.iMarkForUpdate = function (node) {
        var t = this._updateQueue;
        while (t) {
            if (node == t)
                return;
            t = t._iUpdateQueueNext;
        }
        node._iUpdateQueueNext = this._updateQueue;
        this._updateQueue = node;
        this._updatesMade = true;
    };
    PartitionBase.prototype.iRemoveEntity = function (node) {
        var t;
        if (node.parent) {
            node.parent.iRemoveNode(node);
            node.parent = null;
        }
        if (node == this._updateQueue) {
            this._updateQueue = node._iUpdateQueueNext;
        }
        else {
            t = this._updateQueue;
            while (t && t._iUpdateQueueNext != node)
                t = t._iUpdateQueueNext;
            if (t)
                t._iUpdateQueueNext = node._iUpdateQueueNext;
        }
        node._iUpdateQueueNext = null;
        if (!this._updateQueue)
            this._updatesMade = false;
    };
    /**
     *
     * @param entity
     * @returns {away.partition.NodeBase}
     */
    PartitionBase.prototype.findParentForNode = function (node) {
        return this._rootNode;
    };
    PartitionBase.prototype.updateEntities = function () {
        var node = this._updateQueue;
        while (node) {
            //required for controllers with autoUpdate set to true and queued events
            node._displayObject._iInternalUpdate();
            node = node._iUpdateQueueNext;
        }
        //reset head
        node = this._updateQueue;
        var targetNode;
        var t;
        this._updateQueue = null;
        this._updatesMade = false;
        do {
            targetNode = this.findParentForNode(node);
            if (node.parent != targetNode) {
                if (node.parent)
                    node.parent.iRemoveNode(node);
                targetNode.iAddNode(node);
            }
            t = node._iUpdateQueueNext;
            node._iUpdateQueueNext = null;
        } while ((node = t) != null);
    };
    /**
     * @internal
     */
    PartitionBase.prototype._iRegisterEntity = function (displayObject) {
        if (displayObject.isEntity)
            this.iMarkForUpdate(this.getAbstraction(displayObject));
    };
    /**
     * @internal
     */
    PartitionBase.prototype._iUnregisterEntity = function (displayObject) {
        if (displayObject.isEntity)
            this.iRemoveEntity(this.getAbstraction(displayObject));
    };
    /**
     *
     * @param imageObjectClass
     */
    PartitionBase.registerAbstraction = function (entityNodeClass, assetClass) {
        PartitionBase._abstractionClassPool[assetClass.assetType] = entityNodeClass;
    };
    PartitionBase._abstractionClassPool = new Object();
    return PartitionBase;
}());
exports.PartitionBase = PartitionBase;
