import { Point } from "@awayjs/core/lib/geom/Point";
import { Vector3D } from "@awayjs/core/lib/geom/Vector3D";
import { IEntity } from "../display/IEntity";
import { IRenderable } from "../base/IRenderable";
/**
 * Value object for a picking collision returned by a picking collider. Created as unique objects on display objects
 *
 * @see away.base.DisplayObject#pickingCollision
 * @see away.core.pick.IPickingCollider
 *
 * @class away.pick.PickingCollision
 */
export declare class PickingCollision {
    /**
     * The entity to which this collision object belongs.
     */
    entity: IEntity;
    /**
     * The renderable associated with a collision.
     */
    renderable: IRenderable;
    /**
     * The local position of the collision on the renderable's surface.
     */
    position: Vector3D;
    /**
     * The local normal vector at the position of the collision.
     */
    normal: Vector3D;
    /**
     * The uv coordinate at the position of the collision.
     */
    uv: Point;
    /**
     * The index of the element where the collision took place.
     */
    elementIndex: number;
    /**
     * The starting position of the colliding ray in local coordinates.
     */
    rayPosition: Vector3D;
    /**
     * The direction of the colliding ray in local coordinates.
     */
    rayDirection: Vector3D;
    /**
     * The starting position of the colliding ray in scene coordinates.
     */
    globalRayPosition: Vector3D;
    /**
     * The direction of the colliding ray in scene coordinates.
     */
    globalRayDirection: Vector3D;
    /**
     * Determines if the ray position is contained within the entity bounds.
     */
    rayOriginIsInsideBounds: boolean;
    /**
     * The distance along the ray from the starting position to the calculated intersection entry point with the entity.
     */
    rayEntryDistance: number;
    /**
     * Creates a new <code>PickingCollision</code> object.
     *
     * @param entity The entity to which this collision object belongs.
     */
    constructor(entity: IEntity);
}
