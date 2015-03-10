var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var PlaneClassification = require("awayjs-core/lib/geom/PlaneClassification");
var BoundingVolumeBase = require("awayjs-display/lib/bounds/BoundingVolumeBase");
var NullBounds = (function (_super) {
    __extends(NullBounds, _super);
    function NullBounds(alwaysIn) {
        if (alwaysIn === void 0) { alwaysIn = true; }
        _super.call(this, null);
        this._alwaysIn = alwaysIn;
    }
    //@override
    NullBounds.prototype.clone = function () {
        return new NullBounds(this._alwaysIn);
    };
    //@override
    NullBounds.prototype.isInFrustum = function (planes, numPlanes) {
        return this._alwaysIn;
    };
    NullBounds.prototype.classifyToPlane = function (plane) {
        return PlaneClassification.INTERSECT;
    };
    return NullBounds;
})(BoundingVolumeBase);
module.exports = NullBounds;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9ib3VuZHMvTnVsbEJvdW5kcy50cyJdLCJuYW1lcyI6WyJOdWxsQm91bmRzIiwiTnVsbEJvdW5kcy5jb25zdHJ1Y3RvciIsIk51bGxCb3VuZHMuY2xvbmUiLCJOdWxsQm91bmRzLmlzSW5GcnVzdHVtIiwiTnVsbEJvdW5kcy5jbGFzc2lmeVRvUGxhbmUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQU8sbUJBQW1CLFdBQWEsMENBQTBDLENBQUMsQ0FBQztBQUduRixJQUFPLGtCQUFrQixXQUFhLDhDQUE4QyxDQUFDLENBQUM7QUFHdEYsSUFBTSxVQUFVO0lBQVNBLFVBQW5CQSxVQUFVQSxVQUEyQkE7SUFJMUNBLFNBSktBLFVBQVVBLENBSUhBLFFBQXVCQTtRQUF2QkMsd0JBQXVCQSxHQUF2QkEsZUFBdUJBO1FBRWxDQSxrQkFBTUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUFFWkEsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsUUFBUUEsQ0FBQ0E7SUFDM0JBLENBQUNBO0lBRURELFdBQVdBO0lBQ0pBLDBCQUFLQSxHQUFaQTtRQUVDRSxNQUFNQSxDQUFDQSxJQUFJQSxVQUFVQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQTtJQUN2Q0EsQ0FBQ0E7SUFFREYsV0FBV0E7SUFDSkEsZ0NBQVdBLEdBQWxCQSxVQUFtQkEsTUFBcUJBLEVBQUVBLFNBQWdCQTtRQUV6REcsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0E7SUFDdkJBLENBQUNBO0lBRU1ILG9DQUFlQSxHQUF0QkEsVUFBdUJBLEtBQWFBO1FBRW5DSSxNQUFNQSxDQUFDQSxtQkFBbUJBLENBQUNBLFNBQVNBLENBQUNBO0lBQ3RDQSxDQUFDQTtJQUNGSixpQkFBQ0E7QUFBREEsQ0EzQkEsQUEyQkNBLEVBM0J3QixrQkFBa0IsRUEyQjFDO0FBRUQsQUFBb0IsaUJBQVgsVUFBVSxDQUFDIiwiZmlsZSI6ImJvdW5kcy9OdWxsQm91bmRzLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQbGFuZUNsYXNzaWZpY2F0aW9uXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vUGxhbmVDbGFzc2lmaWNhdGlvblwiKTtcclxuaW1wb3J0IFBsYW5lM0RcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9QbGFuZTNEXCIpO1xyXG5cclxuaW1wb3J0IEJvdW5kaW5nVm9sdW1lQmFzZVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9ib3VuZHMvQm91bmRpbmdWb2x1bWVCYXNlXCIpO1xyXG5cclxuXHJcbmNsYXNzIE51bGxCb3VuZHMgZXh0ZW5kcyBCb3VuZGluZ1ZvbHVtZUJhc2Vcclxue1xyXG5cdHByaXZhdGUgX2Fsd2F5c0luOmJvb2xlYW47XHJcblxyXG5cdGNvbnN0cnVjdG9yKGFsd2F5c0luOmJvb2xlYW4gPSB0cnVlKVxyXG5cdHtcclxuXHRcdHN1cGVyKG51bGwpO1xyXG5cclxuXHRcdHRoaXMuX2Fsd2F5c0luID0gYWx3YXlzSW47XHJcblx0fVxyXG5cclxuXHQvL0BvdmVycmlkZVxyXG5cdHB1YmxpYyBjbG9uZSgpOkJvdW5kaW5nVm9sdW1lQmFzZVxyXG5cdHtcclxuXHRcdHJldHVybiBuZXcgTnVsbEJvdW5kcyh0aGlzLl9hbHdheXNJbik7XHJcblx0fVxyXG5cclxuXHQvL0BvdmVycmlkZVxyXG5cdHB1YmxpYyBpc0luRnJ1c3R1bShwbGFuZXM6QXJyYXk8UGxhbmUzRD4sIG51bVBsYW5lczpudW1iZXIpOmJvb2xlYW5cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fYWx3YXlzSW47XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgY2xhc3NpZnlUb1BsYW5lKHBsYW5lOlBsYW5lM0QpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiBQbGFuZUNsYXNzaWZpY2F0aW9uLklOVEVSU0VDVDtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCA9IE51bGxCb3VuZHM7Il19