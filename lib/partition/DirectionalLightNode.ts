import EntityNode					from "awayjs-display/lib/partition/EntityNode";
import ITraverser				from "awayjs-display/lib/ITraverser";

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