var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var HoverController = require("awayjs-display/lib/controllers/HoverController");
/**
 * Controller used to follow behind an object on the XZ plane, with an optional
 * elevation (tiltAngle).
 *
 * @see    away3d.containers.View3D
 */
var FollowController = (function (_super) {
    __extends(FollowController, _super);
    function FollowController(targetObject, lookAtObject, tiltAngle, distance) {
        if (targetObject === void 0) { targetObject = null; }
        if (lookAtObject === void 0) { lookAtObject = null; }
        if (tiltAngle === void 0) { tiltAngle = 45; }
        if (distance === void 0) { distance = 700; }
        _super.call(this, targetObject, lookAtObject, 0, tiltAngle, distance);
    }
    FollowController.prototype.update = function (interpolate) {
        if (interpolate === void 0) { interpolate = true; }
        interpolate = interpolate; // unused: prevents warning
        if (!this.lookAtObject)
            return;
        this.panAngle = this._pLookAtObject.rotationY - 180;
        _super.prototype.update.call(this);
    };
    return FollowController;
})(HoverController);
module.exports = FollowController;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9jb250cm9sbGVycy9Gb2xsb3dDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbIkZvbGxvd0NvbnRyb2xsZXIiLCJGb2xsb3dDb250cm9sbGVyLmNvbnN0cnVjdG9yIiwiRm9sbG93Q29udHJvbGxlci51cGRhdGUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLElBQU8sZUFBZSxXQUFhLGdEQUFnRCxDQUFDLENBQUM7QUFFckYsQUFNQTs7Ozs7R0FERztJQUNHLGdCQUFnQjtJQUFTQSxVQUF6QkEsZ0JBQWdCQSxVQUF3QkE7SUFFN0NBLFNBRktBLGdCQUFnQkEsQ0FFVEEsWUFBaUNBLEVBQUVBLFlBQWlDQSxFQUFFQSxTQUFxQkEsRUFBRUEsUUFBcUJBO1FBQWxIQyw0QkFBaUNBLEdBQWpDQSxtQkFBaUNBO1FBQUVBLDRCQUFpQ0EsR0FBakNBLG1CQUFpQ0E7UUFBRUEseUJBQXFCQSxHQUFyQkEsY0FBcUJBO1FBQUVBLHdCQUFxQkEsR0FBckJBLGNBQXFCQTtRQUU3SEEsa0JBQU1BLFlBQVlBLEVBQUVBLFlBQVlBLEVBQUVBLENBQUNBLEVBQUVBLFNBQVNBLEVBQUVBLFFBQVFBLENBQUNBLENBQUNBO0lBQzNEQSxDQUFDQTtJQUVNRCxpQ0FBTUEsR0FBYkEsVUFBY0EsV0FBMEJBO1FBQTFCRSwyQkFBMEJBLEdBQTFCQSxrQkFBMEJBO1FBRXZDQSxXQUFXQSxHQUFHQSxXQUFXQSxFQUFFQSwyQkFBMkJBO1FBRXREQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQTtZQUN0QkEsTUFBTUEsQ0FBQ0E7UUFFUkEsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsU0FBU0EsR0FBR0EsR0FBR0EsQ0FBQ0E7UUFDcERBLGdCQUFLQSxDQUFDQSxNQUFNQSxXQUFFQSxDQUFDQTtJQUNoQkEsQ0FBQ0E7SUFDRkYsdUJBQUNBO0FBQURBLENBakJBLEFBaUJDQSxFQWpCOEIsZUFBZSxFQWlCN0M7QUFFRCxBQUEwQixpQkFBakIsZ0JBQWdCLENBQUMiLCJmaWxlIjoiY29udHJvbGxlcnMvRm9sbG93Q29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRGlzcGxheU9iamVjdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0Rpc3BsYXlPYmplY3RcIik7XHJcbmltcG9ydCBIb3ZlckNvbnRyb2xsZXJcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvY29udHJvbGxlcnMvSG92ZXJDb250cm9sbGVyXCIpO1xyXG5cclxuLyoqXHJcbiAqIENvbnRyb2xsZXIgdXNlZCB0byBmb2xsb3cgYmVoaW5kIGFuIG9iamVjdCBvbiB0aGUgWFogcGxhbmUsIHdpdGggYW4gb3B0aW9uYWxcclxuICogZWxldmF0aW9uICh0aWx0QW5nbGUpLlxyXG4gKlxyXG4gKiBAc2VlICAgIGF3YXkzZC5jb250YWluZXJzLlZpZXczRFxyXG4gKi9cclxuY2xhc3MgRm9sbG93Q29udHJvbGxlciBleHRlbmRzIEhvdmVyQ29udHJvbGxlclxyXG57XHJcblx0Y29uc3RydWN0b3IodGFyZ2V0T2JqZWN0OkRpc3BsYXlPYmplY3QgPSBudWxsLCBsb29rQXRPYmplY3Q6RGlzcGxheU9iamVjdCA9IG51bGwsIHRpbHRBbmdsZTpudW1iZXIgPSA0NSwgZGlzdGFuY2U6bnVtYmVyID0gNzAwKVxyXG5cdHtcclxuXHRcdHN1cGVyKHRhcmdldE9iamVjdCwgbG9va0F0T2JqZWN0LCAwLCB0aWx0QW5nbGUsIGRpc3RhbmNlKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyB1cGRhdGUoaW50ZXJwb2xhdGU6Ym9vbGVhbiA9IHRydWUpXHJcblx0e1xyXG5cdFx0aW50ZXJwb2xhdGUgPSBpbnRlcnBvbGF0ZTsgLy8gdW51c2VkOiBwcmV2ZW50cyB3YXJuaW5nXHJcblxyXG5cdFx0aWYgKCF0aGlzLmxvb2tBdE9iamVjdClcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMucGFuQW5nbGUgPSB0aGlzLl9wTG9va0F0T2JqZWN0LnJvdGF0aW9uWSAtIDE4MDtcclxuXHRcdHN1cGVyLnVwZGF0ZSgpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0ID0gRm9sbG93Q29udHJvbGxlcjsiXX0=