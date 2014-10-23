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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vc2t5Ym94bm9kZS50cyJdLCJuYW1lcyI6WyJTa3lib3hOb2RlIiwiU2t5Ym94Tm9kZS5jb25zdHJ1Y3RvciIsIlNreWJveE5vZGUuYWNjZXB0VHJhdmVyc2VyIiwiU2t5Ym94Tm9kZS5pc0luRnJ1c3R1bSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBR0EsSUFBTyxVQUFVLFdBQWUseUNBQXlDLENBQUMsQ0FBQztBQUkzRSxBQUtBOzs7O0dBREc7SUFDRyxVQUFVO0lBQVNBLFVBQW5CQSxVQUFVQSxVQUFtQkE7SUFJbENBOzs7T0FHR0E7SUFDSEEsU0FSS0EsVUFBVUEsQ0FRSEEsTUFBY0E7UUFFekJDLGtCQUFNQSxNQUFNQSxDQUFDQSxDQUFDQTtRQUVkQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFHQSxNQUFNQSxDQUFDQTtJQUN2QkEsQ0FBQ0E7SUFFREQ7O09BRUdBO0lBQ0lBLG9DQUFlQSxHQUF0QkEsVUFBdUJBLFNBQW9CQTtRQUUxQ0UsRUFBRUEsQ0FBQ0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsU0FBU0EsQ0FBWUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDeENBLFNBQVNBLENBQUNBLFdBQVdBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO0lBQ3RDQSxDQUFDQTtJQUVERjs7Ozs7T0FLR0E7SUFDSUEsZ0NBQVdBLEdBQWxCQSxVQUFtQkEsTUFBcUJBLEVBQUVBLFNBQWdCQTtRQUV6REcsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsV0FBV0EsQ0FBQ0E7WUFDN0JBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBO1FBRWRBLEFBQ0FBLGtFQURrRUE7UUFDbEVBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO0lBQ2JBLENBQUNBO0lBQ0ZILGlCQUFDQTtBQUFEQSxDQXRDQSxBQXNDQ0EsRUF0Q3dCLFVBQVUsRUFzQ2xDO0FBRUQsQUFBb0IsaUJBQVgsVUFBVSxDQUFDIiwiZmlsZSI6InBhcnRpdGlvbi9Ta3lib3hOb2RlLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQbGFuZTNEXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vUGxhbmUzRFwiKTtcblxuaW1wb3J0IE5vZGVCYXNlXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3BhcnRpdGlvbi9Ob2RlQmFzZVwiKTtcbmltcG9ydCBFbnRpdHlOb2RlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vRW50aXR5Tm9kZVwiKTtcbmltcG9ydCBJQ29sbGVjdG9yXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi90cmF2ZXJzZS9JQ29sbGVjdG9yXCIpO1xuaW1wb3J0IElFbnRpdHlcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZW50aXRpZXMvSUVudGl0eVwiKTtcblxuLyoqXG4gKiBTa3lib3hOb2RlIGlzIGEgc3BhY2UgcGFydGl0aW9uaW5nIGxlYWYgbm9kZSB0aGF0IGNvbnRhaW5zIGEgU2t5Ym94IG9iamVjdC5cbiAqXG4gKiBAY2xhc3MgYXdheS5wYXJ0aXRpb24uU2t5Ym94Tm9kZVxuICovXG5jbGFzcyBTa3lib3hOb2RlIGV4dGVuZHMgRW50aXR5Tm9kZVxue1xuXHRwcml2YXRlIF9za3lCb3g6SUVudGl0eTtcblxuXHQvKipcblx0ICogQ3JlYXRlcyBhIG5ldyBTa3lib3hOb2RlIG9iamVjdC5cblx0ICogQHBhcmFtIHNreUJveCBUaGUgU2t5Ym94IHRvIGJlIGNvbnRhaW5lZCBpbiB0aGUgbm9kZS5cblx0ICovXG5cdGNvbnN0cnVjdG9yKHNreUJveDpJRW50aXR5KVxuXHR7XG5cdFx0c3VwZXIoc2t5Qm94KTtcblxuXHRcdHRoaXMuX3NreUJveCA9IHNreUJveDtcblx0fVxuXG5cdC8qKlxuXHQgKiBAaW5oZXJpdERvY1xuXHQgKi9cblx0cHVibGljIGFjY2VwdFRyYXZlcnNlcih0cmF2ZXJzZXI6SUNvbGxlY3Rvcilcblx0e1xuXHRcdGlmICh0cmF2ZXJzZXIuZW50ZXJOb2RlKDxOb2RlQmFzZT4gdGhpcykpXG5cdFx0XHR0cmF2ZXJzZXIuYXBwbHlTa3lib3godGhpcy5fc2t5Qm94KTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcGFyYW0gcGxhbmVzXG5cdCAqIEBwYXJhbSBudW1QbGFuZXNcblx0ICogQHJldHVybnMge2Jvb2xlYW59XG5cdCAqL1xuXHRwdWJsaWMgaXNJbkZydXN0dW0ocGxhbmVzOkFycmF5PFBsYW5lM0Q+LCBudW1QbGFuZXM6bnVtYmVyKTpib29sZWFuXG5cdHtcblx0XHRpZiAoIXRoaXMuX3NreUJveC5faUlzVmlzaWJsZSlcblx0XHRcdHJldHVybiBmYWxzZTtcblxuXHRcdC8vYSBza3lib3ggaXMgYWx3YXlzIGluIHZpZXcgdW5sZXNzIGl0cyB2aXNpYmlsaXR5IGlzIHNldCB0byBmYWxzZVxuXHRcdHJldHVybiB0cnVlO1xuXHR9XG59XG5cbmV4cG9ydCA9IFNreWJveE5vZGU7Il19