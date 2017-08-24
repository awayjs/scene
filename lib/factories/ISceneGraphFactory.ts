import {MaterialBase, Image2D, IGraphicsFactory} from "@awayjs/graphics";

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

	createBillboard(material?:MaterialBase):Billboard;

	createMaterial(image?:Image2D, alpha?:number):MaterialBase;
	createMaterial(color?:number, alpha?:number):MaterialBase;
}