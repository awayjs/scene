import { AssetEvent } from "@awayjs/core/lib/events/AssetEvent";
import { IAbstractionPool } from "@awayjs/core/lib/library/IAbstractionPool";
import { AbstractionBase } from "@awayjs/core/lib/library/AbstractionBase";
import { Plane3D } from "@awayjs/core/lib/geom/Plane3D";
import { Vector3D } from "@awayjs/core/lib/geom/Vector3D";
import { DisplayObject } from "../display/DisplayObject";
import { BoundingVolumeBase } from "../bounds/BoundingVolumeBase";
import { SceneGraphNode } from "../partition/SceneGraphNode";
import { ITraverser } from "../ITraverser";
import { DisplayObjectEvent } from "../events/DisplayObjectEvent";
import { INode } from "../partition/INode";
/**
 * @class away.partition.EntityNode
 */
export declare class DisplayObjectNode extends AbstractionBase implements INode {
    numEntities: number;
    isSceneGraphNode: boolean;
    _iUpdateQueueNext: DisplayObjectNode;
    private _onInvalidatePartitionBoundsDelegate;
    _displayObject: DisplayObject;
    private _boundsDirty;
    private _bounds;
    _iCollectionMark: number;
    parent: SceneGraphNode;
    private _boundsType;
    readonly debugVisible: boolean;
    /**
     * @internal
     */
    readonly bounds: BoundingVolumeBase;
    constructor(displayObject: DisplayObject, pool: IAbstractionPool);
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
    onClear(event: AssetEvent): void;
    onInvalidate(event: AssetEvent): void;
    /**
     *
     * @param planes
     * @param numPlanes
     * @returns {boolean}
     */
    isInFrustum(planes: Array<Plane3D>, numPlanes: number): boolean;
    /**
     * @inheritDoc
     */
    isIntersectingRay(rayPosition: Vector3D, rayDirection: Vector3D): boolean;
    /**
     *
     * @returns {boolean}
     */
    isRenderable(): boolean;
    /**
     * @inheritDoc
     */
    acceptTraverser(traverser: ITraverser): void;
    _onInvalidatePartitionBounds(event: DisplayObjectEvent): void;
    private _updateBounds();
}
