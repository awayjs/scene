import { Image2D, IGraphicsFactory } from '@awayjs/stage';
import { IMaterial } from '@awayjs/renderer';
import { Timeline } from '../base/Timeline';
import { Billboard } from '../display/Billboard';
import { TextField } from '../display/TextField';
import { MovieClip } from '../display/MovieClip';
import { Sprite } from '../display/Sprite';
import { PrefabBase } from '../prefabs/PrefabBase';
import { DisplayObjectContainer } from '../display/DisplayObjectContainer';
import { Graphics } from '@awayjs/graphics';
import { IFrameScript } from '../base/IFrameScript';

export interface ISceneGraphFactory extends IGraphicsFactory
{
	createMovieClip(timelime?: Timeline, symbol?: any): MovieClip;

	createTextField(symbol?: any): TextField;

	createDisplayObjectContainer(symbol?: any): DisplayObjectContainer;

	createSprite(prefab?: PrefabBase, graphics?: Graphics, symbol?: any): Sprite;

	createBillboard(material?: IMaterial, symbol?: any): Billboard;

	createMaterial(image?: Image2D, alpha?: number, symbol?: any): IMaterial;
	createMaterial(color?: number, alpha?: number, symbol?: any): IMaterial;

	createFrameScripts(scripts: IFrameScript[], frameIdx: number, objName: string, objID: number): IFrameScript[];
}