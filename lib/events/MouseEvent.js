var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Event = require("awayjs-core/lib/events/Event");
/**
 * A MouseEvent is dispatched when a mouse event occurs over a mouseEnabled object in View.
 * TODO: we don't have screenZ data, tho this should be easy to implement
 */
var MouseEvent = (function (_super) {
    __extends(MouseEvent, _super);
    /**
     * Create a new MouseEvent object.
     * @param type The type of the MouseEvent.
     */
    function MouseEvent(type) {
        _super.call(this, type);
        // Private.
        this._iAllowedToPropagate = true;
    }
    Object.defineProperty(MouseEvent.prototype, "bubbles", {
        /**
         * @inheritDoc
         */
        get: function () {
            var doesBubble = this._iAllowedToPropagate;
            this._iAllowedToPropagate = true;
            // Don't bubble if propagation has been stopped.
            return doesBubble;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @inheritDoc
     */
    MouseEvent.prototype.stopPropagation = function () {
        this._iAllowedToPropagate = false;
        if (this._iParentEvent)
            this._iParentEvent.stopPropagation();
    };
    /**
     * @inheritDoc
     */
    MouseEvent.prototype.stopImmediatePropagation = function () {
        this._iAllowedToPropagate = false;
        if (this._iParentEvent)
            this._iParentEvent.stopImmediatePropagation();
    };
    /**
     * Creates a copy of the MouseEvent object and sets the value of each property to match that of the original.
     */
    MouseEvent.prototype.clone = function () {
        var result = new MouseEvent(this.type);
        /* TODO: Debug / test - look into isDefaultPrevented
         if (isDefaultPrevented())
         result.preventDefault();
         */
        result.screenX = this.screenX;
        result.screenY = this.screenY;
        result.view = this.view;
        result.object = this.object;
        result.renderableOwner = this.renderableOwner;
        result.material = this.material;
        result.uv = this.uv;
        result.localPosition = this.localPosition;
        result.localNormal = this.localNormal;
        result.index = this.index;
        result.subGeometryIndex = this.subGeometryIndex;
        result.delta = this.delta;
        result.ctrlKey = this.ctrlKey;
        result.shiftKey = this.shiftKey;
        result._iParentEvent = this;
        result._iAllowedToPropagate = this._iAllowedToPropagate;
        return result;
    };
    Object.defineProperty(MouseEvent.prototype, "scenePosition", {
        /**
         * The position in scene space where the event took place
         */
        get: function () {
            return this.object.sceneTransform.transformVector(this.localPosition);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MouseEvent.prototype, "sceneNormal", {
        /**
         * The normal in scene space where the event took place
         */
        get: function () {
            var sceneNormal = this.object.sceneTransform.deltaTransformVector(this.localNormal);
            sceneNormal.normalize();
            return sceneNormal;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Defines the value of the type property of a mouseOver3d event object.
     */
    MouseEvent.MOUSE_OVER = "mouseOver3d";
    /**
     * Defines the value of the type property of a mouseOut3d event object.
     */
    MouseEvent.MOUSE_OUT = "mouseOut3d";
    /**
     * Defines the value of the type property of a mouseUp3d event object.
     */
    MouseEvent.MOUSE_UP = "mouseUp3d";
    /**
     * Defines the value of the type property of a mouseDown3d event object.
     */
    MouseEvent.MOUSE_DOWN = "mouseDown3d";
    /**
     * Defines the value of the type property of a mouseMove3d event object.
     */
    MouseEvent.MOUSE_MOVE = "mouseMove3d";
    /**
     * Defines the value of the type property of a rollOver3d event object.
     */
    //		public static ROLL_OVER : string = "rollOver3d";
    /**
     * Defines the value of the type property of a rollOut3d event object.
     */
    //		public static ROLL_OUT : string = "rollOut3d";
    /**
     * Defines the value of the type property of a click3d event object.
     */
    MouseEvent.CLICK = "click3d";
    /**
     * Defines the value of the type property of a doubleClick3d event object.
     */
    MouseEvent.DOUBLE_CLICK = "doubleClick3d";
    /**
     * Defines the value of the type property of a mouseWheel3d event object.
     */
    MouseEvent.MOUSE_WHEEL = "mouseWheel3d";
    return MouseEvent;
})(Event);
module.exports = MouseEvent;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9ldmVudHMvTW91c2VFdmVudC50cyJdLCJuYW1lcyI6WyJNb3VzZUV2ZW50IiwiTW91c2VFdmVudC5jb25zdHJ1Y3RvciIsIk1vdXNlRXZlbnQuYnViYmxlcyIsIk1vdXNlRXZlbnQuc3RvcFByb3BhZ2F0aW9uIiwiTW91c2VFdmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24iLCJNb3VzZUV2ZW50LmNsb25lIiwiTW91c2VFdmVudC5zY2VuZVBvc2l0aW9uIiwiTW91c2VFdmVudC5zY2VuZU5vcm1hbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUEsSUFBTyxLQUFLLFdBQWUsOEJBQThCLENBQUMsQ0FBQztBQU8zRCxBQUlBOzs7R0FERztJQUNHLFVBQVU7SUFBU0EsVUFBbkJBLFVBQVVBLFVBQWNBO0lBbUk3QkE7OztPQUdHQTtJQUNIQSxTQXZJS0EsVUFBVUEsQ0F1SUhBLElBQVdBO1FBRXRCQyxrQkFBTUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUF2SWJBLFdBQVdBO1FBQ0pBLHlCQUFvQkEsR0FBV0EsSUFBSUEsQ0FBQ0E7SUF1STNDQSxDQUFDQTtJQUtERCxzQkFBV0EsK0JBQU9BO1FBSGxCQTs7V0FFR0E7YUFDSEE7WUFFQ0UsSUFBSUEsVUFBVUEsR0FBV0EsSUFBSUEsQ0FBQ0Esb0JBQW9CQSxDQUFDQTtZQUNuREEsSUFBSUEsQ0FBQ0Esb0JBQW9CQSxHQUFHQSxJQUFJQSxDQUFDQTtZQUVqQ0EsQUFDQUEsZ0RBRGdEQTtZQUNoREEsTUFBTUEsQ0FBQ0EsVUFBVUEsQ0FBQ0E7UUFDbkJBLENBQUNBOzs7T0FBQUY7SUFFREE7O09BRUdBO0lBQ0lBLG9DQUFlQSxHQUF0QkE7UUFFQ0csSUFBSUEsQ0FBQ0Esb0JBQW9CQSxHQUFHQSxLQUFLQSxDQUFDQTtRQUVsQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0E7WUFDdEJBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLGVBQWVBLEVBQUVBLENB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VUEsR0FBVUEsYUFBYUEsQ0FBQ0E7SUFFaERBOztPQUVHQTtJQUNXQSxxQkFBVUEsR0FBVUEsYUFBYUEsQ0FBQ0E7SUFFaERBOztPQUVHQTtJQUNKQSxvREFBb0RBO0lBRW5EQTs7T0FFR0E7SUFDSkEsa0RBQWtEQTtJQUVqREE7O09BRUdBO0lBQ1dBLGdCQUFLQSxHQUFVQSxTQUFTQSxDQUFDQTtJQUV2Q0E7O09BRUdBO0lBQ1dBLHVCQUFZQSxHQUFVQSxlQUFlQSxDQUFDQTtJQUVwREE7O09BRUdBO0lBQ1dBLHNCQUFXQSxHQUFVQSxjQUFjQSxDQUFDQTtJQTZLbkRBLGlCQUFDQTtBQUFEQSxDQW5PQSxBQW1PQ0EsRUFuT3dCLEtBQUssRUFtTzdCO0FBRUQsQUFBb0IsaUJBQVgsVUFBVSxDQUFDIiwiZmlsZSI6ImV2ZW50cy9Nb3VzZUV2ZW50LmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQb2ludFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9Qb2ludFwiKTtcclxuaW1wb3J0IFZlY3RvcjNEXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1ZlY3RvcjNEXCIpO1xyXG5pbXBvcnQgRXZlbnRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2V2ZW50cy9FdmVudFwiKTtcclxuXHJcbmltcG9ydCBEaXNwbGF5T2JqZWN0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvRGlzcGxheU9iamVjdFwiKTtcclxuaW1wb3J0IElSZW5kZXJhYmxlT3duZXJcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9JUmVuZGVyYWJsZU93bmVyXCIpO1xyXG5pbXBvcnQgVmlld1x0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9jb250YWluZXJzL1ZpZXdcIik7XHJcbmltcG9ydCBNYXRlcmlhbEJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9tYXRlcmlhbHMvTWF0ZXJpYWxCYXNlXCIpO1xyXG5cclxuLyoqXHJcbiAqIEEgTW91c2VFdmVudCBpcyBkaXNwYXRjaGVkIHdoZW4gYSBtb3VzZSBldmVudCBvY2N1cnMgb3ZlciBhIG1vdXNlRW5hYmxlZCBvYmplY3QgaW4gVmlldy5cclxuICogVE9ETzogd2UgZG9uJ3QgaGF2ZSBzY3JlZW5aIGRhdGEsIHRobyB0aGlzIHNob3VsZCBiZSBlYXN5IHRvIGltcGxlbWVudFxyXG4gKi9cclxuY2xhc3MgTW91c2VFdmVudCBleHRlbmRzIEV2ZW50XHJcbntcclxuXHQvLyBQcml2YXRlLlxyXG5cdHB1YmxpYyBfaUFsbG93ZWRUb1Byb3BhZ2F0ZTpib29sZWFuID0gdHJ1ZTtcclxuXHRwdWJsaWMgX2lQYXJlbnRFdmVudDpNb3VzZUV2ZW50O1xyXG5cclxuXHQvKipcclxuXHQgKiBEZWZpbmVzIHRoZSB2YWx1ZSBvZiB0aGUgdHlwZSBwcm9wZXJ0eSBvZiBhIG1vdXNlT3ZlcjNkIGV2ZW50IG9iamVjdC5cclxuXHQgKi9cclxuXHRwdWJsaWMgc3RhdGljIE1PVVNFX09WRVI6c3RyaW5nID0gXCJtb3VzZU92ZXIzZFwiO1xyXG5cclxuXHQvKipcclxuXHQgKiBEZWZpbmVzIHRoZSB2YWx1ZSBvZiB0aGUgdHlwZSBwcm9wZXJ0eSBvZiBhIG1vdXNlT3V0M2QgZXZlbnQgb2JqZWN0LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzdGF0aWMgTU9VU0VfT1VUOnN0cmluZyA9IFwibW91c2VPdXQzZFwiO1xyXG5cclxuXHQvKipcclxuXHQgKiBEZWZpbmVzIHRoZSB2YWx1ZSBvZiB0aGUgdHlwZSBwcm9wZXJ0eSBvZiBhIG1vdXNlVXAzZCBldmVudCBvYmplY3QuXHJcblx0ICovXHJcblx0cHVibGljIHN0YXRpYyBNT1VTRV9VUDpzdHJpbmcgPSBcIm1vdXNlVXAzZFwiO1xyXG5cclxuXHQvKipcclxuXHQgKiBEZWZpbmVzIHRoZSB2YWx1ZSBvZiB0aGUgdHlwZSBwcm9wZXJ0eSBvZiBhIG1vdXNlRG93bjNkIGV2ZW50IG9iamVjdC5cclxuXHQgKi9cclxuXHRwdWJsaWMgc3RhdGljIE1PVVNFX0RPV046c3RyaW5nID0gXCJtb3VzZURvd24zZFwiO1xyXG5cclxuXHQvKipcclxuXHQgKiBEZWZpbmVzIHRoZSB2YWx1ZSBvZiB0aGUgdHlwZSBwcm9wZXJ0eSBvZiBhIG1vdXNlTW92ZTNkIGV2ZW50IG9iamVjdC5cclxuXHQgKi9cclxuXHRwdWJsaWMgc3RhdGljIE1PVVNFX01PVkU6c3RyaW5nID0gXCJtb3VzZU1vdmUzZFwiO1xyXG5cclxuXHQvKipcclxuXHQgKiBEZWZpbmVzIHRoZSB2YWx1ZSBvZiB0aGUgdHlwZSBwcm9wZXJ0eSBvZiBhIHJvbGxPdmVyM2QgZXZlbnQgb2JqZWN0LlxyXG5cdCAqL1xyXG4vL1x0XHRwdWJsaWMgc3RhdGljIFJPTExfT1ZFUiA6IHN0cmluZyA9IFwicm9sbE92ZXIzZFwiO1xyXG5cclxuXHQvKipcclxuXHQgKiBEZWZpbmVzIHRoZSB2YWx1ZSBvZiB0aGUgdHlwZSBwcm9wZXJ0eSBvZiBhIHJvbGxPdXQzZCBldmVudCBvYmplY3QuXHJcblx0ICovXHJcbi8vXHRcdHB1YmxpYyBzdGF0aWMgUk9MTF9PVVQgOiBzdHJpbmcgPSBcInJvbGxPdXQzZFwiO1xyXG5cclxuXHQvKipcclxuXHQgKiBEZWZpbmVzIHRoZSB2YWx1ZSBvZiB0aGUgdHlwZSBwcm9wZXJ0eSBvZiBhIGNsaWNrM2QgZXZlbnQgb2JqZWN0LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzdGF0aWMgQ0xJQ0s6c3RyaW5nID0gXCJjbGljazNkXCI7XHJcblxyXG5cdC8qKlxyXG5cdCAqIERlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGEgZG91YmxlQ2xpY2szZCBldmVudCBvYmplY3QuXHJcblx0ICovXHJcblx0cHVibGljIHN0YXRpYyBET1VCTEVfQ0xJQ0s6c3RyaW5nID0gXCJkb3VibGVDbGljazNkXCI7XHJcblxyXG5cdC8qKlxyXG5cdCAqIERlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGEgbW91c2VXaGVlbDNkIGV2ZW50IG9iamVjdC5cclxuXHQgKi9cclxuXHRwdWJsaWMgc3RhdGljIE1PVVNFX1dIRUVMOnN0cmluZyA9IFwibW91c2VXaGVlbDNkXCI7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBob3Jpem9udGFsIGNvb3JkaW5hdGUgYXQgd2hpY2ggdGhlIGV2ZW50IG9jY3VycmVkIGluIHZpZXcgY29vcmRpbmF0ZXMuXHJcblx0ICovXHJcblx0cHVibGljIHNjcmVlblg6bnVtYmVyO1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgdmVydGljYWwgY29vcmRpbmF0ZSBhdCB3aGljaCB0aGUgZXZlbnQgb2NjdXJyZWQgaW4gdmlldyBjb29yZGluYXRlcy5cclxuXHQgKi9cclxuXHRwdWJsaWMgc2NyZWVuWTpudW1iZXI7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSB2aWV3IG9iamVjdCBpbnNpZGUgd2hpY2ggdGhlIGV2ZW50IHRvb2sgcGxhY2UuXHJcblx0ICovXHJcblx0cHVibGljIHZpZXc6VmlldztcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIDNkIG9iamVjdCBpbnNpZGUgd2hpY2ggdGhlIGV2ZW50IHRvb2sgcGxhY2UuXHJcblx0ICovXHJcblx0cHVibGljIG9iamVjdDpEaXNwbGF5T2JqZWN0O1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgcmVuZGVyYWJsZSBvd25lciBpbnNpZGUgd2hpY2ggdGhlIGV2ZW50IHRvb2sgcGxhY2UuXHJcblx0ICovXHJcblx0cHVibGljIHJlbmRlcmFibGVPd25lcjpJUmVuZGVyYWJsZU93bmVyO1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgbWF0ZXJpYWwgb2YgdGhlIDNkIGVsZW1lbnQgaW5zaWRlIHdoaWNoIHRoZSBldmVudCB0b29rIHBsYWNlLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBtYXRlcmlhbDpNYXRlcmlhbEJhc2U7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSB1diBjb29yZGluYXRlIGluc2lkZSB0aGUgZHJhdyBwcmltaXRpdmUgd2hlcmUgdGhlIGV2ZW50IHRvb2sgcGxhY2UuXHJcblx0ICovXHJcblx0cHVibGljIHV2OlBvaW50O1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgaW5kZXggb2YgdGhlIGZhY2Ugd2hlcmUgdGhlIGV2ZW50IHRvb2sgcGxhY2UuXHJcblx0ICovXHJcblx0cHVibGljIGluZGV4Om51bWJlcjtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGluZGV4IG9mIHRoZSBzdWJHZW9tZXRyeSB3aGVyZSB0aGUgZXZlbnQgdG9vayBwbGFjZS5cclxuXHQgKi9cclxuXHRwdWJsaWMgc3ViR2VvbWV0cnlJbmRleDpudW1iZXI7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBwb3NpdGlvbiBpbiBvYmplY3Qgc3BhY2Ugd2hlcmUgdGhlIGV2ZW50IHRvb2sgcGxhY2VcclxuXHQgKi9cclxuXHRwdWJsaWMgbG9jYWxQb3NpdGlvbjpWZWN0b3IzRDtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIG5vcm1hbCBpbiBvYmplY3Qgc3BhY2Ugd2hlcmUgdGhlIGV2ZW50IHRvb2sgcGxhY2VcclxuXHQgKi9cclxuXHRwdWJsaWMgbG9jYWxOb3JtYWw6VmVjdG9yM0Q7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBDb250cm9sIGtleSBpcyBhY3RpdmUgKHRydWUpIG9yIGluYWN0aXZlIChmYWxzZSkuXHJcblx0ICovXHJcblx0cHVibGljIGN0cmxLZXk6Ym9vbGVhbjtcclxuXHJcblx0LyoqXHJcblx0ICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIEFsdCBrZXkgaXMgYWN0aXZlICh0cnVlKSBvciBpbmFjdGl2ZSAoZmFsc2UpLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBhbHRLZXk6Ym9vbGVhbjtcclxuXHJcblx0LyoqXHJcblx0ICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIFNoaWZ0IGtleSBpcyBhY3RpdmUgKHRydWUpIG9yIGluYWN0aXZlIChmYWxzZSkuXHJcblx0ICovXHJcblx0cHVibGljIHNoaWZ0S2V5OmJvb2xlYW47XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluZGljYXRlcyBob3cgbWFueSBsaW5lcyBzaG91bGQgYmUgc2Nyb2xsZWQgZm9yIGVhY2ggdW5pdCB0aGUgdXNlciByb3RhdGVzIHRoZSBtb3VzZSB3aGVlbC5cclxuXHQgKi9cclxuXHRwdWJsaWMgZGVsdGE6bnVtYmVyO1xyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGUgYSBuZXcgTW91c2VFdmVudCBvYmplY3QuXHJcblx0ICogQHBhcmFtIHR5cGUgVGhlIHR5cGUgb2YgdGhlIE1vdXNlRXZlbnQuXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IodHlwZTpzdHJpbmcpXHJcblx0e1xyXG5cdFx0c3VwZXIodHlwZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAaW5oZXJpdERvY1xyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgYnViYmxlcygpOmJvb2xlYW5cclxuXHR7XHJcblx0XHR2YXIgZG9lc0J1YmJsZTpib29sZWFuID0gdGhpcy5faUFsbG93ZWRUb1Byb3BhZ2F0ZTtcclxuXHRcdHRoaXMuX2lBbGxvd2VkVG9Qcm9wYWdhdGUgPSB0cnVlO1xyXG5cclxuXHRcdC8vIERvbid0IGJ1YmJsZSBpZiBwcm9wYWdhdGlvbiBoYXMgYmVlbiBzdG9wcGVkLlxyXG5cdFx0cmV0dXJuIGRvZXNCdWJibGU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAaW5oZXJpdERvY1xyXG5cdCAqL1xyXG5cdHB1YmxpYyBzdG9wUHJvcGFnYXRpb24oKVxyXG5cdHtcclxuXHRcdHRoaXMuX2lBbGxvd2VkVG9Qcm9wYWdhdGUgPSBmYWxzZTtcclxuXHJcblx0XHRpZiAodGhpcy5faVBhcmVudEV2ZW50KVxyXG5cdFx0XHR0aGlzLl9pUGFyZW50RXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAaW5oZXJpdERvY1xyXG5cdCAqL1xyXG5cdHB1YmxpYyBzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKVxyXG5cdHtcclxuXHRcdHRoaXMuX2lBbGxvd2VkVG9Qcm9wYWdhdGUgPSBmYWxzZTtcclxuXHJcblx0XHRpZiAodGhpcy5faVBhcmVudEV2ZW50KVxyXG5cdFx0XHR0aGlzLl9pUGFyZW50RXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGEgY29weSBvZiB0aGUgTW91c2VFdmVudCBvYmplY3QgYW5kIHNldHMgdGhlIHZhbHVlIG9mIGVhY2ggcHJvcGVydHkgdG8gbWF0Y2ggdGhhdCBvZiB0aGUgb3JpZ2luYWwuXHJcblx0ICovXHJcblx0cHVibGljIGNsb25lKCk6RXZlbnRcclxuXHR7XHJcblx0XHR2YXIgcmVzdWx0Ok1vdXNlRXZlbnQgPSBuZXcgTW91c2VFdmVudCh0aGlzLnR5cGUpO1xyXG5cclxuXHRcdC8qIFRPRE86IERlYnVnIC8gdGVzdCAtIGxvb2sgaW50byBpc0RlZmF1bHRQcmV2ZW50ZWRcclxuXHRcdCBpZiAoaXNEZWZhdWx0UHJldmVudGVkKCkpXHJcblx0XHQgcmVzdWx0LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHQgKi9cclxuXHJcblx0XHRyZXN1bHQuc2NyZWVuWCA9IHRoaXMuc2NyZWVuWDtcclxuXHRcdHJlc3VsdC5zY3JlZW5ZID0gdGhpcy5zY3JlZW5ZO1xyXG5cclxuXHRcdHJlc3VsdC52aWV3ID0gdGhpcy52aWV3O1xyXG5cdFx0cmVzdWx0Lm9iamVjdCA9IHRoaXMub2JqZWN0O1xyXG5cdFx0cmVzdWx0LnJlbmRlcmFibGVPd25lciA9IHRoaXMucmVuZGVyYWJsZU93bmVyO1xyXG5cdFx0cmVzdWx0Lm1hdGVyaWFsID0gdGhpcy5tYXRlcmlhbDtcclxuXHRcdHJlc3VsdC51diA9IHRoaXMudXY7XHJcblx0XHRyZXN1bHQubG9jYWxQb3NpdGlvbiA9IHRoaXMubG9jYWxQb3NpdGlvbjtcclxuXHRcdHJlc3VsdC5sb2NhbE5vcm1hbCA9IHRoaXMubG9jYWxOb3JtYWw7XHJcblx0XHRyZXN1bHQuaW5kZXggPSB0aGlzLmluZGV4O1xyXG5cdFx0cmVzdWx0LnN1Ykdlb21ldHJ5SW5kZXggPSB0aGlzLnN1Ykdlb21ldHJ5SW5kZXg7XHJcblx0XHRyZXN1bHQuZGVsdGEgPSB0aGlzLmRlbHRhO1xyXG5cclxuXHRcdHJlc3VsdC5jdHJsS2V5ID0gdGhpcy5jdHJsS2V5O1xyXG5cdFx0cmVzdWx0LnNoaWZ0S2V5ID0gdGhpcy5zaGlmdEtleTtcclxuXHJcblx0XHRyZXN1bHQuX2lQYXJlbnRFdmVudCA9IHRoaXM7XHJcblx0XHRyZXN1bHQuX2lBbGxvd2VkVG9Qcm9wYWdhdGUgPSB0aGlzLl9pQWxsb3dlZFRvUHJvcGFnYXRlO1xyXG5cclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgcG9zaXRpb24gaW4gc2NlbmUgc3BhY2Ugd2hlcmUgdGhlIGV2ZW50IHRvb2sgcGxhY2VcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHNjZW5lUG9zaXRpb24oKTpWZWN0b3IzRFxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLm9iamVjdC5zY2VuZVRyYW5zZm9ybS50cmFuc2Zvcm1WZWN0b3IodGhpcy5sb2NhbFBvc2l0aW9uKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBub3JtYWwgaW4gc2NlbmUgc3BhY2Ugd2hlcmUgdGhlIGV2ZW50IHRvb2sgcGxhY2VcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHNjZW5lTm9ybWFsKCk6VmVjdG9yM0RcclxuXHR7XHJcblx0XHR2YXIgc2NlbmVOb3JtYWw6VmVjdG9yM0QgPSB0aGlzLm9iamVjdC5zY2VuZVRyYW5zZm9ybS5kZWx0YVRyYW5zZm9ybVZlY3Rvcih0aGlzLmxvY2FsTm9ybWFsKTtcclxuXHRcdHNjZW5lTm9ybWFsLm5vcm1hbGl6ZSgpO1xyXG5cclxuXHRcdHJldHVybiBzY2VuZU5vcm1hbDtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCA9IE1vdXNlRXZlbnQ7Il19