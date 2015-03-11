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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9hbmltYXRvcnMvbm9kZXMvQW5pbWF0aW9uTm9kZUJhc2UudHMiXSwibmFtZXMiOlsiQW5pbWF0aW9uTm9kZUJhc2UiLCJBbmltYXRpb25Ob2RlQmFzZS5jb25zdHJ1Y3RvciIsIkFuaW1hdGlvbk5vZGVCYXNlLnN0YXRlQ2xhc3MiLCJBbmltYXRpb25Ob2RlQmFzZS5kaXNwb3NlIiwiQW5pbWF0aW9uTm9kZUJhc2UuYXNzZXRUeXBlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxJQUFPLFNBQVMsV0FBYyxtQ0FBbUMsQ0FBQyxDQUFDO0FBRW5FLEFBR0E7O0dBREc7SUFDRyxpQkFBaUI7SUFBU0EsVUFBMUJBLGlCQUFpQkEsVUFBa0JBO0lBV3hDQTs7T0FFR0E7SUFDSEEsU0FkS0EsaUJBQWlCQTtRQWdCckJDLGlCQUFPQSxDQUFDQTtJQUNUQSxDQUFDQTtJQVhERCxzQkFBV0EseUNBQVVBO2FBQXJCQTtZQUVDRSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQTtRQUMxQkEsQ0FBQ0E7OztPQUFBRjtJQVVEQTs7T0FFR0E7SUFDSUEsbUNBQU9BLEdBQWRBO0lBRUFHLENBQUNBO0lBS0RILHNCQUFXQSx3Q0FBU0E7UUFIcEJBOztXQUVHQTthQUNIQTtZQUVDSSxNQUFNQSxDQUFDQSxpQkFBaUJBLENBQUNBLFNBQVNBLENBQUNBO1FBQ3BDQSxDQUFDQTs7O09BQUFKO0lBOUJhQSwyQkFBU0EsR0FBVUEsMkJBQTJCQSxDQUFDQTtJQStCOURBLHdCQUFDQTtBQUFEQSxDQWpDQSxBQWlDQ0EsRUFqQytCLFNBQVMsRUFpQ3hDO0FBRUQsQUFBMkIsaUJBQWxCLGlCQUFpQixDQUFDIiwiZmlsZSI6ImFuaW1hdG9ycy9ub2Rlcy9BbmltYXRpb25Ob2RlQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSUFzc2V0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0lBc3NldFwiKTtcclxuaW1wb3J0IEFzc2V0QmFzZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvQXNzZXRCYXNlXCIpO1xyXG5cclxuLyoqXHJcbiAqIFByb3ZpZGVzIGFuIGFic3RyYWN0IGJhc2UgY2xhc3MgZm9yIG5vZGVzIGluIGFuIGFuaW1hdGlvbiBibGVuZCB0cmVlLlxyXG4gKi9cclxuY2xhc3MgQW5pbWF0aW9uTm9kZUJhc2UgZXh0ZW5kcyBBc3NldEJhc2UgaW1wbGVtZW50cyBJQXNzZXRcclxue1xyXG5cdHB1YmxpYyBzdGF0aWMgYXNzZXRUeXBlOnN0cmluZyA9IFwiW2Fzc2V0IEFuaW1hdGlvbk5vZGVCYXNlXVwiO1xyXG5cclxuXHRwdWJsaWMgX3BTdGF0ZUNsYXNzOmFueTtcclxuXHJcblx0cHVibGljIGdldCBzdGF0ZUNsYXNzKCk6YW55XHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BTdGF0ZUNsYXNzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhIG5ldyA8Y29kZT5BbmltYXRpb25Ob2RlQmFzZTwvY29kZT4gb2JqZWN0LlxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKClcclxuXHR7XHJcblx0XHRzdXBlcigpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQGluaGVyaXREb2NcclxuXHQgKi9cclxuXHRwdWJsaWMgZGlzcG9zZSgpXHJcblx0e1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQGluaGVyaXREb2NcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGFzc2V0VHlwZSgpOnN0cmluZ1xyXG5cdHtcclxuXHRcdHJldHVybiBBbmltYXRpb25Ob2RlQmFzZS5hc3NldFR5cGU7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgPSBBbmltYXRpb25Ob2RlQmFzZTsiXX0=