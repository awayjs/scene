import IAssetClass					= require("awayjs-core/lib/library/IAssetClass");

import DisplayObjectContainer		= require("awayjs-display/lib/containers/DisplayObjectContainer");
import DisplayObject				= require("awayjs-display/lib/base/DisplayObject");
import Camera						= require("awayjs-display/lib/entities/Camera");
import DirectionalLight				= require("awayjs-display/lib/entities/DirectionalLight");
import Mesh							= require("awayjs-display/lib/entities/Mesh");
import MovieClip					= require("awayjs-display/lib/entities/MovieClip");
import Billboard					= require("awayjs-display/lib/entities/Billboard");
import LineSegment					= require("awayjs-display/lib/entities/LineSegment");
import TextField					= require("awayjs-display/lib/entities/TextField");
import PointLight					= require("awayjs-display/lib/entities/PointLight");
import LightProbe					= require("awayjs-display/lib/entities/LightProbe");
import Skybox						= require("awayjs-display/lib/entities/Skybox");
import CameraNode					= require("awayjs-display/lib/partition/CameraNode");
import ContainerNode				= require("awayjs-display/lib/partition/ContainerNode");
import DirectionalLightNode			= require("awayjs-display/lib/partition/DirectionalLightNode");
import EntityNode					= require("awayjs-display/lib/partition/EntityNode");
import LightProbeNode				= require("awayjs-display/lib/partition/LightProbeNode");
import PointLightNode				= require("awayjs-display/lib/partition/PointLightNode");
import SkyboxNode					= require("awayjs-display/lib/partition/SkyboxNode");
import PartitionBase				= require("awayjs-display/lib/partition/PartitionBase");
import IEntityNodeClass				= require("awayjs-display/lib/pool/IEntityNodeClass");

/**
 * @class away.pool.EntityNodePool
 */
class EntityNodePool
{
	private static _classPool:Object = new Object();

	private _entityNodePool:Object = new Object();
	private _partition:PartitionBase;

	/**
	 * //TODO
	 *
	 * @param entityNodeClass
	 */
	constructor(partition:PartitionBase)
	{
		this._partition = partition;
	}

	/**
	 * //TODO
	 *
	 * @param entity
	 * @returns EntityNode
	 */
	public getItem(displayObject:DisplayObject):EntityNode
	{
		return (this._entityNodePool[displayObject.id] || (this._entityNodePool[displayObject.id] = displayObject._iAddEntityNode(new (EntityNodePool.getClass(displayObject))(this, displayObject, this._partition))));
	}

	/**
	 * //TODO
	 *
	 * @param entity
	 */
	public disposeItem(displayObject:DisplayObject):EntityNode
	{
		var entityNode:EntityNode = this._entityNodePool[displayObject.id];

		if (entityNode) {
			displayObject._iRemoveEntityNode(entityNode);

			delete this._entityNodePool[displayObject.id];
		}

		return entityNode;
	}

	/**
	 *
	 * @param imageObjectClass
	 */
	public static registerClass(entityNodeClass:IEntityNodeClass, assetClass:IAssetClass)
	{
		EntityNodePool._classPool[assetClass.assetType] = entityNodeClass;
	}

	/**
	 *
	 * @param subGeometry
	 */
	public static getClass(displayObject:DisplayObject):IEntityNodeClass
	{
		return EntityNodePool._classPool[displayObject.assetType];
	}

	private static main = EntityNodePool.addDefaults();

	private static addDefaults()
	{
		EntityNodePool.registerClass(CameraNode, Camera);
		EntityNodePool.registerClass(DirectionalLightNode, DirectionalLight);
		EntityNodePool.registerClass(EntityNode, Mesh);
		EntityNodePool.registerClass(EntityNode, Billboard);
		EntityNodePool.registerClass(EntityNode, LineSegment);
		EntityNodePool.registerClass(EntityNode, TextField);
		EntityNodePool.registerClass(EntityNode, MovieClip);
		EntityNodePool.registerClass(LightProbeNode, LightProbe);
		EntityNodePool.registerClass(PointLightNode, PointLight);
		EntityNodePool.registerClass(SkyboxNode, Skybox);
	}
}

export = EntityNodePool;