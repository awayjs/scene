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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0Rpc3BsYXlPYmplY3QudHMiXSwibmFtZXMiOlsiRGlzcGxheU9iamVjdCIsIkRpc3BsYXlPYmplY3QuY29uc3RydWN0b3IiLCJEaXNwbGF5T2JqZWN0LmJvdW5kc1R5cGUiLCJEaXNwbGF5T2JqZWN0LmRlcHRoIiwiRGlzcGxheU9iamVjdC5ldWxlcnMiLCJEaXNwbGF5T2JqZWN0LmhlaWdodCIsIkRpc3BsYXlPYmplY3QuaW5kZXgiLCJEaXNwbGF5T2JqZWN0LmludmVyc2VTY2VuZVRyYW5zZm9ybSIsIkRpc3BsYXlPYmplY3QuaWdub3JlVHJhbnNmb3JtIiwiRGlzcGxheU9iamVjdC5pc0VudGl0eSIsIkRpc3BsYXlPYmplY3QubG9hZGVySW5mbyIsIkRpc3BsYXlPYmplY3QubW91c2VFbmFibGVkIiwiRGlzcGxheU9iamVjdC5tb3VzZVgiLCJEaXNwbGF5T2JqZWN0Lm1vdXNlWSIsIkRpc3BsYXlPYmplY3QucGFyZW50IiwiRGlzcGxheU9iamVjdC5wYXJ0aXRpb24iLCJEaXNwbGF5T2JqZWN0LnBpY2tpbmdDb2xsaWRlciIsIkRpc3BsYXlPYmplY3QucGl2b3QiLCJEaXNwbGF5T2JqZWN0LnJvb3QiLCJEaXNwbGF5T2JqZWN0LnJvdGF0aW9uWCIsIkRpc3BsYXlPYmplY3Qucm90YXRpb25ZIiwiRGlzcGxheU9iamVjdC5yb3RhdGlvbloiLCJEaXNwbGF5T2JqZWN0LnNjYWxlWCIsIkRpc3BsYXlPYmplY3Quc2NhbGVZIiwiRGlzcGxheU9iamVjdC5zY2FsZVoiLCJEaXNwbGF5T2JqZWN0LnNjZW5lIiwiRGlzcGxheU9iamVjdC5zY2VuZVBvc2l0aW9uIiwiRGlzcGxheU9iamVjdC5zY2VuZVRyYW5zZm9ybSIsIkRpc3BsYXlPYmplY3Quc2hhZGVyUGlja2luZ0RldGFpbHMiLCJEaXNwbGF5T2JqZWN0LmRlYnVnVmlzaWJsZSIsIkRpc3BsYXlPYmplY3QudHJhbnNmb3JtIiwiRGlzcGxheU9iamVjdC52aXNpYmxlIiwiRGlzcGxheU9iamVjdC53aWR0aCIsIkRpc3BsYXlPYmplY3QueCIsIkRpc3BsYXlPYmplY3QueSIsIkRpc3BsYXlPYmplY3QueiIsIkRpc3BsYXlPYmplY3Quek9mZnNldCIsIkRpc3BsYXlPYmplY3QuYWRkRXZlbnRMaXN0ZW5lciIsIkRpc3BsYXlPYmplY3QuY2xvbmUiLCJEaXNwbGF5T2JqZWN0LmRpc3Bvc2UiLCJEaXNwbGF5T2JqZWN0LmRpc3Bvc2VBc3NldCIsIkRpc3BsYXlPYmplY3QuZ2V0Qm91bmRzIiwiRGlzcGxheU9iamVjdC5nZXRSZWN0IiwiRGlzcGxheU9iamVjdC5nZXRCb3giLCJEaXNwbGF5T2JqZWN0LmdldFNwaGVyZSIsIkRpc3BsYXlPYmplY3QuZ2xvYmFsVG9Mb2NhbCIsIkRpc3BsYXlPYmplY3QuZ2xvYmFsVG9Mb2NhbDNEIiwiRGlzcGxheU9iamVjdC5oaXRUZXN0T2JqZWN0IiwiRGlzcGxheU9iamVjdC5oaXRUZXN0UG9pbnQiLCJEaXNwbGF5T2JqZWN0Lmxvb2tBdCIsIkRpc3BsYXlPYmplY3QubG9jYWxUb0dsb2JhbCIsIkRpc3BsYXlPYmplY3QubG9jYWxUb0dsb2JhbDNEIiwiRGlzcGxheU9iamVjdC5tb3ZlVG8iLCJEaXNwbGF5T2JqZWN0Lm1vdmVQaXZvdCIsIkRpc3BsYXlPYmplY3QucGl0Y2giLCJEaXNwbGF5T2JqZWN0LmdldFJlbmRlclNjZW5lVHJhbnNmb3JtIiwiRGlzcGxheU9iamVjdC5yb2xsIiwiRGlzcGxheU9iamVjdC5yb3RhdGUiLCJEaXNwbGF5T2JqZWN0LnJvdGF0ZVRvIiwiRGlzcGxheU9iamVjdC5yZW1vdmVFdmVudExpc3RlbmVyIiwiRGlzcGxheU9iamVjdC50cmFuc2xhdGUiLCJEaXNwbGF5T2JqZWN0LnRyYW5zbGF0ZUxvY2FsIiwiRGlzcGxheU9iamVjdC55YXciLCJEaXNwbGF5T2JqZWN0Ll9pQXNzaWduZWRQYXJ0aXRpb24iLCJEaXNwbGF5T2JqZWN0Ll9pTWF0cml4M0QiLCJEaXNwbGF5T2JqZWN0Ll9pUGlja2luZ0NvbGxpc2lvblZPIiwiRGlzcGxheU9iamVjdC5pU2V0UGFyZW50IiwiRGlzcGxheU9iamVjdC5wSW52YWxpZGF0ZVNjZW5lVHJhbnNmb3JtIiwiRGlzcGxheU9iamVjdC5fcFVwZGF0ZUltcGxpY2l0TW91c2VFbmFibGVkIiwiRGlzcGxheU9iamVjdC5fcFVwZGF0ZUltcGxpY2l0UGFydGl0aW9uIiwiRGlzcGxheU9iamVjdC5fcFVwZGF0ZUltcGxpY2l0VmlzaWJpbGl0eSIsIkRpc3BsYXlPYmplY3QuX3BVcGRhdGVNYXRyaXgzRCIsIkRpc3BsYXlPYmplY3QucFVwZGF0ZVNjZW5lVHJhbnNmb3JtIiwiRGlzcGxheU9iamVjdC5faUFkZFJlbmRlcmFibGUiLCJEaXNwbGF5T2JqZWN0Ll9pUmVtb3ZlUmVuZGVyYWJsZSIsIkRpc3BsYXlPYmplY3QuX2lUZXN0Q29sbGlzaW9uIiwiRGlzcGxheU9iamVjdC5faUludGVybmFsVXBkYXRlIiwiRGlzcGxheU9iamVjdC5faUlzVmlzaWJsZSIsIkRpc3BsYXlPYmplY3QuX2lJc01vdXNlRW5hYmxlZCIsIkRpc3BsYXlPYmplY3QuX2lTZXRTY2VuZSIsIkRpc3BsYXlPYmplY3Qubm90aWZ5UG9zaXRpb25DaGFuZ2VkIiwiRGlzcGxheU9iamVjdC5ub3RpZnlSb3RhdGlvbkNoYW5nZWQiLCJEaXNwbGF5T2JqZWN0Lm5vdGlmeVNjYWxlQ2hhbmdlZCIsIkRpc3BsYXlPYmplY3Qubm90aWZ5U2NlbmVDaGFuZ2UiLCJEaXNwbGF5T2JqZWN0Lm5vdGlmeVNjZW5lVHJhbnNmb3JtQ2hhbmdlIiwiRGlzcGxheU9iamVjdC5pbnZhbGlkYXRlTWF0cml4M0QiLCJEaXNwbGF5T2JqZWN0LmludmFsaWRhdGVQYXJ0aXRpb24iLCJEaXNwbGF5T2JqZWN0LmludmFsaWRhdGVQaXZvdCIsIkRpc3BsYXlPYmplY3QuaW52YWxpZGF0ZVBvc2l0aW9uIiwiRGlzcGxheU9iamVjdC5pbnZhbGlkYXRlUm90YXRpb24iLCJEaXNwbGF5T2JqZWN0LmludmFsaWRhdGVTY2FsZSIsIkRpc3BsYXlPYmplY3QuX2lBZGRFbnRpdHlOb2RlIiwiRGlzcGxheU9iamVjdC5faVJlbW92ZUVudGl0eU5vZGUiLCJEaXNwbGF5T2JqZWN0Ll9wUmVnaXN0ZXJFbnRpdHkiLCJEaXNwbGF5T2JqZWN0Ll9wVW5yZWdpc3RlckVudGl0eSIsIkRpc3BsYXlPYmplY3QuX3BJbnZhbGlkYXRlQm91bmRzIiwiRGlzcGxheU9iamVjdC5fcFVwZGF0ZUJveEJvdW5kcyIsIkRpc3BsYXlPYmplY3QuX3BVcGRhdGVTcGhlcmVCb3VuZHMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLElBQU8sR0FBRyxXQUFpQiwwQkFBMEIsQ0FBQyxDQUFDO0FBQ3ZELElBQU8sTUFBTSxXQUFnQiw2QkFBNkIsQ0FBQyxDQUFDO0FBQzVELElBQU8sVUFBVSxXQUFlLGlDQUFpQyxDQUFDLENBQUM7QUFDbkUsSUFBTyxRQUFRLFdBQWdCLCtCQUErQixDQUFDLENBQUM7QUFDaEUsSUFBTyxhQUFhLFdBQWMsb0NBQW9DLENBQUMsQ0FBQztBQUN4RSxJQUFPLEtBQUssV0FBZ0IsNEJBQTRCLENBQUMsQ0FBQztBQUUxRCxJQUFPLFFBQVEsV0FBZ0IsK0JBQStCLENBQUMsQ0FBQztBQUNoRSxJQUFPLGNBQWMsV0FBYyx3Q0FBd0MsQ0FBQyxDQUFDO0FBQzdFLElBQU8sbUJBQW1CLFdBQWEsNENBQTRDLENBQUMsQ0FBQztBQUtyRixJQUFPLGFBQWEsV0FBYyx1Q0FBdUMsQ0FBQyxDQUFDO0FBRTNFLElBQU8sZUFBZSxXQUFjLHlDQUF5QyxDQUFDLENBQUM7QUFFL0UsSUFBTyxTQUFTLFdBQWUsbUNBQW1DLENBQUMsQ0FBQztBQUlwRSxJQUFPLGtCQUFrQixXQUFhLDRDQUE0QyxDQUFDLENBQUM7QUFHcEYsSUFBTyxrQkFBa0IsV0FBYSw4Q0FBOEMsQ0FBQyxDQUFDO0FBQ3RGLElBQU8sVUFBVSxXQUFlLHNDQUFzQyxDQUFDLENBQUM7QUFHeEUsQUFpSUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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QVNBLEVBQUVBLENBQUNBO1FBRXBCQSxLQUFLQSxHQUFHQSxNQUFNQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQTtRQUNsREEsS0FBS0EsQ0FBQ0EsU0FBU0EsRUFBRUEsQ0FBQ0E7UUFFbEJBLEtBQUtBLEdBQUdBLE1BQU1BLENBQUNBLFlBQVlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO1FBQ25DQSxLQUFLQSxDQUFDQSxTQUFTQSxFQUFFQSxDQUFDQTtRQUVsQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDekJBLEtBQUtBLENBQUNBLENBQUNBLEdBQUdBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBO1lBQ25CQSxLQUFLQSxDQUFDQSxDQUFDQSxHQUFHQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNuQkEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDWkEsS0FBS0EsQ0FBQ0EsU0FBU0EsRUFBRUEsQ0FBQ0E7UUFDbkJBLENBQUNBO1FBRURBLEtBQUtBLEdBQUdBLEtBQUtBLENBQUNBLFlBQVlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO1FBRWxDQSxHQUFHQSxHQUFHQSxhQUFhQSxDQUFDQSxrQkFBa0JBLENBQUNBO1FBRXZDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNqQkEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDakJBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBO1FBQ2pCQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtRQUVYQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQSxDQUFD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QUFDQTtRQUM1QkEsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7UUFDNUJBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBO1FBRTVCQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxvQkFBb0JBLENBQUNBLENBQUNBO1FBRXBEQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUN0QkEsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7WUFDakRBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBO1lBQ2pEQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQTtZQUNqREEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNqR0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsSUFBSUEsYUFBYUEsQ0FBQ0EsV0FBV0EsQ0FBQ0E7Z0JBQ25EQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxpQkFBaUJBLENBQUNBLElBQUlBLENBQUNBLE1B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ImJhc2UvRGlzcGxheU9iamVjdC5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmxlbmRNb2RlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9kYXRhL0JsZW5kTW9kZVwiKTtcbmltcG9ydCBCb3hcdFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL0JveFwiKTtcbmltcG9ydCBTcGhlcmVcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9TcGhlcmVcIik7XG5pbXBvcnQgTWF0aENvbnN0c1x0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9NYXRoQ29uc3RzXCIpO1xuaW1wb3J0IE1hdHJpeDNEXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vTWF0cml4M0RcIik7XG5pbXBvcnQgTWF0cml4M0RVdGlsc1x0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vTWF0cml4M0RVdGlsc1wiKTtcbmltcG9ydCBQb2ludFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1BvaW50XCIpO1xuaW1wb3J0IFJlY3RhbmdsZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9SZWN0YW5nbGVcIik7XG5pbXBvcnQgVmVjdG9yM0RcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9WZWN0b3IzRFwiKTtcbmltcG9ydCBOYW1lZEFzc2V0QmFzZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvTmFtZWRBc3NldEJhc2VcIik7XG5pbXBvcnQgQWJzdHJhY3RNZXRob2RFcnJvclx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9lcnJvcnMvQWJzdHJhY3RNZXRob2RFcnJvclwiKTtcblxuaW1wb3J0IERpc3BsYXlPYmplY3RDb250YWluZXJcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2NvbnRhaW5lcnMvRGlzcGxheU9iamVjdENvbnRhaW5lclwiKTtcbmltcG9ydCBTY2VuZVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9jb250YWluZXJzL1NjZW5lXCIpO1xuaW1wb3J0IENvbnRyb2xsZXJCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvY29udHJvbGxlcnMvQ29udHJvbGxlckJhc2VcIik7XG5pbXBvcnQgQWxpZ25tZW50TW9kZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvQWxpZ25tZW50TW9kZVwiKTtcbmltcG9ydCBMb2FkZXJJbmZvXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0xvYWRlckluZm9cIik7XG5pbXBvcnQgT3JpZW50YXRpb25Nb2RlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9PcmllbnRhdGlvbk1vZGVcIik7XG5pbXBvcnQgSUJpdG1hcERyYXdhYmxlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9JQml0bWFwRHJhd2FibGVcIik7XG5pbXBvcnQgVHJhbnNmb3JtXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL1RyYW5zZm9ybVwiKTtcbmltcG9ydCBFbnRpdHlOb2RlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vRW50aXR5Tm9kZVwiKTtcbmltcG9ydCBQYXJ0aXRpb25cdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3BhcnRpdGlvbi9QYXJ0aXRpb25cIik7XG5pbXBvcnQgSVBpY2tpbmdDb2xsaWRlclx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3BpY2svSVBpY2tpbmdDb2xsaWRlclwiKTtcbmltcG9ydCBQaWNraW5nQ29sbGlzaW9uVk9cdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcGljay9QaWNraW5nQ29sbGlzaW9uVk9cIik7XG5pbXBvcnQgSVJlbmRlcmFibGVcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3Bvb2wvSVJlbmRlcmFibGVcIik7XG5pbXBvcnQgQ2FtZXJhXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2VudGl0aWVzL0NhbWVyYVwiKTtcbmltcG9ydCBEaXNwbGF5T2JqZWN0RXZlbnRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZXZlbnRzL0Rpc3BsYXlPYmplY3RFdmVudFwiKTtcbmltcG9ydCBTY2VuZUV2ZW50XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9ldmVudHMvU2NlbmVFdmVudFwiKTtcbmltcG9ydCBQcmVmYWJCYXNlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wcmVmYWJzL1ByZWZhYkJhc2VcIik7XG5cbi8qKlxuICogVGhlIERpc3BsYXlPYmplY3QgY2xhc3MgaXMgdGhlIGJhc2UgY2xhc3MgZm9yIGFsbCBvYmplY3RzIHRoYXQgY2FuIGJlXG4gKiBwbGFjZWQgb24gdGhlIGRpc3BsYXkgbGlzdC4gVGhlIGRpc3BsYXkgbGlzdCBtYW5hZ2VzIGFsbCBvYmplY3RzIGRpc3BsYXllZFxuICogaW4gZmxhc2guIFVzZSB0aGUgRGlzcGxheU9iamVjdENvbnRhaW5lciBjbGFzcyB0byBhcnJhbmdlIHRoZVxuICogZGlzcGxheSBvYmplY3RzIGluIHRoZSBkaXNwbGF5IGxpc3QuIERpc3BsYXlPYmplY3RDb250YWluZXIgb2JqZWN0cyBjYW5cbiAqIGhhdmUgY2hpbGQgZGlzcGxheSBvYmplY3RzLCB3aGlsZSBvdGhlciBkaXNwbGF5IG9iamVjdHMsIHN1Y2ggYXMgU2hhcGUgYW5kXG4gKiBUZXh0RmllbGQgb2JqZWN0cywgYXJlIFwibGVhZlwiIG5vZGVzIHRoYXQgaGF2ZSBvbmx5IHBhcmVudHMgYW5kIHNpYmxpbmdzLCBub1xuICogY2hpbGRyZW4uXG4gKlxuICogPHA+VGhlIERpc3BsYXlPYmplY3QgY2xhc3Mgc3VwcG9ydHMgYmFzaWMgZnVuY3Rpb25hbGl0eSBsaWtlIHRoZSA8aT54PC9pPlxuICogYW5kIDxpPnk8L2k+IHBvc2l0aW9uIG9mIGFuIG9iamVjdCwgYXMgd2VsbCBhcyBtb3JlIGFkdmFuY2VkIHByb3BlcnRpZXMgb2ZcbiAqIHRoZSBvYmplY3Qgc3VjaCBhcyBpdHMgdHJhbnNmb3JtYXRpb24gbWF0cml4LiA8L3A+XG4gKlxuICogPHA+RGlzcGxheU9iamVjdCBpcyBhbiBhYnN0cmFjdCBiYXNlIGNsYXNzOyB0aGVyZWZvcmUsIHlvdSBjYW5ub3QgY2FsbFxuICogRGlzcGxheU9iamVjdCBkaXJlY3RseS4gSW52b2tpbmcgPGNvZGU+bmV3IERpc3BsYXlPYmplY3QoKTwvY29kZT4gdGhyb3dzIGFuXG4gKiA8Y29kZT5Bcmd1bWVudEVycm9yPC9jb2RlPiBleGNlcHRpb24uIDwvcD5cbiAqXG4gKiA8cD5BbGwgZGlzcGxheSBvYmplY3RzIGluaGVyaXQgZnJvbSB0aGUgRGlzcGxheU9iamVjdCBjbGFzcy48L3A+XG4gKlxuICogPHA+VGhlIERpc3BsYXlPYmplY3QgY2xhc3MgaXRzZWxmIGRvZXMgbm90IGluY2x1ZGUgYW55IEFQSXMgZm9yIHJlbmRlcmluZ1xuICogY29udGVudCBvbnNjcmVlbi4gRm9yIHRoYXQgcmVhc29uLCBpZiB5b3Ugd2FudCBjcmVhdGUgYSBjdXN0b20gc3ViY2xhc3Mgb2ZcbiAqIHRoZSBEaXNwbGF5T2JqZWN0IGNsYXNzLCB5b3Ugd2lsbCB3YW50IHRvIGV4dGVuZCBvbmUgb2YgaXRzIHN1YmNsYXNzZXMgdGhhdFxuICogZG8gaGF2ZSBBUElzIGZvciByZW5kZXJpbmcgY29udGVudCBvbnNjcmVlbiwgc3VjaCBhcyB0aGUgU2hhcGUsIFNwcml0ZSxcbiAqIEJpdG1hcCwgU2ltcGxlQnV0dG9uLCBUZXh0RmllbGQsIG9yIE1vdmllQ2xpcCBjbGFzcy48L3A+XG4gKlxuICogPHA+VGhlIERpc3BsYXlPYmplY3QgY2xhc3MgY29udGFpbnMgc2V2ZXJhbCBicm9hZGNhc3QgZXZlbnRzLiBOb3JtYWxseSwgdGhlXG4gKiB0YXJnZXQgb2YgYW55IHBhcnRpY3VsYXIgZXZlbnQgaXMgYSBzcGVjaWZpYyBEaXNwbGF5T2JqZWN0IGluc3RhbmNlLiBGb3JcbiAqIGV4YW1wbGUsIHRoZSB0YXJnZXQgb2YgYW4gPGNvZGU+YWRkZWQ8L2NvZGU+IGV2ZW50IGlzIHRoZSBzcGVjaWZpY1xuICogRGlzcGxheU9iamVjdCBpbnN0YW5jZSB0aGF0IHdhcyBhZGRlZCB0byB0aGUgZGlzcGxheSBsaXN0LiBIYXZpbmcgYSBzaW5nbGVcbiAqIHRhcmdldCByZXN0cmljdHMgdGhlIHBsYWNlbWVudCBvZiBldmVudCBsaXN0ZW5lcnMgdG8gdGhhdCB0YXJnZXQgYW5kIGluXG4gKiBzb21lIGNhc2VzIHRoZSB0YXJnZXQncyBhbmNlc3RvcnMgb24gdGhlIGRpc3BsYXkgbGlzdC4gV2l0aCBicm9hZGNhc3RcbiAqIGV2ZW50cywgaG93ZXZlciwgdGhlIHRhcmdldCBpcyBub3QgYSBzcGVjaWZpYyBEaXNwbGF5T2JqZWN0IGluc3RhbmNlLCBidXRcbiAqIHJhdGhlciBhbGwgRGlzcGxheU9iamVjdCBpbnN0YW5jZXMsIGluY2x1ZGluZyB0aG9zZSB0aGF0IGFyZSBub3Qgb24gdGhlXG4gKiBkaXNwbGF5IGxpc3QuIFRoaXMgbWVhbnMgdGhhdCB5b3UgY2FuIGFkZCBhIGxpc3RlbmVyIHRvIGFueSBEaXNwbGF5T2JqZWN0XG4gKiBpbnN0YW5jZSB0byBsaXN0ZW4gZm9yIGJyb2FkY2FzdCBldmVudHMuIEluIGFkZGl0aW9uIHRvIHRoZSBicm9hZGNhc3RcbiAqIGV2ZW50cyBsaXN0ZWQgaW4gdGhlIERpc3BsYXlPYmplY3QgY2xhc3MncyBFdmVudHMgdGFibGUsIHRoZSBEaXNwbGF5T2JqZWN0XG4gKiBjbGFzcyBhbHNvIGluaGVyaXRzIHR3byBicm9hZGNhc3QgZXZlbnRzIGZyb20gdGhlIEV2ZW50RGlzcGF0Y2hlciBjbGFzczpcbiAqIDxjb2RlPmFjdGl2YXRlPC9jb2RlPiBhbmQgPGNvZGU+ZGVhY3RpdmF0ZTwvY29kZT4uPC9wPlxuICpcbiAqIDxwPlNvbWUgcHJvcGVydGllcyBwcmV2aW91c2x5IHVzZWQgaW4gdGhlIEFjdGlvblNjcmlwdCAxLjAgYW5kIDIuMFxuICogTW92aWVDbGlwLCBUZXh0RmllbGQsIGFuZCBCdXR0b24gY2xhc3NlcyhzdWNoIGFzIDxjb2RlPl9hbHBoYTwvY29kZT4sXG4gKiA8Y29kZT5faGVpZ2h0PC9jb2RlPiwgPGNvZGU+X25hbWU8L2NvZGU+LCA8Y29kZT5fd2lkdGg8L2NvZGU+LFxuICogPGNvZGU+X3g8L2NvZGU+LCA8Y29kZT5feTwvY29kZT4sIGFuZCBvdGhlcnMpIGhhdmUgZXF1aXZhbGVudHMgaW4gdGhlXG4gKiBBY3Rpb25TY3JpcHQgMy4wIERpc3BsYXlPYmplY3QgY2xhc3MgdGhhdCBhcmUgcmVuYW1lZCBzbyB0aGF0IHRoZXkgbm9cbiAqIGxvbmdlciBiZWdpbiB3aXRoIHRoZSB1bmRlcnNjb3JlKF8pIGNoYXJhY3Rlci48L3A+XG4gKlxuICogPHA+Rm9yIG1vcmUgaW5mb3JtYXRpb24sIHNlZSB0aGUgXCJEaXNwbGF5IFByb2dyYW1taW5nXCIgY2hhcHRlciBvZiB0aGVcbiAqIDxpPkFjdGlvblNjcmlwdCAzLjAgRGV2ZWxvcGVyJ3MgR3VpZGU8L2k+LjwvcD5cbiAqIFxuICogQGV2ZW50IGFkZGVkICAgICAgICAgICAgRGlzcGF0Y2hlZCB3aGVuIGEgZGlzcGxheSBvYmplY3QgaXMgYWRkZWQgdG8gdGhlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5IGxpc3QuIFRoZSBmb2xsb3dpbmcgbWV0aG9kcyB0cmlnZ2VyIHRoaXNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50OlxuICogICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+RGlzcGxheU9iamVjdENvbnRhaW5lci5hZGRDaGlsZCgpPC9jb2RlPixcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPkRpc3BsYXlPYmplY3RDb250YWluZXIuYWRkQ2hpbGRBdCgpPC9jb2RlPi5cbiAqIEBldmVudCBhZGRlZFRvU2NlbmUgICAgIERpc3BhdGNoZWQgd2hlbiBhIGRpc3BsYXkgb2JqZWN0IGlzIGFkZGVkIHRvIHRoZSBvblxuICogICAgICAgICAgICAgICAgICAgICAgICAgc2NlbmUgZGlzcGxheSBsaXN0LCBlaXRoZXIgZGlyZWN0bHkgb3IgdGhyb3VnaCB0aGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGFkZGl0aW9uIG9mIGEgc3ViIHRyZWUgaW4gd2hpY2ggdGhlIGRpc3BsYXkgb2JqZWN0XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBpcyBjb250YWluZWQuIFRoZSBmb2xsb3dpbmcgbWV0aG9kcyB0cmlnZ2VyIHRoaXNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50OlxuICogICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+RGlzcGxheU9iamVjdENvbnRhaW5lci5hZGRDaGlsZCgpPC9jb2RlPixcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPkRpc3BsYXlPYmplY3RDb250YWluZXIuYWRkQ2hpbGRBdCgpPC9jb2RlPi5cbiAqIEBldmVudCBlbnRlckZyYW1lICAgICAgIFticm9hZGNhc3QgZXZlbnRdIERpc3BhdGNoZWQgd2hlbiB0aGUgcGxheWhlYWQgaXNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGVudGVyaW5nIGEgbmV3IGZyYW1lLiBJZiB0aGUgcGxheWhlYWQgaXMgbm90XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBtb3ZpbmcsIG9yIGlmIHRoZXJlIGlzIG9ubHkgb25lIGZyYW1lLCB0aGlzIGV2ZW50XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBpcyBkaXNwYXRjaGVkIGNvbnRpbnVvdXNseSBpbiBjb25qdW5jdGlvbiB3aXRoIHRoZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgZnJhbWUgcmF0ZS4gVGhpcyBldmVudCBpcyBhIGJyb2FkY2FzdCBldmVudCwgd2hpY2hcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIG1lYW5zIHRoYXQgaXQgaXMgZGlzcGF0Y2hlZCBieSBhbGwgZGlzcGxheSBvYmplY3RzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICB3aXRoIGEgbGlzdGVuZXIgcmVnaXN0ZXJlZCBmb3IgdGhpcyBldmVudC5cbiAqIEBldmVudCBleGl0RnJhbWUgICAgICAgIFticm9hZGNhc3QgZXZlbnRdIERpc3BhdGNoZWQgd2hlbiB0aGUgcGxheWhlYWQgaXNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGV4aXRpbmcgdGhlIGN1cnJlbnQgZnJhbWUuIEFsbCBmcmFtZSBzY3JpcHRzIGhhdmVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGJlZW4gcnVuLiBJZiB0aGUgcGxheWhlYWQgaXMgbm90IG1vdmluZywgb3IgaWZcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIHRoZXJlIGlzIG9ubHkgb25lIGZyYW1lLCB0aGlzIGV2ZW50IGlzIGRpc3BhdGNoZWRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVvdXNseSBpbiBjb25qdW5jdGlvbiB3aXRoIHRoZSBmcmFtZSByYXRlLlxuICogICAgICAgICAgICAgICAgICAgICAgICAgVGhpcyBldmVudCBpcyBhIGJyb2FkY2FzdCBldmVudCwgd2hpY2ggbWVhbnMgdGhhdFxuICogICAgICAgICAgICAgICAgICAgICAgICAgaXQgaXMgZGlzcGF0Y2hlZCBieSBhbGwgZGlzcGxheSBvYmplY3RzIHdpdGggYVxuICogICAgICAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXIgcmVnaXN0ZXJlZCBmb3IgdGhpcyBldmVudC5cbiAqIEBldmVudCBmcmFtZUNvbnN0cnVjdGVkIFticm9hZGNhc3QgZXZlbnRdIERpc3BhdGNoZWQgYWZ0ZXIgdGhlIGNvbnN0cnVjdG9yc1xuICogICAgICAgICAgICAgICAgICAgICAgICAgb2YgZnJhbWUgZGlzcGxheSBvYmplY3RzIGhhdmUgcnVuIGJ1dCBiZWZvcmUgZnJhbWVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIHNjcmlwdHMgaGF2ZSBydW4uIElmIHRoZSBwbGF5aGVhZCBpcyBub3QgbW92aW5nLCBvclxuICogICAgICAgICAgICAgICAgICAgICAgICAgaWYgdGhlcmUgaXMgb25seSBvbmUgZnJhbWUsIHRoaXMgZXZlbnQgaXNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoZWQgY29udGludW91c2x5IGluIGNvbmp1bmN0aW9uIHdpdGggdGhlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBmcmFtZSByYXRlLiBUaGlzIGV2ZW50IGlzIGEgYnJvYWRjYXN0IGV2ZW50LCB3aGljaFxuICogICAgICAgICAgICAgICAgICAgICAgICAgbWVhbnMgdGhhdCBpdCBpcyBkaXNwYXRjaGVkIGJ5IGFsbCBkaXNwbGF5IG9iamVjdHNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIHdpdGggYSBsaXN0ZW5lciByZWdpc3RlcmVkIGZvciB0aGlzIGV2ZW50LlxuICogQGV2ZW50IHJlbW92ZWQgICAgICAgICAgRGlzcGF0Y2hlZCB3aGVuIGEgZGlzcGxheSBvYmplY3QgaXMgYWJvdXQgdG8gYmVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZWQgZnJvbSB0aGUgZGlzcGxheSBsaXN0LiBUd28gbWV0aG9kcyBvZiB0aGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIERpc3BsYXlPYmplY3RDb250YWluZXIgY2xhc3MgZ2VuZXJhdGUgdGhpcyBldmVudDpcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPnJlbW92ZUNoaWxkKCk8L2NvZGU+IGFuZFxuICogICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+cmVtb3ZlQ2hpbGRBdCgpPC9jb2RlPi5cbiAqXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICA8cD5UaGUgZm9sbG93aW5nIG1ldGhvZHMgb2YgYVxuICogICAgICAgICAgICAgICAgICAgICAgICAgRGlzcGxheU9iamVjdENvbnRhaW5lciBvYmplY3QgYWxzbyBnZW5lcmF0ZSB0aGlzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBldmVudCBpZiBhbiBvYmplY3QgbXVzdCBiZSByZW1vdmVkIHRvIG1ha2Ugcm9vbSBmb3JcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIHRoZSBuZXcgb2JqZWN0OiA8Y29kZT5hZGRDaGlsZCgpPC9jb2RlPixcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPmFkZENoaWxkQXQoKTwvY29kZT4sIGFuZFxuICogICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+c2V0Q2hpbGRJbmRleCgpPC9jb2RlPi4gPC9wPlxuICogQGV2ZW50IHJlbW92ZWRGcm9tU2NlbmUgRGlzcGF0Y2hlZCB3aGVuIGEgZGlzcGxheSBvYmplY3QgaXMgYWJvdXQgdG8gYmVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZWQgZnJvbSB0aGUgZGlzcGxheSBsaXN0LCBlaXRoZXIgZGlyZWN0bHkgb3JcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIHRocm91Z2ggdGhlIHJlbW92YWwgb2YgYSBzdWIgdHJlZSBpbiB3aGljaCB0aGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXkgb2JqZWN0IGlzIGNvbnRhaW5lZC4gVHdvIG1ldGhvZHMgb2YgdGhlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIGNsYXNzIGdlbmVyYXRlIHRoaXMgZXZlbnQ6XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5yZW1vdmVDaGlsZCgpPC9jb2RlPiBhbmRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPnJlbW92ZUNoaWxkQXQoKTwvY29kZT4uXG4gKlxuICogICAgICAgICAgICAgICAgICAgICAgICAgPHA+VGhlIGZvbGxvd2luZyBtZXRob2RzIG9mIGFcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIERpc3BsYXlPYmplY3RDb250YWluZXIgb2JqZWN0IGFsc28gZ2VuZXJhdGUgdGhpc1xuICogICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQgaWYgYW4gb2JqZWN0IG11c3QgYmUgcmVtb3ZlZCB0byBtYWtlIHJvb20gZm9yXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICB0aGUgbmV3IG9iamVjdDogPGNvZGU+YWRkQ2hpbGQoKTwvY29kZT4sXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5hZGRDaGlsZEF0KCk8L2NvZGU+LCBhbmRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPnNldENoaWxkSW5kZXgoKTwvY29kZT4uIDwvcD5cbiAqIEBldmVudCByZW5kZXIgICAgICAgICAgIFticm9hZGNhc3QgZXZlbnRdIERpc3BhdGNoZWQgd2hlbiB0aGUgZGlzcGxheSBsaXN0XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBpcyBhYm91dCB0byBiZSB1cGRhdGVkIGFuZCByZW5kZXJlZC4gVGhpcyBldmVudFxuICogICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXMgdGhlIGxhc3Qgb3Bwb3J0dW5pdHkgZm9yIG9iamVjdHMgbGlzdGVuaW5nXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgdGhpcyBldmVudCB0byBtYWtlIGNoYW5nZXMgYmVmb3JlIHRoZSBkaXNwbGF5XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBsaXN0IGlzIHJlbmRlcmVkLiBZb3UgbXVzdCBjYWxsIHRoZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+aW52YWxpZGF0ZSgpPC9jb2RlPiBtZXRob2Qgb2YgdGhlIFNjZW5lXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3QgZWFjaCB0aW1lIHlvdSB3YW50IGEgPGNvZGU+cmVuZGVyPC9jb2RlPlxuICogICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQgdG8gYmUgZGlzcGF0Y2hlZC4gPGNvZGU+UmVuZGVyPC9jb2RlPiBldmVudHNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGFyZSBkaXNwYXRjaGVkIHRvIGFuIG9iamVjdCBvbmx5IGlmIHRoZXJlIGlzIG11dHVhbFxuICogICAgICAgICAgICAgICAgICAgICAgICAgdHJ1c3QgYmV0d2VlbiBpdCBhbmQgdGhlIG9iamVjdCB0aGF0IGNhbGxlZFxuICogICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+U2NlbmUuaW52YWxpZGF0ZSgpPC9jb2RlPi4gVGhpcyBldmVudCBpcyBhXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBicm9hZGNhc3QgZXZlbnQsIHdoaWNoIG1lYW5zIHRoYXQgaXQgaXMgZGlzcGF0Y2hlZFxuICogICAgICAgICAgICAgICAgICAgICAgICAgYnkgYWxsIGRpc3BsYXkgb2JqZWN0cyB3aXRoIGEgbGlzdGVuZXIgcmVnaXN0ZXJlZFxuICogICAgICAgICAgICAgICAgICAgICAgICAgZm9yIHRoaXMgZXZlbnQuXG4gKlxuICogICAgICAgICAgICAgICAgICAgICAgICAgPHA+PGI+Tm90ZTogPC9iPlRoaXMgZXZlbnQgaXMgbm90IGRpc3BhdGNoZWQgaWYgdGhlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5IGlzIG5vdCByZW5kZXJpbmcuIFRoaXMgaXMgdGhlIGNhc2Ugd2hlbiB0aGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgaXMgZWl0aGVyIG1pbmltaXplZCBvciBvYnNjdXJlZC4gPC9wPlxuICovXG5jbGFzcyBEaXNwbGF5T2JqZWN0IGV4dGVuZHMgTmFtZWRBc3NldEJhc2UgaW1wbGVtZW50cyBJQml0bWFwRHJhd2FibGVcbntcblx0cHJpdmF0ZSBfbG9hZGVySW5mbzpMb2FkZXJJbmZvO1xuXHRwcml2YXRlIF9tb3VzZVg6bnVtYmVyO1xuXHRwcml2YXRlIF9tb3VzZVk6bnVtYmVyO1xuXHRwcml2YXRlIF9yb290OkRpc3BsYXlPYmplY3RDb250YWluZXI7XG5cdHByaXZhdGUgX2JvdW5kczpSZWN0YW5nbGU7XG5cdHB1YmxpYyBfcEJveEJvdW5kczpCb3g7XG5cdHByaXZhdGUgX2JveEJvdW5kc0ludmFsaWQ6Ym9vbGVhbiA9IHRydWU7XG5cdHB1YmxpYyBfcFNwaGVyZUJvdW5kczpTcGhlcmU7XG5cdHByaXZhdGUgX3NwaGVyZUJvdW5kc0ludmFsaWQ6Ym9vbGVhbiA9IHRydWU7XG5cdHByaXZhdGUgX2RlYnVnVmlzaWJsZTpib29sZWFuO1xuXG5cdHB1YmxpYyBfcFNjZW5lOlNjZW5lO1xuXHRwdWJsaWMgX3BQYXJlbnQ6RGlzcGxheU9iamVjdENvbnRhaW5lcjtcblx0cHVibGljIF9wU2NlbmVUcmFuc2Zvcm06TWF0cml4M0QgPSBuZXcgTWF0cml4M0QoKTtcblx0cHVibGljIF9wU2NlbmVUcmFuc2Zvcm1EaXJ0eTpib29sZWFuID0gdHJ1ZTtcblx0cHVibGljIF9wSXNFbnRpdHk6Ym9vbGVhbjtcblxuXHRwcml2YXRlIF9leHBsaWNpdFBhcnRpdGlvbjpQYXJ0aXRpb247XG5cdHB1YmxpYyBfcEltcGxpY2l0UGFydGl0aW9uOlBhcnRpdGlvbjtcblxuXHRwcml2YXRlIF9zY2VuZVRyYW5zZm9ybUNoYW5nZWQ6RGlzcGxheU9iamVjdEV2ZW50O1xuXHRwcml2YXRlIF9zY2VuZWNoYW5nZWQ6RGlzcGxheU9iamVjdEV2ZW50O1xuXHRwcml2YXRlIF90cmFuc2Zvcm06VHJhbnNmb3JtO1xuXHRwcml2YXRlIF9tYXRyaXgzRDpNYXRyaXgzRCA9IG5ldyBNYXRyaXgzRCgpO1xuXHRwcml2YXRlIF9tYXRyaXgzRERpcnR5OmJvb2xlYW4gPSB0cnVlO1xuXG5cdHByaXZhdGUgX2ludmVyc2VTY2VuZVRyYW5zZm9ybTpNYXRyaXgzRCA9IG5ldyBNYXRyaXgzRCgpO1xuXHRwcml2YXRlIF9pbnZlcnNlU2NlbmVUcmFuc2Zvcm1EaXJ0eTpib29sZWFuID0gdHJ1ZTtcblx0cHJpdmF0ZSBfc2NlbmVQb3NpdGlvbjpWZWN0b3IzRCA9IG5ldyBWZWN0b3IzRCgpO1xuXHRwcml2YXRlIF9zY2VuZVBvc2l0aW9uRGlydHk6Ym9vbGVhbiA9IHRydWU7XG5cdHByaXZhdGUgX2V4cGxpY2l0VmlzaWJpbGl0eTpib29sZWFuID0gdHJ1ZTtcblx0cHVibGljIF9wSW1wbGljaXRWaXNpYmlsaXR5OmJvb2xlYW4gPSB0cnVlO1xuXHRwcml2YXRlIF9leHBsaWNpdE1vdXNlRW5hYmxlZDpib29sZWFuID0gdHJ1ZTtcblx0cHVibGljIF9wSW1wbGljaXRNb3VzZUVuYWJsZWQ6Ym9vbGVhbiA9IHRydWU7XG5cdHByaXZhdGUgX2xpc3RlblRvU2NlbmVUcmFuc2Zvcm1DaGFuZ2VkOmJvb2xlYW47XG5cdHByaXZhdGUgX2xpc3RlblRvU2NlbmVDaGFuZ2VkOmJvb2xlYW47XG5cblx0cHJpdmF0ZSBfcG9zaXRpb25EaXJ0eTpib29sZWFuID0gdHJ1ZTtcblx0cHJpdmF0ZSBfcm90YXRpb25EaXJ0eTpib29sZWFuID0gdHJ1ZTtcblx0cHJpdmF0ZSBfc2NhbGVEaXJ0eTpib29sZWFuID0gdHJ1ZTtcblxuXHRwcml2YXRlIF9wb3NpdGlvbkNoYW5nZWQ6RGlzcGxheU9iamVjdEV2ZW50O1xuXHRwcml2YXRlIF9yb3RhdGlvbkNoYW5nZWQ6RGlzcGxheU9iamVjdEV2ZW50O1xuXHRwcml2YXRlIF9zY2FsZUNoYW5nZWQ6RGlzcGxheU9iamVjdEV2ZW50O1xuXG5cdHByaXZhdGUgX3JvdGF0aW9uWDpudW1iZXIgPSAwO1xuXHRwcml2YXRlIF9yb3RhdGlvblk6bnVtYmVyID0gMDtcblx0cHJpdmF0ZSBfcm90YXRpb25aOm51bWJlciA9IDA7XG5cdHByaXZhdGUgX2V1bGVyczpWZWN0b3IzRCA9IG5ldyBWZWN0b3IzRCgpO1xuXHRwcml2YXRlIF9mbGlwWTpNYXRyaXgzRCA9IG5ldyBNYXRyaXgzRCgpO1xuXG5cdHByaXZhdGUgX2xpc3RlblRvUG9zaXRpb25DaGFuZ2VkOmJvb2xlYW47XG5cdHByaXZhdGUgX2xpc3RlblRvUm90YXRpb25DaGFuZ2VkOmJvb2xlYW47XG5cdHByaXZhdGUgX2xpc3RlblRvU2NhbGVDaGFuZ2VkOmJvb2xlYW47XG5cdHByaXZhdGUgX3pPZmZzZXQ6bnVtYmVyID0gMDtcblxuXHRwdWJsaWMgX3dpZHRoOm51bWJlcjtcblx0cHVibGljIF9oZWlnaHQ6bnVtYmVyO1xuXHRwdWJsaWMgX2RlcHRoOm51bWJlcjtcblxuXHRwdWJsaWMgX3BTY2FsZVg6bnVtYmVyID0gMTtcblx0cHVibGljIF9wU2NhbGVZOm51bWJlciA9IDE7XG5cdHB1YmxpYyBfcFNjYWxlWjpudW1iZXIgPSAxO1xuXHRwcml2YXRlIF94Om51bWJlciA9IDA7XG5cdHByaXZhdGUgX3k6bnVtYmVyID0gMDtcblx0cHJpdmF0ZSBfejpudW1iZXIgPSAwO1xuXHRwcml2YXRlIF9waXZvdDpWZWN0b3IzRCA9IG5ldyBWZWN0b3IzRCgpO1xuXHRwcml2YXRlIF9waXZvdFNjYWxlOlZlY3RvcjNEID0gbmV3IFZlY3RvcjNEKCk7XG5cdHByaXZhdGUgX29yaWVudGF0aW9uTWF0cml4Ok1hdHJpeDNEID0gbmV3IE1hdHJpeDNEKCk7XG5cdHByaXZhdGUgX3Bpdm90WmVybzpib29sZWFuID0gdHJ1ZTtcblx0cHJpdmF0ZSBfcGl2b3REaXJ0eTpib29sZWFuID0gdHJ1ZTtcblx0cHJpdmF0ZSBfcG9zOlZlY3RvcjNEID0gbmV3IFZlY3RvcjNEKCk7XG5cdHByaXZhdGUgX3JvdDpWZWN0b3IzRCA9IG5ldyBWZWN0b3IzRCgpO1xuXHRwcml2YXRlIF9zY2E6VmVjdG9yM0QgPSBuZXcgVmVjdG9yM0QoKTtcblx0cHJpdmF0ZSBfdHJhbnNmb3JtQ29tcG9uZW50czpBcnJheTxWZWN0b3IzRD47XG5cblx0cHVibGljIF9wSWdub3JlVHJhbnNmb3JtOmJvb2xlYW4gPSBmYWxzZTtcblxuXHRwcml2YXRlIF9zaGFkZXJQaWNraW5nRGV0YWlsczpib29sZWFuO1xuXG5cdHB1YmxpYyBfcFBpY2tpbmdDb2xsaXNpb25WTzpQaWNraW5nQ29sbGlzaW9uVk87XG5cblx0cHVibGljIF9ib3VuZHNUeXBlOnN0cmluZztcblxuXHRwdWJsaWMgX3BQaWNraW5nQ29sbGlkZXI6SVBpY2tpbmdDb2xsaWRlcjtcblxuXHRwdWJsaWMgX3BSZW5kZXJhYmxlczpBcnJheTxJUmVuZGVyYWJsZT4gPSBuZXcgQXJyYXk8SVJlbmRlcmFibGU+KCk7XG5cdHByaXZhdGUgX2VudGl0eU5vZGVzOkFycmF5PEVudGl0eU5vZGU+ID0gbmV3IEFycmF5PEVudGl0eU5vZGU+KCk7XG5cblx0cHVibGljIF9pU291cmNlUHJlZmFiOlByZWZhYkJhc2U7XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgYWxpZ25tZW50TW9kZTpzdHJpbmcgPSBBbGlnbm1lbnRNb2RlLlJFR0lTVFJBVElPTl9QT0lOVDtcblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHRoZSBhbHBoYSB0cmFuc3BhcmVuY3kgdmFsdWUgb2YgdGhlIG9iamVjdCBzcGVjaWZpZWQuIFZhbGlkXG5cdCAqIHZhbHVlcyBhcmUgMChmdWxseSB0cmFuc3BhcmVudCkgdG8gMShmdWxseSBvcGFxdWUpLiBUaGUgZGVmYXVsdCB2YWx1ZSBpc1xuXHQgKiAxLiBEaXNwbGF5IG9iamVjdHMgd2l0aCA8Y29kZT5hbHBoYTwvY29kZT4gc2V0IHRvIDAgPGk+YXJlPC9pPiBhY3RpdmUsXG5cdCAqIGV2ZW4gdGhvdWdoIHRoZXkgYXJlIGludmlzaWJsZS5cblx0ICovXG5cdHB1YmxpYyBhbHBoYTpudW1iZXI7XG5cblx0LyoqXG5cdCAqIEEgdmFsdWUgZnJvbSB0aGUgQmxlbmRNb2RlIGNsYXNzIHRoYXQgc3BlY2lmaWVzIHdoaWNoIGJsZW5kIG1vZGUgdG8gdXNlLiBBXG5cdCAqIGJpdG1hcCBjYW4gYmUgZHJhd24gaW50ZXJuYWxseSBpbiB0d28gd2F5cy4gSWYgeW91IGhhdmUgYSBibGVuZCBtb2RlXG5cdCAqIGVuYWJsZWQgb3IgYW4gZXh0ZXJuYWwgY2xpcHBpbmcgbWFzaywgdGhlIGJpdG1hcCBpcyBkcmF3biBieSBhZGRpbmcgYVxuXHQgKiBiaXRtYXAtZmlsbGVkIHNxdWFyZSBzaGFwZSB0byB0aGUgdmVjdG9yIHJlbmRlci4gSWYgeW91IGF0dGVtcHQgdG8gc2V0XG5cdCAqIHRoaXMgcHJvcGVydHkgdG8gYW4gaW52YWxpZCB2YWx1ZSwgRmxhc2ggcnVudGltZXMgc2V0IHRoZSB2YWx1ZSB0b1xuXHQgKiA8Y29kZT5CbGVuZE1vZGUuTk9STUFMPC9jb2RlPi5cblx0ICpcblx0ICogPHA+VGhlIDxjb2RlPmJsZW5kTW9kZTwvY29kZT4gcHJvcGVydHkgYWZmZWN0cyBlYWNoIHBpeGVsIG9mIHRoZSBkaXNwbGF5XG5cdCAqIG9iamVjdC4gRWFjaCBwaXhlbCBpcyBjb21wb3NlZCBvZiB0aHJlZSBjb25zdGl0dWVudCBjb2xvcnMocmVkLCBncmVlbixcblx0ICogYW5kIGJsdWUpLCBhbmQgZWFjaCBjb25zdGl0dWVudCBjb2xvciBoYXMgYSB2YWx1ZSBiZXR3ZWVuIDB4MDAgYW5kIDB4RkYuXG5cdCAqIEZsYXNoIFBsYXllciBvciBBZG9iZSBBSVIgY29tcGFyZXMgZWFjaCBjb25zdGl0dWVudCBjb2xvciBvZiBvbmUgcGl4ZWwgaW5cblx0ICogdGhlIG1vdmllIGNsaXAgd2l0aCB0aGUgY29ycmVzcG9uZGluZyBjb2xvciBvZiB0aGUgcGl4ZWwgaW4gdGhlXG5cdCAqIGJhY2tncm91bmQuIEZvciBleGFtcGxlLCBpZiA8Y29kZT5ibGVuZE1vZGU8L2NvZGU+IGlzIHNldCB0b1xuXHQgKiA8Y29kZT5CbGVuZE1vZGUuTElHSFRFTjwvY29kZT4sIEZsYXNoIFBsYXllciBvciBBZG9iZSBBSVIgY29tcGFyZXMgdGhlIHJlZFxuXHQgKiB2YWx1ZSBvZiB0aGUgZGlzcGxheSBvYmplY3Qgd2l0aCB0aGUgcmVkIHZhbHVlIG9mIHRoZSBiYWNrZ3JvdW5kLCBhbmQgdXNlc1xuXHQgKiB0aGUgbGlnaHRlciBvZiB0aGUgdHdvIGFzIHRoZSB2YWx1ZSBmb3IgdGhlIHJlZCBjb21wb25lbnQgb2YgdGhlIGRpc3BsYXllZFxuXHQgKiBjb2xvci48L3A+XG5cdCAqXG5cdCAqIDxwPlRoZSBmb2xsb3dpbmcgdGFibGUgZGVzY3JpYmVzIHRoZSA8Y29kZT5ibGVuZE1vZGU8L2NvZGU+IHNldHRpbmdzLiBUaGVcblx0ICogQmxlbmRNb2RlIGNsYXNzIGRlZmluZXMgc3RyaW5nIHZhbHVlcyB5b3UgY2FuIHVzZS4gVGhlIGlsbHVzdHJhdGlvbnMgaW5cblx0ICogdGhlIHRhYmxlIHNob3cgPGNvZGU+YmxlbmRNb2RlPC9jb2RlPiB2YWx1ZXMgYXBwbGllZCB0byBhIGNpcmN1bGFyIGRpc3BsYXlcblx0ICogb2JqZWN0KDIpIHN1cGVyaW1wb3NlZCBvbiBhbm90aGVyIGRpc3BsYXkgb2JqZWN0KDEpLjwvcD5cblx0ICovXG5cdHB1YmxpYyBibGVuZE1vZGU6QmxlbmRNb2RlO1xuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBib3VuZHNUeXBlKCk6c3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fYm91bmRzVHlwZTtcblx0fVxuXG5cdHB1YmxpYyBzZXQgYm91bmRzVHlwZSh2YWx1ZTpzdHJpbmcpXG5cdHtcblx0XHRpZiAodGhpcy5fYm91bmRzVHlwZSA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX2JvdW5kc1R5cGUgPSB2YWx1ZTtcblxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlQm91bmRzKCk7XG5cblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX2VudGl0eU5vZGVzLmxlbmd0aDtcblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBsZW47IGkrKylcblx0XHRcdHRoaXMuX2VudGl0eU5vZGVzW2ldLnVwZGF0ZUJvdW5kcygpO1xuXHR9XG5cblx0LyoqXG5cdCAqIElmIHNldCB0byA8Y29kZT50cnVlPC9jb2RlPiwgTk1FIHdpbGwgdXNlIHRoZSBzb2Z0d2FyZSByZW5kZXJlciB0byBjYWNoZVxuXHQgKiBhbiBpbnRlcm5hbCBiaXRtYXAgcmVwcmVzZW50YXRpb24gb2YgdGhlIGRpc3BsYXkgb2JqZWN0LiBGb3IgbmF0aXZlIHRhcmdldHMsXG5cdCAqIHRoaXMgaXMgb2Z0ZW4gbXVjaCBzbG93ZXIgdGhhbiB0aGUgZGVmYXVsdCBoYXJkd2FyZSByZW5kZXJlci4gV2hlbiB5b3Vcblx0ICogYXJlIHVzaW5nIHRoZSBGbGFzaCB0YXJnZXQsIHRoaXMgY2FjaGluZyBtYXkgaW5jcmVhc2UgcGVyZm9ybWFuY2UgZm9yIGRpc3BsYXlcblx0ICogb2JqZWN0cyB0aGF0IGNvbnRhaW4gY29tcGxleCB2ZWN0b3IgY29udGVudC5cblx0ICpcblx0ICogPHA+QWxsIHZlY3RvciBkYXRhIGZvciBhIGRpc3BsYXkgb2JqZWN0IHRoYXQgaGFzIGEgY2FjaGVkIGJpdG1hcCBpcyBkcmF3blxuXHQgKiB0byB0aGUgYml0bWFwIGluc3RlYWQgb2YgdGhlIG1haW4gZGlzcGxheS4gSWZcblx0ICogPGNvZGU+Y2FjaGVBc0JpdG1hcE1hdHJpeDwvY29kZT4gaXMgbnVsbCBvciB1bnN1cHBvcnRlZCwgdGhlIGJpdG1hcCBpc1xuXHQgKiB0aGVuIGNvcGllZCB0byB0aGUgbWFpbiBkaXNwbGF5IGFzIHVuc3RyZXRjaGVkLCB1bnJvdGF0ZWQgcGl4ZWxzIHNuYXBwZWRcblx0ICogdG8gdGhlIG5lYXJlc3QgcGl4ZWwgYm91bmRhcmllcy4gUGl4ZWxzIGFyZSBtYXBwZWQgMSB0byAxIHdpdGggdGhlIHBhcmVudFxuXHQgKiBvYmplY3QuIElmIHRoZSBib3VuZHMgb2YgdGhlIGJpdG1hcCBjaGFuZ2UsIHRoZSBiaXRtYXAgaXMgcmVjcmVhdGVkXG5cdCAqIGluc3RlYWQgb2YgYmVpbmcgc3RyZXRjaGVkLjwvcD5cblx0ICpcblx0ICogPHA+SWYgPGNvZGU+Y2FjaGVBc0JpdG1hcE1hdHJpeDwvY29kZT4gaXMgbm9uLW51bGwgYW5kIHN1cHBvcnRlZCwgdGhlXG5cdCAqIG9iamVjdCBpcyBkcmF3biB0byB0aGUgb2ZmLXNjcmVlbiBiaXRtYXAgdXNpbmcgdGhhdCBtYXRyaXggYW5kIHRoZVxuXHQgKiBzdHJldGNoZWQgYW5kL29yIHJvdGF0ZWQgcmVzdWx0cyBvZiB0aGF0IHJlbmRlcmluZyBhcmUgdXNlZCB0byBkcmF3IHRoZVxuXHQgKiBvYmplY3QgdG8gdGhlIG1haW4gZGlzcGxheS48L3A+XG5cdCAqXG5cdCAqIDxwPk5vIGludGVybmFsIGJpdG1hcCBpcyBjcmVhdGVkIHVubGVzcyB0aGUgPGNvZGU+Y2FjaGVBc0JpdG1hcDwvY29kZT5cblx0ICogcHJvcGVydHkgaXMgc2V0IHRvIDxjb2RlPnRydWU8L2NvZGU+LjwvcD5cblx0ICpcblx0ICogPHA+QWZ0ZXIgeW91IHNldCB0aGUgPGNvZGU+Y2FjaGVBc0JpdG1hcDwvY29kZT4gcHJvcGVydHkgdG9cblx0ICogPGNvZGU+dHJ1ZTwvY29kZT4sIHRoZSByZW5kZXJpbmcgZG9lcyBub3QgY2hhbmdlLCBob3dldmVyIHRoZSBkaXNwbGF5XG5cdCAqIG9iamVjdCBwZXJmb3JtcyBwaXhlbCBzbmFwcGluZyBhdXRvbWF0aWNhbGx5LiBUaGUgYW5pbWF0aW9uIHNwZWVkIGNhbiBiZVxuXHQgKiBzaWduaWZpY2FudGx5IGZhc3RlciBkZXBlbmRpbmcgb24gdGhlIGNvbXBsZXhpdHkgb2YgdGhlIHZlY3RvciBjb250ZW50LlxuXHQgKiA8L3A+XG5cdCAqXG5cdCAqIDxwPlRoZSA8Y29kZT5jYWNoZUFzQml0bWFwPC9jb2RlPiBwcm9wZXJ0eSBpcyBhdXRvbWF0aWNhbGx5IHNldCB0b1xuXHQgKiA8Y29kZT50cnVlPC9jb2RlPiB3aGVuZXZlciB5b3UgYXBwbHkgYSBmaWx0ZXIgdG8gYSBkaXNwbGF5IG9iamVjdCh3aGVuXG5cdCAqIGl0cyA8Y29kZT5maWx0ZXI8L2NvZGU+IGFycmF5IGlzIG5vdCBlbXB0eSksIGFuZCBpZiBhIGRpc3BsYXkgb2JqZWN0IGhhcyBhXG5cdCAqIGZpbHRlciBhcHBsaWVkIHRvIGl0LCA8Y29kZT5jYWNoZUFzQml0bWFwPC9jb2RlPiBpcyByZXBvcnRlZCBhc1xuXHQgKiA8Y29kZT50cnVlPC9jb2RlPiBmb3IgdGhhdCBkaXNwbGF5IG9iamVjdCwgZXZlbiBpZiB5b3Ugc2V0IHRoZSBwcm9wZXJ0eSB0b1xuXHQgKiA8Y29kZT5mYWxzZTwvY29kZT4uIElmIHlvdSBjbGVhciBhbGwgZmlsdGVycyBmb3IgYSBkaXNwbGF5IG9iamVjdCwgdGhlXG5cdCAqIDxjb2RlPmNhY2hlQXNCaXRtYXA8L2NvZGU+IHNldHRpbmcgY2hhbmdlcyB0byB3aGF0IGl0IHdhcyBsYXN0IHNldCB0by48L3A+XG5cdCAqXG5cdCAqIDxwPkEgZGlzcGxheSBvYmplY3QgZG9lcyBub3QgdXNlIGEgYml0bWFwIGV2ZW4gaWYgdGhlXG5cdCAqIDxjb2RlPmNhY2hlQXNCaXRtYXA8L2NvZGU+IHByb3BlcnR5IGlzIHNldCB0byA8Y29kZT50cnVlPC9jb2RlPiBhbmRcblx0ICogaW5zdGVhZCByZW5kZXJzIGZyb20gdmVjdG9yIGRhdGEgaW4gdGhlIGZvbGxvd2luZyBjYXNlczo8L3A+XG5cdCAqXG5cdCAqIDx1bD5cblx0ICogICA8bGk+VGhlIGJpdG1hcCBpcyB0b28gbGFyZ2UuIEluIEFJUiAxLjUgYW5kIEZsYXNoIFBsYXllciAxMCwgdGhlIG1heGltdW1cblx0ICogc2l6ZSBmb3IgYSBiaXRtYXAgaW1hZ2UgaXMgOCwxOTEgcGl4ZWxzIGluIHdpZHRoIG9yIGhlaWdodCwgYW5kIHRoZSB0b3RhbFxuXHQgKiBudW1iZXIgb2YgcGl4ZWxzIGNhbm5vdCBleGNlZWQgMTYsNzc3LDIxNSBwaXhlbHMuKFNvLCBpZiBhIGJpdG1hcCBpbWFnZVxuXHQgKiBpcyA4LDE5MSBwaXhlbHMgd2lkZSwgaXQgY2FuIG9ubHkgYmUgMiwwNDggcGl4ZWxzIGhpZ2guKSBJbiBGbGFzaCBQbGF5ZXIgOVxuXHQgKiBhbmQgZWFybGllciwgdGhlIGxpbWl0YXRpb24gaXMgaXMgMjg4MCBwaXhlbHMgaW4gaGVpZ2h0IGFuZCAyLDg4MCBwaXhlbHNcblx0ICogaW4gd2lkdGguPC9saT5cblx0ICogICA8bGk+VGhlIGJpdG1hcCBmYWlscyB0byBhbGxvY2F0ZShvdXQgb2YgbWVtb3J5IGVycm9yKS4gPC9saT5cblx0ICogPC91bD5cblx0ICpcblx0ICogPHA+VGhlIDxjb2RlPmNhY2hlQXNCaXRtYXA8L2NvZGU+IHByb3BlcnR5IGlzIGJlc3QgdXNlZCB3aXRoIG1vdmllIGNsaXBzXG5cdCAqIHRoYXQgaGF2ZSBtb3N0bHkgc3RhdGljIGNvbnRlbnQgYW5kIHRoYXQgZG8gbm90IHNjYWxlIGFuZCByb3RhdGVcblx0ICogZnJlcXVlbnRseS4gV2l0aCBzdWNoIG1vdmllIGNsaXBzLCA8Y29kZT5jYWNoZUFzQml0bWFwPC9jb2RlPiBjYW4gbGVhZCB0b1xuXHQgKiBwZXJmb3JtYW5jZSBpbmNyZWFzZXMgd2hlbiB0aGUgbW92aWUgY2xpcCBpcyB0cmFuc2xhdGVkKHdoZW4gaXRzIDxpPng8L2k+XG5cdCAqIGFuZCA8aT55PC9pPiBwb3NpdGlvbiBpcyBjaGFuZ2VkKS48L3A+XG5cdCAqL1xuXHRwdWJsaWMgY2FjaGVBc0JpdG1hcDpib29sZWFuO1xuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGNhc3RzU2hhZG93czpib29sZWFuID0gdHJ1ZTtcblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHRoZSBkZXB0aCBvZiB0aGUgZGlzcGxheSBvYmplY3QsIGluIHBpeGVscy4gVGhlIGRlcHRoIGlzXG5cdCAqIGNhbGN1bGF0ZWQgYmFzZWQgb24gdGhlIGJvdW5kcyBvZiB0aGUgY29udGVudCBvZiB0aGUgZGlzcGxheSBvYmplY3QuIFdoZW5cblx0ICogeW91IHNldCB0aGUgPGNvZGU+ZGVwdGg8L2NvZGU+IHByb3BlcnR5LCB0aGUgPGNvZGU+c2NhbGVaPC9jb2RlPiBwcm9wZXJ0eVxuXHQgKiBpcyBhZGp1c3RlZCBhY2NvcmRpbmdseSwgYXMgc2hvd24gaW4gdGhlIGZvbGxvd2luZyBjb2RlOlxuXHQgKlxuXHQgKiA8cD5FeGNlcHQgZm9yIFRleHRGaWVsZCBhbmQgVmlkZW8gb2JqZWN0cywgYSBkaXNwbGF5IG9iamVjdCB3aXRoIG5vXG5cdCAqIGNvbnRlbnQgKHN1Y2ggYXMgYW4gZW1wdHkgc3ByaXRlKSBoYXMgYSBkZXB0aCBvZiAwLCBldmVuIGlmIHlvdSB0cnkgdG9cblx0ICogc2V0IDxjb2RlPmRlcHRoPC9jb2RlPiB0byBhIGRpZmZlcmVudCB2YWx1ZS48L3A+XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGRlcHRoKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5nZXRCb3goKS5kZXB0aCp0aGlzLl9wU2NhbGVaO1xuXHR9XG5cblx0cHVibGljIHNldCBkZXB0aCh2YWw6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2RlcHRoID09IHZhbClcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX2RlcHRoID0gdmFsO1xuXG5cdFx0dGhpcy5fcFNjYWxlWiA9IHZhbC90aGlzLmdldEJveCgpLmRlcHRoO1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlU2NhbGUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBEZWZpbmVzIHRoZSByb3RhdGlvbiBvZiB0aGUgM2Qgb2JqZWN0IGFzIGEgPGNvZGU+VmVjdG9yM0Q8L2NvZGU+IG9iamVjdCBjb250YWluaW5nIGV1bGVyIGFuZ2xlcyBmb3Igcm90YXRpb24gYXJvdW5kIHgsIHkgYW5kIHogYXhpcy5cblx0ICovXG5cdHB1YmxpYyBnZXQgZXVsZXJzKCk6VmVjdG9yM0Rcblx0e1xuXHRcdHRoaXMuX2V1bGVycy54ID0gdGhpcy5fcm90YXRpb25YKk1hdGhDb25zdHMuUkFESUFOU19UT19ERUdSRUVTO1xuXHRcdHRoaXMuX2V1bGVycy55ID0gdGhpcy5fcm90YXRpb25ZKk1hdGhDb25zdHMuUkFESUFOU19UT19ERUdSRUVTO1xuXHRcdHRoaXMuX2V1bGVycy56ID0gdGhpcy5fcm90YXRpb25aKk1hdGhDb25zdHMuUkFESUFOU19UT19ERUdSRUVTO1xuXG5cdFx0cmV0dXJuIHRoaXMuX2V1bGVycztcblx0fVxuXG5cdHB1YmxpYyBzZXQgZXVsZXJzKHZhbHVlOlZlY3RvcjNEKVxuXHR7XG5cdFx0dGhpcy5fcm90YXRpb25YID0gdmFsdWUueCpNYXRoQ29uc3RzLkRFR1JFRVNfVE9fUkFESUFOUztcblx0XHR0aGlzLl9yb3RhdGlvblkgPSB2YWx1ZS55Kk1hdGhDb25zdHMuREVHUkVFU19UT19SQURJQU5TO1xuXHRcdHRoaXMuX3JvdGF0aW9uWiA9IHZhbHVlLnoqTWF0aENvbnN0cy5ERUdSRUVTX1RPX1JBRElBTlM7XG5cblx0XHR0aGlzLmludmFsaWRhdGVSb3RhdGlvbigpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFuIG9iamVjdCB0aGF0IGNhbiBjb250YWluIGFueSBleHRyYSBkYXRhLlxuXHQgKi9cblx0cHVibGljIGV4dHJhOk9iamVjdDtcblxuXHQvKipcblx0ICogQW4gaW5kZXhlZCBhcnJheSB0aGF0IGNvbnRhaW5zIGVhY2ggZmlsdGVyIG9iamVjdCBjdXJyZW50bHkgYXNzb2NpYXRlZFxuXHQgKiB3aXRoIHRoZSBkaXNwbGF5IG9iamVjdC4gVGhlIGZsYXNoLmZpbHRlcnMgcGFja2FnZSBjb250YWlucyBzZXZlcmFsXG5cdCAqIGNsYXNzZXMgdGhhdCBkZWZpbmUgc3BlY2lmaWMgZmlsdGVycyB5b3UgY2FuIHVzZS5cblx0ICpcblx0ICogPHA+RmlsdGVycyBjYW4gYmUgYXBwbGllZCBpbiBGbGFzaCBQcm9mZXNzaW9uYWwgYXQgZGVzaWduIHRpbWUsIG9yIGF0IHJ1blxuXHQgKiB0aW1lIGJ5IHVzaW5nIEFjdGlvblNjcmlwdCBjb2RlLiBUbyBhcHBseSBhIGZpbHRlciBieSB1c2luZyBBY3Rpb25TY3JpcHQsXG5cdCAqIHlvdSBtdXN0IG1ha2UgYSB0ZW1wb3JhcnkgY29weSBvZiB0aGUgZW50aXJlIDxjb2RlPmZpbHRlcnM8L2NvZGU+IGFycmF5LFxuXHQgKiBtb2RpZnkgdGhlIHRlbXBvcmFyeSBhcnJheSwgdGhlbiBhc3NpZ24gdGhlIHZhbHVlIG9mIHRoZSB0ZW1wb3JhcnkgYXJyYXlcblx0ICogYmFjayB0byB0aGUgPGNvZGU+ZmlsdGVyczwvY29kZT4gYXJyYXkuIFlvdSBjYW5ub3QgZGlyZWN0bHkgYWRkIGEgbmV3XG5cdCAqIGZpbHRlciBvYmplY3QgdG8gdGhlIDxjb2RlPmZpbHRlcnM8L2NvZGU+IGFycmF5LjwvcD5cblx0ICpcblx0ICogPHA+VG8gYWRkIGEgZmlsdGVyIGJ5IHVzaW5nIEFjdGlvblNjcmlwdCwgcGVyZm9ybSB0aGUgZm9sbG93aW5nIHN0ZXBzXG5cdCAqIChhc3N1bWUgdGhhdCB0aGUgdGFyZ2V0IGRpc3BsYXkgb2JqZWN0IGlzIG5hbWVkXG5cdCAqIDxjb2RlPm15RGlzcGxheU9iamVjdDwvY29kZT4pOjwvcD5cblx0ICpcblx0ICogPG9sPlxuXHQgKiAgIDxsaT5DcmVhdGUgYSBuZXcgZmlsdGVyIG9iamVjdCBieSB1c2luZyB0aGUgY29uc3RydWN0b3IgbWV0aG9kIG9mIHlvdXJcblx0ICogY2hvc2VuIGZpbHRlciBjbGFzcy48L2xpPlxuXHQgKiAgIDxsaT5Bc3NpZ24gdGhlIHZhbHVlIG9mIHRoZSA8Y29kZT5teURpc3BsYXlPYmplY3QuZmlsdGVyczwvY29kZT4gYXJyYXlcblx0ICogdG8gYSB0ZW1wb3JhcnkgYXJyYXksIHN1Y2ggYXMgb25lIG5hbWVkIDxjb2RlPm15RmlsdGVyczwvY29kZT4uPC9saT5cblx0ICogICA8bGk+QWRkIHRoZSBuZXcgZmlsdGVyIG9iamVjdCB0byB0aGUgPGNvZGU+bXlGaWx0ZXJzPC9jb2RlPiB0ZW1wb3Jhcnlcblx0ICogYXJyYXkuPC9saT5cblx0ICogICA8bGk+QXNzaWduIHRoZSB2YWx1ZSBvZiB0aGUgdGVtcG9yYXJ5IGFycmF5IHRvIHRoZVxuXHQgKiA8Y29kZT5teURpc3BsYXlPYmplY3QuZmlsdGVyczwvY29kZT4gYXJyYXkuPC9saT5cblx0ICogPC9vbD5cblx0ICpcblx0ICogPHA+SWYgdGhlIDxjb2RlPmZpbHRlcnM8L2NvZGU+IGFycmF5IGlzIHVuZGVmaW5lZCwgeW91IGRvIG5vdCBuZWVkIHRvIHVzZVxuXHQgKiBhIHRlbXBvcmFyeSBhcnJheS4gSW5zdGVhZCwgeW91IGNhbiBkaXJlY3RseSBhc3NpZ24gYW4gYXJyYXkgbGl0ZXJhbCB0aGF0XG5cdCAqIGNvbnRhaW5zIG9uZSBvciBtb3JlIGZpbHRlciBvYmplY3RzIHRoYXQgeW91IGNyZWF0ZS4gVGhlIGZpcnN0IGV4YW1wbGUgaW5cblx0ICogdGhlIEV4YW1wbGVzIHNlY3Rpb24gYWRkcyBhIGRyb3Agc2hhZG93IGZpbHRlciBieSB1c2luZyBjb2RlIHRoYXQgaGFuZGxlc1xuXHQgKiBib3RoIGRlZmluZWQgYW5kIHVuZGVmaW5lZCA8Y29kZT5maWx0ZXJzPC9jb2RlPiBhcnJheXMuPC9wPlxuXHQgKlxuXHQgKiA8cD5UbyBtb2RpZnkgYW4gZXhpc3RpbmcgZmlsdGVyIG9iamVjdCwgeW91IG11c3QgdXNlIHRoZSB0ZWNobmlxdWUgb2Zcblx0ICogbW9kaWZ5aW5nIGEgY29weSBvZiB0aGUgPGNvZGU+ZmlsdGVyczwvY29kZT4gYXJyYXk6PC9wPlxuXHQgKlxuXHQgKiA8b2w+XG5cdCAqICAgPGxpPkFzc2lnbiB0aGUgdmFsdWUgb2YgdGhlIDxjb2RlPmZpbHRlcnM8L2NvZGU+IGFycmF5IHRvIGEgdGVtcG9yYXJ5XG5cdCAqIGFycmF5LCBzdWNoIGFzIG9uZSBuYW1lZCA8Y29kZT5teUZpbHRlcnM8L2NvZGU+LjwvbGk+XG5cdCAqICAgPGxpPk1vZGlmeSB0aGUgcHJvcGVydHkgYnkgdXNpbmcgdGhlIHRlbXBvcmFyeSBhcnJheSxcblx0ICogPGNvZGU+bXlGaWx0ZXJzPC9jb2RlPi4gRm9yIGV4YW1wbGUsIHRvIHNldCB0aGUgcXVhbGl0eSBwcm9wZXJ0eSBvZiB0aGVcblx0ICogZmlyc3QgZmlsdGVyIGluIHRoZSBhcnJheSwgeW91IGNvdWxkIHVzZSB0aGUgZm9sbG93aW5nIGNvZGU6XG5cdCAqIDxjb2RlPm15RmlsdGVyc1swXS5xdWFsaXR5ID0gMTs8L2NvZGU+PC9saT5cblx0ICogICA8bGk+QXNzaWduIHRoZSB2YWx1ZSBvZiB0aGUgdGVtcG9yYXJ5IGFycmF5IHRvIHRoZSA8Y29kZT5maWx0ZXJzPC9jb2RlPlxuXHQgKiBhcnJheS48L2xpPlxuXHQgKiA8L29sPlxuXHQgKlxuXHQgKiA8cD5BdCBsb2FkIHRpbWUsIGlmIGEgZGlzcGxheSBvYmplY3QgaGFzIGFuIGFzc29jaWF0ZWQgZmlsdGVyLCBpdCBpc1xuXHQgKiBtYXJrZWQgdG8gY2FjaGUgaXRzZWxmIGFzIGEgdHJhbnNwYXJlbnQgYml0bWFwLiBGcm9tIHRoaXMgcG9pbnQgZm9yd2FyZCxcblx0ICogYXMgbG9uZyBhcyB0aGUgZGlzcGxheSBvYmplY3QgaGFzIGEgdmFsaWQgZmlsdGVyIGxpc3QsIHRoZSBwbGF5ZXIgY2FjaGVzXG5cdCAqIHRoZSBkaXNwbGF5IG9iamVjdCBhcyBhIGJpdG1hcC4gVGhpcyBzb3VyY2UgYml0bWFwIGlzIHVzZWQgYXMgYSBzb3VyY2Vcblx0ICogaW1hZ2UgZm9yIHRoZSBmaWx0ZXIgZWZmZWN0cy4gRWFjaCBkaXNwbGF5IG9iamVjdCB1c3VhbGx5IGhhcyB0d28gYml0bWFwczpcblx0ICogb25lIHdpdGggdGhlIG9yaWdpbmFsIHVuZmlsdGVyZWQgc291cmNlIGRpc3BsYXkgb2JqZWN0IGFuZCBhbm90aGVyIGZvciB0aGVcblx0ICogZmluYWwgaW1hZ2UgYWZ0ZXIgZmlsdGVyaW5nLiBUaGUgZmluYWwgaW1hZ2UgaXMgdXNlZCB3aGVuIHJlbmRlcmluZy4gQXNcblx0ICogbG9uZyBhcyB0aGUgZGlzcGxheSBvYmplY3QgZG9lcyBub3QgY2hhbmdlLCB0aGUgZmluYWwgaW1hZ2UgZG9lcyBub3QgbmVlZFxuXHQgKiB1cGRhdGluZy48L3A+XG5cdCAqXG5cdCAqIDxwPlRoZSBmbGFzaC5maWx0ZXJzIHBhY2thZ2UgaW5jbHVkZXMgY2xhc3NlcyBmb3IgZmlsdGVycy4gRm9yIGV4YW1wbGUsIHRvXG5cdCAqIGNyZWF0ZSBhIERyb3BTaGFkb3cgZmlsdGVyLCB5b3Ugd291bGQgd3JpdGU6PC9wPlxuXHQgKlxuXHQgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgV2hlbiA8Y29kZT5maWx0ZXJzPC9jb2RlPiBpbmNsdWRlcyBhIFNoYWRlckZpbHRlclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgYW5kIHRoZSBzaGFkZXIgb3V0cHV0IHR5cGUgaXMgbm90IGNvbXBhdGlibGUgd2l0aFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgdGhpcyBvcGVyYXRpb24odGhlIHNoYWRlciBtdXN0IHNwZWNpZnkgYVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+cGl4ZWw0PC9jb2RlPiBvdXRwdXQpLlxuXHQgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgV2hlbiA8Y29kZT5maWx0ZXJzPC9jb2RlPiBpbmNsdWRlcyBhIFNoYWRlckZpbHRlclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgYW5kIHRoZSBzaGFkZXIgZG9lc24ndCBzcGVjaWZ5IGFueSBpbWFnZSBpbnB1dCBvclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgdGhlIGZpcnN0IGlucHV0IGlzIG5vdCBhbiA8Y29kZT5pbWFnZTQ8L2NvZGU+IGlucHV0LlxuXHQgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgV2hlbiA8Y29kZT5maWx0ZXJzPC9jb2RlPiBpbmNsdWRlcyBhIFNoYWRlckZpbHRlclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgYW5kIHRoZSBzaGFkZXIgc3BlY2lmaWVzIGFuIGltYWdlIGlucHV0IHRoYXQgaXNuJ3Rcblx0ICogICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVkLlxuXHQgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgV2hlbiA8Y29kZT5maWx0ZXJzPC9jb2RlPiBpbmNsdWRlcyBhIFNoYWRlckZpbHRlciwgYVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgQnl0ZUFycmF5IG9yIFZlY3Rvci48TnVtYmVyPiBpbnN0YW5jZSBhcyBhIHNoYWRlclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQsIGFuZCB0aGUgPGNvZGU+d2lkdGg8L2NvZGU+IGFuZFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+aGVpZ2h0PC9jb2RlPiBwcm9wZXJ0aWVzIGFyZW4ndCBzcGVjaWZpZWQgZm9yXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICB0aGUgU2hhZGVySW5wdXQgb2JqZWN0LCBvciB0aGUgc3BlY2lmaWVkIHZhbHVlc1xuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgZG9uJ3QgbWF0Y2ggdGhlIGFtb3VudCBvZiBkYXRhIGluIHRoZSBpbnB1dCBkYXRhLlxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgU2VlIHRoZSA8Y29kZT5TaGFkZXJJbnB1dC5pbnB1dDwvY29kZT4gcHJvcGVydHkgZm9yXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBtb3JlIGluZm9ybWF0aW9uLlxuXHQgKi9cbi8vXHRcdHB1YmxpYyBmaWx0ZXJzOkFycmF5PER5bmFtaWM+O1xuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgdGhlIGhlaWdodCBvZiB0aGUgZGlzcGxheSBvYmplY3QsIGluIHBpeGVscy4gVGhlIGhlaWdodCBpc1xuXHQgKiBjYWxjdWxhdGVkIGJhc2VkIG9uIHRoZSBib3VuZHMgb2YgdGhlIGNvbnRlbnQgb2YgdGhlIGRpc3BsYXkgb2JqZWN0LiBXaGVuXG5cdCAqIHlvdSBzZXQgdGhlIDxjb2RlPmhlaWdodDwvY29kZT4gcHJvcGVydHksIHRoZSA8Y29kZT5zY2FsZVk8L2NvZGU+IHByb3BlcnR5XG5cdCAqIGlzIGFkanVzdGVkIGFjY29yZGluZ2x5LCBhcyBzaG93biBpbiB0aGUgZm9sbG93aW5nIGNvZGU6XG5cdCAqXG5cdCAqIDxwPkV4Y2VwdCBmb3IgVGV4dEZpZWxkIGFuZCBWaWRlbyBvYmplY3RzLCBhIGRpc3BsYXkgb2JqZWN0IHdpdGggbm9cblx0ICogY29udGVudCAoc3VjaCBhcyBhbiBlbXB0eSBzcHJpdGUpIGhhcyBhIGhlaWdodCBvZiAwLCBldmVuIGlmIHlvdSB0cnkgdG9cblx0ICogc2V0IDxjb2RlPmhlaWdodDwvY29kZT4gdG8gYSBkaWZmZXJlbnQgdmFsdWUuPC9wPlxuXHQgKi9cblx0cHVibGljIGdldCBoZWlnaHQoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLmdldEJveCgpLmhlaWdodCp0aGlzLl9wU2NhbGVZO1xuXHR9XG5cblx0cHVibGljIHNldCBoZWlnaHQodmFsOm51bWJlcilcblx0e1xuXHRcdGlmICh0aGlzLl9oZWlnaHQgPT0gdmFsKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5faGVpZ2h0ID0gdmFsO1xuXG5cdFx0dGhpcy5fcFNjYWxlWSA9IHZhbC90aGlzLmdldEJveCgpLmhlaWdodDtcblxuXHRcdHRoaXMuaW52YWxpZGF0ZVNjYWxlKCk7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHRoZSBpbnN0YW5jZSBjb250YWluZXIgaW5kZXggb2YgdGhlIERpc3BsYXlPYmplY3QuIFRoZSBvYmplY3QgY2FuIGJlXG5cdCAqIGlkZW50aWZpZWQgaW4gdGhlIGNoaWxkIGxpc3Qgb2YgaXRzIHBhcmVudCBkaXNwbGF5IG9iamVjdCBjb250YWluZXIgYnlcblx0ICogY2FsbGluZyB0aGUgPGNvZGU+Z2V0Q2hpbGRCeUluZGV4KCk8L2NvZGU+IG1ldGhvZCBvZiB0aGUgZGlzcGxheSBvYmplY3Rcblx0ICogY29udGFpbmVyLlxuXHQgKlxuXHQgKiA8cD5JZiB0aGUgRGlzcGxheU9iamVjdCBoYXMgbm8gcGFyZW50IGNvbnRhaW5lciwgaW5kZXggZGVmYXVsdHMgdG8gMC48L3A+XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGluZGV4KCk6bnVtYmVyXG5cdHtcblx0XHRpZiAodGhpcy5fcFBhcmVudClcblx0XHRcdHJldHVybiB0aGlzLl9wUGFyZW50LmdldENoaWxkSW5kZXgodGhpcyk7XG5cblx0XHRyZXR1cm4gMDtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBpbnZlcnNlU2NlbmVUcmFuc2Zvcm0oKTpNYXRyaXgzRFxuXHR7XG5cdFx0aWYgKHRoaXMuX2ludmVyc2VTY2VuZVRyYW5zZm9ybURpcnR5KSB7XG5cdFx0XHR0aGlzLl9pbnZlcnNlU2NlbmVUcmFuc2Zvcm0uY29weUZyb20odGhpcy5zY2VuZVRyYW5zZm9ybSk7XG5cdFx0XHR0aGlzLl9pbnZlcnNlU2NlbmVUcmFuc2Zvcm0uaW52ZXJ0KCk7XG5cdFx0XHR0aGlzLl9pbnZlcnNlU2NlbmVUcmFuc2Zvcm1EaXJ0eSA9IGZhbHNlO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5faW52ZXJzZVNjZW5lVHJhbnNmb3JtO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGlnbm9yZVRyYW5zZm9ybSgpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9wSWdub3JlVHJhbnNmb3JtO1xuXHR9XG5cblx0cHVibGljIHNldCBpZ25vcmVUcmFuc2Zvcm0odmFsdWU6Ym9vbGVhbilcblx0e1xuXHRcdGlmICh0aGlzLl9wSWdub3JlVHJhbnNmb3JtID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fcElnbm9yZVRyYW5zZm9ybSA9IHZhbHVlO1xuXG5cdFx0aWYgKHZhbHVlKSB7XG5cdFx0XHR0aGlzLl9wU2NlbmVUcmFuc2Zvcm0uaWRlbnRpdHkoKTtcblx0XHRcdHRoaXMuX3NjZW5lUG9zaXRpb24uc2V0VG8oMCwgMCwgMCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5wSW52YWxpZGF0ZVNjZW5lVHJhbnNmb3JtKCk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgaXNFbnRpdHkoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BJc0VudGl0eTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGEgTG9hZGVySW5mbyBvYmplY3QgY29udGFpbmluZyBpbmZvcm1hdGlvbiBhYm91dCBsb2FkaW5nIHRoZSBmaWxlXG5cdCAqIHRvIHdoaWNoIHRoaXMgZGlzcGxheSBvYmplY3QgYmVsb25ncy4gVGhlIDxjb2RlPmxvYWRlckluZm88L2NvZGU+IHByb3BlcnR5XG5cdCAqIGlzIGRlZmluZWQgb25seSBmb3IgdGhlIHJvb3QgZGlzcGxheSBvYmplY3Qgb2YgYSBTV0YgZmlsZSBvciBmb3IgYSBsb2FkZWRcblx0ICogQml0bWFwKG5vdCBmb3IgYSBCaXRtYXAgdGhhdCBpcyBkcmF3biB3aXRoIEFjdGlvblNjcmlwdCkuIFRvIGZpbmQgdGhlXG5cdCAqIDxjb2RlPmxvYWRlckluZm88L2NvZGU+IG9iamVjdCBhc3NvY2lhdGVkIHdpdGggdGhlIFNXRiBmaWxlIHRoYXQgY29udGFpbnNcblx0ICogYSBkaXNwbGF5IG9iamVjdCBuYW1lZCA8Y29kZT5teURpc3BsYXlPYmplY3Q8L2NvZGU+LCB1c2Vcblx0ICogPGNvZGU+bXlEaXNwbGF5T2JqZWN0LnJvb3QubG9hZGVySW5mbzwvY29kZT4uXG5cdCAqXG5cdCAqIDxwPkEgbGFyZ2UgU1dGIGZpbGUgY2FuIG1vbml0b3IgaXRzIGRvd25sb2FkIGJ5IGNhbGxpbmdcblx0ICogPGNvZGU+dGhpcy5yb290LmxvYWRlckluZm8uYWRkRXZlbnRMaXN0ZW5lcihFdmVudC5DT01QTEVURSxcblx0ICogZnVuYyk8L2NvZGU+LjwvcD5cblx0ICovXG5cdHB1YmxpYyBnZXQgbG9hZGVySW5mbygpOkxvYWRlckluZm9cblx0e1xuXHRcdHJldHVybiB0aGlzLl9sb2FkZXJJbmZvO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBjYWxsaW5nIGRpc3BsYXkgb2JqZWN0IGlzIG1hc2tlZCBieSB0aGUgc3BlY2lmaWVkIDxjb2RlPm1hc2s8L2NvZGU+XG5cdCAqIG9iamVjdC4gVG8gZW5zdXJlIHRoYXQgbWFza2luZyB3b3JrcyB3aGVuIHRoZSBTdGFnZSBpcyBzY2FsZWQsIHRoZVxuXHQgKiA8Y29kZT5tYXNrPC9jb2RlPiBkaXNwbGF5IG9iamVjdCBtdXN0IGJlIGluIGFuIGFjdGl2ZSBwYXJ0IG9mIHRoZSBkaXNwbGF5XG5cdCAqIGxpc3QuIFRoZSA8Y29kZT5tYXNrPC9jb2RlPiBvYmplY3QgaXRzZWxmIGlzIG5vdCBkcmF3bi4gU2V0XG5cdCAqIDxjb2RlPm1hc2s8L2NvZGU+IHRvIDxjb2RlPm51bGw8L2NvZGU+IHRvIHJlbW92ZSB0aGUgbWFzay5cblx0ICpcblx0ICogPHA+VG8gYmUgYWJsZSB0byBzY2FsZSBhIG1hc2sgb2JqZWN0LCBpdCBtdXN0IGJlIG9uIHRoZSBkaXNwbGF5IGxpc3QuIFRvXG5cdCAqIGJlIGFibGUgdG8gZHJhZyBhIG1hc2sgU3ByaXRlIG9iamVjdChieSBjYWxsaW5nIGl0c1xuXHQgKiA8Y29kZT5zdGFydERyYWcoKTwvY29kZT4gbWV0aG9kKSwgaXQgbXVzdCBiZSBvbiB0aGUgZGlzcGxheSBsaXN0LiBUbyBjYWxsXG5cdCAqIHRoZSA8Y29kZT5zdGFydERyYWcoKTwvY29kZT4gbWV0aG9kIGZvciBhIG1hc2sgc3ByaXRlIGJhc2VkIG9uIGFcblx0ICogPGNvZGU+bW91c2VEb3duPC9jb2RlPiBldmVudCBiZWluZyBkaXNwYXRjaGVkIGJ5IHRoZSBzcHJpdGUsIHNldCB0aGVcblx0ICogc3ByaXRlJ3MgPGNvZGU+YnV0dG9uTW9kZTwvY29kZT4gcHJvcGVydHkgdG8gPGNvZGU+dHJ1ZTwvY29kZT4uPC9wPlxuXHQgKlxuXHQgKiA8cD5XaGVuIGRpc3BsYXkgb2JqZWN0cyBhcmUgY2FjaGVkIGJ5IHNldHRpbmcgdGhlXG5cdCAqIDxjb2RlPmNhY2hlQXNCaXRtYXA8L2NvZGU+IHByb3BlcnR5IHRvIDxjb2RlPnRydWU8L2NvZGU+IGFuIHRoZVxuXHQgKiA8Y29kZT5jYWNoZUFzQml0bWFwTWF0cml4PC9jb2RlPiBwcm9wZXJ0eSB0byBhIE1hdHJpeCBvYmplY3QsIGJvdGggdGhlXG5cdCAqIG1hc2sgYW5kIHRoZSBkaXNwbGF5IG9iamVjdCBiZWluZyBtYXNrZWQgbXVzdCBiZSBwYXJ0IG9mIHRoZSBzYW1lIGNhY2hlZFxuXHQgKiBiaXRtYXAuIFRodXMsIGlmIHRoZSBkaXNwbGF5IG9iamVjdCBpcyBjYWNoZWQsIHRoZW4gdGhlIG1hc2sgbXVzdCBiZSBhXG5cdCAqIGNoaWxkIG9mIHRoZSBkaXNwbGF5IG9iamVjdC4gSWYgYW4gYW5jZXN0b3Igb2YgdGhlIGRpc3BsYXkgb2JqZWN0IG9uIHRoZVxuXHQgKiBkaXNwbGF5IGxpc3QgaXMgY2FjaGVkLCB0aGVuIHRoZSBtYXNrIG11c3QgYmUgYSBjaGlsZCBvZiB0aGF0IGFuY2VzdG9yIG9yXG5cdCAqIG9uZSBvZiBpdHMgZGVzY2VuZGVudHMuIElmIG1vcmUgdGhhbiBvbmUgYW5jZXN0b3Igb2YgdGhlIG1hc2tlZCBvYmplY3QgaXNcblx0ICogY2FjaGVkLCB0aGVuIHRoZSBtYXNrIG11c3QgYmUgYSBkZXNjZW5kZW50IG9mIHRoZSBjYWNoZWQgY29udGFpbmVyIGNsb3Nlc3Rcblx0ICogdG8gdGhlIG1hc2tlZCBvYmplY3QgaW4gdGhlIGRpc3BsYXkgbGlzdC48L3A+XG5cdCAqXG5cdCAqIDxwPjxiPk5vdGU6PC9iPiBBIHNpbmdsZSA8Y29kZT5tYXNrPC9jb2RlPiBvYmplY3QgY2Fubm90IGJlIHVzZWQgdG8gbWFza1xuXHQgKiBtb3JlIHRoYW4gb25lIGNhbGxpbmcgZGlzcGxheSBvYmplY3QuIFdoZW4gdGhlIDxjb2RlPm1hc2s8L2NvZGU+IGlzXG5cdCAqIGFzc2lnbmVkIHRvIGEgc2Vjb25kIGRpc3BsYXkgb2JqZWN0LCBpdCBpcyByZW1vdmVkIGFzIHRoZSBtYXNrIG9mIHRoZVxuXHQgKiBmaXJzdCBvYmplY3QsIGFuZCB0aGF0IG9iamVjdCdzIDxjb2RlPm1hc2s8L2NvZGU+IHByb3BlcnR5IGJlY29tZXNcblx0ICogPGNvZGU+bnVsbDwvY29kZT4uPC9wPlxuXHQgKi9cblx0cHVibGljIG1hc2s6RGlzcGxheU9iamVjdDtcblxuXHQvKipcblx0ICogU3BlY2lmaWVzIHdoZXRoZXIgdGhpcyBvYmplY3QgcmVjZWl2ZXMgbW91c2UsIG9yIG90aGVyIHVzZXIgaW5wdXQsXG5cdCAqIG1lc3NhZ2VzLiBUaGUgZGVmYXVsdCB2YWx1ZSBpcyA8Y29kZT50cnVlPC9jb2RlPiwgd2hpY2ggbWVhbnMgdGhhdCBieVxuXHQgKiBkZWZhdWx0IGFueSBJbnRlcmFjdGl2ZU9iamVjdCBpbnN0YW5jZSB0aGF0IGlzIG9uIHRoZSBkaXNwbGF5IGxpc3Rcblx0ICogcmVjZWl2ZXMgbW91c2UgZXZlbnRzIG9yIG90aGVyIHVzZXIgaW5wdXQgZXZlbnRzLiBJZlxuXHQgKiA8Y29kZT5tb3VzZUVuYWJsZWQ8L2NvZGU+IGlzIHNldCB0byA8Y29kZT5mYWxzZTwvY29kZT4sIHRoZSBpbnN0YW5jZSBkb2VzXG5cdCAqIG5vdCByZWNlaXZlIGFueSBtb3VzZSBldmVudHMob3Igb3RoZXIgdXNlciBpbnB1dCBldmVudHMgbGlrZSBrZXlib2FyZFxuXHQgKiBldmVudHMpLiBBbnkgY2hpbGRyZW4gb2YgdGhpcyBpbnN0YW5jZSBvbiB0aGUgZGlzcGxheSBsaXN0IGFyZSBub3Rcblx0ICogYWZmZWN0ZWQuIFRvIGNoYW5nZSB0aGUgPGNvZGU+bW91c2VFbmFibGVkPC9jb2RlPiBiZWhhdmlvciBmb3IgYWxsXG5cdCAqIGNoaWxkcmVuIG9mIGFuIG9iamVjdCBvbiB0aGUgZGlzcGxheSBsaXN0LCB1c2Vcblx0ICogPGNvZGU+Zmxhc2guZGlzcGxheS5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLm1vdXNlQ2hpbGRyZW48L2NvZGU+LlxuXHQgKlxuXHQgKiA8cD4gTm8gZXZlbnQgaXMgZGlzcGF0Y2hlZCBieSBzZXR0aW5nIHRoaXMgcHJvcGVydHkuIFlvdSBtdXN0IHVzZSB0aGVcblx0ICogPGNvZGU+YWRkRXZlbnRMaXN0ZW5lcigpPC9jb2RlPiBtZXRob2QgdG8gY3JlYXRlIGludGVyYWN0aXZlXG5cdCAqIGZ1bmN0aW9uYWxpdHkuPC9wPlxuXHQgKi9cblx0cHVibGljIGdldCBtb3VzZUVuYWJsZWQoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fZXhwbGljaXRNb3VzZUVuYWJsZWQ7XG5cdH1cblxuXHRwdWJsaWMgc2V0IG1vdXNlRW5hYmxlZCh2YWx1ZTpib29sZWFuKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2V4cGxpY2l0TW91c2VFbmFibGVkID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fZXhwbGljaXRNb3VzZUVuYWJsZWQgPSB2YWx1ZTtcblxuXHRcdHRoaXMuX3BVcGRhdGVJbXBsaWNpdE1vdXNlRW5hYmxlZCh0aGlzLl9wUGFyZW50PyB0aGlzLl9wUGFyZW50Lm1vdXNlQ2hpbGRyZW4gOiB0cnVlKTtcblx0fVxuXG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB0aGUgeCBjb29yZGluYXRlIG9mIHRoZSBtb3VzZSBvciB1c2VyIGlucHV0IGRldmljZSBwb3NpdGlvbiwgaW5cblx0ICogcGl4ZWxzLlxuXHQgKlxuXHQgKiA8cD48Yj5Ob3RlPC9iPjogRm9yIGEgRGlzcGxheU9iamVjdCB0aGF0IGhhcyBiZWVuIHJvdGF0ZWQsIHRoZSByZXR1cm5lZCB4XG5cdCAqIGNvb3JkaW5hdGUgd2lsbCByZWZsZWN0IHRoZSBub24tcm90YXRlZCBvYmplY3QuPC9wPlxuXHQgKi9cblx0cHVibGljIGdldCBtb3VzZVgoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9tb3VzZVg7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHRoZSB5IGNvb3JkaW5hdGUgb2YgdGhlIG1vdXNlIG9yIHVzZXIgaW5wdXQgZGV2aWNlIHBvc2l0aW9uLCBpblxuXHQgKiBwaXhlbHMuXG5cdCAqXG5cdCAqIDxwPjxiPk5vdGU8L2I+OiBGb3IgYSBEaXNwbGF5T2JqZWN0IHRoYXQgaGFzIGJlZW4gcm90YXRlZCwgdGhlIHJldHVybmVkIHlcblx0ICogY29vcmRpbmF0ZSB3aWxsIHJlZmxlY3QgdGhlIG5vbi1yb3RhdGVkIG9iamVjdC48L3A+XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IG1vdXNlWSgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX21vdXNlWTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgdGhlIGluc3RhbmNlIG5hbWUgb2YgdGhlIERpc3BsYXlPYmplY3QuIFRoZSBvYmplY3QgY2FuIGJlXG5cdCAqIGlkZW50aWZpZWQgaW4gdGhlIGNoaWxkIGxpc3Qgb2YgaXRzIHBhcmVudCBkaXNwbGF5IG9iamVjdCBjb250YWluZXIgYnlcblx0ICogY2FsbGluZyB0aGUgPGNvZGU+Z2V0Q2hpbGRCeU5hbWUoKTwvY29kZT4gbWV0aG9kIG9mIHRoZSBkaXNwbGF5IG9iamVjdFxuXHQgKiBjb250YWluZXIuXG5cdCAqXG5cdCAqIEB0aHJvd3MgSWxsZWdhbE9wZXJhdGlvbkVycm9yIElmIHlvdSBhcmUgYXR0ZW1wdGluZyB0byBzZXQgdGhpcyBwcm9wZXJ0eVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbiBhbiBvYmplY3QgdGhhdCB3YXMgcGxhY2VkIG9uIHRoZSB0aW1lbGluZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbiB0aGUgRmxhc2ggYXV0aG9yaW5nIHRvb2wuXG5cdCAqL1xuXHRwdWJsaWMgbmFtZTpzdHJpbmc7XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgb3JpZW50YXRpb25Nb2RlOnN0cmluZyA9IE9yaWVudGF0aW9uTW9kZS5ERUZBVUxUO1xuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgdGhlIERpc3BsYXlPYmplY3RDb250YWluZXIgb2JqZWN0IHRoYXQgY29udGFpbnMgdGhpcyBkaXNwbGF5XG5cdCAqIG9iamVjdC4gVXNlIHRoZSA8Y29kZT5wYXJlbnQ8L2NvZGU+IHByb3BlcnR5IHRvIHNwZWNpZnkgYSByZWxhdGl2ZSBwYXRoIHRvXG5cdCAqIGRpc3BsYXkgb2JqZWN0cyB0aGF0IGFyZSBhYm92ZSB0aGUgY3VycmVudCBkaXNwbGF5IG9iamVjdCBpbiB0aGUgZGlzcGxheVxuXHQgKiBsaXN0IGhpZXJhcmNoeS5cblx0ICpcblx0ICogPHA+WW91IGNhbiB1c2UgPGNvZGU+cGFyZW50PC9jb2RlPiB0byBtb3ZlIHVwIG11bHRpcGxlIGxldmVscyBpbiB0aGVcblx0ICogZGlzcGxheSBsaXN0IGFzIGluIHRoZSBmb2xsb3dpbmc6PC9wPlxuXHQgKlxuXHQgKiBAdGhyb3dzIFNlY3VyaXR5RXJyb3IgVGhlIHBhcmVudCBkaXNwbGF5IG9iamVjdCBiZWxvbmdzIHRvIGEgc2VjdXJpdHlcblx0ICogICAgICAgICAgICAgICAgICAgICAgIHNhbmRib3ggdG8gd2hpY2ggeW91IGRvIG5vdCBoYXZlIGFjY2Vzcy4gWW91IGNhblxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgYXZvaWQgdGhpcyBzaXR1YXRpb24gYnkgaGF2aW5nIHRoZSBwYXJlbnQgbW92aWUgY2FsbFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgdGhlIDxjb2RlPlNlY3VyaXR5LmFsbG93RG9tYWluKCk8L2NvZGU+IG1ldGhvZC5cblx0ICovXG5cdHB1YmxpYyBnZXQgcGFyZW50KCk6RGlzcGxheU9iamVjdENvbnRhaW5lclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BQYXJlbnQ7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgcGFydGl0aW9uKCk6UGFydGl0aW9uXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fZXhwbGljaXRQYXJ0aXRpb247XG5cdH1cblxuXHRwdWJsaWMgc2V0IHBhcnRpdGlvbih2YWx1ZTpQYXJ0aXRpb24pXG5cdHtcblx0XHRpZiAodGhpcy5fZXhwbGljaXRQYXJ0aXRpb24gPT0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9leHBsaWNpdFBhcnRpdGlvbiA9IHZhbHVlO1xuXG5cdFx0dGhpcy5fcFVwZGF0ZUltcGxpY2l0UGFydGl0aW9uKHRoaXMuX3BQYXJlbnQ/IHRoaXMuX3BQYXJlbnQuX2lBc3NpZ25lZFBhcnRpdGlvbiA6IG51bGwsIHRoaXMuX3BTY2VuZSk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgcGlja2luZ0NvbGxpZGVyKCk6SVBpY2tpbmdDb2xsaWRlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BQaWNraW5nQ29sbGlkZXI7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHBpY2tpbmdDb2xsaWRlcih2YWx1ZTpJUGlja2luZ0NvbGxpZGVyKVxuXHR7XG5cdFx0dGhpcy5fcFBpY2tpbmdDb2xsaWRlciA9IHZhbHVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIERlZmluZXMgdGhlIGxvY2FsIHBvaW50IGFyb3VuZCB3aGljaCB0aGUgb2JqZWN0IHJvdGF0ZXMuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHBpdm90KCk6VmVjdG9yM0Rcblx0e1xuXHRcdHJldHVybiB0aGlzLl9waXZvdDtcblx0fVxuXG5cblx0cHVibGljIHNldCBwaXZvdChwaXZvdDpWZWN0b3IzRClcblx0e1xuXHRcdHRoaXMuX3Bpdm90ID0gcGl2b3QuY2xvbmUoKTtcblxuXHRcdHRoaXMuaW52YWxpZGF0ZVBpdm90KCk7XG5cdH1cblxuXHQvKipcblx0ICogRm9yIGEgZGlzcGxheSBvYmplY3QgaW4gYSBsb2FkZWQgU1dGIGZpbGUsIHRoZSA8Y29kZT5yb290PC9jb2RlPiBwcm9wZXJ0eVxuXHQgKiBpcyB0aGUgdG9wLW1vc3QgZGlzcGxheSBvYmplY3QgaW4gdGhlIHBvcnRpb24gb2YgdGhlIGRpc3BsYXkgbGlzdCdzIHRyZWVcblx0ICogc3RydWN0dXJlIHJlcHJlc2VudGVkIGJ5IHRoYXQgU1dGIGZpbGUuIEZvciBhIEJpdG1hcCBvYmplY3QgcmVwcmVzZW50aW5nIGFcblx0ICogbG9hZGVkIGltYWdlIGZpbGUsIHRoZSA8Y29kZT5yb290PC9jb2RlPiBwcm9wZXJ0eSBpcyB0aGUgQml0bWFwIG9iamVjdFxuXHQgKiBpdHNlbGYuIEZvciB0aGUgaW5zdGFuY2Ugb2YgdGhlIG1haW4gY2xhc3Mgb2YgdGhlIGZpcnN0IFNXRiBmaWxlIGxvYWRlZCxcblx0ICogdGhlIDxjb2RlPnJvb3Q8L2NvZGU+IHByb3BlcnR5IGlzIHRoZSBkaXNwbGF5IG9iamVjdCBpdHNlbGYuIFRoZVxuXHQgKiA8Y29kZT5yb290PC9jb2RlPiBwcm9wZXJ0eSBvZiB0aGUgU2NlbmUgb2JqZWN0IGlzIHRoZSBTY2VuZSBvYmplY3QgaXRzZWxmLlxuXHQgKiBUaGUgPGNvZGU+cm9vdDwvY29kZT4gcHJvcGVydHkgaXMgc2V0IHRvIDxjb2RlPm51bGw8L2NvZGU+IGZvciBhbnkgZGlzcGxheVxuXHQgKiBvYmplY3QgdGhhdCBoYXMgbm90IGJlZW4gYWRkZWQgdG8gdGhlIGRpc3BsYXkgbGlzdCwgdW5sZXNzIGl0IGhhcyBiZWVuXG5cdCAqIGFkZGVkIHRvIGEgZGlzcGxheSBvYmplY3QgY29udGFpbmVyIHRoYXQgaXMgb2ZmIHRoZSBkaXNwbGF5IGxpc3QgYnV0IHRoYXRcblx0ICogaXMgYSBjaGlsZCBvZiB0aGUgdG9wLW1vc3QgZGlzcGxheSBvYmplY3QgaW4gYSBsb2FkZWQgU1dGIGZpbGUuXG5cdCAqXG5cdCAqIDxwPkZvciBleGFtcGxlLCBpZiB5b3UgY3JlYXRlIGEgbmV3IFNwcml0ZSBvYmplY3QgYnkgY2FsbGluZyB0aGVcblx0ICogPGNvZGU+U3ByaXRlKCk8L2NvZGU+IGNvbnN0cnVjdG9yIG1ldGhvZCwgaXRzIDxjb2RlPnJvb3Q8L2NvZGU+IHByb3BlcnR5XG5cdCAqIGlzIDxjb2RlPm51bGw8L2NvZGU+IHVudGlsIHlvdSBhZGQgaXQgdG8gdGhlIGRpc3BsYXkgbGlzdChvciB0byBhIGRpc3BsYXlcblx0ICogb2JqZWN0IGNvbnRhaW5lciB0aGF0IGlzIG9mZiB0aGUgZGlzcGxheSBsaXN0IGJ1dCB0aGF0IGlzIGEgY2hpbGQgb2YgdGhlXG5cdCAqIHRvcC1tb3N0IGRpc3BsYXkgb2JqZWN0IGluIGEgU1dGIGZpbGUpLjwvcD5cblx0ICpcblx0ICogPHA+Rm9yIGEgbG9hZGVkIFNXRiBmaWxlLCBldmVuIHRob3VnaCB0aGUgTG9hZGVyIG9iamVjdCB1c2VkIHRvIGxvYWQgdGhlXG5cdCAqIGZpbGUgbWF5IG5vdCBiZSBvbiB0aGUgZGlzcGxheSBsaXN0LCB0aGUgdG9wLW1vc3QgZGlzcGxheSBvYmplY3QgaW4gdGhlXG5cdCAqIFNXRiBmaWxlIGhhcyBpdHMgPGNvZGU+cm9vdDwvY29kZT4gcHJvcGVydHkgc2V0IHRvIGl0c2VsZi4gVGhlIExvYWRlclxuXHQgKiBvYmplY3QgZG9lcyBub3QgaGF2ZSBpdHMgPGNvZGU+cm9vdDwvY29kZT4gcHJvcGVydHkgc2V0IHVudGlsIGl0IGlzIGFkZGVkXG5cdCAqIGFzIGEgY2hpbGQgb2YgYSBkaXNwbGF5IG9iamVjdCBmb3Igd2hpY2ggdGhlIDxjb2RlPnJvb3Q8L2NvZGU+IHByb3BlcnR5IGlzXG5cdCAqIHNldC48L3A+XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHJvb3QoKTpEaXNwbGF5T2JqZWN0Q29udGFpbmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcm9vdDtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgdGhlIHJvdGF0aW9uIG9mIHRoZSBEaXNwbGF5T2JqZWN0IGluc3RhbmNlLCBpbiBkZWdyZWVzLCBmcm9tIGl0c1xuXHQgKiBvcmlnaW5hbCBvcmllbnRhdGlvbi4gVmFsdWVzIGZyb20gMCB0byAxODAgcmVwcmVzZW50IGNsb2Nrd2lzZSByb3RhdGlvbjtcblx0ICogdmFsdWVzIGZyb20gMCB0byAtMTgwIHJlcHJlc2VudCBjb3VudGVyY2xvY2t3aXNlIHJvdGF0aW9uLiBWYWx1ZXMgb3V0c2lkZVxuXHQgKiB0aGlzIHJhbmdlIGFyZSBhZGRlZCB0byBvciBzdWJ0cmFjdGVkIGZyb20gMzYwIHRvIG9idGFpbiBhIHZhbHVlIHdpdGhpblxuXHQgKiB0aGUgcmFuZ2UuIEZvciBleGFtcGxlLCB0aGUgc3RhdGVtZW50IDxjb2RlPm15X3ZpZGVvLnJvdGF0aW9uID0gNDUwPC9jb2RlPlxuXHQgKiBpcyB0aGUgc2FtZSBhcyA8Y29kZT4gbXlfdmlkZW8ucm90YXRpb24gPSA5MDwvY29kZT4uXG5cdCAqL1xuXHRwdWJsaWMgcm90YXRpb246bnVtYmVyOyAvL1RPRE9cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHRoZSB4LWF4aXMgcm90YXRpb24gb2YgdGhlIERpc3BsYXlPYmplY3QgaW5zdGFuY2UsIGluIGRlZ3JlZXMsXG5cdCAqIGZyb20gaXRzIG9yaWdpbmFsIG9yaWVudGF0aW9uIHJlbGF0aXZlIHRvIHRoZSAzRCBwYXJlbnQgY29udGFpbmVyLiBWYWx1ZXNcblx0ICogZnJvbSAwIHRvIDE4MCByZXByZXNlbnQgY2xvY2t3aXNlIHJvdGF0aW9uOyB2YWx1ZXMgZnJvbSAwIHRvIC0xODBcblx0ICogcmVwcmVzZW50IGNvdW50ZXJjbG9ja3dpc2Ugcm90YXRpb24uIFZhbHVlcyBvdXRzaWRlIHRoaXMgcmFuZ2UgYXJlIGFkZGVkXG5cdCAqIHRvIG9yIHN1YnRyYWN0ZWQgZnJvbSAzNjAgdG8gb2J0YWluIGEgdmFsdWUgd2l0aGluIHRoZSByYW5nZS5cblx0ICovXG5cdHB1YmxpYyBnZXQgcm90YXRpb25YKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcm90YXRpb25YKk1hdGhDb25zdHMuUkFESUFOU19UT19ERUdSRUVTO1xuXHR9XG5cblx0cHVibGljIHNldCByb3RhdGlvblgodmFsOm51bWJlcilcblx0e1xuXHRcdGlmICh0aGlzLnJvdGF0aW9uWCA9PSB2YWwpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9yb3RhdGlvblggPSB2YWwqTWF0aENvbnN0cy5ERUdSRUVTX1RPX1JBRElBTlM7XG5cblx0XHR0aGlzLmludmFsaWRhdGVSb3RhdGlvbigpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB0aGUgeS1heGlzIHJvdGF0aW9uIG9mIHRoZSBEaXNwbGF5T2JqZWN0IGluc3RhbmNlLCBpbiBkZWdyZWVzLFxuXHQgKiBmcm9tIGl0cyBvcmlnaW5hbCBvcmllbnRhdGlvbiByZWxhdGl2ZSB0byB0aGUgM0QgcGFyZW50IGNvbnRhaW5lci4gVmFsdWVzXG5cdCAqIGZyb20gMCB0byAxODAgcmVwcmVzZW50IGNsb2Nrd2lzZSByb3RhdGlvbjsgdmFsdWVzIGZyb20gMCB0byAtMTgwXG5cdCAqIHJlcHJlc2VudCBjb3VudGVyY2xvY2t3aXNlIHJvdGF0aW9uLiBWYWx1ZXMgb3V0c2lkZSB0aGlzIHJhbmdlIGFyZSBhZGRlZFxuXHQgKiB0byBvciBzdWJ0cmFjdGVkIGZyb20gMzYwIHRvIG9idGFpbiBhIHZhbHVlIHdpdGhpbiB0aGUgcmFuZ2UuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHJvdGF0aW9uWSgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3JvdGF0aW9uWSpNYXRoQ29uc3RzLlJBRElBTlNfVE9fREVHUkVFUztcblx0fVxuXG5cdHB1YmxpYyBzZXQgcm90YXRpb25ZKHZhbDpudW1iZXIpXG5cdHtcblx0XHRpZiAodGhpcy5yb3RhdGlvblkgPT0gdmFsKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fcm90YXRpb25ZID0gdmFsKk1hdGhDb25zdHMuREVHUkVFU19UT19SQURJQU5TO1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlUm90YXRpb24oKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgdGhlIHotYXhpcyByb3RhdGlvbiBvZiB0aGUgRGlzcGxheU9iamVjdCBpbnN0YW5jZSwgaW4gZGVncmVlcyxcblx0ICogZnJvbSBpdHMgb3JpZ2luYWwgb3JpZW50YXRpb24gcmVsYXRpdmUgdG8gdGhlIDNEIHBhcmVudCBjb250YWluZXIuIFZhbHVlc1xuXHQgKiBmcm9tIDAgdG8gMTgwIHJlcHJlc2VudCBjbG9ja3dpc2Ugcm90YXRpb247IHZhbHVlcyBmcm9tIDAgdG8gLTE4MFxuXHQgKiByZXByZXNlbnQgY291bnRlcmNsb2Nrd2lzZSByb3RhdGlvbi4gVmFsdWVzIG91dHNpZGUgdGhpcyByYW5nZSBhcmUgYWRkZWRcblx0ICogdG8gb3Igc3VidHJhY3RlZCBmcm9tIDM2MCB0byBvYnRhaW4gYSB2YWx1ZSB3aXRoaW4gdGhlIHJhbmdlLlxuXHQgKi9cblx0cHVibGljIGdldCByb3RhdGlvblooKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9yb3RhdGlvbloqTWF0aENvbnN0cy5SQURJQU5TX1RPX0RFR1JFRVM7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHJvdGF0aW9uWih2YWw6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHRoaXMucm90YXRpb25aID09IHZhbClcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3JvdGF0aW9uWiA9IHZhbCpNYXRoQ29uc3RzLkRFR1JFRVNfVE9fUkFESUFOUztcblxuXHRcdHRoaXMuaW52YWxpZGF0ZVJvdGF0aW9uKCk7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIGN1cnJlbnQgc2NhbGluZyBncmlkIHRoYXQgaXMgaW4gZWZmZWN0LiBJZiBzZXQgdG8gPGNvZGU+bnVsbDwvY29kZT4sXG5cdCAqIHRoZSBlbnRpcmUgZGlzcGxheSBvYmplY3QgaXMgc2NhbGVkIG5vcm1hbGx5IHdoZW4gYW55IHNjYWxlIHRyYW5zZm9ybWF0aW9uXG5cdCAqIGlzIGFwcGxpZWQuXG5cdCAqXG5cdCAqIDxwPldoZW4geW91IGRlZmluZSB0aGUgPGNvZGU+c2NhbGU5R3JpZDwvY29kZT4gcHJvcGVydHksIHRoZSBkaXNwbGF5XG5cdCAqIG9iamVjdCBpcyBkaXZpZGVkIGludG8gYSBncmlkIHdpdGggbmluZSByZWdpb25zIGJhc2VkIG9uIHRoZVxuXHQgKiA8Y29kZT5zY2FsZTlHcmlkPC9jb2RlPiByZWN0YW5nbGUsIHdoaWNoIGRlZmluZXMgdGhlIGNlbnRlciByZWdpb24gb2YgdGhlXG5cdCAqIGdyaWQuIFRoZSBlaWdodCBvdGhlciByZWdpb25zIG9mIHRoZSBncmlkIGFyZSB0aGUgZm9sbG93aW5nIGFyZWFzOiA8L3A+XG5cdCAqXG5cdCAqIDx1bD5cblx0ICogICA8bGk+VGhlIHVwcGVyLWxlZnQgY29ybmVyIG91dHNpZGUgb2YgdGhlIHJlY3RhbmdsZTwvbGk+XG5cdCAqICAgPGxpPlRoZSBhcmVhIGFib3ZlIHRoZSByZWN0YW5nbGUgPC9saT5cblx0ICogICA8bGk+VGhlIHVwcGVyLXJpZ2h0IGNvcm5lciBvdXRzaWRlIG9mIHRoZSByZWN0YW5nbGU8L2xpPlxuXHQgKiAgIDxsaT5UaGUgYXJlYSB0byB0aGUgbGVmdCBvZiB0aGUgcmVjdGFuZ2xlPC9saT5cblx0ICogICA8bGk+VGhlIGFyZWEgdG8gdGhlIHJpZ2h0IG9mIHRoZSByZWN0YW5nbGU8L2xpPlxuXHQgKiAgIDxsaT5UaGUgbG93ZXItbGVmdCBjb3JuZXIgb3V0c2lkZSBvZiB0aGUgcmVjdGFuZ2xlPC9saT5cblx0ICogICA8bGk+VGhlIGFyZWEgYmVsb3cgdGhlIHJlY3RhbmdsZTwvbGk+XG5cdCAqICAgPGxpPlRoZSBsb3dlci1yaWdodCBjb3JuZXIgb3V0c2lkZSBvZiB0aGUgcmVjdGFuZ2xlPC9saT5cblx0ICogPC91bD5cblx0ICpcblx0ICogPHA+WW91IGNhbiB0aGluayBvZiB0aGUgZWlnaHQgcmVnaW9ucyBvdXRzaWRlIG9mIHRoZSBjZW50ZXIoZGVmaW5lZCBieVxuXHQgKiB0aGUgcmVjdGFuZ2xlKSBhcyBiZWluZyBsaWtlIGEgcGljdHVyZSBmcmFtZSB0aGF0IGhhcyBzcGVjaWFsIHJ1bGVzXG5cdCAqIGFwcGxpZWQgdG8gaXQgd2hlbiBzY2FsZWQuPC9wPlxuXHQgKlxuXHQgKiA8cD5XaGVuIHRoZSA8Y29kZT5zY2FsZTlHcmlkPC9jb2RlPiBwcm9wZXJ0eSBpcyBzZXQgYW5kIGEgZGlzcGxheSBvYmplY3Rcblx0ICogaXMgc2NhbGVkLCBhbGwgdGV4dCBhbmQgZ3JhZGllbnRzIGFyZSBzY2FsZWQgbm9ybWFsbHk7IGhvd2V2ZXIsIGZvciBvdGhlclxuXHQgKiB0eXBlcyBvZiBvYmplY3RzIHRoZSBmb2xsb3dpbmcgcnVsZXMgYXBwbHk6PC9wPlxuXHQgKlxuXHQgKiA8dWw+XG5cdCAqICAgPGxpPkNvbnRlbnQgaW4gdGhlIGNlbnRlciByZWdpb24gaXMgc2NhbGVkIG5vcm1hbGx5LiA8L2xpPlxuXHQgKiAgIDxsaT5Db250ZW50IGluIHRoZSBjb3JuZXJzIGlzIG5vdCBzY2FsZWQuIDwvbGk+XG5cdCAqICAgPGxpPkNvbnRlbnQgaW4gdGhlIHRvcCBhbmQgYm90dG9tIHJlZ2lvbnMgaXMgc2NhbGVkIGhvcml6b250YWxseSBvbmx5LlxuXHQgKiBDb250ZW50IGluIHRoZSBsZWZ0IGFuZCByaWdodCByZWdpb25zIGlzIHNjYWxlZCB2ZXJ0aWNhbGx5IG9ubHkuPC9saT5cblx0ICogICA8bGk+QWxsIGZpbGxzKGluY2x1ZGluZyBiaXRtYXBzLCB2aWRlbywgYW5kIGdyYWRpZW50cykgYXJlIHN0cmV0Y2hlZCB0b1xuXHQgKiBmaXQgdGhlaXIgc2hhcGVzLjwvbGk+XG5cdCAqIDwvdWw+XG5cdCAqXG5cdCAqIDxwPklmIGEgZGlzcGxheSBvYmplY3QgaXMgcm90YXRlZCwgYWxsIHN1YnNlcXVlbnQgc2NhbGluZyBpcyBub3JtYWwoYW5kXG5cdCAqIHRoZSA8Y29kZT5zY2FsZTlHcmlkPC9jb2RlPiBwcm9wZXJ0eSBpcyBpZ25vcmVkKS48L3A+XG5cdCAqXG5cdCAqIDxwPkZvciBleGFtcGxlLCBjb25zaWRlciB0aGUgZm9sbG93aW5nIGRpc3BsYXkgb2JqZWN0IGFuZCBhIHJlY3RhbmdsZSB0aGF0XG5cdCAqIGlzIGFwcGxpZWQgYXMgdGhlIGRpc3BsYXkgb2JqZWN0J3MgPGNvZGU+c2NhbGU5R3JpZDwvY29kZT46PC9wPlxuXHQgKlxuXHQgKiA8cD5BIGNvbW1vbiB1c2UgZm9yIHNldHRpbmcgPGNvZGU+c2NhbGU5R3JpZDwvY29kZT4gaXMgdG8gc2V0IHVwIGEgZGlzcGxheVxuXHQgKiBvYmplY3QgdG8gYmUgdXNlZCBhcyBhIGNvbXBvbmVudCwgaW4gd2hpY2ggZWRnZSByZWdpb25zIHJldGFpbiB0aGUgc2FtZVxuXHQgKiB3aWR0aCB3aGVuIHRoZSBjb21wb25lbnQgaXMgc2NhbGVkLjwvcD5cblx0ICpcblx0ICogQHRocm93cyBBcmd1bWVudEVycm9yIElmIHlvdSBwYXNzIGFuIGludmFsaWQgYXJndW1lbnQgdG8gdGhlIG1ldGhvZC5cblx0ICovXG5cdHB1YmxpYyBzY2FsZTlHcmlkOlJlY3RhbmdsZTtcblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHRoZSBob3Jpem9udGFsIHNjYWxlKHBlcmNlbnRhZ2UpIG9mIHRoZSBvYmplY3QgYXMgYXBwbGllZCBmcm9tXG5cdCAqIHRoZSByZWdpc3RyYXRpb24gcG9pbnQuIFRoZSBkZWZhdWx0IHJlZ2lzdHJhdGlvbiBwb2ludCBpcygwLDApLiAxLjBcblx0ICogZXF1YWxzIDEwMCUgc2NhbGUuXG5cdCAqXG5cdCAqIDxwPlNjYWxpbmcgdGhlIGxvY2FsIGNvb3JkaW5hdGUgc3lzdGVtIGNoYW5nZXMgdGhlIDxjb2RlPng8L2NvZGU+IGFuZFxuXHQgKiA8Y29kZT55PC9jb2RlPiBwcm9wZXJ0eSB2YWx1ZXMsIHdoaWNoIGFyZSBkZWZpbmVkIGluIHdob2xlIHBpeGVscy4gPC9wPlxuXHQgKi9cblx0cHVibGljIGdldCBzY2FsZVgoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wU2NhbGVYO1xuXHR9XG5cblx0cHVibGljIHNldCBzY2FsZVgodmFsOm51bWJlcilcblx0e1xuXHRcdC8vcmVtb3ZlIGFic29sdXRlIHdpZHRoXG5cdFx0dGhpcy5fd2lkdGggPSBudWxsO1xuXG5cdFx0aWYgKHRoaXMuX3BTY2FsZVggPT0gdmFsKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fcFNjYWxlWCA9IHZhbDtcblxuXHRcdHRoaXMuaW52YWxpZGF0ZVNjYWxlKCk7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHRoZSB2ZXJ0aWNhbCBzY2FsZShwZXJjZW50YWdlKSBvZiBhbiBvYmplY3QgYXMgYXBwbGllZCBmcm9tIHRoZVxuXHQgKiByZWdpc3RyYXRpb24gcG9pbnQgb2YgdGhlIG9iamVjdC4gVGhlIGRlZmF1bHQgcmVnaXN0cmF0aW9uIHBvaW50IGlzKDAsMCkuXG5cdCAqIDEuMCBpcyAxMDAlIHNjYWxlLlxuXHQgKlxuXHQgKiA8cD5TY2FsaW5nIHRoZSBsb2NhbCBjb29yZGluYXRlIHN5c3RlbSBjaGFuZ2VzIHRoZSA8Y29kZT54PC9jb2RlPiBhbmRcblx0ICogPGNvZGU+eTwvY29kZT4gcHJvcGVydHkgdmFsdWVzLCB3aGljaCBhcmUgZGVmaW5lZCBpbiB3aG9sZSBwaXhlbHMuIDwvcD5cblx0ICovXG5cdHB1YmxpYyBnZXQgc2NhbGVZKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcFNjYWxlWTtcblx0fVxuXG5cdHB1YmxpYyBzZXQgc2NhbGVZKHZhbDpudW1iZXIpXG5cdHtcblx0XHQvL3JlbW92ZSBhYnNvbHV0ZSBoZWlnaHRcblx0XHR0aGlzLl9oZWlnaHQgPSBudWxsO1xuXG5cdFx0aWYgKHRoaXMuX3BTY2FsZVkgPT0gdmFsKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fcFNjYWxlWSA9IHZhbDtcblxuXHRcdHRoaXMuaW52YWxpZGF0ZVNjYWxlKCk7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHRoZSBkZXB0aCBzY2FsZShwZXJjZW50YWdlKSBvZiBhbiBvYmplY3QgYXMgYXBwbGllZCBmcm9tIHRoZVxuXHQgKiByZWdpc3RyYXRpb24gcG9pbnQgb2YgdGhlIG9iamVjdC4gVGhlIGRlZmF1bHQgcmVnaXN0cmF0aW9uIHBvaW50IGlzKDAsMCkuXG5cdCAqIDEuMCBpcyAxMDAlIHNjYWxlLlxuXHQgKlxuXHQgKiA8cD5TY2FsaW5nIHRoZSBsb2NhbCBjb29yZGluYXRlIHN5c3RlbSBjaGFuZ2VzIHRoZSA8Y29kZT54PC9jb2RlPixcblx0ICogPGNvZGU+eTwvY29kZT4gYW5kIDxjb2RlPno8L2NvZGU+IHByb3BlcnR5IHZhbHVlcywgd2hpY2ggYXJlIGRlZmluZWQgaW5cblx0ICogd2hvbGUgcGl4ZWxzLiA8L3A+XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHNjYWxlWigpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BTY2FsZVo7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHNjYWxlWih2YWw6bnVtYmVyKVxuXHR7XG5cdFx0Ly9yZW1vdmUgYWJzb2x1dGUgZGVwdGhcblx0XHR0aGlzLl9kZXB0aCA9IG51bGw7XG5cblx0XHRpZiAodGhpcy5fcFNjYWxlWiA9PSB2YWwpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9wU2NhbGVaID0gdmFsO1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlU2NhbGUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBzY2VuZSgpOlNjZW5lXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcFNjZW5lO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHNjZW5lUG9zaXRpb24oKTpWZWN0b3IzRFxuXHR7XG5cdFx0aWYgKHRoaXMuX3NjZW5lUG9zaXRpb25EaXJ0eSkge1xuXHRcdFx0aWYgKCF0aGlzLl9waXZvdFplcm8gJiYgdGhpcy5hbGlnbm1lbnRNb2RlID09IEFsaWdubWVudE1vZGUuUElWT1RfUE9JTlQpIHtcblx0XHRcdFx0dGhpcy5fc2NlbmVQb3NpdGlvbiA9IHRoaXMuc2NlbmVUcmFuc2Zvcm0udHJhbnNmb3JtVmVjdG9yKHRoaXMuX3Bpdm90U2NhbGUpO1xuXHRcdFx0XHQvL3RoaXMuX3NjZW5lUG9zaXRpb24uZGVjcmVtZW50QnkobmV3IFZlY3RvcjNEKHRoaXMuX3Bpdm90LngqdGhpcy5fcFNjYWxlWCwgdGhpcy5fcGl2b3QueSp0aGlzLl9wU2NhbGVZLCB0aGlzLl9waXZvdC56KnRoaXMuX3BTY2FsZVopKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuc2NlbmVUcmFuc2Zvcm0uY29weUNvbHVtblRvKDMsIHRoaXMuX3NjZW5lUG9zaXRpb24pO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLl9zY2VuZVBvc2l0aW9uRGlydHkgPSBmYWxzZTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuX3NjZW5lUG9zaXRpb247XG5cdH1cblxuXHRwdWJsaWMgZ2V0IHNjZW5lVHJhbnNmb3JtKCk6TWF0cml4M0Rcblx0e1xuXHRcdGlmICh0aGlzLl9wU2NlbmVUcmFuc2Zvcm1EaXJ0eSlcblx0XHRcdHRoaXMucFVwZGF0ZVNjZW5lVHJhbnNmb3JtKCk7XG5cblx0XHRyZXR1cm4gdGhpcy5fcFNjZW5lVHJhbnNmb3JtO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBzY3JvbGwgcmVjdGFuZ2xlIGJvdW5kcyBvZiB0aGUgZGlzcGxheSBvYmplY3QuIFRoZSBkaXNwbGF5IG9iamVjdCBpc1xuXHQgKiBjcm9wcGVkIHRvIHRoZSBzaXplIGRlZmluZWQgYnkgdGhlIHJlY3RhbmdsZSwgYW5kIGl0IHNjcm9sbHMgd2l0aGluIHRoZVxuXHQgKiByZWN0YW5nbGUgd2hlbiB5b3UgY2hhbmdlIHRoZSA8Y29kZT54PC9jb2RlPiBhbmQgPGNvZGU+eTwvY29kZT4gcHJvcGVydGllc1xuXHQgKiBvZiB0aGUgPGNvZGU+c2Nyb2xsUmVjdDwvY29kZT4gb2JqZWN0LlxuXHQgKlxuXHQgKiA8cD5UaGUgcHJvcGVydGllcyBvZiB0aGUgPGNvZGU+c2Nyb2xsUmVjdDwvY29kZT4gUmVjdGFuZ2xlIG9iamVjdCB1c2UgdGhlXG5cdCAqIGRpc3BsYXkgb2JqZWN0J3MgY29vcmRpbmF0ZSBzcGFjZSBhbmQgYXJlIHNjYWxlZCBqdXN0IGxpa2UgdGhlIG92ZXJhbGxcblx0ICogZGlzcGxheSBvYmplY3QuIFRoZSBjb3JuZXIgYm91bmRzIG9mIHRoZSBjcm9wcGVkIHdpbmRvdyBvbiB0aGUgc2Nyb2xsaW5nXG5cdCAqIGRpc3BsYXkgb2JqZWN0IGFyZSB0aGUgb3JpZ2luIG9mIHRoZSBkaXNwbGF5IG9iamVjdCgwLDApIGFuZCB0aGUgcG9pbnRcblx0ICogZGVmaW5lZCBieSB0aGUgd2lkdGggYW5kIGhlaWdodCBvZiB0aGUgcmVjdGFuZ2xlLiBUaGV5IGFyZSBub3QgY2VudGVyZWRcblx0ICogYXJvdW5kIHRoZSBvcmlnaW4sIGJ1dCB1c2UgdGhlIG9yaWdpbiB0byBkZWZpbmUgdGhlIHVwcGVyLWxlZnQgY29ybmVyIG9mXG5cdCAqIHRoZSBhcmVhLiBBIHNjcm9sbGVkIGRpc3BsYXkgb2JqZWN0IGFsd2F5cyBzY3JvbGxzIGluIHdob2xlIHBpeGVsXG5cdCAqIGluY3JlbWVudHMuIDwvcD5cblx0ICpcblx0ICogPHA+WW91IGNhbiBzY3JvbGwgYW4gb2JqZWN0IGxlZnQgYW5kIHJpZ2h0IGJ5IHNldHRpbmcgdGhlIDxjb2RlPng8L2NvZGU+XG5cdCAqIHByb3BlcnR5IG9mIHRoZSA8Y29kZT5zY3JvbGxSZWN0PC9jb2RlPiBSZWN0YW5nbGUgb2JqZWN0LiBZb3UgY2FuIHNjcm9sbFxuXHQgKiBhbiBvYmplY3QgdXAgYW5kIGRvd24gYnkgc2V0dGluZyB0aGUgPGNvZGU+eTwvY29kZT4gcHJvcGVydHkgb2YgdGhlXG5cdCAqIDxjb2RlPnNjcm9sbFJlY3Q8L2NvZGU+IFJlY3RhbmdsZSBvYmplY3QuIElmIHRoZSBkaXNwbGF5IG9iamVjdCBpcyByb3RhdGVkXG5cdCAqIDkwwrAgYW5kIHlvdSBzY3JvbGwgaXQgbGVmdCBhbmQgcmlnaHQsIHRoZSBkaXNwbGF5IG9iamVjdCBhY3R1YWxseSBzY3JvbGxzXG5cdCAqIHVwIGFuZCBkb3duLjwvcD5cblx0ICovXG5cdHB1YmxpYyBzY3JvbGxSZWN0OlJlY3RhbmdsZTtcblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgc2hhZGVyUGlja2luZ0RldGFpbHMoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fc2hhZGVyUGlja2luZ0RldGFpbHM7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgZGVidWdWaXNpYmxlKCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2RlYnVnVmlzaWJsZTtcblx0fVxuXG5cdHB1YmxpYyBzZXQgZGVidWdWaXNpYmxlKHZhbHVlOmJvb2xlYW4pXG5cdHtcblx0XHRpZiAodmFsdWUgPT0gdGhpcy5fZGVidWdWaXNpYmxlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fZGVidWdWaXNpYmxlID0gdmFsdWU7XG5cblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX2VudGl0eU5vZGVzLmxlbmd0aDtcblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBsZW47IGkrKylcblx0XHRcdHRoaXMuX2VudGl0eU5vZGVzW2ldLmRlYnVnVmlzaWJsZSA9IHRoaXMuX2RlYnVnVmlzaWJsZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBbiBvYmplY3Qgd2l0aCBwcm9wZXJ0aWVzIHBlcnRhaW5pbmcgdG8gYSBkaXNwbGF5IG9iamVjdCdzIG1hdHJpeCwgY29sb3Jcblx0ICogdHJhbnNmb3JtLCBhbmQgcGl4ZWwgYm91bmRzLiBUaGUgc3BlY2lmaWMgcHJvcGVydGllcyAgLSAgbWF0cml4LFxuXHQgKiBjb2xvclRyYW5zZm9ybSwgYW5kIHRocmVlIHJlYWQtb25seSBwcm9wZXJ0aWVzXG5cdCAqICg8Y29kZT5jb25jYXRlbmF0ZWRNYXRyaXg8L2NvZGU+LCA8Y29kZT5jb25jYXRlbmF0ZWRDb2xvclRyYW5zZm9ybTwvY29kZT4sXG5cdCAqIGFuZCA8Y29kZT5waXhlbEJvdW5kczwvY29kZT4pICAtICBhcmUgZGVzY3JpYmVkIGluIHRoZSBlbnRyeSBmb3IgdGhlXG5cdCAqIFRyYW5zZm9ybSBjbGFzcy5cblx0ICpcblx0ICogPHA+RWFjaCBvZiB0aGUgdHJhbnNmb3JtIG9iamVjdCdzIHByb3BlcnRpZXMgaXMgaXRzZWxmIGFuIG9iamVjdC4gVGhpc1xuXHQgKiBjb25jZXB0IGlzIGltcG9ydGFudCBiZWNhdXNlIHRoZSBvbmx5IHdheSB0byBzZXQgbmV3IHZhbHVlcyBmb3IgdGhlIG1hdHJpeFxuXHQgKiBvciBjb2xvclRyYW5zZm9ybSBvYmplY3RzIGlzIHRvIGNyZWF0ZSBhIG5ldyBvYmplY3QgYW5kIGNvcHkgdGhhdCBvYmplY3Rcblx0ICogaW50byB0aGUgdHJhbnNmb3JtLm1hdHJpeCBvciB0cmFuc2Zvcm0uY29sb3JUcmFuc2Zvcm0gcHJvcGVydHkuPC9wPlxuXHQgKlxuXHQgKiA8cD5Gb3IgZXhhbXBsZSwgdG8gaW5jcmVhc2UgdGhlIDxjb2RlPnR4PC9jb2RlPiB2YWx1ZSBvZiBhIGRpc3BsYXlcblx0ICogb2JqZWN0J3MgbWF0cml4LCB5b3UgbXVzdCBtYWtlIGEgY29weSBvZiB0aGUgZW50aXJlIG1hdHJpeCBvYmplY3QsIHRoZW5cblx0ICogY29weSB0aGUgbmV3IG9iamVjdCBpbnRvIHRoZSBtYXRyaXggcHJvcGVydHkgb2YgdGhlIHRyYW5zZm9ybSBvYmplY3Q6PC9wPlxuXHQgKiA8cHJlIHhtbDpzcGFjZT1cInByZXNlcnZlXCI+PGNvZGU+IHB1YmxpYyBteU1hdHJpeDpNYXRyaXggPVxuXHQgKiBteURpc3BsYXlPYmplY3QudHJhbnNmb3JtLm1hdHJpeDsgbXlNYXRyaXgudHggKz0gMTA7XG5cdCAqIG15RGlzcGxheU9iamVjdC50cmFuc2Zvcm0ubWF0cml4ID0gbXlNYXRyaXg7IDwvY29kZT48L3ByZT5cblx0ICpcblx0ICogPHA+WW91IGNhbm5vdCBkaXJlY3RseSBzZXQgdGhlIDxjb2RlPnR4PC9jb2RlPiBwcm9wZXJ0eS4gVGhlIGZvbGxvd2luZ1xuXHQgKiBjb2RlIGhhcyBubyBlZmZlY3Qgb24gPGNvZGU+bXlEaXNwbGF5T2JqZWN0PC9jb2RlPjogPC9wPlxuXHQgKiA8cHJlIHhtbDpzcGFjZT1cInByZXNlcnZlXCI+PGNvZGU+IG15RGlzcGxheU9iamVjdC50cmFuc2Zvcm0ubWF0cml4LnR4ICs9XG5cdCAqIDEwOyA8L2NvZGU+PC9wcmU+XG5cdCAqXG5cdCAqIDxwPllvdSBjYW4gYWxzbyBjb3B5IGFuIGVudGlyZSB0cmFuc2Zvcm0gb2JqZWN0IGFuZCBhc3NpZ24gaXQgdG8gYW5vdGhlclxuXHQgKiBkaXNwbGF5IG9iamVjdCdzIHRyYW5zZm9ybSBwcm9wZXJ0eS4gRm9yIGV4YW1wbGUsIHRoZSBmb2xsb3dpbmcgY29kZVxuXHQgKiBjb3BpZXMgdGhlIGVudGlyZSB0cmFuc2Zvcm0gb2JqZWN0IGZyb20gPGNvZGU+bXlPbGREaXNwbGF5T2JqPC9jb2RlPiB0b1xuXHQgKiA8Y29kZT5teU5ld0Rpc3BsYXlPYmo8L2NvZGU+OjwvcD5cblx0ICogPGNvZGU+bXlOZXdEaXNwbGF5T2JqLnRyYW5zZm9ybSA9IG15T2xkRGlzcGxheU9iai50cmFuc2Zvcm07PC9jb2RlPlxuXHQgKlxuXHQgKiA8cD5UaGUgcmVzdWx0aW5nIGRpc3BsYXkgb2JqZWN0LCA8Y29kZT5teU5ld0Rpc3BsYXlPYmo8L2NvZGU+LCBub3cgaGFzIHRoZVxuXHQgKiBzYW1lIHZhbHVlcyBmb3IgaXRzIG1hdHJpeCwgY29sb3IgdHJhbnNmb3JtLCBhbmQgcGl4ZWwgYm91bmRzIGFzIHRoZSBvbGRcblx0ICogZGlzcGxheSBvYmplY3QsIDxjb2RlPm15T2xkRGlzcGxheU9iajwvY29kZT4uPC9wPlxuXHQgKlxuXHQgKiA8cD5Ob3RlIHRoYXQgQUlSIGZvciBUViBkZXZpY2VzIHVzZSBoYXJkd2FyZSBhY2NlbGVyYXRpb24sIGlmIGl0IGlzXG5cdCAqIGF2YWlsYWJsZSwgZm9yIGNvbG9yIHRyYW5zZm9ybXMuPC9wPlxuXHQgKi9cblx0cHVibGljIGdldCB0cmFuc2Zvcm0oKTpUcmFuc2Zvcm1cblx0e1xuXHRcdHJldHVybiB0aGlzLl90cmFuc2Zvcm07XG5cdH1cblxuXHQvKipcblx0ICogV2hldGhlciBvciBub3QgdGhlIGRpc3BsYXkgb2JqZWN0IGlzIHZpc2libGUuIERpc3BsYXkgb2JqZWN0cyB0aGF0IGFyZSBub3Rcblx0ICogdmlzaWJsZSBhcmUgZGlzYWJsZWQuIEZvciBleGFtcGxlLCBpZiA8Y29kZT52aXNpYmxlPWZhbHNlPC9jb2RlPiBmb3IgYW5cblx0ICogSW50ZXJhY3RpdmVPYmplY3QgaW5zdGFuY2UsIGl0IGNhbm5vdCBiZSBjbGlja2VkLlxuXHQgKi9cblx0cHVibGljIGdldCB2aXNpYmxlKCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2V4cGxpY2l0VmlzaWJpbGl0eTtcblx0fVxuXG5cdHB1YmxpYyBzZXQgdmlzaWJsZSh2YWx1ZTpib29sZWFuKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2V4cGxpY2l0VmlzaWJpbGl0eSA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX2V4cGxpY2l0VmlzaWJpbGl0eSA9IHZhbHVlO1xuXG5cdFx0dGhpcy5fcFVwZGF0ZUltcGxpY2l0VmlzaWJpbGl0eSh0aGlzLl9wUGFyZW50PyB0aGlzLl9wUGFyZW50Ll9pSXNWaXNpYmxlKCkgOiB0cnVlKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgdGhlIHdpZHRoIG9mIHRoZSBkaXNwbGF5IG9iamVjdCwgaW4gcGl4ZWxzLiBUaGUgd2lkdGggaXNcblx0ICogY2FsY3VsYXRlZCBiYXNlZCBvbiB0aGUgYm91bmRzIG9mIHRoZSBjb250ZW50IG9mIHRoZSBkaXNwbGF5IG9iamVjdC4gV2hlblxuXHQgKiB5b3Ugc2V0IHRoZSA8Y29kZT53aWR0aDwvY29kZT4gcHJvcGVydHksIHRoZSA8Y29kZT5zY2FsZVg8L2NvZGU+IHByb3BlcnR5XG5cdCAqIGlzIGFkanVzdGVkIGFjY29yZGluZ2x5LCBhcyBzaG93biBpbiB0aGUgZm9sbG93aW5nIGNvZGU6XG5cdCAqXG5cdCAqIDxwPkV4Y2VwdCBmb3IgVGV4dEZpZWxkIGFuZCBWaWRlbyBvYmplY3RzLCBhIGRpc3BsYXkgb2JqZWN0IHdpdGggbm9cblx0ICogY29udGVudChzdWNoIGFzIGFuIGVtcHR5IHNwcml0ZSkgaGFzIGEgd2lkdGggb2YgMCwgZXZlbiBpZiB5b3UgdHJ5IHRvIHNldFxuXHQgKiA8Y29kZT53aWR0aDwvY29kZT4gdG8gYSBkaWZmZXJlbnQgdmFsdWUuPC9wPlxuXHQgKi9cblx0cHVibGljIGdldCB3aWR0aCgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0Qm94KCkud2lkdGgqdGhpcy5fcFNjYWxlWDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgd2lkdGgodmFsOm51bWJlcilcblx0e1xuXHRcdGlmICh0aGlzLl93aWR0aCA9PSB2YWwpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl93aWR0aCA9IHZhbDtcblxuXHRcdHRoaXMuX3BTY2FsZVggPSB2YWwvdGhpcy5nZXRCb3goKS53aWR0aDtcblxuXHRcdHRoaXMuaW52YWxpZGF0ZVNjYWxlKCk7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHRoZSA8aT54PC9pPiBjb29yZGluYXRlIG9mIHRoZSBEaXNwbGF5T2JqZWN0IGluc3RhbmNlIHJlbGF0aXZlXG5cdCAqIHRvIHRoZSBsb2NhbCBjb29yZGluYXRlcyBvZiB0aGUgcGFyZW50IERpc3BsYXlPYmplY3RDb250YWluZXIuIElmIHRoZVxuXHQgKiBvYmplY3QgaXMgaW5zaWRlIGEgRGlzcGxheU9iamVjdENvbnRhaW5lciB0aGF0IGhhcyB0cmFuc2Zvcm1hdGlvbnMsIGl0IGlzXG5cdCAqIGluIHRoZSBsb2NhbCBjb29yZGluYXRlIHN5c3RlbSBvZiB0aGUgZW5jbG9zaW5nIERpc3BsYXlPYmplY3RDb250YWluZXIuXG5cdCAqIFRodXMsIGZvciBhIERpc3BsYXlPYmplY3RDb250YWluZXIgcm90YXRlZCA5MMKwIGNvdW50ZXJjbG9ja3dpc2UsIHRoZVxuXHQgKiBEaXNwbGF5T2JqZWN0Q29udGFpbmVyJ3MgY2hpbGRyZW4gaW5oZXJpdCBhIGNvb3JkaW5hdGUgc3lzdGVtIHRoYXQgaXNcblx0ICogcm90YXRlZCA5MMKwIGNvdW50ZXJjbG9ja3dpc2UuIFRoZSBvYmplY3QncyBjb29yZGluYXRlcyByZWZlciB0byB0aGVcblx0ICogcmVnaXN0cmF0aW9uIHBvaW50IHBvc2l0aW9uLlxuXHQgKi9cblx0cHVibGljIGdldCB4KCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5feDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgeCh2YWw6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3ggPT0gdmFsKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5feCA9IHZhbDtcblxuXHRcdHRoaXMuaW52YWxpZGF0ZVBvc2l0aW9uKCk7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHRoZSA8aT55PC9pPiBjb29yZGluYXRlIG9mIHRoZSBEaXNwbGF5T2JqZWN0IGluc3RhbmNlIHJlbGF0aXZlXG5cdCAqIHRvIHRoZSBsb2NhbCBjb29yZGluYXRlcyBvZiB0aGUgcGFyZW50IERpc3BsYXlPYmplY3RDb250YWluZXIuIElmIHRoZVxuXHQgKiBvYmplY3QgaXMgaW5zaWRlIGEgRGlzcGxheU9iamVjdENvbnRhaW5lciB0aGF0IGhhcyB0cmFuc2Zvcm1hdGlvbnMsIGl0IGlzXG5cdCAqIGluIHRoZSBsb2NhbCBjb29yZGluYXRlIHN5c3RlbSBvZiB0aGUgZW5jbG9zaW5nIERpc3BsYXlPYmplY3RDb250YWluZXIuXG5cdCAqIFRodXMsIGZvciBhIERpc3BsYXlPYmplY3RDb250YWluZXIgcm90YXRlZCA5MMKwIGNvdW50ZXJjbG9ja3dpc2UsIHRoZVxuXHQgKiBEaXNwbGF5T2JqZWN0Q29udGFpbmVyJ3MgY2hpbGRyZW4gaW5oZXJpdCBhIGNvb3JkaW5hdGUgc3lzdGVtIHRoYXQgaXNcblx0ICogcm90YXRlZCA5MMKwIGNvdW50ZXJjbG9ja3dpc2UuIFRoZSBvYmplY3QncyBjb29yZGluYXRlcyByZWZlciB0byB0aGVcblx0ICogcmVnaXN0cmF0aW9uIHBvaW50IHBvc2l0aW9uLlxuXHQgKi9cblx0cHVibGljIGdldCB5KCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5feTtcblx0fVxuXG5cdHB1YmxpYyBzZXQgeSh2YWw6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3kgPT0gdmFsKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5feSA9IHZhbDtcblxuXHRcdHRoaXMuaW52YWxpZGF0ZVBvc2l0aW9uKCk7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHRoZSB6IGNvb3JkaW5hdGUgcG9zaXRpb24gYWxvbmcgdGhlIHotYXhpcyBvZiB0aGUgRGlzcGxheU9iamVjdFxuXHQgKiBpbnN0YW5jZSByZWxhdGl2ZSB0byB0aGUgM0QgcGFyZW50IGNvbnRhaW5lci4gVGhlIHogcHJvcGVydHkgaXMgdXNlZCBmb3Jcblx0ICogM0QgY29vcmRpbmF0ZXMsIG5vdCBzY3JlZW4gb3IgcGl4ZWwgY29vcmRpbmF0ZXMuXG5cdCAqXG5cdCAqIDxwPldoZW4geW91IHNldCBhIDxjb2RlPno8L2NvZGU+IHByb3BlcnR5IGZvciBhIGRpc3BsYXkgb2JqZWN0IHRvXG5cdCAqIHNvbWV0aGluZyBvdGhlciB0aGFuIHRoZSBkZWZhdWx0IHZhbHVlIG9mIDxjb2RlPjA8L2NvZGU+LCBhIGNvcnJlc3BvbmRpbmdcblx0ICogTWF0cml4M0Qgb2JqZWN0IGlzIGF1dG9tYXRpY2FsbHkgY3JlYXRlZC4gZm9yIGFkanVzdGluZyBhIGRpc3BsYXkgb2JqZWN0J3Ncblx0ICogcG9zaXRpb24gYW5kIG9yaWVudGF0aW9uIGluIHRocmVlIGRpbWVuc2lvbnMuIFdoZW4gd29ya2luZyB3aXRoIHRoZVxuXHQgKiB6LWF4aXMsIHRoZSBleGlzdGluZyBiZWhhdmlvciBvZiB4IGFuZCB5IHByb3BlcnRpZXMgY2hhbmdlcyBmcm9tIHNjcmVlbiBvclxuXHQgKiBwaXhlbCBjb29yZGluYXRlcyB0byBwb3NpdGlvbnMgcmVsYXRpdmUgdG8gdGhlIDNEIHBhcmVudCBjb250YWluZXIuPC9wPlxuXHQgKlxuXHQgKiA8cD5Gb3IgZXhhbXBsZSwgYSBjaGlsZCBvZiB0aGUgPGNvZGU+X3Jvb3Q8L2NvZGU+IGF0IHBvc2l0aW9uIHggPSAxMDAsIHkgPVxuXHQgKiAxMDAsIHogPSAyMDAgaXMgbm90IGRyYXduIGF0IHBpeGVsIGxvY2F0aW9uKDEwMCwxMDApLiBUaGUgY2hpbGQgaXMgZHJhd25cblx0ICogd2hlcmV2ZXIgdGhlIDNEIHByb2plY3Rpb24gY2FsY3VsYXRpb24gcHV0cyBpdC4gVGhlIGNhbGN1bGF0aW9uIGlzOjwvcD5cblx0ICpcblx0ICogPHA+PGNvZGU+KHh+fmNhbWVyYUZvY2FsTGVuZ3RoL2NhbWVyYVJlbGF0aXZlWlBvc2l0aW9uLFxuXHQgKiB5fn5jYW1lcmFGb2NhbExlbmd0aC9jYW1lcmFSZWxhdGl2ZVpQb3NpdGlvbik8L2NvZGU+PC9wPlxuXHQgKi9cblx0cHVibGljIGdldCB6KCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fejtcblx0fVxuXG5cdHB1YmxpYyBzZXQgeih2YWw6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3ogPT0gdmFsKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5feiA9IHZhbDtcblxuXHRcdHRoaXMuaW52YWxpZGF0ZVBvc2l0aW9uKCk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgek9mZnNldCgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3pPZmZzZXQ7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHpPZmZzZXQodmFsdWU6bnVtYmVyKVxuXHR7XG5cdFx0dGhpcy5fek9mZnNldCA9IHZhbHVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBuZXcgPGNvZGU+RGlzcGxheU9iamVjdDwvY29kZT4gaW5zdGFuY2UuXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcigpXG5cdHtcblx0XHRzdXBlcigpO1xuXG5cdFx0Ly8gQ2FjaGVkIHZlY3RvciBvZiB0cmFuc2Zvcm1hdGlvbiBjb21wb25lbnRzIHVzZWQgd2hlblxuXHRcdC8vIHJlY29tcG9zaW5nIHRoZSB0cmFuc2Zvcm0gbWF0cml4IGluIHVwZGF0ZVRyYW5zZm9ybSgpXG5cblx0XHR0aGlzLl90cmFuc2Zvcm1Db21wb25lbnRzID0gbmV3IEFycmF5PFZlY3RvcjNEPigzKTtcblxuXHRcdHRoaXMuX3RyYW5zZm9ybUNvbXBvbmVudHNbMF0gPSB0aGlzLl9wb3M7XG5cdFx0dGhpcy5fdHJhbnNmb3JtQ29tcG9uZW50c1sxXSA9IHRoaXMuX3JvdDtcblx0XHR0aGlzLl90cmFuc2Zvcm1Db21wb25lbnRzWzJdID0gdGhpcy5fc2NhO1xuXG5cdFx0Ly9jcmVhdGlvbiBvZiBhc3NvY2lhdGVkIHRyYW5zZm9ybSBvYmplY3Rcblx0XHR0aGlzLl90cmFuc2Zvcm0gPSBuZXcgVHJhbnNmb3JtKHRoaXMpO1xuXG5cdFx0dGhpcy5fbWF0cml4M0QuaWRlbnRpdHkoKTtcblxuXHRcdHRoaXMuX2ZsaXBZLmFwcGVuZFNjYWxlKDEsIC0xLCAxKTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGFkZEV2ZW50TGlzdGVuZXIodHlwZTpzdHJpbmcsIGxpc3RlbmVyOkZ1bmN0aW9uKVxuXHR7XG5cdFx0c3VwZXIuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcik7XG5cblx0XHRzd2l0Y2ggKHR5cGUpIHtcblx0XHRcdGNhc2UgRGlzcGxheU9iamVjdEV2ZW50LlBPU0lUSU9OX0NIQU5HRUQ6XG5cdFx0XHRcdHRoaXMuX2xpc3RlblRvUG9zaXRpb25DaGFuZ2VkID0gdHJ1ZTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIERpc3BsYXlPYmplY3RFdmVudC5ST1RBVElPTl9DSEFOR0VEOlxuXHRcdFx0XHR0aGlzLl9saXN0ZW5Ub1JvdGF0aW9uQ2hhbmdlZCA9IHRydWU7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBEaXNwbGF5T2JqZWN0RXZlbnQuU0NBTEVfQ0hBTkdFRDpcblx0XHRcdFx0dGhpcy5fbGlzdGVuVG9TY2FsZUNoYW5nZWQgPSB0cnVlO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgRGlzcGxheU9iamVjdEV2ZW50LlNDRU5FX0NIQU5HRUQ6XG5cdFx0XHRcdHRoaXMuX2xpc3RlblRvU2NlbmVDaGFuZ2VkID0gdHJ1ZTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIERpc3BsYXlPYmplY3RFdmVudC5TQ0VORVRSQU5TRk9STV9DSEFOR0VEOlxuXHRcdFx0XHR0aGlzLl9saXN0ZW5Ub1NjZW5lVHJhbnNmb3JtQ2hhbmdlZCA9IHRydWU7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGNsb25lKCk6RGlzcGxheU9iamVjdFxuXHR7XG5cdFx0dmFyIGNsb25lOkRpc3BsYXlPYmplY3QgPSBuZXcgRGlzcGxheU9iamVjdCgpO1xuXHRcdGNsb25lLnBpdm90ID0gdGhpcy5waXZvdDtcblx0XHRjbG9uZS5faU1hdHJpeDNEID0gdGhpcy5faU1hdHJpeDNEO1xuXHRcdGNsb25lLm5hbWUgPSBuYW1lO1xuXG5cdFx0Ly8gdG9kbzogaW1wbGVtZW50IGZvciBhbGwgc3VidHlwZXNcblx0XHRyZXR1cm4gY2xvbmU7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBkaXNwb3NlKClcblx0e1xuXHRcdGlmICh0aGlzLnBhcmVudClcblx0XHRcdHRoaXMucGFyZW50LnJlbW92ZUNoaWxkKHRoaXMpO1xuXG5cdFx0d2hpbGUgKHRoaXMuX3BSZW5kZXJhYmxlcy5sZW5ndGgpXG5cdFx0XHR0aGlzLl9wUmVuZGVyYWJsZXNbMF0uZGlzcG9zZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBpbmhlcml0RG9jXG5cdCAqL1xuXHRwdWJsaWMgZGlzcG9zZUFzc2V0KClcblx0e1xuXHRcdHRoaXMuZGlzcG9zZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgYSByZWN0YW5nbGUgdGhhdCBkZWZpbmVzIHRoZSBhcmVhIG9mIHRoZSBkaXNwbGF5IG9iamVjdCByZWxhdGl2ZVxuXHQgKiB0byB0aGUgY29vcmRpbmF0ZSBzeXN0ZW0gb2YgdGhlIDxjb2RlPnRhcmdldENvb3JkaW5hdGVTcGFjZTwvY29kZT4gb2JqZWN0LlxuXHQgKiBDb25zaWRlciB0aGUgZm9sbG93aW5nIGNvZGUsIHdoaWNoIHNob3dzIGhvdyB0aGUgcmVjdGFuZ2xlIHJldHVybmVkIGNhblxuXHQgKiB2YXJ5IGRlcGVuZGluZyBvbiB0aGUgPGNvZGU+dGFyZ2V0Q29vcmRpbmF0ZVNwYWNlPC9jb2RlPiBwYXJhbWV0ZXIgdGhhdFxuXHQgKiB5b3UgcGFzcyB0byB0aGUgbWV0aG9kOlxuXHQgKlxuXHQgKiA8cD48Yj5Ob3RlOjwvYj4gVXNlIHRoZSA8Y29kZT5sb2NhbFRvR2xvYmFsKCk8L2NvZGU+IGFuZFxuXHQgKiA8Y29kZT5nbG9iYWxUb0xvY2FsKCk8L2NvZGU+IG1ldGhvZHMgdG8gY29udmVydCB0aGUgZGlzcGxheSBvYmplY3QncyBsb2NhbFxuXHQgKiBjb29yZGluYXRlcyB0byBkaXNwbGF5IGNvb3JkaW5hdGVzLCBvciBkaXNwbGF5IGNvb3JkaW5hdGVzIHRvIGxvY2FsXG5cdCAqIGNvb3JkaW5hdGVzLCByZXNwZWN0aXZlbHkuPC9wPlxuXHQgKlxuXHQgKiA8cD5UaGUgPGNvZGU+Z2V0Qm91bmRzKCk8L2NvZGU+IG1ldGhvZCBpcyBzaW1pbGFyIHRvIHRoZVxuXHQgKiA8Y29kZT5nZXRSZWN0KCk8L2NvZGU+IG1ldGhvZDsgaG93ZXZlciwgdGhlIFJlY3RhbmdsZSByZXR1cm5lZCBieSB0aGVcblx0ICogPGNvZGU+Z2V0Qm91bmRzKCk8L2NvZGU+IG1ldGhvZCBpbmNsdWRlcyBhbnkgc3Ryb2tlcyBvbiBzaGFwZXMsIHdoZXJlYXNcblx0ICogdGhlIFJlY3RhbmdsZSByZXR1cm5lZCBieSB0aGUgPGNvZGU+Z2V0UmVjdCgpPC9jb2RlPiBtZXRob2QgZG9lcyBub3QuIEZvclxuXHQgKiBhbiBleGFtcGxlLCBzZWUgdGhlIGRlc2NyaXB0aW9uIG9mIHRoZSA8Y29kZT5nZXRSZWN0KCk8L2NvZGU+IG1ldGhvZC48L3A+XG5cdCAqXG5cdCAqIEBwYXJhbSB0YXJnZXRDb29yZGluYXRlU3BhY2UgVGhlIGRpc3BsYXkgb2JqZWN0IHRoYXQgZGVmaW5lcyB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb29yZGluYXRlIHN5c3RlbSB0byB1c2UuXG5cdCAqIEByZXR1cm4gVGhlIHJlY3RhbmdsZSB0aGF0IGRlZmluZXMgdGhlIGFyZWEgb2YgdGhlIGRpc3BsYXkgb2JqZWN0IHJlbGF0aXZlXG5cdCAqICAgICAgICAgdG8gdGhlIDxjb2RlPnRhcmdldENvb3JkaW5hdGVTcGFjZTwvY29kZT4gb2JqZWN0J3MgY29vcmRpbmF0ZVxuXHQgKiAgICAgICAgIHN5c3RlbS5cblx0ICovXG5cdHB1YmxpYyBnZXRCb3VuZHModGFyZ2V0Q29vcmRpbmF0ZVNwYWNlOkRpc3BsYXlPYmplY3QpOlJlY3RhbmdsZVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2JvdW5kczsgLy9UT0RPXG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhIHJlY3RhbmdsZSB0aGF0IGRlZmluZXMgdGhlIGJvdW5kYXJ5IG9mIHRoZSBkaXNwbGF5IG9iamVjdCwgYmFzZWRcblx0ICogb24gdGhlIGNvb3JkaW5hdGUgc3lzdGVtIGRlZmluZWQgYnkgdGhlIDxjb2RlPnRhcmdldENvb3JkaW5hdGVTcGFjZTwvY29kZT5cblx0ICogcGFyYW1ldGVyLCBleGNsdWRpbmcgYW55IHN0cm9rZXMgb24gc2hhcGVzLiBUaGUgdmFsdWVzIHRoYXQgdGhlXG5cdCAqIDxjb2RlPmdldFJlY3QoKTwvY29kZT4gbWV0aG9kIHJldHVybnMgYXJlIHRoZSBzYW1lIG9yIHNtYWxsZXIgdGhhbiB0aG9zZVxuXHQgKiByZXR1cm5lZCBieSB0aGUgPGNvZGU+Z2V0Qm91bmRzKCk8L2NvZGU+IG1ldGhvZC5cblx0ICpcblx0ICogPHA+PGI+Tm90ZTo8L2I+IFVzZSA8Y29kZT5sb2NhbFRvR2xvYmFsKCk8L2NvZGU+IGFuZFxuXHQgKiA8Y29kZT5nbG9iYWxUb0xvY2FsKCk8L2NvZGU+IG1ldGhvZHMgdG8gY29udmVydCB0aGUgZGlzcGxheSBvYmplY3QncyBsb2NhbFxuXHQgKiBjb29yZGluYXRlcyB0byBTY2VuZSBjb29yZGluYXRlcywgb3IgU2NlbmUgY29vcmRpbmF0ZXMgdG8gbG9jYWxcblx0ICogY29vcmRpbmF0ZXMsIHJlc3BlY3RpdmVseS48L3A+XG5cdCAqXG5cdCAqIEBwYXJhbSB0YXJnZXRDb29yZGluYXRlU3BhY2UgVGhlIGRpc3BsYXkgb2JqZWN0IHRoYXQgZGVmaW5lcyB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb29yZGluYXRlIHN5c3RlbSB0byB1c2UuXG5cdCAqIEByZXR1cm4gVGhlIHJlY3RhbmdsZSB0aGF0IGRlZmluZXMgdGhlIGFyZWEgb2YgdGhlIGRpc3BsYXkgb2JqZWN0IHJlbGF0aXZlXG5cdCAqICAgICAgICAgdG8gdGhlIDxjb2RlPnRhcmdldENvb3JkaW5hdGVTcGFjZTwvY29kZT4gb2JqZWN0J3MgY29vcmRpbmF0ZVxuXHQgKiAgICAgICAgIHN5c3RlbS5cblx0ICovXG5cdHB1YmxpYyBnZXRSZWN0KHRhcmdldENvb3JkaW5hdGVTcGFjZTpEaXNwbGF5T2JqZWN0ID0gbnVsbCk6UmVjdGFuZ2xlXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fYm91bmRzOyAvL1RPRE9cblx0fVxuXG5cdHB1YmxpYyBnZXRCb3godGFyZ2V0Q29vcmRpbmF0ZVNwYWNlOkRpc3BsYXlPYmplY3QgPSBudWxsKTpCb3hcblx0e1xuXHRcdGlmICh0aGlzLl9pU291cmNlUHJlZmFiKVxuXHRcdFx0dGhpcy5faVNvdXJjZVByZWZhYi5faVZhbGlkYXRlKCk7XG5cblx0XHQvL1RPRE8gdGFyZ2V0Q29vcmRpbmF0ZVNwYWNlXG5cdFx0aWYgKHRoaXMuX2JveEJvdW5kc0ludmFsaWQpIHtcblx0XHRcdHRoaXMuX3BVcGRhdGVCb3hCb3VuZHMoKTtcblxuXHRcdFx0aWYgKHRoaXMuX3dpZHRoICE9IG51bGwpIHtcblx0XHRcdFx0dGhpcy5fcFNjYWxlWCA9IHRoaXMuX3dpZHRoL3RoaXMuX3BCb3hCb3VuZHMud2lkdGg7XG5cdFx0XHRcdHRoaXMuaW52YWxpZGF0ZVNjYWxlKCk7XG5cdFx0XHR9XG5cblxuXHRcdFx0aWYgKHRoaXMuX2hlaWdodCAhPSBudWxsKSB7XG5cdFx0XHRcdHRoaXMuX3BTY2FsZVkgPSB0aGlzLl9oZWlnaHQvdGhpcy5fcEJveEJvdW5kcy5oZWlnaHQ7XG5cdFx0XHRcdHRoaXMuaW52YWxpZGF0ZVNjYWxlKCk7XG5cdFx0XHR9XG5cblxuXHRcdFx0aWYgKHRoaXMuX2RlcHRoICE9IG51bGwpIHtcblx0XHRcdFx0dGhpcy5fcFNjYWxlWiA9IHRoaXMuX2RlcHRoL3RoaXMuX3BCb3hCb3VuZHMuZGVwdGg7XG5cdFx0XHRcdHRoaXMuaW52YWxpZGF0ZVNjYWxlKCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cblx0XHRyZXR1cm4gdGhpcy5fcEJveEJvdW5kcztcblx0fVxuXG5cdHB1YmxpYyBnZXRTcGhlcmUodGFyZ2V0Q29vcmRpbmF0ZVNwYWNlOkRpc3BsYXlPYmplY3QgPSBudWxsKTpTcGhlcmVcblx0e1xuXHRcdGlmICh0aGlzLl9pU291cmNlUHJlZmFiKVxuXHRcdFx0dGhpcy5faVNvdXJjZVByZWZhYi5faVZhbGlkYXRlKCk7XG5cblx0XHRpZiAodGhpcy5fc3BoZXJlQm91bmRzSW52YWxpZCkge1xuXHRcdFx0dGhpcy5fcFVwZGF0ZVNwaGVyZUJvdW5kcygpO1xuXHRcdH1cblxuXG5cdFx0cmV0dXJuIHRoaXMuX3BTcGhlcmVCb3VuZHM7XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydHMgdGhlIDxjb2RlPnBvaW50PC9jb2RlPiBvYmplY3QgZnJvbSB0aGUgU2NlbmUoZ2xvYmFsKSBjb29yZGluYXRlc1xuXHQgKiB0byB0aGUgZGlzcGxheSBvYmplY3Qncyhsb2NhbCkgY29vcmRpbmF0ZXMuXG5cdCAqXG5cdCAqIDxwPlRvIHVzZSB0aGlzIG1ldGhvZCwgZmlyc3QgY3JlYXRlIGFuIGluc3RhbmNlIG9mIHRoZSBQb2ludCBjbGFzcy4gVGhlXG5cdCAqIDxpPng8L2k+IGFuZCA8aT55PC9pPiB2YWx1ZXMgdGhhdCB5b3UgYXNzaWduIHJlcHJlc2VudCBnbG9iYWwgY29vcmRpbmF0ZXNcblx0ICogYmVjYXVzZSB0aGV5IHJlbGF0ZSB0byB0aGUgb3JpZ2luKDAsMCkgb2YgdGhlIG1haW4gZGlzcGxheSBhcmVhLiBUaGVuXG5cdCAqIHBhc3MgdGhlIFBvaW50IGluc3RhbmNlIGFzIHRoZSBwYXJhbWV0ZXIgdG8gdGhlXG5cdCAqIDxjb2RlPmdsb2JhbFRvTG9jYWwoKTwvY29kZT4gbWV0aG9kLiBUaGUgbWV0aG9kIHJldHVybnMgYSBuZXcgUG9pbnQgb2JqZWN0XG5cdCAqIHdpdGggPGk+eDwvaT4gYW5kIDxpPnk8L2k+IHZhbHVlcyB0aGF0IHJlbGF0ZSB0byB0aGUgb3JpZ2luIG9mIHRoZSBkaXNwbGF5XG5cdCAqIG9iamVjdCBpbnN0ZWFkIG9mIHRoZSBvcmlnaW4gb2YgdGhlIFNjZW5lLjwvcD5cblx0ICpcblx0ICogQHBhcmFtIHBvaW50IEFuIG9iamVjdCBjcmVhdGVkIHdpdGggdGhlIFBvaW50IGNsYXNzLiBUaGUgUG9pbnQgb2JqZWN0XG5cdCAqICAgICAgICAgICAgICBzcGVjaWZpZXMgdGhlIDxpPng8L2k+IGFuZCA8aT55PC9pPiBjb29yZGluYXRlcyBhc1xuXHQgKiAgICAgICAgICAgICAgcHJvcGVydGllcy5cblx0ICogQHJldHVybiBBIFBvaW50IG9iamVjdCB3aXRoIGNvb3JkaW5hdGVzIHJlbGF0aXZlIHRvIHRoZSBkaXNwbGF5IG9iamVjdC5cblx0ICovXG5cdHB1YmxpYyBnbG9iYWxUb0xvY2FsKHBvaW50OlBvaW50KTpQb2ludFxuXHR7XG5cdFx0cmV0dXJuIHBvaW50OyAvL1RPRE9cblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBhIHR3by1kaW1lbnNpb25hbCBwb2ludCBmcm9tIHRoZSBTY2VuZShnbG9iYWwpIGNvb3JkaW5hdGVzIHRvIGFcblx0ICogdGhyZWUtZGltZW5zaW9uYWwgZGlzcGxheSBvYmplY3Qncyhsb2NhbCkgY29vcmRpbmF0ZXMuXG5cdCAqXG5cdCAqIDxwPlRvIHVzZSB0aGlzIG1ldGhvZCwgZmlyc3QgY3JlYXRlIGFuIGluc3RhbmNlIG9mIHRoZSBWZWN0b3IzRCBjbGFzcy4gVGhlIHgsXG5cdCAqIHkgYW5kIHogdmFsdWVzIHRoYXQgeW91IGFzc2lnbiB0byB0aGUgVmVjdG9yM0Qgb2JqZWN0IHJlcHJlc2VudCBnbG9iYWxcblx0ICogY29vcmRpbmF0ZXMgYmVjYXVzZSB0aGV5IGFyZSByZWxhdGl2ZSB0byB0aGUgb3JpZ2luKDAsMCwwKSBvZiB0aGUgc2NlbmUuIFRoZW5cblx0ICogcGFzcyB0aGUgVmVjdG9yM0Qgb2JqZWN0IHRvIHRoZSA8Y29kZT5nbG9iYWxUb0xvY2FsM0QoKTwvY29kZT4gbWV0aG9kIGFzIHRoZVxuXHQgKiA8Y29kZT5wb3NpdGlvbjwvY29kZT4gcGFyYW1ldGVyLlxuXHQgKiBUaGUgbWV0aG9kIHJldHVybnMgdGhyZWUtZGltZW5zaW9uYWwgY29vcmRpbmF0ZXMgYXMgYSBWZWN0b3IzRCBvYmplY3Rcblx0ICogY29udGFpbmluZyA8Y29kZT54PC9jb2RlPiwgPGNvZGU+eTwvY29kZT4sIGFuZCA8Y29kZT56PC9jb2RlPiB2YWx1ZXMgdGhhdFxuXHQgKiBhcmUgcmVsYXRpdmUgdG8gdGhlIG9yaWdpbiBvZiB0aGUgdGhyZWUtZGltZW5zaW9uYWwgZGlzcGxheSBvYmplY3QuPC9wPlxuXHQgKlxuXHQgKiBAcGFyYW0gcG9pbnQgQSBWZWN0b3IzRCBvYmplY3QgcmVwcmVzZW50aW5nIGdsb2JhbCB4LCB5IGFuZCB6IGNvb3JkaW5hdGVzIGluXG5cdCAqICAgICAgICAgICAgICB0aGUgc2NlbmUuXG5cdCAqIEByZXR1cm4gQSBWZWN0b3IzRCBvYmplY3Qgd2l0aCBjb29yZGluYXRlcyByZWxhdGl2ZSB0byB0aGUgdGhyZWUtZGltZW5zaW9uYWxcblx0ICogICAgICAgICBkaXNwbGF5IG9iamVjdC5cblx0ICovXG5cdHB1YmxpYyBnbG9iYWxUb0xvY2FsM0QocG9zaXRpb246VmVjdG9yM0QpOlZlY3RvcjNEXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pbnZlcnNlU2NlbmVUcmFuc2Zvcm0udHJhbnNmb3JtVmVjdG9yKHBvc2l0aW9uKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBFdmFsdWF0ZXMgdGhlIGJvdW5kaW5nIGJveCBvZiB0aGUgZGlzcGxheSBvYmplY3QgdG8gc2VlIGlmIGl0IG92ZXJsYXBzIG9yXG5cdCAqIGludGVyc2VjdHMgd2l0aCB0aGUgYm91bmRpbmcgYm94IG9mIHRoZSA8Y29kZT5vYmo8L2NvZGU+IGRpc3BsYXkgb2JqZWN0LlxuXHQgKlxuXHQgKiBAcGFyYW0gb2JqIFRoZSBkaXNwbGF5IG9iamVjdCB0byB0ZXN0IGFnYWluc3QuXG5cdCAqIEByZXR1cm4gPGNvZGU+dHJ1ZTwvY29kZT4gaWYgdGhlIGJvdW5kaW5nIGJveGVzIG9mIHRoZSBkaXNwbGF5IG9iamVjdHNcblx0ICogICAgICAgICBpbnRlcnNlY3Q7IDxjb2RlPmZhbHNlPC9jb2RlPiBpZiBub3QuXG5cdCAqL1xuXHRwdWJsaWMgaGl0VGVzdE9iamVjdChvYmo6RGlzcGxheU9iamVjdCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIGZhbHNlOyAvL1RPRE9cblx0fVxuXG5cdC8qKlxuXHQgKiBFdmFsdWF0ZXMgdGhlIGRpc3BsYXkgb2JqZWN0IHRvIHNlZSBpZiBpdCBvdmVybGFwcyBvciBpbnRlcnNlY3RzIHdpdGggdGhlXG5cdCAqIHBvaW50IHNwZWNpZmllZCBieSB0aGUgPGNvZGU+eDwvY29kZT4gYW5kIDxjb2RlPnk8L2NvZGU+IHBhcmFtZXRlcnMuIFRoZVxuXHQgKiA8Y29kZT54PC9jb2RlPiBhbmQgPGNvZGU+eTwvY29kZT4gcGFyYW1ldGVycyBzcGVjaWZ5IGEgcG9pbnQgaW4gdGhlXG5cdCAqIGNvb3JkaW5hdGUgc3BhY2Ugb2YgdGhlIFNjZW5lLCBub3QgdGhlIGRpc3BsYXkgb2JqZWN0IGNvbnRhaW5lciB0aGF0XG5cdCAqIGNvbnRhaW5zIHRoZSBkaXNwbGF5IG9iamVjdCh1bmxlc3MgdGhhdCBkaXNwbGF5IG9iamVjdCBjb250YWluZXIgaXMgdGhlXG5cdCAqIFNjZW5lKS5cblx0ICpcblx0ICogQHBhcmFtIHggICAgICAgICBUaGUgPGk+eDwvaT4gY29vcmRpbmF0ZSB0byB0ZXN0IGFnYWluc3QgdGhpcyBvYmplY3QuXG5cdCAqIEBwYXJhbSB5ICAgICAgICAgVGhlIDxpPnk8L2k+IGNvb3JkaW5hdGUgdG8gdGVzdCBhZ2FpbnN0IHRoaXMgb2JqZWN0LlxuXHQgKiBAcGFyYW0gc2hhcGVGbGFnIFdoZXRoZXIgdG8gY2hlY2sgYWdhaW5zdCB0aGUgYWN0dWFsIHBpeGVscyBvZiB0aGUgb2JqZWN0XG5cdCAqICAgICAgICAgICAgICAgICAoPGNvZGU+dHJ1ZTwvY29kZT4pIG9yIHRoZSBib3VuZGluZyBib3hcblx0ICogICAgICAgICAgICAgICAgICg8Y29kZT5mYWxzZTwvY29kZT4pLlxuXHQgKiBAcmV0dXJuIDxjb2RlPnRydWU8L2NvZGU+IGlmIHRoZSBkaXNwbGF5IG9iamVjdCBvdmVybGFwcyBvciBpbnRlcnNlY3RzXG5cdCAqICAgICAgICAgd2l0aCB0aGUgc3BlY2lmaWVkIHBvaW50OyA8Y29kZT5mYWxzZTwvY29kZT4gb3RoZXJ3aXNlLlxuXHQgKi9cblx0cHVibGljIGhpdFRlc3RQb2ludCh4Om51bWJlciwgeTpudW1iZXIsIHNoYXBlRmxhZzpib29sZWFuID0gZmFsc2UpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiBmYWxzZTsgLy9UT0RPXG5cdH1cblxuXHQvKipcblx0ICogUm90YXRlcyB0aGUgM2Qgb2JqZWN0IGFyb3VuZCB0byBmYWNlIGEgcG9pbnQgZGVmaW5lZCByZWxhdGl2ZSB0byB0aGUgbG9jYWwgY29vcmRpbmF0ZXMgb2YgdGhlIHBhcmVudCA8Y29kZT5PYmplY3RDb250YWluZXIzRDwvY29kZT4uXG5cdCAqXG5cdCAqIEBwYXJhbSAgICB0YXJnZXQgICAgICAgIFRoZSB2ZWN0b3IgZGVmaW5pbmcgdGhlIHBvaW50IHRvIGJlIGxvb2tlZCBhdFxuXHQgKiBAcGFyYW0gICAgdXBBeGlzICAgICAgICBBbiBvcHRpb25hbCB2ZWN0b3IgdXNlZCB0byBkZWZpbmUgdGhlIGRlc2lyZWQgdXAgb3JpZW50YXRpb24gb2YgdGhlIDNkIG9iamVjdCBhZnRlciByb3RhdGlvbiBoYXMgb2NjdXJyZWRcblx0ICovXG5cdHB1YmxpYyBsb29rQXQodGFyZ2V0OlZlY3RvcjNELCB1cEF4aXM6VmVjdG9yM0QgPSBudWxsKVxuXHR7XG5cblx0XHR2YXIgeUF4aXM6VmVjdG9yM0Q7XG5cdFx0dmFyIHpBeGlzOlZlY3RvcjNEO1xuXHRcdHZhciB4QXhpczpWZWN0b3IzRDtcblx0XHR2YXIgcmF3OkFycmF5PG51bWJlcj47XG5cblx0XHRpZiAodXBBeGlzID09IG51bGwpXG5cdFx0XHR1cEF4aXMgPSBWZWN0b3IzRC5ZX0FYSVM7XG5cdFx0ZWxzZVxuXHRcdFx0dXBBeGlzLm5vcm1hbGl6ZSgpO1xuXG5cdFx0ekF4aXMgPSB0YXJnZXQuc3VidHJhY3QodGhpcy5faU1hdHJpeDNELnBvc2l0aW9uKTtcblx0XHR6QXhpcy5ub3JtYWxpemUoKTtcblxuXHRcdHhBeGlzID0gdXBBeGlzLmNyb3NzUHJvZHVjdCh6QXhpcyk7XG5cdFx0eEF4aXMubm9ybWFsaXplKCk7XG5cblx0XHRpZiAoeEF4aXMubGVuZ3RoIDwgMC4wNSkge1xuXHRcdFx0eEF4aXMueCA9IHVwQXhpcy55O1xuXHRcdFx0eEF4aXMueSA9IHVwQXhpcy54O1xuXHRcdFx0eEF4aXMueiA9IDA7XG5cdFx0XHR4QXhpcy5ub3JtYWxpemUoKTtcblx0XHR9XG5cblx0XHR5QXhpcyA9IHpBeGlzLmNyb3NzUHJvZHVjdCh4QXhpcyk7XG5cblx0XHRyYXcgPSBNYXRyaXgzRFV0aWxzLlJBV19EQVRBX0NPTlRBSU5FUjtcblxuXHRcdHJhd1swXSA9IHhBeGlzLng7XG5cdFx0cmF3WzFdID0geEF4aXMueTtcblx0XHRyYXdbMl0gPSB4QXhpcy56O1xuXHRcdHJhd1szXSA9IDA7XG5cblx0XHRyYXdbNF0gPSB5QXhpcy54O1xuXHRcdHJhd1s1XSA9IHlBeGlzLnk7XG5cdFx0cmF3WzZdID0geUF4aXMuejtcblx0XHRyYXdbN10gPSAwO1xuXG5cdFx0cmF3WzhdID0gekF4aXMueDtcblx0XHRyYXdbOV0gPSB6QXhpcy55O1xuXHRcdHJhd1sxMF0gPSB6QXhpcy56O1xuXHRcdHJhd1sxMV0gPSAwO1xuXG5cdFx0dmFyIG06TWF0cml4M0QgPSBuZXcgTWF0cml4M0QoKTtcblx0XHRtLmNvcHlSYXdEYXRhRnJvbShyYXcpO1xuXG5cdFx0dmFyIHZlYzpWZWN0b3IzRCA9IG0uZGVjb21wb3NlKClbMV07XG5cblx0XHR0aGlzLl9yb3RhdGlvblggPSB2ZWMueDtcblx0XHR0aGlzLl9yb3RhdGlvblkgPSB2ZWMueTtcblx0XHR0aGlzLl9yb3RhdGlvblogPSB2ZWMuejtcblxuXHRcdHRoaXMuaW52YWxpZGF0ZVJvdGF0aW9uKCk7XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydHMgdGhlIDxjb2RlPnBvaW50PC9jb2RlPiBvYmplY3QgZnJvbSB0aGUgZGlzcGxheSBvYmplY3Qncyhsb2NhbClcblx0ICogY29vcmRpbmF0ZXMgdG8gdGhlIFNjZW5lKGdsb2JhbCkgY29vcmRpbmF0ZXMuXG5cdCAqXG5cdCAqIDxwPlRoaXMgbWV0aG9kIGFsbG93cyB5b3UgdG8gY29udmVydCBhbnkgZ2l2ZW4gPGk+eDwvaT4gYW5kIDxpPnk8L2k+XG5cdCAqIGNvb3JkaW5hdGVzIGZyb20gdmFsdWVzIHRoYXQgYXJlIHJlbGF0aXZlIHRvIHRoZSBvcmlnaW4oMCwwKSBvZiBhXG5cdCAqIHNwZWNpZmljIGRpc3BsYXkgb2JqZWN0KGxvY2FsIGNvb3JkaW5hdGVzKSB0byB2YWx1ZXMgdGhhdCBhcmUgcmVsYXRpdmUgdG9cblx0ICogdGhlIG9yaWdpbiBvZiB0aGUgU2NlbmUoZ2xvYmFsIGNvb3JkaW5hdGVzKS48L3A+XG5cdCAqXG5cdCAqIDxwPlRvIHVzZSB0aGlzIG1ldGhvZCwgZmlyc3QgY3JlYXRlIGFuIGluc3RhbmNlIG9mIHRoZSBQb2ludCBjbGFzcy4gVGhlXG5cdCAqIDxpPng8L2k+IGFuZCA8aT55PC9pPiB2YWx1ZXMgdGhhdCB5b3UgYXNzaWduIHJlcHJlc2VudCBsb2NhbCBjb29yZGluYXRlc1xuXHQgKiBiZWNhdXNlIHRoZXkgcmVsYXRlIHRvIHRoZSBvcmlnaW4gb2YgdGhlIGRpc3BsYXkgb2JqZWN0LjwvcD5cblx0ICpcblx0ICogPHA+WW91IHRoZW4gcGFzcyB0aGUgUG9pbnQgaW5zdGFuY2UgdGhhdCB5b3UgY3JlYXRlZCBhcyB0aGUgcGFyYW1ldGVyIHRvXG5cdCAqIHRoZSA8Y29kZT5sb2NhbFRvR2xvYmFsKCk8L2NvZGU+IG1ldGhvZC4gVGhlIG1ldGhvZCByZXR1cm5zIGEgbmV3IFBvaW50XG5cdCAqIG9iamVjdCB3aXRoIDxpPng8L2k+IGFuZCA8aT55PC9pPiB2YWx1ZXMgdGhhdCByZWxhdGUgdG8gdGhlIG9yaWdpbiBvZiB0aGVcblx0ICogU2NlbmUgaW5zdGVhZCBvZiB0aGUgb3JpZ2luIG9mIHRoZSBkaXNwbGF5IG9iamVjdC48L3A+XG5cdCAqXG5cdCAqIEBwYXJhbSBwb2ludCBUaGUgbmFtZSBvciBpZGVudGlmaWVyIG9mIGEgcG9pbnQgY3JlYXRlZCB3aXRoIHRoZSBQb2ludFxuXHQgKiAgICAgICAgICAgICAgY2xhc3MsIHNwZWNpZnlpbmcgdGhlIDxpPng8L2k+IGFuZCA8aT55PC9pPiBjb29yZGluYXRlcyBhc1xuXHQgKiAgICAgICAgICAgICAgcHJvcGVydGllcy5cblx0ICogQHJldHVybiBBIFBvaW50IG9iamVjdCB3aXRoIGNvb3JkaW5hdGVzIHJlbGF0aXZlIHRvIHRoZSBTY2VuZS5cblx0ICovXG5cdHB1YmxpYyBsb2NhbFRvR2xvYmFsKHBvaW50OlBvaW50KTpQb2ludFxuXHR7XG5cdFx0cmV0dXJuIG5ldyBQb2ludCgpOyAvL1RPRE9cblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBhIHRocmVlLWRpbWVuc2lvbmFsIHBvaW50IG9mIHRoZSB0aHJlZS1kaW1lbnNpb25hbCBkaXNwbGF5XG5cdCAqIG9iamVjdCdzKGxvY2FsKSBjb29yZGluYXRlcyB0byBhIHRocmVlLWRpbWVuc2lvbmFsIHBvaW50IGluIHRoZSBTY2VuZVxuXHQgKiAoZ2xvYmFsKSBjb29yZGluYXRlcy5cblx0ICpcblx0ICogPHA+VGhpcyBtZXRob2QgYWxsb3dzIHlvdSB0byBjb252ZXJ0IGFueSBnaXZlbiA8aT54PC9pPiwgPGk+eTwvaT4gYW5kXG5cdCAqIDxpPno8L2k+IGNvb3JkaW5hdGVzIGZyb20gdmFsdWVzIHRoYXQgYXJlIHJlbGF0aXZlIHRvIHRoZSBvcmlnaW4oMCwwLDApIG9mXG5cdCAqIGEgc3BlY2lmaWMgZGlzcGxheSBvYmplY3QobG9jYWwgY29vcmRpbmF0ZXMpIHRvIHZhbHVlcyB0aGF0IGFyZSByZWxhdGl2ZSB0b1xuXHQgKiB0aGUgb3JpZ2luIG9mIHRoZSBTY2VuZShnbG9iYWwgY29vcmRpbmF0ZXMpLjwvcD5cblx0ICpcblx0ICogPHA+VG8gdXNlIHRoaXMgbWV0aG9kLCBmaXJzdCBjcmVhdGUgYW4gaW5zdGFuY2Ugb2YgdGhlIFBvaW50IGNsYXNzLiBUaGVcblx0ICogPGk+eDwvaT4gYW5kIDxpPnk8L2k+IHZhbHVlcyB0aGF0IHlvdSBhc3NpZ24gcmVwcmVzZW50IGxvY2FsIGNvb3JkaW5hdGVzXG5cdCAqIGJlY2F1c2UgdGhleSByZWxhdGUgdG8gdGhlIG9yaWdpbiBvZiB0aGUgZGlzcGxheSBvYmplY3QuPC9wPlxuXHQgKlxuXHQgKiA8cD5Zb3UgdGhlbiBwYXNzIHRoZSBWZWN0b3IzRCBpbnN0YW5jZSB0aGF0IHlvdSBjcmVhdGVkIGFzIHRoZSBwYXJhbWV0ZXIgdG9cblx0ICogdGhlIDxjb2RlPmxvY2FsVG9HbG9iYWwzRCgpPC9jb2RlPiBtZXRob2QuIFRoZSBtZXRob2QgcmV0dXJucyBhIG5ld1xuXHQgKiBWZWN0b3IzRCBvYmplY3Qgd2l0aCA8aT54PC9pPiwgPGk+eTwvaT4gYW5kIDxpPno8L2k+IHZhbHVlcyB0aGF0IHJlbGF0ZSB0b1xuXHQgKiB0aGUgb3JpZ2luIG9mIHRoZSBTY2VuZSBpbnN0ZWFkIG9mIHRoZSBvcmlnaW4gb2YgdGhlIGRpc3BsYXkgb2JqZWN0LjwvcD5cblx0ICpcblx0ICogQHBhcmFtIHBvc2l0aW9uIEEgVmVjdG9yM0Qgb2JqZWN0IGNvbnRhaW5pbmcgZWl0aGVyIGEgdGhyZWUtZGltZW5zaW9uYWxcblx0ICogICAgICAgICAgICAgICAgcG9zaXRpb24gb3IgdGhlIGNvb3JkaW5hdGVzIG9mIHRoZSB0aHJlZS1kaW1lbnNpb25hbFxuXHQgKiAgICAgICAgICAgICAgICBkaXNwbGF5IG9iamVjdC5cblx0ICogQHJldHVybiBBIFZlY3RvcjNEIG9iamVjdCByZXByZXNlbnRpbmcgYSB0aHJlZS1kaW1lbnNpb25hbCBwb3NpdGlvbiBpblxuXHQgKiAgICAgICAgIHRoZSBTY2VuZS5cblx0ICovXG5cdHB1YmxpYyBsb2NhbFRvR2xvYmFsM0QocG9zaXRpb246VmVjdG9yM0QpOlZlY3RvcjNEXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5zY2VuZVRyYW5zZm9ybS50cmFuc2Zvcm1WZWN0b3IocG9zaXRpb24pO1xuXHR9XG5cblx0LyoqXG5cdCAqIE1vdmVzIHRoZSAzZCBvYmplY3QgZGlyZWN0bHkgdG8gYSBwb2ludCBpbiBzcGFjZVxuXHQgKlxuXHQgKiBAcGFyYW0gICAgZHggICAgICAgIFRoZSBhbW91bnQgb2YgbW92ZW1lbnQgYWxvbmcgdGhlIGxvY2FsIHggYXhpcy5cblx0ICogQHBhcmFtICAgIGR5ICAgICAgICBUaGUgYW1vdW50IG9mIG1vdmVtZW50IGFsb25nIHRoZSBsb2NhbCB5IGF4aXMuXG5cdCAqIEBwYXJhbSAgICBkeiAgICAgICAgVGhlIGFtb3VudCBvZiBtb3ZlbWVudCBhbG9uZyB0aGUgbG9jYWwgeiBheGlzLlxuXHQgKi9cblxuXHRwdWJsaWMgbW92ZVRvKGR4Om51bWJlciwgZHk6bnVtYmVyLCBkejpudW1iZXIpXG5cdHtcblx0XHRpZiAodGhpcy5feCA9PSBkeCAmJiB0aGlzLl95ID09IGR5ICYmIHRoaXMuX3ogPT0gZHopXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl94ID0gZHg7XG5cdFx0dGhpcy5feSA9IGR5O1xuXHRcdHRoaXMuX3ogPSBkejtcblxuXHRcdHRoaXMuaW52YWxpZGF0ZVBvc2l0aW9uKCk7XG5cdH1cblxuXHQvKipcblx0ICogTW92ZXMgdGhlIGxvY2FsIHBvaW50IGFyb3VuZCB3aGljaCB0aGUgb2JqZWN0IHJvdGF0ZXMuXG5cdCAqXG5cdCAqIEBwYXJhbSAgICBkeCAgICAgICAgVGhlIGFtb3VudCBvZiBtb3ZlbWVudCBhbG9uZyB0aGUgbG9jYWwgeCBheGlzLlxuXHQgKiBAcGFyYW0gICAgZHkgICAgICAgIFRoZSBhbW91bnQgb2YgbW92ZW1lbnQgYWxvbmcgdGhlIGxvY2FsIHkgYXhpcy5cblx0ICogQHBhcmFtICAgIGR6ICAgICAgICBUaGUgYW1vdW50IG9mIG1vdmVtZW50IGFsb25nIHRoZSBsb2NhbCB6IGF4aXMuXG5cdCAqL1xuXHRwdWJsaWMgbW92ZVBpdm90KGR4Om51bWJlciwgZHk6bnVtYmVyLCBkejpudW1iZXIpXG5cdHtcblx0XHRpZiAodGhpcy5fcGl2b3QgPT0gbnVsbClcblx0XHRcdHRoaXMuX3Bpdm90ID0gbmV3IFZlY3RvcjNEKCk7XG5cblx0XHR0aGlzLl9waXZvdC54ICs9IGR4O1xuXHRcdHRoaXMuX3Bpdm90LnkgKz0gZHk7XG5cdFx0dGhpcy5fcGl2b3QueiArPSBkejtcblxuXHRcdHRoaXMuaW52YWxpZGF0ZVBpdm90KCk7XG5cdH1cblxuXHQvKipcblx0ICogUm90YXRlcyB0aGUgM2Qgb2JqZWN0IGFyb3VuZCBpdCdzIGxvY2FsIHgtYXhpc1xuXHQgKlxuXHQgKiBAcGFyYW0gICAgYW5nbGUgICAgICAgIFRoZSBhbW91bnQgb2Ygcm90YXRpb24gaW4gZGVncmVlc1xuXHQgKi9cblx0cHVibGljIHBpdGNoKGFuZ2xlOm51bWJlcilcblx0e1xuXHRcdHRoaXMucm90YXRlKFZlY3RvcjNELlhfQVhJUywgYW5nbGUpO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0UmVuZGVyU2NlbmVUcmFuc2Zvcm0oY2FtZXJhOkNhbWVyYSk6TWF0cml4M0Rcblx0e1xuXHRcdGlmICh0aGlzLm9yaWVudGF0aW9uTW9kZSA9PSBPcmllbnRhdGlvbk1vZGUuQ0FNRVJBX1BMQU5FKSB7XG5cdFx0XHR2YXIgY29tcHM6QXJyYXk8VmVjdG9yM0Q+ID0gY2FtZXJhLnNjZW5lVHJhbnNmb3JtLmRlY29tcG9zZSgpO1xuXHRcdFx0dmFyIHNjYWxlOlZlY3RvcjNEID0gY29tcHNbMl07XG5cdFx0XHRjb21wc1swXSA9IHRoaXMuc2NlbmVQb3NpdGlvbjtcblx0XHRcdHNjYWxlLnggPSB0aGlzLl9wU2NhbGVYO1xuXHRcdFx0c2NhbGUueSA9IHRoaXMuX3BTY2FsZVk7XG5cdFx0XHRzY2FsZS56ID0gdGhpcy5fcFNjYWxlWjtcblx0XHRcdHRoaXMuX29yaWVudGF0aW9uTWF0cml4LnJlY29tcG9zZShjb21wcyk7XG5cblx0XHRcdC8vYWRkIGluIGNhc2Ugb2YgcGl2b3Rcblx0XHRcdGlmICghdGhpcy5fcGl2b3RaZXJvICYmIHRoaXMuYWxpZ25tZW50TW9kZSA9PSBBbGlnbm1lbnRNb2RlLlBJVk9UX1BPSU5UKVxuXHRcdFx0XHR0aGlzLl9vcmllbnRhdGlvbk1hdHJpeC5wcmVwZW5kVHJhbnNsYXRpb24oLXRoaXMuX3Bpdm90LngvdGhpcy5fcFNjYWxlWCwgLXRoaXMuX3Bpdm90LnkvdGhpcy5fcFNjYWxlWSwgLXRoaXMuX3Bpdm90LnovdGhpcy5fcFNjYWxlWik7XG5cblx0XHRcdHJldHVybiB0aGlzLl9vcmllbnRhdGlvbk1hdHJpeDtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5zY2VuZVRyYW5zZm9ybTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSb3RhdGVzIHRoZSAzZCBvYmplY3QgYXJvdW5kIGl0J3MgbG9jYWwgei1heGlzXG5cdCAqXG5cdCAqIEBwYXJhbSAgICBhbmdsZSAgICAgICAgVGhlIGFtb3VudCBvZiByb3RhdGlvbiBpbiBkZWdyZWVzXG5cdCAqL1xuXHRwdWJsaWMgcm9sbChhbmdsZTpudW1iZXIpXG5cdHtcblx0XHR0aGlzLnJvdGF0ZShWZWN0b3IzRC5aX0FYSVMsIGFuZ2xlKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSb3RhdGVzIHRoZSAzZCBvYmplY3QgYXJvdW5kIGFuIGF4aXMgYnkgYSBkZWZpbmVkIGFuZ2xlXG5cdCAqXG5cdCAqIEBwYXJhbSAgICBheGlzICAgICAgICBUaGUgdmVjdG9yIGRlZmluaW5nIHRoZSBheGlzIG9mIHJvdGF0aW9uXG5cdCAqIEBwYXJhbSAgICBhbmdsZSAgICAgICAgVGhlIGFtb3VudCBvZiByb3RhdGlvbiBpbiBkZWdyZWVzXG5cdCAqL1xuXHRwdWJsaWMgcm90YXRlKGF4aXM6VmVjdG9yM0QsIGFuZ2xlOm51bWJlcilcblx0e1xuXHRcdHZhciBtOk1hdHJpeDNEID0gbmV3IE1hdHJpeDNEKCk7XG5cdFx0bS5wcmVwZW5kUm90YXRpb24oYW5nbGUsIGF4aXMpO1xuXG5cdFx0dmFyIHZlYzpWZWN0b3IzRCA9IG0uZGVjb21wb3NlKClbMV07XG5cblx0XHR0aGlzLl9yb3RhdGlvblggKz0gdmVjLng7XG5cdFx0dGhpcy5fcm90YXRpb25ZICs9IHZlYy55O1xuXHRcdHRoaXMuX3JvdGF0aW9uWiArPSB2ZWMuejtcblxuXHRcdHRoaXMuaW52YWxpZGF0ZVJvdGF0aW9uKCk7XG5cdH1cblxuXHQvKipcblx0ICogUm90YXRlcyB0aGUgM2Qgb2JqZWN0IGRpcmVjdGx5IHRvIGEgZXVsZXIgYW5nbGVcblx0ICpcblx0ICogQHBhcmFtICAgIGF4ICAgICAgICBUaGUgYW5nbGUgaW4gZGVncmVlcyBvZiB0aGUgcm90YXRpb24gYXJvdW5kIHRoZSB4IGF4aXMuXG5cdCAqIEBwYXJhbSAgICBheSAgICAgICAgVGhlIGFuZ2xlIGluIGRlZ3JlZXMgb2YgdGhlIHJvdGF0aW9uIGFyb3VuZCB0aGUgeSBheGlzLlxuXHQgKiBAcGFyYW0gICAgYXogICAgICAgIFRoZSBhbmdsZSBpbiBkZWdyZWVzIG9mIHRoZSByb3RhdGlvbiBhcm91bmQgdGhlIHogYXhpcy5cblx0ICovXG5cdHB1YmxpYyByb3RhdGVUbyhheDpudW1iZXIsIGF5Om51bWJlciwgYXo6bnVtYmVyKVxuXHR7XG5cdFx0dGhpcy5fcm90YXRpb25YID0gYXgqTWF0aENvbnN0cy5ERUdSRUVTX1RPX1JBRElBTlM7XG5cdFx0dGhpcy5fcm90YXRpb25ZID0gYXkqTWF0aENvbnN0cy5ERUdSRUVTX1RPX1JBRElBTlM7XG5cdFx0dGhpcy5fcm90YXRpb25aID0gYXoqTWF0aENvbnN0cy5ERUdSRUVTX1RPX1JBRElBTlM7XG5cblx0XHR0aGlzLmludmFsaWRhdGVSb3RhdGlvbigpO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgcmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlOnN0cmluZywgbGlzdGVuZXI6RnVuY3Rpb24pXG5cdHtcblx0XHRzdXBlci5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKTtcblxuXHRcdGlmICh0aGlzLmhhc0V2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0c3dpdGNoICh0eXBlKSB7XG5cdFx0XHRjYXNlIERpc3BsYXlPYmplY3RFdmVudC5QT1NJVElPTl9DSEFOR0VEOlxuXHRcdFx0XHR0aGlzLl9saXN0ZW5Ub1Bvc2l0aW9uQ2hhbmdlZCA9IGZhbHNlO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSBEaXNwbGF5T2JqZWN0RXZlbnQuUk9UQVRJT05fQ0hBTkdFRDpcblx0XHRcdFx0dGhpcy5fbGlzdGVuVG9Sb3RhdGlvbkNoYW5nZWQgPSBmYWxzZTtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgRGlzcGxheU9iamVjdEV2ZW50LlNDQUxFX0NIQU5HRUQ6XG5cdFx0XHRcdHRoaXMuX2xpc3RlblRvU2NhbGVDaGFuZ2VkID0gZmFsc2U7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBNb3ZlcyB0aGUgM2Qgb2JqZWN0IGFsb25nIGEgdmVjdG9yIGJ5IGEgZGVmaW5lZCBsZW5ndGhcblx0ICpcblx0ICogQHBhcmFtICAgIGF4aXMgICAgICAgIFRoZSB2ZWN0b3IgZGVmaW5pbmcgdGhlIGF4aXMgb2YgbW92ZW1lbnRcblx0ICogQHBhcmFtICAgIGRpc3RhbmNlICAgIFRoZSBsZW5ndGggb2YgdGhlIG1vdmVtZW50XG5cdCAqL1xuXHRwdWJsaWMgdHJhbnNsYXRlKGF4aXM6VmVjdG9yM0QsIGRpc3RhbmNlOm51bWJlcilcblx0e1xuXHRcdHZhciB4Om51bWJlciA9IGF4aXMueCwgeTpudW1iZXIgPSBheGlzLnksIHo6bnVtYmVyID0gYXhpcy56O1xuXHRcdHZhciBsZW46bnVtYmVyID0gZGlzdGFuY2UvTWF0aC5zcXJ0KHgqeCArIHkqeSArIHoqeik7XG5cblx0XHR0aGlzLl94ICs9IHgqbGVuO1xuXHRcdHRoaXMuX3kgKz0geSpsZW47XG5cdFx0dGhpcy5feiArPSB6KmxlbjtcblxuXHRcdHRoaXMuaW52YWxpZGF0ZVBvc2l0aW9uKCk7XG5cdH1cblxuXHQvKipcblx0ICogTW92ZXMgdGhlIDNkIG9iamVjdCBhbG9uZyBhIHZlY3RvciBieSBhIGRlZmluZWQgbGVuZ3RoXG5cdCAqXG5cdCAqIEBwYXJhbSAgICBheGlzICAgICAgICBUaGUgdmVjdG9yIGRlZmluaW5nIHRoZSBheGlzIG9mIG1vdmVtZW50XG5cdCAqIEBwYXJhbSAgICBkaXN0YW5jZSAgICBUaGUgbGVuZ3RoIG9mIHRoZSBtb3ZlbWVudFxuXHQgKi9cblx0cHVibGljIHRyYW5zbGF0ZUxvY2FsKGF4aXM6VmVjdG9yM0QsIGRpc3RhbmNlOm51bWJlcilcblx0e1xuXHRcdHZhciB4Om51bWJlciA9IGF4aXMueCwgeTpudW1iZXIgPSBheGlzLnksIHo6bnVtYmVyID0gYXhpcy56O1xuXHRcdHZhciBsZW46bnVtYmVyID0gZGlzdGFuY2UvTWF0aC5zcXJ0KHgqeCArIHkqeSArIHoqeik7XG5cblx0XHR0aGlzLl9pTWF0cml4M0QucHJlcGVuZFRyYW5zbGF0aW9uKHgqbGVuLCB5KmxlbiwgeipsZW4pO1xuXG5cdFx0dGhpcy5fbWF0cml4M0QuY29weUNvbHVtblRvKDMsIHRoaXMuX3Bvcyk7XG5cblx0XHR0aGlzLl94ID0gdGhpcy5fcG9zLng7XG5cdFx0dGhpcy5feSA9IHRoaXMuX3Bvcy55O1xuXHRcdHRoaXMuX3ogPSB0aGlzLl9wb3MuejtcblxuXHRcdHRoaXMuaW52YWxpZGF0ZVBvc2l0aW9uKCk7XG5cdH1cblxuXHQvKipcblx0ICogUm90YXRlcyB0aGUgM2Qgb2JqZWN0IGFyb3VuZCBpdCdzIGxvY2FsIHktYXhpc1xuXHQgKlxuXHQgKiBAcGFyYW0gICAgYW5nbGUgICAgICAgIFRoZSBhbW91bnQgb2Ygcm90YXRpb24gaW4gZGVncmVlc1xuXHQgKi9cblx0cHVibGljIHlhdyhhbmdsZTpudW1iZXIpXG5cdHtcblx0XHR0aGlzLnJvdGF0ZShWZWN0b3IzRC5ZX0FYSVMsIGFuZ2xlKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHB1YmxpYyBfaUNvbnRyb2xsZXI6Q29udHJvbGxlckJhc2U7XG5cblx0LyoqXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHVibGljIGdldCBfaUFzc2lnbmVkUGFydGl0aW9uKCk6UGFydGl0aW9uXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcEltcGxpY2l0UGFydGl0aW9uO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSB0cmFuc2Zvcm1hdGlvbiBvZiB0aGUgM2Qgb2JqZWN0LCByZWxhdGl2ZSB0byB0aGUgbG9jYWwgY29vcmRpbmF0ZXMgb2YgdGhlIHBhcmVudCA8Y29kZT5PYmplY3RDb250YWluZXIzRDwvY29kZT4uXG5cdCAqXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHVibGljIGdldCBfaU1hdHJpeDNEKCk6TWF0cml4M0Rcblx0e1xuXHRcdGlmICh0aGlzLl9tYXRyaXgzRERpcnR5KVxuXHRcdFx0dGhpcy5fcFVwZGF0ZU1hdHJpeDNEKCk7XG5cblx0XHRyZXR1cm4gdGhpcy5fbWF0cml4M0Q7XG5cdH1cblxuXHRwdWJsaWMgc2V0IF9pTWF0cml4M0QodmFsOk1hdHJpeDNEKVxuXHR7XG5cblx0XHQvLyBUT0RPOiBGcm9tIEFTMyAtIERvIHdlIHN0aWxsIG5lZWQgdGhpcyBpbiBKUyA/XG5cdFx0Ly9yaWRpY3Vsb3VzIG1hdHJpeCBlcnJvclxuXHRcdC8qXG5cdFx0aWYgKCF2YWwucmF3RGF0YVswXSkge1xuXG5cdFx0XHR2YXIgcmF3Om51bWJlcltdID0gTWF0cml4M0RVdGlscy5SQVdfREFUQV9DT05UQUlORVI7XG5cdFx0XHR2YWwuY29weVJhd0RhdGFUbyhyYXcpO1xuXHRcdFx0cmF3WzBdID0gdGhpcy5fc21hbGxlc3ROdW1iZXI7XG5cdFx0XHR2YWwuY29weVJhd0RhdGFGcm9tKHJhdyk7XG5cdFx0fVxuXHRcdC8vKi9cblx0XHR2YXIgZWxlbWVudHM6QXJyYXk8VmVjdG9yM0Q+ID0gdmFsLmRlY29tcG9zZSgpO1xuXHRcdHZhciB2ZWM6VmVjdG9yM0Q7XG5cblx0XHR2ZWMgPSBlbGVtZW50c1swXTtcblxuXHRcdGlmICh0aGlzLl94ICE9IHZlYy54IHx8IHRoaXMuX3kgIT0gdmVjLnkgfHwgdGhpcy5feiAhPSB2ZWMueikge1xuXHRcdFx0dGhpcy5feCA9IHZlYy54O1xuXHRcdFx0dGhpcy5feSA9IHZlYy55O1xuXHRcdFx0dGhpcy5feiA9IHZlYy56O1xuXG5cdFx0XHR0aGlzLmludmFsaWRhdGVQb3NpdGlvbigpO1xuXHRcdH1cblxuXHRcdHZlYyA9IGVsZW1lbnRzWzFdO1xuXG5cdFx0aWYgKHRoaXMuX3JvdGF0aW9uWCAhPSB2ZWMueCB8fCB0aGlzLl9yb3RhdGlvblkgIT0gdmVjLnkgfHwgdGhpcy5fcm90YXRpb25aICE9IHZlYy56KSB7XG5cdFx0XHR0aGlzLl9yb3RhdGlvblggPSB2ZWMueDtcblx0XHRcdHRoaXMuX3JvdGF0aW9uWSA9IHZlYy55O1xuXHRcdFx0dGhpcy5fcm90YXRpb25aID0gdmVjLno7XG5cblx0XHRcdHRoaXMuaW52YWxpZGF0ZVJvdGF0aW9uKCk7XG5cdFx0fVxuXG5cdFx0dmVjID0gZWxlbWVudHNbMl07XG5cblx0XHRpZiAodGhpcy5fcFNjYWxlWCAhPSB2ZWMueCB8fCB0aGlzLl9wU2NhbGVZICE9IHZlYy55IHx8IHRoaXMuX3BTY2FsZVogIT0gdmVjLnopIHtcblx0XHRcdHRoaXMuX3BTY2FsZVggPSB2ZWMueDtcblx0XHRcdHRoaXMuX3BTY2FsZVkgPSB2ZWMueTtcblx0XHRcdHRoaXMuX3BTY2FsZVogPSB2ZWMuejtcblxuXHRcdFx0dGhpcy5pbnZhbGlkYXRlU2NhbGUoKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IF9pUGlja2luZ0NvbGxpc2lvblZPKCk6UGlja2luZ0NvbGxpc2lvblZPXG5cdHtcblx0XHRpZiAoIXRoaXMuX3BQaWNraW5nQ29sbGlzaW9uVk8pXG5cdFx0XHR0aGlzLl9wUGlja2luZ0NvbGxpc2lvblZPID0gbmV3IFBpY2tpbmdDb2xsaXNpb25WTyh0aGlzKTtcblxuXHRcdHJldHVybiB0aGlzLl9wUGlja2luZ0NvbGxpc2lvblZPO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHVibGljIGlTZXRQYXJlbnQodmFsdWU6RGlzcGxheU9iamVjdENvbnRhaW5lcilcblx0e1xuXHRcdHRoaXMuX3BQYXJlbnQgPSB2YWx1ZTtcblxuXHRcdGlmICh2YWx1ZSkge1xuXHRcdFx0dGhpcy5fcFVwZGF0ZUltcGxpY2l0TW91c2VFbmFibGVkKHZhbHVlLm1vdXNlQ2hpbGRyZW4pO1xuXHRcdFx0dGhpcy5fcFVwZGF0ZUltcGxpY2l0VmlzaWJpbGl0eSh2YWx1ZS5faUlzVmlzaWJsZSgpKTtcblx0XHRcdHRoaXMuX3BVcGRhdGVJbXBsaWNpdFBhcnRpdGlvbih2YWx1ZS5faUFzc2lnbmVkUGFydGl0aW9uLCB2YWx1ZS5fcFNjZW5lKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5fcFVwZGF0ZUltcGxpY2l0TW91c2VFbmFibGVkKHRydWUpO1xuXHRcdFx0dGhpcy5fcFVwZGF0ZUltcGxpY2l0VmlzaWJpbGl0eSh0cnVlKTtcblx0XHRcdHRoaXMuX3BVcGRhdGVJbXBsaWNpdFBhcnRpdGlvbihudWxsLCBudWxsKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQHByb3RlY3RlZFxuXHQgKi9cblx0cHVibGljIHBJbnZhbGlkYXRlU2NlbmVUcmFuc2Zvcm0oKVxuXHR7XG5cdFx0dGhpcy5fcFNjZW5lVHJhbnNmb3JtRGlydHkgPSAhdGhpcy5fcElnbm9yZVRyYW5zZm9ybTtcblx0XHR0aGlzLl9pbnZlcnNlU2NlbmVUcmFuc2Zvcm1EaXJ0eSA9ICF0aGlzLl9wSWdub3JlVHJhbnNmb3JtO1xuXHRcdHRoaXMuX3NjZW5lUG9zaXRpb25EaXJ0eSA9ICF0aGlzLl9wSWdub3JlVHJhbnNmb3JtO1xuXG5cdFx0aWYgKHRoaXMuaXNFbnRpdHkpXG5cdFx0XHR0aGlzLmludmFsaWRhdGVQYXJ0aXRpb24oKTtcblxuXHRcdGlmICh0aGlzLl9saXN0ZW5Ub1NjZW5lVHJhbnNmb3JtQ2hhbmdlZClcblx0XHRcdHRoaXMubm90aWZ5U2NlbmVUcmFuc2Zvcm1DaGFuZ2UoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcHJvdGVjdGVkXG5cdCAqL1xuXHRwdWJsaWMgX3BVcGRhdGVJbXBsaWNpdE1vdXNlRW5hYmxlZCh2YWx1ZTpib29sZWFuKVxuXHR7XG5cdFx0dGhpcy5fcEltcGxpY2l0TW91c2VFbmFibGVkID0gdGhpcy5fZXhwbGljaXRNb3VzZUVuYWJsZWQgJiYgdmFsdWU7XG5cblx0XHQvLyBJZiB0aGVyZSBpcyBhIHBhcmVudCBhbmQgdGhpcyBjaGlsZCBkb2VzIG5vdCBoYXZlIGEgcGlja2luZyBjb2xsaWRlciwgdXNlIGl0cyBwYXJlbnQncyBwaWNraW5nIGNvbGxpZGVyLlxuXHRcdGlmICh0aGlzLl9wSW1wbGljaXRNb3VzZUVuYWJsZWQgJiYgdGhpcy5fcFBhcmVudCAmJiAhdGhpcy5fcFBpY2tpbmdDb2xsaWRlcilcblx0XHRcdHRoaXMuX3BQaWNraW5nQ29sbGlkZXIgPSAgdGhpcy5fcFBhcmVudC5fcFBpY2tpbmdDb2xsaWRlcjtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcHJvdGVjdGVkXG5cdCAqL1xuXHRwdWJsaWMgX3BVcGRhdGVJbXBsaWNpdFBhcnRpdGlvbihwYXJ0aXRpb246UGFydGl0aW9uLCBzY2VuZTpTY2VuZSlcblx0e1xuXHRcdHZhciBzY2VuZUNoYW5nZWQ6Ym9vbGVhbiA9IHRoaXMuX3BTY2VuZSAhPSBzY2VuZTtcblxuXHRcdGlmIChzY2VuZUNoYW5nZWQgJiYgdGhpcy5fcFNjZW5lKVxuXHRcdFx0dGhpcy5fcFNjZW5lLmRpc3BhdGNoRXZlbnQobmV3IFNjZW5lRXZlbnQoU2NlbmVFdmVudC5SRU1PVkVEX0ZST01fU0NFTkUsIHRoaXMpKTtcblxuXHRcdGlmICh0aGlzLl9wU2NlbmUgJiYgdGhpcy5fcEltcGxpY2l0UGFydGl0aW9uKSB7XG5cdFx0XHQvL3VucmVnaXN0ZXIgcGFydGl0aW9uIGZyb20gY3VycmVudCBzY2VuZVxuXHRcdFx0dGhpcy5fcFNjZW5lLl9pVW5yZWdpc3RlclBhcnRpdGlvbih0aGlzLl9wSW1wbGljaXRQYXJ0aXRpb24pO1xuXG5cdFx0XHQvL3VucmVnaXN0ZXIgZW50aXR5IGZyb20gY3VycmVudCBwYXJ0aXRpb25cblx0XHRcdGlmICh0aGlzLl9wSXNFbnRpdHkpXG5cdFx0XHRcdHRoaXMuX3BVbnJlZ2lzdGVyRW50aXR5KHRoaXMuX3BJbXBsaWNpdFBhcnRpdGlvbik7XG5cdFx0fVxuXG5cdFx0Ly8gYXNzaWduIHBhcmVudCBpbXBsaWNpdCBwYXJ0aXRpb24gaWYgbm8gZXhwbGljaXQgb25lIGlzIGdpdmVuXG5cdFx0dGhpcy5fcEltcGxpY2l0UGFydGl0aW9uID0gdGhpcy5fZXhwbGljaXRQYXJ0aXRpb24gfHwgcGFydGl0aW9uO1xuXG5cdFx0Ly9hc3NpZ24gc2NlbmVcblx0XHRpZiAoc2NlbmVDaGFuZ2VkKVxuXHRcdFx0dGhpcy5fcFNjZW5lID0gc2NlbmU7XG5cblx0XHRpZiAodGhpcy5fcFNjZW5lICYmIHRoaXMuX3BJbXBsaWNpdFBhcnRpdGlvbikge1xuXHRcdFx0Ly9yZWdpc3RlciBwYXJ0aXRpb24gd2l0aCBzY2VuZVxuXHRcdFx0dGhpcy5fcFNjZW5lLl9pUmVnaXN0ZXJQYXJ0aXRpb24odGhpcy5fcEltcGxpY2l0UGFydGl0aW9uKTtcblxuXHRcdFx0Ly9yZWdpc3RlciBlbnRpdHkgd2l0aCBuZXcgcGFydGl0aW9uXG5cdFx0XHRpZiAodGhpcy5fcElzRW50aXR5KVxuXHRcdFx0XHR0aGlzLl9wUmVnaXN0ZXJFbnRpdHkodGhpcy5fcEltcGxpY2l0UGFydGl0aW9uKTtcblx0XHR9XG5cblx0XHRpZiAoc2NlbmVDaGFuZ2VkICYmIHRoaXMuX3BTY2VuZSlcblx0XHRcdHRoaXMuX3BTY2VuZS5kaXNwYXRjaEV2ZW50KG5ldyBTY2VuZUV2ZW50KFNjZW5lRXZlbnQuQURERURfVE9fU0NFTkUsIHRoaXMpKTtcblxuXHRcdGlmIChzY2VuZUNoYW5nZWQpIHtcblx0XHRcdGlmICghdGhpcy5fcFNjZW5lVHJhbnNmb3JtRGlydHkgJiYgIXRoaXMuX3BJZ25vcmVUcmFuc2Zvcm0pXG5cdFx0XHRcdHRoaXMucEludmFsaWRhdGVTY2VuZVRyYW5zZm9ybSgpO1xuXG5cdFx0XHRpZiAodGhpcy5fbGlzdGVuVG9TY2VuZUNoYW5nZWQpXG5cdFx0XHRcdHRoaXMubm90aWZ5U2NlbmVDaGFuZ2UoKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQHByb3RlY3RlZFxuXHQgKi9cblx0cHVibGljIF9wVXBkYXRlSW1wbGljaXRWaXNpYmlsaXR5KHZhbHVlOmJvb2xlYW4pXG5cdHtcblx0XHR0aGlzLl9wSW1wbGljaXRWaXNpYmlsaXR5ID0gdGhpcy5fZXhwbGljaXRWaXNpYmlsaXR5ICYmIHZhbHVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwcm90ZWN0ZWRcblx0ICovXG5cdHB1YmxpYyBfcFVwZGF0ZU1hdHJpeDNEKClcblx0e1xuXG5cdFx0dGhpcy5fcG9zLnggPSB0aGlzLl94O1xuXHRcdHRoaXMuX3Bvcy55ID0gdGhpcy5feTtcblx0XHR0aGlzLl9wb3MueiA9IHRoaXMuX3o7XG5cblx0XHR0aGlzLl9yb3QueCA9IHRoaXMuX3JvdGF0aW9uWDtcblx0XHR0aGlzLl9yb3QueSA9IHRoaXMuX3JvdGF0aW9uWTtcblx0XHR0aGlzLl9yb3QueiA9IHRoaXMuX3JvdGF0aW9uWjtcblxuXHRcdHRoaXMuX3NjYS54ID0gdGhpcy5fcFNjYWxlWDtcblx0XHR0aGlzLl9zY2EueSA9IHRoaXMuX3BTY2FsZVk7XG5cdFx0dGhpcy5fc2NhLnogPSB0aGlzLl9wU2NhbGVaO1xuXG5cdFx0dGhpcy5fbWF0cml4M0QucmVjb21wb3NlKHRoaXMuX3RyYW5zZm9ybUNvbXBvbmVudHMpO1xuXG5cdFx0aWYgKCF0aGlzLl9waXZvdFplcm8pIHtcblx0XHRcdHRoaXMuX3Bpdm90U2NhbGUueCA9IHRoaXMuX3Bpdm90LngvdGhpcy5fcFNjYWxlWDtcblx0XHRcdHRoaXMuX3Bpdm90U2NhbGUueSA9IHRoaXMuX3Bpdm90LnkvdGhpcy5fcFNjYWxlWTtcblx0XHRcdHRoaXMuX3Bpdm90U2NhbGUueiA9IHRoaXMuX3Bpdm90LnovdGhpcy5fcFNjYWxlWjtcblx0XHRcdHRoaXMuX21hdHJpeDNELnByZXBlbmRUcmFuc2xhdGlvbigtdGhpcy5fcGl2b3RTY2FsZS54LCAtdGhpcy5fcGl2b3RTY2FsZS55LCAtdGhpcy5fcGl2b3RTY2FsZS56KTtcblx0XHRcdGlmICh0aGlzLmFsaWdubWVudE1vZGUgIT0gQWxpZ25tZW50TW9kZS5QSVZPVF9QT0lOVClcblx0XHRcdFx0dGhpcy5fbWF0cml4M0QuYXBwZW5kVHJhbnNsYXRpb24odGhpcy5fcGl2b3QueCwgdGhpcy5fcGl2b3QueSwgdGhpcy5fcGl2b3Queik7XG5cdFx0fVxuXG5cdFx0dGhpcy5fbWF0cml4M0REaXJ0eSA9IGZhbHNlO1xuXHRcdHRoaXMuX3Bvc2l0aW9uRGlydHkgPSBmYWxzZTtcblx0XHR0aGlzLl9yb3RhdGlvbkRpcnR5ID0gZmFsc2U7XG5cdFx0dGhpcy5fc2NhbGVEaXJ0eSA9IGZhbHNlO1xuXHRcdHRoaXMuX3Bpdm90RGlydHkgPSBmYWxzZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcHJvdGVjdGVkXG5cdCAqL1xuXHRwdWJsaWMgcFVwZGF0ZVNjZW5lVHJhbnNmb3JtKClcblx0e1xuXHRcdGlmICh0aGlzLl9wUGFyZW50ICYmICF0aGlzLl9wUGFyZW50Ll9pSXNSb290KSB7XG5cdFx0XHR0aGlzLl9wU2NlbmVUcmFuc2Zvcm0uY29weUZyb20odGhpcy5fcFBhcmVudC5zY2VuZVRyYW5zZm9ybSk7XG5cdFx0XHR0aGlzLl9wU2NlbmVUcmFuc2Zvcm0ucHJlcGVuZCh0aGlzLl9pTWF0cml4M0QpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9wU2NlbmVUcmFuc2Zvcm0uY29weUZyb20odGhpcy5faU1hdHJpeDNEKTtcblx0XHR9XG5cblx0XHR0aGlzLl9wU2NlbmVUcmFuc2Zvcm1EaXJ0eSA9IGZhbHNlO1xuXHR9XG5cblx0cHVibGljIF9pQWRkUmVuZGVyYWJsZShyZW5kZXJhYmxlOklSZW5kZXJhYmxlKTpJUmVuZGVyYWJsZVxuXHR7XG5cdFx0dGhpcy5fcFJlbmRlcmFibGVzLnB1c2gocmVuZGVyYWJsZSk7XG5cblx0XHRyZXR1cm4gcmVuZGVyYWJsZTtcblx0fVxuXG5cblx0cHVibGljIF9pUmVtb3ZlUmVuZGVyYWJsZShyZW5kZXJhYmxlOklSZW5kZXJhYmxlKTpJUmVuZGVyYWJsZVxuXHR7XG5cdFx0dmFyIGluZGV4Om51bWJlciA9IHRoaXMuX3BSZW5kZXJhYmxlcy5pbmRleE9mKHJlbmRlcmFibGUpO1xuXG5cdFx0dGhpcy5fcFJlbmRlcmFibGVzLnNwbGljZShpbmRleCwgMSk7XG5cblx0XHRyZXR1cm4gcmVuZGVyYWJsZTtcblx0fVxuXG5cdC8qKlxuXHQgKiAvL1RPRE9cblx0ICpcblx0ICogQHBhcmFtIHNob3J0ZXN0Q29sbGlzaW9uRGlzdGFuY2Vcblx0ICogQHBhcmFtIGZpbmRDbG9zZXN0XG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxuXHQgKlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHB1YmxpYyBfaVRlc3RDb2xsaXNpb24oc2hvcnRlc3RDb2xsaXNpb25EaXN0YW5jZTpudW1iZXIsIGZpbmRDbG9zZXN0OmJvb2xlYW4pOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIF9pSW50ZXJuYWxVcGRhdGUoKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2lDb250cm9sbGVyKVxuXHRcdFx0dGhpcy5faUNvbnRyb2xsZXIudXBkYXRlKCk7XG5cdH1cblxuXHQvKipcblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwdWJsaWMgX2lJc1Zpc2libGUoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcEltcGxpY2l0VmlzaWJpbGl0eTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHB1YmxpYyBfaUlzTW91c2VFbmFibGVkKCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BJbXBsaWNpdE1vdXNlRW5hYmxlZDtcblx0fVxuXG5cdC8qKlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHB1YmxpYyBfaVNldFNjZW5lKHZhbHVlOlNjZW5lKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3BTY2VuZSA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3BVcGRhdGVJbXBsaWNpdFBhcnRpdGlvbih0aGlzLl9wUGFyZW50PyB0aGlzLl9wUGFyZW50Ll9pQXNzaWduZWRQYXJ0aXRpb24gOiBudWxsLCB2YWx1ZSk7XG5cdH1cblxuXHQvKipcblx0ICogQHByaXZhdGVcblx0ICovXG5cdHByaXZhdGUgbm90aWZ5UG9zaXRpb25DaGFuZ2VkKClcblx0e1xuXHRcdGlmICghdGhpcy5fcG9zaXRpb25DaGFuZ2VkKVxuXHRcdFx0dGhpcy5fcG9zaXRpb25DaGFuZ2VkID0gbmV3IERpc3BsYXlPYmplY3RFdmVudChEaXNwbGF5T2JqZWN0RXZlbnQuUE9TSVRJT05fQ0hBTkdFRCwgdGhpcyk7XG5cblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQodGhpcy5fcG9zaXRpb25DaGFuZ2VkKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0cHJpdmF0ZSBub3RpZnlSb3RhdGlvbkNoYW5nZWQoKVxuXHR7XG5cdFx0aWYgKCF0aGlzLl9yb3RhdGlvbkNoYW5nZWQpXG5cdFx0XHR0aGlzLl9yb3RhdGlvbkNoYW5nZWQgPSBuZXcgRGlzcGxheU9iamVjdEV2ZW50KERpc3BsYXlPYmplY3RFdmVudC5ST1RBVElPTl9DSEFOR0VELCB0aGlzKTtcblxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCh0aGlzLl9yb3RhdGlvbkNoYW5nZWQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRwcml2YXRlIG5vdGlmeVNjYWxlQ2hhbmdlZCgpXG5cdHtcblx0XHRpZiAoIXRoaXMuX3NjYWxlQ2hhbmdlZClcblx0XHRcdHRoaXMuX3NjYWxlQ2hhbmdlZCA9IG5ldyBEaXNwbGF5T2JqZWN0RXZlbnQoRGlzcGxheU9iamVjdEV2ZW50LlNDQUxFX0NIQU5HRUQsIHRoaXMpO1xuXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KHRoaXMuX3NjYWxlQ2hhbmdlZCk7XG5cdH1cblxuXHQvKipcblx0ICogQHByaXZhdGVcblx0ICovXG5cdHByaXZhdGUgbm90aWZ5U2NlbmVDaGFuZ2UoKVxuXHR7XG5cdFx0aWYgKCF0aGlzLl9zY2VuZWNoYW5nZWQpXG5cdFx0XHR0aGlzLl9zY2VuZWNoYW5nZWQgPSBuZXcgRGlzcGxheU9iamVjdEV2ZW50KERpc3BsYXlPYmplY3RFdmVudC5TQ0VORV9DSEFOR0VELCB0aGlzKTtcblxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCh0aGlzLl9zY2VuZWNoYW5nZWQpO1xufVxuXG5cdC8qKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0cHJpdmF0ZSBub3RpZnlTY2VuZVRyYW5zZm9ybUNoYW5nZSgpXG5cdHtcblx0XHRpZiAoIXRoaXMuX3NjZW5lVHJhbnNmb3JtQ2hhbmdlZClcblx0XHRcdHRoaXMuX3NjZW5lVHJhbnNmb3JtQ2hhbmdlZCA9IG5ldyBEaXNwbGF5T2JqZWN0RXZlbnQoRGlzcGxheU9iamVjdEV2ZW50LlNDRU5FVFJBTlNGT1JNX0NIQU5HRUQsIHRoaXMpO1xuXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KHRoaXMuX3NjZW5lVHJhbnNmb3JtQ2hhbmdlZCk7XG5cdH1cblxuXHQvKipcblx0ICogSW52YWxpZGF0ZXMgdGhlIDNEIHRyYW5zZm9ybWF0aW9uIG1hdHJpeCwgY2F1c2luZyBpdCB0byBiZSB1cGRhdGVkIHVwb24gdGhlIG5leHQgcmVxdWVzdFxuXHQgKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0cHJpdmF0ZSBpbnZhbGlkYXRlTWF0cml4M0QoKTp2b2lkXG5cdHtcblx0XHRpZiAodGhpcy5fbWF0cml4M0REaXJ0eSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX21hdHJpeDNERGlydHkgPSB0cnVlO1xuXG5cdFx0aWYgKCF0aGlzLl9wU2NlbmVUcmFuc2Zvcm1EaXJ0eSAmJiAhdGhpcy5fcElnbm9yZVRyYW5zZm9ybSlcblx0XHRcdHRoaXMucEludmFsaWRhdGVTY2VuZVRyYW5zZm9ybSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRwdWJsaWMgaW52YWxpZGF0ZVBhcnRpdGlvbigpXG5cdHtcblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX2VudGl0eU5vZGVzLmxlbmd0aDtcblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBsZW47IGkrKylcblx0XHRcdHRoaXMuX2VudGl0eU5vZGVzW2ldLmludmFsaWRhdGVQYXJ0aXRpb24oKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0cHJpdmF0ZSBpbnZhbGlkYXRlUGl2b3QoKVxuXHR7XG5cdFx0dGhpcy5fcGl2b3RaZXJvID0gKHRoaXMuX3Bpdm90LnggPT0gMCkgJiYgKHRoaXMuX3Bpdm90LnkgPT0gMCkgJiYgKHRoaXMuX3Bpdm90LnogPT0gMCk7XG5cblx0XHRpZiAodGhpcy5fcGl2b3REaXJ0eSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3Bpdm90RGlydHkgPSB0cnVlO1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlTWF0cml4M0QoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0cHJpdmF0ZSBpbnZhbGlkYXRlUG9zaXRpb24oKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3Bvc2l0aW9uRGlydHkpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9wb3NpdGlvbkRpcnR5ID0gdHJ1ZTtcblxuXHRcdHRoaXMuaW52YWxpZGF0ZU1hdHJpeDNEKCk7XG5cblx0XHRpZiAodGhpcy5fbGlzdGVuVG9Qb3NpdGlvbkNoYW5nZWQpXG5cdFx0XHR0aGlzLm5vdGlmeVBvc2l0aW9uQ2hhbmdlZCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRwcml2YXRlIGludmFsaWRhdGVSb3RhdGlvbigpXG5cdHtcblx0XHRpZiAodGhpcy5fcm90YXRpb25EaXJ0eSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3JvdGF0aW9uRGlydHkgPSB0cnVlO1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlTWF0cml4M0QoKTtcblxuXHRcdGlmICh0aGlzLl9saXN0ZW5Ub1JvdGF0aW9uQ2hhbmdlZClcblx0XHRcdHRoaXMubm90aWZ5Um90YXRpb25DaGFuZ2VkKCk7XG5cdH1cblxuXHQvKipcblx0ICogQHByaXZhdGVcblx0ICovXG5cdHByaXZhdGUgaW52YWxpZGF0ZVNjYWxlKClcblx0e1xuXHRcdGlmICh0aGlzLl9zY2FsZURpcnR5KVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fc2NhbGVEaXJ0eSA9IHRydWU7XG5cblx0XHR0aGlzLmludmFsaWRhdGVNYXRyaXgzRCgpO1xuXG5cdFx0aWYgKHRoaXMuX2xpc3RlblRvU2NhbGVDaGFuZ2VkKVxuXHRcdFx0dGhpcy5ub3RpZnlTY2FsZUNoYW5nZWQoKTtcblx0fVxuXG5cblx0cHVibGljIF9pQWRkRW50aXR5Tm9kZShlbnRpdHlOb2RlOkVudGl0eU5vZGUpOkVudGl0eU5vZGVcblx0e1xuXHRcdHRoaXMuX2VudGl0eU5vZGVzLnB1c2goZW50aXR5Tm9kZSk7XG5cblx0XHRyZXR1cm4gZW50aXR5Tm9kZTtcblx0fVxuXG5cblx0cHVibGljIF9pUmVtb3ZlRW50aXR5Tm9kZShlbnRpdHlOb2RlOkVudGl0eU5vZGUpOkVudGl0eU5vZGVcblx0e1xuXHRcdHZhciBpbmRleDpudW1iZXIgPSB0aGlzLl9lbnRpdHlOb2Rlcy5pbmRleE9mKGVudGl0eU5vZGUpO1xuXG5cdFx0dGhpcy5fZW50aXR5Tm9kZXMuc3BsaWNlKGluZGV4LCAxKTtcblxuXHRcdHJldHVybiBlbnRpdHlOb2RlO1xuXHR9XG5cblx0cHVibGljIF9wUmVnaXN0ZXJFbnRpdHkocGFydGl0aW9uOlBhcnRpdGlvbilcblx0e1xuXHRcdHRocm93IG5ldyBBYnN0cmFjdE1ldGhvZEVycm9yKCk7XG5cdH1cblxuXHRwdWJsaWMgX3BVbnJlZ2lzdGVyRW50aXR5KHBhcnRpdGlvbjpQYXJ0aXRpb24pXG5cdHtcblx0XHR0aHJvdyBuZXcgQWJzdHJhY3RNZXRob2RFcnJvcigpO1xuXHR9XG5cblx0cHVibGljIF9wSW52YWxpZGF0ZUJvdW5kcygpXG5cdHtcblx0XHR0aGlzLl9ib3hCb3VuZHNJbnZhbGlkID0gdHJ1ZTtcblx0XHR0aGlzLl9zcGhlcmVCb3VuZHNJbnZhbGlkID0gdHJ1ZTtcblxuXHRcdGlmICh0aGlzLmlzRW50aXR5KVxuXHRcdFx0dGhpcy5pbnZhbGlkYXRlUGFydGl0aW9uKCk7XG5cdH1cblx0XG5cdHB1YmxpYyBfcFVwZGF0ZUJveEJvdW5kcygpXG5cdHtcblx0XHR0aGlzLl9ib3hCb3VuZHNJbnZhbGlkID0gZmFsc2U7XG5cdFx0XG5cdFx0aWYgKHRoaXMuX3BCb3hCb3VuZHMgPT0gbnVsbClcblx0XHRcdHRoaXMuX3BCb3hCb3VuZHMgPSBuZXcgQm94KCk7XG5cdH1cblxuXHRwdWJsaWMgX3BVcGRhdGVTcGhlcmVCb3VuZHMoKVxuXHR7XG5cdFx0dGhpcy5fc3BoZXJlQm91bmRzSW52YWxpZCA9IGZhbHNlO1xuXG5cdFx0aWYgKHRoaXMuX3BTcGhlcmVCb3VuZHMgPT0gbnVsbClcblx0XHRcdHRoaXMuX3BTcGhlcmVCb3VuZHMgPSBuZXcgU3BoZXJlKCk7XG5cdH1cbn1cblxuZXhwb3J0ID0gRGlzcGxheU9iamVjdDsiXX0=