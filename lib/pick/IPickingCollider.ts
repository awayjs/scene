import Vector3D						= require("awayjs-core/lib/geom/Vector3D");

import PickingCollision				= require("awayjs-display/lib/pick/PickingCollision");
import Billboard					= require("awayjs-display/lib/display/Billboard");
import TriangleElements				= require("awayjs-display/lib/graphics/TriangleElements");
import LineElements					= require("awayjs-display/lib/graphics/LineElements");
import MaterialBase					= require("awayjs-display/lib/materials/MaterialBase");

/**
 * Provides an interface for picking colliders that can be assigned to individual entities in a scene for specific picking behaviour.
 * Used with the <code>RaycastPicker</code> picking object.
 *
 * @see away.entities.Entity#pickingCollider
 * @see away.pick.RaycastPicker
 *
 * @interface away.pick.IPickingCollider
 */
interface IPickingCollider
{

	/**
	 * Tests a <code>Billboard</code> object for a collision with the picking ray.
	 *
	 * @param billboard
	 * @param material
	 * @param pickingCollision
	 * @param shortestCollisionDistance
	 */
	testBillboardCollision(billboard:Billboard, material:MaterialBase, pickingCollision:PickingCollision):boolean

	/**
	 * Tests a <code>TriangleElements</code> object for a collision with the picking ray.
	 *
	 * @param triangleElements
	 * @param material
	 * @param pickingCollision
	 * @param shortestCollisionDistance
	 */
	testTriangleCollision(triangleElements:TriangleElements, material:MaterialBase, pickingCollision:PickingCollision):boolean

	/**
	 * Tests a <code>LineElements</code> object for a collision with the picking ray.
	 *
	 * @param lineElements
	 * @param material
	 * @param pickingCollision
	 * @param shortestCollisionDistance
	 */
	testLineCollision(lineElements:LineElements, material:MaterialBase, pickingCollision:PickingCollision):boolean

}

export = IPickingCollider;