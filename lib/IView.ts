import {TraverserBase} from "@awayjs/graphics";

import {TouchPoint} from "./base/TouchPoint";
import {DisplayObject} from "./display/DisplayObject";
import {Camera} from "./display/Camera";

import {Scene} from "./Scene";

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