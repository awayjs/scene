import CollectorBase = require("awayjs-display/lib/traverse/CollectorBase");
import DisplayObject = require("awayjs-display/lib/base/DisplayObject");
import IEntity = require("awayjs-display/lib/entities/IEntity");
import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
import Partition					= require("awayjs-display/lib/partition/Partition");
import NodeBase = require("awayjs-display/lib/partition/NodeBase");
import EntityNode = require("awayjs-display/lib/partition/EntityNode");
import SceneGraphNodePool = require("awayjs-display/lib/pool/SceneGraphNodePool");


/**
 * Maintains scenegraph heirarchy when collecting nodes
 */
class SceneGraphNode extends NodeBase
{
    private _container : DisplayObjectContainer;
    private _pool : SceneGraphNodePool;
    private _partition:Partition;

    constructor(pool:SceneGraphNodePool, container:DisplayObjectContainer, partition:Partition)
    {
        super();
        this._pool = pool;
        this._container = container;
        this._partition = partition;
    }

	//
    ///**
    // *
    // * @param entity
    // * @returns {away.partition.NodeBase}
    // */
    //public findPartitionForEntity(entity:IEntity):NodeBase
    //{
    //    var sceneGraphNode:SceneGraphNode = this._pool.getItem(entity.parent);
    //    if (sceneGraphNode != this)
    //        this.findNodeForContainer();
    //
    //
    //        return sceneGraphNode;
    //    }
    //    return this;
    //}
	//
    //public iAddNode(node:NodeBase)
    //{
    //    super.iAddNode(node);
	//
    //    //recalc depth array
    //    var entityNode = <EntityNode>(node);
    //    entityNode._sceneGraphDepths.length = 0;
	//
    //    var parent:DisplayObjectContainer;
    //    var child:DisplayObject = entityNode.entity;
    //    while ((parent = child.parent)) {
    //        entityNode._sceneGraphDepths.push(parent.getChildDepth(child));
    //        child = parent;
    //    }
    //}
}
export = SceneGraphNode;