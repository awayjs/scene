import IRenderable					= require("awayjs-display/lib/pool/IRenderable");
import IEntitySorter				= require("awayjs-display/lib/sort/IEntitySorter");

/**
 * @class away.sort.NullSort
 */
class RenderableNullSort implements IEntitySorter
{
	public sortBlendedRenderables(head:IRenderable):IRenderable
	{
		return head;
	}

	public sortOpaqueRenderables(head:IRenderable):IRenderable
	{
		return head;
	}
}

export = RenderableNullSort;