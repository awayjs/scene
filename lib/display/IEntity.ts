import Box							from "awayjs-core/lib/geom/Box";
import ColorTransform				from "awayjs-core/lib/geom/ColorTransform";
import Matrix3D						from "awayjs-core/lib/geom/Matrix3D";
import Sphere						from "awayjs-core/lib/geom/Sphere";
import Vector3D						from "awayjs-core/lib/geom/Vector3D";
import IAsset						from "awayjs-core/lib/library/IAsset";

import BoundingVolumeBase			from "awayjs-display/lib/bounds/BoundingVolumeBase";
import DisplayObject				from "awayjs-display/lib/display/DisplayObject";
import Transform					from "awayjs-display/lib/base/Transform";
import Scene						from "awayjs-display/lib/display/Scene";
import DisplayObjectContainer		from "awayjs-display/lib/display/DisplayObjectContainer";
import ControllerBase				from "awayjs-display/lib/controllers/ControllerBase";
import Camera						from "awayjs-display/lib/display/Camera";
import PartitionBase				from "awayjs-display/lib/partition/PartitionBase";
import EntityNode					from "awayjs-display/lib/partition/EntityNode";
import IPickingCollider				from "awayjs-display/lib/pick/IPickingCollider";
import PickingCollision				from "awayjs-display/lib/pick/PickingCollision";
import IRenderer					from "awayjs-display/lib/IRenderer";
import ITraverser					from "awayjs-display/lib/ITraverser";

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
	_iPickingCollision:PickingCollision;

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
	getRenderSceneTransform(cameraTransform:Matrix3D):Matrix3D;

	/**
	 *
	 * @param renderer
	 * @private
	 */
	_acceptTraverser(collector:ITraverser);
}

export default IEntity;