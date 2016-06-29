import { EventBase } from "@awayjs/core/lib/events/EventBase";
import { ISurface } from "../base/ISurface";
export declare class SurfaceEvent extends EventBase {
    static INVALIDATE_TEXTURE: string;
    static INVALIDATE_ANIMATION: string;
    static INVALIDATE_PASSES: string;
    private _surface;
    /**
     * Create a new GraphicsEvent
     * @param type The event type.
     * @param dataType An optional data type of the vertex data being updated.
     */
    constructor(type: string, surface: ISurface);
    /**
     * The surface of the renderable.
     */
    readonly surface: ISurface;
    /**
     * Clones the event.
     *
     * @return An exact duplicate of the current object.
     */
    clone(): SurfaceEvent;
}
