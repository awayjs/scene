import DisplayObject = require("awayjs-display/lib/base/DisplayObject");

import EntityNode					= require("awayjs-display/lib/partition/EntityNode");
import NodeBase						= require("awayjs-display/lib/partition/NodeBase");
import EntityNodePool				= require("awayjs-display/lib/pool/EntityNodePool");
import CollectorBase				= require("awayjs-display/lib/traverse/CollectorBase");
import IDisplayObjectNode			= require("awayjs-display/lib/partition/IDisplayObjectNode");
import INode						= require("awayjs-display/lib/partition/INode");

/**
 * @class away.partition.Partition
 */
class PartitionBase
{
	public _entityNodePool:EntityNodePool;
	public _rootNode:INode;

	private _updatesMade:Boolean = false;
	private _updateQueue:IDisplayObjectNode;

	constructor()
	{
		this._entityNodePool = new EntityNodePool(this);
	}

	public traverse(traverser:CollectorBase)
	{
		if (this._updatesMade)
			this.updateEntities();

		this._rootNode.acceptTraverser(traverser);
	}

	public iMarkForUpdate(node:IDisplayObjectNode)
	{
		var t:IDisplayObjectNode = this._updateQueue;

		while (t) {
			if (node == t)
				return;

			t = t._iUpdateQueueNext;
		}

		node._iUpdateQueueNext = this._updateQueue;

		this._updateQueue = node;
		this._updatesMade = true;
	}

	public iRemoveEntity(node:IDisplayObjectNode)
	{
		var t:IDisplayObjectNode;

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

	private updateEntities()
	{
		var node:IDisplayObjectNode = this._updateQueue;
		while (node) {
			//required for controllers with autoUpdate set to true and queued events
			node.displayObject._iInternalUpdate();
			node = node._iUpdateQueueNext;
		}

		//reset head
		node = this._updateQueue;
		var targetNode:INode;
		var t:IDisplayObjectNode;
		this._updateQueue = null;
		this._updatesMade = false;

		do {
			targetNode = this._rootNode.findParentForNode(node);

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
			this.iMarkForUpdate(this._entityNodePool.getItem(displayObject));
	}

	/**
	 * @internal
	 */
	public _iUnregisterEntity(displayObject:DisplayObject)
	{
		if (displayObject.isEntity)
			this.iRemoveEntity(this._entityNodePool.disposeItem(displayObject));
	}
}

export = PartitionBase;