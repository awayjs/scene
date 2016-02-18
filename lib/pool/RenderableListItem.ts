import IRenderableOwner				= require("awayjs-display/lib/base/IRenderableOwner");

/**
 * @class away.pool.RenderableListItem
 */
class RenderableListItem
{
	/**
	 *
	 */
	public renderable:IRenderableOwner;

	/**
	 *
	 */
	public next:RenderableListItem;
}

export = RenderableListItem;