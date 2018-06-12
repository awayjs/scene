import {PlaneClassification, Plane3D} from "@awayjs/core";

import {BoundingVolumeBase} from "../bounds/BoundingVolumeBase";
import { DisplayObject } from '../display/DisplayObject';
import { BoundingVolumePool } from './BoundingVolumePool';

export class NullBounds extends BoundingVolumeBase
{
	constructor(asset:DisplayObject, pool:BoundingVolumePool)
	{
		super(asset, pool);
	}

	//@override
	public isInFrustum(planes:Array<Plane3D>, numPlanes:number):boolean
	{
		return true;
	}

	public classifyToPlane(plane:Plane3D):number
	{
		return PlaneClassification.INTERSECT;
	}
}