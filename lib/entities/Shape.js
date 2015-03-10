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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9TaGFwZS50cyJdLCJuYW1lcyI6WyJTaGFwZSIsIlNoYXBlLmNvbnN0cnVjdG9yIiwiU2hhcGUuZ3JhcGhpY3MiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQU8sYUFBYSxXQUFjLHVDQUF1QyxDQUFDLENBQUM7QUFHM0UsQUFjQTs7Ozs7Ozs7Ozs7OztHQURHO0lBQ0csS0FBSztJQUFTQSxVQUFkQSxLQUFLQSxVQUFzQkE7SUFhaENBOztPQUVHQTtJQUNIQSxTQWhCS0EsS0FBS0E7UUFrQlRDLGlCQUFPQSxDQUFDQTtJQUNUQSxDQUFDQTtJQVhERCxzQkFBSUEsMkJBQVFBO1FBSlpBOzs7V0FHR0E7YUFDSEE7WUFFQ0UsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0E7UUFDdkJBLENBQUNBOzs7T0FBQUY7SUFTRkEsWUFBQ0E7QUFBREEsQ0FwQkEsQUFvQkNBLEVBcEJtQixhQUFhLEVBb0JoQztBQUVELEFBQWUsaUJBQU4sS0FBSyxDQUFDIiwiZmlsZSI6ImVudGl0aWVzL1NoYXBlLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEaXNwbGF5T2JqZWN0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9EaXNwbGF5T2JqZWN0XCIpO1xyXG5pbXBvcnQgR3JhcGhpY3NcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZHJhdy9HcmFwaGljc1wiKTtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNsYXNzIGlzIHVzZWQgdG8gY3JlYXRlIGxpZ2h0d2VpZ2h0IHNoYXBlcyB1c2luZyB0aGUgQWN0aW9uU2NyaXB0XHJcbiAqIGRyYXdpbmcgYXBwbGljYXRpb24gcHJvZ3JhbSBpbnRlcmZhY2UoQVBJKS4gVGhlIFNoYXBlIGNsYXNzIGluY2x1ZGVzIGFcclxuICogPGNvZGU+Z3JhcGhpY3M8L2NvZGU+IHByb3BlcnR5LCB3aGljaCBsZXRzIHlvdSBhY2Nlc3MgbWV0aG9kcyBmcm9tIHRoZVxyXG4gKiBHcmFwaGljcyBjbGFzcy5cclxuICpcclxuICogPHA+VGhlIFNwcml0ZSBjbGFzcyBhbHNvIGluY2x1ZGVzIGEgPGNvZGU+Z3JhcGhpY3M8L2NvZGU+cHJvcGVydHksIGFuZCBpdFxyXG4gKiBpbmNsdWRlcyBvdGhlciBmZWF0dXJlcyBub3QgYXZhaWxhYmxlIHRvIHRoZSBTaGFwZSBjbGFzcy4gRm9yIGV4YW1wbGUsIGFcclxuICogU3ByaXRlIG9iamVjdCBpcyBhIGRpc3BsYXkgb2JqZWN0IGNvbnRhaW5lciwgd2hlcmVhcyBhIFNoYXBlIG9iamVjdCBpcyBub3RcclxuICogKGFuZCBjYW5ub3QgY29udGFpbiBjaGlsZCBkaXNwbGF5IG9iamVjdHMpLiBGb3IgdGhpcyByZWFzb24sIFNoYXBlIG9iamVjdHNcclxuICogY29uc3VtZSBsZXNzIG1lbW9yeSB0aGFuIFNwcml0ZSBvYmplY3RzIHRoYXQgY29udGFpbiB0aGUgc2FtZSBncmFwaGljcy5cclxuICogSG93ZXZlciwgYSBTcHJpdGUgb2JqZWN0IHN1cHBvcnRzIHVzZXIgaW5wdXQgZXZlbnRzLCB3aGlsZSBhIFNoYXBlIG9iamVjdFxyXG4gKiBkb2VzIG5vdC48L3A+XHJcbiAqL1xyXG5jbGFzcyBTaGFwZSBleHRlbmRzIERpc3BsYXlPYmplY3Rcclxue1xyXG5cdHByaXZhdGUgX2dyYXBoaWNzOkdyYXBoaWNzO1xyXG5cclxuXHQvKipcclxuXHQgKiBTcGVjaWZpZXMgdGhlIEdyYXBoaWNzIG9iamVjdCBiZWxvbmdpbmcgdG8gdGhpcyBTaGFwZSBvYmplY3QsIHdoZXJlIHZlY3RvclxyXG5cdCAqIGRyYXdpbmcgY29tbWFuZHMgY2FuIG9jY3VyLlxyXG5cdCAqL1xyXG5cdGdldCBncmFwaGljcygpOkdyYXBoaWNzXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2dyYXBoaWNzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhIG5ldyBTaGFwZSBvYmplY3QuXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoKVxyXG5cdHtcclxuXHRcdHN1cGVyKCk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgPSBTaGFwZTsiXX0=