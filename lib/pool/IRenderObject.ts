/**
 * IRenderPass provides an abstract base class for material shader passes. A material pass constitutes at least
 * a render call per required renderable.
 */
interface IRenderObject
{
	/**
	 *
	 */
	dispose();

	/**
	 *
	 */
	invalidateRenderObject();

	/**
	 *
	 */
	invalidateProperties();

	/**
	 *
	 */
	invalidateAnimation();
}

export = IRenderObject;