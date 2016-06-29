import { EventBase } from "@awayjs/core/lib/events/EventBase";
import { Transform } from "../base/Transform";
export declare class TransformEvent extends EventBase {
    private _transform;
    /**
     *
     */
    static INVALIDATE_MATRIX3D: string;
    /**
     *
     */
    static INVALIDATE_COLOR_TRANSFORM: string;
    readonly transform: Transform;
    constructor(type: string, transform: Transform);
    /**
     * Clones the event.
     * @return An exact duplicate of the current object.
     */
    clone(): TransformEvent;
}
