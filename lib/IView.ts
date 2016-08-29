import {DisplayObject}				from "./display/DisplayObject";
import {TouchPoint}					from "./base/TouchPoint";
import {Scene}						from "./display/Scene";
import {Camera}						from "./display/Camera";
import {ITraverser}						from "./ITraverser";

/**
 *
 */
export interface IView
{
	scene:Scene;

	camera:Camera;

	traversePartitions(traverser:ITraverser)

	getLocalMouseX(displayObject:DisplayObject):number;

	getLocalMouseY(displayObject:DisplayObject):number;

	getLocalTouchPoints(displayObject:DisplayObject):Array<TouchPoint>;
	
	registerObject(displayObject:DisplayObject);

	unRegisterObject(displayObject:DisplayObject);
}