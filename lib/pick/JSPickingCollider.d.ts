import { LineElements } from "../graphics/LineElements";
import { TriangleElements } from "../graphics/TriangleElements";
import { Billboard } from "../display/Billboard";
import { PickingCollision } from "../pick/PickingCollision";
import { IPickingCollider } from "../pick/IPickingCollider";
import { MaterialBase } from "../materials/MaterialBase";
/**
 * Pure JS picking collider for display objects. Used with the <code>RaycastPicker</code> picking object.
 *
 * @see away.base.DisplayObject#pickingCollider
 * @see away.pick.RaycastPicker
 *
 * @class away.pick.JSPickingCollider
 */
export declare class JSPickingCollider implements IPickingCollider {
    private _findClosestCollision;
    /**
     * Creates a new <code>JSPickingCollider</code> object.
     *
     * @param findClosestCollision Determines whether the picking collider searches for the closest collision along the ray. Defaults to false.
     */
    constructor(findClosestCollision?: boolean);
    /**
     * Tests a <code>Billboard</code> object for a collision with the picking ray.
     *
     * @param billboard The billboard instance to be tested.
     * @param pickingCollision The collision object used to store the collision results
     * @param findClosest
     */
    testBillboardCollision(billboard: Billboard, material: MaterialBase, pickingCollision: PickingCollision): boolean;
    /**
     * Tests a <code>TriangleElements</code> object for a collision with the picking ray.
     *
     * @param triangleElements
     * @param material
     * @param pickingCollision
     * @returns {boolean}
     */
    testTriangleCollision(triangleElements: TriangleElements, material: MaterialBase, pickingCollision: PickingCollision, count: number, offset?: number): boolean;
    /**
     * Tests a <code>LineElements</code> object for a collision with the picking ray.
     *
     * @param triangleElements
     * @param material
     * @param pickingCollision
     * @returns {boolean}
     */
    testLineCollision(lineElements: LineElements, material: MaterialBase, pickingCollision: PickingCollision, count: number, offset?: number): boolean;
}
