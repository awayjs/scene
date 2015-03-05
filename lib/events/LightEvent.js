var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Event = require("awayjs-core/lib/events/Event");
var LightEvent = (function (_super) {
    __extends(LightEvent, _super);
    function LightEvent(type) {
        _super.call(this, type);
    }
    //@override
    LightEvent.prototype.clone = function () {
        return new LightEvent(this.type);
    };
    LightEvent.CASTS_SHADOW_CHANGE = "castsShadowChange";
    return LightEvent;
})(Event);
module.exports = LightEvent;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9ldmVudHMvTGlnaHRFdmVudC50cyJdLCJuYW1lcyI6WyJMaWdodEV2ZW50IiwiTGlnaHRFdmVudC5jb25zdHJ1Y3RvciIsIkxpZ2h0RXZlbnQuY2xvbmUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQU8sS0FBSyxXQUFlLDhCQUE4QixDQUFDLENBQUM7QUFFM0QsSUFBTSxVQUFVO0lBQVNBLFVBQW5CQSxVQUFVQSxVQUFjQTtJQUs3QkEsU0FMS0EsVUFBVUEsQ0FLSEEsSUFBV0E7UUFFdEJDLGtCQUFNQSxJQUFJQSxDQUFDQSxDQUFDQTtJQUNiQSxDQUFDQTtJQUVERCxXQUFXQTtJQUNKQSwwQkFBS0EsR0FBWkE7UUFFQ0UsTUFBTUEsQ0FBQ0EsSUFBSUEsVUFBVUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7SUFDbENBLENBQUNBO0lBWGFGLDhCQUFtQkEsR0FBVUEsbUJBQW1CQSxDQUFDQTtJQVloRUEsaUJBQUNBO0FBQURBLENBZkEsQUFlQ0EsRUFmd0IsS0FBSyxFQWU3QjtBQUVELEFBQW9CLGlCQUFYLFVBQVUsQ0FBQyIsImZpbGUiOiJldmVudHMvTGlnaHRFdmVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXZlbnRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2V2ZW50cy9FdmVudFwiKTtcclxuXHJcbmNsYXNzIExpZ2h0RXZlbnQgZXh0ZW5kcyBFdmVudFxyXG57XHJcblxyXG5cdHB1YmxpYyBzdGF0aWMgQ0FTVFNfU0hBRE9XX0NIQU5HRTpzdHJpbmcgPSBcImNhc3RzU2hhZG93Q2hhbmdlXCI7XHJcblxyXG5cdGNvbnN0cnVjdG9yKHR5cGU6c3RyaW5nKVxyXG5cdHtcclxuXHRcdHN1cGVyKHR5cGUpO1xyXG5cdH1cclxuXHJcblx0Ly9Ab3ZlcnJpZGVcclxuXHRwdWJsaWMgY2xvbmUoKTpFdmVudFxyXG5cdHtcclxuXHRcdHJldHVybiBuZXcgTGlnaHRFdmVudCh0aGlzLnR5cGUpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0ID0gTGlnaHRFdmVudDsiXX0=