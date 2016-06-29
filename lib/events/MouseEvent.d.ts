import { Point } from "@awayjs/core/lib/geom/Point";
import { Vector3D } from "@awayjs/core/lib/geom/Vector3D";
import { EventBase } from "@awayjs/core/lib/events/EventBase";
import { IEntity } from "../display/IEntity";
import { IRenderable } from "../base/IRenderable";
import { View } from "../View";
import { MaterialBase } from "../materials/MaterialBase";
/**
 * A MouseEvent is dispatched when a mouse event occurs over a mouseEnabled object in View.
 * TODO: we don't have screenZ data, tho this should be easy to implement
 */
export declare class MouseEvent extends EventBase {
    _iAllowedToPropagate: boolean;
    _iParentEvent: MouseEvent;
    /**
     * Defines the value of the type property of a mouseOver3d event object.
     */
    static MOUSE_OVER: string;
    /**
     * Defines the value of the type property of a mouseOut3d event object.
     */
    static MOUSE_OUT: string;
    /**
     * Defines the value of the type property of a mouseUp3d event object.
     */
    static MOUSE_UP: string;
    /**
     * Defines the value of the type property of a mouseDown3d event object.
     */
    static MOUSE_DOWN: string;
    /**
     * Defines the value of the type property of a mouseMove3d event object.
     */
    static MOUSE_MOVE: string;
    /**
     * Defines the value of the type property of a rollOver3d event object.
     */
    /**
     * Defines the value of the type property of a rollOut3d event object.
     */
    /**
     * Defines the value of the type property of a click3d event object.
     */
    static CLICK: string;
    /**
     * Defines the value of the type property of a doubleClick3d event object.
     */
    static DOUBLE_CLICK: string;
    /**
     * Defines the value of the type property of a mouseWheel3d event object.
     */
    static MOUSE_WHEEL: string;
    /**
     * The horizontal coordinate at which the event occurred in view coordinates.
     */
    screenX: number;
    /**
     * The vertical coordinate at which the event occurred in view coordinates.
     */
    screenY: number;
    /**
     * The view object inside which the event took place.
     */
    view: View;
    /**
     * The entity inside which the event took place.
     */
    entity: IEntity;
    /**
     * The renderable owner inside which the event took place.
     */
    renderable: IRenderable;
    /**
     * The material of the 3d element inside which the event took place.
     */
    material: MaterialBase;
    /**
     * The uv coordinate inside the draw primitive where the event took place.
     */
    uv: Point;
    /**
     * The index of the elements where the event took place.
     */
    elementIndex: number;
    /**
     * The position in object space where the event took place
     */
    position: Vector3D;
    /**
     * The normal in object space where the event took place
     */
    normal: Vector3D;
    /**
     * Indicates whether the Control key is active (true) or inactive (false).
     */
    ctrlKey: boolean;
    /**
     * Indicates whether the Alt key is active (true) or inactive (false).
     */
    altKey: boolean;
    /**
     * Indicates whether the Shift key is active (true) or inactive (false).
     */
    shiftKey: boolean;
    /**
     * Indicates how many lines should be scrolled for each unit the user rotates the mouse wheel.
     */
    delta: number;
    /**
     * Create a new MouseEvent object.
     * @param type The type of the MouseEvent.
     */
    constructor(type: string);
    /**
     * @inheritDoc
     */
    readonly bubbles: boolean;
    /**
     * @inheritDoc
     */
    stopPropagation(): void;
    /**
     * @inheritDoc
     */
    stopImmediatePropagation(): void;
    /**
     * Creates a copy of the MouseEvent object and sets the value of each property to match that of the original.
     */
    clone(): MouseEvent;
    /**
     * The position in scene space where the event took place
     */
    readonly scenePosition: Vector3D;
    /**
     * The normal in scene space where the event took place
     */
    readonly sceneNormal: Vector3D;
}
