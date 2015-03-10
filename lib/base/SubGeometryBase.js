var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var NamedAssetBase = require("awayjs-core/lib/library/NamedAssetBase");
var AbstractMethodError = require("awayjs-core/lib/errors/AbstractMethodError");
var SubGeometryEvent = require("awayjs-display/lib/events/SubGeometryEvent");
/**
 * @class away.base.TriangleSubGeometry
 */
var SubGeometryBase = (function (_super) {
    __extends(SubGeometryBase, _super);
    /**
     *
     */
    function SubGeometryBase(concatenatedArrays) {
        _super.call(this);
        this._pStrideOffsetDirty = true;
        this._pConcatenateArrays = true;
        this._pStride = new Object();
        this._pOffset = new Object();
        this._pConcatenateArrays = concatenatedArrays;
    }
    SubGeometryBase.prototype._pUpdateStrideOffset = function () {
        throw new AbstractMethodError();
    };
    Object.defineProperty(SubGeometryBase.prototype, "subMeshClass", {
        get: function () {
            return this._pSubMeshClass;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SubGeometryBase.prototype, "concatenateArrays", {
        /**
         *
         */
        get: function () {
            return this._pConcatenateArrays;
        },
        set: function (value) {
            if (this._pConcatenateArrays == value)
                return;
            this._pConcatenateArrays = value;
            this._pStrideOffsetDirty = true;
            if (value)
                this._pNotifyVerticesUpdate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SubGeometryBase.prototype, "indices", {
        /**
         * The raw index data that define the faces.
         */
        get: function () {
            return this._pIndices;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SubGeometryBase.prototype, "vertices", {
        /**
         *
         */
        get: function () {
            this.updateVertices();
            return this._pVertices;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SubGeometryBase.prototype, "numTriangles", {
        /**
         * The total amount of triangles in the TriangleSubGeometry.
         */
        get: function () {
            return this._numTriangles;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SubGeometryBase.prototype, "numVertices", {
        get: function () {
            return this._pNumVertices;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     */
    SubGeometryBase.prototype.getStride = function (dataType) {
        if (this._pStrideOffsetDirty)
            this._pUpdateStrideOffset();
        return this._pStride[dataType];
    };
    /**
     *
     */
    SubGeometryBase.prototype.getOffset = function (dataType) {
        if (this._pStrideOffsetDirty)
            this._pUpdateStrideOffset();
        return this._pOffset[dataType];
    };
    SubGeometryBase.prototype.updateVertices = function () {
        throw new AbstractMethodError();
    };
    /**
     *
     */
    SubGeometryBase.prototype.dispose = function () {
        this._pIndices = null;
        this._pVertices = null;
    };
    /**
     * Updates the face indices of the TriangleSubGeometry.
     *
     * @param indices The face indices to upload.
     */
    SubGeometryBase.prototype.updateIndices = function (indices) {
        this._pIndices = indices;
        this._numIndices = indices.length;
        this._numTriangles = this._numIndices / 3;
        this.notifyIndicesUpdate();
    };
    /**
     * @protected
     */
    SubGeometryBase.prototype.pInvalidateBounds = function () {
        if (this.parentGeometry)
            this.parentGeometry.iInvalidateBounds(this);
    };
    /**
     * Clones the current object
     * @return An exact duplicate of the current object.
     */
    SubGeometryBase.prototype.clone = function () {
        throw new AbstractMethodError();
    };
    SubGeometryBase.prototype.applyTransformation = function (transform) {
    };
    /**
     * Scales the geometry.
     * @param scale The amount by which to scale.
     */
    SubGeometryBase.prototype.scale = function (scale) {
    };
    SubGeometryBase.prototype.scaleUV = function (scaleU, scaleV) {
        if (scaleU === void 0) { scaleU = 1; }
        if (scaleV === void 0) { scaleV = 1; }
    };
    SubGeometryBase.prototype.getBoundingPositions = function () {
        throw new AbstractMethodError();
    };
    SubGeometryBase.prototype.notifyIndicesUpdate = function () {
        if (!this._indicesUpdated)
            this._indicesUpdated = new SubGeometryEvent(SubGeometryEvent.INDICES_UPDATED);
        this.dispatchEvent(this._indicesUpdated);
    };
    SubGeometryBase.prototype._pNotifyVerticesUpdate = function () {
        throw new AbstractMethodError();
    };
    SubGeometryBase.VERTEX_DATA = "vertices";
    return SubGeometryBase;
})(NamedAssetBase);
module.exports = SubGeometryBase;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL1N1Ykdlb21ldHJ5QmFzZS50cyJdLCJuYW1lcyI6WyJTdWJHZW9tZXRyeUJhc2UiLCJTdWJHZW9tZXRyeUJhc2UuY29uc3RydWN0b3IiLCJTdWJHZW9tZXRyeUJhc2UuX3BVcGRhdGVTdHJpZGVPZmZzZXQiLCJTdWJHZW9tZXRyeUJhc2Uuc3ViTWVzaENsYXNzIiwiU3ViR2VvbWV0cnlCYXNlLmNvbmNhdGVuYXRlQXJyYXlzIiwiU3ViR2VvbWV0cnlCYXNlLmluZGljZXMiLCJTdWJHZW9tZXRyeUJhc2UudmVydGljZXMiLCJTdWJHZW9tZXRyeUJhc2UubnVtVHJpYW5nbGVzIiwiU3ViR2VvbWV0cnlCYXNlLm51bVZlcnRpY2VzIiwiU3ViR2VvbWV0cnlCYXNlLmdldFN0cmlkZSIsIlN1Ykdlb21ldHJ5QmFzZS5nZXRPZmZzZXQiLCJTdWJHZW9tZXRyeUJhc2UudXBkYXRlVmVydGljZXMiLCJTdWJHZW9tZXRyeUJhc2UuZGlzcG9zZSIsIlN1Ykdlb21ldHJ5QmFzZS51cGRhdGVJbmRpY2VzIiwiU3ViR2VvbWV0cnlCYXNlLnBJbnZhbGlkYXRlQm91bmRzIiwiU3ViR2VvbWV0cnlCYXNlLmNsb25lIiwiU3ViR2VvbWV0cnlCYXNlLmFwcGx5VHJhbnNmb3JtYXRpb24iLCJTdWJHZW9tZXRyeUJhc2Uuc2NhbGUiLCJTdWJHZW9tZXRyeUJhc2Uuc2NhbGVVViIsIlN1Ykdlb21ldHJ5QmFzZS5nZXRCb3VuZGluZ1Bvc2l0aW9ucyIsIlN1Ykdlb21ldHJ5QmFzZS5ub3RpZnlJbmRpY2VzVXBkYXRlIiwiU3ViR2VvbWV0cnlCYXNlLl9wTm90aWZ5VmVydGljZXNVcGRhdGUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQU8sY0FBYyxXQUFhLHdDQUF3QyxDQUFDLENBQUM7QUFHNUUsSUFBTyxtQkFBbUIsV0FBWSw0Q0FBNEMsQ0FBQyxDQUFDO0FBSXBGLElBQU8sZ0JBQWdCLFdBQWEsNENBQTRDLENBQUMsQ0FBQztBQUVs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LE1BQU1BLElBQUlBLG1CQUFtQkEsRUFBRUEsQ0FBQ0E7SUFDakNBLENBQUNBO0lBRU9uQiw2Q0FBbUJBLEdBQTNCQTtRQUVDb0IsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsZUFBZUEsQ0FBQ0E7WUFDekJBLElBQUlBLENBQUNBLGVBQWVBLEdBQUdBLElBQUlBLGdCQUFnQkEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxlQUFlQSxDQUFDQSxDQUFDQTtRQUUvRUEsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsQ0FBQ0E7SUFDMUNBLENBQUNBO0lBRU1wQixnREFBc0JBLEdBQTdCQTtRQUVDcUIsTUFBTUEsSUFBSUEsbUJBQW1CQSxFQUFFQSxDQUFDQTtJQUNqQ0EsQ0FBQ0E7SUEzTWFyQiwyQkFBV0EsR0FBVUEsVUFBVUEsQ0FBQ0E7SUE0TS9DQSxzQkFBQ0E7QUFBREEsQ0E5TUEsQUE4TUNBLEVBOU02QixjQUFjLEVBOE0zQztBQUVELEFBQXlCLGlCQUFoQixlQUFlLENBQUMiLCJmaWxlIjoiYmFzZS9TdWJHZW9tZXRyeUJhc2UuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5hbWVkQXNzZXRCYXNlXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvTmFtZWRBc3NldEJhc2VcIik7XHJcbmltcG9ydCBNYXRyaXgzRFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9NYXRyaXgzRFwiKTtcclxuaW1wb3J0IFJlY3RhbmdsZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vUmVjdGFuZ2xlXCIpO1xyXG5pbXBvcnQgQWJzdHJhY3RNZXRob2RFcnJvclx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXJyb3JzL0Fic3RyYWN0TWV0aG9kRXJyb3JcIik7XHJcblxyXG5pbXBvcnQgR2VvbWV0cnlcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvR2VvbWV0cnlcIik7XHJcbmltcG9ydCBJU3ViTWVzaENsYXNzXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvSVN1Yk1lc2hDbGFzc1wiKTtcclxuaW1wb3J0IFN1Ykdlb21ldHJ5RXZlbnRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZXZlbnRzL1N1Ykdlb21ldHJ5RXZlbnRcIik7XHJcblxyXG4vKipcclxuICogQGNsYXNzIGF3YXkuYmFzZS5UcmlhbmdsZVN1Ykdlb21ldHJ5XHJcbiAqL1xyXG5jbGFzcyBTdWJHZW9tZXRyeUJhc2UgZXh0ZW5kcyBOYW1lZEFzc2V0QmFzZVxyXG57XHJcblx0cHVibGljIHN0YXRpYyBWRVJURVhfREFUQTpzdHJpbmcgPSBcInZlcnRpY2VzXCI7XHJcblxyXG5cdHB1YmxpYyBfcFN0cmlkZU9mZnNldERpcnR5OmJvb2xlYW4gPSB0cnVlO1xyXG5cclxuXHRwdWJsaWMgX3BJbmRpY2VzOkFycmF5PG51bWJlcj4gLyp1aW50Ki87XHJcblx0cHVibGljIF9wVmVydGljZXM6QXJyYXk8bnVtYmVyPjtcclxuXHJcblx0cHJpdmF0ZSBfbnVtSW5kaWNlczpudW1iZXI7XHJcblx0cHJpdmF0ZSBfbnVtVHJpYW5nbGVzOm51bWJlcjtcclxuXHRwdWJsaWMgX3BOdW1WZXJ0aWNlczpudW1iZXI7XHJcblxyXG5cdHB1YmxpYyBfcENvbmNhdGVuYXRlQXJyYXlzOmJvb2xlYW4gPSB0cnVlO1xyXG5cclxuXHRwcml2YXRlIF9pbmRpY2VzVXBkYXRlZDpTdWJHZW9tZXRyeUV2ZW50O1xyXG5cclxuXHRwdWJsaWMgX3BTdHJpZGU6T2JqZWN0ID0gbmV3IE9iamVjdCgpO1xyXG5cdHB1YmxpYyBfcE9mZnNldDpPYmplY3QgPSBuZXcgT2JqZWN0KCk7XHJcblxyXG5cdHB1YmxpYyBfcFVwZGF0ZVN0cmlkZU9mZnNldCgpXHJcblx0e1xyXG5cdFx0dGhyb3cgbmV3IEFic3RyYWN0TWV0aG9kRXJyb3IoKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBfcFN1Yk1lc2hDbGFzczpJU3ViTWVzaENsYXNzO1xyXG5cclxuXHRwdWJsaWMgZ2V0IHN1Yk1lc2hDbGFzcygpOklTdWJNZXNoQ2xhc3NcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcFN1Yk1lc2hDbGFzcztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCBjb25jYXRlbmF0ZUFycmF5cygpOmJvb2xlYW5cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcENvbmNhdGVuYXRlQXJyYXlzO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBjb25jYXRlbmF0ZUFycmF5cyh2YWx1ZTpib29sZWFuKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9wQ29uY2F0ZW5hdGVBcnJheXMgPT0gdmFsdWUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9wQ29uY2F0ZW5hdGVBcnJheXMgPSB2YWx1ZTtcclxuXHJcblx0XHR0aGlzLl9wU3RyaWRlT2Zmc2V0RGlydHkgPSB0cnVlO1xyXG5cclxuXHRcdGlmICh2YWx1ZSlcclxuXHRcdFx0dGhpcy5fcE5vdGlmeVZlcnRpY2VzVXBkYXRlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgcmF3IGluZGV4IGRhdGEgdGhhdCBkZWZpbmUgdGhlIGZhY2VzLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgaW5kaWNlcygpOkFycmF5PG51bWJlcj5cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcEluZGljZXM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHZlcnRpY2VzKCk6QXJyYXk8bnVtYmVyPlxyXG5cdHtcclxuXHRcdHRoaXMudXBkYXRlVmVydGljZXMoKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fcFZlcnRpY2VzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIHRvdGFsIGFtb3VudCBvZiB0cmlhbmdsZXMgaW4gdGhlIFRyaWFuZ2xlU3ViR2VvbWV0cnkuXHJcblx0ICovXHJcblx0cHVibGljIGdldCBudW1UcmlhbmdsZXMoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fbnVtVHJpYW5nbGVzO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGdldCBudW1WZXJ0aWNlcygpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9wTnVtVmVydGljZXM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGNvbmNhdGVuYXRlZEFycmF5czpib29sZWFuKVxyXG5cdHtcclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0dGhpcy5fcENvbmNhdGVuYXRlQXJyYXlzID0gY29uY2F0ZW5hdGVkQXJyYXlzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0U3RyaWRlKGRhdGFUeXBlOnN0cmluZylcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fcFN0cmlkZU9mZnNldERpcnR5KVxyXG5cdFx0XHR0aGlzLl9wVXBkYXRlU3RyaWRlT2Zmc2V0KCk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX3BTdHJpZGVbZGF0YVR5cGVdO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0T2Zmc2V0KGRhdGFUeXBlOnN0cmluZylcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fcFN0cmlkZU9mZnNldERpcnR5KVxyXG5cdFx0XHR0aGlzLl9wVXBkYXRlU3RyaWRlT2Zmc2V0KCk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX3BPZmZzZXRbZGF0YVR5cGVdO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHVwZGF0ZVZlcnRpY2VzKClcclxuXHR7XHJcblx0XHR0aHJvdyBuZXcgQWJzdHJhY3RNZXRob2RFcnJvcigpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZGlzcG9zZSgpXHJcblx0e1xyXG5cdFx0dGhpcy5fcEluZGljZXMgPSBudWxsO1xyXG5cdFx0dGhpcy5fcFZlcnRpY2VzID0gbnVsbDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFVwZGF0ZXMgdGhlIGZhY2UgaW5kaWNlcyBvZiB0aGUgVHJpYW5nbGVTdWJHZW9tZXRyeS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBpbmRpY2VzIFRoZSBmYWNlIGluZGljZXMgdG8gdXBsb2FkLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyB1cGRhdGVJbmRpY2VzKGluZGljZXM6QXJyYXk8bnVtYmVyPilcclxuXHR7XHJcblx0XHR0aGlzLl9wSW5kaWNlcyA9IGluZGljZXM7XHJcblx0XHR0aGlzLl9udW1JbmRpY2VzID0gaW5kaWNlcy5sZW5ndGg7XHJcblxyXG5cdFx0dGhpcy5fbnVtVHJpYW5nbGVzID0gdGhpcy5fbnVtSW5kaWNlcy8zO1xyXG5cclxuXHRcdHRoaXMubm90aWZ5SW5kaWNlc1VwZGF0ZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHByb3RlY3RlZFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBwSW52YWxpZGF0ZUJvdW5kcygpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMucGFyZW50R2VvbWV0cnkpXHJcblx0XHRcdHRoaXMucGFyZW50R2VvbWV0cnkuaUludmFsaWRhdGVCb3VuZHModGhpcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgR2VvbWV0cnkgb2JqZWN0IHRoYXQgJ293bnMnIHRoaXMgVHJpYW5nbGVTdWJHZW9tZXRyeSBvYmplY3QuXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBwYXJlbnRHZW9tZXRyeTpHZW9tZXRyeTtcclxuXHJcblx0LyoqXHJcblx0ICogQ2xvbmVzIHRoZSBjdXJyZW50IG9iamVjdFxyXG5cdCAqIEByZXR1cm4gQW4gZXhhY3QgZHVwbGljYXRlIG9mIHRoZSBjdXJyZW50IG9iamVjdC5cclxuXHQgKi9cclxuXHRwdWJsaWMgY2xvbmUoKTpTdWJHZW9tZXRyeUJhc2VcclxuXHR7XHJcblx0XHR0aHJvdyBuZXcgQWJzdHJhY3RNZXRob2RFcnJvcigpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGFwcGx5VHJhbnNmb3JtYXRpb24odHJhbnNmb3JtOk1hdHJpeDNEKVxyXG5cdHtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTY2FsZXMgdGhlIGdlb21ldHJ5LlxyXG5cdCAqIEBwYXJhbSBzY2FsZSBUaGUgYW1vdW50IGJ5IHdoaWNoIHRvIHNjYWxlLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzY2FsZShzY2FsZTpudW1iZXIpXHJcblx0e1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzY2FsZVVWKHNjYWxlVTpudW1iZXIgPSAxLCBzY2FsZVY6bnVtYmVyID0gMSlcclxuXHR7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGdldEJvdW5kaW5nUG9zaXRpb25zKCk6QXJyYXk8bnVtYmVyPlxyXG5cdHtcclxuXHRcdHRocm93IG5ldyBBYnN0cmFjdE1ldGhvZEVycm9yKCk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIG5vdGlmeUluZGljZXNVcGRhdGUoKVxyXG5cdHtcclxuXHRcdGlmICghdGhpcy5faW5kaWNlc1VwZGF0ZWQpXHJcblx0XHRcdHRoaXMuX2luZGljZXNVcGRhdGVkID0gbmV3IFN1Ykdlb21ldHJ5RXZlbnQoU3ViR2VvbWV0cnlFdmVudC5JTkRJQ0VTX1VQREFURUQpO1xyXG5cclxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCh0aGlzLl9pbmRpY2VzVXBkYXRlZCk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgX3BOb3RpZnlWZXJ0aWNlc1VwZGF0ZSgpXHJcblx0e1xyXG5cdFx0dGhyb3cgbmV3IEFic3RyYWN0TWV0aG9kRXJyb3IoKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCA9IFN1Ykdlb21ldHJ5QmFzZTsiXX0=