import { DisplayObject } from "../display/DisplayObject";
import { Sprite } from "../display/Sprite";
import { IMovieClipAdapter } from "../adapters/IMovieClipAdapter";
import { Timeline } from "../base/Timeline";
export declare class MovieClip extends Sprite {
    private static _skipAdvance;
    private static _movieClips;
    static assetType: string;
    private _timeline;
    private _isButton;
    private _onMouseOver;
    private _onMouseOut;
    private _onMouseDown;
    private _onMouseUp;
    private _time;
    private _currentFrameIndex;
    private _isPlaying;
    private _enterFrame;
    private _skipAdvance;
    private _isInit;
    private _potentialInstances;
    private _depth_sessionIDs;
    private _sessionID_childs;
    /**
     * adapter is used to provide MovieClip to scripts taken from different platforms
     * setter typically managed by factory
     */
    adapter: IMovieClipAdapter;
    constructor(timeline?: Timeline);
    dispose(): void;
    disposeValues(): void;
    reset_textclones(): void;
    isInit: boolean;
    timeline: Timeline;
    /**
     *
     */
    loop: boolean;
    readonly numFrames: number;
    jumpToLabel(label: string): void;
    /**
     * the current index of the current active frame
     */
    constructedKeyFrameIndex: number;
    reset(): void;
    resetSessionIDs(): void;
    currentFrameIndex: number;
    addButtonListeners(): void;
    removeButtonListeners(): void;
    getChildAtSessionID(sessionID: number): DisplayObject;
    getSessionIDDepths(): Object;
    addChildAtDepth(child: DisplayObject, depth: number, replace?: boolean): DisplayObject;
    _addTimelineChildAt(child: DisplayObject, depth: number, sessionID: number): DisplayObject;
    removeChildAtInternal(index: number): DisplayObject;
    readonly assetType: string;
    /**
     * Starts playback of animation from current position
     */
    play(): void;
    /**
     * should be called right before the call to away3d-render.
     */
    update(): void;
    getPotentialChildInstance(id: number): DisplayObject;
    /**
     * Stop playback of animation and hold current position
     */
    stop(): void;
    clone(): MovieClip;
    copyTo(newInstance: MovieClip): void;
    advanceFrame(): void;
    logHierarchy(depth?: number): void;
    printHierarchyName(depth: number, target: DisplayObject): void;
    clear(): void;
}
export default MovieClip;
