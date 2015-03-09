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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi90ZXh0L1RleHRGaWVsZEF1dG9TaXplLnRzIl0sIm5hbWVzIjpbIlRleHRGaWVsZEF1dG9TaXplIiwiVGV4dEZpZWxkQXV0b1NpemUuY29uc3RydWN0b3IiXSwibWFwcGluZ3MiOiJBQUFBLEFBSUE7OztHQURHO0lBQ0csaUJBQWlCO0lBQXZCQSxTQUFNQSxpQkFBaUJBO0lBMkJ2QkMsQ0FBQ0E7SUF6QkFEOzs7O09BSUdBO0lBQ1dBLHdCQUFNQSxHQUFVQSxRQUFRQSxDQUFDQTtJQUV2Q0E7Ozs7T0FJR0E7SUFDV0Esc0JBQUlBLEdBQVVBLE1BQU1BLENBQUNBO0lBRW5DQTs7T0FFR0E7SUFDV0Esc0JBQUlBLEdBQVVBLE1BQU1BLENBQUNBO0lBRW5DQTs7OztPQUlHQTtJQUNXQSx1QkFBS0EsR0FBVUEsT0FBT0EsQ0FBQ0E7SUFDdENBLHdCQUFDQTtBQUFEQSxDQTNCQSxBQTJCQ0EsSUFBQTtBQUVELEFBQTJCLGlCQUFsQixpQkFBaUIsQ0FBQyIsImZpbGUiOiJ0ZXh0L1RleHRGaWVsZEF1dG9TaXplLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBUaGUgVGV4dEZpZWxkQXV0b1NpemUgY2xhc3MgaXMgYW4gZW51bWVyYXRpb24gb2YgY29uc3RhbnQgdmFsdWVzIHVzZWQgaW5cclxuICogc2V0dGluZyB0aGUgPGNvZGU+YXV0b1NpemU8L2NvZGU+IHByb3BlcnR5IG9mIHRoZSBUZXh0RmllbGQgY2xhc3MuXHJcbiAqL1xyXG5jbGFzcyBUZXh0RmllbGRBdXRvU2l6ZVxyXG57XHJcblx0LyoqXHJcblx0ICogU3BlY2lmaWVzIHRoYXQgdGhlIHRleHQgaXMgdG8gYmUgdHJlYXRlZCBhcyBjZW50ZXItanVzdGlmaWVkIHRleHQuIEFueVxyXG5cdCAqIHJlc2l6aW5nIG9mIGEgc2luZ2xlIGxpbmUgb2YgYSB0ZXh0IGZpZWxkIGlzIGVxdWFsbHkgZGlzdHJpYnV0ZWQgdG8gYm90aFxyXG5cdCAqIHRoZSByaWdodCBhbmQgbGVmdCBzaWRlcy5cclxuXHQgKi9cclxuXHRwdWJsaWMgc3RhdGljIENFTlRFUjpzdHJpbmcgPSBcImNlbnRlclwiO1xyXG5cclxuXHQvKipcclxuXHQgKiBTcGVjaWZpZXMgdGhhdCB0aGUgdGV4dCBpcyB0byBiZSB0cmVhdGVkIGFzIGxlZnQtanVzdGlmaWVkIHRleHQsIG1lYW5pbmdcclxuXHQgKiB0aGF0IHRoZSBsZWZ0IHNpZGUgb2YgdGhlIHRleHQgZmllbGQgcmVtYWlucyBmaXhlZCBhbmQgYW55IHJlc2l6aW5nIG9mIGFcclxuXHQgKiBzaW5nbGUgbGluZSBpcyBvbiB0aGUgcmlnaHQgc2lkZS5cclxuXHQgKi9cclxuXHRwdWJsaWMgc3RhdGljIExFRlQ6c3RyaW5nID0gXCJsZWZ0XCI7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNwZWNpZmllcyB0aGF0IG5vIHJlc2l6aW5nIGlzIHRvIG9jY3VyLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzdGF0aWMgTk9ORTpzdHJpbmcgPSBcIm5vbmVcIjtcclxuXHJcblx0LyoqXHJcblx0ICogU3BlY2lmaWVzIHRoYXQgdGhlIHRleHQgaXMgdG8gYmUgdHJlYXRlZCBhcyByaWdodC1qdXN0aWZpZWQgdGV4dCwgbWVhbmluZ1xyXG5cdCAqIHRoYXQgdGhlIHJpZ2h0IHNpZGUgb2YgdGhlIHRleHQgZmllbGQgcmVtYWlucyBmaXhlZCBhbmQgYW55IHJlc2l6aW5nIG9mIGFcclxuXHQgKiBzaW5nbGUgbGluZSBpcyBvbiB0aGUgbGVmdCBzaWRlLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzdGF0aWMgUklHSFQ6c3RyaW5nID0gXCJyaWdodFwiO1xyXG59XHJcblxyXG5leHBvcnQgPSBUZXh0RmllbGRBdXRvU2l6ZTsiXX0=