/**
 * Defines codes for culling algorithms that determine which triangles not to
 * render when drawing triangle paths.
 *
 * <p> The terms <code>POSITIVE</code> and <code>NEGATIVE</code> refer to the
 * sign of a triangle's normal along the z-axis. The normal is a 3D vector
 * that is perpendicular to the surface of the triangle. </p>
 *
 * <p> A triangle whose vertices 0, 1, and 2 are arranged in a clockwise order
 * has a positive normal value. That is, its normal points in a positive
 * z-axis direction, away from the current view point. When the
 * <code>TriangleCulling.POSITIVE</code> algorithm is used, triangles with
 * positive normals are not rendered. Another term for this is backface
 * culling. </p>
 *
 * <p> A triangle whose vertices are arranged in a counter-clockwise order has
 * a negative normal value. That is, its normal points in a negative z-axis
 * direction, toward the current view point. When the
 * <code>TriangleCulling.NEGATIVE</code> algorithm is used, triangles with
 * negative normals will not be rendered. </p>
 */
var TriangleCulling = (function () {
    function TriangleCulling() {
    }
    /**
     * Specifies culling of all triangles facing toward the current view point.
     */
    TriangleCulling.NEGATIVE = "negative";
    /**
     * Specifies no culling. All triangles in the path are rendered.
     */
    TriangleCulling.NONE = "none";
    /**
     * Specifies culling of all triangles facing away from the current view
     * point. This is also known as backface culling.
     */
    TriangleCulling.POSITIVE = "positive";
    return TriangleCulling;
})();
module.exports = TriangleCulling;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9kcmF3L1RyaWFuZ2xlQ3VsbGluZy50cyJdLCJuYW1lcyI6WyJUcmlhbmdsZUN1bGxpbmciLCJUcmlhbmdsZUN1bGxpbmcuY29uc3RydWN0b3IiXSwibWFwcGluZ3MiOiJBQUFBLEFBcUJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQURHO0lBQ0csZUFBZTtJQUFyQkEsU0FBTUEsZUFBZUE7SUFpQnJCQyxDQUFDQTtJQWZBRDs7T0FFR0E7SUFDV0Esd0JBQVFBLEdBQVVBLFVBQVVBLENBQUNBO0lBRTNDQTs7T0FFR0E7SUFDV0Esb0JBQUlBLEdBQVVBLE1BQU1BLENBQUNBO0lBRW5DQTs7O09BR0dBO0lBQ1dBLHdCQUFRQSxHQUFVQSxVQUFVQSxDQUFDQTtJQUM1Q0Esc0JBQUNBO0FBQURBLENBakJBLEFBaUJDQSxJQUFBO0FBRUQsQUFBeUIsaUJBQWhCLGVBQWUsQ0FBQyIsImZpbGUiOiJkcmF3L1RyaWFuZ2xlQ3VsbGluZy5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogRGVmaW5lcyBjb2RlcyBmb3IgY3VsbGluZyBhbGdvcml0aG1zIHRoYXQgZGV0ZXJtaW5lIHdoaWNoIHRyaWFuZ2xlcyBub3QgdG9cclxuICogcmVuZGVyIHdoZW4gZHJhd2luZyB0cmlhbmdsZSBwYXRocy5cclxuICpcclxuICogPHA+IFRoZSB0ZXJtcyA8Y29kZT5QT1NJVElWRTwvY29kZT4gYW5kIDxjb2RlPk5FR0FUSVZFPC9jb2RlPiByZWZlciB0byB0aGVcclxuICogc2lnbiBvZiBhIHRyaWFuZ2xlJ3Mgbm9ybWFsIGFsb25nIHRoZSB6LWF4aXMuIFRoZSBub3JtYWwgaXMgYSAzRCB2ZWN0b3JcclxuICogdGhhdCBpcyBwZXJwZW5kaWN1bGFyIHRvIHRoZSBzdXJmYWNlIG9mIHRoZSB0cmlhbmdsZS4gPC9wPlxyXG4gKlxyXG4gKiA8cD4gQSB0cmlhbmdsZSB3aG9zZSB2ZXJ0aWNlcyAwLCAxLCBhbmQgMiBhcmUgYXJyYW5nZWQgaW4gYSBjbG9ja3dpc2Ugb3JkZXJcclxuICogaGFzIGEgcG9zaXRpdmUgbm9ybWFsIHZhbHVlLiBUaGF0IGlzLCBpdHMgbm9ybWFsIHBvaW50cyBpbiBhIHBvc2l0aXZlXHJcbiAqIHotYXhpcyBkaXJlY3Rpb24sIGF3YXkgZnJvbSB0aGUgY3VycmVudCB2aWV3IHBvaW50LiBXaGVuIHRoZVxyXG4gKiA8Y29kZT5UcmlhbmdsZUN1bGxpbmcuUE9TSVRJVkU8L2NvZGU+IGFsZ29yaXRobSBpcyB1c2VkLCB0cmlhbmdsZXMgd2l0aFxyXG4gKiBwb3NpdGl2ZSBub3JtYWxzIGFyZSBub3QgcmVuZGVyZWQuIEFub3RoZXIgdGVybSBmb3IgdGhpcyBpcyBiYWNrZmFjZVxyXG4gKiBjdWxsaW5nLiA8L3A+XHJcbiAqXHJcbiAqIDxwPiBBIHRyaWFuZ2xlIHdob3NlIHZlcnRpY2VzIGFyZSBhcnJhbmdlZCBpbiBhIGNvdW50ZXItY2xvY2t3aXNlIG9yZGVyIGhhc1xyXG4gKiBhIG5lZ2F0aXZlIG5vcm1hbCB2YWx1ZS4gVGhhdCBpcywgaXRzIG5vcm1hbCBwb2ludHMgaW4gYSBuZWdhdGl2ZSB6LWF4aXNcclxuICogZGlyZWN0aW9uLCB0b3dhcmQgdGhlIGN1cnJlbnQgdmlldyBwb2ludC4gV2hlbiB0aGVcclxuICogPGNvZGU+VHJpYW5nbGVDdWxsaW5nLk5FR0FUSVZFPC9jb2RlPiBhbGdvcml0aG0gaXMgdXNlZCwgdHJpYW5nbGVzIHdpdGhcclxuICogbmVnYXRpdmUgbm9ybWFscyB3aWxsIG5vdCBiZSByZW5kZXJlZC4gPC9wPlxyXG4gKi9cclxuY2xhc3MgVHJpYW5nbGVDdWxsaW5nXHJcbntcclxuXHQvKipcclxuXHQgKiBTcGVjaWZpZXMgY3VsbGluZyBvZiBhbGwgdHJpYW5nbGVzIGZhY2luZyB0b3dhcmQgdGhlIGN1cnJlbnQgdmlldyBwb2ludC5cclxuXHQgKi9cclxuXHRwdWJsaWMgc3RhdGljIE5FR0FUSVZFOnN0cmluZyA9IFwibmVnYXRpdmVcIjtcclxuXHJcblx0LyoqXHJcblx0ICogU3BlY2lmaWVzIG5vIGN1bGxpbmcuIEFsbCB0cmlhbmdsZXMgaW4gdGhlIHBhdGggYXJlIHJlbmRlcmVkLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzdGF0aWMgTk9ORTpzdHJpbmcgPSBcIm5vbmVcIjtcclxuXHJcblx0LyoqXHJcblx0ICogU3BlY2lmaWVzIGN1bGxpbmcgb2YgYWxsIHRyaWFuZ2xlcyBmYWNpbmcgYXdheSBmcm9tIHRoZSBjdXJyZW50IHZpZXdcclxuXHQgKiBwb2ludC4gVGhpcyBpcyBhbHNvIGtub3duIGFzIGJhY2tmYWNlIGN1bGxpbmcuXHJcblx0ICovXHJcblx0cHVibGljIHN0YXRpYyBQT1NJVElWRTpzdHJpbmcgPSBcInBvc2l0aXZlXCI7XHJcbn1cclxuXHJcbmV4cG9ydCA9IFRyaWFuZ2xlQ3VsbGluZzsiXX0=