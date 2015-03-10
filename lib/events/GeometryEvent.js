var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Event = require("awayjs-core/lib/events/Event");
/**
* Dispatched to notify changes in a geometry object's state.
*
* @class away.events.GeometryEvent
* @see away3d.core.base.Geometry
*/
var GeometryEvent = (function (_super) {
    __extends(GeometryEvent, _super);
    /**
     * Create a new GeometryEvent
     * @param type The event type.
     * @param subGeometry An optional TriangleSubGeometry object that is the subject of this event.
     */
    function GeometryEvent(type, subGeometry) {
        if (subGeometry === void 0) { subGeometry = null; }
        _super.call(this, type);
        this._subGeometry = subGeometry;
    }
    Object.defineProperty(GeometryEvent.prototype, "subGeometry", {
        /**
         * The TriangleSubGeometry object that is the subject of this event, if appropriate.
         */
        get: function () {
            return this._subGeometry;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Clones the event.
     * @return An exact duplicate of the current object.
     */
    GeometryEvent.prototype.clone = function () {
        return new GeometryEvent(this.type, this._subGeometry);
    };
    /**
     * Dispatched when a TriangleSubGeometry was added to the dispatching Geometry.
     */
    GeometryEvent.SUB_GEOMETRY_ADDED = "SubGeometryAdded";
    /**
     * Dispatched when a TriangleSubGeometry was removed from the dispatching Geometry.
     */
    GeometryEvent.SUB_GEOMETRY_REMOVED = "SubGeometryRemoved";
    GeometryEvent.BOUNDS_INVALID = "BoundsInvalid";
    return GeometryEvent;
})(Event);
module.exports = GeometryEvent;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9ldmVudHMvR2VvbWV0cnlFdmVudC50cyJdLCJuYW1lcyI6WyJHZW9tZXRyeUV2ZW50IiwiR2VvbWV0cnlFdmVudC5jb25zdHJ1Y3RvciIsIkdlb21ldHJ5RXZlbnQuc3ViR2VvbWV0cnkiLCJHZW9tZXRyeUV2ZW50LmNsb25lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFPLEtBQUssV0FBZSw4QkFBOEIsQ0FBQyxDQUFDO0FBSTNELEFBTUE7Ozs7O0VBREU7SUFDSSxhQUFhO0lBQVNBLFVBQXRCQSxhQUFhQSxVQUFjQTtJQWdCaENBOzs7O09BSUdBO0lBQ0hBLFNBckJLQSxhQUFhQSxDQXFCTkEsSUFBV0EsRUFBRUEsV0FBa0NBO1FBQWxDQywyQkFBa0NBLEdBQWxDQSxrQkFBa0NBO1FBRTFEQSxrQkFBTUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUFFWkEsSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsV0FBV0EsQ0FBQ0E7SUFDakNBLENBQUNBO0lBS0RELHNCQUFXQSxzQ0FBV0E7UUFIdEJBOztXQUVHQTthQUNIQTtZQUVDRSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQTtRQUMxQkEsQ0FBQ0E7OztPQUFBRjtJQUVEQTs7O09BR0dBO0lBQ0lBLDZCQUFLQSxHQUFaQTtRQUVDRyxNQUFNQSxDQUFDQSxJQUFJQSxhQUFhQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxFQUFFQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQTtJQUN4REEsQ0FBQ0E7SUF6Q0RIOztPQUVHQTtJQUNXQSxnQ0FBa0JBLEdBQVVBLGtCQUFrQkEsQ0FBQ0E7SUFFN0RBOztPQUVHQTtJQUNXQSxrQ0FBb0JBLEdBQVVBLG9CQUFvQkEsQ0FBQ0E7SUFFbkRBLDRCQUFjQSxHQUFVQSxlQUFlQSxDQUFDQTtJQWdDdkRBLG9CQUFDQTtBQUFEQSxDQTVDQSxBQTRDQ0EsRUE1QzJCLEtBQUssRUE0Q2hDO0FBRUQsQUFBdUIsaUJBQWQsYUFBYSxDQUFDIiwiZmlsZSI6ImV2ZW50cy9HZW9tZXRyeUV2ZW50LmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFdmVudFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0V2ZW50XCIpO1xyXG5cclxuaW1wb3J0IFN1Ykdlb21ldHJ5QmFzZVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL1N1Ykdlb21ldHJ5QmFzZVwiKTtcclxuXHJcbi8qKlxyXG4qIERpc3BhdGNoZWQgdG8gbm90aWZ5IGNoYW5nZXMgaW4gYSBnZW9tZXRyeSBvYmplY3QncyBzdGF0ZS5cclxuKlxyXG4qIEBjbGFzcyBhd2F5LmV2ZW50cy5HZW9tZXRyeUV2ZW50XHJcbiogQHNlZSBhd2F5M2QuY29yZS5iYXNlLkdlb21ldHJ5XHJcbiovXHJcbmNsYXNzIEdlb21ldHJ5RXZlbnQgZXh0ZW5kcyBFdmVudFxyXG57XHJcblx0LyoqXHJcblx0ICogRGlzcGF0Y2hlZCB3aGVuIGEgVHJpYW5nbGVTdWJHZW9tZXRyeSB3YXMgYWRkZWQgdG8gdGhlIGRpc3BhdGNoaW5nIEdlb21ldHJ5LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzdGF0aWMgU1VCX0dFT01FVFJZX0FEREVEOnN0cmluZyA9IFwiU3ViR2VvbWV0cnlBZGRlZFwiO1xyXG5cclxuXHQvKipcclxuXHQgKiBEaXNwYXRjaGVkIHdoZW4gYSBUcmlhbmdsZVN1Ykdlb21ldHJ5IHdhcyByZW1vdmVkIGZyb20gdGhlIGRpc3BhdGNoaW5nIEdlb21ldHJ5LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzdGF0aWMgU1VCX0dFT01FVFJZX1JFTU9WRUQ6c3RyaW5nID0gXCJTdWJHZW9tZXRyeVJlbW92ZWRcIjtcclxuXHJcblx0cHVibGljIHN0YXRpYyBCT1VORFNfSU5WQUxJRDpzdHJpbmcgPSBcIkJvdW5kc0ludmFsaWRcIjtcclxuXHJcblx0cHJpdmF0ZSBfc3ViR2VvbWV0cnk6U3ViR2VvbWV0cnlCYXNlO1xyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGUgYSBuZXcgR2VvbWV0cnlFdmVudFxyXG5cdCAqIEBwYXJhbSB0eXBlIFRoZSBldmVudCB0eXBlLlxyXG5cdCAqIEBwYXJhbSBzdWJHZW9tZXRyeSBBbiBvcHRpb25hbCBUcmlhbmdsZVN1Ykdlb21ldHJ5IG9iamVjdCB0aGF0IGlzIHRoZSBzdWJqZWN0IG9mIHRoaXMgZXZlbnQuXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IodHlwZTpzdHJpbmcsIHN1Ykdlb21ldHJ5OlN1Ykdlb21ldHJ5QmFzZSA9IG51bGwpXHJcblx0e1xyXG5cdFx0c3VwZXIodHlwZSk7XHJcblxyXG5cdFx0dGhpcy5fc3ViR2VvbWV0cnkgPSBzdWJHZW9tZXRyeTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBUcmlhbmdsZVN1Ykdlb21ldHJ5IG9iamVjdCB0aGF0IGlzIHRoZSBzdWJqZWN0IG9mIHRoaXMgZXZlbnQsIGlmIGFwcHJvcHJpYXRlLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgc3ViR2VvbWV0cnkoKTpTdWJHZW9tZXRyeUJhc2VcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fc3ViR2VvbWV0cnk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDbG9uZXMgdGhlIGV2ZW50LlxyXG5cdCAqIEByZXR1cm4gQW4gZXhhY3QgZHVwbGljYXRlIG9mIHRoZSBjdXJyZW50IG9iamVjdC5cclxuXHQgKi9cclxuXHRwdWJsaWMgY2xvbmUoKTpFdmVudFxyXG5cdHtcclxuXHRcdHJldHVybiBuZXcgR2VvbWV0cnlFdmVudCh0aGlzLnR5cGUsIHRoaXMuX3N1Ykdlb21ldHJ5KTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCA9IEdlb21ldHJ5RXZlbnQ7Il19