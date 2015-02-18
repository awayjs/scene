var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var PrimitiveCylinderPrefab = require("awayjs-display/lib/prefabs/PrimitiveCylinderPrefab");
/**
 * A UV RegularPolygon primitive mesh.
 */
var PrimitivePolygonPrefab = (function (_super) {
    __extends(PrimitivePolygonPrefab, _super);
    /**
     * Creates a new RegularPolygon disc object.
     * @param radius The radius of the regular polygon
     * @param sides Defines the number of sides of the regular polygon.
     * @param yUp Defines whether the regular polygon should lay on the Y-axis (true) or on the Z-axis (false).
     */
    function PrimitivePolygonPrefab(radius, sides, yUp) {
        if (radius === void 0) { radius = 100; }
        if (sides === void 0) { sides = 16; }
        if (yUp === void 0) { yUp = true; }
        _super.call(this, radius, 0, 0, sides, 1, true, false, false, yUp);
    }
    Object.defineProperty(PrimitivePolygonPrefab.prototype, "radius", {
        /**
         * The radius of the regular polygon.
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
    Object.defineProperty(PrimitivePolygonPrefab.prototype, "sides", {
        /**
         * The number of sides of the regular polygon.
         */
        get: function () {
            return this._pSegmentsW;
        },
        set: function (value) {
            this.setSegmentsW(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitivePolygonPrefab.prototype, "subdivisions", {
        /**
         * The number of subdivisions from the edge to the center of the regular polygon.
         */
        get: function () {
            return this._pSegmentsH;
        },
        set: function (value) {
            this.setSegmentsH(value);
        },
        enumerable: true,
        configurable: true
    });
    return PrimitivePolygonPrefab;
})(PrimitiveCylinderPrefab);
module.exports = PrimitivePolygonPrefab;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9wcmVmYWJzL1ByaW1pdGl2ZVBvbHlnb25QcmVmYWIudHMiXSwibmFtZXMiOlsiUHJpbWl0aXZlUG9seWdvblByZWZhYiIsIlByaW1pdGl2ZVBvbHlnb25QcmVmYWIuY29uc3RydWN0b3IiLCJQcmltaXRpdmVQb2x5Z29uUHJlZmFiLnJhZGl1cyIsIlByaW1pdGl2ZVBvbHlnb25QcmVmYWIuc2lkZXMiLCJQcmltaXRpdmVQb2x5Z29uUHJlZmFiLnN1YmRpdmlzaW9ucyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUEsSUFBTyx1QkFBdUIsV0FBVyxvREFBb0QsQ0FBQyxDQUFDO0FBRS9GLEFBR0E7O0dBREc7SUFDRyxzQkFBc0I7SUFBU0EsVUFBL0JBLHNCQUFzQkEsVUFBZ0NBO0lBMkMzREE7Ozs7O09BS0dBO0lBQ0hBLFNBakRLQSxzQkFBc0JBLENBaURmQSxNQUFtQkEsRUFBRUEsS0FBaUJBLEVBQUVBLEdBQWtCQTtRQUExREMsc0JBQW1CQSxHQUFuQkEsWUFBbUJBO1FBQUVBLHFCQUFpQkEsR0FBakJBLFVBQWlCQTtRQUFFQSxtQkFBa0JBLEdBQWxCQSxVQUFrQkE7UUFFckVBLGtCQUFNQSxNQUFNQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxLQUFLQSxFQUFFQSxDQUFDQSxFQUFFQSxJQUFJQSxFQUFFQSxLQUFLQSxFQUFFQSxLQUFLQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQTtJQUN4REEsQ0FBQ0E7SUE5Q0RELHNCQUFXQSwwQ0FBTUE7UUFIakJBOztXQUVHQTthQUNIQTtZQUVDRSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQTtRQUM1QkEsQ0FBQ0E7YUFFREYsVUFBa0JBLEtBQVlBO1lBRTdCRSxJQUFJQSxDQUFDQSxjQUFjQSxHQUFHQSxLQUFLQSxDQUFDQTtZQUM1QkEsSUFBSUEsQ0FBQ0Esb0JBQW9CQSxFQUFFQSxDQUFDQTtRQUM3QkEsQ0FBQ0E7OztPQU5BRjtJQVdEQSxzQkFBV0EseUNBQUtBO1FBSGhCQTs7V0FFR0E7YUFDSEE7WUFFQ0csTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0E7UUFDekJBLENBQUNBO2FBRURILFVBQWlCQSxLQUFZQTtZQUU1QkcsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7UUFDMUJBLENBQUNBOzs7T0FMQUg7SUFVREEsc0JBQVdBLGdEQUFZQTtRQUh2QkE7O1dBRUdBO2FBQ0hBO1lBRUNJLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBO1FBQ3pCQSxDQUFDQTthQUVESixVQUF3QkEsS0FBWUE7WUFFbkNJLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO1FBQzFCQSxDQUFDQTs7O09BTEFKO0lBaUJGQSw2QkFBQ0E7QUFBREEsQ0FyREEsQUFxRENBLEVBckRvQyx1QkFBdUIsRUFxRDNEO0FBRUQsQUFBZ0MsaUJBQXZCLHNCQUFzQixDQUFDIiwiZmlsZSI6InByZWZhYnMvUHJpbWl0aXZlUG9seWdvblByZWZhYi5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSUFzc2V0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0lBc3NldFwiKTtcclxuXHJcbmltcG9ydCBQcmltaXRpdmVDeWxpbmRlclByZWZhYlx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3ByZWZhYnMvUHJpbWl0aXZlQ3lsaW5kZXJQcmVmYWJcIik7XHJcblxyXG4vKipcclxuICogQSBVViBSZWd1bGFyUG9seWdvbiBwcmltaXRpdmUgbWVzaC5cclxuICovXHJcbmNsYXNzIFByaW1pdGl2ZVBvbHlnb25QcmVmYWIgZXh0ZW5kcyBQcmltaXRpdmVDeWxpbmRlclByZWZhYiBpbXBsZW1lbnRzIElBc3NldFxyXG57XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSByYWRpdXMgb2YgdGhlIHJlZ3VsYXIgcG9seWdvbi5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHJhZGl1cygpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9wQm90dG9tUmFkaXVzO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCByYWRpdXModmFsdWU6bnVtYmVyKVxyXG5cdHtcclxuXHRcdHRoaXMuX3BCb3R0b21SYWRpdXMgPSB2YWx1ZTtcclxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlR2VvbWV0cnkoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBudW1iZXIgb2Ygc2lkZXMgb2YgdGhlIHJlZ3VsYXIgcG9seWdvbi5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHNpZGVzKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BTZWdtZW50c1c7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHNpZGVzKHZhbHVlOm51bWJlcilcclxuXHR7XHJcblx0XHR0aGlzLnNldFNlZ21lbnRzVyh2YWx1ZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgbnVtYmVyIG9mIHN1YmRpdmlzaW9ucyBmcm9tIHRoZSBlZGdlIHRvIHRoZSBjZW50ZXIgb2YgdGhlIHJlZ3VsYXIgcG9seWdvbi5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHN1YmRpdmlzaW9ucygpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9wU2VnbWVudHNIO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBzdWJkaXZpc2lvbnModmFsdWU6bnVtYmVyKVxyXG5cdHtcclxuXHRcdHRoaXMuc2V0U2VnbWVudHNIKHZhbHVlKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYSBuZXcgUmVndWxhclBvbHlnb24gZGlzYyBvYmplY3QuXHJcblx0ICogQHBhcmFtIHJhZGl1cyBUaGUgcmFkaXVzIG9mIHRoZSByZWd1bGFyIHBvbHlnb25cclxuXHQgKiBAcGFyYW0gc2lkZXMgRGVmaW5lcyB0aGUgbnVtYmVyIG9mIHNpZGVzIG9mIHRoZSByZWd1bGFyIHBvbHlnb24uXHJcblx0ICogQHBhcmFtIHlVcCBEZWZpbmVzIHdoZXRoZXIgdGhlIHJlZ3VsYXIgcG9seWdvbiBzaG91bGQgbGF5IG9uIHRoZSBZLWF4aXMgKHRydWUpIG9yIG9uIHRoZSBaLWF4aXMgKGZhbHNlKS5cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcihyYWRpdXM6bnVtYmVyID0gMTAwLCBzaWRlczpudW1iZXIgPSAxNiwgeVVwOmJvb2xlYW4gPSB0cnVlKVxyXG5cdHtcclxuXHRcdHN1cGVyKHJhZGl1cywgMCwgMCwgc2lkZXMsIDEsIHRydWUsIGZhbHNlLCBmYWxzZSwgeVVwKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCA9IFByaW1pdGl2ZVBvbHlnb25QcmVmYWI7Il19