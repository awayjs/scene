import DisplayObject				= require("awayjs-display/lib/base/DisplayObject");
import DisplayObjectContainer		= require("awayjs-display/lib/containers/DisplayObjectContainer");

interface IDisplayObjectAdapter
{
	adaptee:DisplayObject

	isBlockedByScript():boolean;

	freeFromScript():void;

	clone(newAdaptee:DisplayObject):IDisplayObjectAdapter;
}

export = IDisplayObjectAdapter;