var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Geometry = require("awayjs-core/lib/data/Geometry");
var TriangleSubGeometry = require("awayjs-core/lib/data/TriangleSubGeometry");
var LineSubGeometry = require("awayjs-core/lib/data/LineSubGeometry");
var AbstractMethodError = require("awayjs-core/lib/errors/AbstractMethodError");
var Mesh = require("awayjs-display/lib/entities/Mesh");
var PrefabBase = require("awayjs-display/lib/prefabs/PrefabBase");
/**
 * PrimitivePrefabBase is an abstract base class for polytope prefabs, which are simple pre-built geometric shapes
 */
var PrimitivePrefabBase = (function (_super) {
    __extends(PrimitivePrefabBase, _super);
    /**
     * Creates a new PrimitivePrefabBase object.
     *
     * @param material The material with which to render the object
     */
    function PrimitivePrefabBase(material, geometryType) {
        if (material === void 0) { material = null; }
        if (geometryType === void 0) { geometryType = "triangleSubGeometry"; }
        _super.call(this);
        this._geomDirty = true;
        this._uvDirty = true;
        this._geometryTypeDirty = true;
        this._geometry = new Geometry();
        this._material = material;
        this._geometryType = geometryType;
    }
    Object.defineProperty(PrimitivePrefabBase.prototype, "assetType", {
        /**
         *
         */
        get: function () {
            return PrimitivePrefabBase.assetType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitivePrefabBase.prototype, "geometryType", {
        /**
         *
         */
        get: function () {
            return this._geometryType;
        },
        set: function (value) {
            if (this._geometryType == value)
                return;
            this._geometryType = value;
            this.invalidateGeometryType();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitivePrefabBase.prototype, "geometry", {
        get: function () {
            this._iValidate();
            return this._geometry;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitivePrefabBase.prototype, "material", {
        /**
         * The material with which to render the primitive.
         */
        get: function () {
            return this._material;
        },
        set: function (value) {
            if (value == this._material)
                return;
            this._material = value;
            var len = this._pObjects.length;
            for (var i = 0; i < len; i++)
                this._pObjects[i].material = this._material;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Builds the primitive's geometry when invalid. This method should not be called directly. The calling should
     * be triggered by the invalidateGeometry method (and in turn by updateGeometry).
     */
    PrimitivePrefabBase.prototype._pBuildGeometry = function (target, geometryType) {
        throw new AbstractMethodError();
    };
    /**
     * Builds the primitive's uv coordinates when invalid. This method should not be called directly. The calling
     * should be triggered by the invalidateUVs method (and in turn by updateUVs).
     */
    PrimitivePrefabBase.prototype._pBuildUVs = function (target, geometryType) {
        throw new AbstractMethodError();
    };
    /**
     * Invalidates the primitive's geometry type, causing it to be updated when requested.
     */
    PrimitivePrefabBase.prototype.invalidateGeometryType = function () {
        this._geometryTypeDirty = true;
        this._geomDirty = true;
        this._uvDirty = true;
    };
    /**
     * Invalidates the primitive's geometry, causing it to be updated when requested.
     */
    PrimitivePrefabBase.prototype._pInvalidateGeometry = function () {
        this._geomDirty = true;
    };
    /**
     * Invalidates the primitive's uv coordinates, causing them to be updated when requested.
     */
    PrimitivePrefabBase.prototype._pInvalidateUVs = function () {
        this._uvDirty = true;
    };
    /**
     * Updates the subgeometry when invalid.
     */
    PrimitivePrefabBase.prototype.updateGeometryType = function () {
        //remove any existing sub geometry
        if (this._subGeometry)
            this._geometry.removeSubGeometry(this._subGeometry);
        if (this._geometryType == "triangleSubGeometry") {
            var triangleGeometry = new TriangleSubGeometry(true);
            triangleGeometry.autoDeriveNormals = false;
            triangleGeometry.autoDeriveTangents = false;
            triangleGeometry.autoDeriveUVs = false;
            this._geometry.addSubGeometry(triangleGeometry);
            this._subGeometry = triangleGeometry;
        }
        else if (this._geometryType == "lineSubGeometry") {
            this._geometry.addSubGeometry(this._subGeometry = new LineSubGeometry());
        }
        this._geometryTypeDirty = false;
    };
    /**
     * Updates the geometry when invalid.
     */
    PrimitivePrefabBase.prototype.updateGeometry = function () {
        this._pBuildGeometry(this._subGeometry, this._geometryType);
        this._geomDirty = false;
    };
    /**
     * Updates the uv coordinates when invalid.
     */
    PrimitivePrefabBase.prototype.updateUVs = function () {
        this._pBuildUVs(this._subGeometry, this._geometryType);
        this._uvDirty = false;
    };
    PrimitivePrefabBase.prototype._iValidate = function () {
        if (this._geometryTypeDirty)
            this.updateGeometryType();
        if (this._geomDirty)
            this.updateGeometry();
        if (this._uvDirty)
            this.updateUVs();
    };
    PrimitivePrefabBase.prototype._pCreateObject = function () {
        var mesh = new Mesh(this._geometry, this._material);
        mesh._iSourcePrefab = this;
        return mesh;
    };
    PrimitivePrefabBase.assetType = "[asset PrimitivePrefab]";
    return PrimitivePrefabBase;
})(PrefabBase);
module.exports = PrimitivePrefabBase;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9wcmVmYWJzL1ByaW1pdGl2ZVByZWZhYkJhc2UudHMiXSwibmFtZXMiOlsiUHJpbWl0aXZlUHJlZmFiQmFzZSIsIlByaW1pdGl2ZVByZWZhYkJhc2UuY29uc3RydWN0b3IiLCJQcmltaXRpdmVQcmVmYWJCYXNlLmFzc2V0VHlwZSIsIlByaW1pdGl2ZVByZWZhYkJhc2UuZ2VvbWV0cnlUeXBlIiwiUHJpbWl0aXZlUHJlZmFiQmFzZS5nZW9tZXRyeSIsIlByaW1pdGl2ZVByZWZhYkJhc2UubWF0ZXJpYWwiLCJQcmltaXRpdmVQcmVmYWJCYXNlLl9wQnVpbGRHZW9tZXRyeSIsIlByaW1pdGl2ZVByZWZhYkJhc2UuX3BCdWlsZFVWcyIsIlByaW1pdGl2ZVByZWZhYkJhc2UuaW52YWxpZGF0ZUdlb21ldHJ5VHlwZSIsIlByaW1pdGl2ZVByZWZhYkJhc2UuX3BJbnZhbGlkYXRlR2VvbWV0cnkiLCJQcmltaXRpdmVQcmVmYWJCYXNlLl9wSW52YWxpZGF0ZVVWcyIsIlByaW1pdGl2ZVByZWZhYkJhc2UudXBkYXRlR2VvbWV0cnlUeXBlIiwiUHJpbWl0aXZlUHJlZmFiQmFzZS51cGRhdGVHZW9tZXRyeSIsIlByaW1pdGl2ZVByZWZhYkJhc2UudXBkYXRlVVZzIiwiUHJpbWl0aXZlUHJlZmFiQmFzZS5faVZhbGlkYXRlIiwiUHJpbWl0aXZlUHJlZmFiQmFzZS5fcENyZWF0ZU9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTyxRQUFRLFdBQWUsK0JBQStCLENBQUMsQ0FBQztBQUUvRCxJQUFPLG1CQUFtQixXQUFZLDBDQUEwQyxDQUFDLENBQUM7QUFDbEYsSUFBTyxlQUFlLFdBQWEsc0NBQXNDLENBQUMsQ0FBQztBQUMzRSxJQUFPLG1CQUFtQixXQUFZLDRDQUE0QyxDQUFDLENBQUM7QUFHcEYsSUFBTyxJQUFJLFdBQWdCLGtDQUFrQyxDQUFDLENBQUM7QUFFL0QsSUFBTyxVQUFVLFdBQWMsdUNBQXVDLENBQUMsQ0FBQztB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SUEsQ0FBQ0EsU0FBU0EsRUFBRUEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0E7UUFDekRBLElBQUlBLENBQUNBLGNBQWNBLEdBQUdBLElBQUlBLENBQUNBO1FBRTNCQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtJQUNiQSxDQUFDQTtJQTFMYWYsNkJBQVNBLEdBQVVBLHlCQUF5QkEsQ0FBQ0E7SUFvTTVEQSwwQkFBQ0E7QUFBREEsQ0F0TUEsQUFzTUNBLEVBdE1pQyxVQUFVLEVBc00zQztBQUVELEFBQTZCLGlCQUFwQixtQkFBbUIsQ0FBQyIsImZpbGUiOiJwcmVmYWJzL1ByaW1pdGl2ZVByZWZhYkJhc2UuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdlb21ldHJ5XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9kYXRhL0dlb21ldHJ5XCIpO1xuaW1wb3J0IFN1Ykdlb21ldHJ5QmFzZVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9kYXRhL1N1Ykdlb21ldHJ5QmFzZVwiKTtcbmltcG9ydCBUcmlhbmdsZVN1Ykdlb21ldHJ5XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9kYXRhL1RyaWFuZ2xlU3ViR2VvbWV0cnlcIik7XG5pbXBvcnQgTGluZVN1Ykdlb21ldHJ5XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2RhdGEvTGluZVN1Ykdlb21ldHJ5XCIpO1xuaW1wb3J0IEFic3RyYWN0TWV0aG9kRXJyb3JcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2Vycm9ycy9BYnN0cmFjdE1ldGhvZEVycm9yXCIpO1xuXG5pbXBvcnQgRGlzcGxheU9iamVjdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0Rpc3BsYXlPYmplY3RcIik7XG5pbXBvcnQgTWVzaFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9NZXNoXCIpO1xuaW1wb3J0IE1hdGVyaWFsQmFzZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL21hdGVyaWFscy9NYXRlcmlhbEJhc2VcIik7XG5pbXBvcnQgUHJlZmFiQmFzZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3ByZWZhYnMvUHJlZmFiQmFzZVwiKTtcblxuLyoqXG4gKiBQcmltaXRpdmVQcmVmYWJCYXNlIGlzIGFuIGFic3RyYWN0IGJhc2UgY2xhc3MgZm9yIHBvbHl0b3BlIHByZWZhYnMsIHdoaWNoIGFyZSBzaW1wbGUgcHJlLWJ1aWx0IGdlb21ldHJpYyBzaGFwZXNcbiAqL1xuY2xhc3MgUHJpbWl0aXZlUHJlZmFiQmFzZSBleHRlbmRzIFByZWZhYkJhc2Vcbntcblx0cHVibGljIHN0YXRpYyBhc3NldFR5cGU6c3RyaW5nID0gXCJbYXNzZXQgUHJpbWl0aXZlUHJlZmFiXVwiO1xuXG5cdHB1YmxpYyBfZ2VvbURpcnR5OmJvb2xlYW4gPSB0cnVlO1xuXHRwdWJsaWMgX3V2RGlydHk6Ym9vbGVhbiA9IHRydWU7XG5cblx0cHJpdmF0ZSBfbWF0ZXJpYWw6TWF0ZXJpYWxCYXNlO1xuXHRwcml2YXRlIF9nZW9tZXRyeTpHZW9tZXRyeTtcblx0cHJpdmF0ZSBfc3ViR2VvbWV0cnk6U3ViR2VvbWV0cnlCYXNlO1xuXHRwcml2YXRlIF9nZW9tZXRyeVR5cGU6c3RyaW5nO1xuXHRwcml2YXRlIF9nZW9tZXRyeVR5cGVEaXJ0eTpib29sZWFuID0gdHJ1ZTtcblxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBhc3NldFR5cGUoKTpzdHJpbmdcblx0e1xuXHRcdHJldHVybiBQcmltaXRpdmVQcmVmYWJCYXNlLmFzc2V0VHlwZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBcblx0ICovXG5cdHB1YmxpYyBnZXQgZ2VvbWV0cnlUeXBlKCk6c3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fZ2VvbWV0cnlUeXBlO1xuXHR9XG5cdFxuXHRwdWJsaWMgc2V0IGdlb21ldHJ5VHlwZSh2YWx1ZTpzdHJpbmcpXG5cdHtcblx0XHRpZiAodGhpcy5fZ2VvbWV0cnlUeXBlID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fZ2VvbWV0cnlUeXBlID0gdmFsdWU7XG5cdFx0XG5cdFx0dGhpcy5pbnZhbGlkYXRlR2VvbWV0cnlUeXBlKCk7XG5cdH1cblxuXHRwdWJsaWMgZ2V0IGdlb21ldHJ5KCk6R2VvbWV0cnlcblx0e1xuXHRcdHRoaXMuX2lWYWxpZGF0ZSgpO1xuXG5cdFx0cmV0dXJuIHRoaXMuX2dlb21ldHJ5O1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBtYXRlcmlhbCB3aXRoIHdoaWNoIHRvIHJlbmRlciB0aGUgcHJpbWl0aXZlLlxuXHQgKi9cblx0cHVibGljIGdldCBtYXRlcmlhbCgpOk1hdGVyaWFsQmFzZVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX21hdGVyaWFsO1xuXHR9XG5cblx0cHVibGljIHNldCBtYXRlcmlhbCh2YWx1ZTpNYXRlcmlhbEJhc2UpXG5cdHtcblx0XHRpZiAodmFsdWUgPT0gdGhpcy5fbWF0ZXJpYWwpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9tYXRlcmlhbCA9IHZhbHVlO1xuXG5cdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9wT2JqZWN0cy5sZW5ndGg7XG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgbGVuOyBpKyspXG5cdFx0XHQoPE1lc2g+IHRoaXMuX3BPYmplY3RzW2ldKS5tYXRlcmlhbCA9IHRoaXMuX21hdGVyaWFsO1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBuZXcgUHJpbWl0aXZlUHJlZmFiQmFzZSBvYmplY3QuXG5cdCAqXG5cdCAqIEBwYXJhbSBtYXRlcmlhbCBUaGUgbWF0ZXJpYWwgd2l0aCB3aGljaCB0byByZW5kZXIgdGhlIG9iamVjdFxuXHQgKi9cblx0Y29uc3RydWN0b3IobWF0ZXJpYWw6TWF0ZXJpYWxCYXNlID0gbnVsbCwgZ2VvbWV0cnlUeXBlOnN0cmluZyA9IFwidHJpYW5nbGVTdWJHZW9tZXRyeVwiKVxuXHR7XG5cdFx0c3VwZXIoKTtcblxuXHRcdHRoaXMuX2dlb21ldHJ5ID0gbmV3IEdlb21ldHJ5KCk7XG5cdFx0dGhpcy5fbWF0ZXJpYWwgPSBtYXRlcmlhbDtcblx0XHR0aGlzLl9nZW9tZXRyeVR5cGUgPSBnZW9tZXRyeVR5cGU7XG5cdH1cblxuXHQvKipcblx0ICogQnVpbGRzIHRoZSBwcmltaXRpdmUncyBnZW9tZXRyeSB3aGVuIGludmFsaWQuIFRoaXMgbWV0aG9kIHNob3VsZCBub3QgYmUgY2FsbGVkIGRpcmVjdGx5LiBUaGUgY2FsbGluZyBzaG91bGRcblx0ICogYmUgdHJpZ2dlcmVkIGJ5IHRoZSBpbnZhbGlkYXRlR2VvbWV0cnkgbWV0aG9kIChhbmQgaW4gdHVybiBieSB1cGRhdGVHZW9tZXRyeSkuXG5cdCAqL1xuXHRwdWJsaWMgX3BCdWlsZEdlb21ldHJ5KHRhcmdldDpTdWJHZW9tZXRyeUJhc2UsIGdlb21ldHJ5VHlwZTpzdHJpbmcpXG5cdHtcblx0XHR0aHJvdyBuZXcgQWJzdHJhY3RNZXRob2RFcnJvcigpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEJ1aWxkcyB0aGUgcHJpbWl0aXZlJ3MgdXYgY29vcmRpbmF0ZXMgd2hlbiBpbnZhbGlkLiBUaGlzIG1ldGhvZCBzaG91bGQgbm90IGJlIGNhbGxlZCBkaXJlY3RseS4gVGhlIGNhbGxpbmdcblx0ICogc2hvdWxkIGJlIHRyaWdnZXJlZCBieSB0aGUgaW52YWxpZGF0ZVVWcyBtZXRob2QgKGFuZCBpbiB0dXJuIGJ5IHVwZGF0ZVVWcykuXG5cdCAqL1xuXHRwdWJsaWMgX3BCdWlsZFVWcyh0YXJnZXQ6U3ViR2VvbWV0cnlCYXNlLCBnZW9tZXRyeVR5cGU6c3RyaW5nKVxuXHR7XG5cdFx0dGhyb3cgbmV3IEFic3RyYWN0TWV0aG9kRXJyb3IoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbnZhbGlkYXRlcyB0aGUgcHJpbWl0aXZlJ3MgZ2VvbWV0cnkgdHlwZSwgY2F1c2luZyBpdCB0byBiZSB1cGRhdGVkIHdoZW4gcmVxdWVzdGVkLlxuXHQgKi9cblx0cHVibGljIGludmFsaWRhdGVHZW9tZXRyeVR5cGUoKVxuXHR7XG5cdFx0dGhpcy5fZ2VvbWV0cnlUeXBlRGlydHkgPSB0cnVlO1xuXHRcdHRoaXMuX2dlb21EaXJ0eSA9IHRydWU7XG5cdFx0dGhpcy5fdXZEaXJ0eSA9IHRydWU7XG5cdH1cblx0XG5cdC8qKlxuXHQgKiBJbnZhbGlkYXRlcyB0aGUgcHJpbWl0aXZlJ3MgZ2VvbWV0cnksIGNhdXNpbmcgaXQgdG8gYmUgdXBkYXRlZCB3aGVuIHJlcXVlc3RlZC5cblx0ICovXG5cdHB1YmxpYyBfcEludmFsaWRhdGVHZW9tZXRyeSgpXG5cdHtcblx0XHR0aGlzLl9nZW9tRGlydHkgPSB0cnVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIEludmFsaWRhdGVzIHRoZSBwcmltaXRpdmUncyB1diBjb29yZGluYXRlcywgY2F1c2luZyB0aGVtIHRvIGJlIHVwZGF0ZWQgd2hlbiByZXF1ZXN0ZWQuXG5cdCAqL1xuXHRwdWJsaWMgX3BJbnZhbGlkYXRlVVZzKClcblx0e1xuXHRcdHRoaXMuX3V2RGlydHkgPSB0cnVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIFVwZGF0ZXMgdGhlIHN1Ymdlb21ldHJ5IHdoZW4gaW52YWxpZC5cblx0ICovXG5cdHByaXZhdGUgdXBkYXRlR2VvbWV0cnlUeXBlKClcblx0e1xuXHRcdC8vcmVtb3ZlIGFueSBleGlzdGluZyBzdWIgZ2VvbWV0cnlcblx0XHRpZiAodGhpcy5fc3ViR2VvbWV0cnkpXG5cdFx0XHR0aGlzLl9nZW9tZXRyeS5yZW1vdmVTdWJHZW9tZXRyeSh0aGlzLl9zdWJHZW9tZXRyeSk7XG5cblx0XHRpZiAodGhpcy5fZ2VvbWV0cnlUeXBlID09IFwidHJpYW5nbGVTdWJHZW9tZXRyeVwiKSB7XG5cdFx0XHR2YXIgdHJpYW5nbGVHZW9tZXRyeTpUcmlhbmdsZVN1Ykdlb21ldHJ5ID0gbmV3IFRyaWFuZ2xlU3ViR2VvbWV0cnkodHJ1ZSk7XG5cdFx0XHR0cmlhbmdsZUdlb21ldHJ5LmF1dG9EZXJpdmVOb3JtYWxzID0gZmFsc2U7XG5cdFx0XHR0cmlhbmdsZUdlb21ldHJ5LmF1dG9EZXJpdmVUYW5nZW50cyA9IGZhbHNlO1xuXHRcdFx0dHJpYW5nbGVHZW9tZXRyeS5hdXRvRGVyaXZlVVZzID0gZmFsc2U7XG5cdFx0XHR0aGlzLl9nZW9tZXRyeS5hZGRTdWJHZW9tZXRyeSh0cmlhbmdsZUdlb21ldHJ5KTtcblx0XHRcdHRoaXMuX3N1Ykdlb21ldHJ5ID0gdHJpYW5nbGVHZW9tZXRyeTtcblx0XHR9IGVsc2UgaWYgKHRoaXMuX2dlb21ldHJ5VHlwZSA9PSBcImxpbmVTdWJHZW9tZXRyeVwiKSB7XG5cdFx0XHR0aGlzLl9nZW9tZXRyeS5hZGRTdWJHZW9tZXRyeSh0aGlzLl9zdWJHZW9tZXRyeSA9IG5ldyBMaW5lU3ViR2VvbWV0cnkoKSk7XG5cdFx0fVxuXG5cdFx0dGhpcy5fZ2VvbWV0cnlUeXBlRGlydHkgPSBmYWxzZTtcblx0fVxuXG5cdFxuXHQvKipcblx0ICogVXBkYXRlcyB0aGUgZ2VvbWV0cnkgd2hlbiBpbnZhbGlkLlxuXHQgKi9cblx0cHJpdmF0ZSB1cGRhdGVHZW9tZXRyeSgpXG5cdHtcblx0XHR0aGlzLl9wQnVpbGRHZW9tZXRyeSh0aGlzLl9zdWJHZW9tZXRyeSwgdGhpcy5fZ2VvbWV0cnlUeXBlKTtcblxuXHRcdHRoaXMuX2dlb21EaXJ0eSA9IGZhbHNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIFVwZGF0ZXMgdGhlIHV2IGNvb3JkaW5hdGVzIHdoZW4gaW52YWxpZC5cblx0ICovXG5cdHByaXZhdGUgdXBkYXRlVVZzKClcblx0e1xuXHRcdHRoaXMuX3BCdWlsZFVWcyh0aGlzLl9zdWJHZW9tZXRyeSwgdGhpcy5fZ2VvbWV0cnlUeXBlKTtcblxuXHRcdHRoaXMuX3V2RGlydHkgPSBmYWxzZTtcblx0fVxuXG5cdHB1YmxpYyBfaVZhbGlkYXRlKClcblx0e1xuXHRcdGlmICh0aGlzLl9nZW9tZXRyeVR5cGVEaXJ0eSlcblx0XHRcdHRoaXMudXBkYXRlR2VvbWV0cnlUeXBlKCk7XG5cdFx0XG5cdFx0aWYgKHRoaXMuX2dlb21EaXJ0eSlcblx0XHRcdHRoaXMudXBkYXRlR2VvbWV0cnkoKTtcblxuXHRcdGlmICh0aGlzLl91dkRpcnR5KVxuXHRcdFx0dGhpcy51cGRhdGVVVnMoKTtcblx0fVxuXG5cblx0cHVibGljIF9wQ3JlYXRlT2JqZWN0KCk6RGlzcGxheU9iamVjdFxuXHR7XG5cdFx0dmFyIG1lc2g6TWVzaCA9IG5ldyBNZXNoKHRoaXMuX2dlb21ldHJ5LCB0aGlzLl9tYXRlcmlhbCk7XG5cdFx0bWVzaC5faVNvdXJjZVByZWZhYiA9IHRoaXM7XG5cblx0XHRyZXR1cm4gbWVzaDtcblx0fVxuXG5cbi8vXHRcdHB1YmxpYyBfcENyZWF0ZUJhdGNoT2JqZWN0KCk6QmF0Y2hPYmplY3Rcbi8vXHRcdHtcbi8vXHRcdFx0dmFyIGJhdGNoOkJhdGNoT2JqZWN0ID0gbmV3IEJhdGNoT2JqZWN0KHRoaXMuX2dlb21ldHJ5LCB0aGlzLl9tYXRlcmlhbCk7XG4vL1x0XHRcdGJhdGNoLl9pU291cmNlUHJlZmFiID0gdGhpcztcbi8vXG4vL1x0XHRcdHJldHVybiBiYXRjaDtcbi8vXHRcdH1cbn1cblxuZXhwb3J0ID0gUHJpbWl0aXZlUHJlZmFiQmFzZTsiXX0=