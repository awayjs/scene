import ITraverser				from "../ITraverser";
import DisplayObjectNode			from "../partition/DisplayObjectNode";
import EntityNode					from "../partition/EntityNode";
import IContainerNode				from "../partition/IContainerNode";

/**
 * Maintains scenegraph heirarchy when collecting nodes
 */
class SceneGraphNode extends DisplayObjectNode implements IContainerNode
{
	public isSceneGraphNode:boolean = true;

	private _pChildNodes:Array<DisplayObjectNode> = new Array<DisplayObjectNode>();
	private _childDepths:Array<number> = new Array<number>();
	private _childMasks:Array<DisplayObjectNode> = new Array<DisplayObjectNode>();

	public _iCollectionMark:number;// = 0;

	/**
	 *
	 * @param traverser
	 */
	public acceptTraverser(traverser:ITraverser)
	{
		//containers nodes are for ordering only, no need to check enterNode or debugVisible
		if (this.numEntities == 0)
			return;

		var i:number;
		for (i = this._pChildNodes.length - 1; i >= 0; i--)
			this._pChildNodes[i].acceptTraverser(traverser);

		for (i = this._childMasks.length - 1; i >= 0; i--)
			this._childMasks[i].acceptTraverser(traverser);
	}

	/**
	 *
	 * @param node
	 * @internal
	 */
	public iAddNode(node:DisplayObjectNode)
	{
		node.parent = this;

		if (node._displayObject.maskMode) {
			this._childMasks.push(node);
		} else {
			var depth:number = node._displayObject._depthID;
			var len:number = this._childDepths.length;
			var index:number = len;

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
		}

		var numEntities:number = node.isSceneGraphNode? (<SceneGraphNode> node).numEntities : 1;
		node = this;

		do {
			node.numEntities += numEntities;
		} while ((node = node.parent) != null);
	}

	/**
	 *
	 * @param node
	 * @internal
	 */
	public iRemoveNode(node:DisplayObjectNode)
	{
		if (node._displayObject.maskMode) {
			this._childMasks.splice(this._childMasks.indexOf(node), 1);
		} else {
			var index:number = this._pChildNodes.indexOf(node);

			this._pChildNodes.splice(index, 1);
			this._childDepths.splice(index, 1);
		}

		var numEntities:number = node.numEntities;
		node = this;

		do {
			node.numEntities -= numEntities;
		} while ((node = <DisplayObjectNode> node.parent) != null);
	}
}
export default SceneGraphNode;