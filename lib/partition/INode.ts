import Plane3D						= require("awayjs-core/lib/geom/Plane3D");
import Vector3D						= require("awayjs-core/lib/geom/Vector3D");

import ITraverser					= require("awayjs-display/lib/ITraverser");
import DisplayObject				= require("awayjs-display/lib/display/DisplayObject");
import IContainerNode				= require("awayjs-display/lib/partition/IContainerNode");
import BoundingVolumeBase			= require("awayjs-display/lib/bounds/BoundingVolumeBase");

/**
 * IDisplayObjectNode is an interface for the constructable class definition EntityNode that is used to
 * create node objects in the partition pipeline that represent the contents of a Entity
 *
 * @class away.pool.IDisplayObjectNode
 */
interface INode
{
	debugVisible:boolean;

	bounds:BoundingVolumeBase;

	numEntities:number;

	parent:IContainerNode;

	_iCollectionMark:number;

	isInFrustum(planes:Array<Plane3D>, numPlanes:number):boolean

	isIntersectingRay(rayPosition:Vector3D, rayDirection:Vector3D):boolean

	acceptTraverser(traverser:ITraverser);

	isCastingShadow():boolean;
}

export = INode;