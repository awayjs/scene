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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi90ZXh0L2FudGlhbGlhc3R5cGUudHMiXSwibmFtZXMiOlsiQW50aUFsaWFzVHlwZSIsIkFudGlBbGlhc1R5cGUuY29uc3RydWN0b3IiXSwibWFwcGluZ3MiOiJBQUFBLEFBSUE7OztHQURHO0lBQ0csYUFBYTtJQUFuQkEsU0FBTUEsYUFBYUE7SUFxQm5CQyxDQUFDQTtJQW5CQUQ7Ozs7Ozs7O09BUUdBO0lBQ1dBLHNCQUFRQSxHQUFVQSxVQUFVQSxDQUFDQTtJQUUzQ0E7Ozs7OztPQU1HQTtJQUNXQSxvQkFBTUEsR0FBVUEsUUFBUUEsQ0FBQ0E7SUFDeENBLG9CQUFDQTtBQUFEQSxDQXJCQSxBQXFCQ0EsSUFBQTtBQUVELEFBQXVCLGlCQUFkLGFBQWEsQ0FBQyIsImZpbGUiOiJ0ZXh0L0FudGlBbGlhc1R5cGUuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBUaGUgQW50aUFsaWFzVHlwZSBjbGFzcyBwcm92aWRlcyB2YWx1ZXMgZm9yIGFudGktYWxpYXNpbmcgaW4gdGhlXG4gKiBhd2F5LnRleHQuVGV4dEZpZWxkIGNsYXNzLlxuICovXG5jbGFzcyBBbnRpQWxpYXNUeXBlXG57XG5cdC8qKlxuXHQgKiBTZXRzIGFudGktYWxpYXNpbmcgdG8gYWR2YW5jZWQgYW50aS1hbGlhc2luZy4gQWR2YW5jZWQgYW50aS1hbGlhc2luZ1xuXHQgKiBhbGxvd3MgZm9udCBmYWNlcyB0byBiZSByZW5kZXJlZCBhdCB2ZXJ5IGhpZ2ggcXVhbGl0eSBhdCBzbWFsbCBzaXplcy4gSXRcblx0ICogaXMgYmVzdCB1c2VkIHdpdGggYXBwbGljYXRpb25zIHRoYXQgaGF2ZSBhIGxvdCBvZiBzbWFsbCB0ZXh0LiBBZHZhbmNlZFxuXHQgKiBhbnRpLWFsaWFzaW5nIGlzIG5vdCByZWNvbW1lbmRlZCBmb3IgdmVyeSBsYXJnZSBmb250cyhsYXJnZXIgdGhhbiA0OFxuXHQgKiBwb2ludHMpLiBUaGlzIGNvbnN0YW50IGlzIHVzZWQgZm9yIHRoZSA8Y29kZT5hbnRpQWxpYXNUeXBlPC9jb2RlPiBwcm9wZXJ0eVxuXHQgKiBpbiB0aGUgVGV4dEZpZWxkIGNsYXNzLiBVc2UgdGhlIHN5bnRheFxuXHQgKiA8Y29kZT5BbnRpQWxpYXNUeXBlLkFEVkFOQ0VEPC9jb2RlPi5cblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgQURWQU5DRUQ6c3RyaW5nID0gXCJhZHZhbmNlZFwiO1xuXG5cdC8qKlxuXHQgKiBTZXRzIGFudGktYWxpYXNpbmcgdG8gdGhlIGFudGktYWxpYXNpbmcgdGhhdCBpcyB1c2VkIGluIEZsYXNoIFBsYXllciA3IGFuZFxuXHQgKiBlYXJsaWVyLiBUaGlzIHNldHRpbmcgaXMgcmVjb21tZW5kZWQgZm9yIGFwcGxpY2F0aW9ucyB0aGF0IGRvIG5vdCBoYXZlIGFcblx0ICogbG90IG9mIHRleHQuIFRoaXMgY29uc3RhbnQgaXMgdXNlZCBmb3IgdGhlIDxjb2RlPmFudGlBbGlhc1R5cGU8L2NvZGU+XG5cdCAqIHByb3BlcnR5IGluIHRoZSBUZXh0RmllbGQgY2xhc3MuIFVzZSB0aGUgc3ludGF4XG5cdCAqIDxjb2RlPkFudGlBbGlhc1R5cGUuTk9STUFMPC9jb2RlPi5cblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgTk9STUFMOnN0cmluZyA9IFwibm9ybWFsXCI7XG59XG5cbmV4cG9ydCA9IEFudGlBbGlhc1R5cGU7Il19