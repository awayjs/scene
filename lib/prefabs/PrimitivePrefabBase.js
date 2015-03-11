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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9wcmVmYWJzL1ByaW1pdGl2ZVByZWZhYkJhc2UudHMiXSwibmFtZXMiOlsiUHJpbWl0aXZlUHJlZmFiQmFzZSIsIlByaW1pdGl2ZVByZWZhYkJhc2UuY29uc3RydWN0b3IiLCJQcmltaXRpdmVQcmVmYWJCYXNlLmFzc2V0VHlwZSIsIlByaW1pdGl2ZVByZWZhYkJhc2UuZ2VvbWV0cnlUeXBlIiwiUHJpbWl0aXZlUHJlZmFiQmFzZS5nZW9tZXRyeSIsIlByaW1pdGl2ZVByZWZhYkJhc2UubWF0ZXJpYWwiLCJQcmltaXRpdmVQcmVmYWJCYXNlLl9wQnVpbGRHZW9tZXRyeSIsIlByaW1pdGl2ZVByZWZhYkJhc2UuX3BCdWlsZFVWcyIsIlByaW1pdGl2ZVByZWZhYkJhc2UuaW52YWxpZGF0ZUdlb21ldHJ5VHlwZSIsIlByaW1pdGl2ZVByZWZhYkJhc2UuX3BJbnZhbGlkYXRlR2VvbWV0cnkiLCJQcmltaXRpdmVQcmVmYWJCYXNlLl9wSW52YWxpZGF0ZVVWcyIsIlByaW1pdGl2ZVByZWZhYkJhc2UudXBkYXRlR2VvbWV0cnlUeXBlIiwiUHJpbWl0aXZlUHJlZmFiQmFzZS51cGRhdGVHZW9tZXRyeSIsIlByaW1pdGl2ZVByZWZhYkJhc2UudXBkYXRlVVZzIiwiUHJpbWl0aXZlUHJlZmFiQmFzZS5faVZhbGlkYXRlIiwiUHJpbWl0aXZlUHJlZmFiQmFzZS5fcENyZWF0ZU9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTyxRQUFRLFdBQWUsK0JBQStCLENBQUMsQ0FBQztBQUUvRCxJQUFPLG1CQUFtQixXQUFZLDBDQUEwQyxDQUFDLENBQUM7QUFDbEYsSUFBTyxlQUFlLFdBQWEsc0NBQXNDLENBQUMsQ0FBQztBQUMzRSxJQUFPLG1CQUFtQixXQUFZLDRDQUE0QyxDQUFDLENBQUM7QUFHcEYsSUFBTyxJQUFJLFdBQWdCLGtDQUFrQyxDQUFDLENBQUM7QUFFL0QsSUFBTyxVQUFVLFdBQWMsdUNBQXVDLENBQUMsQ0FBQztB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SUEsQ0FBQ0EsU0FBU0EsRUFBRUEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0E7UUFDekRBLElBQUlBLENBQUNBLGNBQWNBLEdBQUdBLElBQUlBLENBQUNBO1FBRTNCQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtJQUNiQSxDQUFDQTtJQTFMYWYsNkJBQVNBLEdBQVVBLHlCQUF5QkEsQ0FBQ0E7SUFvTTVEQSwwQkFBQ0E7QUFBREEsQ0F0TUEsQUFzTUNBLEVBdE1pQyxVQUFVLEVBc00zQztBQUVELEFBQTZCLGlCQUFwQixtQkFBbUIsQ0FBQyIsImZpbGUiOiJwcmVmYWJzL1ByaW1pdGl2ZVByZWZhYkJhc2UuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdlb21ldHJ5XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9kYXRhL0dlb21ldHJ5XCIpO1xyXG5pbXBvcnQgU3ViR2VvbWV0cnlCYXNlXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2RhdGEvU3ViR2VvbWV0cnlCYXNlXCIpO1xyXG5pbXBvcnQgVHJpYW5nbGVTdWJHZW9tZXRyeVx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZGF0YS9UcmlhbmdsZVN1Ykdlb21ldHJ5XCIpO1xyXG5pbXBvcnQgTGluZVN1Ykdlb21ldHJ5XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2RhdGEvTGluZVN1Ykdlb21ldHJ5XCIpO1xyXG5pbXBvcnQgQWJzdHJhY3RNZXRob2RFcnJvclx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXJyb3JzL0Fic3RyYWN0TWV0aG9kRXJyb3JcIik7XHJcblxyXG5pbXBvcnQgRGlzcGxheU9iamVjdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0Rpc3BsYXlPYmplY3RcIik7XHJcbmltcG9ydCBNZXNoXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2VudGl0aWVzL01lc2hcIik7XHJcbmltcG9ydCBNYXRlcmlhbEJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9tYXRlcmlhbHMvTWF0ZXJpYWxCYXNlXCIpO1xyXG5pbXBvcnQgUHJlZmFiQmFzZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3ByZWZhYnMvUHJlZmFiQmFzZVwiKTtcclxuXHJcbi8qKlxyXG4gKiBQcmltaXRpdmVQcmVmYWJCYXNlIGlzIGFuIGFic3RyYWN0IGJhc2UgY2xhc3MgZm9yIHBvbHl0b3BlIHByZWZhYnMsIHdoaWNoIGFyZSBzaW1wbGUgcHJlLWJ1aWx0IGdlb21ldHJpYyBzaGFwZXNcclxuICovXHJcbmNsYXNzIFByaW1pdGl2ZVByZWZhYkJhc2UgZXh0ZW5kcyBQcmVmYWJCYXNlXHJcbntcclxuXHRwdWJsaWMgc3RhdGljIGFzc2V0VHlwZTpzdHJpbmcgPSBcIlthc3NldCBQcmltaXRpdmVQcmVmYWJdXCI7XHJcblxyXG5cdHB1YmxpYyBfZ2VvbURpcnR5OmJvb2xlYW4gPSB0cnVlO1xyXG5cdHB1YmxpYyBfdXZEaXJ0eTpib29sZWFuID0gdHJ1ZTtcclxuXHJcblx0cHJpdmF0ZSBfbWF0ZXJpYWw6TWF0ZXJpYWxCYXNlO1xyXG5cdHByaXZhdGUgX2dlb21ldHJ5Okdlb21ldHJ5O1xyXG5cdHByaXZhdGUgX3N1Ykdlb21ldHJ5OlN1Ykdlb21ldHJ5QmFzZTtcclxuXHRwcml2YXRlIF9nZW9tZXRyeVR5cGU6c3RyaW5nO1xyXG5cdHByaXZhdGUgX2dlb21ldHJ5VHlwZURpcnR5OmJvb2xlYW4gPSB0cnVlO1xyXG5cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGFzc2V0VHlwZSgpOnN0cmluZ1xyXG5cdHtcclxuXHRcdHJldHVybiBQcmltaXRpdmVQcmVmYWJCYXNlLmFzc2V0VHlwZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgZ2VvbWV0cnlUeXBlKCk6c3RyaW5nXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2dlb21ldHJ5VHlwZTtcclxuXHR9XHJcblx0XHJcblx0cHVibGljIHNldCBnZW9tZXRyeVR5cGUodmFsdWU6c3RyaW5nKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9nZW9tZXRyeVR5cGUgPT0gdmFsdWUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9nZW9tZXRyeVR5cGUgPSB2YWx1ZTtcclxuXHRcdFxyXG5cdFx0dGhpcy5pbnZhbGlkYXRlR2VvbWV0cnlUeXBlKCk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0IGdlb21ldHJ5KCk6R2VvbWV0cnlcclxuXHR7XHJcblx0XHR0aGlzLl9pVmFsaWRhdGUoKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fZ2VvbWV0cnk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgbWF0ZXJpYWwgd2l0aCB3aGljaCB0byByZW5kZXIgdGhlIHByaW1pdGl2ZS5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IG1hdGVyaWFsKCk6TWF0ZXJpYWxCYXNlXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX21hdGVyaWFsO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBtYXRlcmlhbCh2YWx1ZTpNYXRlcmlhbEJhc2UpXHJcblx0e1xyXG5cdFx0aWYgKHZhbHVlID09IHRoaXMuX21hdGVyaWFsKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fbWF0ZXJpYWwgPSB2YWx1ZTtcclxuXHJcblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX3BPYmplY3RzLmxlbmd0aDtcclxuXHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IGxlbjsgaSsrKVxyXG5cdFx0XHQoPE1lc2g+IHRoaXMuX3BPYmplY3RzW2ldKS5tYXRlcmlhbCA9IHRoaXMuX21hdGVyaWFsO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhIG5ldyBQcmltaXRpdmVQcmVmYWJCYXNlIG9iamVjdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBtYXRlcmlhbCBUaGUgbWF0ZXJpYWwgd2l0aCB3aGljaCB0byByZW5kZXIgdGhlIG9iamVjdFxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKG1hdGVyaWFsOk1hdGVyaWFsQmFzZSA9IG51bGwsIGdlb21ldHJ5VHlwZTpzdHJpbmcgPSBcInRyaWFuZ2xlU3ViR2VvbWV0cnlcIilcclxuXHR7XHJcblx0XHRzdXBlcigpO1xyXG5cclxuXHRcdHRoaXMuX2dlb21ldHJ5ID0gbmV3IEdlb21ldHJ5KCk7XHJcblx0XHR0aGlzLl9tYXRlcmlhbCA9IG1hdGVyaWFsO1xyXG5cdFx0dGhpcy5fZ2VvbWV0cnlUeXBlID0gZ2VvbWV0cnlUeXBlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQnVpbGRzIHRoZSBwcmltaXRpdmUncyBnZW9tZXRyeSB3aGVuIGludmFsaWQuIFRoaXMgbWV0aG9kIHNob3VsZCBub3QgYmUgY2FsbGVkIGRpcmVjdGx5LiBUaGUgY2FsbGluZyBzaG91bGRcclxuXHQgKiBiZSB0cmlnZ2VyZWQgYnkgdGhlIGludmFsaWRhdGVHZW9tZXRyeSBtZXRob2QgKGFuZCBpbiB0dXJuIGJ5IHVwZGF0ZUdlb21ldHJ5KS5cclxuXHQgKi9cclxuXHRwdWJsaWMgX3BCdWlsZEdlb21ldHJ5KHRhcmdldDpTdWJHZW9tZXRyeUJhc2UsIGdlb21ldHJ5VHlwZTpzdHJpbmcpXHJcblx0e1xyXG5cdFx0dGhyb3cgbmV3IEFic3RyYWN0TWV0aG9kRXJyb3IoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJ1aWxkcyB0aGUgcHJpbWl0aXZlJ3MgdXYgY29vcmRpbmF0ZXMgd2hlbiBpbnZhbGlkLiBUaGlzIG1ldGhvZCBzaG91bGQgbm90IGJlIGNhbGxlZCBkaXJlY3RseS4gVGhlIGNhbGxpbmdcclxuXHQgKiBzaG91bGQgYmUgdHJpZ2dlcmVkIGJ5IHRoZSBpbnZhbGlkYXRlVVZzIG1ldGhvZCAoYW5kIGluIHR1cm4gYnkgdXBkYXRlVVZzKS5cclxuXHQgKi9cclxuXHRwdWJsaWMgX3BCdWlsZFVWcyh0YXJnZXQ6U3ViR2VvbWV0cnlCYXNlLCBnZW9tZXRyeVR5cGU6c3RyaW5nKVxyXG5cdHtcclxuXHRcdHRocm93IG5ldyBBYnN0cmFjdE1ldGhvZEVycm9yKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJbnZhbGlkYXRlcyB0aGUgcHJpbWl0aXZlJ3MgZ2VvbWV0cnkgdHlwZSwgY2F1c2luZyBpdCB0byBiZSB1cGRhdGVkIHdoZW4gcmVxdWVzdGVkLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBpbnZhbGlkYXRlR2VvbWV0cnlUeXBlKClcclxuXHR7XHJcblx0XHR0aGlzLl9nZW9tZXRyeVR5cGVEaXJ0eSA9IHRydWU7XHJcblx0XHR0aGlzLl9nZW9tRGlydHkgPSB0cnVlO1xyXG5cdFx0dGhpcy5fdXZEaXJ0eSA9IHRydWU7XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIEludmFsaWRhdGVzIHRoZSBwcmltaXRpdmUncyBnZW9tZXRyeSwgY2F1c2luZyBpdCB0byBiZSB1cGRhdGVkIHdoZW4gcmVxdWVzdGVkLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBfcEludmFsaWRhdGVHZW9tZXRyeSgpXHJcblx0e1xyXG5cdFx0dGhpcy5fZ2VvbURpcnR5ID0gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEludmFsaWRhdGVzIHRoZSBwcmltaXRpdmUncyB1diBjb29yZGluYXRlcywgY2F1c2luZyB0aGVtIHRvIGJlIHVwZGF0ZWQgd2hlbiByZXF1ZXN0ZWQuXHJcblx0ICovXHJcblx0cHVibGljIF9wSW52YWxpZGF0ZVVWcygpXHJcblx0e1xyXG5cdFx0dGhpcy5fdXZEaXJ0eSA9IHRydWU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBVcGRhdGVzIHRoZSBzdWJnZW9tZXRyeSB3aGVuIGludmFsaWQuXHJcblx0ICovXHJcblx0cHJpdmF0ZSB1cGRhdGVHZW9tZXRyeVR5cGUoKVxyXG5cdHtcclxuXHRcdC8vcmVtb3ZlIGFueSBleGlzdGluZyBzdWIgZ2VvbWV0cnlcclxuXHRcdGlmICh0aGlzLl9zdWJHZW9tZXRyeSlcclxuXHRcdFx0dGhpcy5fZ2VvbWV0cnkucmVtb3ZlU3ViR2VvbWV0cnkodGhpcy5fc3ViR2VvbWV0cnkpO1xyXG5cclxuXHRcdGlmICh0aGlzLl9nZW9tZXRyeVR5cGUgPT0gXCJ0cmlhbmdsZVN1Ykdlb21ldHJ5XCIpIHtcclxuXHRcdFx0dmFyIHRyaWFuZ2xlR2VvbWV0cnk6VHJpYW5nbGVTdWJHZW9tZXRyeSA9IG5ldyBUcmlhbmdsZVN1Ykdlb21ldHJ5KHRydWUpO1xyXG5cdFx0XHR0cmlhbmdsZUdlb21ldHJ5LmF1dG9EZXJpdmVOb3JtYWxzID0gZmFsc2U7XHJcblx0XHRcdHRyaWFuZ2xlR2VvbWV0cnkuYXV0b0Rlcml2ZVRhbmdlbnRzID0gZmFsc2U7XHJcblx0XHRcdHRyaWFuZ2xlR2VvbWV0cnkuYXV0b0Rlcml2ZVVWcyA9IGZhbHNlO1xyXG5cdFx0XHR0aGlzLl9nZW9tZXRyeS5hZGRTdWJHZW9tZXRyeSh0cmlhbmdsZUdlb21ldHJ5KTtcclxuXHRcdFx0dGhpcy5fc3ViR2VvbWV0cnkgPSB0cmlhbmdsZUdlb21ldHJ5O1xyXG5cdFx0fSBlbHNlIGlmICh0aGlzLl9nZW9tZXRyeVR5cGUgPT0gXCJsaW5lU3ViR2VvbWV0cnlcIikge1xyXG5cdFx0XHR0aGlzLl9nZW9tZXRyeS5hZGRTdWJHZW9tZXRyeSh0aGlzLl9zdWJHZW9tZXRyeSA9IG5ldyBMaW5lU3ViR2VvbWV0cnkoKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5fZ2VvbWV0cnlUeXBlRGlydHkgPSBmYWxzZTtcclxuXHR9XHJcblxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIFVwZGF0ZXMgdGhlIGdlb21ldHJ5IHdoZW4gaW52YWxpZC5cclxuXHQgKi9cclxuXHRwcml2YXRlIHVwZGF0ZUdlb21ldHJ5KClcclxuXHR7XHJcblx0XHR0aGlzLl9wQnVpbGRHZW9tZXRyeSh0aGlzLl9zdWJHZW9tZXRyeSwgdGhpcy5fZ2VvbWV0cnlUeXBlKTtcclxuXHJcblx0XHR0aGlzLl9nZW9tRGlydHkgPSBmYWxzZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFVwZGF0ZXMgdGhlIHV2IGNvb3JkaW5hdGVzIHdoZW4gaW52YWxpZC5cclxuXHQgKi9cclxuXHRwcml2YXRlIHVwZGF0ZVVWcygpXHJcblx0e1xyXG5cdFx0dGhpcy5fcEJ1aWxkVVZzKHRoaXMuX3N1Ykdlb21ldHJ5LCB0aGlzLl9nZW9tZXRyeVR5cGUpO1xyXG5cclxuXHRcdHRoaXMuX3V2RGlydHkgPSBmYWxzZTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBfaVZhbGlkYXRlKClcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fZ2VvbWV0cnlUeXBlRGlydHkpXHJcblx0XHRcdHRoaXMudXBkYXRlR2VvbWV0cnlUeXBlKCk7XHJcblx0XHRcclxuXHRcdGlmICh0aGlzLl9nZW9tRGlydHkpXHJcblx0XHRcdHRoaXMudXBkYXRlR2VvbWV0cnkoKTtcclxuXHJcblx0XHRpZiAodGhpcy5fdXZEaXJ0eSlcclxuXHRcdFx0dGhpcy51cGRhdGVVVnMoKTtcclxuXHR9XHJcblxyXG5cclxuXHRwdWJsaWMgX3BDcmVhdGVPYmplY3QoKTpEaXNwbGF5T2JqZWN0XHJcblx0e1xyXG5cdFx0dmFyIG1lc2g6TWVzaCA9IG5ldyBNZXNoKHRoaXMuX2dlb21ldHJ5LCB0aGlzLl9tYXRlcmlhbCk7XHJcblx0XHRtZXNoLl9pU291cmNlUHJlZmFiID0gdGhpcztcclxuXHJcblx0XHRyZXR1cm4gbWVzaDtcclxuXHR9XHJcblxyXG5cclxuLy9cdFx0cHVibGljIF9wQ3JlYXRlQmF0Y2hPYmplY3QoKTpCYXRjaE9iamVjdFxyXG4vL1x0XHR7XHJcbi8vXHRcdFx0dmFyIGJhdGNoOkJhdGNoT2JqZWN0ID0gbmV3IEJhdGNoT2JqZWN0KHRoaXMuX2dlb21ldHJ5LCB0aGlzLl9tYXRlcmlhbCk7XHJcbi8vXHRcdFx0YmF0Y2guX2lTb3VyY2VQcmVmYWIgPSB0aGlzO1xyXG4vL1xyXG4vL1x0XHRcdHJldHVybiBiYXRjaDtcclxuLy9cdFx0fVxyXG59XHJcblxyXG5leHBvcnQgPSBQcmltaXRpdmVQcmVmYWJCYXNlOyJdfQ==