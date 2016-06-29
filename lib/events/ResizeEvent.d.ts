import { EventBase } from "@awayjs/core/lib/events/EventBase";
export declare class ResizeEvent extends EventBase {
    static RESIZE: string;
    private _oldHeight;
    private _oldWidth;
    constructor(type: string, oldHeight?: number, oldWidth?: number);
    readonly oldHeight: number;
    readonly oldWidth: number;
    /**
     * Clones the event.
     *
     * @return An exact duplicate of the current object.
     */
    clone(): ResizeEvent;
}
