import { IPartitionTraverser, NodeBase, EntityNode } from '@awayjs/view';
import { DisplayObject } from '../display/DisplayObject';

/**
 * Maintains scenegraph heirarchy when collecting nodes
 */
export class SceneGraphNode extends NodeBase {
	private _numNodes: number = 0;
	private _pChildNodes: Array<EntityNode> = new Array<EntityNode>();
	private _childDepths: Array<number> = new Array<number>();

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

		const depth: number = (this._entity != node.entity) ? (<DisplayObject> node.entity)._depthID : -16384;
		const len: number = this._childDepths.length;
		let index: number = len;

		while (index--)
			if (this._childDepths[index] < depth)
				break;

		index++;

		if (index < len) {
			this._pChildNodes.splice(index, 0, node);
			this._childDepths.splice(index, 0, depth);
		} else {
			this._pChildNodes.push(node);
			this._childDepths.push(depth);
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
		const index: number = this._pChildNodes.indexOf(node);

		this._pChildNodes.splice(index, 1);
		this._childDepths.splice(index, 1);
		this._numNodes--;
	}
}