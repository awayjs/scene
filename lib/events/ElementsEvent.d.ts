import { AttributesView } from "@awayjs/core/lib/attributes/AttributesView";
import { EventBase } from "@awayjs/core/lib/events/EventBase";
/**
 * Dispatched to notify changes in a sub geometry object's state.
 *
 * @class away.events.ElementsEvent
 * @see away.core.base.Graphics
 */
export declare class ElementsEvent extends EventBase {
    /**
     * Dispatched when a Elements's index data has been updated.
     */
    static INVALIDATE_INDICES: string;
    /**
     * Dispatched when a Elements's index data has been disposed.
     */
    static CLEAR_INDICES: string;
    /**
     * Dispatched when a Elements's vertex data has been updated.
     */
    static INVALIDATE_VERTICES: string;
    /**
     * Dispatched when a Elements's vertex data has been disposed.
     */
    static CLEAR_VERTICES: string;
    private _attributesView;
    /**
     * Create a new GraphicsEvent
     * @param type The event type.
     * @param attributesView An optional data type of the vertex data being updated.
     */
    constructor(type: string, attributesView: AttributesView);
    /**
     * The attributes view of the vertex data.
     */
    readonly attributesView: AttributesView;
    /**
     * Clones the event.
     *
     * @return An exact duplicate of the current object.
     */
    clone(): ElementsEvent;
}
