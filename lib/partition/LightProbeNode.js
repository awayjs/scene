"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EntityNode_1 = require("../partition/EntityNode");
/**
 * @class away.partition.LightProbeNode
 */
var LightProbeNode = (function (_super) {
    __extends(LightProbeNode, _super);
    function LightProbeNode() {
        _super.apply(this, arguments);
    }
    /**
     * @inheritDoc
     */
    LightProbeNode.prototype.acceptTraverser = function (traverser) {
        if (traverser.enterNode(this))
            traverser.applyLightProbe(this._displayObject);
    };
    /**
     *
     * @returns {boolean}
     */
    LightProbeNode.prototype.isCastingShadow = function () {
        return false;
    };
    return LightProbeNode;
}(EntityNode_1.EntityNode));
exports.LightProbeNode = LightProbeNode;
