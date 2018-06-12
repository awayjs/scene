import { IAbstractionPool, IAbstractionClass } from '@awayjs/core';

import { DisplayObject } from '../display/DisplayObject';
import { BoundingVolumeBase } from './BoundingVolumeBase';
import { BoundingVolumeType } from './BoundingVolumeType';
import { BoundingBox } from './BoundingBox';
import { BoundingSphere } from './BoundingSphere';
import { NullBounds } from './NullBounds';

export class BoundingVolumePool implements IAbstractionPool
{
	private static _strokeDict:Object = {
		[BoundingVolumeType.BOX] : false,
		[BoundingVolumeType.BOX_BOUNDS] : true,
		[BoundingVolumeType.SPHERE] : false,
		[BoundingVolumeType.SPHERE_BOUNDS] : true,
		[BoundingVolumeType.NULL] : false
	}

	private static _boundsDict:Object = {
		[BoundingVolumeType.BOX] : BoundingBox,
		[BoundingVolumeType.BOX_BOUNDS] : BoundingBox,
		[BoundingVolumeType.SPHERE] : BoundingSphere,
		[BoundingVolumeType.SPHERE_BOUNDS] : BoundingSphere,
		[BoundingVolumeType.NULL] : NullBounds
	}

	private _boundingVolumePool:Object = new Object();
	private _boundingObject:DisplayObject;
	private _strokeFlag:boolean;
	private _boundingVolumeClass:IAbstractionClass;

	public get boundingObject():DisplayObject
	{
		return this._boundingObject;
	}

	public get strokeFlag():boolean
	{
		return this._strokeFlag;
	}

	constructor(boundingObject:DisplayObject, boundingVolumeType:BoundingVolumeType)
	{
		this._boundingObject = boundingObject;
		this._strokeFlag = BoundingVolumePool._strokeDict[boundingVolumeType];
		this._boundingVolumeClass = BoundingVolumePool._boundsDict[boundingVolumeType];
	}

	public getAbstraction(displayObject:DisplayObject):BoundingVolumeBase
	{
		var id:number = displayObject? displayObject.id : -1;
		return (this._boundingVolumePool[id] || (this._boundingVolumePool[id] = new (<IAbstractionClass> this._boundingVolumeClass)(displayObject, this)));
	}

	public clearAbstraction(displayObject:DisplayObject):void
	{
		delete this._boundingVolumePool[displayObject? displayObject.id : -1];
	}	
}