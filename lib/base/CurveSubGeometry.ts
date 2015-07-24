import AttributesBuffer				= require("awayjs-core/lib/attributes/AttributesBuffer");
import Float3Attributes				= require("awayjs-core/lib/attributes/Float3Attributes");
import Float2Attributes				= require("awayjs-core/lib/attributes/Float2Attributes");
import Short3Attributes				= require("awayjs-core/lib/attributes/Short3Attributes");
import Matrix3D						= require("awayjs-core/lib/geom/Matrix3D");

import SubGeometryBase				= require("awayjs-display/lib/base/SubGeometryBase");
import MaterialBase					= require("awayjs-display/lib/materials/MaterialBase");
import SubGeometryUtils				= require("awayjs-display/lib/utils/SubGeometryUtils");
import IPickingCollider				= require("awayjs-display/lib/pick/IPickingCollider");
import PickingCollisionVO			= require("awayjs-display/lib/pick/PickingCollisionVO");

/**
 * @class away.base.CurveSubGeometry
 */
class CurveSubGeometry extends SubGeometryBase
{
	public static assetType:string = "[asset CurveSubGeometry]";

	private _numVertices:number = 0;
	private _uvsDirty:boolean = true;

	private _positions:Float3Attributes;
	private _curves:Float2Attributes;
	private _uvs:Float2Attributes;

	private _autoDeriveUVs:boolean = false;

	private _scaleU:number = 1;
	private _scaleV:number = 1;


	public get assetType():string
	{
		return CurveSubGeometry.assetType;
	}

	public get numVertices():number
	{
		return this._numVertices;
	}

	/**
	 * Defines whether a UV buffer should be automatically generated to contain dummy UV coordinates.
	 * Set to true if a geometry lacks UV data but uses a material that requires it, or leave as false
	 * in cases where UV data is explicitly defined or the material does not require UV data.
	 */
	public get autoDeriveUVs():boolean
	{
		return this._autoDeriveUVs;
	}

	public set autoDeriveUVs(value:boolean)
	{
		if (this._autoDeriveUVs == value)
			return;

		this._autoDeriveUVs = value;

		if (value)
			this._uvsDirty = true;
	}

	/**
	 *
	 */
	public get scaleU():number
	{
		return this._scaleU;
	}

	/**
	 *
	 */
	public get scaleV():number
	{
		return this._scaleV;
	}

	/**
	 *
	 */
	public get positions():Float3Attributes
	{
		return this._positions;
	}

	/**
	 *
	 */
	public get curves():Float2Attributes
	{
		return this._curves;
	}



	/**
	 *
	 */
	public get uvs():Float2Attributes
	{
		if (this._uvsDirty)
			this.setUVs(this._uvs);

		return this._uvs;
	}

	/**
	 *
	 */
	constructor(concatenatedBuffer:AttributesBuffer = null)
	{
		super(concatenatedBuffer);

		this._positions = this._concatenatedBuffer? <Float3Attributes> this._concatenatedBuffer.getView(0) || new Float3Attributes(this._concatenatedBuffer) : new Float3Attributes();

		this._curves = this._concatenatedBuffer? <Float2Attributes> this._concatenatedBuffer.getView(1) || new Float2Attributes(this._concatenatedBuffer) : new Float2Attributes();

		this._numVertices = this._positions.count;
	}

	public getBoundingPositions():Float32Array
	{
		return this._positions.get(this._numVertices);
	}
	//grid stuff - to tidy
	private cells:Array<Array<number>>;
	//TODO - generate this dyanamically based on num tris
	private devisions:number = 32;
	private conversionX:number;
	private conversionY:number;
	private minx:number;
	private maxx:number;
	private miny:number;
	private maxy:number;

