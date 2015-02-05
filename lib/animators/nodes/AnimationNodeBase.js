var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AssetType = require("awayjs-core/lib/library/AssetType");
var NamedAssetBase = require("awayjs-core/lib/library/NamedAssetBase");
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
            return AssetType.ANIMATION_NODE;
        },
        enumerable: true,
        configurable: true
    });
    return AnimationNodeBase;
})(NamedAssetBase);
module.exports = AnimationNodeBase;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9hbmltYXRvcnMvbm9kZXMvQW5pbWF0aW9uTm9kZUJhc2UudHMiXSwibmFtZXMiOlsiQW5pbWF0aW9uTm9kZUJhc2UiLCJBbmltYXRpb25Ob2RlQmFzZS5jb25zdHJ1Y3RvciIsIkFuaW1hdGlvbk5vZGVCYXNlLnN0YXRlQ2xhc3MiLCJBbmltYXRpb25Ob2RlQmFzZS5kaXNwb3NlIiwiQW5pbWF0aW9uTm9kZUJhc2UuYXNzZXRUeXBlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFPLFNBQVMsV0FBYyxtQ0FBbUMsQ0FBQyxDQUFDO0FBRW5FLElBQU8sY0FBYyxXQUFhLHdDQUF3QyxDQUFDLENBQUM7QUFFNUUsQUFHQTs7R0FERztJQUNHLGlCQUFpQjtJQUFTQSxVQUExQkEsaUJBQWlCQSxVQUF1QkE7SUFTN0NBOztPQUVHQTtJQUNIQSxTQVpLQSxpQkFBaUJBO1FBY3JCQyxpQkFBT0EsQ0FBQ0E7SUFDVEEsQ0FBQ0E7SUFYREQsc0JBQVdBLHlDQUFVQTthQUFyQkE7WUFFQ0UsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0E7UUFDMUJBLENBQUNBOzs7T0FBQUY7SUFVREE7O09BRUdBO0lBQ0lBLG1DQUFPQSxHQUFkQTtJQUVBRyxDQUFDQTtJQUtESCxzQkFBV0Esd0NBQVNBO1FBSHBCQTs7V0FFR0E7YUFDSEE7WUFFQ0ksTUFBTUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsY0FBY0EsQ0FBQ0E7UUFDakNBLENBQUNBOzs7T0FBQUo7SUFDRkEsd0JBQUNBO0FBQURBLENBL0JBLEFBK0JDQSxFQS9CK0IsY0FBYyxFQStCN0M7QUFFRCxBQUEyQixpQkFBbEIsaUJBQWlCLENBQUMiLCJmaWxlIjoiYW5pbWF0b3JzL25vZGVzL0FuaW1hdGlvbk5vZGVCYXNlLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBc3NldFR5cGVcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0Fzc2V0VHlwZVwiKTtcclxuaW1wb3J0IElBc3NldFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9JQXNzZXRcIik7XHJcbmltcG9ydCBOYW1lZEFzc2V0QmFzZVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L05hbWVkQXNzZXRCYXNlXCIpO1xyXG5cclxuLyoqXHJcbiAqIFByb3ZpZGVzIGFuIGFic3RyYWN0IGJhc2UgY2xhc3MgZm9yIG5vZGVzIGluIGFuIGFuaW1hdGlvbiBibGVuZCB0cmVlLlxyXG4gKi9cclxuY2xhc3MgQW5pbWF0aW9uTm9kZUJhc2UgZXh0ZW5kcyBOYW1lZEFzc2V0QmFzZSBpbXBsZW1lbnRzIElBc3NldFxyXG57XHJcblx0cHVibGljIF9wU3RhdGVDbGFzczphbnk7XHJcblxyXG5cdHB1YmxpYyBnZXQgc3RhdGVDbGFzcygpOmFueVxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9wU3RhdGVDbGFzcztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYSBuZXcgPGNvZGU+QW5pbWF0aW9uTm9kZUJhc2U8L2NvZGU+IG9iamVjdC5cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcigpXHJcblx0e1xyXG5cdFx0c3VwZXIoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBpbmhlcml0RG9jXHJcblx0ICovXHJcblx0cHVibGljIGRpc3Bvc2UoKVxyXG5cdHtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBpbmhlcml0RG9jXHJcblx0ICovXHJcblx0cHVibGljIGdldCBhc3NldFR5cGUoKTpzdHJpbmdcclxuXHR7XHJcblx0XHRyZXR1cm4gQXNzZXRUeXBlLkFOSU1BVElPTl9OT0RFO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0ID0gQW5pbWF0aW9uTm9kZUJhc2U7Il19