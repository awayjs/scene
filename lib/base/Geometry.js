var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AssetType = require("awayjs-core/lib/library/AssetType");
var NamedAssetBase = require("awayjs-core/lib/library/NamedAssetBase");
var GeometryEvent = require("awayjs-display/lib/events/GeometryEvent");
/**
 *
 * Geometry is a collection of SubGeometries, each of which contain the actual geometrical data such as vertices,
 * normals, uvs, etc. It also contains a reference to an animation class, which defines how the geometry moves.
 * A Geometry object is assigned to a Mesh, a scene graph occurence of the geometry, which in turn assigns
 * the SubGeometries to its respective TriangleSubMesh objects.
 *
 *
 *
 * @see away.core.base.SubGeometry
 * @see away.entities.Mesh
 *
 * @class Geometry
 */
var Geometry = (function (_super) {
    __extends(Geometry, _super);
    /**
     * Creates a new Geometry object.
     */
    function Geometry() {
        _super.call(this);
        this._subGeometries = new Array();
    }
    Object.defineProperty(Geometry.prototype, "assetType", {
        get: function () {
            return AssetType.GEOMETRY;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Geometry.prototype, "subGeometries", {
        /**
         * A collection of TriangleSubGeometry objects, each of which contain geometrical data such as vertices, normals, etc.
         */
        get: function () {
            return this._subGeometries;
        },
        enumerable: true,
        configurable: true
    });
    Geometry.prototype.getSubGeometries = function () {
        return this._subGeometries;
    };
    Geometry.prototype.applyTransformation = function (transform) {
        var len = this._subGeometries.length;
        for (var i = 0; i < len; ++i)
            this._subGeometries[i].applyTransformation(transform);
    };
    /**
     * Adds a new TriangleSubGeometry object to the list.
     * @param subGeometry The TriangleSubGeometry object to be added.
     */
    Geometry.prototype.addSubGeometry = function (subGeometry) {
        this._subGeometries.push(subGeometry);
        subGeometry.parentGeometry = this;
        if (this.hasEventListener(GeometryEvent.SUB_GEOMETRY_ADDED))
            this.dispatchEvent(new GeometryEvent(GeometryEvent.SUB_GEOMETRY_ADDED, subGeometry));
        this.iInvalidateBounds(subGeometry);
    };
    /**
     * Removes a new TriangleSubGeometry object from the list.
     * @param subGeometry The TriangleSubGeometry object to be removed.
     */
    Geometry.prototype.removeSubGeometry = function (subGeometry) {
        this._subGeometries.splice(this._subGeometries.indexOf(subGeometry), 1);
        subGeometry.parentGeometry = null;
        if (this.hasEventListener(GeometryEvent.SUB_GEOMETRY_REMOVED))
            this.dispatchEvent(new GeometryEvent(GeometryEvent.SUB_GEOMETRY_REMOVED, subGeometry));
        this.iInvalidateBounds(subGeometry);
    };
    /**
     * Clones the geometry.
     * @return An exact duplicate of the current Geometry object.
     */
    Geometry.prototype.clone = function () {
        var clone = new Geometry();
        var len = this._subGeometries.length;
        for (var i = 0; i < len; ++i)
            clone.addSubGeometry(this._subGeometries[i].clone());
        return clone;
    };
    /**
     * Scales the geometry.
     * @param scale The amount by which to scale.
     */
    Geometry.prototype.scale = function (scale) {
        var numSubGeoms = this._subGeometries.length;
        for (var i = 0; i < numSubGeoms; ++i)
            this._subGeometries[i].scale(scale);
    };
    /**
     * Clears all resources used by the Geometry object, including SubGeometries.
     */
    Geometry.prototype.dispose = function () {
        var numSubGeoms = this._subGeometries.length;
        for (var i = 0; i < numSubGeoms; ++i) {
            var subGeom = this._subGeometries[0];
            this.removeSubGeometry(subGeom);
            subGeom.dispose();
        }
    };
    /**
     * Scales the uv coordinates (tiling)
     * @param scaleU The amount by which to scale on the u axis. Default is 1;
     * @param scaleV The amount by which to scale on the v axis. Default is 1;
     */
    Geometry.prototype.scaleUV = function (scaleU, scaleV) {
        if (scaleU === void 0) { scaleU = 1; }
        if (scaleV === void 0) { scaleV = 1; }
        var numSubGeoms = this._subGeometries.length;
        for (var i = 0; i < numSubGeoms; ++i)
            this._subGeometries[i].scaleUV(scaleU, scaleV);
    };
    Geometry.prototype.iInvalidateBounds = function (subGeom) {
        if (this.hasEventListener(GeometryEvent.BOUNDS_INVALID))
            this.dispatchEvent(new GeometryEvent(GeometryEvent.BOUNDS_INVALID, subGeom));
    };
    return Geometry;
})(NamedAssetBase);
module.exports = Geometry;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0dlb21ldHJ5LnRzIl0sIm5hbWVzIjpbIkdlb21ldHJ5IiwiR2VvbWV0cnkuY29uc3RydWN0b3IiLCJHZW9tZXRyeS5hc3NldFR5cGUiLCJHZW9tZXRyeS5zdWJHZW9tZXRyaWVzIiwiR2VvbWV0cnkuZ2V0U3ViR2VvbWV0cmllcyIsIkdlb21ldHJ5LmFwcGx5VHJhbnNmb3JtYXRpb24iLCJHZW9tZXRyeS5hZGRTdWJHZW9tZXRyeSIsIkdlb21ldHJ5LnJlbW92ZVN1Ykdlb21ldHJ5IiwiR2VvbWV0cnkuY2xvbmUiLCJHZW9tZXRyeS5zY2FsZSIsIkdlb21ldHJ5LmRpc3Bvc2UiLCJHZW9tZXRyeS5zY2FsZVVWIiwiR2VvbWV0cnkuaUludmFsaWRhdGVCb3VuZHMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLElBQU8sU0FBUyxXQUFjLG1DQUFtQyxDQUFDLENBQUM7QUFFbkUsSUFBTyxjQUFjLFdBQWEsd0NBQXdDLENBQUMsQ0FBQztBQUc1RSxJQUFPLGFBQWEsV0FBYSx5Q0FBeUMsQ0FBQyxDQUFDO0FBRTVFLEFBY0E7Ozs7Ozs7Ozs7Ozs7R0FERztJQUNHLFFBQVE7SUFBU0EsVUFBakJBLFFBQVFBLFVBQXVCQTtJQXNCcENBOztPQUVHQTtJQUNIQSxTQXpCS0EsUUFBUUE7UUEyQlpDLGlCQUFPQSxDQUFDQTtRQUVSQSxJQUFJQSxDQUFDQSxjQUFjQSxHQUFHQSxJQUFJQSxLQUFLQSxFQUFtQkEsQ0FBQ0E7SUFDcERBLENBQUNBO0lBMUJERCxzQkFBV0EsK0JBQVNBO2FBQXBCQTtZQUVDRSxNQUFNQSxDQUFDQSxTQUFTQSxDQUFDQSxRQUFRQSxDQUFDQTtRQUMzQkEsQ0FBQ0E7OztPQUFBRjtJQUtEQSxzQkFBV0EsbUNBQWFBO1FBSHhCQTs7V0FFR0E7YUFDSEE7WUFFQ0csTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0E7UUFDNUJBLENBQUNBOzs7T0FBQUg7SUFFTUEsbUNBQWdCQSxHQUF2QkE7UUFFQ0ksTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0E7SUFDNUJBLENBQUNBO0lBWU1KLHNDQUFtQkEsR0FBMUJBLFVBQTJCQSxTQUFrQkE7UUFFNUNLLElBQUlBLEdBQUdBLEdBQVVBLElBQUlBLENBQUNBLGNBQWNBLENBQUNBLE1BQU1BLENBQUNBO1FBQzVDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFVQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxHQUFHQSxFQUFFQSxFQUFFQSxDQUFDQTtZQUNsQ0EsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQTtJQUN4REEsQ0FBQ0E7SUFFREw7OztPQUdHQTtJQUNJQSxpQ0FBY0EsR0FBckJBLFVBQXNCQSxXQUEyQkE7UUFFaERNLElBQUlBLENBQUNBLGNBQWNBLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBO1FBRXRDQSxXQUFXQSxDQUFDQSxjQUFjQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUVsQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxhQUFhQSxDQUFDQSxrQkFBa0JBLENBQUNBLENBQUNBO1lBQzNEQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxJQUFJQSxhQUFhQSxDQUFDQSxhQUFhQSxDQUFDQSxrQkFBa0JBLEVBQUVBLFdBQVdBLENBQUNBLENBQUNBLENBQUNBO1FBRXRGQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBO0lBQ3JDQSxDQUFDQTtJQUVETjs7O09BR0dBO0lBQ0lBLG9DQUFpQkEsR0FBeEJBLFVBQXlCQSxXQUEyQkE7UUFFbkRPLElBQUlBLENBQUNBLGNBQWNBLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLGNBQWNBLENBQUNBLE9BQU9BLENBQUNBLFdBQVdBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO1FBRXhFQSxXQUFXQSxDQUFDQSxjQUFjQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUVsQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxhQUFhQSxDQUFDQSxvQkFBb0JBLENBQUNBLENBQUNBO1lBQzdEQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxJQUFJQSxhQUFhQSxDQUFDQSxhQUFhQSxDQUFDQSxvQkFBb0JBLEVBQUVBLFdBQVdBLENBQUNBLENBQUNBLENBQUNBO1FBRXhGQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBO0lBQ3JDQSxDQUFDQTtJQUVEUDs7O09BR0dBO0lBQ0lBLHdCQUFLQSxHQUFaQTtRQUVDUSxJQUFJQSxLQUFLQSxHQUFZQSxJQUFJQSxRQUFRQSxFQUFFQSxDQUFDQTtRQUNwQ0EsSUFBSUEsR0FBR0EsR0FBVUEsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsTUFBTUEsQ0FBQ0E7UUFFNUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQVVBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLEdBQUdBLEVBQUVBLEVBQUVBLENBQUNBO1lBQ2xDQSxLQUFLQSxDQUFDQSxjQUFjQSxDQUFDQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQSxDQUFDQTtRQUV0REEsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7SUFDZEEsQ0FBQ0E7SUFFRFI7OztPQUdHQTtJQUNJQSx3QkFBS0EsR0FBWkEsVUFBYUEsS0FBWUE7UUFFeEJTLElBQUlBLFdBQVdBLEdBQVVBLElBQUlBLENBQUNBLGNBQWNBLENBQUNBLE1BQU1BLENBQUNBO1FBQ3BEQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFVQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxXQUFXQSxFQUFFQSxFQUFFQSxDQUFDQTtZQUMxQ0EsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7SUFDdENBLENBQUNBO0lBRURUOztPQUVHQTtJQUNJQSwwQkFBT0EsR0FBZEE7UUFFQ1UsSUFBSUEsV0FBV0EsR0FBVUEsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsTUFBTUEsQ0FBQ0E7UUFFcERBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQVVBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLFdBQVdBLEVBQUVBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBO1lBQzdDQSxJQUFJQSxPQUFPQSxHQUFtQkEsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDckRBLElBQUlBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7WUFDaENBLE9BQU9BLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBO1FBQ25CQSxDQUFDQTtJQUNGQSxDQUFDQTtJQUVEVjs7OztPQUlHQTtJQUNJQSwwQkFBT0EsR0FBZEEsVUFBZUEsTUFBaUJBLEVBQUVBLE1BQWlCQTtRQUFwQ1csc0JBQWlCQSxHQUFqQkEsVUFBaUJBO1FBQUVBLHNCQUFpQkEsR0FBakJBLFVBQWlCQTtRQUVsREEsSUFBSUEsV0FBV0EsR0FBVUEsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsTUFBTUEsQ0FBQ0E7UUFFcERBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQVVBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLFdBQVdBLEVBQUVBLEVBQUVBLENBQUNBO1lBQzFDQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxNQUFNQSxFQUFFQSxNQUFNQSxDQUFDQSxDQUFDQTtJQUNqREEsQ0FBQ0E7SUFFTVgsb0NBQWlCQSxHQUF4QkEsVUFBeUJBLE9BQXVCQTtRQUUvQ1ksRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxhQUFhQSxDQUFDQSxjQUFjQSxDQUFDQSxDQUFDQTtZQUN2REEsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsSUFBSUEsYUFBYUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsY0FBY0EsRUFBRUEsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFDL0VBLENBQUNBO0lBQ0ZaLGVBQUNBO0FBQURBLENBaklBLEFBaUlDQSxFQWpJc0IsY0FBYyxFQWlJcEM7QUFFRCxBQUFrQixpQkFBVCxRQUFRLENBQUMiLCJmaWxlIjoiYmFzZS9HZW9tZXRyeS5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTWF0cml4M0RcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vTWF0cml4M0RcIik7XHJcbmltcG9ydCBBc3NldFR5cGVcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0Fzc2V0VHlwZVwiKTtcclxuaW1wb3J0IElBc3NldFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9JQXNzZXRcIik7XHJcbmltcG9ydCBOYW1lZEFzc2V0QmFzZVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L05hbWVkQXNzZXRCYXNlXCIpO1xyXG5cclxuaW1wb3J0IFN1Ykdlb21ldHJ5QmFzZVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL1N1Ykdlb21ldHJ5QmFzZVwiKTtcclxuaW1wb3J0IEdlb21ldHJ5RXZlbnRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZXZlbnRzL0dlb21ldHJ5RXZlbnRcIik7XHJcblxyXG4vKipcclxuICpcclxuICogR2VvbWV0cnkgaXMgYSBjb2xsZWN0aW9uIG9mIFN1Ykdlb21ldHJpZXMsIGVhY2ggb2Ygd2hpY2ggY29udGFpbiB0aGUgYWN0dWFsIGdlb21ldHJpY2FsIGRhdGEgc3VjaCBhcyB2ZXJ0aWNlcyxcclxuICogbm9ybWFscywgdXZzLCBldGMuIEl0IGFsc28gY29udGFpbnMgYSByZWZlcmVuY2UgdG8gYW4gYW5pbWF0aW9uIGNsYXNzLCB3aGljaCBkZWZpbmVzIGhvdyB0aGUgZ2VvbWV0cnkgbW92ZXMuXHJcbiAqIEEgR2VvbWV0cnkgb2JqZWN0IGlzIGFzc2lnbmVkIHRvIGEgTWVzaCwgYSBzY2VuZSBncmFwaCBvY2N1cmVuY2Ugb2YgdGhlIGdlb21ldHJ5LCB3aGljaCBpbiB0dXJuIGFzc2lnbnNcclxuICogdGhlIFN1Ykdlb21ldHJpZXMgdG8gaXRzIHJlc3BlY3RpdmUgVHJpYW5nbGVTdWJNZXNoIG9iamVjdHMuXHJcbiAqXHJcbiAqXHJcbiAqXHJcbiAqIEBzZWUgYXdheS5jb3JlLmJhc2UuU3ViR2VvbWV0cnlcclxuICogQHNlZSBhd2F5LmVudGl0aWVzLk1lc2hcclxuICpcclxuICogQGNsYXNzIEdlb21ldHJ5XHJcbiAqL1xyXG5jbGFzcyBHZW9tZXRyeSBleHRlbmRzIE5hbWVkQXNzZXRCYXNlIGltcGxlbWVudHMgSUFzc2V0XHJcbntcclxuXHRwcml2YXRlIF9zdWJHZW9tZXRyaWVzOkFycmF5PFN1Ykdlb21ldHJ5QmFzZT47XHJcblxyXG5cdHB1YmxpYyBnZXQgYXNzZXRUeXBlKCk6c3RyaW5nXHJcblx0e1xyXG5cdFx0cmV0dXJuIEFzc2V0VHlwZS5HRU9NRVRSWTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEEgY29sbGVjdGlvbiBvZiBUcmlhbmdsZVN1Ykdlb21ldHJ5IG9iamVjdHMsIGVhY2ggb2Ygd2hpY2ggY29udGFpbiBnZW9tZXRyaWNhbCBkYXRhIHN1Y2ggYXMgdmVydGljZXMsIG5vcm1hbHMsIGV0Yy5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHN1Ykdlb21ldHJpZXMoKTpBcnJheTxTdWJHZW9tZXRyeUJhc2U+XHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3N1Ykdlb21ldHJpZXM7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0U3ViR2VvbWV0cmllcygpOkFycmF5PFN1Ykdlb21ldHJ5QmFzZT5cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fc3ViR2VvbWV0cmllcztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYSBuZXcgR2VvbWV0cnkgb2JqZWN0LlxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKClcclxuXHR7XHJcblx0XHRzdXBlcigpO1xyXG5cclxuXHRcdHRoaXMuX3N1Ykdlb21ldHJpZXMgPSBuZXcgQXJyYXk8U3ViR2VvbWV0cnlCYXNlPigpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGFwcGx5VHJhbnNmb3JtYXRpb24odHJhbnNmb3JtOk1hdHJpeDNEKVxyXG5cdHtcclxuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fc3ViR2VvbWV0cmllcy5sZW5ndGg7XHJcblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBsZW47ICsraSlcclxuXHRcdFx0dGhpcy5fc3ViR2VvbWV0cmllc1tpXS5hcHBseVRyYW5zZm9ybWF0aW9uKHRyYW5zZm9ybSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGEgbmV3IFRyaWFuZ2xlU3ViR2VvbWV0cnkgb2JqZWN0IHRvIHRoZSBsaXN0LlxyXG5cdCAqIEBwYXJhbSBzdWJHZW9tZXRyeSBUaGUgVHJpYW5nbGVTdWJHZW9tZXRyeSBvYmplY3QgdG8gYmUgYWRkZWQuXHJcblx0ICovXHJcblx0cHVibGljIGFkZFN1Ykdlb21ldHJ5KHN1Ykdlb21ldHJ5OlN1Ykdlb21ldHJ5QmFzZSlcclxuXHR7XHJcblx0XHR0aGlzLl9zdWJHZW9tZXRyaWVzLnB1c2goc3ViR2VvbWV0cnkpO1xyXG5cclxuXHRcdHN1Ykdlb21ldHJ5LnBhcmVudEdlb21ldHJ5ID0gdGhpcztcclxuXHJcblx0XHRpZiAodGhpcy5oYXNFdmVudExpc3RlbmVyKEdlb21ldHJ5RXZlbnQuU1VCX0dFT01FVFJZX0FEREVEKSlcclxuXHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBHZW9tZXRyeUV2ZW50KEdlb21ldHJ5RXZlbnQuU1VCX0dFT01FVFJZX0FEREVELCBzdWJHZW9tZXRyeSkpO1xyXG5cclxuXHRcdHRoaXMuaUludmFsaWRhdGVCb3VuZHMoc3ViR2VvbWV0cnkpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlcyBhIG5ldyBUcmlhbmdsZVN1Ykdlb21ldHJ5IG9iamVjdCBmcm9tIHRoZSBsaXN0LlxyXG5cdCAqIEBwYXJhbSBzdWJHZW9tZXRyeSBUaGUgVHJpYW5nbGVTdWJHZW9tZXRyeSBvYmplY3QgdG8gYmUgcmVtb3ZlZC5cclxuXHQgKi9cclxuXHRwdWJsaWMgcmVtb3ZlU3ViR2VvbWV0cnkoc3ViR2VvbWV0cnk6U3ViR2VvbWV0cnlCYXNlKVxyXG5cdHtcclxuXHRcdHRoaXMuX3N1Ykdlb21ldHJpZXMuc3BsaWNlKHRoaXMuX3N1Ykdlb21ldHJpZXMuaW5kZXhPZihzdWJHZW9tZXRyeSksIDEpO1xyXG5cclxuXHRcdHN1Ykdlb21ldHJ5LnBhcmVudEdlb21ldHJ5ID0gbnVsbDtcclxuXHJcblx0XHRpZiAodGhpcy5oYXNFdmVudExpc3RlbmVyKEdlb21ldHJ5RXZlbnQuU1VCX0dFT01FVFJZX1JFTU9WRUQpKVxyXG5cdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEdlb21ldHJ5RXZlbnQoR2VvbWV0cnlFdmVudC5TVUJfR0VPTUVUUllfUkVNT1ZFRCwgc3ViR2VvbWV0cnkpKTtcclxuXHJcblx0XHR0aGlzLmlJbnZhbGlkYXRlQm91bmRzKHN1Ykdlb21ldHJ5KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENsb25lcyB0aGUgZ2VvbWV0cnkuXHJcblx0ICogQHJldHVybiBBbiBleGFjdCBkdXBsaWNhdGUgb2YgdGhlIGN1cnJlbnQgR2VvbWV0cnkgb2JqZWN0LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBjbG9uZSgpOkdlb21ldHJ5XHJcblx0e1xyXG5cdFx0dmFyIGNsb25lOkdlb21ldHJ5ID0gbmV3IEdlb21ldHJ5KCk7XHJcblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX3N1Ykdlb21ldHJpZXMubGVuZ3RoO1xyXG5cclxuXHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IGxlbjsgKytpKVxyXG5cdFx0XHRjbG9uZS5hZGRTdWJHZW9tZXRyeSh0aGlzLl9zdWJHZW9tZXRyaWVzW2ldLmNsb25lKCkpO1xyXG5cclxuXHRcdHJldHVybiBjbG9uZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNjYWxlcyB0aGUgZ2VvbWV0cnkuXHJcblx0ICogQHBhcmFtIHNjYWxlIFRoZSBhbW91bnQgYnkgd2hpY2ggdG8gc2NhbGUuXHJcblx0ICovXHJcblx0cHVibGljIHNjYWxlKHNjYWxlOm51bWJlcilcclxuXHR7XHJcblx0XHR2YXIgbnVtU3ViR2VvbXM6bnVtYmVyID0gdGhpcy5fc3ViR2VvbWV0cmllcy5sZW5ndGg7XHJcblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBudW1TdWJHZW9tczsgKytpKVxyXG5cdFx0XHR0aGlzLl9zdWJHZW9tZXRyaWVzW2ldLnNjYWxlKHNjYWxlKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENsZWFycyBhbGwgcmVzb3VyY2VzIHVzZWQgYnkgdGhlIEdlb21ldHJ5IG9iamVjdCwgaW5jbHVkaW5nIFN1Ykdlb21ldHJpZXMuXHJcblx0ICovXHJcblx0cHVibGljIGRpc3Bvc2UoKVxyXG5cdHtcclxuXHRcdHZhciBudW1TdWJHZW9tczpudW1iZXIgPSB0aGlzLl9zdWJHZW9tZXRyaWVzLmxlbmd0aDtcclxuXHJcblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBudW1TdWJHZW9tczsgKytpKSB7XHJcblx0XHRcdHZhciBzdWJHZW9tOlN1Ykdlb21ldHJ5QmFzZSA9IHRoaXMuX3N1Ykdlb21ldHJpZXNbMF07XHJcblx0XHRcdHRoaXMucmVtb3ZlU3ViR2VvbWV0cnkoc3ViR2VvbSk7XHJcblx0XHRcdHN1Ykdlb20uZGlzcG9zZSgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2NhbGVzIHRoZSB1diBjb29yZGluYXRlcyAodGlsaW5nKVxyXG5cdCAqIEBwYXJhbSBzY2FsZVUgVGhlIGFtb3VudCBieSB3aGljaCB0byBzY2FsZSBvbiB0aGUgdSBheGlzLiBEZWZhdWx0IGlzIDE7XHJcblx0ICogQHBhcmFtIHNjYWxlViBUaGUgYW1vdW50IGJ5IHdoaWNoIHRvIHNjYWxlIG9uIHRoZSB2IGF4aXMuIERlZmF1bHQgaXMgMTtcclxuXHQgKi9cclxuXHRwdWJsaWMgc2NhbGVVVihzY2FsZVU6bnVtYmVyID0gMSwgc2NhbGVWOm51bWJlciA9IDEpXHJcblx0e1xyXG5cdFx0dmFyIG51bVN1Ykdlb21zOm51bWJlciA9IHRoaXMuX3N1Ykdlb21ldHJpZXMubGVuZ3RoO1xyXG5cclxuXHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IG51bVN1Ykdlb21zOyArK2kpXHJcblx0XHRcdHRoaXMuX3N1Ykdlb21ldHJpZXNbaV0uc2NhbGVVVihzY2FsZVUsIHNjYWxlVik7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgaUludmFsaWRhdGVCb3VuZHMoc3ViR2VvbTpTdWJHZW9tZXRyeUJhc2UpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuaGFzRXZlbnRMaXN0ZW5lcihHZW9tZXRyeUV2ZW50LkJPVU5EU19JTlZBTElEKSlcclxuXHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBHZW9tZXRyeUV2ZW50KEdlb21ldHJ5RXZlbnQuQk9VTkRTX0lOVkFMSUQsIHN1Ykdlb20pKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCA9IEdlb21ldHJ5OyJdfQ==