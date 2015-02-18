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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0ludGVycG9sYXRpb25NZXRob2QudHMiXSwibmFtZXMiOlsiSW50ZXJwb2xhdGlvbk1ldGhvZCIsIkludGVycG9sYXRpb25NZXRob2QuY29uc3RydWN0b3IiXSwibWFwcGluZ3MiOiJBQUFBLEFBT0E7Ozs7OztHQURHO0lBQ0csbUJBQW1CO0lBQXpCQSxTQUFNQSxtQkFBbUJBO0lBOEJ6QkMsQ0FBQ0E7SUEzQkFEOzs7Ozs7Ozs7OztPQVdHQTtJQUNXQSw4QkFBVUEsR0FBVUEsV0FBV0EsQ0FBQ0E7SUFFOUNBOzs7Ozs7Ozs7OztPQVdHQTtJQUNXQSx1QkFBR0EsR0FBVUEsS0FBS0EsQ0FBQ0E7SUFDbENBLDBCQUFDQTtBQUFEQSxDQTlCQSxBQThCQ0EsSUFBQTtBQUVELEFBQTZCLGlCQUFwQixtQkFBbUIsQ0FBQyIsImZpbGUiOiJiYXNlL0ludGVycG9sYXRpb25NZXRob2QuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIFRoZSBJbnRlcnBvbGF0aW9uTWV0aG9kIGNsYXNzIHByb3ZpZGVzIHZhbHVlcyBmb3IgdGhlXHJcbiAqIDxjb2RlPmludGVycG9sYXRpb25NZXRob2Q8L2NvZGU+IHBhcmFtZXRlciBpbiB0aGVcclxuICogPGNvZGU+R3JhcGhpY3MuYmVnaW5HcmFkaWVudEZpbGwoKTwvY29kZT4gYW5kXHJcbiAqIDxjb2RlPkdyYXBoaWNzLmxpbmVHcmFkaWVudFN0eWxlKCk8L2NvZGU+IG1ldGhvZHMuIFRoaXMgcGFyYW1ldGVyXHJcbiAqIGRldGVybWluZXMgdGhlIFJHQiBzcGFjZSB0byB1c2Ugd2hlbiByZW5kZXJpbmcgdGhlIGdyYWRpZW50LlxyXG4gKi9cclxuY2xhc3MgSW50ZXJwb2xhdGlvbk1ldGhvZFxyXG57XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNwZWNpZmllcyB0aGF0IHRoZSBSR0IgaW50ZXJwb2xhdGlvbiBtZXRob2Qgc2hvdWxkIGJlIHVzZWQuIFRoaXMgbWVhbnNcclxuXHQgKiB0aGF0IHRoZSBncmFkaWVudCBpcyByZW5kZXJlZCB3aXRoIGV4cG9uZW50aWFsIHNSR0Ioc3RhbmRhcmQgUkdCKSBzcGFjZS5cclxuXHQgKiBUaGUgc1JHQiBzcGFjZSBpcyBhIFczQy1lbmRvcnNlZCBzdGFuZGFyZCB0aGF0IGRlZmluZXMgYSBub24tbGluZWFyXHJcblx0ICogY29udmVyc2lvbiBiZXR3ZWVuIHJlZCwgZ3JlZW4sIGFuZCBibHVlIGNvbXBvbmVudCB2YWx1ZXMgYW5kIHRoZSBhY3R1YWxcclxuXHQgKiBpbnRlbnNpdHkgb2YgdGhlIHZpc2libGUgY29tcG9uZW50IGNvbG9yLlxyXG5cdCAqXHJcblx0ICogPHA+Rm9yIGV4YW1wbGUsIGNvbnNpZGVyIGEgc2ltcGxlIGxpbmVhciBncmFkaWVudCBiZXR3ZWVuIHR3byBjb2xvcnMod2l0aFxyXG5cdCAqIHRoZSA8Y29kZT5zcHJlYWRNZXRob2Q8L2NvZGU+IHBhcmFtZXRlciBzZXQgdG9cclxuXHQgKiA8Y29kZT5TcHJlYWRNZXRob2QuUkVGTEVDVDwvY29kZT4pLiBUaGUgZGlmZmVyZW50IGludGVycG9sYXRpb24gbWV0aG9kc1xyXG5cdCAqIGFmZmVjdCB0aGUgYXBwZWFyYW5jZSBhcyBmb2xsb3dzOiA8L3A+XHJcblx0ICovXHJcblx0cHVibGljIHN0YXRpYyBMSU5FQVJfUkdCOnN0cmluZyA9IFwibGluZWFyUkdCXCI7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNwZWNpZmllcyB0aGF0IHRoZSBSR0IgaW50ZXJwb2xhdGlvbiBtZXRob2Qgc2hvdWxkIGJlIHVzZWQuIFRoaXMgbWVhbnNcclxuXHQgKiB0aGF0IHRoZSBncmFkaWVudCBpcyByZW5kZXJlZCB3aXRoIGV4cG9uZW50aWFsIHNSR0Ioc3RhbmRhcmQgUkdCKSBzcGFjZS5cclxuXHQgKiBUaGUgc1JHQiBzcGFjZSBpcyBhIFczQy1lbmRvcnNlZCBzdGFuZGFyZCB0aGF0IGRlZmluZXMgYSBub24tbGluZWFyXHJcblx0ICogY29udmVyc2lvbiBiZXR3ZWVuIHJlZCwgZ3JlZW4sIGFuZCBibHVlIGNvbXBvbmVudCB2YWx1ZXMgYW5kIHRoZSBhY3R1YWxcclxuXHQgKiBpbnRlbnNpdHkgb2YgdGhlIHZpc2libGUgY29tcG9uZW50IGNvbG9yLlxyXG5cdCAqXHJcblx0ICogPHA+Rm9yIGV4YW1wbGUsIGNvbnNpZGVyIGEgc2ltcGxlIGxpbmVhciBncmFkaWVudCBiZXR3ZWVuIHR3byBjb2xvcnMod2l0aFxyXG5cdCAqIHRoZSA8Y29kZT5zcHJlYWRNZXRob2Q8L2NvZGU+IHBhcmFtZXRlciBzZXQgdG9cclxuXHQgKiA8Y29kZT5TcHJlYWRNZXRob2QuUkVGTEVDVDwvY29kZT4pLiBUaGUgZGlmZmVyZW50IGludGVycG9sYXRpb24gbWV0aG9kc1xyXG5cdCAqIGFmZmVjdCB0aGUgYXBwZWFyYW5jZSBhcyBmb2xsb3dzOiA8L3A+XHJcblx0ICovXHJcblx0cHVibGljIHN0YXRpYyBSR0I6c3RyaW5nID0gXCJyZ2JcIjtcclxufVxyXG5cclxuZXhwb3J0ID0gSW50ZXJwb2xhdGlvbk1ldGhvZDsiXX0=