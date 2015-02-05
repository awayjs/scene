var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EntityNode = require("awayjs-display/lib/partition/EntityNode");
/**
 * SkyboxNode is a space partitioning leaf node that contains a Skybox object.
 *
 * @class away.partition.SkyboxNode
 */
var SkyboxNode = (function (_super) {
    __extends(SkyboxNode, _super);
    /**
     * Creates a new SkyboxNode object.
     * @param skyBox The Skybox to be contained in the node.
     */
    function SkyboxNode(skyBox) {
        _super.call(this, skyBox);
        this._skyBox = skyBox;
    }
    /**
     * @inheritDoc
     */
    SkyboxNode.prototype.acceptTraverser = function (traverser) {
        if (traverser.enterNode(this))
            traverser.applySkybox(this._skyBox);
    };
    /**
     *
     * @param planes
     * @param numPlanes
     * @returns {boolean}
     */
    SkyboxNode.prototype.isInFrustum = function (planes, numPlanes) {
        if (!this._skyBox._iIsVisible)
            return false;
        //a skybox is always in view unless its visibility is set to false
        return true;
    };
    return SkyboxNode;
})(EntityNode);
module.exports = SkyboxNode;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vU2t5Ym94Tm9kZS50cyJdLCJuYW1lcyI6WyJTa3lib3hOb2RlIiwiU2t5Ym94Tm9kZS5jb25zdHJ1Y3RvciIsIlNreWJveE5vZGUuYWNjZXB0VHJhdmVyc2VyIiwiU2t5Ym94Tm9kZS5pc0luRnJ1c3R1bSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBR0EsSUFBTyxVQUFVLFdBQWUseUNBQXlDLENBQUMsQ0FBQztBQUkzRSxBQUtBOzs7O0dBREc7SUFDRyxVQUFVO0lBQVNBLFVBQW5CQSxVQUFVQSxVQUFtQkE7SUFJbENBOzs7T0FHR0E7SUFDSEEsU0FSS0EsVUFBVUEsQ0FRSEEsTUFBY0E7UUFFekJDLGtCQUFNQSxNQUFNQSxDQUFDQSxDQUFDQTtRQUVkQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFHQSxNQUFNQSxDQUFDQTtJQUN2QkEsQ0FBQ0E7SUFFREQ7O09BRUdBO0lBQ0lBLG9DQUFlQSxHQUF0QkEsVUFBdUJBLFNBQW9CQTtRQUUxQ0UsRUFBRUEsQ0FBQ0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsU0FBU0EsQ0FBWUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDeENBLFNBQVNBLENBQUNBLFdBQVdBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO0lBQ3RDQSxDQUFDQTtJQUVERjs7Ozs7T0FLR0E7SUFDSUEsZ0NBQVdBLEdBQWxCQSxVQUFtQkEsTUFBcUJBLEVBQUVBLFNBQWdCQTtRQUV6REcsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsV0FBV0EsQ0FBQ0E7WUFDN0JBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBO1FBRWRBLEFBQ0FBLGtFQURrRUE7UUFDbEVBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO0lBQ2JBLENBQUNBO0lBQ0ZILGlCQUFDQTtBQUFEQSxDQXRDQSxBQXNDQ0EsRUF0Q3dCLFVBQVUsRUFzQ2xDO0FBRUQsQUFBb0IsaUJBQVgsVUFBVSxDQUFDIiwiZmlsZSI6InBhcnRpdGlvbi9Ta3lib3hOb2RlLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQbGFuZTNEXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vUGxhbmUzRFwiKTtcclxuXHJcbmltcG9ydCBOb2RlQmFzZVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vTm9kZUJhc2VcIik7XHJcbmltcG9ydCBFbnRpdHlOb2RlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vRW50aXR5Tm9kZVwiKTtcclxuaW1wb3J0IElDb2xsZWN0b3JcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3RyYXZlcnNlL0lDb2xsZWN0b3JcIik7XHJcbmltcG9ydCBJRW50aXR5XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2VudGl0aWVzL0lFbnRpdHlcIik7XHJcblxyXG4vKipcclxuICogU2t5Ym94Tm9kZSBpcyBhIHNwYWNlIHBhcnRpdGlvbmluZyBsZWFmIG5vZGUgdGhhdCBjb250YWlucyBhIFNreWJveCBvYmplY3QuXHJcbiAqXHJcbiAqIEBjbGFzcyBhd2F5LnBhcnRpdGlvbi5Ta3lib3hOb2RlXHJcbiAqL1xyXG5jbGFzcyBTa3lib3hOb2RlIGV4dGVuZHMgRW50aXR5Tm9kZVxyXG57XHJcblx0cHJpdmF0ZSBfc2t5Qm94OklFbnRpdHk7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYSBuZXcgU2t5Ym94Tm9kZSBvYmplY3QuXHJcblx0ICogQHBhcmFtIHNreUJveCBUaGUgU2t5Ym94IHRvIGJlIGNvbnRhaW5lZCBpbiB0aGUgbm9kZS5cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3Rvcihza3lCb3g6SUVudGl0eSlcclxuXHR7XHJcblx0XHRzdXBlcihza3lCb3gpO1xyXG5cclxuXHRcdHRoaXMuX3NreUJveCA9IHNreUJveDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBpbmhlcml0RG9jXHJcblx0ICovXHJcblx0cHVibGljIGFjY2VwdFRyYXZlcnNlcih0cmF2ZXJzZXI6SUNvbGxlY3RvcilcclxuXHR7XHJcblx0XHRpZiAodHJhdmVyc2VyLmVudGVyTm9kZSg8Tm9kZUJhc2U+IHRoaXMpKVxyXG5cdFx0XHR0cmF2ZXJzZXIuYXBwbHlTa3lib3godGhpcy5fc2t5Qm94KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHBsYW5lc1xyXG5cdCAqIEBwYXJhbSBudW1QbGFuZXNcclxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuXHQgKi9cclxuXHRwdWJsaWMgaXNJbkZydXN0dW0ocGxhbmVzOkFycmF5PFBsYW5lM0Q+LCBudW1QbGFuZXM6bnVtYmVyKTpib29sZWFuXHJcblx0e1xyXG5cdFx0aWYgKCF0aGlzLl9za3lCb3guX2lJc1Zpc2libGUpXHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHJcblx0XHQvL2Egc2t5Ym94IGlzIGFsd2F5cyBpbiB2aWV3IHVubGVzcyBpdHMgdmlzaWJpbGl0eSBpcyBzZXQgdG8gZmFsc2VcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0ID0gU2t5Ym94Tm9kZTsiXX0=