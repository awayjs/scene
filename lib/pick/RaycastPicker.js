"use strict";
var Vector3D_1 = require("@awayjs/core/lib/geom/Vector3D");
/**
 * Picks a 3d object from a view or scene by 3D raycast calculations.
 * Performs an initial coarse boundary calculation to return a subset of entities whose bounding volumes intersect with the specified ray,
 * then triggers an optional picking collider on individual renderable objects to further determine the precise values of the picking ray collision.
 *
 * @class away.pick.RaycastPicker
 */
var RaycastPicker = (function () {
    /**
     * Creates a new <code>RaycastPicker</code> object.
     *
     * @param findClosestCollision Determines whether the picker searches for the closest bounds collision along the ray,
     * or simply returns the first collision encountered. Defaults to false.
     */
    function RaycastPicker(findClosestCollision) {
        if (findClosestCollision === void 0) { findClosestCollision = false; }
        this._entities = new Array();
        /**
         * @inheritDoc
         */
        this.onlyMouseEnabled = true;
        this._findClosestCollision = findClosestCollision;
    }
    /**
     * Returns true if the current node is at least partly in the frustum. If so, the partition node knows to pass on the traverser to its children.
     *
     * @param node The Partition3DNode object to frustum-test.
     */
    RaycastPicker.prototype.enterNode = function (node) {
        return node.isIntersectingRay(this._rayPosition, this._rayDirection) && !node.isMask();
    };
    /**
     * @inheritDoc
     */
    RaycastPicker.prototype.getViewCollision = function (x, y, view) {
        this._x = x;
        this._y = y;
        this._view = view;
        //update ray
        var rayPosition = view.unproject(x, y, 0);
        var rayDirection = view.unproject(x, y, 1).subtract(rayPosition);
        return this.getSceneCollision(rayPosition, rayDirection, view.scene);
    };
    /**
     * @inheritDoc
     */
    RaycastPicker.prototype.getSceneCollision = function (rayPosition, rayDirection, scene) {
        this._rayPosition = rayPosition;
        this._rayDirection = rayDirection;
        // collect entities to test
        scene.traversePartitions(this);
        //early out if no collisions detected
        if (!this._entities.length)
            return null;
        var collision = this.getPickingCollision();
        //discard entities
        this._entities.length = 0;
        return collision;
    };
    //		public getEntityCollision(position:Vector3D, direction:Vector3D, entities:Array<IEntity>):PickingCollision
    //		{
    //			this._numRenderables = 0;
    //
    //			var renderable:IEntity;
    //			var l:number = entities.length;
    //
    //			for (var c:number = 0; c < l; c++) {
    //				renderable = entities[c];
    //
    //				if (renderable.isIntersectingRay(position, direction))
    //					this._renderables[this._numRenderables++] = renderable;
    //			}
    //
    //			return this.getPickingCollision(this._raycastCollector);
    //		}
    RaycastPicker.prototype.setIgnoreList = function (entities) {
        this._ignoredEntities = entities;
    };
    RaycastPicker.prototype.isIgnored = function (entity) {
        if (this.onlyMouseEnabled && !entity._iIsMouseEnabled())
            return true;
        if (this._ignoredEntities) {
            var len = this._ignoredEntities.length;
            for (var i = 0; i < len; i++)
                if (this._ignoredEntities[i] == entity)
                    return true;
        }
        return false;
    };
    RaycastPicker.prototype.sortOnNearT = function (entity1, entity2) {
        return entity2._iPickingCollision.rayEntryDistance - entity1._iPickingCollision.rayEntryDistance;
    };
    RaycastPicker.prototype.getPickingCollision = function () {
        // Sort entities from closest to furthest to reduce tests.
        this._entities = this._entities.sort(this.sortOnNearT); // TODO - test sort filter in JS
        // ---------------------------------------------------------------------
        // Evaluate triangle collisions when needed.
        // Replaces collision data provided by bounds collider with more precise data.
        // ---------------------------------------------------------------------
        this._bestCollision = null;
        var entity;
        var len = this._entities.length;
        for (var i = len - 1; i >= 0; i--) {
            entity = this._entities[i];
            this._testCollision = entity._iPickingCollision;
            if (this._bestCollision == null || this._testCollision.rayEntryDistance < this._bestCollision.rayEntryDistance) {
                this._testCollider = entity.pickingCollider;
                if (this._testCollider) {
                    this._testCollision.rayEntryDistance = Number.MAX_VALUE;
                    entity._acceptTraverser(this);
                    // If a collision exists, update the collision data and stop all checks.
                    if (this._bestCollision && !this._findClosestCollision)
                        break;
                }
                else if (!this._testCollision.rayOriginIsInsideBounds) {
                    // A bounds collision with no picking collider stops all checks.
                    // Note: a bounds collision with a ray origin inside its bounds is ONLY ever used
                    // to enable the detection of a corresponsding triangle collision.
                    // Therefore, bounds collisions with a ray origin inside its bounds can be ignored
                    // if it has been established that there is NO triangle collider to test
                    this._bestCollision = this._testCollision;
                    break;
                }
            }
        }
        if (this._bestCollision)
            this.updatePosition(this._bestCollision);
        return this._bestCollision;
    };
    RaycastPicker.prototype.updatePosition = function (pickingCollision) {
        var collisionPos = pickingCollision.position || (pickingCollision.position = new Vector3D_1.Vector3D());
        var rayDir = pickingCollision.rayDirection;
        var rayPos = pickingCollision.rayPosition;
        var t = pickingCollision.rayEntryDistance;
        collisionPos.x = rayPos.x + t * rayDir.x;
        collisionPos.y = rayPos.y + t * rayDir.y;
        collisionPos.z = rayPos.z + t * rayDir.z;
    };
    RaycastPicker.prototype.dispose = function () {
        //TODO
    };
    /**
     *
     * @param entity
     */
    RaycastPicker.prototype.applyEntity = function (entity) {
        if (!this.isIgnored(entity))
            this._entities.push(entity);
    };
    /**
     *
     * @param entity
     */
    RaycastPicker.prototype.applyRenderable = function (renderable) {
        if (renderable._iTestCollision(this._testCollision, this._testCollider))
            this._bestCollision = this._testCollision;
    };
    /**
     *
     * @param entity
     */
    RaycastPicker.prototype.applyDirectionalLight = function (entity) {
        //don't do anything here
    };
    /**
     *
     * @param entity
     */
    RaycastPicker.prototype.applyLightProbe = function (entity) {
        //don't do anything here
    };
    /**
     *
     * @param entity
     */
    RaycastPicker.prototype.applyPointLight = function (entity) {
        //don't do anything here
    };
    /**
     *
     * @param entity
     */
    RaycastPicker.prototype.applySkybox = function (entity) {
        //don't do anything here
    };
    return RaycastPicker;
}());
exports.RaycastPicker = RaycastPicker;
