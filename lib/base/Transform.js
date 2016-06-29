"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventDispatcher_1 = require("@awayjs/core/lib/events/EventDispatcher");
var Matrix3D_1 = require("@awayjs/core/lib/geom/Matrix3D");
var Matrix3DUtils_1 = require("@awayjs/core/lib/geom/Matrix3DUtils");
var Vector3D_1 = require("@awayjs/core/lib/geom/Vector3D");
var TransformEvent_1 = require("../events/TransformEvent");
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
var Transform = (function (_super) {
    __extends(Transform, _super);
    function Transform() {
        _super.call(this);
        this._matrix3D = new Matrix3D_1.Matrix3D();
        this._rotation = new Vector3D_1.Vector3D();
        this._skew = new Vector3D_1.Vector3D();
        this._scale = new Vector3D_1.Vector3D(1, 1, 1);
        // Cached vector of transformation components used when
        // recomposing the transform matrix in updateTransform()
        this._components = new Array(4);
        this._components[1] = this._rotation;
        this._components[2] = this._skew;
        this._components[3] = this._scale;
    }
    Object.defineProperty(Transform.prototype, "backVector", {
        /**
         *
         */
        get: function () {
            var director = Matrix3DUtils_1.Matrix3DUtils.getForward(this._matrix3D);
            director.negate();
            return director;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "colorTransform", {
        /**
         * A ColorTransform object containing values that universally adjust the
         * colors in the display object.
         *
         * @throws TypeError The colorTransform is null when being set
         */
        get: function () {
            return this._colorTransform;
        },
        set: function (val) {
            if (this._colorTransform == val)
                return;
            this._colorTransform = val;
            this.invalidateColorTransform();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "concatenatedColorTransform", {
        /**
         * A ColorTransform object representing the combined color transformations
         * applied to the display object and all of its parent objects, back to the
         * root level. If different color transformations have been applied at
         * different levels, all of those transformations are concatenated into one
         * ColorTransform object for this property.
         */
        get: function () {
            return this._concatenatedColorTransform; //TODO
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "concatenatedMatrix", {
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
        get: function () {
            return this._concatenatedMatrix; //TODO
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "downVector", {
        /**
         *
         */
        get: function () {
            var director = Matrix3DUtils_1.Matrix3DUtils.getUp(this._matrix3D);
            director.negate();
            return director;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "forwardVector", {
        /**
         *
         */
        get: function () {
            return Matrix3DUtils_1.Matrix3DUtils.getForward(this._matrix3D);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "leftVector", {
        /**
         *
         */
        get: function () {
            var director = Matrix3DUtils_1.Matrix3DUtils.getRight(this._matrix3D);
            director.negate();
            return director;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "matrix3D", {
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
        get: function () {
            if (this._matrix3DDirty)
                this._updateMatrix3D();
            return this._matrix3D;
        },
        set: function (val) {
            for (var i = 0; i < 15; i++)
                this._matrix3D.rawData[i] = val.rawData[i];
            this.invalidateComponents();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "pixelBounds", {
        /**
         * A Rectangle object that defines the bounding rectangle of the display
         * object on the stage.
         */
        get: function () {
            return this._pixelBounds;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "position", {
        /**
         * Defines the position of the 3d object, relative to the local coordinates of the parent <code>ObjectContainer3D</code>.
         */
        get: function () {
            return this._matrix3D.position;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "rightVector", {
        /**
         *
         */
        get: function () {
            return Matrix3DUtils_1.Matrix3DUtils.getRight(this.matrix3D);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "rotation", {
        /**
         * Defines the rotation of the 3d object, relative to the local coordinates of the parent <code>ObjectContainer3D</code>.
         */
        get: function () {
            if (this._componentsDirty)
                this._updateComponents();
            return this._rotation;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Rotates the 3d object directly to a euler angle
     *
     * @param    ax        The angle in degrees of the rotation around the x axis.
     * @param    ay        The angle in degrees of the rotation around the y axis.
     * @param    az        The angle in degrees of the rotation around the z axis.
     */
    Transform.prototype.rotateTo = function (ax, ay, az) {
        if (this._componentsDirty)
            this._updateComponents();
        this._rotation.x = ax;
        this._rotation.y = ay;
        this._rotation.z = az;
        this.invalidateMatrix3D();
    };
    Object.defineProperty(Transform.prototype, "scale", {
        /**
         * Defines the scale of the 3d object, relative to the local coordinates of the parent <code>ObjectContainer3D</code>.
         */
        get: function () {
            if (this._componentsDirty)
                this._updateComponents();
            return this._scale;
        },
        enumerable: true,
        configurable: true
    });
    Transform.prototype.scaleTo = function (sx, sy, sz) {
        if (this._componentsDirty)
            this._updateComponents();
        this._scale.x = sx;
        this._scale.y = sy;
        this._scale.z = sz;
        this.invalidateMatrix3D();
    };
    Object.defineProperty(Transform.prototype, "skew", {
        /**
         * Defines the scale of the 3d object, relative to the local coordinates of the parent <code>ObjectContainer3D</code>.
         */
        get: function () {
            if (this._componentsDirty)
                this._updateComponents();
            return this._skew;
        },
        enumerable: true,
        configurable: true
    });
    Transform.prototype.skewTo = function (sx, sy, sz) {
        if (this._componentsDirty)
            this._updateComponents();
        this._skew.x = sx;
        this._skew.y = sy;
        this._skew.z = sz;
        this.invalidateMatrix3D();
    };
    Object.defineProperty(Transform.prototype, "upVector", {
        /**
         *
         */
        get: function () {
            return Matrix3DUtils_1.Matrix3DUtils.getUp(this.matrix3D);
        },
        enumerable: true,
        configurable: true
    });
    Transform.prototype.dispose = function () {
    };
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
    Transform.prototype.getRelativeMatrix3D = function (relativeTo) {
        return new Matrix3D_1.Matrix3D(); //TODO
    };
    /**
     * Moves the 3d object forwards along it's local z axis
     *
     * @param    distance    The length of the movement
     */
    Transform.prototype.moveForward = function (distance) {
        this.translateLocal(Vector3D_1.Vector3D.Z_AXIS, distance);
    };
    /**
     * Moves the 3d object backwards along it's local z axis
     *
     * @param    distance    The length of the movement
     */
    Transform.prototype.moveBackward = function (distance) {
        this.translateLocal(Vector3D_1.Vector3D.Z_AXIS, -distance);
    };
    /**
     * Moves the 3d object backwards along it's local x axis
     *
     * @param    distance    The length of the movement
     */
    Transform.prototype.moveLeft = function (distance) {
        this.translateLocal(Vector3D_1.Vector3D.X_AXIS, -distance);
    };
    /**
     * Moves the 3d object forwards along it's local x axis
     *
     * @param    distance    The length of the movement
     */
    Transform.prototype.moveRight = function (distance) {
        this.translateLocal(Vector3D_1.Vector3D.X_AXIS, distance);
    };
    /**
     * Moves the 3d object forwards along it's local y axis
     *
     * @param    distance    The length of the movement
     */
    Transform.prototype.moveUp = function (distance) {
        this.translateLocal(Vector3D_1.Vector3D.Y_AXIS, distance);
    };
    /**
     * Moves the 3d object backwards along it's local y axis
     *
     * @param    distance    The length of the movement
     */
    Transform.prototype.moveDown = function (distance) {
        this.translateLocal(Vector3D_1.Vector3D.Y_AXIS, -distance);
    };
    /**
     * Moves the 3d object directly to a point in space
     *
     * @param    dx        The amount of movement along the local x axis.
     * @param    dy        The amount of movement along the local y axis.
     * @param    dz        The amount of movement along the local z axis.
     */
    Transform.prototype.moveTo = function (dx, dy, dz) {
        this._matrix3D.rawData[12] = dx;
        this._matrix3D.rawData[13] = dy;
        this._matrix3D.rawData[14] = dz;
        this.invalidatePosition();
    };
    /**
     * Rotates the 3d object around it's local x-axis
     *
     * @param    angle        The amount of rotation in degrees
     */
    Transform.prototype.pitch = function (angle) {
        this.rotate(Vector3D_1.Vector3D.X_AXIS, angle);
    };
    /**
     * Rotates the 3d object around it's local z-axis
     *
     * @param    angle        The amount of rotation in degrees
     */
    Transform.prototype.roll = function (angle) {
        this.rotate(Vector3D_1.Vector3D.Z_AXIS, angle);
    };
    /**
     * Rotates the 3d object around it's local y-axis
     *
     * @param    angle        The amount of rotation in degrees
     */
    Transform.prototype.yaw = function (angle) {
        this.rotate(Vector3D_1.Vector3D.Y_AXIS, angle);
    };
    /**
     * Rotates the 3d object around an axis by a defined angle
     *
     * @param    axis        The vector defining the axis of rotation
     * @param    angle        The amount of rotation in degrees
     */
    Transform.prototype.rotate = function (axis, angle) {
        this.matrix3D.prependRotation(angle, axis);
        this.invalidateComponents();
    };
    /**
     * Moves the 3d object along a vector by a defined length
     *
     * @param    axis        The vector defining the axis of movement
     * @param    distance    The length of the movement
     */
    Transform.prototype.translate = function (axis, distance) {
        var x = axis.x, y = axis.y, z = axis.z;
        var len = distance / Math.sqrt(x * x + y * y + z * z);
        this.matrix3D.appendTranslation(x * len, y * len, z * len);
        this.invalidatePosition();
    };
    /**
     * Moves the 3d object along a vector by a defined length
     *
     * @param    axis        The vector defining the axis of movement
     * @param    distance    The length of the movement
     */
    Transform.prototype.translateLocal = function (axis, distance) {
        var x = axis.x, y = axis.y, z = axis.z;
        var len = distance / Math.sqrt(x * x + y * y + z * z);
        this.matrix3D.prependTranslation(x * len, y * len, z * len);
        this.invalidatePosition();
    };
    Transform.prototype.clearMatrix3D = function () {
        this._matrix3D.identity();
        this.invalidateComponents();
    };
    Transform.prototype.clearColorTransform = function () {
        if (!this._colorTransform)
            return;
        this._colorTransform.clear();
        this.invalidateColorTransform();
    };
    /**
     * Invalidates the 3D transformation matrix, causing it to be updated upon the next request
     *
     * @private
     */
    Transform.prototype.invalidateMatrix3D = function () {
        this._matrix3DDirty = true;
        this.dispatchEvent(new TransformEvent_1.TransformEvent(TransformEvent_1.TransformEvent.INVALIDATE_MATRIX3D, this));
    };
    Transform.prototype.invalidateComponents = function () {
        this.invalidatePosition();
        this._componentsDirty = true;
    };
    /**
     *
     */
    Transform.prototype.invalidatePosition = function () {
        this._matrix3D.invalidatePosition();
        this.dispatchEvent(new TransformEvent_1.TransformEvent(TransformEvent_1.TransformEvent.INVALIDATE_MATRIX3D, this));
    };
    Transform.prototype.invalidateColorTransform = function () {
        this.dispatchEvent(new TransformEvent_1.TransformEvent(TransformEvent_1.TransformEvent.INVALIDATE_COLOR_TRANSFORM, this));
    };
    /**
     *
     */
    Transform.prototype._updateMatrix3D = function () {
        this._matrix3D.recompose(this._components);
        this._matrix3DDirty = false;
    };
    Transform.prototype._updateComponents = function () {
        var elements = this._matrix3D.decompose();
        var vec;
        vec = elements[1];
        this._rotation.x = vec.x;
        this._rotation.y = vec.y;
        this._rotation.z = vec.z;
        vec = elements[2];
        this._skew.x = vec.x;
        this._skew.y = vec.y;
        this._skew.z = vec.z;
        vec = elements[3];
        this._scale.x = vec.x;
        this._scale.y = vec.y;
        this._scale.z = vec.z;
        this._componentsDirty = false;
    };
    return Transform;
}(EventDispatcher_1.EventDispatcher));
exports.Transform = Transform;
