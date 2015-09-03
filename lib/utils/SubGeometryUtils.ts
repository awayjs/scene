import AttributesBuffer			= require("awayjs-core/lib/attributes/AttributesBuffer");
import AttributesView			= require("awayjs-core/lib/attributes/AttributesView");
import Short2Attributes			= require("awayjs-core/lib/attributes/Short2Attributes");
import Short3Attributes			= require("awayjs-core/lib/attributes/Short3Attributes");
import Float2Attributes			= require("awayjs-core/lib/attributes/Float2Attributes");
import Float3Attributes			= require("awayjs-core/lib/attributes/Float3Attributes");
import Float4Attributes			= require("awayjs-core/lib/attributes/Float4Attributes");
import Byte4Attributes			= require("awayjs-core/lib/attributes/Byte4Attributes");
import Matrix3D					= require("awayjs-core/lib/geom/Matrix3D");
import Vector3D					= require("awayjs-core/lib/geom/Vector3D");
import Box						= require("awayjs-core/lib/geom/Box");
import Sphere					= require("awayjs-core/lib/geom/Sphere");
import Extensions				= require("awayjs-core/lib/utils/Extensions");

import CurveSubGeometry			= require("awayjs-display/lib/base/CurveSubGeometry");

class SubGeometryUtils
{
	private static tempFloat32x4:Float32Array = new Float32Array(4);

	private static LIMIT_VERTS:number = 0xffff;

	private static LIMIT_INDICES:number = 0xffffff;
	
	private static _indexSwap:Array<number> = new Array<number>();

	public static generateFaceNormals(indexAttributes:Short3Attributes, positionAttributes:Float3Attributes, output:Float4Attributes, count:number, offset:number = 0):Float4Attributes
	{
		var indices:Uint16Array = indexAttributes.get(count, offset);
		var positions:Float32Array = positionAttributes.get(positionAttributes.count);

		if (output == null)
			output = new Float4Attributes(count + offset);
		else if (output.count < count + offset)
			output.count = count + offset;

		var indexDim:number = indexAttributes.dimensions;
		var positionDim:number = positionAttributes.dimensions;

		var faceNormals:Float32Array = output.get(count, offset);

		//multiply by dimension to get index length
		count *= indexDim;

		var i:number = 0;
		var j:number = 0;
		var index:number;

		var x1:number, x2:number, x3:number;
		var y1:number, y2:number, y3:number;
		var z1:number, z2:number, z3:number;
		var dx1:number, dy1:number, dz1:number;
		var dx2:number, dy2:number, dz2:number;
		var cx:number, cy:number, cz:number;
		var d:number;

		while (i < count) {
			index = indices[i++]*positionDim;
			x1 = positions[index];
			y1 = positions[index + 1];
			z1 = positions[index + 2];
			index = indices[i++]*positionDim;
			x2 = positions[index];
			y2 = positions[index + 1];
			z2 = positions[index + 2];
			index = indices[i++]*positionDim;
			x3 = positions[index];
			y3 = positions[index + 1];
			z3 = positions[index + 2];
			dx1 = x3 - x1;
			dy1 = y3 - y1;
			dz1 = z3 - z1;
			dx2 = x2 - x1;
			dy2 = y2 - y1;
			dz2 = z2 - z1;
			cx = dz1*dy2 - dy1*dz2;
			cy = dx1*dz2 - dz1*dx2;
			cz = dy1*dx2 - dx1*dy2;
			d = Math.sqrt(cx*cx + cy*cy + cz*cz);
			// length of cross product = 2*triangle area

			faceNormals[j++] = cx;
			faceNormals[j++] = cy;
			faceNormals[j++] = cz;
			faceNormals[j++] = d;
		}

		output.set(faceNormals, offset);

		return output;
	}

