import { Vector3D } from "@awayjs/core/lib/geom/Vector3D";
import { DisplayObject } from "../display/DisplayObject";
import { ControllerBase } from "../controllers/ControllerBase";
export declare class LookAtController extends ControllerBase {
    _pLookAtPosition: Vector3D;
    _pLookAtObject: DisplayObject;
    _pOrigin: Vector3D;
    private _onLookAtObjectChangedDelegate;
    constructor(targetObject?: DisplayObject, lookAtObject?: DisplayObject);
    lookAtPosition: Vector3D;
    lookAtObject: DisplayObject;
    update(interpolate?: boolean): void;
    private onLookAtObjectChanged(event);
}
