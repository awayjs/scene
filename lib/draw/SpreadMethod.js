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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9kcmF3L1NwcmVhZE1ldGhvZC50cyJdLCJuYW1lcyI6WyJTcHJlYWRNZXRob2QiLCJTcHJlYWRNZXRob2QuY29uc3RydWN0b3IiXSwibWFwcGluZ3MiOiJBQUFBLEFBUUE7Ozs7Ozs7R0FERztJQUNHLFlBQVk7SUFBbEJBLFNBQU1BLFlBQVlBO0lBZ0JsQkMsQ0FBQ0E7SUFkQUQ7O09BRUdBO0lBQ1dBLGdCQUFHQSxHQUFVQSxLQUFLQSxDQUFDQTtJQUVqQ0E7O09BRUdBO0lBQ1dBLG9CQUFPQSxHQUFVQSxTQUFTQSxDQUFDQTtJQUV6Q0E7O09BRUdBO0lBQ1dBLG1CQUFNQSxHQUFVQSxRQUFRQSxDQUFDQTtJQUN4Q0EsbUJBQUNBO0FBQURBLENBaEJBLEFBZ0JDQSxJQUFBO0FBRUQsQUFBc0IsaUJBQWIsWUFBWSxDQUFDIiwiZmlsZSI6ImRyYXcvU3ByZWFkTWV0aG9kLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVGhlIFNwcmVhZE1ldGhvZCBjbGFzcyBwcm92aWRlcyB2YWx1ZXMgZm9yIHRoZSA8Y29kZT5zcHJlYWRNZXRob2Q8L2NvZGU+XG4gKiBwYXJhbWV0ZXIgaW4gdGhlIDxjb2RlPmJlZ2luR3JhZGllbnRGaWxsKCk8L2NvZGU+IGFuZFxuICogPGNvZGU+bGluZUdyYWRpZW50U3R5bGUoKTwvY29kZT4gbWV0aG9kcyBvZiB0aGUgR3JhcGhpY3MgY2xhc3MuXG4gKlxuICogPHA+VGhlIGZvbGxvd2luZyBleGFtcGxlIHNob3dzIHRoZSBzYW1lIGdyYWRpZW50IGZpbGwgdXNpbmcgdmFyaW91cyBzcHJlYWRcbiAqIG1ldGhvZHM6PC9wPlxuICovXG5jbGFzcyBTcHJlYWRNZXRob2Rcbntcblx0LyoqXG5cdCAqIFNwZWNpZmllcyB0aGF0IHRoZSBncmFkaWVudCB1c2UgdGhlIDxpPnBhZDwvaT4gc3ByZWFkIG1ldGhvZC5cblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgUEFEOnN0cmluZyA9IFwicGFkXCI7XG5cblx0LyoqXG5cdCAqIFNwZWNpZmllcyB0aGF0IHRoZSBncmFkaWVudCB1c2UgdGhlIDxpPnJlZmxlY3Q8L2k+IHNwcmVhZCBtZXRob2QuXG5cdCAqL1xuXHRwdWJsaWMgc3RhdGljIFJFRkxFQ1Q6c3RyaW5nID0gXCJyZWZsZWN0XCI7XG5cblx0LyoqXG5cdCAqIFNwZWNpZmllcyB0aGF0IHRoZSBncmFkaWVudCB1c2UgdGhlIDxpPnJlcGVhdDwvaT4gc3ByZWFkIG1ldGhvZC5cblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgUkVQRUFUOnN0cmluZyA9IFwicmVwZWF0XCI7XG59XG5cbmV4cG9ydCA9IFNwcmVhZE1ldGhvZDsiXX0=