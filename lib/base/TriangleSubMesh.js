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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL1RyaWFuZ2xlU3ViTWVzaC50cyJdLCJuYW1lcyI6WyJUcmlhbmdsZVN1Yk1lc2giLCJUcmlhbmdsZVN1Yk1lc2guY29uc3RydWN0b3IiLCJUcmlhbmdsZVN1Yk1lc2guYXNzZXRUeXBlIiwiVHJpYW5nbGVTdWJNZXNoLnN1Ykdlb21ldHJ5IiwiVHJpYW5nbGVTdWJNZXNoLmRpc3Bvc2UiLCJUcmlhbmdsZVN1Yk1lc2guX2lDb2xsZWN0UmVuZGVyYWJsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTyxTQUFTLFdBQWMsbUNBQW1DLENBQUMsQ0FBQztBQUVuRSxJQUFPLFdBQVcsV0FBYyxxQ0FBcUMsQ0FBQyxDQUFDO0FBT3ZFLEFBU0E7Ozs7Ozs7O0dBREc7SUFDRyxlQUFlO0lBQVNBLFVBQXhCQSxlQUFlQSxVQUFvQkE7SUFvQnhDQTs7Ozs7T0FLR0E7SUFDSEEsU0ExQktBLGVBQWVBLENBMEJSQSxXQUErQkEsRUFBRUEsVUFBZUEsRUFBRUEsUUFBNEJBO1FBQTVCQyx3QkFBNEJBLEdBQTVCQSxlQUE0QkE7UUFFekZBLGlCQUFPQSxDQUFDQTtRQUVSQSxJQUFJQSxDQUFDQSxZQUFZQSxHQUFHQSxVQUFVQSxDQUFDQTtRQUMvQkEsSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsV0FBV0EsQ0FBQ0E7UUFDaENBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLFFBQVFBLENBQUNBO0lBQzFCQSxDQUFDQTtJQTFCREQsc0JBQVdBLHNDQUFTQTtRQUhwQkE7O1dBRUdBO2FBQ0hBO1lBRUNFLE1BQU1BLENBQUNBLFNBQVNBLENBQUNBLGlCQUFpQkEsQ0FBQ0E7UUFDcENBLENBQUNBOzs7T0FBQUY7SUFLREEsc0JBQVdBLHdDQUFXQTtRQUh0QkE7O1dBRUdBO2FBQ0hBO1lBRUNHLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBO1FBQzFCQSxDQUFDQTs7O09BQUFIO0lBaUJEQTs7T0FFR0E7SUFDSUEsaUNBQU9BLEdBQWRBO1FBRUNJLGdCQUFLQSxDQUFDQSxPQUFPQSxXQUFFQSxDQUFDQTtJQUNqQkEsQ0FBQ0E7SUFFTUosNkNBQW1CQSxHQUExQkEsVUFBMkJBLFlBQTBCQTtRQUVwREssWUFBWUEsQ0FBQ0Esb0JBQW9CQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtJQUN6Q0EsQ0FBQ0E7SUFDRkwsc0JBQUNBO0FBQURBLENBL0NBLEFBK0NDQSxFQS9DNkIsV0FBVyxFQStDeEM7QUFFRCxBQUF5QixpQkFBaEIsZUFBZSxDQUFDIiwiZmlsZSI6ImJhc2UvVHJpYW5nbGVTdWJNZXNoLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBc3NldFR5cGVcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0Fzc2V0VHlwZVwiKTtcbmltcG9ydCBJU3ViTWVzaFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9JU3ViTWVzaFwiKTtcbmltcG9ydCBTdWJNZXNoQmFzZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvU3ViTWVzaEJhc2VcIik7XG5pbXBvcnQgVHJpYW5nbGVTdWJHZW9tZXRyeVx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9UcmlhbmdsZVN1Ykdlb21ldHJ5XCIpO1xuXG5pbXBvcnQgSVJlbmRlcmVyUG9vbFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wb29sL0lSZW5kZXJlclBvb2xcIik7XG5pbXBvcnQgTWVzaFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9NZXNoXCIpO1xuaW1wb3J0IE1hdGVyaWFsQmFzZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL21hdGVyaWFscy9NYXRlcmlhbEJhc2VcIik7XG5cbi8qKlxuICogVHJpYW5nbGVTdWJNZXNoIHdyYXBzIGEgVHJpYW5nbGVTdWJHZW9tZXRyeSBhcyBhIHNjZW5lIGdyYXBoIGluc3RhbnRpYXRpb24uIEEgVHJpYW5nbGVTdWJNZXNoIGlzIG93bmVkIGJ5IGEgTWVzaCBvYmplY3QuXG4gKlxuICpcbiAqIEBzZWUgYXdheS5iYXNlLlRyaWFuZ2xlU3ViR2VvbWV0cnlcbiAqIEBzZWUgYXdheS5lbnRpdGllcy5NZXNoXG4gKlxuICogQGNsYXNzIGF3YXkuYmFzZS5UcmlhbmdsZVN1Yk1lc2hcbiAqL1xuY2xhc3MgVHJpYW5nbGVTdWJNZXNoIGV4dGVuZHMgU3ViTWVzaEJhc2UgaW1wbGVtZW50cyBJU3ViTWVzaFxue1xuXHRwcml2YXRlIF9zdWJHZW9tZXRyeTpUcmlhbmdsZVN1Ykdlb21ldHJ5O1xuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBhc3NldFR5cGUoKTpzdHJpbmdcblx0e1xuXHRcdHJldHVybiBBc3NldFR5cGUuVFJJQU5HTEVfU1VCX01FU0g7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIFRyaWFuZ2xlU3ViR2VvbWV0cnkgb2JqZWN0IHdoaWNoIHByb3ZpZGVzIHRoZSBnZW9tZXRyeSBkYXRhIGZvciB0aGlzIFRyaWFuZ2xlU3ViTWVzaC5cblx0ICovXG5cdHB1YmxpYyBnZXQgc3ViR2VvbWV0cnkoKTpUcmlhbmdsZVN1Ykdlb21ldHJ5XG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fc3ViR2VvbWV0cnk7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlcyBhIG5ldyBUcmlhbmdsZVN1Yk1lc2ggb2JqZWN0XG5cdCAqIEBwYXJhbSBzdWJHZW9tZXRyeSBUaGUgVHJpYW5nbGVTdWJHZW9tZXRyeSBvYmplY3Qgd2hpY2ggcHJvdmlkZXMgdGhlIGdlb21ldHJ5IGRhdGEgZm9yIHRoaXMgVHJpYW5nbGVTdWJNZXNoLlxuXHQgKiBAcGFyYW0gcGFyZW50TWVzaCBUaGUgTWVzaCBvYmplY3QgdG8gd2hpY2ggdGhpcyBUcmlhbmdsZVN1Yk1lc2ggYmVsb25ncy5cblx0ICogQHBhcmFtIG1hdGVyaWFsIEFuIG9wdGlvbmFsIG1hdGVyaWFsIHVzZWQgdG8gcmVuZGVyIHRoaXMgVHJpYW5nbGVTdWJNZXNoLlxuXHQgKi9cblx0Y29uc3RydWN0b3Ioc3ViR2VvbWV0cnk6VHJpYW5nbGVTdWJHZW9tZXRyeSwgcGFyZW50TWVzaDpNZXNoLCBtYXRlcmlhbDpNYXRlcmlhbEJhc2UgPSBudWxsKVxuXHR7XG5cdFx0c3VwZXIoKTtcblxuXHRcdHRoaXMuX3BQYXJlbnRNZXNoID0gcGFyZW50TWVzaDtcblx0XHR0aGlzLl9zdWJHZW9tZXRyeSA9IHN1Ykdlb21ldHJ5O1xuXHRcdHRoaXMubWF0ZXJpYWwgPSBtYXRlcmlhbDtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGRpc3Bvc2UoKVxuXHR7XG5cdFx0c3VwZXIuZGlzcG9zZSgpO1xuXHR9XG5cblx0cHVibGljIF9pQ29sbGVjdFJlbmRlcmFibGUocmVuZGVyZXJQb29sOklSZW5kZXJlclBvb2wpXG5cdHtcblx0XHRyZW5kZXJlclBvb2wuYXBwbHlUcmlhbmdsZVN1Yk1lc2godGhpcyk7XG5cdH1cbn1cblxuZXhwb3J0ID0gVHJpYW5nbGVTdWJNZXNoOyJdfQ==