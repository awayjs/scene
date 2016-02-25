import Box							= require("awayjs-core/lib/geom/Box");
import ColorTransform				= require("awayjs-core/lib/geom/ColorTransform");
import Matrix3D						= require("awayjs-core/lib/geom/Matrix3D");
import Sphere						= require("awayjs-core/lib/geom/Sphere");
import Vector3D						= require("awayjs-core/lib/geom/Vector3D");
import IAsset						= require("awayjs-core/lib/library/IAsset");

import BoundingVolumeBase			= require("awayjs-display/lib/bounds/BoundingVolumeBase");
import DisplayObject				= require("awayjs-display/lib/display/DisplayObject");
import Transform					= require("awayjs-display/lib/base/Transform");
import Scene						= require("awayjs-display/lib/display/Scene");
import DisplayObjectContainer		= require("awayjs-display/lib/display/DisplayObjectContainer");
import ControllerBase				= require("awayjs-display/lib/controllers/ControllerBase");
import Camera						= require("awayjs-display/lib/display/Camera");
import PartitionBase				= require("awayjs-display/lib/partition/PartitionBase");
import EntityNode					= require("awayjs-display/lib/partition/EntityNode");
import IPickingCollider				= require("awayjs-display/lib/pick/IPickingCollider");
import PickingCollisionVO			= require("awayjs-display/lib/pick/PickingCollisionVO");
import IRenderer					= require("awayjs-display/lib/IRenderer");
import CollectorBase = require("awayjs-display/lib/traverse/CollectorBase");

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

	_iAssignedColorTransform():ColorTransform;

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
	_acceptTraverser(collector:CollectorBase);
}

export = IEntity;