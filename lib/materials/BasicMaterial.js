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
var BasicMaterial = (function (_super) {
    __extends(BasicMaterial, _super);
    function BasicMaterial(textureColor, smoothAlpha, repeat, mipmap) {
        if (textureColor === void 0) { textureColor = null; }
        if (smoothAlpha === void 0) { smoothAlpha = null; }
        if (repeat === void 0) { repeat = false; }
        if (mipmap === void 0) { mipmap = false; }
        _super.call(this);
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
    /**
     *
     * @param renderer
     *
     * @internal
     */
    BasicMaterial.prototype.getRenderObject = function (renderablePool) {
        return renderablePool.getMaterialRenderObject(this);
    };
    return BasicMaterial;
})(MaterialBase);
module.exports = BasicMaterial;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9tYXRlcmlhbHMvYmFzaWNtYXRlcmlhbC50cyJdLCJuYW1lcyI6WyJCYXNpY01hdGVyaWFsIiwiQmFzaWNNYXRlcmlhbC5jb25zdHJ1Y3RvciIsIkJhc2ljTWF0ZXJpYWwuZ2V0UmVuZGVyT2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFPLGFBQWEsV0FBYyx3Q0FBd0MsQ0FBQyxDQUFDO0FBRzVFLElBQU8sWUFBWSxXQUFlLDJDQUEyQyxDQUFDLENBQUM7QUFJL0UsQUFJQTs7O0dBREc7SUFDRyxhQUFhO0lBQVNBLFVBQXRCQSxhQUFhQSxVQUFxQkE7SUFZdkNBLFNBWktBLGFBQWFBLENBWU5BLFlBQXVCQSxFQUFFQSxXQUFzQkEsRUFBRUEsTUFBc0JBLEVBQUVBLE1BQXNCQTtRQUEvRkMsNEJBQXVCQSxHQUF2QkEsbUJBQXVCQTtRQUFFQSwyQkFBc0JBLEdBQXRCQSxrQkFBc0JBO1FBQUVBLHNCQUFzQkEsR0FBdEJBLGNBQXNCQTtRQUFFQSxzQkFBc0JBLEdBQXRCQSxjQUFzQkE7UUFFMUdBLGlCQUFPQSxDQUFDQTtRQUVSQSxFQUFFQSxDQUFDQSxDQUFDQSxZQUFZQSxZQUFZQSxhQUFhQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUMzQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBbUJBLFlBQVlBLENBQUNBO1lBRTVDQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxDQUFDQSxXQUFXQSxJQUFJQSxJQUFJQSxDQUFDQSxHQUFFQSxJQUFJQSxHQUFHQSxLQUFLQSxDQUFDQTtZQUNsREEsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBR0EsTUFBTUEsQ0FBQ0E7WUFDckJBLElBQUlBLENBQUNBLE1BQU1BLEdBQUdBLE1BQU1BLENBQUNBO1FBQ3RCQSxDQUFDQTtRQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUNQQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxZQUFZQSxHQUFFQSxNQUFNQSxDQUFDQSxZQUFZQSxDQUFDQSxHQUFHQSxRQUFRQSxDQUFDQTtZQUMzREEsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsV0FBV0EsSUFBSUEsSUFBSUEsQ0FBQ0EsR0FBRUEsQ0FBQ0EsR0FBR0EsTUFBTUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0E7UUFDN0RBLENBQUNBO0lBQ0ZBLENBQUNBO0lBRUREOzs7OztPQUtHQTtJQUNJQSx1Q0FBZUEsR0FBdEJBLFVBQXVCQSxjQUE4QkE7UUFFcERFLE1BQU1BLENBQUNBLGNBQWNBLENBQUNBLHVCQUF1QkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7SUFDckRBLENBQUNBO0lBQ0ZGLG9CQUFDQTtBQUFEQSxDQXRDQSxBQXNDQ0EsRUF0QzJCLFlBQVksRUFzQ3ZDO0FBRUQsQUFBdUIsaUJBQWQsYUFBYSxDQUFDIiwiZmlsZSI6Im1hdGVyaWFscy9CYXNpY01hdGVyaWFsLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUZXh0dXJlMkRCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvdGV4dHVyZXMvVGV4dHVyZTJEQmFzZVwiKTtcblxuaW1wb3J0IElSZW5kZXJPYmplY3RPd25lclx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0lSZW5kZXJPYmplY3RPd25lclwiKTtcbmltcG9ydCBNYXRlcmlhbEJhc2VcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL21hdGVyaWFscy9NYXRlcmlhbEJhc2VcIik7XG5pbXBvcnQgSVJlbmRlcmFibGVQb29sXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcG9vbC9JUmVuZGVyYWJsZVBvb2xcIik7XG5pbXBvcnQgSVJlbmRlck9iamVjdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3Bvb2wvSVJlbmRlck9iamVjdFwiKTtcblxuLyoqXG4gKiBCYXNpY01hdGVyaWFsIGZvcm1zIGFuIGFic3RyYWN0IGJhc2UgY2xhc3MgZm9yIHRoZSBkZWZhdWx0IHNoYWRlZCBtYXRlcmlhbHMgcHJvdmlkZWQgYnkgU3RhZ2UsXG4gKiB1c2luZyBtYXRlcmlhbCBtZXRob2RzIHRvIGRlZmluZSB0aGVpciBhcHBlYXJhbmNlLlxuICovXG5jbGFzcyBCYXNpY01hdGVyaWFsIGV4dGVuZHMgTWF0ZXJpYWxCYXNlIGltcGxlbWVudHMgSVJlbmRlck9iamVjdE93bmVyXG57XG5cdC8qKlxuXHQgKiBDcmVhdGVzIGEgbmV3IEJhc2ljTWF0ZXJpYWwgb2JqZWN0LlxuXHQgKlxuXHQgKiBAcGFyYW0gdGV4dHVyZSBUaGUgdGV4dHVyZSB1c2VkIGZvciB0aGUgbWF0ZXJpYWwncyBhbGJlZG8gY29sb3IuXG5cdCAqIEBwYXJhbSBzbW9vdGggSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHRleHR1cmUgc2hvdWxkIGJlIGZpbHRlcmVkIHdoZW4gc2FtcGxlZC4gRGVmYXVsdHMgdG8gdHJ1ZS5cblx0ICogQHBhcmFtIHJlcGVhdCBJbmRpY2F0ZXMgd2hldGhlciB0aGUgdGV4dHVyZSBzaG91bGQgYmUgdGlsZWQgd2hlbiBzYW1wbGVkLiBEZWZhdWx0cyB0byBmYWxzZS5cblx0ICogQHBhcmFtIG1pcG1hcCBJbmRpY2F0ZXMgd2hldGhlciBvciBub3QgYW55IHVzZWQgdGV4dHVyZXMgc2hvdWxkIHVzZSBtaXBtYXBwaW5nLiBEZWZhdWx0cyB0byBmYWxzZS5cblx0ICovXG5cdGNvbnN0cnVjdG9yKHRleHR1cmU/OlRleHR1cmUyREJhc2UsIHNtb290aD86Ym9vbGVhbiwgcmVwZWF0Pzpib29sZWFuLCBtaXBtYXA/OmJvb2xlYW4pO1xuXHRjb25zdHJ1Y3Rvcihjb2xvcj86bnVtYmVyLCBhbHBoYT86bnVtYmVyKTtcblx0Y29uc3RydWN0b3IodGV4dHVyZUNvbG9yOmFueSA9IG51bGwsIHNtb290aEFscGhhOmFueSA9IG51bGwsIHJlcGVhdDpib29sZWFuID0gZmFsc2UsIG1pcG1hcDpib29sZWFuID0gZmFsc2UpXG5cdHtcblx0XHRzdXBlcigpO1xuXG5cdFx0aWYgKHRleHR1cmVDb2xvciBpbnN0YW5jZW9mIFRleHR1cmUyREJhc2UpIHtcblx0XHRcdHRoaXMudGV4dHVyZSA9IDxUZXh0dXJlMkRCYXNlPiB0ZXh0dXJlQ29sb3I7XG5cblx0XHRcdHRoaXMuc21vb3RoID0gKHNtb290aEFscGhhID09IG51bGwpPyB0cnVlIDogZmFsc2U7XG5cdFx0XHR0aGlzLnJlcGVhdCA9IHJlcGVhdDtcblx0XHRcdHRoaXMubWlwbWFwID0gbWlwbWFwO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLmNvbG9yID0gdGV4dHVyZUNvbG9yPyBOdW1iZXIodGV4dHVyZUNvbG9yKSA6IDB4Q0NDQ0NDO1xuXHRcdFx0dGhpcy5hbHBoYSA9IChzbW9vdGhBbHBoYSA9PSBudWxsKT8gMSA6IE51bWJlcihzbW9vdGhBbHBoYSk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqIEBwYXJhbSByZW5kZXJlclxuXHQgKlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHB1YmxpYyBnZXRSZW5kZXJPYmplY3QocmVuZGVyYWJsZVBvb2w6SVJlbmRlcmFibGVQb29sKTpJUmVuZGVyT2JqZWN0XG5cdHtcblx0XHRyZXR1cm4gcmVuZGVyYWJsZVBvb2wuZ2V0TWF0ZXJpYWxSZW5kZXJPYmplY3QodGhpcyk7XG5cdH1cbn1cblxuZXhwb3J0ID0gQmFzaWNNYXRlcmlhbDsiXX0=