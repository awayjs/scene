import { EventBase } from "@awayjs/core/lib/events/EventBase";
import { Camera } from "../display/Camera";
/**
 * @class away.events.CameraEvent
 */
export declare class CameraEvent extends EventBase {
    static PROJECTION_CHANGED: string;
    private _camera;
    constructor(type: string, camera: Camera);
    readonly camera: Camera;
    /**
     * Clones the event.
     * @return An exact duplicate of the current object.
     */
    clone(): CameraEvent;
}
