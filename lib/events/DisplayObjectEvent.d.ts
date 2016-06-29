import { EventBase } from "@awayjs/core/lib/events/EventBase";
import { DisplayObject } from "../display/DisplayObject";
export declare class DisplayObjectEvent extends EventBase {
    /**
     *
     */
    static VISIBLITY_UPDATED: string;
    /**
     *
     */
    static SCENETRANSFORM_CHANGED: string;
    /**
     *
     */
    static SCENE_CHANGED: string;
    /**
     *
     */
    static PARTITION_CHANGED: string;
    /**
     *
     */
    static INVALIDATE_PARTITION_BOUNDS: string;
    private _object;
    readonly object: DisplayObject;
    constructor(type: string, object: DisplayObject);
    /**
     * Clones the event.
     * @return An exact duplicate of the current object.
     */
    clone(): DisplayObjectEvent;
}
