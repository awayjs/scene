import EntityNode					= require("awayjs-display/lib/partition/EntityNode");
import CollectorBase				= require("awayjs-display/lib/traverse/CollectorBase");

/**
 * @class away.partition.PointLightNode
 */
class PointLightNode extends EntityNode
{
	/**
	 * @inheritDoc
	 */
	public acceptTraverser(traverser:CollectorBase)
	{
		if (traverser.enterNode(this))
			traverser.applyPointLight(this._displayObject);
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