	public static generateNormals(indexAttributes:Short3Attributes, faceNormalAttributes:Float4Attributes, output:Float3Attributes, concatenatedBuffer:AttributesBuffer):Float3Attributes
	{
		var indices:Uint16Array = indexAttributes.get(indexAttributes.count);
		var faceNormals:Float32Array = faceNormalAttributes.get(faceNormalAttributes.count);

		if (output == null)
			output = new Float3Attributes(concatenatedBuffer);

		var indexDim:number = indexAttributes.dimensions;
		var outputDim:number = output.dimensions;

		var normals:Float32Array = output.get(output.count);

		var i:number = 0;
		var len:number = output.count*outputDim;

		//clear normal values
		while (i < len) {
			normals[i++] = 0;
			normals[i++] = 0;
			normals[i++] = 0;
		}

		i = 0;
		len = indexAttributes.count*indexDim;
		var index:number;
		var f1:number = 0;
		var f2:number = 1;
		var f3:number = 2;

		//collect face normals
		while (i < len) {
			index = indices[i++]*outputDim;
			normals[index] += faceNormals[f1];
			normals[index + 1] += faceNormals[f2];
			normals[index + 2] += faceNormals[f3];
			index = indices[i++]*outputDim;
			normals[index] += faceNormals[f1];
			normals[index + 1] += faceNormals[f2];
			normals[index + 2] += faceNormals[f3];
			index = indices[i++]*outputDim;
			normals[index] += faceNormals[f1];
			normals[index + 1] += faceNormals[f2];
			normals[index + 2] += faceNormals[f3];
			f1 += 4;
			f2 += 4;
			f3 += 4;
		}

		i = 0;
		len = output.count*outputDim;
		var vx:number;
		var vy:number;
		var vz:number;
		var d:number;

		//normalise normals collections
		while (i < len) {
			vx = normals[i];
			vy = normals[i + 1];
			vz = normals[i + 2];
			d = 1.0/Math.sqrt(vx*vx + vy*vy + vz*vz);

			normals[i++] = vx*d;
			normals[i++] = vy*d;
			normals[i++] = vz*d;
		}

		output.set(normals);

		return output;
	}

	public static generateFaceTangents(indexAttributes:Short3Attributes, positionAttributes:Float3Attributes, uvAttributes:Float2Attributes, output:Float4Attributes, count:number, offset:number = 0, useFaceWeights:boolean = false):Float4Attributes
	{
		var indices:Uint16Array = indexAttributes.get(count, offset);
		var positions:Float32Array = positionAttributes.get(positionAttributes.count);
		var uvs:Float32Array = uvAttributes.get(uvAttributes.count);

		if (output == null)
			output = new Float3Attributes(count + offset);
		else if (output.count < count + offset)
			output.count = count + offset;

		var positionDim:number = positionAttributes.dimensions;
		var uvDim:number = uvAttributes.dimensions;
		var indexDim:number = indexAttributes.dimensions;

		var faceTangents:Float32Array = output.get(count, offset);

		var i:number = 0;
		var index1:number;
		var index2:number;
		var index3:number;
		var vi:number;
		var v0:number;
		var dv1:number;
		var dv2:number;
		var denom:number;
		var x0:number, y0:number, z0:number;
		var dx1:number, dy1:number, dz1:number;
		var dx2:number, dy2:number, dz2:number;
		var cx:number, cy:number, cz:number;

		//multiply by dimension to get index length
		count *= indexDim;

		while (i < count) {
			index1 = indices[i];
			index2 = indices[i + 1];
			index3 = indices[i + 2];

			v0 = uvs[index1*uvDim + 1];
			dv1 = uvs[index2*uvDim + 1] - v0;
			dv2 = uvs[index3*uvDim + 1] - v0;

			vi = index1*positionDim;
			x0 = positions[vi];
			y0 = positions[vi + 1];
			z0 = positions[vi + 2];
			vi = index2*positionDim;
			dx1 = positions[vi] - x0;
			dy1 = positions[vi + 1] - y0;
			dz1 = positions[vi + 2] - z0;
			vi = index3*positionDim;
			dx2 = positions[vi] - x0;
			dy2 = positions[vi + 1] - y0;
			dz2 = positions[vi + 2] - z0;

			cx = dv2*dx1 - dv1*dx2;
			cy = dv2*dy1 - dv1*dy2;
			cz = dv2*dz1 - dv1*dz2;
			denom = 1/Math.sqrt(cx*cx + cy*cy + cz*cz);

			faceTangents[i++] = denom*cx;
			faceTangents[i++] = denom*cy;
			faceTangents[i++] = denom*cz;
		}

		output.set(faceTangents, offset);

		return output;
	}

