import IAsset					= require("awayjs-core/lib/library/IAsset");

import IAnimationSet			= require("awayjs-display/lib/animators/IAnimationSet");
import IRender					= require("awayjs-display/lib/pool/IRender");
import IRenderableOwner			= require("awayjs-display/lib/base/IRenderableOwner");
import LightPickerBase			= require("awayjs-display/lib/materials/lightpickers/LightPickerBase");

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

	blendMode:string;

	lightPicker:LightPickerBase;

	animationSet:IAnimationSet;

	iOwners:Array<IRenderableOwner>

	_iAddRender(render:IRender):IRender;

	_iRemoveRender(render:IRender):IRender;
}

export = IRenderOwner;