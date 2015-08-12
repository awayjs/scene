import DisplayObject				= require("awayjs-display/lib/base/DisplayObject");
import DisplayObjectContainer		= require("awayjs-display/lib/containers/DisplayObjectContainer");

import CollectorBase				= require("awayjs-display/lib/traverse/CollectorBase");
import ContainerNode				= require("awayjs-display/lib/partition/ContainerNode");
import PartitionBase				= require("awayjs-display/lib/partition/PartitionBase");
import ContainerNodePool			= require("awayjs-display/lib/pool/ContainerNodePool");

/**
 * @class away.partition.Partition
 */
class SceneGraphPartition extends PartitionBase
{
	public _containerNodePool:ContainerNodePool;

	constructor(rootContainer:DisplayObjectContainer)
	{
		super();

		this._containerNodePool = new ContainerNodePool(this);

		this._rootNode = this._containerNodePool.getItem(rootContainer);
	}

	public traverse(traverser:CollectorBase)
	{
		super.traverse(traverser);
	}

	/**
	 * @internal
	 */
	public _iRegisterEntity(displayObject:DisplayObject)
	{
		super._iRegisterEntity(displayObject);

		if (displayObject.isContainer)
			this.iMarkForUpdate(this._containerNodePool.getItem(<DisplayObjectContainer> displayObject));
	}

	/**
	 * @internal
	 */
	public _iUnregisterEntity(displayObject:DisplayObject)
	{
		super._iUnregisterEntity(displayObject);

		if (displayObject.isContainer)
			this.iRemoveEntity(this._containerNodePool.disposeItem(<DisplayObjectContainer> displayObject));
	}
}

export = SceneGraphPartition;