	public static generateTangents(indexAttributes:Short3Attributes, faceTangentAttributes:Float3Attributes, faceNormalAttributes:Float4Attributes, output:Float3Attributes, concatenatedBuffer:AttributesBuffer):Float3Attributes
	{
		var indices:Uint16Array = indexAttributes.get(indexAttributes.count);
		var faceTangents:Float32Array = faceTangentAttributes.get(faceTangentAttributes.count);
		var faceNormals:Float32Array = faceNormalAttributes.get(faceNormalAttributes.count);

		if (output == null)
			output = new Float3Attributes(concatenatedBuffer);

		var indexDim:number = indexAttributes.dimensions;
		var outputDim:number = output.dimensions;

		var tangents:Float32Array = output.get(output.count);

		var i:number = 0;
		var len:number = output.count*outputDim;

		//clear tangent values
		while (i < len) {
			tangents[i++] = 0;
			tangents[i++] = 0;
			tangents[i++] = 0;
		}

		var weight:number;
		var index:number;
		var f1:number = 0;
		var f2:number = 1;
		var f3:number = 2;
		var f4:number = 3;

		i = 0;
		len = indexAttributes.count*indexDim;

		//collect face tangents
		while (i < len) {
			weight = faceNormals[f4];
			index = indices[i++]*outputDim;
			tangents[index++] += faceTangents[f1]*weight;
			tangents[index++] += faceTangents[f2]*weight;
			tangents[index] += faceTangents[f3]*weight;
			index = indices[i++]*outputDim;
			tangents[index++] += faceTangents[f1]*weight;
			tangents[index++] += faceTangents[f2]*weight;
			tangents[index] += faceTangents[f3]*weight;
			index = indices[i++]*outputDim;
			tangents[index++] += faceTangents[f1]*weight;
			tangents[index++] += faceTangents[f2]*weight;
			tangents[index] += faceTangents[f3]*weight;
			f1 += 3;
			f2 += 3;
			f3 += 3;
			f4 += 4;
		}

		i = 0;
		len = output.count*outputDim;
		var vx:number;
		var vy:number;
		var vz:number;
		var d:number;

		//normalise tangents collections
		while (i < len) {
			vx = tangents[i];
			vy = tangents[i + 1];
			vz = tangents[i + 2];
			d = 1.0/Math.sqrt(vx*vx + vy*vy + vz*vz);

			tangents[i++] = vx*d;
			tangents[i++] = vy*d;
			tangents[i++] = vz*d;
		}

		output.set(tangents);

		return output;
	}


	public static generateUVs(indexAttributes:Short3Attributes, output:Float2Attributes, concatenatedBuffer:AttributesBuffer, count:number, offset:number = 0):Float2Attributes
	{
		if (output == null)
			output = new Float2Attributes(concatenatedBuffer);

		var outputDim:number = output.dimensions;

		var uvs:Float32Array = output.get(count, offset);

		var i:number = 0;
		var j:number = 0;
		var len:number = count*outputDim;

		while (i < len) {
			uvs[i++] = j*.5;
			uvs[i++] = 1.0 - (j & 1);

			if (++j == 3)
				j = 0;
		}

		output.set(uvs, offset);

		return output;
	}

	public static generateColors(indexAttributes:Short3Attributes, output:Byte4Attributes, concatenatedBuffer:AttributesBuffer, count:number, offset:number = 0):Byte4Attributes
	{
		if (output == null)
			output = new Byte4Attributes(concatenatedBuffer);

		var index:number = 0;
		var colors:Uint8Array = new Uint8Array(count*4);

		while (index < count*4) {
			if (index/4 & 1) {
				colors[index] = 0xFF;
				colors[index + 1] = 0xFF;
				colors[index + 2] = 0xFF;
				colors[index + 3] = 0xFF;
			} else {
				colors[index] = 0xFF;
				colors[index + 1] = 0xFF;
				colors[index + 2] = 0xFF;
				colors[index + 3] = 0xFF;
			}

			index += 4;
		}

		output.set(colors, offset);

		return output;
	}

