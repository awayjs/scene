import EntityNode					= require("awayjs-display/lib/partition/EntityNode");
import CollectorBase				= require("awayjs-display/lib/traverse/CollectorBase");

/**
 * @class away.partition.CameraNode
 */
class CameraNode extends EntityNode
{
	/**
	 * @inheritDoc
	 */
	public acceptTraverser(traverser:CollectorBase)
	{
		// todo: dead end for now, if it has a debug mesh, then sure accept that
	}
}

export = CameraNode;