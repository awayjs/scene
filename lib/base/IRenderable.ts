import Matrix						= require("awayjs-core/lib/geom/Matrix");
import IAsset						= require("awayjs-core/lib/library/IAsset");

import IAnimator					= require("awayjs-display/lib/animators/IAnimator");
import Style						= require("awayjs-display/lib/base/Style");
import IPickingCollider				= require("awayjs-display/lib/pick/IPickingCollider");
import PickingCollision				= require("awayjs-display/lib/pick/PickingCollision");

/**
 * IRenderable provides an interface for objects that can use materials.
 *
 * @interface away.base.IRenderable
 */
interface IRenderable extends IAsset
{
	/**
	 * The animation used by the material owner to assemble the vertex code.
	 */
	animator:IAnimator;

	/**
	 *
	 */
	style:Style;

	invalidateSurface();

	/**
	 * //TODO
	 *
	 * @param shortestCollisionDistance
	 * @param findClosest
	 * @returns {boolean}
	 *
	 * @internal
	 */
	_iTestCollision(pickingCollision:PickingCollision, pickingCollider:IPickingCollider):boolean;
}

export = IRenderable;