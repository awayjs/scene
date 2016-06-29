import { Plane3D } from "@awayjs/core/lib/geom/Plane3D";
import { Vector3D } from "@awayjs/core/lib/geom/Vector3D";
import { ITraverser } from "../ITraverser";
import { IEntity } from "../display/IEntity";
import { INode } from "../partition/INode";
import { IContainerNode } from "../partition/IContainerNode";
import { BoundingVolumeBase } from "../bounds/BoundingVolumeBase";
/**
 * @class away.partition.NodeBase
 */
export declare class NodeBase implements IContainerNode {
    private _bounds;
    _pChildNodes: Array<INode>;
    _pNumChildNodes: number;
    _pDebugEntity: IEntity;
    _iCollectionMark: number;
    numEntities: number;
    parent: IContainerNode;
    readonly debugVisible: boolean;
    /**
     * @internal
     */
    readonly bounds: BoundingVolumeBase;
    /**
     *
     */
    constructor();
    /**
     *
     * @param planes
     * @param numPlanes
     * @returns {boolean}
     * @internal
     */
    isInFrustum(planes: Array<Plane3D>, numPlanes: number): boolean;
    /**
     *
     * @param rayPosition
     * @param rayDirection
     * @returns {boolean}
     */
    isIntersectingRay(rayPosition: Vector3D, rayDirection: Vector3D): boolean;
    /**
     *
     * @returns {boolean}
     */
    isRenderable(): boolean;
    /**
     *
     * @returns {boolean}
     */
    isCastingShadow(): boolean;
    /**
     *
     * @returns {boolean}
     */
    isMask(): boolean;
    dispose(): void;
    /**
     *
     * @param traverser
     */
    acceptTraverser(traverser: ITraverser): void;
    /**
     *
     * @param node
     * @internal
     */
    iAddNode(node: INode): void;
    /**
     *
     * @param node
     * @internal
     */
    iRemoveNode(node: INode): void;
}
