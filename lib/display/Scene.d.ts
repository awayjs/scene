import { ITraverser } from "../ITraverser";
import { DisplayObjectContainer } from "../display/DisplayObjectContainer";
import { PartitionBase } from "../partition/PartitionBase";
export declare class Scene extends DisplayObjectContainer {
    private _expandedPartitions;
    private _partitions;
    _iCollectionMark: number;
    constructor(partition?: PartitionBase);
    traversePartitions(traverser: ITraverser): void;
    /**
     * @internal
     */
    _iRegisterPartition(partition: PartitionBase): void;
    /**
     * @internal
     */
    _iUnregisterPartition(partition: PartitionBase): void;
}
