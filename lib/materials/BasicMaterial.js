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
        this._alphaBlending = false;
        this._alpha = 1;
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
    Object.defineProperty(BasicMaterial.prototype, "alpha", {
        /**
         * The alpha of the surface.
         */
        get: function () {
            return this._alpha;
        },
        set: function (value) {
            if (value > 1)
                value = 1;
            else if (value < 0)
                value = 0;
            if (this._alpha == value)
                return;
            this._alpha = value;
            this._pInvalidateProperties();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BasicMaterial.prototype, "alphaBlending", {
        /**
         * Indicates whether or not the material has transparency. If binary transparency is sufficient, for
         * example when using textures of foliage, consider using alphaThreshold instead.
         */
        get: function () {
            return this._alphaBlending;
        },
        set: function (value) {
            if (this._alphaBlending == value)
                return;
            this._alphaBlending = value;
            this._pInvalidateProperties();
        },
        enumerable: true,
        configurable: true
    });
    return BasicMaterial;
})(MaterialBase);
module.exports = BasicMaterial;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9tYXRlcmlhbHMvYmFzaWNtYXRlcmlhbC50cyJdLCJuYW1lcyI6WyJCYXNpY01hdGVyaWFsIiwiQmFzaWNNYXRlcmlhbC5jb25zdHJ1Y3RvciIsIkJhc2ljTWF0ZXJpYWwuYWxwaGEiLCJCYXNpY01hdGVyaWFsLmFscGhhQmxlbmRpbmciXSwibWFwcGluZ3MiOiI7Ozs7OztBQUdBLElBQU8sYUFBYSxXQUFjLHdDQUF3QyxDQUFDLENBQUM7QUFHNUUsSUFBTyxZQUFZLFdBQWUsMkNBQTJDLENBQUMsQ0FBQztBQUkvRSxBQUlBOzs7R0FERztJQUNHLGFBQWE7SUFBU0EsVUFBdEJBLGFBQWFBLFVBQXFCQTtJQWV2Q0EsU0FmS0EsYUFBYUEsQ0FlTkEsWUFBdUJBLEVBQUVBLFdBQXNCQSxFQUFFQSxNQUFzQkEsRUFBRUEsTUFBc0JBO1FBQS9GQyw0QkFBdUJBLEdBQXZCQSxtQkFBdUJBO1FBQUVBLDJCQUFzQkEsR0FBdEJBLGtCQUFzQkE7UUFBRUEsc0JBQXNCQSxHQUF0QkEsY0FBc0JBO1FBQUVBLHNCQUFzQkEsR0FBdEJBLGNBQXNCQTtRQUUxR0EsaUJBQU9BLENBQUNBO1FBZkRBLG1CQUFjQSxHQUFXQSxLQUFLQSxDQUFDQTtRQUMvQkEsV0FBTUEsR0FBVUEsQ0FBQ0EsQ0FBQ0E7UUFnQnpCQSxFQUFFQSxDQUFDQSxDQUFDQSxZQUFZQSxZQUFZQSxhQUFhQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUMzQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBbUJBLFlBQVlBLENBQUNBO1lBRTVDQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxDQUFDQSxXQUFXQSxJQUFJQSxJQUFJQSxDQUFDQSxHQUFFQSxJQUFJQSxHQUFHQSxLQUFLQSxDQUFDQTtZQUNsREEsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBR0EsTUFBTUEsQ0FBQ0E7WUFDckJBLElBQUlBLENBQUNBLE1BQU1BLEdBQUdBLE1BQU1BLENBQUNBO1FBQ3RCQSxDQUFDQTtRQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUNQQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxZQUFZQSxHQUFFQSxNQUFNQSxDQUFDQSxZQUFZQSxDQUFDQSxHQUFHQSxRQUFRQSxDQUFDQTtZQUMzREEsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsV0FBV0EsSUFBSUEsSUFBSUEsQ0FBQ0EsR0FBRUEsQ0FBQ0EsR0FBR0EsTUFBTUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0E7UUFDN0RBLENBQUNBO0lBQ0ZBLENBQUNBO0lBS0RELHNCQUFXQSxnQ0FBS0E7UUFIaEJBOztXQUVHQTthQUNIQTtZQUVDRSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQTtRQUNwQkEsQ0FBQ0E7YUFFREYsVUFBaUJBLEtBQVlBO1lBRTVCRSxFQUFFQSxDQUFDQSxDQUFDQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDYkEsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDWEEsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2xCQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUVYQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxJQUFJQSxLQUFLQSxDQUFDQTtnQkFDeEJBLE1BQU1BLENBQUNBO1lBRVJBLElBQUlBLENBQUNBLE1BQU1BLEdBQUdBLEtBQUtBLENBQUNBO1lBRXBCQSxJQUFJQSxDQUFDQSxzQkFBc0JBLEVBQUVBLENBQUNBO1FBQy9CQSxDQUFDQTs7O09BZkFGO0lBcUJEQSxzQkFBV0Esd0NBQWFBO1FBSnhCQTs7O1dBR0dBO2FBQ0hBO1lBRUNHLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLGNBQWNBLENBQUNBO1FBQzVCQSxDQUFDQTthQUVESCxVQUF5QkEsS0FBYUE7WUFFckNHLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLGNBQWNBLElBQUlBLEtBQUtBLENBQUNBO2dCQUNoQ0EsTUFBTUEsQ0FBQ0E7WUFFUkEsSUFBSUEsQ0FBQ0EsY0FBY0EsR0FBR0EsS0FBS0EsQ0FBQ0E7WUFFNUJBLElBQUlBLENBQUNBLHNCQUFzQkEsRUFBRUEsQ0FBQ0E7UUFDL0JBLENBQUNBOzs7T0FWQUg7SUFXRkEsb0JBQUNBO0FBQURBLENBeEVBLEFBd0VDQSxFQXhFMkIsWUFBWSxFQXdFdkM7QUFFRCxBQUF1QixpQkFBZCxhQUFhLENBQUMiLCJmaWxlIjoibWF0ZXJpYWxzL0Jhc2ljTWF0ZXJpYWwuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1hdHJpeFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL01hdHJpeFwiKTtcbmltcG9ydCBNYXRyaXgzRFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL01hdHJpeDNEXCIpO1xuaW1wb3J0IE1hdHJpeDNEVXRpbHNcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL01hdHJpeDNEVXRpbHNcIik7XG5pbXBvcnQgVGV4dHVyZTJEQmFzZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL3RleHR1cmVzL1RleHR1cmUyREJhc2VcIik7XG5cbmltcG9ydCBCbGVuZE1vZGVcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvQmxlbmRNb2RlXCIpO1xuaW1wb3J0IE1hdGVyaWFsQmFzZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvbWF0ZXJpYWxzL01hdGVyaWFsQmFzZVwiKTtcbmltcG9ydCBUcmlhbmdsZVN1Ykdlb21ldHJ5XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvVHJpYW5nbGVTdWJHZW9tZXRyeVwiKTtcbmltcG9ydCBDYW1lcmFcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZW50aXRpZXMvQ2FtZXJhXCIpO1xuXG4vKipcbiAqIEJhc2ljTWF0ZXJpYWwgZm9ybXMgYW4gYWJzdHJhY3QgYmFzZSBjbGFzcyBmb3IgdGhlIGRlZmF1bHQgc2hhZGVkIG1hdGVyaWFscyBwcm92aWRlZCBieSBTdGFnZSxcbiAqIHVzaW5nIG1hdGVyaWFsIG1ldGhvZHMgdG8gZGVmaW5lIHRoZWlyIGFwcGVhcmFuY2UuXG4gKi9cbmNsYXNzIEJhc2ljTWF0ZXJpYWwgZXh0ZW5kcyBNYXRlcmlhbEJhc2Vcbntcblx0cHJpdmF0ZSBfYWxwaGFCbGVuZGluZzpib29sZWFuID0gZmFsc2U7XG5cdHByaXZhdGUgX2FscGhhOm51bWJlciA9IDE7XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBuZXcgQmFzaWNNYXRlcmlhbCBvYmplY3QuXG5cdCAqXG5cdCAqIEBwYXJhbSB0ZXh0dXJlIFRoZSB0ZXh0dXJlIHVzZWQgZm9yIHRoZSBtYXRlcmlhbCdzIGFsYmVkbyBjb2xvci5cblx0ICogQHBhcmFtIHNtb290aCBJbmRpY2F0ZXMgd2hldGhlciB0aGUgdGV4dHVyZSBzaG91bGQgYmUgZmlsdGVyZWQgd2hlbiBzYW1wbGVkLiBEZWZhdWx0cyB0byB0cnVlLlxuXHQgKiBAcGFyYW0gcmVwZWF0IEluZGljYXRlcyB3aGV0aGVyIHRoZSB0ZXh0dXJlIHNob3VsZCBiZSB0aWxlZCB3aGVuIHNhbXBsZWQuIERlZmF1bHRzIHRvIGZhbHNlLlxuXHQgKiBAcGFyYW0gbWlwbWFwIEluZGljYXRlcyB3aGV0aGVyIG9yIG5vdCBhbnkgdXNlZCB0ZXh0dXJlcyBzaG91bGQgdXNlIG1pcG1hcHBpbmcuIERlZmF1bHRzIHRvIGZhbHNlLlxuXHQgKi9cblx0Y29uc3RydWN0b3IodGV4dHVyZT86VGV4dHVyZTJEQmFzZSwgc21vb3RoPzpib29sZWFuLCByZXBlYXQ/OmJvb2xlYW4sIG1pcG1hcD86Ym9vbGVhbik7XG5cdGNvbnN0cnVjdG9yKGNvbG9yPzpudW1iZXIsIGFscGhhPzpudW1iZXIpO1xuXHRjb25zdHJ1Y3Rvcih0ZXh0dXJlQ29sb3I6YW55ID0gbnVsbCwgc21vb3RoQWxwaGE6YW55ID0gbnVsbCwgcmVwZWF0OmJvb2xlYW4gPSBmYWxzZSwgbWlwbWFwOmJvb2xlYW4gPSBmYWxzZSlcblx0e1xuXHRcdHN1cGVyKCk7XG5cblx0XHRpZiAodGV4dHVyZUNvbG9yIGluc3RhbmNlb2YgVGV4dHVyZTJEQmFzZSkge1xuXHRcdFx0dGhpcy50ZXh0dXJlID0gPFRleHR1cmUyREJhc2U+IHRleHR1cmVDb2xvcjtcblxuXHRcdFx0dGhpcy5zbW9vdGggPSAoc21vb3RoQWxwaGEgPT0gbnVsbCk/IHRydWUgOiBmYWxzZTtcblx0XHRcdHRoaXMucmVwZWF0ID0gcmVwZWF0O1xuXHRcdFx0dGhpcy5taXBtYXAgPSBtaXBtYXA7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuY29sb3IgPSB0ZXh0dXJlQ29sb3I/IE51bWJlcih0ZXh0dXJlQ29sb3IpIDogMHhDQ0NDQ0M7XG5cdFx0XHR0aGlzLmFscGhhID0gKHNtb290aEFscGhhID09IG51bGwpPyAxIDogTnVtYmVyKHNtb290aEFscGhhKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogVGhlIGFscGhhIG9mIHRoZSBzdXJmYWNlLlxuXHQgKi9cblx0cHVibGljIGdldCBhbHBoYSgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2FscGhhO1xuXHR9XG5cblx0cHVibGljIHNldCBhbHBoYSh2YWx1ZTpudW1iZXIpXG5cdHtcblx0XHRpZiAodmFsdWUgPiAxKVxuXHRcdFx0dmFsdWUgPSAxO1xuXHRcdGVsc2UgaWYgKHZhbHVlIDwgMClcblx0XHRcdHZhbHVlID0gMDtcblxuXHRcdGlmICh0aGlzLl9hbHBoYSA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX2FscGhhID0gdmFsdWU7XG5cblx0XHR0aGlzLl9wSW52YWxpZGF0ZVByb3BlcnRpZXMoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgd2hldGhlciBvciBub3QgdGhlIG1hdGVyaWFsIGhhcyB0cmFuc3BhcmVuY3kuIElmIGJpbmFyeSB0cmFuc3BhcmVuY3kgaXMgc3VmZmljaWVudCwgZm9yXG5cdCAqIGV4YW1wbGUgd2hlbiB1c2luZyB0ZXh0dXJlcyBvZiBmb2xpYWdlLCBjb25zaWRlciB1c2luZyBhbHBoYVRocmVzaG9sZCBpbnN0ZWFkLlxuXHQgKi9cblx0cHVibGljIGdldCBhbHBoYUJsZW5kaW5nKCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2FscGhhQmxlbmRpbmc7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGFscGhhQmxlbmRpbmcodmFsdWU6Ym9vbGVhbilcblx0e1xuXHRcdGlmICh0aGlzLl9hbHBoYUJsZW5kaW5nID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fYWxwaGFCbGVuZGluZyA9IHZhbHVlO1xuXG5cdFx0dGhpcy5fcEludmFsaWRhdGVQcm9wZXJ0aWVzKCk7XG5cdH1cbn1cblxuZXhwb3J0ID0gQmFzaWNNYXRlcmlhbDsiXX0=