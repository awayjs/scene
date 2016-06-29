import { ControllerBase } from "../controllers/ControllerBase";
import { DisplayObject } from "../display/DisplayObject";
/**
 * Extended camera used to hover round a specified target object.
 *
 * @see    away3d.containers.View3D
 */
export declare class FirstPersonController extends ControllerBase {
    _iCurrentPanAngle: number;
    _iCurrentTiltAngle: number;
    private _panAngle;
    private _tiltAngle;
    private _minTiltAngle;
    private _maxTiltAngle;
    private _steps;
    private _walkIncrement;
    private _strafeIncrement;
    private _wrapPanAngle;
    fly: boolean;
    /**
     * Fractional step taken each time the <code>hover()</code> method is called. Defaults to 8.
     *
     * Affects the speed at which the <code>tiltAngle</code> and <code>panAngle</code> resolve to their targets.
     *
     * @see    #tiltAngle
     * @see    #panAngle
     */
    steps: number;
    /**
     * Rotation of the camera in degrees around the y axis. Defaults to 0.
     */
    panAngle: number;
    /**
     * Elevation angle of the camera in degrees. Defaults to 90.
     */
    tiltAngle: number;
    /**
     * Minimum bounds for the <code>tiltAngle</code>. Defaults to -90.
     *
     * @see    #tiltAngle
     */
    minTiltAngle: number;
    /**
     * Maximum bounds for the <code>tiltAngle</code>. Defaults to 90.
     *
     * @see    #tiltAngle
     */
    maxTiltAngle: number;
    /**
     * Defines whether the value of the pan angle wraps when over 360 degrees or under 0 degrees. Defaults to false.
     */
    wrapPanAngle: boolean;
    /**
     * Creates a new <code>HoverController</code> object.
     */
    constructor(targetObject?: DisplayObject, panAngle?: number, tiltAngle?: number, minTiltAngle?: number, maxTiltAngle?: number, steps?: number, wrapPanAngle?: boolean);
    /**
     * Updates the current tilt angle and pan angle values.
     *
     * Values are calculated using the defined <code>tiltAngle</code>, <code>panAngle</code> and <code>steps</code> variables.
     *
     * @param interpolate   If the update to a target pan- or tiltAngle is interpolated. Default is true.
     *
     * @see    #tiltAngle
     * @see    #panAngle
     * @see    #steps
     */
    update(interpolate?: boolean): void;
    incrementWalk(val: number): void;
    incrementStrafe(val: number): void;
}
