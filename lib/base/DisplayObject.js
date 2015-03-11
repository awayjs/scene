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
        this._iMaskID = -1;
        this._iMasks = null;
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
        clone._iMaskID = this._iMaskID;
        clone._iMasks = this._iMasks ? this._iMasks.concat() : null;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0Rpc3BsYXlPYmplY3QudHMiXSwibmFtZXMiOlsiRGlzcGxheU9iamVjdCIsIkRpc3BsYXlPYmplY3QuY29uc3RydWN0b3IiLCJEaXNwbGF5T2JqZWN0LmJvdW5kc1R5cGUiLCJEaXNwbGF5T2JqZWN0LmRlcHRoIiwiRGlzcGxheU9iamVjdC5ldWxlcnMiLCJEaXNwbGF5T2JqZWN0LmhlaWdodCIsIkRpc3BsYXlPYmplY3QuaW5kZXgiLCJEaXNwbGF5T2JqZWN0LmludmVyc2VTY2VuZVRyYW5zZm9ybSIsIkRpc3BsYXlPYmplY3QuaWdub3JlVHJhbnNmb3JtIiwiRGlzcGxheU9iamVjdC5pc0VudGl0eSIsIkRpc3BsYXlPYmplY3QubG9hZGVySW5mbyIsIkRpc3BsYXlPYmplY3QubW91c2VFbmFibGVkIiwiRGlzcGxheU9iamVjdC5tb3VzZVgiLCJEaXNwbGF5T2JqZWN0Lm1vdXNlWSIsIkRpc3BsYXlPYmplY3QucGFyZW50IiwiRGlzcGxheU9iamVjdC5wYXJ0aXRpb24iLCJEaXNwbGF5T2JqZWN0LnBpY2tpbmdDb2xsaWRlciIsIkRpc3BsYXlPYmplY3QucGl2b3QiLCJEaXNwbGF5T2JqZWN0LnJvb3QiLCJEaXNwbGF5T2JqZWN0LnJvdGF0aW9uWCIsIkRpc3BsYXlPYmplY3Qucm90YXRpb25ZIiwiRGlzcGxheU9iamVjdC5yb3RhdGlvbloiLCJEaXNwbGF5T2JqZWN0LnNjYWxlWCIsIkRpc3BsYXlPYmplY3Quc2NhbGVZIiwiRGlzcGxheU9iamVjdC5zY2FsZVoiLCJEaXNwbGF5T2JqZWN0LnNjZW5lIiwiRGlzcGxheU9iamVjdC5zY2VuZVBvc2l0aW9uIiwiRGlzcGxheU9iamVjdC5zY2VuZVRyYW5zZm9ybSIsIkRpc3BsYXlPYmplY3Quc2hhZGVyUGlja2luZ0RldGFpbHMiLCJEaXNwbGF5T2JqZWN0LmRlYnVnVmlzaWJsZSIsIkRpc3BsYXlPYmplY3QudHJhbnNmb3JtIiwiRGlzcGxheU9iamVjdC52aXNpYmxlIiwiRGlzcGxheU9iamVjdC53aWR0aCIsIkRpc3BsYXlPYmplY3QueCIsIkRpc3BsYXlPYmplY3QueSIsIkRpc3BsYXlPYmplY3QueiIsIkRpc3BsYXlPYmplY3Quek9mZnNldCIsIkRpc3BsYXlPYmplY3QuYWRkRXZlbnRMaXN0ZW5lciIsIkRpc3BsYXlPYmplY3QuY2xvbmUiLCJEaXNwbGF5T2JqZWN0LmRpc3Bvc2UiLCJEaXNwbGF5T2JqZWN0LmRpc3Bvc2VBc3NldCIsIkRpc3BsYXlPYmplY3QuZ2V0Qm91bmRzIiwiRGlzcGxheU9iamVjdC5nZXRSZWN0IiwiRGlzcGxheU9iamVjdC5nZXRCb3giLCJEaXNwbGF5T2JqZWN0LmdldFNwaGVyZSIsIkRpc3BsYXlPYmplY3QuZ2xvYmFsVG9Mb2NhbCIsIkRpc3BsYXlPYmplY3QuZ2xvYmFsVG9Mb2NhbDNEIiwiRGlzcGxheU9iamVjdC5oaXRUZXN0T2JqZWN0IiwiRGlzcGxheU9iamVjdC5oaXRUZXN0UG9pbnQiLCJEaXNwbGF5T2JqZWN0Lmxvb2tBdCIsIkRpc3BsYXlPYmplY3QubG9jYWxUb0dsb2JhbCIsIkRpc3BsYXlPYmplY3QubG9jYWxUb0dsb2JhbDNEIiwiRGlzcGxheU9iamVjdC5tb3ZlVG8iLCJEaXNwbGF5T2JqZWN0Lm1vdmVQaXZvdCIsIkRpc3BsYXlPYmplY3QucGl0Y2giLCJEaXNwbGF5T2JqZWN0LmdldFJlbmRlclNjZW5lVHJhbnNmb3JtIiwiRGlzcGxheU9iamVjdC5yb2xsIiwiRGlzcGxheU9iamVjdC5yb3RhdGUiLCJEaXNwbGF5T2JqZWN0LnJvdGF0ZVRvIiwiRGlzcGxheU9iamVjdC5yZW1vdmVFdmVudExpc3RlbmVyIiwiRGlzcGxheU9iamVjdC50cmFuc2xhdGUiLCJEaXNwbGF5T2JqZWN0LnRyYW5zbGF0ZUxvY2FsIiwiRGlzcGxheU9iamVjdC55YXciLCJEaXNwbGF5T2JqZWN0Ll9pQXNzaWduZWRQYXJ0aXRpb24iLCJEaXNwbGF5T2JqZWN0Ll9pTWF0cml4M0QiLCJEaXNwbGF5T2JqZWN0Ll9pUGlja2luZ0NvbGxpc2lvblZPIiwiRGlzcGxheU9iamVjdC5pU2V0UGFyZW50IiwiRGlzcGxheU9iamVjdC5wSW52YWxpZGF0ZVNjZW5lVHJhbnNmb3JtIiwiRGlzcGxheU9iamVjdC5fcFVwZGF0ZUltcGxpY2l0TW91c2VFbmFibGVkIiwiRGlzcGxheU9iamVjdC5fcFVwZGF0ZUltcGxpY2l0UGFydGl0aW9uIiwiRGlzcGxheU9iamVjdC5fcFVwZGF0ZUltcGxpY2l0VmlzaWJpbGl0eSIsIkRpc3BsYXlPYmplY3QuX3BVcGRhdGVNYXRyaXgzRCIsIkRpc3BsYXlPYmplY3QucFVwZGF0ZVNjZW5lVHJhbnNmb3JtIiwiRGlzcGxheU9iamVjdC5faUFkZFJlbmRlcmFibGUiLCJEaXNwbGF5T2JqZWN0Ll9pUmVtb3ZlUmVuZGVyYWJsZSIsIkRpc3BsYXlPYmplY3QuX2lUZXN0Q29sbGlzaW9uIiwiRGlzcGxheU9iamVjdC5faUludGVybmFsVXBkYXRlIiwiRGlzcGxheU9iamVjdC5faUlzVmlzaWJsZSIsIkRpc3BsYXlPYmplY3QuX2lJc01vdXNlRW5hYmxlZCIsIkRpc3BsYXlPYmplY3QuX2lTZXRTY2VuZSIsIkRpc3BsYXlPYmplY3Qubm90aWZ5UG9zaXRpb25DaGFuZ2VkIiwiRGlzcGxheU9iamVjdC5ub3RpZnlSb3RhdGlvbkNoYW5nZWQiLCJEaXNwbGF5T2JqZWN0Lm5vdGlmeVNjYWxlQ2hhbmdlZCIsIkRpc3BsYXlPYmplY3Qubm90aWZ5U2NlbmVDaGFuZ2UiLCJEaXNwbGF5T2JqZWN0Lm5vdGlmeVNjZW5lVHJhbnNmb3JtQ2hhbmdlIiwiRGlzcGxheU9iamVjdC5pbnZhbGlkYXRlTWF0cml4M0QiLCJEaXNwbGF5T2JqZWN0LmludmFsaWRhdGVQYXJ0aXRpb24iLCJEaXNwbGF5T2JqZWN0LmludmFsaWRhdGVQaXZvdCIsIkRpc3BsYXlPYmplY3QuaW52YWxpZGF0ZVBvc2l0aW9uIiwiRGlzcGxheU9iamVjdC5pbnZhbGlkYXRlUm90YXRpb24iLCJEaXNwbGF5T2JqZWN0LmludmFsaWRhdGVTY2FsZSIsIkRpc3BsYXlPYmplY3QuX2lBZGRFbnRpdHlOb2RlIiwiRGlzcGxheU9iamVjdC5faVJlbW92ZUVudGl0eU5vZGUiLCJEaXNwbGF5T2JqZWN0Ll9wUmVnaXN0ZXJFbnRpdHkiLCJEaXNwbGF5T2JqZWN0Ll9wVW5yZWdpc3RlckVudGl0eSIsIkRpc3BsYXlPYmplY3QuX3BJbnZhbGlkYXRlQm91bmRzIiwiRGlzcGxheU9iamVjdC5fcFVwZGF0ZUJveEJvdW5kcyIsIkRpc3BsYXlPYmplY3QuX3BVcGRhdGVTcGhlcmVCb3VuZHMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLElBQU8sR0FBRyxXQUFpQiwwQkFBMEIsQ0FBQyxDQUFDO0FBQ3ZELElBQU8sTUFBTSxXQUFnQiw2QkFBNkIsQ0FBQyxDQUFDO0FBQzVELElBQU8sVUFBVSxXQUFlLGlDQUFpQyxDQUFDLENBQUM7QUFDbkUsSUFBTyxRQUFRLFdBQWdCLCtCQUErQixDQUFDLENBQUM7QUFDaEUsSUFBTyxhQUFhLFdBQWMsb0NBQW9DLENBQUMsQ0FBQztBQUN4RSxJQUFPLEtBQUssV0FBZ0IsNEJBQTRCLENBQUMsQ0FBQztBQUUxRCxJQUFPLFFBQVEsV0FBZ0IsK0JBQStCLENBQUMsQ0FBQztBQUNoRSxJQUFPLFNBQVMsV0FBZSxtQ0FBbUMsQ0FBQyxDQUFDO0FBQ3BFLElBQU8sbUJBQW1CLFdBQWEsNENBQTRDLENBQUMsQ0FBQztBQUtyRixJQUFPLGFBQWEsV0FBYyx1Q0FBdUMsQ0FBQyxDQUFDO0FBRTNFLElBQU8sZUFBZSxXQUFjLHlDQUF5QyxDQUFDLENBQUM7QUFFL0UsSUFBTyxTQUFTLFdBQWUsbUNBQW1DLENBQUMsQ0FBQztBQUlwRSxJQUFPLGtCQUFrQixXQUFhLDRDQUE0QyxDQUFDLENBQUM7QUFHcEYsSUFBTyxrQkFBa0IsV0FBYSw4Q0FBOEMsQ0FBQyxDQUFDO0FBQ3RGLElBQU8sVUFBVSxXQUFlLHNDQUFzQyxDQUFDLENBQUM7QUFHeEUsQUFpSUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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Q0EsQ0FBQ0E7UUFDakJBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBO1FBQ2pCQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNqQkEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7UUFFWEEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDakJBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBO1FBQ2pCQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNqQkEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7UUFFWEEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDakJBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBO1FBQ2pCQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNsQkEsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7UUFFWkEsSUFBSUEsQ0FBQ0EsR0FBWUEsSUFBSUEsUUFBUUEsRUFBRUEsQ0FBQ0E7UUFDaENBLENBQUNBLENBQUNBLGVBQWVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1FBRXZCQSxJQUFJQSxHQUFHQSxHQUFZQSxDQUFDQSxDQUFDQSxTQUFTQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUVwQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDeEJBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO1FBQ3hCQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUV4QkEsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxFQUFFQSxDQUFDQTtJQUMzQkEsQ0FBQ0E7SUFFRGpEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bc0JHQTtJQUNJQSxxQ0FBYUEsR0FBcEJBLFVBQXFCQSxLQUFXQTtRQUUvQmtELE1BQU1BLENBQUNBLElBQUlBLEtBQUtBLEVBQUVBLEVBQUVBLE1BQU1BO0lBQzNCQSxDQUFDQSxHQURtQkE7SUFHcEJsRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bd0JHQTtJQUNJQSx1Q0FBZUEsR0FBdEJBLFVBQXVCQSxRQUFpQkE7UUFFdkNtRCxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxlQUFlQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQTtJQUN0REEsQ0FBQ0E7SUFFRG5EOzs7Ozs7T0FNR0E7SUFFSUEsOEJBQU1BLEdBQWJBLFVBQWNBLEVBQVNBLEVBQUVBLEVBQVNBLEVBQUVBLEVBQVNBO1FBRTVDb0QsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsSUFBSUEsQ0FBQ0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsSUFBSUEsQ0FBQ0EsRUFBRUEsSUFBSUEsRUFBRUEsQ0FBQ0E7WUFDbkRBLE1BQU1BLENBQUNBO1FBRVJBLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLEVBQUVBLENBQUNBO1FBQ2JBLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLEVBQUVBLENBQUNBO1FBQ2JBLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLEVBQUVBLENBQUNBO1FBRWJBLElBQUlBLENBQUNBLGtCQUFrQkEsRUFBRUEsQ0FBQ0E7SUFDM0JBLENBQUNBO0lBRURwRDs7Ozs7O09BTUdBO0lBQ0lBLGlDQUFTQSxHQUFoQkEsVUFBaUJBLEVBQVNBLEVBQUVBLEVBQVNBLEVBQUVBLEVBQVNBO1FBRS9DcUQsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsSUFBSUEsSUFBSUEsQ0FBQ0E7WUFDdkJBLElBQUlBLENBQUNBLE1BQU1BLEdBQUdBLElBQUlBLFFBQVFBLEVBQUVBLENBQUNBO1FBRTlCQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQTtRQUNwQkEsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0E7UUFDcEJBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBO1FBRXBCQSxJQUFJQSxDQUFDQSxlQUFlQSxFQUFFQSxDQUFDQTtJQUN4QkEsQ0FBQ0E7SUFFRHJEOzs7O09BSUdBO0lBQ0lBLDZCQUFLQSxHQUFaQSxVQUFhQSxLQUFZQTtRQUV4QnNELElBQUlBLENBQUNBLE1BQU1BLENBQUNBLFFBQVFBLENBQUNBLE1BQU1BLEVBQUVBLEtBQUtBLENBQUNBLENBQUNBO0lBQ3JDQSxDQUFDQTtJQUVEdEQ7O09BRUdBO0lBQ0lBLCtDQUF1QkEsR0FBOUJBLFVBQStCQSxNQUFhQTtRQUUzQ3VELEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLGVBQWVBLElBQUlBLGVBQWVBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLENBQUNBO1lBQzFEQSxJQUFJQSxLQUFLQSxHQUFtQkEsTUFBTUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsU0FBU0EsRUFBRUEsQ0FBQ0E7WUFDOURBLElBQUlBLEtBQUtBLEdBQVlBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQzlCQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQTtZQUM5QkEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7WUFDeEJBLEtBQUtBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBO1lBQ3hCQSxLQUFLQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQTtZQUN4QkEsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxTQUFTQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtZQUV6Q0EsQUFDQUEsc0JBRHNCQTtZQUN0QkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsSUFBSUEsSUFBSUEsQ0FBQ0EsYUFBYUEsSUFBSUEsYUFBYUEsQ0FBQ0EsV0FBV0EsQ0FBQ0E7Z0JBQ3ZFQSxJQUFJQSxDQUFDQSxrQkFBa0JBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsRUFBRUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsRUFBRUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7WUFFdElBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLGtCQUFrQkEsQ0FBQ0E7UUFDaENBLENBQUNBO1FBRURBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLGNBQWNBLENBQUNBO0lBQzVCQSxDQUFDQTtJQUVEdkQ7Ozs7T0FJR0E7SUFDSUEsNEJBQUlBLEdBQVhBLFVBQVlBLEtBQVlBO1FBRXZCd0QsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsTUFBTUEsRUFBRUEsS0FBS0EsQ0FBQ0EsQ0FBQ0E7SUFDckNBLENBQUNBO0lBRUR4RDs7Ozs7T0FLR0E7SUFDSUEsOEJBQU1BLEdBQWJBLFVBQWNBLElBQWFBLEVBQUVBLEtBQVlBO1FBRXhDeUQsSUFBSUEsQ0FBQ0EsR0FBWUEsSUFBSUEsUUFBUUEsRUFBRUEsQ0FBQ0E7UUFDaENBLENBQUNBLENBQUNBLGVBQWVBLENBQUNBLEtBQUtBLEVBQUVBLElBQUlBLENB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R0FBR0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFFbEJBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLFVBQVVBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLFVBQVVBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUN0RkEsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3hCQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDeEJBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO2dCQUV4QkEsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxFQUFFQSxDQUFDQTtZQUMzQkEsQ0FBQ0E7WUFFREEsR0FBR0EsR0FBR0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFFbEJBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLFFBQVFBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLFFBQVFBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUNoRkEsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3RCQSxJQUFJQSxDQUFDQSxRQUFRQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDdEJBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO2dCQUV0QkEsSUFBSUEsQ0FBQ0EsZUFBZUEsRUFBRUEsQ0FBQ0E7WUFDeEJBLENBQUNBO1FBQ0ZBLENBQUNBOzs7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Q0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0E7UUFDOUJBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBO1FBQzlCQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQTtRQUU5QkEsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7UUFDNUJBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBO1FBQzVCQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQTtRQUU1QkEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0Esb0JBQW9CQSxDQUFDQSxDQUFDQTtRQUVwREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDdEJBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBO1lBQ2pEQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQTtZQUNqREEsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7WUFDakRBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FB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S0FBS0EsQ0FBQ0E7UUFFbENBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLGNBQWNBLElBQUlBLElBQUlBLENBQUNBO1lBQy9CQSxJQUFJQSxDQUFDQSxjQUFjQSxHQUFHQSxJQUFJQSxNQUFNQSxFQUFFQSxDQUFDQTtJQUNyQ0EsQ0FBQ0E7SUFDRmpHLG9CQUFDQTtBQUFEQSxDQTFxRUEsQUEwcUVDQSxFQTFxRTJCLFNBQVMsRUEwcUVwQztBQUVELEFBQXVCLGlCQUFkLGFBQWEsQ0FBQyIsImZpbGUiOiJiYXNlL0Rpc3BsYXlPYmplY3QuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJsZW5kTW9kZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZGF0YS9CbGVuZE1vZGVcIik7XHJcbmltcG9ydCBCb3hcdFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL0JveFwiKTtcclxuaW1wb3J0IFNwaGVyZVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1NwaGVyZVwiKTtcclxuaW1wb3J0IE1hdGhDb25zdHNcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vTWF0aENvbnN0c1wiKTtcclxuaW1wb3J0IE1hdHJpeDNEXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vTWF0cml4M0RcIik7XHJcbmltcG9ydCBNYXRyaXgzRFV0aWxzXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9NYXRyaXgzRFV0aWxzXCIpO1xyXG5pbXBvcnQgUG9pbnRcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9Qb2ludFwiKTtcclxuaW1wb3J0IFJlY3RhbmdsZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9SZWN0YW5nbGVcIik7XHJcbmltcG9ydCBWZWN0b3IzRFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1ZlY3RvcjNEXCIpO1xyXG5pbXBvcnQgQXNzZXRCYXNlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L0Fzc2V0QmFzZVwiKTtcclxuaW1wb3J0IEFic3RyYWN0TWV0aG9kRXJyb3JcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXJyb3JzL0Fic3RyYWN0TWV0aG9kRXJyb3JcIik7XHJcblxyXG5pbXBvcnQgRGlzcGxheU9iamVjdENvbnRhaW5lclx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvY29udGFpbmVycy9EaXNwbGF5T2JqZWN0Q29udGFpbmVyXCIpO1xyXG5pbXBvcnQgU2NlbmVcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvY29udGFpbmVycy9TY2VuZVwiKTtcclxuaW1wb3J0IENvbnRyb2xsZXJCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvY29udHJvbGxlcnMvQ29udHJvbGxlckJhc2VcIik7XHJcbmltcG9ydCBBbGlnbm1lbnRNb2RlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9BbGlnbm1lbnRNb2RlXCIpO1xyXG5pbXBvcnQgTG9hZGVySW5mb1x0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9Mb2FkZXJJbmZvXCIpO1xyXG5pbXBvcnQgT3JpZW50YXRpb25Nb2RlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9PcmllbnRhdGlvbk1vZGVcIik7XHJcbmltcG9ydCBJQml0bWFwRHJhd2FibGVcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0lCaXRtYXBEcmF3YWJsZVwiKTtcclxuaW1wb3J0IFRyYW5zZm9ybVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9UcmFuc2Zvcm1cIik7XHJcbmltcG9ydCBFbnRpdHlOb2RlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vRW50aXR5Tm9kZVwiKTtcclxuaW1wb3J0IFBhcnRpdGlvblx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcGFydGl0aW9uL1BhcnRpdGlvblwiKTtcclxuaW1wb3J0IElQaWNraW5nQ29sbGlkZXJcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9waWNrL0lQaWNraW5nQ29sbGlkZXJcIik7XHJcbmltcG9ydCBQaWNraW5nQ29sbGlzaW9uVk9cdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcGljay9QaWNraW5nQ29sbGlzaW9uVk9cIik7XHJcbmltcG9ydCBJUmVuZGVyYWJsZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcG9vbC9JUmVuZGVyYWJsZVwiKTtcclxuaW1wb3J0IENhbWVyYVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9DYW1lcmFcIik7XHJcbmltcG9ydCBEaXNwbGF5T2JqZWN0RXZlbnRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZXZlbnRzL0Rpc3BsYXlPYmplY3RFdmVudFwiKTtcclxuaW1wb3J0IFNjZW5lRXZlbnRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2V2ZW50cy9TY2VuZUV2ZW50XCIpO1xyXG5pbXBvcnQgUHJlZmFiQmFzZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcHJlZmFicy9QcmVmYWJCYXNlXCIpO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBEaXNwbGF5T2JqZWN0IGNsYXNzIGlzIHRoZSBiYXNlIGNsYXNzIGZvciBhbGwgb2JqZWN0cyB0aGF0IGNhbiBiZVxyXG4gKiBwbGFjZWQgb24gdGhlIGRpc3BsYXkgbGlzdC4gVGhlIGRpc3BsYXkgbGlzdCBtYW5hZ2VzIGFsbCBvYmplY3RzIGRpc3BsYXllZFxyXG4gKiBpbiBmbGFzaC4gVXNlIHRoZSBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIGNsYXNzIHRvIGFycmFuZ2UgdGhlXHJcbiAqIGRpc3BsYXkgb2JqZWN0cyBpbiB0aGUgZGlzcGxheSBsaXN0LiBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIG9iamVjdHMgY2FuXHJcbiAqIGhhdmUgY2hpbGQgZGlzcGxheSBvYmplY3RzLCB3aGlsZSBvdGhlciBkaXNwbGF5IG9iamVjdHMsIHN1Y2ggYXMgU2hhcGUgYW5kXHJcbiAqIFRleHRGaWVsZCBvYmplY3RzLCBhcmUgXCJsZWFmXCIgbm9kZXMgdGhhdCBoYXZlIG9ubHkgcGFyZW50cyBhbmQgc2libGluZ3MsIG5vXHJcbiAqIGNoaWxkcmVuLlxyXG4gKlxyXG4gKiA8cD5UaGUgRGlzcGxheU9iamVjdCBjbGFzcyBzdXBwb3J0cyBiYXNpYyBmdW5jdGlvbmFsaXR5IGxpa2UgdGhlIDxpPng8L2k+XHJcbiAqIGFuZCA8aT55PC9pPiBwb3NpdGlvbiBvZiBhbiBvYmplY3QsIGFzIHdlbGwgYXMgbW9yZSBhZHZhbmNlZCBwcm9wZXJ0aWVzIG9mXHJcbiAqIHRoZSBvYmplY3Qgc3VjaCBhcyBpdHMgdHJhbnNmb3JtYXRpb24gbWF0cml4LiA8L3A+XHJcbiAqXHJcbiAqIDxwPkRpc3BsYXlPYmplY3QgaXMgYW4gYWJzdHJhY3QgYmFzZSBjbGFzczsgdGhlcmVmb3JlLCB5b3UgY2Fubm90IGNhbGxcclxuICogRGlzcGxheU9iamVjdCBkaXJlY3RseS4gSW52b2tpbmcgPGNvZGU+bmV3IERpc3BsYXlPYmplY3QoKTwvY29kZT4gdGhyb3dzIGFuXHJcbiAqIDxjb2RlPkFyZ3VtZW50RXJyb3I8L2NvZGU+IGV4Y2VwdGlvbi4gPC9wPlxyXG4gKlxyXG4gKiA8cD5BbGwgZGlzcGxheSBvYmplY3RzIGluaGVyaXQgZnJvbSB0aGUgRGlzcGxheU9iamVjdCBjbGFzcy48L3A+XHJcbiAqXHJcbiAqIDxwPlRoZSBEaXNwbGF5T2JqZWN0IGNsYXNzIGl0c2VsZiBkb2VzIG5vdCBpbmNsdWRlIGFueSBBUElzIGZvciByZW5kZXJpbmdcclxuICogY29udGVudCBvbnNjcmVlbi4gRm9yIHRoYXQgcmVhc29uLCBpZiB5b3Ugd2FudCBjcmVhdGUgYSBjdXN0b20gc3ViY2xhc3Mgb2ZcclxuICogdGhlIERpc3BsYXlPYmplY3QgY2xhc3MsIHlvdSB3aWxsIHdhbnQgdG8gZXh0ZW5kIG9uZSBvZiBpdHMgc3ViY2xhc3NlcyB0aGF0XHJcbiAqIGRvIGhhdmUgQVBJcyBmb3IgcmVuZGVyaW5nIGNvbnRlbnQgb25zY3JlZW4sIHN1Y2ggYXMgdGhlIFNoYXBlLCBTcHJpdGUsXHJcbiAqIEJpdG1hcCwgU2ltcGxlQnV0dG9uLCBUZXh0RmllbGQsIG9yIE1vdmllQ2xpcCBjbGFzcy48L3A+XHJcbiAqXHJcbiAqIDxwPlRoZSBEaXNwbGF5T2JqZWN0IGNsYXNzIGNvbnRhaW5zIHNldmVyYWwgYnJvYWRjYXN0IGV2ZW50cy4gTm9ybWFsbHksIHRoZVxyXG4gKiB0YXJnZXQgb2YgYW55IHBhcnRpY3VsYXIgZXZlbnQgaXMgYSBzcGVjaWZpYyBEaXNwbGF5T2JqZWN0IGluc3RhbmNlLiBGb3JcclxuICogZXhhbXBsZSwgdGhlIHRhcmdldCBvZiBhbiA8Y29kZT5hZGRlZDwvY29kZT4gZXZlbnQgaXMgdGhlIHNwZWNpZmljXHJcbiAqIERpc3BsYXlPYmplY3QgaW5zdGFuY2UgdGhhdCB3YXMgYWRkZWQgdG8gdGhlIGRpc3BsYXkgbGlzdC4gSGF2aW5nIGEgc2luZ2xlXHJcbiAqIHRhcmdldCByZXN0cmljdHMgdGhlIHBsYWNlbWVudCBvZiBldmVudCBsaXN0ZW5lcnMgdG8gdGhhdCB0YXJnZXQgYW5kIGluXHJcbiAqIHNvbWUgY2FzZXMgdGhlIHRhcmdldCdzIGFuY2VzdG9ycyBvbiB0aGUgZGlzcGxheSBsaXN0LiBXaXRoIGJyb2FkY2FzdFxyXG4gKiBldmVudHMsIGhvd2V2ZXIsIHRoZSB0YXJnZXQgaXMgbm90IGEgc3BlY2lmaWMgRGlzcGxheU9iamVjdCBpbnN0YW5jZSwgYnV0XHJcbiAqIHJhdGhlciBhbGwgRGlzcGxheU9iamVjdCBpbnN0YW5jZXMsIGluY2x1ZGluZyB0aG9zZSB0aGF0IGFyZSBub3Qgb24gdGhlXHJcbiAqIGRpc3BsYXkgbGlzdC4gVGhpcyBtZWFucyB0aGF0IHlvdSBjYW4gYWRkIGEgbGlzdGVuZXIgdG8gYW55IERpc3BsYXlPYmplY3RcclxuICogaW5zdGFuY2UgdG8gbGlzdGVuIGZvciBicm9hZGNhc3QgZXZlbnRzLiBJbiBhZGRpdGlvbiB0byB0aGUgYnJvYWRjYXN0XHJcbiAqIGV2ZW50cyBsaXN0ZWQgaW4gdGhlIERpc3BsYXlPYmplY3QgY2xhc3MncyBFdmVudHMgdGFibGUsIHRoZSBEaXNwbGF5T2JqZWN0XHJcbiAqIGNsYXNzIGFsc28gaW5oZXJpdHMgdHdvIGJyb2FkY2FzdCBldmVudHMgZnJvbSB0aGUgRXZlbnREaXNwYXRjaGVyIGNsYXNzOlxyXG4gKiA8Y29kZT5hY3RpdmF0ZTwvY29kZT4gYW5kIDxjb2RlPmRlYWN0aXZhdGU8L2NvZGU+LjwvcD5cclxuICpcclxuICogPHA+U29tZSBwcm9wZXJ0aWVzIHByZXZpb3VzbHkgdXNlZCBpbiB0aGUgQWN0aW9uU2NyaXB0IDEuMCBhbmQgMi4wXHJcbiAqIE1vdmllQ2xpcCwgVGV4dEZpZWxkLCBhbmQgQnV0dG9uIGNsYXNzZXMoc3VjaCBhcyA8Y29kZT5fYWxwaGE8L2NvZGU+LFxyXG4gKiA8Y29kZT5faGVpZ2h0PC9jb2RlPiwgPGNvZGU+X25hbWU8L2NvZGU+LCA8Y29kZT5fd2lkdGg8L2NvZGU+LFxyXG4gKiA8Y29kZT5feDwvY29kZT4sIDxjb2RlPl95PC9jb2RlPiwgYW5kIG90aGVycykgaGF2ZSBlcXVpdmFsZW50cyBpbiB0aGVcclxuICogQWN0aW9uU2NyaXB0IDMuMCBEaXNwbGF5T2JqZWN0IGNsYXNzIHRoYXQgYXJlIHJlbmFtZWQgc28gdGhhdCB0aGV5IG5vXHJcbiAqIGxvbmdlciBiZWdpbiB3aXRoIHRoZSB1bmRlcnNjb3JlKF8pIGNoYXJhY3Rlci48L3A+XHJcbiAqXHJcbiAqIDxwPkZvciBtb3JlIGluZm9ybWF0aW9uLCBzZWUgdGhlIFwiRGlzcGxheSBQcm9ncmFtbWluZ1wiIGNoYXB0ZXIgb2YgdGhlXHJcbiAqIDxpPkFjdGlvblNjcmlwdCAzLjAgRGV2ZWxvcGVyJ3MgR3VpZGU8L2k+LjwvcD5cclxuICogXHJcbiAqIEBldmVudCBhZGRlZCAgICAgICAgICAgIERpc3BhdGNoZWQgd2hlbiBhIGRpc3BsYXkgb2JqZWN0IGlzIGFkZGVkIHRvIHRoZVxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5IGxpc3QuIFRoZSBmb2xsb3dpbmcgbWV0aG9kcyB0cmlnZ2VyIHRoaXNcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQ6XHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPkRpc3BsYXlPYmplY3RDb250YWluZXIuYWRkQ2hpbGQoKTwvY29kZT4sXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPkRpc3BsYXlPYmplY3RDb250YWluZXIuYWRkQ2hpbGRBdCgpPC9jb2RlPi5cclxuICogQGV2ZW50IGFkZGVkVG9TY2VuZSAgICAgRGlzcGF0Y2hlZCB3aGVuIGEgZGlzcGxheSBvYmplY3QgaXMgYWRkZWQgdG8gdGhlIG9uXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIHNjZW5lIGRpc3BsYXkgbGlzdCwgZWl0aGVyIGRpcmVjdGx5IG9yIHRocm91Z2ggdGhlXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGFkZGl0aW9uIG9mIGEgc3ViIHRyZWUgaW4gd2hpY2ggdGhlIGRpc3BsYXkgb2JqZWN0XHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGlzIGNvbnRhaW5lZC4gVGhlIGZvbGxvd2luZyBtZXRob2RzIHRyaWdnZXIgdGhpc1xyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBldmVudDpcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+RGlzcGxheU9iamVjdENvbnRhaW5lci5hZGRDaGlsZCgpPC9jb2RlPixcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+RGlzcGxheU9iamVjdENvbnRhaW5lci5hZGRDaGlsZEF0KCk8L2NvZGU+LlxyXG4gKiBAZXZlbnQgZW50ZXJGcmFtZSAgICAgICBbYnJvYWRjYXN0IGV2ZW50XSBEaXNwYXRjaGVkIHdoZW4gdGhlIHBsYXloZWFkIGlzXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGVudGVyaW5nIGEgbmV3IGZyYW1lLiBJZiB0aGUgcGxheWhlYWQgaXMgbm90XHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIG1vdmluZywgb3IgaWYgdGhlcmUgaXMgb25seSBvbmUgZnJhbWUsIHRoaXMgZXZlbnRcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgaXMgZGlzcGF0Y2hlZCBjb250aW51b3VzbHkgaW4gY29uanVuY3Rpb24gd2l0aCB0aGVcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgZnJhbWUgcmF0ZS4gVGhpcyBldmVudCBpcyBhIGJyb2FkY2FzdCBldmVudCwgd2hpY2hcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgbWVhbnMgdGhhdCBpdCBpcyBkaXNwYXRjaGVkIGJ5IGFsbCBkaXNwbGF5IG9iamVjdHNcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgd2l0aCBhIGxpc3RlbmVyIHJlZ2lzdGVyZWQgZm9yIHRoaXMgZXZlbnQuXHJcbiAqIEBldmVudCBleGl0RnJhbWUgICAgICAgIFticm9hZGNhc3QgZXZlbnRdIERpc3BhdGNoZWQgd2hlbiB0aGUgcGxheWhlYWQgaXNcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgZXhpdGluZyB0aGUgY3VycmVudCBmcmFtZS4gQWxsIGZyYW1lIHNjcmlwdHMgaGF2ZVxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBiZWVuIHJ1bi4gSWYgdGhlIHBsYXloZWFkIGlzIG5vdCBtb3ZpbmcsIG9yIGlmXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIHRoZXJlIGlzIG9ubHkgb25lIGZyYW1lLCB0aGlzIGV2ZW50IGlzIGRpc3BhdGNoZWRcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgY29udGludW91c2x5IGluIGNvbmp1bmN0aW9uIHdpdGggdGhlIGZyYW1lIHJhdGUuXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIFRoaXMgZXZlbnQgaXMgYSBicm9hZGNhc3QgZXZlbnQsIHdoaWNoIG1lYW5zIHRoYXRcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgaXQgaXMgZGlzcGF0Y2hlZCBieSBhbGwgZGlzcGxheSBvYmplY3RzIHdpdGggYVxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lciByZWdpc3RlcmVkIGZvciB0aGlzIGV2ZW50LlxyXG4gKiBAZXZlbnQgZnJhbWVDb25zdHJ1Y3RlZCBbYnJvYWRjYXN0IGV2ZW50XSBEaXNwYXRjaGVkIGFmdGVyIHRoZSBjb25zdHJ1Y3RvcnNcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgb2YgZnJhbWUgZGlzcGxheSBvYmplY3RzIGhhdmUgcnVuIGJ1dCBiZWZvcmUgZnJhbWVcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgc2NyaXB0cyBoYXZlIHJ1bi4gSWYgdGhlIHBsYXloZWFkIGlzIG5vdCBtb3ZpbmcsIG9yXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGlmIHRoZXJlIGlzIG9ubHkgb25lIGZyYW1lLCB0aGlzIGV2ZW50IGlzXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoZWQgY29udGludW91c2x5IGluIGNvbmp1bmN0aW9uIHdpdGggdGhlXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGZyYW1lIHJhdGUuIFRoaXMgZXZlbnQgaXMgYSBicm9hZGNhc3QgZXZlbnQsIHdoaWNoXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIG1lYW5zIHRoYXQgaXQgaXMgZGlzcGF0Y2hlZCBieSBhbGwgZGlzcGxheSBvYmplY3RzXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIHdpdGggYSBsaXN0ZW5lciByZWdpc3RlcmVkIGZvciB0aGlzIGV2ZW50LlxyXG4gKiBAZXZlbnQgcmVtb3ZlZCAgICAgICAgICBEaXNwYXRjaGVkIHdoZW4gYSBkaXNwbGF5IG9iamVjdCBpcyBhYm91dCB0byBiZVxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVkIGZyb20gdGhlIGRpc3BsYXkgbGlzdC4gVHdvIG1ldGhvZHMgb2YgdGhlXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIERpc3BsYXlPYmplY3RDb250YWluZXIgY2xhc3MgZ2VuZXJhdGUgdGhpcyBldmVudDpcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+cmVtb3ZlQ2hpbGQoKTwvY29kZT4gYW5kXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPnJlbW92ZUNoaWxkQXQoKTwvY29kZT4uXHJcbiAqXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxwPlRoZSBmb2xsb3dpbmcgbWV0aG9kcyBvZiBhXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIERpc3BsYXlPYmplY3RDb250YWluZXIgb2JqZWN0IGFsc28gZ2VuZXJhdGUgdGhpc1xyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBldmVudCBpZiBhbiBvYmplY3QgbXVzdCBiZSByZW1vdmVkIHRvIG1ha2Ugcm9vbSBmb3JcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgdGhlIG5ldyBvYmplY3Q6IDxjb2RlPmFkZENoaWxkKCk8L2NvZGU+LFxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5hZGRDaGlsZEF0KCk8L2NvZGU+LCBhbmRcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+c2V0Q2hpbGRJbmRleCgpPC9jb2RlPi4gPC9wPlxyXG4gKiBAZXZlbnQgcmVtb3ZlZEZyb21TY2VuZSBEaXNwYXRjaGVkIHdoZW4gYSBkaXNwbGF5IG9iamVjdCBpcyBhYm91dCB0byBiZVxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVkIGZyb20gdGhlIGRpc3BsYXkgbGlzdCwgZWl0aGVyIGRpcmVjdGx5IG9yXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIHRocm91Z2ggdGhlIHJlbW92YWwgb2YgYSBzdWIgdHJlZSBpbiB3aGljaCB0aGVcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheSBvYmplY3QgaXMgY29udGFpbmVkLiBUd28gbWV0aG9kcyBvZiB0aGVcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgRGlzcGxheU9iamVjdENvbnRhaW5lciBjbGFzcyBnZW5lcmF0ZSB0aGlzIGV2ZW50OlxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5yZW1vdmVDaGlsZCgpPC9jb2RlPiBhbmRcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+cmVtb3ZlQ2hpbGRBdCgpPC9jb2RlPi5cclxuICpcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgPHA+VGhlIGZvbGxvd2luZyBtZXRob2RzIG9mIGFcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgRGlzcGxheU9iamVjdENvbnRhaW5lciBvYmplY3QgYWxzbyBnZW5lcmF0ZSB0aGlzXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50IGlmIGFuIG9iamVjdCBtdXN0IGJlIHJlbW92ZWQgdG8gbWFrZSByb29tIGZvclxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICB0aGUgbmV3IG9iamVjdDogPGNvZGU+YWRkQ2hpbGQoKTwvY29kZT4sXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPmFkZENoaWxkQXQoKTwvY29kZT4sIGFuZFxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5zZXRDaGlsZEluZGV4KCk8L2NvZGU+LiA8L3A+XHJcbiAqIEBldmVudCByZW5kZXIgICAgICAgICAgIFticm9hZGNhc3QgZXZlbnRdIERpc3BhdGNoZWQgd2hlbiB0aGUgZGlzcGxheSBsaXN0XHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGlzIGFib3V0IHRvIGJlIHVwZGF0ZWQgYW5kIHJlbmRlcmVkLiBUaGlzIGV2ZW50XHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVzIHRoZSBsYXN0IG9wcG9ydHVuaXR5IGZvciBvYmplY3RzIGxpc3RlbmluZ1xyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgdGhpcyBldmVudCB0byBtYWtlIGNoYW5nZXMgYmVmb3JlIHRoZSBkaXNwbGF5XHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3QgaXMgcmVuZGVyZWQuIFlvdSBtdXN0IGNhbGwgdGhlXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPmludmFsaWRhdGUoKTwvY29kZT4gbWV0aG9kIG9mIHRoZSBTY2VuZVxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3QgZWFjaCB0aW1lIHlvdSB3YW50IGEgPGNvZGU+cmVuZGVyPC9jb2RlPlxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBldmVudCB0byBiZSBkaXNwYXRjaGVkLiA8Y29kZT5SZW5kZXI8L2NvZGU+IGV2ZW50c1xyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBhcmUgZGlzcGF0Y2hlZCB0byBhbiBvYmplY3Qgb25seSBpZiB0aGVyZSBpcyBtdXR1YWxcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgdHJ1c3QgYmV0d2VlbiBpdCBhbmQgdGhlIG9iamVjdCB0aGF0IGNhbGxlZFxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5TY2VuZS5pbnZhbGlkYXRlKCk8L2NvZGU+LiBUaGlzIGV2ZW50IGlzIGFcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgYnJvYWRjYXN0IGV2ZW50LCB3aGljaCBtZWFucyB0aGF0IGl0IGlzIGRpc3BhdGNoZWRcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgYnkgYWxsIGRpc3BsYXkgb2JqZWN0cyB3aXRoIGEgbGlzdGVuZXIgcmVnaXN0ZXJlZFxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgdGhpcyBldmVudC5cclxuICpcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgPHA+PGI+Tm90ZTogPC9iPlRoaXMgZXZlbnQgaXMgbm90IGRpc3BhdGNoZWQgaWYgdGhlXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXkgaXMgbm90IHJlbmRlcmluZy4gVGhpcyBpcyB0aGUgY2FzZSB3aGVuIHRoZVxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50IGlzIGVpdGhlciBtaW5pbWl6ZWQgb3Igb2JzY3VyZWQuIDwvcD5cclxuICovXHJcbmNsYXNzIERpc3BsYXlPYmplY3QgZXh0ZW5kcyBBc3NldEJhc2UgaW1wbGVtZW50cyBJQml0bWFwRHJhd2FibGVcclxue1xyXG5cdHByaXZhdGUgX2xvYWRlckluZm86TG9hZGVySW5mbztcclxuXHRwcml2YXRlIF9tb3VzZVg6bnVtYmVyO1xyXG5cdHByaXZhdGUgX21vdXNlWTpudW1iZXI7XHJcblx0cHJpdmF0ZSBfcm9vdDpEaXNwbGF5T2JqZWN0Q29udGFpbmVyO1xyXG5cdHByaXZhdGUgX2JvdW5kczpSZWN0YW5nbGU7XHJcblx0cHVibGljIF9wQm94Qm91bmRzOkJveDtcclxuXHRwcml2YXRlIF9ib3hCb3VuZHNJbnZhbGlkOmJvb2xlYW4gPSB0cnVlO1xyXG5cdHB1YmxpYyBfcFNwaGVyZUJvdW5kczpTcGhlcmU7XHJcblx0cHJpdmF0ZSBfc3BoZXJlQm91bmRzSW52YWxpZDpib29sZWFuID0gdHJ1ZTtcclxuXHRwcml2YXRlIF9kZWJ1Z1Zpc2libGU6Ym9vbGVhbjtcclxuXHJcblx0cHVibGljIF9wU2NlbmU6U2NlbmU7XHJcblx0cHVibGljIF9wUGFyZW50OkRpc3BsYXlPYmplY3RDb250YWluZXI7XHJcblx0cHVibGljIF9wU2NlbmVUcmFuc2Zvcm06TWF0cml4M0QgPSBuZXcgTWF0cml4M0QoKTtcclxuXHRwdWJsaWMgX3BTY2VuZVRyYW5zZm9ybURpcnR5OmJvb2xlYW4gPSB0cnVlO1xyXG5cdHB1YmxpYyBfcElzRW50aXR5OmJvb2xlYW47XHJcbiAgICBwdWJsaWMgX2lNYXNrSUQ6bnVtYmVyID0gLTE7XHJcbiAgICBwdWJsaWMgX2lNYXNrczpEaXNwbGF5T2JqZWN0W10gPSBudWxsO1xyXG5cclxuXHRwcml2YXRlIF9leHBsaWNpdFBhcnRpdGlvbjpQYXJ0aXRpb247XHJcblx0cHVibGljIF9wSW1wbGljaXRQYXJ0aXRpb246UGFydGl0aW9uO1xyXG5cclxuXHRwcml2YXRlIF9zY2VuZVRyYW5zZm9ybUNoYW5nZWQ6RGlzcGxheU9iamVjdEV2ZW50O1xyXG5cdHByaXZhdGUgX3NjZW5lY2hhbmdlZDpEaXNwbGF5T2JqZWN0RXZlbnQ7XHJcblx0cHJpdmF0ZSBfdHJhbnNmb3JtOlRyYW5zZm9ybTtcclxuXHRwcml2YXRlIF9tYXRyaXgzRDpNYXRyaXgzRCA9IG5ldyBNYXRyaXgzRCgpO1xyXG5cdHByaXZhdGUgX21hdHJpeDNERGlydHk6Ym9vbGVhbiA9IHRydWU7XHJcblxyXG5cdHByaXZhdGUgX2ludmVyc2VTY2VuZVRyYW5zZm9ybTpNYXRyaXgzRCA9IG5ldyBNYXRyaXgzRCgpO1xyXG5cdHByaXZhdGUgX2ludmVyc2VTY2VuZVRyYW5zZm9ybURpcnR5OmJvb2xlYW4gPSB0cnVlO1xyXG5cdHByaXZhdGUgX3NjZW5lUG9zaXRpb246VmVjdG9yM0QgPSBuZXcgVmVjdG9yM0QoKTtcclxuXHRwcml2YXRlIF9zY2VuZVBvc2l0aW9uRGlydHk6Ym9vbGVhbiA9IHRydWU7XHJcblx0cHJpdmF0ZSBfZXhwbGljaXRWaXNpYmlsaXR5OmJvb2xlYW4gPSB0cnVlO1xyXG5cdHB1YmxpYyBfcEltcGxpY2l0VmlzaWJpbGl0eTpib29sZWFuID0gdHJ1ZTtcclxuXHRwcml2YXRlIF9leHBsaWNpdE1vdXNlRW5hYmxlZDpib29sZWFuID0gdHJ1ZTtcclxuXHRwdWJsaWMgX3BJbXBsaWNpdE1vdXNlRW5hYmxlZDpib29sZWFuID0gdHJ1ZTtcclxuXHRwcml2YXRlIF9saXN0ZW5Ub1NjZW5lVHJhbnNmb3JtQ2hhbmdlZDpib29sZWFuO1xyXG5cdHByaXZhdGUgX2xpc3RlblRvU2NlbmVDaGFuZ2VkOmJvb2xlYW47XHJcblxyXG5cdHByaXZhdGUgX3Bvc2l0aW9uRGlydHk6Ym9vbGVhbiA9IHRydWU7XHJcblx0cHJpdmF0ZSBfcm90YXRpb25EaXJ0eTpib29sZWFuID0gdHJ1ZTtcclxuXHRwcml2YXRlIF9zY2FsZURpcnR5OmJvb2xlYW4gPSB0cnVlO1xyXG5cclxuXHRwcml2YXRlIF9wb3NpdGlvbkNoYW5nZWQ6RGlzcGxheU9iamVjdEV2ZW50O1xyXG5cdHByaXZhdGUgX3JvdGF0aW9uQ2hhbmdlZDpEaXNwbGF5T2JqZWN0RXZlbnQ7XHJcblx0cHJpdmF0ZSBfc2NhbGVDaGFuZ2VkOkRpc3BsYXlPYmplY3RFdmVudDtcclxuXHJcblx0cHJpdmF0ZSBfcm90YXRpb25YOm51bWJlciA9IDA7XHJcblx0cHJpdmF0ZSBfcm90YXRpb25ZOm51bWJlciA9IDA7XHJcblx0cHJpdmF0ZSBfcm90YXRpb25aOm51bWJlciA9IDA7XHJcblx0cHJpdmF0ZSBfZXVsZXJzOlZlY3RvcjNEID0gbmV3IFZlY3RvcjNEKCk7XHJcblx0cHJpdmF0ZSBfZmxpcFk6TWF0cml4M0QgPSBuZXcgTWF0cml4M0QoKTtcclxuXHJcblx0cHJpdmF0ZSBfbGlzdGVuVG9Qb3NpdGlvbkNoYW5nZWQ6Ym9vbGVhbjtcclxuXHRwcml2YXRlIF9saXN0ZW5Ub1JvdGF0aW9uQ2hhbmdlZDpib29sZWFuO1xyXG5cdHByaXZhdGUgX2xpc3RlblRvU2NhbGVDaGFuZ2VkOmJvb2xlYW47XHJcblx0cHJpdmF0ZSBfek9mZnNldDpudW1iZXIgPSAwO1xyXG5cclxuXHRwdWJsaWMgX3dpZHRoOm51bWJlcjtcclxuXHRwdWJsaWMgX2hlaWdodDpudW1iZXI7XHJcblx0cHVibGljIF9kZXB0aDpudW1iZXI7XHJcblxyXG5cdHB1YmxpYyBfcFNjYWxlWDpudW1iZXIgPSAxO1xyXG5cdHB1YmxpYyBfcFNjYWxlWTpudW1iZXIgPSAxO1xyXG5cdHB1YmxpYyBfcFNjYWxlWjpudW1iZXIgPSAxO1xyXG5cdHByaXZhdGUgX3g6bnVtYmVyID0gMDtcclxuXHRwcml2YXRlIF95Om51bWJlciA9IDA7XHJcblx0cHJpdmF0ZSBfejpudW1iZXIgPSAwO1xyXG5cdHByaXZhdGUgX3Bpdm90OlZlY3RvcjNEID0gbmV3IFZlY3RvcjNEKCk7XHJcblx0cHJpdmF0ZSBfcGl2b3RTY2FsZTpWZWN0b3IzRCA9IG5ldyBWZWN0b3IzRCgpO1xyXG5cdHByaXZhdGUgX29yaWVudGF0aW9uTWF0cml4Ok1hdHJpeDNEID0gbmV3IE1hdHJpeDNEKCk7XHJcblx0cHJpdmF0ZSBfcGl2b3RaZXJvOmJvb2xlYW4gPSB0cnVlO1xyXG5cdHByaXZhdGUgX3Bpdm90RGlydHk6Ym9vbGVhbiA9IHRydWU7XHJcblx0cHJpdmF0ZSBfcG9zOlZlY3RvcjNEID0gbmV3IFZlY3RvcjNEKCk7XHJcblx0cHJpdmF0ZSBfcm90OlZlY3RvcjNEID0gbmV3IFZlY3RvcjNEKCk7XHJcblx0cHJpdmF0ZSBfc2NhOlZlY3RvcjNEID0gbmV3IFZlY3RvcjNEKCk7XHJcblx0cHJpdmF0ZSBfdHJhbnNmb3JtQ29tcG9uZW50czpBcnJheTxWZWN0b3IzRD47XHJcblxyXG5cdHB1YmxpYyBfcElnbm9yZVRyYW5zZm9ybTpib29sZWFuID0gZmFsc2U7XHJcblxyXG5cdHByaXZhdGUgX3NoYWRlclBpY2tpbmdEZXRhaWxzOmJvb2xlYW47XHJcblxyXG5cdHB1YmxpYyBfcFBpY2tpbmdDb2xsaXNpb25WTzpQaWNraW5nQ29sbGlzaW9uVk87XHJcblxyXG5cdHB1YmxpYyBfYm91bmRzVHlwZTpzdHJpbmc7XHJcblxyXG5cdHB1YmxpYyBfcFBpY2tpbmdDb2xsaWRlcjpJUGlja2luZ0NvbGxpZGVyO1xyXG5cclxuXHRwdWJsaWMgX3BSZW5kZXJhYmxlczpBcnJheTxJUmVuZGVyYWJsZT4gPSBuZXcgQXJyYXk8SVJlbmRlcmFibGU+KCk7XHJcblx0cHJpdmF0ZSBfZW50aXR5Tm9kZXM6QXJyYXk8RW50aXR5Tm9kZT4gPSBuZXcgQXJyYXk8RW50aXR5Tm9kZT4oKTtcclxuXHJcblx0cHVibGljIF9pU291cmNlUHJlZmFiOlByZWZhYkJhc2U7XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGFsaWdubWVudE1vZGU6c3RyaW5nID0gQWxpZ25tZW50TW9kZS5SRUdJU1RSQVRJT05fUE9JTlQ7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluZGljYXRlcyB0aGUgYWxwaGEgdHJhbnNwYXJlbmN5IHZhbHVlIG9mIHRoZSBvYmplY3Qgc3BlY2lmaWVkLiBWYWxpZFxyXG5cdCAqIHZhbHVlcyBhcmUgMChmdWxseSB0cmFuc3BhcmVudCkgdG8gMShmdWxseSBvcGFxdWUpLiBUaGUgZGVmYXVsdCB2YWx1ZSBpc1xyXG5cdCAqIDEuIERpc3BsYXkgb2JqZWN0cyB3aXRoIDxjb2RlPmFscGhhPC9jb2RlPiBzZXQgdG8gMCA8aT5hcmU8L2k+IGFjdGl2ZSxcclxuXHQgKiBldmVuIHRob3VnaCB0aGV5IGFyZSBpbnZpc2libGUuXHJcblx0ICovXHJcblx0cHVibGljIGFscGhhOm51bWJlcjtcclxuXHJcblx0LyoqXHJcblx0ICogQSB2YWx1ZSBmcm9tIHRoZSBCbGVuZE1vZGUgY2xhc3MgdGhhdCBzcGVjaWZpZXMgd2hpY2ggYmxlbmQgbW9kZSB0byB1c2UuIEFcclxuXHQgKiBiaXRtYXAgY2FuIGJlIGRyYXduIGludGVybmFsbHkgaW4gdHdvIHdheXMuIElmIHlvdSBoYXZlIGEgYmxlbmQgbW9kZVxyXG5cdCAqIGVuYWJsZWQgb3IgYW4gZXh0ZXJuYWwgY2xpcHBpbmcgbWFzaywgdGhlIGJpdG1hcCBpcyBkcmF3biBieSBhZGRpbmcgYVxyXG5cdCAqIGJpdG1hcC1maWxsZWQgc3F1YXJlIHNoYXBlIHRvIHRoZSB2ZWN0b3IgcmVuZGVyLiBJZiB5b3UgYXR0ZW1wdCB0byBzZXRcclxuXHQgKiB0aGlzIHByb3BlcnR5IHRvIGFuIGludmFsaWQgdmFsdWUsIEZsYXNoIHJ1bnRpbWVzIHNldCB0aGUgdmFsdWUgdG9cclxuXHQgKiA8Y29kZT5CbGVuZE1vZGUuTk9STUFMPC9jb2RlPi5cclxuXHQgKlxyXG5cdCAqIDxwPlRoZSA8Y29kZT5ibGVuZE1vZGU8L2NvZGU+IHByb3BlcnR5IGFmZmVjdHMgZWFjaCBwaXhlbCBvZiB0aGUgZGlzcGxheVxyXG5cdCAqIG9iamVjdC4gRWFjaCBwaXhlbCBpcyBjb21wb3NlZCBvZiB0aHJlZSBjb25zdGl0dWVudCBjb2xvcnMocmVkLCBncmVlbixcclxuXHQgKiBhbmQgYmx1ZSksIGFuZCBlYWNoIGNvbnN0aXR1ZW50IGNvbG9yIGhhcyBhIHZhbHVlIGJldHdlZW4gMHgwMCBhbmQgMHhGRi5cclxuXHQgKiBGbGFzaCBQbGF5ZXIgb3IgQWRvYmUgQUlSIGNvbXBhcmVzIGVhY2ggY29uc3RpdHVlbnQgY29sb3Igb2Ygb25lIHBpeGVsIGluXHJcblx0ICogdGhlIG1vdmllIGNsaXAgd2l0aCB0aGUgY29ycmVzcG9uZGluZyBjb2xvciBvZiB0aGUgcGl4ZWwgaW4gdGhlXHJcblx0ICogYmFja2dyb3VuZC4gRm9yIGV4YW1wbGUsIGlmIDxjb2RlPmJsZW5kTW9kZTwvY29kZT4gaXMgc2V0IHRvXHJcblx0ICogPGNvZGU+QmxlbmRNb2RlLkxJR0hURU48L2NvZGU+LCBGbGFzaCBQbGF5ZXIgb3IgQWRvYmUgQUlSIGNvbXBhcmVzIHRoZSByZWRcclxuXHQgKiB2YWx1ZSBvZiB0aGUgZGlzcGxheSBvYmplY3Qgd2l0aCB0aGUgcmVkIHZhbHVlIG9mIHRoZSBiYWNrZ3JvdW5kLCBhbmQgdXNlc1xyXG5cdCAqIHRoZSBsaWdodGVyIG9mIHRoZSB0d28gYXMgdGhlIHZhbHVlIGZvciB0aGUgcmVkIGNvbXBvbmVudCBvZiB0aGUgZGlzcGxheWVkXHJcblx0ICogY29sb3IuPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+VGhlIGZvbGxvd2luZyB0YWJsZSBkZXNjcmliZXMgdGhlIDxjb2RlPmJsZW5kTW9kZTwvY29kZT4gc2V0dGluZ3MuIFRoZVxyXG5cdCAqIEJsZW5kTW9kZSBjbGFzcyBkZWZpbmVzIHN0cmluZyB2YWx1ZXMgeW91IGNhbiB1c2UuIFRoZSBpbGx1c3RyYXRpb25zIGluXHJcblx0ICogdGhlIHRhYmxlIHNob3cgPGNvZGU+YmxlbmRNb2RlPC9jb2RlPiB2YWx1ZXMgYXBwbGllZCB0byBhIGNpcmN1bGFyIGRpc3BsYXlcclxuXHQgKiBvYmplY3QoMikgc3VwZXJpbXBvc2VkIG9uIGFub3RoZXIgZGlzcGxheSBvYmplY3QoMSkuPC9wPlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBibGVuZE1vZGU6QmxlbmRNb2RlO1xyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgYm91bmRzVHlwZSgpOnN0cmluZ1xyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9ib3VuZHNUeXBlO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBib3VuZHNUeXBlKHZhbHVlOnN0cmluZylcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fYm91bmRzVHlwZSA9PSB2YWx1ZSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX2JvdW5kc1R5cGUgPSB2YWx1ZTtcclxuXHJcblx0XHR0aGlzLl9wSW52YWxpZGF0ZUJvdW5kcygpO1xyXG5cclxuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fZW50aXR5Tm9kZXMubGVuZ3RoO1xyXG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgbGVuOyBpKyspXHJcblx0XHRcdHRoaXMuX2VudGl0eU5vZGVzW2ldLnVwZGF0ZUJvdW5kcygpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSWYgc2V0IHRvIDxjb2RlPnRydWU8L2NvZGU+LCBOTUUgd2lsbCB1c2UgdGhlIHNvZnR3YXJlIHJlbmRlcmVyIHRvIGNhY2hlXHJcblx0ICogYW4gaW50ZXJuYWwgYml0bWFwIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBkaXNwbGF5IG9iamVjdC4gRm9yIG5hdGl2ZSB0YXJnZXRzLFxyXG5cdCAqIHRoaXMgaXMgb2Z0ZW4gbXVjaCBzbG93ZXIgdGhhbiB0aGUgZGVmYXVsdCBoYXJkd2FyZSByZW5kZXJlci4gV2hlbiB5b3VcclxuXHQgKiBhcmUgdXNpbmcgdGhlIEZsYXNoIHRhcmdldCwgdGhpcyBjYWNoaW5nIG1heSBpbmNyZWFzZSBwZXJmb3JtYW5jZSBmb3IgZGlzcGxheVxyXG5cdCAqIG9iamVjdHMgdGhhdCBjb250YWluIGNvbXBsZXggdmVjdG9yIGNvbnRlbnQuXHJcblx0ICpcclxuXHQgKiA8cD5BbGwgdmVjdG9yIGRhdGEgZm9yIGEgZGlzcGxheSBvYmplY3QgdGhhdCBoYXMgYSBjYWNoZWQgYml0bWFwIGlzIGRyYXduXHJcblx0ICogdG8gdGhlIGJpdG1hcCBpbnN0ZWFkIG9mIHRoZSBtYWluIGRpc3BsYXkuIElmXHJcblx0ICogPGNvZGU+Y2FjaGVBc0JpdG1hcE1hdHJpeDwvY29kZT4gaXMgbnVsbCBvciB1bnN1cHBvcnRlZCwgdGhlIGJpdG1hcCBpc1xyXG5cdCAqIHRoZW4gY29waWVkIHRvIHRoZSBtYWluIGRpc3BsYXkgYXMgdW5zdHJldGNoZWQsIHVucm90YXRlZCBwaXhlbHMgc25hcHBlZFxyXG5cdCAqIHRvIHRoZSBuZWFyZXN0IHBpeGVsIGJvdW5kYXJpZXMuIFBpeGVscyBhcmUgbWFwcGVkIDEgdG8gMSB3aXRoIHRoZSBwYXJlbnRcclxuXHQgKiBvYmplY3QuIElmIHRoZSBib3VuZHMgb2YgdGhlIGJpdG1hcCBjaGFuZ2UsIHRoZSBiaXRtYXAgaXMgcmVjcmVhdGVkXHJcblx0ICogaW5zdGVhZCBvZiBiZWluZyBzdHJldGNoZWQuPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+SWYgPGNvZGU+Y2FjaGVBc0JpdG1hcE1hdHJpeDwvY29kZT4gaXMgbm9uLW51bGwgYW5kIHN1cHBvcnRlZCwgdGhlXHJcblx0ICogb2JqZWN0IGlzIGRyYXduIHRvIHRoZSBvZmYtc2NyZWVuIGJpdG1hcCB1c2luZyB0aGF0IG1hdHJpeCBhbmQgdGhlXHJcblx0ICogc3RyZXRjaGVkIGFuZC9vciByb3RhdGVkIHJlc3VsdHMgb2YgdGhhdCByZW5kZXJpbmcgYXJlIHVzZWQgdG8gZHJhdyB0aGVcclxuXHQgKiBvYmplY3QgdG8gdGhlIG1haW4gZGlzcGxheS48L3A+XHJcblx0ICpcclxuXHQgKiA8cD5ObyBpbnRlcm5hbCBiaXRtYXAgaXMgY3JlYXRlZCB1bmxlc3MgdGhlIDxjb2RlPmNhY2hlQXNCaXRtYXA8L2NvZGU+XHJcblx0ICogcHJvcGVydHkgaXMgc2V0IHRvIDxjb2RlPnRydWU8L2NvZGU+LjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPkFmdGVyIHlvdSBzZXQgdGhlIDxjb2RlPmNhY2hlQXNCaXRtYXA8L2NvZGU+IHByb3BlcnR5IHRvXHJcblx0ICogPGNvZGU+dHJ1ZTwvY29kZT4sIHRoZSByZW5kZXJpbmcgZG9lcyBub3QgY2hhbmdlLCBob3dldmVyIHRoZSBkaXNwbGF5XHJcblx0ICogb2JqZWN0IHBlcmZvcm1zIHBpeGVsIHNuYXBwaW5nIGF1dG9tYXRpY2FsbHkuIFRoZSBhbmltYXRpb24gc3BlZWQgY2FuIGJlXHJcblx0ICogc2lnbmlmaWNhbnRseSBmYXN0ZXIgZGVwZW5kaW5nIG9uIHRoZSBjb21wbGV4aXR5IG9mIHRoZSB2ZWN0b3IgY29udGVudC5cclxuXHQgKiA8L3A+XHJcblx0ICpcclxuXHQgKiA8cD5UaGUgPGNvZGU+Y2FjaGVBc0JpdG1hcDwvY29kZT4gcHJvcGVydHkgaXMgYXV0b21hdGljYWxseSBzZXQgdG9cclxuXHQgKiA8Y29kZT50cnVlPC9jb2RlPiB3aGVuZXZlciB5b3UgYXBwbHkgYSBmaWx0ZXIgdG8gYSBkaXNwbGF5IG9iamVjdCh3aGVuXHJcblx0ICogaXRzIDxjb2RlPmZpbHRlcjwvY29kZT4gYXJyYXkgaXMgbm90IGVtcHR5KSwgYW5kIGlmIGEgZGlzcGxheSBvYmplY3QgaGFzIGFcclxuXHQgKiBmaWx0ZXIgYXBwbGllZCB0byBpdCwgPGNvZGU+Y2FjaGVBc0JpdG1hcDwvY29kZT4gaXMgcmVwb3J0ZWQgYXNcclxuXHQgKiA8Y29kZT50cnVlPC9jb2RlPiBmb3IgdGhhdCBkaXNwbGF5IG9iamVjdCwgZXZlbiBpZiB5b3Ugc2V0IHRoZSBwcm9wZXJ0eSB0b1xyXG5cdCAqIDxjb2RlPmZhbHNlPC9jb2RlPi4gSWYgeW91IGNsZWFyIGFsbCBmaWx0ZXJzIGZvciBhIGRpc3BsYXkgb2JqZWN0LCB0aGVcclxuXHQgKiA8Y29kZT5jYWNoZUFzQml0bWFwPC9jb2RlPiBzZXR0aW5nIGNoYW5nZXMgdG8gd2hhdCBpdCB3YXMgbGFzdCBzZXQgdG8uPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+QSBkaXNwbGF5IG9iamVjdCBkb2VzIG5vdCB1c2UgYSBiaXRtYXAgZXZlbiBpZiB0aGVcclxuXHQgKiA8Y29kZT5jYWNoZUFzQml0bWFwPC9jb2RlPiBwcm9wZXJ0eSBpcyBzZXQgdG8gPGNvZGU+dHJ1ZTwvY29kZT4gYW5kXHJcblx0ICogaW5zdGVhZCByZW5kZXJzIGZyb20gdmVjdG9yIGRhdGEgaW4gdGhlIGZvbGxvd2luZyBjYXNlczo8L3A+XHJcblx0ICpcclxuXHQgKiA8dWw+XHJcblx0ICogICA8bGk+VGhlIGJpdG1hcCBpcyB0b28gbGFyZ2UuIEluIEFJUiAxLjUgYW5kIEZsYXNoIFBsYXllciAxMCwgdGhlIG1heGltdW1cclxuXHQgKiBzaXplIGZvciBhIGJpdG1hcCBpbWFnZSBpcyA4LDE5MSBwaXhlbHMgaW4gd2lkdGggb3IgaGVpZ2h0LCBhbmQgdGhlIHRvdGFsXHJcblx0ICogbnVtYmVyIG9mIHBpeGVscyBjYW5ub3QgZXhjZWVkIDE2LDc3NywyMTUgcGl4ZWxzLihTbywgaWYgYSBiaXRtYXAgaW1hZ2VcclxuXHQgKiBpcyA4LDE5MSBwaXhlbHMgd2lkZSwgaXQgY2FuIG9ubHkgYmUgMiwwNDggcGl4ZWxzIGhpZ2guKSBJbiBGbGFzaCBQbGF5ZXIgOVxyXG5cdCAqIGFuZCBlYXJsaWVyLCB0aGUgbGltaXRhdGlvbiBpcyBpcyAyODgwIHBpeGVscyBpbiBoZWlnaHQgYW5kIDIsODgwIHBpeGVsc1xyXG5cdCAqIGluIHdpZHRoLjwvbGk+XHJcblx0ICogICA8bGk+VGhlIGJpdG1hcCBmYWlscyB0byBhbGxvY2F0ZShvdXQgb2YgbWVtb3J5IGVycm9yKS4gPC9saT5cclxuXHQgKiA8L3VsPlxyXG5cdCAqXHJcblx0ICogPHA+VGhlIDxjb2RlPmNhY2hlQXNCaXRtYXA8L2NvZGU+IHByb3BlcnR5IGlzIGJlc3QgdXNlZCB3aXRoIG1vdmllIGNsaXBzXHJcblx0ICogdGhhdCBoYXZlIG1vc3RseSBzdGF0aWMgY29udGVudCBhbmQgdGhhdCBkbyBub3Qgc2NhbGUgYW5kIHJvdGF0ZVxyXG5cdCAqIGZyZXF1ZW50bHkuIFdpdGggc3VjaCBtb3ZpZSBjbGlwcywgPGNvZGU+Y2FjaGVBc0JpdG1hcDwvY29kZT4gY2FuIGxlYWQgdG9cclxuXHQgKiBwZXJmb3JtYW5jZSBpbmNyZWFzZXMgd2hlbiB0aGUgbW92aWUgY2xpcCBpcyB0cmFuc2xhdGVkKHdoZW4gaXRzIDxpPng8L2k+XHJcblx0ICogYW5kIDxpPnk8L2k+IHBvc2l0aW9uIGlzIGNoYW5nZWQpLjwvcD5cclxuXHQgKi9cclxuXHRwdWJsaWMgY2FjaGVBc0JpdG1hcDpib29sZWFuO1xyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBjYXN0c1NoYWRvd3M6Ym9vbGVhbiA9IHRydWU7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluZGljYXRlcyB0aGUgZGVwdGggb2YgdGhlIGRpc3BsYXkgb2JqZWN0LCBpbiBwaXhlbHMuIFRoZSBkZXB0aCBpc1xyXG5cdCAqIGNhbGN1bGF0ZWQgYmFzZWQgb24gdGhlIGJvdW5kcyBvZiB0aGUgY29udGVudCBvZiB0aGUgZGlzcGxheSBvYmplY3QuIFdoZW5cclxuXHQgKiB5b3Ugc2V0IHRoZSA8Y29kZT5kZXB0aDwvY29kZT4gcHJvcGVydHksIHRoZSA8Y29kZT5zY2FsZVo8L2NvZGU+IHByb3BlcnR5XHJcblx0ICogaXMgYWRqdXN0ZWQgYWNjb3JkaW5nbHksIGFzIHNob3duIGluIHRoZSBmb2xsb3dpbmcgY29kZTpcclxuXHQgKlxyXG5cdCAqIDxwPkV4Y2VwdCBmb3IgVGV4dEZpZWxkIGFuZCBWaWRlbyBvYmplY3RzLCBhIGRpc3BsYXkgb2JqZWN0IHdpdGggbm9cclxuXHQgKiBjb250ZW50IChzdWNoIGFzIGFuIGVtcHR5IHNwcml0ZSkgaGFzIGEgZGVwdGggb2YgMCwgZXZlbiBpZiB5b3UgdHJ5IHRvXHJcblx0ICogc2V0IDxjb2RlPmRlcHRoPC9jb2RlPiB0byBhIGRpZmZlcmVudCB2YWx1ZS48L3A+XHJcblx0ICovXHJcblx0cHVibGljIGdldCBkZXB0aCgpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLmdldEJveCgpLmRlcHRoKnRoaXMuX3BTY2FsZVo7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IGRlcHRoKHZhbDpudW1iZXIpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX2RlcHRoID09IHZhbClcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX2RlcHRoID0gdmFsO1xyXG5cclxuXHRcdHRoaXMuX3BTY2FsZVogPSB2YWwvdGhpcy5nZXRCb3goKS5kZXB0aDtcclxuXHJcblx0XHR0aGlzLmludmFsaWRhdGVTY2FsZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRGVmaW5lcyB0aGUgcm90YXRpb24gb2YgdGhlIDNkIG9iamVjdCBhcyBhIDxjb2RlPlZlY3RvcjNEPC9jb2RlPiBvYmplY3QgY29udGFpbmluZyBldWxlciBhbmdsZXMgZm9yIHJvdGF0aW9uIGFyb3VuZCB4LCB5IGFuZCB6IGF4aXMuXHJcblx0ICovXHJcblx0cHVibGljIGdldCBldWxlcnMoKTpWZWN0b3IzRFxyXG5cdHtcclxuXHRcdHRoaXMuX2V1bGVycy54ID0gdGhpcy5fcm90YXRpb25YKk1hdGhDb25zdHMuUkFESUFOU19UT19ERUdSRUVTO1xyXG5cdFx0dGhpcy5fZXVsZXJzLnkgPSB0aGlzLl9yb3RhdGlvblkqTWF0aENvbnN0cy5SQURJQU5TX1RPX0RFR1JFRVM7XHJcblx0XHR0aGlzLl9ldWxlcnMueiA9IHRoaXMuX3JvdGF0aW9uWipNYXRoQ29uc3RzLlJBRElBTlNfVE9fREVHUkVFUztcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fZXVsZXJzO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBldWxlcnModmFsdWU6VmVjdG9yM0QpXHJcblx0e1xyXG5cdFx0dGhpcy5fcm90YXRpb25YID0gdmFsdWUueCpNYXRoQ29uc3RzLkRFR1JFRVNfVE9fUkFESUFOUztcclxuXHRcdHRoaXMuX3JvdGF0aW9uWSA9IHZhbHVlLnkqTWF0aENvbnN0cy5ERUdSRUVTX1RPX1JBRElBTlM7XHJcblx0XHR0aGlzLl9yb3RhdGlvblogPSB2YWx1ZS56Kk1hdGhDb25zdHMuREVHUkVFU19UT19SQURJQU5TO1xyXG5cclxuXHRcdHRoaXMuaW52YWxpZGF0ZVJvdGF0aW9uKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBbiBvYmplY3QgdGhhdCBjYW4gY29udGFpbiBhbnkgZXh0cmEgZGF0YS5cclxuXHQgKi9cclxuXHRwdWJsaWMgZXh0cmE6T2JqZWN0O1xyXG5cclxuXHQvKipcclxuXHQgKiBBbiBpbmRleGVkIGFycmF5IHRoYXQgY29udGFpbnMgZWFjaCBmaWx0ZXIgb2JqZWN0IGN1cnJlbnRseSBhc3NvY2lhdGVkXHJcblx0ICogd2l0aCB0aGUgZGlzcGxheSBvYmplY3QuIFRoZSBmbGFzaC5maWx0ZXJzIHBhY2thZ2UgY29udGFpbnMgc2V2ZXJhbFxyXG5cdCAqIGNsYXNzZXMgdGhhdCBkZWZpbmUgc3BlY2lmaWMgZmlsdGVycyB5b3UgY2FuIHVzZS5cclxuXHQgKlxyXG5cdCAqIDxwPkZpbHRlcnMgY2FuIGJlIGFwcGxpZWQgaW4gRmxhc2ggUHJvZmVzc2lvbmFsIGF0IGRlc2lnbiB0aW1lLCBvciBhdCBydW5cclxuXHQgKiB0aW1lIGJ5IHVzaW5nIEFjdGlvblNjcmlwdCBjb2RlLiBUbyBhcHBseSBhIGZpbHRlciBieSB1c2luZyBBY3Rpb25TY3JpcHQsXHJcblx0ICogeW91IG11c3QgbWFrZSBhIHRlbXBvcmFyeSBjb3B5IG9mIHRoZSBlbnRpcmUgPGNvZGU+ZmlsdGVyczwvY29kZT4gYXJyYXksXHJcblx0ICogbW9kaWZ5IHRoZSB0ZW1wb3JhcnkgYXJyYXksIHRoZW4gYXNzaWduIHRoZSB2YWx1ZSBvZiB0aGUgdGVtcG9yYXJ5IGFycmF5XHJcblx0ICogYmFjayB0byB0aGUgPGNvZGU+ZmlsdGVyczwvY29kZT4gYXJyYXkuIFlvdSBjYW5ub3QgZGlyZWN0bHkgYWRkIGEgbmV3XHJcblx0ICogZmlsdGVyIG9iamVjdCB0byB0aGUgPGNvZGU+ZmlsdGVyczwvY29kZT4gYXJyYXkuPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+VG8gYWRkIGEgZmlsdGVyIGJ5IHVzaW5nIEFjdGlvblNjcmlwdCwgcGVyZm9ybSB0aGUgZm9sbG93aW5nIHN0ZXBzXHJcblx0ICogKGFzc3VtZSB0aGF0IHRoZSB0YXJnZXQgZGlzcGxheSBvYmplY3QgaXMgbmFtZWRcclxuXHQgKiA8Y29kZT5teURpc3BsYXlPYmplY3Q8L2NvZGU+KTo8L3A+XHJcblx0ICpcclxuXHQgKiA8b2w+XHJcblx0ICogICA8bGk+Q3JlYXRlIGEgbmV3IGZpbHRlciBvYmplY3QgYnkgdXNpbmcgdGhlIGNvbnN0cnVjdG9yIG1ldGhvZCBvZiB5b3VyXHJcblx0ICogY2hvc2VuIGZpbHRlciBjbGFzcy48L2xpPlxyXG5cdCAqICAgPGxpPkFzc2lnbiB0aGUgdmFsdWUgb2YgdGhlIDxjb2RlPm15RGlzcGxheU9iamVjdC5maWx0ZXJzPC9jb2RlPiBhcnJheVxyXG5cdCAqIHRvIGEgdGVtcG9yYXJ5IGFycmF5LCBzdWNoIGFzIG9uZSBuYW1lZCA8Y29kZT5teUZpbHRlcnM8L2NvZGU+LjwvbGk+XHJcblx0ICogICA8bGk+QWRkIHRoZSBuZXcgZmlsdGVyIG9iamVjdCB0byB0aGUgPGNvZGU+bXlGaWx0ZXJzPC9jb2RlPiB0ZW1wb3JhcnlcclxuXHQgKiBhcnJheS48L2xpPlxyXG5cdCAqICAgPGxpPkFzc2lnbiB0aGUgdmFsdWUgb2YgdGhlIHRlbXBvcmFyeSBhcnJheSB0byB0aGVcclxuXHQgKiA8Y29kZT5teURpc3BsYXlPYmplY3QuZmlsdGVyczwvY29kZT4gYXJyYXkuPC9saT5cclxuXHQgKiA8L29sPlxyXG5cdCAqXHJcblx0ICogPHA+SWYgdGhlIDxjb2RlPmZpbHRlcnM8L2NvZGU+IGFycmF5IGlzIHVuZGVmaW5lZCwgeW91IGRvIG5vdCBuZWVkIHRvIHVzZVxyXG5cdCAqIGEgdGVtcG9yYXJ5IGFycmF5LiBJbnN0ZWFkLCB5b3UgY2FuIGRpcmVjdGx5IGFzc2lnbiBhbiBhcnJheSBsaXRlcmFsIHRoYXRcclxuXHQgKiBjb250YWlucyBvbmUgb3IgbW9yZSBmaWx0ZXIgb2JqZWN0cyB0aGF0IHlvdSBjcmVhdGUuIFRoZSBmaXJzdCBleGFtcGxlIGluXHJcblx0ICogdGhlIEV4YW1wbGVzIHNlY3Rpb24gYWRkcyBhIGRyb3Agc2hhZG93IGZpbHRlciBieSB1c2luZyBjb2RlIHRoYXQgaGFuZGxlc1xyXG5cdCAqIGJvdGggZGVmaW5lZCBhbmQgdW5kZWZpbmVkIDxjb2RlPmZpbHRlcnM8L2NvZGU+IGFycmF5cy48L3A+XHJcblx0ICpcclxuXHQgKiA8cD5UbyBtb2RpZnkgYW4gZXhpc3RpbmcgZmlsdGVyIG9iamVjdCwgeW91IG11c3QgdXNlIHRoZSB0ZWNobmlxdWUgb2ZcclxuXHQgKiBtb2RpZnlpbmcgYSBjb3B5IG9mIHRoZSA8Y29kZT5maWx0ZXJzPC9jb2RlPiBhcnJheTo8L3A+XHJcblx0ICpcclxuXHQgKiA8b2w+XHJcblx0ICogICA8bGk+QXNzaWduIHRoZSB2YWx1ZSBvZiB0aGUgPGNvZGU+ZmlsdGVyczwvY29kZT4gYXJyYXkgdG8gYSB0ZW1wb3JhcnlcclxuXHQgKiBhcnJheSwgc3VjaCBhcyBvbmUgbmFtZWQgPGNvZGU+bXlGaWx0ZXJzPC9jb2RlPi48L2xpPlxyXG5cdCAqICAgPGxpPk1vZGlmeSB0aGUgcHJvcGVydHkgYnkgdXNpbmcgdGhlIHRlbXBvcmFyeSBhcnJheSxcclxuXHQgKiA8Y29kZT5teUZpbHRlcnM8L2NvZGU+LiBGb3IgZXhhbXBsZSwgdG8gc2V0IHRoZSBxdWFsaXR5IHByb3BlcnR5IG9mIHRoZVxyXG5cdCAqIGZpcnN0IGZpbHRlciBpbiB0aGUgYXJyYXksIHlvdSBjb3VsZCB1c2UgdGhlIGZvbGxvd2luZyBjb2RlOlxyXG5cdCAqIDxjb2RlPm15RmlsdGVyc1swXS5xdWFsaXR5ID0gMTs8L2NvZGU+PC9saT5cclxuXHQgKiAgIDxsaT5Bc3NpZ24gdGhlIHZhbHVlIG9mIHRoZSB0ZW1wb3JhcnkgYXJyYXkgdG8gdGhlIDxjb2RlPmZpbHRlcnM8L2NvZGU+XHJcblx0ICogYXJyYXkuPC9saT5cclxuXHQgKiA8L29sPlxyXG5cdCAqXHJcblx0ICogPHA+QXQgbG9hZCB0aW1lLCBpZiBhIGRpc3BsYXkgb2JqZWN0IGhhcyBhbiBhc3NvY2lhdGVkIGZpbHRlciwgaXQgaXNcclxuXHQgKiBtYXJrZWQgdG8gY2FjaGUgaXRzZWxmIGFzIGEgdHJhbnNwYXJlbnQgYml0bWFwLiBGcm9tIHRoaXMgcG9pbnQgZm9yd2FyZCxcclxuXHQgKiBhcyBsb25nIGFzIHRoZSBkaXNwbGF5IG9iamVjdCBoYXMgYSB2YWxpZCBmaWx0ZXIgbGlzdCwgdGhlIHBsYXllciBjYWNoZXNcclxuXHQgKiB0aGUgZGlzcGxheSBvYmplY3QgYXMgYSBiaXRtYXAuIFRoaXMgc291cmNlIGJpdG1hcCBpcyB1c2VkIGFzIGEgc291cmNlXHJcblx0ICogaW1hZ2UgZm9yIHRoZSBmaWx0ZXIgZWZmZWN0cy4gRWFjaCBkaXNwbGF5IG9iamVjdCB1c3VhbGx5IGhhcyB0d28gYml0bWFwczpcclxuXHQgKiBvbmUgd2l0aCB0aGUgb3JpZ2luYWwgdW5maWx0ZXJlZCBzb3VyY2UgZGlzcGxheSBvYmplY3QgYW5kIGFub3RoZXIgZm9yIHRoZVxyXG5cdCAqIGZpbmFsIGltYWdlIGFmdGVyIGZpbHRlcmluZy4gVGhlIGZpbmFsIGltYWdlIGlzIHVzZWQgd2hlbiByZW5kZXJpbmcuIEFzXHJcblx0ICogbG9uZyBhcyB0aGUgZGlzcGxheSBvYmplY3QgZG9lcyBub3QgY2hhbmdlLCB0aGUgZmluYWwgaW1hZ2UgZG9lcyBub3QgbmVlZFxyXG5cdCAqIHVwZGF0aW5nLjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPlRoZSBmbGFzaC5maWx0ZXJzIHBhY2thZ2UgaW5jbHVkZXMgY2xhc3NlcyBmb3IgZmlsdGVycy4gRm9yIGV4YW1wbGUsIHRvXHJcblx0ICogY3JlYXRlIGEgRHJvcFNoYWRvdyBmaWx0ZXIsIHlvdSB3b3VsZCB3cml0ZTo8L3A+XHJcblx0ICpcclxuXHQgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgV2hlbiA8Y29kZT5maWx0ZXJzPC9jb2RlPiBpbmNsdWRlcyBhIFNoYWRlckZpbHRlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBhbmQgdGhlIHNoYWRlciBvdXRwdXQgdHlwZSBpcyBub3QgY29tcGF0aWJsZSB3aXRoXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIHRoaXMgb3BlcmF0aW9uKHRoZSBzaGFkZXIgbXVzdCBzcGVjaWZ5IGFcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+cGl4ZWw0PC9jb2RlPiBvdXRwdXQpLlxyXG5cdCAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciBXaGVuIDxjb2RlPmZpbHRlcnM8L2NvZGU+IGluY2x1ZGVzIGEgU2hhZGVyRmlsdGVyXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIGFuZCB0aGUgc2hhZGVyIGRvZXNuJ3Qgc3BlY2lmeSBhbnkgaW1hZ2UgaW5wdXQgb3JcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgdGhlIGZpcnN0IGlucHV0IGlzIG5vdCBhbiA8Y29kZT5pbWFnZTQ8L2NvZGU+IGlucHV0LlxyXG5cdCAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciBXaGVuIDxjb2RlPmZpbHRlcnM8L2NvZGU+IGluY2x1ZGVzIGEgU2hhZGVyRmlsdGVyXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIGFuZCB0aGUgc2hhZGVyIHNwZWNpZmllcyBhbiBpbWFnZSBpbnB1dCB0aGF0IGlzbid0XHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVkLlxyXG5cdCAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciBXaGVuIDxjb2RlPmZpbHRlcnM8L2NvZGU+IGluY2x1ZGVzIGEgU2hhZGVyRmlsdGVyLCBhXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIEJ5dGVBcnJheSBvciBWZWN0b3IuPE51bWJlcj4gaW5zdGFuY2UgYXMgYSBzaGFkZXJcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQsIGFuZCB0aGUgPGNvZGU+d2lkdGg8L2NvZGU+IGFuZFxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5oZWlnaHQ8L2NvZGU+IHByb3BlcnRpZXMgYXJlbid0IHNwZWNpZmllZCBmb3JcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgdGhlIFNoYWRlcklucHV0IG9iamVjdCwgb3IgdGhlIHNwZWNpZmllZCB2YWx1ZXNcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgZG9uJ3QgbWF0Y2ggdGhlIGFtb3VudCBvZiBkYXRhIGluIHRoZSBpbnB1dCBkYXRhLlxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBTZWUgdGhlIDxjb2RlPlNoYWRlcklucHV0LmlucHV0PC9jb2RlPiBwcm9wZXJ0eSBmb3JcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgbW9yZSBpbmZvcm1hdGlvbi5cclxuXHQgKi9cclxuLy9cdFx0cHVibGljIGZpbHRlcnM6QXJyYXk8RHluYW1pYz47XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluZGljYXRlcyB0aGUgaGVpZ2h0IG9mIHRoZSBkaXNwbGF5IG9iamVjdCwgaW4gcGl4ZWxzLiBUaGUgaGVpZ2h0IGlzXHJcblx0ICogY2FsY3VsYXRlZCBiYXNlZCBvbiB0aGUgYm91bmRzIG9mIHRoZSBjb250ZW50IG9mIHRoZSBkaXNwbGF5IG9iamVjdC4gV2hlblxyXG5cdCAqIHlvdSBzZXQgdGhlIDxjb2RlPmhlaWdodDwvY29kZT4gcHJvcGVydHksIHRoZSA8Y29kZT5zY2FsZVk8L2NvZGU+IHByb3BlcnR5XHJcblx0ICogaXMgYWRqdXN0ZWQgYWNjb3JkaW5nbHksIGFzIHNob3duIGluIHRoZSBmb2xsb3dpbmcgY29kZTpcclxuXHQgKlxyXG5cdCAqIDxwPkV4Y2VwdCBmb3IgVGV4dEZpZWxkIGFuZCBWaWRlbyBvYmplY3RzLCBhIGRpc3BsYXkgb2JqZWN0IHdpdGggbm9cclxuXHQgKiBjb250ZW50IChzdWNoIGFzIGFuIGVtcHR5IHNwcml0ZSkgaGFzIGEgaGVpZ2h0IG9mIDAsIGV2ZW4gaWYgeW91IHRyeSB0b1xyXG5cdCAqIHNldCA8Y29kZT5oZWlnaHQ8L2NvZGU+IHRvIGEgZGlmZmVyZW50IHZhbHVlLjwvcD5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGhlaWdodCgpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLmdldEJveCgpLmhlaWdodCp0aGlzLl9wU2NhbGVZO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBoZWlnaHQodmFsOm51bWJlcilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5faGVpZ2h0ID09IHZhbClcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX2hlaWdodCA9IHZhbDtcclxuXHJcblx0XHR0aGlzLl9wU2NhbGVZID0gdmFsL3RoaXMuZ2V0Qm94KCkuaGVpZ2h0O1xyXG5cclxuXHRcdHRoaXMuaW52YWxpZGF0ZVNjYWxlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJbmRpY2F0ZXMgdGhlIGluc3RhbmNlIGNvbnRhaW5lciBpbmRleCBvZiB0aGUgRGlzcGxheU9iamVjdC4gVGhlIG9iamVjdCBjYW4gYmVcclxuXHQgKiBpZGVudGlmaWVkIGluIHRoZSBjaGlsZCBsaXN0IG9mIGl0cyBwYXJlbnQgZGlzcGxheSBvYmplY3QgY29udGFpbmVyIGJ5XHJcblx0ICogY2FsbGluZyB0aGUgPGNvZGU+Z2V0Q2hpbGRCeUluZGV4KCk8L2NvZGU+IG1ldGhvZCBvZiB0aGUgZGlzcGxheSBvYmplY3RcclxuXHQgKiBjb250YWluZXIuXHJcblx0ICpcclxuXHQgKiA8cD5JZiB0aGUgRGlzcGxheU9iamVjdCBoYXMgbm8gcGFyZW50IGNvbnRhaW5lciwgaW5kZXggZGVmYXVsdHMgdG8gMC48L3A+XHJcblx0ICovXHJcblx0cHVibGljIGdldCBpbmRleCgpOm51bWJlclxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9wUGFyZW50KVxyXG5cdFx0XHRyZXR1cm4gdGhpcy5fcFBhcmVudC5nZXRDaGlsZEluZGV4KHRoaXMpO1xyXG5cclxuXHRcdHJldHVybiAwO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGludmVyc2VTY2VuZVRyYW5zZm9ybSgpOk1hdHJpeDNEXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX2ludmVyc2VTY2VuZVRyYW5zZm9ybURpcnR5KSB7XHJcblx0XHRcdHRoaXMuX2ludmVyc2VTY2VuZVRyYW5zZm9ybS5jb3B5RnJvbSh0aGlzLnNjZW5lVHJhbnNmb3JtKTtcclxuXHRcdFx0dGhpcy5faW52ZXJzZVNjZW5lVHJhbnNmb3JtLmludmVydCgpO1xyXG5cdFx0XHR0aGlzLl9pbnZlcnNlU2NlbmVUcmFuc2Zvcm1EaXJ0eSA9IGZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXMuX2ludmVyc2VTY2VuZVRyYW5zZm9ybTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCBpZ25vcmVUcmFuc2Zvcm0oKTpib29sZWFuXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BJZ25vcmVUcmFuc2Zvcm07XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IGlnbm9yZVRyYW5zZm9ybSh2YWx1ZTpib29sZWFuKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9wSWdub3JlVHJhbnNmb3JtID09IHZhbHVlKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fcElnbm9yZVRyYW5zZm9ybSA9IHZhbHVlO1xyXG5cclxuXHRcdGlmICh2YWx1ZSkge1xyXG5cdFx0XHR0aGlzLl9wU2NlbmVUcmFuc2Zvcm0uaWRlbnRpdHkoKTtcclxuXHRcdFx0dGhpcy5fc2NlbmVQb3NpdGlvbi5zZXRUbygwLCAwLCAwKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnBJbnZhbGlkYXRlU2NlbmVUcmFuc2Zvcm0oKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCBpc0VudGl0eSgpXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BJc0VudGl0eTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgYSBMb2FkZXJJbmZvIG9iamVjdCBjb250YWluaW5nIGluZm9ybWF0aW9uIGFib3V0IGxvYWRpbmcgdGhlIGZpbGVcclxuXHQgKiB0byB3aGljaCB0aGlzIGRpc3BsYXkgb2JqZWN0IGJlbG9uZ3MuIFRoZSA8Y29kZT5sb2FkZXJJbmZvPC9jb2RlPiBwcm9wZXJ0eVxyXG5cdCAqIGlzIGRlZmluZWQgb25seSBmb3IgdGhlIHJvb3QgZGlzcGxheSBvYmplY3Qgb2YgYSBTV0YgZmlsZSBvciBmb3IgYSBsb2FkZWRcclxuXHQgKiBCaXRtYXAobm90IGZvciBhIEJpdG1hcCB0aGF0IGlzIGRyYXduIHdpdGggQWN0aW9uU2NyaXB0KS4gVG8gZmluZCB0aGVcclxuXHQgKiA8Y29kZT5sb2FkZXJJbmZvPC9jb2RlPiBvYmplY3QgYXNzb2NpYXRlZCB3aXRoIHRoZSBTV0YgZmlsZSB0aGF0IGNvbnRhaW5zXHJcblx0ICogYSBkaXNwbGF5IG9iamVjdCBuYW1lZCA8Y29kZT5teURpc3BsYXlPYmplY3Q8L2NvZGU+LCB1c2VcclxuXHQgKiA8Y29kZT5teURpc3BsYXlPYmplY3Qucm9vdC5sb2FkZXJJbmZvPC9jb2RlPi5cclxuXHQgKlxyXG5cdCAqIDxwPkEgbGFyZ2UgU1dGIGZpbGUgY2FuIG1vbml0b3IgaXRzIGRvd25sb2FkIGJ5IGNhbGxpbmdcclxuXHQgKiA8Y29kZT50aGlzLnJvb3QubG9hZGVySW5mby5hZGRFdmVudExpc3RlbmVyKEV2ZW50LkNPTVBMRVRFLFxyXG5cdCAqIGZ1bmMpPC9jb2RlPi48L3A+XHJcblx0ICovXHJcblx0cHVibGljIGdldCBsb2FkZXJJbmZvKCk6TG9hZGVySW5mb1xyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9sb2FkZXJJbmZvO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGNhbGxpbmcgZGlzcGxheSBvYmplY3QgaXMgbWFza2VkIGJ5IHRoZSBzcGVjaWZpZWQgPGNvZGU+bWFzazwvY29kZT5cclxuXHQgKiBvYmplY3QuIFRvIGVuc3VyZSB0aGF0IG1hc2tpbmcgd29ya3Mgd2hlbiB0aGUgU3RhZ2UgaXMgc2NhbGVkLCB0aGVcclxuXHQgKiA8Y29kZT5tYXNrPC9jb2RlPiBkaXNwbGF5IG9iamVjdCBtdXN0IGJlIGluIGFuIGFjdGl2ZSBwYXJ0IG9mIHRoZSBkaXNwbGF5XHJcblx0ICogbGlzdC4gVGhlIDxjb2RlPm1hc2s8L2NvZGU+IG9iamVjdCBpdHNlbGYgaXMgbm90IGRyYXduLiBTZXRcclxuXHQgKiA8Y29kZT5tYXNrPC9jb2RlPiB0byA8Y29kZT5udWxsPC9jb2RlPiB0byByZW1vdmUgdGhlIG1hc2suXHJcblx0ICpcclxuXHQgKiA8cD5UbyBiZSBhYmxlIHRvIHNjYWxlIGEgbWFzayBvYmplY3QsIGl0IG11c3QgYmUgb24gdGhlIGRpc3BsYXkgbGlzdC4gVG9cclxuXHQgKiBiZSBhYmxlIHRvIGRyYWcgYSBtYXNrIFNwcml0ZSBvYmplY3QoYnkgY2FsbGluZyBpdHNcclxuXHQgKiA8Y29kZT5zdGFydERyYWcoKTwvY29kZT4gbWV0aG9kKSwgaXQgbXVzdCBiZSBvbiB0aGUgZGlzcGxheSBsaXN0LiBUbyBjYWxsXHJcblx0ICogdGhlIDxjb2RlPnN0YXJ0RHJhZygpPC9jb2RlPiBtZXRob2QgZm9yIGEgbWFzayBzcHJpdGUgYmFzZWQgb24gYVxyXG5cdCAqIDxjb2RlPm1vdXNlRG93bjwvY29kZT4gZXZlbnQgYmVpbmcgZGlzcGF0Y2hlZCBieSB0aGUgc3ByaXRlLCBzZXQgdGhlXHJcblx0ICogc3ByaXRlJ3MgPGNvZGU+YnV0dG9uTW9kZTwvY29kZT4gcHJvcGVydHkgdG8gPGNvZGU+dHJ1ZTwvY29kZT4uPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+V2hlbiBkaXNwbGF5IG9iamVjdHMgYXJlIGNhY2hlZCBieSBzZXR0aW5nIHRoZVxyXG5cdCAqIDxjb2RlPmNhY2hlQXNCaXRtYXA8L2NvZGU+IHByb3BlcnR5IHRvIDxjb2RlPnRydWU8L2NvZGU+IGFuIHRoZVxyXG5cdCAqIDxjb2RlPmNhY2hlQXNCaXRtYXBNYXRyaXg8L2NvZGU+IHByb3BlcnR5IHRvIGEgTWF0cml4IG9iamVjdCwgYm90aCB0aGVcclxuXHQgKiBtYXNrIGFuZCB0aGUgZGlzcGxheSBvYmplY3QgYmVpbmcgbWFza2VkIG11c3QgYmUgcGFydCBvZiB0aGUgc2FtZSBjYWNoZWRcclxuXHQgKiBiaXRtYXAuIFRodXMsIGlmIHRoZSBkaXNwbGF5IG9iamVjdCBpcyBjYWNoZWQsIHRoZW4gdGhlIG1hc2sgbXVzdCBiZSBhXHJcblx0ICogY2hpbGQgb2YgdGhlIGRpc3BsYXkgb2JqZWN0LiBJZiBhbiBhbmNlc3RvciBvZiB0aGUgZGlzcGxheSBvYmplY3Qgb24gdGhlXHJcblx0ICogZGlzcGxheSBsaXN0IGlzIGNhY2hlZCwgdGhlbiB0aGUgbWFzayBtdXN0IGJlIGEgY2hpbGQgb2YgdGhhdCBhbmNlc3RvciBvclxyXG5cdCAqIG9uZSBvZiBpdHMgZGVzY2VuZGVudHMuIElmIG1vcmUgdGhhbiBvbmUgYW5jZXN0b3Igb2YgdGhlIG1hc2tlZCBvYmplY3QgaXNcclxuXHQgKiBjYWNoZWQsIHRoZW4gdGhlIG1hc2sgbXVzdCBiZSBhIGRlc2NlbmRlbnQgb2YgdGhlIGNhY2hlZCBjb250YWluZXIgY2xvc2VzdFxyXG5cdCAqIHRvIHRoZSBtYXNrZWQgb2JqZWN0IGluIHRoZSBkaXNwbGF5IGxpc3QuPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+PGI+Tm90ZTo8L2I+IEEgc2luZ2xlIDxjb2RlPm1hc2s8L2NvZGU+IG9iamVjdCBjYW5ub3QgYmUgdXNlZCB0byBtYXNrXHJcblx0ICogbW9yZSB0aGFuIG9uZSBjYWxsaW5nIGRpc3BsYXkgb2JqZWN0LiBXaGVuIHRoZSA8Y29kZT5tYXNrPC9jb2RlPiBpc1xyXG5cdCAqIGFzc2lnbmVkIHRvIGEgc2Vjb25kIGRpc3BsYXkgb2JqZWN0LCBpdCBpcyByZW1vdmVkIGFzIHRoZSBtYXNrIG9mIHRoZVxyXG5cdCAqIGZpcnN0IG9iamVjdCwgYW5kIHRoYXQgb2JqZWN0J3MgPGNvZGU+bWFzazwvY29kZT4gcHJvcGVydHkgYmVjb21lc1xyXG5cdCAqIDxjb2RlPm51bGw8L2NvZGU+LjwvcD5cclxuXHQgKi9cclxuXHRwdWJsaWMgbWFzazpEaXNwbGF5T2JqZWN0O1xyXG5cclxuXHQvKipcclxuXHQgKiBTcGVjaWZpZXMgd2hldGhlciB0aGlzIG9iamVjdCByZWNlaXZlcyBtb3VzZSwgb3Igb3RoZXIgdXNlciBpbnB1dCxcclxuXHQgKiBtZXNzYWdlcy4gVGhlIGRlZmF1bHQgdmFsdWUgaXMgPGNvZGU+dHJ1ZTwvY29kZT4sIHdoaWNoIG1lYW5zIHRoYXQgYnlcclxuXHQgKiBkZWZhdWx0IGFueSBJbnRlcmFjdGl2ZU9iamVjdCBpbnN0YW5jZSB0aGF0IGlzIG9uIHRoZSBkaXNwbGF5IGxpc3RcclxuXHQgKiByZWNlaXZlcyBtb3VzZSBldmVudHMgb3Igb3RoZXIgdXNlciBpbnB1dCBldmVudHMuIElmXHJcblx0ICogPGNvZGU+bW91c2VFbmFibGVkPC9jb2RlPiBpcyBzZXQgdG8gPGNvZGU+ZmFsc2U8L2NvZGU+LCB0aGUgaW5zdGFuY2UgZG9lc1xyXG5cdCAqIG5vdCByZWNlaXZlIGFueSBtb3VzZSBldmVudHMob3Igb3RoZXIgdXNlciBpbnB1dCBldmVudHMgbGlrZSBrZXlib2FyZFxyXG5cdCAqIGV2ZW50cykuIEFueSBjaGlsZHJlbiBvZiB0aGlzIGluc3RhbmNlIG9uIHRoZSBkaXNwbGF5IGxpc3QgYXJlIG5vdFxyXG5cdCAqIGFmZmVjdGVkLiBUbyBjaGFuZ2UgdGhlIDxjb2RlPm1vdXNlRW5hYmxlZDwvY29kZT4gYmVoYXZpb3IgZm9yIGFsbFxyXG5cdCAqIGNoaWxkcmVuIG9mIGFuIG9iamVjdCBvbiB0aGUgZGlzcGxheSBsaXN0LCB1c2VcclxuXHQgKiA8Y29kZT5mbGFzaC5kaXNwbGF5LkRpc3BsYXlPYmplY3RDb250YWluZXIubW91c2VDaGlsZHJlbjwvY29kZT4uXHJcblx0ICpcclxuXHQgKiA8cD4gTm8gZXZlbnQgaXMgZGlzcGF0Y2hlZCBieSBzZXR0aW5nIHRoaXMgcHJvcGVydHkuIFlvdSBtdXN0IHVzZSB0aGVcclxuXHQgKiA8Y29kZT5hZGRFdmVudExpc3RlbmVyKCk8L2NvZGU+IG1ldGhvZCB0byBjcmVhdGUgaW50ZXJhY3RpdmVcclxuXHQgKiBmdW5jdGlvbmFsaXR5LjwvcD5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IG1vdXNlRW5hYmxlZCgpOmJvb2xlYW5cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fZXhwbGljaXRNb3VzZUVuYWJsZWQ7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IG1vdXNlRW5hYmxlZCh2YWx1ZTpib29sZWFuKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9leHBsaWNpdE1vdXNlRW5hYmxlZCA9PSB2YWx1ZSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX2V4cGxpY2l0TW91c2VFbmFibGVkID0gdmFsdWU7XHJcblxyXG5cdFx0dGhpcy5fcFVwZGF0ZUltcGxpY2l0TW91c2VFbmFibGVkKHRoaXMuX3BQYXJlbnQ/IHRoaXMuX3BQYXJlbnQubW91c2VDaGlsZHJlbiA6IHRydWUpO1xyXG5cdH1cclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIEluZGljYXRlcyB0aGUgeCBjb29yZGluYXRlIG9mIHRoZSBtb3VzZSBvciB1c2VyIGlucHV0IGRldmljZSBwb3NpdGlvbiwgaW5cclxuXHQgKiBwaXhlbHMuXHJcblx0ICpcclxuXHQgKiA8cD48Yj5Ob3RlPC9iPjogRm9yIGEgRGlzcGxheU9iamVjdCB0aGF0IGhhcyBiZWVuIHJvdGF0ZWQsIHRoZSByZXR1cm5lZCB4XHJcblx0ICogY29vcmRpbmF0ZSB3aWxsIHJlZmxlY3QgdGhlIG5vbi1yb3RhdGVkIG9iamVjdC48L3A+XHJcblx0ICovXHJcblx0cHVibGljIGdldCBtb3VzZVgoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fbW91c2VYO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSW5kaWNhdGVzIHRoZSB5IGNvb3JkaW5hdGUgb2YgdGhlIG1vdXNlIG9yIHVzZXIgaW5wdXQgZGV2aWNlIHBvc2l0aW9uLCBpblxyXG5cdCAqIHBpeGVscy5cclxuXHQgKlxyXG5cdCAqIDxwPjxiPk5vdGU8L2I+OiBGb3IgYSBEaXNwbGF5T2JqZWN0IHRoYXQgaGFzIGJlZW4gcm90YXRlZCwgdGhlIHJldHVybmVkIHlcclxuXHQgKiBjb29yZGluYXRlIHdpbGwgcmVmbGVjdCB0aGUgbm9uLXJvdGF0ZWQgb2JqZWN0LjwvcD5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IG1vdXNlWSgpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9tb3VzZVk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJbmRpY2F0ZXMgdGhlIGluc3RhbmNlIG5hbWUgb2YgdGhlIERpc3BsYXlPYmplY3QuIFRoZSBvYmplY3QgY2FuIGJlXHJcblx0ICogaWRlbnRpZmllZCBpbiB0aGUgY2hpbGQgbGlzdCBvZiBpdHMgcGFyZW50IGRpc3BsYXkgb2JqZWN0IGNvbnRhaW5lciBieVxyXG5cdCAqIGNhbGxpbmcgdGhlIDxjb2RlPmdldENoaWxkQnlOYW1lKCk8L2NvZGU+IG1ldGhvZCBvZiB0aGUgZGlzcGxheSBvYmplY3RcclxuXHQgKiBjb250YWluZXIuXHJcblx0ICpcclxuXHQgKiBAdGhyb3dzIElsbGVnYWxPcGVyYXRpb25FcnJvciBJZiB5b3UgYXJlIGF0dGVtcHRpbmcgdG8gc2V0IHRoaXMgcHJvcGVydHlcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbiBhbiBvYmplY3QgdGhhdCB3YXMgcGxhY2VkIG9uIHRoZSB0aW1lbGluZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluIHRoZSBGbGFzaCBhdXRob3JpbmcgdG9vbC5cclxuXHQgKi9cclxuXHRwdWJsaWMgbmFtZTpzdHJpbmc7XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIG9yaWVudGF0aW9uTW9kZTpzdHJpbmcgPSBPcmllbnRhdGlvbk1vZGUuREVGQVVMVDtcclxuXHJcblx0LyoqXHJcblx0ICogSW5kaWNhdGVzIHRoZSBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIG9iamVjdCB0aGF0IGNvbnRhaW5zIHRoaXMgZGlzcGxheVxyXG5cdCAqIG9iamVjdC4gVXNlIHRoZSA8Y29kZT5wYXJlbnQ8L2NvZGU+IHByb3BlcnR5IHRvIHNwZWNpZnkgYSByZWxhdGl2ZSBwYXRoIHRvXHJcblx0ICogZGlzcGxheSBvYmplY3RzIHRoYXQgYXJlIGFib3ZlIHRoZSBjdXJyZW50IGRpc3BsYXkgb2JqZWN0IGluIHRoZSBkaXNwbGF5XHJcblx0ICogbGlzdCBoaWVyYXJjaHkuXHJcblx0ICpcclxuXHQgKiA8cD5Zb3UgY2FuIHVzZSA8Y29kZT5wYXJlbnQ8L2NvZGU+IHRvIG1vdmUgdXAgbXVsdGlwbGUgbGV2ZWxzIGluIHRoZVxyXG5cdCAqIGRpc3BsYXkgbGlzdCBhcyBpbiB0aGUgZm9sbG93aW5nOjwvcD5cclxuXHQgKlxyXG5cdCAqIEB0aHJvd3MgU2VjdXJpdHlFcnJvciBUaGUgcGFyZW50IGRpc3BsYXkgb2JqZWN0IGJlbG9uZ3MgdG8gYSBzZWN1cml0eVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBzYW5kYm94IHRvIHdoaWNoIHlvdSBkbyBub3QgaGF2ZSBhY2Nlc3MuIFlvdSBjYW5cclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgYXZvaWQgdGhpcyBzaXR1YXRpb24gYnkgaGF2aW5nIHRoZSBwYXJlbnQgbW92aWUgY2FsbFxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICB0aGUgPGNvZGU+U2VjdXJpdHkuYWxsb3dEb21haW4oKTwvY29kZT4gbWV0aG9kLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgcGFyZW50KCk6RGlzcGxheU9iamVjdENvbnRhaW5lclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9wUGFyZW50O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHBhcnRpdGlvbigpOlBhcnRpdGlvblxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9leHBsaWNpdFBhcnRpdGlvbjtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgcGFydGl0aW9uKHZhbHVlOlBhcnRpdGlvbilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fZXhwbGljaXRQYXJ0aXRpb24gPT0gdmFsdWUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9leHBsaWNpdFBhcnRpdGlvbiA9IHZhbHVlO1xyXG5cclxuXHRcdHRoaXMuX3BVcGRhdGVJbXBsaWNpdFBhcnRpdGlvbih0aGlzLl9wUGFyZW50PyB0aGlzLl9wUGFyZW50Ll9pQXNzaWduZWRQYXJ0aXRpb24gOiBudWxsLCB0aGlzLl9wU2NlbmUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHBpY2tpbmdDb2xsaWRlcigpOklQaWNraW5nQ29sbGlkZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcFBpY2tpbmdDb2xsaWRlcjtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgcGlja2luZ0NvbGxpZGVyKHZhbHVlOklQaWNraW5nQ29sbGlkZXIpXHJcblx0e1xyXG5cdFx0dGhpcy5fcFBpY2tpbmdDb2xsaWRlciA9IHZhbHVlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRGVmaW5lcyB0aGUgbG9jYWwgcG9pbnQgYXJvdW5kIHdoaWNoIHRoZSBvYmplY3Qgcm90YXRlcy5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHBpdm90KCk6VmVjdG9yM0RcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcGl2b3Q7XHJcblx0fVxyXG5cclxuXHJcblx0cHVibGljIHNldCBwaXZvdChwaXZvdDpWZWN0b3IzRClcclxuXHR7XHJcblx0XHR0aGlzLl9waXZvdCA9IHBpdm90LmNsb25lKCk7XHJcblxyXG5cdFx0dGhpcy5pbnZhbGlkYXRlUGl2b3QoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEZvciBhIGRpc3BsYXkgb2JqZWN0IGluIGEgbG9hZGVkIFNXRiBmaWxlLCB0aGUgPGNvZGU+cm9vdDwvY29kZT4gcHJvcGVydHlcclxuXHQgKiBpcyB0aGUgdG9wLW1vc3QgZGlzcGxheSBvYmplY3QgaW4gdGhlIHBvcnRpb24gb2YgdGhlIGRpc3BsYXkgbGlzdCdzIHRyZWVcclxuXHQgKiBzdHJ1Y3R1cmUgcmVwcmVzZW50ZWQgYnkgdGhhdCBTV0YgZmlsZS4gRm9yIGEgQml0bWFwIG9iamVjdCByZXByZXNlbnRpbmcgYVxyXG5cdCAqIGxvYWRlZCBpbWFnZSBmaWxlLCB0aGUgPGNvZGU+cm9vdDwvY29kZT4gcHJvcGVydHkgaXMgdGhlIEJpdG1hcCBvYmplY3RcclxuXHQgKiBpdHNlbGYuIEZvciB0aGUgaW5zdGFuY2Ugb2YgdGhlIG1haW4gY2xhc3Mgb2YgdGhlIGZpcnN0IFNXRiBmaWxlIGxvYWRlZCxcclxuXHQgKiB0aGUgPGNvZGU+cm9vdDwvY29kZT4gcHJvcGVydHkgaXMgdGhlIGRpc3BsYXkgb2JqZWN0IGl0c2VsZi4gVGhlXHJcblx0ICogPGNvZGU+cm9vdDwvY29kZT4gcHJvcGVydHkgb2YgdGhlIFNjZW5lIG9iamVjdCBpcyB0aGUgU2NlbmUgb2JqZWN0IGl0c2VsZi5cclxuXHQgKiBUaGUgPGNvZGU+cm9vdDwvY29kZT4gcHJvcGVydHkgaXMgc2V0IHRvIDxjb2RlPm51bGw8L2NvZGU+IGZvciBhbnkgZGlzcGxheVxyXG5cdCAqIG9iamVjdCB0aGF0IGhhcyBub3QgYmVlbiBhZGRlZCB0byB0aGUgZGlzcGxheSBsaXN0LCB1bmxlc3MgaXQgaGFzIGJlZW5cclxuXHQgKiBhZGRlZCB0byBhIGRpc3BsYXkgb2JqZWN0IGNvbnRhaW5lciB0aGF0IGlzIG9mZiB0aGUgZGlzcGxheSBsaXN0IGJ1dCB0aGF0XHJcblx0ICogaXMgYSBjaGlsZCBvZiB0aGUgdG9wLW1vc3QgZGlzcGxheSBvYmplY3QgaW4gYSBsb2FkZWQgU1dGIGZpbGUuXHJcblx0ICpcclxuXHQgKiA8cD5Gb3IgZXhhbXBsZSwgaWYgeW91IGNyZWF0ZSBhIG5ldyBTcHJpdGUgb2JqZWN0IGJ5IGNhbGxpbmcgdGhlXHJcblx0ICogPGNvZGU+U3ByaXRlKCk8L2NvZGU+IGNvbnN0cnVjdG9yIG1ldGhvZCwgaXRzIDxjb2RlPnJvb3Q8L2NvZGU+IHByb3BlcnR5XHJcblx0ICogaXMgPGNvZGU+bnVsbDwvY29kZT4gdW50aWwgeW91IGFkZCBpdCB0byB0aGUgZGlzcGxheSBsaXN0KG9yIHRvIGEgZGlzcGxheVxyXG5cdCAqIG9iamVjdCBjb250YWluZXIgdGhhdCBpcyBvZmYgdGhlIGRpc3BsYXkgbGlzdCBidXQgdGhhdCBpcyBhIGNoaWxkIG9mIHRoZVxyXG5cdCAqIHRvcC1tb3N0IGRpc3BsYXkgb2JqZWN0IGluIGEgU1dGIGZpbGUpLjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPkZvciBhIGxvYWRlZCBTV0YgZmlsZSwgZXZlbiB0aG91Z2ggdGhlIExvYWRlciBvYmplY3QgdXNlZCB0byBsb2FkIHRoZVxyXG5cdCAqIGZpbGUgbWF5IG5vdCBiZSBvbiB0aGUgZGlzcGxheSBsaXN0LCB0aGUgdG9wLW1vc3QgZGlzcGxheSBvYmplY3QgaW4gdGhlXHJcblx0ICogU1dGIGZpbGUgaGFzIGl0cyA8Y29kZT5yb290PC9jb2RlPiBwcm9wZXJ0eSBzZXQgdG8gaXRzZWxmLiBUaGUgTG9hZGVyXHJcblx0ICogb2JqZWN0IGRvZXMgbm90IGhhdmUgaXRzIDxjb2RlPnJvb3Q8L2NvZGU+IHByb3BlcnR5IHNldCB1bnRpbCBpdCBpcyBhZGRlZFxyXG5cdCAqIGFzIGEgY2hpbGQgb2YgYSBkaXNwbGF5IG9iamVjdCBmb3Igd2hpY2ggdGhlIDxjb2RlPnJvb3Q8L2NvZGU+IHByb3BlcnR5IGlzXHJcblx0ICogc2V0LjwvcD5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHJvb3QoKTpEaXNwbGF5T2JqZWN0Q29udGFpbmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3Jvb3Q7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJbmRpY2F0ZXMgdGhlIHJvdGF0aW9uIG9mIHRoZSBEaXNwbGF5T2JqZWN0IGluc3RhbmNlLCBpbiBkZWdyZWVzLCBmcm9tIGl0c1xyXG5cdCAqIG9yaWdpbmFsIG9yaWVudGF0aW9uLiBWYWx1ZXMgZnJvbSAwIHRvIDE4MCByZXByZXNlbnQgY2xvY2t3aXNlIHJvdGF0aW9uO1xyXG5cdCAqIHZhbHVlcyBmcm9tIDAgdG8gLTE4MCByZXByZXNlbnQgY291bnRlcmNsb2Nrd2lzZSByb3RhdGlvbi4gVmFsdWVzIG91dHNpZGVcclxuXHQgKiB0aGlzIHJhbmdlIGFyZSBhZGRlZCB0byBvciBzdWJ0cmFjdGVkIGZyb20gMzYwIHRvIG9idGFpbiBhIHZhbHVlIHdpdGhpblxyXG5cdCAqIHRoZSByYW5nZS4gRm9yIGV4YW1wbGUsIHRoZSBzdGF0ZW1lbnQgPGNvZGU+bXlfdmlkZW8ucm90YXRpb24gPSA0NTA8L2NvZGU+XHJcblx0ICogaXMgdGhlIHNhbWUgYXMgPGNvZGU+IG15X3ZpZGVvLnJvdGF0aW9uID0gOTA8L2NvZGU+LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyByb3RhdGlvbjpudW1iZXI7IC8vVE9ET1xyXG5cclxuXHQvKipcclxuXHQgKiBJbmRpY2F0ZXMgdGhlIHgtYXhpcyByb3RhdGlvbiBvZiB0aGUgRGlzcGxheU9iamVjdCBpbnN0YW5jZSwgaW4gZGVncmVlcyxcclxuXHQgKiBmcm9tIGl0cyBvcmlnaW5hbCBvcmllbnRhdGlvbiByZWxhdGl2ZSB0byB0aGUgM0QgcGFyZW50IGNvbnRhaW5lci4gVmFsdWVzXHJcblx0ICogZnJvbSAwIHRvIDE4MCByZXByZXNlbnQgY2xvY2t3aXNlIHJvdGF0aW9uOyB2YWx1ZXMgZnJvbSAwIHRvIC0xODBcclxuXHQgKiByZXByZXNlbnQgY291bnRlcmNsb2Nrd2lzZSByb3RhdGlvbi4gVmFsdWVzIG91dHNpZGUgdGhpcyByYW5nZSBhcmUgYWRkZWRcclxuXHQgKiB0byBvciBzdWJ0cmFjdGVkIGZyb20gMzYwIHRvIG9idGFpbiBhIHZhbHVlIHdpdGhpbiB0aGUgcmFuZ2UuXHJcblx0ICovXHJcblx0cHVibGljIGdldCByb3RhdGlvblgoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcm90YXRpb25YKk1hdGhDb25zdHMuUkFESUFOU19UT19ERUdSRUVTO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCByb3RhdGlvblgodmFsOm51bWJlcilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5yb3RhdGlvblggPT0gdmFsKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fcm90YXRpb25YID0gdmFsKk1hdGhDb25zdHMuREVHUkVFU19UT19SQURJQU5TO1xyXG5cclxuXHRcdHRoaXMuaW52YWxpZGF0ZVJvdGF0aW9uKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJbmRpY2F0ZXMgdGhlIHktYXhpcyByb3RhdGlvbiBvZiB0aGUgRGlzcGxheU9iamVjdCBpbnN0YW5jZSwgaW4gZGVncmVlcyxcclxuXHQgKiBmcm9tIGl0cyBvcmlnaW5hbCBvcmllbnRhdGlvbiByZWxhdGl2ZSB0byB0aGUgM0QgcGFyZW50IGNvbnRhaW5lci4gVmFsdWVzXHJcblx0ICogZnJvbSAwIHRvIDE4MCByZXByZXNlbnQgY2xvY2t3aXNlIHJvdGF0aW9uOyB2YWx1ZXMgZnJvbSAwIHRvIC0xODBcclxuXHQgKiByZXByZXNlbnQgY291bnRlcmNsb2Nrd2lzZSByb3RhdGlvbi4gVmFsdWVzIG91dHNpZGUgdGhpcyByYW5nZSBhcmUgYWRkZWRcclxuXHQgKiB0byBvciBzdWJ0cmFjdGVkIGZyb20gMzYwIHRvIG9idGFpbiBhIHZhbHVlIHdpdGhpbiB0aGUgcmFuZ2UuXHJcblx0ICovXHJcblx0cHVibGljIGdldCByb3RhdGlvblkoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcm90YXRpb25ZKk1hdGhDb25zdHMuUkFESUFOU19UT19ERUdSRUVTO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCByb3RhdGlvblkodmFsOm51bWJlcilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5yb3RhdGlvblkgPT0gdmFsKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fcm90YXRpb25ZID0gdmFsKk1hdGhDb25zdHMuREVHUkVFU19UT19SQURJQU5TO1xyXG5cclxuXHRcdHRoaXMuaW52YWxpZGF0ZVJvdGF0aW9uKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJbmRpY2F0ZXMgdGhlIHotYXhpcyByb3RhdGlvbiBvZiB0aGUgRGlzcGxheU9iamVjdCBpbnN0YW5jZSwgaW4gZGVncmVlcyxcclxuXHQgKiBmcm9tIGl0cyBvcmlnaW5hbCBvcmllbnRhdGlvbiByZWxhdGl2ZSB0byB0aGUgM0QgcGFyZW50IGNvbnRhaW5lci4gVmFsdWVzXHJcblx0ICogZnJvbSAwIHRvIDE4MCByZXByZXNlbnQgY2xvY2t3aXNlIHJvdGF0aW9uOyB2YWx1ZXMgZnJvbSAwIHRvIC0xODBcclxuXHQgKiByZXByZXNlbnQgY291bnRlcmNsb2Nrd2lzZSByb3RhdGlvbi4gVmFsdWVzIG91dHNpZGUgdGhpcyByYW5nZSBhcmUgYWRkZWRcclxuXHQgKiB0byBvciBzdWJ0cmFjdGVkIGZyb20gMzYwIHRvIG9idGFpbiBhIHZhbHVlIHdpdGhpbiB0aGUgcmFuZ2UuXHJcblx0ICovXHJcblx0cHVibGljIGdldCByb3RhdGlvblooKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcm90YXRpb25aKk1hdGhDb25zdHMuUkFESUFOU19UT19ERUdSRUVTO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCByb3RhdGlvbloodmFsOm51bWJlcilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5yb3RhdGlvblogPT0gdmFsKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fcm90YXRpb25aID0gdmFsKk1hdGhDb25zdHMuREVHUkVFU19UT19SQURJQU5TO1xyXG5cclxuXHRcdHRoaXMuaW52YWxpZGF0ZVJvdGF0aW9uKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgY3VycmVudCBzY2FsaW5nIGdyaWQgdGhhdCBpcyBpbiBlZmZlY3QuIElmIHNldCB0byA8Y29kZT5udWxsPC9jb2RlPixcclxuXHQgKiB0aGUgZW50aXJlIGRpc3BsYXkgb2JqZWN0IGlzIHNjYWxlZCBub3JtYWxseSB3aGVuIGFueSBzY2FsZSB0cmFuc2Zvcm1hdGlvblxyXG5cdCAqIGlzIGFwcGxpZWQuXHJcblx0ICpcclxuXHQgKiA8cD5XaGVuIHlvdSBkZWZpbmUgdGhlIDxjb2RlPnNjYWxlOUdyaWQ8L2NvZGU+IHByb3BlcnR5LCB0aGUgZGlzcGxheVxyXG5cdCAqIG9iamVjdCBpcyBkaXZpZGVkIGludG8gYSBncmlkIHdpdGggbmluZSByZWdpb25zIGJhc2VkIG9uIHRoZVxyXG5cdCAqIDxjb2RlPnNjYWxlOUdyaWQ8L2NvZGU+IHJlY3RhbmdsZSwgd2hpY2ggZGVmaW5lcyB0aGUgY2VudGVyIHJlZ2lvbiBvZiB0aGVcclxuXHQgKiBncmlkLiBUaGUgZWlnaHQgb3RoZXIgcmVnaW9ucyBvZiB0aGUgZ3JpZCBhcmUgdGhlIGZvbGxvd2luZyBhcmVhczogPC9wPlxyXG5cdCAqXHJcblx0ICogPHVsPlxyXG5cdCAqICAgPGxpPlRoZSB1cHBlci1sZWZ0IGNvcm5lciBvdXRzaWRlIG9mIHRoZSByZWN0YW5nbGU8L2xpPlxyXG5cdCAqICAgPGxpPlRoZSBhcmVhIGFib3ZlIHRoZSByZWN0YW5nbGUgPC9saT5cclxuXHQgKiAgIDxsaT5UaGUgdXBwZXItcmlnaHQgY29ybmVyIG91dHNpZGUgb2YgdGhlIHJlY3RhbmdsZTwvbGk+XHJcblx0ICogICA8bGk+VGhlIGFyZWEgdG8gdGhlIGxlZnQgb2YgdGhlIHJlY3RhbmdsZTwvbGk+XHJcblx0ICogICA8bGk+VGhlIGFyZWEgdG8gdGhlIHJpZ2h0IG9mIHRoZSByZWN0YW5nbGU8L2xpPlxyXG5cdCAqICAgPGxpPlRoZSBsb3dlci1sZWZ0IGNvcm5lciBvdXRzaWRlIG9mIHRoZSByZWN0YW5nbGU8L2xpPlxyXG5cdCAqICAgPGxpPlRoZSBhcmVhIGJlbG93IHRoZSByZWN0YW5nbGU8L2xpPlxyXG5cdCAqICAgPGxpPlRoZSBsb3dlci1yaWdodCBjb3JuZXIgb3V0c2lkZSBvZiB0aGUgcmVjdGFuZ2xlPC9saT5cclxuXHQgKiA8L3VsPlxyXG5cdCAqXHJcblx0ICogPHA+WW91IGNhbiB0aGluayBvZiB0aGUgZWlnaHQgcmVnaW9ucyBvdXRzaWRlIG9mIHRoZSBjZW50ZXIoZGVmaW5lZCBieVxyXG5cdCAqIHRoZSByZWN0YW5nbGUpIGFzIGJlaW5nIGxpa2UgYSBwaWN0dXJlIGZyYW1lIHRoYXQgaGFzIHNwZWNpYWwgcnVsZXNcclxuXHQgKiBhcHBsaWVkIHRvIGl0IHdoZW4gc2NhbGVkLjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPldoZW4gdGhlIDxjb2RlPnNjYWxlOUdyaWQ8L2NvZGU+IHByb3BlcnR5IGlzIHNldCBhbmQgYSBkaXNwbGF5IG9iamVjdFxyXG5cdCAqIGlzIHNjYWxlZCwgYWxsIHRleHQgYW5kIGdyYWRpZW50cyBhcmUgc2NhbGVkIG5vcm1hbGx5OyBob3dldmVyLCBmb3Igb3RoZXJcclxuXHQgKiB0eXBlcyBvZiBvYmplY3RzIHRoZSBmb2xsb3dpbmcgcnVsZXMgYXBwbHk6PC9wPlxyXG5cdCAqXHJcblx0ICogPHVsPlxyXG5cdCAqICAgPGxpPkNvbnRlbnQgaW4gdGhlIGNlbnRlciByZWdpb24gaXMgc2NhbGVkIG5vcm1hbGx5LiA8L2xpPlxyXG5cdCAqICAgPGxpPkNvbnRlbnQgaW4gdGhlIGNvcm5lcnMgaXMgbm90IHNjYWxlZC4gPC9saT5cclxuXHQgKiAgIDxsaT5Db250ZW50IGluIHRoZSB0b3AgYW5kIGJvdHRvbSByZWdpb25zIGlzIHNjYWxlZCBob3Jpem9udGFsbHkgb25seS5cclxuXHQgKiBDb250ZW50IGluIHRoZSBsZWZ0IGFuZCByaWdodCByZWdpb25zIGlzIHNjYWxlZCB2ZXJ0aWNhbGx5IG9ubHkuPC9saT5cclxuXHQgKiAgIDxsaT5BbGwgZmlsbHMoaW5jbHVkaW5nIGJpdG1hcHMsIHZpZGVvLCBhbmQgZ3JhZGllbnRzKSBhcmUgc3RyZXRjaGVkIHRvXHJcblx0ICogZml0IHRoZWlyIHNoYXBlcy48L2xpPlxyXG5cdCAqIDwvdWw+XHJcblx0ICpcclxuXHQgKiA8cD5JZiBhIGRpc3BsYXkgb2JqZWN0IGlzIHJvdGF0ZWQsIGFsbCBzdWJzZXF1ZW50IHNjYWxpbmcgaXMgbm9ybWFsKGFuZFxyXG5cdCAqIHRoZSA8Y29kZT5zY2FsZTlHcmlkPC9jb2RlPiBwcm9wZXJ0eSBpcyBpZ25vcmVkKS48L3A+XHJcblx0ICpcclxuXHQgKiA8cD5Gb3IgZXhhbXBsZSwgY29uc2lkZXIgdGhlIGZvbGxvd2luZyBkaXNwbGF5IG9iamVjdCBhbmQgYSByZWN0YW5nbGUgdGhhdFxyXG5cdCAqIGlzIGFwcGxpZWQgYXMgdGhlIGRpc3BsYXkgb2JqZWN0J3MgPGNvZGU+c2NhbGU5R3JpZDwvY29kZT46PC9wPlxyXG5cdCAqXHJcblx0ICogPHA+QSBjb21tb24gdXNlIGZvciBzZXR0aW5nIDxjb2RlPnNjYWxlOUdyaWQ8L2NvZGU+IGlzIHRvIHNldCB1cCBhIGRpc3BsYXlcclxuXHQgKiBvYmplY3QgdG8gYmUgdXNlZCBhcyBhIGNvbXBvbmVudCwgaW4gd2hpY2ggZWRnZSByZWdpb25zIHJldGFpbiB0aGUgc2FtZVxyXG5cdCAqIHdpZHRoIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBzY2FsZWQuPC9wPlxyXG5cdCAqXHJcblx0ICogQHRocm93cyBBcmd1bWVudEVycm9yIElmIHlvdSBwYXNzIGFuIGludmFsaWQgYXJndW1lbnQgdG8gdGhlIG1ldGhvZC5cclxuXHQgKi9cclxuXHRwdWJsaWMgc2NhbGU5R3JpZDpSZWN0YW5nbGU7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluZGljYXRlcyB0aGUgaG9yaXpvbnRhbCBzY2FsZShwZXJjZW50YWdlKSBvZiB0aGUgb2JqZWN0IGFzIGFwcGxpZWQgZnJvbVxyXG5cdCAqIHRoZSByZWdpc3RyYXRpb24gcG9pbnQuIFRoZSBkZWZhdWx0IHJlZ2lzdHJhdGlvbiBwb2ludCBpcygwLDApLiAxLjBcclxuXHQgKiBlcXVhbHMgMTAwJSBzY2FsZS5cclxuXHQgKlxyXG5cdCAqIDxwPlNjYWxpbmcgdGhlIGxvY2FsIGNvb3JkaW5hdGUgc3lzdGVtIGNoYW5nZXMgdGhlIDxjb2RlPng8L2NvZGU+IGFuZFxyXG5cdCAqIDxjb2RlPnk8L2NvZGU+IHByb3BlcnR5IHZhbHVlcywgd2hpY2ggYXJlIGRlZmluZWQgaW4gd2hvbGUgcGl4ZWxzLiA8L3A+XHJcblx0ICovXHJcblx0cHVibGljIGdldCBzY2FsZVgoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcFNjYWxlWDtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgc2NhbGVYKHZhbDpudW1iZXIpXHJcblx0e1xyXG5cdFx0Ly9yZW1vdmUgYWJzb2x1dGUgd2lkdGhcclxuXHRcdHRoaXMuX3dpZHRoID0gbnVsbDtcclxuXHJcblx0XHRpZiAodGhpcy5fcFNjYWxlWCA9PSB2YWwpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9wU2NhbGVYID0gdmFsO1xyXG5cclxuXHRcdHRoaXMuaW52YWxpZGF0ZVNjYWxlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJbmRpY2F0ZXMgdGhlIHZlcnRpY2FsIHNjYWxlKHBlcmNlbnRhZ2UpIG9mIGFuIG9iamVjdCBhcyBhcHBsaWVkIGZyb20gdGhlXHJcblx0ICogcmVnaXN0cmF0aW9uIHBvaW50IG9mIHRoZSBvYmplY3QuIFRoZSBkZWZhdWx0IHJlZ2lzdHJhdGlvbiBwb2ludCBpcygwLDApLlxyXG5cdCAqIDEuMCBpcyAxMDAlIHNjYWxlLlxyXG5cdCAqXHJcblx0ICogPHA+U2NhbGluZyB0aGUgbG9jYWwgY29vcmRpbmF0ZSBzeXN0ZW0gY2hhbmdlcyB0aGUgPGNvZGU+eDwvY29kZT4gYW5kXHJcblx0ICogPGNvZGU+eTwvY29kZT4gcHJvcGVydHkgdmFsdWVzLCB3aGljaCBhcmUgZGVmaW5lZCBpbiB3aG9sZSBwaXhlbHMuIDwvcD5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHNjYWxlWSgpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9wU2NhbGVZO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBzY2FsZVkodmFsOm51bWJlcilcclxuXHR7XHJcblx0XHQvL3JlbW92ZSBhYnNvbHV0ZSBoZWlnaHRcclxuXHRcdHRoaXMuX2hlaWdodCA9IG51bGw7XHJcblxyXG5cdFx0aWYgKHRoaXMuX3BTY2FsZVkgPT0gdmFsKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fcFNjYWxlWSA9IHZhbDtcclxuXHJcblx0XHR0aGlzLmludmFsaWRhdGVTY2FsZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSW5kaWNhdGVzIHRoZSBkZXB0aCBzY2FsZShwZXJjZW50YWdlKSBvZiBhbiBvYmplY3QgYXMgYXBwbGllZCBmcm9tIHRoZVxyXG5cdCAqIHJlZ2lzdHJhdGlvbiBwb2ludCBvZiB0aGUgb2JqZWN0LiBUaGUgZGVmYXVsdCByZWdpc3RyYXRpb24gcG9pbnQgaXMoMCwwKS5cclxuXHQgKiAxLjAgaXMgMTAwJSBzY2FsZS5cclxuXHQgKlxyXG5cdCAqIDxwPlNjYWxpbmcgdGhlIGxvY2FsIGNvb3JkaW5hdGUgc3lzdGVtIGNoYW5nZXMgdGhlIDxjb2RlPng8L2NvZGU+LFxyXG5cdCAqIDxjb2RlPnk8L2NvZGU+IGFuZCA8Y29kZT56PC9jb2RlPiBwcm9wZXJ0eSB2YWx1ZXMsIHdoaWNoIGFyZSBkZWZpbmVkIGluXHJcblx0ICogd2hvbGUgcGl4ZWxzLiA8L3A+XHJcblx0ICovXHJcblx0cHVibGljIGdldCBzY2FsZVooKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcFNjYWxlWjtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgc2NhbGVaKHZhbDpudW1iZXIpXHJcblx0e1xyXG5cdFx0Ly9yZW1vdmUgYWJzb2x1dGUgZGVwdGhcclxuXHRcdHRoaXMuX2RlcHRoID0gbnVsbDtcclxuXHJcblx0XHRpZiAodGhpcy5fcFNjYWxlWiA9PSB2YWwpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9wU2NhbGVaID0gdmFsO1xyXG5cclxuXHRcdHRoaXMuaW52YWxpZGF0ZVNjYWxlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgc2NlbmUoKTpTY2VuZVxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9wU2NlbmU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgc2NlbmVQb3NpdGlvbigpOlZlY3RvcjNEXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX3NjZW5lUG9zaXRpb25EaXJ0eSkge1xyXG5cdFx0XHRpZiAoIXRoaXMuX3Bpdm90WmVybyAmJiB0aGlzLmFsaWdubWVudE1vZGUgPT0gQWxpZ25tZW50TW9kZS5QSVZPVF9QT0lOVCkge1xyXG5cdFx0XHRcdHRoaXMuX3NjZW5lUG9zaXRpb24gPSB0aGlzLnNjZW5lVHJhbnNmb3JtLnRyYW5zZm9ybVZlY3Rvcih0aGlzLl9waXZvdFNjYWxlKTtcclxuXHRcdFx0XHQvL3RoaXMuX3NjZW5lUG9zaXRpb24uZGVjcmVtZW50QnkobmV3IFZlY3RvcjNEKHRoaXMuX3Bpdm90LngqdGhpcy5fcFNjYWxlWCwgdGhpcy5fcGl2b3QueSp0aGlzLl9wU2NhbGVZLCB0aGlzLl9waXZvdC56KnRoaXMuX3BTY2FsZVopKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLnNjZW5lVHJhbnNmb3JtLmNvcHlDb2x1bW5UbygzLCB0aGlzLl9zY2VuZVBvc2l0aW9uKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5fc2NlbmVQb3NpdGlvbkRpcnR5ID0gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcy5fc2NlbmVQb3NpdGlvbjtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXQgc2NlbmVUcmFuc2Zvcm0oKTpNYXRyaXgzRFxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9wU2NlbmVUcmFuc2Zvcm1EaXJ0eSlcclxuXHRcdFx0dGhpcy5wVXBkYXRlU2NlbmVUcmFuc2Zvcm0oKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fcFNjZW5lVHJhbnNmb3JtO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIHNjcm9sbCByZWN0YW5nbGUgYm91bmRzIG9mIHRoZSBkaXNwbGF5IG9iamVjdC4gVGhlIGRpc3BsYXkgb2JqZWN0IGlzXHJcblx0ICogY3JvcHBlZCB0byB0aGUgc2l6ZSBkZWZpbmVkIGJ5IHRoZSByZWN0YW5nbGUsIGFuZCBpdCBzY3JvbGxzIHdpdGhpbiB0aGVcclxuXHQgKiByZWN0YW5nbGUgd2hlbiB5b3UgY2hhbmdlIHRoZSA8Y29kZT54PC9jb2RlPiBhbmQgPGNvZGU+eTwvY29kZT4gcHJvcGVydGllc1xyXG5cdCAqIG9mIHRoZSA8Y29kZT5zY3JvbGxSZWN0PC9jb2RlPiBvYmplY3QuXHJcblx0ICpcclxuXHQgKiA8cD5UaGUgcHJvcGVydGllcyBvZiB0aGUgPGNvZGU+c2Nyb2xsUmVjdDwvY29kZT4gUmVjdGFuZ2xlIG9iamVjdCB1c2UgdGhlXHJcblx0ICogZGlzcGxheSBvYmplY3QncyBjb29yZGluYXRlIHNwYWNlIGFuZCBhcmUgc2NhbGVkIGp1c3QgbGlrZSB0aGUgb3ZlcmFsbFxyXG5cdCAqIGRpc3BsYXkgb2JqZWN0LiBUaGUgY29ybmVyIGJvdW5kcyBvZiB0aGUgY3JvcHBlZCB3aW5kb3cgb24gdGhlIHNjcm9sbGluZ1xyXG5cdCAqIGRpc3BsYXkgb2JqZWN0IGFyZSB0aGUgb3JpZ2luIG9mIHRoZSBkaXNwbGF5IG9iamVjdCgwLDApIGFuZCB0aGUgcG9pbnRcclxuXHQgKiBkZWZpbmVkIGJ5IHRoZSB3aWR0aCBhbmQgaGVpZ2h0IG9mIHRoZSByZWN0YW5nbGUuIFRoZXkgYXJlIG5vdCBjZW50ZXJlZFxyXG5cdCAqIGFyb3VuZCB0aGUgb3JpZ2luLCBidXQgdXNlIHRoZSBvcmlnaW4gdG8gZGVmaW5lIHRoZSB1cHBlci1sZWZ0IGNvcm5lciBvZlxyXG5cdCAqIHRoZSBhcmVhLiBBIHNjcm9sbGVkIGRpc3BsYXkgb2JqZWN0IGFsd2F5cyBzY3JvbGxzIGluIHdob2xlIHBpeGVsXHJcblx0ICogaW5jcmVtZW50cy4gPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+WW91IGNhbiBzY3JvbGwgYW4gb2JqZWN0IGxlZnQgYW5kIHJpZ2h0IGJ5IHNldHRpbmcgdGhlIDxjb2RlPng8L2NvZGU+XHJcblx0ICogcHJvcGVydHkgb2YgdGhlIDxjb2RlPnNjcm9sbFJlY3Q8L2NvZGU+IFJlY3RhbmdsZSBvYmplY3QuIFlvdSBjYW4gc2Nyb2xsXHJcblx0ICogYW4gb2JqZWN0IHVwIGFuZCBkb3duIGJ5IHNldHRpbmcgdGhlIDxjb2RlPnk8L2NvZGU+IHByb3BlcnR5IG9mIHRoZVxyXG5cdCAqIDxjb2RlPnNjcm9sbFJlY3Q8L2NvZGU+IFJlY3RhbmdsZSBvYmplY3QuIElmIHRoZSBkaXNwbGF5IG9iamVjdCBpcyByb3RhdGVkXHJcblx0ICogOTDCsCBhbmQgeW91IHNjcm9sbCBpdCBsZWZ0IGFuZCByaWdodCwgdGhlIGRpc3BsYXkgb2JqZWN0IGFjdHVhbGx5IHNjcm9sbHNcclxuXHQgKiB1cCBhbmQgZG93bi48L3A+XHJcblx0ICovXHJcblx0cHVibGljIHNjcm9sbFJlY3Q6UmVjdGFuZ2xlO1xyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgc2hhZGVyUGlja2luZ0RldGFpbHMoKTpib29sZWFuXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3NoYWRlclBpY2tpbmdEZXRhaWxzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGRlYnVnVmlzaWJsZSgpOmJvb2xlYW5cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fZGVidWdWaXNpYmxlO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBkZWJ1Z1Zpc2libGUodmFsdWU6Ym9vbGVhbilcclxuXHR7XHJcblx0XHRpZiAodmFsdWUgPT0gdGhpcy5fZGVidWdWaXNpYmxlKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fZGVidWdWaXNpYmxlID0gdmFsdWU7XHJcblxyXG5cdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9lbnRpdHlOb2Rlcy5sZW5ndGg7XHJcblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBsZW47IGkrKylcclxuXHRcdFx0dGhpcy5fZW50aXR5Tm9kZXNbaV0uZGVidWdWaXNpYmxlID0gdGhpcy5fZGVidWdWaXNpYmxlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQW4gb2JqZWN0IHdpdGggcHJvcGVydGllcyBwZXJ0YWluaW5nIHRvIGEgZGlzcGxheSBvYmplY3QncyBtYXRyaXgsIGNvbG9yXHJcblx0ICogdHJhbnNmb3JtLCBhbmQgcGl4ZWwgYm91bmRzLiBUaGUgc3BlY2lmaWMgcHJvcGVydGllcyAgLSAgbWF0cml4LFxyXG5cdCAqIGNvbG9yVHJhbnNmb3JtLCBhbmQgdGhyZWUgcmVhZC1vbmx5IHByb3BlcnRpZXNcclxuXHQgKiAoPGNvZGU+Y29uY2F0ZW5hdGVkTWF0cml4PC9jb2RlPiwgPGNvZGU+Y29uY2F0ZW5hdGVkQ29sb3JUcmFuc2Zvcm08L2NvZGU+LFxyXG5cdCAqIGFuZCA8Y29kZT5waXhlbEJvdW5kczwvY29kZT4pICAtICBhcmUgZGVzY3JpYmVkIGluIHRoZSBlbnRyeSBmb3IgdGhlXHJcblx0ICogVHJhbnNmb3JtIGNsYXNzLlxyXG5cdCAqXHJcblx0ICogPHA+RWFjaCBvZiB0aGUgdHJhbnNmb3JtIG9iamVjdCdzIHByb3BlcnRpZXMgaXMgaXRzZWxmIGFuIG9iamVjdC4gVGhpc1xyXG5cdCAqIGNvbmNlcHQgaXMgaW1wb3J0YW50IGJlY2F1c2UgdGhlIG9ubHkgd2F5IHRvIHNldCBuZXcgdmFsdWVzIGZvciB0aGUgbWF0cml4XHJcblx0ICogb3IgY29sb3JUcmFuc2Zvcm0gb2JqZWN0cyBpcyB0byBjcmVhdGUgYSBuZXcgb2JqZWN0IGFuZCBjb3B5IHRoYXQgb2JqZWN0XHJcblx0ICogaW50byB0aGUgdHJhbnNmb3JtLm1hdHJpeCBvciB0cmFuc2Zvcm0uY29sb3JUcmFuc2Zvcm0gcHJvcGVydHkuPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+Rm9yIGV4YW1wbGUsIHRvIGluY3JlYXNlIHRoZSA8Y29kZT50eDwvY29kZT4gdmFsdWUgb2YgYSBkaXNwbGF5XHJcblx0ICogb2JqZWN0J3MgbWF0cml4LCB5b3UgbXVzdCBtYWtlIGEgY29weSBvZiB0aGUgZW50aXJlIG1hdHJpeCBvYmplY3QsIHRoZW5cclxuXHQgKiBjb3B5IHRoZSBuZXcgb2JqZWN0IGludG8gdGhlIG1hdHJpeCBwcm9wZXJ0eSBvZiB0aGUgdHJhbnNmb3JtIG9iamVjdDo8L3A+XHJcblx0ICogPHByZSB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiPjxjb2RlPiBwdWJsaWMgbXlNYXRyaXg6TWF0cml4ID1cclxuXHQgKiBteURpc3BsYXlPYmplY3QudHJhbnNmb3JtLm1hdHJpeDsgbXlNYXRyaXgudHggKz0gMTA7XHJcblx0ICogbXlEaXNwbGF5T2JqZWN0LnRyYW5zZm9ybS5tYXRyaXggPSBteU1hdHJpeDsgPC9jb2RlPjwvcHJlPlxyXG5cdCAqXHJcblx0ICogPHA+WW91IGNhbm5vdCBkaXJlY3RseSBzZXQgdGhlIDxjb2RlPnR4PC9jb2RlPiBwcm9wZXJ0eS4gVGhlIGZvbGxvd2luZ1xyXG5cdCAqIGNvZGUgaGFzIG5vIGVmZmVjdCBvbiA8Y29kZT5teURpc3BsYXlPYmplY3Q8L2NvZGU+OiA8L3A+XHJcblx0ICogPHByZSB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiPjxjb2RlPiBteURpc3BsYXlPYmplY3QudHJhbnNmb3JtLm1hdHJpeC50eCArPVxyXG5cdCAqIDEwOyA8L2NvZGU+PC9wcmU+XHJcblx0ICpcclxuXHQgKiA8cD5Zb3UgY2FuIGFsc28gY29weSBhbiBlbnRpcmUgdHJhbnNmb3JtIG9iamVjdCBhbmQgYXNzaWduIGl0IHRvIGFub3RoZXJcclxuXHQgKiBkaXNwbGF5IG9iamVjdCdzIHRyYW5zZm9ybSBwcm9wZXJ0eS4gRm9yIGV4YW1wbGUsIHRoZSBmb2xsb3dpbmcgY29kZVxyXG5cdCAqIGNvcGllcyB0aGUgZW50aXJlIHRyYW5zZm9ybSBvYmplY3QgZnJvbSA8Y29kZT5teU9sZERpc3BsYXlPYmo8L2NvZGU+IHRvXHJcblx0ICogPGNvZGU+bXlOZXdEaXNwbGF5T2JqPC9jb2RlPjo8L3A+XHJcblx0ICogPGNvZGU+bXlOZXdEaXNwbGF5T2JqLnRyYW5zZm9ybSA9IG15T2xkRGlzcGxheU9iai50cmFuc2Zvcm07PC9jb2RlPlxyXG5cdCAqXHJcblx0ICogPHA+VGhlIHJlc3VsdGluZyBkaXNwbGF5IG9iamVjdCwgPGNvZGU+bXlOZXdEaXNwbGF5T2JqPC9jb2RlPiwgbm93IGhhcyB0aGVcclxuXHQgKiBzYW1lIHZhbHVlcyBmb3IgaXRzIG1hdHJpeCwgY29sb3IgdHJhbnNmb3JtLCBhbmQgcGl4ZWwgYm91bmRzIGFzIHRoZSBvbGRcclxuXHQgKiBkaXNwbGF5IG9iamVjdCwgPGNvZGU+bXlPbGREaXNwbGF5T2JqPC9jb2RlPi48L3A+XHJcblx0ICpcclxuXHQgKiA8cD5Ob3RlIHRoYXQgQUlSIGZvciBUViBkZXZpY2VzIHVzZSBoYXJkd2FyZSBhY2NlbGVyYXRpb24sIGlmIGl0IGlzXHJcblx0ICogYXZhaWxhYmxlLCBmb3IgY29sb3IgdHJhbnNmb3Jtcy48L3A+XHJcblx0ICovXHJcblx0cHVibGljIGdldCB0cmFuc2Zvcm0oKTpUcmFuc2Zvcm1cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fdHJhbnNmb3JtO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogV2hldGhlciBvciBub3QgdGhlIGRpc3BsYXkgb2JqZWN0IGlzIHZpc2libGUuIERpc3BsYXkgb2JqZWN0cyB0aGF0IGFyZSBub3RcclxuXHQgKiB2aXNpYmxlIGFyZSBkaXNhYmxlZC4gRm9yIGV4YW1wbGUsIGlmIDxjb2RlPnZpc2libGU9ZmFsc2U8L2NvZGU+IGZvciBhblxyXG5cdCAqIEludGVyYWN0aXZlT2JqZWN0IGluc3RhbmNlLCBpdCBjYW5ub3QgYmUgY2xpY2tlZC5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHZpc2libGUoKTpib29sZWFuXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2V4cGxpY2l0VmlzaWJpbGl0eTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgdmlzaWJsZSh2YWx1ZTpib29sZWFuKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9leHBsaWNpdFZpc2liaWxpdHkgPT0gdmFsdWUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9leHBsaWNpdFZpc2liaWxpdHkgPSB2YWx1ZTtcclxuXHJcblx0XHR0aGlzLl9wVXBkYXRlSW1wbGljaXRWaXNpYmlsaXR5KHRoaXMuX3BQYXJlbnQ/IHRoaXMuX3BQYXJlbnQuX2lJc1Zpc2libGUoKSA6IHRydWUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSW5kaWNhdGVzIHRoZSB3aWR0aCBvZiB0aGUgZGlzcGxheSBvYmplY3QsIGluIHBpeGVscy4gVGhlIHdpZHRoIGlzXHJcblx0ICogY2FsY3VsYXRlZCBiYXNlZCBvbiB0aGUgYm91bmRzIG9mIHRoZSBjb250ZW50IG9mIHRoZSBkaXNwbGF5IG9iamVjdC4gV2hlblxyXG5cdCAqIHlvdSBzZXQgdGhlIDxjb2RlPndpZHRoPC9jb2RlPiBwcm9wZXJ0eSwgdGhlIDxjb2RlPnNjYWxlWDwvY29kZT4gcHJvcGVydHlcclxuXHQgKiBpcyBhZGp1c3RlZCBhY2NvcmRpbmdseSwgYXMgc2hvd24gaW4gdGhlIGZvbGxvd2luZyBjb2RlOlxyXG5cdCAqXHJcblx0ICogPHA+RXhjZXB0IGZvciBUZXh0RmllbGQgYW5kIFZpZGVvIG9iamVjdHMsIGEgZGlzcGxheSBvYmplY3Qgd2l0aCBub1xyXG5cdCAqIGNvbnRlbnQoc3VjaCBhcyBhbiBlbXB0eSBzcHJpdGUpIGhhcyBhIHdpZHRoIG9mIDAsIGV2ZW4gaWYgeW91IHRyeSB0byBzZXRcclxuXHQgKiA8Y29kZT53aWR0aDwvY29kZT4gdG8gYSBkaWZmZXJlbnQgdmFsdWUuPC9wPlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgd2lkdGgoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5nZXRCb3goKS53aWR0aCp0aGlzLl9wU2NhbGVYO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCB3aWR0aCh2YWw6bnVtYmVyKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl93aWR0aCA9PSB2YWwpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl93aWR0aCA9IHZhbDtcclxuXHJcblx0XHR0aGlzLl9wU2NhbGVYID0gdmFsL3RoaXMuZ2V0Qm94KCkud2lkdGg7XHJcblxyXG5cdFx0dGhpcy5pbnZhbGlkYXRlU2NhbGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluZGljYXRlcyB0aGUgPGk+eDwvaT4gY29vcmRpbmF0ZSBvZiB0aGUgRGlzcGxheU9iamVjdCBpbnN0YW5jZSByZWxhdGl2ZVxyXG5cdCAqIHRvIHRoZSBsb2NhbCBjb29yZGluYXRlcyBvZiB0aGUgcGFyZW50IERpc3BsYXlPYmplY3RDb250YWluZXIuIElmIHRoZVxyXG5cdCAqIG9iamVjdCBpcyBpbnNpZGUgYSBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIHRoYXQgaGFzIHRyYW5zZm9ybWF0aW9ucywgaXQgaXNcclxuXHQgKiBpbiB0aGUgbG9jYWwgY29vcmRpbmF0ZSBzeXN0ZW0gb2YgdGhlIGVuY2xvc2luZyBEaXNwbGF5T2JqZWN0Q29udGFpbmVyLlxyXG5cdCAqIFRodXMsIGZvciBhIERpc3BsYXlPYmplY3RDb250YWluZXIgcm90YXRlZCA5MMKwIGNvdW50ZXJjbG9ja3dpc2UsIHRoZVxyXG5cdCAqIERpc3BsYXlPYmplY3RDb250YWluZXIncyBjaGlsZHJlbiBpbmhlcml0IGEgY29vcmRpbmF0ZSBzeXN0ZW0gdGhhdCBpc1xyXG5cdCAqIHJvdGF0ZWQgOTDCsCBjb3VudGVyY2xvY2t3aXNlLiBUaGUgb2JqZWN0J3MgY29vcmRpbmF0ZXMgcmVmZXIgdG8gdGhlXHJcblx0ICogcmVnaXN0cmF0aW9uIHBvaW50IHBvc2l0aW9uLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgeCgpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl94O1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCB4KHZhbDpudW1iZXIpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX3ggPT0gdmFsKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5feCA9IHZhbDtcclxuXHJcblx0XHR0aGlzLmludmFsaWRhdGVQb3NpdGlvbigpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSW5kaWNhdGVzIHRoZSA8aT55PC9pPiBjb29yZGluYXRlIG9mIHRoZSBEaXNwbGF5T2JqZWN0IGluc3RhbmNlIHJlbGF0aXZlXHJcblx0ICogdG8gdGhlIGxvY2FsIGNvb3JkaW5hdGVzIG9mIHRoZSBwYXJlbnQgRGlzcGxheU9iamVjdENvbnRhaW5lci4gSWYgdGhlXHJcblx0ICogb2JqZWN0IGlzIGluc2lkZSBhIERpc3BsYXlPYmplY3RDb250YWluZXIgdGhhdCBoYXMgdHJhbnNmb3JtYXRpb25zLCBpdCBpc1xyXG5cdCAqIGluIHRoZSBsb2NhbCBjb29yZGluYXRlIHN5c3RlbSBvZiB0aGUgZW5jbG9zaW5nIERpc3BsYXlPYmplY3RDb250YWluZXIuXHJcblx0ICogVGh1cywgZm9yIGEgRGlzcGxheU9iamVjdENvbnRhaW5lciByb3RhdGVkIDkwwrAgY291bnRlcmNsb2Nrd2lzZSwgdGhlXHJcblx0ICogRGlzcGxheU9iamVjdENvbnRhaW5lcidzIGNoaWxkcmVuIGluaGVyaXQgYSBjb29yZGluYXRlIHN5c3RlbSB0aGF0IGlzXHJcblx0ICogcm90YXRlZCA5MMKwIGNvdW50ZXJjbG9ja3dpc2UuIFRoZSBvYmplY3QncyBjb29yZGluYXRlcyByZWZlciB0byB0aGVcclxuXHQgKiByZWdpc3RyYXRpb24gcG9pbnQgcG9zaXRpb24uXHJcblx0ICovXHJcblx0cHVibGljIGdldCB5KCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3k7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHkodmFsOm51bWJlcilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5feSA9PSB2YWwpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl95ID0gdmFsO1xyXG5cclxuXHRcdHRoaXMuaW52YWxpZGF0ZVBvc2l0aW9uKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJbmRpY2F0ZXMgdGhlIHogY29vcmRpbmF0ZSBwb3NpdGlvbiBhbG9uZyB0aGUgei1heGlzIG9mIHRoZSBEaXNwbGF5T2JqZWN0XHJcblx0ICogaW5zdGFuY2UgcmVsYXRpdmUgdG8gdGhlIDNEIHBhcmVudCBjb250YWluZXIuIFRoZSB6IHByb3BlcnR5IGlzIHVzZWQgZm9yXHJcblx0ICogM0QgY29vcmRpbmF0ZXMsIG5vdCBzY3JlZW4gb3IgcGl4ZWwgY29vcmRpbmF0ZXMuXHJcblx0ICpcclxuXHQgKiA8cD5XaGVuIHlvdSBzZXQgYSA8Y29kZT56PC9jb2RlPiBwcm9wZXJ0eSBmb3IgYSBkaXNwbGF5IG9iamVjdCB0b1xyXG5cdCAqIHNvbWV0aGluZyBvdGhlciB0aGFuIHRoZSBkZWZhdWx0IHZhbHVlIG9mIDxjb2RlPjA8L2NvZGU+LCBhIGNvcnJlc3BvbmRpbmdcclxuXHQgKiBNYXRyaXgzRCBvYmplY3QgaXMgYXV0b21hdGljYWxseSBjcmVhdGVkLiBmb3IgYWRqdXN0aW5nIGEgZGlzcGxheSBvYmplY3Qnc1xyXG5cdCAqIHBvc2l0aW9uIGFuZCBvcmllbnRhdGlvbiBpbiB0aHJlZSBkaW1lbnNpb25zLiBXaGVuIHdvcmtpbmcgd2l0aCB0aGVcclxuXHQgKiB6LWF4aXMsIHRoZSBleGlzdGluZyBiZWhhdmlvciBvZiB4IGFuZCB5IHByb3BlcnRpZXMgY2hhbmdlcyBmcm9tIHNjcmVlbiBvclxyXG5cdCAqIHBpeGVsIGNvb3JkaW5hdGVzIHRvIHBvc2l0aW9ucyByZWxhdGl2ZSB0byB0aGUgM0QgcGFyZW50IGNvbnRhaW5lci48L3A+XHJcblx0ICpcclxuXHQgKiA8cD5Gb3IgZXhhbXBsZSwgYSBjaGlsZCBvZiB0aGUgPGNvZGU+X3Jvb3Q8L2NvZGU+IGF0IHBvc2l0aW9uIHggPSAxMDAsIHkgPVxyXG5cdCAqIDEwMCwgeiA9IDIwMCBpcyBub3QgZHJhd24gYXQgcGl4ZWwgbG9jYXRpb24oMTAwLDEwMCkuIFRoZSBjaGlsZCBpcyBkcmF3blxyXG5cdCAqIHdoZXJldmVyIHRoZSAzRCBwcm9qZWN0aW9uIGNhbGN1bGF0aW9uIHB1dHMgaXQuIFRoZSBjYWxjdWxhdGlvbiBpczo8L3A+XHJcblx0ICpcclxuXHQgKiA8cD48Y29kZT4oeH5+Y2FtZXJhRm9jYWxMZW5ndGgvY2FtZXJhUmVsYXRpdmVaUG9zaXRpb24sXHJcblx0ICogeX5+Y2FtZXJhRm9jYWxMZW5ndGgvY2FtZXJhUmVsYXRpdmVaUG9zaXRpb24pPC9jb2RlPjwvcD5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHooKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fejtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgeih2YWw6bnVtYmVyKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl96ID09IHZhbClcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX3ogPSB2YWw7XHJcblxyXG5cdFx0dGhpcy5pbnZhbGlkYXRlUG9zaXRpb24oKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCB6T2Zmc2V0KCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3pPZmZzZXQ7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHpPZmZzZXQodmFsdWU6bnVtYmVyKVxyXG5cdHtcclxuXHRcdHRoaXMuX3pPZmZzZXQgPSB2YWx1ZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYSBuZXcgPGNvZGU+RGlzcGxheU9iamVjdDwvY29kZT4gaW5zdGFuY2UuXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoKVxyXG5cdHtcclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0Ly8gQ2FjaGVkIHZlY3RvciBvZiB0cmFuc2Zvcm1hdGlvbiBjb21wb25lbnRzIHVzZWQgd2hlblxyXG5cdFx0Ly8gcmVjb21wb3NpbmcgdGhlIHRyYW5zZm9ybSBtYXRyaXggaW4gdXBkYXRlVHJhbnNmb3JtKClcclxuXHJcblx0XHR0aGlzLl90cmFuc2Zvcm1Db21wb25lbnRzID0gbmV3IEFycmF5PFZlY3RvcjNEPigzKTtcclxuXHJcblx0XHR0aGlzLl90cmFuc2Zvcm1Db21wb25lbnRzWzBdID0gdGhpcy5fcG9zO1xyXG5cdFx0dGhpcy5fdHJhbnNmb3JtQ29tcG9uZW50c1sxXSA9IHRoaXMuX3JvdDtcclxuXHRcdHRoaXMuX3RyYW5zZm9ybUNvbXBvbmVudHNbMl0gPSB0aGlzLl9zY2E7XHJcblxyXG5cdFx0Ly9jcmVhdGlvbiBvZiBhc3NvY2lhdGVkIHRyYW5zZm9ybSBvYmplY3RcclxuXHRcdHRoaXMuX3RyYW5zZm9ybSA9IG5ldyBUcmFuc2Zvcm0odGhpcyk7XHJcblxyXG5cdFx0dGhpcy5fbWF0cml4M0QuaWRlbnRpdHkoKTtcclxuXHJcblx0XHR0aGlzLl9mbGlwWS5hcHBlbmRTY2FsZSgxLCAtMSwgMSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBhZGRFdmVudExpc3RlbmVyKHR5cGU6c3RyaW5nLCBsaXN0ZW5lcjpGdW5jdGlvbilcclxuXHR7XHJcblx0XHRzdXBlci5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKTtcclxuXHJcblx0XHRzd2l0Y2ggKHR5cGUpIHtcclxuXHRcdFx0Y2FzZSBEaXNwbGF5T2JqZWN0RXZlbnQuUE9TSVRJT05fQ0hBTkdFRDpcclxuXHRcdFx0XHR0aGlzLl9saXN0ZW5Ub1Bvc2l0aW9uQ2hhbmdlZCA9IHRydWU7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgRGlzcGxheU9iamVjdEV2ZW50LlJPVEFUSU9OX0NIQU5HRUQ6XHJcblx0XHRcdFx0dGhpcy5fbGlzdGVuVG9Sb3RhdGlvbkNoYW5nZWQgPSB0cnVlO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIERpc3BsYXlPYmplY3RFdmVudC5TQ0FMRV9DSEFOR0VEOlxyXG5cdFx0XHRcdHRoaXMuX2xpc3RlblRvU2NhbGVDaGFuZ2VkID0gdHJ1ZTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSBEaXNwbGF5T2JqZWN0RXZlbnQuU0NFTkVfQ0hBTkdFRDpcclxuXHRcdFx0XHR0aGlzLl9saXN0ZW5Ub1NjZW5lQ2hhbmdlZCA9IHRydWU7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgRGlzcGxheU9iamVjdEV2ZW50LlNDRU5FVFJBTlNGT1JNX0NIQU5HRUQ6XHJcblx0XHRcdFx0dGhpcy5fbGlzdGVuVG9TY2VuZVRyYW5zZm9ybUNoYW5nZWQgPSB0cnVlO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgY2xvbmUoKTpEaXNwbGF5T2JqZWN0XHJcblx0e1xyXG5cdFx0dmFyIGNsb25lOkRpc3BsYXlPYmplY3QgPSBuZXcgRGlzcGxheU9iamVjdCgpO1xyXG5cdFx0Y2xvbmUucGl2b3QgPSB0aGlzLnBpdm90O1xyXG5cdFx0Y2xvbmUuX2lNYXRyaXgzRCA9IHRoaXMuX2lNYXRyaXgzRDtcclxuXHRcdGNsb25lLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIGNsb25lLl9pTWFza0lEID0gdGhpcy5faU1hc2tJRDtcclxuICAgICAgICBjbG9uZS5faU1hc2tzID0gdGhpcy5faU1hc2tzPyB0aGlzLl9pTWFza3MuY29uY2F0KCkgOiBudWxsO1xyXG5cclxuXHRcdC8vIHRvZG86IGltcGxlbWVudCBmb3IgYWxsIHN1YnR5cGVzXHJcblx0XHRyZXR1cm4gY2xvbmU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBkaXNwb3NlKClcclxuXHR7XHJcblx0XHRpZiAodGhpcy5wYXJlbnQpXHJcblx0XHRcdHRoaXMucGFyZW50LnJlbW92ZUNoaWxkKHRoaXMpO1xyXG5cclxuXHRcdHdoaWxlICh0aGlzLl9wUmVuZGVyYWJsZXMubGVuZ3RoKVxyXG5cdFx0XHR0aGlzLl9wUmVuZGVyYWJsZXNbMF0uZGlzcG9zZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQGluaGVyaXREb2NcclxuXHQgKi9cclxuXHRwdWJsaWMgZGlzcG9zZUFzc2V0KClcclxuXHR7XHJcblx0XHR0aGlzLmRpc3Bvc2UoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgYSByZWN0YW5nbGUgdGhhdCBkZWZpbmVzIHRoZSBhcmVhIG9mIHRoZSBkaXNwbGF5IG9iamVjdCByZWxhdGl2ZVxyXG5cdCAqIHRvIHRoZSBjb29yZGluYXRlIHN5c3RlbSBvZiB0aGUgPGNvZGU+dGFyZ2V0Q29vcmRpbmF0ZVNwYWNlPC9jb2RlPiBvYmplY3QuXHJcblx0ICogQ29uc2lkZXIgdGhlIGZvbGxvd2luZyBjb2RlLCB3aGljaCBzaG93cyBob3cgdGhlIHJlY3RhbmdsZSByZXR1cm5lZCBjYW5cclxuXHQgKiB2YXJ5IGRlcGVuZGluZyBvbiB0aGUgPGNvZGU+dGFyZ2V0Q29vcmRpbmF0ZVNwYWNlPC9jb2RlPiBwYXJhbWV0ZXIgdGhhdFxyXG5cdCAqIHlvdSBwYXNzIHRvIHRoZSBtZXRob2Q6XHJcblx0ICpcclxuXHQgKiA8cD48Yj5Ob3RlOjwvYj4gVXNlIHRoZSA8Y29kZT5sb2NhbFRvR2xvYmFsKCk8L2NvZGU+IGFuZFxyXG5cdCAqIDxjb2RlPmdsb2JhbFRvTG9jYWwoKTwvY29kZT4gbWV0aG9kcyB0byBjb252ZXJ0IHRoZSBkaXNwbGF5IG9iamVjdCdzIGxvY2FsXHJcblx0ICogY29vcmRpbmF0ZXMgdG8gZGlzcGxheSBjb29yZGluYXRlcywgb3IgZGlzcGxheSBjb29yZGluYXRlcyB0byBsb2NhbFxyXG5cdCAqIGNvb3JkaW5hdGVzLCByZXNwZWN0aXZlbHkuPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+VGhlIDxjb2RlPmdldEJvdW5kcygpPC9jb2RlPiBtZXRob2QgaXMgc2ltaWxhciB0byB0aGVcclxuXHQgKiA8Y29kZT5nZXRSZWN0KCk8L2NvZGU+IG1ldGhvZDsgaG93ZXZlciwgdGhlIFJlY3RhbmdsZSByZXR1cm5lZCBieSB0aGVcclxuXHQgKiA8Y29kZT5nZXRCb3VuZHMoKTwvY29kZT4gbWV0aG9kIGluY2x1ZGVzIGFueSBzdHJva2VzIG9uIHNoYXBlcywgd2hlcmVhc1xyXG5cdCAqIHRoZSBSZWN0YW5nbGUgcmV0dXJuZWQgYnkgdGhlIDxjb2RlPmdldFJlY3QoKTwvY29kZT4gbWV0aG9kIGRvZXMgbm90LiBGb3JcclxuXHQgKiBhbiBleGFtcGxlLCBzZWUgdGhlIGRlc2NyaXB0aW9uIG9mIHRoZSA8Y29kZT5nZXRSZWN0KCk8L2NvZGU+IG1ldGhvZC48L3A+XHJcblx0ICpcclxuXHQgKiBAcGFyYW0gdGFyZ2V0Q29vcmRpbmF0ZVNwYWNlIFRoZSBkaXNwbGF5IG9iamVjdCB0aGF0IGRlZmluZXMgdGhlXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb29yZGluYXRlIHN5c3RlbSB0byB1c2UuXHJcblx0ICogQHJldHVybiBUaGUgcmVjdGFuZ2xlIHRoYXQgZGVmaW5lcyB0aGUgYXJlYSBvZiB0aGUgZGlzcGxheSBvYmplY3QgcmVsYXRpdmVcclxuXHQgKiAgICAgICAgIHRvIHRoZSA8Y29kZT50YXJnZXRDb29yZGluYXRlU3BhY2U8L2NvZGU+IG9iamVjdCdzIGNvb3JkaW5hdGVcclxuXHQgKiAgICAgICAgIHN5c3RlbS5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0Qm91bmRzKHRhcmdldENvb3JkaW5hdGVTcGFjZTpEaXNwbGF5T2JqZWN0KTpSZWN0YW5nbGVcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fYm91bmRzOyAvL1RPRE9cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgYSByZWN0YW5nbGUgdGhhdCBkZWZpbmVzIHRoZSBib3VuZGFyeSBvZiB0aGUgZGlzcGxheSBvYmplY3QsIGJhc2VkXHJcblx0ICogb24gdGhlIGNvb3JkaW5hdGUgc3lzdGVtIGRlZmluZWQgYnkgdGhlIDxjb2RlPnRhcmdldENvb3JkaW5hdGVTcGFjZTwvY29kZT5cclxuXHQgKiBwYXJhbWV0ZXIsIGV4Y2x1ZGluZyBhbnkgc3Ryb2tlcyBvbiBzaGFwZXMuIFRoZSB2YWx1ZXMgdGhhdCB0aGVcclxuXHQgKiA8Y29kZT5nZXRSZWN0KCk8L2NvZGU+IG1ldGhvZCByZXR1cm5zIGFyZSB0aGUgc2FtZSBvciBzbWFsbGVyIHRoYW4gdGhvc2VcclxuXHQgKiByZXR1cm5lZCBieSB0aGUgPGNvZGU+Z2V0Qm91bmRzKCk8L2NvZGU+IG1ldGhvZC5cclxuXHQgKlxyXG5cdCAqIDxwPjxiPk5vdGU6PC9iPiBVc2UgPGNvZGU+bG9jYWxUb0dsb2JhbCgpPC9jb2RlPiBhbmRcclxuXHQgKiA8Y29kZT5nbG9iYWxUb0xvY2FsKCk8L2NvZGU+IG1ldGhvZHMgdG8gY29udmVydCB0aGUgZGlzcGxheSBvYmplY3QncyBsb2NhbFxyXG5cdCAqIGNvb3JkaW5hdGVzIHRvIFNjZW5lIGNvb3JkaW5hdGVzLCBvciBTY2VuZSBjb29yZGluYXRlcyB0byBsb2NhbFxyXG5cdCAqIGNvb3JkaW5hdGVzLCByZXNwZWN0aXZlbHkuPC9wPlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHRhcmdldENvb3JkaW5hdGVTcGFjZSBUaGUgZGlzcGxheSBvYmplY3QgdGhhdCBkZWZpbmVzIHRoZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29vcmRpbmF0ZSBzeXN0ZW0gdG8gdXNlLlxyXG5cdCAqIEByZXR1cm4gVGhlIHJlY3RhbmdsZSB0aGF0IGRlZmluZXMgdGhlIGFyZWEgb2YgdGhlIGRpc3BsYXkgb2JqZWN0IHJlbGF0aXZlXHJcblx0ICogICAgICAgICB0byB0aGUgPGNvZGU+dGFyZ2V0Q29vcmRpbmF0ZVNwYWNlPC9jb2RlPiBvYmplY3QncyBjb29yZGluYXRlXHJcblx0ICogICAgICAgICBzeXN0ZW0uXHJcblx0ICovXHJcblx0cHVibGljIGdldFJlY3QodGFyZ2V0Q29vcmRpbmF0ZVNwYWNlOkRpc3BsYXlPYmplY3QgPSBudWxsKTpSZWN0YW5nbGVcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fYm91bmRzOyAvL1RPRE9cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXRCb3godGFyZ2V0Q29vcmRpbmF0ZVNwYWNlOkRpc3BsYXlPYmplY3QgPSBudWxsKTpCb3hcclxuXHR7XHJcblx0XHRpZiAodGhpcy5faVNvdXJjZVByZWZhYilcclxuXHRcdFx0dGhpcy5faVNvdXJjZVByZWZhYi5faVZhbGlkYXRlKCk7XHJcblxyXG5cdFx0Ly9UT0RPIHRhcmdldENvb3JkaW5hdGVTcGFjZVxyXG5cdFx0aWYgKHRoaXMuX2JveEJvdW5kc0ludmFsaWQpIHtcclxuXHRcdFx0dGhpcy5fcFVwZGF0ZUJveEJvdW5kcygpO1xyXG5cclxuXHRcdFx0aWYgKHRoaXMuX3dpZHRoICE9IG51bGwpIHtcclxuXHRcdFx0XHR0aGlzLl9wU2NhbGVYID0gdGhpcy5fd2lkdGgvdGhpcy5fcEJveEJvdW5kcy53aWR0aDtcclxuXHRcdFx0XHR0aGlzLmludmFsaWRhdGVTY2FsZSgpO1xyXG5cdFx0XHR9XHJcblxyXG5cclxuXHRcdFx0aWYgKHRoaXMuX2hlaWdodCAhPSBudWxsKSB7XHJcblx0XHRcdFx0dGhpcy5fcFNjYWxlWSA9IHRoaXMuX2hlaWdodC90aGlzLl9wQm94Qm91bmRzLmhlaWdodDtcclxuXHRcdFx0XHR0aGlzLmludmFsaWRhdGVTY2FsZSgpO1xyXG5cdFx0XHR9XHJcblxyXG5cclxuXHRcdFx0aWYgKHRoaXMuX2RlcHRoICE9IG51bGwpIHtcclxuXHRcdFx0XHR0aGlzLl9wU2NhbGVaID0gdGhpcy5fZGVwdGgvdGhpcy5fcEJveEJvdW5kcy5kZXB0aDtcclxuXHRcdFx0XHR0aGlzLmludmFsaWRhdGVTY2FsZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cclxuXHRcdHJldHVybiB0aGlzLl9wQm94Qm91bmRzO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGdldFNwaGVyZSh0YXJnZXRDb29yZGluYXRlU3BhY2U6RGlzcGxheU9iamVjdCA9IG51bGwpOlNwaGVyZVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9pU291cmNlUHJlZmFiKVxyXG5cdFx0XHR0aGlzLl9pU291cmNlUHJlZmFiLl9pVmFsaWRhdGUoKTtcclxuXHJcblx0XHRpZiAodGhpcy5fc3BoZXJlQm91bmRzSW52YWxpZCkge1xyXG5cdFx0XHR0aGlzLl9wVXBkYXRlU3BoZXJlQm91bmRzKCk7XHJcblx0XHR9XHJcblxyXG5cclxuXHRcdHJldHVybiB0aGlzLl9wU3BoZXJlQm91bmRzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ29udmVydHMgdGhlIDxjb2RlPnBvaW50PC9jb2RlPiBvYmplY3QgZnJvbSB0aGUgU2NlbmUoZ2xvYmFsKSBjb29yZGluYXRlc1xyXG5cdCAqIHRvIHRoZSBkaXNwbGF5IG9iamVjdCdzKGxvY2FsKSBjb29yZGluYXRlcy5cclxuXHQgKlxyXG5cdCAqIDxwPlRvIHVzZSB0aGlzIG1ldGhvZCwgZmlyc3QgY3JlYXRlIGFuIGluc3RhbmNlIG9mIHRoZSBQb2ludCBjbGFzcy4gVGhlXHJcblx0ICogPGk+eDwvaT4gYW5kIDxpPnk8L2k+IHZhbHVlcyB0aGF0IHlvdSBhc3NpZ24gcmVwcmVzZW50IGdsb2JhbCBjb29yZGluYXRlc1xyXG5cdCAqIGJlY2F1c2UgdGhleSByZWxhdGUgdG8gdGhlIG9yaWdpbigwLDApIG9mIHRoZSBtYWluIGRpc3BsYXkgYXJlYS4gVGhlblxyXG5cdCAqIHBhc3MgdGhlIFBvaW50IGluc3RhbmNlIGFzIHRoZSBwYXJhbWV0ZXIgdG8gdGhlXHJcblx0ICogPGNvZGU+Z2xvYmFsVG9Mb2NhbCgpPC9jb2RlPiBtZXRob2QuIFRoZSBtZXRob2QgcmV0dXJucyBhIG5ldyBQb2ludCBvYmplY3RcclxuXHQgKiB3aXRoIDxpPng8L2k+IGFuZCA8aT55PC9pPiB2YWx1ZXMgdGhhdCByZWxhdGUgdG8gdGhlIG9yaWdpbiBvZiB0aGUgZGlzcGxheVxyXG5cdCAqIG9iamVjdCBpbnN0ZWFkIG9mIHRoZSBvcmlnaW4gb2YgdGhlIFNjZW5lLjwvcD5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBwb2ludCBBbiBvYmplY3QgY3JlYXRlZCB3aXRoIHRoZSBQb2ludCBjbGFzcy4gVGhlIFBvaW50IG9iamVjdFxyXG5cdCAqICAgICAgICAgICAgICBzcGVjaWZpZXMgdGhlIDxpPng8L2k+IGFuZCA8aT55PC9pPiBjb29yZGluYXRlcyBhc1xyXG5cdCAqICAgICAgICAgICAgICBwcm9wZXJ0aWVzLlxyXG5cdCAqIEByZXR1cm4gQSBQb2ludCBvYmplY3Qgd2l0aCBjb29yZGluYXRlcyByZWxhdGl2ZSB0byB0aGUgZGlzcGxheSBvYmplY3QuXHJcblx0ICovXHJcblx0cHVibGljIGdsb2JhbFRvTG9jYWwocG9pbnQ6UG9pbnQpOlBvaW50XHJcblx0e1xyXG5cdFx0cmV0dXJuIHBvaW50OyAvL1RPRE9cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnZlcnRzIGEgdHdvLWRpbWVuc2lvbmFsIHBvaW50IGZyb20gdGhlIFNjZW5lKGdsb2JhbCkgY29vcmRpbmF0ZXMgdG8gYVxyXG5cdCAqIHRocmVlLWRpbWVuc2lvbmFsIGRpc3BsYXkgb2JqZWN0J3MobG9jYWwpIGNvb3JkaW5hdGVzLlxyXG5cdCAqXHJcblx0ICogPHA+VG8gdXNlIHRoaXMgbWV0aG9kLCBmaXJzdCBjcmVhdGUgYW4gaW5zdGFuY2Ugb2YgdGhlIFZlY3RvcjNEIGNsYXNzLiBUaGUgeCxcclxuXHQgKiB5IGFuZCB6IHZhbHVlcyB0aGF0IHlvdSBhc3NpZ24gdG8gdGhlIFZlY3RvcjNEIG9iamVjdCByZXByZXNlbnQgZ2xvYmFsXHJcblx0ICogY29vcmRpbmF0ZXMgYmVjYXVzZSB0aGV5IGFyZSByZWxhdGl2ZSB0byB0aGUgb3JpZ2luKDAsMCwwKSBvZiB0aGUgc2NlbmUuIFRoZW5cclxuXHQgKiBwYXNzIHRoZSBWZWN0b3IzRCBvYmplY3QgdG8gdGhlIDxjb2RlPmdsb2JhbFRvTG9jYWwzRCgpPC9jb2RlPiBtZXRob2QgYXMgdGhlXHJcblx0ICogPGNvZGU+cG9zaXRpb248L2NvZGU+IHBhcmFtZXRlci5cclxuXHQgKiBUaGUgbWV0aG9kIHJldHVybnMgdGhyZWUtZGltZW5zaW9uYWwgY29vcmRpbmF0ZXMgYXMgYSBWZWN0b3IzRCBvYmplY3RcclxuXHQgKiBjb250YWluaW5nIDxjb2RlPng8L2NvZGU+LCA8Y29kZT55PC9jb2RlPiwgYW5kIDxjb2RlPno8L2NvZGU+IHZhbHVlcyB0aGF0XHJcblx0ICogYXJlIHJlbGF0aXZlIHRvIHRoZSBvcmlnaW4gb2YgdGhlIHRocmVlLWRpbWVuc2lvbmFsIGRpc3BsYXkgb2JqZWN0LjwvcD5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBwb2ludCBBIFZlY3RvcjNEIG9iamVjdCByZXByZXNlbnRpbmcgZ2xvYmFsIHgsIHkgYW5kIHogY29vcmRpbmF0ZXMgaW5cclxuXHQgKiAgICAgICAgICAgICAgdGhlIHNjZW5lLlxyXG5cdCAqIEByZXR1cm4gQSBWZWN0b3IzRCBvYmplY3Qgd2l0aCBjb29yZGluYXRlcyByZWxhdGl2ZSB0byB0aGUgdGhyZWUtZGltZW5zaW9uYWxcclxuXHQgKiAgICAgICAgIGRpc3BsYXkgb2JqZWN0LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnbG9iYWxUb0xvY2FsM0QocG9zaXRpb246VmVjdG9yM0QpOlZlY3RvcjNEXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuaW52ZXJzZVNjZW5lVHJhbnNmb3JtLnRyYW5zZm9ybVZlY3Rvcihwb3NpdGlvbik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBFdmFsdWF0ZXMgdGhlIGJvdW5kaW5nIGJveCBvZiB0aGUgZGlzcGxheSBvYmplY3QgdG8gc2VlIGlmIGl0IG92ZXJsYXBzIG9yXHJcblx0ICogaW50ZXJzZWN0cyB3aXRoIHRoZSBib3VuZGluZyBib3ggb2YgdGhlIDxjb2RlPm9iajwvY29kZT4gZGlzcGxheSBvYmplY3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gb2JqIFRoZSBkaXNwbGF5IG9iamVjdCB0byB0ZXN0IGFnYWluc3QuXHJcblx0ICogQHJldHVybiA8Y29kZT50cnVlPC9jb2RlPiBpZiB0aGUgYm91bmRpbmcgYm94ZXMgb2YgdGhlIGRpc3BsYXkgb2JqZWN0c1xyXG5cdCAqICAgICAgICAgaW50ZXJzZWN0OyA8Y29kZT5mYWxzZTwvY29kZT4gaWYgbm90LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBoaXRUZXN0T2JqZWN0KG9iajpEaXNwbGF5T2JqZWN0KTpib29sZWFuXHJcblx0e1xyXG5cdFx0cmV0dXJuIGZhbHNlOyAvL1RPRE9cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEV2YWx1YXRlcyB0aGUgZGlzcGxheSBvYmplY3QgdG8gc2VlIGlmIGl0IG92ZXJsYXBzIG9yIGludGVyc2VjdHMgd2l0aCB0aGVcclxuXHQgKiBwb2ludCBzcGVjaWZpZWQgYnkgdGhlIDxjb2RlPng8L2NvZGU+IGFuZCA8Y29kZT55PC9jb2RlPiBwYXJhbWV0ZXJzLiBUaGVcclxuXHQgKiA8Y29kZT54PC9jb2RlPiBhbmQgPGNvZGU+eTwvY29kZT4gcGFyYW1ldGVycyBzcGVjaWZ5IGEgcG9pbnQgaW4gdGhlXHJcblx0ICogY29vcmRpbmF0ZSBzcGFjZSBvZiB0aGUgU2NlbmUsIG5vdCB0aGUgZGlzcGxheSBvYmplY3QgY29udGFpbmVyIHRoYXRcclxuXHQgKiBjb250YWlucyB0aGUgZGlzcGxheSBvYmplY3QodW5sZXNzIHRoYXQgZGlzcGxheSBvYmplY3QgY29udGFpbmVyIGlzIHRoZVxyXG5cdCAqIFNjZW5lKS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB4ICAgICAgICAgVGhlIDxpPng8L2k+IGNvb3JkaW5hdGUgdG8gdGVzdCBhZ2FpbnN0IHRoaXMgb2JqZWN0LlxyXG5cdCAqIEBwYXJhbSB5ICAgICAgICAgVGhlIDxpPnk8L2k+IGNvb3JkaW5hdGUgdG8gdGVzdCBhZ2FpbnN0IHRoaXMgb2JqZWN0LlxyXG5cdCAqIEBwYXJhbSBzaGFwZUZsYWcgV2hldGhlciB0byBjaGVjayBhZ2FpbnN0IHRoZSBhY3R1YWwgcGl4ZWxzIG9mIHRoZSBvYmplY3RcclxuXHQgKiAgICAgICAgICAgICAgICAgKDxjb2RlPnRydWU8L2NvZGU+KSBvciB0aGUgYm91bmRpbmcgYm94XHJcblx0ICogICAgICAgICAgICAgICAgICg8Y29kZT5mYWxzZTwvY29kZT4pLlxyXG5cdCAqIEByZXR1cm4gPGNvZGU+dHJ1ZTwvY29kZT4gaWYgdGhlIGRpc3BsYXkgb2JqZWN0IG92ZXJsYXBzIG9yIGludGVyc2VjdHNcclxuXHQgKiAgICAgICAgIHdpdGggdGhlIHNwZWNpZmllZCBwb2ludDsgPGNvZGU+ZmFsc2U8L2NvZGU+IG90aGVyd2lzZS5cclxuXHQgKi9cclxuXHRwdWJsaWMgaGl0VGVzdFBvaW50KHg6bnVtYmVyLCB5Om51bWJlciwgc2hhcGVGbGFnOmJvb2xlYW4gPSBmYWxzZSk6Ym9vbGVhblxyXG5cdHtcclxuXHRcdHJldHVybiBmYWxzZTsgLy9UT0RPXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSb3RhdGVzIHRoZSAzZCBvYmplY3QgYXJvdW5kIHRvIGZhY2UgYSBwb2ludCBkZWZpbmVkIHJlbGF0aXZlIHRvIHRoZSBsb2NhbCBjb29yZGluYXRlcyBvZiB0aGUgcGFyZW50IDxjb2RlPk9iamVjdENvbnRhaW5lcjNEPC9jb2RlPi5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAgICB0YXJnZXQgICAgICAgIFRoZSB2ZWN0b3IgZGVmaW5pbmcgdGhlIHBvaW50IHRvIGJlIGxvb2tlZCBhdFxyXG5cdCAqIEBwYXJhbSAgICB1cEF4aXMgICAgICAgIEFuIG9wdGlvbmFsIHZlY3RvciB1c2VkIHRvIGRlZmluZSB0aGUgZGVzaXJlZCB1cCBvcmllbnRhdGlvbiBvZiB0aGUgM2Qgb2JqZWN0IGFmdGVyIHJvdGF0aW9uIGhhcyBvY2N1cnJlZFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBsb29rQXQodGFyZ2V0OlZlY3RvcjNELCB1cEF4aXM6VmVjdG9yM0QgPSBudWxsKVxyXG5cdHtcclxuXHJcblx0XHR2YXIgeUF4aXM6VmVjdG9yM0Q7XHJcblx0XHR2YXIgekF4aXM6VmVjdG9yM0Q7XHJcblx0XHR2YXIgeEF4aXM6VmVjdG9yM0Q7XHJcblx0XHR2YXIgcmF3OkFycmF5PG51bWJlcj47XHJcblxyXG5cdFx0aWYgKHVwQXhpcyA9PSBudWxsKVxyXG5cdFx0XHR1cEF4aXMgPSBWZWN0b3IzRC5ZX0FYSVM7XHJcblx0XHRlbHNlXHJcblx0XHRcdHVwQXhpcy5ub3JtYWxpemUoKTtcclxuXHJcblx0XHR6QXhpcyA9IHRhcmdldC5zdWJ0cmFjdCh0aGlzLl9pTWF0cml4M0QucG9zaXRpb24pO1xyXG5cdFx0ekF4aXMubm9ybWFsaXplKCk7XHJcblxyXG5cdFx0eEF4aXMgPSB1cEF4aXMuY3Jvc3NQcm9kdWN0KHpBeGlzKTtcclxuXHRcdHhBeGlzLm5vcm1hbGl6ZSgpO1xyXG5cclxuXHRcdGlmICh4QXhpcy5sZW5ndGggPCAwLjA1KSB7XHJcblx0XHRcdHhBeGlzLnggPSB1cEF4aXMueTtcclxuXHRcdFx0eEF4aXMueSA9IHVwQXhpcy54O1xyXG5cdFx0XHR4QXhpcy56ID0gMDtcclxuXHRcdFx0eEF4aXMubm9ybWFsaXplKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0eUF4aXMgPSB6QXhpcy5jcm9zc1Byb2R1Y3QoeEF4aXMpO1xyXG5cclxuXHRcdHJhdyA9IE1hdHJpeDNEVXRpbHMuUkFXX0RBVEFfQ09OVEFJTkVSO1xyXG5cclxuXHRcdHJhd1swXSA9IHhBeGlzLng7XHJcblx0XHRyYXdbMV0gPSB4QXhpcy55O1xyXG5cdFx0cmF3WzJdID0geEF4aXMuejtcclxuXHRcdHJhd1szXSA9IDA7XHJcblxyXG5cdFx0cmF3WzRdID0geUF4aXMueDtcclxuXHRcdHJhd1s1XSA9IHlBeGlzLnk7XHJcblx0XHRyYXdbNl0gPSB5QXhpcy56O1xyXG5cdFx0cmF3WzddID0gMDtcclxuXHJcblx0XHRyYXdbOF0gPSB6QXhpcy54O1xyXG5cdFx0cmF3WzldID0gekF4aXMueTtcclxuXHRcdHJhd1sxMF0gPSB6QXhpcy56O1xyXG5cdFx0cmF3WzExXSA9IDA7XHJcblxyXG5cdFx0dmFyIG06TWF0cml4M0QgPSBuZXcgTWF0cml4M0QoKTtcclxuXHRcdG0uY29weVJhd0RhdGFGcm9tKHJhdyk7XHJcblxyXG5cdFx0dmFyIHZlYzpWZWN0b3IzRCA9IG0uZGVjb21wb3NlKClbMV07XHJcblxyXG5cdFx0dGhpcy5fcm90YXRpb25YID0gdmVjLng7XHJcblx0XHR0aGlzLl9yb3RhdGlvblkgPSB2ZWMueTtcclxuXHRcdHRoaXMuX3JvdGF0aW9uWiA9IHZlYy56O1xyXG5cclxuXHRcdHRoaXMuaW52YWxpZGF0ZVJvdGF0aW9uKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDb252ZXJ0cyB0aGUgPGNvZGU+cG9pbnQ8L2NvZGU+IG9iamVjdCBmcm9tIHRoZSBkaXNwbGF5IG9iamVjdCdzKGxvY2FsKVxyXG5cdCAqIGNvb3JkaW5hdGVzIHRvIHRoZSBTY2VuZShnbG9iYWwpIGNvb3JkaW5hdGVzLlxyXG5cdCAqXHJcblx0ICogPHA+VGhpcyBtZXRob2QgYWxsb3dzIHlvdSB0byBjb252ZXJ0IGFueSBnaXZlbiA8aT54PC9pPiBhbmQgPGk+eTwvaT5cclxuXHQgKiBjb29yZGluYXRlcyBmcm9tIHZhbHVlcyB0aGF0IGFyZSByZWxhdGl2ZSB0byB0aGUgb3JpZ2luKDAsMCkgb2YgYVxyXG5cdCAqIHNwZWNpZmljIGRpc3BsYXkgb2JqZWN0KGxvY2FsIGNvb3JkaW5hdGVzKSB0byB2YWx1ZXMgdGhhdCBhcmUgcmVsYXRpdmUgdG9cclxuXHQgKiB0aGUgb3JpZ2luIG9mIHRoZSBTY2VuZShnbG9iYWwgY29vcmRpbmF0ZXMpLjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPlRvIHVzZSB0aGlzIG1ldGhvZCwgZmlyc3QgY3JlYXRlIGFuIGluc3RhbmNlIG9mIHRoZSBQb2ludCBjbGFzcy4gVGhlXHJcblx0ICogPGk+eDwvaT4gYW5kIDxpPnk8L2k+IHZhbHVlcyB0aGF0IHlvdSBhc3NpZ24gcmVwcmVzZW50IGxvY2FsIGNvb3JkaW5hdGVzXHJcblx0ICogYmVjYXVzZSB0aGV5IHJlbGF0ZSB0byB0aGUgb3JpZ2luIG9mIHRoZSBkaXNwbGF5IG9iamVjdC48L3A+XHJcblx0ICpcclxuXHQgKiA8cD5Zb3UgdGhlbiBwYXNzIHRoZSBQb2ludCBpbnN0YW5jZSB0aGF0IHlvdSBjcmVhdGVkIGFzIHRoZSBwYXJhbWV0ZXIgdG9cclxuXHQgKiB0aGUgPGNvZGU+bG9jYWxUb0dsb2JhbCgpPC9jb2RlPiBtZXRob2QuIFRoZSBtZXRob2QgcmV0dXJucyBhIG5ldyBQb2ludFxyXG5cdCAqIG9iamVjdCB3aXRoIDxpPng8L2k+IGFuZCA8aT55PC9pPiB2YWx1ZXMgdGhhdCByZWxhdGUgdG8gdGhlIG9yaWdpbiBvZiB0aGVcclxuXHQgKiBTY2VuZSBpbnN0ZWFkIG9mIHRoZSBvcmlnaW4gb2YgdGhlIGRpc3BsYXkgb2JqZWN0LjwvcD5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBwb2ludCBUaGUgbmFtZSBvciBpZGVudGlmaWVyIG9mIGEgcG9pbnQgY3JlYXRlZCB3aXRoIHRoZSBQb2ludFxyXG5cdCAqICAgICAgICAgICAgICBjbGFzcywgc3BlY2lmeWluZyB0aGUgPGk+eDwvaT4gYW5kIDxpPnk8L2k+IGNvb3JkaW5hdGVzIGFzXHJcblx0ICogICAgICAgICAgICAgIHByb3BlcnRpZXMuXHJcblx0ICogQHJldHVybiBBIFBvaW50IG9iamVjdCB3aXRoIGNvb3JkaW5hdGVzIHJlbGF0aXZlIHRvIHRoZSBTY2VuZS5cclxuXHQgKi9cclxuXHRwdWJsaWMgbG9jYWxUb0dsb2JhbChwb2ludDpQb2ludCk6UG9pbnRcclxuXHR7XHJcblx0XHRyZXR1cm4gbmV3IFBvaW50KCk7IC8vVE9ET1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ29udmVydHMgYSB0aHJlZS1kaW1lbnNpb25hbCBwb2ludCBvZiB0aGUgdGhyZWUtZGltZW5zaW9uYWwgZGlzcGxheVxyXG5cdCAqIG9iamVjdCdzKGxvY2FsKSBjb29yZGluYXRlcyB0byBhIHRocmVlLWRpbWVuc2lvbmFsIHBvaW50IGluIHRoZSBTY2VuZVxyXG5cdCAqIChnbG9iYWwpIGNvb3JkaW5hdGVzLlxyXG5cdCAqXHJcblx0ICogPHA+VGhpcyBtZXRob2QgYWxsb3dzIHlvdSB0byBjb252ZXJ0IGFueSBnaXZlbiA8aT54PC9pPiwgPGk+eTwvaT4gYW5kXHJcblx0ICogPGk+ejwvaT4gY29vcmRpbmF0ZXMgZnJvbSB2YWx1ZXMgdGhhdCBhcmUgcmVsYXRpdmUgdG8gdGhlIG9yaWdpbigwLDAsMCkgb2ZcclxuXHQgKiBhIHNwZWNpZmljIGRpc3BsYXkgb2JqZWN0KGxvY2FsIGNvb3JkaW5hdGVzKSB0byB2YWx1ZXMgdGhhdCBhcmUgcmVsYXRpdmUgdG9cclxuXHQgKiB0aGUgb3JpZ2luIG9mIHRoZSBTY2VuZShnbG9iYWwgY29vcmRpbmF0ZXMpLjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPlRvIHVzZSB0aGlzIG1ldGhvZCwgZmlyc3QgY3JlYXRlIGFuIGluc3RhbmNlIG9mIHRoZSBQb2ludCBjbGFzcy4gVGhlXHJcblx0ICogPGk+eDwvaT4gYW5kIDxpPnk8L2k+IHZhbHVlcyB0aGF0IHlvdSBhc3NpZ24gcmVwcmVzZW50IGxvY2FsIGNvb3JkaW5hdGVzXHJcblx0ICogYmVjYXVzZSB0aGV5IHJlbGF0ZSB0byB0aGUgb3JpZ2luIG9mIHRoZSBkaXNwbGF5IG9iamVjdC48L3A+XHJcblx0ICpcclxuXHQgKiA8cD5Zb3UgdGhlbiBwYXNzIHRoZSBWZWN0b3IzRCBpbnN0YW5jZSB0aGF0IHlvdSBjcmVhdGVkIGFzIHRoZSBwYXJhbWV0ZXIgdG9cclxuXHQgKiB0aGUgPGNvZGU+bG9jYWxUb0dsb2JhbDNEKCk8L2NvZGU+IG1ldGhvZC4gVGhlIG1ldGhvZCByZXR1cm5zIGEgbmV3XHJcblx0ICogVmVjdG9yM0Qgb2JqZWN0IHdpdGggPGk+eDwvaT4sIDxpPnk8L2k+IGFuZCA8aT56PC9pPiB2YWx1ZXMgdGhhdCByZWxhdGUgdG9cclxuXHQgKiB0aGUgb3JpZ2luIG9mIHRoZSBTY2VuZSBpbnN0ZWFkIG9mIHRoZSBvcmlnaW4gb2YgdGhlIGRpc3BsYXkgb2JqZWN0LjwvcD5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBwb3NpdGlvbiBBIFZlY3RvcjNEIG9iamVjdCBjb250YWluaW5nIGVpdGhlciBhIHRocmVlLWRpbWVuc2lvbmFsXHJcblx0ICogICAgICAgICAgICAgICAgcG9zaXRpb24gb3IgdGhlIGNvb3JkaW5hdGVzIG9mIHRoZSB0aHJlZS1kaW1lbnNpb25hbFxyXG5cdCAqICAgICAgICAgICAgICAgIGRpc3BsYXkgb2JqZWN0LlxyXG5cdCAqIEByZXR1cm4gQSBWZWN0b3IzRCBvYmplY3QgcmVwcmVzZW50aW5nIGEgdGhyZWUtZGltZW5zaW9uYWwgcG9zaXRpb24gaW5cclxuXHQgKiAgICAgICAgIHRoZSBTY2VuZS5cclxuXHQgKi9cclxuXHRwdWJsaWMgbG9jYWxUb0dsb2JhbDNEKHBvc2l0aW9uOlZlY3RvcjNEKTpWZWN0b3IzRFxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLnNjZW5lVHJhbnNmb3JtLnRyYW5zZm9ybVZlY3Rvcihwb3NpdGlvbik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNb3ZlcyB0aGUgM2Qgb2JqZWN0IGRpcmVjdGx5IHRvIGEgcG9pbnQgaW4gc3BhY2VcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAgICBkeCAgICAgICAgVGhlIGFtb3VudCBvZiBtb3ZlbWVudCBhbG9uZyB0aGUgbG9jYWwgeCBheGlzLlxyXG5cdCAqIEBwYXJhbSAgICBkeSAgICAgICAgVGhlIGFtb3VudCBvZiBtb3ZlbWVudCBhbG9uZyB0aGUgbG9jYWwgeSBheGlzLlxyXG5cdCAqIEBwYXJhbSAgICBkeiAgICAgICAgVGhlIGFtb3VudCBvZiBtb3ZlbWVudCBhbG9uZyB0aGUgbG9jYWwgeiBheGlzLlxyXG5cdCAqL1xyXG5cclxuXHRwdWJsaWMgbW92ZVRvKGR4Om51bWJlciwgZHk6bnVtYmVyLCBkejpudW1iZXIpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX3ggPT0gZHggJiYgdGhpcy5feSA9PSBkeSAmJiB0aGlzLl96ID09IGR6KVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5feCA9IGR4O1xyXG5cdFx0dGhpcy5feSA9IGR5O1xyXG5cdFx0dGhpcy5feiA9IGR6O1xyXG5cclxuXHRcdHRoaXMuaW52YWxpZGF0ZVBvc2l0aW9uKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNb3ZlcyB0aGUgbG9jYWwgcG9pbnQgYXJvdW5kIHdoaWNoIHRoZSBvYmplY3Qgcm90YXRlcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAgICBkeCAgICAgICAgVGhlIGFtb3VudCBvZiBtb3ZlbWVudCBhbG9uZyB0aGUgbG9jYWwgeCBheGlzLlxyXG5cdCAqIEBwYXJhbSAgICBkeSAgICAgICAgVGhlIGFtb3VudCBvZiBtb3ZlbWVudCBhbG9uZyB0aGUgbG9jYWwgeSBheGlzLlxyXG5cdCAqIEBwYXJhbSAgICBkeiAgICAgICAgVGhlIGFtb3VudCBvZiBtb3ZlbWVudCBhbG9uZyB0aGUgbG9jYWwgeiBheGlzLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBtb3ZlUGl2b3QoZHg6bnVtYmVyLCBkeTpudW1iZXIsIGR6Om51bWJlcilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fcGl2b3QgPT0gbnVsbClcclxuXHRcdFx0dGhpcy5fcGl2b3QgPSBuZXcgVmVjdG9yM0QoKTtcclxuXHJcblx0XHR0aGlzLl9waXZvdC54ICs9IGR4O1xyXG5cdFx0dGhpcy5fcGl2b3QueSArPSBkeTtcclxuXHRcdHRoaXMuX3Bpdm90LnogKz0gZHo7XHJcblxyXG5cdFx0dGhpcy5pbnZhbGlkYXRlUGl2b3QoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJvdGF0ZXMgdGhlIDNkIG9iamVjdCBhcm91bmQgaXQncyBsb2NhbCB4LWF4aXNcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAgICBhbmdsZSAgICAgICAgVGhlIGFtb3VudCBvZiByb3RhdGlvbiBpbiBkZWdyZWVzXHJcblx0ICovXHJcblx0cHVibGljIHBpdGNoKGFuZ2xlOm51bWJlcilcclxuXHR7XHJcblx0XHR0aGlzLnJvdGF0ZShWZWN0b3IzRC5YX0FYSVMsIGFuZ2xlKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldFJlbmRlclNjZW5lVHJhbnNmb3JtKGNhbWVyYTpDYW1lcmEpOk1hdHJpeDNEXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMub3JpZW50YXRpb25Nb2RlID09IE9yaWVudGF0aW9uTW9kZS5DQU1FUkFfUExBTkUpIHtcclxuXHRcdFx0dmFyIGNvbXBzOkFycmF5PFZlY3RvcjNEPiA9IGNhbWVyYS5zY2VuZVRyYW5zZm9ybS5kZWNvbXBvc2UoKTtcclxuXHRcdFx0dmFyIHNjYWxlOlZlY3RvcjNEID0gY29tcHNbMl07XHJcblx0XHRcdGNvbXBzWzBdID0gdGhpcy5zY2VuZVBvc2l0aW9uO1xyXG5cdFx0XHRzY2FsZS54ID0gdGhpcy5fcFNjYWxlWDtcclxuXHRcdFx0c2NhbGUueSA9IHRoaXMuX3BTY2FsZVk7XHJcblx0XHRcdHNjYWxlLnogPSB0aGlzLl9wU2NhbGVaO1xyXG5cdFx0XHR0aGlzLl9vcmllbnRhdGlvbk1hdHJpeC5yZWNvbXBvc2UoY29tcHMpO1xyXG5cclxuXHRcdFx0Ly9hZGQgaW4gY2FzZSBvZiBwaXZvdFxyXG5cdFx0XHRpZiAoIXRoaXMuX3Bpdm90WmVybyAmJiB0aGlzLmFsaWdubWVudE1vZGUgPT0gQWxpZ25tZW50TW9kZS5QSVZPVF9QT0lOVClcclxuXHRcdFx0XHR0aGlzLl9vcmllbnRhdGlvbk1hdHJpeC5wcmVwZW5kVHJhbnNsYXRpb24oLXRoaXMuX3Bpdm90LngvdGhpcy5fcFNjYWxlWCwgLXRoaXMuX3Bpdm90LnkvdGhpcy5fcFNjYWxlWSwgLXRoaXMuX3Bpdm90LnovdGhpcy5fcFNjYWxlWik7XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcy5fb3JpZW50YXRpb25NYXRyaXg7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuc2NlbmVUcmFuc2Zvcm07XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSb3RhdGVzIHRoZSAzZCBvYmplY3QgYXJvdW5kIGl0J3MgbG9jYWwgei1heGlzXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gICAgYW5nbGUgICAgICAgIFRoZSBhbW91bnQgb2Ygcm90YXRpb24gaW4gZGVncmVlc1xyXG5cdCAqL1xyXG5cdHB1YmxpYyByb2xsKGFuZ2xlOm51bWJlcilcclxuXHR7XHJcblx0XHR0aGlzLnJvdGF0ZShWZWN0b3IzRC5aX0FYSVMsIGFuZ2xlKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJvdGF0ZXMgdGhlIDNkIG9iamVjdCBhcm91bmQgYW4gYXhpcyBieSBhIGRlZmluZWQgYW5nbGVcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAgICBheGlzICAgICAgICBUaGUgdmVjdG9yIGRlZmluaW5nIHRoZSBheGlzIG9mIHJvdGF0aW9uXHJcblx0ICogQHBhcmFtICAgIGFuZ2xlICAgICAgICBUaGUgYW1vdW50IG9mIHJvdGF0aW9uIGluIGRlZ3JlZXNcclxuXHQgKi9cclxuXHRwdWJsaWMgcm90YXRlKGF4aXM6VmVjdG9yM0QsIGFuZ2xlOm51bWJlcilcclxuXHR7XHJcblx0XHR2YXIgbTpNYXRyaXgzRCA9IG5ldyBNYXRyaXgzRCgpO1xyXG5cdFx0bS5wcmVwZW5kUm90YXRpb24oYW5nbGUsIGF4aXMpO1xyXG5cclxuXHRcdHZhciB2ZWM6VmVjdG9yM0QgPSBtLmRlY29tcG9zZSgpWzFdO1xyXG5cclxuXHRcdHRoaXMuX3JvdGF0aW9uWCArPSB2ZWMueDtcclxuXHRcdHRoaXMuX3JvdGF0aW9uWSArPSB2ZWMueTtcclxuXHRcdHRoaXMuX3JvdGF0aW9uWiArPSB2ZWMuejtcclxuXHJcblx0XHR0aGlzLmludmFsaWRhdGVSb3RhdGlvbigpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUm90YXRlcyB0aGUgM2Qgb2JqZWN0IGRpcmVjdGx5IHRvIGEgZXVsZXIgYW5nbGVcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAgICBheCAgICAgICAgVGhlIGFuZ2xlIGluIGRlZ3JlZXMgb2YgdGhlIHJvdGF0aW9uIGFyb3VuZCB0aGUgeCBheGlzLlxyXG5cdCAqIEBwYXJhbSAgICBheSAgICAgICAgVGhlIGFuZ2xlIGluIGRlZ3JlZXMgb2YgdGhlIHJvdGF0aW9uIGFyb3VuZCB0aGUgeSBheGlzLlxyXG5cdCAqIEBwYXJhbSAgICBheiAgICAgICAgVGhlIGFuZ2xlIGluIGRlZ3JlZXMgb2YgdGhlIHJvdGF0aW9uIGFyb3VuZCB0aGUgeiBheGlzLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyByb3RhdGVUbyhheDpudW1iZXIsIGF5Om51bWJlciwgYXo6bnVtYmVyKVxyXG5cdHtcclxuXHRcdHRoaXMuX3JvdGF0aW9uWCA9IGF4Kk1hdGhDb25zdHMuREVHUkVFU19UT19SQURJQU5TO1xyXG5cdFx0dGhpcy5fcm90YXRpb25ZID0gYXkqTWF0aENvbnN0cy5ERUdSRUVTX1RPX1JBRElBTlM7XHJcblx0XHR0aGlzLl9yb3RhdGlvblogPSBheipNYXRoQ29uc3RzLkRFR1JFRVNfVE9fUkFESUFOUztcclxuXHJcblx0XHR0aGlzLmludmFsaWRhdGVSb3RhdGlvbigpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgcmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlOnN0cmluZywgbGlzdGVuZXI6RnVuY3Rpb24pXHJcblx0e1xyXG5cdFx0c3VwZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcik7XHJcblxyXG5cdFx0aWYgKHRoaXMuaGFzRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHRzd2l0Y2ggKHR5cGUpIHtcclxuXHRcdFx0Y2FzZSBEaXNwbGF5T2JqZWN0RXZlbnQuUE9TSVRJT05fQ0hBTkdFRDpcclxuXHRcdFx0XHR0aGlzLl9saXN0ZW5Ub1Bvc2l0aW9uQ2hhbmdlZCA9IGZhbHNlO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSBEaXNwbGF5T2JqZWN0RXZlbnQuUk9UQVRJT05fQ0hBTkdFRDpcclxuXHRcdFx0XHR0aGlzLl9saXN0ZW5Ub1JvdGF0aW9uQ2hhbmdlZCA9IGZhbHNlO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSBEaXNwbGF5T2JqZWN0RXZlbnQuU0NBTEVfQ0hBTkdFRDpcclxuXHRcdFx0XHR0aGlzLl9saXN0ZW5Ub1NjYWxlQ2hhbmdlZCA9IGZhbHNlO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTW92ZXMgdGhlIDNkIG9iamVjdCBhbG9uZyBhIHZlY3RvciBieSBhIGRlZmluZWQgbGVuZ3RoXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gICAgYXhpcyAgICAgICAgVGhlIHZlY3RvciBkZWZpbmluZyB0aGUgYXhpcyBvZiBtb3ZlbWVudFxyXG5cdCAqIEBwYXJhbSAgICBkaXN0YW5jZSAgICBUaGUgbGVuZ3RoIG9mIHRoZSBtb3ZlbWVudFxyXG5cdCAqL1xyXG5cdHB1YmxpYyB0cmFuc2xhdGUoYXhpczpWZWN0b3IzRCwgZGlzdGFuY2U6bnVtYmVyKVxyXG5cdHtcclxuXHRcdHZhciB4Om51bWJlciA9IGF4aXMueCwgeTpudW1iZXIgPSBheGlzLnksIHo6bnVtYmVyID0gYXhpcy56O1xyXG5cdFx0dmFyIGxlbjpudW1iZXIgPSBkaXN0YW5jZS9NYXRoLnNxcnQoeCp4ICsgeSp5ICsgeip6KTtcclxuXHJcblx0XHR0aGlzLl94ICs9IHgqbGVuO1xyXG5cdFx0dGhpcy5feSArPSB5KmxlbjtcclxuXHRcdHRoaXMuX3ogKz0geipsZW47XHJcblxyXG5cdFx0dGhpcy5pbnZhbGlkYXRlUG9zaXRpb24oKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1vdmVzIHRoZSAzZCBvYmplY3QgYWxvbmcgYSB2ZWN0b3IgYnkgYSBkZWZpbmVkIGxlbmd0aFxyXG5cdCAqXHJcblx0ICogQHBhcmFtICAgIGF4aXMgICAgICAgIFRoZSB2ZWN0b3IgZGVmaW5pbmcgdGhlIGF4aXMgb2YgbW92ZW1lbnRcclxuXHQgKiBAcGFyYW0gICAgZGlzdGFuY2UgICAgVGhlIGxlbmd0aCBvZiB0aGUgbW92ZW1lbnRcclxuXHQgKi9cclxuXHRwdWJsaWMgdHJhbnNsYXRlTG9jYWwoYXhpczpWZWN0b3IzRCwgZGlzdGFuY2U6bnVtYmVyKVxyXG5cdHtcclxuXHRcdHZhciB4Om51bWJlciA9IGF4aXMueCwgeTpudW1iZXIgPSBheGlzLnksIHo6bnVtYmVyID0gYXhpcy56O1xyXG5cdFx0dmFyIGxlbjpudW1iZXIgPSBkaXN0YW5jZS9NYXRoLnNxcnQoeCp4ICsgeSp5ICsgeip6KTtcclxuXHJcblx0XHR0aGlzLl9pTWF0cml4M0QucHJlcGVuZFRyYW5zbGF0aW9uKHgqbGVuLCB5KmxlbiwgeipsZW4pO1xyXG5cclxuXHRcdHRoaXMuX21hdHJpeDNELmNvcHlDb2x1bW5UbygzLCB0aGlzLl9wb3MpO1xyXG5cclxuXHRcdHRoaXMuX3ggPSB0aGlzLl9wb3MueDtcclxuXHRcdHRoaXMuX3kgPSB0aGlzLl9wb3MueTtcclxuXHRcdHRoaXMuX3ogPSB0aGlzLl9wb3MuejtcclxuXHJcblx0XHR0aGlzLmludmFsaWRhdGVQb3NpdGlvbigpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUm90YXRlcyB0aGUgM2Qgb2JqZWN0IGFyb3VuZCBpdCdzIGxvY2FsIHktYXhpc1xyXG5cdCAqXHJcblx0ICogQHBhcmFtICAgIGFuZ2xlICAgICAgICBUaGUgYW1vdW50IG9mIHJvdGF0aW9uIGluIGRlZ3JlZXNcclxuXHQgKi9cclxuXHRwdWJsaWMgeWF3KGFuZ2xlOm51bWJlcilcclxuXHR7XHJcblx0XHR0aGlzLnJvdGF0ZShWZWN0b3IzRC5ZX0FYSVMsIGFuZ2xlKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBpbnRlcm5hbFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBfaUNvbnRyb2xsZXI6Q29udHJvbGxlckJhc2U7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBpbnRlcm5hbFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgX2lBc3NpZ25lZFBhcnRpdGlvbigpOlBhcnRpdGlvblxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9wSW1wbGljaXRQYXJ0aXRpb247XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgdHJhbnNmb3JtYXRpb24gb2YgdGhlIDNkIG9iamVjdCwgcmVsYXRpdmUgdG8gdGhlIGxvY2FsIGNvb3JkaW5hdGVzIG9mIHRoZSBwYXJlbnQgPGNvZGU+T2JqZWN0Q29udGFpbmVyM0Q8L2NvZGU+LlxyXG5cdCAqXHJcblx0ICogQGludGVybmFsXHJcblx0ICovXHJcblx0cHVibGljIGdldCBfaU1hdHJpeDNEKCk6TWF0cml4M0RcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fbWF0cml4M0REaXJ0eSlcclxuXHRcdFx0dGhpcy5fcFVwZGF0ZU1hdHJpeDNEKCk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX21hdHJpeDNEO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBfaU1hdHJpeDNEKHZhbDpNYXRyaXgzRClcclxuXHR7XHJcblxyXG5cdFx0Ly8gVE9ETzogRnJvbSBBUzMgLSBEbyB3ZSBzdGlsbCBuZWVkIHRoaXMgaW4gSlMgP1xyXG5cdFx0Ly9yaWRpY3Vsb3VzIG1hdHJpeCBlcnJvclxyXG5cdFx0LypcclxuXHRcdGlmICghdmFsLnJhd0RhdGFbMF0pIHtcclxuXHJcblx0XHRcdHZhciByYXc6bnVtYmVyW10gPSBNYXRyaXgzRFV0aWxzLlJBV19EQVRBX0NPTlRBSU5FUjtcclxuXHRcdFx0dmFsLmNvcHlSYXdEYXRhVG8ocmF3KTtcclxuXHRcdFx0cmF3WzBdID0gdGhpcy5fc21hbGxlc3ROdW1iZXI7XHJcblx0XHRcdHZhbC5jb3B5UmF3RGF0YUZyb20ocmF3KTtcclxuXHRcdH1cclxuXHRcdC8vKi9cclxuXHRcdHZhciBlbGVtZW50czpBcnJheTxWZWN0b3IzRD4gPSB2YWwuZGVjb21wb3NlKCk7XHJcblx0XHR2YXIgdmVjOlZlY3RvcjNEO1xyXG5cclxuXHRcdHZlYyA9IGVsZW1lbnRzWzBdO1xyXG5cclxuXHRcdGlmICh0aGlzLl94ICE9IHZlYy54IHx8IHRoaXMuX3kgIT0gdmVjLnkgfHwgdGhpcy5feiAhPSB2ZWMueikge1xyXG5cdFx0XHR0aGlzLl94ID0gdmVjLng7XHJcblx0XHRcdHRoaXMuX3kgPSB2ZWMueTtcclxuXHRcdFx0dGhpcy5feiA9IHZlYy56O1xyXG5cclxuXHRcdFx0dGhpcy5pbnZhbGlkYXRlUG9zaXRpb24oKTtcclxuXHRcdH1cclxuXHJcblx0XHR2ZWMgPSBlbGVtZW50c1sxXTtcclxuXHJcblx0XHRpZiAodGhpcy5fcm90YXRpb25YICE9IHZlYy54IHx8IHRoaXMuX3JvdGF0aW9uWSAhPSB2ZWMueSB8fCB0aGlzLl9yb3RhdGlvblogIT0gdmVjLnopIHtcclxuXHRcdFx0dGhpcy5fcm90YXRpb25YID0gdmVjLng7XHJcblx0XHRcdHRoaXMuX3JvdGF0aW9uWSA9IHZlYy55O1xyXG5cdFx0XHR0aGlzLl9yb3RhdGlvblogPSB2ZWMuejtcclxuXHJcblx0XHRcdHRoaXMuaW52YWxpZGF0ZVJvdGF0aW9uKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dmVjID0gZWxlbWVudHNbMl07XHJcblxyXG5cdFx0aWYgKHRoaXMuX3BTY2FsZVggIT0gdmVjLnggfHwgdGhpcy5fcFNjYWxlWSAhPSB2ZWMueSB8fCB0aGlzLl9wU2NhbGVaICE9IHZlYy56KSB7XHJcblx0XHRcdHRoaXMuX3BTY2FsZVggPSB2ZWMueDtcclxuXHRcdFx0dGhpcy5fcFNjYWxlWSA9IHZlYy55O1xyXG5cdFx0XHR0aGlzLl9wU2NhbGVaID0gdmVjLno7XHJcblxyXG5cdFx0XHR0aGlzLmludmFsaWRhdGVTY2FsZSgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQGludGVybmFsXHJcblx0ICovXHJcblx0cHVibGljIGdldCBfaVBpY2tpbmdDb2xsaXNpb25WTygpOlBpY2tpbmdDb2xsaXNpb25WT1xyXG5cdHtcclxuXHRcdGlmICghdGhpcy5fcFBpY2tpbmdDb2xsaXNpb25WTylcclxuXHRcdFx0dGhpcy5fcFBpY2tpbmdDb2xsaXNpb25WTyA9IG5ldyBQaWNraW5nQ29sbGlzaW9uVk8odGhpcyk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX3BQaWNraW5nQ29sbGlzaW9uVk87XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAaW50ZXJuYWxcclxuXHQgKi9cclxuXHRwdWJsaWMgaVNldFBhcmVudCh2YWx1ZTpEaXNwbGF5T2JqZWN0Q29udGFpbmVyKVxyXG5cdHtcclxuXHRcdHRoaXMuX3BQYXJlbnQgPSB2YWx1ZTtcclxuXHJcblx0XHRpZiAodmFsdWUpIHtcclxuXHRcdFx0dGhpcy5fcFVwZGF0ZUltcGxpY2l0TW91c2VFbmFibGVkKHZhbHVlLm1vdXNlQ2hpbGRyZW4pO1xyXG5cdFx0XHR0aGlzLl9wVXBkYXRlSW1wbGljaXRWaXNpYmlsaXR5KHZhbHVlLl9pSXNWaXNpYmxlKCkpO1xyXG5cdFx0XHR0aGlzLl9wVXBkYXRlSW1wbGljaXRQYXJ0aXRpb24odmFsdWUuX2lBc3NpZ25lZFBhcnRpdGlvbiwgdmFsdWUuX3BTY2VuZSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLl9wVXBkYXRlSW1wbGljaXRNb3VzZUVuYWJsZWQodHJ1ZSk7XHJcblx0XHRcdHRoaXMuX3BVcGRhdGVJbXBsaWNpdFZpc2liaWxpdHkodHJ1ZSk7XHJcblx0XHRcdHRoaXMuX3BVcGRhdGVJbXBsaWNpdFBhcnRpdGlvbihudWxsLCBudWxsKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwcm90ZWN0ZWRcclxuXHQgKi9cclxuXHRwdWJsaWMgcEludmFsaWRhdGVTY2VuZVRyYW5zZm9ybSgpXHJcblx0e1xyXG5cdFx0dGhpcy5fcFNjZW5lVHJhbnNmb3JtRGlydHkgPSAhdGhpcy5fcElnbm9yZVRyYW5zZm9ybTtcclxuXHRcdHRoaXMuX2ludmVyc2VTY2VuZVRyYW5zZm9ybURpcnR5ID0gIXRoaXMuX3BJZ25vcmVUcmFuc2Zvcm07XHJcblx0XHR0aGlzLl9zY2VuZVBvc2l0aW9uRGlydHkgPSAhdGhpcy5fcElnbm9yZVRyYW5zZm9ybTtcclxuXHJcblx0XHRpZiAodGhpcy5pc0VudGl0eSlcclxuXHRcdFx0dGhpcy5pbnZhbGlkYXRlUGFydGl0aW9uKCk7XHJcblxyXG5cdFx0aWYgKHRoaXMuX2xpc3RlblRvU2NlbmVUcmFuc2Zvcm1DaGFuZ2VkKVxyXG5cdFx0XHR0aGlzLm5vdGlmeVNjZW5lVHJhbnNmb3JtQ2hhbmdlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAcHJvdGVjdGVkXHJcblx0ICovXHJcblx0cHVibGljIF9wVXBkYXRlSW1wbGljaXRNb3VzZUVuYWJsZWQodmFsdWU6Ym9vbGVhbilcclxuXHR7XHJcblx0XHR0aGlzLl9wSW1wbGljaXRNb3VzZUVuYWJsZWQgPSB0aGlzLl9leHBsaWNpdE1vdXNlRW5hYmxlZCAmJiB2YWx1ZTtcclxuXHJcblx0XHQvLyBJZiB0aGVyZSBpcyBhIHBhcmVudCBhbmQgdGhpcyBjaGlsZCBkb2VzIG5vdCBoYXZlIGEgcGlja2luZyBjb2xsaWRlciwgdXNlIGl0cyBwYXJlbnQncyBwaWNraW5nIGNvbGxpZGVyLlxyXG5cdFx0aWYgKHRoaXMuX3BJbXBsaWNpdE1vdXNlRW5hYmxlZCAmJiB0aGlzLl9wUGFyZW50ICYmICF0aGlzLl9wUGlja2luZ0NvbGxpZGVyKVxyXG5cdFx0XHR0aGlzLl9wUGlja2luZ0NvbGxpZGVyID0gIHRoaXMuX3BQYXJlbnQuX3BQaWNraW5nQ29sbGlkZXI7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAcHJvdGVjdGVkXHJcblx0ICovXHJcblx0cHVibGljIF9wVXBkYXRlSW1wbGljaXRQYXJ0aXRpb24ocGFydGl0aW9uOlBhcnRpdGlvbiwgc2NlbmU6U2NlbmUpXHJcblx0e1xyXG5cdFx0dmFyIHNjZW5lQ2hhbmdlZDpib29sZWFuID0gdGhpcy5fcFNjZW5lICE9IHNjZW5lO1xyXG5cclxuXHRcdGlmIChzY2VuZUNoYW5nZWQgJiYgdGhpcy5fcFNjZW5lKVxyXG5cdFx0XHR0aGlzLl9wU2NlbmUuZGlzcGF0Y2hFdmVudChuZXcgU2NlbmVFdmVudChTY2VuZUV2ZW50LlJFTU9WRURfRlJPTV9TQ0VORSwgdGhpcykpO1xyXG5cclxuXHRcdGlmICh0aGlzLl9wU2NlbmUgJiYgdGhpcy5fcEltcGxpY2l0UGFydGl0aW9uKSB7XHJcblx0XHRcdC8vdW5yZWdpc3RlciBwYXJ0aXRpb24gZnJvbSBjdXJyZW50IHNjZW5lXHJcblx0XHRcdHRoaXMuX3BTY2VuZS5faVVucmVnaXN0ZXJQYXJ0aXRpb24odGhpcy5fcEltcGxpY2l0UGFydGl0aW9uKTtcclxuXHJcblx0XHRcdC8vdW5yZWdpc3RlciBlbnRpdHkgZnJvbSBjdXJyZW50IHBhcnRpdGlvblxyXG5cdFx0XHRpZiAodGhpcy5fcElzRW50aXR5KVxyXG5cdFx0XHRcdHRoaXMuX3BVbnJlZ2lzdGVyRW50aXR5KHRoaXMuX3BJbXBsaWNpdFBhcnRpdGlvbik7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gYXNzaWduIHBhcmVudCBpbXBsaWNpdCBwYXJ0aXRpb24gaWYgbm8gZXhwbGljaXQgb25lIGlzIGdpdmVuXHJcblx0XHR0aGlzLl9wSW1wbGljaXRQYXJ0aXRpb24gPSB0aGlzLl9leHBsaWNpdFBhcnRpdGlvbiB8fCBwYXJ0aXRpb247XHJcblxyXG5cdFx0Ly9hc3NpZ24gc2NlbmVcclxuXHRcdGlmIChzY2VuZUNoYW5nZWQpXHJcblx0XHRcdHRoaXMuX3BTY2VuZSA9IHNjZW5lO1xyXG5cclxuXHRcdGlmICh0aGlzLl9wU2NlbmUgJiYgdGhpcy5fcEltcGxpY2l0UGFydGl0aW9uKSB7XHJcblx0XHRcdC8vcmVnaXN0ZXIgcGFydGl0aW9uIHdpdGggc2NlbmVcclxuXHRcdFx0dGhpcy5fcFNjZW5lLl9pUmVnaXN0ZXJQYXJ0aXRpb24odGhpcy5fcEltcGxpY2l0UGFydGl0aW9uKTtcclxuXHJcblx0XHRcdC8vcmVnaXN0ZXIgZW50aXR5IHdpdGggbmV3IHBhcnRpdGlvblxyXG5cdFx0XHRpZiAodGhpcy5fcElzRW50aXR5KVxyXG5cdFx0XHRcdHRoaXMuX3BSZWdpc3RlckVudGl0eSh0aGlzLl9wSW1wbGljaXRQYXJ0aXRpb24pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChzY2VuZUNoYW5nZWQgJiYgdGhpcy5fcFNjZW5lKVxyXG5cdFx0XHR0aGlzLl9wU2NlbmUuZGlzcGF0Y2hFdmVudChuZXcgU2NlbmVFdmVudChTY2VuZUV2ZW50LkFEREVEX1RPX1NDRU5FLCB0aGlzKSk7XHJcblxyXG5cdFx0aWYgKHNjZW5lQ2hhbmdlZCkge1xyXG5cdFx0XHRpZiAoIXRoaXMuX3BTY2VuZVRyYW5zZm9ybURpcnR5ICYmICF0aGlzLl9wSWdub3JlVHJhbnNmb3JtKVxyXG5cdFx0XHRcdHRoaXMucEludmFsaWRhdGVTY2VuZVRyYW5zZm9ybSgpO1xyXG5cclxuXHRcdFx0aWYgKHRoaXMuX2xpc3RlblRvU2NlbmVDaGFuZ2VkKVxyXG5cdFx0XHRcdHRoaXMubm90aWZ5U2NlbmVDaGFuZ2UoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwcm90ZWN0ZWRcclxuXHQgKi9cclxuXHRwdWJsaWMgX3BVcGRhdGVJbXBsaWNpdFZpc2liaWxpdHkodmFsdWU6Ym9vbGVhbilcclxuXHR7XHJcblx0XHR0aGlzLl9wSW1wbGljaXRWaXNpYmlsaXR5ID0gdGhpcy5fZXhwbGljaXRWaXNpYmlsaXR5ICYmIHZhbHVlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHByb3RlY3RlZFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBfcFVwZGF0ZU1hdHJpeDNEKClcclxuXHR7XHJcblxyXG5cdFx0dGhpcy5fcG9zLnggPSB0aGlzLl94O1xyXG5cdFx0dGhpcy5fcG9zLnkgPSB0aGlzLl95O1xyXG5cdFx0dGhpcy5fcG9zLnogPSB0aGlzLl96O1xyXG5cclxuXHRcdHRoaXMuX3JvdC54ID0gdGhpcy5fcm90YXRpb25YO1xyXG5cdFx0dGhpcy5fcm90LnkgPSB0aGlzLl9yb3RhdGlvblk7XHJcblx0XHR0aGlzLl9yb3QueiA9IHRoaXMuX3JvdGF0aW9uWjtcclxuXHJcblx0XHR0aGlzLl9zY2EueCA9IHRoaXMuX3BTY2FsZVg7XHJcblx0XHR0aGlzLl9zY2EueSA9IHRoaXMuX3BTY2FsZVk7XHJcblx0XHR0aGlzLl9zY2EueiA9IHRoaXMuX3BTY2FsZVo7XHJcblxyXG5cdFx0dGhpcy5fbWF0cml4M0QucmVjb21wb3NlKHRoaXMuX3RyYW5zZm9ybUNvbXBvbmVudHMpO1xyXG5cclxuXHRcdGlmICghdGhpcy5fcGl2b3RaZXJvKSB7XHJcblx0XHRcdHRoaXMuX3Bpdm90U2NhbGUueCA9IHRoaXMuX3Bpdm90LngvdGhpcy5fcFNjYWxlWDtcclxuXHRcdFx0dGhpcy5fcGl2b3RTY2FsZS55ID0gdGhpcy5fcGl2b3QueS90aGlzLl9wU2NhbGVZO1xyXG5cdFx0XHR0aGlzLl9waXZvdFNjYWxlLnogPSB0aGlzLl9waXZvdC56L3RoaXMuX3BTY2FsZVo7XHJcblx0XHRcdHRoaXMuX21hdHJpeDNELnByZXBlbmRUcmFuc2xhdGlvbigtdGhpcy5fcGl2b3RTY2FsZS54LCAtdGhpcy5fcGl2b3RTY2FsZS55LCAtdGhpcy5fcGl2b3RTY2FsZS56KTtcclxuXHRcdFx0aWYgKHRoaXMuYWxpZ25tZW50TW9kZSAhPSBBbGlnbm1lbnRNb2RlLlBJVk9UX1BPSU5UKVxyXG5cdFx0XHRcdHRoaXMuX21hdHJpeDNELmFwcGVuZFRyYW5zbGF0aW9uKHRoaXMuX3Bpdm90LngsIHRoaXMuX3Bpdm90LnksIHRoaXMuX3Bpdm90LnopO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX21hdHJpeDNERGlydHkgPSBmYWxzZTtcclxuXHRcdHRoaXMuX3Bvc2l0aW9uRGlydHkgPSBmYWxzZTtcclxuXHRcdHRoaXMuX3JvdGF0aW9uRGlydHkgPSBmYWxzZTtcclxuXHRcdHRoaXMuX3NjYWxlRGlydHkgPSBmYWxzZTtcclxuXHRcdHRoaXMuX3Bpdm90RGlydHkgPSBmYWxzZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwcm90ZWN0ZWRcclxuXHQgKi9cclxuXHRwdWJsaWMgcFVwZGF0ZVNjZW5lVHJhbnNmb3JtKClcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fcFBhcmVudCAmJiAhdGhpcy5fcFBhcmVudC5faUlzUm9vdCkge1xyXG5cdFx0XHR0aGlzLl9wU2NlbmVUcmFuc2Zvcm0uY29weUZyb20odGhpcy5fcFBhcmVudC5zY2VuZVRyYW5zZm9ybSk7XHJcblx0XHRcdHRoaXMuX3BTY2VuZVRyYW5zZm9ybS5wcmVwZW5kKHRoaXMuX2lNYXRyaXgzRCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLl9wU2NlbmVUcmFuc2Zvcm0uY29weUZyb20odGhpcy5faU1hdHJpeDNEKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLl9wU2NlbmVUcmFuc2Zvcm1EaXJ0eSA9IGZhbHNlO1xyXG5cdH1cclxuXHJcblx0cHVibGljIF9pQWRkUmVuZGVyYWJsZShyZW5kZXJhYmxlOklSZW5kZXJhYmxlKTpJUmVuZGVyYWJsZVxyXG5cdHtcclxuXHRcdHRoaXMuX3BSZW5kZXJhYmxlcy5wdXNoKHJlbmRlcmFibGUpO1xyXG5cclxuXHRcdHJldHVybiByZW5kZXJhYmxlO1xyXG5cdH1cclxuXHJcblxyXG5cdHB1YmxpYyBfaVJlbW92ZVJlbmRlcmFibGUocmVuZGVyYWJsZTpJUmVuZGVyYWJsZSk6SVJlbmRlcmFibGVcclxuXHR7XHJcblx0XHR2YXIgaW5kZXg6bnVtYmVyID0gdGhpcy5fcFJlbmRlcmFibGVzLmluZGV4T2YocmVuZGVyYWJsZSk7XHJcblxyXG5cdFx0dGhpcy5fcFJlbmRlcmFibGVzLnNwbGljZShpbmRleCwgMSk7XHJcblxyXG5cdFx0cmV0dXJuIHJlbmRlcmFibGU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiAvL1RPRE9cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzaG9ydGVzdENvbGxpc2lvbkRpc3RhbmNlXHJcblx0ICogQHBhcmFtIGZpbmRDbG9zZXN0XHJcblx0ICogQHJldHVybnMge2Jvb2xlYW59XHJcblx0ICpcclxuXHQgKiBAaW50ZXJuYWxcclxuXHQgKi9cclxuXHRwdWJsaWMgX2lUZXN0Q29sbGlzaW9uKHNob3J0ZXN0Q29sbGlzaW9uRGlzdGFuY2U6bnVtYmVyLCBmaW5kQ2xvc2VzdDpib29sZWFuKTpib29sZWFuXHJcblx0e1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgX2lJbnRlcm5hbFVwZGF0ZSgpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX2lDb250cm9sbGVyKVxyXG5cdFx0XHR0aGlzLl9pQ29udHJvbGxlci51cGRhdGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBpbnRlcm5hbFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBfaUlzVmlzaWJsZSgpOmJvb2xlYW5cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcEltcGxpY2l0VmlzaWJpbGl0eTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBpbnRlcm5hbFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBfaUlzTW91c2VFbmFibGVkKCk6Ym9vbGVhblxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9wSW1wbGljaXRNb3VzZUVuYWJsZWQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAaW50ZXJuYWxcclxuXHQgKi9cclxuXHRwdWJsaWMgX2lTZXRTY2VuZSh2YWx1ZTpTY2VuZSlcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fcFNjZW5lID09IHZhbHVlKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fcFVwZGF0ZUltcGxpY2l0UGFydGl0aW9uKHRoaXMuX3BQYXJlbnQ/IHRoaXMuX3BQYXJlbnQuX2lBc3NpZ25lZFBhcnRpdGlvbiA6IG51bGwsIHZhbHVlKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBub3RpZnlQb3NpdGlvbkNoYW5nZWQoKVxyXG5cdHtcclxuXHRcdGlmICghdGhpcy5fcG9zaXRpb25DaGFuZ2VkKVxyXG5cdFx0XHR0aGlzLl9wb3NpdGlvbkNoYW5nZWQgPSBuZXcgRGlzcGxheU9iamVjdEV2ZW50KERpc3BsYXlPYmplY3RFdmVudC5QT1NJVElPTl9DSEFOR0VELCB0aGlzKTtcclxuXHJcblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQodGhpcy5fcG9zaXRpb25DaGFuZ2VkKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBub3RpZnlSb3RhdGlvbkNoYW5nZWQoKVxyXG5cdHtcclxuXHRcdGlmICghdGhpcy5fcm90YXRpb25DaGFuZ2VkKVxyXG5cdFx0XHR0aGlzLl9yb3RhdGlvbkNoYW5nZWQgPSBuZXcgRGlzcGxheU9iamVjdEV2ZW50KERpc3BsYXlPYmplY3RFdmVudC5ST1RBVElPTl9DSEFOR0VELCB0aGlzKTtcclxuXHJcblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQodGhpcy5fcm90YXRpb25DaGFuZ2VkKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBub3RpZnlTY2FsZUNoYW5nZWQoKVxyXG5cdHtcclxuXHRcdGlmICghdGhpcy5fc2NhbGVDaGFuZ2VkKVxyXG5cdFx0XHR0aGlzLl9zY2FsZUNoYW5nZWQgPSBuZXcgRGlzcGxheU9iamVjdEV2ZW50KERpc3BsYXlPYmplY3RFdmVudC5TQ0FMRV9DSEFOR0VELCB0aGlzKTtcclxuXHJcblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQodGhpcy5fc2NhbGVDaGFuZ2VkKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBub3RpZnlTY2VuZUNoYW5nZSgpXHJcblx0e1xyXG5cdFx0aWYgKCF0aGlzLl9zY2VuZWNoYW5nZWQpXHJcblx0XHRcdHRoaXMuX3NjZW5lY2hhbmdlZCA9IG5ldyBEaXNwbGF5T2JqZWN0RXZlbnQoRGlzcGxheU9iamVjdEV2ZW50LlNDRU5FX0NIQU5HRUQsIHRoaXMpO1xyXG5cclxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCh0aGlzLl9zY2VuZWNoYW5nZWQpO1xyXG59XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBub3RpZnlTY2VuZVRyYW5zZm9ybUNoYW5nZSgpXHJcblx0e1xyXG5cdFx0aWYgKCF0aGlzLl9zY2VuZVRyYW5zZm9ybUNoYW5nZWQpXHJcblx0XHRcdHRoaXMuX3NjZW5lVHJhbnNmb3JtQ2hhbmdlZCA9IG5ldyBEaXNwbGF5T2JqZWN0RXZlbnQoRGlzcGxheU9iamVjdEV2ZW50LlNDRU5FVFJBTlNGT1JNX0NIQU5HRUQsIHRoaXMpO1xyXG5cclxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCh0aGlzLl9zY2VuZVRyYW5zZm9ybUNoYW5nZWQpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSW52YWxpZGF0ZXMgdGhlIDNEIHRyYW5zZm9ybWF0aW9uIG1hdHJpeCwgY2F1c2luZyBpdCB0byBiZSB1cGRhdGVkIHVwb24gdGhlIG5leHQgcmVxdWVzdFxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIGludmFsaWRhdGVNYXRyaXgzRCgpOnZvaWRcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fbWF0cml4M0REaXJ0eSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX21hdHJpeDNERGlydHkgPSB0cnVlO1xyXG5cclxuXHRcdGlmICghdGhpcy5fcFNjZW5lVHJhbnNmb3JtRGlydHkgJiYgIXRoaXMuX3BJZ25vcmVUcmFuc2Zvcm0pXHJcblx0XHRcdHRoaXMucEludmFsaWRhdGVTY2VuZVRyYW5zZm9ybSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwdWJsaWMgaW52YWxpZGF0ZVBhcnRpdGlvbigpXHJcblx0e1xyXG5cdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9lbnRpdHlOb2Rlcy5sZW5ndGg7XHJcblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBsZW47IGkrKylcclxuXHRcdFx0dGhpcy5fZW50aXR5Tm9kZXNbaV0uaW52YWxpZGF0ZVBhcnRpdGlvbigpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIGludmFsaWRhdGVQaXZvdCgpXHJcblx0e1xyXG5cdFx0dGhpcy5fcGl2b3RaZXJvID0gKHRoaXMuX3Bpdm90LnggPT0gMCkgJiYgKHRoaXMuX3Bpdm90LnkgPT0gMCkgJiYgKHRoaXMuX3Bpdm90LnogPT0gMCk7XHJcblxyXG5cdFx0aWYgKHRoaXMuX3Bpdm90RGlydHkpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9waXZvdERpcnR5ID0gdHJ1ZTtcclxuXHJcblx0XHR0aGlzLmludmFsaWRhdGVNYXRyaXgzRCgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIGludmFsaWRhdGVQb3NpdGlvbigpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX3Bvc2l0aW9uRGlydHkpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9wb3NpdGlvbkRpcnR5ID0gdHJ1ZTtcclxuXHJcblx0XHR0aGlzLmludmFsaWRhdGVNYXRyaXgzRCgpO1xyXG5cclxuXHRcdGlmICh0aGlzLl9saXN0ZW5Ub1Bvc2l0aW9uQ2hhbmdlZClcclxuXHRcdFx0dGhpcy5ub3RpZnlQb3NpdGlvbkNoYW5nZWQoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBpbnZhbGlkYXRlUm90YXRpb24oKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9yb3RhdGlvbkRpcnR5KVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fcm90YXRpb25EaXJ0eSA9IHRydWU7XHJcblxyXG5cdFx0dGhpcy5pbnZhbGlkYXRlTWF0cml4M0QoKTtcclxuXHJcblx0XHRpZiAodGhpcy5fbGlzdGVuVG9Sb3RhdGlvbkNoYW5nZWQpXHJcblx0XHRcdHRoaXMubm90aWZ5Um90YXRpb25DaGFuZ2VkKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaW52YWxpZGF0ZVNjYWxlKClcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fc2NhbGVEaXJ0eSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX3NjYWxlRGlydHkgPSB0cnVlO1xyXG5cclxuXHRcdHRoaXMuaW52YWxpZGF0ZU1hdHJpeDNEKCk7XHJcblxyXG5cdFx0aWYgKHRoaXMuX2xpc3RlblRvU2NhbGVDaGFuZ2VkKVxyXG5cdFx0XHR0aGlzLm5vdGlmeVNjYWxlQ2hhbmdlZCgpO1xyXG5cdH1cclxuXHJcblxyXG5cdHB1YmxpYyBfaUFkZEVudGl0eU5vZGUoZW50aXR5Tm9kZTpFbnRpdHlOb2RlKTpFbnRpdHlOb2RlXHJcblx0e1xyXG5cdFx0dGhpcy5fZW50aXR5Tm9kZXMucHVzaChlbnRpdHlOb2RlKTtcclxuXHJcblx0XHRyZXR1cm4gZW50aXR5Tm9kZTtcclxuXHR9XHJcblxyXG5cclxuXHRwdWJsaWMgX2lSZW1vdmVFbnRpdHlOb2RlKGVudGl0eU5vZGU6RW50aXR5Tm9kZSk6RW50aXR5Tm9kZVxyXG5cdHtcclxuXHRcdHZhciBpbmRleDpudW1iZXIgPSB0aGlzLl9lbnRpdHlOb2Rlcy5pbmRleE9mKGVudGl0eU5vZGUpO1xyXG5cclxuXHRcdHRoaXMuX2VudGl0eU5vZGVzLnNwbGljZShpbmRleCwgMSk7XHJcblxyXG5cdFx0cmV0dXJuIGVudGl0eU5vZGU7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgX3BSZWdpc3RlckVudGl0eShwYXJ0aXRpb246UGFydGl0aW9uKVxyXG5cdHtcclxuXHRcdHRocm93IG5ldyBBYnN0cmFjdE1ldGhvZEVycm9yKCk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgX3BVbnJlZ2lzdGVyRW50aXR5KHBhcnRpdGlvbjpQYXJ0aXRpb24pXHJcblx0e1xyXG5cdFx0dGhyb3cgbmV3IEFic3RyYWN0TWV0aG9kRXJyb3IoKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBfcEludmFsaWRhdGVCb3VuZHMoKVxyXG5cdHtcclxuXHRcdHRoaXMuX2JveEJvdW5kc0ludmFsaWQgPSB0cnVlO1xyXG5cdFx0dGhpcy5fc3BoZXJlQm91bmRzSW52YWxpZCA9IHRydWU7XHJcblxyXG5cdFx0aWYgKHRoaXMuaXNFbnRpdHkpXHJcblx0XHRcdHRoaXMuaW52YWxpZGF0ZVBhcnRpdGlvbigpO1xyXG5cdH1cclxuXHRcclxuXHRwdWJsaWMgX3BVcGRhdGVCb3hCb3VuZHMoKVxyXG5cdHtcclxuXHRcdHRoaXMuX2JveEJvdW5kc0ludmFsaWQgPSBmYWxzZTtcclxuXHRcdFxyXG5cdFx0aWYgKHRoaXMuX3BCb3hCb3VuZHMgPT0gbnVsbClcclxuXHRcdFx0dGhpcy5fcEJveEJvdW5kcyA9IG5ldyBCb3goKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBfcFVwZGF0ZVNwaGVyZUJvdW5kcygpXHJcblx0e1xyXG5cdFx0dGhpcy5fc3BoZXJlQm91bmRzSW52YWxpZCA9IGZhbHNlO1xyXG5cclxuXHRcdGlmICh0aGlzLl9wU3BoZXJlQm91bmRzID09IG51bGwpXHJcblx0XHRcdHRoaXMuX3BTcGhlcmVCb3VuZHMgPSBuZXcgU3BoZXJlKCk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgPSBEaXNwbGF5T2JqZWN0OyJdfQ==