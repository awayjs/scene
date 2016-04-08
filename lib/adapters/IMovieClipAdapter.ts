import IDisplayObjectAdapter		from "awayjs-display/lib/adapters/IDisplayObjectAdapter";
import DisplayObject				from "awayjs-display/lib/display/DisplayObject";

interface IMovieClipAdapter extends IDisplayObjectAdapter
{
	evalScript(str:string):Function;

	registerScriptObject(child:DisplayObject):void;

	unregisterScriptObject(child:DisplayObject):void;
}

export default IMovieClipAdapter;