import AssetEvent					= require("awayjs-core/lib/events/AssetEvent");
import IAbstractionPool				= require("awayjs-core/lib/library/IAbstractionPool");
import AbstractionBase				= require("awayjs-core/lib/library/AbstractionBase");

import Plane3D						= require("awayjs-core/lib/geom/Plane3D");
import Vector3D						= require("awayjs-core/lib/geom/Vector3D");

import DisplayObject				= require("awayjs-display/lib/display/DisplayObject");
import AxisAlignedBoundingBox		= require("awayjs-display/lib/bounds/AxisAlignedBoundingBox");
import BoundingSphere				= require("awayjs-display/lib/bounds/BoundingSphere");
import BoundingVolumeBase			= require("awayjs-display/lib/bounds/BoundingVolumeBase");
import BoundsType					= require("awayjs-display/lib/bounds/BoundsType");
import NullBounds					= require("awayjs-display/lib/bounds/NullBounds");
import SceneGraphNode				= require("awayjs-display/lib/partition/SceneGraphNode");
import ITraverser				= require("awayjs-display/lib/ITraverser");
import IEntity						= require("awayjs-display/lib/display/IEntity");
import DisplayObjectEvent			= require("awayjs-display/lib/events/DisplayObjectEvent");
import INode						= require("awayjs-display/lib/partition/INode");

/**
 * @class away.partition.EntityNode
 */
class DisplayObjectNode extends AbstractionBase implements INode
{
	public numEntities:number = 0;

	public isSceneGraphNode:boolean = false;

	public _iUpdateQueueNext:DisplayObjectNode;

	private _onInvalidatePartitionBoundsDelegate:(event:DisplayObjectEvent) => void;
	
	public _displayObject:DisplayObject;
	private _debugEntity:IEntity;
	private _boundsDirty:boolean = true;
	private _bounds:BoundingVolumeBase;

	public _iCollectionMark:number;// = 0;

	public parent:SceneGraphNode;

	public isContainerNode:boolean = false;

	public boundsType:string;

	public get bounds():BoundingVolumeBase
	{
		if (this._boundsDirty)
			this._updateBounds();

		return this._bounds;
	}

	constructor(displayObject:DisplayObject, pool:IAbstractionPool)
	{
		super(displayObject, pool);

		this._onInvalidatePartitionBoundsDelegate = (event:DisplayObjectEvent) => this._onInvalidatePartitionBounds(event);

		this._displayObject = displayObject;
		this._displayObject.addEventListener(DisplayObjectEvent.INVALIDATE_PARTITION_BOUNDS, this._onInvalidatePartitionBoundsDelegate);

		this.boundsType = this._displayObject.boundsType;
	}

	/**
	 *
	 * @returns {boolean}
	 */
	public isCastingShadow():boolean
	{
		return this._displayObject.castsShadows;
	}

	public onClear(event:AssetEvent)
	{
		super.onClear(event);

		this._displayObject.removeEventListener(DisplayObjectEvent.INVALIDATE_PARTITION_BOUNDS, this._onInvalidatePartitionBoundsDelegate);
		this._displayObject = null;

		if (this._bounds)
			this._bounds.dispose();

		this._bounds = null;
		this._debugEntity = null;
	}

	public onInvalidate(event:AssetEvent)
	{
		super.onInvalidate(event);

		if (this.boundsType != this._displayObject.boundsType) {
			this.boundsType = this._displayObject.boundsType;
			this._boundsDirty = true;
		}
	}

	/**
	 *
	 * @param planes
	 * @param numPlanes
	 * @returns {boolean}
	 */
	public isInFrustum(planes:Array<Plane3D>, numPlanes:number):boolean
	{
		return true;
	}


	/**
	 * @inheritDoc
	 */
	public isIntersectingRay(rayPosition:Vector3D, rayDirection:Vector3D):boolean
	{
		return true;
	}

	/**
	 * @inheritDoc
	 */
	public acceptTraverser(traverser:ITraverser)
	{
		// do nothing here
	}

	public _onInvalidatePartitionBounds(event:DisplayObjectEvent)
	{
		// do nothing here
	}

	private _updateBounds()
	{
		if (this._bounds)
			this._bounds.dispose();

		if (this.boundsType == BoundsType.AXIS_ALIGNED_BOX)
			this._bounds = new AxisAlignedBoundingBox(this._displayObject);
		else if (this.boundsType == BoundsType.SPHERE)
			this._bounds = new BoundingSphere(this._displayObject);
		else if (this.boundsType == BoundsType.NULL)
			this._bounds = new NullBounds();

		this._boundsDirty = false;
	}
}

export = DisplayObjectNode;