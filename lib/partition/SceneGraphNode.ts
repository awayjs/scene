import CollectorBase				= require("awayjs-display/lib/traverse/CollectorBase");
import DisplayObjectNode			= require("awayjs-display/lib/partition/DisplayObjectNode");
import EntityNode					= require("awayjs-display/lib/partition/EntityNode");
import IContainerNode				= require("awayjs-display/lib/partition/IContainerNode");

/**
 * Maintains scenegraph heirarchy when collecting nodes
 */
class SceneGraphNode extends DisplayObjectNode implements IContainerNode
{
	public isSceneGraphNode:boolean = true;

	private _pChildNodes:Array<DisplayObjectNode> = new Array<DisplayObjectNode>();
	private _childDepths:Array<number> = new Array<number>();
	private _childMasks:Array<DisplayObjectNode> = new Array<DisplayObjectNode>();
	private _numChildMasks:number = 0;
	private _pNumChildNodes:number = 0;

	public _iCollectionMark:number;// = 0;

	public _pEntityNode:EntityNode;

	/**
	 *
	 * @param traverser
	 */
	public acceptTraverser(traverser:CollectorBase)
	{
		//containers nodes are for ordering only, no need to check enterNode or debugVisible
		if (this.numEntities == 0)
			return;

		if (this._pEntityNode)
			this._pEntityNode.acceptTraverser(traverser);

		var i:number;
		for (i = 0; i < this._numChildMasks; i++)
			this._childMasks[i].acceptTraverser(traverser);

		for (i = 0; i < this._pNumChildNodes; i++)
			this._pChildNodes[i].acceptTraverser(traverser);
	}

	/**
	 *
	 * @param node
	 * @internal
	 */
	public iAddNode(node:DisplayObjectNode)
	{
		node.parent = this;

		if (!node.isSceneGraphNode) {
			this._pEntityNode = <EntityNode> node;
		} else if (node._displayObject.maskMode) {
			this._childMasks.push(node);
			this._numChildMasks = this._childMasks.length;
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
			this._pNumChildNodes = this._childDepths.length;
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
		if (!node.isSceneGraphNode) {
			this._pEntityNode = null;
		} else if (node._displayObject.maskMode) {
			this._childMasks.splice(this._childMasks.indexOf(node), 1);
			this._numChildMasks = this._childMasks.length;
		} else {
			var index:number = this._pChildNodes.indexOf(node);

			this._pChildNodes.splice(index, 1);
			this._childDepths.splice(index, 1);

			this._pNumChildNodes = this._childDepths.length;
		}

		var numEntities:number = node.numEntities;
		node = this;

		do {
			node.numEntities -= numEntities;
		} while ((node = <DisplayObjectNode> node.parent) != null);
	}
}
export = SceneGraphNode;