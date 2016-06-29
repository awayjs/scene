"use strict";
var Vector3D_1 = require("@awayjs/core/lib/geom/Vector3D");
var Point_1 = require("@awayjs/core/lib/geom/Point");
/**
 * Pure JS picking collider for display objects. Used with the <code>RaycastPicker</code> picking object.
 *
 * @see away.base.DisplayObject#pickingCollider
 * @see away.pick.RaycastPicker
 *
 * @class away.pick.JSPickingCollider
 */
var JSPickingCollider = (function () {
    /**
     * Creates a new <code>JSPickingCollider</code> object.
     *
     * @param findClosestCollision Determines whether the picking collider searches for the closest collision along the ray. Defaults to false.
     */
    function JSPickingCollider(findClosestCollision) {
        if (findClosestCollision === void 0) { findClosestCollision = false; }
        this._findClosestCollision = findClosestCollision;
    }
    /**
     * Tests a <code>Billboard</code> object for a collision with the picking ray.
     *
     * @param billboard The billboard instance to be tested.
     * @param pickingCollision The collision object used to store the collision results
     * @param findClosest
     */
    JSPickingCollider.prototype.testBillboardCollision = function (billboard, material, pickingCollision) {
        pickingCollision.renderable = null;
        //if (this._testGraphicCollision(<RenderableBase> this._renderablePool.getItem(billboard), pickingCollision, shortestCollisionDistance)) {
        //	shortestCollisionDistance = pickingCollision.rayEntryDistance;
        //
        //	pickingCollision.renderable = billboard;
        //
        //	return true;
        //}
        return false;
    };
    /**
     * Tests a <code>TriangleElements</code> object for a collision with the picking ray.
     *
     * @param triangleElements
     * @param material
     * @param pickingCollision
     * @returns {boolean}
     */
    JSPickingCollider.prototype.testTriangleCollision = function (triangleElements, material, pickingCollision, count, offset) {
        if (offset === void 0) { offset = 0; }
        var rayPosition = pickingCollision.rayPosition;
        var rayDirection = pickingCollision.rayDirection;
        var t;
        var i0, i1, i2;
        var rx, ry, rz;
        var nx, ny, nz;
        var cx, cy, cz;
        var coeff, u, v, w;
        var p0x, p0y, p0z;
        var p1x, p1y, p1z;
        var p2x, p2y, p2z;
        var s0x, s0y, s0z;
        var s1x, s1y, s1z;
        var nl, nDotV, D, disToPlane;
        var Q1Q2, Q1Q1, Q2Q2, RQ1, RQ2;
        var collisionTriangleIndex = -1;
        var bothSides = material.bothSides;
        var positions = triangleElements.positions.get(count, offset);
        var posDim = triangleElements.positions.dimensions;
        var posStride = triangleElements.positions.stride;
        var indices;
        if (triangleElements.indices) {
            indices = triangleElements.indices.get(triangleElements.numElements);
            count = indices.length;
        }
        for (var index = 0; index < count; index += 3) {
            // evaluate triangle indices
            if (indices) {
                i0 = indices[index] * posStride;
                i1 = indices[index + 1] * posStride;
                i2 = indices[index + 2] * posStride;
            }
            else {
                i0 = index * posStride;
                i1 = (index + 1) * posStride;
                i2 = (index + 2) * posStride;
            }
            // evaluate triangle positions
            p0x = positions[i0];
            p1x = positions[i1];
            p2x = positions[i2];
            s0x = p1x - p0x; // s0 = p1 - p0
            s1x = p2x - p0x; // s1 = p2 - p0
            p0y = positions[i0 + 1];
            p1y = positions[i1 + 1];
            p2y = positions[i2 + 1];
            s0y = p1y - p0y;
            s1y = p2y - p0y;
            if (posDim == 3) {
                p0z = positions[i0 + 2];
                p1z = positions[i1 + 2];
                p2z = positions[i2 + 2];
                s0z = p1z - p0z;
                s1z = p2z - p0z;
                // evaluate sides and triangle normal
                nx = s0y * s1z - s0z * s1y; // n = s0 x s1
                ny = s0z * s1x - s0x * s1z;
                nz = s0x * s1y - s0y * s1x;
                nl = 1 / Math.sqrt(nx * nx + ny * ny + nz * nz); // normalize n
                nx *= nl;
                ny *= nl;
                nz *= nl;
            }
            else {
                nx = 0;
                ny = 0;
                nz = 1;
            }
            // -- plane intersection test --
            nDotV = nx * rayDirection.x + ny * +rayDirection.y + nz * rayDirection.z; // rayDirection . normal
            if ((!bothSides && nDotV < 0.0) || (bothSides && nDotV != 0.0)) {
                // find collision t
                D = -(nx * p0x + ny * p0y + nz * p0z);
                disToPlane = -(nx * rayPosition.x + ny * rayPosition.y + nz * rayPosition.z + D);
                t = disToPlane / nDotV;
                // find collision point
                cx = rayPosition.x + t * rayDirection.x;
                cy = rayPosition.y + t * rayDirection.y;
                cz = rayPosition.z + t * rayDirection.z;
                // collision point inside triangle? ( using barycentric coordinates )
                Q1Q2 = s0x * s1x + s0y * s1y + s0z * s1z;
                Q1Q1 = s0x * s0x + s0y * s0y + s0z * s0z;
                Q2Q2 = s1x * s1x + s1y * s1y + s1z * s1z;
                rx = cx - p0x;
                ry = cy - p0y;
                rz = cz - p0z;
                RQ1 = rx * s0x + ry * s0y + rz * s0z;
                RQ2 = rx * s1x + ry * s1y + rz * s1z;
                coeff = 1 / (Q1Q1 * Q2Q2 - Q1Q2 * Q1Q2);
                v = coeff * (Q2Q2 * RQ1 - Q1Q2 * RQ2);
                w = coeff * (-Q1Q2 * RQ1 + Q1Q1 * RQ2);
                if (v < 0)
                    continue;
                if (w < 0)
                    continue;
                u = 1 - v - w;
                if (!(u < 0) && t > 0 && t < pickingCollision.rayEntryDistance) {
                    collisionTriangleIndex = index / 3;
                    pickingCollision.rayEntryDistance = t;
                    pickingCollision.position = new Vector3D_1.Vector3D(cx, cy, cz);
                    pickingCollision.normal = new Vector3D_1.Vector3D(nx, ny, nz);
                    if (triangleElements.uvs) {
                        var uvs = triangleElements.uvs.get(triangleElements.numVertices);
                        var uvStride = triangleElements.uvs.stride;
                        var uIndex = indices[index] * uvStride;
                        var uv0 = new Vector3D_1.Vector3D(uvs[uIndex], uvs[uIndex + 1]);
                        uIndex = indices[index + 1] * uvStride;
                        var uv1 = new Vector3D_1.Vector3D(uvs[uIndex], uvs[uIndex + 1]);
                        uIndex = indices[index + 2] * uvStride;
                        var uv2 = new Vector3D_1.Vector3D(uvs[uIndex], uvs[uIndex + 1]);
                        pickingCollision.uv = new Point_1.Point(u * uv0.x + v * uv1.x + w * uv2.x, u * uv0.y + v * uv1.y + w * uv2.y);
                    }
                    pickingCollision.elementIndex = collisionTriangleIndex;
                    // if not looking for best hit, first found will do...
                    if (!this._findClosestCollision)
                        return true;
                }
            }
        }
        if (collisionTriangleIndex >= 0)
            return true;
        return false;
    };
    //
    ///**
    // * Tests a <code>CurveElements</code> object for a collision with the picking ray.
    // *
    // * @param triangleElements
    // * @param material
    // * @param pickingCollision
    // * @returns {boolean}
    // */
    //public testCurveCollision(curveElements:CurveElements, material:MaterialBase, pickingCollision:PickingCollision, shortestCollisionDistance:number):boolean
    //{
    //	var rayPosition:Vector3D = pickingCollision.localRayPosition;
    //	var rayDirection:Vector3D = pickingCollision.localRayDirection;
    //
    //	//project ray onto x/y plane to generate useful test points from mouse coordinates
    //	//this will only work while all points lie on the x/y plane
    //	var plane:Vector3D = new Vector3D(0,0,-1,0);
    //
    //	var result:Vector3D = new Vector3D();
    //	var distance:number = plane.x * rayPosition.x + plane.y * rayPosition.y + plane.z * rayPosition.z + plane.w;//distance(position);
    //	result.x = rayPosition.x - ( plane.x*distance);
    //	result.y = rayPosition.y - ( plane.y*distance);
    //	result.z = rayPosition.z - ( plane.z*distance);
    //	var normal:Vector3D = new Vector3D(plane.x,plane.y,plane.z);
    //	var t:number = -(rayPosition.dotProduct(normal))/(rayDirection.dotProduct(normal));
    //	rayDirection.scaleBy(t);
    //	var p:Vector3D = rayPosition.add(rayDirection);
    //
    //	var indices:Uint16Array = curveElements.indices.get(curveElements.numElements);
    //	var collisionCurveIndex:number = -1;
    //	var bothSides:boolean = material.bothSides;
    //
    //
    //	var positions:Float32Array = curveElements.positions.get(curveElements.numVertices);
    //	var posDim:number = curveElements.positions.dimensions;
    //	var curves:Float32Array = curveElements.curves.get(curveElements.numVertices);
    //	var curveDim:number = curveElements.curves.dimensions;
    //	var uvs:ArrayBufferView = curveElements.uvs.get(curveElements.numVertices);
    //	var uvDim:number = curveElements.uvs.dimensions;
    //	var numIndices:number = indices.length;
    //
    //
    //	for(var index:number = 0; index < numIndices; index+=3)
    //	{
    //		var id0:number = indices[index];
    //		var id1:number = indices[index + 1] * posDim;
    //		var id2:number = indices[index + 2] * posDim;
    //
    //		var ax:number = positions[id0 * posDim];
    //		var ay:number = positions[id0 * posDim + 1];
    //		var bx:number = positions[id1];
    //		var by:number = positions[id1 + 1];
    //		var cx:number = positions[id2];
    //		var cy:number = positions[id2 + 1];
    //
    //		var curvex:number = curves[id0 * curveDim];
    //		var az:number = positions[id0 * posDim + 2];
    //
    //		//console.log(ax, ay, bx, by, cx, cy);
    //
    //		//from a to p
    //		var dx:number = ax - p.x;
    //		var dy:number = ay - p.y;
    //
    //		//edge normal (a-b)
    //		var nx:number = by - ay;
    //		var ny:number = -(bx - ax);
    //
    //		//console.log(ax,ay,bx,by,cx,cy);
    //
    //		var dot:number = (dx * nx) + (dy * ny);
    //		//console.log("dot a",dot);
    //		if (dot > 0)
    //			continue;
    //
    //		dx = bx - p.x;
    //		dy = by - p.y;
    //		nx = cy - by;
    //		ny = -(cx - bx);
    //
    //		dot = (dx * nx) + (dy * ny);
    //		//console.log("dot b",dot);
    //		if (dot > 0)
    //			continue;
    //
    //		dx = cx - p.x;
    //		dy = cy - p.y;
    //		nx = ay - cy;
    //		ny = -(ax - cx);
    //
    //		dot = (dx * nx) + (dy * ny);
    //		//console.log("dot c",dot);
    //		if (dot > 0)
    //			continue;
    //
    //		//check if not solid
    //		if (curvex != 2) {
    //
    //			var v0x:number = bx - ax;
    //			var v0y:number = by - ay;
    //			var v1x:number = cx - ax;
    //			var v1y:number = cy - ay;
    //			var v2x:number = p.x - ax;
    //			var v2y:number = p.y - ay;
    //
    //			var den:number = v0x * v1y - v1x * v0y;
    //			var v:number = (v2x * v1y - v1x * v2y) / den;
    //			var w:number = (v0x * v2y - v2x * v0y) / den;
    //			var u:number = 1 - v - w;
    //
    //			var uu:number = 0.5 * v + w;// (0 * u) + (0.5 * v) + (1 * w);// (lerp(0, 0.5, v) + lerp(0.5, 1, w) + lerp(1, 0, u)) / 1.5;
    //			var vv:number = w;// (0 * u) + (0 * v) + (1 * w);// (lerp(0, 1, w) + lerp(1, 0, u)) / 1;
    //
    //			var d:number = uu * uu - vv;
    //
    //			if ((d > 0 && az == -1) || (d < 0 && az == 1))
    //				continue;
    //		}
    //		//TODO optimize away this pointless check as the distance is always the same
    //		//also this stuff should only be calculated right before the return and not for each hit
    //		if (distance < shortestCollisionDistance) {
    //			shortestCollisionDistance = distance;
    //			collisionCurveIndex = index/3;
    //			pickingCollision.rayEntryDistance = distance;
    //			pickingCollision.localPosition = p;
    //			pickingCollision.localNormal = new Vector3D(0, 0, 1);
    //			pickingCollision.uv = this._getCollisionUV(indices, uvs, index, v, w, u, uvDim);
    //			pickingCollision.index = index;
    //			//						pickingCollision.elementIndex = this.pGetSpriteGraphicIndex(renderable);
    //
    //			// if not looking for best hit, first found will do...
    //			if (!this._findClosestCollision)
    //				return true;
    //		}
    //	}
    //
    //	if (collisionCurveIndex >= 0)
    //		return true;
    //
    //	return false;
    //}
    /**
     * Tests a <code>LineElements</code> object for a collision with the picking ray.
     *
     * @param triangleElements
     * @param material
     * @param pickingCollision
     * @returns {boolean}
     */
    JSPickingCollider.prototype.testLineCollision = function (lineElements, material, pickingCollision, count, offset) {
        if (offset === void 0) { offset = 0; }
        return false;
    };
    return JSPickingCollider;
}());
exports.JSPickingCollider = JSPickingCollider;
