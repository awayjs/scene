import NodeBase						= require("awayjs-display/lib/partition/NodeBase");
import EntityNode					= require("awayjs-display/lib/partition/EntityNode");
import ICollector					= require("awayjs-display/lib/traverse/ICollector");
import IEntity						= require("awayjs-display/lib/entities/IEntity");

/**
 * @class away.partition.PointLightNode
 */
class PointLightNode extends EntityNode
{
	private _pointLight:IEntity;

	/**
	 *
	 * @param pointLight
	 */
	constructor(pointLight:IEntity)
	{
		super(pointLight);

		this._pointLight = pointLight;
	}

	/**
	 * @inheritDoc
	 */
	public acceptTraverser(traverser:ICollector)
	{
		if (traverser.enterNode(<NodeBase> this))
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