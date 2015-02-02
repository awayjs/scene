var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AxisAlignedBoundingBox = require("awayjs-core/lib/bounds/AxisAlignedBoundingBox");
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
        this._orientationMatrix = new Matrix3D();
        this._pivotZero = true;
        this._pivotDirty = true;
        this._pos = new Vector3D();
        this._rot = new Vector3D();
        this._sca = new Vector3D();
        this._pIgnoreTransform = false;
        this._pBoundsInvalid = true;
        this._worldBoundsInvalid = true;
        this._pRenderables = new Array();
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
        this._transformComponents = new Array(3); //_transformComponents = new Vector.<Vector3D>(3, true);
        this._transformComponents[0] = this._pos;
        this._transformComponents[1] = this._rot;
        this._transformComponents[2] = this._sca;
        //creation of associated transform object
        this._transform = new Transform(this);
        this._matrix3D.identity();
        this._flipY.appendScale(1, -1, 1);
        this._pBounds = this.pCreateDefaultBoundingVolume();
        this._worldBounds = this.pCreateDefaultBoundingVolume();
    }
    Object.defineProperty(DisplayObject.prototype, "bounds", {
        /**
         *
         */
        get: function () {
            if (this._pBoundsInvalid)
                this.pUpdateBounds();
            return this._pBounds;
        },
        set: function (value) {
            if (this._pBounds == value)
                return;
            this._pBounds = value;
            this._worldBounds = value.clone();
            this.pInvalidateBounds();
            if (this._boundsVisible)
                this._partitionNode._iUpdateEntityBounds();
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
            if (this._pBoundsInvalid)
                this.pUpdateBounds();
            return this._depth;
        },
        set: function (val) {
            if (this._depth == val)
                return;
            this._depth == val;
            this._pScaleZ = val / this.bounds.aabb.depth;
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
            if (this._pBoundsInvalid)
                this.pUpdateBounds();
            return this._height;
        },
        set: function (val) {
            if (this._height == val)
                return;
            this._height == val;
            this._pScaleY = val / this.bounds.aabb.height;
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
            if (this._pScene && this._explicitPartition)
                this._pScene.iUnregisterPartition(this._explicitPartition);
            this._explicitPartition = value;
            if (this._pScene && value)
                this._pScene.iRegisterPartition(value);
            this._pUpdateImplicitPartition(this._pParent ? this._pParent._iAssignedPartition : null);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "partitionNode", {
        /**
         *
         */
        get: function () {
            if (!this._partitionNode)
                this._partitionNode = this.pCreateEntityPartitionNode();
            return this._partitionNode;
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
                    var pivotScale = new Vector3D(this._pivot.x / this._pScaleX, this._pivot.y / this._pScaleY, this._pivot.z / this._pScaleZ);
                    this._scenePosition = this.sceneTransform.transformVector(pivotScale);
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
    Object.defineProperty(DisplayObject.prototype, "boundsVisible", {
        /**
         *
         */
        get: function () {
            return this._boundsVisible;
        },
        set: function (value) {
            if (value == this._boundsVisible)
                return;
            this._boundsVisible = value;
            this._partitionNode.boundsVisible = value;
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
            if (this._pBoundsInvalid)
                this.pUpdateBounds();
            return this._width;
        },
        set: function (val) {
            if (this._width == val)
                return;
            this._width == val;
            this._pScaleX = val / this.bounds.aabb.width;
            this.invalidateScale();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "worldBounds", {
        /**
         *
         */
        get: function () {
            // Since this getter is invoked every iteration of the render loop, and
            // the prefab construct could affect the bounds of the entity, the prefab is
            // validated here to give it a chance to rebuild.
            if (this._iSourcePrefab)
                this._iSourcePrefab._iValidate();
            if (this._worldBoundsInvalid) {
                this._worldBoundsInvalid = false;
                this._worldBounds.transformFrom(this.bounds, this.sceneTransform);
            }
            return this._worldBounds;
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
        return this._bounds; //TODO
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
     * @inheritDoc
     */
    DisplayObject.prototype.isIntersectingRay = function (rayPosition, rayDirection) {
        var localRayPosition = this.inverseSceneTransform.transformVector(rayPosition);
        var localRayDirection = this.inverseSceneTransform.deltaTransformVector(rayDirection);
        var pickingCollisionVO = this._iPickingCollisionVO;
        if (!pickingCollisionVO.localNormal)
            pickingCollisionVO.localNormal = new Vector3D();
        var rayEntryDistance = this.bounds.rayIntersection(localRayPosition, localRayDirection, pickingCollisionVO.localNormal);
        if (rayEntryDistance < 0)
            return false;
        pickingCollisionVO.rayEntryDistance = rayEntryDistance;
        pickingCollisionVO.localRayPosition = localRayPosition;
        pickingCollisionVO.localRayDirection = localRayDirection;
        pickingCollisionVO.rayPosition = rayPosition;
        pickingCollisionVO.rayDirection = rayDirection;
        pickingCollisionVO.rayOriginIsInsideBounds = rayEntryDistance == 0;
        return true;
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
            this._pUpdateImplicitPartition(value._iAssignedPartition);
            this._iSetScene(value._pScene);
        }
        else {
            this._pUpdateImplicitMouseEnabled(true);
            this._pUpdateImplicitVisibility(true);
            this._pUpdateImplicitPartition(null);
            this._iSetScene(null);
        }
    };
    /**
     * @protected
     */
    DisplayObject.prototype.pCreateDefaultBoundingVolume = function () {
        // point lights should be using sphere bounds
        // directional lights should be using null bounds
        return new AxisAlignedBoundingBox();
    };
    /**
     * @protected
     */
    DisplayObject.prototype.pCreateEntityPartitionNode = function () {
        throw new AbstractMethodError();
    };
    /**
     * @protected
     */
    DisplayObject.prototype.pInvalidateBounds = function () {
        this._pBoundsInvalid = true;
        this._worldBoundsInvalid = true;
        if (this.isEntity)
            this.invalidatePartition();
    };
    /**
     * @protected
     */
    DisplayObject.prototype.pInvalidateSceneTransform = function () {
        this._pSceneTransformDirty = !this._pIgnoreTransform;
        this._inverseSceneTransformDirty = !this._pIgnoreTransform;
        this._scenePositionDirty = !this._pIgnoreTransform;
        this._worldBoundsInvalid = !this._pIgnoreTransform;
        if (this.isEntity)
            this.invalidatePartition();
        if (this._listenToSceneTransformChanged)
            this.notifySceneTransformChange();
    };
    /**
     * @protected
     */
    DisplayObject.prototype.pUpdateBounds = function () {
        this._width = this._pBounds.aabb.width * this._pScaleX;
        this._height = this._pBounds.aabb.height * this._pScaleY;
        this._depth = this._pBounds.aabb.depth * this._pScaleZ;
        this._pBoundsInvalid = false;
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
    DisplayObject.prototype._pUpdateImplicitPartition = function (value) {
        // assign parent implicit partition if no explicit one is given
        this._pImplicitPartition = this._explicitPartition || value;
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
            this._matrix3D.prependTranslation(-this._pivot.x / this._pScaleX, -this._pivot.y / this._pScaleY, -this._pivot.z / this._pScaleZ);
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
        // test to see if we're switching roots while we're already using a scene partition
        /*
        if (value == null)
            this._oldScene = this._pScene;

        if (this._explicitPartition && this._oldScene && this._oldScene != this._pScene)
            this.partition = null;

        if (value)
            this._oldScene = null;

        // end of stupid partition test code
        //*/
        if (this._pScene == value)
            return;
        this._pUpdateScene(value);
        if (!this._pSceneTransformDirty && !this._pIgnoreTransform)
            this.pInvalidateSceneTransform();
    };
    /**
     * @protected
     */
    DisplayObject.prototype._pUpdateScene = function (value) {
        if (this._pScene) {
            this._pScene.dispatchEvent(new SceneEvent(SceneEvent.REMOVED_FROM_SCENE, this));
            //unregister entity from current scene
            this._pScene.iUnregisterEntity(this);
        }
        this._pScene = value;
        if (value) {
            value.dispatchEvent(new SceneEvent(SceneEvent.ADDED_TO_SCENE, this));
            //register entity with new scene
            value.iRegisterEntity(this);
        }
        this.notifySceneChange();
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
        if (this._listenToSceneChanged) {
            if (!this._scenechanged)
                this._scenechanged = new DisplayObjectEvent(DisplayObjectEvent.SCENE_CHANGED, this);
            this.dispatchEvent(this._scenechanged);
        }
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
        if (this._iAssignedPartition)
            this._iAssignedPartition.iMarkForUpdate(this);
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
    return DisplayObject;
})(NamedAssetBase);
module.exports = DisplayObject;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL2Rpc3BsYXlvYmplY3QudHMiXSwibmFtZXMiOlsiRGlzcGxheU9iamVjdCIsIkRpc3BsYXlPYmplY3QuY29uc3RydWN0b3IiLCJEaXNwbGF5T2JqZWN0LmJvdW5kcyIsIkRpc3BsYXlPYmplY3QuZGVwdGgiLCJEaXNwbGF5T2JqZWN0LmV1bGVycyIsIkRpc3BsYXlPYmplY3QuaGVpZ2h0IiwiRGlzcGxheU9iamVjdC5pbmRleCIsIkRpc3BsYXlPYmplY3QuaW52ZXJzZVNjZW5lVHJhbnNmb3JtIiwiRGlzcGxheU9iamVjdC5pZ25vcmVUcmFuc2Zvcm0iLCJEaXNwbGF5T2JqZWN0LmlzRW50aXR5IiwiRGlzcGxheU9iamVjdC5sb2FkZXJJbmZvIiwiRGlzcGxheU9iamVjdC5tb3VzZUVuYWJsZWQiLCJEaXNwbGF5T2JqZWN0Lm1vdXNlWCIsIkRpc3BsYXlPYmplY3QubW91c2VZIiwiRGlzcGxheU9iamVjdC5wYXJlbnQiLCJEaXNwbGF5T2JqZWN0LnBhcnRpdGlvbiIsIkRpc3BsYXlPYmplY3QucGFydGl0aW9uTm9kZSIsIkRpc3BsYXlPYmplY3QucGlja2luZ0NvbGxpZGVyIiwiRGlzcGxheU9iamVjdC5waXZvdCIsIkRpc3BsYXlPYmplY3Qucm9vdCIsIkRpc3BsYXlPYmplY3Qucm90YXRpb25YIiwiRGlzcGxheU9iamVjdC5yb3RhdGlvblkiLCJEaXNwbGF5T2JqZWN0LnJvdGF0aW9uWiIsIkRpc3BsYXlPYmplY3Quc2NhbGVYIiwiRGlzcGxheU9iamVjdC5zY2FsZVkiLCJEaXNwbGF5T2JqZWN0LnNjYWxlWiIsIkRpc3BsYXlPYmplY3Quc2NlbmUiLCJEaXNwbGF5T2JqZWN0LnNjZW5lUG9zaXRpb24iLCJEaXNwbGF5T2JqZWN0LnNjZW5lVHJhbnNmb3JtIiwiRGlzcGxheU9iamVjdC5zaGFkZXJQaWNraW5nRGV0YWlscyIsIkRpc3BsYXlPYmplY3QuYm91bmRzVmlzaWJsZSIsIkRpc3BsYXlPYmplY3QudHJhbnNmb3JtIiwiRGlzcGxheU9iamVjdC52aXNpYmxlIiwiRGlzcGxheU9iamVjdC53aWR0aCIsIkRpc3BsYXlPYmplY3Qud29ybGRCb3VuZHMiLCJEaXNwbGF5T2JqZWN0LngiLCJEaXNwbGF5T2JqZWN0LnkiLCJEaXNwbGF5T2JqZWN0LnoiLCJEaXNwbGF5T2JqZWN0LnpPZmZzZXQiLCJEaXNwbGF5T2JqZWN0LmFkZEV2ZW50TGlzdGVuZXIiLCJEaXNwbGF5T2JqZWN0LmNsb25lIiwiRGlzcGxheU9iamVjdC5kaXNwb3NlIiwiRGlzcGxheU9iamVjdC5kaXNwb3NlQXNzZXQiLCJEaXNwbGF5T2JqZWN0LmdldEJvdW5kcyIsIkRpc3BsYXlPYmplY3QuZ2V0UmVjdCIsIkRpc3BsYXlPYmplY3QuZ2xvYmFsVG9Mb2NhbCIsIkRpc3BsYXlPYmplY3QuZ2xvYmFsVG9Mb2NhbDNEIiwiRGlzcGxheU9iamVjdC5oaXRUZXN0T2JqZWN0IiwiRGlzcGxheU9iamVjdC5oaXRUZXN0UG9pbnQiLCJEaXNwbGF5T2JqZWN0LmlzSW50ZXJzZWN0aW5nUmF5IiwiRGlzcGxheU9iamVjdC5sb29rQXQiLCJEaXNwbGF5T2JqZWN0LmxvY2FsVG9HbG9iYWwiLCJEaXNwbGF5T2JqZWN0LmxvY2FsVG9HbG9iYWwzRCIsIkRpc3BsYXlPYmplY3QubW92ZVRvIiwiRGlzcGxheU9iamVjdC5tb3ZlUGl2b3QiLCJEaXNwbGF5T2JqZWN0LnBpdGNoIiwiRGlzcGxheU9iamVjdC5nZXRSZW5kZXJTY2VuZVRyYW5zZm9ybSIsIkRpc3BsYXlPYmplY3Qucm9sbCIsIkRpc3BsYXlPYmplY3Qucm90YXRlIiwiRGlzcGxheU9iamVjdC5yb3RhdGVUbyIsIkRpc3BsYXlPYmplY3QucmVtb3ZlRXZlbnRMaXN0ZW5lciIsIkRpc3BsYXlPYmplY3QudHJhbnNsYXRlIiwiRGlzcGxheU9iamVjdC50cmFuc2xhdGVMb2NhbCIsIkRpc3BsYXlPYmplY3QueWF3IiwiRGlzcGxheU9iamVjdC5faUFzc2lnbmVkUGFydGl0aW9uIiwiRGlzcGxheU9iamVjdC5faU1hdHJpeDNEIiwiRGlzcGxheU9iamVjdC5faVBpY2tpbmdDb2xsaXNpb25WTyIsIkRpc3BsYXlPYmplY3QuaVNldFBhcmVudCIsIkRpc3BsYXlPYmplY3QucENyZWF0ZURlZmF1bHRCb3VuZGluZ1ZvbHVtZSIsIkRpc3BsYXlPYmplY3QucENyZWF0ZUVudGl0eVBhcnRpdGlvbk5vZGUiLCJEaXNwbGF5T2JqZWN0LnBJbnZhbGlkYXRlQm91bmRzIiwiRGlzcGxheU9iamVjdC5wSW52YWxpZGF0ZVNjZW5lVHJhbnNmb3JtIiwiRGlzcGxheU9iamVjdC5wVXBkYXRlQm91bmRzIiwiRGlzcGxheU9iamVjdC5fcFVwZGF0ZUltcGxpY2l0TW91c2VFbmFibGVkIiwiRGlzcGxheU9iamVjdC5fcFVwZGF0ZUltcGxpY2l0UGFydGl0aW9uIiwiRGlzcGxheU9iamVjdC5fcFVwZGF0ZUltcGxpY2l0VmlzaWJpbGl0eSIsIkRpc3BsYXlPYmplY3QuX3BVcGRhdGVNYXRyaXgzRCIsIkRpc3BsYXlPYmplY3QucFVwZGF0ZVNjZW5lVHJhbnNmb3JtIiwiRGlzcGxheU9iamVjdC5faUFkZFJlbmRlcmFibGUiLCJEaXNwbGF5T2JqZWN0Ll9pUmVtb3ZlUmVuZGVyYWJsZSIsIkRpc3BsYXlPYmplY3QuX2lUZXN0Q29sbGlzaW9uIiwiRGlzcGxheU9iamVjdC5faUludGVybmFsVXBkYXRlIiwiRGlzcGxheU9iamVjdC5faUlzVmlzaWJsZSIsIkRpc3BsYXlPYmplY3QuX2lJc01vdXNlRW5hYmxlZCIsIkRpc3BsYXlPYmplY3QuX2lTZXRTY2VuZSIsIkRpc3BsYXlPYmplY3QuX3BVcGRhdGVTY2VuZSIsIkRpc3BsYXlPYmplY3Qubm90aWZ5UG9zaXRpb25DaGFuZ2VkIiwiRGlzcGxheU9iamVjdC5ub3RpZnlSb3RhdGlvbkNoYW5nZWQiLCJEaXNwbGF5T2JqZWN0Lm5vdGlmeVNjYWxlQ2hhbmdlZCIsIkRpc3BsYXlPYmplY3Qubm90aWZ5U2NlbmVDaGFuZ2UiLCJEaXNwbGF5T2JqZWN0Lm5vdGlmeVNjZW5lVHJhbnNmb3JtQ2hhbmdlIiwiRGlzcGxheU9iamVjdC5pbnZhbGlkYXRlTWF0cml4M0QiLCJEaXNwbGF5T2JqZWN0LmludmFsaWRhdGVQYXJ0aXRpb24iLCJEaXNwbGF5T2JqZWN0LmludmFsaWRhdGVQaXZvdCIsIkRpc3BsYXlPYmplY3QuaW52YWxpZGF0ZVBvc2l0aW9uIiwiRGlzcGxheU9iamVjdC5pbnZhbGlkYXRlUm90YXRpb24iLCJEaXNwbGF5T2JqZWN0LmludmFsaWRhdGVTY2FsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTyxzQkFBc0IsV0FBVywrQ0FBK0MsQ0FBQyxDQUFDO0FBRXpGLElBQU8sVUFBVSxXQUFjLGlDQUFpQyxDQUFDLENBQUM7QUFDbEUsSUFBTyxRQUFRLFdBQWUsK0JBQStCLENBQUMsQ0FBQztBQUMvRCxJQUFPLGFBQWEsV0FBYSxvQ0FBb0MsQ0FBQyxDQUFDO0FBQ3ZFLElBQU8sS0FBSyxXQUFlLDRCQUE0QixDQUFDLENBQUM7QUFFekQsSUFBTyxRQUFRLFdBQWUsK0JBQStCLENBQUMsQ0FBQztBQUMvRCxJQUFPLGNBQWMsV0FBYSx3Q0FBd0MsQ0FBQyxDQUFDO0FBQzVFLElBQU8sbUJBQW1CLFdBQVksNENBQTRDLENBQUMsQ0FBQztBQUtwRixJQUFPLGFBQWEsV0FBYSx1Q0FBdUMsQ0FBQyxDQUFDO0FBRzFFLElBQU8sZUFBZSxXQUFhLHlDQUF5QyxDQUFDLENBQUM7QUFFOUUsSUFBTyxTQUFTLFdBQWMsbUNBQW1DLENBQUMsQ0FBQztBQUluRSxJQUFPLGtCQUFrQixXQUFZLDRDQUE0QyxDQUFDLENBQUM7QUFHbkYsSUFBTyxrQkFBa0IsV0FBWSw4Q0FBOEMsQ0FBQyxDQUFDO0FBQ3JGLElBQU8sVUFBVSxXQUFjLHNDQUFzQyxDQUFDLENBQUM7QUFHdkUsQUFpSUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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QUFDQTtRQUVsQ0EsR0FBR0EsR0FBR0EsYUFBYUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQTtRQUV2Q0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDakJBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBO1FBQ2pCQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNqQkEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7UUFFWEEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDakJBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBO1FBQ2pCQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNqQkEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7UUFFWEEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDakJBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBO1FBQ2pCQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNsQkEsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7UUFFWkEsSUFBSUEsQ0FBQ0EsR0FBWUEsSUFBSUEsUUFBUUEsRUFBRUEsQ0FBQ0E7UUFDaENBLENBQUNBLENBQUNBLGVBQWVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1FBRXZCQSxJQUFJQSxHQUFHQSxHQUFZQSxDQUFDQSxDQUFDQSxTQUFTQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUVwQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDeEJBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO1FBQ3hCQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUV4QkEsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxFQUFFQSxDQUFDQTtJQUMzQkEsQ0FBQ0E7SUFFRGxEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bc0JHQTtJQUNJQSxxQ0FBYUEsR0FBcEJBLFVBQXFCQSxLQUFXQTtRQUUvQm1ELE1BQU1BLENBQUNBLElBQUlBLEtBQUtBLEVBQUVBLEVBQUVBLE1BQU1BO0lBQzNCQSxDQUFDQSxHQURtQkE7SUFHcEJuRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bd0JHQTtJQUNJQSx1Q0FBZUEsR0FBdEJBLFVBQXVCQSxRQUFpQkE7UUFFdkNvRCxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxlQUFlQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQTtJQUN0REEsQ0FBQ0E7SUFFRHBEOzs7Ozs7T0FNR0E7SUFFSUEsOEJBQU1BLEdBQWJBLFVBQWNBLEVBQVNBLEVBQUVBLEVBQVNBLEVBQUVBLEVBQVNBO1FBRTVDcUQsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsSUFBSUEsQ0FBQ0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsSUFBSUEsQ0FBQ0EsRUFBRUEsSUFBSUEsRUFBRUEsQ0FBQ0E7WUFDbkRBLE1BQU1BLENBQUNBO1FBRVJBLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLEVBQUVBLENBQUNBO1FBQ2JBLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLEVBQUVBLENBQUNBO1FBQ2JBLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLEVBQUVBLENBQUNBO1FBRWJBLElBQUlBLENBQUNBLGtCQUFrQkEsRUFBRUEsQ0FBQ0E7SUFDM0JBLENBQUNBO0lBRURyRDs7Ozs7O09BTUdBO0lBQ0lBLGlDQUFTQSxHQUFoQkEsVUFBaUJBLEVBQVNBLEVBQUVBLEVBQVNBLEVBQUVBLEVBQVNBO1FBRS9Dc0QsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsSUFBSUEsSUFBSUEsQ0FBQ0E7WUFDdkJBLElBQUlBLENBQUNBLE1BQU1BLEdBQUdBLElBQUlBLFFBQVFBLEVBQUVBLENBQUNBO1FBRTlCQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQTtRQUNwQkEsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0E7UUFDcEJBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBO1FBRXBCQSxJQUFJQSxDQUFDQSxlQUFlQSxFQUFFQSxDQUFDQTtJQUN4QkEsQ0FBQ0E7SUFFRHREOzs7O09BSUdBO0lBQ0lBLDZCQUFLQSxHQUFaQSxVQUFhQSxLQUFZQTtRQUV4QnVELElBQUlBLENBQUNBLE1BQU1BLENBQUNBLFFBQVFBLENBQUNBLE1BQU1BLEVBQUVBLEtBQUtBLENBQUNBLENBQUNBO0lBQ3JDQSxDQUFDQTtJQUVEdkQ7O09BRUdBO0lBQ0lBLCtDQUF1QkEsR0FBOUJBLFVBQStCQSxNQUFhQTtRQUUzQ3dELEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLGVBQWVBLElBQUlBLGVBQWVBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLENBQUNBO1lBQzFEQSxJQUFJQSxLQUFLQSxHQUFtQkEsTUFBTUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsU0FBU0EsRUFBRUEsQ0FBQ0E7WUFDOURBLElBQUlBLEtBQUtBLEdBQVlBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQzlCQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQTtZQUM5QkEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7WUFDeEJBLEtBQUtBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBO1lBQ3hCQSxLQUFLQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQTtZQUN4QkEsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxTQUFTQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtZQUV6Q0EsQUFDQUEsc0JBRHNCQTtZQUN0QkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsSUFBSUEsSUFBSUEsQ0FBQ0EsYUFBYUEsSUFBSUEsYUFBYUEsQ0FBQ0EsV0FBV0EsQ0FBQ0E7Z0JBQ3ZFQSxJQUFJQSxDQUFDQSxrQkFBa0JBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsRUFBRUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsRUFBRUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7WUFFdElBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLGtCQUFrQkEsQ0FBQ0E7UUFDaENBLENBQUNBO1FBRURBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLGNBQWNBLENBQUNBO0lBQzVCQSxDQUFDQTtJQUVEeEQ7Ozs7T0FJR0E7SUFDSUEsNEJBQUlBLEdBQVhBLFVBQVlBLEtBQVlBO1FBRXZCeUQsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsTUFBTUEsRUFBRUEsS0FBS0EsQ0FBQ0EsQ0FBQ0E7SUFDckNBLENBQUNBO0lBRUR6RDs7Ozs7T0FLR0E7SUFDSUEsOEJBQU1BLEdBQWJBLFVBQWNBLElBQWFBLEVBQUVBLEtBQVlB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LEVBQUVBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO2dCQUVoQkEsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxFQUFFQSxDQUFDQTtZQUMzQkEsQ0FBQ0E7WUFFREEsR0FBR0EsR0FBR0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFFbEJBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLFVBQVVBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLFVBQVVBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUN0RkEsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3hCQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDeEJBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO2dCQUV4QkEsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxFQUFFQSxDQUFDQTtZQUMzQkEsQ0FBQ0E7WUFFREEsR0FBR0EsR0FBR0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFFbEJBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLFFBQVFBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLFFBQVFBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUNoRkEsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3RCQSxJQUFJQSxDQUFDQSxRQUFRQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDdEJBLElBQUlBLENBQUNB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QUFjLEVBa3JFekM7QUFFRCxBQUF1QixpQkFBZCxhQUFhLENBQUMiLCJmaWxlIjoiYmFzZS9EaXNwbGF5T2JqZWN0LmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBeGlzQWxpZ25lZEJvdW5kaW5nQm94XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvYm91bmRzL0F4aXNBbGlnbmVkQm91bmRpbmdCb3hcIik7XG5pbXBvcnQgQm91bmRpbmdWb2x1bWVCYXNlXHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ib3VuZHMvQm91bmRpbmdWb2x1bWVCYXNlXCIpO1xuaW1wb3J0IE1hdGhDb25zdHNcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL01hdGhDb25zdHNcIik7XG5pbXBvcnQgTWF0cml4M0RcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vTWF0cml4M0RcIik7XG5pbXBvcnQgTWF0cml4M0RVdGlsc1x0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL01hdHJpeDNEVXRpbHNcIik7XG5pbXBvcnQgUG9pbnRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vUG9pbnRcIik7XG5pbXBvcnQgUmVjdGFuZ2xlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9SZWN0YW5nbGVcIik7XG5pbXBvcnQgVmVjdG9yM0RcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vVmVjdG9yM0RcIik7XG5pbXBvcnQgTmFtZWRBc3NldEJhc2VcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9OYW1lZEFzc2V0QmFzZVwiKTtcbmltcG9ydCBBYnN0cmFjdE1ldGhvZEVycm9yXHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9lcnJvcnMvQWJzdHJhY3RNZXRob2RFcnJvclwiKTtcblxuaW1wb3J0IERpc3BsYXlPYmplY3RDb250YWluZXJcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9jb250YWluZXJzL0Rpc3BsYXlPYmplY3RDb250YWluZXJcIik7XG5pbXBvcnQgU2NlbmVcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2NvbnRhaW5lcnMvU2NlbmVcIik7XG5pbXBvcnQgQ29udHJvbGxlckJhc2VcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvY29udHJvbGxlcnMvQ29udHJvbGxlckJhc2VcIik7XG5pbXBvcnQgQWxpZ25tZW50TW9kZVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0FsaWdubWVudE1vZGVcIik7XG5pbXBvcnQgQmxlbmRNb2RlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9CbGVuZE1vZGVcIik7XG5pbXBvcnQgTG9hZGVySW5mb1x0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvTG9hZGVySW5mb1wiKTtcbmltcG9ydCBPcmllbnRhdGlvbk1vZGVcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9PcmllbnRhdGlvbk1vZGVcIik7XG5pbXBvcnQgSUJpdG1hcERyYXdhYmxlXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvSUJpdG1hcERyYXdhYmxlXCIpO1xuaW1wb3J0IFRyYW5zZm9ybVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvVHJhbnNmb3JtXCIpO1xuaW1wb3J0IEVudGl0eU5vZGVcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vRW50aXR5Tm9kZVwiKTtcbmltcG9ydCBQYXJ0aXRpb25cdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vUGFydGl0aW9uXCIpO1xuaW1wb3J0IElQaWNraW5nQ29sbGlkZXJcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcGljay9JUGlja2luZ0NvbGxpZGVyXCIpO1xuaW1wb3J0IFBpY2tpbmdDb2xsaXNpb25WT1x0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcGljay9QaWNraW5nQ29sbGlzaW9uVk9cIik7XG5pbXBvcnQgSVJlbmRlcmFibGVcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wb29sL0lSZW5kZXJhYmxlXCIpO1xuaW1wb3J0IENhbWVyYVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZW50aXRpZXMvQ2FtZXJhXCIpO1xuaW1wb3J0IERpc3BsYXlPYmplY3RFdmVudFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZXZlbnRzL0Rpc3BsYXlPYmplY3RFdmVudFwiKTtcbmltcG9ydCBTY2VuZUV2ZW50XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZXZlbnRzL1NjZW5lRXZlbnRcIik7XG5pbXBvcnQgUHJlZmFiQmFzZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3ByZWZhYnMvUHJlZmFiQmFzZVwiKTtcblxuLyoqXG4gKiBUaGUgRGlzcGxheU9iamVjdCBjbGFzcyBpcyB0aGUgYmFzZSBjbGFzcyBmb3IgYWxsIG9iamVjdHMgdGhhdCBjYW4gYmVcbiAqIHBsYWNlZCBvbiB0aGUgZGlzcGxheSBsaXN0LiBUaGUgZGlzcGxheSBsaXN0IG1hbmFnZXMgYWxsIG9iamVjdHMgZGlzcGxheWVkXG4gKiBpbiBmbGFzaC4gVXNlIHRoZSBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIGNsYXNzIHRvIGFycmFuZ2UgdGhlXG4gKiBkaXNwbGF5IG9iamVjdHMgaW4gdGhlIGRpc3BsYXkgbGlzdC4gRGlzcGxheU9iamVjdENvbnRhaW5lciBvYmplY3RzIGNhblxuICogaGF2ZSBjaGlsZCBkaXNwbGF5IG9iamVjdHMsIHdoaWxlIG90aGVyIGRpc3BsYXkgb2JqZWN0cywgc3VjaCBhcyBTaGFwZSBhbmRcbiAqIFRleHRGaWVsZCBvYmplY3RzLCBhcmUgXCJsZWFmXCIgbm9kZXMgdGhhdCBoYXZlIG9ubHkgcGFyZW50cyBhbmQgc2libGluZ3MsIG5vXG4gKiBjaGlsZHJlbi5cbiAqXG4gKiA8cD5UaGUgRGlzcGxheU9iamVjdCBjbGFzcyBzdXBwb3J0cyBiYXNpYyBmdW5jdGlvbmFsaXR5IGxpa2UgdGhlIDxpPng8L2k+XG4gKiBhbmQgPGk+eTwvaT4gcG9zaXRpb24gb2YgYW4gb2JqZWN0LCBhcyB3ZWxsIGFzIG1vcmUgYWR2YW5jZWQgcHJvcGVydGllcyBvZlxuICogdGhlIG9iamVjdCBzdWNoIGFzIGl0cyB0cmFuc2Zvcm1hdGlvbiBtYXRyaXguIDwvcD5cbiAqXG4gKiA8cD5EaXNwbGF5T2JqZWN0IGlzIGFuIGFic3RyYWN0IGJhc2UgY2xhc3M7IHRoZXJlZm9yZSwgeW91IGNhbm5vdCBjYWxsXG4gKiBEaXNwbGF5T2JqZWN0IGRpcmVjdGx5LiBJbnZva2luZyA8Y29kZT5uZXcgRGlzcGxheU9iamVjdCgpPC9jb2RlPiB0aHJvd3MgYW5cbiAqIDxjb2RlPkFyZ3VtZW50RXJyb3I8L2NvZGU+IGV4Y2VwdGlvbi4gPC9wPlxuICpcbiAqIDxwPkFsbCBkaXNwbGF5IG9iamVjdHMgaW5oZXJpdCBmcm9tIHRoZSBEaXNwbGF5T2JqZWN0IGNsYXNzLjwvcD5cbiAqXG4gKiA8cD5UaGUgRGlzcGxheU9iamVjdCBjbGFzcyBpdHNlbGYgZG9lcyBub3QgaW5jbHVkZSBhbnkgQVBJcyBmb3IgcmVuZGVyaW5nXG4gKiBjb250ZW50IG9uc2NyZWVuLiBGb3IgdGhhdCByZWFzb24sIGlmIHlvdSB3YW50IGNyZWF0ZSBhIGN1c3RvbSBzdWJjbGFzcyBvZlxuICogdGhlIERpc3BsYXlPYmplY3QgY2xhc3MsIHlvdSB3aWxsIHdhbnQgdG8gZXh0ZW5kIG9uZSBvZiBpdHMgc3ViY2xhc3NlcyB0aGF0XG4gKiBkbyBoYXZlIEFQSXMgZm9yIHJlbmRlcmluZyBjb250ZW50IG9uc2NyZWVuLCBzdWNoIGFzIHRoZSBTaGFwZSwgU3ByaXRlLFxuICogQml0bWFwLCBTaW1wbGVCdXR0b24sIFRleHRGaWVsZCwgb3IgTW92aWVDbGlwIGNsYXNzLjwvcD5cbiAqXG4gKiA8cD5UaGUgRGlzcGxheU9iamVjdCBjbGFzcyBjb250YWlucyBzZXZlcmFsIGJyb2FkY2FzdCBldmVudHMuIE5vcm1hbGx5LCB0aGVcbiAqIHRhcmdldCBvZiBhbnkgcGFydGljdWxhciBldmVudCBpcyBhIHNwZWNpZmljIERpc3BsYXlPYmplY3QgaW5zdGFuY2UuIEZvclxuICogZXhhbXBsZSwgdGhlIHRhcmdldCBvZiBhbiA8Y29kZT5hZGRlZDwvY29kZT4gZXZlbnQgaXMgdGhlIHNwZWNpZmljXG4gKiBEaXNwbGF5T2JqZWN0IGluc3RhbmNlIHRoYXQgd2FzIGFkZGVkIHRvIHRoZSBkaXNwbGF5IGxpc3QuIEhhdmluZyBhIHNpbmdsZVxuICogdGFyZ2V0IHJlc3RyaWN0cyB0aGUgcGxhY2VtZW50IG9mIGV2ZW50IGxpc3RlbmVycyB0byB0aGF0IHRhcmdldCBhbmQgaW5cbiAqIHNvbWUgY2FzZXMgdGhlIHRhcmdldCdzIGFuY2VzdG9ycyBvbiB0aGUgZGlzcGxheSBsaXN0LiBXaXRoIGJyb2FkY2FzdFxuICogZXZlbnRzLCBob3dldmVyLCB0aGUgdGFyZ2V0IGlzIG5vdCBhIHNwZWNpZmljIERpc3BsYXlPYmplY3QgaW5zdGFuY2UsIGJ1dFxuICogcmF0aGVyIGFsbCBEaXNwbGF5T2JqZWN0IGluc3RhbmNlcywgaW5jbHVkaW5nIHRob3NlIHRoYXQgYXJlIG5vdCBvbiB0aGVcbiAqIGRpc3BsYXkgbGlzdC4gVGhpcyBtZWFucyB0aGF0IHlvdSBjYW4gYWRkIGEgbGlzdGVuZXIgdG8gYW55IERpc3BsYXlPYmplY3RcbiAqIGluc3RhbmNlIHRvIGxpc3RlbiBmb3IgYnJvYWRjYXN0IGV2ZW50cy4gSW4gYWRkaXRpb24gdG8gdGhlIGJyb2FkY2FzdFxuICogZXZlbnRzIGxpc3RlZCBpbiB0aGUgRGlzcGxheU9iamVjdCBjbGFzcydzIEV2ZW50cyB0YWJsZSwgdGhlIERpc3BsYXlPYmplY3RcbiAqIGNsYXNzIGFsc28gaW5oZXJpdHMgdHdvIGJyb2FkY2FzdCBldmVudHMgZnJvbSB0aGUgRXZlbnREaXNwYXRjaGVyIGNsYXNzOlxuICogPGNvZGU+YWN0aXZhdGU8L2NvZGU+IGFuZCA8Y29kZT5kZWFjdGl2YXRlPC9jb2RlPi48L3A+XG4gKlxuICogPHA+U29tZSBwcm9wZXJ0aWVzIHByZXZpb3VzbHkgdXNlZCBpbiB0aGUgQWN0aW9uU2NyaXB0IDEuMCBhbmQgMi4wXG4gKiBNb3ZpZUNsaXAsIFRleHRGaWVsZCwgYW5kIEJ1dHRvbiBjbGFzc2VzKHN1Y2ggYXMgPGNvZGU+X2FscGhhPC9jb2RlPixcbiAqIDxjb2RlPl9oZWlnaHQ8L2NvZGU+LCA8Y29kZT5fbmFtZTwvY29kZT4sIDxjb2RlPl93aWR0aDwvY29kZT4sXG4gKiA8Y29kZT5feDwvY29kZT4sIDxjb2RlPl95PC9jb2RlPiwgYW5kIG90aGVycykgaGF2ZSBlcXVpdmFsZW50cyBpbiB0aGVcbiAqIEFjdGlvblNjcmlwdCAzLjAgRGlzcGxheU9iamVjdCBjbGFzcyB0aGF0IGFyZSByZW5hbWVkIHNvIHRoYXQgdGhleSBub1xuICogbG9uZ2VyIGJlZ2luIHdpdGggdGhlIHVuZGVyc2NvcmUoXykgY2hhcmFjdGVyLjwvcD5cbiAqXG4gKiA8cD5Gb3IgbW9yZSBpbmZvcm1hdGlvbiwgc2VlIHRoZSBcIkRpc3BsYXkgUHJvZ3JhbW1pbmdcIiBjaGFwdGVyIG9mIHRoZVxuICogPGk+QWN0aW9uU2NyaXB0IDMuMCBEZXZlbG9wZXIncyBHdWlkZTwvaT4uPC9wPlxuICogXG4gKiBAZXZlbnQgYWRkZWQgICAgICAgICAgICBEaXNwYXRjaGVkIHdoZW4gYSBkaXNwbGF5IG9iamVjdCBpcyBhZGRlZCB0byB0aGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXkgbGlzdC4gVGhlIGZvbGxvd2luZyBtZXRob2RzIHRyaWdnZXIgdGhpc1xuICogICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQ6XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLmFkZENoaWxkKCk8L2NvZGU+LFxuICogICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+RGlzcGxheU9iamVjdENvbnRhaW5lci5hZGRDaGlsZEF0KCk8L2NvZGU+LlxuICogQGV2ZW50IGFkZGVkVG9TY2VuZSAgICAgRGlzcGF0Y2hlZCB3aGVuIGEgZGlzcGxheSBvYmplY3QgaXMgYWRkZWQgdG8gdGhlIG9uXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBzY2VuZSBkaXNwbGF5IGxpc3QsIGVpdGhlciBkaXJlY3RseSBvciB0aHJvdWdoIHRoZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgYWRkaXRpb24gb2YgYSBzdWIgdHJlZSBpbiB3aGljaCB0aGUgZGlzcGxheSBvYmplY3RcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGlzIGNvbnRhaW5lZC4gVGhlIGZvbGxvd2luZyBtZXRob2RzIHRyaWdnZXIgdGhpc1xuICogICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQ6XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLmFkZENoaWxkKCk8L2NvZGU+LFxuICogICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+RGlzcGxheU9iamVjdENvbnRhaW5lci5hZGRDaGlsZEF0KCk8L2NvZGU+LlxuICogQGV2ZW50IGVudGVyRnJhbWUgICAgICAgW2Jyb2FkY2FzdCBldmVudF0gRGlzcGF0Y2hlZCB3aGVuIHRoZSBwbGF5aGVhZCBpc1xuICogICAgICAgICAgICAgICAgICAgICAgICAgZW50ZXJpbmcgYSBuZXcgZnJhbWUuIElmIHRoZSBwbGF5aGVhZCBpcyBub3RcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIG1vdmluZywgb3IgaWYgdGhlcmUgaXMgb25seSBvbmUgZnJhbWUsIHRoaXMgZXZlbnRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGlzIGRpc3BhdGNoZWQgY29udGludW91c2x5IGluIGNvbmp1bmN0aW9uIHdpdGggdGhlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBmcmFtZSByYXRlLiBUaGlzIGV2ZW50IGlzIGEgYnJvYWRjYXN0IGV2ZW50LCB3aGljaFxuICogICAgICAgICAgICAgICAgICAgICAgICAgbWVhbnMgdGhhdCBpdCBpcyBkaXNwYXRjaGVkIGJ5IGFsbCBkaXNwbGF5IG9iamVjdHNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIHdpdGggYSBsaXN0ZW5lciByZWdpc3RlcmVkIGZvciB0aGlzIGV2ZW50LlxuICogQGV2ZW50IGV4aXRGcmFtZSAgICAgICAgW2Jyb2FkY2FzdCBldmVudF0gRGlzcGF0Y2hlZCB3aGVuIHRoZSBwbGF5aGVhZCBpc1xuICogICAgICAgICAgICAgICAgICAgICAgICAgZXhpdGluZyB0aGUgY3VycmVudCBmcmFtZS4gQWxsIGZyYW1lIHNjcmlwdHMgaGF2ZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgYmVlbiBydW4uIElmIHRoZSBwbGF5aGVhZCBpcyBub3QgbW92aW5nLCBvciBpZlxuICogICAgICAgICAgICAgICAgICAgICAgICAgdGhlcmUgaXMgb25seSBvbmUgZnJhbWUsIHRoaXMgZXZlbnQgaXMgZGlzcGF0Y2hlZFxuICogICAgICAgICAgICAgICAgICAgICAgICAgY29udGludW91c2x5IGluIGNvbmp1bmN0aW9uIHdpdGggdGhlIGZyYW1lIHJhdGUuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBUaGlzIGV2ZW50IGlzIGEgYnJvYWRjYXN0IGV2ZW50LCB3aGljaCBtZWFucyB0aGF0XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBpdCBpcyBkaXNwYXRjaGVkIGJ5IGFsbCBkaXNwbGF5IG9iamVjdHMgd2l0aCBhXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lciByZWdpc3RlcmVkIGZvciB0aGlzIGV2ZW50LlxuICogQGV2ZW50IGZyYW1lQ29uc3RydWN0ZWQgW2Jyb2FkY2FzdCBldmVudF0gRGlzcGF0Y2hlZCBhZnRlciB0aGUgY29uc3RydWN0b3JzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBvZiBmcmFtZSBkaXNwbGF5IG9iamVjdHMgaGF2ZSBydW4gYnV0IGJlZm9yZSBmcmFtZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgc2NyaXB0cyBoYXZlIHJ1bi4gSWYgdGhlIHBsYXloZWFkIGlzIG5vdCBtb3ZpbmcsIG9yXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBpZiB0aGVyZSBpcyBvbmx5IG9uZSBmcmFtZSwgdGhpcyBldmVudCBpc1xuICogICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2hlZCBjb250aW51b3VzbHkgaW4gY29uanVuY3Rpb24gd2l0aCB0aGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGZyYW1lIHJhdGUuIFRoaXMgZXZlbnQgaXMgYSBicm9hZGNhc3QgZXZlbnQsIHdoaWNoXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBtZWFucyB0aGF0IGl0IGlzIGRpc3BhdGNoZWQgYnkgYWxsIGRpc3BsYXkgb2JqZWN0c1xuICogICAgICAgICAgICAgICAgICAgICAgICAgd2l0aCBhIGxpc3RlbmVyIHJlZ2lzdGVyZWQgZm9yIHRoaXMgZXZlbnQuXG4gKiBAZXZlbnQgcmVtb3ZlZCAgICAgICAgICBEaXNwYXRjaGVkIHdoZW4gYSBkaXNwbGF5IG9iamVjdCBpcyBhYm91dCB0byBiZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlZCBmcm9tIHRoZSBkaXNwbGF5IGxpc3QuIFR3byBtZXRob2RzIG9mIHRoZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgRGlzcGxheU9iamVjdENvbnRhaW5lciBjbGFzcyBnZW5lcmF0ZSB0aGlzIGV2ZW50OlxuICogICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+cmVtb3ZlQ2hpbGQoKTwvY29kZT4gYW5kXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5yZW1vdmVDaGlsZEF0KCk8L2NvZGU+LlxuICpcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxwPlRoZSBmb2xsb3dpbmcgbWV0aG9kcyBvZiBhXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIG9iamVjdCBhbHNvIGdlbmVyYXRlIHRoaXNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50IGlmIGFuIG9iamVjdCBtdXN0IGJlIHJlbW92ZWQgdG8gbWFrZSByb29tIGZvclxuICogICAgICAgICAgICAgICAgICAgICAgICAgdGhlIG5ldyBvYmplY3Q6IDxjb2RlPmFkZENoaWxkKCk8L2NvZGU+LFxuICogICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+YWRkQ2hpbGRBdCgpPC9jb2RlPiwgYW5kXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5zZXRDaGlsZEluZGV4KCk8L2NvZGU+LiA8L3A+XG4gKiBAZXZlbnQgcmVtb3ZlZEZyb21TY2VuZSBEaXNwYXRjaGVkIHdoZW4gYSBkaXNwbGF5IG9iamVjdCBpcyBhYm91dCB0byBiZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlZCBmcm9tIHRoZSBkaXNwbGF5IGxpc3QsIGVpdGhlciBkaXJlY3RseSBvclxuICogICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3VnaCB0aGUgcmVtb3ZhbCBvZiBhIHN1YiB0cmVlIGluIHdoaWNoIHRoZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheSBvYmplY3QgaXMgY29udGFpbmVkLiBUd28gbWV0aG9kcyBvZiB0aGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIERpc3BsYXlPYmplY3RDb250YWluZXIgY2xhc3MgZ2VuZXJhdGUgdGhpcyBldmVudDpcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPnJlbW92ZUNoaWxkKCk8L2NvZGU+IGFuZFxuICogICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+cmVtb3ZlQ2hpbGRBdCgpPC9jb2RlPi5cbiAqXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICA8cD5UaGUgZm9sbG93aW5nIG1ldGhvZHMgb2YgYVxuICogICAgICAgICAgICAgICAgICAgICAgICAgRGlzcGxheU9iamVjdENvbnRhaW5lciBvYmplY3QgYWxzbyBnZW5lcmF0ZSB0aGlzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBldmVudCBpZiBhbiBvYmplY3QgbXVzdCBiZSByZW1vdmVkIHRvIG1ha2Ugcm9vbSBmb3JcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIHRoZSBuZXcgb2JqZWN0OiA8Y29kZT5hZGRDaGlsZCgpPC9jb2RlPixcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPmFkZENoaWxkQXQoKTwvY29kZT4sIGFuZFxuICogICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+c2V0Q2hpbGRJbmRleCgpPC9jb2RlPi4gPC9wPlxuICogQGV2ZW50IHJlbmRlciAgICAgICAgICAgW2Jyb2FkY2FzdCBldmVudF0gRGlzcGF0Y2hlZCB3aGVuIHRoZSBkaXNwbGF5IGxpc3RcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGlzIGFib3V0IHRvIGJlIHVwZGF0ZWQgYW5kIHJlbmRlcmVkLiBUaGlzIGV2ZW50XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlcyB0aGUgbGFzdCBvcHBvcnR1bml0eSBmb3Igb2JqZWN0cyBsaXN0ZW5pbmdcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGZvciB0aGlzIGV2ZW50IHRvIG1ha2UgY2hhbmdlcyBiZWZvcmUgdGhlIGRpc3BsYXlcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3QgaXMgcmVuZGVyZWQuIFlvdSBtdXN0IGNhbGwgdGhlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5pbnZhbGlkYXRlKCk8L2NvZGU+IG1ldGhvZCBvZiB0aGUgU2NlbmVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdCBlYWNoIHRpbWUgeW91IHdhbnQgYSA8Y29kZT5yZW5kZXI8L2NvZGU+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBldmVudCB0byBiZSBkaXNwYXRjaGVkLiA8Y29kZT5SZW5kZXI8L2NvZGU+IGV2ZW50c1xuICogICAgICAgICAgICAgICAgICAgICAgICAgYXJlIGRpc3BhdGNoZWQgdG8gYW4gb2JqZWN0IG9ubHkgaWYgdGhlcmUgaXMgbXV0dWFsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICB0cnVzdCBiZXR3ZWVuIGl0IGFuZCB0aGUgb2JqZWN0IHRoYXQgY2FsbGVkXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5TY2VuZS5pbnZhbGlkYXRlKCk8L2NvZGU+LiBUaGlzIGV2ZW50IGlzIGFcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGJyb2FkY2FzdCBldmVudCwgd2hpY2ggbWVhbnMgdGhhdCBpdCBpcyBkaXNwYXRjaGVkXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBieSBhbGwgZGlzcGxheSBvYmplY3RzIHdpdGggYSBsaXN0ZW5lciByZWdpc3RlcmVkXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgdGhpcyBldmVudC5cbiAqXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICA8cD48Yj5Ob3RlOiA8L2I+VGhpcyBldmVudCBpcyBub3QgZGlzcGF0Y2hlZCBpZiB0aGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXkgaXMgbm90IHJlbmRlcmluZy4gVGhpcyBpcyB0aGUgY2FzZSB3aGVuIHRoZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudCBpcyBlaXRoZXIgbWluaW1pemVkIG9yIG9ic2N1cmVkLiA8L3A+XG4gKi9cbmNsYXNzIERpc3BsYXlPYmplY3QgZXh0ZW5kcyBOYW1lZEFzc2V0QmFzZSBpbXBsZW1lbnRzIElCaXRtYXBEcmF3YWJsZVxue1xuXHRwcml2YXRlIF9sb2FkZXJJbmZvOkxvYWRlckluZm87XG5cdHByaXZhdGUgX21vdXNlWDpudW1iZXI7XG5cdHByaXZhdGUgX21vdXNlWTpudW1iZXI7XG5cdHByaXZhdGUgX3Jvb3Q6RGlzcGxheU9iamVjdENvbnRhaW5lcjtcblx0cHJpdmF0ZSBfYm91bmRzOlJlY3RhbmdsZTtcblx0cHJpdmF0ZSBfYm91bmRzVmlzaWJsZTpib29sZWFuO1xuXHRwcml2YXRlIF9kZXB0aDpudW1iZXI7XG5cdHByaXZhdGUgX2hlaWdodDpudW1iZXI7XG5cdHByaXZhdGUgX3dpZHRoOm51bWJlcjtcblxuXHRwdWJsaWMgX3BTY2VuZTpTY2VuZTtcblx0cHVibGljIF9wUGFyZW50OkRpc3BsYXlPYmplY3RDb250YWluZXI7XG5cdHB1YmxpYyBfcFNjZW5lVHJhbnNmb3JtOk1hdHJpeDNEID0gbmV3IE1hdHJpeDNEKCk7XG5cdHB1YmxpYyBfcFNjZW5lVHJhbnNmb3JtRGlydHk6Ym9vbGVhbiA9IHRydWU7XG5cdHB1YmxpYyBfcElzRW50aXR5OmJvb2xlYW47XG5cblx0cHJpdmF0ZSBfZXhwbGljaXRQYXJ0aXRpb246UGFydGl0aW9uO1xuXHRwdWJsaWMgX3BJbXBsaWNpdFBhcnRpdGlvbjpQYXJ0aXRpb247XG5cdHByaXZhdGUgX3BhcnRpdGlvbk5vZGU6RW50aXR5Tm9kZTtcblxuXHRwcml2YXRlIF9zY2VuZVRyYW5zZm9ybUNoYW5nZWQ6RGlzcGxheU9iamVjdEV2ZW50O1xuXHRwcml2YXRlIF9zY2VuZWNoYW5nZWQ6RGlzcGxheU9iamVjdEV2ZW50O1xuXHRwcml2YXRlIF90cmFuc2Zvcm06VHJhbnNmb3JtO1xuXHRwcml2YXRlIF9tYXRyaXgzRDpNYXRyaXgzRCA9IG5ldyBNYXRyaXgzRCgpO1xuXHRwcml2YXRlIF9tYXRyaXgzRERpcnR5OmJvb2xlYW4gPSB0cnVlO1xuXG5cdHByaXZhdGUgX2ludmVyc2VTY2VuZVRyYW5zZm9ybTpNYXRyaXgzRCA9IG5ldyBNYXRyaXgzRCgpO1xuXHRwcml2YXRlIF9pbnZlcnNlU2NlbmVUcmFuc2Zvcm1EaXJ0eTpib29sZWFuID0gdHJ1ZTtcblx0cHJpdmF0ZSBfc2NlbmVQb3NpdGlvbjpWZWN0b3IzRCA9IG5ldyBWZWN0b3IzRCgpO1xuXHRwcml2YXRlIF9zY2VuZVBvc2l0aW9uRGlydHk6Ym9vbGVhbiA9IHRydWU7XG5cdHByaXZhdGUgX2V4cGxpY2l0VmlzaWJpbGl0eTpib29sZWFuID0gdHJ1ZTtcblx0cHVibGljIF9wSW1wbGljaXRWaXNpYmlsaXR5OmJvb2xlYW4gPSB0cnVlO1xuXHRwcml2YXRlIF9leHBsaWNpdE1vdXNlRW5hYmxlZDpib29sZWFuID0gdHJ1ZTtcblx0cHVibGljIF9wSW1wbGljaXRNb3VzZUVuYWJsZWQ6Ym9vbGVhbiA9IHRydWU7XG5cdHByaXZhdGUgX2xpc3RlblRvU2NlbmVUcmFuc2Zvcm1DaGFuZ2VkOmJvb2xlYW47XG5cdHByaXZhdGUgX2xpc3RlblRvU2NlbmVDaGFuZ2VkOmJvb2xlYW47XG5cblx0cHJpdmF0ZSBfcG9zaXRpb25EaXJ0eTpib29sZWFuID0gdHJ1ZTtcblx0cHJpdmF0ZSBfcm90YXRpb25EaXJ0eTpib29sZWFuID0gdHJ1ZTtcblx0cHJpdmF0ZSBfc2NhbGVEaXJ0eTpib29sZWFuID0gdHJ1ZTtcblxuXHRwcml2YXRlIF9wb3NpdGlvbkNoYW5nZWQ6RGlzcGxheU9iamVjdEV2ZW50O1xuXHRwcml2YXRlIF9yb3RhdGlvbkNoYW5nZWQ6RGlzcGxheU9iamVjdEV2ZW50O1xuXHRwcml2YXRlIF9zY2FsZUNoYW5nZWQ6RGlzcGxheU9iamVjdEV2ZW50O1xuXG5cdHByaXZhdGUgX3JvdGF0aW9uWDpudW1iZXIgPSAwO1xuXHRwcml2YXRlIF9yb3RhdGlvblk6bnVtYmVyID0gMDtcblx0cHJpdmF0ZSBfcm90YXRpb25aOm51bWJlciA9IDA7XG5cdHByaXZhdGUgX2V1bGVyczpWZWN0b3IzRCA9IG5ldyBWZWN0b3IzRCgpO1xuXHRwcml2YXRlIF9mbGlwWTpNYXRyaXgzRCA9IG5ldyBNYXRyaXgzRCgpO1xuXG5cdHByaXZhdGUgX2xpc3RlblRvUG9zaXRpb25DaGFuZ2VkOmJvb2xlYW47XG5cdHByaXZhdGUgX2xpc3RlblRvUm90YXRpb25DaGFuZ2VkOmJvb2xlYW47XG5cdHByaXZhdGUgX2xpc3RlblRvU2NhbGVDaGFuZ2VkOmJvb2xlYW47XG5cdHByaXZhdGUgX3pPZmZzZXQ6bnVtYmVyID0gMDtcblxuXHRwdWJsaWMgX3BTY2FsZVg6bnVtYmVyID0gMTtcblx0cHVibGljIF9wU2NhbGVZOm51bWJlciA9IDE7XG5cdHB1YmxpYyBfcFNjYWxlWjpudW1iZXIgPSAxO1xuXHRwcml2YXRlIF94Om51bWJlciA9IDA7XG5cdHByaXZhdGUgX3k6bnVtYmVyID0gMDtcblx0cHJpdmF0ZSBfejpudW1iZXIgPSAwO1xuXHRwcml2YXRlIF9waXZvdDpWZWN0b3IzRCA9IG5ldyBWZWN0b3IzRCgpO1xuXHRwcml2YXRlIF9vcmllbnRhdGlvbk1hdHJpeDpNYXRyaXgzRCA9IG5ldyBNYXRyaXgzRCgpO1xuXHRwcml2YXRlIF9waXZvdFplcm86Ym9vbGVhbiA9IHRydWU7XG5cdHByaXZhdGUgX3Bpdm90RGlydHk6Ym9vbGVhbiA9IHRydWU7XG5cdHByaXZhdGUgX3BvczpWZWN0b3IzRCA9IG5ldyBWZWN0b3IzRCgpO1xuXHRwcml2YXRlIF9yb3Q6VmVjdG9yM0QgPSBuZXcgVmVjdG9yM0QoKTtcblx0cHJpdmF0ZSBfc2NhOlZlY3RvcjNEID0gbmV3IFZlY3RvcjNEKCk7XG5cdHByaXZhdGUgX3RyYW5zZm9ybUNvbXBvbmVudHM6QXJyYXk8VmVjdG9yM0Q+O1xuXG5cdHB1YmxpYyBfcElnbm9yZVRyYW5zZm9ybTpib29sZWFuID0gZmFsc2U7XG5cblx0cHJpdmF0ZSBfc2hhZGVyUGlja2luZ0RldGFpbHM6Ym9vbGVhbjtcblxuXHRwdWJsaWMgX3BQaWNraW5nQ29sbGlzaW9uVk86UGlja2luZ0NvbGxpc2lvblZPO1xuXG5cdHB1YmxpYyBfcEJvdW5kczpCb3VuZGluZ1ZvbHVtZUJhc2U7XG5cdHB1YmxpYyBfcEJvdW5kc0ludmFsaWQ6Ym9vbGVhbiA9IHRydWU7XG5cdHByaXZhdGUgX3dvcmxkQm91bmRzOkJvdW5kaW5nVm9sdW1lQmFzZTtcblx0cHJpdmF0ZSBfd29ybGRCb3VuZHNJbnZhbGlkOmJvb2xlYW4gPSB0cnVlO1xuXG5cdHB1YmxpYyBfcFBpY2tpbmdDb2xsaWRlcjpJUGlja2luZ0NvbGxpZGVyO1xuXG5cdHB1YmxpYyBfcFJlbmRlcmFibGVzOkFycmF5PElSZW5kZXJhYmxlPiA9IG5ldyBBcnJheTxJUmVuZGVyYWJsZT4oKTtcblxuXHRwdWJsaWMgX2lTb3VyY2VQcmVmYWI6UHJlZmFiQmFzZTtcblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBhbGlnbm1lbnRNb2RlOnN0cmluZyA9IEFsaWdubWVudE1vZGUuUkVHSVNUUkFUSU9OX1BPSU5UO1xuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgdGhlIGFscGhhIHRyYW5zcGFyZW5jeSB2YWx1ZSBvZiB0aGUgb2JqZWN0IHNwZWNpZmllZC4gVmFsaWRcblx0ICogdmFsdWVzIGFyZSAwKGZ1bGx5IHRyYW5zcGFyZW50KSB0byAxKGZ1bGx5IG9wYXF1ZSkuIFRoZSBkZWZhdWx0IHZhbHVlIGlzXG5cdCAqIDEuIERpc3BsYXkgb2JqZWN0cyB3aXRoIDxjb2RlPmFscGhhPC9jb2RlPiBzZXQgdG8gMCA8aT5hcmU8L2k+IGFjdGl2ZSxcblx0ICogZXZlbiB0aG91Z2ggdGhleSBhcmUgaW52aXNpYmxlLlxuXHQgKi9cblx0cHVibGljIGFscGhhOm51bWJlcjtcblxuXHQvKipcblx0ICogQSB2YWx1ZSBmcm9tIHRoZSBCbGVuZE1vZGUgY2xhc3MgdGhhdCBzcGVjaWZpZXMgd2hpY2ggYmxlbmQgbW9kZSB0byB1c2UuIEFcblx0ICogYml0bWFwIGNhbiBiZSBkcmF3biBpbnRlcm5hbGx5IGluIHR3byB3YXlzLiBJZiB5b3UgaGF2ZSBhIGJsZW5kIG1vZGVcblx0ICogZW5hYmxlZCBvciBhbiBleHRlcm5hbCBjbGlwcGluZyBtYXNrLCB0aGUgYml0bWFwIGlzIGRyYXduIGJ5IGFkZGluZyBhXG5cdCAqIGJpdG1hcC1maWxsZWQgc3F1YXJlIHNoYXBlIHRvIHRoZSB2ZWN0b3IgcmVuZGVyLiBJZiB5b3UgYXR0ZW1wdCB0byBzZXRcblx0ICogdGhpcyBwcm9wZXJ0eSB0byBhbiBpbnZhbGlkIHZhbHVlLCBGbGFzaCBydW50aW1lcyBzZXQgdGhlIHZhbHVlIHRvXG5cdCAqIDxjb2RlPkJsZW5kTW9kZS5OT1JNQUw8L2NvZGU+LlxuXHQgKlxuXHQgKiA8cD5UaGUgPGNvZGU+YmxlbmRNb2RlPC9jb2RlPiBwcm9wZXJ0eSBhZmZlY3RzIGVhY2ggcGl4ZWwgb2YgdGhlIGRpc3BsYXlcblx0ICogb2JqZWN0LiBFYWNoIHBpeGVsIGlzIGNvbXBvc2VkIG9mIHRocmVlIGNvbnN0aXR1ZW50IGNvbG9ycyhyZWQsIGdyZWVuLFxuXHQgKiBhbmQgYmx1ZSksIGFuZCBlYWNoIGNvbnN0aXR1ZW50IGNvbG9yIGhhcyBhIHZhbHVlIGJldHdlZW4gMHgwMCBhbmQgMHhGRi5cblx0ICogRmxhc2ggUGxheWVyIG9yIEFkb2JlIEFJUiBjb21wYXJlcyBlYWNoIGNvbnN0aXR1ZW50IGNvbG9yIG9mIG9uZSBwaXhlbCBpblxuXHQgKiB0aGUgbW92aWUgY2xpcCB3aXRoIHRoZSBjb3JyZXNwb25kaW5nIGNvbG9yIG9mIHRoZSBwaXhlbCBpbiB0aGVcblx0ICogYmFja2dyb3VuZC4gRm9yIGV4YW1wbGUsIGlmIDxjb2RlPmJsZW5kTW9kZTwvY29kZT4gaXMgc2V0IHRvXG5cdCAqIDxjb2RlPkJsZW5kTW9kZS5MSUdIVEVOPC9jb2RlPiwgRmxhc2ggUGxheWVyIG9yIEFkb2JlIEFJUiBjb21wYXJlcyB0aGUgcmVkXG5cdCAqIHZhbHVlIG9mIHRoZSBkaXNwbGF5IG9iamVjdCB3aXRoIHRoZSByZWQgdmFsdWUgb2YgdGhlIGJhY2tncm91bmQsIGFuZCB1c2VzXG5cdCAqIHRoZSBsaWdodGVyIG9mIHRoZSB0d28gYXMgdGhlIHZhbHVlIGZvciB0aGUgcmVkIGNvbXBvbmVudCBvZiB0aGUgZGlzcGxheWVkXG5cdCAqIGNvbG9yLjwvcD5cblx0ICpcblx0ICogPHA+VGhlIGZvbGxvd2luZyB0YWJsZSBkZXNjcmliZXMgdGhlIDxjb2RlPmJsZW5kTW9kZTwvY29kZT4gc2V0dGluZ3MuIFRoZVxuXHQgKiBCbGVuZE1vZGUgY2xhc3MgZGVmaW5lcyBzdHJpbmcgdmFsdWVzIHlvdSBjYW4gdXNlLiBUaGUgaWxsdXN0cmF0aW9ucyBpblxuXHQgKiB0aGUgdGFibGUgc2hvdyA8Y29kZT5ibGVuZE1vZGU8L2NvZGU+IHZhbHVlcyBhcHBsaWVkIHRvIGEgY2lyY3VsYXIgZGlzcGxheVxuXHQgKiBvYmplY3QoMikgc3VwZXJpbXBvc2VkIG9uIGFub3RoZXIgZGlzcGxheSBvYmplY3QoMSkuPC9wPlxuXHQgKi9cblx0cHVibGljIGJsZW5kTW9kZTpCbGVuZE1vZGU7XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGJvdW5kcygpOkJvdW5kaW5nVm9sdW1lQmFzZVxuXHR7XG5cdFx0aWYgKHRoaXMuX3BCb3VuZHNJbnZhbGlkKVxuXHRcdFx0dGhpcy5wVXBkYXRlQm91bmRzKCk7XG5cblx0XHRyZXR1cm4gdGhpcy5fcEJvdW5kcztcblx0fVxuXG5cdHB1YmxpYyBzZXQgYm91bmRzKHZhbHVlOkJvdW5kaW5nVm9sdW1lQmFzZSlcblx0e1xuXHRcdGlmICh0aGlzLl9wQm91bmRzID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fcEJvdW5kcyA9IHZhbHVlO1xuXG5cdFx0dGhpcy5fd29ybGRCb3VuZHMgPSB2YWx1ZS5jbG9uZSgpO1xuXG5cdFx0dGhpcy5wSW52YWxpZGF0ZUJvdW5kcygpO1xuXG5cdFx0aWYgKHRoaXMuX2JvdW5kc1Zpc2libGUpXG5cdFx0XHR0aGlzLl9wYXJ0aXRpb25Ob2RlLl9pVXBkYXRlRW50aXR5Qm91bmRzKCk7XG5cdH1cblxuXHQvKipcblx0ICogSWYgc2V0IHRvIDxjb2RlPnRydWU8L2NvZGU+LCBOTUUgd2lsbCB1c2UgdGhlIHNvZnR3YXJlIHJlbmRlcmVyIHRvIGNhY2hlXG5cdCAqIGFuIGludGVybmFsIGJpdG1hcCByZXByZXNlbnRhdGlvbiBvZiB0aGUgZGlzcGxheSBvYmplY3QuIEZvciBuYXRpdmUgdGFyZ2V0cyxcblx0ICogdGhpcyBpcyBvZnRlbiBtdWNoIHNsb3dlciB0aGFuIHRoZSBkZWZhdWx0IGhhcmR3YXJlIHJlbmRlcmVyLiBXaGVuIHlvdVxuXHQgKiBhcmUgdXNpbmcgdGhlIEZsYXNoIHRhcmdldCwgdGhpcyBjYWNoaW5nIG1heSBpbmNyZWFzZSBwZXJmb3JtYW5jZSBmb3IgZGlzcGxheVxuXHQgKiBvYmplY3RzIHRoYXQgY29udGFpbiBjb21wbGV4IHZlY3RvciBjb250ZW50LlxuXHQgKlxuXHQgKiA8cD5BbGwgdmVjdG9yIGRhdGEgZm9yIGEgZGlzcGxheSBvYmplY3QgdGhhdCBoYXMgYSBjYWNoZWQgYml0bWFwIGlzIGRyYXduXG5cdCAqIHRvIHRoZSBiaXRtYXAgaW5zdGVhZCBvZiB0aGUgbWFpbiBkaXNwbGF5LiBJZlxuXHQgKiA8Y29kZT5jYWNoZUFzQml0bWFwTWF0cml4PC9jb2RlPiBpcyBudWxsIG9yIHVuc3VwcG9ydGVkLCB0aGUgYml0bWFwIGlzXG5cdCAqIHRoZW4gY29waWVkIHRvIHRoZSBtYWluIGRpc3BsYXkgYXMgdW5zdHJldGNoZWQsIHVucm90YXRlZCBwaXhlbHMgc25hcHBlZFxuXHQgKiB0byB0aGUgbmVhcmVzdCBwaXhlbCBib3VuZGFyaWVzLiBQaXhlbHMgYXJlIG1hcHBlZCAxIHRvIDEgd2l0aCB0aGUgcGFyZW50XG5cdCAqIG9iamVjdC4gSWYgdGhlIGJvdW5kcyBvZiB0aGUgYml0bWFwIGNoYW5nZSwgdGhlIGJpdG1hcCBpcyByZWNyZWF0ZWRcblx0ICogaW5zdGVhZCBvZiBiZWluZyBzdHJldGNoZWQuPC9wPlxuXHQgKlxuXHQgKiA8cD5JZiA8Y29kZT5jYWNoZUFzQml0bWFwTWF0cml4PC9jb2RlPiBpcyBub24tbnVsbCBhbmQgc3VwcG9ydGVkLCB0aGVcblx0ICogb2JqZWN0IGlzIGRyYXduIHRvIHRoZSBvZmYtc2NyZWVuIGJpdG1hcCB1c2luZyB0aGF0IG1hdHJpeCBhbmQgdGhlXG5cdCAqIHN0cmV0Y2hlZCBhbmQvb3Igcm90YXRlZCByZXN1bHRzIG9mIHRoYXQgcmVuZGVyaW5nIGFyZSB1c2VkIHRvIGRyYXcgdGhlXG5cdCAqIG9iamVjdCB0byB0aGUgbWFpbiBkaXNwbGF5LjwvcD5cblx0ICpcblx0ICogPHA+Tm8gaW50ZXJuYWwgYml0bWFwIGlzIGNyZWF0ZWQgdW5sZXNzIHRoZSA8Y29kZT5jYWNoZUFzQml0bWFwPC9jb2RlPlxuXHQgKiBwcm9wZXJ0eSBpcyBzZXQgdG8gPGNvZGU+dHJ1ZTwvY29kZT4uPC9wPlxuXHQgKlxuXHQgKiA8cD5BZnRlciB5b3Ugc2V0IHRoZSA8Y29kZT5jYWNoZUFzQml0bWFwPC9jb2RlPiBwcm9wZXJ0eSB0b1xuXHQgKiA8Y29kZT50cnVlPC9jb2RlPiwgdGhlIHJlbmRlcmluZyBkb2VzIG5vdCBjaGFuZ2UsIGhvd2V2ZXIgdGhlIGRpc3BsYXlcblx0ICogb2JqZWN0IHBlcmZvcm1zIHBpeGVsIHNuYXBwaW5nIGF1dG9tYXRpY2FsbHkuIFRoZSBhbmltYXRpb24gc3BlZWQgY2FuIGJlXG5cdCAqIHNpZ25pZmljYW50bHkgZmFzdGVyIGRlcGVuZGluZyBvbiB0aGUgY29tcGxleGl0eSBvZiB0aGUgdmVjdG9yIGNvbnRlbnQuXG5cdCAqIDwvcD5cblx0ICpcblx0ICogPHA+VGhlIDxjb2RlPmNhY2hlQXNCaXRtYXA8L2NvZGU+IHByb3BlcnR5IGlzIGF1dG9tYXRpY2FsbHkgc2V0IHRvXG5cdCAqIDxjb2RlPnRydWU8L2NvZGU+IHdoZW5ldmVyIHlvdSBhcHBseSBhIGZpbHRlciB0byBhIGRpc3BsYXkgb2JqZWN0KHdoZW5cblx0ICogaXRzIDxjb2RlPmZpbHRlcjwvY29kZT4gYXJyYXkgaXMgbm90IGVtcHR5KSwgYW5kIGlmIGEgZGlzcGxheSBvYmplY3QgaGFzIGFcblx0ICogZmlsdGVyIGFwcGxpZWQgdG8gaXQsIDxjb2RlPmNhY2hlQXNCaXRtYXA8L2NvZGU+IGlzIHJlcG9ydGVkIGFzXG5cdCAqIDxjb2RlPnRydWU8L2NvZGU+IGZvciB0aGF0IGRpc3BsYXkgb2JqZWN0LCBldmVuIGlmIHlvdSBzZXQgdGhlIHByb3BlcnR5IHRvXG5cdCAqIDxjb2RlPmZhbHNlPC9jb2RlPi4gSWYgeW91IGNsZWFyIGFsbCBmaWx0ZXJzIGZvciBhIGRpc3BsYXkgb2JqZWN0LCB0aGVcblx0ICogPGNvZGU+Y2FjaGVBc0JpdG1hcDwvY29kZT4gc2V0dGluZyBjaGFuZ2VzIHRvIHdoYXQgaXQgd2FzIGxhc3Qgc2V0IHRvLjwvcD5cblx0ICpcblx0ICogPHA+QSBkaXNwbGF5IG9iamVjdCBkb2VzIG5vdCB1c2UgYSBiaXRtYXAgZXZlbiBpZiB0aGVcblx0ICogPGNvZGU+Y2FjaGVBc0JpdG1hcDwvY29kZT4gcHJvcGVydHkgaXMgc2V0IHRvIDxjb2RlPnRydWU8L2NvZGU+IGFuZFxuXHQgKiBpbnN0ZWFkIHJlbmRlcnMgZnJvbSB2ZWN0b3IgZGF0YSBpbiB0aGUgZm9sbG93aW5nIGNhc2VzOjwvcD5cblx0ICpcblx0ICogPHVsPlxuXHQgKiAgIDxsaT5UaGUgYml0bWFwIGlzIHRvbyBsYXJnZS4gSW4gQUlSIDEuNSBhbmQgRmxhc2ggUGxheWVyIDEwLCB0aGUgbWF4aW11bVxuXHQgKiBzaXplIGZvciBhIGJpdG1hcCBpbWFnZSBpcyA4LDE5MSBwaXhlbHMgaW4gd2lkdGggb3IgaGVpZ2h0LCBhbmQgdGhlIHRvdGFsXG5cdCAqIG51bWJlciBvZiBwaXhlbHMgY2Fubm90IGV4Y2VlZCAxNiw3NzcsMjE1IHBpeGVscy4oU28sIGlmIGEgYml0bWFwIGltYWdlXG5cdCAqIGlzIDgsMTkxIHBpeGVscyB3aWRlLCBpdCBjYW4gb25seSBiZSAyLDA0OCBwaXhlbHMgaGlnaC4pIEluIEZsYXNoIFBsYXllciA5XG5cdCAqIGFuZCBlYXJsaWVyLCB0aGUgbGltaXRhdGlvbiBpcyBpcyAyODgwIHBpeGVscyBpbiBoZWlnaHQgYW5kIDIsODgwIHBpeGVsc1xuXHQgKiBpbiB3aWR0aC48L2xpPlxuXHQgKiAgIDxsaT5UaGUgYml0bWFwIGZhaWxzIHRvIGFsbG9jYXRlKG91dCBvZiBtZW1vcnkgZXJyb3IpLiA8L2xpPlxuXHQgKiA8L3VsPlxuXHQgKlxuXHQgKiA8cD5UaGUgPGNvZGU+Y2FjaGVBc0JpdG1hcDwvY29kZT4gcHJvcGVydHkgaXMgYmVzdCB1c2VkIHdpdGggbW92aWUgY2xpcHNcblx0ICogdGhhdCBoYXZlIG1vc3RseSBzdGF0aWMgY29udGVudCBhbmQgdGhhdCBkbyBub3Qgc2NhbGUgYW5kIHJvdGF0ZVxuXHQgKiBmcmVxdWVudGx5LiBXaXRoIHN1Y2ggbW92aWUgY2xpcHMsIDxjb2RlPmNhY2hlQXNCaXRtYXA8L2NvZGU+IGNhbiBsZWFkIHRvXG5cdCAqIHBlcmZvcm1hbmNlIGluY3JlYXNlcyB3aGVuIHRoZSBtb3ZpZSBjbGlwIGlzIHRyYW5zbGF0ZWQod2hlbiBpdHMgPGk+eDwvaT5cblx0ICogYW5kIDxpPnk8L2k+IHBvc2l0aW9uIGlzIGNoYW5nZWQpLjwvcD5cblx0ICovXG5cdHB1YmxpYyBjYWNoZUFzQml0bWFwOmJvb2xlYW47XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgY2FzdHNTaGFkb3dzOmJvb2xlYW4gPSB0cnVlO1xuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgdGhlIGRlcHRoIG9mIHRoZSBkaXNwbGF5IG9iamVjdCwgaW4gcGl4ZWxzLiBUaGUgZGVwdGggaXNcblx0ICogY2FsY3VsYXRlZCBiYXNlZCBvbiB0aGUgYm91bmRzIG9mIHRoZSBjb250ZW50IG9mIHRoZSBkaXNwbGF5IG9iamVjdC4gV2hlblxuXHQgKiB5b3Ugc2V0IHRoZSA8Y29kZT5kZXB0aDwvY29kZT4gcHJvcGVydHksIHRoZSA8Y29kZT5zY2FsZVo8L2NvZGU+IHByb3BlcnR5XG5cdCAqIGlzIGFkanVzdGVkIGFjY29yZGluZ2x5LCBhcyBzaG93biBpbiB0aGUgZm9sbG93aW5nIGNvZGU6XG5cdCAqXG5cdCAqIDxwPkV4Y2VwdCBmb3IgVGV4dEZpZWxkIGFuZCBWaWRlbyBvYmplY3RzLCBhIGRpc3BsYXkgb2JqZWN0IHdpdGggbm9cblx0ICogY29udGVudCAoc3VjaCBhcyBhbiBlbXB0eSBzcHJpdGUpIGhhcyBhIGRlcHRoIG9mIDAsIGV2ZW4gaWYgeW91IHRyeSB0b1xuXHQgKiBzZXQgPGNvZGU+ZGVwdGg8L2NvZGU+IHRvIGEgZGlmZmVyZW50IHZhbHVlLjwvcD5cblx0ICovXG5cdHB1YmxpYyBnZXQgZGVwdGgoKTpudW1iZXJcblx0e1xuXHRcdGlmICh0aGlzLl9wQm91bmRzSW52YWxpZClcblx0XHRcdHRoaXMucFVwZGF0ZUJvdW5kcygpO1xuXG5cdFx0cmV0dXJuIHRoaXMuX2RlcHRoO1xuXHR9XG5cblx0cHVibGljIHNldCBkZXB0aCh2YWw6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2RlcHRoID09IHZhbClcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX2RlcHRoID09IHZhbDtcblxuXHRcdHRoaXMuX3BTY2FsZVogPSB2YWwvdGhpcy5ib3VuZHMuYWFiYi5kZXB0aDtcblxuXHRcdHRoaXMuaW52YWxpZGF0ZVNjYWxlKCk7XG5cdH1cblxuXHQvKipcblx0ICogRGVmaW5lcyB0aGUgcm90YXRpb24gb2YgdGhlIDNkIG9iamVjdCBhcyBhIDxjb2RlPlZlY3RvcjNEPC9jb2RlPiBvYmplY3QgY29udGFpbmluZyBldWxlciBhbmdsZXMgZm9yIHJvdGF0aW9uIGFyb3VuZCB4LCB5IGFuZCB6IGF4aXMuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGV1bGVycygpOlZlY3RvcjNEXG5cdHtcblx0XHR0aGlzLl9ldWxlcnMueCA9IHRoaXMuX3JvdGF0aW9uWCpNYXRoQ29uc3RzLlJBRElBTlNfVE9fREVHUkVFUztcblx0XHR0aGlzLl9ldWxlcnMueSA9IHRoaXMuX3JvdGF0aW9uWSpNYXRoQ29uc3RzLlJBRElBTlNfVE9fREVHUkVFUztcblx0XHR0aGlzLl9ldWxlcnMueiA9IHRoaXMuX3JvdGF0aW9uWipNYXRoQ29uc3RzLlJBRElBTlNfVE9fREVHUkVFUztcblxuXHRcdHJldHVybiB0aGlzLl9ldWxlcnM7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGV1bGVycyh2YWx1ZTpWZWN0b3IzRClcblx0e1xuXHRcdHRoaXMuX3JvdGF0aW9uWCA9IHZhbHVlLngqTWF0aENvbnN0cy5ERUdSRUVTX1RPX1JBRElBTlM7XG5cdFx0dGhpcy5fcm90YXRpb25ZID0gdmFsdWUueSpNYXRoQ29uc3RzLkRFR1JFRVNfVE9fUkFESUFOUztcblx0XHR0aGlzLl9yb3RhdGlvblogPSB2YWx1ZS56Kk1hdGhDb25zdHMuREVHUkVFU19UT19SQURJQU5TO1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlUm90YXRpb24oKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBbiBvYmplY3QgdGhhdCBjYW4gY29udGFpbiBhbnkgZXh0cmEgZGF0YS5cblx0ICovXG5cdHB1YmxpYyBleHRyYTpPYmplY3Q7XG5cblx0LyoqXG5cdCAqIEFuIGluZGV4ZWQgYXJyYXkgdGhhdCBjb250YWlucyBlYWNoIGZpbHRlciBvYmplY3QgY3VycmVudGx5IGFzc29jaWF0ZWRcblx0ICogd2l0aCB0aGUgZGlzcGxheSBvYmplY3QuIFRoZSBmbGFzaC5maWx0ZXJzIHBhY2thZ2UgY29udGFpbnMgc2V2ZXJhbFxuXHQgKiBjbGFzc2VzIHRoYXQgZGVmaW5lIHNwZWNpZmljIGZpbHRlcnMgeW91IGNhbiB1c2UuXG5cdCAqXG5cdCAqIDxwPkZpbHRlcnMgY2FuIGJlIGFwcGxpZWQgaW4gRmxhc2ggUHJvZmVzc2lvbmFsIGF0IGRlc2lnbiB0aW1lLCBvciBhdCBydW5cblx0ICogdGltZSBieSB1c2luZyBBY3Rpb25TY3JpcHQgY29kZS4gVG8gYXBwbHkgYSBmaWx0ZXIgYnkgdXNpbmcgQWN0aW9uU2NyaXB0LFxuXHQgKiB5b3UgbXVzdCBtYWtlIGEgdGVtcG9yYXJ5IGNvcHkgb2YgdGhlIGVudGlyZSA8Y29kZT5maWx0ZXJzPC9jb2RlPiBhcnJheSxcblx0ICogbW9kaWZ5IHRoZSB0ZW1wb3JhcnkgYXJyYXksIHRoZW4gYXNzaWduIHRoZSB2YWx1ZSBvZiB0aGUgdGVtcG9yYXJ5IGFycmF5XG5cdCAqIGJhY2sgdG8gdGhlIDxjb2RlPmZpbHRlcnM8L2NvZGU+IGFycmF5LiBZb3UgY2Fubm90IGRpcmVjdGx5IGFkZCBhIG5ld1xuXHQgKiBmaWx0ZXIgb2JqZWN0IHRvIHRoZSA8Y29kZT5maWx0ZXJzPC9jb2RlPiBhcnJheS48L3A+XG5cdCAqXG5cdCAqIDxwPlRvIGFkZCBhIGZpbHRlciBieSB1c2luZyBBY3Rpb25TY3JpcHQsIHBlcmZvcm0gdGhlIGZvbGxvd2luZyBzdGVwc1xuXHQgKiAoYXNzdW1lIHRoYXQgdGhlIHRhcmdldCBkaXNwbGF5IG9iamVjdCBpcyBuYW1lZFxuXHQgKiA8Y29kZT5teURpc3BsYXlPYmplY3Q8L2NvZGU+KTo8L3A+XG5cdCAqXG5cdCAqIDxvbD5cblx0ICogICA8bGk+Q3JlYXRlIGEgbmV3IGZpbHRlciBvYmplY3QgYnkgdXNpbmcgdGhlIGNvbnN0cnVjdG9yIG1ldGhvZCBvZiB5b3VyXG5cdCAqIGNob3NlbiBmaWx0ZXIgY2xhc3MuPC9saT5cblx0ICogICA8bGk+QXNzaWduIHRoZSB2YWx1ZSBvZiB0aGUgPGNvZGU+bXlEaXNwbGF5T2JqZWN0LmZpbHRlcnM8L2NvZGU+IGFycmF5XG5cdCAqIHRvIGEgdGVtcG9yYXJ5IGFycmF5LCBzdWNoIGFzIG9uZSBuYW1lZCA8Y29kZT5teUZpbHRlcnM8L2NvZGU+LjwvbGk+XG5cdCAqICAgPGxpPkFkZCB0aGUgbmV3IGZpbHRlciBvYmplY3QgdG8gdGhlIDxjb2RlPm15RmlsdGVyczwvY29kZT4gdGVtcG9yYXJ5XG5cdCAqIGFycmF5LjwvbGk+XG5cdCAqICAgPGxpPkFzc2lnbiB0aGUgdmFsdWUgb2YgdGhlIHRlbXBvcmFyeSBhcnJheSB0byB0aGVcblx0ICogPGNvZGU+bXlEaXNwbGF5T2JqZWN0LmZpbHRlcnM8L2NvZGU+IGFycmF5LjwvbGk+XG5cdCAqIDwvb2w+XG5cdCAqXG5cdCAqIDxwPklmIHRoZSA8Y29kZT5maWx0ZXJzPC9jb2RlPiBhcnJheSBpcyB1bmRlZmluZWQsIHlvdSBkbyBub3QgbmVlZCB0byB1c2Vcblx0ICogYSB0ZW1wb3JhcnkgYXJyYXkuIEluc3RlYWQsIHlvdSBjYW4gZGlyZWN0bHkgYXNzaWduIGFuIGFycmF5IGxpdGVyYWwgdGhhdFxuXHQgKiBjb250YWlucyBvbmUgb3IgbW9yZSBmaWx0ZXIgb2JqZWN0cyB0aGF0IHlvdSBjcmVhdGUuIFRoZSBmaXJzdCBleGFtcGxlIGluXG5cdCAqIHRoZSBFeGFtcGxlcyBzZWN0aW9uIGFkZHMgYSBkcm9wIHNoYWRvdyBmaWx0ZXIgYnkgdXNpbmcgY29kZSB0aGF0IGhhbmRsZXNcblx0ICogYm90aCBkZWZpbmVkIGFuZCB1bmRlZmluZWQgPGNvZGU+ZmlsdGVyczwvY29kZT4gYXJyYXlzLjwvcD5cblx0ICpcblx0ICogPHA+VG8gbW9kaWZ5IGFuIGV4aXN0aW5nIGZpbHRlciBvYmplY3QsIHlvdSBtdXN0IHVzZSB0aGUgdGVjaG5pcXVlIG9mXG5cdCAqIG1vZGlmeWluZyBhIGNvcHkgb2YgdGhlIDxjb2RlPmZpbHRlcnM8L2NvZGU+IGFycmF5OjwvcD5cblx0ICpcblx0ICogPG9sPlxuXHQgKiAgIDxsaT5Bc3NpZ24gdGhlIHZhbHVlIG9mIHRoZSA8Y29kZT5maWx0ZXJzPC9jb2RlPiBhcnJheSB0byBhIHRlbXBvcmFyeVxuXHQgKiBhcnJheSwgc3VjaCBhcyBvbmUgbmFtZWQgPGNvZGU+bXlGaWx0ZXJzPC9jb2RlPi48L2xpPlxuXHQgKiAgIDxsaT5Nb2RpZnkgdGhlIHByb3BlcnR5IGJ5IHVzaW5nIHRoZSB0ZW1wb3JhcnkgYXJyYXksXG5cdCAqIDxjb2RlPm15RmlsdGVyczwvY29kZT4uIEZvciBleGFtcGxlLCB0byBzZXQgdGhlIHF1YWxpdHkgcHJvcGVydHkgb2YgdGhlXG5cdCAqIGZpcnN0IGZpbHRlciBpbiB0aGUgYXJyYXksIHlvdSBjb3VsZCB1c2UgdGhlIGZvbGxvd2luZyBjb2RlOlxuXHQgKiA8Y29kZT5teUZpbHRlcnNbMF0ucXVhbGl0eSA9IDE7PC9jb2RlPjwvbGk+XG5cdCAqICAgPGxpPkFzc2lnbiB0aGUgdmFsdWUgb2YgdGhlIHRlbXBvcmFyeSBhcnJheSB0byB0aGUgPGNvZGU+ZmlsdGVyczwvY29kZT5cblx0ICogYXJyYXkuPC9saT5cblx0ICogPC9vbD5cblx0ICpcblx0ICogPHA+QXQgbG9hZCB0aW1lLCBpZiBhIGRpc3BsYXkgb2JqZWN0IGhhcyBhbiBhc3NvY2lhdGVkIGZpbHRlciwgaXQgaXNcblx0ICogbWFya2VkIHRvIGNhY2hlIGl0c2VsZiBhcyBhIHRyYW5zcGFyZW50IGJpdG1hcC4gRnJvbSB0aGlzIHBvaW50IGZvcndhcmQsXG5cdCAqIGFzIGxvbmcgYXMgdGhlIGRpc3BsYXkgb2JqZWN0IGhhcyBhIHZhbGlkIGZpbHRlciBsaXN0LCB0aGUgcGxheWVyIGNhY2hlc1xuXHQgKiB0aGUgZGlzcGxheSBvYmplY3QgYXMgYSBiaXRtYXAuIFRoaXMgc291cmNlIGJpdG1hcCBpcyB1c2VkIGFzIGEgc291cmNlXG5cdCAqIGltYWdlIGZvciB0aGUgZmlsdGVyIGVmZmVjdHMuIEVhY2ggZGlzcGxheSBvYmplY3QgdXN1YWxseSBoYXMgdHdvIGJpdG1hcHM6XG5cdCAqIG9uZSB3aXRoIHRoZSBvcmlnaW5hbCB1bmZpbHRlcmVkIHNvdXJjZSBkaXNwbGF5IG9iamVjdCBhbmQgYW5vdGhlciBmb3IgdGhlXG5cdCAqIGZpbmFsIGltYWdlIGFmdGVyIGZpbHRlcmluZy4gVGhlIGZpbmFsIGltYWdlIGlzIHVzZWQgd2hlbiByZW5kZXJpbmcuIEFzXG5cdCAqIGxvbmcgYXMgdGhlIGRpc3BsYXkgb2JqZWN0IGRvZXMgbm90IGNoYW5nZSwgdGhlIGZpbmFsIGltYWdlIGRvZXMgbm90IG5lZWRcblx0ICogdXBkYXRpbmcuPC9wPlxuXHQgKlxuXHQgKiA8cD5UaGUgZmxhc2guZmlsdGVycyBwYWNrYWdlIGluY2x1ZGVzIGNsYXNzZXMgZm9yIGZpbHRlcnMuIEZvciBleGFtcGxlLCB0b1xuXHQgKiBjcmVhdGUgYSBEcm9wU2hhZG93IGZpbHRlciwgeW91IHdvdWxkIHdyaXRlOjwvcD5cblx0ICpcblx0ICogQHRocm93cyBBcmd1bWVudEVycm9yIFdoZW4gPGNvZGU+ZmlsdGVyczwvY29kZT4gaW5jbHVkZXMgYSBTaGFkZXJGaWx0ZXJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIGFuZCB0aGUgc2hhZGVyIG91dHB1dCB0eXBlIGlzIG5vdCBjb21wYXRpYmxlIHdpdGhcblx0ICogICAgICAgICAgICAgICAgICAgICAgIHRoaXMgb3BlcmF0aW9uKHRoZSBzaGFkZXIgbXVzdCBzcGVjaWZ5IGFcblx0ICogICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPnBpeGVsNDwvY29kZT4gb3V0cHV0KS5cblx0ICogQHRocm93cyBBcmd1bWVudEVycm9yIFdoZW4gPGNvZGU+ZmlsdGVyczwvY29kZT4gaW5jbHVkZXMgYSBTaGFkZXJGaWx0ZXJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIGFuZCB0aGUgc2hhZGVyIGRvZXNuJ3Qgc3BlY2lmeSBhbnkgaW1hZ2UgaW5wdXQgb3Jcblx0ICogICAgICAgICAgICAgICAgICAgICAgIHRoZSBmaXJzdCBpbnB1dCBpcyBub3QgYW4gPGNvZGU+aW1hZ2U0PC9jb2RlPiBpbnB1dC5cblx0ICogQHRocm93cyBBcmd1bWVudEVycm9yIFdoZW4gPGNvZGU+ZmlsdGVyczwvY29kZT4gaW5jbHVkZXMgYSBTaGFkZXJGaWx0ZXJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIGFuZCB0aGUgc2hhZGVyIHNwZWNpZmllcyBhbiBpbWFnZSBpbnB1dCB0aGF0IGlzbid0XG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlZC5cblx0ICogQHRocm93cyBBcmd1bWVudEVycm9yIFdoZW4gPGNvZGU+ZmlsdGVyczwvY29kZT4gaW5jbHVkZXMgYSBTaGFkZXJGaWx0ZXIsIGFcblx0ICogICAgICAgICAgICAgICAgICAgICAgIEJ5dGVBcnJheSBvciBWZWN0b3IuPE51bWJlcj4gaW5zdGFuY2UgYXMgYSBzaGFkZXJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIGlucHV0LCBhbmQgdGhlIDxjb2RlPndpZHRoPC9jb2RlPiBhbmRcblx0ICogICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPmhlaWdodDwvY29kZT4gcHJvcGVydGllcyBhcmVuJ3Qgc3BlY2lmaWVkIGZvclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgdGhlIFNoYWRlcklucHV0IG9iamVjdCwgb3IgdGhlIHNwZWNpZmllZCB2YWx1ZXNcblx0ICogICAgICAgICAgICAgICAgICAgICAgIGRvbid0IG1hdGNoIHRoZSBhbW91bnQgb2YgZGF0YSBpbiB0aGUgaW5wdXQgZGF0YS5cblx0ICogICAgICAgICAgICAgICAgICAgICAgIFNlZSB0aGUgPGNvZGU+U2hhZGVySW5wdXQuaW5wdXQ8L2NvZGU+IHByb3BlcnR5IGZvclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgbW9yZSBpbmZvcm1hdGlvbi5cblx0ICovXG4vL1x0XHRwdWJsaWMgZmlsdGVyczpBcnJheTxEeW5hbWljPjtcblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHRoZSBoZWlnaHQgb2YgdGhlIGRpc3BsYXkgb2JqZWN0LCBpbiBwaXhlbHMuIFRoZSBoZWlnaHQgaXNcblx0ICogY2FsY3VsYXRlZCBiYXNlZCBvbiB0aGUgYm91bmRzIG9mIHRoZSBjb250ZW50IG9mIHRoZSBkaXNwbGF5IG9iamVjdC4gV2hlblxuXHQgKiB5b3Ugc2V0IHRoZSA8Y29kZT5oZWlnaHQ8L2NvZGU+IHByb3BlcnR5LCB0aGUgPGNvZGU+c2NhbGVZPC9jb2RlPiBwcm9wZXJ0eVxuXHQgKiBpcyBhZGp1c3RlZCBhY2NvcmRpbmdseSwgYXMgc2hvd24gaW4gdGhlIGZvbGxvd2luZyBjb2RlOlxuXHQgKlxuXHQgKiA8cD5FeGNlcHQgZm9yIFRleHRGaWVsZCBhbmQgVmlkZW8gb2JqZWN0cywgYSBkaXNwbGF5IG9iamVjdCB3aXRoIG5vXG5cdCAqIGNvbnRlbnQgKHN1Y2ggYXMgYW4gZW1wdHkgc3ByaXRlKSBoYXMgYSBoZWlnaHQgb2YgMCwgZXZlbiBpZiB5b3UgdHJ5IHRvXG5cdCAqIHNldCA8Y29kZT5oZWlnaHQ8L2NvZGU+IHRvIGEgZGlmZmVyZW50IHZhbHVlLjwvcD5cblx0ICovXG5cdHB1YmxpYyBnZXQgaGVpZ2h0KCk6bnVtYmVyXG5cdHtcblx0XHRpZiAodGhpcy5fcEJvdW5kc0ludmFsaWQpXG5cdFx0XHR0aGlzLnBVcGRhdGVCb3VuZHMoKTtcblxuXHRcdHJldHVybiB0aGlzLl9oZWlnaHQ7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGhlaWdodCh2YWw6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2hlaWdodCA9PSB2YWwpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9oZWlnaHQgPT0gdmFsO1xuXG5cdFx0dGhpcy5fcFNjYWxlWSA9IHZhbC90aGlzLmJvdW5kcy5hYWJiLmhlaWdodDtcblxuXHRcdHRoaXMuaW52YWxpZGF0ZVNjYWxlKCk7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHRoZSBpbnN0YW5jZSBjb250YWluZXIgaW5kZXggb2YgdGhlIERpc3BsYXlPYmplY3QuIFRoZSBvYmplY3QgY2FuIGJlXG5cdCAqIGlkZW50aWZpZWQgaW4gdGhlIGNoaWxkIGxpc3Qgb2YgaXRzIHBhcmVudCBkaXNwbGF5IG9iamVjdCBjb250YWluZXIgYnlcblx0ICogY2FsbGluZyB0aGUgPGNvZGU+Z2V0Q2hpbGRCeUluZGV4KCk8L2NvZGU+IG1ldGhvZCBvZiB0aGUgZGlzcGxheSBvYmplY3Rcblx0ICogY29udGFpbmVyLlxuXHQgKlxuXHQgKiA8cD5JZiB0aGUgRGlzcGxheU9iamVjdCBoYXMgbm8gcGFyZW50IGNvbnRhaW5lciwgaW5kZXggZGVmYXVsdHMgdG8gMC48L3A+XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGluZGV4KCk6bnVtYmVyXG5cdHtcblx0XHRpZiAodGhpcy5fcFBhcmVudClcblx0XHRcdHJldHVybiB0aGlzLl9wUGFyZW50LmdldENoaWxkSW5kZXgodGhpcyk7XG5cblx0XHRyZXR1cm4gMDtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBpbnZlcnNlU2NlbmVUcmFuc2Zvcm0oKTpNYXRyaXgzRFxuXHR7XG5cdFx0aWYgKHRoaXMuX2ludmVyc2VTY2VuZVRyYW5zZm9ybURpcnR5KSB7XG5cdFx0XHR0aGlzLl9pbnZlcnNlU2NlbmVUcmFuc2Zvcm0uY29weUZyb20odGhpcy5zY2VuZVRyYW5zZm9ybSk7XG5cdFx0XHR0aGlzLl9pbnZlcnNlU2NlbmVUcmFuc2Zvcm0uaW52ZXJ0KCk7XG5cdFx0XHR0aGlzLl9pbnZlcnNlU2NlbmVUcmFuc2Zvcm1EaXJ0eSA9IGZhbHNlO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5faW52ZXJzZVNjZW5lVHJhbnNmb3JtO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGlnbm9yZVRyYW5zZm9ybSgpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9wSWdub3JlVHJhbnNmb3JtO1xuXHR9XG5cblx0cHVibGljIHNldCBpZ25vcmVUcmFuc2Zvcm0odmFsdWU6Ym9vbGVhbilcblx0e1xuXHRcdGlmICh0aGlzLl9wSWdub3JlVHJhbnNmb3JtID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fcElnbm9yZVRyYW5zZm9ybSA9IHZhbHVlO1xuXG5cdFx0aWYgKHZhbHVlKSB7XG5cdFx0XHR0aGlzLl9wU2NlbmVUcmFuc2Zvcm0uaWRlbnRpdHkoKTtcblx0XHRcdHRoaXMuX3NjZW5lUG9zaXRpb24uc2V0VG8oMCwgMCwgMCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5wSW52YWxpZGF0ZVNjZW5lVHJhbnNmb3JtKCk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgaXNFbnRpdHkoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BJc0VudGl0eTtcblx0fVxuXHQvKipcblx0ICogUmV0dXJucyBhIExvYWRlckluZm8gb2JqZWN0IGNvbnRhaW5pbmcgaW5mb3JtYXRpb24gYWJvdXQgbG9hZGluZyB0aGUgZmlsZVxuXHQgKiB0byB3aGljaCB0aGlzIGRpc3BsYXkgb2JqZWN0IGJlbG9uZ3MuIFRoZSA8Y29kZT5sb2FkZXJJbmZvPC9jb2RlPiBwcm9wZXJ0eVxuXHQgKiBpcyBkZWZpbmVkIG9ubHkgZm9yIHRoZSByb290IGRpc3BsYXkgb2JqZWN0IG9mIGEgU1dGIGZpbGUgb3IgZm9yIGEgbG9hZGVkXG5cdCAqIEJpdG1hcChub3QgZm9yIGEgQml0bWFwIHRoYXQgaXMgZHJhd24gd2l0aCBBY3Rpb25TY3JpcHQpLiBUbyBmaW5kIHRoZVxuXHQgKiA8Y29kZT5sb2FkZXJJbmZvPC9jb2RlPiBvYmplY3QgYXNzb2NpYXRlZCB3aXRoIHRoZSBTV0YgZmlsZSB0aGF0IGNvbnRhaW5zXG5cdCAqIGEgZGlzcGxheSBvYmplY3QgbmFtZWQgPGNvZGU+bXlEaXNwbGF5T2JqZWN0PC9jb2RlPiwgdXNlXG5cdCAqIDxjb2RlPm15RGlzcGxheU9iamVjdC5yb290LmxvYWRlckluZm88L2NvZGU+LlxuXHQgKlxuXHQgKiA8cD5BIGxhcmdlIFNXRiBmaWxlIGNhbiBtb25pdG9yIGl0cyBkb3dubG9hZCBieSBjYWxsaW5nXG5cdCAqIDxjb2RlPnRoaXMucm9vdC5sb2FkZXJJbmZvLmFkZEV2ZW50TGlzdGVuZXIoRXZlbnQuQ09NUExFVEUsXG5cdCAqIGZ1bmMpPC9jb2RlPi48L3A+XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGxvYWRlckluZm8oKTpMb2FkZXJJbmZvXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fbG9hZGVySW5mbztcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgY2FsbGluZyBkaXNwbGF5IG9iamVjdCBpcyBtYXNrZWQgYnkgdGhlIHNwZWNpZmllZCA8Y29kZT5tYXNrPC9jb2RlPlxuXHQgKiBvYmplY3QuIFRvIGVuc3VyZSB0aGF0IG1hc2tpbmcgd29ya3Mgd2hlbiB0aGUgU3RhZ2UgaXMgc2NhbGVkLCB0aGVcblx0ICogPGNvZGU+bWFzazwvY29kZT4gZGlzcGxheSBvYmplY3QgbXVzdCBiZSBpbiBhbiBhY3RpdmUgcGFydCBvZiB0aGUgZGlzcGxheVxuXHQgKiBsaXN0LiBUaGUgPGNvZGU+bWFzazwvY29kZT4gb2JqZWN0IGl0c2VsZiBpcyBub3QgZHJhd24uIFNldFxuXHQgKiA8Y29kZT5tYXNrPC9jb2RlPiB0byA8Y29kZT5udWxsPC9jb2RlPiB0byByZW1vdmUgdGhlIG1hc2suXG5cdCAqXG5cdCAqIDxwPlRvIGJlIGFibGUgdG8gc2NhbGUgYSBtYXNrIG9iamVjdCwgaXQgbXVzdCBiZSBvbiB0aGUgZGlzcGxheSBsaXN0LiBUb1xuXHQgKiBiZSBhYmxlIHRvIGRyYWcgYSBtYXNrIFNwcml0ZSBvYmplY3QoYnkgY2FsbGluZyBpdHNcblx0ICogPGNvZGU+c3RhcnREcmFnKCk8L2NvZGU+IG1ldGhvZCksIGl0IG11c3QgYmUgb24gdGhlIGRpc3BsYXkgbGlzdC4gVG8gY2FsbFxuXHQgKiB0aGUgPGNvZGU+c3RhcnREcmFnKCk8L2NvZGU+IG1ldGhvZCBmb3IgYSBtYXNrIHNwcml0ZSBiYXNlZCBvbiBhXG5cdCAqIDxjb2RlPm1vdXNlRG93bjwvY29kZT4gZXZlbnQgYmVpbmcgZGlzcGF0Y2hlZCBieSB0aGUgc3ByaXRlLCBzZXQgdGhlXG5cdCAqIHNwcml0ZSdzIDxjb2RlPmJ1dHRvbk1vZGU8L2NvZGU+IHByb3BlcnR5IHRvIDxjb2RlPnRydWU8L2NvZGU+LjwvcD5cblx0ICpcblx0ICogPHA+V2hlbiBkaXNwbGF5IG9iamVjdHMgYXJlIGNhY2hlZCBieSBzZXR0aW5nIHRoZVxuXHQgKiA8Y29kZT5jYWNoZUFzQml0bWFwPC9jb2RlPiBwcm9wZXJ0eSB0byA8Y29kZT50cnVlPC9jb2RlPiBhbiB0aGVcblx0ICogPGNvZGU+Y2FjaGVBc0JpdG1hcE1hdHJpeDwvY29kZT4gcHJvcGVydHkgdG8gYSBNYXRyaXggb2JqZWN0LCBib3RoIHRoZVxuXHQgKiBtYXNrIGFuZCB0aGUgZGlzcGxheSBvYmplY3QgYmVpbmcgbWFza2VkIG11c3QgYmUgcGFydCBvZiB0aGUgc2FtZSBjYWNoZWRcblx0ICogYml0bWFwLiBUaHVzLCBpZiB0aGUgZGlzcGxheSBvYmplY3QgaXMgY2FjaGVkLCB0aGVuIHRoZSBtYXNrIG11c3QgYmUgYVxuXHQgKiBjaGlsZCBvZiB0aGUgZGlzcGxheSBvYmplY3QuIElmIGFuIGFuY2VzdG9yIG9mIHRoZSBkaXNwbGF5IG9iamVjdCBvbiB0aGVcblx0ICogZGlzcGxheSBsaXN0IGlzIGNhY2hlZCwgdGhlbiB0aGUgbWFzayBtdXN0IGJlIGEgY2hpbGQgb2YgdGhhdCBhbmNlc3RvciBvclxuXHQgKiBvbmUgb2YgaXRzIGRlc2NlbmRlbnRzLiBJZiBtb3JlIHRoYW4gb25lIGFuY2VzdG9yIG9mIHRoZSBtYXNrZWQgb2JqZWN0IGlzXG5cdCAqIGNhY2hlZCwgdGhlbiB0aGUgbWFzayBtdXN0IGJlIGEgZGVzY2VuZGVudCBvZiB0aGUgY2FjaGVkIGNvbnRhaW5lciBjbG9zZXN0XG5cdCAqIHRvIHRoZSBtYXNrZWQgb2JqZWN0IGluIHRoZSBkaXNwbGF5IGxpc3QuPC9wPlxuXHQgKlxuXHQgKiA8cD48Yj5Ob3RlOjwvYj4gQSBzaW5nbGUgPGNvZGU+bWFzazwvY29kZT4gb2JqZWN0IGNhbm5vdCBiZSB1c2VkIHRvIG1hc2tcblx0ICogbW9yZSB0aGFuIG9uZSBjYWxsaW5nIGRpc3BsYXkgb2JqZWN0LiBXaGVuIHRoZSA8Y29kZT5tYXNrPC9jb2RlPiBpc1xuXHQgKiBhc3NpZ25lZCB0byBhIHNlY29uZCBkaXNwbGF5IG9iamVjdCwgaXQgaXMgcmVtb3ZlZCBhcyB0aGUgbWFzayBvZiB0aGVcblx0ICogZmlyc3Qgb2JqZWN0LCBhbmQgdGhhdCBvYmplY3QncyA8Y29kZT5tYXNrPC9jb2RlPiBwcm9wZXJ0eSBiZWNvbWVzXG5cdCAqIDxjb2RlPm51bGw8L2NvZGU+LjwvcD5cblx0ICovXG5cdHB1YmxpYyBtYXNrOkRpc3BsYXlPYmplY3Q7XG5cblx0LyoqXG5cdCAqIFNwZWNpZmllcyB3aGV0aGVyIHRoaXMgb2JqZWN0IHJlY2VpdmVzIG1vdXNlLCBvciBvdGhlciB1c2VyIGlucHV0LFxuXHQgKiBtZXNzYWdlcy4gVGhlIGRlZmF1bHQgdmFsdWUgaXMgPGNvZGU+dHJ1ZTwvY29kZT4sIHdoaWNoIG1lYW5zIHRoYXQgYnlcblx0ICogZGVmYXVsdCBhbnkgSW50ZXJhY3RpdmVPYmplY3QgaW5zdGFuY2UgdGhhdCBpcyBvbiB0aGUgZGlzcGxheSBsaXN0XG5cdCAqIHJlY2VpdmVzIG1vdXNlIGV2ZW50cyBvciBvdGhlciB1c2VyIGlucHV0IGV2ZW50cy4gSWZcblx0ICogPGNvZGU+bW91c2VFbmFibGVkPC9jb2RlPiBpcyBzZXQgdG8gPGNvZGU+ZmFsc2U8L2NvZGU+LCB0aGUgaW5zdGFuY2UgZG9lc1xuXHQgKiBub3QgcmVjZWl2ZSBhbnkgbW91c2UgZXZlbnRzKG9yIG90aGVyIHVzZXIgaW5wdXQgZXZlbnRzIGxpa2Uga2V5Ym9hcmRcblx0ICogZXZlbnRzKS4gQW55IGNoaWxkcmVuIG9mIHRoaXMgaW5zdGFuY2Ugb24gdGhlIGRpc3BsYXkgbGlzdCBhcmUgbm90XG5cdCAqIGFmZmVjdGVkLiBUbyBjaGFuZ2UgdGhlIDxjb2RlPm1vdXNlRW5hYmxlZDwvY29kZT4gYmVoYXZpb3IgZm9yIGFsbFxuXHQgKiBjaGlsZHJlbiBvZiBhbiBvYmplY3Qgb24gdGhlIGRpc3BsYXkgbGlzdCwgdXNlXG5cdCAqIDxjb2RlPmZsYXNoLmRpc3BsYXkuRGlzcGxheU9iamVjdENvbnRhaW5lci5tb3VzZUNoaWxkcmVuPC9jb2RlPi5cblx0ICpcblx0ICogPHA+IE5vIGV2ZW50IGlzIGRpc3BhdGNoZWQgYnkgc2V0dGluZyB0aGlzIHByb3BlcnR5LiBZb3UgbXVzdCB1c2UgdGhlXG5cdCAqIDxjb2RlPmFkZEV2ZW50TGlzdGVuZXIoKTwvY29kZT4gbWV0aG9kIHRvIGNyZWF0ZSBpbnRlcmFjdGl2ZVxuXHQgKiBmdW5jdGlvbmFsaXR5LjwvcD5cblx0ICovXG5cdHB1YmxpYyBnZXQgbW91c2VFbmFibGVkKCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2V4cGxpY2l0TW91c2VFbmFibGVkO1xuXHR9XG5cblx0cHVibGljIHNldCBtb3VzZUVuYWJsZWQodmFsdWU6Ym9vbGVhbilcblx0e1xuXHRcdGlmICh0aGlzLl9leHBsaWNpdE1vdXNlRW5hYmxlZCA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX2V4cGxpY2l0TW91c2VFbmFibGVkID0gdmFsdWU7XG5cblx0XHR0aGlzLl9wVXBkYXRlSW1wbGljaXRNb3VzZUVuYWJsZWQodGhpcy5fcFBhcmVudD8gdGhpcy5fcFBhcmVudC5tb3VzZUNoaWxkcmVuIDogdHJ1ZSk7XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgdGhlIHggY29vcmRpbmF0ZSBvZiB0aGUgbW91c2Ugb3IgdXNlciBpbnB1dCBkZXZpY2UgcG9zaXRpb24sIGluXG5cdCAqIHBpeGVscy5cblx0ICpcblx0ICogPHA+PGI+Tm90ZTwvYj46IEZvciBhIERpc3BsYXlPYmplY3QgdGhhdCBoYXMgYmVlbiByb3RhdGVkLCB0aGUgcmV0dXJuZWQgeFxuXHQgKiBjb29yZGluYXRlIHdpbGwgcmVmbGVjdCB0aGUgbm9uLXJvdGF0ZWQgb2JqZWN0LjwvcD5cblx0ICovXG5cdHB1YmxpYyBnZXQgbW91c2VYKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fbW91c2VYO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB0aGUgeSBjb29yZGluYXRlIG9mIHRoZSBtb3VzZSBvciB1c2VyIGlucHV0IGRldmljZSBwb3NpdGlvbiwgaW5cblx0ICogcGl4ZWxzLlxuXHQgKlxuXHQgKiA8cD48Yj5Ob3RlPC9iPjogRm9yIGEgRGlzcGxheU9iamVjdCB0aGF0IGhhcyBiZWVuIHJvdGF0ZWQsIHRoZSByZXR1cm5lZCB5XG5cdCAqIGNvb3JkaW5hdGUgd2lsbCByZWZsZWN0IHRoZSBub24tcm90YXRlZCBvYmplY3QuPC9wPlxuXHQgKi9cblx0cHVibGljIGdldCBtb3VzZVkoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9tb3VzZVk7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHRoZSBpbnN0YW5jZSBuYW1lIG9mIHRoZSBEaXNwbGF5T2JqZWN0LiBUaGUgb2JqZWN0IGNhbiBiZVxuXHQgKiBpZGVudGlmaWVkIGluIHRoZSBjaGlsZCBsaXN0IG9mIGl0cyBwYXJlbnQgZGlzcGxheSBvYmplY3QgY29udGFpbmVyIGJ5XG5cdCAqIGNhbGxpbmcgdGhlIDxjb2RlPmdldENoaWxkQnlOYW1lKCk8L2NvZGU+IG1ldGhvZCBvZiB0aGUgZGlzcGxheSBvYmplY3Rcblx0ICogY29udGFpbmVyLlxuXHQgKlxuXHQgKiBAdGhyb3dzIElsbGVnYWxPcGVyYXRpb25FcnJvciBJZiB5b3UgYXJlIGF0dGVtcHRpbmcgdG8gc2V0IHRoaXMgcHJvcGVydHlcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb24gYW4gb2JqZWN0IHRoYXQgd2FzIHBsYWNlZCBvbiB0aGUgdGltZWxpbmVcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW4gdGhlIEZsYXNoIGF1dGhvcmluZyB0b29sLlxuXHQgKi9cblx0cHVibGljIG5hbWU6c3RyaW5nO1xuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIG9yaWVudGF0aW9uTW9kZTpzdHJpbmcgPSBPcmllbnRhdGlvbk1vZGUuREVGQVVMVDtcblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHRoZSBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIG9iamVjdCB0aGF0IGNvbnRhaW5zIHRoaXMgZGlzcGxheVxuXHQgKiBvYmplY3QuIFVzZSB0aGUgPGNvZGU+cGFyZW50PC9jb2RlPiBwcm9wZXJ0eSB0byBzcGVjaWZ5IGEgcmVsYXRpdmUgcGF0aCB0b1xuXHQgKiBkaXNwbGF5IG9iamVjdHMgdGhhdCBhcmUgYWJvdmUgdGhlIGN1cnJlbnQgZGlzcGxheSBvYmplY3QgaW4gdGhlIGRpc3BsYXlcblx0ICogbGlzdCBoaWVyYXJjaHkuXG5cdCAqXG5cdCAqIDxwPllvdSBjYW4gdXNlIDxjb2RlPnBhcmVudDwvY29kZT4gdG8gbW92ZSB1cCBtdWx0aXBsZSBsZXZlbHMgaW4gdGhlXG5cdCAqIGRpc3BsYXkgbGlzdCBhcyBpbiB0aGUgZm9sbG93aW5nOjwvcD5cblx0ICpcblx0ICogQHRocm93cyBTZWN1cml0eUVycm9yIFRoZSBwYXJlbnQgZGlzcGxheSBvYmplY3QgYmVsb25ncyB0byBhIHNlY3VyaXR5XG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBzYW5kYm94IHRvIHdoaWNoIHlvdSBkbyBub3QgaGF2ZSBhY2Nlc3MuIFlvdSBjYW5cblx0ICogICAgICAgICAgICAgICAgICAgICAgIGF2b2lkIHRoaXMgc2l0dWF0aW9uIGJ5IGhhdmluZyB0aGUgcGFyZW50IG1vdmllIGNhbGxcblx0ICogICAgICAgICAgICAgICAgICAgICAgIHRoZSA8Y29kZT5TZWN1cml0eS5hbGxvd0RvbWFpbigpPC9jb2RlPiBtZXRob2QuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHBhcmVudCgpOkRpc3BsYXlPYmplY3RDb250YWluZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wUGFyZW50O1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHBhcnRpdGlvbigpOlBhcnRpdGlvblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2V4cGxpY2l0UGFydGl0aW9uO1xuXHR9XG5cblx0cHVibGljIHNldCBwYXJ0aXRpb24odmFsdWU6UGFydGl0aW9uKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2V4cGxpY2l0UGFydGl0aW9uID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0aWYgKHRoaXMuX3BTY2VuZSAmJiB0aGlzLl9leHBsaWNpdFBhcnRpdGlvbilcblx0XHRcdHRoaXMuX3BTY2VuZS5pVW5yZWdpc3RlclBhcnRpdGlvbih0aGlzLl9leHBsaWNpdFBhcnRpdGlvbik7XG5cblx0XHR0aGlzLl9leHBsaWNpdFBhcnRpdGlvbiA9IHZhbHVlO1xuXG5cdFx0aWYgKHRoaXMuX3BTY2VuZSAmJiB2YWx1ZSlcblx0XHRcdHRoaXMuX3BTY2VuZS5pUmVnaXN0ZXJQYXJ0aXRpb24odmFsdWUpO1xuXG5cdFx0dGhpcy5fcFVwZGF0ZUltcGxpY2l0UGFydGl0aW9uKHRoaXMuX3BQYXJlbnQ/IHRoaXMuX3BQYXJlbnQuX2lBc3NpZ25lZFBhcnRpdGlvbiA6IG51bGwpO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHBhcnRpdGlvbk5vZGUoKTpFbnRpdHlOb2RlXG5cdHtcblx0XHRpZiAoIXRoaXMuX3BhcnRpdGlvbk5vZGUpXG5cdFx0XHR0aGlzLl9wYXJ0aXRpb25Ob2RlID0gdGhpcy5wQ3JlYXRlRW50aXR5UGFydGl0aW9uTm9kZSgpO1xuXG5cdFx0cmV0dXJuIHRoaXMuX3BhcnRpdGlvbk5vZGU7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgcGlja2luZ0NvbGxpZGVyKCk6SVBpY2tpbmdDb2xsaWRlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BQaWNraW5nQ29sbGlkZXI7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHBpY2tpbmdDb2xsaWRlcih2YWx1ZTpJUGlja2luZ0NvbGxpZGVyKVxuXHR7XG5cdFx0dGhpcy5fcFBpY2tpbmdDb2xsaWRlciA9IHZhbHVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIERlZmluZXMgdGhlIGxvY2FsIHBvaW50IGFyb3VuZCB3aGljaCB0aGUgb2JqZWN0IHJvdGF0ZXMuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHBpdm90KCk6VmVjdG9yM0Rcblx0e1xuXHRcdHJldHVybiB0aGlzLl9waXZvdDtcblx0fVxuXG5cblx0cHVibGljIHNldCBwaXZvdChwaXZvdDpWZWN0b3IzRClcblx0e1xuXHRcdHRoaXMuX3Bpdm90ID0gcGl2b3QuY2xvbmUoKTtcblxuXHRcdHRoaXMuaW52YWxpZGF0ZVBpdm90KCk7XG5cdH1cblxuXHQvKipcblx0ICogRm9yIGEgZGlzcGxheSBvYmplY3QgaW4gYSBsb2FkZWQgU1dGIGZpbGUsIHRoZSA8Y29kZT5yb290PC9jb2RlPiBwcm9wZXJ0eVxuXHQgKiBpcyB0aGUgdG9wLW1vc3QgZGlzcGxheSBvYmplY3QgaW4gdGhlIHBvcnRpb24gb2YgdGhlIGRpc3BsYXkgbGlzdCdzIHRyZWVcblx0ICogc3RydWN0dXJlIHJlcHJlc2VudGVkIGJ5IHRoYXQgU1dGIGZpbGUuIEZvciBhIEJpdG1hcCBvYmplY3QgcmVwcmVzZW50aW5nIGFcblx0ICogbG9hZGVkIGltYWdlIGZpbGUsIHRoZSA8Y29kZT5yb290PC9jb2RlPiBwcm9wZXJ0eSBpcyB0aGUgQml0bWFwIG9iamVjdFxuXHQgKiBpdHNlbGYuIEZvciB0aGUgaW5zdGFuY2Ugb2YgdGhlIG1haW4gY2xhc3Mgb2YgdGhlIGZpcnN0IFNXRiBmaWxlIGxvYWRlZCxcblx0ICogdGhlIDxjb2RlPnJvb3Q8L2NvZGU+IHByb3BlcnR5IGlzIHRoZSBkaXNwbGF5IG9iamVjdCBpdHNlbGYuIFRoZVxuXHQgKiA8Y29kZT5yb290PC9jb2RlPiBwcm9wZXJ0eSBvZiB0aGUgU2NlbmUgb2JqZWN0IGlzIHRoZSBTY2VuZSBvYmplY3QgaXRzZWxmLlxuXHQgKiBUaGUgPGNvZGU+cm9vdDwvY29kZT4gcHJvcGVydHkgaXMgc2V0IHRvIDxjb2RlPm51bGw8L2NvZGU+IGZvciBhbnkgZGlzcGxheVxuXHQgKiBvYmplY3QgdGhhdCBoYXMgbm90IGJlZW4gYWRkZWQgdG8gdGhlIGRpc3BsYXkgbGlzdCwgdW5sZXNzIGl0IGhhcyBiZWVuXG5cdCAqIGFkZGVkIHRvIGEgZGlzcGxheSBvYmplY3QgY29udGFpbmVyIHRoYXQgaXMgb2ZmIHRoZSBkaXNwbGF5IGxpc3QgYnV0IHRoYXRcblx0ICogaXMgYSBjaGlsZCBvZiB0aGUgdG9wLW1vc3QgZGlzcGxheSBvYmplY3QgaW4gYSBsb2FkZWQgU1dGIGZpbGUuXG5cdCAqXG5cdCAqIDxwPkZvciBleGFtcGxlLCBpZiB5b3UgY3JlYXRlIGEgbmV3IFNwcml0ZSBvYmplY3QgYnkgY2FsbGluZyB0aGVcblx0ICogPGNvZGU+U3ByaXRlKCk8L2NvZGU+IGNvbnN0cnVjdG9yIG1ldGhvZCwgaXRzIDxjb2RlPnJvb3Q8L2NvZGU+IHByb3BlcnR5XG5cdCAqIGlzIDxjb2RlPm51bGw8L2NvZGU+IHVudGlsIHlvdSBhZGQgaXQgdG8gdGhlIGRpc3BsYXkgbGlzdChvciB0byBhIGRpc3BsYXlcblx0ICogb2JqZWN0IGNvbnRhaW5lciB0aGF0IGlzIG9mZiB0aGUgZGlzcGxheSBsaXN0IGJ1dCB0aGF0IGlzIGEgY2hpbGQgb2YgdGhlXG5cdCAqIHRvcC1tb3N0IGRpc3BsYXkgb2JqZWN0IGluIGEgU1dGIGZpbGUpLjwvcD5cblx0ICpcblx0ICogPHA+Rm9yIGEgbG9hZGVkIFNXRiBmaWxlLCBldmVuIHRob3VnaCB0aGUgTG9hZGVyIG9iamVjdCB1c2VkIHRvIGxvYWQgdGhlXG5cdCAqIGZpbGUgbWF5IG5vdCBiZSBvbiB0aGUgZGlzcGxheSBsaXN0LCB0aGUgdG9wLW1vc3QgZGlzcGxheSBvYmplY3QgaW4gdGhlXG5cdCAqIFNXRiBmaWxlIGhhcyBpdHMgPGNvZGU+cm9vdDwvY29kZT4gcHJvcGVydHkgc2V0IHRvIGl0c2VsZi4gVGhlIExvYWRlclxuXHQgKiBvYmplY3QgZG9lcyBub3QgaGF2ZSBpdHMgPGNvZGU+cm9vdDwvY29kZT4gcHJvcGVydHkgc2V0IHVudGlsIGl0IGlzIGFkZGVkXG5cdCAqIGFzIGEgY2hpbGQgb2YgYSBkaXNwbGF5IG9iamVjdCBmb3Igd2hpY2ggdGhlIDxjb2RlPnJvb3Q8L2NvZGU+IHByb3BlcnR5IGlzXG5cdCAqIHNldC48L3A+XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHJvb3QoKTpEaXNwbGF5T2JqZWN0Q29udGFpbmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcm9vdDtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgdGhlIHJvdGF0aW9uIG9mIHRoZSBEaXNwbGF5T2JqZWN0IGluc3RhbmNlLCBpbiBkZWdyZWVzLCBmcm9tIGl0c1xuXHQgKiBvcmlnaW5hbCBvcmllbnRhdGlvbi4gVmFsdWVzIGZyb20gMCB0byAxODAgcmVwcmVzZW50IGNsb2Nrd2lzZSByb3RhdGlvbjtcblx0ICogdmFsdWVzIGZyb20gMCB0byAtMTgwIHJlcHJlc2VudCBjb3VudGVyY2xvY2t3aXNlIHJvdGF0aW9uLiBWYWx1ZXMgb3V0c2lkZVxuXHQgKiB0aGlzIHJhbmdlIGFyZSBhZGRlZCB0byBvciBzdWJ0cmFjdGVkIGZyb20gMzYwIHRvIG9idGFpbiBhIHZhbHVlIHdpdGhpblxuXHQgKiB0aGUgcmFuZ2UuIEZvciBleGFtcGxlLCB0aGUgc3RhdGVtZW50IDxjb2RlPm15X3ZpZGVvLnJvdGF0aW9uID0gNDUwPC9jb2RlPlxuXHQgKiBpcyB0aGUgc2FtZSBhcyA8Y29kZT4gbXlfdmlkZW8ucm90YXRpb24gPSA5MDwvY29kZT4uXG5cdCAqL1xuXHRwdWJsaWMgcm90YXRpb246bnVtYmVyOyAvL1RPRE9cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHRoZSB4LWF4aXMgcm90YXRpb24gb2YgdGhlIERpc3BsYXlPYmplY3QgaW5zdGFuY2UsIGluIGRlZ3JlZXMsXG5cdCAqIGZyb20gaXRzIG9yaWdpbmFsIG9yaWVudGF0aW9uIHJlbGF0aXZlIHRvIHRoZSAzRCBwYXJlbnQgY29udGFpbmVyLiBWYWx1ZXNcblx0ICogZnJvbSAwIHRvIDE4MCByZXByZXNlbnQgY2xvY2t3aXNlIHJvdGF0aW9uOyB2YWx1ZXMgZnJvbSAwIHRvIC0xODBcblx0ICogcmVwcmVzZW50IGNvdW50ZXJjbG9ja3dpc2Ugcm90YXRpb24uIFZhbHVlcyBvdXRzaWRlIHRoaXMgcmFuZ2UgYXJlIGFkZGVkXG5cdCAqIHRvIG9yIHN1YnRyYWN0ZWQgZnJvbSAzNjAgdG8gb2J0YWluIGEgdmFsdWUgd2l0aGluIHRoZSByYW5nZS5cblx0ICovXG5cdHB1YmxpYyBnZXQgcm90YXRpb25YKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcm90YXRpb25YKk1hdGhDb25zdHMuUkFESUFOU19UT19ERUdSRUVTO1xuXHR9XG5cblx0cHVibGljIHNldCByb3RhdGlvblgodmFsOm51bWJlcilcblx0e1xuXHRcdGlmICh0aGlzLnJvdGF0aW9uWCA9PSB2YWwpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9yb3RhdGlvblggPSB2YWwqTWF0aENvbnN0cy5ERUdSRUVTX1RPX1JBRElBTlM7XG5cblx0XHR0aGlzLmludmFsaWRhdGVSb3RhdGlvbigpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB0aGUgeS1heGlzIHJvdGF0aW9uIG9mIHRoZSBEaXNwbGF5T2JqZWN0IGluc3RhbmNlLCBpbiBkZWdyZWVzLFxuXHQgKiBmcm9tIGl0cyBvcmlnaW5hbCBvcmllbnRhdGlvbiByZWxhdGl2ZSB0byB0aGUgM0QgcGFyZW50IGNvbnRhaW5lci4gVmFsdWVzXG5cdCAqIGZyb20gMCB0byAxODAgcmVwcmVzZW50IGNsb2Nrd2lzZSByb3RhdGlvbjsgdmFsdWVzIGZyb20gMCB0byAtMTgwXG5cdCAqIHJlcHJlc2VudCBjb3VudGVyY2xvY2t3aXNlIHJvdGF0aW9uLiBWYWx1ZXMgb3V0c2lkZSB0aGlzIHJhbmdlIGFyZSBhZGRlZFxuXHQgKiB0byBvciBzdWJ0cmFjdGVkIGZyb20gMzYwIHRvIG9idGFpbiBhIHZhbHVlIHdpdGhpbiB0aGUgcmFuZ2UuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHJvdGF0aW9uWSgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3JvdGF0aW9uWSpNYXRoQ29uc3RzLlJBRElBTlNfVE9fREVHUkVFUztcblx0fVxuXG5cdHB1YmxpYyBzZXQgcm90YXRpb25ZKHZhbDpudW1iZXIpXG5cdHtcblx0XHRpZiAodGhpcy5yb3RhdGlvblkgPT0gdmFsKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fcm90YXRpb25ZID0gdmFsKk1hdGhDb25zdHMuREVHUkVFU19UT19SQURJQU5TO1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlUm90YXRpb24oKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgdGhlIHotYXhpcyByb3RhdGlvbiBvZiB0aGUgRGlzcGxheU9iamVjdCBpbnN0YW5jZSwgaW4gZGVncmVlcyxcblx0ICogZnJvbSBpdHMgb3JpZ2luYWwgb3JpZW50YXRpb24gcmVsYXRpdmUgdG8gdGhlIDNEIHBhcmVudCBjb250YWluZXIuIFZhbHVlc1xuXHQgKiBmcm9tIDAgdG8gMTgwIHJlcHJlc2VudCBjbG9ja3dpc2Ugcm90YXRpb247IHZhbHVlcyBmcm9tIDAgdG8gLTE4MFxuXHQgKiByZXByZXNlbnQgY291bnRlcmNsb2Nrd2lzZSByb3RhdGlvbi4gVmFsdWVzIG91dHNpZGUgdGhpcyByYW5nZSBhcmUgYWRkZWRcblx0ICogdG8gb3Igc3VidHJhY3RlZCBmcm9tIDM2MCB0byBvYnRhaW4gYSB2YWx1ZSB3aXRoaW4gdGhlIHJhbmdlLlxuXHQgKi9cblx0cHVibGljIGdldCByb3RhdGlvblooKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9yb3RhdGlvbloqTWF0aENvbnN0cy5SQURJQU5TX1RPX0RFR1JFRVM7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHJvdGF0aW9uWih2YWw6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHRoaXMucm90YXRpb25aID09IHZhbClcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3JvdGF0aW9uWiA9IHZhbCpNYXRoQ29uc3RzLkRFR1JFRVNfVE9fUkFESUFOUztcblxuXHRcdHRoaXMuaW52YWxpZGF0ZVJvdGF0aW9uKCk7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIGN1cnJlbnQgc2NhbGluZyBncmlkIHRoYXQgaXMgaW4gZWZmZWN0LiBJZiBzZXQgdG8gPGNvZGU+bnVsbDwvY29kZT4sXG5cdCAqIHRoZSBlbnRpcmUgZGlzcGxheSBvYmplY3QgaXMgc2NhbGVkIG5vcm1hbGx5IHdoZW4gYW55IHNjYWxlIHRyYW5zZm9ybWF0aW9uXG5cdCAqIGlzIGFwcGxpZWQuXG5cdCAqXG5cdCAqIDxwPldoZW4geW91IGRlZmluZSB0aGUgPGNvZGU+c2NhbGU5R3JpZDwvY29kZT4gcHJvcGVydHksIHRoZSBkaXNwbGF5XG5cdCAqIG9iamVjdCBpcyBkaXZpZGVkIGludG8gYSBncmlkIHdpdGggbmluZSByZWdpb25zIGJhc2VkIG9uIHRoZVxuXHQgKiA8Y29kZT5zY2FsZTlHcmlkPC9jb2RlPiByZWN0YW5nbGUsIHdoaWNoIGRlZmluZXMgdGhlIGNlbnRlciByZWdpb24gb2YgdGhlXG5cdCAqIGdyaWQuIFRoZSBlaWdodCBvdGhlciByZWdpb25zIG9mIHRoZSBncmlkIGFyZSB0aGUgZm9sbG93aW5nIGFyZWFzOiA8L3A+XG5cdCAqXG5cdCAqIDx1bD5cblx0ICogICA8bGk+VGhlIHVwcGVyLWxlZnQgY29ybmVyIG91dHNpZGUgb2YgdGhlIHJlY3RhbmdsZTwvbGk+XG5cdCAqICAgPGxpPlRoZSBhcmVhIGFib3ZlIHRoZSByZWN0YW5nbGUgPC9saT5cblx0ICogICA8bGk+VGhlIHVwcGVyLXJpZ2h0IGNvcm5lciBvdXRzaWRlIG9mIHRoZSByZWN0YW5nbGU8L2xpPlxuXHQgKiAgIDxsaT5UaGUgYXJlYSB0byB0aGUgbGVmdCBvZiB0aGUgcmVjdGFuZ2xlPC9saT5cblx0ICogICA8bGk+VGhlIGFyZWEgdG8gdGhlIHJpZ2h0IG9mIHRoZSByZWN0YW5nbGU8L2xpPlxuXHQgKiAgIDxsaT5UaGUgbG93ZXItbGVmdCBjb3JuZXIgb3V0c2lkZSBvZiB0aGUgcmVjdGFuZ2xlPC9saT5cblx0ICogICA8bGk+VGhlIGFyZWEgYmVsb3cgdGhlIHJlY3RhbmdsZTwvbGk+XG5cdCAqICAgPGxpPlRoZSBsb3dlci1yaWdodCBjb3JuZXIgb3V0c2lkZSBvZiB0aGUgcmVjdGFuZ2xlPC9saT5cblx0ICogPC91bD5cblx0ICpcblx0ICogPHA+WW91IGNhbiB0aGluayBvZiB0aGUgZWlnaHQgcmVnaW9ucyBvdXRzaWRlIG9mIHRoZSBjZW50ZXIoZGVmaW5lZCBieVxuXHQgKiB0aGUgcmVjdGFuZ2xlKSBhcyBiZWluZyBsaWtlIGEgcGljdHVyZSBmcmFtZSB0aGF0IGhhcyBzcGVjaWFsIHJ1bGVzXG5cdCAqIGFwcGxpZWQgdG8gaXQgd2hlbiBzY2FsZWQuPC9wPlxuXHQgKlxuXHQgKiA8cD5XaGVuIHRoZSA8Y29kZT5zY2FsZTlHcmlkPC9jb2RlPiBwcm9wZXJ0eSBpcyBzZXQgYW5kIGEgZGlzcGxheSBvYmplY3Rcblx0ICogaXMgc2NhbGVkLCBhbGwgdGV4dCBhbmQgZ3JhZGllbnRzIGFyZSBzY2FsZWQgbm9ybWFsbHk7IGhvd2V2ZXIsIGZvciBvdGhlclxuXHQgKiB0eXBlcyBvZiBvYmplY3RzIHRoZSBmb2xsb3dpbmcgcnVsZXMgYXBwbHk6PC9wPlxuXHQgKlxuXHQgKiA8dWw+XG5cdCAqICAgPGxpPkNvbnRlbnQgaW4gdGhlIGNlbnRlciByZWdpb24gaXMgc2NhbGVkIG5vcm1hbGx5LiA8L2xpPlxuXHQgKiAgIDxsaT5Db250ZW50IGluIHRoZSBjb3JuZXJzIGlzIG5vdCBzY2FsZWQuIDwvbGk+XG5cdCAqICAgPGxpPkNvbnRlbnQgaW4gdGhlIHRvcCBhbmQgYm90dG9tIHJlZ2lvbnMgaXMgc2NhbGVkIGhvcml6b250YWxseSBvbmx5LlxuXHQgKiBDb250ZW50IGluIHRoZSBsZWZ0IGFuZCByaWdodCByZWdpb25zIGlzIHNjYWxlZCB2ZXJ0aWNhbGx5IG9ubHkuPC9saT5cblx0ICogICA8bGk+QWxsIGZpbGxzKGluY2x1ZGluZyBiaXRtYXBzLCB2aWRlbywgYW5kIGdyYWRpZW50cykgYXJlIHN0cmV0Y2hlZCB0b1xuXHQgKiBmaXQgdGhlaXIgc2hhcGVzLjwvbGk+XG5cdCAqIDwvdWw+XG5cdCAqXG5cdCAqIDxwPklmIGEgZGlzcGxheSBvYmplY3QgaXMgcm90YXRlZCwgYWxsIHN1YnNlcXVlbnQgc2NhbGluZyBpcyBub3JtYWwoYW5kXG5cdCAqIHRoZSA8Y29kZT5zY2FsZTlHcmlkPC9jb2RlPiBwcm9wZXJ0eSBpcyBpZ25vcmVkKS48L3A+XG5cdCAqXG5cdCAqIDxwPkZvciBleGFtcGxlLCBjb25zaWRlciB0aGUgZm9sbG93aW5nIGRpc3BsYXkgb2JqZWN0IGFuZCBhIHJlY3RhbmdsZSB0aGF0XG5cdCAqIGlzIGFwcGxpZWQgYXMgdGhlIGRpc3BsYXkgb2JqZWN0J3MgPGNvZGU+c2NhbGU5R3JpZDwvY29kZT46PC9wPlxuXHQgKlxuXHQgKiA8cD5BIGNvbW1vbiB1c2UgZm9yIHNldHRpbmcgPGNvZGU+c2NhbGU5R3JpZDwvY29kZT4gaXMgdG8gc2V0IHVwIGEgZGlzcGxheVxuXHQgKiBvYmplY3QgdG8gYmUgdXNlZCBhcyBhIGNvbXBvbmVudCwgaW4gd2hpY2ggZWRnZSByZWdpb25zIHJldGFpbiB0aGUgc2FtZVxuXHQgKiB3aWR0aCB3aGVuIHRoZSBjb21wb25lbnQgaXMgc2NhbGVkLjwvcD5cblx0ICpcblx0ICogQHRocm93cyBBcmd1bWVudEVycm9yIElmIHlvdSBwYXNzIGFuIGludmFsaWQgYXJndW1lbnQgdG8gdGhlIG1ldGhvZC5cblx0ICovXG5cdHB1YmxpYyBzY2FsZTlHcmlkOlJlY3RhbmdsZTtcblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHRoZSBob3Jpem9udGFsIHNjYWxlKHBlcmNlbnRhZ2UpIG9mIHRoZSBvYmplY3QgYXMgYXBwbGllZCBmcm9tXG5cdCAqIHRoZSByZWdpc3RyYXRpb24gcG9pbnQuIFRoZSBkZWZhdWx0IHJlZ2lzdHJhdGlvbiBwb2ludCBpcygwLDApLiAxLjBcblx0ICogZXF1YWxzIDEwMCUgc2NhbGUuXG5cdCAqXG5cdCAqIDxwPlNjYWxpbmcgdGhlIGxvY2FsIGNvb3JkaW5hdGUgc3lzdGVtIGNoYW5nZXMgdGhlIDxjb2RlPng8L2NvZGU+IGFuZFxuXHQgKiA8Y29kZT55PC9jb2RlPiBwcm9wZXJ0eSB2YWx1ZXMsIHdoaWNoIGFyZSBkZWZpbmVkIGluIHdob2xlIHBpeGVscy4gPC9wPlxuXHQgKi9cblx0cHVibGljIGdldCBzY2FsZVgoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wU2NhbGVYO1xuXHR9XG5cblx0cHVibGljIHNldCBzY2FsZVgodmFsOm51bWJlcilcblx0e1xuXHRcdGlmICh0aGlzLl9wU2NhbGVYID09IHZhbClcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3BTY2FsZVggPSB2YWw7XG5cblx0XHR0aGlzLmludmFsaWRhdGVTY2FsZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB0aGUgdmVydGljYWwgc2NhbGUocGVyY2VudGFnZSkgb2YgYW4gb2JqZWN0IGFzIGFwcGxpZWQgZnJvbSB0aGVcblx0ICogcmVnaXN0cmF0aW9uIHBvaW50IG9mIHRoZSBvYmplY3QuIFRoZSBkZWZhdWx0IHJlZ2lzdHJhdGlvbiBwb2ludCBpcygwLDApLlxuXHQgKiAxLjAgaXMgMTAwJSBzY2FsZS5cblx0ICpcblx0ICogPHA+U2NhbGluZyB0aGUgbG9jYWwgY29vcmRpbmF0ZSBzeXN0ZW0gY2hhbmdlcyB0aGUgPGNvZGU+eDwvY29kZT4gYW5kXG5cdCAqIDxjb2RlPnk8L2NvZGU+IHByb3BlcnR5IHZhbHVlcywgd2hpY2ggYXJlIGRlZmluZWQgaW4gd2hvbGUgcGl4ZWxzLiA8L3A+XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHNjYWxlWSgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BTY2FsZVk7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHNjYWxlWSh2YWw6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3BTY2FsZVkgPT0gdmFsKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fcFNjYWxlWSA9IHZhbDtcblxuXHRcdHRoaXMuaW52YWxpZGF0ZVNjYWxlKCk7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHRoZSBkZXB0aCBzY2FsZShwZXJjZW50YWdlKSBvZiBhbiBvYmplY3QgYXMgYXBwbGllZCBmcm9tIHRoZVxuXHQgKiByZWdpc3RyYXRpb24gcG9pbnQgb2YgdGhlIG9iamVjdC4gVGhlIGRlZmF1bHQgcmVnaXN0cmF0aW9uIHBvaW50IGlzKDAsMCkuXG5cdCAqIDEuMCBpcyAxMDAlIHNjYWxlLlxuXHQgKlxuXHQgKiA8cD5TY2FsaW5nIHRoZSBsb2NhbCBjb29yZGluYXRlIHN5c3RlbSBjaGFuZ2VzIHRoZSA8Y29kZT54PC9jb2RlPixcblx0ICogPGNvZGU+eTwvY29kZT4gYW5kIDxjb2RlPno8L2NvZGU+IHByb3BlcnR5IHZhbHVlcywgd2hpY2ggYXJlIGRlZmluZWQgaW5cblx0ICogd2hvbGUgcGl4ZWxzLiA8L3A+XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHNjYWxlWigpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BTY2FsZVo7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHNjYWxlWih2YWw6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3BTY2FsZVogPT0gdmFsKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fcFNjYWxlWiA9IHZhbDtcblxuXHRcdHRoaXMuaW52YWxpZGF0ZVNjYWxlKCk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgc2NlbmUoKTpTY2VuZVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BTY2VuZTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBzY2VuZVBvc2l0aW9uKCk6VmVjdG9yM0Rcblx0e1xuXHRcdGlmICh0aGlzLl9zY2VuZVBvc2l0aW9uRGlydHkpIHtcblx0XHRcdGlmICghdGhpcy5fcGl2b3RaZXJvICYmIHRoaXMuYWxpZ25tZW50TW9kZSA9PSBBbGlnbm1lbnRNb2RlLlBJVk9UX1BPSU5UKSB7XG5cdFx0XHRcdHZhciBwaXZvdFNjYWxlOlZlY3RvcjNEID0gbmV3IFZlY3RvcjNEKHRoaXMuX3Bpdm90LngvdGhpcy5fcFNjYWxlWCwgdGhpcy5fcGl2b3QueS90aGlzLl9wU2NhbGVZLCB0aGlzLl9waXZvdC56L3RoaXMuX3BTY2FsZVopXG5cdFx0XHRcdFx0dGhpcy5fc2NlbmVQb3NpdGlvbiA9IHRoaXMuc2NlbmVUcmFuc2Zvcm0udHJhbnNmb3JtVmVjdG9yKHBpdm90U2NhbGUpO1xuXHRcdFx0XHQvL3RoaXMuX3NjZW5lUG9zaXRpb24uZGVjcmVtZW50QnkobmV3IFZlY3RvcjNEKHRoaXMuX3Bpdm90LngqdGhpcy5fcFNjYWxlWCwgdGhpcy5fcGl2b3QueSp0aGlzLl9wU2NhbGVZLCB0aGlzLl9waXZvdC56KnRoaXMuX3BTY2FsZVopKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuc2NlbmVUcmFuc2Zvcm0uY29weUNvbHVtblRvKDMsIHRoaXMuX3NjZW5lUG9zaXRpb24pO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLl9zY2VuZVBvc2l0aW9uRGlydHkgPSBmYWxzZTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuX3NjZW5lUG9zaXRpb247XG5cdH1cblxuXHRwdWJsaWMgZ2V0IHNjZW5lVHJhbnNmb3JtKCk6TWF0cml4M0Rcblx0e1xuXHRcdGlmICh0aGlzLl9wU2NlbmVUcmFuc2Zvcm1EaXJ0eSlcblx0XHRcdHRoaXMucFVwZGF0ZVNjZW5lVHJhbnNmb3JtKCk7XG5cblx0XHRyZXR1cm4gdGhpcy5fcFNjZW5lVHJhbnNmb3JtO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBzY3JvbGwgcmVjdGFuZ2xlIGJvdW5kcyBvZiB0aGUgZGlzcGxheSBvYmplY3QuIFRoZSBkaXNwbGF5IG9iamVjdCBpc1xuXHQgKiBjcm9wcGVkIHRvIHRoZSBzaXplIGRlZmluZWQgYnkgdGhlIHJlY3RhbmdsZSwgYW5kIGl0IHNjcm9sbHMgd2l0aGluIHRoZVxuXHQgKiByZWN0YW5nbGUgd2hlbiB5b3UgY2hhbmdlIHRoZSA8Y29kZT54PC9jb2RlPiBhbmQgPGNvZGU+eTwvY29kZT4gcHJvcGVydGllc1xuXHQgKiBvZiB0aGUgPGNvZGU+c2Nyb2xsUmVjdDwvY29kZT4gb2JqZWN0LlxuXHQgKlxuXHQgKiA8cD5UaGUgcHJvcGVydGllcyBvZiB0aGUgPGNvZGU+c2Nyb2xsUmVjdDwvY29kZT4gUmVjdGFuZ2xlIG9iamVjdCB1c2UgdGhlXG5cdCAqIGRpc3BsYXkgb2JqZWN0J3MgY29vcmRpbmF0ZSBzcGFjZSBhbmQgYXJlIHNjYWxlZCBqdXN0IGxpa2UgdGhlIG92ZXJhbGxcblx0ICogZGlzcGxheSBvYmplY3QuIFRoZSBjb3JuZXIgYm91bmRzIG9mIHRoZSBjcm9wcGVkIHdpbmRvdyBvbiB0aGUgc2Nyb2xsaW5nXG5cdCAqIGRpc3BsYXkgb2JqZWN0IGFyZSB0aGUgb3JpZ2luIG9mIHRoZSBkaXNwbGF5IG9iamVjdCgwLDApIGFuZCB0aGUgcG9pbnRcblx0ICogZGVmaW5lZCBieSB0aGUgd2lkdGggYW5kIGhlaWdodCBvZiB0aGUgcmVjdGFuZ2xlLiBUaGV5IGFyZSBub3QgY2VudGVyZWRcblx0ICogYXJvdW5kIHRoZSBvcmlnaW4sIGJ1dCB1c2UgdGhlIG9yaWdpbiB0byBkZWZpbmUgdGhlIHVwcGVyLWxlZnQgY29ybmVyIG9mXG5cdCAqIHRoZSBhcmVhLiBBIHNjcm9sbGVkIGRpc3BsYXkgb2JqZWN0IGFsd2F5cyBzY3JvbGxzIGluIHdob2xlIHBpeGVsXG5cdCAqIGluY3JlbWVudHMuIDwvcD5cblx0ICpcblx0ICogPHA+WW91IGNhbiBzY3JvbGwgYW4gb2JqZWN0IGxlZnQgYW5kIHJpZ2h0IGJ5IHNldHRpbmcgdGhlIDxjb2RlPng8L2NvZGU+XG5cdCAqIHByb3BlcnR5IG9mIHRoZSA8Y29kZT5zY3JvbGxSZWN0PC9jb2RlPiBSZWN0YW5nbGUgb2JqZWN0LiBZb3UgY2FuIHNjcm9sbFxuXHQgKiBhbiBvYmplY3QgdXAgYW5kIGRvd24gYnkgc2V0dGluZyB0aGUgPGNvZGU+eTwvY29kZT4gcHJvcGVydHkgb2YgdGhlXG5cdCAqIDxjb2RlPnNjcm9sbFJlY3Q8L2NvZGU+IFJlY3RhbmdsZSBvYmplY3QuIElmIHRoZSBkaXNwbGF5IG9iamVjdCBpcyByb3RhdGVkXG5cdCAqIDkwwrAgYW5kIHlvdSBzY3JvbGwgaXQgbGVmdCBhbmQgcmlnaHQsIHRoZSBkaXNwbGF5IG9iamVjdCBhY3R1YWxseSBzY3JvbGxzXG5cdCAqIHVwIGFuZCBkb3duLjwvcD5cblx0ICovXG5cdHB1YmxpYyBzY3JvbGxSZWN0OlJlY3RhbmdsZTtcblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgc2hhZGVyUGlja2luZ0RldGFpbHMoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fc2hhZGVyUGlja2luZ0RldGFpbHM7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgYm91bmRzVmlzaWJsZSgpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9ib3VuZHNWaXNpYmxlO1xuXHR9XG5cblx0cHVibGljIHNldCBib3VuZHNWaXNpYmxlKHZhbHVlOmJvb2xlYW4pXG5cdHtcblx0XHRpZiAodmFsdWUgPT0gdGhpcy5fYm91bmRzVmlzaWJsZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX2JvdW5kc1Zpc2libGUgPSB2YWx1ZTtcblxuXHRcdHRoaXMuX3BhcnRpdGlvbk5vZGUuYm91bmRzVmlzaWJsZSA9IHZhbHVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFuIG9iamVjdCB3aXRoIHByb3BlcnRpZXMgcGVydGFpbmluZyB0byBhIGRpc3BsYXkgb2JqZWN0J3MgbWF0cml4LCBjb2xvclxuXHQgKiB0cmFuc2Zvcm0sIGFuZCBwaXhlbCBib3VuZHMuIFRoZSBzcGVjaWZpYyBwcm9wZXJ0aWVzICAtICBtYXRyaXgsXG5cdCAqIGNvbG9yVHJhbnNmb3JtLCBhbmQgdGhyZWUgcmVhZC1vbmx5IHByb3BlcnRpZXNcblx0ICogKDxjb2RlPmNvbmNhdGVuYXRlZE1hdHJpeDwvY29kZT4sIDxjb2RlPmNvbmNhdGVuYXRlZENvbG9yVHJhbnNmb3JtPC9jb2RlPixcblx0ICogYW5kIDxjb2RlPnBpeGVsQm91bmRzPC9jb2RlPikgIC0gIGFyZSBkZXNjcmliZWQgaW4gdGhlIGVudHJ5IGZvciB0aGVcblx0ICogVHJhbnNmb3JtIGNsYXNzLlxuXHQgKlxuXHQgKiA8cD5FYWNoIG9mIHRoZSB0cmFuc2Zvcm0gb2JqZWN0J3MgcHJvcGVydGllcyBpcyBpdHNlbGYgYW4gb2JqZWN0LiBUaGlzXG5cdCAqIGNvbmNlcHQgaXMgaW1wb3J0YW50IGJlY2F1c2UgdGhlIG9ubHkgd2F5IHRvIHNldCBuZXcgdmFsdWVzIGZvciB0aGUgbWF0cml4XG5cdCAqIG9yIGNvbG9yVHJhbnNmb3JtIG9iamVjdHMgaXMgdG8gY3JlYXRlIGEgbmV3IG9iamVjdCBhbmQgY29weSB0aGF0IG9iamVjdFxuXHQgKiBpbnRvIHRoZSB0cmFuc2Zvcm0ubWF0cml4IG9yIHRyYW5zZm9ybS5jb2xvclRyYW5zZm9ybSBwcm9wZXJ0eS48L3A+XG5cdCAqXG5cdCAqIDxwPkZvciBleGFtcGxlLCB0byBpbmNyZWFzZSB0aGUgPGNvZGU+dHg8L2NvZGU+IHZhbHVlIG9mIGEgZGlzcGxheVxuXHQgKiBvYmplY3QncyBtYXRyaXgsIHlvdSBtdXN0IG1ha2UgYSBjb3B5IG9mIHRoZSBlbnRpcmUgbWF0cml4IG9iamVjdCwgdGhlblxuXHQgKiBjb3B5IHRoZSBuZXcgb2JqZWN0IGludG8gdGhlIG1hdHJpeCBwcm9wZXJ0eSBvZiB0aGUgdHJhbnNmb3JtIG9iamVjdDo8L3A+XG5cdCAqIDxwcmUgeG1sOnNwYWNlPVwicHJlc2VydmVcIj48Y29kZT4gcHVibGljIG15TWF0cml4Ok1hdHJpeCA9XG5cdCAqIG15RGlzcGxheU9iamVjdC50cmFuc2Zvcm0ubWF0cml4OyBteU1hdHJpeC50eCArPSAxMDtcblx0ICogbXlEaXNwbGF5T2JqZWN0LnRyYW5zZm9ybS5tYXRyaXggPSBteU1hdHJpeDsgPC9jb2RlPjwvcHJlPlxuXHQgKlxuXHQgKiA8cD5Zb3UgY2Fubm90IGRpcmVjdGx5IHNldCB0aGUgPGNvZGU+dHg8L2NvZGU+IHByb3BlcnR5LiBUaGUgZm9sbG93aW5nXG5cdCAqIGNvZGUgaGFzIG5vIGVmZmVjdCBvbiA8Y29kZT5teURpc3BsYXlPYmplY3Q8L2NvZGU+OiA8L3A+XG5cdCAqIDxwcmUgeG1sOnNwYWNlPVwicHJlc2VydmVcIj48Y29kZT4gbXlEaXNwbGF5T2JqZWN0LnRyYW5zZm9ybS5tYXRyaXgudHggKz1cblx0ICogMTA7IDwvY29kZT48L3ByZT5cblx0ICpcblx0ICogPHA+WW91IGNhbiBhbHNvIGNvcHkgYW4gZW50aXJlIHRyYW5zZm9ybSBvYmplY3QgYW5kIGFzc2lnbiBpdCB0byBhbm90aGVyXG5cdCAqIGRpc3BsYXkgb2JqZWN0J3MgdHJhbnNmb3JtIHByb3BlcnR5LiBGb3IgZXhhbXBsZSwgdGhlIGZvbGxvd2luZyBjb2RlXG5cdCAqIGNvcGllcyB0aGUgZW50aXJlIHRyYW5zZm9ybSBvYmplY3QgZnJvbSA8Y29kZT5teU9sZERpc3BsYXlPYmo8L2NvZGU+IHRvXG5cdCAqIDxjb2RlPm15TmV3RGlzcGxheU9iajwvY29kZT46PC9wPlxuXHQgKiA8Y29kZT5teU5ld0Rpc3BsYXlPYmoudHJhbnNmb3JtID0gbXlPbGREaXNwbGF5T2JqLnRyYW5zZm9ybTs8L2NvZGU+XG5cdCAqXG5cdCAqIDxwPlRoZSByZXN1bHRpbmcgZGlzcGxheSBvYmplY3QsIDxjb2RlPm15TmV3RGlzcGxheU9iajwvY29kZT4sIG5vdyBoYXMgdGhlXG5cdCAqIHNhbWUgdmFsdWVzIGZvciBpdHMgbWF0cml4LCBjb2xvciB0cmFuc2Zvcm0sIGFuZCBwaXhlbCBib3VuZHMgYXMgdGhlIG9sZFxuXHQgKiBkaXNwbGF5IG9iamVjdCwgPGNvZGU+bXlPbGREaXNwbGF5T2JqPC9jb2RlPi48L3A+XG5cdCAqXG5cdCAqIDxwPk5vdGUgdGhhdCBBSVIgZm9yIFRWIGRldmljZXMgdXNlIGhhcmR3YXJlIGFjY2VsZXJhdGlvbiwgaWYgaXQgaXNcblx0ICogYXZhaWxhYmxlLCBmb3IgY29sb3IgdHJhbnNmb3Jtcy48L3A+XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHRyYW5zZm9ybSgpOlRyYW5zZm9ybVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3RyYW5zZm9ybTtcblx0fVxuXG5cdC8qKlxuXHQgKiBXaGV0aGVyIG9yIG5vdCB0aGUgZGlzcGxheSBvYmplY3QgaXMgdmlzaWJsZS4gRGlzcGxheSBvYmplY3RzIHRoYXQgYXJlIG5vdFxuXHQgKiB2aXNpYmxlIGFyZSBkaXNhYmxlZC4gRm9yIGV4YW1wbGUsIGlmIDxjb2RlPnZpc2libGU9ZmFsc2U8L2NvZGU+IGZvciBhblxuXHQgKiBJbnRlcmFjdGl2ZU9iamVjdCBpbnN0YW5jZSwgaXQgY2Fubm90IGJlIGNsaWNrZWQuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHZpc2libGUoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fZXhwbGljaXRWaXNpYmlsaXR5O1xuXHR9XG5cblx0cHVibGljIHNldCB2aXNpYmxlKHZhbHVlOmJvb2xlYW4pXG5cdHtcblx0XHRpZiAodGhpcy5fZXhwbGljaXRWaXNpYmlsaXR5ID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fZXhwbGljaXRWaXNpYmlsaXR5ID0gdmFsdWU7XG5cblx0XHR0aGlzLl9wVXBkYXRlSW1wbGljaXRWaXNpYmlsaXR5KHRoaXMuX3BQYXJlbnQ/IHRoaXMuX3BQYXJlbnQuX2lJc1Zpc2libGUoKSA6IHRydWUpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB0aGUgd2lkdGggb2YgdGhlIGRpc3BsYXkgb2JqZWN0LCBpbiBwaXhlbHMuIFRoZSB3aWR0aCBpc1xuXHQgKiBjYWxjdWxhdGVkIGJhc2VkIG9uIHRoZSBib3VuZHMgb2YgdGhlIGNvbnRlbnQgb2YgdGhlIGRpc3BsYXkgb2JqZWN0LiBXaGVuXG5cdCAqIHlvdSBzZXQgdGhlIDxjb2RlPndpZHRoPC9jb2RlPiBwcm9wZXJ0eSwgdGhlIDxjb2RlPnNjYWxlWDwvY29kZT4gcHJvcGVydHlcblx0ICogaXMgYWRqdXN0ZWQgYWNjb3JkaW5nbHksIGFzIHNob3duIGluIHRoZSBmb2xsb3dpbmcgY29kZTpcblx0ICpcblx0ICogPHA+RXhjZXB0IGZvciBUZXh0RmllbGQgYW5kIFZpZGVvIG9iamVjdHMsIGEgZGlzcGxheSBvYmplY3Qgd2l0aCBub1xuXHQgKiBjb250ZW50KHN1Y2ggYXMgYW4gZW1wdHkgc3ByaXRlKSBoYXMgYSB3aWR0aCBvZiAwLCBldmVuIGlmIHlvdSB0cnkgdG8gc2V0XG5cdCAqIDxjb2RlPndpZHRoPC9jb2RlPiB0byBhIGRpZmZlcmVudCB2YWx1ZS48L3A+XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHdpZHRoKCk6bnVtYmVyXG5cdHtcblx0XHRpZiAodGhpcy5fcEJvdW5kc0ludmFsaWQpXG5cdFx0XHR0aGlzLnBVcGRhdGVCb3VuZHMoKTtcblxuXHRcdHJldHVybiB0aGlzLl93aWR0aDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgd2lkdGgodmFsOm51bWJlcilcblx0e1xuXHRcdGlmICh0aGlzLl93aWR0aCA9PSB2YWwpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl93aWR0aCA9PSB2YWw7XG5cblx0XHR0aGlzLl9wU2NhbGVYID0gdmFsL3RoaXMuYm91bmRzLmFhYmIud2lkdGg7XG5cblx0XHR0aGlzLmludmFsaWRhdGVTY2FsZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHdvcmxkQm91bmRzKCk6Qm91bmRpbmdWb2x1bWVCYXNlXG5cdHtcblx0XHQvLyBTaW5jZSB0aGlzIGdldHRlciBpcyBpbnZva2VkIGV2ZXJ5IGl0ZXJhdGlvbiBvZiB0aGUgcmVuZGVyIGxvb3AsIGFuZFxuXHRcdC8vIHRoZSBwcmVmYWIgY29uc3RydWN0IGNvdWxkIGFmZmVjdCB0aGUgYm91bmRzIG9mIHRoZSBlbnRpdHksIHRoZSBwcmVmYWIgaXNcblx0XHQvLyB2YWxpZGF0ZWQgaGVyZSB0byBnaXZlIGl0IGEgY2hhbmNlIHRvIHJlYnVpbGQuXG5cdFx0aWYgKHRoaXMuX2lTb3VyY2VQcmVmYWIpXG5cdFx0XHR0aGlzLl9pU291cmNlUHJlZmFiLl9pVmFsaWRhdGUoKTtcblxuXHRcdGlmICh0aGlzLl93b3JsZEJvdW5kc0ludmFsaWQpIHtcblx0XHRcdHRoaXMuX3dvcmxkQm91bmRzSW52YWxpZCA9IGZhbHNlO1xuXHRcdFx0dGhpcy5fd29ybGRCb3VuZHMudHJhbnNmb3JtRnJvbSh0aGlzLmJvdW5kcywgdGhpcy5zY2VuZVRyYW5zZm9ybSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMuX3dvcmxkQm91bmRzO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB0aGUgPGk+eDwvaT4gY29vcmRpbmF0ZSBvZiB0aGUgRGlzcGxheU9iamVjdCBpbnN0YW5jZSByZWxhdGl2ZVxuXHQgKiB0byB0aGUgbG9jYWwgY29vcmRpbmF0ZXMgb2YgdGhlIHBhcmVudCBEaXNwbGF5T2JqZWN0Q29udGFpbmVyLiBJZiB0aGVcblx0ICogb2JqZWN0IGlzIGluc2lkZSBhIERpc3BsYXlPYmplY3RDb250YWluZXIgdGhhdCBoYXMgdHJhbnNmb3JtYXRpb25zLCBpdCBpc1xuXHQgKiBpbiB0aGUgbG9jYWwgY29vcmRpbmF0ZSBzeXN0ZW0gb2YgdGhlIGVuY2xvc2luZyBEaXNwbGF5T2JqZWN0Q29udGFpbmVyLlxuXHQgKiBUaHVzLCBmb3IgYSBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIHJvdGF0ZWQgOTDCsCBjb3VudGVyY2xvY2t3aXNlLCB0aGVcblx0ICogRGlzcGxheU9iamVjdENvbnRhaW5lcidzIGNoaWxkcmVuIGluaGVyaXQgYSBjb29yZGluYXRlIHN5c3RlbSB0aGF0IGlzXG5cdCAqIHJvdGF0ZWQgOTDCsCBjb3VudGVyY2xvY2t3aXNlLiBUaGUgb2JqZWN0J3MgY29vcmRpbmF0ZXMgcmVmZXIgdG8gdGhlXG5cdCAqIHJlZ2lzdHJhdGlvbiBwb2ludCBwb3NpdGlvbi5cblx0ICovXG5cdHB1YmxpYyBnZXQgeCgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3g7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHgodmFsOm51bWJlcilcblx0e1xuXHRcdGlmICh0aGlzLl94ID09IHZhbClcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3ggPSB2YWw7XG5cblx0XHR0aGlzLmludmFsaWRhdGVQb3NpdGlvbigpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB0aGUgPGk+eTwvaT4gY29vcmRpbmF0ZSBvZiB0aGUgRGlzcGxheU9iamVjdCBpbnN0YW5jZSByZWxhdGl2ZVxuXHQgKiB0byB0aGUgbG9jYWwgY29vcmRpbmF0ZXMgb2YgdGhlIHBhcmVudCBEaXNwbGF5T2JqZWN0Q29udGFpbmVyLiBJZiB0aGVcblx0ICogb2JqZWN0IGlzIGluc2lkZSBhIERpc3BsYXlPYmplY3RDb250YWluZXIgdGhhdCBoYXMgdHJhbnNmb3JtYXRpb25zLCBpdCBpc1xuXHQgKiBpbiB0aGUgbG9jYWwgY29vcmRpbmF0ZSBzeXN0ZW0gb2YgdGhlIGVuY2xvc2luZyBEaXNwbGF5T2JqZWN0Q29udGFpbmVyLlxuXHQgKiBUaHVzLCBmb3IgYSBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIHJvdGF0ZWQgOTDCsCBjb3VudGVyY2xvY2t3aXNlLCB0aGVcblx0ICogRGlzcGxheU9iamVjdENvbnRhaW5lcidzIGNoaWxkcmVuIGluaGVyaXQgYSBjb29yZGluYXRlIHN5c3RlbSB0aGF0IGlzXG5cdCAqIHJvdGF0ZWQgOTDCsCBjb3VudGVyY2xvY2t3aXNlLiBUaGUgb2JqZWN0J3MgY29vcmRpbmF0ZXMgcmVmZXIgdG8gdGhlXG5cdCAqIHJlZ2lzdHJhdGlvbiBwb2ludCBwb3NpdGlvbi5cblx0ICovXG5cdHB1YmxpYyBnZXQgeSgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3k7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHkodmFsOm51bWJlcilcblx0e1xuXHRcdGlmICh0aGlzLl95ID09IHZhbClcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3kgPSB2YWw7XG5cblx0XHR0aGlzLmludmFsaWRhdGVQb3NpdGlvbigpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB0aGUgeiBjb29yZGluYXRlIHBvc2l0aW9uIGFsb25nIHRoZSB6LWF4aXMgb2YgdGhlIERpc3BsYXlPYmplY3Rcblx0ICogaW5zdGFuY2UgcmVsYXRpdmUgdG8gdGhlIDNEIHBhcmVudCBjb250YWluZXIuIFRoZSB6IHByb3BlcnR5IGlzIHVzZWQgZm9yXG5cdCAqIDNEIGNvb3JkaW5hdGVzLCBub3Qgc2NyZWVuIG9yIHBpeGVsIGNvb3JkaW5hdGVzLlxuXHQgKlxuXHQgKiA8cD5XaGVuIHlvdSBzZXQgYSA8Y29kZT56PC9jb2RlPiBwcm9wZXJ0eSBmb3IgYSBkaXNwbGF5IG9iamVjdCB0b1xuXHQgKiBzb21ldGhpbmcgb3RoZXIgdGhhbiB0aGUgZGVmYXVsdCB2YWx1ZSBvZiA8Y29kZT4wPC9jb2RlPiwgYSBjb3JyZXNwb25kaW5nXG5cdCAqIE1hdHJpeDNEIG9iamVjdCBpcyBhdXRvbWF0aWNhbGx5IGNyZWF0ZWQuIGZvciBhZGp1c3RpbmcgYSBkaXNwbGF5IG9iamVjdCdzXG5cdCAqIHBvc2l0aW9uIGFuZCBvcmllbnRhdGlvbiBpbiB0aHJlZSBkaW1lbnNpb25zLiBXaGVuIHdvcmtpbmcgd2l0aCB0aGVcblx0ICogei1heGlzLCB0aGUgZXhpc3RpbmcgYmVoYXZpb3Igb2YgeCBhbmQgeSBwcm9wZXJ0aWVzIGNoYW5nZXMgZnJvbSBzY3JlZW4gb3Jcblx0ICogcGl4ZWwgY29vcmRpbmF0ZXMgdG8gcG9zaXRpb25zIHJlbGF0aXZlIHRvIHRoZSAzRCBwYXJlbnQgY29udGFpbmVyLjwvcD5cblx0ICpcblx0ICogPHA+Rm9yIGV4YW1wbGUsIGEgY2hpbGQgb2YgdGhlIDxjb2RlPl9yb290PC9jb2RlPiBhdCBwb3NpdGlvbiB4ID0gMTAwLCB5ID1cblx0ICogMTAwLCB6ID0gMjAwIGlzIG5vdCBkcmF3biBhdCBwaXhlbCBsb2NhdGlvbigxMDAsMTAwKS4gVGhlIGNoaWxkIGlzIGRyYXduXG5cdCAqIHdoZXJldmVyIHRoZSAzRCBwcm9qZWN0aW9uIGNhbGN1bGF0aW9uIHB1dHMgaXQuIFRoZSBjYWxjdWxhdGlvbiBpczo8L3A+XG5cdCAqXG5cdCAqIDxwPjxjb2RlPih4fn5jYW1lcmFGb2NhbExlbmd0aC9jYW1lcmFSZWxhdGl2ZVpQb3NpdGlvbixcblx0ICogeX5+Y2FtZXJhRm9jYWxMZW5ndGgvY2FtZXJhUmVsYXRpdmVaUG9zaXRpb24pPC9jb2RlPjwvcD5cblx0ICovXG5cdHB1YmxpYyBnZXQgeigpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3o7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHoodmFsOm51bWJlcilcblx0e1xuXHRcdGlmICh0aGlzLl96ID09IHZhbClcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3ogPSB2YWw7XG5cblx0XHR0aGlzLmludmFsaWRhdGVQb3NpdGlvbigpO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHpPZmZzZXQoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl96T2Zmc2V0O1xuXHR9XG5cblx0cHVibGljIHNldCB6T2Zmc2V0KHZhbHVlOm51bWJlcilcblx0e1xuXHRcdHRoaXMuX3pPZmZzZXQgPSB2YWx1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGEgbmV3IDxjb2RlPkRpc3BsYXlPYmplY3Q8L2NvZGU+IGluc3RhbmNlLlxuXHQgKi9cblx0Y29uc3RydWN0b3IoKVxuXHR7XG5cdFx0c3VwZXIoKTtcblxuXHRcdC8vIENhY2hlZCB2ZWN0b3Igb2YgdHJhbnNmb3JtYXRpb24gY29tcG9uZW50cyB1c2VkIHdoZW5cblx0XHQvLyByZWNvbXBvc2luZyB0aGUgdHJhbnNmb3JtIG1hdHJpeCBpbiB1cGRhdGVUcmFuc2Zvcm0oKVxuXG5cdFx0dGhpcy5fdHJhbnNmb3JtQ29tcG9uZW50cyA9IG5ldyBBcnJheTxWZWN0b3IzRD4oMyk7Ly9fdHJhbnNmb3JtQ29tcG9uZW50cyA9IG5ldyBWZWN0b3IuPFZlY3RvcjNEPigzLCB0cnVlKTtcblxuXHRcdHRoaXMuX3RyYW5zZm9ybUNvbXBvbmVudHNbMF0gPSB0aGlzLl9wb3M7XG5cdFx0dGhpcy5fdHJhbnNmb3JtQ29tcG9uZW50c1sxXSA9IHRoaXMuX3JvdDtcblx0XHR0aGlzLl90cmFuc2Zvcm1Db21wb25lbnRzWzJdID0gdGhpcy5fc2NhO1xuXG5cdFx0Ly9jcmVhdGlvbiBvZiBhc3NvY2lhdGVkIHRyYW5zZm9ybSBvYmplY3Rcblx0XHR0aGlzLl90cmFuc2Zvcm0gPSBuZXcgVHJhbnNmb3JtKHRoaXMpO1xuXG5cdFx0dGhpcy5fbWF0cml4M0QuaWRlbnRpdHkoKTtcblxuXHRcdHRoaXMuX2ZsaXBZLmFwcGVuZFNjYWxlKDEsIC0xLCAxKTtcblxuXHRcdHRoaXMuX3BCb3VuZHMgPSB0aGlzLnBDcmVhdGVEZWZhdWx0Qm91bmRpbmdWb2x1bWUoKTtcblxuXHRcdHRoaXMuX3dvcmxkQm91bmRzID0gdGhpcy5wQ3JlYXRlRGVmYXVsdEJvdW5kaW5nVm9sdW1lKCk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBhZGRFdmVudExpc3RlbmVyKHR5cGU6c3RyaW5nLCBsaXN0ZW5lcjpGdW5jdGlvbilcblx0e1xuXHRcdHN1cGVyLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpO1xuXG5cdFx0c3dpdGNoICh0eXBlKSB7XG5cdFx0XHRjYXNlIERpc3BsYXlPYmplY3RFdmVudC5QT1NJVElPTl9DSEFOR0VEOlxuXHRcdFx0XHR0aGlzLl9saXN0ZW5Ub1Bvc2l0aW9uQ2hhbmdlZCA9IHRydWU7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBEaXNwbGF5T2JqZWN0RXZlbnQuUk9UQVRJT05fQ0hBTkdFRDpcblx0XHRcdFx0dGhpcy5fbGlzdGVuVG9Sb3RhdGlvbkNoYW5nZWQgPSB0cnVlO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgRGlzcGxheU9iamVjdEV2ZW50LlNDQUxFX0NIQU5HRUQ6XG5cdFx0XHRcdHRoaXMuX2xpc3RlblRvU2NhbGVDaGFuZ2VkID0gdHJ1ZTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgY2xvbmUoKTpEaXNwbGF5T2JqZWN0XG5cdHtcblx0XHR2YXIgY2xvbmU6RGlzcGxheU9iamVjdCA9IG5ldyBEaXNwbGF5T2JqZWN0KCk7XG5cdFx0Y2xvbmUucGl2b3QgPSB0aGlzLnBpdm90O1xuXHRcdGNsb25lLl9pTWF0cml4M0QgPSB0aGlzLl9pTWF0cml4M0Q7XG5cdFx0Y2xvbmUubmFtZSA9IG5hbWU7XG5cblx0XHQvLyB0b2RvOiBpbXBsZW1lbnQgZm9yIGFsbCBzdWJ0eXBlc1xuXHRcdHJldHVybiBjbG9uZTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGRpc3Bvc2UoKVxuXHR7XG5cdFx0aWYgKHRoaXMucGFyZW50KVxuXHRcdFx0dGhpcy5wYXJlbnQucmVtb3ZlQ2hpbGQodGhpcyk7XG5cblx0XHR3aGlsZSAodGhpcy5fcFJlbmRlcmFibGVzLmxlbmd0aClcblx0XHRcdHRoaXMuX3BSZW5kZXJhYmxlc1swXS5kaXNwb3NlKCk7XG5cdH1cblxuXHQvKipcblx0ICogQGluaGVyaXREb2Ncblx0ICovXG5cdHB1YmxpYyBkaXNwb3NlQXNzZXQoKVxuXHR7XG5cdFx0dGhpcy5kaXNwb3NlKCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhIHJlY3RhbmdsZSB0aGF0IGRlZmluZXMgdGhlIGFyZWEgb2YgdGhlIGRpc3BsYXkgb2JqZWN0IHJlbGF0aXZlXG5cdCAqIHRvIHRoZSBjb29yZGluYXRlIHN5c3RlbSBvZiB0aGUgPGNvZGU+dGFyZ2V0Q29vcmRpbmF0ZVNwYWNlPC9jb2RlPiBvYmplY3QuXG5cdCAqIENvbnNpZGVyIHRoZSBmb2xsb3dpbmcgY29kZSwgd2hpY2ggc2hvd3MgaG93IHRoZSByZWN0YW5nbGUgcmV0dXJuZWQgY2FuXG5cdCAqIHZhcnkgZGVwZW5kaW5nIG9uIHRoZSA8Y29kZT50YXJnZXRDb29yZGluYXRlU3BhY2U8L2NvZGU+IHBhcmFtZXRlciB0aGF0XG5cdCAqIHlvdSBwYXNzIHRvIHRoZSBtZXRob2Q6XG5cdCAqXG5cdCAqIDxwPjxiPk5vdGU6PC9iPiBVc2UgdGhlIDxjb2RlPmxvY2FsVG9HbG9iYWwoKTwvY29kZT4gYW5kXG5cdCAqIDxjb2RlPmdsb2JhbFRvTG9jYWwoKTwvY29kZT4gbWV0aG9kcyB0byBjb252ZXJ0IHRoZSBkaXNwbGF5IG9iamVjdCdzIGxvY2FsXG5cdCAqIGNvb3JkaW5hdGVzIHRvIGRpc3BsYXkgY29vcmRpbmF0ZXMsIG9yIGRpc3BsYXkgY29vcmRpbmF0ZXMgdG8gbG9jYWxcblx0ICogY29vcmRpbmF0ZXMsIHJlc3BlY3RpdmVseS48L3A+XG5cdCAqXG5cdCAqIDxwPlRoZSA8Y29kZT5nZXRCb3VuZHMoKTwvY29kZT4gbWV0aG9kIGlzIHNpbWlsYXIgdG8gdGhlXG5cdCAqIDxjb2RlPmdldFJlY3QoKTwvY29kZT4gbWV0aG9kOyBob3dldmVyLCB0aGUgUmVjdGFuZ2xlIHJldHVybmVkIGJ5IHRoZVxuXHQgKiA8Y29kZT5nZXRCb3VuZHMoKTwvY29kZT4gbWV0aG9kIGluY2x1ZGVzIGFueSBzdHJva2VzIG9uIHNoYXBlcywgd2hlcmVhc1xuXHQgKiB0aGUgUmVjdGFuZ2xlIHJldHVybmVkIGJ5IHRoZSA8Y29kZT5nZXRSZWN0KCk8L2NvZGU+IG1ldGhvZCBkb2VzIG5vdC4gRm9yXG5cdCAqIGFuIGV4YW1wbGUsIHNlZSB0aGUgZGVzY3JpcHRpb24gb2YgdGhlIDxjb2RlPmdldFJlY3QoKTwvY29kZT4gbWV0aG9kLjwvcD5cblx0ICpcblx0ICogQHBhcmFtIHRhcmdldENvb3JkaW5hdGVTcGFjZSBUaGUgZGlzcGxheSBvYmplY3QgdGhhdCBkZWZpbmVzIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvb3JkaW5hdGUgc3lzdGVtIHRvIHVzZS5cblx0ICogQHJldHVybiBUaGUgcmVjdGFuZ2xlIHRoYXQgZGVmaW5lcyB0aGUgYXJlYSBvZiB0aGUgZGlzcGxheSBvYmplY3QgcmVsYXRpdmVcblx0ICogICAgICAgICB0byB0aGUgPGNvZGU+dGFyZ2V0Q29vcmRpbmF0ZVNwYWNlPC9jb2RlPiBvYmplY3QncyBjb29yZGluYXRlXG5cdCAqICAgICAgICAgc3lzdGVtLlxuXHQgKi9cblx0cHVibGljIGdldEJvdW5kcyh0YXJnZXRDb29yZGluYXRlU3BhY2U6RGlzcGxheU9iamVjdCk6UmVjdGFuZ2xlXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fYm91bmRzOyAvL1RPRE9cblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGEgcmVjdGFuZ2xlIHRoYXQgZGVmaW5lcyB0aGUgYm91bmRhcnkgb2YgdGhlIGRpc3BsYXkgb2JqZWN0LCBiYXNlZFxuXHQgKiBvbiB0aGUgY29vcmRpbmF0ZSBzeXN0ZW0gZGVmaW5lZCBieSB0aGUgPGNvZGU+dGFyZ2V0Q29vcmRpbmF0ZVNwYWNlPC9jb2RlPlxuXHQgKiBwYXJhbWV0ZXIsIGV4Y2x1ZGluZyBhbnkgc3Ryb2tlcyBvbiBzaGFwZXMuIFRoZSB2YWx1ZXMgdGhhdCB0aGVcblx0ICogPGNvZGU+Z2V0UmVjdCgpPC9jb2RlPiBtZXRob2QgcmV0dXJucyBhcmUgdGhlIHNhbWUgb3Igc21hbGxlciB0aGFuIHRob3NlXG5cdCAqIHJldHVybmVkIGJ5IHRoZSA8Y29kZT5nZXRCb3VuZHMoKTwvY29kZT4gbWV0aG9kLlxuXHQgKlxuXHQgKiA8cD48Yj5Ob3RlOjwvYj4gVXNlIDxjb2RlPmxvY2FsVG9HbG9iYWwoKTwvY29kZT4gYW5kXG5cdCAqIDxjb2RlPmdsb2JhbFRvTG9jYWwoKTwvY29kZT4gbWV0aG9kcyB0byBjb252ZXJ0IHRoZSBkaXNwbGF5IG9iamVjdCdzIGxvY2FsXG5cdCAqIGNvb3JkaW5hdGVzIHRvIFNjZW5lIGNvb3JkaW5hdGVzLCBvciBTY2VuZSBjb29yZGluYXRlcyB0byBsb2NhbFxuXHQgKiBjb29yZGluYXRlcywgcmVzcGVjdGl2ZWx5LjwvcD5cblx0ICpcblx0ICogQHBhcmFtIHRhcmdldENvb3JkaW5hdGVTcGFjZSBUaGUgZGlzcGxheSBvYmplY3QgdGhhdCBkZWZpbmVzIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvb3JkaW5hdGUgc3lzdGVtIHRvIHVzZS5cblx0ICogQHJldHVybiBUaGUgcmVjdGFuZ2xlIHRoYXQgZGVmaW5lcyB0aGUgYXJlYSBvZiB0aGUgZGlzcGxheSBvYmplY3QgcmVsYXRpdmVcblx0ICogICAgICAgICB0byB0aGUgPGNvZGU+dGFyZ2V0Q29vcmRpbmF0ZVNwYWNlPC9jb2RlPiBvYmplY3QncyBjb29yZGluYXRlXG5cdCAqICAgICAgICAgc3lzdGVtLlxuXHQgKi9cblx0cHVibGljIGdldFJlY3QodGFyZ2V0Q29vcmRpbmF0ZVNwYWNlOkRpc3BsYXlPYmplY3QpOlJlY3RhbmdsZVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2JvdW5kczsgLy9UT0RPXG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydHMgdGhlIDxjb2RlPnBvaW50PC9jb2RlPiBvYmplY3QgZnJvbSB0aGUgU2NlbmUoZ2xvYmFsKSBjb29yZGluYXRlc1xuXHQgKiB0byB0aGUgZGlzcGxheSBvYmplY3Qncyhsb2NhbCkgY29vcmRpbmF0ZXMuXG5cdCAqXG5cdCAqIDxwPlRvIHVzZSB0aGlzIG1ldGhvZCwgZmlyc3QgY3JlYXRlIGFuIGluc3RhbmNlIG9mIHRoZSBQb2ludCBjbGFzcy4gVGhlXG5cdCAqIDxpPng8L2k+IGFuZCA8aT55PC9pPiB2YWx1ZXMgdGhhdCB5b3UgYXNzaWduIHJlcHJlc2VudCBnbG9iYWwgY29vcmRpbmF0ZXNcblx0ICogYmVjYXVzZSB0aGV5IHJlbGF0ZSB0byB0aGUgb3JpZ2luKDAsMCkgb2YgdGhlIG1haW4gZGlzcGxheSBhcmVhLiBUaGVuXG5cdCAqIHBhc3MgdGhlIFBvaW50IGluc3RhbmNlIGFzIHRoZSBwYXJhbWV0ZXIgdG8gdGhlXG5cdCAqIDxjb2RlPmdsb2JhbFRvTG9jYWwoKTwvY29kZT4gbWV0aG9kLiBUaGUgbWV0aG9kIHJldHVybnMgYSBuZXcgUG9pbnQgb2JqZWN0XG5cdCAqIHdpdGggPGk+eDwvaT4gYW5kIDxpPnk8L2k+IHZhbHVlcyB0aGF0IHJlbGF0ZSB0byB0aGUgb3JpZ2luIG9mIHRoZSBkaXNwbGF5XG5cdCAqIG9iamVjdCBpbnN0ZWFkIG9mIHRoZSBvcmlnaW4gb2YgdGhlIFNjZW5lLjwvcD5cblx0ICpcblx0ICogQHBhcmFtIHBvaW50IEFuIG9iamVjdCBjcmVhdGVkIHdpdGggdGhlIFBvaW50IGNsYXNzLiBUaGUgUG9pbnQgb2JqZWN0XG5cdCAqICAgICAgICAgICAgICBzcGVjaWZpZXMgdGhlIDxpPng8L2k+IGFuZCA8aT55PC9pPiBjb29yZGluYXRlcyBhc1xuXHQgKiAgICAgICAgICAgICAgcHJvcGVydGllcy5cblx0ICogQHJldHVybiBBIFBvaW50IG9iamVjdCB3aXRoIGNvb3JkaW5hdGVzIHJlbGF0aXZlIHRvIHRoZSBkaXNwbGF5IG9iamVjdC5cblx0ICovXG5cdHB1YmxpYyBnbG9iYWxUb0xvY2FsKHBvaW50OlBvaW50KTpQb2ludFxuXHR7XG5cdFx0cmV0dXJuIHBvaW50OyAvL1RPRE9cblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBhIHR3by1kaW1lbnNpb25hbCBwb2ludCBmcm9tIHRoZSBTY2VuZShnbG9iYWwpIGNvb3JkaW5hdGVzIHRvIGFcblx0ICogdGhyZWUtZGltZW5zaW9uYWwgZGlzcGxheSBvYmplY3Qncyhsb2NhbCkgY29vcmRpbmF0ZXMuXG5cdCAqXG5cdCAqIDxwPlRvIHVzZSB0aGlzIG1ldGhvZCwgZmlyc3QgY3JlYXRlIGFuIGluc3RhbmNlIG9mIHRoZSBWZWN0b3IzRCBjbGFzcy4gVGhlIHgsXG5cdCAqIHkgYW5kIHogdmFsdWVzIHRoYXQgeW91IGFzc2lnbiB0byB0aGUgVmVjdG9yM0Qgb2JqZWN0IHJlcHJlc2VudCBnbG9iYWxcblx0ICogY29vcmRpbmF0ZXMgYmVjYXVzZSB0aGV5IGFyZSByZWxhdGl2ZSB0byB0aGUgb3JpZ2luKDAsMCwwKSBvZiB0aGUgc2NlbmUuIFRoZW5cblx0ICogcGFzcyB0aGUgVmVjdG9yM0Qgb2JqZWN0IHRvIHRoZSA8Y29kZT5nbG9iYWxUb0xvY2FsM0QoKTwvY29kZT4gbWV0aG9kIGFzIHRoZVxuXHQgKiA8Y29kZT5wb3NpdGlvbjwvY29kZT4gcGFyYW1ldGVyLlxuXHQgKiBUaGUgbWV0aG9kIHJldHVybnMgdGhyZWUtZGltZW5zaW9uYWwgY29vcmRpbmF0ZXMgYXMgYSBWZWN0b3IzRCBvYmplY3Rcblx0ICogY29udGFpbmluZyA8Y29kZT54PC9jb2RlPiwgPGNvZGU+eTwvY29kZT4sIGFuZCA8Y29kZT56PC9jb2RlPiB2YWx1ZXMgdGhhdFxuXHQgKiBhcmUgcmVsYXRpdmUgdG8gdGhlIG9yaWdpbiBvZiB0aGUgdGhyZWUtZGltZW5zaW9uYWwgZGlzcGxheSBvYmplY3QuPC9wPlxuXHQgKlxuXHQgKiBAcGFyYW0gcG9pbnQgQSBWZWN0b3IzRCBvYmplY3QgcmVwcmVzZW50aW5nIGdsb2JhbCB4LCB5IGFuZCB6IGNvb3JkaW5hdGVzIGluXG5cdCAqICAgICAgICAgICAgICB0aGUgc2NlbmUuXG5cdCAqIEByZXR1cm4gQSBWZWN0b3IzRCBvYmplY3Qgd2l0aCBjb29yZGluYXRlcyByZWxhdGl2ZSB0byB0aGUgdGhyZWUtZGltZW5zaW9uYWxcblx0ICogICAgICAgICBkaXNwbGF5IG9iamVjdC5cblx0ICovXG5cdHB1YmxpYyBnbG9iYWxUb0xvY2FsM0QocG9zaXRpb246VmVjdG9yM0QpOlZlY3RvcjNEXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pbnZlcnNlU2NlbmVUcmFuc2Zvcm0udHJhbnNmb3JtVmVjdG9yKHBvc2l0aW9uKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBFdmFsdWF0ZXMgdGhlIGJvdW5kaW5nIGJveCBvZiB0aGUgZGlzcGxheSBvYmplY3QgdG8gc2VlIGlmIGl0IG92ZXJsYXBzIG9yXG5cdCAqIGludGVyc2VjdHMgd2l0aCB0aGUgYm91bmRpbmcgYm94IG9mIHRoZSA8Y29kZT5vYmo8L2NvZGU+IGRpc3BsYXkgb2JqZWN0LlxuXHQgKlxuXHQgKiBAcGFyYW0gb2JqIFRoZSBkaXNwbGF5IG9iamVjdCB0byB0ZXN0IGFnYWluc3QuXG5cdCAqIEByZXR1cm4gPGNvZGU+dHJ1ZTwvY29kZT4gaWYgdGhlIGJvdW5kaW5nIGJveGVzIG9mIHRoZSBkaXNwbGF5IG9iamVjdHNcblx0ICogICAgICAgICBpbnRlcnNlY3Q7IDxjb2RlPmZhbHNlPC9jb2RlPiBpZiBub3QuXG5cdCAqL1xuXHRwdWJsaWMgaGl0VGVzdE9iamVjdChvYmo6RGlzcGxheU9iamVjdCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIGZhbHNlOyAvL1RPRE9cblx0fVxuXG5cdC8qKlxuXHQgKiBFdmFsdWF0ZXMgdGhlIGRpc3BsYXkgb2JqZWN0IHRvIHNlZSBpZiBpdCBvdmVybGFwcyBvciBpbnRlcnNlY3RzIHdpdGggdGhlXG5cdCAqIHBvaW50IHNwZWNpZmllZCBieSB0aGUgPGNvZGU+eDwvY29kZT4gYW5kIDxjb2RlPnk8L2NvZGU+IHBhcmFtZXRlcnMuIFRoZVxuXHQgKiA8Y29kZT54PC9jb2RlPiBhbmQgPGNvZGU+eTwvY29kZT4gcGFyYW1ldGVycyBzcGVjaWZ5IGEgcG9pbnQgaW4gdGhlXG5cdCAqIGNvb3JkaW5hdGUgc3BhY2Ugb2YgdGhlIFNjZW5lLCBub3QgdGhlIGRpc3BsYXkgb2JqZWN0IGNvbnRhaW5lciB0aGF0XG5cdCAqIGNvbnRhaW5zIHRoZSBkaXNwbGF5IG9iamVjdCh1bmxlc3MgdGhhdCBkaXNwbGF5IG9iamVjdCBjb250YWluZXIgaXMgdGhlXG5cdCAqIFNjZW5lKS5cblx0ICpcblx0ICogQHBhcmFtIHggICAgICAgICBUaGUgPGk+eDwvaT4gY29vcmRpbmF0ZSB0byB0ZXN0IGFnYWluc3QgdGhpcyBvYmplY3QuXG5cdCAqIEBwYXJhbSB5ICAgICAgICAgVGhlIDxpPnk8L2k+IGNvb3JkaW5hdGUgdG8gdGVzdCBhZ2FpbnN0IHRoaXMgb2JqZWN0LlxuXHQgKiBAcGFyYW0gc2hhcGVGbGFnIFdoZXRoZXIgdG8gY2hlY2sgYWdhaW5zdCB0aGUgYWN0dWFsIHBpeGVscyBvZiB0aGUgb2JqZWN0XG5cdCAqICAgICAgICAgICAgICAgICAoPGNvZGU+dHJ1ZTwvY29kZT4pIG9yIHRoZSBib3VuZGluZyBib3hcblx0ICogICAgICAgICAgICAgICAgICg8Y29kZT5mYWxzZTwvY29kZT4pLlxuXHQgKiBAcmV0dXJuIDxjb2RlPnRydWU8L2NvZGU+IGlmIHRoZSBkaXNwbGF5IG9iamVjdCBvdmVybGFwcyBvciBpbnRlcnNlY3RzXG5cdCAqICAgICAgICAgd2l0aCB0aGUgc3BlY2lmaWVkIHBvaW50OyA8Y29kZT5mYWxzZTwvY29kZT4gb3RoZXJ3aXNlLlxuXHQgKi9cblx0cHVibGljIGhpdFRlc3RQb2ludCh4Om51bWJlciwgeTpudW1iZXIsIHNoYXBlRmxhZzpib29sZWFuID0gZmFsc2UpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiBmYWxzZTsgLy9UT0RPXG5cdH1cblxuXHQvKipcblx0ICogQGluaGVyaXREb2Ncblx0ICovXG5cdHB1YmxpYyBpc0ludGVyc2VjdGluZ1JheShyYXlQb3NpdGlvbjpWZWN0b3IzRCwgcmF5RGlyZWN0aW9uOlZlY3RvcjNEKTpib29sZWFuXG5cdHtcblx0XHR2YXIgbG9jYWxSYXlQb3NpdGlvbjpWZWN0b3IzRCA9IHRoaXMuaW52ZXJzZVNjZW5lVHJhbnNmb3JtLnRyYW5zZm9ybVZlY3RvcihyYXlQb3NpdGlvbik7XG5cdFx0dmFyIGxvY2FsUmF5RGlyZWN0aW9uOlZlY3RvcjNEID0gdGhpcy5pbnZlcnNlU2NlbmVUcmFuc2Zvcm0uZGVsdGFUcmFuc2Zvcm1WZWN0b3IocmF5RGlyZWN0aW9uKTtcblx0XHR2YXIgcGlja2luZ0NvbGxpc2lvblZPOlBpY2tpbmdDb2xsaXNpb25WTyA9IHRoaXMuX2lQaWNraW5nQ29sbGlzaW9uVk87XG5cblx0XHRpZiAoIXBpY2tpbmdDb2xsaXNpb25WTy5sb2NhbE5vcm1hbClcblx0XHRcdHBpY2tpbmdDb2xsaXNpb25WTy5sb2NhbE5vcm1hbCA9IG5ldyBWZWN0b3IzRCgpO1xuXG5cdFx0dmFyIHJheUVudHJ5RGlzdGFuY2U6bnVtYmVyID0gdGhpcy5ib3VuZHMucmF5SW50ZXJzZWN0aW9uKGxvY2FsUmF5UG9zaXRpb24sIGxvY2FsUmF5RGlyZWN0aW9uLCBwaWNraW5nQ29sbGlzaW9uVk8ubG9jYWxOb3JtYWwpO1xuXG5cdFx0aWYgKHJheUVudHJ5RGlzdGFuY2UgPCAwKVxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXG5cdFx0cGlja2luZ0NvbGxpc2lvblZPLnJheUVudHJ5RGlzdGFuY2UgPSByYXlFbnRyeURpc3RhbmNlO1xuXHRcdHBpY2tpbmdDb2xsaXNpb25WTy5sb2NhbFJheVBvc2l0aW9uID0gbG9jYWxSYXlQb3NpdGlvbjtcblx0XHRwaWNraW5nQ29sbGlzaW9uVk8ubG9jYWxSYXlEaXJlY3Rpb24gPSBsb2NhbFJheURpcmVjdGlvbjtcblx0XHRwaWNraW5nQ29sbGlzaW9uVk8ucmF5UG9zaXRpb24gPSByYXlQb3NpdGlvbjtcblx0XHRwaWNraW5nQ29sbGlzaW9uVk8ucmF5RGlyZWN0aW9uID0gcmF5RGlyZWN0aW9uO1xuXHRcdHBpY2tpbmdDb2xsaXNpb25WTy5yYXlPcmlnaW5Jc0luc2lkZUJvdW5kcyA9IHJheUVudHJ5RGlzdGFuY2UgPT0gMDtcblxuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJvdGF0ZXMgdGhlIDNkIG9iamVjdCBhcm91bmQgdG8gZmFjZSBhIHBvaW50IGRlZmluZWQgcmVsYXRpdmUgdG8gdGhlIGxvY2FsIGNvb3JkaW5hdGVzIG9mIHRoZSBwYXJlbnQgPGNvZGU+T2JqZWN0Q29udGFpbmVyM0Q8L2NvZGU+LlxuXHQgKlxuXHQgKiBAcGFyYW0gICAgdGFyZ2V0ICAgICAgICBUaGUgdmVjdG9yIGRlZmluaW5nIHRoZSBwb2ludCB0byBiZSBsb29rZWQgYXRcblx0ICogQHBhcmFtICAgIHVwQXhpcyAgICAgICAgQW4gb3B0aW9uYWwgdmVjdG9yIHVzZWQgdG8gZGVmaW5lIHRoZSBkZXNpcmVkIHVwIG9yaWVudGF0aW9uIG9mIHRoZSAzZCBvYmplY3QgYWZ0ZXIgcm90YXRpb24gaGFzIG9jY3VycmVkXG5cdCAqL1xuXHRwdWJsaWMgbG9va0F0KHRhcmdldDpWZWN0b3IzRCwgdXBBeGlzOlZlY3RvcjNEID0gbnVsbClcblx0e1xuXG5cdFx0dmFyIHlBeGlzOlZlY3RvcjNEO1xuXHRcdHZhciB6QXhpczpWZWN0b3IzRDtcblx0XHR2YXIgeEF4aXM6VmVjdG9yM0Q7XG5cdFx0dmFyIHJhdzpBcnJheTxudW1iZXI+O1xuXG5cdFx0aWYgKHVwQXhpcyA9PSBudWxsKVxuXHRcdFx0dXBBeGlzID0gVmVjdG9yM0QuWV9BWElTO1xuXHRcdGVsc2Vcblx0XHRcdHVwQXhpcy5ub3JtYWxpemUoKTtcblxuXHRcdHpBeGlzID0gdGFyZ2V0LnN1YnRyYWN0KHRoaXMuX2lNYXRyaXgzRC5wb3NpdGlvbik7XG5cdFx0ekF4aXMubm9ybWFsaXplKCk7XG5cblx0XHR4QXhpcyA9IHVwQXhpcy5jcm9zc1Byb2R1Y3QoekF4aXMpO1xuXHRcdHhBeGlzLm5vcm1hbGl6ZSgpO1xuXG5cdFx0aWYgKHhBeGlzLmxlbmd0aCA8IDAuMDUpIHtcblx0XHRcdHhBeGlzLnggPSB1cEF4aXMueTtcblx0XHRcdHhBeGlzLnkgPSB1cEF4aXMueDtcblx0XHRcdHhBeGlzLnogPSAwO1xuXHRcdFx0eEF4aXMubm9ybWFsaXplKCk7XG5cdFx0fVxuXG5cdFx0eUF4aXMgPSB6QXhpcy5jcm9zc1Byb2R1Y3QoeEF4aXMpO1xuXG5cdFx0cmF3ID0gTWF0cml4M0RVdGlscy5SQVdfREFUQV9DT05UQUlORVI7XG5cblx0XHRyYXdbMF0gPSB4QXhpcy54O1xuXHRcdHJhd1sxXSA9IHhBeGlzLnk7XG5cdFx0cmF3WzJdID0geEF4aXMuejtcblx0XHRyYXdbM10gPSAwO1xuXG5cdFx0cmF3WzRdID0geUF4aXMueDtcblx0XHRyYXdbNV0gPSB5QXhpcy55O1xuXHRcdHJhd1s2XSA9IHlBeGlzLno7XG5cdFx0cmF3WzddID0gMDtcblxuXHRcdHJhd1s4XSA9IHpBeGlzLng7XG5cdFx0cmF3WzldID0gekF4aXMueTtcblx0XHRyYXdbMTBdID0gekF4aXMuejtcblx0XHRyYXdbMTFdID0gMDtcblxuXHRcdHZhciBtOk1hdHJpeDNEID0gbmV3IE1hdHJpeDNEKCk7XG5cdFx0bS5jb3B5UmF3RGF0YUZyb20ocmF3KTtcblxuXHRcdHZhciB2ZWM6VmVjdG9yM0QgPSBtLmRlY29tcG9zZSgpWzFdO1xuXG5cdFx0dGhpcy5fcm90YXRpb25YID0gdmVjLng7XG5cdFx0dGhpcy5fcm90YXRpb25ZID0gdmVjLnk7XG5cdFx0dGhpcy5fcm90YXRpb25aID0gdmVjLno7XG5cblx0XHR0aGlzLmludmFsaWRhdGVSb3RhdGlvbigpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIHRoZSA8Y29kZT5wb2ludDwvY29kZT4gb2JqZWN0IGZyb20gdGhlIGRpc3BsYXkgb2JqZWN0J3MobG9jYWwpXG5cdCAqIGNvb3JkaW5hdGVzIHRvIHRoZSBTY2VuZShnbG9iYWwpIGNvb3JkaW5hdGVzLlxuXHQgKlxuXHQgKiA8cD5UaGlzIG1ldGhvZCBhbGxvd3MgeW91IHRvIGNvbnZlcnQgYW55IGdpdmVuIDxpPng8L2k+IGFuZCA8aT55PC9pPlxuXHQgKiBjb29yZGluYXRlcyBmcm9tIHZhbHVlcyB0aGF0IGFyZSByZWxhdGl2ZSB0byB0aGUgb3JpZ2luKDAsMCkgb2YgYVxuXHQgKiBzcGVjaWZpYyBkaXNwbGF5IG9iamVjdChsb2NhbCBjb29yZGluYXRlcykgdG8gdmFsdWVzIHRoYXQgYXJlIHJlbGF0aXZlIHRvXG5cdCAqIHRoZSBvcmlnaW4gb2YgdGhlIFNjZW5lKGdsb2JhbCBjb29yZGluYXRlcykuPC9wPlxuXHQgKlxuXHQgKiA8cD5UbyB1c2UgdGhpcyBtZXRob2QsIGZpcnN0IGNyZWF0ZSBhbiBpbnN0YW5jZSBvZiB0aGUgUG9pbnQgY2xhc3MuIFRoZVxuXHQgKiA8aT54PC9pPiBhbmQgPGk+eTwvaT4gdmFsdWVzIHRoYXQgeW91IGFzc2lnbiByZXByZXNlbnQgbG9jYWwgY29vcmRpbmF0ZXNcblx0ICogYmVjYXVzZSB0aGV5IHJlbGF0ZSB0byB0aGUgb3JpZ2luIG9mIHRoZSBkaXNwbGF5IG9iamVjdC48L3A+XG5cdCAqXG5cdCAqIDxwPllvdSB0aGVuIHBhc3MgdGhlIFBvaW50IGluc3RhbmNlIHRoYXQgeW91IGNyZWF0ZWQgYXMgdGhlIHBhcmFtZXRlciB0b1xuXHQgKiB0aGUgPGNvZGU+bG9jYWxUb0dsb2JhbCgpPC9jb2RlPiBtZXRob2QuIFRoZSBtZXRob2QgcmV0dXJucyBhIG5ldyBQb2ludFxuXHQgKiBvYmplY3Qgd2l0aCA8aT54PC9pPiBhbmQgPGk+eTwvaT4gdmFsdWVzIHRoYXQgcmVsYXRlIHRvIHRoZSBvcmlnaW4gb2YgdGhlXG5cdCAqIFNjZW5lIGluc3RlYWQgb2YgdGhlIG9yaWdpbiBvZiB0aGUgZGlzcGxheSBvYmplY3QuPC9wPlxuXHQgKlxuXHQgKiBAcGFyYW0gcG9pbnQgVGhlIG5hbWUgb3IgaWRlbnRpZmllciBvZiBhIHBvaW50IGNyZWF0ZWQgd2l0aCB0aGUgUG9pbnRcblx0ICogICAgICAgICAgICAgIGNsYXNzLCBzcGVjaWZ5aW5nIHRoZSA8aT54PC9pPiBhbmQgPGk+eTwvaT4gY29vcmRpbmF0ZXMgYXNcblx0ICogICAgICAgICAgICAgIHByb3BlcnRpZXMuXG5cdCAqIEByZXR1cm4gQSBQb2ludCBvYmplY3Qgd2l0aCBjb29yZGluYXRlcyByZWxhdGl2ZSB0byB0aGUgU2NlbmUuXG5cdCAqL1xuXHRwdWJsaWMgbG9jYWxUb0dsb2JhbChwb2ludDpQb2ludCk6UG9pbnRcblx0e1xuXHRcdHJldHVybiBuZXcgUG9pbnQoKTsgLy9UT0RPXG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydHMgYSB0aHJlZS1kaW1lbnNpb25hbCBwb2ludCBvZiB0aGUgdGhyZWUtZGltZW5zaW9uYWwgZGlzcGxheVxuXHQgKiBvYmplY3Qncyhsb2NhbCkgY29vcmRpbmF0ZXMgdG8gYSB0aHJlZS1kaW1lbnNpb25hbCBwb2ludCBpbiB0aGUgU2NlbmVcblx0ICogKGdsb2JhbCkgY29vcmRpbmF0ZXMuXG5cdCAqXG5cdCAqIDxwPlRoaXMgbWV0aG9kIGFsbG93cyB5b3UgdG8gY29udmVydCBhbnkgZ2l2ZW4gPGk+eDwvaT4sIDxpPnk8L2k+IGFuZFxuXHQgKiA8aT56PC9pPiBjb29yZGluYXRlcyBmcm9tIHZhbHVlcyB0aGF0IGFyZSByZWxhdGl2ZSB0byB0aGUgb3JpZ2luKDAsMCwwKSBvZlxuXHQgKiBhIHNwZWNpZmljIGRpc3BsYXkgb2JqZWN0KGxvY2FsIGNvb3JkaW5hdGVzKSB0byB2YWx1ZXMgdGhhdCBhcmUgcmVsYXRpdmUgdG9cblx0ICogdGhlIG9yaWdpbiBvZiB0aGUgU2NlbmUoZ2xvYmFsIGNvb3JkaW5hdGVzKS48L3A+XG5cdCAqXG5cdCAqIDxwPlRvIHVzZSB0aGlzIG1ldGhvZCwgZmlyc3QgY3JlYXRlIGFuIGluc3RhbmNlIG9mIHRoZSBQb2ludCBjbGFzcy4gVGhlXG5cdCAqIDxpPng8L2k+IGFuZCA8aT55PC9pPiB2YWx1ZXMgdGhhdCB5b3UgYXNzaWduIHJlcHJlc2VudCBsb2NhbCBjb29yZGluYXRlc1xuXHQgKiBiZWNhdXNlIHRoZXkgcmVsYXRlIHRvIHRoZSBvcmlnaW4gb2YgdGhlIGRpc3BsYXkgb2JqZWN0LjwvcD5cblx0ICpcblx0ICogPHA+WW91IHRoZW4gcGFzcyB0aGUgVmVjdG9yM0QgaW5zdGFuY2UgdGhhdCB5b3UgY3JlYXRlZCBhcyB0aGUgcGFyYW1ldGVyIHRvXG5cdCAqIHRoZSA8Y29kZT5sb2NhbFRvR2xvYmFsM0QoKTwvY29kZT4gbWV0aG9kLiBUaGUgbWV0aG9kIHJldHVybnMgYSBuZXdcblx0ICogVmVjdG9yM0Qgb2JqZWN0IHdpdGggPGk+eDwvaT4sIDxpPnk8L2k+IGFuZCA8aT56PC9pPiB2YWx1ZXMgdGhhdCByZWxhdGUgdG9cblx0ICogdGhlIG9yaWdpbiBvZiB0aGUgU2NlbmUgaW5zdGVhZCBvZiB0aGUgb3JpZ2luIG9mIHRoZSBkaXNwbGF5IG9iamVjdC48L3A+XG5cdCAqXG5cdCAqIEBwYXJhbSBwb3NpdGlvbiBBIFZlY3RvcjNEIG9iamVjdCBjb250YWluaW5nIGVpdGhlciBhIHRocmVlLWRpbWVuc2lvbmFsXG5cdCAqICAgICAgICAgICAgICAgIHBvc2l0aW9uIG9yIHRoZSBjb29yZGluYXRlcyBvZiB0aGUgdGhyZWUtZGltZW5zaW9uYWxcblx0ICogICAgICAgICAgICAgICAgZGlzcGxheSBvYmplY3QuXG5cdCAqIEByZXR1cm4gQSBWZWN0b3IzRCBvYmplY3QgcmVwcmVzZW50aW5nIGEgdGhyZWUtZGltZW5zaW9uYWwgcG9zaXRpb24gaW5cblx0ICogICAgICAgICB0aGUgU2NlbmUuXG5cdCAqL1xuXHRwdWJsaWMgbG9jYWxUb0dsb2JhbDNEKHBvc2l0aW9uOlZlY3RvcjNEKTpWZWN0b3IzRFxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuc2NlbmVUcmFuc2Zvcm0udHJhbnNmb3JtVmVjdG9yKHBvc2l0aW9uKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBNb3ZlcyB0aGUgM2Qgb2JqZWN0IGRpcmVjdGx5IHRvIGEgcG9pbnQgaW4gc3BhY2Vcblx0ICpcblx0ICogQHBhcmFtICAgIGR4ICAgICAgICBUaGUgYW1vdW50IG9mIG1vdmVtZW50IGFsb25nIHRoZSBsb2NhbCB4IGF4aXMuXG5cdCAqIEBwYXJhbSAgICBkeSAgICAgICAgVGhlIGFtb3VudCBvZiBtb3ZlbWVudCBhbG9uZyB0aGUgbG9jYWwgeSBheGlzLlxuXHQgKiBAcGFyYW0gICAgZHogICAgICAgIFRoZSBhbW91bnQgb2YgbW92ZW1lbnQgYWxvbmcgdGhlIGxvY2FsIHogYXhpcy5cblx0ICovXG5cblx0cHVibGljIG1vdmVUbyhkeDpudW1iZXIsIGR5Om51bWJlciwgZHo6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3ggPT0gZHggJiYgdGhpcy5feSA9PSBkeSAmJiB0aGlzLl96ID09IGR6KVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5feCA9IGR4O1xuXHRcdHRoaXMuX3kgPSBkeTtcblx0XHR0aGlzLl96ID0gZHo7XG5cblx0XHR0aGlzLmludmFsaWRhdGVQb3NpdGlvbigpO1xuXHR9XG5cblx0LyoqXG5cdCAqIE1vdmVzIHRoZSBsb2NhbCBwb2ludCBhcm91bmQgd2hpY2ggdGhlIG9iamVjdCByb3RhdGVzLlxuXHQgKlxuXHQgKiBAcGFyYW0gICAgZHggICAgICAgIFRoZSBhbW91bnQgb2YgbW92ZW1lbnQgYWxvbmcgdGhlIGxvY2FsIHggYXhpcy5cblx0ICogQHBhcmFtICAgIGR5ICAgICAgICBUaGUgYW1vdW50IG9mIG1vdmVtZW50IGFsb25nIHRoZSBsb2NhbCB5IGF4aXMuXG5cdCAqIEBwYXJhbSAgICBkeiAgICAgICAgVGhlIGFtb3VudCBvZiBtb3ZlbWVudCBhbG9uZyB0aGUgbG9jYWwgeiBheGlzLlxuXHQgKi9cblx0cHVibGljIG1vdmVQaXZvdChkeDpudW1iZXIsIGR5Om51bWJlciwgZHo6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3Bpdm90ID09IG51bGwpXG5cdFx0XHR0aGlzLl9waXZvdCA9IG5ldyBWZWN0b3IzRCgpO1xuXG5cdFx0dGhpcy5fcGl2b3QueCArPSBkeDtcblx0XHR0aGlzLl9waXZvdC55ICs9IGR5O1xuXHRcdHRoaXMuX3Bpdm90LnogKz0gZHo7XG5cblx0XHR0aGlzLmludmFsaWRhdGVQaXZvdCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJvdGF0ZXMgdGhlIDNkIG9iamVjdCBhcm91bmQgaXQncyBsb2NhbCB4LWF4aXNcblx0ICpcblx0ICogQHBhcmFtICAgIGFuZ2xlICAgICAgICBUaGUgYW1vdW50IG9mIHJvdGF0aW9uIGluIGRlZ3JlZXNcblx0ICovXG5cdHB1YmxpYyBwaXRjaChhbmdsZTpudW1iZXIpXG5cdHtcblx0XHR0aGlzLnJvdGF0ZShWZWN0b3IzRC5YX0FYSVMsIGFuZ2xlKTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldFJlbmRlclNjZW5lVHJhbnNmb3JtKGNhbWVyYTpDYW1lcmEpOk1hdHJpeDNEXG5cdHtcblx0XHRpZiAodGhpcy5vcmllbnRhdGlvbk1vZGUgPT0gT3JpZW50YXRpb25Nb2RlLkNBTUVSQV9QTEFORSkge1xuXHRcdFx0dmFyIGNvbXBzOkFycmF5PFZlY3RvcjNEPiA9IGNhbWVyYS5zY2VuZVRyYW5zZm9ybS5kZWNvbXBvc2UoKTtcblx0XHRcdHZhciBzY2FsZTpWZWN0b3IzRCA9IGNvbXBzWzJdO1xuXHRcdFx0Y29tcHNbMF0gPSB0aGlzLnNjZW5lUG9zaXRpb247XG5cdFx0XHRzY2FsZS54ID0gdGhpcy5fcFNjYWxlWDtcblx0XHRcdHNjYWxlLnkgPSB0aGlzLl9wU2NhbGVZO1xuXHRcdFx0c2NhbGUueiA9IHRoaXMuX3BTY2FsZVo7XG5cdFx0XHR0aGlzLl9vcmllbnRhdGlvbk1hdHJpeC5yZWNvbXBvc2UoY29tcHMpO1xuXG5cdFx0XHQvL2FkZCBpbiBjYXNlIG9mIHBpdm90XG5cdFx0XHRpZiAoIXRoaXMuX3Bpdm90WmVybyAmJiB0aGlzLmFsaWdubWVudE1vZGUgPT0gQWxpZ25tZW50TW9kZS5QSVZPVF9QT0lOVClcblx0XHRcdFx0dGhpcy5fb3JpZW50YXRpb25NYXRyaXgucHJlcGVuZFRyYW5zbGF0aW9uKC10aGlzLl9waXZvdC54L3RoaXMuX3BTY2FsZVgsIC10aGlzLl9waXZvdC55L3RoaXMuX3BTY2FsZVksIC10aGlzLl9waXZvdC56L3RoaXMuX3BTY2FsZVopO1xuXG5cdFx0XHRyZXR1cm4gdGhpcy5fb3JpZW50YXRpb25NYXRyaXg7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMuc2NlbmVUcmFuc2Zvcm07XG5cdH1cblxuXHQvKipcblx0ICogUm90YXRlcyB0aGUgM2Qgb2JqZWN0IGFyb3VuZCBpdCdzIGxvY2FsIHotYXhpc1xuXHQgKlxuXHQgKiBAcGFyYW0gICAgYW5nbGUgICAgICAgIFRoZSBhbW91bnQgb2Ygcm90YXRpb24gaW4gZGVncmVlc1xuXHQgKi9cblx0cHVibGljIHJvbGwoYW5nbGU6bnVtYmVyKVxuXHR7XG5cdFx0dGhpcy5yb3RhdGUoVmVjdG9yM0QuWl9BWElTLCBhbmdsZSk7XG5cdH1cblxuXHQvKipcblx0ICogUm90YXRlcyB0aGUgM2Qgb2JqZWN0IGFyb3VuZCBhbiBheGlzIGJ5IGEgZGVmaW5lZCBhbmdsZVxuXHQgKlxuXHQgKiBAcGFyYW0gICAgYXhpcyAgICAgICAgVGhlIHZlY3RvciBkZWZpbmluZyB0aGUgYXhpcyBvZiByb3RhdGlvblxuXHQgKiBAcGFyYW0gICAgYW5nbGUgICAgICAgIFRoZSBhbW91bnQgb2Ygcm90YXRpb24gaW4gZGVncmVlc1xuXHQgKi9cblx0cHVibGljIHJvdGF0ZShheGlzOlZlY3RvcjNELCBhbmdsZTpudW1iZXIpXG5cdHtcblx0XHR2YXIgbTpNYXRyaXgzRCA9IG5ldyBNYXRyaXgzRCgpO1xuXHRcdG0ucHJlcGVuZFJvdGF0aW9uKGFuZ2xlLCBheGlzKTtcblxuXHRcdHZhciB2ZWM6VmVjdG9yM0QgPSBtLmRlY29tcG9zZSgpWzFdO1xuXG5cdFx0dGhpcy5fcm90YXRpb25YICs9IHZlYy54O1xuXHRcdHRoaXMuX3JvdGF0aW9uWSArPSB2ZWMueTtcblx0XHR0aGlzLl9yb3RhdGlvblogKz0gdmVjLno7XG5cblx0XHR0aGlzLmludmFsaWRhdGVSb3RhdGlvbigpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJvdGF0ZXMgdGhlIDNkIG9iamVjdCBkaXJlY3RseSB0byBhIGV1bGVyIGFuZ2xlXG5cdCAqXG5cdCAqIEBwYXJhbSAgICBheCAgICAgICAgVGhlIGFuZ2xlIGluIGRlZ3JlZXMgb2YgdGhlIHJvdGF0aW9uIGFyb3VuZCB0aGUgeCBheGlzLlxuXHQgKiBAcGFyYW0gICAgYXkgICAgICAgIFRoZSBhbmdsZSBpbiBkZWdyZWVzIG9mIHRoZSByb3RhdGlvbiBhcm91bmQgdGhlIHkgYXhpcy5cblx0ICogQHBhcmFtICAgIGF6ICAgICAgICBUaGUgYW5nbGUgaW4gZGVncmVlcyBvZiB0aGUgcm90YXRpb24gYXJvdW5kIHRoZSB6IGF4aXMuXG5cdCAqL1xuXHRwdWJsaWMgcm90YXRlVG8oYXg6bnVtYmVyLCBheTpudW1iZXIsIGF6Om51bWJlcilcblx0e1xuXHRcdHRoaXMuX3JvdGF0aW9uWCA9IGF4Kk1hdGhDb25zdHMuREVHUkVFU19UT19SQURJQU5TO1xuXHRcdHRoaXMuX3JvdGF0aW9uWSA9IGF5Kk1hdGhDb25zdHMuREVHUkVFU19UT19SQURJQU5TO1xuXHRcdHRoaXMuX3JvdGF0aW9uWiA9IGF6Kk1hdGhDb25zdHMuREVHUkVFU19UT19SQURJQU5TO1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlUm90YXRpb24oKTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIHJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZTpzdHJpbmcsIGxpc3RlbmVyOkZ1bmN0aW9uKVxuXHR7XG5cdFx0c3VwZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcik7XG5cblx0XHRpZiAodGhpcy5oYXNFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSlcblx0XHRcdHJldHVybjtcblxuXHRcdHN3aXRjaCAodHlwZSkge1xuXHRcdFx0Y2FzZSBEaXNwbGF5T2JqZWN0RXZlbnQuUE9TSVRJT05fQ0hBTkdFRDpcblx0XHRcdFx0dGhpcy5fbGlzdGVuVG9Qb3NpdGlvbkNoYW5nZWQgPSBmYWxzZTtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgRGlzcGxheU9iamVjdEV2ZW50LlJPVEFUSU9OX0NIQU5HRUQ6XG5cdFx0XHRcdHRoaXMuX2xpc3RlblRvUm90YXRpb25DaGFuZ2VkID0gZmFsc2U7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIERpc3BsYXlPYmplY3RFdmVudC5TQ0FMRV9DSEFOR0VEOlxuXHRcdFx0XHR0aGlzLl9saXN0ZW5Ub1NjYWxlQ2hhbmdlZCA9IGZhbHNlO1xuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogTW92ZXMgdGhlIDNkIG9iamVjdCBhbG9uZyBhIHZlY3RvciBieSBhIGRlZmluZWQgbGVuZ3RoXG5cdCAqXG5cdCAqIEBwYXJhbSAgICBheGlzICAgICAgICBUaGUgdmVjdG9yIGRlZmluaW5nIHRoZSBheGlzIG9mIG1vdmVtZW50XG5cdCAqIEBwYXJhbSAgICBkaXN0YW5jZSAgICBUaGUgbGVuZ3RoIG9mIHRoZSBtb3ZlbWVudFxuXHQgKi9cblx0cHVibGljIHRyYW5zbGF0ZShheGlzOlZlY3RvcjNELCBkaXN0YW5jZTpudW1iZXIpXG5cdHtcblx0XHR2YXIgeDpudW1iZXIgPSBheGlzLngsIHk6bnVtYmVyID0gYXhpcy55LCB6Om51bWJlciA9IGF4aXMuejtcblx0XHR2YXIgbGVuOm51bWJlciA9IGRpc3RhbmNlL01hdGguc3FydCh4KnggKyB5KnkgKyB6KnopO1xuXG5cdFx0dGhpcy5feCArPSB4Kmxlbjtcblx0XHR0aGlzLl95ICs9IHkqbGVuO1xuXHRcdHRoaXMuX3ogKz0geipsZW47XG5cblx0XHR0aGlzLmludmFsaWRhdGVQb3NpdGlvbigpO1xuXHR9XG5cblx0LyoqXG5cdCAqIE1vdmVzIHRoZSAzZCBvYmplY3QgYWxvbmcgYSB2ZWN0b3IgYnkgYSBkZWZpbmVkIGxlbmd0aFxuXHQgKlxuXHQgKiBAcGFyYW0gICAgYXhpcyAgICAgICAgVGhlIHZlY3RvciBkZWZpbmluZyB0aGUgYXhpcyBvZiBtb3ZlbWVudFxuXHQgKiBAcGFyYW0gICAgZGlzdGFuY2UgICAgVGhlIGxlbmd0aCBvZiB0aGUgbW92ZW1lbnRcblx0ICovXG5cdHB1YmxpYyB0cmFuc2xhdGVMb2NhbChheGlzOlZlY3RvcjNELCBkaXN0YW5jZTpudW1iZXIpXG5cdHtcblx0XHR2YXIgeDpudW1iZXIgPSBheGlzLngsIHk6bnVtYmVyID0gYXhpcy55LCB6Om51bWJlciA9IGF4aXMuejtcblx0XHR2YXIgbGVuOm51bWJlciA9IGRpc3RhbmNlL01hdGguc3FydCh4KnggKyB5KnkgKyB6KnopO1xuXG5cdFx0dGhpcy5faU1hdHJpeDNELnByZXBlbmRUcmFuc2xhdGlvbih4KmxlbiwgeSpsZW4sIHoqbGVuKTtcblxuXHRcdHRoaXMuX21hdHJpeDNELmNvcHlDb2x1bW5UbygzLCB0aGlzLl9wb3MpO1xuXG5cdFx0dGhpcy5feCA9IHRoaXMuX3Bvcy54O1xuXHRcdHRoaXMuX3kgPSB0aGlzLl9wb3MueTtcblx0XHR0aGlzLl96ID0gdGhpcy5fcG9zLno7XG5cblx0XHR0aGlzLmludmFsaWRhdGVQb3NpdGlvbigpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJvdGF0ZXMgdGhlIDNkIG9iamVjdCBhcm91bmQgaXQncyBsb2NhbCB5LWF4aXNcblx0ICpcblx0ICogQHBhcmFtICAgIGFuZ2xlICAgICAgICBUaGUgYW1vdW50IG9mIHJvdGF0aW9uIGluIGRlZ3JlZXNcblx0ICovXG5cdHB1YmxpYyB5YXcoYW5nbGU6bnVtYmVyKVxuXHR7XG5cdFx0dGhpcy5yb3RhdGUoVmVjdG9yM0QuWV9BWElTLCBhbmdsZSk7XG5cdH1cblxuXHQvKipcblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwdWJsaWMgX2lDb250cm9sbGVyOkNvbnRyb2xsZXJCYXNlO1xuXG5cdC8qKlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHB1YmxpYyBnZXQgX2lBc3NpZ25lZFBhcnRpdGlvbigpOlBhcnRpdGlvblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BJbXBsaWNpdFBhcnRpdGlvbjtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgdHJhbnNmb3JtYXRpb24gb2YgdGhlIDNkIG9iamVjdCwgcmVsYXRpdmUgdG8gdGhlIGxvY2FsIGNvb3JkaW5hdGVzIG9mIHRoZSBwYXJlbnQgPGNvZGU+T2JqZWN0Q29udGFpbmVyM0Q8L2NvZGU+LlxuXHQgKlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHB1YmxpYyBnZXQgX2lNYXRyaXgzRCgpOk1hdHJpeDNEXG5cdHtcblx0XHRpZiAodGhpcy5fbWF0cml4M0REaXJ0eSlcblx0XHRcdHRoaXMuX3BVcGRhdGVNYXRyaXgzRCgpO1xuXG5cdFx0cmV0dXJuIHRoaXMuX21hdHJpeDNEO1xuXHR9XG5cblx0cHVibGljIHNldCBfaU1hdHJpeDNEKHZhbDpNYXRyaXgzRClcblx0e1xuXG5cdFx0Ly8gVE9ETzogRnJvbSBBUzMgLSBEbyB3ZSBzdGlsbCBuZWVkIHRoaXMgaW4gSlMgP1xuXHRcdC8vcmlkaWN1bG91cyBtYXRyaXggZXJyb3Jcblx0XHQvKlxuXHRcdGlmICghdmFsLnJhd0RhdGFbMF0pIHtcblxuXHRcdFx0dmFyIHJhdzpudW1iZXJbXSA9IE1hdHJpeDNEVXRpbHMuUkFXX0RBVEFfQ09OVEFJTkVSO1xuXHRcdFx0dmFsLmNvcHlSYXdEYXRhVG8ocmF3KTtcblx0XHRcdHJhd1swXSA9IHRoaXMuX3NtYWxsZXN0TnVtYmVyO1xuXHRcdFx0dmFsLmNvcHlSYXdEYXRhRnJvbShyYXcpO1xuXHRcdH1cblx0XHQvLyovXG5cdFx0dmFyIGVsZW1lbnRzOkFycmF5PFZlY3RvcjNEPiA9IHZhbC5kZWNvbXBvc2UoKTtcblx0XHR2YXIgdmVjOlZlY3RvcjNEO1xuXG5cdFx0dmVjID0gZWxlbWVudHNbMF07XG5cblx0XHRpZiAodGhpcy5feCAhPSB2ZWMueCB8fCB0aGlzLl95ICE9IHZlYy55IHx8IHRoaXMuX3ogIT0gdmVjLnopIHtcblx0XHRcdHRoaXMuX3ggPSB2ZWMueDtcblx0XHRcdHRoaXMuX3kgPSB2ZWMueTtcblx0XHRcdHRoaXMuX3ogPSB2ZWMuejtcblxuXHRcdFx0dGhpcy5pbnZhbGlkYXRlUG9zaXRpb24oKTtcblx0XHR9XG5cblx0XHR2ZWMgPSBlbGVtZW50c1sxXTtcblxuXHRcdGlmICh0aGlzLl9yb3RhdGlvblggIT0gdmVjLnggfHwgdGhpcy5fcm90YXRpb25ZICE9IHZlYy55IHx8IHRoaXMuX3JvdGF0aW9uWiAhPSB2ZWMueikge1xuXHRcdFx0dGhpcy5fcm90YXRpb25YID0gdmVjLng7XG5cdFx0XHR0aGlzLl9yb3RhdGlvblkgPSB2ZWMueTtcblx0XHRcdHRoaXMuX3JvdGF0aW9uWiA9IHZlYy56O1xuXG5cdFx0XHR0aGlzLmludmFsaWRhdGVSb3RhdGlvbigpO1xuXHRcdH1cblxuXHRcdHZlYyA9IGVsZW1lbnRzWzJdO1xuXG5cdFx0aWYgKHRoaXMuX3BTY2FsZVggIT0gdmVjLnggfHwgdGhpcy5fcFNjYWxlWSAhPSB2ZWMueSB8fCB0aGlzLl9wU2NhbGVaICE9IHZlYy56KSB7XG5cdFx0XHR0aGlzLl9wU2NhbGVYID0gdmVjLng7XG5cdFx0XHR0aGlzLl9wU2NhbGVZID0gdmVjLnk7XG5cdFx0XHR0aGlzLl9wU2NhbGVaID0gdmVjLno7XG5cblx0XHRcdHRoaXMuaW52YWxpZGF0ZVNjYWxlKCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHVibGljIGdldCBfaVBpY2tpbmdDb2xsaXNpb25WTygpOlBpY2tpbmdDb2xsaXNpb25WT1xuXHR7XG5cdFx0aWYgKCF0aGlzLl9wUGlja2luZ0NvbGxpc2lvblZPKVxuXHRcdFx0dGhpcy5fcFBpY2tpbmdDb2xsaXNpb25WTyA9IG5ldyBQaWNraW5nQ29sbGlzaW9uVk8odGhpcyk7XG5cblx0XHRyZXR1cm4gdGhpcy5fcFBpY2tpbmdDb2xsaXNpb25WTztcblx0fVxuXG5cdC8qKlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHB1YmxpYyBpU2V0UGFyZW50KHZhbHVlOkRpc3BsYXlPYmplY3RDb250YWluZXIpXG5cdHtcblx0XHR0aGlzLl9wUGFyZW50ID0gdmFsdWU7XG5cblx0XHRpZiAodmFsdWUpIHtcblx0XHRcdHRoaXMuX3BVcGRhdGVJbXBsaWNpdE1vdXNlRW5hYmxlZCh2YWx1ZS5tb3VzZUNoaWxkcmVuKTtcblx0XHRcdHRoaXMuX3BVcGRhdGVJbXBsaWNpdFZpc2liaWxpdHkodmFsdWUuX2lJc1Zpc2libGUoKSk7XG5cdFx0XHR0aGlzLl9wVXBkYXRlSW1wbGljaXRQYXJ0aXRpb24odmFsdWUuX2lBc3NpZ25lZFBhcnRpdGlvbik7XG5cdFx0XHR0aGlzLl9pU2V0U2NlbmUodmFsdWUuX3BTY2VuZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX3BVcGRhdGVJbXBsaWNpdE1vdXNlRW5hYmxlZCh0cnVlKTtcblx0XHRcdHRoaXMuX3BVcGRhdGVJbXBsaWNpdFZpc2liaWxpdHkodHJ1ZSk7XG5cdFx0XHR0aGlzLl9wVXBkYXRlSW1wbGljaXRQYXJ0aXRpb24obnVsbCk7XG5cblx0XHRcdHRoaXMuX2lTZXRTY2VuZShudWxsKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQHByb3RlY3RlZFxuXHQgKi9cblx0cHVibGljIHBDcmVhdGVEZWZhdWx0Qm91bmRpbmdWb2x1bWUoKTpCb3VuZGluZ1ZvbHVtZUJhc2Vcblx0e1xuXHRcdC8vIHBvaW50IGxpZ2h0cyBzaG91bGQgYmUgdXNpbmcgc3BoZXJlIGJvdW5kc1xuXHRcdC8vIGRpcmVjdGlvbmFsIGxpZ2h0cyBzaG91bGQgYmUgdXNpbmcgbnVsbCBib3VuZHNcblx0XHRyZXR1cm4gbmV3IEF4aXNBbGlnbmVkQm91bmRpbmdCb3goKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcHJvdGVjdGVkXG5cdCAqL1xuXHRwdWJsaWMgcENyZWF0ZUVudGl0eVBhcnRpdGlvbk5vZGUoKTpFbnRpdHlOb2RlXG5cdHtcblx0XHR0aHJvdyBuZXcgQWJzdHJhY3RNZXRob2RFcnJvcigpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwcm90ZWN0ZWRcblx0ICovXG5cdHB1YmxpYyBwSW52YWxpZGF0ZUJvdW5kcygpXG5cdHtcblx0XHR0aGlzLl9wQm91bmRzSW52YWxpZCA9IHRydWU7XG5cdFx0dGhpcy5fd29ybGRCb3VuZHNJbnZhbGlkID0gdHJ1ZTtcblxuXG5cdFx0aWYgKHRoaXMuaXNFbnRpdHkpXG5cdFx0XHR0aGlzLmludmFsaWRhdGVQYXJ0aXRpb24oKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcHJvdGVjdGVkXG5cdCAqL1xuXHRwdWJsaWMgcEludmFsaWRhdGVTY2VuZVRyYW5zZm9ybSgpXG5cdHtcblx0XHR0aGlzLl9wU2NlbmVUcmFuc2Zvcm1EaXJ0eSA9ICF0aGlzLl9wSWdub3JlVHJhbnNmb3JtO1xuXHRcdHRoaXMuX2ludmVyc2VTY2VuZVRyYW5zZm9ybURpcnR5ID0gIXRoaXMuX3BJZ25vcmVUcmFuc2Zvcm07XG5cdFx0dGhpcy5fc2NlbmVQb3NpdGlvbkRpcnR5ID0gIXRoaXMuX3BJZ25vcmVUcmFuc2Zvcm07XG5cblx0XHR0aGlzLl93b3JsZEJvdW5kc0ludmFsaWQgPSAhdGhpcy5fcElnbm9yZVRyYW5zZm9ybTtcblxuXHRcdGlmICh0aGlzLmlzRW50aXR5KVxuXHRcdFx0dGhpcy5pbnZhbGlkYXRlUGFydGl0aW9uKCk7XG5cblx0XHRpZiAodGhpcy5fbGlzdGVuVG9TY2VuZVRyYW5zZm9ybUNoYW5nZWQpXG5cdFx0XHR0aGlzLm5vdGlmeVNjZW5lVHJhbnNmb3JtQ2hhbmdlKCk7XG5cdH1cblxuXHQvKipcblx0ICogQHByb3RlY3RlZFxuXHQgKi9cblx0cHVibGljIHBVcGRhdGVCb3VuZHMoKVxuXHR7XG5cdFx0dGhpcy5fd2lkdGggPSB0aGlzLl9wQm91bmRzLmFhYmIud2lkdGgqdGhpcy5fcFNjYWxlWDtcblx0XHR0aGlzLl9oZWlnaHQgPSB0aGlzLl9wQm91bmRzLmFhYmIuaGVpZ2h0KnRoaXMuX3BTY2FsZVk7XG5cdFx0dGhpcy5fZGVwdGggPSB0aGlzLl9wQm91bmRzLmFhYmIuZGVwdGgqdGhpcy5fcFNjYWxlWjtcblxuXHRcdHRoaXMuX3BCb3VuZHNJbnZhbGlkID0gZmFsc2U7XG5cdH1cblxuXHQvKipcblx0ICogQHByb3RlY3RlZFxuXHQgKi9cblx0cHVibGljIF9wVXBkYXRlSW1wbGljaXRNb3VzZUVuYWJsZWQodmFsdWU6Ym9vbGVhbilcblx0e1xuXHRcdHRoaXMuX3BJbXBsaWNpdE1vdXNlRW5hYmxlZCA9IHRoaXMuX2V4cGxpY2l0TW91c2VFbmFibGVkICYmIHZhbHVlO1xuXG5cdFx0Ly8gSWYgdGhlcmUgaXMgYSBwYXJlbnQgYW5kIHRoaXMgY2hpbGQgZG9lcyBub3QgaGF2ZSBhIHBpY2tpbmcgY29sbGlkZXIsIHVzZSBpdHMgcGFyZW50J3MgcGlja2luZyBjb2xsaWRlci5cblx0XHRpZiAodGhpcy5fcEltcGxpY2l0TW91c2VFbmFibGVkICYmIHRoaXMuX3BQYXJlbnQgJiYgIXRoaXMuX3BQaWNraW5nQ29sbGlkZXIpXG5cdFx0XHR0aGlzLl9wUGlja2luZ0NvbGxpZGVyID0gIHRoaXMuX3BQYXJlbnQuX3BQaWNraW5nQ29sbGlkZXI7XG5cdH1cblxuXHQvKipcblx0ICogQHByb3RlY3RlZFxuXHQgKi9cblx0cHVibGljIF9wVXBkYXRlSW1wbGljaXRQYXJ0aXRpb24odmFsdWU6UGFydGl0aW9uKVxuXHR7XG5cdFx0Ly8gYXNzaWduIHBhcmVudCBpbXBsaWNpdCBwYXJ0aXRpb24gaWYgbm8gZXhwbGljaXQgb25lIGlzIGdpdmVuXG5cdFx0dGhpcy5fcEltcGxpY2l0UGFydGl0aW9uID0gdGhpcy5fZXhwbGljaXRQYXJ0aXRpb24gfHwgdmFsdWU7XG5cdH1cblxuXHQvKipcblx0ICogQHByb3RlY3RlZFxuXHQgKi9cblx0cHVibGljIF9wVXBkYXRlSW1wbGljaXRWaXNpYmlsaXR5KHZhbHVlOmJvb2xlYW4pXG5cdHtcblx0XHR0aGlzLl9wSW1wbGljaXRWaXNpYmlsaXR5ID0gdGhpcy5fZXhwbGljaXRWaXNpYmlsaXR5ICYmIHZhbHVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwcm90ZWN0ZWRcblx0ICovXG5cdHB1YmxpYyBfcFVwZGF0ZU1hdHJpeDNEKClcblx0e1xuXG5cdFx0dGhpcy5fcG9zLnggPSB0aGlzLl94O1xuXHRcdHRoaXMuX3Bvcy55ID0gdGhpcy5feTtcblx0XHR0aGlzLl9wb3MueiA9IHRoaXMuX3o7XG5cblx0XHR0aGlzLl9yb3QueCA9IHRoaXMuX3JvdGF0aW9uWDtcblx0XHR0aGlzLl9yb3QueSA9IHRoaXMuX3JvdGF0aW9uWTtcblx0XHR0aGlzLl9yb3QueiA9IHRoaXMuX3JvdGF0aW9uWjtcblxuXHRcdHRoaXMuX3NjYS54ID0gdGhpcy5fcFNjYWxlWDtcblx0XHR0aGlzLl9zY2EueSA9IHRoaXMuX3BTY2FsZVk7XG5cdFx0dGhpcy5fc2NhLnogPSB0aGlzLl9wU2NhbGVaO1xuXG5cdFx0dGhpcy5fbWF0cml4M0QucmVjb21wb3NlKHRoaXMuX3RyYW5zZm9ybUNvbXBvbmVudHMpO1xuXG5cdFx0aWYgKCF0aGlzLl9waXZvdFplcm8pIHtcblx0XHRcdHRoaXMuX21hdHJpeDNELnByZXBlbmRUcmFuc2xhdGlvbigtdGhpcy5fcGl2b3QueC90aGlzLl9wU2NhbGVYLCAtdGhpcy5fcGl2b3QueS90aGlzLl9wU2NhbGVZLCAtdGhpcy5fcGl2b3Quei90aGlzLl9wU2NhbGVaKTtcblx0XHRcdGlmICh0aGlzLmFsaWdubWVudE1vZGUgIT0gQWxpZ25tZW50TW9kZS5QSVZPVF9QT0lOVClcblx0XHRcdFx0dGhpcy5fbWF0cml4M0QuYXBwZW5kVHJhbnNsYXRpb24odGhpcy5fcGl2b3QueCwgdGhpcy5fcGl2b3QueSwgdGhpcy5fcGl2b3Queik7XG5cdFx0fVxuXG5cdFx0dGhpcy5fbWF0cml4M0REaXJ0eSA9IGZhbHNlO1xuXHRcdHRoaXMuX3Bvc2l0aW9uRGlydHkgPSBmYWxzZTtcblx0XHR0aGlzLl9yb3RhdGlvbkRpcnR5ID0gZmFsc2U7XG5cdFx0dGhpcy5fc2NhbGVEaXJ0eSA9IGZhbHNlO1xuXHRcdHRoaXMuX3Bpdm90RGlydHkgPSBmYWxzZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcHJvdGVjdGVkXG5cdCAqL1xuXHRwdWJsaWMgcFVwZGF0ZVNjZW5lVHJhbnNmb3JtKClcblx0e1xuXHRcdGlmICh0aGlzLl9wUGFyZW50ICYmICF0aGlzLl9wUGFyZW50Ll9pSXNSb290KSB7XG5cdFx0XHR0aGlzLl9wU2NlbmVUcmFuc2Zvcm0uY29weUZyb20odGhpcy5fcFBhcmVudC5zY2VuZVRyYW5zZm9ybSk7XG5cdFx0XHR0aGlzLl9wU2NlbmVUcmFuc2Zvcm0ucHJlcGVuZCh0aGlzLl9pTWF0cml4M0QpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9wU2NlbmVUcmFuc2Zvcm0uY29weUZyb20odGhpcy5faU1hdHJpeDNEKTtcblx0XHR9XG5cblx0XHR0aGlzLl9wU2NlbmVUcmFuc2Zvcm1EaXJ0eSA9IGZhbHNlO1xuXHR9XG5cblx0cHVibGljIF9pQWRkUmVuZGVyYWJsZShyZW5kZXJhYmxlOklSZW5kZXJhYmxlKTpJUmVuZGVyYWJsZVxuXHR7XG5cdFx0dGhpcy5fcFJlbmRlcmFibGVzLnB1c2gocmVuZGVyYWJsZSk7XG5cblx0XHRyZXR1cm4gcmVuZGVyYWJsZTtcblx0fVxuXG5cblx0cHVibGljIF9pUmVtb3ZlUmVuZGVyYWJsZShyZW5kZXJhYmxlOklSZW5kZXJhYmxlKTpJUmVuZGVyYWJsZVxuXHR7XG5cdFx0dmFyIGluZGV4Om51bWJlciA9IHRoaXMuX3BSZW5kZXJhYmxlcy5pbmRleE9mKHJlbmRlcmFibGUpO1xuXG5cdFx0dGhpcy5fcFJlbmRlcmFibGVzLnNwbGljZShpbmRleCwgMSk7XG5cblx0XHRyZXR1cm4gcmVuZGVyYWJsZTtcblx0fVxuXG5cdC8qKlxuXHQgKiAvL1RPRE9cblx0ICpcblx0ICogQHBhcmFtIHNob3J0ZXN0Q29sbGlzaW9uRGlzdGFuY2Vcblx0ICogQHBhcmFtIGZpbmRDbG9zZXN0XG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxuXHQgKlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHB1YmxpYyBfaVRlc3RDb2xsaXNpb24oc2hvcnRlc3RDb2xsaXNpb25EaXN0YW5jZTpudW1iZXIsIGZpbmRDbG9zZXN0OmJvb2xlYW4pOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIF9pSW50ZXJuYWxVcGRhdGUoKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2lDb250cm9sbGVyKVxuXHRcdFx0dGhpcy5faUNvbnRyb2xsZXIudXBkYXRlKCk7XG5cdH1cblxuXHQvKipcblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwdWJsaWMgX2lJc1Zpc2libGUoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcEltcGxpY2l0VmlzaWJpbGl0eTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHB1YmxpYyBfaUlzTW91c2VFbmFibGVkKCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BJbXBsaWNpdE1vdXNlRW5hYmxlZDtcblx0fVxuXG5cdC8qKlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHB1YmxpYyBfaVNldFNjZW5lKHZhbHVlOlNjZW5lKVxuXHR7XG5cdFx0Ly8gdGVzdCB0byBzZWUgaWYgd2UncmUgc3dpdGNoaW5nIHJvb3RzIHdoaWxlIHdlJ3JlIGFscmVhZHkgdXNpbmcgYSBzY2VuZSBwYXJ0aXRpb25cblx0XHQvKlxuXHRcdGlmICh2YWx1ZSA9PSBudWxsKVxuXHRcdFx0dGhpcy5fb2xkU2NlbmUgPSB0aGlzLl9wU2NlbmU7XG5cblx0XHRpZiAodGhpcy5fZXhwbGljaXRQYXJ0aXRpb24gJiYgdGhpcy5fb2xkU2NlbmUgJiYgdGhpcy5fb2xkU2NlbmUgIT0gdGhpcy5fcFNjZW5lKVxuXHRcdFx0dGhpcy5wYXJ0aXRpb24gPSBudWxsO1xuXG5cdFx0aWYgKHZhbHVlKVxuXHRcdFx0dGhpcy5fb2xkU2NlbmUgPSBudWxsO1xuXG5cdFx0Ly8gZW5kIG9mIHN0dXBpZCBwYXJ0aXRpb24gdGVzdCBjb2RlXG5cdFx0Ly8qL1xuXG5cdFx0aWYgKHRoaXMuX3BTY2VuZSA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3BVcGRhdGVTY2VuZSh2YWx1ZSk7XG5cblx0XHRpZiAoIXRoaXMuX3BTY2VuZVRyYW5zZm9ybURpcnR5ICYmICF0aGlzLl9wSWdub3JlVHJhbnNmb3JtKVxuXHRcdFx0dGhpcy5wSW52YWxpZGF0ZVNjZW5lVHJhbnNmb3JtKCk7XG5cdH1cblxuXHQvKipcblx0ICogQHByb3RlY3RlZFxuXHQgKi9cblx0cHVibGljIF9wVXBkYXRlU2NlbmUodmFsdWU6U2NlbmUpXG5cdHtcblx0XHRpZiAodGhpcy5fcFNjZW5lKSB7XG5cdFx0XHR0aGlzLl9wU2NlbmUuZGlzcGF0Y2hFdmVudChuZXcgU2NlbmVFdmVudChTY2VuZUV2ZW50LlJFTU9WRURfRlJPTV9TQ0VORSwgdGhpcykpO1xuXG5cdFx0XHQvL3VucmVnaXN0ZXIgZW50aXR5IGZyb20gY3VycmVudCBzY2VuZVxuXHRcdFx0dGhpcy5fcFNjZW5lLmlVbnJlZ2lzdGVyRW50aXR5KHRoaXMpO1xuXHRcdH1cblxuXHRcdHRoaXMuX3BTY2VuZSA9IHZhbHVlO1xuXG5cdFx0aWYgKHZhbHVlKSB7XG5cdFx0XHR2YWx1ZS5kaXNwYXRjaEV2ZW50KG5ldyBTY2VuZUV2ZW50KFNjZW5lRXZlbnQuQURERURfVE9fU0NFTkUsIHRoaXMpKTtcblxuXHRcdFx0Ly9yZWdpc3RlciBlbnRpdHkgd2l0aCBuZXcgc2NlbmVcblx0XHRcdHZhbHVlLmlSZWdpc3RlckVudGl0eSh0aGlzKTtcblx0XHR9XG5cblx0XHR0aGlzLm5vdGlmeVNjZW5lQ2hhbmdlKCk7XG5cdH1cblxuXHQvKipcblx0ICogQHByaXZhdGVcblx0ICovXG5cdHByaXZhdGUgbm90aWZ5UG9zaXRpb25DaGFuZ2VkKClcblx0e1xuXHRcdGlmICghdGhpcy5fcG9zaXRpb25DaGFuZ2VkKVxuXHRcdFx0dGhpcy5fcG9zaXRpb25DaGFuZ2VkID0gbmV3IERpc3BsYXlPYmplY3RFdmVudChEaXNwbGF5T2JqZWN0RXZlbnQuUE9TSVRJT05fQ0hBTkdFRCwgdGhpcyk7XG5cblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQodGhpcy5fcG9zaXRpb25DaGFuZ2VkKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0cHJpdmF0ZSBub3RpZnlSb3RhdGlvbkNoYW5nZWQoKVxuXHR7XG5cdFx0aWYgKCF0aGlzLl9yb3RhdGlvbkNoYW5nZWQpXG5cdFx0XHR0aGlzLl9yb3RhdGlvbkNoYW5nZWQgPSBuZXcgRGlzcGxheU9iamVjdEV2ZW50KERpc3BsYXlPYmplY3RFdmVudC5ST1RBVElPTl9DSEFOR0VELCB0aGlzKTtcblxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCh0aGlzLl9yb3RhdGlvbkNoYW5nZWQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRwcml2YXRlIG5vdGlmeVNjYWxlQ2hhbmdlZCgpXG5cdHtcblx0XHRpZiAoIXRoaXMuX3NjYWxlQ2hhbmdlZClcblx0XHRcdHRoaXMuX3NjYWxlQ2hhbmdlZCA9IG5ldyBEaXNwbGF5T2JqZWN0RXZlbnQoRGlzcGxheU9iamVjdEV2ZW50LlNDQUxFX0NIQU5HRUQsIHRoaXMpO1xuXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KHRoaXMuX3NjYWxlQ2hhbmdlZCk7XG5cdH1cblxuXHQvKipcblx0ICogQHByaXZhdGVcblx0ICovXG5cdHByaXZhdGUgbm90aWZ5U2NlbmVDaGFuZ2UoKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2xpc3RlblRvU2NlbmVDaGFuZ2VkKSB7XG5cdFx0XHRpZiAoIXRoaXMuX3NjZW5lY2hhbmdlZClcblx0XHRcdFx0dGhpcy5fc2NlbmVjaGFuZ2VkID0gbmV3IERpc3BsYXlPYmplY3RFdmVudChEaXNwbGF5T2JqZWN0RXZlbnQuU0NFTkVfQ0hBTkdFRCwgdGhpcyk7XG5cblx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudCh0aGlzLl9zY2VuZWNoYW5nZWQpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0cHJpdmF0ZSBub3RpZnlTY2VuZVRyYW5zZm9ybUNoYW5nZSgpXG5cdHtcblx0XHRpZiAoIXRoaXMuX3NjZW5lVHJhbnNmb3JtQ2hhbmdlZClcblx0XHRcdHRoaXMuX3NjZW5lVHJhbnNmb3JtQ2hhbmdlZCA9IG5ldyBEaXNwbGF5T2JqZWN0RXZlbnQoRGlzcGxheU9iamVjdEV2ZW50LlNDRU5FVFJBTlNGT1JNX0NIQU5HRUQsIHRoaXMpO1xuXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KHRoaXMuX3NjZW5lVHJhbnNmb3JtQ2hhbmdlZCk7XG5cdH1cblxuXHQvKipcblx0ICogSW52YWxpZGF0ZXMgdGhlIDNEIHRyYW5zZm9ybWF0aW9uIG1hdHJpeCwgY2F1c2luZyBpdCB0byBiZSB1cGRhdGVkIHVwb24gdGhlIG5leHQgcmVxdWVzdFxuXHQgKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0cHJpdmF0ZSBpbnZhbGlkYXRlTWF0cml4M0QoKTp2b2lkXG5cdHtcblx0XHRpZiAodGhpcy5fbWF0cml4M0REaXJ0eSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX21hdHJpeDNERGlydHkgPSB0cnVlO1xuXG5cdFx0aWYgKCF0aGlzLl9wU2NlbmVUcmFuc2Zvcm1EaXJ0eSAmJiAhdGhpcy5fcElnbm9yZVRyYW5zZm9ybSlcblx0XHRcdHRoaXMucEludmFsaWRhdGVTY2VuZVRyYW5zZm9ybSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRwcml2YXRlIGludmFsaWRhdGVQYXJ0aXRpb24oKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2lBc3NpZ25lZFBhcnRpdGlvbilcblx0XHRcdHRoaXMuX2lBc3NpZ25lZFBhcnRpdGlvbi5pTWFya0ZvclVwZGF0ZSh0aGlzKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0cHJpdmF0ZSBpbnZhbGlkYXRlUGl2b3QoKVxuXHR7XG5cdFx0dGhpcy5fcGl2b3RaZXJvID0gKHRoaXMuX3Bpdm90LnggPT0gMCkgJiYgKHRoaXMuX3Bpdm90LnkgPT0gMCkgJiYgKHRoaXMuX3Bpdm90LnogPT0gMCk7XG5cblx0XHRpZiAodGhpcy5fcGl2b3REaXJ0eSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3Bpdm90RGlydHkgPSB0cnVlO1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlTWF0cml4M0QoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0cHJpdmF0ZSBpbnZhbGlkYXRlUG9zaXRpb24oKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3Bvc2l0aW9uRGlydHkpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9wb3NpdGlvbkRpcnR5ID0gdHJ1ZTtcblxuXHRcdHRoaXMuaW52YWxpZGF0ZU1hdHJpeDNEKCk7XG5cblx0XHRpZiAodGhpcy5fbGlzdGVuVG9Qb3NpdGlvbkNoYW5nZWQpXG5cdFx0XHR0aGlzLm5vdGlmeVBvc2l0aW9uQ2hhbmdlZCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRwcml2YXRlIGludmFsaWRhdGVSb3RhdGlvbigpXG5cdHtcblx0XHRpZiAodGhpcy5fcm90YXRpb25EaXJ0eSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3JvdGF0aW9uRGlydHkgPSB0cnVlO1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlTWF0cml4M0QoKTtcblxuXHRcdGlmICh0aGlzLl9saXN0ZW5Ub1JvdGF0aW9uQ2hhbmdlZClcblx0XHRcdHRoaXMubm90aWZ5Um90YXRpb25DaGFuZ2VkKCk7XG5cdH1cblxuXHQvKipcblx0ICogQHByaXZhdGVcblx0ICovXG5cdHByaXZhdGUgaW52YWxpZGF0ZVNjYWxlKClcblx0e1xuXHRcdGlmICh0aGlzLl9zY2FsZURpcnR5KVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fc2NhbGVEaXJ0eSA9IHRydWU7XG5cblx0XHR0aGlzLmludmFsaWRhdGVNYXRyaXgzRCgpO1xuXG5cdFx0aWYgKHRoaXMuX2xpc3RlblRvU2NhbGVDaGFuZ2VkKVxuXHRcdFx0dGhpcy5ub3RpZnlTY2FsZUNoYW5nZWQoKTtcblx0fVxufVxuXG5leHBvcnQgPSBEaXNwbGF5T2JqZWN0OyJdfQ==