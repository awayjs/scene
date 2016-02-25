import Plane3D						= require("awayjs-core/lib/geom/Plane3D");
import Vector3D						= require("awayjs-core/lib/geom/Vector3D");

import DisplayObject				= require("awayjs-display/lib/display/DisplayObject");
import CollectorBase				= require("awayjs-display/lib/traverse/CollectorBase");
import IContainerNode				= require("awayjs-display/lib/partition/IContainerNode");

/**
 * IDisplayObjectNode is an interface for the constructable class definition EntityNode that is used to
 * create node objects in the partition pipeline that represent the contents of a Entity
 *
 * @class away.pool.IDisplayObjectNode
 */
interface INode
{
	numEntities:number;

	parent:IContainerNode;

	_iCollectionMark:number;

	isInFrustum(planes:Array<Plane3D>, numPlanes:number):boolean

	isIntersectingRay(rayPosition:Vector3D, rayDirection:Vector3D):boolean

	acceptTraverser(traverser:CollectorBase);

	isCastingShadow():boolean;
}

export = INode;