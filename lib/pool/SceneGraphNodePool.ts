import DisplayObjectContainer		= require("awayjs-display/lib/containers/DisplayObjectContainer");
import SceneGraphNode				= require("awayjs-display/lib/partition/SceneGraphNode");
import Partition					= require("awayjs-display/lib/partition/Partition");
import ISceneGraphNodeClass			= require("awayjs-display/lib/pool/ISceneGraphNodeClass");


/**
 * @class away.pool.SceneGraphNodePool
 */
class SceneGraphNodePool
{
	private _sceneGraphNodePool:Object = new Object();
	private _sceneGraphNodeClass:ISceneGraphNodeClass;
	private _partition:Partition;

	/**
	 * //TODO
	 *
	 * @param sceneGraphNodeClass
	 */
	constructor(sceneGraphNodeClass:ISceneGraphNodeClass, partition:Partition)
	{
		this._sceneGraphNodeClass = sceneGraphNodeClass;
		this._partition = partition;
	}

	/**
	 * //TODO
	 *
	 * @param displayObjectContainer
	 * @returns SceneGraphNode
	 */
	public getItem(displayObjectContainer:DisplayObjectContainer):SceneGraphNode
	{
		return (this._sceneGraphNodePool[displayObjectContainer.id] || (this._sceneGraphNodePool[displayObjectContainer.id] = new this._sceneGraphNodeClass(this, displayObjectContainer, this._partition)));
	}

	/**
	 * //TODO
	 *
	 * @param displayObjectContainer
	 */
	public disposeItem(displayObjectContainer:DisplayObjectContainer):SceneGraphNode
	{
		var sceneGraphNode:SceneGraphNode = this._sceneGraphNodePool[displayObjectContainer.id];

		if (sceneGraphNode)
			this._sceneGraphNodePool[displayObjectContainer.id] = null;

		return sceneGraphNode;
	}
}

export = SceneGraphNodePool;