	public static scaleUVs(scaleU:number, scaleV:number, output:Float2Attributes, count:number, offset:number = 0)
	{
		if (output.count < count + offset)
			output.count = count + offset;

		var outputDim:number = output.dimensions;

		var uvs:Float32Array = output.get(count, offset);

		var i:number = 0;
		var j:number = 0;
		var len:number = count*outputDim;

		while (i < len) {
			uvs[i++] *= scaleU;
			uvs[i++] *= scaleV;
		}

		output.set(uvs, offset);
	}

	public static scale(scale:number, output:Float3Attributes, count:number, offset:number = 0)
	{
		if (output.count < count + offset)
			output.count = count + offset;

		var outputDim:number = output.dimensions;

		var positions:Float32Array = output.get(count, offset);

		var i:number = 0;
		var j:number = 0;
		var len:number = count*outputDim;

		while (i < len) {
			positions[i++] *= scale;
			positions[i++] *= scale;
			positions[i++] *= scale;
		}

		output.set(positions, offset);
	}

	public static applyTransformation(transform:Matrix3D, positionAttributes:Float3Attributes, normalAttributes:Float3Attributes, tangentAttributes:Float3Attributes, count:number, offset:number = 0)
	{
		var positions:Float32Array = positionAttributes.get(count, offset);
		var positionDim:number = positionAttributes.dimensions;

		var normals:Float32Array;
		var normalDim:number;

		if (normalAttributes) {
			normals = normalAttributes.get(count, offset);
			normalDim = normalAttributes.dimensions;
		}

		var tangents:Float32Array;
		var tangentDim:number;

		if (tangentAttributes) {
			tangents = tangentAttributes.get(count, offset);
			tangentDim = tangentAttributes.dimensions;
		}

		var i:number;
		var i1:number;
		var i2:number;
		var vector:Vector3D = new Vector3D();
		var invTranspose:Matrix3D;

		if (normalAttributes || tangentAttributes) {
			invTranspose = transform.clone();
			invTranspose.invert();
			invTranspose.transpose();
		}

		var vi0:number = 0;
		var ni0:number = 0;
		var ti0:number = 0;

		for (i = 0; i < count; ++i) {
			// bake position
			i1 = vi0 + 1;
			i2 = vi0 + 2;
			vector.x = positions[vi0];
			vector.y = positions[i1];
			vector.z = positions[i2];
			vector = transform.transformVector(vector);
			positions[vi0] = vector.x;
			positions[i1] = vector.y;
			positions[i2] = vector.z;
			vi0 += positionDim;

			if	(normals) {
				// bake normal
				i1 = ni0 + 1;
				i2 = ni0 + 2;
				vector.x = normals[ni0];
				vector.y = normals[i1];
				vector.z = normals[i2];
				vector = invTranspose.deltaTransformVector(vector);
				vector.normalize();
				normals[ni0] = vector.x;
				normals[i1] = vector.y;
				normals[i2] = vector.z;
				ni0 += normalDim;
			}

			if (tangents) {
				// bake tangent
				i1 = ti0 + 1;
				i2 = ti0 + 2;
				vector.x = tangents[ti0];
				vector.y = tangents[i1];
				vector.z = tangents[i2];
				vector = invTranspose.deltaTransformVector(vector);
				vector.normalize();
				tangents[ti0] = vector.x;
				tangents[i1] = vector.y;
				tangents[i2] = vector.z;
				ti0 += tangentDim;
			}
		}

		positionAttributes.set(positions, offset);

		if (normalAttributes)
			normalAttributes.set(normals, offset);

		if (tangentAttributes)
			tangentAttributes.set(tangents, offset);
	}

