var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Texture2DBase = require("awayjs-core/lib/textures/Texture2DBase");
var MaterialBase = require("awayjs-display/lib/materials/MaterialBase");
/**
 * BasicMaterial forms an abstract base class for the default shaded materials provided by Stage,
 * using material methods to define their appearance.
 */
var CurveMaterial = (function (_super) {
    __extends(CurveMaterial, _super);
    function CurveMaterial(textureColor, smoothAlpha, repeat, mipmap) {
        if (textureColor === void 0) { textureColor = null; }
        if (smoothAlpha === void 0) { smoothAlpha = null; }
        if (repeat === void 0) { repeat = false; }
        if (mipmap === void 0) { mipmap = false; }
        _super.call(this);
        this._preserveAlpha = false;
        if (textureColor instanceof Texture2DBase) {
            this.texture = textureColor;
            this.smooth = (smoothAlpha == null) ? true : false;
            this.repeat = repeat;
            this.mipmap = mipmap;
        }
        else {
            this.color = textureColor ? Number(textureColor) : 0xCCCCCC;
            this.alpha = (smoothAlpha == null) ? 1 : Number(smoothAlpha);
        }
    }
    Object.defineProperty(CurveMaterial.prototype, "preserveAlpha", {
        /**
         * Indicates whether alpha should be preserved - defaults to false
         */
        get: function () {
            return this._preserveAlpha;
        },
        set: function (value) {
            if (this._preserveAlpha == value)
                return;
            this._preserveAlpha = value;
            this._pInvalidateRenderObject();
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     * @param renderer
     *
     * @internal
     */
    CurveMaterial.prototype.getRenderObject = function (renderablePool) {
        return renderablePool.getMaterialRenderObject(this);
    };
    return CurveMaterial;
})(MaterialBase);
module.exports = CurveMaterial;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9tYXRlcmlhbHMvQ3VydmVNYXRlcmlhbC50cyJdLCJuYW1lcyI6WyJDdXJ2ZU1hdGVyaWFsIiwiQ3VydmVNYXRlcmlhbC5jb25zdHJ1Y3RvciIsIkN1cnZlTWF0ZXJpYWwucHJlc2VydmVBbHBoYSIsIkN1cnZlTWF0ZXJpYWwuZ2V0UmVuZGVyT2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFPLGFBQWEsV0FBYyx3Q0FBd0MsQ0FBQyxDQUFDO0FBRzVFLElBQU8sWUFBWSxXQUFlLDJDQUEyQyxDQUFDLENBQUM7QUFJL0UsQUFJQTs7O0dBREc7SUFDRyxhQUFhO0lBQVNBLFVBQXRCQSxhQUFhQSxVQUFxQkE7SUFhdkNBLFNBYktBLGFBQWFBLENBYU5BLFlBQXVCQSxFQUFFQSxXQUFzQkEsRUFBRUEsTUFBc0JBLEVBQUVBLE1BQXNCQTtRQUEvRkMsNEJBQXVCQSxHQUF2QkEsbUJBQXVCQTtRQUFFQSwyQkFBc0JBLEdBQXRCQSxrQkFBc0JBO1FBQUVBLHNCQUFzQkEsR0FBdEJBLGNBQXNCQTtRQUFFQSxzQkFBc0JBLEdBQXRCQSxjQUFzQkE7UUFFMUdBLGlCQUFPQSxDQUFDQTtRQWJFQSxtQkFBY0EsR0FBV0EsS0FBS0EsQ0FBQ0E7UUFlekNBLEVBQUVBLENBQUNBLENBQUNBLFlBQVlBLFlBQVlBLGFBQWFBLENBQUNBLENBQUNBLENBQUNBO1lBQzNDQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFtQkEsWUFBWUEsQ0FBQ0E7WUFFNUNBLElBQUlBLENBQUNBLE1BQU1BLEdBQUdBLENBQUNBLFdBQVdBLElBQUlBLElBQUlBLENBQUNBLEdBQUVBLElBQUlBLEdBQUdBLEtBQUtBLENBQUNBO1lBQ2xEQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxNQUFNQSxDQUFDQTtZQUNyQkEsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBR0EsTUFBTUEsQ0FBQ0E7UUFDdEJBLENBQUNBO1FBQUNBLElBQUlBLENBQUNBLENBQUNBO1lBQ1BBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLFlBQVlBLEdBQUVBLE1BQU1BLENBQUNBLFlBQVlBLENBQUNBLEdBQUdBLFFBQVFBLENBQUNBO1lBQzNEQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxDQUFDQSxXQUFXQSxJQUFJQSxJQUFJQSxDQUFDQSxHQUFFQSxDQUFDQSxHQUFHQSxNQUFNQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQTtRQUM3REEsQ0FBQ0E7SUFDRkEsQ0FBQ0E7SUFJRUQsc0JBQVdBLHdDQUFhQTtRQUh4QkE7O1dBRUdBO2FBQ0hBO1lBRUlFLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLGNBQWNBLENBQUNBO1FBQy9CQSxDQUFDQTthQUNERixVQUF5QkEsS0FBYUE7WUFFbENFLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLGNBQWNBLElBQUlBLEtBQUtBLENBQUNBO2dCQUM3QkEsTUFBTUEsQ0FBQ0E7WUFDWEEsSUFBSUEsQ0FBQ0EsY0FBY0EsR0FBR0EsS0FBS0EsQ0FBQ0E7WUFDNUJBLElBQUlBLENBQUNBLHdCQUF3QkEsRUFBRUEsQ0FBQ0E7UUFDcENBLENBQUNBOzs7T0FQQUY7SUFTSkE7Ozs7O09BS0dBO0lBQ0lBLHVDQUFlQSxHQUF0QkEsVUFBdUJBLGNBQThCQTtRQUVwREcsTUFBTUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsdUJBQXVCQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtJQUNyREEsQ0FBQ0E7SUFDRkgsb0JBQUNBO0FBQURBLENBckRBLEFBcURDQSxFQXJEMkIsWUFBWSxFQXFEdkM7QUFFRCxBQUF1QixpQkFBZCxhQUFhLENBQUMiLCJmaWxlIjoibWF0ZXJpYWxzL0N1cnZlTWF0ZXJpYWwuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRleHR1cmUyREJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi90ZXh0dXJlcy9UZXh0dXJlMkRCYXNlXCIpO1xyXG5cclxuaW1wb3J0IElSZW5kZXJPYmplY3RPd25lclx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0lSZW5kZXJPYmplY3RPd25lclwiKTtcclxuaW1wb3J0IE1hdGVyaWFsQmFzZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvbWF0ZXJpYWxzL01hdGVyaWFsQmFzZVwiKTtcclxuaW1wb3J0IElSZW5kZXJhYmxlUG9vbFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3Bvb2wvSVJlbmRlcmFibGVQb29sXCIpO1xyXG5pbXBvcnQgSVJlbmRlck9iamVjdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3Bvb2wvSVJlbmRlck9iamVjdFwiKTtcclxuXHJcbi8qKlxyXG4gKiBCYXNpY01hdGVyaWFsIGZvcm1zIGFuIGFic3RyYWN0IGJhc2UgY2xhc3MgZm9yIHRoZSBkZWZhdWx0IHNoYWRlZCBtYXRlcmlhbHMgcHJvdmlkZWQgYnkgU3RhZ2UsXHJcbiAqIHVzaW5nIG1hdGVyaWFsIG1ldGhvZHMgdG8gZGVmaW5lIHRoZWlyIGFwcGVhcmFuY2UuXHJcbiAqL1xyXG5jbGFzcyBDdXJ2ZU1hdGVyaWFsIGV4dGVuZHMgTWF0ZXJpYWxCYXNlIGltcGxlbWVudHMgSVJlbmRlck9iamVjdE93bmVyXHJcbntcclxuICAgIHByaXZhdGUgX3ByZXNlcnZlQWxwaGE6Ym9vbGVhbiA9IGZhbHNlO1xyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYSBuZXcgQmFzaWNNYXRlcmlhbCBvYmplY3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gdGV4dHVyZSBUaGUgdGV4dHVyZSB1c2VkIGZvciB0aGUgbWF0ZXJpYWwncyBhbGJlZG8gY29sb3IuXHJcblx0ICogQHBhcmFtIHNtb290aCBJbmRpY2F0ZXMgd2hldGhlciB0aGUgdGV4dHVyZSBzaG91bGQgYmUgZmlsdGVyZWQgd2hlbiBzYW1wbGVkLiBEZWZhdWx0cyB0byB0cnVlLlxyXG5cdCAqIEBwYXJhbSByZXBlYXQgSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHRleHR1cmUgc2hvdWxkIGJlIHRpbGVkIHdoZW4gc2FtcGxlZC4gRGVmYXVsdHMgdG8gZmFsc2UuXHJcblx0ICogQHBhcmFtIG1pcG1hcCBJbmRpY2F0ZXMgd2hldGhlciBvciBub3QgYW55IHVzZWQgdGV4dHVyZXMgc2hvdWxkIHVzZSBtaXBtYXBwaW5nLiBEZWZhdWx0cyB0byBmYWxzZS5cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3Rvcih0ZXh0dXJlPzpUZXh0dXJlMkRCYXNlLCBzbW9vdGg/OmJvb2xlYW4sIHJlcGVhdD86Ym9vbGVhbiwgbWlwbWFwPzpib29sZWFuKTtcclxuXHRjb25zdHJ1Y3Rvcihjb2xvcj86bnVtYmVyLCBhbHBoYT86bnVtYmVyKTtcclxuXHRjb25zdHJ1Y3Rvcih0ZXh0dXJlQ29sb3I6YW55ID0gbnVsbCwgc21vb3RoQWxwaGE6YW55ID0gbnVsbCwgcmVwZWF0OmJvb2xlYW4gPSBmYWxzZSwgbWlwbWFwOmJvb2xlYW4gPSBmYWxzZSlcclxuXHR7XHJcblx0XHRzdXBlcigpO1xyXG5cclxuXHRcdGlmICh0ZXh0dXJlQ29sb3IgaW5zdGFuY2VvZiBUZXh0dXJlMkRCYXNlKSB7XHJcblx0XHRcdHRoaXMudGV4dHVyZSA9IDxUZXh0dXJlMkRCYXNlPiB0ZXh0dXJlQ29sb3I7XHJcblxyXG5cdFx0XHR0aGlzLnNtb290aCA9IChzbW9vdGhBbHBoYSA9PSBudWxsKT8gdHJ1ZSA6IGZhbHNlO1xyXG5cdFx0XHR0aGlzLnJlcGVhdCA9IHJlcGVhdDtcclxuXHRcdFx0dGhpcy5taXBtYXAgPSBtaXBtYXA7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLmNvbG9yID0gdGV4dHVyZUNvbG9yPyBOdW1iZXIodGV4dHVyZUNvbG9yKSA6IDB4Q0NDQ0NDO1xyXG5cdFx0XHR0aGlzLmFscGhhID0gKHNtb290aEFscGhhID09IG51bGwpPyAxIDogTnVtYmVyKHNtb290aEFscGhhKTtcclxuXHRcdH1cclxuXHR9XHJcbiAgICAvKipcclxuICAgICAqIEluZGljYXRlcyB3aGV0aGVyIGFscGhhIHNob3VsZCBiZSBwcmVzZXJ2ZWQgLSBkZWZhdWx0cyB0byBmYWxzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHByZXNlcnZlQWxwaGEoKTpib29sZWFuXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ByZXNlcnZlQWxwaGE7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0IHByZXNlcnZlQWxwaGEodmFsdWU6Ym9vbGVhbilcclxuICAgIHtcclxuICAgICAgICBpZiAodGhpcy5fcHJlc2VydmVBbHBoYSA9PSB2YWx1ZSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuX3ByZXNlcnZlQWxwaGEgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLl9wSW52YWxpZGF0ZVJlbmRlck9iamVjdCgpO1xyXG4gICAgfVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSByZW5kZXJlclxyXG5cdCAqXHJcblx0ICogQGludGVybmFsXHJcblx0ICovXHJcblx0cHVibGljIGdldFJlbmRlck9iamVjdChyZW5kZXJhYmxlUG9vbDpJUmVuZGVyYWJsZVBvb2wpOklSZW5kZXJPYmplY3RcclxuXHR7XHJcblx0XHRyZXR1cm4gcmVuZGVyYWJsZVBvb2wuZ2V0TWF0ZXJpYWxSZW5kZXJPYmplY3QodGhpcyk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgPSBDdXJ2ZU1hdGVyaWFsOyJdfQ==