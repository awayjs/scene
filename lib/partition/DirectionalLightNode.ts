import IAssetClass					= require("awayjs-core/lib/library/IAssetClass");

import EntityNode					= require("awayjs-display/lib/partition/EntityNode");
import PartitionBase				= require("awayjs-display/lib/partition/PartitionBase");
import CollectorBase				= require("awayjs-display/lib/traverse/CollectorBase");
import DirectionalLight				= require("awayjs-display/lib/entities/DirectionalLight");
import EntityNodePool				= require("awayjs-display/lib/pool/EntityNodePool");

/**
 * @class away.partition.DirectionalLightNode
 */
class DirectionalLightNode extends EntityNode
{
	public static assetClass:IAssetClass = DirectionalLight;

	private _directionalLight:DirectionalLight;

	/**
	 *
	 * @param directionalLight
	 */
	constructor(pool:EntityNodePool, directionalLight:DirectionalLight, partition:PartitionBase)
	{
		super(pool, directionalLight, partition);

		this._directionalLight = directionalLight;
	}

	/**
	 * @inheritDoc
	 */
	public acceptTraverser(traverser:CollectorBase)
	{
		if (traverser.enterNode(this))
			traverser.applyDirectionalLight(this._directionalLight);
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