import { EntityNode } from "../partition/EntityNode";
import { ITraverser } from "../ITraverser";
/**
 * @class away.partition.LightProbeNode
 */
export declare class LightProbeNode extends EntityNode {
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
