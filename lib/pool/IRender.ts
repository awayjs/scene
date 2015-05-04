import IEventDispatcher				= require("awayjs-core/lib/events/IEventDispatcher");

/**
 * IRender provides an abstract base class for material shader passes. A material pass constitutes at least
 * a render call per required renderable.
 */
interface IRender extends IEventDispatcher
{
	/**
	 *
	 */
	dispose();

	/**
	 *
	 */
	invalidateRender();

	/**
	 *
	 */
	invalidatePasses();

	/**
	 *
	 */
	invalidateAnimation();
}

export = IRender;