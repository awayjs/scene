var Vector3D = require("awayjs-core/lib/geom/Vector3D");
var RaycastCollector = require("awayjs-display/lib/traverse/RaycastCollector");
/**
 * Picks a 3d object from a view or scene by 3D raycast calculations.
 * Performs an initial coarse boundary calculation to return a subset of entities whose bounding volumes intersect with the specified ray,
 * then triggers an optional picking collider on individual entity objects to further determine the precise values of the picking ray collision.
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
        this._ignoredEntities = [];
        this._onlyMouseEnabled = true;
        this._numEntities = 0;
        this._raycastCollector = new RaycastCollector();
        this._findClosestCollision = findClosestCollision;
        this._entities = new Array();
    }
    Object.defineProperty(RaycastPicker.prototype, "onlyMouseEnabled", {
        /**
         * @inheritDoc
         */
        get: function () {
            return this._onlyMouseEnabled;
        },
        set: function (value) {
            this._onlyMouseEnabled = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @inheritDoc
     */
    RaycastPicker.prototype.getViewCollision = function (x, y, view) {
        //update ray
        var rayPosition = view.unproject(x, y, 0);
        var rayDirection = view.unproject(x, y, 1).subtract(rayPosition);
        return this.getSceneCollision(rayPosition, rayDirection, view.scene);
    };
    /**
     * @inheritDoc
     */
    RaycastPicker.prototype.getSceneCollision = function (rayPosition, rayDirection, scene) {
        //clear collector
        this._raycastCollector.clear();
        //setup ray vectors
        this._raycastCollector.rayPosition = rayPosition;
        this._raycastCollector.rayDirection = rayDirection;
        // collect entities to test
        scene.traversePartitions(this._raycastCollector);
        this._numEntities = 0;
        var node = this._raycastCollector.entityHead;
        var entity;
        while (node) {
            if (!this.isIgnored(entity = node.entity))
                this._entities[this._numEntities++] = entity;
            node = node.next;
        }
        //early out if no collisions detected
        if (!this._numEntities)
            return null;
        return this.getPickingCollisionVO(this._raycastCollector);
    };
    //		public getEntityCollision(position:Vector3D, direction:Vector3D, entities:Array<IEntity>):PickingCollisionVO
    //		{
    //			this._numEntities = 0;
    //
    //			var entity:IEntity;
    //			var l:number = entities.length;
    //
    //			for (var c:number = 0; c < l; c++) {
    //				entity = entities[c];
    //
    //				if (entity.isIntersectingRay(position, direction))
    //					this._entities[this._numEntities++] = entity;
    //			}
    //
    //			return this.getPickingCollisionVO(this._raycastCollector);
    //		}
    RaycastPicker.prototype.setIgnoreList = function (entities) {
        this._ignoredEntities = entities;
    };
    RaycastPicker.prototype.isIgnored = function (entity) {
        if (this._onlyMouseEnabled && !entity._iIsMouseEnabled())
            return true;
        var len = this._ignoredEntities.length;
        for (var i = 0; i < len; i++)
            if (this._ignoredEntities[i] == entity)
                return true;
        return false;
    };
    RaycastPicker.prototype.sortOnNearT = function (entity1, entity2) {
        return entity1._iPickingCollisionVO.rayEntryDistance > entity2._iPickingCollisionVO.rayEntryDistance ? 1 : -1;
    };
    RaycastPicker.prototype.getPickingCollisionVO = function (collector) {
        // trim before sorting
        this._entities.length = this._numEntities;
        // Sort entities from closest to furthest.
        this._entities = this._entities.sort(this.sortOnNearT); // TODO - test sort filter in JS
        // ---------------------------------------------------------------------
        // Evaluate triangle collisions when needed.
        // Replaces collision data provided by bounds collider with more precise data.
        // ---------------------------------------------------------------------
        var shortestCollisionDistance = Number.MAX_VALUE;
        var bestCollisionVO;
        var pickingCollisionVO;
        var entity;
        var i;
        for (i = 0; i < this._numEntities; ++i) {
            entity = this._entities[i];
            pickingCollisionVO = entity._iPickingCollisionVO;
            if (entity.pickingCollider) {
                // If a collision exists, update the collision data and stop all checks.
                if ((bestCollisionVO == null || pickingCollisionVO.rayEntryDistance < bestCollisionVO.rayEntryDistance) && entity._iTestCollision(shortestCollisionDistance, this._findClosestCollision)) {
                    shortestCollisionDistance = pickingCollisionVO.rayEntryDistance;
                    bestCollisionVO = pickingCollisionVO;
                    if (!this._findClosestCollision) {
                        this.updateLocalPosition(pickingCollisionVO);
                        return pickingCollisionVO;
                    }
                }
            }
            else if (bestCollisionVO == null || pickingCollisionVO.rayEntryDistance < bestCollisionVO.rayEntryDistance) {
                // Note: a bounds collision with a ray origin inside its bounds is ONLY ever used
                // to enable the detection of a corresponsding triangle collision.
                // Therefore, bounds collisions with a ray origin inside its bounds can be ignored
                // if it has been established that there is NO triangle collider to test
                if (!pickingCollisionVO.rayOriginIsInsideBounds) {
                    this.updateLocalPosition(pickingCollisionVO);
                    return pickingCollisionVO;
                }
            }
        }
        return bestCollisionVO;
    };
    RaycastPicker.prototype.updateLocalPosition = function (pickingCollisionVO) {
        var collisionPos = (pickingCollisionVO.localPosition == null) ? (pickingCollisionVO.localPosition = new Vector3D()) : pickingCollisionVO.localPosition;
        var rayDir = pickingCollisionVO.localRayDirection;
        var rayPos = pickingCollisionVO.localRayPosition;
        var t = pickingCollisionVO.rayEntryDistance;
        collisionPos.x = rayPos.x + t * rayDir.x;
        collisionPos.y = rayPos.y + t * rayDir.y;
        collisionPos.z = rayPos.z + t * rayDir.z;
    };
    RaycastPicker.prototype.dispose = function () {
        //TODO
    };
    return RaycastPicker;
})();
module.exports = RaycastPicker;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9waWNrL1JheWNhc3RQaWNrZXIudHMiXSwibmFtZXMiOlsiUmF5Y2FzdFBpY2tlciIsIlJheWNhc3RQaWNrZXIuY29uc3RydWN0b3IiLCJSYXljYXN0UGlja2VyLm9ubHlNb3VzZUVuYWJsZWQiLCJSYXljYXN0UGlja2VyLmdldFZpZXdDb2xsaXNpb24iLCJSYXljYXN0UGlja2VyLmdldFNjZW5lQ29sbGlzaW9uIiwiUmF5Y2FzdFBpY2tlci5zZXRJZ25vcmVMaXN0IiwiUmF5Y2FzdFBpY2tlci5pc0lnbm9yZWQiLCJSYXljYXN0UGlja2VyLnNvcnRPbk5lYXJUIiwiUmF5Y2FzdFBpY2tlci5nZXRQaWNraW5nQ29sbGlzaW9uVk8iLCJSYXljYXN0UGlja2VyLnVwZGF0ZUxvY2FsUG9zaXRpb24iLCJSYXljYXN0UGlja2VyLmRpc3Bvc2UiXSwibWFwcGluZ3MiOiJBQUFBLElBQU8sUUFBUSxXQUFnQiwrQkFBK0IsQ0FBQyxDQUFDO0FBUWhFLElBQU8sZ0JBQWdCLFdBQWMsOENBQThDLENBQUMsQ0FBQztBQUdyRixBQU9BOzs7Ozs7R0FERztJQUNHLGFBQWE7SUF3QmxCQTs7Ozs7T0FLR0E7SUFDSEEsU0E5QktBLGFBQWFBLENBOEJOQSxvQkFBb0NBO1FBQXBDQyxvQ0FBb0NBLEdBQXBDQSw0QkFBb0NBO1FBMUJ4Q0EscUJBQWdCQSxHQUFHQSxFQUFFQSxDQUFDQTtRQUN0QkEsc0JBQWlCQSxHQUFXQSxJQUFJQSxDQUFDQTtRQUdqQ0EsaUJBQVlBLEdBQVVBLENBQUNBLENBQUNBO1FBd0IvQkEsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxHQUFHQSxJQUFJQSxnQkFBZ0JBLEVBQUVBLENBQUNBO1FBRWhEQSxJQUFJQSxDQUFDQSxxQkFBcUJBLEdBQUdBLG9CQUFvQkEsQ0FBQ0E7UUFDbERBLElBQUlBLENBQUNBLFNBQVNBLEdBQUdBLElBQUlBLEtBQUtBLEVBQVdBLENBQUNBO0lBQ3ZDQSxDQUFDQTtJQXRCREQsc0JBQVdBLDJDQUFnQkE7UUFIM0JBOztXQUVHQTthQUNIQTtZQUVDRSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBO1FBQy9CQSxDQUFDQTthQUVERixVQUE0QkEsS0FBYUE7WUFFeENFLElBQUlBLENBQUNBLGlCQUFpQkEsR0FBR0EsS0FBS0EsQ0FBQ0E7UUFDaENBLENBQUNBOzs7T0FMQUY7SUFxQkRBOztPQUVHQTtJQUNJQSx3Q0FBZ0JBLEdBQXZCQSxVQUF3QkEsQ0FBUUEsRUFBRUEsQ0FBUUEsRUFBRUEsSUFBU0E7UUFFcERHLEFBQ0FBLFlBRFlBO1lBQ1JBLFdBQVdBLEdBQVlBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO1FBQ25EQSxJQUFJQSxZQUFZQSxHQUFZQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxRQUFRQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQTtRQUUxRUEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxXQUFXQSxFQUFFQSxZQUFZQSxFQUFFQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtJQUN0RUEsQ0FBQ0E7SUFFREg7O09BRUdBO0lBQ0lBLHlDQUFpQkEsR0FBeEJBLFVBQXlCQSxXQUFvQkEsRUFBRUEsWUFBcUJBLEVBQUVBLEtBQVdBO1FBRWhGSSxBQUNBQSxpQkFEaUJBO1FBQ2pCQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBO1FBRS9CQSxBQUNBQSxtQkFEbUJBO1FBQ25CQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLFdBQVdBLEdBQUdBLFdBQVdBLENBQUNBO1FBQ2pEQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLFlBQVlBLEdBQUdBLFlBQVlBLENBQUNBO1FBRW5EQSxBQUNBQSwyQkFEMkJBO1FBQzNCQSxLQUFLQSxDQUFDQSxrQkFBa0JBLENBQUNBLElBQUlBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsQ0FBQ0E7UUFFakRBLElBQUlBLENBQUNBLFlBQVlBLEdBQUdBLENBQUNBLENBQUNBO1FBQ3RCQSxJQUFJQSxJQUFJQSxHQUFrQkEsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxVQUFVQSxDQUFDQTtRQUM1REEsSUFBSUEsTUFBY0EsQ0FBQ0E7UUFFbkJBLE9BQU9BLElBQUlBLEVBQUVBLENBQUNBO1lBQ2JBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLE1BQU1BLEdBQUdBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO2dCQUN6Q0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsRUFBRUEsQ0FBQ0EsR0FBR0EsTUFBTUEsQ0FBQ0E7WUFFOUNBLElBQUlBLEdBQUdBLElBQUlBLENBQUNBLElBQUlBLENBQUNBO1FBQ2xCQSxDQUFDQTtRQUVEQSxBQUNBQSxxQ0FEcUNBO1FBQ3JDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQTtZQUN0QkEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7UUFFYkEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EscUJBQXFCQSxDQUFDQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLENBQUNBO0lBQzNEQSxDQUFDQTtJQUVGSixnSEFBZ0hBO0lBQ2hIQSxLQUFLQTtJQUNMQSwyQkFBMkJBO0lBQzNCQSxFQUFFQTtJQUNGQSx3QkFBd0JBO0lBQ3hCQSxvQ0FBb0NBO0lBQ3BDQSxFQUFFQTtJQUNGQSx5Q0FBeUNBO0lBQ3pDQSwyQkFBMkJBO0lBQzNCQSxFQUFFQTtJQUNGQSx3REFBd0RBO0lBQ3hEQSxvREFBb0RBO0lBQ3BEQSxNQUFNQTtJQUNOQSxFQUFFQTtJQUNGQSwrREFBK0RBO0lBQy9EQSxLQUFLQTtJQUVHQSxxQ0FBYUEsR0FBcEJBLFVBQXFCQSxRQUFRQTtRQUU1QkssSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxHQUFHQSxRQUFRQSxDQUFDQTtJQUNsQ0EsQ0FBQ0E7SUFFT0wsaUNBQVNBLEdBQWpCQSxVQUFrQkEsTUFBY0E7UUFFL0JNLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLGlCQUFpQkEsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsZ0JBQWdCQSxFQUFFQSxDQUFDQTtZQUN4REEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7UUFFYkEsSUFBSUEsR0FBR0EsR0FBVUEsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxNQUFNQSxDQUFDQTtRQUM5Q0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBVUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsR0FBR0EsRUFBRUEsQ0FBQ0EsRUFBRUE7WUFDbENBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsTUFBTUEsQ0FBQ0E7Z0JBQ3RDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtRQUVkQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQTtJQUNkQSxDQUFDQTtJQUVPTixtQ0FBV0EsR0FBbkJBLFVBQW9CQSxPQUFlQSxFQUFFQSxPQUFlQTtRQUVuRE8sTUFBTUEsQ0FBQ0EsT0FBT0EsQ0FBQ0Esb0JBQW9CQSxDQUFDQSxnQkFBZ0JBLEdBQUdBLE9BQU9BLENBQUNBLG9CQUFvQkEsQ0FBQ0EsZ0JBQWdCQSxHQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUM5R0EsQ0FBQ0E7SUFFT1AsNkNBQXFCQSxHQUE3QkEsVUFBOEJBLFNBQXVCQTtRQUVwRFEsQUFDQUEsc0JBRHNCQTtRQUN0QkEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0E7UUFFMUNBLEFBQ0FBLDBDQUQwQ0E7UUFDMUNBLElBQUlBLENBQUNBLFNBQVNBLEdBQUdBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLEVBQUVBLGdDQUFnQ0E7UUFFeEZBLEFBS0FBLHdFQUx3RUE7UUFDeEVBLDRDQUE0Q0E7UUFDNUNBLDhFQUE4RUE7UUFDOUVBLHdFQUF3RUE7WUFFcEVBLHlCQUF5QkEsR0FBVUEsTUFBTUEsQ0FBQ0EsU0FBU0EsQ0FBQ0E7UUFDeERBLElBQUlBLGVBQWtDQSxDQUFDQTtRQUN2Q0EsSUFBSUEsa0JBQXFDQSxDQUFDQTtRQUMxQ0EsSUFBSUEsTUFBY0EsQ0FBQ0E7UUFDbkJBLElBQUlBLENBQVFBLENBQUNBO1FBRWJBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLFlBQVlBLEVBQUVBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBO1lBQ3hDQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUMzQkEsa0JBQWtCQSxHQUFHQSxNQUFNQSxDQUFDQSxvQkFBb0JBLENBQUNBO1lBQ2pEQSxFQUFFQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQSxlQUFlQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDNUJBLEFBQ0FBLHdFQUR3RUE7Z0JBQ3hFQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxlQUFlQSxJQUFJQSxJQUFJQSxJQUFJQSxrQkFBa0JBLENBQUNBLGdCQUFnQkEsR0FBR0EsZUFBZUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxJQUFJQSxNQUFNQSxDQUFDQSxlQUFlQSxDQUFDQSx5QkFBeUJBLEVBQUVBLElBQUlBLENBQUNBLHFCQUFxQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQzFMQSx5QkFBeUJBLEdBQUdBLGtCQUFrQkEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQTtvQkFDaEVBLGVBQWVBLEdBQUdBLGtCQUFrQkEsQ0FBQ0E7b0JBQ3JDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxxQkFBcUJBLENBQUNBLENBQUNBLENBQUNBO3dCQUNqQ0EsSUFBSUEsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxrQkFBa0JBLENBQUNBLENBQUNBO3dCQUM3Q0EsTUFBTUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQTtvQkFDM0JBLENBQUNBO2dCQUNGQSxDQUFDQTtZQUNGQSxDQUFDQTtZQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxlQUFlQSxJQUFJQSxJQUFJQSxJQUFJQSxrQkFBa0JBLENBQUNBLGdCQUFnQkEsR0FBR0EsZUFBZUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDOUdBLEFBSUFBLGlGQUppRkE7Z0JBQ2pGQSxrRUFBa0VBO2dCQUNsRUEsa0ZBQWtGQTtnQkFDbEZBLHdFQUF3RUE7Z0JBQ3hFQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxrQkFBa0JBLENBQUNBLHVCQUF1QkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ2pEQSxJQUFJQSxDQUFDQSxtQkFBbUJBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsQ0FBQ0E7b0JBQzdDQSxNQUFNQSxDQUFDQSxrQkFBa0JBLENBQUNBO2dCQUMzQkEsQ0FBQ0E7WUFDRkEsQ0FBQ0E7UUFDRkEsQ0FBQ0E7UUFFREEsTUFBTUEsQ0FBQ0EsZUFBZUEsQ0FBQ0E7SUFDeEJBLENBQUNBO0lBRU9SLDJDQUFtQkEsR0FBM0JBLFVBQTRCQSxrQkFBcUNBO1FBRWhFUyxJQUFJQSxZQUFZQSxHQUFZQSxDQUFFQSxrQkFBa0JBLENBQUNBLGFBQWFBLElBQUlBLElBQUlBLENBQUVBLEdBQUVBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsYUFBYUEsR0FBR0EsSUFBSUEsUUFBUUEsRUFBRUEsQ0FBQ0EsR0FBR0Esa0JBQWtCQSxDQUFDQSxhQUFhQSxDQUFDQTtRQUVqS0EsSUFBSUEsTUFBTUEsR0FBWUEsa0JBQWtCQSxDQUFDQSxpQkFBaUJBLENBQUNBO1FBQzNEQSxJQUFJQSxNQUFNQSxHQUFZQSxrQkFBa0JBLENBQUNBLGdCQUFnQkEsQ0FBQ0E7UUFDMURBLElBQUlBLENBQUNBLEdBQVVBLGtCQUFrQkEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQTtRQUNuREEsWUFBWUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDdkNBLFlBQVlBLENBQUNBLENBQUNBLEdBQUdBLE1BQU1BLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEdBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBO1FBQ3ZDQSxZQUFZQSxDQUFDQSxDQUFDQSxHQUFHQSxNQUFNQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUN4Q0EsQ0FBQ0E7SUFFTVQsK0JBQU9BLEdBQWRBO1FBRUNVLE1BQU1BO0lBQ1BBLENBQUNBO0lBQ0ZWLG9CQUFDQTtBQUFEQSxDQTFMQSxBQTBMQ0EsSUFBQTtBQUVELEFBQXVCLGlCQUFkLGFBQWEsQ0FBQyIsImZpbGUiOiJwaWNrL1JheWNhc3RQaWNrZXIuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZlY3RvcjNEXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vVmVjdG9yM0RcIik7XG5cbmltcG9ydCBTY2VuZVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9jb250YWluZXJzL1NjZW5lXCIpO1xuaW1wb3J0IFZpZXdcdFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9jb250YWluZXJzL1ZpZXdcIik7XG5pbXBvcnQgSVBpY2tlclx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9waWNrL0lQaWNrZXJcIik7XG5pbXBvcnQgUGlja2luZ0NvbGxpc2lvblZPXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3BpY2svUGlja2luZ0NvbGxpc2lvblZPXCIpO1xuaW1wb3J0IEVudGl0eUxpc3RJdGVtXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcG9vbC9FbnRpdHlMaXN0SXRlbVwiKTtcbmltcG9ydCBDb2xsZWN0b3JCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvdHJhdmVyc2UvQ29sbGVjdG9yQmFzZVwiKTtcbmltcG9ydCBSYXljYXN0Q29sbGVjdG9yXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvdHJhdmVyc2UvUmF5Y2FzdENvbGxlY3RvclwiKTtcbmltcG9ydCBJRW50aXR5XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2VudGl0aWVzL0lFbnRpdHlcIik7XG5cbi8qKlxuICogUGlja3MgYSAzZCBvYmplY3QgZnJvbSBhIHZpZXcgb3Igc2NlbmUgYnkgM0QgcmF5Y2FzdCBjYWxjdWxhdGlvbnMuXG4gKiBQZXJmb3JtcyBhbiBpbml0aWFsIGNvYXJzZSBib3VuZGFyeSBjYWxjdWxhdGlvbiB0byByZXR1cm4gYSBzdWJzZXQgb2YgZW50aXRpZXMgd2hvc2UgYm91bmRpbmcgdm9sdW1lcyBpbnRlcnNlY3Qgd2l0aCB0aGUgc3BlY2lmaWVkIHJheSxcbiAqIHRoZW4gdHJpZ2dlcnMgYW4gb3B0aW9uYWwgcGlja2luZyBjb2xsaWRlciBvbiBpbmRpdmlkdWFsIGVudGl0eSBvYmplY3RzIHRvIGZ1cnRoZXIgZGV0ZXJtaW5lIHRoZSBwcmVjaXNlIHZhbHVlcyBvZiB0aGUgcGlja2luZyByYXkgY29sbGlzaW9uLlxuICpcbiAqIEBjbGFzcyBhd2F5LnBpY2suUmF5Y2FzdFBpY2tlclxuICovXG5jbGFzcyBSYXljYXN0UGlja2VyIGltcGxlbWVudHMgSVBpY2tlclxue1xuXHRwcml2YXRlIF9maW5kQ2xvc2VzdENvbGxpc2lvbjpib29sZWFuO1xuXHRwcml2YXRlIF9yYXljYXN0Q29sbGVjdG9yOlJheWNhc3RDb2xsZWN0b3I7XG5cdHByaXZhdGUgX2lnbm9yZWRFbnRpdGllcyA9IFtdO1xuXHRwcml2YXRlIF9vbmx5TW91c2VFbmFibGVkOmJvb2xlYW4gPSB0cnVlO1xuXG5cdHByaXZhdGUgX2VudGl0aWVzOkFycmF5PElFbnRpdHk+O1xuXHRwcml2YXRlIF9udW1FbnRpdGllczpudW1iZXIgPSAwO1xuXHRwcml2YXRlIF9oYXNDb2xsaXNpb25zOmJvb2xlYW47XG5cblx0LyoqXG5cdCAqIEBpbmhlcml0RG9jXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IG9ubHlNb3VzZUVuYWJsZWQoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fb25seU1vdXNlRW5hYmxlZDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgb25seU1vdXNlRW5hYmxlZCh2YWx1ZTpib29sZWFuKVxuXHR7XG5cdFx0dGhpcy5fb25seU1vdXNlRW5hYmxlZCA9IHZhbHVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBuZXcgPGNvZGU+UmF5Y2FzdFBpY2tlcjwvY29kZT4gb2JqZWN0LlxuXHQgKlxuXHQgKiBAcGFyYW0gZmluZENsb3Nlc3RDb2xsaXNpb24gRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBwaWNrZXIgc2VhcmNoZXMgZm9yIHRoZSBjbG9zZXN0IGJvdW5kcyBjb2xsaXNpb24gYWxvbmcgdGhlIHJheSxcblx0ICogb3Igc2ltcGx5IHJldHVybnMgdGhlIGZpcnN0IGNvbGxpc2lvbiBlbmNvdW50ZXJlZC4gRGVmYXVsdHMgdG8gZmFsc2UuXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcihmaW5kQ2xvc2VzdENvbGxpc2lvbjpib29sZWFuID0gZmFsc2UpXG5cdHtcblx0XHR0aGlzLl9yYXljYXN0Q29sbGVjdG9yID0gbmV3IFJheWNhc3RDb2xsZWN0b3IoKTtcblxuXHRcdHRoaXMuX2ZpbmRDbG9zZXN0Q29sbGlzaW9uID0gZmluZENsb3Nlc3RDb2xsaXNpb247XG5cdFx0dGhpcy5fZW50aXRpZXMgPSBuZXcgQXJyYXk8SUVudGl0eT4oKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAaW5oZXJpdERvY1xuXHQgKi9cblx0cHVibGljIGdldFZpZXdDb2xsaXNpb24oeDpudW1iZXIsIHk6bnVtYmVyLCB2aWV3OlZpZXcpOlBpY2tpbmdDb2xsaXNpb25WT1xuXHR7XG5cdFx0Ly91cGRhdGUgcmF5XG5cdFx0dmFyIHJheVBvc2l0aW9uOlZlY3RvcjNEID0gdmlldy51bnByb2plY3QoeCwgeSwgMCk7XG5cdFx0dmFyIHJheURpcmVjdGlvbjpWZWN0b3IzRCA9IHZpZXcudW5wcm9qZWN0KHgsIHksIDEpLnN1YnRyYWN0KHJheVBvc2l0aW9uKTtcblxuXHRcdHJldHVybiB0aGlzLmdldFNjZW5lQ29sbGlzaW9uKHJheVBvc2l0aW9uLCByYXlEaXJlY3Rpb24sIHZpZXcuc2NlbmUpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBpbmhlcml0RG9jXG5cdCAqL1xuXHRwdWJsaWMgZ2V0U2NlbmVDb2xsaXNpb24ocmF5UG9zaXRpb246VmVjdG9yM0QsIHJheURpcmVjdGlvbjpWZWN0b3IzRCwgc2NlbmU6U2NlbmUpOlBpY2tpbmdDb2xsaXNpb25WT1xuXHR7XG5cdFx0Ly9jbGVhciBjb2xsZWN0b3Jcblx0XHR0aGlzLl9yYXljYXN0Q29sbGVjdG9yLmNsZWFyKCk7XG5cblx0XHQvL3NldHVwIHJheSB2ZWN0b3JzXG5cdFx0dGhpcy5fcmF5Y2FzdENvbGxlY3Rvci5yYXlQb3NpdGlvbiA9IHJheVBvc2l0aW9uO1xuXHRcdHRoaXMuX3JheWNhc3RDb2xsZWN0b3IucmF5RGlyZWN0aW9uID0gcmF5RGlyZWN0aW9uO1xuXG5cdFx0Ly8gY29sbGVjdCBlbnRpdGllcyB0byB0ZXN0XG5cdFx0c2NlbmUudHJhdmVyc2VQYXJ0aXRpb25zKHRoaXMuX3JheWNhc3RDb2xsZWN0b3IpO1xuXG5cdFx0dGhpcy5fbnVtRW50aXRpZXMgPSAwO1xuXHRcdHZhciBub2RlOkVudGl0eUxpc3RJdGVtID0gdGhpcy5fcmF5Y2FzdENvbGxlY3Rvci5lbnRpdHlIZWFkO1xuXHRcdHZhciBlbnRpdHk6SUVudGl0eTtcblxuXHRcdHdoaWxlIChub2RlKSB7XG5cdFx0XHRpZiAoIXRoaXMuaXNJZ25vcmVkKGVudGl0eSA9IG5vZGUuZW50aXR5KSlcblx0XHRcdFx0dGhpcy5fZW50aXRpZXNbdGhpcy5fbnVtRW50aXRpZXMrK10gPSBlbnRpdHk7XG5cblx0XHRcdG5vZGUgPSBub2RlLm5leHQ7XG5cdFx0fVxuXG5cdFx0Ly9lYXJseSBvdXQgaWYgbm8gY29sbGlzaW9ucyBkZXRlY3RlZFxuXHRcdGlmICghdGhpcy5fbnVtRW50aXRpZXMpXG5cdFx0XHRyZXR1cm4gbnVsbDtcblxuXHRcdHJldHVybiB0aGlzLmdldFBpY2tpbmdDb2xsaXNpb25WTyh0aGlzLl9yYXljYXN0Q29sbGVjdG9yKTtcblx0fVxuXG4vL1x0XHRwdWJsaWMgZ2V0RW50aXR5Q29sbGlzaW9uKHBvc2l0aW9uOlZlY3RvcjNELCBkaXJlY3Rpb246VmVjdG9yM0QsIGVudGl0aWVzOkFycmF5PElFbnRpdHk+KTpQaWNraW5nQ29sbGlzaW9uVk9cbi8vXHRcdHtcbi8vXHRcdFx0dGhpcy5fbnVtRW50aXRpZXMgPSAwO1xuLy9cbi8vXHRcdFx0dmFyIGVudGl0eTpJRW50aXR5O1xuLy9cdFx0XHR2YXIgbDpudW1iZXIgPSBlbnRpdGllcy5sZW5ndGg7XG4vL1xuLy9cdFx0XHRmb3IgKHZhciBjOm51bWJlciA9IDA7IGMgPCBsOyBjKyspIHtcbi8vXHRcdFx0XHRlbnRpdHkgPSBlbnRpdGllc1tjXTtcbi8vXG4vL1x0XHRcdFx0aWYgKGVudGl0eS5pc0ludGVyc2VjdGluZ1JheShwb3NpdGlvbiwgZGlyZWN0aW9uKSlcbi8vXHRcdFx0XHRcdHRoaXMuX2VudGl0aWVzW3RoaXMuX251bUVudGl0aWVzKytdID0gZW50aXR5O1xuLy9cdFx0XHR9XG4vL1xuLy9cdFx0XHRyZXR1cm4gdGhpcy5nZXRQaWNraW5nQ29sbGlzaW9uVk8odGhpcy5fcmF5Y2FzdENvbGxlY3Rvcik7XG4vL1x0XHR9XG5cblx0cHVibGljIHNldElnbm9yZUxpc3QoZW50aXRpZXMpXG5cdHtcblx0XHR0aGlzLl9pZ25vcmVkRW50aXRpZXMgPSBlbnRpdGllcztcblx0fVxuXG5cdHByaXZhdGUgaXNJZ25vcmVkKGVudGl0eTpJRW50aXR5KTpib29sZWFuXG5cdHtcblx0XHRpZiAodGhpcy5fb25seU1vdXNlRW5hYmxlZCAmJiAhZW50aXR5Ll9pSXNNb3VzZUVuYWJsZWQoKSlcblx0XHRcdHJldHVybiB0cnVlO1xuXG5cdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9pZ25vcmVkRW50aXRpZXMubGVuZ3RoO1xuXHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IGxlbjsgaSsrKVxuXHRcdFx0aWYgKHRoaXMuX2lnbm9yZWRFbnRpdGllc1tpXSA9PSBlbnRpdHkpXG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0cHJpdmF0ZSBzb3J0T25OZWFyVChlbnRpdHkxOklFbnRpdHksIGVudGl0eTI6SUVudGl0eSk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gZW50aXR5MS5faVBpY2tpbmdDb2xsaXNpb25WTy5yYXlFbnRyeURpc3RhbmNlID4gZW50aXR5Mi5faVBpY2tpbmdDb2xsaXNpb25WTy5yYXlFbnRyeURpc3RhbmNlPyAxIDogLTE7XG5cdH1cblxuXHRwcml2YXRlIGdldFBpY2tpbmdDb2xsaXNpb25WTyhjb2xsZWN0b3I6Q29sbGVjdG9yQmFzZSk6UGlja2luZ0NvbGxpc2lvblZPXG5cdHtcblx0XHQvLyB0cmltIGJlZm9yZSBzb3J0aW5nXG5cdFx0dGhpcy5fZW50aXRpZXMubGVuZ3RoID0gdGhpcy5fbnVtRW50aXRpZXM7XG5cblx0XHQvLyBTb3J0IGVudGl0aWVzIGZyb20gY2xvc2VzdCB0byBmdXJ0aGVzdC5cblx0XHR0aGlzLl9lbnRpdGllcyA9IHRoaXMuX2VudGl0aWVzLnNvcnQodGhpcy5zb3J0T25OZWFyVCk7IC8vIFRPRE8gLSB0ZXN0IHNvcnQgZmlsdGVyIGluIEpTXG5cblx0XHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQvLyBFdmFsdWF0ZSB0cmlhbmdsZSBjb2xsaXNpb25zIHdoZW4gbmVlZGVkLlxuXHRcdC8vIFJlcGxhY2VzIGNvbGxpc2lvbiBkYXRhIHByb3ZpZGVkIGJ5IGJvdW5kcyBjb2xsaWRlciB3aXRoIG1vcmUgcHJlY2lzZSBkYXRhLlxuXHRcdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdFx0dmFyIHNob3J0ZXN0Q29sbGlzaW9uRGlzdGFuY2U6bnVtYmVyID0gTnVtYmVyLk1BWF9WQUxVRTtcblx0XHR2YXIgYmVzdENvbGxpc2lvblZPOlBpY2tpbmdDb2xsaXNpb25WTztcblx0XHR2YXIgcGlja2luZ0NvbGxpc2lvblZPOlBpY2tpbmdDb2xsaXNpb25WTztcblx0XHR2YXIgZW50aXR5OklFbnRpdHk7XG5cdFx0dmFyIGk6bnVtYmVyO1xuXG5cdFx0Zm9yIChpID0gMDsgaSA8IHRoaXMuX251bUVudGl0aWVzOyArK2kpIHtcblx0XHRcdGVudGl0eSA9IHRoaXMuX2VudGl0aWVzW2ldO1xuXHRcdFx0cGlja2luZ0NvbGxpc2lvblZPID0gZW50aXR5Ll9pUGlja2luZ0NvbGxpc2lvblZPO1xuXHRcdFx0aWYgKGVudGl0eS5waWNraW5nQ29sbGlkZXIpIHtcblx0XHRcdFx0Ly8gSWYgYSBjb2xsaXNpb24gZXhpc3RzLCB1cGRhdGUgdGhlIGNvbGxpc2lvbiBkYXRhIGFuZCBzdG9wIGFsbCBjaGVja3MuXG5cdFx0XHRcdGlmICgoYmVzdENvbGxpc2lvblZPID09IG51bGwgfHwgcGlja2luZ0NvbGxpc2lvblZPLnJheUVudHJ5RGlzdGFuY2UgPCBiZXN0Q29sbGlzaW9uVk8ucmF5RW50cnlEaXN0YW5jZSkgJiYgZW50aXR5Ll9pVGVzdENvbGxpc2lvbihzaG9ydGVzdENvbGxpc2lvbkRpc3RhbmNlLCB0aGlzLl9maW5kQ2xvc2VzdENvbGxpc2lvbikpIHtcblx0XHRcdFx0XHRzaG9ydGVzdENvbGxpc2lvbkRpc3RhbmNlID0gcGlja2luZ0NvbGxpc2lvblZPLnJheUVudHJ5RGlzdGFuY2U7XG5cdFx0XHRcdFx0YmVzdENvbGxpc2lvblZPID0gcGlja2luZ0NvbGxpc2lvblZPO1xuXHRcdFx0XHRcdGlmICghdGhpcy5fZmluZENsb3Nlc3RDb2xsaXNpb24pIHtcblx0XHRcdFx0XHRcdHRoaXMudXBkYXRlTG9jYWxQb3NpdGlvbihwaWNraW5nQ29sbGlzaW9uVk8pO1xuXHRcdFx0XHRcdFx0cmV0dXJuIHBpY2tpbmdDb2xsaXNpb25WTztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZiAoYmVzdENvbGxpc2lvblZPID09IG51bGwgfHwgcGlja2luZ0NvbGxpc2lvblZPLnJheUVudHJ5RGlzdGFuY2UgPCBiZXN0Q29sbGlzaW9uVk8ucmF5RW50cnlEaXN0YW5jZSkgeyAvLyBBIGJvdW5kcyBjb2xsaXNpb24gd2l0aCBubyB0cmlhbmdsZSBjb2xsaWRlciBzdG9wcyBhbGwgY2hlY2tzLlxuXHRcdFx0XHQvLyBOb3RlOiBhIGJvdW5kcyBjb2xsaXNpb24gd2l0aCBhIHJheSBvcmlnaW4gaW5zaWRlIGl0cyBib3VuZHMgaXMgT05MWSBldmVyIHVzZWRcblx0XHRcdFx0Ly8gdG8gZW5hYmxlIHRoZSBkZXRlY3Rpb24gb2YgYSBjb3JyZXNwb25zZGluZyB0cmlhbmdsZSBjb2xsaXNpb24uXG5cdFx0XHRcdC8vIFRoZXJlZm9yZSwgYm91bmRzIGNvbGxpc2lvbnMgd2l0aCBhIHJheSBvcmlnaW4gaW5zaWRlIGl0cyBib3VuZHMgY2FuIGJlIGlnbm9yZWRcblx0XHRcdFx0Ly8gaWYgaXQgaGFzIGJlZW4gZXN0YWJsaXNoZWQgdGhhdCB0aGVyZSBpcyBOTyB0cmlhbmdsZSBjb2xsaWRlciB0byB0ZXN0XG5cdFx0XHRcdGlmICghcGlja2luZ0NvbGxpc2lvblZPLnJheU9yaWdpbklzSW5zaWRlQm91bmRzKSB7XG5cdFx0XHRcdFx0dGhpcy51cGRhdGVMb2NhbFBvc2l0aW9uKHBpY2tpbmdDb2xsaXNpb25WTyk7XG5cdFx0XHRcdFx0cmV0dXJuIHBpY2tpbmdDb2xsaXNpb25WTztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBiZXN0Q29sbGlzaW9uVk87XG5cdH1cblxuXHRwcml2YXRlIHVwZGF0ZUxvY2FsUG9zaXRpb24ocGlja2luZ0NvbGxpc2lvblZPOlBpY2tpbmdDb2xsaXNpb25WTylcblx0e1xuXHRcdHZhciBjb2xsaXNpb25Qb3M6VmVjdG9yM0QgPSAoIHBpY2tpbmdDb2xsaXNpb25WTy5sb2NhbFBvc2l0aW9uID09IG51bGwgKT8gKHBpY2tpbmdDb2xsaXNpb25WTy5sb2NhbFBvc2l0aW9uID0gbmV3IFZlY3RvcjNEKCkpIDogcGlja2luZ0NvbGxpc2lvblZPLmxvY2FsUG9zaXRpb247XG5cblx0XHR2YXIgcmF5RGlyOlZlY3RvcjNEID0gcGlja2luZ0NvbGxpc2lvblZPLmxvY2FsUmF5RGlyZWN0aW9uO1xuXHRcdHZhciByYXlQb3M6VmVjdG9yM0QgPSBwaWNraW5nQ29sbGlzaW9uVk8ubG9jYWxSYXlQb3NpdGlvbjtcblx0XHR2YXIgdDpudW1iZXIgPSBwaWNraW5nQ29sbGlzaW9uVk8ucmF5RW50cnlEaXN0YW5jZTtcblx0XHRjb2xsaXNpb25Qb3MueCA9IHJheVBvcy54ICsgdCpyYXlEaXIueDtcblx0XHRjb2xsaXNpb25Qb3MueSA9IHJheVBvcy55ICsgdCpyYXlEaXIueTtcblx0XHRjb2xsaXNpb25Qb3MueiA9IHJheVBvcy56ICsgdCpyYXlEaXIuejtcblx0fVxuXG5cdHB1YmxpYyBkaXNwb3NlKClcblx0e1xuXHRcdC8vVE9ET1xuXHR9XG59XG5cbmV4cG9ydCA9IFJheWNhc3RQaWNrZXI7Il19