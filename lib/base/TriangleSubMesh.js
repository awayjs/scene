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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL1RyaWFuZ2xlU3ViTWVzaC50cyJdLCJuYW1lcyI6WyJUcmlhbmdsZVN1Yk1lc2giLCJUcmlhbmdsZVN1Yk1lc2guY29uc3RydWN0b3IiLCJUcmlhbmdsZVN1Yk1lc2guYXNzZXRUeXBlIiwiVHJpYW5nbGVTdWJNZXNoLnN1Ykdlb21ldHJ5IiwiVHJpYW5nbGVTdWJNZXNoLmRpc3Bvc2UiLCJUcmlhbmdsZVN1Yk1lc2guX2lDb2xsZWN0UmVuZGVyYWJsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsSUFBTyxTQUFTLFdBQWMsbUNBQW1DLENBQUMsQ0FBQztBQUduRSxJQUFPLFdBQVcsV0FBYyxxQ0FBcUMsQ0FBQyxDQUFDO0FBTXZFLEFBU0E7Ozs7Ozs7O0dBREc7SUFDRyxlQUFlO0lBQVNBLFVBQXhCQSxlQUFlQSxVQUFvQkE7SUFvQnhDQTs7Ozs7T0FLR0E7SUFDSEEsU0ExQktBLGVBQWVBLENBMEJSQSxXQUErQkEsRUFBRUEsVUFBZUEsRUFBRUEsUUFBNEJBO1FBQTVCQyx3QkFBNEJBLEdBQTVCQSxlQUE0QkE7UUFFekZBLGlCQUFPQSxDQUFDQTtRQUVSQSxJQUFJQSxDQUFDQSxZQUFZQSxHQUFHQSxVQUFVQSxDQUFDQTtRQUMvQkEsSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsV0FBV0EsQ0FBQ0E7UUFDaENBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLFFBQVFBLENBQUNBO0lBQzFCQSxDQUFDQTtJQTFCREQsc0JBQVdBLHNDQUFTQTtRQUhwQkE7O1dBRUdBO2FBQ0hBO1lBRUNFLE1BQU1BLENBQUNBLFNBQVNBLENBQUNBLGlCQUFpQkEsQ0FBQ0E7UUFDcENBLENBQUNBOzs7T0FBQUY7SUFLREEsc0JBQVdBLHdDQUFXQTtRQUh0QkE7O1dBRUdBO2FBQ0hBO1lBRUNHLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBO1FBQzFCQSxDQUFDQTs7O09BQUFIO0lBaUJEQTs7T0FFR0E7SUFDSUEsaUNBQU9BLEdBQWRBO1FBRUNJLGdCQUFLQSxDQUFDQSxPQUFPQSxXQUFFQSxDQUFDQTtJQUNqQkEsQ0FBQ0E7SUFFTUosNkNBQW1CQSxHQUExQkEsVUFBMkJBLFlBQTBCQTtRQUVwREssWUFBWUEsQ0FBQ0Esb0JBQW9CQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtJQUN6Q0EsQ0FBQ0E7SUFDRkwsc0JBQUNBO0FBQURBLENBL0NBLEFBK0NDQSxFQS9DNkIsV0FBVyxFQStDeEM7QUFFRCxBQUF5QixpQkFBaEIsZUFBZSxDQUFDIiwiZmlsZSI6ImJhc2UvVHJpYW5nbGVTdWJNZXNoLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUcmlhbmdsZVN1Ykdlb21ldHJ5XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9kYXRhL1RyaWFuZ2xlU3ViR2VvbWV0cnlcIik7XHJcbmltcG9ydCBBc3NldFR5cGVcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0Fzc2V0VHlwZVwiKTtcclxuXHJcbmltcG9ydCBJU3ViTWVzaFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9JU3ViTWVzaFwiKTtcclxuaW1wb3J0IFN1Yk1lc2hCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9TdWJNZXNoQmFzZVwiKTtcclxuaW1wb3J0IElSZW5kZXJlclBvb2xcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcG9vbC9JUmVuZGVyZXJQb29sXCIpO1xyXG5pbXBvcnQgU3ViTWVzaFBvb2xcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wb29sL1N1Yk1lc2hQb29sXCIpO1xyXG5pbXBvcnQgTWVzaFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9NZXNoXCIpO1xyXG5pbXBvcnQgTWF0ZXJpYWxCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvbWF0ZXJpYWxzL01hdGVyaWFsQmFzZVwiKTtcclxuXHJcbi8qKlxyXG4gKiBUcmlhbmdsZVN1Yk1lc2ggd3JhcHMgYSBUcmlhbmdsZVN1Ykdlb21ldHJ5IGFzIGEgc2NlbmUgZ3JhcGggaW5zdGFudGlhdGlvbi4gQSBUcmlhbmdsZVN1Yk1lc2ggaXMgb3duZWQgYnkgYSBNZXNoIG9iamVjdC5cclxuICpcclxuICpcclxuICogQHNlZSBhd2F5LmJhc2UuVHJpYW5nbGVTdWJHZW9tZXRyeVxyXG4gKiBAc2VlIGF3YXkuZW50aXRpZXMuTWVzaFxyXG4gKlxyXG4gKiBAY2xhc3MgYXdheS5iYXNlLlRyaWFuZ2xlU3ViTWVzaFxyXG4gKi9cclxuY2xhc3MgVHJpYW5nbGVTdWJNZXNoIGV4dGVuZHMgU3ViTWVzaEJhc2UgaW1wbGVtZW50cyBJU3ViTWVzaFxyXG57XHJcblx0cHJpdmF0ZSBfc3ViR2VvbWV0cnk6VHJpYW5nbGVTdWJHZW9tZXRyeTtcclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGFzc2V0VHlwZSgpOnN0cmluZ1xyXG5cdHtcclxuXHRcdHJldHVybiBBc3NldFR5cGUuVFJJQU5HTEVfU1VCX01FU0g7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgVHJpYW5nbGVTdWJHZW9tZXRyeSBvYmplY3Qgd2hpY2ggcHJvdmlkZXMgdGhlIGdlb21ldHJ5IGRhdGEgZm9yIHRoaXMgVHJpYW5nbGVTdWJNZXNoLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgc3ViR2VvbWV0cnkoKTpUcmlhbmdsZVN1Ykdlb21ldHJ5XHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3N1Ykdlb21ldHJ5O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhIG5ldyBUcmlhbmdsZVN1Yk1lc2ggb2JqZWN0XHJcblx0ICogQHBhcmFtIHN1Ykdlb21ldHJ5IFRoZSBUcmlhbmdsZVN1Ykdlb21ldHJ5IG9iamVjdCB3aGljaCBwcm92aWRlcyB0aGUgZ2VvbWV0cnkgZGF0YSBmb3IgdGhpcyBUcmlhbmdsZVN1Yk1lc2guXHJcblx0ICogQHBhcmFtIHBhcmVudE1lc2ggVGhlIE1lc2ggb2JqZWN0IHRvIHdoaWNoIHRoaXMgVHJpYW5nbGVTdWJNZXNoIGJlbG9uZ3MuXHJcblx0ICogQHBhcmFtIG1hdGVyaWFsIEFuIG9wdGlvbmFsIG1hdGVyaWFsIHVzZWQgdG8gcmVuZGVyIHRoaXMgVHJpYW5nbGVTdWJNZXNoLlxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKHN1Ykdlb21ldHJ5OlRyaWFuZ2xlU3ViR2VvbWV0cnksIHBhcmVudE1lc2g6TWVzaCwgbWF0ZXJpYWw6TWF0ZXJpYWxCYXNlID0gbnVsbClcclxuXHR7XHJcblx0XHRzdXBlcigpO1xyXG5cclxuXHRcdHRoaXMuX3BQYXJlbnRNZXNoID0gcGFyZW50TWVzaDtcclxuXHRcdHRoaXMuX3N1Ykdlb21ldHJ5ID0gc3ViR2VvbWV0cnk7XHJcblx0XHR0aGlzLm1hdGVyaWFsID0gbWF0ZXJpYWw7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBkaXNwb3NlKClcclxuXHR7XHJcblx0XHRzdXBlci5kaXNwb3NlKCk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgX2lDb2xsZWN0UmVuZGVyYWJsZShyZW5kZXJlclBvb2w6SVJlbmRlcmVyUG9vbClcclxuXHR7XHJcblx0XHRyZW5kZXJlclBvb2wuYXBwbHlUcmlhbmdsZVN1Yk1lc2godGhpcyk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgPSBUcmlhbmdsZVN1Yk1lc2g7Il19