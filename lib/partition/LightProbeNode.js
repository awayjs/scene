var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EntityNode = require("awayjs-display/lib/partition/EntityNode");
/**
 * @class away.partition.LightProbeNode
 */
var LightProbeNode = (function (_super) {
    __extends(LightProbeNode, _super);
    /**
     *
     * @param lightProbe
     */
    function LightProbeNode(pool, lightProbe, partition) {
        _super.call(this, pool, lightProbe, partition);
        this._lightProbe = lightProbe;
    }
    /**
     * @inheritDoc
     */
    LightProbeNode.prototype.acceptTraverser = function (traverser) {
        if (traverser.enterNode(this))
            traverser.applyLightProbe(this._lightProbe);
    };
    /**
     *
     * @returns {boolean}
     */
    LightProbeNode.prototype.isCastingShadow = function () {
        return false;
    };
    LightProbeNode.id = "lightProbeNode";
    return LightProbeNode;
})(EntityNode);
module.exports = LightProbeNode;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vTGlnaHRQcm9iZU5vZGUudHMiXSwibmFtZXMiOlsiTGlnaHRQcm9iZU5vZGUiLCJMaWdodFByb2JlTm9kZS5jb25zdHJ1Y3RvciIsIkxpZ2h0UHJvYmVOb2RlLmFjY2VwdFRyYXZlcnNlciIsIkxpZ2h0UHJvYmVOb2RlLmlzQ2FzdGluZ1NoYWRvdyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTyxVQUFVLFdBQWUseUNBQXlDLENBQUMsQ0FBQztBQU0zRSxBQUdBOztHQURHO0lBQ0csY0FBYztJQUFTQSxVQUF2QkEsY0FBY0EsVUFBbUJBO0lBTXRDQTs7O09BR0dBO0lBQ0hBLFNBVktBLGNBQWNBLENBVVBBLElBQW1CQSxFQUFFQSxVQUFrQkEsRUFBRUEsU0FBbUJBO1FBRXZFQyxrQkFBTUEsSUFBSUEsRUFBRUEsVUFBVUEsRUFBRUEsU0FBU0EsQ0FBQ0EsQ0FBQ0E7UUFFbkNBLElBQUlBLENBQUNBLFdBQVdBLEdBQUdBLFVBQVVBLENBQUNBO0lBQy9CQSxDQUFDQTtJQUVERDs7T0FFR0E7SUFDSUEsd0NBQWVBLEdBQXRCQSxVQUF1QkEsU0FBdUJBO1FBRTdDRSxFQUFFQSxDQUFDQSxDQUFDQSxTQUFTQSxDQUFDQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUM3QkEsU0FBU0EsQ0FBQ0EsZUFBZUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0E7SUFDOUNBLENBQUNBO0lBRURGOzs7T0FHR0E7SUFDSUEsd0NBQWVBLEdBQXRCQTtRQUVDRyxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQTtJQUNkQSxDQUFDQTtJQS9CYUgsaUJBQUVBLEdBQVVBLGdCQUFnQkEsQ0FBQ0E7SUFnQzVDQSxxQkFBQ0E7QUFBREEsQ0FsQ0EsQUFrQ0NBLEVBbEM0QixVQUFVLEVBa0N0QztBQUVELEFBQXdCLGlCQUFmLGNBQWMsQ0FBQyIsImZpbGUiOiJwYXJ0aXRpb24vTGlnaHRQcm9iZU5vZGUuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEVudGl0eU5vZGVcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3BhcnRpdGlvbi9FbnRpdHlOb2RlXCIpO1xyXG5pbXBvcnQgUGFydGl0aW9uXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vUGFydGl0aW9uXCIpO1xyXG5pbXBvcnQgQ29sbGVjdG9yQmFzZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3RyYXZlcnNlL0NvbGxlY3RvckJhc2VcIik7XHJcbmltcG9ydCBJRW50aXR5XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2VudGl0aWVzL0lFbnRpdHlcIik7XHJcbmltcG9ydCBFbnRpdHlOb2RlUG9vbFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3Bvb2wvRW50aXR5Tm9kZVBvb2xcIik7XHJcblxyXG4vKipcclxuICogQGNsYXNzIGF3YXkucGFydGl0aW9uLkxpZ2h0UHJvYmVOb2RlXHJcbiAqL1xyXG5jbGFzcyBMaWdodFByb2JlTm9kZSBleHRlbmRzIEVudGl0eU5vZGVcclxue1xyXG5cdHB1YmxpYyBzdGF0aWMgaWQ6c3RyaW5nID0gXCJsaWdodFByb2JlTm9kZVwiO1xyXG5cclxuXHRwcml2YXRlIF9saWdodFByb2JlOklFbnRpdHk7XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGxpZ2h0UHJvYmVcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3Rvcihwb29sOkVudGl0eU5vZGVQb29sLCBsaWdodFByb2JlOklFbnRpdHksIHBhcnRpdGlvbjpQYXJ0aXRpb24pXHJcblx0e1xyXG5cdFx0c3VwZXIocG9vbCwgbGlnaHRQcm9iZSwgcGFydGl0aW9uKTtcclxuXHJcblx0XHR0aGlzLl9saWdodFByb2JlID0gbGlnaHRQcm9iZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBpbmhlcml0RG9jXHJcblx0ICovXHJcblx0cHVibGljIGFjY2VwdFRyYXZlcnNlcih0cmF2ZXJzZXI6Q29sbGVjdG9yQmFzZSlcclxuXHR7XHJcblx0XHRpZiAodHJhdmVyc2VyLmVudGVyTm9kZSh0aGlzKSlcclxuXHRcdFx0dHJhdmVyc2VyLmFwcGx5TGlnaHRQcm9iZSh0aGlzLl9saWdodFByb2JlKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICogQHJldHVybnMge2Jvb2xlYW59XHJcblx0ICovXHJcblx0cHVibGljIGlzQ2FzdGluZ1NoYWRvdygpOmJvb2xlYW5cclxuXHR7XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgPSBMaWdodFByb2JlTm9kZTsiXX0=