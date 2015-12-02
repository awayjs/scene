import IAsset						= require("awayjs-core/lib/library/IAsset");
import ImageBase					= require("awayjs-core/lib/data/ImageBase");

import IAnimationSet				= require("awayjs-display/lib/animators/IAnimationSet");
import IRender						= require("awayjs-display/lib/pool/IRender");
import IRenderableOwner				= require("awayjs-display/lib/base/IRenderableOwner");
import LightPickerBase				= require("awayjs-display/lib/materials/lightpickers/LightPickerBase");
import TextureBase					= require("awayjs-display/lib/textures/TextureBase");


/**
 * IRenderOwner provides an interface for objects that can use materials.
 *
 * @interface away.base.IRenderOwner
 */
interface IRenderOwner extends IAsset
{
	alphaThreshold:number;

	mipmap:boolean;

	smooth:boolean;

	imageRect:boolean;

	blendMode:string;

	lightPicker:LightPickerBase;

	animationSet:IAnimationSet;

	iOwners:Array<IRenderableOwner>;

	getNumImages():number;

	getImageAt(index:number):ImageBase;

	getImageIndex(image:ImageBase):number;

	_iAddRender(render:IRender):IRender;

	_iRemoveRender(render:IRender):IRender;

	_iAddImage(image:ImageBase);

	_iRemoveImage(image:ImageBase);
}

export = IRenderOwner;