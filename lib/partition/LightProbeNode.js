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
    function LightProbeNode(lightProbe) {
        _super.call(this, lightProbe);
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
    return LightProbeNode;
})(EntityNode);
module.exports = LightProbeNode;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vTGlnaHRQcm9iZU5vZGUudHMiXSwibmFtZXMiOlsiTGlnaHRQcm9iZU5vZGUiLCJMaWdodFByb2JlTm9kZS5jb25zdHJ1Y3RvciIsIkxpZ2h0UHJvYmVOb2RlLmFjY2VwdFRyYXZlcnNlciIsIkxpZ2h0UHJvYmVOb2RlLmlzQ2FzdGluZ1NoYWRvdyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTyxVQUFVLFdBQWUseUNBQXlDLENBQUMsQ0FBQztBQUkzRSxBQUdBOztHQURHO0lBQ0csY0FBYztJQUFTQSxVQUF2QkEsY0FBY0EsVUFBbUJBO0lBSXRDQTs7O09BR0dBO0lBQ0hBLFNBUktBLGNBQWNBLENBUVBBLFVBQWtCQTtRQUU3QkMsa0JBQU1BLFVBQVVBLENBQUNBLENBQUNBO1FBRWxCQSxJQUFJQSxDQUFDQSxXQUFXQSxHQUFHQSxVQUFVQSxDQUFDQTtJQUMvQkEsQ0FBQ0E7SUFFREQ7O09BRUdBO0lBQ0lBLHdDQUFlQSxHQUF0QkEsVUFBdUJBLFNBQW9CQTtRQUUxQ0UsRUFBRUEsQ0FBQ0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDN0JBLFNBQVNBLENBQUNBLGVBQWVBLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBO0lBQzlDQSxDQUFDQTtJQUVERjs7O09BR0dBO0lBQ0lBLHdDQUFlQSxHQUF0QkE7UUFFQ0csTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7SUFDZEEsQ0FBQ0E7SUFDRkgscUJBQUNBO0FBQURBLENBaENBLEFBZ0NDQSxFQWhDNEIsVUFBVSxFQWdDdEM7QUFFRCxBQUF3QixpQkFBZixjQUFjLENBQUMiLCJmaWxlIjoicGFydGl0aW9uL0xpZ2h0UHJvYmVOb2RlLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFbnRpdHlOb2RlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vRW50aXR5Tm9kZVwiKTtcclxuaW1wb3J0IElDb2xsZWN0b3JcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3RyYXZlcnNlL0lDb2xsZWN0b3JcIik7XHJcbmltcG9ydCBJRW50aXR5XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2VudGl0aWVzL0lFbnRpdHlcIik7XHJcblxyXG4vKipcclxuICogQGNsYXNzIGF3YXkucGFydGl0aW9uLkxpZ2h0UHJvYmVOb2RlXHJcbiAqL1xyXG5jbGFzcyBMaWdodFByb2JlTm9kZSBleHRlbmRzIEVudGl0eU5vZGVcclxue1xyXG5cdHByaXZhdGUgX2xpZ2h0UHJvYmU6SUVudGl0eTtcclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gbGlnaHRQcm9iZVxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGxpZ2h0UHJvYmU6SUVudGl0eSlcclxuXHR7XHJcblx0XHRzdXBlcihsaWdodFByb2JlKTtcclxuXHJcblx0XHR0aGlzLl9saWdodFByb2JlID0gbGlnaHRQcm9iZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBpbmhlcml0RG9jXHJcblx0ICovXHJcblx0cHVibGljIGFjY2VwdFRyYXZlcnNlcih0cmF2ZXJzZXI6SUNvbGxlY3RvcilcclxuXHR7XHJcblx0XHRpZiAodHJhdmVyc2VyLmVudGVyTm9kZSh0aGlzKSlcclxuXHRcdFx0dHJhdmVyc2VyLmFwcGx5TGlnaHRQcm9iZSh0aGlzLl9saWdodFByb2JlKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICogQHJldHVybnMge2Jvb2xlYW59XHJcblx0ICovXHJcblx0cHVibGljIGlzQ2FzdGluZ1NoYWRvdygpOmJvb2xlYW5cclxuXHR7XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgPSBMaWdodFByb2JlTm9kZTsiXX0=