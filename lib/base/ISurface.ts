import IAsset						= require("awayjs-core/lib/library/IAsset");
import ImageBase					= require("awayjs-core/lib/image/ImageBase");
import SamplerBase					= require("awayjs-core/lib/image/SamplerBase");

import IAnimationSet				= require("awayjs-display/lib/animators/IAnimationSet");
import IRenderable					= require("awayjs-display/lib/base/IRenderable");
import LightPickerBase				= require("awayjs-display/lib/materials/lightpickers/LightPickerBase");
import TextureBase					= require("awayjs-display/lib/textures/TextureBase");
import Style						= require("awayjs-display/lib/base/Style");

/**
 * ISurface provides an interface for objects that define the properties of a renderable's surface.
 *
 * @interface away.base.ISurface
 */
interface ISurface extends IAsset
{
	alphaThreshold:number;

	style:Style;

	curves:boolean;

	imageRect:boolean;

	blendMode:string;

	lightPicker:LightPickerBase;

	animationSet:IAnimationSet;

	iOwners:Array<IRenderable>;

	getNumTextures():number;

	getTextureAt(index:number):TextureBase;

	addTexture(texture:TextureBase);

	removeTexture(texture:TextureBase);
}

export = ISurface;