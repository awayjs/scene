import EntityNode					= require("awayjs-display/lib/partition/EntityNode");
import CollectorBase				= require("awayjs-display/lib/traverse/CollectorBase");

/**
 * @class away.partition.DirectionalLightNode
 */
class DirectionalLightNode extends EntityNode
{
	/**
	 * @inheritDoc
	 */
	public acceptTraverser(traverser:CollectorBase)
	{
		if (traverser.enterNode(this))
			traverser.applyDirectionalLight(this._displayObject);
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