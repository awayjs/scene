import { DisplayObject } from "../display/DisplayObject";
export declare class ControllerBase {
    _pControllerDirty: boolean;
    _pAutoUpdate: boolean;
    _pTargetObject: DisplayObject;
    constructor(targetObject?: DisplayObject);
    pNotifyUpdate(): void;
    targetObject: DisplayObject;
    autoUpdate: boolean;
    update(interpolate?: boolean): void;
    updateController(): void;
}