	private getCell(x:number, y:number):number
	{
		var index_x:number = Math.floor((x - this.minx) * this.conversionX);
		var index_y:number = Math.floor((y - this.miny) * this.conversionY);

		//out of bounds
		if(index_x < 0 || index_x > this.devisions || index_y < 0 || index_y > this.devisions) return -1;

		return  index_x + index_y * this.devisions;
	}
	private buildGrid():void
	{
		//calculate bounds, ideally via bounding box already computed
		//if not just loop through and generate min/max
		var positions:Float32Array = this.positions.get(this._numVertices);
		var posDim:number = this.positions.dimensions;
		this.minx = Number.MAX_VALUE;
		this.maxx = -Number.MAX_VALUE;
		this.miny = Number.MAX_VALUE;
		this.maxy = -Number.MAX_VALUE;
		for(var k:number = 0; k < positions.length; k+=3)
		{
			var x:number = positions[k];
			var y:number = positions[k + 1];

			if(x < this.minx) this.minx = x;
			if(x > this.maxx) this.maxx = x;
			if(y < this.miny) this.miny = y;
			if(y > this.maxy) this.maxy = y;
		}

		var width:number = this.maxx - this.minx;
		var height:number = this.maxy - this.miny;


		//now we have bounds start creating grid cells and filling
		var maxDevisions:number = 32;
		this.devisions = Math.ceil(Math.sqrt(this.numVertices));
		this.devisions = Math.min(this.devisions, maxDevisions);
		var numCells:number = this.devisions * this.devisions;
		var cellWidth:number = width/this.devisions;
		var cellHeight:number = height/this.devisions;

		this.conversionX = 1/cellWidth;
		this.conversionY = 1/cellHeight;

		var id0:number;
		var id1:number;
		var id2:number;

		var ax:number;
		var ay:number;
		var bx:number;
		var by:number;
		var cx:number;
		var cy:number;

		this.cells = new Array<Array<number>>(numCells);

		for(var k:number = 0; k < this._numVertices; k+=3) {
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
			var left:number = Math.min(ax, bx, cx)-this.minx;
			var right:number = Math.max(ax, bx, cx)-this.minx;
			var top:number = Math.min(ay, by, cy)-this.miny;
			var bottom:number = Math.max(ay, by, cy)-this.miny;

			var min_index_x:number = Math.floor(left * this.conversionX);
			var min_index_y:number = Math.floor(top * this.conversionY);

			var max_index_x:number = Math.floor(right * this.conversionX);
			var max_index_y:number = Math.floor(bottom * this.conversionY);


			for (var i : number = min_index_x; i <= max_index_x; i++)
			{
				for (var j : number = min_index_y; j <= max_index_y; j++)
				{
					var index:number = i + j * this.devisions;
					var nodes:Array<number> = this.cells[index];
					if(nodes == null)
					{
						nodes = new Array<number>();
						this.cells[index] = nodes;
					}
					//push in the triangle ids
					nodes.push(id0, id1, id2);
				}
			}
		}
	}
	public hitTestPoint(x:number, y:number, z:number):boolean {
		var posDim:number = this.positions.dimensions;
		var curveDim:number = this.curves.dimensions;

		var positions:Float32Array = this.positions.get(this._numVertices);
		var curves:Float32Array = this.curves.get(this._numVertices);

		var id0:number;
		var id1:number;
		var id2:number;

		var ax:number;
		var ay:number;
		var bx:number;
		var by:number;
		var cx:number;
		var cy:number;

		//hard coded min vertex count to bother using a grid for
		if(this.numVertices > 150){


			if (this.cells == null) {
				this.buildGrid();
			}
			var cell:number = this.getCell(x, y);
			if (cell == -1) return false;

			var nodes:Array<number> = this.cells[cell];
			if (nodes == null) return false;


			for (var k:number = 0; k < nodes.length; k += 3) {
				id0 = nodes[k];
				id1 = nodes[k + 1];
				id2 = nodes[k + 2];

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
				//console.log("dot a",dot);
				if (dot > 0) continue;

				dx = bx - x;
				dy = by - y;
				nx = cy - by;
				ny = -(cx - bx);

				dot = (dx * nx) + (dy * ny);
				//console.log("dot b",dot);
				if (dot > 0) continue;

				dx = cx - x;
				dy = cy - y;
				nx = ay - cy;
				ny = -(ax - cx);

				dot = (dx * nx) + (dy * ny);
				//console.log("dot c",dot);
				if (dot > 0) continue;

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
				return true;
			}
			return false;
		}
		//brute force

		for(var k:number = 0; k < this._numVertices; k+=3)
		{
			id0 = k + 2;
			id1 = k + 1;
			id2 = k + 0;

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
			//console.log("dot a",dot);
			if (dot > 0) continue;

			dx = bx - x;
			dy = by - y;
			nx = cy - by;
			ny = -(cx - bx);

			dot = (dx * nx) + (dy * ny);
			//console.log("dot b",dot);
			if (dot > 0) continue;

			dx = cx - x;
			dy = cy - y;
			nx = ay - cy;
			ny = -(ax - cx);

			dot = (dx * nx) + (dy * ny);
			//console.log("dot c",dot);
			if (dot > 0) continue;

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
			return true;
		}
		return false;
	}

