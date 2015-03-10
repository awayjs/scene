var Matrix3D = require("awayjs-core/lib/geom/Matrix3D");
var Matrix3DUtils = require("awayjs-core/lib/geom/Matrix3DUtils");
var Vector3D = require("awayjs-core/lib/geom/Vector3D");
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
var Transform = (function () {
    function Transform(displayObject) {
        this._position = new Vector3D();
        this._displayObject = displayObject;
    }
    Object.defineProperty(Transform.prototype, "backVector", {
        /**
         *
         */
        get: function () {
            var director = Matrix3DUtils.getForward(this._displayObject._iMatrix3D);
            director.negate();
            return director;
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
         * the Stage.
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
            var director = Matrix3DUtils.getUp(this._displayObject._iMatrix3D);
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
            return Matrix3DUtils.getForward(this._displayObject._iMatrix3D);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "leftVector", {
        /**
         *
         */
        get: function () {
            var director = Matrix3DUtils.getRight(this._displayObject._iMatrix3D);
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
            return this._displayObject._iMatrix3D;
        },
        set: function (val) {
            this._displayObject._iMatrix3D = val;
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
            return this._displayObject._iMatrix3D.position;
        },
        set: function (value) {
            this._displayObject.x = value.x;
            this._displayObject.y = value.y;
            this._displayObject.z = value.z;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "rightVector", {
        /**
         *
         */
        get: function () {
            return Matrix3DUtils.getRight(this._displayObject._iMatrix3D);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "rotation", {
        /**
         * Defines the rotation of the 3d object, relative to the local coordinates of the parent <code>ObjectContainer3D</code>.
         */
        get: function () {
            return new Vector3D(this._displayObject.rotationX, this._displayObject.rotationY, this._displayObject.rotationZ);
        },
        set: function (value) {
            this._displayObject.rotationX = value.x;
            this._displayObject.rotationY = value.y;
            this._displayObject.rotationZ = value.z;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "scale", {
        /**
         * Defines the scale of the 3d object, relative to the local coordinates of the parent <code>ObjectContainer3D</code>.
         */
        get: function () {
            return new Vector3D(this._displayObject.scaleX, this._displayObject.scaleY, this._displayObject.scaleZ);
        },
        set: function (value) {
            this._displayObject.scaleX = value.x;
            this._displayObject.scaleY = value.y;
            this._displayObject.scaleZ = value.z;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "upVector", {
        /**
         *
         */
        get: function () {
            return Matrix3DUtils.getUp(this._displayObject._iMatrix3D);
        },
        enumerable: true,
        configurable: true
    });
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
        return new Matrix3D(); //TODO
    };
    /**
     * Moves the 3d object forwards along it's local z axis
     *
     * @param    distance    The length of the movement
     */
    Transform.prototype.moveForward = function (distance) {
        this._displayObject.translateLocal(Vector3D.Z_AXIS, distance);
    };
    /**
     * Moves the 3d object backwards along it's local z axis
     *
     * @param    distance    The length of the movement
     */
    Transform.prototype.moveBackward = function (distance) {
        this._displayObject.translateLocal(Vector3D.Z_AXIS, -distance);
    };
    /**
     * Moves the 3d object backwards along it's local x axis
     *
     * @param    distance    The length of the movement
     */
    Transform.prototype.moveLeft = function (distance) {
        this._displayObject.translateLocal(Vector3D.X_AXIS, -distance);
    };
    /**
     * Moves the 3d object forwards along it's local x axis
     *
     * @param    distance    The length of the movement
     */
    Transform.prototype.moveRight = function (distance) {
        this._displayObject.translateLocal(Vector3D.X_AXIS, distance);
    };
    /**
     * Moves the 3d object forwards along it's local y axis
     *
     * @param    distance    The length of the movement
     */
    Transform.prototype.moveUp = function (distance) {
        this._displayObject.translateLocal(Vector3D.Y_AXIS, distance);
    };
    /**
     * Moves the 3d object backwards along it's local y axis
     *
     * @param    distance    The length of the movement
     */
    Transform.prototype.moveDown = function (distance) {
        this._displayObject.translateLocal(Vector3D.Y_AXIS, -distance);
    };
    return Transform;
})();
module.exports = Transform;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL1RyYW5zZm9ybS50cyJdLCJuYW1lcyI6WyJUcmFuc2Zvcm0iLCJUcmFuc2Zvcm0uY29uc3RydWN0b3IiLCJUcmFuc2Zvcm0uYmFja1ZlY3RvciIsIlRyYW5zZm9ybS5jb25jYXRlbmF0ZWRDb2xvclRyYW5zZm9ybSIsIlRyYW5zZm9ybS5jb25jYXRlbmF0ZWRNYXRyaXgiLCJUcmFuc2Zvcm0uZG93blZlY3RvciIsIlRyYW5zZm9ybS5mb3J3YXJkVmVjdG9yIiwiVHJhbnNmb3JtLmxlZnRWZWN0b3IiLCJUcmFuc2Zvcm0ubWF0cml4M0QiLCJUcmFuc2Zvcm0ucGl4ZWxCb3VuZHMiLCJUcmFuc2Zvcm0ucG9zaXRpb24iLCJUcmFuc2Zvcm0ucmlnaHRWZWN0b3IiLCJUcmFuc2Zvcm0ucm90YXRpb24iLCJUcmFuc2Zvcm0uc2NhbGUiLCJUcmFuc2Zvcm0udXBWZWN0b3IiLCJUcmFuc2Zvcm0uZ2V0UmVsYXRpdmVNYXRyaXgzRCIsIlRyYW5zZm9ybS5tb3ZlRm9yd2FyZCIsIlRyYW5zZm9ybS5tb3ZlQmFja3dhcmQiLCJUcmFuc2Zvcm0ubW92ZUxlZnQiLCJUcmFuc2Zvcm0ubW92ZVJpZ2h0IiwiVHJhbnNmb3JtLm1vdmVVcCIsIlRyYW5zZm9ybS5tb3ZlRG93biJdLCJtYXBwaW5ncyI6IkFBRUEsSUFBTyxRQUFRLFdBQWUsK0JBQStCLENBQUMsQ0FBQztBQUMvRCxJQUFPLGFBQWEsV0FBYSxvQ0FBb0MsQ0FBQyxDQUFDO0FBRXZFLElBQU8sUUFBUSxXQUFlLCtCQUErQixDQUFDLENBQUM7QUFLL0QsQUFzREE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBREc7SUFDRyxTQUFTO0lBME1kQSxTQTFNS0EsU0FBU0EsQ0EwTUZBLGFBQTJCQTtRQXBNaENDLGNBQVNBLEdBQVlBLElBQUlBLFFBQVFBLEVBQUVBLENBQUNBO1FBc00xQ0EsSUFBSUEsQ0FBQ0EsY0FBY0EsR0FB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QSxDQUFDQSxjQUFjQSxDQUFDQSxRQUFRQSxDQUFDQSxNQUFNQSxFQUFFQSxRQUFRQSxDQUFDQSxDQUFDQTtJQUMvREEsQ0FBQ0E7SUFFRG5COzs7O09BSUdBO0lBQ0lBLDBCQUFNQSxHQUFiQSxVQUFjQSxRQUFlQTtRQUU1Qm9CLElBQUlBLENBQUNBLGNBQWNBLENBQUNBLGNBQWNBLENBQUNBLFFBQVFBLENBQUNBLE1BQU1BLEVBQUVBLFFBQVFBLENBQUNBLENBQUNBO0lBQy9EQSxDQUFDQTtJQUVEcEI7Ozs7T0FJR0E7SUFDSUEsNEJBQVFBLEdBQWZBLFVBQWdCQSxRQUFlQTtRQUU5QnFCLElBQUlBLENBQUNBLGNBQWNBLENBQUNBLGNBQWNBLENBQUNBLFFBQVFBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBO0lBQ2hFQSxDQUFDQTtJQUNGckIsZ0JBQUNBO0FBQURBLENBblNBLEFBbVNDQSxJQUFBO0FBRUQsQUFBbUIsaUJBQVYsU0FBUyxDQUFDIiwiZmlsZSI6ImJhc2UvVHJhbnNmb3JtLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb2xvclRyYW5zZm9ybVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL0NvbG9yVHJhbnNmb3JtXCIpO1xyXG5pbXBvcnQgTWF0cml4XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL01hdHJpeFwiKTtcclxuaW1wb3J0IE1hdHJpeDNEXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL01hdHJpeDNEXCIpO1xyXG5pbXBvcnQgTWF0cml4M0RVdGlsc1x0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL01hdHJpeDNEVXRpbHNcIik7XHJcbmltcG9ydCBSZWN0YW5nbGVcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1JlY3RhbmdsZVwiKTtcclxuaW1wb3J0IFZlY3RvcjNEXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1ZlY3RvcjNEXCIpO1xyXG5pbXBvcnQgUGVyc3BlY3RpdmVQcm9qZWN0aW9uXHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvcHJvamVjdGlvbnMvUGVyc3BlY3RpdmVQcm9qZWN0aW9uXCIpO1xyXG5cclxuaW1wb3J0IERpc3BsYXlPYmplY3RcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9EaXNwbGF5T2JqZWN0XCIpO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBUcmFuc2Zvcm0gY2xhc3MgcHJvdmlkZXMgYWNjZXNzIHRvIGNvbG9yIGFkanVzdG1lbnQgcHJvcGVydGllcyBhbmQgdHdvLVxyXG4gKiBvciB0aHJlZS1kaW1lbnNpb25hbCB0cmFuc2Zvcm1hdGlvbiBvYmplY3RzIHRoYXQgY2FuIGJlIGFwcGxpZWQgdG8gYVxyXG4gKiBkaXNwbGF5IG9iamVjdC4gRHVyaW5nIHRoZSB0cmFuc2Zvcm1hdGlvbiwgdGhlIGNvbG9yIG9yIHRoZSBvcmllbnRhdGlvbiBhbmRcclxuICogcG9zaXRpb24gb2YgYSBkaXNwbGF5IG9iamVjdCBpcyBhZGp1c3RlZChvZmZzZXQpIGZyb20gdGhlIGN1cnJlbnQgdmFsdWVzXHJcbiAqIG9yIGNvb3JkaW5hdGVzIHRvIG5ldyB2YWx1ZXMgb3IgY29vcmRpbmF0ZXMuIFRoZSBUcmFuc2Zvcm0gY2xhc3MgYWxzb1xyXG4gKiBjb2xsZWN0cyBkYXRhIGFib3V0IGNvbG9yIGFuZCB0d28tZGltZW5zaW9uYWwgbWF0cml4IHRyYW5zZm9ybWF0aW9ucyB0aGF0XHJcbiAqIGFyZSBhcHBsaWVkIHRvIGEgZGlzcGxheSBvYmplY3QgYW5kIGFsbCBvZiBpdHMgcGFyZW50IG9iamVjdHMuIFlvdSBjYW5cclxuICogYWNjZXNzIHRoZXNlIGNvbWJpbmVkIHRyYW5zZm9ybWF0aW9ucyB0aHJvdWdoIHRoZVxyXG4gKiA8Y29kZT5jb25jYXRlbmF0ZWRDb2xvclRyYW5zZm9ybTwvY29kZT4gYW5kIDxjb2RlPmNvbmNhdGVuYXRlZE1hdHJpeDwvY29kZT5cclxuICogcHJvcGVydGllcy5cclxuICpcclxuICogPHA+VG8gYXBwbHkgY29sb3IgdHJhbnNmb3JtYXRpb25zOiBjcmVhdGUgYSBDb2xvclRyYW5zZm9ybSBvYmplY3QsIHNldCB0aGVcclxuICogY29sb3IgYWRqdXN0bWVudHMgdXNpbmcgdGhlIG9iamVjdCdzIG1ldGhvZHMgYW5kIHByb3BlcnRpZXMsIGFuZCB0aGVuXHJcbiAqIGFzc2lnbiB0aGUgPGNvZGU+Y29sb3JUcmFuc2Zvcm1hdGlvbjwvY29kZT4gcHJvcGVydHkgb2YgdGhlXHJcbiAqIDxjb2RlPnRyYW5zZm9ybTwvY29kZT4gcHJvcGVydHkgb2YgdGhlIGRpc3BsYXkgb2JqZWN0IHRvIHRoZSBuZXdcclxuICogQ29sb3JUcmFuc2Zvcm1hdGlvbiBvYmplY3QuPC9wPlxyXG4gKlxyXG4gKiA8cD5UbyBhcHBseSB0d28tZGltZW5zaW9uYWwgdHJhbnNmb3JtYXRpb25zOiBjcmVhdGUgYSBNYXRyaXggb2JqZWN0LCBzZXRcclxuICogdGhlIG1hdHJpeCdzIHR3by1kaW1lbnNpb25hbCB0cmFuc2Zvcm1hdGlvbiwgYW5kIHRoZW4gYXNzaWduIHRoZVxyXG4gKiA8Y29kZT50cmFuc2Zvcm0ubWF0cml4PC9jb2RlPiBwcm9wZXJ0eSBvZiB0aGUgZGlzcGxheSBvYmplY3QgdG8gdGhlIG5ld1xyXG4gKiBNYXRyaXggb2JqZWN0LjwvcD5cclxuICpcclxuICogPHA+VG8gYXBwbHkgdGhyZWUtZGltZW5zaW9uYWwgdHJhbnNmb3JtYXRpb25zOiBzdGFydCB3aXRoIGFcclxuICogdGhyZWUtZGltZW5zaW9uYWwgZGlzcGxheSBvYmplY3QuIEEgdGhyZWUtZGltZW5zaW9uYWwgZGlzcGxheSBvYmplY3QgaGFzIGFcclxuICogPGNvZGU+ejwvY29kZT4gcHJvcGVydHkgdmFsdWUgb3RoZXIgdGhhbiB6ZXJvLiBZb3UgZG8gbm90IG5lZWQgdG8gY3JlYXRlXHJcbiAqIHRoZSBNYXRyaXgzRCBvYmplY3QuIEZvciBhbGwgdGhyZWUtZGltZW5zaW9uYWwgb2JqZWN0cywgYSBNYXRyaXgzRCBvYmplY3RcclxuICogaXMgY3JlYXRlZCBhdXRvbWF0aWNhbGx5IHdoZW4geW91IGFzc2lnbiBhIDxjb2RlPno8L2NvZGU+IHZhbHVlIHRvIGFcclxuICogZGlzcGxheSBvYmplY3QuIFlvdSBjYW4gYWNjZXNzIHRoZSBkaXNwbGF5IG9iamVjdCdzIE1hdHJpeDNEIG9iamVjdCB0aHJvdWdoXHJcbiAqIHRoZSBkaXNwbGF5IG9iamVjdCdzIDxjb2RlPnRyYW5zZm9ybTwvY29kZT4gcHJvcGVydHkuIFVzaW5nIHRoZSBtZXRob2RzIG9mXHJcbiAqIHRoZSBNYXRyaXgzRCBjbGFzcywgeW91IGNhbiBhZGQgdG8gb3IgbW9kaWZ5IHRoZSBleGlzdGluZyB0cmFuc2Zvcm1hdGlvblxyXG4gKiBzZXR0aW5ncy4gQWxzbywgeW91IGNhbiBjcmVhdGUgYSBjdXN0b20gTWF0cml4M0Qgb2JqZWN0LCBzZXQgdGhlIGN1c3RvbVxyXG4gKiBNYXRyaXgzRCBvYmplY3QncyB0cmFuc2Zvcm1hdGlvbiBlbGVtZW50cywgYW5kIHRoZW4gYXNzaWduIHRoZSBuZXcgTWF0cml4M0RcclxuICogb2JqZWN0IHRvIHRoZSBkaXNwbGF5IG9iamVjdCB1c2luZyB0aGUgPGNvZGU+dHJhbnNmb3JtLm1hdHJpeDwvY29kZT5cclxuICogcHJvcGVydHkuPC9wPlxyXG4gKlxyXG4gKiA8cD5UbyBtb2RpZnkgYSBwZXJzcGVjdGl2ZSBwcm9qZWN0aW9uIG9mIHRoZSBzdGFnZSBvciByb290IG9iamVjdDogdXNlIHRoZVxyXG4gKiA8Y29kZT50cmFuc2Zvcm0ubWF0cml4PC9jb2RlPiBwcm9wZXJ0eSBvZiB0aGUgcm9vdCBkaXNwbGF5IG9iamVjdCB0byBnYWluXHJcbiAqIGFjY2VzcyB0byB0aGUgUGVyc3BlY3RpdmVQcm9qZWN0aW9uIG9iamVjdC4gT3IsIGFwcGx5IGRpZmZlcmVudCBwZXJzcGVjdGl2ZVxyXG4gKiBwcm9qZWN0aW9uIHByb3BlcnRpZXMgdG8gYSBkaXNwbGF5IG9iamVjdCBieSBzZXR0aW5nIHRoZSBwZXJzcGVjdGl2ZVxyXG4gKiBwcm9qZWN0aW9uIHByb3BlcnRpZXMgb2YgdGhlIGRpc3BsYXkgb2JqZWN0J3MgcGFyZW50LiBUaGUgY2hpbGQgZGlzcGxheVxyXG4gKiBvYmplY3QgaW5oZXJpdHMgdGhlIG5ldyBwcm9wZXJ0aWVzLiBTcGVjaWZpY2FsbHksIGNyZWF0ZSBhXHJcbiAqIFBlcnNwZWN0aXZlUHJvamVjdGlvbiBvYmplY3QgYW5kIHNldCBpdHMgcHJvcGVydGllcywgdGhlbiBhc3NpZ24gdGhlXHJcbiAqIFBlcnNwZWN0aXZlUHJvamVjdGlvbiBvYmplY3QgdG8gdGhlIDxjb2RlPnBlcnNwZWN0aXZlUHJvamVjdGlvbjwvY29kZT5cclxuICogcHJvcGVydHkgb2YgdGhlIHBhcmVudCBkaXNwbGF5IG9iamVjdCdzIDxjb2RlPnRyYW5zZm9ybTwvY29kZT4gcHJvcGVydHkuXHJcbiAqIFRoZSBzcGVjaWZpZWQgcHJvamVjdGlvbiB0cmFuc2Zvcm1hdGlvbiB0aGVuIGFwcGxpZXMgdG8gYWxsIHRoZSBkaXNwbGF5XHJcbiAqIG9iamVjdCdzIHRocmVlLWRpbWVuc2lvbmFsIGNoaWxkcmVuLjwvcD5cclxuICpcclxuICogPHA+U2luY2UgYm90aCBQZXJzcGVjdGl2ZVByb2plY3Rpb24gYW5kIE1hdHJpeDNEIG9iamVjdHMgcGVyZm9ybVxyXG4gKiBwZXJzcGVjdGl2ZSB0cmFuc2Zvcm1hdGlvbnMsIGRvIG5vdCBhc3NpZ24gYm90aCB0byBhIGRpc3BsYXkgb2JqZWN0IGF0IHRoZVxyXG4gKiBzYW1lIHRpbWUuIFVzZSB0aGUgUGVyc3BlY3RpdmVQcm9qZWN0aW9uIG9iamVjdCBmb3IgZm9jYWwgbGVuZ3RoIGFuZFxyXG4gKiBwcm9qZWN0aW9uIGNlbnRlciBjaGFuZ2VzLiBGb3IgbW9yZSBjb250cm9sIG92ZXIgdGhlIHBlcnNwZWN0aXZlXHJcbiAqIHRyYW5zZm9ybWF0aW9uLCBjcmVhdGUgYSBwZXJzcGVjdGl2ZSBwcm9qZWN0aW9uIE1hdHJpeDNEIG9iamVjdC48L3A+XHJcbiAqL1xyXG5jbGFzcyBUcmFuc2Zvcm1cclxue1xyXG5cdHByaXZhdGUgX2Rpc3BsYXlPYmplY3Q6RGlzcGxheU9iamVjdDtcclxuXHRwcml2YXRlIF9jb25jYXRlbmF0ZWRDb2xvclRyYW5zZm9ybTpDb2xvclRyYW5zZm9ybTtcclxuXHRwcml2YXRlIF9jb25jYXRlbmF0ZWRNYXRyaXg6TWF0cml4O1xyXG5cdHByaXZhdGUgX3BpeGVsQm91bmRzOlJlY3RhbmdsZTtcclxuXHRwdWJsaWMgX3Bvc2l0aW9uOlZlY3RvcjNEID0gbmV3IFZlY3RvcjNEKCk7XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCBiYWNrVmVjdG9yKCk6VmVjdG9yM0RcclxuXHR7XHJcblx0XHR2YXIgZGlyZWN0b3I6VmVjdG9yM0QgPSBNYXRyaXgzRFV0aWxzLmdldEZvcndhcmQodGhpcy5fZGlzcGxheU9iamVjdC5faU1hdHJpeDNEKTtcclxuXHRcdGRpcmVjdG9yLm5lZ2F0ZSgpO1xyXG5cclxuXHRcdHJldHVybiBkaXJlY3RvcjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEEgQ29sb3JUcmFuc2Zvcm0gb2JqZWN0IGNvbnRhaW5pbmcgdmFsdWVzIHRoYXQgdW5pdmVyc2FsbHkgYWRqdXN0IHRoZVxyXG5cdCAqIGNvbG9ycyBpbiB0aGUgZGlzcGxheSBvYmplY3QuXHJcblx0ICogXHJcblx0ICogQHRocm93cyBUeXBlRXJyb3IgVGhlIGNvbG9yVHJhbnNmb3JtIGlzIG51bGwgd2hlbiBiZWluZyBzZXRcclxuXHQgKi9cclxuXHRwdWJsaWMgY29sb3JUcmFuc2Zvcm06Q29sb3JUcmFuc2Zvcm07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEEgQ29sb3JUcmFuc2Zvcm0gb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgY29tYmluZWQgY29sb3IgdHJhbnNmb3JtYXRpb25zXHJcblx0ICogYXBwbGllZCB0byB0aGUgZGlzcGxheSBvYmplY3QgYW5kIGFsbCBvZiBpdHMgcGFyZW50IG9iamVjdHMsIGJhY2sgdG8gdGhlXHJcblx0ICogcm9vdCBsZXZlbC4gSWYgZGlmZmVyZW50IGNvbG9yIHRyYW5zZm9ybWF0aW9ucyBoYXZlIGJlZW4gYXBwbGllZCBhdFxyXG5cdCAqIGRpZmZlcmVudCBsZXZlbHMsIGFsbCBvZiB0aG9zZSB0cmFuc2Zvcm1hdGlvbnMgYXJlIGNvbmNhdGVuYXRlZCBpbnRvIG9uZVxyXG5cdCAqIENvbG9yVHJhbnNmb3JtIG9iamVjdCBmb3IgdGhpcyBwcm9wZXJ0eS5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGNvbmNhdGVuYXRlZENvbG9yVHJhbnNmb3JtKCk6Q29sb3JUcmFuc2Zvcm1cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fY29uY2F0ZW5hdGVkQ29sb3JUcmFuc2Zvcm07IC8vVE9ET1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQSBNYXRyaXggb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgY29tYmluZWQgdHJhbnNmb3JtYXRpb24gbWF0cml4ZXMgb2YgdGhlXHJcblx0ICogZGlzcGxheSBvYmplY3QgYW5kIGFsbCBvZiBpdHMgcGFyZW50IG9iamVjdHMsIGJhY2sgdG8gdGhlIHJvb3QgbGV2ZWwuIElmXHJcblx0ICogZGlmZmVyZW50IHRyYW5zZm9ybWF0aW9uIG1hdHJpeGVzIGhhdmUgYmVlbiBhcHBsaWVkIGF0IGRpZmZlcmVudCBsZXZlbHMsXHJcblx0ICogYWxsIG9mIHRob3NlIG1hdHJpeGVzIGFyZSBjb25jYXRlbmF0ZWQgaW50byBvbmUgbWF0cml4IGZvciB0aGlzIHByb3BlcnR5LlxyXG5cdCAqIEFsc28sIGZvciByZXNpemVhYmxlIFNXRiBjb250ZW50IHJ1bm5pbmcgaW4gdGhlIGJyb3dzZXIsIHRoaXMgcHJvcGVydHlcclxuXHQgKiBmYWN0b3JzIGluIHRoZSBkaWZmZXJlbmNlIGJldHdlZW4gc3RhZ2UgY29vcmRpbmF0ZXMgYW5kIHdpbmRvdyBjb29yZGluYXRlc1xyXG5cdCAqIGR1ZSB0byB3aW5kb3cgcmVzaXppbmcuIFRodXMsIHRoZSBwcm9wZXJ0eSBjb252ZXJ0cyBsb2NhbCBjb29yZGluYXRlcyB0b1xyXG5cdCAqIHdpbmRvdyBjb29yZGluYXRlcywgd2hpY2ggbWF5IG5vdCBiZSB0aGUgc2FtZSBjb29yZGluYXRlIHNwYWNlIGFzIHRoYXQgb2ZcclxuXHQgKiB0aGUgU3RhZ2UuXHJcblx0ICovXHJcblx0cHVibGljIGdldCBjb25jYXRlbmF0ZWRNYXRyaXgoKTpNYXRyaXhcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fY29uY2F0ZW5hdGVkTWF0cml4OyAvL1RPRE9cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCBkb3duVmVjdG9yKCk6VmVjdG9yM0RcclxuXHR7XHJcblx0XHR2YXIgZGlyZWN0b3I6VmVjdG9yM0QgPSBNYXRyaXgzRFV0aWxzLmdldFVwKHRoaXMuX2Rpc3BsYXlPYmplY3QuX2lNYXRyaXgzRCk7XHJcblx0XHRkaXJlY3Rvci5uZWdhdGUoKTtcclxuXHJcblx0XHRyZXR1cm4gZGlyZWN0b3I7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgZm9yd2FyZFZlY3RvcigpOlZlY3RvcjNEXHJcblx0e1xyXG5cdFx0cmV0dXJuIE1hdHJpeDNEVXRpbHMuZ2V0Rm9yd2FyZCh0aGlzLl9kaXNwbGF5T2JqZWN0Ll9pTWF0cml4M0QpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGxlZnRWZWN0b3IoKTpWZWN0b3IzRFxyXG5cdHtcclxuXHRcdHZhciBkaXJlY3RvcjpWZWN0b3IzRCA9IE1hdHJpeDNEVXRpbHMuZ2V0UmlnaHQodGhpcy5fZGlzcGxheU9iamVjdC5faU1hdHJpeDNEKTtcclxuXHRcdGRpcmVjdG9yLm5lZ2F0ZSgpO1xyXG5cclxuXHRcdHJldHVybiBkaXJlY3RvcjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEEgTWF0cml4IG9iamVjdCBjb250YWluaW5nIHZhbHVlcyB0aGF0IGFsdGVyIHRoZSBzY2FsaW5nLCByb3RhdGlvbiwgYW5kXHJcblx0ICogdHJhbnNsYXRpb24gb2YgdGhlIGRpc3BsYXkgb2JqZWN0LlxyXG5cdCAqXHJcblx0ICogPHA+SWYgdGhlIDxjb2RlPm1hdHJpeDwvY29kZT4gcHJvcGVydHkgaXMgc2V0IHRvIGEgdmFsdWUobm90XHJcblx0ICogPGNvZGU+bnVsbDwvY29kZT4pLCB0aGUgPGNvZGU+bWF0cml4M0Q8L2NvZGU+IHByb3BlcnR5IGlzXHJcblx0ICogPGNvZGU+bnVsbDwvY29kZT4uIEFuZCBpZiB0aGUgPGNvZGU+bWF0cml4M0Q8L2NvZGU+IHByb3BlcnR5IGlzIHNldCB0byBhXHJcblx0ICogdmFsdWUobm90IDxjb2RlPm51bGw8L2NvZGU+KSwgdGhlIDxjb2RlPm1hdHJpeDwvY29kZT4gcHJvcGVydHkgaXNcclxuXHQgKiA8Y29kZT5udWxsPC9jb2RlPi48L3A+XHJcblx0ICogXHJcblx0ICogQHRocm93cyBUeXBlRXJyb3IgVGhlIG1hdHJpeCBpcyBudWxsIHdoZW4gYmVpbmcgc2V0XHJcblx0ICovXHJcblx0cHVibGljIG1hdHJpeDpNYXRyaXg7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFByb3ZpZGVzIGFjY2VzcyB0byB0aGUgTWF0cml4M0Qgb2JqZWN0IG9mIGEgdGhyZWUtZGltZW5zaW9uYWwgZGlzcGxheVxyXG5cdCAqIG9iamVjdC4gVGhlIE1hdHJpeDNEIG9iamVjdCByZXByZXNlbnRzIGEgdHJhbnNmb3JtYXRpb24gbWF0cml4IHRoYXRcclxuXHQgKiBkZXRlcm1pbmVzIHRoZSBkaXNwbGF5IG9iamVjdCdzIHBvc2l0aW9uIGFuZCBvcmllbnRhdGlvbi4gQSBNYXRyaXgzRFxyXG5cdCAqIG9iamVjdCBjYW4gYWxzbyBwZXJmb3JtIHBlcnNwZWN0aXZlIHByb2plY3Rpb24uXHJcblx0ICpcclxuXHQgKiA8cD5JZiB0aGUgPGNvZGU+bWF0cml4PC9jb2RlPiBwcm9wZXJ0eSBpcyBzZXQgdG8gYSB2YWx1ZShub3RcclxuXHQgKiA8Y29kZT5udWxsPC9jb2RlPiksIHRoZSA8Y29kZT5tYXRyaXgzRDwvY29kZT4gcHJvcGVydHkgaXNcclxuXHQgKiA8Y29kZT5udWxsPC9jb2RlPi4gQW5kIGlmIHRoZSA8Y29kZT5tYXRyaXgzRDwvY29kZT4gcHJvcGVydHkgaXMgc2V0IHRvIGFcclxuXHQgKiB2YWx1ZShub3QgPGNvZGU+bnVsbDwvY29kZT4pLCB0aGUgPGNvZGU+bWF0cml4PC9jb2RlPiBwcm9wZXJ0eSBpc1xyXG5cdCAqIDxjb2RlPm51bGw8L2NvZGU+LjwvcD5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IG1hdHJpeDNEKCk6TWF0cml4M0RcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fZGlzcGxheU9iamVjdC5faU1hdHJpeDNEO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBtYXRyaXgzRCh2YWw6TWF0cml4M0QpXHJcblx0e1xyXG5cdFx0dGhpcy5fZGlzcGxheU9iamVjdC5faU1hdHJpeDNEID0gdmFsO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUHJvdmlkZXMgYWNjZXNzIHRvIHRoZSBQZXJzcGVjdGl2ZVByb2plY3Rpb24gb2JqZWN0IG9mIGEgdGhyZWUtZGltZW5zaW9uYWxcclxuXHQgKiBkaXNwbGF5IG9iamVjdC4gVGhlIFBlcnNwZWN0aXZlUHJvamVjdGlvbiBvYmplY3QgY2FuIGJlIHVzZWQgdG8gbW9kaWZ5IHRoZVxyXG5cdCAqIHBlcnNwZWN0aXZlIHRyYW5zZm9ybWF0aW9uIG9mIHRoZSBzdGFnZSBvciB0byBhc3NpZ24gYSBwZXJzcGVjdGl2ZVxyXG5cdCAqIHRyYW5zZm9ybWF0aW9uIHRvIGFsbCB0aGUgdGhyZWUtZGltZW5zaW9uYWwgY2hpbGRyZW4gb2YgYSBkaXNwbGF5IG9iamVjdC5cclxuXHQgKlxyXG5cdCAqIDxwPkJhc2VkIG9uIHRoZSBmaWVsZCBvZiB2aWV3IGFuZCBhc3BlY3QgcmF0aW8oZGltZW5zaW9ucykgb2YgdGhlIHN0YWdlLFxyXG5cdCAqIGEgZGVmYXVsdCBQZXJzcGVjdGl2ZVByb2plY3Rpb24gb2JqZWN0IGlzIGFzc2lnbmVkIHRvIHRoZSByb290IG9iamVjdC48L3A+XHJcblx0ICovXHJcblx0cHVibGljIHBlcnNwZWN0aXZlUHJvamVjdGlvbjpQZXJzcGVjdGl2ZVByb2plY3Rpb247XHJcblxyXG5cdC8qKlxyXG5cdCAqIEEgUmVjdGFuZ2xlIG9iamVjdCB0aGF0IGRlZmluZXMgdGhlIGJvdW5kaW5nIHJlY3RhbmdsZSBvZiB0aGUgZGlzcGxheVxyXG5cdCAqIG9iamVjdCBvbiB0aGUgc3RhZ2UuXHJcblx0ICovXHJcblx0cHVibGljIGdldCBwaXhlbEJvdW5kcygpOlJlY3RhbmdsZVxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9waXhlbEJvdW5kcztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERlZmluZXMgdGhlIHBvc2l0aW9uIG9mIHRoZSAzZCBvYmplY3QsIHJlbGF0aXZlIHRvIHRoZSBsb2NhbCBjb29yZGluYXRlcyBvZiB0aGUgcGFyZW50IDxjb2RlPk9iamVjdENvbnRhaW5lcjNEPC9jb2RlPi5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHBvc2l0aW9uKCk6VmVjdG9yM0RcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fZGlzcGxheU9iamVjdC5faU1hdHJpeDNELnBvc2l0aW9uXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHBvc2l0aW9uKHZhbHVlOlZlY3RvcjNEKVxyXG5cdHtcclxuXHRcdHRoaXMuX2Rpc3BsYXlPYmplY3QueCA9IHZhbHVlLng7XHJcblx0XHR0aGlzLl9kaXNwbGF5T2JqZWN0LnkgPSB2YWx1ZS55O1xyXG5cdFx0dGhpcy5fZGlzcGxheU9iamVjdC56ID0gdmFsdWUuejtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCByaWdodFZlY3RvcigpOlZlY3RvcjNEXHJcblx0e1xyXG5cdFx0cmV0dXJuIE1hdHJpeDNEVXRpbHMuZ2V0UmlnaHQodGhpcy5fZGlzcGxheU9iamVjdC5faU1hdHJpeDNEKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERlZmluZXMgdGhlIHJvdGF0aW9uIG9mIHRoZSAzZCBvYmplY3QsIHJlbGF0aXZlIHRvIHRoZSBsb2NhbCBjb29yZGluYXRlcyBvZiB0aGUgcGFyZW50IDxjb2RlPk9iamVjdENvbnRhaW5lcjNEPC9jb2RlPi5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHJvdGF0aW9uKCk6VmVjdG9yM0RcclxuXHR7XHJcblx0XHRyZXR1cm4gbmV3IFZlY3RvcjNEKHRoaXMuX2Rpc3BsYXlPYmplY3Qucm90YXRpb25YLCB0aGlzLl9kaXNwbGF5T2JqZWN0LnJvdGF0aW9uWSwgdGhpcy5fZGlzcGxheU9iamVjdC5yb3RhdGlvblopO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCByb3RhdGlvbih2YWx1ZTpWZWN0b3IzRClcclxuXHR7XHJcblx0XHR0aGlzLl9kaXNwbGF5T2JqZWN0LnJvdGF0aW9uWCA9IHZhbHVlLng7XHJcblx0XHR0aGlzLl9kaXNwbGF5T2JqZWN0LnJvdGF0aW9uWSA9IHZhbHVlLnk7XHJcblx0XHR0aGlzLl9kaXNwbGF5T2JqZWN0LnJvdGF0aW9uWiA9IHZhbHVlLno7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEZWZpbmVzIHRoZSBzY2FsZSBvZiB0aGUgM2Qgb2JqZWN0LCByZWxhdGl2ZSB0byB0aGUgbG9jYWwgY29vcmRpbmF0ZXMgb2YgdGhlIHBhcmVudCA8Y29kZT5PYmplY3RDb250YWluZXIzRDwvY29kZT4uXHJcblx0ICovXHJcblx0cHVibGljIGdldCBzY2FsZSgpOlZlY3RvcjNEXHJcblx0e1xyXG5cdFx0cmV0dXJuIG5ldyBWZWN0b3IzRCh0aGlzLl9kaXNwbGF5T2JqZWN0LnNjYWxlWCwgdGhpcy5fZGlzcGxheU9iamVjdC5zY2FsZVksIHRoaXMuX2Rpc3BsYXlPYmplY3Quc2NhbGVaKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgc2NhbGUodmFsdWU6VmVjdG9yM0QpXHJcblx0e1xyXG5cdFx0dGhpcy5fZGlzcGxheU9iamVjdC5zY2FsZVggPSB2YWx1ZS54O1xyXG5cdFx0dGhpcy5fZGlzcGxheU9iamVjdC5zY2FsZVkgPSB2YWx1ZS55O1xyXG5cdFx0dGhpcy5fZGlzcGxheU9iamVjdC5zY2FsZVogPSB2YWx1ZS56O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHVwVmVjdG9yKCk6VmVjdG9yM0RcclxuXHR7XHJcblx0XHRyZXR1cm4gTWF0cml4M0RVdGlscy5nZXRVcCh0aGlzLl9kaXNwbGF5T2JqZWN0Ll9pTWF0cml4M0QpO1xyXG5cdH1cclxuXHJcblx0Y29uc3RydWN0b3IoZGlzcGxheU9iamVjdDpEaXNwbGF5T2JqZWN0KVxyXG5cdHtcclxuXHRcdHRoaXMuX2Rpc3BsYXlPYmplY3QgPSBkaXNwbGF5T2JqZWN0O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyBhIE1hdHJpeDNEIG9iamVjdCwgd2hpY2ggY2FuIHRyYW5zZm9ybSB0aGUgc3BhY2Ugb2YgYSBzcGVjaWZpZWRcclxuXHQgKiBkaXNwbGF5IG9iamVjdCBpbiByZWxhdGlvbiB0byB0aGUgY3VycmVudCBkaXNwbGF5IG9iamVjdCdzIHNwYWNlLiBZb3UgY2FuXHJcblx0ICogdXNlIHRoZSA8Y29kZT5nZXRSZWxhdGl2ZU1hdHJpeDNEKCk8L2NvZGU+IG1ldGhvZCB0byBtb3ZlIG9uZVxyXG5cdCAqIHRocmVlLWRpbWVuc2lvbmFsIGRpc3BsYXkgb2JqZWN0IHJlbGF0aXZlIHRvIGFub3RoZXIgdGhyZWUtZGltZW5zaW9uYWxcclxuXHQgKiBkaXNwbGF5IG9iamVjdC5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gcmVsYXRpdmVUbyBUaGUgZGlzcGxheSBvYmplY3QgcmVsYXRpdmUgdG8gd2hpY2ggdGhlIHRyYW5zZm9ybWF0aW9uXHJcblx0ICogICAgICAgICAgICAgICAgICAgb2NjdXJzLiBUbyBnZXQgYSBNYXRyaXgzRCBvYmplY3QgcmVsYXRpdmUgdG8gdGhlIHN0YWdlLFxyXG5cdCAqICAgICAgICAgICAgICAgICAgIHNldCB0aGUgcGFyYW1ldGVyIHRvIHRoZSA8Y29kZT5yb290PC9jb2RlPiBvclxyXG5cdCAqICAgICAgICAgICAgICAgICAgIDxjb2RlPnN0YWdlPC9jb2RlPiBvYmplY3QuIFRvIGdldCB0aGUgd29ybGQtcmVsYXRpdmVcclxuXHQgKiAgICAgICAgICAgICAgICAgICBtYXRyaXggb2YgdGhlIGRpc3BsYXkgb2JqZWN0LCBzZXQgdGhlIHBhcmFtZXRlciB0byBhXHJcblx0ICogICAgICAgICAgICAgICAgICAgZGlzcGxheSBvYmplY3QgdGhhdCBoYXMgYSBwZXJzcGVjdGl2ZSB0cmFuc2Zvcm1hdGlvblxyXG5cdCAqICAgICAgICAgICAgICAgICAgIGFwcGxpZWQgdG8gaXQuXHJcblx0ICogQHJldHVybiBBIE1hdHJpeDNEIG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIHRvIHRyYW5zZm9ybSB0aGUgc3BhY2UgZnJvbSB0aGVcclxuXHQgKiAgICAgICAgIDxjb2RlPnJlbGF0aXZlVG88L2NvZGU+IGRpc3BsYXkgb2JqZWN0IHRvIHRoZSBjdXJyZW50IGRpc3BsYXlcclxuXHQgKiAgICAgICAgIG9iamVjdCBzcGFjZS5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0UmVsYXRpdmVNYXRyaXgzRChyZWxhdGl2ZVRvOkRpc3BsYXlPYmplY3QpOk1hdHJpeDNEXHJcblx0e1xyXG5cdFx0cmV0dXJuIG5ldyBNYXRyaXgzRCgpOyAvL1RPRE9cclxuXHR9XHJcblxyXG5cclxuXHQvKipcclxuXHQgKiBNb3ZlcyB0aGUgM2Qgb2JqZWN0IGZvcndhcmRzIGFsb25nIGl0J3MgbG9jYWwgeiBheGlzXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gICAgZGlzdGFuY2UgICAgVGhlIGxlbmd0aCBvZiB0aGUgbW92ZW1lbnRcclxuXHQgKi9cclxuXHRwdWJsaWMgbW92ZUZvcndhcmQoZGlzdGFuY2U6bnVtYmVyKVxyXG5cdHtcclxuXHRcdHRoaXMuX2Rpc3BsYXlPYmplY3QudHJhbnNsYXRlTG9jYWwoVmVjdG9yM0QuWl9BWElTLCBkaXN0YW5jZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNb3ZlcyB0aGUgM2Qgb2JqZWN0IGJhY2t3YXJkcyBhbG9uZyBpdCdzIGxvY2FsIHogYXhpc1xyXG5cdCAqXHJcblx0ICogQHBhcmFtICAgIGRpc3RhbmNlICAgIFRoZSBsZW5ndGggb2YgdGhlIG1vdmVtZW50XHJcblx0ICovXHJcblx0cHVibGljIG1vdmVCYWNrd2FyZChkaXN0YW5jZTpudW1iZXIpXHJcblx0e1xyXG5cdFx0dGhpcy5fZGlzcGxheU9iamVjdC50cmFuc2xhdGVMb2NhbChWZWN0b3IzRC5aX0FYSVMsIC1kaXN0YW5jZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNb3ZlcyB0aGUgM2Qgb2JqZWN0IGJhY2t3YXJkcyBhbG9uZyBpdCdzIGxvY2FsIHggYXhpc1xyXG5cdCAqXHJcblx0ICogQHBhcmFtICAgIGRpc3RhbmNlICAgIFRoZSBsZW5ndGggb2YgdGhlIG1vdmVtZW50XHJcblx0ICovXHJcblxyXG5cdHB1YmxpYyBtb3ZlTGVmdChkaXN0YW5jZTpudW1iZXIpXHJcblx0e1xyXG5cdFx0dGhpcy5fZGlzcGxheU9iamVjdC50cmFuc2xhdGVMb2NhbChWZWN0b3IzRC5YX0FYSVMsIC1kaXN0YW5jZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNb3ZlcyB0aGUgM2Qgb2JqZWN0IGZvcndhcmRzIGFsb25nIGl0J3MgbG9jYWwgeCBheGlzXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gICAgZGlzdGFuY2UgICAgVGhlIGxlbmd0aCBvZiB0aGUgbW92ZW1lbnRcclxuXHQgKi9cclxuXHRwdWJsaWMgbW92ZVJpZ2h0KGRpc3RhbmNlOm51bWJlcilcclxuXHR7XHJcblx0XHR0aGlzLl9kaXNwbGF5T2JqZWN0LnRyYW5zbGF0ZUxvY2FsKFZlY3RvcjNELlhfQVhJUywgZGlzdGFuY2UpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTW92ZXMgdGhlIDNkIG9iamVjdCBmb3J3YXJkcyBhbG9uZyBpdCdzIGxvY2FsIHkgYXhpc1xyXG5cdCAqXHJcblx0ICogQHBhcmFtICAgIGRpc3RhbmNlICAgIFRoZSBsZW5ndGggb2YgdGhlIG1vdmVtZW50XHJcblx0ICovXHJcblx0cHVibGljIG1vdmVVcChkaXN0YW5jZTpudW1iZXIpXHJcblx0e1xyXG5cdFx0dGhpcy5fZGlzcGxheU9iamVjdC50cmFuc2xhdGVMb2NhbChWZWN0b3IzRC5ZX0FYSVMsIGRpc3RhbmNlKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1vdmVzIHRoZSAzZCBvYmplY3QgYmFja3dhcmRzIGFsb25nIGl0J3MgbG9jYWwgeSBheGlzXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gICAgZGlzdGFuY2UgICAgVGhlIGxlbmd0aCBvZiB0aGUgbW92ZW1lbnRcclxuXHQgKi9cclxuXHRwdWJsaWMgbW92ZURvd24oZGlzdGFuY2U6bnVtYmVyKVxyXG5cdHtcclxuXHRcdHRoaXMuX2Rpc3BsYXlPYmplY3QudHJhbnNsYXRlTG9jYWwoVmVjdG9yM0QuWV9BWElTLCAtZGlzdGFuY2UpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0ID0gVHJhbnNmb3JtO1xyXG4iXX0=