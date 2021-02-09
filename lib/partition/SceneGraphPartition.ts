import { IAbstractionClass } from '@awayjs/core';
import { IPartitionEntity, PartitionBase, PartitionPool } from '@awayjs/view';

import { SceneGraphNode } from './SceneGraphNode';

/**
 * @class away.partition.Partition
 */
export class SceneGraphPartition extends PartitionBase {
	
	protected _getRootNode(): SceneGraphNode {
		return new SceneGraphNode(<IPartitionEntity> this._asset, this);
	}
}