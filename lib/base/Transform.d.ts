import { EventDispatcher } from "@awayjs/core/lib/events/EventDispatcher";
import { ColorTransform } from "@awayjs/core/lib/geom/ColorTransform";
import { Matrix } from "@awayjs/core/lib/geom/Matrix";
import { Matrix3D } from "@awayjs/core/lib/geom/Matrix3D";
import { Rectangle } from "@awayjs/core/lib/geom/Rectangle";
import { Vector3D } from "@awayjs/core/lib/geom/Vector3D";
import { PerspectiveProjection } from "@awayjs/core/lib/projections/PerspectiveProjection";
import { DisplayObject } from "../display/DisplayObject";
/**
 * The Transform class provides access to color adjustment properties and two-
 * or three-dimensional transformation objects that can be applied to a
 * display object. During the transformation, the color or the orientation and
 * position of a display object is adjusted(offset) from the current values
 * or coordinates to new values or coordinates. The Transform class also
 * collects data about color and two-dimensional matrix transformations that
 * are applied to a display object and all of its parent objects. You can
 * access these combined transformations through the
 * <code>concatenatedColorTransform</code> and <code>concatenatedMatrix</code>
 * properties.
 *
 * <p>To apply color transformations: create a ColorTransform object, set the
 * color adjustments using the object's methods and properties, and then
 * assign the <code>colorTransformation</code> property of the
 * <code>transform</code> property of the display object to the new
 * ColorTransformation object.</p>
 *
 * <p>To apply two-dimensional transformations: create a Matrix object, set
 * the matrix's two-dimensional transformation, and then assign the
 * <code>transform.matrix</code> property of the display object to the new
 * Matrix object.</p>
 *
 * <p>To apply three-dimensional transformations: start with a
 * three-dimensional display object. A three-dimensional display object has a
 * <code>z</code> property value other than zero. You do not need to create
 * the Matrix3D object. For all three-dimensional objects, a Matrix3D object
 * is created automatically when you assign a <code>z</code> value to a
 * display object. You can access the display object's Matrix3D object through
 * the display object's <code>transform</code> property. Using the methods of
 * the Matrix3D class, you can add to or modify the existing transformation
 * settings. Also, you can create a custom Matrix3D object, set the custom
 * Matrix3D object's transformation elements, and then assign the new Matrix3D
 * object to the display object using the <code>transform.matrix</code>
 * property.</p>
 *
 * <p>To modify a perspective projection of the stage or root object: use the
 * <code>transform.matrix</code> property of the root display object to gain
 * access to the PerspectiveProjection object. Or, apply different perspective
 * projection properties to a display object by setting the perspective
 * projection properties of the display object's parent. The child display
 * object inherits the new properties. Specifically, create a
 * PerspectiveProjection object and set its properties, then assign the
 * PerspectiveProjection object to the <code>perspectiveProjection</code>
 * property of the parent display object's <code>transform</code> property.
 * The specified projection transformation then applies to all the display
 * object's three-dimensional children.</p>
 *
 * <p>Since both PerspectiveProjection and Matrix3D objects perform
 * perspective transformations, do not assign both to a display object at the
 * same time. Use the PerspectiveProjection object for focal length and
 * projection center changes. For more control over the perspective
 * transformation, create a perspective projection Matrix3D object.</p>
 */
