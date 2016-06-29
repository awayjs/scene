import { DisplayObject } from "../display/DisplayObject";
import { HoverController } from "../controllers/HoverController";
/**
 * Controller used to follow behind an object on the XZ plane, with an optional
 * elevation (tiltAngle).
 *
 * @see    away3d.containers.View3D
 */
export declare class FollowController extends HoverController {
    constructor(targetObject?: DisplayObject, lookAtObject?: DisplayObject, tiltAngle?: number, distance?: number);
    update(interpolate?: boolean): void;
}
