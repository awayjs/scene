import {MaterialBase} from "@awayjs/graphics";

import {Timeline} from "../base/Timeline";
import {Billboard} from "../display/Billboard";
import {TextField} from "../display/TextField";
import {MovieClip} from "../display/MovieClip";
import {Sprite} from "../display/Sprite";
import {DisplayObjectContainer} from "../display/DisplayObjectContainer";

export interface ISceneGraphFactory
{
	createMovieClip(timelime?:Timeline):MovieClip;
	createTextField():TextField;
	createDisplayObjectContainer():DisplayObjectContainer;
	createSprite():Sprite;
	createBillboard(material?:MaterialBase):Billboard;
}