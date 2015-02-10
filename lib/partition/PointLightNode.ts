import NodeBase						= require("awayjs-display/lib/partition/NodeBase");
import EntityNode					= require("awayjs-display/lib/partition/EntityNode");
import Partition					= require("awayjs-display/lib/partition/Partition");
import CollectorBase				= require("awayjs-display/lib/traverse/CollectorBase");
import IEntity						= require("awayjs-display/lib/entities/IEntity");
import EntityNodePool				= require("awayjs-display/lib/pool/EntityNodePool");

/**
 * @class away.partition.PointLightNode
 */
class PointLightNode extends EntityNode
{
	public static id:string = "pointLightNode";

	private _pointLight:IEntity;

	/**
	 *
	 * @param pointLight
	 */
	constructor(pool:EntityNodePool, pointLight:IEntity, partition:Partition)
	{
		super(pool, pointLight, partition);

		this._pointLight = pointLight;
	}

	/**
	 * @inheritDoc
	 */
	public acceptTraverser(traverser:CollectorBase)
	{
		if (traverser.enterNode(this))
			traverser.applyPointLight(this._pointLight);
	}

	/**
	 *
	 * @returns {boolean}
	 */
	public isCastingShadow():boolean
	{
		return false;
	}
}

export = PointLightNode;