/**
 * The PixelSnapping class is an enumeration of constant values for setting
 * the pixel snapping options by using the <code>pixelSnapping</code> property
 * of a Bitmap object.
 */
var PixelSnapping = (function () {
    function PixelSnapping() {
    }
    /**
     * A constant value used in the <code>pixelSnapping</code> property of a
     * Bitmap object to specify that the bitmap image is always snapped to the
     * nearest pixel, independent of any transformation.
     */
    PixelSnapping.ALWAYS = "always";
    /**
     * A constant value used in the <code>pixelSnapping</code> property of a
     * Bitmap object to specify that the bitmap image is snapped to the nearest
     * pixel if it is drawn with no rotation or skew and it is drawn at a scale
     * factor of 99.9% to 100.1%. If these conditions are satisfied, the image is
     * drawn at 100% scale, snapped to the nearest pixel. Internally, this
     * setting allows the image to be drawn as fast as possible by using the
     * vector renderer.
     */
    PixelSnapping.AUTO = "auto";
    /**
     * A constant value used in the <code>pixelSnapping</code> property of a
     * Bitmap object to specify that no pixel snapping occurs.
     */
    PixelSnapping.NEVER = "never";
    return PixelSnapping;
})();
module.exports = PixelSnapping;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9kcmF3L1BpeGVsU25hcHBpbmcudHMiXSwibmFtZXMiOlsiUGl4ZWxTbmFwcGluZyIsIlBpeGVsU25hcHBpbmcuY29uc3RydWN0b3IiXSwibWFwcGluZ3MiOiJBQUFBLEFBS0E7Ozs7R0FERztJQUNHLGFBQWE7SUFBbkJBLFNBQU1BLGFBQWFBO0lBeUJuQkMsQ0FBQ0E7SUF2QkFEOzs7O09BSUdBO0lBQ1dBLG9CQUFNQSxHQUFVQSxRQUFRQSxDQUFDQTtJQUV2Q0E7Ozs7Ozs7O09BUUdBO0lBQ1dBLGtCQUFJQSxHQUFVQSxNQUFNQSxDQUFDQTtJQUVuQ0E7OztPQUdHQTtJQUNXQSxtQkFBS0EsR0FBVUEsT0FBT0EsQ0FBQ0E7SUFDdENBLG9CQUFDQTtBQUFEQSxDQXpCQSxBQXlCQ0EsSUFBQTtBQUVELEFBQXVCLGlCQUFkLGFBQWEsQ0FBQyIsImZpbGUiOiJkcmF3L1BpeGVsU25hcHBpbmcuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIFRoZSBQaXhlbFNuYXBwaW5nIGNsYXNzIGlzIGFuIGVudW1lcmF0aW9uIG9mIGNvbnN0YW50IHZhbHVlcyBmb3Igc2V0dGluZ1xyXG4gKiB0aGUgcGl4ZWwgc25hcHBpbmcgb3B0aW9ucyBieSB1c2luZyB0aGUgPGNvZGU+cGl4ZWxTbmFwcGluZzwvY29kZT4gcHJvcGVydHlcclxuICogb2YgYSBCaXRtYXAgb2JqZWN0LlxyXG4gKi9cclxuY2xhc3MgUGl4ZWxTbmFwcGluZ1xyXG57XHJcblx0LyoqXHJcblx0ICogQSBjb25zdGFudCB2YWx1ZSB1c2VkIGluIHRoZSA8Y29kZT5waXhlbFNuYXBwaW5nPC9jb2RlPiBwcm9wZXJ0eSBvZiBhXHJcblx0ICogQml0bWFwIG9iamVjdCB0byBzcGVjaWZ5IHRoYXQgdGhlIGJpdG1hcCBpbWFnZSBpcyBhbHdheXMgc25hcHBlZCB0byB0aGVcclxuXHQgKiBuZWFyZXN0IHBpeGVsLCBpbmRlcGVuZGVudCBvZiBhbnkgdHJhbnNmb3JtYXRpb24uXHJcblx0ICovXHJcblx0cHVibGljIHN0YXRpYyBBTFdBWVM6c3RyaW5nID0gXCJhbHdheXNcIjtcclxuXHJcblx0LyoqXHJcblx0ICogQSBjb25zdGFudCB2YWx1ZSB1c2VkIGluIHRoZSA8Y29kZT5waXhlbFNuYXBwaW5nPC9jb2RlPiBwcm9wZXJ0eSBvZiBhXHJcblx0ICogQml0bWFwIG9iamVjdCB0byBzcGVjaWZ5IHRoYXQgdGhlIGJpdG1hcCBpbWFnZSBpcyBzbmFwcGVkIHRvIHRoZSBuZWFyZXN0XHJcblx0ICogcGl4ZWwgaWYgaXQgaXMgZHJhd24gd2l0aCBubyByb3RhdGlvbiBvciBza2V3IGFuZCBpdCBpcyBkcmF3biBhdCBhIHNjYWxlXHJcblx0ICogZmFjdG9yIG9mIDk5LjklIHRvIDEwMC4xJS4gSWYgdGhlc2UgY29uZGl0aW9ucyBhcmUgc2F0aXNmaWVkLCB0aGUgaW1hZ2UgaXNcclxuXHQgKiBkcmF3biBhdCAxMDAlIHNjYWxlLCBzbmFwcGVkIHRvIHRoZSBuZWFyZXN0IHBpeGVsLiBJbnRlcm5hbGx5LCB0aGlzXHJcblx0ICogc2V0dGluZyBhbGxvd3MgdGhlIGltYWdlIHRvIGJlIGRyYXduIGFzIGZhc3QgYXMgcG9zc2libGUgYnkgdXNpbmcgdGhlXHJcblx0ICogdmVjdG9yIHJlbmRlcmVyLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzdGF0aWMgQVVUTzpzdHJpbmcgPSBcImF1dG9cIjtcclxuXHJcblx0LyoqXHJcblx0ICogQSBjb25zdGFudCB2YWx1ZSB1c2VkIGluIHRoZSA8Y29kZT5waXhlbFNuYXBwaW5nPC9jb2RlPiBwcm9wZXJ0eSBvZiBhXHJcblx0ICogQml0bWFwIG9iamVjdCB0byBzcGVjaWZ5IHRoYXQgbm8gcGl4ZWwgc25hcHBpbmcgb2NjdXJzLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzdGF0aWMgTkVWRVI6c3RyaW5nID0gXCJuZXZlclwiO1xyXG59XHJcblxyXG5leHBvcnQgPSBQaXhlbFNuYXBwaW5nOyJdfQ==