import DisplayObject from "awayjs-display/lib/display/DisplayObject";

import NodeBase						from "awayjs-display/lib/partition/NodeBase";
import PartitionBase				from "awayjs-display/lib/partition/PartitionBase";


/**
 * @class away.partition.Partition
 */
class BasicPartition extends PartitionBase
{
	constructor()
	{
		super();

		this._rootNode = new NodeBase();
	}
}

export default BasicPartition;