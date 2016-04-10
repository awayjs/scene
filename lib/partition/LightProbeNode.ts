import EntityNode					from "../partition/EntityNode";
import ITraverser				from "../ITraverser";

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

export default LightProbeNode;