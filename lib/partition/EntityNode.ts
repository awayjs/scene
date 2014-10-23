import Plane3D						= require("awayjs-core/lib/geom/Plane3D");
import Vector3D						= require("awayjs-core/lib/geom/Vector3D");
import PartialImplementationError	= require("awayjs-core/lib/errors/PartialImplementationError");

import NodeBase						= require("awayjs-display/lib/partition/NodeBase");
import ICollector					= require("awayjs-display/lib/traverse/ICollector");
import IEntity						= require("awayjs-display/lib/entities/IEntity");

/**
 * @class away.partition.EntityNode
 */
class EntityNode extends NodeBase
{

	private _entity:IEntity;
	public _iUpdateQueueNext:EntityNode;

	constructor(entity:IEntity)
	{
		super();
		this._entity = entity;
		this._iNumEntities = 1;
	}

	public get entity():IEntity
	{
		return this._entity;
	}

	public removeFromParent():void
	{
		if (this._iParent)
			this._iParent.iRemoveNode(this);

		this._iParent = null;
	}

	/**
	 *
	 * @returns {boolean}
	 */
	public isCastingShadow():boolean
	{
		return this.entity.castsShadows;
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

		return this._entity.worldBounds.isInFrustum(planes, numPlanes);
	}

	/**
	 * @inheritDoc
	 */
	public acceptTraverser(traverser:ICollector)
	{
		if (traverser.enterNode(this))
			traverser.applyEntity(this._entity);
	}

	/**
	 * @inheritDoc
	 */
	public isIntersectingRay(rayPosition:Vector3D, rayDirection:Vector3D):boolean
	{
		if (!this._entity._iIsVisible())
			return false;

		return this._entity.isIntersectingRay(rayPosition, rayDirection);
	}

	/**
	 *
	 * @protected
	 */
	public _pCreateBoundsPrimitive():IEntity
	{
		throw new PartialImplementationError();
		//return this._entity.bounds.boundingEntity;
	}
}

export = EntityNode;