import { IPartitionTraverser, NodeBase, EntityNode } from '@awayjs/view';
import { DisplayObject } from '../display/DisplayObject';
import { DisplayObjectContainer } from '../display/DisplayObjectContainer';

/**
 * Maintains scenegraph heirarchy when collecting nodes
 */
export class SceneGraphNode extends NodeBase {
	private _enitityIDsToNodes: NumberMap<EntityNode> = {};
	private _graphicsNode: EntityNode;

	/**
	 *
	 * @param traverser
	 */
	public acceptTraverser(traverser: IPartitionTraverser): void {
		if (this._partition.root == this._entity)
			this._partition.updateEntities();

		//get the sub-traverser for the partition, if different, terminate this traversal
		if (traverser.partition != this._partition && traverser != traverser.getTraverser(this._partition))
			return;

		if (!traverser.enterNode(this))
			return;

		let i: number;
		const len = (<DisplayObjectContainer> this._entity)._children.length;
		for (i = len - 1; i >= 0; i--)
			this._enitityIDsToNodes[(<DisplayObjectContainer> this._entity)._children[i].id].acceptTraverser(traverser);

		if (this._graphicsNode) {
			this._graphicsNode.acceptTraverser(traverser);
		}
	}

	/**
	 *
	 * @param node
	 * @internal
	 */
	public iAddNode(node: EntityNode): void {
		node.parent = this;
		if (this._entity == node.entity) {
			this._graphicsNode = node;
		} else {
			this._enitityIDsToNodes[node.entity.id] = node;
		}
	}

	public isVisible(): boolean {
		return this._entity._iIsVisible();
	}

	/**
	 *
	 * @param node
	 * @internal
	 */
	public iRemoveNode(node: EntityNode): void {
		if (this._graphicsNode == node) {
			this._graphicsNode = null;
		} else {
			delete this._enitityIDsToNodes[node.entity.id];
		}
	}
}