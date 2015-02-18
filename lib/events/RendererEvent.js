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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9ldmVudHMvUmVuZGVyZXJFdmVudC50cyJdLCJuYW1lcyI6WyJSZW5kZXJlckV2ZW50IiwiUmVuZGVyZXJFdmVudC5jb25zdHJ1Y3RvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTyxLQUFLLFdBQWUsOEJBQThCLENBQUMsQ0FBQztBQUUzRCxJQUFNLGFBQWE7SUFBU0EsVUFBdEJBLGFBQWFBLFVBQWNBO0lBS2hDQSxTQUxLQSxhQUFhQSxDQUtOQSxJQUFXQTtRQUV0QkMsa0JBQU1BLElBQUlBLENBQUNBLENBQUNBO0lBQ2JBLENBQUNBO0lBTmFELDhCQUFnQkEsR0FBVUEsaUJBQWlCQSxDQUFDQTtJQUM1Q0EsNkJBQWVBLEdBQVVBLGdCQUFnQkEsQ0FBQ0E7SUFNekRBLG9CQUFDQTtBQUFEQSxDQVRBLEFBU0NBLEVBVDJCLEtBQUssRUFTaEM7QUFFRCxBQUF1QixpQkFBZCxhQUFhLENBQUMiLCJmaWxlIjoiZXZlbnRzL1JlbmRlcmVyRXZlbnQuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEV2ZW50XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvRXZlbnRcIik7XHJcblxyXG5jbGFzcyBSZW5kZXJlckV2ZW50IGV4dGVuZHMgRXZlbnRcclxue1xyXG5cdHB1YmxpYyBzdGF0aWMgVklFV1BPUlRfVVBEQVRFRDpzdHJpbmcgPSBcInZpZXdwb3J0VXBkYXRlZFwiO1xyXG5cdHB1YmxpYyBzdGF0aWMgU0NJU1NPUl9VUERBVEVEOnN0cmluZyA9IFwic2Npc3NvclVwZGF0ZWRcIjtcclxuXHJcblx0Y29uc3RydWN0b3IodHlwZTpzdHJpbmcpXHJcblx0e1xyXG5cdFx0c3VwZXIodHlwZSk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgPSBSZW5kZXJlckV2ZW50OyJdfQ==