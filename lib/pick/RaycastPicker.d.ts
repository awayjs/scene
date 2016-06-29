import { Vector3D } from "@awayjs/core/lib/geom/Vector3D";
import { ITraverser } from "../ITraverser";
import { Scene } from "../display/Scene";
import { View } from "../View";
import { IPicker } from "../pick/IPicker";
import { PickingCollision } from "../pick/PickingCollision";
import { IEntity } from "../display/IEntity";
import { IRenderable } from "../base/IRenderable";
import { INode } from "../partition/INode";
/**
 * Picks a 3d object from a view or scene by 3D raycast calculations.
 * Performs an initial coarse boundary calculation to return a subset of entities whose bounding volumes intersect with the specified ray,
 * then triggers an optional picking collider on individual renderable objects to further determine the precise values of the picking ray collision.
 *
 * @class away.pick.RaycastPicker
 */
export declare class RaycastPicker implements IPicker, ITraverser {
    private _rayPosition;
    private _rayDirection;
    private _x;
    private _y;
    private _view;
    private _findClosestCollision;
    private _bestCollision;
    private _testCollision;
    private _testCollider;
    private _ignoredEntities;
    private _entities;
    private _hasCollisions;
    /**
     * @inheritDoc
     */
    onlyMouseEnabled: boolean;
    /**
     * Creates a new <code>RaycastPicker</code> object.
     *
     * @param findClosestCollision Determines whether the picker searches for the closest bounds collision along the ray,
     * or simply returns the first collision encountered. Defaults to false.
     */
    constructor(findClosestCollision?: boolean);
    /**
     * Returns true if the current node is at least partly in the frustum. If so, the partition node knows to pass on the traverser to its children.
     *
     * @param node The Partition3DNode object to frustum-test.
     */
    enterNode(node: INode): boolean;
    /**
     * @inheritDoc
     */
    getViewCollision(x: number, y: number, view: View): PickingCollision;
    /**
     * @inheritDoc
     */
    getSceneCollision(rayPosition: Vector3D, rayDirection: Vector3D, scene: Scene): PickingCollision;
    setIgnoreList(entities: Array<IEntity>): void;
    private isIgnored(entity);
    private sortOnNearT(entity1, entity2);
    private getPickingCollision();
    private updatePosition(pickingCollision);
    dispose(): void;
    /**
     *
     * @param entity
     */
    applyEntity(entity: IEntity): void;
    /**
     *
     * @param entity
     */
    applyRenderable(renderable: IRenderable): void;
    /**
     *
     * @param entity
     */
    applyDirectionalLight(entity: IEntity): void;
    /**
     *
     * @param entity
     */
    applyLightProbe(entity: IEntity): void;
    /**
     *
     * @param entity
     */
    applyPointLight(entity: IEntity): void;
    /**
     *
     * @param entity
     */
    applySkybox(entity: IEntity): void;
}
