var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AssetBase = require("awayjs-core/lib/library/AssetBase");
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
})(AssetBase);
module.exports = AnimationNodeBase;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9hbmltYXRvcnMvbm9kZXMvQW5pbWF0aW9uTm9kZUJhc2UudHMiXSwibmFtZXMiOlsiQW5pbWF0aW9uTm9kZUJhc2UiLCJBbmltYXRpb25Ob2RlQmFzZS5jb25zdHJ1Y3RvciIsIkFuaW1hdGlvbk5vZGVCYXNlLnN0YXRlQ2xhc3MiLCJBbmltYXRpb25Ob2RlQmFzZS5kaXNwb3NlIiwiQW5pbWF0aW9uTm9kZUJhc2UuYXNzZXRUeXBlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxJQUFPLFNBQVMsV0FBYyxtQ0FBbUMsQ0FBQyxDQUFDO0FBRW5FLEFBR0E7O0dBREc7SUFDRyxpQkFBaUI7SUFBU0EsVUFBMUJBLGlCQUFpQkEsVUFBa0JBO0lBV3hDQTs7T0FFR0E7SUFDSEEsU0FkS0EsaUJBQWlCQTtRQWdCckJDLGlCQUFPQSxDQUFDQTtJQUNUQSxDQUFDQTtJQVhERCxzQkFBV0EseUNBQVVBO2FBQXJCQTtZQUVDRSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQTtRQUMxQkEsQ0FBQ0E7OztPQUFBRjtJQVVEQTs7T0FFR0E7SUFDSUEsbUNBQU9BLEdBQWRBO0lBRUFHLENBQUNBO0lBS0RILHNCQUFXQSx3Q0FBU0E7UUFIcEJBOztXQUVHQTthQUNIQTtZQUVDSSxNQUFNQSxDQUFDQSxpQkFBaUJBLENBQUNBLFNBQVNBLENBQUNBO1FBQ3BDQSxDQUFDQTs7O09BQUFKO0lBOUJhQSwyQkFBU0EsR0FBVUEsMkJBQTJCQSxDQUFDQTtJQStCOURBLHdCQUFDQTtBQUFEQSxDQWpDQSxBQWlDQ0EsRUFqQytCLFNBQVMsRUFpQ3hDO0FBRUQsQUFBMkIsaUJBQWxCLGlCQUFpQixDQUFDIiwiZmlsZSI6ImFuaW1hdG9ycy9ub2Rlcy9BbmltYXRpb25Ob2RlQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSUFzc2V0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0lBc3NldFwiKTtcbmltcG9ydCBBc3NldEJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0Fzc2V0QmFzZVwiKTtcblxuLyoqXG4gKiBQcm92aWRlcyBhbiBhYnN0cmFjdCBiYXNlIGNsYXNzIGZvciBub2RlcyBpbiBhbiBhbmltYXRpb24gYmxlbmQgdHJlZS5cbiAqL1xuY2xhc3MgQW5pbWF0aW9uTm9kZUJhc2UgZXh0ZW5kcyBBc3NldEJhc2UgaW1wbGVtZW50cyBJQXNzZXRcbntcblx0cHVibGljIHN0YXRpYyBhc3NldFR5cGU6c3RyaW5nID0gXCJbYXNzZXQgQW5pbWF0aW9uTm9kZUJhc2VdXCI7XG5cblx0cHVibGljIF9wU3RhdGVDbGFzczphbnk7XG5cblx0cHVibGljIGdldCBzdGF0ZUNsYXNzKCk6YW55XG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcFN0YXRlQ2xhc3M7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlcyBhIG5ldyA8Y29kZT5BbmltYXRpb25Ob2RlQmFzZTwvY29kZT4gb2JqZWN0LlxuXHQgKi9cblx0Y29uc3RydWN0b3IoKVxuXHR7XG5cdFx0c3VwZXIoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAaW5oZXJpdERvY1xuXHQgKi9cblx0cHVibGljIGRpc3Bvc2UoKVxuXHR7XG5cdH1cblxuXHQvKipcblx0ICogQGluaGVyaXREb2Ncblx0ICovXG5cdHB1YmxpYyBnZXQgYXNzZXRUeXBlKCk6c3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gQW5pbWF0aW9uTm9kZUJhc2UuYXNzZXRUeXBlO1xuXHR9XG59XG5cbmV4cG9ydCA9IEFuaW1hdGlvbk5vZGVCYXNlOyJdfQ==