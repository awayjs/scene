import { EntityNode } from "../partition/EntityNode";
import { ITraverser } from "../ITraverser";
/**
 * @class away.partition.DirectionalLightNode
 */
export declare class DirectionalLightNode extends EntityNode {
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
