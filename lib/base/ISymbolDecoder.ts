import { IAsset } from '@awayjs/core';
import { IFrameScript } from './IFrameScript';
import { Timeline } from './Timeline';

export interface ISymbolDecoder {

	createChildInstanceForTimeline(timeline: Timeline, symbolID: number, sessionID: number): IAsset;

	prepareFrameScriptsForAVM1(source: IFrameScript[], frameIdx: number,
		objName: string, objID: number): IFrameScript[];
}