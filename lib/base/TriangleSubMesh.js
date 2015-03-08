var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AssetType = require("awayjs-core/lib/library/AssetType");
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
            return AssetType.TRIANGLE_SUB_MESH;
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
    return TriangleSubMesh;
})(SubMeshBase);
module.exports = TriangleSubMesh;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL1RyaWFuZ2xlU3ViTWVzaC50cyJdLCJuYW1lcyI6WyJUcmlhbmdsZVN1Yk1lc2giLCJUcmlhbmdsZVN1Yk1lc2guY29uc3RydWN0b3IiLCJUcmlhbmdsZVN1Yk1lc2guYXNzZXRUeXBlIiwiVHJpYW5nbGVTdWJNZXNoLnN1Ykdlb21ldHJ5IiwiVHJpYW5nbGVTdWJNZXNoLmRpc3Bvc2UiLCJUcmlhbmdsZVN1Yk1lc2guX2lDb2xsZWN0UmVuZGVyYWJsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsSUFBTyxTQUFTLFdBQWMsbUNBQW1DLENBQUMsQ0FBQztBQUduRSxJQUFPLFdBQVcsV0FBYyxxQ0FBcUMsQ0FBQyxDQUFDO0FBTXZFLEFBU0E7Ozs7Ozs7O0dBREc7SUFDRyxlQUFlO0lBQVNBLFVBQXhCQSxlQUFlQSxVQUFvQkE7SUFvQnhDQTs7Ozs7T0FLR0E7SUFDSEEsU0ExQktBLGVBQWVBLENBMEJSQSxXQUErQkEsRUFBRUEsVUFBZUEsRUFBRUEsUUFBNEJBO1FBQTVCQyx3QkFBNEJBLEdBQTVCQSxlQUE0QkE7UUFFekZBLGlCQUFPQSxDQUFDQTtRQUVSQSxJQUFJQSxDQUFDQSxZQUFZQSxHQUFHQSxVQUFVQSxDQUFDQTtRQUMvQkEsSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsV0FBV0EsQ0FBQ0E7UUFDaENBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLFFBQVFBLENBQUNBO0lBQzFCQSxDQUFDQTtJQTFCREQsc0JBQVdBLHNDQUFTQTtRQUhwQkE7O1dBRUdBO2FBQ0hBO1lBRUNFLE1BQU1BLENBQUNBLFNBQVNBLENBQUNBLGlCQUFpQkEsQ0FBQ0E7UUFDcENBLENBQUNBOzs7T0FBQUY7SUFLREEsc0JBQVdBLHdDQUFXQTtRQUh0QkE7O1dBRUdBO2FBQ0hBO1lBRUNHLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBO1FBQzFCQSxDQUFDQTs7O09BQUFIO0lBaUJEQTs7T0FFR0E7SUFDSUEsaUNBQU9BLEdBQWRBO1FBRUNJLGdCQUFLQSxDQUFDQSxPQUFPQSxXQUFFQSxDQUFDQTtJQUNqQkEsQ0FBQ0E7SUFFTUosNkNBQW1CQSxHQUExQkEsVUFBMkJBLFlBQTBCQTtRQUVwREssWUFBWUEsQ0FBQ0Esb0JBQW9CQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtJQUN6Q0EsQ0FBQ0E7SUFDRkwsc0JBQUNBO0FBQURBLENBL0NBLEFBK0NDQSxFQS9DNkIsV0FBVyxFQStDeEM7QUFFRCxBQUF5QixpQkFBaEIsZUFBZSxDQUFDIiwiZmlsZSI6ImJhc2UvVHJpYW5nbGVTdWJNZXNoLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUcmlhbmdsZVN1Ykdlb21ldHJ5XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9kYXRhL1RyaWFuZ2xlU3ViR2VvbWV0cnlcIik7XG5pbXBvcnQgQXNzZXRUeXBlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9Bc3NldFR5cGVcIik7XG5cbmltcG9ydCBJU3ViTWVzaFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9JU3ViTWVzaFwiKTtcbmltcG9ydCBTdWJNZXNoQmFzZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvU3ViTWVzaEJhc2VcIik7XG5pbXBvcnQgSVJlbmRlcmVyUG9vbFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wb29sL0lSZW5kZXJlclBvb2xcIik7XG5pbXBvcnQgU3ViTWVzaFBvb2xcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wb29sL1N1Yk1lc2hQb29sXCIpO1xuaW1wb3J0IE1lc2hcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZW50aXRpZXMvTWVzaFwiKTtcbmltcG9ydCBNYXRlcmlhbEJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9tYXRlcmlhbHMvTWF0ZXJpYWxCYXNlXCIpO1xuXG4vKipcbiAqIFRyaWFuZ2xlU3ViTWVzaCB3cmFwcyBhIFRyaWFuZ2xlU3ViR2VvbWV0cnkgYXMgYSBzY2VuZSBncmFwaCBpbnN0YW50aWF0aW9uLiBBIFRyaWFuZ2xlU3ViTWVzaCBpcyBvd25lZCBieSBhIE1lc2ggb2JqZWN0LlxuICpcbiAqXG4gKiBAc2VlIGF3YXkuYmFzZS5UcmlhbmdsZVN1Ykdlb21ldHJ5XG4gKiBAc2VlIGF3YXkuZW50aXRpZXMuTWVzaFxuICpcbiAqIEBjbGFzcyBhd2F5LmJhc2UuVHJpYW5nbGVTdWJNZXNoXG4gKi9cbmNsYXNzIFRyaWFuZ2xlU3ViTWVzaCBleHRlbmRzIFN1Yk1lc2hCYXNlIGltcGxlbWVudHMgSVN1Yk1lc2hcbntcblx0cHJpdmF0ZSBfc3ViR2VvbWV0cnk6VHJpYW5nbGVTdWJHZW9tZXRyeTtcblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgYXNzZXRUeXBlKCk6c3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gQXNzZXRUeXBlLlRSSUFOR0xFX1NVQl9NRVNIO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBUcmlhbmdsZVN1Ykdlb21ldHJ5IG9iamVjdCB3aGljaCBwcm92aWRlcyB0aGUgZ2VvbWV0cnkgZGF0YSBmb3IgdGhpcyBUcmlhbmdsZVN1Yk1lc2guXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHN1Ykdlb21ldHJ5KCk6VHJpYW5nbGVTdWJHZW9tZXRyeVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3N1Ykdlb21ldHJ5O1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBuZXcgVHJpYW5nbGVTdWJNZXNoIG9iamVjdFxuXHQgKiBAcGFyYW0gc3ViR2VvbWV0cnkgVGhlIFRyaWFuZ2xlU3ViR2VvbWV0cnkgb2JqZWN0IHdoaWNoIHByb3ZpZGVzIHRoZSBnZW9tZXRyeSBkYXRhIGZvciB0aGlzIFRyaWFuZ2xlU3ViTWVzaC5cblx0ICogQHBhcmFtIHBhcmVudE1lc2ggVGhlIE1lc2ggb2JqZWN0IHRvIHdoaWNoIHRoaXMgVHJpYW5nbGVTdWJNZXNoIGJlbG9uZ3MuXG5cdCAqIEBwYXJhbSBtYXRlcmlhbCBBbiBvcHRpb25hbCBtYXRlcmlhbCB1c2VkIHRvIHJlbmRlciB0aGlzIFRyaWFuZ2xlU3ViTWVzaC5cblx0ICovXG5cdGNvbnN0cnVjdG9yKHN1Ykdlb21ldHJ5OlRyaWFuZ2xlU3ViR2VvbWV0cnksIHBhcmVudE1lc2g6TWVzaCwgbWF0ZXJpYWw6TWF0ZXJpYWxCYXNlID0gbnVsbClcblx0e1xuXHRcdHN1cGVyKCk7XG5cblx0XHR0aGlzLl9wUGFyZW50TWVzaCA9IHBhcmVudE1lc2g7XG5cdFx0dGhpcy5fc3ViR2VvbWV0cnkgPSBzdWJHZW9tZXRyeTtcblx0XHR0aGlzLm1hdGVyaWFsID0gbWF0ZXJpYWw7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBkaXNwb3NlKClcblx0e1xuXHRcdHN1cGVyLmRpc3Bvc2UoKTtcblx0fVxuXG5cdHB1YmxpYyBfaUNvbGxlY3RSZW5kZXJhYmxlKHJlbmRlcmVyUG9vbDpJUmVuZGVyZXJQb29sKVxuXHR7XG5cdFx0cmVuZGVyZXJQb29sLmFwcGx5VHJpYW5nbGVTdWJNZXNoKHRoaXMpO1xuXHR9XG59XG5cbmV4cG9ydCA9IFRyaWFuZ2xlU3ViTWVzaDsiXX0=