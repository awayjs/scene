import EntityNode					= require("awayjs-display/lib/partition/EntityNode");
import ICollector					= require("awayjs-display/lib/traverse/ICollector");
import IEntity						= require("awayjs-display/lib/entities/IEntity");

/**
 * @class away.partition.DirectionalLightNode
 */
class DirectionalLightNode extends EntityNode
{
	private _directionalLight:IEntity;

	/**
	 *
	 * @param directionalLight
	 */
	constructor(directionalLight:IEntity)
	{
		super(directionalLight);

		this._directionalLight = directionalLight;
	}

	/**
	 * @inheritDoc
	 */
	public acceptTraverser(traverser:ICollector)
	{
		if (traverser.enterNode(this))
			traverser.applyDirectionalLight(this._directionalLight);
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

export = DirectionalLightNode;