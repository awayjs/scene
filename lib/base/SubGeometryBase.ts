import AttributesBuffer				= require("awayjs-core/lib/attributes/AttributesBuffer");
import AttributesView				= require("awayjs-core/lib/attributes/AttributesView");
import Float3Attributes				= require("awayjs-core/lib/attributes/Float3Attributes");
import Short3Attributes				= require("awayjs-core/lib/attributes/Short3Attributes");
import AbstractMethodError			= require("awayjs-core/lib/errors/AbstractMethodError");
import Box							= require("awayjs-core/lib/geom/Box");
import Sphere						= require("awayjs-core/lib/geom/Sphere");
import Matrix3D						= require("awayjs-core/lib/geom/Matrix3D");
import Vector3D						= require("awayjs-core/lib/geom/Vector3D");
import Rectangle					= require("awayjs-core/lib/geom/Rectangle");
import AssetBase					= require("awayjs-core/lib/library/AssetBase");

import Geometry						= require("awayjs-display/lib/base/Geometry");
import SubGeometryEvent				= require("awayjs-display/lib/events/SubGeometryEvent");
import IPickingCollider				= require("awayjs-display/lib/pick/IPickingCollider");
import PickingCollisionVO			= require("awayjs-display/lib/pick/PickingCollisionVO");
import MaterialBase					= require("awayjs-display/lib/materials/MaterialBase");

/**
 * @class away.base.TriangleSubGeometry
 */
class SubGeometryBase extends AssetBase
{
	public _pIndices:Short3Attributes;

	private _numElements:number = 0;

	public _concatenatedBuffer:AttributesBuffer;

	private _invalidateIndices:SubGeometryEvent;

	public _verticesDirty:Object = new Object();
	public _invalidateVertices:Object = new Object();

	public get concatenatedBuffer():AttributesBuffer
	{
		return this._concatenatedBuffer;
	}

	/**
	 * The raw index data that define the faces.
	 */
	public get indices():Short3Attributes
	{
		return this._pIndices;
	}

	/**
	 * The total amount of triangles in the TriangleSubGeometry.
	 */
	public get numElements():number
	{
		return this._numElements;
	}

	public get numVertices():number
	{
		throw new AbstractMethodError();
	}

	/**
	 *
	 */
	constructor(concatenatedBuffer:AttributesBuffer = null)
	{
		super();

		this._concatenatedBuffer = concatenatedBuffer;
	}

	/**
	 *
	 */
	public dispose()
	{
		super.dispose();
		
		this.parentGeometry = null;

		if (this._pIndices) {
			this._pIndices.dispose();
			this._pIndices = null;
		}
	}

	/**
	 * Updates the face indices of the TriangleSubGeometry.
	 *
	 * @param indices The face indices to upload.
	 */
	public setIndices(array:Array<number>, offset?:number);
	public setIndices(uint16Array:Uint16Array, offset?:number);
	public setIndices(short3Attributes:Short3Attributes, offset?:number);
	public setIndices(values:any, offset:number = 0)
	{
		if (values instanceof Short3Attributes) {
			if (this._pIndices)
				this.clearIndices();

			this._pIndices = <Short3Attributes> values;
		} else if (values) {
			if (!this._pIndices)
				this._pIndices = new Short3Attributes();

			this._pIndices.set(values, offset);
		} else if (this._pIndices) {
			this._pIndices.dispose();
			this._pIndices = null;

			this.clearIndices();
		}

		if (this._pIndices) {
			this._numElements = this._pIndices.count;

			this.invalidateIndicies();
		} else {
			this._numElements = 0;
		}
	}

	/**
	 * @protected
	 */
	public pInvalidateBounds()
	{
		if (this.parentGeometry)
			this.parentGeometry.iInvalidateBounds(this);
	}

	/**
	 * The Geometry object that 'owns' this TriangleSubGeometry object.
	 *
	 * @private
	 */
	public parentGeometry:Geometry;

	/**
	 * Clones the current object
	 * @return An exact duplicate of the current object.
	 */
	public clone():SubGeometryBase
	{
		throw new AbstractMethodError();
	}

	public applyTransformation(transform:Matrix3D)
	{

	}

	/**
	 * Scales the geometry.
	 * @param scale The amount by which to scale.
	 */
	public scale(scale:number)
	{

	}

	public scaleUV(scaleU:number = 1, scaleV:number = 1)
	{

	}

	public getBoxBounds(target:Box = null):Box
	{
		throw new AbstractMethodError();
	}

	public getSphereBounds(center:Vector3D, target:Sphere = null):Sphere
	{
		throw new AbstractMethodError();
	}

	public hitTestPoint(x:number, y:number, z:number, box:Box):boolean
	{
		throw new AbstractMethodError();
	}

	private invalidateIndicies()
	{
		if (!this._invalidateIndices)
			this._invalidateIndices = new SubGeometryEvent(SubGeometryEvent.INVALIDATE_INDICES, this._pIndices);

		this.dispatchEvent(this._invalidateIndices);
	}

	private clearIndices()
	{
		this.dispatchEvent(new SubGeometryEvent(SubGeometryEvent.CLEAR_INDICES, this._pIndices));
	}

	public invalidateVertices(attributesView:AttributesView)
	{
		if (!attributesView || this._verticesDirty[attributesView.id])
			return;

		this._verticesDirty[attributesView.id] = true;

		if (!this._invalidateVertices[attributesView.id])
			this._invalidateVertices[attributesView.id] = new SubGeometryEvent(SubGeometryEvent.INVALIDATE_VERTICES, attributesView);

		this.dispatchEvent(this._invalidateVertices[attributesView.id]);
	}


	public clearVertices(attributesView:AttributesView)
	{
		if (!attributesView)
			return;

		attributesView.dispose();

		this.dispatchEvent(new SubGeometryEvent(SubGeometryEvent.CLEAR_VERTICES, attributesView));

		this._verticesDirty[attributesView.id] = null;
		this._invalidateVertices[attributesView.id] = null;
	}

	public _iTestCollision(pickingCollider:IPickingCollider, material:MaterialBase, pickingCollisionVO:PickingCollisionVO, shortestCollisionDistance:number):boolean
	{
		throw new AbstractMethodError();
	}
}

export = SubGeometryBase;