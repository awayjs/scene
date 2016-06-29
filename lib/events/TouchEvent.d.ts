import { Point } from "@awayjs/core/lib/geom/Point";
import { Vector3D } from "@awayjs/core/lib/geom/Vector3D";
import { EventBase } from "@awayjs/core/lib/events/EventBase";
import { IEntity } from "../display/IEntity";
import { IRenderable } from "../base/IRenderable";
import { View } from "../View";
import { MaterialBase } from "../materials/MaterialBase";
export declare class TouchEvent extends EventBase {
    _iAllowedToPropagate: boolean;
    _iParentEvent: TouchEvent;
    /**
     *
     */
    static TOUCH_END: string;
    /**
     *
     */
    static TOUCH_BEGIN: string;
    /**
     *
     */
    static TOUCH_MOVE: string;
    /**
     *
     */
    static TOUCH_OUT: string;
    /**
     *
     */
    static TOUCH_OVER: string;
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
     * The 3d object inside which the event took place.
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
    touchPointID: number;
    /**
     * Create a new TouchEvent object.
     * @param type The type of the TouchEvent.
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
     * Creates a copy of the TouchEvent object and sets the value of each property to match that of the original.
     */
    clone(): TouchEvent;
    /**
     * The position in scene space where the event took place
     */
    readonly scenePosition: Vector3D;
    /**
     * The normal in scene space where the event took place
     */
    readonly sceneNormal: Vector3D;
}
