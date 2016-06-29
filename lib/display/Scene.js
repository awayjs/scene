"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DisplayObjectContainer_1 = require("../display/DisplayObjectContainer");
var BasicPartition_1 = require("../partition/BasicPartition");
var Scene = (function (_super) {
    __extends(Scene, _super);
    function Scene(partition) {
        if (partition === void 0) { partition = null; }
        _super.call(this);
        this._expandedPartitions = new Array();
        this._partitions = new Array();
        this._iCollectionMark = 0;
        this.partition = partition || new BasicPartition_1.BasicPartition();
        this._iIsRoot = true;
        this._pScene = this;
    }
    Scene.prototype.traversePartitions = function (traverser) {
        var i = 0;
        var len = this._partitions.length;
        while (i < len)
            this._partitions[i++].traverse(traverser);
    };
    /**
     * @internal
     */
    Scene.prototype._iRegisterPartition = function (partition) {
        this._expandedPartitions.push(partition);
        //ensure duplicates are not found in partitions array
        if (this._partitions.indexOf(partition) == -1)
            this._partitions.push(partition);
    };
    /**
     * @internal
     */
    Scene.prototype._iUnregisterPartition = function (partition) {
        this._expandedPartitions.splice(this._expandedPartitions.indexOf(partition), 1);
        //if no more partition references found, remove from partitions array
        if (this._expandedPartitions.indexOf(partition) == -1)
            this._partitions.splice(this._partitions.indexOf(partition), 1);
    };
    return Scene;
}(DisplayObjectContainer_1.DisplayObjectContainer));
exports.Scene = Scene;
