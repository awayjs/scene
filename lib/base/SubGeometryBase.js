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
        console.log("apply");
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL1N1Ykdlb21ldHJ5QmFzZS50cyJdLCJuYW1lcyI6WyJTdWJHZW9tZXRyeUJhc2UiLCJTdWJHZW9tZXRyeUJhc2UuY29uc3RydWN0b3IiLCJTdWJHZW9tZXRyeUJhc2UuX3BVcGRhdGVTdHJpZGVPZmZzZXQiLCJTdWJHZW9tZXRyeUJhc2Uuc3ViTWVzaENsYXNzIiwiU3ViR2VvbWV0cnlCYXNlLmNvbmNhdGVuYXRlQXJyYXlzIiwiU3ViR2VvbWV0cnlCYXNlLmluZGljZXMiLCJTdWJHZW9tZXRyeUJhc2UudmVydGljZXMiLCJTdWJHZW9tZXRyeUJhc2UubnVtVHJpYW5nbGVzIiwiU3ViR2VvbWV0cnlCYXNlLm51bVZlcnRpY2VzIiwiU3ViR2VvbWV0cnlCYXNlLmdldFN0cmlkZSIsIlN1Ykdlb21ldHJ5QmFzZS5nZXRPZmZzZXQiLCJTdWJHZW9tZXRyeUJhc2UudXBkYXRlVmVydGljZXMiLCJTdWJHZW9tZXRyeUJhc2UuZGlzcG9zZSIsIlN1Ykdlb21ldHJ5QmFzZS51cGRhdGVJbmRpY2VzIiwiU3ViR2VvbWV0cnlCYXNlLnBJbnZhbGlkYXRlQm91bmRzIiwiU3ViR2VvbWV0cnlCYXNlLmNsb25lIiwiU3ViR2VvbWV0cnlCYXNlLmFwcGx5VHJhbnNmb3JtYXRpb24iLCJTdWJHZW9tZXRyeUJhc2Uuc2NhbGUiLCJTdWJHZW9tZXRyeUJhc2Uuc2NhbGVVViIsIlN1Ykdlb21ldHJ5QmFzZS5nZXRCb3VuZGluZ1Bvc2l0aW9ucyIsIlN1Ykdlb21ldHJ5QmFzZS5ub3RpZnlJbmRpY2VzVXBkYXRlIiwiU3ViR2VvbWV0cnlCYXNlLl9wTm90aWZ5VmVydGljZXNVcGRhdGUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQU8sY0FBYyxXQUFhLHdDQUF3QyxDQUFDLENBQUM7QUFHNUUsSUFBTyxtQkFBbUIsV0FBWSw0Q0FBNEMsQ0FBQyxDQUFDO0FBSXBGLElBQU8sZ0JBQWdCLFdBQWEsNENBQTRDLENBQUMsQ0FBQztBQUVs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LFVBQWlCQTtJQUduREEsQ0FBQ0E7SUFFTWxCLDhDQUFvQkEsR0FBM0JBO1FBRUNtQixNQUFNQSxJQUFJQSxtQkFBbUJBLEVBQUVBLENBQUNBO0lBQ2pDQSxDQUFDQTtJQUVPbkIsNkNBQW1CQSxHQUEzQkE7UUFFQ29CLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLGVBQWVBLENBQUNBO1lBQ3pCQSxJQUFJQSxDQUFDQSxlQUFlQSxHQUFHQSxJQUFJQSxnQkFBZ0JBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsQ0FBQ0E7UUFFL0VBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLElBQUlBLENBQUNBLGVBQWVBLENBQUNBLENBQUNBO0lBQzFDQSxDQUFDQTtJQUVNcEIsZ0RBQXNCQSxHQUE3QkE7UUFFQ3FCLE1BQU1BLElBQUlBLG1CQUFtQkEsRUFBRUEsQ0FBQ0E7SUFDakNBLENBQUNBO0lBM01hckIsMkJBQVdBLEdBQVVBLFVBQVVBLENBQUNBO0lBNE0vQ0Esc0JBQUNBO0FBQURBLENBOU1BLEFBOE1DQSxFQTlNNkIsY0FBYyxFQThNM0M7QUFFRCxBQUF5QixpQkFBaEIsZUFBZSxDQUFDIiwiZmlsZSI6ImJhc2UvU3ViR2VvbWV0cnlCYXNlLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBOYW1lZEFzc2V0QmFzZVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L05hbWVkQXNzZXRCYXNlXCIpO1xyXG5pbXBvcnQgTWF0cml4M0RcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vTWF0cml4M0RcIik7XHJcbmltcG9ydCBSZWN0YW5nbGVcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1JlY3RhbmdsZVwiKTtcclxuaW1wb3J0IEFic3RyYWN0TWV0aG9kRXJyb3JcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2Vycm9ycy9BYnN0cmFjdE1ldGhvZEVycm9yXCIpO1xyXG5cclxuaW1wb3J0IEdlb21ldHJ5XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0dlb21ldHJ5XCIpO1xyXG5pbXBvcnQgSVN1Yk1lc2hDbGFzc1x0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0lTdWJNZXNoQ2xhc3NcIik7XHJcbmltcG9ydCBTdWJHZW9tZXRyeUV2ZW50XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2V2ZW50cy9TdWJHZW9tZXRyeUV2ZW50XCIpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBhd2F5LmJhc2UuVHJpYW5nbGVTdWJHZW9tZXRyeVxyXG4gKi9cclxuY2xhc3MgU3ViR2VvbWV0cnlCYXNlIGV4dGVuZHMgTmFtZWRBc3NldEJhc2Vcclxue1xyXG5cdHB1YmxpYyBzdGF0aWMgVkVSVEVYX0RBVEE6c3RyaW5nID0gXCJ2ZXJ0aWNlc1wiO1xyXG5cclxuXHRwdWJsaWMgX3BTdHJpZGVPZmZzZXREaXJ0eTpib29sZWFuID0gdHJ1ZTtcclxuXHJcblx0cHVibGljIF9wSW5kaWNlczpBcnJheTxudW1iZXI+IC8qdWludCovO1xyXG5cdHB1YmxpYyBfcFZlcnRpY2VzOkFycmF5PG51bWJlcj47XHJcblxyXG5cdHByaXZhdGUgX251bUluZGljZXM6bnVtYmVyO1xyXG5cdHByaXZhdGUgX251bVRyaWFuZ2xlczpudW1iZXI7XHJcblx0cHVibGljIF9wTnVtVmVydGljZXM6bnVtYmVyO1xyXG5cclxuXHRwdWJsaWMgX3BDb25jYXRlbmF0ZUFycmF5czpib29sZWFuID0gdHJ1ZTtcclxuXHJcblx0cHJpdmF0ZSBfaW5kaWNlc1VwZGF0ZWQ6U3ViR2VvbWV0cnlFdmVudDtcclxuXHJcblx0cHVibGljIF9wU3RyaWRlOk9iamVjdCA9IG5ldyBPYmplY3QoKTtcclxuXHRwdWJsaWMgX3BPZmZzZXQ6T2JqZWN0ID0gbmV3IE9iamVjdCgpO1xyXG5cclxuXHRwdWJsaWMgX3BVcGRhdGVTdHJpZGVPZmZzZXQoKVxyXG5cdHtcclxuXHRcdHRocm93IG5ldyBBYnN0cmFjdE1ldGhvZEVycm9yKCk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgX3BTdWJNZXNoQ2xhc3M6SVN1Yk1lc2hDbGFzcztcclxuXHJcblx0cHVibGljIGdldCBzdWJNZXNoQ2xhc3MoKTpJU3ViTWVzaENsYXNzXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BTdWJNZXNoQ2xhc3M7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgY29uY2F0ZW5hdGVBcnJheXMoKTpib29sZWFuXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BDb25jYXRlbmF0ZUFycmF5cztcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgY29uY2F0ZW5hdGVBcnJheXModmFsdWU6Ym9vbGVhbilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fcENvbmNhdGVuYXRlQXJyYXlzID09IHZhbHVlKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fcENvbmNhdGVuYXRlQXJyYXlzID0gdmFsdWU7XHJcblxyXG5cdFx0dGhpcy5fcFN0cmlkZU9mZnNldERpcnR5ID0gdHJ1ZTtcclxuXHJcblx0XHRpZiAodmFsdWUpXHJcblx0XHRcdHRoaXMuX3BOb3RpZnlWZXJ0aWNlc1VwZGF0ZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIHJhdyBpbmRleCBkYXRhIHRoYXQgZGVmaW5lIHRoZSBmYWNlcy5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGluZGljZXMoKTpBcnJheTxudW1iZXI+XHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BJbmRpY2VzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogXHJcblx0ICovXHJcblx0cHVibGljIGdldCB2ZXJ0aWNlcygpOkFycmF5PG51bWJlcj5cclxuXHR7XHJcblx0XHR0aGlzLnVwZGF0ZVZlcnRpY2VzKCk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX3BWZXJ0aWNlcztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSB0b3RhbCBhbW91bnQgb2YgdHJpYW5nbGVzIGluIHRoZSBUcmlhbmdsZVN1Ykdlb21ldHJ5LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgbnVtVHJpYW5nbGVzKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX251bVRyaWFuZ2xlcztcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXQgbnVtVmVydGljZXMoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcE51bVZlcnRpY2VzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3Rvcihjb25jYXRlbmF0ZWRBcnJheXM6Ym9vbGVhbilcclxuXHR7XHJcblx0XHRzdXBlcigpO1xyXG5cclxuXHRcdHRoaXMuX3BDb25jYXRlbmF0ZUFycmF5cyA9IGNvbmNhdGVuYXRlZEFycmF5cztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldFN0cmlkZShkYXRhVHlwZTpzdHJpbmcpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX3BTdHJpZGVPZmZzZXREaXJ0eSlcclxuXHRcdFx0dGhpcy5fcFVwZGF0ZVN0cmlkZU9mZnNldCgpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLl9wU3RyaWRlW2RhdGFUeXBlXTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldE9mZnNldChkYXRhVHlwZTpzdHJpbmcpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX3BTdHJpZGVPZmZzZXREaXJ0eSlcclxuXHRcdFx0dGhpcy5fcFVwZGF0ZVN0cmlkZU9mZnNldCgpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLl9wT2Zmc2V0W2RhdGFUeXBlXTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyB1cGRhdGVWZXJ0aWNlcygpXHJcblx0e1xyXG5cdFx0dGhyb3cgbmV3IEFic3RyYWN0TWV0aG9kRXJyb3IoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGRpc3Bvc2UoKVxyXG5cdHtcclxuXHRcdHRoaXMuX3BJbmRpY2VzID0gbnVsbDtcclxuXHRcdHRoaXMuX3BWZXJ0aWNlcyA9IG51bGw7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBVcGRhdGVzIHRoZSBmYWNlIGluZGljZXMgb2YgdGhlIFRyaWFuZ2xlU3ViR2VvbWV0cnkuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gaW5kaWNlcyBUaGUgZmFjZSBpbmRpY2VzIHRvIHVwbG9hZC5cclxuXHQgKi9cclxuXHRwdWJsaWMgdXBkYXRlSW5kaWNlcyhpbmRpY2VzOkFycmF5PG51bWJlcj4pXHJcblx0e1xyXG5cdFx0dGhpcy5fcEluZGljZXMgPSBpbmRpY2VzO1xyXG5cdFx0dGhpcy5fbnVtSW5kaWNlcyA9IGluZGljZXMubGVuZ3RoO1xyXG5cclxuXHRcdHRoaXMuX251bVRyaWFuZ2xlcyA9IHRoaXMuX251bUluZGljZXMvMztcclxuXHJcblx0XHR0aGlzLm5vdGlmeUluZGljZXNVcGRhdGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwcm90ZWN0ZWRcclxuXHQgKi9cclxuXHRwdWJsaWMgcEludmFsaWRhdGVCb3VuZHMoKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLnBhcmVudEdlb21ldHJ5KVxyXG5cdFx0XHR0aGlzLnBhcmVudEdlb21ldHJ5LmlJbnZhbGlkYXRlQm91bmRzKHRoaXMpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIEdlb21ldHJ5IG9iamVjdCB0aGF0ICdvd25zJyB0aGlzIFRyaWFuZ2xlU3ViR2VvbWV0cnkgb2JqZWN0LlxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwdWJsaWMgcGFyZW50R2VvbWV0cnk6R2VvbWV0cnk7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENsb25lcyB0aGUgY3VycmVudCBvYmplY3RcclxuXHQgKiBAcmV0dXJuIEFuIGV4YWN0IGR1cGxpY2F0ZSBvZiB0aGUgY3VycmVudCBvYmplY3QuXHJcblx0ICovXHJcblx0cHVibGljIGNsb25lKCk6U3ViR2VvbWV0cnlCYXNlXHJcblx0e1xyXG5cdFx0dGhyb3cgbmV3IEFic3RyYWN0TWV0aG9kRXJyb3IoKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBhcHBseVRyYW5zZm9ybWF0aW9uKHRyYW5zZm9ybTpNYXRyaXgzRClcclxuXHR7XHJcblx0Y29uc29sZS5sb2coXCJhcHBseVwiKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNjYWxlcyB0aGUgZ2VvbWV0cnkuXHJcblx0ICogQHBhcmFtIHNjYWxlIFRoZSBhbW91bnQgYnkgd2hpY2ggdG8gc2NhbGUuXHJcblx0ICovXHJcblx0cHVibGljIHNjYWxlKHNjYWxlOm51bWJlcilcclxuXHR7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIHNjYWxlVVYoc2NhbGVVOm51bWJlciA9IDEsIHNjYWxlVjpudW1iZXIgPSAxKVxyXG5cdHtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0Qm91bmRpbmdQb3NpdGlvbnMoKTpBcnJheTxudW1iZXI+XHJcblx0e1xyXG5cdFx0dGhyb3cgbmV3IEFic3RyYWN0TWV0aG9kRXJyb3IoKTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgbm90aWZ5SW5kaWNlc1VwZGF0ZSgpXHJcblx0e1xyXG5cdFx0aWYgKCF0aGlzLl9pbmRpY2VzVXBkYXRlZClcclxuXHRcdFx0dGhpcy5faW5kaWNlc1VwZGF0ZWQgPSBuZXcgU3ViR2VvbWV0cnlFdmVudChTdWJHZW9tZXRyeUV2ZW50LklORElDRVNfVVBEQVRFRCk7XHJcblxyXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KHRoaXMuX2luZGljZXNVcGRhdGVkKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBfcE5vdGlmeVZlcnRpY2VzVXBkYXRlKClcclxuXHR7XHJcblx0XHR0aHJvdyBuZXcgQWJzdHJhY3RNZXRob2RFcnJvcigpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0ID0gU3ViR2VvbWV0cnlCYXNlOyJdfQ==