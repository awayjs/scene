var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MaterialBase = require("awayjs-display/lib/materials/MaterialBase");
var ImageTexture = require("awayjs-core/lib/textures/ImageTexture");
/**
 * MaterialBase forms an abstract base class for any material.
 * A material consists of several passes, each of which constitutes at least one render call. Several passes could
 * be used for special effects (render lighting for many lights in several passes, render an outline in a separate
 * pass) or to provide additional render-to-texture passes (rendering diffuse light to texture for texture-space
 * subsurface scattering, or rendering a depth map for specialized self-shadowing).
 *
 * Away3D provides default materials trough SinglePassMaterialBase and MultiPassMaterialBase, which use modular
 * methods to build the shader code. MaterialBase can be extended to build specific and high-performant custom
 * shaders, or entire new material frameworks.
 */
var CSSMaterialBase = (function (_super) {
    __extends(CSSMaterialBase, _super);
    /**
     * Creates a new MaterialBase object.
     */
    function CSSMaterialBase(texture, smooth, repeat) {
        if (texture === void 0) { texture = null; }
        if (smooth === void 0) { smooth = true; }
        if (repeat === void 0) { repeat = false; }
        _super.call(this);
        this._iMaterialId = Number(this.id);
        this.texture = texture;
        this.smooth = smooth;
        this.repeat = repeat;
    }
    Object.defineProperty(CSSMaterialBase.prototype, "imageElement", {
        get: function () {
            return this._imageElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CSSMaterialBase.prototype, "imageStyle", {
        get: function () {
            return this._imageStyle;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CSSMaterialBase.prototype, "texture", {
        /**
         * The texture object to use for the albedo colour.
         */
        get: function () {
            return this._pTexture;
        },
        set: function (value) {
            if (this._pTexture == value)
                return;
            this._pTexture = value;
            if (value instanceof ImageTexture) {
                this._imageElement = value.htmlImageElement;
                var node = document.createElement("style");
                node.type = "text/css";
                document.getElementsByTagName("head")[0].appendChild(node);
                var sheet = document.styleSheets[document.styleSheets.length - 1];
                sheet.insertRule(".material" + this.id + "{ }", 0);
                var style = sheet.cssRules[0].style;
                style.backgroundImage = "url(" + this._imageElement.src + ")";
                style.backgroundSize = "100% 100%";
                style.position = "absolute";
                style.width = this._imageElement.width + "px";
                style.height = this._imageElement.height + "px";
                style.transformOrigin = style["-webkit-transform-origin"] = style["-moz-transform-origin"] = style["-o-transform-origin"] = style["-ms-transform-origin"] = "0% 0%";
                this._pHeight = this._imageElement.height;
                this._pWidth = this._imageElement.width;
                this._pNotifySizeChanged();
            }
        },
        enumerable: true,
        configurable: true
    });
    return CSSMaterialBase;
})(MaterialBase);
module.exports = CSSMaterialBase;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9tYXRlcmlhbHMvY3NzbWF0ZXJpYWxiYXNlLnRzIl0sIm5hbWVzIjpbIkNTU01hdGVyaWFsQmFzZSIsIkNTU01hdGVyaWFsQmFzZS5jb25zdHJ1Y3RvciIsIkNTU01hdGVyaWFsQmFzZS5pbWFnZUVsZW1lbnQiLCJDU1NNYXRlcmlhbEJhc2UuaW1hZ2VTdHlsZSIsIkNTU01hdGVyaWFsQmFzZS50ZXh0dXJlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFPLFlBQVksV0FBZSwyQ0FBMkMsQ0FBQyxDQUFDO0FBQy9FLElBQU8sWUFBWSxXQUFlLHVDQUF1QyxDQUFDLENBQUM7QUFHM0UsQUFXQTs7Ozs7Ozs7OztHQURHO0lBQ0csZUFBZTtJQUFTQSxVQUF4QkEsZUFBZUEsVUFBcUJBO0lBNER6Q0E7O09BRUdBO0lBQ0hBLFNBL0RLQSxlQUFlQSxDQStEUkEsT0FBNEJBLEVBQUVBLE1BQXFCQSxFQUFFQSxNQUFzQkE7UUFBM0VDLHVCQUE0QkEsR0FBNUJBLGNBQTRCQTtRQUFFQSxzQkFBcUJBLEdBQXJCQSxhQUFxQkE7UUFBRUEsc0JBQXNCQSxHQUF0QkEsY0FBc0JBO1FBRXRGQSxpQkFBT0EsQ0FBQ0E7UUFFUkEsSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7UUFFcENBLElBQUlBLENBQUNBLE9BQU9BLEdBQUdBLE9BQU9BLENBQUNBO1FBRXZCQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxNQUFNQSxDQUFDQTtRQUNyQkEsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBR0EsTUFBTUEsQ0FBQ0E7SUFDdEJBLENBQUNBO0lBbkVERCxzQkFBV0EseUNBQVlBO2FBQXZCQTtZQUVDRSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQTtRQUMzQkEsQ0FBQ0E7OztPQUFBRjtJQUVEQSxzQkFBV0EsdUNBQVVBO2FBQXJCQTtZQUVDRyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQTtRQUN6QkEsQ0FBQ0E7OztPQUFBSDtJQUtEQSxzQkFBV0Esb0NBQU9BO1FBSGxCQTs7V0FFR0E7YUFDSEE7WUFFQ0ksTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0E7UUFDdkJBLENBQUNBO2FBRURKLFVBQW1CQSxLQUFtQkE7WUFFckNJLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFNBQVNBLElBQUlBLEtBQUtBLENBQUNBO2dCQUMzQkEsTUFBTUEsQ0FBQ0E7WUFFUkEsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsS0FBS0EsQ0FBQ0E7WUFFdkJBLEVBQUVBLENBQUNBLENBQUNBLEtBQUtBLFlBQVlBLFlBQVlBLENBQUNBLENBQUNBLENBQUNBO2dCQUNuQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsR0FBbUJBLEtBQU1BLENBQUNBLGdCQUFnQkEsQ0FBQ0E7Z0JBRTdEQSxJQUFJQSxJQUFJQSxHQUFvQkEsUUFBUUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzVEQSxJQUFJQSxDQUFDQSxJQUFJQSxHQUFHQSxVQUFVQSxDQUFDQTtnQkFDdkJBLFFBQVFBLENBQUNBLG9CQUFvQkEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7Z0JBRTNEQSxJQUFJQSxLQUFLQSxHQUFpQ0EsUUFBUUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsTUFBTUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2hHQSxLQUFLQSxDQUFDQSxVQUFVQSxDQUFDQSxXQUFXQSxHQUFHQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFHQSxLQUFLQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDbkRBLElBQUlBLEtBQUtBLEdBQXdDQSxLQUFLQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFFQSxDQUFDQSxLQUFLQSxDQUFDQTtnQkFFMUVBLEtBQUtBLENBQUNBLGVBQWVBLEdBQUdBLE1BQU1BLEdBQUdBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBO2dCQUM5REEsS0FBS0EsQ0FBQ0EsY0FBY0EsR0FBR0EsV0FBV0EsQ0FBQ0E7Z0JBQ25DQSxLQUFLQSxDQUFDQSxRQUFRQSxHQUFHQSxVQUFVQSxDQUFDQTtnQkFDNUJBLEtBQUtBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBO2dCQUM5Q0EsS0FBS0EsQ0FBQ0EsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0E7Z0JBQ2hEQSxLQUFLQSxDQUFDQSxlQUFlQSxHQUNsQkEsS0FBS0EsQ0FBQ0EsMEJBQTBCQSxDQUFDQSxHQUNqQ0EsS0FBS0EsQ0FBQ0EsdUJBQXVCQSxDQUFDQSxHQUM5QkEsS0FBS0EsQ0FBQ0EscUJBQXFCQSxDQUFDQSxHQUM1QkEsS0FBS0EsQ0FBQ0Esc0JBQXNCQSxDQUFDQSxHQUFHQSxPQUFPQSxDQUFDQTtnQkFFM0NBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLE1BQU1BLENBQUNBO2dCQUMxQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7Z0JBRXhDQSxJQUFJQSxDQUFDQSxtQkFBbUJBLEVBQUVBLENBQUNBO1lBQzVCQSxDQUFDQTtRQUNGQSxDQUFDQTs7O09BcENBSjtJQW9ERkEsc0JBQUNBO0FBQURBLENBMUVBLEFBMEVDQSxFQTFFNkIsWUFBWSxFQTBFekM7QUFFRCxBQUF5QixpQkFBaEIsZUFBZSxDQUFDIiwiZmlsZSI6Im1hdGVyaWFscy9DU1NNYXRlcmlhbEJhc2UuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1hdGVyaWFsQmFzZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvbWF0ZXJpYWxzL01hdGVyaWFsQmFzZVwiKTtcbmltcG9ydCBJbWFnZVRleHR1cmVcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL3RleHR1cmVzL0ltYWdlVGV4dHVyZVwiKTtcbmltcG9ydCBUZXh0dXJlMkRCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvdGV4dHVyZXMvVGV4dHVyZTJEQmFzZVwiKTtcblxuLyoqXG4gKiBNYXRlcmlhbEJhc2UgZm9ybXMgYW4gYWJzdHJhY3QgYmFzZSBjbGFzcyBmb3IgYW55IG1hdGVyaWFsLlxuICogQSBtYXRlcmlhbCBjb25zaXN0cyBvZiBzZXZlcmFsIHBhc3NlcywgZWFjaCBvZiB3aGljaCBjb25zdGl0dXRlcyBhdCBsZWFzdCBvbmUgcmVuZGVyIGNhbGwuIFNldmVyYWwgcGFzc2VzIGNvdWxkXG4gKiBiZSB1c2VkIGZvciBzcGVjaWFsIGVmZmVjdHMgKHJlbmRlciBsaWdodGluZyBmb3IgbWFueSBsaWdodHMgaW4gc2V2ZXJhbCBwYXNzZXMsIHJlbmRlciBhbiBvdXRsaW5lIGluIGEgc2VwYXJhdGVcbiAqIHBhc3MpIG9yIHRvIHByb3ZpZGUgYWRkaXRpb25hbCByZW5kZXItdG8tdGV4dHVyZSBwYXNzZXMgKHJlbmRlcmluZyBkaWZmdXNlIGxpZ2h0IHRvIHRleHR1cmUgZm9yIHRleHR1cmUtc3BhY2VcbiAqIHN1YnN1cmZhY2Ugc2NhdHRlcmluZywgb3IgcmVuZGVyaW5nIGEgZGVwdGggbWFwIGZvciBzcGVjaWFsaXplZCBzZWxmLXNoYWRvd2luZykuXG4gKlxuICogQXdheTNEIHByb3ZpZGVzIGRlZmF1bHQgbWF0ZXJpYWxzIHRyb3VnaCBTaW5nbGVQYXNzTWF0ZXJpYWxCYXNlIGFuZCBNdWx0aVBhc3NNYXRlcmlhbEJhc2UsIHdoaWNoIHVzZSBtb2R1bGFyXG4gKiBtZXRob2RzIHRvIGJ1aWxkIHRoZSBzaGFkZXIgY29kZS4gTWF0ZXJpYWxCYXNlIGNhbiBiZSBleHRlbmRlZCB0byBidWlsZCBzcGVjaWZpYyBhbmQgaGlnaC1wZXJmb3JtYW50IGN1c3RvbVxuICogc2hhZGVycywgb3IgZW50aXJlIG5ldyBtYXRlcmlhbCBmcmFtZXdvcmtzLlxuICovXG5jbGFzcyBDU1NNYXRlcmlhbEJhc2UgZXh0ZW5kcyBNYXRlcmlhbEJhc2Vcbntcblx0cHJpdmF0ZSBfaW1hZ2VFbGVtZW50OkhUTUxJbWFnZUVsZW1lbnQ7XG5cdHByaXZhdGUgX2ltYWdlU3R5bGU6TVNTdHlsZUNTU1Byb3BlcnRpZXM7XG5cblxuXHRwdWJsaWMgZ2V0IGltYWdlRWxlbWVudCgpOkhUTUxJbWFnZUVsZW1lbnRcblx0e1xuXHRcdHJldHVybiB0aGlzLl9pbWFnZUVsZW1lbnQ7XG5cdH1cblxuXHRwdWJsaWMgZ2V0IGltYWdlU3R5bGUoKTpNU1N0eWxlQ1NTUHJvcGVydGllc1xuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2ltYWdlU3R5bGU7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIHRleHR1cmUgb2JqZWN0IHRvIHVzZSBmb3IgdGhlIGFsYmVkbyBjb2xvdXIuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHRleHR1cmUoKTpUZXh0dXJlMkRCYXNlXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcFRleHR1cmU7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHRleHR1cmUodmFsdWU6VGV4dHVyZTJEQmFzZSlcblx0e1xuXHRcdGlmICh0aGlzLl9wVGV4dHVyZSA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3BUZXh0dXJlID0gdmFsdWU7XG5cblx0XHRpZiAodmFsdWUgaW5zdGFuY2VvZiBJbWFnZVRleHR1cmUpIHtcblx0XHRcdHRoaXMuX2ltYWdlRWxlbWVudCA9ICg8SW1hZ2VUZXh0dXJlPiB2YWx1ZSkuaHRtbEltYWdlRWxlbWVudDtcblxuXHRcdFx0dmFyIG5vZGU6SFRNTFN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcblx0XHRcdG5vZGUudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXS5hcHBlbmRDaGlsZChub2RlKTtcblxuXHRcdFx0dmFyIHNoZWV0OkNTU1N0eWxlU2hlZXQgPSA8Q1NTU3R5bGVTaGVldD4gZG9jdW1lbnQuc3R5bGVTaGVldHNbZG9jdW1lbnQuc3R5bGVTaGVldHMubGVuZ3RoIC0gMV07XG5cdFx0XHRzaGVldC5pbnNlcnRSdWxlKFwiLm1hdGVyaWFsXCIgKyB0aGlzLmlkICsgXCJ7IH1cIiwgMCk7XG5cdFx0XHR2YXIgc3R5bGU6TVNTdHlsZUNTU1Byb3BlcnRpZXMgPSAoPENTU1N0eWxlUnVsZT4gc2hlZXQuY3NzUnVsZXNbMF0pLnN0eWxlO1xuXG5cdFx0XHRzdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybChcIiArIHRoaXMuX2ltYWdlRWxlbWVudC5zcmMgKyBcIilcIjtcblx0XHRcdHN0eWxlLmJhY2tncm91bmRTaXplID0gXCIxMDAlIDEwMCVcIjtcblx0XHRcdHN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuXHRcdFx0c3R5bGUud2lkdGggPSB0aGlzLl9pbWFnZUVsZW1lbnQud2lkdGggKyBcInB4XCI7XG5cdFx0XHRzdHlsZS5oZWlnaHQgPSB0aGlzLl9pbWFnZUVsZW1lbnQuaGVpZ2h0ICsgXCJweFwiO1xuXHRcdFx0c3R5bGUudHJhbnNmb3JtT3JpZ2luXG5cdFx0XHRcdD0gc3R5bGVbXCItd2Via2l0LXRyYW5zZm9ybS1vcmlnaW5cIl1cblx0XHRcdFx0PSBzdHlsZVtcIi1tb3otdHJhbnNmb3JtLW9yaWdpblwiXVxuXHRcdFx0XHQ9IHN0eWxlW1wiLW8tdHJhbnNmb3JtLW9yaWdpblwiXVxuXHRcdFx0XHQ9IHN0eWxlW1wiLW1zLXRyYW5zZm9ybS1vcmlnaW5cIl0gPSBcIjAlIDAlXCI7XG5cblx0XHRcdHRoaXMuX3BIZWlnaHQgPSB0aGlzLl9pbWFnZUVsZW1lbnQuaGVpZ2h0O1xuXHRcdFx0dGhpcy5fcFdpZHRoID0gdGhpcy5faW1hZ2VFbGVtZW50LndpZHRoO1xuXG5cdFx0XHR0aGlzLl9wTm90aWZ5U2l6ZUNoYW5nZWQoKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlcyBhIG5ldyBNYXRlcmlhbEJhc2Ugb2JqZWN0LlxuXHQgKi9cblx0Y29uc3RydWN0b3IodGV4dHVyZTpUZXh0dXJlMkRCYXNlID0gbnVsbCwgc21vb3RoOmJvb2xlYW4gPSB0cnVlLCByZXBlYXQ6Ym9vbGVhbiA9IGZhbHNlKVxuXHR7XG5cdFx0c3VwZXIoKTtcblxuXHRcdHRoaXMuX2lNYXRlcmlhbElkID0gTnVtYmVyKHRoaXMuaWQpO1xuXG5cdFx0dGhpcy50ZXh0dXJlID0gdGV4dHVyZTtcblxuXHRcdHRoaXMuc21vb3RoID0gc21vb3RoO1xuXHRcdHRoaXMucmVwZWF0ID0gcmVwZWF0O1xuXHR9XG59XG5cbmV4cG9ydCA9IENTU01hdGVyaWFsQmFzZTsiXX0=