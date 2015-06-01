import Vector3D							= require("awayjs-core/lib/geom/Vector3D");
import Point							= require("awayjs-core/lib/geom/Point");

import ISubMesh							= require("awayjs-display/lib/base/ISubMesh");
import CurveSubGeometry					= require("awayjs-display/lib/base/CurveSubGeometry");
import LineSubGeometry					= require("awayjs-display/lib/base/LineSubGeometry");
import TriangleSubGeometry				= require("awayjs-display/lib/base/TriangleSubGeometry");
import Billboard						= require("awayjs-display/lib/entities/Billboard");
import PickingCollisionVO				= require("awayjs-display/lib/pick/PickingCollisionVO");
import IPickingCollider					= require("awayjs-display/lib/pick/IPickingCollider");
import MaterialBase						= require("awayjs-display/lib/materials/MaterialBase");


/**
 * Pure JS picking collider for display objects. Used with the <code>RaycastPicker</code> picking object.
 *
 * @see away.base.DisplayObject#pickingCollider
 * @see away.pick.RaycastPicker
 *
 * @class away.pick.JSPickingCollider
 */
class JSPickingCollider implements IPickingCollider
{
	private _findClosestCollision:boolean;

	/**
	 * Creates a new <code>JSPickingCollider</code> object.
	 *
	 * @param findClosestCollision Determines whether the picking collider searches for the closest collision along the ray. Defaults to false.
	 */
	constructor(findClosestCollision:boolean = false)
	{
		this._findClosestCollision = findClosestCollision;
	}


	/**
	 * Tests a <code>Billboard</code> object for a collision with the picking ray.
	 *
	 * @param billboard The billboard instance to be tested.
	 * @param pickingCollisionVO The collision object used to store the collision results
	 * @param shortestCollisionDistance The current value of the shortest distance to a detected collision along the ray.
	 * @param findClosest
	 */
	public testBillboardCollision(billboard:Billboard, material:MaterialBase, pickingCollisionVO:PickingCollisionVO, shortestCollisionDistance:number)
	{
		pickingCollisionVO.renderableOwner = null;

		//if (this._testSubMeshCollision(<RenderableBase> this._renderablePool.getItem(billboard), pickingCollisionVO, shortestCollisionDistance)) {
		//	shortestCollisionDistance = pickingCollisionVO.rayEntryDistance;
		//
		//	pickingCollisionVO.renderableOwner = billboard;
		//
		//	return true;
		//}

		return false;
	}

