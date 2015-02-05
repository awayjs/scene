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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9waWNrL3JheWNhc3RwaWNrZXIudHMiXSwibmFtZXMiOlsiUmF5Y2FzdFBpY2tlciIsIlJheWNhc3RQaWNrZXIuY29uc3RydWN0b3IiLCJSYXljYXN0UGlja2VyLm9ubHlNb3VzZUVuYWJsZWQiLCJSYXljYXN0UGlja2VyLmdldFZpZXdDb2xsaXNpb24iLCJSYXljYXN0UGlja2VyLmdldFNjZW5lQ29sbGlzaW9uIiwiUmF5Y2FzdFBpY2tlci5zZXRJZ25vcmVMaXN0IiwiUmF5Y2FzdFBpY2tlci5pc0lnbm9yZWQiLCJSYXljYXN0UGlja2VyLnNvcnRPbk5lYXJUIiwiUmF5Y2FzdFBpY2tlci5nZXRQaWNraW5nQ29sbGlzaW9uVk8iLCJSYXljYXN0UGlja2VyLnVwZGF0ZUxvY2FsUG9zaXRpb24iLCJSYXljYXN0UGlja2VyLmRpc3Bvc2UiXSwibWFwcGluZ3MiOiJBQUFBLElBQU8sUUFBUSxXQUFnQiwrQkFBK0IsQ0FBQyxDQUFDO0FBUWhFLElBQU8sZ0JBQWdCLFdBQWMsOENBQThDLENBQUMsQ0FBQztBQUdyRixBQU9BOzs7Ozs7R0FERztJQUNHLGFBQWE7SUF3QmxCQTs7Ozs7T0FLR0E7SUFDSEEsU0E5QktBLGFBQWFBLENBOEJOQSxvQkFBb0NBO1FBQXBDQyxvQ0FBb0NBLEdBQXBDQSw0QkFBb0NBO1FBMUJ4Q0EscUJBQWdCQSxHQUFHQSxFQUFFQSxDQUFDQTtRQUN0QkEsc0JBQWlCQSxHQUFXQSxJQUFJQSxDQUFDQTtRQUdqQ0EsaUJBQVlBLEdBQVVBLENBQUNBLENBQUNBO1FBd0IvQkEsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxHQUFHQSxJQUFJQSxnQkFBZ0JBLEVBQUVBLENBQUNBO1FBRWhEQSxJQUFJQSxDQUFDQSxxQkFBcUJBLEdBQUdBLG9CQUFvQkEsQ0FBQ0E7UUFDbERBLElBQUlBLENBQUNBLFNBQVNBLEdBQUdBLElBQUlBLEtBQUtBLEVBQVdBLENBQUNBO0lBQ3ZDQSxDQUFDQTtJQXRCREQsc0JBQVdBLDJDQUFn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LGtCQUFrQkEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQTtRQUNuREEsWUFBWUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDdkNBLFlBQVlBLENBQUNBLENBQUNBLEdBQUdBLE1BQU1BLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEdBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBO1FBQ3ZDQSxZQUFZQSxDQUFDQSxDQUFDQSxHQUFHQSxNQUFNQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUN4Q0EsQ0FBQ0E7SUFFTVQsK0JBQU9BLEdBQWRBO1FBRUNVLE1BQU1BO0lBQ1BBLENBQUNBO0lBQ0ZWLG9CQUFDQTtBQUFEQSxDQTFMQSxBQTBMQ0EsSUFBQTtBQUVELEFBQXVCLGlCQUFkLGFBQWEsQ0FBQyIsImZpbGUiOiJwaWNrL1JheWNhc3RQaWNrZXIuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZlY3RvcjNEXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vVmVjdG9yM0RcIik7XG5cbmltcG9ydCBTY2VuZVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9jb250YWluZXJzL1NjZW5lXCIpO1xuaW1wb3J0IFZpZXdcdFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9jb250YWluZXJzL1ZpZXdcIik7XG5pbXBvcnQgSVBpY2tlclx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9waWNrL0lQaWNrZXJcIik7XG5pbXBvcnQgUGlja2luZ0NvbGxpc2lvblZPXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3BpY2svUGlja2luZ0NvbGxpc2lvblZPXCIpO1xuaW1wb3J0IEVudGl0eUxpc3RJdGVtXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcG9vbC9FbnRpdHlMaXN0SXRlbVwiKTtcbmltcG9ydCBJQ29sbGVjdG9yXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi90cmF2ZXJzZS9JQ29sbGVjdG9yXCIpO1xuaW1wb3J0IFJheWNhc3RDb2xsZWN0b3JcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi90cmF2ZXJzZS9SYXljYXN0Q29sbGVjdG9yXCIpO1xuaW1wb3J0IElFbnRpdHlcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZW50aXRpZXMvSUVudGl0eVwiKTtcblxuLyoqXG4gKiBQaWNrcyBhIDNkIG9iamVjdCBmcm9tIGEgdmlldyBvciBzY2VuZSBieSAzRCByYXljYXN0IGNhbGN1bGF0aW9ucy5cbiAqIFBlcmZvcm1zIGFuIGluaXRpYWwgY29hcnNlIGJvdW5kYXJ5IGNhbGN1bGF0aW9uIHRvIHJldHVybiBhIHN1YnNldCBvZiBlbnRpdGllcyB3aG9zZSBib3VuZGluZyB2b2x1bWVzIGludGVyc2VjdCB3aXRoIHRoZSBzcGVjaWZpZWQgcmF5LFxuICogdGhlbiB0cmlnZ2VycyBhbiBvcHRpb25hbCBwaWNraW5nIGNvbGxpZGVyIG9uIGluZGl2aWR1YWwgZW50aXR5IG9iamVjdHMgdG8gZnVydGhlciBkZXRlcm1pbmUgdGhlIHByZWNpc2UgdmFsdWVzIG9mIHRoZSBwaWNraW5nIHJheSBjb2xsaXNpb24uXG4gKlxuICogQGNsYXNzIGF3YXkucGljay5SYXljYXN0UGlja2VyXG4gKi9cbmNsYXNzIFJheWNhc3RQaWNrZXIgaW1wbGVtZW50cyBJUGlja2VyXG57XG5cdHByaXZhdGUgX2ZpbmRDbG9zZXN0Q29sbGlzaW9uOmJvb2xlYW47XG5cdHByaXZhdGUgX3JheWNhc3RDb2xsZWN0b3I6UmF5Y2FzdENvbGxlY3Rvcjtcblx0cHJpdmF0ZSBfaWdub3JlZEVudGl0aWVzID0gW107XG5cdHByaXZhdGUgX29ubHlNb3VzZUVuYWJsZWQ6Ym9vbGVhbiA9IHRydWU7XG5cblx0cHJpdmF0ZSBfZW50aXRpZXM6QXJyYXk8SUVudGl0eT47XG5cdHByaXZhdGUgX251bUVudGl0aWVzOm51bWJlciA9IDA7XG5cdHByaXZhdGUgX2hhc0NvbGxpc2lvbnM6Ym9vbGVhbjtcblxuXHQvKipcblx0ICogQGluaGVyaXREb2Ncblx0ICovXG5cdHB1YmxpYyBnZXQgb25seU1vdXNlRW5hYmxlZCgpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9vbmx5TW91c2VFbmFibGVkO1xuXHR9XG5cblx0cHVibGljIHNldCBvbmx5TW91c2VFbmFibGVkKHZhbHVlOmJvb2xlYW4pXG5cdHtcblx0XHR0aGlzLl9vbmx5TW91c2VFbmFibGVkID0gdmFsdWU7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlcyBhIG5ldyA8Y29kZT5SYXljYXN0UGlja2VyPC9jb2RlPiBvYmplY3QuXG5cdCAqXG5cdCAqIEBwYXJhbSBmaW5kQ2xvc2VzdENvbGxpc2lvbiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHBpY2tlciBzZWFyY2hlcyBmb3IgdGhlIGNsb3Nlc3QgYm91bmRzIGNvbGxpc2lvbiBhbG9uZyB0aGUgcmF5LFxuXHQgKiBvciBzaW1wbHkgcmV0dXJucyB0aGUgZmlyc3QgY29sbGlzaW9uIGVuY291bnRlcmVkLiBEZWZhdWx0cyB0byBmYWxzZS5cblx0ICovXG5cdGNvbnN0cnVjdG9yKGZpbmRDbG9zZXN0Q29sbGlzaW9uOmJvb2xlYW4gPSBmYWxzZSlcblx0e1xuXHRcdHRoaXMuX3JheWNhc3RDb2xsZWN0b3IgPSBuZXcgUmF5Y2FzdENvbGxlY3RvcigpO1xuXG5cdFx0dGhpcy5fZmluZENsb3Nlc3RDb2xsaXNpb24gPSBmaW5kQ2xvc2VzdENvbGxpc2lvbjtcblx0XHR0aGlzLl9lbnRpdGllcyA9IG5ldyBBcnJheTxJRW50aXR5PigpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBpbmhlcml0RG9jXG5cdCAqL1xuXHRwdWJsaWMgZ2V0Vmlld0NvbGxpc2lvbih4Om51bWJlciwgeTpudW1iZXIsIHZpZXc6Vmlldyk6UGlja2luZ0NvbGxpc2lvblZPXG5cdHtcblx0XHQvL3VwZGF0ZSByYXlcblx0XHR2YXIgcmF5UG9zaXRpb246VmVjdG9yM0QgPSB2aWV3LnVucHJvamVjdCh4LCB5LCAwKTtcblx0XHR2YXIgcmF5RGlyZWN0aW9uOlZlY3RvcjNEID0gdmlldy51bnByb2plY3QoeCwgeSwgMSkuc3VidHJhY3QocmF5UG9zaXRpb24pO1xuXG5cdFx0cmV0dXJuIHRoaXMuZ2V0U2NlbmVDb2xsaXNpb24ocmF5UG9zaXRpb24sIHJheURpcmVjdGlvbiwgdmlldy5zY2VuZSk7XG5cdH1cblxuXHQvKipcblx0ICogQGluaGVyaXREb2Ncblx0ICovXG5cdHB1YmxpYyBnZXRTY2VuZUNvbGxpc2lvbihyYXlQb3NpdGlvbjpWZWN0b3IzRCwgcmF5RGlyZWN0aW9uOlZlY3RvcjNELCBzY2VuZTpTY2VuZSk6UGlja2luZ0NvbGxpc2lvblZPXG5cdHtcblx0XHQvL2NsZWFyIGNvbGxlY3RvclxuXHRcdHRoaXMuX3JheWNhc3RDb2xsZWN0b3IuY2xlYXIoKTtcblxuXHRcdC8vc2V0dXAgcmF5IHZlY3RvcnNcblx0XHR0aGlzLl9yYXljYXN0Q29sbGVjdG9yLnJheVBvc2l0aW9uID0gcmF5UG9zaXRpb247XG5cdFx0dGhpcy5fcmF5Y2FzdENvbGxlY3Rvci5yYXlEaXJlY3Rpb24gPSByYXlEaXJlY3Rpb247XG5cblx0XHQvLyBjb2xsZWN0IGVudGl0aWVzIHRvIHRlc3Rcblx0XHRzY2VuZS50cmF2ZXJzZVBhcnRpdGlvbnModGhpcy5fcmF5Y2FzdENvbGxlY3Rvcik7XG5cblx0XHR0aGlzLl9udW1FbnRpdGllcyA9IDA7XG5cdFx0dmFyIG5vZGU6RW50aXR5TGlzdEl0ZW0gPSB0aGlzLl9yYXljYXN0Q29sbGVjdG9yLmVudGl0eUhlYWQ7XG5cdFx0dmFyIGVudGl0eTpJRW50aXR5O1xuXG5cdFx0d2hpbGUgKG5vZGUpIHtcblx0XHRcdGlmICghdGhpcy5pc0lnbm9yZWQoZW50aXR5ID0gbm9kZS5lbnRpdHkpKVxuXHRcdFx0XHR0aGlzLl9lbnRpdGllc1t0aGlzLl9udW1FbnRpdGllcysrXSA9IGVudGl0eTtcblxuXHRcdFx0bm9kZSA9IG5vZGUubmV4dDtcblx0XHR9XG5cblx0XHQvL2Vhcmx5IG91dCBpZiBubyBjb2xsaXNpb25zIGRldGVjdGVkXG5cdFx0aWYgKCF0aGlzLl9udW1FbnRpdGllcylcblx0XHRcdHJldHVybiBudWxsO1xuXG5cdFx0cmV0dXJuIHRoaXMuZ2V0UGlja2luZ0NvbGxpc2lvblZPKHRoaXMuX3JheWNhc3RDb2xsZWN0b3IpO1xuXHR9XG5cbi8vXHRcdHB1YmxpYyBnZXRFbnRpdHlDb2xsaXNpb24ocG9zaXRpb246VmVjdG9yM0QsIGRpcmVjdGlvbjpWZWN0b3IzRCwgZW50aXRpZXM6QXJyYXk8SUVudGl0eT4pOlBpY2tpbmdDb2xsaXNpb25WT1xuLy9cdFx0e1xuLy9cdFx0XHR0aGlzLl9udW1FbnRpdGllcyA9IDA7XG4vL1xuLy9cdFx0XHR2YXIgZW50aXR5OklFbnRpdHk7XG4vL1x0XHRcdHZhciBsOm51bWJlciA9IGVudGl0aWVzLmxlbmd0aDtcbi8vXG4vL1x0XHRcdGZvciAodmFyIGM6bnVtYmVyID0gMDsgYyA8IGw7IGMrKykge1xuLy9cdFx0XHRcdGVudGl0eSA9IGVudGl0aWVzW2NdO1xuLy9cbi8vXHRcdFx0XHRpZiAoZW50aXR5LmlzSW50ZXJzZWN0aW5nUmF5KHBvc2l0aW9uLCBkaXJlY3Rpb24pKVxuLy9cdFx0XHRcdFx0dGhpcy5fZW50aXRpZXNbdGhpcy5fbnVtRW50aXRpZXMrK10gPSBlbnRpdHk7XG4vL1x0XHRcdH1cbi8vXG4vL1x0XHRcdHJldHVybiB0aGlzLmdldFBpY2tpbmdDb2xsaXNpb25WTyh0aGlzLl9yYXljYXN0Q29sbGVjdG9yKTtcbi8vXHRcdH1cblxuXHRwdWJsaWMgc2V0SWdub3JlTGlzdChlbnRpdGllcylcblx0e1xuXHRcdHRoaXMuX2lnbm9yZWRFbnRpdGllcyA9IGVudGl0aWVzO1xuXHR9XG5cblx0cHJpdmF0ZSBpc0lnbm9yZWQoZW50aXR5OklFbnRpdHkpOmJvb2xlYW5cblx0e1xuXHRcdGlmICh0aGlzLl9vbmx5TW91c2VFbmFibGVkICYmICFlbnRpdHkuX2lJc01vdXNlRW5hYmxlZCgpKVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX2lnbm9yZWRFbnRpdGllcy5sZW5ndGg7XG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgbGVuOyBpKyspXG5cdFx0XHRpZiAodGhpcy5faWdub3JlZEVudGl0aWVzW2ldID09IGVudGl0eSlcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRwcml2YXRlIHNvcnRPbk5lYXJUKGVudGl0eTE6SUVudGl0eSwgZW50aXR5MjpJRW50aXR5KTpudW1iZXJcblx0e1xuXHRcdHJldHVybiBlbnRpdHkxLl9pUGlja2luZ0NvbGxpc2lvblZPLnJheUVudHJ5RGlzdGFuY2UgPiBlbnRpdHkyLl9pUGlja2luZ0NvbGxpc2lvblZPLnJheUVudHJ5RGlzdGFuY2U/IDEgOiAtMTtcblx0fVxuXG5cdHByaXZhdGUgZ2V0UGlja2luZ0NvbGxpc2lvblZPKGNvbGxlY3RvcjpJQ29sbGVjdG9yKTpQaWNraW5nQ29sbGlzaW9uVk9cblx0e1xuXHRcdC8vIHRyaW0gYmVmb3JlIHNvcnRpbmdcblx0XHR0aGlzLl9lbnRpdGllcy5sZW5ndGggPSB0aGlzLl9udW1FbnRpdGllcztcblxuXHRcdC8vIFNvcnQgZW50aXRpZXMgZnJvbSBjbG9zZXN0IHRvIGZ1cnRoZXN0LlxuXHRcdHRoaXMuX2VudGl0aWVzID0gdGhpcy5fZW50aXRpZXMuc29ydCh0aGlzLnNvcnRPbk5lYXJUKTsgLy8gVE9ETyAtIHRlc3Qgc29ydCBmaWx0ZXIgaW4gSlNcblxuXHRcdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdC8vIEV2YWx1YXRlIHRyaWFuZ2xlIGNvbGxpc2lvbnMgd2hlbiBuZWVkZWQuXG5cdFx0Ly8gUmVwbGFjZXMgY29sbGlzaW9uIGRhdGEgcHJvdmlkZWQgYnkgYm91bmRzIGNvbGxpZGVyIHdpdGggbW9yZSBwcmVjaXNlIGRhdGEuXG5cdFx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0XHR2YXIgc2hvcnRlc3RDb2xsaXNpb25EaXN0YW5jZTpudW1iZXIgPSBOdW1iZXIuTUFYX1ZBTFVFO1xuXHRcdHZhciBiZXN0Q29sbGlzaW9uVk86UGlja2luZ0NvbGxpc2lvblZPO1xuXHRcdHZhciBwaWNraW5nQ29sbGlzaW9uVk86UGlja2luZ0NvbGxpc2lvblZPO1xuXHRcdHZhciBlbnRpdHk6SUVudGl0eTtcblx0XHR2YXIgaTpudW1iZXI7XG5cblx0XHRmb3IgKGkgPSAwOyBpIDwgdGhpcy5fbnVtRW50aXRpZXM7ICsraSkge1xuXHRcdFx0ZW50aXR5ID0gdGhpcy5fZW50aXRpZXNbaV07XG5cdFx0XHRwaWNraW5nQ29sbGlzaW9uVk8gPSBlbnRpdHkuX2lQaWNraW5nQ29sbGlzaW9uVk87XG5cdFx0XHRpZiAoZW50aXR5LnBpY2tpbmdDb2xsaWRlcikge1xuXHRcdFx0XHQvLyBJZiBhIGNvbGxpc2lvbiBleGlzdHMsIHVwZGF0ZSB0aGUgY29sbGlzaW9uIGRhdGEgYW5kIHN0b3AgYWxsIGNoZWNrcy5cblx0XHRcdFx0aWYgKChiZXN0Q29sbGlzaW9uVk8gPT0gbnVsbCB8fCBwaWNraW5nQ29sbGlzaW9uVk8ucmF5RW50cnlEaXN0YW5jZSA8IGJlc3RDb2xsaXNpb25WTy5yYXlFbnRyeURpc3RhbmNlKSAmJiBlbnRpdHkuX2lUZXN0Q29sbGlzaW9uKHNob3J0ZXN0Q29sbGlzaW9uRGlzdGFuY2UsIHRoaXMuX2ZpbmRDbG9zZXN0Q29sbGlzaW9uKSkge1xuXHRcdFx0XHRcdHNob3J0ZXN0Q29sbGlzaW9uRGlzdGFuY2UgPSBwaWNraW5nQ29sbGlzaW9uVk8ucmF5RW50cnlEaXN0YW5jZTtcblx0XHRcdFx0XHRiZXN0Q29sbGlzaW9uVk8gPSBwaWNraW5nQ29sbGlzaW9uVk87XG5cdFx0XHRcdFx0aWYgKCF0aGlzLl9maW5kQ2xvc2VzdENvbGxpc2lvbikge1xuXHRcdFx0XHRcdFx0dGhpcy51cGRhdGVMb2NhbFBvc2l0aW9uKHBpY2tpbmdDb2xsaXNpb25WTyk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gcGlja2luZ0NvbGxpc2lvblZPO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmIChiZXN0Q29sbGlzaW9uVk8gPT0gbnVsbCB8fCBwaWNraW5nQ29sbGlzaW9uVk8ucmF5RW50cnlEaXN0YW5jZSA8IGJlc3RDb2xsaXNpb25WTy5yYXlFbnRyeURpc3RhbmNlKSB7IC8vIEEgYm91bmRzIGNvbGxpc2lvbiB3aXRoIG5vIHRyaWFuZ2xlIGNvbGxpZGVyIHN0b3BzIGFsbCBjaGVja3MuXG5cdFx0XHRcdC8vIE5vdGU6IGEgYm91bmRzIGNvbGxpc2lvbiB3aXRoIGEgcmF5IG9yaWdpbiBpbnNpZGUgaXRzIGJvdW5kcyBpcyBPTkxZIGV2ZXIgdXNlZFxuXHRcdFx0XHQvLyB0byBlbmFibGUgdGhlIGRldGVjdGlvbiBvZiBhIGNvcnJlc3BvbnNkaW5nIHRyaWFuZ2xlIGNvbGxpc2lvbi5cblx0XHRcdFx0Ly8gVGhlcmVmb3JlLCBib3VuZHMgY29sbGlzaW9ucyB3aXRoIGEgcmF5IG9yaWdpbiBpbnNpZGUgaXRzIGJvdW5kcyBjYW4gYmUgaWdub3JlZFxuXHRcdFx0XHQvLyBpZiBpdCBoYXMgYmVlbiBlc3RhYmxpc2hlZCB0aGF0IHRoZXJlIGlzIE5PIHRyaWFuZ2xlIGNvbGxpZGVyIHRvIHRlc3Rcblx0XHRcdFx0aWYgKCFwaWNraW5nQ29sbGlzaW9uVk8ucmF5T3JpZ2luSXNJbnNpZGVCb3VuZHMpIHtcblx0XHRcdFx0XHR0aGlzLnVwZGF0ZUxvY2FsUG9zaXRpb24ocGlja2luZ0NvbGxpc2lvblZPKTtcblx0XHRcdFx0XHRyZXR1cm4gcGlja2luZ0NvbGxpc2lvblZPO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGJlc3RDb2xsaXNpb25WTztcblx0fVxuXG5cdHByaXZhdGUgdXBkYXRlTG9jYWxQb3NpdGlvbihwaWNraW5nQ29sbGlzaW9uVk86UGlja2luZ0NvbGxpc2lvblZPKVxuXHR7XG5cdFx0dmFyIGNvbGxpc2lvblBvczpWZWN0b3IzRCA9ICggcGlja2luZ0NvbGxpc2lvblZPLmxvY2FsUG9zaXRpb24gPT0gbnVsbCApPyAocGlja2luZ0NvbGxpc2lvblZPLmxvY2FsUG9zaXRpb24gPSBuZXcgVmVjdG9yM0QoKSkgOiBwaWNraW5nQ29sbGlzaW9uVk8ubG9jYWxQb3NpdGlvbjtcblxuXHRcdHZhciByYXlEaXI6VmVjdG9yM0QgPSBwaWNraW5nQ29sbGlzaW9uVk8ubG9jYWxSYXlEaXJlY3Rpb247XG5cdFx0dmFyIHJheVBvczpWZWN0b3IzRCA9IHBpY2tpbmdDb2xsaXNpb25WTy5sb2NhbFJheVBvc2l0aW9uO1xuXHRcdHZhciB0Om51bWJlciA9IHBpY2tpbmdDb2xsaXNpb25WTy5yYXlFbnRyeURpc3RhbmNlO1xuXHRcdGNvbGxpc2lvblBvcy54ID0gcmF5UG9zLnggKyB0KnJheURpci54O1xuXHRcdGNvbGxpc2lvblBvcy55ID0gcmF5UG9zLnkgKyB0KnJheURpci55O1xuXHRcdGNvbGxpc2lvblBvcy56ID0gcmF5UG9zLnogKyB0KnJheURpci56O1xuXHR9XG5cblx0cHVibGljIGRpc3Bvc2UoKVxuXHR7XG5cdFx0Ly9UT0RPXG5cdH1cbn1cblxuZXhwb3J0ID0gUmF5Y2FzdFBpY2tlcjsiXX0=