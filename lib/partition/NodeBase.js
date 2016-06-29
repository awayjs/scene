"use strict";
var NullBounds_1 = require("../bounds/NullBounds");
/**
 * @class away.partition.NodeBase
 */
var NodeBase = (function () {
    /**
     *
     */
    function NodeBase() {
        this._bounds = new NullBounds_1.NullBounds();
        this._pChildNodes = new Array();
        this._pNumChildNodes = 0;
        this.numEntities = 0;
    }
    Object.defineProperty(NodeBase.prototype, "debugVisible", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NodeBase.prototype, "bounds", {
        /**
         * @internal
         */
        get: function () {
            return this._bounds; //TODO
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     * @param planes
     * @param numPlanes
     * @returns {boolean}
     * @internal
     */
    NodeBase.prototype.isInFrustum = function (planes, numPlanes) {
        return true;
    };
    /**
     *
     * @param rayPosition
     * @param rayDirection
     * @returns {boolean}
     */
    NodeBase.prototype.isIntersectingRay = function (rayPosition, rayDirection) {
        return true;
    };
    /**
     *
     * @returns {boolean}
     */
    NodeBase.prototype.isRenderable = function () {
        return true;
    };
    /**
     *
     * @returns {boolean}
     */
    NodeBase.prototype.isCastingShadow = function () {
        return true;
    };
    /**
     *
     * @returns {boolean}
     */
    NodeBase.prototype.isMask = function () {
        return false;
    };
    NodeBase.prototype.dispose = function () {
        this.parent = null;
        this._pChildNodes = null;
    };
    /**
     *
     * @param traverser
     */
    NodeBase.prototype.acceptTraverser = function (traverser) {
        if (this.numEntities == 0)
            return;
        if (traverser.enterNode(this)) {
            for (var i = 0; i < this._pNumChildNodes; i++)
                this._pChildNodes[i].acceptTraverser(traverser);
        }
    };
    /**
     *
     * @param node
     * @internal
     */
    NodeBase.prototype.iAddNode = function (node) {
        node.parent = this;
        this.numEntities += node.numEntities;
        this._pChildNodes[this._pNumChildNodes++] = node;
        var numEntities = node.numEntities;
        node = this;
        do {
            node.numEntities += numEntities;
        } while ((node = node.parent) != null);
    };
    /**
     *
     * @param node
     * @internal
     */
    NodeBase.prototype.iRemoveNode = function (node) {
        var index = this._pChildNodes.indexOf(node);
        this._pChildNodes[index] = this._pChildNodes[--this._pNumChildNodes];
        this._pChildNodes.pop();
        var numEntities = node.numEntities;
        node = this;
        do {
            node.numEntities -= numEntities;
        } while ((node = node.parent) != null);
    };
    return NodeBase;
}());
exports.NodeBase = NodeBase;
