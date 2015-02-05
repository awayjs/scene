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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9waWNrL1JheWNhc3RQaWNrZXIudHMiXSwibmFtZXMiOlsiUmF5Y2FzdFBpY2tlciIsIlJheWNhc3RQaWNrZXIuY29uc3RydWN0b3IiLCJSYXljYXN0UGlja2VyLm9ubHlNb3VzZUVuYWJsZWQiLCJSYXljYXN0UGlja2VyLmdldFZpZXdDb2xsaXNpb24iLCJSYXljYXN0UGlja2VyLmdldFNjZW5lQ29sbGlzaW9uIiwiUmF5Y2FzdFBpY2tlci5zZXRJZ25vcmVMaXN0IiwiUmF5Y2FzdFBpY2tlci5pc0lnbm9yZWQiLCJSYXljYXN0UGlja2VyLnNvcnRPbk5lYXJUIiwiUmF5Y2FzdFBpY2tlci5nZXRQaWNraW5nQ29sbGlzaW9uVk8iLCJSYXljYXN0UGlja2VyLnVwZGF0ZUxvY2FsUG9zaXRpb24iLCJSYXljYXN0UGlja2VyLmRpc3Bvc2UiXSwibWFwcGluZ3MiOiJBQUFBLElBQU8sUUFBUSxXQUFnQiwrQkFBK0IsQ0FBQyxDQUFDO0FBUWhFLElBQU8sZ0JBQWdCLFdBQWMsOENBQThDLENBQUMsQ0FBQztBQUdyRixBQU9BOzs7Ozs7R0FERztJQUNHLGFBQWE7SUF3QmxCQTs7Ozs7T0FLR0E7SUFDSEEsU0E5QktBLGFBQWFBLENBOEJOQSxvQkFBb0NBO1FBQXBDQyxvQ0FBb0NBLEdBQXBDQSw0QkFBb0NBO1FBMUJ4Q0EscUJBQWdCQSxHQUFHQSxFQUFFQSxDQUFDQTtRQUN0QkEsc0JBQWlCQSxHQUFXQSxJQUFJQSxDQUFDQTtRQUdqQ0EsaUJBQVlBLEdBQVVBLENBQUNBLENBQUNBO1FBd0IvQkEsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxHQUFHQSxJQUFJQSxnQkFBZ0JBLEVBQUVBLENBQUNBO1FBRWhEQSxJQUFJQSxDQUFDQSxxQkFBcUJBLEdBQUdBLG9CQUFvQkEsQ0FBQ0E7UUFDbERBLElBQUlBLENBQUNBLFNBQVNBLEdBQUdBLElBQUlBLEtBQUtBLEVBQVdBLENBQUNBO0lBQ3ZDQSxDQUFDQTtJQXRCREQsc0JBQVdBLDJDQUFnQkE7UUFIM0JBOztXQUVHQTthQUNIQTtZQUVDRSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBO1FBQy9CQSxDQUFDQTthQUVERixVQUE0QkEsS0FBYUE7WUFFeENFLElBQUlBLENBQUNBLGlCQUFpQkEsR0FBR0EsS0FBS0EsQ0FBQ0E7UUFDaENBLENBQUNBOzs7T0FMQUY7SUFxQkRBOztPQUVHQTtJQUNJQSx3Q0FBZ0JBLEdBQXZCQSxVQUF3QkEsQ0FBUUEsRUFBRUEsQ0FBUUEsRUFBRUEsSUFBU0E7UUFFcERHLEFBQ0FBLFlBRFlBO1lBQ1JBLFdBQVdBLEdBQVlBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO1FBQ25EQSxJQUFJQSxZQUFZQSxHQUFZQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxRQUFRQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQTtRQUUxRUEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxXQUFXQSxFQUFFQSxZQUFZQSxFQUFFQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtJQUN0RUEsQ0FBQ0E7SUFFREg7O09BRUdBO0lBQ0lBLHlDQUFpQkEsR0FBeEJBLFVBQXlCQSxXQUFvQkEsRUFBRUEsWUFBcUJBLEVBQUVBLEtBQVdBO1FBRWhGSSxBQUNBQSxpQkFEaUJBO1FBQ2pCQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBO1FBRS9CQSxBQUNBQSxtQkFEbUJBO1FBQ25CQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLFdBQVdBLEdBQUdBLFdBQVdBLENBQUNBO1FBQ2pEQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLFlBQVlBLEdBQUdBLFlBQVlBLENBQUNBO1FBRW5EQSxBQUNBQSwyQkFEMkJBO1FBQzNCQSxLQUFLQSxDQUFDQSxrQkFBa0JBLENBQUNBLElBQUlBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsQ0FBQ0E7UUFFakRBLElBQUlBLENBQUNBLFlBQVlBLEdBQUdBLENBQUNBLENBQUNBO1FBQ3RCQSxJQUFJQSxJQUFJQSxHQUFrQkEsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxVQUFVQSxDQUFDQTtRQUM1REEsSUFBSUEsTUFBY0EsQ0FBQ0E7UUFFbkJBLE9BQU9BLElBQUlBLEVBQUVBLENBQUNBO1lBQ2JBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLE1BQU1BLEdBQUdBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO2dCQUN6Q0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsRUFBRUEsQ0FBQ0EsR0FBR0EsTUFBTUEsQ0FBQ0E7WUFFOUNBLElBQUlBLEdBQUdBLElBQUlBLENBQUNBLElBQUlBLENBQUNBO1FBQ2xCQSxDQUFDQTtRQUVEQSxBQUNBQSxxQ0FEcUNBO1FBQ3JDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQTtZQUN0QkEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7UUFFYkEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EscUJBQXFCQSxDQUFDQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLENBQUNBO0lBQzNEQSxDQUFDQTtJQUVGSixnSEFBZ0hBO0lBQ2hIQSxLQUFLQTtJQUNMQSwyQkFBMkJBO0lBQzNCQSxFQUFFQTtJQUNGQSx3QkFBd0JBO0lBQ3hCQSxvQ0FBb0NBO0lBQ3BDQSxFQUFFQTtJQUNGQSx5Q0FBeUNBO0lBQ3pDQSwyQkFBMkJBO0lBQzNCQSxFQUFFQTtJQUNGQSx3REFBd0RBO0lBQ3hEQSxvREFBb0RBO0lBQ3BEQSxNQUFNQTtJQUNOQSxFQUFFQTtJQUNGQSwrREFBK0RBO0lBQy9EQSxLQUFLQTtJQUVHQSxxQ0FBYUEsR0FBcEJBLFVBQXFCQSxRQUFRQTtRQUU1QkssSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxHQUFHQSxRQUFRQSxDQUFDQTtJQUNsQ0EsQ0FBQ0E7SUFFT0wsaUNBQVNBLEdBQWpCQSxVQUFrQkEsTUFBY0E7UUFFL0JNLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLGlCQUFpQkEsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsZ0JBQWdCQSxFQUFFQSxDQUFDQTtZQUN4REEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7UUFFYkEsSUFBSUEsR0FBR0EsR0FBVUEsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxNQUFNQSxDQUFDQTtRQUM5Q0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBVUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsR0FBR0EsRUFBRUEsQ0FBQ0EsRUFBRUE7WUFDbENBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsTUFBTUEsQ0FBQ0E7Z0JBQ3RDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtRQUVkQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQTtJQUNkQSxDQUFDQTtJQUVPTixtQ0FBV0EsR0FBbkJBLFVBQW9CQSxPQUFlQSxFQUFFQSxPQUFlQTtRQUVuRE8sTUFBTUEsQ0FBQ0EsT0FBT0EsQ0FBQ0Esb0JBQW9CQSxDQUFDQSxnQkFBZ0JBLEdBQUdBLE9BQU9BLENBQUNBLG9CQUFvQkEsQ0FBQ0EsZ0JBQWdCQSxHQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUM5R0EsQ0FBQ0E7SUFFT1AsNkNBQXFCQSxHQUE3QkEsVUFBOEJBLFNBQW9CQTtRQUVqRFEsQUFDQUEsc0JBRHNCQTtRQUN0QkEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0E7UUFFMUNBLEFBQ0FBLDBDQUQwQ0E7UUFDMUNBLElBQUlBLENBQUNBLFNBQVNBLEdBQUdBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLEVBQUVBLGdDQUFnQ0E7UUFFeEZBLEFBS0FBLHdFQUx3RUE7UUFDeEVBLDRDQUE0Q0E7UUFDNUNBLDhFQUE4RUE7UUFDOUVBLHdFQUF3RUE7WUFFcEVBLHlCQUF5QkEsR0FBVUEsTUFBTUEsQ0FBQ0EsU0FBU0EsQ0FBQ0E7UUFDeERBLElBQUlBLGVBQWtDQSxDQUFDQTtRQUN2Q0EsSUFBSUEsa0JBQXFDQSxDQUFDQTtRQUMxQ0EsSUFBSUEsTUFBY0EsQ0FBQ0E7UUFDbkJBLElBQUlBLENBQVFBLENBQUNBO1FBRWJBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLFlBQVlBLEVBQUVBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBO1lBQ3hDQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUMzQkEsa0JBQWtCQSxHQUFHQSxNQUFNQSxDQUFDQSxvQkFBb0JBLENBQUNBO1lBQ2pEQSxFQUFFQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQSxlQUFlQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDNUJBLEFBQ0FBLHdFQUR3RUE7Z0JBQ3hFQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxlQUFlQSxJQUFJQSxJQUFJQSxJQUFJQSxrQkFBa0JBLENBQUNBLGdCQUFnQkEsR0FBR0EsZUFBZUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxJQUFJQSxNQUFNQSxDQUFDQSxlQUFlQSxDQUFDQSx5QkFBeUJBLEVBQUVBLElBQUlBLENBQUNBLHFCQUFxQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQzFMQSx5QkFBeUJBLEdBQUdBLGtCQUFrQkEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQTtvQkFDaEVBLGVBQWVBLEdBQUdBLGtCQUFrQkEsQ0FBQ0E7b0JBQ3JDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxxQkFBcUJBLENBQUNBLENBQUNBLENBQUNBO3dCQUNqQ0EsSUFBSUEsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxrQkFBa0JBLENBQUNBLENBQUNBO3dCQUM3Q0EsTUFBTUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQTtvQkFDM0JBLENBQUNBO2dCQUNGQSxDQUFDQTtZQUNGQSxDQUFDQTtZQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxlQUFlQSxJQUFJQSxJQUFJQSxJQUFJQSxrQkFBa0JBLENBQUNBLGdCQUFnQkEsR0FBR0EsZUFBZUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDOUdBLEFBSUFBLGlGQUppRkE7Z0JBQ2pGQSxrRUFBa0VBO2dCQUNsRUEsa0ZBQWtGQTtnQkFDbEZBLHdFQUF3RUE7Z0JBQ3hFQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxrQkFBa0JBLENBQUNBLHVCQUF1QkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ2pEQSxJQUFJQSxDQUFDQSxtQkFBbUJBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsQ0FBQ0E7b0JBQzdDQSxNQUFNQSxDQUFDQSxrQkFBa0JBLENBQUNBO2dCQUMzQkEsQ0FBQ0E7WUFDRkEsQ0FBQ0E7UUFDRkEsQ0FBQ0E7UUFFREEsTUFBTUEsQ0FBQ0EsZUFBZUEsQ0FBQ0E7SUFDeEJBLENBQUNBO0lBRU9SLDJDQUFtQkEsR0FBM0JBLFVBQTRCQSxrQkFBcUNBO1FBRWhFUyxJQUFJQSxZQUFZQSxHQUFZQSxDQUFFQSxrQkFBa0JBLENBQUNBLGFBQWFBLElBQUlBLElBQUlBLENBQUVBLEdBQUVBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsYUFBYUEsR0FBR0EsSUFBSUEsUUFBUUEsRUFBRUEsQ0FBQ0EsR0FBR0Esa0JBQWtCQSxDQUFDQSxhQUFhQSxDQUFDQTtRQUVqS0EsSUFBSUEsTUFBTUEsR0FBWUEsa0JBQWtCQSxDQUFDQSxpQkFBaUJBLENBQUNBO1FBQzNEQSxJQUFJQSxNQUFNQSxHQUFZQSxrQkFBa0JBLENBQUNBLGdCQUFnQkEsQ0FBQ0E7UUFDMURBLElBQUlBLENBQUNBLEdBQVVBLGtCQUFrQkEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQTtRQUNuREEsWUFBWUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDdkNBLFlBQVlBLENBQUNBLENBQUNBLEdBQUdBLE1BQU1BLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEdBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBO1FBQ3ZDQSxZQUFZQSxDQUFDQSxDQUFDQSxHQUFHQSxNQUFNQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUN4Q0EsQ0FBQ0E7SUFFTVQsK0JBQU9BLEdBQWRBO1FBRUNVLE1BQU1BO0lBQ1BBLENBQUNBO0lBQ0ZWLG9CQUFDQTtBQUFEQSxDQTFMQSxBQTBMQ0EsSUFBQTtBQUVELEFBQXVCLGlCQUFkLGFBQWEsQ0FBQyIsImZpbGUiOiJwaWNrL1JheWNhc3RQaWNrZXIuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZlY3RvcjNEXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vVmVjdG9yM0RcIik7XHJcblxyXG5pbXBvcnQgU2NlbmVcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvY29udGFpbmVycy9TY2VuZVwiKTtcclxuaW1wb3J0IFZpZXdcdFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9jb250YWluZXJzL1ZpZXdcIik7XHJcbmltcG9ydCBJUGlja2VyXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3BpY2svSVBpY2tlclwiKTtcclxuaW1wb3J0IFBpY2tpbmdDb2xsaXNpb25WT1x0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9waWNrL1BpY2tpbmdDb2xsaXNpb25WT1wiKTtcclxuaW1wb3J0IEVudGl0eUxpc3RJdGVtXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcG9vbC9FbnRpdHlMaXN0SXRlbVwiKTtcclxuaW1wb3J0IElDb2xsZWN0b3JcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3RyYXZlcnNlL0lDb2xsZWN0b3JcIik7XHJcbmltcG9ydCBSYXljYXN0Q29sbGVjdG9yXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvdHJhdmVyc2UvUmF5Y2FzdENvbGxlY3RvclwiKTtcclxuaW1wb3J0IElFbnRpdHlcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZW50aXRpZXMvSUVudGl0eVwiKTtcclxuXHJcbi8qKlxyXG4gKiBQaWNrcyBhIDNkIG9iamVjdCBmcm9tIGEgdmlldyBvciBzY2VuZSBieSAzRCByYXljYXN0IGNhbGN1bGF0aW9ucy5cclxuICogUGVyZm9ybXMgYW4gaW5pdGlhbCBjb2Fyc2UgYm91bmRhcnkgY2FsY3VsYXRpb24gdG8gcmV0dXJuIGEgc3Vic2V0IG9mIGVudGl0aWVzIHdob3NlIGJvdW5kaW5nIHZvbHVtZXMgaW50ZXJzZWN0IHdpdGggdGhlIHNwZWNpZmllZCByYXksXHJcbiAqIHRoZW4gdHJpZ2dlcnMgYW4gb3B0aW9uYWwgcGlja2luZyBjb2xsaWRlciBvbiBpbmRpdmlkdWFsIGVudGl0eSBvYmplY3RzIHRvIGZ1cnRoZXIgZGV0ZXJtaW5lIHRoZSBwcmVjaXNlIHZhbHVlcyBvZiB0aGUgcGlja2luZyByYXkgY29sbGlzaW9uLlxyXG4gKlxyXG4gKiBAY2xhc3MgYXdheS5waWNrLlJheWNhc3RQaWNrZXJcclxuICovXHJcbmNsYXNzIFJheWNhc3RQaWNrZXIgaW1wbGVtZW50cyBJUGlja2VyXHJcbntcclxuXHRwcml2YXRlIF9maW5kQ2xvc2VzdENvbGxpc2lvbjpib29sZWFuO1xyXG5cdHByaXZhdGUgX3JheWNhc3RDb2xsZWN0b3I6UmF5Y2FzdENvbGxlY3RvcjtcclxuXHRwcml2YXRlIF9pZ25vcmVkRW50aXRpZXMgPSBbXTtcclxuXHRwcml2YXRlIF9vbmx5TW91c2VFbmFibGVkOmJvb2xlYW4gPSB0cnVlO1xyXG5cclxuXHRwcml2YXRlIF9lbnRpdGllczpBcnJheTxJRW50aXR5PjtcclxuXHRwcml2YXRlIF9udW1FbnRpdGllczpudW1iZXIgPSAwO1xyXG5cdHByaXZhdGUgX2hhc0NvbGxpc2lvbnM6Ym9vbGVhbjtcclxuXHJcblx0LyoqXHJcblx0ICogQGluaGVyaXREb2NcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IG9ubHlNb3VzZUVuYWJsZWQoKTpib29sZWFuXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX29ubHlNb3VzZUVuYWJsZWQ7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IG9ubHlNb3VzZUVuYWJsZWQodmFsdWU6Ym9vbGVhbilcclxuXHR7XHJcblx0XHR0aGlzLl9vbmx5TW91c2VFbmFibGVkID0gdmFsdWU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGEgbmV3IDxjb2RlPlJheWNhc3RQaWNrZXI8L2NvZGU+IG9iamVjdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBmaW5kQ2xvc2VzdENvbGxpc2lvbiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHBpY2tlciBzZWFyY2hlcyBmb3IgdGhlIGNsb3Nlc3QgYm91bmRzIGNvbGxpc2lvbiBhbG9uZyB0aGUgcmF5LFxyXG5cdCAqIG9yIHNpbXBseSByZXR1cm5zIHRoZSBmaXJzdCBjb2xsaXNpb24gZW5jb3VudGVyZWQuIERlZmF1bHRzIHRvIGZhbHNlLlxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGZpbmRDbG9zZXN0Q29sbGlzaW9uOmJvb2xlYW4gPSBmYWxzZSlcclxuXHR7XHJcblx0XHR0aGlzLl9yYXljYXN0Q29sbGVjdG9yID0gbmV3IFJheWNhc3RDb2xsZWN0b3IoKTtcclxuXHJcblx0XHR0aGlzLl9maW5kQ2xvc2VzdENvbGxpc2lvbiA9IGZpbmRDbG9zZXN0Q29sbGlzaW9uO1xyXG5cdFx0dGhpcy5fZW50aXRpZXMgPSBuZXcgQXJyYXk8SUVudGl0eT4oKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBpbmhlcml0RG9jXHJcblx0ICovXHJcblx0cHVibGljIGdldFZpZXdDb2xsaXNpb24oeDpudW1iZXIsIHk6bnVtYmVyLCB2aWV3OlZpZXcpOlBpY2tpbmdDb2xsaXNpb25WT1xyXG5cdHtcclxuXHRcdC8vdXBkYXRlIHJheVxyXG5cdFx0dmFyIHJheVBvc2l0aW9uOlZlY3RvcjNEID0gdmlldy51bnByb2plY3QoeCwgeSwgMCk7XHJcblx0XHR2YXIgcmF5RGlyZWN0aW9uOlZlY3RvcjNEID0gdmlldy51bnByb2plY3QoeCwgeSwgMSkuc3VidHJhY3QocmF5UG9zaXRpb24pO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLmdldFNjZW5lQ29sbGlzaW9uKHJheVBvc2l0aW9uLCByYXlEaXJlY3Rpb24sIHZpZXcuc2NlbmUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQGluaGVyaXREb2NcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0U2NlbmVDb2xsaXNpb24ocmF5UG9zaXRpb246VmVjdG9yM0QsIHJheURpcmVjdGlvbjpWZWN0b3IzRCwgc2NlbmU6U2NlbmUpOlBpY2tpbmdDb2xsaXNpb25WT1xyXG5cdHtcclxuXHRcdC8vY2xlYXIgY29sbGVjdG9yXHJcblx0XHR0aGlzLl9yYXljYXN0Q29sbGVjdG9yLmNsZWFyKCk7XHJcblxyXG5cdFx0Ly9zZXR1cCByYXkgdmVjdG9yc1xyXG5cdFx0dGhpcy5fcmF5Y2FzdENvbGxlY3Rvci5yYXlQb3NpdGlvbiA9IHJheVBvc2l0aW9uO1xyXG5cdFx0dGhpcy5fcmF5Y2FzdENvbGxlY3Rvci5yYXlEaXJlY3Rpb24gPSByYXlEaXJlY3Rpb247XHJcblxyXG5cdFx0Ly8gY29sbGVjdCBlbnRpdGllcyB0byB0ZXN0XHJcblx0XHRzY2VuZS50cmF2ZXJzZVBhcnRpdGlvbnModGhpcy5fcmF5Y2FzdENvbGxlY3Rvcik7XHJcblxyXG5cdFx0dGhpcy5fbnVtRW50aXRpZXMgPSAwO1xyXG5cdFx0dmFyIG5vZGU6RW50aXR5TGlzdEl0ZW0gPSB0aGlzLl9yYXljYXN0Q29sbGVjdG9yLmVudGl0eUhlYWQ7XHJcblx0XHR2YXIgZW50aXR5OklFbnRpdHk7XHJcblxyXG5cdFx0d2hpbGUgKG5vZGUpIHtcclxuXHRcdFx0aWYgKCF0aGlzLmlzSWdub3JlZChlbnRpdHkgPSBub2RlLmVudGl0eSkpXHJcblx0XHRcdFx0dGhpcy5fZW50aXRpZXNbdGhpcy5fbnVtRW50aXRpZXMrK10gPSBlbnRpdHk7XHJcblxyXG5cdFx0XHRub2RlID0gbm9kZS5uZXh0O1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vZWFybHkgb3V0IGlmIG5vIGNvbGxpc2lvbnMgZGV0ZWN0ZWRcclxuXHRcdGlmICghdGhpcy5fbnVtRW50aXRpZXMpXHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLmdldFBpY2tpbmdDb2xsaXNpb25WTyh0aGlzLl9yYXljYXN0Q29sbGVjdG9yKTtcclxuXHR9XHJcblxyXG4vL1x0XHRwdWJsaWMgZ2V0RW50aXR5Q29sbGlzaW9uKHBvc2l0aW9uOlZlY3RvcjNELCBkaXJlY3Rpb246VmVjdG9yM0QsIGVudGl0aWVzOkFycmF5PElFbnRpdHk+KTpQaWNraW5nQ29sbGlzaW9uVk9cclxuLy9cdFx0e1xyXG4vL1x0XHRcdHRoaXMuX251bUVudGl0aWVzID0gMDtcclxuLy9cclxuLy9cdFx0XHR2YXIgZW50aXR5OklFbnRpdHk7XHJcbi8vXHRcdFx0dmFyIGw6bnVtYmVyID0gZW50aXRpZXMubGVuZ3RoO1xyXG4vL1xyXG4vL1x0XHRcdGZvciAodmFyIGM6bnVtYmVyID0gMDsgYyA8IGw7IGMrKykge1xyXG4vL1x0XHRcdFx0ZW50aXR5ID0gZW50aXRpZXNbY107XHJcbi8vXHJcbi8vXHRcdFx0XHRpZiAoZW50aXR5LmlzSW50ZXJzZWN0aW5nUmF5KHBvc2l0aW9uLCBkaXJlY3Rpb24pKVxyXG4vL1x0XHRcdFx0XHR0aGlzLl9lbnRpdGllc1t0aGlzLl9udW1FbnRpdGllcysrXSA9IGVudGl0eTtcclxuLy9cdFx0XHR9XHJcbi8vXHJcbi8vXHRcdFx0cmV0dXJuIHRoaXMuZ2V0UGlja2luZ0NvbGxpc2lvblZPKHRoaXMuX3JheWNhc3RDb2xsZWN0b3IpO1xyXG4vL1x0XHR9XHJcblxyXG5cdHB1YmxpYyBzZXRJZ25vcmVMaXN0KGVudGl0aWVzKVxyXG5cdHtcclxuXHRcdHRoaXMuX2lnbm9yZWRFbnRpdGllcyA9IGVudGl0aWVzO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBpc0lnbm9yZWQoZW50aXR5OklFbnRpdHkpOmJvb2xlYW5cclxuXHR7XHJcblx0XHRpZiAodGhpcy5fb25seU1vdXNlRW5hYmxlZCAmJiAhZW50aXR5Ll9pSXNNb3VzZUVuYWJsZWQoKSlcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblxyXG5cdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9pZ25vcmVkRW50aXRpZXMubGVuZ3RoO1xyXG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgbGVuOyBpKyspXHJcblx0XHRcdGlmICh0aGlzLl9pZ25vcmVkRW50aXRpZXNbaV0gPT0gZW50aXR5KVxyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgc29ydE9uTmVhclQoZW50aXR5MTpJRW50aXR5LCBlbnRpdHkyOklFbnRpdHkpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiBlbnRpdHkxLl9pUGlja2luZ0NvbGxpc2lvblZPLnJheUVudHJ5RGlzdGFuY2UgPiBlbnRpdHkyLl9pUGlja2luZ0NvbGxpc2lvblZPLnJheUVudHJ5RGlzdGFuY2U/IDEgOiAtMTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgZ2V0UGlja2luZ0NvbGxpc2lvblZPKGNvbGxlY3RvcjpJQ29sbGVjdG9yKTpQaWNraW5nQ29sbGlzaW9uVk9cclxuXHR7XHJcblx0XHQvLyB0cmltIGJlZm9yZSBzb3J0aW5nXHJcblx0XHR0aGlzLl9lbnRpdGllcy5sZW5ndGggPSB0aGlzLl9udW1FbnRpdGllcztcclxuXHJcblx0XHQvLyBTb3J0IGVudGl0aWVzIGZyb20gY2xvc2VzdCB0byBmdXJ0aGVzdC5cclxuXHRcdHRoaXMuX2VudGl0aWVzID0gdGhpcy5fZW50aXRpZXMuc29ydCh0aGlzLnNvcnRPbk5lYXJUKTsgLy8gVE9ETyAtIHRlc3Qgc29ydCBmaWx0ZXIgaW4gSlNcclxuXHJcblx0XHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdC8vIEV2YWx1YXRlIHRyaWFuZ2xlIGNvbGxpc2lvbnMgd2hlbiBuZWVkZWQuXHJcblx0XHQvLyBSZXBsYWNlcyBjb2xsaXNpb24gZGF0YSBwcm92aWRlZCBieSBib3VuZHMgY29sbGlkZXIgd2l0aCBtb3JlIHByZWNpc2UgZGF0YS5cclxuXHRcdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuXHRcdHZhciBzaG9ydGVzdENvbGxpc2lvbkRpc3RhbmNlOm51bWJlciA9IE51bWJlci5NQVhfVkFMVUU7XHJcblx0XHR2YXIgYmVzdENvbGxpc2lvblZPOlBpY2tpbmdDb2xsaXNpb25WTztcclxuXHRcdHZhciBwaWNraW5nQ29sbGlzaW9uVk86UGlja2luZ0NvbGxpc2lvblZPO1xyXG5cdFx0dmFyIGVudGl0eTpJRW50aXR5O1xyXG5cdFx0dmFyIGk6bnVtYmVyO1xyXG5cclxuXHRcdGZvciAoaSA9IDA7IGkgPCB0aGlzLl9udW1FbnRpdGllczsgKytpKSB7XHJcblx0XHRcdGVudGl0eSA9IHRoaXMuX2VudGl0aWVzW2ldO1xyXG5cdFx0XHRwaWNraW5nQ29sbGlzaW9uVk8gPSBlbnRpdHkuX2lQaWNraW5nQ29sbGlzaW9uVk87XHJcblx0XHRcdGlmIChlbnRpdHkucGlja2luZ0NvbGxpZGVyKSB7XHJcblx0XHRcdFx0Ly8gSWYgYSBjb2xsaXNpb24gZXhpc3RzLCB1cGRhdGUgdGhlIGNvbGxpc2lvbiBkYXRhIGFuZCBzdG9wIGFsbCBjaGVja3MuXHJcblx0XHRcdFx0aWYgKChiZXN0Q29sbGlzaW9uVk8gPT0gbnVsbCB8fCBwaWNraW5nQ29sbGlzaW9uVk8ucmF5RW50cnlEaXN0YW5jZSA8IGJlc3RDb2xsaXNpb25WTy5yYXlFbnRyeURpc3RhbmNlKSAmJiBlbnRpdHkuX2lUZXN0Q29sbGlzaW9uKHNob3J0ZXN0Q29sbGlzaW9uRGlzdGFuY2UsIHRoaXMuX2ZpbmRDbG9zZXN0Q29sbGlzaW9uKSkge1xyXG5cdFx0XHRcdFx0c2hvcnRlc3RDb2xsaXNpb25EaXN0YW5jZSA9IHBpY2tpbmdDb2xsaXNpb25WTy5yYXlFbnRyeURpc3RhbmNlO1xyXG5cdFx0XHRcdFx0YmVzdENvbGxpc2lvblZPID0gcGlja2luZ0NvbGxpc2lvblZPO1xyXG5cdFx0XHRcdFx0aWYgKCF0aGlzLl9maW5kQ2xvc2VzdENvbGxpc2lvbikge1xyXG5cdFx0XHRcdFx0XHR0aGlzLnVwZGF0ZUxvY2FsUG9zaXRpb24ocGlja2luZ0NvbGxpc2lvblZPKTtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHBpY2tpbmdDb2xsaXNpb25WTztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSBpZiAoYmVzdENvbGxpc2lvblZPID09IG51bGwgfHwgcGlja2luZ0NvbGxpc2lvblZPLnJheUVudHJ5RGlzdGFuY2UgPCBiZXN0Q29sbGlzaW9uVk8ucmF5RW50cnlEaXN0YW5jZSkgeyAvLyBBIGJvdW5kcyBjb2xsaXNpb24gd2l0aCBubyB0cmlhbmdsZSBjb2xsaWRlciBzdG9wcyBhbGwgY2hlY2tzLlxyXG5cdFx0XHRcdC8vIE5vdGU6IGEgYm91bmRzIGNvbGxpc2lvbiB3aXRoIGEgcmF5IG9yaWdpbiBpbnNpZGUgaXRzIGJvdW5kcyBpcyBPTkxZIGV2ZXIgdXNlZFxyXG5cdFx0XHRcdC8vIHRvIGVuYWJsZSB0aGUgZGV0ZWN0aW9uIG9mIGEgY29ycmVzcG9uc2RpbmcgdHJpYW5nbGUgY29sbGlzaW9uLlxyXG5cdFx0XHRcdC8vIFRoZXJlZm9yZSwgYm91bmRzIGNvbGxpc2lvbnMgd2l0aCBhIHJheSBvcmlnaW4gaW5zaWRlIGl0cyBib3VuZHMgY2FuIGJlIGlnbm9yZWRcclxuXHRcdFx0XHQvLyBpZiBpdCBoYXMgYmVlbiBlc3RhYmxpc2hlZCB0aGF0IHRoZXJlIGlzIE5PIHRyaWFuZ2xlIGNvbGxpZGVyIHRvIHRlc3RcclxuXHRcdFx0XHRpZiAoIXBpY2tpbmdDb2xsaXNpb25WTy5yYXlPcmlnaW5Jc0luc2lkZUJvdW5kcykge1xyXG5cdFx0XHRcdFx0dGhpcy51cGRhdGVMb2NhbFBvc2l0aW9uKHBpY2tpbmdDb2xsaXNpb25WTyk7XHJcblx0XHRcdFx0XHRyZXR1cm4gcGlja2luZ0NvbGxpc2lvblZPO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBiZXN0Q29sbGlzaW9uVk87XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHVwZGF0ZUxvY2FsUG9zaXRpb24ocGlja2luZ0NvbGxpc2lvblZPOlBpY2tpbmdDb2xsaXNpb25WTylcclxuXHR7XHJcblx0XHR2YXIgY29sbGlzaW9uUG9zOlZlY3RvcjNEID0gKCBwaWNraW5nQ29sbGlzaW9uVk8ubG9jYWxQb3NpdGlvbiA9PSBudWxsICk/IChwaWNraW5nQ29sbGlzaW9uVk8ubG9jYWxQb3NpdGlvbiA9IG5ldyBWZWN0b3IzRCgpKSA6IHBpY2tpbmdDb2xsaXNpb25WTy5sb2NhbFBvc2l0aW9uO1xyXG5cclxuXHRcdHZhciByYXlEaXI6VmVjdG9yM0QgPSBwaWNraW5nQ29sbGlzaW9uVk8ubG9jYWxSYXlEaXJlY3Rpb247XHJcblx0XHR2YXIgcmF5UG9zOlZlY3RvcjNEID0gcGlja2luZ0NvbGxpc2lvblZPLmxvY2FsUmF5UG9zaXRpb247XHJcblx0XHR2YXIgdDpudW1iZXIgPSBwaWNraW5nQ29sbGlzaW9uVk8ucmF5RW50cnlEaXN0YW5jZTtcclxuXHRcdGNvbGxpc2lvblBvcy54ID0gcmF5UG9zLnggKyB0KnJheURpci54O1xyXG5cdFx0Y29sbGlzaW9uUG9zLnkgPSByYXlQb3MueSArIHQqcmF5RGlyLnk7XHJcblx0XHRjb2xsaXNpb25Qb3MueiA9IHJheVBvcy56ICsgdCpyYXlEaXIuejtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBkaXNwb3NlKClcclxuXHR7XHJcblx0XHQvL1RPRE9cclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCA9IFJheWNhc3RQaWNrZXI7Il19