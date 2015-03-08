var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var DisplayObject = require("awayjs-display/lib/base/DisplayObject");
/**
 * This class is used to create lightweight shapes using the ActionScript
 * drawing application program interface(API). The Shape class includes a
 * <code>graphics</code> property, which lets you access methods from the
 * Graphics class.
 *
 * <p>The Sprite class also includes a <code>graphics</code>property, and it
 * includes other features not available to the Shape class. For example, a
 * Sprite object is a display object container, whereas a Shape object is not
 * (and cannot contain child display objects). For this reason, Shape objects
 * consume less memory than Sprite objects that contain the same graphics.
 * However, a Sprite object supports user input events, while a Shape object
 * does not.</p>
 */
var Shape = (function (_super) {
    __extends(Shape, _super);
    /**
     * Creates a new Shape object.
     */
    function Shape() {
        _super.call(this);
    }
    Object.defineProperty(Shape.prototype, "graphics", {
        /**
         * Specifies the Graphics object belonging to this Shape object, where vector
         * drawing commands can occur.
         */
        get: function () {
            return this._graphics;
        },
        enumerable: true,
        configurable: true
    });
    return Shape;
})(DisplayObject);
module.exports = Shape;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9TaGFwZS50cyJdLCJuYW1lcyI6WyJTaGFwZSIsIlNoYXBlLmNvbnN0cnVjdG9yIiwiU2hhcGUuZ3JhcGhpY3MiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQU8sYUFBYSxXQUFjLHVDQUF1QyxDQUFDLENBQUM7QUFHM0UsQUFjQTs7Ozs7Ozs7Ozs7OztHQURHO0lBQ0csS0FBSztJQUFTQSxVQUFkQSxLQUFLQSxVQUFzQkE7SUFhaENBOztPQUVHQTtJQUNIQSxTQWhCS0EsS0FBS0E7UUFrQlRDLGlCQUFPQSxDQUFDQTtJQUNUQSxDQUFDQTtJQVhERCxzQkFBSUEsMkJBQVFBO1FBSlpBOzs7V0FHR0E7YUFDSEE7WUFFQ0UsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0E7UUFDdkJBLENBQUNBOzs7T0FBQUY7SUFTRkEsWUFBQ0E7QUFBREEsQ0FwQkEsQUFvQkNBLEVBcEJtQixhQUFhLEVBb0JoQztBQUVELEFBQWUsaUJBQU4sS0FBSyxDQUFDIiwiZmlsZSI6ImVudGl0aWVzL1NoYXBlLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEaXNwbGF5T2JqZWN0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9EaXNwbGF5T2JqZWN0XCIpO1xuaW1wb3J0IEdyYXBoaWNzXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2dyYXBoaWNzL0dyYXBoaWNzXCIpO1xuXG4vKipcbiAqIFRoaXMgY2xhc3MgaXMgdXNlZCB0byBjcmVhdGUgbGlnaHR3ZWlnaHQgc2hhcGVzIHVzaW5nIHRoZSBBY3Rpb25TY3JpcHRcbiAqIGRyYXdpbmcgYXBwbGljYXRpb24gcHJvZ3JhbSBpbnRlcmZhY2UoQVBJKS4gVGhlIFNoYXBlIGNsYXNzIGluY2x1ZGVzIGFcbiAqIDxjb2RlPmdyYXBoaWNzPC9jb2RlPiBwcm9wZXJ0eSwgd2hpY2ggbGV0cyB5b3UgYWNjZXNzIG1ldGhvZHMgZnJvbSB0aGVcbiAqIEdyYXBoaWNzIGNsYXNzLlxuICpcbiAqIDxwPlRoZSBTcHJpdGUgY2xhc3MgYWxzbyBpbmNsdWRlcyBhIDxjb2RlPmdyYXBoaWNzPC9jb2RlPnByb3BlcnR5LCBhbmQgaXRcbiAqIGluY2x1ZGVzIG90aGVyIGZlYXR1cmVzIG5vdCBhdmFpbGFibGUgdG8gdGhlIFNoYXBlIGNsYXNzLiBGb3IgZXhhbXBsZSwgYVxuICogU3ByaXRlIG9iamVjdCBpcyBhIGRpc3BsYXkgb2JqZWN0IGNvbnRhaW5lciwgd2hlcmVhcyBhIFNoYXBlIG9iamVjdCBpcyBub3RcbiAqIChhbmQgY2Fubm90IGNvbnRhaW4gY2hpbGQgZGlzcGxheSBvYmplY3RzKS4gRm9yIHRoaXMgcmVhc29uLCBTaGFwZSBvYmplY3RzXG4gKiBjb25zdW1lIGxlc3MgbWVtb3J5IHRoYW4gU3ByaXRlIG9iamVjdHMgdGhhdCBjb250YWluIHRoZSBzYW1lIGdyYXBoaWNzLlxuICogSG93ZXZlciwgYSBTcHJpdGUgb2JqZWN0IHN1cHBvcnRzIHVzZXIgaW5wdXQgZXZlbnRzLCB3aGlsZSBhIFNoYXBlIG9iamVjdFxuICogZG9lcyBub3QuPC9wPlxuICovXG5jbGFzcyBTaGFwZSBleHRlbmRzIERpc3BsYXlPYmplY3Rcbntcblx0cHJpdmF0ZSBfZ3JhcGhpY3M6R3JhcGhpY3M7XG5cblx0LyoqXG5cdCAqIFNwZWNpZmllcyB0aGUgR3JhcGhpY3Mgb2JqZWN0IGJlbG9uZ2luZyB0byB0aGlzIFNoYXBlIG9iamVjdCwgd2hlcmUgdmVjdG9yXG5cdCAqIGRyYXdpbmcgY29tbWFuZHMgY2FuIG9jY3VyLlxuXHQgKi9cblx0Z2V0IGdyYXBoaWNzKCk6R3JhcGhpY3Ncblx0e1xuXHRcdHJldHVybiB0aGlzLl9ncmFwaGljcztcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGEgbmV3IFNoYXBlIG9iamVjdC5cblx0ICovXG5cdGNvbnN0cnVjdG9yKClcblx0e1xuXHRcdHN1cGVyKCk7XG5cdH1cbn1cblxuZXhwb3J0ID0gU2hhcGU7Il19