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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9kcmF3L0NhcHNTdHlsZS50cyJdLCJuYW1lcyI6WyJDYXBzU3R5bGUiLCJDYXBzU3R5bGUuY29uc3RydWN0b3IiXSwibWFwcGluZ3MiOiJBQUFBLEFBT0E7Ozs7OztHQURHO0lBQ0csU0FBUztJQUFmQSxTQUFNQSxTQUFTQTtJQW1CZkMsQ0FBQ0E7SUFqQkFEOzs7T0FHR0E7SUFDV0EsZUFBS0EsR0FBVUEsT0FBT0EsQ0FBQ0E7SUFFckNBOzs7T0FHR0E7SUFDV0EsY0FBSUEsR0FBVUEsTUFBTUEsQ0FBQ0E7SUFFbkNBOzs7T0FHR0E7SUFDV0EsZ0JBQU1BLEdBQVVBLFFBQVFBLENBQUNBO0lBQ3hDQSxnQkFBQ0E7QUFBREEsQ0FuQkEsQUFtQkNBLElBQUE7QUFFRCxBQUFtQixpQkFBVixTQUFTLENBQUMiLCJmaWxlIjoiZHJhdy9DYXBzU3R5bGUuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIFRoZSBDYXBzU3R5bGUgY2xhc3MgaXMgYW4gZW51bWVyYXRpb24gb2YgY29uc3RhbnQgdmFsdWVzIHRoYXQgc3BlY2lmeSB0aGVcclxuICogY2FwcyBzdHlsZSB0byB1c2UgaW4gZHJhd2luZyBsaW5lcy4gVGhlIGNvbnN0YW50cyBhcmUgcHJvdmlkZWQgZm9yIHVzZSBhc1xyXG4gKiB2YWx1ZXMgaW4gdGhlIDxjb2RlPmNhcHM8L2NvZGU+IHBhcmFtZXRlciBvZiB0aGVcclxuICogPGNvZGU+Zmxhc2guZGlzcGxheS5HcmFwaGljcy5saW5lU3R5bGUoKTwvY29kZT4gbWV0aG9kLiBZb3UgY2FuIHNwZWNpZnkgdGhlXHJcbiAqIGZvbGxvd2luZyB0aHJlZSB0eXBlcyBvZiBjYXBzOlxyXG4gKi9cclxuY2xhc3MgQ2Fwc1N0eWxlXHJcbntcclxuXHQvKipcclxuXHQgKiBVc2VkIHRvIHNwZWNpZnkgcm91bmQgY2FwcyBpbiB0aGUgPGNvZGU+Y2FwczwvY29kZT4gcGFyYW1ldGVyIG9mIHRoZVxyXG5cdCAqIDxjb2RlPmZsYXNoLmRpc3BsYXkuR3JhcGhpY3MubGluZVN0eWxlKCk8L2NvZGU+IG1ldGhvZC5cclxuXHQgKi9cclxuXHRwdWJsaWMgc3RhdGljIFJPVU5EOnN0cmluZyA9IFwicm91bmRcIjtcclxuXHJcblx0LyoqXHJcblx0ICogVXNlZCB0byBzcGVjaWZ5IG5vIGNhcHMgaW4gdGhlIDxjb2RlPmNhcHM8L2NvZGU+IHBhcmFtZXRlciBvZiB0aGVcclxuXHQgKiA8Y29kZT5mbGFzaC5kaXNwbGF5LkdyYXBoaWNzLmxpbmVTdHlsZSgpPC9jb2RlPiBtZXRob2QuXHJcblx0ICovXHJcblx0cHVibGljIHN0YXRpYyBOT05FOnN0cmluZyA9IFwibm9uZVwiO1xyXG5cclxuXHQvKipcclxuXHQgKiBVc2VkIHRvIHNwZWNpZnkgc3F1YXJlIGNhcHMgaW4gdGhlIDxjb2RlPmNhcHM8L2NvZGU+IHBhcmFtZXRlciBvZiB0aGVcclxuXHQgKiA8Y29kZT5mbGFzaC5kaXNwbGF5LkdyYXBoaWNzLmxpbmVTdHlsZSgpPC9jb2RlPiBtZXRob2QuXHJcblx0ICovXHJcblx0cHVibGljIHN0YXRpYyBTUVVBUkU6c3RyaW5nID0gXCJzcXVhcmVcIjtcclxufVxyXG5cclxuZXhwb3J0ID0gQ2Fwc1N0eWxlOyJdfQ==