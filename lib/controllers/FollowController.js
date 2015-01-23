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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9jb250cm9sbGVycy9mb2xsb3djb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbIkZvbGxvd0NvbnRyb2xsZXIiLCJGb2xsb3dDb250cm9sbGVyLmNvbnN0cnVjdG9yIiwiRm9sbG93Q29udHJvbGxlci51cGRhdGUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLElBQU8sZUFBZSxXQUFhLGdEQUFnRCxDQUFDLENBQUM7QUFFckYsQUFNQTs7Ozs7R0FERztJQUNHLGdCQUFnQjtJQUFTQSxVQUF6QkEsZ0JBQWdCQSxVQUF3QkE7SUFFN0NBLFNBRktBLGdCQUFnQkEsQ0FFVEEsWUFBaUNBLEVBQUVBLFlBQWlDQSxFQUFFQSxTQUFxQkEsRUFBRUEsUUFBcUJBO1FBQWxIQyw0QkFBaUNBLEdBQWpDQSxtQkFBaUNBO1FBQUVBLDRCQUFpQ0EsR0FBakNBLG1CQUFpQ0E7UUFBRUEseUJBQXFCQSxHQUFyQkEsY0FBcUJBO1FBQUVBLHdCQUFxQkEsR0FBckJBLGNBQXFCQTtRQUU3SEEsa0JBQU1BLFlBQVlBLEVBQUVBLFlBQVlBLEVBQUVBLENBQUNBLEVBQUVBLFNBQVNBLEVBQUVBLFFBQVFBLENBQUNBLENBQUNBO0lBQzNEQSxDQUFDQTtJQUVNRCxpQ0FBTUEsR0FBYkEsVUFBY0EsV0FBMEJBO1FBQTFCRSwyQkFBMEJBLEdBQTFCQSxrQkFBMEJBO1FBRXZDQSxXQUFXQSxHQUFHQSxXQUFXQSxFQUFFQSwyQkFBMkJBO1FBRXREQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQTtZQUN0QkEsTUFBTUEsQ0FBQ0E7UUFFUkEsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsU0FBU0EsR0FBR0EsR0FBR0EsQ0FBQ0E7UUFDcERBLGdCQUFLQSxDQUFDQSxNQUFNQSxXQUFFQSxDQUFDQTtJQUNoQkEsQ0FBQ0E7SUFDRkYsdUJBQUNBO0FBQURBLENBakJBLEFBaUJDQSxFQWpCOEIsZUFBZSxFQWlCN0M7QUFFRCxBQUEwQixpQkFBakIsZ0JBQWdCLENBQUMiLCJmaWxlIjoiY29udHJvbGxlcnMvRm9sbG93Q29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRGlzcGxheU9iamVjdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0Rpc3BsYXlPYmplY3RcIik7XG5pbXBvcnQgSG92ZXJDb250cm9sbGVyXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2NvbnRyb2xsZXJzL0hvdmVyQ29udHJvbGxlclwiKTtcblxuLyoqXG4gKiBDb250cm9sbGVyIHVzZWQgdG8gZm9sbG93IGJlaGluZCBhbiBvYmplY3Qgb24gdGhlIFhaIHBsYW5lLCB3aXRoIGFuIG9wdGlvbmFsXG4gKiBlbGV2YXRpb24gKHRpbHRBbmdsZSkuXG4gKlxuICogQHNlZSAgICBhd2F5M2QuY29udGFpbmVycy5WaWV3M0RcbiAqL1xuY2xhc3MgRm9sbG93Q29udHJvbGxlciBleHRlbmRzIEhvdmVyQ29udHJvbGxlclxue1xuXHRjb25zdHJ1Y3Rvcih0YXJnZXRPYmplY3Q6RGlzcGxheU9iamVjdCA9IG51bGwsIGxvb2tBdE9iamVjdDpEaXNwbGF5T2JqZWN0ID0gbnVsbCwgdGlsdEFuZ2xlOm51bWJlciA9IDQ1LCBkaXN0YW5jZTpudW1iZXIgPSA3MDApXG5cdHtcblx0XHRzdXBlcih0YXJnZXRPYmplY3QsIGxvb2tBdE9iamVjdCwgMCwgdGlsdEFuZ2xlLCBkaXN0YW5jZSk7XG5cdH1cblxuXHRwdWJsaWMgdXBkYXRlKGludGVycG9sYXRlOmJvb2xlYW4gPSB0cnVlKVxuXHR7XG5cdFx0aW50ZXJwb2xhdGUgPSBpbnRlcnBvbGF0ZTsgLy8gdW51c2VkOiBwcmV2ZW50cyB3YXJuaW5nXG5cblx0XHRpZiAoIXRoaXMubG9va0F0T2JqZWN0KVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5wYW5BbmdsZSA9IHRoaXMuX3BMb29rQXRPYmplY3Qucm90YXRpb25ZIC0gMTgwO1xuXHRcdHN1cGVyLnVwZGF0ZSgpO1xuXHR9XG59XG5cbmV4cG9ydCA9IEZvbGxvd0NvbnRyb2xsZXI7Il19