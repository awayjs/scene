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
    LineSubMesh.prototype._iCollectRenderable = function (rendererPool) {
        rendererPool.applyLineSubMesh(this);
    };
    return LineSubMesh;
})(SubMeshBase);
module.exports = LineSubMesh;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0xpbmVTdWJNZXNoLnRzIl0sIm5hbWVzIjpbIkxpbmVTdWJNZXNoIiwiTGluZVN1Yk1lc2guY29uc3RydWN0b3IiLCJMaW5lU3ViTWVzaC5hc3NldFR5cGUiLCJMaW5lU3ViTWVzaC5zdWJHZW9tZXRyeSIsIkxpbmVTdWJNZXNoLmRpc3Bvc2UiLCJMaW5lU3ViTWVzaC5faUNvbGxlY3RSZW5kZXJhYmxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxJQUFPLFNBQVMsV0FBYyxtQ0FBbUMsQ0FBQyxDQUFDO0FBR25FLElBQU8sV0FBVyxXQUFjLHFDQUFxQyxDQUFDLENBQUM7QUFNdkUsQUFTQTs7Ozs7Ozs7R0FERztJQUNHLFdBQVc7SUFBU0EsVUFBcEJBLFdBQVdBLFVBQW9CQTtJQW9CcENBOzs7OztPQUtHQTtJQUNIQSxTQTFCS0EsV0FBV0EsQ0EwQkpBLFdBQTJCQSxFQUFFQSxVQUFlQSxFQUFFQSxRQUE0QkE7UUFBNUJDLHdCQUE0QkEsR0FBNUJBLGVBQTRCQTtRQUVyRkEsaUJBQU9BLENBQUNBO1FBRVJBLElBQUlBLENBQUNBLFlBQVlBLEdBQUdBLFVBQVVBLENBQUNBO1FBQy9CQSxJQUFJQSxDQUFDQSxZQUFZQSxHQUFHQSxXQUFXQSxDQUFDQTtRQUNoQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsUUFBUUEsQ0FBQ0E7SUFDMUJBLENBQUNBO0lBMUJERCxzQkFBV0Esa0NBQVNBO1FBSHBCQTs7V0FFR0E7YUFDSEE7WUFFQ0UsTUFBTUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsYUFBYUEsQ0FBQ0E7UUFDaENBLENBQUNBOzs7T0FBQUY7SUFLREEsc0JBQVdBLG9DQUFXQTtRQUh0QkE7O1dBRUdBO2FBQ0hBO1lBRUNHLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBO1FBQzFCQSxDQUFDQTs7O09BQUFIO0lBaUJEQTs7T0FFR0E7SUFDSUEsNkJBQU9BLEdBQWRBO1FBRUNJLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLElBQUlBLENBQUNBO1FBRXJCQSxnQkFBS0EsQ0FBQ0EsT0FBT0EsV0FBRUEsQ0FBQ0E7SUFDakJBLENBQUNBO0lBRU1KLHlDQUFtQkEsR0FBMUJBLFVBQTJCQSxZQUEwQkE7UUFFcERLLFlBQVlBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7SUFDckNBLENBQUNBO0lBQ0ZMLGtCQUFDQTtBQUFEQSxDQWpEQSxBQWlEQ0EsRUFqRHlCLFdBQVcsRUFpRHBDO0FBRUQsQUFBcUIsaUJBQVosV0FBVyxDQUFDIiwiZmlsZSI6ImJhc2UvTGluZVN1Yk1lc2guanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExpbmVTdWJHZW9tZXRyeVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9kYXRhL0xpbmVTdWJHZW9tZXRyeVwiKTtcbmltcG9ydCBBc3NldFR5cGVcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0Fzc2V0VHlwZVwiKTtcblxuaW1wb3J0IElTdWJNZXNoXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0lTdWJNZXNoXCIpO1xuaW1wb3J0IFN1Yk1lc2hCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9TdWJNZXNoQmFzZVwiKTtcbmltcG9ydCBJUmVuZGVyZXJQb29sXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3Bvb2wvSVJlbmRlcmVyUG9vbFwiKTtcbmltcG9ydCBTdWJNZXNoUG9vbFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3Bvb2wvU3ViTWVzaFBvb2xcIik7XG5pbXBvcnQgTWVzaFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9NZXNoXCIpO1xuaW1wb3J0IE1hdGVyaWFsQmFzZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL21hdGVyaWFscy9NYXRlcmlhbEJhc2VcIik7XG5cbi8qKlxuICogTGluZVN1Yk1lc2ggd3JhcHMgYSBMaW5lU3ViR2VvbWV0cnkgYXMgYSBzY2VuZSBncmFwaCBpbnN0YW50aWF0aW9uLiBBIExpbmVTdWJNZXNoIGlzIG93bmVkIGJ5IGEgTWVzaCBvYmplY3QuXG4gKlxuICpcbiAqIEBzZWUgYXdheS5iYXNlLkxpbmVTdWJHZW9tZXRyeVxuICogQHNlZSBhd2F5LmVudGl0aWVzLk1lc2hcbiAqXG4gKiBAY2xhc3MgYXdheS5iYXNlLkxpbmVTdWJNZXNoXG4gKi9cbmNsYXNzIExpbmVTdWJNZXNoIGV4dGVuZHMgU3ViTWVzaEJhc2UgaW1wbGVtZW50cyBJU3ViTWVzaFxue1xuXHRwcml2YXRlIF9zdWJHZW9tZXRyeTpMaW5lU3ViR2VvbWV0cnk7XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGFzc2V0VHlwZSgpOnN0cmluZ1xuXHR7XG5cdFx0cmV0dXJuIEFzc2V0VHlwZS5MSU5FX1NVQl9NRVNIO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBMaW5lU3ViR2VvbWV0cnkgb2JqZWN0IHdoaWNoIHByb3ZpZGVzIHRoZSBnZW9tZXRyeSBkYXRhIGZvciB0aGlzIExpbmVTdWJNZXNoLlxuXHQgKi9cblx0cHVibGljIGdldCBzdWJHZW9tZXRyeSgpOkxpbmVTdWJHZW9tZXRyeVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3N1Ykdlb21ldHJ5O1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBuZXcgTGluZVN1Yk1lc2ggb2JqZWN0XG5cdCAqIEBwYXJhbSBzdWJHZW9tZXRyeSBUaGUgTGluZVN1Ykdlb21ldHJ5IG9iamVjdCB3aGljaCBwcm92aWRlcyB0aGUgZ2VvbWV0cnkgZGF0YSBmb3IgdGhpcyBMaW5lU3ViTWVzaC5cblx0ICogQHBhcmFtIHBhcmVudE1lc2ggVGhlIE1lc2ggb2JqZWN0IHRvIHdoaWNoIHRoaXMgTGluZVN1Yk1lc2ggYmVsb25ncy5cblx0ICogQHBhcmFtIG1hdGVyaWFsIEFuIG9wdGlvbmFsIG1hdGVyaWFsIHVzZWQgdG8gcmVuZGVyIHRoaXMgTGluZVN1Yk1lc2guXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcihzdWJHZW9tZXRyeTpMaW5lU3ViR2VvbWV0cnksIHBhcmVudE1lc2g6TWVzaCwgbWF0ZXJpYWw6TWF0ZXJpYWxCYXNlID0gbnVsbClcblx0e1xuXHRcdHN1cGVyKCk7XG5cblx0XHR0aGlzLl9wUGFyZW50TWVzaCA9IHBhcmVudE1lc2g7XG5cdFx0dGhpcy5fc3ViR2VvbWV0cnkgPSBzdWJHZW9tZXRyeTtcblx0XHR0aGlzLm1hdGVyaWFsID0gbWF0ZXJpYWw7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBkaXNwb3NlKClcblx0e1xuXHRcdHRoaXMubWF0ZXJpYWwgPSBudWxsO1xuXG5cdFx0c3VwZXIuZGlzcG9zZSgpO1xuXHR9XG5cblx0cHVibGljIF9pQ29sbGVjdFJlbmRlcmFibGUocmVuZGVyZXJQb29sOklSZW5kZXJlclBvb2wpXG5cdHtcblx0XHRyZW5kZXJlclBvb2wuYXBwbHlMaW5lU3ViTWVzaCh0aGlzKTtcblx0fVxufVxuXG5leHBvcnQgPSBMaW5lU3ViTWVzaDsiXX0=