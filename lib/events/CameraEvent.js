var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Event = require("awayjs-core/lib/events/Event");
/**
 * @class away.events.CameraEvent
 */
var CameraEvent = (function (_super) {
    __extends(CameraEvent, _super);
    function CameraEvent(type, camera) {
        _super.call(this, type);
        this._camera = camera;
    }
    Object.defineProperty(CameraEvent.prototype, "camera", {
        get: function () {
            return this._camera;
        },
        enumerable: true,
        configurable: true
    });
    CameraEvent.PROJECTION_CHANGED = "projectionChanged";
    return CameraEvent;
})(Event);
module.exports = CameraEvent;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9ldmVudHMvQ2FtZXJhRXZlbnQudHMiXSwibmFtZXMiOlsiQ2FtZXJhRXZlbnQiLCJDYW1lcmFFdmVudC5jb25zdHJ1Y3RvciIsIkNhbWVyYUV2ZW50LmNhbWVyYSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTyxLQUFLLFdBQWUsOEJBQThCLENBQUMsQ0FBQztBQUkzRCxBQUdBOztHQURHO0lBQ0csV0FBVztJQUFTQSxVQUFwQkEsV0FBV0EsVUFBY0E7SUFNOUJBLFNBTktBLFdBQVdBLENBTUpBLElBQVdBLEVBQUVBLE1BQWFBO1FBRXJDQyxrQkFBTUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUFFWkEsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsTUFBTUEsQ0FBQ0E7SUFDdkJBLENBQUNBO0lBRURELHNCQUFXQSwrQkFBTUE7YUFBakJBO1lBRUNFLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBO1FBQ3JCQSxDQUFDQTs7O09BQUFGO0lBZGFBLDhCQUFrQkEsR0FBVUEsbUJBQW1CQSxDQUFDQTtJQWUvREEsa0JBQUNBO0FBQURBLENBakJBLEFBaUJDQSxFQWpCeUIsS0FBSyxFQWlCOUI7QUFFRCxBQUFxQixpQkFBWixXQUFXLENBQUMiLCJmaWxlIjoiZXZlbnRzL0NhbWVyYUV2ZW50LmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFdmVudFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0V2ZW50XCIpO1xyXG5cclxuaW1wb3J0IENhbWVyYVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZW50aXRpZXMvQ2FtZXJhXCIpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBhd2F5LmV2ZW50cy5DYW1lcmFFdmVudFxyXG4gKi9cclxuY2xhc3MgQ2FtZXJhRXZlbnQgZXh0ZW5kcyBFdmVudFxyXG57XHJcblx0cHVibGljIHN0YXRpYyBQUk9KRUNUSU9OX0NIQU5HRUQ6c3RyaW5nID0gXCJwcm9qZWN0aW9uQ2hhbmdlZFwiO1xyXG5cclxuXHRwcml2YXRlIF9jYW1lcmE6Q2FtZXJhO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcih0eXBlOnN0cmluZywgY2FtZXJhOkNhbWVyYSlcclxuXHR7XHJcblx0XHRzdXBlcih0eXBlKTtcclxuXHJcblx0XHR0aGlzLl9jYW1lcmEgPSBjYW1lcmE7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0IGNhbWVyYSgpOkNhbWVyYVxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9jYW1lcmE7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgPSBDYW1lcmFFdmVudDsiXX0=