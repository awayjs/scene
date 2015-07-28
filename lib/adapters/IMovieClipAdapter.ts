import IDisplayObjectAdapter		= require("awayjs-display/lib/adapters/IDisplayObjectAdapter");
import DisplayObject				= require("awayjs-display/lib/base/DisplayObject");
import DisplayObjectContainer		= require("awayjs-display/lib/containers/DisplayObjectContainer");

interface IMovieClipAdapter extends IDisplayObjectAdapter
{
	isBlockedByScript():boolean;

	freeFromScript():void;

	registerScriptObject(child:DisplayObject):void;

	unregisterScriptObject(child:DisplayObject):void;

	// Lists a bunch of class names which need to be replaced with adapter types
	classReplacements:Object;
}

export = IMovieClipAdapter;