	/**
	 * Tests a <code>TriangleSubGeometry</code> object for a collision with the picking ray.
	 *
	 * @param triangleSubGeometry
	 * @param material
	 * @param pickingCollisionVO
	 * @param shortestCollisionDistance
	 * @returns {boolean}
	 */
	public testTriangleCollision(triangleSubGeometry:TriangleSubGeometry, material:MaterialBase, pickingCollisionVO:PickingCollisionVO, shortestCollisionDistance:number):boolean
	{
		var rayPosition:Vector3D = pickingCollisionVO.localRayPosition;
		var rayDirection:Vector3D = pickingCollisionVO.localRayDirection;
		var t:number;
		var i0:number, i1:number, i2:number;
		var rx:number, ry:number, rz:number;
		var nx:number, ny:number, nz:number;
		var cx:number, cy:number, cz:number;
		var coeff:number, u:number, v:number, w:number;
		var p0x:number, p0y:number, p0z:number;
		var p1x:number, p1y:number, p1z:number;
		var p2x:number, p2y:number, p2z:number;
		var s0x:number, s0y:number, s0z:number;
		var s1x:number, s1y:number, s1z:number;
		var nl:number, nDotV:number, D:number, disToPlane:number;
		var Q1Q2:number, Q1Q1:number, Q2Q2:number, RQ1:number, RQ2:number;
		var indices:Uint16Array = triangleSubGeometry.indices.get(triangleSubGeometry.numElements);
		var collisionTriangleIndex:number = -1;
		var bothSides:boolean = material.bothSides;

		var positions:Float32Array = triangleSubGeometry.positions.get(triangleSubGeometry.numVertices);
		var posDim:number = triangleSubGeometry.positions.dimensions;
		var uvs:Float32Array = triangleSubGeometry.uvs.get(triangleSubGeometry.numVertices);
		var uvDim:number = triangleSubGeometry.uvs.dimensions;
		var numIndices:number = indices.length;

		for (var index:number = 0; index < numIndices; index += 3) { // sweep all triangles
			// evaluate triangle indices
			i0 = indices[index]*posDim;
			i1 = indices[index + 1]*posDim;
			i2 = indices[index + 2]*posDim;

			// evaluate triangle positions
			p0x = positions[i0];
			p0y = positions[i0 + 1];
			p0z = positions[i0 + 2];
			p1x = positions[i1];
			p1y = positions[i1 + 1];
			p1z = positions[i1 + 2];
			p2x = positions[i2];
			p2y = positions[i2 + 1];
			p2z = positions[i2 + 2];

			// evaluate sides and triangle normal
			s0x = p1x - p0x; // s0 = p1 - p0
			s0y = p1y - p0y;
			s0z = p1z - p0z;
			s1x = p2x - p0x; // s1 = p2 - p0
			s1y = p2y - p0y;
			s1z = p2z - p0z;
			nx = s0y*s1z - s0z*s1y; // n = s0 x s1
			ny = s0z*s1x - s0x*s1z;
			nz = s0x*s1y - s0y*s1x;
			nl = 1/Math.sqrt(nx*nx + ny*ny + nz*nz); // normalize n
			nx *= nl;
			ny *= nl;
			nz *= nl;

			// -- plane intersection test --
			nDotV = nx*rayDirection.x + ny* +rayDirection.y + nz*rayDirection.z; // rayDirection . normal
			if (( !bothSides && nDotV < 0.0 ) || ( bothSides && nDotV != 0.0 )) { // an intersection must exist
				// find collision t
				D = -( nx*p0x + ny*p0y + nz*p0z );
				disToPlane = -( nx*rayPosition.x + ny*rayPosition.y + nz*rayPosition.z + D );
				t = disToPlane/nDotV;
				// find collision point
				cx = rayPosition.x + t*rayDirection.x;
				cy = rayPosition.y + t*rayDirection.y;
				cz = rayPosition.z + t*rayDirection.z;
				// collision point inside triangle? ( using barycentric coordinates )
				Q1Q2 = s0x*s1x + s0y*s1y + s0z*s1z;
				Q1Q1 = s0x*s0x + s0y*s0y + s0z*s0z;
				Q2Q2 = s1x*s1x + s1y*s1y + s1z*s1z;
				rx = cx - p0x;
				ry = cy - p0y;
				rz = cz - p0z;
				RQ1 = rx*s0x + ry*s0y + rz*s0z;
				RQ2 = rx*s1x + ry*s1y + rz*s1z;
				coeff = 1/(Q1Q1*Q2Q2 - Q1Q2*Q1Q2);
				v = coeff*(Q2Q2*RQ1 - Q1Q2*RQ2);
				w = coeff*(-Q1Q2*RQ1 + Q1Q1*RQ2);
				if (v < 0)
					continue;
				if (w < 0)
					continue;
				u = 1 - v - w;
				if (!( u < 0 ) && t > 0 && t < shortestCollisionDistance) { // all tests passed
					shortestCollisionDistance = t;
					collisionTriangleIndex = index/3;
					pickingCollisionVO.rayEntryDistance = t;
					pickingCollisionVO.localPosition = new Vector3D(cx, cy, cz);
					pickingCollisionVO.localNormal = new Vector3D(nx, ny, nz);
					pickingCollisionVO.uv = this._getCollisionUV(indices, uvs, index, v, w, u, uvDim);
					pickingCollisionVO.index = index;
//						pickingCollisionVO.subGeometryIndex = this.pGetMeshSubMeshIndex(renderable);

					// if not looking for best hit, first found will do...
					if (!this._findClosestCollision)
						return true;
				}
			}
		}


		if (collisionTriangleIndex >= 0)
			return true;

		return false;
	}

