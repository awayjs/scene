import IAbstractionPool				= require("awayjs-core/lib/library/IAbstractionPool");
import IAssetClass					= require("awayjs-core/lib/library/IAssetClass");

import ITraverser					= require("awayjs-display/lib/ITraverser");
import DisplayObject				= require("awayjs-display/lib/display/DisplayObject");
import EntityNode					= require("awayjs-display/lib/partition/EntityNode");
import NodeBase						= require("awayjs-display/lib/partition/NodeBase");
import IEntityNodeClass				= require("awayjs-display/lib/partition/IEntityNodeClass");
import DisplayObjectNode			= require("awayjs-display/lib/partition/DisplayObjectNode");
import IContainerNode				= require("awayjs-display/lib/partition/IContainerNode");

/**
 * @class away.partition.Partition
 */
class PartitionBase implements IAbstractionPool
{
	private static _abstractionClassPool:Object = new Object();

	private _abstractionPool:Object = new Object();

	public _rootNode:IContainerNode;

	private _updatesMade:Boolean = false;
	private _updateQueue:DisplayObjectNode;

	constructor()
	{
	}

	public getAbstraction(displayObject:DisplayObject):EntityNode
	{
		return (this._abstractionPool[displayObject.id] || (this._abstractionPool[displayObject.id] = new (<IEntityNodeClass> PartitionBase._abstractionClassPool[displayObject.assetType])(displayObject, this)));
	}

	/**
	 *
	 * @param image
	 */
	public clearAbstraction(displayObject:DisplayObject)
	{
		this._abstractionPool[displayObject.id] = null;
	}

	public traverse(traverser:ITraverser)
	{
		if (this._updatesMade)
			this.updateEntities();

		this._rootNode.acceptTraverser(traverser);
	}

	public iMarkForUpdate(node:DisplayObjectNode)
	{
		var t:DisplayObjectNode = this._updateQueue;

		while (t) {
			if (node == t)
				return;

			t = t._iUpdateQueueNext;
		}

		node._iUpdateQueueNext = this._updateQueue;

		this._updateQueue = node;
		this._updatesMade = true;
	}

	public iRemoveEntity(node:DisplayObjectNode)
	{
		var t:DisplayObjectNode;

		if (node.parent) {
			node.parent.iRemoveNode(node);
			node.parent = null;
		}


		if (node == this._updateQueue) {
			this._updateQueue = node._iUpdateQueueNext;
		} else {
			t = this._updateQueue;
			while (t && t._iUpdateQueueNext != node)
				t = t._iUpdateQueueNext;

			if (t)
				t._iUpdateQueueNext = node._iUpdateQueueNext;
		}

		node._iUpdateQueueNext = null;

		if (!this._updateQueue)
			this._updatesMade = false;
	}

	/**
	 *
	 * @param entity
	 * @returns {away.partition.NodeBase}
	 */
	public findParentForNode(node:DisplayObjectNode):IContainerNode
	{
		return this._rootNode;
	}

	private updateEntities()
	{
		var node:DisplayObjectNode = this._updateQueue;
		while (node) {
			//required for controllers with autoUpdate set to true and queued events
			node._displayObject._iInternalUpdate();
			node = node._iUpdateQueueNext;
		}

		//reset head
		node = this._updateQueue;
		var targetNode:IContainerNode;
		var t:DisplayObjectNode;
		this._updateQueue = null;
		this._updatesMade = false;

		do {
			targetNode = this.findParentForNode(node);

			if (node.parent != targetNode) {
				if (node.parent)
					node.parent.iRemoveNode(node);
				targetNode.iAddNode(node);
			}

			t = node._iUpdateQueueNext;
			node._iUpdateQueueNext = null;

		} while ((node = t) != null);
	}

	/**
	 * @internal
	 */
	public _iRegisterEntity(displayObject:DisplayObject)
	{
		if (displayObject.isEntity)
			this.iMarkForUpdate(this.getAbstraction(displayObject));
	}

	/**
	 * @internal
	 */
	public _iUnregisterEntity(displayObject:DisplayObject)
	{
		if (displayObject.isEntity)
			this.iRemoveEntity(this.getAbstraction(displayObject));
	}

	/**
	 *
	 * @param imageObjectClass
	 */
	public static registerAbstraction(entityNodeClass:IEntityNodeClass, assetClass:IAssetClass)
	{
		PartitionBase._abstractionClassPool[assetClass.assetType] = entityNodeClass;
	}
}

export = PartitionBase;