import {IDisplayObjectAdapter} from "../adapters/IDisplayObjectAdapter";
import {DisplayObject} from "../display/DisplayObject";

export interface IMovieClipAdapter extends IDisplayObjectAdapter
{
	// todo:better typings for different rypes of scripts
	// as2_as_js scripts use addScript(source:string):Function;
	// avm1 scripts use addScript(source:anny):any;
	addScript(source:any, frameIdx:number):any;

	// todo: better type for script. for avm1 its a object, for as2_as_js its a string
	executeScript(script:any):void;

	registerScriptObject(child:DisplayObject):void;
	
	unregisterScriptObject(child:DisplayObject):void;
}