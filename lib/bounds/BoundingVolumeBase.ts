import Box							= require("awayjs-core/lib/geom/Box");
import Matrix3D						= require("awayjs-core/lib/geom/Matrix3D");
import Plane3D						= require("awayjs-core/lib/geom/Plane3D");
import Vector3D						= require("awayjs-core/lib/geom/Vector3D");
import AbstractMethodError			= require("awayjs-core/lib/errors/AbstractMethodError");

import IEntity						= require("awayjs-display/lib/display/IEntity");
import Sprite						= require("awayjs-display/lib/display/Sprite");

class BoundingVolumeBase
{
	public _pEntity:IEntity;
	public _pBoundsPrimitive:Sprite;
	public _pInvalidated:boolean = true;

	constructor(entity)
	{
		this._pEntity = entity;
	}

	public dispose()
	{
		this._pEntity = null;
		this._pBoundsPrimitive = null;
	}

	public get boundsPrimitive():IEntity
	{
		if (this._pBoundsPrimitive == null) {
			this._pBoundsPrimitive = this._pCreateBoundsPrimitive();

			this._pInvalidated = true;
		}

		if(this._pInvalidated)
			this._pUpdate();

		return this._pBoundsPrimitive;
	}

	public nullify()
	{
		throw new AbstractMethodError();
	}

	public isInFrustum(planes:Array<Plane3D>, numPlanes:number):boolean
	{
		throw new AbstractMethodError();
	}

	public clone():BoundingVolumeBase
	{
		throw new AbstractMethodError();
	}

	public rayIntersection(position:Vector3D, direction:Vector3D, targetNormal:Vector3D):number
	{
		return -1;
	}

	public classifyToPlane(plane:Plane3D):number
	{
		throw new AbstractMethodError();
	}

	public _pUpdate()
	{
		this._pInvalidated = false;
	}

	public invalidate()
	{
		this._pInvalidated = true;
	}

	public _pCreateBoundsPrimitive():Sprite
	{
		throw new AbstractMethodError();
	}
}

export = BoundingVolumeBase;