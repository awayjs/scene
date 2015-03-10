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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0N1cnZlU3ViTWVzaC50cyJdLCJuYW1lcyI6WyJDdXJ2ZVN1Yk1lc2giLCJDdXJ2ZVN1Yk1lc2guY29uc3RydWN0b3IiLCJDdXJ2ZVN1Yk1lc2guYXNzZXRUeXBlIiwiQ3VydmVTdWJNZXNoLnN1Ykdlb21ldHJ5IiwiQ3VydmVTdWJNZXNoLmRpc3Bvc2UiLCJDdXJ2ZVN1Yk1lc2guX2lDb2xsZWN0UmVuZGVyYWJsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTyxnQkFBZ0IsV0FBYSx1Q0FBdUMsQ0FBQyxDQUFDO0FBRzdFLElBQU8sV0FBVyxXQUFjLHFDQUFxQyxDQUFDLENBQUM7QUFNdkUsQUFTQTs7Ozs7Ozs7R0FERztJQUNHLFlBQVk7SUFBU0EsVUFBckJBLFlBQVlBLFVBQW9CQTtJQXdCckNBOzs7OztPQUtHQTtJQUNIQSxTQTlCS0EsWUFBWUEsQ0E4QkxBLFdBQTRCQSxFQUFFQSxVQUFlQSxFQUFFQSxRQUE0QkE7UUFBNUJDLHdCQUE0QkEsR0FBNUJBLGVBQTRCQTtRQUV0RkEsaUJBQU9BLENBQUNBO1FBRVJBLElBQUlBLENBQUNBLFlBQVlBLEdBQUdBLFVBQVVBLENBQUNBO1FBQy9CQSxJQUFJQSxDQUFDQSxZQUFZQSxHQUFHQSxXQUFXQSxDQUFDQTtRQUNoQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsUUFBUUEsQ0FBQ0E7SUFDMUJBLENBQUNBO0lBMUJERCxzQkFBV0EsbUNBQVNBO1FBSHBCQTs7V0FFR0E7YUFDSEE7WUFFQ0UsTUFBTUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsU0FBU0EsQ0FBQ0E7UUFDL0JBLENBQUNBOzs7T0FBQUY7SUFLREEsc0JBQVdBLHFDQUFXQTtRQUh0QkE7O1dBRUdBO2FBQ0hBO1lBRUNHLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBO1FBQzFCQSxDQUFDQTs7O09BQUFIO0lBaUJEQTs7T0FFR0E7SUFDSUEsOEJBQU9BLEdBQWRBO1FBRUNJLGdCQUFLQSxDQUFDQSxPQUFPQSxXQUFFQSxDQUFDQTtJQUNqQkEsQ0FBQ0E7SUFFTUosMENBQW1CQSxHQUExQkEsVUFBMkJBLFlBQTBCQTtRQUVwREssWUFBWUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtJQUN0Q0EsQ0FBQ0E7SUFoRGFMLHNCQUFTQSxHQUFVQSxzQkFBc0JBLENBQUNBO0lBRTFDQSx5QkFBWUEsR0FBVUEsZ0JBQWdCQSxDQUFDQSxTQUFTQSxDQUFDQTtJQStDaEVBLG1CQUFDQTtBQUFEQSxDQW5EQSxBQW1EQ0EsRUFuRDBCLFdBQVcsRUFtRHJDO0FBRUQsQUFBc0IsaUJBQWIsWUFBWSxDQUFDIiwiZmlsZSI6ImJhc2UvQ3VydmVTdWJNZXNoLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDdXJ2ZVN1Ykdlb21ldHJ5XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2RhdGEvQ3VydmVTdWJHZW9tZXRyeVwiKTtcblxuaW1wb3J0IElTdWJNZXNoXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0lTdWJNZXNoXCIpO1xuaW1wb3J0IFN1Yk1lc2hCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9TdWJNZXNoQmFzZVwiKTtcbmltcG9ydCBJUmVuZGVyZXJQb29sXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3Bvb2wvSVJlbmRlcmVyUG9vbFwiKTtcbmltcG9ydCBTdWJNZXNoUG9vbFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3Bvb2wvU3ViTWVzaFBvb2xcIik7XG5pbXBvcnQgTWVzaFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9NZXNoXCIpO1xuaW1wb3J0IE1hdGVyaWFsQmFzZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL21hdGVyaWFscy9NYXRlcmlhbEJhc2VcIik7XG5cbi8qKlxuICogQ3VydmVTdWJNZXNoIHdyYXBzIGEgQ3VydmVTdWJHZW9tZXRyeSBhcyBhIHNjZW5lIGdyYXBoIGluc3RhbnRpYXRpb24uIEEgQ3VydmVTdWJNZXNoIGlzIG93bmVkIGJ5IGEgTWVzaCBvYmplY3QuXG4gKlxuICpcbiAqIEBzZWUgYXdheS5iYXNlLkN1cnZlU3ViR2VvbWV0cnlcbiAqIEBzZWUgYXdheS5lbnRpdGllcy5NZXNoXG4gKlxuICogQGNsYXNzIGF3YXkuYmFzZS5DdXJ2ZVN1Yk1lc2hcbiAqL1xuY2xhc3MgQ3VydmVTdWJNZXNoIGV4dGVuZHMgU3ViTWVzaEJhc2UgaW1wbGVtZW50cyBJU3ViTWVzaFxue1xuXHRwdWJsaWMgc3RhdGljIGFzc2V0VHlwZTpzdHJpbmcgPSBcIlthc3NldCBDdXJ2ZVN1Yk1lc2hdXCI7XG5cblx0cHVibGljIHN0YXRpYyBnZW9tZXRyeVR5cGU6c3RyaW5nID0gQ3VydmVTdWJHZW9tZXRyeS5hc3NldFR5cGU7XG5cblx0cHJpdmF0ZSBfc3ViR2VvbWV0cnk6Q3VydmVTdWJHZW9tZXRyeTtcblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgYXNzZXRUeXBlKCk6c3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gQ3VydmVTdWJNZXNoLmFzc2V0VHlwZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgVHJpYW5nbGVTdWJHZW9tZXRyeSBvYmplY3Qgd2hpY2ggcHJvdmlkZXMgdGhlIGdlb21ldHJ5IGRhdGEgZm9yIHRoaXMgQ3VydmVTdWJNZXNoLlxuXHQgKi9cblx0cHVibGljIGdldCBzdWJHZW9tZXRyeSgpOkN1cnZlU3ViR2VvbWV0cnlcblx0e1xuXHRcdHJldHVybiB0aGlzLl9zdWJHZW9tZXRyeTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGEgbmV3IEN1cnZlU3ViTWVzaCBvYmplY3Rcblx0ICogQHBhcmFtIHN1Ykdlb21ldHJ5IFRoZSBUcmlhbmdsZVN1Ykdlb21ldHJ5IG9iamVjdCB3aGljaCBwcm92aWRlcyB0aGUgZ2VvbWV0cnkgZGF0YSBmb3IgdGhpcyBDdXJ2ZVN1Yk1lc2guXG5cdCAqIEBwYXJhbSBwYXJlbnRNZXNoIFRoZSBNZXNoIG9iamVjdCB0byB3aGljaCB0aGlzIEN1cnZlU3ViTWVzaCBiZWxvbmdzLlxuXHQgKiBAcGFyYW0gbWF0ZXJpYWwgQW4gb3B0aW9uYWwgbWF0ZXJpYWwgdXNlZCB0byByZW5kZXIgdGhpcyBDdXJ2ZVN1Yk1lc2guXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcihzdWJHZW9tZXRyeTpDdXJ2ZVN1Ykdlb21ldHJ5LCBwYXJlbnRNZXNoOk1lc2gsIG1hdGVyaWFsOk1hdGVyaWFsQmFzZSA9IG51bGwpXG5cdHtcblx0XHRzdXBlcigpO1xuXG5cdFx0dGhpcy5fcFBhcmVudE1lc2ggPSBwYXJlbnRNZXNoO1xuXHRcdHRoaXMuX3N1Ykdlb21ldHJ5ID0gc3ViR2VvbWV0cnk7XG5cdFx0dGhpcy5tYXRlcmlhbCA9IG1hdGVyaWFsO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZGlzcG9zZSgpXG5cdHtcblx0XHRzdXBlci5kaXNwb3NlKCk7XG5cdH1cblxuXHRwdWJsaWMgX2lDb2xsZWN0UmVuZGVyYWJsZShyZW5kZXJlclBvb2w6SVJlbmRlcmVyUG9vbClcblx0e1xuXHRcdHJlbmRlcmVyUG9vbC5hcHBseUN1cnZlU3ViTWVzaCh0aGlzKTtcblx0fVxufVxuXG5leHBvcnQgPSBDdXJ2ZVN1Yk1lc2g7Il19