import IAsset					= require("awayjs-core/lib/library/IAsset");

import IAnimationSet			= require("awayjs-display/lib/animators/IAnimationSet");
import ElementsBase				= require("awayjs-display/lib/graphics/ElementsBase");
import IEntity					= require("awayjs-display/lib/display/IEntity");

/**
 * Provides an interface for animator classes that control animation output from a data set subtype of <code>AnimationSetBase</code>.
 *
 * @see away.animators.IAnimationSet
 */
interface IAnimator extends IAsset
{
	/**
	 *
	 */
	animationSet:IAnimationSet;

	/**
	 *
	 */
	clone():IAnimator;

	/**
	 *
	 */
	dispose();

	/**
	 * Used by the entity object to which the animator is applied, registers the owner for internal use.
	 *
	 * @private
	 */
	addOwner(sprite:IEntity);

	/**
	 * Used by the sprite object from which the animator is removed, unregisters the owner for internal use.
	 *
	 * @private
	 */
	removeOwner(sprite:IEntity);
}

export = IAnimator;