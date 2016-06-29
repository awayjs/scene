import { EventBase } from "@awayjs/core/lib/events/EventBase";
export declare class RendererEvent extends EventBase {
    static VIEWPORT_UPDATED: string;
    static SCISSOR_UPDATED: string;
    constructor(type: string);
}
