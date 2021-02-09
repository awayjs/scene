import { IPartitionTraverser, NodeBase, EntityNode } from '@awayjs/view';
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
		if (this.partition.rootNode == this)
			this.partition.updateEntities();

		//get the sub-traverser for the partition, if different, terminate this traversal
		if (traverser.partition != this.partition && traverser != traverser.getTraverser(this.partition))
			return;

		if (!traverser.enterNode(this))
			return;

		let i: number;
		const len = (<DisplayObjectContainer> this.entity)._children.length;
		for (i = len - 1; i >= 0; i--)
			this._enitityIDsToNodes[(<DisplayObjectContainer> this.entity)._children[i].id].acceptTraverser(traverser);

		if (this._graphicsNode) {
			this._graphicsNode.acceptTraverser(traverser);
		}
	}

	/**
	 *
	 * @param node
	 * @internal
	 */
	public addNode(node: EntityNode): void {
		node.parent = this;
		if (this.entity == node.entity) {
			this._graphicsNode = node;
		} else {
			this._enitityIDsToNodes[node.entity.id] = node;
		}
	}

	/**
	 *
	 * @param node
	 * @internal
	 */
	public removeNode(node: EntityNode): void {
		node.parent = null;

		if (this._graphicsNode == node) {
			this._graphicsNode = null;
		} else {
			delete this._enitityIDsToNodes[node.entity.id];
		}
	}
}