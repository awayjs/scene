import {Plane3D}						from "@awayjs/core/lib/geom/Plane3D";
import {Vector3D}						from "@awayjs/core/lib/geom/Vector3D";
import {AbstractMethodError}			from "@awayjs/core/lib/errors/AbstractMethodError";

import {IEntity}						from "@awayjs/graphics/lib/base/IEntity";

import {DisplayObject}						from "../display/DisplayObject";

import {Sprite}						from "../display/Sprite";

export class BoundingVolumeBase
{
	public _entity:IEntity;
	public _pBoundsPrimitive:Sprite;
	public _pInvalidated:boolean = true;

	constructor(entity:IEntity)
	{
		this._entity = entity;
	}

	public dispose():void
	{
		this._entity = null;
		this._pBoundsPrimitive = null;
	}

	public get boundsPrimitive():DisplayObject
	{
		if (this._pBoundsPrimitive == null) {
			this._pBoundsPrimitive = this._pCreateBoundsPrimitive();

			this._pInvalidated = true;
		}

		if(this._pInvalidated)
			this._pUpdate();

		return this._pBoundsPrimitive;
	}

	public nullify():void
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

	public _pUpdate():void
	{
		this._pInvalidated = false;
	}

	public invalidate():void
	{
		this._pInvalidated = true;
	}

	public _pCreateBoundsPrimitive():Sprite
	{
		throw new AbstractMethodError();
	}
}