	public static getSubIndices(indexAttributes:Short2Attributes, numVertices:number, indexMappings:Array<number>, indexOffset?:number):AttributesBuffer;
	public static getSubIndices(indexAttributes:Short3Attributes, numVertices:number, indexMappings:Array<number>, indexOffset?:number):AttributesBuffer;
	public static getSubIndices(indexAttributes:AttributesView, numVertices:number, indexMappings:Array<number>, indexOffset:number = 0):AttributesBuffer
	{
		var buffer:AttributesBuffer = indexAttributes.buffer;
		var numIndices:number = indexAttributes.length;
		
		//reset mappings
		indexMappings.length = 0;

		//shortcut for those buffers that fit into the maximum buffer sizes
		if (numIndices < SubGeometryUtils.LIMIT_INDICES && numVertices < SubGeometryUtils.LIMIT_VERTS)
			return buffer;

		var i:number;
		var indices:Uint16Array = <Uint16Array> indexAttributes.get(indexAttributes.count, indexOffset);
		var splitIndices:Array<number> = new Array<number>();
		var indexSwap:Array<number> = SubGeometryUtils._indexSwap;
		

		indexSwap.length = numIndices;
		for (i = 0; i < numIndices; i++)
			indexSwap[i] = -1;

		var originalIndex:number;
		var splitIndex:number;
		var index:number = 0;
		var offsetLength:number = indexOffset*indexAttributes.dimensions;
		
		// Loop over all triangles
		
		i = 0;
		while (i < numIndices + offsetLength && i + 1 < SubGeometryUtils.LIMIT_INDICES && index + 1 < SubGeometryUtils.LIMIT_VERTS) {
			originalIndex = indices[i];

			if (indexSwap[originalIndex] >= 0) {
				splitIndex = indexSwap[originalIndex];
			} else {
				// This vertex does not yet exist in the split list and
				// needs to be copied from the long list.
				splitIndex = index++;
				indexSwap[originalIndex] = splitIndex;
				indexMappings[splitIndex] = originalIndex;
			}

			// Store new index, which may have come from the swap look-up,
			// or from copying a new set of vertex data from the original vector
			splitIndices[i++] = splitIndex;
		}
		
		buffer = new AttributesBuffer(indexAttributes.size*indexAttributes.dimensions, splitIndices.length/indexAttributes.dimensions);
		
		indexAttributes = indexAttributes.clone(buffer);
		indexAttributes.set(splitIndices);
		
		return buffer;
	}

	public static getSubVertices(vertexBuffer:AttributesBuffer, indexMappings:Array<number>):AttributesBuffer
	{
		if (!indexMappings.length)
			return vertexBuffer;

		var stride:number = vertexBuffer.stride;

		var vertices:Uint8Array = vertexBuffer.bufferView;

		var splitVerts:Uint8Array = new Uint8Array(indexMappings.length*stride);
		var splitIndex:number;
		var originalIndex:number;
		var i:number = 0;
		var j:number = 0;
		var len:number = indexMappings.length;
		for (i = 0; i < len; i++) {
			splitIndex = i*stride;
			originalIndex = indexMappings[i]*stride;

			for (j = 0; j < stride; j++)
				splitVerts[splitIndex + j] = vertices[originalIndex + j];
		}

		vertexBuffer = new AttributesBuffer(stride, len);
		vertexBuffer.bufferView = splitVerts;

		return vertexBuffer;
	}

	//TODO - generate this dyanamically based on num tris

