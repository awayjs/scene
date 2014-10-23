import UVTransform				= require("awayjs-core/lib/geom/UVTransform");
import IAsset					= require("awayjs-core/lib/library/IAsset");

import IAnimator				= require("awayjs-display/lib/animators/IAnimator");
import MaterialBase				= require("awayjs-display/lib/materials/MaterialBase");
import IRenderable				= require("awayjs-display/lib/pool/IRenderable");
import IRenderer				= require("awayjs-display/lib/render/IRenderer");


/**
 * IMaterialOwner provides an interface for objects that can use materials.
 *
 * @interface away.base.IMaterialOwner
 */
interface IMaterialOwner extends IAsset
{
	/**
	 * The animation used by the material owner to assemble the vertex code.
	 */
	animator:IAnimator;

	/**
	 * The material with which to render the object.
	 */
	material:MaterialBase;

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

	/**
	 *
	 * @param renderer
	 * @private
	 */
	_iCollectRenderable(renderer:IRenderer)
}

export = IMaterialOwner;