import EntityNode					= require("awayjs-display/lib/partition/EntityNode");
import ITraverser				= require("awayjs-display/lib/ITraverser");

/**
 * @class away.partition.LightProbeNode
 */
class LightProbeNode extends EntityNode
{
	/**
	 * @inheritDoc
	 */
	public acceptTraverser(traverser:ITraverser)
	{
		if (traverser.enterNode(this))
			traverser.applyLightProbe(this._displayObject);
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

export = LightProbeNode;