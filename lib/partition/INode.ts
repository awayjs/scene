import DisplayObject				= require("awayjs-display/lib/base/DisplayObject");
import CollectorBase				= require("awayjs-display/lib/traverse/CollectorBase");

/**
 * IDisplayObjectNode is an interface for the constructable class definition EntityNode that is used to
 * create node objects in the partition pipeline that represent the contents of a Entity
 *
 * @class away.pool.IDisplayObjectNode
 */
interface INode
{
	parent:INode;

	numEntities:number;

	debugChildrenVisible:boolean;

	_iUpdateImplicitDebugVisible(value:boolean);


	acceptTraverser(traverser:CollectorBase);

	iAddNode(node:INode);

	iRemoveNode(node:INode);

	findParentForNode(node:INode):INode;
}

export = INode;