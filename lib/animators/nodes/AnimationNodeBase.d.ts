import { AssetBase } from "@awayjs/core/lib/library/AssetBase";
/**
 * Provides an abstract base class for nodes in an animation blend tree.
 */
export declare class AnimationNodeBase extends AssetBase {
    static assetType: string;
    _pStateClass: any;
    readonly stateClass: any;
    /**
     * Creates a new <code>AnimationNodeBase</code> object.
     */
    constructor();
    /**
     * @inheritDoc
     */
    dispose(): void;
    /**
     * @inheritDoc
     */
    readonly assetType: string;
}
