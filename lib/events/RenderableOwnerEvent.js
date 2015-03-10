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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9ldmVudHMvUmVuZGVyYWJsZU93bmVyRXZlbnQudHMiXSwibmFtZXMiOlsiUmVuZGVyYWJsZU93bmVyRXZlbnQiLCJSZW5kZXJhYmxlT3duZXJFdmVudC5jb25zdHJ1Y3RvciIsIlJlbmRlcmFibGVPd25lckV2ZW50LnJlbmRlck9iamVjdE93bmVyIiwiUmVuZGVyYWJsZU93bmVyRXZlbnQuY2xvbmUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQU8sS0FBSyxXQUFnQiw4QkFBOEIsQ0FBQyxDQUFDO0FBSTVELEFBTUE7Ozs7O0dBREc7SUFDRyxvQkFBb0I7SUFBU0EsVUFBN0JBLG9CQUFvQkEsVUFBY0E7SUFTdkNBOzs7O09BSUdBO0lBQ0hBLFNBZEtBLG9CQUFvQkEsQ0FjYkEsSUFBV0EsRUFBRUEsaUJBQW9DQTtRQUU1REMsa0JBQU1BLElBQUlBLENBQUNBLENBQUNBO1FBRVpBLElBQUlBLENBQUNBLGtCQUFrQkEsR0FBR0EsaUJBQWlCQSxDQUFDQTtJQUM3Q0EsQ0FBQ0E7SUFLREQsc0JBQVdBLG1EQUFpQkE7UUFINUJBOztXQUVHQTthQUNIQTtZQUVDRSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxrQkFBa0JBLENBQUNBO1FBQ2hDQSxDQUFDQTs7O09BQUFGO0lBRURBOzs7O09BSUdBO0lBQ0lBLG9DQUFLQSxHQUFaQTtRQUVDRyxNQUFNQSxDQUFDQSxJQUFJQSxvQkFBb0JBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLEVBQUVBLElBQUlBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsQ0FBQ0E7SUFDckVBLENBQUNBO0lBbkNESDs7T0FFR0E7SUFDV0EsZ0RBQTJCQSxHQUFVQSwwQkFBMEJBLENBQUNBO0lBaUMvRUEsMkJBQUNBO0FBQURBLENBdENBLEFBc0NDQSxFQXRDa0MsS0FBSyxFQXNDdkM7QUFFRCxBQUE4QixpQkFBckIsb0JBQW9CLENBQUMiLCJmaWxlIjoiZXZlbnRzL1JlbmRlcmFibGVPd25lckV2ZW50LmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFdmVudFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvRXZlbnRcIik7XHJcblxyXG5pbXBvcnQgSVJlbmRlck9iamVjdE93bmVyXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvSVJlbmRlck9iamVjdE93bmVyXCIpO1xyXG5cclxuLyoqXHJcbiAqIERpc3BhdGNoZWQgdG8gbm90aWZ5IGNoYW5nZXMgaW4gYSBzdWIgZ2VvbWV0cnkgb2JqZWN0J3Mgc3RhdGUuXHJcbiAqXHJcbiAqIEBjbGFzcyBhd2F5LmV2ZW50cy5SZW5kZXJhYmxlT3duZXJFdmVudFxyXG4gKiBAc2VlIGF3YXkuY29yZS5iYXNlLkdlb21ldHJ5XHJcbiAqL1xyXG5jbGFzcyBSZW5kZXJhYmxlT3duZXJFdmVudCBleHRlbmRzIEV2ZW50XHJcbntcclxuXHQvKipcclxuXHQgKiBEaXNwYXRjaGVkIHdoZW4gYSBSZW5kZXJhYmxlIG93bmVycydzIHJlbmRlciBvYmplY3Qgb3duZXIgaGFzIGJlZW4gdXBkYXRlZC5cclxuXHQgKi9cclxuXHRwdWJsaWMgc3RhdGljIFJFTkRFUl9PQkpFQ1RfT1dORVJfVVBEQVRFRDpzdHJpbmcgPSBcInJlbmRlck9iamVjdE93bmVyVXBkYXRlZFwiO1xyXG5cclxuXHRwcml2YXRlIF9yZW5kZXJPYmplY3RPd25lcjpJUmVuZGVyT2JqZWN0T3duZXI7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZSBhIG5ldyBHZW9tZXRyeUV2ZW50XHJcblx0ICogQHBhcmFtIHR5cGUgVGhlIGV2ZW50IHR5cGUuXHJcblx0ICogQHBhcmFtIGRhdGFUeXBlIEFuIG9wdGlvbmFsIGRhdGEgdHlwZSBvZiB0aGUgdmVydGV4IGRhdGEgYmVpbmcgdXBkYXRlZC5cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3Rvcih0eXBlOnN0cmluZywgcmVuZGVyT2JqZWN0T3duZXI6SVJlbmRlck9iamVjdE93bmVyKVxyXG5cdHtcclxuXHRcdHN1cGVyKHR5cGUpO1xyXG5cclxuXHRcdHRoaXMuX3JlbmRlck9iamVjdE93bmVyID0gcmVuZGVyT2JqZWN0T3duZXI7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgcmVuZGVyb2JqZWN0IG93bmVyIG9mIHRoZSByZW5kZXJhYmxlIG93bmVyLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgcmVuZGVyT2JqZWN0T3duZXIoKTpJUmVuZGVyT2JqZWN0T3duZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcmVuZGVyT2JqZWN0T3duZXI7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDbG9uZXMgdGhlIGV2ZW50LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiBBbiBleGFjdCBkdXBsaWNhdGUgb2YgdGhlIGN1cnJlbnQgb2JqZWN0LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBjbG9uZSgpOkV2ZW50XHJcblx0e1xyXG5cdFx0cmV0dXJuIG5ldyBSZW5kZXJhYmxlT3duZXJFdmVudCh0aGlzLnR5cGUsIHRoaXMuX3JlbmRlck9iamVjdE93bmVyKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCA9IFJlbmRlcmFibGVPd25lckV2ZW50OyJdfQ==