import EntityNode					from "../partition/EntityNode";
import ITraverser				from "../ITraverser";

/**
 * @class away.partition.DirectionalLightNode
 */
class DirectionalLightNode extends EntityNode
{
	/**
	 * @inheritDoc
	 */
	public acceptTraverser(traverser:ITraverser)
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

export default DirectionalLightNode;