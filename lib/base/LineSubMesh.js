var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AssetType = require("awayjs-core/lib/library/AssetType");
var SubMeshBase = require("awayjs-display/lib/base/SubMeshBase");
/**
 * LineSubMesh wraps a LineSubGeometry as a scene graph instantiation. A LineSubMesh is owned by a Mesh object.
 *
 *
 * @see away.base.LineSubGeometry
 * @see away.entities.Mesh
 *
 * @class away.base.LineSubMesh
 */
var LineSubMesh = (function (_super) {
    __extends(LineSubMesh, _super);
    /**
     * Creates a new LineSubMesh object
     * @param subGeometry The LineSubGeometry object which provides the geometry data for this LineSubMesh.
     * @param parentMesh The Mesh object to which this LineSubMesh belongs.
     * @param material An optional material used to render this LineSubMesh.
     */
    function LineSubMesh(subGeometry, parentMesh, material) {
        if (material === void 0) { material = null; }
        _super.call(this);
        this._pParentMesh = parentMesh;
        this._subGeometry = subGeometry;
        this.material = material;
    }
    Object.defineProperty(LineSubMesh.prototype, "assetType", {
        /**
         *
         */
        get: function () {
            return AssetType.LINE_SUB_MESH;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineSubMesh.prototype, "subGeometry", {
        /**
         * The LineSubGeometry object which provides the geometry data for this LineSubMesh.
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
    LineSubMesh.prototype.dispose = function () {
        this.material = null;
        _super.prototype.dispose.call(this);
    };
    LineSubMesh.prototype._iCollectRenderable = function (renderer) {
        renderer.applyLineSubMesh(this);
    };
    return LineSubMesh;
})(SubMeshBase);
module.exports = LineSubMesh;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0xpbmVTdWJNZXNoLnRzIl0sIm5hbWVzIjpbIkxpbmVTdWJNZXNoIiwiTGluZVN1Yk1lc2guY29uc3RydWN0b3IiLCJMaW5lU3ViTWVzaC5hc3NldFR5cGUiLCJMaW5lU3ViTWVzaC5zdWJHZW9tZXRyeSIsIkxpbmVTdWJNZXNoLmRpc3Bvc2UiLCJMaW5lU3ViTWVzaC5faUNvbGxlY3RSZW5kZXJhYmxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFPLFNBQVMsV0FBYyxtQ0FBbUMsQ0FBQyxDQUFDO0FBSW5FLElBQU8sV0FBVyxXQUFjLHFDQUFxQyxDQUFDLENBQUM7QUFLdkUsQUFTQTs7Ozs7Ozs7R0FERztJQUNHLFdBQVc7SUFBU0EsVUFBcEJBLFdBQVdBLFVBQW9CQTtJQW9CcENBOzs7OztPQUtHQTtJQUNIQSxTQTFCS0EsV0FBV0EsQ0EwQkpBLFdBQTJCQSxFQUFFQSxVQUFlQSxFQUFFQSxRQUE0QkE7UUFBNUJDLHdCQUE0QkEsR0FBNUJBLGVBQTRCQTtRQUVyRkEsaUJBQU9BLENBQUNBO1FBRVJBLElBQUlBLENBQUNBLFlBQVlBLEdBQUdBLFVBQVVBLENBQUNBO1FBQy9CQSxJQUFJQSxDQUFDQSxZQUFZQSxHQUFHQSxXQUFXQSxDQUFDQTtRQUNoQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsUUFBUUEsQ0FBQ0E7SUFDMUJBLENBQUNBO0lBMUJERCxzQkFBV0Esa0NBQVNBO1FBSHBCQTs7V0FFR0E7YUFDSEE7WUFFQ0UsTUFBTUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsYUFBYUEsQ0FBQ0E7UUFDaENBLENBQUNBOzs7T0FBQUY7SUFLREEsc0JBQVdBLG9DQUFXQTtRQUh0QkE7O1dBRUdBO2FBQ0hBO1lBRUNHLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBO1FBQzFCQSxDQUFDQTs7O09BQUFIO0lBaUJEQTs7T0FFR0E7SUFDSUEsNkJBQU9BLEdBQWRBO1FBRUNJLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLElBQUlBLENBQUNBO1FBRXJCQSxnQkFBS0EsQ0FBQ0EsT0FBT0EsV0FBRUEsQ0FBQ0E7SUFDakJBLENBQUNBO0lBRU1KLHlDQUFtQkEsR0FBMUJBLFVBQTJCQSxRQUFrQkE7UUFFNUNLLFFBQVFBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7SUFDakNBLENBQUNBO0lBQ0ZMLGtCQUFDQTtBQUFEQSxDQWpEQSxBQWlEQ0EsRUFqRHlCLFdBQVcsRUFpRHBDO0FBRUQsQUFBcUIsaUJBQVosV0FBVyxDQUFDIiwiZmlsZSI6ImJhc2UvTGluZVN1Yk1lc2guanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFzc2V0VHlwZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvQXNzZXRUeXBlXCIpO1xuXG5pbXBvcnQgSVN1Yk1lc2hcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvSVN1Yk1lc2hcIik7XG5pbXBvcnQgTGluZVN1Ykdlb21ldHJ5XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvTGluZVN1Ykdlb21ldHJ5XCIpO1xuaW1wb3J0IFN1Yk1lc2hCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9TdWJNZXNoQmFzZVwiKTtcbmltcG9ydCBJUmVuZGVyZXJcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9yZW5kZXIvSVJlbmRlcmVyXCIpO1xuaW1wb3J0IE1lc2hcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZW50aXRpZXMvTWVzaFwiKTtcbmltcG9ydCBNYXRlcmlhbEJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9tYXRlcmlhbHMvTWF0ZXJpYWxCYXNlXCIpO1xuXG4vKipcbiAqIExpbmVTdWJNZXNoIHdyYXBzIGEgTGluZVN1Ykdlb21ldHJ5IGFzIGEgc2NlbmUgZ3JhcGggaW5zdGFudGlhdGlvbi4gQSBMaW5lU3ViTWVzaCBpcyBvd25lZCBieSBhIE1lc2ggb2JqZWN0LlxuICpcbiAqXG4gKiBAc2VlIGF3YXkuYmFzZS5MaW5lU3ViR2VvbWV0cnlcbiAqIEBzZWUgYXdheS5lbnRpdGllcy5NZXNoXG4gKlxuICogQGNsYXNzIGF3YXkuYmFzZS5MaW5lU3ViTWVzaFxuICovXG5jbGFzcyBMaW5lU3ViTWVzaCBleHRlbmRzIFN1Yk1lc2hCYXNlIGltcGxlbWVudHMgSVN1Yk1lc2hcbntcblx0cHJpdmF0ZSBfc3ViR2VvbWV0cnk6TGluZVN1Ykdlb21ldHJ5O1xuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBhc3NldFR5cGUoKTpzdHJpbmdcblx0e1xuXHRcdHJldHVybiBBc3NldFR5cGUuTElORV9TVUJfTUVTSDtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgTGluZVN1Ykdlb21ldHJ5IG9iamVjdCB3aGljaCBwcm92aWRlcyB0aGUgZ2VvbWV0cnkgZGF0YSBmb3IgdGhpcyBMaW5lU3ViTWVzaC5cblx0ICovXG5cdHB1YmxpYyBnZXQgc3ViR2VvbWV0cnkoKTpMaW5lU3ViR2VvbWV0cnlcblx0e1xuXHRcdHJldHVybiB0aGlzLl9zdWJHZW9tZXRyeTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGEgbmV3IExpbmVTdWJNZXNoIG9iamVjdFxuXHQgKiBAcGFyYW0gc3ViR2VvbWV0cnkgVGhlIExpbmVTdWJHZW9tZXRyeSBvYmplY3Qgd2hpY2ggcHJvdmlkZXMgdGhlIGdlb21ldHJ5IGRhdGEgZm9yIHRoaXMgTGluZVN1Yk1lc2guXG5cdCAqIEBwYXJhbSBwYXJlbnRNZXNoIFRoZSBNZXNoIG9iamVjdCB0byB3aGljaCB0aGlzIExpbmVTdWJNZXNoIGJlbG9uZ3MuXG5cdCAqIEBwYXJhbSBtYXRlcmlhbCBBbiBvcHRpb25hbCBtYXRlcmlhbCB1c2VkIHRvIHJlbmRlciB0aGlzIExpbmVTdWJNZXNoLlxuXHQgKi9cblx0Y29uc3RydWN0b3Ioc3ViR2VvbWV0cnk6TGluZVN1Ykdlb21ldHJ5LCBwYXJlbnRNZXNoOk1lc2gsIG1hdGVyaWFsOk1hdGVyaWFsQmFzZSA9IG51bGwpXG5cdHtcblx0XHRzdXBlcigpO1xuXG5cdFx0dGhpcy5fcFBhcmVudE1lc2ggPSBwYXJlbnRNZXNoO1xuXHRcdHRoaXMuX3N1Ykdlb21ldHJ5ID0gc3ViR2VvbWV0cnk7XG5cdFx0dGhpcy5tYXRlcmlhbCA9IG1hdGVyaWFsO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZGlzcG9zZSgpXG5cdHtcblx0XHR0aGlzLm1hdGVyaWFsID0gbnVsbDtcblxuXHRcdHN1cGVyLmRpc3Bvc2UoKTtcblx0fVxuXG5cdHB1YmxpYyBfaUNvbGxlY3RSZW5kZXJhYmxlKHJlbmRlcmVyOklSZW5kZXJlcilcblx0e1xuXHRcdHJlbmRlcmVyLmFwcGx5TGluZVN1Yk1lc2godGhpcyk7XG5cdH1cbn1cblxuZXhwb3J0ID0gTGluZVN1Yk1lc2g7Il19