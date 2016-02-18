import Matrix						= require("awayjs-core/lib/geom/Matrix");
import IAsset						= require("awayjs-core/lib/library/IAsset");

import IAnimator					= require("awayjs-display/lib/animators/IAnimator");
import Style						= require("awayjs-display/lib/base/Style");
import IPickingCollider				= require("awayjs-display/lib/pick/IPickingCollider");
import PickingCollisionVO			= require("awayjs-display/lib/pick/PickingCollisionVO");
import DisplayObject = require("awayjs-display/lib/base/DisplayObject");

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
	uvTransform:Matrix;

	/**
	 *
	 */
	style:Style;

	invalidateRenderOwner();


	/**
	 *
	 */
	pickingCollider:IPickingCollider;

	/**
	 * @internal
	 */
	_iPickingCollisionVO:PickingCollisionVO;

	/**
	 * @internal
	 */
	_iIsMouseEnabled():boolean;

	/**
	 * @internal
	 */
	_iAssignedMasks():Array<Array<DisplayObject>>;

	/**
	 * //TODO
	 *
	 * @param shortestCollisionDistance
	 * @param findClosest
	 * @returns {boolean}
	 *
	 * @internal
	 */
	_iTestCollision(shortestCollisionDistance:number):boolean;
}

export = IRenderableOwner;