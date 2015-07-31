import DisplayObjectContainer		= require("awayjs-display/lib/containers/DisplayObjectContainer");
import SceneGraphNode				= require("awayjs-display/lib/partition/SceneGraphNode");
import Partition					= require("awayjs-display/lib/partition/Partition");
import SceneGraphNodePool			= require("awayjs-display/lib/pool/SceneGraphNodePool");

/**
 * ISceneGraphNodeClass is an interface for the constructable class definition EntityNode that is used to
 * create node objects in the partition pipeline that represent the contents of a Entity
 *
 * @class away.pool.ISceneGraphNodeClass
 */
interface ISceneGraphNodeClass
{
	/**
	 *
	 */
	new(pool:SceneGraphNodePool, container:DisplayObjectContainer, partition:Partition):SceneGraphNode;
}

export = ISceneGraphNodeClass;