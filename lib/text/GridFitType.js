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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi90ZXh0L2dyaWRmaXR0eXBlLnRzIl0sIm5hbWVzIjpbIkdyaWRGaXRUeXBlIiwiR3JpZEZpdFR5cGUuY29uc3RydWN0b3IiXSwibWFwcGluZ3MiOiJBQUFBLEFBR0E7O0dBREc7SUFDRyxXQUFXO0lBQWpCQSxTQUFNQSxXQUFXQTtJQThCakJDLENBQUNBO0lBNUJBRDs7Ozs7O09BTUdBO0lBQ1dBLGdCQUFJQSxHQUFVQSxNQUFNQSxDQUFDQTtJQUVuQ0E7Ozs7Ozs7T0FPR0E7SUFDV0EsaUJBQUtBLEdBQVVBLE9BQU9BLENBQUNBO0lBRXJDQTs7Ozs7OztPQU9HQTtJQUNXQSxvQkFBUUEsR0FBVUEsVUFBVUEsQ0FBQ0E7SUFDNUNBLGtCQUFDQTtBQUFEQSxDQTlCQSxBQThCQ0EsSUFBQTtBQUVELEFBQXFCLGlCQUFaLFdBQVcsQ0FBQyIsImZpbGUiOiJ0ZXh0L0dyaWRGaXRUeXBlLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVGhlIEdyaWRGaXRUeXBlIGNsYXNzIGRlZmluZXMgdmFsdWVzIGZvciBncmlkIGZpdHRpbmcgaW4gdGhlIFRleHRGaWVsZCBjbGFzcy5cbiAqL1xuY2xhc3MgR3JpZEZpdFR5cGVcbntcblx0LyoqXG5cdCAqIERvZXNuJ3Qgc2V0IGdyaWQgZml0dGluZy4gSG9yaXpvbnRhbCBhbmQgdmVydGljYWwgbGluZXMgaW4gdGhlIGdseXBocyBhcmVcblx0ICogbm90IGZvcmNlZCB0byB0aGUgcGl4ZWwgZ3JpZC4gVGhpcyBjb25zdGFudCBpcyB1c2VkIGluIHNldHRpbmcgdGhlXG5cdCAqIDxjb2RlPmdyaWRGaXRUeXBlPC9jb2RlPiBwcm9wZXJ0eSBvZiB0aGUgVGV4dEZpZWxkIGNsYXNzLiBUaGlzIGlzIG9mdGVuIGFcblx0ICogZ29vZCBzZXR0aW5nIGZvciBhbmltYXRpb24gb3IgZm9yIGxhcmdlIGZvbnQgc2l6ZXMuIFVzZSB0aGUgc3ludGF4XG5cdCAqIDxjb2RlPkdyaWRGaXRUeXBlLk5PTkU8L2NvZGU+LlxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBOT05FOnN0cmluZyA9IFwibm9uZVwiO1xuXG5cdC8qKlxuXHQgKiBGaXRzIHN0cm9uZyBob3Jpem9udGFsIGFuZCB2ZXJ0aWNhbCBsaW5lcyB0byB0aGUgcGl4ZWwgZ3JpZC4gVGhpcyBjb25zdGFudFxuXHQgKiBpcyB1c2VkIGluIHNldHRpbmcgdGhlIDxjb2RlPmdyaWRGaXRUeXBlPC9jb2RlPiBwcm9wZXJ0eSBvZiB0aGUgVGV4dEZpZWxkXG5cdCAqIGNsYXNzLiBUaGlzIHNldHRpbmcgb25seSB3b3JrcyBmb3IgbGVmdC1qdXN0aWZpZWQgdGV4dCBmaWVsZHMgYW5kIGFjdHNcblx0ICogbGlrZSB0aGUgPGNvZGU+R3JpZEZpdFR5cGUuU1VCUElYRUw8L2NvZGU+IGNvbnN0YW50IGluIHN0YXRpYyB0ZXh0LiBUaGlzXG5cdCAqIHNldHRpbmcgZ2VuZXJhbGx5IHByb3ZpZGVzIHRoZSBiZXN0IHJlYWRhYmlsaXR5IGZvciBsZWZ0LWFsaWduZWQgdGV4dC4gVXNlXG5cdCAqIHRoZSBzeW50YXggPGNvZGU+R3JpZEZpdFR5cGUuUElYRUw8L2NvZGU+LlxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBQSVhFTDpzdHJpbmcgPSBcInBpeGVsXCI7XG5cblx0LyoqXG5cdCAqIEZpdHMgc3Ryb25nIGhvcml6b250YWwgYW5kIHZlcnRpY2FsIGxpbmVzIHRvIHRoZSBzdWItcGl4ZWwgZ3JpZCBvbiBMQ0Rcblx0ICogbW9uaXRvcnMuIChSZWQsIGdyZWVuLCBhbmQgYmx1ZSBhcmUgYWN0dWFsIHBpeGVscyBvbiBhbiBMQ0Qgc2NyZWVuLikgVGhpc1xuXHQgKiBpcyBvZnRlbiBhIGdvb2Qgc2V0dGluZyBmb3IgcmlnaHQtYWxpZ25lZCBvciBjZW50ZXItYWxpZ25lZCBkeW5hbWljIHRleHQsXG5cdCAqIGFuZCBpdCBpcyBzb21ldGltZXMgYSB1c2VmdWwgdHJhZGVvZmYgZm9yIGFuaW1hdGlvbiB2cy4gdGV4dCBxdWFsaXR5LiBUaGlzXG5cdCAqIGNvbnN0YW50IGlzIHVzZWQgaW4gc2V0dGluZyB0aGUgPGNvZGU+Z3JpZEZpdFR5cGU8L2NvZGU+IHByb3BlcnR5IG9mIHRoZVxuXHQgKiBUZXh0RmllbGQgY2xhc3MuIFVzZSB0aGUgc3ludGF4IDxjb2RlPkdyaWRGaXRUeXBlLlNVQlBJWEVMPC9jb2RlPi5cblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgU1VCUElYRUw6c3RyaW5nID0gXCJzdWJwaXhlbFwiO1xufVxuXG5leHBvcnQgPSBHcmlkRml0VHlwZTsiXX0=