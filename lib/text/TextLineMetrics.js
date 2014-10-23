/**
 * The TextLineMetrics class contains information about the text position and
 * measurements of a line of text within a text field. All measurements are in
 * pixels. Objects of this class are returned by the
 * <code>away.entities.TextField.getLineMetrics()</code> method.
 */
var TextLineMetrics = (function () {
    /**
     * Creates a TextLineMetrics object. The TextLineMetrics object contains
     * information about the text metrics of a line of text in a text field.
     * Objects of this class are returned by the
     * away.entities.TextField.getLineMetrics() method.
     *
     * @param x           The left position of the first character in pixels.
     * @param width       The width of the text of the selected lines (not
     *                    necessarily the complete text) in pixels.
     * @param height      The height of the text of the selected lines (not
     *                    necessarily the complete text) in pixels.
     * @param ascent      The length from the baseline to the top of the line
     *                    height in pixels.
     * @param descent     The length from the baseline to the bottom depth of
     *                    the line in pixels.
     * @param leading     The measurement of the vertical distance between the
     *                    lines of text.
     */
    function TextLineMetrics(x, width, height, ascent, descent, leading) {
        if (x === void 0) { x = NaN; }
        if (width === void 0) { width = NaN; }
        if (height === void 0) { height = NaN; }
        if (ascent === void 0) { ascent = NaN; }
        if (descent === void 0) { descent = NaN; }
        if (leading === void 0) { leading = NaN; }
    }
    return TextLineMetrics;
})();
module.exports = TextLineMetrics;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi90ZXh0L3RleHRsaW5lbWV0cmljcy50cyJdLCJuYW1lcyI6WyJUZXh0TGluZU1ldHJpY3MiLCJUZXh0TGluZU1ldHJpY3MuY29uc3RydWN0b3IiXSwibWFwcGluZ3MiOiJBQUFBLEFBTUE7Ozs7O0dBREc7SUFDRyxlQUFlO0lBMENwQkE7Ozs7Ozs7Ozs7Ozs7Ozs7O09BaUJHQTtJQUNIQSxTQTVES0EsZUFBZUEsQ0E0RFJBLENBQWNBLEVBQUVBLEtBQWtCQSxFQUFFQSxNQUFtQkEsRUFBRUEsTUFBbUJBLEVBQUVBLE9BQW9CQSxFQUFFQSxPQUFvQkE7UUFBeEhDLGlCQUFjQSxHQUFkQSxPQUFjQTtRQUFFQSxxQkFBa0JBLEdBQWxCQSxXQUFrQkE7UUFBRUEsc0JBQW1CQSxHQUFuQkEsWUFBbUJBO1FBQUVBLHNCQUFtQkEsR0FBbkJBLFlBQW1CQTtRQUFFQSx1QkFBb0JBLEdBQXBCQSxhQUFvQkE7UUFBRUEsdUJBQW9CQSxHQUFwQkEsYUFBb0JBO0lBR3BJQSxDQUFDQTtJQUNGRCxzQkFBQ0E7QUFBREEsQ0FoRUEsQUFnRUNBLElBQUE7QUFFRCxBQUF5QixpQkFBaEIsZUFBZSxDQUFDIiwiZmlsZSI6InRleHQvVGV4dExpbmVNZXRyaWNzLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVGhlIFRleHRMaW5lTWV0cmljcyBjbGFzcyBjb250YWlucyBpbmZvcm1hdGlvbiBhYm91dCB0aGUgdGV4dCBwb3NpdGlvbiBhbmRcbiAqIG1lYXN1cmVtZW50cyBvZiBhIGxpbmUgb2YgdGV4dCB3aXRoaW4gYSB0ZXh0IGZpZWxkLiBBbGwgbWVhc3VyZW1lbnRzIGFyZSBpblxuICogcGl4ZWxzLiBPYmplY3RzIG9mIHRoaXMgY2xhc3MgYXJlIHJldHVybmVkIGJ5IHRoZSBcbiAqIDxjb2RlPmF3YXkuZW50aXRpZXMuVGV4dEZpZWxkLmdldExpbmVNZXRyaWNzKCk8L2NvZGU+IG1ldGhvZC5cbiAqL1xuY2xhc3MgVGV4dExpbmVNZXRyaWNzXG57XG5cdC8qKlxuXHQgKiBUaGUgYXNjZW50IHZhbHVlIG9mIHRoZSB0ZXh0IGlzIHRoZSBsZW5ndGggZnJvbSB0aGUgYmFzZWxpbmUgdG8gdGhlIHRvcCBvZlxuXHQgKiB0aGUgbGluZSBoZWlnaHQgaW4gcGl4ZWxzLlxuXHQgKi9cblx0cHVibGljIGFzY2VudDpudW1iZXI7XG5cblx0LyoqXG5cdCAqIFRoZSBkZXNjZW50IHZhbHVlIG9mIHRoZSB0ZXh0IGlzIHRoZSBsZW5ndGggZnJvbSB0aGUgYmFzZWxpbmUgdG8gdGhlXG5cdCAqIGJvdHRvbSBkZXB0aCBvZiB0aGUgbGluZSBpbiBwaXhlbHMuXG5cdCAqL1xuXHRwdWJsaWMgZGVzY2VudDpudW1iZXI7XG5cblx0LyoqXG5cdCAqIFRoZSBoZWlnaHQgdmFsdWUgb2YgdGhlIHRleHQgb2YgdGhlIHNlbGVjdGVkIGxpbmVzIChub3QgbmVjZXNzYXJpbHkgdGhlXG5cdCAqIGNvbXBsZXRlIHRleHQpIGluIHBpeGVscy4gVGhlIGhlaWdodCBvZiB0aGUgdGV4dCBsaW5lIGRvZXMgbm90IGluY2x1ZGUgdGhlXG5cdCAqIGd1dHRlciBoZWlnaHQuXG5cdCAqL1xuXHRwdWJsaWMgaGVpZ2h0Om51bWJlcjtcblxuXHQvKipcblx0ICogVGhlIGxlYWRpbmcgdmFsdWUgaXMgdGhlIG1lYXN1cmVtZW50IG9mIHRoZSB2ZXJ0aWNhbCBkaXN0YW5jZSBiZXR3ZWVuIHRoZVxuXHQgKiBsaW5lcyBvZiB0ZXh0LlxuXHQgKi9cblx0cHVibGljIGxlYWRpbmc6bnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBUaGUgd2lkdGggdmFsdWUgaXMgdGhlIHdpZHRoIG9mIHRoZSB0ZXh0IG9mIHRoZSBzZWxlY3RlZCBsaW5lcyAobm90XG5cdCAqIG5lY2Vzc2FyaWx5IHRoZSBjb21wbGV0ZSB0ZXh0KSBpbiBwaXhlbHMuIFRoZSB3aWR0aCBvZiB0aGUgdGV4dCBsaW5lIGlzXG5cdCAqIG5vdCB0aGUgc2FtZSBhcyB0aGUgd2lkdGggb2YgdGhlIHRleHQgZmllbGQuIFRoZSB3aWR0aCBvZiB0aGUgdGV4dCBsaW5lIGlzXG5cdCAqIHJlbGF0aXZlIHRvIHRoZSB0ZXh0IGZpZWxkIHdpZHRoLCBtaW51cyB0aGUgZ3V0dGVyIHdpZHRoIG9mIDQgcGl4ZWxzXG5cdCAqICgyIHBpeGVscyBvbiBlYWNoIHNpZGUpLlxuXHQgKi9cblx0cHVibGljIHdpZHRoOm51bWJlcjtcblxuXHQvKipcblx0ICogVGhlIHggdmFsdWUgaXMgdGhlIGxlZnQgcG9zaXRpb24gb2YgdGhlIGZpcnN0IGNoYXJhY3RlciBpbiBwaXhlbHMuIFRoaXNcblx0ICogdmFsdWUgaW5jbHVkZXMgdGhlIG1hcmdpbiwgaW5kZW50IChpZiBhbnkpLCBhbmQgZ3V0dGVyIHdpZHRocy5cblx0ICovXG5cdHB1YmxpYyB4Om51bWJlcjtcblxuXHQvKipcblx0ICogQ3JlYXRlcyBhIFRleHRMaW5lTWV0cmljcyBvYmplY3QuIFRoZSBUZXh0TGluZU1ldHJpY3Mgb2JqZWN0IGNvbnRhaW5zXG5cdCAqIGluZm9ybWF0aW9uIGFib3V0IHRoZSB0ZXh0IG1ldHJpY3Mgb2YgYSBsaW5lIG9mIHRleHQgaW4gYSB0ZXh0IGZpZWxkLlxuXHQgKiBPYmplY3RzIG9mIHRoaXMgY2xhc3MgYXJlIHJldHVybmVkIGJ5IHRoZVxuXHQgKiBhd2F5LmVudGl0aWVzLlRleHRGaWVsZC5nZXRMaW5lTWV0cmljcygpIG1ldGhvZC5cblx0ICpcblx0ICogQHBhcmFtIHggICAgICAgICAgIFRoZSBsZWZ0IHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBjaGFyYWN0ZXIgaW4gcGl4ZWxzLlxuXHQgKiBAcGFyYW0gd2lkdGggICAgICAgVGhlIHdpZHRoIG9mIHRoZSB0ZXh0IG9mIHRoZSBzZWxlY3RlZCBsaW5lcyAobm90XG5cdCAqICAgICAgICAgICAgICAgICAgICBuZWNlc3NhcmlseSB0aGUgY29tcGxldGUgdGV4dCkgaW4gcGl4ZWxzLlxuXHQgKiBAcGFyYW0gaGVpZ2h0ICAgICAgVGhlIGhlaWdodCBvZiB0aGUgdGV4dCBvZiB0aGUgc2VsZWN0ZWQgbGluZXMgKG5vdFxuXHQgKiAgICAgICAgICAgICAgICAgICAgbmVjZXNzYXJpbHkgdGhlIGNvbXBsZXRlIHRleHQpIGluIHBpeGVscy5cblx0ICogQHBhcmFtIGFzY2VudCAgICAgIFRoZSBsZW5ndGggZnJvbSB0aGUgYmFzZWxpbmUgdG8gdGhlIHRvcCBvZiB0aGUgbGluZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0IGluIHBpeGVscy5cblx0ICogQHBhcmFtIGRlc2NlbnQgICAgIFRoZSBsZW5ndGggZnJvbSB0aGUgYmFzZWxpbmUgdG8gdGhlIGJvdHRvbSBkZXB0aCBvZlxuXHQgKiAgICAgICAgICAgICAgICAgICAgdGhlIGxpbmUgaW4gcGl4ZWxzLlxuXHQgKiBAcGFyYW0gbGVhZGluZyAgICAgVGhlIG1lYXN1cmVtZW50IG9mIHRoZSB2ZXJ0aWNhbCBkaXN0YW5jZSBiZXR3ZWVuIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgbGluZXMgb2YgdGV4dC5cblx0ICovXG5cdGNvbnN0cnVjdG9yKHg6bnVtYmVyID0gTmFOLCB3aWR0aDpudW1iZXIgPSBOYU4sIGhlaWdodDpudW1iZXIgPSBOYU4sIGFzY2VudDpudW1iZXIgPSBOYU4sIGRlc2NlbnQ6bnVtYmVyID0gTmFOLCBsZWFkaW5nOm51bWJlciA9IE5hTilcblx0e1xuXG5cdH1cbn1cblxuZXhwb3J0ID0gVGV4dExpbmVNZXRyaWNzOyJdfQ==