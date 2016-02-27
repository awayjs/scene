import EntityNode					= require("awayjs-display/lib/partition/EntityNode");
import ITraverser				= require("awayjs-display/lib/ITraverser");

/**
 * @class away.partition.CameraNode
 */
class CameraNode extends EntityNode
{
	/**
	 * @inheritDoc
	 */
	public acceptTraverser(traverser:ITraverser)
	{
		// todo: dead end for now, if it has a debug sprite, then sure accept that
	}
}

export = CameraNode;