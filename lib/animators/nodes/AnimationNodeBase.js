"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AssetBase_1 = require("@awayjs/core/lib/library/AssetBase");
/**
 * Provides an abstract base class for nodes in an animation blend tree.
 */
var AnimationNodeBase = (function (_super) {
    __extends(AnimationNodeBase, _super);
    /**
     * Creates a new <code>AnimationNodeBase</code> object.
     */
    function AnimationNodeBase() {
        _super.call(this);
    }
    Object.defineProperty(AnimationNodeBase.prototype, "stateClass", {
        get: function () {
            return this._pStateClass;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @inheritDoc
     */
    AnimationNodeBase.prototype.dispose = function () {
    };
    Object.defineProperty(AnimationNodeBase.prototype, "assetType", {
        /**
         * @inheritDoc
         */
        get: function () {
            return AnimationNodeBase.assetType;
        },
        enumerable: true,
        configurable: true
    });
    AnimationNodeBase.assetType = "[asset AnimationNodeBase]";
    return AnimationNodeBase;
}(AssetBase_1.AssetBase));
exports.AnimationNodeBase = AnimationNodeBase;
