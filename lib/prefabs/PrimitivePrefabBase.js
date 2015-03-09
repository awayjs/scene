var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AssetType = require("awayjs-core/lib/library/AssetType");
var AbstractMethodError = require("awayjs-core/lib/errors/AbstractMethodError");
var Geometry = require("awayjs-core/lib/data/Geometry");
var TriangleSubGeometry = require("awayjs-core/lib/data/TriangleSubGeometry");
var LineSubGeometry = require("awayjs-core/lib/data/LineSubGeometry");
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
            return AssetType.PRIMITIVE_PREFAB;
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
    return PrimitivePrefabBase;
})(PrefabBase);
module.exports = PrimitivePrefabBase;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9wcmVmYWJzL1ByaW1pdGl2ZVByZWZhYkJhc2UudHMiXSwibmFtZXMiOlsiUHJpbWl0aXZlUHJlZmFiQmFzZSIsIlByaW1pdGl2ZVByZWZhYkJhc2UuY29uc3RydWN0b3IiLCJQcmltaXRpdmVQcmVmYWJCYXNlLmFzc2V0VHlwZSIsIlByaW1pdGl2ZVByZWZhYkJhc2UuZ2VvbWV0cnlUeXBlIiwiUHJpbWl0aXZlUHJlZmFiQmFzZS5nZW9tZXRyeSIsIlByaW1pdGl2ZVByZWZhYkJhc2UubWF0ZXJpYWwiLCJQcmltaXRpdmVQcmVmYWJCYXNlLl9wQnVpbGRHZW9tZXRyeSIsIlByaW1pdGl2ZVByZWZhYkJhc2UuX3BCdWlsZFVWcyIsIlByaW1pdGl2ZVByZWZhYkJhc2UuaW52YWxpZGF0ZUdlb21ldHJ5VHlwZSIsIlByaW1pdGl2ZVByZWZhYkJhc2UuX3BJbnZhbGlkYXRlR2VvbWV0cnkiLCJQcmltaXRpdmVQcmVmYWJCYXNlLl9wSW52YWxpZGF0ZVVWcyIsIlByaW1pdGl2ZVByZWZhYkJhc2UudXBkYXRlR2VvbWV0cnlUeXBlIiwiUHJpbWl0aXZlUHJlZmFiQmFzZS51cGRhdGVHZW9tZXRyeSIsIlByaW1pdGl2ZVByZWZhYkJhc2UudXBkYXRlVVZzIiwiUHJpbWl0aXZlUHJlZmFiQmFzZS5faVZhbGlkYXRlIiwiUHJpbWl0aXZlUHJlZmFiQmFzZS5fcENyZWF0ZU9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTyxTQUFTLFdBQWMsbUNBQW1DLENBQUMsQ0FBQztBQUNuRSxJQUFPLG1CQUFtQixXQUFZLDRDQUE0QyxDQUFDLENBQUM7QUFHcEYsSUFBTyxRQUFRLFdBQWUsK0JBQStCLENBQUMsQ0FBQztBQUUvRCxJQUFPLG1CQUFtQixXQUFZLDBDQUEwQyxDQUFDLENBQUM7QUFDbEYsSUFBTyxlQUFlLFdBQWEsc0NBQXNDLENBQUMsQ0FBQztBQUMzRSxJQUFPLElBQUksV0FBZ0Isa0NBQWtDLENBQUMsQ0FBQztB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QUFJQSxJQUFJQSxHQUFRQSxJQUFJQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxFQUFFQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQTtRQUN6REEsSUFBSUEsQ0FBQ0EsY0FBY0EsR0FBR0EsSUFBSUEsQ0FBQ0E7UUFFM0JBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO0lBQ2JBLENBQUNBO0lBVUZmLDBCQUFDQTtBQUFEQSxDQXBNQSxBQW9NQ0EsRUFwTWlDLFVBQVUsRUFvTTNDO0FBRUQsQUFBNkIsaUJBQXBCLG1CQUFtQixDQUFDIiwiZmlsZSI6InByZWZhYnMvUHJpbWl0aXZlUHJlZmFiQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQXNzZXRUeXBlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9Bc3NldFR5cGVcIik7XHJcbmltcG9ydCBBYnN0cmFjdE1ldGhvZEVycm9yXHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9lcnJvcnMvQWJzdHJhY3RNZXRob2RFcnJvclwiKTtcclxuXHJcbmltcG9ydCBEaXNwbGF5T2JqZWN0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvRGlzcGxheU9iamVjdFwiKTtcclxuaW1wb3J0IEdlb21ldHJ5XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9kYXRhL0dlb21ldHJ5XCIpO1xyXG5pbXBvcnQgU3ViR2VvbWV0cnlCYXNlXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2RhdGEvU3ViR2VvbWV0cnlCYXNlXCIpO1xyXG5pbXBvcnQgVHJpYW5nbGVTdWJHZW9tZXRyeVx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZGF0YS9UcmlhbmdsZVN1Ykdlb21ldHJ5XCIpO1xyXG5pbXBvcnQgTGluZVN1Ykdlb21ldHJ5XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2RhdGEvTGluZVN1Ykdlb21ldHJ5XCIpO1xyXG5pbXBvcnQgTWVzaFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9NZXNoXCIpO1xyXG5pbXBvcnQgTWF0ZXJpYWxCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvbWF0ZXJpYWxzL01hdGVyaWFsQmFzZVwiKTtcclxuaW1wb3J0IFByZWZhYkJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wcmVmYWJzL1ByZWZhYkJhc2VcIik7XHJcblxyXG4vKipcclxuICogUHJpbWl0aXZlUHJlZmFiQmFzZSBpcyBhbiBhYnN0cmFjdCBiYXNlIGNsYXNzIGZvciBwb2x5dG9wZSBwcmVmYWJzLCB3aGljaCBhcmUgc2ltcGxlIHByZS1idWlsdCBnZW9tZXRyaWMgc2hhcGVzXHJcbiAqL1xyXG5jbGFzcyBQcmltaXRpdmVQcmVmYWJCYXNlIGV4dGVuZHMgUHJlZmFiQmFzZVxyXG57XHJcblx0cHVibGljIF9nZW9tRGlydHk6Ym9vbGVhbiA9IHRydWU7XHJcblx0cHVibGljIF91dkRpcnR5OmJvb2xlYW4gPSB0cnVlO1xyXG5cclxuXHRwcml2YXRlIF9tYXRlcmlhbDpNYXRlcmlhbEJhc2U7XHJcblx0cHJpdmF0ZSBfZ2VvbWV0cnk6R2VvbWV0cnk7XHJcblx0cHJpdmF0ZSBfc3ViR2VvbWV0cnk6U3ViR2VvbWV0cnlCYXNlO1xyXG5cdHByaXZhdGUgX2dlb21ldHJ5VHlwZTpzdHJpbmc7XHJcblx0cHJpdmF0ZSBfZ2VvbWV0cnlUeXBlRGlydHk6Ym9vbGVhbiA9IHRydWU7XHJcblxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgYXNzZXRUeXBlKCk6c3RyaW5nXHJcblx0e1xyXG5cdFx0cmV0dXJuIEFzc2V0VHlwZS5QUklNSVRJVkVfUFJFRkFCO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogXHJcblx0ICovXHJcblx0cHVibGljIGdldCBnZW9tZXRyeVR5cGUoKTpzdHJpbmdcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fZ2VvbWV0cnlUeXBlO1xyXG5cdH1cclxuXHRcclxuXHRwdWJsaWMgc2V0IGdlb21ldHJ5VHlwZSh2YWx1ZTpzdHJpbmcpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX2dlb21ldHJ5VHlwZSA9PSB2YWx1ZSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX2dlb21ldHJ5VHlwZSA9IHZhbHVlO1xyXG5cdFx0XHJcblx0XHR0aGlzLmludmFsaWRhdGVHZW9tZXRyeVR5cGUoKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXQgZ2VvbWV0cnkoKTpHZW9tZXRyeVxyXG5cdHtcclxuXHRcdHRoaXMuX2lWYWxpZGF0ZSgpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLl9nZW9tZXRyeTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBtYXRlcmlhbCB3aXRoIHdoaWNoIHRvIHJlbmRlciB0aGUgcHJpbWl0aXZlLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgbWF0ZXJpYWwoKTpNYXRlcmlhbEJhc2VcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fbWF0ZXJpYWw7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IG1hdGVyaWFsKHZhbHVlOk1hdGVyaWFsQmFzZSlcclxuXHR7XHJcblx0XHRpZiAodmFsdWUgPT0gdGhpcy5fbWF0ZXJpYWwpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9tYXRlcmlhbCA9IHZhbHVlO1xyXG5cclxuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fcE9iamVjdHMubGVuZ3RoO1xyXG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgbGVuOyBpKyspXHJcblx0XHRcdCg8TWVzaD4gdGhpcy5fcE9iamVjdHNbaV0pLm1hdGVyaWFsID0gdGhpcy5fbWF0ZXJpYWw7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGEgbmV3IFByaW1pdGl2ZVByZWZhYkJhc2Ugb2JqZWN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG1hdGVyaWFsIFRoZSBtYXRlcmlhbCB3aXRoIHdoaWNoIHRvIHJlbmRlciB0aGUgb2JqZWN0XHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IobWF0ZXJpYWw6TWF0ZXJpYWxCYXNlID0gbnVsbCwgZ2VvbWV0cnlUeXBlOnN0cmluZyA9IFwidHJpYW5nbGVTdWJHZW9tZXRyeVwiKVxyXG5cdHtcclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0dGhpcy5fZ2VvbWV0cnkgPSBuZXcgR2VvbWV0cnkoKTtcclxuXHRcdHRoaXMuX21hdGVyaWFsID0gbWF0ZXJpYWw7XHJcblx0XHR0aGlzLl9nZW9tZXRyeVR5cGUgPSBnZW9tZXRyeVR5cGU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCdWlsZHMgdGhlIHByaW1pdGl2ZSdzIGdlb21ldHJ5IHdoZW4gaW52YWxpZC4gVGhpcyBtZXRob2Qgc2hvdWxkIG5vdCBiZSBjYWxsZWQgZGlyZWN0bHkuIFRoZSBjYWxsaW5nIHNob3VsZFxyXG5cdCAqIGJlIHRyaWdnZXJlZCBieSB0aGUgaW52YWxpZGF0ZUdlb21ldHJ5IG1ldGhvZCAoYW5kIGluIHR1cm4gYnkgdXBkYXRlR2VvbWV0cnkpLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBfcEJ1aWxkR2VvbWV0cnkodGFyZ2V0OlN1Ykdlb21ldHJ5QmFzZSwgZ2VvbWV0cnlUeXBlOnN0cmluZylcclxuXHR7XHJcblx0XHR0aHJvdyBuZXcgQWJzdHJhY3RNZXRob2RFcnJvcigpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQnVpbGRzIHRoZSBwcmltaXRpdmUncyB1diBjb29yZGluYXRlcyB3aGVuIGludmFsaWQuIFRoaXMgbWV0aG9kIHNob3VsZCBub3QgYmUgY2FsbGVkIGRpcmVjdGx5LiBUaGUgY2FsbGluZ1xyXG5cdCAqIHNob3VsZCBiZSB0cmlnZ2VyZWQgYnkgdGhlIGludmFsaWRhdGVVVnMgbWV0aG9kIChhbmQgaW4gdHVybiBieSB1cGRhdGVVVnMpLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBfcEJ1aWxkVVZzKHRhcmdldDpTdWJHZW9tZXRyeUJhc2UsIGdlb21ldHJ5VHlwZTpzdHJpbmcpXHJcblx0e1xyXG5cdFx0dGhyb3cgbmV3IEFic3RyYWN0TWV0aG9kRXJyb3IoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEludmFsaWRhdGVzIHRoZSBwcmltaXRpdmUncyBnZW9tZXRyeSB0eXBlLCBjYXVzaW5nIGl0IHRvIGJlIHVwZGF0ZWQgd2hlbiByZXF1ZXN0ZWQuXHJcblx0ICovXHJcblx0cHVibGljIGludmFsaWRhdGVHZW9tZXRyeVR5cGUoKVxyXG5cdHtcclxuXHRcdHRoaXMuX2dlb21ldHJ5VHlwZURpcnR5ID0gdHJ1ZTtcclxuXHRcdHRoaXMuX2dlb21EaXJ0eSA9IHRydWU7XHJcblx0XHR0aGlzLl91dkRpcnR5ID0gdHJ1ZTtcclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0ICogSW52YWxpZGF0ZXMgdGhlIHByaW1pdGl2ZSdzIGdlb21ldHJ5LCBjYXVzaW5nIGl0IHRvIGJlIHVwZGF0ZWQgd2hlbiByZXF1ZXN0ZWQuXHJcblx0ICovXHJcblx0cHVibGljIF9wSW52YWxpZGF0ZUdlb21ldHJ5KClcclxuXHR7XHJcblx0XHR0aGlzLl9nZW9tRGlydHkgPSB0cnVlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSW52YWxpZGF0ZXMgdGhlIHByaW1pdGl2ZSdzIHV2IGNvb3JkaW5hdGVzLCBjYXVzaW5nIHRoZW0gdG8gYmUgdXBkYXRlZCB3aGVuIHJlcXVlc3RlZC5cclxuXHQgKi9cclxuXHRwdWJsaWMgX3BJbnZhbGlkYXRlVVZzKClcclxuXHR7XHJcblx0XHR0aGlzLl91dkRpcnR5ID0gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFVwZGF0ZXMgdGhlIHN1Ymdlb21ldHJ5IHdoZW4gaW52YWxpZC5cclxuXHQgKi9cclxuXHRwcml2YXRlIHVwZGF0ZUdlb21ldHJ5VHlwZSgpXHJcblx0e1xyXG5cdFx0Ly9yZW1vdmUgYW55IGV4aXN0aW5nIHN1YiBnZW9tZXRyeVxyXG5cdFx0aWYgKHRoaXMuX3N1Ykdlb21ldHJ5KVxyXG5cdFx0XHR0aGlzLl9nZW9tZXRyeS5yZW1vdmVTdWJHZW9tZXRyeSh0aGlzLl9zdWJHZW9tZXRyeSk7XHJcblxyXG5cdFx0aWYgKHRoaXMuX2dlb21ldHJ5VHlwZSA9PSBcInRyaWFuZ2xlU3ViR2VvbWV0cnlcIikge1xyXG5cdFx0XHR2YXIgdHJpYW5nbGVHZW9tZXRyeTpUcmlhbmdsZVN1Ykdlb21ldHJ5ID0gbmV3IFRyaWFuZ2xlU3ViR2VvbWV0cnkodHJ1ZSk7XHJcblx0XHRcdHRyaWFuZ2xlR2VvbWV0cnkuYXV0b0Rlcml2ZU5vcm1hbHMgPSBmYWxzZTtcclxuXHRcdFx0dHJpYW5nbGVHZW9tZXRyeS5hdXRvRGVyaXZlVGFuZ2VudHMgPSBmYWxzZTtcclxuXHRcdFx0dHJpYW5nbGVHZW9tZXRyeS5hdXRvRGVyaXZlVVZzID0gZmFsc2U7XHJcblx0XHRcdHRoaXMuX2dlb21ldHJ5LmFkZFN1Ykdlb21ldHJ5KHRyaWFuZ2xlR2VvbWV0cnkpO1xyXG5cdFx0XHR0aGlzLl9zdWJHZW9tZXRyeSA9IHRyaWFuZ2xlR2VvbWV0cnk7XHJcblx0XHR9IGVsc2UgaWYgKHRoaXMuX2dlb21ldHJ5VHlwZSA9PSBcImxpbmVTdWJHZW9tZXRyeVwiKSB7XHJcblx0XHRcdHRoaXMuX2dlb21ldHJ5LmFkZFN1Ykdlb21ldHJ5KHRoaXMuX3N1Ykdlb21ldHJ5ID0gbmV3IExpbmVTdWJHZW9tZXRyeSgpKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLl9nZW9tZXRyeVR5cGVEaXJ0eSA9IGZhbHNlO1xyXG5cdH1cclxuXHJcblx0XHJcblx0LyoqXHJcblx0ICogVXBkYXRlcyB0aGUgZ2VvbWV0cnkgd2hlbiBpbnZhbGlkLlxyXG5cdCAqL1xyXG5cdHByaXZhdGUgdXBkYXRlR2VvbWV0cnkoKVxyXG5cdHtcclxuXHRcdHRoaXMuX3BCdWlsZEdlb21ldHJ5KHRoaXMuX3N1Ykdlb21ldHJ5LCB0aGlzLl9nZW9tZXRyeVR5cGUpO1xyXG5cclxuXHRcdHRoaXMuX2dlb21EaXJ0eSA9IGZhbHNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVXBkYXRlcyB0aGUgdXYgY29vcmRpbmF0ZXMgd2hlbiBpbnZhbGlkLlxyXG5cdCAqL1xyXG5cdHByaXZhdGUgdXBkYXRlVVZzKClcclxuXHR7XHJcblx0XHR0aGlzLl9wQnVpbGRVVnModGhpcy5fc3ViR2VvbWV0cnksIHRoaXMuX2dlb21ldHJ5VHlwZSk7XHJcblxyXG5cdFx0dGhpcy5fdXZEaXJ0eSA9IGZhbHNlO1xyXG5cdH1cclxuXHJcblx0cHVibGljIF9pVmFsaWRhdGUoKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9nZW9tZXRyeVR5cGVEaXJ0eSlcclxuXHRcdFx0dGhpcy51cGRhdGVHZW9tZXRyeVR5cGUoKTtcclxuXHRcdFxyXG5cdFx0aWYgKHRoaXMuX2dlb21EaXJ0eSlcclxuXHRcdFx0dGhpcy51cGRhdGVHZW9tZXRyeSgpO1xyXG5cclxuXHRcdGlmICh0aGlzLl91dkRpcnR5KVxyXG5cdFx0XHR0aGlzLnVwZGF0ZVVWcygpO1xyXG5cdH1cclxuXHJcblxyXG5cdHB1YmxpYyBfcENyZWF0ZU9iamVjdCgpOkRpc3BsYXlPYmplY3RcclxuXHR7XHJcblx0XHR2YXIgbWVzaDpNZXNoID0gbmV3IE1lc2godGhpcy5fZ2VvbWV0cnksIHRoaXMuX21hdGVyaWFsKTtcclxuXHRcdG1lc2guX2lTb3VyY2VQcmVmYWIgPSB0aGlzO1xyXG5cclxuXHRcdHJldHVybiBtZXNoO1xyXG5cdH1cclxuXHJcblxyXG4vL1x0XHRwdWJsaWMgX3BDcmVhdGVCYXRjaE9iamVjdCgpOkJhdGNoT2JqZWN0XHJcbi8vXHRcdHtcclxuLy9cdFx0XHR2YXIgYmF0Y2g6QmF0Y2hPYmplY3QgPSBuZXcgQmF0Y2hPYmplY3QodGhpcy5fZ2VvbWV0cnksIHRoaXMuX21hdGVyaWFsKTtcclxuLy9cdFx0XHRiYXRjaC5faVNvdXJjZVByZWZhYiA9IHRoaXM7XHJcbi8vXHJcbi8vXHRcdFx0cmV0dXJuIGJhdGNoO1xyXG4vL1x0XHR9XHJcbn1cclxuXHJcbmV4cG9ydCA9IFByaW1pdGl2ZVByZWZhYkJhc2U7Il19