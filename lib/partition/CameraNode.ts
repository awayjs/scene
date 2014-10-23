import EntityNode					= require("awayjs-display/lib/partition/EntityNode");
import ICollector					= require("awayjs-display/lib/traverse/ICollector");
import IEntity						= require("awayjs-display/lib/entities/IEntity");

/**
 * @class away.partition.CameraNode
 */
class CameraNode extends EntityNode
{
	constructor(camera:IEntity)
	{
		super(camera);
	}

	/**
	 * @inheritDoc
	 */
	public acceptTraverser(traverser:ICollector)
	{
		// todo: dead end for now, if it has a debug mesh, then sure accept that
	}
}

export = CameraNode;