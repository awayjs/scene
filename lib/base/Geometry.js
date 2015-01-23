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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL2dlb21ldHJ5LnRzIl0sIm5hbWVzIjpbIkdlb21ldHJ5IiwiR2VvbWV0cnkuY29uc3RydWN0b3IiLCJHZW9tZXRyeS5hc3NldFR5cGUiLCJHZW9tZXRyeS5zdWJHZW9tZXRyaWVzIiwiR2VvbWV0cnkuZ2V0U3ViR2VvbWV0cmllcyIsIkdlb21ldHJ5LmFwcGx5VHJhbnNmb3JtYXRpb24iLCJHZW9tZXRyeS5hZGRTdWJHZW9tZXRyeSIsIkdlb21ldHJ5LnJlbW92ZVN1Ykdlb21ldHJ5IiwiR2VvbWV0cnkuY2xvbmUiLCJHZW9tZXRyeS5zY2FsZSIsIkdlb21ldHJ5LmRpc3Bvc2UiLCJHZW9tZXRyeS5zY2FsZVVWIiwiR2VvbWV0cnkuaUludmFsaWRhdGVCb3VuZHMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLElBQU8sU0FBUyxXQUFjLG1DQUFtQyxDQUFDLENBQUM7QUFFbkUsSUFBTyxjQUFjLFdBQWEsd0NBQXdDLENBQUMsQ0FBQztBQUc1RSxJQUFPLGFBQWEsV0FBYSx5Q0FBeUMsQ0FBQyxDQUFDO0FBRTVFLEFBY0E7Ozs7Ozs7Ozs7Ozs7R0FERztJQUNHLFFBQVE7SUFBU0EsVUFBakJBLFFBQVFBLFVBQXVCQTtJQXNCcENBOztPQUVHQTtJQUNIQSxTQXpCS0EsUUFBUUE7UUEyQlpDLGlCQUFPQSxDQUFDQTtRQUVSQSxJQUFJQSxDQUFDQSxjQUFjQSxHQUFHQSxJQUFJQSxLQUFLQSxFQUFtQkEsQ0FBQ0E7SUFDcERBLENBQUNBO0lBMUJERCxzQkFBV0EsK0JBQVNBO2FBQXBCQTtZQUVDRSxNQUFNQSxDQUFDQSxTQUFTQSxDQUFDQSxRQUFRQSxDQUFDQTtRQUMzQkEsQ0FBQ0E7OztPQUFBRjtJQUtEQSxzQkFBV0EsbUNBQWFBO1FBSHhCQTs7V0FFR0E7YUFDSEE7WUFFQ0csTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0E7UUFDNUJBLENBQUNBOzs7T0FBQUg7SUFFTUEsbUNBQWdCQSxHQUF2QkE7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Z0JBQWdCQSxDQUFDQSxhQUFhQSxDQUFDQSxjQUFjQSxDQUFDQSxDQUFDQTtZQUN2REEsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsSUFBSUEsYUFBYUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsY0FBY0EsRUFBRUEsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFDL0VBLENBQUNBO0lBQ0ZaLGVBQUNBO0FBQURBLENBaklBLEFBaUlDQSxFQWpJc0IsY0FBYyxFQWlJcEM7QUFFRCxBQUFrQixpQkFBVCxRQUFRLENBQUMiLCJmaWxlIjoiYmFzZS9HZW9tZXRyeS5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTWF0cml4M0RcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vTWF0cml4M0RcIik7XG5pbXBvcnQgQXNzZXRUeXBlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9Bc3NldFR5cGVcIik7XG5pbXBvcnQgSUFzc2V0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0lBc3NldFwiKTtcbmltcG9ydCBOYW1lZEFzc2V0QmFzZVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L05hbWVkQXNzZXRCYXNlXCIpO1xuXG5pbXBvcnQgU3ViR2VvbWV0cnlCYXNlXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvU3ViR2VvbWV0cnlCYXNlXCIpO1xuaW1wb3J0IEdlb21ldHJ5RXZlbnRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZXZlbnRzL0dlb21ldHJ5RXZlbnRcIik7XG5cbi8qKlxuICpcbiAqIEdlb21ldHJ5IGlzIGEgY29sbGVjdGlvbiBvZiBTdWJHZW9tZXRyaWVzLCBlYWNoIG9mIHdoaWNoIGNvbnRhaW4gdGhlIGFjdHVhbCBnZW9tZXRyaWNhbCBkYXRhIHN1Y2ggYXMgdmVydGljZXMsXG4gKiBub3JtYWxzLCB1dnMsIGV0Yy4gSXQgYWxzbyBjb250YWlucyBhIHJlZmVyZW5jZSB0byBhbiBhbmltYXRpb24gY2xhc3MsIHdoaWNoIGRlZmluZXMgaG93IHRoZSBnZW9tZXRyeSBtb3Zlcy5cbiAqIEEgR2VvbWV0cnkgb2JqZWN0IGlzIGFzc2lnbmVkIHRvIGEgTWVzaCwgYSBzY2VuZSBncmFwaCBvY2N1cmVuY2Ugb2YgdGhlIGdlb21ldHJ5LCB3aGljaCBpbiB0dXJuIGFzc2lnbnNcbiAqIHRoZSBTdWJHZW9tZXRyaWVzIHRvIGl0cyByZXNwZWN0aXZlIFRyaWFuZ2xlU3ViTWVzaCBvYmplY3RzLlxuICpcbiAqXG4gKlxuICogQHNlZSBhd2F5LmNvcmUuYmFzZS5TdWJHZW9tZXRyeVxuICogQHNlZSBhd2F5LmVudGl0aWVzLk1lc2hcbiAqXG4gKiBAY2xhc3MgR2VvbWV0cnlcbiAqL1xuY2xhc3MgR2VvbWV0cnkgZXh0ZW5kcyBOYW1lZEFzc2V0QmFzZSBpbXBsZW1lbnRzIElBc3NldFxue1xuXHRwcml2YXRlIF9zdWJHZW9tZXRyaWVzOkFycmF5PFN1Ykdlb21ldHJ5QmFzZT47XG5cblx0cHVibGljIGdldCBhc3NldFR5cGUoKTpzdHJpbmdcblx0e1xuXHRcdHJldHVybiBBc3NldFR5cGUuR0VPTUVUUlk7XG5cdH1cblxuXHQvKipcblx0ICogQSBjb2xsZWN0aW9uIG9mIFRyaWFuZ2xlU3ViR2VvbWV0cnkgb2JqZWN0cywgZWFjaCBvZiB3aGljaCBjb250YWluIGdlb21ldHJpY2FsIGRhdGEgc3VjaCBhcyB2ZXJ0aWNlcywgbm9ybWFscywgZXRjLlxuXHQgKi9cblx0cHVibGljIGdldCBzdWJHZW9tZXRyaWVzKCk6QXJyYXk8U3ViR2VvbWV0cnlCYXNlPlxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3N1Ykdlb21ldHJpZXM7XG5cdH1cblxuXHRwdWJsaWMgZ2V0U3ViR2VvbWV0cmllcygpOkFycmF5PFN1Ykdlb21ldHJ5QmFzZT5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9zdWJHZW9tZXRyaWVzO1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBuZXcgR2VvbWV0cnkgb2JqZWN0LlxuXHQgKi9cblx0Y29uc3RydWN0b3IoKVxuXHR7XG5cdFx0c3VwZXIoKTtcblxuXHRcdHRoaXMuX3N1Ykdlb21ldHJpZXMgPSBuZXcgQXJyYXk8U3ViR2VvbWV0cnlCYXNlPigpO1xuXHR9XG5cblx0cHVibGljIGFwcGx5VHJhbnNmb3JtYXRpb24odHJhbnNmb3JtOk1hdHJpeDNEKVxuXHR7XG5cdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9zdWJHZW9tZXRyaWVzLmxlbmd0aDtcblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBsZW47ICsraSlcblx0XHRcdHRoaXMuX3N1Ykdlb21ldHJpZXNbaV0uYXBwbHlUcmFuc2Zvcm1hdGlvbih0cmFuc2Zvcm0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFkZHMgYSBuZXcgVHJpYW5nbGVTdWJHZW9tZXRyeSBvYmplY3QgdG8gdGhlIGxpc3QuXG5cdCAqIEBwYXJhbSBzdWJHZW9tZXRyeSBUaGUgVHJpYW5nbGVTdWJHZW9tZXRyeSBvYmplY3QgdG8gYmUgYWRkZWQuXG5cdCAqL1xuXHRwdWJsaWMgYWRkU3ViR2VvbWV0cnkoc3ViR2VvbWV0cnk6U3ViR2VvbWV0cnlCYXNlKVxuXHR7XG5cdFx0dGhpcy5fc3ViR2VvbWV0cmllcy5wdXNoKHN1Ykdlb21ldHJ5KTtcblxuXHRcdHN1Ykdlb21ldHJ5LnBhcmVudEdlb21ldHJ5ID0gdGhpcztcblxuXHRcdGlmICh0aGlzLmhhc0V2ZW50TGlzdGVuZXIoR2VvbWV0cnlFdmVudC5TVUJfR0VPTUVUUllfQURERUQpKVxuXHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBHZW9tZXRyeUV2ZW50KEdlb21ldHJ5RXZlbnQuU1VCX0dFT01FVFJZX0FEREVELCBzdWJHZW9tZXRyeSkpO1xuXG5cdFx0dGhpcy5pSW52YWxpZGF0ZUJvdW5kcyhzdWJHZW9tZXRyeSk7XG5cdH1cblxuXHQvKipcblx0ICogUmVtb3ZlcyBhIG5ldyBUcmlhbmdsZVN1Ykdlb21ldHJ5IG9iamVjdCBmcm9tIHRoZSBsaXN0LlxuXHQgKiBAcGFyYW0gc3ViR2VvbWV0cnkgVGhlIFRyaWFuZ2xlU3ViR2VvbWV0cnkgb2JqZWN0IHRvIGJlIHJlbW92ZWQuXG5cdCAqL1xuXHRwdWJsaWMgcmVtb3ZlU3ViR2VvbWV0cnkoc3ViR2VvbWV0cnk6U3ViR2VvbWV0cnlCYXNlKVxuXHR7XG5cdFx0dGhpcy5fc3ViR2VvbWV0cmllcy5zcGxpY2UodGhpcy5fc3ViR2VvbWV0cmllcy5pbmRleE9mKHN1Ykdlb21ldHJ5KSwgMSk7XG5cblx0XHRzdWJHZW9tZXRyeS5wYXJlbnRHZW9tZXRyeSA9IG51bGw7XG5cblx0XHRpZiAodGhpcy5oYXNFdmVudExpc3RlbmVyKEdlb21ldHJ5RXZlbnQuU1VCX0dFT01FVFJZX1JFTU9WRUQpKVxuXHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBHZW9tZXRyeUV2ZW50KEdlb21ldHJ5RXZlbnQuU1VCX0dFT01FVFJZX1JFTU9WRUQsIHN1Ykdlb21ldHJ5KSk7XG5cblx0XHR0aGlzLmlJbnZhbGlkYXRlQm91bmRzKHN1Ykdlb21ldHJ5KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDbG9uZXMgdGhlIGdlb21ldHJ5LlxuXHQgKiBAcmV0dXJuIEFuIGV4YWN0IGR1cGxpY2F0ZSBvZiB0aGUgY3VycmVudCBHZW9tZXRyeSBvYmplY3QuXG5cdCAqL1xuXHRwdWJsaWMgY2xvbmUoKTpHZW9tZXRyeVxuXHR7XG5cdFx0dmFyIGNsb25lOkdlb21ldHJ5ID0gbmV3IEdlb21ldHJ5KCk7XG5cdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9zdWJHZW9tZXRyaWVzLmxlbmd0aDtcblxuXHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IGxlbjsgKytpKVxuXHRcdFx0Y2xvbmUuYWRkU3ViR2VvbWV0cnkodGhpcy5fc3ViR2VvbWV0cmllc1tpXS5jbG9uZSgpKTtcblxuXHRcdHJldHVybiBjbG9uZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTY2FsZXMgdGhlIGdlb21ldHJ5LlxuXHQgKiBAcGFyYW0gc2NhbGUgVGhlIGFtb3VudCBieSB3aGljaCB0byBzY2FsZS5cblx0ICovXG5cdHB1YmxpYyBzY2FsZShzY2FsZTpudW1iZXIpXG5cdHtcblx0XHR2YXIgbnVtU3ViR2VvbXM6bnVtYmVyID0gdGhpcy5fc3ViR2VvbWV0cmllcy5sZW5ndGg7XG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgbnVtU3ViR2VvbXM7ICsraSlcblx0XHRcdHRoaXMuX3N1Ykdlb21ldHJpZXNbaV0uc2NhbGUoc2NhbGUpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENsZWFycyBhbGwgcmVzb3VyY2VzIHVzZWQgYnkgdGhlIEdlb21ldHJ5IG9iamVjdCwgaW5jbHVkaW5nIFN1Ykdlb21ldHJpZXMuXG5cdCAqL1xuXHRwdWJsaWMgZGlzcG9zZSgpXG5cdHtcblx0XHR2YXIgbnVtU3ViR2VvbXM6bnVtYmVyID0gdGhpcy5fc3ViR2VvbWV0cmllcy5sZW5ndGg7XG5cblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBudW1TdWJHZW9tczsgKytpKSB7XG5cdFx0XHR2YXIgc3ViR2VvbTpTdWJHZW9tZXRyeUJhc2UgPSB0aGlzLl9zdWJHZW9tZXRyaWVzWzBdO1xuXHRcdFx0dGhpcy5yZW1vdmVTdWJHZW9tZXRyeShzdWJHZW9tKTtcblx0XHRcdHN1Ykdlb20uZGlzcG9zZSgpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBTY2FsZXMgdGhlIHV2IGNvb3JkaW5hdGVzICh0aWxpbmcpXG5cdCAqIEBwYXJhbSBzY2FsZVUgVGhlIGFtb3VudCBieSB3aGljaCB0byBzY2FsZSBvbiB0aGUgdSBheGlzLiBEZWZhdWx0IGlzIDE7XG5cdCAqIEBwYXJhbSBzY2FsZVYgVGhlIGFtb3VudCBieSB3aGljaCB0byBzY2FsZSBvbiB0aGUgdiBheGlzLiBEZWZhdWx0IGlzIDE7XG5cdCAqL1xuXHRwdWJsaWMgc2NhbGVVVihzY2FsZVU6bnVtYmVyID0gMSwgc2NhbGVWOm51bWJlciA9IDEpXG5cdHtcblx0XHR2YXIgbnVtU3ViR2VvbXM6bnVtYmVyID0gdGhpcy5fc3ViR2VvbWV0cmllcy5sZW5ndGg7XG5cblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBudW1TdWJHZW9tczsgKytpKVxuXHRcdFx0dGhpcy5fc3ViR2VvbWV0cmllc1tpXS5zY2FsZVVWKHNjYWxlVSwgc2NhbGVWKTtcblx0fVxuXG5cdHB1YmxpYyBpSW52YWxpZGF0ZUJvdW5kcyhzdWJHZW9tOlN1Ykdlb21ldHJ5QmFzZSlcblx0e1xuXHRcdGlmICh0aGlzLmhhc0V2ZW50TGlzdGVuZXIoR2VvbWV0cnlFdmVudC5CT1VORFNfSU5WQUxJRCkpXG5cdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEdlb21ldHJ5RXZlbnQoR2VvbWV0cnlFdmVudC5CT1VORFNfSU5WQUxJRCwgc3ViR2VvbSkpO1xuXHR9XG59XG5cbmV4cG9ydCA9IEdlb21ldHJ5OyJdfQ==