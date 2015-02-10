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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9ib3VuZHMvbnVsbGJvdW5kcy50cyJdLCJuYW1lcyI6WyJOdWxsQm91bmRzIiwiTnVsbEJvdW5kcy5jb25zdHJ1Y3RvciIsIk51bGxCb3VuZHMuY2xvbmUiLCJOdWxsQm91bmRzLmlzSW5GcnVzdHVtIiwiTnVsbEJvdW5kcy5jbGFzc2lmeVRvUGxhbmUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQU8sbUJBQW1CLFdBQWEsMENBQTBDLENBQUMsQ0FBQztBQUduRixJQUFPLGtCQUFrQixXQUFhLDhDQUE4QyxDQUFDLENBQUM7QUFHdEYsSUFBTSxVQUFVO0lBQVNBLFVBQW5CQSxVQUFVQSxVQUEyQkE7SUFJMUNBLFNBSktBLFVBQVVBLENBSUhBLFFBQXVCQTtRQUF2QkMsd0JBQXVCQSxHQUF2QkEsZUFBdUJBO1FBRWxDQSxrQkFBTUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUFFWkEsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsUUFBUUEsQ0FBQ0E7SUFDM0JBLENBQUNBO0lBRURELFdBQVdBO0lBQ0pBLDBCQUFLQSxHQUFaQTtRQUVDRSxNQUFNQSxDQUFDQSxJQUFJQSxVQUFVQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQTtJQUN2Q0EsQ0FBQ0E7SUFFREYsV0FBV0E7SUFDSkEsZ0NBQVdBLEdBQWxCQSxVQUFtQkEsTUFBcUJBLEVBQUVBLFNBQWdCQTtRQUV6REcsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0E7SUFDdkJBLENBQUNBO0lBRU1ILG9DQUFlQSxHQUF0QkEsVUFBdUJBLEtBQWFBO1FBRW5DSSxNQUFNQSxDQUFDQSxtQkFBbUJBLENBQUNBLFNBQVNBLENBQUNBO0lBQ3RDQSxDQUFDQTtJQUNGSixpQkFBQ0E7QUFBREEsQ0EzQkEsQUEyQkNBLEVBM0J3QixrQkFBa0IsRUEyQjFDO0FBRUQsQUFBb0IsaUJBQVgsVUFBVSxDQUFDIiwiZmlsZSI6ImJvdW5kcy9OdWxsQm91bmRzLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQbGFuZUNsYXNzaWZpY2F0aW9uXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vUGxhbmVDbGFzc2lmaWNhdGlvblwiKTtcbmltcG9ydCBQbGFuZTNEXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vUGxhbmUzRFwiKTtcblxuaW1wb3J0IEJvdW5kaW5nVm9sdW1lQmFzZVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9ib3VuZHMvQm91bmRpbmdWb2x1bWVCYXNlXCIpO1xuXG5cbmNsYXNzIE51bGxCb3VuZHMgZXh0ZW5kcyBCb3VuZGluZ1ZvbHVtZUJhc2Vcbntcblx0cHJpdmF0ZSBfYWx3YXlzSW46Ym9vbGVhbjtcblxuXHRjb25zdHJ1Y3RvcihhbHdheXNJbjpib29sZWFuID0gdHJ1ZSlcblx0e1xuXHRcdHN1cGVyKG51bGwpO1xuXG5cdFx0dGhpcy5fYWx3YXlzSW4gPSBhbHdheXNJbjtcblx0fVxuXG5cdC8vQG92ZXJyaWRlXG5cdHB1YmxpYyBjbG9uZSgpOkJvdW5kaW5nVm9sdW1lQmFzZVxuXHR7XG5cdFx0cmV0dXJuIG5ldyBOdWxsQm91bmRzKHRoaXMuX2Fsd2F5c0luKTtcblx0fVxuXG5cdC8vQG92ZXJyaWRlXG5cdHB1YmxpYyBpc0luRnJ1c3R1bShwbGFuZXM6QXJyYXk8UGxhbmUzRD4sIG51bVBsYW5lczpudW1iZXIpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9hbHdheXNJbjtcblx0fVxuXG5cdHB1YmxpYyBjbGFzc2lmeVRvUGxhbmUocGxhbmU6UGxhbmUzRCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gUGxhbmVDbGFzc2lmaWNhdGlvbi5JTlRFUlNFQ1Q7XG5cdH1cbn1cblxuZXhwb3J0ID0gTnVsbEJvdW5kczsiXX0=