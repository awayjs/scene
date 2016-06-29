"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DisplayObjectNode_1 = require("../partition/DisplayObjectNode");
/**
 * Maintains scenegraph heirarchy when collecting nodes
 */
var SceneGraphNode = (function (_super) {
    __extends(SceneGraphNode, _super);
    function SceneGraphNode() {
        _super.apply(this, arguments);
        this.isSceneGraphNode = true;
        this._numNodes = 0;
        this._pChildNodes = new Array();
        this._childDepths = new Array();
        this._numMasks = 0;
        this._childMasks = new Array();
    }
    /**
     *
     * @param traverser
     */
    SceneGraphNode.prototype.acceptTraverser = function (traverser) {
        //containers nodes are for ordering only, no need to check enterNode or debugVisible
        if (this.numEntities == 0)
            return;
        var i;
        for (i = 0; i < this._numNodes; i++)
            this._pChildNodes[i].acceptTraverser(traverser);
        for (i = 0; i < this._numMasks; i++)
            this._childMasks[i].acceptTraverser(traverser);
    };
    /**
     *
     * @param node
     * @internal
     */
    SceneGraphNode.prototype.iAddNode = function (node) {
        node.parent = this;
        if (node._displayObject.maskMode) {
            this._childMasks.push(node);
            this._numMasks++;
        }
        else {
            var depth = node._displayObject._depthID;
            var len = this._childDepths.length;
            var index = len;
            while (index--)
                if (this._childDepths[index] < depth)
                    break;
            index++;
            if (index < len) {
                this._pChildNodes.splice(index, 0, node);
                this._childDepths.splice(index, 0, depth);
            }
            else {
                this._pChildNodes.push(node);
                this._childDepths.push(depth);
            }
            this._numNodes++;
        }
        var numEntities = node.isSceneGraphNode ? node.numEntities : 1;
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
    SceneGraphNode.prototype.iRemoveNode = function (node) {
        if (node._displayObject.maskMode) {
            this._childMasks.splice(this._childMasks.indexOf(node), 1);
            this._numMasks--;
        }
        else {
            var index = this._pChildNodes.indexOf(node);
            this._pChildNodes.splice(index, 1);
            this._childDepths.splice(index, 1);
            this._numNodes--;
        }
        var numEntities = node.numEntities;
        node = this;
        do {
            node.numEntities -= numEntities;
        } while ((node = node.parent) != null);
    };
    return SceneGraphNode;
}(DisplayObjectNode_1.DisplayObjectNode));
exports.SceneGraphNode = SceneGraphNode;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SceneGraphNode;
