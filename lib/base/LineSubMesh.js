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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0xpbmVTdWJNZXNoLnRzIl0sIm5hbWVzIjpbIkxpbmVTdWJNZXNoIiwiTGluZVN1Yk1lc2guY29uc3RydWN0b3IiLCJMaW5lU3ViTWVzaC5hc3NldFR5cGUiLCJMaW5lU3ViTWVzaC5zdWJHZW9tZXRyeSIsIkxpbmVTdWJNZXNoLmRpc3Bvc2UiLCJMaW5lU3ViTWVzaC5faUNvbGxlY3RSZW5kZXJhYmxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFPLGVBQWUsV0FBYSxzQ0FBc0MsQ0FBQyxDQUFDO0FBRzNFLElBQU8sV0FBVyxXQUFjLHFDQUFxQyxDQUFDLENBQUM7QUFNdkUsQUFTQTs7Ozs7Ozs7R0FERztJQUNHLFdBQVc7SUFBU0EsVUFBcEJBLFdBQVdBLFVBQW9CQTtJQXdCcENBOzs7OztPQUtHQTtJQUNIQSxTQTlCS0EsV0FBV0EsQ0E4QkpBLFdBQTJCQSxFQUFFQSxVQUFlQSxFQUFFQSxRQUE0QkE7UUFBNUJDLHdCQUE0QkEsR0FBNUJBLGVBQTRCQTtRQUVyRkEsaUJBQU9BLENBQUNBO1FBRVJBLElBQUlBLENBQUNBLFlBQVlBLEdBQUdBLFVBQVVBLENBQUNBO1FBQy9CQSxJQUFJQSxDQUFDQSxZQUFZQSxHQUFHQSxXQUFXQSxDQUFDQTtRQUNoQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsUUFBUUEsQ0FBQ0E7SUFDMUJBLENBQUNBO0lBMUJERCxzQkFBV0Esa0NBQVNBO1FBSHBCQTs7V0FFR0E7YUFDSEE7WUFFQ0UsTUFBTUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsU0FBU0EsQ0FBQ0E7UUFDOUJBLENBQUNBOzs7T0FBQUY7SUFLREEsc0JBQVdBLG9DQUFXQTtRQUh0QkE7O1dBRUdBO2FBQ0hBO1lBRUNHLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBO1FBQzFCQSxDQUFDQTs7O09BQUFIO0lBaUJEQTs7T0FFR0E7SUFDSUEsNkJBQU9BLEdBQWRBO1FBRUNJLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLElBQUlBLENBQUNBO1FBRXJCQSxnQkFBS0EsQ0FBQ0EsT0FBT0EsV0FBRUEsQ0FBQ0E7SUFDakJBLENBQUNBO0lBRU1KLHlDQUFtQkEsR0FBMUJBLFVBQTJCQSxZQUEwQkE7UUFFcERLLFlBQVlBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7SUFDckNBLENBQUNBO0lBbERhTCxxQkFBU0EsR0FBVUEscUJBQXFCQSxDQUFDQTtJQUV6Q0Esd0JBQVlBLEdBQVVBLGVBQWVBLENBQUNBLFNBQVNBLENBQUNBO0lBaUQvREEsa0JBQUNBO0FBQURBLENBckRBLEFBcURDQSxFQXJEeUIsV0FBVyxFQXFEcEM7QUFFRCxBQUFxQixpQkFBWixXQUFXLENBQUMiLCJmaWxlIjoiYmFzZS9MaW5lU3ViTWVzaC5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTGluZVN1Ykdlb21ldHJ5XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2RhdGEvTGluZVN1Ykdlb21ldHJ5XCIpO1xuXG5pbXBvcnQgSVN1Yk1lc2hcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvSVN1Yk1lc2hcIik7XG5pbXBvcnQgU3ViTWVzaEJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL1N1Yk1lc2hCYXNlXCIpO1xuaW1wb3J0IElSZW5kZXJlclBvb2xcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcG9vbC9JUmVuZGVyZXJQb29sXCIpO1xuaW1wb3J0IFN1Yk1lc2hQb29sXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcG9vbC9TdWJNZXNoUG9vbFwiKTtcbmltcG9ydCBNZXNoXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2VudGl0aWVzL01lc2hcIik7XG5pbXBvcnQgTWF0ZXJpYWxCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvbWF0ZXJpYWxzL01hdGVyaWFsQmFzZVwiKTtcblxuLyoqXG4gKiBMaW5lU3ViTWVzaCB3cmFwcyBhIExpbmVTdWJHZW9tZXRyeSBhcyBhIHNjZW5lIGdyYXBoIGluc3RhbnRpYXRpb24uIEEgTGluZVN1Yk1lc2ggaXMgb3duZWQgYnkgYSBNZXNoIG9iamVjdC5cbiAqXG4gKlxuICogQHNlZSBhd2F5LmJhc2UuTGluZVN1Ykdlb21ldHJ5XG4gKiBAc2VlIGF3YXkuZW50aXRpZXMuTWVzaFxuICpcbiAqIEBjbGFzcyBhd2F5LmJhc2UuTGluZVN1Yk1lc2hcbiAqL1xuY2xhc3MgTGluZVN1Yk1lc2ggZXh0ZW5kcyBTdWJNZXNoQmFzZSBpbXBsZW1lbnRzIElTdWJNZXNoXG57XG5cdHB1YmxpYyBzdGF0aWMgYXNzZXRUeXBlOnN0cmluZyA9IFwiW2Fzc2V0IExpbmVTdWJNZXNoXVwiO1xuXG5cdHB1YmxpYyBzdGF0aWMgZ2VvbWV0cnlUeXBlOnN0cmluZyA9IExpbmVTdWJHZW9tZXRyeS5hc3NldFR5cGU7XG5cblx0cHJpdmF0ZSBfc3ViR2VvbWV0cnk6TGluZVN1Ykdlb21ldHJ5O1xuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBhc3NldFR5cGUoKTpzdHJpbmdcblx0e1xuXHRcdHJldHVybiBMaW5lU3ViTWVzaC5hc3NldFR5cGU7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIExpbmVTdWJHZW9tZXRyeSBvYmplY3Qgd2hpY2ggcHJvdmlkZXMgdGhlIGdlb21ldHJ5IGRhdGEgZm9yIHRoaXMgTGluZVN1Yk1lc2guXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHN1Ykdlb21ldHJ5KCk6TGluZVN1Ykdlb21ldHJ5XG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fc3ViR2VvbWV0cnk7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlcyBhIG5ldyBMaW5lU3ViTWVzaCBvYmplY3Rcblx0ICogQHBhcmFtIHN1Ykdlb21ldHJ5IFRoZSBMaW5lU3ViR2VvbWV0cnkgb2JqZWN0IHdoaWNoIHByb3ZpZGVzIHRoZSBnZW9tZXRyeSBkYXRhIGZvciB0aGlzIExpbmVTdWJNZXNoLlxuXHQgKiBAcGFyYW0gcGFyZW50TWVzaCBUaGUgTWVzaCBvYmplY3QgdG8gd2hpY2ggdGhpcyBMaW5lU3ViTWVzaCBiZWxvbmdzLlxuXHQgKiBAcGFyYW0gbWF0ZXJpYWwgQW4gb3B0aW9uYWwgbWF0ZXJpYWwgdXNlZCB0byByZW5kZXIgdGhpcyBMaW5lU3ViTWVzaC5cblx0ICovXG5cdGNvbnN0cnVjdG9yKHN1Ykdlb21ldHJ5OkxpbmVTdWJHZW9tZXRyeSwgcGFyZW50TWVzaDpNZXNoLCBtYXRlcmlhbDpNYXRlcmlhbEJhc2UgPSBudWxsKVxuXHR7XG5cdFx0c3VwZXIoKTtcblxuXHRcdHRoaXMuX3BQYXJlbnRNZXNoID0gcGFyZW50TWVzaDtcblx0XHR0aGlzLl9zdWJHZW9tZXRyeSA9IHN1Ykdlb21ldHJ5O1xuXHRcdHRoaXMubWF0ZXJpYWwgPSBtYXRlcmlhbDtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGRpc3Bvc2UoKVxuXHR7XG5cdFx0dGhpcy5tYXRlcmlhbCA9IG51bGw7XG5cblx0XHRzdXBlci5kaXNwb3NlKCk7XG5cdH1cblxuXHRwdWJsaWMgX2lDb2xsZWN0UmVuZGVyYWJsZShyZW5kZXJlclBvb2w6SVJlbmRlcmVyUG9vbClcblx0e1xuXHRcdHJlbmRlcmVyUG9vbC5hcHBseUxpbmVTdWJNZXNoKHRoaXMpO1xuXHR9XG59XG5cbmV4cG9ydCA9IExpbmVTdWJNZXNoOyJdfQ==