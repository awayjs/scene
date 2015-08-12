import IAssetClass					= require("awayjs-core/lib/library/IAssetClass");

import Plane3D						= require("awayjs-core/lib/geom/Plane3D");
import Vector3D						= require("awayjs-core/lib/geom/Vector3D");

import DisplayObject				= require("awayjs-display/lib/base/DisplayObject");
import AxisAlignedBoundingBox		= require("awayjs-display/lib/bounds/AxisAlignedBoundingBox");
import BoundingSphere				= require("awayjs-display/lib/bounds/BoundingSphere");
import BoundingVolumeBase			= require("awayjs-display/lib/bounds/BoundingVolumeBase");
import BoundsType					= require("awayjs-display/lib/bounds/BoundsType");
import NullBounds					= require("awayjs-display/lib/bounds/NullBounds");
import PartitionBase				= require("awayjs-display/lib/partition/PartitionBase");
import NodeBase						= require("awayjs-display/lib/partition/NodeBase");
import IDisplayObjectNode			= require("awayjs-display/lib/partition/IDisplayObjectNode");
import CollectorBase				= require("awayjs-display/lib/traverse/CollectorBase");
import IEntity						= require("awayjs-display/lib/entities/IEntity");
import Mesh							= require("awayjs-display/lib/entities/Mesh");
import PickingCollisionVO			= require("awayjs-display/lib/pick/PickingCollisionVO");
import EntityNodePool				= require("awayjs-display/lib/pool/EntityNodePool");

/**
 * @class away.partition.EntityNode
 */
class EntityNode extends NodeBase implements IDisplayObjectNode
{
	public isContainerNode:boolean = false;

	public _iUpdateQueueNext:IDisplayObjectNode;
	private _pool:EntityNodePool;
	private _entity:DisplayObject;
	private _partition:PartitionBase;
	public _bounds:BoundingVolumeBase;

	constructor(pool:EntityNodePool, entity:DisplayObject, partition:PartitionBase)
	{
		super();

		this._pool = pool;
		this._entity = entity;
		this._partition = partition;
		this.numEntities = 1;

		this.updateBounds();

		this.debugVisible = this._entity.debugVisible;
	}

	public get displayObject():DisplayObject
	{
		return this._entity;
	}

	/**
	 *
	 * @returns {boolean}
	 */
	public isCastingShadow():boolean
	{
		return this.displayObject.castsShadows;
	}

	/**
	 *
	 * @param planes
	 * @param numPlanes
	 * @returns {boolean}
	 */
	public isInFrustum(planes:Array<Plane3D>, numPlanes:number):boolean
	{
		if (!this._entity._iIsVisible())
			return false;

		return true; // todo: hack for 2d. attention. might break stuff in 3d.
		//return this._bounds.isInFrustum(planes, numPlanes);
	}

	/**
	 * @inheritDoc
	 */
	public acceptTraverser(traverser:CollectorBase)
	{
		if (traverser.enterNode(this)) {
			traverser.applyEntity(<IEntity> this._entity);

			if (this._pImplicitDebugVisible && traverser.isEntityCollector)
				traverser.applyEntity(this._pDebugEntity);
		}
	}

	/**
	 * @inheritDoc
	 */
	public isIntersectingRay(rayPosition:Vector3D, rayDirection:Vector3D):boolean
	{
		if (!this._entity._iIsVisible())
			return false;

		var pickingCollisionVO:PickingCollisionVO = this._entity._iPickingCollisionVO;
		pickingCollisionVO.localRayPosition = this._entity.inverseSceneTransform.transformVector(rayPosition);
		pickingCollisionVO.localRayDirection = this._entity.inverseSceneTransform.deltaTransformVector(rayDirection);

		if (!pickingCollisionVO.localNormal)
			pickingCollisionVO.localNormal = new Vector3D();

		var rayEntryDistance:number = this._bounds.rayIntersection(pickingCollisionVO.localRayPosition, pickingCollisionVO.localRayDirection, pickingCollisionVO.localNormal);

		if (rayEntryDistance < 0)
			return false;

		pickingCollisionVO.rayEntryDistance = rayEntryDistance;
		pickingCollisionVO.rayPosition = rayPosition;
		pickingCollisionVO.rayDirection = rayDirection;
		pickingCollisionVO.rayOriginIsInsideBounds = rayEntryDistance == 0;

		return true;
	}

	/**
	 *
	 * @protected
	 */
	public _pCreateDebugEntity():IEntity
	{
		return this._bounds.boundsPrimitive;
	}

	public invalidatePartition()
	{
		this._bounds.invalidate();

		//this._partition.iMarkForUpdate(this);
	}

	public updateBounds()
	{
		if (this._entity.boundsType == BoundsType.AXIS_ALIGNED_BOX)
			this._bounds = new AxisAlignedBoundingBox(this._entity);
		else if (this._entity.boundsType == BoundsType.SPHERE)
			this._bounds = new BoundingSphere(this._entity);
		else if (this._entity.boundsType == BoundsType.NULL)
			this._bounds = new NullBounds();

		this.updateDebugEntity();
	}
}

export = EntityNode;