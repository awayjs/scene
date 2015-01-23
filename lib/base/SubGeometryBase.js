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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL1N1Ykdlb21ldHJ5QmFzZS50cyJdLCJuYW1lcyI6WyJTdWJHZW9tZXRyeUJhc2UiLCJTdWJHZW9tZXRyeUJhc2UuY29uc3RydWN0b3IiLCJTdWJHZW9tZXRyeUJhc2UuX3BVcGRhdGVTdHJpZGVPZmZzZXQiLCJTdWJHZW9tZXRyeUJhc2Uuc3ViTWVzaENsYXNzIiwiU3ViR2VvbWV0cnlCYXNlLmNvbmNhdGVuYXRlQXJyYXlzIiwiU3ViR2VvbWV0cnlCYXNlLmluZGljZXMiLCJTdWJHZW9tZXRyeUJhc2UudmVydGljZXMiLCJTdWJHZW9tZXRyeUJhc2UubnVtVHJpYW5nbGVzIiwiU3ViR2VvbWV0cnlCYXNlLm51bVZlcnRpY2VzIiwiU3ViR2VvbWV0cnlCYXNlLmdldFN0cmlkZSIsIlN1Ykdlb21ldHJ5QmFzZS5nZXRPZmZzZXQiLCJTdWJHZW9tZXRyeUJhc2UudXBkYXRlVmVydGljZXMiLCJTdWJHZW9tZXRyeUJhc2UuZGlzcG9zZSIsIlN1Ykdlb21ldHJ5QmFzZS51cGRhdGVJbmRpY2VzIiwiU3ViR2VvbWV0cnlCYXNlLnBJbnZhbGlkYXRlQm91bmRzIiwiU3ViR2VvbWV0cnlCYXNlLmNsb25lIiwiU3ViR2VvbWV0cnlCYXNlLmFwcGx5VHJhbnNmb3JtYXRpb24iLCJTdWJHZW9tZXRyeUJhc2Uuc2NhbGUiLCJTdWJHZW9tZXRyeUJhc2Uuc2NhbGVVViIsIlN1Ykdlb21ldHJ5QmFzZS5nZXRCb3VuZGluZ1Bvc2l0aW9ucyIsIlN1Ykdlb21ldHJ5QmFzZS5ub3RpZnlJbmRpY2VzVXBkYXRlIiwiU3ViR2VvbWV0cnlCYXNlLl9wTm90aWZ5VmVydGljZXNVcGRhdGUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQU8sY0FBYyxXQUFhLHdDQUF3QyxDQUFDLENBQUM7QUFHNUUsSUFBTyxtQkFBbUIsV0FBWSw0Q0FBNEMsQ0FBQyxDQUFDO0FBSXBGLElBQU8sZ0JBQWdCLFdBQWEsNENBQTRDLENBQUMsQ0FBQztBQUVs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LE1BQU1BLElBQUlBLG1CQUFtQkEsRUFBRUEsQ0FBQ0E7SUFDakNBLENBQUNBO0lBRU9uQiw2Q0FBbUJBLEdBQTNCQTtRQUVDb0IsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsZUFBZUEsQ0FBQ0E7WUFDekJBLElBQUlBLENBQUNBLGVBQWVBLEdBQUdBLElBQUlBLGdCQUFnQkEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxlQUFlQSxDQUFDQSxDQUFDQTtRQUUvRUEsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsQ0FBQ0E7SUFDMUNBLENBQUNBO0lBRU1wQixnREFBc0JBLEdBQTdCQTtRQUVDcUIsTUFBTUEsSUFBSUEsbUJBQW1CQSxFQUFFQSxDQUFDQTtJQUNqQ0EsQ0FBQ0E7SUEzTWFyQiwyQkFBV0EsR0FBVUEsVUFBVUEsQ0FBQ0E7SUE0TS9DQSxzQkFBQ0E7QUFBREEsQ0E5TUEsQUE4TUNBLEVBOU02QixjQUFjLEVBOE0zQztBQUVELEFBQXlCLGlCQUFoQixlQUFlLENBQUMiLCJmaWxlIjoiYmFzZS9TdWJHZW9tZXRyeUJhc2UuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5hbWVkQXNzZXRCYXNlXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvTmFtZWRBc3NldEJhc2VcIik7XG5pbXBvcnQgTWF0cml4M0RcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vTWF0cml4M0RcIik7XG5pbXBvcnQgUmVjdGFuZ2xlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9SZWN0YW5nbGVcIik7XG5pbXBvcnQgQWJzdHJhY3RNZXRob2RFcnJvclx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXJyb3JzL0Fic3RyYWN0TWV0aG9kRXJyb3JcIik7XG5cbmltcG9ydCBHZW9tZXRyeVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9HZW9tZXRyeVwiKTtcbmltcG9ydCBJU3ViTWVzaENsYXNzXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvSVN1Yk1lc2hDbGFzc1wiKTtcbmltcG9ydCBTdWJHZW9tZXRyeUV2ZW50XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2V2ZW50cy9TdWJHZW9tZXRyeUV2ZW50XCIpO1xuXG4vKipcbiAqIEBjbGFzcyBhd2F5LmJhc2UuVHJpYW5nbGVTdWJHZW9tZXRyeVxuICovXG5jbGFzcyBTdWJHZW9tZXRyeUJhc2UgZXh0ZW5kcyBOYW1lZEFzc2V0QmFzZVxue1xuXHRwdWJsaWMgc3RhdGljIFZFUlRFWF9EQVRBOnN0cmluZyA9IFwidmVydGljZXNcIjtcblxuXHRwdWJsaWMgX3BTdHJpZGVPZmZzZXREaXJ0eTpib29sZWFuID0gdHJ1ZTtcblxuXHRwdWJsaWMgX3BJbmRpY2VzOkFycmF5PG51bWJlcj4gLyp1aW50Ki87XG5cdHB1YmxpYyBfcFZlcnRpY2VzOkFycmF5PG51bWJlcj47XG5cblx0cHJpdmF0ZSBfbnVtSW5kaWNlczpudW1iZXI7XG5cdHByaXZhdGUgX251bVRyaWFuZ2xlczpudW1iZXI7XG5cdHB1YmxpYyBfcE51bVZlcnRpY2VzOm51bWJlcjtcblxuXHRwdWJsaWMgX3BDb25jYXRlbmF0ZUFycmF5czpib29sZWFuID0gdHJ1ZTtcblxuXHRwcml2YXRlIF9pbmRpY2VzVXBkYXRlZDpTdWJHZW9tZXRyeUV2ZW50O1xuXG5cdHB1YmxpYyBfcFN0cmlkZTpPYmplY3QgPSBuZXcgT2JqZWN0KCk7XG5cdHB1YmxpYyBfcE9mZnNldDpPYmplY3QgPSBuZXcgT2JqZWN0KCk7XG5cblx0cHVibGljIF9wVXBkYXRlU3RyaWRlT2Zmc2V0KClcblx0e1xuXHRcdHRocm93IG5ldyBBYnN0cmFjdE1ldGhvZEVycm9yKCk7XG5cdH1cblxuXHRwdWJsaWMgX3BTdWJNZXNoQ2xhc3M6SVN1Yk1lc2hDbGFzcztcblxuXHRwdWJsaWMgZ2V0IHN1Yk1lc2hDbGFzcygpOklTdWJNZXNoQ2xhc3Ncblx0e1xuXHRcdHJldHVybiB0aGlzLl9wU3ViTWVzaENsYXNzO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGNvbmNhdGVuYXRlQXJyYXlzKCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BDb25jYXRlbmF0ZUFycmF5cztcblx0fVxuXG5cdHB1YmxpYyBzZXQgY29uY2F0ZW5hdGVBcnJheXModmFsdWU6Ym9vbGVhbilcblx0e1xuXHRcdGlmICh0aGlzLl9wQ29uY2F0ZW5hdGVBcnJheXMgPT0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9wQ29uY2F0ZW5hdGVBcnJheXMgPSB2YWx1ZTtcblxuXHRcdHRoaXMuX3BTdHJpZGVPZmZzZXREaXJ0eSA9IHRydWU7XG5cblx0XHRpZiAodmFsdWUpXG5cdFx0XHR0aGlzLl9wTm90aWZ5VmVydGljZXNVcGRhdGUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgcmF3IGluZGV4IGRhdGEgdGhhdCBkZWZpbmUgdGhlIGZhY2VzLlxuXHQgKi9cblx0cHVibGljIGdldCBpbmRpY2VzKCk6QXJyYXk8bnVtYmVyPlxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BJbmRpY2VzO1xuXHR9XG5cblx0LyoqXG5cdCAqIFxuXHQgKi9cblx0cHVibGljIGdldCB2ZXJ0aWNlcygpOkFycmF5PG51bWJlcj5cblx0e1xuXHRcdHRoaXMudXBkYXRlVmVydGljZXMoKTtcblxuXHRcdHJldHVybiB0aGlzLl9wVmVydGljZXM7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIHRvdGFsIGFtb3VudCBvZiB0cmlhbmdsZXMgaW4gdGhlIFRyaWFuZ2xlU3ViR2VvbWV0cnkuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IG51bVRyaWFuZ2xlcygpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX251bVRyaWFuZ2xlcztcblx0fVxuXG5cdHB1YmxpYyBnZXQgbnVtVmVydGljZXMoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wTnVtVmVydGljZXM7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdGNvbnN0cnVjdG9yKGNvbmNhdGVuYXRlZEFycmF5czpib29sZWFuKVxuXHR7XG5cdFx0c3VwZXIoKTtcblxuXHRcdHRoaXMuX3BDb25jYXRlbmF0ZUFycmF5cyA9IGNvbmNhdGVuYXRlZEFycmF5cztcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldFN0cmlkZShkYXRhVHlwZTpzdHJpbmcpXG5cdHtcblx0XHRpZiAodGhpcy5fcFN0cmlkZU9mZnNldERpcnR5KVxuXHRcdFx0dGhpcy5fcFVwZGF0ZVN0cmlkZU9mZnNldCgpO1xuXG5cdFx0cmV0dXJuIHRoaXMuX3BTdHJpZGVbZGF0YVR5cGVdO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0T2Zmc2V0KGRhdGFUeXBlOnN0cmluZylcblx0e1xuXHRcdGlmICh0aGlzLl9wU3RyaWRlT2Zmc2V0RGlydHkpXG5cdFx0XHR0aGlzLl9wVXBkYXRlU3RyaWRlT2Zmc2V0KCk7XG5cblx0XHRyZXR1cm4gdGhpcy5fcE9mZnNldFtkYXRhVHlwZV07XG5cdH1cblxuXHRwdWJsaWMgdXBkYXRlVmVydGljZXMoKVxuXHR7XG5cdFx0dGhyb3cgbmV3IEFic3RyYWN0TWV0aG9kRXJyb3IoKTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGRpc3Bvc2UoKVxuXHR7XG5cdFx0dGhpcy5fcEluZGljZXMgPSBudWxsO1xuXHRcdHRoaXMuX3BWZXJ0aWNlcyA9IG51bGw7XG5cdH1cblxuXHQvKipcblx0ICogVXBkYXRlcyB0aGUgZmFjZSBpbmRpY2VzIG9mIHRoZSBUcmlhbmdsZVN1Ykdlb21ldHJ5LlxuXHQgKlxuXHQgKiBAcGFyYW0gaW5kaWNlcyBUaGUgZmFjZSBpbmRpY2VzIHRvIHVwbG9hZC5cblx0ICovXG5cdHB1YmxpYyB1cGRhdGVJbmRpY2VzKGluZGljZXM6QXJyYXk8bnVtYmVyPilcblx0e1xuXHRcdHRoaXMuX3BJbmRpY2VzID0gaW5kaWNlcztcblx0XHR0aGlzLl9udW1JbmRpY2VzID0gaW5kaWNlcy5sZW5ndGg7XG5cblx0XHR0aGlzLl9udW1UcmlhbmdsZXMgPSB0aGlzLl9udW1JbmRpY2VzLzM7XG5cblx0XHR0aGlzLm5vdGlmeUluZGljZXNVcGRhdGUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcHJvdGVjdGVkXG5cdCAqL1xuXHRwdWJsaWMgcEludmFsaWRhdGVCb3VuZHMoKVxuXHR7XG5cdFx0aWYgKHRoaXMucGFyZW50R2VvbWV0cnkpXG5cdFx0XHR0aGlzLnBhcmVudEdlb21ldHJ5LmlJbnZhbGlkYXRlQm91bmRzKHRoaXMpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBHZW9tZXRyeSBvYmplY3QgdGhhdCAnb3ducycgdGhpcyBUcmlhbmdsZVN1Ykdlb21ldHJ5IG9iamVjdC5cblx0ICpcblx0ICogQHByaXZhdGVcblx0ICovXG5cdHB1YmxpYyBwYXJlbnRHZW9tZXRyeTpHZW9tZXRyeTtcblxuXHQvKipcblx0ICogQ2xvbmVzIHRoZSBjdXJyZW50IG9iamVjdFxuXHQgKiBAcmV0dXJuIEFuIGV4YWN0IGR1cGxpY2F0ZSBvZiB0aGUgY3VycmVudCBvYmplY3QuXG5cdCAqL1xuXHRwdWJsaWMgY2xvbmUoKTpTdWJHZW9tZXRyeUJhc2Vcblx0e1xuXHRcdHRocm93IG5ldyBBYnN0cmFjdE1ldGhvZEVycm9yKCk7XG5cdH1cblxuXHRwdWJsaWMgYXBwbHlUcmFuc2Zvcm1hdGlvbih0cmFuc2Zvcm06TWF0cml4M0QpXG5cdHtcblxuXHR9XG5cblx0LyoqXG5cdCAqIFNjYWxlcyB0aGUgZ2VvbWV0cnkuXG5cdCAqIEBwYXJhbSBzY2FsZSBUaGUgYW1vdW50IGJ5IHdoaWNoIHRvIHNjYWxlLlxuXHQgKi9cblx0cHVibGljIHNjYWxlKHNjYWxlOm51bWJlcilcblx0e1xuXG5cdH1cblxuXHRwdWJsaWMgc2NhbGVVVihzY2FsZVU6bnVtYmVyID0gMSwgc2NhbGVWOm51bWJlciA9IDEpXG5cdHtcblxuXHR9XG5cblx0cHVibGljIGdldEJvdW5kaW5nUG9zaXRpb25zKCk6QXJyYXk8bnVtYmVyPlxuXHR7XG5cdFx0dGhyb3cgbmV3IEFic3RyYWN0TWV0aG9kRXJyb3IoKTtcblx0fVxuXG5cdHByaXZhdGUgbm90aWZ5SW5kaWNlc1VwZGF0ZSgpXG5cdHtcblx0XHRpZiAoIXRoaXMuX2luZGljZXNVcGRhdGVkKVxuXHRcdFx0dGhpcy5faW5kaWNlc1VwZGF0ZWQgPSBuZXcgU3ViR2VvbWV0cnlFdmVudChTdWJHZW9tZXRyeUV2ZW50LklORElDRVNfVVBEQVRFRCk7XG5cblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQodGhpcy5faW5kaWNlc1VwZGF0ZWQpO1xuXHR9XG5cblx0cHVibGljIF9wTm90aWZ5VmVydGljZXNVcGRhdGUoKVxuXHR7XG5cdFx0dGhyb3cgbmV3IEFic3RyYWN0TWV0aG9kRXJyb3IoKTtcblx0fVxufVxuXG5leHBvcnQgPSBTdWJHZW9tZXRyeUJhc2U7Il19