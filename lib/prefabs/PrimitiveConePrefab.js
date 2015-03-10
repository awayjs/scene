var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var PrimitiveCylinderPrefab = require("awayjs-display/lib/prefabs/PrimitiveCylinderPrefab");
/**
 * A UV Cone primitive mesh.
 */
var PrimitiveConePrefab = (function (_super) {
    __extends(PrimitiveConePrefab, _super);
    /**
     * Creates a new Cone object.
     * @param radius The radius of the bottom end of the cone
     * @param height The height of the cone
     * @param segmentsW Defines the number of horizontal segments that make up the cone. Defaults to 16.
     * @param segmentsH Defines the number of vertical segments that make up the cone. Defaults to 1.
     * @param yUp Defines whether the cone poles should lay on the Y-axis (true) or on the Z-axis (false).
     */
    function PrimitiveConePrefab(radius, height, segmentsW, segmentsH, closed, yUp) {
        if (radius === void 0) { radius = 50; }
        if (height === void 0) { height = 100; }
        if (segmentsW === void 0) { segmentsW = 16; }
        if (segmentsH === void 0) { segmentsH = 1; }
        if (closed === void 0) { closed = true; }
        if (yUp === void 0) { yUp = true; }
        _super.call(this, 0, radius, height, segmentsW, segmentsH, false, closed, true, yUp);
    }
    Object.defineProperty(PrimitiveConePrefab.prototype, "radius", {
        /**
         * The radius of the bottom end of the cone.
         */
        get: function () {
            return this._pBottomRadius;
        },
        set: function (value) {
            this._pBottomRadius = value;
            this._pInvalidateGeometry();
        },
        enumerable: true,
        configurable: true
    });
    return PrimitiveConePrefab;
})(PrimitiveCylinderPrefab);
module.exports = PrimitiveConePrefab;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9wcmVmYWJzL1ByaW1pdGl2ZUNvbmVQcmVmYWIudHMiXSwibmFtZXMiOlsiUHJpbWl0aXZlQ29uZVByZWZhYiIsIlByaW1pdGl2ZUNvbmVQcmVmYWIuY29uc3RydWN0b3IiLCJQcmltaXRpdmVDb25lUHJlZmFiLnJhZGl1cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUEsSUFBTyx1QkFBdUIsV0FBVyxvREFBb0QsQ0FBQyxDQUFDO0FBRS9GLEFBR0E7O0dBREc7SUFDRyxtQkFBbUI7SUFBU0EsVUFBNUJBLG1CQUFtQkEsVUFBZ0NBO0lBa0J4REE7Ozs7Ozs7T0FPR0E7SUFDSEEsU0ExQktBLG1CQUFtQkEsQ0EwQlpBLE1BQWtCQSxFQUFFQSxNQUFtQkEsRUFBRUEsU0FBcUJBLEVBQUVBLFNBQW9CQSxFQUFFQSxNQUFxQkEsRUFBRUEsR0FBa0JBO1FBQS9IQyxzQkFBa0JBLEdBQWxCQSxXQUFrQkE7UUFBRUEsc0JBQW1CQSxHQUFuQkEsWUFBbUJBO1FBQUVBLHlCQUFxQkEsR0FBckJBLGNBQXFCQTtRQUFFQSx5QkFBb0JBLEdBQXBCQSxhQUFvQkE7UUFBRUEsc0JBQXFCQSxHQUFyQkEsYUFBcUJBO1FBQUVBLG1CQUFrQkEsR0FBbEJBLFVBQWtCQTtRQUUxSUEsa0JBQU1BLENBQUNBLEVBQUVBLE1BQU1BLEVBQUVBLE1BQU1BLEVBQUVBLFNBQVNBLEVBQUVBLFNBQVNBLEVBQUVBLEtBQUtBLEVBQUVBLE1BQU1BLEVBQUVBLElBQUlBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBO0lBQzFFQSxDQUFDQTtJQXZCREQsc0JBQVdBLHVDQUFNQTtRQUhqQkE7O1dBRUdBO2FBQ0hBO1lBRUNFLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLGNBQWNBLENBQUNBO1FBQzVCQSxDQUFDQTthQUVERixVQUFrQkEsS0FBWUE7WUFFN0JFLElBQUlBLENBQUNBLGNBQWNBLEdBQUdBLEtBQUtBLENBQUNBO1lBRTVCQSxJQUFJQSxDQUFDQSxvQkFBb0JBLEVBQUVBLENBQUNBO1FBQzdCQSxDQUFDQTs7O09BUEFGO0lBcUJGQSwwQkFBQ0E7QUFBREEsQ0E5QkEsQUE4QkNBLEVBOUJpQyx1QkFBdUIsRUE4QnhEO0FBRUQsQUFBNkIsaUJBQXBCLG1CQUFtQixDQUFDIiwiZmlsZSI6InByZWZhYnMvUHJpbWl0aXZlQ29uZVByZWZhYi5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSUFzc2V0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0lBc3NldFwiKTtcclxuXHJcbmltcG9ydCBQcmltaXRpdmVDeWxpbmRlclByZWZhYlx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3ByZWZhYnMvUHJpbWl0aXZlQ3lsaW5kZXJQcmVmYWJcIik7XHJcblxyXG4vKipcclxuICogQSBVViBDb25lIHByaW1pdGl2ZSBtZXNoLlxyXG4gKi9cclxuY2xhc3MgUHJpbWl0aXZlQ29uZVByZWZhYiBleHRlbmRzIFByaW1pdGl2ZUN5bGluZGVyUHJlZmFiIGltcGxlbWVudHMgSUFzc2V0XHJcbntcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIHJhZGl1cyBvZiB0aGUgYm90dG9tIGVuZCBvZiB0aGUgY29uZS5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHJhZGl1cygpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9wQm90dG9tUmFkaXVzO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCByYWRpdXModmFsdWU6bnVtYmVyKVxyXG5cdHtcclxuXHRcdHRoaXMuX3BCb3R0b21SYWRpdXMgPSB2YWx1ZTtcclxuXHJcblx0XHR0aGlzLl9wSW52YWxpZGF0ZUdlb21ldHJ5KCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGEgbmV3IENvbmUgb2JqZWN0LlxyXG5cdCAqIEBwYXJhbSByYWRpdXMgVGhlIHJhZGl1cyBvZiB0aGUgYm90dG9tIGVuZCBvZiB0aGUgY29uZVxyXG5cdCAqIEBwYXJhbSBoZWlnaHQgVGhlIGhlaWdodCBvZiB0aGUgY29uZVxyXG5cdCAqIEBwYXJhbSBzZWdtZW50c1cgRGVmaW5lcyB0aGUgbnVtYmVyIG9mIGhvcml6b250YWwgc2VnbWVudHMgdGhhdCBtYWtlIHVwIHRoZSBjb25lLiBEZWZhdWx0cyB0byAxNi5cclxuXHQgKiBAcGFyYW0gc2VnbWVudHNIIERlZmluZXMgdGhlIG51bWJlciBvZiB2ZXJ0aWNhbCBzZWdtZW50cyB0aGF0IG1ha2UgdXAgdGhlIGNvbmUuIERlZmF1bHRzIHRvIDEuXHJcblx0ICogQHBhcmFtIHlVcCBEZWZpbmVzIHdoZXRoZXIgdGhlIGNvbmUgcG9sZXMgc2hvdWxkIGxheSBvbiB0aGUgWS1heGlzICh0cnVlKSBvciBvbiB0aGUgWi1heGlzIChmYWxzZSkuXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IocmFkaXVzOm51bWJlciA9IDUwLCBoZWlnaHQ6bnVtYmVyID0gMTAwLCBzZWdtZW50c1c6bnVtYmVyID0gMTYsIHNlZ21lbnRzSDpudW1iZXIgPSAxLCBjbG9zZWQ6Ym9vbGVhbiA9IHRydWUsIHlVcDpib29sZWFuID0gdHJ1ZSlcclxuXHR7XHJcblx0XHRzdXBlcigwLCByYWRpdXMsIGhlaWdodCwgc2VnbWVudHNXLCBzZWdtZW50c0gsIGZhbHNlLCBjbG9zZWQsIHRydWUsIHlVcCk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgPSBQcmltaXRpdmVDb25lUHJlZmFiOyJdfQ==