import Box							= require("awayjs-core/lib/geom/Box");
import Matrix3D						= require("awayjs-core/lib/geom/Matrix3D");
import Sphere							= require("awayjs-core/lib/geom/Sphere");
import Vector3D						= require("awayjs-core/lib/geom/Vector3D");
import IAsset						= require("awayjs-core/lib/library/IAsset");

import BoundingVolumeBase			= require("awayjs-display/lib/bounds/BoundingVolumeBase");
import DisplayObject				= require("awayjs-display/lib/base/DisplayObject");
import Transform					= require("awayjs-display/lib/base/Transform");
import Scene						= require("awayjs-display/lib/containers/Scene");
import DisplayObjectContainer		= require("awayjs-display/lib/containers/DisplayObjectContainer");
import ControllerBase				= require("awayjs-display/lib/controllers/ControllerBase");
import Camera						= require("awayjs-display/lib/entities/Camera");
import PartitionBase				= require("awayjs-display/lib/partition/PartitionBase");
import EntityNode					= require("awayjs-display/lib/partition/EntityNode");
import IPickingCollider				= require("awayjs-display/lib/pick/IPickingCollider");
import PickingCollisionVO			= require("awayjs-display/lib/pick/PickingCollisionVO");
import IRenderer					= require("awayjs-display/lib/IRenderer");

interface IEntity extends IAsset
{
	parent:DisplayObjectContainer;

	x:number;
	y:number;
	z:number;

	rotationX:number;
	rotationY:number;
	rotationZ:number;

	scaleX:number;
	scaleY:number;
	scaleZ:number;

	_iMasksConfig():Array<Array<number>>;

	_iAssignedMaskId():number;

	/**
	 *
	 */
	debugVisible:boolean;

	/**
	 *
	 */
	boundsType:string;

	/**
	 *
	 */
	castsShadows:boolean;

	/**
	 *
	 */
	inverseSceneTransform:Matrix3D;

	/**
	 *
	 */
	pickingCollider:IPickingCollider;

	/**
	 *
	 */
	transform:Transform;

	/**
	 *
	 */
	scene:Scene;

	/**
	 *
	 */
	scenePosition:Vector3D;

	/**
	 *
	 */
	sceneTransform:Matrix3D;

	/**
	 *
	 */
	zOffset:number;

	/**
	 *
	 * @param targetCoordinateSpace
	 */
	getBox(targetCoordinateSpace?:DisplayObject):Box

	/**
	 *
	 * @param targetCoordinateSpace
	 */
	getSphere(targetCoordinateSpace?:DisplayObject):Sphere

	/**
	 *
	 *
	 * @param target
	 * @param upAxis
	 */
	lookAt(target:Vector3D, upAxis?:Vector3D);

	/**
	 * @internal
	 */
	_iPickingCollisionVO:PickingCollisionVO;

	/**
	 * @internal
	 */
	_iController:ControllerBase;

	/**
	 * @internal
	 */
	_iAssignedPartition:PartitionBase;

	/**
	 * //TODO
	 *
	 * @param shortestCollisionDistance
	 * @param findClosest
	 * @returns {boolean}
	 *
	 * @internal
	 */
	_iTestCollision(shortestCollisionDistance:number, findClosest:boolean):boolean;

	/**
	 * @internal
	 */
	_iIsMouseEnabled():boolean;

	/**
	 * @internal
	 */
	_iIsVisible():boolean;

	/**
	 * @internal
	 */
	_iAssignedMasks():Array<Array<DisplayObject>>;

	/**
	 * @internal
	 */
	_iInternalUpdate();

	/**
	 *
	 * @param entityNode
	 * @private
	 */
	_iAddEntityNode(entityNode:EntityNode):EntityNode;

	/**
	 *
	 * @param entityNode
	 * @private
	 */
	_iRemoveEntityNode(entityNode:EntityNode):EntityNode;

	/**
	 * The transformation matrix that transforms from model to world space, adapted with any special operations needed to render.
	 * For example, assuring certain alignedness which is not inherent in the scene transform. By default, this would
	 * return the scene transform.
	 */
	getRenderSceneTransform(camera:Camera):Matrix3D;

	/**
	 *
	 * @param renderer
	 * @private
	 */
	_applyRenderer(renderer:IRenderer);
}

export = IEntity;