import DisplayObject				from "awayjs-display/lib/display/DisplayObject";

interface IDisplayObjectAdapter
{
	adaptee:DisplayObject;

	isBlockedByScript():boolean;

	isVisibilityByScript():boolean;

	freeFromScript():void;

	clone(newAdaptee:DisplayObject):IDisplayObjectAdapter;

	dispose();
}

export default IDisplayObjectAdapter;