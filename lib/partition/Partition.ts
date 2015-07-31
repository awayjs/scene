import Camera						= require("awayjs-display/lib/entities/Camera");
import DirectionalLight				= require("awayjs-display/lib/entities/DirectionalLight");
import IEntity						= require("awayjs-display/lib/entities/IEntity");
import LightProbe					= require("awayjs-display/lib/entities/LightProbe");
import PointLight					= require("awayjs-display/lib/entities/PointLight");
import Skybox						= require("awayjs-display/lib/entities/Skybox");
import CameraNode					= require("awayjs-display/lib/partition/CameraNode");
import DirectionalLightNode			= require("awayjs-display/lib/partition/DirectionalLightNode");
import EntityNode					= require("awayjs-display/lib/partition/EntityNode");
import LightProbeNode				= require("awayjs-display/lib/partition/LightProbeNode");
import PointLightNode				= require("awayjs-display/lib/partition/PointLightNode");
import SkyboxNode					= require("awayjs-display/lib/partition/SkyboxNode");
import NodeBase						= require("awayjs-display/lib/partition/NodeBase");
import NullNode						= require("awayjs-display/lib/partition/NullNode");
import EntityNodePool				= require("awayjs-display/lib/pool/EntityNodePool");
import CollectorBase				= require("awayjs-display/lib/traverse/CollectorBase");

/**
 * @class away.partition.Partition
 */
class Partition
{
	private _cameraNodePool:EntityNodePool;
	private _directionalLightNodePool:EntityNodePool;
	private _entityNodePool:EntityNodePool;
	private _lightProbeNodePool:EntityNodePool;
	private _pointLightNodePool:EntityNodePool;
	private _skyboxNodePool:EntityNodePool;

	public _rootNode:NodeBase;
	private _updatesMade:Boolean = false;
	private _updateQueue:EntityNode;

	constructor(rootNode:NodeBase)
	{
		this._rootNode = rootNode || <NodeBase> new NullNode();

		this._cameraNodePool = new EntityNodePool(CameraNode, this);
		this._directionalLightNodePool = new EntityNodePool(DirectionalLightNode, this);
		this._entityNodePool = new EntityNodePool(EntityNode, this);
		this._lightProbeNodePool = new EntityNodePool(LightProbeNode, this);
		this._pointLightNodePool = new EntityNodePool(PointLightNode, this);
		this._skyboxNodePool = new EntityNodePool(SkyboxNode, this);
	}

	public get rootNode():NodeBase
	{
		return this._rootNode;
	}

	public traverse(traverser:CollectorBase)
	{
		if (this._updatesMade) {
			var t:EntityNode = this._updateQueue;
			while (t) {
				//required for controllers with autoUpdate set to true and queued events
				t.entity._iInternalUpdate();
				t = t._iUpdateQueueNext;
			}
			this.updateEntities();
		}


		this._rootNode.acceptTraverser(traverser);
	}

	public iMarkForUpdate(node:EntityNode)
	{
		var t:EntityNode = this._updateQueue;

		while (t) {
			if (node == t)
				return;

			t = t._iUpdateQueueNext;
		}

		node._iUpdateQueueNext = this._updateQueue;

		this._updateQueue = node;
		this._updatesMade = true;
	}

	public iRemoveEntity(node:EntityNode)
	{
		var t:EntityNode;

		node.removeFromParent();

		if (node == this._updateQueue) {
			this._updateQueue = node._iUpdateQueueNext;
		} else {
			t = this._updateQueue;
			while (t && t._iUpdateQueueNext != node)
				t = t._iUpdateQueueNext;

			if (t)
				t._iUpdateQueueNext = node._iUpdateQueueNext;
		}

		node._iUpdateQueueNext = null;

		if (!this._updateQueue)
			this._updatesMade = false;
	}

	private updateEntities()
	{
		var node:EntityNode = this._updateQueue;
		var targetNode:NodeBase;
		var t:EntityNode;
		this._updateQueue = null;
		this._updatesMade = false;

		do {
			targetNode = this._rootNode.findPartitionForEntity(node.entity);

			if (node.parent != targetNode) {
				node.removeFromParent();
				targetNode.iAddNode(node);
			}

			t = node._iUpdateQueueNext;
			node._iUpdateQueueNext = null;

		} while ((node = t) != null);
	}


	/**
	 * @internal
	 */
	public _iRegisterCamera(camera:Camera)
	{
		this.iMarkForUpdate(this._cameraNodePool.getItem(camera));
	}

	/**
	 * @internal
	 */
	public _iRegisterDirectionalLight(directionalLight:DirectionalLight)
	{
		this.iMarkForUpdate(this._directionalLightNodePool.getItem(directionalLight));
	}

	/**
	 * @internal
	 */
	public _iRegisterEntity(entity:IEntity)
	{
		this.iMarkForUpdate(this._entityNodePool.getItem(entity));
	}

	/**
	 * @internal
	 */
	public _iRegisterLightProbe(lightProbe:LightProbe)
	{
		this.iMarkForUpdate(this._lightProbeNodePool.getItem(lightProbe));
	}

	/**
	 * @internal
	 */
	public _iRegisterPointLight(pointLight:PointLight)
	{
		this.iMarkForUpdate(this._pointLightNodePool.getItem(pointLight));
	}

	/**
	 * @internal
	 */
	public _iRegisterSkybox(skybox:Skybox)
	{
		this.iMarkForUpdate(this._skyboxNodePool.getItem(skybox));
	}

	/**
	 * @internal
	 */
	public _iUnregisterCamera(camera:Camera)
	{
		this.iRemoveEntity(this._cameraNodePool.disposeItem(camera));
	}

	/**
	 * @internal
	 */
	public _iUnregisterDirectionalLight(directionalLight:DirectionalLight)
	{
		this.iRemoveEntity(this._directionalLightNodePool.disposeItem(directionalLight));
	}

	/**
	 * @internal
	 */
	public _iUnregisterEntity(entity:IEntity)
	{
		this.iRemoveEntity(this._entityNodePool.disposeItem(entity));
	}

	/**
	 * @internal
	 */
	public _iUnregisterLightProbe(lightProbe:LightProbe)
	{
		this.iRemoveEntity(this._lightProbeNodePool.disposeItem(lightProbe));
	}

	/**
	 * @internal
	 */
	public _iUnregisterPointLight(pointLight:PointLight)
	{
		this.iRemoveEntity(this._pointLightNodePool.disposeItem(pointLight));
	}

	/**
	 * @internal
	 */
	public _iUnregisterSkybox(skybox:Skybox)
	{
		this.iRemoveEntity(this._skyboxNodePool.disposeItem(skybox));
	}
}

export = Partition;