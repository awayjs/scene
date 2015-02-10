var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EntityNode = require("awayjs-display/lib/partition/EntityNode");
/**
 * @class away.partition.PointLightNode
 */
var PointLightNode = (function (_super) {
    __extends(PointLightNode, _super);
    /**
     *
     * @param pointLight
     */
    function PointLightNode(pool, pointLight, partition) {
        _super.call(this, pool, pointLight, partition);
        this._pointLight = pointLight;
    }
    /**
     * @inheritDoc
     */
    PointLightNode.prototype.acceptTraverser = function (traverser) {
        if (traverser.enterNode(this))
            traverser.applyPointLight(this._pointLight);
    };
    /**
     *
     * @returns {boolean}
     */
    PointLightNode.prototype.isCastingShadow = function () {
        return false;
    };
    PointLightNode.id = "pointLightNode";
    return PointLightNode;
})(EntityNode);
module.exports = PointLightNode;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vcG9pbnRsaWdodG5vZGUudHMiXSwibmFtZXMiOlsiUG9pbnRMaWdodE5vZGUiLCJQb2ludExpZ2h0Tm9kZS5jb25zdHJ1Y3RvciIsIlBvaW50TGlnaHROb2RlLmFjY2VwdFRyYXZlcnNlciIsIlBvaW50TGlnaHROb2RlLmlzQ2FzdGluZ1NoYWRvdyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsSUFBTyxVQUFVLFdBQWUseUNBQXlDLENBQUMsQ0FBQztBQU0zRSxBQUdBOztHQURHO0lBQ0csY0FBYztJQUFTQSxVQUF2QkEsY0FBY0EsVUFBbUJBO0lBTXRDQTs7O09BR0dBO0lBQ0hBLFNBVktBLGNBQWNBLENBVVBBLElBQW1CQSxFQUFFQSxVQUFrQkEsRUFBRUEsU0FBbUJBO1FBRXZFQyxrQkFBTUEsSUFBSUEsRUFBRUEsVUFBVUEsRUFBRUEsU0FBU0EsQ0FBQ0EsQ0FBQ0E7UUFFbkNBLElBQUlBLENBQUNBLFdBQVdBLEdBQUdBLFVBQVVBLENBQUNBO0lBQy9CQSxDQUFDQTtJQUVERDs7T0FFR0E7SUFDSUEsd0NBQWVBLEdBQXRCQSxVQUF1QkEsU0FBdUJBO1FBRTdDRSxFQUFFQSxDQUFDQSxDQUFDQSxTQUFTQSxDQUFDQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUM3QkEsU0FBU0EsQ0FBQ0EsZUFBZUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0E7SUFDOUNBLENBQUNBO0lBRURGOzs7T0FHR0E7SUFDSUEsd0NBQWVBLEdBQXRCQTtRQUVDRyxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQTtJQUNkQSxDQUFDQTtJQS9CYUgsaUJBQUVBLEdBQVVBLGdCQUFnQkEsQ0FBQ0E7SUFnQzVDQSxxQkFBQ0E7QUFBREEsQ0FsQ0EsQUFrQ0NBLEVBbEM0QixVQUFVLEVBa0N0QztBQUVELEFBQXdCLGlCQUFmLGNBQWMsQ0FBQyIsImZpbGUiOiJwYXJ0aXRpb24vUG9pbnRMaWdodE5vZGUuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5vZGVCYXNlXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3BhcnRpdGlvbi9Ob2RlQmFzZVwiKTtcbmltcG9ydCBFbnRpdHlOb2RlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vRW50aXR5Tm9kZVwiKTtcbmltcG9ydCBQYXJ0aXRpb25cdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3BhcnRpdGlvbi9QYXJ0aXRpb25cIik7XG5pbXBvcnQgQ29sbGVjdG9yQmFzZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3RyYXZlcnNlL0NvbGxlY3RvckJhc2VcIik7XG5pbXBvcnQgSUVudGl0eVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9JRW50aXR5XCIpO1xuaW1wb3J0IEVudGl0eU5vZGVQb29sXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcG9vbC9FbnRpdHlOb2RlUG9vbFwiKTtcblxuLyoqXG4gKiBAY2xhc3MgYXdheS5wYXJ0aXRpb24uUG9pbnRMaWdodE5vZGVcbiAqL1xuY2xhc3MgUG9pbnRMaWdodE5vZGUgZXh0ZW5kcyBFbnRpdHlOb2RlXG57XG5cdHB1YmxpYyBzdGF0aWMgaWQ6c3RyaW5nID0gXCJwb2ludExpZ2h0Tm9kZVwiO1xuXG5cdHByaXZhdGUgX3BvaW50TGlnaHQ6SUVudGl0eTtcblxuXHQvKipcblx0ICpcblx0ICogQHBhcmFtIHBvaW50TGlnaHRcblx0ICovXG5cdGNvbnN0cnVjdG9yKHBvb2w6RW50aXR5Tm9kZVBvb2wsIHBvaW50TGlnaHQ6SUVudGl0eSwgcGFydGl0aW9uOlBhcnRpdGlvbilcblx0e1xuXHRcdHN1cGVyKHBvb2wsIHBvaW50TGlnaHQsIHBhcnRpdGlvbik7XG5cblx0XHR0aGlzLl9wb2ludExpZ2h0ID0gcG9pbnRMaWdodDtcblx0fVxuXG5cdC8qKlxuXHQgKiBAaW5oZXJpdERvY1xuXHQgKi9cblx0cHVibGljIGFjY2VwdFRyYXZlcnNlcih0cmF2ZXJzZXI6Q29sbGVjdG9yQmFzZSlcblx0e1xuXHRcdGlmICh0cmF2ZXJzZXIuZW50ZXJOb2RlKHRoaXMpKVxuXHRcdFx0dHJhdmVyc2VyLmFwcGx5UG9pbnRMaWdodCh0aGlzLl9wb2ludExpZ2h0KTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cblx0ICovXG5cdHB1YmxpYyBpc0Nhc3RpbmdTaGFkb3coKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxuZXhwb3J0ID0gUG9pbnRMaWdodE5vZGU7Il19