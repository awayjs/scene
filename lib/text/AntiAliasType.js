/**
 * The AntiAliasType class provides values for anti-aliasing in the
 * away.text.TextField class.
 */
var AntiAliasType = (function () {
    function AntiAliasType() {
    }
    /**
     * Sets anti-aliasing to advanced anti-aliasing. Advanced anti-aliasing
     * allows font faces to be rendered at very high quality at small sizes. It
     * is best used with applications that have a lot of small text. Advanced
     * anti-aliasing is not recommended for very large fonts(larger than 48
     * points). This constant is used for the <code>antiAliasType</code> property
     * in the TextField class. Use the syntax
     * <code>AntiAliasType.ADVANCED</code>.
     */
    AntiAliasType.ADVANCED = "advanced";
    /**
     * Sets anti-aliasing to the anti-aliasing that is used in Flash Player 7 and
     * earlier. This setting is recommended for applications that do not have a
     * lot of text. This constant is used for the <code>antiAliasType</code>
     * property in the TextField class. Use the syntax
     * <code>AntiAliasType.NORMAL</code>.
     */
    AntiAliasType.NORMAL = "normal";
    return AntiAliasType;
})();
module.exports = AntiAliasType;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi90ZXh0L0FudGlBbGlhc1R5cGUudHMiXSwibmFtZXMiOlsiQW50aUFsaWFzVHlwZSIsIkFudGlBbGlhc1R5cGUuY29uc3RydWN0b3IiXSwibWFwcGluZ3MiOiJBQUFBLEFBSUE7OztHQURHO0lBQ0csYUFBYTtJQUFuQkEsU0FBTUEsYUFBYUE7SUFxQm5CQyxDQUFDQTtJQW5CQUQ7Ozs7Ozs7O09BUUdBO0lBQ1dBLHNCQUFRQSxHQUFVQSxVQUFVQSxDQUFDQTtJQUUzQ0E7Ozs7OztPQU1HQTtJQUNXQSxvQkFBTUEsR0FBVUEsUUFBUUEsQ0FBQ0E7SUFDeENBLG9CQUFDQTtBQUFEQSxDQXJCQSxBQXFCQ0EsSUFBQTtBQUVELEFBQXVCLGlCQUFkLGFBQWEsQ0FBQyIsImZpbGUiOiJ0ZXh0L0FudGlBbGlhc1R5cGUuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIFRoZSBBbnRpQWxpYXNUeXBlIGNsYXNzIHByb3ZpZGVzIHZhbHVlcyBmb3IgYW50aS1hbGlhc2luZyBpbiB0aGVcclxuICogYXdheS50ZXh0LlRleHRGaWVsZCBjbGFzcy5cclxuICovXHJcbmNsYXNzIEFudGlBbGlhc1R5cGVcclxue1xyXG5cdC8qKlxyXG5cdCAqIFNldHMgYW50aS1hbGlhc2luZyB0byBhZHZhbmNlZCBhbnRpLWFsaWFzaW5nLiBBZHZhbmNlZCBhbnRpLWFsaWFzaW5nXHJcblx0ICogYWxsb3dzIGZvbnQgZmFjZXMgdG8gYmUgcmVuZGVyZWQgYXQgdmVyeSBoaWdoIHF1YWxpdHkgYXQgc21hbGwgc2l6ZXMuIEl0XHJcblx0ICogaXMgYmVzdCB1c2VkIHdpdGggYXBwbGljYXRpb25zIHRoYXQgaGF2ZSBhIGxvdCBvZiBzbWFsbCB0ZXh0LiBBZHZhbmNlZFxyXG5cdCAqIGFudGktYWxpYXNpbmcgaXMgbm90IHJlY29tbWVuZGVkIGZvciB2ZXJ5IGxhcmdlIGZvbnRzKGxhcmdlciB0aGFuIDQ4XHJcblx0ICogcG9pbnRzKS4gVGhpcyBjb25zdGFudCBpcyB1c2VkIGZvciB0aGUgPGNvZGU+YW50aUFsaWFzVHlwZTwvY29kZT4gcHJvcGVydHlcclxuXHQgKiBpbiB0aGUgVGV4dEZpZWxkIGNsYXNzLiBVc2UgdGhlIHN5bnRheFxyXG5cdCAqIDxjb2RlPkFudGlBbGlhc1R5cGUuQURWQU5DRUQ8L2NvZGU+LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzdGF0aWMgQURWQU5DRUQ6c3RyaW5nID0gXCJhZHZhbmNlZFwiO1xyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIGFudGktYWxpYXNpbmcgdG8gdGhlIGFudGktYWxpYXNpbmcgdGhhdCBpcyB1c2VkIGluIEZsYXNoIFBsYXllciA3IGFuZFxyXG5cdCAqIGVhcmxpZXIuIFRoaXMgc2V0dGluZyBpcyByZWNvbW1lbmRlZCBmb3IgYXBwbGljYXRpb25zIHRoYXQgZG8gbm90IGhhdmUgYVxyXG5cdCAqIGxvdCBvZiB0ZXh0LiBUaGlzIGNvbnN0YW50IGlzIHVzZWQgZm9yIHRoZSA8Y29kZT5hbnRpQWxpYXNUeXBlPC9jb2RlPlxyXG5cdCAqIHByb3BlcnR5IGluIHRoZSBUZXh0RmllbGQgY2xhc3MuIFVzZSB0aGUgc3ludGF4XHJcblx0ICogPGNvZGU+QW50aUFsaWFzVHlwZS5OT1JNQUw8L2NvZGU+LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzdGF0aWMgTk9STUFMOnN0cmluZyA9IFwibm9ybWFsXCI7XHJcbn1cclxuXHJcbmV4cG9ydCA9IEFudGlBbGlhc1R5cGU7Il19