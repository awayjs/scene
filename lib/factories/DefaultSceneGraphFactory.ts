import {Image2D, DefaultGraphicsFactory} from "@awayjs/stage";

import {IMaterial} from "@awayjs/renderer";

import {MethodMaterial} from "@awayjs/materials";

import {Timeline} from "../base/Timeline";
import {Billboard} from "../display/Billboard";
import {TextField} from "../display/TextField";
import {MovieClip} from "../display/MovieClip";
import {Sprite} from "../display/Sprite";
import {DisplayObjectContainer} from "../display/DisplayObjectContainer";
import {PrefabBase} from "../prefabs/PrefabBase";

import {ISceneGraphFactory} from "./ISceneGraphFactory";

export class DefaultSceneGraphFactory extends DefaultGraphicsFactory implements ISceneGraphFactory
{

	createMovieClip(timeline:Timeline = null):MovieClip
	{
		return new MovieClip(timeline);
	}

	createSprite(prefab:PrefabBase = null):Sprite
	{
		if (prefab)
			return <Sprite> prefab.getNewObject();

		return new Sprite();
	}

	createDisplayObjectContainer():DisplayObjectContainer
	{
		return new DisplayObjectContainer();
	}

	createTextField():TextField
	{
		return new TextField();
	}

	createBillboard(material:IMaterial):Billboard
	{
		return new Billboard(material);
	}

	createMaterial(image?:Image2D, alpha?:number):MethodMaterial;
	createMaterial(color?:number, alpha?:number):MethodMaterial;
	createMaterial(imageColor?:any, alpha?:number):MethodMaterial
	{
		return new MethodMaterial(imageColor, alpha);
	}
}