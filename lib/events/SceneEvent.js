var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Event = require("awayjs-core/lib/events/Event");
var SceneEvent = (function (_super) {
    __extends(SceneEvent, _super);
    function SceneEvent(type, displayObject) {
        _super.call(this, type);
        this.displayObject = displayObject;
    }
    /**
     *
     */
    SceneEvent.ADDED_TO_SCENE = "addedToScene";
    /**
     *
     */
    SceneEvent.REMOVED_FROM_SCENE = "removedFromScene";
    /**
     *
     */
    SceneEvent.PARTITION_CHANGED = "partitionChanged";
    return SceneEvent;
})(Event);
module.exports = SceneEvent;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9ldmVudHMvU2NlbmVFdmVudC50cyJdLCJuYW1lcyI6WyJTY2VuZUV2ZW50IiwiU2NlbmVFdmVudC5jb25zdHJ1Y3RvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTyxLQUFLLFdBQWUsOEJBQThCLENBQUMsQ0FBQztBQUkzRCxJQUFNLFVBQVU7SUFBU0EsVUFBbkJBLFVBQVVBLFVBQWNBO0lBc0I3QkEsU0F0QktBLFVBQVVBLENBc0JIQSxJQUFXQSxFQUFFQSxhQUEyQkE7UUFFbkRDLGtCQUFNQSxJQUFJQSxDQUFDQSxDQUFDQTtRQUVaQSxJQUFJQSxDQUFDQSxhQUFhQSxHQUFHQSxhQUFhQSxDQUFDQTtJQUNwQ0EsQ0FBQ0E7SUF6QkREOztPQUVHQTtJQUNXQSx5QkFBY0EsR0FBVUEsY0FBY0EsQ0FBQ0E7SUFFckRBOztPQUVHQTtJQUNXQSw2QkFBa0JBLEdBQVVBLGtCQUFrQkEsQ0FBQ0E7SUFFN0RBOztPQUVHQTtJQUNXQSw0QkFBaUJBLEdBQVVBLGtCQUFrQkEsQ0FBQ0E7SUFhN0RBLGlCQUFDQTtBQUFEQSxDQTVCQSxBQTRCQ0EsRUE1QndCLEtBQUssRUE0QjdCO0FBRUQsQUFBb0IsaUJBQVgsVUFBVSxDQUFDIiwiZmlsZSI6ImV2ZW50cy9TY2VuZUV2ZW50LmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFdmVudFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0V2ZW50XCIpO1xuXG5pbXBvcnQgRGlzcGxheU9iamVjdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0Rpc3BsYXlPYmplY3RcIik7XG5cbmNsYXNzIFNjZW5lRXZlbnQgZXh0ZW5kcyBFdmVudFxue1xuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgQURERURfVE9fU0NFTkU6c3RyaW5nID0gXCJhZGRlZFRvU2NlbmVcIjtcblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgUkVNT1ZFRF9GUk9NX1NDRU5FOnN0cmluZyA9IFwicmVtb3ZlZEZyb21TY2VuZVwiO1xuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBQQVJUSVRJT05fQ0hBTkdFRDpzdHJpbmcgPSBcInBhcnRpdGlvbkNoYW5nZWRcIjtcblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBkaXNwbGF5T2JqZWN0OkRpc3BsYXlPYmplY3Q7XG5cblx0Y29uc3RydWN0b3IodHlwZTpzdHJpbmcsIGRpc3BsYXlPYmplY3Q6RGlzcGxheU9iamVjdClcblx0e1xuXHRcdHN1cGVyKHR5cGUpO1xuXG5cdFx0dGhpcy5kaXNwbGF5T2JqZWN0ID0gZGlzcGxheU9iamVjdDtcblx0fVxufVxuXG5leHBvcnQgPSBTY2VuZUV2ZW50OyJdfQ==