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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi90cmF2ZXJzZS9yYXljYXN0Y29sbGVjdG9yLnRzIl0sIm5hbWVzIjpbIlJheWNhc3RDb2xsZWN0b3IiLCJSYXljYXN0Q29sbGVjdG9yLmNvbnN0cnVjdG9yIiwiUmF5Y2FzdENvbGxlY3Rvci5yYXlQb3NpdGlvbiIsIlJheWNhc3RDb2xsZWN0b3IucmF5RGlyZWN0aW9uIiwiUmF5Y2FzdENvbGxlY3Rvci5lbnRlck5vZGUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQU8sUUFBUSxXQUFnQiwrQkFBK0IsQ0FBQyxDQUFDO0FBR2hFLElBQU8sYUFBYSxXQUFjLDJDQUEyQyxDQUFDLENBQUM7QUFJL0UsQUFTQTs7Ozs7Ozs7R0FERztJQUNHLGdCQUFnQjtJQUFTQSxVQUF6QkEsZ0JBQWdCQSxVQUFzQkE7SUFpQzNDQTs7T0FFR0E7SUFDSEEsU0FwQ0tBLGdCQUFnQkE7UUFzQ3BCQyxpQkFBT0EsQ0FBQ0E7UUFwQ0RBLGlCQUFZQSxHQUFZQSxJQUFJQSxRQUFRQSxFQUFFQSxDQUFDQTtRQUN2Q0Esa0JBQWFBLEdBQVlBLElBQUlBLFFBQVFBLEVBQUVBLENBQUNBO1FBRXpDQSxxQkFBZ0JBLEdBQVVBLENBQUNBLENBQUNBO0lBa0NuQ0EsQ0FBQ0E7SUE3QkRELHNCQUFXQSx5Q0FBV0E7UUFIdEJBOztXQUVHQTthQUNIQTtZQUVDRSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQTtRQUMxQkEsQ0FBQ0E7YUFFREYsVUFBdUJBLEtBQWNBO1lBRXBDRSxJQUFJQSxDQUFDQSxZQUFZQSxHQUFHQSxLQUFLQSxDQUFDQTtRQUMzQkEsQ0FBQ0E7OztPQUxBRjtJQVVEQSxzQkFBV0EsMENBQVlBO1FBSHZCQTs7V0FFR0E7YUFDSEE7WUFFQ0csTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0E7UUFDM0JBLENBQUNBO2FBRURILFVBQXdCQSxLQUFjQTtZQUVyQ0csSUFBSUEsQ0FBQ0EsYUFBYUEsR0FBR0EsS0FBS0EsQ0FBQ0E7UUFDNUJBLENBQUNBOzs7T0FMQUg7SUFlREE7Ozs7T0FJR0E7SUFDSUEsb0NBQVNBLEdBQWhCQSxVQUFpQkEsSUFBYUE7UUFFN0JJLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsRUFBRUEsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsQ0FBQ0E7SUFDdEVBLENBQUNBO0lBQ0ZKLHVCQUFDQTtBQUFEQSxDQWxEQSxBQWtEQ0EsRUFsRDhCLGFBQWEsRUFrRDNDO0FBRUQsQUFBMEIsaUJBQWpCLGdCQUFnQixDQUFDIiwiZmlsZSI6InRyYXZlcnNlL1JheWNhc3RDb2xsZWN0b3IuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZlY3RvcjNEXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vVmVjdG9yM0RcIik7XG5cbmltcG9ydCBOb2RlQmFzZVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vTm9kZUJhc2VcIik7XG5pbXBvcnQgQ29sbGVjdG9yQmFzZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3RyYXZlcnNlL0NvbGxlY3RvckJhc2VcIik7XG5pbXBvcnQgQ2FtZXJhXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2VudGl0aWVzL0NhbWVyYVwiKTtcbmltcG9ydCBJRW50aXR5XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2VudGl0aWVzL0lFbnRpdHlcIik7XG5cbi8qKlxuICogVGhlIFJheWNhc3RDb2xsZWN0b3IgY2xhc3MgaXMgYSB0cmF2ZXJzZXIgZm9yIHNjZW5lIHBhcnRpdGlvbnMgdGhhdCBjb2xsZWN0cyBhbGwgc2NlbmUgZ3JhcGggZW50aXRpZXMgdGhhdCBhcmVcbiAqIGNvbnNpZGVyZWQgaW50ZXJzZWN0aW5nIHdpdGggdGhlIGRlZmluZWQgcmF5LlxuICpcbiAqIEBzZWUgYXdheS5wYXJ0aXRpb24uUGFydGl0aW9uXG4gKiBAc2VlIGF3YXkuZW50aXRpZXMuSUVudGl0eVxuICpcbiAqIEBjbGFzcyBhd2F5LnRyYXZlcnNlLlJheWNhc3RDb2xsZWN0b3JcbiAqL1xuY2xhc3MgUmF5Y2FzdENvbGxlY3RvciBleHRlbmRzIENvbGxlY3RvckJhc2Vcbntcblx0cHJpdmF0ZSBfcmF5UG9zaXRpb246VmVjdG9yM0QgPSBuZXcgVmVjdG9yM0QoKTtcblx0cHJpdmF0ZSBfcmF5RGlyZWN0aW9uOlZlY3RvcjNEID0gbmV3IFZlY3RvcjNEKCk7XG5cblx0cHVibGljIF9pQ29sbGVjdGlvbk1hcms6bnVtYmVyID0gMDtcblxuXHQvKipcblx0ICogUHJvdmlkZXMgdGhlIHN0YXJ0aW5nIHBvc2l0aW9uIG9mIHRoZSByYXkuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHJheVBvc2l0aW9uKCk6VmVjdG9yM0Rcblx0e1xuXHRcdHJldHVybiB0aGlzLl9yYXlQb3NpdGlvbjtcblx0fVxuXG5cdHB1YmxpYyBzZXQgcmF5UG9zaXRpb24odmFsdWU6VmVjdG9yM0QpXG5cdHtcblx0XHR0aGlzLl9yYXlQb3NpdGlvbiA9IHZhbHVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIFByb3ZpZGVzIHRoZSBkaXJlY3Rpb24gdmVjdG9yIG9mIHRoZSByYXkuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHJheURpcmVjdGlvbigpOlZlY3RvcjNEXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcmF5RGlyZWN0aW9uO1xuXHR9XG5cblx0cHVibGljIHNldCByYXlEaXJlY3Rpb24odmFsdWU6VmVjdG9yM0QpXG5cdHtcblx0XHR0aGlzLl9yYXlEaXJlY3Rpb24gPSB2YWx1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGEgbmV3IFJheWNhc3RDb2xsZWN0b3Igb2JqZWN0LlxuXHQgKi9cblx0Y29uc3RydWN0b3IoKVxuXHR7XG5cdFx0c3VwZXIoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGN1cnJlbnQgbm9kZSBpcyBhdCBsZWFzdCBwYXJ0bHkgaW4gdGhlIGZydXN0dW0uIElmIHNvLCB0aGUgcGFydGl0aW9uIG5vZGUga25vd3MgdG8gcGFzcyBvbiB0aGUgdHJhdmVyc2VyIHRvIGl0cyBjaGlsZHJlbi5cblx0ICpcblx0ICogQHBhcmFtIG5vZGUgVGhlIFBhcnRpdGlvbjNETm9kZSBvYmplY3QgdG8gZnJ1c3R1bS10ZXN0LlxuXHQgKi9cblx0cHVibGljIGVudGVyTm9kZShub2RlOk5vZGVCYXNlKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gbm9kZS5pc0ludGVyc2VjdGluZ1JheSh0aGlzLl9yYXlQb3NpdGlvbiwgdGhpcy5fcmF5RGlyZWN0aW9uKTtcblx0fVxufVxuXG5leHBvcnQgPSBSYXljYXN0Q29sbGVjdG9yOyJdfQ==