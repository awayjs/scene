var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AssetType = require("awayjs-core/lib/library/AssetType");
var Geometry = require("awayjs-display/lib/base/Geometry");
var DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
var EntityNode = require("awayjs-display/lib/partition/EntityNode");
var GeometryEvent = require("awayjs-display/lib/events/GeometryEvent");
/**
 * Mesh is an instance of a Geometry, augmenting it with a presence in the scene graph, a material, and an animation
 * state. It consists out of SubMeshes, which in turn correspond to SubGeometries. SubMeshes allow different parts
 * of the geometry to be assigned different materials.
 */
var Mesh = (function (_super) {
    __extends(Mesh, _super);
    /**
     * Create a new Mesh object.
     *
     * @param geometry                    The geometry used by the mesh that provides it with its shape.
     * @param material    [optional]        The material with which to render the Mesh.
     */
    function Mesh(geometry, material) {
        var _this = this;
        if (material === void 0) { material = null; }
        _super.call(this);
        this._castsShadows = true;
        this._shareAnimationGeometry = true;
        this._pIsEntity = true;
        this._subMeshes = new Array();
        this._onGeometryBoundsInvalidDelegate = function (event) { return _this.onGeometryBoundsInvalid(event); };
        this._onSubGeometryAddedDelegate = function (event) { return _this.onSubGeometryAdded(event); };
        this._onSubGeometryRemovedDelegate = function (event) { return _this.onSubGeometryRemoved(event); };
        //this should never happen, but if people insist on trying to create their meshes before they have geometry to fill it, it becomes necessary
        this.geometry = geometry || new Geometry();
        this.material = material;
    }
    Object.defineProperty(Mesh.prototype, "animator", {
        /**
         * Defines the animator of the mesh. Act on the mesh's geometry.  Default value is <code>null</code>.
         */
        get: function () {
            return this._animator;
        },
        set: function (value) {
            if (this._animator)
                this._animator.removeOwner(this);
            this._animator = value;
            var len = this._subMeshes.length;
            var subMesh;
            for (var i = 0; i < len; ++i) {
                subMesh = this._subMeshes[i];
                // cause material to be unregistered and registered again to work with the new animation type (if possible)
                if (subMesh.material) {
                    subMesh.material.iRemoveOwner(subMesh);
                    subMesh.material.iAddOwner(subMesh);
                }
                //invalidate any existing renderables in case they need to pull new geometry
                subMesh._iInvalidateRenderableGeometry();
            }
            if (this._animator)
                this._animator.addOwner(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mesh.prototype, "assetType", {
        /**
         *
         */
        get: function () {
            return AssetType.MESH;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mesh.prototype, "castsShadows", {
        /**
         * Indicates whether or not the Mesh can cast shadows. Default value is <code>true</code>.
         */
        get: function () {
            return this._castsShadows;
        },
        set: function (value) {
            this._castsShadows = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mesh.prototype, "geometry", {
        /**
         * The geometry used by the mesh that provides it with its shape.
         */
        get: function () {
            if (this._iSourcePrefab)
                this._iSourcePrefab._iValidate();
            return this._geometry;
        },
        set: function (value) {
            var i;
            if (this._geometry) {
                this._geometry.removeEventListener(GeometryEvent.BOUNDS_INVALID, this._onGeometryBoundsInvalidDelegate);
                this._geometry.removeEventListener(GeometryEvent.SUB_GEOMETRY_ADDED, this._onSubGeometryAddedDelegate);
                this._geometry.removeEventListener(GeometryEvent.SUB_GEOMETRY_REMOVED, this._onSubGeometryRemovedDelegate);
                for (i = 0; i < this._subMeshes.length; ++i)
                    this._subMeshes[i].dispose();
                this._subMeshes.length = 0;
            }
            this._geometry = value;
            if (this._geometry) {
                this._geometry.addEventListener(GeometryEvent.BOUNDS_INVALID, this._onGeometryBoundsInvalidDelegate);
                this._geometry.addEventListener(GeometryEvent.SUB_GEOMETRY_ADDED, this._onSubGeometryAddedDelegate);
                this._geometry.addEventListener(GeometryEvent.SUB_GEOMETRY_REMOVED, this._onSubGeometryRemovedDelegate);
                var subGeoms = this._geometry.subGeometries;
                for (i = 0; i < subGeoms.length; ++i)
                    this.addSubMesh(subGeoms[i]);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mesh.prototype, "material", {
        /**
         * The material with which to render the Mesh.
         */
        get: function () {
            return this._material;
        },
        set: function (value) {
            if (value == this._material)
                return;
            var i;
            var len = this._subMeshes.length;
            var subMesh;
            for (i = 0; i < len; i++)
                if (this._material && (subMesh = this._subMeshes[i]).material == this._material)
                    this._material.iRemoveOwner(subMesh);
            this._material = value;
            for (i = 0; i < len; i++)
                if (this._material && (subMesh = this._subMeshes[i]).material == this._material)
                    this._material.iAddOwner(subMesh);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mesh.prototype, "shareAnimationGeometry", {
        /**
         * Indicates whether or not the mesh share the same animation geometry.
         */
        get: function () {
            return this._shareAnimationGeometry;
        },
        set: function (value) {
            this._shareAnimationGeometry = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mesh.prototype, "subMeshes", {
        /**
         * The SubMeshes out of which the Mesh consists. Every SubMesh can be assigned a material to override the Mesh's
         * material.
         */
        get: function () {
            // Since this getter is invoked every iteration of the render loop, and
            // the prefab construct could affect the sub-meshes, the prefab is
            // validated here to give it a chance to rebuild.
            if (this._iSourcePrefab)
                this._iSourcePrefab._iValidate();
            return this._subMeshes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mesh.prototype, "uvTransform", {
        /**
         *
         */
        get: function () {
            return this._uvTransform;
        },
        set: function (value) {
            this._uvTransform = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     */
    Mesh.prototype.bakeTransformations = function () {
        this.geometry.applyTransformation(this._iMatrix3D);
        this._iMatrix3D.identity();
    };
    /**
     * @inheritDoc
     */
    Mesh.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.material = null;
        this.geometry = null;
    };
    /**
     * Disposes mesh including the animator and children. This is a merely a convenience method.
     * @return
     */
    Mesh.prototype.disposeWithAnimatorAndChildren = function () {
        this.disposeWithChildren();
        if (this._animator)
            this._animator.dispose();
    };
    /**
     * Clones this Mesh instance along with all it's children, while re-using the same
     * material, geometry and animation set. The returned result will be a copy of this mesh,
     * containing copies of all of it's children.
     *
     * Properties that are re-used (i.e. not cloned) by the new copy include name,
     * geometry, and material. Properties that are cloned or created anew for the copy
     * include subMeshes, children of the mesh, and the animator.
     *
     * If you want to copy just the mesh, reusing it's geometry and material while not
     * cloning it's children, the simplest way is to create a new mesh manually:
     *
     * <code>
     * var clone : Mesh = new Mesh(original.geometry, original.material);
     * </code>
     */
    Mesh.prototype.clone = function () {
        var clone = new Mesh(this._geometry, this._material);
        clone._iMatrix3D = this._iMatrix3D;
        clone.pivot = this.pivot;
        clone.partition = this.partition;
        clone.bounds = this.bounds.clone();
        clone.name = this.name;
        clone.castsShadows = this.castsShadows;
        clone.shareAnimationGeometry = this.shareAnimationGeometry;
        clone.mouseEnabled = this.mouseEnabled;
        clone.mouseChildren = this.mouseChildren;
        //this is of course no proper cloning
        //maybe use this instead?: http://blog.another-d-mention.ro/programming/how-to-clone-duplicate-an-object-in-actionscript-3/
        clone.extra = this.extra;
        var len = this._subMeshes.length;
        for (var i = 0; i < len; ++i)
            clone._subMeshes[i].material = this._subMeshes[i]._iGetExplicitMaterial();
        len = this.numChildren;
        var obj;
        for (i = 0; i < len; ++i) {
            obj = this.getChildAt(i).clone();
            clone.addChild(obj);
        }
        if (this._animator)
            clone.animator = this._animator.clone();
        return clone;
    };
    /**
     * //TODO
     *
     * @param subGeometry
     * @returns {SubMeshBase}
     */
    Mesh.prototype.getSubMeshFromSubGeometry = function (subGeometry) {
        return this._subMeshes[this._geometry.subGeometries.indexOf(subGeometry)];
    };
    /**
     * @protected
     */
    Mesh.prototype.pCreateEntityPartitionNode = function () {
        return new EntityNode(this);
    };
    /**
     * //TODO
     *
     * @protected
     */
    Mesh.prototype.pUpdateBounds = function () {
        var i, j, p, len;
        var subGeoms = this._geometry.subGeometries;
        var subGeom;
        var boundingPositions;
        var numSubGeoms = subGeoms.length;
        var minX, minY, minZ;
        var maxX, maxY, maxZ;
        if (numSubGeoms > 0) {
            i = 0;
            subGeom = subGeoms[0];
            boundingPositions = subGeom.getBoundingPositions();
            minX = maxX = boundingPositions[i];
            minY = maxY = boundingPositions[i + 1];
            minZ = maxZ = boundingPositions[i + 2];
            for (j = 0; j < numSubGeoms; j++) {
                subGeom = subGeoms[j];
                boundingPositions = subGeom.getBoundingPositions();
                len = boundingPositions.length;
                for (i = 0; i < len; i += 3) {
                    p = boundingPositions[i];
                    if (p < minX)
                        minX = p;
                    else if (p > maxX)
                        maxX = p;
                    p = boundingPositions[i + 1];
                    if (p < minY)
                        minY = p;
                    else if (p > maxY)
                        maxY = p;
                    p = boundingPositions[i + 2];
                    if (p < minZ)
                        minZ = p;
                    else if (p > maxZ)
                        maxZ = p;
                }
            }
            this._pBounds.fromExtremes(minX, minY, minZ, maxX, maxY, maxZ);
        }
        else {
            this._pBounds.fromExtremes(0, 0, 0, 0, 0, 0);
        }
        _super.prototype.pUpdateBounds.call(this);
    };
    /**
     * //TODO
     *
     * @private
     */
    Mesh.prototype.onGeometryBoundsInvalid = function (event) {
        this.pInvalidateBounds();
    };
    /**
     * Called when a SubGeometry was added to the Geometry.
     *
     * @private
     */
    Mesh.prototype.onSubGeometryAdded = function (event) {
        this.addSubMesh(event.subGeometry);
    };
    /**
     * Called when a SubGeometry was removed from the Geometry.
     *
     * @private
     */
    Mesh.prototype.onSubGeometryRemoved = function (event) {
        var subMesh;
        var subGeom = event.subGeometry;
        var len = this._subMeshes.length;
        var i;
        for (i = 0; i < len; ++i) {
            subMesh = this._subMeshes[i];
            if (subMesh.subGeometry == subGeom) {
                subMesh.dispose();
                this._subMeshes.splice(i, 1);
                break;
            }
        }
        --len;
        for (; i < len; ++i)
            this._subMeshes[i]._iIndex = i;
    };
    /**
     * Adds a SubMeshBase wrapping a SubGeometry.
     *
     * @param subGeometry
     */
    Mesh.prototype.addSubMesh = function (subGeometry) {
        var SubMeshClass = subGeometry.subMeshClass;
        var subMesh = new SubMeshClass(subGeometry, this, null);
        var len = this._subMeshes.length;
        subMesh._iIndex = len;
        this._subMeshes[len] = subMesh;
        this.pInvalidateBounds();
    };
    /**
     * //TODO
     *
     * @param shortestCollisionDistance
     * @param findClosest
     * @returns {boolean}
     *
     * @internal
     */
    Mesh.prototype._iTestCollision = function (shortestCollisionDistance, findClosest) {
        return this._pPickingCollider.testMeshCollision(this, this._pPickingCollisionVO, shortestCollisionDistance, findClosest);
    };
    /**
     *
     * @param renderer
     *
     * @internal
     */
    Mesh.prototype._iCollectRenderables = function (rendererPool) {
        // Since this getter is invoked every iteration of the render loop, and
        // the prefab construct could affect the sub-meshes, the prefab is
        // validated here to give it a chance to rebuild.
        if (this._iSourcePrefab)
            this._iSourcePrefab._iValidate();
        var len = this._subMeshes.length;
        for (var i = 0; i < len; i++)
            this._subMeshes[i]._iCollectRenderable(rendererPool);
    };
    Mesh.prototype._iInvalidateRenderableGeometries = function () {
        var len = this._subMeshes.length;
        for (var i = 0; i < len; ++i)
            this._subMeshes[i]._iInvalidateRenderableGeometry();
    };
    return Mesh;
})(DisplayObjectContainer);
module.exports = Mesh;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9NZXNoLnRzIl0sIm5hbWVzIjpbIk1lc2giLCJNZXNoLmNvbnN0cnVjdG9yIiwiTWVzaC5hbmltYXRvciIsIk1lc2guYXNzZXRUeXBlIiwiTWVzaC5jYXN0c1NoYWRvd3MiLCJNZXNoLmdlb21ldHJ5IiwiTWVzaC5tYXRlcmlhbCIsIk1lc2guc2hhcmVBbmltYXRpb25HZW9tZXRyeSIsIk1lc2guc3ViTWVzaGVzIiwiTWVzaC51dlRyYW5zZm9ybSIsIk1lc2guYmFrZVRyYW5zZm9ybWF0aW9ucyIsIk1lc2guZGlzcG9zZSIsIk1lc2guZGlzcG9zZVdpdGhBbmltYXRvckFuZENoaWxkcmVuIiwiTWVzaC5jbG9uZSIsIk1lc2guZ2V0U3ViTWVzaEZyb21TdWJHZW9tZXRyeSIsIk1lc2gucENyZWF0ZUVudGl0eVBhcnRpdGlvbk5vZGUiLCJNZXNoLnBVcGRhdGVCb3VuZHMiLCJNZXNoLm9uR2VvbWV0cnlCb3VuZHNJbnZhbGlkIiwiTWVzaC5vblN1Ykdlb21ldHJ5QWRkZWQiLCJNZXNoLm9uU3ViR2VvbWV0cnlSZW1vdmVkIiwiTWVzaC5hZGRTdWJNZXNoIiwiTWVzaC5faVRlc3RDb2xsaXNpb24iLCJNZXNoLl9pQ29sbGVjdFJlbmRlcmFibGVzIiwiTWVzaC5faUludmFsaWRhdGVSZW5kZXJhYmxlR2VvbWV0cmllcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsSUFBTyxTQUFTLFdBQWUsbUNBQW1DLENBQUMsQ0FBQztBQUlwRSxJQUFPLFFBQVEsV0FBZ0Isa0NBQWtDLENBQUMsQ0FBQztBQUtuRSxJQUFPLHNCQUFzQixXQUFZLHNEQUFzRCxDQUFDLENBQUM7QUFDakcsSUFBTyxVQUFVLFdBQWUseUNBQXlDLENBQUMsQ0FBQztBQUUzRSxJQUFPLGFBQWEsV0FBYyx5Q0FBeUMsQ0FBQyxDQUFDO0FBSTdFLEFBS0E7Ozs7R0FERztJQUNHLElBQUk7SUFBU0EsVUFBYkEsSUFBSUEsVUFBK0JBO0lBcUx4Q0E7Ozs7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Z0NBLEdBQXZDQTtRQUVDdUIsSUFBSUEsR0FBR0EsR0FBVUEsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7UUFDeENBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQVVBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLEdBQUdBLEVBQUVBLEVBQUVBLENBQUNBO1lBQ2xDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSw4QkFBOEJBLEVBQUVBLENBQUNBO0lBQ3REQSxDQUFDQTtJQUNGdkIsV0FBQ0E7QUFBREEsQ0FqZUEsQUFpZUNBLEVBamVrQixzQkFBc0IsRUFpZXhDO0FBRUQsQUFBYyxpQkFBTCxJQUFJLENBQUMiLCJmaWxlIjoiZW50aXRpZXMvTWVzaC5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyLvu79pbXBvcnQgVVZUcmFuc2Zvcm1cdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vVVZUcmFuc2Zvcm1cIik7XHJcbmltcG9ydCBBc3NldFR5cGVcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvQXNzZXRUeXBlXCIpO1xyXG5cclxuaW1wb3J0IElBbmltYXRvclx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYW5pbWF0b3JzL0lBbmltYXRvclwiKTtcclxuaW1wb3J0IERpc3BsYXlPYmplY3RcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0Rpc3BsYXlPYmplY3RcIik7XHJcbmltcG9ydCBHZW9tZXRyeVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0dlb21ldHJ5XCIpO1xyXG5pbXBvcnQgSVN1Yk1lc2hcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9JU3ViTWVzaFwiKTtcclxuaW1wb3J0IElTdWJNZXNoQ2xhc3NcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0lTdWJNZXNoQ2xhc3NcIik7XHJcbmltcG9ydCBUcmlhbmdsZVN1Ykdlb21ldHJ5XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvVHJpYW5nbGVTdWJHZW9tZXRyeVwiKTtcclxuaW1wb3J0IFN1Ykdlb21ldHJ5QmFzZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvU3ViR2VvbWV0cnlCYXNlXCIpO1xyXG5pbXBvcnQgRGlzcGxheU9iamVjdENvbnRhaW5lclx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvY29udGFpbmVycy9EaXNwbGF5T2JqZWN0Q29udGFpbmVyXCIpO1xyXG5pbXBvcnQgRW50aXR5Tm9kZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcGFydGl0aW9uL0VudGl0eU5vZGVcIik7XHJcbmltcG9ydCBJUmVuZGVyZXJQb29sXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcG9vbC9JUmVuZGVyZXJQb29sXCIpO1xyXG5pbXBvcnQgR2VvbWV0cnlFdmVudFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2V2ZW50cy9HZW9tZXRyeUV2ZW50XCIpO1xyXG5pbXBvcnQgSUVudGl0eVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9JRW50aXR5XCIpO1xyXG5pbXBvcnQgTWF0ZXJpYWxCYXNlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9tYXRlcmlhbHMvTWF0ZXJpYWxCYXNlXCIpO1xyXG5cclxuLyoqXHJcbiAqIE1lc2ggaXMgYW4gaW5zdGFuY2Ugb2YgYSBHZW9tZXRyeSwgYXVnbWVudGluZyBpdCB3aXRoIGEgcHJlc2VuY2UgaW4gdGhlIHNjZW5lIGdyYXBoLCBhIG1hdGVyaWFsLCBhbmQgYW4gYW5pbWF0aW9uXHJcbiAqIHN0YXRlLiBJdCBjb25zaXN0cyBvdXQgb2YgU3ViTWVzaGVzLCB3aGljaCBpbiB0dXJuIGNvcnJlc3BvbmQgdG8gU3ViR2VvbWV0cmllcy4gU3ViTWVzaGVzIGFsbG93IGRpZmZlcmVudCBwYXJ0c1xyXG4gKiBvZiB0aGUgZ2VvbWV0cnkgdG8gYmUgYXNzaWduZWQgZGlmZmVyZW50IG1hdGVyaWFscy5cclxuICovXHJcbmNsYXNzIE1lc2ggZXh0ZW5kcyBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIGltcGxlbWVudHMgSUVudGl0eVxyXG57XHJcblx0cHJpdmF0ZSBfdXZUcmFuc2Zvcm06VVZUcmFuc2Zvcm07XHJcblxyXG5cdHByaXZhdGUgX3N1Yk1lc2hlczpBcnJheTxJU3ViTWVzaD47XHJcblx0cHJpdmF0ZSBfZ2VvbWV0cnk6R2VvbWV0cnk7XHJcblx0cHJpdmF0ZSBfbWF0ZXJpYWw6TWF0ZXJpYWxCYXNlO1xyXG5cdHByaXZhdGUgX2FuaW1hdG9yOklBbmltYXRvcjtcclxuXHRwcml2YXRlIF9jYXN0c1NoYWRvd3M6Ym9vbGVhbiA9IHRydWU7XHJcblx0cHJpdmF0ZSBfc2hhcmVBbmltYXRpb25HZW9tZXRyeTpib29sZWFuID0gdHJ1ZTtcclxuXHJcblx0cHJpdmF0ZSBfb25HZW9tZXRyeUJvdW5kc0ludmFsaWREZWxlZ2F0ZTooZXZlbnQ6R2VvbWV0cnlFdmVudCkgPT4gdm9pZDtcclxuXHRwcml2YXRlIF9vblN1Ykdlb21ldHJ5QWRkZWREZWxlZ2F0ZTooZXZlbnQ6R2VvbWV0cnlFdmVudCkgPT4gdm9pZDtcclxuXHRwcml2YXRlIF9vblN1Ykdlb21ldHJ5UmVtb3ZlZERlbGVnYXRlOihldmVudDpHZW9tZXRyeUV2ZW50KSA9PiB2b2lkO1xyXG5cclxuXHQvKipcclxuXHQgKiBEZWZpbmVzIHRoZSBhbmltYXRvciBvZiB0aGUgbWVzaC4gQWN0IG9uIHRoZSBtZXNoJ3MgZ2VvbWV0cnkuICBEZWZhdWx0IHZhbHVlIGlzIDxjb2RlPm51bGw8L2NvZGU+LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgYW5pbWF0b3IoKTpJQW5pbWF0b3JcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fYW5pbWF0b3I7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IGFuaW1hdG9yKHZhbHVlOklBbmltYXRvcilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fYW5pbWF0b3IpXHJcblx0XHRcdHRoaXMuX2FuaW1hdG9yLnJlbW92ZU93bmVyKHRoaXMpO1xyXG5cclxuXHRcdHRoaXMuX2FuaW1hdG9yID0gdmFsdWU7XHJcblxyXG5cdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9zdWJNZXNoZXMubGVuZ3RoO1xyXG5cdFx0dmFyIHN1Yk1lc2g6SVN1Yk1lc2g7XHJcblxyXG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgbGVuOyArK2kpIHtcclxuXHRcdFx0c3ViTWVzaCA9IHRoaXMuX3N1Yk1lc2hlc1tpXTtcclxuXHJcblx0XHRcdC8vIGNhdXNlIG1hdGVyaWFsIHRvIGJlIHVucmVnaXN0ZXJlZCBhbmQgcmVnaXN0ZXJlZCBhZ2FpbiB0byB3b3JrIHdpdGggdGhlIG5ldyBhbmltYXRpb24gdHlwZSAoaWYgcG9zc2libGUpXHJcblx0XHRcdGlmIChzdWJNZXNoLm1hdGVyaWFsKSB7XHJcblx0XHRcdFx0c3ViTWVzaC5tYXRlcmlhbC5pUmVtb3ZlT3duZXIoc3ViTWVzaCk7XHJcblx0XHRcdFx0c3ViTWVzaC5tYXRlcmlhbC5pQWRkT3duZXIoc3ViTWVzaCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vaW52YWxpZGF0ZSBhbnkgZXhpc3RpbmcgcmVuZGVyYWJsZXMgaW4gY2FzZSB0aGV5IG5lZWQgdG8gcHVsbCBuZXcgZ2VvbWV0cnlcclxuXHRcdFx0c3ViTWVzaC5faUludmFsaWRhdGVSZW5kZXJhYmxlR2VvbWV0cnkoKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5fYW5pbWF0b3IpXHJcblx0XHRcdHRoaXMuX2FuaW1hdG9yLmFkZE93bmVyKHRoaXMpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGFzc2V0VHlwZSgpOnN0cmluZ1xyXG5cdHtcclxuXHRcdHJldHVybiBBc3NldFR5cGUuTUVTSDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluZGljYXRlcyB3aGV0aGVyIG9yIG5vdCB0aGUgTWVzaCBjYW4gY2FzdCBzaGFkb3dzLiBEZWZhdWx0IHZhbHVlIGlzIDxjb2RlPnRydWU8L2NvZGU+LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgY2FzdHNTaGFkb3dzKCk6Ym9vbGVhblxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9jYXN0c1NoYWRvd3M7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IGNhc3RzU2hhZG93cyh2YWx1ZTpib29sZWFuKVxyXG5cdHtcclxuXHRcdHRoaXMuX2Nhc3RzU2hhZG93cyA9IHZhbHVlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGdlb21ldHJ5IHVzZWQgYnkgdGhlIG1lc2ggdGhhdCBwcm92aWRlcyBpdCB3aXRoIGl0cyBzaGFwZS5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGdlb21ldHJ5KCk6R2VvbWV0cnlcclxuXHR7XHJcblx0XHRpZiAodGhpcy5faVNvdXJjZVByZWZhYilcclxuXHRcdFx0dGhpcy5faVNvdXJjZVByZWZhYi5faVZhbGlkYXRlKCk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX2dlb21ldHJ5O1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBnZW9tZXRyeSh2YWx1ZTpHZW9tZXRyeSlcclxuXHR7XHJcblx0XHR2YXIgaTpudW1iZXI7XHJcblxyXG5cdFx0aWYgKHRoaXMuX2dlb21ldHJ5KSB7XHJcblx0XHRcdHRoaXMuX2dlb21ldHJ5LnJlbW92ZUV2ZW50TGlzdGVuZXIoR2VvbWV0cnlFdmVudC5CT1VORFNfSU5WQUxJRCwgdGhpcy5fb25HZW9tZXRyeUJvdW5kc0ludmFsaWREZWxlZ2F0ZSk7XHJcblx0XHRcdHRoaXMuX2dlb21ldHJ5LnJlbW92ZUV2ZW50TGlzdGVuZXIoR2VvbWV0cnlFdmVudC5TVUJfR0VPTUVUUllfQURERUQsIHRoaXMuX29uU3ViR2VvbWV0cnlBZGRlZERlbGVnYXRlKTtcclxuXHRcdFx0dGhpcy5fZ2VvbWV0cnkucmVtb3ZlRXZlbnRMaXN0ZW5lcihHZW9tZXRyeUV2ZW50LlNVQl9HRU9NRVRSWV9SRU1PVkVELCB0aGlzLl9vblN1Ykdlb21ldHJ5UmVtb3ZlZERlbGVnYXRlKTtcclxuXHJcblx0XHRcdGZvciAoaSA9IDA7IGkgPCB0aGlzLl9zdWJNZXNoZXMubGVuZ3RoOyArK2kpXHJcblx0XHRcdFx0dGhpcy5fc3ViTWVzaGVzW2ldLmRpc3Bvc2UoKTtcclxuXHJcblx0XHRcdHRoaXMuX3N1Yk1lc2hlcy5sZW5ndGggPSAwO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX2dlb21ldHJ5ID0gdmFsdWU7XHJcblxyXG5cdFx0aWYgKHRoaXMuX2dlb21ldHJ5KSB7XHJcblxyXG5cdFx0XHR0aGlzLl9nZW9tZXRyeS5hZGRFdmVudExpc3RlbmVyKEdlb21ldHJ5RXZlbnQuQk9VTkRTX0lOVkFMSUQsIHRoaXMuX29uR2VvbWV0cnlCb3VuZHNJbnZhbGlkRGVsZWdhdGUpO1xyXG5cdFx0XHR0aGlzLl9nZW9tZXRyeS5hZGRFdmVudExpc3RlbmVyKEdlb21ldHJ5RXZlbnQuU1VCX0dFT01FVFJZX0FEREVELCB0aGlzLl9vblN1Ykdlb21ldHJ5QWRkZWREZWxlZ2F0ZSk7XHJcblx0XHRcdHRoaXMuX2dlb21ldHJ5LmFkZEV2ZW50TGlzdGVuZXIoR2VvbWV0cnlFdmVudC5TVUJfR0VPTUVUUllfUkVNT1ZFRCwgdGhpcy5fb25TdWJHZW9tZXRyeVJlbW92ZWREZWxlZ2F0ZSk7XHJcblxyXG5cdFx0XHR2YXIgc3ViR2VvbXM6QXJyYXk8U3ViR2VvbWV0cnlCYXNlPiA9IHRoaXMuX2dlb21ldHJ5LnN1Ykdlb21ldHJpZXM7XHJcblxyXG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgc3ViR2VvbXMubGVuZ3RoOyArK2kpXHJcblx0XHRcdFx0dGhpcy5hZGRTdWJNZXNoKHN1Ykdlb21zW2ldKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBtYXRlcmlhbCB3aXRoIHdoaWNoIHRvIHJlbmRlciB0aGUgTWVzaC5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IG1hdGVyaWFsKCk6TWF0ZXJpYWxCYXNlXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX21hdGVyaWFsO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBtYXRlcmlhbCh2YWx1ZTpNYXRlcmlhbEJhc2UpXHJcblx0e1xyXG5cdFx0aWYgKHZhbHVlID09IHRoaXMuX21hdGVyaWFsKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dmFyIGk6bnVtYmVyO1xyXG5cdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9zdWJNZXNoZXMubGVuZ3RoO1xyXG5cdFx0dmFyIHN1Yk1lc2g6SVN1Yk1lc2g7XHJcblxyXG5cdFx0Zm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKVxyXG5cdFx0XHRpZiAodGhpcy5fbWF0ZXJpYWwgJiYgKHN1Yk1lc2ggPSB0aGlzLl9zdWJNZXNoZXNbaV0pLm1hdGVyaWFsID09IHRoaXMuX21hdGVyaWFsKVxyXG5cdFx0XHRcdHRoaXMuX21hdGVyaWFsLmlSZW1vdmVPd25lcihzdWJNZXNoKTtcclxuXHJcblx0XHR0aGlzLl9tYXRlcmlhbCA9IHZhbHVlO1xyXG5cclxuXHRcdGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKylcclxuXHRcdFx0aWYgKHRoaXMuX21hdGVyaWFsICYmIChzdWJNZXNoID0gdGhpcy5fc3ViTWVzaGVzW2ldKS5tYXRlcmlhbCA9PSB0aGlzLl9tYXRlcmlhbClcclxuXHRcdFx0XHR0aGlzLl9tYXRlcmlhbC5pQWRkT3duZXIoc3ViTWVzaCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJbmRpY2F0ZXMgd2hldGhlciBvciBub3QgdGhlIG1lc2ggc2hhcmUgdGhlIHNhbWUgYW5pbWF0aW9uIGdlb21ldHJ5LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgc2hhcmVBbmltYXRpb25HZW9tZXRyeSgpOmJvb2xlYW5cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fc2hhcmVBbmltYXRpb25HZW9tZXRyeTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgc2hhcmVBbmltYXRpb25HZW9tZXRyeSh2YWx1ZTpib29sZWFuKVxyXG5cdHtcclxuXHRcdHRoaXMuX3NoYXJlQW5pbWF0aW9uR2VvbWV0cnkgPSB2YWx1ZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBTdWJNZXNoZXMgb3V0IG9mIHdoaWNoIHRoZSBNZXNoIGNvbnNpc3RzLiBFdmVyeSBTdWJNZXNoIGNhbiBiZSBhc3NpZ25lZCBhIG1hdGVyaWFsIHRvIG92ZXJyaWRlIHRoZSBNZXNoJ3NcclxuXHQgKiBtYXRlcmlhbC5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHN1Yk1lc2hlcygpOkFycmF5PElTdWJNZXNoPlxyXG5cdHtcclxuXHRcdC8vIFNpbmNlIHRoaXMgZ2V0dGVyIGlzIGludm9rZWQgZXZlcnkgaXRlcmF0aW9uIG9mIHRoZSByZW5kZXIgbG9vcCwgYW5kXHJcblx0XHQvLyB0aGUgcHJlZmFiIGNvbnN0cnVjdCBjb3VsZCBhZmZlY3QgdGhlIHN1Yi1tZXNoZXMsIHRoZSBwcmVmYWIgaXNcclxuXHRcdC8vIHZhbGlkYXRlZCBoZXJlIHRvIGdpdmUgaXQgYSBjaGFuY2UgdG8gcmVidWlsZC5cclxuXHRcdGlmICh0aGlzLl9pU291cmNlUHJlZmFiKVxyXG5cdFx0XHR0aGlzLl9pU291cmNlUHJlZmFiLl9pVmFsaWRhdGUoKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fc3ViTWVzaGVzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHV2VHJhbnNmb3JtKCk6VVZUcmFuc2Zvcm1cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fdXZUcmFuc2Zvcm07XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHV2VHJhbnNmb3JtKHZhbHVlOlVWVHJhbnNmb3JtKVxyXG5cdHtcclxuXHRcdHRoaXMuX3V2VHJhbnNmb3JtID0gdmFsdWU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGUgYSBuZXcgTWVzaCBvYmplY3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gZ2VvbWV0cnkgICAgICAgICAgICAgICAgICAgIFRoZSBnZW9tZXRyeSB1c2VkIGJ5IHRoZSBtZXNoIHRoYXQgcHJvdmlkZXMgaXQgd2l0aCBpdHMgc2hhcGUuXHJcblx0ICogQHBhcmFtIG1hdGVyaWFsICAgIFtvcHRpb25hbF0gICAgICAgIFRoZSBtYXRlcmlhbCB3aXRoIHdoaWNoIHRvIHJlbmRlciB0aGUgTWVzaC5cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcihnZW9tZXRyeTpHZW9tZXRyeSwgbWF0ZXJpYWw6TWF0ZXJpYWxCYXNlID0gbnVsbClcclxuXHR7XHJcblx0XHRzdXBlcigpO1xyXG5cclxuXHRcdHRoaXMuX3BJc0VudGl0eSA9IHRydWU7XHJcblxyXG5cdFx0dGhpcy5fc3ViTWVzaGVzID0gbmV3IEFycmF5PElTdWJNZXNoPigpO1xyXG5cclxuXHRcdHRoaXMuX29uR2VvbWV0cnlCb3VuZHNJbnZhbGlkRGVsZWdhdGUgPSAoZXZlbnQ6R2VvbWV0cnlFdmVudCkgPT4gdGhpcy5vbkdlb21ldHJ5Qm91bmRzSW52YWxpZChldmVudCk7XHJcblx0XHR0aGlzLl9vblN1Ykdlb21ldHJ5QWRkZWREZWxlZ2F0ZSA9IChldmVudDpHZW9tZXRyeUV2ZW50KSA9PiB0aGlzLm9uU3ViR2VvbWV0cnlBZGRlZChldmVudCk7XHJcblx0XHR0aGlzLl9vblN1Ykdlb21ldHJ5UmVtb3ZlZERlbGVnYXRlID0gKGV2ZW50Okdlb21ldHJ5RXZlbnQpID0+IHRoaXMub25TdWJHZW9tZXRyeVJlbW92ZWQoZXZlbnQpO1xyXG5cclxuXHRcdC8vdGhpcyBzaG91bGQgbmV2ZXIgaGFwcGVuLCBidXQgaWYgcGVvcGxlIGluc2lzdCBvbiB0cnlpbmcgdG8gY3JlYXRlIHRoZWlyIG1lc2hlcyBiZWZvcmUgdGhleSBoYXZlIGdlb21ldHJ5IHRvIGZpbGwgaXQsIGl0IGJlY29tZXMgbmVjZXNzYXJ5XHJcblx0XHR0aGlzLmdlb21ldHJ5ID0gZ2VvbWV0cnkgfHwgbmV3IEdlb21ldHJ5KCk7XHJcblxyXG5cdFx0dGhpcy5tYXRlcmlhbCA9IG1hdGVyaWFsO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgYmFrZVRyYW5zZm9ybWF0aW9ucygpXHJcblx0e1xyXG5cdFx0dGhpcy5nZW9tZXRyeS5hcHBseVRyYW5zZm9ybWF0aW9uKHRoaXMuX2lNYXRyaXgzRCk7XHJcblx0XHR0aGlzLl9pTWF0cml4M0QuaWRlbnRpdHkoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBpbmhlcml0RG9jXHJcblx0ICovXHJcblx0cHVibGljIGRpc3Bvc2UoKVxyXG5cdHtcclxuXHRcdHN1cGVyLmRpc3Bvc2UoKTtcclxuXHJcblx0XHR0aGlzLm1hdGVyaWFsID0gbnVsbDtcclxuXHRcdHRoaXMuZ2VvbWV0cnkgPSBudWxsO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRGlzcG9zZXMgbWVzaCBpbmNsdWRpbmcgdGhlIGFuaW1hdG9yIGFuZCBjaGlsZHJlbi4gVGhpcyBpcyBhIG1lcmVseSBhIGNvbnZlbmllbmNlIG1ldGhvZC5cclxuXHQgKiBAcmV0dXJuXHJcblx0ICovXHJcblx0cHVibGljIGRpc3Bvc2VXaXRoQW5pbWF0b3JBbmRDaGlsZHJlbigpXHJcblx0e1xyXG5cdFx0dGhpcy5kaXNwb3NlV2l0aENoaWxkcmVuKCk7XHJcblxyXG5cdFx0IGlmICh0aGlzLl9hbmltYXRvcilcclxuXHRcdFx0dGhpcy5fYW5pbWF0b3IuZGlzcG9zZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2xvbmVzIHRoaXMgTWVzaCBpbnN0YW5jZSBhbG9uZyB3aXRoIGFsbCBpdCdzIGNoaWxkcmVuLCB3aGlsZSByZS11c2luZyB0aGUgc2FtZVxyXG5cdCAqIG1hdGVyaWFsLCBnZW9tZXRyeSBhbmQgYW5pbWF0aW9uIHNldC4gVGhlIHJldHVybmVkIHJlc3VsdCB3aWxsIGJlIGEgY29weSBvZiB0aGlzIG1lc2gsXHJcblx0ICogY29udGFpbmluZyBjb3BpZXMgb2YgYWxsIG9mIGl0J3MgY2hpbGRyZW4uXHJcblx0ICpcclxuXHQgKiBQcm9wZXJ0aWVzIHRoYXQgYXJlIHJlLXVzZWQgKGkuZS4gbm90IGNsb25lZCkgYnkgdGhlIG5ldyBjb3B5IGluY2x1ZGUgbmFtZSxcclxuXHQgKiBnZW9tZXRyeSwgYW5kIG1hdGVyaWFsLiBQcm9wZXJ0aWVzIHRoYXQgYXJlIGNsb25lZCBvciBjcmVhdGVkIGFuZXcgZm9yIHRoZSBjb3B5XHJcblx0ICogaW5jbHVkZSBzdWJNZXNoZXMsIGNoaWxkcmVuIG9mIHRoZSBtZXNoLCBhbmQgdGhlIGFuaW1hdG9yLlxyXG5cdCAqXHJcblx0ICogSWYgeW91IHdhbnQgdG8gY29weSBqdXN0IHRoZSBtZXNoLCByZXVzaW5nIGl0J3MgZ2VvbWV0cnkgYW5kIG1hdGVyaWFsIHdoaWxlIG5vdFxyXG5cdCAqIGNsb25pbmcgaXQncyBjaGlsZHJlbiwgdGhlIHNpbXBsZXN0IHdheSBpcyB0byBjcmVhdGUgYSBuZXcgbWVzaCBtYW51YWxseTpcclxuXHQgKlxyXG5cdCAqIDxjb2RlPlxyXG5cdCAqIHZhciBjbG9uZSA6IE1lc2ggPSBuZXcgTWVzaChvcmlnaW5hbC5nZW9tZXRyeSwgb3JpZ2luYWwubWF0ZXJpYWwpO1xyXG5cdCAqIDwvY29kZT5cclxuXHQgKi9cclxuXHRwdWJsaWMgY2xvbmUoKTpEaXNwbGF5T2JqZWN0XHJcblx0e1xyXG5cdFx0dmFyIGNsb25lOk1lc2ggPSBuZXcgTWVzaCh0aGlzLl9nZW9tZXRyeSwgdGhpcy5fbWF0ZXJpYWwpO1xyXG5cclxuXHRcdGNsb25lLl9pTWF0cml4M0QgPSB0aGlzLl9pTWF0cml4M0Q7XHJcblx0XHRjbG9uZS5waXZvdCA9IHRoaXMucGl2b3Q7XHJcblx0XHRjbG9uZS5wYXJ0aXRpb24gPSB0aGlzLnBhcnRpdGlvbjtcclxuXHRcdGNsb25lLmJvdW5kcyA9IHRoaXMuYm91bmRzLmNsb25lKCk7XHJcblxyXG5cclxuXHRcdGNsb25lLm5hbWUgPSB0aGlzLm5hbWU7XHJcblx0XHRjbG9uZS5jYXN0c1NoYWRvd3MgPSB0aGlzLmNhc3RzU2hhZG93cztcclxuXHRcdGNsb25lLnNoYXJlQW5pbWF0aW9uR2VvbWV0cnkgPSB0aGlzLnNoYXJlQW5pbWF0aW9uR2VvbWV0cnk7XHJcblx0XHRjbG9uZS5tb3VzZUVuYWJsZWQgPSB0aGlzLm1vdXNlRW5hYmxlZDtcclxuXHRcdGNsb25lLm1vdXNlQ2hpbGRyZW4gPSB0aGlzLm1vdXNlQ2hpbGRyZW47XHJcblx0XHQvL3RoaXMgaXMgb2YgY291cnNlIG5vIHByb3BlciBjbG9uaW5nXHJcblx0XHQvL21heWJlIHVzZSB0aGlzIGluc3RlYWQ/OiBodHRwOi8vYmxvZy5hbm90aGVyLWQtbWVudGlvbi5yby9wcm9ncmFtbWluZy9ob3ctdG8tY2xvbmUtZHVwbGljYXRlLWFuLW9iamVjdC1pbi1hY3Rpb25zY3JpcHQtMy9cclxuXHRcdGNsb25lLmV4dHJhID0gdGhpcy5leHRyYTtcclxuXHJcblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX3N1Yk1lc2hlcy5sZW5ndGg7XHJcblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBsZW47ICsraSlcclxuXHRcdFx0Y2xvbmUuX3N1Yk1lc2hlc1tpXS5tYXRlcmlhbCA9IHRoaXMuX3N1Yk1lc2hlc1tpXS5faUdldEV4cGxpY2l0TWF0ZXJpYWwoKTtcclxuXHJcblxyXG5cdFx0bGVuID0gdGhpcy5udW1DaGlsZHJlbjtcclxuXHRcdHZhciBvYmo6YW55O1xyXG5cclxuXHRcdGZvciAoaSA9IDA7IGkgPCBsZW47ICsraSkge1xyXG5cdFx0XHRvYmogPSB0aGlzLmdldENoaWxkQXQoaSkuY2xvbmUoKTtcclxuXHRcdFx0Y2xvbmUuYWRkQ2hpbGQoPERpc3BsYXlPYmplY3RDb250YWluZXI+IG9iaik7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuX2FuaW1hdG9yKVxyXG5cdFx0XHRjbG9uZS5hbmltYXRvciA9IHRoaXMuX2FuaW1hdG9yLmNsb25lKCk7XHJcblxyXG5cdFx0cmV0dXJuIGNsb25lO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogLy9UT0RPXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3ViR2VvbWV0cnlcclxuXHQgKiBAcmV0dXJucyB7U3ViTWVzaEJhc2V9XHJcblx0ICovXHJcblx0cHVibGljIGdldFN1Yk1lc2hGcm9tU3ViR2VvbWV0cnkoc3ViR2VvbWV0cnk6U3ViR2VvbWV0cnlCYXNlKTpJU3ViTWVzaFxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9zdWJNZXNoZXNbdGhpcy5fZ2VvbWV0cnkuc3ViR2VvbWV0cmllcy5pbmRleE9mKHN1Ykdlb21ldHJ5KV07XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAcHJvdGVjdGVkXHJcblx0ICovXHJcblx0cHVibGljIHBDcmVhdGVFbnRpdHlQYXJ0aXRpb25Ob2RlKCk6RW50aXR5Tm9kZVxyXG5cdHtcclxuXHRcdHJldHVybiBuZXcgRW50aXR5Tm9kZSh0aGlzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIC8vVE9ET1xyXG5cdCAqXHJcblx0ICogQHByb3RlY3RlZFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBwVXBkYXRlQm91bmRzKClcclxuXHR7XHJcblx0XHR2YXIgaTpudW1iZXIsIGo6bnVtYmVyLCBwOm51bWJlciwgbGVuOm51bWJlcjtcclxuXHRcdHZhciBzdWJHZW9tczpBcnJheTxTdWJHZW9tZXRyeUJhc2U+ID0gdGhpcy5fZ2VvbWV0cnkuc3ViR2VvbWV0cmllcztcclxuXHRcdHZhciBzdWJHZW9tOlN1Ykdlb21ldHJ5QmFzZTtcclxuXHRcdHZhciBib3VuZGluZ1Bvc2l0aW9uczpBcnJheTxudW1iZXI+O1xyXG5cdFx0dmFyIG51bVN1Ykdlb21zOm51bWJlciA9IHN1Ykdlb21zLmxlbmd0aDtcclxuXHRcdHZhciBtaW5YOm51bWJlciwgbWluWTpudW1iZXIsIG1pblo6bnVtYmVyO1xyXG5cdFx0dmFyIG1heFg6bnVtYmVyLCBtYXhZOm51bWJlciwgbWF4WjpudW1iZXI7XHJcblxyXG5cdFx0aWYgKG51bVN1Ykdlb21zID4gMCkge1xyXG5cdFx0XHRpID0gMDtcclxuXHRcdFx0c3ViR2VvbSA9IHN1Ykdlb21zWzBdO1xyXG5cdFx0XHRib3VuZGluZ1Bvc2l0aW9ucyA9IHN1Ykdlb20uZ2V0Qm91bmRpbmdQb3NpdGlvbnMoKTtcclxuXHRcdFx0bWluWCA9IG1heFggPSBib3VuZGluZ1Bvc2l0aW9uc1tpXTtcclxuXHRcdFx0bWluWSA9IG1heFkgPSBib3VuZGluZ1Bvc2l0aW9uc1tpICsgMV07XHJcblx0XHRcdG1pblogPSBtYXhaID0gYm91bmRpbmdQb3NpdGlvbnNbaSArIDJdO1xyXG5cclxuXHRcdFx0Zm9yIChqID0gMDsgaiA8IG51bVN1Ykdlb21zOyBqKyspIHtcclxuXHRcdFx0XHRzdWJHZW9tID0gc3ViR2VvbXNbal07XHJcblx0XHRcdFx0Ym91bmRpbmdQb3NpdGlvbnMgPSBzdWJHZW9tLmdldEJvdW5kaW5nUG9zaXRpb25zKCk7XHJcblx0XHRcdFx0bGVuID0gYm91bmRpbmdQb3NpdGlvbnMubGVuZ3RoO1xyXG5cclxuXHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKz0zKSB7XHJcblx0XHRcdFx0XHRwID0gYm91bmRpbmdQb3NpdGlvbnNbaV07XHJcblx0XHRcdFx0XHRpZiAocCA8IG1pblgpXHJcblx0XHRcdFx0XHRcdG1pblggPSBwO1xyXG5cdFx0XHRcdFx0ZWxzZSBpZiAocCA+IG1heFgpXHJcblx0XHRcdFx0XHRcdG1heFggPSBwO1xyXG5cclxuXHRcdFx0XHRcdHAgPSBib3VuZGluZ1Bvc2l0aW9uc1tpICsgMV07XHJcblxyXG5cdFx0XHRcdFx0aWYgKHAgPCBtaW5ZKVxyXG5cdFx0XHRcdFx0XHRtaW5ZID0gcDtcclxuXHRcdFx0XHRcdGVsc2UgaWYgKHAgPiBtYXhZKVxyXG5cdFx0XHRcdFx0XHRtYXhZID0gcDtcclxuXHJcblx0XHRcdFx0XHRwID0gYm91bmRpbmdQb3NpdGlvbnNbaSArIDJdO1xyXG5cclxuXHRcdFx0XHRcdGlmIChwIDwgbWluWilcclxuXHRcdFx0XHRcdFx0bWluWiA9IHA7XHJcblx0XHRcdFx0XHRlbHNlIGlmIChwID4gbWF4WilcclxuXHRcdFx0XHRcdFx0bWF4WiA9IHA7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLl9wQm91bmRzLmZyb21FeHRyZW1lcyhtaW5YLCBtaW5ZLCBtaW5aLCBtYXhYLCBtYXhZLCBtYXhaKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuX3BCb3VuZHMuZnJvbUV4dHJlbWVzKDAsIDAsIDAsIDAsIDAsIDApO1xyXG5cdFx0fVxyXG5cclxuXHRcdHN1cGVyLnBVcGRhdGVCb3VuZHMoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIC8vVE9ET1xyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIG9uR2VvbWV0cnlCb3VuZHNJbnZhbGlkKGV2ZW50Okdlb21ldHJ5RXZlbnQpXHJcblx0e1xyXG5cdFx0dGhpcy5wSW52YWxpZGF0ZUJvdW5kcygpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2FsbGVkIHdoZW4gYSBTdWJHZW9tZXRyeSB3YXMgYWRkZWQgdG8gdGhlIEdlb21ldHJ5LlxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIG9uU3ViR2VvbWV0cnlBZGRlZChldmVudDpHZW9tZXRyeUV2ZW50KVxyXG5cdHtcclxuXHRcdHRoaXMuYWRkU3ViTWVzaChldmVudC5zdWJHZW9tZXRyeSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDYWxsZWQgd2hlbiBhIFN1Ykdlb21ldHJ5IHdhcyByZW1vdmVkIGZyb20gdGhlIEdlb21ldHJ5LlxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIG9uU3ViR2VvbWV0cnlSZW1vdmVkKGV2ZW50Okdlb21ldHJ5RXZlbnQpXHJcblx0e1xyXG5cdFx0dmFyIHN1Yk1lc2g6SVN1Yk1lc2g7XHJcblx0XHR2YXIgc3ViR2VvbTpTdWJHZW9tZXRyeUJhc2UgPSBldmVudC5zdWJHZW9tZXRyeTtcclxuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fc3ViTWVzaGVzLmxlbmd0aDtcclxuXHRcdHZhciBpOm51bWJlcjtcclxuXHJcblx0XHQvLyBJbXBvcnRhbnQhIFRoaXMgaGFzIHRvIGJlIGRvbmUgaGVyZSwgYW5kIG5vdCBkZWxheWVkIHVudGlsIHRoZVxyXG5cdFx0Ly8gbmV4dCByZW5kZXIgbG9vcCwgc2luY2UgdGhpcyBtYXkgYmUgY2F1c2VkIGJ5IHRoZSBnZW9tZXRyeSBiZWluZ1xyXG5cdFx0Ly8gcmVidWlsdCBJTiBUSEUgUkVOREVSIExPT1AuIEludmFsaWRhdGluZyBhbmQgd2FpdGluZyB3aWxsIGRlbGF5XHJcblx0XHQvLyBpdCB1bnRpbCB0aGUgTkVYVCBSRU5ERVIgRlJBTUUgd2hpY2ggaXMgcHJvYmFibHkgbm90IGRlc2lyYWJsZS5cclxuXHRcdGZvciAoaSA9IDA7IGkgPCBsZW47ICsraSkge1xyXG5cclxuXHRcdFx0c3ViTWVzaCA9IHRoaXMuX3N1Yk1lc2hlc1tpXTtcclxuXHJcblx0XHRcdGlmIChzdWJNZXNoLnN1Ykdlb21ldHJ5ID09IHN1Ykdlb20pIHtcclxuXHRcdFx0XHRzdWJNZXNoLmRpc3Bvc2UoKTtcclxuXHJcblx0XHRcdFx0dGhpcy5fc3ViTWVzaGVzLnNwbGljZShpLCAxKTtcclxuXHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQtLWxlbjtcclxuXHRcdGZvciAoOyBpIDwgbGVuOyArK2kpXHJcblx0XHRcdHRoaXMuX3N1Yk1lc2hlc1tpXS5faUluZGV4ID0gaTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgYSBTdWJNZXNoQmFzZSB3cmFwcGluZyBhIFN1Ykdlb21ldHJ5LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN1Ykdlb21ldHJ5XHJcblx0ICovXHJcblx0cHJpdmF0ZSBhZGRTdWJNZXNoKHN1Ykdlb21ldHJ5OlN1Ykdlb21ldHJ5QmFzZSlcclxuXHR7XHJcblx0XHR2YXIgU3ViTWVzaENsYXNzOklTdWJNZXNoQ2xhc3MgPSBzdWJHZW9tZXRyeS5zdWJNZXNoQ2xhc3M7XHJcblxyXG5cdFx0dmFyIHN1Yk1lc2g6SVN1Yk1lc2ggPSBuZXcgU3ViTWVzaENsYXNzKHN1Ykdlb21ldHJ5LCB0aGlzLCBudWxsKTtcclxuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fc3ViTWVzaGVzLmxlbmd0aDtcclxuXHJcblx0XHRzdWJNZXNoLl9pSW5kZXggPSBsZW47XHJcblxyXG5cdFx0dGhpcy5fc3ViTWVzaGVzW2xlbl0gPSBzdWJNZXNoO1xyXG5cclxuXHRcdHRoaXMucEludmFsaWRhdGVCb3VuZHMoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIC8vVE9ET1xyXG5cdCAqXHJcblx0ICogQHBhcmFtIHNob3J0ZXN0Q29sbGlzaW9uRGlzdGFuY2VcclxuXHQgKiBAcGFyYW0gZmluZENsb3Nlc3RcclxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuXHQgKlxyXG5cdCAqIEBpbnRlcm5hbFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBfaVRlc3RDb2xsaXNpb24oc2hvcnRlc3RDb2xsaXNpb25EaXN0YW5jZTpudW1iZXIsIGZpbmRDbG9zZXN0OmJvb2xlYW4pOmJvb2xlYW5cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcFBpY2tpbmdDb2xsaWRlci50ZXN0TWVzaENvbGxpc2lvbih0aGlzLCB0aGlzLl9wUGlja2luZ0NvbGxpc2lvblZPLCBzaG9ydGVzdENvbGxpc2lvbkRpc3RhbmNlLCBmaW5kQ2xvc2VzdCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSByZW5kZXJlclxyXG5cdCAqXHJcblx0ICogQGludGVybmFsXHJcblx0ICovXHJcblx0cHVibGljIF9pQ29sbGVjdFJlbmRlcmFibGVzKHJlbmRlcmVyUG9vbDpJUmVuZGVyZXJQb29sKVxyXG5cdHtcclxuXHRcdC8vIFNpbmNlIHRoaXMgZ2V0dGVyIGlzIGludm9rZWQgZXZlcnkgaXRlcmF0aW9uIG9mIHRoZSByZW5kZXIgbG9vcCwgYW5kXHJcblx0XHQvLyB0aGUgcHJlZmFiIGNvbnN0cnVjdCBjb3VsZCBhZmZlY3QgdGhlIHN1Yi1tZXNoZXMsIHRoZSBwcmVmYWIgaXNcclxuXHRcdC8vIHZhbGlkYXRlZCBoZXJlIHRvIGdpdmUgaXQgYSBjaGFuY2UgdG8gcmVidWlsZC5cclxuXHRcdGlmICh0aGlzLl9pU291cmNlUHJlZmFiKVxyXG5cdFx0XHR0aGlzLl9pU291cmNlUHJlZmFiLl9pVmFsaWRhdGUoKTtcclxuXHJcblx0XHR2YXIgbGVuOm51bWJlciAvKnVpbnQqLyA9IHRoaXMuX3N1Yk1lc2hlcy5sZW5ndGg7XHJcblx0XHRmb3IgKHZhciBpOm51bWJlciAvKnVpbnQqLyA9IDA7IGkgPCBsZW47IGkrKylcclxuXHRcdFx0dGhpcy5fc3ViTWVzaGVzW2ldLl9pQ29sbGVjdFJlbmRlcmFibGUocmVuZGVyZXJQb29sKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBfaUludmFsaWRhdGVSZW5kZXJhYmxlR2VvbWV0cmllcygpXHJcblx0e1xyXG5cdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9zdWJNZXNoZXMubGVuZ3RoO1xyXG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgbGVuOyArK2kpXHJcblx0XHRcdHRoaXMuX3N1Yk1lc2hlc1tpXS5faUludmFsaWRhdGVSZW5kZXJhYmxlR2VvbWV0cnkoKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCA9IE1lc2g7Il19