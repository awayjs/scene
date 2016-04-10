import IDisplayObjectAdapter		from "../adapters/IDisplayObjectAdapter";
import DisplayObject				from "../display/DisplayObject";

interface IMovieClipAdapter extends IDisplayObjectAdapter
{
	evalScript(str:string):Function;

	registerScriptObject(child:DisplayObject):void;

	unregisterScriptObject(child:DisplayObject):void;
}

export default IMovieClipAdapter;