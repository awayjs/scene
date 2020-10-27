import { IPartitionTraverser, NodeBase, EntityNode } from '@awayjs/view';
import { DisplayObject } from '../display/DisplayObject';

/**
 * Maintains scenegraph heirarchy when collecting nodes
 */
export class SceneGraphNode extends NodeBase {
	private _numNodes: number = 0;
	private _pChildNodes: Array<EntityNode> = new Array<EntityNode>();

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
		for (i = this._numNodes - 1; i >= 0; i--)
			this._pChildNodes[i].acceptTraverser(traverser);
	}

	/**
	 *
	 * @param node
	 * @internal
	 */
	public iAddNode(node: EntityNode): void {
		node.parent = this;

		let index = -1;
		if (this._entity == node.entity) {
			// this is the node for the graphics object of a Sprite / MC, not a child
			// always have it at first index
			index = 0;
		} else {
			// get child index
			index = (<DisplayObject> node.entity).parent.getChildIndex(<DisplayObject> node.entity);
		}

		if (this._pChildNodes.length > 0 && this._pChildNodes[0].entity == this.entity) {
			// if first child-node was added for this.entity, we must increment index by 1
			index++;
		}

		if (index == -1) {
			console.warn('[SceneGraphNode] - iAddNode - index should never be -1');
		} else if (index > this._pChildNodes.length) {
			this._pChildNodes.push(node);
		} else {
			this._pChildNodes.splice(index, 0, node);
		}
		this._numNodes++;
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
		this._pChildNodes.splice(this._pChildNodes.indexOf(node), 1);
		this._numNodes--;
	}
}