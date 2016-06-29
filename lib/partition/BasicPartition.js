"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NodeBase_1 = require("../partition/NodeBase");
var PartitionBase_1 = require("../partition/PartitionBase");
/**
 * @class away.partition.Partition
 */
var BasicPartition = (function (_super) {
    __extends(BasicPartition, _super);
    function BasicPartition() {
        _super.call(this);
        this._rootNode = new NodeBase_1.NodeBase();
    }
    return BasicPartition;
}(PartitionBase_1.PartitionBase));
exports.BasicPartition = BasicPartition;
