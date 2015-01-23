import BoundingVolumeBase			= require("awayjs-core/lib/bounds/BoundingVolumeBase");
import Matrix3D						= require("awayjs-core/lib/geom/Matrix3D");
import Vector3D						= require("awayjs-core/lib/geom/Vector3D");
import IAsset						= require("awayjs-core/lib/library/IAsset");

import Transform					= require("awayjs-display/lib/base/Transform");
import Scene						= require("awayjs-display/lib/containers/Scene");
import ControllerBase				= require("awayjs-display/lib/controllers/ControllerBase");
import Camera						= require("awayjs-display/lib/entities/Camera");
import Partition					= require("awayjs-display/lib/partition/Partition");
import EntityNode					= require("awayjs-display/lib/partition/EntityNode");
import IPickingCollider				= require("awayjs-display/lib/pick/IPickingCollider");
import PickingCollisionVO			= require("awayjs-display/lib/pick/PickingCollisionVO");
import IRendererPool				= require("awayjs-display/lib/pool/IRendererPool");

interface IEntity extends IAsset
{
	x:number;
	y:number;
	z:number;

	rotationX:number;
	rotationY:number;
	rotationZ:number;

	scaleX:number;
	scaleY:number;
	scaleZ:number;

	/**
	 *
	 */
	bounds:BoundingVolumeBase;

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
	partitionNode:EntityNode;

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
	worldBounds:BoundingVolumeBase;

	/**
	 *
	 */
	zOffset:number

	/**
	 *
	 */
	isIntersectingRay(rayPosition:Vector3D, rayDirection:Vector3D):boolean;

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
	_iAssignedPartition:Partition;

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
	_iIsMouseEnabled():boolean

	/**
	 * @internal
	 */
	_iIsVisible():boolean

	_iInternalUpdate()

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
	_iCollectRenderables(rendererPool:IRendererPool);
}

export = IEntity;