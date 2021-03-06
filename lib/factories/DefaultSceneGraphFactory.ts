import { Image2D, DefaultGraphicsFactory } from '@awayjs/stage';

import { IMaterial } from '@awayjs/renderer';

import { MethodMaterial } from '@awayjs/materials';

import { Timeline } from '../base/Timeline';
import { Billboard } from '../display/Billboard';
import { TextField } from '../display/TextField';
import { MovieClip } from '../display/MovieClip';
import { Sprite } from '../display/Sprite';
import { DisplayObjectContainer } from '../display/DisplayObjectContainer';
import { PrefabBase } from '../prefabs/PrefabBase';

import { ISceneGraphFactory } from './ISceneGraphFactory';
import { Graphics } from '@awayjs/graphics';
import { IFrameScript } from '../base/IFrameScript';

export class DefaultSceneGraphFactory extends DefaultGraphicsFactory implements ISceneGraphFactory {

	createMovieClip(timeline: Timeline = null, symbol: any = null): MovieClip {
		return new MovieClip(timeline);
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
}