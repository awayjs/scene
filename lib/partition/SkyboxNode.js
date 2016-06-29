"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EntityNode_1 = require("../partition/EntityNode");
/**
 * SkyboxNode is a space partitioning leaf node that contains a Skybox object.
 *
 * @class away.partition.SkyboxNode
 */
var SkyboxNode = (function (_super) {
    __extends(SkyboxNode, _super);
    function SkyboxNode() {
        _super.apply(this, arguments);
    }
    /**
     *
     * @param planes
     * @param numPlanes
     * @returns {boolean}
     */
    SkyboxNode.prototype.isInFrustum = function (planes, numPlanes) {
        if (!this._displayObject._iIsVisible)
            return false;
        //a skybox is always in view unless its visibility is set to false
        return true;
    };
    /**
     *
     * @returns {boolean}
     */
    SkyboxNode.prototype.isCastingShadow = function () {
        return false; //skybox never casts shadows
    };
    return SkyboxNode;
}(EntityNode_1.EntityNode));
exports.SkyboxNode = SkyboxNode;
