import {TraverserBase}						from "@awayjs/graphics/lib/base/TraverserBase";

import {DisplayObject}				from "./display/DisplayObject";
import {TouchPoint}					from "./base/TouchPoint";
import {Scene}						from "./display/Scene";
import {Camera}						from "./display/Camera";

/**
 *
 */
export interface IView
{
	scene:Scene;

	camera:Camera;

	traversePartitions(traverser:TraverserBase)

	getLocalMouseX(displayObject:DisplayObject):number;

	getLocalMouseY(displayObject:DisplayObject):number;

	getLocalTouchPoints(displayObject:DisplayObject):Array<TouchPoint>;
	
	registerObject(displayObject:DisplayObject);

	unRegisterObject(displayObject:DisplayObject);
}