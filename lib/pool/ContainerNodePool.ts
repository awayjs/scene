import DisplayObjectContainer		= require("awayjs-display/lib/containers/DisplayObjectContainer");
import ContainerNode				= require("awayjs-display/lib/partition/ContainerNode");
import PartitionBase				= require("awayjs-display/lib/partition/PartitionBase");

/**
 * @class away.pool.ContainerNodePool
 */
class ContainerNodePool
{
	private static _classPool:Object = new Object();

	private _containerNodePool:Object = new Object();
	private _partition:PartitionBase;

	/**
	 * //TODO
	 *
	 * @param entityNodeClass
	 */
	constructor(partition:PartitionBase)
	{
		this._partition = partition;
	}

	/**
	 * //TODO
	 *
	 * @param entity
	 * @returns EntityNode
	 */
	public getItem(displayObjectContainer:DisplayObjectContainer):ContainerNode
	{
		return (this._containerNodePool[displayObjectContainer.id] || (this._containerNodePool[displayObjectContainer.id] = displayObjectContainer._iAddContainerNode(new ContainerNode(this, displayObjectContainer, this._partition))));
	}

	/**
	 * //TODO
	 *
	 * @param entity
	 */
	public disposeItem(displayObjectContainer:DisplayObjectContainer)
	{
		displayObjectContainer._iRemoveContainerNode(this._containerNodePool[displayObjectContainer.id]);

		delete this._containerNodePool[displayObjectContainer.id];
	}
}

export = ContainerNodePool;