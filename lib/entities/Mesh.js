var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AssetType = require("awayjs-core/lib/library/AssetType");
var Geometry = require("awayjs-display/lib/base/Geometry");
var BoundsType = require("awayjs-display/lib/bounds/BoundsType");
var DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
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
        var SubMeshClass = subGeometry.subMeshClass;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9NZXNoLnRzIl0sIm5hbWVzIjpbIk1lc2giLCJNZXNoLmNvbnN0cnVjdG9yIiwiTWVzaC5hbmltYXRvciIsIk1lc2guYXNzZXRUeXBlIiwiTWVzaC5jYXN0c1NoYWRvd3MiLCJNZXNoLmdlb21ldHJ5IiwiTWVzaC5tYXRlcmlhbCIsIk1lc2guc2hhcmVBbmltYXRpb25HZW9tZXRyeSIsIk1lc2guc3ViTWVzaGVzIiwiTWVzaC51dlRyYW5zZm9ybSIsIk1lc2guYmFrZVRyYW5zZm9ybWF0aW9ucyIsIk1lc2guZGlzcG9zZSIsIk1lc2guZGlzcG9zZVdpdGhBbmltYXRvckFuZENoaWxkcmVuIiwiTWVzaC5jbG9uZSIsIk1lc2guZ2V0U3ViTWVzaEZyb21TdWJHZW9tZXRyeSIsIk1lc2guX3BVcGRhdGVCb3hCb3VuZHMiLCJNZXNoLl9wVXBkYXRlU3BoZXJlQm91bmRzIiwiTWVzaC5vbkdlb21ldHJ5Qm91bmRzSW52YWxpZCIsIk1lc2gub25TdWJHZW9tZXRyeUFkZGVkIiwiTWVzaC5vblN1Ykdlb21ldHJ5UmVtb3ZlZCIsIk1lc2guYWRkU3ViTWVzaCIsIk1lc2guX2lUZXN0Q29sbGlzaW9uIiwiTWVzaC5faUNvbGxlY3RSZW5kZXJhYmxlcyIsIk1lc2guX2lJbnZhbGlkYXRlUmVuZGVyYWJsZUdlb21ldHJpZXMiLCJNZXNoLl9wUmVnaXN0ZXJFbnRpdHkiLCJNZXNoLl9wVW5yZWdpc3RlckVudGl0eSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUEsSUFBTyxTQUFTLFdBQWUsbUNBQW1DLENBQUMsQ0FBQztBQUlwRSxJQUFPLFFBQVEsV0FBZ0Isa0NBQWtDLENBQUMsQ0FBQztBQUtuRSxJQUFPLFVBQVUsV0FBZSxzQ0FBc0MsQ0FBQyxDQUFDO0FBQ3hFLElBQU8sc0JBQXNCLFdBQVksc0RBQXNELENBQUMsQ0FBQztBQUlqRyxJQUFPLGFBQWEsV0FBYyx5Q0FBeUMsQ0FBQyxDQUFDO0FBSTdFLEFBS0E7Ozs7R0FE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anMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsi77u/aW1wb3J0IEJveFx0XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vQm94XCIpO1xyXG5pbXBvcnQgVVZUcmFuc2Zvcm1cdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vVVZUcmFuc2Zvcm1cIik7XHJcbmltcG9ydCBBc3NldFR5cGVcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvQXNzZXRUeXBlXCIpO1xyXG5cclxuaW1wb3J0IElBbmltYXRvclx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYW5pbWF0b3JzL0lBbmltYXRvclwiKTtcclxuaW1wb3J0IERpc3BsYXlPYmplY3RcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0Rpc3BsYXlPYmplY3RcIik7XHJcbmltcG9ydCBHZW9tZXRyeVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0dlb21ldHJ5XCIpO1xyXG5pbXBvcnQgSVN1Yk1lc2hcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9JU3ViTWVzaFwiKTtcclxuaW1wb3J0IElTdWJNZXNoQ2xhc3NcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0lTdWJNZXNoQ2xhc3NcIik7XHJcbmltcG9ydCBUcmlhbmdsZVN1Ykdlb21ldHJ5XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvVHJpYW5nbGVTdWJHZW9tZXRyeVwiKTtcclxuaW1wb3J0IFN1Ykdlb21ldHJ5QmFzZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvU3ViR2VvbWV0cnlCYXNlXCIpO1xyXG5pbXBvcnQgQm91bmRzVHlwZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYm91bmRzL0JvdW5kc1R5cGVcIik7XHJcbmltcG9ydCBEaXNwbGF5T2JqZWN0Q29udGFpbmVyXHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9jb250YWluZXJzL0Rpc3BsYXlPYmplY3RDb250YWluZXJcIik7XHJcbmltcG9ydCBQYXJ0aXRpb25cdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3BhcnRpdGlvbi9QYXJ0aXRpb25cIik7XHJcbmltcG9ydCBFbnRpdHlOb2RlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vRW50aXR5Tm9kZVwiKTtcclxuaW1wb3J0IElSZW5kZXJlclBvb2xcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wb29sL0lSZW5kZXJlclBvb2xcIik7XHJcbmltcG9ydCBHZW9tZXRyeUV2ZW50XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZXZlbnRzL0dlb21ldHJ5RXZlbnRcIik7XHJcbmltcG9ydCBJRW50aXR5XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2VudGl0aWVzL0lFbnRpdHlcIik7XHJcbmltcG9ydCBNYXRlcmlhbEJhc2VcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL21hdGVyaWFscy9NYXRlcmlhbEJhc2VcIik7XHJcblxyXG4vKipcclxuICogTWVzaCBpcyBhbiBpbnN0YW5jZSBvZiBhIEdlb21ldHJ5LCBhdWdtZW50aW5nIGl0IHdpdGggYSBwcmVzZW5jZSBpbiB0aGUgc2NlbmUgZ3JhcGgsIGEgbWF0ZXJpYWwsIGFuZCBhbiBhbmltYXRpb25cclxuICogc3RhdGUuIEl0IGNvbnNpc3RzIG91dCBvZiBTdWJNZXNoZXMsIHdoaWNoIGluIHR1cm4gY29ycmVzcG9uZCB0byBTdWJHZW9tZXRyaWVzLiBTdWJNZXNoZXMgYWxsb3cgZGlmZmVyZW50IHBhcnRzXHJcbiAqIG9mIHRoZSBnZW9tZXRyeSB0byBiZSBhc3NpZ25lZCBkaWZmZXJlbnQgbWF0ZXJpYWxzLlxyXG4gKi9cclxuY2xhc3MgTWVzaCBleHRlbmRzIERpc3BsYXlPYmplY3RDb250YWluZXIgaW1wbGVtZW50cyBJRW50aXR5XHJcbntcclxuXHRwcml2YXRlIF91dlRyYW5zZm9ybTpVVlRyYW5zZm9ybTtcclxuXHJcblx0cHJpdmF0ZSBfc3ViTWVzaGVzOkFycmF5PElTdWJNZXNoPjtcclxuXHRwcml2YXRlIF9nZW9tZXRyeTpHZW9tZXRyeTtcclxuXHRwcml2YXRlIF9tYXRlcmlhbDpNYXRlcmlhbEJhc2U7XHJcblx0cHJpdmF0ZSBfYW5pbWF0b3I6SUFuaW1hdG9yO1xyXG5cdHByaXZhdGUgX2Nhc3RzU2hhZG93czpib29sZWFuID0gdHJ1ZTtcclxuXHRwcml2YXRlIF9zaGFyZUFuaW1hdGlvbkdlb21ldHJ5OmJvb2xlYW4gPSB0cnVlO1xyXG5cclxuXHRwcml2YXRlIF9vbkdlb21ldHJ5Qm91bmRzSW52YWxpZERlbGVnYXRlOihldmVudDpHZW9tZXRyeUV2ZW50KSA9PiB2b2lkO1xyXG5cdHByaXZhdGUgX29uU3ViR2VvbWV0cnlBZGRlZERlbGVnYXRlOihldmVudDpHZW9tZXRyeUV2ZW50KSA9PiB2b2lkO1xyXG5cdHByaXZhdGUgX29uU3ViR2VvbWV0cnlSZW1vdmVkRGVsZWdhdGU6KGV2ZW50Okdlb21ldHJ5RXZlbnQpID0+IHZvaWQ7XHJcblxyXG5cdC8qKlxyXG5cdCAqIERlZmluZXMgdGhlIGFuaW1hdG9yIG9mIHRoZSBtZXNoLiBBY3Qgb24gdGhlIG1lc2gncyBnZW9tZXRyeS4gIERlZmF1bHQgdmFsdWUgaXMgPGNvZGU+bnVsbDwvY29kZT4uXHJcblx0ICovXHJcblx0cHVibGljIGdldCBhbmltYXRvcigpOklBbmltYXRvclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9hbmltYXRvcjtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgYW5pbWF0b3IodmFsdWU6SUFuaW1hdG9yKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9hbmltYXRvcilcclxuXHRcdFx0dGhpcy5fYW5pbWF0b3IucmVtb3ZlT3duZXIodGhpcyk7XHJcblxyXG5cdFx0dGhpcy5fYW5pbWF0b3IgPSB2YWx1ZTtcclxuXHJcblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX3N1Yk1lc2hlcy5sZW5ndGg7XHJcblx0XHR2YXIgc3ViTWVzaDpJU3ViTWVzaDtcclxuXHJcblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBsZW47ICsraSkge1xyXG5cdFx0XHRzdWJNZXNoID0gdGhpcy5fc3ViTWVzaGVzW2ldO1xyXG5cclxuXHRcdFx0Ly8gY2F1c2UgbWF0ZXJpYWwgdG8gYmUgdW5yZWdpc3RlcmVkIGFuZCByZWdpc3RlcmVkIGFnYWluIHRvIHdvcmsgd2l0aCB0aGUgbmV3IGFuaW1hdGlvbiB0eXBlIChpZiBwb3NzaWJsZSlcclxuXHRcdFx0aWYgKHN1Yk1lc2gubWF0ZXJpYWwpIHtcclxuXHRcdFx0XHRzdWJNZXNoLm1hdGVyaWFsLmlSZW1vdmVPd25lcihzdWJNZXNoKTtcclxuXHRcdFx0XHRzdWJNZXNoLm1hdGVyaWFsLmlBZGRPd25lcihzdWJNZXNoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly9pbnZhbGlkYXRlIGFueSBleGlzdGluZyByZW5kZXJhYmxlcyBpbiBjYXNlIHRoZXkgbmVlZCB0byBwdWxsIG5ldyBnZW9tZXRyeVxyXG5cdFx0XHRzdWJNZXNoLl9pSW52YWxpZGF0ZVJlbmRlcmFibGVHZW9tZXRyeSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLl9hbmltYXRvcilcclxuXHRcdFx0dGhpcy5fYW5pbWF0b3IuYWRkT3duZXIodGhpcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgYXNzZXRUeXBlKCk6c3RyaW5nXHJcblx0e1xyXG5cdFx0cmV0dXJuIEFzc2V0VHlwZS5NRVNIO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSW5kaWNhdGVzIHdoZXRoZXIgb3Igbm90IHRoZSBNZXNoIGNhbiBjYXN0IHNoYWRvd3MuIERlZmF1bHQgdmFsdWUgaXMgPGNvZGU+dHJ1ZTwvY29kZT4uXHJcblx0ICovXHJcblx0cHVibGljIGdldCBjYXN0c1NoYWRvd3MoKTpib29sZWFuXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2Nhc3RzU2hhZG93cztcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgY2FzdHNTaGFkb3dzKHZhbHVlOmJvb2xlYW4pXHJcblx0e1xyXG5cdFx0dGhpcy5fY2FzdHNTaGFkb3dzID0gdmFsdWU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgZ2VvbWV0cnkgdXNlZCBieSB0aGUgbWVzaCB0aGF0IHByb3ZpZGVzIGl0IHdpdGggaXRzIHNoYXBlLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgZ2VvbWV0cnkoKTpHZW9tZXRyeVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9pU291cmNlUHJlZmFiKVxyXG5cdFx0XHR0aGlzLl9pU291cmNlUHJlZmFiLl9pVmFsaWRhdGUoKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fZ2VvbWV0cnk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IGdlb21ldHJ5KHZhbHVlOkdlb21ldHJ5KVxyXG5cdHtcclxuXHRcdHZhciBpOm51bWJlcjtcclxuXHJcblx0XHRpZiAodGhpcy5fZ2VvbWV0cnkpIHtcclxuXHRcdFx0dGhpcy5fZ2VvbWV0cnkucmVtb3ZlRXZlbnRMaXN0ZW5lcihHZW9tZXRyeUV2ZW50LkJPVU5EU19JTlZBTElELCB0aGlzLl9vbkdlb21ldHJ5Qm91bmRzSW52YWxpZERlbGVnYXRlKTtcclxuXHRcdFx0dGhpcy5fZ2VvbWV0cnkucmVtb3ZlRXZlbnRMaXN0ZW5lcihHZW9tZXRyeUV2ZW50LlNVQl9HRU9NRVRSWV9BRERFRCwgdGhpcy5fb25TdWJHZW9tZXRyeUFkZGVkRGVsZWdhdGUpO1xyXG5cdFx0XHR0aGlzLl9nZW9tZXRyeS5yZW1vdmVFdmVudExpc3RlbmVyKEdlb21ldHJ5RXZlbnQuU1VCX0dFT01FVFJZX1JFTU9WRUQsIHRoaXMuX29uU3ViR2VvbWV0cnlSZW1vdmVkRGVsZWdhdGUpO1xyXG5cclxuXHRcdFx0Zm9yIChpID0gMDsgaSA8IHRoaXMuX3N1Yk1lc2hlcy5sZW5ndGg7ICsraSlcclxuXHRcdFx0XHR0aGlzLl9zdWJNZXNoZXNbaV0uZGlzcG9zZSgpO1xyXG5cclxuXHRcdFx0dGhpcy5fc3ViTWVzaGVzLmxlbmd0aCA9IDA7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5fZ2VvbWV0cnkgPSB2YWx1ZTtcclxuXHJcblx0XHRpZiAodGhpcy5fZ2VvbWV0cnkpIHtcclxuXHJcblx0XHRcdHRoaXMuX2dlb21ldHJ5LmFkZEV2ZW50TGlzdGVuZXIoR2VvbWV0cnlFdmVudC5CT1VORFNfSU5WQUxJRCwgdGhpcy5fb25HZW9tZXRyeUJvdW5kc0ludmFsaWREZWxlZ2F0ZSk7XHJcblx0XHRcdHRoaXMuX2dlb21ldHJ5LmFkZEV2ZW50TGlzdGVuZXIoR2VvbWV0cnlFdmVudC5TVUJfR0VPTUVUUllfQURERUQsIHRoaXMuX29uU3ViR2VvbWV0cnlBZGRlZERlbGVnYXRlKTtcclxuXHRcdFx0dGhpcy5fZ2VvbWV0cnkuYWRkRXZlbnRMaXN0ZW5lcihHZW9tZXRyeUV2ZW50LlNVQl9HRU9NRVRSWV9SRU1PVkVELCB0aGlzLl9vblN1Ykdlb21ldHJ5UmVtb3ZlZERlbGVnYXRlKTtcclxuXHJcblx0XHRcdHZhciBzdWJHZW9tczpBcnJheTxTdWJHZW9tZXRyeUJhc2U+ID0gdGhpcy5fZ2VvbWV0cnkuc3ViR2VvbWV0cmllcztcclxuXHJcblx0XHRcdGZvciAoaSA9IDA7IGkgPCBzdWJHZW9tcy5sZW5ndGg7ICsraSlcclxuXHRcdFx0XHR0aGlzLmFkZFN1Yk1lc2goc3ViR2VvbXNbaV0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIG1hdGVyaWFsIHdpdGggd2hpY2ggdG8gcmVuZGVyIHRoZSBNZXNoLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgbWF0ZXJpYWwoKTpNYXRlcmlhbEJhc2VcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fbWF0ZXJpYWw7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IG1hdGVyaWFsKHZhbHVlOk1hdGVyaWFsQmFzZSlcclxuXHR7XHJcblx0XHRpZiAodmFsdWUgPT0gdGhpcy5fbWF0ZXJpYWwpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR2YXIgaTpudW1iZXI7XHJcblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX3N1Yk1lc2hlcy5sZW5ndGg7XHJcblx0XHR2YXIgc3ViTWVzaDpJU3ViTWVzaDtcclxuXHJcblx0XHRmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspXHJcblx0XHRcdGlmICh0aGlzLl9tYXRlcmlhbCAmJiAoc3ViTWVzaCA9IHRoaXMuX3N1Yk1lc2hlc1tpXSkubWF0ZXJpYWwgPT0gdGhpcy5fbWF0ZXJpYWwpXHJcblx0XHRcdFx0dGhpcy5fbWF0ZXJpYWwuaVJlbW92ZU93bmVyKHN1Yk1lc2gpO1xyXG5cclxuXHRcdHRoaXMuX21hdGVyaWFsID0gdmFsdWU7XHJcblxyXG5cdFx0Zm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKVxyXG5cdFx0XHRpZiAodGhpcy5fbWF0ZXJpYWwgJiYgKHN1Yk1lc2ggPSB0aGlzLl9zdWJNZXNoZXNbaV0pLm1hdGVyaWFsID09IHRoaXMuX21hdGVyaWFsKVxyXG5cdFx0XHRcdHRoaXMuX21hdGVyaWFsLmlBZGRPd25lcihzdWJNZXNoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluZGljYXRlcyB3aGV0aGVyIG9yIG5vdCB0aGUgbWVzaCBzaGFyZSB0aGUgc2FtZSBhbmltYXRpb24gZ2VvbWV0cnkuXHJcblx0ICovXHJcblx0cHVibGljIGdldCBzaGFyZUFuaW1hdGlvbkdlb21ldHJ5KCk6Ym9vbGVhblxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9zaGFyZUFuaW1hdGlvbkdlb21ldHJ5O1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBzaGFyZUFuaW1hdGlvbkdlb21ldHJ5KHZhbHVlOmJvb2xlYW4pXHJcblx0e1xyXG5cdFx0dGhpcy5fc2hhcmVBbmltYXRpb25HZW9tZXRyeSA9IHZhbHVlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIFN1Yk1lc2hlcyBvdXQgb2Ygd2hpY2ggdGhlIE1lc2ggY29uc2lzdHMuIEV2ZXJ5IFN1Yk1lc2ggY2FuIGJlIGFzc2lnbmVkIGEgbWF0ZXJpYWwgdG8gb3ZlcnJpZGUgdGhlIE1lc2gnc1xyXG5cdCAqIG1hdGVyaWFsLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgc3ViTWVzaGVzKCk6QXJyYXk8SVN1Yk1lc2g+XHJcblx0e1xyXG5cdFx0Ly8gU2luY2UgdGhpcyBnZXR0ZXIgaXMgaW52b2tlZCBldmVyeSBpdGVyYXRpb24gb2YgdGhlIHJlbmRlciBsb29wLCBhbmRcclxuXHRcdC8vIHRoZSBwcmVmYWIgY29uc3RydWN0IGNvdWxkIGFmZmVjdCB0aGUgc3ViLW1lc2hlcywgdGhlIHByZWZhYiBpc1xyXG5cdFx0Ly8gdmFsaWRhdGVkIGhlcmUgdG8gZ2l2ZSBpdCBhIGNoYW5jZSB0byByZWJ1aWxkLlxyXG5cdFx0aWYgKHRoaXMuX2lTb3VyY2VQcmVmYWIpXHJcblx0XHRcdHRoaXMuX2lTb3VyY2VQcmVmYWIuX2lWYWxpZGF0ZSgpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLl9zdWJNZXNoZXM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgdXZUcmFuc2Zvcm0oKTpVVlRyYW5zZm9ybVxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl91dlRyYW5zZm9ybTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgdXZUcmFuc2Zvcm0odmFsdWU6VVZUcmFuc2Zvcm0pXHJcblx0e1xyXG5cdFx0dGhpcy5fdXZUcmFuc2Zvcm0gPSB2YWx1ZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZSBhIG5ldyBNZXNoIG9iamVjdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBnZW9tZXRyeSAgICAgICAgICAgICAgICAgICAgVGhlIGdlb21ldHJ5IHVzZWQgYnkgdGhlIG1lc2ggdGhhdCBwcm92aWRlcyBpdCB3aXRoIGl0cyBzaGFwZS5cclxuXHQgKiBAcGFyYW0gbWF0ZXJpYWwgICAgW29wdGlvbmFsXSAgICAgICAgVGhlIG1hdGVyaWFsIHdpdGggd2hpY2ggdG8gcmVuZGVyIHRoZSBNZXNoLlxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGdlb21ldHJ5Okdlb21ldHJ5LCBtYXRlcmlhbDpNYXRlcmlhbEJhc2UgPSBudWxsKVxyXG5cdHtcclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0dGhpcy5fcElzRW50aXR5ID0gdHJ1ZTtcclxuXHJcblx0XHR0aGlzLl9zdWJNZXNoZXMgPSBuZXcgQXJyYXk8SVN1Yk1lc2g+KCk7XHJcblxyXG5cdFx0dGhpcy5fb25HZW9tZXRyeUJvdW5kc0ludmFsaWREZWxlZ2F0ZSA9IChldmVudDpHZW9tZXRyeUV2ZW50KSA9PiB0aGlzLm9uR2VvbWV0cnlCb3VuZHNJbnZhbGlkKGV2ZW50KTtcclxuXHRcdHRoaXMuX29uU3ViR2VvbWV0cnlBZGRlZERlbGVnYXRlID0gKGV2ZW50Okdlb21ldHJ5RXZlbnQpID0+IHRoaXMub25TdWJHZW9tZXRyeUFkZGVkKGV2ZW50KTtcclxuXHRcdHRoaXMuX29uU3ViR2VvbWV0cnlSZW1vdmVkRGVsZWdhdGUgPSAoZXZlbnQ6R2VvbWV0cnlFdmVudCkgPT4gdGhpcy5vblN1Ykdlb21ldHJ5UmVtb3ZlZChldmVudCk7XHJcblxyXG5cdFx0Ly90aGlzIHNob3VsZCBuZXZlciBoYXBwZW4sIGJ1dCBpZiBwZW9wbGUgaW5zaXN0IG9uIHRyeWluZyB0byBjcmVhdGUgdGhlaXIgbWVzaGVzIGJlZm9yZSB0aGV5IGhhdmUgZ2VvbWV0cnkgdG8gZmlsbCBpdCwgaXQgYmVjb21lcyBuZWNlc3NhcnlcclxuXHRcdHRoaXMuZ2VvbWV0cnkgPSBnZW9tZXRyeSB8fCBuZXcgR2VvbWV0cnkoKTtcclxuXHJcblx0XHR0aGlzLm1hdGVyaWFsID0gbWF0ZXJpYWw7XHJcblxyXG5cdFx0Ly9kZWZhdWx0IGJvdW5kcyB0eXBlXHJcblx0XHR0aGlzLl9ib3VuZHNUeXBlID0gQm91bmRzVHlwZS5BWElTX0FMSUdORURfQk9YO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgYmFrZVRyYW5zZm9ybWF0aW9ucygpXHJcblx0e1xyXG5cdFx0dGhpcy5nZW9tZXRyeS5hcHBseVRyYW5zZm9ybWF0aW9uKHRoaXMuX2lNYXRyaXgzRCk7XHJcblx0XHR0aGlzLl9pTWF0cml4M0QuaWRlbnRpdHkoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBpbmhlcml0RG9jXHJcblx0ICovXHJcblx0cHVibGljIGRpc3Bvc2UoKVxyXG5cdHtcclxuXHRcdHN1cGVyLmRpc3Bvc2UoKTtcclxuXHJcblx0XHR0aGlzLm1hdGVyaWFsID0gbnVsbDtcclxuXHRcdHRoaXMuZ2VvbWV0cnkgPSBudWxsO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRGlzcG9zZXMgbWVzaCBpbmNsdWRpbmcgdGhlIGFuaW1hdG9yIGFuZCBjaGlsZHJlbi4gVGhpcyBpcyBhIG1lcmVseSBhIGNvbnZlbmllbmNlIG1ldGhvZC5cclxuXHQgKiBAcmV0dXJuXHJcblx0ICovXHJcblx0cHVibGljIGRpc3Bvc2VXaXRoQW5pbWF0b3JBbmRDaGlsZHJlbigpXHJcblx0e1xyXG5cdFx0dGhpcy5kaXNwb3NlV2l0aENoaWxkcmVuKCk7XHJcblxyXG5cdFx0IGlmICh0aGlzLl9hbmltYXRvcilcclxuXHRcdFx0dGhpcy5fYW5pbWF0b3IuZGlzcG9zZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2xvbmVzIHRoaXMgTWVzaCBpbnN0YW5jZSBhbG9uZyB3aXRoIGFsbCBpdCdzIGNoaWxkcmVuLCB3aGlsZSByZS11c2luZyB0aGUgc2FtZVxyXG5cdCAqIG1hdGVyaWFsLCBnZW9tZXRyeSBhbmQgYW5pbWF0aW9uIHNldC4gVGhlIHJldHVybmVkIHJlc3VsdCB3aWxsIGJlIGEgY29weSBvZiB0aGlzIG1lc2gsXHJcblx0ICogY29udGFpbmluZyBjb3BpZXMgb2YgYWxsIG9mIGl0J3MgY2hpbGRyZW4uXHJcblx0ICpcclxuXHQgKiBQcm9wZXJ0aWVzIHRoYXQgYXJlIHJlLXVzZWQgKGkuZS4gbm90IGNsb25lZCkgYnkgdGhlIG5ldyBjb3B5IGluY2x1ZGUgbmFtZSxcclxuXHQgKiBnZW9tZXRyeSwgYW5kIG1hdGVyaWFsLiBQcm9wZXJ0aWVzIHRoYXQgYXJlIGNsb25lZCBvciBjcmVhdGVkIGFuZXcgZm9yIHRoZSBjb3B5XHJcblx0ICogaW5jbHVkZSBzdWJNZXNoZXMsIGNoaWxkcmVuIG9mIHRoZSBtZXNoLCBhbmQgdGhlIGFuaW1hdG9yLlxyXG5cdCAqXHJcblx0ICogSWYgeW91IHdhbnQgdG8gY29weSBqdXN0IHRoZSBtZXNoLCByZXVzaW5nIGl0J3MgZ2VvbWV0cnkgYW5kIG1hdGVyaWFsIHdoaWxlIG5vdFxyXG5cdCAqIGNsb25pbmcgaXQncyBjaGlsZHJlbiwgdGhlIHNpbXBsZXN0IHdheSBpcyB0byBjcmVhdGUgYSBuZXcgbWVzaCBtYW51YWxseTpcclxuXHQgKlxyXG5cdCAqIDxjb2RlPlxyXG5cdCAqIHZhciBjbG9uZSA6IE1lc2ggPSBuZXcgTWVzaChvcmlnaW5hbC5nZW9tZXRyeSwgb3JpZ2luYWwubWF0ZXJpYWwpO1xyXG5cdCAqIDwvY29kZT5cclxuXHQgKi9cclxuXHRwdWJsaWMgY2xvbmUoKTpEaXNwbGF5T2JqZWN0XHJcblx0e1xyXG5cdFx0dmFyIGNsb25lOk1lc2ggPSBuZXcgTWVzaCh0aGlzLl9nZW9tZXRyeSwgdGhpcy5fbWF0ZXJpYWwpO1xyXG5cclxuXHRcdGNsb25lLl9pTWF0cml4M0QgPSB0aGlzLl9pTWF0cml4M0Q7XHJcblx0XHRjbG9uZS5waXZvdCA9IHRoaXMucGl2b3Q7XHJcblx0XHRjbG9uZS5wYXJ0aXRpb24gPSB0aGlzLnBhcnRpdGlvbjtcclxuXHRcdGNsb25lLmJvdW5kc1R5cGUgPSB0aGlzLmJvdW5kc1R5cGU7XHJcblxyXG5cclxuXHRcdGNsb25lLm5hbWUgPSB0aGlzLm5hbWU7XHJcblx0XHRjbG9uZS5jYXN0c1NoYWRvd3MgPSB0aGlzLmNhc3RzU2hhZG93cztcclxuXHRcdGNsb25lLnNoYXJlQW5pbWF0aW9uR2VvbWV0cnkgPSB0aGlzLnNoYXJlQW5pbWF0aW9uR2VvbWV0cnk7XHJcblx0XHRjbG9uZS5tb3VzZUVuYWJsZWQgPSB0aGlzLm1vdXNlRW5hYmxlZDtcclxuXHRcdGNsb25lLm1vdXNlQ2hpbGRyZW4gPSB0aGlzLm1vdXNlQ2hpbGRyZW47XHJcblx0XHQvL3RoaXMgaXMgb2YgY291cnNlIG5vIHByb3BlciBjbG9uaW5nXHJcblx0XHQvL21heWJlIHVzZSB0aGlzIGluc3RlYWQ/OiBodHRwOi8vYmxvZy5hbm90aGVyLWQtbWVudGlvbi5yby9wcm9ncmFtbWluZy9ob3ctdG8tY2xvbmUtZHVwbGljYXRlLWFuLW9iamVjdC1pbi1hY3Rpb25zY3JpcHQtMy9cclxuXHRcdGNsb25lLmV4dHJhID0gdGhpcy5leHRyYTtcclxuXHJcblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX3N1Yk1lc2hlcy5sZW5ndGg7XHJcblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBsZW47ICsraSlcclxuXHRcdFx0Y2xvbmUuX3N1Yk1lc2hlc1tpXS5tYXRlcmlhbCA9IHRoaXMuX3N1Yk1lc2hlc1tpXS5faUdldEV4cGxpY2l0TWF0ZXJpYWwoKTtcclxuXHJcblxyXG5cdFx0bGVuID0gdGhpcy5udW1DaGlsZHJlbjtcclxuXHRcdHZhciBvYmo6YW55O1xyXG5cclxuXHRcdGZvciAoaSA9IDA7IGkgPCBsZW47ICsraSkge1xyXG5cdFx0XHRvYmogPSB0aGlzLmdldENoaWxkQXQoaSkuY2xvbmUoKTtcclxuXHRcdFx0Y2xvbmUuYWRkQ2hpbGQoPERpc3BsYXlPYmplY3RDb250YWluZXI+IG9iaik7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuX2FuaW1hdG9yKVxyXG5cdFx0XHRjbG9uZS5hbmltYXRvciA9IHRoaXMuX2FuaW1hdG9yLmNsb25lKCk7XHJcblxyXG5cdFx0cmV0dXJuIGNsb25lO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogLy9UT0RPXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc3ViR2VvbWV0cnlcclxuXHQgKiBAcmV0dXJucyB7U3ViTWVzaEJhc2V9XHJcblx0ICovXHJcblx0cHVibGljIGdldFN1Yk1lc2hGcm9tU3ViR2VvbWV0cnkoc3ViR2VvbWV0cnk6U3ViR2VvbWV0cnlCYXNlKTpJU3ViTWVzaFxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9zdWJNZXNoZXNbdGhpcy5fZ2VvbWV0cnkuc3ViR2VvbWV0cmllcy5pbmRleE9mKHN1Ykdlb21ldHJ5KV07XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiAvL1RPRE9cclxuXHQgKlxyXG5cdCAqIEBwcm90ZWN0ZWRcclxuXHQgKi9cclxuXHRwdWJsaWMgX3BVcGRhdGVCb3hCb3VuZHMoKVxyXG5cdHtcclxuXHRcdHN1cGVyLl9wVXBkYXRlQm94Qm91bmRzKCk7XHJcblxyXG5cdFx0dmFyIGk6bnVtYmVyLCBqOm51bWJlciwgcDpudW1iZXIsIGxlbjpudW1iZXI7XHJcblx0XHR2YXIgc3ViR2VvbXM6QXJyYXk8U3ViR2VvbWV0cnlCYXNlPiA9IHRoaXMuX2dlb21ldHJ5LnN1Ykdlb21ldHJpZXM7XHJcblx0XHR2YXIgc3ViR2VvbTpTdWJHZW9tZXRyeUJhc2U7XHJcblx0XHR2YXIgYm91bmRpbmdQb3NpdGlvbnM6QXJyYXk8bnVtYmVyPjtcclxuXHRcdHZhciBudW1TdWJHZW9tczpudW1iZXIgPSBzdWJHZW9tcy5sZW5ndGg7XHJcblx0XHR2YXIgbWluWDpudW1iZXIsIG1pblk6bnVtYmVyLCBtaW5aOm51bWJlcjtcclxuXHRcdHZhciBtYXhYOm51bWJlciwgbWF4WTpudW1iZXIsIG1heFo6bnVtYmVyO1xyXG5cclxuXHRcdGlmIChudW1TdWJHZW9tcyA+IDApIHtcclxuXHRcdFx0aSA9IDA7XHJcblx0XHRcdHN1Ykdlb20gPSBzdWJHZW9tc1swXTtcclxuXHRcdFx0Ym91bmRpbmdQb3NpdGlvbnMgPSBzdWJHZW9tLmdldEJvdW5kaW5nUG9zaXRpb25zKCk7XHJcblx0XHRcdG1pblggPSBtYXhYID0gYm91bmRpbmdQb3NpdGlvbnNbaV07XHJcblx0XHRcdG1pblkgPSBtYXhZID0gYm91bmRpbmdQb3NpdGlvbnNbaSArIDFdO1xyXG5cdFx0XHRtaW5aID0gbWF4WiA9IGJvdW5kaW5nUG9zaXRpb25zW2kgKyAyXTtcclxuXHJcblx0XHRcdGZvciAoaiA9IDA7IGogPCBudW1TdWJHZW9tczsgaisrKSB7XHJcblx0XHRcdFx0c3ViR2VvbSA9IHN1Ykdlb21zW2pdO1xyXG5cdFx0XHRcdGJvdW5kaW5nUG9zaXRpb25zID0gc3ViR2VvbS5nZXRCb3VuZGluZ1Bvc2l0aW9ucygpO1xyXG5cdFx0XHRcdGxlbiA9IGJvdW5kaW5nUG9zaXRpb25zLmxlbmd0aDtcclxuXHJcblx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGxlbjsgaSs9Mykge1xyXG5cdFx0XHRcdFx0cCA9IGJvdW5kaW5nUG9zaXRpb25zW2ldO1xyXG5cdFx0XHRcdFx0aWYgKHAgPCBtaW5YKVxyXG5cdFx0XHRcdFx0XHRtaW5YID0gcDtcclxuXHRcdFx0XHRcdGVsc2UgaWYgKHAgPiBtYXhYKVxyXG5cdFx0XHRcdFx0XHRtYXhYID0gcDtcclxuXHJcblx0XHRcdFx0XHRwID0gYm91bmRpbmdQb3NpdGlvbnNbaSArIDFdO1xyXG5cclxuXHRcdFx0XHRcdGlmIChwIDwgbWluWSlcclxuXHRcdFx0XHRcdFx0bWluWSA9IHA7XHJcblx0XHRcdFx0XHRlbHNlIGlmIChwID4gbWF4WSlcclxuXHRcdFx0XHRcdFx0bWF4WSA9IHA7XHJcblxyXG5cdFx0XHRcdFx0cCA9IGJvdW5kaW5nUG9zaXRpb25zW2kgKyAyXTtcclxuXHJcblx0XHRcdFx0XHRpZiAocCA8IG1pblopXHJcblx0XHRcdFx0XHRcdG1pblogPSBwO1xyXG5cdFx0XHRcdFx0ZWxzZSBpZiAocCA+IG1heFopXHJcblx0XHRcdFx0XHRcdG1heFogPSBwO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5fcEJveEJvdW5kcy53aWR0aCA9IG1heFggLSAodGhpcy5fcEJveEJvdW5kcy54ID0gbWluWCk7XHJcblx0XHRcdHRoaXMuX3BCb3hCb3VuZHMuaGVpZ2h0ID0gbWF4WSAtICh0aGlzLl9wQm94Qm91bmRzLnkgPSBtaW5ZKTtcclxuXHRcdFx0dGhpcy5fcEJveEJvdW5kcy5kZXB0aCA9IG1heFogLSAodGhpcy5fcEJveEJvdW5kcy56ID0gbWluWik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLl9wQm94Qm91bmRzLnNldEVtcHR5KCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHJcblx0cHVibGljIF9wVXBkYXRlU3BoZXJlQm91bmRzKClcclxuXHR7XHJcblx0XHRzdXBlci5fcFVwZGF0ZVNwaGVyZUJvdW5kcygpO1xyXG5cclxuXHRcdHZhciBib3g6Qm94ID0gdGhpcy5nZXRCb3goKTtcclxuXHRcdHZhciBjZW50ZXJYOm51bWJlciA9IGJveC54ICsgYm94LndpZHRoLzI7XHJcblx0XHR2YXIgY2VudGVyWTpudW1iZXIgPSBib3gueSArIGJveC5oZWlnaHQvMjtcclxuXHRcdHZhciBjZW50ZXJaOm51bWJlciA9IGJveC56ICsgYm94LmRlcHRoLzI7XHJcblxyXG5cdFx0dmFyIGk6bnVtYmVyLCBqOm51bWJlciwgcDpudW1iZXIsIGxlbjpudW1iZXI7XHJcblx0XHR2YXIgc3ViR2VvbXM6QXJyYXk8U3ViR2VvbWV0cnlCYXNlPiA9IHRoaXMuX2dlb21ldHJ5LnN1Ykdlb21ldHJpZXM7XHJcblx0XHR2YXIgc3ViR2VvbTpTdWJHZW9tZXRyeUJhc2U7XHJcblx0XHR2YXIgYm91bmRpbmdQb3NpdGlvbnM6QXJyYXk8bnVtYmVyPjtcclxuXHRcdHZhciBudW1TdWJHZW9tczpudW1iZXIgPSBzdWJHZW9tcy5sZW5ndGg7XHJcblx0XHR2YXIgbWF4UmFkaXVzU3F1YXJlZDpudW1iZXIgPSAwO1xyXG5cdFx0dmFyIHJhZGl1c1NxdWFyZWQ6bnVtYmVyO1xyXG5cdFx0dmFyIGRpc3RhbmNlWDpudW1iZXI7XHJcblx0XHR2YXIgZGlzdGFuY2VZOm51bWJlcjtcclxuXHRcdHZhciBkaXN0YW5jZVo6bnVtYmVyO1xyXG5cclxuXHRcdGlmIChudW1TdWJHZW9tcyA+IDApIHtcclxuXHRcdFx0aSA9IDA7XHJcblx0XHRcdHN1Ykdlb20gPSBzdWJHZW9tc1swXTtcclxuXHRcdFx0Ym91bmRpbmdQb3NpdGlvbnMgPSBzdWJHZW9tLmdldEJvdW5kaW5nUG9zaXRpb25zKCk7XHJcblx0XHRcdGZvciAoaiA9IDA7IGogPCBudW1TdWJHZW9tczsgaisrKSB7XHJcblx0XHRcdFx0c3ViR2VvbSA9IHN1Ykdlb21zW2pdO1xyXG5cdFx0XHRcdGJvdW5kaW5nUG9zaXRpb25zID0gc3ViR2VvbS5nZXRCb3VuZGluZ1Bvc2l0aW9ucygpO1xyXG5cdFx0XHRcdGxlbiA9IGJvdW5kaW5nUG9zaXRpb25zLmxlbmd0aDtcclxuXHJcblx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGxlbjsgaSArPSAzKSB7XHJcblx0XHRcdFx0XHRkaXN0YW5jZVggPSBib3VuZGluZ1Bvc2l0aW9uc1tpXSAtIGNlbnRlclg7XHJcblx0XHRcdFx0XHRkaXN0YW5jZVkgPSBib3VuZGluZ1Bvc2l0aW9uc1tpICsgMV0gLSBjZW50ZXJZO1xyXG5cdFx0XHRcdFx0ZGlzdGFuY2VaID0gYm91bmRpbmdQb3NpdGlvbnNbaSArIDJdIC0gY2VudGVyWjtcclxuXHRcdFx0XHRcdHJhZGl1c1NxdWFyZWQgPSBkaXN0YW5jZVgqZGlzdGFuY2VYICsgZGlzdGFuY2VZKmRpc3RhbmNlWSArIGRpc3RhbmNlWipkaXN0YW5jZVo7XHJcblxyXG5cdFx0XHRcdFx0aWYgKG1heFJhZGl1c1NxdWFyZWQgPCByYWRpdXNTcXVhcmVkKVxyXG5cdFx0XHRcdFx0XHRtYXhSYWRpdXNTcXVhcmVkID0gcmFkaXVzU3F1YXJlZDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLl9wU3BoZXJlQm91bmRzLnggPSBjZW50ZXJYO1xyXG5cdFx0dGhpcy5fcFNwaGVyZUJvdW5kcy55ID0gY2VudGVyWTtcclxuXHRcdHRoaXMuX3BTcGhlcmVCb3VuZHMueiA9IGNlbnRlclo7XHJcblx0XHR0aGlzLl9wU3BoZXJlQm91bmRzLnJhZGl1cyA9IE1hdGguc3FydChtYXhSYWRpdXNTcXVhcmVkKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIC8vVE9ET1xyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIG9uR2VvbWV0cnlCb3VuZHNJbnZhbGlkKGV2ZW50Okdlb21ldHJ5RXZlbnQpXHJcblx0e1xyXG5cdFx0dGhpcy5fcEludmFsaWRhdGVCb3VuZHMoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENhbGxlZCB3aGVuIGEgU3ViR2VvbWV0cnkgd2FzIGFkZGVkIHRvIHRoZSBHZW9tZXRyeS5cclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBvblN1Ykdlb21ldHJ5QWRkZWQoZXZlbnQ6R2VvbWV0cnlFdmVudClcclxuXHR7XHJcblx0XHR0aGlzLmFkZFN1Yk1lc2goZXZlbnQuc3ViR2VvbWV0cnkpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2FsbGVkIHdoZW4gYSBTdWJHZW9tZXRyeSB3YXMgcmVtb3ZlZCBmcm9tIHRoZSBHZW9tZXRyeS5cclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBvblN1Ykdlb21ldHJ5UmVtb3ZlZChldmVudDpHZW9tZXRyeUV2ZW50KVxyXG5cdHtcclxuXHRcdHZhciBzdWJNZXNoOklTdWJNZXNoO1xyXG5cdFx0dmFyIHN1Ykdlb206U3ViR2VvbWV0cnlCYXNlID0gZXZlbnQuc3ViR2VvbWV0cnk7XHJcblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX3N1Yk1lc2hlcy5sZW5ndGg7XHJcblx0XHR2YXIgaTpudW1iZXI7XHJcblxyXG5cdFx0Ly8gSW1wb3J0YW50ISBUaGlzIGhhcyB0byBiZSBkb25lIGhlcmUsIGFuZCBub3QgZGVsYXllZCB1bnRpbCB0aGVcclxuXHRcdC8vIG5leHQgcmVuZGVyIGxvb3AsIHNpbmNlIHRoaXMgbWF5IGJlIGNhdXNlZCBieSB0aGUgZ2VvbWV0cnkgYmVpbmdcclxuXHRcdC8vIHJlYnVpbHQgSU4gVEhFIFJFTkRFUiBMT09QLiBJbnZhbGlkYXRpbmcgYW5kIHdhaXRpbmcgd2lsbCBkZWxheVxyXG5cdFx0Ly8gaXQgdW50aWwgdGhlIE5FWFQgUkVOREVSIEZSQU1FIHdoaWNoIGlzIHByb2JhYmx5IG5vdCBkZXNpcmFibGUuXHJcblx0XHRmb3IgKGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcclxuXHJcblx0XHRcdHN1Yk1lc2ggPSB0aGlzLl9zdWJNZXNoZXNbaV07XHJcblxyXG5cdFx0XHRpZiAoc3ViTWVzaC5zdWJHZW9tZXRyeSA9PSBzdWJHZW9tKSB7XHJcblx0XHRcdFx0c3ViTWVzaC5kaXNwb3NlKCk7XHJcblxyXG5cdFx0XHRcdHRoaXMuX3N1Yk1lc2hlcy5zcGxpY2UoaSwgMSk7XHJcblxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0LS1sZW47XHJcblx0XHRmb3IgKDsgaSA8IGxlbjsgKytpKVxyXG5cdFx0XHR0aGlzLl9zdWJNZXNoZXNbaV0uX2lJbmRleCA9IGk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGEgU3ViTWVzaEJhc2Ugd3JhcHBpbmcgYSBTdWJHZW9tZXRyeS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzdWJHZW9tZXRyeVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgYWRkU3ViTWVzaChzdWJHZW9tZXRyeTpTdWJHZW9tZXRyeUJhc2UpXHJcblx0e1xyXG5cdFx0dmFyIFN1Yk1lc2hDbGFzczpJU3ViTWVzaENsYXNzID0gc3ViR2VvbWV0cnkuc3ViTWVzaENsYXNzO1xyXG5cclxuXHRcdHZhciBzdWJNZXNoOklTdWJNZXNoID0gbmV3IFN1Yk1lc2hDbGFzcyhzdWJHZW9tZXRyeSwgdGhpcywgbnVsbCk7XHJcblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX3N1Yk1lc2hlcy5sZW5ndGg7XHJcblxyXG5cdFx0c3ViTWVzaC5faUluZGV4ID0gbGVuO1xyXG5cclxuXHRcdHRoaXMuX3N1Yk1lc2hlc1tsZW5dID0gc3ViTWVzaDtcclxuXHJcblx0XHR0aGlzLl9wSW52YWxpZGF0ZUJvdW5kcygpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogLy9UT0RPXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gc2hvcnRlc3RDb2xsaXNpb25EaXN0YW5jZVxyXG5cdCAqIEBwYXJhbSBmaW5kQ2xvc2VzdFxyXG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxyXG5cdCAqXHJcblx0ICogQGludGVybmFsXHJcblx0ICovXHJcblx0cHVibGljIF9pVGVzdENvbGxpc2lvbihzaG9ydGVzdENvbGxpc2lvbkRpc3RhbmNlOm51bWJlciwgZmluZENsb3Nlc3Q6Ym9vbGVhbik6Ym9vbGVhblxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9wUGlja2luZ0NvbGxpZGVyLnRlc3RNZXNoQ29sbGlzaW9uKHRoaXMsIHRoaXMuX3BQaWNraW5nQ29sbGlzaW9uVk8sIHNob3J0ZXN0Q29sbGlzaW9uRGlzdGFuY2UsIGZpbmRDbG9zZXN0KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHJlbmRlcmVyXHJcblx0ICpcclxuXHQgKiBAaW50ZXJuYWxcclxuXHQgKi9cclxuXHRwdWJsaWMgX2lDb2xsZWN0UmVuZGVyYWJsZXMocmVuZGVyZXJQb29sOklSZW5kZXJlclBvb2wpXHJcblx0e1xyXG5cdFx0Ly8gU2luY2UgdGhpcyBnZXR0ZXIgaXMgaW52b2tlZCBldmVyeSBpdGVyYXRpb24gb2YgdGhlIHJlbmRlciBsb29wLCBhbmRcclxuXHRcdC8vIHRoZSBwcmVmYWIgY29uc3RydWN0IGNvdWxkIGFmZmVjdCB0aGUgc3ViLW1lc2hlcywgdGhlIHByZWZhYiBpc1xyXG5cdFx0Ly8gdmFsaWRhdGVkIGhlcmUgdG8gZ2l2ZSBpdCBhIGNoYW5jZSB0byByZWJ1aWxkLlxyXG5cdFx0aWYgKHRoaXMuX2lTb3VyY2VQcmVmYWIpXHJcblx0XHRcdHRoaXMuX2lTb3VyY2VQcmVmYWIuX2lWYWxpZGF0ZSgpO1xyXG5cclxuXHRcdHZhciBsZW46bnVtYmVyIC8qdWludCovID0gdGhpcy5fc3ViTWVzaGVzLmxlbmd0aDtcclxuXHRcdGZvciAodmFyIGk6bnVtYmVyIC8qdWludCovID0gMDsgaSA8IGxlbjsgaSsrKVxyXG5cdFx0XHR0aGlzLl9zdWJNZXNoZXNbaV0uX2lDb2xsZWN0UmVuZGVyYWJsZShyZW5kZXJlclBvb2wpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIF9pSW52YWxpZGF0ZVJlbmRlcmFibGVHZW9tZXRyaWVzKClcclxuXHR7XHJcblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX3N1Yk1lc2hlcy5sZW5ndGg7XHJcblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBsZW47ICsraSlcclxuXHRcdFx0dGhpcy5fc3ViTWVzaGVzW2ldLl9pSW52YWxpZGF0ZVJlbmRlcmFibGVHZW9tZXRyeSgpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIF9wUmVnaXN0ZXJFbnRpdHkocGFydGl0aW9uOlBhcnRpdGlvbilcclxuXHR7XHJcblx0XHRwYXJ0aXRpb24uX2lSZWdpc3RlckVudGl0eSh0aGlzKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBfcFVucmVnaXN0ZXJFbnRpdHkocGFydGl0aW9uOlBhcnRpdGlvbilcclxuXHR7XHJcblx0XHRwYXJ0aXRpb24uX2lVbnJlZ2lzdGVyRW50aXR5KHRoaXMpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0ID0gTWVzaDsiXX0=