	/**
	 * Tests a <code>CurveSubGeometry</code> object for a collision with the picking ray.
	 *
	 * @param triangleSubGeometry
	 * @param material
	 * @param pickingCollisionVO
	 * @param shortestCollisionDistance
	 * @returns {boolean}
	 */
	public testCurveCollision(curveSubGeometry:CurveSubGeometry, material:MaterialBase, pickingCollisionVO:PickingCollisionVO, shortestCollisionDistance:number):boolean
	{
		var rayPosition:Vector3D = pickingCollisionVO.localRayPosition;
		var rayDirection:Vector3D = pickingCollisionVO.localRayDirection;

		//project ray onto x/y plane to generate useful test points from mouse coordinates
		var plane:Vector3D = new Vector3D(0,0,-1,0);

		var result:Vector3D = new Vector3D();
		var distance:number = plane.x * rayPosition.x + plane.y * rayPosition.y + plane.z * rayPosition.z + plane.w;//distance(position);
		result.x = rayPosition.x - ( plane.x*distance);
		result.y = rayPosition.y - ( plane.y*distance);
		result.z = rayPosition.z - ( plane.z*distance);
		var normal:Vector3D = new Vector3D(plane.x,plane.y,plane.z);
		var t:number = -(rayPosition.dotProduct(normal))/(rayDirection.dotProduct(normal));
		rayDirection.scaleBy(t);
		var p:Vector3D = rayPosition.add(rayDirection);

		var indices:Uint16Array = curveSubGeometry.indices.get(curveSubGeometry.numElements);
		var collisionCurveIndex:number = -1;
		var bothSides:boolean = material.bothSides;


		var positions:Float32Array = curveSubGeometry.positions.get(curveSubGeometry.numVertices);
		var posDim:number = curveSubGeometry.positions.dimensions;
		var curves:Float32Array = curveSubGeometry.curves.get(curveSubGeometry.numVertices);
		var curveDim:number = curveSubGeometry.curves.dimensions;
		var uvs:Float32Array = curveSubGeometry.uvs.get(curveSubGeometry.numVertices);
		var uvDim:number = curveSubGeometry.uvs.dimensions;
		var numIndices:number = indices.length;


		for(var index:number = 0; index < numIndices; index+=3)
		{
			var id0:number = indices[index];
			var id1:number = indices[index + 1] * posDim;
			var id2:number = indices[index + 2] * posDim;

			var ax:number = positions[id0 * posDim];
			var ay:number = positions[id0 * posDim + 1];
			var bx:number = positions[id1];
			var by:number = positions[id1 + 1];
			var cx:number = positions[id2];
			var cy:number = positions[id2 + 1];

			var curvex:number = curves[id0 * curveDim];
			var az:number = positions[id0 * posDim + 2];

			//console.log(ax, ay, bx, by, cx, cy);

			//from a to p
			var dx:number = ax - p.x;
			var dy:number = ay - p.y;

			//edge normal (a-b)
			var nx:number = by - ay;
			var ny:number = -(bx - ax);

			//console.log(ax,ay,bx,by,cx,cy);

			var dot:number = (dx * nx) + (dy * ny);
			//console.log("dot a",dot);
			if (dot > 0)
				continue;

			dx = bx - p.x;
			dy = by - p.y;
			nx = cy - by;
			ny = -(cx - bx);

			dot = (dx * nx) + (dy * ny);
			//console.log("dot b",dot);
			if (dot > 0)
				continue;

			dx = cx - p.x;
			dy = cy - p.y;
			nx = ay - cy;
			ny = -(ax - cx);

			dot = (dx * nx) + (dy * ny);
			//console.log("dot c",dot);
			if (dot > 0)
				continue;

			//check if nmot solid
			if (curvex != 2) {

				var v0x:number = bx - ax;
				var v0y:number = by - ay;
				var v1x:number = cx - ax;
				var v1y:number = cy - ay;
				var v2x:number = p.x - ax;
				var v2y:number = p.y - ay;

				var den:number = v0x * v1y - v1x * v0y;
				var v:number = (v2x * v1y - v1x * v2y) / den;
				var w:number = (v0x * v2y - v2x * v0y) / den;
				var u:number = 1 - v - w;

				var uu:number = 0.5 * v + w;// (0 * u) + (0.5 * v) + (1 * w);// (lerp(0, 0.5, v) + lerp(0.5, 1, w) + lerp(1, 0, u)) / 1.5;
				var vv:number = w;// (0 * u) + (0 * v) + (1 * w);// (lerp(0, 1, w) + lerp(1, 0, u)) / 1;

				var d:number = uu * uu - vv;

				if ((d > 0 && az == -1) || (d < 0 && az == 1))
					continue;
			}

			//if (!( u < 0 ) && t > 0 && t < shortestCollisionDistance) { // all tests passed
			//	shortestCollisionDistance = t;
			//	collisionCurveIndex = index/3;
			//	pickingCollisionVO.rayEntryDistance = t;
			//	pickingCollisionVO.localPosition = new Vector3D(cx, cy, cz);
			//	pickingCollisionVO.localNormal = new Vector3D(nx, ny, nz);
			//	pickingCollisionVO.uv = this._getCollisionUV(indices, uvs, index, v, w, u, uvDim);
			//	pickingCollisionVO.index = index;
			//	//						pickingCollisionVO.subGeometryIndex = this.pGetMeshSubMeshIndex(renderable);
			//
			//	// if not looking for best hit, first found will do...
			//	if (!this._findClosestCollision)
			//		return true;
			//}
		}

		if (collisionCurveIndex >= 0)
			return true;

		return false;
	}

	/**
	 * Tests a <code>LineSubGeometry</code> object for a collision with the picking ray.
	 *
	 * @param triangleSubGeometry
	 * @param material
	 * @param pickingCollisionVO
	 * @param shortestCollisionDistance
	 * @returns {boolean}
	 */
	public testLineCollision(lineSubGeometry:LineSubGeometry, material:MaterialBase, pickingCollisionVO:PickingCollisionVO, shortestCollisionDistance:number):boolean
	{
		return false;
	}


	private _getCollisionUV(indices:Uint16Array, uvData:Float32Array, triangleIndex:number, v:number, w:number, u:number, uvDim:number):Point // PROTECTED
	{
		var uv:Point = new Point();
		var uIndex:number = indices[triangleIndex]*uvDim;
		var uv0:Vector3D = new Vector3D(uvData[uIndex], uvData[uIndex + 1]);
		uIndex = indices[triangleIndex + 1]*uvDim;
		var uv1:Vector3D = new Vector3D(uvData[uIndex], uvData[uIndex + 1]);
		uIndex = indices[triangleIndex + 2]*uvDim;
		var uv2:Vector3D = new Vector3D(uvData[uIndex], uvData[uIndex + 1]);
		uv.x = u*uv0.x + v*uv1.x + w*uv2.x;
		uv.y = u*uv0.y + v*uv1.y + w*uv2.y;
		return uv;
	}
}

export = JSPickingCollider;