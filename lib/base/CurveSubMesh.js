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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0N1cnZlU3ViTWVzaC50cyJdLCJuYW1lcyI6WyJDdXJ2ZVN1Yk1lc2giLCJDdXJ2ZVN1Yk1lc2guY29uc3RydWN0b3IiLCJDdXJ2ZVN1Yk1lc2guYXNzZXRUeXBlIiwiQ3VydmVTdWJNZXNoLnN1Ykdlb21ldHJ5IiwiQ3VydmVTdWJNZXNoLmRpc3Bvc2UiLCJDdXJ2ZVN1Yk1lc2guX2lDb2xsZWN0UmVuZGVyYWJsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsSUFBTyxTQUFTLFdBQWMsbUNBQW1DLENBQUMsQ0FBQztBQUduRSxJQUFPLFdBQVcsV0FBYyxxQ0FBcUMsQ0FBQyxDQUFDO0FBTXZFLEFBU0E7Ozs7Ozs7O0dBREc7SUFDRyxZQUFZO0lBQVNBLFVBQXJCQSxZQUFZQSxVQUFvQkE7SUFvQnJDQTs7Ozs7T0FLR0E7SUFDSEEsU0ExQktBLFlBQVlBLENBMEJMQSxXQUE0QkEsRUFBRUEsVUFBZUEsRUFBRUEsUUFBNEJBO1FBQTVCQyx3QkFBNEJBLEdBQTVCQSxlQUE0QkE7UUFFdEZBLGlCQUFPQSxDQUFDQTtRQUVSQSxJQUFJQSxDQUFDQSxZQUFZQSxHQUFHQSxVQUFVQSxDQUFDQTtRQUMvQkEsSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsV0FBV0EsQ0FBQ0E7UUFDaENBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLFFBQVFBLENBQUNBO0lBQzFCQSxDQUFDQTtJQTFCREQsc0JBQVdBLG1DQUFTQTtRQUhwQkE7O1dBRUdBO2FBQ0hBO1lBRUNFLE1BQU1BLENBQUNBLFNBQVNBLENBQUNBLGNBQWNBLENBQUNBO1FBQ2pDQSxDQUFDQTs7O09BQUFGO0lBS0RBLHNCQUFXQSxxQ0FBV0E7UUFIdEJBOztXQUVHQTthQUNIQTtZQUVDRyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQTtRQUMxQkEsQ0FBQ0E7OztPQUFBSDtJQWlCREE7O09BRUdBO0lBQ0lBLDhCQUFPQSxHQUFkQTtRQUVDSSxnQkFBS0EsQ0FBQ0EsT0FBT0EsV0FBRUEsQ0FBQ0E7SUFDakJBLENBQUNBO0lBRU1KLDBDQUFtQkEsR0FBMUJBLFVBQTJCQSxZQUEwQkE7UUFFcERLLFlBQVlBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7SUFDdENBLENBQUNBO0lBQ0ZMLG1CQUFDQTtBQUFEQSxDQS9DQSxBQStDQ0EsRUEvQzBCLFdBQVcsRUErQ3JDO0FBRUQsQUFBc0IsaUJBQWIsWUFBWSxDQUFDIiwiZmlsZSI6ImJhc2UvQ3VydmVTdWJNZXNoLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDdXJ2ZVN1Ykdlb21ldHJ5XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2RhdGEvQ3VydmVTdWJHZW9tZXRyeVwiKTtcclxuaW1wb3J0IEFzc2V0VHlwZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvQXNzZXRUeXBlXCIpO1xyXG5cclxuaW1wb3J0IElTdWJNZXNoXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0lTdWJNZXNoXCIpO1xyXG5pbXBvcnQgU3ViTWVzaEJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL1N1Yk1lc2hCYXNlXCIpO1xyXG5pbXBvcnQgSVJlbmRlcmVyUG9vbFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wb29sL0lSZW5kZXJlclBvb2xcIik7XHJcbmltcG9ydCBTdWJNZXNoUG9vbFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3Bvb2wvU3ViTWVzaFBvb2xcIik7XHJcbmltcG9ydCBNZXNoXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2VudGl0aWVzL01lc2hcIik7XHJcbmltcG9ydCBNYXRlcmlhbEJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9tYXRlcmlhbHMvTWF0ZXJpYWxCYXNlXCIpO1xyXG5cclxuLyoqXHJcbiAqIEN1cnZlU3ViTWVzaCB3cmFwcyBhIEN1cnZlU3ViR2VvbWV0cnkgYXMgYSBzY2VuZSBncmFwaCBpbnN0YW50aWF0aW9uLiBBIEN1cnZlU3ViTWVzaCBpcyBvd25lZCBieSBhIE1lc2ggb2JqZWN0LlxyXG4gKlxyXG4gKlxyXG4gKiBAc2VlIGF3YXkuYmFzZS5DdXJ2ZVN1Ykdlb21ldHJ5XHJcbiAqIEBzZWUgYXdheS5lbnRpdGllcy5NZXNoXHJcbiAqXHJcbiAqIEBjbGFzcyBhd2F5LmJhc2UuQ3VydmVTdWJNZXNoXHJcbiAqL1xyXG5jbGFzcyBDdXJ2ZVN1Yk1lc2ggZXh0ZW5kcyBTdWJNZXNoQmFzZSBpbXBsZW1lbnRzIElTdWJNZXNoXHJcbntcclxuXHRwcml2YXRlIF9zdWJHZW9tZXRyeTpDdXJ2ZVN1Ykdlb21ldHJ5O1xyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgYXNzZXRUeXBlKCk6c3RyaW5nXHJcblx0e1xyXG5cdFx0cmV0dXJuIEFzc2V0VHlwZS5DVVJWRV9TVUJfTUVTSDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBUcmlhbmdsZVN1Ykdlb21ldHJ5IG9iamVjdCB3aGljaCBwcm92aWRlcyB0aGUgZ2VvbWV0cnkgZGF0YSBmb3IgdGhpcyBDdXJ2ZVN1Yk1lc2guXHJcblx0ICovXHJcblx0cHVibGljIGdldCBzdWJHZW9tZXRyeSgpOkN1cnZlU3ViR2VvbWV0cnlcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fc3ViR2VvbWV0cnk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGEgbmV3IEN1cnZlU3ViTWVzaCBvYmplY3RcclxuXHQgKiBAcGFyYW0gc3ViR2VvbWV0cnkgVGhlIFRyaWFuZ2xlU3ViR2VvbWV0cnkgb2JqZWN0IHdoaWNoIHByb3ZpZGVzIHRoZSBnZW9tZXRyeSBkYXRhIGZvciB0aGlzIEN1cnZlU3ViTWVzaC5cclxuXHQgKiBAcGFyYW0gcGFyZW50TWVzaCBUaGUgTWVzaCBvYmplY3QgdG8gd2hpY2ggdGhpcyBDdXJ2ZVN1Yk1lc2ggYmVsb25ncy5cclxuXHQgKiBAcGFyYW0gbWF0ZXJpYWwgQW4gb3B0aW9uYWwgbWF0ZXJpYWwgdXNlZCB0byByZW5kZXIgdGhpcyBDdXJ2ZVN1Yk1lc2guXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3Ioc3ViR2VvbWV0cnk6Q3VydmVTdWJHZW9tZXRyeSwgcGFyZW50TWVzaDpNZXNoLCBtYXRlcmlhbDpNYXRlcmlhbEJhc2UgPSBudWxsKVxyXG5cdHtcclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0dGhpcy5fcFBhcmVudE1lc2ggPSBwYXJlbnRNZXNoO1xyXG5cdFx0dGhpcy5fc3ViR2VvbWV0cnkgPSBzdWJHZW9tZXRyeTtcclxuXHRcdHRoaXMubWF0ZXJpYWwgPSBtYXRlcmlhbDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGRpc3Bvc2UoKVxyXG5cdHtcclxuXHRcdHN1cGVyLmRpc3Bvc2UoKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBfaUNvbGxlY3RSZW5kZXJhYmxlKHJlbmRlcmVyUG9vbDpJUmVuZGVyZXJQb29sKVxyXG5cdHtcclxuXHRcdHJlbmRlcmVyUG9vbC5hcHBseUN1cnZlU3ViTWVzaCh0aGlzKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCA9IEN1cnZlU3ViTWVzaDsiXX0=