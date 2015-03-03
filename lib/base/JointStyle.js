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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0pvaW50U3R5bGUudHMiXSwibmFtZXMiOlsiSm9pbnRTdHlsZSIsIkpvaW50U3R5bGUuY29uc3RydWN0b3IiXSwibWFwcGluZ3MiOiJBQUFBLEFBUUE7Ozs7Ozs7R0FERztJQUNHLFVBQVU7SUFBaEJBLFNBQU1BLFVBQVVBO0lBbUJoQkMsQ0FBQ0E7SUFqQkFEOzs7T0FHR0E7SUFDV0EsZ0JBQUtBLEdBQVVBLE9BQU9BLENBQUNBO0lBRXJDQTs7O09BR0dBO0lBQ1dBLGdCQUFLQSxHQUFVQSxPQUFPQSxDQUFDQTtJQUVyQ0E7OztPQUdHQTtJQUNXQSxnQkFBS0EsR0FBVUEsT0FBT0EsQ0FBQ0E7SUFDdENBLGlCQUFDQTtBQUFEQSxDQW5CQSxBQW1CQ0EsSUFBQTtBQUVELEFBQW9CLGlCQUFYLFVBQVUsQ0FBQyIsImZpbGUiOiJiYXNlL0pvaW50U3R5bGUuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIFRoZSBKb2ludFN0eWxlIGNsYXNzIGlzIGFuIGVudW1lcmF0aW9uIG9mIGNvbnN0YW50IHZhbHVlcyB0aGF0IHNwZWNpZnkgdGhlXHJcbiAqIGpvaW50IHN0eWxlIHRvIHVzZSBpbiBkcmF3aW5nIGxpbmVzLiBUaGVzZSBjb25zdGFudHMgYXJlIHByb3ZpZGVkIGZvciB1c2VcclxuICogYXMgdmFsdWVzIGluIHRoZSA8Y29kZT5qb2ludHM8L2NvZGU+IHBhcmFtZXRlciBvZiB0aGVcclxuICogPGNvZGU+Zmxhc2guZGlzcGxheS5HcmFwaGljcy5saW5lU3R5bGUoKTwvY29kZT4gbWV0aG9kLiBUaGUgbWV0aG9kIHN1cHBvcnRzXHJcbiAqIHRocmVlIHR5cGVzIG9mIGpvaW50czogbWl0ZXIsIHJvdW5kLCBhbmQgYmV2ZWwsIGFzIHRoZSBmb2xsb3dpbmcgZXhhbXBsZVxyXG4gKiBzaG93czpcclxuICovXHJcbmNsYXNzIEpvaW50U3R5bGVcclxue1xyXG5cdC8qKlxyXG5cdCAqIFNwZWNpZmllcyBiZXZlbGVkIGpvaW50cyBpbiB0aGUgPGNvZGU+am9pbnRzPC9jb2RlPiBwYXJhbWV0ZXIgb2YgdGhlXHJcblx0ICogPGNvZGU+Zmxhc2guZGlzcGxheS5HcmFwaGljcy5saW5lU3R5bGUoKTwvY29kZT4gbWV0aG9kLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzdGF0aWMgQkVWRUw6c3RyaW5nID0gXCJiZXZlbFwiO1xyXG5cclxuXHQvKipcclxuXHQgKiBTcGVjaWZpZXMgbWl0ZXJlZCBqb2ludHMgaW4gdGhlIDxjb2RlPmpvaW50czwvY29kZT4gcGFyYW1ldGVyIG9mIHRoZVxyXG5cdCAqIDxjb2RlPmZsYXNoLmRpc3BsYXkuR3JhcGhpY3MubGluZVN0eWxlKCk8L2NvZGU+IG1ldGhvZC5cclxuXHQgKi9cclxuXHRwdWJsaWMgc3RhdGljIE1JVEVSOnN0cmluZyA9IFwibWl0ZXJcIjtcclxuXHJcblx0LyoqXHJcblx0ICogU3BlY2lmaWVzIHJvdW5kIGpvaW50cyBpbiB0aGUgPGNvZGU+am9pbnRzPC9jb2RlPiBwYXJhbWV0ZXIgb2YgdGhlXHJcblx0ICogPGNvZGU+Zmxhc2guZGlzcGxheS5HcmFwaGljcy5saW5lU3R5bGUoKTwvY29kZT4gbWV0aG9kLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzdGF0aWMgUk9VTkQ6c3RyaW5nID0gXCJyb3VuZFwiO1xyXG59XHJcblxyXG5leHBvcnQgPSBKb2ludFN0eWxlOyJdfQ==