/**
 * The CapsStyle class is an enumeration of constant values that specify the
 * caps style to use in drawing lines. The constants are provided for use as
 * values in the <code>caps</code> parameter of the
 * <code>flash.display.Graphics.lineStyle()</code> method. You can specify the
 * following three types of caps:
 */
var CapsStyle = (function () {
    function CapsStyle() {
    }
    /**
     * Used to specify round caps in the <code>caps</code> parameter of the
     * <code>flash.display.Graphics.lineStyle()</code> method.
     */
    CapsStyle.ROUND = "round";
    /**
     * Used to specify no caps in the <code>caps</code> parameter of the
     * <code>flash.display.Graphics.lineStyle()</code> method.
     */
    CapsStyle.NONE = "none";
    /**
     * Used to specify square caps in the <code>caps</code> parameter of the
     * <code>flash.display.Graphics.lineStyle()</code> method.
     */
    CapsStyle.SQUARE = "square";
    return CapsStyle;
})();
module.exports = CapsStyle;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL2NhcHNzdHlsZS50cyJdLCJuYW1lcyI6WyJDYXBzU3R5bGUiLCJDYXBzU3R5bGUuY29uc3RydWN0b3IiXSwibWFwcGluZ3MiOiJBQUFBLEFBT0E7Ozs7OztHQURHO0lBQ0csU0FBUztJQUFmQSxTQUFNQSxTQUFTQTtJQW1CZkMsQ0FBQ0E7SUFqQkFEOzs7T0FHR0E7SUFDV0EsZUFBS0EsR0FBVUEsT0FBT0EsQ0FBQ0E7SUFFckNBOzs7T0FHR0E7SUFDV0EsY0FBSUEsR0FBVUEsTUFBTUEsQ0FBQ0E7SUFFbkNBOzs7T0FHR0E7SUFDV0EsZ0JBQU1BLEdBQVVBLFFBQVFBLENBQUNBO0lBQ3hDQSxnQkFBQ0E7QUFBREEsQ0FuQkEsQUFtQkNBLElBQUE7QUFFRCxBQUFtQixpQkFBVixTQUFTLENBQUMiLCJmaWxlIjoiYmFzZS9DYXBzU3R5bGUuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBUaGUgQ2Fwc1N0eWxlIGNsYXNzIGlzIGFuIGVudW1lcmF0aW9uIG9mIGNvbnN0YW50IHZhbHVlcyB0aGF0IHNwZWNpZnkgdGhlXG4gKiBjYXBzIHN0eWxlIHRvIHVzZSBpbiBkcmF3aW5nIGxpbmVzLiBUaGUgY29uc3RhbnRzIGFyZSBwcm92aWRlZCBmb3IgdXNlIGFzXG4gKiB2YWx1ZXMgaW4gdGhlIDxjb2RlPmNhcHM8L2NvZGU+IHBhcmFtZXRlciBvZiB0aGVcbiAqIDxjb2RlPmZsYXNoLmRpc3BsYXkuR3JhcGhpY3MubGluZVN0eWxlKCk8L2NvZGU+IG1ldGhvZC4gWW91IGNhbiBzcGVjaWZ5IHRoZVxuICogZm9sbG93aW5nIHRocmVlIHR5cGVzIG9mIGNhcHM6XG4gKi9cbmNsYXNzIENhcHNTdHlsZVxue1xuXHQvKipcblx0ICogVXNlZCB0byBzcGVjaWZ5IHJvdW5kIGNhcHMgaW4gdGhlIDxjb2RlPmNhcHM8L2NvZGU+IHBhcmFtZXRlciBvZiB0aGVcblx0ICogPGNvZGU+Zmxhc2guZGlzcGxheS5HcmFwaGljcy5saW5lU3R5bGUoKTwvY29kZT4gbWV0aG9kLlxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBST1VORDpzdHJpbmcgPSBcInJvdW5kXCI7XG5cblx0LyoqXG5cdCAqIFVzZWQgdG8gc3BlY2lmeSBubyBjYXBzIGluIHRoZSA8Y29kZT5jYXBzPC9jb2RlPiBwYXJhbWV0ZXIgb2YgdGhlXG5cdCAqIDxjb2RlPmZsYXNoLmRpc3BsYXkuR3JhcGhpY3MubGluZVN0eWxlKCk8L2NvZGU+IG1ldGhvZC5cblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgTk9ORTpzdHJpbmcgPSBcIm5vbmVcIjtcblxuXHQvKipcblx0ICogVXNlZCB0byBzcGVjaWZ5IHNxdWFyZSBjYXBzIGluIHRoZSA8Y29kZT5jYXBzPC9jb2RlPiBwYXJhbWV0ZXIgb2YgdGhlXG5cdCAqIDxjb2RlPmZsYXNoLmRpc3BsYXkuR3JhcGhpY3MubGluZVN0eWxlKCk8L2NvZGU+IG1ldGhvZC5cblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgU1FVQVJFOnN0cmluZyA9IFwic3F1YXJlXCI7XG59XG5cbmV4cG9ydCA9IENhcHNTdHlsZTsiXX0=