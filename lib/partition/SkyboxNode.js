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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vc2t5Ym94bm9kZS50cyJdLCJuYW1lcyI6WyJTa3lib3hOb2RlIiwiU2t5Ym94Tm9kZS5jb25zdHJ1Y3RvciIsIlNreWJveE5vZGUuYWNjZXB0VHJhdmVyc2VyIiwiU2t5Ym94Tm9kZS5pc0luRnJ1c3R1bSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBR0EsSUFBTyxVQUFVLFdBQWUseUNBQXlDLENBQUMsQ0FBQztBQU0zRSxBQUtBOzs7O0dBREc7SUFDRyxVQUFVO0lBQVNBLFVBQW5CQSxVQUFVQSxVQUFtQkE7SUFNbENBOzs7T0FHR0E7SUFDSEEsU0FWS0EsVUFBVUEsQ0FVSEEsSUFBbUJBLEVBQUVBLE1BQWNBLEVBQUVBLFNBQW1CQTtRQUVuRUMsa0JBQU1BLElBQUlBLEVBQUVBLE1BQU1BLEVBQUVBLFNBQVNBLENBQUNBLENBQUNBO1FBRS9CQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFHQSxNQUFNQSxDQUFDQTtJQUN2QkEsQ0FBQ0E7SUFFREQ7O09BRUdBO0lBQ0lBLG9DQUFlQSxHQUF0QkEsVUFBdUJBLFNBQXVCQTtRQUU3Q0UsRUFBRUEsQ0FBQ0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsU0FBU0EsQ0FBWUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDeENBLFNBQVNBLENBQUNBLFdBQVdBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO0lBQ3RDQSxDQUFDQTtJQUVERjs7Ozs7T0FLR0E7SUFDSUEsZ0NBQVdBLEdBQWxCQSxVQUFtQkEsTUFBcUJBLEVBQUVBLFNBQWdCQTtRQUV6REcsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsV0FBV0EsQ0FBQ0E7WUFDN0JBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBO1FBRWRBLEFBQ0FBLGtFQURrRUE7UUFDbEVBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO0lBQ2JBLENBQUNBO0lBckNhSCxhQUFFQSxHQUFVQSxZQUFZQSxDQUFDQTtJQXNDeENBLGlCQUFDQTtBQUFEQSxDQXhDQSxBQXdDQ0EsRUF4Q3dCLFVBQVUsRUF3Q2xDO0FBRUQsQUFBb0IsaUJBQVgsVUFBVSxDQUFDIiwiZmlsZSI6InBhcnRpdGlvbi9Ta3lib3hOb2RlLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQbGFuZTNEXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vUGxhbmUzRFwiKTtcblxuaW1wb3J0IE5vZGVCYXNlXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3BhcnRpdGlvbi9Ob2RlQmFzZVwiKTtcbmltcG9ydCBFbnRpdHlOb2RlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vRW50aXR5Tm9kZVwiKTtcbmltcG9ydCBQYXJ0aXRpb25cdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3BhcnRpdGlvbi9QYXJ0aXRpb25cIik7XG5pbXBvcnQgQ29sbGVjdG9yQmFzZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3RyYXZlcnNlL0NvbGxlY3RvckJhc2VcIik7XG5pbXBvcnQgSUVudGl0eVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9JRW50aXR5XCIpO1xuaW1wb3J0IEVudGl0eU5vZGVQb29sXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcG9vbC9FbnRpdHlOb2RlUG9vbFwiKTtcblxuLyoqXG4gKiBTa3lib3hOb2RlIGlzIGEgc3BhY2UgcGFydGl0aW9uaW5nIGxlYWYgbm9kZSB0aGF0IGNvbnRhaW5zIGEgU2t5Ym94IG9iamVjdC5cbiAqXG4gKiBAY2xhc3MgYXdheS5wYXJ0aXRpb24uU2t5Ym94Tm9kZVxuICovXG5jbGFzcyBTa3lib3hOb2RlIGV4dGVuZHMgRW50aXR5Tm9kZVxue1xuXHRwdWJsaWMgc3RhdGljIGlkOnN0cmluZyA9IFwic2t5Ym94Tm9kZVwiO1xuXG5cdHByaXZhdGUgX3NreUJveDpJRW50aXR5O1xuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGEgbmV3IFNreWJveE5vZGUgb2JqZWN0LlxuXHQgKiBAcGFyYW0gc2t5Qm94IFRoZSBTa3lib3ggdG8gYmUgY29udGFpbmVkIGluIHRoZSBub2RlLlxuXHQgKi9cblx0Y29uc3RydWN0b3IocG9vbDpFbnRpdHlOb2RlUG9vbCwgc2t5Qm94OklFbnRpdHksIHBhcnRpdGlvbjpQYXJ0aXRpb24pXG5cdHtcblx0XHRzdXBlcihwb29sLCBza3lCb3gsIHBhcnRpdGlvbik7XG5cblx0XHR0aGlzLl9za3lCb3ggPSBza3lCb3g7XG5cdH1cblxuXHQvKipcblx0ICogQGluaGVyaXREb2Ncblx0ICovXG5cdHB1YmxpYyBhY2NlcHRUcmF2ZXJzZXIodHJhdmVyc2VyOkNvbGxlY3RvckJhc2UpXG5cdHtcblx0XHRpZiAodHJhdmVyc2VyLmVudGVyTm9kZSg8Tm9kZUJhc2U+IHRoaXMpKVxuXHRcdFx0dHJhdmVyc2VyLmFwcGx5U2t5Ym94KHRoaXMuX3NreUJveCk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHBhcmFtIHBsYW5lc1xuXHQgKiBAcGFyYW0gbnVtUGxhbmVzXG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxuXHQgKi9cblx0cHVibGljIGlzSW5GcnVzdHVtKHBsYW5lczpBcnJheTxQbGFuZTNEPiwgbnVtUGxhbmVzOm51bWJlcik6Ym9vbGVhblxuXHR7XG5cdFx0aWYgKCF0aGlzLl9za3lCb3guX2lJc1Zpc2libGUpXG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cblx0XHQvL2Egc2t5Ym94IGlzIGFsd2F5cyBpbiB2aWV3IHVubGVzcyBpdHMgdmlzaWJpbGl0eSBpcyBzZXQgdG8gZmFsc2Vcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxufVxuXG5leHBvcnQgPSBTa3lib3hOb2RlOyJdfQ==