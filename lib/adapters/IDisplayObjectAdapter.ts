import {IAssetAdapter} from "@awayjs/core";

import {DisplayObject} from "../display/DisplayObject";

export interface IDisplayObjectAdapter extends IAssetAdapter
{
	isBlockedByScript():boolean;

	isVisibilityByScript():boolean;
	
	isColorTransformByScript():boolean;

	freeFromScript():void;

	clone();
}