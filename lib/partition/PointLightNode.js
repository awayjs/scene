"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EntityNode_1 = require("../partition/EntityNode");
/**
 * @class away.partition.PointLightNode
 */
var PointLightNode = (function (_super) {
    __extends(PointLightNode, _super);
    function PointLightNode() {
        _super.apply(this, arguments);
    }
    /**
     * @inheritDoc
     */
    PointLightNode.prototype.acceptTraverser = function (traverser) {
        if (traverser.enterNode(this))
            traverser.applyPointLight(this._displayObject);
    };
    /**
     *
     * @returns {boolean}
     */
    PointLightNode.prototype.isCastingShadow = function () {
        return false;
    };
    return PointLightNode;
}(EntityNode_1.EntityNode));
exports.PointLightNode = PointLightNode;
