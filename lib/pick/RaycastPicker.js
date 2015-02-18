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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9waWNrL1JheWNhc3RQaWNrZXIudHMiXSwibmFtZXMiOlsiUmF5Y2FzdFBpY2tlciIsIlJheWNhc3RQaWNrZXIuY29uc3RydWN0b3IiLCJSYXljYXN0UGlja2VyLm9ubHlNb3VzZUVuYWJsZWQiLCJSYXljYXN0UGlja2VyLmdldFZpZXdDb2xsaXNpb24iLCJSYXljYXN0UGlja2VyLmdldFNjZW5lQ29sbGlzaW9uIiwiUmF5Y2FzdFBpY2tlci5zZXRJZ25vcmVMaXN0IiwiUmF5Y2FzdFBpY2tlci5pc0lnbm9yZWQiLCJSYXljYXN0UGlja2VyLnNvcnRPbk5lYXJUIiwiUmF5Y2FzdFBpY2tlci5nZXRQaWNraW5nQ29sbGlzaW9uVk8iLCJSYXljYXN0UGlja2VyLnVwZGF0ZUxvY2FsUG9zaXRpb24iLCJSYXljYXN0UGlja2VyLmRpc3Bvc2UiXSwibWFwcGluZ3MiOiJBQUFBLElBQU8sUUFBUSxXQUFnQiwrQkFBK0IsQ0FBQyxDQUFDO0FBUWhFLElBQU8sZ0JBQWdCLFdBQWMsOENBQThDLENBQUMsQ0FBQztBQUdyRixBQU9BOzs7Ozs7R0FERztJQUNHLGFBQWE7SUF3QmxCQTs7Ozs7T0FLR0E7SUFDSEEsU0E5QktBLGFBQWFBLENBOEJOQSxvQkFBb0NBO1FBQXBDQyxvQ0FBb0NBLEdBQXBDQSw0QkFBb0NBO1FBMUJ4Q0EscUJBQWdCQSxHQUFHQSxFQUFFQSxDQUFDQTtRQUN0QkEsc0JBQWlCQSxHQUFXQSxJQUFJQSxDQUFDQTtRQUdqQ0EsaUJBQVlBLEdBQVVBLENBQUNBLENBQUNBO1FBd0IvQkEsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxHQUFHQSxJQUFJQSxnQkFBZ0JBLEVBQUVBLENBQUNBO1FBRWhEQSxJQUFJQSxDQUFDQSxxQkFBcUJBLEdBQUdBLG9CQUFvQkEsQ0FBQ0E7UUFDbERBLElBQUlBLENBQUNBLFNBQVNBLEdBQUdBLElBQUlBLEtBQUtBLEVBQVdBLENBQUNBO0lBQ3ZDQSxDQUFDQTtJQXRCREQsc0JBQVdBLDJDQUFn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LGtCQUFrQkEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQTtRQUNuREEsWUFBWUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDdkNBLFlBQVlBLENBQUNBLENBQUNBLEdBQUdBLE1BQU1BLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEdBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBO1FBQ3ZDQSxZQUFZQSxDQUFDQSxDQUFDQSxHQUFHQSxNQUFNQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUN4Q0EsQ0FBQ0E7SUFFTVQsK0JBQU9BLEdBQWRBO1FBRUNVLE1BQU1BO0lBQ1BBLENBQUNBO0lBQ0ZWLG9CQUFDQTtBQUFEQSxDQTFMQSxBQTBMQ0EsSUFBQTtBQUVELEFBQXVCLGlCQUFkLGFBQWEsQ0FBQyIsImZpbGUiOiJwaWNrL1JheWNhc3RQaWNrZXIuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZlY3RvcjNEXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vVmVjdG9yM0RcIik7XHJcblxyXG5pbXBvcnQgU2NlbmVcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvY29udGFpbmVycy9TY2VuZVwiKTtcclxuaW1wb3J0IFZpZXdcdFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9jb250YWluZXJzL1ZpZXdcIik7XHJcbmltcG9ydCBJUGlja2VyXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3BpY2svSVBpY2tlclwiKTtcclxuaW1wb3J0IFBpY2tpbmdDb2xsaXNpb25WT1x0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9waWNrL1BpY2tpbmdDb2xsaXNpb25WT1wiKTtcclxuaW1wb3J0IEVudGl0eUxpc3RJdGVtXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcG9vbC9FbnRpdHlMaXN0SXRlbVwiKTtcclxuaW1wb3J0IENvbGxlY3RvckJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi90cmF2ZXJzZS9Db2xsZWN0b3JCYXNlXCIpO1xyXG5pbXBvcnQgUmF5Y2FzdENvbGxlY3Rvclx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3RyYXZlcnNlL1JheWNhc3RDb2xsZWN0b3JcIik7XHJcbmltcG9ydCBJRW50aXR5XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2VudGl0aWVzL0lFbnRpdHlcIik7XHJcblxyXG4vKipcclxuICogUGlja3MgYSAzZCBvYmplY3QgZnJvbSBhIHZpZXcgb3Igc2NlbmUgYnkgM0QgcmF5Y2FzdCBjYWxjdWxhdGlvbnMuXHJcbiAqIFBlcmZvcm1zIGFuIGluaXRpYWwgY29hcnNlIGJvdW5kYXJ5IGNhbGN1bGF0aW9uIHRvIHJldHVybiBhIHN1YnNldCBvZiBlbnRpdGllcyB3aG9zZSBib3VuZGluZyB2b2x1bWVzIGludGVyc2VjdCB3aXRoIHRoZSBzcGVjaWZpZWQgcmF5LFxyXG4gKiB0aGVuIHRyaWdnZXJzIGFuIG9wdGlvbmFsIHBpY2tpbmcgY29sbGlkZXIgb24gaW5kaXZpZHVhbCBlbnRpdHkgb2JqZWN0cyB0byBmdXJ0aGVyIGRldGVybWluZSB0aGUgcHJlY2lzZSB2YWx1ZXMgb2YgdGhlIHBpY2tpbmcgcmF5IGNvbGxpc2lvbi5cclxuICpcclxuICogQGNsYXNzIGF3YXkucGljay5SYXljYXN0UGlja2VyXHJcbiAqL1xyXG5jbGFzcyBSYXljYXN0UGlja2VyIGltcGxlbWVudHMgSVBpY2tlclxyXG57XHJcblx0cHJpdmF0ZSBfZmluZENsb3Nlc3RDb2xsaXNpb246Ym9vbGVhbjtcclxuXHRwcml2YXRlIF9yYXljYXN0Q29sbGVjdG9yOlJheWNhc3RDb2xsZWN0b3I7XHJcblx0cHJpdmF0ZSBfaWdub3JlZEVudGl0aWVzID0gW107XHJcblx0cHJpdmF0ZSBfb25seU1vdXNlRW5hYmxlZDpib29sZWFuID0gdHJ1ZTtcclxuXHJcblx0cHJpdmF0ZSBfZW50aXRpZXM6QXJyYXk8SUVudGl0eT47XHJcblx0cHJpdmF0ZSBfbnVtRW50aXRpZXM6bnVtYmVyID0gMDtcclxuXHRwcml2YXRlIF9oYXNDb2xsaXNpb25zOmJvb2xlYW47XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBpbmhlcml0RG9jXHJcblx0ICovXHJcblx0cHVibGljIGdldCBvbmx5TW91c2VFbmFibGVkKCk6Ym9vbGVhblxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9vbmx5TW91c2VFbmFibGVkO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBvbmx5TW91c2VFbmFibGVkKHZhbHVlOmJvb2xlYW4pXHJcblx0e1xyXG5cdFx0dGhpcy5fb25seU1vdXNlRW5hYmxlZCA9IHZhbHVlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhIG5ldyA8Y29kZT5SYXljYXN0UGlja2VyPC9jb2RlPiBvYmplY3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gZmluZENsb3Nlc3RDb2xsaXNpb24gRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBwaWNrZXIgc2VhcmNoZXMgZm9yIHRoZSBjbG9zZXN0IGJvdW5kcyBjb2xsaXNpb24gYWxvbmcgdGhlIHJheSxcclxuXHQgKiBvciBzaW1wbHkgcmV0dXJucyB0aGUgZmlyc3QgY29sbGlzaW9uIGVuY291bnRlcmVkLiBEZWZhdWx0cyB0byBmYWxzZS5cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcihmaW5kQ2xvc2VzdENvbGxpc2lvbjpib29sZWFuID0gZmFsc2UpXHJcblx0e1xyXG5cdFx0dGhpcy5fcmF5Y2FzdENvbGxlY3RvciA9IG5ldyBSYXljYXN0Q29sbGVjdG9yKCk7XHJcblxyXG5cdFx0dGhpcy5fZmluZENsb3Nlc3RDb2xsaXNpb24gPSBmaW5kQ2xvc2VzdENvbGxpc2lvbjtcclxuXHRcdHRoaXMuX2VudGl0aWVzID0gbmV3IEFycmF5PElFbnRpdHk+KCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAaW5oZXJpdERvY1xyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXRWaWV3Q29sbGlzaW9uKHg6bnVtYmVyLCB5Om51bWJlciwgdmlldzpWaWV3KTpQaWNraW5nQ29sbGlzaW9uVk9cclxuXHR7XHJcblx0XHQvL3VwZGF0ZSByYXlcclxuXHRcdHZhciByYXlQb3NpdGlvbjpWZWN0b3IzRCA9IHZpZXcudW5wcm9qZWN0KHgsIHksIDApO1xyXG5cdFx0dmFyIHJheURpcmVjdGlvbjpWZWN0b3IzRCA9IHZpZXcudW5wcm9qZWN0KHgsIHksIDEpLnN1YnRyYWN0KHJheVBvc2l0aW9uKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5nZXRTY2VuZUNvbGxpc2lvbihyYXlQb3NpdGlvbiwgcmF5RGlyZWN0aW9uLCB2aWV3LnNjZW5lKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBpbmhlcml0RG9jXHJcblx0ICovXHJcblx0cHVibGljIGdldFNjZW5lQ29sbGlzaW9uKHJheVBvc2l0aW9uOlZlY3RvcjNELCByYXlEaXJlY3Rpb246VmVjdG9yM0QsIHNjZW5lOlNjZW5lKTpQaWNraW5nQ29sbGlzaW9uVk9cclxuXHR7XHJcblx0XHQvL2NsZWFyIGNvbGxlY3RvclxyXG5cdFx0dGhpcy5fcmF5Y2FzdENvbGxlY3Rvci5jbGVhcigpO1xyXG5cclxuXHRcdC8vc2V0dXAgcmF5IHZlY3RvcnNcclxuXHRcdHRoaXMuX3JheWNhc3RDb2xsZWN0b3IucmF5UG9zaXRpb24gPSByYXlQb3NpdGlvbjtcclxuXHRcdHRoaXMuX3JheWNhc3RDb2xsZWN0b3IucmF5RGlyZWN0aW9uID0gcmF5RGlyZWN0aW9uO1xyXG5cclxuXHRcdC8vIGNvbGxlY3QgZW50aXRpZXMgdG8gdGVzdFxyXG5cdFx0c2NlbmUudHJhdmVyc2VQYXJ0aXRpb25zKHRoaXMuX3JheWNhc3RDb2xsZWN0b3IpO1xyXG5cclxuXHRcdHRoaXMuX251bUVudGl0aWVzID0gMDtcclxuXHRcdHZhciBub2RlOkVudGl0eUxpc3RJdGVtID0gdGhpcy5fcmF5Y2FzdENvbGxlY3Rvci5lbnRpdHlIZWFkO1xyXG5cdFx0dmFyIGVudGl0eTpJRW50aXR5O1xyXG5cclxuXHRcdHdoaWxlIChub2RlKSB7XHJcblx0XHRcdGlmICghdGhpcy5pc0lnbm9yZWQoZW50aXR5ID0gbm9kZS5lbnRpdHkpKVxyXG5cdFx0XHRcdHRoaXMuX2VudGl0aWVzW3RoaXMuX251bUVudGl0aWVzKytdID0gZW50aXR5O1xyXG5cclxuXHRcdFx0bm9kZSA9IG5vZGUubmV4dDtcclxuXHRcdH1cclxuXHJcblx0XHQvL2Vhcmx5IG91dCBpZiBubyBjb2xsaXNpb25zIGRldGVjdGVkXHJcblx0XHRpZiAoIXRoaXMuX251bUVudGl0aWVzKVxyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5nZXRQaWNraW5nQ29sbGlzaW9uVk8odGhpcy5fcmF5Y2FzdENvbGxlY3Rvcik7XHJcblx0fVxyXG5cclxuLy9cdFx0cHVibGljIGdldEVudGl0eUNvbGxpc2lvbihwb3NpdGlvbjpWZWN0b3IzRCwgZGlyZWN0aW9uOlZlY3RvcjNELCBlbnRpdGllczpBcnJheTxJRW50aXR5Pik6UGlja2luZ0NvbGxpc2lvblZPXHJcbi8vXHRcdHtcclxuLy9cdFx0XHR0aGlzLl9udW1FbnRpdGllcyA9IDA7XHJcbi8vXHJcbi8vXHRcdFx0dmFyIGVudGl0eTpJRW50aXR5O1xyXG4vL1x0XHRcdHZhciBsOm51bWJlciA9IGVudGl0aWVzLmxlbmd0aDtcclxuLy9cclxuLy9cdFx0XHRmb3IgKHZhciBjOm51bWJlciA9IDA7IGMgPCBsOyBjKyspIHtcclxuLy9cdFx0XHRcdGVudGl0eSA9IGVudGl0aWVzW2NdO1xyXG4vL1xyXG4vL1x0XHRcdFx0aWYgKGVudGl0eS5pc0ludGVyc2VjdGluZ1JheShwb3NpdGlvbiwgZGlyZWN0aW9uKSlcclxuLy9cdFx0XHRcdFx0dGhpcy5fZW50aXRpZXNbdGhpcy5fbnVtRW50aXRpZXMrK10gPSBlbnRpdHk7XHJcbi8vXHRcdFx0fVxyXG4vL1xyXG4vL1x0XHRcdHJldHVybiB0aGlzLmdldFBpY2tpbmdDb2xsaXNpb25WTyh0aGlzLl9yYXljYXN0Q29sbGVjdG9yKTtcclxuLy9cdFx0fVxyXG5cclxuXHRwdWJsaWMgc2V0SWdub3JlTGlzdChlbnRpdGllcylcclxuXHR7XHJcblx0XHR0aGlzLl9pZ25vcmVkRW50aXRpZXMgPSBlbnRpdGllcztcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgaXNJZ25vcmVkKGVudGl0eTpJRW50aXR5KTpib29sZWFuXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX29ubHlNb3VzZUVuYWJsZWQgJiYgIWVudGl0eS5faUlzTW91c2VFbmFibGVkKCkpXHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cclxuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5faWdub3JlZEVudGl0aWVzLmxlbmd0aDtcclxuXHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IGxlbjsgaSsrKVxyXG5cdFx0XHRpZiAodGhpcy5faWdub3JlZEVudGl0aWVzW2ldID09IGVudGl0eSlcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHNvcnRPbk5lYXJUKGVudGl0eTE6SUVudGl0eSwgZW50aXR5MjpJRW50aXR5KTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gZW50aXR5MS5faVBpY2tpbmdDb2xsaXNpb25WTy5yYXlFbnRyeURpc3RhbmNlID4gZW50aXR5Mi5faVBpY2tpbmdDb2xsaXNpb25WTy5yYXlFbnRyeURpc3RhbmNlPyAxIDogLTE7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGdldFBpY2tpbmdDb2xsaXNpb25WTyhjb2xsZWN0b3I6Q29sbGVjdG9yQmFzZSk6UGlja2luZ0NvbGxpc2lvblZPXHJcblx0e1xyXG5cdFx0Ly8gdHJpbSBiZWZvcmUgc29ydGluZ1xyXG5cdFx0dGhpcy5fZW50aXRpZXMubGVuZ3RoID0gdGhpcy5fbnVtRW50aXRpZXM7XHJcblxyXG5cdFx0Ly8gU29ydCBlbnRpdGllcyBmcm9tIGNsb3Nlc3QgdG8gZnVydGhlc3QuXHJcblx0XHR0aGlzLl9lbnRpdGllcyA9IHRoaXMuX2VudGl0aWVzLnNvcnQodGhpcy5zb3J0T25OZWFyVCk7IC8vIFRPRE8gLSB0ZXN0IHNvcnQgZmlsdGVyIGluIEpTXHJcblxyXG5cdFx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0XHQvLyBFdmFsdWF0ZSB0cmlhbmdsZSBjb2xsaXNpb25zIHdoZW4gbmVlZGVkLlxyXG5cdFx0Ly8gUmVwbGFjZXMgY29sbGlzaW9uIGRhdGEgcHJvdmlkZWQgYnkgYm91bmRzIGNvbGxpZGVyIHdpdGggbW9yZSBwcmVjaXNlIGRhdGEuXHJcblx0XHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcblx0XHR2YXIgc2hvcnRlc3RDb2xsaXNpb25EaXN0YW5jZTpudW1iZXIgPSBOdW1iZXIuTUFYX1ZBTFVFO1xyXG5cdFx0dmFyIGJlc3RDb2xsaXNpb25WTzpQaWNraW5nQ29sbGlzaW9uVk87XHJcblx0XHR2YXIgcGlja2luZ0NvbGxpc2lvblZPOlBpY2tpbmdDb2xsaXNpb25WTztcclxuXHRcdHZhciBlbnRpdHk6SUVudGl0eTtcclxuXHRcdHZhciBpOm51bWJlcjtcclxuXHJcblx0XHRmb3IgKGkgPSAwOyBpIDwgdGhpcy5fbnVtRW50aXRpZXM7ICsraSkge1xyXG5cdFx0XHRlbnRpdHkgPSB0aGlzLl9lbnRpdGllc1tpXTtcclxuXHRcdFx0cGlja2luZ0NvbGxpc2lvblZPID0gZW50aXR5Ll9pUGlja2luZ0NvbGxpc2lvblZPO1xyXG5cdFx0XHRpZiAoZW50aXR5LnBpY2tpbmdDb2xsaWRlcikge1xyXG5cdFx0XHRcdC8vIElmIGEgY29sbGlzaW9uIGV4aXN0cywgdXBkYXRlIHRoZSBjb2xsaXNpb24gZGF0YSBhbmQgc3RvcCBhbGwgY2hlY2tzLlxyXG5cdFx0XHRcdGlmICgoYmVzdENvbGxpc2lvblZPID09IG51bGwgfHwgcGlja2luZ0NvbGxpc2lvblZPLnJheUVudHJ5RGlzdGFuY2UgPCBiZXN0Q29sbGlzaW9uVk8ucmF5RW50cnlEaXN0YW5jZSkgJiYgZW50aXR5Ll9pVGVzdENvbGxpc2lvbihzaG9ydGVzdENvbGxpc2lvbkRpc3RhbmNlLCB0aGlzLl9maW5kQ2xvc2VzdENvbGxpc2lvbikpIHtcclxuXHRcdFx0XHRcdHNob3J0ZXN0Q29sbGlzaW9uRGlzdGFuY2UgPSBwaWNraW5nQ29sbGlzaW9uVk8ucmF5RW50cnlEaXN0YW5jZTtcclxuXHRcdFx0XHRcdGJlc3RDb2xsaXNpb25WTyA9IHBpY2tpbmdDb2xsaXNpb25WTztcclxuXHRcdFx0XHRcdGlmICghdGhpcy5fZmluZENsb3Nlc3RDb2xsaXNpb24pIHtcclxuXHRcdFx0XHRcdFx0dGhpcy51cGRhdGVMb2NhbFBvc2l0aW9uKHBpY2tpbmdDb2xsaXNpb25WTyk7XHJcblx0XHRcdFx0XHRcdHJldHVybiBwaWNraW5nQ29sbGlzaW9uVk87XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2UgaWYgKGJlc3RDb2xsaXNpb25WTyA9PSBudWxsIHx8IHBpY2tpbmdDb2xsaXNpb25WTy5yYXlFbnRyeURpc3RhbmNlIDwgYmVzdENvbGxpc2lvblZPLnJheUVudHJ5RGlzdGFuY2UpIHsgLy8gQSBib3VuZHMgY29sbGlzaW9uIHdpdGggbm8gdHJpYW5nbGUgY29sbGlkZXIgc3RvcHMgYWxsIGNoZWNrcy5cclxuXHRcdFx0XHQvLyBOb3RlOiBhIGJvdW5kcyBjb2xsaXNpb24gd2l0aCBhIHJheSBvcmlnaW4gaW5zaWRlIGl0cyBib3VuZHMgaXMgT05MWSBldmVyIHVzZWRcclxuXHRcdFx0XHQvLyB0byBlbmFibGUgdGhlIGRldGVjdGlvbiBvZiBhIGNvcnJlc3BvbnNkaW5nIHRyaWFuZ2xlIGNvbGxpc2lvbi5cclxuXHRcdFx0XHQvLyBUaGVyZWZvcmUsIGJvdW5kcyBjb2xsaXNpb25zIHdpdGggYSByYXkgb3JpZ2luIGluc2lkZSBpdHMgYm91bmRzIGNhbiBiZSBpZ25vcmVkXHJcblx0XHRcdFx0Ly8gaWYgaXQgaGFzIGJlZW4gZXN0YWJsaXNoZWQgdGhhdCB0aGVyZSBpcyBOTyB0cmlhbmdsZSBjb2xsaWRlciB0byB0ZXN0XHJcblx0XHRcdFx0aWYgKCFwaWNraW5nQ29sbGlzaW9uVk8ucmF5T3JpZ2luSXNJbnNpZGVCb3VuZHMpIHtcclxuXHRcdFx0XHRcdHRoaXMudXBkYXRlTG9jYWxQb3NpdGlvbihwaWNraW5nQ29sbGlzaW9uVk8pO1xyXG5cdFx0XHRcdFx0cmV0dXJuIHBpY2tpbmdDb2xsaXNpb25WTztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gYmVzdENvbGxpc2lvblZPO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSB1cGRhdGVMb2NhbFBvc2l0aW9uKHBpY2tpbmdDb2xsaXNpb25WTzpQaWNraW5nQ29sbGlzaW9uVk8pXHJcblx0e1xyXG5cdFx0dmFyIGNvbGxpc2lvblBvczpWZWN0b3IzRCA9ICggcGlja2luZ0NvbGxpc2lvblZPLmxvY2FsUG9zaXRpb24gPT0gbnVsbCApPyAocGlja2luZ0NvbGxpc2lvblZPLmxvY2FsUG9zaXRpb24gPSBuZXcgVmVjdG9yM0QoKSkgOiBwaWNraW5nQ29sbGlzaW9uVk8ubG9jYWxQb3NpdGlvbjtcclxuXHJcblx0XHR2YXIgcmF5RGlyOlZlY3RvcjNEID0gcGlja2luZ0NvbGxpc2lvblZPLmxvY2FsUmF5RGlyZWN0aW9uO1xyXG5cdFx0dmFyIHJheVBvczpWZWN0b3IzRCA9IHBpY2tpbmdDb2xsaXNpb25WTy5sb2NhbFJheVBvc2l0aW9uO1xyXG5cdFx0dmFyIHQ6bnVtYmVyID0gcGlja2luZ0NvbGxpc2lvblZPLnJheUVudHJ5RGlzdGFuY2U7XHJcblx0XHRjb2xsaXNpb25Qb3MueCA9IHJheVBvcy54ICsgdCpyYXlEaXIueDtcclxuXHRcdGNvbGxpc2lvblBvcy55ID0gcmF5UG9zLnkgKyB0KnJheURpci55O1xyXG5cdFx0Y29sbGlzaW9uUG9zLnogPSByYXlQb3MueiArIHQqcmF5RGlyLno7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZGlzcG9zZSgpXHJcblx0e1xyXG5cdFx0Ly9UT0RPXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgPSBSYXljYXN0UGlja2VyOyJdfQ==