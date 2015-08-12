import IAssetClass					= require("awayjs-core/lib/library/IAssetClass");

import EntityNode					= require("awayjs-display/lib/partition/EntityNode");
import PartitionBase				= require("awayjs-display/lib/partition/PartitionBase");
import CollectorBase				= require("awayjs-display/lib/traverse/CollectorBase");
import Camera						= require("awayjs-display/lib/entities/Camera");
import EntityNodePool				= require("awayjs-display/lib/pool/EntityNodePool");

/**
 * @class away.partition.CameraNode
 */
class CameraNode extends EntityNode
{
	constructor(pool:EntityNodePool, camera:Camera, partition:PartitionBase)
	{
		super(pool, camera, partition);
	}

	/**
	 * @inheritDoc
	 */
	public acceptTraverser(traverser:CollectorBase)
	{
		// todo: dead end for now, if it has a debug mesh, then sure accept that
	}
}

export = CameraNode;