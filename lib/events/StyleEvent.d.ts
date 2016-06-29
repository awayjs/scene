import { EventBase } from "@awayjs/core/lib/events/EventBase";
import { Style } from "../base/Style";
export declare class StyleEvent extends EventBase {
    private _style;
    /**
     *
     */
    static INVALIDATE_PROPERTIES: string;
    readonly style: Style;
    constructor(type: string, style: Style);
    /**
     * Clones the event.
     * @return An exact duplicate of the current object.
     */
    clone(): StyleEvent;
}
