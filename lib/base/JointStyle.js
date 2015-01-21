/**
 * The JointStyle class is an enumeration of constant values that specify the
 * joint style to use in drawing lines. These constants are provided for use
 * as values in the <code>joints</code> parameter of the
 * <code>flash.display.Graphics.lineStyle()</code> method. The method supports
 * three types of joints: miter, round, and bevel, as the following example
 * shows:
 */
var JointStyle = (function () {
    function JointStyle() {
    }
    /**
     * Specifies beveled joints in the <code>joints</code> parameter of the
     * <code>flash.display.Graphics.lineStyle()</code> method.
     */
    JointStyle.BEVEL = "bevel";
    /**
     * Specifies mitered joints in the <code>joints</code> parameter of the
     * <code>flash.display.Graphics.lineStyle()</code> method.
     */
    JointStyle.MITER = "miter";
    /**
     * Specifies round joints in the <code>joints</code> parameter of the
     * <code>flash.display.Graphics.lineStyle()</code> method.
     */
    JointStyle.ROUND = "round";
    return JointStyle;
})();
module.exports = JointStyle;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0pvaW50U3R5bGUudHMiXSwibmFtZXMiOlsiSm9pbnRTdHlsZSIsIkpvaW50U3R5bGUuY29uc3RydWN0b3IiXSwibWFwcGluZ3MiOiJBQUFBLEFBUUE7Ozs7Ozs7R0FERztJQUNHLFVBQVU7SUFBaEJBLFNBQU1BLFVBQVVBO0lBbUJoQkMsQ0FBQ0E7SUFqQkFEOzs7T0FHR0E7SUFDV0EsZ0JBQUtBLEdBQVVBLE9BQU9BLENBQUNBO0lBRXJDQTs7O09BR0dBO0lBQ1dBLGdCQUFLQSxHQUFVQSxPQUFPQSxDQUFDQTtJQUVyQ0E7OztPQUdHQTtJQUNXQSxnQkFBS0EsR0FBVUEsT0FBT0EsQ0FBQ0E7SUFDdENBLGlCQUFDQTtBQUFEQSxDQW5CQSxBQW1CQ0EsSUFBQTtBQUVELEFBQW9CLGlCQUFYLFVBQVUsQ0FBQyIsImZpbGUiOiJiYXNlL0pvaW50U3R5bGUuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBUaGUgSm9pbnRTdHlsZSBjbGFzcyBpcyBhbiBlbnVtZXJhdGlvbiBvZiBjb25zdGFudCB2YWx1ZXMgdGhhdCBzcGVjaWZ5IHRoZVxuICogam9pbnQgc3R5bGUgdG8gdXNlIGluIGRyYXdpbmcgbGluZXMuIFRoZXNlIGNvbnN0YW50cyBhcmUgcHJvdmlkZWQgZm9yIHVzZVxuICogYXMgdmFsdWVzIGluIHRoZSA8Y29kZT5qb2ludHM8L2NvZGU+IHBhcmFtZXRlciBvZiB0aGVcbiAqIDxjb2RlPmZsYXNoLmRpc3BsYXkuR3JhcGhpY3MubGluZVN0eWxlKCk8L2NvZGU+IG1ldGhvZC4gVGhlIG1ldGhvZCBzdXBwb3J0c1xuICogdGhyZWUgdHlwZXMgb2Ygam9pbnRzOiBtaXRlciwgcm91bmQsIGFuZCBiZXZlbCwgYXMgdGhlIGZvbGxvd2luZyBleGFtcGxlXG4gKiBzaG93czpcbiAqL1xuY2xhc3MgSm9pbnRTdHlsZVxue1xuXHQvKipcblx0ICogU3BlY2lmaWVzIGJldmVsZWQgam9pbnRzIGluIHRoZSA8Y29kZT5qb2ludHM8L2NvZGU+IHBhcmFtZXRlciBvZiB0aGVcblx0ICogPGNvZGU+Zmxhc2guZGlzcGxheS5HcmFwaGljcy5saW5lU3R5bGUoKTwvY29kZT4gbWV0aG9kLlxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBCRVZFTDpzdHJpbmcgPSBcImJldmVsXCI7XG5cblx0LyoqXG5cdCAqIFNwZWNpZmllcyBtaXRlcmVkIGpvaW50cyBpbiB0aGUgPGNvZGU+am9pbnRzPC9jb2RlPiBwYXJhbWV0ZXIgb2YgdGhlXG5cdCAqIDxjb2RlPmZsYXNoLmRpc3BsYXkuR3JhcGhpY3MubGluZVN0eWxlKCk8L2NvZGU+IG1ldGhvZC5cblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgTUlURVI6c3RyaW5nID0gXCJtaXRlclwiO1xuXG5cdC8qKlxuXHQgKiBTcGVjaWZpZXMgcm91bmQgam9pbnRzIGluIHRoZSA8Y29kZT5qb2ludHM8L2NvZGU+IHBhcmFtZXRlciBvZiB0aGVcblx0ICogPGNvZGU+Zmxhc2guZGlzcGxheS5HcmFwaGljcy5saW5lU3R5bGUoKTwvY29kZT4gbWV0aG9kLlxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBST1VORDpzdHJpbmcgPSBcInJvdW5kXCI7XG59XG5cbmV4cG9ydCA9IEpvaW50U3R5bGU7Il19