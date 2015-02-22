var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Event = require("awayjs-core/lib/events/Event");
/**
 * Dispatched to notify changes in a sub geometry object's state.
 *
 * @class away.events.RenderableOwnerEvent
 * @see away.core.base.Geometry
 */
var RenderableOwnerEvent = (function (_super) {
    __extends(RenderableOwnerEvent, _super);
    /**
     * Create a new GeometryEvent
     * @param type The event type.
     * @param dataType An optional data type of the vertex data being updated.
     */
    function RenderableOwnerEvent(type, renderObjectOwner) {
        _super.call(this, type);
        this._renderObjectOwner = renderObjectOwner;
    }
    Object.defineProperty(RenderableOwnerEvent.prototype, "renderObjectOwner", {
        /**
         * The renderobject owner of the renderable owner.
         */
        get: function () {
            return this._renderObjectOwner;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Clones the event.
     *
     * @return An exact duplicate of the current object.
     */
    RenderableOwnerEvent.prototype.clone = function () {
        return new RenderableOwnerEvent(this.type, this._renderObjectOwner);
    };
    /**
     * Dispatched when a Renderable owners's render object owner has been updated.
     */
    RenderableOwnerEvent.RENDER_OBJECT_OWNER_UPDATED = "renderObjectOwnerUpdated";
    return RenderableOwnerEvent;
})(Event);
module.exports = RenderableOwnerEvent;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9ldmVudHMvUmVuZGVyYWJsZU93bmVyRXZlbnQudHMiXSwibmFtZXMiOlsiUmVuZGVyYWJsZU93bmVyRXZlbnQiLCJSZW5kZXJhYmxlT3duZXJFdmVudC5jb25zdHJ1Y3RvciIsIlJlbmRlcmFibGVPd25lckV2ZW50LnJlbmRlck9iamVjdE93bmVyIiwiUmVuZGVyYWJsZU93bmVyRXZlbnQuY2xvbmUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQU8sS0FBSyxXQUFnQiw4QkFBOEIsQ0FBQyxDQUFDO0FBSTVELEFBTUE7Ozs7O0dBREc7SUFDRyxvQkFBb0I7SUFBU0EsVUFBN0JBLG9CQUFvQkEsVUFBY0E7SUFTdkNBOzs7O09BSUdBO0lBQ0hBLFNBZEtBLG9CQUFvQkEsQ0FjYkEsSUFBV0EsRUFBRUEsaUJBQW9DQTtRQUU1REMsa0JBQU1BLElBQUlBLENBQUNBLENBQUNBO1FBRVpBLElBQUlBLENBQUNBLGtCQUFrQkEsR0FBR0EsaUJBQWlCQSxDQUFDQTtJQUM3Q0EsQ0FBQ0E7SUFLREQsc0JBQVdBLG1EQUFpQkE7UUFINUJBOztXQUVHQTthQUNIQTtZQUVDRSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxrQkFBa0JBLENBQUNBO1FBQ2hDQSxDQUFDQTs7O09BQUFGO0lBRURBOzs7O09BSUdBO0lBQ0lBLG9DQUFLQSxHQUFaQTtRQUVDRyxNQUFNQSxDQUFDQSxJQUFJQSxvQkFBb0JBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLEVBQUVBLElBQUlBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsQ0FBQ0E7SUFDckVBLENBQUNBO0lBbkNESDs7T0FFR0E7SUFDV0EsZ0RBQTJCQSxHQUFVQSwwQkFBMEJBLENBQUNBO0lBaUMvRUEsMkJBQUNBO0FBQURBLENBdENBLEFBc0NDQSxFQXRDa0MsS0FBSyxFQXNDdkM7QUFFRCxBQUE4QixpQkFBckIsb0JBQW9CLENBQUMiLCJmaWxlIjoiZXZlbnRzL1JlbmRlcmFibGVPd25lckV2ZW50LmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFdmVudFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvRXZlbnRcIik7XG5cbmltcG9ydCBJUmVuZGVyT2JqZWN0T3duZXJcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9JUmVuZGVyT2JqZWN0T3duZXJcIik7XG5cbi8qKlxuICogRGlzcGF0Y2hlZCB0byBub3RpZnkgY2hhbmdlcyBpbiBhIHN1YiBnZW9tZXRyeSBvYmplY3QncyBzdGF0ZS5cbiAqXG4gKiBAY2xhc3MgYXdheS5ldmVudHMuUmVuZGVyYWJsZU93bmVyRXZlbnRcbiAqIEBzZWUgYXdheS5jb3JlLmJhc2UuR2VvbWV0cnlcbiAqL1xuY2xhc3MgUmVuZGVyYWJsZU93bmVyRXZlbnQgZXh0ZW5kcyBFdmVudFxue1xuXHQvKipcblx0ICogRGlzcGF0Y2hlZCB3aGVuIGEgUmVuZGVyYWJsZSBvd25lcnMncyByZW5kZXIgb2JqZWN0IG93bmVyIGhhcyBiZWVuIHVwZGF0ZWQuXG5cdCAqL1xuXHRwdWJsaWMgc3RhdGljIFJFTkRFUl9PQkpFQ1RfT1dORVJfVVBEQVRFRDpzdHJpbmcgPSBcInJlbmRlck9iamVjdE93bmVyVXBkYXRlZFwiO1xuXG5cdHByaXZhdGUgX3JlbmRlck9iamVjdE93bmVyOklSZW5kZXJPYmplY3RPd25lcjtcblxuXHQvKipcblx0ICogQ3JlYXRlIGEgbmV3IEdlb21ldHJ5RXZlbnRcblx0ICogQHBhcmFtIHR5cGUgVGhlIGV2ZW50IHR5cGUuXG5cdCAqIEBwYXJhbSBkYXRhVHlwZSBBbiBvcHRpb25hbCBkYXRhIHR5cGUgb2YgdGhlIHZlcnRleCBkYXRhIGJlaW5nIHVwZGF0ZWQuXG5cdCAqL1xuXHRjb25zdHJ1Y3Rvcih0eXBlOnN0cmluZywgcmVuZGVyT2JqZWN0T3duZXI6SVJlbmRlck9iamVjdE93bmVyKVxuXHR7XG5cdFx0c3VwZXIodHlwZSk7XG5cblx0XHR0aGlzLl9yZW5kZXJPYmplY3RPd25lciA9IHJlbmRlck9iamVjdE93bmVyO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSByZW5kZXJvYmplY3Qgb3duZXIgb2YgdGhlIHJlbmRlcmFibGUgb3duZXIuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHJlbmRlck9iamVjdE93bmVyKCk6SVJlbmRlck9iamVjdE93bmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcmVuZGVyT2JqZWN0T3duZXI7XG5cdH1cblxuXHQvKipcblx0ICogQ2xvbmVzIHRoZSBldmVudC5cblx0ICpcblx0ICogQHJldHVybiBBbiBleGFjdCBkdXBsaWNhdGUgb2YgdGhlIGN1cnJlbnQgb2JqZWN0LlxuXHQgKi9cblx0cHVibGljIGNsb25lKCk6RXZlbnRcblx0e1xuXHRcdHJldHVybiBuZXcgUmVuZGVyYWJsZU93bmVyRXZlbnQodGhpcy50eXBlLCB0aGlzLl9yZW5kZXJPYmplY3RPd25lcik7XG5cdH1cbn1cblxuZXhwb3J0ID0gUmVuZGVyYWJsZU93bmVyRXZlbnQ7Il19