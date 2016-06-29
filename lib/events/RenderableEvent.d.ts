import { EventBase } from "@awayjs/core/lib/events/EventBase";
import { IRenderable } from "../base/IRenderable";
/**
 * Dispatched to notify changes in a sub geometry object's state.
 *
 * @class away.events.RenderableEvent
 * @see away.core.base.Graphics
 */
export declare class RenderableEvent extends EventBase {
    /**
     * Dispatched when a Renderable owners's render object owner has been updated.
     */
    static INVALIDATE_SURFACE: string;
    /**
     *
     */
    static INVALIDATE_ELEMENTS: string;
    private _renderable;
    /**
     * Create a new GraphicsEvent
     * @param type The event type.
     * @param dataType An optional data type of the vertex data being updated.
     */
    constructor(type: string, renderable: IRenderable);
    /**
     * The renderobject owner of the renderable owner.
     */
    readonly renderable: IRenderable;
    /**
     * Clones the event.
     *
     * @return An exact duplicate of the current object.
     */
    clone(): RenderableEvent;
}
