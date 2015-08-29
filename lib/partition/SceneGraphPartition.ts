import DisplayObject				= require("awayjs-display/lib/base/DisplayObject");
import DisplayObjectContainer		= require("awayjs-display/lib/containers/DisplayObjectContainer");

import CollectorBase				= require("awayjs-display/lib/traverse/CollectorBase");
import ContainerNode				= require("awayjs-display/lib/partition/ContainerNode");
import PartitionBase				= require("awayjs-display/lib/partition/PartitionBase");
import ContainerNodePool			= require("awayjs-display/lib/pool/ContainerNodePool");
import INode			= require("awayjs-display/lib/partition/INode");
import IDisplayObjectNode			= require("awayjs-display/lib/partition/IDisplayObjectNode");

/**
 * @class away.partition.Partition
 */
class SceneGraphPartition extends PartitionBase
{
	public _containerNodePool:ContainerNodePool;

	constructor()
	{
		super();

		this._containerNodePool = new ContainerNodePool(this);
	}

	public traverse(traverser:CollectorBase)
	{
		super.traverse(traverser);
	}


	/**
	 *
	 * @param entity
	 * @returns {away.partition.NodeBase}
	 */
	public findParentForNode(node:IDisplayObjectNode):INode
	{
		if (node.displayObject.partition == this || node.displayObject._iIsRoot) {
			this._rootNode = node;
			return null;
		}

		if (!node.isContainerNode && node.displayObject.isContainer)
			return this._containerNodePool.getItem(<DisplayObjectContainer> node.displayObject);

		return this._containerNodePool.getItem(node.displayObject.parent);
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
			this.iRemoveEntity(this._containerNodePool.getItem(<DisplayObjectContainer> displayObject));
	}
}

export = SceneGraphPartition;