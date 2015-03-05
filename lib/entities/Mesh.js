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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9NZXNoLnRzIl0sIm5hbWVzIjpbIk1lc2giLCJNZXNoLmNvbnN0cnVjdG9yIiwiTWVzaC5hbmltYXRvciIsIk1lc2guYXNzZXRUeXBlIiwiTWVzaC5jYXN0c1NoYWRvd3MiLCJNZXNoLmdlb21ldHJ5IiwiTWVzaC5tYXRlcmlhbCIsIk1lc2guc2hhcmVBbmltYXRpb25HZW9tZXRyeSIsIk1lc2guc3ViTWVzaGVzIiwiTWVzaC51dlRyYW5zZm9ybSIsIk1lc2guYmFrZVRyYW5zZm9ybWF0aW9ucyIsIk1lc2guZGlzcG9zZSIsIk1lc2guZGlzcG9zZVdpdGhBbmltYXRvckFuZENoaWxkcmVuIiwiTWVzaC5jbG9uZSIsIk1lc2guZ2V0U3ViTWVzaEZyb21TdWJHZW9tZXRyeSIsIk1lc2guX3BVcGRhdGVCb3hCb3VuZHMiLCJNZXNoLl9wVXBkYXRlU3BoZXJlQm91bmRzIiwiTWVzaC5vbkdlb21ldHJ5Qm91bmRzSW52YWxpZCIsIk1lc2gub25TdWJHZW9tZXRyeUFkZGVkIiwiTWVzaC5vblN1Ykdlb21ldHJ5UmVtb3ZlZCIsIk1lc2guYWRkU3ViTWVzaCIsIk1lc2guX2lUZXN0Q29sbGlzaW9uIiwiTWVzaC5faUNvbGxlY3RSZW5kZXJhYmxlcyIsIk1lc2guX2lJbnZhbGlkYXRlUmVuZGVyYWJsZUdlb21ldHJpZXMiLCJNZXNoLl9wUmVnaXN0ZXJFbnRpdHkiLCJNZXNoLl9wVW5yZWdpc3RlckVudGl0eSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUEsSUFBTyxTQUFTLFdBQWUsbUNBQW1DLENBQUMsQ0FBQztBQUlwRSxJQUFPLFFBQVEsV0FBZ0Isa0NBQWtDLENBQUMsQ0FBQztBQUtuRSxJQUFPLFVBQVUsV0FBZSxzQ0FBc0MsQ0FBQyxDQUFDO0FBQ3hFLElBQU8sc0JBQXNCLFdBQVksc0RBQXNELENBQUMsQ0FBQztBQUlqRyxJQUFPLGFBQWEsV0FBYyx5Q0FBeUMsQ0FBQyxDQUFDO0FBSTdFLEFBS0E7Ozs7R0FE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anMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsi77u/aW1wb3J0IEJveFx0XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vQm94XCIpO1xuaW1wb3J0IFVWVHJhbnNmb3JtXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1VWVHJhbnNmb3JtXCIpO1xuaW1wb3J0IEFzc2V0VHlwZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9Bc3NldFR5cGVcIik7XG5cbmltcG9ydCBJQW5pbWF0b3JcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2FuaW1hdG9ycy9JQW5pbWF0b3JcIik7XG5pbXBvcnQgRGlzcGxheU9iamVjdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvRGlzcGxheU9iamVjdFwiKTtcbmltcG9ydCBHZW9tZXRyeVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0dlb21ldHJ5XCIpO1xuaW1wb3J0IElTdWJNZXNoXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvSVN1Yk1lc2hcIik7XG5pbXBvcnQgSVN1Yk1lc2hDbGFzc1x0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvSVN1Yk1lc2hDbGFzc1wiKTtcbmltcG9ydCBUcmlhbmdsZVN1Ykdlb21ldHJ5XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvVHJpYW5nbGVTdWJHZW9tZXRyeVwiKTtcbmltcG9ydCBTdWJHZW9tZXRyeUJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL1N1Ykdlb21ldHJ5QmFzZVwiKTtcbmltcG9ydCBCb3VuZHNUeXBlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9ib3VuZHMvQm91bmRzVHlwZVwiKTtcbmltcG9ydCBEaXNwbGF5T2JqZWN0Q29udGFpbmVyXHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9jb250YWluZXJzL0Rpc3BsYXlPYmplY3RDb250YWluZXJcIik7XG5pbXBvcnQgUGFydGl0aW9uXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vUGFydGl0aW9uXCIpO1xuaW1wb3J0IEVudGl0eU5vZGVcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3BhcnRpdGlvbi9FbnRpdHlOb2RlXCIpO1xuaW1wb3J0IElSZW5kZXJlclBvb2xcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wb29sL0lSZW5kZXJlclBvb2xcIik7XG5pbXBvcnQgR2VvbWV0cnlFdmVudFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2V2ZW50cy9HZW9tZXRyeUV2ZW50XCIpO1xuaW1wb3J0IElFbnRpdHlcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZW50aXRpZXMvSUVudGl0eVwiKTtcbmltcG9ydCBNYXRlcmlhbEJhc2VcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL21hdGVyaWFscy9NYXRlcmlhbEJhc2VcIik7XG5cbi8qKlxuICogTWVzaCBpcyBhbiBpbnN0YW5jZSBvZiBhIEdlb21ldHJ5LCBhdWdtZW50aW5nIGl0IHdpdGggYSBwcmVzZW5jZSBpbiB0aGUgc2NlbmUgZ3JhcGgsIGEgbWF0ZXJpYWwsIGFuZCBhbiBhbmltYXRpb25cbiAqIHN0YXRlLiBJdCBjb25zaXN0cyBvdXQgb2YgU3ViTWVzaGVzLCB3aGljaCBpbiB0dXJuIGNvcnJlc3BvbmQgdG8gU3ViR2VvbWV0cmllcy4gU3ViTWVzaGVzIGFsbG93IGRpZmZlcmVudCBwYXJ0c1xuICogb2YgdGhlIGdlb21ldHJ5IHRvIGJlIGFzc2lnbmVkIGRpZmZlcmVudCBtYXRlcmlhbHMuXG4gKi9cbmNsYXNzIE1lc2ggZXh0ZW5kcyBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIGltcGxlbWVudHMgSUVudGl0eVxue1xuXHRwcml2YXRlIF91dlRyYW5zZm9ybTpVVlRyYW5zZm9ybTtcblxuXHRwcml2YXRlIF9zdWJNZXNoZXM6QXJyYXk8SVN1Yk1lc2g+O1xuXHRwcml2YXRlIF9nZW9tZXRyeTpHZW9tZXRyeTtcblx0cHJpdmF0ZSBfbWF0ZXJpYWw6TWF0ZXJpYWxCYXNlO1xuXHRwcml2YXRlIF9hbmltYXRvcjpJQW5pbWF0b3I7XG5cdHByaXZhdGUgX2Nhc3RzU2hhZG93czpib29sZWFuID0gdHJ1ZTtcblx0cHJpdmF0ZSBfc2hhcmVBbmltYXRpb25HZW9tZXRyeTpib29sZWFuID0gdHJ1ZTtcblxuXHRwcml2YXRlIF9vbkdlb21ldHJ5Qm91bmRzSW52YWxpZERlbGVnYXRlOihldmVudDpHZW9tZXRyeUV2ZW50KSA9PiB2b2lkO1xuXHRwcml2YXRlIF9vblN1Ykdlb21ldHJ5QWRkZWREZWxlZ2F0ZTooZXZlbnQ6R2VvbWV0cnlFdmVudCkgPT4gdm9pZDtcblx0cHJpdmF0ZSBfb25TdWJHZW9tZXRyeVJlbW92ZWREZWxlZ2F0ZTooZXZlbnQ6R2VvbWV0cnlFdmVudCkgPT4gdm9pZDtcblxuXHQvKipcblx0ICogRGVmaW5lcyB0aGUgYW5pbWF0b3Igb2YgdGhlIG1lc2guIEFjdCBvbiB0aGUgbWVzaCdzIGdlb21ldHJ5LiAgRGVmYXVsdCB2YWx1ZSBpcyA8Y29kZT5udWxsPC9jb2RlPi5cblx0ICovXG5cdHB1YmxpYyBnZXQgYW5pbWF0b3IoKTpJQW5pbWF0b3Jcblx0e1xuXHRcdHJldHVybiB0aGlzLl9hbmltYXRvcjtcblx0fVxuXG5cdHB1YmxpYyBzZXQgYW5pbWF0b3IodmFsdWU6SUFuaW1hdG9yKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2FuaW1hdG9yKVxuXHRcdFx0dGhpcy5fYW5pbWF0b3IucmVtb3ZlT3duZXIodGhpcyk7XG5cblx0XHR0aGlzLl9hbmltYXRvciA9IHZhbHVlO1xuXG5cdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9zdWJNZXNoZXMubGVuZ3RoO1xuXHRcdHZhciBzdWJNZXNoOklTdWJNZXNoO1xuXG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgbGVuOyArK2kpIHtcblx0XHRcdHN1Yk1lc2ggPSB0aGlzLl9zdWJNZXNoZXNbaV07XG5cblx0XHRcdC8vIGNhdXNlIG1hdGVyaWFsIHRvIGJlIHVucmVnaXN0ZXJlZCBhbmQgcmVnaXN0ZXJlZCBhZ2FpbiB0byB3b3JrIHdpdGggdGhlIG5ldyBhbmltYXRpb24gdHlwZSAoaWYgcG9zc2libGUpXG5cdFx0XHRpZiAoc3ViTWVzaC5tYXRlcmlhbCkge1xuXHRcdFx0XHRzdWJNZXNoLm1hdGVyaWFsLmlSZW1vdmVPd25lcihzdWJNZXNoKTtcblx0XHRcdFx0c3ViTWVzaC5tYXRlcmlhbC5pQWRkT3duZXIoc3ViTWVzaCk7XG5cdFx0XHR9XG5cblx0XHRcdC8vaW52YWxpZGF0ZSBhbnkgZXhpc3RpbmcgcmVuZGVyYWJsZXMgaW4gY2FzZSB0aGV5IG5lZWQgdG8gcHVsbCBuZXcgZ2VvbWV0cnlcblx0XHRcdHN1Yk1lc2guX2lJbnZhbGlkYXRlUmVuZGVyYWJsZUdlb21ldHJ5KCk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX2FuaW1hdG9yKVxuXHRcdFx0dGhpcy5fYW5pbWF0b3IuYWRkT3duZXIodGhpcyk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgYXNzZXRUeXBlKCk6c3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gQXNzZXRUeXBlLk1FU0g7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHdoZXRoZXIgb3Igbm90IHRoZSBNZXNoIGNhbiBjYXN0IHNoYWRvd3MuIERlZmF1bHQgdmFsdWUgaXMgPGNvZGU+dHJ1ZTwvY29kZT4uXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGNhc3RzU2hhZG93cygpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9jYXN0c1NoYWRvd3M7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGNhc3RzU2hhZG93cyh2YWx1ZTpib29sZWFuKVxuXHR7XG5cdFx0dGhpcy5fY2FzdHNTaGFkb3dzID0gdmFsdWU7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIGdlb21ldHJ5IHVzZWQgYnkgdGhlIG1lc2ggdGhhdCBwcm92aWRlcyBpdCB3aXRoIGl0cyBzaGFwZS5cblx0ICovXG5cdHB1YmxpYyBnZXQgZ2VvbWV0cnkoKTpHZW9tZXRyeVxuXHR7XG5cdFx0aWYgKHRoaXMuX2lTb3VyY2VQcmVmYWIpXG5cdFx0XHR0aGlzLl9pU291cmNlUHJlZmFiLl9pVmFsaWRhdGUoKTtcblxuXHRcdHJldHVybiB0aGlzLl9nZW9tZXRyeTtcblx0fVxuXG5cdHB1YmxpYyBzZXQgZ2VvbWV0cnkodmFsdWU6R2VvbWV0cnkpXG5cdHtcblx0XHR2YXIgaTpudW1iZXI7XG5cblx0XHRpZiAodGhpcy5fZ2VvbWV0cnkpIHtcblx0XHRcdHRoaXMuX2dlb21ldHJ5LnJlbW92ZUV2ZW50TGlzdGVuZXIoR2VvbWV0cnlFdmVudC5CT1VORFNfSU5WQUxJRCwgdGhpcy5fb25HZW9tZXRyeUJvdW5kc0ludmFsaWREZWxlZ2F0ZSk7XG5cdFx0XHR0aGlzLl9nZW9tZXRyeS5yZW1vdmVFdmVudExpc3RlbmVyKEdlb21ldHJ5RXZlbnQuU1VCX0dFT01FVFJZX0FEREVELCB0aGlzLl9vblN1Ykdlb21ldHJ5QWRkZWREZWxlZ2F0ZSk7XG5cdFx0XHR0aGlzLl9nZW9tZXRyeS5yZW1vdmVFdmVudExpc3RlbmVyKEdlb21ldHJ5RXZlbnQuU1VCX0dFT01FVFJZX1JFTU9WRUQsIHRoaXMuX29uU3ViR2VvbWV0cnlSZW1vdmVkRGVsZWdhdGUpO1xuXG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgdGhpcy5fc3ViTWVzaGVzLmxlbmd0aDsgKytpKVxuXHRcdFx0XHR0aGlzLl9zdWJNZXNoZXNbaV0uZGlzcG9zZSgpO1xuXG5cdFx0XHR0aGlzLl9zdWJNZXNoZXMubGVuZ3RoID0gMDtcblx0XHR9XG5cblx0XHR0aGlzLl9nZW9tZXRyeSA9IHZhbHVlO1xuXG5cdFx0aWYgKHRoaXMuX2dlb21ldHJ5KSB7XG5cblx0XHRcdHRoaXMuX2dlb21ldHJ5LmFkZEV2ZW50TGlzdGVuZXIoR2VvbWV0cnlFdmVudC5CT1VORFNfSU5WQUxJRCwgdGhpcy5fb25HZW9tZXRyeUJvdW5kc0ludmFsaWREZWxlZ2F0ZSk7XG5cdFx0XHR0aGlzLl9nZW9tZXRyeS5hZGRFdmVudExpc3RlbmVyKEdlb21ldHJ5RXZlbnQuU1VCX0dFT01FVFJZX0FEREVELCB0aGlzLl9vblN1Ykdlb21ldHJ5QWRkZWREZWxlZ2F0ZSk7XG5cdFx0XHR0aGlzLl9nZW9tZXRyeS5hZGRFdmVudExpc3RlbmVyKEdlb21ldHJ5RXZlbnQuU1VCX0dFT01FVFJZX1JFTU9WRUQsIHRoaXMuX29uU3ViR2VvbWV0cnlSZW1vdmVkRGVsZWdhdGUpO1xuXG5cdFx0XHR2YXIgc3ViR2VvbXM6QXJyYXk8U3ViR2VvbWV0cnlCYXNlPiA9IHRoaXMuX2dlb21ldHJ5LnN1Ykdlb21ldHJpZXM7XG5cblx0XHRcdGZvciAoaSA9IDA7IGkgPCBzdWJHZW9tcy5sZW5ndGg7ICsraSlcblx0XHRcdFx0dGhpcy5hZGRTdWJNZXNoKHN1Ykdlb21zW2ldKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogVGhlIG1hdGVyaWFsIHdpdGggd2hpY2ggdG8gcmVuZGVyIHRoZSBNZXNoLlxuXHQgKi9cblx0cHVibGljIGdldCBtYXRlcmlhbCgpOk1hdGVyaWFsQmFzZVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX21hdGVyaWFsO1xuXHR9XG5cblx0cHVibGljIHNldCBtYXRlcmlhbCh2YWx1ZTpNYXRlcmlhbEJhc2UpXG5cdHtcblx0XHRpZiAodmFsdWUgPT0gdGhpcy5fbWF0ZXJpYWwpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR2YXIgaTpudW1iZXI7XG5cdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9zdWJNZXNoZXMubGVuZ3RoO1xuXHRcdHZhciBzdWJNZXNoOklTdWJNZXNoO1xuXG5cdFx0Zm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKVxuXHRcdFx0aWYgKHRoaXMuX21hdGVyaWFsICYmIChzdWJNZXNoID0gdGhpcy5fc3ViTWVzaGVzW2ldKS5tYXRlcmlhbCA9PSB0aGlzLl9tYXRlcmlhbClcblx0XHRcdFx0dGhpcy5fbWF0ZXJpYWwuaVJlbW92ZU93bmVyKHN1Yk1lc2gpO1xuXG5cdFx0dGhpcy5fbWF0ZXJpYWwgPSB2YWx1ZTtcblxuXHRcdGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKylcblx0XHRcdGlmICh0aGlzLl9tYXRlcmlhbCAmJiAoc3ViTWVzaCA9IHRoaXMuX3N1Yk1lc2hlc1tpXSkubWF0ZXJpYWwgPT0gdGhpcy5fbWF0ZXJpYWwpXG5cdFx0XHRcdHRoaXMuX21hdGVyaWFsLmlBZGRPd25lcihzdWJNZXNoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgd2hldGhlciBvciBub3QgdGhlIG1lc2ggc2hhcmUgdGhlIHNhbWUgYW5pbWF0aW9uIGdlb21ldHJ5LlxuXHQgKi9cblx0cHVibGljIGdldCBzaGFyZUFuaW1hdGlvbkdlb21ldHJ5KCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3NoYXJlQW5pbWF0aW9uR2VvbWV0cnk7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHNoYXJlQW5pbWF0aW9uR2VvbWV0cnkodmFsdWU6Ym9vbGVhbilcblx0e1xuXHRcdHRoaXMuX3NoYXJlQW5pbWF0aW9uR2VvbWV0cnkgPSB2YWx1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgU3ViTWVzaGVzIG91dCBvZiB3aGljaCB0aGUgTWVzaCBjb25zaXN0cy4gRXZlcnkgU3ViTWVzaCBjYW4gYmUgYXNzaWduZWQgYSBtYXRlcmlhbCB0byBvdmVycmlkZSB0aGUgTWVzaCdzXG5cdCAqIG1hdGVyaWFsLlxuXHQgKi9cblx0cHVibGljIGdldCBzdWJNZXNoZXMoKTpBcnJheTxJU3ViTWVzaD5cblx0e1xuXHRcdC8vIFNpbmNlIHRoaXMgZ2V0dGVyIGlzIGludm9rZWQgZXZlcnkgaXRlcmF0aW9uIG9mIHRoZSByZW5kZXIgbG9vcCwgYW5kXG5cdFx0Ly8gdGhlIHByZWZhYiBjb25zdHJ1Y3QgY291bGQgYWZmZWN0IHRoZSBzdWItbWVzaGVzLCB0aGUgcHJlZmFiIGlzXG5cdFx0Ly8gdmFsaWRhdGVkIGhlcmUgdG8gZ2l2ZSBpdCBhIGNoYW5jZSB0byByZWJ1aWxkLlxuXHRcdGlmICh0aGlzLl9pU291cmNlUHJlZmFiKVxuXHRcdFx0dGhpcy5faVNvdXJjZVByZWZhYi5faVZhbGlkYXRlKCk7XG5cblx0XHRyZXR1cm4gdGhpcy5fc3ViTWVzaGVzO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHV2VHJhbnNmb3JtKCk6VVZUcmFuc2Zvcm1cblx0e1xuXHRcdHJldHVybiB0aGlzLl91dlRyYW5zZm9ybTtcblx0fVxuXG5cdHB1YmxpYyBzZXQgdXZUcmFuc2Zvcm0odmFsdWU6VVZUcmFuc2Zvcm0pXG5cdHtcblx0XHR0aGlzLl91dlRyYW5zZm9ybSA9IHZhbHVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZSBhIG5ldyBNZXNoIG9iamVjdC5cblx0ICpcblx0ICogQHBhcmFtIGdlb21ldHJ5ICAgICAgICAgICAgICAgICAgICBUaGUgZ2VvbWV0cnkgdXNlZCBieSB0aGUgbWVzaCB0aGF0IHByb3ZpZGVzIGl0IHdpdGggaXRzIHNoYXBlLlxuXHQgKiBAcGFyYW0gbWF0ZXJpYWwgICAgW29wdGlvbmFsXSAgICAgICAgVGhlIG1hdGVyaWFsIHdpdGggd2hpY2ggdG8gcmVuZGVyIHRoZSBNZXNoLlxuXHQgKi9cblx0Y29uc3RydWN0b3IoZ2VvbWV0cnk6R2VvbWV0cnksIG1hdGVyaWFsOk1hdGVyaWFsQmFzZSA9IG51bGwpXG5cdHtcblx0XHRzdXBlcigpO1xuXG5cdFx0dGhpcy5fcElzRW50aXR5ID0gdHJ1ZTtcblxuXHRcdHRoaXMuX3N1Yk1lc2hlcyA9IG5ldyBBcnJheTxJU3ViTWVzaD4oKTtcblxuXHRcdHRoaXMuX29uR2VvbWV0cnlCb3VuZHNJbnZhbGlkRGVsZWdhdGUgPSAoZXZlbnQ6R2VvbWV0cnlFdmVudCkgPT4gdGhpcy5vbkdlb21ldHJ5Qm91bmRzSW52YWxpZChldmVudCk7XG5cdFx0dGhpcy5fb25TdWJHZW9tZXRyeUFkZGVkRGVsZWdhdGUgPSAoZXZlbnQ6R2VvbWV0cnlFdmVudCkgPT4gdGhpcy5vblN1Ykdlb21ldHJ5QWRkZWQoZXZlbnQpO1xuXHRcdHRoaXMuX29uU3ViR2VvbWV0cnlSZW1vdmVkRGVsZWdhdGUgPSAoZXZlbnQ6R2VvbWV0cnlFdmVudCkgPT4gdGhpcy5vblN1Ykdlb21ldHJ5UmVtb3ZlZChldmVudCk7XG5cblx0XHQvL3RoaXMgc2hvdWxkIG5ldmVyIGhhcHBlbiwgYnV0IGlmIHBlb3BsZSBpbnNpc3Qgb24gdHJ5aW5nIHRvIGNyZWF0ZSB0aGVpciBtZXNoZXMgYmVmb3JlIHRoZXkgaGF2ZSBnZW9tZXRyeSB0byBmaWxsIGl0LCBpdCBiZWNvbWVzIG5lY2Vzc2FyeVxuXHRcdHRoaXMuZ2VvbWV0cnkgPSBnZW9tZXRyeSB8fCBuZXcgR2VvbWV0cnkoKTtcblxuXHRcdHRoaXMubWF0ZXJpYWwgPSBtYXRlcmlhbDtcblxuXHRcdC8vZGVmYXVsdCBib3VuZHMgdHlwZVxuXHRcdHRoaXMuX2JvdW5kc1R5cGUgPSBCb3VuZHNUeXBlLkFYSVNfQUxJR05FRF9CT1g7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBiYWtlVHJhbnNmb3JtYXRpb25zKClcblx0e1xuXHRcdHRoaXMuZ2VvbWV0cnkuYXBwbHlUcmFuc2Zvcm1hdGlvbih0aGlzLl9pTWF0cml4M0QpO1xuXHRcdHRoaXMuX2lNYXRyaXgzRC5pZGVudGl0eSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBpbmhlcml0RG9jXG5cdCAqL1xuXHRwdWJsaWMgZGlzcG9zZSgpXG5cdHtcblx0XHRzdXBlci5kaXNwb3NlKCk7XG5cblx0XHR0aGlzLm1hdGVyaWFsID0gbnVsbDtcblx0XHR0aGlzLmdlb21ldHJ5ID0gbnVsbDtcblx0fVxuXG5cdC8qKlxuXHQgKiBEaXNwb3NlcyBtZXNoIGluY2x1ZGluZyB0aGUgYW5pbWF0b3IgYW5kIGNoaWxkcmVuLiBUaGlzIGlzIGEgbWVyZWx5IGEgY29udmVuaWVuY2UgbWV0aG9kLlxuXHQgKiBAcmV0dXJuXG5cdCAqL1xuXHRwdWJsaWMgZGlzcG9zZVdpdGhBbmltYXRvckFuZENoaWxkcmVuKClcblx0e1xuXHRcdHRoaXMuZGlzcG9zZVdpdGhDaGlsZHJlbigpO1xuXG5cdFx0IGlmICh0aGlzLl9hbmltYXRvcilcblx0XHRcdHRoaXMuX2FuaW1hdG9yLmRpc3Bvc2UoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDbG9uZXMgdGhpcyBNZXNoIGluc3RhbmNlIGFsb25nIHdpdGggYWxsIGl0J3MgY2hpbGRyZW4sIHdoaWxlIHJlLXVzaW5nIHRoZSBzYW1lXG5cdCAqIG1hdGVyaWFsLCBnZW9tZXRyeSBhbmQgYW5pbWF0aW9uIHNldC4gVGhlIHJldHVybmVkIHJlc3VsdCB3aWxsIGJlIGEgY29weSBvZiB0aGlzIG1lc2gsXG5cdCAqIGNvbnRhaW5pbmcgY29waWVzIG9mIGFsbCBvZiBpdCdzIGNoaWxkcmVuLlxuXHQgKlxuXHQgKiBQcm9wZXJ0aWVzIHRoYXQgYXJlIHJlLXVzZWQgKGkuZS4gbm90IGNsb25lZCkgYnkgdGhlIG5ldyBjb3B5IGluY2x1ZGUgbmFtZSxcblx0ICogZ2VvbWV0cnksIGFuZCBtYXRlcmlhbC4gUHJvcGVydGllcyB0aGF0IGFyZSBjbG9uZWQgb3IgY3JlYXRlZCBhbmV3IGZvciB0aGUgY29weVxuXHQgKiBpbmNsdWRlIHN1Yk1lc2hlcywgY2hpbGRyZW4gb2YgdGhlIG1lc2gsIGFuZCB0aGUgYW5pbWF0b3IuXG5cdCAqXG5cdCAqIElmIHlvdSB3YW50IHRvIGNvcHkganVzdCB0aGUgbWVzaCwgcmV1c2luZyBpdCdzIGdlb21ldHJ5IGFuZCBtYXRlcmlhbCB3aGlsZSBub3Rcblx0ICogY2xvbmluZyBpdCdzIGNoaWxkcmVuLCB0aGUgc2ltcGxlc3Qgd2F5IGlzIHRvIGNyZWF0ZSBhIG5ldyBtZXNoIG1hbnVhbGx5OlxuXHQgKlxuXHQgKiA8Y29kZT5cblx0ICogdmFyIGNsb25lIDogTWVzaCA9IG5ldyBNZXNoKG9yaWdpbmFsLmdlb21ldHJ5LCBvcmlnaW5hbC5tYXRlcmlhbCk7XG5cdCAqIDwvY29kZT5cblx0ICovXG5cdHB1YmxpYyBjbG9uZSgpOkRpc3BsYXlPYmplY3Rcblx0e1xuXHRcdHZhciBjbG9uZTpNZXNoID0gbmV3IE1lc2godGhpcy5fZ2VvbWV0cnksIHRoaXMuX21hdGVyaWFsKTtcblxuXHRcdGNsb25lLl9pTWF0cml4M0QgPSB0aGlzLl9pTWF0cml4M0Q7XG5cdFx0Y2xvbmUucGl2b3QgPSB0aGlzLnBpdm90O1xuXHRcdGNsb25lLnBhcnRpdGlvbiA9IHRoaXMucGFydGl0aW9uO1xuXHRcdGNsb25lLmJvdW5kc1R5cGUgPSB0aGlzLmJvdW5kc1R5cGU7XG5cblxuXHRcdGNsb25lLm5hbWUgPSB0aGlzLm5hbWU7XG5cdFx0Y2xvbmUuY2FzdHNTaGFkb3dzID0gdGhpcy5jYXN0c1NoYWRvd3M7XG5cdFx0Y2xvbmUuc2hhcmVBbmltYXRpb25HZW9tZXRyeSA9IHRoaXMuc2hhcmVBbmltYXRpb25HZW9tZXRyeTtcblx0XHRjbG9uZS5tb3VzZUVuYWJsZWQgPSB0aGlzLm1vdXNlRW5hYmxlZDtcblx0XHRjbG9uZS5tb3VzZUNoaWxkcmVuID0gdGhpcy5tb3VzZUNoaWxkcmVuO1xuXHRcdC8vdGhpcyBpcyBvZiBjb3Vyc2Ugbm8gcHJvcGVyIGNsb25pbmdcblx0XHQvL21heWJlIHVzZSB0aGlzIGluc3RlYWQ/OiBodHRwOi8vYmxvZy5hbm90aGVyLWQtbWVudGlvbi5yby9wcm9ncmFtbWluZy9ob3ctdG8tY2xvbmUtZHVwbGljYXRlLWFuLW9iamVjdC1pbi1hY3Rpb25zY3JpcHQtMy9cblx0XHRjbG9uZS5leHRyYSA9IHRoaXMuZXh0cmE7XG5cblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX3N1Yk1lc2hlcy5sZW5ndGg7XG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgbGVuOyArK2kpXG5cdFx0XHRjbG9uZS5fc3ViTWVzaGVzW2ldLm1hdGVyaWFsID0gdGhpcy5fc3ViTWVzaGVzW2ldLl9pR2V0RXhwbGljaXRNYXRlcmlhbCgpO1xuXG5cblx0XHRsZW4gPSB0aGlzLm51bUNoaWxkcmVuO1xuXHRcdHZhciBvYmo6YW55O1xuXG5cdFx0Zm9yIChpID0gMDsgaSA8IGxlbjsgKytpKSB7XG5cdFx0XHRvYmogPSB0aGlzLmdldENoaWxkQXQoaSkuY2xvbmUoKTtcblx0XHRcdGNsb25lLmFkZENoaWxkKDxEaXNwbGF5T2JqZWN0Q29udGFpbmVyPiBvYmopO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLl9hbmltYXRvcilcblx0XHRcdGNsb25lLmFuaW1hdG9yID0gdGhpcy5fYW5pbWF0b3IuY2xvbmUoKTtcblxuXHRcdHJldHVybiBjbG9uZTtcblx0fVxuXG5cdC8qKlxuXHQgKiAvL1RPRE9cblx0ICpcblx0ICogQHBhcmFtIHN1Ykdlb21ldHJ5XG5cdCAqIEByZXR1cm5zIHtTdWJNZXNoQmFzZX1cblx0ICovXG5cdHB1YmxpYyBnZXRTdWJNZXNoRnJvbVN1Ykdlb21ldHJ5KHN1Ykdlb21ldHJ5OlN1Ykdlb21ldHJ5QmFzZSk6SVN1Yk1lc2hcblx0e1xuXHRcdHJldHVybiB0aGlzLl9zdWJNZXNoZXNbdGhpcy5fZ2VvbWV0cnkuc3ViR2VvbWV0cmllcy5pbmRleE9mKHN1Ykdlb21ldHJ5KV07XG5cdH1cblxuXHQvKipcblx0ICogLy9UT0RPXG5cdCAqXG5cdCAqIEBwcm90ZWN0ZWRcblx0ICovXG5cdHB1YmxpYyBfcFVwZGF0ZUJveEJvdW5kcygpXG5cdHtcblx0XHRzdXBlci5fcFVwZGF0ZUJveEJvdW5kcygpO1xuXG5cdFx0dmFyIGk6bnVtYmVyLCBqOm51bWJlciwgcDpudW1iZXIsIGxlbjpudW1iZXI7XG5cdFx0dmFyIHN1Ykdlb21zOkFycmF5PFN1Ykdlb21ldHJ5QmFzZT4gPSB0aGlzLl9nZW9tZXRyeS5zdWJHZW9tZXRyaWVzO1xuXHRcdHZhciBzdWJHZW9tOlN1Ykdlb21ldHJ5QmFzZTtcblx0XHR2YXIgYm91bmRpbmdQb3NpdGlvbnM6QXJyYXk8bnVtYmVyPjtcblx0XHR2YXIgbnVtU3ViR2VvbXM6bnVtYmVyID0gc3ViR2VvbXMubGVuZ3RoO1xuXHRcdHZhciBtaW5YOm51bWJlciwgbWluWTpudW1iZXIsIG1pblo6bnVtYmVyO1xuXHRcdHZhciBtYXhYOm51bWJlciwgbWF4WTpudW1iZXIsIG1heFo6bnVtYmVyO1xuXG5cdFx0aWYgKG51bVN1Ykdlb21zID4gMCkge1xuXHRcdFx0aSA9IDA7XG5cdFx0XHRzdWJHZW9tID0gc3ViR2VvbXNbMF07XG5cdFx0XHRib3VuZGluZ1Bvc2l0aW9ucyA9IHN1Ykdlb20uZ2V0Qm91bmRpbmdQb3NpdGlvbnMoKTtcblx0XHRcdG1pblggPSBtYXhYID0gYm91bmRpbmdQb3NpdGlvbnNbaV07XG5cdFx0XHRtaW5ZID0gbWF4WSA9IGJvdW5kaW5nUG9zaXRpb25zW2kgKyAxXTtcblx0XHRcdG1pblogPSBtYXhaID0gYm91bmRpbmdQb3NpdGlvbnNbaSArIDJdO1xuXG5cdFx0XHRmb3IgKGogPSAwOyBqIDwgbnVtU3ViR2VvbXM7IGorKykge1xuXHRcdFx0XHRzdWJHZW9tID0gc3ViR2VvbXNbal07XG5cdFx0XHRcdGJvdW5kaW5nUG9zaXRpb25zID0gc3ViR2VvbS5nZXRCb3VuZGluZ1Bvc2l0aW9ucygpO1xuXHRcdFx0XHRsZW4gPSBib3VuZGluZ1Bvc2l0aW9ucy5sZW5ndGg7XG5cblx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGxlbjsgaSs9Mykge1xuXHRcdFx0XHRcdHAgPSBib3VuZGluZ1Bvc2l0aW9uc1tpXTtcblx0XHRcdFx0XHRpZiAocCA8IG1pblgpXG5cdFx0XHRcdFx0XHRtaW5YID0gcDtcblx0XHRcdFx0XHRlbHNlIGlmIChwID4gbWF4WClcblx0XHRcdFx0XHRcdG1heFggPSBwO1xuXG5cdFx0XHRcdFx0cCA9IGJvdW5kaW5nUG9zaXRpb25zW2kgKyAxXTtcblxuXHRcdFx0XHRcdGlmIChwIDwgbWluWSlcblx0XHRcdFx0XHRcdG1pblkgPSBwO1xuXHRcdFx0XHRcdGVsc2UgaWYgKHAgPiBtYXhZKVxuXHRcdFx0XHRcdFx0bWF4WSA9IHA7XG5cblx0XHRcdFx0XHRwID0gYm91bmRpbmdQb3NpdGlvbnNbaSArIDJdO1xuXG5cdFx0XHRcdFx0aWYgKHAgPCBtaW5aKVxuXHRcdFx0XHRcdFx0bWluWiA9IHA7XG5cdFx0XHRcdFx0ZWxzZSBpZiAocCA+IG1heFopXG5cdFx0XHRcdFx0XHRtYXhaID0gcDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLl9wQm94Qm91bmRzLndpZHRoID0gbWF4WCAtICh0aGlzLl9wQm94Qm91bmRzLnggPSBtaW5YKTtcblx0XHRcdHRoaXMuX3BCb3hCb3VuZHMuaGVpZ2h0ID0gbWF4WSAtICh0aGlzLl9wQm94Qm91bmRzLnkgPSBtaW5ZKTtcblx0XHRcdHRoaXMuX3BCb3hCb3VuZHMuZGVwdGggPSBtYXhaIC0gKHRoaXMuX3BCb3hCb3VuZHMueiA9IG1pblopO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9wQm94Qm91bmRzLnNldEVtcHR5KCk7XG5cdFx0fVxuXHR9XG5cblxuXHRwdWJsaWMgX3BVcGRhdGVTcGhlcmVCb3VuZHMoKVxuXHR7XG5cdFx0c3VwZXIuX3BVcGRhdGVTcGhlcmVCb3VuZHMoKTtcblxuXHRcdHZhciBib3g6Qm94ID0gdGhpcy5nZXRCb3goKTtcblx0XHR2YXIgY2VudGVyWDpudW1iZXIgPSBib3gueCArIGJveC53aWR0aC8yO1xuXHRcdHZhciBjZW50ZXJZOm51bWJlciA9IGJveC55ICsgYm94LmhlaWdodC8yO1xuXHRcdHZhciBjZW50ZXJaOm51bWJlciA9IGJveC56ICsgYm94LmRlcHRoLzI7XG5cblx0XHR2YXIgaTpudW1iZXIsIGo6bnVtYmVyLCBwOm51bWJlciwgbGVuOm51bWJlcjtcblx0XHR2YXIgc3ViR2VvbXM6QXJyYXk8U3ViR2VvbWV0cnlCYXNlPiA9IHRoaXMuX2dlb21ldHJ5LnN1Ykdlb21ldHJpZXM7XG5cdFx0dmFyIHN1Ykdlb206U3ViR2VvbWV0cnlCYXNlO1xuXHRcdHZhciBib3VuZGluZ1Bvc2l0aW9uczpBcnJheTxudW1iZXI+O1xuXHRcdHZhciBudW1TdWJHZW9tczpudW1iZXIgPSBzdWJHZW9tcy5sZW5ndGg7XG5cdFx0dmFyIG1heFJhZGl1c1NxdWFyZWQ6bnVtYmVyID0gMDtcblx0XHR2YXIgcmFkaXVzU3F1YXJlZDpudW1iZXI7XG5cdFx0dmFyIGRpc3RhbmNlWDpudW1iZXI7XG5cdFx0dmFyIGRpc3RhbmNlWTpudW1iZXI7XG5cdFx0dmFyIGRpc3RhbmNlWjpudW1iZXI7XG5cblx0XHRpZiAobnVtU3ViR2VvbXMgPiAwKSB7XG5cdFx0XHRpID0gMDtcblx0XHRcdHN1Ykdlb20gPSBzdWJHZW9tc1swXTtcblx0XHRcdGJvdW5kaW5nUG9zaXRpb25zID0gc3ViR2VvbS5nZXRCb3VuZGluZ1Bvc2l0aW9ucygpO1xuXHRcdFx0Zm9yIChqID0gMDsgaiA8IG51bVN1Ykdlb21zOyBqKyspIHtcblx0XHRcdFx0c3ViR2VvbSA9IHN1Ykdlb21zW2pdO1xuXHRcdFx0XHRib3VuZGluZ1Bvc2l0aW9ucyA9IHN1Ykdlb20uZ2V0Qm91bmRpbmdQb3NpdGlvbnMoKTtcblx0XHRcdFx0bGVuID0gYm91bmRpbmdQb3NpdGlvbnMubGVuZ3RoO1xuXG5cdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBsZW47IGkgKz0gMykge1xuXHRcdFx0XHRcdGRpc3RhbmNlWCA9IGJvdW5kaW5nUG9zaXRpb25zW2ldIC0gY2VudGVyWDtcblx0XHRcdFx0XHRkaXN0YW5jZVkgPSBib3VuZGluZ1Bvc2l0aW9uc1tpICsgMV0gLSBjZW50ZXJZO1xuXHRcdFx0XHRcdGRpc3RhbmNlWiA9IGJvdW5kaW5nUG9zaXRpb25zW2kgKyAyXSAtIGNlbnRlclo7XG5cdFx0XHRcdFx0cmFkaXVzU3F1YXJlZCA9IGRpc3RhbmNlWCpkaXN0YW5jZVggKyBkaXN0YW5jZVkqZGlzdGFuY2VZICsgZGlzdGFuY2VaKmRpc3RhbmNlWjtcblxuXHRcdFx0XHRcdGlmIChtYXhSYWRpdXNTcXVhcmVkIDwgcmFkaXVzU3F1YXJlZClcblx0XHRcdFx0XHRcdG1heFJhZGl1c1NxdWFyZWQgPSByYWRpdXNTcXVhcmVkO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpcy5fcFNwaGVyZUJvdW5kcy54ID0gY2VudGVyWDtcblx0XHR0aGlzLl9wU3BoZXJlQm91bmRzLnkgPSBjZW50ZXJZO1xuXHRcdHRoaXMuX3BTcGhlcmVCb3VuZHMueiA9IGNlbnRlclo7XG5cdFx0dGhpcy5fcFNwaGVyZUJvdW5kcy5yYWRpdXMgPSBNYXRoLnNxcnQobWF4UmFkaXVzU3F1YXJlZCk7XG5cdH1cblxuXHQvKipcblx0ICogLy9UT0RPXG5cdCAqXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRwcml2YXRlIG9uR2VvbWV0cnlCb3VuZHNJbnZhbGlkKGV2ZW50Okdlb21ldHJ5RXZlbnQpXG5cdHtcblx0XHR0aGlzLl9wSW52YWxpZGF0ZUJvdW5kcygpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENhbGxlZCB3aGVuIGEgU3ViR2VvbWV0cnkgd2FzIGFkZGVkIHRvIHRoZSBHZW9tZXRyeS5cblx0ICpcblx0ICogQHByaXZhdGVcblx0ICovXG5cdHByaXZhdGUgb25TdWJHZW9tZXRyeUFkZGVkKGV2ZW50Okdlb21ldHJ5RXZlbnQpXG5cdHtcblx0XHR0aGlzLmFkZFN1Yk1lc2goZXZlbnQuc3ViR2VvbWV0cnkpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENhbGxlZCB3aGVuIGEgU3ViR2VvbWV0cnkgd2FzIHJlbW92ZWQgZnJvbSB0aGUgR2VvbWV0cnkuXG5cdCAqXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRwcml2YXRlIG9uU3ViR2VvbWV0cnlSZW1vdmVkKGV2ZW50Okdlb21ldHJ5RXZlbnQpXG5cdHtcblx0XHR2YXIgc3ViTWVzaDpJU3ViTWVzaDtcblx0XHR2YXIgc3ViR2VvbTpTdWJHZW9tZXRyeUJhc2UgPSBldmVudC5zdWJHZW9tZXRyeTtcblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX3N1Yk1lc2hlcy5sZW5ndGg7XG5cdFx0dmFyIGk6bnVtYmVyO1xuXG5cdFx0Ly8gSW1wb3J0YW50ISBUaGlzIGhhcyB0byBiZSBkb25lIGhlcmUsIGFuZCBub3QgZGVsYXllZCB1bnRpbCB0aGVcblx0XHQvLyBuZXh0IHJlbmRlciBsb29wLCBzaW5jZSB0aGlzIG1heSBiZSBjYXVzZWQgYnkgdGhlIGdlb21ldHJ5IGJlaW5nXG5cdFx0Ly8gcmVidWlsdCBJTiBUSEUgUkVOREVSIExPT1AuIEludmFsaWRhdGluZyBhbmQgd2FpdGluZyB3aWxsIGRlbGF5XG5cdFx0Ly8gaXQgdW50aWwgdGhlIE5FWFQgUkVOREVSIEZSQU1FIHdoaWNoIGlzIHByb2JhYmx5IG5vdCBkZXNpcmFibGUuXG5cdFx0Zm9yIChpID0gMDsgaSA8IGxlbjsgKytpKSB7XG5cblx0XHRcdHN1Yk1lc2ggPSB0aGlzLl9zdWJNZXNoZXNbaV07XG5cblx0XHRcdGlmIChzdWJNZXNoLnN1Ykdlb21ldHJ5ID09IHN1Ykdlb20pIHtcblx0XHRcdFx0c3ViTWVzaC5kaXNwb3NlKCk7XG5cblx0XHRcdFx0dGhpcy5fc3ViTWVzaGVzLnNwbGljZShpLCAxKTtcblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cblx0XHQtLWxlbjtcblx0XHRmb3IgKDsgaSA8IGxlbjsgKytpKVxuXHRcdFx0dGhpcy5fc3ViTWVzaGVzW2ldLl9pSW5kZXggPSBpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFkZHMgYSBTdWJNZXNoQmFzZSB3cmFwcGluZyBhIFN1Ykdlb21ldHJ5LlxuXHQgKlxuXHQgKiBAcGFyYW0gc3ViR2VvbWV0cnlcblx0ICovXG5cdHByaXZhdGUgYWRkU3ViTWVzaChzdWJHZW9tZXRyeTpTdWJHZW9tZXRyeUJhc2UpXG5cdHtcblx0XHR2YXIgU3ViTWVzaENsYXNzOklTdWJNZXNoQ2xhc3MgPSBzdWJHZW9tZXRyeS5zdWJNZXNoQ2xhc3M7XG5cblx0XHR2YXIgc3ViTWVzaDpJU3ViTWVzaCA9IG5ldyBTdWJNZXNoQ2xhc3Moc3ViR2VvbWV0cnksIHRoaXMsIG51bGwpO1xuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fc3ViTWVzaGVzLmxlbmd0aDtcblxuXHRcdHN1Yk1lc2guX2lJbmRleCA9IGxlbjtcblxuXHRcdHRoaXMuX3N1Yk1lc2hlc1tsZW5dID0gc3ViTWVzaDtcblxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlQm91bmRzKCk7XG5cdH1cblxuXHQvKipcblx0ICogLy9UT0RPXG5cdCAqXG5cdCAqIEBwYXJhbSBzaG9ydGVzdENvbGxpc2lvbkRpc3RhbmNlXG5cdCAqIEBwYXJhbSBmaW5kQ2xvc2VzdFxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cblx0ICpcblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwdWJsaWMgX2lUZXN0Q29sbGlzaW9uKHNob3J0ZXN0Q29sbGlzaW9uRGlzdGFuY2U6bnVtYmVyLCBmaW5kQ2xvc2VzdDpib29sZWFuKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcFBpY2tpbmdDb2xsaWRlci50ZXN0TWVzaENvbGxpc2lvbih0aGlzLCB0aGlzLl9wUGlja2luZ0NvbGxpc2lvblZPLCBzaG9ydGVzdENvbGxpc2lvbkRpc3RhbmNlLCBmaW5kQ2xvc2VzdCk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICogQHBhcmFtIHJlbmRlcmVyXG5cdCAqXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHVibGljIF9pQ29sbGVjdFJlbmRlcmFibGVzKHJlbmRlcmVyUG9vbDpJUmVuZGVyZXJQb29sKVxuXHR7XG5cdFx0Ly8gU2luY2UgdGhpcyBnZXR0ZXIgaXMgaW52b2tlZCBldmVyeSBpdGVyYXRpb24gb2YgdGhlIHJlbmRlciBsb29wLCBhbmRcblx0XHQvLyB0aGUgcHJlZmFiIGNvbnN0cnVjdCBjb3VsZCBhZmZlY3QgdGhlIHN1Yi1tZXNoZXMsIHRoZSBwcmVmYWIgaXNcblx0XHQvLyB2YWxpZGF0ZWQgaGVyZSB0byBnaXZlIGl0IGEgY2hhbmNlIHRvIHJlYnVpbGQuXG5cdFx0aWYgKHRoaXMuX2lTb3VyY2VQcmVmYWIpXG5cdFx0XHR0aGlzLl9pU291cmNlUHJlZmFiLl9pVmFsaWRhdGUoKTtcblxuXHRcdHZhciBsZW46bnVtYmVyIC8qdWludCovID0gdGhpcy5fc3ViTWVzaGVzLmxlbmd0aDtcblx0XHRmb3IgKHZhciBpOm51bWJlciAvKnVpbnQqLyA9IDA7IGkgPCBsZW47IGkrKylcblx0XHRcdHRoaXMuX3N1Yk1lc2hlc1tpXS5faUNvbGxlY3RSZW5kZXJhYmxlKHJlbmRlcmVyUG9vbCk7XG5cdH1cblxuXHRwdWJsaWMgX2lJbnZhbGlkYXRlUmVuZGVyYWJsZUdlb21ldHJpZXMoKVxuXHR7XG5cdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9zdWJNZXNoZXMubGVuZ3RoO1xuXHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IGxlbjsgKytpKVxuXHRcdFx0dGhpcy5fc3ViTWVzaGVzW2ldLl9pSW52YWxpZGF0ZVJlbmRlcmFibGVHZW9tZXRyeSgpO1xuXHR9XG5cblx0cHVibGljIF9wUmVnaXN0ZXJFbnRpdHkocGFydGl0aW9uOlBhcnRpdGlvbilcblx0e1xuXHRcdHBhcnRpdGlvbi5faVJlZ2lzdGVyRW50aXR5KHRoaXMpO1xuXHR9XG5cblx0cHVibGljIF9wVW5yZWdpc3RlckVudGl0eShwYXJ0aXRpb246UGFydGl0aW9uKVxuXHR7XG5cdFx0cGFydGl0aW9uLl9pVW5yZWdpc3RlckVudGl0eSh0aGlzKTtcblx0fVxufVxuXG5leHBvcnQgPSBNZXNoOyJdfQ==