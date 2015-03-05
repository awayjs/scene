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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi90ZXh0L1RleHRMaW5lTWV0cmljcy50cyJdLCJuYW1lcyI6WyJUZXh0TGluZU1ldHJpY3MiLCJUZXh0TGluZU1ldHJpY3MuY29uc3RydWN0b3IiXSwibWFwcGluZ3MiOiJBQUFBLEFBTUE7Ozs7O0dBREc7SUFDRyxlQUFlO0lBMENwQkE7Ozs7Ozs7Ozs7Ozs7Ozs7O09BaUJHQTtJQUNIQSxTQTVES0EsZUFBZUEsQ0E0RFJBLENBQWNBLEVBQUVBLEtBQWtCQSxFQUFFQSxNQUFtQkEsRUFBRUEsTUFBbUJBLEVBQUVBLE9BQW9CQSxFQUFFQSxPQUFvQkE7UUFBeEhDLGlCQUFjQSxHQUFkQSxPQUFjQTtRQUFFQSxxQkFBa0JBLEdBQWxCQSxXQUFrQkE7UUFBRUEsc0JBQW1CQSxHQUFuQkEsWUFBbUJBO1FBQUVBLHNCQUFtQkEsR0FBbkJBLFlBQW1CQTtRQUFFQSx1QkFBb0JBLEdBQXBCQSxhQUFvQkE7UUFBRUEsdUJBQW9CQSxHQUFwQkEsYUFBb0JBO0lBR3BJQSxDQUFDQTtJQUNGRCxzQkFBQ0E7QUFBREEsQ0FoRUEsQUFnRUNBLElBQUE7QUFFRCxBQUF5QixpQkFBaEIsZUFBZSxDQUFDIiwiZmlsZSI6InRleHQvVGV4dExpbmVNZXRyaWNzLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBUaGUgVGV4dExpbmVNZXRyaWNzIGNsYXNzIGNvbnRhaW5zIGluZm9ybWF0aW9uIGFib3V0IHRoZSB0ZXh0IHBvc2l0aW9uIGFuZFxyXG4gKiBtZWFzdXJlbWVudHMgb2YgYSBsaW5lIG9mIHRleHQgd2l0aGluIGEgdGV4dCBmaWVsZC4gQWxsIG1lYXN1cmVtZW50cyBhcmUgaW5cclxuICogcGl4ZWxzLiBPYmplY3RzIG9mIHRoaXMgY2xhc3MgYXJlIHJldHVybmVkIGJ5IHRoZSBcclxuICogPGNvZGU+YXdheS5lbnRpdGllcy5UZXh0RmllbGQuZ2V0TGluZU1ldHJpY3MoKTwvY29kZT4gbWV0aG9kLlxyXG4gKi9cclxuY2xhc3MgVGV4dExpbmVNZXRyaWNzXHJcbntcclxuXHQvKipcclxuXHQgKiBUaGUgYXNjZW50IHZhbHVlIG9mIHRoZSB0ZXh0IGlzIHRoZSBsZW5ndGggZnJvbSB0aGUgYmFzZWxpbmUgdG8gdGhlIHRvcCBvZlxyXG5cdCAqIHRoZSBsaW5lIGhlaWdodCBpbiBwaXhlbHMuXHJcblx0ICovXHJcblx0cHVibGljIGFzY2VudDpudW1iZXI7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBkZXNjZW50IHZhbHVlIG9mIHRoZSB0ZXh0IGlzIHRoZSBsZW5ndGggZnJvbSB0aGUgYmFzZWxpbmUgdG8gdGhlXHJcblx0ICogYm90dG9tIGRlcHRoIG9mIHRoZSBsaW5lIGluIHBpeGVscy5cclxuXHQgKi9cclxuXHRwdWJsaWMgZGVzY2VudDpudW1iZXI7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBoZWlnaHQgdmFsdWUgb2YgdGhlIHRleHQgb2YgdGhlIHNlbGVjdGVkIGxpbmVzIChub3QgbmVjZXNzYXJpbHkgdGhlXHJcblx0ICogY29tcGxldGUgdGV4dCkgaW4gcGl4ZWxzLiBUaGUgaGVpZ2h0IG9mIHRoZSB0ZXh0IGxpbmUgZG9lcyBub3QgaW5jbHVkZSB0aGVcclxuXHQgKiBndXR0ZXIgaGVpZ2h0LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBoZWlnaHQ6bnVtYmVyO1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgbGVhZGluZyB2YWx1ZSBpcyB0aGUgbWVhc3VyZW1lbnQgb2YgdGhlIHZlcnRpY2FsIGRpc3RhbmNlIGJldHdlZW4gdGhlXHJcblx0ICogbGluZXMgb2YgdGV4dC5cclxuXHQgKi9cclxuXHRwdWJsaWMgbGVhZGluZzpudW1iZXI7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSB3aWR0aCB2YWx1ZSBpcyB0aGUgd2lkdGggb2YgdGhlIHRleHQgb2YgdGhlIHNlbGVjdGVkIGxpbmVzIChub3RcclxuXHQgKiBuZWNlc3NhcmlseSB0aGUgY29tcGxldGUgdGV4dCkgaW4gcGl4ZWxzLiBUaGUgd2lkdGggb2YgdGhlIHRleHQgbGluZSBpc1xyXG5cdCAqIG5vdCB0aGUgc2FtZSBhcyB0aGUgd2lkdGggb2YgdGhlIHRleHQgZmllbGQuIFRoZSB3aWR0aCBvZiB0aGUgdGV4dCBsaW5lIGlzXHJcblx0ICogcmVsYXRpdmUgdG8gdGhlIHRleHQgZmllbGQgd2lkdGgsIG1pbnVzIHRoZSBndXR0ZXIgd2lkdGggb2YgNCBwaXhlbHNcclxuXHQgKiAoMiBwaXhlbHMgb24gZWFjaCBzaWRlKS5cclxuXHQgKi9cclxuXHRwdWJsaWMgd2lkdGg6bnVtYmVyO1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgeCB2YWx1ZSBpcyB0aGUgbGVmdCBwb3NpdGlvbiBvZiB0aGUgZmlyc3QgY2hhcmFjdGVyIGluIHBpeGVscy4gVGhpc1xyXG5cdCAqIHZhbHVlIGluY2x1ZGVzIHRoZSBtYXJnaW4sIGluZGVudCAoaWYgYW55KSwgYW5kIGd1dHRlciB3aWR0aHMuXHJcblx0ICovXHJcblx0cHVibGljIHg6bnVtYmVyO1xyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGEgVGV4dExpbmVNZXRyaWNzIG9iamVjdC4gVGhlIFRleHRMaW5lTWV0cmljcyBvYmplY3QgY29udGFpbnNcclxuXHQgKiBpbmZvcm1hdGlvbiBhYm91dCB0aGUgdGV4dCBtZXRyaWNzIG9mIGEgbGluZSBvZiB0ZXh0IGluIGEgdGV4dCBmaWVsZC5cclxuXHQgKiBPYmplY3RzIG9mIHRoaXMgY2xhc3MgYXJlIHJldHVybmVkIGJ5IHRoZVxyXG5cdCAqIGF3YXkuZW50aXRpZXMuVGV4dEZpZWxkLmdldExpbmVNZXRyaWNzKCkgbWV0aG9kLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHggICAgICAgICAgIFRoZSBsZWZ0IHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBjaGFyYWN0ZXIgaW4gcGl4ZWxzLlxyXG5cdCAqIEBwYXJhbSB3aWR0aCAgICAgICBUaGUgd2lkdGggb2YgdGhlIHRleHQgb2YgdGhlIHNlbGVjdGVkIGxpbmVzIChub3RcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgbmVjZXNzYXJpbHkgdGhlIGNvbXBsZXRlIHRleHQpIGluIHBpeGVscy5cclxuXHQgKiBAcGFyYW0gaGVpZ2h0ICAgICAgVGhlIGhlaWdodCBvZiB0aGUgdGV4dCBvZiB0aGUgc2VsZWN0ZWQgbGluZXMgKG5vdFxyXG5cdCAqICAgICAgICAgICAgICAgICAgICBuZWNlc3NhcmlseSB0aGUgY29tcGxldGUgdGV4dCkgaW4gcGl4ZWxzLlxyXG5cdCAqIEBwYXJhbSBhc2NlbnQgICAgICBUaGUgbGVuZ3RoIGZyb20gdGhlIGJhc2VsaW5lIHRvIHRoZSB0b3Agb2YgdGhlIGxpbmVcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0IGluIHBpeGVscy5cclxuXHQgKiBAcGFyYW0gZGVzY2VudCAgICAgVGhlIGxlbmd0aCBmcm9tIHRoZSBiYXNlbGluZSB0byB0aGUgYm90dG9tIGRlcHRoIG9mXHJcblx0ICogICAgICAgICAgICAgICAgICAgIHRoZSBsaW5lIGluIHBpeGVscy5cclxuXHQgKiBAcGFyYW0gbGVhZGluZyAgICAgVGhlIG1lYXN1cmVtZW50IG9mIHRoZSB2ZXJ0aWNhbCBkaXN0YW5jZSBiZXR3ZWVuIHRoZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICBsaW5lcyBvZiB0ZXh0LlxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKHg6bnVtYmVyID0gTmFOLCB3aWR0aDpudW1iZXIgPSBOYU4sIGhlaWdodDpudW1iZXIgPSBOYU4sIGFzY2VudDpudW1iZXIgPSBOYU4sIGRlc2NlbnQ6bnVtYmVyID0gTmFOLCBsZWFkaW5nOm51bWJlciA9IE5hTilcclxuXHR7XHJcblxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0ID0gVGV4dExpbmVNZXRyaWNzOyJdfQ==