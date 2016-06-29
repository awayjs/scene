import { IAbstractionPool } from "@awayjs/core/lib/library/IAbstractionPool";
import { IAssetClass } from "@awayjs/core/lib/library/IAssetClass";
import { ITraverser } from "../ITraverser";
import { DisplayObject } from "../display/DisplayObject";
import { EntityNode } from "../partition/EntityNode";
import { IEntityNodeClass } from "../partition/IEntityNodeClass";
import { DisplayObjectNode } from "../partition/DisplayObjectNode";
import { IContainerNode } from "../partition/IContainerNode";
/**
 * @class away.partition.Partition
 */
export declare class PartitionBase implements IAbstractionPool {
    private static _abstractionClassPool;
    private _abstractionPool;
    _rootNode: IContainerNode;
    private _updatesMade;
    private _updateQueue;
    constructor();
    getAbstraction(displayObject: DisplayObject): EntityNode;
    /**
     *
     * @param image
     */
    clearAbstraction(displayObject: DisplayObject): void;
    traverse(traverser: ITraverser): void;
    iMarkForUpdate(node: DisplayObjectNode): void;
    iRemoveEntity(node: DisplayObjectNode): void;
    /**
     *
     * @param entity
     * @returns {away.partition.NodeBase}
     */
    findParentForNode(node: DisplayObjectNode): IContainerNode;
    private updateEntities();
    /**
     * @internal
     */
    _iRegisterEntity(displayObject: DisplayObject): void;
    /**
     * @internal
     */
    _iUnregisterEntity(displayObject: DisplayObject): void;
    /**
     *
     * @param imageObjectClass
     */
    static registerAbstraction(entityNodeClass: IEntityNodeClass, assetClass: IAssetClass): void;
}
