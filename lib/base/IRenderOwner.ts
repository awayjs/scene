import IAsset						= require("awayjs-core/lib/library/IAsset");
import ImageBase					= require("awayjs-core/lib/image/ImageBase");
import SamplerBase					= require("awayjs-core/lib/image/SamplerBase");

import IAnimationSet				= require("awayjs-display/lib/animators/IAnimationSet");
import IRenderableOwner				= require("awayjs-display/lib/base/IRenderableOwner");
import LightPickerBase				= require("awayjs-display/lib/materials/lightpickers/LightPickerBase");
import TextureBase					= require("awayjs-display/lib/textures/TextureBase");
import Style						= require("awayjs-display/lib/base/Style");

/**
 * IRenderOwner provides an interface for objects that can use materials.
 *
 * @interface away.base.IRenderOwner
 */
interface IRenderOwner extends IAsset
{
	alphaThreshold:number;

	style:Style;

	curves:boolean;

	imageRect:boolean;

	blendMode:string;

	lightPicker:LightPickerBase;

	animationSet:IAnimationSet;

	iOwners:Array<IRenderableOwner>;

	getNumTextures():number;

	getTextureAt(index:number):TextureBase;

	addTexture(texture:TextureBase);

	removeTexture(texture:TextureBase);
}

export = IRenderOwner;