import { IAsset } from '@awayjs/core';
import { Image2D, DefaultStageFactory } from '@awayjs/stage';
import { IMaterial } from '@awayjs/renderer';
import { Graphics } from '@awayjs/graphics';
import { MethodMaterial } from '@awayjs/materials';

import { Timeline } from '../base/Timeline';
import { IFrameScript } from '../base/IFrameScript';
import { Billboard } from '../display/Billboard';
import { TextField } from '../display/TextField';
import { MovieClip } from '../display/MovieClip';
import { Sprite } from '../display/Sprite';
import { DisplayObjectContainer } from '../display/DisplayObjectContainer';
import { PrefabBase } from '../prefabs/PrefabBase';
import { ISceneGraphFactory } from './ISceneGraphFactory';

export class DefaultSceneGraphFactory extends DefaultStageFactory implements ISceneGraphFactory {

	readonly mapMatsForBitmaps: NumberMap<IMaterial> = {};

	readonly awaySymbols: NumberMap<IAsset> = {};

	createMovieClip(timeline: Timeline = null, symbol: any = null): MovieClip {
		return new MovieClip(timeline || new Timeline(this));
	}

	createSprite(prefab: PrefabBase = null, graphics: Graphics = null, symbol: any = null): Sprite {
		if (prefab)
			return <Sprite> prefab.getNewObject();

		return new Sprite();
	}

	createDisplayObjectContainer(symbol: any = null): DisplayObjectContainer {
		return new DisplayObjectContainer();
	}

	createTextField(symbol: any = null): TextField {
		return new TextField();
	}

	createBillboard(material: IMaterial, symbol: any = null): Billboard {
		return new Billboard(material);
	}

	createMaterial(image?: Image2D, alpha?: number): MethodMaterial;
	createMaterial(color?: number, alpha?: number): MethodMaterial;
	createMaterial(imageColor?: any, alpha?: number, symbol: any = null): MethodMaterial {
		return new MethodMaterial(imageColor, alpha);
	}

	createFrameScripts(scripts: IFrameScript[], frameIdx: number, objName: string, objID: number): IFrameScript[] {
		throw ('[DefaultSceneGraphFactory] - createFrameScripts should be overwritten by AVM');
	}

	createChildInstanceForTimeline(timeline: Timeline, symbolID: number, sessionID: number): IAsset {
		throw ('[DefaultSceneGraphFactory] - createChildInstanceForTimeline should be overwritten by AVM');
	}
}