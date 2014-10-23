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
        result.materialOwner = this.materialOwner;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9ldmVudHMvbW91c2VldmVudC50cyJdLCJuYW1lcyI6WyJNb3VzZUV2ZW50IiwiTW91c2VFdmVudC5jb25zdHJ1Y3RvciIsIk1vdXNlRXZlbnQuYnViYmxlcyIsIk1vdXNlRXZlbnQuc3RvcFByb3BhZ2F0aW9uIiwiTW91c2VFdmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24iLCJNb3VzZUV2ZW50LmNsb25lIiwiTW91c2VFdmVudC5zY2VuZVBvc2l0aW9uIiwiTW91c2VFdmVudC5zY2VuZU5vcm1hbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUEsSUFBTyxLQUFLLFdBQWUsOEJBQThCLENBQUMsQ0FBQztBQU8zRCxBQUlBOzs7R0FERztJQUNHLFVBQVU7SUFBU0EsVUFBbkJBLFVBQVVBLFVBQWNBO0lBbUk3QkE7OztPQUdHQTtJQUNIQSxTQXZJS0EsVUFBVUEsQ0F1SUhBLElBQVdBO1FBRXRCQyxrQkFBTUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUF2SWJBLFdBQVdBO1FBQ0pBLHlCQUFvQkEsR0FBV0EsSUFBSUEsQ0FBQ0E7SUF1STNDQSxDQUFDQTtJQUtERCxzQkFBV0EsK0JBQU9BO1FBSGxCQTs7V0FFR0E7YUFDSEE7WUFFQ0UsSUFBSUEsVUFBVUEsR0FBV0EsSUFBSUEsQ0FBQ0Esb0JBQW9CQSxDQUFDQTtZQUNuREEsSUFBSUEsQ0FBQ0Esb0JBQW9CQSxHQUFHQSxJQUFJQSxDQUFDQTtZQUVqQ0EsQUFDQUEsZ0RBRGdEQTtZQUNoREEsTUFBTUEsQ0FBQ0EsVUFBVUEsQ0FBQ0E7UUFDbkJBLENBQUNBOzs7T0FBQUY7SUFFREE7O09BRUdBO0lBQ0lBLG9DQUFlQSxHQUF0QkE7UUFFQ0csSUFBSUEsQ0FBQ0Esb0JBQW9CQSxHQUFHQSxLQUFLQSxDQUFDQTtRQUVsQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0E7WUFDdEJBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLGVBQWVBLEVBQUVBLENB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VUEsR0FBVUEsYUFBYUEsQ0FBQ0E7SUFFaERBOztPQUVHQTtJQUNXQSxxQkFBVUEsR0FBVUEsYUFBYUEsQ0FBQ0E7SUFFaERBOztPQUVHQTtJQUNKQSxvREFBb0RBO0lBRW5EQTs7T0FFR0E7SUFDSkEsa0RBQWtEQTtJQUVqREE7O09BRUdBO0lBQ1dBLGdCQUFLQSxHQUFVQSxTQUFTQSxDQUFDQTtJQUV2Q0E7O09BRUdBO0lBQ1dBLHVCQUFZQSxHQUFVQSxlQUFlQSxDQUFDQTtJQUVwREE7O09BRUdBO0lBQ1dBLHNCQUFXQSxHQUFVQSxjQUFjQSxDQUFDQTtJQTZLbkRBLGlCQUFDQTtBQUFEQSxDQW5PQSxBQW1PQ0EsRUFuT3dCLEtBQUssRUFtTzdCO0FBRUQsQUFBb0IsaUJBQVgsVUFBVSxDQUFDIiwiZmlsZSI6ImV2ZW50cy9Nb3VzZUV2ZW50LmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQb2ludFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9Qb2ludFwiKTtcbmltcG9ydCBWZWN0b3IzRFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9WZWN0b3IzRFwiKTtcbmltcG9ydCBFdmVudFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0V2ZW50XCIpO1xuXG5pbXBvcnQgRGlzcGxheU9iamVjdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0Rpc3BsYXlPYmplY3RcIik7XG5pbXBvcnQgSU1hdGVyaWFsT3duZXJcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9JTWF0ZXJpYWxPd25lclwiKTtcbmltcG9ydCBWaWV3XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2NvbnRhaW5lcnMvVmlld1wiKTtcbmltcG9ydCBNYXRlcmlhbEJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9tYXRlcmlhbHMvTWF0ZXJpYWxCYXNlXCIpO1xuXG4vKipcbiAqIEEgTW91c2VFdmVudCBpcyBkaXNwYXRjaGVkIHdoZW4gYSBtb3VzZSBldmVudCBvY2N1cnMgb3ZlciBhIG1vdXNlRW5hYmxlZCBvYmplY3QgaW4gVmlldy5cbiAqIFRPRE86IHdlIGRvbid0IGhhdmUgc2NyZWVuWiBkYXRhLCB0aG8gdGhpcyBzaG91bGQgYmUgZWFzeSB0byBpbXBsZW1lbnRcbiAqL1xuY2xhc3MgTW91c2VFdmVudCBleHRlbmRzIEV2ZW50XG57XG5cdC8vIFByaXZhdGUuXG5cdHB1YmxpYyBfaUFsbG93ZWRUb1Byb3BhZ2F0ZTpib29sZWFuID0gdHJ1ZTtcblx0cHVibGljIF9pUGFyZW50RXZlbnQ6TW91c2VFdmVudDtcblxuXHQvKipcblx0ICogRGVmaW5lcyB0aGUgdmFsdWUgb2YgdGhlIHR5cGUgcHJvcGVydHkgb2YgYSBtb3VzZU92ZXIzZCBldmVudCBvYmplY3QuXG5cdCAqL1xuXHRwdWJsaWMgc3RhdGljIE1PVVNFX09WRVI6c3RyaW5nID0gXCJtb3VzZU92ZXIzZFwiO1xuXG5cdC8qKlxuXHQgKiBEZWZpbmVzIHRoZSB2YWx1ZSBvZiB0aGUgdHlwZSBwcm9wZXJ0eSBvZiBhIG1vdXNlT3V0M2QgZXZlbnQgb2JqZWN0LlxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBNT1VTRV9PVVQ6c3RyaW5nID0gXCJtb3VzZU91dDNkXCI7XG5cblx0LyoqXG5cdCAqIERlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGEgbW91c2VVcDNkIGV2ZW50IG9iamVjdC5cblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgTU9VU0VfVVA6c3RyaW5nID0gXCJtb3VzZVVwM2RcIjtcblxuXHQvKipcblx0ICogRGVmaW5lcyB0aGUgdmFsdWUgb2YgdGhlIHR5cGUgcHJvcGVydHkgb2YgYSBtb3VzZURvd24zZCBldmVudCBvYmplY3QuXG5cdCAqL1xuXHRwdWJsaWMgc3RhdGljIE1PVVNFX0RPV046c3RyaW5nID0gXCJtb3VzZURvd24zZFwiO1xuXG5cdC8qKlxuXHQgKiBEZWZpbmVzIHRoZSB2YWx1ZSBvZiB0aGUgdHlwZSBwcm9wZXJ0eSBvZiBhIG1vdXNlTW92ZTNkIGV2ZW50IG9iamVjdC5cblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgTU9VU0VfTU9WRTpzdHJpbmcgPSBcIm1vdXNlTW92ZTNkXCI7XG5cblx0LyoqXG5cdCAqIERlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGEgcm9sbE92ZXIzZCBldmVudCBvYmplY3QuXG5cdCAqL1xuLy9cdFx0cHVibGljIHN0YXRpYyBST0xMX09WRVIgOiBzdHJpbmcgPSBcInJvbGxPdmVyM2RcIjtcblxuXHQvKipcblx0ICogRGVmaW5lcyB0aGUgdmFsdWUgb2YgdGhlIHR5cGUgcHJvcGVydHkgb2YgYSByb2xsT3V0M2QgZXZlbnQgb2JqZWN0LlxuXHQgKi9cbi8vXHRcdHB1YmxpYyBzdGF0aWMgUk9MTF9PVVQgOiBzdHJpbmcgPSBcInJvbGxPdXQzZFwiO1xuXG5cdC8qKlxuXHQgKiBEZWZpbmVzIHRoZSB2YWx1ZSBvZiB0aGUgdHlwZSBwcm9wZXJ0eSBvZiBhIGNsaWNrM2QgZXZlbnQgb2JqZWN0LlxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBDTElDSzpzdHJpbmcgPSBcImNsaWNrM2RcIjtcblxuXHQvKipcblx0ICogRGVmaW5lcyB0aGUgdmFsdWUgb2YgdGhlIHR5cGUgcHJvcGVydHkgb2YgYSBkb3VibGVDbGljazNkIGV2ZW50IG9iamVjdC5cblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgRE9VQkxFX0NMSUNLOnN0cmluZyA9IFwiZG91YmxlQ2xpY2szZFwiO1xuXG5cdC8qKlxuXHQgKiBEZWZpbmVzIHRoZSB2YWx1ZSBvZiB0aGUgdHlwZSBwcm9wZXJ0eSBvZiBhIG1vdXNlV2hlZWwzZCBldmVudCBvYmplY3QuXG5cdCAqL1xuXHRwdWJsaWMgc3RhdGljIE1PVVNFX1dIRUVMOnN0cmluZyA9IFwibW91c2VXaGVlbDNkXCI7XG5cblx0LyoqXG5cdCAqIFRoZSBob3Jpem9udGFsIGNvb3JkaW5hdGUgYXQgd2hpY2ggdGhlIGV2ZW50IG9jY3VycmVkIGluIHZpZXcgY29vcmRpbmF0ZXMuXG5cdCAqL1xuXHRwdWJsaWMgc2NyZWVuWDpudW1iZXI7XG5cblx0LyoqXG5cdCAqIFRoZSB2ZXJ0aWNhbCBjb29yZGluYXRlIGF0IHdoaWNoIHRoZSBldmVudCBvY2N1cnJlZCBpbiB2aWV3IGNvb3JkaW5hdGVzLlxuXHQgKi9cblx0cHVibGljIHNjcmVlblk6bnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBUaGUgdmlldyBvYmplY3QgaW5zaWRlIHdoaWNoIHRoZSBldmVudCB0b29rIHBsYWNlLlxuXHQgKi9cblx0cHVibGljIHZpZXc6VmlldztcblxuXHQvKipcblx0ICogVGhlIDNkIG9iamVjdCBpbnNpZGUgd2hpY2ggdGhlIGV2ZW50IHRvb2sgcGxhY2UuXG5cdCAqL1xuXHRwdWJsaWMgb2JqZWN0OkRpc3BsYXlPYmplY3Q7XG5cblx0LyoqXG5cdCAqIFRoZSBtYXRlcmlhbCBvd25lciBpbnNpZGUgd2hpY2ggdGhlIGV2ZW50IHRvb2sgcGxhY2UuXG5cdCAqL1xuXHRwdWJsaWMgbWF0ZXJpYWxPd25lcjpJTWF0ZXJpYWxPd25lcjtcblxuXHQvKipcblx0ICogVGhlIG1hdGVyaWFsIG9mIHRoZSAzZCBlbGVtZW50IGluc2lkZSB3aGljaCB0aGUgZXZlbnQgdG9vayBwbGFjZS5cblx0ICovXG5cdHB1YmxpYyBtYXRlcmlhbDpNYXRlcmlhbEJhc2U7XG5cblx0LyoqXG5cdCAqIFRoZSB1diBjb29yZGluYXRlIGluc2lkZSB0aGUgZHJhdyBwcmltaXRpdmUgd2hlcmUgdGhlIGV2ZW50IHRvb2sgcGxhY2UuXG5cdCAqL1xuXHRwdWJsaWMgdXY6UG9pbnQ7XG5cblx0LyoqXG5cdCAqIFRoZSBpbmRleCBvZiB0aGUgZmFjZSB3aGVyZSB0aGUgZXZlbnQgdG9vayBwbGFjZS5cblx0ICovXG5cdHB1YmxpYyBpbmRleDpudW1iZXI7XG5cblx0LyoqXG5cdCAqIFRoZSBpbmRleCBvZiB0aGUgc3ViR2VvbWV0cnkgd2hlcmUgdGhlIGV2ZW50IHRvb2sgcGxhY2UuXG5cdCAqL1xuXHRwdWJsaWMgc3ViR2VvbWV0cnlJbmRleDpudW1iZXI7XG5cblx0LyoqXG5cdCAqIFRoZSBwb3NpdGlvbiBpbiBvYmplY3Qgc3BhY2Ugd2hlcmUgdGhlIGV2ZW50IHRvb2sgcGxhY2Vcblx0ICovXG5cdHB1YmxpYyBsb2NhbFBvc2l0aW9uOlZlY3RvcjNEO1xuXG5cdC8qKlxuXHQgKiBUaGUgbm9ybWFsIGluIG9iamVjdCBzcGFjZSB3aGVyZSB0aGUgZXZlbnQgdG9vayBwbGFjZVxuXHQgKi9cblx0cHVibGljIGxvY2FsTm9ybWFsOlZlY3RvcjNEO1xuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgQ29udHJvbCBrZXkgaXMgYWN0aXZlICh0cnVlKSBvciBpbmFjdGl2ZSAoZmFsc2UpLlxuXHQgKi9cblx0cHVibGljIGN0cmxLZXk6Ym9vbGVhbjtcblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIEFsdCBrZXkgaXMgYWN0aXZlICh0cnVlKSBvciBpbmFjdGl2ZSAoZmFsc2UpLlxuXHQgKi9cblx0cHVibGljIGFsdEtleTpib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgU2hpZnQga2V5IGlzIGFjdGl2ZSAodHJ1ZSkgb3IgaW5hY3RpdmUgKGZhbHNlKS5cblx0ICovXG5cdHB1YmxpYyBzaGlmdEtleTpib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgaG93IG1hbnkgbGluZXMgc2hvdWxkIGJlIHNjcm9sbGVkIGZvciBlYWNoIHVuaXQgdGhlIHVzZXIgcm90YXRlcyB0aGUgbW91c2Ugd2hlZWwuXG5cdCAqL1xuXHRwdWJsaWMgZGVsdGE6bnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBDcmVhdGUgYSBuZXcgTW91c2VFdmVudCBvYmplY3QuXG5cdCAqIEBwYXJhbSB0eXBlIFRoZSB0eXBlIG9mIHRoZSBNb3VzZUV2ZW50LlxuXHQgKi9cblx0Y29uc3RydWN0b3IodHlwZTpzdHJpbmcpXG5cdHtcblx0XHRzdXBlcih0eXBlKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAaW5oZXJpdERvY1xuXHQgKi9cblx0cHVibGljIGdldCBidWJibGVzKCk6Ym9vbGVhblxuXHR7XG5cdFx0dmFyIGRvZXNCdWJibGU6Ym9vbGVhbiA9IHRoaXMuX2lBbGxvd2VkVG9Qcm9wYWdhdGU7XG5cdFx0dGhpcy5faUFsbG93ZWRUb1Byb3BhZ2F0ZSA9IHRydWU7XG5cblx0XHQvLyBEb24ndCBidWJibGUgaWYgcHJvcGFnYXRpb24gaGFzIGJlZW4gc3RvcHBlZC5cblx0XHRyZXR1cm4gZG9lc0J1YmJsZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAaW5oZXJpdERvY1xuXHQgKi9cblx0cHVibGljIHN0b3BQcm9wYWdhdGlvbigpXG5cdHtcblx0XHR0aGlzLl9pQWxsb3dlZFRvUHJvcGFnYXRlID0gZmFsc2U7XG5cblx0XHRpZiAodGhpcy5faVBhcmVudEV2ZW50KVxuXHRcdFx0dGhpcy5faVBhcmVudEV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBpbmhlcml0RG9jXG5cdCAqL1xuXHRwdWJsaWMgc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKClcblx0e1xuXHRcdHRoaXMuX2lBbGxvd2VkVG9Qcm9wYWdhdGUgPSBmYWxzZTtcblxuXHRcdGlmICh0aGlzLl9pUGFyZW50RXZlbnQpXG5cdFx0XHR0aGlzLl9pUGFyZW50RXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlcyBhIGNvcHkgb2YgdGhlIE1vdXNlRXZlbnQgb2JqZWN0IGFuZCBzZXRzIHRoZSB2YWx1ZSBvZiBlYWNoIHByb3BlcnR5IHRvIG1hdGNoIHRoYXQgb2YgdGhlIG9yaWdpbmFsLlxuXHQgKi9cblx0cHVibGljIGNsb25lKCk6RXZlbnRcblx0e1xuXHRcdHZhciByZXN1bHQ6TW91c2VFdmVudCA9IG5ldyBNb3VzZUV2ZW50KHRoaXMudHlwZSk7XG5cblx0XHQvKiBUT0RPOiBEZWJ1ZyAvIHRlc3QgLSBsb29rIGludG8gaXNEZWZhdWx0UHJldmVudGVkXG5cdFx0IGlmIChpc0RlZmF1bHRQcmV2ZW50ZWQoKSlcblx0XHQgcmVzdWx0LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0ICovXG5cblx0XHRyZXN1bHQuc2NyZWVuWCA9IHRoaXMuc2NyZWVuWDtcblx0XHRyZXN1bHQuc2NyZWVuWSA9IHRoaXMuc2NyZWVuWTtcblxuXHRcdHJlc3VsdC52aWV3ID0gdGhpcy52aWV3O1xuXHRcdHJlc3VsdC5vYmplY3QgPSB0aGlzLm9iamVjdDtcblx0XHRyZXN1bHQubWF0ZXJpYWxPd25lciA9IHRoaXMubWF0ZXJpYWxPd25lcjtcblx0XHRyZXN1bHQubWF0ZXJpYWwgPSB0aGlzLm1hdGVyaWFsO1xuXHRcdHJlc3VsdC51diA9IHRoaXMudXY7XG5cdFx0cmVzdWx0LmxvY2FsUG9zaXRpb24gPSB0aGlzLmxvY2FsUG9zaXRpb247XG5cdFx0cmVzdWx0LmxvY2FsTm9ybWFsID0gdGhpcy5sb2NhbE5vcm1hbDtcblx0XHRyZXN1bHQuaW5kZXggPSB0aGlzLmluZGV4O1xuXHRcdHJlc3VsdC5zdWJHZW9tZXRyeUluZGV4ID0gdGhpcy5zdWJHZW9tZXRyeUluZGV4O1xuXHRcdHJlc3VsdC5kZWx0YSA9IHRoaXMuZGVsdGE7XG5cblx0XHRyZXN1bHQuY3RybEtleSA9IHRoaXMuY3RybEtleTtcblx0XHRyZXN1bHQuc2hpZnRLZXkgPSB0aGlzLnNoaWZ0S2V5O1xuXG5cdFx0cmVzdWx0Ll9pUGFyZW50RXZlbnQgPSB0aGlzO1xuXHRcdHJlc3VsdC5faUFsbG93ZWRUb1Byb3BhZ2F0ZSA9IHRoaXMuX2lBbGxvd2VkVG9Qcm9wYWdhdGU7XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBwb3NpdGlvbiBpbiBzY2VuZSBzcGFjZSB3aGVyZSB0aGUgZXZlbnQgdG9vayBwbGFjZVxuXHQgKi9cblx0cHVibGljIGdldCBzY2VuZVBvc2l0aW9uKCk6VmVjdG9yM0Rcblx0e1xuXHRcdHJldHVybiB0aGlzLm9iamVjdC5zY2VuZVRyYW5zZm9ybS50cmFuc2Zvcm1WZWN0b3IodGhpcy5sb2NhbFBvc2l0aW9uKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgbm9ybWFsIGluIHNjZW5lIHNwYWNlIHdoZXJlIHRoZSBldmVudCB0b29rIHBsYWNlXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHNjZW5lTm9ybWFsKCk6VmVjdG9yM0Rcblx0e1xuXHRcdHZhciBzY2VuZU5vcm1hbDpWZWN0b3IzRCA9IHRoaXMub2JqZWN0LnNjZW5lVHJhbnNmb3JtLmRlbHRhVHJhbnNmb3JtVmVjdG9yKHRoaXMubG9jYWxOb3JtYWwpO1xuXHRcdHNjZW5lTm9ybWFsLm5vcm1hbGl6ZSgpO1xuXG5cdFx0cmV0dXJuIHNjZW5lTm9ybWFsO1xuXHR9XG59XG5cbmV4cG9ydCA9IE1vdXNlRXZlbnQ7Il19