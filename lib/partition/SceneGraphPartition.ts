import IAbstractionPool				= require("awayjs-core/lib/library/IAbstractionPool");

import DisplayObject				= require("awayjs-display/lib/base/DisplayObject");
import DisplayObjectContainer		= require("awayjs-display/lib/containers/DisplayObjectContainer");
import CollectorBase				= require("awayjs-display/lib/traverse/CollectorBase");
import SceneGraphNode				= require("awayjs-display/lib/partition/SceneGraphNode");
import PartitionBase				= require("awayjs-display/lib/partition/PartitionBase");
import IContainerNode				= require("awayjs-display/lib/partition/IContainerNode");
import DisplayObjectNode			= require("awayjs-display/lib/partition/DisplayObjectNode");

/**
 * @class away.partition.Partition
 */
class SceneGraphPartition extends PartitionBase
{
	private _sceneGraphNodePool:SceneGraphNodePool;

	constructor()
	{
		super();

		this._sceneGraphNodePool = new SceneGraphNodePool();
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
	public findParentForNode(node:DisplayObjectNode):IContainerNode
	{
		if (node._displayObject.partition == this || node._displayObject._iIsRoot) {
			this._rootNode = <SceneGraphNode> node;
			return null;
		}

		if (!node.isSceneGraphNode && node._displayObject.isContainer)
			return this._sceneGraphNodePool.getAbstraction(<DisplayObjectContainer> node._displayObject);

		return this._sceneGraphNodePool.getAbstraction(node._displayObject.parent);
	}

	/**
	 * @internal
	 */
	public _iRegisterEntity(displayObject:DisplayObject)
	{
		super._iRegisterEntity(displayObject);

		if (displayObject.isContainer)
			this.iMarkForUpdate(this._sceneGraphNodePool.getAbstraction(<DisplayObjectContainer> displayObject));
	}

	/**
	 * @internal
	 */
	public _iUnregisterEntity(displayObject:DisplayObject)
	{
		super._iUnregisterEntity(displayObject);

		if (displayObject.isContainer)
			this.iRemoveEntity(this._sceneGraphNodePool.getAbstraction(<DisplayObjectContainer> displayObject));
	}
}

export = SceneGraphPartition;


/**
 * @class away.pool.SceneGraphNodePool
 */
class SceneGraphNodePool implements IAbstractionPool
{
	private _abstractionPool:Object = new Object();

	/**
	 * //TODO
	 *
	 * @param entity
	 * @returns EntityNode
	 */
	public getAbstraction(displayObjectContainer:DisplayObjectContainer):SceneGraphNode
	{
		return (this._abstractionPool[displayObjectContainer.id] || (this._abstractionPool[displayObjectContainer.id] = new SceneGraphNode(displayObjectContainer, this)));
	}

	/**
	 * //TODO
	 *
	 * @param entity
	 */
	public clearAbstraction(displayObjectContainer:DisplayObjectContainer)
	{
		delete this._abstractionPool[displayObjectContainer.id];
	}
}