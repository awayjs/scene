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
    function SkyboxNode(pool, skyBox, partition) {
        _super.call(this, pool, skyBox, partition);
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
    SkyboxNode.id = "skyboxNode";
    return SkyboxNode;
})(EntityNode);
module.exports = SkyboxNode;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vU2t5Ym94Tm9kZS50cyJdLCJuYW1lcyI6WyJTa3lib3hOb2RlIiwiU2t5Ym94Tm9kZS5jb25zdHJ1Y3RvciIsIlNreWJveE5vZGUuYWNjZXB0VHJhdmVyc2VyIiwiU2t5Ym94Tm9kZS5pc0luRnJ1c3R1bSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBR0EsSUFBTyxVQUFVLFdBQWUseUNBQXlDLENBQUMsQ0FBQztBQU0zRSxBQUtBOzs7O0dBREc7SUFDRyxVQUFVO0lBQVNBLFVBQW5CQSxVQUFVQSxVQUFtQkE7SUFNbENBOzs7T0FHR0E7SUFDSEEsU0FWS0EsVUFBVUEsQ0FVSEEsSUFBbUJBLEVBQUVBLE1BQWNBLEVBQUVBLFNBQW1CQTtRQUVuRUMsa0JBQU1BLElBQUlBLEVBQUVBLE1BQU1BLEVBQUVBLFNBQVNBLENBQUNBLENBQUNBO1FBRS9CQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFHQSxNQUFNQSxDQUFDQTtJQUN2QkEsQ0FBQ0E7SUFFREQ7O09BRUdBO0lBQ0lBLG9DQUFlQSxHQUF0QkEsVUFBdUJBLFNBQXVCQTtRQUU3Q0UsRUFBRUEsQ0FBQ0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsU0FBU0EsQ0FBWUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDeENBLFNBQVNBLENBQUNBLFdBQVdBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO0lBQ3RDQSxDQUFDQTtJQUVERjs7Ozs7T0FLR0E7SUFDSUEsZ0NBQVdBLEdBQWxCQSxVQUFtQkEsTUFBcUJBLEVBQUVBLFNBQWdCQTtRQUV6REcsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsV0FBV0EsQ0FBQ0E7WUFDN0JBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBO1FBRWRBLEFBQ0FBLGtFQURrRUE7UUFDbEVBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO0lBQ2JBLENBQUNBO0lBckNhSCxhQUFFQSxHQUFVQSxZQUFZQSxDQUFDQTtJQXNDeENBLGlCQUFDQTtBQUFEQSxDQXhDQSxBQXdDQ0EsRUF4Q3dCLFVBQVUsRUF3Q2xDO0FBRUQsQUFBb0IsaUJBQVgsVUFBVSxDQUFDIiwiZmlsZSI6InBhcnRpdGlvbi9Ta3lib3hOb2RlLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQbGFuZTNEXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vUGxhbmUzRFwiKTtcclxuXHJcbmltcG9ydCBOb2RlQmFzZVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vTm9kZUJhc2VcIik7XHJcbmltcG9ydCBFbnRpdHlOb2RlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vRW50aXR5Tm9kZVwiKTtcclxuaW1wb3J0IFBhcnRpdGlvblx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcGFydGl0aW9uL1BhcnRpdGlvblwiKTtcclxuaW1wb3J0IENvbGxlY3RvckJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi90cmF2ZXJzZS9Db2xsZWN0b3JCYXNlXCIpO1xyXG5pbXBvcnQgSUVudGl0eVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9JRW50aXR5XCIpO1xyXG5pbXBvcnQgRW50aXR5Tm9kZVBvb2xcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wb29sL0VudGl0eU5vZGVQb29sXCIpO1xyXG5cclxuLyoqXHJcbiAqIFNreWJveE5vZGUgaXMgYSBzcGFjZSBwYXJ0aXRpb25pbmcgbGVhZiBub2RlIHRoYXQgY29udGFpbnMgYSBTa3lib3ggb2JqZWN0LlxyXG4gKlxyXG4gKiBAY2xhc3MgYXdheS5wYXJ0aXRpb24uU2t5Ym94Tm9kZVxyXG4gKi9cclxuY2xhc3MgU2t5Ym94Tm9kZSBleHRlbmRzIEVudGl0eU5vZGVcclxue1xyXG5cdHB1YmxpYyBzdGF0aWMgaWQ6c3RyaW5nID0gXCJza3lib3hOb2RlXCI7XHJcblxyXG5cdHByaXZhdGUgX3NreUJveDpJRW50aXR5O1xyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGEgbmV3IFNreWJveE5vZGUgb2JqZWN0LlxyXG5cdCAqIEBwYXJhbSBza3lCb3ggVGhlIFNreWJveCB0byBiZSBjb250YWluZWQgaW4gdGhlIG5vZGUuXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IocG9vbDpFbnRpdHlOb2RlUG9vbCwgc2t5Qm94OklFbnRpdHksIHBhcnRpdGlvbjpQYXJ0aXRpb24pXHJcblx0e1xyXG5cdFx0c3VwZXIocG9vbCwgc2t5Qm94LCBwYXJ0aXRpb24pO1xyXG5cclxuXHRcdHRoaXMuX3NreUJveCA9IHNreUJveDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBpbmhlcml0RG9jXHJcblx0ICovXHJcblx0cHVibGljIGFjY2VwdFRyYXZlcnNlcih0cmF2ZXJzZXI6Q29sbGVjdG9yQmFzZSlcclxuXHR7XHJcblx0XHRpZiAodHJhdmVyc2VyLmVudGVyTm9kZSg8Tm9kZUJhc2U+IHRoaXMpKVxyXG5cdFx0XHR0cmF2ZXJzZXIuYXBwbHlTa3lib3godGhpcy5fc2t5Qm94KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHBsYW5lc1xyXG5cdCAqIEBwYXJhbSBudW1QbGFuZXNcclxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuXHQgKi9cclxuXHRwdWJsaWMgaXNJbkZydXN0dW0ocGxhbmVzOkFycmF5PFBsYW5lM0Q+LCBudW1QbGFuZXM6bnVtYmVyKTpib29sZWFuXHJcblx0e1xyXG5cdFx0aWYgKCF0aGlzLl9za3lCb3guX2lJc1Zpc2libGUpXHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHJcblx0XHQvL2Egc2t5Ym94IGlzIGFsd2F5cyBpbiB2aWV3IHVubGVzcyBpdHMgdmlzaWJpbGl0eSBpcyBzZXQgdG8gZmFsc2VcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0ID0gU2t5Ym94Tm9kZTsiXX0=