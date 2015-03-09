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
var NamedAssetBase = require("awayjs-core/lib/library/NamedAssetBase");
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
})(NamedAssetBase);
module.exports = DisplayObject;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0Rpc3BsYXlPYmplY3QudHMiXSwibmFtZXMiOlsiRGlzcGxheU9iamVjdCIsIkRpc3BsYXlPYmplY3QuY29uc3RydWN0b3IiLCJEaXNwbGF5T2JqZWN0LmJvdW5kc1R5cGUiLCJEaXNwbGF5T2JqZWN0LmRlcHRoIiwiRGlzcGxheU9iamVjdC5ldWxlcnMiLCJEaXNwbGF5T2JqZWN0LmhlaWdodCIsIkRpc3BsYXlPYmplY3QuaW5kZXgiLCJEaXNwbGF5T2JqZWN0LmludmVyc2VTY2VuZVRyYW5zZm9ybSIsIkRpc3BsYXlPYmplY3QuaWdub3JlVHJhbnNmb3JtIiwiRGlzcGxheU9iamVjdC5pc0VudGl0eSIsIkRpc3BsYXlPYmplY3QubG9hZGVySW5mbyIsIkRpc3BsYXlPYmplY3QubW91c2VFbmFibGVkIiwiRGlzcGxheU9iamVjdC5tb3VzZVgiLCJEaXNwbGF5T2JqZWN0Lm1vdXNlWSIsIkRpc3BsYXlPYmplY3QucGFyZW50IiwiRGlzcGxheU9iamVjdC5wYXJ0aXRpb24iLCJEaXNwbGF5T2JqZWN0LnBpY2tpbmdDb2xsaWRlciIsIkRpc3BsYXlPYmplY3QucGl2b3QiLCJEaXNwbGF5T2JqZWN0LnJvb3QiLCJEaXNwbGF5T2JqZWN0LnJvdGF0aW9uWCIsIkRpc3BsYXlPYmplY3Qucm90YXRpb25ZIiwiRGlzcGxheU9iamVjdC5yb3RhdGlvbloiLCJEaXNwbGF5T2JqZWN0LnNjYWxlWCIsIkRpc3BsYXlPYmplY3Quc2NhbGVZIiwiRGlzcGxheU9iamVjdC5zY2FsZVoiLCJEaXNwbGF5T2JqZWN0LnNjZW5lIiwiRGlzcGxheU9iamVjdC5zY2VuZVBvc2l0aW9uIiwiRGlzcGxheU9iamVjdC5zY2VuZVRyYW5zZm9ybSIsIkRpc3BsYXlPYmplY3Quc2hhZGVyUGlja2luZ0RldGFpbHMiLCJEaXNwbGF5T2JqZWN0LmRlYnVnVmlzaWJsZSIsIkRpc3BsYXlPYmplY3QudHJhbnNmb3JtIiwiRGlzcGxheU9iamVjdC52aXNpYmxlIiwiRGlzcGxheU9iamVjdC53aWR0aCIsIkRpc3BsYXlPYmplY3QueCIsIkRpc3BsYXlPYmplY3QueSIsIkRpc3BsYXlPYmplY3QueiIsIkRpc3BsYXlPYmplY3Quek9mZnNldCIsIkRpc3BsYXlPYmplY3QuYWRkRXZlbnRMaXN0ZW5lciIsIkRpc3BsYXlPYmplY3QuY2xvbmUiLCJEaXNwbGF5T2JqZWN0LmRpc3Bvc2UiLCJEaXNwbGF5T2JqZWN0LmRpc3Bvc2VBc3NldCIsIkRpc3BsYXlPYmplY3QuZ2V0Qm91bmRzIiwiRGlzcGxheU9iamVjdC5nZXRSZWN0IiwiRGlzcGxheU9iamVjdC5nZXRCb3giLCJEaXNwbGF5T2JqZWN0LmdldFNwaGVyZSIsIkRpc3BsYXlPYmplY3QuZ2xvYmFsVG9Mb2NhbCIsIkRpc3BsYXlPYmplY3QuZ2xvYmFsVG9Mb2NhbDNEIiwiRGlzcGxheU9iamVjdC5oaXRUZXN0T2JqZWN0IiwiRGlzcGxheU9iamVjdC5oaXRUZXN0UG9pbnQiLCJEaXNwbGF5T2JqZWN0Lmxvb2tBdCIsIkRpc3BsYXlPYmplY3QubG9jYWxUb0dsb2JhbCIsIkRpc3BsYXlPYmplY3QubG9jYWxUb0dsb2JhbDNEIiwiRGlzcGxheU9iamVjdC5tb3ZlVG8iLCJEaXNwbGF5T2JqZWN0Lm1vdmVQaXZvdCIsIkRpc3BsYXlPYmplY3QucGl0Y2giLCJEaXNwbGF5T2JqZWN0LmdldFJlbmRlclNjZW5lVHJhbnNmb3JtIiwiRGlzcGxheU9iamVjdC5yb2xsIiwiRGlzcGxheU9iamVjdC5yb3RhdGUiLCJEaXNwbGF5T2JqZWN0LnJvdGF0ZVRvIiwiRGlzcGxheU9iamVjdC5yZW1vdmVFdmVudExpc3RlbmVyIiwiRGlzcGxheU9iamVjdC50cmFuc2xhdGUiLCJEaXNwbGF5T2JqZWN0LnRyYW5zbGF0ZUxvY2FsIiwiRGlzcGxheU9iamVjdC55YXciLCJEaXNwbGF5T2JqZWN0Ll9pQXNzaWduZWRQYXJ0aXRpb24iLCJEaXNwbGF5T2JqZWN0Ll9pTWF0cml4M0QiLCJEaXNwbGF5T2JqZWN0Ll9pUGlja2luZ0NvbGxpc2lvblZPIiwiRGlzcGxheU9iamVjdC5pU2V0UGFyZW50IiwiRGlzcGxheU9iamVjdC5wSW52YWxpZGF0ZVNjZW5lVHJhbnNmb3JtIiwiRGlzcGxheU9iamVjdC5fcFVwZGF0ZUltcGxpY2l0TW91c2VFbmFibGVkIiwiRGlzcGxheU9iamVjdC5fcFVwZGF0ZUltcGxpY2l0UGFydGl0aW9uIiwiRGlzcGxheU9iamVjdC5fcFVwZGF0ZUltcGxpY2l0VmlzaWJpbGl0eSIsIkRpc3BsYXlPYmplY3QuX3BVcGRhdGVNYXRyaXgzRCIsIkRpc3BsYXlPYmplY3QucFVwZGF0ZVNjZW5lVHJhbnNmb3JtIiwiRGlzcGxheU9iamVjdC5faUFkZFJlbmRlcmFibGUiLCJEaXNwbGF5T2JqZWN0Ll9pUmVtb3ZlUmVuZGVyYWJsZSIsIkRpc3BsYXlPYmplY3QuX2lUZXN0Q29sbGlzaW9uIiwiRGlzcGxheU9iamVjdC5faUludGVybmFsVXBkYXRlIiwiRGlzcGxheU9iamVjdC5faUlzVmlzaWJsZSIsIkRpc3BsYXlPYmplY3QuX2lJc01vdXNlRW5hYmxlZCIsIkRpc3BsYXlPYmplY3QuX2lTZXRTY2VuZSIsIkRpc3BsYXlPYmplY3Qubm90aWZ5UG9zaXRpb25DaGFuZ2VkIiwiRGlzcGxheU9iamVjdC5ub3RpZnlSb3RhdGlvbkNoYW5nZWQiLCJEaXNwbGF5T2JqZWN0Lm5vdGlmeVNjYWxlQ2hhbmdlZCIsIkRpc3BsYXlPYmplY3Qubm90aWZ5U2NlbmVDaGFuZ2UiLCJEaXNwbGF5T2JqZWN0Lm5vdGlmeVNjZW5lVHJhbnNmb3JtQ2hhbmdlIiwiRGlzcGxheU9iamVjdC5pbnZhbGlkYXRlTWF0cml4M0QiLCJEaXNwbGF5T2JqZWN0LmludmFsaWRhdGVQYXJ0aXRpb24iLCJEaXNwbGF5T2JqZWN0LmludmFsaWRhdGVQaXZvdCIsIkRpc3BsYXlPYmplY3QuaW52YWxpZGF0ZVBvc2l0aW9uIiwiRGlzcGxheU9iamVjdC5pbnZhbGlkYXRlUm90YXRpb24iLCJEaXNwbGF5T2JqZWN0LmludmFsaWRhdGVTY2FsZSIsIkRpc3BsYXlPYmplY3QuX2lBZGRFbnRpdHlOb2RlIiwiRGlzcGxheU9iamVjdC5faVJlbW92ZUVudGl0eU5vZGUiLCJEaXNwbGF5T2JqZWN0Ll9wUmVnaXN0ZXJFbnRpdHkiLCJEaXNwbGF5T2JqZWN0Ll9wVW5yZWdpc3RlckVudGl0eSIsIkRpc3BsYXlPYmplY3QuX3BJbnZhbGlkYXRlQm91bmRzIiwiRGlzcGxheU9iamVjdC5fcFVwZGF0ZUJveEJvdW5kcyIsIkRpc3BsYXlPYmplY3QuX3BVcGRhdGVTcGhlcmVCb3VuZHMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLElBQU8sR0FBRyxXQUFpQiwwQkFBMEIsQ0FBQyxDQUFDO0FBQ3ZELElBQU8sTUFBTSxXQUFnQiw2QkFBNkIsQ0FBQyxDQUFDO0FBQzVELElBQU8sVUFBVSxXQUFlLGlDQUFpQyxDQUFDLENBQUM7QUFDbkUsSUFBTyxRQUFRLFdBQWdCLCtCQUErQixDQUFDLENBQUM7QUFDaEUsSUFBTyxhQUFhLFdBQWMsb0NBQW9DLENBQUMsQ0FBQztBQUN4RSxJQUFPLEtBQUssV0FBZ0IsNEJBQTRCLENBQUMsQ0FBQztBQUUxRCxJQUFPLFFBQVEsV0FBZ0IsK0JBQStCLENBQUMsQ0FBQztBQUNoRSxJQUFPLGNBQWMsV0FBYyx3Q0FBd0MsQ0FBQyxDQUFDO0FBQzdFLElBQU8sbUJBQW1CLFdBQWEsNENBQTRDLENBQUMsQ0FBQztBQUtyRixJQUFPLGFBQWEsV0FBYyx1Q0FBdUMsQ0FBQyxDQUFDO0FBRTNFLElBQU8sZUFBZSxXQUFjLHlDQUF5QyxDQUFDLENBQUM7QUFFL0UsSUFBTyxTQUFTLFdBQWUsbUNBQW1DLENBQUMsQ0FBQztBQUlwRSxJQUFPLGtCQUFrQixXQUFhLDRDQUE0QyxDQUFDLENBQUM7QUFHcEYsSUFBTyxrQkFBa0IsV0FBYSw4Q0FBOEMsQ0FBQyxDQUFDO0FBQ3RGLElBQU8sVUFBVSxXQUFlLHNDQUFzQyxDQUFDLENBQUM7QUFHeEUsQUFpSUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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QVNBLEVBQUVBLENBQUNBO1FBRXBCQSxLQUFLQSxHQUFHQSxNQUFNQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQTtRQUNsREEsS0FBS0EsQ0FBQ0EsU0FBU0EsRUFBRUEsQ0FBQ0E7UUFFbEJBLEtBQUtBLEdBQUdBLE1BQU1BLENBQUNBLFlBQVlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO1FBQ25DQSxLQUFLQSxDQUFDQSxTQUFTQSxFQUFFQSxDQUFDQTtRQUVsQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDekJBLEtBQUtBLENBQUNBLENBQUNBLEdBQUdBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBO1lBQ25CQSxLQUFLQSxDQUFDQSxDQUFDQSxHQUFHQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNuQkEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDWkEsS0FBS0EsQ0FBQ0EsU0FBU0EsRUFBRUEsQ0FBQ0E7UUFDbkJBLENBQUNBO1FBRURBLEtBQUtBLEdBQUdBLEtBQUtBLENBQUNBLFlBQVlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO1FBRWxDQSxHQUFHQSxHQUFHQSxhQUFhQSxDQUFDQSxrQkFBa0JBLENBQUNBO1FBRXZDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNqQkEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDakJBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBO1FBQ2pCQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtRQUVYQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQSxDQUFD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QUFDQTtRQUM1QkEsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7UUFDNUJBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBO1FBRTVCQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxvQkFBb0JBLENBQUNBLENBQUNBO1FBRXBEQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUN0QkEsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7WUFDakRBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBO1lBQ2pEQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQTtZQUNqREEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNqR0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsSUFBSUEsYUFBYUEsQ0FBQ0EsV0FBV0EsQ0FBQ0E7Z0JBQ25EQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxpQkFBaUJBLENBQUNBLElBQUlBLENBQUNBLE1B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ImJhc2UvRGlzcGxheU9iamVjdC5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmxlbmRNb2RlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9kYXRhL0JsZW5kTW9kZVwiKTtcclxuaW1wb3J0IEJveFx0XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vQm94XCIpO1xyXG5pbXBvcnQgU3BoZXJlXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vU3BoZXJlXCIpO1xyXG5pbXBvcnQgTWF0aENvbnN0c1x0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9NYXRoQ29uc3RzXCIpO1xyXG5pbXBvcnQgTWF0cml4M0RcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9NYXRyaXgzRFwiKTtcclxuaW1wb3J0IE1hdHJpeDNEVXRpbHNcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL01hdHJpeDNEVXRpbHNcIik7XHJcbmltcG9ydCBQb2ludFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1BvaW50XCIpO1xyXG5pbXBvcnQgUmVjdGFuZ2xlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1JlY3RhbmdsZVwiKTtcclxuaW1wb3J0IFZlY3RvcjNEXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vVmVjdG9yM0RcIik7XHJcbmltcG9ydCBOYW1lZEFzc2V0QmFzZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvTmFtZWRBc3NldEJhc2VcIik7XHJcbmltcG9ydCBBYnN0cmFjdE1ldGhvZEVycm9yXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2Vycm9ycy9BYnN0cmFjdE1ldGhvZEVycm9yXCIpO1xyXG5cclxuaW1wb3J0IERpc3BsYXlPYmplY3RDb250YWluZXJcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2NvbnRhaW5lcnMvRGlzcGxheU9iamVjdENvbnRhaW5lclwiKTtcclxuaW1wb3J0IFNjZW5lXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2NvbnRhaW5lcnMvU2NlbmVcIik7XHJcbmltcG9ydCBDb250cm9sbGVyQmFzZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2NvbnRyb2xsZXJzL0NvbnRyb2xsZXJCYXNlXCIpO1xyXG5pbXBvcnQgQWxpZ25tZW50TW9kZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvQWxpZ25tZW50TW9kZVwiKTtcclxuaW1wb3J0IExvYWRlckluZm9cdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvTG9hZGVySW5mb1wiKTtcclxuaW1wb3J0IE9yaWVudGF0aW9uTW9kZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvT3JpZW50YXRpb25Nb2RlXCIpO1xyXG5pbXBvcnQgSUJpdG1hcERyYXdhYmxlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9JQml0bWFwRHJhd2FibGVcIik7XHJcbmltcG9ydCBUcmFuc2Zvcm1cdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvVHJhbnNmb3JtXCIpO1xyXG5pbXBvcnQgRW50aXR5Tm9kZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcGFydGl0aW9uL0VudGl0eU5vZGVcIik7XHJcbmltcG9ydCBQYXJ0aXRpb25cdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3BhcnRpdGlvbi9QYXJ0aXRpb25cIik7XHJcbmltcG9ydCBJUGlja2luZ0NvbGxpZGVyXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcGljay9JUGlja2luZ0NvbGxpZGVyXCIpO1xyXG5pbXBvcnQgUGlja2luZ0NvbGxpc2lvblZPXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3BpY2svUGlja2luZ0NvbGxpc2lvblZPXCIpO1xyXG5pbXBvcnQgSVJlbmRlcmFibGVcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3Bvb2wvSVJlbmRlcmFibGVcIik7XHJcbmltcG9ydCBDYW1lcmFcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZW50aXRpZXMvQ2FtZXJhXCIpO1xyXG5pbXBvcnQgRGlzcGxheU9iamVjdEV2ZW50XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2V2ZW50cy9EaXNwbGF5T2JqZWN0RXZlbnRcIik7XHJcbmltcG9ydCBTY2VuZUV2ZW50XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9ldmVudHMvU2NlbmVFdmVudFwiKTtcclxuaW1wb3J0IFByZWZhYkJhc2VcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3ByZWZhYnMvUHJlZmFiQmFzZVwiKTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgRGlzcGxheU9iamVjdCBjbGFzcyBpcyB0aGUgYmFzZSBjbGFzcyBmb3IgYWxsIG9iamVjdHMgdGhhdCBjYW4gYmVcclxuICogcGxhY2VkIG9uIHRoZSBkaXNwbGF5IGxpc3QuIFRoZSBkaXNwbGF5IGxpc3QgbWFuYWdlcyBhbGwgb2JqZWN0cyBkaXNwbGF5ZWRcclxuICogaW4gZmxhc2guIFVzZSB0aGUgRGlzcGxheU9iamVjdENvbnRhaW5lciBjbGFzcyB0byBhcnJhbmdlIHRoZVxyXG4gKiBkaXNwbGF5IG9iamVjdHMgaW4gdGhlIGRpc3BsYXkgbGlzdC4gRGlzcGxheU9iamVjdENvbnRhaW5lciBvYmplY3RzIGNhblxyXG4gKiBoYXZlIGNoaWxkIGRpc3BsYXkgb2JqZWN0cywgd2hpbGUgb3RoZXIgZGlzcGxheSBvYmplY3RzLCBzdWNoIGFzIFNoYXBlIGFuZFxyXG4gKiBUZXh0RmllbGQgb2JqZWN0cywgYXJlIFwibGVhZlwiIG5vZGVzIHRoYXQgaGF2ZSBvbmx5IHBhcmVudHMgYW5kIHNpYmxpbmdzLCBub1xyXG4gKiBjaGlsZHJlbi5cclxuICpcclxuICogPHA+VGhlIERpc3BsYXlPYmplY3QgY2xhc3Mgc3VwcG9ydHMgYmFzaWMgZnVuY3Rpb25hbGl0eSBsaWtlIHRoZSA8aT54PC9pPlxyXG4gKiBhbmQgPGk+eTwvaT4gcG9zaXRpb24gb2YgYW4gb2JqZWN0LCBhcyB3ZWxsIGFzIG1vcmUgYWR2YW5jZWQgcHJvcGVydGllcyBvZlxyXG4gKiB0aGUgb2JqZWN0IHN1Y2ggYXMgaXRzIHRyYW5zZm9ybWF0aW9uIG1hdHJpeC4gPC9wPlxyXG4gKlxyXG4gKiA8cD5EaXNwbGF5T2JqZWN0IGlzIGFuIGFic3RyYWN0IGJhc2UgY2xhc3M7IHRoZXJlZm9yZSwgeW91IGNhbm5vdCBjYWxsXHJcbiAqIERpc3BsYXlPYmplY3QgZGlyZWN0bHkuIEludm9raW5nIDxjb2RlPm5ldyBEaXNwbGF5T2JqZWN0KCk8L2NvZGU+IHRocm93cyBhblxyXG4gKiA8Y29kZT5Bcmd1bWVudEVycm9yPC9jb2RlPiBleGNlcHRpb24uIDwvcD5cclxuICpcclxuICogPHA+QWxsIGRpc3BsYXkgb2JqZWN0cyBpbmhlcml0IGZyb20gdGhlIERpc3BsYXlPYmplY3QgY2xhc3MuPC9wPlxyXG4gKlxyXG4gKiA8cD5UaGUgRGlzcGxheU9iamVjdCBjbGFzcyBpdHNlbGYgZG9lcyBub3QgaW5jbHVkZSBhbnkgQVBJcyBmb3IgcmVuZGVyaW5nXHJcbiAqIGNvbnRlbnQgb25zY3JlZW4uIEZvciB0aGF0IHJlYXNvbiwgaWYgeW91IHdhbnQgY3JlYXRlIGEgY3VzdG9tIHN1YmNsYXNzIG9mXHJcbiAqIHRoZSBEaXNwbGF5T2JqZWN0IGNsYXNzLCB5b3Ugd2lsbCB3YW50IHRvIGV4dGVuZCBvbmUgb2YgaXRzIHN1YmNsYXNzZXMgdGhhdFxyXG4gKiBkbyBoYXZlIEFQSXMgZm9yIHJlbmRlcmluZyBjb250ZW50IG9uc2NyZWVuLCBzdWNoIGFzIHRoZSBTaGFwZSwgU3ByaXRlLFxyXG4gKiBCaXRtYXAsIFNpbXBsZUJ1dHRvbiwgVGV4dEZpZWxkLCBvciBNb3ZpZUNsaXAgY2xhc3MuPC9wPlxyXG4gKlxyXG4gKiA8cD5UaGUgRGlzcGxheU9iamVjdCBjbGFzcyBjb250YWlucyBzZXZlcmFsIGJyb2FkY2FzdCBldmVudHMuIE5vcm1hbGx5LCB0aGVcclxuICogdGFyZ2V0IG9mIGFueSBwYXJ0aWN1bGFyIGV2ZW50IGlzIGEgc3BlY2lmaWMgRGlzcGxheU9iamVjdCBpbnN0YW5jZS4gRm9yXHJcbiAqIGV4YW1wbGUsIHRoZSB0YXJnZXQgb2YgYW4gPGNvZGU+YWRkZWQ8L2NvZGU+IGV2ZW50IGlzIHRoZSBzcGVjaWZpY1xyXG4gKiBEaXNwbGF5T2JqZWN0IGluc3RhbmNlIHRoYXQgd2FzIGFkZGVkIHRvIHRoZSBkaXNwbGF5IGxpc3QuIEhhdmluZyBhIHNpbmdsZVxyXG4gKiB0YXJnZXQgcmVzdHJpY3RzIHRoZSBwbGFjZW1lbnQgb2YgZXZlbnQgbGlzdGVuZXJzIHRvIHRoYXQgdGFyZ2V0IGFuZCBpblxyXG4gKiBzb21lIGNhc2VzIHRoZSB0YXJnZXQncyBhbmNlc3RvcnMgb24gdGhlIGRpc3BsYXkgbGlzdC4gV2l0aCBicm9hZGNhc3RcclxuICogZXZlbnRzLCBob3dldmVyLCB0aGUgdGFyZ2V0IGlzIG5vdCBhIHNwZWNpZmljIERpc3BsYXlPYmplY3QgaW5zdGFuY2UsIGJ1dFxyXG4gKiByYXRoZXIgYWxsIERpc3BsYXlPYmplY3QgaW5zdGFuY2VzLCBpbmNsdWRpbmcgdGhvc2UgdGhhdCBhcmUgbm90IG9uIHRoZVxyXG4gKiBkaXNwbGF5IGxpc3QuIFRoaXMgbWVhbnMgdGhhdCB5b3UgY2FuIGFkZCBhIGxpc3RlbmVyIHRvIGFueSBEaXNwbGF5T2JqZWN0XHJcbiAqIGluc3RhbmNlIHRvIGxpc3RlbiBmb3IgYnJvYWRjYXN0IGV2ZW50cy4gSW4gYWRkaXRpb24gdG8gdGhlIGJyb2FkY2FzdFxyXG4gKiBldmVudHMgbGlzdGVkIGluIHRoZSBEaXNwbGF5T2JqZWN0IGNsYXNzJ3MgRXZlbnRzIHRhYmxlLCB0aGUgRGlzcGxheU9iamVjdFxyXG4gKiBjbGFzcyBhbHNvIGluaGVyaXRzIHR3byBicm9hZGNhc3QgZXZlbnRzIGZyb20gdGhlIEV2ZW50RGlzcGF0Y2hlciBjbGFzczpcclxuICogPGNvZGU+YWN0aXZhdGU8L2NvZGU+IGFuZCA8Y29kZT5kZWFjdGl2YXRlPC9jb2RlPi48L3A+XHJcbiAqXHJcbiAqIDxwPlNvbWUgcHJvcGVydGllcyBwcmV2aW91c2x5IHVzZWQgaW4gdGhlIEFjdGlvblNjcmlwdCAxLjAgYW5kIDIuMFxyXG4gKiBNb3ZpZUNsaXAsIFRleHRGaWVsZCwgYW5kIEJ1dHRvbiBjbGFzc2VzKHN1Y2ggYXMgPGNvZGU+X2FscGhhPC9jb2RlPixcclxuICogPGNvZGU+X2hlaWdodDwvY29kZT4sIDxjb2RlPl9uYW1lPC9jb2RlPiwgPGNvZGU+X3dpZHRoPC9jb2RlPixcclxuICogPGNvZGU+X3g8L2NvZGU+LCA8Y29kZT5feTwvY29kZT4sIGFuZCBvdGhlcnMpIGhhdmUgZXF1aXZhbGVudHMgaW4gdGhlXHJcbiAqIEFjdGlvblNjcmlwdCAzLjAgRGlzcGxheU9iamVjdCBjbGFzcyB0aGF0IGFyZSByZW5hbWVkIHNvIHRoYXQgdGhleSBub1xyXG4gKiBsb25nZXIgYmVnaW4gd2l0aCB0aGUgdW5kZXJzY29yZShfKSBjaGFyYWN0ZXIuPC9wPlxyXG4gKlxyXG4gKiA8cD5Gb3IgbW9yZSBpbmZvcm1hdGlvbiwgc2VlIHRoZSBcIkRpc3BsYXkgUHJvZ3JhbW1pbmdcIiBjaGFwdGVyIG9mIHRoZVxyXG4gKiA8aT5BY3Rpb25TY3JpcHQgMy4wIERldmVsb3BlcidzIEd1aWRlPC9pPi48L3A+XHJcbiAqIFxyXG4gKiBAZXZlbnQgYWRkZWQgICAgICAgICAgICBEaXNwYXRjaGVkIHdoZW4gYSBkaXNwbGF5IG9iamVjdCBpcyBhZGRlZCB0byB0aGVcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheSBsaXN0LiBUaGUgZm9sbG93aW5nIG1ldGhvZHMgdHJpZ2dlciB0aGlzXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50OlxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLmFkZENoaWxkKCk8L2NvZGU+LFxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLmFkZENoaWxkQXQoKTwvY29kZT4uXHJcbiAqIEBldmVudCBhZGRlZFRvU2NlbmUgICAgIERpc3BhdGNoZWQgd2hlbiBhIGRpc3BsYXkgb2JqZWN0IGlzIGFkZGVkIHRvIHRoZSBvblxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBzY2VuZSBkaXNwbGF5IGxpc3QsIGVpdGhlciBkaXJlY3RseSBvciB0aHJvdWdoIHRoZVxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBhZGRpdGlvbiBvZiBhIHN1YiB0cmVlIGluIHdoaWNoIHRoZSBkaXNwbGF5IG9iamVjdFxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBpcyBjb250YWluZWQuIFRoZSBmb2xsb3dpbmcgbWV0aG9kcyB0cmlnZ2VyIHRoaXNcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQ6XHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPkRpc3BsYXlPYmplY3RDb250YWluZXIuYWRkQ2hpbGQoKTwvY29kZT4sXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPkRpc3BsYXlPYmplY3RDb250YWluZXIuYWRkQ2hpbGRBdCgpPC9jb2RlPi5cclxuICogQGV2ZW50IGVudGVyRnJhbWUgICAgICAgW2Jyb2FkY2FzdCBldmVudF0gRGlzcGF0Y2hlZCB3aGVuIHRoZSBwbGF5aGVhZCBpc1xyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBlbnRlcmluZyBhIG5ldyBmcmFtZS4gSWYgdGhlIHBsYXloZWFkIGlzIG5vdFxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBtb3ZpbmcsIG9yIGlmIHRoZXJlIGlzIG9ubHkgb25lIGZyYW1lLCB0aGlzIGV2ZW50XHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGlzIGRpc3BhdGNoZWQgY29udGludW91c2x5IGluIGNvbmp1bmN0aW9uIHdpdGggdGhlXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGZyYW1lIHJhdGUuIFRoaXMgZXZlbnQgaXMgYSBicm9hZGNhc3QgZXZlbnQsIHdoaWNoXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIG1lYW5zIHRoYXQgaXQgaXMgZGlzcGF0Y2hlZCBieSBhbGwgZGlzcGxheSBvYmplY3RzXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIHdpdGggYSBsaXN0ZW5lciByZWdpc3RlcmVkIGZvciB0aGlzIGV2ZW50LlxyXG4gKiBAZXZlbnQgZXhpdEZyYW1lICAgICAgICBbYnJvYWRjYXN0IGV2ZW50XSBEaXNwYXRjaGVkIHdoZW4gdGhlIHBsYXloZWFkIGlzXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGV4aXRpbmcgdGhlIGN1cnJlbnQgZnJhbWUuIEFsbCBmcmFtZSBzY3JpcHRzIGhhdmVcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgYmVlbiBydW4uIElmIHRoZSBwbGF5aGVhZCBpcyBub3QgbW92aW5nLCBvciBpZlxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICB0aGVyZSBpcyBvbmx5IG9uZSBmcmFtZSwgdGhpcyBldmVudCBpcyBkaXNwYXRjaGVkXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVvdXNseSBpbiBjb25qdW5jdGlvbiB3aXRoIHRoZSBmcmFtZSByYXRlLlxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBUaGlzIGV2ZW50IGlzIGEgYnJvYWRjYXN0IGV2ZW50LCB3aGljaCBtZWFucyB0aGF0XHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGl0IGlzIGRpc3BhdGNoZWQgYnkgYWxsIGRpc3BsYXkgb2JqZWN0cyB3aXRoIGFcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXIgcmVnaXN0ZXJlZCBmb3IgdGhpcyBldmVudC5cclxuICogQGV2ZW50IGZyYW1lQ29uc3RydWN0ZWQgW2Jyb2FkY2FzdCBldmVudF0gRGlzcGF0Y2hlZCBhZnRlciB0aGUgY29uc3RydWN0b3JzXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIG9mIGZyYW1lIGRpc3BsYXkgb2JqZWN0cyBoYXZlIHJ1biBidXQgYmVmb3JlIGZyYW1lXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIHNjcmlwdHMgaGF2ZSBydW4uIElmIHRoZSBwbGF5aGVhZCBpcyBub3QgbW92aW5nLCBvclxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBpZiB0aGVyZSBpcyBvbmx5IG9uZSBmcmFtZSwgdGhpcyBldmVudCBpc1xyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaGVkIGNvbnRpbnVvdXNseSBpbiBjb25qdW5jdGlvbiB3aXRoIHRoZVxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBmcmFtZSByYXRlLiBUaGlzIGV2ZW50IGlzIGEgYnJvYWRjYXN0IGV2ZW50LCB3aGljaFxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBtZWFucyB0aGF0IGl0IGlzIGRpc3BhdGNoZWQgYnkgYWxsIGRpc3BsYXkgb2JqZWN0c1xyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICB3aXRoIGEgbGlzdGVuZXIgcmVnaXN0ZXJlZCBmb3IgdGhpcyBldmVudC5cclxuICogQGV2ZW50IHJlbW92ZWQgICAgICAgICAgRGlzcGF0Y2hlZCB3aGVuIGEgZGlzcGxheSBvYmplY3QgaXMgYWJvdXQgdG8gYmVcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlZCBmcm9tIHRoZSBkaXNwbGF5IGxpc3QuIFR3byBtZXRob2RzIG9mIHRoZVxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIGNsYXNzIGdlbmVyYXRlIHRoaXMgZXZlbnQ6XHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPnJlbW92ZUNoaWxkKCk8L2NvZGU+IGFuZFxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5yZW1vdmVDaGlsZEF0KCk8L2NvZGU+LlxyXG4gKlxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICA8cD5UaGUgZm9sbG93aW5nIG1ldGhvZHMgb2YgYVxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIG9iamVjdCBhbHNvIGdlbmVyYXRlIHRoaXNcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQgaWYgYW4gb2JqZWN0IG11c3QgYmUgcmVtb3ZlZCB0byBtYWtlIHJvb20gZm9yXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIHRoZSBuZXcgb2JqZWN0OiA8Y29kZT5hZGRDaGlsZCgpPC9jb2RlPixcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+YWRkQ2hpbGRBdCgpPC9jb2RlPiwgYW5kXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPnNldENoaWxkSW5kZXgoKTwvY29kZT4uIDwvcD5cclxuICogQGV2ZW50IHJlbW92ZWRGcm9tU2NlbmUgRGlzcGF0Y2hlZCB3aGVuIGEgZGlzcGxheSBvYmplY3QgaXMgYWJvdXQgdG8gYmVcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlZCBmcm9tIHRoZSBkaXNwbGF5IGxpc3QsIGVpdGhlciBkaXJlY3RseSBvclxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdWdoIHRoZSByZW1vdmFsIG9mIGEgc3ViIHRyZWUgaW4gd2hpY2ggdGhlXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXkgb2JqZWN0IGlzIGNvbnRhaW5lZC4gVHdvIG1ldGhvZHMgb2YgdGhlXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIERpc3BsYXlPYmplY3RDb250YWluZXIgY2xhc3MgZ2VuZXJhdGUgdGhpcyBldmVudDpcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+cmVtb3ZlQ2hpbGQoKTwvY29kZT4gYW5kXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPnJlbW92ZUNoaWxkQXQoKTwvY29kZT4uXHJcbiAqXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxwPlRoZSBmb2xsb3dpbmcgbWV0aG9kcyBvZiBhXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIERpc3BsYXlPYmplY3RDb250YWluZXIgb2JqZWN0IGFsc28gZ2VuZXJhdGUgdGhpc1xyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBldmVudCBpZiBhbiBvYmplY3QgbXVzdCBiZSByZW1vdmVkIHRvIG1ha2Ugcm9vbSBmb3JcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgdGhlIG5ldyBvYmplY3Q6IDxjb2RlPmFkZENoaWxkKCk8L2NvZGU+LFxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5hZGRDaGlsZEF0KCk8L2NvZGU+LCBhbmRcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+c2V0Q2hpbGRJbmRleCgpPC9jb2RlPi4gPC9wPlxyXG4gKiBAZXZlbnQgcmVuZGVyICAgICAgICAgICBbYnJvYWRjYXN0IGV2ZW50XSBEaXNwYXRjaGVkIHdoZW4gdGhlIGRpc3BsYXkgbGlzdFxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBpcyBhYm91dCB0byBiZSB1cGRhdGVkIGFuZCByZW5kZXJlZC4gVGhpcyBldmVudFxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlcyB0aGUgbGFzdCBvcHBvcnR1bml0eSBmb3Igb2JqZWN0cyBsaXN0ZW5pbmdcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgZm9yIHRoaXMgZXZlbnQgdG8gbWFrZSBjaGFuZ2VzIGJlZm9yZSB0aGUgZGlzcGxheVxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBsaXN0IGlzIHJlbmRlcmVkLiBZb3UgbXVzdCBjYWxsIHRoZVxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5pbnZhbGlkYXRlKCk8L2NvZGU+IG1ldGhvZCBvZiB0aGUgU2NlbmVcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0IGVhY2ggdGltZSB5b3Ugd2FudCBhIDxjb2RlPnJlbmRlcjwvY29kZT5cclxuICogICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQgdG8gYmUgZGlzcGF0Y2hlZC4gPGNvZGU+UmVuZGVyPC9jb2RlPiBldmVudHNcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgYXJlIGRpc3BhdGNoZWQgdG8gYW4gb2JqZWN0IG9ubHkgaWYgdGhlcmUgaXMgbXV0dWFsXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIHRydXN0IGJldHdlZW4gaXQgYW5kIHRoZSBvYmplY3QgdGhhdCBjYWxsZWRcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+U2NlbmUuaW52YWxpZGF0ZSgpPC9jb2RlPi4gVGhpcyBldmVudCBpcyBhXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGJyb2FkY2FzdCBldmVudCwgd2hpY2ggbWVhbnMgdGhhdCBpdCBpcyBkaXNwYXRjaGVkXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGJ5IGFsbCBkaXNwbGF5IG9iamVjdHMgd2l0aCBhIGxpc3RlbmVyIHJlZ2lzdGVyZWRcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgZm9yIHRoaXMgZXZlbnQuXHJcbiAqXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxwPjxiPk5vdGU6IDwvYj5UaGlzIGV2ZW50IGlzIG5vdCBkaXNwYXRjaGVkIGlmIHRoZVxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5IGlzIG5vdCByZW5kZXJpbmcuIFRoaXMgaXMgdGhlIGNhc2Ugd2hlbiB0aGVcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudCBpcyBlaXRoZXIgbWluaW1pemVkIG9yIG9ic2N1cmVkLiA8L3A+XHJcbiAqL1xyXG5jbGFzcyBEaXNwbGF5T2JqZWN0IGV4dGVuZHMgTmFtZWRBc3NldEJhc2UgaW1wbGVtZW50cyBJQml0bWFwRHJhd2FibGVcclxue1xyXG5cdHByaXZhdGUgX2xvYWRlckluZm86TG9hZGVySW5mbztcclxuXHRwcml2YXRlIF9tb3VzZVg6bnVtYmVyO1xyXG5cdHByaXZhdGUgX21vdXNlWTpudW1iZXI7XHJcblx0cHJpdmF0ZSBfcm9vdDpEaXNwbGF5T2JqZWN0Q29udGFpbmVyO1xyXG5cdHByaXZhdGUgX2JvdW5kczpSZWN0YW5nbGU7XHJcblx0cHVibGljIF9wQm94Qm91bmRzOkJveDtcclxuXHRwcml2YXRlIF9ib3hCb3VuZHNJbnZhbGlkOmJvb2xlYW4gPSB0cnVlO1xyXG5cdHB1YmxpYyBfcFNwaGVyZUJvdW5kczpTcGhlcmU7XHJcblx0cHJpdmF0ZSBfc3BoZXJlQm91bmRzSW52YWxpZDpib29sZWFuID0gdHJ1ZTtcclxuXHRwcml2YXRlIF9kZWJ1Z1Zpc2libGU6Ym9vbGVhbjtcclxuXHJcblx0cHVibGljIF9wU2NlbmU6U2NlbmU7XHJcblx0cHVibGljIF9wUGFyZW50OkRpc3BsYXlPYmplY3RDb250YWluZXI7XHJcblx0cHVibGljIF9wU2NlbmVUcmFuc2Zvcm06TWF0cml4M0QgPSBuZXcgTWF0cml4M0QoKTtcclxuXHRwdWJsaWMgX3BTY2VuZVRyYW5zZm9ybURpcnR5OmJvb2xlYW4gPSB0cnVlO1xyXG5cdHB1YmxpYyBfcElzRW50aXR5OmJvb2xlYW47XHJcblxyXG5cdHByaXZhdGUgX2V4cGxpY2l0UGFydGl0aW9uOlBhcnRpdGlvbjtcclxuXHRwdWJsaWMgX3BJbXBsaWNpdFBhcnRpdGlvbjpQYXJ0aXRpb247XHJcblxyXG5cdHByaXZhdGUgX3NjZW5lVHJhbnNmb3JtQ2hhbmdlZDpEaXNwbGF5T2JqZWN0RXZlbnQ7XHJcblx0cHJpdmF0ZSBfc2NlbmVjaGFuZ2VkOkRpc3BsYXlPYmplY3RFdmVudDtcclxuXHRwcml2YXRlIF90cmFuc2Zvcm06VHJhbnNmb3JtO1xyXG5cdHByaXZhdGUgX21hdHJpeDNEOk1hdHJpeDNEID0gbmV3IE1hdHJpeDNEKCk7XHJcblx0cHJpdmF0ZSBfbWF0cml4M0REaXJ0eTpib29sZWFuID0gdHJ1ZTtcclxuXHJcblx0cHJpdmF0ZSBfaW52ZXJzZVNjZW5lVHJhbnNmb3JtOk1hdHJpeDNEID0gbmV3IE1hdHJpeDNEKCk7XHJcblx0cHJpdmF0ZSBfaW52ZXJzZVNjZW5lVHJhbnNmb3JtRGlydHk6Ym9vbGVhbiA9IHRydWU7XHJcblx0cHJpdmF0ZSBfc2NlbmVQb3NpdGlvbjpWZWN0b3IzRCA9IG5ldyBWZWN0b3IzRCgpO1xyXG5cdHByaXZhdGUgX3NjZW5lUG9zaXRpb25EaXJ0eTpib29sZWFuID0gdHJ1ZTtcclxuXHRwcml2YXRlIF9leHBsaWNpdFZpc2liaWxpdHk6Ym9vbGVhbiA9IHRydWU7XHJcblx0cHVibGljIF9wSW1wbGljaXRWaXNpYmlsaXR5OmJvb2xlYW4gPSB0cnVlO1xyXG5cdHByaXZhdGUgX2V4cGxpY2l0TW91c2VFbmFibGVkOmJvb2xlYW4gPSB0cnVlO1xyXG5cdHB1YmxpYyBfcEltcGxpY2l0TW91c2VFbmFibGVkOmJvb2xlYW4gPSB0cnVlO1xyXG5cdHByaXZhdGUgX2xpc3RlblRvU2NlbmVUcmFuc2Zvcm1DaGFuZ2VkOmJvb2xlYW47XHJcblx0cHJpdmF0ZSBfbGlzdGVuVG9TY2VuZUNoYW5nZWQ6Ym9vbGVhbjtcclxuXHJcblx0cHJpdmF0ZSBfcG9zaXRpb25EaXJ0eTpib29sZWFuID0gdHJ1ZTtcclxuXHRwcml2YXRlIF9yb3RhdGlvbkRpcnR5OmJvb2xlYW4gPSB0cnVlO1xyXG5cdHByaXZhdGUgX3NjYWxlRGlydHk6Ym9vbGVhbiA9IHRydWU7XHJcblxyXG5cdHByaXZhdGUgX3Bvc2l0aW9uQ2hhbmdlZDpEaXNwbGF5T2JqZWN0RXZlbnQ7XHJcblx0cHJpdmF0ZSBfcm90YXRpb25DaGFuZ2VkOkRpc3BsYXlPYmplY3RFdmVudDtcclxuXHRwcml2YXRlIF9zY2FsZUNoYW5nZWQ6RGlzcGxheU9iamVjdEV2ZW50O1xyXG5cclxuXHRwcml2YXRlIF9yb3RhdGlvblg6bnVtYmVyID0gMDtcclxuXHRwcml2YXRlIF9yb3RhdGlvblk6bnVtYmVyID0gMDtcclxuXHRwcml2YXRlIF9yb3RhdGlvblo6bnVtYmVyID0gMDtcclxuXHRwcml2YXRlIF9ldWxlcnM6VmVjdG9yM0QgPSBuZXcgVmVjdG9yM0QoKTtcclxuXHRwcml2YXRlIF9mbGlwWTpNYXRyaXgzRCA9IG5ldyBNYXRyaXgzRCgpO1xyXG5cclxuXHRwcml2YXRlIF9saXN0ZW5Ub1Bvc2l0aW9uQ2hhbmdlZDpib29sZWFuO1xyXG5cdHByaXZhdGUgX2xpc3RlblRvUm90YXRpb25DaGFuZ2VkOmJvb2xlYW47XHJcblx0cHJpdmF0ZSBfbGlzdGVuVG9TY2FsZUNoYW5nZWQ6Ym9vbGVhbjtcclxuXHRwcml2YXRlIF96T2Zmc2V0Om51bWJlciA9IDA7XHJcblxyXG5cdHB1YmxpYyBfd2lkdGg6bnVtYmVyO1xyXG5cdHB1YmxpYyBfaGVpZ2h0Om51bWJlcjtcclxuXHRwdWJsaWMgX2RlcHRoOm51bWJlcjtcclxuXHJcblx0cHVibGljIF9wU2NhbGVYOm51bWJlciA9IDE7XHJcblx0cHVibGljIF9wU2NhbGVZOm51bWJlciA9IDE7XHJcblx0cHVibGljIF9wU2NhbGVaOm51bWJlciA9IDE7XHJcblx0cHJpdmF0ZSBfeDpudW1iZXIgPSAwO1xyXG5cdHByaXZhdGUgX3k6bnVtYmVyID0gMDtcclxuXHRwcml2YXRlIF96Om51bWJlciA9IDA7XHJcblx0cHJpdmF0ZSBfcGl2b3Q6VmVjdG9yM0QgPSBuZXcgVmVjdG9yM0QoKTtcclxuXHRwcml2YXRlIF9waXZvdFNjYWxlOlZlY3RvcjNEID0gbmV3IFZlY3RvcjNEKCk7XHJcblx0cHJpdmF0ZSBfb3JpZW50YXRpb25NYXRyaXg6TWF0cml4M0QgPSBuZXcgTWF0cml4M0QoKTtcclxuXHRwcml2YXRlIF9waXZvdFplcm86Ym9vbGVhbiA9IHRydWU7XHJcblx0cHJpdmF0ZSBfcGl2b3REaXJ0eTpib29sZWFuID0gdHJ1ZTtcclxuXHRwcml2YXRlIF9wb3M6VmVjdG9yM0QgPSBuZXcgVmVjdG9yM0QoKTtcclxuXHRwcml2YXRlIF9yb3Q6VmVjdG9yM0QgPSBuZXcgVmVjdG9yM0QoKTtcclxuXHRwcml2YXRlIF9zY2E6VmVjdG9yM0QgPSBuZXcgVmVjdG9yM0QoKTtcclxuXHRwcml2YXRlIF90cmFuc2Zvcm1Db21wb25lbnRzOkFycmF5PFZlY3RvcjNEPjtcclxuXHJcblx0cHVibGljIF9wSWdub3JlVHJhbnNmb3JtOmJvb2xlYW4gPSBmYWxzZTtcclxuXHJcblx0cHJpdmF0ZSBfc2hhZGVyUGlja2luZ0RldGFpbHM6Ym9vbGVhbjtcclxuXHJcblx0cHVibGljIF9wUGlja2luZ0NvbGxpc2lvblZPOlBpY2tpbmdDb2xsaXNpb25WTztcclxuXHJcblx0cHVibGljIF9ib3VuZHNUeXBlOnN0cmluZztcclxuXHJcblx0cHVibGljIF9wUGlja2luZ0NvbGxpZGVyOklQaWNraW5nQ29sbGlkZXI7XHJcblxyXG5cdHB1YmxpYyBfcFJlbmRlcmFibGVzOkFycmF5PElSZW5kZXJhYmxlPiA9IG5ldyBBcnJheTxJUmVuZGVyYWJsZT4oKTtcclxuXHRwcml2YXRlIF9lbnRpdHlOb2RlczpBcnJheTxFbnRpdHlOb2RlPiA9IG5ldyBBcnJheTxFbnRpdHlOb2RlPigpO1xyXG5cclxuXHRwdWJsaWMgX2lTb3VyY2VQcmVmYWI6UHJlZmFiQmFzZTtcclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgYWxpZ25tZW50TW9kZTpzdHJpbmcgPSBBbGlnbm1lbnRNb2RlLlJFR0lTVFJBVElPTl9QT0lOVDtcclxuXHJcblx0LyoqXHJcblx0ICogSW5kaWNhdGVzIHRoZSBhbHBoYSB0cmFuc3BhcmVuY3kgdmFsdWUgb2YgdGhlIG9iamVjdCBzcGVjaWZpZWQuIFZhbGlkXHJcblx0ICogdmFsdWVzIGFyZSAwKGZ1bGx5IHRyYW5zcGFyZW50KSB0byAxKGZ1bGx5IG9wYXF1ZSkuIFRoZSBkZWZhdWx0IHZhbHVlIGlzXHJcblx0ICogMS4gRGlzcGxheSBvYmplY3RzIHdpdGggPGNvZGU+YWxwaGE8L2NvZGU+IHNldCB0byAwIDxpPmFyZTwvaT4gYWN0aXZlLFxyXG5cdCAqIGV2ZW4gdGhvdWdoIHRoZXkgYXJlIGludmlzaWJsZS5cclxuXHQgKi9cclxuXHRwdWJsaWMgYWxwaGE6bnVtYmVyO1xyXG5cclxuXHQvKipcclxuXHQgKiBBIHZhbHVlIGZyb20gdGhlIEJsZW5kTW9kZSBjbGFzcyB0aGF0IHNwZWNpZmllcyB3aGljaCBibGVuZCBtb2RlIHRvIHVzZS4gQVxyXG5cdCAqIGJpdG1hcCBjYW4gYmUgZHJhd24gaW50ZXJuYWxseSBpbiB0d28gd2F5cy4gSWYgeW91IGhhdmUgYSBibGVuZCBtb2RlXHJcblx0ICogZW5hYmxlZCBvciBhbiBleHRlcm5hbCBjbGlwcGluZyBtYXNrLCB0aGUgYml0bWFwIGlzIGRyYXduIGJ5IGFkZGluZyBhXHJcblx0ICogYml0bWFwLWZpbGxlZCBzcXVhcmUgc2hhcGUgdG8gdGhlIHZlY3RvciByZW5kZXIuIElmIHlvdSBhdHRlbXB0IHRvIHNldFxyXG5cdCAqIHRoaXMgcHJvcGVydHkgdG8gYW4gaW52YWxpZCB2YWx1ZSwgRmxhc2ggcnVudGltZXMgc2V0IHRoZSB2YWx1ZSB0b1xyXG5cdCAqIDxjb2RlPkJsZW5kTW9kZS5OT1JNQUw8L2NvZGU+LlxyXG5cdCAqXHJcblx0ICogPHA+VGhlIDxjb2RlPmJsZW5kTW9kZTwvY29kZT4gcHJvcGVydHkgYWZmZWN0cyBlYWNoIHBpeGVsIG9mIHRoZSBkaXNwbGF5XHJcblx0ICogb2JqZWN0LiBFYWNoIHBpeGVsIGlzIGNvbXBvc2VkIG9mIHRocmVlIGNvbnN0aXR1ZW50IGNvbG9ycyhyZWQsIGdyZWVuLFxyXG5cdCAqIGFuZCBibHVlKSwgYW5kIGVhY2ggY29uc3RpdHVlbnQgY29sb3IgaGFzIGEgdmFsdWUgYmV0d2VlbiAweDAwIGFuZCAweEZGLlxyXG5cdCAqIEZsYXNoIFBsYXllciBvciBBZG9iZSBBSVIgY29tcGFyZXMgZWFjaCBjb25zdGl0dWVudCBjb2xvciBvZiBvbmUgcGl4ZWwgaW5cclxuXHQgKiB0aGUgbW92aWUgY2xpcCB3aXRoIHRoZSBjb3JyZXNwb25kaW5nIGNvbG9yIG9mIHRoZSBwaXhlbCBpbiB0aGVcclxuXHQgKiBiYWNrZ3JvdW5kLiBGb3IgZXhhbXBsZSwgaWYgPGNvZGU+YmxlbmRNb2RlPC9jb2RlPiBpcyBzZXQgdG9cclxuXHQgKiA8Y29kZT5CbGVuZE1vZGUuTElHSFRFTjwvY29kZT4sIEZsYXNoIFBsYXllciBvciBBZG9iZSBBSVIgY29tcGFyZXMgdGhlIHJlZFxyXG5cdCAqIHZhbHVlIG9mIHRoZSBkaXNwbGF5IG9iamVjdCB3aXRoIHRoZSByZWQgdmFsdWUgb2YgdGhlIGJhY2tncm91bmQsIGFuZCB1c2VzXHJcblx0ICogdGhlIGxpZ2h0ZXIgb2YgdGhlIHR3byBhcyB0aGUgdmFsdWUgZm9yIHRoZSByZWQgY29tcG9uZW50IG9mIHRoZSBkaXNwbGF5ZWRcclxuXHQgKiBjb2xvci48L3A+XHJcblx0ICpcclxuXHQgKiA8cD5UaGUgZm9sbG93aW5nIHRhYmxlIGRlc2NyaWJlcyB0aGUgPGNvZGU+YmxlbmRNb2RlPC9jb2RlPiBzZXR0aW5ncy4gVGhlXHJcblx0ICogQmxlbmRNb2RlIGNsYXNzIGRlZmluZXMgc3RyaW5nIHZhbHVlcyB5b3UgY2FuIHVzZS4gVGhlIGlsbHVzdHJhdGlvbnMgaW5cclxuXHQgKiB0aGUgdGFibGUgc2hvdyA8Y29kZT5ibGVuZE1vZGU8L2NvZGU+IHZhbHVlcyBhcHBsaWVkIHRvIGEgY2lyY3VsYXIgZGlzcGxheVxyXG5cdCAqIG9iamVjdCgyKSBzdXBlcmltcG9zZWQgb24gYW5vdGhlciBkaXNwbGF5IG9iamVjdCgxKS48L3A+XHJcblx0ICovXHJcblx0cHVibGljIGJsZW5kTW9kZTpCbGVuZE1vZGU7XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCBib3VuZHNUeXBlKCk6c3RyaW5nXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2JvdW5kc1R5cGU7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IGJvdW5kc1R5cGUodmFsdWU6c3RyaW5nKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9ib3VuZHNUeXBlID09IHZhbHVlKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fYm91bmRzVHlwZSA9IHZhbHVlO1xyXG5cclxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlQm91bmRzKCk7XHJcblxyXG5cdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9lbnRpdHlOb2Rlcy5sZW5ndGg7XHJcblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBsZW47IGkrKylcclxuXHRcdFx0dGhpcy5fZW50aXR5Tm9kZXNbaV0udXBkYXRlQm91bmRzKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJZiBzZXQgdG8gPGNvZGU+dHJ1ZTwvY29kZT4sIE5NRSB3aWxsIHVzZSB0aGUgc29mdHdhcmUgcmVuZGVyZXIgdG8gY2FjaGVcclxuXHQgKiBhbiBpbnRlcm5hbCBiaXRtYXAgcmVwcmVzZW50YXRpb24gb2YgdGhlIGRpc3BsYXkgb2JqZWN0LiBGb3IgbmF0aXZlIHRhcmdldHMsXHJcblx0ICogdGhpcyBpcyBvZnRlbiBtdWNoIHNsb3dlciB0aGFuIHRoZSBkZWZhdWx0IGhhcmR3YXJlIHJlbmRlcmVyLiBXaGVuIHlvdVxyXG5cdCAqIGFyZSB1c2luZyB0aGUgRmxhc2ggdGFyZ2V0LCB0aGlzIGNhY2hpbmcgbWF5IGluY3JlYXNlIHBlcmZvcm1hbmNlIGZvciBkaXNwbGF5XHJcblx0ICogb2JqZWN0cyB0aGF0IGNvbnRhaW4gY29tcGxleCB2ZWN0b3IgY29udGVudC5cclxuXHQgKlxyXG5cdCAqIDxwPkFsbCB2ZWN0b3IgZGF0YSBmb3IgYSBkaXNwbGF5IG9iamVjdCB0aGF0IGhhcyBhIGNhY2hlZCBiaXRtYXAgaXMgZHJhd25cclxuXHQgKiB0byB0aGUgYml0bWFwIGluc3RlYWQgb2YgdGhlIG1haW4gZGlzcGxheS4gSWZcclxuXHQgKiA8Y29kZT5jYWNoZUFzQml0bWFwTWF0cml4PC9jb2RlPiBpcyBudWxsIG9yIHVuc3VwcG9ydGVkLCB0aGUgYml0bWFwIGlzXHJcblx0ICogdGhlbiBjb3BpZWQgdG8gdGhlIG1haW4gZGlzcGxheSBhcyB1bnN0cmV0Y2hlZCwgdW5yb3RhdGVkIHBpeGVscyBzbmFwcGVkXHJcblx0ICogdG8gdGhlIG5lYXJlc3QgcGl4ZWwgYm91bmRhcmllcy4gUGl4ZWxzIGFyZSBtYXBwZWQgMSB0byAxIHdpdGggdGhlIHBhcmVudFxyXG5cdCAqIG9iamVjdC4gSWYgdGhlIGJvdW5kcyBvZiB0aGUgYml0bWFwIGNoYW5nZSwgdGhlIGJpdG1hcCBpcyByZWNyZWF0ZWRcclxuXHQgKiBpbnN0ZWFkIG9mIGJlaW5nIHN0cmV0Y2hlZC48L3A+XHJcblx0ICpcclxuXHQgKiA8cD5JZiA8Y29kZT5jYWNoZUFzQml0bWFwTWF0cml4PC9jb2RlPiBpcyBub24tbnVsbCBhbmQgc3VwcG9ydGVkLCB0aGVcclxuXHQgKiBvYmplY3QgaXMgZHJhd24gdG8gdGhlIG9mZi1zY3JlZW4gYml0bWFwIHVzaW5nIHRoYXQgbWF0cml4IGFuZCB0aGVcclxuXHQgKiBzdHJldGNoZWQgYW5kL29yIHJvdGF0ZWQgcmVzdWx0cyBvZiB0aGF0IHJlbmRlcmluZyBhcmUgdXNlZCB0byBkcmF3IHRoZVxyXG5cdCAqIG9iamVjdCB0byB0aGUgbWFpbiBkaXNwbGF5LjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPk5vIGludGVybmFsIGJpdG1hcCBpcyBjcmVhdGVkIHVubGVzcyB0aGUgPGNvZGU+Y2FjaGVBc0JpdG1hcDwvY29kZT5cclxuXHQgKiBwcm9wZXJ0eSBpcyBzZXQgdG8gPGNvZGU+dHJ1ZTwvY29kZT4uPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+QWZ0ZXIgeW91IHNldCB0aGUgPGNvZGU+Y2FjaGVBc0JpdG1hcDwvY29kZT4gcHJvcGVydHkgdG9cclxuXHQgKiA8Y29kZT50cnVlPC9jb2RlPiwgdGhlIHJlbmRlcmluZyBkb2VzIG5vdCBjaGFuZ2UsIGhvd2V2ZXIgdGhlIGRpc3BsYXlcclxuXHQgKiBvYmplY3QgcGVyZm9ybXMgcGl4ZWwgc25hcHBpbmcgYXV0b21hdGljYWxseS4gVGhlIGFuaW1hdGlvbiBzcGVlZCBjYW4gYmVcclxuXHQgKiBzaWduaWZpY2FudGx5IGZhc3RlciBkZXBlbmRpbmcgb24gdGhlIGNvbXBsZXhpdHkgb2YgdGhlIHZlY3RvciBjb250ZW50LlxyXG5cdCAqIDwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPlRoZSA8Y29kZT5jYWNoZUFzQml0bWFwPC9jb2RlPiBwcm9wZXJ0eSBpcyBhdXRvbWF0aWNhbGx5IHNldCB0b1xyXG5cdCAqIDxjb2RlPnRydWU8L2NvZGU+IHdoZW5ldmVyIHlvdSBhcHBseSBhIGZpbHRlciB0byBhIGRpc3BsYXkgb2JqZWN0KHdoZW5cclxuXHQgKiBpdHMgPGNvZGU+ZmlsdGVyPC9jb2RlPiBhcnJheSBpcyBub3QgZW1wdHkpLCBhbmQgaWYgYSBkaXNwbGF5IG9iamVjdCBoYXMgYVxyXG5cdCAqIGZpbHRlciBhcHBsaWVkIHRvIGl0LCA8Y29kZT5jYWNoZUFzQml0bWFwPC9jb2RlPiBpcyByZXBvcnRlZCBhc1xyXG5cdCAqIDxjb2RlPnRydWU8L2NvZGU+IGZvciB0aGF0IGRpc3BsYXkgb2JqZWN0LCBldmVuIGlmIHlvdSBzZXQgdGhlIHByb3BlcnR5IHRvXHJcblx0ICogPGNvZGU+ZmFsc2U8L2NvZGU+LiBJZiB5b3UgY2xlYXIgYWxsIGZpbHRlcnMgZm9yIGEgZGlzcGxheSBvYmplY3QsIHRoZVxyXG5cdCAqIDxjb2RlPmNhY2hlQXNCaXRtYXA8L2NvZGU+IHNldHRpbmcgY2hhbmdlcyB0byB3aGF0IGl0IHdhcyBsYXN0IHNldCB0by48L3A+XHJcblx0ICpcclxuXHQgKiA8cD5BIGRpc3BsYXkgb2JqZWN0IGRvZXMgbm90IHVzZSBhIGJpdG1hcCBldmVuIGlmIHRoZVxyXG5cdCAqIDxjb2RlPmNhY2hlQXNCaXRtYXA8L2NvZGU+IHByb3BlcnR5IGlzIHNldCB0byA8Y29kZT50cnVlPC9jb2RlPiBhbmRcclxuXHQgKiBpbnN0ZWFkIHJlbmRlcnMgZnJvbSB2ZWN0b3IgZGF0YSBpbiB0aGUgZm9sbG93aW5nIGNhc2VzOjwvcD5cclxuXHQgKlxyXG5cdCAqIDx1bD5cclxuXHQgKiAgIDxsaT5UaGUgYml0bWFwIGlzIHRvbyBsYXJnZS4gSW4gQUlSIDEuNSBhbmQgRmxhc2ggUGxheWVyIDEwLCB0aGUgbWF4aW11bVxyXG5cdCAqIHNpemUgZm9yIGEgYml0bWFwIGltYWdlIGlzIDgsMTkxIHBpeGVscyBpbiB3aWR0aCBvciBoZWlnaHQsIGFuZCB0aGUgdG90YWxcclxuXHQgKiBudW1iZXIgb2YgcGl4ZWxzIGNhbm5vdCBleGNlZWQgMTYsNzc3LDIxNSBwaXhlbHMuKFNvLCBpZiBhIGJpdG1hcCBpbWFnZVxyXG5cdCAqIGlzIDgsMTkxIHBpeGVscyB3aWRlLCBpdCBjYW4gb25seSBiZSAyLDA0OCBwaXhlbHMgaGlnaC4pIEluIEZsYXNoIFBsYXllciA5XHJcblx0ICogYW5kIGVhcmxpZXIsIHRoZSBsaW1pdGF0aW9uIGlzIGlzIDI4ODAgcGl4ZWxzIGluIGhlaWdodCBhbmQgMiw4ODAgcGl4ZWxzXHJcblx0ICogaW4gd2lkdGguPC9saT5cclxuXHQgKiAgIDxsaT5UaGUgYml0bWFwIGZhaWxzIHRvIGFsbG9jYXRlKG91dCBvZiBtZW1vcnkgZXJyb3IpLiA8L2xpPlxyXG5cdCAqIDwvdWw+XHJcblx0ICpcclxuXHQgKiA8cD5UaGUgPGNvZGU+Y2FjaGVBc0JpdG1hcDwvY29kZT4gcHJvcGVydHkgaXMgYmVzdCB1c2VkIHdpdGggbW92aWUgY2xpcHNcclxuXHQgKiB0aGF0IGhhdmUgbW9zdGx5IHN0YXRpYyBjb250ZW50IGFuZCB0aGF0IGRvIG5vdCBzY2FsZSBhbmQgcm90YXRlXHJcblx0ICogZnJlcXVlbnRseS4gV2l0aCBzdWNoIG1vdmllIGNsaXBzLCA8Y29kZT5jYWNoZUFzQml0bWFwPC9jb2RlPiBjYW4gbGVhZCB0b1xyXG5cdCAqIHBlcmZvcm1hbmNlIGluY3JlYXNlcyB3aGVuIHRoZSBtb3ZpZSBjbGlwIGlzIHRyYW5zbGF0ZWQod2hlbiBpdHMgPGk+eDwvaT5cclxuXHQgKiBhbmQgPGk+eTwvaT4gcG9zaXRpb24gaXMgY2hhbmdlZCkuPC9wPlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBjYWNoZUFzQml0bWFwOmJvb2xlYW47XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGNhc3RzU2hhZG93czpib29sZWFuID0gdHJ1ZTtcclxuXHJcblx0LyoqXHJcblx0ICogSW5kaWNhdGVzIHRoZSBkZXB0aCBvZiB0aGUgZGlzcGxheSBvYmplY3QsIGluIHBpeGVscy4gVGhlIGRlcHRoIGlzXHJcblx0ICogY2FsY3VsYXRlZCBiYXNlZCBvbiB0aGUgYm91bmRzIG9mIHRoZSBjb250ZW50IG9mIHRoZSBkaXNwbGF5IG9iamVjdC4gV2hlblxyXG5cdCAqIHlvdSBzZXQgdGhlIDxjb2RlPmRlcHRoPC9jb2RlPiBwcm9wZXJ0eSwgdGhlIDxjb2RlPnNjYWxlWjwvY29kZT4gcHJvcGVydHlcclxuXHQgKiBpcyBhZGp1c3RlZCBhY2NvcmRpbmdseSwgYXMgc2hvd24gaW4gdGhlIGZvbGxvd2luZyBjb2RlOlxyXG5cdCAqXHJcblx0ICogPHA+RXhjZXB0IGZvciBUZXh0RmllbGQgYW5kIFZpZGVvIG9iamVjdHMsIGEgZGlzcGxheSBvYmplY3Qgd2l0aCBub1xyXG5cdCAqIGNvbnRlbnQgKHN1Y2ggYXMgYW4gZW1wdHkgc3ByaXRlKSBoYXMgYSBkZXB0aCBvZiAwLCBldmVuIGlmIHlvdSB0cnkgdG9cclxuXHQgKiBzZXQgPGNvZGU+ZGVwdGg8L2NvZGU+IHRvIGEgZGlmZmVyZW50IHZhbHVlLjwvcD5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGRlcHRoKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuZ2V0Qm94KCkuZGVwdGgqdGhpcy5fcFNjYWxlWjtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgZGVwdGgodmFsOm51bWJlcilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fZGVwdGggPT0gdmFsKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fZGVwdGggPSB2YWw7XHJcblxyXG5cdFx0dGhpcy5fcFNjYWxlWiA9IHZhbC90aGlzLmdldEJveCgpLmRlcHRoO1xyXG5cclxuXHRcdHRoaXMuaW52YWxpZGF0ZVNjYWxlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEZWZpbmVzIHRoZSByb3RhdGlvbiBvZiB0aGUgM2Qgb2JqZWN0IGFzIGEgPGNvZGU+VmVjdG9yM0Q8L2NvZGU+IG9iamVjdCBjb250YWluaW5nIGV1bGVyIGFuZ2xlcyBmb3Igcm90YXRpb24gYXJvdW5kIHgsIHkgYW5kIHogYXhpcy5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGV1bGVycygpOlZlY3RvcjNEXHJcblx0e1xyXG5cdFx0dGhpcy5fZXVsZXJzLnggPSB0aGlzLl9yb3RhdGlvblgqTWF0aENvbnN0cy5SQURJQU5TX1RPX0RFR1JFRVM7XHJcblx0XHR0aGlzLl9ldWxlcnMueSA9IHRoaXMuX3JvdGF0aW9uWSpNYXRoQ29uc3RzLlJBRElBTlNfVE9fREVHUkVFUztcclxuXHRcdHRoaXMuX2V1bGVycy56ID0gdGhpcy5fcm90YXRpb25aKk1hdGhDb25zdHMuUkFESUFOU19UT19ERUdSRUVTO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLl9ldWxlcnM7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IGV1bGVycyh2YWx1ZTpWZWN0b3IzRClcclxuXHR7XHJcblx0XHR0aGlzLl9yb3RhdGlvblggPSB2YWx1ZS54Kk1hdGhDb25zdHMuREVHUkVFU19UT19SQURJQU5TO1xyXG5cdFx0dGhpcy5fcm90YXRpb25ZID0gdmFsdWUueSpNYXRoQ29uc3RzLkRFR1JFRVNfVE9fUkFESUFOUztcclxuXHRcdHRoaXMuX3JvdGF0aW9uWiA9IHZhbHVlLnoqTWF0aENvbnN0cy5ERUdSRUVTX1RPX1JBRElBTlM7XHJcblxyXG5cdFx0dGhpcy5pbnZhbGlkYXRlUm90YXRpb24oKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFuIG9iamVjdCB0aGF0IGNhbiBjb250YWluIGFueSBleHRyYSBkYXRhLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBleHRyYTpPYmplY3Q7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFuIGluZGV4ZWQgYXJyYXkgdGhhdCBjb250YWlucyBlYWNoIGZpbHRlciBvYmplY3QgY3VycmVudGx5IGFzc29jaWF0ZWRcclxuXHQgKiB3aXRoIHRoZSBkaXNwbGF5IG9iamVjdC4gVGhlIGZsYXNoLmZpbHRlcnMgcGFja2FnZSBjb250YWlucyBzZXZlcmFsXHJcblx0ICogY2xhc3NlcyB0aGF0IGRlZmluZSBzcGVjaWZpYyBmaWx0ZXJzIHlvdSBjYW4gdXNlLlxyXG5cdCAqXHJcblx0ICogPHA+RmlsdGVycyBjYW4gYmUgYXBwbGllZCBpbiBGbGFzaCBQcm9mZXNzaW9uYWwgYXQgZGVzaWduIHRpbWUsIG9yIGF0IHJ1blxyXG5cdCAqIHRpbWUgYnkgdXNpbmcgQWN0aW9uU2NyaXB0IGNvZGUuIFRvIGFwcGx5IGEgZmlsdGVyIGJ5IHVzaW5nIEFjdGlvblNjcmlwdCxcclxuXHQgKiB5b3UgbXVzdCBtYWtlIGEgdGVtcG9yYXJ5IGNvcHkgb2YgdGhlIGVudGlyZSA8Y29kZT5maWx0ZXJzPC9jb2RlPiBhcnJheSxcclxuXHQgKiBtb2RpZnkgdGhlIHRlbXBvcmFyeSBhcnJheSwgdGhlbiBhc3NpZ24gdGhlIHZhbHVlIG9mIHRoZSB0ZW1wb3JhcnkgYXJyYXlcclxuXHQgKiBiYWNrIHRvIHRoZSA8Y29kZT5maWx0ZXJzPC9jb2RlPiBhcnJheS4gWW91IGNhbm5vdCBkaXJlY3RseSBhZGQgYSBuZXdcclxuXHQgKiBmaWx0ZXIgb2JqZWN0IHRvIHRoZSA8Y29kZT5maWx0ZXJzPC9jb2RlPiBhcnJheS48L3A+XHJcblx0ICpcclxuXHQgKiA8cD5UbyBhZGQgYSBmaWx0ZXIgYnkgdXNpbmcgQWN0aW9uU2NyaXB0LCBwZXJmb3JtIHRoZSBmb2xsb3dpbmcgc3RlcHNcclxuXHQgKiAoYXNzdW1lIHRoYXQgdGhlIHRhcmdldCBkaXNwbGF5IG9iamVjdCBpcyBuYW1lZFxyXG5cdCAqIDxjb2RlPm15RGlzcGxheU9iamVjdDwvY29kZT4pOjwvcD5cclxuXHQgKlxyXG5cdCAqIDxvbD5cclxuXHQgKiAgIDxsaT5DcmVhdGUgYSBuZXcgZmlsdGVyIG9iamVjdCBieSB1c2luZyB0aGUgY29uc3RydWN0b3IgbWV0aG9kIG9mIHlvdXJcclxuXHQgKiBjaG9zZW4gZmlsdGVyIGNsYXNzLjwvbGk+XHJcblx0ICogICA8bGk+QXNzaWduIHRoZSB2YWx1ZSBvZiB0aGUgPGNvZGU+bXlEaXNwbGF5T2JqZWN0LmZpbHRlcnM8L2NvZGU+IGFycmF5XHJcblx0ICogdG8gYSB0ZW1wb3JhcnkgYXJyYXksIHN1Y2ggYXMgb25lIG5hbWVkIDxjb2RlPm15RmlsdGVyczwvY29kZT4uPC9saT5cclxuXHQgKiAgIDxsaT5BZGQgdGhlIG5ldyBmaWx0ZXIgb2JqZWN0IHRvIHRoZSA8Y29kZT5teUZpbHRlcnM8L2NvZGU+IHRlbXBvcmFyeVxyXG5cdCAqIGFycmF5LjwvbGk+XHJcblx0ICogICA8bGk+QXNzaWduIHRoZSB2YWx1ZSBvZiB0aGUgdGVtcG9yYXJ5IGFycmF5IHRvIHRoZVxyXG5cdCAqIDxjb2RlPm15RGlzcGxheU9iamVjdC5maWx0ZXJzPC9jb2RlPiBhcnJheS48L2xpPlxyXG5cdCAqIDwvb2w+XHJcblx0ICpcclxuXHQgKiA8cD5JZiB0aGUgPGNvZGU+ZmlsdGVyczwvY29kZT4gYXJyYXkgaXMgdW5kZWZpbmVkLCB5b3UgZG8gbm90IG5lZWQgdG8gdXNlXHJcblx0ICogYSB0ZW1wb3JhcnkgYXJyYXkuIEluc3RlYWQsIHlvdSBjYW4gZGlyZWN0bHkgYXNzaWduIGFuIGFycmF5IGxpdGVyYWwgdGhhdFxyXG5cdCAqIGNvbnRhaW5zIG9uZSBvciBtb3JlIGZpbHRlciBvYmplY3RzIHRoYXQgeW91IGNyZWF0ZS4gVGhlIGZpcnN0IGV4YW1wbGUgaW5cclxuXHQgKiB0aGUgRXhhbXBsZXMgc2VjdGlvbiBhZGRzIGEgZHJvcCBzaGFkb3cgZmlsdGVyIGJ5IHVzaW5nIGNvZGUgdGhhdCBoYW5kbGVzXHJcblx0ICogYm90aCBkZWZpbmVkIGFuZCB1bmRlZmluZWQgPGNvZGU+ZmlsdGVyczwvY29kZT4gYXJyYXlzLjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPlRvIG1vZGlmeSBhbiBleGlzdGluZyBmaWx0ZXIgb2JqZWN0LCB5b3UgbXVzdCB1c2UgdGhlIHRlY2huaXF1ZSBvZlxyXG5cdCAqIG1vZGlmeWluZyBhIGNvcHkgb2YgdGhlIDxjb2RlPmZpbHRlcnM8L2NvZGU+IGFycmF5OjwvcD5cclxuXHQgKlxyXG5cdCAqIDxvbD5cclxuXHQgKiAgIDxsaT5Bc3NpZ24gdGhlIHZhbHVlIG9mIHRoZSA8Y29kZT5maWx0ZXJzPC9jb2RlPiBhcnJheSB0byBhIHRlbXBvcmFyeVxyXG5cdCAqIGFycmF5LCBzdWNoIGFzIG9uZSBuYW1lZCA8Y29kZT5teUZpbHRlcnM8L2NvZGU+LjwvbGk+XHJcblx0ICogICA8bGk+TW9kaWZ5IHRoZSBwcm9wZXJ0eSBieSB1c2luZyB0aGUgdGVtcG9yYXJ5IGFycmF5LFxyXG5cdCAqIDxjb2RlPm15RmlsdGVyczwvY29kZT4uIEZvciBleGFtcGxlLCB0byBzZXQgdGhlIHF1YWxpdHkgcHJvcGVydHkgb2YgdGhlXHJcblx0ICogZmlyc3QgZmlsdGVyIGluIHRoZSBhcnJheSwgeW91IGNvdWxkIHVzZSB0aGUgZm9sbG93aW5nIGNvZGU6XHJcblx0ICogPGNvZGU+bXlGaWx0ZXJzWzBdLnF1YWxpdHkgPSAxOzwvY29kZT48L2xpPlxyXG5cdCAqICAgPGxpPkFzc2lnbiB0aGUgdmFsdWUgb2YgdGhlIHRlbXBvcmFyeSBhcnJheSB0byB0aGUgPGNvZGU+ZmlsdGVyczwvY29kZT5cclxuXHQgKiBhcnJheS48L2xpPlxyXG5cdCAqIDwvb2w+XHJcblx0ICpcclxuXHQgKiA8cD5BdCBsb2FkIHRpbWUsIGlmIGEgZGlzcGxheSBvYmplY3QgaGFzIGFuIGFzc29jaWF0ZWQgZmlsdGVyLCBpdCBpc1xyXG5cdCAqIG1hcmtlZCB0byBjYWNoZSBpdHNlbGYgYXMgYSB0cmFuc3BhcmVudCBiaXRtYXAuIEZyb20gdGhpcyBwb2ludCBmb3J3YXJkLFxyXG5cdCAqIGFzIGxvbmcgYXMgdGhlIGRpc3BsYXkgb2JqZWN0IGhhcyBhIHZhbGlkIGZpbHRlciBsaXN0LCB0aGUgcGxheWVyIGNhY2hlc1xyXG5cdCAqIHRoZSBkaXNwbGF5IG9iamVjdCBhcyBhIGJpdG1hcC4gVGhpcyBzb3VyY2UgYml0bWFwIGlzIHVzZWQgYXMgYSBzb3VyY2VcclxuXHQgKiBpbWFnZSBmb3IgdGhlIGZpbHRlciBlZmZlY3RzLiBFYWNoIGRpc3BsYXkgb2JqZWN0IHVzdWFsbHkgaGFzIHR3byBiaXRtYXBzOlxyXG5cdCAqIG9uZSB3aXRoIHRoZSBvcmlnaW5hbCB1bmZpbHRlcmVkIHNvdXJjZSBkaXNwbGF5IG9iamVjdCBhbmQgYW5vdGhlciBmb3IgdGhlXHJcblx0ICogZmluYWwgaW1hZ2UgYWZ0ZXIgZmlsdGVyaW5nLiBUaGUgZmluYWwgaW1hZ2UgaXMgdXNlZCB3aGVuIHJlbmRlcmluZy4gQXNcclxuXHQgKiBsb25nIGFzIHRoZSBkaXNwbGF5IG9iamVjdCBkb2VzIG5vdCBjaGFuZ2UsIHRoZSBmaW5hbCBpbWFnZSBkb2VzIG5vdCBuZWVkXHJcblx0ICogdXBkYXRpbmcuPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+VGhlIGZsYXNoLmZpbHRlcnMgcGFja2FnZSBpbmNsdWRlcyBjbGFzc2VzIGZvciBmaWx0ZXJzLiBGb3IgZXhhbXBsZSwgdG9cclxuXHQgKiBjcmVhdGUgYSBEcm9wU2hhZG93IGZpbHRlciwgeW91IHdvdWxkIHdyaXRlOjwvcD5cclxuXHQgKlxyXG5cdCAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciBXaGVuIDxjb2RlPmZpbHRlcnM8L2NvZGU+IGluY2x1ZGVzIGEgU2hhZGVyRmlsdGVyXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIGFuZCB0aGUgc2hhZGVyIG91dHB1dCB0eXBlIGlzIG5vdCBjb21wYXRpYmxlIHdpdGhcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgdGhpcyBvcGVyYXRpb24odGhlIHNoYWRlciBtdXN0IHNwZWNpZnkgYVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5waXhlbDQ8L2NvZGU+IG91dHB1dCkuXHJcblx0ICogQHRocm93cyBBcmd1bWVudEVycm9yIFdoZW4gPGNvZGU+ZmlsdGVyczwvY29kZT4gaW5jbHVkZXMgYSBTaGFkZXJGaWx0ZXJcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgYW5kIHRoZSBzaGFkZXIgZG9lc24ndCBzcGVjaWZ5IGFueSBpbWFnZSBpbnB1dCBvclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICB0aGUgZmlyc3QgaW5wdXQgaXMgbm90IGFuIDxjb2RlPmltYWdlNDwvY29kZT4gaW5wdXQuXHJcblx0ICogQHRocm93cyBBcmd1bWVudEVycm9yIFdoZW4gPGNvZGU+ZmlsdGVyczwvY29kZT4gaW5jbHVkZXMgYSBTaGFkZXJGaWx0ZXJcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgYW5kIHRoZSBzaGFkZXIgc3BlY2lmaWVzIGFuIGltYWdlIGlucHV0IHRoYXQgaXNuJ3RcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZWQuXHJcblx0ICogQHRocm93cyBBcmd1bWVudEVycm9yIFdoZW4gPGNvZGU+ZmlsdGVyczwvY29kZT4gaW5jbHVkZXMgYSBTaGFkZXJGaWx0ZXIsIGFcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgQnl0ZUFycmF5IG9yIFZlY3Rvci48TnVtYmVyPiBpbnN0YW5jZSBhcyBhIHNoYWRlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBpbnB1dCwgYW5kIHRoZSA8Y29kZT53aWR0aDwvY29kZT4gYW5kXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPmhlaWdodDwvY29kZT4gcHJvcGVydGllcyBhcmVuJ3Qgc3BlY2lmaWVkIGZvclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICB0aGUgU2hhZGVySW5wdXQgb2JqZWN0LCBvciB0aGUgc3BlY2lmaWVkIHZhbHVlc1xyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBkb24ndCBtYXRjaCB0aGUgYW1vdW50IG9mIGRhdGEgaW4gdGhlIGlucHV0IGRhdGEuXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIFNlZSB0aGUgPGNvZGU+U2hhZGVySW5wdXQuaW5wdXQ8L2NvZGU+IHByb3BlcnR5IGZvclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBtb3JlIGluZm9ybWF0aW9uLlxyXG5cdCAqL1xyXG4vL1x0XHRwdWJsaWMgZmlsdGVyczpBcnJheTxEeW5hbWljPjtcclxuXHJcblx0LyoqXHJcblx0ICogSW5kaWNhdGVzIHRoZSBoZWlnaHQgb2YgdGhlIGRpc3BsYXkgb2JqZWN0LCBpbiBwaXhlbHMuIFRoZSBoZWlnaHQgaXNcclxuXHQgKiBjYWxjdWxhdGVkIGJhc2VkIG9uIHRoZSBib3VuZHMgb2YgdGhlIGNvbnRlbnQgb2YgdGhlIGRpc3BsYXkgb2JqZWN0LiBXaGVuXHJcblx0ICogeW91IHNldCB0aGUgPGNvZGU+aGVpZ2h0PC9jb2RlPiBwcm9wZXJ0eSwgdGhlIDxjb2RlPnNjYWxlWTwvY29kZT4gcHJvcGVydHlcclxuXHQgKiBpcyBhZGp1c3RlZCBhY2NvcmRpbmdseSwgYXMgc2hvd24gaW4gdGhlIGZvbGxvd2luZyBjb2RlOlxyXG5cdCAqXHJcblx0ICogPHA+RXhjZXB0IGZvciBUZXh0RmllbGQgYW5kIFZpZGVvIG9iamVjdHMsIGEgZGlzcGxheSBvYmplY3Qgd2l0aCBub1xyXG5cdCAqIGNvbnRlbnQgKHN1Y2ggYXMgYW4gZW1wdHkgc3ByaXRlKSBoYXMgYSBoZWlnaHQgb2YgMCwgZXZlbiBpZiB5b3UgdHJ5IHRvXHJcblx0ICogc2V0IDxjb2RlPmhlaWdodDwvY29kZT4gdG8gYSBkaWZmZXJlbnQgdmFsdWUuPC9wPlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgaGVpZ2h0KCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuZ2V0Qm94KCkuaGVpZ2h0KnRoaXMuX3BTY2FsZVk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IGhlaWdodCh2YWw6bnVtYmVyKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9oZWlnaHQgPT0gdmFsKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5faGVpZ2h0ID0gdmFsO1xyXG5cclxuXHRcdHRoaXMuX3BTY2FsZVkgPSB2YWwvdGhpcy5nZXRCb3goKS5oZWlnaHQ7XHJcblxyXG5cdFx0dGhpcy5pbnZhbGlkYXRlU2NhbGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluZGljYXRlcyB0aGUgaW5zdGFuY2UgY29udGFpbmVyIGluZGV4IG9mIHRoZSBEaXNwbGF5T2JqZWN0LiBUaGUgb2JqZWN0IGNhbiBiZVxyXG5cdCAqIGlkZW50aWZpZWQgaW4gdGhlIGNoaWxkIGxpc3Qgb2YgaXRzIHBhcmVudCBkaXNwbGF5IG9iamVjdCBjb250YWluZXIgYnlcclxuXHQgKiBjYWxsaW5nIHRoZSA8Y29kZT5nZXRDaGlsZEJ5SW5kZXgoKTwvY29kZT4gbWV0aG9kIG9mIHRoZSBkaXNwbGF5IG9iamVjdFxyXG5cdCAqIGNvbnRhaW5lci5cclxuXHQgKlxyXG5cdCAqIDxwPklmIHRoZSBEaXNwbGF5T2JqZWN0IGhhcyBubyBwYXJlbnQgY29udGFpbmVyLCBpbmRleCBkZWZhdWx0cyB0byAwLjwvcD5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGluZGV4KCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX3BQYXJlbnQpXHJcblx0XHRcdHJldHVybiB0aGlzLl9wUGFyZW50LmdldENoaWxkSW5kZXgodGhpcyk7XHJcblxyXG5cdFx0cmV0dXJuIDA7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgaW52ZXJzZVNjZW5lVHJhbnNmb3JtKCk6TWF0cml4M0RcclxuXHR7XHJcblx0XHRpZiAodGhpcy5faW52ZXJzZVNjZW5lVHJhbnNmb3JtRGlydHkpIHtcclxuXHRcdFx0dGhpcy5faW52ZXJzZVNjZW5lVHJhbnNmb3JtLmNvcHlGcm9tKHRoaXMuc2NlbmVUcmFuc2Zvcm0pO1xyXG5cdFx0XHR0aGlzLl9pbnZlcnNlU2NlbmVUcmFuc2Zvcm0uaW52ZXJ0KCk7XHJcblx0XHRcdHRoaXMuX2ludmVyc2VTY2VuZVRyYW5zZm9ybURpcnR5ID0gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcy5faW52ZXJzZVNjZW5lVHJhbnNmb3JtO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGlnbm9yZVRyYW5zZm9ybSgpOmJvb2xlYW5cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcElnbm9yZVRyYW5zZm9ybTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgaWdub3JlVHJhbnNmb3JtKHZhbHVlOmJvb2xlYW4pXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX3BJZ25vcmVUcmFuc2Zvcm0gPT0gdmFsdWUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9wSWdub3JlVHJhbnNmb3JtID0gdmFsdWU7XHJcblxyXG5cdFx0aWYgKHZhbHVlKSB7XHJcblx0XHRcdHRoaXMuX3BTY2VuZVRyYW5zZm9ybS5pZGVudGl0eSgpO1xyXG5cdFx0XHR0aGlzLl9zY2VuZVBvc2l0aW9uLnNldFRvKDAsIDAsIDApO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMucEludmFsaWRhdGVTY2VuZVRyYW5zZm9ybSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGlzRW50aXR5KClcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcElzRW50aXR5O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyBhIExvYWRlckluZm8gb2JqZWN0IGNvbnRhaW5pbmcgaW5mb3JtYXRpb24gYWJvdXQgbG9hZGluZyB0aGUgZmlsZVxyXG5cdCAqIHRvIHdoaWNoIHRoaXMgZGlzcGxheSBvYmplY3QgYmVsb25ncy4gVGhlIDxjb2RlPmxvYWRlckluZm88L2NvZGU+IHByb3BlcnR5XHJcblx0ICogaXMgZGVmaW5lZCBvbmx5IGZvciB0aGUgcm9vdCBkaXNwbGF5IG9iamVjdCBvZiBhIFNXRiBmaWxlIG9yIGZvciBhIGxvYWRlZFxyXG5cdCAqIEJpdG1hcChub3QgZm9yIGEgQml0bWFwIHRoYXQgaXMgZHJhd24gd2l0aCBBY3Rpb25TY3JpcHQpLiBUbyBmaW5kIHRoZVxyXG5cdCAqIDxjb2RlPmxvYWRlckluZm88L2NvZGU+IG9iamVjdCBhc3NvY2lhdGVkIHdpdGggdGhlIFNXRiBmaWxlIHRoYXQgY29udGFpbnNcclxuXHQgKiBhIGRpc3BsYXkgb2JqZWN0IG5hbWVkIDxjb2RlPm15RGlzcGxheU9iamVjdDwvY29kZT4sIHVzZVxyXG5cdCAqIDxjb2RlPm15RGlzcGxheU9iamVjdC5yb290LmxvYWRlckluZm88L2NvZGU+LlxyXG5cdCAqXHJcblx0ICogPHA+QSBsYXJnZSBTV0YgZmlsZSBjYW4gbW9uaXRvciBpdHMgZG93bmxvYWQgYnkgY2FsbGluZ1xyXG5cdCAqIDxjb2RlPnRoaXMucm9vdC5sb2FkZXJJbmZvLmFkZEV2ZW50TGlzdGVuZXIoRXZlbnQuQ09NUExFVEUsXHJcblx0ICogZnVuYyk8L2NvZGU+LjwvcD5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGxvYWRlckluZm8oKTpMb2FkZXJJbmZvXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2xvYWRlckluZm87XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgY2FsbGluZyBkaXNwbGF5IG9iamVjdCBpcyBtYXNrZWQgYnkgdGhlIHNwZWNpZmllZCA8Y29kZT5tYXNrPC9jb2RlPlxyXG5cdCAqIG9iamVjdC4gVG8gZW5zdXJlIHRoYXQgbWFza2luZyB3b3JrcyB3aGVuIHRoZSBTdGFnZSBpcyBzY2FsZWQsIHRoZVxyXG5cdCAqIDxjb2RlPm1hc2s8L2NvZGU+IGRpc3BsYXkgb2JqZWN0IG11c3QgYmUgaW4gYW4gYWN0aXZlIHBhcnQgb2YgdGhlIGRpc3BsYXlcclxuXHQgKiBsaXN0LiBUaGUgPGNvZGU+bWFzazwvY29kZT4gb2JqZWN0IGl0c2VsZiBpcyBub3QgZHJhd24uIFNldFxyXG5cdCAqIDxjb2RlPm1hc2s8L2NvZGU+IHRvIDxjb2RlPm51bGw8L2NvZGU+IHRvIHJlbW92ZSB0aGUgbWFzay5cclxuXHQgKlxyXG5cdCAqIDxwPlRvIGJlIGFibGUgdG8gc2NhbGUgYSBtYXNrIG9iamVjdCwgaXQgbXVzdCBiZSBvbiB0aGUgZGlzcGxheSBsaXN0LiBUb1xyXG5cdCAqIGJlIGFibGUgdG8gZHJhZyBhIG1hc2sgU3ByaXRlIG9iamVjdChieSBjYWxsaW5nIGl0c1xyXG5cdCAqIDxjb2RlPnN0YXJ0RHJhZygpPC9jb2RlPiBtZXRob2QpLCBpdCBtdXN0IGJlIG9uIHRoZSBkaXNwbGF5IGxpc3QuIFRvIGNhbGxcclxuXHQgKiB0aGUgPGNvZGU+c3RhcnREcmFnKCk8L2NvZGU+IG1ldGhvZCBmb3IgYSBtYXNrIHNwcml0ZSBiYXNlZCBvbiBhXHJcblx0ICogPGNvZGU+bW91c2VEb3duPC9jb2RlPiBldmVudCBiZWluZyBkaXNwYXRjaGVkIGJ5IHRoZSBzcHJpdGUsIHNldCB0aGVcclxuXHQgKiBzcHJpdGUncyA8Y29kZT5idXR0b25Nb2RlPC9jb2RlPiBwcm9wZXJ0eSB0byA8Y29kZT50cnVlPC9jb2RlPi48L3A+XHJcblx0ICpcclxuXHQgKiA8cD5XaGVuIGRpc3BsYXkgb2JqZWN0cyBhcmUgY2FjaGVkIGJ5IHNldHRpbmcgdGhlXHJcblx0ICogPGNvZGU+Y2FjaGVBc0JpdG1hcDwvY29kZT4gcHJvcGVydHkgdG8gPGNvZGU+dHJ1ZTwvY29kZT4gYW4gdGhlXHJcblx0ICogPGNvZGU+Y2FjaGVBc0JpdG1hcE1hdHJpeDwvY29kZT4gcHJvcGVydHkgdG8gYSBNYXRyaXggb2JqZWN0LCBib3RoIHRoZVxyXG5cdCAqIG1hc2sgYW5kIHRoZSBkaXNwbGF5IG9iamVjdCBiZWluZyBtYXNrZWQgbXVzdCBiZSBwYXJ0IG9mIHRoZSBzYW1lIGNhY2hlZFxyXG5cdCAqIGJpdG1hcC4gVGh1cywgaWYgdGhlIGRpc3BsYXkgb2JqZWN0IGlzIGNhY2hlZCwgdGhlbiB0aGUgbWFzayBtdXN0IGJlIGFcclxuXHQgKiBjaGlsZCBvZiB0aGUgZGlzcGxheSBvYmplY3QuIElmIGFuIGFuY2VzdG9yIG9mIHRoZSBkaXNwbGF5IG9iamVjdCBvbiB0aGVcclxuXHQgKiBkaXNwbGF5IGxpc3QgaXMgY2FjaGVkLCB0aGVuIHRoZSBtYXNrIG11c3QgYmUgYSBjaGlsZCBvZiB0aGF0IGFuY2VzdG9yIG9yXHJcblx0ICogb25lIG9mIGl0cyBkZXNjZW5kZW50cy4gSWYgbW9yZSB0aGFuIG9uZSBhbmNlc3RvciBvZiB0aGUgbWFza2VkIG9iamVjdCBpc1xyXG5cdCAqIGNhY2hlZCwgdGhlbiB0aGUgbWFzayBtdXN0IGJlIGEgZGVzY2VuZGVudCBvZiB0aGUgY2FjaGVkIGNvbnRhaW5lciBjbG9zZXN0XHJcblx0ICogdG8gdGhlIG1hc2tlZCBvYmplY3QgaW4gdGhlIGRpc3BsYXkgbGlzdC48L3A+XHJcblx0ICpcclxuXHQgKiA8cD48Yj5Ob3RlOjwvYj4gQSBzaW5nbGUgPGNvZGU+bWFzazwvY29kZT4gb2JqZWN0IGNhbm5vdCBiZSB1c2VkIHRvIG1hc2tcclxuXHQgKiBtb3JlIHRoYW4gb25lIGNhbGxpbmcgZGlzcGxheSBvYmplY3QuIFdoZW4gdGhlIDxjb2RlPm1hc2s8L2NvZGU+IGlzXHJcblx0ICogYXNzaWduZWQgdG8gYSBzZWNvbmQgZGlzcGxheSBvYmplY3QsIGl0IGlzIHJlbW92ZWQgYXMgdGhlIG1hc2sgb2YgdGhlXHJcblx0ICogZmlyc3Qgb2JqZWN0LCBhbmQgdGhhdCBvYmplY3QncyA8Y29kZT5tYXNrPC9jb2RlPiBwcm9wZXJ0eSBiZWNvbWVzXHJcblx0ICogPGNvZGU+bnVsbDwvY29kZT4uPC9wPlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBtYXNrOkRpc3BsYXlPYmplY3Q7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNwZWNpZmllcyB3aGV0aGVyIHRoaXMgb2JqZWN0IHJlY2VpdmVzIG1vdXNlLCBvciBvdGhlciB1c2VyIGlucHV0LFxyXG5cdCAqIG1lc3NhZ2VzLiBUaGUgZGVmYXVsdCB2YWx1ZSBpcyA8Y29kZT50cnVlPC9jb2RlPiwgd2hpY2ggbWVhbnMgdGhhdCBieVxyXG5cdCAqIGRlZmF1bHQgYW55IEludGVyYWN0aXZlT2JqZWN0IGluc3RhbmNlIHRoYXQgaXMgb24gdGhlIGRpc3BsYXkgbGlzdFxyXG5cdCAqIHJlY2VpdmVzIG1vdXNlIGV2ZW50cyBvciBvdGhlciB1c2VyIGlucHV0IGV2ZW50cy4gSWZcclxuXHQgKiA8Y29kZT5tb3VzZUVuYWJsZWQ8L2NvZGU+IGlzIHNldCB0byA8Y29kZT5mYWxzZTwvY29kZT4sIHRoZSBpbnN0YW5jZSBkb2VzXHJcblx0ICogbm90IHJlY2VpdmUgYW55IG1vdXNlIGV2ZW50cyhvciBvdGhlciB1c2VyIGlucHV0IGV2ZW50cyBsaWtlIGtleWJvYXJkXHJcblx0ICogZXZlbnRzKS4gQW55IGNoaWxkcmVuIG9mIHRoaXMgaW5zdGFuY2Ugb24gdGhlIGRpc3BsYXkgbGlzdCBhcmUgbm90XHJcblx0ICogYWZmZWN0ZWQuIFRvIGNoYW5nZSB0aGUgPGNvZGU+bW91c2VFbmFibGVkPC9jb2RlPiBiZWhhdmlvciBmb3IgYWxsXHJcblx0ICogY2hpbGRyZW4gb2YgYW4gb2JqZWN0IG9uIHRoZSBkaXNwbGF5IGxpc3QsIHVzZVxyXG5cdCAqIDxjb2RlPmZsYXNoLmRpc3BsYXkuRGlzcGxheU9iamVjdENvbnRhaW5lci5tb3VzZUNoaWxkcmVuPC9jb2RlPi5cclxuXHQgKlxyXG5cdCAqIDxwPiBObyBldmVudCBpcyBkaXNwYXRjaGVkIGJ5IHNldHRpbmcgdGhpcyBwcm9wZXJ0eS4gWW91IG11c3QgdXNlIHRoZVxyXG5cdCAqIDxjb2RlPmFkZEV2ZW50TGlzdGVuZXIoKTwvY29kZT4gbWV0aG9kIHRvIGNyZWF0ZSBpbnRlcmFjdGl2ZVxyXG5cdCAqIGZ1bmN0aW9uYWxpdHkuPC9wPlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgbW91c2VFbmFibGVkKCk6Ym9vbGVhblxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9leHBsaWNpdE1vdXNlRW5hYmxlZDtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgbW91c2VFbmFibGVkKHZhbHVlOmJvb2xlYW4pXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX2V4cGxpY2l0TW91c2VFbmFibGVkID09IHZhbHVlKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fZXhwbGljaXRNb3VzZUVuYWJsZWQgPSB2YWx1ZTtcclxuXHJcblx0XHR0aGlzLl9wVXBkYXRlSW1wbGljaXRNb3VzZUVuYWJsZWQodGhpcy5fcFBhcmVudD8gdGhpcy5fcFBhcmVudC5tb3VzZUNoaWxkcmVuIDogdHJ1ZSk7XHJcblx0fVxyXG5cclxuXHJcblx0LyoqXHJcblx0ICogSW5kaWNhdGVzIHRoZSB4IGNvb3JkaW5hdGUgb2YgdGhlIG1vdXNlIG9yIHVzZXIgaW5wdXQgZGV2aWNlIHBvc2l0aW9uLCBpblxyXG5cdCAqIHBpeGVscy5cclxuXHQgKlxyXG5cdCAqIDxwPjxiPk5vdGU8L2I+OiBGb3IgYSBEaXNwbGF5T2JqZWN0IHRoYXQgaGFzIGJlZW4gcm90YXRlZCwgdGhlIHJldHVybmVkIHhcclxuXHQgKiBjb29yZGluYXRlIHdpbGwgcmVmbGVjdCB0aGUgbm9uLXJvdGF0ZWQgb2JqZWN0LjwvcD5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IG1vdXNlWCgpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9tb3VzZVg7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJbmRpY2F0ZXMgdGhlIHkgY29vcmRpbmF0ZSBvZiB0aGUgbW91c2Ugb3IgdXNlciBpbnB1dCBkZXZpY2UgcG9zaXRpb24sIGluXHJcblx0ICogcGl4ZWxzLlxyXG5cdCAqXHJcblx0ICogPHA+PGI+Tm90ZTwvYj46IEZvciBhIERpc3BsYXlPYmplY3QgdGhhdCBoYXMgYmVlbiByb3RhdGVkLCB0aGUgcmV0dXJuZWQgeVxyXG5cdCAqIGNvb3JkaW5hdGUgd2lsbCByZWZsZWN0IHRoZSBub24tcm90YXRlZCBvYmplY3QuPC9wPlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgbW91c2VZKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX21vdXNlWTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluZGljYXRlcyB0aGUgaW5zdGFuY2UgbmFtZSBvZiB0aGUgRGlzcGxheU9iamVjdC4gVGhlIG9iamVjdCBjYW4gYmVcclxuXHQgKiBpZGVudGlmaWVkIGluIHRoZSBjaGlsZCBsaXN0IG9mIGl0cyBwYXJlbnQgZGlzcGxheSBvYmplY3QgY29udGFpbmVyIGJ5XHJcblx0ICogY2FsbGluZyB0aGUgPGNvZGU+Z2V0Q2hpbGRCeU5hbWUoKTwvY29kZT4gbWV0aG9kIG9mIHRoZSBkaXNwbGF5IG9iamVjdFxyXG5cdCAqIGNvbnRhaW5lci5cclxuXHQgKlxyXG5cdCAqIEB0aHJvd3MgSWxsZWdhbE9wZXJhdGlvbkVycm9yIElmIHlvdSBhcmUgYXR0ZW1wdGluZyB0byBzZXQgdGhpcyBwcm9wZXJ0eVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uIGFuIG9iamVjdCB0aGF0IHdhcyBwbGFjZWQgb24gdGhlIHRpbWVsaW5lXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW4gdGhlIEZsYXNoIGF1dGhvcmluZyB0b29sLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBuYW1lOnN0cmluZztcclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgb3JpZW50YXRpb25Nb2RlOnN0cmluZyA9IE9yaWVudGF0aW9uTW9kZS5ERUZBVUxUO1xyXG5cclxuXHQvKipcclxuXHQgKiBJbmRpY2F0ZXMgdGhlIERpc3BsYXlPYmplY3RDb250YWluZXIgb2JqZWN0IHRoYXQgY29udGFpbnMgdGhpcyBkaXNwbGF5XHJcblx0ICogb2JqZWN0LiBVc2UgdGhlIDxjb2RlPnBhcmVudDwvY29kZT4gcHJvcGVydHkgdG8gc3BlY2lmeSBhIHJlbGF0aXZlIHBhdGggdG9cclxuXHQgKiBkaXNwbGF5IG9iamVjdHMgdGhhdCBhcmUgYWJvdmUgdGhlIGN1cnJlbnQgZGlzcGxheSBvYmplY3QgaW4gdGhlIGRpc3BsYXlcclxuXHQgKiBsaXN0IGhpZXJhcmNoeS5cclxuXHQgKlxyXG5cdCAqIDxwPllvdSBjYW4gdXNlIDxjb2RlPnBhcmVudDwvY29kZT4gdG8gbW92ZSB1cCBtdWx0aXBsZSBsZXZlbHMgaW4gdGhlXHJcblx0ICogZGlzcGxheSBsaXN0IGFzIGluIHRoZSBmb2xsb3dpbmc6PC9wPlxyXG5cdCAqXHJcblx0ICogQHRocm93cyBTZWN1cml0eUVycm9yIFRoZSBwYXJlbnQgZGlzcGxheSBvYmplY3QgYmVsb25ncyB0byBhIHNlY3VyaXR5XHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIHNhbmRib3ggdG8gd2hpY2ggeW91IGRvIG5vdCBoYXZlIGFjY2Vzcy4gWW91IGNhblxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBhdm9pZCB0aGlzIHNpdHVhdGlvbiBieSBoYXZpbmcgdGhlIHBhcmVudCBtb3ZpZSBjYWxsXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIHRoZSA8Y29kZT5TZWN1cml0eS5hbGxvd0RvbWFpbigpPC9jb2RlPiBtZXRob2QuXHJcblx0ICovXHJcblx0cHVibGljIGdldCBwYXJlbnQoKTpEaXNwbGF5T2JqZWN0Q29udGFpbmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BQYXJlbnQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgcGFydGl0aW9uKCk6UGFydGl0aW9uXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2V4cGxpY2l0UGFydGl0aW9uO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBwYXJ0aXRpb24odmFsdWU6UGFydGl0aW9uKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9leHBsaWNpdFBhcnRpdGlvbiA9PSB2YWx1ZSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX2V4cGxpY2l0UGFydGl0aW9uID0gdmFsdWU7XHJcblxyXG5cdFx0dGhpcy5fcFVwZGF0ZUltcGxpY2l0UGFydGl0aW9uKHRoaXMuX3BQYXJlbnQ/IHRoaXMuX3BQYXJlbnQuX2lBc3NpZ25lZFBhcnRpdGlvbiA6IG51bGwsIHRoaXMuX3BTY2VuZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgcGlja2luZ0NvbGxpZGVyKCk6SVBpY2tpbmdDb2xsaWRlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9wUGlja2luZ0NvbGxpZGVyO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBwaWNraW5nQ29sbGlkZXIodmFsdWU6SVBpY2tpbmdDb2xsaWRlcilcclxuXHR7XHJcblx0XHR0aGlzLl9wUGlja2luZ0NvbGxpZGVyID0gdmFsdWU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEZWZpbmVzIHRoZSBsb2NhbCBwb2ludCBhcm91bmQgd2hpY2ggdGhlIG9iamVjdCByb3RhdGVzLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgcGl2b3QoKTpWZWN0b3IzRFxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9waXZvdDtcclxuXHR9XHJcblxyXG5cclxuXHRwdWJsaWMgc2V0IHBpdm90KHBpdm90OlZlY3RvcjNEKVxyXG5cdHtcclxuXHRcdHRoaXMuX3Bpdm90ID0gcGl2b3QuY2xvbmUoKTtcclxuXHJcblx0XHR0aGlzLmludmFsaWRhdGVQaXZvdCgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRm9yIGEgZGlzcGxheSBvYmplY3QgaW4gYSBsb2FkZWQgU1dGIGZpbGUsIHRoZSA8Y29kZT5yb290PC9jb2RlPiBwcm9wZXJ0eVxyXG5cdCAqIGlzIHRoZSB0b3AtbW9zdCBkaXNwbGF5IG9iamVjdCBpbiB0aGUgcG9ydGlvbiBvZiB0aGUgZGlzcGxheSBsaXN0J3MgdHJlZVxyXG5cdCAqIHN0cnVjdHVyZSByZXByZXNlbnRlZCBieSB0aGF0IFNXRiBmaWxlLiBGb3IgYSBCaXRtYXAgb2JqZWN0IHJlcHJlc2VudGluZyBhXHJcblx0ICogbG9hZGVkIGltYWdlIGZpbGUsIHRoZSA8Y29kZT5yb290PC9jb2RlPiBwcm9wZXJ0eSBpcyB0aGUgQml0bWFwIG9iamVjdFxyXG5cdCAqIGl0c2VsZi4gRm9yIHRoZSBpbnN0YW5jZSBvZiB0aGUgbWFpbiBjbGFzcyBvZiB0aGUgZmlyc3QgU1dGIGZpbGUgbG9hZGVkLFxyXG5cdCAqIHRoZSA8Y29kZT5yb290PC9jb2RlPiBwcm9wZXJ0eSBpcyB0aGUgZGlzcGxheSBvYmplY3QgaXRzZWxmLiBUaGVcclxuXHQgKiA8Y29kZT5yb290PC9jb2RlPiBwcm9wZXJ0eSBvZiB0aGUgU2NlbmUgb2JqZWN0IGlzIHRoZSBTY2VuZSBvYmplY3QgaXRzZWxmLlxyXG5cdCAqIFRoZSA8Y29kZT5yb290PC9jb2RlPiBwcm9wZXJ0eSBpcyBzZXQgdG8gPGNvZGU+bnVsbDwvY29kZT4gZm9yIGFueSBkaXNwbGF5XHJcblx0ICogb2JqZWN0IHRoYXQgaGFzIG5vdCBiZWVuIGFkZGVkIHRvIHRoZSBkaXNwbGF5IGxpc3QsIHVubGVzcyBpdCBoYXMgYmVlblxyXG5cdCAqIGFkZGVkIHRvIGEgZGlzcGxheSBvYmplY3QgY29udGFpbmVyIHRoYXQgaXMgb2ZmIHRoZSBkaXNwbGF5IGxpc3QgYnV0IHRoYXRcclxuXHQgKiBpcyBhIGNoaWxkIG9mIHRoZSB0b3AtbW9zdCBkaXNwbGF5IG9iamVjdCBpbiBhIGxvYWRlZCBTV0YgZmlsZS5cclxuXHQgKlxyXG5cdCAqIDxwPkZvciBleGFtcGxlLCBpZiB5b3UgY3JlYXRlIGEgbmV3IFNwcml0ZSBvYmplY3QgYnkgY2FsbGluZyB0aGVcclxuXHQgKiA8Y29kZT5TcHJpdGUoKTwvY29kZT4gY29uc3RydWN0b3IgbWV0aG9kLCBpdHMgPGNvZGU+cm9vdDwvY29kZT4gcHJvcGVydHlcclxuXHQgKiBpcyA8Y29kZT5udWxsPC9jb2RlPiB1bnRpbCB5b3UgYWRkIGl0IHRvIHRoZSBkaXNwbGF5IGxpc3Qob3IgdG8gYSBkaXNwbGF5XHJcblx0ICogb2JqZWN0IGNvbnRhaW5lciB0aGF0IGlzIG9mZiB0aGUgZGlzcGxheSBsaXN0IGJ1dCB0aGF0IGlzIGEgY2hpbGQgb2YgdGhlXHJcblx0ICogdG9wLW1vc3QgZGlzcGxheSBvYmplY3QgaW4gYSBTV0YgZmlsZSkuPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+Rm9yIGEgbG9hZGVkIFNXRiBmaWxlLCBldmVuIHRob3VnaCB0aGUgTG9hZGVyIG9iamVjdCB1c2VkIHRvIGxvYWQgdGhlXHJcblx0ICogZmlsZSBtYXkgbm90IGJlIG9uIHRoZSBkaXNwbGF5IGxpc3QsIHRoZSB0b3AtbW9zdCBkaXNwbGF5IG9iamVjdCBpbiB0aGVcclxuXHQgKiBTV0YgZmlsZSBoYXMgaXRzIDxjb2RlPnJvb3Q8L2NvZGU+IHByb3BlcnR5IHNldCB0byBpdHNlbGYuIFRoZSBMb2FkZXJcclxuXHQgKiBvYmplY3QgZG9lcyBub3QgaGF2ZSBpdHMgPGNvZGU+cm9vdDwvY29kZT4gcHJvcGVydHkgc2V0IHVudGlsIGl0IGlzIGFkZGVkXHJcblx0ICogYXMgYSBjaGlsZCBvZiBhIGRpc3BsYXkgb2JqZWN0IGZvciB3aGljaCB0aGUgPGNvZGU+cm9vdDwvY29kZT4gcHJvcGVydHkgaXNcclxuXHQgKiBzZXQuPC9wPlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgcm9vdCgpOkRpc3BsYXlPYmplY3RDb250YWluZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcm9vdDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluZGljYXRlcyB0aGUgcm90YXRpb24gb2YgdGhlIERpc3BsYXlPYmplY3QgaW5zdGFuY2UsIGluIGRlZ3JlZXMsIGZyb20gaXRzXHJcblx0ICogb3JpZ2luYWwgb3JpZW50YXRpb24uIFZhbHVlcyBmcm9tIDAgdG8gMTgwIHJlcHJlc2VudCBjbG9ja3dpc2Ugcm90YXRpb247XHJcblx0ICogdmFsdWVzIGZyb20gMCB0byAtMTgwIHJlcHJlc2VudCBjb3VudGVyY2xvY2t3aXNlIHJvdGF0aW9uLiBWYWx1ZXMgb3V0c2lkZVxyXG5cdCAqIHRoaXMgcmFuZ2UgYXJlIGFkZGVkIHRvIG9yIHN1YnRyYWN0ZWQgZnJvbSAzNjAgdG8gb2J0YWluIGEgdmFsdWUgd2l0aGluXHJcblx0ICogdGhlIHJhbmdlLiBGb3IgZXhhbXBsZSwgdGhlIHN0YXRlbWVudCA8Y29kZT5teV92aWRlby5yb3RhdGlvbiA9IDQ1MDwvY29kZT5cclxuXHQgKiBpcyB0aGUgc2FtZSBhcyA8Y29kZT4gbXlfdmlkZW8ucm90YXRpb24gPSA5MDwvY29kZT4uXHJcblx0ICovXHJcblx0cHVibGljIHJvdGF0aW9uOm51bWJlcjsgLy9UT0RPXHJcblxyXG5cdC8qKlxyXG5cdCAqIEluZGljYXRlcyB0aGUgeC1heGlzIHJvdGF0aW9uIG9mIHRoZSBEaXNwbGF5T2JqZWN0IGluc3RhbmNlLCBpbiBkZWdyZWVzLFxyXG5cdCAqIGZyb20gaXRzIG9yaWdpbmFsIG9yaWVudGF0aW9uIHJlbGF0aXZlIHRvIHRoZSAzRCBwYXJlbnQgY29udGFpbmVyLiBWYWx1ZXNcclxuXHQgKiBmcm9tIDAgdG8gMTgwIHJlcHJlc2VudCBjbG9ja3dpc2Ugcm90YXRpb247IHZhbHVlcyBmcm9tIDAgdG8gLTE4MFxyXG5cdCAqIHJlcHJlc2VudCBjb3VudGVyY2xvY2t3aXNlIHJvdGF0aW9uLiBWYWx1ZXMgb3V0c2lkZSB0aGlzIHJhbmdlIGFyZSBhZGRlZFxyXG5cdCAqIHRvIG9yIHN1YnRyYWN0ZWQgZnJvbSAzNjAgdG8gb2J0YWluIGEgdmFsdWUgd2l0aGluIHRoZSByYW5nZS5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHJvdGF0aW9uWCgpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9yb3RhdGlvblgqTWF0aENvbnN0cy5SQURJQU5TX1RPX0RFR1JFRVM7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHJvdGF0aW9uWCh2YWw6bnVtYmVyKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLnJvdGF0aW9uWCA9PSB2YWwpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9yb3RhdGlvblggPSB2YWwqTWF0aENvbnN0cy5ERUdSRUVTX1RPX1JBRElBTlM7XHJcblxyXG5cdFx0dGhpcy5pbnZhbGlkYXRlUm90YXRpb24oKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluZGljYXRlcyB0aGUgeS1heGlzIHJvdGF0aW9uIG9mIHRoZSBEaXNwbGF5T2JqZWN0IGluc3RhbmNlLCBpbiBkZWdyZWVzLFxyXG5cdCAqIGZyb20gaXRzIG9yaWdpbmFsIG9yaWVudGF0aW9uIHJlbGF0aXZlIHRvIHRoZSAzRCBwYXJlbnQgY29udGFpbmVyLiBWYWx1ZXNcclxuXHQgKiBmcm9tIDAgdG8gMTgwIHJlcHJlc2VudCBjbG9ja3dpc2Ugcm90YXRpb247IHZhbHVlcyBmcm9tIDAgdG8gLTE4MFxyXG5cdCAqIHJlcHJlc2VudCBjb3VudGVyY2xvY2t3aXNlIHJvdGF0aW9uLiBWYWx1ZXMgb3V0c2lkZSB0aGlzIHJhbmdlIGFyZSBhZGRlZFxyXG5cdCAqIHRvIG9yIHN1YnRyYWN0ZWQgZnJvbSAzNjAgdG8gb2J0YWluIGEgdmFsdWUgd2l0aGluIHRoZSByYW5nZS5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHJvdGF0aW9uWSgpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9yb3RhdGlvblkqTWF0aENvbnN0cy5SQURJQU5TX1RPX0RFR1JFRVM7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHJvdGF0aW9uWSh2YWw6bnVtYmVyKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLnJvdGF0aW9uWSA9PSB2YWwpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9yb3RhdGlvblkgPSB2YWwqTWF0aENvbnN0cy5ERUdSRUVTX1RPX1JBRElBTlM7XHJcblxyXG5cdFx0dGhpcy5pbnZhbGlkYXRlUm90YXRpb24oKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluZGljYXRlcyB0aGUgei1heGlzIHJvdGF0aW9uIG9mIHRoZSBEaXNwbGF5T2JqZWN0IGluc3RhbmNlLCBpbiBkZWdyZWVzLFxyXG5cdCAqIGZyb20gaXRzIG9yaWdpbmFsIG9yaWVudGF0aW9uIHJlbGF0aXZlIHRvIHRoZSAzRCBwYXJlbnQgY29udGFpbmVyLiBWYWx1ZXNcclxuXHQgKiBmcm9tIDAgdG8gMTgwIHJlcHJlc2VudCBjbG9ja3dpc2Ugcm90YXRpb247IHZhbHVlcyBmcm9tIDAgdG8gLTE4MFxyXG5cdCAqIHJlcHJlc2VudCBjb3VudGVyY2xvY2t3aXNlIHJvdGF0aW9uLiBWYWx1ZXMgb3V0c2lkZSB0aGlzIHJhbmdlIGFyZSBhZGRlZFxyXG5cdCAqIHRvIG9yIHN1YnRyYWN0ZWQgZnJvbSAzNjAgdG8gb2J0YWluIGEgdmFsdWUgd2l0aGluIHRoZSByYW5nZS5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHJvdGF0aW9uWigpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9yb3RhdGlvbloqTWF0aENvbnN0cy5SQURJQU5TX1RPX0RFR1JFRVM7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHJvdGF0aW9uWih2YWw6bnVtYmVyKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLnJvdGF0aW9uWiA9PSB2YWwpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9yb3RhdGlvblogPSB2YWwqTWF0aENvbnN0cy5ERUdSRUVTX1RPX1JBRElBTlM7XHJcblxyXG5cdFx0dGhpcy5pbnZhbGlkYXRlUm90YXRpb24oKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBjdXJyZW50IHNjYWxpbmcgZ3JpZCB0aGF0IGlzIGluIGVmZmVjdC4gSWYgc2V0IHRvIDxjb2RlPm51bGw8L2NvZGU+LFxyXG5cdCAqIHRoZSBlbnRpcmUgZGlzcGxheSBvYmplY3QgaXMgc2NhbGVkIG5vcm1hbGx5IHdoZW4gYW55IHNjYWxlIHRyYW5zZm9ybWF0aW9uXHJcblx0ICogaXMgYXBwbGllZC5cclxuXHQgKlxyXG5cdCAqIDxwPldoZW4geW91IGRlZmluZSB0aGUgPGNvZGU+c2NhbGU5R3JpZDwvY29kZT4gcHJvcGVydHksIHRoZSBkaXNwbGF5XHJcblx0ICogb2JqZWN0IGlzIGRpdmlkZWQgaW50byBhIGdyaWQgd2l0aCBuaW5lIHJlZ2lvbnMgYmFzZWQgb24gdGhlXHJcblx0ICogPGNvZGU+c2NhbGU5R3JpZDwvY29kZT4gcmVjdGFuZ2xlLCB3aGljaCBkZWZpbmVzIHRoZSBjZW50ZXIgcmVnaW9uIG9mIHRoZVxyXG5cdCAqIGdyaWQuIFRoZSBlaWdodCBvdGhlciByZWdpb25zIG9mIHRoZSBncmlkIGFyZSB0aGUgZm9sbG93aW5nIGFyZWFzOiA8L3A+XHJcblx0ICpcclxuXHQgKiA8dWw+XHJcblx0ICogICA8bGk+VGhlIHVwcGVyLWxlZnQgY29ybmVyIG91dHNpZGUgb2YgdGhlIHJlY3RhbmdsZTwvbGk+XHJcblx0ICogICA8bGk+VGhlIGFyZWEgYWJvdmUgdGhlIHJlY3RhbmdsZSA8L2xpPlxyXG5cdCAqICAgPGxpPlRoZSB1cHBlci1yaWdodCBjb3JuZXIgb3V0c2lkZSBvZiB0aGUgcmVjdGFuZ2xlPC9saT5cclxuXHQgKiAgIDxsaT5UaGUgYXJlYSB0byB0aGUgbGVmdCBvZiB0aGUgcmVjdGFuZ2xlPC9saT5cclxuXHQgKiAgIDxsaT5UaGUgYXJlYSB0byB0aGUgcmlnaHQgb2YgdGhlIHJlY3RhbmdsZTwvbGk+XHJcblx0ICogICA8bGk+VGhlIGxvd2VyLWxlZnQgY29ybmVyIG91dHNpZGUgb2YgdGhlIHJlY3RhbmdsZTwvbGk+XHJcblx0ICogICA8bGk+VGhlIGFyZWEgYmVsb3cgdGhlIHJlY3RhbmdsZTwvbGk+XHJcblx0ICogICA8bGk+VGhlIGxvd2VyLXJpZ2h0IGNvcm5lciBvdXRzaWRlIG9mIHRoZSByZWN0YW5nbGU8L2xpPlxyXG5cdCAqIDwvdWw+XHJcblx0ICpcclxuXHQgKiA8cD5Zb3UgY2FuIHRoaW5rIG9mIHRoZSBlaWdodCByZWdpb25zIG91dHNpZGUgb2YgdGhlIGNlbnRlcihkZWZpbmVkIGJ5XHJcblx0ICogdGhlIHJlY3RhbmdsZSkgYXMgYmVpbmcgbGlrZSBhIHBpY3R1cmUgZnJhbWUgdGhhdCBoYXMgc3BlY2lhbCBydWxlc1xyXG5cdCAqIGFwcGxpZWQgdG8gaXQgd2hlbiBzY2FsZWQuPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+V2hlbiB0aGUgPGNvZGU+c2NhbGU5R3JpZDwvY29kZT4gcHJvcGVydHkgaXMgc2V0IGFuZCBhIGRpc3BsYXkgb2JqZWN0XHJcblx0ICogaXMgc2NhbGVkLCBhbGwgdGV4dCBhbmQgZ3JhZGllbnRzIGFyZSBzY2FsZWQgbm9ybWFsbHk7IGhvd2V2ZXIsIGZvciBvdGhlclxyXG5cdCAqIHR5cGVzIG9mIG9iamVjdHMgdGhlIGZvbGxvd2luZyBydWxlcyBhcHBseTo8L3A+XHJcblx0ICpcclxuXHQgKiA8dWw+XHJcblx0ICogICA8bGk+Q29udGVudCBpbiB0aGUgY2VudGVyIHJlZ2lvbiBpcyBzY2FsZWQgbm9ybWFsbHkuIDwvbGk+XHJcblx0ICogICA8bGk+Q29udGVudCBpbiB0aGUgY29ybmVycyBpcyBub3Qgc2NhbGVkLiA8L2xpPlxyXG5cdCAqICAgPGxpPkNvbnRlbnQgaW4gdGhlIHRvcCBhbmQgYm90dG9tIHJlZ2lvbnMgaXMgc2NhbGVkIGhvcml6b250YWxseSBvbmx5LlxyXG5cdCAqIENvbnRlbnQgaW4gdGhlIGxlZnQgYW5kIHJpZ2h0IHJlZ2lvbnMgaXMgc2NhbGVkIHZlcnRpY2FsbHkgb25seS48L2xpPlxyXG5cdCAqICAgPGxpPkFsbCBmaWxscyhpbmNsdWRpbmcgYml0bWFwcywgdmlkZW8sIGFuZCBncmFkaWVudHMpIGFyZSBzdHJldGNoZWQgdG9cclxuXHQgKiBmaXQgdGhlaXIgc2hhcGVzLjwvbGk+XHJcblx0ICogPC91bD5cclxuXHQgKlxyXG5cdCAqIDxwPklmIGEgZGlzcGxheSBvYmplY3QgaXMgcm90YXRlZCwgYWxsIHN1YnNlcXVlbnQgc2NhbGluZyBpcyBub3JtYWwoYW5kXHJcblx0ICogdGhlIDxjb2RlPnNjYWxlOUdyaWQ8L2NvZGU+IHByb3BlcnR5IGlzIGlnbm9yZWQpLjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPkZvciBleGFtcGxlLCBjb25zaWRlciB0aGUgZm9sbG93aW5nIGRpc3BsYXkgb2JqZWN0IGFuZCBhIHJlY3RhbmdsZSB0aGF0XHJcblx0ICogaXMgYXBwbGllZCBhcyB0aGUgZGlzcGxheSBvYmplY3QncyA8Y29kZT5zY2FsZTlHcmlkPC9jb2RlPjo8L3A+XHJcblx0ICpcclxuXHQgKiA8cD5BIGNvbW1vbiB1c2UgZm9yIHNldHRpbmcgPGNvZGU+c2NhbGU5R3JpZDwvY29kZT4gaXMgdG8gc2V0IHVwIGEgZGlzcGxheVxyXG5cdCAqIG9iamVjdCB0byBiZSB1c2VkIGFzIGEgY29tcG9uZW50LCBpbiB3aGljaCBlZGdlIHJlZ2lvbnMgcmV0YWluIHRoZSBzYW1lXHJcblx0ICogd2lkdGggd2hlbiB0aGUgY29tcG9uZW50IGlzIHNjYWxlZC48L3A+XHJcblx0ICpcclxuXHQgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgSWYgeW91IHBhc3MgYW4gaW52YWxpZCBhcmd1bWVudCB0byB0aGUgbWV0aG9kLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzY2FsZTlHcmlkOlJlY3RhbmdsZTtcclxuXHJcblx0LyoqXHJcblx0ICogSW5kaWNhdGVzIHRoZSBob3Jpem9udGFsIHNjYWxlKHBlcmNlbnRhZ2UpIG9mIHRoZSBvYmplY3QgYXMgYXBwbGllZCBmcm9tXHJcblx0ICogdGhlIHJlZ2lzdHJhdGlvbiBwb2ludC4gVGhlIGRlZmF1bHQgcmVnaXN0cmF0aW9uIHBvaW50IGlzKDAsMCkuIDEuMFxyXG5cdCAqIGVxdWFscyAxMDAlIHNjYWxlLlxyXG5cdCAqXHJcblx0ICogPHA+U2NhbGluZyB0aGUgbG9jYWwgY29vcmRpbmF0ZSBzeXN0ZW0gY2hhbmdlcyB0aGUgPGNvZGU+eDwvY29kZT4gYW5kXHJcblx0ICogPGNvZGU+eTwvY29kZT4gcHJvcGVydHkgdmFsdWVzLCB3aGljaCBhcmUgZGVmaW5lZCBpbiB3aG9sZSBwaXhlbHMuIDwvcD5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHNjYWxlWCgpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9wU2NhbGVYO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBzY2FsZVgodmFsOm51bWJlcilcclxuXHR7XHJcblx0XHQvL3JlbW92ZSBhYnNvbHV0ZSB3aWR0aFxyXG5cdFx0dGhpcy5fd2lkdGggPSBudWxsO1xyXG5cclxuXHRcdGlmICh0aGlzLl9wU2NhbGVYID09IHZhbClcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX3BTY2FsZVggPSB2YWw7XHJcblxyXG5cdFx0dGhpcy5pbnZhbGlkYXRlU2NhbGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluZGljYXRlcyB0aGUgdmVydGljYWwgc2NhbGUocGVyY2VudGFnZSkgb2YgYW4gb2JqZWN0IGFzIGFwcGxpZWQgZnJvbSB0aGVcclxuXHQgKiByZWdpc3RyYXRpb24gcG9pbnQgb2YgdGhlIG9iamVjdC4gVGhlIGRlZmF1bHQgcmVnaXN0cmF0aW9uIHBvaW50IGlzKDAsMCkuXHJcblx0ICogMS4wIGlzIDEwMCUgc2NhbGUuXHJcblx0ICpcclxuXHQgKiA8cD5TY2FsaW5nIHRoZSBsb2NhbCBjb29yZGluYXRlIHN5c3RlbSBjaGFuZ2VzIHRoZSA8Y29kZT54PC9jb2RlPiBhbmRcclxuXHQgKiA8Y29kZT55PC9jb2RlPiBwcm9wZXJ0eSB2YWx1ZXMsIHdoaWNoIGFyZSBkZWZpbmVkIGluIHdob2xlIHBpeGVscy4gPC9wPlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgc2NhbGVZKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BTY2FsZVk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHNjYWxlWSh2YWw6bnVtYmVyKVxyXG5cdHtcclxuXHRcdC8vcmVtb3ZlIGFic29sdXRlIGhlaWdodFxyXG5cdFx0dGhpcy5faGVpZ2h0ID0gbnVsbDtcclxuXHJcblx0XHRpZiAodGhpcy5fcFNjYWxlWSA9PSB2YWwpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9wU2NhbGVZID0gdmFsO1xyXG5cclxuXHRcdHRoaXMuaW52YWxpZGF0ZVNjYWxlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJbmRpY2F0ZXMgdGhlIGRlcHRoIHNjYWxlKHBlcmNlbnRhZ2UpIG9mIGFuIG9iamVjdCBhcyBhcHBsaWVkIGZyb20gdGhlXHJcblx0ICogcmVnaXN0cmF0aW9uIHBvaW50IG9mIHRoZSBvYmplY3QuIFRoZSBkZWZhdWx0IHJlZ2lzdHJhdGlvbiBwb2ludCBpcygwLDApLlxyXG5cdCAqIDEuMCBpcyAxMDAlIHNjYWxlLlxyXG5cdCAqXHJcblx0ICogPHA+U2NhbGluZyB0aGUgbG9jYWwgY29vcmRpbmF0ZSBzeXN0ZW0gY2hhbmdlcyB0aGUgPGNvZGU+eDwvY29kZT4sXHJcblx0ICogPGNvZGU+eTwvY29kZT4gYW5kIDxjb2RlPno8L2NvZGU+IHByb3BlcnR5IHZhbHVlcywgd2hpY2ggYXJlIGRlZmluZWQgaW5cclxuXHQgKiB3aG9sZSBwaXhlbHMuIDwvcD5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHNjYWxlWigpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9wU2NhbGVaO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBzY2FsZVoodmFsOm51bWJlcilcclxuXHR7XHJcblx0XHQvL3JlbW92ZSBhYnNvbHV0ZSBkZXB0aFxyXG5cdFx0dGhpcy5fZGVwdGggPSBudWxsO1xyXG5cclxuXHRcdGlmICh0aGlzLl9wU2NhbGVaID09IHZhbClcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX3BTY2FsZVogPSB2YWw7XHJcblxyXG5cdFx0dGhpcy5pbnZhbGlkYXRlU2NhbGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCBzY2VuZSgpOlNjZW5lXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BTY2VuZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCBzY2VuZVBvc2l0aW9uKCk6VmVjdG9yM0RcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fc2NlbmVQb3NpdGlvbkRpcnR5KSB7XHJcblx0XHRcdGlmICghdGhpcy5fcGl2b3RaZXJvICYmIHRoaXMuYWxpZ25tZW50TW9kZSA9PSBBbGlnbm1lbnRNb2RlLlBJVk9UX1BPSU5UKSB7XHJcblx0XHRcdFx0dGhpcy5fc2NlbmVQb3NpdGlvbiA9IHRoaXMuc2NlbmVUcmFuc2Zvcm0udHJhbnNmb3JtVmVjdG9yKHRoaXMuX3Bpdm90U2NhbGUpO1xyXG5cdFx0XHRcdC8vdGhpcy5fc2NlbmVQb3NpdGlvbi5kZWNyZW1lbnRCeShuZXcgVmVjdG9yM0QodGhpcy5fcGl2b3QueCp0aGlzLl9wU2NhbGVYLCB0aGlzLl9waXZvdC55KnRoaXMuX3BTY2FsZVksIHRoaXMuX3Bpdm90LnoqdGhpcy5fcFNjYWxlWikpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuc2NlbmVUcmFuc2Zvcm0uY29weUNvbHVtblRvKDMsIHRoaXMuX3NjZW5lUG9zaXRpb24pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLl9zY2VuZVBvc2l0aW9uRGlydHkgPSBmYWxzZTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzLl9zY2VuZVBvc2l0aW9uO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGdldCBzY2VuZVRyYW5zZm9ybSgpOk1hdHJpeDNEXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX3BTY2VuZVRyYW5zZm9ybURpcnR5KVxyXG5cdFx0XHR0aGlzLnBVcGRhdGVTY2VuZVRyYW5zZm9ybSgpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLl9wU2NlbmVUcmFuc2Zvcm07XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgc2Nyb2xsIHJlY3RhbmdsZSBib3VuZHMgb2YgdGhlIGRpc3BsYXkgb2JqZWN0LiBUaGUgZGlzcGxheSBvYmplY3QgaXNcclxuXHQgKiBjcm9wcGVkIHRvIHRoZSBzaXplIGRlZmluZWQgYnkgdGhlIHJlY3RhbmdsZSwgYW5kIGl0IHNjcm9sbHMgd2l0aGluIHRoZVxyXG5cdCAqIHJlY3RhbmdsZSB3aGVuIHlvdSBjaGFuZ2UgdGhlIDxjb2RlPng8L2NvZGU+IGFuZCA8Y29kZT55PC9jb2RlPiBwcm9wZXJ0aWVzXHJcblx0ICogb2YgdGhlIDxjb2RlPnNjcm9sbFJlY3Q8L2NvZGU+IG9iamVjdC5cclxuXHQgKlxyXG5cdCAqIDxwPlRoZSBwcm9wZXJ0aWVzIG9mIHRoZSA8Y29kZT5zY3JvbGxSZWN0PC9jb2RlPiBSZWN0YW5nbGUgb2JqZWN0IHVzZSB0aGVcclxuXHQgKiBkaXNwbGF5IG9iamVjdCdzIGNvb3JkaW5hdGUgc3BhY2UgYW5kIGFyZSBzY2FsZWQganVzdCBsaWtlIHRoZSBvdmVyYWxsXHJcblx0ICogZGlzcGxheSBvYmplY3QuIFRoZSBjb3JuZXIgYm91bmRzIG9mIHRoZSBjcm9wcGVkIHdpbmRvdyBvbiB0aGUgc2Nyb2xsaW5nXHJcblx0ICogZGlzcGxheSBvYmplY3QgYXJlIHRoZSBvcmlnaW4gb2YgdGhlIGRpc3BsYXkgb2JqZWN0KDAsMCkgYW5kIHRoZSBwb2ludFxyXG5cdCAqIGRlZmluZWQgYnkgdGhlIHdpZHRoIGFuZCBoZWlnaHQgb2YgdGhlIHJlY3RhbmdsZS4gVGhleSBhcmUgbm90IGNlbnRlcmVkXHJcblx0ICogYXJvdW5kIHRoZSBvcmlnaW4sIGJ1dCB1c2UgdGhlIG9yaWdpbiB0byBkZWZpbmUgdGhlIHVwcGVyLWxlZnQgY29ybmVyIG9mXHJcblx0ICogdGhlIGFyZWEuIEEgc2Nyb2xsZWQgZGlzcGxheSBvYmplY3QgYWx3YXlzIHNjcm9sbHMgaW4gd2hvbGUgcGl4ZWxcclxuXHQgKiBpbmNyZW1lbnRzLiA8L3A+XHJcblx0ICpcclxuXHQgKiA8cD5Zb3UgY2FuIHNjcm9sbCBhbiBvYmplY3QgbGVmdCBhbmQgcmlnaHQgYnkgc2V0dGluZyB0aGUgPGNvZGU+eDwvY29kZT5cclxuXHQgKiBwcm9wZXJ0eSBvZiB0aGUgPGNvZGU+c2Nyb2xsUmVjdDwvY29kZT4gUmVjdGFuZ2xlIG9iamVjdC4gWW91IGNhbiBzY3JvbGxcclxuXHQgKiBhbiBvYmplY3QgdXAgYW5kIGRvd24gYnkgc2V0dGluZyB0aGUgPGNvZGU+eTwvY29kZT4gcHJvcGVydHkgb2YgdGhlXHJcblx0ICogPGNvZGU+c2Nyb2xsUmVjdDwvY29kZT4gUmVjdGFuZ2xlIG9iamVjdC4gSWYgdGhlIGRpc3BsYXkgb2JqZWN0IGlzIHJvdGF0ZWRcclxuXHQgKiA5MMKwIGFuZCB5b3Ugc2Nyb2xsIGl0IGxlZnQgYW5kIHJpZ2h0LCB0aGUgZGlzcGxheSBvYmplY3QgYWN0dWFsbHkgc2Nyb2xsc1xyXG5cdCAqIHVwIGFuZCBkb3duLjwvcD5cclxuXHQgKi9cclxuXHRwdWJsaWMgc2Nyb2xsUmVjdDpSZWN0YW5nbGU7XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCBzaGFkZXJQaWNraW5nRGV0YWlscygpOmJvb2xlYW5cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fc2hhZGVyUGlja2luZ0RldGFpbHM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgZGVidWdWaXNpYmxlKCk6Ym9vbGVhblxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9kZWJ1Z1Zpc2libGU7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IGRlYnVnVmlzaWJsZSh2YWx1ZTpib29sZWFuKVxyXG5cdHtcclxuXHRcdGlmICh2YWx1ZSA9PSB0aGlzLl9kZWJ1Z1Zpc2libGUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9kZWJ1Z1Zpc2libGUgPSB2YWx1ZTtcclxuXHJcblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX2VudGl0eU5vZGVzLmxlbmd0aDtcclxuXHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IGxlbjsgaSsrKVxyXG5cdFx0XHR0aGlzLl9lbnRpdHlOb2Rlc1tpXS5kZWJ1Z1Zpc2libGUgPSB0aGlzLl9kZWJ1Z1Zpc2libGU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBbiBvYmplY3Qgd2l0aCBwcm9wZXJ0aWVzIHBlcnRhaW5pbmcgdG8gYSBkaXNwbGF5IG9iamVjdCdzIG1hdHJpeCwgY29sb3JcclxuXHQgKiB0cmFuc2Zvcm0sIGFuZCBwaXhlbCBib3VuZHMuIFRoZSBzcGVjaWZpYyBwcm9wZXJ0aWVzICAtICBtYXRyaXgsXHJcblx0ICogY29sb3JUcmFuc2Zvcm0sIGFuZCB0aHJlZSByZWFkLW9ubHkgcHJvcGVydGllc1xyXG5cdCAqICg8Y29kZT5jb25jYXRlbmF0ZWRNYXRyaXg8L2NvZGU+LCA8Y29kZT5jb25jYXRlbmF0ZWRDb2xvclRyYW5zZm9ybTwvY29kZT4sXHJcblx0ICogYW5kIDxjb2RlPnBpeGVsQm91bmRzPC9jb2RlPikgIC0gIGFyZSBkZXNjcmliZWQgaW4gdGhlIGVudHJ5IGZvciB0aGVcclxuXHQgKiBUcmFuc2Zvcm0gY2xhc3MuXHJcblx0ICpcclxuXHQgKiA8cD5FYWNoIG9mIHRoZSB0cmFuc2Zvcm0gb2JqZWN0J3MgcHJvcGVydGllcyBpcyBpdHNlbGYgYW4gb2JqZWN0LiBUaGlzXHJcblx0ICogY29uY2VwdCBpcyBpbXBvcnRhbnQgYmVjYXVzZSB0aGUgb25seSB3YXkgdG8gc2V0IG5ldyB2YWx1ZXMgZm9yIHRoZSBtYXRyaXhcclxuXHQgKiBvciBjb2xvclRyYW5zZm9ybSBvYmplY3RzIGlzIHRvIGNyZWF0ZSBhIG5ldyBvYmplY3QgYW5kIGNvcHkgdGhhdCBvYmplY3RcclxuXHQgKiBpbnRvIHRoZSB0cmFuc2Zvcm0ubWF0cml4IG9yIHRyYW5zZm9ybS5jb2xvclRyYW5zZm9ybSBwcm9wZXJ0eS48L3A+XHJcblx0ICpcclxuXHQgKiA8cD5Gb3IgZXhhbXBsZSwgdG8gaW5jcmVhc2UgdGhlIDxjb2RlPnR4PC9jb2RlPiB2YWx1ZSBvZiBhIGRpc3BsYXlcclxuXHQgKiBvYmplY3QncyBtYXRyaXgsIHlvdSBtdXN0IG1ha2UgYSBjb3B5IG9mIHRoZSBlbnRpcmUgbWF0cml4IG9iamVjdCwgdGhlblxyXG5cdCAqIGNvcHkgdGhlIG5ldyBvYmplY3QgaW50byB0aGUgbWF0cml4IHByb3BlcnR5IG9mIHRoZSB0cmFuc2Zvcm0gb2JqZWN0OjwvcD5cclxuXHQgKiA8cHJlIHhtbDpzcGFjZT1cInByZXNlcnZlXCI+PGNvZGU+IHB1YmxpYyBteU1hdHJpeDpNYXRyaXggPVxyXG5cdCAqIG15RGlzcGxheU9iamVjdC50cmFuc2Zvcm0ubWF0cml4OyBteU1hdHJpeC50eCArPSAxMDtcclxuXHQgKiBteURpc3BsYXlPYmplY3QudHJhbnNmb3JtLm1hdHJpeCA9IG15TWF0cml4OyA8L2NvZGU+PC9wcmU+XHJcblx0ICpcclxuXHQgKiA8cD5Zb3UgY2Fubm90IGRpcmVjdGx5IHNldCB0aGUgPGNvZGU+dHg8L2NvZGU+IHByb3BlcnR5LiBUaGUgZm9sbG93aW5nXHJcblx0ICogY29kZSBoYXMgbm8gZWZmZWN0IG9uIDxjb2RlPm15RGlzcGxheU9iamVjdDwvY29kZT46IDwvcD5cclxuXHQgKiA8cHJlIHhtbDpzcGFjZT1cInByZXNlcnZlXCI+PGNvZGU+IG15RGlzcGxheU9iamVjdC50cmFuc2Zvcm0ubWF0cml4LnR4ICs9XHJcblx0ICogMTA7IDwvY29kZT48L3ByZT5cclxuXHQgKlxyXG5cdCAqIDxwPllvdSBjYW4gYWxzbyBjb3B5IGFuIGVudGlyZSB0cmFuc2Zvcm0gb2JqZWN0IGFuZCBhc3NpZ24gaXQgdG8gYW5vdGhlclxyXG5cdCAqIGRpc3BsYXkgb2JqZWN0J3MgdHJhbnNmb3JtIHByb3BlcnR5LiBGb3IgZXhhbXBsZSwgdGhlIGZvbGxvd2luZyBjb2RlXHJcblx0ICogY29waWVzIHRoZSBlbnRpcmUgdHJhbnNmb3JtIG9iamVjdCBmcm9tIDxjb2RlPm15T2xkRGlzcGxheU9iajwvY29kZT4gdG9cclxuXHQgKiA8Y29kZT5teU5ld0Rpc3BsYXlPYmo8L2NvZGU+OjwvcD5cclxuXHQgKiA8Y29kZT5teU5ld0Rpc3BsYXlPYmoudHJhbnNmb3JtID0gbXlPbGREaXNwbGF5T2JqLnRyYW5zZm9ybTs8L2NvZGU+XHJcblx0ICpcclxuXHQgKiA8cD5UaGUgcmVzdWx0aW5nIGRpc3BsYXkgb2JqZWN0LCA8Y29kZT5teU5ld0Rpc3BsYXlPYmo8L2NvZGU+LCBub3cgaGFzIHRoZVxyXG5cdCAqIHNhbWUgdmFsdWVzIGZvciBpdHMgbWF0cml4LCBjb2xvciB0cmFuc2Zvcm0sIGFuZCBwaXhlbCBib3VuZHMgYXMgdGhlIG9sZFxyXG5cdCAqIGRpc3BsYXkgb2JqZWN0LCA8Y29kZT5teU9sZERpc3BsYXlPYmo8L2NvZGU+LjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPk5vdGUgdGhhdCBBSVIgZm9yIFRWIGRldmljZXMgdXNlIGhhcmR3YXJlIGFjY2VsZXJhdGlvbiwgaWYgaXQgaXNcclxuXHQgKiBhdmFpbGFibGUsIGZvciBjb2xvciB0cmFuc2Zvcm1zLjwvcD5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHRyYW5zZm9ybSgpOlRyYW5zZm9ybVxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl90cmFuc2Zvcm07XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBXaGV0aGVyIG9yIG5vdCB0aGUgZGlzcGxheSBvYmplY3QgaXMgdmlzaWJsZS4gRGlzcGxheSBvYmplY3RzIHRoYXQgYXJlIG5vdFxyXG5cdCAqIHZpc2libGUgYXJlIGRpc2FibGVkLiBGb3IgZXhhbXBsZSwgaWYgPGNvZGU+dmlzaWJsZT1mYWxzZTwvY29kZT4gZm9yIGFuXHJcblx0ICogSW50ZXJhY3RpdmVPYmplY3QgaW5zdGFuY2UsIGl0IGNhbm5vdCBiZSBjbGlja2VkLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgdmlzaWJsZSgpOmJvb2xlYW5cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fZXhwbGljaXRWaXNpYmlsaXR5O1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCB2aXNpYmxlKHZhbHVlOmJvb2xlYW4pXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX2V4cGxpY2l0VmlzaWJpbGl0eSA9PSB2YWx1ZSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX2V4cGxpY2l0VmlzaWJpbGl0eSA9IHZhbHVlO1xyXG5cclxuXHRcdHRoaXMuX3BVcGRhdGVJbXBsaWNpdFZpc2liaWxpdHkodGhpcy5fcFBhcmVudD8gdGhpcy5fcFBhcmVudC5faUlzVmlzaWJsZSgpIDogdHJ1ZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJbmRpY2F0ZXMgdGhlIHdpZHRoIG9mIHRoZSBkaXNwbGF5IG9iamVjdCwgaW4gcGl4ZWxzLiBUaGUgd2lkdGggaXNcclxuXHQgKiBjYWxjdWxhdGVkIGJhc2VkIG9uIHRoZSBib3VuZHMgb2YgdGhlIGNvbnRlbnQgb2YgdGhlIGRpc3BsYXkgb2JqZWN0LiBXaGVuXHJcblx0ICogeW91IHNldCB0aGUgPGNvZGU+d2lkdGg8L2NvZGU+IHByb3BlcnR5LCB0aGUgPGNvZGU+c2NhbGVYPC9jb2RlPiBwcm9wZXJ0eVxyXG5cdCAqIGlzIGFkanVzdGVkIGFjY29yZGluZ2x5LCBhcyBzaG93biBpbiB0aGUgZm9sbG93aW5nIGNvZGU6XHJcblx0ICpcclxuXHQgKiA8cD5FeGNlcHQgZm9yIFRleHRGaWVsZCBhbmQgVmlkZW8gb2JqZWN0cywgYSBkaXNwbGF5IG9iamVjdCB3aXRoIG5vXHJcblx0ICogY29udGVudChzdWNoIGFzIGFuIGVtcHR5IHNwcml0ZSkgaGFzIGEgd2lkdGggb2YgMCwgZXZlbiBpZiB5b3UgdHJ5IHRvIHNldFxyXG5cdCAqIDxjb2RlPndpZHRoPC9jb2RlPiB0byBhIGRpZmZlcmVudCB2YWx1ZS48L3A+XHJcblx0ICovXHJcblx0cHVibGljIGdldCB3aWR0aCgpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLmdldEJveCgpLndpZHRoKnRoaXMuX3BTY2FsZVg7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHdpZHRoKHZhbDpudW1iZXIpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX3dpZHRoID09IHZhbClcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX3dpZHRoID0gdmFsO1xyXG5cclxuXHRcdHRoaXMuX3BTY2FsZVggPSB2YWwvdGhpcy5nZXRCb3goKS53aWR0aDtcclxuXHJcblx0XHR0aGlzLmludmFsaWRhdGVTY2FsZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSW5kaWNhdGVzIHRoZSA8aT54PC9pPiBjb29yZGluYXRlIG9mIHRoZSBEaXNwbGF5T2JqZWN0IGluc3RhbmNlIHJlbGF0aXZlXHJcblx0ICogdG8gdGhlIGxvY2FsIGNvb3JkaW5hdGVzIG9mIHRoZSBwYXJlbnQgRGlzcGxheU9iamVjdENvbnRhaW5lci4gSWYgdGhlXHJcblx0ICogb2JqZWN0IGlzIGluc2lkZSBhIERpc3BsYXlPYmplY3RDb250YWluZXIgdGhhdCBoYXMgdHJhbnNmb3JtYXRpb25zLCBpdCBpc1xyXG5cdCAqIGluIHRoZSBsb2NhbCBjb29yZGluYXRlIHN5c3RlbSBvZiB0aGUgZW5jbG9zaW5nIERpc3BsYXlPYmplY3RDb250YWluZXIuXHJcblx0ICogVGh1cywgZm9yIGEgRGlzcGxheU9iamVjdENvbnRhaW5lciByb3RhdGVkIDkwwrAgY291bnRlcmNsb2Nrd2lzZSwgdGhlXHJcblx0ICogRGlzcGxheU9iamVjdENvbnRhaW5lcidzIGNoaWxkcmVuIGluaGVyaXQgYSBjb29yZGluYXRlIHN5c3RlbSB0aGF0IGlzXHJcblx0ICogcm90YXRlZCA5MMKwIGNvdW50ZXJjbG9ja3dpc2UuIFRoZSBvYmplY3QncyBjb29yZGluYXRlcyByZWZlciB0byB0aGVcclxuXHQgKiByZWdpc3RyYXRpb24gcG9pbnQgcG9zaXRpb24uXHJcblx0ICovXHJcblx0cHVibGljIGdldCB4KCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3g7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHgodmFsOm51bWJlcilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5feCA9PSB2YWwpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl94ID0gdmFsO1xyXG5cclxuXHRcdHRoaXMuaW52YWxpZGF0ZVBvc2l0aW9uKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJbmRpY2F0ZXMgdGhlIDxpPnk8L2k+IGNvb3JkaW5hdGUgb2YgdGhlIERpc3BsYXlPYmplY3QgaW5zdGFuY2UgcmVsYXRpdmVcclxuXHQgKiB0byB0aGUgbG9jYWwgY29vcmRpbmF0ZXMgb2YgdGhlIHBhcmVudCBEaXNwbGF5T2JqZWN0Q29udGFpbmVyLiBJZiB0aGVcclxuXHQgKiBvYmplY3QgaXMgaW5zaWRlIGEgRGlzcGxheU9iamVjdENvbnRhaW5lciB0aGF0IGhhcyB0cmFuc2Zvcm1hdGlvbnMsIGl0IGlzXHJcblx0ICogaW4gdGhlIGxvY2FsIGNvb3JkaW5hdGUgc3lzdGVtIG9mIHRoZSBlbmNsb3NpbmcgRGlzcGxheU9iamVjdENvbnRhaW5lci5cclxuXHQgKiBUaHVzLCBmb3IgYSBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIHJvdGF0ZWQgOTDCsCBjb3VudGVyY2xvY2t3aXNlLCB0aGVcclxuXHQgKiBEaXNwbGF5T2JqZWN0Q29udGFpbmVyJ3MgY2hpbGRyZW4gaW5oZXJpdCBhIGNvb3JkaW5hdGUgc3lzdGVtIHRoYXQgaXNcclxuXHQgKiByb3RhdGVkIDkwwrAgY291bnRlcmNsb2Nrd2lzZS4gVGhlIG9iamVjdCdzIGNvb3JkaW5hdGVzIHJlZmVyIHRvIHRoZVxyXG5cdCAqIHJlZ2lzdHJhdGlvbiBwb2ludCBwb3NpdGlvbi5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHkoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5feTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgeSh2YWw6bnVtYmVyKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl95ID09IHZhbClcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX3kgPSB2YWw7XHJcblxyXG5cdFx0dGhpcy5pbnZhbGlkYXRlUG9zaXRpb24oKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluZGljYXRlcyB0aGUgeiBjb29yZGluYXRlIHBvc2l0aW9uIGFsb25nIHRoZSB6LWF4aXMgb2YgdGhlIERpc3BsYXlPYmplY3RcclxuXHQgKiBpbnN0YW5jZSByZWxhdGl2ZSB0byB0aGUgM0QgcGFyZW50IGNvbnRhaW5lci4gVGhlIHogcHJvcGVydHkgaXMgdXNlZCBmb3JcclxuXHQgKiAzRCBjb29yZGluYXRlcywgbm90IHNjcmVlbiBvciBwaXhlbCBjb29yZGluYXRlcy5cclxuXHQgKlxyXG5cdCAqIDxwPldoZW4geW91IHNldCBhIDxjb2RlPno8L2NvZGU+IHByb3BlcnR5IGZvciBhIGRpc3BsYXkgb2JqZWN0IHRvXHJcblx0ICogc29tZXRoaW5nIG90aGVyIHRoYW4gdGhlIGRlZmF1bHQgdmFsdWUgb2YgPGNvZGU+MDwvY29kZT4sIGEgY29ycmVzcG9uZGluZ1xyXG5cdCAqIE1hdHJpeDNEIG9iamVjdCBpcyBhdXRvbWF0aWNhbGx5IGNyZWF0ZWQuIGZvciBhZGp1c3RpbmcgYSBkaXNwbGF5IG9iamVjdCdzXHJcblx0ICogcG9zaXRpb24gYW5kIG9yaWVudGF0aW9uIGluIHRocmVlIGRpbWVuc2lvbnMuIFdoZW4gd29ya2luZyB3aXRoIHRoZVxyXG5cdCAqIHotYXhpcywgdGhlIGV4aXN0aW5nIGJlaGF2aW9yIG9mIHggYW5kIHkgcHJvcGVydGllcyBjaGFuZ2VzIGZyb20gc2NyZWVuIG9yXHJcblx0ICogcGl4ZWwgY29vcmRpbmF0ZXMgdG8gcG9zaXRpb25zIHJlbGF0aXZlIHRvIHRoZSAzRCBwYXJlbnQgY29udGFpbmVyLjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPkZvciBleGFtcGxlLCBhIGNoaWxkIG9mIHRoZSA8Y29kZT5fcm9vdDwvY29kZT4gYXQgcG9zaXRpb24geCA9IDEwMCwgeSA9XHJcblx0ICogMTAwLCB6ID0gMjAwIGlzIG5vdCBkcmF3biBhdCBwaXhlbCBsb2NhdGlvbigxMDAsMTAwKS4gVGhlIGNoaWxkIGlzIGRyYXduXHJcblx0ICogd2hlcmV2ZXIgdGhlIDNEIHByb2plY3Rpb24gY2FsY3VsYXRpb24gcHV0cyBpdC4gVGhlIGNhbGN1bGF0aW9uIGlzOjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPjxjb2RlPih4fn5jYW1lcmFGb2NhbExlbmd0aC9jYW1lcmFSZWxhdGl2ZVpQb3NpdGlvbixcclxuXHQgKiB5fn5jYW1lcmFGb2NhbExlbmd0aC9jYW1lcmFSZWxhdGl2ZVpQb3NpdGlvbik8L2NvZGU+PC9wPlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgeigpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl96O1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCB6KHZhbDpudW1iZXIpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX3ogPT0gdmFsKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5feiA9IHZhbDtcclxuXHJcblx0XHR0aGlzLmludmFsaWRhdGVQb3NpdGlvbigpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHpPZmZzZXQoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fek9mZnNldDtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgek9mZnNldCh2YWx1ZTpudW1iZXIpXHJcblx0e1xyXG5cdFx0dGhpcy5fek9mZnNldCA9IHZhbHVlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhIG5ldyA8Y29kZT5EaXNwbGF5T2JqZWN0PC9jb2RlPiBpbnN0YW5jZS5cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcigpXHJcblx0e1xyXG5cdFx0c3VwZXIoKTtcclxuXHJcblx0XHQvLyBDYWNoZWQgdmVjdG9yIG9mIHRyYW5zZm9ybWF0aW9uIGNvbXBvbmVudHMgdXNlZCB3aGVuXHJcblx0XHQvLyByZWNvbXBvc2luZyB0aGUgdHJhbnNmb3JtIG1hdHJpeCBpbiB1cGRhdGVUcmFuc2Zvcm0oKVxyXG5cclxuXHRcdHRoaXMuX3RyYW5zZm9ybUNvbXBvbmVudHMgPSBuZXcgQXJyYXk8VmVjdG9yM0Q+KDMpO1xyXG5cclxuXHRcdHRoaXMuX3RyYW5zZm9ybUNvbXBvbmVudHNbMF0gPSB0aGlzLl9wb3M7XHJcblx0XHR0aGlzLl90cmFuc2Zvcm1Db21wb25lbnRzWzFdID0gdGhpcy5fcm90O1xyXG5cdFx0dGhpcy5fdHJhbnNmb3JtQ29tcG9uZW50c1syXSA9IHRoaXMuX3NjYTtcclxuXHJcblx0XHQvL2NyZWF0aW9uIG9mIGFzc29jaWF0ZWQgdHJhbnNmb3JtIG9iamVjdFxyXG5cdFx0dGhpcy5fdHJhbnNmb3JtID0gbmV3IFRyYW5zZm9ybSh0aGlzKTtcclxuXHJcblx0XHR0aGlzLl9tYXRyaXgzRC5pZGVudGl0eSgpO1xyXG5cclxuXHRcdHRoaXMuX2ZsaXBZLmFwcGVuZFNjYWxlKDEsIC0xLCAxKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGFkZEV2ZW50TGlzdGVuZXIodHlwZTpzdHJpbmcsIGxpc3RlbmVyOkZ1bmN0aW9uKVxyXG5cdHtcclxuXHRcdHN1cGVyLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpO1xyXG5cclxuXHRcdHN3aXRjaCAodHlwZSkge1xyXG5cdFx0XHRjYXNlIERpc3BsYXlPYmplY3RFdmVudC5QT1NJVElPTl9DSEFOR0VEOlxyXG5cdFx0XHRcdHRoaXMuX2xpc3RlblRvUG9zaXRpb25DaGFuZ2VkID0gdHJ1ZTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSBEaXNwbGF5T2JqZWN0RXZlbnQuUk9UQVRJT05fQ0hBTkdFRDpcclxuXHRcdFx0XHR0aGlzLl9saXN0ZW5Ub1JvdGF0aW9uQ2hhbmdlZCA9IHRydWU7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgRGlzcGxheU9iamVjdEV2ZW50LlNDQUxFX0NIQU5HRUQ6XHJcblx0XHRcdFx0dGhpcy5fbGlzdGVuVG9TY2FsZUNoYW5nZWQgPSB0cnVlO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIERpc3BsYXlPYmplY3RFdmVudC5TQ0VORV9DSEFOR0VEOlxyXG5cdFx0XHRcdHRoaXMuX2xpc3RlblRvU2NlbmVDaGFuZ2VkID0gdHJ1ZTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSBEaXNwbGF5T2JqZWN0RXZlbnQuU0NFTkVUUkFOU0ZPUk1fQ0hBTkdFRDpcclxuXHRcdFx0XHR0aGlzLl9saXN0ZW5Ub1NjZW5lVHJhbnNmb3JtQ2hhbmdlZCA9IHRydWU7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBjbG9uZSgpOkRpc3BsYXlPYmplY3RcclxuXHR7XHJcblx0XHR2YXIgY2xvbmU6RGlzcGxheU9iamVjdCA9IG5ldyBEaXNwbGF5T2JqZWN0KCk7XHJcblx0XHRjbG9uZS5waXZvdCA9IHRoaXMucGl2b3Q7XHJcblx0XHRjbG9uZS5faU1hdHJpeDNEID0gdGhpcy5faU1hdHJpeDNEO1xyXG5cdFx0Y2xvbmUubmFtZSA9IG5hbWU7XHJcblxyXG5cdFx0Ly8gdG9kbzogaW1wbGVtZW50IGZvciBhbGwgc3VidHlwZXNcclxuXHRcdHJldHVybiBjbG9uZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGRpc3Bvc2UoKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLnBhcmVudClcclxuXHRcdFx0dGhpcy5wYXJlbnQucmVtb3ZlQ2hpbGQodGhpcyk7XHJcblxyXG5cdFx0d2hpbGUgKHRoaXMuX3BSZW5kZXJhYmxlcy5sZW5ndGgpXHJcblx0XHRcdHRoaXMuX3BSZW5kZXJhYmxlc1swXS5kaXNwb3NlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAaW5oZXJpdERvY1xyXG5cdCAqL1xyXG5cdHB1YmxpYyBkaXNwb3NlQXNzZXQoKVxyXG5cdHtcclxuXHRcdHRoaXMuZGlzcG9zZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyBhIHJlY3RhbmdsZSB0aGF0IGRlZmluZXMgdGhlIGFyZWEgb2YgdGhlIGRpc3BsYXkgb2JqZWN0IHJlbGF0aXZlXHJcblx0ICogdG8gdGhlIGNvb3JkaW5hdGUgc3lzdGVtIG9mIHRoZSA8Y29kZT50YXJnZXRDb29yZGluYXRlU3BhY2U8L2NvZGU+IG9iamVjdC5cclxuXHQgKiBDb25zaWRlciB0aGUgZm9sbG93aW5nIGNvZGUsIHdoaWNoIHNob3dzIGhvdyB0aGUgcmVjdGFuZ2xlIHJldHVybmVkIGNhblxyXG5cdCAqIHZhcnkgZGVwZW5kaW5nIG9uIHRoZSA8Y29kZT50YXJnZXRDb29yZGluYXRlU3BhY2U8L2NvZGU+IHBhcmFtZXRlciB0aGF0XHJcblx0ICogeW91IHBhc3MgdG8gdGhlIG1ldGhvZDpcclxuXHQgKlxyXG5cdCAqIDxwPjxiPk5vdGU6PC9iPiBVc2UgdGhlIDxjb2RlPmxvY2FsVG9HbG9iYWwoKTwvY29kZT4gYW5kXHJcblx0ICogPGNvZGU+Z2xvYmFsVG9Mb2NhbCgpPC9jb2RlPiBtZXRob2RzIHRvIGNvbnZlcnQgdGhlIGRpc3BsYXkgb2JqZWN0J3MgbG9jYWxcclxuXHQgKiBjb29yZGluYXRlcyB0byBkaXNwbGF5IGNvb3JkaW5hdGVzLCBvciBkaXNwbGF5IGNvb3JkaW5hdGVzIHRvIGxvY2FsXHJcblx0ICogY29vcmRpbmF0ZXMsIHJlc3BlY3RpdmVseS48L3A+XHJcblx0ICpcclxuXHQgKiA8cD5UaGUgPGNvZGU+Z2V0Qm91bmRzKCk8L2NvZGU+IG1ldGhvZCBpcyBzaW1pbGFyIHRvIHRoZVxyXG5cdCAqIDxjb2RlPmdldFJlY3QoKTwvY29kZT4gbWV0aG9kOyBob3dldmVyLCB0aGUgUmVjdGFuZ2xlIHJldHVybmVkIGJ5IHRoZVxyXG5cdCAqIDxjb2RlPmdldEJvdW5kcygpPC9jb2RlPiBtZXRob2QgaW5jbHVkZXMgYW55IHN0cm9rZXMgb24gc2hhcGVzLCB3aGVyZWFzXHJcblx0ICogdGhlIFJlY3RhbmdsZSByZXR1cm5lZCBieSB0aGUgPGNvZGU+Z2V0UmVjdCgpPC9jb2RlPiBtZXRob2QgZG9lcyBub3QuIEZvclxyXG5cdCAqIGFuIGV4YW1wbGUsIHNlZSB0aGUgZGVzY3JpcHRpb24gb2YgdGhlIDxjb2RlPmdldFJlY3QoKTwvY29kZT4gbWV0aG9kLjwvcD5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB0YXJnZXRDb29yZGluYXRlU3BhY2UgVGhlIGRpc3BsYXkgb2JqZWN0IHRoYXQgZGVmaW5lcyB0aGVcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvb3JkaW5hdGUgc3lzdGVtIHRvIHVzZS5cclxuXHQgKiBAcmV0dXJuIFRoZSByZWN0YW5nbGUgdGhhdCBkZWZpbmVzIHRoZSBhcmVhIG9mIHRoZSBkaXNwbGF5IG9iamVjdCByZWxhdGl2ZVxyXG5cdCAqICAgICAgICAgdG8gdGhlIDxjb2RlPnRhcmdldENvb3JkaW5hdGVTcGFjZTwvY29kZT4gb2JqZWN0J3MgY29vcmRpbmF0ZVxyXG5cdCAqICAgICAgICAgc3lzdGVtLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXRCb3VuZHModGFyZ2V0Q29vcmRpbmF0ZVNwYWNlOkRpc3BsYXlPYmplY3QpOlJlY3RhbmdsZVxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9ib3VuZHM7IC8vVE9ET1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyBhIHJlY3RhbmdsZSB0aGF0IGRlZmluZXMgdGhlIGJvdW5kYXJ5IG9mIHRoZSBkaXNwbGF5IG9iamVjdCwgYmFzZWRcclxuXHQgKiBvbiB0aGUgY29vcmRpbmF0ZSBzeXN0ZW0gZGVmaW5lZCBieSB0aGUgPGNvZGU+dGFyZ2V0Q29vcmRpbmF0ZVNwYWNlPC9jb2RlPlxyXG5cdCAqIHBhcmFtZXRlciwgZXhjbHVkaW5nIGFueSBzdHJva2VzIG9uIHNoYXBlcy4gVGhlIHZhbHVlcyB0aGF0IHRoZVxyXG5cdCAqIDxjb2RlPmdldFJlY3QoKTwvY29kZT4gbWV0aG9kIHJldHVybnMgYXJlIHRoZSBzYW1lIG9yIHNtYWxsZXIgdGhhbiB0aG9zZVxyXG5cdCAqIHJldHVybmVkIGJ5IHRoZSA8Y29kZT5nZXRCb3VuZHMoKTwvY29kZT4gbWV0aG9kLlxyXG5cdCAqXHJcblx0ICogPHA+PGI+Tm90ZTo8L2I+IFVzZSA8Y29kZT5sb2NhbFRvR2xvYmFsKCk8L2NvZGU+IGFuZFxyXG5cdCAqIDxjb2RlPmdsb2JhbFRvTG9jYWwoKTwvY29kZT4gbWV0aG9kcyB0byBjb252ZXJ0IHRoZSBkaXNwbGF5IG9iamVjdCdzIGxvY2FsXHJcblx0ICogY29vcmRpbmF0ZXMgdG8gU2NlbmUgY29vcmRpbmF0ZXMsIG9yIFNjZW5lIGNvb3JkaW5hdGVzIHRvIGxvY2FsXHJcblx0ICogY29vcmRpbmF0ZXMsIHJlc3BlY3RpdmVseS48L3A+XHJcblx0ICpcclxuXHQgKiBAcGFyYW0gdGFyZ2V0Q29vcmRpbmF0ZVNwYWNlIFRoZSBkaXNwbGF5IG9iamVjdCB0aGF0IGRlZmluZXMgdGhlXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb29yZGluYXRlIHN5c3RlbSB0byB1c2UuXHJcblx0ICogQHJldHVybiBUaGUgcmVjdGFuZ2xlIHRoYXQgZGVmaW5lcyB0aGUgYXJlYSBvZiB0aGUgZGlzcGxheSBvYmplY3QgcmVsYXRpdmVcclxuXHQgKiAgICAgICAgIHRvIHRoZSA8Y29kZT50YXJnZXRDb29yZGluYXRlU3BhY2U8L2NvZGU+IG9iamVjdCdzIGNvb3JkaW5hdGVcclxuXHQgKiAgICAgICAgIHN5c3RlbS5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0UmVjdCh0YXJnZXRDb29yZGluYXRlU3BhY2U6RGlzcGxheU9iamVjdCA9IG51bGwpOlJlY3RhbmdsZVxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9ib3VuZHM7IC8vVE9ET1xyXG5cdH1cclxuXHJcblx0cHVibGljIGdldEJveCh0YXJnZXRDb29yZGluYXRlU3BhY2U6RGlzcGxheU9iamVjdCA9IG51bGwpOkJveFxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9pU291cmNlUHJlZmFiKVxyXG5cdFx0XHR0aGlzLl9pU291cmNlUHJlZmFiLl9pVmFsaWRhdGUoKTtcclxuXHJcblx0XHQvL1RPRE8gdGFyZ2V0Q29vcmRpbmF0ZVNwYWNlXHJcblx0XHRpZiAodGhpcy5fYm94Qm91bmRzSW52YWxpZCkge1xyXG5cdFx0XHR0aGlzLl9wVXBkYXRlQm94Qm91bmRzKCk7XHJcblxyXG5cdFx0XHRpZiAodGhpcy5fd2lkdGggIT0gbnVsbCkge1xyXG5cdFx0XHRcdHRoaXMuX3BTY2FsZVggPSB0aGlzLl93aWR0aC90aGlzLl9wQm94Qm91bmRzLndpZHRoO1xyXG5cdFx0XHRcdHRoaXMuaW52YWxpZGF0ZVNjYWxlKCk7XHJcblx0XHRcdH1cclxuXHJcblxyXG5cdFx0XHRpZiAodGhpcy5faGVpZ2h0ICE9IG51bGwpIHtcclxuXHRcdFx0XHR0aGlzLl9wU2NhbGVZID0gdGhpcy5faGVpZ2h0L3RoaXMuX3BCb3hCb3VuZHMuaGVpZ2h0O1xyXG5cdFx0XHRcdHRoaXMuaW52YWxpZGF0ZVNjYWxlKCk7XHJcblx0XHRcdH1cclxuXHJcblxyXG5cdFx0XHRpZiAodGhpcy5fZGVwdGggIT0gbnVsbCkge1xyXG5cdFx0XHRcdHRoaXMuX3BTY2FsZVogPSB0aGlzLl9kZXB0aC90aGlzLl9wQm94Qm91bmRzLmRlcHRoO1xyXG5cdFx0XHRcdHRoaXMuaW52YWxpZGF0ZVNjYWxlKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX3BCb3hCb3VuZHM7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0U3BoZXJlKHRhcmdldENvb3JkaW5hdGVTcGFjZTpEaXNwbGF5T2JqZWN0ID0gbnVsbCk6U3BoZXJlXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX2lTb3VyY2VQcmVmYWIpXHJcblx0XHRcdHRoaXMuX2lTb3VyY2VQcmVmYWIuX2lWYWxpZGF0ZSgpO1xyXG5cclxuXHRcdGlmICh0aGlzLl9zcGhlcmVCb3VuZHNJbnZhbGlkKSB7XHJcblx0XHRcdHRoaXMuX3BVcGRhdGVTcGhlcmVCb3VuZHMoKTtcclxuXHRcdH1cclxuXHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX3BTcGhlcmVCb3VuZHM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDb252ZXJ0cyB0aGUgPGNvZGU+cG9pbnQ8L2NvZGU+IG9iamVjdCBmcm9tIHRoZSBTY2VuZShnbG9iYWwpIGNvb3JkaW5hdGVzXHJcblx0ICogdG8gdGhlIGRpc3BsYXkgb2JqZWN0J3MobG9jYWwpIGNvb3JkaW5hdGVzLlxyXG5cdCAqXHJcblx0ICogPHA+VG8gdXNlIHRoaXMgbWV0aG9kLCBmaXJzdCBjcmVhdGUgYW4gaW5zdGFuY2Ugb2YgdGhlIFBvaW50IGNsYXNzLiBUaGVcclxuXHQgKiA8aT54PC9pPiBhbmQgPGk+eTwvaT4gdmFsdWVzIHRoYXQgeW91IGFzc2lnbiByZXByZXNlbnQgZ2xvYmFsIGNvb3JkaW5hdGVzXHJcblx0ICogYmVjYXVzZSB0aGV5IHJlbGF0ZSB0byB0aGUgb3JpZ2luKDAsMCkgb2YgdGhlIG1haW4gZGlzcGxheSBhcmVhLiBUaGVuXHJcblx0ICogcGFzcyB0aGUgUG9pbnQgaW5zdGFuY2UgYXMgdGhlIHBhcmFtZXRlciB0byB0aGVcclxuXHQgKiA8Y29kZT5nbG9iYWxUb0xvY2FsKCk8L2NvZGU+IG1ldGhvZC4gVGhlIG1ldGhvZCByZXR1cm5zIGEgbmV3IFBvaW50IG9iamVjdFxyXG5cdCAqIHdpdGggPGk+eDwvaT4gYW5kIDxpPnk8L2k+IHZhbHVlcyB0aGF0IHJlbGF0ZSB0byB0aGUgb3JpZ2luIG9mIHRoZSBkaXNwbGF5XHJcblx0ICogb2JqZWN0IGluc3RlYWQgb2YgdGhlIG9yaWdpbiBvZiB0aGUgU2NlbmUuPC9wPlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHBvaW50IEFuIG9iamVjdCBjcmVhdGVkIHdpdGggdGhlIFBvaW50IGNsYXNzLiBUaGUgUG9pbnQgb2JqZWN0XHJcblx0ICogICAgICAgICAgICAgIHNwZWNpZmllcyB0aGUgPGk+eDwvaT4gYW5kIDxpPnk8L2k+IGNvb3JkaW5hdGVzIGFzXHJcblx0ICogICAgICAgICAgICAgIHByb3BlcnRpZXMuXHJcblx0ICogQHJldHVybiBBIFBvaW50IG9iamVjdCB3aXRoIGNvb3JkaW5hdGVzIHJlbGF0aXZlIHRvIHRoZSBkaXNwbGF5IG9iamVjdC5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2xvYmFsVG9Mb2NhbChwb2ludDpQb2ludCk6UG9pbnRcclxuXHR7XHJcblx0XHRyZXR1cm4gcG9pbnQ7IC8vVE9ET1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ29udmVydHMgYSB0d28tZGltZW5zaW9uYWwgcG9pbnQgZnJvbSB0aGUgU2NlbmUoZ2xvYmFsKSBjb29yZGluYXRlcyB0byBhXHJcblx0ICogdGhyZWUtZGltZW5zaW9uYWwgZGlzcGxheSBvYmplY3Qncyhsb2NhbCkgY29vcmRpbmF0ZXMuXHJcblx0ICpcclxuXHQgKiA8cD5UbyB1c2UgdGhpcyBtZXRob2QsIGZpcnN0IGNyZWF0ZSBhbiBpbnN0YW5jZSBvZiB0aGUgVmVjdG9yM0QgY2xhc3MuIFRoZSB4LFxyXG5cdCAqIHkgYW5kIHogdmFsdWVzIHRoYXQgeW91IGFzc2lnbiB0byB0aGUgVmVjdG9yM0Qgb2JqZWN0IHJlcHJlc2VudCBnbG9iYWxcclxuXHQgKiBjb29yZGluYXRlcyBiZWNhdXNlIHRoZXkgYXJlIHJlbGF0aXZlIHRvIHRoZSBvcmlnaW4oMCwwLDApIG9mIHRoZSBzY2VuZS4gVGhlblxyXG5cdCAqIHBhc3MgdGhlIFZlY3RvcjNEIG9iamVjdCB0byB0aGUgPGNvZGU+Z2xvYmFsVG9Mb2NhbDNEKCk8L2NvZGU+IG1ldGhvZCBhcyB0aGVcclxuXHQgKiA8Y29kZT5wb3NpdGlvbjwvY29kZT4gcGFyYW1ldGVyLlxyXG5cdCAqIFRoZSBtZXRob2QgcmV0dXJucyB0aHJlZS1kaW1lbnNpb25hbCBjb29yZGluYXRlcyBhcyBhIFZlY3RvcjNEIG9iamVjdFxyXG5cdCAqIGNvbnRhaW5pbmcgPGNvZGU+eDwvY29kZT4sIDxjb2RlPnk8L2NvZGU+LCBhbmQgPGNvZGU+ejwvY29kZT4gdmFsdWVzIHRoYXRcclxuXHQgKiBhcmUgcmVsYXRpdmUgdG8gdGhlIG9yaWdpbiBvZiB0aGUgdGhyZWUtZGltZW5zaW9uYWwgZGlzcGxheSBvYmplY3QuPC9wPlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHBvaW50IEEgVmVjdG9yM0Qgb2JqZWN0IHJlcHJlc2VudGluZyBnbG9iYWwgeCwgeSBhbmQgeiBjb29yZGluYXRlcyBpblxyXG5cdCAqICAgICAgICAgICAgICB0aGUgc2NlbmUuXHJcblx0ICogQHJldHVybiBBIFZlY3RvcjNEIG9iamVjdCB3aXRoIGNvb3JkaW5hdGVzIHJlbGF0aXZlIHRvIHRoZSB0aHJlZS1kaW1lbnNpb25hbFxyXG5cdCAqICAgICAgICAgZGlzcGxheSBvYmplY3QuXHJcblx0ICovXHJcblx0cHVibGljIGdsb2JhbFRvTG9jYWwzRChwb3NpdGlvbjpWZWN0b3IzRCk6VmVjdG9yM0RcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5pbnZlcnNlU2NlbmVUcmFuc2Zvcm0udHJhbnNmb3JtVmVjdG9yKHBvc2l0aW9uKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEV2YWx1YXRlcyB0aGUgYm91bmRpbmcgYm94IG9mIHRoZSBkaXNwbGF5IG9iamVjdCB0byBzZWUgaWYgaXQgb3ZlcmxhcHMgb3JcclxuXHQgKiBpbnRlcnNlY3RzIHdpdGggdGhlIGJvdW5kaW5nIGJveCBvZiB0aGUgPGNvZGU+b2JqPC9jb2RlPiBkaXNwbGF5IG9iamVjdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmogVGhlIGRpc3BsYXkgb2JqZWN0IHRvIHRlc3QgYWdhaW5zdC5cclxuXHQgKiBAcmV0dXJuIDxjb2RlPnRydWU8L2NvZGU+IGlmIHRoZSBib3VuZGluZyBib3hlcyBvZiB0aGUgZGlzcGxheSBvYmplY3RzXHJcblx0ICogICAgICAgICBpbnRlcnNlY3Q7IDxjb2RlPmZhbHNlPC9jb2RlPiBpZiBub3QuXHJcblx0ICovXHJcblx0cHVibGljIGhpdFRlc3RPYmplY3Qob2JqOkRpc3BsYXlPYmplY3QpOmJvb2xlYW5cclxuXHR7XHJcblx0XHRyZXR1cm4gZmFsc2U7IC8vVE9ET1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRXZhbHVhdGVzIHRoZSBkaXNwbGF5IG9iamVjdCB0byBzZWUgaWYgaXQgb3ZlcmxhcHMgb3IgaW50ZXJzZWN0cyB3aXRoIHRoZVxyXG5cdCAqIHBvaW50IHNwZWNpZmllZCBieSB0aGUgPGNvZGU+eDwvY29kZT4gYW5kIDxjb2RlPnk8L2NvZGU+IHBhcmFtZXRlcnMuIFRoZVxyXG5cdCAqIDxjb2RlPng8L2NvZGU+IGFuZCA8Y29kZT55PC9jb2RlPiBwYXJhbWV0ZXJzIHNwZWNpZnkgYSBwb2ludCBpbiB0aGVcclxuXHQgKiBjb29yZGluYXRlIHNwYWNlIG9mIHRoZSBTY2VuZSwgbm90IHRoZSBkaXNwbGF5IG9iamVjdCBjb250YWluZXIgdGhhdFxyXG5cdCAqIGNvbnRhaW5zIHRoZSBkaXNwbGF5IG9iamVjdCh1bmxlc3MgdGhhdCBkaXNwbGF5IG9iamVjdCBjb250YWluZXIgaXMgdGhlXHJcblx0ICogU2NlbmUpLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHggICAgICAgICBUaGUgPGk+eDwvaT4gY29vcmRpbmF0ZSB0byB0ZXN0IGFnYWluc3QgdGhpcyBvYmplY3QuXHJcblx0ICogQHBhcmFtIHkgICAgICAgICBUaGUgPGk+eTwvaT4gY29vcmRpbmF0ZSB0byB0ZXN0IGFnYWluc3QgdGhpcyBvYmplY3QuXHJcblx0ICogQHBhcmFtIHNoYXBlRmxhZyBXaGV0aGVyIHRvIGNoZWNrIGFnYWluc3QgdGhlIGFjdHVhbCBwaXhlbHMgb2YgdGhlIG9iamVjdFxyXG5cdCAqICAgICAgICAgICAgICAgICAoPGNvZGU+dHJ1ZTwvY29kZT4pIG9yIHRoZSBib3VuZGluZyBib3hcclxuXHQgKiAgICAgICAgICAgICAgICAgKDxjb2RlPmZhbHNlPC9jb2RlPikuXHJcblx0ICogQHJldHVybiA8Y29kZT50cnVlPC9jb2RlPiBpZiB0aGUgZGlzcGxheSBvYmplY3Qgb3ZlcmxhcHMgb3IgaW50ZXJzZWN0c1xyXG5cdCAqICAgICAgICAgd2l0aCB0aGUgc3BlY2lmaWVkIHBvaW50OyA8Y29kZT5mYWxzZTwvY29kZT4gb3RoZXJ3aXNlLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBoaXRUZXN0UG9pbnQoeDpudW1iZXIsIHk6bnVtYmVyLCBzaGFwZUZsYWc6Ym9vbGVhbiA9IGZhbHNlKTpib29sZWFuXHJcblx0e1xyXG5cdFx0cmV0dXJuIGZhbHNlOyAvL1RPRE9cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJvdGF0ZXMgdGhlIDNkIG9iamVjdCBhcm91bmQgdG8gZmFjZSBhIHBvaW50IGRlZmluZWQgcmVsYXRpdmUgdG8gdGhlIGxvY2FsIGNvb3JkaW5hdGVzIG9mIHRoZSBwYXJlbnQgPGNvZGU+T2JqZWN0Q29udGFpbmVyM0Q8L2NvZGU+LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICAgIHRhcmdldCAgICAgICAgVGhlIHZlY3RvciBkZWZpbmluZyB0aGUgcG9pbnQgdG8gYmUgbG9va2VkIGF0XHJcblx0ICogQHBhcmFtICAgIHVwQXhpcyAgICAgICAgQW4gb3B0aW9uYWwgdmVjdG9yIHVzZWQgdG8gZGVmaW5lIHRoZSBkZXNpcmVkIHVwIG9yaWVudGF0aW9uIG9mIHRoZSAzZCBvYmplY3QgYWZ0ZXIgcm90YXRpb24gaGFzIG9jY3VycmVkXHJcblx0ICovXHJcblx0cHVibGljIGxvb2tBdCh0YXJnZXQ6VmVjdG9yM0QsIHVwQXhpczpWZWN0b3IzRCA9IG51bGwpXHJcblx0e1xyXG5cclxuXHRcdHZhciB5QXhpczpWZWN0b3IzRDtcclxuXHRcdHZhciB6QXhpczpWZWN0b3IzRDtcclxuXHRcdHZhciB4QXhpczpWZWN0b3IzRDtcclxuXHRcdHZhciByYXc6QXJyYXk8bnVtYmVyPjtcclxuXHJcblx0XHRpZiAodXBBeGlzID09IG51bGwpXHJcblx0XHRcdHVwQXhpcyA9IFZlY3RvcjNELllfQVhJUztcclxuXHRcdGVsc2VcclxuXHRcdFx0dXBBeGlzLm5vcm1hbGl6ZSgpO1xyXG5cclxuXHRcdHpBeGlzID0gdGFyZ2V0LnN1YnRyYWN0KHRoaXMuX2lNYXRyaXgzRC5wb3NpdGlvbik7XHJcblx0XHR6QXhpcy5ub3JtYWxpemUoKTtcclxuXHJcblx0XHR4QXhpcyA9IHVwQXhpcy5jcm9zc1Byb2R1Y3QoekF4aXMpO1xyXG5cdFx0eEF4aXMubm9ybWFsaXplKCk7XHJcblxyXG5cdFx0aWYgKHhBeGlzLmxlbmd0aCA8IDAuMDUpIHtcclxuXHRcdFx0eEF4aXMueCA9IHVwQXhpcy55O1xyXG5cdFx0XHR4QXhpcy55ID0gdXBBeGlzLng7XHJcblx0XHRcdHhBeGlzLnogPSAwO1xyXG5cdFx0XHR4QXhpcy5ub3JtYWxpemUoKTtcclxuXHRcdH1cclxuXHJcblx0XHR5QXhpcyA9IHpBeGlzLmNyb3NzUHJvZHVjdCh4QXhpcyk7XHJcblxyXG5cdFx0cmF3ID0gTWF0cml4M0RVdGlscy5SQVdfREFUQV9DT05UQUlORVI7XHJcblxyXG5cdFx0cmF3WzBdID0geEF4aXMueDtcclxuXHRcdHJhd1sxXSA9IHhBeGlzLnk7XHJcblx0XHRyYXdbMl0gPSB4QXhpcy56O1xyXG5cdFx0cmF3WzNdID0gMDtcclxuXHJcblx0XHRyYXdbNF0gPSB5QXhpcy54O1xyXG5cdFx0cmF3WzVdID0geUF4aXMueTtcclxuXHRcdHJhd1s2XSA9IHlBeGlzLno7XHJcblx0XHRyYXdbN10gPSAwO1xyXG5cclxuXHRcdHJhd1s4XSA9IHpBeGlzLng7XHJcblx0XHRyYXdbOV0gPSB6QXhpcy55O1xyXG5cdFx0cmF3WzEwXSA9IHpBeGlzLno7XHJcblx0XHRyYXdbMTFdID0gMDtcclxuXHJcblx0XHR2YXIgbTpNYXRyaXgzRCA9IG5ldyBNYXRyaXgzRCgpO1xyXG5cdFx0bS5jb3B5UmF3RGF0YUZyb20ocmF3KTtcclxuXHJcblx0XHR2YXIgdmVjOlZlY3RvcjNEID0gbS5kZWNvbXBvc2UoKVsxXTtcclxuXHJcblx0XHR0aGlzLl9yb3RhdGlvblggPSB2ZWMueDtcclxuXHRcdHRoaXMuX3JvdGF0aW9uWSA9IHZlYy55O1xyXG5cdFx0dGhpcy5fcm90YXRpb25aID0gdmVjLno7XHJcblxyXG5cdFx0dGhpcy5pbnZhbGlkYXRlUm90YXRpb24oKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnZlcnRzIHRoZSA8Y29kZT5wb2ludDwvY29kZT4gb2JqZWN0IGZyb20gdGhlIGRpc3BsYXkgb2JqZWN0J3MobG9jYWwpXHJcblx0ICogY29vcmRpbmF0ZXMgdG8gdGhlIFNjZW5lKGdsb2JhbCkgY29vcmRpbmF0ZXMuXHJcblx0ICpcclxuXHQgKiA8cD5UaGlzIG1ldGhvZCBhbGxvd3MgeW91IHRvIGNvbnZlcnQgYW55IGdpdmVuIDxpPng8L2k+IGFuZCA8aT55PC9pPlxyXG5cdCAqIGNvb3JkaW5hdGVzIGZyb20gdmFsdWVzIHRoYXQgYXJlIHJlbGF0aXZlIHRvIHRoZSBvcmlnaW4oMCwwKSBvZiBhXHJcblx0ICogc3BlY2lmaWMgZGlzcGxheSBvYmplY3QobG9jYWwgY29vcmRpbmF0ZXMpIHRvIHZhbHVlcyB0aGF0IGFyZSByZWxhdGl2ZSB0b1xyXG5cdCAqIHRoZSBvcmlnaW4gb2YgdGhlIFNjZW5lKGdsb2JhbCBjb29yZGluYXRlcykuPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+VG8gdXNlIHRoaXMgbWV0aG9kLCBmaXJzdCBjcmVhdGUgYW4gaW5zdGFuY2Ugb2YgdGhlIFBvaW50IGNsYXNzLiBUaGVcclxuXHQgKiA8aT54PC9pPiBhbmQgPGk+eTwvaT4gdmFsdWVzIHRoYXQgeW91IGFzc2lnbiByZXByZXNlbnQgbG9jYWwgY29vcmRpbmF0ZXNcclxuXHQgKiBiZWNhdXNlIHRoZXkgcmVsYXRlIHRvIHRoZSBvcmlnaW4gb2YgdGhlIGRpc3BsYXkgb2JqZWN0LjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPllvdSB0aGVuIHBhc3MgdGhlIFBvaW50IGluc3RhbmNlIHRoYXQgeW91IGNyZWF0ZWQgYXMgdGhlIHBhcmFtZXRlciB0b1xyXG5cdCAqIHRoZSA8Y29kZT5sb2NhbFRvR2xvYmFsKCk8L2NvZGU+IG1ldGhvZC4gVGhlIG1ldGhvZCByZXR1cm5zIGEgbmV3IFBvaW50XHJcblx0ICogb2JqZWN0IHdpdGggPGk+eDwvaT4gYW5kIDxpPnk8L2k+IHZhbHVlcyB0aGF0IHJlbGF0ZSB0byB0aGUgb3JpZ2luIG9mIHRoZVxyXG5cdCAqIFNjZW5lIGluc3RlYWQgb2YgdGhlIG9yaWdpbiBvZiB0aGUgZGlzcGxheSBvYmplY3QuPC9wPlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHBvaW50IFRoZSBuYW1lIG9yIGlkZW50aWZpZXIgb2YgYSBwb2ludCBjcmVhdGVkIHdpdGggdGhlIFBvaW50XHJcblx0ICogICAgICAgICAgICAgIGNsYXNzLCBzcGVjaWZ5aW5nIHRoZSA8aT54PC9pPiBhbmQgPGk+eTwvaT4gY29vcmRpbmF0ZXMgYXNcclxuXHQgKiAgICAgICAgICAgICAgcHJvcGVydGllcy5cclxuXHQgKiBAcmV0dXJuIEEgUG9pbnQgb2JqZWN0IHdpdGggY29vcmRpbmF0ZXMgcmVsYXRpdmUgdG8gdGhlIFNjZW5lLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBsb2NhbFRvR2xvYmFsKHBvaW50OlBvaW50KTpQb2ludFxyXG5cdHtcclxuXHRcdHJldHVybiBuZXcgUG9pbnQoKTsgLy9UT0RPXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDb252ZXJ0cyBhIHRocmVlLWRpbWVuc2lvbmFsIHBvaW50IG9mIHRoZSB0aHJlZS1kaW1lbnNpb25hbCBkaXNwbGF5XHJcblx0ICogb2JqZWN0J3MobG9jYWwpIGNvb3JkaW5hdGVzIHRvIGEgdGhyZWUtZGltZW5zaW9uYWwgcG9pbnQgaW4gdGhlIFNjZW5lXHJcblx0ICogKGdsb2JhbCkgY29vcmRpbmF0ZXMuXHJcblx0ICpcclxuXHQgKiA8cD5UaGlzIG1ldGhvZCBhbGxvd3MgeW91IHRvIGNvbnZlcnQgYW55IGdpdmVuIDxpPng8L2k+LCA8aT55PC9pPiBhbmRcclxuXHQgKiA8aT56PC9pPiBjb29yZGluYXRlcyBmcm9tIHZhbHVlcyB0aGF0IGFyZSByZWxhdGl2ZSB0byB0aGUgb3JpZ2luKDAsMCwwKSBvZlxyXG5cdCAqIGEgc3BlY2lmaWMgZGlzcGxheSBvYmplY3QobG9jYWwgY29vcmRpbmF0ZXMpIHRvIHZhbHVlcyB0aGF0IGFyZSByZWxhdGl2ZSB0b1xyXG5cdCAqIHRoZSBvcmlnaW4gb2YgdGhlIFNjZW5lKGdsb2JhbCBjb29yZGluYXRlcykuPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+VG8gdXNlIHRoaXMgbWV0aG9kLCBmaXJzdCBjcmVhdGUgYW4gaW5zdGFuY2Ugb2YgdGhlIFBvaW50IGNsYXNzLiBUaGVcclxuXHQgKiA8aT54PC9pPiBhbmQgPGk+eTwvaT4gdmFsdWVzIHRoYXQgeW91IGFzc2lnbiByZXByZXNlbnQgbG9jYWwgY29vcmRpbmF0ZXNcclxuXHQgKiBiZWNhdXNlIHRoZXkgcmVsYXRlIHRvIHRoZSBvcmlnaW4gb2YgdGhlIGRpc3BsYXkgb2JqZWN0LjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPllvdSB0aGVuIHBhc3MgdGhlIFZlY3RvcjNEIGluc3RhbmNlIHRoYXQgeW91IGNyZWF0ZWQgYXMgdGhlIHBhcmFtZXRlciB0b1xyXG5cdCAqIHRoZSA8Y29kZT5sb2NhbFRvR2xvYmFsM0QoKTwvY29kZT4gbWV0aG9kLiBUaGUgbWV0aG9kIHJldHVybnMgYSBuZXdcclxuXHQgKiBWZWN0b3IzRCBvYmplY3Qgd2l0aCA8aT54PC9pPiwgPGk+eTwvaT4gYW5kIDxpPno8L2k+IHZhbHVlcyB0aGF0IHJlbGF0ZSB0b1xyXG5cdCAqIHRoZSBvcmlnaW4gb2YgdGhlIFNjZW5lIGluc3RlYWQgb2YgdGhlIG9yaWdpbiBvZiB0aGUgZGlzcGxheSBvYmplY3QuPC9wPlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHBvc2l0aW9uIEEgVmVjdG9yM0Qgb2JqZWN0IGNvbnRhaW5pbmcgZWl0aGVyIGEgdGhyZWUtZGltZW5zaW9uYWxcclxuXHQgKiAgICAgICAgICAgICAgICBwb3NpdGlvbiBvciB0aGUgY29vcmRpbmF0ZXMgb2YgdGhlIHRocmVlLWRpbWVuc2lvbmFsXHJcblx0ICogICAgICAgICAgICAgICAgZGlzcGxheSBvYmplY3QuXHJcblx0ICogQHJldHVybiBBIFZlY3RvcjNEIG9iamVjdCByZXByZXNlbnRpbmcgYSB0aHJlZS1kaW1lbnNpb25hbCBwb3NpdGlvbiBpblxyXG5cdCAqICAgICAgICAgdGhlIFNjZW5lLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBsb2NhbFRvR2xvYmFsM0QocG9zaXRpb246VmVjdG9yM0QpOlZlY3RvcjNEXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuc2NlbmVUcmFuc2Zvcm0udHJhbnNmb3JtVmVjdG9yKHBvc2l0aW9uKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1vdmVzIHRoZSAzZCBvYmplY3QgZGlyZWN0bHkgdG8gYSBwb2ludCBpbiBzcGFjZVxyXG5cdCAqXHJcblx0ICogQHBhcmFtICAgIGR4ICAgICAgICBUaGUgYW1vdW50IG9mIG1vdmVtZW50IGFsb25nIHRoZSBsb2NhbCB4IGF4aXMuXHJcblx0ICogQHBhcmFtICAgIGR5ICAgICAgICBUaGUgYW1vdW50IG9mIG1vdmVtZW50IGFsb25nIHRoZSBsb2NhbCB5IGF4aXMuXHJcblx0ICogQHBhcmFtICAgIGR6ICAgICAgICBUaGUgYW1vdW50IG9mIG1vdmVtZW50IGFsb25nIHRoZSBsb2NhbCB6IGF4aXMuXHJcblx0ICovXHJcblxyXG5cdHB1YmxpYyBtb3ZlVG8oZHg6bnVtYmVyLCBkeTpudW1iZXIsIGR6Om51bWJlcilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5feCA9PSBkeCAmJiB0aGlzLl95ID09IGR5ICYmIHRoaXMuX3ogPT0gZHopXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl94ID0gZHg7XHJcblx0XHR0aGlzLl95ID0gZHk7XHJcblx0XHR0aGlzLl96ID0gZHo7XHJcblxyXG5cdFx0dGhpcy5pbnZhbGlkYXRlUG9zaXRpb24oKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1vdmVzIHRoZSBsb2NhbCBwb2ludCBhcm91bmQgd2hpY2ggdGhlIG9iamVjdCByb3RhdGVzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICAgIGR4ICAgICAgICBUaGUgYW1vdW50IG9mIG1vdmVtZW50IGFsb25nIHRoZSBsb2NhbCB4IGF4aXMuXHJcblx0ICogQHBhcmFtICAgIGR5ICAgICAgICBUaGUgYW1vdW50IG9mIG1vdmVtZW50IGFsb25nIHRoZSBsb2NhbCB5IGF4aXMuXHJcblx0ICogQHBhcmFtICAgIGR6ICAgICAgICBUaGUgYW1vdW50IG9mIG1vdmVtZW50IGFsb25nIHRoZSBsb2NhbCB6IGF4aXMuXHJcblx0ICovXHJcblx0cHVibGljIG1vdmVQaXZvdChkeDpudW1iZXIsIGR5Om51bWJlciwgZHo6bnVtYmVyKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9waXZvdCA9PSBudWxsKVxyXG5cdFx0XHR0aGlzLl9waXZvdCA9IG5ldyBWZWN0b3IzRCgpO1xyXG5cclxuXHRcdHRoaXMuX3Bpdm90LnggKz0gZHg7XHJcblx0XHR0aGlzLl9waXZvdC55ICs9IGR5O1xyXG5cdFx0dGhpcy5fcGl2b3QueiArPSBkejtcclxuXHJcblx0XHR0aGlzLmludmFsaWRhdGVQaXZvdCgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUm90YXRlcyB0aGUgM2Qgb2JqZWN0IGFyb3VuZCBpdCdzIGxvY2FsIHgtYXhpc1xyXG5cdCAqXHJcblx0ICogQHBhcmFtICAgIGFuZ2xlICAgICAgICBUaGUgYW1vdW50IG9mIHJvdGF0aW9uIGluIGRlZ3JlZXNcclxuXHQgKi9cclxuXHRwdWJsaWMgcGl0Y2goYW5nbGU6bnVtYmVyKVxyXG5cdHtcclxuXHRcdHRoaXMucm90YXRlKFZlY3RvcjNELlhfQVhJUywgYW5nbGUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0UmVuZGVyU2NlbmVUcmFuc2Zvcm0oY2FtZXJhOkNhbWVyYSk6TWF0cml4M0RcclxuXHR7XHJcblx0XHRpZiAodGhpcy5vcmllbnRhdGlvbk1vZGUgPT0gT3JpZW50YXRpb25Nb2RlLkNBTUVSQV9QTEFORSkge1xyXG5cdFx0XHR2YXIgY29tcHM6QXJyYXk8VmVjdG9yM0Q+ID0gY2FtZXJhLnNjZW5lVHJhbnNmb3JtLmRlY29tcG9zZSgpO1xyXG5cdFx0XHR2YXIgc2NhbGU6VmVjdG9yM0QgPSBjb21wc1syXTtcclxuXHRcdFx0Y29tcHNbMF0gPSB0aGlzLnNjZW5lUG9zaXRpb247XHJcblx0XHRcdHNjYWxlLnggPSB0aGlzLl9wU2NhbGVYO1xyXG5cdFx0XHRzY2FsZS55ID0gdGhpcy5fcFNjYWxlWTtcclxuXHRcdFx0c2NhbGUueiA9IHRoaXMuX3BTY2FsZVo7XHJcblx0XHRcdHRoaXMuX29yaWVudGF0aW9uTWF0cml4LnJlY29tcG9zZShjb21wcyk7XHJcblxyXG5cdFx0XHQvL2FkZCBpbiBjYXNlIG9mIHBpdm90XHJcblx0XHRcdGlmICghdGhpcy5fcGl2b3RaZXJvICYmIHRoaXMuYWxpZ25tZW50TW9kZSA9PSBBbGlnbm1lbnRNb2RlLlBJVk9UX1BPSU5UKVxyXG5cdFx0XHRcdHRoaXMuX29yaWVudGF0aW9uTWF0cml4LnByZXBlbmRUcmFuc2xhdGlvbigtdGhpcy5fcGl2b3QueC90aGlzLl9wU2NhbGVYLCAtdGhpcy5fcGl2b3QueS90aGlzLl9wU2NhbGVZLCAtdGhpcy5fcGl2b3Quei90aGlzLl9wU2NhbGVaKTtcclxuXHJcblx0XHRcdHJldHVybiB0aGlzLl9vcmllbnRhdGlvbk1hdHJpeDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcy5zY2VuZVRyYW5zZm9ybTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJvdGF0ZXMgdGhlIDNkIG9iamVjdCBhcm91bmQgaXQncyBsb2NhbCB6LWF4aXNcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAgICBhbmdsZSAgICAgICAgVGhlIGFtb3VudCBvZiByb3RhdGlvbiBpbiBkZWdyZWVzXHJcblx0ICovXHJcblx0cHVibGljIHJvbGwoYW5nbGU6bnVtYmVyKVxyXG5cdHtcclxuXHRcdHRoaXMucm90YXRlKFZlY3RvcjNELlpfQVhJUywgYW5nbGUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUm90YXRlcyB0aGUgM2Qgb2JqZWN0IGFyb3VuZCBhbiBheGlzIGJ5IGEgZGVmaW5lZCBhbmdsZVxyXG5cdCAqXHJcblx0ICogQHBhcmFtICAgIGF4aXMgICAgICAgIFRoZSB2ZWN0b3IgZGVmaW5pbmcgdGhlIGF4aXMgb2Ygcm90YXRpb25cclxuXHQgKiBAcGFyYW0gICAgYW5nbGUgICAgICAgIFRoZSBhbW91bnQgb2Ygcm90YXRpb24gaW4gZGVncmVlc1xyXG5cdCAqL1xyXG5cdHB1YmxpYyByb3RhdGUoYXhpczpWZWN0b3IzRCwgYW5nbGU6bnVtYmVyKVxyXG5cdHtcclxuXHRcdHZhciBtOk1hdHJpeDNEID0gbmV3IE1hdHJpeDNEKCk7XHJcblx0XHRtLnByZXBlbmRSb3RhdGlvbihhbmdsZSwgYXhpcyk7XHJcblxyXG5cdFx0dmFyIHZlYzpWZWN0b3IzRCA9IG0uZGVjb21wb3NlKClbMV07XHJcblxyXG5cdFx0dGhpcy5fcm90YXRpb25YICs9IHZlYy54O1xyXG5cdFx0dGhpcy5fcm90YXRpb25ZICs9IHZlYy55O1xyXG5cdFx0dGhpcy5fcm90YXRpb25aICs9IHZlYy56O1xyXG5cclxuXHRcdHRoaXMuaW52YWxpZGF0ZVJvdGF0aW9uKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSb3RhdGVzIHRoZSAzZCBvYmplY3QgZGlyZWN0bHkgdG8gYSBldWxlciBhbmdsZVxyXG5cdCAqXHJcblx0ICogQHBhcmFtICAgIGF4ICAgICAgICBUaGUgYW5nbGUgaW4gZGVncmVlcyBvZiB0aGUgcm90YXRpb24gYXJvdW5kIHRoZSB4IGF4aXMuXHJcblx0ICogQHBhcmFtICAgIGF5ICAgICAgICBUaGUgYW5nbGUgaW4gZGVncmVlcyBvZiB0aGUgcm90YXRpb24gYXJvdW5kIHRoZSB5IGF4aXMuXHJcblx0ICogQHBhcmFtICAgIGF6ICAgICAgICBUaGUgYW5nbGUgaW4gZGVncmVlcyBvZiB0aGUgcm90YXRpb24gYXJvdW5kIHRoZSB6IGF4aXMuXHJcblx0ICovXHJcblx0cHVibGljIHJvdGF0ZVRvKGF4Om51bWJlciwgYXk6bnVtYmVyLCBhejpudW1iZXIpXHJcblx0e1xyXG5cdFx0dGhpcy5fcm90YXRpb25YID0gYXgqTWF0aENvbnN0cy5ERUdSRUVTX1RPX1JBRElBTlM7XHJcblx0XHR0aGlzLl9yb3RhdGlvblkgPSBheSpNYXRoQ29uc3RzLkRFR1JFRVNfVE9fUkFESUFOUztcclxuXHRcdHRoaXMuX3JvdGF0aW9uWiA9IGF6Kk1hdGhDb25zdHMuREVHUkVFU19UT19SQURJQU5TO1xyXG5cclxuXHRcdHRoaXMuaW52YWxpZGF0ZVJvdGF0aW9uKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyByZW1vdmVFdmVudExpc3RlbmVyKHR5cGU6c3RyaW5nLCBsaXN0ZW5lcjpGdW5jdGlvbilcclxuXHR7XHJcblx0XHRzdXBlci5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKTtcclxuXHJcblx0XHRpZiAodGhpcy5oYXNFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHN3aXRjaCAodHlwZSkge1xyXG5cdFx0XHRjYXNlIERpc3BsYXlPYmplY3RFdmVudC5QT1NJVElPTl9DSEFOR0VEOlxyXG5cdFx0XHRcdHRoaXMuX2xpc3RlblRvUG9zaXRpb25DaGFuZ2VkID0gZmFsc2U7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIERpc3BsYXlPYmplY3RFdmVudC5ST1RBVElPTl9DSEFOR0VEOlxyXG5cdFx0XHRcdHRoaXMuX2xpc3RlblRvUm90YXRpb25DaGFuZ2VkID0gZmFsc2U7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIERpc3BsYXlPYmplY3RFdmVudC5TQ0FMRV9DSEFOR0VEOlxyXG5cdFx0XHRcdHRoaXMuX2xpc3RlblRvU2NhbGVDaGFuZ2VkID0gZmFsc2U7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNb3ZlcyB0aGUgM2Qgb2JqZWN0IGFsb25nIGEgdmVjdG9yIGJ5IGEgZGVmaW5lZCBsZW5ndGhcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAgICBheGlzICAgICAgICBUaGUgdmVjdG9yIGRlZmluaW5nIHRoZSBheGlzIG9mIG1vdmVtZW50XHJcblx0ICogQHBhcmFtICAgIGRpc3RhbmNlICAgIFRoZSBsZW5ndGggb2YgdGhlIG1vdmVtZW50XHJcblx0ICovXHJcblx0cHVibGljIHRyYW5zbGF0ZShheGlzOlZlY3RvcjNELCBkaXN0YW5jZTpudW1iZXIpXHJcblx0e1xyXG5cdFx0dmFyIHg6bnVtYmVyID0gYXhpcy54LCB5Om51bWJlciA9IGF4aXMueSwgejpudW1iZXIgPSBheGlzLno7XHJcblx0XHR2YXIgbGVuOm51bWJlciA9IGRpc3RhbmNlL01hdGguc3FydCh4KnggKyB5KnkgKyB6KnopO1xyXG5cclxuXHRcdHRoaXMuX3ggKz0geCpsZW47XHJcblx0XHR0aGlzLl95ICs9IHkqbGVuO1xyXG5cdFx0dGhpcy5feiArPSB6KmxlbjtcclxuXHJcblx0XHR0aGlzLmludmFsaWRhdGVQb3NpdGlvbigpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTW92ZXMgdGhlIDNkIG9iamVjdCBhbG9uZyBhIHZlY3RvciBieSBhIGRlZmluZWQgbGVuZ3RoXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gICAgYXhpcyAgICAgICAgVGhlIHZlY3RvciBkZWZpbmluZyB0aGUgYXhpcyBvZiBtb3ZlbWVudFxyXG5cdCAqIEBwYXJhbSAgICBkaXN0YW5jZSAgICBUaGUgbGVuZ3RoIG9mIHRoZSBtb3ZlbWVudFxyXG5cdCAqL1xyXG5cdHB1YmxpYyB0cmFuc2xhdGVMb2NhbChheGlzOlZlY3RvcjNELCBkaXN0YW5jZTpudW1iZXIpXHJcblx0e1xyXG5cdFx0dmFyIHg6bnVtYmVyID0gYXhpcy54LCB5Om51bWJlciA9IGF4aXMueSwgejpudW1iZXIgPSBheGlzLno7XHJcblx0XHR2YXIgbGVuOm51bWJlciA9IGRpc3RhbmNlL01hdGguc3FydCh4KnggKyB5KnkgKyB6KnopO1xyXG5cclxuXHRcdHRoaXMuX2lNYXRyaXgzRC5wcmVwZW5kVHJhbnNsYXRpb24oeCpsZW4sIHkqbGVuLCB6Kmxlbik7XHJcblxyXG5cdFx0dGhpcy5fbWF0cml4M0QuY29weUNvbHVtblRvKDMsIHRoaXMuX3Bvcyk7XHJcblxyXG5cdFx0dGhpcy5feCA9IHRoaXMuX3Bvcy54O1xyXG5cdFx0dGhpcy5feSA9IHRoaXMuX3Bvcy55O1xyXG5cdFx0dGhpcy5feiA9IHRoaXMuX3Bvcy56O1xyXG5cclxuXHRcdHRoaXMuaW52YWxpZGF0ZVBvc2l0aW9uKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSb3RhdGVzIHRoZSAzZCBvYmplY3QgYXJvdW5kIGl0J3MgbG9jYWwgeS1heGlzXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gICAgYW5nbGUgICAgICAgIFRoZSBhbW91bnQgb2Ygcm90YXRpb24gaW4gZGVncmVlc1xyXG5cdCAqL1xyXG5cdHB1YmxpYyB5YXcoYW5nbGU6bnVtYmVyKVxyXG5cdHtcclxuXHRcdHRoaXMucm90YXRlKFZlY3RvcjNELllfQVhJUywgYW5nbGUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQGludGVybmFsXHJcblx0ICovXHJcblx0cHVibGljIF9pQ29udHJvbGxlcjpDb250cm9sbGVyQmFzZTtcclxuXHJcblx0LyoqXHJcblx0ICogQGludGVybmFsXHJcblx0ICovXHJcblx0cHVibGljIGdldCBfaUFzc2lnbmVkUGFydGl0aW9uKCk6UGFydGl0aW9uXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BJbXBsaWNpdFBhcnRpdGlvbjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSB0cmFuc2Zvcm1hdGlvbiBvZiB0aGUgM2Qgb2JqZWN0LCByZWxhdGl2ZSB0byB0aGUgbG9jYWwgY29vcmRpbmF0ZXMgb2YgdGhlIHBhcmVudCA8Y29kZT5PYmplY3RDb250YWluZXIzRDwvY29kZT4uXHJcblx0ICpcclxuXHQgKiBAaW50ZXJuYWxcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IF9pTWF0cml4M0QoKTpNYXRyaXgzRFxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9tYXRyaXgzRERpcnR5KVxyXG5cdFx0XHR0aGlzLl9wVXBkYXRlTWF0cml4M0QoKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fbWF0cml4M0Q7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IF9pTWF0cml4M0QodmFsOk1hdHJpeDNEKVxyXG5cdHtcclxuXHJcblx0XHQvLyBUT0RPOiBGcm9tIEFTMyAtIERvIHdlIHN0aWxsIG5lZWQgdGhpcyBpbiBKUyA/XHJcblx0XHQvL3JpZGljdWxvdXMgbWF0cml4IGVycm9yXHJcblx0XHQvKlxyXG5cdFx0aWYgKCF2YWwucmF3RGF0YVswXSkge1xyXG5cclxuXHRcdFx0dmFyIHJhdzpudW1iZXJbXSA9IE1hdHJpeDNEVXRpbHMuUkFXX0RBVEFfQ09OVEFJTkVSO1xyXG5cdFx0XHR2YWwuY29weVJhd0RhdGFUbyhyYXcpO1xyXG5cdFx0XHRyYXdbMF0gPSB0aGlzLl9zbWFsbGVzdE51bWJlcjtcclxuXHRcdFx0dmFsLmNvcHlSYXdEYXRhRnJvbShyYXcpO1xyXG5cdFx0fVxyXG5cdFx0Ly8qL1xyXG5cdFx0dmFyIGVsZW1lbnRzOkFycmF5PFZlY3RvcjNEPiA9IHZhbC5kZWNvbXBvc2UoKTtcclxuXHRcdHZhciB2ZWM6VmVjdG9yM0Q7XHJcblxyXG5cdFx0dmVjID0gZWxlbWVudHNbMF07XHJcblxyXG5cdFx0aWYgKHRoaXMuX3ggIT0gdmVjLnggfHwgdGhpcy5feSAhPSB2ZWMueSB8fCB0aGlzLl96ICE9IHZlYy56KSB7XHJcblx0XHRcdHRoaXMuX3ggPSB2ZWMueDtcclxuXHRcdFx0dGhpcy5feSA9IHZlYy55O1xyXG5cdFx0XHR0aGlzLl96ID0gdmVjLno7XHJcblxyXG5cdFx0XHR0aGlzLmludmFsaWRhdGVQb3NpdGlvbigpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZlYyA9IGVsZW1lbnRzWzFdO1xyXG5cclxuXHRcdGlmICh0aGlzLl9yb3RhdGlvblggIT0gdmVjLnggfHwgdGhpcy5fcm90YXRpb25ZICE9IHZlYy55IHx8IHRoaXMuX3JvdGF0aW9uWiAhPSB2ZWMueikge1xyXG5cdFx0XHR0aGlzLl9yb3RhdGlvblggPSB2ZWMueDtcclxuXHRcdFx0dGhpcy5fcm90YXRpb25ZID0gdmVjLnk7XHJcblx0XHRcdHRoaXMuX3JvdGF0aW9uWiA9IHZlYy56O1xyXG5cclxuXHRcdFx0dGhpcy5pbnZhbGlkYXRlUm90YXRpb24oKTtcclxuXHRcdH1cclxuXHJcblx0XHR2ZWMgPSBlbGVtZW50c1syXTtcclxuXHJcblx0XHRpZiAodGhpcy5fcFNjYWxlWCAhPSB2ZWMueCB8fCB0aGlzLl9wU2NhbGVZICE9IHZlYy55IHx8IHRoaXMuX3BTY2FsZVogIT0gdmVjLnopIHtcclxuXHRcdFx0dGhpcy5fcFNjYWxlWCA9IHZlYy54O1xyXG5cdFx0XHR0aGlzLl9wU2NhbGVZID0gdmVjLnk7XHJcblx0XHRcdHRoaXMuX3BTY2FsZVogPSB2ZWMuejtcclxuXHJcblx0XHRcdHRoaXMuaW52YWxpZGF0ZVNjYWxlKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAaW50ZXJuYWxcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IF9pUGlja2luZ0NvbGxpc2lvblZPKCk6UGlja2luZ0NvbGxpc2lvblZPXHJcblx0e1xyXG5cdFx0aWYgKCF0aGlzLl9wUGlja2luZ0NvbGxpc2lvblZPKVxyXG5cdFx0XHR0aGlzLl9wUGlja2luZ0NvbGxpc2lvblZPID0gbmV3IFBpY2tpbmdDb2xsaXNpb25WTyh0aGlzKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fcFBpY2tpbmdDb2xsaXNpb25WTztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBpbnRlcm5hbFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBpU2V0UGFyZW50KHZhbHVlOkRpc3BsYXlPYmplY3RDb250YWluZXIpXHJcblx0e1xyXG5cdFx0dGhpcy5fcFBhcmVudCA9IHZhbHVlO1xyXG5cclxuXHRcdGlmICh2YWx1ZSkge1xyXG5cdFx0XHR0aGlzLl9wVXBkYXRlSW1wbGljaXRNb3VzZUVuYWJsZWQodmFsdWUubW91c2VDaGlsZHJlbik7XHJcblx0XHRcdHRoaXMuX3BVcGRhdGVJbXBsaWNpdFZpc2liaWxpdHkodmFsdWUuX2lJc1Zpc2libGUoKSk7XHJcblx0XHRcdHRoaXMuX3BVcGRhdGVJbXBsaWNpdFBhcnRpdGlvbih2YWx1ZS5faUFzc2lnbmVkUGFydGl0aW9uLCB2YWx1ZS5fcFNjZW5lKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuX3BVcGRhdGVJbXBsaWNpdE1vdXNlRW5hYmxlZCh0cnVlKTtcclxuXHRcdFx0dGhpcy5fcFVwZGF0ZUltcGxpY2l0VmlzaWJpbGl0eSh0cnVlKTtcclxuXHRcdFx0dGhpcy5fcFVwZGF0ZUltcGxpY2l0UGFydGl0aW9uKG51bGwsIG51bGwpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHByb3RlY3RlZFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBwSW52YWxpZGF0ZVNjZW5lVHJhbnNmb3JtKClcclxuXHR7XHJcblx0XHR0aGlzLl9wU2NlbmVUcmFuc2Zvcm1EaXJ0eSA9ICF0aGlzLl9wSWdub3JlVHJhbnNmb3JtO1xyXG5cdFx0dGhpcy5faW52ZXJzZVNjZW5lVHJhbnNmb3JtRGlydHkgPSAhdGhpcy5fcElnbm9yZVRyYW5zZm9ybTtcclxuXHRcdHRoaXMuX3NjZW5lUG9zaXRpb25EaXJ0eSA9ICF0aGlzLl9wSWdub3JlVHJhbnNmb3JtO1xyXG5cclxuXHRcdGlmICh0aGlzLmlzRW50aXR5KVxyXG5cdFx0XHR0aGlzLmludmFsaWRhdGVQYXJ0aXRpb24oKTtcclxuXHJcblx0XHRpZiAodGhpcy5fbGlzdGVuVG9TY2VuZVRyYW5zZm9ybUNoYW5nZWQpXHJcblx0XHRcdHRoaXMubm90aWZ5U2NlbmVUcmFuc2Zvcm1DaGFuZ2UoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwcm90ZWN0ZWRcclxuXHQgKi9cclxuXHRwdWJsaWMgX3BVcGRhdGVJbXBsaWNpdE1vdXNlRW5hYmxlZCh2YWx1ZTpib29sZWFuKVxyXG5cdHtcclxuXHRcdHRoaXMuX3BJbXBsaWNpdE1vdXNlRW5hYmxlZCA9IHRoaXMuX2V4cGxpY2l0TW91c2VFbmFibGVkICYmIHZhbHVlO1xyXG5cclxuXHRcdC8vIElmIHRoZXJlIGlzIGEgcGFyZW50IGFuZCB0aGlzIGNoaWxkIGRvZXMgbm90IGhhdmUgYSBwaWNraW5nIGNvbGxpZGVyLCB1c2UgaXRzIHBhcmVudCdzIHBpY2tpbmcgY29sbGlkZXIuXHJcblx0XHRpZiAodGhpcy5fcEltcGxpY2l0TW91c2VFbmFibGVkICYmIHRoaXMuX3BQYXJlbnQgJiYgIXRoaXMuX3BQaWNraW5nQ29sbGlkZXIpXHJcblx0XHRcdHRoaXMuX3BQaWNraW5nQ29sbGlkZXIgPSAgdGhpcy5fcFBhcmVudC5fcFBpY2tpbmdDb2xsaWRlcjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwcm90ZWN0ZWRcclxuXHQgKi9cclxuXHRwdWJsaWMgX3BVcGRhdGVJbXBsaWNpdFBhcnRpdGlvbihwYXJ0aXRpb246UGFydGl0aW9uLCBzY2VuZTpTY2VuZSlcclxuXHR7XHJcblx0XHR2YXIgc2NlbmVDaGFuZ2VkOmJvb2xlYW4gPSB0aGlzLl9wU2NlbmUgIT0gc2NlbmU7XHJcblxyXG5cdFx0aWYgKHNjZW5lQ2hhbmdlZCAmJiB0aGlzLl9wU2NlbmUpXHJcblx0XHRcdHRoaXMuX3BTY2VuZS5kaXNwYXRjaEV2ZW50KG5ldyBTY2VuZUV2ZW50KFNjZW5lRXZlbnQuUkVNT1ZFRF9GUk9NX1NDRU5FLCB0aGlzKSk7XHJcblxyXG5cdFx0aWYgKHRoaXMuX3BTY2VuZSAmJiB0aGlzLl9wSW1wbGljaXRQYXJ0aXRpb24pIHtcclxuXHRcdFx0Ly91bnJlZ2lzdGVyIHBhcnRpdGlvbiBmcm9tIGN1cnJlbnQgc2NlbmVcclxuXHRcdFx0dGhpcy5fcFNjZW5lLl9pVW5yZWdpc3RlclBhcnRpdGlvbih0aGlzLl9wSW1wbGljaXRQYXJ0aXRpb24pO1xyXG5cclxuXHRcdFx0Ly91bnJlZ2lzdGVyIGVudGl0eSBmcm9tIGN1cnJlbnQgcGFydGl0aW9uXHJcblx0XHRcdGlmICh0aGlzLl9wSXNFbnRpdHkpXHJcblx0XHRcdFx0dGhpcy5fcFVucmVnaXN0ZXJFbnRpdHkodGhpcy5fcEltcGxpY2l0UGFydGl0aW9uKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBhc3NpZ24gcGFyZW50IGltcGxpY2l0IHBhcnRpdGlvbiBpZiBubyBleHBsaWNpdCBvbmUgaXMgZ2l2ZW5cclxuXHRcdHRoaXMuX3BJbXBsaWNpdFBhcnRpdGlvbiA9IHRoaXMuX2V4cGxpY2l0UGFydGl0aW9uIHx8IHBhcnRpdGlvbjtcclxuXHJcblx0XHQvL2Fzc2lnbiBzY2VuZVxyXG5cdFx0aWYgKHNjZW5lQ2hhbmdlZClcclxuXHRcdFx0dGhpcy5fcFNjZW5lID0gc2NlbmU7XHJcblxyXG5cdFx0aWYgKHRoaXMuX3BTY2VuZSAmJiB0aGlzLl9wSW1wbGljaXRQYXJ0aXRpb24pIHtcclxuXHRcdFx0Ly9yZWdpc3RlciBwYXJ0aXRpb24gd2l0aCBzY2VuZVxyXG5cdFx0XHR0aGlzLl9wU2NlbmUuX2lSZWdpc3RlclBhcnRpdGlvbih0aGlzLl9wSW1wbGljaXRQYXJ0aXRpb24pO1xyXG5cclxuXHRcdFx0Ly9yZWdpc3RlciBlbnRpdHkgd2l0aCBuZXcgcGFydGl0aW9uXHJcblx0XHRcdGlmICh0aGlzLl9wSXNFbnRpdHkpXHJcblx0XHRcdFx0dGhpcy5fcFJlZ2lzdGVyRW50aXR5KHRoaXMuX3BJbXBsaWNpdFBhcnRpdGlvbik7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHNjZW5lQ2hhbmdlZCAmJiB0aGlzLl9wU2NlbmUpXHJcblx0XHRcdHRoaXMuX3BTY2VuZS5kaXNwYXRjaEV2ZW50KG5ldyBTY2VuZUV2ZW50KFNjZW5lRXZlbnQuQURERURfVE9fU0NFTkUsIHRoaXMpKTtcclxuXHJcblx0XHRpZiAoc2NlbmVDaGFuZ2VkKSB7XHJcblx0XHRcdGlmICghdGhpcy5fcFNjZW5lVHJhbnNmb3JtRGlydHkgJiYgIXRoaXMuX3BJZ25vcmVUcmFuc2Zvcm0pXHJcblx0XHRcdFx0dGhpcy5wSW52YWxpZGF0ZVNjZW5lVHJhbnNmb3JtKCk7XHJcblxyXG5cdFx0XHRpZiAodGhpcy5fbGlzdGVuVG9TY2VuZUNoYW5nZWQpXHJcblx0XHRcdFx0dGhpcy5ub3RpZnlTY2VuZUNoYW5nZSgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHByb3RlY3RlZFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBfcFVwZGF0ZUltcGxpY2l0VmlzaWJpbGl0eSh2YWx1ZTpib29sZWFuKVxyXG5cdHtcclxuXHRcdHRoaXMuX3BJbXBsaWNpdFZpc2liaWxpdHkgPSB0aGlzLl9leHBsaWNpdFZpc2liaWxpdHkgJiYgdmFsdWU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAcHJvdGVjdGVkXHJcblx0ICovXHJcblx0cHVibGljIF9wVXBkYXRlTWF0cml4M0QoKVxyXG5cdHtcclxuXHJcblx0XHR0aGlzLl9wb3MueCA9IHRoaXMuX3g7XHJcblx0XHR0aGlzLl9wb3MueSA9IHRoaXMuX3k7XHJcblx0XHR0aGlzLl9wb3MueiA9IHRoaXMuX3o7XHJcblxyXG5cdFx0dGhpcy5fcm90LnggPSB0aGlzLl9yb3RhdGlvblg7XHJcblx0XHR0aGlzLl9yb3QueSA9IHRoaXMuX3JvdGF0aW9uWTtcclxuXHRcdHRoaXMuX3JvdC56ID0gdGhpcy5fcm90YXRpb25aO1xyXG5cclxuXHRcdHRoaXMuX3NjYS54ID0gdGhpcy5fcFNjYWxlWDtcclxuXHRcdHRoaXMuX3NjYS55ID0gdGhpcy5fcFNjYWxlWTtcclxuXHRcdHRoaXMuX3NjYS56ID0gdGhpcy5fcFNjYWxlWjtcclxuXHJcblx0XHR0aGlzLl9tYXRyaXgzRC5yZWNvbXBvc2UodGhpcy5fdHJhbnNmb3JtQ29tcG9uZW50cyk7XHJcblxyXG5cdFx0aWYgKCF0aGlzLl9waXZvdFplcm8pIHtcclxuXHRcdFx0dGhpcy5fcGl2b3RTY2FsZS54ID0gdGhpcy5fcGl2b3QueC90aGlzLl9wU2NhbGVYO1xyXG5cdFx0XHR0aGlzLl9waXZvdFNjYWxlLnkgPSB0aGlzLl9waXZvdC55L3RoaXMuX3BTY2FsZVk7XHJcblx0XHRcdHRoaXMuX3Bpdm90U2NhbGUueiA9IHRoaXMuX3Bpdm90LnovdGhpcy5fcFNjYWxlWjtcclxuXHRcdFx0dGhpcy5fbWF0cml4M0QucHJlcGVuZFRyYW5zbGF0aW9uKC10aGlzLl9waXZvdFNjYWxlLngsIC10aGlzLl9waXZvdFNjYWxlLnksIC10aGlzLl9waXZvdFNjYWxlLnopO1xyXG5cdFx0XHRpZiAodGhpcy5hbGlnbm1lbnRNb2RlICE9IEFsaWdubWVudE1vZGUuUElWT1RfUE9JTlQpXHJcblx0XHRcdFx0dGhpcy5fbWF0cml4M0QuYXBwZW5kVHJhbnNsYXRpb24odGhpcy5fcGl2b3QueCwgdGhpcy5fcGl2b3QueSwgdGhpcy5fcGl2b3Queik7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5fbWF0cml4M0REaXJ0eSA9IGZhbHNlO1xyXG5cdFx0dGhpcy5fcG9zaXRpb25EaXJ0eSA9IGZhbHNlO1xyXG5cdFx0dGhpcy5fcm90YXRpb25EaXJ0eSA9IGZhbHNlO1xyXG5cdFx0dGhpcy5fc2NhbGVEaXJ0eSA9IGZhbHNlO1xyXG5cdFx0dGhpcy5fcGl2b3REaXJ0eSA9IGZhbHNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHByb3RlY3RlZFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBwVXBkYXRlU2NlbmVUcmFuc2Zvcm0oKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9wUGFyZW50ICYmICF0aGlzLl9wUGFyZW50Ll9pSXNSb290KSB7XHJcblx0XHRcdHRoaXMuX3BTY2VuZVRyYW5zZm9ybS5jb3B5RnJvbSh0aGlzLl9wUGFyZW50LnNjZW5lVHJhbnNmb3JtKTtcclxuXHRcdFx0dGhpcy5fcFNjZW5lVHJhbnNmb3JtLnByZXBlbmQodGhpcy5faU1hdHJpeDNEKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuX3BTY2VuZVRyYW5zZm9ybS5jb3B5RnJvbSh0aGlzLl9pTWF0cml4M0QpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX3BTY2VuZVRyYW5zZm9ybURpcnR5ID0gZmFsc2U7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgX2lBZGRSZW5kZXJhYmxlKHJlbmRlcmFibGU6SVJlbmRlcmFibGUpOklSZW5kZXJhYmxlXHJcblx0e1xyXG5cdFx0dGhpcy5fcFJlbmRlcmFibGVzLnB1c2gocmVuZGVyYWJsZSk7XHJcblxyXG5cdFx0cmV0dXJuIHJlbmRlcmFibGU7XHJcblx0fVxyXG5cclxuXHJcblx0cHVibGljIF9pUmVtb3ZlUmVuZGVyYWJsZShyZW5kZXJhYmxlOklSZW5kZXJhYmxlKTpJUmVuZGVyYWJsZVxyXG5cdHtcclxuXHRcdHZhciBpbmRleDpudW1iZXIgPSB0aGlzLl9wUmVuZGVyYWJsZXMuaW5kZXhPZihyZW5kZXJhYmxlKTtcclxuXHJcblx0XHR0aGlzLl9wUmVuZGVyYWJsZXMuc3BsaWNlKGluZGV4LCAxKTtcclxuXHJcblx0XHRyZXR1cm4gcmVuZGVyYWJsZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIC8vVE9ET1xyXG5cdCAqXHJcblx0ICogQHBhcmFtIHNob3J0ZXN0Q29sbGlzaW9uRGlzdGFuY2VcclxuXHQgKiBAcGFyYW0gZmluZENsb3Nlc3RcclxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuXHQgKlxyXG5cdCAqIEBpbnRlcm5hbFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBfaVRlc3RDb2xsaXNpb24oc2hvcnRlc3RDb2xsaXNpb25EaXN0YW5jZTpudW1iZXIsIGZpbmRDbG9zZXN0OmJvb2xlYW4pOmJvb2xlYW5cclxuXHR7XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBfaUludGVybmFsVXBkYXRlKClcclxuXHR7XHJcblx0XHRpZiAodGhpcy5faUNvbnRyb2xsZXIpXHJcblx0XHRcdHRoaXMuX2lDb250cm9sbGVyLnVwZGF0ZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQGludGVybmFsXHJcblx0ICovXHJcblx0cHVibGljIF9pSXNWaXNpYmxlKCk6Ym9vbGVhblxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9wSW1wbGljaXRWaXNpYmlsaXR5O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQGludGVybmFsXHJcblx0ICovXHJcblx0cHVibGljIF9pSXNNb3VzZUVuYWJsZWQoKTpib29sZWFuXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BJbXBsaWNpdE1vdXNlRW5hYmxlZDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBpbnRlcm5hbFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBfaVNldFNjZW5lKHZhbHVlOlNjZW5lKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9wU2NlbmUgPT0gdmFsdWUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9wVXBkYXRlSW1wbGljaXRQYXJ0aXRpb24odGhpcy5fcFBhcmVudD8gdGhpcy5fcFBhcmVudC5faUFzc2lnbmVkUGFydGl0aW9uIDogbnVsbCwgdmFsdWUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIG5vdGlmeVBvc2l0aW9uQ2hhbmdlZCgpXHJcblx0e1xyXG5cdFx0aWYgKCF0aGlzLl9wb3NpdGlvbkNoYW5nZWQpXHJcblx0XHRcdHRoaXMuX3Bvc2l0aW9uQ2hhbmdlZCA9IG5ldyBEaXNwbGF5T2JqZWN0RXZlbnQoRGlzcGxheU9iamVjdEV2ZW50LlBPU0lUSU9OX0NIQU5HRUQsIHRoaXMpO1xyXG5cclxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCh0aGlzLl9wb3NpdGlvbkNoYW5nZWQpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIG5vdGlmeVJvdGF0aW9uQ2hhbmdlZCgpXHJcblx0e1xyXG5cdFx0aWYgKCF0aGlzLl9yb3RhdGlvbkNoYW5nZWQpXHJcblx0XHRcdHRoaXMuX3JvdGF0aW9uQ2hhbmdlZCA9IG5ldyBEaXNwbGF5T2JqZWN0RXZlbnQoRGlzcGxheU9iamVjdEV2ZW50LlJPVEFUSU9OX0NIQU5HRUQsIHRoaXMpO1xyXG5cclxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCh0aGlzLl9yb3RhdGlvbkNoYW5nZWQpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIG5vdGlmeVNjYWxlQ2hhbmdlZCgpXHJcblx0e1xyXG5cdFx0aWYgKCF0aGlzLl9zY2FsZUNoYW5nZWQpXHJcblx0XHRcdHRoaXMuX3NjYWxlQ2hhbmdlZCA9IG5ldyBEaXNwbGF5T2JqZWN0RXZlbnQoRGlzcGxheU9iamVjdEV2ZW50LlNDQUxFX0NIQU5HRUQsIHRoaXMpO1xyXG5cclxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCh0aGlzLl9zY2FsZUNoYW5nZWQpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIG5vdGlmeVNjZW5lQ2hhbmdlKClcclxuXHR7XHJcblx0XHRpZiAoIXRoaXMuX3NjZW5lY2hhbmdlZClcclxuXHRcdFx0dGhpcy5fc2NlbmVjaGFuZ2VkID0gbmV3IERpc3BsYXlPYmplY3RFdmVudChEaXNwbGF5T2JqZWN0RXZlbnQuU0NFTkVfQ0hBTkdFRCwgdGhpcyk7XHJcblxyXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KHRoaXMuX3NjZW5lY2hhbmdlZCk7XHJcbn1cclxuXHJcblx0LyoqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIG5vdGlmeVNjZW5lVHJhbnNmb3JtQ2hhbmdlKClcclxuXHR7XHJcblx0XHRpZiAoIXRoaXMuX3NjZW5lVHJhbnNmb3JtQ2hhbmdlZClcclxuXHRcdFx0dGhpcy5fc2NlbmVUcmFuc2Zvcm1DaGFuZ2VkID0gbmV3IERpc3BsYXlPYmplY3RFdmVudChEaXNwbGF5T2JqZWN0RXZlbnQuU0NFTkVUUkFOU0ZPUk1fQ0hBTkdFRCwgdGhpcyk7XHJcblxyXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KHRoaXMuX3NjZW5lVHJhbnNmb3JtQ2hhbmdlZCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJbnZhbGlkYXRlcyB0aGUgM0QgdHJhbnNmb3JtYXRpb24gbWF0cml4LCBjYXVzaW5nIGl0IHRvIGJlIHVwZGF0ZWQgdXBvbiB0aGUgbmV4dCByZXF1ZXN0XHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaW52YWxpZGF0ZU1hdHJpeDNEKCk6dm9pZFxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9tYXRyaXgzRERpcnR5KVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fbWF0cml4M0REaXJ0eSA9IHRydWU7XHJcblxyXG5cdFx0aWYgKCF0aGlzLl9wU2NlbmVUcmFuc2Zvcm1EaXJ0eSAmJiAhdGhpcy5fcElnbm9yZVRyYW5zZm9ybSlcclxuXHRcdFx0dGhpcy5wSW52YWxpZGF0ZVNjZW5lVHJhbnNmb3JtKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBpbnZhbGlkYXRlUGFydGl0aW9uKClcclxuXHR7XHJcblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX2VudGl0eU5vZGVzLmxlbmd0aDtcclxuXHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IGxlbjsgaSsrKVxyXG5cdFx0XHR0aGlzLl9lbnRpdHlOb2Rlc1tpXS5pbnZhbGlkYXRlUGFydGl0aW9uKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaW52YWxpZGF0ZVBpdm90KClcclxuXHR7XHJcblx0XHR0aGlzLl9waXZvdFplcm8gPSAodGhpcy5fcGl2b3QueCA9PSAwKSAmJiAodGhpcy5fcGl2b3QueSA9PSAwKSAmJiAodGhpcy5fcGl2b3QueiA9PSAwKTtcclxuXHJcblx0XHRpZiAodGhpcy5fcGl2b3REaXJ0eSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX3Bpdm90RGlydHkgPSB0cnVlO1xyXG5cclxuXHRcdHRoaXMuaW52YWxpZGF0ZU1hdHJpeDNEKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaW52YWxpZGF0ZVBvc2l0aW9uKClcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fcG9zaXRpb25EaXJ0eSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX3Bvc2l0aW9uRGlydHkgPSB0cnVlO1xyXG5cclxuXHRcdHRoaXMuaW52YWxpZGF0ZU1hdHJpeDNEKCk7XHJcblxyXG5cdFx0aWYgKHRoaXMuX2xpc3RlblRvUG9zaXRpb25DaGFuZ2VkKVxyXG5cdFx0XHR0aGlzLm5vdGlmeVBvc2l0aW9uQ2hhbmdlZCgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIGludmFsaWRhdGVSb3RhdGlvbigpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX3JvdGF0aW9uRGlydHkpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9yb3RhdGlvbkRpcnR5ID0gdHJ1ZTtcclxuXHJcblx0XHR0aGlzLmludmFsaWRhdGVNYXRyaXgzRCgpO1xyXG5cclxuXHRcdGlmICh0aGlzLl9saXN0ZW5Ub1JvdGF0aW9uQ2hhbmdlZClcclxuXHRcdFx0dGhpcy5ub3RpZnlSb3RhdGlvbkNoYW5nZWQoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBpbnZhbGlkYXRlU2NhbGUoKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9zY2FsZURpcnR5KVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fc2NhbGVEaXJ0eSA9IHRydWU7XHJcblxyXG5cdFx0dGhpcy5pbnZhbGlkYXRlTWF0cml4M0QoKTtcclxuXHJcblx0XHRpZiAodGhpcy5fbGlzdGVuVG9TY2FsZUNoYW5nZWQpXHJcblx0XHRcdHRoaXMubm90aWZ5U2NhbGVDaGFuZ2VkKCk7XHJcblx0fVxyXG5cclxuXHJcblx0cHVibGljIF9pQWRkRW50aXR5Tm9kZShlbnRpdHlOb2RlOkVudGl0eU5vZGUpOkVudGl0eU5vZGVcclxuXHR7XHJcblx0XHR0aGlzLl9lbnRpdHlOb2Rlcy5wdXNoKGVudGl0eU5vZGUpO1xyXG5cclxuXHRcdHJldHVybiBlbnRpdHlOb2RlO1xyXG5cdH1cclxuXHJcblxyXG5cdHB1YmxpYyBfaVJlbW92ZUVudGl0eU5vZGUoZW50aXR5Tm9kZTpFbnRpdHlOb2RlKTpFbnRpdHlOb2RlXHJcblx0e1xyXG5cdFx0dmFyIGluZGV4Om51bWJlciA9IHRoaXMuX2VudGl0eU5vZGVzLmluZGV4T2YoZW50aXR5Tm9kZSk7XHJcblxyXG5cdFx0dGhpcy5fZW50aXR5Tm9kZXMuc3BsaWNlKGluZGV4LCAxKTtcclxuXHJcblx0XHRyZXR1cm4gZW50aXR5Tm9kZTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBfcFJlZ2lzdGVyRW50aXR5KHBhcnRpdGlvbjpQYXJ0aXRpb24pXHJcblx0e1xyXG5cdFx0dGhyb3cgbmV3IEFic3RyYWN0TWV0aG9kRXJyb3IoKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBfcFVucmVnaXN0ZXJFbnRpdHkocGFydGl0aW9uOlBhcnRpdGlvbilcclxuXHR7XHJcblx0XHR0aHJvdyBuZXcgQWJzdHJhY3RNZXRob2RFcnJvcigpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIF9wSW52YWxpZGF0ZUJvdW5kcygpXHJcblx0e1xyXG5cdFx0dGhpcy5fYm94Qm91bmRzSW52YWxpZCA9IHRydWU7XHJcblx0XHR0aGlzLl9zcGhlcmVCb3VuZHNJbnZhbGlkID0gdHJ1ZTtcclxuXHJcblx0XHRpZiAodGhpcy5pc0VudGl0eSlcclxuXHRcdFx0dGhpcy5pbnZhbGlkYXRlUGFydGl0aW9uKCk7XHJcblx0fVxyXG5cdFxyXG5cdHB1YmxpYyBfcFVwZGF0ZUJveEJvdW5kcygpXHJcblx0e1xyXG5cdFx0dGhpcy5fYm94Qm91bmRzSW52YWxpZCA9IGZhbHNlO1xyXG5cdFx0XHJcblx0XHRpZiAodGhpcy5fcEJveEJvdW5kcyA9PSBudWxsKVxyXG5cdFx0XHR0aGlzLl9wQm94Qm91bmRzID0gbmV3IEJveCgpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIF9wVXBkYXRlU3BoZXJlQm91bmRzKClcclxuXHR7XHJcblx0XHR0aGlzLl9zcGhlcmVCb3VuZHNJbnZhbGlkID0gZmFsc2U7XHJcblxyXG5cdFx0aWYgKHRoaXMuX3BTcGhlcmVCb3VuZHMgPT0gbnVsbClcclxuXHRcdFx0dGhpcy5fcFNwaGVyZUJvdW5kcyA9IG5ldyBTcGhlcmUoKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCA9IERpc3BsYXlPYmplY3Q7Il19