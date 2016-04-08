import Matrix						from "awayjs-core/lib/geom/Matrix";
import IAsset						from "awayjs-core/lib/library/IAsset";

import IAnimator					from "awayjs-display/lib/animators/IAnimator";
import Style						from "awayjs-display/lib/base/Style";
import IPickingCollider				from "awayjs-display/lib/pick/IPickingCollider";
import PickingCollision				from "awayjs-display/lib/pick/PickingCollision";

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

export default IRenderable;