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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vbGlnaHRwcm9iZW5vZGUudHMiXSwibmFtZXMiOlsiTGlnaHRQcm9iZU5vZGUiLCJMaWdodFByb2JlTm9kZS5jb25zdHJ1Y3RvciIsIkxpZ2h0UHJvYmVOb2RlLmFjY2VwdFRyYXZlcnNlciIsIkxpZ2h0UHJvYmVOb2RlLmlzQ2FzdGluZ1NoYWRvdyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTyxVQUFVLFdBQWUseUNBQXlDLENBQUMsQ0FBQztBQUkzRSxBQUdBOztHQURHO0lBQ0csY0FBYztJQUFTQSxVQUF2QkEsY0FBY0EsVUFBbUJBO0lBSXRDQTs7O09BR0dBO0lBQ0hBLFNBUktBLGNBQWNBLENBUVBBLFVBQWtCQTtRQUU3QkMsa0JBQU1BLFVBQVVBLENBQUNBLENBQUNBO1FBRWxCQSxJQUFJQSxDQUFDQSxXQUFXQSxHQUFHQSxVQUFVQSxDQUFDQTtJQUMvQkEsQ0FBQ0E7SUFFREQ7O09BRUdBO0lBQ0lBLHdDQUFlQSxHQUF0QkEsVUFBdUJBLFNBQW9CQTtRQUUxQ0UsRUFBRUEsQ0FBQ0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDN0JBLFNBQVNBLENBQUNBLGVBQWVBLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBO0lBQzlDQSxDQUFDQTtJQUVERjs7O09BR0dBO0lBQ0lBLHdDQUFlQSxHQUF0QkE7UUFFQ0csTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7SUFDZEEsQ0FBQ0E7SUFDRkgscUJBQUNBO0FBQURBLENBaENBLEFBZ0NDQSxFQWhDNEIsVUFBVSxFQWdDdEM7QUFFRCxBQUF3QixpQkFBZixjQUFjLENBQUMiLCJmaWxlIjoicGFydGl0aW9uL0xpZ2h0UHJvYmVOb2RlLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFbnRpdHlOb2RlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vRW50aXR5Tm9kZVwiKTtcbmltcG9ydCBJQ29sbGVjdG9yXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi90cmF2ZXJzZS9JQ29sbGVjdG9yXCIpO1xuaW1wb3J0IElFbnRpdHlcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZW50aXRpZXMvSUVudGl0eVwiKTtcblxuLyoqXG4gKiBAY2xhc3MgYXdheS5wYXJ0aXRpb24uTGlnaHRQcm9iZU5vZGVcbiAqL1xuY2xhc3MgTGlnaHRQcm9iZU5vZGUgZXh0ZW5kcyBFbnRpdHlOb2RlXG57XG5cdHByaXZhdGUgX2xpZ2h0UHJvYmU6SUVudGl0eTtcblxuXHQvKipcblx0ICpcblx0ICogQHBhcmFtIGxpZ2h0UHJvYmVcblx0ICovXG5cdGNvbnN0cnVjdG9yKGxpZ2h0UHJvYmU6SUVudGl0eSlcblx0e1xuXHRcdHN1cGVyKGxpZ2h0UHJvYmUpO1xuXG5cdFx0dGhpcy5fbGlnaHRQcm9iZSA9IGxpZ2h0UHJvYmU7XG5cdH1cblxuXHQvKipcblx0ICogQGluaGVyaXREb2Ncblx0ICovXG5cdHB1YmxpYyBhY2NlcHRUcmF2ZXJzZXIodHJhdmVyc2VyOklDb2xsZWN0b3IpXG5cdHtcblx0XHRpZiAodHJhdmVyc2VyLmVudGVyTm9kZSh0aGlzKSlcblx0XHRcdHRyYXZlcnNlci5hcHBseUxpZ2h0UHJvYmUodGhpcy5fbGlnaHRQcm9iZSk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHJldHVybnMge2Jvb2xlYW59XG5cdCAqL1xuXHRwdWJsaWMgaXNDYXN0aW5nU2hhZG93KCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbmV4cG9ydCA9IExpZ2h0UHJvYmVOb2RlOyJdfQ==