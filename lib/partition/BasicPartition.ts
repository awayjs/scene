import DisplayObject from "../display/DisplayObject";

import NodeBase						from "../partition/NodeBase";
import PartitionBase				from "../partition/PartitionBase";


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