	/**
	 *
	 */
	public setPositions(array:Array<number>, offset?:number);
	public setPositions(float32Array:Float32Array, offset?:number);
	public setPositions(float3Attributes:Float3Attributes, offset?:number);
	public setPositions(values:any, offset:number = 0)
	{
		if (values == this._positions)
			return;

		if (values instanceof Float3Attributes) {
			this.notifyVerticesDispose(this._positions);
			this._positions = <Float3Attributes> values;
		} else if (values) {
			this._positions.set(values, offset);
		} else {
			this.notifyVerticesDispose(this._positions);
			this._positions = new Float3Attributes(this._concatenatedBuffer);
		}

		this._numVertices = this._positions.count;

		if (this._autoDeriveUVs)
			this.notifyVerticesUpdate(this._uvs);

		this.pInvalidateBounds();

		this.notifyVerticesUpdate(this._positions);

		this._verticesDirty[this._positions.id] = false;
	}

	/**
	 * Updates the vertex normals based on the geometry.
	 */
	public setCurves(array:Array<number>, offset?:number);
	public setCurves(float32Array:Float32Array, offset?:number);
	public setCurves(float2Attributes:Float2Attributes, offset?:number);
	public setCurves(values:any, offset:number = 0)
	{
		if (values == this._curves)
			return;

		if (values instanceof Float2Attributes) {
			this.notifyVerticesDispose(this._curves);
			this._curves = <Float2Attributes> values;
		} else if (values) {
			this._curves.set(values, offset);
		} else {
			this.notifyVerticesDispose(this._curves);
			this._curves = new Float2Attributes(this._concatenatedBuffer);
		}

		this.notifyVerticesUpdate(this._curves);

		this._verticesDirty[this._curves.id] = false;
	}


	/**
	 * Updates the uvs based on the geometry.
	 */
	public setUVs(array:Array<number>, offset?:number);
	public setUVs(float32Array:Float32Array, offset?:number);
	public setUVs(float2Attributes:Float2Attributes, offset?:number);
	public setUVs(values:any, offset:number = 0)
	{
		if (!this._autoDeriveUVs) {
			if (values == this._uvs)
				return;

			if (values instanceof Float2Attributes) {
				this.notifyVerticesDispose(this._uvs);
				this._uvs = <Float2Attributes> values;
			} else if (values) {
				if (!this._uvs)
					this._uvs = new Float2Attributes(this._concatenatedBuffer);

				this._uvs.set(values, offset);
			} else if (this._uvs) {
				this.notifyVerticesDispose(this._uvs);
				this._uvs = null;
				return;
			}
		} else {
			this._uvs = SubGeometryUtils.generateUVs(this._pIndices, this._uvs, this._concatenatedBuffer, this._numVertices);
		}

		this.notifyVerticesUpdate(this._uvs);

		this._verticesDirty[this._uvs.id] = false;
	}


	/**
	 *
	 */
	public dispose()
	{
		super.dispose();

		this._positions.dispose();
		this._positions = null;

		this._curves.dispose();
		this._curves = null;

		if (this._uvs) {
			this._uvs.dispose();
			this._uvs = null;
		}

	}

	/**
	 * Clones the current object
	 * @return An exact duplicate of the current object.
	 */
	public clone():CurveSubGeometry
	{
		var clone:CurveSubGeometry = new CurveSubGeometry(this._concatenatedBuffer? this._concatenatedBuffer.clone() : null);

		//temp disable auto derives
		clone.autoDeriveUVs = false;

		if (this.indices)
			clone.setIndices(this.indices.clone());

		if (this.uvs)
			clone.setUVs(this.uvs.clone());

		//return auto derives to cloned values
		clone.autoDeriveUVs = this._autoDeriveUVs;

		return clone;
	}

	public scaleUV(scaleU:number = 1, scaleV:number = 1)
	{
		SubGeometryUtils.scaleUVs(scaleU, scaleV, this.uvs, this.uvs.count);
	}

	/**
	 * Scales the geometry.
	 * @param scale The amount by which to scale.
	 */

	/**
	 * Scales the geometry.
	 * @param scale The amount by which to scale.
	 */
	public scale(scale:number)
	{
		SubGeometryUtils.scale(scale, this.positions, this._numVertices);
	}

	public applyTransformation(transform:Matrix3D)
	{
		SubGeometryUtils.applyTransformation(transform, this.positions, null, null, this.positions.count);
	}

	public _iTestCollision(pickingCollider:IPickingCollider, material:MaterialBase, pickingCollisionVO:PickingCollisionVO, shortestCollisionDistance:number):boolean
	{
		return pickingCollider.testCurveCollision(this, material, pickingCollisionVO, shortestCollisionDistance);
	}
}

export = CurveSubGeometry;