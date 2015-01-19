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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9ldmVudHMvbW91c2VldmVudC50cyJdLCJuYW1lcyI6WyJNb3VzZUV2ZW50IiwiTW91c2VFdmVudC5jb25zdHJ1Y3RvciIsIk1vdXNlRXZlbnQuYnViYmxlcyIsIk1vdXNlRXZlbnQuc3RvcFByb3BhZ2F0aW9uIiwiTW91c2VFdmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24iLCJNb3VzZUV2ZW50LmNsb25lIiwiTW91c2VFdmVudC5zY2VuZVBvc2l0aW9uIiwiTW91c2VFdmVudC5zY2VuZU5vcm1hbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUEsSUFBTyxLQUFLLFdBQWUsOEJBQThCLENBQUMsQ0FBQztBQU8zRCxBQUlBOzs7R0FERztJQUNHLFVBQVU7SUFBU0EsVUFBbkJBLFVBQVVBLFVBQWNBO0lBbUk3QkE7OztPQUdHQTtJQUNIQSxTQXZJS0EsVUFBVUEsQ0F1SUhBLElBQVdBO1FBRXRCQyxrQkFBTUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUF2SWJBLFdBQVdBO1FBQ0pBLHlCQUFvQkEsR0FBV0EsSUFBSUEsQ0FBQ0E7SUF1STNDQSxDQUFDQTtJQUtERCxzQkFBV0EsK0JBQU9BO1FBSGxCQTs7V0FFR0E7YUFDSEE7WUFFQ0UsSUFBSUEsVUFBVUEsR0FBV0EsSUFBSUEsQ0FBQ0Esb0JBQW9CQSxDQUFDQTtZQUNuREEsSUFBSUEsQ0FBQ0Esb0JBQW9CQSxHQUFHQSxJQUFJQSxDQUFDQTtZQUVqQ0EsQUFDQUEsZ0RBRGdEQTtZQUNoREEsTUFBTUEsQ0FBQ0EsVUFBVUEsQ0FBQ0E7UUFDbkJBLENBQUNBOzs7T0FBQUY7SUFFREE7O09BRUdBO0lBQ0lBLG9DQUFlQSxHQUF0QkE7UUFFQ0csSUFBSUEsQ0FBQ0Esb0JBQW9CQSxHQUFHQSxLQUFLQSxDQUFDQTtRQUVsQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0E7WUFDdEJBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLGVBQWVBLEVBQUVBLENB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VUEsR0FBVUEsYUFBYUEsQ0FBQ0E7SUFFaERBOztPQUVHQTtJQUNXQSxxQkFBVUEsR0FBVUEsYUFBYUEsQ0FBQ0E7SUFFaERBOztPQUVHQTtJQUNKQSxvREFBb0RBO0lBRW5EQTs7T0FFR0E7SUFDSkEsa0RBQWtEQTtJQUVqREE7O09BRUdBO0lBQ1dBLGdCQUFLQSxHQUFVQSxTQUFTQSxDQUFDQTtJQUV2Q0E7O09BRUdBO0lBQ1dBLHVCQUFZQSxHQUFVQSxlQUFlQSxDQUFDQTtJQUVwREE7O09BRUdBO0lBQ1dBLHNCQUFXQSxHQUFVQSxjQUFjQSxDQUFDQTtJQTZLbkRBLGlCQUFDQTtBQUFEQSxDQW5PQSxBQW1PQ0EsRUFuT3dCLEtBQUssRUFtTzdCO0FBRUQsQUFBb0IsaUJBQVgsVUFBVSxDQUFDIiwiZmlsZSI6ImV2ZW50cy9Nb3VzZUV2ZW50LmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQb2ludFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9Qb2ludFwiKTtcbmltcG9ydCBWZWN0b3IzRFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9WZWN0b3IzRFwiKTtcbmltcG9ydCBFdmVudFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0V2ZW50XCIpO1xuXG5pbXBvcnQgRGlzcGxheU9iamVjdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0Rpc3BsYXlPYmplY3RcIik7XG5pbXBvcnQgSVJlbmRlcmFibGVPd25lclx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0lSZW5kZXJhYmxlT3duZXJcIik7XG5pbXBvcnQgVmlld1x0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9jb250YWluZXJzL1ZpZXdcIik7XG5pbXBvcnQgTWF0ZXJpYWxCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvbWF0ZXJpYWxzL01hdGVyaWFsQmFzZVwiKTtcblxuLyoqXG4gKiBBIE1vdXNlRXZlbnQgaXMgZGlzcGF0Y2hlZCB3aGVuIGEgbW91c2UgZXZlbnQgb2NjdXJzIG92ZXIgYSBtb3VzZUVuYWJsZWQgb2JqZWN0IGluIFZpZXcuXG4gKiBUT0RPOiB3ZSBkb24ndCBoYXZlIHNjcmVlblogZGF0YSwgdGhvIHRoaXMgc2hvdWxkIGJlIGVhc3kgdG8gaW1wbGVtZW50XG4gKi9cbmNsYXNzIE1vdXNlRXZlbnQgZXh0ZW5kcyBFdmVudFxue1xuXHQvLyBQcml2YXRlLlxuXHRwdWJsaWMgX2lBbGxvd2VkVG9Qcm9wYWdhdGU6Ym9vbGVhbiA9IHRydWU7XG5cdHB1YmxpYyBfaVBhcmVudEV2ZW50Ok1vdXNlRXZlbnQ7XG5cblx0LyoqXG5cdCAqIERlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGEgbW91c2VPdmVyM2QgZXZlbnQgb2JqZWN0LlxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBNT1VTRV9PVkVSOnN0cmluZyA9IFwibW91c2VPdmVyM2RcIjtcblxuXHQvKipcblx0ICogRGVmaW5lcyB0aGUgdmFsdWUgb2YgdGhlIHR5cGUgcHJvcGVydHkgb2YgYSBtb3VzZU91dDNkIGV2ZW50IG9iamVjdC5cblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgTU9VU0VfT1VUOnN0cmluZyA9IFwibW91c2VPdXQzZFwiO1xuXG5cdC8qKlxuXHQgKiBEZWZpbmVzIHRoZSB2YWx1ZSBvZiB0aGUgdHlwZSBwcm9wZXJ0eSBvZiBhIG1vdXNlVXAzZCBldmVudCBvYmplY3QuXG5cdCAqL1xuXHRwdWJsaWMgc3RhdGljIE1PVVNFX1VQOnN0cmluZyA9IFwibW91c2VVcDNkXCI7XG5cblx0LyoqXG5cdCAqIERlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGEgbW91c2VEb3duM2QgZXZlbnQgb2JqZWN0LlxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBNT1VTRV9ET1dOOnN0cmluZyA9IFwibW91c2VEb3duM2RcIjtcblxuXHQvKipcblx0ICogRGVmaW5lcyB0aGUgdmFsdWUgb2YgdGhlIHR5cGUgcHJvcGVydHkgb2YgYSBtb3VzZU1vdmUzZCBldmVudCBvYmplY3QuXG5cdCAqL1xuXHRwdWJsaWMgc3RhdGljIE1PVVNFX01PVkU6c3RyaW5nID0gXCJtb3VzZU1vdmUzZFwiO1xuXG5cdC8qKlxuXHQgKiBEZWZpbmVzIHRoZSB2YWx1ZSBvZiB0aGUgdHlwZSBwcm9wZXJ0eSBvZiBhIHJvbGxPdmVyM2QgZXZlbnQgb2JqZWN0LlxuXHQgKi9cbi8vXHRcdHB1YmxpYyBzdGF0aWMgUk9MTF9PVkVSIDogc3RyaW5nID0gXCJyb2xsT3ZlcjNkXCI7XG5cblx0LyoqXG5cdCAqIERlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGEgcm9sbE91dDNkIGV2ZW50IG9iamVjdC5cblx0ICovXG4vL1x0XHRwdWJsaWMgc3RhdGljIFJPTExfT1VUIDogc3RyaW5nID0gXCJyb2xsT3V0M2RcIjtcblxuXHQvKipcblx0ICogRGVmaW5lcyB0aGUgdmFsdWUgb2YgdGhlIHR5cGUgcHJvcGVydHkgb2YgYSBjbGljazNkIGV2ZW50IG9iamVjdC5cblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgQ0xJQ0s6c3RyaW5nID0gXCJjbGljazNkXCI7XG5cblx0LyoqXG5cdCAqIERlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGEgZG91YmxlQ2xpY2szZCBldmVudCBvYmplY3QuXG5cdCAqL1xuXHRwdWJsaWMgc3RhdGljIERPVUJMRV9DTElDSzpzdHJpbmcgPSBcImRvdWJsZUNsaWNrM2RcIjtcblxuXHQvKipcblx0ICogRGVmaW5lcyB0aGUgdmFsdWUgb2YgdGhlIHR5cGUgcHJvcGVydHkgb2YgYSBtb3VzZVdoZWVsM2QgZXZlbnQgb2JqZWN0LlxuXHQgKi9cblx0cHVibGljIHN0YXRpYyBNT1VTRV9XSEVFTDpzdHJpbmcgPSBcIm1vdXNlV2hlZWwzZFwiO1xuXG5cdC8qKlxuXHQgKiBUaGUgaG9yaXpvbnRhbCBjb29yZGluYXRlIGF0IHdoaWNoIHRoZSBldmVudCBvY2N1cnJlZCBpbiB2aWV3IGNvb3JkaW5hdGVzLlxuXHQgKi9cblx0cHVibGljIHNjcmVlblg6bnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBUaGUgdmVydGljYWwgY29vcmRpbmF0ZSBhdCB3aGljaCB0aGUgZXZlbnQgb2NjdXJyZWQgaW4gdmlldyBjb29yZGluYXRlcy5cblx0ICovXG5cdHB1YmxpYyBzY3JlZW5ZOm51bWJlcjtcblxuXHQvKipcblx0ICogVGhlIHZpZXcgb2JqZWN0IGluc2lkZSB3aGljaCB0aGUgZXZlbnQgdG9vayBwbGFjZS5cblx0ICovXG5cdHB1YmxpYyB2aWV3OlZpZXc7XG5cblx0LyoqXG5cdCAqIFRoZSAzZCBvYmplY3QgaW5zaWRlIHdoaWNoIHRoZSBldmVudCB0b29rIHBsYWNlLlxuXHQgKi9cblx0cHVibGljIG9iamVjdDpEaXNwbGF5T2JqZWN0O1xuXG5cdC8qKlxuXHQgKiBUaGUgcmVuZGVyYWJsZSBvd25lciBpbnNpZGUgd2hpY2ggdGhlIGV2ZW50IHRvb2sgcGxhY2UuXG5cdCAqL1xuXHRwdWJsaWMgcmVuZGVyYWJsZU93bmVyOklSZW5kZXJhYmxlT3duZXI7XG5cblx0LyoqXG5cdCAqIFRoZSBtYXRlcmlhbCBvZiB0aGUgM2QgZWxlbWVudCBpbnNpZGUgd2hpY2ggdGhlIGV2ZW50IHRvb2sgcGxhY2UuXG5cdCAqL1xuXHRwdWJsaWMgbWF0ZXJpYWw6TWF0ZXJpYWxCYXNlO1xuXG5cdC8qKlxuXHQgKiBUaGUgdXYgY29vcmRpbmF0ZSBpbnNpZGUgdGhlIGRyYXcgcHJpbWl0aXZlIHdoZXJlIHRoZSBldmVudCB0b29rIHBsYWNlLlxuXHQgKi9cblx0cHVibGljIHV2OlBvaW50O1xuXG5cdC8qKlxuXHQgKiBUaGUgaW5kZXggb2YgdGhlIGZhY2Ugd2hlcmUgdGhlIGV2ZW50IHRvb2sgcGxhY2UuXG5cdCAqL1xuXHRwdWJsaWMgaW5kZXg6bnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBUaGUgaW5kZXggb2YgdGhlIHN1Ykdlb21ldHJ5IHdoZXJlIHRoZSBldmVudCB0b29rIHBsYWNlLlxuXHQgKi9cblx0cHVibGljIHN1Ykdlb21ldHJ5SW5kZXg6bnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBUaGUgcG9zaXRpb24gaW4gb2JqZWN0IHNwYWNlIHdoZXJlIHRoZSBldmVudCB0b29rIHBsYWNlXG5cdCAqL1xuXHRwdWJsaWMgbG9jYWxQb3NpdGlvbjpWZWN0b3IzRDtcblxuXHQvKipcblx0ICogVGhlIG5vcm1hbCBpbiBvYmplY3Qgc3BhY2Ugd2hlcmUgdGhlIGV2ZW50IHRvb2sgcGxhY2Vcblx0ICovXG5cdHB1YmxpYyBsb2NhbE5vcm1hbDpWZWN0b3IzRDtcblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIENvbnRyb2wga2V5IGlzIGFjdGl2ZSAodHJ1ZSkgb3IgaW5hY3RpdmUgKGZhbHNlKS5cblx0ICovXG5cdHB1YmxpYyBjdHJsS2V5OmJvb2xlYW47XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBBbHQga2V5IGlzIGFjdGl2ZSAodHJ1ZSkgb3IgaW5hY3RpdmUgKGZhbHNlKS5cblx0ICovXG5cdHB1YmxpYyBhbHRLZXk6Ym9vbGVhbjtcblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIFNoaWZ0IGtleSBpcyBhY3RpdmUgKHRydWUpIG9yIGluYWN0aXZlIChmYWxzZSkuXG5cdCAqL1xuXHRwdWJsaWMgc2hpZnRLZXk6Ym9vbGVhbjtcblxuXHQvKipcblx0ICogSW5kaWNhdGVzIGhvdyBtYW55IGxpbmVzIHNob3VsZCBiZSBzY3JvbGxlZCBmb3IgZWFjaCB1bml0IHRoZSB1c2VyIHJvdGF0ZXMgdGhlIG1vdXNlIHdoZWVsLlxuXHQgKi9cblx0cHVibGljIGRlbHRhOm51bWJlcjtcblxuXHQvKipcblx0ICogQ3JlYXRlIGEgbmV3IE1vdXNlRXZlbnQgb2JqZWN0LlxuXHQgKiBAcGFyYW0gdHlwZSBUaGUgdHlwZSBvZiB0aGUgTW91c2VFdmVudC5cblx0ICovXG5cdGNvbnN0cnVjdG9yKHR5cGU6c3RyaW5nKVxuXHR7XG5cdFx0c3VwZXIodHlwZSk7XG5cdH1cblxuXHQvKipcblx0ICogQGluaGVyaXREb2Ncblx0ICovXG5cdHB1YmxpYyBnZXQgYnViYmxlcygpOmJvb2xlYW5cblx0e1xuXHRcdHZhciBkb2VzQnViYmxlOmJvb2xlYW4gPSB0aGlzLl9pQWxsb3dlZFRvUHJvcGFnYXRlO1xuXHRcdHRoaXMuX2lBbGxvd2VkVG9Qcm9wYWdhdGUgPSB0cnVlO1xuXG5cdFx0Ly8gRG9uJ3QgYnViYmxlIGlmIHByb3BhZ2F0aW9uIGhhcyBiZWVuIHN0b3BwZWQuXG5cdFx0cmV0dXJuIGRvZXNCdWJibGU7XG5cdH1cblxuXHQvKipcblx0ICogQGluaGVyaXREb2Ncblx0ICovXG5cdHB1YmxpYyBzdG9wUHJvcGFnYXRpb24oKVxuXHR7XG5cdFx0dGhpcy5faUFsbG93ZWRUb1Byb3BhZ2F0ZSA9IGZhbHNlO1xuXG5cdFx0aWYgKHRoaXMuX2lQYXJlbnRFdmVudClcblx0XHRcdHRoaXMuX2lQYXJlbnRFdmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAaW5oZXJpdERvY1xuXHQgKi9cblx0cHVibGljIHN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpXG5cdHtcblx0XHR0aGlzLl9pQWxsb3dlZFRvUHJvcGFnYXRlID0gZmFsc2U7XG5cblx0XHRpZiAodGhpcy5faVBhcmVudEV2ZW50KVxuXHRcdFx0dGhpcy5faVBhcmVudEV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBjb3B5IG9mIHRoZSBNb3VzZUV2ZW50IG9iamVjdCBhbmQgc2V0cyB0aGUgdmFsdWUgb2YgZWFjaCBwcm9wZXJ0eSB0byBtYXRjaCB0aGF0IG9mIHRoZSBvcmlnaW5hbC5cblx0ICovXG5cdHB1YmxpYyBjbG9uZSgpOkV2ZW50XG5cdHtcblx0XHR2YXIgcmVzdWx0Ok1vdXNlRXZlbnQgPSBuZXcgTW91c2VFdmVudCh0aGlzLnR5cGUpO1xuXG5cdFx0LyogVE9ETzogRGVidWcgLyB0ZXN0IC0gbG9vayBpbnRvIGlzRGVmYXVsdFByZXZlbnRlZFxuXHRcdCBpZiAoaXNEZWZhdWx0UHJldmVudGVkKCkpXG5cdFx0IHJlc3VsdC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdCAqL1xuXG5cdFx0cmVzdWx0LnNjcmVlblggPSB0aGlzLnNjcmVlblg7XG5cdFx0cmVzdWx0LnNjcmVlblkgPSB0aGlzLnNjcmVlblk7XG5cblx0XHRyZXN1bHQudmlldyA9IHRoaXMudmlldztcblx0XHRyZXN1bHQub2JqZWN0ID0gdGhpcy5vYmplY3Q7XG5cdFx0cmVzdWx0LnJlbmRlcmFibGVPd25lciA9IHRoaXMucmVuZGVyYWJsZU93bmVyO1xuXHRcdHJlc3VsdC5tYXRlcmlhbCA9IHRoaXMubWF0ZXJpYWw7XG5cdFx0cmVzdWx0LnV2ID0gdGhpcy51djtcblx0XHRyZXN1bHQubG9jYWxQb3NpdGlvbiA9IHRoaXMubG9jYWxQb3NpdGlvbjtcblx0XHRyZXN1bHQubG9jYWxOb3JtYWwgPSB0aGlzLmxvY2FsTm9ybWFsO1xuXHRcdHJlc3VsdC5pbmRleCA9IHRoaXMuaW5kZXg7XG5cdFx0cmVzdWx0LnN1Ykdlb21ldHJ5SW5kZXggPSB0aGlzLnN1Ykdlb21ldHJ5SW5kZXg7XG5cdFx0cmVzdWx0LmRlbHRhID0gdGhpcy5kZWx0YTtcblxuXHRcdHJlc3VsdC5jdHJsS2V5ID0gdGhpcy5jdHJsS2V5O1xuXHRcdHJlc3VsdC5zaGlmdEtleSA9IHRoaXMuc2hpZnRLZXk7XG5cblx0XHRyZXN1bHQuX2lQYXJlbnRFdmVudCA9IHRoaXM7XG5cdFx0cmVzdWx0Ll9pQWxsb3dlZFRvUHJvcGFnYXRlID0gdGhpcy5faUFsbG93ZWRUb1Byb3BhZ2F0ZTtcblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIHBvc2l0aW9uIGluIHNjZW5lIHNwYWNlIHdoZXJlIHRoZSBldmVudCB0b29rIHBsYWNlXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHNjZW5lUG9zaXRpb24oKTpWZWN0b3IzRFxuXHR7XG5cdFx0cmV0dXJuIHRoaXMub2JqZWN0LnNjZW5lVHJhbnNmb3JtLnRyYW5zZm9ybVZlY3Rvcih0aGlzLmxvY2FsUG9zaXRpb24pO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBub3JtYWwgaW4gc2NlbmUgc3BhY2Ugd2hlcmUgdGhlIGV2ZW50IHRvb2sgcGxhY2Vcblx0ICovXG5cdHB1YmxpYyBnZXQgc2NlbmVOb3JtYWwoKTpWZWN0b3IzRFxuXHR7XG5cdFx0dmFyIHNjZW5lTm9ybWFsOlZlY3RvcjNEID0gdGhpcy5vYmplY3Quc2NlbmVUcmFuc2Zvcm0uZGVsdGFUcmFuc2Zvcm1WZWN0b3IodGhpcy5sb2NhbE5vcm1hbCk7XG5cdFx0c2NlbmVOb3JtYWwubm9ybWFsaXplKCk7XG5cblx0XHRyZXR1cm4gc2NlbmVOb3JtYWw7XG5cdH1cbn1cblxuZXhwb3J0ID0gTW91c2VFdmVudDsiXX0=