export declare class Transform extends EventDispatcher {
    private _concatenatedColorTransform;
    private _concatenatedMatrix;
    private _pixelBounds;
    private _colorTransform;
    private _matrix3D;
    private _matrix3DDirty;
    private _rotation;
    private _skew;
    private _scale;
    private _components;
    private _componentsDirty;
    /**
     *
     */
    readonly backVector: Vector3D;
    /**
     * A ColorTransform object containing values that universally adjust the
     * colors in the display object.
     *
     * @throws TypeError The colorTransform is null when being set
     */
    colorTransform: ColorTransform;
    /**
     * A ColorTransform object representing the combined color transformations
     * applied to the display object and all of its parent objects, back to the
     * root level. If different color transformations have been applied at
     * different levels, all of those transformations are concatenated into one
     * ColorTransform object for this property.
     */
    readonly concatenatedColorTransform: ColorTransform;
    /**
     * A Matrix object representing the combined transformation matrixes of the
     * display object and all of its parent objects, back to the root level. If
     * different transformation matrixes have been applied at different levels,
     * all of those matrixes are concatenated into one matrix for this property.
     * Also, for resizeable SWF content running in the browser, this property
     * factors in the difference between stage coordinates and window coordinates
     * due to window resizing. Thus, the property converts local coordinates to
     * window coordinates, which may not be the same coordinate space as that of
     * the Scene.
     */
    readonly concatenatedMatrix: Matrix;
    /**
     *
     */
    readonly downVector: Vector3D;
    /**
     *
     */
    readonly forwardVector: Vector3D;
    /**
     *
     */
    readonly leftVector: Vector3D;
    /**
     * A Matrix object containing values that alter the scaling, rotation, and
     * translation of the display object.
     *
     * <p>If the <code>matrix</code> property is set to a value(not
     * <code>null</code>), the <code>matrix3D</code> property is
     * <code>null</code>. And if the <code>matrix3D</code> property is set to a
     * value(not <code>null</code>), the <code>matrix</code> property is
     * <code>null</code>.</p>
     *
     * @throws TypeError The matrix is null when being set
     */
    matrix: Matrix;
    /**
     * Provides access to the Matrix3D object of a three-dimensional display
     * object. The Matrix3D object represents a transformation matrix that
     * determines the display object's position and orientation. A Matrix3D
     * object can also perform perspective projection.
     *
     * <p>If the <code>matrix</code> property is set to a value(not
     * <code>null</code>), the <code>matrix3D</code> property is
     * <code>null</code>. And if the <code>matrix3D</code> property is set to a
     * value(not <code>null</code>), the <code>matrix</code> property is
     * <code>null</code>.</p>
     */
    matrix3D: Matrix3D;
    /**
     * Provides access to the PerspectiveProjection object of a three-dimensional
     * display object. The PerspectiveProjection object can be used to modify the
     * perspective transformation of the stage or to assign a perspective
     * transformation to all the three-dimensional children of a display object.
     *
     * <p>Based on the field of view and aspect ratio(dimensions) of the stage,
     * a default PerspectiveProjection object is assigned to the root object.</p>
     */
    perspectiveProjection: PerspectiveProjection;
    /**
     * A Rectangle object that defines the bounding rectangle of the display
     * object on the stage.
     */
    readonly pixelBounds: Rectangle;
    /**
     * Defines the position of the 3d object, relative to the local coordinates of the parent <code>ObjectContainer3D</code>.
     */
    readonly position: Vector3D;
    /**
     *
     */
    readonly rightVector: Vector3D;
    /**
     * Defines the rotation of the 3d object, relative to the local coordinates of the parent <code>ObjectContainer3D</code>.
     */
    readonly rotation: Vector3D;
    /**
     * Rotates the 3d object directly to a euler angle
     *
     * @param    ax        The angle in degrees of the rotation around the x axis.
     * @param    ay        The angle in degrees of the rotation around the y axis.
     * @param    az        The angle in degrees of the rotation around the z axis.
     */
    rotateTo(ax: number, ay: number, az: number): void;
    /**
     * Defines the scale of the 3d object, relative to the local coordinates of the parent <code>ObjectContainer3D</code>.
     */
    readonly scale: Vector3D;
    scaleTo(sx: number, sy: number, sz: number): void;
    /**
     * Defines the scale of the 3d object, relative to the local coordinates of the parent <code>ObjectContainer3D</code>.
     */
    readonly skew: Vector3D;
    skewTo(sx: number, sy: number, sz: number): void;
    /**
     *
     */
    readonly upVector: Vector3D;
    constructor();
    dispose(): void;
    /**
     * Returns a Matrix3D object, which can transform the space of a specified
     * display object in relation to the current display object's space. You can
     * use the <code>getRelativeMatrix3D()</code> method to move one
     * three-dimensional display object relative to another three-dimensional
     * display object.
     *
     * @param relativeTo The display object relative to which the transformation
     *                   occurs. To get a Matrix3D object relative to the stage,
     *                   set the parameter to the <code>root</code> or
     *                   <code>stage</code> object. To get the world-relative
     *                   matrix of the display object, set the parameter to a
     *                   display object that has a perspective transformation
     *                   applied to it.
     * @return A Matrix3D object that can be used to transform the space from the
     *         <code>relativeTo</code> display object to the current display
     *         object space.
     */
    getRelativeMatrix3D(relativeTo: DisplayObject): Matrix3D;
    /**
     * Moves the 3d object forwards along it's local z axis
     *
     * @param    distance    The length of the movement
     */
    moveForward(distance: number): void;
    /**
     * Moves the 3d object backwards along it's local z axis
     *
     * @param    distance    The length of the movement
     */
    moveBackward(distance: number): void;
    /**
     * Moves the 3d object backwards along it's local x axis
     *
     * @param    distance    The length of the movement
     */
    moveLeft(distance: number): void;
    /**
     * Moves the 3d object forwards along it's local x axis
     *
     * @param    distance    The length of the movement
     */
    moveRight(distance: number): void;
    /**
     * Moves the 3d object forwards along it's local y axis
     *
     * @param    distance    The length of the movement
     */
    moveUp(distance: number): void;
    /**
     * Moves the 3d object backwards along it's local y axis
     *
     * @param    distance    The length of the movement
     */
    moveDown(distance: number): void;
    /**
     * Moves the 3d object directly to a point in space
     *
     * @param    dx        The amount of movement along the local x axis.
     * @param    dy        The amount of movement along the local y axis.
     * @param    dz        The amount of movement along the local z axis.
     */
    moveTo(dx: number, dy: number, dz: number): void;
    /**
     * Rotates the 3d object around it's local x-axis
     *
     * @param    angle        The amount of rotation in degrees
     */
    pitch(angle: number): void;
    /**
     * Rotates the 3d object around it's local z-axis
     *
     * @param    angle        The amount of rotation in degrees
     */
    roll(angle: number): void;
    /**
     * Rotates the 3d object around it's local y-axis
     *
     * @param    angle        The amount of rotation in degrees
     */
    yaw(angle: number): void;
    /**
     * Rotates the 3d object around an axis by a defined angle
     *
     * @param    axis        The vector defining the axis of rotation
     * @param    angle        The amount of rotation in degrees
     */
    rotate(axis: Vector3D, angle: number): void;
    /**
     * Moves the 3d object along a vector by a defined length
     *
     * @param    axis        The vector defining the axis of movement
     * @param    distance    The length of the movement
     */
    translate(axis: Vector3D, distance: number): void;
    /**
     * Moves the 3d object along a vector by a defined length
     *
     * @param    axis        The vector defining the axis of movement
     * @param    distance    The length of the movement
     */
    translateLocal(axis: Vector3D, distance: number): void;
    clearMatrix3D(): void;
    clearColorTransform(): void;
    /**
     * Invalidates the 3D transformation matrix, causing it to be updated upon the next request
     *
     * @private
     */
    invalidateMatrix3D(): void;
    invalidateComponents(): void;
    /**
     *
     */
    invalidatePosition(): void;
    invalidateColorTransform(): void;
    /**
     *
     */
    private _updateMatrix3D();
    private _updateComponents();
}
