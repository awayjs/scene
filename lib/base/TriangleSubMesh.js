var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TriangleSubGeometry = require("awayjs-core/lib/data/TriangleSubGeometry");
var SubMeshBase = require("awayjs-display/lib/base/SubMeshBase");
/**
 * TriangleSubMesh wraps a TriangleSubGeometry as a scene graph instantiation. A TriangleSubMesh is owned by a Mesh object.
 *
 *
 * @see away.base.TriangleSubGeometry
 * @see away.entities.Mesh
 *
 * @class away.base.TriangleSubMesh
 */
var TriangleSubMesh = (function (_super) {
    __extends(TriangleSubMesh, _super);
    /**
     * Creates a new TriangleSubMesh object
     * @param subGeometry The TriangleSubGeometry object which provides the geometry data for this TriangleSubMesh.
     * @param parentMesh The Mesh object to which this TriangleSubMesh belongs.
     * @param material An optional material used to render this TriangleSubMesh.
     */
    function TriangleSubMesh(subGeometry, parentMesh, material) {
        if (material === void 0) { material = null; }
        _super.call(this);
        this._pParentMesh = parentMesh;
        this._subGeometry = subGeometry;
        this.material = material;
    }
    Object.defineProperty(TriangleSubMesh.prototype, "assetType", {
        /**
         *
         */
        get: function () {
            return TriangleSubMesh.assetType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TriangleSubMesh.prototype, "subGeometry", {
        /**
         * The TriangleSubGeometry object which provides the geometry data for this TriangleSubMesh.
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
    TriangleSubMesh.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    TriangleSubMesh.prototype._iCollectRenderable = function (rendererPool) {
        rendererPool.applyTriangleSubMesh(this);
    };
    TriangleSubMesh.assetType = "[asset TriangleSubMesh]";
    TriangleSubMesh.geometryType = TriangleSubGeometry.assetType;
    return TriangleSubMesh;
})(SubMeshBase);
module.exports = TriangleSubMesh;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL1RyaWFuZ2xlU3ViTWVzaC50cyJdLCJuYW1lcyI6WyJUcmlhbmdsZVN1Yk1lc2giLCJUcmlhbmdsZVN1Yk1lc2guY29uc3RydWN0b3IiLCJUcmlhbmdsZVN1Yk1lc2guYXNzZXRUeXBlIiwiVHJpYW5nbGVTdWJNZXNoLnN1Ykdlb21ldHJ5IiwiVHJpYW5nbGVTdWJNZXNoLmRpc3Bvc2UiLCJUcmlhbmdsZVN1Yk1lc2guX2lDb2xsZWN0UmVuZGVyYWJsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTyxtQkFBbUIsV0FBWSwwQ0FBMEMsQ0FBQyxDQUFDO0FBR2xGLElBQU8sV0FBVyxXQUFjLHFDQUFxQyxDQUFDLENBQUM7QUFNdkUsQUFTQTs7Ozs7Ozs7R0FERztJQUNHLGVBQWU7SUFBU0EsVUFBeEJBLGVBQWVBLFVBQW9CQTtJQXdCeENBOzs7OztPQUtHQTtJQUNIQSxTQTlCS0EsZUFBZUEsQ0E4QlJBLFdBQStCQSxFQUFFQSxVQUFlQSxFQUFFQSxRQUE0QkE7UUFBNUJDLHdCQUE0QkEsR0FBNUJBLGVBQTRCQTtRQUV6RkEsaUJBQU9BLENBQUNBO1FBRVJBLElBQUlBLENBQUNBLFlBQVlBLEdBQUdBLFVBQVVBLENBQUNBO1FBQy9CQSxJQUFJQSxDQUFDQSxZQUFZQSxHQUFHQSxXQUFXQSxDQUFDQTtRQUNoQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsUUFBUUEsQ0FBQ0E7SUFDMUJBLENBQUNBO0lBMUJERCxzQkFBV0Esc0NBQVNBO1FBSHBCQTs7V0FFR0E7YUFDSEE7WUFFQ0UsTUFBTUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsU0FBU0EsQ0FBQ0E7UUFDbENBLENBQUNBOzs7T0FBQUY7SUFLREEsc0JBQVdBLHdDQUFXQTtRQUh0QkE7O1dBRUdBO2FBQ0hBO1lBRUNHLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBO1FBQzFCQSxDQUFDQTs7O09BQUFIO0lBaUJEQTs7T0FFR0E7SUFDSUEsaUNBQU9BLEdBQWRBO1FBRUNJLGdCQUFLQSxDQUFDQSxPQUFPQSxXQUFFQSxDQUFDQTtJQUNqQkEsQ0FBQ0E7SUFFTUosNkNBQW1CQSxHQUExQkEsVUFBMkJBLFlBQTBCQTtRQUVwREssWUFBWUEsQ0FBQ0Esb0JBQW9CQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtJQUN6Q0EsQ0FBQ0E7SUFoRGFMLHlCQUFTQSxHQUFVQSx5QkFBeUJBLENBQUNBO0lBRTdDQSw0QkFBWUEsR0FBVUEsbUJBQW1CQSxDQUFDQSxTQUFTQSxDQUFDQTtJQStDbkVBLHNCQUFDQTtBQUFEQSxDQW5EQSxBQW1EQ0EsRUFuRDZCLFdBQVcsRUFtRHhDO0FBRUQsQUFBeUIsaUJBQWhCLGVBQWUsQ0FBQyIsImZpbGUiOiJiYXNlL1RyaWFuZ2xlU3ViTWVzaC5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVHJpYW5nbGVTdWJHZW9tZXRyeVx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZGF0YS9UcmlhbmdsZVN1Ykdlb21ldHJ5XCIpO1xyXG5cclxuaW1wb3J0IElTdWJNZXNoXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0lTdWJNZXNoXCIpO1xyXG5pbXBvcnQgU3ViTWVzaEJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL1N1Yk1lc2hCYXNlXCIpO1xyXG5pbXBvcnQgSVJlbmRlcmVyUG9vbFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wb29sL0lSZW5kZXJlclBvb2xcIik7XHJcbmltcG9ydCBTdWJNZXNoUG9vbFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3Bvb2wvU3ViTWVzaFBvb2xcIik7XHJcbmltcG9ydCBNZXNoXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2VudGl0aWVzL01lc2hcIik7XHJcbmltcG9ydCBNYXRlcmlhbEJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9tYXRlcmlhbHMvTWF0ZXJpYWxCYXNlXCIpO1xyXG5cclxuLyoqXHJcbiAqIFRyaWFuZ2xlU3ViTWVzaCB3cmFwcyBhIFRyaWFuZ2xlU3ViR2VvbWV0cnkgYXMgYSBzY2VuZSBncmFwaCBpbnN0YW50aWF0aW9uLiBBIFRyaWFuZ2xlU3ViTWVzaCBpcyBvd25lZCBieSBhIE1lc2ggb2JqZWN0LlxyXG4gKlxyXG4gKlxyXG4gKiBAc2VlIGF3YXkuYmFzZS5UcmlhbmdsZVN1Ykdlb21ldHJ5XHJcbiAqIEBzZWUgYXdheS5lbnRpdGllcy5NZXNoXHJcbiAqXHJcbiAqIEBjbGFzcyBhd2F5LmJhc2UuVHJpYW5nbGVTdWJNZXNoXHJcbiAqL1xyXG5jbGFzcyBUcmlhbmdsZVN1Yk1lc2ggZXh0ZW5kcyBTdWJNZXNoQmFzZSBpbXBsZW1lbnRzIElTdWJNZXNoXHJcbntcclxuXHRwdWJsaWMgc3RhdGljIGFzc2V0VHlwZTpzdHJpbmcgPSBcIlthc3NldCBUcmlhbmdsZVN1Yk1lc2hdXCI7XHJcblxyXG5cdHB1YmxpYyBzdGF0aWMgZ2VvbWV0cnlUeXBlOnN0cmluZyA9IFRyaWFuZ2xlU3ViR2VvbWV0cnkuYXNzZXRUeXBlO1xyXG5cclxuXHRwcml2YXRlIF9zdWJHZW9tZXRyeTpUcmlhbmdsZVN1Ykdlb21ldHJ5O1xyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgYXNzZXRUeXBlKCk6c3RyaW5nXHJcblx0e1xyXG5cdFx0cmV0dXJuIFRyaWFuZ2xlU3ViTWVzaC5hc3NldFR5cGU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgVHJpYW5nbGVTdWJHZW9tZXRyeSBvYmplY3Qgd2hpY2ggcHJvdmlkZXMgdGhlIGdlb21ldHJ5IGRhdGEgZm9yIHRoaXMgVHJpYW5nbGVTdWJNZXNoLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgc3ViR2VvbWV0cnkoKTpUcmlhbmdsZVN1Ykdlb21ldHJ5XHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3N1Ykdlb21ldHJ5O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhIG5ldyBUcmlhbmdsZVN1Yk1lc2ggb2JqZWN0XHJcblx0ICogQHBhcmFtIHN1Ykdlb21ldHJ5IFRoZSBUcmlhbmdsZVN1Ykdlb21ldHJ5IG9iamVjdCB3aGljaCBwcm92aWRlcyB0aGUgZ2VvbWV0cnkgZGF0YSBmb3IgdGhpcyBUcmlhbmdsZVN1Yk1lc2guXHJcblx0ICogQHBhcmFtIHBhcmVudE1lc2ggVGhlIE1lc2ggb2JqZWN0IHRvIHdoaWNoIHRoaXMgVHJpYW5nbGVTdWJNZXNoIGJlbG9uZ3MuXHJcblx0ICogQHBhcmFtIG1hdGVyaWFsIEFuIG9wdGlvbmFsIG1hdGVyaWFsIHVzZWQgdG8gcmVuZGVyIHRoaXMgVHJpYW5nbGVTdWJNZXNoLlxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKHN1Ykdlb21ldHJ5OlRyaWFuZ2xlU3ViR2VvbWV0cnksIHBhcmVudE1lc2g6TWVzaCwgbWF0ZXJpYWw6TWF0ZXJpYWxCYXNlID0gbnVsbClcclxuXHR7XHJcblx0XHRzdXBlcigpO1xyXG5cclxuXHRcdHRoaXMuX3BQYXJlbnRNZXNoID0gcGFyZW50TWVzaDtcclxuXHRcdHRoaXMuX3N1Ykdlb21ldHJ5ID0gc3ViR2VvbWV0cnk7XHJcblx0XHR0aGlzLm1hdGVyaWFsID0gbWF0ZXJpYWw7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBkaXNwb3NlKClcclxuXHR7XHJcblx0XHRzdXBlci5kaXNwb3NlKCk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgX2lDb2xsZWN0UmVuZGVyYWJsZShyZW5kZXJlclBvb2w6SVJlbmRlcmVyUG9vbClcclxuXHR7XHJcblx0XHRyZW5kZXJlclBvb2wuYXBwbHlUcmlhbmdsZVN1Yk1lc2godGhpcyk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgPSBUcmlhbmdsZVN1Yk1lc2g7Il19