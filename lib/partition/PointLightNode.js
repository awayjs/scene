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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vUG9pbnRMaWdodE5vZGUudHMiXSwibmFtZXMiOlsiUG9pbnRMaWdodE5vZGUiLCJQb2ludExpZ2h0Tm9kZS5jb25zdHJ1Y3RvciIsIlBvaW50TGlnaHROb2RlLmFjY2VwdFRyYXZlcnNlciIsIlBvaW50TGlnaHROb2RlLmlzQ2FzdGluZ1NoYWRvdyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsSUFBTyxVQUFVLFdBQWUseUNBQXlDLENBQUMsQ0FBQztBQUkzRSxBQUdBOztHQURHO0lBQ0csY0FBYztJQUFTQSxVQUF2QkEsY0FBY0EsVUFBbUJBO0lBSXRDQTs7O09BR0dBO0lBQ0hBLFNBUktBLGNBQWNBLENBUVBBLFVBQWtCQTtRQUU3QkMsa0JBQU1BLFVBQVVBLENBQUNBLENBQUNBO1FBRWxCQSxJQUFJQSxDQUFDQSxXQUFXQSxHQUFHQSxVQUFVQSxDQUFDQTtJQUMvQkEsQ0FBQ0E7SUFFREQ7O09BRUdBO0lBQ0lBLHdDQUFlQSxHQUF0QkEsVUFBdUJBLFNBQW9CQTtRQUUxQ0UsRUFBRUEsQ0FBQ0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsU0FBU0EsQ0FBWUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDeENBLFNBQVNBLENBQUNBLGVBQWVBLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBO0lBQzlDQSxDQUFDQTtJQUVERjs7O09BR0dBO0lBQ0lBLHdDQUFlQSxHQUF0QkE7UUFFQ0csTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7SUFDZEEsQ0FBQ0E7SUFDRkgscUJBQUNBO0FBQURBLENBaENBLEFBZ0NDQSxFQWhDNEIsVUFBVSxFQWdDdEM7QUFFRCxBQUF3QixpQkFBZixjQUFjLENBQUMiLCJmaWxlIjoicGFydGl0aW9uL1BvaW50TGlnaHROb2RlLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBOb2RlQmFzZVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vTm9kZUJhc2VcIik7XHJcbmltcG9ydCBFbnRpdHlOb2RlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vRW50aXR5Tm9kZVwiKTtcclxuaW1wb3J0IElDb2xsZWN0b3JcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3RyYXZlcnNlL0lDb2xsZWN0b3JcIik7XHJcbmltcG9ydCBJRW50aXR5XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2VudGl0aWVzL0lFbnRpdHlcIik7XHJcblxyXG4vKipcclxuICogQGNsYXNzIGF3YXkucGFydGl0aW9uLlBvaW50TGlnaHROb2RlXHJcbiAqL1xyXG5jbGFzcyBQb2ludExpZ2h0Tm9kZSBleHRlbmRzIEVudGl0eU5vZGVcclxue1xyXG5cdHByaXZhdGUgX3BvaW50TGlnaHQ6SUVudGl0eTtcclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gcG9pbnRMaWdodFxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKHBvaW50TGlnaHQ6SUVudGl0eSlcclxuXHR7XHJcblx0XHRzdXBlcihwb2ludExpZ2h0KTtcclxuXHJcblx0XHR0aGlzLl9wb2ludExpZ2h0ID0gcG9pbnRMaWdodDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBpbmhlcml0RG9jXHJcblx0ICovXHJcblx0cHVibGljIGFjY2VwdFRyYXZlcnNlcih0cmF2ZXJzZXI6SUNvbGxlY3RvcilcclxuXHR7XHJcblx0XHRpZiAodHJhdmVyc2VyLmVudGVyTm9kZSg8Tm9kZUJhc2U+IHRoaXMpKVxyXG5cdFx0XHR0cmF2ZXJzZXIuYXBwbHlQb2ludExpZ2h0KHRoaXMuX3BvaW50TGlnaHQpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuXHQgKi9cclxuXHRwdWJsaWMgaXNDYXN0aW5nU2hhZG93KCk6Ym9vbGVhblxyXG5cdHtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCA9IFBvaW50TGlnaHROb2RlOyJdfQ==