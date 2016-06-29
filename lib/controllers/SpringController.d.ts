import { Vector3D } from "@awayjs/core/lib/geom/Vector3D";
import { DisplayObject } from "../display/DisplayObject";
import { LookAtController } from "../controllers/LookAtController";
/**
 * Uses spring physics to animate the target object towards a position that is
 * defined as the lookAtTarget object's position plus the vector defined by the
 * positionOffset property.
 */
export declare class SpringController extends LookAtController {
    private _velocity;
    private _dv;
    private _stretch;
    private _force;
    private _acceleration;
    private _desiredPosition;
    /**
     * Stiffness of the spring, how hard is it to extend. The higher it is, the more "fixed" the cam will be.
     * A number between 1 and 20 is recommended.
     */
    stiffness: number;
    /**
     * Damping is the spring internal friction, or how much it resists the "boinggggg" effect. Too high and you'll lose it!
     * A number between 1 and 20 is recommended.
     */
    damping: number;
    /**
     * Mass of the camera, if over 120 and it'll be very heavy to move.
     */
    mass: number;
    /**
     * Offset of spring center from target in target object space, ie: Where the camera should ideally be in the target object space.
     */
    positionOffset: Vector3D;
    constructor(targetObject?: DisplayObject, lookAtObject?: DisplayObject, stiffness?: number, mass?: number, damping?: number);
    update(interpolate?: boolean): void;
}
