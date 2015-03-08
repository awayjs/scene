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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vTGlnaHRQcm9iZU5vZGUudHMiXSwibmFtZXMiOlsiTGlnaHRQcm9iZU5vZGUiLCJMaWdodFByb2JlTm9kZS5jb25zdHJ1Y3RvciIsIkxpZ2h0UHJvYmVOb2RlLmFjY2VwdFRyYXZlcnNlciIsIkxpZ2h0UHJvYmVOb2RlLmlzQ2FzdGluZ1NoYWRvdyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTyxVQUFVLFdBQWUseUNBQXlDLENBQUMsQ0FBQztBQU0zRSxBQUdBOztHQURHO0lBQ0csY0FBYztJQUFTQSxVQUF2QkEsY0FBY0EsVUFBbUJBO0lBTXRDQTs7O09BR0dBO0lBQ0hBLFNBVktBLGNBQWNBLENBVVBBLElBQW1CQSxFQUFFQSxVQUFrQkEsRUFBRUEsU0FBbUJBO1FBRXZFQyxrQkFBTUEsSUFBSUEsRUFBRUEsVUFBVUEsRUFBRUEsU0FBU0EsQ0FBQ0EsQ0FBQ0E7UUFFbkNBLElBQUlBLENBQUNBLFdBQVdBLEdBQUdBLFVBQVVBLENBQUNBO0lBQy9CQSxDQUFDQTtJQUVERDs7T0FFR0E7SUFDSUEsd0NBQWVBLEdBQXRCQSxVQUF1QkEsU0FBdUJBO1FBRTdDRSxFQUFFQSxDQUFDQSxDQUFDQSxTQUFTQSxDQUFDQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUM3QkEsU0FBU0EsQ0FBQ0EsZUFBZUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0E7SUFDOUNBLENBQUNBO0lBRURGOzs7T0FHR0E7SUFDSUEsd0NBQWVBLEdBQXRCQTtRQUVDRyxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQTtJQUNkQSxDQUFDQTtJQS9CYUgsaUJBQUVBLEdBQVVBLGdCQUFnQkEsQ0FBQ0E7SUFnQzVDQSxxQkFBQ0E7QUFBREEsQ0FsQ0EsQUFrQ0NBLEVBbEM0QixVQUFVLEVBa0N0QztBQUVELEFBQXdCLGlCQUFmLGNBQWMsQ0FBQyIsImZpbGUiOiJwYXJ0aXRpb24vTGlnaHRQcm9iZU5vZGUuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEVudGl0eU5vZGVcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3BhcnRpdGlvbi9FbnRpdHlOb2RlXCIpO1xuaW1wb3J0IFBhcnRpdGlvblx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcGFydGl0aW9uL1BhcnRpdGlvblwiKTtcbmltcG9ydCBDb2xsZWN0b3JCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvdHJhdmVyc2UvQ29sbGVjdG9yQmFzZVwiKTtcbmltcG9ydCBJRW50aXR5XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2VudGl0aWVzL0lFbnRpdHlcIik7XG5pbXBvcnQgRW50aXR5Tm9kZVBvb2xcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wb29sL0VudGl0eU5vZGVQb29sXCIpO1xuXG4vKipcbiAqIEBjbGFzcyBhd2F5LnBhcnRpdGlvbi5MaWdodFByb2JlTm9kZVxuICovXG5jbGFzcyBMaWdodFByb2JlTm9kZSBleHRlbmRzIEVudGl0eU5vZGVcbntcblx0cHVibGljIHN0YXRpYyBpZDpzdHJpbmcgPSBcImxpZ2h0UHJvYmVOb2RlXCI7XG5cblx0cHJpdmF0ZSBfbGlnaHRQcm9iZTpJRW50aXR5O1xuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcGFyYW0gbGlnaHRQcm9iZVxuXHQgKi9cblx0Y29uc3RydWN0b3IocG9vbDpFbnRpdHlOb2RlUG9vbCwgbGlnaHRQcm9iZTpJRW50aXR5LCBwYXJ0aXRpb246UGFydGl0aW9uKVxuXHR7XG5cdFx0c3VwZXIocG9vbCwgbGlnaHRQcm9iZSwgcGFydGl0aW9uKTtcblxuXHRcdHRoaXMuX2xpZ2h0UHJvYmUgPSBsaWdodFByb2JlO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBpbmhlcml0RG9jXG5cdCAqL1xuXHRwdWJsaWMgYWNjZXB0VHJhdmVyc2VyKHRyYXZlcnNlcjpDb2xsZWN0b3JCYXNlKVxuXHR7XG5cdFx0aWYgKHRyYXZlcnNlci5lbnRlck5vZGUodGhpcykpXG5cdFx0XHR0cmF2ZXJzZXIuYXBwbHlMaWdodFByb2JlKHRoaXMuX2xpZ2h0UHJvYmUpO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxuXHQgKi9cblx0cHVibGljIGlzQ2FzdGluZ1NoYWRvdygpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufVxuXG5leHBvcnQgPSBMaWdodFByb2JlTm9kZTsiXX0=