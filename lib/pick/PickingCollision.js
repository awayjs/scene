"use strict";
/**
 * Value object for a picking collision returned by a picking collider. Created as unique objects on display objects
 *
 * @see away.base.DisplayObject#pickingCollision
 * @see away.core.pick.IPickingCollider
 *
 * @class away.pick.PickingCollision
 */
var PickingCollision = (function () {
    /**
     * Creates a new <code>PickingCollision</code> object.
     *
     * @param entity The entity to which this collision object belongs.
     */
    function PickingCollision(entity) {
        this.entity = entity;
    }
    return PickingCollision;
}());
exports.PickingCollision = PickingCollision;
