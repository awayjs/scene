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
    function PointLightNode(pointLight) {
        _super.call(this, pointLight);
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
    return PointLightNode;
})(EntityNode);
module.exports = PointLightNode;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vcG9pbnRsaWdodG5vZGUudHMiXSwibmFtZXMiOlsiUG9pbnRMaWdodE5vZGUiLCJQb2ludExpZ2h0Tm9kZS5jb25zdHJ1Y3RvciIsIlBvaW50TGlnaHROb2RlLmFjY2VwdFRyYXZlcnNlciIsIlBvaW50TGlnaHROb2RlLmlzQ2FzdGluZ1NoYWRvdyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsSUFBTyxVQUFVLFdBQWUseUNBQXlDLENBQUMsQ0FBQztBQUkzRSxBQUdBOztHQURHO0lBQ0csY0FBYztJQUFTQSxVQUF2QkEsY0FBY0EsVUFBbUJBO0lBSXRDQTs7O09BR0dBO0lBQ0hBLFNBUktBLGNBQWNBLENBUVBBLFVBQWtCQTtRQUU3QkMsa0JBQU1BLFVBQVVBLENBQUNBLENBQUNBO1FBRWxCQSxJQUFJQSxDQUFDQSxXQUFXQSxHQUFHQSxVQUFVQSxDQUFDQTtJQUMvQkEsQ0FBQ0E7SUFFREQ7O09BRUdBO0lBQ0lBLHdDQUFlQSxHQUF0QkEsVUFBdUJBLFNBQW9CQTtRQUUxQ0UsRUFBRUEsQ0FBQ0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsU0FBU0EsQ0FBWUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDeENBLFNBQVNBLENBQUNBLGVBQWVBLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBO0lBQzlDQSxDQUFDQTtJQUVERjs7O09BR0dBO0lBQ0lBLHdDQUFlQSxHQUF0QkE7UUFFQ0csTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7SUFDZEEsQ0FBQ0E7SUFDRkgscUJBQUNBO0FBQURBLENBaENBLEFBZ0NDQSxFQWhDNEIsVUFBVSxFQWdDdEM7QUFFRCxBQUF3QixpQkFBZixjQUFjLENBQUMiLCJmaWxlIjoicGFydGl0aW9uL1BvaW50TGlnaHROb2RlLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBOb2RlQmFzZVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vTm9kZUJhc2VcIik7XG5pbXBvcnQgRW50aXR5Tm9kZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcGFydGl0aW9uL0VudGl0eU5vZGVcIik7XG5pbXBvcnQgSUNvbGxlY3Rvclx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvdHJhdmVyc2UvSUNvbGxlY3RvclwiKTtcbmltcG9ydCBJRW50aXR5XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2VudGl0aWVzL0lFbnRpdHlcIik7XG5cbi8qKlxuICogQGNsYXNzIGF3YXkucGFydGl0aW9uLlBvaW50TGlnaHROb2RlXG4gKi9cbmNsYXNzIFBvaW50TGlnaHROb2RlIGV4dGVuZHMgRW50aXR5Tm9kZVxue1xuXHRwcml2YXRlIF9wb2ludExpZ2h0OklFbnRpdHk7XG5cblx0LyoqXG5cdCAqXG5cdCAqIEBwYXJhbSBwb2ludExpZ2h0XG5cdCAqL1xuXHRjb25zdHJ1Y3Rvcihwb2ludExpZ2h0OklFbnRpdHkpXG5cdHtcblx0XHRzdXBlcihwb2ludExpZ2h0KTtcblxuXHRcdHRoaXMuX3BvaW50TGlnaHQgPSBwb2ludExpZ2h0O1xuXHR9XG5cblx0LyoqXG5cdCAqIEBpbmhlcml0RG9jXG5cdCAqL1xuXHRwdWJsaWMgYWNjZXB0VHJhdmVyc2VyKHRyYXZlcnNlcjpJQ29sbGVjdG9yKVxuXHR7XG5cdFx0aWYgKHRyYXZlcnNlci5lbnRlck5vZGUoPE5vZGVCYXNlPiB0aGlzKSlcblx0XHRcdHRyYXZlcnNlci5hcHBseVBvaW50TGlnaHQodGhpcy5fcG9pbnRMaWdodCk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHJldHVybnMge2Jvb2xlYW59XG5cdCAqL1xuXHRwdWJsaWMgaXNDYXN0aW5nU2hhZG93KCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbmV4cG9ydCA9IFBvaW50TGlnaHROb2RlOyJdfQ==