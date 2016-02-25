import IDisplayObjectAdapter		= require("awayjs-display/lib/adapters/IDisplayObjectAdapter");
import DisplayObject				= require("awayjs-display/lib/display/DisplayObject");
import DisplayObjectContainer		= require("awayjs-display/lib/display/DisplayObjectContainer");

interface IMovieClipAdapter extends IDisplayObjectAdapter
{
	evalScript(str:string):Function;

	registerScriptObject(child:DisplayObject):void;

	unregisterScriptObject(child:DisplayObject):void;
}

export = IMovieClipAdapter;