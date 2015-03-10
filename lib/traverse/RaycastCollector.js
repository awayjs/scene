var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Vector3D = require("awayjs-core/lib/geom/Vector3D");
var CollectorBase = require("awayjs-display/lib/traverse/CollectorBase");
/**
 * The RaycastCollector class is a traverser for scene partitions that collects all scene graph entities that are
 * considered intersecting with the defined ray.
 *
 * @see away.partition.Partition
 * @see away.entities.IEntity
 *
 * @class away.traverse.RaycastCollector
 */
var RaycastCollector = (function (_super) {
    __extends(RaycastCollector, _super);
    /**
     * Creates a new RaycastCollector object.
     */
    function RaycastCollector() {
        _super.call(this);
        this._rayPosition = new Vector3D();
        this._rayDirection = new Vector3D();
        this._iCollectionMark = 0;
    }
    Object.defineProperty(RaycastCollector.prototype, "rayPosition", {
        /**
         * Provides the starting position of the ray.
         */
        get: function () {
            return this._rayPosition;
        },
        set: function (value) {
            this._rayPosition = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RaycastCollector.prototype, "rayDirection", {
        /**
         * Provides the direction vector of the ray.
         */
        get: function () {
            return this._rayDirection;
        },
        set: function (value) {
            this._rayDirection = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns true if the current node is at least partly in the frustum. If so, the partition node knows to pass on the traverser to its children.
     *
     * @param node The Partition3DNode object to frustum-test.
     */
    RaycastCollector.prototype.enterNode = function (node) {
        return node.isIntersectingRay(this._rayPosition, this._rayDirection);
    };
    return RaycastCollector;
})(CollectorBase);
module.exports = RaycastCollector;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi90cmF2ZXJzZS9SYXljYXN0Q29sbGVjdG9yLnRzIl0sIm5hbWVzIjpbIlJheWNhc3RDb2xsZWN0b3IiLCJSYXljYXN0Q29sbGVjdG9yLmNvbnN0cnVjdG9yIiwiUmF5Y2FzdENvbGxlY3Rvci5yYXlQb3NpdGlvbiIsIlJheWNhc3RDb2xsZWN0b3IucmF5RGlyZWN0aW9uIiwiUmF5Y2FzdENvbGxlY3Rvci5lbnRlck5vZGUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQU8sUUFBUSxXQUFnQiwrQkFBK0IsQ0FBQyxDQUFDO0FBR2hFLElBQU8sYUFBYSxXQUFjLDJDQUEyQyxDQUFDLENBQUM7QUFJL0UsQUFTQTs7Ozs7Ozs7R0FERztJQUNHLGdCQUFnQjtJQUFTQSxVQUF6QkEsZ0JBQWdCQSxVQUFzQkE7SUFpQzNDQTs7T0FFR0E7SUFDSEEsU0FwQ0tBLGdCQUFnQkE7UUFzQ3BCQyxpQkFBT0EsQ0FBQ0E7UUFwQ0RBLGlCQUFZQSxHQUFZQSxJQUFJQSxRQUFRQSxFQUFFQSxDQUFDQTtRQUN2Q0Esa0JBQWFBLEdBQVlBLElBQUlBLFFBQVFBLEVBQUVBLENBQUNBO1FBRXpDQSxxQkFBZ0JBLEdBQVVBLENBQUNBLENBQUNBO0lBa0NuQ0EsQ0FBQ0E7SUE3QkRELHNCQUFXQSx5Q0FBV0E7UUFIdEJBOztXQUVHQTthQUNIQTtZQUVDRSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQTtRQUMxQkEsQ0FBQ0E7YUFFREYsVUFBdUJBLEtBQWNBO1lBRXBDRSxJQUFJQSxDQUFDQSxZQUFZQSxHQUFHQSxLQUFLQSxDQUFDQTtRQUMzQkEsQ0FBQ0E7OztPQUxBRjtJQVVEQSxzQkFBV0EsMENBQVlBO1FBSHZCQTs7V0FFR0E7YUFDSEE7WUFFQ0csTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0E7UUFDM0JBLENBQUNBO2FBRURILFVBQXdCQSxLQUFjQTtZQUVyQ0csSUFBSUEsQ0FBQ0EsYUFBYUEsR0FBR0EsS0FBS0EsQ0FBQ0E7UUFDNUJBLENBQUNBOzs7T0FMQUg7SUFlREE7Ozs7T0FJR0E7SUFDSUEsb0NBQVNBLEdBQWhCQSxVQUFpQkEsSUFBYUE7UUFFN0JJLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsRUFBRUEsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsQ0FBQ0E7SUFDdEVBLENBQUNBO0lBQ0ZKLHVCQUFDQTtBQUFEQSxDQWxEQSxBQWtEQ0EsRUFsRDhCLGFBQWEsRUFrRDNDO0FBRUQsQUFBMEIsaUJBQWpCLGdCQUFnQixDQUFDIiwiZmlsZSI6InRyYXZlcnNlL1JheWNhc3RDb2xsZWN0b3IuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZlY3RvcjNEXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vVmVjdG9yM0RcIik7XHJcblxyXG5pbXBvcnQgTm9kZUJhc2VcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcGFydGl0aW9uL05vZGVCYXNlXCIpO1xyXG5pbXBvcnQgQ29sbGVjdG9yQmFzZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3RyYXZlcnNlL0NvbGxlY3RvckJhc2VcIik7XHJcbmltcG9ydCBDYW1lcmFcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZW50aXRpZXMvQ2FtZXJhXCIpO1xyXG5pbXBvcnQgSUVudGl0eVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9JRW50aXR5XCIpO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBSYXljYXN0Q29sbGVjdG9yIGNsYXNzIGlzIGEgdHJhdmVyc2VyIGZvciBzY2VuZSBwYXJ0aXRpb25zIHRoYXQgY29sbGVjdHMgYWxsIHNjZW5lIGdyYXBoIGVudGl0aWVzIHRoYXQgYXJlXHJcbiAqIGNvbnNpZGVyZWQgaW50ZXJzZWN0aW5nIHdpdGggdGhlIGRlZmluZWQgcmF5LlxyXG4gKlxyXG4gKiBAc2VlIGF3YXkucGFydGl0aW9uLlBhcnRpdGlvblxyXG4gKiBAc2VlIGF3YXkuZW50aXRpZXMuSUVudGl0eVxyXG4gKlxyXG4gKiBAY2xhc3MgYXdheS50cmF2ZXJzZS5SYXljYXN0Q29sbGVjdG9yXHJcbiAqL1xyXG5jbGFzcyBSYXljYXN0Q29sbGVjdG9yIGV4dGVuZHMgQ29sbGVjdG9yQmFzZVxyXG57XHJcblx0cHJpdmF0ZSBfcmF5UG9zaXRpb246VmVjdG9yM0QgPSBuZXcgVmVjdG9yM0QoKTtcclxuXHRwcml2YXRlIF9yYXlEaXJlY3Rpb246VmVjdG9yM0QgPSBuZXcgVmVjdG9yM0QoKTtcclxuXHJcblx0cHVibGljIF9pQ29sbGVjdGlvbk1hcms6bnVtYmVyID0gMDtcclxuXHJcblx0LyoqXHJcblx0ICogUHJvdmlkZXMgdGhlIHN0YXJ0aW5nIHBvc2l0aW9uIG9mIHRoZSByYXkuXHJcblx0ICovXHJcblx0cHVibGljIGdldCByYXlQb3NpdGlvbigpOlZlY3RvcjNEXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3JheVBvc2l0aW9uO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCByYXlQb3NpdGlvbih2YWx1ZTpWZWN0b3IzRClcclxuXHR7XHJcblx0XHR0aGlzLl9yYXlQb3NpdGlvbiA9IHZhbHVlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUHJvdmlkZXMgdGhlIGRpcmVjdGlvbiB2ZWN0b3Igb2YgdGhlIHJheS5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHJheURpcmVjdGlvbigpOlZlY3RvcjNEXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3JheURpcmVjdGlvbjtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgcmF5RGlyZWN0aW9uKHZhbHVlOlZlY3RvcjNEKVxyXG5cdHtcclxuXHRcdHRoaXMuX3JheURpcmVjdGlvbiA9IHZhbHVlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhIG5ldyBSYXljYXN0Q29sbGVjdG9yIG9iamVjdC5cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcigpXHJcblx0e1xyXG5cdFx0c3VwZXIoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgY3VycmVudCBub2RlIGlzIGF0IGxlYXN0IHBhcnRseSBpbiB0aGUgZnJ1c3R1bS4gSWYgc28sIHRoZSBwYXJ0aXRpb24gbm9kZSBrbm93cyB0byBwYXNzIG9uIHRoZSB0cmF2ZXJzZXIgdG8gaXRzIGNoaWxkcmVuLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG5vZGUgVGhlIFBhcnRpdGlvbjNETm9kZSBvYmplY3QgdG8gZnJ1c3R1bS10ZXN0LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBlbnRlck5vZGUobm9kZTpOb2RlQmFzZSk6Ym9vbGVhblxyXG5cdHtcclxuXHRcdHJldHVybiBub2RlLmlzSW50ZXJzZWN0aW5nUmF5KHRoaXMuX3JheVBvc2l0aW9uLCB0aGlzLl9yYXlEaXJlY3Rpb24pO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0ID0gUmF5Y2FzdENvbGxlY3RvcjsiXX0=