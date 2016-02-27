import AssetEvent					= require("awayjs-core/lib/events/AssetEvent");
import Plane3D						= require("awayjs-core/lib/geom/Plane3D");
import Vector3D						= require("awayjs-core/lib/geom/Vector3D");

import DisplayObject				= require("awayjs-display/lib/display/DisplayObject");
import IContainerNode				= require("awayjs-display/lib/partition/IContainerNode");
import ITraverser				= require("awayjs-display/lib/ITraverser");
import IEntity						= require("awayjs-display/lib/display/IEntity");
import DisplayObjectEvent			= require("awayjs-display/lib/events/DisplayObjectEvent");
import PickingCollisionVO			= require("awayjs-display/lib/pick/PickingCollisionVO");
import DisplayObjectNode			= require("awayjs-display/lib/partition/DisplayObjectNode");
import PartitionBase				= require("awayjs-display/lib/partition/PartitionBase");
import IRenderable					= require("awayjs-display/lib/base/IRenderable");
import Sprite						= require("awayjs-display/lib/display/Sprite");
/**
 * @class away.partition.EntityNode
 */
class EntityNode extends DisplayObjectNode
{
	public numEntities:number = 1;

	private _partition:PartitionBase;


	constructor(displayObject:DisplayObject, partition:PartitionBase)
	{
		super(displayObject, partition);

		this._partition = partition;
	}

	public onClear(event:AssetEvent)
	{
		super.onClear(event);

		this._partition = null;
	}

	/**
	 *
	 * @param planes
	 * @param numPlanes
	 * @returns {boolean}
	 */
	public isInFrustum(planes:Array<Plane3D>, numPlanes:number):boolean
	{
		if (!this._displayObject._iIsVisible())
			return false;

		return true; // todo: hack for 2d. attention. might break stuff in 3d.
		//return this._bounds.isInFrustum(planes, numPlanes);
	}


	/**
	 * @inheritDoc
	 */
	public isIntersectingRay(rayPosition:Vector3D, rayDirection:Vector3D):boolean
	{
		if (!this._displayObject._iIsVisible())
			return false;

		var pickingCollisionVO:PickingCollisionVO = this._displayObject._iPickingCollisionVO;
		pickingCollisionVO.localRayPosition = this._displayObject.inverseSceneTransform.transformVector(rayPosition);
		pickingCollisionVO.localRayDirection = this._displayObject.inverseSceneTransform.deltaTransformVector(rayDirection);

		if (!pickingCollisionVO.localNormal)
			pickingCollisionVO.localNormal = new Vector3D();

		var rayEntryDistance:number = this.bounds.rayIntersection(pickingCollisionVO.localRayPosition, pickingCollisionVO.localRayDirection, pickingCollisionVO.localNormal);

		if (rayEntryDistance < 0)
			return false;

		pickingCollisionVO.rayEntryDistance = rayEntryDistance;
		pickingCollisionVO.rayPosition = rayPosition;
		pickingCollisionVO.rayDirection = rayDirection;
		pickingCollisionVO.rayOriginIsInsideBounds = rayEntryDistance == 0;

		return true;
	}

	/**
	 * @inheritDoc
	 */
	public acceptTraverser(traverser:ITraverser)
	{
		if (traverser.enterNode(this)) {
			this._displayObject._acceptTraverser(traverser);

			if (this._displayObject.debugVisible && traverser.isDebugEnabled)
				this.bounds.boundsPrimitive._acceptTraverser(traverser);
		}
	}

	public _onInvalidatePartitionBounds(event:DisplayObjectEvent)
	{
		this.bounds.invalidate();

		this._partition.iMarkForUpdate(this);
	}
}

export = EntityNode;