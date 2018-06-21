import {Plane3D, Vector3D, AbstractMethodError, AbstractionBase, AssetEvent, TransformEvent} from "@awayjs/core";

import {IEntity} from "@awayjs/renderer";

import {DisplayObject} from "../display/DisplayObject";
import {Sprite} from "../display/Sprite";
import { DisplayObjectEvent } from '../events/DisplayObjectEvent';

import { BoundingVolumePool } from './BoundingVolumePool';

export class BoundingVolumeBase extends AbstractionBase
{
	private _onInvalidateBoundsDelegate:(event:DisplayObjectEvent) => void;
	private _onInvalidateMatrix3DDelegate:(event:TransformEvent) => void;

	protected _targetCoordinateSpace:DisplayObject;
	protected _boundingObject:DisplayObject;
	protected _strokeFlag:boolean;
	protected _fastFlag:boolean;
	protected _boundsPrimitive:Sprite;

	constructor(asset:DisplayObject, pool:BoundingVolumePool)
	{
		super(asset, pool);

		this._targetCoordinateSpace = asset;
		this._boundingObject = pool.boundingObject;
		this._strokeFlag = pool.strokeFlag;
		this._fastFlag = pool.fastFlag;

		this._onInvalidateBoundsDelegate = (event:DisplayObjectEvent) => this._onInvalidateBounds(event);
		this._onInvalidateMatrix3DDelegate = (event:TransformEvent) => this._onInvalidateMatrix3D(event);

		this._boundingObject.addEventListener(DisplayObjectEvent.INVALIDATE_BOUNDS, this._onInvalidateBoundsDelegate);

		if (this._targetCoordinateSpace)
			this._targetCoordinateSpace.transform.addEventListener(TransformEvent.INVALIDATE_MATRIX3D, this._onInvalidateMatrix3DDelegate);
	}

	public _onInvalidateBounds(event:DisplayObjectEvent):void
	{
		this._invalid = true;
	}
	
	public _onInvalidateMatrix3D(event:TransformEvent):void
	{
		this._invalid = true;
	}
	
	public onClear(event:AssetEvent):void
	{
		super.onClear(event);

		this._boundingObject.removeEventListener(DisplayObjectEvent.INVALIDATE_BOUNDS, this._onInvalidateBoundsDelegate);
		
		if (this._targetCoordinateSpace)
			this._targetCoordinateSpace.removeEventListener(TransformEvent.INVALIDATE_MATRIX3D, this._onInvalidateMatrix3DDelegate);
		
		this._targetCoordinateSpace = null;
		this._boundingObject = null;
		this._boundsPrimitive = null;
	}

	public get boundsPrimitive():DisplayObject
	{
		if (this._boundsPrimitive == null) {
			this._boundsPrimitive = this._createBoundsPrimitive();

			this._invalid = true;
		}

		if(this._invalid)
			this._update();

		this._boundsPrimitive.transform.matrix3D = this._boundingObject.transform.concatenatedMatrix3D;
		
		return this._boundsPrimitive;
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

	public _update():void
	{
		this._invalid = false;
	}

	public _createBoundsPrimitive():Sprite
	{
		throw new AbstractMethodError();
	}
}