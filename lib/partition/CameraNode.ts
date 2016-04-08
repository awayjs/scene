import EntityNode					from "awayjs-display/lib/partition/EntityNode";
import ITraverser				from "awayjs-display/lib/ITraverser";

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

export default CameraNode;