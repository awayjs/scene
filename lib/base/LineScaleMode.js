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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL2xpbmVzY2FsZW1vZGUudHMiXSwibmFtZXMiOlsiTGluZVNjYWxlTW9kZSIsIkxpbmVTY2FsZU1vZGUuY29uc3RydWN0b3IiXSwibWFwcGluZ3MiOiJBQUFBLEFBSUE7OztHQURHO0lBQ0csYUFBYTtJQUFuQkEsU0FBTUEsYUFBYUE7SUFvQ25CQyxDQUFDQTtJQWxDQUQ7Ozs7Ozs7O09BUUdBO0lBQ1dBLHdCQUFVQSxHQUFVQSxZQUFZQSxDQUFDQTtJQUUvQ0E7OztPQUdHQTtJQUNXQSxrQkFBSUEsR0FBVUEsTUFBTUEsQ0FBQ0E7SUFFbkNBOzs7O09BSUdBO0lBQ1dBLG9CQUFNQSxHQUFVQSxRQUFRQSxDQUFDQTtJQUV2Q0E7Ozs7Ozs7O09BUUdBO0lBQ1dBLHNCQUFRQSxHQUFVQSxVQUFVQSxDQUFDQTtJQUM1Q0Esb0JBQUNBO0FBQURBLENBcENBLEFBb0NDQSxJQUFBO0FBRUQsQUFBdUIsaUJBQWQsYUFBYSxDQUFDIiwiZmlsZSI6ImJhc2UvTGluZVNjYWxlTW9kZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFRoZSBMaW5lU2NhbGVNb2RlIGNsYXNzIHByb3ZpZGVzIHZhbHVlcyBmb3IgdGhlIDxjb2RlPnNjYWxlTW9kZTwvY29kZT5cbiAqIHBhcmFtZXRlciBpbiB0aGUgPGNvZGU+R3JhcGhpY3MubGluZVN0eWxlKCk8L2NvZGU+IG1ldGhvZC5cbiAqL1xuY2xhc3MgTGluZVNjYWxlTW9kZVxue1xuXHQvKipcblx0ICogV2l0aCB0aGlzIHNldHRpbmcgdXNlZCBhcyB0aGUgPGNvZGU+c2NhbGVNb2RlPC9jb2RlPiBwYXJhbWV0ZXIgb2YgdGhlXG5cdCAqIDxjb2RlPmxpbmVTdHlsZSgpPC9jb2RlPiBtZXRob2QsIHRoZSB0aGlja25lc3Mgb2YgdGhlIGxpbmUgc2NhbGVzXG5cdCAqIDxpPm9ubHk8L2k+IHZlcnRpY2FsbHkuIEZvciBleGFtcGxlLCBjb25zaWRlciB0aGUgZm9sbG93aW5nIGNpcmNsZXMsIGRyYXduXG5cdCAqIHdpdGggYSBvbmUtcGl4ZWwgbGluZSwgYW5kIGVhY2ggd2l0aCB0aGUgPGNvZGU+c2NhbGVNb2RlPC9jb2RlPiBwYXJhbWV0ZXJcblx0ICogc2V0IHRvIDxjb2RlPkxpbmVTY2FsZU1vZGUuVkVSVElDQUw8L2NvZGU+LiBUaGUgY2lyY2xlIG9uIHRoZSBsZWZ0IGlzXG5cdCAqIHNjYWxlZCBvbmx5IHZlcnRpY2FsbHksIGFuZCB0aGUgY2lyY2xlIG9uIHRoZSByaWdodCBpcyBzY2FsZWQgYm90aFxuXHQgKiB2ZXJ0aWNhbGx5IGFuZCBob3Jpem9udGFsbHkuXG5cdCAqL1xuXHRwdWJsaWMgc3RhdGljIEhPUklaT05UQUw6c3RyaW5nID0gXCJob3Jpem9udGFsXCI7XG5cblx0LyoqXG5cdCAqIFdpdGggdGhpcyBzZXR0aW5nIHVzZWQgYXMgdGhlIDxjb2RlPnNjYWxlTW9kZTwvY29kZT4gcGFyYW1ldGVyIG9mIHRoZVxuXHQgKiA8Y29kZT5saW5lU3R5bGUoKTwvY29kZT4gbWV0aG9kLCB0aGUgdGhpY2tuZXNzIG9mIHRoZSBsaW5lIG5ldmVyIHNjYWxlcy5cblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgTk9ORTpzdHJpbmcgPSBcIm5vbmVcIjtcblxuXHQvKipcblx0ICogV2l0aCB0aGlzIHNldHRpbmcgdXNlZCBhcyB0aGUgPGNvZGU+c2NhbGVNb2RlPC9jb2RlPiBwYXJhbWV0ZXIgb2YgdGhlXG5cdCAqIDxjb2RlPmxpbmVTdHlsZSgpPC9jb2RlPiBtZXRob2QsIHRoZSB0aGlja25lc3Mgb2YgdGhlIGxpbmUgYWx3YXlzIHNjYWxlc1xuXHQgKiB3aGVuIHRoZSBvYmplY3QgaXMgc2NhbGVkKHRoZSBkZWZhdWx0KS5cblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgTk9STUFMOnN0cmluZyA9IFwibm9ybWFsXCI7XG5cblx0LyoqXG5cdCAqIFdpdGggdGhpcyBzZXR0aW5nIHVzZWQgYXMgdGhlIDxjb2RlPnNjYWxlTW9kZTwvY29kZT4gcGFyYW1ldGVyIG9mIHRoZVxuXHQgKiA8Y29kZT5saW5lU3R5bGUoKTwvY29kZT4gbWV0aG9kLCB0aGUgdGhpY2tuZXNzIG9mIHRoZSBsaW5lIHNjYWxlc1xuXHQgKiA8aT5vbmx5PC9pPiBob3Jpem9udGFsbHkuIEZvciBleGFtcGxlLCBjb25zaWRlciB0aGUgZm9sbG93aW5nIGNpcmNsZXMsXG5cdCAqIGRyYXduIHdpdGggYSBvbmUtcGl4ZWwgbGluZSwgYW5kIGVhY2ggd2l0aCB0aGUgPGNvZGU+c2NhbGVNb2RlPC9jb2RlPlxuXHQgKiBwYXJhbWV0ZXIgc2V0IHRvIDxjb2RlPkxpbmVTY2FsZU1vZGUuSE9SSVpPTlRBTDwvY29kZT4uIFRoZSBjaXJjbGUgb24gdGhlXG5cdCAqIGxlZnQgaXMgc2NhbGVkIG9ubHkgaG9yaXpvbnRhbGx5LCBhbmQgdGhlIGNpcmNsZSBvbiB0aGUgcmlnaHQgaXMgc2NhbGVkXG5cdCAqIGJvdGggdmVydGljYWxseSBhbmQgaG9yaXpvbnRhbGx5LlxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBWRVJUSUNBTDpzdHJpbmcgPSBcInZlcnRpY2FsXCI7XG59XG5cbmV4cG9ydCA9IExpbmVTY2FsZU1vZGU7Il19