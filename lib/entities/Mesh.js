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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9tZXNoLnRzIl0sIm5hbWVzIjpbIk1lc2giLCJNZXNoLmNvbnN0cnVjdG9yIiwiTWVzaC5hbmltYXRvciIsIk1lc2guYXNzZXRUeXBlIiwiTWVzaC5jYXN0c1NoYWRvd3MiLCJNZXNoLmdlb21ldHJ5IiwiTWVzaC5tYXRlcmlhbCIsIk1lc2guc2hhcmVBbmltYXRpb25HZW9tZXRyeSIsIk1lc2guc3ViTWVzaGVzIiwiTWVzaC51dlRyYW5zZm9ybSIsIk1lc2guYmFrZVRyYW5zZm9ybWF0aW9ucyIsIk1lc2guZGlzcG9zZSIsIk1lc2guZGlzcG9zZVdpdGhBbmltYXRvckFuZENoaWxkcmVuIiwiTWVzaC5jbG9uZSIsIk1lc2guZ2V0U3ViTWVzaEZyb21TdWJHZW9tZXRyeSIsIk1lc2gucENyZWF0ZUVudGl0eVBhcnRpdGlvbk5vZGUiLCJNZXNoLnBVcGRhdGVCb3VuZHMiLCJNZXNoLm9uR2VvbWV0cnlCb3VuZHNJbnZhbGlkIiwiTWVzaC5vblN1Ykdlb21ldHJ5QWRkZWQiLCJNZXNoLm9uU3ViR2VvbWV0cnlSZW1vdmVkIiwiTWVzaC5hZGRTdWJNZXNoIiwiTWVzaC5faVRlc3RDb2xsaXNpb24iLCJNZXNoLl9pQ29sbGVjdFJlbmRlcmFibGVzIiwiTWVzaC5faUludmFsaWRhdGVSZW5kZXJhYmxlR2VvbWV0cmllcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsSUFBTyxTQUFTLFdBQWUsbUNBQW1DLENBQUMsQ0FBQztBQUlwRSxJQUFPLFFBQVEsV0FBZ0Isa0NBQWtDLENBQUMsQ0FBQztBQUtuRSxJQUFPLHNCQUFzQixXQUFZLHNEQUFzRCxDQUFDLENBQUM7QUFDakcsSUFBTyxVQUFVLFdBQWUseUNBQXlDLENBQUMsQ0FBQztBQUUzRSxJQUFPLGFBQWEsV0FBYyx5Q0FBeUMsQ0FBQyxDQUFDO0FBSTdFLEFBS0E7Ozs7R0FERztJQUNHLElBQUk7SUFBU0EsVUFBYkEsSUFBSUEsVUFBK0JBO0lBcUx4Q0E7Ozs7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Z0NBLEdBQXZDQTtRQUVDdUIsSUFBSUEsR0FBR0EsR0FBVUEsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7UUFDeENBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQVVBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLEdBQUdBLEVBQUVBLEVBQUVBLENBQUNBO1lBQ2xDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSw4QkFBOEJBLEVBQUVBLENBQUNBO0lBQ3REQSxDQUFDQTtJQUNGdkIsV0FBQ0E7QUFBREEsQ0FqZUEsQUFpZUNBLEVBamVrQixzQkFBc0IsRUFpZXhDO0FBRUQsQUFBYyxpQkFBTCxJQUFJLENBQUMiLCJmaWxlIjoiZW50aXRpZXMvTWVzaC5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyLvu79pbXBvcnQgVVZUcmFuc2Zvcm1cdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vVVZUcmFuc2Zvcm1cIik7XG5pbXBvcnQgQXNzZXRUeXBlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0Fzc2V0VHlwZVwiKTtcblxuaW1wb3J0IElBbmltYXRvclx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYW5pbWF0b3JzL0lBbmltYXRvclwiKTtcbmltcG9ydCBEaXNwbGF5T2JqZWN0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9EaXNwbGF5T2JqZWN0XCIpO1xuaW1wb3J0IEdlb21ldHJ5XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvR2VvbWV0cnlcIik7XG5pbXBvcnQgSVN1Yk1lc2hcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9JU3ViTWVzaFwiKTtcbmltcG9ydCBJU3ViTWVzaENsYXNzXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9JU3ViTWVzaENsYXNzXCIpO1xuaW1wb3J0IFRyaWFuZ2xlU3ViR2VvbWV0cnlcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9UcmlhbmdsZVN1Ykdlb21ldHJ5XCIpO1xuaW1wb3J0IFN1Ykdlb21ldHJ5QmFzZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvU3ViR2VvbWV0cnlCYXNlXCIpO1xuaW1wb3J0IERpc3BsYXlPYmplY3RDb250YWluZXJcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2NvbnRhaW5lcnMvRGlzcGxheU9iamVjdENvbnRhaW5lclwiKTtcbmltcG9ydCBFbnRpdHlOb2RlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vRW50aXR5Tm9kZVwiKTtcbmltcG9ydCBJUmVuZGVyZXJQb29sXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcG9vbC9JUmVuZGVyZXJQb29sXCIpO1xuaW1wb3J0IEdlb21ldHJ5RXZlbnRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9ldmVudHMvR2VvbWV0cnlFdmVudFwiKTtcbmltcG9ydCBJRW50aXR5XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2VudGl0aWVzL0lFbnRpdHlcIik7XG5pbXBvcnQgTWF0ZXJpYWxCYXNlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9tYXRlcmlhbHMvTWF0ZXJpYWxCYXNlXCIpO1xuXG4vKipcbiAqIE1lc2ggaXMgYW4gaW5zdGFuY2Ugb2YgYSBHZW9tZXRyeSwgYXVnbWVudGluZyBpdCB3aXRoIGEgcHJlc2VuY2UgaW4gdGhlIHNjZW5lIGdyYXBoLCBhIG1hdGVyaWFsLCBhbmQgYW4gYW5pbWF0aW9uXG4gKiBzdGF0ZS4gSXQgY29uc2lzdHMgb3V0IG9mIFN1Yk1lc2hlcywgd2hpY2ggaW4gdHVybiBjb3JyZXNwb25kIHRvIFN1Ykdlb21ldHJpZXMuIFN1Yk1lc2hlcyBhbGxvdyBkaWZmZXJlbnQgcGFydHNcbiAqIG9mIHRoZSBnZW9tZXRyeSB0byBiZSBhc3NpZ25lZCBkaWZmZXJlbnQgbWF0ZXJpYWxzLlxuICovXG5jbGFzcyBNZXNoIGV4dGVuZHMgRGlzcGxheU9iamVjdENvbnRhaW5lciBpbXBsZW1lbnRzIElFbnRpdHlcbntcblx0cHJpdmF0ZSBfdXZUcmFuc2Zvcm06VVZUcmFuc2Zvcm07XG5cblx0cHJpdmF0ZSBfc3ViTWVzaGVzOkFycmF5PElTdWJNZXNoPjtcblx0cHJpdmF0ZSBfZ2VvbWV0cnk6R2VvbWV0cnk7XG5cdHByaXZhdGUgX21hdGVyaWFsOk1hdGVyaWFsQmFzZTtcblx0cHJpdmF0ZSBfYW5pbWF0b3I6SUFuaW1hdG9yO1xuXHRwcml2YXRlIF9jYXN0c1NoYWRvd3M6Ym9vbGVhbiA9IHRydWU7XG5cdHByaXZhdGUgX3NoYXJlQW5pbWF0aW9uR2VvbWV0cnk6Ym9vbGVhbiA9IHRydWU7XG5cblx0cHJpdmF0ZSBfb25HZW9tZXRyeUJvdW5kc0ludmFsaWREZWxlZ2F0ZTooZXZlbnQ6R2VvbWV0cnlFdmVudCkgPT4gdm9pZDtcblx0cHJpdmF0ZSBfb25TdWJHZW9tZXRyeUFkZGVkRGVsZWdhdGU6KGV2ZW50Okdlb21ldHJ5RXZlbnQpID0+IHZvaWQ7XG5cdHByaXZhdGUgX29uU3ViR2VvbWV0cnlSZW1vdmVkRGVsZWdhdGU6KGV2ZW50Okdlb21ldHJ5RXZlbnQpID0+IHZvaWQ7XG5cblx0LyoqXG5cdCAqIERlZmluZXMgdGhlIGFuaW1hdG9yIG9mIHRoZSBtZXNoLiBBY3Qgb24gdGhlIG1lc2gncyBnZW9tZXRyeS4gIERlZmF1bHQgdmFsdWUgaXMgPGNvZGU+bnVsbDwvY29kZT4uXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGFuaW1hdG9yKCk6SUFuaW1hdG9yXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fYW5pbWF0b3I7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGFuaW1hdG9yKHZhbHVlOklBbmltYXRvcilcblx0e1xuXHRcdGlmICh0aGlzLl9hbmltYXRvcilcblx0XHRcdHRoaXMuX2FuaW1hdG9yLnJlbW92ZU93bmVyKHRoaXMpO1xuXG5cdFx0dGhpcy5fYW5pbWF0b3IgPSB2YWx1ZTtcblxuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fc3ViTWVzaGVzLmxlbmd0aDtcblx0XHR2YXIgc3ViTWVzaDpJU3ViTWVzaDtcblxuXHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IGxlbjsgKytpKSB7XG5cdFx0XHRzdWJNZXNoID0gdGhpcy5fc3ViTWVzaGVzW2ldO1xuXG5cdFx0XHQvLyBjYXVzZSBtYXRlcmlhbCB0byBiZSB1bnJlZ2lzdGVyZWQgYW5kIHJlZ2lzdGVyZWQgYWdhaW4gdG8gd29yayB3aXRoIHRoZSBuZXcgYW5pbWF0aW9uIHR5cGUgKGlmIHBvc3NpYmxlKVxuXHRcdFx0aWYgKHN1Yk1lc2gubWF0ZXJpYWwpIHtcblx0XHRcdFx0c3ViTWVzaC5tYXRlcmlhbC5pUmVtb3ZlT3duZXIoc3ViTWVzaCk7XG5cdFx0XHRcdHN1Yk1lc2gubWF0ZXJpYWwuaUFkZE93bmVyKHN1Yk1lc2gpO1xuXHRcdFx0fVxuXG5cdFx0XHQvL2ludmFsaWRhdGUgYW55IGV4aXN0aW5nIHJlbmRlcmFibGVzIGluIGNhc2UgdGhleSBuZWVkIHRvIHB1bGwgbmV3IGdlb21ldHJ5XG5cdFx0XHRzdWJNZXNoLl9pSW52YWxpZGF0ZVJlbmRlcmFibGVHZW9tZXRyeSgpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLl9hbmltYXRvcilcblx0XHRcdHRoaXMuX2FuaW1hdG9yLmFkZE93bmVyKHRoaXMpO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGFzc2V0VHlwZSgpOnN0cmluZ1xuXHR7XG5cdFx0cmV0dXJuIEFzc2V0VHlwZS5NRVNIO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB3aGV0aGVyIG9yIG5vdCB0aGUgTWVzaCBjYW4gY2FzdCBzaGFkb3dzLiBEZWZhdWx0IHZhbHVlIGlzIDxjb2RlPnRydWU8L2NvZGU+LlxuXHQgKi9cblx0cHVibGljIGdldCBjYXN0c1NoYWRvd3MoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fY2FzdHNTaGFkb3dzO1xuXHR9XG5cblx0cHVibGljIHNldCBjYXN0c1NoYWRvd3ModmFsdWU6Ym9vbGVhbilcblx0e1xuXHRcdHRoaXMuX2Nhc3RzU2hhZG93cyA9IHZhbHVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBnZW9tZXRyeSB1c2VkIGJ5IHRoZSBtZXNoIHRoYXQgcHJvdmlkZXMgaXQgd2l0aCBpdHMgc2hhcGUuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGdlb21ldHJ5KCk6R2VvbWV0cnlcblx0e1xuXHRcdGlmICh0aGlzLl9pU291cmNlUHJlZmFiKVxuXHRcdFx0dGhpcy5faVNvdXJjZVByZWZhYi5faVZhbGlkYXRlKCk7XG5cblx0XHRyZXR1cm4gdGhpcy5fZ2VvbWV0cnk7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGdlb21ldHJ5KHZhbHVlOkdlb21ldHJ5KVxuXHR7XG5cdFx0dmFyIGk6bnVtYmVyO1xuXG5cdFx0aWYgKHRoaXMuX2dlb21ldHJ5KSB7XG5cdFx0XHR0aGlzLl9nZW9tZXRyeS5yZW1vdmVFdmVudExpc3RlbmVyKEdlb21ldHJ5RXZlbnQuQk9VTkRTX0lOVkFMSUQsIHRoaXMuX29uR2VvbWV0cnlCb3VuZHNJbnZhbGlkRGVsZWdhdGUpO1xuXHRcdFx0dGhpcy5fZ2VvbWV0cnkucmVtb3ZlRXZlbnRMaXN0ZW5lcihHZW9tZXRyeUV2ZW50LlNVQl9HRU9NRVRSWV9BRERFRCwgdGhpcy5fb25TdWJHZW9tZXRyeUFkZGVkRGVsZWdhdGUpO1xuXHRcdFx0dGhpcy5fZ2VvbWV0cnkucmVtb3ZlRXZlbnRMaXN0ZW5lcihHZW9tZXRyeUV2ZW50LlNVQl9HRU9NRVRSWV9SRU1PVkVELCB0aGlzLl9vblN1Ykdlb21ldHJ5UmVtb3ZlZERlbGVnYXRlKTtcblxuXHRcdFx0Zm9yIChpID0gMDsgaSA8IHRoaXMuX3N1Yk1lc2hlcy5sZW5ndGg7ICsraSlcblx0XHRcdFx0dGhpcy5fc3ViTWVzaGVzW2ldLmRpc3Bvc2UoKTtcblxuXHRcdFx0dGhpcy5fc3ViTWVzaGVzLmxlbmd0aCA9IDA7XG5cdFx0fVxuXG5cdFx0dGhpcy5fZ2VvbWV0cnkgPSB2YWx1ZTtcblxuXHRcdGlmICh0aGlzLl9nZW9tZXRyeSkge1xuXG5cdFx0XHR0aGlzLl9nZW9tZXRyeS5hZGRFdmVudExpc3RlbmVyKEdlb21ldHJ5RXZlbnQuQk9VTkRTX0lOVkFMSUQsIHRoaXMuX29uR2VvbWV0cnlCb3VuZHNJbnZhbGlkRGVsZWdhdGUpO1xuXHRcdFx0dGhpcy5fZ2VvbWV0cnkuYWRkRXZlbnRMaXN0ZW5lcihHZW9tZXRyeUV2ZW50LlNVQl9HRU9NRVRSWV9BRERFRCwgdGhpcy5fb25TdWJHZW9tZXRyeUFkZGVkRGVsZWdhdGUpO1xuXHRcdFx0dGhpcy5fZ2VvbWV0cnkuYWRkRXZlbnRMaXN0ZW5lcihHZW9tZXRyeUV2ZW50LlNVQl9HRU9NRVRSWV9SRU1PVkVELCB0aGlzLl9vblN1Ykdlb21ldHJ5UmVtb3ZlZERlbGVnYXRlKTtcblxuXHRcdFx0dmFyIHN1Ykdlb21zOkFycmF5PFN1Ykdlb21ldHJ5QmFzZT4gPSB0aGlzLl9nZW9tZXRyeS5zdWJHZW9tZXRyaWVzO1xuXG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgc3ViR2VvbXMubGVuZ3RoOyArK2kpXG5cdFx0XHRcdHRoaXMuYWRkU3ViTWVzaChzdWJHZW9tc1tpXSk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBtYXRlcmlhbCB3aXRoIHdoaWNoIHRvIHJlbmRlciB0aGUgTWVzaC5cblx0ICovXG5cdHB1YmxpYyBnZXQgbWF0ZXJpYWwoKTpNYXRlcmlhbEJhc2Vcblx0e1xuXHRcdHJldHVybiB0aGlzLl9tYXRlcmlhbDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgbWF0ZXJpYWwodmFsdWU6TWF0ZXJpYWxCYXNlKVxuXHR7XG5cdFx0aWYgKHZhbHVlID09IHRoaXMuX21hdGVyaWFsKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dmFyIGk6bnVtYmVyO1xuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fc3ViTWVzaGVzLmxlbmd0aDtcblx0XHR2YXIgc3ViTWVzaDpJU3ViTWVzaDtcblxuXHRcdGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKylcblx0XHRcdGlmICh0aGlzLl9tYXRlcmlhbCAmJiAoc3ViTWVzaCA9IHRoaXMuX3N1Yk1lc2hlc1tpXSkubWF0ZXJpYWwgPT0gdGhpcy5fbWF0ZXJpYWwpXG5cdFx0XHRcdHRoaXMuX21hdGVyaWFsLmlSZW1vdmVPd25lcihzdWJNZXNoKTtcblxuXHRcdHRoaXMuX21hdGVyaWFsID0gdmFsdWU7XG5cblx0XHRmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspXG5cdFx0XHRpZiAodGhpcy5fbWF0ZXJpYWwgJiYgKHN1Yk1lc2ggPSB0aGlzLl9zdWJNZXNoZXNbaV0pLm1hdGVyaWFsID09IHRoaXMuX21hdGVyaWFsKVxuXHRcdFx0XHR0aGlzLl9tYXRlcmlhbC5pQWRkT3duZXIoc3ViTWVzaCk7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHdoZXRoZXIgb3Igbm90IHRoZSBtZXNoIHNoYXJlIHRoZSBzYW1lIGFuaW1hdGlvbiBnZW9tZXRyeS5cblx0ICovXG5cdHB1YmxpYyBnZXQgc2hhcmVBbmltYXRpb25HZW9tZXRyeSgpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9zaGFyZUFuaW1hdGlvbkdlb21ldHJ5O1xuXHR9XG5cblx0cHVibGljIHNldCBzaGFyZUFuaW1hdGlvbkdlb21ldHJ5KHZhbHVlOmJvb2xlYW4pXG5cdHtcblx0XHR0aGlzLl9zaGFyZUFuaW1hdGlvbkdlb21ldHJ5ID0gdmFsdWU7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIFN1Yk1lc2hlcyBvdXQgb2Ygd2hpY2ggdGhlIE1lc2ggY29uc2lzdHMuIEV2ZXJ5IFN1Yk1lc2ggY2FuIGJlIGFzc2lnbmVkIGEgbWF0ZXJpYWwgdG8gb3ZlcnJpZGUgdGhlIE1lc2gnc1xuXHQgKiBtYXRlcmlhbC5cblx0ICovXG5cdHB1YmxpYyBnZXQgc3ViTWVzaGVzKCk6QXJyYXk8SVN1Yk1lc2g+XG5cdHtcblx0XHQvLyBTaW5jZSB0aGlzIGdldHRlciBpcyBpbnZva2VkIGV2ZXJ5IGl0ZXJhdGlvbiBvZiB0aGUgcmVuZGVyIGxvb3AsIGFuZFxuXHRcdC8vIHRoZSBwcmVmYWIgY29uc3RydWN0IGNvdWxkIGFmZmVjdCB0aGUgc3ViLW1lc2hlcywgdGhlIHByZWZhYiBpc1xuXHRcdC8vIHZhbGlkYXRlZCBoZXJlIHRvIGdpdmUgaXQgYSBjaGFuY2UgdG8gcmVidWlsZC5cblx0XHRpZiAodGhpcy5faVNvdXJjZVByZWZhYilcblx0XHRcdHRoaXMuX2lTb3VyY2VQcmVmYWIuX2lWYWxpZGF0ZSgpO1xuXG5cdFx0cmV0dXJuIHRoaXMuX3N1Yk1lc2hlcztcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCB1dlRyYW5zZm9ybSgpOlVWVHJhbnNmb3JtXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fdXZUcmFuc2Zvcm07XG5cdH1cblxuXHRwdWJsaWMgc2V0IHV2VHJhbnNmb3JtKHZhbHVlOlVWVHJhbnNmb3JtKVxuXHR7XG5cdFx0dGhpcy5fdXZUcmFuc2Zvcm0gPSB2YWx1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGUgYSBuZXcgTWVzaCBvYmplY3QuXG5cdCAqXG5cdCAqIEBwYXJhbSBnZW9tZXRyeSAgICAgICAgICAgICAgICAgICAgVGhlIGdlb21ldHJ5IHVzZWQgYnkgdGhlIG1lc2ggdGhhdCBwcm92aWRlcyBpdCB3aXRoIGl0cyBzaGFwZS5cblx0ICogQHBhcmFtIG1hdGVyaWFsICAgIFtvcHRpb25hbF0gICAgICAgIFRoZSBtYXRlcmlhbCB3aXRoIHdoaWNoIHRvIHJlbmRlciB0aGUgTWVzaC5cblx0ICovXG5cdGNvbnN0cnVjdG9yKGdlb21ldHJ5Okdlb21ldHJ5LCBtYXRlcmlhbDpNYXRlcmlhbEJhc2UgPSBudWxsKVxuXHR7XG5cdFx0c3VwZXIoKTtcblxuXHRcdHRoaXMuX3BJc0VudGl0eSA9IHRydWU7XG5cblx0XHR0aGlzLl9zdWJNZXNoZXMgPSBuZXcgQXJyYXk8SVN1Yk1lc2g+KCk7XG5cblx0XHR0aGlzLl9vbkdlb21ldHJ5Qm91bmRzSW52YWxpZERlbGVnYXRlID0gKGV2ZW50Okdlb21ldHJ5RXZlbnQpID0+IHRoaXMub25HZW9tZXRyeUJvdW5kc0ludmFsaWQoZXZlbnQpO1xuXHRcdHRoaXMuX29uU3ViR2VvbWV0cnlBZGRlZERlbGVnYXRlID0gKGV2ZW50Okdlb21ldHJ5RXZlbnQpID0+IHRoaXMub25TdWJHZW9tZXRyeUFkZGVkKGV2ZW50KTtcblx0XHR0aGlzLl9vblN1Ykdlb21ldHJ5UmVtb3ZlZERlbGVnYXRlID0gKGV2ZW50Okdlb21ldHJ5RXZlbnQpID0+IHRoaXMub25TdWJHZW9tZXRyeVJlbW92ZWQoZXZlbnQpO1xuXG5cdFx0Ly90aGlzIHNob3VsZCBuZXZlciBoYXBwZW4sIGJ1dCBpZiBwZW9wbGUgaW5zaXN0IG9uIHRyeWluZyB0byBjcmVhdGUgdGhlaXIgbWVzaGVzIGJlZm9yZSB0aGV5IGhhdmUgZ2VvbWV0cnkgdG8gZmlsbCBpdCwgaXQgYmVjb21lcyBuZWNlc3Nhcnlcblx0XHR0aGlzLmdlb21ldHJ5ID0gZ2VvbWV0cnkgfHwgbmV3IEdlb21ldHJ5KCk7XG5cblx0XHR0aGlzLm1hdGVyaWFsID0gbWF0ZXJpYWw7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBiYWtlVHJhbnNmb3JtYXRpb25zKClcblx0e1xuXHRcdHRoaXMuZ2VvbWV0cnkuYXBwbHlUcmFuc2Zvcm1hdGlvbih0aGlzLl9pTWF0cml4M0QpO1xuXHRcdHRoaXMuX2lNYXRyaXgzRC5pZGVudGl0eSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBpbmhlcml0RG9jXG5cdCAqL1xuXHRwdWJsaWMgZGlzcG9zZSgpXG5cdHtcblx0XHRzdXBlci5kaXNwb3NlKCk7XG5cblx0XHR0aGlzLm1hdGVyaWFsID0gbnVsbDtcblx0XHR0aGlzLmdlb21ldHJ5ID0gbnVsbDtcblx0fVxuXG5cdC8qKlxuXHQgKiBEaXNwb3NlcyBtZXNoIGluY2x1ZGluZyB0aGUgYW5pbWF0b3IgYW5kIGNoaWxkcmVuLiBUaGlzIGlzIGEgbWVyZWx5IGEgY29udmVuaWVuY2UgbWV0aG9kLlxuXHQgKiBAcmV0dXJuXG5cdCAqL1xuXHRwdWJsaWMgZGlzcG9zZVdpdGhBbmltYXRvckFuZENoaWxkcmVuKClcblx0e1xuXHRcdHRoaXMuZGlzcG9zZVdpdGhDaGlsZHJlbigpO1xuXG5cdFx0IGlmICh0aGlzLl9hbmltYXRvcilcblx0XHRcdHRoaXMuX2FuaW1hdG9yLmRpc3Bvc2UoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDbG9uZXMgdGhpcyBNZXNoIGluc3RhbmNlIGFsb25nIHdpdGggYWxsIGl0J3MgY2hpbGRyZW4sIHdoaWxlIHJlLXVzaW5nIHRoZSBzYW1lXG5cdCAqIG1hdGVyaWFsLCBnZW9tZXRyeSBhbmQgYW5pbWF0aW9uIHNldC4gVGhlIHJldHVybmVkIHJlc3VsdCB3aWxsIGJlIGEgY29weSBvZiB0aGlzIG1lc2gsXG5cdCAqIGNvbnRhaW5pbmcgY29waWVzIG9mIGFsbCBvZiBpdCdzIGNoaWxkcmVuLlxuXHQgKlxuXHQgKiBQcm9wZXJ0aWVzIHRoYXQgYXJlIHJlLXVzZWQgKGkuZS4gbm90IGNsb25lZCkgYnkgdGhlIG5ldyBjb3B5IGluY2x1ZGUgbmFtZSxcblx0ICogZ2VvbWV0cnksIGFuZCBtYXRlcmlhbC4gUHJvcGVydGllcyB0aGF0IGFyZSBjbG9uZWQgb3IgY3JlYXRlZCBhbmV3IGZvciB0aGUgY29weVxuXHQgKiBpbmNsdWRlIHN1Yk1lc2hlcywgY2hpbGRyZW4gb2YgdGhlIG1lc2gsIGFuZCB0aGUgYW5pbWF0b3IuXG5cdCAqXG5cdCAqIElmIHlvdSB3YW50IHRvIGNvcHkganVzdCB0aGUgbWVzaCwgcmV1c2luZyBpdCdzIGdlb21ldHJ5IGFuZCBtYXRlcmlhbCB3aGlsZSBub3Rcblx0ICogY2xvbmluZyBpdCdzIGNoaWxkcmVuLCB0aGUgc2ltcGxlc3Qgd2F5IGlzIHRvIGNyZWF0ZSBhIG5ldyBtZXNoIG1hbnVhbGx5OlxuXHQgKlxuXHQgKiA8Y29kZT5cblx0ICogdmFyIGNsb25lIDogTWVzaCA9IG5ldyBNZXNoKG9yaWdpbmFsLmdlb21ldHJ5LCBvcmlnaW5hbC5tYXRlcmlhbCk7XG5cdCAqIDwvY29kZT5cblx0ICovXG5cdHB1YmxpYyBjbG9uZSgpOkRpc3BsYXlPYmplY3Rcblx0e1xuXHRcdHZhciBjbG9uZTpNZXNoID0gbmV3IE1lc2godGhpcy5fZ2VvbWV0cnksIHRoaXMuX21hdGVyaWFsKTtcblxuXHRcdGNsb25lLl9pTWF0cml4M0QgPSB0aGlzLl9pTWF0cml4M0Q7XG5cdFx0Y2xvbmUucGl2b3QgPSB0aGlzLnBpdm90O1xuXHRcdGNsb25lLnBhcnRpdGlvbiA9IHRoaXMucGFydGl0aW9uO1xuXHRcdGNsb25lLmJvdW5kcyA9IHRoaXMuYm91bmRzLmNsb25lKCk7XG5cblxuXHRcdGNsb25lLm5hbWUgPSB0aGlzLm5hbWU7XG5cdFx0Y2xvbmUuY2FzdHNTaGFkb3dzID0gdGhpcy5jYXN0c1NoYWRvd3M7XG5cdFx0Y2xvbmUuc2hhcmVBbmltYXRpb25HZW9tZXRyeSA9IHRoaXMuc2hhcmVBbmltYXRpb25HZW9tZXRyeTtcblx0XHRjbG9uZS5tb3VzZUVuYWJsZWQgPSB0aGlzLm1vdXNlRW5hYmxlZDtcblx0XHRjbG9uZS5tb3VzZUNoaWxkcmVuID0gdGhpcy5tb3VzZUNoaWxkcmVuO1xuXHRcdC8vdGhpcyBpcyBvZiBjb3Vyc2Ugbm8gcHJvcGVyIGNsb25pbmdcblx0XHQvL21heWJlIHVzZSB0aGlzIGluc3RlYWQ/OiBodHRwOi8vYmxvZy5hbm90aGVyLWQtbWVudGlvbi5yby9wcm9ncmFtbWluZy9ob3ctdG8tY2xvbmUtZHVwbGljYXRlLWFuLW9iamVjdC1pbi1hY3Rpb25zY3JpcHQtMy9cblx0XHRjbG9uZS5leHRyYSA9IHRoaXMuZXh0cmE7XG5cblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX3N1Yk1lc2hlcy5sZW5ndGg7XG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgbGVuOyArK2kpXG5cdFx0XHRjbG9uZS5fc3ViTWVzaGVzW2ldLm1hdGVyaWFsID0gdGhpcy5fc3ViTWVzaGVzW2ldLl9pR2V0RXhwbGljaXRNYXRlcmlhbCgpO1xuXG5cblx0XHRsZW4gPSB0aGlzLm51bUNoaWxkcmVuO1xuXHRcdHZhciBvYmo6YW55O1xuXG5cdFx0Zm9yIChpID0gMDsgaSA8IGxlbjsgKytpKSB7XG5cdFx0XHRvYmogPSB0aGlzLmdldENoaWxkQXQoaSkuY2xvbmUoKTtcblx0XHRcdGNsb25lLmFkZENoaWxkKDxEaXNwbGF5T2JqZWN0Q29udGFpbmVyPiBvYmopO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLl9hbmltYXRvcilcblx0XHRcdGNsb25lLmFuaW1hdG9yID0gdGhpcy5fYW5pbWF0b3IuY2xvbmUoKTtcblxuXHRcdHJldHVybiBjbG9uZTtcblx0fVxuXG5cdC8qKlxuXHQgKiAvL1RPRE9cblx0ICpcblx0ICogQHBhcmFtIHN1Ykdlb21ldHJ5XG5cdCAqIEByZXR1cm5zIHtTdWJNZXNoQmFzZX1cblx0ICovXG5cdHB1YmxpYyBnZXRTdWJNZXNoRnJvbVN1Ykdlb21ldHJ5KHN1Ykdlb21ldHJ5OlN1Ykdlb21ldHJ5QmFzZSk6SVN1Yk1lc2hcblx0e1xuXHRcdHJldHVybiB0aGlzLl9zdWJNZXNoZXNbdGhpcy5fZ2VvbWV0cnkuc3ViR2VvbWV0cmllcy5pbmRleE9mKHN1Ykdlb21ldHJ5KV07XG5cdH1cblxuXHQvKipcblx0ICogQHByb3RlY3RlZFxuXHQgKi9cblx0cHVibGljIHBDcmVhdGVFbnRpdHlQYXJ0aXRpb25Ob2RlKCk6RW50aXR5Tm9kZVxuXHR7XG5cdFx0cmV0dXJuIG5ldyBFbnRpdHlOb2RlKHRoaXMpO1xuXHR9XG5cblx0LyoqXG5cdCAqIC8vVE9ET1xuXHQgKlxuXHQgKiBAcHJvdGVjdGVkXG5cdCAqL1xuXHRwdWJsaWMgcFVwZGF0ZUJvdW5kcygpXG5cdHtcblx0XHR2YXIgaTpudW1iZXIsIGo6bnVtYmVyLCBwOm51bWJlciwgbGVuOm51bWJlcjtcblx0XHR2YXIgc3ViR2VvbXM6QXJyYXk8U3ViR2VvbWV0cnlCYXNlPiA9IHRoaXMuX2dlb21ldHJ5LnN1Ykdlb21ldHJpZXM7XG5cdFx0dmFyIHN1Ykdlb206U3ViR2VvbWV0cnlCYXNlO1xuXHRcdHZhciBib3VuZGluZ1Bvc2l0aW9uczpBcnJheTxudW1iZXI+O1xuXHRcdHZhciBudW1TdWJHZW9tczpudW1iZXIgPSBzdWJHZW9tcy5sZW5ndGg7XG5cdFx0dmFyIG1pblg6bnVtYmVyLCBtaW5ZOm51bWJlciwgbWluWjpudW1iZXI7XG5cdFx0dmFyIG1heFg6bnVtYmVyLCBtYXhZOm51bWJlciwgbWF4WjpudW1iZXI7XG5cblx0XHRpZiAobnVtU3ViR2VvbXMgPiAwKSB7XG5cdFx0XHRpID0gMDtcblx0XHRcdHN1Ykdlb20gPSBzdWJHZW9tc1swXTtcblx0XHRcdGJvdW5kaW5nUG9zaXRpb25zID0gc3ViR2VvbS5nZXRCb3VuZGluZ1Bvc2l0aW9ucygpO1xuXHRcdFx0bWluWCA9IG1heFggPSBib3VuZGluZ1Bvc2l0aW9uc1tpXTtcblx0XHRcdG1pblkgPSBtYXhZID0gYm91bmRpbmdQb3NpdGlvbnNbaSArIDFdO1xuXHRcdFx0bWluWiA9IG1heFogPSBib3VuZGluZ1Bvc2l0aW9uc1tpICsgMl07XG5cblx0XHRcdGZvciAoaiA9IDA7IGogPCBudW1TdWJHZW9tczsgaisrKSB7XG5cdFx0XHRcdHN1Ykdlb20gPSBzdWJHZW9tc1tqXTtcblx0XHRcdFx0Ym91bmRpbmdQb3NpdGlvbnMgPSBzdWJHZW9tLmdldEJvdW5kaW5nUG9zaXRpb25zKCk7XG5cdFx0XHRcdGxlbiA9IGJvdW5kaW5nUG9zaXRpb25zLmxlbmd0aDtcblxuXHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKz0zKSB7XG5cdFx0XHRcdFx0cCA9IGJvdW5kaW5nUG9zaXRpb25zW2ldO1xuXHRcdFx0XHRcdGlmIChwIDwgbWluWClcblx0XHRcdFx0XHRcdG1pblggPSBwO1xuXHRcdFx0XHRcdGVsc2UgaWYgKHAgPiBtYXhYKVxuXHRcdFx0XHRcdFx0bWF4WCA9IHA7XG5cblx0XHRcdFx0XHRwID0gYm91bmRpbmdQb3NpdGlvbnNbaSArIDFdO1xuXG5cdFx0XHRcdFx0aWYgKHAgPCBtaW5ZKVxuXHRcdFx0XHRcdFx0bWluWSA9IHA7XG5cdFx0XHRcdFx0ZWxzZSBpZiAocCA+IG1heFkpXG5cdFx0XHRcdFx0XHRtYXhZID0gcDtcblxuXHRcdFx0XHRcdHAgPSBib3VuZGluZ1Bvc2l0aW9uc1tpICsgMl07XG5cblx0XHRcdFx0XHRpZiAocCA8IG1pblopXG5cdFx0XHRcdFx0XHRtaW5aID0gcDtcblx0XHRcdFx0XHRlbHNlIGlmIChwID4gbWF4Wilcblx0XHRcdFx0XHRcdG1heFogPSBwO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuX3BCb3VuZHMuZnJvbUV4dHJlbWVzKG1pblgsIG1pblksIG1pblosIG1heFgsIG1heFksIG1heFopO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9wQm91bmRzLmZyb21FeHRyZW1lcygwLCAwLCAwLCAwLCAwLCAwKTtcblx0XHR9XG5cblx0XHRzdXBlci5wVXBkYXRlQm91bmRzKCk7XG5cdH1cblxuXHQvKipcblx0ICogLy9UT0RPXG5cdCAqXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRwcml2YXRlIG9uR2VvbWV0cnlCb3VuZHNJbnZhbGlkKGV2ZW50Okdlb21ldHJ5RXZlbnQpXG5cdHtcblx0XHR0aGlzLnBJbnZhbGlkYXRlQm91bmRzKCk7XG5cdH1cblxuXHQvKipcblx0ICogQ2FsbGVkIHdoZW4gYSBTdWJHZW9tZXRyeSB3YXMgYWRkZWQgdG8gdGhlIEdlb21ldHJ5LlxuXHQgKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0cHJpdmF0ZSBvblN1Ykdlb21ldHJ5QWRkZWQoZXZlbnQ6R2VvbWV0cnlFdmVudClcblx0e1xuXHRcdHRoaXMuYWRkU3ViTWVzaChldmVudC5zdWJHZW9tZXRyeSk7XG5cdH1cblxuXHQvKipcblx0ICogQ2FsbGVkIHdoZW4gYSBTdWJHZW9tZXRyeSB3YXMgcmVtb3ZlZCBmcm9tIHRoZSBHZW9tZXRyeS5cblx0ICpcblx0ICogQHByaXZhdGVcblx0ICovXG5cdHByaXZhdGUgb25TdWJHZW9tZXRyeVJlbW92ZWQoZXZlbnQ6R2VvbWV0cnlFdmVudClcblx0e1xuXHRcdHZhciBzdWJNZXNoOklTdWJNZXNoO1xuXHRcdHZhciBzdWJHZW9tOlN1Ykdlb21ldHJ5QmFzZSA9IGV2ZW50LnN1Ykdlb21ldHJ5O1xuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fc3ViTWVzaGVzLmxlbmd0aDtcblx0XHR2YXIgaTpudW1iZXI7XG5cblx0XHQvLyBJbXBvcnRhbnQhIFRoaXMgaGFzIHRvIGJlIGRvbmUgaGVyZSwgYW5kIG5vdCBkZWxheWVkIHVudGlsIHRoZVxuXHRcdC8vIG5leHQgcmVuZGVyIGxvb3AsIHNpbmNlIHRoaXMgbWF5IGJlIGNhdXNlZCBieSB0aGUgZ2VvbWV0cnkgYmVpbmdcblx0XHQvLyByZWJ1aWx0IElOIFRIRSBSRU5ERVIgTE9PUC4gSW52YWxpZGF0aW5nIGFuZCB3YWl0aW5nIHdpbGwgZGVsYXlcblx0XHQvLyBpdCB1bnRpbCB0aGUgTkVYVCBSRU5ERVIgRlJBTUUgd2hpY2ggaXMgcHJvYmFibHkgbm90IGRlc2lyYWJsZS5cblx0XHRmb3IgKGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcblxuXHRcdFx0c3ViTWVzaCA9IHRoaXMuX3N1Yk1lc2hlc1tpXTtcblxuXHRcdFx0aWYgKHN1Yk1lc2guc3ViR2VvbWV0cnkgPT0gc3ViR2VvbSkge1xuXHRcdFx0XHRzdWJNZXNoLmRpc3Bvc2UoKTtcblxuXHRcdFx0XHR0aGlzLl9zdWJNZXNoZXMuc3BsaWNlKGksIDEpO1xuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC0tbGVuO1xuXHRcdGZvciAoOyBpIDwgbGVuOyArK2kpXG5cdFx0XHR0aGlzLl9zdWJNZXNoZXNbaV0uX2lJbmRleCA9IGk7XG5cdH1cblxuXHQvKipcblx0ICogQWRkcyBhIFN1Yk1lc2hCYXNlIHdyYXBwaW5nIGEgU3ViR2VvbWV0cnkuXG5cdCAqXG5cdCAqIEBwYXJhbSBzdWJHZW9tZXRyeVxuXHQgKi9cblx0cHJpdmF0ZSBhZGRTdWJNZXNoKHN1Ykdlb21ldHJ5OlN1Ykdlb21ldHJ5QmFzZSlcblx0e1xuXHRcdHZhciBTdWJNZXNoQ2xhc3M6SVN1Yk1lc2hDbGFzcyA9IHN1Ykdlb21ldHJ5LnN1Yk1lc2hDbGFzcztcblxuXHRcdHZhciBzdWJNZXNoOklTdWJNZXNoID0gbmV3IFN1Yk1lc2hDbGFzcyhzdWJHZW9tZXRyeSwgdGhpcywgbnVsbCk7XG5cdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9zdWJNZXNoZXMubGVuZ3RoO1xuXG5cdFx0c3ViTWVzaC5faUluZGV4ID0gbGVuO1xuXG5cdFx0dGhpcy5fc3ViTWVzaGVzW2xlbl0gPSBzdWJNZXNoO1xuXG5cdFx0dGhpcy5wSW52YWxpZGF0ZUJvdW5kcygpO1xuXHR9XG5cblx0LyoqXG5cdCAqIC8vVE9ET1xuXHQgKlxuXHQgKiBAcGFyYW0gc2hvcnRlc3RDb2xsaXNpb25EaXN0YW5jZVxuXHQgKiBAcGFyYW0gZmluZENsb3Nlc3Rcblx0ICogQHJldHVybnMge2Jvb2xlYW59XG5cdCAqXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHVibGljIF9pVGVzdENvbGxpc2lvbihzaG9ydGVzdENvbGxpc2lvbkRpc3RhbmNlOm51bWJlciwgZmluZENsb3Nlc3Q6Ym9vbGVhbik6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BQaWNraW5nQ29sbGlkZXIudGVzdE1lc2hDb2xsaXNpb24odGhpcywgdGhpcy5fcFBpY2tpbmdDb2xsaXNpb25WTywgc2hvcnRlc3RDb2xsaXNpb25EaXN0YW5jZSwgZmluZENsb3Nlc3QpO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqIEBwYXJhbSByZW5kZXJlclxuXHQgKlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHB1YmxpYyBfaUNvbGxlY3RSZW5kZXJhYmxlcyhyZW5kZXJlclBvb2w6SVJlbmRlcmVyUG9vbClcblx0e1xuXHRcdC8vIFNpbmNlIHRoaXMgZ2V0dGVyIGlzIGludm9rZWQgZXZlcnkgaXRlcmF0aW9uIG9mIHRoZSByZW5kZXIgbG9vcCwgYW5kXG5cdFx0Ly8gdGhlIHByZWZhYiBjb25zdHJ1Y3QgY291bGQgYWZmZWN0IHRoZSBzdWItbWVzaGVzLCB0aGUgcHJlZmFiIGlzXG5cdFx0Ly8gdmFsaWRhdGVkIGhlcmUgdG8gZ2l2ZSBpdCBhIGNoYW5jZSB0byByZWJ1aWxkLlxuXHRcdGlmICh0aGlzLl9pU291cmNlUHJlZmFiKVxuXHRcdFx0dGhpcy5faVNvdXJjZVByZWZhYi5faVZhbGlkYXRlKCk7XG5cblx0XHR2YXIgbGVuOm51bWJlciAvKnVpbnQqLyA9IHRoaXMuX3N1Yk1lc2hlcy5sZW5ndGg7XG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgLyp1aW50Ki8gPSAwOyBpIDwgbGVuOyBpKyspXG5cdFx0XHR0aGlzLl9zdWJNZXNoZXNbaV0uX2lDb2xsZWN0UmVuZGVyYWJsZShyZW5kZXJlclBvb2wpO1xuXHR9XG5cblx0cHVibGljIF9pSW52YWxpZGF0ZVJlbmRlcmFibGVHZW9tZXRyaWVzKClcblx0e1xuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fc3ViTWVzaGVzLmxlbmd0aDtcblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBsZW47ICsraSlcblx0XHRcdHRoaXMuX3N1Yk1lc2hlc1tpXS5faUludmFsaWRhdGVSZW5kZXJhYmxlR2VvbWV0cnkoKTtcblx0fVxufVxuXG5leHBvcnQgPSBNZXNoOyJdfQ==