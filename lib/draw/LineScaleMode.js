/**
 * The LineScaleMode class provides values for the <code>scaleMode</code>
 * parameter in the <code>Graphics.lineStyle()</code> method.
 */
var LineScaleMode = (function () {
    function LineScaleMode() {
    }
    /**
     * With this setting used as the <code>scaleMode</code> parameter of the
     * <code>lineStyle()</code> method, the thickness of the line scales
     * <i>only</i> vertically. For example, consider the following circles, drawn
     * with a one-pixel line, and each with the <code>scaleMode</code> parameter
     * set to <code>LineScaleMode.VERTICAL</code>. The circle on the left is
     * scaled only vertically, and the circle on the right is scaled both
     * vertically and horizontally.
     */
    LineScaleMode.HORIZONTAL = "horizontal";
    /**
     * With this setting used as the <code>scaleMode</code> parameter of the
     * <code>lineStyle()</code> method, the thickness of the line never scales.
     */
    LineScaleMode.NONE = "none";
    /**
     * With this setting used as the <code>scaleMode</code> parameter of the
     * <code>lineStyle()</code> method, the thickness of the line always scales
     * when the object is scaled(the default).
     */
    LineScaleMode.NORMAL = "normal";
    /**
     * With this setting used as the <code>scaleMode</code> parameter of the
     * <code>lineStyle()</code> method, the thickness of the line scales
     * <i>only</i> horizontally. For example, consider the following circles,
     * drawn with a one-pixel line, and each with the <code>scaleMode</code>
     * parameter set to <code>LineScaleMode.HORIZONTAL</code>. The circle on the
     * left is scaled only horizontally, and the circle on the right is scaled
     * both vertically and horizontally.
     */
    LineScaleMode.VERTICAL = "vertical";
    return LineScaleMode;
})();
module.exports = LineScaleMode;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9kcmF3L0xpbmVTY2FsZU1vZGUudHMiXSwibmFtZXMiOlsiTGluZVNjYWxlTW9kZSIsIkxpbmVTY2FsZU1vZGUuY29uc3RydWN0b3IiXSwibWFwcGluZ3MiOiJBQUFBLEFBSUE7OztHQURHO0lBQ0csYUFBYTtJQUFuQkEsU0FBTUEsYUFBYUE7SUFvQ25CQyxDQUFDQTtJQWxDQUQ7Ozs7Ozs7O09BUUdBO0lBQ1dBLHdCQUFVQSxHQUFVQSxZQUFZQSxDQUFDQTtJQUUvQ0E7OztPQUdHQTtJQUNXQSxrQkFBSUEsR0FBVUEsTUFBTUEsQ0FBQ0E7SUFFbkNBOzs7O09BSUdBO0lBQ1dBLG9CQUFNQSxHQUFVQSxRQUFRQSxDQUFDQTtJQUV2Q0E7Ozs7Ozs7O09BUUdBO0lBQ1dBLHNCQUFRQSxHQUFVQSxVQUFVQSxDQUFDQTtJQUM1Q0Esb0JBQUNBO0FBQURBLENBcENBLEFBb0NDQSxJQUFBO0FBRUQsQUFBdUIsaUJBQWQsYUFBYSxDQUFDIiwiZmlsZSI6ImRyYXcvTGluZVNjYWxlTW9kZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogVGhlIExpbmVTY2FsZU1vZGUgY2xhc3MgcHJvdmlkZXMgdmFsdWVzIGZvciB0aGUgPGNvZGU+c2NhbGVNb2RlPC9jb2RlPlxyXG4gKiBwYXJhbWV0ZXIgaW4gdGhlIDxjb2RlPkdyYXBoaWNzLmxpbmVTdHlsZSgpPC9jb2RlPiBtZXRob2QuXHJcbiAqL1xyXG5jbGFzcyBMaW5lU2NhbGVNb2RlXHJcbntcclxuXHQvKipcclxuXHQgKiBXaXRoIHRoaXMgc2V0dGluZyB1c2VkIGFzIHRoZSA8Y29kZT5zY2FsZU1vZGU8L2NvZGU+IHBhcmFtZXRlciBvZiB0aGVcclxuXHQgKiA8Y29kZT5saW5lU3R5bGUoKTwvY29kZT4gbWV0aG9kLCB0aGUgdGhpY2tuZXNzIG9mIHRoZSBsaW5lIHNjYWxlc1xyXG5cdCAqIDxpPm9ubHk8L2k+IHZlcnRpY2FsbHkuIEZvciBleGFtcGxlLCBjb25zaWRlciB0aGUgZm9sbG93aW5nIGNpcmNsZXMsIGRyYXduXHJcblx0ICogd2l0aCBhIG9uZS1waXhlbCBsaW5lLCBhbmQgZWFjaCB3aXRoIHRoZSA8Y29kZT5zY2FsZU1vZGU8L2NvZGU+IHBhcmFtZXRlclxyXG5cdCAqIHNldCB0byA8Y29kZT5MaW5lU2NhbGVNb2RlLlZFUlRJQ0FMPC9jb2RlPi4gVGhlIGNpcmNsZSBvbiB0aGUgbGVmdCBpc1xyXG5cdCAqIHNjYWxlZCBvbmx5IHZlcnRpY2FsbHksIGFuZCB0aGUgY2lyY2xlIG9uIHRoZSByaWdodCBpcyBzY2FsZWQgYm90aFxyXG5cdCAqIHZlcnRpY2FsbHkgYW5kIGhvcml6b250YWxseS5cclxuXHQgKi9cclxuXHRwdWJsaWMgc3RhdGljIEhPUklaT05UQUw6c3RyaW5nID0gXCJob3Jpem9udGFsXCI7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFdpdGggdGhpcyBzZXR0aW5nIHVzZWQgYXMgdGhlIDxjb2RlPnNjYWxlTW9kZTwvY29kZT4gcGFyYW1ldGVyIG9mIHRoZVxyXG5cdCAqIDxjb2RlPmxpbmVTdHlsZSgpPC9jb2RlPiBtZXRob2QsIHRoZSB0aGlja25lc3Mgb2YgdGhlIGxpbmUgbmV2ZXIgc2NhbGVzLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzdGF0aWMgTk9ORTpzdHJpbmcgPSBcIm5vbmVcIjtcclxuXHJcblx0LyoqXHJcblx0ICogV2l0aCB0aGlzIHNldHRpbmcgdXNlZCBhcyB0aGUgPGNvZGU+c2NhbGVNb2RlPC9jb2RlPiBwYXJhbWV0ZXIgb2YgdGhlXHJcblx0ICogPGNvZGU+bGluZVN0eWxlKCk8L2NvZGU+IG1ldGhvZCwgdGhlIHRoaWNrbmVzcyBvZiB0aGUgbGluZSBhbHdheXMgc2NhbGVzXHJcblx0ICogd2hlbiB0aGUgb2JqZWN0IGlzIHNjYWxlZCh0aGUgZGVmYXVsdCkuXHJcblx0ICovXHJcblx0cHVibGljIHN0YXRpYyBOT1JNQUw6c3RyaW5nID0gXCJub3JtYWxcIjtcclxuXHJcblx0LyoqXHJcblx0ICogV2l0aCB0aGlzIHNldHRpbmcgdXNlZCBhcyB0aGUgPGNvZGU+c2NhbGVNb2RlPC9jb2RlPiBwYXJhbWV0ZXIgb2YgdGhlXHJcblx0ICogPGNvZGU+bGluZVN0eWxlKCk8L2NvZGU+IG1ldGhvZCwgdGhlIHRoaWNrbmVzcyBvZiB0aGUgbGluZSBzY2FsZXNcclxuXHQgKiA8aT5vbmx5PC9pPiBob3Jpem9udGFsbHkuIEZvciBleGFtcGxlLCBjb25zaWRlciB0aGUgZm9sbG93aW5nIGNpcmNsZXMsXHJcblx0ICogZHJhd24gd2l0aCBhIG9uZS1waXhlbCBsaW5lLCBhbmQgZWFjaCB3aXRoIHRoZSA8Y29kZT5zY2FsZU1vZGU8L2NvZGU+XHJcblx0ICogcGFyYW1ldGVyIHNldCB0byA8Y29kZT5MaW5lU2NhbGVNb2RlLkhPUklaT05UQUw8L2NvZGU+LiBUaGUgY2lyY2xlIG9uIHRoZVxyXG5cdCAqIGxlZnQgaXMgc2NhbGVkIG9ubHkgaG9yaXpvbnRhbGx5LCBhbmQgdGhlIGNpcmNsZSBvbiB0aGUgcmlnaHQgaXMgc2NhbGVkXHJcblx0ICogYm90aCB2ZXJ0aWNhbGx5IGFuZCBob3Jpem9udGFsbHkuXHJcblx0ICovXHJcblx0cHVibGljIHN0YXRpYyBWRVJUSUNBTDpzdHJpbmcgPSBcInZlcnRpY2FsXCI7XHJcbn1cclxuXHJcbmV4cG9ydCA9IExpbmVTY2FsZU1vZGU7Il19