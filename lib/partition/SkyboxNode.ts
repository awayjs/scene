import Plane3D						from "awayjs-core/lib/geom/Plane3D";

import EntityNode					from "awayjs-display/lib/partition/EntityNode";
import ITraverser				from "awayjs-display/lib/ITraverser";

/**
 * SkyboxNode is a space partitioning leaf node that contains a Skybox object.
 *
 * @class away.partition.SkyboxNode
 */
class SkyboxNode extends EntityNode
{
	/**
	 * @inheritDoc
	 */
	public acceptTraverser(traverser:ITraverser)
	{
		if (traverser.enterNode(this))
			traverser.applySkybox(this._displayObject);
	}

	/**
	 *
	 * @param planes
	 * @param numPlanes
	 * @returns {boolean}
	 */
	public isInFrustum(planes:Array<Plane3D>, numPlanes:number):boolean
	{
		if (!this._displayObject._iIsVisible)
			return false;

		//a skybox is always in view unless its visibility is set to false
		return true;
	}
}

export default SkyboxNode;