import { Vector3D } from "@awayjs/core/lib/geom/Vector3D";
import { IRenderer } from "./IRenderer";
import { DisplayObject } from "./display/DisplayObject";
import { TouchPoint } from "./base/TouchPoint";
import { Scene } from "./display/Scene";
import { IPicker } from "./pick/IPicker";
import { Camera } from "./display/Camera";
export declare class View {
    _pScene: Scene;
    _pCamera: Camera;
    _pRenderer: IRenderer;
    private _aspectRatio;
    private _width;
    private _height;
    private _time;
    private _deltaTime;
    private _backgroundColor;
    private _backgroundAlpha;
    private _viewportDirty;
    private _scissorDirty;
    private _onPartitionChangedDelegate;
    private _onProjectionChangedDelegate;
    private _onViewportUpdatedDelegate;
    private _onScissorUpdatedDelegate;
    private _mouseManager;
    private _mousePicker;
    private _htmlElement;
    private _shareContext;
    _pMouseX: number;
    _pMouseY: number;
    _pTouchPoints: Array<TouchPoint>;
    constructor(renderer: IRenderer, scene?: Scene, camera?: Camera);
    layeredView: boolean;
    readonly mouseX: number;
    readonly mouseY: number;
    readonly touchPoints: Array<TouchPoint>;
    getLocalMouseX(displayObject: DisplayObject): number;
    getLocalMouseY(displayObject: DisplayObject): number;
    getLocalTouchPoints(displayObject: DisplayObject): Array<TouchPoint>;
    /**
     *
     */
    readonly htmlElement: HTMLDivElement;
    /**
     *
     */
    renderer: IRenderer;
    /**
     *
     */
    shareContext: boolean;
    /**
     *
     */
    backgroundColor: number;
    /**
     *
     * @returns {number}
     */
    /**
     *
     * @param value
     */
    backgroundAlpha: number;
    /**
     *
     * @returns {Camera3D}
     */
    /**
     * Set camera that's used to render the scene for this viewport
     */
    camera: Camera;
    /**
     *
     * @returns {away.containers.Scene3D}
     */
    /**
     * Set the scene that's used to render for this viewport
     */
    scene: Scene;
    /**
     *
     * @returns {number}
     */
    readonly deltaTime: number;
    /**
     *
     */
    width: number;
    /**
     *
     */
    height: number;
    /**
     *
     */
    mousePicker: IPicker;
    /**
     *
     */
    x: number;
    /**
     *
     */
    y: number;
    /**
     *
     */
    visible: boolean;
    /**
     *
     * @returns {number}
     */
    readonly renderedFacesCount: number;
    /**
     * Renders the view.
     */
    render(): void;
    /**
     *
     */
    pUpdateTime(): void;
    /**
     *
     */
    dispose(): void;
    /**
     *
     * @param e
     */
    private _onPartitionChanged(event);
    /**
     *
     */
    private _onProjectionChanged(event);
    /**
     *
     */
    private _onViewportUpdated(event);
    /**
     *
     */
    private _onScissorUpdated(event);
    project(point3d: Vector3D): Vector3D;
    unproject(sX: number, sY: number, sZ: number): Vector3D;
    getRay(sX: number, sY: number, sZ: number): Vector3D;
    forceMouseMove: boolean;
    updateCollider(): void;
}
