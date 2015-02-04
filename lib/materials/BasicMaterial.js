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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9tYXRlcmlhbHMvQmFzaWNNYXRlcmlhbC50cyJdLCJuYW1lcyI6WyJCYXNpY01hdGVyaWFsIiwiQmFzaWNNYXRlcmlhbC5jb25zdHJ1Y3RvciIsIkJhc2ljTWF0ZXJpYWwuZ2V0UmVuZGVyT2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFPLGFBQWEsV0FBYyx3Q0FBd0MsQ0FBQyxDQUFDO0FBRzVFLElBQU8sWUFBWSxXQUFlLDJDQUEyQyxDQUFDLENBQUM7QUFJL0UsQUFJQTs7O0dBREc7SUFDRyxhQUFhO0lBQVNBLFVBQXRCQSxhQUFhQSxVQUFxQkE7SUFZdkNBLFNBWktBLGFBQWFBLENBWU5BLFlBQXVCQSxFQUFFQSxXQUFzQkEsRUFBRUEsTUFBc0JBLEVBQUVBLE1BQXNCQTtRQUEvRkMsNEJBQXVCQSxHQUF2QkEsbUJBQXVCQTtRQUFFQSwyQkFBc0JBLEdBQXRCQSxrQkFBc0JBO1FBQUVBLHNCQUFzQkEsR0FBdEJBLGNBQXNCQTtRQUFFQSxzQkFBc0JBLEdBQXRCQSxjQUFzQkE7UUFFMUdBLGlCQUFPQSxDQUFDQTtRQUVSQSxFQUFFQSxDQUFDQSxDQUFDQSxZQUFZQSxZQUFZQSxhQUFhQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUMzQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBbUJBLFlBQVlBLENBQUNBO1lBRTVDQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxDQUFDQSxXQUFXQSxJQUFJQSxJQUFJQSxDQUFDQSxHQUFFQSxJQUFJQSxHQUFHQSxLQUFLQSxDQUFDQTtZQUNsREEsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBR0EsTUFBTUEsQ0FBQ0E7WUFDckJBLElBQUlBLENBQUNBLE1BQU1BLEdBQUdBLE1BQU1BLENBQUNBO1FBQ3RCQSxDQUFDQTtRQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUNQQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxZQUFZQSxHQUFFQSxNQUFNQSxDQUFDQSxZQUFZQSxDQUFDQSxHQUFHQSxRQUFRQSxDQUFDQTtZQUMzREEsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsV0FBV0EsSUFBSUEsSUFBSUEsQ0FBQ0EsR0FBRUEsQ0FBQ0EsR0FBR0EsTUFBTUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0E7UUFDN0RBLENBQUNBO0lBQ0ZBLENBQUNBO0lBRUREOzs7OztPQUtHQTtJQUNJQSx1Q0FBZUEsR0FBdEJBLFVBQXVCQSxjQUE4QkE7UUFFcERFLE1BQU1BLENBQUNBLGNBQWNBLENBQUNBLHVCQUF1QkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7SUFDckRBLENBQUNBO0lBQ0ZGLG9CQUFDQTtBQUFEQSxDQXRDQSxBQXNDQ0EsRUF0QzJCLFlBQVksRUFzQ3ZDO0FBRUQsQUFBdUIsaUJBQWQsYUFBYSxDQUFDIiwiZmlsZSI6Im1hdGVyaWFscy9CYXNpY01hdGVyaWFsLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUZXh0dXJlMkRCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvdGV4dHVyZXMvVGV4dHVyZTJEQmFzZVwiKTtcclxuXHJcbmltcG9ydCBJUmVuZGVyT2JqZWN0T3duZXJcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9JUmVuZGVyT2JqZWN0T3duZXJcIik7XHJcbmltcG9ydCBNYXRlcmlhbEJhc2VcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL21hdGVyaWFscy9NYXRlcmlhbEJhc2VcIik7XHJcbmltcG9ydCBJUmVuZGVyYWJsZVBvb2xcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wb29sL0lSZW5kZXJhYmxlUG9vbFwiKTtcclxuaW1wb3J0IElSZW5kZXJPYmplY3RcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wb29sL0lSZW5kZXJPYmplY3RcIik7XHJcblxyXG4vKipcclxuICogQmFzaWNNYXRlcmlhbCBmb3JtcyBhbiBhYnN0cmFjdCBiYXNlIGNsYXNzIGZvciB0aGUgZGVmYXVsdCBzaGFkZWQgbWF0ZXJpYWxzIHByb3ZpZGVkIGJ5IFN0YWdlLFxyXG4gKiB1c2luZyBtYXRlcmlhbCBtZXRob2RzIHRvIGRlZmluZSB0aGVpciBhcHBlYXJhbmNlLlxyXG4gKi9cclxuY2xhc3MgQmFzaWNNYXRlcmlhbCBleHRlbmRzIE1hdGVyaWFsQmFzZSBpbXBsZW1lbnRzIElSZW5kZXJPYmplY3RPd25lclxyXG57XHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhIG5ldyBCYXNpY01hdGVyaWFsIG9iamVjdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB0ZXh0dXJlIFRoZSB0ZXh0dXJlIHVzZWQgZm9yIHRoZSBtYXRlcmlhbCdzIGFsYmVkbyBjb2xvci5cclxuXHQgKiBAcGFyYW0gc21vb3RoIEluZGljYXRlcyB3aGV0aGVyIHRoZSB0ZXh0dXJlIHNob3VsZCBiZSBmaWx0ZXJlZCB3aGVuIHNhbXBsZWQuIERlZmF1bHRzIHRvIHRydWUuXHJcblx0ICogQHBhcmFtIHJlcGVhdCBJbmRpY2F0ZXMgd2hldGhlciB0aGUgdGV4dHVyZSBzaG91bGQgYmUgdGlsZWQgd2hlbiBzYW1wbGVkLiBEZWZhdWx0cyB0byBmYWxzZS5cclxuXHQgKiBAcGFyYW0gbWlwbWFwIEluZGljYXRlcyB3aGV0aGVyIG9yIG5vdCBhbnkgdXNlZCB0ZXh0dXJlcyBzaG91bGQgdXNlIG1pcG1hcHBpbmcuIERlZmF1bHRzIHRvIGZhbHNlLlxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKHRleHR1cmU/OlRleHR1cmUyREJhc2UsIHNtb290aD86Ym9vbGVhbiwgcmVwZWF0Pzpib29sZWFuLCBtaXBtYXA/OmJvb2xlYW4pO1xyXG5cdGNvbnN0cnVjdG9yKGNvbG9yPzpudW1iZXIsIGFscGhhPzpudW1iZXIpO1xyXG5cdGNvbnN0cnVjdG9yKHRleHR1cmVDb2xvcjphbnkgPSBudWxsLCBzbW9vdGhBbHBoYTphbnkgPSBudWxsLCByZXBlYXQ6Ym9vbGVhbiA9IGZhbHNlLCBtaXBtYXA6Ym9vbGVhbiA9IGZhbHNlKVxyXG5cdHtcclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0aWYgKHRleHR1cmVDb2xvciBpbnN0YW5jZW9mIFRleHR1cmUyREJhc2UpIHtcclxuXHRcdFx0dGhpcy50ZXh0dXJlID0gPFRleHR1cmUyREJhc2U+IHRleHR1cmVDb2xvcjtcclxuXHJcblx0XHRcdHRoaXMuc21vb3RoID0gKHNtb290aEFscGhhID09IG51bGwpPyB0cnVlIDogZmFsc2U7XHJcblx0XHRcdHRoaXMucmVwZWF0ID0gcmVwZWF0O1xyXG5cdFx0XHR0aGlzLm1pcG1hcCA9IG1pcG1hcDtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuY29sb3IgPSB0ZXh0dXJlQ29sb3I/IE51bWJlcih0ZXh0dXJlQ29sb3IpIDogMHhDQ0NDQ0M7XHJcblx0XHRcdHRoaXMuYWxwaGEgPSAoc21vb3RoQWxwaGEgPT0gbnVsbCk/IDEgOiBOdW1iZXIoc21vb3RoQWxwaGEpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gcmVuZGVyZXJcclxuXHQgKlxyXG5cdCAqIEBpbnRlcm5hbFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXRSZW5kZXJPYmplY3QocmVuZGVyYWJsZVBvb2w6SVJlbmRlcmFibGVQb29sKTpJUmVuZGVyT2JqZWN0XHJcblx0e1xyXG5cdFx0cmV0dXJuIHJlbmRlcmFibGVQb29sLmdldE1hdGVyaWFsUmVuZGVyT2JqZWN0KHRoaXMpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0ID0gQmFzaWNNYXRlcmlhbDsiXX0=