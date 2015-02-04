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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vRGlyZWN0aW9uYWxMaWdodE5vZGUudHMiXSwibmFtZXMiOlsiRGlyZWN0aW9uYWxMaWdodE5vZGUiLCJEaXJlY3Rpb25hbExpZ2h0Tm9kZS5jb25zdHJ1Y3RvciIsIkRpcmVjdGlvbmFsTGlnaHROb2RlLmFjY2VwdFRyYXZlcnNlciIsIkRpcmVjdGlvbmFsTGlnaHROb2RlLmlzQ2FzdGluZ1NoYWRvdyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTyxVQUFVLFdBQWUseUNBQXlDLENBQUMsQ0FBQztBQUkzRSxBQUdBOztHQURHO0lBQ0csb0JBQW9CO0lBQVNBLFVBQTdCQSxvQkFBb0JBLFVBQW1CQTtJQUk1Q0E7OztPQUdHQTtJQUNIQSxTQVJLQSxvQkFBb0JBLENBUWJBLGdCQUF3QkE7UUFFbkNDLGtCQUFNQSxnQkFBZ0JBLENBQUNBLENBQUNBO1FBRXhCQSxJQUFJQSxDQUFDQSxpQkFBaUJBLEdBQUdBLGdCQUFnQkEsQ0FBQ0E7SUFDM0NBLENBQUNBO0lBRUREOztPQUVHQTtJQUNJQSw4Q0FBZUEsR0FBdEJBLFVBQXVCQSxTQUFvQkE7UUFFMUNFLEVBQUVBLENBQUNBLENBQUNBLFNBQVNBLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1lBQzdCQSxTQUFTQSxDQUFDQSxxQkFBcUJBLENBQUNBLElBQUlBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsQ0FBQ0E7SUFDMURBLENBQUNBO0lBRURGOzs7T0FHR0E7SUFDSUEsOENBQWVBLEdBQXRCQTtRQUVDRyxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQTtJQUNkQSxDQUFDQTtJQUNGSCwyQkFBQ0E7QUFBREEsQ0FoQ0EsQUFnQ0NBLEVBaENrQyxVQUFVLEVBZ0M1QztBQUVELEFBQThCLGlCQUFyQixvQkFBb0IsQ0FBQyIsImZpbGUiOiJwYXJ0aXRpb24vRGlyZWN0aW9uYWxMaWdodE5vZGUuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEVudGl0eU5vZGVcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3BhcnRpdGlvbi9FbnRpdHlOb2RlXCIpO1xyXG5pbXBvcnQgSUNvbGxlY3Rvclx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvdHJhdmVyc2UvSUNvbGxlY3RvclwiKTtcclxuaW1wb3J0IElFbnRpdHlcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZW50aXRpZXMvSUVudGl0eVwiKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgYXdheS5wYXJ0aXRpb24uRGlyZWN0aW9uYWxMaWdodE5vZGVcclxuICovXHJcbmNsYXNzIERpcmVjdGlvbmFsTGlnaHROb2RlIGV4dGVuZHMgRW50aXR5Tm9kZVxyXG57XHJcblx0cHJpdmF0ZSBfZGlyZWN0aW9uYWxMaWdodDpJRW50aXR5O1xyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBkaXJlY3Rpb25hbExpZ2h0XHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoZGlyZWN0aW9uYWxMaWdodDpJRW50aXR5KVxyXG5cdHtcclxuXHRcdHN1cGVyKGRpcmVjdGlvbmFsTGlnaHQpO1xyXG5cclxuXHRcdHRoaXMuX2RpcmVjdGlvbmFsTGlnaHQgPSBkaXJlY3Rpb25hbExpZ2h0O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQGluaGVyaXREb2NcclxuXHQgKi9cclxuXHRwdWJsaWMgYWNjZXB0VHJhdmVyc2VyKHRyYXZlcnNlcjpJQ29sbGVjdG9yKVxyXG5cdHtcclxuXHRcdGlmICh0cmF2ZXJzZXIuZW50ZXJOb2RlKHRoaXMpKVxyXG5cdFx0XHR0cmF2ZXJzZXIuYXBwbHlEaXJlY3Rpb25hbExpZ2h0KHRoaXMuX2RpcmVjdGlvbmFsTGlnaHQpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuXHQgKi9cclxuXHRwdWJsaWMgaXNDYXN0aW5nU2hhZG93KCk6Ym9vbGVhblxyXG5cdHtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCA9IERpcmVjdGlvbmFsTGlnaHROb2RlOyJdfQ==