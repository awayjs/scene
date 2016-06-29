import { EntityNode } from "../partition/EntityNode";
import { ITraverser } from "../ITraverser";
/**
 * @class away.partition.PointLightNode
 */
export declare class PointLightNode extends EntityNode {
    /**
     * @inheritDoc
     */
    acceptTraverser(traverser: ITraverser): void;
    /**
     *
     * @returns {boolean}
     */
    isCastingShadow(): boolean;
}
