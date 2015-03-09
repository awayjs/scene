var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Geometry = require("awayjs-core/lib/data/Geometry");
var GeometryEvent = require("awayjs-core/lib/events/GeometryEvent");
var AssetType = require("awayjs-core/lib/library/AssetType");
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
    return Mesh;
})(DisplayObjectContainer);
module.exports = Mesh;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9NZXNoLnRzIl0sIm5hbWVzIjpbIk1lc2giLCJNZXNoLmNvbnN0cnVjdG9yIiwiTWVzaC5hbmltYXRvciIsIk1lc2guYXNzZXRUeXBlIiwiTWVzaC5jYXN0c1NoYWRvd3MiLCJNZXNoLmdlb21ldHJ5IiwiTWVzaC5tYXRlcmlhbCIsIk1lc2guc2hhcmVBbmltYXRpb25HZW9tZXRyeSIsIk1lc2guc3ViTWVzaGVzIiwiTWVzaC51dlRyYW5zZm9ybSIsIk1lc2guYmFrZVRyYW5zZm9ybWF0aW9ucyIsIk1lc2guZGlzcG9zZSIsIk1lc2guZGlzcG9zZVdpdGhBbmltYXRvckFuZENoaWxkcmVuIiwiTWVzaC5jbG9uZSIsIk1lc2guZ2V0U3ViTWVzaEZyb21TdWJHZW9tZXRyeSIsIk1lc2guX3BVcGRhdGVCb3hCb3VuZHMiLCJNZXNoLl9wVXBkYXRlU3BoZXJlQm91bmRzIiwiTWVzaC5vbkdlb21ldHJ5Qm91bmRzSW52YWxpZCIsIk1lc2gub25TdWJHZW9tZXRyeUFkZGVkIiwiTWVzaC5vblN1Ykdlb21ldHJ5UmVtb3ZlZCIsIk1lc2guYWRkU3ViTWVzaCIsIk1lc2guX2lUZXN0Q29sbGlzaW9uIiwiTWVzaC5faUNvbGxlY3RSZW5kZXJhYmxlcyIsIk1lc2guX2lJbnZhbGlkYXRlUmVuZGVyYWJsZUdlb21ldHJpZXMiLCJNZXNoLl9wUmVnaXN0ZXJFbnRpdHkiLCJNZXNoLl9wVW5yZWdpc3RlckVudGl0eSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTyxRQUFRLFdBQWdCLCtCQUErQixDQUFDLENBQUM7QUFHaEUsSUFBTyxhQUFhLFdBQWMsc0NBQXNDLENBQUMsQ0FBQztBQUcxRSxJQUFPLFNBQVMsV0FBZSxtQ0FBbUMsQ0FBQyxDQUFDO0FBTXBFLElBQU8sVUFBVSxXQUFlLHNDQUFzQyxDQUFDLENBQUM7QUFDeEUsSUFBTyxzQkFBc0IsV0FBWSxzREFBc0QsQ0FBQyxDQUFDO0FBSWpHLElBQU8sV0FBVyxX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LGlCQUFpQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDbkNBLElBQUlBLEdBQUdBLElBQUlBLEdBQUdBLGlCQUFpQkEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDdkNBLElBQUlBLEdBQUdBLElBQUlBLEdBQUdBLGlCQUFpQkEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFFdkNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLFdBQVdBLEVBQUVBLENBQUNBLEVBQUVBLEVBQUVBLENBQUNBO2dCQUNsQ0EsT0FBT0EsR0FBR0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3RCQSxpQkFBaUJBLEdBQUdBLE9BQU9BLENBQUNBLG9CQUFvQkEsRUFBRUEsQ0FBQ0E7Z0JBQ25EQSxHQUFHQSxHQUFHQSxpQkFBaUJBLENBQUNBLE1BQU1BLENBQUNBO2dCQUUvQkEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsR0FBR0EsRUFBRUEsQ0FBQ0EsSUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7b0JBQzNCQSxDQUFDQSxHQUFHQSxpQkFBaUJBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO29CQUN6QkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0E7d0JBQ1pBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBO29CQUNWQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQTt3QkFDakJBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBO29CQUVWQSxDQUFDQSxHQUFHQSxpQkFBaUJBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO29CQUU3QkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0E7d0JBQ1pBLElBQUlBLEdBQUdBLENBQUNBLENB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QXdoQnhDO0FBRUQsQUFBYyxpQkFBTCxJQUFJLENBQUMiLCJmaWxlIjoiZW50aXRpZXMvTWVzaC5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyLvu79pbXBvcnQgR2VvbWV0cnlcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZGF0YS9HZW9tZXRyeVwiKTtcclxuaW1wb3J0IFRyaWFuZ2xlU3ViR2VvbWV0cnlcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZGF0YS9UcmlhbmdsZVN1Ykdlb21ldHJ5XCIpO1xyXG5pbXBvcnQgU3ViR2VvbWV0cnlCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZGF0YS9TdWJHZW9tZXRyeUJhc2VcIik7XHJcbmltcG9ydCBHZW9tZXRyeUV2ZW50XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL0dlb21ldHJ5RXZlbnRcIik7XHJcbmltcG9ydCBCb3hcdFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL0JveFwiKTtcclxuaW1wb3J0IFVWVHJhbnNmb3JtXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1VWVHJhbnNmb3JtXCIpO1xyXG5pbXBvcnQgQXNzZXRUeXBlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0Fzc2V0VHlwZVwiKTtcclxuXHJcbmltcG9ydCBJQW5pbWF0b3JcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2FuaW1hdG9ycy9JQW5pbWF0b3JcIik7XHJcbmltcG9ydCBEaXNwbGF5T2JqZWN0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9EaXNwbGF5T2JqZWN0XCIpO1xyXG5pbXBvcnQgSVN1Yk1lc2hcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9JU3ViTWVzaFwiKTtcclxuaW1wb3J0IElTdWJNZXNoQ2xhc3NcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0lTdWJNZXNoQ2xhc3NcIik7XHJcbmltcG9ydCBCb3VuZHNUeXBlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9ib3VuZHMvQm91bmRzVHlwZVwiKTtcclxuaW1wb3J0IERpc3BsYXlPYmplY3RDb250YWluZXJcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2NvbnRhaW5lcnMvRGlzcGxheU9iamVjdENvbnRhaW5lclwiKTtcclxuaW1wb3J0IFBhcnRpdGlvblx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcGFydGl0aW9uL1BhcnRpdGlvblwiKTtcclxuaW1wb3J0IEVudGl0eU5vZGVcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3BhcnRpdGlvbi9FbnRpdHlOb2RlXCIpO1xyXG5pbXBvcnQgSVJlbmRlcmVyUG9vbFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3Bvb2wvSVJlbmRlcmVyUG9vbFwiKTtcclxuaW1wb3J0IFN1Yk1lc2hQb29sXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wb29sL1N1Yk1lc2hQb29sXCIpO1xyXG5pbXBvcnQgSUVudGl0eVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9JRW50aXR5XCIpO1xyXG5pbXBvcnQgTWF0ZXJpYWxCYXNlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9tYXRlcmlhbHMvTWF0ZXJpYWxCYXNlXCIpO1xyXG5cclxuLyoqXHJcbiAqIE1lc2ggaXMgYW4gaW5zdGFuY2Ugb2YgYSBHZW9tZXRyeSwgYXVnbWVudGluZyBpdCB3aXRoIGEgcHJlc2VuY2UgaW4gdGhlIHNjZW5lIGdyYXBoLCBhIG1hdGVyaWFsLCBhbmQgYW4gYW5pbWF0aW9uXHJcbiAqIHN0YXRlLiBJdCBjb25zaXN0cyBvdXQgb2YgU3ViTWVzaGVzLCB3aGljaCBpbiB0dXJuIGNvcnJlc3BvbmQgdG8gU3ViR2VvbWV0cmllcy4gU3ViTWVzaGVzIGFsbG93IGRpZmZlcmVudCBwYXJ0c1xyXG4gKiBvZiB0aGUgZ2VvbWV0cnkgdG8gYmUgYXNzaWduZWQgZGlmZmVyZW50IG1hdGVyaWFscy5cclxuICovXHJcbmNsYXNzIE1lc2ggZXh0ZW5kcyBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIGltcGxlbWVudHMgSUVudGl0eVxyXG57XHJcblx0cHJpdmF0ZSBfdXZUcmFuc2Zvcm06VVZUcmFuc2Zvcm07XHJcblxyXG5cdHByaXZhdGUgX3N1Yk1lc2hlczpBcnJheTxJU3ViTWVzaD47XHJcblx0cHJpdmF0ZSBfZ2VvbWV0cnk6R2VvbWV0cnk7XHJcblx0cHJpdmF0ZSBfbWF0ZXJpYWw6TWF0ZXJpYWxCYXNlO1xyXG5cdHByaXZhdGUgX2FuaW1hdG9yOklBbmltYXRvcjtcclxuXHRwcml2YXRlIF9jYXN0c1NoYWRvd3M6Ym9vbGVhbiA9IHRydWU7XHJcblx0cHJpdmF0ZSBfc2hhcmVBbmltYXRpb25HZW9tZXRyeTpib29sZWFuID0gdHJ1ZTtcclxuXHJcblx0cHJpdmF0ZSBfb25HZW9tZXRyeUJvdW5kc0ludmFsaWREZWxlZ2F0ZTooZXZlbnQ6R2VvbWV0cnlFdmVudCkgPT4gdm9pZDtcclxuXHRwcml2YXRlIF9vblN1Ykdlb21ldHJ5QWRkZWREZWxlZ2F0ZTooZXZlbnQ6R2VvbWV0cnlFdmVudCkgPT4gdm9pZDtcclxuXHRwcml2YXRlIF9vblN1Ykdlb21ldHJ5UmVtb3ZlZERlbGVnYXRlOihldmVudDpHZW9tZXRyeUV2ZW50KSA9PiB2b2lkO1xyXG5cclxuXHQvKipcclxuXHQgKiBEZWZpbmVzIHRoZSBhbmltYXRvciBvZiB0aGUgbWVzaC4gQWN0IG9uIHRoZSBtZXNoJ3MgZ2VvbWV0cnkuICBEZWZhdWx0IHZhbHVlIGlzIDxjb2RlPm51bGw8L2NvZGU+LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgYW5pbWF0b3IoKTpJQW5pbWF0b3JcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fYW5pbWF0b3I7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IGFuaW1hdG9yKHZhbHVlOklBbmltYXRvcilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fYW5pbWF0b3IpXHJcblx0XHRcdHRoaXMuX2FuaW1hdG9yLnJlbW92ZU93bmVyKHRoaXMpO1xyXG5cclxuXHRcdHRoaXMuX2FuaW1hdG9yID0gdmFsdWU7XHJcblxyXG5cdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9zdWJNZXNoZXMubGVuZ3RoO1xyXG5cdFx0dmFyIHN1Yk1lc2g6SVN1Yk1lc2g7XHJcblxyXG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgbGVuOyArK2kpIHtcclxuXHRcdFx0c3ViTWVzaCA9IHRoaXMuX3N1Yk1lc2hlc1tpXTtcclxuXHJcblx0XHRcdC8vIGNhdXNlIG1hdGVyaWFsIHRvIGJlIHVucmVnaXN0ZXJlZCBhbmQgcmVnaXN0ZXJlZCBhZ2FpbiB0byB3b3JrIHdpdGggdGhlIG5ldyBhbmltYXRpb24gdHlwZSAoaWYgcG9zc2libGUpXHJcblx0XHRcdGlmIChzdWJNZXNoLm1hdGVyaWFsKSB7XHJcblx0XHRcdFx0c3ViTWVzaC5tYXRlcmlhbC5pUmVtb3ZlT3duZXIoc3ViTWVzaCk7XHJcblx0XHRcdFx0c3ViTWVzaC5tYXRlcmlhbC5pQWRkT3duZXIoc3ViTWVzaCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vaW52YWxpZGF0ZSBhbnkgZXhpc3RpbmcgcmVuZGVyYWJsZXMgaW4gY2FzZSB0aGV5IG5lZWQgdG8gcHVsbCBuZXcgZ2VvbWV0cnlcclxuXHRcdFx0c3ViTWVzaC5faUludmFsaWRhdGVSZW5kZXJhYmxlR2VvbWV0cnkoKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5fYW5pbWF0b3IpXHJcblx0XHRcdHRoaXMuX2FuaW1hdG9yLmFkZE93bmVyKHRoaXMpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGFzc2V0VHlwZSgpOnN0cmluZ1xyXG5cdHtcclxuXHRcdHJldHVybiBBc3NldFR5cGUuTUVTSDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluZGljYXRlcyB3aGV0aGVyIG9yIG5vdCB0aGUgTWVzaCBjYW4gY2FzdCBzaGFkb3dzLiBEZWZhdWx0IHZhbHVlIGlzIDxjb2RlPnRydWU8L2NvZGU+LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgY2FzdHNTaGFkb3dzKCk6Ym9vbGVhblxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9jYXN0c1NoYWRvd3M7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IGNhc3RzU2hhZG93cyh2YWx1ZTpib29sZWFuKVxyXG5cdHtcclxuXHRcdHRoaXMuX2Nhc3RzU2hhZG93cyA9IHZhbHVlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGdlb21ldHJ5IHVzZWQgYnkgdGhlIG1lc2ggdGhhdCBwcm92aWRlcyBpdCB3aXRoIGl0cyBzaGFwZS5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGdlb21ldHJ5KCk6R2VvbWV0cnlcclxuXHR7XHJcblx0XHRpZiAodGhpcy5faVNvdXJjZVByZWZhYilcclxuXHRcdFx0dGhpcy5faVNvdXJjZVByZWZhYi5faVZhbGlkYXRlKCk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX2dlb21ldHJ5O1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBnZW9tZXRyeSh2YWx1ZTpHZW9tZXRyeSlcclxuXHR7XHJcblx0XHR2YXIgaTpudW1iZXI7XHJcblxyXG5cdFx0aWYgKHRoaXMuX2dlb21ldHJ5KSB7XHJcblx0XHRcdHRoaXMuX2dlb21ldHJ5LnJlbW92ZUV2ZW50TGlzdGVuZXIoR2VvbWV0cnlFdmVudC5CT1VORFNfSU5WQUxJRCwgdGhpcy5fb25HZW9tZXRyeUJvdW5kc0ludmFsaWREZWxlZ2F0ZSk7XHJcblx0XHRcdHRoaXMuX2dlb21ldHJ5LnJlbW92ZUV2ZW50TGlzdGVuZXIoR2VvbWV0cnlFdmVudC5TVUJfR0VPTUVUUllfQURERUQsIHRoaXMuX29uU3ViR2VvbWV0cnlBZGRlZERlbGVnYXRlKTtcclxuXHRcdFx0dGhpcy5fZ2VvbWV0cnkucmVtb3ZlRXZlbnRMaXN0ZW5lcihHZW9tZXRyeUV2ZW50LlNVQl9HRU9NRVRSWV9SRU1PVkVELCB0aGlzLl9vblN1Ykdlb21ldHJ5UmVtb3ZlZERlbGVnYXRlKTtcclxuXHJcblx0XHRcdGZvciAoaSA9IDA7IGkgPCB0aGlzLl9zdWJNZXNoZXMubGVuZ3RoOyArK2kpXHJcblx0XHRcdFx0dGhpcy5fc3ViTWVzaGVzW2ldLmRpc3Bvc2UoKTtcclxuXHJcblx0XHRcdHRoaXMuX3N1Yk1lc2hlcy5sZW5ndGggPSAwO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX2dlb21ldHJ5ID0gdmFsdWU7XHJcblxyXG5cdFx0aWYgKHRoaXMuX2dlb21ldHJ5KSB7XHJcblxyXG5cdFx0XHR0aGlzLl9nZW9tZXRyeS5hZGRFdmVudExpc3RlbmVyKEdlb21ldHJ5RXZlbnQuQk9VTkRTX0lOVkFMSUQsIHRoaXMuX29uR2VvbWV0cnlCb3VuZHNJbnZhbGlkRGVsZWdhdGUpO1xyXG5cdFx0XHR0aGlzLl9nZW9tZXRyeS5hZGRFdmVudExpc3RlbmVyKEdlb21ldHJ5RXZlbnQuU1VCX0dFT01FVFJZX0FEREVELCB0aGlzLl9vblN1Ykdlb21ldHJ5QWRkZWREZWxlZ2F0ZSk7XHJcblx0XHRcdHRoaXMuX2dlb21ldHJ5LmFkZEV2ZW50TGlzdGVuZXIoR2VvbWV0cnlFdmVudC5TVUJfR0VPTUVUUllfUkVNT1ZFRCwgdGhpcy5fb25TdWJHZW9tZXRyeVJlbW92ZWREZWxlZ2F0ZSk7XHJcblxyXG5cdFx0XHR2YXIgc3ViR2VvbXM6QXJyYXk8U3ViR2VvbWV0cnlCYXNlPiA9IHRoaXMuX2dlb21ldHJ5LnN1Ykdlb21ldHJpZXM7XHJcblxyXG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgc3ViR2VvbXMubGVuZ3RoOyArK2kpXHJcblx0XHRcdFx0dGhpcy5hZGRTdWJNZXNoKHN1Ykdlb21zW2ldKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBtYXRlcmlhbCB3aXRoIHdoaWNoIHRvIHJlbmRlciB0aGUgTWVzaC5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IG1hdGVyaWFsKCk6TWF0ZXJpYWxCYXNlXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX21hdGVyaWFsO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBtYXRlcmlhbCh2YWx1ZTpNYXRlcmlhbEJhc2UpXHJcblx0e1xyXG5cdFx0aWYgKHZhbHVlID09IHRoaXMuX21hdGVyaWFsKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dmFyIGk6bnVtYmVyO1xyXG5cdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9zdWJNZXNoZXMubGVuZ3RoO1xyXG5cdFx0dmFyIHN1Yk1lc2g6SVN1Yk1lc2g7XHJcblxyXG5cdFx0Zm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKVxyXG5cdFx0XHRpZiAodGhpcy5fbWF0ZXJpYWwgJiYgKHN1Yk1lc2ggPSB0aGlzLl9zdWJNZXNoZXNbaV0pLm1hdGVyaWFsID09IHRoaXMuX21hdGVyaWFsKVxyXG5cdFx0XHRcdHRoaXMuX21hdGVyaWFsLmlSZW1vdmVPd25lcihzdWJNZXNoKTtcclxuXHJcblx0XHR0aGlzLl9tYXRlcmlhbCA9IHZhbHVlO1xyXG5cclxuXHRcdGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKylcclxuXHRcdFx0aWYgKHRoaXMuX21hdGVyaWFsICYmIChzdWJNZXNoID0gdGhpcy5fc3ViTWVzaGVzW2ldKS5tYXRlcmlhbCA9PSB0aGlzLl9tYXRlcmlhbClcclxuXHRcdFx0XHR0aGlzLl9tYXRlcmlhbC5pQWRkT3duZXIoc3ViTWVzaCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJbmRpY2F0ZXMgd2hldGhlciBvciBub3QgdGhlIG1lc2ggc2hhcmUgdGhlIHNhbWUgYW5pbWF0aW9uIGdlb21ldHJ5LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgc2hhcmVBbmltYXRpb25HZW9tZXRyeSgpOmJvb2xlYW5cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fc2hhcmVBbmltYXRpb25HZW9tZXRyeTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgc2hhcmVBbmltYXRpb25HZW9tZXRyeSh2YWx1ZTpib29sZWFuKVxyXG5cdHtcclxuXHRcdHRoaXMuX3NoYXJlQW5pbWF0aW9uR2VvbWV0cnkgPSB2YWx1ZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBTdWJNZXNoZXMgb3V0IG9mIHdoaWNoIHRoZSBNZXNoIGNvbnNpc3RzLiBFdmVyeSBTdWJNZXNoIGNhbiBiZSBhc3NpZ25lZCBhIG1hdGVyaWFsIHRvIG92ZXJyaWRlIHRoZSBNZXNoJ3NcclxuXHQgKiBtYXRlcmlhbC5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHN1Yk1lc2hlcygpOkFycmF5PElTdWJNZXNoPlxyXG5cdHtcclxuXHRcdC8vIFNpbmNlIHRoaXMgZ2V0dGVyIGlzIGludm9rZWQgZXZlcnkgaXRlcmF0aW9uIG9mIHRoZSByZW5kZXIgbG9vcCwgYW5kXHJcblx0XHQvLyB0aGUgcHJlZmFiIGNvbnN0cnVjdCBjb3VsZCBhZmZlY3QgdGhlIHN1Yi1tZXNoZXMsIHRoZSBwcmVmYWIgaXNcclxuXHRcdC8vIHZhbGlkYXRlZCBoZXJlIHRvIGdpdmUgaXQgYSBjaGFuY2UgdG8gcmVidWlsZC5cclxuXHRcdGlmICh0aGlzLl9pU291cmNlUHJlZmFiKVxyXG5cdFx0XHR0aGlzLl9pU291cmNlUHJlZmFiLl9pVmFsaWRhdGUoKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fc3ViTWVzaGVzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHV2VHJhbnNmb3JtKCk6VVZUcmFuc2Zvcm1cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fdXZUcmFuc2Zvcm07XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHV2VHJhbnNmb3JtKHZhbHVlOlVWVHJhbnNmb3JtKVxyXG5cdHtcclxuXHRcdHRoaXMuX3V2VHJhbnNmb3JtID0gdmFsdWU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGUgYSBuZXcgTWVzaCBvYmplY3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gZ2VvbWV0cnkgICAgICAgICAgICAgICAgICAgIFRoZSBnZW9tZXRyeSB1c2VkIGJ5IHRoZSBtZXNoIHRoYXQgcHJvdmlkZXMgaXQgd2l0aCBpdHMgc2hhcGUuXHJcblx0ICogQHBhcmFtIG1hdGVyaWFsICAgIFtvcHRpb25hbF0gICAgICAgIFRoZSBtYXRlcmlhbCB3aXRoIHdoaWNoIHRvIHJlbmRlciB0aGUgTWVzaC5cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcihnZW9tZXRyeTpHZW9tZXRyeSwgbWF0ZXJpYWw6TWF0ZXJpYWxCYXNlID0gbnVsbClcclxuXHR7XHJcblx0XHRzdXBlcigpO1xyXG5cclxuXHRcdHRoaXMuX3BJc0VudGl0eSA9IHRydWU7XHJcblxyXG5cdFx0dGhpcy5fc3ViTWVzaGVzID0gbmV3IEFycmF5PElTdWJNZXNoPigpO1xyXG5cclxuXHRcdHRoaXMuX29uR2VvbWV0cnlCb3VuZHNJbnZhbGlkRGVsZWdhdGUgPSAoZXZlbnQ6R2VvbWV0cnlFdmVudCkgPT4gdGhpcy5vbkdlb21ldHJ5Qm91bmRzSW52YWxpZChldmVudCk7XHJcblx0XHR0aGlzLl9vblN1Ykdlb21ldHJ5QWRkZWREZWxlZ2F0ZSA9IChldmVudDpHZW9tZXRyeUV2ZW50KSA9PiB0aGlzLm9uU3ViR2VvbWV0cnlBZGRlZChldmVudCk7XHJcblx0XHR0aGlzLl9vblN1Ykdlb21ldHJ5UmVtb3ZlZERlbGVnYXRlID0gKGV2ZW50Okdlb21ldHJ5RXZlbnQpID0+IHRoaXMub25TdWJHZW9tZXRyeVJlbW92ZWQoZXZlbnQpO1xyXG5cclxuXHRcdC8vdGhpcyBzaG91bGQgbmV2ZXIgaGFwcGVuLCBidXQgaWYgcGVvcGxlIGluc2lzdCBvbiB0cnlpbmcgdG8gY3JlYXRlIHRoZWlyIG1lc2hlcyBiZWZvcmUgdGhleSBoYXZlIGdlb21ldHJ5IHRvIGZpbGwgaXQsIGl0IGJlY29tZXMgbmVjZXNzYXJ5XHJcblx0XHR0aGlzLmdlb21ldHJ5ID0gZ2VvbWV0cnkgfHwgbmV3IEdlb21ldHJ5KCk7XHJcblxyXG5cdFx0dGhpcy5tYXRlcmlhbCA9IG1hdGVyaWFsO1xyXG5cclxuXHRcdC8vZGVmYXVsdCBib3VuZHMgdHlwZVxyXG5cdFx0dGhpcy5fYm91bmRzVHlwZSA9IEJvdW5kc1R5cGUuQVhJU19BTElHTkVEX0JPWDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGJha2VUcmFuc2Zvcm1hdGlvbnMoKVxyXG5cdHtcclxuXHRcdHRoaXMuZ2VvbWV0cnkuYXBwbHlUcmFuc2Zvcm1hdGlvbih0aGlzLl9pTWF0cml4M0QpO1xyXG5cdFx0dGhpcy5faU1hdHJpeDNELmlkZW50aXR5KCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAaW5oZXJpdERvY1xyXG5cdCAqL1xyXG5cdHB1YmxpYyBkaXNwb3NlKClcclxuXHR7XHJcblx0XHRzdXBlci5kaXNwb3NlKCk7XHJcblxyXG5cdFx0dGhpcy5tYXRlcmlhbCA9IG51bGw7XHJcblx0XHR0aGlzLmdlb21ldHJ5ID0gbnVsbDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERpc3Bvc2VzIG1lc2ggaW5jbHVkaW5nIHRoZSBhbmltYXRvciBhbmQgY2hpbGRyZW4uIFRoaXMgaXMgYSBtZXJlbHkgYSBjb252ZW5pZW5jZSBtZXRob2QuXHJcblx0ICogQHJldHVyblxyXG5cdCAqL1xyXG5cdHB1YmxpYyBkaXNwb3NlV2l0aEFuaW1hdG9yQW5kQ2hpbGRyZW4oKVxyXG5cdHtcclxuXHRcdHRoaXMuZGlzcG9zZVdpdGhDaGlsZHJlbigpO1xyXG5cclxuXHRcdCBpZiAodGhpcy5fYW5pbWF0b3IpXHJcblx0XHRcdHRoaXMuX2FuaW1hdG9yLmRpc3Bvc2UoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENsb25lcyB0aGlzIE1lc2ggaW5zdGFuY2UgYWxvbmcgd2l0aCBhbGwgaXQncyBjaGlsZHJlbiwgd2hpbGUgcmUtdXNpbmcgdGhlIHNhbWVcclxuXHQgKiBtYXRlcmlhbCwgZ2VvbWV0cnkgYW5kIGFuaW1hdGlvbiBzZXQuIFRoZSByZXR1cm5lZCByZXN1bHQgd2lsbCBiZSBhIGNvcHkgb2YgdGhpcyBtZXNoLFxyXG5cdCAqIGNvbnRhaW5pbmcgY29waWVzIG9mIGFsbCBvZiBpdCdzIGNoaWxkcmVuLlxyXG5cdCAqXHJcblx0ICogUHJvcGVydGllcyB0aGF0IGFyZSByZS11c2VkIChpLmUuIG5vdCBjbG9uZWQpIGJ5IHRoZSBuZXcgY29weSBpbmNsdWRlIG5hbWUsXHJcblx0ICogZ2VvbWV0cnksIGFuZCBtYXRlcmlhbC4gUHJvcGVydGllcyB0aGF0IGFyZSBjbG9uZWQgb3IgY3JlYXRlZCBhbmV3IGZvciB0aGUgY29weVxyXG5cdCAqIGluY2x1ZGUgc3ViTWVzaGVzLCBjaGlsZHJlbiBvZiB0aGUgbWVzaCwgYW5kIHRoZSBhbmltYXRvci5cclxuXHQgKlxyXG5cdCAqIElmIHlvdSB3YW50IHRvIGNvcHkganVzdCB0aGUgbWVzaCwgcmV1c2luZyBpdCdzIGdlb21ldHJ5IGFuZCBtYXRlcmlhbCB3aGlsZSBub3RcclxuXHQgKiBjbG9uaW5nIGl0J3MgY2hpbGRyZW4sIHRoZSBzaW1wbGVzdCB3YXkgaXMgdG8gY3JlYXRlIGEgbmV3IG1lc2ggbWFudWFsbHk6XHJcblx0ICpcclxuXHQgKiA8Y29kZT5cclxuXHQgKiB2YXIgY2xvbmUgOiBNZXNoID0gbmV3IE1lc2gob3JpZ2luYWwuZ2VvbWV0cnksIG9yaWdpbmFsLm1hdGVyaWFsKTtcclxuXHQgKiA8L2NvZGU+XHJcblx0ICovXHJcblx0cHVibGljIGNsb25lKCk6RGlzcGxheU9iamVjdFxyXG5cdHtcclxuXHRcdHZhciBjbG9uZTpNZXNoID0gbmV3IE1lc2godGhpcy5fZ2VvbWV0cnksIHRoaXMuX21hdGVyaWFsKTtcclxuXHJcblx0XHRjbG9uZS5faU1hdHJpeDNEID0gdGhpcy5faU1hdHJpeDNEO1xyXG5cdFx0Y2xvbmUucGl2b3QgPSB0aGlzLnBpdm90O1xyXG5cdFx0Y2xvbmUucGFydGl0aW9uID0gdGhpcy5wYXJ0aXRpb247XHJcblx0XHRjbG9uZS5ib3VuZHNUeXBlID0gdGhpcy5ib3VuZHNUeXBlO1xyXG5cclxuXHJcblx0XHRjbG9uZS5uYW1lID0gdGhpcy5uYW1lO1xyXG5cdFx0Y2xvbmUuY2FzdHNTaGFkb3dzID0gdGhpcy5jYXN0c1NoYWRvd3M7XHJcblx0XHRjbG9uZS5zaGFyZUFuaW1hdGlvbkdlb21ldHJ5ID0gdGhpcy5zaGFyZUFuaW1hdGlvbkdlb21ldHJ5O1xyXG5cdFx0Y2xvbmUubW91c2VFbmFibGVkID0gdGhpcy5tb3VzZUVuYWJsZWQ7XHJcblx0XHRjbG9uZS5tb3VzZUNoaWxkcmVuID0gdGhpcy5tb3VzZUNoaWxkcmVuO1xyXG5cdFx0Ly90aGlzIGlzIG9mIGNvdXJzZSBubyBwcm9wZXIgY2xvbmluZ1xyXG5cdFx0Ly9tYXliZSB1c2UgdGhpcyBpbnN0ZWFkPzogaHR0cDovL2Jsb2cuYW5vdGhlci1kLW1lbnRpb24ucm8vcHJvZ3JhbW1pbmcvaG93LXRvLWNsb25lLWR1cGxpY2F0ZS1hbi1vYmplY3QtaW4tYWN0aW9uc2NyaXB0LTMvXHJcblx0XHRjbG9uZS5leHRyYSA9IHRoaXMuZXh0cmE7XHJcblxyXG5cdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9zdWJNZXNoZXMubGVuZ3RoO1xyXG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgbGVuOyArK2kpXHJcblx0XHRcdGNsb25lLl9zdWJNZXNoZXNbaV0ubWF0ZXJpYWwgPSB0aGlzLl9zdWJNZXNoZXNbaV0uX2lHZXRFeHBsaWNpdE1hdGVyaWFsKCk7XHJcblxyXG5cclxuXHRcdGxlbiA9IHRoaXMubnVtQ2hpbGRyZW47XHJcblx0XHR2YXIgb2JqOmFueTtcclxuXHJcblx0XHRmb3IgKGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcclxuXHRcdFx0b2JqID0gdGhpcy5nZXRDaGlsZEF0KGkpLmNsb25lKCk7XHJcblx0XHRcdGNsb25lLmFkZENoaWxkKDxEaXNwbGF5T2JqZWN0Q29udGFpbmVyPiBvYmopO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLl9hbmltYXRvcilcclxuXHRcdFx0Y2xvbmUuYW5pbWF0b3IgPSB0aGlzLl9hbmltYXRvci5jbG9uZSgpO1xyXG5cclxuXHRcdHJldHVybiBjbG9uZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIC8vVE9ET1xyXG5cdCAqXHJcblx0ICogQHBhcmFtIHN1Ykdlb21ldHJ5XHJcblx0ICogQHJldHVybnMge1N1Yk1lc2hCYXNlfVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXRTdWJNZXNoRnJvbVN1Ykdlb21ldHJ5KHN1Ykdlb21ldHJ5OlN1Ykdlb21ldHJ5QmFzZSk6SVN1Yk1lc2hcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fc3ViTWVzaGVzW3RoaXMuX2dlb21ldHJ5LnN1Ykdlb21ldHJpZXMuaW5kZXhPZihzdWJHZW9tZXRyeSldO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogLy9UT0RPXHJcblx0ICpcclxuXHQgKiBAcHJvdGVjdGVkXHJcblx0ICovXHJcblx0cHVibGljIF9wVXBkYXRlQm94Qm91bmRzKClcclxuXHR7XHJcblx0XHRzdXBlci5fcFVwZGF0ZUJveEJvdW5kcygpO1xyXG5cclxuXHRcdHZhciBpOm51bWJlciwgajpudW1iZXIsIHA6bnVtYmVyLCBsZW46bnVtYmVyO1xyXG5cdFx0dmFyIHN1Ykdlb21zOkFycmF5PFN1Ykdlb21ldHJ5QmFzZT4gPSB0aGlzLl9nZW9tZXRyeS5zdWJHZW9tZXRyaWVzO1xyXG5cdFx0dmFyIHN1Ykdlb206U3ViR2VvbWV0cnlCYXNlO1xyXG5cdFx0dmFyIGJvdW5kaW5nUG9zaXRpb25zOkFycmF5PG51bWJlcj47XHJcblx0XHR2YXIgbnVtU3ViR2VvbXM6bnVtYmVyID0gc3ViR2VvbXMubGVuZ3RoO1xyXG5cdFx0dmFyIG1pblg6bnVtYmVyLCBtaW5ZOm51bWJlciwgbWluWjpudW1iZXI7XHJcblx0XHR2YXIgbWF4WDpudW1iZXIsIG1heFk6bnVtYmVyLCBtYXhaOm51bWJlcjtcclxuXHJcblx0XHRpZiAobnVtU3ViR2VvbXMgPiAwKSB7XHJcblx0XHRcdGkgPSAwO1xyXG5cdFx0XHRzdWJHZW9tID0gc3ViR2VvbXNbMF07XHJcblx0XHRcdGJvdW5kaW5nUG9zaXRpb25zID0gc3ViR2VvbS5nZXRCb3VuZGluZ1Bvc2l0aW9ucygpO1xyXG5cdFx0XHRtaW5YID0gbWF4WCA9IGJvdW5kaW5nUG9zaXRpb25zW2ldO1xyXG5cdFx0XHRtaW5ZID0gbWF4WSA9IGJvdW5kaW5nUG9zaXRpb25zW2kgKyAxXTtcclxuXHRcdFx0bWluWiA9IG1heFogPSBib3VuZGluZ1Bvc2l0aW9uc1tpICsgMl07XHJcblxyXG5cdFx0XHRmb3IgKGogPSAwOyBqIDwgbnVtU3ViR2VvbXM7IGorKykge1xyXG5cdFx0XHRcdHN1Ykdlb20gPSBzdWJHZW9tc1tqXTtcclxuXHRcdFx0XHRib3VuZGluZ1Bvc2l0aW9ucyA9IHN1Ykdlb20uZ2V0Qm91bmRpbmdQb3NpdGlvbnMoKTtcclxuXHRcdFx0XHRsZW4gPSBib3VuZGluZ1Bvc2l0aW9ucy5sZW5ndGg7XHJcblxyXG5cdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBsZW47IGkrPTMpIHtcclxuXHRcdFx0XHRcdHAgPSBib3VuZGluZ1Bvc2l0aW9uc1tpXTtcclxuXHRcdFx0XHRcdGlmIChwIDwgbWluWClcclxuXHRcdFx0XHRcdFx0bWluWCA9IHA7XHJcblx0XHRcdFx0XHRlbHNlIGlmIChwID4gbWF4WClcclxuXHRcdFx0XHRcdFx0bWF4WCA9IHA7XHJcblxyXG5cdFx0XHRcdFx0cCA9IGJvdW5kaW5nUG9zaXRpb25zW2kgKyAxXTtcclxuXHJcblx0XHRcdFx0XHRpZiAocCA8IG1pblkpXHJcblx0XHRcdFx0XHRcdG1pblkgPSBwO1xyXG5cdFx0XHRcdFx0ZWxzZSBpZiAocCA+IG1heFkpXHJcblx0XHRcdFx0XHRcdG1heFkgPSBwO1xyXG5cclxuXHRcdFx0XHRcdHAgPSBib3VuZGluZ1Bvc2l0aW9uc1tpICsgMl07XHJcblxyXG5cdFx0XHRcdFx0aWYgKHAgPCBtaW5aKVxyXG5cdFx0XHRcdFx0XHRtaW5aID0gcDtcclxuXHRcdFx0XHRcdGVsc2UgaWYgKHAgPiBtYXhaKVxyXG5cdFx0XHRcdFx0XHRtYXhaID0gcDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuX3BCb3hCb3VuZHMud2lkdGggPSBtYXhYIC0gKHRoaXMuX3BCb3hCb3VuZHMueCA9IG1pblgpO1xyXG5cdFx0XHR0aGlzLl9wQm94Qm91bmRzLmhlaWdodCA9IG1heFkgLSAodGhpcy5fcEJveEJvdW5kcy55ID0gbWluWSk7XHJcblx0XHRcdHRoaXMuX3BCb3hCb3VuZHMuZGVwdGggPSBtYXhaIC0gKHRoaXMuX3BCb3hCb3VuZHMueiA9IG1pblopO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5fcEJveEJvdW5kcy5zZXRFbXB0eSgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblxyXG5cdHB1YmxpYyBfcFVwZGF0ZVNwaGVyZUJvdW5kcygpXHJcblx0e1xyXG5cdFx0c3VwZXIuX3BVcGRhdGVTcGhlcmVCb3VuZHMoKTtcclxuXHJcblx0XHR2YXIgYm94OkJveCA9IHRoaXMuZ2V0Qm94KCk7XHJcblx0XHR2YXIgY2VudGVyWDpudW1iZXIgPSBib3gueCArIGJveC53aWR0aC8yO1xyXG5cdFx0dmFyIGNlbnRlclk6bnVtYmVyID0gYm94LnkgKyBib3guaGVpZ2h0LzI7XHJcblx0XHR2YXIgY2VudGVyWjpudW1iZXIgPSBib3gueiArIGJveC5kZXB0aC8yO1xyXG5cclxuXHRcdHZhciBpOm51bWJlciwgajpudW1iZXIsIHA6bnVtYmVyLCBsZW46bnVtYmVyO1xyXG5cdFx0dmFyIHN1Ykdlb21zOkFycmF5PFN1Ykdlb21ldHJ5QmFzZT4gPSB0aGlzLl9nZW9tZXRyeS5zdWJHZW9tZXRyaWVzO1xyXG5cdFx0dmFyIHN1Ykdlb206U3ViR2VvbWV0cnlCYXNlO1xyXG5cdFx0dmFyIGJvdW5kaW5nUG9zaXRpb25zOkFycmF5PG51bWJlcj47XHJcblx0XHR2YXIgbnVtU3ViR2VvbXM6bnVtYmVyID0gc3ViR2VvbXMubGVuZ3RoO1xyXG5cdFx0dmFyIG1heFJhZGl1c1NxdWFyZWQ6bnVtYmVyID0gMDtcclxuXHRcdHZhciByYWRpdXNTcXVhcmVkOm51bWJlcjtcclxuXHRcdHZhciBkaXN0YW5jZVg6bnVtYmVyO1xyXG5cdFx0dmFyIGRpc3RhbmNlWTpudW1iZXI7XHJcblx0XHR2YXIgZGlzdGFuY2VaOm51bWJlcjtcclxuXHJcblx0XHRpZiAobnVtU3ViR2VvbXMgPiAwKSB7XHJcblx0XHRcdGkgPSAwO1xyXG5cdFx0XHRzdWJHZW9tID0gc3ViR2VvbXNbMF07XHJcblx0XHRcdGJvdW5kaW5nUG9zaXRpb25zID0gc3ViR2VvbS5nZXRCb3VuZGluZ1Bvc2l0aW9ucygpO1xyXG5cdFx0XHRmb3IgKGogPSAwOyBqIDwgbnVtU3ViR2VvbXM7IGorKykge1xyXG5cdFx0XHRcdHN1Ykdlb20gPSBzdWJHZW9tc1tqXTtcclxuXHRcdFx0XHRib3VuZGluZ1Bvc2l0aW9ucyA9IHN1Ykdlb20uZ2V0Qm91bmRpbmdQb3NpdGlvbnMoKTtcclxuXHRcdFx0XHRsZW4gPSBib3VuZGluZ1Bvc2l0aW9ucy5sZW5ndGg7XHJcblxyXG5cdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBsZW47IGkgKz0gMykge1xyXG5cdFx0XHRcdFx0ZGlzdGFuY2VYID0gYm91bmRpbmdQb3NpdGlvbnNbaV0gLSBjZW50ZXJYO1xyXG5cdFx0XHRcdFx0ZGlzdGFuY2VZID0gYm91bmRpbmdQb3NpdGlvbnNbaSArIDFdIC0gY2VudGVyWTtcclxuXHRcdFx0XHRcdGRpc3RhbmNlWiA9IGJvdW5kaW5nUG9zaXRpb25zW2kgKyAyXSAtIGNlbnRlclo7XHJcblx0XHRcdFx0XHRyYWRpdXNTcXVhcmVkID0gZGlzdGFuY2VYKmRpc3RhbmNlWCArIGRpc3RhbmNlWSpkaXN0YW5jZVkgKyBkaXN0YW5jZVoqZGlzdGFuY2VaO1xyXG5cclxuXHRcdFx0XHRcdGlmIChtYXhSYWRpdXNTcXVhcmVkIDwgcmFkaXVzU3F1YXJlZClcclxuXHRcdFx0XHRcdFx0bWF4UmFkaXVzU3F1YXJlZCA9IHJhZGl1c1NxdWFyZWQ7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5fcFNwaGVyZUJvdW5kcy54ID0gY2VudGVyWDtcclxuXHRcdHRoaXMuX3BTcGhlcmVCb3VuZHMueSA9IGNlbnRlclk7XHJcblx0XHR0aGlzLl9wU3BoZXJlQm91bmRzLnogPSBjZW50ZXJaO1xyXG5cdFx0dGhpcy5fcFNwaGVyZUJvdW5kcy5yYWRpdXMgPSBNYXRoLnNxcnQobWF4UmFkaXVzU3F1YXJlZCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiAvL1RPRE9cclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBvbkdlb21ldHJ5Qm91bmRzSW52YWxpZChldmVudDpHZW9tZXRyeUV2ZW50KVxyXG5cdHtcclxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlQm91bmRzKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDYWxsZWQgd2hlbiBhIFN1Ykdlb21ldHJ5IHdhcyBhZGRlZCB0byB0aGUgR2VvbWV0cnkuXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgb25TdWJHZW9tZXRyeUFkZGVkKGV2ZW50Okdlb21ldHJ5RXZlbnQpXHJcblx0e1xyXG5cdFx0dGhpcy5hZGRTdWJNZXNoKGV2ZW50LnN1Ykdlb21ldHJ5KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENhbGxlZCB3aGVuIGEgU3ViR2VvbWV0cnkgd2FzIHJlbW92ZWQgZnJvbSB0aGUgR2VvbWV0cnkuXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgb25TdWJHZW9tZXRyeVJlbW92ZWQoZXZlbnQ6R2VvbWV0cnlFdmVudClcclxuXHR7XHJcblx0XHR2YXIgc3ViTWVzaDpJU3ViTWVzaDtcclxuXHRcdHZhciBzdWJHZW9tOlN1Ykdlb21ldHJ5QmFzZSA9IGV2ZW50LnN1Ykdlb21ldHJ5O1xyXG5cdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9zdWJNZXNoZXMubGVuZ3RoO1xyXG5cdFx0dmFyIGk6bnVtYmVyO1xyXG5cclxuXHRcdC8vIEltcG9ydGFudCEgVGhpcyBoYXMgdG8gYmUgZG9uZSBoZXJlLCBhbmQgbm90IGRlbGF5ZWQgdW50aWwgdGhlXHJcblx0XHQvLyBuZXh0IHJlbmRlciBsb29wLCBzaW5jZSB0aGlzIG1heSBiZSBjYXVzZWQgYnkgdGhlIGdlb21ldHJ5IGJlaW5nXHJcblx0XHQvLyByZWJ1aWx0IElOIFRIRSBSRU5ERVIgTE9PUC4gSW52YWxpZGF0aW5nIGFuZCB3YWl0aW5nIHdpbGwgZGVsYXlcclxuXHRcdC8vIGl0IHVudGlsIHRoZSBORVhUIFJFTkRFUiBGUkFNRSB3aGljaCBpcyBwcm9iYWJseSBub3QgZGVzaXJhYmxlLlxyXG5cdFx0Zm9yIChpID0gMDsgaSA8IGxlbjsgKytpKSB7XHJcblxyXG5cdFx0XHRzdWJNZXNoID0gdGhpcy5fc3ViTWVzaGVzW2ldO1xyXG5cclxuXHRcdFx0aWYgKHN1Yk1lc2guc3ViR2VvbWV0cnkgPT0gc3ViR2VvbSkge1xyXG5cdFx0XHRcdHN1Yk1lc2guZGlzcG9zZSgpO1xyXG5cclxuXHRcdFx0XHR0aGlzLl9zdWJNZXNoZXMuc3BsaWNlKGksIDEpO1xyXG5cclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC0tbGVuO1xyXG5cdFx0Zm9yICg7IGkgPCBsZW47ICsraSlcclxuXHRcdFx0dGhpcy5fc3ViTWVzaGVzW2ldLl9pSW5kZXggPSBpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBhIFN1Yk1lc2hCYXNlIHdyYXBwaW5nIGEgU3ViR2VvbWV0cnkuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3ViR2VvbWV0cnlcclxuXHQgKi9cclxuXHRwcml2YXRlIGFkZFN1Yk1lc2goc3ViR2VvbWV0cnk6U3ViR2VvbWV0cnlCYXNlKVxyXG5cdHtcclxuXHRcdHZhciBTdWJNZXNoQ2xhc3M6SVN1Yk1lc2hDbGFzcyA9IFN1Yk1lc2hQb29sLmdldFN1Yk1lc2hDbGFzcyhzdWJHZW9tZXRyeSk7XHJcblxyXG5cdFx0dmFyIHN1Yk1lc2g6SVN1Yk1lc2ggPSBuZXcgU3ViTWVzaENsYXNzKHN1Ykdlb21ldHJ5LCB0aGlzLCBudWxsKTtcclxuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fc3ViTWVzaGVzLmxlbmd0aDtcclxuXHJcblx0XHRzdWJNZXNoLl9pSW5kZXggPSBsZW47XHJcblxyXG5cdFx0dGhpcy5fc3ViTWVzaGVzW2xlbl0gPSBzdWJNZXNoO1xyXG5cclxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlQm91bmRzKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiAvL1RPRE9cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzaG9ydGVzdENvbGxpc2lvbkRpc3RhbmNlXHJcblx0ICogQHBhcmFtIGZpbmRDbG9zZXN0XHJcblx0ICogQHJldHVybnMge2Jvb2xlYW59XHJcblx0ICpcclxuXHQgKiBAaW50ZXJuYWxcclxuXHQgKi9cclxuXHRwdWJsaWMgX2lUZXN0Q29sbGlzaW9uKHNob3J0ZXN0Q29sbGlzaW9uRGlzdGFuY2U6bnVtYmVyLCBmaW5kQ2xvc2VzdDpib29sZWFuKTpib29sZWFuXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BQaWNraW5nQ29sbGlkZXIudGVzdE1lc2hDb2xsaXNpb24odGhpcywgdGhpcy5fcFBpY2tpbmdDb2xsaXNpb25WTywgc2hvcnRlc3RDb2xsaXNpb25EaXN0YW5jZSwgZmluZENsb3Nlc3QpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gcmVuZGVyZXJcclxuXHQgKlxyXG5cdCAqIEBpbnRlcm5hbFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBfaUNvbGxlY3RSZW5kZXJhYmxlcyhyZW5kZXJlclBvb2w6SVJlbmRlcmVyUG9vbClcclxuXHR7XHJcblx0XHQvLyBTaW5jZSB0aGlzIGdldHRlciBpcyBpbnZva2VkIGV2ZXJ5IGl0ZXJhdGlvbiBvZiB0aGUgcmVuZGVyIGxvb3AsIGFuZFxyXG5cdFx0Ly8gdGhlIHByZWZhYiBjb25zdHJ1Y3QgY291bGQgYWZmZWN0IHRoZSBzdWItbWVzaGVzLCB0aGUgcHJlZmFiIGlzXHJcblx0XHQvLyB2YWxpZGF0ZWQgaGVyZSB0byBnaXZlIGl0IGEgY2hhbmNlIHRvIHJlYnVpbGQuXHJcblx0XHRpZiAodGhpcy5faVNvdXJjZVByZWZhYilcclxuXHRcdFx0dGhpcy5faVNvdXJjZVByZWZhYi5faVZhbGlkYXRlKCk7XHJcblxyXG5cdFx0dmFyIGxlbjpudW1iZXIgLyp1aW50Ki8gPSB0aGlzLl9zdWJNZXNoZXMubGVuZ3RoO1xyXG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgLyp1aW50Ki8gPSAwOyBpIDwgbGVuOyBpKyspXHJcblx0XHRcdHRoaXMuX3N1Yk1lc2hlc1tpXS5faUNvbGxlY3RSZW5kZXJhYmxlKHJlbmRlcmVyUG9vbCk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgX2lJbnZhbGlkYXRlUmVuZGVyYWJsZUdlb21ldHJpZXMoKVxyXG5cdHtcclxuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fc3ViTWVzaGVzLmxlbmd0aDtcclxuXHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IGxlbjsgKytpKVxyXG5cdFx0XHR0aGlzLl9zdWJNZXNoZXNbaV0uX2lJbnZhbGlkYXRlUmVuZGVyYWJsZUdlb21ldHJ5KCk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgX3BSZWdpc3RlckVudGl0eShwYXJ0aXRpb246UGFydGl0aW9uKVxyXG5cdHtcclxuXHRcdHBhcnRpdGlvbi5faVJlZ2lzdGVyRW50aXR5KHRoaXMpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIF9wVW5yZWdpc3RlckVudGl0eShwYXJ0aXRpb246UGFydGl0aW9uKVxyXG5cdHtcclxuXHRcdHBhcnRpdGlvbi5faVVucmVnaXN0ZXJFbnRpdHkodGhpcyk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgPSBNZXNoOyJdfQ==