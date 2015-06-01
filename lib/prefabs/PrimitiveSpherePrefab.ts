import IAsset					= require("awayjs-core/lib/library/IAsset");

import LineSubGeometry			= require("awayjs-display/lib/base/LineSubGeometry");
import SubGeometryBase			= require("awayjs-display/lib/base/SubGeometryBase");
import TriangleSubGeometry		= require("awayjs-display/lib/base/TriangleSubGeometry");
import PrimitivePrefabBase		= require("awayjs-display/lib/prefabs/PrimitivePrefabBase");

/**
 * A UV Sphere primitive mesh.
 */
class PrimitiveSpherePrefab extends PrimitivePrefabBase implements IAsset
{
	private _radius:number;
	private _segmentsW:number;
	private _segmentsH:number;
	private _yUp:boolean;

	/**
	 * The radius of the sphere.
	 */
	public get radius():number
	{
		return this._radius;
	}

	public set radius(value:number)
	{
		this._radius = value;

		this._pInvalidateGeometry();
	}

	/**
	 * Defines the number of horizontal segments that make up the sphere. Defaults to 16.
	 */
	public get segmentsW():number
	{
		return this._segmentsW;
	}

	public set segmentsW(value:number)
	{
		this._segmentsW = value;

		this._pInvalidateGeometry();
		this._pInvalidateUVs();
	}

	/**
	 * Defines the number of vertical segments that make up the sphere. Defaults to 12.
	 */
	public get segmentsH():number
	{
		return this._segmentsH;
	}

	public set segmentsH(value:number)
	{
		this._segmentsH = value;

		this._pInvalidateGeometry();
		this._pInvalidateUVs();
	}

	/**
	 * Defines whether the sphere poles should lay on the Y-axis (true) or on the Z-axis (false).
	 */
	public get yUp():boolean
	{
		return this._yUp;
	}

	public set yUp(value:boolean)
	{
		this._yUp = value;

		this._pInvalidateGeometry();
	}

	/**
	 * Creates a new Sphere object.
	 *
	 * @param radius The radius of the sphere.
	 * @param segmentsW Defines the number of horizontal segments that make up the sphere.
	 * @param segmentsH Defines the number of vertical segments that make up the sphere.
	 * @param yUp Defines whether the sphere poles should lay on the Y-axis (true) or on the Z-axis (false).
	 */
	constructor(radius:number = 50, segmentsW:number = 16, segmentsH:number = 12, yUp:boolean = true)
	{
		super();

		this._radius = radius;
		this._segmentsW = segmentsW;
		this._segmentsH = segmentsH;
		this._yUp = yUp;
	}

	/**
	 * @inheritDoc
	 */
	public _pBuildGeometry(target:SubGeometryBase, geometryType:string)
	{
		var indices:Uint16Array;
		var positions:Float32Array;
		var normals:Float32Array;
		var tangents:Float32Array;

		var i:number;
		var j:number;
		var vidx:number, fidx:number; // indices

		var comp1:number;
		var comp2:number;
		var numVertices:number;


		if (geometryType == "triangleSubGeometry") {

			var triangleGeometry:TriangleSubGeometry = <TriangleSubGeometry> target;

			numVertices = (this._segmentsH + 1)*(this._segmentsW + 1);

			if (numVertices == triangleGeometry.numVertices && triangleGeometry.indices != null) {
				indices = triangleGeometry.indices.get(triangleGeometry.numElements);
				positions = triangleGeometry.positions.get(numVertices);
				normals = triangleGeometry.normals.get(numVertices);
				tangents = triangleGeometry.tangents.get(numVertices);
			} else {
				indices = new Uint16Array((this._segmentsH - 1)*this._segmentsW*6);
				positions = new Float32Array(numVertices*3);
				normals = new Float32Array(numVertices*3);
				tangents = new Float32Array(numVertices*3);

				this._pInvalidateUVs();
			}

			vidx = 0;
			fidx = 0;

			var startIndex:number;
			var t1:number;
			var t2:number;

			for (j = 0; j <= this._segmentsH; ++j) {

				startIndex = vidx;

				var horangle:number = Math.PI*j/this._segmentsH;
				var z:number = -this._radius*Math.cos(horangle);
				var ringradius:number = this._radius*Math.sin(horangle);

				for (i = 0; i <= this._segmentsW; ++i) {
					var verangle:number = 2*Math.PI*i/this._segmentsW;
					var x:number = ringradius*Math.cos(verangle);
					var y:number = ringradius*Math.sin(verangle);
					var normLen:number = 1/Math.sqrt(x*x + y*y + z*z);
					var tanLen:number = Math.sqrt(y*y + x*x);

					if (this._yUp) {

						t1 = 0;
						t2 = tanLen > .007? x/tanLen : 0;
						comp1 = -z;
						comp2 = y;

					} else {
						t1 = tanLen > .007? x/tanLen : 0;
						t2 = 0;
						comp1 = y;
						comp2 = z;
					}

					if (i == this._segmentsW) {
						positions[vidx] = positions[startIndex];
						positions[vidx+1] = positions[startIndex + 1];
						positions[vidx+2] = positions[startIndex + 2];
						normals[vidx] = normals[startIndex] + (x*normLen)*.5;
						normals[vidx+1] = normals[startIndex + 1] + ( comp1*normLen)*.5;
						normals[vidx+2] = normals[startIndex + 2] + (comp2*normLen)*.5;
						tangents[vidx] = tanLen > .007? -y/tanLen : 1;
						tangents[vidx+1] = t1;
						tangents[vidx+2] = t2;

					} else {

						positions[vidx] = x;
						positions[vidx+1] = comp1;
						positions[vidx+2] = comp2;
						normals[vidx] = x*normLen;
						normals[vidx+1] = comp1*normLen;
						normals[vidx+2] = comp2*normLen;
						tangents[vidx] = tanLen > .007? -y/tanLen : 1;
						tangents[vidx+1] = t1;
						tangents[vidx+2] = t2;
					}

					if (i > 0 && j > 0) {

						var a:number = (this._segmentsW + 1)*j + i;
						var b:number = (this._segmentsW + 1)*j + i - 1;
						var c:number = (this._segmentsW + 1)*(j - 1) + i - 1;
						var d:number = (this._segmentsW + 1)*(j - 1) + i;

						if (j == this._segmentsH) {

							positions[vidx] = positions[startIndex];
							positions[vidx + 1] = positions[startIndex + 1];
							positions[vidx + 2] = positions[startIndex + 2];

							indices[fidx++] = a;
							indices[fidx++] = c;
							indices[fidx++] = d;

						} else if (j == 1) {

							indices[fidx++] = a;
							indices[fidx++] = b;
							indices[fidx++] = c;

						} else {
							indices[fidx++] = a;
							indices[fidx++] = b;
							indices[fidx++] = c;
							indices[fidx++] = a;
							indices[fidx++] = c;
							indices[fidx++] = d;
						}
					}

					vidx += 3;
				}
			}

			triangleGeometry.setIndices(indices);

			triangleGeometry.setPositions(positions);
			triangleGeometry.setNormals(normals);
			triangleGeometry.setTangents(tangents);

		} else if (geometryType == "lineSubGeometry") {

			var lineGeometry:LineSubGeometry = <LineSubGeometry> target;

			var numSegments:number = this._segmentsH*this._segmentsW*2 + this._segmentsW;
			var positions:Float32Array = new Float32Array(numSegments*6);
			var thickness:Float32Array = new Float32Array(numSegments);

			vidx = 0;

			fidx = 0;

			for (j = 0; j <= this._segmentsH; ++j) {

				var horangle:number = Math.PI*j/this._segmentsH;
				var z:number = -this._radius*Math.cos(horangle);
				var ringradius:number = this._radius*Math.sin(horangle);

				for (i = 0; i <= this._segmentsW; ++i) {
					var verangle:number = 2*Math.PI*i/this._segmentsW;
					var x:number = ringradius*Math.cos(verangle);
					var y:number = ringradius*Math.sin(verangle);

					if (this._yUp) {
						comp1 = -z;
						comp2 = y;

					} else {
						comp1 = y;
						comp2 = z;
					}

					if (i > 0) {
						//horizonal lines
						positions[vidx++] = x;
						positions[vidx++] = comp1;
						positions[vidx++] = comp2;

						thickness[fidx++] = 1;

						//vertical lines
						if (j > 0) {
							var addx:number = (j == 1)? 3 - (6*(this._segmentsW-i) + 12*i) : 3 - this._segmentsW*12;
							positions[vidx] = positions[vidx++ + addx];
							positions[vidx] = positions[vidx++ + addx];
							positions[vidx] = positions[vidx++ + addx];

							positions[vidx++] = x;
							positions[vidx++] = comp1;
							positions[vidx++] = comp2;

							thickness[fidx++] = 1;
						}

					}

					//horizonal lines
					if (i < this._segmentsW) {
						positions[vidx++] = x;
						positions[vidx++] = comp1;
						positions[vidx++] = comp2;
					}
				}
			}

			// build real data from raw data
			lineGeometry.setPositions(positions);
			lineGeometry.setThickness(thickness);
		}
	}

	/**
	 * @inheritDoc
	 */
	public _pBuildUVs(target:SubGeometryBase, geometryType:string)
	{
		var i:number, j:number;
		var numVertices:number = (this._segmentsH + 1)*(this._segmentsW + 1);
		var uvs:Float32Array;


		if (geometryType == "triangleSubGeometry") {

			numVertices = (this._segmentsH + 1)*(this._segmentsW + 1);

			var triangleGeometry:TriangleSubGeometry = <TriangleSubGeometry> target;

			if (numVertices == triangleGeometry.numVertices && triangleGeometry.uvs != null) {
				uvs = triangleGeometry.uvs.get(numVertices);
			} else {
				uvs = new Float32Array(numVertices*2);
			}

			var index:number = 0;
			for (j = 0; j <= this._segmentsH; ++j) {
				for (i = 0; i <= this._segmentsW; ++i) {
					uvs[index++] = ( i/this._segmentsW )*this._scaleU;
					uvs[index++] = ( j/this._segmentsH )*this._scaleV;
				}
			}

			triangleGeometry.setUVs(uvs);

		} else if (geometryType == "lineSubGeometry") {
			//nothing to do here
		}
	}
}

export = PrimitiveSpherePrefab;