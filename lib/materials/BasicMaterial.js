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
    Object.defineProperty(BasicMaterial.prototype, "preserveAlpha", {
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
    BasicMaterial.prototype.getRenderObject = function (renderablePool) {
        return renderablePool.getMaterialRenderObject(this);
    };
    return BasicMaterial;
})(MaterialBase);
module.exports = BasicMaterial;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9tYXRlcmlhbHMvQmFzaWNNYXRlcmlhbC50cyJdLCJuYW1lcyI6WyJCYXNpY01hdGVyaWFsIiwiQmFzaWNNYXRlcmlhbC5jb25zdHJ1Y3RvciIsIkJhc2ljTWF0ZXJpYWwucHJlc2VydmVBbHBoYSIsIkJhc2ljTWF0ZXJpYWwuZ2V0UmVuZGVyT2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFPLGFBQWEsV0FBYyx3Q0FBd0MsQ0FBQyxDQUFDO0FBRzVFLElBQU8sWUFBWSxXQUFlLDJDQUEyQyxDQUFDLENBQUM7QUFJL0UsQUFJQTs7O0dBREc7SUFDRyxhQUFhO0lBQVNBLFVBQXRCQSxhQUFhQSxVQUFxQkE7SUFhdkNBLFNBYktBLGFBQWFBLENBYU5BLFlBQXVCQSxFQUFFQSxXQUFzQkEsRUFBRUEsTUFBc0JBLEVBQUVBLE1BQXNCQTtRQUEvRkMsNEJBQXVCQSxHQUF2QkEsbUJBQXVCQTtRQUFFQSwyQkFBc0JBLEdBQXRCQSxrQkFBc0JBO1FBQUVBLHNCQUFzQkEsR0FBdEJBLGNBQXNCQTtRQUFFQSxzQkFBc0JBLEdBQXRCQSxjQUFzQkE7UUFFMUdBLGlCQUFPQSxDQUFDQTtRQWJFQSxtQkFBY0EsR0FBV0EsS0FBS0EsQ0FBQ0E7UUFlekNBLEVBQUVBLENBQUNBLENBQUNBLFlBQVlBLFlBQVlBLGFBQWFBLENBQUNBLENBQUNBLENBQUNBO1lBQzNDQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFtQkEsWUFBWUEsQ0FBQ0E7WUFFNUNBLElBQUlBLENBQUNBLE1BQU1BLEdBQUdBLENBQUNBLFdBQVdBLElBQUlBLElBQUlBLENBQUNBLEdBQUVBLElBQUlBLEdBQUdBLEtBQUtBLENBQUNBO1lBQ2xEQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxNQUFNQSxDQUFDQTtZQUNyQkEsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBR0EsTUFBTUEsQ0FBQ0E7UUFDdEJBLENBQUNBO1FBQUNBLElBQUlBLENBQUNBLENBQUNBO1lBQ1BBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLFlBQVlBLEdBQUVBLE1BQU1BLENBQUNBLFlBQVlBLENBQUNBLEdBQUdBLFFBQVFBLENBQUNBO1lBQzNEQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxDQUFDQSxXQUFXQSxJQUFJQSxJQUFJQSxDQUFDQSxHQUFFQSxDQUFDQSxHQUFHQSxNQUFNQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQTtRQUM3REEsQ0FBQ0E7SUFDRkEsQ0FBQ0E7SUFJRUQsc0JBQVdBLHdDQUFhQTtRQUh4QkE7O1dBRUdBO2FBQ0hBO1lBRUlFLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLGNBQWNBLENBQUNBO1FBQy9CQSxDQUFDQTthQUNERixVQUF5QkEsS0FBYUE7WUFFbENFLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLGNBQWNBLElBQUlBLEtBQUtBLENBQUNBO2dCQUM3QkEsTUFBTUEsQ0FBQ0E7WUFDWEEsSUFBSUEsQ0FBQ0EsY0FBY0EsR0FBR0EsS0FBS0EsQ0FBQ0E7WUFDNUJBLElBQUlBLENBQUNBLHdCQUF3QkEsRUFBRUEsQ0FBQ0E7UUFDcENBLENBQUNBOzs7T0FQQUY7SUFTSkE7Ozs7O09BS0dBO0lBQ0lBLHVDQUFlQSxHQUF0QkEsVUFBdUJBLGNBQThCQTtRQUVwREcsTUFBTUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsdUJBQXVCQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtJQUNyREEsQ0FBQ0E7SUFDRkgsb0JBQUNBO0FBQURBLENBckRBLEFBcURDQSxFQXJEMkIsWUFBWSxFQXFEdkM7QUFFRCxBQUF1QixpQkFBZCxhQUFhLENBQUMiLCJmaWxlIjoibWF0ZXJpYWxzL0Jhc2ljTWF0ZXJpYWwuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRleHR1cmUyREJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi90ZXh0dXJlcy9UZXh0dXJlMkRCYXNlXCIpO1xuXG5pbXBvcnQgSVJlbmRlck9iamVjdE93bmVyXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvSVJlbmRlck9iamVjdE93bmVyXCIpO1xuaW1wb3J0IE1hdGVyaWFsQmFzZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvbWF0ZXJpYWxzL01hdGVyaWFsQmFzZVwiKTtcbmltcG9ydCBJUmVuZGVyYWJsZVBvb2xcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wb29sL0lSZW5kZXJhYmxlUG9vbFwiKTtcbmltcG9ydCBJUmVuZGVyT2JqZWN0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcG9vbC9JUmVuZGVyT2JqZWN0XCIpO1xuXG4vKipcbiAqIEJhc2ljTWF0ZXJpYWwgZm9ybXMgYW4gYWJzdHJhY3QgYmFzZSBjbGFzcyBmb3IgdGhlIGRlZmF1bHQgc2hhZGVkIG1hdGVyaWFscyBwcm92aWRlZCBieSBTdGFnZSxcbiAqIHVzaW5nIG1hdGVyaWFsIG1ldGhvZHMgdG8gZGVmaW5lIHRoZWlyIGFwcGVhcmFuY2UuXG4gKi9cbmNsYXNzIEJhc2ljTWF0ZXJpYWwgZXh0ZW5kcyBNYXRlcmlhbEJhc2UgaW1wbGVtZW50cyBJUmVuZGVyT2JqZWN0T3duZXJcbntcbiAgICBwcml2YXRlIF9wcmVzZXJ2ZUFscGhhOmJvb2xlYW4gPSBmYWxzZTtcblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBuZXcgQmFzaWNNYXRlcmlhbCBvYmplY3QuXG5cdCAqXG5cdCAqIEBwYXJhbSB0ZXh0dXJlIFRoZSB0ZXh0dXJlIHVzZWQgZm9yIHRoZSBtYXRlcmlhbCdzIGFsYmVkbyBjb2xvci5cblx0ICogQHBhcmFtIHNtb290aCBJbmRpY2F0ZXMgd2hldGhlciB0aGUgdGV4dHVyZSBzaG91bGQgYmUgZmlsdGVyZWQgd2hlbiBzYW1wbGVkLiBEZWZhdWx0cyB0byB0cnVlLlxuXHQgKiBAcGFyYW0gcmVwZWF0IEluZGljYXRlcyB3aGV0aGVyIHRoZSB0ZXh0dXJlIHNob3VsZCBiZSB0aWxlZCB3aGVuIHNhbXBsZWQuIERlZmF1bHRzIHRvIGZhbHNlLlxuXHQgKiBAcGFyYW0gbWlwbWFwIEluZGljYXRlcyB3aGV0aGVyIG9yIG5vdCBhbnkgdXNlZCB0ZXh0dXJlcyBzaG91bGQgdXNlIG1pcG1hcHBpbmcuIERlZmF1bHRzIHRvIGZhbHNlLlxuXHQgKi9cblx0Y29uc3RydWN0b3IodGV4dHVyZT86VGV4dHVyZTJEQmFzZSwgc21vb3RoPzpib29sZWFuLCByZXBlYXQ/OmJvb2xlYW4sIG1pcG1hcD86Ym9vbGVhbik7XG5cdGNvbnN0cnVjdG9yKGNvbG9yPzpudW1iZXIsIGFscGhhPzpudW1iZXIpO1xuXHRjb25zdHJ1Y3Rvcih0ZXh0dXJlQ29sb3I6YW55ID0gbnVsbCwgc21vb3RoQWxwaGE6YW55ID0gbnVsbCwgcmVwZWF0OmJvb2xlYW4gPSBmYWxzZSwgbWlwbWFwOmJvb2xlYW4gPSBmYWxzZSlcblx0e1xuXHRcdHN1cGVyKCk7XG5cblx0XHRpZiAodGV4dHVyZUNvbG9yIGluc3RhbmNlb2YgVGV4dHVyZTJEQmFzZSkge1xuXHRcdFx0dGhpcy50ZXh0dXJlID0gPFRleHR1cmUyREJhc2U+IHRleHR1cmVDb2xvcjtcblxuXHRcdFx0dGhpcy5zbW9vdGggPSAoc21vb3RoQWxwaGEgPT0gbnVsbCk/IHRydWUgOiBmYWxzZTtcblx0XHRcdHRoaXMucmVwZWF0ID0gcmVwZWF0O1xuXHRcdFx0dGhpcy5taXBtYXAgPSBtaXBtYXA7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuY29sb3IgPSB0ZXh0dXJlQ29sb3I/IE51bWJlcih0ZXh0dXJlQ29sb3IpIDogMHhDQ0NDQ0M7XG5cdFx0XHR0aGlzLmFscGhhID0gKHNtb290aEFscGhhID09IG51bGwpPyAxIDogTnVtYmVyKHNtb290aEFscGhhKTtcblx0XHR9XG5cdH1cbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgd2hldGhlciBhbHBoYSBzaG91bGQgYmUgcHJlc2VydmVkIC0gZGVmYXVsdHMgdG8gZmFsc2VcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHByZXNlcnZlQWxwaGEoKTpib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fcHJlc2VydmVBbHBoYTtcbiAgICB9XG4gICAgcHVibGljIHNldCBwcmVzZXJ2ZUFscGhhKHZhbHVlOmJvb2xlYW4pXG4gICAge1xuICAgICAgICBpZiAodGhpcy5fcHJlc2VydmVBbHBoYSA9PSB2YWx1ZSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy5fcHJlc2VydmVBbHBoYSA9IHZhbHVlO1xuICAgICAgICB0aGlzLl9wSW52YWxpZGF0ZVJlbmRlck9iamVjdCgpO1xuICAgIH1cblxuXHQvKipcblx0ICpcblx0ICogQHBhcmFtIHJlbmRlcmVyXG5cdCAqXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHVibGljIGdldFJlbmRlck9iamVjdChyZW5kZXJhYmxlUG9vbDpJUmVuZGVyYWJsZVBvb2wpOklSZW5kZXJPYmplY3Rcblx0e1xuXHRcdHJldHVybiByZW5kZXJhYmxlUG9vbC5nZXRNYXRlcmlhbFJlbmRlck9iamVjdCh0aGlzKTtcblx0fVxufVxuXG5leHBvcnQgPSBCYXNpY01hdGVyaWFsOyJdfQ==