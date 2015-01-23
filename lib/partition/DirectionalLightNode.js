var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EntityNode = require("awayjs-display/lib/partition/EntityNode");
/**
 * @class away.partition.DirectionalLightNode
 */
var DirectionalLightNode = (function (_super) {
    __extends(DirectionalLightNode, _super);
    /**
     *
     * @param directionalLight
     */
    function DirectionalLightNode(directionalLight) {
        _super.call(this, directionalLight);
        this._directionalLight = directionalLight;
    }
    /**
     * @inheritDoc
     */
    DirectionalLightNode.prototype.acceptTraverser = function (traverser) {
        if (traverser.enterNode(this))
            traverser.applyDirectionalLight(this._directionalLight);
    };
    /**
     *
     * @returns {boolean}
     */
    DirectionalLightNode.prototype.isCastingShadow = function () {
        return false;
    };
    return DirectionalLightNode;
})(EntityNode);
module.exports = DirectionalLightNode;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vRGlyZWN0aW9uYWxMaWdodE5vZGUudHMiXSwibmFtZXMiOlsiRGlyZWN0aW9uYWxMaWdodE5vZGUiLCJEaXJlY3Rpb25hbExpZ2h0Tm9kZS5jb25zdHJ1Y3RvciIsIkRpcmVjdGlvbmFsTGlnaHROb2RlLmFjY2VwdFRyYXZlcnNlciIsIkRpcmVjdGlvbmFsTGlnaHROb2RlLmlzQ2FzdGluZ1NoYWRvdyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTyxVQUFVLFdBQWUseUNBQXlDLENBQUMsQ0FBQztBQUkzRSxBQUdBOztHQURHO0lBQ0csb0JBQW9CO0lBQVNBLFVBQTdCQSxvQkFBb0JBLFVBQW1CQTtJQUk1Q0E7OztPQUdHQTtJQUNIQSxTQVJLQSxvQkFBb0JBLENBUWJBLGdCQUF3QkE7UUFFbkNDLGtCQUFNQSxnQkFBZ0JBLENBQUNBLENBQUNBO1FBRXhCQSxJQUFJQSxDQUFDQSxpQkFBaUJBLEdBQUdBLGdCQUFnQkEsQ0FBQ0E7SUFDM0NBLENBQUNBO0lBRUREOztPQUVHQTtJQUNJQSw4Q0FBZUEsR0FBdEJBLFVBQXVCQSxTQUFvQkE7UUFFMUNFLEVBQUVBLENBQUNBLENBQUNBLFNBQVNBLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1lBQzdCQSxTQUFTQSxDQUFDQSxxQkFBcUJBLENBQUNBLElBQUlBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsQ0FBQ0E7SUFDMURBLENBQUNBO0lBRURGOzs7T0FHR0E7SUFDSUEsOENBQWVBLEdBQXRCQTtRQUVDRyxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQTtJQUNkQSxDQUFDQTtJQUNGSCwyQkFBQ0E7QUFBREEsQ0FoQ0EsQUFnQ0NBLEVBaENrQyxVQUFVLEVBZ0M1QztBQUVELEFBQThCLGlCQUFyQixvQkFBb0IsQ0FBQyIsImZpbGUiOiJwYXJ0aXRpb24vRGlyZWN0aW9uYWxMaWdodE5vZGUuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEVudGl0eU5vZGVcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3BhcnRpdGlvbi9FbnRpdHlOb2RlXCIpO1xuaW1wb3J0IElDb2xsZWN0b3JcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3RyYXZlcnNlL0lDb2xsZWN0b3JcIik7XG5pbXBvcnQgSUVudGl0eVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9JRW50aXR5XCIpO1xuXG4vKipcbiAqIEBjbGFzcyBhd2F5LnBhcnRpdGlvbi5EaXJlY3Rpb25hbExpZ2h0Tm9kZVxuICovXG5jbGFzcyBEaXJlY3Rpb25hbExpZ2h0Tm9kZSBleHRlbmRzIEVudGl0eU5vZGVcbntcblx0cHJpdmF0ZSBfZGlyZWN0aW9uYWxMaWdodDpJRW50aXR5O1xuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcGFyYW0gZGlyZWN0aW9uYWxMaWdodFxuXHQgKi9cblx0Y29uc3RydWN0b3IoZGlyZWN0aW9uYWxMaWdodDpJRW50aXR5KVxuXHR7XG5cdFx0c3VwZXIoZGlyZWN0aW9uYWxMaWdodCk7XG5cblx0XHR0aGlzLl9kaXJlY3Rpb25hbExpZ2h0ID0gZGlyZWN0aW9uYWxMaWdodDtcblx0fVxuXG5cdC8qKlxuXHQgKiBAaW5oZXJpdERvY1xuXHQgKi9cblx0cHVibGljIGFjY2VwdFRyYXZlcnNlcih0cmF2ZXJzZXI6SUNvbGxlY3Rvcilcblx0e1xuXHRcdGlmICh0cmF2ZXJzZXIuZW50ZXJOb2RlKHRoaXMpKVxuXHRcdFx0dHJhdmVyc2VyLmFwcGx5RGlyZWN0aW9uYWxMaWdodCh0aGlzLl9kaXJlY3Rpb25hbExpZ2h0KTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cblx0ICovXG5cdHB1YmxpYyBpc0Nhc3RpbmdTaGFkb3coKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxuZXhwb3J0ID0gRGlyZWN0aW9uYWxMaWdodE5vZGU7Il19