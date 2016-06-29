import { ITraverser } from "../ITraverser";
import { DisplayObjectNode } from "../partition/DisplayObjectNode";
import { IContainerNode } from "../partition/IContainerNode";
/**
 * Maintains scenegraph heirarchy when collecting nodes
 */
export declare class SceneGraphNode extends DisplayObjectNode implements IContainerNode {
    isSceneGraphNode: boolean;
    private _numNodes;
    private _pChildNodes;
    private _childDepths;
    private _numMasks;
    private _childMasks;
    _iCollectionMark: number;
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
    iAddNode(node: DisplayObjectNode): void;
    /**
     *
     * @param node
     * @internal
     */
    iRemoveNode(node: DisplayObjectNode): void;
}
export default SceneGraphNode;
