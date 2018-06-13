
import {MovieClip} from "../display/MovieClip";

export interface IFrameScript {
	(any?): any;
	precedence?: number[];
	context?: MovieClip;
}