import {MaterialBase} from "@awayjs/graphics";

import {Timeline} from "../base/Timeline";
import {Billboard} from "../display/Billboard";
import {TextField} from "../display/TextField";
import {MovieClip} from "../display/MovieClip";
import {Sprite} from "../display/Sprite";
import {DisplayObjectContainer} from "../display/DisplayObjectContainer";

import {ISceneGraphFactory} from "./ISceneGraphFactory";

export class DefaultSceneGraphFactory implements ISceneGraphFactory
{
	constructor()
	{
	}

	createMovieClip(timeline:Timeline = null):MovieClip
	{
		return new MovieClip(timeline);
	}

	createSprite():Sprite
	{
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

	createBillboard(material:MaterialBase):Billboard
	{
		return new Billboard(material);
	}
}