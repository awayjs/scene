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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9ldmVudHMvY2FtZXJhZXZlbnQudHMiXSwibmFtZXMiOlsiQ2FtZXJhRXZlbnQiLCJDYW1lcmFFdmVudC5jb25zdHJ1Y3RvciIsIkNhbWVyYUV2ZW50LmNhbWVyYSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTyxLQUFLLFdBQWUsOEJBQThCLENBQUMsQ0FBQztBQUkzRCxBQUdBOztHQURHO0lBQ0csV0FBVztJQUFTQSxVQUFwQkEsV0FBV0EsVUFBY0E7SUFNOUJBLFNBTktBLFdBQVdBLENBTUpBLElBQVdBLEVBQUVBLE1BQWFBO1FBRXJDQyxrQkFBTUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUFFWkEsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsTUFBTUEsQ0FBQ0E7SUFDdkJBLENBQUNBO0lBRURELHNCQUFXQSwrQkFBTUE7YUFBakJBO1lBRUNFLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBO1FBQ3JCQSxDQUFDQTs7O09BQUFGO0lBZGFBLDhCQUFrQkEsR0FBVUEsbUJBQW1CQSxDQUFDQTtJQWUvREEsa0JBQUNBO0FBQURBLENBakJBLEFBaUJDQSxFQWpCeUIsS0FBSyxFQWlCOUI7QUFFRCxBQUFxQixpQkFBWixXQUFXLENBQUMiLCJmaWxlIjoiZXZlbnRzL0NhbWVyYUV2ZW50LmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFdmVudFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0V2ZW50XCIpO1xuXG5pbXBvcnQgQ2FtZXJhXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9DYW1lcmFcIik7XG5cbi8qKlxuICogQGNsYXNzIGF3YXkuZXZlbnRzLkNhbWVyYUV2ZW50XG4gKi9cbmNsYXNzIENhbWVyYUV2ZW50IGV4dGVuZHMgRXZlbnRcbntcblx0cHVibGljIHN0YXRpYyBQUk9KRUNUSU9OX0NIQU5HRUQ6c3RyaW5nID0gXCJwcm9qZWN0aW9uQ2hhbmdlZFwiO1xuXG5cdHByaXZhdGUgX2NhbWVyYTpDYW1lcmE7XG5cblx0Y29uc3RydWN0b3IodHlwZTpzdHJpbmcsIGNhbWVyYTpDYW1lcmEpXG5cdHtcblx0XHRzdXBlcih0eXBlKTtcblxuXHRcdHRoaXMuX2NhbWVyYSA9IGNhbWVyYTtcblx0fVxuXG5cdHB1YmxpYyBnZXQgY2FtZXJhKCk6Q2FtZXJhXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fY2FtZXJhO1xuXHR9XG59XG5cbmV4cG9ydCA9IENhbWVyYUV2ZW50OyJdfQ==