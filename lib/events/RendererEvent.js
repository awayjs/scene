var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Event = require("awayjs-core/lib/events/Event");
var RendererEvent = (function (_super) {
    __extends(RendererEvent, _super);
    function RendererEvent(type) {
        _super.call(this, type);
    }
    RendererEvent.VIEWPORT_UPDATED = "viewportUpdated";
    RendererEvent.SCISSOR_UPDATED = "scissorUpdated";
    return RendererEvent;
})(Event);
module.exports = RendererEvent;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9ldmVudHMvUmVuZGVyZXJFdmVudC50cyJdLCJuYW1lcyI6WyJSZW5kZXJlckV2ZW50IiwiUmVuZGVyZXJFdmVudC5jb25zdHJ1Y3RvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTyxLQUFLLFdBQWUsOEJBQThCLENBQUMsQ0FBQztBQUUzRCxJQUFNLGFBQWE7SUFBU0EsVUFBdEJBLGFBQWFBLFVBQWNBO0lBS2hDQSxTQUxLQSxhQUFhQSxDQUtOQSxJQUFXQTtRQUV0QkMsa0JBQU1BLElBQUlBLENBQUNBLENBQUNBO0lBQ2JBLENBQUNBO0lBTmFELDhCQUFnQkEsR0FBVUEsaUJBQWlCQSxDQUFDQTtJQUM1Q0EsNkJBQWVBLEdBQVVBLGdCQUFnQkEsQ0FBQ0E7SUFNekRBLG9CQUFDQTtBQUFEQSxDQVRBLEFBU0NBLEVBVDJCLEtBQUssRUFTaEM7QUFFRCxBQUF1QixpQkFBZCxhQUFhLENBQUMiLCJmaWxlIjoiZXZlbnRzL1JlbmRlcmVyRXZlbnQuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEV2ZW50XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvRXZlbnRcIik7XG5cbmNsYXNzIFJlbmRlcmVyRXZlbnQgZXh0ZW5kcyBFdmVudFxue1xuXHRwdWJsaWMgc3RhdGljIFZJRVdQT1JUX1VQREFURUQ6c3RyaW5nID0gXCJ2aWV3cG9ydFVwZGF0ZWRcIjtcblx0cHVibGljIHN0YXRpYyBTQ0lTU09SX1VQREFURUQ6c3RyaW5nID0gXCJzY2lzc29yVXBkYXRlZFwiO1xuXG5cdGNvbnN0cnVjdG9yKHR5cGU6c3RyaW5nKVxuXHR7XG5cdFx0c3VwZXIodHlwZSk7XG5cdH1cbn1cblxuZXhwb3J0ID0gUmVuZGVyZXJFdmVudDsiXX0=