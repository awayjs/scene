/**
 * The TextFieldAutoSize class is an enumeration of constant values used in
 * setting the <code>autoSize</code> property of the TextField class.
 */
var TextFieldAutoSize = (function () {
    function TextFieldAutoSize() {
    }
    /**
     * Specifies that the text is to be treated as center-justified text. Any
     * resizing of a single line of a text field is equally distributed to both
     * the right and left sides.
     */
    TextFieldAutoSize.CENTER = "center";
    /**
     * Specifies that the text is to be treated as left-justified text, meaning
     * that the left side of the text field remains fixed and any resizing of a
     * single line is on the right side.
     */
    TextFieldAutoSize.LEFT = "left";
    /**
     * Specifies that no resizing is to occur.
     */
    TextFieldAutoSize.NONE = "none";
    /**
     * Specifies that the text is to be treated as right-justified text, meaning
     * that the right side of the text field remains fixed and any resizing of a
     * single line is on the left side.
     */
    TextFieldAutoSize.RIGHT = "right";
    return TextFieldAutoSize;
})();
module.exports = TextFieldAutoSize;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi90ZXh0L1RleHRGaWVsZEF1dG9TaXplLnRzIl0sIm5hbWVzIjpbIlRleHRGaWVsZEF1dG9TaXplIiwiVGV4dEZpZWxkQXV0b1NpemUuY29uc3RydWN0b3IiXSwibWFwcGluZ3MiOiJBQUFBLEFBSUE7OztHQURHO0lBQ0csaUJBQWlCO0lBQXZCQSxTQUFNQSxpQkFBaUJBO0lBMkJ2QkMsQ0FBQ0E7SUF6QkFEOzs7O09BSUdBO0lBQ1dBLHdCQUFNQSxHQUFVQSxRQUFRQSxDQUFDQTtJQUV2Q0E7Ozs7T0FJR0E7SUFDV0Esc0JBQUlBLEdBQVVBLE1BQU1BLENBQUNBO0lBRW5DQTs7T0FFR0E7SUFDV0Esc0JBQUlBLEdBQVVBLE1BQU1BLENBQUNBO0lBRW5DQTs7OztPQUlHQTtJQUNXQSx1QkFBS0EsR0FBVUEsT0FBT0EsQ0FBQ0E7SUFDdENBLHdCQUFDQTtBQUFEQSxDQTNCQSxBQTJCQ0EsSUFBQTtBQUVELEFBQTJCLGlCQUFsQixpQkFBaUIsQ0FBQyIsImZpbGUiOiJ0ZXh0L1RleHRGaWVsZEF1dG9TaXplLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVGhlIFRleHRGaWVsZEF1dG9TaXplIGNsYXNzIGlzIGFuIGVudW1lcmF0aW9uIG9mIGNvbnN0YW50IHZhbHVlcyB1c2VkIGluXG4gKiBzZXR0aW5nIHRoZSA8Y29kZT5hdXRvU2l6ZTwvY29kZT4gcHJvcGVydHkgb2YgdGhlIFRleHRGaWVsZCBjbGFzcy5cbiAqL1xuY2xhc3MgVGV4dEZpZWxkQXV0b1NpemVcbntcblx0LyoqXG5cdCAqIFNwZWNpZmllcyB0aGF0IHRoZSB0ZXh0IGlzIHRvIGJlIHRyZWF0ZWQgYXMgY2VudGVyLWp1c3RpZmllZCB0ZXh0LiBBbnlcblx0ICogcmVzaXppbmcgb2YgYSBzaW5nbGUgbGluZSBvZiBhIHRleHQgZmllbGQgaXMgZXF1YWxseSBkaXN0cmlidXRlZCB0byBib3RoXG5cdCAqIHRoZSByaWdodCBhbmQgbGVmdCBzaWRlcy5cblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgQ0VOVEVSOnN0cmluZyA9IFwiY2VudGVyXCI7XG5cblx0LyoqXG5cdCAqIFNwZWNpZmllcyB0aGF0IHRoZSB0ZXh0IGlzIHRvIGJlIHRyZWF0ZWQgYXMgbGVmdC1qdXN0aWZpZWQgdGV4dCwgbWVhbmluZ1xuXHQgKiB0aGF0IHRoZSBsZWZ0IHNpZGUgb2YgdGhlIHRleHQgZmllbGQgcmVtYWlucyBmaXhlZCBhbmQgYW55IHJlc2l6aW5nIG9mIGFcblx0ICogc2luZ2xlIGxpbmUgaXMgb24gdGhlIHJpZ2h0IHNpZGUuXG5cdCAqL1xuXHRwdWJsaWMgc3RhdGljIExFRlQ6c3RyaW5nID0gXCJsZWZ0XCI7XG5cblx0LyoqXG5cdCAqIFNwZWNpZmllcyB0aGF0IG5vIHJlc2l6aW5nIGlzIHRvIG9jY3VyLlxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBOT05FOnN0cmluZyA9IFwibm9uZVwiO1xuXG5cdC8qKlxuXHQgKiBTcGVjaWZpZXMgdGhhdCB0aGUgdGV4dCBpcyB0byBiZSB0cmVhdGVkIGFzIHJpZ2h0LWp1c3RpZmllZCB0ZXh0LCBtZWFuaW5nXG5cdCAqIHRoYXQgdGhlIHJpZ2h0IHNpZGUgb2YgdGhlIHRleHQgZmllbGQgcmVtYWlucyBmaXhlZCBhbmQgYW55IHJlc2l6aW5nIG9mIGFcblx0ICogc2luZ2xlIGxpbmUgaXMgb24gdGhlIGxlZnQgc2lkZS5cblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgUklHSFQ6c3RyaW5nID0gXCJyaWdodFwiO1xufVxuXG5leHBvcnQgPSBUZXh0RmllbGRBdXRvU2l6ZTsiXX0=