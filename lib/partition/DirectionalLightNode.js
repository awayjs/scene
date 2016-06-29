"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EntityNode_1 = require("../partition/EntityNode");
/**
 * @class away.partition.DirectionalLightNode
 */
var DirectionalLightNode = (function (_super) {
    __extends(DirectionalLightNode, _super);
    function DirectionalLightNode() {
        _super.apply(this, arguments);
    }
    /**
     * @inheritDoc
     */
    DirectionalLightNode.prototype.acceptTraverser = function (traverser) {
        if (traverser.enterNode(this))
            traverser.applyDirectionalLight(this._displayObject);
    };
    /**
     *
     * @returns {boolean}
     */
    DirectionalLightNode.prototype.isCastingShadow = function () {
        return false;
    };
    return DirectionalLightNode;
}(EntityNode_1.EntityNode));
exports.DirectionalLightNode = DirectionalLightNode;
