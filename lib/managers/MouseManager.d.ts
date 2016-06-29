import { View } from "../View";
import { PickingCollision } from "../pick/PickingCollision";
/**
 * MouseManager enforces a singleton pattern and is not intended to be instanced.
 * it provides a manager class for detecting mouse hits on scene objects and sending out mouse events.
 */
export declare class MouseManager {
    private static _instance;
    private _viewLookup;
    _iActiveDiv: HTMLDivElement;
    _iUpdateDirty: boolean;
    _iCollision: PickingCollision;
    private _nullVector;
    private _previousCollidingObject;
    private _queuedEvents;
    private _mouseMoveEvent;
    private _mouseUp;
    private _mouseClick;
    private _mouseOut;
    private _mouseDown;
    private _mouseMove;
    private _mouseOver;
    private _mouseWheel;
    private _mouseDoubleClick;
    private onClickDelegate;
    private onDoubleClickDelegate;
    private onMouseDownDelegate;
    private onMouseMoveDelegate;
    private onMouseUpDelegate;
    private onMouseWheelDelegate;
    private onMouseOverDelegate;
    private onMouseOutDelegate;
    /**
     * Creates a new <code>MouseManager</code> object.
     */
    constructor();
    static getInstance(): MouseManager;
    fireMouseEvents(forceMouseMove: boolean): void;
    registerView(view: View): void;
    unregisterView(view: View): void;
    private queueDispatch(event, sourceEvent, collision?);
    private onMouseMove(event);
    private onMouseOut(event);
    private onMouseOver(event);
    private onClick(event);
    private onDoubleClick(event);
    private onMouseDown(event);
    private onMouseUp(event);
    private onMouseWheel(event);
    private updateColliders(event);
}
