import IAsset					= require("awayjs-core/lib/library/IAsset");

import IAnimationSet			= require("awayjs-display/lib/animators/IAnimationSet");
import IRenderObject			= require("awayjs-display/lib/pool/IRenderObject");
import IRenderablePool			= require("awayjs-display/lib/pool/IRenderablePool");
import IRenderableOwner			= require("awayjs-display/lib/base/IRenderableOwner");
import LightPickerBase			= require("awayjs-display/lib/materials/lightpickers/LightPickerBase");

/**
 * IRenderObjectOwner provides an interface for objects that can use materials.
 *
 * @interface away.base.IRenderObjectOwner
 */
interface IRenderObjectOwner extends IAsset
{
	alphaThreshold:number;

	mipmap:boolean;

	smooth:boolean;

	blendMode:string;

	lightPicker:LightPickerBase;

	animationSet:IAnimationSet;

	iOwners:Array<IRenderableOwner>

	_iAddRenderObject(renderObject:IRenderObject):IRenderObject;

	_iRemoveRenderObject(renderObject:IRenderObject):IRenderObject;

	/**
	 *
	 * @param renderer
	 *
	 * @internal
	 */
	getRenderObject(renderablePool:IRenderablePool):IRenderObject;
}

export = IRenderObjectOwner;