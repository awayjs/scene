var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Geometry = require("awayjs-core/lib/data/Geometry");
var GeometryEvent = require("awayjs-core/lib/events/GeometryEvent");
var BoundsType = require("awayjs-display/lib/bounds/BoundsType");
var DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
var SubMeshPool = require("awayjs-display/lib/pool/SubMeshPool");
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
        //default bounds type
        this._boundsType = BoundsType.AXIS_ALIGNED_BOX;
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
            return Mesh.assetType;
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
        clone.boundsType = this.boundsType;
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
     * //TODO
     *
     * @protected
     */
    Mesh.prototype._pUpdateBoxBounds = function () {
        _super.prototype._pUpdateBoxBounds.call(this);
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
            this._pBoxBounds.width = maxX - (this._pBoxBounds.x = minX);
            this._pBoxBounds.height = maxY - (this._pBoxBounds.y = minY);
            this._pBoxBounds.depth = maxZ - (this._pBoxBounds.z = minZ);
        }
        else {
            this._pBoxBounds.setEmpty();
        }
    };
    Mesh.prototype._pUpdateSphereBounds = function () {
        _super.prototype._pUpdateSphereBounds.call(this);
        var box = this.getBox();
        var centerX = box.x + box.width / 2;
        var centerY = box.y + box.height / 2;
        var centerZ = box.z + box.depth / 2;
        var i, j, p, len;
        var subGeoms = this._geometry.subGeometries;
        var subGeom;
        var boundingPositions;
        var numSubGeoms = subGeoms.length;
        var maxRadiusSquared = 0;
        var radiusSquared;
        var distanceX;
        var distanceY;
        var distanceZ;
        if (numSubGeoms > 0) {
            i = 0;
            subGeom = subGeoms[0];
            boundingPositions = subGeom.getBoundingPositions();
            for (j = 0; j < numSubGeoms; j++) {
                subGeom = subGeoms[j];
                boundingPositions = subGeom.getBoundingPositions();
                len = boundingPositions.length;
                for (i = 0; i < len; i += 3) {
                    distanceX = boundingPositions[i] - centerX;
                    distanceY = boundingPositions[i + 1] - centerY;
                    distanceZ = boundingPositions[i + 2] - centerZ;
                    radiusSquared = distanceX * distanceX + distanceY * distanceY + distanceZ * distanceZ;
                    if (maxRadiusSquared < radiusSquared)
                        maxRadiusSquared = radiusSquared;
                }
            }
        }
        this._pSphereBounds.x = centerX;
        this._pSphereBounds.y = centerY;
        this._pSphereBounds.z = centerZ;
        this._pSphereBounds.radius = Math.sqrt(maxRadiusSquared);
    };
    /**
     * //TODO
     *
     * @private
     */
    Mesh.prototype.onGeometryBoundsInvalid = function (event) {
        this._pInvalidateBounds();
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
        var SubMeshClass = SubMeshPool.getSubMeshClass(subGeometry);
        var subMesh = new SubMeshClass(subGeometry, this, null);
        var len = this._subMeshes.length;
        subMesh._iIndex = len;
        this._subMeshes[len] = subMesh;
        this._pInvalidateBounds();
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
    Mesh.prototype._pRegisterEntity = function (partition) {
        partition._iRegisterEntity(this);
    };
    Mesh.prototype._pUnregisterEntity = function (partition) {
        partition._iUnregisterEntity(this);
    };
    Mesh.assetType = "[asset Mesh]";
    return Mesh;
})(DisplayObjectContainer);
module.exports = Mesh;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9NZXNoLnRzIl0sIm5hbWVzIjpbIk1lc2giLCJNZXNoLmNvbnN0cnVjdG9yIiwiTWVzaC5hbmltYXRvciIsIk1lc2guYXNzZXRUeXBlIiwiTWVzaC5jYXN0c1NoYWRvd3MiLCJNZXNoLmdlb21ldHJ5IiwiTWVzaC5tYXRlcmlhbCIsIk1lc2guc2hhcmVBbmltYXRpb25HZW9tZXRyeSIsIk1lc2guc3ViTWVzaGVzIiwiTWVzaC51dlRyYW5zZm9ybSIsIk1lc2guYmFrZVRyYW5zZm9ybWF0aW9ucyIsIk1lc2guZGlzcG9zZSIsIk1lc2guZGlzcG9zZVdpdGhBbmltYXRvckFuZENoaWxkcmVuIiwiTWVzaC5jbG9uZSIsIk1lc2guZ2V0U3ViTWVzaEZyb21TdWJHZW9tZXRyeSIsIk1lc2guX3BVcGRhdGVCb3hCb3VuZHMiLCJNZXNoLl9wVXBkYXRlU3BoZXJlQm91bmRzIiwiTWVzaC5vbkdlb21ldHJ5Qm91bmRzSW52YWxpZCIsIk1lc2gub25TdWJHZW9tZXRyeUFkZGVkIiwiTWVzaC5vblN1Ykdlb21ldHJ5UmVtb3ZlZCIsIk1lc2guYWRkU3ViTWVzaCIsIk1lc2guX2lUZXN0Q29sbGlzaW9uIiwiTWVzaC5faUNvbGxlY3RSZW5kZXJhYmxlcyIsIk1lc2guX2lJbnZhbGlkYXRlUmVuZGVyYWJsZUdlb21ldHJpZXMiLCJNZXNoLl9wUmVnaXN0ZXJFbnRpdHkiLCJNZXNoLl9wVW5yZWdpc3RlckVudGl0eSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTyxRQUFRLFdBQWdCLCtCQUErQixDQUFDLENBQUM7QUFHaEUsSUFBTyxhQUFhLFdBQWMsc0NBQXNDLENBQUMsQ0FBQztBQVExRSxJQUFPLFVBQVUsV0FBZSxzQ0FBc0MsQ0FBQyxDQUFDO0FBQ3hFLElBQU8sc0JBQXNCLFdBQVksc0RBQXNELENBQUMsQ0FBQztBQUlqRyxJQUFPLFdBQVcsV0FBZSxxQ0FBcUMsQ0FBQyxDQUFDO0FBSXhFLEFBS0E7Ozs7R0FE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QnhDO0FBRUQsQUFBYyxpQkFBTCxJQUFJLENBQUMiLCJmaWxlIjoiZW50aXRpZXMvTWVzaC5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyLvu79pbXBvcnQgR2VvbWV0cnlcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZGF0YS9HZW9tZXRyeVwiKTtcbmltcG9ydCBUcmlhbmdsZVN1Ykdlb21ldHJ5XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2RhdGEvVHJpYW5nbGVTdWJHZW9tZXRyeVwiKTtcbmltcG9ydCBTdWJHZW9tZXRyeUJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9kYXRhL1N1Ykdlb21ldHJ5QmFzZVwiKTtcbmltcG9ydCBHZW9tZXRyeUV2ZW50XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0dlb21ldHJ5RXZlbnRcIik7XG5pbXBvcnQgQm94XHRcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9Cb3hcIik7XG5pbXBvcnQgVVZUcmFuc2Zvcm1cdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vVVZUcmFuc2Zvcm1cIik7XG5cbmltcG9ydCBJQW5pbWF0b3JcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2FuaW1hdG9ycy9JQW5pbWF0b3JcIik7XG5pbXBvcnQgRGlzcGxheU9iamVjdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvRGlzcGxheU9iamVjdFwiKTtcbmltcG9ydCBJU3ViTWVzaFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0lTdWJNZXNoXCIpO1xuaW1wb3J0IElTdWJNZXNoQ2xhc3NcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0lTdWJNZXNoQ2xhc3NcIik7XG5pbXBvcnQgQm91bmRzVHlwZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYm91bmRzL0JvdW5kc1R5cGVcIik7XG5pbXBvcnQgRGlzcGxheU9iamVjdENvbnRhaW5lclx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvY29udGFpbmVycy9EaXNwbGF5T2JqZWN0Q29udGFpbmVyXCIpO1xuaW1wb3J0IFBhcnRpdGlvblx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcGFydGl0aW9uL1BhcnRpdGlvblwiKTtcbmltcG9ydCBFbnRpdHlOb2RlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vRW50aXR5Tm9kZVwiKTtcbmltcG9ydCBJUmVuZGVyZXJQb29sXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcG9vbC9JUmVuZGVyZXJQb29sXCIpO1xuaW1wb3J0IFN1Yk1lc2hQb29sXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wb29sL1N1Yk1lc2hQb29sXCIpO1xuaW1wb3J0IElFbnRpdHlcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZW50aXRpZXMvSUVudGl0eVwiKTtcbmltcG9ydCBNYXRlcmlhbEJhc2VcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL21hdGVyaWFscy9NYXRlcmlhbEJhc2VcIik7XG5cbi8qKlxuICogTWVzaCBpcyBhbiBpbnN0YW5jZSBvZiBhIEdlb21ldHJ5LCBhdWdtZW50aW5nIGl0IHdpdGggYSBwcmVzZW5jZSBpbiB0aGUgc2NlbmUgZ3JhcGgsIGEgbWF0ZXJpYWwsIGFuZCBhbiBhbmltYXRpb25cbiAqIHN0YXRlLiBJdCBjb25zaXN0cyBvdXQgb2YgU3ViTWVzaGVzLCB3aGljaCBpbiB0dXJuIGNvcnJlc3BvbmQgdG8gU3ViR2VvbWV0cmllcy4gU3ViTWVzaGVzIGFsbG93IGRpZmZlcmVudCBwYXJ0c1xuICogb2YgdGhlIGdlb21ldHJ5IHRvIGJlIGFzc2lnbmVkIGRpZmZlcmVudCBtYXRlcmlhbHMuXG4gKi9cbmNsYXNzIE1lc2ggZXh0ZW5kcyBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIGltcGxlbWVudHMgSUVudGl0eVxue1xuXHRwdWJsaWMgc3RhdGljIGFzc2V0VHlwZTpzdHJpbmcgPSBcIlthc3NldCBNZXNoXVwiO1xuXG5cdHByaXZhdGUgX3V2VHJhbnNmb3JtOlVWVHJhbnNmb3JtO1xuXG5cdHByaXZhdGUgX3N1Yk1lc2hlczpBcnJheTxJU3ViTWVzaD47XG5cdHByaXZhdGUgX2dlb21ldHJ5Okdlb21ldHJ5O1xuXHRwcml2YXRlIF9tYXRlcmlhbDpNYXRlcmlhbEJhc2U7XG5cdHByaXZhdGUgX2FuaW1hdG9yOklBbmltYXRvcjtcblx0cHJpdmF0ZSBfY2FzdHNTaGFkb3dzOmJvb2xlYW4gPSB0cnVlO1xuXHRwcml2YXRlIF9zaGFyZUFuaW1hdGlvbkdlb21ldHJ5OmJvb2xlYW4gPSB0cnVlO1xuXG5cdHByaXZhdGUgX29uR2VvbWV0cnlCb3VuZHNJbnZhbGlkRGVsZWdhdGU6KGV2ZW50Okdlb21ldHJ5RXZlbnQpID0+IHZvaWQ7XG5cdHByaXZhdGUgX29uU3ViR2VvbWV0cnlBZGRlZERlbGVnYXRlOihldmVudDpHZW9tZXRyeUV2ZW50KSA9PiB2b2lkO1xuXHRwcml2YXRlIF9vblN1Ykdlb21ldHJ5UmVtb3ZlZERlbGVnYXRlOihldmVudDpHZW9tZXRyeUV2ZW50KSA9PiB2b2lkO1xuXG5cdC8qKlxuXHQgKiBEZWZpbmVzIHRoZSBhbmltYXRvciBvZiB0aGUgbWVzaC4gQWN0IG9uIHRoZSBtZXNoJ3MgZ2VvbWV0cnkuICBEZWZhdWx0IHZhbHVlIGlzIDxjb2RlPm51bGw8L2NvZGU+LlxuXHQgKi9cblx0cHVibGljIGdldCBhbmltYXRvcigpOklBbmltYXRvclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2FuaW1hdG9yO1xuXHR9XG5cblx0cHVibGljIHNldCBhbmltYXRvcih2YWx1ZTpJQW5pbWF0b3IpXG5cdHtcblx0XHRpZiAodGhpcy5fYW5pbWF0b3IpXG5cdFx0XHR0aGlzLl9hbmltYXRvci5yZW1vdmVPd25lcih0aGlzKTtcblxuXHRcdHRoaXMuX2FuaW1hdG9yID0gdmFsdWU7XG5cblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX3N1Yk1lc2hlcy5sZW5ndGg7XG5cdFx0dmFyIHN1Yk1lc2g6SVN1Yk1lc2g7XG5cblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBsZW47ICsraSkge1xuXHRcdFx0c3ViTWVzaCA9IHRoaXMuX3N1Yk1lc2hlc1tpXTtcblxuXHRcdFx0Ly8gY2F1c2UgbWF0ZXJpYWwgdG8gYmUgdW5yZWdpc3RlcmVkIGFuZCByZWdpc3RlcmVkIGFnYWluIHRvIHdvcmsgd2l0aCB0aGUgbmV3IGFuaW1hdGlvbiB0eXBlIChpZiBwb3NzaWJsZSlcblx0XHRcdGlmIChzdWJNZXNoLm1hdGVyaWFsKSB7XG5cdFx0XHRcdHN1Yk1lc2gubWF0ZXJpYWwuaVJlbW92ZU93bmVyKHN1Yk1lc2gpO1xuXHRcdFx0XHRzdWJNZXNoLm1hdGVyaWFsLmlBZGRPd25lcihzdWJNZXNoKTtcblx0XHRcdH1cblxuXHRcdFx0Ly9pbnZhbGlkYXRlIGFueSBleGlzdGluZyByZW5kZXJhYmxlcyBpbiBjYXNlIHRoZXkgbmVlZCB0byBwdWxsIG5ldyBnZW9tZXRyeVxuXHRcdFx0c3ViTWVzaC5faUludmFsaWRhdGVSZW5kZXJhYmxlR2VvbWV0cnkoKTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5fYW5pbWF0b3IpXG5cdFx0XHR0aGlzLl9hbmltYXRvci5hZGRPd25lcih0aGlzKTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBhc3NldFR5cGUoKTpzdHJpbmdcblx0e1xuXHRcdHJldHVybiBNZXNoLmFzc2V0VHlwZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgd2hldGhlciBvciBub3QgdGhlIE1lc2ggY2FuIGNhc3Qgc2hhZG93cy4gRGVmYXVsdCB2YWx1ZSBpcyA8Y29kZT50cnVlPC9jb2RlPi5cblx0ICovXG5cdHB1YmxpYyBnZXQgY2FzdHNTaGFkb3dzKCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2Nhc3RzU2hhZG93cztcblx0fVxuXG5cdHB1YmxpYyBzZXQgY2FzdHNTaGFkb3dzKHZhbHVlOmJvb2xlYW4pXG5cdHtcblx0XHR0aGlzLl9jYXN0c1NoYWRvd3MgPSB2YWx1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgZ2VvbWV0cnkgdXNlZCBieSB0aGUgbWVzaCB0aGF0IHByb3ZpZGVzIGl0IHdpdGggaXRzIHNoYXBlLlxuXHQgKi9cblx0cHVibGljIGdldCBnZW9tZXRyeSgpOkdlb21ldHJ5XG5cdHtcblx0XHRpZiAodGhpcy5faVNvdXJjZVByZWZhYilcblx0XHRcdHRoaXMuX2lTb3VyY2VQcmVmYWIuX2lWYWxpZGF0ZSgpO1xuXG5cdFx0cmV0dXJuIHRoaXMuX2dlb21ldHJ5O1xuXHR9XG5cblx0cHVibGljIHNldCBnZW9tZXRyeSh2YWx1ZTpHZW9tZXRyeSlcblx0e1xuXHRcdHZhciBpOm51bWJlcjtcblxuXHRcdGlmICh0aGlzLl9nZW9tZXRyeSkge1xuXHRcdFx0dGhpcy5fZ2VvbWV0cnkucmVtb3ZlRXZlbnRMaXN0ZW5lcihHZW9tZXRyeUV2ZW50LkJPVU5EU19JTlZBTElELCB0aGlzLl9vbkdlb21ldHJ5Qm91bmRzSW52YWxpZERlbGVnYXRlKTtcblx0XHRcdHRoaXMuX2dlb21ldHJ5LnJlbW92ZUV2ZW50TGlzdGVuZXIoR2VvbWV0cnlFdmVudC5TVUJfR0VPTUVUUllfQURERUQsIHRoaXMuX29uU3ViR2VvbWV0cnlBZGRlZERlbGVnYXRlKTtcblx0XHRcdHRoaXMuX2dlb21ldHJ5LnJlbW92ZUV2ZW50TGlzdGVuZXIoR2VvbWV0cnlFdmVudC5TVUJfR0VPTUVUUllfUkVNT1ZFRCwgdGhpcy5fb25TdWJHZW9tZXRyeVJlbW92ZWREZWxlZ2F0ZSk7XG5cblx0XHRcdGZvciAoaSA9IDA7IGkgPCB0aGlzLl9zdWJNZXNoZXMubGVuZ3RoOyArK2kpXG5cdFx0XHRcdHRoaXMuX3N1Yk1lc2hlc1tpXS5kaXNwb3NlKCk7XG5cblx0XHRcdHRoaXMuX3N1Yk1lc2hlcy5sZW5ndGggPSAwO1xuXHRcdH1cblxuXHRcdHRoaXMuX2dlb21ldHJ5ID0gdmFsdWU7XG5cblx0XHRpZiAodGhpcy5fZ2VvbWV0cnkpIHtcblxuXHRcdFx0dGhpcy5fZ2VvbWV0cnkuYWRkRXZlbnRMaXN0ZW5lcihHZW9tZXRyeUV2ZW50LkJPVU5EU19JTlZBTElELCB0aGlzLl9vbkdlb21ldHJ5Qm91bmRzSW52YWxpZERlbGVnYXRlKTtcblx0XHRcdHRoaXMuX2dlb21ldHJ5LmFkZEV2ZW50TGlzdGVuZXIoR2VvbWV0cnlFdmVudC5TVUJfR0VPTUVUUllfQURERUQsIHRoaXMuX29uU3ViR2VvbWV0cnlBZGRlZERlbGVnYXRlKTtcblx0XHRcdHRoaXMuX2dlb21ldHJ5LmFkZEV2ZW50TGlzdGVuZXIoR2VvbWV0cnlFdmVudC5TVUJfR0VPTUVUUllfUkVNT1ZFRCwgdGhpcy5fb25TdWJHZW9tZXRyeVJlbW92ZWREZWxlZ2F0ZSk7XG5cblx0XHRcdHZhciBzdWJHZW9tczpBcnJheTxTdWJHZW9tZXRyeUJhc2U+ID0gdGhpcy5fZ2VvbWV0cnkuc3ViR2VvbWV0cmllcztcblxuXHRcdFx0Zm9yIChpID0gMDsgaSA8IHN1Ykdlb21zLmxlbmd0aDsgKytpKVxuXHRcdFx0XHR0aGlzLmFkZFN1Yk1lc2goc3ViR2VvbXNbaV0pO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgbWF0ZXJpYWwgd2l0aCB3aGljaCB0byByZW5kZXIgdGhlIE1lc2guXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IG1hdGVyaWFsKCk6TWF0ZXJpYWxCYXNlXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fbWF0ZXJpYWw7XG5cdH1cblxuXHRwdWJsaWMgc2V0IG1hdGVyaWFsKHZhbHVlOk1hdGVyaWFsQmFzZSlcblx0e1xuXHRcdGlmICh2YWx1ZSA9PSB0aGlzLl9tYXRlcmlhbClcblx0XHRcdHJldHVybjtcblxuXHRcdHZhciBpOm51bWJlcjtcblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX3N1Yk1lc2hlcy5sZW5ndGg7XG5cdFx0dmFyIHN1Yk1lc2g6SVN1Yk1lc2g7XG5cblx0XHRmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspXG5cdFx0XHRpZiAodGhpcy5fbWF0ZXJpYWwgJiYgKHN1Yk1lc2ggPSB0aGlzLl9zdWJNZXNoZXNbaV0pLm1hdGVyaWFsID09IHRoaXMuX21hdGVyaWFsKVxuXHRcdFx0XHR0aGlzLl9tYXRlcmlhbC5pUmVtb3ZlT3duZXIoc3ViTWVzaCk7XG5cblx0XHR0aGlzLl9tYXRlcmlhbCA9IHZhbHVlO1xuXG5cdFx0Zm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKVxuXHRcdFx0aWYgKHRoaXMuX21hdGVyaWFsICYmIChzdWJNZXNoID0gdGhpcy5fc3ViTWVzaGVzW2ldKS5tYXRlcmlhbCA9PSB0aGlzLl9tYXRlcmlhbClcblx0XHRcdFx0dGhpcy5fbWF0ZXJpYWwuaUFkZE93bmVyKHN1Yk1lc2gpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB3aGV0aGVyIG9yIG5vdCB0aGUgbWVzaCBzaGFyZSB0aGUgc2FtZSBhbmltYXRpb24gZ2VvbWV0cnkuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHNoYXJlQW5pbWF0aW9uR2VvbWV0cnkoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fc2hhcmVBbmltYXRpb25HZW9tZXRyeTtcblx0fVxuXG5cdHB1YmxpYyBzZXQgc2hhcmVBbmltYXRpb25HZW9tZXRyeSh2YWx1ZTpib29sZWFuKVxuXHR7XG5cdFx0dGhpcy5fc2hhcmVBbmltYXRpb25HZW9tZXRyeSA9IHZhbHVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBTdWJNZXNoZXMgb3V0IG9mIHdoaWNoIHRoZSBNZXNoIGNvbnNpc3RzLiBFdmVyeSBTdWJNZXNoIGNhbiBiZSBhc3NpZ25lZCBhIG1hdGVyaWFsIHRvIG92ZXJyaWRlIHRoZSBNZXNoJ3Ncblx0ICogbWF0ZXJpYWwuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHN1Yk1lc2hlcygpOkFycmF5PElTdWJNZXNoPlxuXHR7XG5cdFx0Ly8gU2luY2UgdGhpcyBnZXR0ZXIgaXMgaW52b2tlZCBldmVyeSBpdGVyYXRpb24gb2YgdGhlIHJlbmRlciBsb29wLCBhbmRcblx0XHQvLyB0aGUgcHJlZmFiIGNvbnN0cnVjdCBjb3VsZCBhZmZlY3QgdGhlIHN1Yi1tZXNoZXMsIHRoZSBwcmVmYWIgaXNcblx0XHQvLyB2YWxpZGF0ZWQgaGVyZSB0byBnaXZlIGl0IGEgY2hhbmNlIHRvIHJlYnVpbGQuXG5cdFx0aWYgKHRoaXMuX2lTb3VyY2VQcmVmYWIpXG5cdFx0XHR0aGlzLl9pU291cmNlUHJlZmFiLl9pVmFsaWRhdGUoKTtcblxuXHRcdHJldHVybiB0aGlzLl9zdWJNZXNoZXM7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgdXZUcmFuc2Zvcm0oKTpVVlRyYW5zZm9ybVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3V2VHJhbnNmb3JtO1xuXHR9XG5cblx0cHVibGljIHNldCB1dlRyYW5zZm9ybSh2YWx1ZTpVVlRyYW5zZm9ybSlcblx0e1xuXHRcdHRoaXMuX3V2VHJhbnNmb3JtID0gdmFsdWU7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlIGEgbmV3IE1lc2ggb2JqZWN0LlxuXHQgKlxuXHQgKiBAcGFyYW0gZ2VvbWV0cnkgICAgICAgICAgICAgICAgICAgIFRoZSBnZW9tZXRyeSB1c2VkIGJ5IHRoZSBtZXNoIHRoYXQgcHJvdmlkZXMgaXQgd2l0aCBpdHMgc2hhcGUuXG5cdCAqIEBwYXJhbSBtYXRlcmlhbCAgICBbb3B0aW9uYWxdICAgICAgICBUaGUgbWF0ZXJpYWwgd2l0aCB3aGljaCB0byByZW5kZXIgdGhlIE1lc2guXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcihnZW9tZXRyeTpHZW9tZXRyeSwgbWF0ZXJpYWw6TWF0ZXJpYWxCYXNlID0gbnVsbClcblx0e1xuXHRcdHN1cGVyKCk7XG5cblx0XHR0aGlzLl9wSXNFbnRpdHkgPSB0cnVlO1xuXG5cdFx0dGhpcy5fc3ViTWVzaGVzID0gbmV3IEFycmF5PElTdWJNZXNoPigpO1xuXG5cdFx0dGhpcy5fb25HZW9tZXRyeUJvdW5kc0ludmFsaWREZWxlZ2F0ZSA9IChldmVudDpHZW9tZXRyeUV2ZW50KSA9PiB0aGlzLm9uR2VvbWV0cnlCb3VuZHNJbnZhbGlkKGV2ZW50KTtcblx0XHR0aGlzLl9vblN1Ykdlb21ldHJ5QWRkZWREZWxlZ2F0ZSA9IChldmVudDpHZW9tZXRyeUV2ZW50KSA9PiB0aGlzLm9uU3ViR2VvbWV0cnlBZGRlZChldmVudCk7XG5cdFx0dGhpcy5fb25TdWJHZW9tZXRyeVJlbW92ZWREZWxlZ2F0ZSA9IChldmVudDpHZW9tZXRyeUV2ZW50KSA9PiB0aGlzLm9uU3ViR2VvbWV0cnlSZW1vdmVkKGV2ZW50KTtcblxuXHRcdC8vdGhpcyBzaG91bGQgbmV2ZXIgaGFwcGVuLCBidXQgaWYgcGVvcGxlIGluc2lzdCBvbiB0cnlpbmcgdG8gY3JlYXRlIHRoZWlyIG1lc2hlcyBiZWZvcmUgdGhleSBoYXZlIGdlb21ldHJ5IHRvIGZpbGwgaXQsIGl0IGJlY29tZXMgbmVjZXNzYXJ5XG5cdFx0dGhpcy5nZW9tZXRyeSA9IGdlb21ldHJ5IHx8IG5ldyBHZW9tZXRyeSgpO1xuXG5cdFx0dGhpcy5tYXRlcmlhbCA9IG1hdGVyaWFsO1xuXG5cdFx0Ly9kZWZhdWx0IGJvdW5kcyB0eXBlXG5cdFx0dGhpcy5fYm91bmRzVHlwZSA9IEJvdW5kc1R5cGUuQVhJU19BTElHTkVEX0JPWDtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGJha2VUcmFuc2Zvcm1hdGlvbnMoKVxuXHR7XG5cdFx0dGhpcy5nZW9tZXRyeS5hcHBseVRyYW5zZm9ybWF0aW9uKHRoaXMuX2lNYXRyaXgzRCk7XG5cdFx0dGhpcy5faU1hdHJpeDNELmlkZW50aXR5KCk7XG5cdH1cblxuXHQvKipcblx0ICogQGluaGVyaXREb2Ncblx0ICovXG5cdHB1YmxpYyBkaXNwb3NlKClcblx0e1xuXHRcdHN1cGVyLmRpc3Bvc2UoKTtcblxuXHRcdHRoaXMubWF0ZXJpYWwgPSBudWxsO1xuXHRcdHRoaXMuZ2VvbWV0cnkgPSBudWxsO1xuXHR9XG5cblx0LyoqXG5cdCAqIERpc3Bvc2VzIG1lc2ggaW5jbHVkaW5nIHRoZSBhbmltYXRvciBhbmQgY2hpbGRyZW4uIFRoaXMgaXMgYSBtZXJlbHkgYSBjb252ZW5pZW5jZSBtZXRob2QuXG5cdCAqIEByZXR1cm5cblx0ICovXG5cdHB1YmxpYyBkaXNwb3NlV2l0aEFuaW1hdG9yQW5kQ2hpbGRyZW4oKVxuXHR7XG5cdFx0dGhpcy5kaXNwb3NlV2l0aENoaWxkcmVuKCk7XG5cblx0XHQgaWYgKHRoaXMuX2FuaW1hdG9yKVxuXHRcdFx0dGhpcy5fYW5pbWF0b3IuZGlzcG9zZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENsb25lcyB0aGlzIE1lc2ggaW5zdGFuY2UgYWxvbmcgd2l0aCBhbGwgaXQncyBjaGlsZHJlbiwgd2hpbGUgcmUtdXNpbmcgdGhlIHNhbWVcblx0ICogbWF0ZXJpYWwsIGdlb21ldHJ5IGFuZCBhbmltYXRpb24gc2V0LiBUaGUgcmV0dXJuZWQgcmVzdWx0IHdpbGwgYmUgYSBjb3B5IG9mIHRoaXMgbWVzaCxcblx0ICogY29udGFpbmluZyBjb3BpZXMgb2YgYWxsIG9mIGl0J3MgY2hpbGRyZW4uXG5cdCAqXG5cdCAqIFByb3BlcnRpZXMgdGhhdCBhcmUgcmUtdXNlZCAoaS5lLiBub3QgY2xvbmVkKSBieSB0aGUgbmV3IGNvcHkgaW5jbHVkZSBuYW1lLFxuXHQgKiBnZW9tZXRyeSwgYW5kIG1hdGVyaWFsLiBQcm9wZXJ0aWVzIHRoYXQgYXJlIGNsb25lZCBvciBjcmVhdGVkIGFuZXcgZm9yIHRoZSBjb3B5XG5cdCAqIGluY2x1ZGUgc3ViTWVzaGVzLCBjaGlsZHJlbiBvZiB0aGUgbWVzaCwgYW5kIHRoZSBhbmltYXRvci5cblx0ICpcblx0ICogSWYgeW91IHdhbnQgdG8gY29weSBqdXN0IHRoZSBtZXNoLCByZXVzaW5nIGl0J3MgZ2VvbWV0cnkgYW5kIG1hdGVyaWFsIHdoaWxlIG5vdFxuXHQgKiBjbG9uaW5nIGl0J3MgY2hpbGRyZW4sIHRoZSBzaW1wbGVzdCB3YXkgaXMgdG8gY3JlYXRlIGEgbmV3IG1lc2ggbWFudWFsbHk6XG5cdCAqXG5cdCAqIDxjb2RlPlxuXHQgKiB2YXIgY2xvbmUgOiBNZXNoID0gbmV3IE1lc2gob3JpZ2luYWwuZ2VvbWV0cnksIG9yaWdpbmFsLm1hdGVyaWFsKTtcblx0ICogPC9jb2RlPlxuXHQgKi9cblx0cHVibGljIGNsb25lKCk6RGlzcGxheU9iamVjdFxuXHR7XG5cdFx0dmFyIGNsb25lOk1lc2ggPSBuZXcgTWVzaCh0aGlzLl9nZW9tZXRyeSwgdGhpcy5fbWF0ZXJpYWwpO1xuXG5cdFx0Y2xvbmUuX2lNYXRyaXgzRCA9IHRoaXMuX2lNYXRyaXgzRDtcblx0XHRjbG9uZS5waXZvdCA9IHRoaXMucGl2b3Q7XG5cdFx0Y2xvbmUucGFydGl0aW9uID0gdGhpcy5wYXJ0aXRpb247XG5cdFx0Y2xvbmUuYm91bmRzVHlwZSA9IHRoaXMuYm91bmRzVHlwZTtcblxuXG5cdFx0Y2xvbmUubmFtZSA9IHRoaXMubmFtZTtcblx0XHRjbG9uZS5jYXN0c1NoYWRvd3MgPSB0aGlzLmNhc3RzU2hhZG93cztcblx0XHRjbG9uZS5zaGFyZUFuaW1hdGlvbkdlb21ldHJ5ID0gdGhpcy5zaGFyZUFuaW1hdGlvbkdlb21ldHJ5O1xuXHRcdGNsb25lLm1vdXNlRW5hYmxlZCA9IHRoaXMubW91c2VFbmFibGVkO1xuXHRcdGNsb25lLm1vdXNlQ2hpbGRyZW4gPSB0aGlzLm1vdXNlQ2hpbGRyZW47XG5cdFx0Ly90aGlzIGlzIG9mIGNvdXJzZSBubyBwcm9wZXIgY2xvbmluZ1xuXHRcdC8vbWF5YmUgdXNlIHRoaXMgaW5zdGVhZD86IGh0dHA6Ly9ibG9nLmFub3RoZXItZC1tZW50aW9uLnJvL3Byb2dyYW1taW5nL2hvdy10by1jbG9uZS1kdXBsaWNhdGUtYW4tb2JqZWN0LWluLWFjdGlvbnNjcmlwdC0zL1xuXHRcdGNsb25lLmV4dHJhID0gdGhpcy5leHRyYTtcblxuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fc3ViTWVzaGVzLmxlbmd0aDtcblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBsZW47ICsraSlcblx0XHRcdGNsb25lLl9zdWJNZXNoZXNbaV0ubWF0ZXJpYWwgPSB0aGlzLl9zdWJNZXNoZXNbaV0uX2lHZXRFeHBsaWNpdE1hdGVyaWFsKCk7XG5cblxuXHRcdGxlbiA9IHRoaXMubnVtQ2hpbGRyZW47XG5cdFx0dmFyIG9iajphbnk7XG5cblx0XHRmb3IgKGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcblx0XHRcdG9iaiA9IHRoaXMuZ2V0Q2hpbGRBdChpKS5jbG9uZSgpO1xuXHRcdFx0Y2xvbmUuYWRkQ2hpbGQoPERpc3BsYXlPYmplY3RDb250YWluZXI+IG9iaik7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX2FuaW1hdG9yKVxuXHRcdFx0Y2xvbmUuYW5pbWF0b3IgPSB0aGlzLl9hbmltYXRvci5jbG9uZSgpO1xuXG5cdFx0cmV0dXJuIGNsb25lO1xuXHR9XG5cblx0LyoqXG5cdCAqIC8vVE9ET1xuXHQgKlxuXHQgKiBAcGFyYW0gc3ViR2VvbWV0cnlcblx0ICogQHJldHVybnMge1N1Yk1lc2hCYXNlfVxuXHQgKi9cblx0cHVibGljIGdldFN1Yk1lc2hGcm9tU3ViR2VvbWV0cnkoc3ViR2VvbWV0cnk6U3ViR2VvbWV0cnlCYXNlKTpJU3ViTWVzaFxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3N1Yk1lc2hlc1t0aGlzLl9nZW9tZXRyeS5zdWJHZW9tZXRyaWVzLmluZGV4T2Yoc3ViR2VvbWV0cnkpXTtcblx0fVxuXG5cdC8qKlxuXHQgKiAvL1RPRE9cblx0ICpcblx0ICogQHByb3RlY3RlZFxuXHQgKi9cblx0cHVibGljIF9wVXBkYXRlQm94Qm91bmRzKClcblx0e1xuXHRcdHN1cGVyLl9wVXBkYXRlQm94Qm91bmRzKCk7XG5cblx0XHR2YXIgaTpudW1iZXIsIGo6bnVtYmVyLCBwOm51bWJlciwgbGVuOm51bWJlcjtcblx0XHR2YXIgc3ViR2VvbXM6QXJyYXk8U3ViR2VvbWV0cnlCYXNlPiA9IHRoaXMuX2dlb21ldHJ5LnN1Ykdlb21ldHJpZXM7XG5cdFx0dmFyIHN1Ykdlb206U3ViR2VvbWV0cnlCYXNlO1xuXHRcdHZhciBib3VuZGluZ1Bvc2l0aW9uczpBcnJheTxudW1iZXI+O1xuXHRcdHZhciBudW1TdWJHZW9tczpudW1iZXIgPSBzdWJHZW9tcy5sZW5ndGg7XG5cdFx0dmFyIG1pblg6bnVtYmVyLCBtaW5ZOm51bWJlciwgbWluWjpudW1iZXI7XG5cdFx0dmFyIG1heFg6bnVtYmVyLCBtYXhZOm51bWJlciwgbWF4WjpudW1iZXI7XG5cblx0XHRpZiAobnVtU3ViR2VvbXMgPiAwKSB7XG5cdFx0XHRpID0gMDtcblx0XHRcdHN1Ykdlb20gPSBzdWJHZW9tc1swXTtcblx0XHRcdGJvdW5kaW5nUG9zaXRpb25zID0gc3ViR2VvbS5nZXRCb3VuZGluZ1Bvc2l0aW9ucygpO1xuXHRcdFx0bWluWCA9IG1heFggPSBib3VuZGluZ1Bvc2l0aW9uc1tpXTtcblx0XHRcdG1pblkgPSBtYXhZID0gYm91bmRpbmdQb3NpdGlvbnNbaSArIDFdO1xuXHRcdFx0bWluWiA9IG1heFogPSBib3VuZGluZ1Bvc2l0aW9uc1tpICsgMl07XG5cblx0XHRcdGZvciAoaiA9IDA7IGogPCBudW1TdWJHZW9tczsgaisrKSB7XG5cdFx0XHRcdHN1Ykdlb20gPSBzdWJHZW9tc1tqXTtcblx0XHRcdFx0Ym91bmRpbmdQb3NpdGlvbnMgPSBzdWJHZW9tLmdldEJvdW5kaW5nUG9zaXRpb25zKCk7XG5cdFx0XHRcdGxlbiA9IGJvdW5kaW5nUG9zaXRpb25zLmxlbmd0aDtcblxuXHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKz0zKSB7XG5cdFx0XHRcdFx0cCA9IGJvdW5kaW5nUG9zaXRpb25zW2ldO1xuXHRcdFx0XHRcdGlmIChwIDwgbWluWClcblx0XHRcdFx0XHRcdG1pblggPSBwO1xuXHRcdFx0XHRcdGVsc2UgaWYgKHAgPiBtYXhYKVxuXHRcdFx0XHRcdFx0bWF4WCA9IHA7XG5cblx0XHRcdFx0XHRwID0gYm91bmRpbmdQb3NpdGlvbnNbaSArIDFdO1xuXG5cdFx0XHRcdFx0aWYgKHAgPCBtaW5ZKVxuXHRcdFx0XHRcdFx0bWluWSA9IHA7XG5cdFx0XHRcdFx0ZWxzZSBpZiAocCA+IG1heFkpXG5cdFx0XHRcdFx0XHRtYXhZID0gcDtcblxuXHRcdFx0XHRcdHAgPSBib3VuZGluZ1Bvc2l0aW9uc1tpICsgMl07XG5cblx0XHRcdFx0XHRpZiAocCA8IG1pblopXG5cdFx0XHRcdFx0XHRtaW5aID0gcDtcblx0XHRcdFx0XHRlbHNlIGlmIChwID4gbWF4Wilcblx0XHRcdFx0XHRcdG1heFogPSBwO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuX3BCb3hCb3VuZHMud2lkdGggPSBtYXhYIC0gKHRoaXMuX3BCb3hCb3VuZHMueCA9IG1pblgpO1xuXHRcdFx0dGhpcy5fcEJveEJvdW5kcy5oZWlnaHQgPSBtYXhZIC0gKHRoaXMuX3BCb3hCb3VuZHMueSA9IG1pblkpO1xuXHRcdFx0dGhpcy5fcEJveEJvdW5kcy5kZXB0aCA9IG1heFogLSAodGhpcy5fcEJveEJvdW5kcy56ID0gbWluWik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX3BCb3hCb3VuZHMuc2V0RW1wdHkoKTtcblx0XHR9XG5cdH1cblxuXG5cdHB1YmxpYyBfcFVwZGF0ZVNwaGVyZUJvdW5kcygpXG5cdHtcblx0XHRzdXBlci5fcFVwZGF0ZVNwaGVyZUJvdW5kcygpO1xuXG5cdFx0dmFyIGJveDpCb3ggPSB0aGlzLmdldEJveCgpO1xuXHRcdHZhciBjZW50ZXJYOm51bWJlciA9IGJveC54ICsgYm94LndpZHRoLzI7XG5cdFx0dmFyIGNlbnRlclk6bnVtYmVyID0gYm94LnkgKyBib3guaGVpZ2h0LzI7XG5cdFx0dmFyIGNlbnRlclo6bnVtYmVyID0gYm94LnogKyBib3guZGVwdGgvMjtcblxuXHRcdHZhciBpOm51bWJlciwgajpudW1iZXIsIHA6bnVtYmVyLCBsZW46bnVtYmVyO1xuXHRcdHZhciBzdWJHZW9tczpBcnJheTxTdWJHZW9tZXRyeUJhc2U+ID0gdGhpcy5fZ2VvbWV0cnkuc3ViR2VvbWV0cmllcztcblx0XHR2YXIgc3ViR2VvbTpTdWJHZW9tZXRyeUJhc2U7XG5cdFx0dmFyIGJvdW5kaW5nUG9zaXRpb25zOkFycmF5PG51bWJlcj47XG5cdFx0dmFyIG51bVN1Ykdlb21zOm51bWJlciA9IHN1Ykdlb21zLmxlbmd0aDtcblx0XHR2YXIgbWF4UmFkaXVzU3F1YXJlZDpudW1iZXIgPSAwO1xuXHRcdHZhciByYWRpdXNTcXVhcmVkOm51bWJlcjtcblx0XHR2YXIgZGlzdGFuY2VYOm51bWJlcjtcblx0XHR2YXIgZGlzdGFuY2VZOm51bWJlcjtcblx0XHR2YXIgZGlzdGFuY2VaOm51bWJlcjtcblxuXHRcdGlmIChudW1TdWJHZW9tcyA+IDApIHtcblx0XHRcdGkgPSAwO1xuXHRcdFx0c3ViR2VvbSA9IHN1Ykdlb21zWzBdO1xuXHRcdFx0Ym91bmRpbmdQb3NpdGlvbnMgPSBzdWJHZW9tLmdldEJvdW5kaW5nUG9zaXRpb25zKCk7XG5cdFx0XHRmb3IgKGogPSAwOyBqIDwgbnVtU3ViR2VvbXM7IGorKykge1xuXHRcdFx0XHRzdWJHZW9tID0gc3ViR2VvbXNbal07XG5cdFx0XHRcdGJvdW5kaW5nUG9zaXRpb25zID0gc3ViR2VvbS5nZXRCb3VuZGluZ1Bvc2l0aW9ucygpO1xuXHRcdFx0XHRsZW4gPSBib3VuZGluZ1Bvc2l0aW9ucy5sZW5ndGg7XG5cblx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGxlbjsgaSArPSAzKSB7XG5cdFx0XHRcdFx0ZGlzdGFuY2VYID0gYm91bmRpbmdQb3NpdGlvbnNbaV0gLSBjZW50ZXJYO1xuXHRcdFx0XHRcdGRpc3RhbmNlWSA9IGJvdW5kaW5nUG9zaXRpb25zW2kgKyAxXSAtIGNlbnRlclk7XG5cdFx0XHRcdFx0ZGlzdGFuY2VaID0gYm91bmRpbmdQb3NpdGlvbnNbaSArIDJdIC0gY2VudGVyWjtcblx0XHRcdFx0XHRyYWRpdXNTcXVhcmVkID0gZGlzdGFuY2VYKmRpc3RhbmNlWCArIGRpc3RhbmNlWSpkaXN0YW5jZVkgKyBkaXN0YW5jZVoqZGlzdGFuY2VaO1xuXG5cdFx0XHRcdFx0aWYgKG1heFJhZGl1c1NxdWFyZWQgPCByYWRpdXNTcXVhcmVkKVxuXHRcdFx0XHRcdFx0bWF4UmFkaXVzU3F1YXJlZCA9IHJhZGl1c1NxdWFyZWQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHR0aGlzLl9wU3BoZXJlQm91bmRzLnggPSBjZW50ZXJYO1xuXHRcdHRoaXMuX3BTcGhlcmVCb3VuZHMueSA9IGNlbnRlclk7XG5cdFx0dGhpcy5fcFNwaGVyZUJvdW5kcy56ID0gY2VudGVyWjtcblx0XHR0aGlzLl9wU3BoZXJlQm91bmRzLnJhZGl1cyA9IE1hdGguc3FydChtYXhSYWRpdXNTcXVhcmVkKTtcblx0fVxuXG5cdC8qKlxuXHQgKiAvL1RPRE9cblx0ICpcblx0ICogQHByaXZhdGVcblx0ICovXG5cdHByaXZhdGUgb25HZW9tZXRyeUJvdW5kc0ludmFsaWQoZXZlbnQ6R2VvbWV0cnlFdmVudClcblx0e1xuXHRcdHRoaXMuX3BJbnZhbGlkYXRlQm91bmRzKCk7XG5cdH1cblxuXHQvKipcblx0ICogQ2FsbGVkIHdoZW4gYSBTdWJHZW9tZXRyeSB3YXMgYWRkZWQgdG8gdGhlIEdlb21ldHJ5LlxuXHQgKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0cHJpdmF0ZSBvblN1Ykdlb21ldHJ5QWRkZWQoZXZlbnQ6R2VvbWV0cnlFdmVudClcblx0e1xuXHRcdHRoaXMuYWRkU3ViTWVzaChldmVudC5zdWJHZW9tZXRyeSk7XG5cdH1cblxuXHQvKipcblx0ICogQ2FsbGVkIHdoZW4gYSBTdWJHZW9tZXRyeSB3YXMgcmVtb3ZlZCBmcm9tIHRoZSBHZW9tZXRyeS5cblx0ICpcblx0ICogQHByaXZhdGVcblx0ICovXG5cdHByaXZhdGUgb25TdWJHZW9tZXRyeVJlbW92ZWQoZXZlbnQ6R2VvbWV0cnlFdmVudClcblx0e1xuXHRcdHZhciBzdWJNZXNoOklTdWJNZXNoO1xuXHRcdHZhciBzdWJHZW9tOlN1Ykdlb21ldHJ5QmFzZSA9IGV2ZW50LnN1Ykdlb21ldHJ5O1xuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fc3ViTWVzaGVzLmxlbmd0aDtcblx0XHR2YXIgaTpudW1iZXI7XG5cblx0XHQvLyBJbXBvcnRhbnQhIFRoaXMgaGFzIHRvIGJlIGRvbmUgaGVyZSwgYW5kIG5vdCBkZWxheWVkIHVudGlsIHRoZVxuXHRcdC8vIG5leHQgcmVuZGVyIGxvb3AsIHNpbmNlIHRoaXMgbWF5IGJlIGNhdXNlZCBieSB0aGUgZ2VvbWV0cnkgYmVpbmdcblx0XHQvLyByZWJ1aWx0IElOIFRIRSBSRU5ERVIgTE9PUC4gSW52YWxpZGF0aW5nIGFuZCB3YWl0aW5nIHdpbGwgZGVsYXlcblx0XHQvLyBpdCB1bnRpbCB0aGUgTkVYVCBSRU5ERVIgRlJBTUUgd2hpY2ggaXMgcHJvYmFibHkgbm90IGRlc2lyYWJsZS5cblx0XHRmb3IgKGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcblxuXHRcdFx0c3ViTWVzaCA9IHRoaXMuX3N1Yk1lc2hlc1tpXTtcblxuXHRcdFx0aWYgKHN1Yk1lc2guc3ViR2VvbWV0cnkgPT0gc3ViR2VvbSkge1xuXHRcdFx0XHRzdWJNZXNoLmRpc3Bvc2UoKTtcblxuXHRcdFx0XHR0aGlzLl9zdWJNZXNoZXMuc3BsaWNlKGksIDEpO1xuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC0tbGVuO1xuXHRcdGZvciAoOyBpIDwgbGVuOyArK2kpXG5cdFx0XHR0aGlzLl9zdWJNZXNoZXNbaV0uX2lJbmRleCA9IGk7XG5cdH1cblxuXHQvKipcblx0ICogQWRkcyBhIFN1Yk1lc2hCYXNlIHdyYXBwaW5nIGEgU3ViR2VvbWV0cnkuXG5cdCAqXG5cdCAqIEBwYXJhbSBzdWJHZW9tZXRyeVxuXHQgKi9cblx0cHJpdmF0ZSBhZGRTdWJNZXNoKHN1Ykdlb21ldHJ5OlN1Ykdlb21ldHJ5QmFzZSlcblx0e1xuXHRcdHZhciBTdWJNZXNoQ2xhc3M6SVN1Yk1lc2hDbGFzcyA9IFN1Yk1lc2hQb29sLmdldFN1Yk1lc2hDbGFzcyhzdWJHZW9tZXRyeSk7XG5cblx0XHR2YXIgc3ViTWVzaDpJU3ViTWVzaCA9IG5ldyBTdWJNZXNoQ2xhc3Moc3ViR2VvbWV0cnksIHRoaXMsIG51bGwpO1xuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fc3ViTWVzaGVzLmxlbmd0aDtcblxuXHRcdHN1Yk1lc2guX2lJbmRleCA9IGxlbjtcblxuXHRcdHRoaXMuX3N1Yk1lc2hlc1tsZW5dID0gc3ViTWVzaDtcblxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlQm91bmRzKCk7XG5cdH1cblxuXHQvKipcblx0ICogLy9UT0RPXG5cdCAqXG5cdCAqIEBwYXJhbSBzaG9ydGVzdENvbGxpc2lvbkRpc3RhbmNlXG5cdCAqIEBwYXJhbSBmaW5kQ2xvc2VzdFxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cblx0ICpcblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwdWJsaWMgX2lUZXN0Q29sbGlzaW9uKHNob3J0ZXN0Q29sbGlzaW9uRGlzdGFuY2U6bnVtYmVyLCBmaW5kQ2xvc2VzdDpib29sZWFuKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcFBpY2tpbmdDb2xsaWRlci50ZXN0TWVzaENvbGxpc2lvbih0aGlzLCB0aGlzLl9wUGlja2luZ0NvbGxpc2lvblZPLCBzaG9ydGVzdENvbGxpc2lvbkRpc3RhbmNlLCBmaW5kQ2xvc2VzdCk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHBhcmFtIHJlbmRlcmVyXG5cdCAqXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHVibGljIF9pQ29sbGVjdFJlbmRlcmFibGVzKHJlbmRlcmVyUG9vbDpJUmVuZGVyZXJQb29sKVxuXHR7XG5cdFx0Ly8gU2luY2UgdGhpcyBnZXR0ZXIgaXMgaW52b2tlZCBldmVyeSBpdGVyYXRpb24gb2YgdGhlIHJlbmRlciBsb29wLCBhbmRcblx0XHQvLyB0aGUgcHJlZmFiIGNvbnN0cnVjdCBjb3VsZCBhZmZlY3QgdGhlIHN1Yi1tZXNoZXMsIHRoZSBwcmVmYWIgaXNcblx0XHQvLyB2YWxpZGF0ZWQgaGVyZSB0byBnaXZlIGl0IGEgY2hhbmNlIHRvIHJlYnVpbGQuXG5cdFx0aWYgKHRoaXMuX2lTb3VyY2VQcmVmYWIpXG5cdFx0XHR0aGlzLl9pU291cmNlUHJlZmFiLl9pVmFsaWRhdGUoKTtcblxuXHRcdHZhciBsZW46bnVtYmVyIC8qdWludCovID0gdGhpcy5fc3ViTWVzaGVzLmxlbmd0aDtcblx0XHRmb3IgKHZhciBpOm51bWJlciAvKnVpbnQqLyA9IDA7IGkgPCBsZW47IGkrKylcblx0XHRcdHRoaXMuX3N1Yk1lc2hlc1tpXS5faUNvbGxlY3RSZW5kZXJhYmxlKHJlbmRlcmVyUG9vbCk7XG5cdH1cblxuXHRwdWJsaWMgX2lJbnZhbGlkYXRlUmVuZGVyYWJsZUdlb21ldHJpZXMoKVxuXHR7XG5cdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9zdWJNZXNoZXMubGVuZ3RoO1xuXHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IGxlbjsgKytpKVxuXHRcdFx0dGhpcy5fc3ViTWVzaGVzW2ldLl9pSW52YWxpZGF0ZVJlbmRlcmFibGVHZW9tZXRyeSgpO1xuXHR9XG5cblx0cHVibGljIF9wUmVnaXN0ZXJFbnRpdHkocGFydGl0aW9uOlBhcnRpdGlvbilcblx0e1xuXHRcdHBhcnRpdGlvbi5faVJlZ2lzdGVyRW50aXR5KHRoaXMpO1xuXHR9XG5cblx0cHVibGljIF9wVW5yZWdpc3RlckVudGl0eShwYXJ0aXRpb246UGFydGl0aW9uKVxuXHR7XG5cdFx0cGFydGl0aW9uLl9pVW5yZWdpc3RlckVudGl0eSh0aGlzKTtcblx0fVxufVxuXG5leHBvcnQgPSBNZXNoOyJdfQ==