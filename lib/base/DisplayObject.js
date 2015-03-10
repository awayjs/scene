var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Box = require("awayjs-core/lib/geom/Box");
var Sphere = require("awayjs-core/lib/geom/Sphere");
var MathConsts = require("awayjs-core/lib/geom/MathConsts");
var Matrix3D = require("awayjs-core/lib/geom/Matrix3D");
var Matrix3DUtils = require("awayjs-core/lib/geom/Matrix3DUtils");
var Point = require("awayjs-core/lib/geom/Point");
var Vector3D = require("awayjs-core/lib/geom/Vector3D");
var AssetBase = require("awayjs-core/lib/library/AssetBase");
var AbstractMethodError = require("awayjs-core/lib/errors/AbstractMethodError");
var AlignmentMode = require("awayjs-display/lib/base/AlignmentMode");
var OrientationMode = require("awayjs-display/lib/base/OrientationMode");
var Transform = require("awayjs-display/lib/base/Transform");
var PickingCollisionVO = require("awayjs-display/lib/pick/PickingCollisionVO");
var DisplayObjectEvent = require("awayjs-display/lib/events/DisplayObjectEvent");
var SceneEvent = require("awayjs-display/lib/events/SceneEvent");
/**
 * The DisplayObject class is the base class for all objects that can be
 * placed on the display list. The display list manages all objects displayed
 * in flash. Use the DisplayObjectContainer class to arrange the
 * display objects in the display list. DisplayObjectContainer objects can
 * have child display objects, while other display objects, such as Shape and
 * TextField objects, are "leaf" nodes that have only parents and siblings, no
 * children.
 *
 * <p>The DisplayObject class supports basic functionality like the <i>x</i>
 * and <i>y</i> position of an object, as well as more advanced properties of
 * the object such as its transformation matrix. </p>
 *
 * <p>DisplayObject is an abstract base class; therefore, you cannot call
 * DisplayObject directly. Invoking <code>new DisplayObject()</code> throws an
 * <code>ArgumentError</code> exception. </p>
 *
 * <p>All display objects inherit from the DisplayObject class.</p>
 *
 * <p>The DisplayObject class itself does not include any APIs for rendering
 * content onscreen. For that reason, if you want create a custom subclass of
 * the DisplayObject class, you will want to extend one of its subclasses that
 * do have APIs for rendering content onscreen, such as the Shape, Sprite,
 * Bitmap, SimpleButton, TextField, or MovieClip class.</p>
 *
 * <p>The DisplayObject class contains several broadcast events. Normally, the
 * target of any particular event is a specific DisplayObject instance. For
 * example, the target of an <code>added</code> event is the specific
 * DisplayObject instance that was added to the display list. Having a single
 * target restricts the placement of event listeners to that target and in
 * some cases the target's ancestors on the display list. With broadcast
 * events, however, the target is not a specific DisplayObject instance, but
 * rather all DisplayObject instances, including those that are not on the
 * display list. This means that you can add a listener to any DisplayObject
 * instance to listen for broadcast events. In addition to the broadcast
 * events listed in the DisplayObject class's Events table, the DisplayObject
 * class also inherits two broadcast events from the EventDispatcher class:
 * <code>activate</code> and <code>deactivate</code>.</p>
 *
 * <p>Some properties previously used in the ActionScript 1.0 and 2.0
 * MovieClip, TextField, and Button classes(such as <code>_alpha</code>,
 * <code>_height</code>, <code>_name</code>, <code>_width</code>,
 * <code>_x</code>, <code>_y</code>, and others) have equivalents in the
 * ActionScript 3.0 DisplayObject class that are renamed so that they no
 * longer begin with the underscore(_) character.</p>
 *
 * <p>For more information, see the "Display Programming" chapter of the
 * <i>ActionScript 3.0 Developer's Guide</i>.</p>
 *
 * @event added            Dispatched when a display object is added to the
 *                         display list. The following methods trigger this
 *                         event:
 *                         <code>DisplayObjectContainer.addChild()</code>,
 *                         <code>DisplayObjectContainer.addChildAt()</code>.
 * @event addedToScene     Dispatched when a display object is added to the on
 *                         scene display list, either directly or through the
 *                         addition of a sub tree in which the display object
 *                         is contained. The following methods trigger this
 *                         event:
 *                         <code>DisplayObjectContainer.addChild()</code>,
 *                         <code>DisplayObjectContainer.addChildAt()</code>.
 * @event enterFrame       [broadcast event] Dispatched when the playhead is
 *                         entering a new frame. If the playhead is not
 *                         moving, or if there is only one frame, this event
 *                         is dispatched continuously in conjunction with the
 *                         frame rate. This event is a broadcast event, which
 *                         means that it is dispatched by all display objects
 *                         with a listener registered for this event.
 * @event exitFrame        [broadcast event] Dispatched when the playhead is
 *                         exiting the current frame. All frame scripts have
 *                         been run. If the playhead is not moving, or if
 *                         there is only one frame, this event is dispatched
 *                         continuously in conjunction with the frame rate.
 *                         This event is a broadcast event, which means that
 *                         it is dispatched by all display objects with a
 *                         listener registered for this event.
 * @event frameConstructed [broadcast event] Dispatched after the constructors
 *                         of frame display objects have run but before frame
 *                         scripts have run. If the playhead is not moving, or
 *                         if there is only one frame, this event is
 *                         dispatched continuously in conjunction with the
 *                         frame rate. This event is a broadcast event, which
 *                         means that it is dispatched by all display objects
 *                         with a listener registered for this event.
 * @event removed          Dispatched when a display object is about to be
 *                         removed from the display list. Two methods of the
 *                         DisplayObjectContainer class generate this event:
 *                         <code>removeChild()</code> and
 *                         <code>removeChildAt()</code>.
 *
 *                         <p>The following methods of a
 *                         DisplayObjectContainer object also generate this
 *                         event if an object must be removed to make room for
 *                         the new object: <code>addChild()</code>,
 *                         <code>addChildAt()</code>, and
 *                         <code>setChildIndex()</code>. </p>
 * @event removedFromScene Dispatched when a display object is about to be
 *                         removed from the display list, either directly or
 *                         through the removal of a sub tree in which the
 *                         display object is contained. Two methods of the
 *                         DisplayObjectContainer class generate this event:
 *                         <code>removeChild()</code> and
 *                         <code>removeChildAt()</code>.
 *
 *                         <p>The following methods of a
 *                         DisplayObjectContainer object also generate this
 *                         event if an object must be removed to make room for
 *                         the new object: <code>addChild()</code>,
 *                         <code>addChildAt()</code>, and
 *                         <code>setChildIndex()</code>. </p>
 * @event render           [broadcast event] Dispatched when the display list
 *                         is about to be updated and rendered. This event
 *                         provides the last opportunity for objects listening
 *                         for this event to make changes before the display
 *                         list is rendered. You must call the
 *                         <code>invalidate()</code> method of the Scene
 *                         object each time you want a <code>render</code>
 *                         event to be dispatched. <code>Render</code> events
 *                         are dispatched to an object only if there is mutual
 *                         trust between it and the object that called
 *                         <code>Scene.invalidate()</code>. This event is a
 *                         broadcast event, which means that it is dispatched
 *                         by all display objects with a listener registered
 *                         for this event.
 *
 *                         <p><b>Note: </b>This event is not dispatched if the
 *                         display is not rendering. This is the case when the
 *                         content is either minimized or obscured. </p>
 */
var DisplayObject = (function (_super) {
    __extends(DisplayObject, _super);
    /**
     * Creates a new <code>DisplayObject</code> instance.
     */
    function DisplayObject() {
        _super.call(this);
        this._boxBoundsInvalid = true;
        this._sphereBoundsInvalid = true;
        this._pSceneTransform = new Matrix3D();
        this._pSceneTransformDirty = true;
        this._matrix3D = new Matrix3D();
        this._matrix3DDirty = true;
        this._inverseSceneTransform = new Matrix3D();
        this._inverseSceneTransformDirty = true;
        this._scenePosition = new Vector3D();
        this._scenePositionDirty = true;
        this._explicitVisibility = true;
        this._pImplicitVisibility = true;
        this._explicitMouseEnabled = true;
        this._pImplicitMouseEnabled = true;
        this._positionDirty = true;
        this._rotationDirty = true;
        this._scaleDirty = true;
        this._rotationX = 0;
        this._rotationY = 0;
        this._rotationZ = 0;
        this._eulers = new Vector3D();
        this._flipY = new Matrix3D();
        this._zOffset = 0;
        this._pScaleX = 1;
        this._pScaleY = 1;
        this._pScaleZ = 1;
        this._x = 0;
        this._y = 0;
        this._z = 0;
        this._pivot = new Vector3D();
        this._pivotScale = new Vector3D();
        this._orientationMatrix = new Matrix3D();
        this._pivotZero = true;
        this._pivotDirty = true;
        this._pos = new Vector3D();
        this._rot = new Vector3D();
        this._sca = new Vector3D();
        this._pIgnoreTransform = false;
        this._pRenderables = new Array();
        this._entityNodes = new Array();
        /**
         *
         */
        this.alignmentMode = AlignmentMode.REGISTRATION_POINT;
        /**
         *
         */
        this.castsShadows = true;
        /**
         *
         */
        this.orientationMode = OrientationMode.DEFAULT;
        // Cached vector of transformation components used when
        // recomposing the transform matrix in updateTransform()
        this._transformComponents = new Array(3);
        this._transformComponents[0] = this._pos;
        this._transformComponents[1] = this._rot;
        this._transformComponents[2] = this._sca;
        //creation of associated transform object
        this._transform = new Transform(this);
        this._matrix3D.identity();
        this._flipY.appendScale(1, -1, 1);
    }
    Object.defineProperty(DisplayObject.prototype, "boundsType", {
        /**
         *
         */
        get: function () {
            return this._boundsType;
        },
        set: function (value) {
            if (this._boundsType == value)
                return;
            this._boundsType = value;
            this._pInvalidateBounds();
            var len = this._entityNodes.length;
            for (var i = 0; i < len; i++)
                this._entityNodes[i].updateBounds();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "depth", {
        /**
         * Indicates the depth of the display object, in pixels. The depth is
         * calculated based on the bounds of the content of the display object. When
         * you set the <code>depth</code> property, the <code>scaleZ</code> property
         * is adjusted accordingly, as shown in the following code:
         *
         * <p>Except for TextField and Video objects, a display object with no
         * content (such as an empty sprite) has a depth of 0, even if you try to
         * set <code>depth</code> to a different value.</p>
         */
        get: function () {
            return this.getBox().depth * this._pScaleZ;
        },
        set: function (val) {
            if (this._depth == val)
                return;
            this._depth = val;
            this._pScaleZ = val / this.getBox().depth;
            this.invalidateScale();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "eulers", {
        /**
         * Defines the rotation of the 3d object as a <code>Vector3D</code> object containing euler angles for rotation around x, y and z axis.
         */
        get: function () {
            this._eulers.x = this._rotationX * MathConsts.RADIANS_TO_DEGREES;
            this._eulers.y = this._rotationY * MathConsts.RADIANS_TO_DEGREES;
            this._eulers.z = this._rotationZ * MathConsts.RADIANS_TO_DEGREES;
            return this._eulers;
        },
        set: function (value) {
            this._rotationX = value.x * MathConsts.DEGREES_TO_RADIANS;
            this._rotationY = value.y * MathConsts.DEGREES_TO_RADIANS;
            this._rotationZ = value.z * MathConsts.DEGREES_TO_RADIANS;
            this.invalidateRotation();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "height", {
        /**
         * An indexed array that contains each filter object currently associated
         * with the display object. The flash.filters package contains several
         * classes that define specific filters you can use.
         *
         * <p>Filters can be applied in Flash Professional at design time, or at run
         * time by using ActionScript code. To apply a filter by using ActionScript,
         * you must make a temporary copy of the entire <code>filters</code> array,
         * modify the temporary array, then assign the value of the temporary array
         * back to the <code>filters</code> array. You cannot directly add a new
         * filter object to the <code>filters</code> array.</p>
         *
         * <p>To add a filter by using ActionScript, perform the following steps
         * (assume that the target display object is named
         * <code>myDisplayObject</code>):</p>
         *
         * <ol>
         *   <li>Create a new filter object by using the constructor method of your
         * chosen filter class.</li>
         *   <li>Assign the value of the <code>myDisplayObject.filters</code> array
         * to a temporary array, such as one named <code>myFilters</code>.</li>
         *   <li>Add the new filter object to the <code>myFilters</code> temporary
         * array.</li>
         *   <li>Assign the value of the temporary array to the
         * <code>myDisplayObject.filters</code> array.</li>
         * </ol>
         *
         * <p>If the <code>filters</code> array is undefined, you do not need to use
         * a temporary array. Instead, you can directly assign an array literal that
         * contains one or more filter objects that you create. The first example in
         * the Examples section adds a drop shadow filter by using code that handles
         * both defined and undefined <code>filters</code> arrays.</p>
         *
         * <p>To modify an existing filter object, you must use the technique of
         * modifying a copy of the <code>filters</code> array:</p>
         *
         * <ol>
         *   <li>Assign the value of the <code>filters</code> array to a temporary
         * array, such as one named <code>myFilters</code>.</li>
         *   <li>Modify the property by using the temporary array,
         * <code>myFilters</code>. For example, to set the quality property of the
         * first filter in the array, you could use the following code:
         * <code>myFilters[0].quality = 1;</code></li>
         *   <li>Assign the value of the temporary array to the <code>filters</code>
         * array.</li>
         * </ol>
         *
         * <p>At load time, if a display object has an associated filter, it is
         * marked to cache itself as a transparent bitmap. From this point forward,
         * as long as the display object has a valid filter list, the player caches
         * the display object as a bitmap. This source bitmap is used as a source
         * image for the filter effects. Each display object usually has two bitmaps:
         * one with the original unfiltered source display object and another for the
         * final image after filtering. The final image is used when rendering. As
         * long as the display object does not change, the final image does not need
         * updating.</p>
         *
         * <p>The flash.filters package includes classes for filters. For example, to
         * create a DropShadow filter, you would write:</p>
         *
         * @throws ArgumentError When <code>filters</code> includes a ShaderFilter
         *                       and the shader output type is not compatible with
         *                       this operation(the shader must specify a
         *                       <code>pixel4</code> output).
         * @throws ArgumentError When <code>filters</code> includes a ShaderFilter
         *                       and the shader doesn't specify any image input or
         *                       the first input is not an <code>image4</code> input.
         * @throws ArgumentError When <code>filters</code> includes a ShaderFilter
         *                       and the shader specifies an image input that isn't
         *                       provided.
         * @throws ArgumentError When <code>filters</code> includes a ShaderFilter, a
         *                       ByteArray or Vector.<Number> instance as a shader
         *                       input, and the <code>width</code> and
         *                       <code>height</code> properties aren't specified for
         *                       the ShaderInput object, or the specified values
         *                       don't match the amount of data in the input data.
         *                       See the <code>ShaderInput.input</code> property for
         *                       more information.
         */
        //		public filters:Array<Dynamic>;
        /**
         * Indicates the height of the display object, in pixels. The height is
         * calculated based on the bounds of the content of the display object. When
         * you set the <code>height</code> property, the <code>scaleY</code> property
         * is adjusted accordingly, as shown in the following code:
         *
         * <p>Except for TextField and Video objects, a display object with no
         * content (such as an empty sprite) has a height of 0, even if you try to
         * set <code>height</code> to a different value.</p>
         */
        get: function () {
            return this.getBox().height * this._pScaleY;
        },
        set: function (val) {
            if (this._height == val)
                return;
            this._height = val;
            this._pScaleY = val / this.getBox().height;
            this.invalidateScale();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "index", {
        /**
         * Indicates the instance container index of the DisplayObject. The object can be
         * identified in the child list of its parent display object container by
         * calling the <code>getChildByIndex()</code> method of the display object
         * container.
         *
         * <p>If the DisplayObject has no parent container, index defaults to 0.</p>
         */
        get: function () {
            if (this._pParent)
                return this._pParent.getChildIndex(this);
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "inverseSceneTransform", {
        /**
         *
         */
        get: function () {
            if (this._inverseSceneTransformDirty) {
                this._inverseSceneTransform.copyFrom(this.sceneTransform);
                this._inverseSceneTransform.invert();
                this._inverseSceneTransformDirty = false;
            }
            return this._inverseSceneTransform;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "ignoreTransform", {
        /**
         *
         */
        get: function () {
            return this._pIgnoreTransform;
        },
        set: function (value) {
            if (this._pIgnoreTransform == value)
                return;
            this._pIgnoreTransform = value;
            if (value) {
                this._pSceneTransform.identity();
                this._scenePosition.setTo(0, 0, 0);
            }
            this.pInvalidateSceneTransform();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "isEntity", {
        /**
         *
         */
        get: function () {
            return this._pIsEntity;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "loaderInfo", {
        /**
         * Returns a LoaderInfo object containing information about loading the file
         * to which this display object belongs. The <code>loaderInfo</code> property
         * is defined only for the root display object of a SWF file or for a loaded
         * Bitmap(not for a Bitmap that is drawn with ActionScript). To find the
         * <code>loaderInfo</code> object associated with the SWF file that contains
         * a display object named <code>myDisplayObject</code>, use
         * <code>myDisplayObject.root.loaderInfo</code>.
         *
         * <p>A large SWF file can monitor its download by calling
         * <code>this.root.loaderInfo.addEventListener(Event.COMPLETE,
         * func)</code>.</p>
         */
        get: function () {
            return this._loaderInfo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "mouseEnabled", {
        /**
         * Specifies whether this object receives mouse, or other user input,
         * messages. The default value is <code>true</code>, which means that by
         * default any InteractiveObject instance that is on the display list
         * receives mouse events or other user input events. If
         * <code>mouseEnabled</code> is set to <code>false</code>, the instance does
         * not receive any mouse events(or other user input events like keyboard
         * events). Any children of this instance on the display list are not
         * affected. To change the <code>mouseEnabled</code> behavior for all
         * children of an object on the display list, use
         * <code>flash.display.DisplayObjectContainer.mouseChildren</code>.
         *
         * <p> No event is dispatched by setting this property. You must use the
         * <code>addEventListener()</code> method to create interactive
         * functionality.</p>
         */
        get: function () {
            return this._explicitMouseEnabled;
        },
        set: function (value) {
            if (this._explicitMouseEnabled == value)
                return;
            this._explicitMouseEnabled = value;
            this._pUpdateImplicitMouseEnabled(this._pParent ? this._pParent.mouseChildren : true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "mouseX", {
        /**
         * Indicates the x coordinate of the mouse or user input device position, in
         * pixels.
         *
         * <p><b>Note</b>: For a DisplayObject that has been rotated, the returned x
         * coordinate will reflect the non-rotated object.</p>
         */
        get: function () {
            return this._mouseX;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "mouseY", {
        /**
         * Indicates the y coordinate of the mouse or user input device position, in
         * pixels.
         *
         * <p><b>Note</b>: For a DisplayObject that has been rotated, the returned y
         * coordinate will reflect the non-rotated object.</p>
         */
        get: function () {
            return this._mouseY;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "parent", {
        /**
         * Indicates the DisplayObjectContainer object that contains this display
         * object. Use the <code>parent</code> property to specify a relative path to
         * display objects that are above the current display object in the display
         * list hierarchy.
         *
         * <p>You can use <code>parent</code> to move up multiple levels in the
         * display list as in the following:</p>
         *
         * @throws SecurityError The parent display object belongs to a security
         *                       sandbox to which you do not have access. You can
         *                       avoid this situation by having the parent movie call
         *                       the <code>Security.allowDomain()</code> method.
         */
        get: function () {
            return this._pParent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "partition", {
        /**
         *
         */
        get: function () {
            return this._explicitPartition;
        },
        set: function (value) {
            if (this._explicitPartition == value)
                return;
            this._explicitPartition = value;
            this._pUpdateImplicitPartition(this._pParent ? this._pParent._iAssignedPartition : null, this._pScene);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "pickingCollider", {
        /**
         *
         */
        get: function () {
            return this._pPickingCollider;
        },
        set: function (value) {
            this._pPickingCollider = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "pivot", {
        /**
         * Defines the local point around which the object rotates.
         */
        get: function () {
            return this._pivot;
        },
        set: function (pivot) {
            this._pivot = pivot.clone();
            this.invalidatePivot();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "root", {
        /**
         * For a display object in a loaded SWF file, the <code>root</code> property
         * is the top-most display object in the portion of the display list's tree
         * structure represented by that SWF file. For a Bitmap object representing a
         * loaded image file, the <code>root</code> property is the Bitmap object
         * itself. For the instance of the main class of the first SWF file loaded,
         * the <code>root</code> property is the display object itself. The
         * <code>root</code> property of the Scene object is the Scene object itself.
         * The <code>root</code> property is set to <code>null</code> for any display
         * object that has not been added to the display list, unless it has been
         * added to a display object container that is off the display list but that
         * is a child of the top-most display object in a loaded SWF file.
         *
         * <p>For example, if you create a new Sprite object by calling the
         * <code>Sprite()</code> constructor method, its <code>root</code> property
         * is <code>null</code> until you add it to the display list(or to a display
         * object container that is off the display list but that is a child of the
         * top-most display object in a SWF file).</p>
         *
         * <p>For a loaded SWF file, even though the Loader object used to load the
         * file may not be on the display list, the top-most display object in the
         * SWF file has its <code>root</code> property set to itself. The Loader
         * object does not have its <code>root</code> property set until it is added
         * as a child of a display object for which the <code>root</code> property is
         * set.</p>
         */
        get: function () {
            return this._root;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "rotationX", {
        /**
         * Indicates the x-axis rotation of the DisplayObject instance, in degrees,
         * from its original orientation relative to the 3D parent container. Values
         * from 0 to 180 represent clockwise rotation; values from 0 to -180
         * represent counterclockwise rotation. Values outside this range are added
         * to or subtracted from 360 to obtain a value within the range.
         */
        get: function () {
            return this._rotationX * MathConsts.RADIANS_TO_DEGREES;
        },
        set: function (val) {
            if (this.rotationX == val)
                return;
            this._rotationX = val * MathConsts.DEGREES_TO_RADIANS;
            this.invalidateRotation();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "rotationY", {
        /**
         * Indicates the y-axis rotation of the DisplayObject instance, in degrees,
         * from its original orientation relative to the 3D parent container. Values
         * from 0 to 180 represent clockwise rotation; values from 0 to -180
         * represent counterclockwise rotation. Values outside this range are added
         * to or subtracted from 360 to obtain a value within the range.
         */
        get: function () {
            return this._rotationY * MathConsts.RADIANS_TO_DEGREES;
        },
        set: function (val) {
            if (this.rotationY == val)
                return;
            this._rotationY = val * MathConsts.DEGREES_TO_RADIANS;
            this.invalidateRotation();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "rotationZ", {
        /**
         * Indicates the z-axis rotation of the DisplayObject instance, in degrees,
         * from its original orientation relative to the 3D parent container. Values
         * from 0 to 180 represent clockwise rotation; values from 0 to -180
         * represent counterclockwise rotation. Values outside this range are added
         * to or subtracted from 360 to obtain a value within the range.
         */
        get: function () {
            return this._rotationZ * MathConsts.RADIANS_TO_DEGREES;
        },
        set: function (val) {
            if (this.rotationZ == val)
                return;
            this._rotationZ = val * MathConsts.DEGREES_TO_RADIANS;
            this.invalidateRotation();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "scaleX", {
        /**
         * Indicates the horizontal scale(percentage) of the object as applied from
         * the registration point. The default registration point is(0,0). 1.0
         * equals 100% scale.
         *
         * <p>Scaling the local coordinate system changes the <code>x</code> and
         * <code>y</code> property values, which are defined in whole pixels. </p>
         */
        get: function () {
            return this._pScaleX;
        },
        set: function (val) {
            //remove absolute width
            this._width = null;
            if (this._pScaleX == val)
                return;
            this._pScaleX = val;
            this.invalidateScale();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "scaleY", {
        /**
         * Indicates the vertical scale(percentage) of an object as applied from the
         * registration point of the object. The default registration point is(0,0).
         * 1.0 is 100% scale.
         *
         * <p>Scaling the local coordinate system changes the <code>x</code> and
         * <code>y</code> property values, which are defined in whole pixels. </p>
         */
        get: function () {
            return this._pScaleY;
        },
        set: function (val) {
            //remove absolute height
            this._height = null;
            if (this._pScaleY == val)
                return;
            this._pScaleY = val;
            this.invalidateScale();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "scaleZ", {
        /**
         * Indicates the depth scale(percentage) of an object as applied from the
         * registration point of the object. The default registration point is(0,0).
         * 1.0 is 100% scale.
         *
         * <p>Scaling the local coordinate system changes the <code>x</code>,
         * <code>y</code> and <code>z</code> property values, which are defined in
         * whole pixels. </p>
         */
        get: function () {
            return this._pScaleZ;
        },
        set: function (val) {
            //remove absolute depth
            this._depth = null;
            if (this._pScaleZ == val)
                return;
            this._pScaleZ = val;
            this.invalidateScale();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "scene", {
        /**
         *
         */
        get: function () {
            return this._pScene;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "scenePosition", {
        /**
         *
         */
        get: function () {
            if (this._scenePositionDirty) {
                if (!this._pivotZero && this.alignmentMode == AlignmentMode.PIVOT_POINT) {
                    this._scenePosition = this.sceneTransform.transformVector(this._pivotScale);
                }
                else {
                    this.sceneTransform.copyColumnTo(3, this._scenePosition);
                }
                this._scenePositionDirty = false;
            }
            return this._scenePosition;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "sceneTransform", {
        get: function () {
            if (this._pSceneTransformDirty)
                this.pUpdateSceneTransform();
            return this._pSceneTransform;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "shaderPickingDetails", {
        /**
         *
         */
        get: function () {
            return this._shaderPickingDetails;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "debugVisible", {
        /**
         *
         */
        get: function () {
            return this._debugVisible;
        },
        set: function (value) {
            if (value == this._debugVisible)
                return;
            this._debugVisible = value;
            var len = this._entityNodes.length;
            for (var i = 0; i < len; i++)
                this._entityNodes[i].debugVisible = this._debugVisible;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "transform", {
        /**
         * An object with properties pertaining to a display object's matrix, color
         * transform, and pixel bounds. The specific properties  -  matrix,
         * colorTransform, and three read-only properties
         * (<code>concatenatedMatrix</code>, <code>concatenatedColorTransform</code>,
         * and <code>pixelBounds</code>)  -  are described in the entry for the
         * Transform class.
         *
         * <p>Each of the transform object's properties is itself an object. This
         * concept is important because the only way to set new values for the matrix
         * or colorTransform objects is to create a new object and copy that object
         * into the transform.matrix or transform.colorTransform property.</p>
         *
         * <p>For example, to increase the <code>tx</code> value of a display
         * object's matrix, you must make a copy of the entire matrix object, then
         * copy the new object into the matrix property of the transform object:</p>
         * <pre xml:space="preserve"><code> public myMatrix:Matrix =
         * myDisplayObject.transform.matrix; myMatrix.tx += 10;
         * myDisplayObject.transform.matrix = myMatrix; </code></pre>
         *
         * <p>You cannot directly set the <code>tx</code> property. The following
         * code has no effect on <code>myDisplayObject</code>: </p>
         * <pre xml:space="preserve"><code> myDisplayObject.transform.matrix.tx +=
         * 10; </code></pre>
         *
         * <p>You can also copy an entire transform object and assign it to another
         * display object's transform property. For example, the following code
         * copies the entire transform object from <code>myOldDisplayObj</code> to
         * <code>myNewDisplayObj</code>:</p>
         * <code>myNewDisplayObj.transform = myOldDisplayObj.transform;</code>
         *
         * <p>The resulting display object, <code>myNewDisplayObj</code>, now has the
         * same values for its matrix, color transform, and pixel bounds as the old
         * display object, <code>myOldDisplayObj</code>.</p>
         *
         * <p>Note that AIR for TV devices use hardware acceleration, if it is
         * available, for color transforms.</p>
         */
        get: function () {
            return this._transform;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "visible", {
        /**
         * Whether or not the display object is visible. Display objects that are not
         * visible are disabled. For example, if <code>visible=false</code> for an
         * InteractiveObject instance, it cannot be clicked.
         */
        get: function () {
            return this._explicitVisibility;
        },
        set: function (value) {
            if (this._explicitVisibility == value)
                return;
            this._explicitVisibility = value;
            this._pUpdateImplicitVisibility(this._pParent ? this._pParent._iIsVisible() : true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "width", {
        /**
         * Indicates the width of the display object, in pixels. The width is
         * calculated based on the bounds of the content of the display object. When
         * you set the <code>width</code> property, the <code>scaleX</code> property
         * is adjusted accordingly, as shown in the following code:
         *
         * <p>Except for TextField and Video objects, a display object with no
         * content(such as an empty sprite) has a width of 0, even if you try to set
         * <code>width</code> to a different value.</p>
         */
        get: function () {
            return this.getBox().width * this._pScaleX;
        },
        set: function (val) {
            if (this._width == val)
                return;
            this._width = val;
            this._pScaleX = val / this.getBox().width;
            this.invalidateScale();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "x", {
        /**
         * Indicates the <i>x</i> coordinate of the DisplayObject instance relative
         * to the local coordinates of the parent DisplayObjectContainer. If the
         * object is inside a DisplayObjectContainer that has transformations, it is
         * in the local coordinate system of the enclosing DisplayObjectContainer.
         * Thus, for a DisplayObjectContainer rotated 90° counterclockwise, the
         * DisplayObjectContainer's children inherit a coordinate system that is
         * rotated 90° counterclockwise. The object's coordinates refer to the
         * registration point position.
         */
        get: function () {
            return this._x;
        },
        set: function (val) {
            if (this._x == val)
                return;
            this._x = val;
            this.invalidatePosition();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "y", {
        /**
         * Indicates the <i>y</i> coordinate of the DisplayObject instance relative
         * to the local coordinates of the parent DisplayObjectContainer. If the
         * object is inside a DisplayObjectContainer that has transformations, it is
         * in the local coordinate system of the enclosing DisplayObjectContainer.
         * Thus, for a DisplayObjectContainer rotated 90° counterclockwise, the
         * DisplayObjectContainer's children inherit a coordinate system that is
         * rotated 90° counterclockwise. The object's coordinates refer to the
         * registration point position.
         */
        get: function () {
            return this._y;
        },
        set: function (val) {
            if (this._y == val)
                return;
            this._y = val;
            this.invalidatePosition();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "z", {
        /**
         * Indicates the z coordinate position along the z-axis of the DisplayObject
         * instance relative to the 3D parent container. The z property is used for
         * 3D coordinates, not screen or pixel coordinates.
         *
         * <p>When you set a <code>z</code> property for a display object to
         * something other than the default value of <code>0</code>, a corresponding
         * Matrix3D object is automatically created. for adjusting a display object's
         * position and orientation in three dimensions. When working with the
         * z-axis, the existing behavior of x and y properties changes from screen or
         * pixel coordinates to positions relative to the 3D parent container.</p>
         *
         * <p>For example, a child of the <code>_root</code> at position x = 100, y =
         * 100, z = 200 is not drawn at pixel location(100,100). The child is drawn
         * wherever the 3D projection calculation puts it. The calculation is:</p>
         *
         * <p><code>(x~~cameraFocalLength/cameraRelativeZPosition,
         * y~~cameraFocalLength/cameraRelativeZPosition)</code></p>
         */
        get: function () {
            return this._z;
        },
        set: function (val) {
            if (this._z == val)
                return;
            this._z = val;
            this.invalidatePosition();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "zOffset", {
        /**
         *
         */
        get: function () {
            return this._zOffset;
        },
        set: function (value) {
            this._zOffset = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     */
    DisplayObject.prototype.addEventListener = function (type, listener) {
        _super.prototype.addEventListener.call(this, type, listener);
        switch (type) {
            case DisplayObjectEvent.POSITION_CHANGED:
                this._listenToPositionChanged = true;
                break;
            case DisplayObjectEvent.ROTATION_CHANGED:
                this._listenToRotationChanged = true;
                break;
            case DisplayObjectEvent.SCALE_CHANGED:
                this._listenToScaleChanged = true;
                break;
            case DisplayObjectEvent.SCENE_CHANGED:
                this._listenToSceneChanged = true;
                break;
            case DisplayObjectEvent.SCENETRANSFORM_CHANGED:
                this._listenToSceneTransformChanged = true;
                break;
        }
    };
    /**
     *
     */
    DisplayObject.prototype.clone = function () {
        var clone = new DisplayObject();
        clone.pivot = this.pivot;
        clone._iMatrix3D = this._iMatrix3D;
        clone.name = name;
        // todo: implement for all subtypes
        return clone;
    };
    /**
     *
     */
    DisplayObject.prototype.dispose = function () {
        if (this.parent)
            this.parent.removeChild(this);
        while (this._pRenderables.length)
            this._pRenderables[0].dispose();
    };
    /**
     * @inheritDoc
     */
    DisplayObject.prototype.disposeAsset = function () {
        this.dispose();
    };
    /**
     * Returns a rectangle that defines the area of the display object relative
     * to the coordinate system of the <code>targetCoordinateSpace</code> object.
     * Consider the following code, which shows how the rectangle returned can
     * vary depending on the <code>targetCoordinateSpace</code> parameter that
     * you pass to the method:
     *
     * <p><b>Note:</b> Use the <code>localToGlobal()</code> and
     * <code>globalToLocal()</code> methods to convert the display object's local
     * coordinates to display coordinates, or display coordinates to local
     * coordinates, respectively.</p>
     *
     * <p>The <code>getBounds()</code> method is similar to the
     * <code>getRect()</code> method; however, the Rectangle returned by the
     * <code>getBounds()</code> method includes any strokes on shapes, whereas
     * the Rectangle returned by the <code>getRect()</code> method does not. For
     * an example, see the description of the <code>getRect()</code> method.</p>
     *
     * @param targetCoordinateSpace The display object that defines the
     *                              coordinate system to use.
     * @return The rectangle that defines the area of the display object relative
     *         to the <code>targetCoordinateSpace</code> object's coordinate
     *         system.
     */
    DisplayObject.prototype.getBounds = function (targetCoordinateSpace) {
        return this._bounds; //TODO
    };
    /**
     * Returns a rectangle that defines the boundary of the display object, based
     * on the coordinate system defined by the <code>targetCoordinateSpace</code>
     * parameter, excluding any strokes on shapes. The values that the
     * <code>getRect()</code> method returns are the same or smaller than those
     * returned by the <code>getBounds()</code> method.
     *
     * <p><b>Note:</b> Use <code>localToGlobal()</code> and
     * <code>globalToLocal()</code> methods to convert the display object's local
     * coordinates to Scene coordinates, or Scene coordinates to local
     * coordinates, respectively.</p>
     *
     * @param targetCoordinateSpace The display object that defines the
     *                              coordinate system to use.
     * @return The rectangle that defines the area of the display object relative
     *         to the <code>targetCoordinateSpace</code> object's coordinate
     *         system.
     */
    DisplayObject.prototype.getRect = function (targetCoordinateSpace) {
        if (targetCoordinateSpace === void 0) { targetCoordinateSpace = null; }
        return this._bounds; //TODO
    };
    DisplayObject.prototype.getBox = function (targetCoordinateSpace) {
        if (targetCoordinateSpace === void 0) { targetCoordinateSpace = null; }
        if (this._iSourcePrefab)
            this._iSourcePrefab._iValidate();
        //TODO targetCoordinateSpace
        if (this._boxBoundsInvalid) {
            this._pUpdateBoxBounds();
            if (this._width != null) {
                this._pScaleX = this._width / this._pBoxBounds.width;
                this.invalidateScale();
            }
            if (this._height != null) {
                this._pScaleY = this._height / this._pBoxBounds.height;
                this.invalidateScale();
            }
            if (this._depth != null) {
                this._pScaleZ = this._depth / this._pBoxBounds.depth;
                this.invalidateScale();
            }
        }
        return this._pBoxBounds;
    };
    DisplayObject.prototype.getSphere = function (targetCoordinateSpace) {
        if (targetCoordinateSpace === void 0) { targetCoordinateSpace = null; }
        if (this._iSourcePrefab)
            this._iSourcePrefab._iValidate();
        if (this._sphereBoundsInvalid) {
            this._pUpdateSphereBounds();
        }
        return this._pSphereBounds;
    };
    /**
     * Converts the <code>point</code> object from the Scene(global) coordinates
     * to the display object's(local) coordinates.
     *
     * <p>To use this method, first create an instance of the Point class. The
     * <i>x</i> and <i>y</i> values that you assign represent global coordinates
     * because they relate to the origin(0,0) of the main display area. Then
     * pass the Point instance as the parameter to the
     * <code>globalToLocal()</code> method. The method returns a new Point object
     * with <i>x</i> and <i>y</i> values that relate to the origin of the display
     * object instead of the origin of the Scene.</p>
     *
     * @param point An object created with the Point class. The Point object
     *              specifies the <i>x</i> and <i>y</i> coordinates as
     *              properties.
     * @return A Point object with coordinates relative to the display object.
     */
    DisplayObject.prototype.globalToLocal = function (point) {
        return point; //TODO
    };
    /**
     * Converts a two-dimensional point from the Scene(global) coordinates to a
     * three-dimensional display object's(local) coordinates.
     *
     * <p>To use this method, first create an instance of the Vector3D class. The x,
     * y and z values that you assign to the Vector3D object represent global
     * coordinates because they are relative to the origin(0,0,0) of the scene. Then
     * pass the Vector3D object to the <code>globalToLocal3D()</code> method as the
     * <code>position</code> parameter.
     * The method returns three-dimensional coordinates as a Vector3D object
     * containing <code>x</code>, <code>y</code>, and <code>z</code> values that
     * are relative to the origin of the three-dimensional display object.</p>
     *
     * @param point A Vector3D object representing global x, y and z coordinates in
     *              the scene.
     * @return A Vector3D object with coordinates relative to the three-dimensional
     *         display object.
     */
    DisplayObject.prototype.globalToLocal3D = function (position) {
        return this.inverseSceneTransform.transformVector(position);
    };
    /**
     * Evaluates the bounding box of the display object to see if it overlaps or
     * intersects with the bounding box of the <code>obj</code> display object.
     *
     * @param obj The display object to test against.
     * @return <code>true</code> if the bounding boxes of the display objects
     *         intersect; <code>false</code> if not.
     */
    DisplayObject.prototype.hitTestObject = function (obj) {
        return false; //TODO
    };
    /**
     * Evaluates the display object to see if it overlaps or intersects with the
     * point specified by the <code>x</code> and <code>y</code> parameters. The
     * <code>x</code> and <code>y</code> parameters specify a point in the
     * coordinate space of the Scene, not the display object container that
     * contains the display object(unless that display object container is the
     * Scene).
     *
     * @param x         The <i>x</i> coordinate to test against this object.
     * @param y         The <i>y</i> coordinate to test against this object.
     * @param shapeFlag Whether to check against the actual pixels of the object
     *                 (<code>true</code>) or the bounding box
     *                 (<code>false</code>).
     * @return <code>true</code> if the display object overlaps or intersects
     *         with the specified point; <code>false</code> otherwise.
     */
    DisplayObject.prototype.hitTestPoint = function (x, y, shapeFlag) {
        if (shapeFlag === void 0) { shapeFlag = false; }
        return false; //TODO
    };
    /**
     * Rotates the 3d object around to face a point defined relative to the local coordinates of the parent <code>ObjectContainer3D</code>.
     *
     * @param    target        The vector defining the point to be looked at
     * @param    upAxis        An optional vector used to define the desired up orientation of the 3d object after rotation has occurred
     */
    DisplayObject.prototype.lookAt = function (target, upAxis) {
        if (upAxis === void 0) { upAxis = null; }
        var yAxis;
        var zAxis;
        var xAxis;
        var raw;
        if (upAxis == null)
            upAxis = Vector3D.Y_AXIS;
        else
            upAxis.normalize();
        zAxis = target.subtract(this._iMatrix3D.position);
        zAxis.normalize();
        xAxis = upAxis.crossProduct(zAxis);
        xAxis.normalize();
        if (xAxis.length < 0.05) {
            xAxis.x = upAxis.y;
            xAxis.y = upAxis.x;
            xAxis.z = 0;
            xAxis.normalize();
        }
        yAxis = zAxis.crossProduct(xAxis);
        raw = Matrix3DUtils.RAW_DATA_CONTAINER;
        raw[0] = xAxis.x;
        raw[1] = xAxis.y;
        raw[2] = xAxis.z;
        raw[3] = 0;
        raw[4] = yAxis.x;
        raw[5] = yAxis.y;
        raw[6] = yAxis.z;
        raw[7] = 0;
        raw[8] = zAxis.x;
        raw[9] = zAxis.y;
        raw[10] = zAxis.z;
        raw[11] = 0;
        var m = new Matrix3D();
        m.copyRawDataFrom(raw);
        var vec = m.decompose()[1];
        this._rotationX = vec.x;
        this._rotationY = vec.y;
        this._rotationZ = vec.z;
        this.invalidateRotation();
    };
    /**
     * Converts the <code>point</code> object from the display object's(local)
     * coordinates to the Scene(global) coordinates.
     *
     * <p>This method allows you to convert any given <i>x</i> and <i>y</i>
     * coordinates from values that are relative to the origin(0,0) of a
     * specific display object(local coordinates) to values that are relative to
     * the origin of the Scene(global coordinates).</p>
     *
     * <p>To use this method, first create an instance of the Point class. The
     * <i>x</i> and <i>y</i> values that you assign represent local coordinates
     * because they relate to the origin of the display object.</p>
     *
     * <p>You then pass the Point instance that you created as the parameter to
     * the <code>localToGlobal()</code> method. The method returns a new Point
     * object with <i>x</i> and <i>y</i> values that relate to the origin of the
     * Scene instead of the origin of the display object.</p>
     *
     * @param point The name or identifier of a point created with the Point
     *              class, specifying the <i>x</i> and <i>y</i> coordinates as
     *              properties.
     * @return A Point object with coordinates relative to the Scene.
     */
    DisplayObject.prototype.localToGlobal = function (point) {
        return new Point(); //TODO
    };
    /**
     * Converts a three-dimensional point of the three-dimensional display
     * object's(local) coordinates to a three-dimensional point in the Scene
     * (global) coordinates.
     *
     * <p>This method allows you to convert any given <i>x</i>, <i>y</i> and
     * <i>z</i> coordinates from values that are relative to the origin(0,0,0) of
     * a specific display object(local coordinates) to values that are relative to
     * the origin of the Scene(global coordinates).</p>
     *
     * <p>To use this method, first create an instance of the Point class. The
     * <i>x</i> and <i>y</i> values that you assign represent local coordinates
     * because they relate to the origin of the display object.</p>
     *
     * <p>You then pass the Vector3D instance that you created as the parameter to
     * the <code>localToGlobal3D()</code> method. The method returns a new
     * Vector3D object with <i>x</i>, <i>y</i> and <i>z</i> values that relate to
     * the origin of the Scene instead of the origin of the display object.</p>
     *
     * @param position A Vector3D object containing either a three-dimensional
     *                position or the coordinates of the three-dimensional
     *                display object.
     * @return A Vector3D object representing a three-dimensional position in
     *         the Scene.
     */
    DisplayObject.prototype.localToGlobal3D = function (position) {
        return this.sceneTransform.transformVector(position);
    };
    /**
     * Moves the 3d object directly to a point in space
     *
     * @param    dx        The amount of movement along the local x axis.
     * @param    dy        The amount of movement along the local y axis.
     * @param    dz        The amount of movement along the local z axis.
     */
    DisplayObject.prototype.moveTo = function (dx, dy, dz) {
        if (this._x == dx && this._y == dy && this._z == dz)
            return;
        this._x = dx;
        this._y = dy;
        this._z = dz;
        this.invalidatePosition();
    };
    /**
     * Moves the local point around which the object rotates.
     *
     * @param    dx        The amount of movement along the local x axis.
     * @param    dy        The amount of movement along the local y axis.
     * @param    dz        The amount of movement along the local z axis.
     */
    DisplayObject.prototype.movePivot = function (dx, dy, dz) {
        if (this._pivot == null)
            this._pivot = new Vector3D();
        this._pivot.x += dx;
        this._pivot.y += dy;
        this._pivot.z += dz;
        this.invalidatePivot();
    };
    /**
     * Rotates the 3d object around it's local x-axis
     *
     * @param    angle        The amount of rotation in degrees
     */
    DisplayObject.prototype.pitch = function (angle) {
        this.rotate(Vector3D.X_AXIS, angle);
    };
    /**
     *
     */
    DisplayObject.prototype.getRenderSceneTransform = function (camera) {
        if (this.orientationMode == OrientationMode.CAMERA_PLANE) {
            var comps = camera.sceneTransform.decompose();
            var scale = comps[2];
            comps[0] = this.scenePosition;
            scale.x = this._pScaleX;
            scale.y = this._pScaleY;
            scale.z = this._pScaleZ;
            this._orientationMatrix.recompose(comps);
            //add in case of pivot
            if (!this._pivotZero && this.alignmentMode == AlignmentMode.PIVOT_POINT)
                this._orientationMatrix.prependTranslation(-this._pivot.x / this._pScaleX, -this._pivot.y / this._pScaleY, -this._pivot.z / this._pScaleZ);
            return this._orientationMatrix;
        }
        return this.sceneTransform;
    };
    /**
     * Rotates the 3d object around it's local z-axis
     *
     * @param    angle        The amount of rotation in degrees
     */
    DisplayObject.prototype.roll = function (angle) {
        this.rotate(Vector3D.Z_AXIS, angle);
    };
    /**
     * Rotates the 3d object around an axis by a defined angle
     *
     * @param    axis        The vector defining the axis of rotation
     * @param    angle        The amount of rotation in degrees
     */
    DisplayObject.prototype.rotate = function (axis, angle) {
        var m = new Matrix3D();
        m.prependRotation(angle, axis);
        var vec = m.decompose()[1];
        this._rotationX += vec.x;
        this._rotationY += vec.y;
        this._rotationZ += vec.z;
        this.invalidateRotation();
    };
    /**
     * Rotates the 3d object directly to a euler angle
     *
     * @param    ax        The angle in degrees of the rotation around the x axis.
     * @param    ay        The angle in degrees of the rotation around the y axis.
     * @param    az        The angle in degrees of the rotation around the z axis.
     */
    DisplayObject.prototype.rotateTo = function (ax, ay, az) {
        this._rotationX = ax * MathConsts.DEGREES_TO_RADIANS;
        this._rotationY = ay * MathConsts.DEGREES_TO_RADIANS;
        this._rotationZ = az * MathConsts.DEGREES_TO_RADIANS;
        this.invalidateRotation();
    };
    /**
     *
     */
    DisplayObject.prototype.removeEventListener = function (type, listener) {
        _super.prototype.removeEventListener.call(this, type, listener);
        if (this.hasEventListener(type, listener))
            return;
        switch (type) {
            case DisplayObjectEvent.POSITION_CHANGED:
                this._listenToPositionChanged = false;
                break;
            case DisplayObjectEvent.ROTATION_CHANGED:
                this._listenToRotationChanged = false;
                break;
            case DisplayObjectEvent.SCALE_CHANGED:
                this._listenToScaleChanged = false;
                break;
        }
    };
    /**
     * Moves the 3d object along a vector by a defined length
     *
     * @param    axis        The vector defining the axis of movement
     * @param    distance    The length of the movement
     */
    DisplayObject.prototype.translate = function (axis, distance) {
        var x = axis.x, y = axis.y, z = axis.z;
        var len = distance / Math.sqrt(x * x + y * y + z * z);
        this._x += x * len;
        this._y += y * len;
        this._z += z * len;
        this.invalidatePosition();
    };
    /**
     * Moves the 3d object along a vector by a defined length
     *
     * @param    axis        The vector defining the axis of movement
     * @param    distance    The length of the movement
     */
    DisplayObject.prototype.translateLocal = function (axis, distance) {
        var x = axis.x, y = axis.y, z = axis.z;
        var len = distance / Math.sqrt(x * x + y * y + z * z);
        this._iMatrix3D.prependTranslation(x * len, y * len, z * len);
        this._matrix3D.copyColumnTo(3, this._pos);
        this._x = this._pos.x;
        this._y = this._pos.y;
        this._z = this._pos.z;
        this.invalidatePosition();
    };
    /**
     * Rotates the 3d object around it's local y-axis
     *
     * @param    angle        The amount of rotation in degrees
     */
    DisplayObject.prototype.yaw = function (angle) {
        this.rotate(Vector3D.Y_AXIS, angle);
    };
    Object.defineProperty(DisplayObject.prototype, "_iAssignedPartition", {
        /**
         * @internal
         */
        get: function () {
            return this._pImplicitPartition;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "_iMatrix3D", {
        /**
         * The transformation of the 3d object, relative to the local coordinates of the parent <code>ObjectContainer3D</code>.
         *
         * @internal
         */
        get: function () {
            if (this._matrix3DDirty)
                this._pUpdateMatrix3D();
            return this._matrix3D;
        },
        set: function (val) {
            // TODO: From AS3 - Do we still need this in JS ?
            //ridiculous matrix error
            /*
            if (!val.rawData[0]) {
    
                var raw:number[] = Matrix3DUtils.RAW_DATA_CONTAINER;
                val.copyRawDataTo(raw);
                raw[0] = this._smallestNumber;
                val.copyRawDataFrom(raw);
            }
            //*/
            var elements = val.decompose();
            var vec;
            vec = elements[0];
            if (this._x != vec.x || this._y != vec.y || this._z != vec.z) {
                this._x = vec.x;
                this._y = vec.y;
                this._z = vec.z;
                this.invalidatePosition();
            }
            vec = elements[1];
            if (this._rotationX != vec.x || this._rotationY != vec.y || this._rotationZ != vec.z) {
                this._rotationX = vec.x;
                this._rotationY = vec.y;
                this._rotationZ = vec.z;
                this.invalidateRotation();
            }
            vec = elements[2];
            if (this._pScaleX != vec.x || this._pScaleY != vec.y || this._pScaleZ != vec.z) {
                this._pScaleX = vec.x;
                this._pScaleY = vec.y;
                this._pScaleZ = vec.z;
                this.invalidateScale();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "_iPickingCollisionVO", {
        /**
         * @internal
         */
        get: function () {
            if (!this._pPickingCollisionVO)
                this._pPickingCollisionVO = new PickingCollisionVO(this);
            return this._pPickingCollisionVO;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @internal
     */
    DisplayObject.prototype.iSetParent = function (value) {
        this._pParent = value;
        if (value) {
            this._pUpdateImplicitMouseEnabled(value.mouseChildren);
            this._pUpdateImplicitVisibility(value._iIsVisible());
            this._pUpdateImplicitPartition(value._iAssignedPartition, value._pScene);
        }
        else {
            this._pUpdateImplicitMouseEnabled(true);
            this._pUpdateImplicitVisibility(true);
            this._pUpdateImplicitPartition(null, null);
        }
    };
    /**
     * @protected
     */
    DisplayObject.prototype.pInvalidateSceneTransform = function () {
        this._pSceneTransformDirty = !this._pIgnoreTransform;
        this._inverseSceneTransformDirty = !this._pIgnoreTransform;
        this._scenePositionDirty = !this._pIgnoreTransform;
        if (this.isEntity)
            this.invalidatePartition();
        if (this._listenToSceneTransformChanged)
            this.notifySceneTransformChange();
    };
    /**
     * @protected
     */
    DisplayObject.prototype._pUpdateImplicitMouseEnabled = function (value) {
        this._pImplicitMouseEnabled = this._explicitMouseEnabled && value;
        // If there is a parent and this child does not have a picking collider, use its parent's picking collider.
        if (this._pImplicitMouseEnabled && this._pParent && !this._pPickingCollider)
            this._pPickingCollider = this._pParent._pPickingCollider;
    };
    /**
     * @protected
     */
    DisplayObject.prototype._pUpdateImplicitPartition = function (partition, scene) {
        var sceneChanged = this._pScene != scene;
        if (sceneChanged && this._pScene)
            this._pScene.dispatchEvent(new SceneEvent(SceneEvent.REMOVED_FROM_SCENE, this));
        if (this._pScene && this._pImplicitPartition) {
            //unregister partition from current scene
            this._pScene._iUnregisterPartition(this._pImplicitPartition);
            //unregister entity from current partition
            if (this._pIsEntity)
                this._pUnregisterEntity(this._pImplicitPartition);
        }
        // assign parent implicit partition if no explicit one is given
        this._pImplicitPartition = this._explicitPartition || partition;
        //assign scene
        if (sceneChanged)
            this._pScene = scene;
        if (this._pScene && this._pImplicitPartition) {
            //register partition with scene
            this._pScene._iRegisterPartition(this._pImplicitPartition);
            //register entity with new partition
            if (this._pIsEntity)
                this._pRegisterEntity(this._pImplicitPartition);
        }
        if (sceneChanged && this._pScene)
            this._pScene.dispatchEvent(new SceneEvent(SceneEvent.ADDED_TO_SCENE, this));
        if (sceneChanged) {
            if (!this._pSceneTransformDirty && !this._pIgnoreTransform)
                this.pInvalidateSceneTransform();
            if (this._listenToSceneChanged)
                this.notifySceneChange();
        }
    };
    /**
     * @protected
     */
    DisplayObject.prototype._pUpdateImplicitVisibility = function (value) {
        this._pImplicitVisibility = this._explicitVisibility && value;
    };
    /**
     * @protected
     */
    DisplayObject.prototype._pUpdateMatrix3D = function () {
        this._pos.x = this._x;
        this._pos.y = this._y;
        this._pos.z = this._z;
        this._rot.x = this._rotationX;
        this._rot.y = this._rotationY;
        this._rot.z = this._rotationZ;
        this._sca.x = this._pScaleX;
        this._sca.y = this._pScaleY;
        this._sca.z = this._pScaleZ;
        this._matrix3D.recompose(this._transformComponents);
        if (!this._pivotZero) {
            this._pivotScale.x = this._pivot.x / this._pScaleX;
            this._pivotScale.y = this._pivot.y / this._pScaleY;
            this._pivotScale.z = this._pivot.z / this._pScaleZ;
            this._matrix3D.prependTranslation(-this._pivotScale.x, -this._pivotScale.y, -this._pivotScale.z);
            if (this.alignmentMode != AlignmentMode.PIVOT_POINT)
                this._matrix3D.appendTranslation(this._pivot.x, this._pivot.y, this._pivot.z);
        }
        this._matrix3DDirty = false;
        this._positionDirty = false;
        this._rotationDirty = false;
        this._scaleDirty = false;
        this._pivotDirty = false;
    };
    /**
     * @protected
     */
    DisplayObject.prototype.pUpdateSceneTransform = function () {
        if (this._pParent && !this._pParent._iIsRoot) {
            this._pSceneTransform.copyFrom(this._pParent.sceneTransform);
            this._pSceneTransform.prepend(this._iMatrix3D);
        }
        else {
            this._pSceneTransform.copyFrom(this._iMatrix3D);
        }
        this._pSceneTransformDirty = false;
    };
    DisplayObject.prototype._iAddRenderable = function (renderable) {
        this._pRenderables.push(renderable);
        return renderable;
    };
    DisplayObject.prototype._iRemoveRenderable = function (renderable) {
        var index = this._pRenderables.indexOf(renderable);
        this._pRenderables.splice(index, 1);
        return renderable;
    };
    /**
     * //TODO
     *
     * @param shortestCollisionDistance
     * @param findClosest
     * @returns {boolean}
     *
     * @internal
     */
    DisplayObject.prototype._iTestCollision = function (shortestCollisionDistance, findClosest) {
        return false;
    };
    /**
     *
     */
    DisplayObject.prototype._iInternalUpdate = function () {
        if (this._iController)
            this._iController.update();
    };
    /**
     * @internal
     */
    DisplayObject.prototype._iIsVisible = function () {
        return this._pImplicitVisibility;
    };
    /**
     * @internal
     */
    DisplayObject.prototype._iIsMouseEnabled = function () {
        return this._pImplicitMouseEnabled;
    };
    /**
     * @internal
     */
    DisplayObject.prototype._iSetScene = function (value) {
        if (this._pScene == value)
            return;
        this._pUpdateImplicitPartition(this._pParent ? this._pParent._iAssignedPartition : null, value);
    };
    /**
     * @private
     */
    DisplayObject.prototype.notifyPositionChanged = function () {
        if (!this._positionChanged)
            this._positionChanged = new DisplayObjectEvent(DisplayObjectEvent.POSITION_CHANGED, this);
        this.dispatchEvent(this._positionChanged);
    };
    /**
     * @private
     */
    DisplayObject.prototype.notifyRotationChanged = function () {
        if (!this._rotationChanged)
            this._rotationChanged = new DisplayObjectEvent(DisplayObjectEvent.ROTATION_CHANGED, this);
        this.dispatchEvent(this._rotationChanged);
    };
    /**
     * @private
     */
    DisplayObject.prototype.notifyScaleChanged = function () {
        if (!this._scaleChanged)
            this._scaleChanged = new DisplayObjectEvent(DisplayObjectEvent.SCALE_CHANGED, this);
        this.dispatchEvent(this._scaleChanged);
    };
    /**
     * @private
     */
    DisplayObject.prototype.notifySceneChange = function () {
        if (!this._scenechanged)
            this._scenechanged = new DisplayObjectEvent(DisplayObjectEvent.SCENE_CHANGED, this);
        this.dispatchEvent(this._scenechanged);
    };
    /**
     * @private
     */
    DisplayObject.prototype.notifySceneTransformChange = function () {
        if (!this._sceneTransformChanged)
            this._sceneTransformChanged = new DisplayObjectEvent(DisplayObjectEvent.SCENETRANSFORM_CHANGED, this);
        this.dispatchEvent(this._sceneTransformChanged);
    };
    /**
     * Invalidates the 3D transformation matrix, causing it to be updated upon the next request
     *
     * @private
     */
    DisplayObject.prototype.invalidateMatrix3D = function () {
        if (this._matrix3DDirty)
            return;
        this._matrix3DDirty = true;
        if (!this._pSceneTransformDirty && !this._pIgnoreTransform)
            this.pInvalidateSceneTransform();
    };
    /**
     * @private
     */
    DisplayObject.prototype.invalidatePartition = function () {
        var len = this._entityNodes.length;
        for (var i = 0; i < len; i++)
            this._entityNodes[i].invalidatePartition();
    };
    /**
     * @private
     */
    DisplayObject.prototype.invalidatePivot = function () {
        this._pivotZero = (this._pivot.x == 0) && (this._pivot.y == 0) && (this._pivot.z == 0);
        if (this._pivotDirty)
            return;
        this._pivotDirty = true;
        this.invalidateMatrix3D();
    };
    /**
     * @private
     */
    DisplayObject.prototype.invalidatePosition = function () {
        if (this._positionDirty)
            return;
        this._positionDirty = true;
        this.invalidateMatrix3D();
        if (this._listenToPositionChanged)
            this.notifyPositionChanged();
    };
    /**
     * @private
     */
    DisplayObject.prototype.invalidateRotation = function () {
        if (this._rotationDirty)
            return;
        this._rotationDirty = true;
        this.invalidateMatrix3D();
        if (this._listenToRotationChanged)
            this.notifyRotationChanged();
    };
    /**
     * @private
     */
    DisplayObject.prototype.invalidateScale = function () {
        if (this._scaleDirty)
            return;
        this._scaleDirty = true;
        this.invalidateMatrix3D();
        if (this._listenToScaleChanged)
            this.notifyScaleChanged();
    };
    DisplayObject.prototype._iAddEntityNode = function (entityNode) {
        this._entityNodes.push(entityNode);
        return entityNode;
    };
    DisplayObject.prototype._iRemoveEntityNode = function (entityNode) {
        var index = this._entityNodes.indexOf(entityNode);
        this._entityNodes.splice(index, 1);
        return entityNode;
    };
    DisplayObject.prototype._pRegisterEntity = function (partition) {
        throw new AbstractMethodError();
    };
    DisplayObject.prototype._pUnregisterEntity = function (partition) {
        throw new AbstractMethodError();
    };
    DisplayObject.prototype._pInvalidateBounds = function () {
        this._boxBoundsInvalid = true;
        this._sphereBoundsInvalid = true;
        if (this.isEntity)
            this.invalidatePartition();
    };
    DisplayObject.prototype._pUpdateBoxBounds = function () {
        this._boxBoundsInvalid = false;
        if (this._pBoxBounds == null)
            this._pBoxBounds = new Box();
    };
    DisplayObject.prototype._pUpdateSphereBounds = function () {
        this._sphereBoundsInvalid = false;
        if (this._pSphereBounds == null)
            this._pSphereBounds = new Sphere();
    };
    return DisplayObject;
})(AssetBase);
module.exports = DisplayObject;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0Rpc3BsYXlPYmplY3QudHMiXSwibmFtZXMiOlsiRGlzcGxheU9iamVjdCIsIkRpc3BsYXlPYmplY3QuY29uc3RydWN0b3IiLCJEaXNwbGF5T2JqZWN0LmJvdW5kc1R5cGUiLCJEaXNwbGF5T2JqZWN0LmRlcHRoIiwiRGlzcGxheU9iamVjdC5ldWxlcnMiLCJEaXNwbGF5T2JqZWN0LmhlaWdodCIsIkRpc3BsYXlPYmplY3QuaW5kZXgiLCJEaXNwbGF5T2JqZWN0LmludmVyc2VTY2VuZVRyYW5zZm9ybSIsIkRpc3BsYXlPYmplY3QuaWdub3JlVHJhbnNmb3JtIiwiRGlzcGxheU9iamVjdC5pc0VudGl0eSIsIkRpc3BsYXlPYmplY3QubG9hZGVySW5mbyIsIkRpc3BsYXlPYmplY3QubW91c2VFbmFibGVkIiwiRGlzcGxheU9iamVjdC5tb3VzZVgiLCJEaXNwbGF5T2JqZWN0Lm1vdXNlWSIsIkRpc3BsYXlPYmplY3QucGFyZW50IiwiRGlzcGxheU9iamVjdC5wYXJ0aXRpb24iLCJEaXNwbGF5T2JqZWN0LnBpY2tpbmdDb2xsaWRlciIsIkRpc3BsYXlPYmplY3QucGl2b3QiLCJEaXNwbGF5T2JqZWN0LnJvb3QiLCJEaXNwbGF5T2JqZWN0LnJvdGF0aW9uWCIsIkRpc3BsYXlPYmplY3Qucm90YXRpb25ZIiwiRGlzcGxheU9iamVjdC5yb3RhdGlvbloiLCJEaXNwbGF5T2JqZWN0LnNjYWxlWCIsIkRpc3BsYXlPYmplY3Quc2NhbGVZIiwiRGlzcGxheU9iamVjdC5zY2FsZVoiLCJEaXNwbGF5T2JqZWN0LnNjZW5lIiwiRGlzcGxheU9iamVjdC5zY2VuZVBvc2l0aW9uIiwiRGlzcGxheU9iamVjdC5zY2VuZVRyYW5zZm9ybSIsIkRpc3BsYXlPYmplY3Quc2hhZGVyUGlja2luZ0RldGFpbHMiLCJEaXNwbGF5T2JqZWN0LmRlYnVnVmlzaWJsZSIsIkRpc3BsYXlPYmplY3QudHJhbnNmb3JtIiwiRGlzcGxheU9iamVjdC52aXNpYmxlIiwiRGlzcGxheU9iamVjdC53aWR0aCIsIkRpc3BsYXlPYmplY3QueCIsIkRpc3BsYXlPYmplY3QueSIsIkRpc3BsYXlPYmplY3QueiIsIkRpc3BsYXlPYmplY3Quek9mZnNldCIsIkRpc3BsYXlPYmplY3QuYWRkRXZlbnRMaXN0ZW5lciIsIkRpc3BsYXlPYmplY3QuY2xvbmUiLCJEaXNwbGF5T2JqZWN0LmRpc3Bvc2UiLCJEaXNwbGF5T2JqZWN0LmRpc3Bvc2VBc3NldCIsIkRpc3BsYXlPYmplY3QuZ2V0Qm91bmRzIiwiRGlzcGxheU9iamVjdC5nZXRSZWN0IiwiRGlzcGxheU9iamVjdC5nZXRCb3giLCJEaXNwbGF5T2JqZWN0LmdldFNwaGVyZSIsIkRpc3BsYXlPYmplY3QuZ2xvYmFsVG9Mb2NhbCIsIkRpc3BsYXlPYmplY3QuZ2xvYmFsVG9Mb2NhbDNEIiwiRGlzcGxheU9iamVjdC5oaXRUZXN0T2JqZWN0IiwiRGlzcGxheU9iamVjdC5oaXRUZXN0UG9pbnQiLCJEaXNwbGF5T2JqZWN0Lmxvb2tBdCIsIkRpc3BsYXlPYmplY3QubG9jYWxUb0dsb2JhbCIsIkRpc3BsYXlPYmplY3QubG9jYWxUb0dsb2JhbDNEIiwiRGlzcGxheU9iamVjdC5tb3ZlVG8iLCJEaXNwbGF5T2JqZWN0Lm1vdmVQaXZvdCIsIkRpc3BsYXlPYmplY3QucGl0Y2giLCJEaXNwbGF5T2JqZWN0LmdldFJlbmRlclNjZW5lVHJhbnNmb3JtIiwiRGlzcGxheU9iamVjdC5yb2xsIiwiRGlzcGxheU9iamVjdC5yb3RhdGUiLCJEaXNwbGF5T2JqZWN0LnJvdGF0ZVRvIiwiRGlzcGxheU9iamVjdC5yZW1vdmVFdmVudExpc3RlbmVyIiwiRGlzcGxheU9iamVjdC50cmFuc2xhdGUiLCJEaXNwbGF5T2JqZWN0LnRyYW5zbGF0ZUxvY2FsIiwiRGlzcGxheU9iamVjdC55YXciLCJEaXNwbGF5T2JqZWN0Ll9pQXNzaWduZWRQYXJ0aXRpb24iLCJEaXNwbGF5T2JqZWN0Ll9pTWF0cml4M0QiLCJEaXNwbGF5T2JqZWN0Ll9pUGlja2luZ0NvbGxpc2lvblZPIiwiRGlzcGxheU9iamVjdC5pU2V0UGFyZW50IiwiRGlzcGxheU9iamVjdC5wSW52YWxpZGF0ZVNjZW5lVHJhbnNmb3JtIiwiRGlzcGxheU9iamVjdC5fcFVwZGF0ZUltcGxpY2l0TW91c2VFbmFibGVkIiwiRGlzcGxheU9iamVjdC5fcFVwZGF0ZUltcGxpY2l0UGFydGl0aW9uIiwiRGlzcGxheU9iamVjdC5fcFVwZGF0ZUltcGxpY2l0VmlzaWJpbGl0eSIsIkRpc3BsYXlPYmplY3QuX3BVcGRhdGVNYXRyaXgzRCIsIkRpc3BsYXlPYmplY3QucFVwZGF0ZVNjZW5lVHJhbnNmb3JtIiwiRGlzcGxheU9iamVjdC5faUFkZFJlbmRlcmFibGUiLCJEaXNwbGF5T2JqZWN0Ll9pUmVtb3ZlUmVuZGVyYWJsZSIsIkRpc3BsYXlPYmplY3QuX2lUZXN0Q29sbGlzaW9uIiwiRGlzcGxheU9iamVjdC5faUludGVybmFsVXBkYXRlIiwiRGlzcGxheU9iamVjdC5faUlzVmlzaWJsZSIsIkRpc3BsYXlPYmplY3QuX2lJc01vdXNlRW5hYmxlZCIsIkRpc3BsYXlPYmplY3QuX2lTZXRTY2VuZSIsIkRpc3BsYXlPYmplY3Qubm90aWZ5UG9zaXRpb25DaGFuZ2VkIiwiRGlzcGxheU9iamVjdC5ub3RpZnlSb3RhdGlvbkNoYW5nZWQiLCJEaXNwbGF5T2JqZWN0Lm5vdGlmeVNjYWxlQ2hhbmdlZCIsIkRpc3BsYXlPYmplY3Qubm90aWZ5U2NlbmVDaGFuZ2UiLCJEaXNwbGF5T2JqZWN0Lm5vdGlmeVNjZW5lVHJhbnNmb3JtQ2hhbmdlIiwiRGlzcGxheU9iamVjdC5pbnZhbGlkYXRlTWF0cml4M0QiLCJEaXNwbGF5T2JqZWN0LmludmFsaWRhdGVQYXJ0aXRpb24iLCJEaXNwbGF5T2JqZWN0LmludmFsaWRhdGVQaXZvdCIsIkRpc3BsYXlPYmplY3QuaW52YWxpZGF0ZVBvc2l0aW9uIiwiRGlzcGxheU9iamVjdC5pbnZhbGlkYXRlUm90YXRpb24iLCJEaXNwbGF5T2JqZWN0LmludmFsaWRhdGVTY2FsZSIsIkRpc3BsYXlPYmplY3QuX2lBZGRFbnRpdHlOb2RlIiwiRGlzcGxheU9iamVjdC5faVJlbW92ZUVudGl0eU5vZGUiLCJEaXNwbGF5T2JqZWN0Ll9wUmVnaXN0ZXJFbnRpdHkiLCJEaXNwbGF5T2JqZWN0Ll9wVW5yZWdpc3RlckVudGl0eSIsIkRpc3BsYXlPYmplY3QuX3BJbnZhbGlkYXRlQm91bmRzIiwiRGlzcGxheU9iamVjdC5fcFVwZGF0ZUJveEJvdW5kcyIsIkRpc3BsYXlPYmplY3QuX3BVcGRhdGVTcGhlcmVCb3VuZHMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLElBQU8sR0FBRyxXQUFpQiwwQkFBMEIsQ0FBQyxDQUFDO0FBQ3ZELElBQU8sTUFBTSxXQUFnQiw2QkFBNkIsQ0FBQyxDQUFDO0FBQzVELElBQU8sVUFBVSxXQUFlLGlDQUFpQyxDQUFDLENBQUM7QUFDbkUsSUFBTyxRQUFRLFdBQWdCLCtCQUErQixDQUFDLENBQUM7QUFDaEUsSUFBTyxhQUFhLFdBQWMsb0NBQW9DLENBQUMsQ0FBQztBQUN4RSxJQUFPLEtBQUssV0FBZ0IsNEJBQTRCLENBQUMsQ0FBQztBQUUxRCxJQUFPLFFBQVEsV0FBZ0IsK0JBQStCLENBQUMsQ0FBQztBQUNoRSxJQUFPLFNBQVMsV0FBZSxtQ0FBbUMsQ0FBQyxDQUFDO0FBQ3BFLElBQU8sbUJBQW1CLFdBQWEsNENBQTRDLENBQUMsQ0FBQztBQUtyRixJQUFPLGFBQWEsV0FBYyx1Q0FBdUMsQ0FBQyxDQUFDO0FBRTNFLElBQU8sZUFBZSxXQUFjLHlDQUF5QyxDQUFDLENBQUM7QUFFL0UsSUFBTyxTQUFTLFdBQWUsbUNBQW1DLENBQUMsQ0FBQztBQUlwRSxJQUFPLGtCQUFrQixXQUFhLDRDQUE0QyxDQUFDLENBQUM7QUFHcEYsSUFBTyxrQkFBa0IsV0FBYSw4Q0FBOEMsQ0FBQyxDQUFDO0FBQ3RGLElBQU8sVUFBVSxXQUFlLHNDQUFzQyxDQUFDLENBQUM7QUFHeEUsQUFpSUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBREc7SUFDRyxhQUFhO0lBQVNBLFVBQXRCQSxhQUFhQSxVQUFrQkE7SUFvbkNwQ0E7O09BRUdBO0lBQ0hBLFNBdm5DS0EsYUFBYUE7UUF5bkNqQkMsaUJBQU9BLENBQUNBO1FBam5DREEsc0JBQWlCQSxHQUFXQSxJQUFJQSxDQUFDQTtRQUVqQ0EseUJBQW9CQSxHQUFXQSxJQUFJQSxDQUFDQTtRQUtyQ0EscUJBQWdCQSxHQUFZQSxJQUFJQSxRQUFRQSxFQUFFQSxDQUFDQTtRQUMzQ0EsMEJBQXFCQSxHQUFXQSxJQUFJQSxDQUFDQTtRQVNwQ0EsY0FBU0EsR0FBWUEsSUFBSUEsUUFBUUEsRUFBRUEsQ0FBQ0E7UUFDcENBLG1CQUFjQSxHQUFXQSxJQUFJQSxDQUFDQTtRQUU5QkEsMkJBQXNCQSxHQUFZQSxJQUFJQSxRQUFRQSxFQUFFQSxDQUFDQTtRQUNqREEsZ0NBQTJCQSxHQUFXQSxJQUFJQSxDQUFDQTtRQUMzQ0EsbUJBQWNBLEdBQVlBLElBQUlBLFFBQVFBLEVBQUVBLENBQUNBO1FBQ3pDQSx3QkFBbUJBLEdBQVdBLElBQUlBLENBQUNBO1FBQ25DQSx3QkFBbUJBLEdBQVdBLElBQUlBLENBQUNBO1FBQ3BDQSx5QkFBb0JBLEdBQVdBLElBQUlBLENBQUNBO1FBQ25DQSwwQkFBcUJBLEdBQVdBLElBQUlBLENBQUNBO1FBQ3RDQSwyQkFBc0JBLEdBQVdBLElBQUlBLENBQUNBO1FBSXJDQSxtQkFBY0EsR0FBV0EsSUFBSUEsQ0FBQ0E7UUFDOUJBLG1CQUFjQSxHQUFXQSxJQUFJQSxDQUFDQTtRQUM5QkEsZ0JBQVdBLEdBQVdBLElBQUlBLENBQUNBO1FBTTNCQSxlQUFVQSxHQUFVQSxDQUFDQSxDQUFDQTtRQUN0QkEsZUFBVUEsR0FBVUEsQ0FBQ0EsQ0FBQ0E7UUFDdEJBLGVBQVVBLEdBQVVBLENBQUNBLENBQUNBO1FBQ3RCQSxZQUFPQSxHQUFZQSxJQUFJQSxRQUFRQSxFQUFFQSxDQUFDQTtRQUNsQ0EsV0FBTUEsR0FBWUEsSUFBSUEsUUFBUUEsRUFBRUEsQ0FBQ0E7UUFLakNBLGFBQVFBLEdBQVVBLENBQUNBLENBQUNBO1FBTXJCQSxhQUFRQSxHQUFVQSxDQUFDQSxDQUFDQTtRQUNwQkEsYUFBUUEsR0FBVUEsQ0FBQ0EsQ0FBQ0E7UUFDcEJBLGFBQVFBLEdBQVVBLENBQUNBLENBQUNBO1FBQ25CQSxPQUFFQSxHQUFVQSxDQUFDQSxDQUFDQTtRQUNkQSxPQUFFQSxHQUFVQSxDQUFDQSxDQUFDQTtRQUNkQSxPQUFFQSxHQUFVQSxDQUFDQSxDQUFDQTtRQUNkQSxXQUFNQSxHQUFZQSxJQUFJQSxRQUFRQSxFQUFFQSxDQUFDQTtRQUNqQ0EsZ0JBQVdBLEdBQVlBLElBQUlBLFFBQVFBLEVBQUVBLENBQUNBO1FBQ3RDQSx1QkFBa0JBLEdBQVlBLElBQUlBLFFBQVFBLEVBQUVBLENBQUNBO1FBQzdDQSxlQUFVQSxHQUFXQSxJQUFJQSxDQUFDQTtRQUMxQkEsZ0JBQVdBLEdBQVdBLElBQUlBLENBQUNBO1FBQzNCQSxTQUFJQSxHQUFZQSxJQUFJQSxRQUFRQSxFQUFFQSxDQUFDQTtRQUMvQkEsU0FBSUEsR0FBWUEsSUFBSUEsUUFBUUEsRUFBRUEsQ0FBQ0E7UUFDL0JBLFNBQUlBLEdBQVlBLElBQUlBLFFBQVFBLEVBQUVBLENBQUNBO1FBR2hDQSxzQkFBaUJBLEdBQVdBLEtBQUtBLENBQUNBO1FBVWxDQSxrQkFBYUEsR0FBc0JBLElBQUlBLEtBQUtBLEVBQWVBLENBQUNBO1FBQzNEQSxpQkFBWUEsR0FBcUJBLElBQUlBLEtBQUtBLEVBQWNBLENBQUNBO1FBSWpFQTs7V0FFR0E7UUFDSUEsa0JBQWFBLEdBQVVBLGFBQWFBLENBQUNBLGtCQUFrQkEsQ0FBQ0E7UUFxSC9EQTs7V0FFR0E7UUFDSUEsaUJBQVlBLEdBQVdBLElBQUlBLENBQUNBO1FBc1ZuQ0E7O1dBRUdBO1FBQ0lBLG9CQUFlQSxHQUFVQSxlQUFlQSxDQUFDQSxPQUFPQSxDQUFDQTtRQTBrQnZEQSxBQUdBQSx1REFIdURBO1FBQ3ZEQSx3REFBd0RBO1FBRXhEQSxJQUFJQSxDQUFDQSxvQkFBb0JBLEdBQUdBLElBQUlBLEtBQUtBLENBQVdBLENBQUNBLENBQUNBLENBQUNBO1FBRW5EQSxJQUFJQSxDQUFDQSxvQkFBb0JBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLElBQUlBLENBQUNBO1FBQ3pDQSxJQUFJQSxDQUFDQSxvQkFBb0JBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLElBQUlBLENBQUNBO1FBQ3pDQSxJQUFJQSxDQUFDQSxvQkFBb0JBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLElBQUlBLENBQUNBO1FBRXpDQSxBQUNBQSx5Q0FEeUNBO1FBQ3pDQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxJQUFJQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtRQUV0Q0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsUUFBUUEsRUFBRUEsQ0FBQ0E7UUFFMUJBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLFdBQVdBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO0lBQ25DQSxDQUFDQTtJQW5nQ0RELHNCQUFXQSxxQ0FBVUE7UUFIckJBOztXQUVHQTthQUNIQTtZQUVDRSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQTtRQUN6QkEsQ0FBQ0E7YUFFREYsVUFBc0JBLEtBQVlBO1lBRWpDRSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxJQUFJQSxLQUFLQSxDQUFDQTtnQkFDN0JBLE1BQU1BLENBQUNBO1lBRVJBLElBQUlBLENBQUNBLFdBQVdBLEdBQUdBLEtBQUtBLENBQUNBO1lBRXpCQSxJQUFJQSxDQUFDQSxrQkFBa0JBLEVBQUVBLENBQUNBO1lBRTFCQSxJQUFJQSxHQUFHQSxHQUFVQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxNQUFNQSxDQUFDQTtZQUMxQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBVUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsR0FBR0EsRUFBRUEsQ0FBQ0EsRUFBRUE7Z0JBQ2xDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxZQUFZQSxFQUFFQSxDQUFDQTtRQUN0Q0EsQ0FBQ0E7OztPQWRBRjtJQTBGREEsc0JBQVdBLGdDQUFLQTtRQVZoQkE7Ozs7Ozs7OztXQVNHQTthQUNIQTtZQUVDRyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQSxLQUFLQSxHQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQTtRQUMxQ0EsQ0FBQ0E7YUFFREgsVUFBaUJBLEdBQVVBO1lBRTFCRyxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxJQUFJQSxHQUFHQSxDQUFDQTtnQkFDdEJBLE1BQU1BLENBQUNBO1lBRVJBLElBQUlBLENBQUNBLE1BQU1BLEdBQUdBLEdBQUdBLENBQUNBO1lBRWxCQSxJQUFJQSxDQUFDQSxRQUFRQSxHQUFHQSxHQUFHQSxHQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQTtZQUV4Q0EsSUFBSUEsQ0FBQ0EsZUFBZUEsRUFBRUEsQ0FBQ0E7UUFDeEJBLENBQUNBOzs7T0FaQUg7SUFpQkRBLHNCQUFXQSxpQ0FBTUE7UUFIakJBOztXQUVHQTthQUNIQTtZQUVDSSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFDQSxVQUFVQSxDQUFDQSxrQkFBa0JBLENBQUNBO1lBQy9EQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFDQSxVQUFVQSxDQUFDQSxrQkFBa0JBLENBQUNBO1lBQy9EQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFDQSxVQUFVQSxDQUFDQSxrQkFBa0JBLENBQUNBO1lBRS9EQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQTtRQUNyQkEsQ0FBQ0E7YUFFREosVUFBa0JBLEtBQWNBO1lBRS9CSSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxLQUFLQSxDQUFDQSxDQUFDQSxHQUFDQSxVQUFVQSxDQUFDQSxrQkFBa0JBLENBQUNBO1lBQ3hEQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxLQUFLQSxDQUFDQSxDQUFDQSxHQUFDQSxVQUFVQSxDQUFDQSxrQkFBa0JBLENBQUNBO1lBQ3hEQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxLQUFLQSxDQUFDQSxDQUFDQSxHQUFDQSxVQUFVQSxDQUFDQSxrQkFBa0JBLENBQUNBO1lBRXhEQSxJQUFJQSxDQUFDQSxrQkFBa0JBLEVBQUVBLENBQUNBO1FBQzNCQSxDQUFDQTs7O09BVEFKO0lBMkdEQSxzQkFBV0EsaUNBQU1BO1FBM0ZqQkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQThFR0E7UUFDSkEsa0NBQWtDQTtRQUVqQ0E7Ozs7Ozs7OztXQVNHQTthQUNIQTtZQUVDSyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQSxNQUFNQSxHQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQTtRQUMzQ0EsQ0FBQ0E7YUFFREwsVUFBa0JBLEdBQVVBO1lBRTNCSyxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxJQUFJQSxHQUFHQSxDQUFDQTtnQkFDdkJBLE1BQU1BLENBQUNBO1lBRVJBLElBQUlBLENBQUNBLE9BQU9BLEdBQUdBLEdBQUdBLENBQUNBO1lBRW5CQSxJQUFJQSxDQUFDQSxRQUFRQSxHQUFHQSxHQUFHQSxHQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQSxNQUFNQSxDQUFDQTtZQUV6Q0EsSUFBSUEsQ0FBQ0EsZUFBZUEsRUFBRUEsQ0FBQ0E7UUFDeEJBLENBQUNBOzs7T0FaQUw7SUFzQkRBLHNCQUFXQSxnQ0FBS0E7UUFSaEJBOzs7Ozs7O1dBT0dBO2FBQ0hBO1lBRUNNLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBO2dCQUNqQkEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFFMUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBO1FBQ1ZBLENBQUNBOzs7T0FBQU47SUFLREEsc0JBQVdBLGdEQUFxQkE7UUFIaENBOztXQUVHQTthQUNIQTtZQUVDTyxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSwyQkFBMkJBLENBQUNBLENBQUNBLENBQUNBO2dCQUN0Q0EsSUFBSUEsQ0FBQ0Esc0JBQXNCQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxDQUFDQTtnQkFDMURBLElBQUlBLENBQUNBLHNCQUFzQkEsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0E7Z0JBQ3JDQSxJQUFJQSxDQUFDQSwyQkFBMkJBLEdBQUdBLEtBQUtBLENBQUNBO1lBQzFDQSxDQUFDQTtZQUNEQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxzQkFBc0JBLENBQUNBO1FBQ3BDQSxDQUFDQTs7O09BQUFQO0lBS0RBLHNCQUFXQSwwQ0FBZUE7UUFIMUJBOztXQUVHQTthQUNIQTtZQUVDUSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBO1FBQy9CQSxDQUFDQTthQUVEUixVQUEyQkEsS0FBYUE7WUFFdkNRLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLGlCQUFpQkEsSUFBSUEsS0FBS0EsQ0FBQ0E7Z0JBQ25DQSxNQUFNQSxDQUFDQTtZQUVSQSxJQUFJQSxDQUFDQSxpQkFBaUJBLEdBQUdBLEtBQUtBLENBQUNBO1lBRS9CQSxFQUFFQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDWEEsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxRQUFRQSxFQUFFQSxDQUFDQTtnQkFDakNBLElBQUlBLENBQUNBLGNBQWNBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO1lBQ3BDQSxDQUFDQTtZQUVEQSxJQUFJQSxDQUFDQSx5QkFBeUJBLEVBQUVBLENBQUNBO1FBQ2xDQSxDQUFDQTs7O09BZkFSO0lBb0JEQSxzQkFBV0EsbUNBQVFBO1FBSG5CQTs7V0FFR0E7YUFDSEE7WUFFQ1MsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0E7UUFDeEJBLENBQUNBOzs7T0FBQVQ7SUFlREEsc0JBQVdBLHFDQUFVQTtRQWJyQkE7Ozs7Ozs7Ozs7OztXQVlHQTthQUNIQTtZQUVDVSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQTtRQUN6QkEsQ0FBQ0E7OztPQUFBVjtJQW1EREEsc0JBQVdBLHVDQUFZQTtRQWhCdkJBOzs7Ozs7Ozs7Ozs7Ozs7V0FlR0E7YUFDSEE7WUFFQ1csTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EscUJBQXFCQSxDQUFDQTtRQUNuQ0EsQ0FBQ0E7YUFFRFgsVUFBd0JBLEtBQWFBO1lBRXBDVyxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxxQkFBcUJBLElBQUlBLEtBQUtBLENBQUNBO2dCQUN2Q0EsTUFBTUEsQ0FBQ0E7WUFFUkEsSUFBSUEsQ0FBQ0EscUJBQXFCQSxHQUFHQSxLQUFLQSxDQUFDQTtZQUVuQ0EsSUFBSUEsQ0FBQ0EsNEJBQTRCQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxHQUFFQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxhQUFhQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQTtRQUN0RkEsQ0FBQ0E7OztPQVZBWDtJQW9CREEsc0JBQVdBLGlDQUFNQTtRQVBqQkE7Ozs7OztXQU1HQTthQUNIQTtZQUVDWSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQTtRQUNyQkEsQ0FBQ0E7OztPQUFBWjtJQVNEQSxzQkFBV0EsaUNBQU1BO1FBUGpCQTs7Ozs7O1dBTUdBO2FBQ0hBO1lBRUNhLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBO1FBQ3JCQSxDQUFDQTs7O09BQUFiO0lBaUNEQSxzQkFBV0EsaUNBQU1BO1FBZGpCQTs7Ozs7Ozs7Ozs7OztXQWFHQTthQUNIQTtZQUVDYyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQTtRQUN0QkEsQ0FBQ0E7OztPQUFBZDtJQUtEQSxzQkFBV0Esb0NBQVNBO1FBSHBCQTs7V0FFR0E7YUFDSEE7WUFFQ2UsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQTtRQUNoQ0EsQ0FBQ0E7YUFFRGYsVUFBcUJBLEtBQWVBO1lBRW5DZSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxrQkFBa0JBLElBQUlBLEtBQUtBLENBQUNBO2dCQUNwQ0EsTUFBTUEsQ0FBQ0E7WUFFUkEsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxHQUFHQSxLQUFLQSxDQUFDQTtZQUVoQ0EsSUFBSUEsQ0FBQ0EseUJBQXlCQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxHQUFFQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxtQkFBbUJBLEdBQUdBLElBQUlBLEVBQUVBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO1FBQ3ZHQSxDQUFDQTs7O09BVkFmO0lBZURBLHNCQUFXQSwwQ0FBZUE7UUFIMUJBOztXQUVHQTthQUNIQTtZQUVDZ0IsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQTtRQUMvQkEsQ0FBQ0E7YUFFRGhCLFVBQTJCQSxLQUFzQkE7WUFFaERnQixJQUFJQSxDQUFDQSxpQkFBaUJBLEdBQUdBLEtBQUtBLENBQUNBO1FBQ2hDQSxDQUFDQTs7O09BTEFoQjtJQVVEQSxzQkFBV0EsZ0NBQUtBO1FBSGhCQTs7V0FFR0E7YUFDSEE7WUFFQ2lCLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBO1FBQ3BCQSxDQUFDQTthQUdEakIsVUFBaUJBLEtBQWNBO1lBRTlCaUIsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBR0EsS0FBS0EsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0E7WUFFNUJBLElBQUlBLENBQUNBLGVBQWVBLEVBQUVBLENBQUNBO1FBQ3hCQSxDQUFDQTs7O09BUkFqQjtJQW9DREEsc0JBQVdBLCtCQUFJQTtRQTFCZkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7V0F5QkdBO2FBQ0hBO1lBRUNrQixNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQTtRQUNuQkEsQ0FBQ0E7OztPQUFBbEI7SUFtQkRBLHNCQUFXQSxvQ0FBU0E7UUFQcEJBOzs7Ozs7V0FNR0E7YUFDSEE7WUFFQ21CLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLEdBQUNBLFVBQVVBLENBQUNBLGtCQUFrQkEsQ0FBQ0E7UUFDdERBLENBQUNBO2FBRURuQixVQUFxQkEsR0FBVUE7WUFFOUJtQixFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxJQUFJQSxHQUFHQSxDQUFDQTtnQkFDekJBLE1BQU1BLENBQUNBO1lBRVJBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLEdBQUdBLEdBQUNBLFVBQVVBLENBQUNBLGtCQUFrQkEsQ0FBQ0E7WUFFcERBLElBQUlBLENBQUNBLGtCQUFrQkEsRUFBRUEsQ0FBQ0E7UUFDM0JBLENBQUNBOzs7T0FWQW5CO0lBbUJEQSxzQkFBV0Esb0NBQVNBO1FBUHBCQTs7Ozs7O1dBTUdBO2FBQ0hBO1lBRUNvQixNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFDQSxVQUFVQSxDQUFDQSxrQkFBa0JBLENBQUNBO1FBQ3REQSxDQUFDQTthQUVEcEIsVUFBcUJBLEdBQVVBO1lBRTlCb0IsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsSUFBSUEsR0FBR0EsQ0FBQ0E7Z0JBQ3pCQSxNQUFNQSxDQUFDQTtZQUVSQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxHQUFHQSxHQUFDQSxVQUFVQSxDQUFDQSxrQkFBa0JBLENBQUNBO1lBRXBEQSxJQUFJQSxDQUFDQSxrQkFBa0JBLEVBQUVBLENBQUNBO1FBQzNCQSxDQUFDQTs7O09BVkFwQjtJQW1CREEsc0JBQVdBLG9DQUFTQTtRQVBwQkE7Ozs7OztXQU1HQTthQUNIQTtZQUVDcUIsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBQ0EsVUFBVUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQTtRQUN0REEsQ0FBQ0E7YUFFRHJCLFVBQXFCQSxHQUFVQTtZQUU5QnFCLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFNBQVNBLElBQUlBLEdBQUdBLENBQUNBO2dCQUN6QkEsTUFBTUEsQ0FBQ0E7WUFFUkEsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsR0FBR0EsR0FBQ0EsVUFBVUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQTtZQUVwREEsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxFQUFFQSxDQUFDQTtRQUMzQkEsQ0FBQ0E7OztPQVZBckI7SUF3RURBLHNCQUFXQSxpQ0FBTUE7UUFSakJBOzs7Ozs7O1dBT0dBO2FBQ0hBO1lBRUNzQixNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQTtRQUN0QkEsQ0FBQ0E7YUFFRHRCLFVBQWtCQSxHQUFVQTtZQUUzQnNCLEFBQ0FBLHVCQUR1QkE7WUFDdkJBLElBQUlBLENBQUNBLE1BQU1BLEdBQUdBLElBQUlBLENBQUNBO1lBRW5CQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxJQUFJQSxHQUFHQSxDQUFDQTtnQkFDeEJBLE1BQU1BLENBQUNBO1lBRVJBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLEdBQUdBLENBQUNBO1lBRXBCQSxJQUFJQSxDQUFDQSxlQUFlQSxFQUFFQSxDQUFDQTtRQUN4QkEsQ0FBQ0E7OztPQWJBdEI7SUF1QkRBLHNCQUFXQSxpQ0FBTUE7UUFSakJBOzs7Ozs7O1dBT0dBO2FBQ0hBO1lBRUN1QixNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQTtRQUN0QkEsQ0FBQ0E7YUFFRHZCLFVBQWtCQSxHQUFVQTtZQUUzQnVCLEFBQ0FBLHdCQUR3QkE7WUFDeEJBLElBQUlBLENBQUNBLE9BQU9BLEdBQUdBLElBQUlBLENBQUNBO1lBRXBCQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxJQUFJQSxHQUFHQSxDQUFDQTtnQkFDeEJBLE1BQU1BLENBQUNBO1lBRVJBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLEdBQUdBLENBQUNBO1lBRXBCQSxJQUFJQSxDQUFDQSxlQUFlQSxFQUFFQSxDQUFDQTtRQUN4QkEsQ0FBQ0E7OztPQWJBdkI7SUF3QkRBLHNCQUFXQSxpQ0FBTUE7UUFUakJBOzs7Ozs7OztXQVFHQTthQUNIQTtZQUVDd0IsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7UUFDdEJBLENBQUNBO2FBRUR4QixVQUFrQkEsR0FBVUE7WUFFM0J3QixBQUNBQSx1QkFEdUJBO1lBQ3ZCQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQTtZQUVuQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsSUFBSUEsR0FBR0EsQ0FBQ0E7Z0JBQ3hCQSxNQUFNQSxDQUFDQTtZQUVSQSxJQUFJQSxDQUFDQSxRQUFRQSxHQUFHQSxHQUFHQSxDQUFDQTtZQUVwQkEsSUFBSUEsQ0FBQ0EsZUFBZUEsRUFBRUEsQ0FBQ0E7UUFDeEJBLENBQUNBOzs7T0FiQXhCO0lBa0JEQSxzQkFBV0EsZ0NBQUtBO1FBSGhCQTs7V0FFR0E7YUFDSEE7WUFFQ3lCLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBO1FBQ3JCQSxDQUFDQTs7O09BQUF6QjtJQUtEQSxzQkFBV0Esd0NBQWFBO1FBSHhCQTs7V0FFR0E7YUFDSEE7WUFFQzBCLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLG1CQUFtQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzlCQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxJQUFJQSxJQUFJQSxDQUFDQSxhQUFhQSxJQUFJQSxhQUFhQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDekVBLElBQUlBLENBQUNBLGNBQWNBLEdBQUdBLElBQUlBLENBQUNBLGNBQWNBLENBQUNBLGVBQWVBLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBO2dCQUU3RUEsQ0FBQ0E7Z0JBQUNBLElBQUlBLENBQUNBLENBQUNBO29CQUNQQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxDQUFDQTtnQkFDMURBLENBQUNBO2dCQUVEQSxJQUFJQSxDQUFDQSxtQkFBbUJBLEdBQUdBLEtBQUtBLENBQUNBO1lBQ2xDQSxDQUFDQTtZQUNEQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQTtRQUM1QkEsQ0FBQ0E7OztPQUFBMUI7SUFFREEsc0JBQVdBLHlDQUFjQTthQUF6QkE7WUFFQzJCLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLHFCQUFxQkEsQ0FBQ0E7Z0JBQzlCQSxJQUFJQSxDQUFDQSxxQkFBcUJBLEVBQUVBLENBQUNBO1lBRTlCQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLENBQUNBO1FBQzlCQSxDQUFDQTs7O09BQUEzQjtJQTZCREEsc0JBQVdBLCtDQUFvQkE7UUFIL0JBOztXQUVHQTthQUNIQTtZQUVDNEIsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EscUJBQXFCQSxDQUFDQTtRQUNuQ0EsQ0FBQ0E7OztPQUFBNUI7SUFLREEsc0JBQVdBLHVDQUFZQTtRQUh2QkE7O1dBRUdBO2FBQ0hBO1lBRUM2QixNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQTtRQUMzQkEsQ0FBQ0E7YUFFRDdCLFVBQXdCQSxLQUFhQTtZQUVwQzZCLEVBQUVBLENBQUNBLENBQUNBLEtBQUtBLElBQUlBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBO2dCQUMvQkEsTUFBTUEsQ0FBQ0E7WUFFUkEsSUFBSUEsQ0FBQ0EsYUFBYUEsR0FBR0EsS0FBS0EsQ0FBQ0E7WUFFM0JBLElBQUlBLEdBQUdBLEdBQVVBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLE1BQU1BLENBQUNBO1lBQzFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFVQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxHQUFHQSxFQUFFQSxDQUFDQSxFQUFFQTtnQkFDbENBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLFlBQVlBLEdBQUdBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBO1FBQ3pEQSxDQUFDQTs7O09BWkE3QjtJQW9EREEsc0JBQVdBLG9DQUFTQTtRQXRDcEJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBcUNHQTthQUNIQTtZQUVDOEIsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0E7UUFDeEJBLENBQUNBOzs7T0FBQTlCO0lBT0RBLHNCQUFXQSxrQ0FBT0E7UUFMbEJBOzs7O1dBSUdBO2FBQ0hBO1lBRUMrQixNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxtQkFBbUJBLENBQUNBO1FBQ2pDQSxDQUFDQTthQUVEL0IsVUFBbUJBLEtBQWFBO1lBRS9CK0IsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsbUJBQW1CQSxJQUFJQSxLQUFLQSxDQUFDQTtnQkFDckNBLE1BQU1BLENBQUNBO1lBRVJBLElBQUlBLENBQUNBLG1CQUFtQkEsR0FBR0EsS0FBS0EsQ0FBQ0E7WUFFakNBLElBQUlBLENBQUNBLDBCQUEwQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBRUEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsV0FBV0EsRUFBRUEsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUFDcEZBLENBQUNBOzs7T0FWQS9CO0lBc0JEQSxzQkFBV0EsZ0NBQUtBO1FBVmhCQTs7Ozs7Ozs7O1dBU0dBO2FBQ0hBO1lBRUNnQyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQSxLQUFLQSxHQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQTtRQUMxQ0EsQ0FBQ0E7YUFFRGhDLFVBQWlCQSxHQUFVQTtZQUUxQmdDLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLElBQUlBLEdBQUdBLENBQUNBO2dCQUN0QkEsTUFBTUEsQ0FBQ0E7WUFFUkEsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBR0EsR0FBR0EsQ0FBQ0E7WUFFbEJBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLEdBQUdBLEdBQUNBLElBQUlBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBO1lBRXhDQSxJQUFJQSxDQUFDQSxlQUFlQSxFQUFFQSxDQUFDQTtRQUN4QkEsQ0FBQ0E7OztPQVpBaEM7SUF3QkRBLHNCQUFXQSw0QkFBQ0E7UUFWWkE7Ozs7Ozs7OztXQVNHQTthQUNIQTtZQUVDaUMsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7UUFDaEJBLENBQUNBO2FBRURqQyxVQUFhQSxHQUFVQTtZQUV0QmlDLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLEVBQUVBLElBQUlBLEdBQUdBLENBQUNBO2dCQUNsQkEsTUFBTUEsQ0FBQ0E7WUFFUkEsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBR0EsR0FBR0EsQ0FBQ0E7WUFFZEEsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxFQUFFQSxDQUFDQTtRQUMzQkEsQ0FBQ0E7OztPQVZBakM7SUFzQkRBLHNCQUFXQSw0QkFBQ0E7UUFWWkE7Ozs7Ozs7OztXQVNHQTthQUNIQTtZQUVDa0MsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7UUFDaEJBLENBQUNBO2FBRURsQyxVQUFhQSxHQUFVQTtZQUV0QmtDLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLEVBQUVBLElBQUlBLEdBQUdBLENBQUNBO2dCQUNsQkEsTUFBTUEsQ0FBQ0E7WUFFUkEsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBR0EsR0FBR0EsQ0FBQ0E7WUFFZEEsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxFQUFFQSxDQUFDQTtRQUMzQkEsQ0FBQ0E7OztPQVZBbEM7SUErQkRBLHNCQUFXQSw0QkFBQ0E7UUFuQlpBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7V0FrQkdBO2FBQ0hBO1lBRUNtQyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQTtRQUNoQkEsQ0FBQ0E7YUFFRG5DLFVBQWFBLEdBQVVBO1lBRXRCbUMsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsSUFBSUEsR0FBR0EsQ0FBQ0E7Z0JBQ2xCQSxNQUFNQSxDQUFDQTtZQUVSQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFHQSxHQUFHQSxDQUFDQTtZQUVkQSxJQUFJQSxDQUFDQSxrQkFBa0JBLEVBQUVBLENBQUNBO1FBQzNCQSxDQUFDQTs7O09BVkFuQztJQWVEQSxzQkFBV0Esa0NBQU9BO1FBSGxCQTs7V0FFR0E7YUFDSEE7WUFFQ29DLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBO1FBQ3RCQSxDQUFDQTthQUVEcEMsVUFBbUJBLEtBQVlBO1lBRTlCb0MsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsS0FBS0EsQ0FBQ0E7UUFDdkJBLENBQUNBOzs7T0FMQXBDO0lBK0JEQTs7T0FFR0E7SUFDSUEsd0NBQWdCQSxHQUF2QkEsVUFBd0JBLElBQVdBLEVBQUVBLFFBQWlCQTtRQUVyRHFDLGdCQUFLQSxDQUFDQSxnQkFBZ0JBLFlBQUNBLElBQUlBLEVBQUVBLFFBQVFBLENBQUNBLENBQUNBO1FBRXZDQSxNQUFNQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNkQSxLQUFLQSxrQkFBa0JBLENBQUNBLGdCQUFnQkE7Z0JBQ3ZDQSxJQUFJQSxDQUFDQSx3QkFBd0JBLEdBQUdBLElBQUlBLENBQUNBO2dCQUNyQ0EsS0FBS0EsQ0FBQ0E7WUFDUEEsS0FBS0Esa0JBQWtCQSxDQUFDQSxnQkFBZ0JBO2dCQUN2Q0EsSUFBSUEsQ0FBQ0Esd0JBQXdCQSxHQUFHQSxJQUFJQSxDQUFDQTtnQkFDckNBLEtBQUtBLENBQUNBO1lBQ1BBLEtBQUtBLGtCQUFrQkEsQ0FBQ0EsYUFBYUE7Z0JBQ3BDQSxJQUFJQSxDQUFDQSxxQkFBcUJBLEdBQUdBLElBQUlBLENBQUNBO2dCQUNsQ0EsS0FBS0EsQ0FBQ0E7WUFDUEEsS0FBS0Esa0JBQWtCQSxDQUFDQSxhQUFhQTtnQkFDcENBLElBQUlBLENBQUNBLHFCQUFxQkEsR0FBR0EsSUFBSUEsQ0FBQ0E7Z0JBQ2xDQSxLQUFLQSxDQUFDQTtZQUNQQSxLQUFLQSxrQkFBa0JBLENBQUNBLHNCQUFzQkE7Z0JBQzdDQSxJQUFJQSxDQUFDQSw4QkFBOEJBLEdBQUdBLElBQUlBLENBQUNBO2dCQUMzQ0EsS0FBS0EsQ0FBQ0E7UUFDUkEsQ0FBQ0E7SUFDRkEsQ0FBQ0E7SUFFRHJDOztPQUVHQTtJQUNJQSw2QkFBS0EsR0FBWkE7UUFFQ3NDLElBQUlBLEtBQUtBLEdBQWlCQSxJQUFJQSxhQUFhQSxFQUFFQSxDQUFDQTtRQUM5Q0EsS0FBS0EsQ0FBQ0EsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7UUFDekJBLEtBQUtBLENBQUNBLFVBQVVBLEdBQUdBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBO1FBQ25DQSxLQUFLQSxDQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUVsQkEsQUFDQUEsbUNBRG1DQTtRQUNuQ0EsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7SUFDZEEsQ0FBQ0E7SUFFRHRDOztPQUVHQTtJQUNJQSwrQkFBT0EsR0FBZEE7UUFFQ3VDLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBO1lBQ2ZBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLFdBQVdBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1FBRS9CQSxPQUFPQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxNQUFNQTtZQUMvQkEsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsT0FBT0EsRUFBRUEsQ0FBQ0E7SUFDbENBLENBQUNBO0lBRUR2Qzs7T0FFR0E7SUFDSUEsb0NBQVlBLEdBQW5CQTtRQUVDd0MsSUFBSUEsQ0FBQ0EsT0FBT0EsRUFBRUEsQ0FBQ0E7SUFDaEJBLENBQUNBO0lBRUR4Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F1QkdBO0lBQ0lBLGlDQUFTQSxHQUFoQkEsVUFBaUJBLHFCQUFtQ0E7UUFFbkR5QyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxFQUFFQSxNQUFNQTtJQUM1QkEsQ0FBQ0EsR0FEb0JBO0lBR3JCekM7Ozs7Ozs7Ozs7Ozs7Ozs7O09BaUJHQTtJQUNJQSwrQkFBT0EsR0FBZEEsVUFBZUEscUJBQTBDQTtRQUExQzBDLHFDQUEwQ0EsR0FBMUNBLDRCQUEwQ0E7UUFFeERBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLEVBQUVBLE1BQU1BO0lBQzVCQSxDQUFDQSxHQURvQkE7SUFHZDFDLDhCQUFNQSxHQUFiQSxVQUFjQSxxQkFBMENBO1FBQTFDMkMscUNBQTBDQSxHQUExQ0EsNEJBQTBDQTtRQUV2REEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0E7WUFDdkJBLElBQUlBLENBQUNBLGNBQWNBLENBQUNBLFVBQVVBLEVBQUVBLENBQUNBO1FBRWxDQSxBQUNBQSw0QkFENEJBO1FBQzVCQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLENBQUNBLENBQUNBO1lBQzVCQSxJQUFJQSxDQUFDQSxpQkFBaUJBLEVBQUVBLENBQUNBO1lBRXpCQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxJQUFJQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDekJBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLElBQUlBLENBQUNBLE1BQU1BLEdBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLEtBQUtBLENBQUNBO2dCQUNuREEsSUFBSUEsQ0FBQ0EsZUFBZUEsRUFBRUEsQ0FBQ0E7WUFDeEJBLENBQUNBO1lBR0RBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLElBQUlBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO2dCQUMxQkEsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsTUFBTUEsQ0FBQ0E7Z0JBQ3JEQSxJQUFJQSxDQUFDQSxlQUFlQSxFQUFFQSxDQUFDQTtZQUN4QkEsQ0FBQ0E7WUFHREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3pCQSxJQUFJQSxDQUFDQSxRQUFRQSxHQUFHQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxLQUFLQSxDQUFDQTtnQkFDbkRBLElBQUlBLENBQUNBLGVBQWVBLEVBQUVBLENBQUNBO1lBQ3hCQSxDQUFDQTtRQUNGQSxDQUFDQTtRQUdEQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQTtJQUN6QkEsQ0FBQ0E7SUFFTTNDLGlDQUFTQSxHQUFoQkEsVUFBaUJBLHFCQUEwQ0E7UUFBMUM0QyxxQ0FBMENBLEdBQTFDQSw0QkFBMENBO1FBRTFEQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQTtZQUN2QkEsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsVUFBVUEsRUFBRUEsQ0FBQ0E7UUFFbENBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLG9CQUFvQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDL0JBLElBQUlBLENBQUNBLG9CQUFvQkEsRUFBRUEsQ0FBQ0E7UUFDN0JBLENBQUNBO1FBR0RBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLGNBQWNBLENBQUNBO0lBQzVCQSxDQUFDQTtJQUVENUM7Ozs7Ozs7Ozs7Ozs7Ozs7T0FnQkdBO0lBQ0lBLHFDQUFhQSxHQUFwQkEsVUFBcUJBLEtBQVdBO1FBRS9CNkMsTUFBTUEsQ0FBQ0EsS0FBS0EsRUFBRUEsTUFBTUE7SUFDckJBLENBQUNBLEdBRGFBO0lBR2Q3Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FpQkdBO0lBQ0lBLHVDQUFlQSxHQUF0QkEsVUFBdUJBLFFBQWlCQTtRQUV2QzhDLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLHFCQUFxQkEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7SUFDN0RBLENBQUNBO0lBRUQ5Qzs7Ozs7OztPQU9HQTtJQUNJQSxxQ0FBYUEsR0FBcEJBLFVBQXFCQSxHQUFpQkE7UUFFckMrQyxNQUFNQSxDQUFDQSxLQUFLQSxFQUFFQSxNQUFNQTtJQUNyQkEsQ0FBQ0EsR0FEYUE7SUFHZC9DOzs7Ozs7Ozs7Ozs7Ozs7T0FlR0E7SUFDSUEsb0NBQVlBLEdBQW5CQSxVQUFvQkEsQ0FBUUEsRUFBRUEsQ0FBUUEsRUFBRUEsU0FBeUJBO1FBQXpCZ0QseUJBQXlCQSxHQUF6QkEsaUJBQXlCQTtRQUVoRUEsTUFBTUEsQ0FBQ0EsS0FBS0EsRUFBRUEsTUFBTUE7SUFDckJBLENBQUNBLEdBRGFBO0lBR2RoRDs7Ozs7T0FLR0E7SUFDSUEsOEJBQU1BLEdBQWJBLFVBQWNBLE1BQWVBLEVBQUVBLE1BQXNCQTtRQUF0QmlELHNCQUFzQkEsR0FBdEJBLGFBQXNCQTtRQUdwREEsSUFBSUEsS0FBY0EsQ0FBQ0E7UUFDbkJBLElBQUlBLEtBQWNBLENBQUNBO1FBQ25CQSxJQUFJQSxLQUFjQSxDQUFDQTtRQUNuQkEsSUFBSUEsR0FBaUJBLENBQUNBO1FBRXRCQSxFQUFFQSxDQUFDQSxDQUFDQSxNQUFNQSxJQUFJQSxJQUFJQSxDQUFDQTtZQUNsQkEsTUFBTUEsR0FBR0EsUUFBUUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7UUFDMUJBLElBQUlBO1lBQ0hBLE1BQU1BLENBQUNBLFNBQVNBLEVBQUVBLENBQUNBO1FBRXBCQSxLQUFLQSxHQUFHQSxNQUFNQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQTtRQUNsREEsS0FBS0EsQ0FBQ0EsU0FBU0EsRUFBRUEsQ0FBQ0E7UUFFbEJBLEtBQUtBLEdBQUdBLE1BQU1BLENBQUNBLFlBQVlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO1FBQ25DQSxLQUFLQSxDQUFDQSxTQUFTQSxFQUFFQSxDQUFDQTtRQUVsQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDekJBLEtBQUtBLENBQUNBLENBQUNBLEdBQUdBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBO1lBQ25CQSxLQUFLQSxDQUFDQSxDQUFDQSxHQUFHQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNuQkEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDWkEsS0FBS0EsQ0FBQ0EsU0FBU0EsRUFBRUEsQ0FBQ0E7UUFDbkJBLENBQUNBO1FBRURBLEtBQUtBLEdBQUdBLEtBQUtBLENBQUNBLFlBQVlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO1FBRWxDQSxHQUFHQSxHQUFHQSxhQUFhQSxDQUFDQSxrQkFBa0JBLENBQUNBO1FBRXZDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNqQkEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDakJBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBO1FBQ2pCQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtRQUVYQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQSxDQUFD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QUFDQTtRQUM1QkEsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7UUFDNUJBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBO1FBRTVCQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxvQkFBb0JBLENBQUNBLENBQUNBO1FBRXBEQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUN0QkEsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7WUFDakRBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBO1lBQ2pEQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQTtZQUNqREEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNqR0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsSUFBSUEsYUFBYUEsQ0FBQ0EsV0FBV0EsQ0FBQ0E7Z0JBQ25EQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxpQkFBaUJBLENBQUNBLElBQUlBLENBQUNBLE1B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ImJhc2UvRGlzcGxheU9iamVjdC5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmxlbmRNb2RlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9kYXRhL0JsZW5kTW9kZVwiKTtcbmltcG9ydCBCb3hcdFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL0JveFwiKTtcbmltcG9ydCBTcGhlcmVcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9TcGhlcmVcIik7XG5pbXBvcnQgTWF0aENvbnN0c1x0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9NYXRoQ29uc3RzXCIpO1xuaW1wb3J0IE1hdHJpeDNEXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vTWF0cml4M0RcIik7XG5pbXBvcnQgTWF0cml4M0RVdGlsc1x0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vTWF0cml4M0RVdGlsc1wiKTtcbmltcG9ydCBQb2ludFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1BvaW50XCIpO1xuaW1wb3J0IFJlY3RhbmdsZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9SZWN0YW5nbGVcIik7XG5pbXBvcnQgVmVjdG9yM0RcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9WZWN0b3IzRFwiKTtcbmltcG9ydCBBc3NldEJhc2VcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvQXNzZXRCYXNlXCIpO1xuaW1wb3J0IEFic3RyYWN0TWV0aG9kRXJyb3JcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXJyb3JzL0Fic3RyYWN0TWV0aG9kRXJyb3JcIik7XG5cbmltcG9ydCBEaXNwbGF5T2JqZWN0Q29udGFpbmVyXHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9jb250YWluZXJzL0Rpc3BsYXlPYmplY3RDb250YWluZXJcIik7XG5pbXBvcnQgU2NlbmVcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvY29udGFpbmVycy9TY2VuZVwiKTtcbmltcG9ydCBDb250cm9sbGVyQmFzZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2NvbnRyb2xsZXJzL0NvbnRyb2xsZXJCYXNlXCIpO1xuaW1wb3J0IEFsaWdubWVudE1vZGVcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0FsaWdubWVudE1vZGVcIik7XG5pbXBvcnQgTG9hZGVySW5mb1x0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9Mb2FkZXJJbmZvXCIpO1xuaW1wb3J0IE9yaWVudGF0aW9uTW9kZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvT3JpZW50YXRpb25Nb2RlXCIpO1xuaW1wb3J0IElCaXRtYXBEcmF3YWJsZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvSUJpdG1hcERyYXdhYmxlXCIpO1xuaW1wb3J0IFRyYW5zZm9ybVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9UcmFuc2Zvcm1cIik7XG5pbXBvcnQgRW50aXR5Tm9kZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcGFydGl0aW9uL0VudGl0eU5vZGVcIik7XG5pbXBvcnQgUGFydGl0aW9uXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vUGFydGl0aW9uXCIpO1xuaW1wb3J0IElQaWNraW5nQ29sbGlkZXJcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9waWNrL0lQaWNraW5nQ29sbGlkZXJcIik7XG5pbXBvcnQgUGlja2luZ0NvbGxpc2lvblZPXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3BpY2svUGlja2luZ0NvbGxpc2lvblZPXCIpO1xuaW1wb3J0IElSZW5kZXJhYmxlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wb29sL0lSZW5kZXJhYmxlXCIpO1xuaW1wb3J0IENhbWVyYVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9DYW1lcmFcIik7XG5pbXBvcnQgRGlzcGxheU9iamVjdEV2ZW50XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2V2ZW50cy9EaXNwbGF5T2JqZWN0RXZlbnRcIik7XG5pbXBvcnQgU2NlbmVFdmVudFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZXZlbnRzL1NjZW5lRXZlbnRcIik7XG5pbXBvcnQgUHJlZmFiQmFzZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcHJlZmFicy9QcmVmYWJCYXNlXCIpO1xuXG4vKipcbiAqIFRoZSBEaXNwbGF5T2JqZWN0IGNsYXNzIGlzIHRoZSBiYXNlIGNsYXNzIGZvciBhbGwgb2JqZWN0cyB0aGF0IGNhbiBiZVxuICogcGxhY2VkIG9uIHRoZSBkaXNwbGF5IGxpc3QuIFRoZSBkaXNwbGF5IGxpc3QgbWFuYWdlcyBhbGwgb2JqZWN0cyBkaXNwbGF5ZWRcbiAqIGluIGZsYXNoLiBVc2UgdGhlIERpc3BsYXlPYmplY3RDb250YWluZXIgY2xhc3MgdG8gYXJyYW5nZSB0aGVcbiAqIGRpc3BsYXkgb2JqZWN0cyBpbiB0aGUgZGlzcGxheSBsaXN0LiBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIG9iamVjdHMgY2FuXG4gKiBoYXZlIGNoaWxkIGRpc3BsYXkgb2JqZWN0cywgd2hpbGUgb3RoZXIgZGlzcGxheSBvYmplY3RzLCBzdWNoIGFzIFNoYXBlIGFuZFxuICogVGV4dEZpZWxkIG9iamVjdHMsIGFyZSBcImxlYWZcIiBub2RlcyB0aGF0IGhhdmUgb25seSBwYXJlbnRzIGFuZCBzaWJsaW5ncywgbm9cbiAqIGNoaWxkcmVuLlxuICpcbiAqIDxwPlRoZSBEaXNwbGF5T2JqZWN0IGNsYXNzIHN1cHBvcnRzIGJhc2ljIGZ1bmN0aW9uYWxpdHkgbGlrZSB0aGUgPGk+eDwvaT5cbiAqIGFuZCA8aT55PC9pPiBwb3NpdGlvbiBvZiBhbiBvYmplY3QsIGFzIHdlbGwgYXMgbW9yZSBhZHZhbmNlZCBwcm9wZXJ0aWVzIG9mXG4gKiB0aGUgb2JqZWN0IHN1Y2ggYXMgaXRzIHRyYW5zZm9ybWF0aW9uIG1hdHJpeC4gPC9wPlxuICpcbiAqIDxwPkRpc3BsYXlPYmplY3QgaXMgYW4gYWJzdHJhY3QgYmFzZSBjbGFzczsgdGhlcmVmb3JlLCB5b3UgY2Fubm90IGNhbGxcbiAqIERpc3BsYXlPYmplY3QgZGlyZWN0bHkuIEludm9raW5nIDxjb2RlPm5ldyBEaXNwbGF5T2JqZWN0KCk8L2NvZGU+IHRocm93cyBhblxuICogPGNvZGU+QXJndW1lbnRFcnJvcjwvY29kZT4gZXhjZXB0aW9uLiA8L3A+XG4gKlxuICogPHA+QWxsIGRpc3BsYXkgb2JqZWN0cyBpbmhlcml0IGZyb20gdGhlIERpc3BsYXlPYmplY3QgY2xhc3MuPC9wPlxuICpcbiAqIDxwPlRoZSBEaXNwbGF5T2JqZWN0IGNsYXNzIGl0c2VsZiBkb2VzIG5vdCBpbmNsdWRlIGFueSBBUElzIGZvciByZW5kZXJpbmdcbiAqIGNvbnRlbnQgb25zY3JlZW4uIEZvciB0aGF0IHJlYXNvbiwgaWYgeW91IHdhbnQgY3JlYXRlIGEgY3VzdG9tIHN1YmNsYXNzIG9mXG4gKiB0aGUgRGlzcGxheU9iamVjdCBjbGFzcywgeW91IHdpbGwgd2FudCB0byBleHRlbmQgb25lIG9mIGl0cyBzdWJjbGFzc2VzIHRoYXRcbiAqIGRvIGhhdmUgQVBJcyBmb3IgcmVuZGVyaW5nIGNvbnRlbnQgb25zY3JlZW4sIHN1Y2ggYXMgdGhlIFNoYXBlLCBTcHJpdGUsXG4gKiBCaXRtYXAsIFNpbXBsZUJ1dHRvbiwgVGV4dEZpZWxkLCBvciBNb3ZpZUNsaXAgY2xhc3MuPC9wPlxuICpcbiAqIDxwPlRoZSBEaXNwbGF5T2JqZWN0IGNsYXNzIGNvbnRhaW5zIHNldmVyYWwgYnJvYWRjYXN0IGV2ZW50cy4gTm9ybWFsbHksIHRoZVxuICogdGFyZ2V0IG9mIGFueSBwYXJ0aWN1bGFyIGV2ZW50IGlzIGEgc3BlY2lmaWMgRGlzcGxheU9iamVjdCBpbnN0YW5jZS4gRm9yXG4gKiBleGFtcGxlLCB0aGUgdGFyZ2V0IG9mIGFuIDxjb2RlPmFkZGVkPC9jb2RlPiBldmVudCBpcyB0aGUgc3BlY2lmaWNcbiAqIERpc3BsYXlPYmplY3QgaW5zdGFuY2UgdGhhdCB3YXMgYWRkZWQgdG8gdGhlIGRpc3BsYXkgbGlzdC4gSGF2aW5nIGEgc2luZ2xlXG4gKiB0YXJnZXQgcmVzdHJpY3RzIHRoZSBwbGFjZW1lbnQgb2YgZXZlbnQgbGlzdGVuZXJzIHRvIHRoYXQgdGFyZ2V0IGFuZCBpblxuICogc29tZSBjYXNlcyB0aGUgdGFyZ2V0J3MgYW5jZXN0b3JzIG9uIHRoZSBkaXNwbGF5IGxpc3QuIFdpdGggYnJvYWRjYXN0XG4gKiBldmVudHMsIGhvd2V2ZXIsIHRoZSB0YXJnZXQgaXMgbm90IGEgc3BlY2lmaWMgRGlzcGxheU9iamVjdCBpbnN0YW5jZSwgYnV0XG4gKiByYXRoZXIgYWxsIERpc3BsYXlPYmplY3QgaW5zdGFuY2VzLCBpbmNsdWRpbmcgdGhvc2UgdGhhdCBhcmUgbm90IG9uIHRoZVxuICogZGlzcGxheSBsaXN0LiBUaGlzIG1lYW5zIHRoYXQgeW91IGNhbiBhZGQgYSBsaXN0ZW5lciB0byBhbnkgRGlzcGxheU9iamVjdFxuICogaW5zdGFuY2UgdG8gbGlzdGVuIGZvciBicm9hZGNhc3QgZXZlbnRzLiBJbiBhZGRpdGlvbiB0byB0aGUgYnJvYWRjYXN0XG4gKiBldmVudHMgbGlzdGVkIGluIHRoZSBEaXNwbGF5T2JqZWN0IGNsYXNzJ3MgRXZlbnRzIHRhYmxlLCB0aGUgRGlzcGxheU9iamVjdFxuICogY2xhc3MgYWxzbyBpbmhlcml0cyB0d28gYnJvYWRjYXN0IGV2ZW50cyBmcm9tIHRoZSBFdmVudERpc3BhdGNoZXIgY2xhc3M6XG4gKiA8Y29kZT5hY3RpdmF0ZTwvY29kZT4gYW5kIDxjb2RlPmRlYWN0aXZhdGU8L2NvZGU+LjwvcD5cbiAqXG4gKiA8cD5Tb21lIHByb3BlcnRpZXMgcHJldmlvdXNseSB1c2VkIGluIHRoZSBBY3Rpb25TY3JpcHQgMS4wIGFuZCAyLjBcbiAqIE1vdmllQ2xpcCwgVGV4dEZpZWxkLCBhbmQgQnV0dG9uIGNsYXNzZXMoc3VjaCBhcyA8Y29kZT5fYWxwaGE8L2NvZGU+LFxuICogPGNvZGU+X2hlaWdodDwvY29kZT4sIDxjb2RlPl9uYW1lPC9jb2RlPiwgPGNvZGU+X3dpZHRoPC9jb2RlPixcbiAqIDxjb2RlPl94PC9jb2RlPiwgPGNvZGU+X3k8L2NvZGU+LCBhbmQgb3RoZXJzKSBoYXZlIGVxdWl2YWxlbnRzIGluIHRoZVxuICogQWN0aW9uU2NyaXB0IDMuMCBEaXNwbGF5T2JqZWN0IGNsYXNzIHRoYXQgYXJlIHJlbmFtZWQgc28gdGhhdCB0aGV5IG5vXG4gKiBsb25nZXIgYmVnaW4gd2l0aCB0aGUgdW5kZXJzY29yZShfKSBjaGFyYWN0ZXIuPC9wPlxuICpcbiAqIDxwPkZvciBtb3JlIGluZm9ybWF0aW9uLCBzZWUgdGhlIFwiRGlzcGxheSBQcm9ncmFtbWluZ1wiIGNoYXB0ZXIgb2YgdGhlXG4gKiA8aT5BY3Rpb25TY3JpcHQgMy4wIERldmVsb3BlcidzIEd1aWRlPC9pPi48L3A+XG4gKiBcbiAqIEBldmVudCBhZGRlZCAgICAgICAgICAgIERpc3BhdGNoZWQgd2hlbiBhIGRpc3BsYXkgb2JqZWN0IGlzIGFkZGVkIHRvIHRoZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheSBsaXN0LiBUaGUgZm9sbG93aW5nIG1ldGhvZHMgdHJpZ2dlciB0aGlzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBldmVudDpcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPkRpc3BsYXlPYmplY3RDb250YWluZXIuYWRkQ2hpbGQoKTwvY29kZT4sXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLmFkZENoaWxkQXQoKTwvY29kZT4uXG4gKiBAZXZlbnQgYWRkZWRUb1NjZW5lICAgICBEaXNwYXRjaGVkIHdoZW4gYSBkaXNwbGF5IG9iamVjdCBpcyBhZGRlZCB0byB0aGUgb25cbiAqICAgICAgICAgICAgICAgICAgICAgICAgIHNjZW5lIGRpc3BsYXkgbGlzdCwgZWl0aGVyIGRpcmVjdGx5IG9yIHRocm91Z2ggdGhlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBhZGRpdGlvbiBvZiBhIHN1YiB0cmVlIGluIHdoaWNoIHRoZSBkaXNwbGF5IG9iamVjdFxuICogICAgICAgICAgICAgICAgICAgICAgICAgaXMgY29udGFpbmVkLiBUaGUgZm9sbG93aW5nIG1ldGhvZHMgdHJpZ2dlciB0aGlzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBldmVudDpcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPkRpc3BsYXlPYmplY3RDb250YWluZXIuYWRkQ2hpbGQoKTwvY29kZT4sXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLmFkZENoaWxkQXQoKTwvY29kZT4uXG4gKiBAZXZlbnQgZW50ZXJGcmFtZSAgICAgICBbYnJvYWRjYXN0IGV2ZW50XSBEaXNwYXRjaGVkIHdoZW4gdGhlIHBsYXloZWFkIGlzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBlbnRlcmluZyBhIG5ldyBmcmFtZS4gSWYgdGhlIHBsYXloZWFkIGlzIG5vdFxuICogICAgICAgICAgICAgICAgICAgICAgICAgbW92aW5nLCBvciBpZiB0aGVyZSBpcyBvbmx5IG9uZSBmcmFtZSwgdGhpcyBldmVudFxuICogICAgICAgICAgICAgICAgICAgICAgICAgaXMgZGlzcGF0Y2hlZCBjb250aW51b3VzbHkgaW4gY29uanVuY3Rpb24gd2l0aCB0aGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGZyYW1lIHJhdGUuIFRoaXMgZXZlbnQgaXMgYSBicm9hZGNhc3QgZXZlbnQsIHdoaWNoXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBtZWFucyB0aGF0IGl0IGlzIGRpc3BhdGNoZWQgYnkgYWxsIGRpc3BsYXkgb2JqZWN0c1xuICogICAgICAgICAgICAgICAgICAgICAgICAgd2l0aCBhIGxpc3RlbmVyIHJlZ2lzdGVyZWQgZm9yIHRoaXMgZXZlbnQuXG4gKiBAZXZlbnQgZXhpdEZyYW1lICAgICAgICBbYnJvYWRjYXN0IGV2ZW50XSBEaXNwYXRjaGVkIHdoZW4gdGhlIHBsYXloZWFkIGlzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBleGl0aW5nIHRoZSBjdXJyZW50IGZyYW1lLiBBbGwgZnJhbWUgc2NyaXB0cyBoYXZlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBiZWVuIHJ1bi4gSWYgdGhlIHBsYXloZWFkIGlzIG5vdCBtb3ZpbmcsIG9yIGlmXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICB0aGVyZSBpcyBvbmx5IG9uZSBmcmFtZSwgdGhpcyBldmVudCBpcyBkaXNwYXRjaGVkXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51b3VzbHkgaW4gY29uanVuY3Rpb24gd2l0aCB0aGUgZnJhbWUgcmF0ZS5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgIFRoaXMgZXZlbnQgaXMgYSBicm9hZGNhc3QgZXZlbnQsIHdoaWNoIG1lYW5zIHRoYXRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGl0IGlzIGRpc3BhdGNoZWQgYnkgYWxsIGRpc3BsYXkgb2JqZWN0cyB3aXRoIGFcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyIHJlZ2lzdGVyZWQgZm9yIHRoaXMgZXZlbnQuXG4gKiBAZXZlbnQgZnJhbWVDb25zdHJ1Y3RlZCBbYnJvYWRjYXN0IGV2ZW50XSBEaXNwYXRjaGVkIGFmdGVyIHRoZSBjb25zdHJ1Y3RvcnNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIG9mIGZyYW1lIGRpc3BsYXkgb2JqZWN0cyBoYXZlIHJ1biBidXQgYmVmb3JlIGZyYW1lXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBzY3JpcHRzIGhhdmUgcnVuLiBJZiB0aGUgcGxheWhlYWQgaXMgbm90IG1vdmluZywgb3JcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGlmIHRoZXJlIGlzIG9ubHkgb25lIGZyYW1lLCB0aGlzIGV2ZW50IGlzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaGVkIGNvbnRpbnVvdXNseSBpbiBjb25qdW5jdGlvbiB3aXRoIHRoZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgZnJhbWUgcmF0ZS4gVGhpcyBldmVudCBpcyBhIGJyb2FkY2FzdCBldmVudCwgd2hpY2hcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIG1lYW5zIHRoYXQgaXQgaXMgZGlzcGF0Y2hlZCBieSBhbGwgZGlzcGxheSBvYmplY3RzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICB3aXRoIGEgbGlzdGVuZXIgcmVnaXN0ZXJlZCBmb3IgdGhpcyBldmVudC5cbiAqIEBldmVudCByZW1vdmVkICAgICAgICAgIERpc3BhdGNoZWQgd2hlbiBhIGRpc3BsYXkgb2JqZWN0IGlzIGFib3V0IHRvIGJlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVkIGZyb20gdGhlIGRpc3BsYXkgbGlzdC4gVHdvIG1ldGhvZHMgb2YgdGhlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIGNsYXNzIGdlbmVyYXRlIHRoaXMgZXZlbnQ6XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5yZW1vdmVDaGlsZCgpPC9jb2RlPiBhbmRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPnJlbW92ZUNoaWxkQXQoKTwvY29kZT4uXG4gKlxuICogICAgICAgICAgICAgICAgICAgICAgICAgPHA+VGhlIGZvbGxvd2luZyBtZXRob2RzIG9mIGFcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIERpc3BsYXlPYmplY3RDb250YWluZXIgb2JqZWN0IGFsc28gZ2VuZXJhdGUgdGhpc1xuICogICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQgaWYgYW4gb2JqZWN0IG11c3QgYmUgcmVtb3ZlZCB0byBtYWtlIHJvb20gZm9yXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICB0aGUgbmV3IG9iamVjdDogPGNvZGU+YWRkQ2hpbGQoKTwvY29kZT4sXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5hZGRDaGlsZEF0KCk8L2NvZGU+LCBhbmRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPnNldENoaWxkSW5kZXgoKTwvY29kZT4uIDwvcD5cbiAqIEBldmVudCByZW1vdmVkRnJvbVNjZW5lIERpc3BhdGNoZWQgd2hlbiBhIGRpc3BsYXkgb2JqZWN0IGlzIGFib3V0IHRvIGJlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVkIGZyb20gdGhlIGRpc3BsYXkgbGlzdCwgZWl0aGVyIGRpcmVjdGx5IG9yXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdWdoIHRoZSByZW1vdmFsIG9mIGEgc3ViIHRyZWUgaW4gd2hpY2ggdGhlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5IG9iamVjdCBpcyBjb250YWluZWQuIFR3byBtZXRob2RzIG9mIHRoZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgRGlzcGxheU9iamVjdENvbnRhaW5lciBjbGFzcyBnZW5lcmF0ZSB0aGlzIGV2ZW50OlxuICogICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+cmVtb3ZlQ2hpbGQoKTwvY29kZT4gYW5kXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5yZW1vdmVDaGlsZEF0KCk8L2NvZGU+LlxuICpcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxwPlRoZSBmb2xsb3dpbmcgbWV0aG9kcyBvZiBhXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIG9iamVjdCBhbHNvIGdlbmVyYXRlIHRoaXNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50IGlmIGFuIG9iamVjdCBtdXN0IGJlIHJlbW92ZWQgdG8gbWFrZSByb29tIGZvclxuICogICAgICAgICAgICAgICAgICAgICAgICAgdGhlIG5ldyBvYmplY3Q6IDxjb2RlPmFkZENoaWxkKCk8L2NvZGU+LFxuICogICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+YWRkQ2hpbGRBdCgpPC9jb2RlPiwgYW5kXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5zZXRDaGlsZEluZGV4KCk8L2NvZGU+LiA8L3A+XG4gKiBAZXZlbnQgcmVuZGVyICAgICAgICAgICBbYnJvYWRjYXN0IGV2ZW50XSBEaXNwYXRjaGVkIHdoZW4gdGhlIGRpc3BsYXkgbGlzdFxuICogICAgICAgICAgICAgICAgICAgICAgICAgaXMgYWJvdXQgdG8gYmUgdXBkYXRlZCBhbmQgcmVuZGVyZWQuIFRoaXMgZXZlbnRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVzIHRoZSBsYXN0IG9wcG9ydHVuaXR5IGZvciBvYmplY3RzIGxpc3RlbmluZ1xuICogICAgICAgICAgICAgICAgICAgICAgICAgZm9yIHRoaXMgZXZlbnQgdG8gbWFrZSBjaGFuZ2VzIGJlZm9yZSB0aGUgZGlzcGxheVxuICogICAgICAgICAgICAgICAgICAgICAgICAgbGlzdCBpcyByZW5kZXJlZC4gWW91IG11c3QgY2FsbCB0aGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPmludmFsaWRhdGUoKTwvY29kZT4gbWV0aG9kIG9mIHRoZSBTY2VuZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0IGVhY2ggdGltZSB5b3Ugd2FudCBhIDxjb2RlPnJlbmRlcjwvY29kZT5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50IHRvIGJlIGRpc3BhdGNoZWQuIDxjb2RlPlJlbmRlcjwvY29kZT4gZXZlbnRzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBhcmUgZGlzcGF0Y2hlZCB0byBhbiBvYmplY3Qgb25seSBpZiB0aGVyZSBpcyBtdXR1YWxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIHRydXN0IGJldHdlZW4gaXQgYW5kIHRoZSBvYmplY3QgdGhhdCBjYWxsZWRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPlNjZW5lLmludmFsaWRhdGUoKTwvY29kZT4uIFRoaXMgZXZlbnQgaXMgYVxuICogICAgICAgICAgICAgICAgICAgICAgICAgYnJvYWRjYXN0IGV2ZW50LCB3aGljaCBtZWFucyB0aGF0IGl0IGlzIGRpc3BhdGNoZWRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGJ5IGFsbCBkaXNwbGF5IG9iamVjdHMgd2l0aCBhIGxpc3RlbmVyIHJlZ2lzdGVyZWRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGZvciB0aGlzIGV2ZW50LlxuICpcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxwPjxiPk5vdGU6IDwvYj5UaGlzIGV2ZW50IGlzIG5vdCBkaXNwYXRjaGVkIGlmIHRoZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheSBpcyBub3QgcmVuZGVyaW5nLiBUaGlzIGlzIHRoZSBjYXNlIHdoZW4gdGhlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50IGlzIGVpdGhlciBtaW5pbWl6ZWQgb3Igb2JzY3VyZWQuIDwvcD5cbiAqL1xuY2xhc3MgRGlzcGxheU9iamVjdCBleHRlbmRzIEFzc2V0QmFzZSBpbXBsZW1lbnRzIElCaXRtYXBEcmF3YWJsZVxue1xuXHRwcml2YXRlIF9sb2FkZXJJbmZvOkxvYWRlckluZm87XG5cdHByaXZhdGUgX21vdXNlWDpudW1iZXI7XG5cdHByaXZhdGUgX21vdXNlWTpudW1iZXI7XG5cdHByaXZhdGUgX3Jvb3Q6RGlzcGxheU9iamVjdENvbnRhaW5lcjtcblx0cHJpdmF0ZSBfYm91bmRzOlJlY3RhbmdsZTtcblx0cHVibGljIF9wQm94Qm91bmRzOkJveDtcblx0cHJpdmF0ZSBfYm94Qm91bmRzSW52YWxpZDpib29sZWFuID0gdHJ1ZTtcblx0cHVibGljIF9wU3BoZXJlQm91bmRzOlNwaGVyZTtcblx0cHJpdmF0ZSBfc3BoZXJlQm91bmRzSW52YWxpZDpib29sZWFuID0gdHJ1ZTtcblx0cHJpdmF0ZSBfZGVidWdWaXNpYmxlOmJvb2xlYW47XG5cblx0cHVibGljIF9wU2NlbmU6U2NlbmU7XG5cdHB1YmxpYyBfcFBhcmVudDpEaXNwbGF5T2JqZWN0Q29udGFpbmVyO1xuXHRwdWJsaWMgX3BTY2VuZVRyYW5zZm9ybTpNYXRyaXgzRCA9IG5ldyBNYXRyaXgzRCgpO1xuXHRwdWJsaWMgX3BTY2VuZVRyYW5zZm9ybURpcnR5OmJvb2xlYW4gPSB0cnVlO1xuXHRwdWJsaWMgX3BJc0VudGl0eTpib29sZWFuO1xuXG5cdHByaXZhdGUgX2V4cGxpY2l0UGFydGl0aW9uOlBhcnRpdGlvbjtcblx0cHVibGljIF9wSW1wbGljaXRQYXJ0aXRpb246UGFydGl0aW9uO1xuXG5cdHByaXZhdGUgX3NjZW5lVHJhbnNmb3JtQ2hhbmdlZDpEaXNwbGF5T2JqZWN0RXZlbnQ7XG5cdHByaXZhdGUgX3NjZW5lY2hhbmdlZDpEaXNwbGF5T2JqZWN0RXZlbnQ7XG5cdHByaXZhdGUgX3RyYW5zZm9ybTpUcmFuc2Zvcm07XG5cdHByaXZhdGUgX21hdHJpeDNEOk1hdHJpeDNEID0gbmV3IE1hdHJpeDNEKCk7XG5cdHByaXZhdGUgX21hdHJpeDNERGlydHk6Ym9vbGVhbiA9IHRydWU7XG5cblx0cHJpdmF0ZSBfaW52ZXJzZVNjZW5lVHJhbnNmb3JtOk1hdHJpeDNEID0gbmV3IE1hdHJpeDNEKCk7XG5cdHByaXZhdGUgX2ludmVyc2VTY2VuZVRyYW5zZm9ybURpcnR5OmJvb2xlYW4gPSB0cnVlO1xuXHRwcml2YXRlIF9zY2VuZVBvc2l0aW9uOlZlY3RvcjNEID0gbmV3IFZlY3RvcjNEKCk7XG5cdHByaXZhdGUgX3NjZW5lUG9zaXRpb25EaXJ0eTpib29sZWFuID0gdHJ1ZTtcblx0cHJpdmF0ZSBfZXhwbGljaXRWaXNpYmlsaXR5OmJvb2xlYW4gPSB0cnVlO1xuXHRwdWJsaWMgX3BJbXBsaWNpdFZpc2liaWxpdHk6Ym9vbGVhbiA9IHRydWU7XG5cdHByaXZhdGUgX2V4cGxpY2l0TW91c2VFbmFibGVkOmJvb2xlYW4gPSB0cnVlO1xuXHRwdWJsaWMgX3BJbXBsaWNpdE1vdXNlRW5hYmxlZDpib29sZWFuID0gdHJ1ZTtcblx0cHJpdmF0ZSBfbGlzdGVuVG9TY2VuZVRyYW5zZm9ybUNoYW5nZWQ6Ym9vbGVhbjtcblx0cHJpdmF0ZSBfbGlzdGVuVG9TY2VuZUNoYW5nZWQ6Ym9vbGVhbjtcblxuXHRwcml2YXRlIF9wb3NpdGlvbkRpcnR5OmJvb2xlYW4gPSB0cnVlO1xuXHRwcml2YXRlIF9yb3RhdGlvbkRpcnR5OmJvb2xlYW4gPSB0cnVlO1xuXHRwcml2YXRlIF9zY2FsZURpcnR5OmJvb2xlYW4gPSB0cnVlO1xuXG5cdHByaXZhdGUgX3Bvc2l0aW9uQ2hhbmdlZDpEaXNwbGF5T2JqZWN0RXZlbnQ7XG5cdHByaXZhdGUgX3JvdGF0aW9uQ2hhbmdlZDpEaXNwbGF5T2JqZWN0RXZlbnQ7XG5cdHByaXZhdGUgX3NjYWxlQ2hhbmdlZDpEaXNwbGF5T2JqZWN0RXZlbnQ7XG5cblx0cHJpdmF0ZSBfcm90YXRpb25YOm51bWJlciA9IDA7XG5cdHByaXZhdGUgX3JvdGF0aW9uWTpudW1iZXIgPSAwO1xuXHRwcml2YXRlIF9yb3RhdGlvblo6bnVtYmVyID0gMDtcblx0cHJpdmF0ZSBfZXVsZXJzOlZlY3RvcjNEID0gbmV3IFZlY3RvcjNEKCk7XG5cdHByaXZhdGUgX2ZsaXBZOk1hdHJpeDNEID0gbmV3IE1hdHJpeDNEKCk7XG5cblx0cHJpdmF0ZSBfbGlzdGVuVG9Qb3NpdGlvbkNoYW5nZWQ6Ym9vbGVhbjtcblx0cHJpdmF0ZSBfbGlzdGVuVG9Sb3RhdGlvbkNoYW5nZWQ6Ym9vbGVhbjtcblx0cHJpdmF0ZSBfbGlzdGVuVG9TY2FsZUNoYW5nZWQ6Ym9vbGVhbjtcblx0cHJpdmF0ZSBfek9mZnNldDpudW1iZXIgPSAwO1xuXG5cdHB1YmxpYyBfd2lkdGg6bnVtYmVyO1xuXHRwdWJsaWMgX2hlaWdodDpudW1iZXI7XG5cdHB1YmxpYyBfZGVwdGg6bnVtYmVyO1xuXG5cdHB1YmxpYyBfcFNjYWxlWDpudW1iZXIgPSAxO1xuXHRwdWJsaWMgX3BTY2FsZVk6bnVtYmVyID0gMTtcblx0cHVibGljIF9wU2NhbGVaOm51bWJlciA9IDE7XG5cdHByaXZhdGUgX3g6bnVtYmVyID0gMDtcblx0cHJpdmF0ZSBfeTpudW1iZXIgPSAwO1xuXHRwcml2YXRlIF96Om51bWJlciA9IDA7XG5cdHByaXZhdGUgX3Bpdm90OlZlY3RvcjNEID0gbmV3IFZlY3RvcjNEKCk7XG5cdHByaXZhdGUgX3Bpdm90U2NhbGU6VmVjdG9yM0QgPSBuZXcgVmVjdG9yM0QoKTtcblx0cHJpdmF0ZSBfb3JpZW50YXRpb25NYXRyaXg6TWF0cml4M0QgPSBuZXcgTWF0cml4M0QoKTtcblx0cHJpdmF0ZSBfcGl2b3RaZXJvOmJvb2xlYW4gPSB0cnVlO1xuXHRwcml2YXRlIF9waXZvdERpcnR5OmJvb2xlYW4gPSB0cnVlO1xuXHRwcml2YXRlIF9wb3M6VmVjdG9yM0QgPSBuZXcgVmVjdG9yM0QoKTtcblx0cHJpdmF0ZSBfcm90OlZlY3RvcjNEID0gbmV3IFZlY3RvcjNEKCk7XG5cdHByaXZhdGUgX3NjYTpWZWN0b3IzRCA9IG5ldyBWZWN0b3IzRCgpO1xuXHRwcml2YXRlIF90cmFuc2Zvcm1Db21wb25lbnRzOkFycmF5PFZlY3RvcjNEPjtcblxuXHRwdWJsaWMgX3BJZ25vcmVUcmFuc2Zvcm06Ym9vbGVhbiA9IGZhbHNlO1xuXG5cdHByaXZhdGUgX3NoYWRlclBpY2tpbmdEZXRhaWxzOmJvb2xlYW47XG5cblx0cHVibGljIF9wUGlja2luZ0NvbGxpc2lvblZPOlBpY2tpbmdDb2xsaXNpb25WTztcblxuXHRwdWJsaWMgX2JvdW5kc1R5cGU6c3RyaW5nO1xuXG5cdHB1YmxpYyBfcFBpY2tpbmdDb2xsaWRlcjpJUGlja2luZ0NvbGxpZGVyO1xuXG5cdHB1YmxpYyBfcFJlbmRlcmFibGVzOkFycmF5PElSZW5kZXJhYmxlPiA9IG5ldyBBcnJheTxJUmVuZGVyYWJsZT4oKTtcblx0cHJpdmF0ZSBfZW50aXR5Tm9kZXM6QXJyYXk8RW50aXR5Tm9kZT4gPSBuZXcgQXJyYXk8RW50aXR5Tm9kZT4oKTtcblxuXHRwdWJsaWMgX2lTb3VyY2VQcmVmYWI6UHJlZmFiQmFzZTtcblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBhbGlnbm1lbnRNb2RlOnN0cmluZyA9IEFsaWdubWVudE1vZGUuUkVHSVNUUkFUSU9OX1BPSU5UO1xuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgdGhlIGFscGhhIHRyYW5zcGFyZW5jeSB2YWx1ZSBvZiB0aGUgb2JqZWN0IHNwZWNpZmllZC4gVmFsaWRcblx0ICogdmFsdWVzIGFyZSAwKGZ1bGx5IHRyYW5zcGFyZW50KSB0byAxKGZ1bGx5IG9wYXF1ZSkuIFRoZSBkZWZhdWx0IHZhbHVlIGlzXG5cdCAqIDEuIERpc3BsYXkgb2JqZWN0cyB3aXRoIDxjb2RlPmFscGhhPC9jb2RlPiBzZXQgdG8gMCA8aT5hcmU8L2k+IGFjdGl2ZSxcblx0ICogZXZlbiB0aG91Z2ggdGhleSBhcmUgaW52aXNpYmxlLlxuXHQgKi9cblx0cHVibGljIGFscGhhOm51bWJlcjtcblxuXHQvKipcblx0ICogQSB2YWx1ZSBmcm9tIHRoZSBCbGVuZE1vZGUgY2xhc3MgdGhhdCBzcGVjaWZpZXMgd2hpY2ggYmxlbmQgbW9kZSB0byB1c2UuIEFcblx0ICogYml0bWFwIGNhbiBiZSBkcmF3biBpbnRlcm5hbGx5IGluIHR3byB3YXlzLiBJZiB5b3UgaGF2ZSBhIGJsZW5kIG1vZGVcblx0ICogZW5hYmxlZCBvciBhbiBleHRlcm5hbCBjbGlwcGluZyBtYXNrLCB0aGUgYml0bWFwIGlzIGRyYXduIGJ5IGFkZGluZyBhXG5cdCAqIGJpdG1hcC1maWxsZWQgc3F1YXJlIHNoYXBlIHRvIHRoZSB2ZWN0b3IgcmVuZGVyLiBJZiB5b3UgYXR0ZW1wdCB0byBzZXRcblx0ICogdGhpcyBwcm9wZXJ0eSB0byBhbiBpbnZhbGlkIHZhbHVlLCBGbGFzaCBydW50aW1lcyBzZXQgdGhlIHZhbHVlIHRvXG5cdCAqIDxjb2RlPkJsZW5kTW9kZS5OT1JNQUw8L2NvZGU+LlxuXHQgKlxuXHQgKiA8cD5UaGUgPGNvZGU+YmxlbmRNb2RlPC9jb2RlPiBwcm9wZXJ0eSBhZmZlY3RzIGVhY2ggcGl4ZWwgb2YgdGhlIGRpc3BsYXlcblx0ICogb2JqZWN0LiBFYWNoIHBpeGVsIGlzIGNvbXBvc2VkIG9mIHRocmVlIGNvbnN0aXR1ZW50IGNvbG9ycyhyZWQsIGdyZWVuLFxuXHQgKiBhbmQgYmx1ZSksIGFuZCBlYWNoIGNvbnN0aXR1ZW50IGNvbG9yIGhhcyBhIHZhbHVlIGJldHdlZW4gMHgwMCBhbmQgMHhGRi5cblx0ICogRmxhc2ggUGxheWVyIG9yIEFkb2JlIEFJUiBjb21wYXJlcyBlYWNoIGNvbnN0aXR1ZW50IGNvbG9yIG9mIG9uZSBwaXhlbCBpblxuXHQgKiB0aGUgbW92aWUgY2xpcCB3aXRoIHRoZSBjb3JyZXNwb25kaW5nIGNvbG9yIG9mIHRoZSBwaXhlbCBpbiB0aGVcblx0ICogYmFja2dyb3VuZC4gRm9yIGV4YW1wbGUsIGlmIDxjb2RlPmJsZW5kTW9kZTwvY29kZT4gaXMgc2V0IHRvXG5cdCAqIDxjb2RlPkJsZW5kTW9kZS5MSUdIVEVOPC9jb2RlPiwgRmxhc2ggUGxheWVyIG9yIEFkb2JlIEFJUiBjb21wYXJlcyB0aGUgcmVkXG5cdCAqIHZhbHVlIG9mIHRoZSBkaXNwbGF5IG9iamVjdCB3aXRoIHRoZSByZWQgdmFsdWUgb2YgdGhlIGJhY2tncm91bmQsIGFuZCB1c2VzXG5cdCAqIHRoZSBsaWdodGVyIG9mIHRoZSB0d28gYXMgdGhlIHZhbHVlIGZvciB0aGUgcmVkIGNvbXBvbmVudCBvZiB0aGUgZGlzcGxheWVkXG5cdCAqIGNvbG9yLjwvcD5cblx0ICpcblx0ICogPHA+VGhlIGZvbGxvd2luZyB0YWJsZSBkZXNjcmliZXMgdGhlIDxjb2RlPmJsZW5kTW9kZTwvY29kZT4gc2V0dGluZ3MuIFRoZVxuXHQgKiBCbGVuZE1vZGUgY2xhc3MgZGVmaW5lcyBzdHJpbmcgdmFsdWVzIHlvdSBjYW4gdXNlLiBUaGUgaWxsdXN0cmF0aW9ucyBpblxuXHQgKiB0aGUgdGFibGUgc2hvdyA8Y29kZT5ibGVuZE1vZGU8L2NvZGU+IHZhbHVlcyBhcHBsaWVkIHRvIGEgY2lyY3VsYXIgZGlzcGxheVxuXHQgKiBvYmplY3QoMikgc3VwZXJpbXBvc2VkIG9uIGFub3RoZXIgZGlzcGxheSBvYmplY3QoMSkuPC9wPlxuXHQgKi9cblx0cHVibGljIGJsZW5kTW9kZTpCbGVuZE1vZGU7XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGJvdW5kc1R5cGUoKTpzdHJpbmdcblx0e1xuXHRcdHJldHVybiB0aGlzLl9ib3VuZHNUeXBlO1xuXHR9XG5cblx0cHVibGljIHNldCBib3VuZHNUeXBlKHZhbHVlOnN0cmluZylcblx0e1xuXHRcdGlmICh0aGlzLl9ib3VuZHNUeXBlID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fYm91bmRzVHlwZSA9IHZhbHVlO1xuXG5cdFx0dGhpcy5fcEludmFsaWRhdGVCb3VuZHMoKTtcblxuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fZW50aXR5Tm9kZXMubGVuZ3RoO1xuXHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IGxlbjsgaSsrKVxuXHRcdFx0dGhpcy5fZW50aXR5Tm9kZXNbaV0udXBkYXRlQm91bmRzKCk7XG5cdH1cblxuXHQvKipcblx0ICogSWYgc2V0IHRvIDxjb2RlPnRydWU8L2NvZGU+LCBOTUUgd2lsbCB1c2UgdGhlIHNvZnR3YXJlIHJlbmRlcmVyIHRvIGNhY2hlXG5cdCAqIGFuIGludGVybmFsIGJpdG1hcCByZXByZXNlbnRhdGlvbiBvZiB0aGUgZGlzcGxheSBvYmplY3QuIEZvciBuYXRpdmUgdGFyZ2V0cyxcblx0ICogdGhpcyBpcyBvZnRlbiBtdWNoIHNsb3dlciB0aGFuIHRoZSBkZWZhdWx0IGhhcmR3YXJlIHJlbmRlcmVyLiBXaGVuIHlvdVxuXHQgKiBhcmUgdXNpbmcgdGhlIEZsYXNoIHRhcmdldCwgdGhpcyBjYWNoaW5nIG1heSBpbmNyZWFzZSBwZXJmb3JtYW5jZSBmb3IgZGlzcGxheVxuXHQgKiBvYmplY3RzIHRoYXQgY29udGFpbiBjb21wbGV4IHZlY3RvciBjb250ZW50LlxuXHQgKlxuXHQgKiA8cD5BbGwgdmVjdG9yIGRhdGEgZm9yIGEgZGlzcGxheSBvYmplY3QgdGhhdCBoYXMgYSBjYWNoZWQgYml0bWFwIGlzIGRyYXduXG5cdCAqIHRvIHRoZSBiaXRtYXAgaW5zdGVhZCBvZiB0aGUgbWFpbiBkaXNwbGF5LiBJZlxuXHQgKiA8Y29kZT5jYWNoZUFzQml0bWFwTWF0cml4PC9jb2RlPiBpcyBudWxsIG9yIHVuc3VwcG9ydGVkLCB0aGUgYml0bWFwIGlzXG5cdCAqIHRoZW4gY29waWVkIHRvIHRoZSBtYWluIGRpc3BsYXkgYXMgdW5zdHJldGNoZWQsIHVucm90YXRlZCBwaXhlbHMgc25hcHBlZFxuXHQgKiB0byB0aGUgbmVhcmVzdCBwaXhlbCBib3VuZGFyaWVzLiBQaXhlbHMgYXJlIG1hcHBlZCAxIHRvIDEgd2l0aCB0aGUgcGFyZW50XG5cdCAqIG9iamVjdC4gSWYgdGhlIGJvdW5kcyBvZiB0aGUgYml0bWFwIGNoYW5nZSwgdGhlIGJpdG1hcCBpcyByZWNyZWF0ZWRcblx0ICogaW5zdGVhZCBvZiBiZWluZyBzdHJldGNoZWQuPC9wPlxuXHQgKlxuXHQgKiA8cD5JZiA8Y29kZT5jYWNoZUFzQml0bWFwTWF0cml4PC9jb2RlPiBpcyBub24tbnVsbCBhbmQgc3VwcG9ydGVkLCB0aGVcblx0ICogb2JqZWN0IGlzIGRyYXduIHRvIHRoZSBvZmYtc2NyZWVuIGJpdG1hcCB1c2luZyB0aGF0IG1hdHJpeCBhbmQgdGhlXG5cdCAqIHN0cmV0Y2hlZCBhbmQvb3Igcm90YXRlZCByZXN1bHRzIG9mIHRoYXQgcmVuZGVyaW5nIGFyZSB1c2VkIHRvIGRyYXcgdGhlXG5cdCAqIG9iamVjdCB0byB0aGUgbWFpbiBkaXNwbGF5LjwvcD5cblx0ICpcblx0ICogPHA+Tm8gaW50ZXJuYWwgYml0bWFwIGlzIGNyZWF0ZWQgdW5sZXNzIHRoZSA8Y29kZT5jYWNoZUFzQml0bWFwPC9jb2RlPlxuXHQgKiBwcm9wZXJ0eSBpcyBzZXQgdG8gPGNvZGU+dHJ1ZTwvY29kZT4uPC9wPlxuXHQgKlxuXHQgKiA8cD5BZnRlciB5b3Ugc2V0IHRoZSA8Y29kZT5jYWNoZUFzQml0bWFwPC9jb2RlPiBwcm9wZXJ0eSB0b1xuXHQgKiA8Y29kZT50cnVlPC9jb2RlPiwgdGhlIHJlbmRlcmluZyBkb2VzIG5vdCBjaGFuZ2UsIGhvd2V2ZXIgdGhlIGRpc3BsYXlcblx0ICogb2JqZWN0IHBlcmZvcm1zIHBpeGVsIHNuYXBwaW5nIGF1dG9tYXRpY2FsbHkuIFRoZSBhbmltYXRpb24gc3BlZWQgY2FuIGJlXG5cdCAqIHNpZ25pZmljYW50bHkgZmFzdGVyIGRlcGVuZGluZyBvbiB0aGUgY29tcGxleGl0eSBvZiB0aGUgdmVjdG9yIGNvbnRlbnQuXG5cdCAqIDwvcD5cblx0ICpcblx0ICogPHA+VGhlIDxjb2RlPmNhY2hlQXNCaXRtYXA8L2NvZGU+IHByb3BlcnR5IGlzIGF1dG9tYXRpY2FsbHkgc2V0IHRvXG5cdCAqIDxjb2RlPnRydWU8L2NvZGU+IHdoZW5ldmVyIHlvdSBhcHBseSBhIGZpbHRlciB0byBhIGRpc3BsYXkgb2JqZWN0KHdoZW5cblx0ICogaXRzIDxjb2RlPmZpbHRlcjwvY29kZT4gYXJyYXkgaXMgbm90IGVtcHR5KSwgYW5kIGlmIGEgZGlzcGxheSBvYmplY3QgaGFzIGFcblx0ICogZmlsdGVyIGFwcGxpZWQgdG8gaXQsIDxjb2RlPmNhY2hlQXNCaXRtYXA8L2NvZGU+IGlzIHJlcG9ydGVkIGFzXG5cdCAqIDxjb2RlPnRydWU8L2NvZGU+IGZvciB0aGF0IGRpc3BsYXkgb2JqZWN0LCBldmVuIGlmIHlvdSBzZXQgdGhlIHByb3BlcnR5IHRvXG5cdCAqIDxjb2RlPmZhbHNlPC9jb2RlPi4gSWYgeW91IGNsZWFyIGFsbCBmaWx0ZXJzIGZvciBhIGRpc3BsYXkgb2JqZWN0LCB0aGVcblx0ICogPGNvZGU+Y2FjaGVBc0JpdG1hcDwvY29kZT4gc2V0dGluZyBjaGFuZ2VzIHRvIHdoYXQgaXQgd2FzIGxhc3Qgc2V0IHRvLjwvcD5cblx0ICpcblx0ICogPHA+QSBkaXNwbGF5IG9iamVjdCBkb2VzIG5vdCB1c2UgYSBiaXRtYXAgZXZlbiBpZiB0aGVcblx0ICogPGNvZGU+Y2FjaGVBc0JpdG1hcDwvY29kZT4gcHJvcGVydHkgaXMgc2V0IHRvIDxjb2RlPnRydWU8L2NvZGU+IGFuZFxuXHQgKiBpbnN0ZWFkIHJlbmRlcnMgZnJvbSB2ZWN0b3IgZGF0YSBpbiB0aGUgZm9sbG93aW5nIGNhc2VzOjwvcD5cblx0ICpcblx0ICogPHVsPlxuXHQgKiAgIDxsaT5UaGUgYml0bWFwIGlzIHRvbyBsYXJnZS4gSW4gQUlSIDEuNSBhbmQgRmxhc2ggUGxheWVyIDEwLCB0aGUgbWF4aW11bVxuXHQgKiBzaXplIGZvciBhIGJpdG1hcCBpbWFnZSBpcyA4LDE5MSBwaXhlbHMgaW4gd2lkdGggb3IgaGVpZ2h0LCBhbmQgdGhlIHRvdGFsXG5cdCAqIG51bWJlciBvZiBwaXhlbHMgY2Fubm90IGV4Y2VlZCAxNiw3NzcsMjE1IHBpeGVscy4oU28sIGlmIGEgYml0bWFwIGltYWdlXG5cdCAqIGlzIDgsMTkxIHBpeGVscyB3aWRlLCBpdCBjYW4gb25seSBiZSAyLDA0OCBwaXhlbHMgaGlnaC4pIEluIEZsYXNoIFBsYXllciA5XG5cdCAqIGFuZCBlYXJsaWVyLCB0aGUgbGltaXRhdGlvbiBpcyBpcyAyODgwIHBpeGVscyBpbiBoZWlnaHQgYW5kIDIsODgwIHBpeGVsc1xuXHQgKiBpbiB3aWR0aC48L2xpPlxuXHQgKiAgIDxsaT5UaGUgYml0bWFwIGZhaWxzIHRvIGFsbG9jYXRlKG91dCBvZiBtZW1vcnkgZXJyb3IpLiA8L2xpPlxuXHQgKiA8L3VsPlxuXHQgKlxuXHQgKiA8cD5UaGUgPGNvZGU+Y2FjaGVBc0JpdG1hcDwvY29kZT4gcHJvcGVydHkgaXMgYmVzdCB1c2VkIHdpdGggbW92aWUgY2xpcHNcblx0ICogdGhhdCBoYXZlIG1vc3RseSBzdGF0aWMgY29udGVudCBhbmQgdGhhdCBkbyBub3Qgc2NhbGUgYW5kIHJvdGF0ZVxuXHQgKiBmcmVxdWVudGx5LiBXaXRoIHN1Y2ggbW92aWUgY2xpcHMsIDxjb2RlPmNhY2hlQXNCaXRtYXA8L2NvZGU+IGNhbiBsZWFkIHRvXG5cdCAqIHBlcmZvcm1hbmNlIGluY3JlYXNlcyB3aGVuIHRoZSBtb3ZpZSBjbGlwIGlzIHRyYW5zbGF0ZWQod2hlbiBpdHMgPGk+eDwvaT5cblx0ICogYW5kIDxpPnk8L2k+IHBvc2l0aW9uIGlzIGNoYW5nZWQpLjwvcD5cblx0ICovXG5cdHB1YmxpYyBjYWNoZUFzQml0bWFwOmJvb2xlYW47XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgY2FzdHNTaGFkb3dzOmJvb2xlYW4gPSB0cnVlO1xuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgdGhlIGRlcHRoIG9mIHRoZSBkaXNwbGF5IG9iamVjdCwgaW4gcGl4ZWxzLiBUaGUgZGVwdGggaXNcblx0ICogY2FsY3VsYXRlZCBiYXNlZCBvbiB0aGUgYm91bmRzIG9mIHRoZSBjb250ZW50IG9mIHRoZSBkaXNwbGF5IG9iamVjdC4gV2hlblxuXHQgKiB5b3Ugc2V0IHRoZSA8Y29kZT5kZXB0aDwvY29kZT4gcHJvcGVydHksIHRoZSA8Y29kZT5zY2FsZVo8L2NvZGU+IHByb3BlcnR5XG5cdCAqIGlzIGFkanVzdGVkIGFjY29yZGluZ2x5LCBhcyBzaG93biBpbiB0aGUgZm9sbG93aW5nIGNvZGU6XG5cdCAqXG5cdCAqIDxwPkV4Y2VwdCBmb3IgVGV4dEZpZWxkIGFuZCBWaWRlbyBvYmplY3RzLCBhIGRpc3BsYXkgb2JqZWN0IHdpdGggbm9cblx0ICogY29udGVudCAoc3VjaCBhcyBhbiBlbXB0eSBzcHJpdGUpIGhhcyBhIGRlcHRoIG9mIDAsIGV2ZW4gaWYgeW91IHRyeSB0b1xuXHQgKiBzZXQgPGNvZGU+ZGVwdGg8L2NvZGU+IHRvIGEgZGlmZmVyZW50IHZhbHVlLjwvcD5cblx0ICovXG5cdHB1YmxpYyBnZXQgZGVwdGgoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLmdldEJveCgpLmRlcHRoKnRoaXMuX3BTY2FsZVo7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGRlcHRoKHZhbDpudW1iZXIpXG5cdHtcblx0XHRpZiAodGhpcy5fZGVwdGggPT0gdmFsKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fZGVwdGggPSB2YWw7XG5cblx0XHR0aGlzLl9wU2NhbGVaID0gdmFsL3RoaXMuZ2V0Qm94KCkuZGVwdGg7XG5cblx0XHR0aGlzLmludmFsaWRhdGVTY2FsZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIERlZmluZXMgdGhlIHJvdGF0aW9uIG9mIHRoZSAzZCBvYmplY3QgYXMgYSA8Y29kZT5WZWN0b3IzRDwvY29kZT4gb2JqZWN0IGNvbnRhaW5pbmcgZXVsZXIgYW5nbGVzIGZvciByb3RhdGlvbiBhcm91bmQgeCwgeSBhbmQgeiBheGlzLlxuXHQgKi9cblx0cHVibGljIGdldCBldWxlcnMoKTpWZWN0b3IzRFxuXHR7XG5cdFx0dGhpcy5fZXVsZXJzLnggPSB0aGlzLl9yb3RhdGlvblgqTWF0aENvbnN0cy5SQURJQU5TX1RPX0RFR1JFRVM7XG5cdFx0dGhpcy5fZXVsZXJzLnkgPSB0aGlzLl9yb3RhdGlvblkqTWF0aENvbnN0cy5SQURJQU5TX1RPX0RFR1JFRVM7XG5cdFx0dGhpcy5fZXVsZXJzLnogPSB0aGlzLl9yb3RhdGlvbloqTWF0aENvbnN0cy5SQURJQU5TX1RPX0RFR1JFRVM7XG5cblx0XHRyZXR1cm4gdGhpcy5fZXVsZXJzO1xuXHR9XG5cblx0cHVibGljIHNldCBldWxlcnModmFsdWU6VmVjdG9yM0QpXG5cdHtcblx0XHR0aGlzLl9yb3RhdGlvblggPSB2YWx1ZS54Kk1hdGhDb25zdHMuREVHUkVFU19UT19SQURJQU5TO1xuXHRcdHRoaXMuX3JvdGF0aW9uWSA9IHZhbHVlLnkqTWF0aENvbnN0cy5ERUdSRUVTX1RPX1JBRElBTlM7XG5cdFx0dGhpcy5fcm90YXRpb25aID0gdmFsdWUueipNYXRoQ29uc3RzLkRFR1JFRVNfVE9fUkFESUFOUztcblxuXHRcdHRoaXMuaW52YWxpZGF0ZVJvdGF0aW9uKCk7XG5cdH1cblxuXHQvKipcblx0ICogQW4gb2JqZWN0IHRoYXQgY2FuIGNvbnRhaW4gYW55IGV4dHJhIGRhdGEuXG5cdCAqL1xuXHRwdWJsaWMgZXh0cmE6T2JqZWN0O1xuXG5cdC8qKlxuXHQgKiBBbiBpbmRleGVkIGFycmF5IHRoYXQgY29udGFpbnMgZWFjaCBmaWx0ZXIgb2JqZWN0IGN1cnJlbnRseSBhc3NvY2lhdGVkXG5cdCAqIHdpdGggdGhlIGRpc3BsYXkgb2JqZWN0LiBUaGUgZmxhc2guZmlsdGVycyBwYWNrYWdlIGNvbnRhaW5zIHNldmVyYWxcblx0ICogY2xhc3NlcyB0aGF0IGRlZmluZSBzcGVjaWZpYyBmaWx0ZXJzIHlvdSBjYW4gdXNlLlxuXHQgKlxuXHQgKiA8cD5GaWx0ZXJzIGNhbiBiZSBhcHBsaWVkIGluIEZsYXNoIFByb2Zlc3Npb25hbCBhdCBkZXNpZ24gdGltZSwgb3IgYXQgcnVuXG5cdCAqIHRpbWUgYnkgdXNpbmcgQWN0aW9uU2NyaXB0IGNvZGUuIFRvIGFwcGx5IGEgZmlsdGVyIGJ5IHVzaW5nIEFjdGlvblNjcmlwdCxcblx0ICogeW91IG11c3QgbWFrZSBhIHRlbXBvcmFyeSBjb3B5IG9mIHRoZSBlbnRpcmUgPGNvZGU+ZmlsdGVyczwvY29kZT4gYXJyYXksXG5cdCAqIG1vZGlmeSB0aGUgdGVtcG9yYXJ5IGFycmF5LCB0aGVuIGFzc2lnbiB0aGUgdmFsdWUgb2YgdGhlIHRlbXBvcmFyeSBhcnJheVxuXHQgKiBiYWNrIHRvIHRoZSA8Y29kZT5maWx0ZXJzPC9jb2RlPiBhcnJheS4gWW91IGNhbm5vdCBkaXJlY3RseSBhZGQgYSBuZXdcblx0ICogZmlsdGVyIG9iamVjdCB0byB0aGUgPGNvZGU+ZmlsdGVyczwvY29kZT4gYXJyYXkuPC9wPlxuXHQgKlxuXHQgKiA8cD5UbyBhZGQgYSBmaWx0ZXIgYnkgdXNpbmcgQWN0aW9uU2NyaXB0LCBwZXJmb3JtIHRoZSBmb2xsb3dpbmcgc3RlcHNcblx0ICogKGFzc3VtZSB0aGF0IHRoZSB0YXJnZXQgZGlzcGxheSBvYmplY3QgaXMgbmFtZWRcblx0ICogPGNvZGU+bXlEaXNwbGF5T2JqZWN0PC9jb2RlPik6PC9wPlxuXHQgKlxuXHQgKiA8b2w+XG5cdCAqICAgPGxpPkNyZWF0ZSBhIG5ldyBmaWx0ZXIgb2JqZWN0IGJ5IHVzaW5nIHRoZSBjb25zdHJ1Y3RvciBtZXRob2Qgb2YgeW91clxuXHQgKiBjaG9zZW4gZmlsdGVyIGNsYXNzLjwvbGk+XG5cdCAqICAgPGxpPkFzc2lnbiB0aGUgdmFsdWUgb2YgdGhlIDxjb2RlPm15RGlzcGxheU9iamVjdC5maWx0ZXJzPC9jb2RlPiBhcnJheVxuXHQgKiB0byBhIHRlbXBvcmFyeSBhcnJheSwgc3VjaCBhcyBvbmUgbmFtZWQgPGNvZGU+bXlGaWx0ZXJzPC9jb2RlPi48L2xpPlxuXHQgKiAgIDxsaT5BZGQgdGhlIG5ldyBmaWx0ZXIgb2JqZWN0IHRvIHRoZSA8Y29kZT5teUZpbHRlcnM8L2NvZGU+IHRlbXBvcmFyeVxuXHQgKiBhcnJheS48L2xpPlxuXHQgKiAgIDxsaT5Bc3NpZ24gdGhlIHZhbHVlIG9mIHRoZSB0ZW1wb3JhcnkgYXJyYXkgdG8gdGhlXG5cdCAqIDxjb2RlPm15RGlzcGxheU9iamVjdC5maWx0ZXJzPC9jb2RlPiBhcnJheS48L2xpPlxuXHQgKiA8L29sPlxuXHQgKlxuXHQgKiA8cD5JZiB0aGUgPGNvZGU+ZmlsdGVyczwvY29kZT4gYXJyYXkgaXMgdW5kZWZpbmVkLCB5b3UgZG8gbm90IG5lZWQgdG8gdXNlXG5cdCAqIGEgdGVtcG9yYXJ5IGFycmF5LiBJbnN0ZWFkLCB5b3UgY2FuIGRpcmVjdGx5IGFzc2lnbiBhbiBhcnJheSBsaXRlcmFsIHRoYXRcblx0ICogY29udGFpbnMgb25lIG9yIG1vcmUgZmlsdGVyIG9iamVjdHMgdGhhdCB5b3UgY3JlYXRlLiBUaGUgZmlyc3QgZXhhbXBsZSBpblxuXHQgKiB0aGUgRXhhbXBsZXMgc2VjdGlvbiBhZGRzIGEgZHJvcCBzaGFkb3cgZmlsdGVyIGJ5IHVzaW5nIGNvZGUgdGhhdCBoYW5kbGVzXG5cdCAqIGJvdGggZGVmaW5lZCBhbmQgdW5kZWZpbmVkIDxjb2RlPmZpbHRlcnM8L2NvZGU+IGFycmF5cy48L3A+XG5cdCAqXG5cdCAqIDxwPlRvIG1vZGlmeSBhbiBleGlzdGluZyBmaWx0ZXIgb2JqZWN0LCB5b3UgbXVzdCB1c2UgdGhlIHRlY2huaXF1ZSBvZlxuXHQgKiBtb2RpZnlpbmcgYSBjb3B5IG9mIHRoZSA8Y29kZT5maWx0ZXJzPC9jb2RlPiBhcnJheTo8L3A+XG5cdCAqXG5cdCAqIDxvbD5cblx0ICogICA8bGk+QXNzaWduIHRoZSB2YWx1ZSBvZiB0aGUgPGNvZGU+ZmlsdGVyczwvY29kZT4gYXJyYXkgdG8gYSB0ZW1wb3Jhcnlcblx0ICogYXJyYXksIHN1Y2ggYXMgb25lIG5hbWVkIDxjb2RlPm15RmlsdGVyczwvY29kZT4uPC9saT5cblx0ICogICA8bGk+TW9kaWZ5IHRoZSBwcm9wZXJ0eSBieSB1c2luZyB0aGUgdGVtcG9yYXJ5IGFycmF5LFxuXHQgKiA8Y29kZT5teUZpbHRlcnM8L2NvZGU+LiBGb3IgZXhhbXBsZSwgdG8gc2V0IHRoZSBxdWFsaXR5IHByb3BlcnR5IG9mIHRoZVxuXHQgKiBmaXJzdCBmaWx0ZXIgaW4gdGhlIGFycmF5LCB5b3UgY291bGQgdXNlIHRoZSBmb2xsb3dpbmcgY29kZTpcblx0ICogPGNvZGU+bXlGaWx0ZXJzWzBdLnF1YWxpdHkgPSAxOzwvY29kZT48L2xpPlxuXHQgKiAgIDxsaT5Bc3NpZ24gdGhlIHZhbHVlIG9mIHRoZSB0ZW1wb3JhcnkgYXJyYXkgdG8gdGhlIDxjb2RlPmZpbHRlcnM8L2NvZGU+XG5cdCAqIGFycmF5LjwvbGk+XG5cdCAqIDwvb2w+XG5cdCAqXG5cdCAqIDxwPkF0IGxvYWQgdGltZSwgaWYgYSBkaXNwbGF5IG9iamVjdCBoYXMgYW4gYXNzb2NpYXRlZCBmaWx0ZXIsIGl0IGlzXG5cdCAqIG1hcmtlZCB0byBjYWNoZSBpdHNlbGYgYXMgYSB0cmFuc3BhcmVudCBiaXRtYXAuIEZyb20gdGhpcyBwb2ludCBmb3J3YXJkLFxuXHQgKiBhcyBsb25nIGFzIHRoZSBkaXNwbGF5IG9iamVjdCBoYXMgYSB2YWxpZCBmaWx0ZXIgbGlzdCwgdGhlIHBsYXllciBjYWNoZXNcblx0ICogdGhlIGRpc3BsYXkgb2JqZWN0IGFzIGEgYml0bWFwLiBUaGlzIHNvdXJjZSBiaXRtYXAgaXMgdXNlZCBhcyBhIHNvdXJjZVxuXHQgKiBpbWFnZSBmb3IgdGhlIGZpbHRlciBlZmZlY3RzLiBFYWNoIGRpc3BsYXkgb2JqZWN0IHVzdWFsbHkgaGFzIHR3byBiaXRtYXBzOlxuXHQgKiBvbmUgd2l0aCB0aGUgb3JpZ2luYWwgdW5maWx0ZXJlZCBzb3VyY2UgZGlzcGxheSBvYmplY3QgYW5kIGFub3RoZXIgZm9yIHRoZVxuXHQgKiBmaW5hbCBpbWFnZSBhZnRlciBmaWx0ZXJpbmcuIFRoZSBmaW5hbCBpbWFnZSBpcyB1c2VkIHdoZW4gcmVuZGVyaW5nLiBBc1xuXHQgKiBsb25nIGFzIHRoZSBkaXNwbGF5IG9iamVjdCBkb2VzIG5vdCBjaGFuZ2UsIHRoZSBmaW5hbCBpbWFnZSBkb2VzIG5vdCBuZWVkXG5cdCAqIHVwZGF0aW5nLjwvcD5cblx0ICpcblx0ICogPHA+VGhlIGZsYXNoLmZpbHRlcnMgcGFja2FnZSBpbmNsdWRlcyBjbGFzc2VzIGZvciBmaWx0ZXJzLiBGb3IgZXhhbXBsZSwgdG9cblx0ICogY3JlYXRlIGEgRHJvcFNoYWRvdyBmaWx0ZXIsIHlvdSB3b3VsZCB3cml0ZTo8L3A+XG5cdCAqXG5cdCAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciBXaGVuIDxjb2RlPmZpbHRlcnM8L2NvZGU+IGluY2x1ZGVzIGEgU2hhZGVyRmlsdGVyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBhbmQgdGhlIHNoYWRlciBvdXRwdXQgdHlwZSBpcyBub3QgY29tcGF0aWJsZSB3aXRoXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICB0aGlzIG9wZXJhdGlvbih0aGUgc2hhZGVyIG11c3Qgc3BlY2lmeSBhXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5waXhlbDQ8L2NvZGU+IG91dHB1dCkuXG5cdCAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciBXaGVuIDxjb2RlPmZpbHRlcnM8L2NvZGU+IGluY2x1ZGVzIGEgU2hhZGVyRmlsdGVyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBhbmQgdGhlIHNoYWRlciBkb2Vzbid0IHNwZWNpZnkgYW55IGltYWdlIGlucHV0IG9yXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICB0aGUgZmlyc3QgaW5wdXQgaXMgbm90IGFuIDxjb2RlPmltYWdlNDwvY29kZT4gaW5wdXQuXG5cdCAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciBXaGVuIDxjb2RlPmZpbHRlcnM8L2NvZGU+IGluY2x1ZGVzIGEgU2hhZGVyRmlsdGVyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBhbmQgdGhlIHNoYWRlciBzcGVjaWZpZXMgYW4gaW1hZ2UgaW5wdXQgdGhhdCBpc24ndFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZWQuXG5cdCAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciBXaGVuIDxjb2RlPmZpbHRlcnM8L2NvZGU+IGluY2x1ZGVzIGEgU2hhZGVyRmlsdGVyLCBhXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBCeXRlQXJyYXkgb3IgVmVjdG9yLjxOdW1iZXI+IGluc3RhbmNlIGFzIGEgc2hhZGVyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBpbnB1dCwgYW5kIHRoZSA8Y29kZT53aWR0aDwvY29kZT4gYW5kXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5oZWlnaHQ8L2NvZGU+IHByb3BlcnRpZXMgYXJlbid0IHNwZWNpZmllZCBmb3Jcblx0ICogICAgICAgICAgICAgICAgICAgICAgIHRoZSBTaGFkZXJJbnB1dCBvYmplY3QsIG9yIHRoZSBzcGVjaWZpZWQgdmFsdWVzXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBkb24ndCBtYXRjaCB0aGUgYW1vdW50IG9mIGRhdGEgaW4gdGhlIGlucHV0IGRhdGEuXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBTZWUgdGhlIDxjb2RlPlNoYWRlcklucHV0LmlucHV0PC9jb2RlPiBwcm9wZXJ0eSBmb3Jcblx0ICogICAgICAgICAgICAgICAgICAgICAgIG1vcmUgaW5mb3JtYXRpb24uXG5cdCAqL1xuLy9cdFx0cHVibGljIGZpbHRlcnM6QXJyYXk8RHluYW1pYz47XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB0aGUgaGVpZ2h0IG9mIHRoZSBkaXNwbGF5IG9iamVjdCwgaW4gcGl4ZWxzLiBUaGUgaGVpZ2h0IGlzXG5cdCAqIGNhbGN1bGF0ZWQgYmFzZWQgb24gdGhlIGJvdW5kcyBvZiB0aGUgY29udGVudCBvZiB0aGUgZGlzcGxheSBvYmplY3QuIFdoZW5cblx0ICogeW91IHNldCB0aGUgPGNvZGU+aGVpZ2h0PC9jb2RlPiBwcm9wZXJ0eSwgdGhlIDxjb2RlPnNjYWxlWTwvY29kZT4gcHJvcGVydHlcblx0ICogaXMgYWRqdXN0ZWQgYWNjb3JkaW5nbHksIGFzIHNob3duIGluIHRoZSBmb2xsb3dpbmcgY29kZTpcblx0ICpcblx0ICogPHA+RXhjZXB0IGZvciBUZXh0RmllbGQgYW5kIFZpZGVvIG9iamVjdHMsIGEgZGlzcGxheSBvYmplY3Qgd2l0aCBub1xuXHQgKiBjb250ZW50IChzdWNoIGFzIGFuIGVtcHR5IHNwcml0ZSkgaGFzIGEgaGVpZ2h0IG9mIDAsIGV2ZW4gaWYgeW91IHRyeSB0b1xuXHQgKiBzZXQgPGNvZGU+aGVpZ2h0PC9jb2RlPiB0byBhIGRpZmZlcmVudCB2YWx1ZS48L3A+XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGhlaWdodCgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0Qm94KCkuaGVpZ2h0KnRoaXMuX3BTY2FsZVk7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGhlaWdodCh2YWw6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2hlaWdodCA9PSB2YWwpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9oZWlnaHQgPSB2YWw7XG5cblx0XHR0aGlzLl9wU2NhbGVZID0gdmFsL3RoaXMuZ2V0Qm94KCkuaGVpZ2h0O1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlU2NhbGUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgdGhlIGluc3RhbmNlIGNvbnRhaW5lciBpbmRleCBvZiB0aGUgRGlzcGxheU9iamVjdC4gVGhlIG9iamVjdCBjYW4gYmVcblx0ICogaWRlbnRpZmllZCBpbiB0aGUgY2hpbGQgbGlzdCBvZiBpdHMgcGFyZW50IGRpc3BsYXkgb2JqZWN0IGNvbnRhaW5lciBieVxuXHQgKiBjYWxsaW5nIHRoZSA8Y29kZT5nZXRDaGlsZEJ5SW5kZXgoKTwvY29kZT4gbWV0aG9kIG9mIHRoZSBkaXNwbGF5IG9iamVjdFxuXHQgKiBjb250YWluZXIuXG5cdCAqXG5cdCAqIDxwPklmIHRoZSBEaXNwbGF5T2JqZWN0IGhhcyBubyBwYXJlbnQgY29udGFpbmVyLCBpbmRleCBkZWZhdWx0cyB0byAwLjwvcD5cblx0ICovXG5cdHB1YmxpYyBnZXQgaW5kZXgoKTpudW1iZXJcblx0e1xuXHRcdGlmICh0aGlzLl9wUGFyZW50KVxuXHRcdFx0cmV0dXJuIHRoaXMuX3BQYXJlbnQuZ2V0Q2hpbGRJbmRleCh0aGlzKTtcblxuXHRcdHJldHVybiAwO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGludmVyc2VTY2VuZVRyYW5zZm9ybSgpOk1hdHJpeDNEXG5cdHtcblx0XHRpZiAodGhpcy5faW52ZXJzZVNjZW5lVHJhbnNmb3JtRGlydHkpIHtcblx0XHRcdHRoaXMuX2ludmVyc2VTY2VuZVRyYW5zZm9ybS5jb3B5RnJvbSh0aGlzLnNjZW5lVHJhbnNmb3JtKTtcblx0XHRcdHRoaXMuX2ludmVyc2VTY2VuZVRyYW5zZm9ybS5pbnZlcnQoKTtcblx0XHRcdHRoaXMuX2ludmVyc2VTY2VuZVRyYW5zZm9ybURpcnR5ID0gZmFsc2U7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLl9pbnZlcnNlU2NlbmVUcmFuc2Zvcm07XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgaWdub3JlVHJhbnNmb3JtKCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BJZ25vcmVUcmFuc2Zvcm07XG5cdH1cblxuXHRwdWJsaWMgc2V0IGlnbm9yZVRyYW5zZm9ybSh2YWx1ZTpib29sZWFuKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3BJZ25vcmVUcmFuc2Zvcm0gPT0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9wSWdub3JlVHJhbnNmb3JtID0gdmFsdWU7XG5cblx0XHRpZiAodmFsdWUpIHtcblx0XHRcdHRoaXMuX3BTY2VuZVRyYW5zZm9ybS5pZGVudGl0eSgpO1xuXHRcdFx0dGhpcy5fc2NlbmVQb3NpdGlvbi5zZXRUbygwLCAwLCAwKTtcblx0XHR9XG5cblx0XHR0aGlzLnBJbnZhbGlkYXRlU2NlbmVUcmFuc2Zvcm0oKTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBpc0VudGl0eSgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcElzRW50aXR5O1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgYSBMb2FkZXJJbmZvIG9iamVjdCBjb250YWluaW5nIGluZm9ybWF0aW9uIGFib3V0IGxvYWRpbmcgdGhlIGZpbGVcblx0ICogdG8gd2hpY2ggdGhpcyBkaXNwbGF5IG9iamVjdCBiZWxvbmdzLiBUaGUgPGNvZGU+bG9hZGVySW5mbzwvY29kZT4gcHJvcGVydHlcblx0ICogaXMgZGVmaW5lZCBvbmx5IGZvciB0aGUgcm9vdCBkaXNwbGF5IG9iamVjdCBvZiBhIFNXRiBmaWxlIG9yIGZvciBhIGxvYWRlZFxuXHQgKiBCaXRtYXAobm90IGZvciBhIEJpdG1hcCB0aGF0IGlzIGRyYXduIHdpdGggQWN0aW9uU2NyaXB0KS4gVG8gZmluZCB0aGVcblx0ICogPGNvZGU+bG9hZGVySW5mbzwvY29kZT4gb2JqZWN0IGFzc29jaWF0ZWQgd2l0aCB0aGUgU1dGIGZpbGUgdGhhdCBjb250YWluc1xuXHQgKiBhIGRpc3BsYXkgb2JqZWN0IG5hbWVkIDxjb2RlPm15RGlzcGxheU9iamVjdDwvY29kZT4sIHVzZVxuXHQgKiA8Y29kZT5teURpc3BsYXlPYmplY3Qucm9vdC5sb2FkZXJJbmZvPC9jb2RlPi5cblx0ICpcblx0ICogPHA+QSBsYXJnZSBTV0YgZmlsZSBjYW4gbW9uaXRvciBpdHMgZG93bmxvYWQgYnkgY2FsbGluZ1xuXHQgKiA8Y29kZT50aGlzLnJvb3QubG9hZGVySW5mby5hZGRFdmVudExpc3RlbmVyKEV2ZW50LkNPTVBMRVRFLFxuXHQgKiBmdW5jKTwvY29kZT4uPC9wPlxuXHQgKi9cblx0cHVibGljIGdldCBsb2FkZXJJbmZvKCk6TG9hZGVySW5mb1xuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2xvYWRlckluZm87XG5cdH1cblxuXHQvKipcblx0ICogVGhlIGNhbGxpbmcgZGlzcGxheSBvYmplY3QgaXMgbWFza2VkIGJ5IHRoZSBzcGVjaWZpZWQgPGNvZGU+bWFzazwvY29kZT5cblx0ICogb2JqZWN0LiBUbyBlbnN1cmUgdGhhdCBtYXNraW5nIHdvcmtzIHdoZW4gdGhlIFN0YWdlIGlzIHNjYWxlZCwgdGhlXG5cdCAqIDxjb2RlPm1hc2s8L2NvZGU+IGRpc3BsYXkgb2JqZWN0IG11c3QgYmUgaW4gYW4gYWN0aXZlIHBhcnQgb2YgdGhlIGRpc3BsYXlcblx0ICogbGlzdC4gVGhlIDxjb2RlPm1hc2s8L2NvZGU+IG9iamVjdCBpdHNlbGYgaXMgbm90IGRyYXduLiBTZXRcblx0ICogPGNvZGU+bWFzazwvY29kZT4gdG8gPGNvZGU+bnVsbDwvY29kZT4gdG8gcmVtb3ZlIHRoZSBtYXNrLlxuXHQgKlxuXHQgKiA8cD5UbyBiZSBhYmxlIHRvIHNjYWxlIGEgbWFzayBvYmplY3QsIGl0IG11c3QgYmUgb24gdGhlIGRpc3BsYXkgbGlzdC4gVG9cblx0ICogYmUgYWJsZSB0byBkcmFnIGEgbWFzayBTcHJpdGUgb2JqZWN0KGJ5IGNhbGxpbmcgaXRzXG5cdCAqIDxjb2RlPnN0YXJ0RHJhZygpPC9jb2RlPiBtZXRob2QpLCBpdCBtdXN0IGJlIG9uIHRoZSBkaXNwbGF5IGxpc3QuIFRvIGNhbGxcblx0ICogdGhlIDxjb2RlPnN0YXJ0RHJhZygpPC9jb2RlPiBtZXRob2QgZm9yIGEgbWFzayBzcHJpdGUgYmFzZWQgb24gYVxuXHQgKiA8Y29kZT5tb3VzZURvd248L2NvZGU+IGV2ZW50IGJlaW5nIGRpc3BhdGNoZWQgYnkgdGhlIHNwcml0ZSwgc2V0IHRoZVxuXHQgKiBzcHJpdGUncyA8Y29kZT5idXR0b25Nb2RlPC9jb2RlPiBwcm9wZXJ0eSB0byA8Y29kZT50cnVlPC9jb2RlPi48L3A+XG5cdCAqXG5cdCAqIDxwPldoZW4gZGlzcGxheSBvYmplY3RzIGFyZSBjYWNoZWQgYnkgc2V0dGluZyB0aGVcblx0ICogPGNvZGU+Y2FjaGVBc0JpdG1hcDwvY29kZT4gcHJvcGVydHkgdG8gPGNvZGU+dHJ1ZTwvY29kZT4gYW4gdGhlXG5cdCAqIDxjb2RlPmNhY2hlQXNCaXRtYXBNYXRyaXg8L2NvZGU+IHByb3BlcnR5IHRvIGEgTWF0cml4IG9iamVjdCwgYm90aCB0aGVcblx0ICogbWFzayBhbmQgdGhlIGRpc3BsYXkgb2JqZWN0IGJlaW5nIG1hc2tlZCBtdXN0IGJlIHBhcnQgb2YgdGhlIHNhbWUgY2FjaGVkXG5cdCAqIGJpdG1hcC4gVGh1cywgaWYgdGhlIGRpc3BsYXkgb2JqZWN0IGlzIGNhY2hlZCwgdGhlbiB0aGUgbWFzayBtdXN0IGJlIGFcblx0ICogY2hpbGQgb2YgdGhlIGRpc3BsYXkgb2JqZWN0LiBJZiBhbiBhbmNlc3RvciBvZiB0aGUgZGlzcGxheSBvYmplY3Qgb24gdGhlXG5cdCAqIGRpc3BsYXkgbGlzdCBpcyBjYWNoZWQsIHRoZW4gdGhlIG1hc2sgbXVzdCBiZSBhIGNoaWxkIG9mIHRoYXQgYW5jZXN0b3Igb3Jcblx0ICogb25lIG9mIGl0cyBkZXNjZW5kZW50cy4gSWYgbW9yZSB0aGFuIG9uZSBhbmNlc3RvciBvZiB0aGUgbWFza2VkIG9iamVjdCBpc1xuXHQgKiBjYWNoZWQsIHRoZW4gdGhlIG1hc2sgbXVzdCBiZSBhIGRlc2NlbmRlbnQgb2YgdGhlIGNhY2hlZCBjb250YWluZXIgY2xvc2VzdFxuXHQgKiB0byB0aGUgbWFza2VkIG9iamVjdCBpbiB0aGUgZGlzcGxheSBsaXN0LjwvcD5cblx0ICpcblx0ICogPHA+PGI+Tm90ZTo8L2I+IEEgc2luZ2xlIDxjb2RlPm1hc2s8L2NvZGU+IG9iamVjdCBjYW5ub3QgYmUgdXNlZCB0byBtYXNrXG5cdCAqIG1vcmUgdGhhbiBvbmUgY2FsbGluZyBkaXNwbGF5IG9iamVjdC4gV2hlbiB0aGUgPGNvZGU+bWFzazwvY29kZT4gaXNcblx0ICogYXNzaWduZWQgdG8gYSBzZWNvbmQgZGlzcGxheSBvYmplY3QsIGl0IGlzIHJlbW92ZWQgYXMgdGhlIG1hc2sgb2YgdGhlXG5cdCAqIGZpcnN0IG9iamVjdCwgYW5kIHRoYXQgb2JqZWN0J3MgPGNvZGU+bWFzazwvY29kZT4gcHJvcGVydHkgYmVjb21lc1xuXHQgKiA8Y29kZT5udWxsPC9jb2RlPi48L3A+XG5cdCAqL1xuXHRwdWJsaWMgbWFzazpEaXNwbGF5T2JqZWN0O1xuXG5cdC8qKlxuXHQgKiBTcGVjaWZpZXMgd2hldGhlciB0aGlzIG9iamVjdCByZWNlaXZlcyBtb3VzZSwgb3Igb3RoZXIgdXNlciBpbnB1dCxcblx0ICogbWVzc2FnZXMuIFRoZSBkZWZhdWx0IHZhbHVlIGlzIDxjb2RlPnRydWU8L2NvZGU+LCB3aGljaCBtZWFucyB0aGF0IGJ5XG5cdCAqIGRlZmF1bHQgYW55IEludGVyYWN0aXZlT2JqZWN0IGluc3RhbmNlIHRoYXQgaXMgb24gdGhlIGRpc3BsYXkgbGlzdFxuXHQgKiByZWNlaXZlcyBtb3VzZSBldmVudHMgb3Igb3RoZXIgdXNlciBpbnB1dCBldmVudHMuIElmXG5cdCAqIDxjb2RlPm1vdXNlRW5hYmxlZDwvY29kZT4gaXMgc2V0IHRvIDxjb2RlPmZhbHNlPC9jb2RlPiwgdGhlIGluc3RhbmNlIGRvZXNcblx0ICogbm90IHJlY2VpdmUgYW55IG1vdXNlIGV2ZW50cyhvciBvdGhlciB1c2VyIGlucHV0IGV2ZW50cyBsaWtlIGtleWJvYXJkXG5cdCAqIGV2ZW50cykuIEFueSBjaGlsZHJlbiBvZiB0aGlzIGluc3RhbmNlIG9uIHRoZSBkaXNwbGF5IGxpc3QgYXJlIG5vdFxuXHQgKiBhZmZlY3RlZC4gVG8gY2hhbmdlIHRoZSA8Y29kZT5tb3VzZUVuYWJsZWQ8L2NvZGU+IGJlaGF2aW9yIGZvciBhbGxcblx0ICogY2hpbGRyZW4gb2YgYW4gb2JqZWN0IG9uIHRoZSBkaXNwbGF5IGxpc3QsIHVzZVxuXHQgKiA8Y29kZT5mbGFzaC5kaXNwbGF5LkRpc3BsYXlPYmplY3RDb250YWluZXIubW91c2VDaGlsZHJlbjwvY29kZT4uXG5cdCAqXG5cdCAqIDxwPiBObyBldmVudCBpcyBkaXNwYXRjaGVkIGJ5IHNldHRpbmcgdGhpcyBwcm9wZXJ0eS4gWW91IG11c3QgdXNlIHRoZVxuXHQgKiA8Y29kZT5hZGRFdmVudExpc3RlbmVyKCk8L2NvZGU+IG1ldGhvZCB0byBjcmVhdGUgaW50ZXJhY3RpdmVcblx0ICogZnVuY3Rpb25hbGl0eS48L3A+XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IG1vdXNlRW5hYmxlZCgpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9leHBsaWNpdE1vdXNlRW5hYmxlZDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgbW91c2VFbmFibGVkKHZhbHVlOmJvb2xlYW4pXG5cdHtcblx0XHRpZiAodGhpcy5fZXhwbGljaXRNb3VzZUVuYWJsZWQgPT0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9leHBsaWNpdE1vdXNlRW5hYmxlZCA9IHZhbHVlO1xuXG5cdFx0dGhpcy5fcFVwZGF0ZUltcGxpY2l0TW91c2VFbmFibGVkKHRoaXMuX3BQYXJlbnQ/IHRoaXMuX3BQYXJlbnQubW91c2VDaGlsZHJlbiA6IHRydWUpO1xuXHR9XG5cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHRoZSB4IGNvb3JkaW5hdGUgb2YgdGhlIG1vdXNlIG9yIHVzZXIgaW5wdXQgZGV2aWNlIHBvc2l0aW9uLCBpblxuXHQgKiBwaXhlbHMuXG5cdCAqXG5cdCAqIDxwPjxiPk5vdGU8L2I+OiBGb3IgYSBEaXNwbGF5T2JqZWN0IHRoYXQgaGFzIGJlZW4gcm90YXRlZCwgdGhlIHJldHVybmVkIHhcblx0ICogY29vcmRpbmF0ZSB3aWxsIHJlZmxlY3QgdGhlIG5vbi1yb3RhdGVkIG9iamVjdC48L3A+XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IG1vdXNlWCgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX21vdXNlWDtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgdGhlIHkgY29vcmRpbmF0ZSBvZiB0aGUgbW91c2Ugb3IgdXNlciBpbnB1dCBkZXZpY2UgcG9zaXRpb24sIGluXG5cdCAqIHBpeGVscy5cblx0ICpcblx0ICogPHA+PGI+Tm90ZTwvYj46IEZvciBhIERpc3BsYXlPYmplY3QgdGhhdCBoYXMgYmVlbiByb3RhdGVkLCB0aGUgcmV0dXJuZWQgeVxuXHQgKiBjb29yZGluYXRlIHdpbGwgcmVmbGVjdCB0aGUgbm9uLXJvdGF0ZWQgb2JqZWN0LjwvcD5cblx0ICovXG5cdHB1YmxpYyBnZXQgbW91c2VZKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fbW91c2VZO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB0aGUgaW5zdGFuY2UgbmFtZSBvZiB0aGUgRGlzcGxheU9iamVjdC4gVGhlIG9iamVjdCBjYW4gYmVcblx0ICogaWRlbnRpZmllZCBpbiB0aGUgY2hpbGQgbGlzdCBvZiBpdHMgcGFyZW50IGRpc3BsYXkgb2JqZWN0IGNvbnRhaW5lciBieVxuXHQgKiBjYWxsaW5nIHRoZSA8Y29kZT5nZXRDaGlsZEJ5TmFtZSgpPC9jb2RlPiBtZXRob2Qgb2YgdGhlIGRpc3BsYXkgb2JqZWN0XG5cdCAqIGNvbnRhaW5lci5cblx0ICpcblx0ICogQHRocm93cyBJbGxlZ2FsT3BlcmF0aW9uRXJyb3IgSWYgeW91IGFyZSBhdHRlbXB0aW5nIHRvIHNldCB0aGlzIHByb3BlcnR5XG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uIGFuIG9iamVjdCB0aGF0IHdhcyBwbGFjZWQgb24gdGhlIHRpbWVsaW5lXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluIHRoZSBGbGFzaCBhdXRob3JpbmcgdG9vbC5cblx0ICovXG5cdHB1YmxpYyBuYW1lOnN0cmluZztcblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBvcmllbnRhdGlvbk1vZGU6c3RyaW5nID0gT3JpZW50YXRpb25Nb2RlLkRFRkFVTFQ7XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB0aGUgRGlzcGxheU9iamVjdENvbnRhaW5lciBvYmplY3QgdGhhdCBjb250YWlucyB0aGlzIGRpc3BsYXlcblx0ICogb2JqZWN0LiBVc2UgdGhlIDxjb2RlPnBhcmVudDwvY29kZT4gcHJvcGVydHkgdG8gc3BlY2lmeSBhIHJlbGF0aXZlIHBhdGggdG9cblx0ICogZGlzcGxheSBvYmplY3RzIHRoYXQgYXJlIGFib3ZlIHRoZSBjdXJyZW50IGRpc3BsYXkgb2JqZWN0IGluIHRoZSBkaXNwbGF5XG5cdCAqIGxpc3QgaGllcmFyY2h5LlxuXHQgKlxuXHQgKiA8cD5Zb3UgY2FuIHVzZSA8Y29kZT5wYXJlbnQ8L2NvZGU+IHRvIG1vdmUgdXAgbXVsdGlwbGUgbGV2ZWxzIGluIHRoZVxuXHQgKiBkaXNwbGF5IGxpc3QgYXMgaW4gdGhlIGZvbGxvd2luZzo8L3A+XG5cdCAqXG5cdCAqIEB0aHJvd3MgU2VjdXJpdHlFcnJvciBUaGUgcGFyZW50IGRpc3BsYXkgb2JqZWN0IGJlbG9uZ3MgdG8gYSBzZWN1cml0eVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgc2FuZGJveCB0byB3aGljaCB5b3UgZG8gbm90IGhhdmUgYWNjZXNzLiBZb3UgY2FuXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBhdm9pZCB0aGlzIHNpdHVhdGlvbiBieSBoYXZpbmcgdGhlIHBhcmVudCBtb3ZpZSBjYWxsXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICB0aGUgPGNvZGU+U2VjdXJpdHkuYWxsb3dEb21haW4oKTwvY29kZT4gbWV0aG9kLlxuXHQgKi9cblx0cHVibGljIGdldCBwYXJlbnQoKTpEaXNwbGF5T2JqZWN0Q29udGFpbmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcFBhcmVudDtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBwYXJ0aXRpb24oKTpQYXJ0aXRpb25cblx0e1xuXHRcdHJldHVybiB0aGlzLl9leHBsaWNpdFBhcnRpdGlvbjtcblx0fVxuXG5cdHB1YmxpYyBzZXQgcGFydGl0aW9uKHZhbHVlOlBhcnRpdGlvbilcblx0e1xuXHRcdGlmICh0aGlzLl9leHBsaWNpdFBhcnRpdGlvbiA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX2V4cGxpY2l0UGFydGl0aW9uID0gdmFsdWU7XG5cblx0XHR0aGlzLl9wVXBkYXRlSW1wbGljaXRQYXJ0aXRpb24odGhpcy5fcFBhcmVudD8gdGhpcy5fcFBhcmVudC5faUFzc2lnbmVkUGFydGl0aW9uIDogbnVsbCwgdGhpcy5fcFNjZW5lKTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBwaWNraW5nQ29sbGlkZXIoKTpJUGlja2luZ0NvbGxpZGVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcFBpY2tpbmdDb2xsaWRlcjtcblx0fVxuXG5cdHB1YmxpYyBzZXQgcGlja2luZ0NvbGxpZGVyKHZhbHVlOklQaWNraW5nQ29sbGlkZXIpXG5cdHtcblx0XHR0aGlzLl9wUGlja2luZ0NvbGxpZGVyID0gdmFsdWU7XG5cdH1cblxuXHQvKipcblx0ICogRGVmaW5lcyB0aGUgbG9jYWwgcG9pbnQgYXJvdW5kIHdoaWNoIHRoZSBvYmplY3Qgcm90YXRlcy5cblx0ICovXG5cdHB1YmxpYyBnZXQgcGl2b3QoKTpWZWN0b3IzRFxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3Bpdm90O1xuXHR9XG5cblxuXHRwdWJsaWMgc2V0IHBpdm90KHBpdm90OlZlY3RvcjNEKVxuXHR7XG5cdFx0dGhpcy5fcGl2b3QgPSBwaXZvdC5jbG9uZSgpO1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlUGl2b3QoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBGb3IgYSBkaXNwbGF5IG9iamVjdCBpbiBhIGxvYWRlZCBTV0YgZmlsZSwgdGhlIDxjb2RlPnJvb3Q8L2NvZGU+IHByb3BlcnR5XG5cdCAqIGlzIHRoZSB0b3AtbW9zdCBkaXNwbGF5IG9iamVjdCBpbiB0aGUgcG9ydGlvbiBvZiB0aGUgZGlzcGxheSBsaXN0J3MgdHJlZVxuXHQgKiBzdHJ1Y3R1cmUgcmVwcmVzZW50ZWQgYnkgdGhhdCBTV0YgZmlsZS4gRm9yIGEgQml0bWFwIG9iamVjdCByZXByZXNlbnRpbmcgYVxuXHQgKiBsb2FkZWQgaW1hZ2UgZmlsZSwgdGhlIDxjb2RlPnJvb3Q8L2NvZGU+IHByb3BlcnR5IGlzIHRoZSBCaXRtYXAgb2JqZWN0XG5cdCAqIGl0c2VsZi4gRm9yIHRoZSBpbnN0YW5jZSBvZiB0aGUgbWFpbiBjbGFzcyBvZiB0aGUgZmlyc3QgU1dGIGZpbGUgbG9hZGVkLFxuXHQgKiB0aGUgPGNvZGU+cm9vdDwvY29kZT4gcHJvcGVydHkgaXMgdGhlIGRpc3BsYXkgb2JqZWN0IGl0c2VsZi4gVGhlXG5cdCAqIDxjb2RlPnJvb3Q8L2NvZGU+IHByb3BlcnR5IG9mIHRoZSBTY2VuZSBvYmplY3QgaXMgdGhlIFNjZW5lIG9iamVjdCBpdHNlbGYuXG5cdCAqIFRoZSA8Y29kZT5yb290PC9jb2RlPiBwcm9wZXJ0eSBpcyBzZXQgdG8gPGNvZGU+bnVsbDwvY29kZT4gZm9yIGFueSBkaXNwbGF5XG5cdCAqIG9iamVjdCB0aGF0IGhhcyBub3QgYmVlbiBhZGRlZCB0byB0aGUgZGlzcGxheSBsaXN0LCB1bmxlc3MgaXQgaGFzIGJlZW5cblx0ICogYWRkZWQgdG8gYSBkaXNwbGF5IG9iamVjdCBjb250YWluZXIgdGhhdCBpcyBvZmYgdGhlIGRpc3BsYXkgbGlzdCBidXQgdGhhdFxuXHQgKiBpcyBhIGNoaWxkIG9mIHRoZSB0b3AtbW9zdCBkaXNwbGF5IG9iamVjdCBpbiBhIGxvYWRlZCBTV0YgZmlsZS5cblx0ICpcblx0ICogPHA+Rm9yIGV4YW1wbGUsIGlmIHlvdSBjcmVhdGUgYSBuZXcgU3ByaXRlIG9iamVjdCBieSBjYWxsaW5nIHRoZVxuXHQgKiA8Y29kZT5TcHJpdGUoKTwvY29kZT4gY29uc3RydWN0b3IgbWV0aG9kLCBpdHMgPGNvZGU+cm9vdDwvY29kZT4gcHJvcGVydHlcblx0ICogaXMgPGNvZGU+bnVsbDwvY29kZT4gdW50aWwgeW91IGFkZCBpdCB0byB0aGUgZGlzcGxheSBsaXN0KG9yIHRvIGEgZGlzcGxheVxuXHQgKiBvYmplY3QgY29udGFpbmVyIHRoYXQgaXMgb2ZmIHRoZSBkaXNwbGF5IGxpc3QgYnV0IHRoYXQgaXMgYSBjaGlsZCBvZiB0aGVcblx0ICogdG9wLW1vc3QgZGlzcGxheSBvYmplY3QgaW4gYSBTV0YgZmlsZSkuPC9wPlxuXHQgKlxuXHQgKiA8cD5Gb3IgYSBsb2FkZWQgU1dGIGZpbGUsIGV2ZW4gdGhvdWdoIHRoZSBMb2FkZXIgb2JqZWN0IHVzZWQgdG8gbG9hZCB0aGVcblx0ICogZmlsZSBtYXkgbm90IGJlIG9uIHRoZSBkaXNwbGF5IGxpc3QsIHRoZSB0b3AtbW9zdCBkaXNwbGF5IG9iamVjdCBpbiB0aGVcblx0ICogU1dGIGZpbGUgaGFzIGl0cyA8Y29kZT5yb290PC9jb2RlPiBwcm9wZXJ0eSBzZXQgdG8gaXRzZWxmLiBUaGUgTG9hZGVyXG5cdCAqIG9iamVjdCBkb2VzIG5vdCBoYXZlIGl0cyA8Y29kZT5yb290PC9jb2RlPiBwcm9wZXJ0eSBzZXQgdW50aWwgaXQgaXMgYWRkZWRcblx0ICogYXMgYSBjaGlsZCBvZiBhIGRpc3BsYXkgb2JqZWN0IGZvciB3aGljaCB0aGUgPGNvZGU+cm9vdDwvY29kZT4gcHJvcGVydHkgaXNcblx0ICogc2V0LjwvcD5cblx0ICovXG5cdHB1YmxpYyBnZXQgcm9vdCgpOkRpc3BsYXlPYmplY3RDb250YWluZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9yb290O1xuXHR9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB0aGUgcm90YXRpb24gb2YgdGhlIERpc3BsYXlPYmplY3QgaW5zdGFuY2UsIGluIGRlZ3JlZXMsIGZyb20gaXRzXG5cdCAqIG9yaWdpbmFsIG9yaWVudGF0aW9uLiBWYWx1ZXMgZnJvbSAwIHRvIDE4MCByZXByZXNlbnQgY2xvY2t3aXNlIHJvdGF0aW9uO1xuXHQgKiB2YWx1ZXMgZnJvbSAwIHRvIC0xODAgcmVwcmVzZW50IGNvdW50ZXJjbG9ja3dpc2Ugcm90YXRpb24uIFZhbHVlcyBvdXRzaWRlXG5cdCAqIHRoaXMgcmFuZ2UgYXJlIGFkZGVkIHRvIG9yIHN1YnRyYWN0ZWQgZnJvbSAzNjAgdG8gb2J0YWluIGEgdmFsdWUgd2l0aGluXG5cdCAqIHRoZSByYW5nZS4gRm9yIGV4YW1wbGUsIHRoZSBzdGF0ZW1lbnQgPGNvZGU+bXlfdmlkZW8ucm90YXRpb24gPSA0NTA8L2NvZGU+XG5cdCAqIGlzIHRoZSBzYW1lIGFzIDxjb2RlPiBteV92aWRlby5yb3RhdGlvbiA9IDkwPC9jb2RlPi5cblx0ICovXG5cdHB1YmxpYyByb3RhdGlvbjpudW1iZXI7IC8vVE9ET1xuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgdGhlIHgtYXhpcyByb3RhdGlvbiBvZiB0aGUgRGlzcGxheU9iamVjdCBpbnN0YW5jZSwgaW4gZGVncmVlcyxcblx0ICogZnJvbSBpdHMgb3JpZ2luYWwgb3JpZW50YXRpb24gcmVsYXRpdmUgdG8gdGhlIDNEIHBhcmVudCBjb250YWluZXIuIFZhbHVlc1xuXHQgKiBmcm9tIDAgdG8gMTgwIHJlcHJlc2VudCBjbG9ja3dpc2Ugcm90YXRpb247IHZhbHVlcyBmcm9tIDAgdG8gLTE4MFxuXHQgKiByZXByZXNlbnQgY291bnRlcmNsb2Nrd2lzZSByb3RhdGlvbi4gVmFsdWVzIG91dHNpZGUgdGhpcyByYW5nZSBhcmUgYWRkZWRcblx0ICogdG8gb3Igc3VidHJhY3RlZCBmcm9tIDM2MCB0byBvYnRhaW4gYSB2YWx1ZSB3aXRoaW4gdGhlIHJhbmdlLlxuXHQgKi9cblx0cHVibGljIGdldCByb3RhdGlvblgoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9yb3RhdGlvblgqTWF0aENvbnN0cy5SQURJQU5TX1RPX0RFR1JFRVM7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHJvdGF0aW9uWCh2YWw6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHRoaXMucm90YXRpb25YID09IHZhbClcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3JvdGF0aW9uWCA9IHZhbCpNYXRoQ29uc3RzLkRFR1JFRVNfVE9fUkFESUFOUztcblxuXHRcdHRoaXMuaW52YWxpZGF0ZVJvdGF0aW9uKCk7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHRoZSB5LWF4aXMgcm90YXRpb24gb2YgdGhlIERpc3BsYXlPYmplY3QgaW5zdGFuY2UsIGluIGRlZ3JlZXMsXG5cdCAqIGZyb20gaXRzIG9yaWdpbmFsIG9yaWVudGF0aW9uIHJlbGF0aXZlIHRvIHRoZSAzRCBwYXJlbnQgY29udGFpbmVyLiBWYWx1ZXNcblx0ICogZnJvbSAwIHRvIDE4MCByZXByZXNlbnQgY2xvY2t3aXNlIHJvdGF0aW9uOyB2YWx1ZXMgZnJvbSAwIHRvIC0xODBcblx0ICogcmVwcmVzZW50IGNvdW50ZXJjbG9ja3dpc2Ugcm90YXRpb24uIFZhbHVlcyBvdXRzaWRlIHRoaXMgcmFuZ2UgYXJlIGFkZGVkXG5cdCAqIHRvIG9yIHN1YnRyYWN0ZWQgZnJvbSAzNjAgdG8gb2J0YWluIGEgdmFsdWUgd2l0aGluIHRoZSByYW5nZS5cblx0ICovXG5cdHB1YmxpYyBnZXQgcm90YXRpb25ZKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcm90YXRpb25ZKk1hdGhDb25zdHMuUkFESUFOU19UT19ERUdSRUVTO1xuXHR9XG5cblx0cHVibGljIHNldCByb3RhdGlvblkodmFsOm51bWJlcilcblx0e1xuXHRcdGlmICh0aGlzLnJvdGF0aW9uWSA9PSB2YWwpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9yb3RhdGlvblkgPSB2YWwqTWF0aENvbnN0cy5ERUdSRUVTX1RPX1JBRElBTlM7XG5cblx0XHR0aGlzLmludmFsaWRhdGVSb3RhdGlvbigpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB0aGUgei1heGlzIHJvdGF0aW9uIG9mIHRoZSBEaXNwbGF5T2JqZWN0IGluc3RhbmNlLCBpbiBkZWdyZWVzLFxuXHQgKiBmcm9tIGl0cyBvcmlnaW5hbCBvcmllbnRhdGlvbiByZWxhdGl2ZSB0byB0aGUgM0QgcGFyZW50IGNvbnRhaW5lci4gVmFsdWVzXG5cdCAqIGZyb20gMCB0byAxODAgcmVwcmVzZW50IGNsb2Nrd2lzZSByb3RhdGlvbjsgdmFsdWVzIGZyb20gMCB0byAtMTgwXG5cdCAqIHJlcHJlc2VudCBjb3VudGVyY2xvY2t3aXNlIHJvdGF0aW9uLiBWYWx1ZXMgb3V0c2lkZSB0aGlzIHJhbmdlIGFyZSBhZGRlZFxuXHQgKiB0byBvciBzdWJ0cmFjdGVkIGZyb20gMzYwIHRvIG9idGFpbiBhIHZhbHVlIHdpdGhpbiB0aGUgcmFuZ2UuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHJvdGF0aW9uWigpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3JvdGF0aW9uWipNYXRoQ29uc3RzLlJBRElBTlNfVE9fREVHUkVFUztcblx0fVxuXG5cdHB1YmxpYyBzZXQgcm90YXRpb25aKHZhbDpudW1iZXIpXG5cdHtcblx0XHRpZiAodGhpcy5yb3RhdGlvblogPT0gdmFsKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fcm90YXRpb25aID0gdmFsKk1hdGhDb25zdHMuREVHUkVFU19UT19SQURJQU5TO1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlUm90YXRpb24oKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgY3VycmVudCBzY2FsaW5nIGdyaWQgdGhhdCBpcyBpbiBlZmZlY3QuIElmIHNldCB0byA8Y29kZT5udWxsPC9jb2RlPixcblx0ICogdGhlIGVudGlyZSBkaXNwbGF5IG9iamVjdCBpcyBzY2FsZWQgbm9ybWFsbHkgd2hlbiBhbnkgc2NhbGUgdHJhbnNmb3JtYXRpb25cblx0ICogaXMgYXBwbGllZC5cblx0ICpcblx0ICogPHA+V2hlbiB5b3UgZGVmaW5lIHRoZSA8Y29kZT5zY2FsZTlHcmlkPC9jb2RlPiBwcm9wZXJ0eSwgdGhlIGRpc3BsYXlcblx0ICogb2JqZWN0IGlzIGRpdmlkZWQgaW50byBhIGdyaWQgd2l0aCBuaW5lIHJlZ2lvbnMgYmFzZWQgb24gdGhlXG5cdCAqIDxjb2RlPnNjYWxlOUdyaWQ8L2NvZGU+IHJlY3RhbmdsZSwgd2hpY2ggZGVmaW5lcyB0aGUgY2VudGVyIHJlZ2lvbiBvZiB0aGVcblx0ICogZ3JpZC4gVGhlIGVpZ2h0IG90aGVyIHJlZ2lvbnMgb2YgdGhlIGdyaWQgYXJlIHRoZSBmb2xsb3dpbmcgYXJlYXM6IDwvcD5cblx0ICpcblx0ICogPHVsPlxuXHQgKiAgIDxsaT5UaGUgdXBwZXItbGVmdCBjb3JuZXIgb3V0c2lkZSBvZiB0aGUgcmVjdGFuZ2xlPC9saT5cblx0ICogICA8bGk+VGhlIGFyZWEgYWJvdmUgdGhlIHJlY3RhbmdsZSA8L2xpPlxuXHQgKiAgIDxsaT5UaGUgdXBwZXItcmlnaHQgY29ybmVyIG91dHNpZGUgb2YgdGhlIHJlY3RhbmdsZTwvbGk+XG5cdCAqICAgPGxpPlRoZSBhcmVhIHRvIHRoZSBsZWZ0IG9mIHRoZSByZWN0YW5nbGU8L2xpPlxuXHQgKiAgIDxsaT5UaGUgYXJlYSB0byB0aGUgcmlnaHQgb2YgdGhlIHJlY3RhbmdsZTwvbGk+XG5cdCAqICAgPGxpPlRoZSBsb3dlci1sZWZ0IGNvcm5lciBvdXRzaWRlIG9mIHRoZSByZWN0YW5nbGU8L2xpPlxuXHQgKiAgIDxsaT5UaGUgYXJlYSBiZWxvdyB0aGUgcmVjdGFuZ2xlPC9saT5cblx0ICogICA8bGk+VGhlIGxvd2VyLXJpZ2h0IGNvcm5lciBvdXRzaWRlIG9mIHRoZSByZWN0YW5nbGU8L2xpPlxuXHQgKiA8L3VsPlxuXHQgKlxuXHQgKiA8cD5Zb3UgY2FuIHRoaW5rIG9mIHRoZSBlaWdodCByZWdpb25zIG91dHNpZGUgb2YgdGhlIGNlbnRlcihkZWZpbmVkIGJ5XG5cdCAqIHRoZSByZWN0YW5nbGUpIGFzIGJlaW5nIGxpa2UgYSBwaWN0dXJlIGZyYW1lIHRoYXQgaGFzIHNwZWNpYWwgcnVsZXNcblx0ICogYXBwbGllZCB0byBpdCB3aGVuIHNjYWxlZC48L3A+XG5cdCAqXG5cdCAqIDxwPldoZW4gdGhlIDxjb2RlPnNjYWxlOUdyaWQ8L2NvZGU+IHByb3BlcnR5IGlzIHNldCBhbmQgYSBkaXNwbGF5IG9iamVjdFxuXHQgKiBpcyBzY2FsZWQsIGFsbCB0ZXh0IGFuZCBncmFkaWVudHMgYXJlIHNjYWxlZCBub3JtYWxseTsgaG93ZXZlciwgZm9yIG90aGVyXG5cdCAqIHR5cGVzIG9mIG9iamVjdHMgdGhlIGZvbGxvd2luZyBydWxlcyBhcHBseTo8L3A+XG5cdCAqXG5cdCAqIDx1bD5cblx0ICogICA8bGk+Q29udGVudCBpbiB0aGUgY2VudGVyIHJlZ2lvbiBpcyBzY2FsZWQgbm9ybWFsbHkuIDwvbGk+XG5cdCAqICAgPGxpPkNvbnRlbnQgaW4gdGhlIGNvcm5lcnMgaXMgbm90IHNjYWxlZC4gPC9saT5cblx0ICogICA8bGk+Q29udGVudCBpbiB0aGUgdG9wIGFuZCBib3R0b20gcmVnaW9ucyBpcyBzY2FsZWQgaG9yaXpvbnRhbGx5IG9ubHkuXG5cdCAqIENvbnRlbnQgaW4gdGhlIGxlZnQgYW5kIHJpZ2h0IHJlZ2lvbnMgaXMgc2NhbGVkIHZlcnRpY2FsbHkgb25seS48L2xpPlxuXHQgKiAgIDxsaT5BbGwgZmlsbHMoaW5jbHVkaW5nIGJpdG1hcHMsIHZpZGVvLCBhbmQgZ3JhZGllbnRzKSBhcmUgc3RyZXRjaGVkIHRvXG5cdCAqIGZpdCB0aGVpciBzaGFwZXMuPC9saT5cblx0ICogPC91bD5cblx0ICpcblx0ICogPHA+SWYgYSBkaXNwbGF5IG9iamVjdCBpcyByb3RhdGVkLCBhbGwgc3Vic2VxdWVudCBzY2FsaW5nIGlzIG5vcm1hbChhbmRcblx0ICogdGhlIDxjb2RlPnNjYWxlOUdyaWQ8L2NvZGU+IHByb3BlcnR5IGlzIGlnbm9yZWQpLjwvcD5cblx0ICpcblx0ICogPHA+Rm9yIGV4YW1wbGUsIGNvbnNpZGVyIHRoZSBmb2xsb3dpbmcgZGlzcGxheSBvYmplY3QgYW5kIGEgcmVjdGFuZ2xlIHRoYXRcblx0ICogaXMgYXBwbGllZCBhcyB0aGUgZGlzcGxheSBvYmplY3QncyA8Y29kZT5zY2FsZTlHcmlkPC9jb2RlPjo8L3A+XG5cdCAqXG5cdCAqIDxwPkEgY29tbW9uIHVzZSBmb3Igc2V0dGluZyA8Y29kZT5zY2FsZTlHcmlkPC9jb2RlPiBpcyB0byBzZXQgdXAgYSBkaXNwbGF5XG5cdCAqIG9iamVjdCB0byBiZSB1c2VkIGFzIGEgY29tcG9uZW50LCBpbiB3aGljaCBlZGdlIHJlZ2lvbnMgcmV0YWluIHRoZSBzYW1lXG5cdCAqIHdpZHRoIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBzY2FsZWQuPC9wPlxuXHQgKlxuXHQgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgSWYgeW91IHBhc3MgYW4gaW52YWxpZCBhcmd1bWVudCB0byB0aGUgbWV0aG9kLlxuXHQgKi9cblx0cHVibGljIHNjYWxlOUdyaWQ6UmVjdGFuZ2xlO1xuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgdGhlIGhvcml6b250YWwgc2NhbGUocGVyY2VudGFnZSkgb2YgdGhlIG9iamVjdCBhcyBhcHBsaWVkIGZyb21cblx0ICogdGhlIHJlZ2lzdHJhdGlvbiBwb2ludC4gVGhlIGRlZmF1bHQgcmVnaXN0cmF0aW9uIHBvaW50IGlzKDAsMCkuIDEuMFxuXHQgKiBlcXVhbHMgMTAwJSBzY2FsZS5cblx0ICpcblx0ICogPHA+U2NhbGluZyB0aGUgbG9jYWwgY29vcmRpbmF0ZSBzeXN0ZW0gY2hhbmdlcyB0aGUgPGNvZGU+eDwvY29kZT4gYW5kXG5cdCAqIDxjb2RlPnk8L2NvZGU+IHByb3BlcnR5IHZhbHVlcywgd2hpY2ggYXJlIGRlZmluZWQgaW4gd2hvbGUgcGl4ZWxzLiA8L3A+XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHNjYWxlWCgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BTY2FsZVg7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHNjYWxlWCh2YWw6bnVtYmVyKVxuXHR7XG5cdFx0Ly9yZW1vdmUgYWJzb2x1dGUgd2lkdGhcblx0XHR0aGlzLl93aWR0aCA9IG51bGw7XG5cblx0XHRpZiAodGhpcy5fcFNjYWxlWCA9PSB2YWwpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9wU2NhbGVYID0gdmFsO1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlU2NhbGUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgdGhlIHZlcnRpY2FsIHNjYWxlKHBlcmNlbnRhZ2UpIG9mIGFuIG9iamVjdCBhcyBhcHBsaWVkIGZyb20gdGhlXG5cdCAqIHJlZ2lzdHJhdGlvbiBwb2ludCBvZiB0aGUgb2JqZWN0LiBUaGUgZGVmYXVsdCByZWdpc3RyYXRpb24gcG9pbnQgaXMoMCwwKS5cblx0ICogMS4wIGlzIDEwMCUgc2NhbGUuXG5cdCAqXG5cdCAqIDxwPlNjYWxpbmcgdGhlIGxvY2FsIGNvb3JkaW5hdGUgc3lzdGVtIGNoYW5nZXMgdGhlIDxjb2RlPng8L2NvZGU+IGFuZFxuXHQgKiA8Y29kZT55PC9jb2RlPiBwcm9wZXJ0eSB2YWx1ZXMsIHdoaWNoIGFyZSBkZWZpbmVkIGluIHdob2xlIHBpeGVscy4gPC9wPlxuXHQgKi9cblx0cHVibGljIGdldCBzY2FsZVkoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wU2NhbGVZO1xuXHR9XG5cblx0cHVibGljIHNldCBzY2FsZVkodmFsOm51bWJlcilcblx0e1xuXHRcdC8vcmVtb3ZlIGFic29sdXRlIGhlaWdodFxuXHRcdHRoaXMuX2hlaWdodCA9IG51bGw7XG5cblx0XHRpZiAodGhpcy5fcFNjYWxlWSA9PSB2YWwpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9wU2NhbGVZID0gdmFsO1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlU2NhbGUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgdGhlIGRlcHRoIHNjYWxlKHBlcmNlbnRhZ2UpIG9mIGFuIG9iamVjdCBhcyBhcHBsaWVkIGZyb20gdGhlXG5cdCAqIHJlZ2lzdHJhdGlvbiBwb2ludCBvZiB0aGUgb2JqZWN0LiBUaGUgZGVmYXVsdCByZWdpc3RyYXRpb24gcG9pbnQgaXMoMCwwKS5cblx0ICogMS4wIGlzIDEwMCUgc2NhbGUuXG5cdCAqXG5cdCAqIDxwPlNjYWxpbmcgdGhlIGxvY2FsIGNvb3JkaW5hdGUgc3lzdGVtIGNoYW5nZXMgdGhlIDxjb2RlPng8L2NvZGU+LFxuXHQgKiA8Y29kZT55PC9jb2RlPiBhbmQgPGNvZGU+ejwvY29kZT4gcHJvcGVydHkgdmFsdWVzLCB3aGljaCBhcmUgZGVmaW5lZCBpblxuXHQgKiB3aG9sZSBwaXhlbHMuIDwvcD5cblx0ICovXG5cdHB1YmxpYyBnZXQgc2NhbGVaKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcFNjYWxlWjtcblx0fVxuXG5cdHB1YmxpYyBzZXQgc2NhbGVaKHZhbDpudW1iZXIpXG5cdHtcblx0XHQvL3JlbW92ZSBhYnNvbHV0ZSBkZXB0aFxuXHRcdHRoaXMuX2RlcHRoID0gbnVsbDtcblxuXHRcdGlmICh0aGlzLl9wU2NhbGVaID09IHZhbClcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3BTY2FsZVogPSB2YWw7XG5cblx0XHR0aGlzLmludmFsaWRhdGVTY2FsZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHNjZW5lKCk6U2NlbmVcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wU2NlbmU7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgc2NlbmVQb3NpdGlvbigpOlZlY3RvcjNEXG5cdHtcblx0XHRpZiAodGhpcy5fc2NlbmVQb3NpdGlvbkRpcnR5KSB7XG5cdFx0XHRpZiAoIXRoaXMuX3Bpdm90WmVybyAmJiB0aGlzLmFsaWdubWVudE1vZGUgPT0gQWxpZ25tZW50TW9kZS5QSVZPVF9QT0lOVCkge1xuXHRcdFx0XHR0aGlzLl9zY2VuZVBvc2l0aW9uID0gdGhpcy5zY2VuZVRyYW5zZm9ybS50cmFuc2Zvcm1WZWN0b3IodGhpcy5fcGl2b3RTY2FsZSk7XG5cdFx0XHRcdC8vdGhpcy5fc2NlbmVQb3NpdGlvbi5kZWNyZW1lbnRCeShuZXcgVmVjdG9yM0QodGhpcy5fcGl2b3QueCp0aGlzLl9wU2NhbGVYLCB0aGlzLl9waXZvdC55KnRoaXMuX3BTY2FsZVksIHRoaXMuX3Bpdm90LnoqdGhpcy5fcFNjYWxlWikpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5zY2VuZVRyYW5zZm9ybS5jb3B5Q29sdW1uVG8oMywgdGhpcy5fc2NlbmVQb3NpdGlvbik7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuX3NjZW5lUG9zaXRpb25EaXJ0eSA9IGZhbHNlO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5fc2NlbmVQb3NpdGlvbjtcblx0fVxuXG5cdHB1YmxpYyBnZXQgc2NlbmVUcmFuc2Zvcm0oKTpNYXRyaXgzRFxuXHR7XG5cdFx0aWYgKHRoaXMuX3BTY2VuZVRyYW5zZm9ybURpcnR5KVxuXHRcdFx0dGhpcy5wVXBkYXRlU2NlbmVUcmFuc2Zvcm0oKTtcblxuXHRcdHJldHVybiB0aGlzLl9wU2NlbmVUcmFuc2Zvcm07XG5cdH1cblxuXHQvKipcblx0ICogVGhlIHNjcm9sbCByZWN0YW5nbGUgYm91bmRzIG9mIHRoZSBkaXNwbGF5IG9iamVjdC4gVGhlIGRpc3BsYXkgb2JqZWN0IGlzXG5cdCAqIGNyb3BwZWQgdG8gdGhlIHNpemUgZGVmaW5lZCBieSB0aGUgcmVjdGFuZ2xlLCBhbmQgaXQgc2Nyb2xscyB3aXRoaW4gdGhlXG5cdCAqIHJlY3RhbmdsZSB3aGVuIHlvdSBjaGFuZ2UgdGhlIDxjb2RlPng8L2NvZGU+IGFuZCA8Y29kZT55PC9jb2RlPiBwcm9wZXJ0aWVzXG5cdCAqIG9mIHRoZSA8Y29kZT5zY3JvbGxSZWN0PC9jb2RlPiBvYmplY3QuXG5cdCAqXG5cdCAqIDxwPlRoZSBwcm9wZXJ0aWVzIG9mIHRoZSA8Y29kZT5zY3JvbGxSZWN0PC9jb2RlPiBSZWN0YW5nbGUgb2JqZWN0IHVzZSB0aGVcblx0ICogZGlzcGxheSBvYmplY3QncyBjb29yZGluYXRlIHNwYWNlIGFuZCBhcmUgc2NhbGVkIGp1c3QgbGlrZSB0aGUgb3ZlcmFsbFxuXHQgKiBkaXNwbGF5IG9iamVjdC4gVGhlIGNvcm5lciBib3VuZHMgb2YgdGhlIGNyb3BwZWQgd2luZG93IG9uIHRoZSBzY3JvbGxpbmdcblx0ICogZGlzcGxheSBvYmplY3QgYXJlIHRoZSBvcmlnaW4gb2YgdGhlIGRpc3BsYXkgb2JqZWN0KDAsMCkgYW5kIHRoZSBwb2ludFxuXHQgKiBkZWZpbmVkIGJ5IHRoZSB3aWR0aCBhbmQgaGVpZ2h0IG9mIHRoZSByZWN0YW5nbGUuIFRoZXkgYXJlIG5vdCBjZW50ZXJlZFxuXHQgKiBhcm91bmQgdGhlIG9yaWdpbiwgYnV0IHVzZSB0aGUgb3JpZ2luIHRvIGRlZmluZSB0aGUgdXBwZXItbGVmdCBjb3JuZXIgb2Zcblx0ICogdGhlIGFyZWEuIEEgc2Nyb2xsZWQgZGlzcGxheSBvYmplY3QgYWx3YXlzIHNjcm9sbHMgaW4gd2hvbGUgcGl4ZWxcblx0ICogaW5jcmVtZW50cy4gPC9wPlxuXHQgKlxuXHQgKiA8cD5Zb3UgY2FuIHNjcm9sbCBhbiBvYmplY3QgbGVmdCBhbmQgcmlnaHQgYnkgc2V0dGluZyB0aGUgPGNvZGU+eDwvY29kZT5cblx0ICogcHJvcGVydHkgb2YgdGhlIDxjb2RlPnNjcm9sbFJlY3Q8L2NvZGU+IFJlY3RhbmdsZSBvYmplY3QuIFlvdSBjYW4gc2Nyb2xsXG5cdCAqIGFuIG9iamVjdCB1cCBhbmQgZG93biBieSBzZXR0aW5nIHRoZSA8Y29kZT55PC9jb2RlPiBwcm9wZXJ0eSBvZiB0aGVcblx0ICogPGNvZGU+c2Nyb2xsUmVjdDwvY29kZT4gUmVjdGFuZ2xlIG9iamVjdC4gSWYgdGhlIGRpc3BsYXkgb2JqZWN0IGlzIHJvdGF0ZWRcblx0ICogOTDCsCBhbmQgeW91IHNjcm9sbCBpdCBsZWZ0IGFuZCByaWdodCwgdGhlIGRpc3BsYXkgb2JqZWN0IGFjdHVhbGx5IHNjcm9sbHNcblx0ICogdXAgYW5kIGRvd24uPC9wPlxuXHQgKi9cblx0cHVibGljIHNjcm9sbFJlY3Q6UmVjdGFuZ2xlO1xuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBzaGFkZXJQaWNraW5nRGV0YWlscygpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9zaGFkZXJQaWNraW5nRGV0YWlscztcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBkZWJ1Z1Zpc2libGUoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fZGVidWdWaXNpYmxlO1xuXHR9XG5cblx0cHVibGljIHNldCBkZWJ1Z1Zpc2libGUodmFsdWU6Ym9vbGVhbilcblx0e1xuXHRcdGlmICh2YWx1ZSA9PSB0aGlzLl9kZWJ1Z1Zpc2libGUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9kZWJ1Z1Zpc2libGUgPSB2YWx1ZTtcblxuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fZW50aXR5Tm9kZXMubGVuZ3RoO1xuXHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IGxlbjsgaSsrKVxuXHRcdFx0dGhpcy5fZW50aXR5Tm9kZXNbaV0uZGVidWdWaXNpYmxlID0gdGhpcy5fZGVidWdWaXNpYmxlO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFuIG9iamVjdCB3aXRoIHByb3BlcnRpZXMgcGVydGFpbmluZyB0byBhIGRpc3BsYXkgb2JqZWN0J3MgbWF0cml4LCBjb2xvclxuXHQgKiB0cmFuc2Zvcm0sIGFuZCBwaXhlbCBib3VuZHMuIFRoZSBzcGVjaWZpYyBwcm9wZXJ0aWVzICAtICBtYXRyaXgsXG5cdCAqIGNvbG9yVHJhbnNmb3JtLCBhbmQgdGhyZWUgcmVhZC1vbmx5IHByb3BlcnRpZXNcblx0ICogKDxjb2RlPmNvbmNhdGVuYXRlZE1hdHJpeDwvY29kZT4sIDxjb2RlPmNvbmNhdGVuYXRlZENvbG9yVHJhbnNmb3JtPC9jb2RlPixcblx0ICogYW5kIDxjb2RlPnBpeGVsQm91bmRzPC9jb2RlPikgIC0gIGFyZSBkZXNjcmliZWQgaW4gdGhlIGVudHJ5IGZvciB0aGVcblx0ICogVHJhbnNmb3JtIGNsYXNzLlxuXHQgKlxuXHQgKiA8cD5FYWNoIG9mIHRoZSB0cmFuc2Zvcm0gb2JqZWN0J3MgcHJvcGVydGllcyBpcyBpdHNlbGYgYW4gb2JqZWN0LiBUaGlzXG5cdCAqIGNvbmNlcHQgaXMgaW1wb3J0YW50IGJlY2F1c2UgdGhlIG9ubHkgd2F5IHRvIHNldCBuZXcgdmFsdWVzIGZvciB0aGUgbWF0cml4XG5cdCAqIG9yIGNvbG9yVHJhbnNmb3JtIG9iamVjdHMgaXMgdG8gY3JlYXRlIGEgbmV3IG9iamVjdCBhbmQgY29weSB0aGF0IG9iamVjdFxuXHQgKiBpbnRvIHRoZSB0cmFuc2Zvcm0ubWF0cml4IG9yIHRyYW5zZm9ybS5jb2xvclRyYW5zZm9ybSBwcm9wZXJ0eS48L3A+XG5cdCAqXG5cdCAqIDxwPkZvciBleGFtcGxlLCB0byBpbmNyZWFzZSB0aGUgPGNvZGU+dHg8L2NvZGU+IHZhbHVlIG9mIGEgZGlzcGxheVxuXHQgKiBvYmplY3QncyBtYXRyaXgsIHlvdSBtdXN0IG1ha2UgYSBjb3B5IG9mIHRoZSBlbnRpcmUgbWF0cml4IG9iamVjdCwgdGhlblxuXHQgKiBjb3B5IHRoZSBuZXcgb2JqZWN0IGludG8gdGhlIG1hdHJpeCBwcm9wZXJ0eSBvZiB0aGUgdHJhbnNmb3JtIG9iamVjdDo8L3A+XG5cdCAqIDxwcmUgeG1sOnNwYWNlPVwicHJlc2VydmVcIj48Y29kZT4gcHVibGljIG15TWF0cml4Ok1hdHJpeCA9XG5cdCAqIG15RGlzcGxheU9iamVjdC50cmFuc2Zvcm0ubWF0cml4OyBteU1hdHJpeC50eCArPSAxMDtcblx0ICogbXlEaXNwbGF5T2JqZWN0LnRyYW5zZm9ybS5tYXRyaXggPSBteU1hdHJpeDsgPC9jb2RlPjwvcHJlPlxuXHQgKlxuXHQgKiA8cD5Zb3UgY2Fubm90IGRpcmVjdGx5IHNldCB0aGUgPGNvZGU+dHg8L2NvZGU+IHByb3BlcnR5LiBUaGUgZm9sbG93aW5nXG5cdCAqIGNvZGUgaGFzIG5vIGVmZmVjdCBvbiA8Y29kZT5teURpc3BsYXlPYmplY3Q8L2NvZGU+OiA8L3A+XG5cdCAqIDxwcmUgeG1sOnNwYWNlPVwicHJlc2VydmVcIj48Y29kZT4gbXlEaXNwbGF5T2JqZWN0LnRyYW5zZm9ybS5tYXRyaXgudHggKz1cblx0ICogMTA7IDwvY29kZT48L3ByZT5cblx0ICpcblx0ICogPHA+WW91IGNhbiBhbHNvIGNvcHkgYW4gZW50aXJlIHRyYW5zZm9ybSBvYmplY3QgYW5kIGFzc2lnbiBpdCB0byBhbm90aGVyXG5cdCAqIGRpc3BsYXkgb2JqZWN0J3MgdHJhbnNmb3JtIHByb3BlcnR5LiBGb3IgZXhhbXBsZSwgdGhlIGZvbGxvd2luZyBjb2RlXG5cdCAqIGNvcGllcyB0aGUgZW50aXJlIHRyYW5zZm9ybSBvYmplY3QgZnJvbSA8Y29kZT5teU9sZERpc3BsYXlPYmo8L2NvZGU+IHRvXG5cdCAqIDxjb2RlPm15TmV3RGlzcGxheU9iajwvY29kZT46PC9wPlxuXHQgKiA8Y29kZT5teU5ld0Rpc3BsYXlPYmoudHJhbnNmb3JtID0gbXlPbGREaXNwbGF5T2JqLnRyYW5zZm9ybTs8L2NvZGU+XG5cdCAqXG5cdCAqIDxwPlRoZSByZXN1bHRpbmcgZGlzcGxheSBvYmplY3QsIDxjb2RlPm15TmV3RGlzcGxheU9iajwvY29kZT4sIG5vdyBoYXMgdGhlXG5cdCAqIHNhbWUgdmFsdWVzIGZvciBpdHMgbWF0cml4LCBjb2xvciB0cmFuc2Zvcm0sIGFuZCBwaXhlbCBib3VuZHMgYXMgdGhlIG9sZFxuXHQgKiBkaXNwbGF5IG9iamVjdCwgPGNvZGU+bXlPbGREaXNwbGF5T2JqPC9jb2RlPi48L3A+XG5cdCAqXG5cdCAqIDxwPk5vdGUgdGhhdCBBSVIgZm9yIFRWIGRldmljZXMgdXNlIGhhcmR3YXJlIGFjY2VsZXJhdGlvbiwgaWYgaXQgaXNcblx0ICogYXZhaWxhYmxlLCBmb3IgY29sb3IgdHJhbnNmb3Jtcy48L3A+XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHRyYW5zZm9ybSgpOlRyYW5zZm9ybVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3RyYW5zZm9ybTtcblx0fVxuXG5cdC8qKlxuXHQgKiBXaGV0aGVyIG9yIG5vdCB0aGUgZGlzcGxheSBvYmplY3QgaXMgdmlzaWJsZS4gRGlzcGxheSBvYmplY3RzIHRoYXQgYXJlIG5vdFxuXHQgKiB2aXNpYmxlIGFyZSBkaXNhYmxlZC4gRm9yIGV4YW1wbGUsIGlmIDxjb2RlPnZpc2libGU9ZmFsc2U8L2NvZGU+IGZvciBhblxuXHQgKiBJbnRlcmFjdGl2ZU9iamVjdCBpbnN0YW5jZSwgaXQgY2Fubm90IGJlIGNsaWNrZWQuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHZpc2libGUoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fZXhwbGljaXRWaXNpYmlsaXR5O1xuXHR9XG5cblx0cHVibGljIHNldCB2aXNpYmxlKHZhbHVlOmJvb2xlYW4pXG5cdHtcblx0XHRpZiAodGhpcy5fZXhwbGljaXRWaXNpYmlsaXR5ID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fZXhwbGljaXRWaXNpYmlsaXR5ID0gdmFsdWU7XG5cblx0XHR0aGlzLl9wVXBkYXRlSW1wbGljaXRWaXNpYmlsaXR5KHRoaXMuX3BQYXJlbnQ/IHRoaXMuX3BQYXJlbnQuX2lJc1Zpc2libGUoKSA6IHRydWUpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB0aGUgd2lkdGggb2YgdGhlIGRpc3BsYXkgb2JqZWN0LCBpbiBwaXhlbHMuIFRoZSB3aWR0aCBpc1xuXHQgKiBjYWxjdWxhdGVkIGJhc2VkIG9uIHRoZSBib3VuZHMgb2YgdGhlIGNvbnRlbnQgb2YgdGhlIGRpc3BsYXkgb2JqZWN0LiBXaGVuXG5cdCAqIHlvdSBzZXQgdGhlIDxjb2RlPndpZHRoPC9jb2RlPiBwcm9wZXJ0eSwgdGhlIDxjb2RlPnNjYWxlWDwvY29kZT4gcHJvcGVydHlcblx0ICogaXMgYWRqdXN0ZWQgYWNjb3JkaW5nbHksIGFzIHNob3duIGluIHRoZSBmb2xsb3dpbmcgY29kZTpcblx0ICpcblx0ICogPHA+RXhjZXB0IGZvciBUZXh0RmllbGQgYW5kIFZpZGVvIG9iamVjdHMsIGEgZGlzcGxheSBvYmplY3Qgd2l0aCBub1xuXHQgKiBjb250ZW50KHN1Y2ggYXMgYW4gZW1wdHkgc3ByaXRlKSBoYXMgYSB3aWR0aCBvZiAwLCBldmVuIGlmIHlvdSB0cnkgdG8gc2V0XG5cdCAqIDxjb2RlPndpZHRoPC9jb2RlPiB0byBhIGRpZmZlcmVudCB2YWx1ZS48L3A+XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHdpZHRoKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5nZXRCb3goKS53aWR0aCp0aGlzLl9wU2NhbGVYO1xuXHR9XG5cblx0cHVibGljIHNldCB3aWR0aCh2YWw6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3dpZHRoID09IHZhbClcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3dpZHRoID0gdmFsO1xuXG5cdFx0dGhpcy5fcFNjYWxlWCA9IHZhbC90aGlzLmdldEJveCgpLndpZHRoO1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlU2NhbGUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgdGhlIDxpPng8L2k+IGNvb3JkaW5hdGUgb2YgdGhlIERpc3BsYXlPYmplY3QgaW5zdGFuY2UgcmVsYXRpdmVcblx0ICogdG8gdGhlIGxvY2FsIGNvb3JkaW5hdGVzIG9mIHRoZSBwYXJlbnQgRGlzcGxheU9iamVjdENvbnRhaW5lci4gSWYgdGhlXG5cdCAqIG9iamVjdCBpcyBpbnNpZGUgYSBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIHRoYXQgaGFzIHRyYW5zZm9ybWF0aW9ucywgaXQgaXNcblx0ICogaW4gdGhlIGxvY2FsIGNvb3JkaW5hdGUgc3lzdGVtIG9mIHRoZSBlbmNsb3NpbmcgRGlzcGxheU9iamVjdENvbnRhaW5lci5cblx0ICogVGh1cywgZm9yIGEgRGlzcGxheU9iamVjdENvbnRhaW5lciByb3RhdGVkIDkwwrAgY291bnRlcmNsb2Nrd2lzZSwgdGhlXG5cdCAqIERpc3BsYXlPYmplY3RDb250YWluZXIncyBjaGlsZHJlbiBpbmhlcml0IGEgY29vcmRpbmF0ZSBzeXN0ZW0gdGhhdCBpc1xuXHQgKiByb3RhdGVkIDkwwrAgY291bnRlcmNsb2Nrd2lzZS4gVGhlIG9iamVjdCdzIGNvb3JkaW5hdGVzIHJlZmVyIHRvIHRoZVxuXHQgKiByZWdpc3RyYXRpb24gcG9pbnQgcG9zaXRpb24uXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHgoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl94O1xuXHR9XG5cblx0cHVibGljIHNldCB4KHZhbDpudW1iZXIpXG5cdHtcblx0XHRpZiAodGhpcy5feCA9PSB2YWwpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl94ID0gdmFsO1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlUG9zaXRpb24oKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgdGhlIDxpPnk8L2k+IGNvb3JkaW5hdGUgb2YgdGhlIERpc3BsYXlPYmplY3QgaW5zdGFuY2UgcmVsYXRpdmVcblx0ICogdG8gdGhlIGxvY2FsIGNvb3JkaW5hdGVzIG9mIHRoZSBwYXJlbnQgRGlzcGxheU9iamVjdENvbnRhaW5lci4gSWYgdGhlXG5cdCAqIG9iamVjdCBpcyBpbnNpZGUgYSBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIHRoYXQgaGFzIHRyYW5zZm9ybWF0aW9ucywgaXQgaXNcblx0ICogaW4gdGhlIGxvY2FsIGNvb3JkaW5hdGUgc3lzdGVtIG9mIHRoZSBlbmNsb3NpbmcgRGlzcGxheU9iamVjdENvbnRhaW5lci5cblx0ICogVGh1cywgZm9yIGEgRGlzcGxheU9iamVjdENvbnRhaW5lciByb3RhdGVkIDkwwrAgY291bnRlcmNsb2Nrd2lzZSwgdGhlXG5cdCAqIERpc3BsYXlPYmplY3RDb250YWluZXIncyBjaGlsZHJlbiBpbmhlcml0IGEgY29vcmRpbmF0ZSBzeXN0ZW0gdGhhdCBpc1xuXHQgKiByb3RhdGVkIDkwwrAgY291bnRlcmNsb2Nrd2lzZS4gVGhlIG9iamVjdCdzIGNvb3JkaW5hdGVzIHJlZmVyIHRvIHRoZVxuXHQgKiByZWdpc3RyYXRpb24gcG9pbnQgcG9zaXRpb24uXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHkoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl95O1xuXHR9XG5cblx0cHVibGljIHNldCB5KHZhbDpudW1iZXIpXG5cdHtcblx0XHRpZiAodGhpcy5feSA9PSB2YWwpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl95ID0gdmFsO1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlUG9zaXRpb24oKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgdGhlIHogY29vcmRpbmF0ZSBwb3NpdGlvbiBhbG9uZyB0aGUgei1heGlzIG9mIHRoZSBEaXNwbGF5T2JqZWN0XG5cdCAqIGluc3RhbmNlIHJlbGF0aXZlIHRvIHRoZSAzRCBwYXJlbnQgY29udGFpbmVyLiBUaGUgeiBwcm9wZXJ0eSBpcyB1c2VkIGZvclxuXHQgKiAzRCBjb29yZGluYXRlcywgbm90IHNjcmVlbiBvciBwaXhlbCBjb29yZGluYXRlcy5cblx0ICpcblx0ICogPHA+V2hlbiB5b3Ugc2V0IGEgPGNvZGU+ejwvY29kZT4gcHJvcGVydHkgZm9yIGEgZGlzcGxheSBvYmplY3QgdG9cblx0ICogc29tZXRoaW5nIG90aGVyIHRoYW4gdGhlIGRlZmF1bHQgdmFsdWUgb2YgPGNvZGU+MDwvY29kZT4sIGEgY29ycmVzcG9uZGluZ1xuXHQgKiBNYXRyaXgzRCBvYmplY3QgaXMgYXV0b21hdGljYWxseSBjcmVhdGVkLiBmb3IgYWRqdXN0aW5nIGEgZGlzcGxheSBvYmplY3Qnc1xuXHQgKiBwb3NpdGlvbiBhbmQgb3JpZW50YXRpb24gaW4gdGhyZWUgZGltZW5zaW9ucy4gV2hlbiB3b3JraW5nIHdpdGggdGhlXG5cdCAqIHotYXhpcywgdGhlIGV4aXN0aW5nIGJlaGF2aW9yIG9mIHggYW5kIHkgcHJvcGVydGllcyBjaGFuZ2VzIGZyb20gc2NyZWVuIG9yXG5cdCAqIHBpeGVsIGNvb3JkaW5hdGVzIHRvIHBvc2l0aW9ucyByZWxhdGl2ZSB0byB0aGUgM0QgcGFyZW50IGNvbnRhaW5lci48L3A+XG5cdCAqXG5cdCAqIDxwPkZvciBleGFtcGxlLCBhIGNoaWxkIG9mIHRoZSA8Y29kZT5fcm9vdDwvY29kZT4gYXQgcG9zaXRpb24geCA9IDEwMCwgeSA9XG5cdCAqIDEwMCwgeiA9IDIwMCBpcyBub3QgZHJhd24gYXQgcGl4ZWwgbG9jYXRpb24oMTAwLDEwMCkuIFRoZSBjaGlsZCBpcyBkcmF3blxuXHQgKiB3aGVyZXZlciB0aGUgM0QgcHJvamVjdGlvbiBjYWxjdWxhdGlvbiBwdXRzIGl0LiBUaGUgY2FsY3VsYXRpb24gaXM6PC9wPlxuXHQgKlxuXHQgKiA8cD48Y29kZT4oeH5+Y2FtZXJhRm9jYWxMZW5ndGgvY2FtZXJhUmVsYXRpdmVaUG9zaXRpb24sXG5cdCAqIHl+fmNhbWVyYUZvY2FsTGVuZ3RoL2NhbWVyYVJlbGF0aXZlWlBvc2l0aW9uKTwvY29kZT48L3A+XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHooKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl96O1xuXHR9XG5cblx0cHVibGljIHNldCB6KHZhbDpudW1iZXIpXG5cdHtcblx0XHRpZiAodGhpcy5feiA9PSB2YWwpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl96ID0gdmFsO1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlUG9zaXRpb24oKTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCB6T2Zmc2V0KCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fek9mZnNldDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgek9mZnNldCh2YWx1ZTpudW1iZXIpXG5cdHtcblx0XHR0aGlzLl96T2Zmc2V0ID0gdmFsdWU7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlcyBhIG5ldyA8Y29kZT5EaXNwbGF5T2JqZWN0PC9jb2RlPiBpbnN0YW5jZS5cblx0ICovXG5cdGNvbnN0cnVjdG9yKClcblx0e1xuXHRcdHN1cGVyKCk7XG5cblx0XHQvLyBDYWNoZWQgdmVjdG9yIG9mIHRyYW5zZm9ybWF0aW9uIGNvbXBvbmVudHMgdXNlZCB3aGVuXG5cdFx0Ly8gcmVjb21wb3NpbmcgdGhlIHRyYW5zZm9ybSBtYXRyaXggaW4gdXBkYXRlVHJhbnNmb3JtKClcblxuXHRcdHRoaXMuX3RyYW5zZm9ybUNvbXBvbmVudHMgPSBuZXcgQXJyYXk8VmVjdG9yM0Q+KDMpO1xuXG5cdFx0dGhpcy5fdHJhbnNmb3JtQ29tcG9uZW50c1swXSA9IHRoaXMuX3Bvcztcblx0XHR0aGlzLl90cmFuc2Zvcm1Db21wb25lbnRzWzFdID0gdGhpcy5fcm90O1xuXHRcdHRoaXMuX3RyYW5zZm9ybUNvbXBvbmVudHNbMl0gPSB0aGlzLl9zY2E7XG5cblx0XHQvL2NyZWF0aW9uIG9mIGFzc29jaWF0ZWQgdHJhbnNmb3JtIG9iamVjdFxuXHRcdHRoaXMuX3RyYW5zZm9ybSA9IG5ldyBUcmFuc2Zvcm0odGhpcyk7XG5cblx0XHR0aGlzLl9tYXRyaXgzRC5pZGVudGl0eSgpO1xuXG5cdFx0dGhpcy5fZmxpcFkuYXBwZW5kU2NhbGUoMSwgLTEsIDEpO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgYWRkRXZlbnRMaXN0ZW5lcih0eXBlOnN0cmluZywgbGlzdGVuZXI6RnVuY3Rpb24pXG5cdHtcblx0XHRzdXBlci5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKTtcblxuXHRcdHN3aXRjaCAodHlwZSkge1xuXHRcdFx0Y2FzZSBEaXNwbGF5T2JqZWN0RXZlbnQuUE9TSVRJT05fQ0hBTkdFRDpcblx0XHRcdFx0dGhpcy5fbGlzdGVuVG9Qb3NpdGlvbkNoYW5nZWQgPSB0cnVlO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgRGlzcGxheU9iamVjdEV2ZW50LlJPVEFUSU9OX0NIQU5HRUQ6XG5cdFx0XHRcdHRoaXMuX2xpc3RlblRvUm90YXRpb25DaGFuZ2VkID0gdHJ1ZTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIERpc3BsYXlPYmplY3RFdmVudC5TQ0FMRV9DSEFOR0VEOlxuXHRcdFx0XHR0aGlzLl9saXN0ZW5Ub1NjYWxlQ2hhbmdlZCA9IHRydWU7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBEaXNwbGF5T2JqZWN0RXZlbnQuU0NFTkVfQ0hBTkdFRDpcblx0XHRcdFx0dGhpcy5fbGlzdGVuVG9TY2VuZUNoYW5nZWQgPSB0cnVlO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgRGlzcGxheU9iamVjdEV2ZW50LlNDRU5FVFJBTlNGT1JNX0NIQU5HRUQ6XG5cdFx0XHRcdHRoaXMuX2xpc3RlblRvU2NlbmVUcmFuc2Zvcm1DaGFuZ2VkID0gdHJ1ZTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgY2xvbmUoKTpEaXNwbGF5T2JqZWN0XG5cdHtcblx0XHR2YXIgY2xvbmU6RGlzcGxheU9iamVjdCA9IG5ldyBEaXNwbGF5T2JqZWN0KCk7XG5cdFx0Y2xvbmUucGl2b3QgPSB0aGlzLnBpdm90O1xuXHRcdGNsb25lLl9pTWF0cml4M0QgPSB0aGlzLl9pTWF0cml4M0Q7XG5cdFx0Y2xvbmUubmFtZSA9IG5hbWU7XG5cblx0XHQvLyB0b2RvOiBpbXBsZW1lbnQgZm9yIGFsbCBzdWJ0eXBlc1xuXHRcdHJldHVybiBjbG9uZTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGRpc3Bvc2UoKVxuXHR7XG5cdFx0aWYgKHRoaXMucGFyZW50KVxuXHRcdFx0dGhpcy5wYXJlbnQucmVtb3ZlQ2hpbGQodGhpcyk7XG5cblx0XHR3aGlsZSAodGhpcy5fcFJlbmRlcmFibGVzLmxlbmd0aClcblx0XHRcdHRoaXMuX3BSZW5kZXJhYmxlc1swXS5kaXNwb3NlKCk7XG5cdH1cblxuXHQvKipcblx0ICogQGluaGVyaXREb2Ncblx0ICovXG5cdHB1YmxpYyBkaXNwb3NlQXNzZXQoKVxuXHR7XG5cdFx0dGhpcy5kaXNwb3NlKCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhIHJlY3RhbmdsZSB0aGF0IGRlZmluZXMgdGhlIGFyZWEgb2YgdGhlIGRpc3BsYXkgb2JqZWN0IHJlbGF0aXZlXG5cdCAqIHRvIHRoZSBjb29yZGluYXRlIHN5c3RlbSBvZiB0aGUgPGNvZGU+dGFyZ2V0Q29vcmRpbmF0ZVNwYWNlPC9jb2RlPiBvYmplY3QuXG5cdCAqIENvbnNpZGVyIHRoZSBmb2xsb3dpbmcgY29kZSwgd2hpY2ggc2hvd3MgaG93IHRoZSByZWN0YW5nbGUgcmV0dXJuZWQgY2FuXG5cdCAqIHZhcnkgZGVwZW5kaW5nIG9uIHRoZSA8Y29kZT50YXJnZXRDb29yZGluYXRlU3BhY2U8L2NvZGU+IHBhcmFtZXRlciB0aGF0XG5cdCAqIHlvdSBwYXNzIHRvIHRoZSBtZXRob2Q6XG5cdCAqXG5cdCAqIDxwPjxiPk5vdGU6PC9iPiBVc2UgdGhlIDxjb2RlPmxvY2FsVG9HbG9iYWwoKTwvY29kZT4gYW5kXG5cdCAqIDxjb2RlPmdsb2JhbFRvTG9jYWwoKTwvY29kZT4gbWV0aG9kcyB0byBjb252ZXJ0IHRoZSBkaXNwbGF5IG9iamVjdCdzIGxvY2FsXG5cdCAqIGNvb3JkaW5hdGVzIHRvIGRpc3BsYXkgY29vcmRpbmF0ZXMsIG9yIGRpc3BsYXkgY29vcmRpbmF0ZXMgdG8gbG9jYWxcblx0ICogY29vcmRpbmF0ZXMsIHJlc3BlY3RpdmVseS48L3A+XG5cdCAqXG5cdCAqIDxwPlRoZSA8Y29kZT5nZXRCb3VuZHMoKTwvY29kZT4gbWV0aG9kIGlzIHNpbWlsYXIgdG8gdGhlXG5cdCAqIDxjb2RlPmdldFJlY3QoKTwvY29kZT4gbWV0aG9kOyBob3dldmVyLCB0aGUgUmVjdGFuZ2xlIHJldHVybmVkIGJ5IHRoZVxuXHQgKiA8Y29kZT5nZXRCb3VuZHMoKTwvY29kZT4gbWV0aG9kIGluY2x1ZGVzIGFueSBzdHJva2VzIG9uIHNoYXBlcywgd2hlcmVhc1xuXHQgKiB0aGUgUmVjdGFuZ2xlIHJldHVybmVkIGJ5IHRoZSA8Y29kZT5nZXRSZWN0KCk8L2NvZGU+IG1ldGhvZCBkb2VzIG5vdC4gRm9yXG5cdCAqIGFuIGV4YW1wbGUsIHNlZSB0aGUgZGVzY3JpcHRpb24gb2YgdGhlIDxjb2RlPmdldFJlY3QoKTwvY29kZT4gbWV0aG9kLjwvcD5cblx0ICpcblx0ICogQHBhcmFtIHRhcmdldENvb3JkaW5hdGVTcGFjZSBUaGUgZGlzcGxheSBvYmplY3QgdGhhdCBkZWZpbmVzIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvb3JkaW5hdGUgc3lzdGVtIHRvIHVzZS5cblx0ICogQHJldHVybiBUaGUgcmVjdGFuZ2xlIHRoYXQgZGVmaW5lcyB0aGUgYXJlYSBvZiB0aGUgZGlzcGxheSBvYmplY3QgcmVsYXRpdmVcblx0ICogICAgICAgICB0byB0aGUgPGNvZGU+dGFyZ2V0Q29vcmRpbmF0ZVNwYWNlPC9jb2RlPiBvYmplY3QncyBjb29yZGluYXRlXG5cdCAqICAgICAgICAgc3lzdGVtLlxuXHQgKi9cblx0cHVibGljIGdldEJvdW5kcyh0YXJnZXRDb29yZGluYXRlU3BhY2U6RGlzcGxheU9iamVjdCk6UmVjdGFuZ2xlXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fYm91bmRzOyAvL1RPRE9cblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGEgcmVjdGFuZ2xlIHRoYXQgZGVmaW5lcyB0aGUgYm91bmRhcnkgb2YgdGhlIGRpc3BsYXkgb2JqZWN0LCBiYXNlZFxuXHQgKiBvbiB0aGUgY29vcmRpbmF0ZSBzeXN0ZW0gZGVmaW5lZCBieSB0aGUgPGNvZGU+dGFyZ2V0Q29vcmRpbmF0ZVNwYWNlPC9jb2RlPlxuXHQgKiBwYXJhbWV0ZXIsIGV4Y2x1ZGluZyBhbnkgc3Ryb2tlcyBvbiBzaGFwZXMuIFRoZSB2YWx1ZXMgdGhhdCB0aGVcblx0ICogPGNvZGU+Z2V0UmVjdCgpPC9jb2RlPiBtZXRob2QgcmV0dXJucyBhcmUgdGhlIHNhbWUgb3Igc21hbGxlciB0aGFuIHRob3NlXG5cdCAqIHJldHVybmVkIGJ5IHRoZSA8Y29kZT5nZXRCb3VuZHMoKTwvY29kZT4gbWV0aG9kLlxuXHQgKlxuXHQgKiA8cD48Yj5Ob3RlOjwvYj4gVXNlIDxjb2RlPmxvY2FsVG9HbG9iYWwoKTwvY29kZT4gYW5kXG5cdCAqIDxjb2RlPmdsb2JhbFRvTG9jYWwoKTwvY29kZT4gbWV0aG9kcyB0byBjb252ZXJ0IHRoZSBkaXNwbGF5IG9iamVjdCdzIGxvY2FsXG5cdCAqIGNvb3JkaW5hdGVzIHRvIFNjZW5lIGNvb3JkaW5hdGVzLCBvciBTY2VuZSBjb29yZGluYXRlcyB0byBsb2NhbFxuXHQgKiBjb29yZGluYXRlcywgcmVzcGVjdGl2ZWx5LjwvcD5cblx0ICpcblx0ICogQHBhcmFtIHRhcmdldENvb3JkaW5hdGVTcGFjZSBUaGUgZGlzcGxheSBvYmplY3QgdGhhdCBkZWZpbmVzIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvb3JkaW5hdGUgc3lzdGVtIHRvIHVzZS5cblx0ICogQHJldHVybiBUaGUgcmVjdGFuZ2xlIHRoYXQgZGVmaW5lcyB0aGUgYXJlYSBvZiB0aGUgZGlzcGxheSBvYmplY3QgcmVsYXRpdmVcblx0ICogICAgICAgICB0byB0aGUgPGNvZGU+dGFyZ2V0Q29vcmRpbmF0ZVNwYWNlPC9jb2RlPiBvYmplY3QncyBjb29yZGluYXRlXG5cdCAqICAgICAgICAgc3lzdGVtLlxuXHQgKi9cblx0cHVibGljIGdldFJlY3QodGFyZ2V0Q29vcmRpbmF0ZVNwYWNlOkRpc3BsYXlPYmplY3QgPSBudWxsKTpSZWN0YW5nbGVcblx0e1xuXHRcdHJldHVybiB0aGlzLl9ib3VuZHM7IC8vVE9ET1xuXHR9XG5cblx0cHVibGljIGdldEJveCh0YXJnZXRDb29yZGluYXRlU3BhY2U6RGlzcGxheU9iamVjdCA9IG51bGwpOkJveFxuXHR7XG5cdFx0aWYgKHRoaXMuX2lTb3VyY2VQcmVmYWIpXG5cdFx0XHR0aGlzLl9pU291cmNlUHJlZmFiLl9pVmFsaWRhdGUoKTtcblxuXHRcdC8vVE9ETyB0YXJnZXRDb29yZGluYXRlU3BhY2Vcblx0XHRpZiAodGhpcy5fYm94Qm91bmRzSW52YWxpZCkge1xuXHRcdFx0dGhpcy5fcFVwZGF0ZUJveEJvdW5kcygpO1xuXG5cdFx0XHRpZiAodGhpcy5fd2lkdGggIT0gbnVsbCkge1xuXHRcdFx0XHR0aGlzLl9wU2NhbGVYID0gdGhpcy5fd2lkdGgvdGhpcy5fcEJveEJvdW5kcy53aWR0aDtcblx0XHRcdFx0dGhpcy5pbnZhbGlkYXRlU2NhbGUoKTtcblx0XHRcdH1cblxuXG5cdFx0XHRpZiAodGhpcy5faGVpZ2h0ICE9IG51bGwpIHtcblx0XHRcdFx0dGhpcy5fcFNjYWxlWSA9IHRoaXMuX2hlaWdodC90aGlzLl9wQm94Qm91bmRzLmhlaWdodDtcblx0XHRcdFx0dGhpcy5pbnZhbGlkYXRlU2NhbGUoKTtcblx0XHRcdH1cblxuXG5cdFx0XHRpZiAodGhpcy5fZGVwdGggIT0gbnVsbCkge1xuXHRcdFx0XHR0aGlzLl9wU2NhbGVaID0gdGhpcy5fZGVwdGgvdGhpcy5fcEJveEJvdW5kcy5kZXB0aDtcblx0XHRcdFx0dGhpcy5pbnZhbGlkYXRlU2NhbGUoKTtcblx0XHRcdH1cblx0XHR9XG5cblxuXHRcdHJldHVybiB0aGlzLl9wQm94Qm91bmRzO1xuXHR9XG5cblx0cHVibGljIGdldFNwaGVyZSh0YXJnZXRDb29yZGluYXRlU3BhY2U6RGlzcGxheU9iamVjdCA9IG51bGwpOlNwaGVyZVxuXHR7XG5cdFx0aWYgKHRoaXMuX2lTb3VyY2VQcmVmYWIpXG5cdFx0XHR0aGlzLl9pU291cmNlUHJlZmFiLl9pVmFsaWRhdGUoKTtcblxuXHRcdGlmICh0aGlzLl9zcGhlcmVCb3VuZHNJbnZhbGlkKSB7XG5cdFx0XHR0aGlzLl9wVXBkYXRlU3BoZXJlQm91bmRzKCk7XG5cdFx0fVxuXG5cblx0XHRyZXR1cm4gdGhpcy5fcFNwaGVyZUJvdW5kcztcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyB0aGUgPGNvZGU+cG9pbnQ8L2NvZGU+IG9iamVjdCBmcm9tIHRoZSBTY2VuZShnbG9iYWwpIGNvb3JkaW5hdGVzXG5cdCAqIHRvIHRoZSBkaXNwbGF5IG9iamVjdCdzKGxvY2FsKSBjb29yZGluYXRlcy5cblx0ICpcblx0ICogPHA+VG8gdXNlIHRoaXMgbWV0aG9kLCBmaXJzdCBjcmVhdGUgYW4gaW5zdGFuY2Ugb2YgdGhlIFBvaW50IGNsYXNzLiBUaGVcblx0ICogPGk+eDwvaT4gYW5kIDxpPnk8L2k+IHZhbHVlcyB0aGF0IHlvdSBhc3NpZ24gcmVwcmVzZW50IGdsb2JhbCBjb29yZGluYXRlc1xuXHQgKiBiZWNhdXNlIHRoZXkgcmVsYXRlIHRvIHRoZSBvcmlnaW4oMCwwKSBvZiB0aGUgbWFpbiBkaXNwbGF5IGFyZWEuIFRoZW5cblx0ICogcGFzcyB0aGUgUG9pbnQgaW5zdGFuY2UgYXMgdGhlIHBhcmFtZXRlciB0byB0aGVcblx0ICogPGNvZGU+Z2xvYmFsVG9Mb2NhbCgpPC9jb2RlPiBtZXRob2QuIFRoZSBtZXRob2QgcmV0dXJucyBhIG5ldyBQb2ludCBvYmplY3Rcblx0ICogd2l0aCA8aT54PC9pPiBhbmQgPGk+eTwvaT4gdmFsdWVzIHRoYXQgcmVsYXRlIHRvIHRoZSBvcmlnaW4gb2YgdGhlIGRpc3BsYXlcblx0ICogb2JqZWN0IGluc3RlYWQgb2YgdGhlIG9yaWdpbiBvZiB0aGUgU2NlbmUuPC9wPlxuXHQgKlxuXHQgKiBAcGFyYW0gcG9pbnQgQW4gb2JqZWN0IGNyZWF0ZWQgd2l0aCB0aGUgUG9pbnQgY2xhc3MuIFRoZSBQb2ludCBvYmplY3Rcblx0ICogICAgICAgICAgICAgIHNwZWNpZmllcyB0aGUgPGk+eDwvaT4gYW5kIDxpPnk8L2k+IGNvb3JkaW5hdGVzIGFzXG5cdCAqICAgICAgICAgICAgICBwcm9wZXJ0aWVzLlxuXHQgKiBAcmV0dXJuIEEgUG9pbnQgb2JqZWN0IHdpdGggY29vcmRpbmF0ZXMgcmVsYXRpdmUgdG8gdGhlIGRpc3BsYXkgb2JqZWN0LlxuXHQgKi9cblx0cHVibGljIGdsb2JhbFRvTG9jYWwocG9pbnQ6UG9pbnQpOlBvaW50XG5cdHtcblx0XHRyZXR1cm4gcG9pbnQ7IC8vVE9ET1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIGEgdHdvLWRpbWVuc2lvbmFsIHBvaW50IGZyb20gdGhlIFNjZW5lKGdsb2JhbCkgY29vcmRpbmF0ZXMgdG8gYVxuXHQgKiB0aHJlZS1kaW1lbnNpb25hbCBkaXNwbGF5IG9iamVjdCdzKGxvY2FsKSBjb29yZGluYXRlcy5cblx0ICpcblx0ICogPHA+VG8gdXNlIHRoaXMgbWV0aG9kLCBmaXJzdCBjcmVhdGUgYW4gaW5zdGFuY2Ugb2YgdGhlIFZlY3RvcjNEIGNsYXNzLiBUaGUgeCxcblx0ICogeSBhbmQgeiB2YWx1ZXMgdGhhdCB5b3UgYXNzaWduIHRvIHRoZSBWZWN0b3IzRCBvYmplY3QgcmVwcmVzZW50IGdsb2JhbFxuXHQgKiBjb29yZGluYXRlcyBiZWNhdXNlIHRoZXkgYXJlIHJlbGF0aXZlIHRvIHRoZSBvcmlnaW4oMCwwLDApIG9mIHRoZSBzY2VuZS4gVGhlblxuXHQgKiBwYXNzIHRoZSBWZWN0b3IzRCBvYmplY3QgdG8gdGhlIDxjb2RlPmdsb2JhbFRvTG9jYWwzRCgpPC9jb2RlPiBtZXRob2QgYXMgdGhlXG5cdCAqIDxjb2RlPnBvc2l0aW9uPC9jb2RlPiBwYXJhbWV0ZXIuXG5cdCAqIFRoZSBtZXRob2QgcmV0dXJucyB0aHJlZS1kaW1lbnNpb25hbCBjb29yZGluYXRlcyBhcyBhIFZlY3RvcjNEIG9iamVjdFxuXHQgKiBjb250YWluaW5nIDxjb2RlPng8L2NvZGU+LCA8Y29kZT55PC9jb2RlPiwgYW5kIDxjb2RlPno8L2NvZGU+IHZhbHVlcyB0aGF0XG5cdCAqIGFyZSByZWxhdGl2ZSB0byB0aGUgb3JpZ2luIG9mIHRoZSB0aHJlZS1kaW1lbnNpb25hbCBkaXNwbGF5IG9iamVjdC48L3A+XG5cdCAqXG5cdCAqIEBwYXJhbSBwb2ludCBBIFZlY3RvcjNEIG9iamVjdCByZXByZXNlbnRpbmcgZ2xvYmFsIHgsIHkgYW5kIHogY29vcmRpbmF0ZXMgaW5cblx0ICogICAgICAgICAgICAgIHRoZSBzY2VuZS5cblx0ICogQHJldHVybiBBIFZlY3RvcjNEIG9iamVjdCB3aXRoIGNvb3JkaW5hdGVzIHJlbGF0aXZlIHRvIHRoZSB0aHJlZS1kaW1lbnNpb25hbFxuXHQgKiAgICAgICAgIGRpc3BsYXkgb2JqZWN0LlxuXHQgKi9cblx0cHVibGljIGdsb2JhbFRvTG9jYWwzRChwb3NpdGlvbjpWZWN0b3IzRCk6VmVjdG9yM0Rcblx0e1xuXHRcdHJldHVybiB0aGlzLmludmVyc2VTY2VuZVRyYW5zZm9ybS50cmFuc2Zvcm1WZWN0b3IocG9zaXRpb24pO1xuXHR9XG5cblx0LyoqXG5cdCAqIEV2YWx1YXRlcyB0aGUgYm91bmRpbmcgYm94IG9mIHRoZSBkaXNwbGF5IG9iamVjdCB0byBzZWUgaWYgaXQgb3ZlcmxhcHMgb3Jcblx0ICogaW50ZXJzZWN0cyB3aXRoIHRoZSBib3VuZGluZyBib3ggb2YgdGhlIDxjb2RlPm9iajwvY29kZT4gZGlzcGxheSBvYmplY3QuXG5cdCAqXG5cdCAqIEBwYXJhbSBvYmogVGhlIGRpc3BsYXkgb2JqZWN0IHRvIHRlc3QgYWdhaW5zdC5cblx0ICogQHJldHVybiA8Y29kZT50cnVlPC9jb2RlPiBpZiB0aGUgYm91bmRpbmcgYm94ZXMgb2YgdGhlIGRpc3BsYXkgb2JqZWN0c1xuXHQgKiAgICAgICAgIGludGVyc2VjdDsgPGNvZGU+ZmFsc2U8L2NvZGU+IGlmIG5vdC5cblx0ICovXG5cdHB1YmxpYyBoaXRUZXN0T2JqZWN0KG9iajpEaXNwbGF5T2JqZWN0KTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gZmFsc2U7IC8vVE9ET1xuXHR9XG5cblx0LyoqXG5cdCAqIEV2YWx1YXRlcyB0aGUgZGlzcGxheSBvYmplY3QgdG8gc2VlIGlmIGl0IG92ZXJsYXBzIG9yIGludGVyc2VjdHMgd2l0aCB0aGVcblx0ICogcG9pbnQgc3BlY2lmaWVkIGJ5IHRoZSA8Y29kZT54PC9jb2RlPiBhbmQgPGNvZGU+eTwvY29kZT4gcGFyYW1ldGVycy4gVGhlXG5cdCAqIDxjb2RlPng8L2NvZGU+IGFuZCA8Y29kZT55PC9jb2RlPiBwYXJhbWV0ZXJzIHNwZWNpZnkgYSBwb2ludCBpbiB0aGVcblx0ICogY29vcmRpbmF0ZSBzcGFjZSBvZiB0aGUgU2NlbmUsIG5vdCB0aGUgZGlzcGxheSBvYmplY3QgY29udGFpbmVyIHRoYXRcblx0ICogY29udGFpbnMgdGhlIGRpc3BsYXkgb2JqZWN0KHVubGVzcyB0aGF0IGRpc3BsYXkgb2JqZWN0IGNvbnRhaW5lciBpcyB0aGVcblx0ICogU2NlbmUpLlxuXHQgKlxuXHQgKiBAcGFyYW0geCAgICAgICAgIFRoZSA8aT54PC9pPiBjb29yZGluYXRlIHRvIHRlc3QgYWdhaW5zdCB0aGlzIG9iamVjdC5cblx0ICogQHBhcmFtIHkgICAgICAgICBUaGUgPGk+eTwvaT4gY29vcmRpbmF0ZSB0byB0ZXN0IGFnYWluc3QgdGhpcyBvYmplY3QuXG5cdCAqIEBwYXJhbSBzaGFwZUZsYWcgV2hldGhlciB0byBjaGVjayBhZ2FpbnN0IHRoZSBhY3R1YWwgcGl4ZWxzIG9mIHRoZSBvYmplY3Rcblx0ICogICAgICAgICAgICAgICAgICg8Y29kZT50cnVlPC9jb2RlPikgb3IgdGhlIGJvdW5kaW5nIGJveFxuXHQgKiAgICAgICAgICAgICAgICAgKDxjb2RlPmZhbHNlPC9jb2RlPikuXG5cdCAqIEByZXR1cm4gPGNvZGU+dHJ1ZTwvY29kZT4gaWYgdGhlIGRpc3BsYXkgb2JqZWN0IG92ZXJsYXBzIG9yIGludGVyc2VjdHNcblx0ICogICAgICAgICB3aXRoIHRoZSBzcGVjaWZpZWQgcG9pbnQ7IDxjb2RlPmZhbHNlPC9jb2RlPiBvdGhlcndpc2UuXG5cdCAqL1xuXHRwdWJsaWMgaGl0VGVzdFBvaW50KHg6bnVtYmVyLCB5Om51bWJlciwgc2hhcGVGbGFnOmJvb2xlYW4gPSBmYWxzZSk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIGZhbHNlOyAvL1RPRE9cblx0fVxuXG5cdC8qKlxuXHQgKiBSb3RhdGVzIHRoZSAzZCBvYmplY3QgYXJvdW5kIHRvIGZhY2UgYSBwb2ludCBkZWZpbmVkIHJlbGF0aXZlIHRvIHRoZSBsb2NhbCBjb29yZGluYXRlcyBvZiB0aGUgcGFyZW50IDxjb2RlPk9iamVjdENvbnRhaW5lcjNEPC9jb2RlPi5cblx0ICpcblx0ICogQHBhcmFtICAgIHRhcmdldCAgICAgICAgVGhlIHZlY3RvciBkZWZpbmluZyB0aGUgcG9pbnQgdG8gYmUgbG9va2VkIGF0XG5cdCAqIEBwYXJhbSAgICB1cEF4aXMgICAgICAgIEFuIG9wdGlvbmFsIHZlY3RvciB1c2VkIHRvIGRlZmluZSB0aGUgZGVzaXJlZCB1cCBvcmllbnRhdGlvbiBvZiB0aGUgM2Qgb2JqZWN0IGFmdGVyIHJvdGF0aW9uIGhhcyBvY2N1cnJlZFxuXHQgKi9cblx0cHVibGljIGxvb2tBdCh0YXJnZXQ6VmVjdG9yM0QsIHVwQXhpczpWZWN0b3IzRCA9IG51bGwpXG5cdHtcblxuXHRcdHZhciB5QXhpczpWZWN0b3IzRDtcblx0XHR2YXIgekF4aXM6VmVjdG9yM0Q7XG5cdFx0dmFyIHhBeGlzOlZlY3RvcjNEO1xuXHRcdHZhciByYXc6QXJyYXk8bnVtYmVyPjtcblxuXHRcdGlmICh1cEF4aXMgPT0gbnVsbClcblx0XHRcdHVwQXhpcyA9IFZlY3RvcjNELllfQVhJUztcblx0XHRlbHNlXG5cdFx0XHR1cEF4aXMubm9ybWFsaXplKCk7XG5cblx0XHR6QXhpcyA9IHRhcmdldC5zdWJ0cmFjdCh0aGlzLl9pTWF0cml4M0QucG9zaXRpb24pO1xuXHRcdHpBeGlzLm5vcm1hbGl6ZSgpO1xuXG5cdFx0eEF4aXMgPSB1cEF4aXMuY3Jvc3NQcm9kdWN0KHpBeGlzKTtcblx0XHR4QXhpcy5ub3JtYWxpemUoKTtcblxuXHRcdGlmICh4QXhpcy5sZW5ndGggPCAwLjA1KSB7XG5cdFx0XHR4QXhpcy54ID0gdXBBeGlzLnk7XG5cdFx0XHR4QXhpcy55ID0gdXBBeGlzLng7XG5cdFx0XHR4QXhpcy56ID0gMDtcblx0XHRcdHhBeGlzLm5vcm1hbGl6ZSgpO1xuXHRcdH1cblxuXHRcdHlBeGlzID0gekF4aXMuY3Jvc3NQcm9kdWN0KHhBeGlzKTtcblxuXHRcdHJhdyA9IE1hdHJpeDNEVXRpbHMuUkFXX0RBVEFfQ09OVEFJTkVSO1xuXG5cdFx0cmF3WzBdID0geEF4aXMueDtcblx0XHRyYXdbMV0gPSB4QXhpcy55O1xuXHRcdHJhd1syXSA9IHhBeGlzLno7XG5cdFx0cmF3WzNdID0gMDtcblxuXHRcdHJhd1s0XSA9IHlBeGlzLng7XG5cdFx0cmF3WzVdID0geUF4aXMueTtcblx0XHRyYXdbNl0gPSB5QXhpcy56O1xuXHRcdHJhd1s3XSA9IDA7XG5cblx0XHRyYXdbOF0gPSB6QXhpcy54O1xuXHRcdHJhd1s5XSA9IHpBeGlzLnk7XG5cdFx0cmF3WzEwXSA9IHpBeGlzLno7XG5cdFx0cmF3WzExXSA9IDA7XG5cblx0XHR2YXIgbTpNYXRyaXgzRCA9IG5ldyBNYXRyaXgzRCgpO1xuXHRcdG0uY29weVJhd0RhdGFGcm9tKHJhdyk7XG5cblx0XHR2YXIgdmVjOlZlY3RvcjNEID0gbS5kZWNvbXBvc2UoKVsxXTtcblxuXHRcdHRoaXMuX3JvdGF0aW9uWCA9IHZlYy54O1xuXHRcdHRoaXMuX3JvdGF0aW9uWSA9IHZlYy55O1xuXHRcdHRoaXMuX3JvdGF0aW9uWiA9IHZlYy56O1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlUm90YXRpb24oKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyB0aGUgPGNvZGU+cG9pbnQ8L2NvZGU+IG9iamVjdCBmcm9tIHRoZSBkaXNwbGF5IG9iamVjdCdzKGxvY2FsKVxuXHQgKiBjb29yZGluYXRlcyB0byB0aGUgU2NlbmUoZ2xvYmFsKSBjb29yZGluYXRlcy5cblx0ICpcblx0ICogPHA+VGhpcyBtZXRob2QgYWxsb3dzIHlvdSB0byBjb252ZXJ0IGFueSBnaXZlbiA8aT54PC9pPiBhbmQgPGk+eTwvaT5cblx0ICogY29vcmRpbmF0ZXMgZnJvbSB2YWx1ZXMgdGhhdCBhcmUgcmVsYXRpdmUgdG8gdGhlIG9yaWdpbigwLDApIG9mIGFcblx0ICogc3BlY2lmaWMgZGlzcGxheSBvYmplY3QobG9jYWwgY29vcmRpbmF0ZXMpIHRvIHZhbHVlcyB0aGF0IGFyZSByZWxhdGl2ZSB0b1xuXHQgKiB0aGUgb3JpZ2luIG9mIHRoZSBTY2VuZShnbG9iYWwgY29vcmRpbmF0ZXMpLjwvcD5cblx0ICpcblx0ICogPHA+VG8gdXNlIHRoaXMgbWV0aG9kLCBmaXJzdCBjcmVhdGUgYW4gaW5zdGFuY2Ugb2YgdGhlIFBvaW50IGNsYXNzLiBUaGVcblx0ICogPGk+eDwvaT4gYW5kIDxpPnk8L2k+IHZhbHVlcyB0aGF0IHlvdSBhc3NpZ24gcmVwcmVzZW50IGxvY2FsIGNvb3JkaW5hdGVzXG5cdCAqIGJlY2F1c2UgdGhleSByZWxhdGUgdG8gdGhlIG9yaWdpbiBvZiB0aGUgZGlzcGxheSBvYmplY3QuPC9wPlxuXHQgKlxuXHQgKiA8cD5Zb3UgdGhlbiBwYXNzIHRoZSBQb2ludCBpbnN0YW5jZSB0aGF0IHlvdSBjcmVhdGVkIGFzIHRoZSBwYXJhbWV0ZXIgdG9cblx0ICogdGhlIDxjb2RlPmxvY2FsVG9HbG9iYWwoKTwvY29kZT4gbWV0aG9kLiBUaGUgbWV0aG9kIHJldHVybnMgYSBuZXcgUG9pbnRcblx0ICogb2JqZWN0IHdpdGggPGk+eDwvaT4gYW5kIDxpPnk8L2k+IHZhbHVlcyB0aGF0IHJlbGF0ZSB0byB0aGUgb3JpZ2luIG9mIHRoZVxuXHQgKiBTY2VuZSBpbnN0ZWFkIG9mIHRoZSBvcmlnaW4gb2YgdGhlIGRpc3BsYXkgb2JqZWN0LjwvcD5cblx0ICpcblx0ICogQHBhcmFtIHBvaW50IFRoZSBuYW1lIG9yIGlkZW50aWZpZXIgb2YgYSBwb2ludCBjcmVhdGVkIHdpdGggdGhlIFBvaW50XG5cdCAqICAgICAgICAgICAgICBjbGFzcywgc3BlY2lmeWluZyB0aGUgPGk+eDwvaT4gYW5kIDxpPnk8L2k+IGNvb3JkaW5hdGVzIGFzXG5cdCAqICAgICAgICAgICAgICBwcm9wZXJ0aWVzLlxuXHQgKiBAcmV0dXJuIEEgUG9pbnQgb2JqZWN0IHdpdGggY29vcmRpbmF0ZXMgcmVsYXRpdmUgdG8gdGhlIFNjZW5lLlxuXHQgKi9cblx0cHVibGljIGxvY2FsVG9HbG9iYWwocG9pbnQ6UG9pbnQpOlBvaW50XG5cdHtcblx0XHRyZXR1cm4gbmV3IFBvaW50KCk7IC8vVE9ET1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIGEgdGhyZWUtZGltZW5zaW9uYWwgcG9pbnQgb2YgdGhlIHRocmVlLWRpbWVuc2lvbmFsIGRpc3BsYXlcblx0ICogb2JqZWN0J3MobG9jYWwpIGNvb3JkaW5hdGVzIHRvIGEgdGhyZWUtZGltZW5zaW9uYWwgcG9pbnQgaW4gdGhlIFNjZW5lXG5cdCAqIChnbG9iYWwpIGNvb3JkaW5hdGVzLlxuXHQgKlxuXHQgKiA8cD5UaGlzIG1ldGhvZCBhbGxvd3MgeW91IHRvIGNvbnZlcnQgYW55IGdpdmVuIDxpPng8L2k+LCA8aT55PC9pPiBhbmRcblx0ICogPGk+ejwvaT4gY29vcmRpbmF0ZXMgZnJvbSB2YWx1ZXMgdGhhdCBhcmUgcmVsYXRpdmUgdG8gdGhlIG9yaWdpbigwLDAsMCkgb2Zcblx0ICogYSBzcGVjaWZpYyBkaXNwbGF5IG9iamVjdChsb2NhbCBjb29yZGluYXRlcykgdG8gdmFsdWVzIHRoYXQgYXJlIHJlbGF0aXZlIHRvXG5cdCAqIHRoZSBvcmlnaW4gb2YgdGhlIFNjZW5lKGdsb2JhbCBjb29yZGluYXRlcykuPC9wPlxuXHQgKlxuXHQgKiA8cD5UbyB1c2UgdGhpcyBtZXRob2QsIGZpcnN0IGNyZWF0ZSBhbiBpbnN0YW5jZSBvZiB0aGUgUG9pbnQgY2xhc3MuIFRoZVxuXHQgKiA8aT54PC9pPiBhbmQgPGk+eTwvaT4gdmFsdWVzIHRoYXQgeW91IGFzc2lnbiByZXByZXNlbnQgbG9jYWwgY29vcmRpbmF0ZXNcblx0ICogYmVjYXVzZSB0aGV5IHJlbGF0ZSB0byB0aGUgb3JpZ2luIG9mIHRoZSBkaXNwbGF5IG9iamVjdC48L3A+XG5cdCAqXG5cdCAqIDxwPllvdSB0aGVuIHBhc3MgdGhlIFZlY3RvcjNEIGluc3RhbmNlIHRoYXQgeW91IGNyZWF0ZWQgYXMgdGhlIHBhcmFtZXRlciB0b1xuXHQgKiB0aGUgPGNvZGU+bG9jYWxUb0dsb2JhbDNEKCk8L2NvZGU+IG1ldGhvZC4gVGhlIG1ldGhvZCByZXR1cm5zIGEgbmV3XG5cdCAqIFZlY3RvcjNEIG9iamVjdCB3aXRoIDxpPng8L2k+LCA8aT55PC9pPiBhbmQgPGk+ejwvaT4gdmFsdWVzIHRoYXQgcmVsYXRlIHRvXG5cdCAqIHRoZSBvcmlnaW4gb2YgdGhlIFNjZW5lIGluc3RlYWQgb2YgdGhlIG9yaWdpbiBvZiB0aGUgZGlzcGxheSBvYmplY3QuPC9wPlxuXHQgKlxuXHQgKiBAcGFyYW0gcG9zaXRpb24gQSBWZWN0b3IzRCBvYmplY3QgY29udGFpbmluZyBlaXRoZXIgYSB0aHJlZS1kaW1lbnNpb25hbFxuXHQgKiAgICAgICAgICAgICAgICBwb3NpdGlvbiBvciB0aGUgY29vcmRpbmF0ZXMgb2YgdGhlIHRocmVlLWRpbWVuc2lvbmFsXG5cdCAqICAgICAgICAgICAgICAgIGRpc3BsYXkgb2JqZWN0LlxuXHQgKiBAcmV0dXJuIEEgVmVjdG9yM0Qgb2JqZWN0IHJlcHJlc2VudGluZyBhIHRocmVlLWRpbWVuc2lvbmFsIHBvc2l0aW9uIGluXG5cdCAqICAgICAgICAgdGhlIFNjZW5lLlxuXHQgKi9cblx0cHVibGljIGxvY2FsVG9HbG9iYWwzRChwb3NpdGlvbjpWZWN0b3IzRCk6VmVjdG9yM0Rcblx0e1xuXHRcdHJldHVybiB0aGlzLnNjZW5lVHJhbnNmb3JtLnRyYW5zZm9ybVZlY3Rvcihwb3NpdGlvbik7XG5cdH1cblxuXHQvKipcblx0ICogTW92ZXMgdGhlIDNkIG9iamVjdCBkaXJlY3RseSB0byBhIHBvaW50IGluIHNwYWNlXG5cdCAqXG5cdCAqIEBwYXJhbSAgICBkeCAgICAgICAgVGhlIGFtb3VudCBvZiBtb3ZlbWVudCBhbG9uZyB0aGUgbG9jYWwgeCBheGlzLlxuXHQgKiBAcGFyYW0gICAgZHkgICAgICAgIFRoZSBhbW91bnQgb2YgbW92ZW1lbnQgYWxvbmcgdGhlIGxvY2FsIHkgYXhpcy5cblx0ICogQHBhcmFtICAgIGR6ICAgICAgICBUaGUgYW1vdW50IG9mIG1vdmVtZW50IGFsb25nIHRoZSBsb2NhbCB6IGF4aXMuXG5cdCAqL1xuXG5cdHB1YmxpYyBtb3ZlVG8oZHg6bnVtYmVyLCBkeTpudW1iZXIsIGR6Om51bWJlcilcblx0e1xuXHRcdGlmICh0aGlzLl94ID09IGR4ICYmIHRoaXMuX3kgPT0gZHkgJiYgdGhpcy5feiA9PSBkeilcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3ggPSBkeDtcblx0XHR0aGlzLl95ID0gZHk7XG5cdFx0dGhpcy5feiA9IGR6O1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlUG9zaXRpb24oKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBNb3ZlcyB0aGUgbG9jYWwgcG9pbnQgYXJvdW5kIHdoaWNoIHRoZSBvYmplY3Qgcm90YXRlcy5cblx0ICpcblx0ICogQHBhcmFtICAgIGR4ICAgICAgICBUaGUgYW1vdW50IG9mIG1vdmVtZW50IGFsb25nIHRoZSBsb2NhbCB4IGF4aXMuXG5cdCAqIEBwYXJhbSAgICBkeSAgICAgICAgVGhlIGFtb3VudCBvZiBtb3ZlbWVudCBhbG9uZyB0aGUgbG9jYWwgeSBheGlzLlxuXHQgKiBAcGFyYW0gICAgZHogICAgICAgIFRoZSBhbW91bnQgb2YgbW92ZW1lbnQgYWxvbmcgdGhlIGxvY2FsIHogYXhpcy5cblx0ICovXG5cdHB1YmxpYyBtb3ZlUGl2b3QoZHg6bnVtYmVyLCBkeTpudW1iZXIsIGR6Om51bWJlcilcblx0e1xuXHRcdGlmICh0aGlzLl9waXZvdCA9PSBudWxsKVxuXHRcdFx0dGhpcy5fcGl2b3QgPSBuZXcgVmVjdG9yM0QoKTtcblxuXHRcdHRoaXMuX3Bpdm90LnggKz0gZHg7XG5cdFx0dGhpcy5fcGl2b3QueSArPSBkeTtcblx0XHR0aGlzLl9waXZvdC56ICs9IGR6O1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlUGl2b3QoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSb3RhdGVzIHRoZSAzZCBvYmplY3QgYXJvdW5kIGl0J3MgbG9jYWwgeC1heGlzXG5cdCAqXG5cdCAqIEBwYXJhbSAgICBhbmdsZSAgICAgICAgVGhlIGFtb3VudCBvZiByb3RhdGlvbiBpbiBkZWdyZWVzXG5cdCAqL1xuXHRwdWJsaWMgcGl0Y2goYW5nbGU6bnVtYmVyKVxuXHR7XG5cdFx0dGhpcy5yb3RhdGUoVmVjdG9yM0QuWF9BWElTLCBhbmdsZSk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXRSZW5kZXJTY2VuZVRyYW5zZm9ybShjYW1lcmE6Q2FtZXJhKTpNYXRyaXgzRFxuXHR7XG5cdFx0aWYgKHRoaXMub3JpZW50YXRpb25Nb2RlID09IE9yaWVudGF0aW9uTW9kZS5DQU1FUkFfUExBTkUpIHtcblx0XHRcdHZhciBjb21wczpBcnJheTxWZWN0b3IzRD4gPSBjYW1lcmEuc2NlbmVUcmFuc2Zvcm0uZGVjb21wb3NlKCk7XG5cdFx0XHR2YXIgc2NhbGU6VmVjdG9yM0QgPSBjb21wc1syXTtcblx0XHRcdGNvbXBzWzBdID0gdGhpcy5zY2VuZVBvc2l0aW9uO1xuXHRcdFx0c2NhbGUueCA9IHRoaXMuX3BTY2FsZVg7XG5cdFx0XHRzY2FsZS55ID0gdGhpcy5fcFNjYWxlWTtcblx0XHRcdHNjYWxlLnogPSB0aGlzLl9wU2NhbGVaO1xuXHRcdFx0dGhpcy5fb3JpZW50YXRpb25NYXRyaXgucmVjb21wb3NlKGNvbXBzKTtcblxuXHRcdFx0Ly9hZGQgaW4gY2FzZSBvZiBwaXZvdFxuXHRcdFx0aWYgKCF0aGlzLl9waXZvdFplcm8gJiYgdGhpcy5hbGlnbm1lbnRNb2RlID09IEFsaWdubWVudE1vZGUuUElWT1RfUE9JTlQpXG5cdFx0XHRcdHRoaXMuX29yaWVudGF0aW9uTWF0cml4LnByZXBlbmRUcmFuc2xhdGlvbigtdGhpcy5fcGl2b3QueC90aGlzLl9wU2NhbGVYLCAtdGhpcy5fcGl2b3QueS90aGlzLl9wU2NhbGVZLCAtdGhpcy5fcGl2b3Quei90aGlzLl9wU2NhbGVaKTtcblxuXHRcdFx0cmV0dXJuIHRoaXMuX29yaWVudGF0aW9uTWF0cml4O1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLnNjZW5lVHJhbnNmb3JtO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJvdGF0ZXMgdGhlIDNkIG9iamVjdCBhcm91bmQgaXQncyBsb2NhbCB6LWF4aXNcblx0ICpcblx0ICogQHBhcmFtICAgIGFuZ2xlICAgICAgICBUaGUgYW1vdW50IG9mIHJvdGF0aW9uIGluIGRlZ3JlZXNcblx0ICovXG5cdHB1YmxpYyByb2xsKGFuZ2xlOm51bWJlcilcblx0e1xuXHRcdHRoaXMucm90YXRlKFZlY3RvcjNELlpfQVhJUywgYW5nbGUpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJvdGF0ZXMgdGhlIDNkIG9iamVjdCBhcm91bmQgYW4gYXhpcyBieSBhIGRlZmluZWQgYW5nbGVcblx0ICpcblx0ICogQHBhcmFtICAgIGF4aXMgICAgICAgIFRoZSB2ZWN0b3IgZGVmaW5pbmcgdGhlIGF4aXMgb2Ygcm90YXRpb25cblx0ICogQHBhcmFtICAgIGFuZ2xlICAgICAgICBUaGUgYW1vdW50IG9mIHJvdGF0aW9uIGluIGRlZ3JlZXNcblx0ICovXG5cdHB1YmxpYyByb3RhdGUoYXhpczpWZWN0b3IzRCwgYW5nbGU6bnVtYmVyKVxuXHR7XG5cdFx0dmFyIG06TWF0cml4M0QgPSBuZXcgTWF0cml4M0QoKTtcblx0XHRtLnByZXBlbmRSb3RhdGlvbihhbmdsZSwgYXhpcyk7XG5cblx0XHR2YXIgdmVjOlZlY3RvcjNEID0gbS5kZWNvbXBvc2UoKVsxXTtcblxuXHRcdHRoaXMuX3JvdGF0aW9uWCArPSB2ZWMueDtcblx0XHR0aGlzLl9yb3RhdGlvblkgKz0gdmVjLnk7XG5cdFx0dGhpcy5fcm90YXRpb25aICs9IHZlYy56O1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlUm90YXRpb24oKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSb3RhdGVzIHRoZSAzZCBvYmplY3QgZGlyZWN0bHkgdG8gYSBldWxlciBhbmdsZVxuXHQgKlxuXHQgKiBAcGFyYW0gICAgYXggICAgICAgIFRoZSBhbmdsZSBpbiBkZWdyZWVzIG9mIHRoZSByb3RhdGlvbiBhcm91bmQgdGhlIHggYXhpcy5cblx0ICogQHBhcmFtICAgIGF5ICAgICAgICBUaGUgYW5nbGUgaW4gZGVncmVlcyBvZiB0aGUgcm90YXRpb24gYXJvdW5kIHRoZSB5IGF4aXMuXG5cdCAqIEBwYXJhbSAgICBheiAgICAgICAgVGhlIGFuZ2xlIGluIGRlZ3JlZXMgb2YgdGhlIHJvdGF0aW9uIGFyb3VuZCB0aGUgeiBheGlzLlxuXHQgKi9cblx0cHVibGljIHJvdGF0ZVRvKGF4Om51bWJlciwgYXk6bnVtYmVyLCBhejpudW1iZXIpXG5cdHtcblx0XHR0aGlzLl9yb3RhdGlvblggPSBheCpNYXRoQ29uc3RzLkRFR1JFRVNfVE9fUkFESUFOUztcblx0XHR0aGlzLl9yb3RhdGlvblkgPSBheSpNYXRoQ29uc3RzLkRFR1JFRVNfVE9fUkFESUFOUztcblx0XHR0aGlzLl9yb3RhdGlvblogPSBheipNYXRoQ29uc3RzLkRFR1JFRVNfVE9fUkFESUFOUztcblxuXHRcdHRoaXMuaW52YWxpZGF0ZVJvdGF0aW9uKCk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyByZW1vdmVFdmVudExpc3RlbmVyKHR5cGU6c3RyaW5nLCBsaXN0ZW5lcjpGdW5jdGlvbilcblx0e1xuXHRcdHN1cGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpO1xuXG5cdFx0aWYgKHRoaXMuaGFzRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikpXG5cdFx0XHRyZXR1cm47XG5cblx0XHRzd2l0Y2ggKHR5cGUpIHtcblx0XHRcdGNhc2UgRGlzcGxheU9iamVjdEV2ZW50LlBPU0lUSU9OX0NIQU5HRUQ6XG5cdFx0XHRcdHRoaXMuX2xpc3RlblRvUG9zaXRpb25DaGFuZ2VkID0gZmFsc2U7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIERpc3BsYXlPYmplY3RFdmVudC5ST1RBVElPTl9DSEFOR0VEOlxuXHRcdFx0XHR0aGlzLl9saXN0ZW5Ub1JvdGF0aW9uQ2hhbmdlZCA9IGZhbHNlO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSBEaXNwbGF5T2JqZWN0RXZlbnQuU0NBTEVfQ0hBTkdFRDpcblx0XHRcdFx0dGhpcy5fbGlzdGVuVG9TY2FsZUNoYW5nZWQgPSBmYWxzZTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIE1vdmVzIHRoZSAzZCBvYmplY3QgYWxvbmcgYSB2ZWN0b3IgYnkgYSBkZWZpbmVkIGxlbmd0aFxuXHQgKlxuXHQgKiBAcGFyYW0gICAgYXhpcyAgICAgICAgVGhlIHZlY3RvciBkZWZpbmluZyB0aGUgYXhpcyBvZiBtb3ZlbWVudFxuXHQgKiBAcGFyYW0gICAgZGlzdGFuY2UgICAgVGhlIGxlbmd0aCBvZiB0aGUgbW92ZW1lbnRcblx0ICovXG5cdHB1YmxpYyB0cmFuc2xhdGUoYXhpczpWZWN0b3IzRCwgZGlzdGFuY2U6bnVtYmVyKVxuXHR7XG5cdFx0dmFyIHg6bnVtYmVyID0gYXhpcy54LCB5Om51bWJlciA9IGF4aXMueSwgejpudW1iZXIgPSBheGlzLno7XG5cdFx0dmFyIGxlbjpudW1iZXIgPSBkaXN0YW5jZS9NYXRoLnNxcnQoeCp4ICsgeSp5ICsgeip6KTtcblxuXHRcdHRoaXMuX3ggKz0geCpsZW47XG5cdFx0dGhpcy5feSArPSB5Kmxlbjtcblx0XHR0aGlzLl96ICs9IHoqbGVuO1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlUG9zaXRpb24oKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBNb3ZlcyB0aGUgM2Qgb2JqZWN0IGFsb25nIGEgdmVjdG9yIGJ5IGEgZGVmaW5lZCBsZW5ndGhcblx0ICpcblx0ICogQHBhcmFtICAgIGF4aXMgICAgICAgIFRoZSB2ZWN0b3IgZGVmaW5pbmcgdGhlIGF4aXMgb2YgbW92ZW1lbnRcblx0ICogQHBhcmFtICAgIGRpc3RhbmNlICAgIFRoZSBsZW5ndGggb2YgdGhlIG1vdmVtZW50XG5cdCAqL1xuXHRwdWJsaWMgdHJhbnNsYXRlTG9jYWwoYXhpczpWZWN0b3IzRCwgZGlzdGFuY2U6bnVtYmVyKVxuXHR7XG5cdFx0dmFyIHg6bnVtYmVyID0gYXhpcy54LCB5Om51bWJlciA9IGF4aXMueSwgejpudW1iZXIgPSBheGlzLno7XG5cdFx0dmFyIGxlbjpudW1iZXIgPSBkaXN0YW5jZS9NYXRoLnNxcnQoeCp4ICsgeSp5ICsgeip6KTtcblxuXHRcdHRoaXMuX2lNYXRyaXgzRC5wcmVwZW5kVHJhbnNsYXRpb24oeCpsZW4sIHkqbGVuLCB6Kmxlbik7XG5cblx0XHR0aGlzLl9tYXRyaXgzRC5jb3B5Q29sdW1uVG8oMywgdGhpcy5fcG9zKTtcblxuXHRcdHRoaXMuX3ggPSB0aGlzLl9wb3MueDtcblx0XHR0aGlzLl95ID0gdGhpcy5fcG9zLnk7XG5cdFx0dGhpcy5feiA9IHRoaXMuX3Bvcy56O1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlUG9zaXRpb24oKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSb3RhdGVzIHRoZSAzZCBvYmplY3QgYXJvdW5kIGl0J3MgbG9jYWwgeS1heGlzXG5cdCAqXG5cdCAqIEBwYXJhbSAgICBhbmdsZSAgICAgICAgVGhlIGFtb3VudCBvZiByb3RhdGlvbiBpbiBkZWdyZWVzXG5cdCAqL1xuXHRwdWJsaWMgeWF3KGFuZ2xlOm51bWJlcilcblx0e1xuXHRcdHRoaXMucm90YXRlKFZlY3RvcjNELllfQVhJUywgYW5nbGUpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHVibGljIF9pQ29udHJvbGxlcjpDb250cm9sbGVyQmFzZTtcblxuXHQvKipcblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IF9pQXNzaWduZWRQYXJ0aXRpb24oKTpQYXJ0aXRpb25cblx0e1xuXHRcdHJldHVybiB0aGlzLl9wSW1wbGljaXRQYXJ0aXRpb247XG5cdH1cblxuXHQvKipcblx0ICogVGhlIHRyYW5zZm9ybWF0aW9uIG9mIHRoZSAzZCBvYmplY3QsIHJlbGF0aXZlIHRvIHRoZSBsb2NhbCBjb29yZGluYXRlcyBvZiB0aGUgcGFyZW50IDxjb2RlPk9iamVjdENvbnRhaW5lcjNEPC9jb2RlPi5cblx0ICpcblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IF9pTWF0cml4M0QoKTpNYXRyaXgzRFxuXHR7XG5cdFx0aWYgKHRoaXMuX21hdHJpeDNERGlydHkpXG5cdFx0XHR0aGlzLl9wVXBkYXRlTWF0cml4M0QoKTtcblxuXHRcdHJldHVybiB0aGlzLl9tYXRyaXgzRDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgX2lNYXRyaXgzRCh2YWw6TWF0cml4M0QpXG5cdHtcblxuXHRcdC8vIFRPRE86IEZyb20gQVMzIC0gRG8gd2Ugc3RpbGwgbmVlZCB0aGlzIGluIEpTID9cblx0XHQvL3JpZGljdWxvdXMgbWF0cml4IGVycm9yXG5cdFx0Lypcblx0XHRpZiAoIXZhbC5yYXdEYXRhWzBdKSB7XG5cblx0XHRcdHZhciByYXc6bnVtYmVyW10gPSBNYXRyaXgzRFV0aWxzLlJBV19EQVRBX0NPTlRBSU5FUjtcblx0XHRcdHZhbC5jb3B5UmF3RGF0YVRvKHJhdyk7XG5cdFx0XHRyYXdbMF0gPSB0aGlzLl9zbWFsbGVzdE51bWJlcjtcblx0XHRcdHZhbC5jb3B5UmF3RGF0YUZyb20ocmF3KTtcblx0XHR9XG5cdFx0Ly8qL1xuXHRcdHZhciBlbGVtZW50czpBcnJheTxWZWN0b3IzRD4gPSB2YWwuZGVjb21wb3NlKCk7XG5cdFx0dmFyIHZlYzpWZWN0b3IzRDtcblxuXHRcdHZlYyA9IGVsZW1lbnRzWzBdO1xuXG5cdFx0aWYgKHRoaXMuX3ggIT0gdmVjLnggfHwgdGhpcy5feSAhPSB2ZWMueSB8fCB0aGlzLl96ICE9IHZlYy56KSB7XG5cdFx0XHR0aGlzLl94ID0gdmVjLng7XG5cdFx0XHR0aGlzLl95ID0gdmVjLnk7XG5cdFx0XHR0aGlzLl96ID0gdmVjLno7XG5cblx0XHRcdHRoaXMuaW52YWxpZGF0ZVBvc2l0aW9uKCk7XG5cdFx0fVxuXG5cdFx0dmVjID0gZWxlbWVudHNbMV07XG5cblx0XHRpZiAodGhpcy5fcm90YXRpb25YICE9IHZlYy54IHx8IHRoaXMuX3JvdGF0aW9uWSAhPSB2ZWMueSB8fCB0aGlzLl9yb3RhdGlvblogIT0gdmVjLnopIHtcblx0XHRcdHRoaXMuX3JvdGF0aW9uWCA9IHZlYy54O1xuXHRcdFx0dGhpcy5fcm90YXRpb25ZID0gdmVjLnk7XG5cdFx0XHR0aGlzLl9yb3RhdGlvblogPSB2ZWMuejtcblxuXHRcdFx0dGhpcy5pbnZhbGlkYXRlUm90YXRpb24oKTtcblx0XHR9XG5cblx0XHR2ZWMgPSBlbGVtZW50c1syXTtcblxuXHRcdGlmICh0aGlzLl9wU2NhbGVYICE9IHZlYy54IHx8IHRoaXMuX3BTY2FsZVkgIT0gdmVjLnkgfHwgdGhpcy5fcFNjYWxlWiAhPSB2ZWMueikge1xuXHRcdFx0dGhpcy5fcFNjYWxlWCA9IHZlYy54O1xuXHRcdFx0dGhpcy5fcFNjYWxlWSA9IHZlYy55O1xuXHRcdFx0dGhpcy5fcFNjYWxlWiA9IHZlYy56O1xuXG5cdFx0XHR0aGlzLmludmFsaWRhdGVTY2FsZSgpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHB1YmxpYyBnZXQgX2lQaWNraW5nQ29sbGlzaW9uVk8oKTpQaWNraW5nQ29sbGlzaW9uVk9cblx0e1xuXHRcdGlmICghdGhpcy5fcFBpY2tpbmdDb2xsaXNpb25WTylcblx0XHRcdHRoaXMuX3BQaWNraW5nQ29sbGlzaW9uVk8gPSBuZXcgUGlja2luZ0NvbGxpc2lvblZPKHRoaXMpO1xuXG5cdFx0cmV0dXJuIHRoaXMuX3BQaWNraW5nQ29sbGlzaW9uVk87XG5cdH1cblxuXHQvKipcblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwdWJsaWMgaVNldFBhcmVudCh2YWx1ZTpEaXNwbGF5T2JqZWN0Q29udGFpbmVyKVxuXHR7XG5cdFx0dGhpcy5fcFBhcmVudCA9IHZhbHVlO1xuXG5cdFx0aWYgKHZhbHVlKSB7XG5cdFx0XHR0aGlzLl9wVXBkYXRlSW1wbGljaXRNb3VzZUVuYWJsZWQodmFsdWUubW91c2VDaGlsZHJlbik7XG5cdFx0XHR0aGlzLl9wVXBkYXRlSW1wbGljaXRWaXNpYmlsaXR5KHZhbHVlLl9pSXNWaXNpYmxlKCkpO1xuXHRcdFx0dGhpcy5fcFVwZGF0ZUltcGxpY2l0UGFydGl0aW9uKHZhbHVlLl9pQXNzaWduZWRQYXJ0aXRpb24sIHZhbHVlLl9wU2NlbmUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9wVXBkYXRlSW1wbGljaXRNb3VzZUVuYWJsZWQodHJ1ZSk7XG5cdFx0XHR0aGlzLl9wVXBkYXRlSW1wbGljaXRWaXNpYmlsaXR5KHRydWUpO1xuXHRcdFx0dGhpcy5fcFVwZGF0ZUltcGxpY2l0UGFydGl0aW9uKG51bGwsIG51bGwpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBAcHJvdGVjdGVkXG5cdCAqL1xuXHRwdWJsaWMgcEludmFsaWRhdGVTY2VuZVRyYW5zZm9ybSgpXG5cdHtcblx0XHR0aGlzLl9wU2NlbmVUcmFuc2Zvcm1EaXJ0eSA9ICF0aGlzLl9wSWdub3JlVHJhbnNmb3JtO1xuXHRcdHRoaXMuX2ludmVyc2VTY2VuZVRyYW5zZm9ybURpcnR5ID0gIXRoaXMuX3BJZ25vcmVUcmFuc2Zvcm07XG5cdFx0dGhpcy5fc2NlbmVQb3NpdGlvbkRpcnR5ID0gIXRoaXMuX3BJZ25vcmVUcmFuc2Zvcm07XG5cblx0XHRpZiAodGhpcy5pc0VudGl0eSlcblx0XHRcdHRoaXMuaW52YWxpZGF0ZVBhcnRpdGlvbigpO1xuXG5cdFx0aWYgKHRoaXMuX2xpc3RlblRvU2NlbmVUcmFuc2Zvcm1DaGFuZ2VkKVxuXHRcdFx0dGhpcy5ub3RpZnlTY2VuZVRyYW5zZm9ybUNoYW5nZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwcm90ZWN0ZWRcblx0ICovXG5cdHB1YmxpYyBfcFVwZGF0ZUltcGxpY2l0TW91c2VFbmFibGVkKHZhbHVlOmJvb2xlYW4pXG5cdHtcblx0XHR0aGlzLl9wSW1wbGljaXRNb3VzZUVuYWJsZWQgPSB0aGlzLl9leHBsaWNpdE1vdXNlRW5hYmxlZCAmJiB2YWx1ZTtcblxuXHRcdC8vIElmIHRoZXJlIGlzIGEgcGFyZW50IGFuZCB0aGlzIGNoaWxkIGRvZXMgbm90IGhhdmUgYSBwaWNraW5nIGNvbGxpZGVyLCB1c2UgaXRzIHBhcmVudCdzIHBpY2tpbmcgY29sbGlkZXIuXG5cdFx0aWYgKHRoaXMuX3BJbXBsaWNpdE1vdXNlRW5hYmxlZCAmJiB0aGlzLl9wUGFyZW50ICYmICF0aGlzLl9wUGlja2luZ0NvbGxpZGVyKVxuXHRcdFx0dGhpcy5fcFBpY2tpbmdDb2xsaWRlciA9ICB0aGlzLl9wUGFyZW50Ll9wUGlja2luZ0NvbGxpZGVyO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwcm90ZWN0ZWRcblx0ICovXG5cdHB1YmxpYyBfcFVwZGF0ZUltcGxpY2l0UGFydGl0aW9uKHBhcnRpdGlvbjpQYXJ0aXRpb24sIHNjZW5lOlNjZW5lKVxuXHR7XG5cdFx0dmFyIHNjZW5lQ2hhbmdlZDpib29sZWFuID0gdGhpcy5fcFNjZW5lICE9IHNjZW5lO1xuXG5cdFx0aWYgKHNjZW5lQ2hhbmdlZCAmJiB0aGlzLl9wU2NlbmUpXG5cdFx0XHR0aGlzLl9wU2NlbmUuZGlzcGF0Y2hFdmVudChuZXcgU2NlbmVFdmVudChTY2VuZUV2ZW50LlJFTU9WRURfRlJPTV9TQ0VORSwgdGhpcykpO1xuXG5cdFx0aWYgKHRoaXMuX3BTY2VuZSAmJiB0aGlzLl9wSW1wbGljaXRQYXJ0aXRpb24pIHtcblx0XHRcdC8vdW5yZWdpc3RlciBwYXJ0aXRpb24gZnJvbSBjdXJyZW50IHNjZW5lXG5cdFx0XHR0aGlzLl9wU2NlbmUuX2lVbnJlZ2lzdGVyUGFydGl0aW9uKHRoaXMuX3BJbXBsaWNpdFBhcnRpdGlvbik7XG5cblx0XHRcdC8vdW5yZWdpc3RlciBlbnRpdHkgZnJvbSBjdXJyZW50IHBhcnRpdGlvblxuXHRcdFx0aWYgKHRoaXMuX3BJc0VudGl0eSlcblx0XHRcdFx0dGhpcy5fcFVucmVnaXN0ZXJFbnRpdHkodGhpcy5fcEltcGxpY2l0UGFydGl0aW9uKTtcblx0XHR9XG5cblx0XHQvLyBhc3NpZ24gcGFyZW50IGltcGxpY2l0IHBhcnRpdGlvbiBpZiBubyBleHBsaWNpdCBvbmUgaXMgZ2l2ZW5cblx0XHR0aGlzLl9wSW1wbGljaXRQYXJ0aXRpb24gPSB0aGlzLl9leHBsaWNpdFBhcnRpdGlvbiB8fCBwYXJ0aXRpb247XG5cblx0XHQvL2Fzc2lnbiBzY2VuZVxuXHRcdGlmIChzY2VuZUNoYW5nZWQpXG5cdFx0XHR0aGlzLl9wU2NlbmUgPSBzY2VuZTtcblxuXHRcdGlmICh0aGlzLl9wU2NlbmUgJiYgdGhpcy5fcEltcGxpY2l0UGFydGl0aW9uKSB7XG5cdFx0XHQvL3JlZ2lzdGVyIHBhcnRpdGlvbiB3aXRoIHNjZW5lXG5cdFx0XHR0aGlzLl9wU2NlbmUuX2lSZWdpc3RlclBhcnRpdGlvbih0aGlzLl9wSW1wbGljaXRQYXJ0aXRpb24pO1xuXG5cdFx0XHQvL3JlZ2lzdGVyIGVudGl0eSB3aXRoIG5ldyBwYXJ0aXRpb25cblx0XHRcdGlmICh0aGlzLl9wSXNFbnRpdHkpXG5cdFx0XHRcdHRoaXMuX3BSZWdpc3RlckVudGl0eSh0aGlzLl9wSW1wbGljaXRQYXJ0aXRpb24pO1xuXHRcdH1cblxuXHRcdGlmIChzY2VuZUNoYW5nZWQgJiYgdGhpcy5fcFNjZW5lKVxuXHRcdFx0dGhpcy5fcFNjZW5lLmRpc3BhdGNoRXZlbnQobmV3IFNjZW5lRXZlbnQoU2NlbmVFdmVudC5BRERFRF9UT19TQ0VORSwgdGhpcykpO1xuXG5cdFx0aWYgKHNjZW5lQ2hhbmdlZCkge1xuXHRcdFx0aWYgKCF0aGlzLl9wU2NlbmVUcmFuc2Zvcm1EaXJ0eSAmJiAhdGhpcy5fcElnbm9yZVRyYW5zZm9ybSlcblx0XHRcdFx0dGhpcy5wSW52YWxpZGF0ZVNjZW5lVHJhbnNmb3JtKCk7XG5cblx0XHRcdGlmICh0aGlzLl9saXN0ZW5Ub1NjZW5lQ2hhbmdlZClcblx0XHRcdFx0dGhpcy5ub3RpZnlTY2VuZUNoYW5nZSgpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBAcHJvdGVjdGVkXG5cdCAqL1xuXHRwdWJsaWMgX3BVcGRhdGVJbXBsaWNpdFZpc2liaWxpdHkodmFsdWU6Ym9vbGVhbilcblx0e1xuXHRcdHRoaXMuX3BJbXBsaWNpdFZpc2liaWxpdHkgPSB0aGlzLl9leHBsaWNpdFZpc2liaWxpdHkgJiYgdmFsdWU7XG5cdH1cblxuXHQvKipcblx0ICogQHByb3RlY3RlZFxuXHQgKi9cblx0cHVibGljIF9wVXBkYXRlTWF0cml4M0QoKVxuXHR7XG5cblx0XHR0aGlzLl9wb3MueCA9IHRoaXMuX3g7XG5cdFx0dGhpcy5fcG9zLnkgPSB0aGlzLl95O1xuXHRcdHRoaXMuX3Bvcy56ID0gdGhpcy5fejtcblxuXHRcdHRoaXMuX3JvdC54ID0gdGhpcy5fcm90YXRpb25YO1xuXHRcdHRoaXMuX3JvdC55ID0gdGhpcy5fcm90YXRpb25ZO1xuXHRcdHRoaXMuX3JvdC56ID0gdGhpcy5fcm90YXRpb25aO1xuXG5cdFx0dGhpcy5fc2NhLnggPSB0aGlzLl9wU2NhbGVYO1xuXHRcdHRoaXMuX3NjYS55ID0gdGhpcy5fcFNjYWxlWTtcblx0XHR0aGlzLl9zY2EueiA9IHRoaXMuX3BTY2FsZVo7XG5cblx0XHR0aGlzLl9tYXRyaXgzRC5yZWNvbXBvc2UodGhpcy5fdHJhbnNmb3JtQ29tcG9uZW50cyk7XG5cblx0XHRpZiAoIXRoaXMuX3Bpdm90WmVybykge1xuXHRcdFx0dGhpcy5fcGl2b3RTY2FsZS54ID0gdGhpcy5fcGl2b3QueC90aGlzLl9wU2NhbGVYO1xuXHRcdFx0dGhpcy5fcGl2b3RTY2FsZS55ID0gdGhpcy5fcGl2b3QueS90aGlzLl9wU2NhbGVZO1xuXHRcdFx0dGhpcy5fcGl2b3RTY2FsZS56ID0gdGhpcy5fcGl2b3Quei90aGlzLl9wU2NhbGVaO1xuXHRcdFx0dGhpcy5fbWF0cml4M0QucHJlcGVuZFRyYW5zbGF0aW9uKC10aGlzLl9waXZvdFNjYWxlLngsIC10aGlzLl9waXZvdFNjYWxlLnksIC10aGlzLl9waXZvdFNjYWxlLnopO1xuXHRcdFx0aWYgKHRoaXMuYWxpZ25tZW50TW9kZSAhPSBBbGlnbm1lbnRNb2RlLlBJVk9UX1BPSU5UKVxuXHRcdFx0XHR0aGlzLl9tYXRyaXgzRC5hcHBlbmRUcmFuc2xhdGlvbih0aGlzLl9waXZvdC54LCB0aGlzLl9waXZvdC55LCB0aGlzLl9waXZvdC56KTtcblx0XHR9XG5cblx0XHR0aGlzLl9tYXRyaXgzRERpcnR5ID0gZmFsc2U7XG5cdFx0dGhpcy5fcG9zaXRpb25EaXJ0eSA9IGZhbHNlO1xuXHRcdHRoaXMuX3JvdGF0aW9uRGlydHkgPSBmYWxzZTtcblx0XHR0aGlzLl9zY2FsZURpcnR5ID0gZmFsc2U7XG5cdFx0dGhpcy5fcGl2b3REaXJ0eSA9IGZhbHNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwcm90ZWN0ZWRcblx0ICovXG5cdHB1YmxpYyBwVXBkYXRlU2NlbmVUcmFuc2Zvcm0oKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3BQYXJlbnQgJiYgIXRoaXMuX3BQYXJlbnQuX2lJc1Jvb3QpIHtcblx0XHRcdHRoaXMuX3BTY2VuZVRyYW5zZm9ybS5jb3B5RnJvbSh0aGlzLl9wUGFyZW50LnNjZW5lVHJhbnNmb3JtKTtcblx0XHRcdHRoaXMuX3BTY2VuZVRyYW5zZm9ybS5wcmVwZW5kKHRoaXMuX2lNYXRyaXgzRCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX3BTY2VuZVRyYW5zZm9ybS5jb3B5RnJvbSh0aGlzLl9pTWF0cml4M0QpO1xuXHRcdH1cblxuXHRcdHRoaXMuX3BTY2VuZVRyYW5zZm9ybURpcnR5ID0gZmFsc2U7XG5cdH1cblxuXHRwdWJsaWMgX2lBZGRSZW5kZXJhYmxlKHJlbmRlcmFibGU6SVJlbmRlcmFibGUpOklSZW5kZXJhYmxlXG5cdHtcblx0XHR0aGlzLl9wUmVuZGVyYWJsZXMucHVzaChyZW5kZXJhYmxlKTtcblxuXHRcdHJldHVybiByZW5kZXJhYmxlO1xuXHR9XG5cblxuXHRwdWJsaWMgX2lSZW1vdmVSZW5kZXJhYmxlKHJlbmRlcmFibGU6SVJlbmRlcmFibGUpOklSZW5kZXJhYmxlXG5cdHtcblx0XHR2YXIgaW5kZXg6bnVtYmVyID0gdGhpcy5fcFJlbmRlcmFibGVzLmluZGV4T2YocmVuZGVyYWJsZSk7XG5cblx0XHR0aGlzLl9wUmVuZGVyYWJsZXMuc3BsaWNlKGluZGV4LCAxKTtcblxuXHRcdHJldHVybiByZW5kZXJhYmxlO1xuXHR9XG5cblx0LyoqXG5cdCAqIC8vVE9ET1xuXHQgKlxuXHQgKiBAcGFyYW0gc2hvcnRlc3RDb2xsaXNpb25EaXN0YW5jZVxuXHQgKiBAcGFyYW0gZmluZENsb3Nlc3Rcblx0ICogQHJldHVybnMge2Jvb2xlYW59XG5cdCAqXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHVibGljIF9pVGVzdENvbGxpc2lvbihzaG9ydGVzdENvbGxpc2lvbkRpc3RhbmNlOm51bWJlciwgZmluZENsb3Nlc3Q6Ym9vbGVhbik6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgX2lJbnRlcm5hbFVwZGF0ZSgpXG5cdHtcblx0XHRpZiAodGhpcy5faUNvbnRyb2xsZXIpXG5cdFx0XHR0aGlzLl9pQ29udHJvbGxlci51cGRhdGUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHB1YmxpYyBfaUlzVmlzaWJsZSgpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9wSW1wbGljaXRWaXNpYmlsaXR5O1xuXHR9XG5cblx0LyoqXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHVibGljIF9pSXNNb3VzZUVuYWJsZWQoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcEltcGxpY2l0TW91c2VFbmFibGVkO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHVibGljIF9pU2V0U2NlbmUodmFsdWU6U2NlbmUpXG5cdHtcblx0XHRpZiAodGhpcy5fcFNjZW5lID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fcFVwZGF0ZUltcGxpY2l0UGFydGl0aW9uKHRoaXMuX3BQYXJlbnQ/IHRoaXMuX3BQYXJlbnQuX2lBc3NpZ25lZFBhcnRpdGlvbiA6IG51bGwsIHZhbHVlKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0cHJpdmF0ZSBub3RpZnlQb3NpdGlvbkNoYW5nZWQoKVxuXHR7XG5cdFx0aWYgKCF0aGlzLl9wb3NpdGlvbkNoYW5nZWQpXG5cdFx0XHR0aGlzLl9wb3NpdGlvbkNoYW5nZWQgPSBuZXcgRGlzcGxheU9iamVjdEV2ZW50KERpc3BsYXlPYmplY3RFdmVudC5QT1NJVElPTl9DSEFOR0VELCB0aGlzKTtcblxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCh0aGlzLl9wb3NpdGlvbkNoYW5nZWQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRwcml2YXRlIG5vdGlmeVJvdGF0aW9uQ2hhbmdlZCgpXG5cdHtcblx0XHRpZiAoIXRoaXMuX3JvdGF0aW9uQ2hhbmdlZClcblx0XHRcdHRoaXMuX3JvdGF0aW9uQ2hhbmdlZCA9IG5ldyBEaXNwbGF5T2JqZWN0RXZlbnQoRGlzcGxheU9iamVjdEV2ZW50LlJPVEFUSU9OX0NIQU5HRUQsIHRoaXMpO1xuXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KHRoaXMuX3JvdGF0aW9uQ2hhbmdlZCk7XG5cdH1cblxuXHQvKipcblx0ICogQHByaXZhdGVcblx0ICovXG5cdHByaXZhdGUgbm90aWZ5U2NhbGVDaGFuZ2VkKClcblx0e1xuXHRcdGlmICghdGhpcy5fc2NhbGVDaGFuZ2VkKVxuXHRcdFx0dGhpcy5fc2NhbGVDaGFuZ2VkID0gbmV3IERpc3BsYXlPYmplY3RFdmVudChEaXNwbGF5T2JqZWN0RXZlbnQuU0NBTEVfQ0hBTkdFRCwgdGhpcyk7XG5cblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQodGhpcy5fc2NhbGVDaGFuZ2VkKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0cHJpdmF0ZSBub3RpZnlTY2VuZUNoYW5nZSgpXG5cdHtcblx0XHRpZiAoIXRoaXMuX3NjZW5lY2hhbmdlZClcblx0XHRcdHRoaXMuX3NjZW5lY2hhbmdlZCA9IG5ldyBEaXNwbGF5T2JqZWN0RXZlbnQoRGlzcGxheU9iamVjdEV2ZW50LlNDRU5FX0NIQU5HRUQsIHRoaXMpO1xuXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KHRoaXMuX3NjZW5lY2hhbmdlZCk7XG59XG5cblx0LyoqXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRwcml2YXRlIG5vdGlmeVNjZW5lVHJhbnNmb3JtQ2hhbmdlKClcblx0e1xuXHRcdGlmICghdGhpcy5fc2NlbmVUcmFuc2Zvcm1DaGFuZ2VkKVxuXHRcdFx0dGhpcy5fc2NlbmVUcmFuc2Zvcm1DaGFuZ2VkID0gbmV3IERpc3BsYXlPYmplY3RFdmVudChEaXNwbGF5T2JqZWN0RXZlbnQuU0NFTkVUUkFOU0ZPUk1fQ0hBTkdFRCwgdGhpcyk7XG5cblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQodGhpcy5fc2NlbmVUcmFuc2Zvcm1DaGFuZ2VkKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbnZhbGlkYXRlcyB0aGUgM0QgdHJhbnNmb3JtYXRpb24gbWF0cml4LCBjYXVzaW5nIGl0IHRvIGJlIHVwZGF0ZWQgdXBvbiB0aGUgbmV4dCByZXF1ZXN0XG5cdCAqXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRwcml2YXRlIGludmFsaWRhdGVNYXRyaXgzRCgpOnZvaWRcblx0e1xuXHRcdGlmICh0aGlzLl9tYXRyaXgzRERpcnR5KVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fbWF0cml4M0REaXJ0eSA9IHRydWU7XG5cblx0XHRpZiAoIXRoaXMuX3BTY2VuZVRyYW5zZm9ybURpcnR5ICYmICF0aGlzLl9wSWdub3JlVHJhbnNmb3JtKVxuXHRcdFx0dGhpcy5wSW52YWxpZGF0ZVNjZW5lVHJhbnNmb3JtKCk7XG5cdH1cblxuXHQvKipcblx0ICogQHByaXZhdGVcblx0ICovXG5cdHB1YmxpYyBpbnZhbGlkYXRlUGFydGl0aW9uKClcblx0e1xuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fZW50aXR5Tm9kZXMubGVuZ3RoO1xuXHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IGxlbjsgaSsrKVxuXHRcdFx0dGhpcy5fZW50aXR5Tm9kZXNbaV0uaW52YWxpZGF0ZVBhcnRpdGlvbigpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRwcml2YXRlIGludmFsaWRhdGVQaXZvdCgpXG5cdHtcblx0XHR0aGlzLl9waXZvdFplcm8gPSAodGhpcy5fcGl2b3QueCA9PSAwKSAmJiAodGhpcy5fcGl2b3QueSA9PSAwKSAmJiAodGhpcy5fcGl2b3QueiA9PSAwKTtcblxuXHRcdGlmICh0aGlzLl9waXZvdERpcnR5KVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fcGl2b3REaXJ0eSA9IHRydWU7XG5cblx0XHR0aGlzLmludmFsaWRhdGVNYXRyaXgzRCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRwcml2YXRlIGludmFsaWRhdGVQb3NpdGlvbigpXG5cdHtcblx0XHRpZiAodGhpcy5fcG9zaXRpb25EaXJ0eSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3Bvc2l0aW9uRGlydHkgPSB0cnVlO1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlTWF0cml4M0QoKTtcblxuXHRcdGlmICh0aGlzLl9saXN0ZW5Ub1Bvc2l0aW9uQ2hhbmdlZClcblx0XHRcdHRoaXMubm90aWZ5UG9zaXRpb25DaGFuZ2VkKCk7XG5cdH1cblxuXHQvKipcblx0ICogQHByaXZhdGVcblx0ICovXG5cdHByaXZhdGUgaW52YWxpZGF0ZVJvdGF0aW9uKClcblx0e1xuXHRcdGlmICh0aGlzLl9yb3RhdGlvbkRpcnR5KVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fcm90YXRpb25EaXJ0eSA9IHRydWU7XG5cblx0XHR0aGlzLmludmFsaWRhdGVNYXRyaXgzRCgpO1xuXG5cdFx0aWYgKHRoaXMuX2xpc3RlblRvUm90YXRpb25DaGFuZ2VkKVxuXHRcdFx0dGhpcy5ub3RpZnlSb3RhdGlvbkNoYW5nZWQoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0cHJpdmF0ZSBpbnZhbGlkYXRlU2NhbGUoKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3NjYWxlRGlydHkpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9zY2FsZURpcnR5ID0gdHJ1ZTtcblxuXHRcdHRoaXMuaW52YWxpZGF0ZU1hdHJpeDNEKCk7XG5cblx0XHRpZiAodGhpcy5fbGlzdGVuVG9TY2FsZUNoYW5nZWQpXG5cdFx0XHR0aGlzLm5vdGlmeVNjYWxlQ2hhbmdlZCgpO1xuXHR9XG5cblxuXHRwdWJsaWMgX2lBZGRFbnRpdHlOb2RlKGVudGl0eU5vZGU6RW50aXR5Tm9kZSk6RW50aXR5Tm9kZVxuXHR7XG5cdFx0dGhpcy5fZW50aXR5Tm9kZXMucHVzaChlbnRpdHlOb2RlKTtcblxuXHRcdHJldHVybiBlbnRpdHlOb2RlO1xuXHR9XG5cblxuXHRwdWJsaWMgX2lSZW1vdmVFbnRpdHlOb2RlKGVudGl0eU5vZGU6RW50aXR5Tm9kZSk6RW50aXR5Tm9kZVxuXHR7XG5cdFx0dmFyIGluZGV4Om51bWJlciA9IHRoaXMuX2VudGl0eU5vZGVzLmluZGV4T2YoZW50aXR5Tm9kZSk7XG5cblx0XHR0aGlzLl9lbnRpdHlOb2Rlcy5zcGxpY2UoaW5kZXgsIDEpO1xuXG5cdFx0cmV0dXJuIGVudGl0eU5vZGU7XG5cdH1cblxuXHRwdWJsaWMgX3BSZWdpc3RlckVudGl0eShwYXJ0aXRpb246UGFydGl0aW9uKVxuXHR7XG5cdFx0dGhyb3cgbmV3IEFic3RyYWN0TWV0aG9kRXJyb3IoKTtcblx0fVxuXG5cdHB1YmxpYyBfcFVucmVnaXN0ZXJFbnRpdHkocGFydGl0aW9uOlBhcnRpdGlvbilcblx0e1xuXHRcdHRocm93IG5ldyBBYnN0cmFjdE1ldGhvZEVycm9yKCk7XG5cdH1cblxuXHRwdWJsaWMgX3BJbnZhbGlkYXRlQm91bmRzKClcblx0e1xuXHRcdHRoaXMuX2JveEJvdW5kc0ludmFsaWQgPSB0cnVlO1xuXHRcdHRoaXMuX3NwaGVyZUJvdW5kc0ludmFsaWQgPSB0cnVlO1xuXG5cdFx0aWYgKHRoaXMuaXNFbnRpdHkpXG5cdFx0XHR0aGlzLmludmFsaWRhdGVQYXJ0aXRpb24oKTtcblx0fVxuXHRcblx0cHVibGljIF9wVXBkYXRlQm94Qm91bmRzKClcblx0e1xuXHRcdHRoaXMuX2JveEJvdW5kc0ludmFsaWQgPSBmYWxzZTtcblx0XHRcblx0XHRpZiAodGhpcy5fcEJveEJvdW5kcyA9PSBudWxsKVxuXHRcdFx0dGhpcy5fcEJveEJvdW5kcyA9IG5ldyBCb3goKTtcblx0fVxuXG5cdHB1YmxpYyBfcFVwZGF0ZVNwaGVyZUJvdW5kcygpXG5cdHtcblx0XHR0aGlzLl9zcGhlcmVCb3VuZHNJbnZhbGlkID0gZmFsc2U7XG5cblx0XHRpZiAodGhpcy5fcFNwaGVyZUJvdW5kcyA9PSBudWxsKVxuXHRcdFx0dGhpcy5fcFNwaGVyZUJvdW5kcyA9IG5ldyBTcGhlcmUoKTtcblx0fVxufVxuXG5leHBvcnQgPSBEaXNwbGF5T2JqZWN0OyJdfQ==