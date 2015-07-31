import Plane3D						= require("awayjs-core/lib/geom/Plane3D");

import NodeBase						= require("awayjs-display/lib/partition/NodeBase");
import EntityNode					= require("awayjs-display/lib/partition/EntityNode");
import Partition					= require("awayjs-display/lib/partition/Partition");
import CollectorBase				= require("awayjs-display/lib/traverse/CollectorBase");
import Skybox						= require("awayjs-display/lib/entities/Skybox");
import EntityNodePool				= require("awayjs-display/lib/pool/EntityNodePool");

/**
 * SkyboxNode is a space partitioning leaf node that contains a Skybox object.
 *
 * @class away.partition.SkyboxNode
 */
class SkyboxNode extends EntityNode
{
	public static id:string = "skyboxNode";

	private _skyBox:Skybox;

	/**
	 * Creates a new SkyboxNode object.
	 * @param skyBox The Skybox to be contained in the node.
	 */
	constructor(pool:EntityNodePool, skyBox:Skybox, partition:Partition)
	{
		super(pool, skyBox, partition);

		this._skyBox = skyBox;
	}

	/**
	 * @inheritDoc
	 */
	public acceptTraverser(traverser:CollectorBase)
	{
		if (traverser.enterNode(<NodeBase> this))
			traverser.applySkybox(this._skyBox);
	}

	/**
	 *
	 * @param planes
	 * @param numPlanes
	 * @returns {boolean}
	 */
	public isInFrustum(planes:Array<Plane3D>, numPlanes:number):boolean
	{
		if (!this._skyBox._iIsVisible)
			return false;

		//a skybox is always in view unless its visibility is set to false
		return true;
	}
}

export = SkyboxNode;