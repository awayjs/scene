/**
 * The InterpolationMethod class provides values for the
 * <code>interpolationMethod</code> parameter in the
 * <code>Graphics.beginGradientFill()</code> and
 * <code>Graphics.lineGradientStyle()</code> methods. This parameter
 * determines the RGB space to use when rendering the gradient.
 */
var InterpolationMethod = (function () {
    function InterpolationMethod() {
    }
    /**
     * Specifies that the RGB interpolation method should be used. This means
     * that the gradient is rendered with exponential sRGB(standard RGB) space.
     * The sRGB space is a W3C-endorsed standard that defines a non-linear
     * conversion between red, green, and blue component values and the actual
     * intensity of the visible component color.
     *
     * <p>For example, consider a simple linear gradient between two colors(with
     * the <code>spreadMethod</code> parameter set to
     * <code>SpreadMethod.REFLECT</code>). The different interpolation methods
     * affect the appearance as follows: </p>
     */
    InterpolationMethod.LINEAR_RGB = "linearRGB";
    /**
     * Specifies that the RGB interpolation method should be used. This means
     * that the gradient is rendered with exponential sRGB(standard RGB) space.
     * The sRGB space is a W3C-endorsed standard that defines a non-linear
     * conversion between red, green, and blue component values and the actual
     * intensity of the visible component color.
     *
     * <p>For example, consider a simple linear gradient between two colors(with
     * the <code>spreadMethod</code> parameter set to
     * <code>SpreadMethod.REFLECT</code>). The different interpolation methods
     * affect the appearance as follows: </p>
     */
    InterpolationMethod.RGB = "rgb";
    return InterpolationMethod;
})();
module.exports = InterpolationMethod;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL2ludGVycG9sYXRpb25tZXRob2QudHMiXSwibmFtZXMiOlsiSW50ZXJwb2xhdGlvbk1ldGhvZCIsIkludGVycG9sYXRpb25NZXRob2QuY29uc3RydWN0b3IiXSwibWFwcGluZ3MiOiJBQUFBLEFBT0E7Ozs7OztHQURHO0lBQ0csbUJBQW1CO0lBQXpCQSxTQUFNQSxtQkFBbUJBO0lBOEJ6QkMsQ0FBQ0E7SUEzQkFEOzs7Ozs7Ozs7OztPQVdHQTtJQUNXQSw4QkFBVUEsR0FBVUEsV0FBV0EsQ0FBQ0E7SUFFOUNBOzs7Ozs7Ozs7OztPQVdHQTtJQUNXQSx1QkFBR0EsR0FBVUEsS0FBS0EsQ0FBQ0E7SUFDbENBLDBCQUFDQTtBQUFEQSxDQTlCQSxBQThCQ0EsSUFBQTtBQUVELEFBQTZCLGlCQUFwQixtQkFBbUIsQ0FBQyIsImZpbGUiOiJiYXNlL0ludGVycG9sYXRpb25NZXRob2QuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBUaGUgSW50ZXJwb2xhdGlvbk1ldGhvZCBjbGFzcyBwcm92aWRlcyB2YWx1ZXMgZm9yIHRoZVxuICogPGNvZGU+aW50ZXJwb2xhdGlvbk1ldGhvZDwvY29kZT4gcGFyYW1ldGVyIGluIHRoZVxuICogPGNvZGU+R3JhcGhpY3MuYmVnaW5HcmFkaWVudEZpbGwoKTwvY29kZT4gYW5kXG4gKiA8Y29kZT5HcmFwaGljcy5saW5lR3JhZGllbnRTdHlsZSgpPC9jb2RlPiBtZXRob2RzLiBUaGlzIHBhcmFtZXRlclxuICogZGV0ZXJtaW5lcyB0aGUgUkdCIHNwYWNlIHRvIHVzZSB3aGVuIHJlbmRlcmluZyB0aGUgZ3JhZGllbnQuXG4gKi9cbmNsYXNzIEludGVycG9sYXRpb25NZXRob2RcbntcblxuXHQvKipcblx0ICogU3BlY2lmaWVzIHRoYXQgdGhlIFJHQiBpbnRlcnBvbGF0aW9uIG1ldGhvZCBzaG91bGQgYmUgdXNlZC4gVGhpcyBtZWFuc1xuXHQgKiB0aGF0IHRoZSBncmFkaWVudCBpcyByZW5kZXJlZCB3aXRoIGV4cG9uZW50aWFsIHNSR0Ioc3RhbmRhcmQgUkdCKSBzcGFjZS5cblx0ICogVGhlIHNSR0Igc3BhY2UgaXMgYSBXM0MtZW5kb3JzZWQgc3RhbmRhcmQgdGhhdCBkZWZpbmVzIGEgbm9uLWxpbmVhclxuXHQgKiBjb252ZXJzaW9uIGJldHdlZW4gcmVkLCBncmVlbiwgYW5kIGJsdWUgY29tcG9uZW50IHZhbHVlcyBhbmQgdGhlIGFjdHVhbFxuXHQgKiBpbnRlbnNpdHkgb2YgdGhlIHZpc2libGUgY29tcG9uZW50IGNvbG9yLlxuXHQgKlxuXHQgKiA8cD5Gb3IgZXhhbXBsZSwgY29uc2lkZXIgYSBzaW1wbGUgbGluZWFyIGdyYWRpZW50IGJldHdlZW4gdHdvIGNvbG9ycyh3aXRoXG5cdCAqIHRoZSA8Y29kZT5zcHJlYWRNZXRob2Q8L2NvZGU+IHBhcmFtZXRlciBzZXQgdG9cblx0ICogPGNvZGU+U3ByZWFkTWV0aG9kLlJFRkxFQ1Q8L2NvZGU+KS4gVGhlIGRpZmZlcmVudCBpbnRlcnBvbGF0aW9uIG1ldGhvZHNcblx0ICogYWZmZWN0IHRoZSBhcHBlYXJhbmNlIGFzIGZvbGxvd3M6IDwvcD5cblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgTElORUFSX1JHQjpzdHJpbmcgPSBcImxpbmVhclJHQlwiO1xuXG5cdC8qKlxuXHQgKiBTcGVjaWZpZXMgdGhhdCB0aGUgUkdCIGludGVycG9sYXRpb24gbWV0aG9kIHNob3VsZCBiZSB1c2VkLiBUaGlzIG1lYW5zXG5cdCAqIHRoYXQgdGhlIGdyYWRpZW50IGlzIHJlbmRlcmVkIHdpdGggZXhwb25lbnRpYWwgc1JHQihzdGFuZGFyZCBSR0IpIHNwYWNlLlxuXHQgKiBUaGUgc1JHQiBzcGFjZSBpcyBhIFczQy1lbmRvcnNlZCBzdGFuZGFyZCB0aGF0IGRlZmluZXMgYSBub24tbGluZWFyXG5cdCAqIGNvbnZlcnNpb24gYmV0d2VlbiByZWQsIGdyZWVuLCBhbmQgYmx1ZSBjb21wb25lbnQgdmFsdWVzIGFuZCB0aGUgYWN0dWFsXG5cdCAqIGludGVuc2l0eSBvZiB0aGUgdmlzaWJsZSBjb21wb25lbnQgY29sb3IuXG5cdCAqXG5cdCAqIDxwPkZvciBleGFtcGxlLCBjb25zaWRlciBhIHNpbXBsZSBsaW5lYXIgZ3JhZGllbnQgYmV0d2VlbiB0d28gY29sb3JzKHdpdGhcblx0ICogdGhlIDxjb2RlPnNwcmVhZE1ldGhvZDwvY29kZT4gcGFyYW1ldGVyIHNldCB0b1xuXHQgKiA8Y29kZT5TcHJlYWRNZXRob2QuUkVGTEVDVDwvY29kZT4pLiBUaGUgZGlmZmVyZW50IGludGVycG9sYXRpb24gbWV0aG9kc1xuXHQgKiBhZmZlY3QgdGhlIGFwcGVhcmFuY2UgYXMgZm9sbG93czogPC9wPlxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBSR0I6c3RyaW5nID0gXCJyZ2JcIjtcbn1cblxuZXhwb3J0ID0gSW50ZXJwb2xhdGlvbk1ldGhvZDsiXX0=