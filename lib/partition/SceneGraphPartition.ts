import { IPartitionEntity, PartitionBase } from '@awayjs/view';

import { SceneGraphNode } from './SceneGraphNode';

/**
 * @class away.partition.Partition
 */
export class SceneGraphPartition extends PartitionBase
{
	constructor(root:IPartitionEntity, isScene:boolean = false)
	{
		super(root, isScene);

		this._rootNode = new SceneGraphNode(root, this);
	}

	public getPartition(entity:IPartitionEntity):PartitionBase
	{
		//get a new partition for every displayobjectcontainer
		return new SceneGraphPartition(entity);
	}
}