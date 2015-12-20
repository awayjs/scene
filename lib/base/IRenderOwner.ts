import IAsset						= require("awayjs-core/lib/library/IAsset");
import ImageBase					= require("awayjs-core/lib/image/ImageBase");
import SamplerBase					= require("awayjs-core/lib/image/SamplerBase");

import IAnimationSet				= require("awayjs-display/lib/animators/IAnimationSet");
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

	getNumSamplers():number;

	getSamplerAt(index:number):SamplerBase;

	getSamplerIndex(texture:TextureBase, index?:number):number;

	_iAddImage(image:ImageBase);

	_iRemoveImage(image:ImageBase);

	_iAddSampler(sampler:SamplerBase, texture:TextureBase, index:number);

	_iRemoveSampler(texture:TextureBase, index:number);
}

export = IRenderOwner;