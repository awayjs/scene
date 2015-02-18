/**
 * The GridFitType class defines values for grid fitting in the TextField class.
 */
var GridFitType = (function () {
    function GridFitType() {
    }
    /**
     * Doesn't set grid fitting. Horizontal and vertical lines in the glyphs are
     * not forced to the pixel grid. This constant is used in setting the
     * <code>gridFitType</code> property of the TextField class. This is often a
     * good setting for animation or for large font sizes. Use the syntax
     * <code>GridFitType.NONE</code>.
     */
    GridFitType.NONE = "none";
    /**
     * Fits strong horizontal and vertical lines to the pixel grid. This constant
     * is used in setting the <code>gridFitType</code> property of the TextField
     * class. This setting only works for left-justified text fields and acts
     * like the <code>GridFitType.SUBPIXEL</code> constant in static text. This
     * setting generally provides the best readability for left-aligned text. Use
     * the syntax <code>GridFitType.PIXEL</code>.
     */
    GridFitType.PIXEL = "pixel";
    /**
     * Fits strong horizontal and vertical lines to the sub-pixel grid on LCD
     * monitors. (Red, green, and blue are actual pixels on an LCD screen.) This
     * is often a good setting for right-aligned or center-aligned dynamic text,
     * and it is sometimes a useful tradeoff for animation vs. text quality. This
     * constant is used in setting the <code>gridFitType</code> property of the
     * TextField class. Use the syntax <code>GridFitType.SUBPIXEL</code>.
     */
    GridFitType.SUBPIXEL = "subpixel";
    return GridFitType;
})();
module.exports = GridFitType;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi90ZXh0L0dyaWRGaXRUeXBlLnRzIl0sIm5hbWVzIjpbIkdyaWRGaXRUeXBlIiwiR3JpZEZpdFR5cGUuY29uc3RydWN0b3IiXSwibWFwcGluZ3MiOiJBQUFBLEFBR0E7O0dBREc7SUFDRyxXQUFXO0lBQWpCQSxTQUFNQSxXQUFXQTtJQThCakJDLENBQUNBO0lBNUJBRDs7Ozs7O09BTUdBO0lBQ1dBLGdCQUFJQSxHQUFVQSxNQUFNQSxDQUFDQTtJQUVuQ0E7Ozs7Ozs7T0FPR0E7SUFDV0EsaUJBQUtBLEdBQVVBLE9BQU9BLENBQUNBO0lBRXJDQTs7Ozs7OztPQU9HQTtJQUNXQSxvQkFBUUEsR0FBVUEsVUFBVUEsQ0FBQ0E7SUFDNUNBLGtCQUFDQTtBQUFEQSxDQTlCQSxBQThCQ0EsSUFBQTtBQUVELEFBQXFCLGlCQUFaLFdBQVcsQ0FBQyIsImZpbGUiOiJ0ZXh0L0dyaWRGaXRUeXBlLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBUaGUgR3JpZEZpdFR5cGUgY2xhc3MgZGVmaW5lcyB2YWx1ZXMgZm9yIGdyaWQgZml0dGluZyBpbiB0aGUgVGV4dEZpZWxkIGNsYXNzLlxyXG4gKi9cclxuY2xhc3MgR3JpZEZpdFR5cGVcclxue1xyXG5cdC8qKlxyXG5cdCAqIERvZXNuJ3Qgc2V0IGdyaWQgZml0dGluZy4gSG9yaXpvbnRhbCBhbmQgdmVydGljYWwgbGluZXMgaW4gdGhlIGdseXBocyBhcmVcclxuXHQgKiBub3QgZm9yY2VkIHRvIHRoZSBwaXhlbCBncmlkLiBUaGlzIGNvbnN0YW50IGlzIHVzZWQgaW4gc2V0dGluZyB0aGVcclxuXHQgKiA8Y29kZT5ncmlkRml0VHlwZTwvY29kZT4gcHJvcGVydHkgb2YgdGhlIFRleHRGaWVsZCBjbGFzcy4gVGhpcyBpcyBvZnRlbiBhXHJcblx0ICogZ29vZCBzZXR0aW5nIGZvciBhbmltYXRpb24gb3IgZm9yIGxhcmdlIGZvbnQgc2l6ZXMuIFVzZSB0aGUgc3ludGF4XHJcblx0ICogPGNvZGU+R3JpZEZpdFR5cGUuTk9ORTwvY29kZT4uXHJcblx0ICovXHJcblx0cHVibGljIHN0YXRpYyBOT05FOnN0cmluZyA9IFwibm9uZVwiO1xyXG5cclxuXHQvKipcclxuXHQgKiBGaXRzIHN0cm9uZyBob3Jpem9udGFsIGFuZCB2ZXJ0aWNhbCBsaW5lcyB0byB0aGUgcGl4ZWwgZ3JpZC4gVGhpcyBjb25zdGFudFxyXG5cdCAqIGlzIHVzZWQgaW4gc2V0dGluZyB0aGUgPGNvZGU+Z3JpZEZpdFR5cGU8L2NvZGU+IHByb3BlcnR5IG9mIHRoZSBUZXh0RmllbGRcclxuXHQgKiBjbGFzcy4gVGhpcyBzZXR0aW5nIG9ubHkgd29ya3MgZm9yIGxlZnQtanVzdGlmaWVkIHRleHQgZmllbGRzIGFuZCBhY3RzXHJcblx0ICogbGlrZSB0aGUgPGNvZGU+R3JpZEZpdFR5cGUuU1VCUElYRUw8L2NvZGU+IGNvbnN0YW50IGluIHN0YXRpYyB0ZXh0LiBUaGlzXHJcblx0ICogc2V0dGluZyBnZW5lcmFsbHkgcHJvdmlkZXMgdGhlIGJlc3QgcmVhZGFiaWxpdHkgZm9yIGxlZnQtYWxpZ25lZCB0ZXh0LiBVc2VcclxuXHQgKiB0aGUgc3ludGF4IDxjb2RlPkdyaWRGaXRUeXBlLlBJWEVMPC9jb2RlPi5cclxuXHQgKi9cclxuXHRwdWJsaWMgc3RhdGljIFBJWEVMOnN0cmluZyA9IFwicGl4ZWxcIjtcclxuXHJcblx0LyoqXHJcblx0ICogRml0cyBzdHJvbmcgaG9yaXpvbnRhbCBhbmQgdmVydGljYWwgbGluZXMgdG8gdGhlIHN1Yi1waXhlbCBncmlkIG9uIExDRFxyXG5cdCAqIG1vbml0b3JzLiAoUmVkLCBncmVlbiwgYW5kIGJsdWUgYXJlIGFjdHVhbCBwaXhlbHMgb24gYW4gTENEIHNjcmVlbi4pIFRoaXNcclxuXHQgKiBpcyBvZnRlbiBhIGdvb2Qgc2V0dGluZyBmb3IgcmlnaHQtYWxpZ25lZCBvciBjZW50ZXItYWxpZ25lZCBkeW5hbWljIHRleHQsXHJcblx0ICogYW5kIGl0IGlzIHNvbWV0aW1lcyBhIHVzZWZ1bCB0cmFkZW9mZiBmb3IgYW5pbWF0aW9uIHZzLiB0ZXh0IHF1YWxpdHkuIFRoaXNcclxuXHQgKiBjb25zdGFudCBpcyB1c2VkIGluIHNldHRpbmcgdGhlIDxjb2RlPmdyaWRGaXRUeXBlPC9jb2RlPiBwcm9wZXJ0eSBvZiB0aGVcclxuXHQgKiBUZXh0RmllbGQgY2xhc3MuIFVzZSB0aGUgc3ludGF4IDxjb2RlPkdyaWRGaXRUeXBlLlNVQlBJWEVMPC9jb2RlPi5cclxuXHQgKi9cclxuXHRwdWJsaWMgc3RhdGljIFNVQlBJWEVMOnN0cmluZyA9IFwic3VicGl4ZWxcIjtcclxufVxyXG5cclxuZXhwb3J0ID0gR3JpZEZpdFR5cGU7Il19