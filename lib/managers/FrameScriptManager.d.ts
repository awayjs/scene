import { DisplayObject } from "../display/DisplayObject";
import { MovieClip } from "../display/MovieClip";
export declare class FrameScriptManager {
    static frameScriptDebug: Object;
    private static _queued_dispose;
    private static _queued_mcs;
    private static _queued_scripts;
    private static _queued_mcs_pass2;
    private static _queued_scripts_pass2;
    private static _active_intervals;
    private static _intervalID;
    static setInterval(func: any): number;
    static clearInterval(id: number): void;
    static execute_intervals(): void;
    static add_child_to_dispose(child: DisplayObject): void;
    static add_script_to_queue(mc: MovieClip, script: Function): void;
    static add_script_to_queue_pass2(mc: MovieClip, script: Function): void;
    static execute_queue(): void;
    static execute_dispose(): void;
}
export default FrameScriptManager;
