import { IAbstractionPool } from "@awayjs/core/lib/library/IAbstractionPool";
import { DisplayObject } from "../display/DisplayObject";
import { DisplayObjectContainer } from "../display/DisplayObjectContainer";
import { ITraverser } from "../ITraverser";
import { SceneGraphNode } from "../partition/SceneGraphNode";
import { PartitionBase } from "../partition/PartitionBase";
import { IContainerNode } from "../partition/IContainerNode";
import { DisplayObjectNode } from "../partition/DisplayObjectNode";
/**
 * @class away.partition.Partition
 */
export declare class SceneGraphPartition extends PartitionBase {
    private _sceneGraphNodePool;
    constructor();
    traverse(traverser: ITraverser): void;
    /**
     *
     * @param entity
     * @returns {away.partition.NodeBase}
     */
    findParentForNode(node: DisplayObjectNode): IContainerNode;
    /**
     * @internal
     */
    _iRegisterEntity(displayObject: DisplayObject): void;
    /**
     * @internal
     */
    _iUnregisterEntity(displayObject: DisplayObject): void;
}
/**
 * @class away.pool.SceneGraphNodePool
 */
export declare class SceneGraphNodePool implements IAbstractionPool {
    private _abstractionPool;
    /**
     * //TODO
     *
     * @param entity
     * @returns EntityNode
     */
    getAbstraction(displayObjectContainer: DisplayObjectContainer): SceneGraphNode;
    /**
     * //TODO
     *
     * @param entity
     */
    clearAbstraction(displayObjectContainer: DisplayObjectContainer): void;
}
