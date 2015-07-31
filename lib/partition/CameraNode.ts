import EntityNode					= require("awayjs-display/lib/partition/EntityNode");
import Partition					= require("awayjs-display/lib/partition/Partition");
import CollectorBase				= require("awayjs-display/lib/traverse/CollectorBase");
import Camera						= require("awayjs-display/lib/entities/Camera");
import EntityNodePool				= require("awayjs-display/lib/pool/EntityNodePool");

/**
 * @class away.partition.CameraNode
 */
class CameraNode extends EntityNode
{
	public static id:string = "cameraNode";

	constructor(pool:EntityNodePool, camera:Camera, partition:Partition)
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