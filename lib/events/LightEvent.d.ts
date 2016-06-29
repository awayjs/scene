import { EventBase } from "@awayjs/core/lib/events/EventBase";
export declare class LightEvent extends EventBase {
    static CASTS_SHADOW_CHANGE: string;
    constructor(type: string);
    clone(): LightEvent;
}
