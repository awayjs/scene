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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9tYXRlcmlhbHMvQ1NTTWF0ZXJpYWxCYXNlLnRzIl0sIm5hbWVzIjpbIkNTU01hdGVyaWFsQmFzZSIsIkNTU01hdGVyaWFsQmFzZS5jb25zdHJ1Y3RvciIsIkNTU01hdGVyaWFsQmFzZS5pbWFnZUVsZW1lbnQiLCJDU1NNYXRlcmlhbEJhc2UuaW1hZ2VTdHlsZSIsIkNTU01hdGVyaWFsQmFzZS50ZXh0dXJlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFPLFlBQVksV0FBZSwyQ0FBMkMsQ0FBQyxDQUFDO0FBQy9FLElBQU8sWUFBWSxXQUFlLHVDQUF1QyxDQUFDLENBQUM7QUFHM0UsQUFXQTs7Ozs7Ozs7OztHQURHO0lBQ0csZUFBZTtJQUFTQSxVQUF4QkEsZUFBZUEsVUFBcUJBO0lBNER6Q0E7O09BRUdBO0lBQ0hBLFNBL0RLQSxlQUFlQSxDQStEUkEsT0FBNEJBLEVBQUVBLE1BQXFCQSxFQUFFQSxNQUFzQkE7UUFBM0VDLHVCQUE0QkEsR0FBNUJBLGNBQTRCQTtRQUFFQSxzQkFBcUJBLEdBQXJCQSxhQUFxQkE7UUFBRUEsc0JBQXNCQSxHQUF0QkEsY0FBc0JBO1FBRXRGQSxpQkFBT0EsQ0FBQ0E7UUFFUkEsSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7UUFFcENBLElBQUlBLENBQUNBLE9BQU9BLEdBQUdBLE9BQU9BLENBQUNBO1FBRXZCQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxNQUFNQSxDQUFDQTtRQUNyQkEsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBR0EsTUFBTUEsQ0FBQ0E7SUFDdEJBLENBQUNBO0lBbkVERCxzQkFBV0EseUNBQVlBO2FBQXZCQTtZQUVDRSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQTtRQUMzQkEsQ0FBQ0E7OztPQUFBRjtJQUVEQSxzQkFBV0EsdUNBQVVBO2FBQXJCQTtZQUVDRyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQTtRQUN6QkEsQ0FBQ0E7OztPQUFBSDtJQUtEQSxzQkFBV0Esb0NBQU9BO1FBSGxCQTs7V0FFR0E7YUFDSEE7WUFFQ0ksTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0E7UUFDdkJBLENBQUNBO2FBRURKLFVBQW1CQSxLQUFtQkE7WUFFckNJLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFNBQVNBLElBQUlBLEtBQUtBLENBQUNBO2dCQUMzQkEsTUFBTUEsQ0FBQ0E7WUFFUkEsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsS0FBS0EsQ0FBQ0E7WUFFdkJBLEVBQUVBLENBQUNBLENBQUNBLEtBQUtBLFlBQVlBLFlBQVlBLENBQUNBLENBQUNBLENBQUNBO2dCQUNuQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsR0FBbUJBLEtBQU1BLENBQUNBLGdCQUFnQkEsQ0FBQ0E7Z0JBRTdEQSxJQUFJQSxJQUFJQSxHQUFvQkEsUUFBUUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzVEQSxJQUFJQSxDQUFDQSxJQUFJQSxHQUFHQSxVQUFVQSxDQUFDQTtnQkFDdkJBLFFBQVFBLENBQUNBLG9CQUFvQkEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7Z0JBRTNEQSxJQUFJQSxLQUFLQSxHQUFpQ0EsUUFBUUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsTUFBTUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2hHQSxLQUFLQSxDQUFDQSxVQUFVQSxDQUFDQSxXQUFXQSxHQUFHQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFHQSxLQUFLQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDbkRBLElBQUlBLEtBQUtBLEdBQXdDQSxLQUFLQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFFQSxDQUFDQSxLQUFLQSxDQUFDQTtnQkFFMUVBLEtBQUtBLENBQUNBLGVBQWVBLEdBQUdBLE1BQU1BLEdBQUdBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBO2dCQUM5REEsS0FBS0EsQ0FBQ0EsY0FBY0EsR0FBR0EsV0FBV0EsQ0FBQ0E7Z0JBQ25DQSxLQUFLQSxDQUFDQSxRQUFRQSxHQUFHQSxVQUFVQSxDQUFDQTtnQkFDNUJBLEtBQUtBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBO2dCQUM5Q0EsS0FBS0EsQ0FBQ0EsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0E7Z0JBQ2hEQSxLQUFLQSxDQUFDQSxlQUFlQSxHQUNsQkEsS0FBS0EsQ0FBQ0EsMEJBQTBCQSxDQUFDQSxHQUNqQ0EsS0FBS0EsQ0FBQ0EsdUJBQXVCQSxDQUFDQSxHQUM5QkEsS0FBS0EsQ0FBQ0EscUJBQXFCQSxDQUFDQSxHQUM1QkEsS0FBS0EsQ0FBQ0Esc0JBQXNCQSxDQUFDQSxHQUFHQSxPQUFPQSxDQUFDQTtnQkFFM0NBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLE1BQU1BLENBQUNBO2dCQUMxQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7Z0JBRXhDQSxJQUFJQSxDQUFDQSxtQkFBbUJBLEVBQUVBLENBQUNBO1lBQzVCQSxDQUFDQTtRQUNGQSxDQUFDQTs7O09BcENBSjtJQW9ERkEsc0JBQUNBO0FBQURBLENBMUVBLEFBMEVDQSxFQTFFNkIsWUFBWSxFQTBFekM7QUFFRCxBQUF5QixpQkFBaEIsZUFBZSxDQUFDIiwiZmlsZSI6Im1hdGVyaWFscy9DU1NNYXRlcmlhbEJhc2UuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1hdGVyaWFsQmFzZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvbWF0ZXJpYWxzL01hdGVyaWFsQmFzZVwiKTtcclxuaW1wb3J0IEltYWdlVGV4dHVyZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvdGV4dHVyZXMvSW1hZ2VUZXh0dXJlXCIpO1xyXG5pbXBvcnQgVGV4dHVyZTJEQmFzZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL3RleHR1cmVzL1RleHR1cmUyREJhc2VcIik7XHJcblxyXG4vKipcclxuICogTWF0ZXJpYWxCYXNlIGZvcm1zIGFuIGFic3RyYWN0IGJhc2UgY2xhc3MgZm9yIGFueSBtYXRlcmlhbC5cclxuICogQSBtYXRlcmlhbCBjb25zaXN0cyBvZiBzZXZlcmFsIHBhc3NlcywgZWFjaCBvZiB3aGljaCBjb25zdGl0dXRlcyBhdCBsZWFzdCBvbmUgcmVuZGVyIGNhbGwuIFNldmVyYWwgcGFzc2VzIGNvdWxkXHJcbiAqIGJlIHVzZWQgZm9yIHNwZWNpYWwgZWZmZWN0cyAocmVuZGVyIGxpZ2h0aW5nIGZvciBtYW55IGxpZ2h0cyBpbiBzZXZlcmFsIHBhc3NlcywgcmVuZGVyIGFuIG91dGxpbmUgaW4gYSBzZXBhcmF0ZVxyXG4gKiBwYXNzKSBvciB0byBwcm92aWRlIGFkZGl0aW9uYWwgcmVuZGVyLXRvLXRleHR1cmUgcGFzc2VzIChyZW5kZXJpbmcgZGlmZnVzZSBsaWdodCB0byB0ZXh0dXJlIGZvciB0ZXh0dXJlLXNwYWNlXHJcbiAqIHN1YnN1cmZhY2Ugc2NhdHRlcmluZywgb3IgcmVuZGVyaW5nIGEgZGVwdGggbWFwIGZvciBzcGVjaWFsaXplZCBzZWxmLXNoYWRvd2luZykuXHJcbiAqXHJcbiAqIEF3YXkzRCBwcm92aWRlcyBkZWZhdWx0IG1hdGVyaWFscyB0cm91Z2ggU2luZ2xlUGFzc01hdGVyaWFsQmFzZSBhbmQgTXVsdGlQYXNzTWF0ZXJpYWxCYXNlLCB3aGljaCB1c2UgbW9kdWxhclxyXG4gKiBtZXRob2RzIHRvIGJ1aWxkIHRoZSBzaGFkZXIgY29kZS4gTWF0ZXJpYWxCYXNlIGNhbiBiZSBleHRlbmRlZCB0byBidWlsZCBzcGVjaWZpYyBhbmQgaGlnaC1wZXJmb3JtYW50IGN1c3RvbVxyXG4gKiBzaGFkZXJzLCBvciBlbnRpcmUgbmV3IG1hdGVyaWFsIGZyYW1ld29ya3MuXHJcbiAqL1xyXG5jbGFzcyBDU1NNYXRlcmlhbEJhc2UgZXh0ZW5kcyBNYXRlcmlhbEJhc2Vcclxue1xyXG5cdHByaXZhdGUgX2ltYWdlRWxlbWVudDpIVE1MSW1hZ2VFbGVtZW50O1xyXG5cdHByaXZhdGUgX2ltYWdlU3R5bGU6TVNTdHlsZUNTU1Byb3BlcnRpZXM7XHJcblxyXG5cclxuXHRwdWJsaWMgZ2V0IGltYWdlRWxlbWVudCgpOkhUTUxJbWFnZUVsZW1lbnRcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5faW1hZ2VFbGVtZW50O1xyXG5cdH1cclxuXHJcblx0cHVibGljIGdldCBpbWFnZVN0eWxlKCk6TVNTdHlsZUNTU1Byb3BlcnRpZXNcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5faW1hZ2VTdHlsZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSB0ZXh0dXJlIG9iamVjdCB0byB1c2UgZm9yIHRoZSBhbGJlZG8gY29sb3VyLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgdGV4dHVyZSgpOlRleHR1cmUyREJhc2VcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcFRleHR1cmU7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHRleHR1cmUodmFsdWU6VGV4dHVyZTJEQmFzZSlcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fcFRleHR1cmUgPT0gdmFsdWUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9wVGV4dHVyZSA9IHZhbHVlO1xyXG5cclxuXHRcdGlmICh2YWx1ZSBpbnN0YW5jZW9mIEltYWdlVGV4dHVyZSkge1xyXG5cdFx0XHR0aGlzLl9pbWFnZUVsZW1lbnQgPSAoPEltYWdlVGV4dHVyZT4gdmFsdWUpLmh0bWxJbWFnZUVsZW1lbnQ7XHJcblxyXG5cdFx0XHR2YXIgbm9kZTpIVE1MU3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xyXG5cdFx0XHRub2RlLnR5cGUgPSBcInRleHQvY3NzXCI7XHJcblx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXS5hcHBlbmRDaGlsZChub2RlKTtcclxuXHJcblx0XHRcdHZhciBzaGVldDpDU1NTdHlsZVNoZWV0ID0gPENTU1N0eWxlU2hlZXQ+IGRvY3VtZW50LnN0eWxlU2hlZXRzW2RvY3VtZW50LnN0eWxlU2hlZXRzLmxlbmd0aCAtIDFdO1xyXG5cdFx0XHRzaGVldC5pbnNlcnRSdWxlKFwiLm1hdGVyaWFsXCIgKyB0aGlzLmlkICsgXCJ7IH1cIiwgMCk7XHJcblx0XHRcdHZhciBzdHlsZTpNU1N0eWxlQ1NTUHJvcGVydGllcyA9ICg8Q1NTU3R5bGVSdWxlPiBzaGVldC5jc3NSdWxlc1swXSkuc3R5bGU7XHJcblxyXG5cdFx0XHRzdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybChcIiArIHRoaXMuX2ltYWdlRWxlbWVudC5zcmMgKyBcIilcIjtcclxuXHRcdFx0c3R5bGUuYmFja2dyb3VuZFNpemUgPSBcIjEwMCUgMTAwJVwiO1xyXG5cdFx0XHRzdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcclxuXHRcdFx0c3R5bGUud2lkdGggPSB0aGlzLl9pbWFnZUVsZW1lbnQud2lkdGggKyBcInB4XCI7XHJcblx0XHRcdHN0eWxlLmhlaWdodCA9IHRoaXMuX2ltYWdlRWxlbWVudC5oZWlnaHQgKyBcInB4XCI7XHJcblx0XHRcdHN0eWxlLnRyYW5zZm9ybU9yaWdpblxyXG5cdFx0XHRcdD0gc3R5bGVbXCItd2Via2l0LXRyYW5zZm9ybS1vcmlnaW5cIl1cclxuXHRcdFx0XHQ9IHN0eWxlW1wiLW1vei10cmFuc2Zvcm0tb3JpZ2luXCJdXHJcblx0XHRcdFx0PSBzdHlsZVtcIi1vLXRyYW5zZm9ybS1vcmlnaW5cIl1cclxuXHRcdFx0XHQ9IHN0eWxlW1wiLW1zLXRyYW5zZm9ybS1vcmlnaW5cIl0gPSBcIjAlIDAlXCI7XHJcblxyXG5cdFx0XHR0aGlzLl9wSGVpZ2h0ID0gdGhpcy5faW1hZ2VFbGVtZW50LmhlaWdodDtcclxuXHRcdFx0dGhpcy5fcFdpZHRoID0gdGhpcy5faW1hZ2VFbGVtZW50LndpZHRoO1xyXG5cclxuXHRcdFx0dGhpcy5fcE5vdGlmeVNpemVDaGFuZ2VkKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGEgbmV3IE1hdGVyaWFsQmFzZSBvYmplY3QuXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IodGV4dHVyZTpUZXh0dXJlMkRCYXNlID0gbnVsbCwgc21vb3RoOmJvb2xlYW4gPSB0cnVlLCByZXBlYXQ6Ym9vbGVhbiA9IGZhbHNlKVxyXG5cdHtcclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0dGhpcy5faU1hdGVyaWFsSWQgPSBOdW1iZXIodGhpcy5pZCk7XHJcblxyXG5cdFx0dGhpcy50ZXh0dXJlID0gdGV4dHVyZTtcclxuXHJcblx0XHR0aGlzLnNtb290aCA9IHNtb290aDtcclxuXHRcdHRoaXMucmVwZWF0ID0gcmVwZWF0O1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0ID0gQ1NTTWF0ZXJpYWxCYXNlOyJdfQ==