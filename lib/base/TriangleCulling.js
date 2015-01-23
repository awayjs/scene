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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL3RyaWFuZ2xlY3VsbGluZy50cyJdLCJuYW1lcyI6WyJUcmlhbmdsZUN1bGxpbmciLCJUcmlhbmdsZUN1bGxpbmcuY29uc3RydWN0b3IiXSwibWFwcGluZ3MiOiJBQUFBLEFBcUJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQURHO0lBQ0csZUFBZTtJQUFyQkEsU0FBTUEsZUFBZUE7SUFpQnJCQyxDQUFDQTtJQWZBRDs7T0FFR0E7SUFDV0Esd0JBQVFBLEdBQVVBLFVBQVVBLENBQUNBO0lBRTNDQTs7T0FFR0E7SUFDV0Esb0JBQUlBLEdBQVVBLE1BQU1BLENBQUNBO0lBRW5DQTs7O09BR0dBO0lBQ1dBLHdCQUFRQSxHQUFVQSxVQUFVQSxDQUFDQTtJQUM1Q0Esc0JBQUNBO0FBQURBLENBakJBLEFBaUJDQSxJQUFBO0FBRUQsQUFBeUIsaUJBQWhCLGVBQWUsQ0FBQyIsImZpbGUiOiJiYXNlL1RyaWFuZ2xlQ3VsbGluZy5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIERlZmluZXMgY29kZXMgZm9yIGN1bGxpbmcgYWxnb3JpdGhtcyB0aGF0IGRldGVybWluZSB3aGljaCB0cmlhbmdsZXMgbm90IHRvXG4gKiByZW5kZXIgd2hlbiBkcmF3aW5nIHRyaWFuZ2xlIHBhdGhzLlxuICpcbiAqIDxwPiBUaGUgdGVybXMgPGNvZGU+UE9TSVRJVkU8L2NvZGU+IGFuZCA8Y29kZT5ORUdBVElWRTwvY29kZT4gcmVmZXIgdG8gdGhlXG4gKiBzaWduIG9mIGEgdHJpYW5nbGUncyBub3JtYWwgYWxvbmcgdGhlIHotYXhpcy4gVGhlIG5vcm1hbCBpcyBhIDNEIHZlY3RvclxuICogdGhhdCBpcyBwZXJwZW5kaWN1bGFyIHRvIHRoZSBzdXJmYWNlIG9mIHRoZSB0cmlhbmdsZS4gPC9wPlxuICpcbiAqIDxwPiBBIHRyaWFuZ2xlIHdob3NlIHZlcnRpY2VzIDAsIDEsIGFuZCAyIGFyZSBhcnJhbmdlZCBpbiBhIGNsb2Nrd2lzZSBvcmRlclxuICogaGFzIGEgcG9zaXRpdmUgbm9ybWFsIHZhbHVlLiBUaGF0IGlzLCBpdHMgbm9ybWFsIHBvaW50cyBpbiBhIHBvc2l0aXZlXG4gKiB6LWF4aXMgZGlyZWN0aW9uLCBhd2F5IGZyb20gdGhlIGN1cnJlbnQgdmlldyBwb2ludC4gV2hlbiB0aGVcbiAqIDxjb2RlPlRyaWFuZ2xlQ3VsbGluZy5QT1NJVElWRTwvY29kZT4gYWxnb3JpdGhtIGlzIHVzZWQsIHRyaWFuZ2xlcyB3aXRoXG4gKiBwb3NpdGl2ZSBub3JtYWxzIGFyZSBub3QgcmVuZGVyZWQuIEFub3RoZXIgdGVybSBmb3IgdGhpcyBpcyBiYWNrZmFjZVxuICogY3VsbGluZy4gPC9wPlxuICpcbiAqIDxwPiBBIHRyaWFuZ2xlIHdob3NlIHZlcnRpY2VzIGFyZSBhcnJhbmdlZCBpbiBhIGNvdW50ZXItY2xvY2t3aXNlIG9yZGVyIGhhc1xuICogYSBuZWdhdGl2ZSBub3JtYWwgdmFsdWUuIFRoYXQgaXMsIGl0cyBub3JtYWwgcG9pbnRzIGluIGEgbmVnYXRpdmUgei1heGlzXG4gKiBkaXJlY3Rpb24sIHRvd2FyZCB0aGUgY3VycmVudCB2aWV3IHBvaW50LiBXaGVuIHRoZVxuICogPGNvZGU+VHJpYW5nbGVDdWxsaW5nLk5FR0FUSVZFPC9jb2RlPiBhbGdvcml0aG0gaXMgdXNlZCwgdHJpYW5nbGVzIHdpdGhcbiAqIG5lZ2F0aXZlIG5vcm1hbHMgd2lsbCBub3QgYmUgcmVuZGVyZWQuIDwvcD5cbiAqL1xuY2xhc3MgVHJpYW5nbGVDdWxsaW5nXG57XG5cdC8qKlxuXHQgKiBTcGVjaWZpZXMgY3VsbGluZyBvZiBhbGwgdHJpYW5nbGVzIGZhY2luZyB0b3dhcmQgdGhlIGN1cnJlbnQgdmlldyBwb2ludC5cblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgTkVHQVRJVkU6c3RyaW5nID0gXCJuZWdhdGl2ZVwiO1xuXG5cdC8qKlxuXHQgKiBTcGVjaWZpZXMgbm8gY3VsbGluZy4gQWxsIHRyaWFuZ2xlcyBpbiB0aGUgcGF0aCBhcmUgcmVuZGVyZWQuXG5cdCAqL1xuXHRwdWJsaWMgc3RhdGljIE5PTkU6c3RyaW5nID0gXCJub25lXCI7XG5cblx0LyoqXG5cdCAqIFNwZWNpZmllcyBjdWxsaW5nIG9mIGFsbCB0cmlhbmdsZXMgZmFjaW5nIGF3YXkgZnJvbSB0aGUgY3VycmVudCB2aWV3XG5cdCAqIHBvaW50LiBUaGlzIGlzIGFsc28ga25vd24gYXMgYmFja2ZhY2UgY3VsbGluZy5cblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgUE9TSVRJVkU6c3RyaW5nID0gXCJwb3NpdGl2ZVwiO1xufVxuXG5leHBvcnQgPSBUcmlhbmdsZUN1bGxpbmc7Il19