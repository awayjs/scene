var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CurveSubGeometry = require("awayjs-core/lib/data/CurveSubGeometry");
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
            return CurveSubMesh.assetType;
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
    CurveSubMesh.assetType = "[asset CurveSubMesh]";
    CurveSubMesh.geometryType = CurveSubGeometry.assetType;
    return CurveSubMesh;
})(SubMeshBase);
module.exports = CurveSubMesh;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0N1cnZlU3ViTWVzaC50cyJdLCJuYW1lcyI6WyJDdXJ2ZVN1Yk1lc2giLCJDdXJ2ZVN1Yk1lc2guY29uc3RydWN0b3IiLCJDdXJ2ZVN1Yk1lc2guYXNzZXRUeXBlIiwiQ3VydmVTdWJNZXNoLnN1Ykdlb21ldHJ5IiwiQ3VydmVTdWJNZXNoLmRpc3Bvc2UiLCJDdXJ2ZVN1Yk1lc2guX2lDb2xsZWN0UmVuZGVyYWJsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTyxnQkFBZ0IsV0FBYSx1Q0FBdUMsQ0FBQyxDQUFDO0FBRzdFLElBQU8sV0FBVyxXQUFjLHFDQUFxQyxDQUFDLENBQUM7QUFNdkUsQUFTQTs7Ozs7Ozs7R0FERztJQUNHLFlBQVk7SUFBU0EsVUFBckJBLFlBQVlBLFVBQW9CQTtJQXdCckNBOzs7OztPQUtHQTtJQUNIQSxTQTlCS0EsWUFBWUEsQ0E4QkxBLFdBQTRCQSxFQUFFQSxVQUFlQSxFQUFFQSxRQUE0QkE7UUFBNUJDLHdCQUE0QkEsR0FBNUJBLGVBQTRCQTtRQUV0RkEsaUJBQU9BLENBQUNBO1FBRVJBLElBQUlBLENBQUNBLFlBQVlBLEdBQUdBLFVBQVVBLENBQUNBO1FBQy9CQSxJQUFJQSxDQUFDQSxZQUFZQSxHQUFHQSxXQUFXQSxDQUFDQTtRQUNoQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsUUFBUUEsQ0FBQ0E7SUFDMUJBLENBQUNBO0lBMUJERCxzQkFBV0EsbUNBQVNBO1FBSHBCQTs7V0FFR0E7YUFDSEE7WUFFQ0UsTUFBTUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsU0FBU0EsQ0FBQ0E7UUFDL0JBLENBQUNBOzs7T0FBQUY7SUFLREEsc0JBQVdBLHFDQUFXQTtRQUh0QkE7O1dBRUdBO2FBQ0hBO1lBRUNHLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBO1FBQzFCQSxDQUFDQTs7O09BQUFIO0lBaUJEQTs7T0FFR0E7SUFDSUEsOEJBQU9BLEdBQWRBO1FBRUNJLGdCQUFLQSxDQUFDQSxPQUFPQSxXQUFFQSxDQUFDQTtJQUNqQkEsQ0FBQ0E7SUFFTUosMENBQW1CQSxHQUExQkEsVUFBMkJBLFlBQTBCQTtRQUVwREssWUFBWUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtJQUN0Q0EsQ0FBQ0E7SUFoRGFMLHNCQUFTQSxHQUFVQSxzQkFBc0JBLENBQUNBO0lBRTFDQSx5QkFBWUEsR0FBVUEsZ0JBQWdCQSxDQUFDQSxTQUFTQSxDQUFDQTtJQStDaEVBLG1CQUFDQTtBQUFEQSxDQW5EQSxBQW1EQ0EsRUFuRDBCLFdBQVcsRUFtRHJDO0FBRUQsQUFBc0IsaUJBQWIsWUFBWSxDQUFDIiwiZmlsZSI6ImJhc2UvQ3VydmVTdWJNZXNoLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDdXJ2ZVN1Ykdlb21ldHJ5XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2RhdGEvQ3VydmVTdWJHZW9tZXRyeVwiKTtcclxuXHJcbmltcG9ydCBJU3ViTWVzaFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9JU3ViTWVzaFwiKTtcclxuaW1wb3J0IFN1Yk1lc2hCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9TdWJNZXNoQmFzZVwiKTtcclxuaW1wb3J0IElSZW5kZXJlclBvb2xcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcG9vbC9JUmVuZGVyZXJQb29sXCIpO1xyXG5pbXBvcnQgU3ViTWVzaFBvb2xcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wb29sL1N1Yk1lc2hQb29sXCIpO1xyXG5pbXBvcnQgTWVzaFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9NZXNoXCIpO1xyXG5pbXBvcnQgTWF0ZXJpYWxCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvbWF0ZXJpYWxzL01hdGVyaWFsQmFzZVwiKTtcclxuXHJcbi8qKlxyXG4gKiBDdXJ2ZVN1Yk1lc2ggd3JhcHMgYSBDdXJ2ZVN1Ykdlb21ldHJ5IGFzIGEgc2NlbmUgZ3JhcGggaW5zdGFudGlhdGlvbi4gQSBDdXJ2ZVN1Yk1lc2ggaXMgb3duZWQgYnkgYSBNZXNoIG9iamVjdC5cclxuICpcclxuICpcclxuICogQHNlZSBhd2F5LmJhc2UuQ3VydmVTdWJHZW9tZXRyeVxyXG4gKiBAc2VlIGF3YXkuZW50aXRpZXMuTWVzaFxyXG4gKlxyXG4gKiBAY2xhc3MgYXdheS5iYXNlLkN1cnZlU3ViTWVzaFxyXG4gKi9cclxuY2xhc3MgQ3VydmVTdWJNZXNoIGV4dGVuZHMgU3ViTWVzaEJhc2UgaW1wbGVtZW50cyBJU3ViTWVzaFxyXG57XHJcblx0cHVibGljIHN0YXRpYyBhc3NldFR5cGU6c3RyaW5nID0gXCJbYXNzZXQgQ3VydmVTdWJNZXNoXVwiO1xyXG5cclxuXHRwdWJsaWMgc3RhdGljIGdlb21ldHJ5VHlwZTpzdHJpbmcgPSBDdXJ2ZVN1Ykdlb21ldHJ5LmFzc2V0VHlwZTtcclxuXHJcblx0cHJpdmF0ZSBfc3ViR2VvbWV0cnk6Q3VydmVTdWJHZW9tZXRyeTtcclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGFzc2V0VHlwZSgpOnN0cmluZ1xyXG5cdHtcclxuXHRcdHJldHVybiBDdXJ2ZVN1Yk1lc2guYXNzZXRUeXBlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIFRyaWFuZ2xlU3ViR2VvbWV0cnkgb2JqZWN0IHdoaWNoIHByb3ZpZGVzIHRoZSBnZW9tZXRyeSBkYXRhIGZvciB0aGlzIEN1cnZlU3ViTWVzaC5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHN1Ykdlb21ldHJ5KCk6Q3VydmVTdWJHZW9tZXRyeVxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9zdWJHZW9tZXRyeTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYSBuZXcgQ3VydmVTdWJNZXNoIG9iamVjdFxyXG5cdCAqIEBwYXJhbSBzdWJHZW9tZXRyeSBUaGUgVHJpYW5nbGVTdWJHZW9tZXRyeSBvYmplY3Qgd2hpY2ggcHJvdmlkZXMgdGhlIGdlb21ldHJ5IGRhdGEgZm9yIHRoaXMgQ3VydmVTdWJNZXNoLlxyXG5cdCAqIEBwYXJhbSBwYXJlbnRNZXNoIFRoZSBNZXNoIG9iamVjdCB0byB3aGljaCB0aGlzIEN1cnZlU3ViTWVzaCBiZWxvbmdzLlxyXG5cdCAqIEBwYXJhbSBtYXRlcmlhbCBBbiBvcHRpb25hbCBtYXRlcmlhbCB1c2VkIHRvIHJlbmRlciB0aGlzIEN1cnZlU3ViTWVzaC5cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcihzdWJHZW9tZXRyeTpDdXJ2ZVN1Ykdlb21ldHJ5LCBwYXJlbnRNZXNoOk1lc2gsIG1hdGVyaWFsOk1hdGVyaWFsQmFzZSA9IG51bGwpXHJcblx0e1xyXG5cdFx0c3VwZXIoKTtcclxuXHJcblx0XHR0aGlzLl9wUGFyZW50TWVzaCA9IHBhcmVudE1lc2g7XHJcblx0XHR0aGlzLl9zdWJHZW9tZXRyeSA9IHN1Ykdlb21ldHJ5O1xyXG5cdFx0dGhpcy5tYXRlcmlhbCA9IG1hdGVyaWFsO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZGlzcG9zZSgpXHJcblx0e1xyXG5cdFx0c3VwZXIuZGlzcG9zZSgpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIF9pQ29sbGVjdFJlbmRlcmFibGUocmVuZGVyZXJQb29sOklSZW5kZXJlclBvb2wpXHJcblx0e1xyXG5cdFx0cmVuZGVyZXJQb29sLmFwcGx5Q3VydmVTdWJNZXNoKHRoaXMpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0ID0gQ3VydmVTdWJNZXNoOyJdfQ==