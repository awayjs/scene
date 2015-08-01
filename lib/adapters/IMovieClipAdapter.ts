import IDisplayObjectAdapter		= require("awayjs-display/lib/adapters/IDisplayObjectAdapter");
import DisplayObject				= require("awayjs-display/lib/base/DisplayObject");
import DisplayObjectContainer		= require("awayjs-display/lib/containers/DisplayObjectContainer");

interface IMovieClipAdapter extends IDisplayObjectAdapter
{
	evalScript(str:string):Function;

	registerScriptObject(child:DisplayObject):void;

	unregisterScriptObject(child:DisplayObject):void;
}

export = IMovieClipAdapter;