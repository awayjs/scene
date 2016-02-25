import IRenderable					= require("awayjs-display/lib/base/IRenderable");

/**
 * @class away.pool.RenderableListItem
 */
class RenderableListItem
{
	/**
	 *
	 */
	public renderable:IRenderable;

	/**
	 *
	 */
	public next:RenderableListItem;
}

export = RenderableListItem;