	public static hitTestCurveGeometry(x:number, y:number, z:number, boundingBox:Box, curveSubGeometry:CurveSubGeometry):boolean
	{
		var positionAttributes:Short3Attributes = curveSubGeometry.positions;
		var curveAttributes:Short2Attributes = curveSubGeometry.curves;
		var count:number = curveSubGeometry.numVertices;

		var posDim:number = positionAttributes.dimensions;
		var curveDim:number = curveAttributes.dimensions;

		var positions:Float32Array = positionAttributes.get(count);
		var curves:Float32Array = curveAttributes.get(count);

		var id0:number;
		var id1:number;
		var id2:number;

		var ax:number;
		var ay:number;
		var bx:number;
		var by:number;
		var cx:number;
		var cy:number;

		var index:number = curveSubGeometry.lastCollisionIndex;
		if(index != -1 && index < count)
		{
			precheck:
			{
				id0 = index + 2;
				id1 = index + 1;
				id2 = index + 0;

				ax = positions[id0 * posDim];
				ay = positions[id0 * posDim + 1];
				bx = positions[id1 * posDim];
				by = positions[id1 * posDim + 1];
				cx = positions[id2 * posDim];
				cy = positions[id2 * posDim + 1];

				//console.log(ax, ay, bx, by, cx, cy);

				//from a to p
				var dx:number = ax - x;
				var dy:number = ay - y;

				//edge normal (a-b)
				var nx:number = by - ay;
				var ny:number = -(bx - ax);

				//console.log(ax,ay,bx,by,cx,cy);

				var dot:number = (dx * nx) + (dy * ny);

				if (dot > 0)
					break precheck;

				dx = bx - x;
				dy = by - y;
				nx = cy - by;
				ny = -(cx - bx);

				dot = (dx * nx) + (dy * ny);

				if (dot > 0)
					break precheck;

				dx = cx - x;
				dy = cy - y;
				nx = ay - cy;
				ny = -(ax - cx);

				dot = (dx * nx) + (dy * ny);

				if (dot > 0)
					break precheck;

				var curvex:number = curves[id0 * curveDim];

				//check if not solid
				if (curvex != 2) {

					var v0x:number = bx - ax;
					var v0y:number = by - ay;
					var v1x:number = cx - ax;
					var v1y:number = cy - ay;
					var v2x:number = x - ax;
					var v2y:number = y - ay;

					var den:number = v0x * v1y - v1x * v0y;
					var v:number = (v2x * v1y - v1x * v2y) / den;
					var w:number = (v0x * v2y - v2x * v0y) / den;
					//var u:number = 1 - v - w;	//commented out as inlined away

					//here be dragons
					var uu:number = 0.5 * v + w;
					var vv:number = w;

					var d:number = uu * uu - vv;

					var az:number = positions[id0 * posDim + 2];
					if (d > 0 && az == -1) {
						break precheck;;
					} else if (d < 0 && az == 1) {
						break precheck;;
					}
				}
				return true;
			}
		}



		//hard coded min vertex count to bother using a grid for
		if (count > 150) {
			var cells:Array<Array<number>> = curveSubGeometry.cells;
			var divisions:number = cells.length? curveSubGeometry.divisions : (curveSubGeometry.divisions = Math.min(Math.ceil(Math.sqrt(count)), 32));
			var conversionX:number = divisions/boundingBox.width;
			var conversionY:number = divisions/boundingBox.height;
			var minx:number = boundingBox.x;
			var miny:number = boundingBox.y;

			if (!cells.length) { //build grid

				//now we have bounds start creating grid cells and filling
				cells.length = divisions * divisions;

				for(var k:number = 0; k < count; k+=3) {
					id0 = k + 2;
					id1 = k + 1;
					id2 = k + 0;

					ax = positions[id0 * posDim];
					ay = positions[id0 * posDim + 1];
					bx = positions[id1 * posDim];
					by = positions[id1 * posDim + 1];
					cx = positions[id2 * posDim];
					cy = positions[id2 * posDim + 1];

					//subtractions to push into positive space
					var min_index_x:number = Math.floor((Math.min(ax, bx, cx) - minx)*conversionX);
					var min_index_y:number = Math.floor((Math.min(ay, by, cy) - miny)*conversionY);

					var max_index_x:number = Math.floor((Math.max(ax, bx, cx) - minx)*conversionX);
					var max_index_y:number = Math.floor((Math.max(ay, by, cy) - miny)*conversionY);


					for (var i:number = min_index_x; i <= max_index_x; i++) {
						for (var j:number = min_index_y; j <= max_index_y; j++) {
							var index:number = i + j*divisions;
							var nodes:Array<number> = cells[index] || (cells[index] = new Array<number>());

							//push in the triangle ids
							nodes.push(id0, id1, id2);
						}
					}
				}
			}

			var index_x:number = Math.floor((x - minx)*conversionX);
			var index_y:number = Math.floor((y - miny)*conversionY);

			if ((index_x < 0 || index_x > divisions || index_y < 0 || index_y > divisions))
				return false;

			var nodes:Array<number> = cells[index_x + index_y*divisions];

			if (nodes == null)
				return false;

			var nodeCount:number = nodes.length;
			for (var k:number = 0; k < nodeCount; k += 3) {
				id0 = nodes[k];
				id1 = nodes[k + 1];
				id2 = nodes[k + 2];

				if(id2 == index) continue;

				ax = positions[id0 * posDim];
				ay = positions[id0 * posDim + 1];
				bx = positions[id1 * posDim];
				by = positions[id1 * posDim + 1];
				cx = positions[id2 * posDim];
				cy = positions[id2 * posDim + 1];

				//from a to p
				var dx:number = ax - x;
				var dy:number = ay - y;

				//edge normal (a-b)
				var nx:number = by - ay;
				var ny:number = -(bx - ax);

				var dot:number = (dx * nx) + (dy * ny);

				if (dot > 0)
					continue;

				dx = bx - x;
				dy = by - y;
				nx = cy - by;
				ny = -(cx - bx);

				dot = (dx * nx) + (dy * ny);

				if (dot > 0)
					continue;

				dx = cx - x;
				dy = cy - y;
				nx = ay - cy;
				ny = -(ax - cx);

				dot = (dx * nx) + (dy * ny);

				if (dot > 0)
					continue;

				var curvex:number = curves[id0 * curveDim];

				//check if not solid
				if (curvex != 2) {

					var v0x:number = bx - ax;
					var v0y:number = by - ay;
					var v1x:number = cx - ax;
					var v1y:number = cy - ay;
					var v2x:number = x - ax;
					var v2y:number = y - ay;

					var den:number = v0x * v1y - v1x * v0y;
					var v:number = (v2x * v1y - v1x * v2y) / den;
					var w:number = (v0x * v2y - v2x * v0y) / den;
					//var u:number = 1 - v - w;	//commented out as inlined away

					//here be dragons
					var uu:number = 0.5 * v + w;
					var vv:number = w;

					var d:number = uu * uu - vv;
					var az:number = positions[id0 * posDim + 2];

					if (d > 0 && az == -1)
						continue;
					else if (d < 0 && az == 1)
						continue;
				}
				curveSubGeometry.lastCollisionIndex = id2;
				return true;
			}
			return false;
		}

		//brute force
		for(var k:number = 0; k < count; k += 3) {
			id0 = k + 2;
			id1 = k + 1;
			id2 = k + 0;

			if(id2 == index) continue;

			ax = positions[id0 * posDim];
			ay = positions[id0 * posDim + 1];
			bx = positions[id1 * posDim];
			by = positions[id1 * posDim + 1];
			cx = positions[id2 * posDim];
			cy = positions[id2 * posDim + 1];

			//console.log(ax, ay, bx, by, cx, cy);

			//from a to p
			var dx:number = ax - x;
			var dy:number = ay - y;

			//edge normal (a-b)
			var nx:number = by - ay;
			var ny:number = -(bx - ax);

			//console.log(ax,ay,bx,by,cx,cy);

			var dot:number = (dx * nx) + (dy * ny);

			if (dot > 0)
				continue;

			dx = bx - x;
			dy = by - y;
			nx = cy - by;
			ny = -(cx - bx);

			dot = (dx * nx) + (dy * ny);

			if (dot > 0)
				continue;

			dx = cx - x;
			dy = cy - y;
			nx = ay - cy;
			ny = -(ax - cx);

			dot = (dx * nx) + (dy * ny);

			if (dot > 0)
				continue;

			var curvex:number = curves[id0 * curveDim];

			//check if not solid
			if (curvex != 2) {

				var v0x:number = bx - ax;
				var v0y:number = by - ay;
				var v1x:number = cx - ax;
				var v1y:number = cy - ay;
				var v2x:number = x - ax;
				var v2y:number = y - ay;

				var den:number = v0x * v1y - v1x * v0y;
				var v:number = (v2x * v1y - v1x * v2y) / den;
				var w:number = (v0x * v2y - v2x * v0y) / den;
				//var u:number = 1 - v - w;	//commented out as inlined away

				//here be dragons
				var uu:number = 0.5 * v + w;
				var vv:number = w;

				var d:number = uu * uu - vv;

				var az:number = positions[id0 * posDim + 2];
				if (d > 0 && az == -1) {
					continue;
				} else if (d < 0 && az == 1) {
					continue;
				}
			}
			curveSubGeometry.lastCollisionIndex = id2;
			return true;
		}
		return false;
	}

