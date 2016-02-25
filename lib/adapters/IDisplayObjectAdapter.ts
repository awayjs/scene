import DisplayObject				= require("awayjs-display/lib/display/DisplayObject");
import DisplayObjectContainer		= require("awayjs-display/lib/display/DisplayObjectContainer");

interface IDisplayObjectAdapter
{
	adaptee:DisplayObject;

	isBlockedByScript():boolean;

	isVisibilityByScript():boolean;

	freeFromScript():void;

	clone(newAdaptee:DisplayObject):IDisplayObjectAdapter;

	dispose();
}

export = IDisplayObjectAdapter;