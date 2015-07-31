import EntityNode					= require("awayjs-display/lib/partition/EntityNode");
import Partition					= require("awayjs-display/lib/partition/Partition");
import CollectorBase				= require("awayjs-display/lib/traverse/CollectorBase");
import LightProbe					= require("awayjs-display/lib/entities/LightProbe");
import EntityNodePool				= require("awayjs-display/lib/pool/EntityNodePool");

/**
 * @class away.partition.LightProbeNode
 */
class LightProbeNode extends EntityNode
{
	public static id:string = "lightProbeNode";

	private _lightProbe:LightProbe;

	/**
	 *
	 * @param lightProbe
	 */
	constructor(pool:EntityNodePool, lightProbe:LightProbe, partition:Partition)
	{
		super(pool, lightProbe, partition);

		this._lightProbe = lightProbe;
	}

	/**
	 * @inheritDoc
	 */
	public acceptTraverser(traverser:CollectorBase)
	{
		if (traverser.enterNode(this))
			traverser.applyLightProbe(this._lightProbe);
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