	public static getCurveGeometryBoxBounds(positionAttributes:Float3Attributes, output:Box, count:number, offset:number = 0):Box
	{
		var positions:Float32Array = positionAttributes.get(count, offset);
		var posDim:number = positionAttributes.dimensions;
		var posDim2:number = posDim*2;

		if (output == null)
			output = new Box();

		var minX, minY, maxX, maxY, p;

		maxX = output.width + (minX = output.x);
		maxY = output.height + (minY = output.y);

		var len:number = positions.length;
		for (var i:number = 0; i < len; i += posDim) {
			p = positions[i];
			if (p < minX)
				minX = p;
			else if (p > maxX)
				maxX = p;

			p = positions[i + 1];

			if (p < minY)
				minY = p;
			else if (p > maxY)
				maxY = p;
		}

		output.width = maxX - (output.x = minX);
		output.height = maxY - (output.y = minY);

		return output;
	}


	public static getTriangleGeometryBoxBounds(positionAttributes:Float3Attributes, output:Box, count:number, offset:number = 0):Box
	{
		var positions:Float32Array = positionAttributes.get(count, offset);
		var posDim:number = positionAttributes.dimensions;

		if (output == null)
			output = new Box();

		var pos:number;
		var minX:number = output.x;
		var minY:number = output.y;
		var minZ:number = output.z;
		var maxX:number = output.width + minX;
		var maxY:number = output.height + minY;
		var maxZ:number = output.depth + minZ;

		var len:number = positions.length;
		for (var i:number = 0; i < len; i += posDim) {
			pos = positions[i];
			if (pos < minX)
				minX = pos;
			else if (pos > maxX)
				maxX = pos;

			pos = positions[i + 1];

			if (pos < minY)
				minY = pos;
			else if (pos > maxY)
				maxY = pos;

			pos = positions[i + 2];

			if (pos < minZ)
				minZ = pos;
			else if (pos > maxZ)
				maxZ = pos;
		}

		output.width = maxX - (output.x = minX);
		output.height = maxY - (output.y = minY);
		output.depth = maxZ - (output.z = minZ);

		return output;
	}

	public static getTriangleGeometrySphereBounds(positionAttributes:Float3Attributes, center:Vector3D, output:Sphere, count:number, offset:number = 0):Sphere
	{
		var positions:Float32Array = positionAttributes.get(count, offset);
		var posDim:number = positionAttributes.dimensions;

		if (output == null)
			output = new Sphere();

		var maxRadiusSquared:number = 0;
		var radiusSquared:number;
		var len = positions.length;
		var distanceX:number;
		var distanceY:number;
		var distanceZ:number;

		for (var i:number = 0; i < len; i += posDim) {
			distanceX = positions[i] - center.x;
			distanceY = positions[i + 1] - center.y;
			distanceZ = positions[i + 2] - center.z;
			radiusSquared = distanceX*distanceX + distanceY*distanceY + distanceZ*distanceZ;

			if (maxRadiusSquared < radiusSquared)
				maxRadiusSquared = radiusSquared;
		}

		output.x = center.x;
		output.y = center.y;
		output.z = center.z;
		output.radius = Math.sqrt(maxRadiusSquared);

		return output;
	}

}

export = SubGeometryUtils;