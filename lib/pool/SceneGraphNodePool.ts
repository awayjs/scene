import IAbstractionPool				= require("awayjs-core/lib/library/IAbstractionPool");
import DisplayObjectContainer		= require("awayjs-display/lib/containers/DisplayObjectContainer");
import SceneGraphNode				= require("awayjs-display/lib/partition/SceneGraphNode");
import PartitionBase				= require("awayjs-display/lib/partition/PartitionBase");

/**
 * @class away.pool.ContainerNodePool
 */
class ContainerNodePool implements IAbstractionPool
{
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
	public getAbstraction(displayObjectContainer:DisplayObjectContainer):SceneGraphNode
	{
		return (this._containerNodePool[displayObjectContainer.id] || (this._containerNodePool[displayObjectContainer.id] = new SceneGraphNode(displayObjectContainer, this)));
	}

	/**
	 * //TODO
	 *
	 * @param entity
	 */
	public clearAbstraction(displayObjectContainer:DisplayObjectContainer)
	{
		delete this._containerNodePool[displayObjectContainer.id];
	}
}

export = ContainerNodePool;