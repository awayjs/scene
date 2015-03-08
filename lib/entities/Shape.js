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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9TaGFwZS50cyJdLCJuYW1lcyI6WyJTaGFwZSIsIlNoYXBlLmNvbnN0cnVjdG9yIiwiU2hhcGUuZ3JhcGhpY3MiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQU8sYUFBYSxXQUFjLHVDQUF1QyxDQUFDLENBQUM7QUFHM0UsQUFjQTs7Ozs7Ozs7Ozs7OztHQURHO0lBQ0csS0FBSztJQUFTQSxVQUFkQSxLQUFLQSxVQUFzQkE7SUFhaENBOztPQUVHQTtJQUNIQSxTQWhCS0EsS0FBS0E7UUFrQlRDLGlCQUFPQSxDQUFDQTtJQUNUQSxDQUFDQTtJQVhERCxzQkFBSUEsMkJBQVFBO1FBSlpBOzs7V0FHR0E7YUFDSEE7WUFFQ0UsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0E7UUFDdkJBLENBQUNBOzs7T0FBQUY7SUFTRkEsWUFBQ0E7QUFBREEsQ0FwQkEsQUFvQkNBLEVBcEJtQixhQUFhLEVBb0JoQztBQUVELEFBQWUsaUJBQU4sS0FBSyxDQUFDIiwiZmlsZSI6ImVudGl0aWVzL1NoYXBlLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEaXNwbGF5T2JqZWN0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9EaXNwbGF5T2JqZWN0XCIpO1xuaW1wb3J0IEdyYXBoaWNzXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2RyYXcvR3JhcGhpY3NcIik7XG5cbi8qKlxuICogVGhpcyBjbGFzcyBpcyB1c2VkIHRvIGNyZWF0ZSBsaWdodHdlaWdodCBzaGFwZXMgdXNpbmcgdGhlIEFjdGlvblNjcmlwdFxuICogZHJhd2luZyBhcHBsaWNhdGlvbiBwcm9ncmFtIGludGVyZmFjZShBUEkpLiBUaGUgU2hhcGUgY2xhc3MgaW5jbHVkZXMgYVxuICogPGNvZGU+Z3JhcGhpY3M8L2NvZGU+IHByb3BlcnR5LCB3aGljaCBsZXRzIHlvdSBhY2Nlc3MgbWV0aG9kcyBmcm9tIHRoZVxuICogR3JhcGhpY3MgY2xhc3MuXG4gKlxuICogPHA+VGhlIFNwcml0ZSBjbGFzcyBhbHNvIGluY2x1ZGVzIGEgPGNvZGU+Z3JhcGhpY3M8L2NvZGU+cHJvcGVydHksIGFuZCBpdFxuICogaW5jbHVkZXMgb3RoZXIgZmVhdHVyZXMgbm90IGF2YWlsYWJsZSB0byB0aGUgU2hhcGUgY2xhc3MuIEZvciBleGFtcGxlLCBhXG4gKiBTcHJpdGUgb2JqZWN0IGlzIGEgZGlzcGxheSBvYmplY3QgY29udGFpbmVyLCB3aGVyZWFzIGEgU2hhcGUgb2JqZWN0IGlzIG5vdFxuICogKGFuZCBjYW5ub3QgY29udGFpbiBjaGlsZCBkaXNwbGF5IG9iamVjdHMpLiBGb3IgdGhpcyByZWFzb24sIFNoYXBlIG9iamVjdHNcbiAqIGNvbnN1bWUgbGVzcyBtZW1vcnkgdGhhbiBTcHJpdGUgb2JqZWN0cyB0aGF0IGNvbnRhaW4gdGhlIHNhbWUgZ3JhcGhpY3MuXG4gKiBIb3dldmVyLCBhIFNwcml0ZSBvYmplY3Qgc3VwcG9ydHMgdXNlciBpbnB1dCBldmVudHMsIHdoaWxlIGEgU2hhcGUgb2JqZWN0XG4gKiBkb2VzIG5vdC48L3A+XG4gKi9cbmNsYXNzIFNoYXBlIGV4dGVuZHMgRGlzcGxheU9iamVjdFxue1xuXHRwcml2YXRlIF9ncmFwaGljczpHcmFwaGljcztcblxuXHQvKipcblx0ICogU3BlY2lmaWVzIHRoZSBHcmFwaGljcyBvYmplY3QgYmVsb25naW5nIHRvIHRoaXMgU2hhcGUgb2JqZWN0LCB3aGVyZSB2ZWN0b3Jcblx0ICogZHJhd2luZyBjb21tYW5kcyBjYW4gb2NjdXIuXG5cdCAqL1xuXHRnZXQgZ3JhcGhpY3MoKTpHcmFwaGljc1xuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2dyYXBoaWNzO1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBuZXcgU2hhcGUgb2JqZWN0LlxuXHQgKi9cblx0Y29uc3RydWN0b3IoKVxuXHR7XG5cdFx0c3VwZXIoKTtcblx0fVxufVxuXG5leHBvcnQgPSBTaGFwZTsiXX0=