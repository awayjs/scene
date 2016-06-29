import { AssetEvent } from "@awayjs/core/lib/events/AssetEvent";
import { Plane3D } from "@awayjs/core/lib/geom/Plane3D";
import { Vector3D } from "@awayjs/core/lib/geom/Vector3D";
import { DisplayObject } from "../display/DisplayObject";
import { ITraverser } from "../ITraverser";
import { DisplayObjectEvent } from "../events/DisplayObjectEvent";
import { DisplayObjectNode } from "../partition/DisplayObjectNode";
import { PartitionBase } from "../partition/PartitionBase";
/**
 * @class away.partition.EntityNode
 */
export declare class EntityNode extends DisplayObjectNode {
    numEntities: number;
    private _partition;
    private _maskPosition;
    constructor(displayObject: DisplayObject, partition: PartitionBase);
    onClear(event: AssetEvent): void;
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
    isIntersectingRay(globalRayPosition: Vector3D, globalRayDirection: Vector3D): boolean;
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
    private isIntersectingMasks(globalRayPosition, globalRayDirection, masks);
}
