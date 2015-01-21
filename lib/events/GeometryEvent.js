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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9ldmVudHMvR2VvbWV0cnlFdmVudC50cyJdLCJuYW1lcyI6WyJHZW9tZXRyeUV2ZW50IiwiR2VvbWV0cnlFdmVudC5jb25zdHJ1Y3RvciIsIkdlb21ldHJ5RXZlbnQuc3ViR2VvbWV0cnkiLCJHZW9tZXRyeUV2ZW50LmNsb25lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFPLEtBQUssV0FBZSw4QkFBOEIsQ0FBQyxDQUFDO0FBSTNELEFBTUE7Ozs7O0VBREU7SUFDSSxhQUFhO0lBQVNBLFVBQXRCQSxhQUFhQSxVQUFjQTtJQWdCaENBOzs7O09BSUdBO0lBQ0hBLFNBckJLQSxhQUFhQSxDQXFCTkEsSUFBV0EsRUFBRUEsV0FBa0NBO1FBQWxDQywyQkFBa0NBLEdBQWxDQSxrQkFBa0NBO1FBRTFEQSxrQkFBTUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUFFWkEsSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsV0FBV0EsQ0FBQ0E7SUFDakNBLENBQUNBO0lBS0RELHNCQUFXQSxzQ0FBV0E7UUFIdEJBOztXQUVHQTthQUNIQTtZQUVDRSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQTtRQUMxQkEsQ0FBQ0E7OztPQUFBRjtJQUVEQTs7O09BR0dBO0lBQ0lBLDZCQUFLQSxHQUFaQTtRQUVDRyxNQUFNQSxDQUFDQSxJQUFJQSxhQUFhQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxFQUFFQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQTtJQUN4REEsQ0FBQ0E7SUF6Q0RIOztPQUVHQTtJQUNXQSxnQ0FBa0JBLEdBQVVBLGtCQUFrQkEsQ0FBQ0E7SUFFN0RBOztPQUVHQTtJQUNXQSxrQ0FBb0JBLEdBQVVBLG9CQUFvQkEsQ0FBQ0E7SUFFbkRBLDRCQUFjQSxHQUFVQSxlQUFlQSxDQUFDQTtJQWdDdkRBLG9CQUFDQTtBQUFEQSxDQTVDQSxBQTRDQ0EsRUE1QzJCLEtBQUssRUE0Q2hDO0FBRUQsQUFBdUIsaUJBQWQsYUFBYSxDQUFDIiwiZmlsZSI6ImV2ZW50cy9HZW9tZXRyeUV2ZW50LmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFdmVudFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0V2ZW50XCIpO1xuXG5pbXBvcnQgU3ViR2VvbWV0cnlCYXNlXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvU3ViR2VvbWV0cnlCYXNlXCIpO1xuXG4vKipcbiogRGlzcGF0Y2hlZCB0byBub3RpZnkgY2hhbmdlcyBpbiBhIGdlb21ldHJ5IG9iamVjdCdzIHN0YXRlLlxuKlxuKiBAY2xhc3MgYXdheS5ldmVudHMuR2VvbWV0cnlFdmVudFxuKiBAc2VlIGF3YXkzZC5jb3JlLmJhc2UuR2VvbWV0cnlcbiovXG5jbGFzcyBHZW9tZXRyeUV2ZW50IGV4dGVuZHMgRXZlbnRcbntcblx0LyoqXG5cdCAqIERpc3BhdGNoZWQgd2hlbiBhIFRyaWFuZ2xlU3ViR2VvbWV0cnkgd2FzIGFkZGVkIHRvIHRoZSBkaXNwYXRjaGluZyBHZW9tZXRyeS5cblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgU1VCX0dFT01FVFJZX0FEREVEOnN0cmluZyA9IFwiU3ViR2VvbWV0cnlBZGRlZFwiO1xuXG5cdC8qKlxuXHQgKiBEaXNwYXRjaGVkIHdoZW4gYSBUcmlhbmdsZVN1Ykdlb21ldHJ5IHdhcyByZW1vdmVkIGZyb20gdGhlIGRpc3BhdGNoaW5nIEdlb21ldHJ5LlxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBTVUJfR0VPTUVUUllfUkVNT1ZFRDpzdHJpbmcgPSBcIlN1Ykdlb21ldHJ5UmVtb3ZlZFwiO1xuXG5cdHB1YmxpYyBzdGF0aWMgQk9VTkRTX0lOVkFMSUQ6c3RyaW5nID0gXCJCb3VuZHNJbnZhbGlkXCI7XG5cblx0cHJpdmF0ZSBfc3ViR2VvbWV0cnk6U3ViR2VvbWV0cnlCYXNlO1xuXG5cdC8qKlxuXHQgKiBDcmVhdGUgYSBuZXcgR2VvbWV0cnlFdmVudFxuXHQgKiBAcGFyYW0gdHlwZSBUaGUgZXZlbnQgdHlwZS5cblx0ICogQHBhcmFtIHN1Ykdlb21ldHJ5IEFuIG9wdGlvbmFsIFRyaWFuZ2xlU3ViR2VvbWV0cnkgb2JqZWN0IHRoYXQgaXMgdGhlIHN1YmplY3Qgb2YgdGhpcyBldmVudC5cblx0ICovXG5cdGNvbnN0cnVjdG9yKHR5cGU6c3RyaW5nLCBzdWJHZW9tZXRyeTpTdWJHZW9tZXRyeUJhc2UgPSBudWxsKVxuXHR7XG5cdFx0c3VwZXIodHlwZSk7XG5cblx0XHR0aGlzLl9zdWJHZW9tZXRyeSA9IHN1Ykdlb21ldHJ5O1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBUcmlhbmdsZVN1Ykdlb21ldHJ5IG9iamVjdCB0aGF0IGlzIHRoZSBzdWJqZWN0IG9mIHRoaXMgZXZlbnQsIGlmIGFwcHJvcHJpYXRlLlxuXHQgKi9cblx0cHVibGljIGdldCBzdWJHZW9tZXRyeSgpOlN1Ykdlb21ldHJ5QmFzZVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3N1Ykdlb21ldHJ5O1xuXHR9XG5cblx0LyoqXG5cdCAqIENsb25lcyB0aGUgZXZlbnQuXG5cdCAqIEByZXR1cm4gQW4gZXhhY3QgZHVwbGljYXRlIG9mIHRoZSBjdXJyZW50IG9iamVjdC5cblx0ICovXG5cdHB1YmxpYyBjbG9uZSgpOkV2ZW50XG5cdHtcblx0XHRyZXR1cm4gbmV3IEdlb21ldHJ5RXZlbnQodGhpcy50eXBlLCB0aGlzLl9zdWJHZW9tZXRyeSk7XG5cdH1cbn1cblxuZXhwb3J0ID0gR2VvbWV0cnlFdmVudDsiXX0=