import {Image2D, IGraphicsFactory} from "@awayjs/stage";

import {IMaterial} from "@awayjs/renderer";

import {Timeline} from "../base/Timeline";
import {Billboard} from "../display/Billboard";
import {TextField} from "../display/TextField";
import {MovieClip} from "../display/MovieClip";
import {Sprite} from "../display/Sprite";
import {PrefabBase} from "../prefabs/PrefabBase";
import {DisplayObjectContainer} from "../display/DisplayObjectContainer";

export interface ISceneGraphFactory extends IGraphicsFactory
{
	createMovieClip(timelime?:Timeline):MovieClip;

	createTextField():TextField;

	createDisplayObjectContainer():DisplayObjectContainer;

	createSprite(prefab?:PrefabBase):Sprite;

	createBillboard(material?:IMaterial):Billboard;

	createMaterial(image?:Image2D, alpha?:number):IMaterial;
	createMaterial(color?:number, alpha?:number):IMaterial;
}