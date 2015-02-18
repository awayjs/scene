var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AssetType = require("awayjs-core/lib/library/AssetType");
var SubMeshBase = require("awayjs-display/lib/base/SubMeshBase");
/**
 * CurveSubMesh wraps a CurveSubGeometry as a scene graph instantiation. A CurveSubMesh is owned by a Mesh object.
 *
 *
 * @see away.base.CurveSubGeometry
 * @see away.entities.Mesh
 *
 * @class away.base.CurveSubMesh
 */
var CurveSubMesh = (function (_super) {
    __extends(CurveSubMesh, _super);
    /**
     * Creates a new CurveSubMesh object
     * @param subGeometry The TriangleSubGeometry object which provides the geometry data for this CurveSubMesh.
     * @param parentMesh The Mesh object to which this CurveSubMesh belongs.
     * @param material An optional material used to render this CurveSubMesh.
     */
    function CurveSubMesh(subGeometry, parentMesh, material) {
        if (material === void 0) { material = null; }
        _super.call(this);
        this._pParentMesh = parentMesh;
        this._subGeometry = subGeometry;
        this.material = material;
    }
    Object.defineProperty(CurveSubMesh.prototype, "assetType", {
        /**
         *
         */
        get: function () {
            return AssetType.CURVE_SUB_MESH;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CurveSubMesh.prototype, "subGeometry", {
        /**
         * The TriangleSubGeometry object which provides the geometry data for this CurveSubMesh.
         */
        get: function () {
            return this._subGeometry;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     */
    CurveSubMesh.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    CurveSubMesh.prototype._iCollectRenderable = function (rendererPool) {
        rendererPool.applyCurveSubMesh(this);
    };
    return CurveSubMesh;
})(SubMeshBase);
module.exports = CurveSubMesh;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0N1cnZlU3ViTWVzaC50cyJdLCJuYW1lcyI6WyJDdXJ2ZVN1Yk1lc2giLCJDdXJ2ZVN1Yk1lc2guY29uc3RydWN0b3IiLCJDdXJ2ZVN1Yk1lc2guYXNzZXRUeXBlIiwiQ3VydmVTdWJNZXNoLnN1Ykdlb21ldHJ5IiwiQ3VydmVTdWJNZXNoLmRpc3Bvc2UiLCJDdXJ2ZVN1Yk1lc2guX2lDb2xsZWN0UmVuZGVyYWJsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTyxTQUFTLFdBQWMsbUNBQW1DLENBQUMsQ0FBQztBQUVuRSxJQUFPLFdBQVcsV0FBYyxxQ0FBcUMsQ0FBQyxDQUFDO0FBT3ZFLEFBU0E7Ozs7Ozs7O0dBREc7SUFDRyxZQUFZO0lBQVNBLFVBQXJCQSxZQUFZQSxVQUFvQkE7SUFvQnJDQTs7Ozs7T0FLR0E7SUFDSEEsU0ExQktBLFlBQVlBLENBMEJMQSxXQUE0QkEsRUFBRUEsVUFBZUEsRUFBRUEsUUFBNEJBO1FBQTVCQyx3QkFBNEJBLEdBQTVCQSxlQUE0QkE7UUFFdEZBLGlCQUFPQSxDQUFDQTtRQUVSQSxJQUFJQSxDQUFDQSxZQUFZQSxHQUFHQSxVQUFVQSxDQUFDQTtRQUMvQkEsSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsV0FBV0EsQ0FBQ0E7UUFDaENBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLFFBQVFBLENBQUNBO0lBQzFCQSxDQUFDQTtJQTFCREQsc0JBQVdBLG1DQUFTQTtRQUhwQkE7O1dBRUdBO2FBQ0hBO1lBRUNFLE1BQU1BLENBQUNBLFNBQVNBLENBQUNBLGNBQWNBLENBQUNBO1FBQ2pDQSxDQUFDQTs7O09BQUFGO0lBS0RBLHNCQUFXQSxxQ0FBV0E7UUFIdEJBOztXQUVHQTthQUNIQTtZQUVDRyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQTtRQUMxQkEsQ0FBQ0E7OztPQUFBSDtJQWlCREE7O09BRUdBO0lBQ0lBLDhCQUFPQSxHQUFkQTtRQUVDSSxnQkFBS0EsQ0FBQ0EsT0FBT0EsV0FBRUEsQ0FBQ0E7SUFDakJBLENBQUNBO0lBRU1KLDBDQUFtQkEsR0FBMUJBLFVBQTJCQSxZQUEwQkE7UUFFcERLLFlBQVlBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7SUFDdENBLENBQUNBO0lBQ0ZMLG1CQUFDQTtBQUFEQSxDQS9DQSxBQStDQ0EsRUEvQzBCLFdBQVcsRUErQ3JDO0FBRUQsQUFBc0IsaUJBQWIsWUFBWSxDQUFDIiwiZmlsZSI6ImJhc2UvQ3VydmVTdWJNZXNoLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBc3NldFR5cGVcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0Fzc2V0VHlwZVwiKTtcclxuaW1wb3J0IElTdWJNZXNoXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0lTdWJNZXNoXCIpO1xyXG5pbXBvcnQgU3ViTWVzaEJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL1N1Yk1lc2hCYXNlXCIpO1xyXG5pbXBvcnQgQ3VydmVTdWJHZW9tZXRyeVx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9DdXJ2ZVN1Ykdlb21ldHJ5XCIpO1xyXG5cclxuaW1wb3J0IElSZW5kZXJlclBvb2xcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcG9vbC9JUmVuZGVyZXJQb29sXCIpO1xyXG5pbXBvcnQgTWVzaFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9NZXNoXCIpO1xyXG5pbXBvcnQgTWF0ZXJpYWxCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvbWF0ZXJpYWxzL01hdGVyaWFsQmFzZVwiKTtcclxuXHJcbi8qKlxyXG4gKiBDdXJ2ZVN1Yk1lc2ggd3JhcHMgYSBDdXJ2ZVN1Ykdlb21ldHJ5IGFzIGEgc2NlbmUgZ3JhcGggaW5zdGFudGlhdGlvbi4gQSBDdXJ2ZVN1Yk1lc2ggaXMgb3duZWQgYnkgYSBNZXNoIG9iamVjdC5cclxuICpcclxuICpcclxuICogQHNlZSBhd2F5LmJhc2UuQ3VydmVTdWJHZW9tZXRyeVxyXG4gKiBAc2VlIGF3YXkuZW50aXRpZXMuTWVzaFxyXG4gKlxyXG4gKiBAY2xhc3MgYXdheS5iYXNlLkN1cnZlU3ViTWVzaFxyXG4gKi9cclxuY2xhc3MgQ3VydmVTdWJNZXNoIGV4dGVuZHMgU3ViTWVzaEJhc2UgaW1wbGVtZW50cyBJU3ViTWVzaFxyXG57XHJcblx0cHJpdmF0ZSBfc3ViR2VvbWV0cnk6Q3VydmVTdWJHZW9tZXRyeTtcclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGFzc2V0VHlwZSgpOnN0cmluZ1xyXG5cdHtcclxuXHRcdHJldHVybiBBc3NldFR5cGUuQ1VSVkVfU1VCX01FU0g7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgVHJpYW5nbGVTdWJHZW9tZXRyeSBvYmplY3Qgd2hpY2ggcHJvdmlkZXMgdGhlIGdlb21ldHJ5IGRhdGEgZm9yIHRoaXMgQ3VydmVTdWJNZXNoLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgc3ViR2VvbWV0cnkoKTpDdXJ2ZVN1Ykdlb21ldHJ5XHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3N1Ykdlb21ldHJ5O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhIG5ldyBDdXJ2ZVN1Yk1lc2ggb2JqZWN0XHJcblx0ICogQHBhcmFtIHN1Ykdlb21ldHJ5IFRoZSBUcmlhbmdsZVN1Ykdlb21ldHJ5IG9iamVjdCB3aGljaCBwcm92aWRlcyB0aGUgZ2VvbWV0cnkgZGF0YSBmb3IgdGhpcyBDdXJ2ZVN1Yk1lc2guXHJcblx0ICogQHBhcmFtIHBhcmVudE1lc2ggVGhlIE1lc2ggb2JqZWN0IHRvIHdoaWNoIHRoaXMgQ3VydmVTdWJNZXNoIGJlbG9uZ3MuXHJcblx0ICogQHBhcmFtIG1hdGVyaWFsIEFuIG9wdGlvbmFsIG1hdGVyaWFsIHVzZWQgdG8gcmVuZGVyIHRoaXMgQ3VydmVTdWJNZXNoLlxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKHN1Ykdlb21ldHJ5OkN1cnZlU3ViR2VvbWV0cnksIHBhcmVudE1lc2g6TWVzaCwgbWF0ZXJpYWw6TWF0ZXJpYWxCYXNlID0gbnVsbClcclxuXHR7XHJcblx0XHRzdXBlcigpO1xyXG5cclxuXHRcdHRoaXMuX3BQYXJlbnRNZXNoID0gcGFyZW50TWVzaDtcclxuXHRcdHRoaXMuX3N1Ykdlb21ldHJ5ID0gc3ViR2VvbWV0cnk7XHJcblx0XHR0aGlzLm1hdGVyaWFsID0gbWF0ZXJpYWw7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBkaXNwb3NlKClcclxuXHR7XHJcblx0XHRzdXBlci5kaXNwb3NlKCk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgX2lDb2xsZWN0UmVuZGVyYWJsZShyZW5kZXJlclBvb2w6SVJlbmRlcmVyUG9vbClcclxuXHR7XHJcblx0XHRyZW5kZXJlclBvb2wuYXBwbHlDdXJ2ZVN1Yk1lc2godGhpcyk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgPSBDdXJ2ZVN1Yk1lc2g7Il19