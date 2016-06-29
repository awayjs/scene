import { Box } from "@awayjs/core/lib/geom/Box";
import { ColorTransform } from "@awayjs/core/lib/geom/ColorTransform";
import { Matrix3D } from "@awayjs/core/lib/geom/Matrix3D";
import { Sphere } from "@awayjs/core/lib/geom/Sphere";
import { Vector3D } from "@awayjs/core/lib/geom/Vector3D";
import { IAsset } from "@awayjs/core/lib/library/IAsset";
import { DisplayObject } from "../display/DisplayObject";
import { Transform } from "../base/Transform";
import { Scene } from "../display/Scene";
import { DisplayObjectContainer } from "../display/DisplayObjectContainer";
import { ControllerBase } from "../controllers/ControllerBase";
import { PartitionBase } from "../partition/PartitionBase";
import { IPickingCollider } from "../pick/IPickingCollider";
import { PickingCollision } from "../pick/PickingCollision";
import { ITraverser } from "../ITraverser";
export interface IEntity extends IAsset {
    parent: DisplayObjectContainer;
    x: number;
    y: number;
    z: number;
    rotationX: number;
    rotationY: number;
    rotationZ: number;
    scaleX: number;
    scaleY: number;
    scaleZ: number;
    _iMasksConfig(): Array<Array<number>>;
    _iAssignedMaskId(): number;
    _iAssignedColorTransform(): ColorTransform;
    /**
     *
     */
    debugVisible: boolean;
    /**
     *
     */
    boundsType: string;
    /**
     *
     */
    castsShadows: boolean;
    /**
     *
     */
    inverseSceneTransform: Matrix3D;
    /**
     *
     */
    pickingCollider: IPickingCollider;
    /**
     *
     */
    transform: Transform;
    /**
     *
     */
    scene: Scene;
    /**
     *
     */
    scenePosition: Vector3D;
    /**
     *
     */
    sceneTransform: Matrix3D;
    /**
     *
     */
    zOffset: number;
    /**
     *
     * @param targetCoordinateSpace
     */
    getBox(targetCoordinateSpace?: DisplayObject): Box;
    /**
     *
     * @param targetCoordinateSpace
     */
    getSphere(targetCoordinateSpace?: DisplayObject): Sphere;
    /**
     *
     *
     * @param target
     * @param upAxis
     */
    lookAt(target: Vector3D, upAxis?: Vector3D): any;
    /**
     * @internal
     */
    _iPickingCollision: PickingCollision;
    /**
     * @internal
     */
    _iController: ControllerBase;
    /**
     * @internal
     */
    _iAssignedPartition: PartitionBase;
    /**
     * @internal
     */
    _iIsMouseEnabled(): boolean;
    /**
     * @internal
     */
    _iIsVisible(): boolean;
    /**
     * @internal
     */
    _iAssignedMasks(): Array<Array<DisplayObject>>;
    /**
     * @internal
     */
    _iInternalUpdate(): any;
    /**
     * The transformation matrix that transforms from model to world space, adapted with any special operations needed to render.
     * For example, assuring certain alignedness which is not inherent in the scene transform. By default, this would
     * return the scene transform.
     */
    getRenderSceneTransform(cameraTransform: Matrix3D): Matrix3D;
    /**
     *
     * @param renderer
     * @private
     */
    _acceptTraverser(collector: ITraverser): any;
}
