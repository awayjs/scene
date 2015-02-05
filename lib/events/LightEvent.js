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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9ldmVudHMvbGlnaHRldmVudC50cyJdLCJuYW1lcyI6WyJMaWdodEV2ZW50IiwiTGlnaHRFdmVudC5jb25zdHJ1Y3RvciIsIkxpZ2h0RXZlbnQuY2xvbmUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQU8sS0FBSyxXQUFlLDhCQUE4QixDQUFDLENBQUM7QUFFM0QsSUFBTSxVQUFVO0lBQVNBLFVBQW5CQSxVQUFVQSxVQUFjQTtJQUs3QkEsU0FMS0EsVUFBVUEsQ0FLSEEsSUFBV0E7UUFFdEJDLGtCQUFNQSxJQUFJQSxDQUFDQSxDQUFDQTtJQUNiQSxDQUFDQTtJQUVERCxXQUFXQTtJQUNKQSwwQkFBS0EsR0FBWkE7UUFFQ0UsTUFBTUEsQ0FBQ0EsSUFBSUEsVUFBVUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7SUFDbENBLENBQUNBO0lBWGFGLDhCQUFtQkEsR0FBVUEsbUJBQW1CQSxDQUFDQTtJQVloRUEsaUJBQUNBO0FBQURBLENBZkEsQUFlQ0EsRUFmd0IsS0FBSyxFQWU3QjtBQUVELEFBQW9CLGlCQUFYLFVBQVUsQ0FBQyIsImZpbGUiOiJldmVudHMvTGlnaHRFdmVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXZlbnRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2V2ZW50cy9FdmVudFwiKTtcblxuY2xhc3MgTGlnaHRFdmVudCBleHRlbmRzIEV2ZW50XG57XG5cblx0cHVibGljIHN0YXRpYyBDQVNUU19TSEFET1dfQ0hBTkdFOnN0cmluZyA9IFwiY2FzdHNTaGFkb3dDaGFuZ2VcIjtcblxuXHRjb25zdHJ1Y3Rvcih0eXBlOnN0cmluZylcblx0e1xuXHRcdHN1cGVyKHR5cGUpO1xuXHR9XG5cblx0Ly9Ab3ZlcnJpZGVcblx0cHVibGljIGNsb25lKCk6RXZlbnRcblx0e1xuXHRcdHJldHVybiBuZXcgTGlnaHRFdmVudCh0aGlzLnR5cGUpO1xuXHR9XG59XG5cbmV4cG9ydCA9IExpZ2h0RXZlbnQ7Il19