var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var LineSubGeometry = require("awayjs-core/lib/data/LineSubGeometry");
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
            return LineSubMesh.assetType;
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
    LineSubMesh.prototype._iCollectRenderable = function (rendererPool) {
        rendererPool.applyLineSubMesh(this);
    };
    LineSubMesh.assetType = "[asset LineSubMesh]";
    LineSubMesh.geometryType = LineSubGeometry.assetType;
    return LineSubMesh;
})(SubMeshBase);
module.exports = LineSubMesh;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0xpbmVTdWJNZXNoLnRzIl0sIm5hbWVzIjpbIkxpbmVTdWJNZXNoIiwiTGluZVN1Yk1lc2guY29uc3RydWN0b3IiLCJMaW5lU3ViTWVzaC5hc3NldFR5cGUiLCJMaW5lU3ViTWVzaC5zdWJHZW9tZXRyeSIsIkxpbmVTdWJNZXNoLmRpc3Bvc2UiLCJMaW5lU3ViTWVzaC5faUNvbGxlY3RSZW5kZXJhYmxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFPLGVBQWUsV0FBYSxzQ0FBc0MsQ0FBQyxDQUFDO0FBRzNFLElBQU8sV0FBVyxXQUFjLHFDQUFxQyxDQUFDLENBQUM7QUFNdkUsQUFTQTs7Ozs7Ozs7R0FERztJQUNHLFdBQVc7SUFBU0EsVUFBcEJBLFdBQVdBLFVBQW9CQTtJQXdCcENBOzs7OztPQUtHQTtJQUNIQSxTQTlCS0EsV0FBV0EsQ0E4QkpBLFdBQTJCQSxFQUFFQSxVQUFlQSxFQUFFQSxRQUE0QkE7UUFBNUJDLHdCQUE0QkEsR0FBNUJBLGVBQTRCQTtRQUVyRkEsaUJBQU9BLENBQUNBO1FBRVJBLElBQUlBLENBQUNBLFlBQVlBLEdBQUdBLFVBQVVBLENBQUNBO1FBQy9CQSxJQUFJQSxDQUFDQSxZQUFZQSxHQUFHQSxXQUFXQSxDQUFDQTtRQUNoQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsUUFBUUEsQ0FBQ0E7SUFDMUJBLENBQUNBO0lBMUJERCxzQkFBV0Esa0NBQVNBO1FBSHBCQTs7V0FFR0E7YUFDSEE7WUFFQ0UsTUFBTUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsU0FBU0EsQ0FBQ0E7UUFDOUJBLENBQUNBOzs7T0FBQUY7SUFLREEsc0JBQVdBLG9DQUFXQTtRQUh0QkE7O1dBRUdBO2FBQ0hBO1lBRUNHLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBO1FBQzFCQSxDQUFDQTs7O09BQUFIO0lBaUJEQTs7T0FFR0E7SUFDSUEsNkJBQU9BLEdBQWRBO1FBRUNJLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLElBQUlBLENBQUNBO1FBRXJCQSxnQkFBS0EsQ0FBQ0EsT0FBT0EsV0FBRUEsQ0FBQ0E7SUFDakJBLENBQUNBO0lBRU1KLHlDQUFtQkEsR0FBMUJBLFVBQTJCQSxZQUEwQkE7UUFFcERLLFlBQVlBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7SUFDckNBLENBQUNBO0lBbERhTCxxQkFBU0EsR0FBVUEscUJBQXFCQSxDQUFDQTtJQUV6Q0Esd0JBQVlBLEdBQVVBLGVBQWVBLENBQUNBLFNBQVNBLENBQUNBO0lBaUQvREEsa0JBQUNBO0FBQURBLENBckRBLEFBcURDQSxFQXJEeUIsV0FBVyxFQXFEcEM7QUFFRCxBQUFxQixpQkFBWixXQUFXLENBQUMiLCJmaWxlIjoiYmFzZS9MaW5lU3ViTWVzaC5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTGluZVN1Ykdlb21ldHJ5XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2RhdGEvTGluZVN1Ykdlb21ldHJ5XCIpO1xyXG5cclxuaW1wb3J0IElTdWJNZXNoXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0lTdWJNZXNoXCIpO1xyXG5pbXBvcnQgU3ViTWVzaEJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL1N1Yk1lc2hCYXNlXCIpO1xyXG5pbXBvcnQgSVJlbmRlcmVyUG9vbFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wb29sL0lSZW5kZXJlclBvb2xcIik7XHJcbmltcG9ydCBTdWJNZXNoUG9vbFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3Bvb2wvU3ViTWVzaFBvb2xcIik7XHJcbmltcG9ydCBNZXNoXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2VudGl0aWVzL01lc2hcIik7XHJcbmltcG9ydCBNYXRlcmlhbEJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9tYXRlcmlhbHMvTWF0ZXJpYWxCYXNlXCIpO1xyXG5cclxuLyoqXHJcbiAqIExpbmVTdWJNZXNoIHdyYXBzIGEgTGluZVN1Ykdlb21ldHJ5IGFzIGEgc2NlbmUgZ3JhcGggaW5zdGFudGlhdGlvbi4gQSBMaW5lU3ViTWVzaCBpcyBvd25lZCBieSBhIE1lc2ggb2JqZWN0LlxyXG4gKlxyXG4gKlxyXG4gKiBAc2VlIGF3YXkuYmFzZS5MaW5lU3ViR2VvbWV0cnlcclxuICogQHNlZSBhd2F5LmVudGl0aWVzLk1lc2hcclxuICpcclxuICogQGNsYXNzIGF3YXkuYmFzZS5MaW5lU3ViTWVzaFxyXG4gKi9cclxuY2xhc3MgTGluZVN1Yk1lc2ggZXh0ZW5kcyBTdWJNZXNoQmFzZSBpbXBsZW1lbnRzIElTdWJNZXNoXHJcbntcclxuXHRwdWJsaWMgc3RhdGljIGFzc2V0VHlwZTpzdHJpbmcgPSBcIlthc3NldCBMaW5lU3ViTWVzaF1cIjtcclxuXHJcblx0cHVibGljIHN0YXRpYyBnZW9tZXRyeVR5cGU6c3RyaW5nID0gTGluZVN1Ykdlb21ldHJ5LmFzc2V0VHlwZTtcclxuXHJcblx0cHJpdmF0ZSBfc3ViR2VvbWV0cnk6TGluZVN1Ykdlb21ldHJ5O1xyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgYXNzZXRUeXBlKCk6c3RyaW5nXHJcblx0e1xyXG5cdFx0cmV0dXJuIExpbmVTdWJNZXNoLmFzc2V0VHlwZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBMaW5lU3ViR2VvbWV0cnkgb2JqZWN0IHdoaWNoIHByb3ZpZGVzIHRoZSBnZW9tZXRyeSBkYXRhIGZvciB0aGlzIExpbmVTdWJNZXNoLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgc3ViR2VvbWV0cnkoKTpMaW5lU3ViR2VvbWV0cnlcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fc3ViR2VvbWV0cnk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGEgbmV3IExpbmVTdWJNZXNoIG9iamVjdFxyXG5cdCAqIEBwYXJhbSBzdWJHZW9tZXRyeSBUaGUgTGluZVN1Ykdlb21ldHJ5IG9iamVjdCB3aGljaCBwcm92aWRlcyB0aGUgZ2VvbWV0cnkgZGF0YSBmb3IgdGhpcyBMaW5lU3ViTWVzaC5cclxuXHQgKiBAcGFyYW0gcGFyZW50TWVzaCBUaGUgTWVzaCBvYmplY3QgdG8gd2hpY2ggdGhpcyBMaW5lU3ViTWVzaCBiZWxvbmdzLlxyXG5cdCAqIEBwYXJhbSBtYXRlcmlhbCBBbiBvcHRpb25hbCBtYXRlcmlhbCB1c2VkIHRvIHJlbmRlciB0aGlzIExpbmVTdWJNZXNoLlxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKHN1Ykdlb21ldHJ5OkxpbmVTdWJHZW9tZXRyeSwgcGFyZW50TWVzaDpNZXNoLCBtYXRlcmlhbDpNYXRlcmlhbEJhc2UgPSBudWxsKVxyXG5cdHtcclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0dGhpcy5fcFBhcmVudE1lc2ggPSBwYXJlbnRNZXNoO1xyXG5cdFx0dGhpcy5fc3ViR2VvbWV0cnkgPSBzdWJHZW9tZXRyeTtcclxuXHRcdHRoaXMubWF0ZXJpYWwgPSBtYXRlcmlhbDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGRpc3Bvc2UoKVxyXG5cdHtcclxuXHRcdHRoaXMubWF0ZXJpYWwgPSBudWxsO1xyXG5cclxuXHRcdHN1cGVyLmRpc3Bvc2UoKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBfaUNvbGxlY3RSZW5kZXJhYmxlKHJlbmRlcmVyUG9vbDpJUmVuZGVyZXJQb29sKVxyXG5cdHtcclxuXHRcdHJlbmRlcmVyUG9vbC5hcHBseUxpbmVTdWJNZXNoKHRoaXMpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0ID0gTGluZVN1Yk1lc2g7Il19