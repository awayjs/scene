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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vUG9pbnRMaWdodE5vZGUudHMiXSwibmFtZXMiOlsiUG9pbnRMaWdodE5vZGUiLCJQb2ludExpZ2h0Tm9kZS5jb25zdHJ1Y3RvciIsIlBvaW50TGlnaHROb2RlLmFjY2VwdFRyYXZlcnNlciIsIlBvaW50TGlnaHROb2RlLmlzQ2FzdGluZ1NoYWRvdyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsSUFBTyxVQUFVLFdBQWUseUNBQXlDLENBQUMsQ0FBQztBQU0zRSxBQUdBOztHQURHO0lBQ0csY0FBYztJQUFTQSxVQUF2QkEsY0FBY0EsVUFBbUJBO0lBTXRDQTs7O09BR0dBO0lBQ0hBLFNBVktBLGNBQWNBLENBVVBBLElBQW1CQSxFQUFFQSxVQUFrQkEsRUFBRUEsU0FBbUJBO1FBRXZFQyxrQkFBTUEsSUFBSUEsRUFBRUEsVUFBVUEsRUFBRUEsU0FBU0EsQ0FBQ0EsQ0FBQ0E7UUFFbkNBLElBQUlBLENBQUNBLFdBQVdBLEdBQUdBLFVBQVVBLENBQUNBO0lBQy9CQSxDQUFDQTtJQUVERDs7T0FFR0E7SUFDSUEsd0NBQWVBLEdBQXRCQSxVQUF1QkEsU0FBdUJBO1FBRTdDRSxFQUFFQSxDQUFDQSxDQUFDQSxTQUFTQSxDQUFDQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUM3QkEsU0FBU0EsQ0FBQ0EsZUFBZUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0E7SUFDOUNBLENBQUNBO0lBRURGOzs7T0FHR0E7SUFDSUEsd0NBQWVBLEdBQXRCQTtRQUVDRyxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQTtJQUNkQSxDQUFDQTtJQS9CYUgsaUJBQUVBLEdBQVVBLGdCQUFnQkEsQ0FBQ0E7SUFnQzVDQSxxQkFBQ0E7QUFBREEsQ0FsQ0EsQUFrQ0NBLEVBbEM0QixVQUFVLEVBa0N0QztBQUVELEFBQXdCLGlCQUFmLGNBQWMsQ0FBQyIsImZpbGUiOiJwYXJ0aXRpb24vUG9pbnRMaWdodE5vZGUuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5vZGVCYXNlXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3BhcnRpdGlvbi9Ob2RlQmFzZVwiKTtcclxuaW1wb3J0IEVudGl0eU5vZGVcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3BhcnRpdGlvbi9FbnRpdHlOb2RlXCIpO1xyXG5pbXBvcnQgUGFydGl0aW9uXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vUGFydGl0aW9uXCIpO1xyXG5pbXBvcnQgQ29sbGVjdG9yQmFzZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3RyYXZlcnNlL0NvbGxlY3RvckJhc2VcIik7XHJcbmltcG9ydCBJRW50aXR5XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2VudGl0aWVzL0lFbnRpdHlcIik7XHJcbmltcG9ydCBFbnRpdHlOb2RlUG9vbFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3Bvb2wvRW50aXR5Tm9kZVBvb2xcIik7XHJcblxyXG4vKipcclxuICogQGNsYXNzIGF3YXkucGFydGl0aW9uLlBvaW50TGlnaHROb2RlXHJcbiAqL1xyXG5jbGFzcyBQb2ludExpZ2h0Tm9kZSBleHRlbmRzIEVudGl0eU5vZGVcclxue1xyXG5cdHB1YmxpYyBzdGF0aWMgaWQ6c3RyaW5nID0gXCJwb2ludExpZ2h0Tm9kZVwiO1xyXG5cclxuXHRwcml2YXRlIF9wb2ludExpZ2h0OklFbnRpdHk7XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHBvaW50TGlnaHRcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3Rvcihwb29sOkVudGl0eU5vZGVQb29sLCBwb2ludExpZ2h0OklFbnRpdHksIHBhcnRpdGlvbjpQYXJ0aXRpb24pXHJcblx0e1xyXG5cdFx0c3VwZXIocG9vbCwgcG9pbnRMaWdodCwgcGFydGl0aW9uKTtcclxuXHJcblx0XHR0aGlzLl9wb2ludExpZ2h0ID0gcG9pbnRMaWdodDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBpbmhlcml0RG9jXHJcblx0ICovXHJcblx0cHVibGljIGFjY2VwdFRyYXZlcnNlcih0cmF2ZXJzZXI6Q29sbGVjdG9yQmFzZSlcclxuXHR7XHJcblx0XHRpZiAodHJhdmVyc2VyLmVudGVyTm9kZSh0aGlzKSlcclxuXHRcdFx0dHJhdmVyc2VyLmFwcGx5UG9pbnRMaWdodCh0aGlzLl9wb2ludExpZ2h0KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICogQHJldHVybnMge2Jvb2xlYW59XHJcblx0ICovXHJcblx0cHVibGljIGlzQ2FzdGluZ1NoYWRvdygpOmJvb2xlYW5cclxuXHR7XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgPSBQb2ludExpZ2h0Tm9kZTsiXX0=