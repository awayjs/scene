import Matrix						= require("awayjs-core/lib/geom/Matrix");
import IAsset						= require("awayjs-core/lib/library/IAsset");

import IAnimator					= require("awayjs-display/lib/animators/IAnimator");
import Style						= require("awayjs-display/lib/base/Style");

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

	style:Style;

	invalidateRenderOwner();
}

export = IRenderableOwner;