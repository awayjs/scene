import EntityNode					from "awayjs-display/lib/partition/EntityNode";
import ITraverser				from "awayjs-display/lib/ITraverser";

/**
 * @class away.partition.PointLightNode
 */
class PointLightNode extends EntityNode
{
	/**
	 * @inheritDoc
	 */
	public acceptTraverser(traverser:ITraverser)
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

export default PointLightNode;