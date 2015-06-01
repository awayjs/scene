import Vector3D						= require("awayjs-core/lib/geom/Vector3D");

import PickingCollisionVO			= require("awayjs-display/lib/pick/PickingCollisionVO");
import Billboard					= require("awayjs-display/lib/entities/Billboard");
import TriangleSubGeometry			= require("awayjs-display/lib/base/TriangleSubGeometry");
import CurveSubGeometry				= require("awayjs-display/lib/base/CurveSubGeometry");
import LineSubGeometry				= require("awayjs-display/lib/base/LineSubGeometry");
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
	 * @param pickingCollisionVO
	 * @param shortestCollisionDistance
	 */
	testBillboardCollision(billboard:Billboard, material:MaterialBase, pickingCollisionVO:PickingCollisionVO, shortestCollisionDistance:number):boolean

	/**
	 * Tests a <code>TriangleSubGeometry</code> object for a collision with the picking ray.
	 *
	 * @param triangleSubGeometry
	 * @param material
	 * @param pickingCollisionVO
	 * @param shortestCollisionDistance
	 */
	testTriangleCollision(triangleSubGeometry:TriangleSubGeometry, material:MaterialBase, pickingCollisionVO:PickingCollisionVO, shortestCollisionDistance:number):boolean

	/**
	 * Tests a <code>CurveSubGeometry</code> object for a collision with the picking ray.
	 *
	 * @param curveSubGeometry
	 * @param material
	 * @param pickingCollisionVO
	 * @param shortestCollisionDistance
	 */
	testCurveCollision(curveSubGeometry:CurveSubGeometry, material:MaterialBase, pickingCollisionVO:PickingCollisionVO, shortestCollisionDistance:number):boolean

	/**
	 * Tests a <code>LineSubGeometry</code> object for a collision with the picking ray.
	 *
	 * @param lineSubGeometry
	 * @param material
	 * @param pickingCollisionVO
	 * @param shortestCollisionDistance
	 */
	testLineCollision(lineSubGeometry:LineSubGeometry, material:MaterialBase, pickingCollisionVO:PickingCollisionVO, shortestCollisionDistance:number):boolean

}

export = IPickingCollider;