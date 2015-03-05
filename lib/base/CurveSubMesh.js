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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0N1cnZlU3ViTWVzaC50cyJdLCJuYW1lcyI6WyJDdXJ2ZVN1Yk1lc2giLCJDdXJ2ZVN1Yk1lc2guY29uc3RydWN0b3IiLCJDdXJ2ZVN1Yk1lc2guYXNzZXRUeXBlIiwiQ3VydmVTdWJNZXNoLnN1Ykdlb21ldHJ5IiwiQ3VydmVTdWJNZXNoLmRpc3Bvc2UiLCJDdXJ2ZVN1Yk1lc2guX2lDb2xsZWN0UmVuZGVyYWJsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTyxTQUFTLFdBQWMsbUNBQW1DLENBQUMsQ0FBQztBQUVuRSxJQUFPLFdBQVcsV0FBYyxxQ0FBcUMsQ0FBQyxDQUFDO0FBT3ZFLEFBU0E7Ozs7Ozs7O0dBREc7SUFDRyxZQUFZO0lBQVNBLFVBQXJCQSxZQUFZQSxVQUFvQkE7SUFvQnJDQTs7Ozs7T0FLR0E7SUFDSEEsU0ExQktBLFlBQVlBLENBMEJMQSxXQUE0QkEsRUFBRUEsVUFBZUEsRUFBRUEsUUFBNEJBO1FBQTVCQyx3QkFBNEJBLEdBQTVCQSxlQUE0QkE7UUFFdEZBLGlCQUFPQSxDQUFDQTtRQUVSQSxJQUFJQSxDQUFDQSxZQUFZQSxHQUFHQSxVQUFVQSxDQUFDQTtRQUMvQkEsSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsV0FBV0EsQ0FBQ0E7UUFDaENBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLFFBQVFBLENBQUNBO0lBQzFCQSxDQUFDQTtJQTFCREQsc0JBQVdBLG1DQUFTQTtRQUhwQkE7O1dBRUdBO2FBQ0hBO1lBRUNFLE1BQU1BLENBQUNBLFNBQVNBLENBQUNBLGNBQWNBLENBQUNBO1FBQ2pDQSxDQUFDQTs7O09BQUFGO0lBS0RBLHNCQUFXQSxxQ0FBV0E7UUFIdEJBOztXQUVHQTthQUNIQTtZQUVDRyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQTtRQUMxQkEsQ0FBQ0E7OztPQUFBSDtJQWlCREE7O09BRUdBO0lBQ0lBLDhCQUFPQSxHQUFkQTtRQUVDSSxnQkFBS0EsQ0FBQ0EsT0FBT0EsV0FBRUEsQ0FBQ0E7SUFDakJBLENBQUNBO0lBRU1KLDBDQUFtQkEsR0FBMUJBLFVBQTJCQSxZQUEwQkE7UUFFcERLLFlBQVlBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7SUFDdENBLENBQUNBO0lBQ0ZMLG1CQUFDQTtBQUFEQSxDQS9DQSxBQStDQ0EsRUEvQzBCLFdBQVcsRUErQ3JDO0FBRUQsQUFBc0IsaUJBQWIsWUFBWSxDQUFDIiwiZmlsZSI6ImJhc2UvQ3VydmVTdWJNZXNoLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBc3NldFR5cGVcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0Fzc2V0VHlwZVwiKTtcbmltcG9ydCBJU3ViTWVzaFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9JU3ViTWVzaFwiKTtcbmltcG9ydCBTdWJNZXNoQmFzZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvU3ViTWVzaEJhc2VcIik7XG5pbXBvcnQgQ3VydmVTdWJHZW9tZXRyeVx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9DdXJ2ZVN1Ykdlb21ldHJ5XCIpO1xuXG5pbXBvcnQgSVJlbmRlcmVyUG9vbFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wb29sL0lSZW5kZXJlclBvb2xcIik7XG5pbXBvcnQgTWVzaFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9NZXNoXCIpO1xuaW1wb3J0IE1hdGVyaWFsQmFzZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL21hdGVyaWFscy9NYXRlcmlhbEJhc2VcIik7XG5cbi8qKlxuICogQ3VydmVTdWJNZXNoIHdyYXBzIGEgQ3VydmVTdWJHZW9tZXRyeSBhcyBhIHNjZW5lIGdyYXBoIGluc3RhbnRpYXRpb24uIEEgQ3VydmVTdWJNZXNoIGlzIG93bmVkIGJ5IGEgTWVzaCBvYmplY3QuXG4gKlxuICpcbiAqIEBzZWUgYXdheS5iYXNlLkN1cnZlU3ViR2VvbWV0cnlcbiAqIEBzZWUgYXdheS5lbnRpdGllcy5NZXNoXG4gKlxuICogQGNsYXNzIGF3YXkuYmFzZS5DdXJ2ZVN1Yk1lc2hcbiAqL1xuY2xhc3MgQ3VydmVTdWJNZXNoIGV4dGVuZHMgU3ViTWVzaEJhc2UgaW1wbGVtZW50cyBJU3ViTWVzaFxue1xuXHRwcml2YXRlIF9zdWJHZW9tZXRyeTpDdXJ2ZVN1Ykdlb21ldHJ5O1xuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBhc3NldFR5cGUoKTpzdHJpbmdcblx0e1xuXHRcdHJldHVybiBBc3NldFR5cGUuQ1VSVkVfU1VCX01FU0g7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIFRyaWFuZ2xlU3ViR2VvbWV0cnkgb2JqZWN0IHdoaWNoIHByb3ZpZGVzIHRoZSBnZW9tZXRyeSBkYXRhIGZvciB0aGlzIEN1cnZlU3ViTWVzaC5cblx0ICovXG5cdHB1YmxpYyBnZXQgc3ViR2VvbWV0cnkoKTpDdXJ2ZVN1Ykdlb21ldHJ5XG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fc3ViR2VvbWV0cnk7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlcyBhIG5ldyBDdXJ2ZVN1Yk1lc2ggb2JqZWN0XG5cdCAqIEBwYXJhbSBzdWJHZW9tZXRyeSBUaGUgVHJpYW5nbGVTdWJHZW9tZXRyeSBvYmplY3Qgd2hpY2ggcHJvdmlkZXMgdGhlIGdlb21ldHJ5IGRhdGEgZm9yIHRoaXMgQ3VydmVTdWJNZXNoLlxuXHQgKiBAcGFyYW0gcGFyZW50TWVzaCBUaGUgTWVzaCBvYmplY3QgdG8gd2hpY2ggdGhpcyBDdXJ2ZVN1Yk1lc2ggYmVsb25ncy5cblx0ICogQHBhcmFtIG1hdGVyaWFsIEFuIG9wdGlvbmFsIG1hdGVyaWFsIHVzZWQgdG8gcmVuZGVyIHRoaXMgQ3VydmVTdWJNZXNoLlxuXHQgKi9cblx0Y29uc3RydWN0b3Ioc3ViR2VvbWV0cnk6Q3VydmVTdWJHZW9tZXRyeSwgcGFyZW50TWVzaDpNZXNoLCBtYXRlcmlhbDpNYXRlcmlhbEJhc2UgPSBudWxsKVxuXHR7XG5cdFx0c3VwZXIoKTtcblxuXHRcdHRoaXMuX3BQYXJlbnRNZXNoID0gcGFyZW50TWVzaDtcblx0XHR0aGlzLl9zdWJHZW9tZXRyeSA9IHN1Ykdlb21ldHJ5O1xuXHRcdHRoaXMubWF0ZXJpYWwgPSBtYXRlcmlhbDtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGRpc3Bvc2UoKVxuXHR7XG5cdFx0c3VwZXIuZGlzcG9zZSgpO1xuXHR9XG5cblx0cHVibGljIF9pQ29sbGVjdFJlbmRlcmFibGUocmVuZGVyZXJQb29sOklSZW5kZXJlclBvb2wpXG5cdHtcblx0XHRyZW5kZXJlclBvb2wuYXBwbHlDdXJ2ZVN1Yk1lc2godGhpcyk7XG5cdH1cbn1cblxuZXhwb3J0ID0gQ3VydmVTdWJNZXNoOyJdfQ==