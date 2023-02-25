import { IAsset } from '@awayjs/core';
import { IMaterial, IMaterialFactory } from '@awayjs/renderer';
import { Graphics } from '@awayjs/graphics';

import { Timeline } from '../base/Timeline';
import { IFrameScript } from '../base/IFrameScript';
import { Billboard } from '../display/Billboard';
import { TextField } from '../display/TextField';
import { MovieClip } from '../display/MovieClip';
import { Sprite } from '../display/Sprite';
import { DisplayObjectContainer } from '../display/DisplayObjectContainer';
import { PrefabBase } from '../prefabs/PrefabBase';

export interface ISceneGraphFactory extends IMaterialFactory
{
	createMovieClip(timelime?: Timeline, symbol?: any): MovieClip;

	createTextField(symbol?: any): TextField;

	createDisplayObjectContainer(symbol?: any): DisplayObjectContainer;

	createSprite(prefab?: PrefabBase, graphics?: Graphics, symbol?: any): Sprite;

	createBillboard(material?: IMaterial, symbol?: any): Billboard;

	createFrameScripts(scripts: IFrameScript[], frameIdx: number, objName: string, objID: number): IFrameScript[];

	createChildInstanceForTimeline(timeline: Timeline, symbolID: number, sessionID: number): IAsset;
}