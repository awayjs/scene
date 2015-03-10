/**
 * The SpreadMethod class provides values for the <code>spreadMethod</code>
 * parameter in the <code>beginGradientFill()</code> and
 * <code>lineGradientStyle()</code> methods of the Graphics class.
 *
 * <p>The following example shows the same gradient fill using various spread
 * methods:</p>
 */
var SpreadMethod = (function () {
    function SpreadMethod() {
    }
    /**
     * Specifies that the gradient use the <i>pad</i> spread method.
     */
    SpreadMethod.PAD = "pad";
    /**
     * Specifies that the gradient use the <i>reflect</i> spread method.
     */
    SpreadMethod.REFLECT = "reflect";
    /**
     * Specifies that the gradient use the <i>repeat</i> spread method.
     */
    SpreadMethod.REPEAT = "repeat";
    return SpreadMethod;
})();
module.exports = SpreadMethod;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9kcmF3L1NwcmVhZE1ldGhvZC50cyJdLCJuYW1lcyI6WyJTcHJlYWRNZXRob2QiLCJTcHJlYWRNZXRob2QuY29uc3RydWN0b3IiXSwibWFwcGluZ3MiOiJBQUFBLEFBUUE7Ozs7Ozs7R0FERztJQUNHLFlBQVk7SUFBbEJBLFNBQU1BLFlBQVlBO0lBZ0JsQkMsQ0FBQ0E7SUFkQUQ7O09BRUdBO0lBQ1dBLGdCQUFHQSxHQUFVQSxLQUFLQSxDQUFDQTtJQUVqQ0E7O09BRUdBO0lBQ1dBLG9CQUFPQSxHQUFVQSxTQUFTQSxDQUFDQTtJQUV6Q0E7O09BRUdBO0lBQ1dBLG1CQUFNQSxHQUFVQSxRQUFRQSxDQUFDQTtJQUN4Q0EsbUJBQUNBO0FBQURBLENBaEJBLEFBZ0JDQSxJQUFBO0FBRUQsQUFBc0IsaUJBQWIsWUFBWSxDQUFDIiwiZmlsZSI6ImRyYXcvU3ByZWFkTWV0aG9kLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBUaGUgU3ByZWFkTWV0aG9kIGNsYXNzIHByb3ZpZGVzIHZhbHVlcyBmb3IgdGhlIDxjb2RlPnNwcmVhZE1ldGhvZDwvY29kZT5cclxuICogcGFyYW1ldGVyIGluIHRoZSA8Y29kZT5iZWdpbkdyYWRpZW50RmlsbCgpPC9jb2RlPiBhbmRcclxuICogPGNvZGU+bGluZUdyYWRpZW50U3R5bGUoKTwvY29kZT4gbWV0aG9kcyBvZiB0aGUgR3JhcGhpY3MgY2xhc3MuXHJcbiAqXHJcbiAqIDxwPlRoZSBmb2xsb3dpbmcgZXhhbXBsZSBzaG93cyB0aGUgc2FtZSBncmFkaWVudCBmaWxsIHVzaW5nIHZhcmlvdXMgc3ByZWFkXHJcbiAqIG1ldGhvZHM6PC9wPlxyXG4gKi9cclxuY2xhc3MgU3ByZWFkTWV0aG9kXHJcbntcclxuXHQvKipcclxuXHQgKiBTcGVjaWZpZXMgdGhhdCB0aGUgZ3JhZGllbnQgdXNlIHRoZSA8aT5wYWQ8L2k+IHNwcmVhZCBtZXRob2QuXHJcblx0ICovXHJcblx0cHVibGljIHN0YXRpYyBQQUQ6c3RyaW5nID0gXCJwYWRcIjtcclxuXHJcblx0LyoqXHJcblx0ICogU3BlY2lmaWVzIHRoYXQgdGhlIGdyYWRpZW50IHVzZSB0aGUgPGk+cmVmbGVjdDwvaT4gc3ByZWFkIG1ldGhvZC5cclxuXHQgKi9cclxuXHRwdWJsaWMgc3RhdGljIFJFRkxFQ1Q6c3RyaW5nID0gXCJyZWZsZWN0XCI7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNwZWNpZmllcyB0aGF0IHRoZSBncmFkaWVudCB1c2UgdGhlIDxpPnJlcGVhdDwvaT4gc3ByZWFkIG1ldGhvZC5cclxuXHQgKi9cclxuXHRwdWJsaWMgc3RhdGljIFJFUEVBVDpzdHJpbmcgPSBcInJlcGVhdFwiO1xyXG59XHJcblxyXG5leHBvcnQgPSBTcHJlYWRNZXRob2Q7Il19