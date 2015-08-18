import UVTransform				= require("awayjs-core/lib/geom/UVTransform");
import ColorTransform				= require("awayjs-core/lib/geom/ColorTransform");
import IAsset					= require("awayjs-core/lib/library/IAsset");

import IRenderer				= require("awayjs-display/lib/IRenderer");
import IAnimator				= require("awayjs-display/lib/animators/IAnimator");
import MaterialBase				= require("awayjs-display/lib/materials/MaterialBase");
import IRenderable				= require("awayjs-display/lib/pool/IRenderable");


/**
 * IRenderableOwner provides an interface for objects that can use materials.
 *
 * @interface away.base.IRenderableOwner
 */
interface IRenderableOwner extends IAsset
{
	/**
	 * The animation used by the material owner to assemble the vertex code.
	 */
	animator:IAnimator;

	/**
	 *
	 */
	uvTransform:UVTransform;

	/**
	 *
	 * @param renderable
	 * @private
	 */
	_iAddRenderable(renderable:IRenderable):IRenderable;


	/**
	 *
	 * @param renderable
	 * @private
	 */
	_iRemoveRenderable(renderable:IRenderable):IRenderable;
}

export = IRenderableOwner;