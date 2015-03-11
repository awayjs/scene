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
        clone._iMasks = this._iMasks;
        clone._iMaskID = this._iMaskID;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9NZXNoLnRzIl0sIm5hbWVzIjpbIk1lc2giLCJNZXNoLmNvbnN0cnVjdG9yIiwiTWVzaC5hbmltYXRvciIsIk1lc2guYXNzZXRUeXBlIiwiTWVzaC5jYXN0c1NoYWRvd3MiLCJNZXNoLmdlb21ldHJ5IiwiTWVzaC5tYXRlcmlhbCIsIk1lc2guc2hhcmVBbmltYXRpb25HZW9tZXRyeSIsIk1lc2guc3ViTWVzaGVzIiwiTWVzaC51dlRyYW5zZm9ybSIsIk1lc2guYmFrZVRyYW5zZm9ybWF0aW9ucyIsIk1lc2guZGlzcG9zZSIsIk1lc2guZGlzcG9zZVdpdGhBbmltYXRvckFuZENoaWxkcmVuIiwiTWVzaC5jbG9uZSIsIk1lc2guZ2V0U3ViTWVzaEZyb21TdWJHZW9tZXRyeSIsIk1lc2guX3BVcGRhdGVCb3hCb3VuZHMiLCJNZXNoLl9wVXBkYXRlU3BoZXJlQm91bmRzIiwiTWVzaC5vbkdlb21ldHJ5Qm91bmRzSW52YWxpZCIsIk1lc2gub25TdWJHZW9tZXRyeUFkZGVkIiwiTWVzaC5vblN1Ykdlb21ldHJ5UmVtb3ZlZCIsIk1lc2guYWRkU3ViTWVzaCIsIk1lc2guX2lUZXN0Q29sbGlzaW9uIiwiTWVzaC5faUNvbGxlY3RSZW5kZXJhYmxlcyIsIk1lc2guX2lJbnZhbGlkYXRlUmVuZGVyYWJsZUdlb21ldHJpZXMiLCJNZXNoLl9wUmVnaXN0ZXJFbnRpdHkiLCJNZXNoLl9wVW5yZWdpc3RlckVudGl0eSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTyxRQUFRLFdBQWdCLCtCQUErQixDQUFDLENBQUM7QUFHaEUsSUFBTyxhQUFhLFdBQWMsc0NBQXNDLENBQUMsQ0FBQztBQVExRSxJQUFPLFVBQVUsV0FBZSxzQ0FBc0MsQ0FBQyxDQUFDO0FBQ3hFLElBQU8sc0JBQXNCLFdBQVksc0RBQXNELENBQUMsQ0FBQztBQUlqRyxJQUFPLFdBQVcsV0FBZSxxQ0FBcUMsQ0FBQyxDQUFDO0FBSXhFLEFBS0E7Ozs7R0FE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aUJBLEdBQUdBLE9BQU9BLENBQUNBLG9CQUFvQkEsRUFBRUEsQ0FBQ0E7WUFDbkRBLElBQUlBLEdBQUdBLElBQUlBLEdBQUdBLGlCQUFpQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDbkNBLElBQUlBLEdBQUdBLElBQUlBLEdBQUdBLGlCQUFpQkEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDdkNBLElBQUlBLEdBQUdBLElBQUlBLEdBQUdBLGlCQUFpQkEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFFdkNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLFdBQVdBLEVBQUVBLENBQUNBLEVBQUVBLEVBQUVBLENBQUNBO2dCQUNsQ0EsT0FBT0EsR0FBR0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3RCQSxpQkFBaUJBLEdBQUdBLE9BQU9BLENBQUNBLG9CQUFvQkEsRUFBRUEsQ0FBQ0E7Z0JBQ25EQSxHQUFHQSxHQUFHQSxpQkFBaUJBLENBQUNBLE1BQU1BLENBQUNBO2dCQUUvQkEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsR0FBR0EsRUFBRUEsQ0FBQ0EsSUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7b0JBQzNCQSxDQUFDQSxHQUFHQSxpQkFBaUJBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO29CQUN6QkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0E7d0JBQ1pBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBO29CQUNWQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQTt3QkFDakJBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBO29CQUVWQSxDQUFDQSxHQUFHQSxpQkFBaUJBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO29CQUU3QkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0E7d0JBQ1pBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBO29CQUNWQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQTt3QkFDakJBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBO29CQUVWQSxDQUFDQSxHQUFHQSxpQkFBaUJBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO29CQUU3QkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0E7d0JBQ1pBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBO29CQUNWQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQTt3QkFDakJBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBO2dCQUNYQSxDQUFDQTtZQUNGQSxDQUFDQTtZQUVEQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxLQUFLQSxHQUFHQSxJQUFJQSxHQUFHQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUM1REEsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsTUFBTUEsR0FBR0EsSUFBSUEsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDN0RBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBO1FBQzdEQSxDQUFDQTtRQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUNQQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxRQUFRQSxFQUFFQSxDQUFDQTtRQUM3QkEsQ0FBQ0E7SUFDRkEsQ0FBQ0E7SUFHTWYsbUNBQW9CQSxH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Q0EsQ0FBQ0E7SUFDcENBLENBQUNBO0lBemhCYXpCLGNBQVNBLEdBQVVBLGNBQWNBLENBQUNBO0lBMGhCakRBLFdBQUNBO0FBQURBLENBNWhCQSxBQTRoQkNBLEVBNWhCa0Isc0JBQXNCLEVBNGhCeEM7QUFFRCxBQUFjLGlCQUFMLElBQUksQ0FBQyIsImZpbGUiOiJlbnRpdGllcy9NZXNoLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbIu+7v2ltcG9ydCBHZW9tZXRyeVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9kYXRhL0dlb21ldHJ5XCIpO1xyXG5pbXBvcnQgVHJpYW5nbGVTdWJHZW9tZXRyeVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9kYXRhL1RyaWFuZ2xlU3ViR2VvbWV0cnlcIik7XHJcbmltcG9ydCBTdWJHZW9tZXRyeUJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9kYXRhL1N1Ykdlb21ldHJ5QmFzZVwiKTtcclxuaW1wb3J0IEdlb21ldHJ5RXZlbnRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvR2VvbWV0cnlFdmVudFwiKTtcclxuaW1wb3J0IEJveFx0XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vQm94XCIpO1xyXG5pbXBvcnQgVVZUcmFuc2Zvcm1cdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vVVZUcmFuc2Zvcm1cIik7XHJcblxyXG5pbXBvcnQgSUFuaW1hdG9yXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9hbmltYXRvcnMvSUFuaW1hdG9yXCIpO1xyXG5pbXBvcnQgRGlzcGxheU9iamVjdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvRGlzcGxheU9iamVjdFwiKTtcclxuaW1wb3J0IElTdWJNZXNoXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvSVN1Yk1lc2hcIik7XHJcbmltcG9ydCBJU3ViTWVzaENsYXNzXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9JU3ViTWVzaENsYXNzXCIpO1xyXG5pbXBvcnQgQm91bmRzVHlwZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYm91bmRzL0JvdW5kc1R5cGVcIik7XHJcbmltcG9ydCBEaXNwbGF5T2JqZWN0Q29udGFpbmVyXHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9jb250YWluZXJzL0Rpc3BsYXlPYmplY3RDb250YWluZXJcIik7XHJcbmltcG9ydCBQYXJ0aXRpb25cdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3BhcnRpdGlvbi9QYXJ0aXRpb25cIik7XHJcbmltcG9ydCBFbnRpdHlOb2RlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vRW50aXR5Tm9kZVwiKTtcclxuaW1wb3J0IElSZW5kZXJlclBvb2xcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wb29sL0lSZW5kZXJlclBvb2xcIik7XHJcbmltcG9ydCBTdWJNZXNoUG9vbFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcG9vbC9TdWJNZXNoUG9vbFwiKTtcclxuaW1wb3J0IElFbnRpdHlcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZW50aXRpZXMvSUVudGl0eVwiKTtcclxuaW1wb3J0IE1hdGVyaWFsQmFzZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvbWF0ZXJpYWxzL01hdGVyaWFsQmFzZVwiKTtcclxuXHJcbi8qKlxyXG4gKiBNZXNoIGlzIGFuIGluc3RhbmNlIG9mIGEgR2VvbWV0cnksIGF1Z21lbnRpbmcgaXQgd2l0aCBhIHByZXNlbmNlIGluIHRoZSBzY2VuZSBncmFwaCwgYSBtYXRlcmlhbCwgYW5kIGFuIGFuaW1hdGlvblxyXG4gKiBzdGF0ZS4gSXQgY29uc2lzdHMgb3V0IG9mIFN1Yk1lc2hlcywgd2hpY2ggaW4gdHVybiBjb3JyZXNwb25kIHRvIFN1Ykdlb21ldHJpZXMuIFN1Yk1lc2hlcyBhbGxvdyBkaWZmZXJlbnQgcGFydHNcclxuICogb2YgdGhlIGdlb21ldHJ5IHRvIGJlIGFzc2lnbmVkIGRpZmZlcmVudCBtYXRlcmlhbHMuXHJcbiAqL1xyXG5jbGFzcyBNZXNoIGV4dGVuZHMgRGlzcGxheU9iamVjdENvbnRhaW5lciBpbXBsZW1lbnRzIElFbnRpdHlcclxue1xyXG5cdHB1YmxpYyBzdGF0aWMgYXNzZXRUeXBlOnN0cmluZyA9IFwiW2Fzc2V0IE1lc2hdXCI7XHJcblxyXG5cdHByaXZhdGUgX3V2VHJhbnNmb3JtOlVWVHJhbnNmb3JtO1xyXG5cclxuXHRwcml2YXRlIF9zdWJNZXNoZXM6QXJyYXk8SVN1Yk1lc2g+O1xyXG5cdHByaXZhdGUgX2dlb21ldHJ5Okdlb21ldHJ5O1xyXG5cdHByaXZhdGUgX21hdGVyaWFsOk1hdGVyaWFsQmFzZTtcclxuXHRwcml2YXRlIF9hbmltYXRvcjpJQW5pbWF0b3I7XHJcblx0cHJpdmF0ZSBfY2FzdHNTaGFkb3dzOmJvb2xlYW4gPSB0cnVlO1xyXG5cdHByaXZhdGUgX3NoYXJlQW5pbWF0aW9uR2VvbWV0cnk6Ym9vbGVhbiA9IHRydWU7XHJcblxyXG5cdHByaXZhdGUgX29uR2VvbWV0cnlCb3VuZHNJbnZhbGlkRGVsZWdhdGU6KGV2ZW50Okdlb21ldHJ5RXZlbnQpID0+IHZvaWQ7XHJcblx0cHJpdmF0ZSBfb25TdWJHZW9tZXRyeUFkZGVkRGVsZWdhdGU6KGV2ZW50Okdlb21ldHJ5RXZlbnQpID0+IHZvaWQ7XHJcblx0cHJpdmF0ZSBfb25TdWJHZW9tZXRyeVJlbW92ZWREZWxlZ2F0ZTooZXZlbnQ6R2VvbWV0cnlFdmVudCkgPT4gdm9pZDtcclxuXHJcblx0LyoqXHJcblx0ICogRGVmaW5lcyB0aGUgYW5pbWF0b3Igb2YgdGhlIG1lc2guIEFjdCBvbiB0aGUgbWVzaCdzIGdlb21ldHJ5LiAgRGVmYXVsdCB2YWx1ZSBpcyA8Y29kZT5udWxsPC9jb2RlPi5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGFuaW1hdG9yKCk6SUFuaW1hdG9yXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2FuaW1hdG9yO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBhbmltYXRvcih2YWx1ZTpJQW5pbWF0b3IpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX2FuaW1hdG9yKVxyXG5cdFx0XHR0aGlzLl9hbmltYXRvci5yZW1vdmVPd25lcih0aGlzKTtcclxuXHJcblx0XHR0aGlzLl9hbmltYXRvciA9IHZhbHVlO1xyXG5cclxuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fc3ViTWVzaGVzLmxlbmd0aDtcclxuXHRcdHZhciBzdWJNZXNoOklTdWJNZXNoO1xyXG5cclxuXHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IGxlbjsgKytpKSB7XHJcblx0XHRcdHN1Yk1lc2ggPSB0aGlzLl9zdWJNZXNoZXNbaV07XHJcblxyXG5cdFx0XHQvLyBjYXVzZSBtYXRlcmlhbCB0byBiZSB1bnJlZ2lzdGVyZWQgYW5kIHJlZ2lzdGVyZWQgYWdhaW4gdG8gd29yayB3aXRoIHRoZSBuZXcgYW5pbWF0aW9uIHR5cGUgKGlmIHBvc3NpYmxlKVxyXG5cdFx0XHRpZiAoc3ViTWVzaC5tYXRlcmlhbCkge1xyXG5cdFx0XHRcdHN1Yk1lc2gubWF0ZXJpYWwuaVJlbW92ZU93bmVyKHN1Yk1lc2gpO1xyXG5cdFx0XHRcdHN1Yk1lc2gubWF0ZXJpYWwuaUFkZE93bmVyKHN1Yk1lc2gpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvL2ludmFsaWRhdGUgYW55IGV4aXN0aW5nIHJlbmRlcmFibGVzIGluIGNhc2UgdGhleSBuZWVkIHRvIHB1bGwgbmV3IGdlb21ldHJ5XHJcblx0XHRcdHN1Yk1lc2guX2lJbnZhbGlkYXRlUmVuZGVyYWJsZUdlb21ldHJ5KCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuX2FuaW1hdG9yKVxyXG5cdFx0XHR0aGlzLl9hbmltYXRvci5hZGRPd25lcih0aGlzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCBhc3NldFR5cGUoKTpzdHJpbmdcclxuXHR7XHJcblx0XHRyZXR1cm4gTWVzaC5hc3NldFR5cGU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJbmRpY2F0ZXMgd2hldGhlciBvciBub3QgdGhlIE1lc2ggY2FuIGNhc3Qgc2hhZG93cy4gRGVmYXVsdCB2YWx1ZSBpcyA8Y29kZT50cnVlPC9jb2RlPi5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGNhc3RzU2hhZG93cygpOmJvb2xlYW5cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fY2FzdHNTaGFkb3dzO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBjYXN0c1NoYWRvd3ModmFsdWU6Ym9vbGVhbilcclxuXHR7XHJcblx0XHR0aGlzLl9jYXN0c1NoYWRvd3MgPSB2YWx1ZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBnZW9tZXRyeSB1c2VkIGJ5IHRoZSBtZXNoIHRoYXQgcHJvdmlkZXMgaXQgd2l0aCBpdHMgc2hhcGUuXHJcblx0ICovXHJcblx0cHVibGljIGdldCBnZW9tZXRyeSgpOkdlb21ldHJ5XHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX2lTb3VyY2VQcmVmYWIpXHJcblx0XHRcdHRoaXMuX2lTb3VyY2VQcmVmYWIuX2lWYWxpZGF0ZSgpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLl9nZW9tZXRyeTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgZ2VvbWV0cnkodmFsdWU6R2VvbWV0cnkpXHJcblx0e1xyXG5cdFx0dmFyIGk6bnVtYmVyO1xyXG5cclxuXHRcdGlmICh0aGlzLl9nZW9tZXRyeSkge1xyXG5cdFx0XHR0aGlzLl9nZW9tZXRyeS5yZW1vdmVFdmVudExpc3RlbmVyKEdlb21ldHJ5RXZlbnQuQk9VTkRTX0lOVkFMSUQsIHRoaXMuX29uR2VvbWV0cnlCb3VuZHNJbnZhbGlkRGVsZWdhdGUpO1xyXG5cdFx0XHR0aGlzLl9nZW9tZXRyeS5yZW1vdmVFdmVudExpc3RlbmVyKEdlb21ldHJ5RXZlbnQuU1VCX0dFT01FVFJZX0FEREVELCB0aGlzLl9vblN1Ykdlb21ldHJ5QWRkZWREZWxlZ2F0ZSk7XHJcblx0XHRcdHRoaXMuX2dlb21ldHJ5LnJlbW92ZUV2ZW50TGlzdGVuZXIoR2VvbWV0cnlFdmVudC5TVUJfR0VPTUVUUllfUkVNT1ZFRCwgdGhpcy5fb25TdWJHZW9tZXRyeVJlbW92ZWREZWxlZ2F0ZSk7XHJcblxyXG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgdGhpcy5fc3ViTWVzaGVzLmxlbmd0aDsgKytpKVxyXG5cdFx0XHRcdHRoaXMuX3N1Yk1lc2hlc1tpXS5kaXNwb3NlKCk7XHJcblxyXG5cdFx0XHR0aGlzLl9zdWJNZXNoZXMubGVuZ3RoID0gMDtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLl9nZW9tZXRyeSA9IHZhbHVlO1xyXG5cclxuXHRcdGlmICh0aGlzLl9nZW9tZXRyeSkge1xyXG5cclxuXHRcdFx0dGhpcy5fZ2VvbWV0cnkuYWRkRXZlbnRMaXN0ZW5lcihHZW9tZXRyeUV2ZW50LkJPVU5EU19JTlZBTElELCB0aGlzLl9vbkdlb21ldHJ5Qm91bmRzSW52YWxpZERlbGVnYXRlKTtcclxuXHRcdFx0dGhpcy5fZ2VvbWV0cnkuYWRkRXZlbnRMaXN0ZW5lcihHZW9tZXRyeUV2ZW50LlNVQl9HRU9NRVRSWV9BRERFRCwgdGhpcy5fb25TdWJHZW9tZXRyeUFkZGVkRGVsZWdhdGUpO1xyXG5cdFx0XHR0aGlzLl9nZW9tZXRyeS5hZGRFdmVudExpc3RlbmVyKEdlb21ldHJ5RXZlbnQuU1VCX0dFT01FVFJZX1JFTU9WRUQsIHRoaXMuX29uU3ViR2VvbWV0cnlSZW1vdmVkRGVsZWdhdGUpO1xyXG5cclxuXHRcdFx0dmFyIHN1Ykdlb21zOkFycmF5PFN1Ykdlb21ldHJ5QmFzZT4gPSB0aGlzLl9nZW9tZXRyeS5zdWJHZW9tZXRyaWVzO1xyXG5cclxuXHRcdFx0Zm9yIChpID0gMDsgaSA8IHN1Ykdlb21zLmxlbmd0aDsgKytpKVxyXG5cdFx0XHRcdHRoaXMuYWRkU3ViTWVzaChzdWJHZW9tc1tpXSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgbWF0ZXJpYWwgd2l0aCB3aGljaCB0byByZW5kZXIgdGhlIE1lc2guXHJcblx0ICovXHJcblx0cHVibGljIGdldCBtYXRlcmlhbCgpOk1hdGVyaWFsQmFzZVxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9tYXRlcmlhbDtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgbWF0ZXJpYWwodmFsdWU6TWF0ZXJpYWxCYXNlKVxyXG5cdHtcclxuXHRcdGlmICh2YWx1ZSA9PSB0aGlzLl9tYXRlcmlhbClcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHZhciBpOm51bWJlcjtcclxuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fc3ViTWVzaGVzLmxlbmd0aDtcclxuXHRcdHZhciBzdWJNZXNoOklTdWJNZXNoO1xyXG5cclxuXHRcdGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKylcclxuXHRcdFx0aWYgKHRoaXMuX21hdGVyaWFsICYmIChzdWJNZXNoID0gdGhpcy5fc3ViTWVzaGVzW2ldKS5tYXRlcmlhbCA9PSB0aGlzLl9tYXRlcmlhbClcclxuXHRcdFx0XHR0aGlzLl9tYXRlcmlhbC5pUmVtb3ZlT3duZXIoc3ViTWVzaCk7XHJcblxyXG5cdFx0dGhpcy5fbWF0ZXJpYWwgPSB2YWx1ZTtcclxuXHJcblx0XHRmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspXHJcblx0XHRcdGlmICh0aGlzLl9tYXRlcmlhbCAmJiAoc3ViTWVzaCA9IHRoaXMuX3N1Yk1lc2hlc1tpXSkubWF0ZXJpYWwgPT0gdGhpcy5fbWF0ZXJpYWwpXHJcblx0XHRcdFx0dGhpcy5fbWF0ZXJpYWwuaUFkZE93bmVyKHN1Yk1lc2gpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSW5kaWNhdGVzIHdoZXRoZXIgb3Igbm90IHRoZSBtZXNoIHNoYXJlIHRoZSBzYW1lIGFuaW1hdGlvbiBnZW9tZXRyeS5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHNoYXJlQW5pbWF0aW9uR2VvbWV0cnkoKTpib29sZWFuXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3NoYXJlQW5pbWF0aW9uR2VvbWV0cnk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHNoYXJlQW5pbWF0aW9uR2VvbWV0cnkodmFsdWU6Ym9vbGVhbilcclxuXHR7XHJcblx0XHR0aGlzLl9zaGFyZUFuaW1hdGlvbkdlb21ldHJ5ID0gdmFsdWU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgU3ViTWVzaGVzIG91dCBvZiB3aGljaCB0aGUgTWVzaCBjb25zaXN0cy4gRXZlcnkgU3ViTWVzaCBjYW4gYmUgYXNzaWduZWQgYSBtYXRlcmlhbCB0byBvdmVycmlkZSB0aGUgTWVzaCdzXHJcblx0ICogbWF0ZXJpYWwuXHJcblx0ICovXHJcblx0cHVibGljIGdldCBzdWJNZXNoZXMoKTpBcnJheTxJU3ViTWVzaD5cclxuXHR7XHJcblx0XHQvLyBTaW5jZSB0aGlzIGdldHRlciBpcyBpbnZva2VkIGV2ZXJ5IGl0ZXJhdGlvbiBvZiB0aGUgcmVuZGVyIGxvb3AsIGFuZFxyXG5cdFx0Ly8gdGhlIHByZWZhYiBjb25zdHJ1Y3QgY291bGQgYWZmZWN0IHRoZSBzdWItbWVzaGVzLCB0aGUgcHJlZmFiIGlzXHJcblx0XHQvLyB2YWxpZGF0ZWQgaGVyZSB0byBnaXZlIGl0IGEgY2hhbmNlIHRvIHJlYnVpbGQuXHJcblx0XHRpZiAodGhpcy5faVNvdXJjZVByZWZhYilcclxuXHRcdFx0dGhpcy5faVNvdXJjZVByZWZhYi5faVZhbGlkYXRlKCk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX3N1Yk1lc2hlcztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCB1dlRyYW5zZm9ybSgpOlVWVHJhbnNmb3JtXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3V2VHJhbnNmb3JtO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCB1dlRyYW5zZm9ybSh2YWx1ZTpVVlRyYW5zZm9ybSlcclxuXHR7XHJcblx0XHR0aGlzLl91dlRyYW5zZm9ybSA9IHZhbHVlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlIGEgbmV3IE1lc2ggb2JqZWN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGdlb21ldHJ5ICAgICAgICAgICAgICAgICAgICBUaGUgZ2VvbWV0cnkgdXNlZCBieSB0aGUgbWVzaCB0aGF0IHByb3ZpZGVzIGl0IHdpdGggaXRzIHNoYXBlLlxyXG5cdCAqIEBwYXJhbSBtYXRlcmlhbCAgICBbb3B0aW9uYWxdICAgICAgICBUaGUgbWF0ZXJpYWwgd2l0aCB3aGljaCB0byByZW5kZXIgdGhlIE1lc2guXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoZ2VvbWV0cnk6R2VvbWV0cnksIG1hdGVyaWFsOk1hdGVyaWFsQmFzZSA9IG51bGwpXHJcblx0e1xyXG5cdFx0c3VwZXIoKTtcclxuXHJcblx0XHR0aGlzLl9wSXNFbnRpdHkgPSB0cnVlO1xyXG5cclxuXHRcdHRoaXMuX3N1Yk1lc2hlcyA9IG5ldyBBcnJheTxJU3ViTWVzaD4oKTtcclxuXHJcblx0XHR0aGlzLl9vbkdlb21ldHJ5Qm91bmRzSW52YWxpZERlbGVnYXRlID0gKGV2ZW50Okdlb21ldHJ5RXZlbnQpID0+IHRoaXMub25HZW9tZXRyeUJvdW5kc0ludmFsaWQoZXZlbnQpO1xyXG5cdFx0dGhpcy5fb25TdWJHZW9tZXRyeUFkZGVkRGVsZWdhdGUgPSAoZXZlbnQ6R2VvbWV0cnlFdmVudCkgPT4gdGhpcy5vblN1Ykdlb21ldHJ5QWRkZWQoZXZlbnQpO1xyXG5cdFx0dGhpcy5fb25TdWJHZW9tZXRyeVJlbW92ZWREZWxlZ2F0ZSA9IChldmVudDpHZW9tZXRyeUV2ZW50KSA9PiB0aGlzLm9uU3ViR2VvbWV0cnlSZW1vdmVkKGV2ZW50KTtcclxuXHJcblx0XHQvL3RoaXMgc2hvdWxkIG5ldmVyIGhhcHBlbiwgYnV0IGlmIHBlb3BsZSBpbnNpc3Qgb24gdHJ5aW5nIHRvIGNyZWF0ZSB0aGVpciBtZXNoZXMgYmVmb3JlIHRoZXkgaGF2ZSBnZW9tZXRyeSB0byBmaWxsIGl0LCBpdCBiZWNvbWVzIG5lY2Vzc2FyeVxyXG5cdFx0dGhpcy5nZW9tZXRyeSA9IGdlb21ldHJ5IHx8IG5ldyBHZW9tZXRyeSgpO1xyXG5cclxuXHRcdHRoaXMubWF0ZXJpYWwgPSBtYXRlcmlhbDtcclxuXHJcblx0XHQvL2RlZmF1bHQgYm91bmRzIHR5cGVcclxuXHRcdHRoaXMuX2JvdW5kc1R5cGUgPSBCb3VuZHNUeXBlLkFYSVNfQUxJR05FRF9CT1g7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBiYWtlVHJhbnNmb3JtYXRpb25zKClcclxuXHR7XHJcblx0XHR0aGlzLmdlb21ldHJ5LmFwcGx5VHJhbnNmb3JtYXRpb24odGhpcy5faU1hdHJpeDNEKTtcclxuXHRcdHRoaXMuX2lNYXRyaXgzRC5pZGVudGl0eSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQGluaGVyaXREb2NcclxuXHQgKi9cclxuXHRwdWJsaWMgZGlzcG9zZSgpXHJcblx0e1xyXG5cdFx0c3VwZXIuZGlzcG9zZSgpO1xyXG5cclxuXHRcdHRoaXMubWF0ZXJpYWwgPSBudWxsO1xyXG5cdFx0dGhpcy5nZW9tZXRyeSA9IG51bGw7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEaXNwb3NlcyBtZXNoIGluY2x1ZGluZyB0aGUgYW5pbWF0b3IgYW5kIGNoaWxkcmVuLiBUaGlzIGlzIGEgbWVyZWx5IGEgY29udmVuaWVuY2UgbWV0aG9kLlxyXG5cdCAqIEByZXR1cm5cclxuXHQgKi9cclxuXHRwdWJsaWMgZGlzcG9zZVdpdGhBbmltYXRvckFuZENoaWxkcmVuKClcclxuXHR7XHJcblx0XHR0aGlzLmRpc3Bvc2VXaXRoQ2hpbGRyZW4oKTtcclxuXHJcblx0XHQgaWYgKHRoaXMuX2FuaW1hdG9yKVxyXG5cdFx0XHR0aGlzLl9hbmltYXRvci5kaXNwb3NlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDbG9uZXMgdGhpcyBNZXNoIGluc3RhbmNlIGFsb25nIHdpdGggYWxsIGl0J3MgY2hpbGRyZW4sIHdoaWxlIHJlLXVzaW5nIHRoZSBzYW1lXHJcblx0ICogbWF0ZXJpYWwsIGdlb21ldHJ5IGFuZCBhbmltYXRpb24gc2V0LiBUaGUgcmV0dXJuZWQgcmVzdWx0IHdpbGwgYmUgYSBjb3B5IG9mIHRoaXMgbWVzaCxcclxuXHQgKiBjb250YWluaW5nIGNvcGllcyBvZiBhbGwgb2YgaXQncyBjaGlsZHJlbi5cclxuXHQgKlxyXG5cdCAqIFByb3BlcnRpZXMgdGhhdCBhcmUgcmUtdXNlZCAoaS5lLiBub3QgY2xvbmVkKSBieSB0aGUgbmV3IGNvcHkgaW5jbHVkZSBuYW1lLFxyXG5cdCAqIGdlb21ldHJ5LCBhbmQgbWF0ZXJpYWwuIFByb3BlcnRpZXMgdGhhdCBhcmUgY2xvbmVkIG9yIGNyZWF0ZWQgYW5ldyBmb3IgdGhlIGNvcHlcclxuXHQgKiBpbmNsdWRlIHN1Yk1lc2hlcywgY2hpbGRyZW4gb2YgdGhlIG1lc2gsIGFuZCB0aGUgYW5pbWF0b3IuXHJcblx0ICpcclxuXHQgKiBJZiB5b3Ugd2FudCB0byBjb3B5IGp1c3QgdGhlIG1lc2gsIHJldXNpbmcgaXQncyBnZW9tZXRyeSBhbmQgbWF0ZXJpYWwgd2hpbGUgbm90XHJcblx0ICogY2xvbmluZyBpdCdzIGNoaWxkcmVuLCB0aGUgc2ltcGxlc3Qgd2F5IGlzIHRvIGNyZWF0ZSBhIG5ldyBtZXNoIG1hbnVhbGx5OlxyXG5cdCAqXHJcblx0ICogPGNvZGU+XHJcblx0ICogdmFyIGNsb25lIDogTWVzaCA9IG5ldyBNZXNoKG9yaWdpbmFsLmdlb21ldHJ5LCBvcmlnaW5hbC5tYXRlcmlhbCk7XHJcblx0ICogPC9jb2RlPlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBjbG9uZSgpOkRpc3BsYXlPYmplY3RcclxuXHR7XHJcblx0XHR2YXIgY2xvbmU6TWVzaCA9IG5ldyBNZXNoKHRoaXMuX2dlb21ldHJ5LCB0aGlzLl9tYXRlcmlhbCk7XHJcblxyXG5cdFx0Y2xvbmUuX2lNYXRyaXgzRCA9IHRoaXMuX2lNYXRyaXgzRDtcclxuXHRcdGNsb25lLnBpdm90ID0gdGhpcy5waXZvdDtcclxuXHRcdGNsb25lLnBhcnRpdGlvbiA9IHRoaXMucGFydGl0aW9uO1xyXG5cdFx0Y2xvbmUuYm91bmRzVHlwZSA9IHRoaXMuYm91bmRzVHlwZTtcclxuXHJcblxyXG5cdFx0Y2xvbmUubmFtZSA9IHRoaXMubmFtZTtcclxuXHRcdGNsb25lLmNhc3RzU2hhZG93cyA9IHRoaXMuY2FzdHNTaGFkb3dzO1xyXG5cdFx0Y2xvbmUuc2hhcmVBbmltYXRpb25HZW9tZXRyeSA9IHRoaXMuc2hhcmVBbmltYXRpb25HZW9tZXRyeTtcclxuXHRcdGNsb25lLm1vdXNlRW5hYmxlZCA9IHRoaXMubW91c2VFbmFibGVkO1xyXG5cdFx0Y2xvbmUubW91c2VDaGlsZHJlbiA9IHRoaXMubW91c2VDaGlsZHJlbjtcclxuXHRcdC8vdGhpcyBpcyBvZiBjb3Vyc2Ugbm8gcHJvcGVyIGNsb25pbmdcclxuXHRcdC8vbWF5YmUgdXNlIHRoaXMgaW5zdGVhZD86IGh0dHA6Ly9ibG9nLmFub3RoZXItZC1tZW50aW9uLnJvL3Byb2dyYW1taW5nL2hvdy10by1jbG9uZS1kdXBsaWNhdGUtYW4tb2JqZWN0LWluLWFjdGlvbnNjcmlwdC0zL1xyXG5cdFx0Y2xvbmUuZXh0cmEgPSB0aGlzLmV4dHJhO1xyXG5cdFx0Y2xvbmUuX2lNYXNrcyA9IHRoaXMuX2lNYXNrcztcclxuXHRcdGNsb25lLl9pTWFza0lEID0gdGhpcy5faU1hc2tJRDtcclxuXHJcblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX3N1Yk1lc2hlcy5sZW5ndGg7XHJcblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBsZW47ICsraSlcclxuXHRcdFx0Y2xvbmUuX3N1Yk1lc2hlc1tpXS5tYXRlcmlhbCA9IHRoaXMuX3N1Yk1lc2hlc1tpXS5faUdldEV4cGxpY2l0TWF0ZXJpYWwoKTtcclxuXHJcblxyXG5cdFx0bGVuID0gdGhpcy5udW1DaGlsZHJlbjtcclxuXHRcdHZhciBvYmo6YW55O1xyXG5cclxuXHRcdGZvciAoaSA9IDA7IGkgPCBsZW47ICsraSkge1xyXG5cdFx0XHRvYmogPSB0aGlzLmdldENoaWxkQXQoaSkuY2xvbmUoKTtcclxuXHRcdFx0Y2xvbmUuYWRkQ2hpbGQoPERpc3BsYXlPYmplY3RDb250YWluZXI+IG9iaik7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuX2FuaW1hdG9yKVxyXG5cdFx0XHRjbG9uZS5hbmltYXRvciA9IHRoaXMuX2FuaW1hdG9yLmNsb25lKCk7XHJcblxyXG5cdFx0cmV0dXJuIGNsb25lO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogLy9UT0RPXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3ViR2VvbWV0cnlcclxuXHQgKiBAcmV0dXJucyB7U3ViTWVzaEJhc2V9XHJcblx0ICovXHJcblx0cHVibGljIGdldFN1Yk1lc2hGcm9tU3ViR2VvbWV0cnkoc3ViR2VvbWV0cnk6U3ViR2VvbWV0cnlCYXNlKTpJU3ViTWVzaFxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9zdWJNZXNoZXNbdGhpcy5fZ2VvbWV0cnkuc3ViR2VvbWV0cmllcy5pbmRleE9mKHN1Ykdlb21ldHJ5KV07XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiAvL1RPRE9cclxuXHQgKlxyXG5cdCAqIEBwcm90ZWN0ZWRcclxuXHQgKi9cclxuXHRwdWJsaWMgX3BVcGRhdGVCb3hCb3VuZHMoKVxyXG5cdHtcclxuXHRcdHN1cGVyLl9wVXBkYXRlQm94Qm91bmRzKCk7XHJcblxyXG5cdFx0dmFyIGk6bnVtYmVyLCBqOm51bWJlciwgcDpudW1iZXIsIGxlbjpudW1iZXI7XHJcblx0XHR2YXIgc3ViR2VvbXM6QXJyYXk8U3ViR2VvbWV0cnlCYXNlPiA9IHRoaXMuX2dlb21ldHJ5LnN1Ykdlb21ldHJpZXM7XHJcblx0XHR2YXIgc3ViR2VvbTpTdWJHZW9tZXRyeUJhc2U7XHJcblx0XHR2YXIgYm91bmRpbmdQb3NpdGlvbnM6QXJyYXk8bnVtYmVyPjtcclxuXHRcdHZhciBudW1TdWJHZW9tczpudW1iZXIgPSBzdWJHZW9tcy5sZW5ndGg7XHJcblx0XHR2YXIgbWluWDpudW1iZXIsIG1pblk6bnVtYmVyLCBtaW5aOm51bWJlcjtcclxuXHRcdHZhciBtYXhYOm51bWJlciwgbWF4WTpudW1iZXIsIG1heFo6bnVtYmVyO1xyXG5cclxuXHRcdGlmIChudW1TdWJHZW9tcyA+IDApIHtcclxuXHRcdFx0aSA9IDA7XHJcblx0XHRcdHN1Ykdlb20gPSBzdWJHZW9tc1swXTtcclxuXHRcdFx0Ym91bmRpbmdQb3NpdGlvbnMgPSBzdWJHZW9tLmdldEJvdW5kaW5nUG9zaXRpb25zKCk7XHJcblx0XHRcdG1pblggPSBtYXhYID0gYm91bmRpbmdQb3NpdGlvbnNbaV07XHJcblx0XHRcdG1pblkgPSBtYXhZID0gYm91bmRpbmdQb3NpdGlvbnNbaSArIDFdO1xyXG5cdFx0XHRtaW5aID0gbWF4WiA9IGJvdW5kaW5nUG9zaXRpb25zW2kgKyAyXTtcclxuXHJcblx0XHRcdGZvciAoaiA9IDA7IGogPCBudW1TdWJHZW9tczsgaisrKSB7XHJcblx0XHRcdFx0c3ViR2VvbSA9IHN1Ykdlb21zW2pdO1xyXG5cdFx0XHRcdGJvdW5kaW5nUG9zaXRpb25zID0gc3ViR2VvbS5nZXRCb3VuZGluZ1Bvc2l0aW9ucygpO1xyXG5cdFx0XHRcdGxlbiA9IGJvdW5kaW5nUG9zaXRpb25zLmxlbmd0aDtcclxuXHJcblx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGxlbjsgaSs9Mykge1xyXG5cdFx0XHRcdFx0cCA9IGJvdW5kaW5nUG9zaXRpb25zW2ldO1xyXG5cdFx0XHRcdFx0aWYgKHAgPCBtaW5YKVxyXG5cdFx0XHRcdFx0XHRtaW5YID0gcDtcclxuXHRcdFx0XHRcdGVsc2UgaWYgKHAgPiBtYXhYKVxyXG5cdFx0XHRcdFx0XHRtYXhYID0gcDtcclxuXHJcblx0XHRcdFx0XHRwID0gYm91bmRpbmdQb3NpdGlvbnNbaSArIDFdO1xyXG5cclxuXHRcdFx0XHRcdGlmIChwIDwgbWluWSlcclxuXHRcdFx0XHRcdFx0bWluWSA9IHA7XHJcblx0XHRcdFx0XHRlbHNlIGlmIChwID4gbWF4WSlcclxuXHRcdFx0XHRcdFx0bWF4WSA9IHA7XHJcblxyXG5cdFx0XHRcdFx0cCA9IGJvdW5kaW5nUG9zaXRpb25zW2kgKyAyXTtcclxuXHJcblx0XHRcdFx0XHRpZiAocCA8IG1pblopXHJcblx0XHRcdFx0XHRcdG1pblogPSBwO1xyXG5cdFx0XHRcdFx0ZWxzZSBpZiAocCA+IG1heFopXHJcblx0XHRcdFx0XHRcdG1heFogPSBwO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5fcEJveEJvdW5kcy53aWR0aCA9IG1heFggLSAodGhpcy5fcEJveEJvdW5kcy54ID0gbWluWCk7XHJcblx0XHRcdHRoaXMuX3BCb3hCb3VuZHMuaGVpZ2h0ID0gbWF4WSAtICh0aGlzLl9wQm94Qm91bmRzLnkgPSBtaW5ZKTtcclxuXHRcdFx0dGhpcy5fcEJveEJvdW5kcy5kZXB0aCA9IG1heFogLSAodGhpcy5fcEJveEJvdW5kcy56ID0gbWluWik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLl9wQm94Qm91bmRzLnNldEVtcHR5KCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHJcblx0cHVibGljIF9wVXBkYXRlU3BoZXJlQm91bmRzKClcclxuXHR7XHJcblx0XHRzdXBlci5fcFVwZGF0ZVNwaGVyZUJvdW5kcygpO1xyXG5cclxuXHRcdHZhciBib3g6Qm94ID0gdGhpcy5nZXRCb3goKTtcclxuXHRcdHZhciBjZW50ZXJYOm51bWJlciA9IGJveC54ICsgYm94LndpZHRoLzI7XHJcblx0XHR2YXIgY2VudGVyWTpudW1iZXIgPSBib3gueSArIGJveC5oZWlnaHQvMjtcclxuXHRcdHZhciBjZW50ZXJaOm51bWJlciA9IGJveC56ICsgYm94LmRlcHRoLzI7XHJcblxyXG5cdFx0dmFyIGk6bnVtYmVyLCBqOm51bWJlciwgcDpudW1iZXIsIGxlbjpudW1iZXI7XHJcblx0XHR2YXIgc3ViR2VvbXM6QXJyYXk8U3ViR2VvbWV0cnlCYXNlPiA9IHRoaXMuX2dlb21ldHJ5LnN1Ykdlb21ldHJpZXM7XHJcblx0XHR2YXIgc3ViR2VvbTpTdWJHZW9tZXRyeUJhc2U7XHJcblx0XHR2YXIgYm91bmRpbmdQb3NpdGlvbnM6QXJyYXk8bnVtYmVyPjtcclxuXHRcdHZhciBudW1TdWJHZW9tczpudW1iZXIgPSBzdWJHZW9tcy5sZW5ndGg7XHJcblx0XHR2YXIgbWF4UmFkaXVzU3F1YXJlZDpudW1iZXIgPSAwO1xyXG5cdFx0dmFyIHJhZGl1c1NxdWFyZWQ6bnVtYmVyO1xyXG5cdFx0dmFyIGRpc3RhbmNlWDpudW1iZXI7XHJcblx0XHR2YXIgZGlzdGFuY2VZOm51bWJlcjtcclxuXHRcdHZhciBkaXN0YW5jZVo6bnVtYmVyO1xyXG5cclxuXHRcdGlmIChudW1TdWJHZW9tcyA+IDApIHtcclxuXHRcdFx0aSA9IDA7XHJcblx0XHRcdHN1Ykdlb20gPSBzdWJHZW9tc1swXTtcclxuXHRcdFx0Ym91bmRpbmdQb3NpdGlvbnMgPSBzdWJHZW9tLmdldEJvdW5kaW5nUG9zaXRpb25zKCk7XHJcblx0XHRcdGZvciAoaiA9IDA7IGogPCBudW1TdWJHZW9tczsgaisrKSB7XHJcblx0XHRcdFx0c3ViR2VvbSA9IHN1Ykdlb21zW2pdO1xyXG5cdFx0XHRcdGJvdW5kaW5nUG9zaXRpb25zID0gc3ViR2VvbS5nZXRCb3VuZGluZ1Bvc2l0aW9ucygpO1xyXG5cdFx0XHRcdGxlbiA9IGJvdW5kaW5nUG9zaXRpb25zLmxlbmd0aDtcclxuXHJcblx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGxlbjsgaSArPSAzKSB7XHJcblx0XHRcdFx0XHRkaXN0YW5jZVggPSBib3VuZGluZ1Bvc2l0aW9uc1tpXSAtIGNlbnRlclg7XHJcblx0XHRcdFx0XHRkaXN0YW5jZVkgPSBib3VuZGluZ1Bvc2l0aW9uc1tpICsgMV0gLSBjZW50ZXJZO1xyXG5cdFx0XHRcdFx0ZGlzdGFuY2VaID0gYm91bmRpbmdQb3NpdGlvbnNbaSArIDJdIC0gY2VudGVyWjtcclxuXHRcdFx0XHRcdHJhZGl1c1NxdWFyZWQgPSBkaXN0YW5jZVgqZGlzdGFuY2VYICsgZGlzdGFuY2VZKmRpc3RhbmNlWSArIGRpc3RhbmNlWipkaXN0YW5jZVo7XHJcblxyXG5cdFx0XHRcdFx0aWYgKG1heFJhZGl1c1NxdWFyZWQgPCByYWRpdXNTcXVhcmVkKVxyXG5cdFx0XHRcdFx0XHRtYXhSYWRpdXNTcXVhcmVkID0gcmFkaXVzU3F1YXJlZDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLl9wU3BoZXJlQm91bmRzLnggPSBjZW50ZXJYO1xyXG5cdFx0dGhpcy5fcFNwaGVyZUJvdW5kcy55ID0gY2VudGVyWTtcclxuXHRcdHRoaXMuX3BTcGhlcmVCb3VuZHMueiA9IGNlbnRlclo7XHJcblx0XHR0aGlzLl9wU3BoZXJlQm91bmRzLnJhZGl1cyA9IE1hdGguc3FydChtYXhSYWRpdXNTcXVhcmVkKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIC8vVE9ET1xyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIG9uR2VvbWV0cnlCb3VuZHNJbnZhbGlkKGV2ZW50Okdlb21ldHJ5RXZlbnQpXHJcblx0e1xyXG5cdFx0dGhpcy5fcEludmFsaWRhdGVCb3VuZHMoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENhbGxlZCB3aGVuIGEgU3ViR2VvbWV0cnkgd2FzIGFkZGVkIHRvIHRoZSBHZW9tZXRyeS5cclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBvblN1Ykdlb21ldHJ5QWRkZWQoZXZlbnQ6R2VvbWV0cnlFdmVudClcclxuXHR7XHJcblx0XHR0aGlzLmFkZFN1Yk1lc2goZXZlbnQuc3ViR2VvbWV0cnkpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2FsbGVkIHdoZW4gYSBTdWJHZW9tZXRyeSB3YXMgcmVtb3ZlZCBmcm9tIHRoZSBHZW9tZXRyeS5cclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBvblN1Ykdlb21ldHJ5UmVtb3ZlZChldmVudDpHZW9tZXRyeUV2ZW50KVxyXG5cdHtcclxuXHRcdHZhciBzdWJNZXNoOklTdWJNZXNoO1xyXG5cdFx0dmFyIHN1Ykdlb206U3ViR2VvbWV0cnlCYXNlID0gZXZlbnQuc3ViR2VvbWV0cnk7XHJcblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX3N1Yk1lc2hlcy5sZW5ndGg7XHJcblx0XHR2YXIgaTpudW1iZXI7XHJcblxyXG5cdFx0Ly8gSW1wb3J0YW50ISBUaGlzIGhhcyB0byBiZSBkb25lIGhlcmUsIGFuZCBub3QgZGVsYXllZCB1bnRpbCB0aGVcclxuXHRcdC8vIG5leHQgcmVuZGVyIGxvb3AsIHNpbmNlIHRoaXMgbWF5IGJlIGNhdXNlZCBieSB0aGUgZ2VvbWV0cnkgYmVpbmdcclxuXHRcdC8vIHJlYnVpbHQgSU4gVEhFIFJFTkRFUiBMT09QLiBJbnZhbGlkYXRpbmcgYW5kIHdhaXRpbmcgd2lsbCBkZWxheVxyXG5cdFx0Ly8gaXQgdW50aWwgdGhlIE5FWFQgUkVOREVSIEZSQU1FIHdoaWNoIGlzIHByb2JhYmx5IG5vdCBkZXNpcmFibGUuXHJcblx0XHRmb3IgKGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcclxuXHJcblx0XHRcdHN1Yk1lc2ggPSB0aGlzLl9zdWJNZXNoZXNbaV07XHJcblxyXG5cdFx0XHRpZiAoc3ViTWVzaC5zdWJHZW9tZXRyeSA9PSBzdWJHZW9tKSB7XHJcblx0XHRcdFx0c3ViTWVzaC5kaXNwb3NlKCk7XHJcblxyXG5cdFx0XHRcdHRoaXMuX3N1Yk1lc2hlcy5zcGxpY2UoaSwgMSk7XHJcblxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0LS1sZW47XHJcblx0XHRmb3IgKDsgaSA8IGxlbjsgKytpKVxyXG5cdFx0XHR0aGlzLl9zdWJNZXNoZXNbaV0uX2lJbmRleCA9IGk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGEgU3ViTWVzaEJhc2Ugd3JhcHBpbmcgYSBTdWJHZW9tZXRyeS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdWJHZW9tZXRyeVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgYWRkU3ViTWVzaChzdWJHZW9tZXRyeTpTdWJHZW9tZXRyeUJhc2UpXHJcblx0e1xyXG5cdFx0dmFyIFN1Yk1lc2hDbGFzczpJU3ViTWVzaENsYXNzID0gU3ViTWVzaFBvb2wuZ2V0U3ViTWVzaENsYXNzKHN1Ykdlb21ldHJ5KTtcclxuXHJcblx0XHR2YXIgc3ViTWVzaDpJU3ViTWVzaCA9IG5ldyBTdWJNZXNoQ2xhc3Moc3ViR2VvbWV0cnksIHRoaXMsIG51bGwpO1xyXG5cdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9zdWJNZXNoZXMubGVuZ3RoO1xyXG5cclxuXHRcdHN1Yk1lc2guX2lJbmRleCA9IGxlbjtcclxuXHJcblx0XHR0aGlzLl9zdWJNZXNoZXNbbGVuXSA9IHN1Yk1lc2g7XHJcblxyXG5cdFx0dGhpcy5fcEludmFsaWRhdGVCb3VuZHMoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIC8vVE9ET1xyXG5cdCAqXHJcblx0ICogQHBhcmFtIHNob3J0ZXN0Q29sbGlzaW9uRGlzdGFuY2VcclxuXHQgKiBAcGFyYW0gZmluZENsb3Nlc3RcclxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuXHQgKlxyXG5cdCAqIEBpbnRlcm5hbFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBfaVRlc3RDb2xsaXNpb24oc2hvcnRlc3RDb2xsaXNpb25EaXN0YW5jZTpudW1iZXIsIGZpbmRDbG9zZXN0OmJvb2xlYW4pOmJvb2xlYW5cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcFBpY2tpbmdDb2xsaWRlci50ZXN0TWVzaENvbGxpc2lvbih0aGlzLCB0aGlzLl9wUGlja2luZ0NvbGxpc2lvblZPLCBzaG9ydGVzdENvbGxpc2lvbkRpc3RhbmNlLCBmaW5kQ2xvc2VzdCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSByZW5kZXJlclxyXG5cdCAqXHJcblx0ICogQGludGVybmFsXHJcblx0ICovXHJcblx0cHVibGljIF9pQ29sbGVjdFJlbmRlcmFibGVzKHJlbmRlcmVyUG9vbDpJUmVuZGVyZXJQb29sKVxyXG5cdHtcclxuXHRcdC8vIFNpbmNlIHRoaXMgZ2V0dGVyIGlzIGludm9rZWQgZXZlcnkgaXRlcmF0aW9uIG9mIHRoZSByZW5kZXIgbG9vcCwgYW5kXHJcblx0XHQvLyB0aGUgcHJlZmFiIGNvbnN0cnVjdCBjb3VsZCBhZmZlY3QgdGhlIHN1Yi1tZXNoZXMsIHRoZSBwcmVmYWIgaXNcclxuXHRcdC8vIHZhbGlkYXRlZCBoZXJlIHRvIGdpdmUgaXQgYSBjaGFuY2UgdG8gcmVidWlsZC5cclxuXHRcdGlmICh0aGlzLl9pU291cmNlUHJlZmFiKVxyXG5cdFx0XHR0aGlzLl9pU291cmNlUHJlZmFiLl9pVmFsaWRhdGUoKTtcclxuXHJcblx0XHR2YXIgbGVuOm51bWJlciAvKnVpbnQqLyA9IHRoaXMuX3N1Yk1lc2hlcy5sZW5ndGg7XHJcblx0XHRmb3IgKHZhciBpOm51bWJlciAvKnVpbnQqLyA9IDA7IGkgPCBsZW47IGkrKylcclxuXHRcdFx0dGhpcy5fc3ViTWVzaGVzW2ldLl9pQ29sbGVjdFJlbmRlcmFibGUocmVuZGVyZXJQb29sKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBfaUludmFsaWRhdGVSZW5kZXJhYmxlR2VvbWV0cmllcygpXHJcblx0e1xyXG5cdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9zdWJNZXNoZXMubGVuZ3RoO1xyXG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgbGVuOyArK2kpXHJcblx0XHRcdHRoaXMuX3N1Yk1lc2hlc1tpXS5faUludmFsaWRhdGVSZW5kZXJhYmxlR2VvbWV0cnkoKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBfcFJlZ2lzdGVyRW50aXR5KHBhcnRpdGlvbjpQYXJ0aXRpb24pXHJcblx0e1xyXG5cdFx0cGFydGl0aW9uLl9pUmVnaXN0ZXJFbnRpdHkodGhpcyk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgX3BVbnJlZ2lzdGVyRW50aXR5KHBhcnRpdGlvbjpQYXJ0aXRpb24pXHJcblx0e1xyXG5cdFx0cGFydGl0aW9uLl9pVW5yZWdpc3RlckVudGl0eSh0aGlzKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCA9IE1lc2g7Il19