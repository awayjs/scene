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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9hbmltYXRvcnMvbm9kZXMvYW5pbWF0aW9ubm9kZWJhc2UudHMiXSwibmFtZXMiOlsiQW5pbWF0aW9uTm9kZUJhc2UiLCJBbmltYXRpb25Ob2RlQmFzZS5jb25zdHJ1Y3RvciIsIkFuaW1hdGlvbk5vZGVCYXNlLnN0YXRlQ2xhc3MiLCJBbmltYXRpb25Ob2RlQmFzZS5kaXNwb3NlIiwiQW5pbWF0aW9uTm9kZUJhc2UuYXNzZXRUeXBlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFPLFNBQVMsV0FBYyxtQ0FBbUMsQ0FBQyxDQUFDO0FBRW5FLElBQU8sY0FBYyxXQUFhLHdDQUF3QyxDQUFDLENBQUM7QUFFNUUsQUFHQTs7R0FERztJQUNHLGlCQUFpQjtJQUFTQSxVQUExQkEsaUJBQWlCQSxVQUF1QkE7SUFTN0NBOztPQUVHQTtJQUNIQSxTQVpLQSxpQkFBaUJBO1FBY3JCQyxpQkFBT0EsQ0FBQ0E7SUFDVEEsQ0FBQ0E7SUFYREQsc0JBQVdBLHlDQUFVQTthQUFyQkE7WUFFQ0UsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0E7UUFDMUJBLENBQUNBOzs7T0FBQUY7SUFVREE7O09BRUdBO0lBQ0lBLG1DQUFPQSxHQUFkQTtJQUVBRyxDQUFDQTtJQUtESCxzQkFBV0Esd0NBQVNBO1FBSHBCQTs7V0FFR0E7YUFDSEE7WUFFQ0ksTUFBTUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsY0FBY0EsQ0FBQ0E7UUFDakNBLENBQUNBOzs7T0FBQUo7SUFDRkEsd0JBQUNBO0FBQURBLENBL0JBLEFBK0JDQSxFQS9CK0IsY0FBYyxFQStCN0M7QUFFRCxBQUEyQixpQkFBbEIsaUJBQWlCLENBQUMiLCJmaWxlIjoiYW5pbWF0b3JzL25vZGVzL0FuaW1hdGlvbk5vZGVCYXNlLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBc3NldFR5cGVcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0Fzc2V0VHlwZVwiKTtcbmltcG9ydCBJQXNzZXRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvSUFzc2V0XCIpO1xuaW1wb3J0IE5hbWVkQXNzZXRCYXNlXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvTmFtZWRBc3NldEJhc2VcIik7XG5cbi8qKlxuICogUHJvdmlkZXMgYW4gYWJzdHJhY3QgYmFzZSBjbGFzcyBmb3Igbm9kZXMgaW4gYW4gYW5pbWF0aW9uIGJsZW5kIHRyZWUuXG4gKi9cbmNsYXNzIEFuaW1hdGlvbk5vZGVCYXNlIGV4dGVuZHMgTmFtZWRBc3NldEJhc2UgaW1wbGVtZW50cyBJQXNzZXRcbntcblx0cHVibGljIF9wU3RhdGVDbGFzczphbnk7XG5cblx0cHVibGljIGdldCBzdGF0ZUNsYXNzKCk6YW55XG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcFN0YXRlQ2xhc3M7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlcyBhIG5ldyA8Y29kZT5BbmltYXRpb25Ob2RlQmFzZTwvY29kZT4gb2JqZWN0LlxuXHQgKi9cblx0Y29uc3RydWN0b3IoKVxuXHR7XG5cdFx0c3VwZXIoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAaW5oZXJpdERvY1xuXHQgKi9cblx0cHVibGljIGRpc3Bvc2UoKVxuXHR7XG5cdH1cblxuXHQvKipcblx0ICogQGluaGVyaXREb2Ncblx0ICovXG5cdHB1YmxpYyBnZXQgYXNzZXRUeXBlKCk6c3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gQXNzZXRUeXBlLkFOSU1BVElPTl9OT0RFO1xuXHR9XG59XG5cbmV4cG9ydCA9IEFuaW1hdGlvbk5vZGVCYXNlOyJdfQ==