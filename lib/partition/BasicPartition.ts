import DisplayObject = require("awayjs-display/lib/base/DisplayObject");

import NodeBase						= require("awayjs-display/lib/partition/NodeBase");
import PartitionBase				= require("awayjs-display/lib/partition/PartitionBase");


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

export = BasicPartition;