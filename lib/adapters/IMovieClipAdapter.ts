import { IDisplayObjectAdapter } from '../adapters/IDisplayObjectAdapter';
import { Timeline } from '../base/Timeline';
import { DisplayObject } from '../display/DisplayObject';
import { IFrameScript } from '../base/IFrameScript';

export interface IMovieClipAdapter extends IDisplayObjectAdapter
{
	executeScript(script: IFrameScript[]): void;

	registerScriptObject(child: DisplayObject): void;

	unregisterScriptObject(child: DisplayObject): void;

	addTimelineChildAtDepth(child: DisplayObject, depth: number): void;

	removeTimelineChildAt(value: number): void;

	removeAllTimelineChilds(): void;

	queueFrameScripts(timeline: Timeline, frame_idx: number, scriptPass1: boolean);

	getChildForDraw(value: DisplayObject): DisplayObject;

	returnChildAfterDraw(value: DisplayObject);

	constructFrame(timeline: Timeline, start_construct_idx: number,
		target_keyframe_idx: number, jump_forward: boolean,
		frame_idx: number, queue_pass2: boolean, queue_script: boolean);
}