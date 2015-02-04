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
 * @event addedToStage     Dispatched when a display object is added to the on
 *                         stage display list, either directly or through the
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
 * @event removedFromStage Dispatched when a display object is about to be
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
 *                         <code>invalidate()</code> method of the Stage
 *                         object each time you want a <code>render</code>
 *                         event to be dispatched. <code>Render</code> events
 *                         are dispatched to an object only if there is mutual
 *                         trust between it and the object that called
 *                         <code>Stage.invalidate()</code>. This event is a
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
         * <code>root</code> property of the Stage object is the Stage object itself.
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
     * coordinates to Stage coordinates, or Stage coordinates to local
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
     * Converts the <code>point</code> object from the Stage(global) coordinates
     * to the display object's(local) coordinates.
     *
     * <p>To use this method, first create an instance of the Point class. The
     * <i>x</i> and <i>y</i> values that you assign represent global coordinates
     * because they relate to the origin(0,0) of the main display area. Then
     * pass the Point instance as the parameter to the
     * <code>globalToLocal()</code> method. The method returns a new Point object
     * with <i>x</i> and <i>y</i> values that relate to the origin of the display
     * object instead of the origin of the Stage.</p>
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
     * Converts a two-dimensional point from the Stage(global) coordinates to a
     * three-dimensional display object's(local) coordinates.
     *
     * <p>To use this method, first create an instance of the Point class. The x
     * and y values that you assign to the Point object represent global
     * coordinates because they are relative to the origin(0,0) of the main
     * display area. Then pass the Point object to the
     * <code>globalToLocal3D()</code> method as the <code>point</code> parameter.
     * The method returns three-dimensional coordinates as a Vector3D object
     * containing <code>x</code>, <code>y</code>, and <code>z</code> values that
     * are relative to the origin of the three-dimensional display object.</p>
     *
     * @param point A two dimensional Point object representing global x and y
     *              coordinates.
     * @return A Vector3D object with coordinates relative to the
     *         three-dimensional display object.
     */
    DisplayObject.prototype.globalToLocal3D = function (point) {
        return new Vector3D(); //TODO
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
     * coordinate space of the Stage, not the display object container that
     * contains the display object(unless that display object container is the
     * Stage).
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
     * Converts a three-dimensional point of the three-dimensional display
     * object's(local) coordinates to a two-dimensional point in the Stage
     * (global) coordinates.
     *
     * <p>For example, you can only use two-dimensional coordinates(x,y) to draw
     * with the <code>display.Graphics</code> methods. To draw a
     * three-dimensional object, you need to map the three-dimensional
     * coordinates of a display object to two-dimensional coordinates. First,
     * create an instance of the Vector3D class that holds the x-, y-, and z-
     * coordinates of the three-dimensional display object. Then pass the
     * Vector3D object to the <code>local3DToGlobal()</code> method as the
     * <code>point3d</code> parameter. The method returns a two-dimensional Point
     * object that can be used with the Graphics API to draw the
     * three-dimensional object.</p>
     *
     * @param point3d A Vector3D object containing either a three-dimensional
     *                point or the coordinates of the three-dimensional display
     *                object.
     * @return A two-dimensional point representing a three-dimensional point in
     *         two-dimensional space.
     */
    DisplayObject.prototype.local3DToGlobal = function (point3d) {
        return new Point(); //TODO
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
     * coordinates to the Stage(global) coordinates.
     *
     * <p>This method allows you to convert any given <i>x</i> and <i>y</i>
     * coordinates from values that are relative to the origin(0,0) of a
     * specific display object(local coordinates) to values that are relative to
     * the origin of the Stage(global coordinates).</p>
     *
     * <p>To use this method, first create an instance of the Point class. The
     * <i>x</i> and <i>y</i> values that you assign represent local coordinates
     * because they relate to the origin of the display object.</p>
     *
     * <p>You then pass the Point instance that you created as the parameter to
     * the <code>localToGlobal()</code> method. The method returns a new Point
     * object with <i>x</i> and <i>y</i> values that relate to the origin of the
     * Stage instead of the origin of the display object.</p>
     *
     * @param point The name or identifier of a point created with the Point
     *              class, specifying the <i>x</i> and <i>y</i> coordinates as
     *              properties.
     * @return A Point object with coordinates relative to the Stage.
     */
    DisplayObject.prototype.localToGlobal = function (point) {
        return new Point(); //TODO
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0Rpc3BsYXlPYmplY3QudHMiXSwibmFtZXMiOlsiRGlzcGxheU9iamVjdCIsIkRpc3BsYXlPYmplY3QuY29uc3RydWN0b3IiLCJEaXNwbGF5T2JqZWN0LmJvdW5kcyIsIkRpc3BsYXlPYmplY3QuZGVwdGgiLCJEaXNwbGF5T2JqZWN0LmV1bGVycyIsIkRpc3BsYXlPYmplY3QuaGVpZ2h0IiwiRGlzcGxheU9iamVjdC5pbmRleCIsIkRpc3BsYXlPYmplY3QuaW52ZXJzZVNjZW5lVHJhbnNmb3JtIiwiRGlzcGxheU9iamVjdC5pZ25vcmVUcmFuc2Zvcm0iLCJEaXNwbGF5T2JqZWN0LmlzRW50aXR5IiwiRGlzcGxheU9iamVjdC5sb2FkZXJJbmZvIiwiRGlzcGxheU9iamVjdC5tb3VzZUVuYWJsZWQiLCJEaXNwbGF5T2JqZWN0Lm1vdXNlWCIsIkRpc3BsYXlPYmplY3QubW91c2VZIiwiRGlzcGxheU9iamVjdC5wYXJlbnQiLCJEaXNwbGF5T2JqZWN0LnBhcnRpdGlvbiIsIkRpc3BsYXlPYmplY3QucGFydGl0aW9uTm9kZSIsIkRpc3BsYXlPYmplY3QucGlja2luZ0NvbGxpZGVyIiwiRGlzcGxheU9iamVjdC5waXZvdCIsIkRpc3BsYXlPYmplY3Qucm9vdCIsIkRpc3BsYXlPYmplY3Qucm90YXRpb25YIiwiRGlzcGxheU9iamVjdC5yb3RhdGlvblkiLCJEaXNwbGF5T2JqZWN0LnJvdGF0aW9uWiIsIkRpc3BsYXlPYmplY3Quc2NhbGVYIiwiRGlzcGxheU9iamVjdC5zY2FsZVkiLCJEaXNwbGF5T2JqZWN0LnNjYWxlWiIsIkRpc3BsYXlPYmplY3Quc2NlbmUiLCJEaXNwbGF5T2JqZWN0LnNjZW5lUG9zaXRpb24iLCJEaXNwbGF5T2JqZWN0LnNjZW5lVHJhbnNmb3JtIiwiRGlzcGxheU9iamVjdC5zaGFkZXJQaWNraW5nRGV0YWlscyIsIkRpc3BsYXlPYmplY3QuYm91bmRzVmlzaWJsZSIsIkRpc3BsYXlPYmplY3QudHJhbnNmb3JtIiwiRGlzcGxheU9iamVjdC52aXNpYmxlIiwiRGlzcGxheU9iamVjdC53aWR0aCIsIkRpc3BsYXlPYmplY3Qud29ybGRCb3VuZHMiLCJEaXNwbGF5T2JqZWN0LngiLCJEaXNwbGF5T2JqZWN0LnkiLCJEaXNwbGF5T2JqZWN0LnoiLCJEaXNwbGF5T2JqZWN0LnpPZmZzZXQiLCJEaXNwbGF5T2JqZWN0LmFkZEV2ZW50TGlzdGVuZXIiLCJEaXNwbGF5T2JqZWN0LmNsb25lIiwiRGlzcGxheU9iamVjdC5kaXNwb3NlIiwiRGlzcGxheU9iamVjdC5kaXNwb3NlQXNzZXQiLCJEaXNwbGF5T2JqZWN0LmdldEJvdW5kcyIsIkRpc3BsYXlPYmplY3QuZ2V0UmVjdCIsIkRpc3BsYXlPYmplY3QuZ2xvYmFsVG9Mb2NhbCIsIkRpc3BsYXlPYmplY3QuZ2xvYmFsVG9Mb2NhbDNEIiwiRGlzcGxheU9iamVjdC5oaXRUZXN0T2JqZWN0IiwiRGlzcGxheU9iamVjdC5oaXRUZXN0UG9pbnQiLCJEaXNwbGF5T2JqZWN0LmlzSW50ZXJzZWN0aW5nUmF5IiwiRGlzcGxheU9iamVjdC5sb2NhbDNEVG9HbG9iYWwiLCJEaXNwbGF5T2JqZWN0Lmxvb2tBdCIsIkRpc3BsYXlPYmplY3QubG9jYWxUb0dsb2JhbCIsIkRpc3BsYXlPYmplY3QubW92ZVRvIiwiRGlzcGxheU9iamVjdC5tb3ZlUGl2b3QiLCJEaXNwbGF5T2JqZWN0LnBpdGNoIiwiRGlzcGxheU9iamVjdC5nZXRSZW5kZXJTY2VuZVRyYW5zZm9ybSIsIkRpc3BsYXlPYmplY3Qucm9sbCIsIkRpc3BsYXlPYmplY3Qucm90YXRlIiwiRGlzcGxheU9iamVjdC5yb3RhdGVUbyIsIkRpc3BsYXlPYmplY3QucmVtb3ZlRXZlbnRMaXN0ZW5lciIsIkRpc3BsYXlPYmplY3QudHJhbnNsYXRlIiwiRGlzcGxheU9iamVjdC50cmFuc2xhdGVMb2NhbCIsIkRpc3BsYXlPYmplY3QueWF3IiwiRGlzcGxheU9iamVjdC5faUFzc2lnbmVkUGFydGl0aW9uIiwiRGlzcGxheU9iamVjdC5faU1hdHJpeDNEIiwiRGlzcGxheU9iamVjdC5faVBpY2tpbmdDb2xsaXNpb25WTyIsIkRpc3BsYXlPYmplY3QuaVNldFBhcmVudCIsIkRpc3BsYXlPYmplY3QucENyZWF0ZURlZmF1bHRCb3VuZGluZ1ZvbHVtZSIsIkRpc3BsYXlPYmplY3QucENyZWF0ZUVudGl0eVBhcnRpdGlvbk5vZGUiLCJEaXNwbGF5T2JqZWN0LnBJbnZhbGlkYXRlQm91bmRzIiwiRGlzcGxheU9iamVjdC5wSW52YWxpZGF0ZVNjZW5lVHJhbnNmb3JtIiwiRGlzcGxheU9iamVjdC5wVXBkYXRlQm91bmRzIiwiRGlzcGxheU9iamVjdC5fcFVwZGF0ZUltcGxpY2l0TW91c2VFbmFibGVkIiwiRGlzcGxheU9iamVjdC5fcFVwZGF0ZUltcGxpY2l0UGFydGl0aW9uIiwiRGlzcGxheU9iamVjdC5fcFVwZGF0ZUltcGxpY2l0VmlzaWJpbGl0eSIsIkRpc3BsYXlPYmplY3QuX3BVcGRhdGVNYXRyaXgzRCIsIkRpc3BsYXlPYmplY3QucFVwZGF0ZVNjZW5lVHJhbnNmb3JtIiwiRGlzcGxheU9iamVjdC5faUFkZFJlbmRlcmFibGUiLCJEaXNwbGF5T2JqZWN0Ll9pUmVtb3ZlUmVuZGVyYWJsZSIsIkRpc3BsYXlPYmplY3QuX2lUZXN0Q29sbGlzaW9uIiwiRGlzcGxheU9iamVjdC5faUludGVybmFsVXBkYXRlIiwiRGlzcGxheU9iamVjdC5faUlzVmlzaWJsZSIsIkRpc3BsYXlPYmplY3QuX2lJc01vdXNlRW5hYmxlZCIsIkRpc3BsYXlPYmplY3QuX2lTZXRTY2VuZSIsIkRpc3BsYXlPYmplY3QuX3BVcGRhdGVTY2VuZSIsIkRpc3BsYXlPYmplY3Qubm90aWZ5UG9zaXRpb25DaGFuZ2VkIiwiRGlzcGxheU9iamVjdC5ub3RpZnlSb3RhdGlvbkNoYW5nZWQiLCJEaXNwbGF5T2JqZWN0Lm5vdGlmeVNjYWxlQ2hhbmdlZCIsIkRpc3BsYXlPYmplY3Qubm90aWZ5U2NlbmVDaGFuZ2UiLCJEaXNwbGF5T2JqZWN0Lm5vdGlmeVNjZW5lVHJhbnNmb3JtQ2hhbmdlIiwiRGlzcGxheU9iamVjdC5pbnZhbGlkYXRlTWF0cml4M0QiLCJEaXNwbGF5T2JqZWN0LmludmFsaWRhdGVQYXJ0aXRpb24iLCJEaXNwbGF5T2JqZWN0LmludmFsaWRhdGVQaXZvdCIsIkRpc3BsYXlPYmplY3QuaW52YWxpZGF0ZVBvc2l0aW9uIiwiRGlzcGxheU9iamVjdC5pbnZhbGlkYXRlUm90YXRpb24iLCJEaXNwbGF5T2JqZWN0LmludmFsaWRhdGVTY2FsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTyxzQkFBc0IsV0FBVywrQ0FBK0MsQ0FBQyxDQUFDO0FBRXpGLElBQU8sVUFBVSxXQUFjLGlDQUFpQyxDQUFDLENBQUM7QUFDbEUsSUFBTyxRQUFRLFdBQWUsK0JBQStCLENBQUMsQ0FBQztBQUMvRCxJQUFPLGFBQWEsV0FBYSxvQ0FBb0MsQ0FBQyxDQUFDO0FBQ3ZFLElBQU8sS0FBSyxXQUFlLDRCQUE0QixDQUFDLENBQUM7QUFFekQsSUFBTyxRQUFRLFdBQWUsK0JBQStCLENBQUMsQ0FBQztBQUMvRCxJQUFPLGNBQWMsV0FBYSx3Q0FBd0MsQ0FBQyxDQUFDO0FBQzVFLElBQU8sbUJBQW1CLFdBQVksNENBQTRDLENBQUMsQ0FBQztBQUtwRixJQUFPLGFBQWEsV0FBYSx1Q0FBdUMsQ0FBQyxDQUFDO0FBRzFFLElBQU8sZUFBZSxXQUFhLHlDQUF5QyxDQUFDLENBQUM7QUFFOUUsSUFBTyxTQUFTLFdBQWMsbUNBQW1DLENBQUMsQ0FBQztBQUluRSxJQUFPLGtCQUFrQixXQUFZLDRDQUE0QyxDQUFDLENBQUM7QUFHbkYsSUFBTyxrQkFBa0IsV0FBWSw4Q0FBOEMsQ0FBQyxDQUFDO0FBQ3JGLElBQU8sVUFBVSxXQUFjLHNDQUFzQyxDQUFDLENBQUM7QUFHdkUsQUFpSUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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QUdBLENBQUNBLENBQUNBO1lBQ1pBLEtBQUtBLENBQUNBLFNBQVNBLEVBQUVBLENBQUNBO1FBQ25CQSxDQUFDQTtRQUVEQSxLQUFLQSxHQUFHQSxLQUFLQSxDQUFDQSxZQUFZQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtRQUVsQ0EsR0FBR0EsR0FBR0EsYUFBYUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQTtRQUV2Q0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDakJBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBO1FBQ2pCQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNqQkEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7UUFFWEEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDakJBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBO1FBQ2pCQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNqQkEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7UUFFWEEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDakJBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBO1FBQ2pCQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNsQkEsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7UUFFWkEsSUFBSUEsQ0FBQ0EsR0FBWUEsSUFBSUEsUUFBUUEs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QkFFaEJBLElBQUlBLENBQUNBLGtCQUFrQkEsRUFBRUEsQ0FBQ0E7WUFDM0JBLENBQUNBO1lBRURBLEdBQUdBLEdBQUdBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBRWxCQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxVQUFVQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxVQUFVQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDdEZBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO2dCQUN4QkEsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3hCQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFFeEJBLElBQUlBLENBQUNBLGtCQUFrQkEsRUFBRUEsQ0FBQ0E7WUFDM0JBLENBQUNBO1lBRURBLEdBQUdBLEdBQUdBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBRWxCQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxRQUFRQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxRQUFRQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDaEZBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO2dCQUN0QkEsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3RCQSxJQUFJQSxDQUFDQSxRQUFRQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtn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IiwiZmlsZSI6ImJhc2UvRGlzcGxheU9iamVjdC5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQXhpc0FsaWduZWRCb3VuZGluZ0JveFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2JvdW5kcy9BeGlzQWxpZ25lZEJvdW5kaW5nQm94XCIpO1xyXG5pbXBvcnQgQm91bmRpbmdWb2x1bWVCYXNlXHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ib3VuZHMvQm91bmRpbmdWb2x1bWVCYXNlXCIpO1xyXG5pbXBvcnQgTWF0aENvbnN0c1x0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vTWF0aENvbnN0c1wiKTtcclxuaW1wb3J0IE1hdHJpeDNEXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL01hdHJpeDNEXCIpO1xyXG5pbXBvcnQgTWF0cml4M0RVdGlsc1x0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL01hdHJpeDNEVXRpbHNcIik7XHJcbmltcG9ydCBQb2ludFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9Qb2ludFwiKTtcclxuaW1wb3J0IFJlY3RhbmdsZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vUmVjdGFuZ2xlXCIpO1xyXG5pbXBvcnQgVmVjdG9yM0RcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vVmVjdG9yM0RcIik7XHJcbmltcG9ydCBOYW1lZEFzc2V0QmFzZVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9saWJyYXJ5L05hbWVkQXNzZXRCYXNlXCIpO1xyXG5pbXBvcnQgQWJzdHJhY3RNZXRob2RFcnJvclx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXJyb3JzL0Fic3RyYWN0TWV0aG9kRXJyb3JcIik7XHJcblxyXG5pbXBvcnQgRGlzcGxheU9iamVjdENvbnRhaW5lclx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2NvbnRhaW5lcnMvRGlzcGxheU9iamVjdENvbnRhaW5lclwiKTtcclxuaW1wb3J0IFNjZW5lXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9jb250YWluZXJzL1NjZW5lXCIpO1xyXG5pbXBvcnQgQ29udHJvbGxlckJhc2VcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvY29udHJvbGxlcnMvQ29udHJvbGxlckJhc2VcIik7XHJcbmltcG9ydCBBbGlnbm1lbnRNb2RlXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvQWxpZ25tZW50TW9kZVwiKTtcclxuaW1wb3J0IEJsZW5kTW9kZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvQmxlbmRNb2RlXCIpO1xyXG5pbXBvcnQgTG9hZGVySW5mb1x0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvTG9hZGVySW5mb1wiKTtcclxuaW1wb3J0IE9yaWVudGF0aW9uTW9kZVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL09yaWVudGF0aW9uTW9kZVwiKTtcclxuaW1wb3J0IElCaXRtYXBEcmF3YWJsZVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0lCaXRtYXBEcmF3YWJsZVwiKTtcclxuaW1wb3J0IFRyYW5zZm9ybVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvVHJhbnNmb3JtXCIpO1xyXG5pbXBvcnQgRW50aXR5Tm9kZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3BhcnRpdGlvbi9FbnRpdHlOb2RlXCIpO1xyXG5pbXBvcnQgUGFydGl0aW9uXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcGFydGl0aW9uL1BhcnRpdGlvblwiKTtcclxuaW1wb3J0IElQaWNraW5nQ29sbGlkZXJcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcGljay9JUGlja2luZ0NvbGxpZGVyXCIpO1xyXG5pbXBvcnQgUGlja2luZ0NvbGxpc2lvblZPXHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9waWNrL1BpY2tpbmdDb2xsaXNpb25WT1wiKTtcclxuaW1wb3J0IElSZW5kZXJhYmxlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcG9vbC9JUmVuZGVyYWJsZVwiKTtcclxuaW1wb3J0IENhbWVyYVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZW50aXRpZXMvQ2FtZXJhXCIpO1xyXG5pbXBvcnQgRGlzcGxheU9iamVjdEV2ZW50XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9ldmVudHMvRGlzcGxheU9iamVjdEV2ZW50XCIpO1xyXG5pbXBvcnQgU2NlbmVFdmVudFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2V2ZW50cy9TY2VuZUV2ZW50XCIpO1xyXG5pbXBvcnQgUHJlZmFiQmFzZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3ByZWZhYnMvUHJlZmFiQmFzZVwiKTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgRGlzcGxheU9iamVjdCBjbGFzcyBpcyB0aGUgYmFzZSBjbGFzcyBmb3IgYWxsIG9iamVjdHMgdGhhdCBjYW4gYmVcclxuICogcGxhY2VkIG9uIHRoZSBkaXNwbGF5IGxpc3QuIFRoZSBkaXNwbGF5IGxpc3QgbWFuYWdlcyBhbGwgb2JqZWN0cyBkaXNwbGF5ZWRcclxuICogaW4gZmxhc2guIFVzZSB0aGUgRGlzcGxheU9iamVjdENvbnRhaW5lciBjbGFzcyB0byBhcnJhbmdlIHRoZVxyXG4gKiBkaXNwbGF5IG9iamVjdHMgaW4gdGhlIGRpc3BsYXkgbGlzdC4gRGlzcGxheU9iamVjdENvbnRhaW5lciBvYmplY3RzIGNhblxyXG4gKiBoYXZlIGNoaWxkIGRpc3BsYXkgb2JqZWN0cywgd2hpbGUgb3RoZXIgZGlzcGxheSBvYmplY3RzLCBzdWNoIGFzIFNoYXBlIGFuZFxyXG4gKiBUZXh0RmllbGQgb2JqZWN0cywgYXJlIFwibGVhZlwiIG5vZGVzIHRoYXQgaGF2ZSBvbmx5IHBhcmVudHMgYW5kIHNpYmxpbmdzLCBub1xyXG4gKiBjaGlsZHJlbi5cclxuICpcclxuICogPHA+VGhlIERpc3BsYXlPYmplY3QgY2xhc3Mgc3VwcG9ydHMgYmFzaWMgZnVuY3Rpb25hbGl0eSBsaWtlIHRoZSA8aT54PC9pPlxyXG4gKiBhbmQgPGk+eTwvaT4gcG9zaXRpb24gb2YgYW4gb2JqZWN0LCBhcyB3ZWxsIGFzIG1vcmUgYWR2YW5jZWQgcHJvcGVydGllcyBvZlxyXG4gKiB0aGUgb2JqZWN0IHN1Y2ggYXMgaXRzIHRyYW5zZm9ybWF0aW9uIG1hdHJpeC4gPC9wPlxyXG4gKlxyXG4gKiA8cD5EaXNwbGF5T2JqZWN0IGlzIGFuIGFic3RyYWN0IGJhc2UgY2xhc3M7IHRoZXJlZm9yZSwgeW91IGNhbm5vdCBjYWxsXHJcbiAqIERpc3BsYXlPYmplY3QgZGlyZWN0bHkuIEludm9raW5nIDxjb2RlPm5ldyBEaXNwbGF5T2JqZWN0KCk8L2NvZGU+IHRocm93cyBhblxyXG4gKiA8Y29kZT5Bcmd1bWVudEVycm9yPC9jb2RlPiBleGNlcHRpb24uIDwvcD5cclxuICpcclxuICogPHA+QWxsIGRpc3BsYXkgb2JqZWN0cyBpbmhlcml0IGZyb20gdGhlIERpc3BsYXlPYmplY3QgY2xhc3MuPC9wPlxyXG4gKlxyXG4gKiA8cD5UaGUgRGlzcGxheU9iamVjdCBjbGFzcyBpdHNlbGYgZG9lcyBub3QgaW5jbHVkZSBhbnkgQVBJcyBmb3IgcmVuZGVyaW5nXHJcbiAqIGNvbnRlbnQgb25zY3JlZW4uIEZvciB0aGF0IHJlYXNvbiwgaWYgeW91IHdhbnQgY3JlYXRlIGEgY3VzdG9tIHN1YmNsYXNzIG9mXHJcbiAqIHRoZSBEaXNwbGF5T2JqZWN0IGNsYXNzLCB5b3Ugd2lsbCB3YW50IHRvIGV4dGVuZCBvbmUgb2YgaXRzIHN1YmNsYXNzZXMgdGhhdFxyXG4gKiBkbyBoYXZlIEFQSXMgZm9yIHJlbmRlcmluZyBjb250ZW50IG9uc2NyZWVuLCBzdWNoIGFzIHRoZSBTaGFwZSwgU3ByaXRlLFxyXG4gKiBCaXRtYXAsIFNpbXBsZUJ1dHRvbiwgVGV4dEZpZWxkLCBvciBNb3ZpZUNsaXAgY2xhc3MuPC9wPlxyXG4gKlxyXG4gKiA8cD5UaGUgRGlzcGxheU9iamVjdCBjbGFzcyBjb250YWlucyBzZXZlcmFsIGJyb2FkY2FzdCBldmVudHMuIE5vcm1hbGx5LCB0aGVcclxuICogdGFyZ2V0IG9mIGFueSBwYXJ0aWN1bGFyIGV2ZW50IGlzIGEgc3BlY2lmaWMgRGlzcGxheU9iamVjdCBpbnN0YW5jZS4gRm9yXHJcbiAqIGV4YW1wbGUsIHRoZSB0YXJnZXQgb2YgYW4gPGNvZGU+YWRkZWQ8L2NvZGU+IGV2ZW50IGlzIHRoZSBzcGVjaWZpY1xyXG4gKiBEaXNwbGF5T2JqZWN0IGluc3RhbmNlIHRoYXQgd2FzIGFkZGVkIHRvIHRoZSBkaXNwbGF5IGxpc3QuIEhhdmluZyBhIHNpbmdsZVxyXG4gKiB0YXJnZXQgcmVzdHJpY3RzIHRoZSBwbGFjZW1lbnQgb2YgZXZlbnQgbGlzdGVuZXJzIHRvIHRoYXQgdGFyZ2V0IGFuZCBpblxyXG4gKiBzb21lIGNhc2VzIHRoZSB0YXJnZXQncyBhbmNlc3RvcnMgb24gdGhlIGRpc3BsYXkgbGlzdC4gV2l0aCBicm9hZGNhc3RcclxuICogZXZlbnRzLCBob3dldmVyLCB0aGUgdGFyZ2V0IGlzIG5vdCBhIHNwZWNpZmljIERpc3BsYXlPYmplY3QgaW5zdGFuY2UsIGJ1dFxyXG4gKiByYXRoZXIgYWxsIERpc3BsYXlPYmplY3QgaW5zdGFuY2VzLCBpbmNsdWRpbmcgdGhvc2UgdGhhdCBhcmUgbm90IG9uIHRoZVxyXG4gKiBkaXNwbGF5IGxpc3QuIFRoaXMgbWVhbnMgdGhhdCB5b3UgY2FuIGFkZCBhIGxpc3RlbmVyIHRvIGFueSBEaXNwbGF5T2JqZWN0XHJcbiAqIGluc3RhbmNlIHRvIGxpc3RlbiBmb3IgYnJvYWRjYXN0IGV2ZW50cy4gSW4gYWRkaXRpb24gdG8gdGhlIGJyb2FkY2FzdFxyXG4gKiBldmVudHMgbGlzdGVkIGluIHRoZSBEaXNwbGF5T2JqZWN0IGNsYXNzJ3MgRXZlbnRzIHRhYmxlLCB0aGUgRGlzcGxheU9iamVjdFxyXG4gKiBjbGFzcyBhbHNvIGluaGVyaXRzIHR3byBicm9hZGNhc3QgZXZlbnRzIGZyb20gdGhlIEV2ZW50RGlzcGF0Y2hlciBjbGFzczpcclxuICogPGNvZGU+YWN0aXZhdGU8L2NvZGU+IGFuZCA8Y29kZT5kZWFjdGl2YXRlPC9jb2RlPi48L3A+XHJcbiAqXHJcbiAqIDxwPlNvbWUgcHJvcGVydGllcyBwcmV2aW91c2x5IHVzZWQgaW4gdGhlIEFjdGlvblNjcmlwdCAxLjAgYW5kIDIuMFxyXG4gKiBNb3ZpZUNsaXAsIFRleHRGaWVsZCwgYW5kIEJ1dHRvbiBjbGFzc2VzKHN1Y2ggYXMgPGNvZGU+X2FscGhhPC9jb2RlPixcclxuICogPGNvZGU+X2hlaWdodDwvY29kZT4sIDxjb2RlPl9uYW1lPC9jb2RlPiwgPGNvZGU+X3dpZHRoPC9jb2RlPixcclxuICogPGNvZGU+X3g8L2NvZGU+LCA8Y29kZT5feTwvY29kZT4sIGFuZCBvdGhlcnMpIGhhdmUgZXF1aXZhbGVudHMgaW4gdGhlXHJcbiAqIEFjdGlvblNjcmlwdCAzLjAgRGlzcGxheU9iamVjdCBjbGFzcyB0aGF0IGFyZSByZW5hbWVkIHNvIHRoYXQgdGhleSBub1xyXG4gKiBsb25nZXIgYmVnaW4gd2l0aCB0aGUgdW5kZXJzY29yZShfKSBjaGFyYWN0ZXIuPC9wPlxyXG4gKlxyXG4gKiA8cD5Gb3IgbW9yZSBpbmZvcm1hdGlvbiwgc2VlIHRoZSBcIkRpc3BsYXkgUHJvZ3JhbW1pbmdcIiBjaGFwdGVyIG9mIHRoZVxyXG4gKiA8aT5BY3Rpb25TY3JpcHQgMy4wIERldmVsb3BlcidzIEd1aWRlPC9pPi48L3A+XHJcbiAqIFxyXG4gKiBAZXZlbnQgYWRkZWQgICAgICAgICAgICBEaXNwYXRjaGVkIHdoZW4gYSBkaXNwbGF5IG9iamVjdCBpcyBhZGRlZCB0byB0aGVcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheSBsaXN0LiBUaGUgZm9sbG93aW5nIG1ldGhvZHMgdHJpZ2dlciB0aGlzXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50OlxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLmFkZENoaWxkKCk8L2NvZGU+LFxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLmFkZENoaWxkQXQoKTwvY29kZT4uXHJcbiAqIEBldmVudCBhZGRlZFRvU3RhZ2UgICAgIERpc3BhdGNoZWQgd2hlbiBhIGRpc3BsYXkgb2JqZWN0IGlzIGFkZGVkIHRvIHRoZSBvblxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBzdGFnZSBkaXNwbGF5IGxpc3QsIGVpdGhlciBkaXJlY3RseSBvciB0aHJvdWdoIHRoZVxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBhZGRpdGlvbiBvZiBhIHN1YiB0cmVlIGluIHdoaWNoIHRoZSBkaXNwbGF5IG9iamVjdFxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBpcyBjb250YWluZWQuIFRoZSBmb2xsb3dpbmcgbWV0aG9kcyB0cmlnZ2VyIHRoaXNcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQ6XHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPkRpc3BsYXlPYmplY3RDb250YWluZXIuYWRkQ2hpbGQoKTwvY29kZT4sXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPkRpc3BsYXlPYmplY3RDb250YWluZXIuYWRkQ2hpbGRBdCgpPC9jb2RlPi5cclxuICogQGV2ZW50IGVudGVyRnJhbWUgICAgICAgW2Jyb2FkY2FzdCBldmVudF0gRGlzcGF0Y2hlZCB3aGVuIHRoZSBwbGF5aGVhZCBpc1xyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBlbnRlcmluZyBhIG5ldyBmcmFtZS4gSWYgdGhlIHBsYXloZWFkIGlzIG5vdFxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBtb3ZpbmcsIG9yIGlmIHRoZXJlIGlzIG9ubHkgb25lIGZyYW1lLCB0aGlzIGV2ZW50XHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGlzIGRpc3BhdGNoZWQgY29udGludW91c2x5IGluIGNvbmp1bmN0aW9uIHdpdGggdGhlXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGZyYW1lIHJhdGUuIFRoaXMgZXZlbnQgaXMgYSBicm9hZGNhc3QgZXZlbnQsIHdoaWNoXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIG1lYW5zIHRoYXQgaXQgaXMgZGlzcGF0Y2hlZCBieSBhbGwgZGlzcGxheSBvYmplY3RzXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIHdpdGggYSBsaXN0ZW5lciByZWdpc3RlcmVkIGZvciB0aGlzIGV2ZW50LlxyXG4gKiBAZXZlbnQgZXhpdEZyYW1lICAgICAgICBbYnJvYWRjYXN0IGV2ZW50XSBEaXNwYXRjaGVkIHdoZW4gdGhlIHBsYXloZWFkIGlzXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGV4aXRpbmcgdGhlIGN1cnJlbnQgZnJhbWUuIEFsbCBmcmFtZSBzY3JpcHRzIGhhdmVcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgYmVlbiBydW4uIElmIHRoZSBwbGF5aGVhZCBpcyBub3QgbW92aW5nLCBvciBpZlxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICB0aGVyZSBpcyBvbmx5IG9uZSBmcmFtZSwgdGhpcyBldmVudCBpcyBkaXNwYXRjaGVkXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVvdXNseSBpbiBjb25qdW5jdGlvbiB3aXRoIHRoZSBmcmFtZSByYXRlLlxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBUaGlzIGV2ZW50IGlzIGEgYnJvYWRjYXN0IGV2ZW50LCB3aGljaCBtZWFucyB0aGF0XHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGl0IGlzIGRpc3BhdGNoZWQgYnkgYWxsIGRpc3BsYXkgb2JqZWN0cyB3aXRoIGFcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXIgcmVnaXN0ZXJlZCBmb3IgdGhpcyBldmVudC5cclxuICogQGV2ZW50IGZyYW1lQ29uc3RydWN0ZWQgW2Jyb2FkY2FzdCBldmVudF0gRGlzcGF0Y2hlZCBhZnRlciB0aGUgY29uc3RydWN0b3JzXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIG9mIGZyYW1lIGRpc3BsYXkgb2JqZWN0cyBoYXZlIHJ1biBidXQgYmVmb3JlIGZyYW1lXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIHNjcmlwdHMgaGF2ZSBydW4uIElmIHRoZSBwbGF5aGVhZCBpcyBub3QgbW92aW5nLCBvclxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBpZiB0aGVyZSBpcyBvbmx5IG9uZSBmcmFtZSwgdGhpcyBldmVudCBpc1xyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaGVkIGNvbnRpbnVvdXNseSBpbiBjb25qdW5jdGlvbiB3aXRoIHRoZVxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBmcmFtZSByYXRlLiBUaGlzIGV2ZW50IGlzIGEgYnJvYWRjYXN0IGV2ZW50LCB3aGljaFxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBtZWFucyB0aGF0IGl0IGlzIGRpc3BhdGNoZWQgYnkgYWxsIGRpc3BsYXkgb2JqZWN0c1xyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICB3aXRoIGEgbGlzdGVuZXIgcmVnaXN0ZXJlZCBmb3IgdGhpcyBldmVudC5cclxuICogQGV2ZW50IHJlbW92ZWQgICAgICAgICAgRGlzcGF0Y2hlZCB3aGVuIGEgZGlzcGxheSBvYmplY3QgaXMgYWJvdXQgdG8gYmVcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlZCBmcm9tIHRoZSBkaXNwbGF5IGxpc3QuIFR3byBtZXRob2RzIG9mIHRoZVxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIGNsYXNzIGdlbmVyYXRlIHRoaXMgZXZlbnQ6XHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPnJlbW92ZUNoaWxkKCk8L2NvZGU+IGFuZFxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5yZW1vdmVDaGlsZEF0KCk8L2NvZGU+LlxyXG4gKlxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICA8cD5UaGUgZm9sbG93aW5nIG1ldGhvZHMgb2YgYVxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIG9iamVjdCBhbHNvIGdlbmVyYXRlIHRoaXNcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQgaWYgYW4gb2JqZWN0IG11c3QgYmUgcmVtb3ZlZCB0byBtYWtlIHJvb20gZm9yXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIHRoZSBuZXcgb2JqZWN0OiA8Y29kZT5hZGRDaGlsZCgpPC9jb2RlPixcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+YWRkQ2hpbGRBdCgpPC9jb2RlPiwgYW5kXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPnNldENoaWxkSW5kZXgoKTwvY29kZT4uIDwvcD5cclxuICogQGV2ZW50IHJlbW92ZWRGcm9tU3RhZ2UgRGlzcGF0Y2hlZCB3aGVuIGEgZGlzcGxheSBvYmplY3QgaXMgYWJvdXQgdG8gYmVcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlZCBmcm9tIHRoZSBkaXNwbGF5IGxpc3QsIGVpdGhlciBkaXJlY3RseSBvclxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdWdoIHRoZSByZW1vdmFsIG9mIGEgc3ViIHRyZWUgaW4gd2hpY2ggdGhlXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXkgb2JqZWN0IGlzIGNvbnRhaW5lZC4gVHdvIG1ldGhvZHMgb2YgdGhlXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIERpc3BsYXlPYmplY3RDb250YWluZXIgY2xhc3MgZ2VuZXJhdGUgdGhpcyBldmVudDpcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+cmVtb3ZlQ2hpbGQoKTwvY29kZT4gYW5kXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPnJlbW92ZUNoaWxkQXQoKTwvY29kZT4uXHJcbiAqXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxwPlRoZSBmb2xsb3dpbmcgbWV0aG9kcyBvZiBhXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIERpc3BsYXlPYmplY3RDb250YWluZXIgb2JqZWN0IGFsc28gZ2VuZXJhdGUgdGhpc1xyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBldmVudCBpZiBhbiBvYmplY3QgbXVzdCBiZSByZW1vdmVkIHRvIG1ha2Ugcm9vbSBmb3JcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgdGhlIG5ldyBvYmplY3Q6IDxjb2RlPmFkZENoaWxkKCk8L2NvZGU+LFxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5hZGRDaGlsZEF0KCk8L2NvZGU+LCBhbmRcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+c2V0Q2hpbGRJbmRleCgpPC9jb2RlPi4gPC9wPlxyXG4gKiBAZXZlbnQgcmVuZGVyICAgICAgICAgICBbYnJvYWRjYXN0IGV2ZW50XSBEaXNwYXRjaGVkIHdoZW4gdGhlIGRpc3BsYXkgbGlzdFxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBpcyBhYm91dCB0byBiZSB1cGRhdGVkIGFuZCByZW5kZXJlZC4gVGhpcyBldmVudFxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlcyB0aGUgbGFzdCBvcHBvcnR1bml0eSBmb3Igb2JqZWN0cyBsaXN0ZW5pbmdcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgZm9yIHRoaXMgZXZlbnQgdG8gbWFrZSBjaGFuZ2VzIGJlZm9yZSB0aGUgZGlzcGxheVxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBsaXN0IGlzIHJlbmRlcmVkLiBZb3UgbXVzdCBjYWxsIHRoZVxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5pbnZhbGlkYXRlKCk8L2NvZGU+IG1ldGhvZCBvZiB0aGUgU3RhZ2VcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0IGVhY2ggdGltZSB5b3Ugd2FudCBhIDxjb2RlPnJlbmRlcjwvY29kZT5cclxuICogICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQgdG8gYmUgZGlzcGF0Y2hlZC4gPGNvZGU+UmVuZGVyPC9jb2RlPiBldmVudHNcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgYXJlIGRpc3BhdGNoZWQgdG8gYW4gb2JqZWN0IG9ubHkgaWYgdGhlcmUgaXMgbXV0dWFsXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIHRydXN0IGJldHdlZW4gaXQgYW5kIHRoZSBvYmplY3QgdGhhdCBjYWxsZWRcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+U3RhZ2UuaW52YWxpZGF0ZSgpPC9jb2RlPi4gVGhpcyBldmVudCBpcyBhXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGJyb2FkY2FzdCBldmVudCwgd2hpY2ggbWVhbnMgdGhhdCBpdCBpcyBkaXNwYXRjaGVkXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGJ5IGFsbCBkaXNwbGF5IG9iamVjdHMgd2l0aCBhIGxpc3RlbmVyIHJlZ2lzdGVyZWRcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgZm9yIHRoaXMgZXZlbnQuXHJcbiAqXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxwPjxiPk5vdGU6IDwvYj5UaGlzIGV2ZW50IGlzIG5vdCBkaXNwYXRjaGVkIGlmIHRoZVxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5IGlzIG5vdCByZW5kZXJpbmcuIFRoaXMgaXMgdGhlIGNhc2Ugd2hlbiB0aGVcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudCBpcyBlaXRoZXIgbWluaW1pemVkIG9yIG9ic2N1cmVkLiA8L3A+XHJcbiAqL1xyXG5jbGFzcyBEaXNwbGF5T2JqZWN0IGV4dGVuZHMgTmFtZWRBc3NldEJhc2UgaW1wbGVtZW50cyBJQml0bWFwRHJhd2FibGVcclxue1xyXG5cdHByaXZhdGUgX2xvYWRlckluZm86TG9hZGVySW5mbztcclxuXHRwcml2YXRlIF9tb3VzZVg6bnVtYmVyO1xyXG5cdHByaXZhdGUgX21vdXNlWTpudW1iZXI7XHJcblx0cHJpdmF0ZSBfcm9vdDpEaXNwbGF5T2JqZWN0Q29udGFpbmVyO1xyXG5cdHByaXZhdGUgX2JvdW5kczpSZWN0YW5nbGU7XHJcblx0cHJpdmF0ZSBfYm91bmRzVmlzaWJsZTpib29sZWFuO1xyXG5cdHByaXZhdGUgX2RlcHRoOm51bWJlcjtcclxuXHRwcml2YXRlIF9oZWlnaHQ6bnVtYmVyO1xyXG5cdHByaXZhdGUgX3dpZHRoOm51bWJlcjtcclxuXHJcblx0cHVibGljIF9wU2NlbmU6U2NlbmU7XHJcblx0cHVibGljIF9wUGFyZW50OkRpc3BsYXlPYmplY3RDb250YWluZXI7XHJcblx0cHVibGljIF9wU2NlbmVUcmFuc2Zvcm06TWF0cml4M0QgPSBuZXcgTWF0cml4M0QoKTtcclxuXHRwdWJsaWMgX3BTY2VuZVRyYW5zZm9ybURpcnR5OmJvb2xlYW4gPSB0cnVlO1xyXG5cdHB1YmxpYyBfcElzRW50aXR5OmJvb2xlYW47XHJcblxyXG5cdHByaXZhdGUgX2V4cGxpY2l0UGFydGl0aW9uOlBhcnRpdGlvbjtcclxuXHRwdWJsaWMgX3BJbXBsaWNpdFBhcnRpdGlvbjpQYXJ0aXRpb247XHJcblx0cHJpdmF0ZSBfcGFydGl0aW9uTm9kZTpFbnRpdHlOb2RlO1xyXG5cclxuXHRwcml2YXRlIF9zY2VuZVRyYW5zZm9ybUNoYW5nZWQ6RGlzcGxheU9iamVjdEV2ZW50O1xyXG5cdHByaXZhdGUgX3NjZW5lY2hhbmdlZDpEaXNwbGF5T2JqZWN0RXZlbnQ7XHJcblx0cHJpdmF0ZSBfdHJhbnNmb3JtOlRyYW5zZm9ybTtcclxuXHRwcml2YXRlIF9tYXRyaXgzRDpNYXRyaXgzRCA9IG5ldyBNYXRyaXgzRCgpO1xyXG5cdHByaXZhdGUgX21hdHJpeDNERGlydHk6Ym9vbGVhbiA9IHRydWU7XHJcblxyXG5cdHByaXZhdGUgX2ludmVyc2VTY2VuZVRyYW5zZm9ybTpNYXRyaXgzRCA9IG5ldyBNYXRyaXgzRCgpO1xyXG5cdHByaXZhdGUgX2ludmVyc2VTY2VuZVRyYW5zZm9ybURpcnR5OmJvb2xlYW4gPSB0cnVlO1xyXG5cdHByaXZhdGUgX3NjZW5lUG9zaXRpb246VmVjdG9yM0QgPSBuZXcgVmVjdG9yM0QoKTtcclxuXHRwcml2YXRlIF9zY2VuZVBvc2l0aW9uRGlydHk6Ym9vbGVhbiA9IHRydWU7XHJcblx0cHJpdmF0ZSBfZXhwbGljaXRWaXNpYmlsaXR5OmJvb2xlYW4gPSB0cnVlO1xyXG5cdHB1YmxpYyBfcEltcGxpY2l0VmlzaWJpbGl0eTpib29sZWFuID0gdHJ1ZTtcclxuXHRwcml2YXRlIF9leHBsaWNpdE1vdXNlRW5hYmxlZDpib29sZWFuID0gdHJ1ZTtcclxuXHRwdWJsaWMgX3BJbXBsaWNpdE1vdXNlRW5hYmxlZDpib29sZWFuID0gdHJ1ZTtcclxuXHRwcml2YXRlIF9saXN0ZW5Ub1NjZW5lVHJhbnNmb3JtQ2hhbmdlZDpib29sZWFuO1xyXG5cdHByaXZhdGUgX2xpc3RlblRvU2NlbmVDaGFuZ2VkOmJvb2xlYW47XHJcblxyXG5cdHByaXZhdGUgX3Bvc2l0aW9uRGlydHk6Ym9vbGVhbiA9IHRydWU7XHJcblx0cHJpdmF0ZSBfcm90YXRpb25EaXJ0eTpib29sZWFuID0gdHJ1ZTtcclxuXHRwcml2YXRlIF9zY2FsZURpcnR5OmJvb2xlYW4gPSB0cnVlO1xyXG5cclxuXHRwcml2YXRlIF9wb3NpdGlvbkNoYW5nZWQ6RGlzcGxheU9iamVjdEV2ZW50O1xyXG5cdHByaXZhdGUgX3JvdGF0aW9uQ2hhbmdlZDpEaXNwbGF5T2JqZWN0RXZlbnQ7XHJcblx0cHJpdmF0ZSBfc2NhbGVDaGFuZ2VkOkRpc3BsYXlPYmplY3RFdmVudDtcclxuXHJcblx0cHJpdmF0ZSBfcm90YXRpb25YOm51bWJlciA9IDA7XHJcblx0cHJpdmF0ZSBfcm90YXRpb25ZOm51bWJlciA9IDA7XHJcblx0cHJpdmF0ZSBfcm90YXRpb25aOm51bWJlciA9IDA7XHJcblx0cHJpdmF0ZSBfZXVsZXJzOlZlY3RvcjNEID0gbmV3IFZlY3RvcjNEKCk7XHJcblx0cHJpdmF0ZSBfZmxpcFk6TWF0cml4M0QgPSBuZXcgTWF0cml4M0QoKTtcclxuXHJcblx0cHJpdmF0ZSBfbGlzdGVuVG9Qb3NpdGlvbkNoYW5nZWQ6Ym9vbGVhbjtcclxuXHRwcml2YXRlIF9saXN0ZW5Ub1JvdGF0aW9uQ2hhbmdlZDpib29sZWFuO1xyXG5cdHByaXZhdGUgX2xpc3RlblRvU2NhbGVDaGFuZ2VkOmJvb2xlYW47XHJcblx0cHJpdmF0ZSBfek9mZnNldDpudW1iZXIgPSAwO1xyXG5cclxuXHRwdWJsaWMgX3BTY2FsZVg6bnVtYmVyID0gMTtcclxuXHRwdWJsaWMgX3BTY2FsZVk6bnVtYmVyID0gMTtcclxuXHRwdWJsaWMgX3BTY2FsZVo6bnVtYmVyID0gMTtcclxuXHRwcml2YXRlIF94Om51bWJlciA9IDA7XHJcblx0cHJpdmF0ZSBfeTpudW1iZXIgPSAwO1xyXG5cdHByaXZhdGUgX3o6bnVtYmVyID0gMDtcclxuXHRwcml2YXRlIF9waXZvdDpWZWN0b3IzRCA9IG5ldyBWZWN0b3IzRCgpO1xyXG5cdHByaXZhdGUgX29yaWVudGF0aW9uTWF0cml4Ok1hdHJpeDNEID0gbmV3IE1hdHJpeDNEKCk7XHJcblx0cHJpdmF0ZSBfcGl2b3RaZXJvOmJvb2xlYW4gPSB0cnVlO1xyXG5cdHByaXZhdGUgX3Bpdm90RGlydHk6Ym9vbGVhbiA9IHRydWU7XHJcblx0cHJpdmF0ZSBfcG9zOlZlY3RvcjNEID0gbmV3IFZlY3RvcjNEKCk7XHJcblx0cHJpdmF0ZSBfcm90OlZlY3RvcjNEID0gbmV3IFZlY3RvcjNEKCk7XHJcblx0cHJpdmF0ZSBfc2NhOlZlY3RvcjNEID0gbmV3IFZlY3RvcjNEKCk7XHJcblx0cHJpdmF0ZSBfdHJhbnNmb3JtQ29tcG9uZW50czpBcnJheTxWZWN0b3IzRD47XHJcblxyXG5cdHB1YmxpYyBfcElnbm9yZVRyYW5zZm9ybTpib29sZWFuID0gZmFsc2U7XHJcblxyXG5cdHByaXZhdGUgX3NoYWRlclBpY2tpbmdEZXRhaWxzOmJvb2xlYW47XHJcblxyXG5cdHB1YmxpYyBfcFBpY2tpbmdDb2xsaXNpb25WTzpQaWNraW5nQ29sbGlzaW9uVk87XHJcblxyXG5cdHB1YmxpYyBfcEJvdW5kczpCb3VuZGluZ1ZvbHVtZUJhc2U7XHJcblx0cHVibGljIF9wQm91bmRzSW52YWxpZDpib29sZWFuID0gdHJ1ZTtcclxuXHRwcml2YXRlIF93b3JsZEJvdW5kczpCb3VuZGluZ1ZvbHVtZUJhc2U7XHJcblx0cHJpdmF0ZSBfd29ybGRCb3VuZHNJbnZhbGlkOmJvb2xlYW4gPSB0cnVlO1xyXG5cclxuXHRwdWJsaWMgX3BQaWNraW5nQ29sbGlkZXI6SVBpY2tpbmdDb2xsaWRlcjtcclxuXHJcblx0cHVibGljIF9wUmVuZGVyYWJsZXM6QXJyYXk8SVJlbmRlcmFibGU+ID0gbmV3IEFycmF5PElSZW5kZXJhYmxlPigpO1xyXG5cclxuXHRwdWJsaWMgX2lTb3VyY2VQcmVmYWI6UHJlZmFiQmFzZTtcclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgYWxpZ25tZW50TW9kZTpzdHJpbmcgPSBBbGlnbm1lbnRNb2RlLlJFR0lTVFJBVElPTl9QT0lOVDtcclxuXHJcblx0LyoqXHJcblx0ICogSW5kaWNhdGVzIHRoZSBhbHBoYSB0cmFuc3BhcmVuY3kgdmFsdWUgb2YgdGhlIG9iamVjdCBzcGVjaWZpZWQuIFZhbGlkXHJcblx0ICogdmFsdWVzIGFyZSAwKGZ1bGx5IHRyYW5zcGFyZW50KSB0byAxKGZ1bGx5IG9wYXF1ZSkuIFRoZSBkZWZhdWx0IHZhbHVlIGlzXHJcblx0ICogMS4gRGlzcGxheSBvYmplY3RzIHdpdGggPGNvZGU+YWxwaGE8L2NvZGU+IHNldCB0byAwIDxpPmFyZTwvaT4gYWN0aXZlLFxyXG5cdCAqIGV2ZW4gdGhvdWdoIHRoZXkgYXJlIGludmlzaWJsZS5cclxuXHQgKi9cclxuXHRwdWJsaWMgYWxwaGE6bnVtYmVyO1xyXG5cclxuXHQvKipcclxuXHQgKiBBIHZhbHVlIGZyb20gdGhlIEJsZW5kTW9kZSBjbGFzcyB0aGF0IHNwZWNpZmllcyB3aGljaCBibGVuZCBtb2RlIHRvIHVzZS4gQVxyXG5cdCAqIGJpdG1hcCBjYW4gYmUgZHJhd24gaW50ZXJuYWxseSBpbiB0d28gd2F5cy4gSWYgeW91IGhhdmUgYSBibGVuZCBtb2RlXHJcblx0ICogZW5hYmxlZCBvciBhbiBleHRlcm5hbCBjbGlwcGluZyBtYXNrLCB0aGUgYml0bWFwIGlzIGRyYXduIGJ5IGFkZGluZyBhXHJcblx0ICogYml0bWFwLWZpbGxlZCBzcXVhcmUgc2hhcGUgdG8gdGhlIHZlY3RvciByZW5kZXIuIElmIHlvdSBhdHRlbXB0IHRvIHNldFxyXG5cdCAqIHRoaXMgcHJvcGVydHkgdG8gYW4gaW52YWxpZCB2YWx1ZSwgRmxhc2ggcnVudGltZXMgc2V0IHRoZSB2YWx1ZSB0b1xyXG5cdCAqIDxjb2RlPkJsZW5kTW9kZS5OT1JNQUw8L2NvZGU+LlxyXG5cdCAqXHJcblx0ICogPHA+VGhlIDxjb2RlPmJsZW5kTW9kZTwvY29kZT4gcHJvcGVydHkgYWZmZWN0cyBlYWNoIHBpeGVsIG9mIHRoZSBkaXNwbGF5XHJcblx0ICogb2JqZWN0LiBFYWNoIHBpeGVsIGlzIGNvbXBvc2VkIG9mIHRocmVlIGNvbnN0aXR1ZW50IGNvbG9ycyhyZWQsIGdyZWVuLFxyXG5cdCAqIGFuZCBibHVlKSwgYW5kIGVhY2ggY29uc3RpdHVlbnQgY29sb3IgaGFzIGEgdmFsdWUgYmV0d2VlbiAweDAwIGFuZCAweEZGLlxyXG5cdCAqIEZsYXNoIFBsYXllciBvciBBZG9iZSBBSVIgY29tcGFyZXMgZWFjaCBjb25zdGl0dWVudCBjb2xvciBvZiBvbmUgcGl4ZWwgaW5cclxuXHQgKiB0aGUgbW92aWUgY2xpcCB3aXRoIHRoZSBjb3JyZXNwb25kaW5nIGNvbG9yIG9mIHRoZSBwaXhlbCBpbiB0aGVcclxuXHQgKiBiYWNrZ3JvdW5kLiBGb3IgZXhhbXBsZSwgaWYgPGNvZGU+YmxlbmRNb2RlPC9jb2RlPiBpcyBzZXQgdG9cclxuXHQgKiA8Y29kZT5CbGVuZE1vZGUuTElHSFRFTjwvY29kZT4sIEZsYXNoIFBsYXllciBvciBBZG9iZSBBSVIgY29tcGFyZXMgdGhlIHJlZFxyXG5cdCAqIHZhbHVlIG9mIHRoZSBkaXNwbGF5IG9iamVjdCB3aXRoIHRoZSByZWQgdmFsdWUgb2YgdGhlIGJhY2tncm91bmQsIGFuZCB1c2VzXHJcblx0ICogdGhlIGxpZ2h0ZXIgb2YgdGhlIHR3byBhcyB0aGUgdmFsdWUgZm9yIHRoZSByZWQgY29tcG9uZW50IG9mIHRoZSBkaXNwbGF5ZWRcclxuXHQgKiBjb2xvci48L3A+XHJcblx0ICpcclxuXHQgKiA8cD5UaGUgZm9sbG93aW5nIHRhYmxlIGRlc2NyaWJlcyB0aGUgPGNvZGU+YmxlbmRNb2RlPC9jb2RlPiBzZXR0aW5ncy4gVGhlXHJcblx0ICogQmxlbmRNb2RlIGNsYXNzIGRlZmluZXMgc3RyaW5nIHZhbHVlcyB5b3UgY2FuIHVzZS4gVGhlIGlsbHVzdHJhdGlvbnMgaW5cclxuXHQgKiB0aGUgdGFibGUgc2hvdyA8Y29kZT5ibGVuZE1vZGU8L2NvZGU+IHZhbHVlcyBhcHBsaWVkIHRvIGEgY2lyY3VsYXIgZGlzcGxheVxyXG5cdCAqIG9iamVjdCgyKSBzdXBlcmltcG9zZWQgb24gYW5vdGhlciBkaXNwbGF5IG9iamVjdCgxKS48L3A+XHJcblx0ICovXHJcblx0cHVibGljIGJsZW5kTW9kZTpCbGVuZE1vZGU7XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCBib3VuZHMoKTpCb3VuZGluZ1ZvbHVtZUJhc2VcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fcEJvdW5kc0ludmFsaWQpXHJcblx0XHRcdHRoaXMucFVwZGF0ZUJvdW5kcygpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLl9wQm91bmRzO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBib3VuZHModmFsdWU6Qm91bmRpbmdWb2x1bWVCYXNlKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9wQm91bmRzID09IHZhbHVlKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fcEJvdW5kcyA9IHZhbHVlO1xyXG5cclxuXHRcdHRoaXMuX3dvcmxkQm91bmRzID0gdmFsdWUuY2xvbmUoKTtcclxuXHJcblx0XHR0aGlzLnBJbnZhbGlkYXRlQm91bmRzKCk7XHJcblxyXG5cdFx0aWYgKHRoaXMuX2JvdW5kc1Zpc2libGUpXHJcblx0XHRcdHRoaXMuX3BhcnRpdGlvbk5vZGUuX2lVcGRhdGVFbnRpdHlCb3VuZHMoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIElmIHNldCB0byA8Y29kZT50cnVlPC9jb2RlPiwgTk1FIHdpbGwgdXNlIHRoZSBzb2Z0d2FyZSByZW5kZXJlciB0byBjYWNoZVxyXG5cdCAqIGFuIGludGVybmFsIGJpdG1hcCByZXByZXNlbnRhdGlvbiBvZiB0aGUgZGlzcGxheSBvYmplY3QuIEZvciBuYXRpdmUgdGFyZ2V0cyxcclxuXHQgKiB0aGlzIGlzIG9mdGVuIG11Y2ggc2xvd2VyIHRoYW4gdGhlIGRlZmF1bHQgaGFyZHdhcmUgcmVuZGVyZXIuIFdoZW4geW91XHJcblx0ICogYXJlIHVzaW5nIHRoZSBGbGFzaCB0YXJnZXQsIHRoaXMgY2FjaGluZyBtYXkgaW5jcmVhc2UgcGVyZm9ybWFuY2UgZm9yIGRpc3BsYXlcclxuXHQgKiBvYmplY3RzIHRoYXQgY29udGFpbiBjb21wbGV4IHZlY3RvciBjb250ZW50LlxyXG5cdCAqXHJcblx0ICogPHA+QWxsIHZlY3RvciBkYXRhIGZvciBhIGRpc3BsYXkgb2JqZWN0IHRoYXQgaGFzIGEgY2FjaGVkIGJpdG1hcCBpcyBkcmF3blxyXG5cdCAqIHRvIHRoZSBiaXRtYXAgaW5zdGVhZCBvZiB0aGUgbWFpbiBkaXNwbGF5LiBJZlxyXG5cdCAqIDxjb2RlPmNhY2hlQXNCaXRtYXBNYXRyaXg8L2NvZGU+IGlzIG51bGwgb3IgdW5zdXBwb3J0ZWQsIHRoZSBiaXRtYXAgaXNcclxuXHQgKiB0aGVuIGNvcGllZCB0byB0aGUgbWFpbiBkaXNwbGF5IGFzIHVuc3RyZXRjaGVkLCB1bnJvdGF0ZWQgcGl4ZWxzIHNuYXBwZWRcclxuXHQgKiB0byB0aGUgbmVhcmVzdCBwaXhlbCBib3VuZGFyaWVzLiBQaXhlbHMgYXJlIG1hcHBlZCAxIHRvIDEgd2l0aCB0aGUgcGFyZW50XHJcblx0ICogb2JqZWN0LiBJZiB0aGUgYm91bmRzIG9mIHRoZSBiaXRtYXAgY2hhbmdlLCB0aGUgYml0bWFwIGlzIHJlY3JlYXRlZFxyXG5cdCAqIGluc3RlYWQgb2YgYmVpbmcgc3RyZXRjaGVkLjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPklmIDxjb2RlPmNhY2hlQXNCaXRtYXBNYXRyaXg8L2NvZGU+IGlzIG5vbi1udWxsIGFuZCBzdXBwb3J0ZWQsIHRoZVxyXG5cdCAqIG9iamVjdCBpcyBkcmF3biB0byB0aGUgb2ZmLXNjcmVlbiBiaXRtYXAgdXNpbmcgdGhhdCBtYXRyaXggYW5kIHRoZVxyXG5cdCAqIHN0cmV0Y2hlZCBhbmQvb3Igcm90YXRlZCByZXN1bHRzIG9mIHRoYXQgcmVuZGVyaW5nIGFyZSB1c2VkIHRvIGRyYXcgdGhlXHJcblx0ICogb2JqZWN0IHRvIHRoZSBtYWluIGRpc3BsYXkuPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+Tm8gaW50ZXJuYWwgYml0bWFwIGlzIGNyZWF0ZWQgdW5sZXNzIHRoZSA8Y29kZT5jYWNoZUFzQml0bWFwPC9jb2RlPlxyXG5cdCAqIHByb3BlcnR5IGlzIHNldCB0byA8Y29kZT50cnVlPC9jb2RlPi48L3A+XHJcblx0ICpcclxuXHQgKiA8cD5BZnRlciB5b3Ugc2V0IHRoZSA8Y29kZT5jYWNoZUFzQml0bWFwPC9jb2RlPiBwcm9wZXJ0eSB0b1xyXG5cdCAqIDxjb2RlPnRydWU8L2NvZGU+LCB0aGUgcmVuZGVyaW5nIGRvZXMgbm90IGNoYW5nZSwgaG93ZXZlciB0aGUgZGlzcGxheVxyXG5cdCAqIG9iamVjdCBwZXJmb3JtcyBwaXhlbCBzbmFwcGluZyBhdXRvbWF0aWNhbGx5LiBUaGUgYW5pbWF0aW9uIHNwZWVkIGNhbiBiZVxyXG5cdCAqIHNpZ25pZmljYW50bHkgZmFzdGVyIGRlcGVuZGluZyBvbiB0aGUgY29tcGxleGl0eSBvZiB0aGUgdmVjdG9yIGNvbnRlbnQuXHJcblx0ICogPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+VGhlIDxjb2RlPmNhY2hlQXNCaXRtYXA8L2NvZGU+IHByb3BlcnR5IGlzIGF1dG9tYXRpY2FsbHkgc2V0IHRvXHJcblx0ICogPGNvZGU+dHJ1ZTwvY29kZT4gd2hlbmV2ZXIgeW91IGFwcGx5IGEgZmlsdGVyIHRvIGEgZGlzcGxheSBvYmplY3Qod2hlblxyXG5cdCAqIGl0cyA8Y29kZT5maWx0ZXI8L2NvZGU+IGFycmF5IGlzIG5vdCBlbXB0eSksIGFuZCBpZiBhIGRpc3BsYXkgb2JqZWN0IGhhcyBhXHJcblx0ICogZmlsdGVyIGFwcGxpZWQgdG8gaXQsIDxjb2RlPmNhY2hlQXNCaXRtYXA8L2NvZGU+IGlzIHJlcG9ydGVkIGFzXHJcblx0ICogPGNvZGU+dHJ1ZTwvY29kZT4gZm9yIHRoYXQgZGlzcGxheSBvYmplY3QsIGV2ZW4gaWYgeW91IHNldCB0aGUgcHJvcGVydHkgdG9cclxuXHQgKiA8Y29kZT5mYWxzZTwvY29kZT4uIElmIHlvdSBjbGVhciBhbGwgZmlsdGVycyBmb3IgYSBkaXNwbGF5IG9iamVjdCwgdGhlXHJcblx0ICogPGNvZGU+Y2FjaGVBc0JpdG1hcDwvY29kZT4gc2V0dGluZyBjaGFuZ2VzIHRvIHdoYXQgaXQgd2FzIGxhc3Qgc2V0IHRvLjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPkEgZGlzcGxheSBvYmplY3QgZG9lcyBub3QgdXNlIGEgYml0bWFwIGV2ZW4gaWYgdGhlXHJcblx0ICogPGNvZGU+Y2FjaGVBc0JpdG1hcDwvY29kZT4gcHJvcGVydHkgaXMgc2V0IHRvIDxjb2RlPnRydWU8L2NvZGU+IGFuZFxyXG5cdCAqIGluc3RlYWQgcmVuZGVycyBmcm9tIHZlY3RvciBkYXRhIGluIHRoZSBmb2xsb3dpbmcgY2FzZXM6PC9wPlxyXG5cdCAqXHJcblx0ICogPHVsPlxyXG5cdCAqICAgPGxpPlRoZSBiaXRtYXAgaXMgdG9vIGxhcmdlLiBJbiBBSVIgMS41IGFuZCBGbGFzaCBQbGF5ZXIgMTAsIHRoZSBtYXhpbXVtXHJcblx0ICogc2l6ZSBmb3IgYSBiaXRtYXAgaW1hZ2UgaXMgOCwxOTEgcGl4ZWxzIGluIHdpZHRoIG9yIGhlaWdodCwgYW5kIHRoZSB0b3RhbFxyXG5cdCAqIG51bWJlciBvZiBwaXhlbHMgY2Fubm90IGV4Y2VlZCAxNiw3NzcsMjE1IHBpeGVscy4oU28sIGlmIGEgYml0bWFwIGltYWdlXHJcblx0ICogaXMgOCwxOTEgcGl4ZWxzIHdpZGUsIGl0IGNhbiBvbmx5IGJlIDIsMDQ4IHBpeGVscyBoaWdoLikgSW4gRmxhc2ggUGxheWVyIDlcclxuXHQgKiBhbmQgZWFybGllciwgdGhlIGxpbWl0YXRpb24gaXMgaXMgMjg4MCBwaXhlbHMgaW4gaGVpZ2h0IGFuZCAyLDg4MCBwaXhlbHNcclxuXHQgKiBpbiB3aWR0aC48L2xpPlxyXG5cdCAqICAgPGxpPlRoZSBiaXRtYXAgZmFpbHMgdG8gYWxsb2NhdGUob3V0IG9mIG1lbW9yeSBlcnJvcikuIDwvbGk+XHJcblx0ICogPC91bD5cclxuXHQgKlxyXG5cdCAqIDxwPlRoZSA8Y29kZT5jYWNoZUFzQml0bWFwPC9jb2RlPiBwcm9wZXJ0eSBpcyBiZXN0IHVzZWQgd2l0aCBtb3ZpZSBjbGlwc1xyXG5cdCAqIHRoYXQgaGF2ZSBtb3N0bHkgc3RhdGljIGNvbnRlbnQgYW5kIHRoYXQgZG8gbm90IHNjYWxlIGFuZCByb3RhdGVcclxuXHQgKiBmcmVxdWVudGx5LiBXaXRoIHN1Y2ggbW92aWUgY2xpcHMsIDxjb2RlPmNhY2hlQXNCaXRtYXA8L2NvZGU+IGNhbiBsZWFkIHRvXHJcblx0ICogcGVyZm9ybWFuY2UgaW5jcmVhc2VzIHdoZW4gdGhlIG1vdmllIGNsaXAgaXMgdHJhbnNsYXRlZCh3aGVuIGl0cyA8aT54PC9pPlxyXG5cdCAqIGFuZCA8aT55PC9pPiBwb3NpdGlvbiBpcyBjaGFuZ2VkKS48L3A+XHJcblx0ICovXHJcblx0cHVibGljIGNhY2hlQXNCaXRtYXA6Ym9vbGVhbjtcclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgY2FzdHNTaGFkb3dzOmJvb2xlYW4gPSB0cnVlO1xyXG5cclxuXHQvKipcclxuXHQgKiBJbmRpY2F0ZXMgdGhlIGRlcHRoIG9mIHRoZSBkaXNwbGF5IG9iamVjdCwgaW4gcGl4ZWxzLiBUaGUgZGVwdGggaXNcclxuXHQgKiBjYWxjdWxhdGVkIGJhc2VkIG9uIHRoZSBib3VuZHMgb2YgdGhlIGNvbnRlbnQgb2YgdGhlIGRpc3BsYXkgb2JqZWN0LiBXaGVuXHJcblx0ICogeW91IHNldCB0aGUgPGNvZGU+ZGVwdGg8L2NvZGU+IHByb3BlcnR5LCB0aGUgPGNvZGU+c2NhbGVaPC9jb2RlPiBwcm9wZXJ0eVxyXG5cdCAqIGlzIGFkanVzdGVkIGFjY29yZGluZ2x5LCBhcyBzaG93biBpbiB0aGUgZm9sbG93aW5nIGNvZGU6XHJcblx0ICpcclxuXHQgKiA8cD5FeGNlcHQgZm9yIFRleHRGaWVsZCBhbmQgVmlkZW8gb2JqZWN0cywgYSBkaXNwbGF5IG9iamVjdCB3aXRoIG5vXHJcblx0ICogY29udGVudCAoc3VjaCBhcyBhbiBlbXB0eSBzcHJpdGUpIGhhcyBhIGRlcHRoIG9mIDAsIGV2ZW4gaWYgeW91IHRyeSB0b1xyXG5cdCAqIHNldCA8Y29kZT5kZXB0aDwvY29kZT4gdG8gYSBkaWZmZXJlbnQgdmFsdWUuPC9wPlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgZGVwdGgoKTpudW1iZXJcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fcEJvdW5kc0ludmFsaWQpXHJcblx0XHRcdHRoaXMucFVwZGF0ZUJvdW5kcygpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLl9kZXB0aDtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgZGVwdGgodmFsOm51bWJlcilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fZGVwdGggPT0gdmFsKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fZGVwdGggPT0gdmFsO1xyXG5cclxuXHRcdHRoaXMuX3BTY2FsZVogPSB2YWwvdGhpcy5ib3VuZHMuYWFiYi5kZXB0aDtcclxuXHJcblx0XHR0aGlzLmludmFsaWRhdGVTY2FsZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRGVmaW5lcyB0aGUgcm90YXRpb24gb2YgdGhlIDNkIG9iamVjdCBhcyBhIDxjb2RlPlZlY3RvcjNEPC9jb2RlPiBvYmplY3QgY29udGFpbmluZyBldWxlciBhbmdsZXMgZm9yIHJvdGF0aW9uIGFyb3VuZCB4LCB5IGFuZCB6IGF4aXMuXHJcblx0ICovXHJcblx0cHVibGljIGdldCBldWxlcnMoKTpWZWN0b3IzRFxyXG5cdHtcclxuXHRcdHRoaXMuX2V1bGVycy54ID0gdGhpcy5fcm90YXRpb25YKk1hdGhDb25zdHMuUkFESUFOU19UT19ERUdSRUVTO1xyXG5cdFx0dGhpcy5fZXVsZXJzLnkgPSB0aGlzLl9yb3RhdGlvblkqTWF0aENvbnN0cy5SQURJQU5TX1RPX0RFR1JFRVM7XHJcblx0XHR0aGlzLl9ldWxlcnMueiA9IHRoaXMuX3JvdGF0aW9uWipNYXRoQ29uc3RzLlJBRElBTlNfVE9fREVHUkVFUztcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fZXVsZXJzO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBldWxlcnModmFsdWU6VmVjdG9yM0QpXHJcblx0e1xyXG5cdFx0dGhpcy5fcm90YXRpb25YID0gdmFsdWUueCpNYXRoQ29uc3RzLkRFR1JFRVNfVE9fUkFESUFOUztcclxuXHRcdHRoaXMuX3JvdGF0aW9uWSA9IHZhbHVlLnkqTWF0aENvbnN0cy5ERUdSRUVTX1RPX1JBRElBTlM7XHJcblx0XHR0aGlzLl9yb3RhdGlvblogPSB2YWx1ZS56Kk1hdGhDb25zdHMuREVHUkVFU19UT19SQURJQU5TO1xyXG5cclxuXHRcdHRoaXMuaW52YWxpZGF0ZVJvdGF0aW9uKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBbiBvYmplY3QgdGhhdCBjYW4gY29udGFpbiBhbnkgZXh0cmEgZGF0YS5cclxuXHQgKi9cclxuXHRwdWJsaWMgZXh0cmE6T2JqZWN0O1xyXG5cclxuXHQvKipcclxuXHQgKiBBbiBpbmRleGVkIGFycmF5IHRoYXQgY29udGFpbnMgZWFjaCBmaWx0ZXIgb2JqZWN0IGN1cnJlbnRseSBhc3NvY2lhdGVkXHJcblx0ICogd2l0aCB0aGUgZGlzcGxheSBvYmplY3QuIFRoZSBmbGFzaC5maWx0ZXJzIHBhY2thZ2UgY29udGFpbnMgc2V2ZXJhbFxyXG5cdCAqIGNsYXNzZXMgdGhhdCBkZWZpbmUgc3BlY2lmaWMgZmlsdGVycyB5b3UgY2FuIHVzZS5cclxuXHQgKlxyXG5cdCAqIDxwPkZpbHRlcnMgY2FuIGJlIGFwcGxpZWQgaW4gRmxhc2ggUHJvZmVzc2lvbmFsIGF0IGRlc2lnbiB0aW1lLCBvciBhdCBydW5cclxuXHQgKiB0aW1lIGJ5IHVzaW5nIEFjdGlvblNjcmlwdCBjb2RlLiBUbyBhcHBseSBhIGZpbHRlciBieSB1c2luZyBBY3Rpb25TY3JpcHQsXHJcblx0ICogeW91IG11c3QgbWFrZSBhIHRlbXBvcmFyeSBjb3B5IG9mIHRoZSBlbnRpcmUgPGNvZGU+ZmlsdGVyczwvY29kZT4gYXJyYXksXHJcblx0ICogbW9kaWZ5IHRoZSB0ZW1wb3JhcnkgYXJyYXksIHRoZW4gYXNzaWduIHRoZSB2YWx1ZSBvZiB0aGUgdGVtcG9yYXJ5IGFycmF5XHJcblx0ICogYmFjayB0byB0aGUgPGNvZGU+ZmlsdGVyczwvY29kZT4gYXJyYXkuIFlvdSBjYW5ub3QgZGlyZWN0bHkgYWRkIGEgbmV3XHJcblx0ICogZmlsdGVyIG9iamVjdCB0byB0aGUgPGNvZGU+ZmlsdGVyczwvY29kZT4gYXJyYXkuPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+VG8gYWRkIGEgZmlsdGVyIGJ5IHVzaW5nIEFjdGlvblNjcmlwdCwgcGVyZm9ybSB0aGUgZm9sbG93aW5nIHN0ZXBzXHJcblx0ICogKGFzc3VtZSB0aGF0IHRoZSB0YXJnZXQgZGlzcGxheSBvYmplY3QgaXMgbmFtZWRcclxuXHQgKiA8Y29kZT5teURpc3BsYXlPYmplY3Q8L2NvZGU+KTo8L3A+XHJcblx0ICpcclxuXHQgKiA8b2w+XHJcblx0ICogICA8bGk+Q3JlYXRlIGEgbmV3IGZpbHRlciBvYmplY3QgYnkgdXNpbmcgdGhlIGNvbnN0cnVjdG9yIG1ldGhvZCBvZiB5b3VyXHJcblx0ICogY2hvc2VuIGZpbHRlciBjbGFzcy48L2xpPlxyXG5cdCAqICAgPGxpPkFzc2lnbiB0aGUgdmFsdWUgb2YgdGhlIDxjb2RlPm15RGlzcGxheU9iamVjdC5maWx0ZXJzPC9jb2RlPiBhcnJheVxyXG5cdCAqIHRvIGEgdGVtcG9yYXJ5IGFycmF5LCBzdWNoIGFzIG9uZSBuYW1lZCA8Y29kZT5teUZpbHRlcnM8L2NvZGU+LjwvbGk+XHJcblx0ICogICA8bGk+QWRkIHRoZSBuZXcgZmlsdGVyIG9iamVjdCB0byB0aGUgPGNvZGU+bXlGaWx0ZXJzPC9jb2RlPiB0ZW1wb3JhcnlcclxuXHQgKiBhcnJheS48L2xpPlxyXG5cdCAqICAgPGxpPkFzc2lnbiB0aGUgdmFsdWUgb2YgdGhlIHRlbXBvcmFyeSBhcnJheSB0byB0aGVcclxuXHQgKiA8Y29kZT5teURpc3BsYXlPYmplY3QuZmlsdGVyczwvY29kZT4gYXJyYXkuPC9saT5cclxuXHQgKiA8L29sPlxyXG5cdCAqXHJcblx0ICogPHA+SWYgdGhlIDxjb2RlPmZpbHRlcnM8L2NvZGU+IGFycmF5IGlzIHVuZGVmaW5lZCwgeW91IGRvIG5vdCBuZWVkIHRvIHVzZVxyXG5cdCAqIGEgdGVtcG9yYXJ5IGFycmF5LiBJbnN0ZWFkLCB5b3UgY2FuIGRpcmVjdGx5IGFzc2lnbiBhbiBhcnJheSBsaXRlcmFsIHRoYXRcclxuXHQgKiBjb250YWlucyBvbmUgb3IgbW9yZSBmaWx0ZXIgb2JqZWN0cyB0aGF0IHlvdSBjcmVhdGUuIFRoZSBmaXJzdCBleGFtcGxlIGluXHJcblx0ICogdGhlIEV4YW1wbGVzIHNlY3Rpb24gYWRkcyBhIGRyb3Agc2hhZG93IGZpbHRlciBieSB1c2luZyBjb2RlIHRoYXQgaGFuZGxlc1xyXG5cdCAqIGJvdGggZGVmaW5lZCBhbmQgdW5kZWZpbmVkIDxjb2RlPmZpbHRlcnM8L2NvZGU+IGFycmF5cy48L3A+XHJcblx0ICpcclxuXHQgKiA8cD5UbyBtb2RpZnkgYW4gZXhpc3RpbmcgZmlsdGVyIG9iamVjdCwgeW91IG11c3QgdXNlIHRoZSB0ZWNobmlxdWUgb2ZcclxuXHQgKiBtb2RpZnlpbmcgYSBjb3B5IG9mIHRoZSA8Y29kZT5maWx0ZXJzPC9jb2RlPiBhcnJheTo8L3A+XHJcblx0ICpcclxuXHQgKiA8b2w+XHJcblx0ICogICA8bGk+QXNzaWduIHRoZSB2YWx1ZSBvZiB0aGUgPGNvZGU+ZmlsdGVyczwvY29kZT4gYXJyYXkgdG8gYSB0ZW1wb3JhcnlcclxuXHQgKiBhcnJheSwgc3VjaCBhcyBvbmUgbmFtZWQgPGNvZGU+bXlGaWx0ZXJzPC9jb2RlPi48L2xpPlxyXG5cdCAqICAgPGxpPk1vZGlmeSB0aGUgcHJvcGVydHkgYnkgdXNpbmcgdGhlIHRlbXBvcmFyeSBhcnJheSxcclxuXHQgKiA8Y29kZT5teUZpbHRlcnM8L2NvZGU+LiBGb3IgZXhhbXBsZSwgdG8gc2V0IHRoZSBxdWFsaXR5IHByb3BlcnR5IG9mIHRoZVxyXG5cdCAqIGZpcnN0IGZpbHRlciBpbiB0aGUgYXJyYXksIHlvdSBjb3VsZCB1c2UgdGhlIGZvbGxvd2luZyBjb2RlOlxyXG5cdCAqIDxjb2RlPm15RmlsdGVyc1swXS5xdWFsaXR5ID0gMTs8L2NvZGU+PC9saT5cclxuXHQgKiAgIDxsaT5Bc3NpZ24gdGhlIHZhbHVlIG9mIHRoZSB0ZW1wb3JhcnkgYXJyYXkgdG8gdGhlIDxjb2RlPmZpbHRlcnM8L2NvZGU+XHJcblx0ICogYXJyYXkuPC9saT5cclxuXHQgKiA8L29sPlxyXG5cdCAqXHJcblx0ICogPHA+QXQgbG9hZCB0aW1lLCBpZiBhIGRpc3BsYXkgb2JqZWN0IGhhcyBhbiBhc3NvY2lhdGVkIGZpbHRlciwgaXQgaXNcclxuXHQgKiBtYXJrZWQgdG8gY2FjaGUgaXRzZWxmIGFzIGEgdHJhbnNwYXJlbnQgYml0bWFwLiBGcm9tIHRoaXMgcG9pbnQgZm9yd2FyZCxcclxuXHQgKiBhcyBsb25nIGFzIHRoZSBkaXNwbGF5IG9iamVjdCBoYXMgYSB2YWxpZCBmaWx0ZXIgbGlzdCwgdGhlIHBsYXllciBjYWNoZXNcclxuXHQgKiB0aGUgZGlzcGxheSBvYmplY3QgYXMgYSBiaXRtYXAuIFRoaXMgc291cmNlIGJpdG1hcCBpcyB1c2VkIGFzIGEgc291cmNlXHJcblx0ICogaW1hZ2UgZm9yIHRoZSBmaWx0ZXIgZWZmZWN0cy4gRWFjaCBkaXNwbGF5IG9iamVjdCB1c3VhbGx5IGhhcyB0d28gYml0bWFwczpcclxuXHQgKiBvbmUgd2l0aCB0aGUgb3JpZ2luYWwgdW5maWx0ZXJlZCBzb3VyY2UgZGlzcGxheSBvYmplY3QgYW5kIGFub3RoZXIgZm9yIHRoZVxyXG5cdCAqIGZpbmFsIGltYWdlIGFmdGVyIGZpbHRlcmluZy4gVGhlIGZpbmFsIGltYWdlIGlzIHVzZWQgd2hlbiByZW5kZXJpbmcuIEFzXHJcblx0ICogbG9uZyBhcyB0aGUgZGlzcGxheSBvYmplY3QgZG9lcyBub3QgY2hhbmdlLCB0aGUgZmluYWwgaW1hZ2UgZG9lcyBub3QgbmVlZFxyXG5cdCAqIHVwZGF0aW5nLjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPlRoZSBmbGFzaC5maWx0ZXJzIHBhY2thZ2UgaW5jbHVkZXMgY2xhc3NlcyBmb3IgZmlsdGVycy4gRm9yIGV4YW1wbGUsIHRvXHJcblx0ICogY3JlYXRlIGEgRHJvcFNoYWRvdyBmaWx0ZXIsIHlvdSB3b3VsZCB3cml0ZTo8L3A+XHJcblx0ICpcclxuXHQgKiBAdGhyb3dzIEFyZ3VtZW50RXJyb3IgV2hlbiA8Y29kZT5maWx0ZXJzPC9jb2RlPiBpbmNsdWRlcyBhIFNoYWRlckZpbHRlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBhbmQgdGhlIHNoYWRlciBvdXRwdXQgdHlwZSBpcyBub3QgY29tcGF0aWJsZSB3aXRoXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIHRoaXMgb3BlcmF0aW9uKHRoZSBzaGFkZXIgbXVzdCBzcGVjaWZ5IGFcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+cGl4ZWw0PC9jb2RlPiBvdXRwdXQpLlxyXG5cdCAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciBXaGVuIDxjb2RlPmZpbHRlcnM8L2NvZGU+IGluY2x1ZGVzIGEgU2hhZGVyRmlsdGVyXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIGFuZCB0aGUgc2hhZGVyIGRvZXNuJ3Qgc3BlY2lmeSBhbnkgaW1hZ2UgaW5wdXQgb3JcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgdGhlIGZpcnN0IGlucHV0IGlzIG5vdCBhbiA8Y29kZT5pbWFnZTQ8L2NvZGU+IGlucHV0LlxyXG5cdCAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciBXaGVuIDxjb2RlPmZpbHRlcnM8L2NvZGU+IGluY2x1ZGVzIGEgU2hhZGVyRmlsdGVyXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIGFuZCB0aGUgc2hhZGVyIHNwZWNpZmllcyBhbiBpbWFnZSBpbnB1dCB0aGF0IGlzbid0XHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVkLlxyXG5cdCAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciBXaGVuIDxjb2RlPmZpbHRlcnM8L2NvZGU+IGluY2x1ZGVzIGEgU2hhZGVyRmlsdGVyLCBhXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIEJ5dGVBcnJheSBvciBWZWN0b3IuPE51bWJlcj4gaW5zdGFuY2UgYXMgYSBzaGFkZXJcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQsIGFuZCB0aGUgPGNvZGU+d2lkdGg8L2NvZGU+IGFuZFxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5oZWlnaHQ8L2NvZGU+IHByb3BlcnRpZXMgYXJlbid0IHNwZWNpZmllZCBmb3JcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgdGhlIFNoYWRlcklucHV0IG9iamVjdCwgb3IgdGhlIHNwZWNpZmllZCB2YWx1ZXNcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgZG9uJ3QgbWF0Y2ggdGhlIGFtb3VudCBvZiBkYXRhIGluIHRoZSBpbnB1dCBkYXRhLlxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBTZWUgdGhlIDxjb2RlPlNoYWRlcklucHV0LmlucHV0PC9jb2RlPiBwcm9wZXJ0eSBmb3JcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgbW9yZSBpbmZvcm1hdGlvbi5cclxuXHQgKi9cclxuLy9cdFx0cHVibGljIGZpbHRlcnM6QXJyYXk8RHluYW1pYz47XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluZGljYXRlcyB0aGUgaGVpZ2h0IG9mIHRoZSBkaXNwbGF5IG9iamVjdCwgaW4gcGl4ZWxzLiBUaGUgaGVpZ2h0IGlzXHJcblx0ICogY2FsY3VsYXRlZCBiYXNlZCBvbiB0aGUgYm91bmRzIG9mIHRoZSBjb250ZW50IG9mIHRoZSBkaXNwbGF5IG9iamVjdC4gV2hlblxyXG5cdCAqIHlvdSBzZXQgdGhlIDxjb2RlPmhlaWdodDwvY29kZT4gcHJvcGVydHksIHRoZSA8Y29kZT5zY2FsZVk8L2NvZGU+IHByb3BlcnR5XHJcblx0ICogaXMgYWRqdXN0ZWQgYWNjb3JkaW5nbHksIGFzIHNob3duIGluIHRoZSBmb2xsb3dpbmcgY29kZTpcclxuXHQgKlxyXG5cdCAqIDxwPkV4Y2VwdCBmb3IgVGV4dEZpZWxkIGFuZCBWaWRlbyBvYmplY3RzLCBhIGRpc3BsYXkgb2JqZWN0IHdpdGggbm9cclxuXHQgKiBjb250ZW50IChzdWNoIGFzIGFuIGVtcHR5IHNwcml0ZSkgaGFzIGEgaGVpZ2h0IG9mIDAsIGV2ZW4gaWYgeW91IHRyeSB0b1xyXG5cdCAqIHNldCA8Y29kZT5oZWlnaHQ8L2NvZGU+IHRvIGEgZGlmZmVyZW50IHZhbHVlLjwvcD5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGhlaWdodCgpOm51bWJlclxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9wQm91bmRzSW52YWxpZClcclxuXHRcdFx0dGhpcy5wVXBkYXRlQm91bmRzKCk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX2hlaWdodDtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgaGVpZ2h0KHZhbDpudW1iZXIpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX2hlaWdodCA9PSB2YWwpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9oZWlnaHQgPT0gdmFsO1xyXG5cclxuXHRcdHRoaXMuX3BTY2FsZVkgPSB2YWwvdGhpcy5ib3VuZHMuYWFiYi5oZWlnaHQ7XHJcblxyXG5cdFx0dGhpcy5pbnZhbGlkYXRlU2NhbGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluZGljYXRlcyB0aGUgaW5zdGFuY2UgY29udGFpbmVyIGluZGV4IG9mIHRoZSBEaXNwbGF5T2JqZWN0LiBUaGUgb2JqZWN0IGNhbiBiZVxyXG5cdCAqIGlkZW50aWZpZWQgaW4gdGhlIGNoaWxkIGxpc3Qgb2YgaXRzIHBhcmVudCBkaXNwbGF5IG9iamVjdCBjb250YWluZXIgYnlcclxuXHQgKiBjYWxsaW5nIHRoZSA8Y29kZT5nZXRDaGlsZEJ5SW5kZXgoKTwvY29kZT4gbWV0aG9kIG9mIHRoZSBkaXNwbGF5IG9iamVjdFxyXG5cdCAqIGNvbnRhaW5lci5cclxuXHQgKlxyXG5cdCAqIDxwPklmIHRoZSBEaXNwbGF5T2JqZWN0IGhhcyBubyBwYXJlbnQgY29udGFpbmVyLCBpbmRleCBkZWZhdWx0cyB0byAwLjwvcD5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGluZGV4KCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX3BQYXJlbnQpXHJcblx0XHRcdHJldHVybiB0aGlzLl9wUGFyZW50LmdldENoaWxkSW5kZXgodGhpcyk7XHJcblxyXG5cdFx0cmV0dXJuIDA7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgaW52ZXJzZVNjZW5lVHJhbnNmb3JtKCk6TWF0cml4M0RcclxuXHR7XHJcblx0XHRpZiAodGhpcy5faW52ZXJzZVNjZW5lVHJhbnNmb3JtRGlydHkpIHtcclxuXHRcdFx0dGhpcy5faW52ZXJzZVNjZW5lVHJhbnNmb3JtLmNvcHlGcm9tKHRoaXMuc2NlbmVUcmFuc2Zvcm0pO1xyXG5cdFx0XHR0aGlzLl9pbnZlcnNlU2NlbmVUcmFuc2Zvcm0uaW52ZXJ0KCk7XHJcblx0XHRcdHRoaXMuX2ludmVyc2VTY2VuZVRyYW5zZm9ybURpcnR5ID0gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcy5faW52ZXJzZVNjZW5lVHJhbnNmb3JtO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGlnbm9yZVRyYW5zZm9ybSgpOmJvb2xlYW5cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcElnbm9yZVRyYW5zZm9ybTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgaWdub3JlVHJhbnNmb3JtKHZhbHVlOmJvb2xlYW4pXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX3BJZ25vcmVUcmFuc2Zvcm0gPT0gdmFsdWUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9wSWdub3JlVHJhbnNmb3JtID0gdmFsdWU7XHJcblxyXG5cdFx0aWYgKHZhbHVlKSB7XHJcblx0XHRcdHRoaXMuX3BTY2VuZVRyYW5zZm9ybS5pZGVudGl0eSgpO1xyXG5cdFx0XHR0aGlzLl9zY2VuZVBvc2l0aW9uLnNldFRvKDAsIDAsIDApO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMucEludmFsaWRhdGVTY2VuZVRyYW5zZm9ybSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGlzRW50aXR5KClcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcElzRW50aXR5O1xyXG5cdH1cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIGEgTG9hZGVySW5mbyBvYmplY3QgY29udGFpbmluZyBpbmZvcm1hdGlvbiBhYm91dCBsb2FkaW5nIHRoZSBmaWxlXHJcblx0ICogdG8gd2hpY2ggdGhpcyBkaXNwbGF5IG9iamVjdCBiZWxvbmdzLiBUaGUgPGNvZGU+bG9hZGVySW5mbzwvY29kZT4gcHJvcGVydHlcclxuXHQgKiBpcyBkZWZpbmVkIG9ubHkgZm9yIHRoZSByb290IGRpc3BsYXkgb2JqZWN0IG9mIGEgU1dGIGZpbGUgb3IgZm9yIGEgbG9hZGVkXHJcblx0ICogQml0bWFwKG5vdCBmb3IgYSBCaXRtYXAgdGhhdCBpcyBkcmF3biB3aXRoIEFjdGlvblNjcmlwdCkuIFRvIGZpbmQgdGhlXHJcblx0ICogPGNvZGU+bG9hZGVySW5mbzwvY29kZT4gb2JqZWN0IGFzc29jaWF0ZWQgd2l0aCB0aGUgU1dGIGZpbGUgdGhhdCBjb250YWluc1xyXG5cdCAqIGEgZGlzcGxheSBvYmplY3QgbmFtZWQgPGNvZGU+bXlEaXNwbGF5T2JqZWN0PC9jb2RlPiwgdXNlXHJcblx0ICogPGNvZGU+bXlEaXNwbGF5T2JqZWN0LnJvb3QubG9hZGVySW5mbzwvY29kZT4uXHJcblx0ICpcclxuXHQgKiA8cD5BIGxhcmdlIFNXRiBmaWxlIGNhbiBtb25pdG9yIGl0cyBkb3dubG9hZCBieSBjYWxsaW5nXHJcblx0ICogPGNvZGU+dGhpcy5yb290LmxvYWRlckluZm8uYWRkRXZlbnRMaXN0ZW5lcihFdmVudC5DT01QTEVURSxcclxuXHQgKiBmdW5jKTwvY29kZT4uPC9wPlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgbG9hZGVySW5mbygpOkxvYWRlckluZm9cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fbG9hZGVySW5mbztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBjYWxsaW5nIGRpc3BsYXkgb2JqZWN0IGlzIG1hc2tlZCBieSB0aGUgc3BlY2lmaWVkIDxjb2RlPm1hc2s8L2NvZGU+XHJcblx0ICogb2JqZWN0LiBUbyBlbnN1cmUgdGhhdCBtYXNraW5nIHdvcmtzIHdoZW4gdGhlIFN0YWdlIGlzIHNjYWxlZCwgdGhlXHJcblx0ICogPGNvZGU+bWFzazwvY29kZT4gZGlzcGxheSBvYmplY3QgbXVzdCBiZSBpbiBhbiBhY3RpdmUgcGFydCBvZiB0aGUgZGlzcGxheVxyXG5cdCAqIGxpc3QuIFRoZSA8Y29kZT5tYXNrPC9jb2RlPiBvYmplY3QgaXRzZWxmIGlzIG5vdCBkcmF3bi4gU2V0XHJcblx0ICogPGNvZGU+bWFzazwvY29kZT4gdG8gPGNvZGU+bnVsbDwvY29kZT4gdG8gcmVtb3ZlIHRoZSBtYXNrLlxyXG5cdCAqXHJcblx0ICogPHA+VG8gYmUgYWJsZSB0byBzY2FsZSBhIG1hc2sgb2JqZWN0LCBpdCBtdXN0IGJlIG9uIHRoZSBkaXNwbGF5IGxpc3QuIFRvXHJcblx0ICogYmUgYWJsZSB0byBkcmFnIGEgbWFzayBTcHJpdGUgb2JqZWN0KGJ5IGNhbGxpbmcgaXRzXHJcblx0ICogPGNvZGU+c3RhcnREcmFnKCk8L2NvZGU+IG1ldGhvZCksIGl0IG11c3QgYmUgb24gdGhlIGRpc3BsYXkgbGlzdC4gVG8gY2FsbFxyXG5cdCAqIHRoZSA8Y29kZT5zdGFydERyYWcoKTwvY29kZT4gbWV0aG9kIGZvciBhIG1hc2sgc3ByaXRlIGJhc2VkIG9uIGFcclxuXHQgKiA8Y29kZT5tb3VzZURvd248L2NvZGU+IGV2ZW50IGJlaW5nIGRpc3BhdGNoZWQgYnkgdGhlIHNwcml0ZSwgc2V0IHRoZVxyXG5cdCAqIHNwcml0ZSdzIDxjb2RlPmJ1dHRvbk1vZGU8L2NvZGU+IHByb3BlcnR5IHRvIDxjb2RlPnRydWU8L2NvZGU+LjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPldoZW4gZGlzcGxheSBvYmplY3RzIGFyZSBjYWNoZWQgYnkgc2V0dGluZyB0aGVcclxuXHQgKiA8Y29kZT5jYWNoZUFzQml0bWFwPC9jb2RlPiBwcm9wZXJ0eSB0byA8Y29kZT50cnVlPC9jb2RlPiBhbiB0aGVcclxuXHQgKiA8Y29kZT5jYWNoZUFzQml0bWFwTWF0cml4PC9jb2RlPiBwcm9wZXJ0eSB0byBhIE1hdHJpeCBvYmplY3QsIGJvdGggdGhlXHJcblx0ICogbWFzayBhbmQgdGhlIGRpc3BsYXkgb2JqZWN0IGJlaW5nIG1hc2tlZCBtdXN0IGJlIHBhcnQgb2YgdGhlIHNhbWUgY2FjaGVkXHJcblx0ICogYml0bWFwLiBUaHVzLCBpZiB0aGUgZGlzcGxheSBvYmplY3QgaXMgY2FjaGVkLCB0aGVuIHRoZSBtYXNrIG11c3QgYmUgYVxyXG5cdCAqIGNoaWxkIG9mIHRoZSBkaXNwbGF5IG9iamVjdC4gSWYgYW4gYW5jZXN0b3Igb2YgdGhlIGRpc3BsYXkgb2JqZWN0IG9uIHRoZVxyXG5cdCAqIGRpc3BsYXkgbGlzdCBpcyBjYWNoZWQsIHRoZW4gdGhlIG1hc2sgbXVzdCBiZSBhIGNoaWxkIG9mIHRoYXQgYW5jZXN0b3Igb3JcclxuXHQgKiBvbmUgb2YgaXRzIGRlc2NlbmRlbnRzLiBJZiBtb3JlIHRoYW4gb25lIGFuY2VzdG9yIG9mIHRoZSBtYXNrZWQgb2JqZWN0IGlzXHJcblx0ICogY2FjaGVkLCB0aGVuIHRoZSBtYXNrIG11c3QgYmUgYSBkZXNjZW5kZW50IG9mIHRoZSBjYWNoZWQgY29udGFpbmVyIGNsb3Nlc3RcclxuXHQgKiB0byB0aGUgbWFza2VkIG9iamVjdCBpbiB0aGUgZGlzcGxheSBsaXN0LjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPjxiPk5vdGU6PC9iPiBBIHNpbmdsZSA8Y29kZT5tYXNrPC9jb2RlPiBvYmplY3QgY2Fubm90IGJlIHVzZWQgdG8gbWFza1xyXG5cdCAqIG1vcmUgdGhhbiBvbmUgY2FsbGluZyBkaXNwbGF5IG9iamVjdC4gV2hlbiB0aGUgPGNvZGU+bWFzazwvY29kZT4gaXNcclxuXHQgKiBhc3NpZ25lZCB0byBhIHNlY29uZCBkaXNwbGF5IG9iamVjdCwgaXQgaXMgcmVtb3ZlZCBhcyB0aGUgbWFzayBvZiB0aGVcclxuXHQgKiBmaXJzdCBvYmplY3QsIGFuZCB0aGF0IG9iamVjdCdzIDxjb2RlPm1hc2s8L2NvZGU+IHByb3BlcnR5IGJlY29tZXNcclxuXHQgKiA8Y29kZT5udWxsPC9jb2RlPi48L3A+XHJcblx0ICovXHJcblx0cHVibGljIG1hc2s6RGlzcGxheU9iamVjdDtcclxuXHJcblx0LyoqXHJcblx0ICogU3BlY2lmaWVzIHdoZXRoZXIgdGhpcyBvYmplY3QgcmVjZWl2ZXMgbW91c2UsIG9yIG90aGVyIHVzZXIgaW5wdXQsXHJcblx0ICogbWVzc2FnZXMuIFRoZSBkZWZhdWx0IHZhbHVlIGlzIDxjb2RlPnRydWU8L2NvZGU+LCB3aGljaCBtZWFucyB0aGF0IGJ5XHJcblx0ICogZGVmYXVsdCBhbnkgSW50ZXJhY3RpdmVPYmplY3QgaW5zdGFuY2UgdGhhdCBpcyBvbiB0aGUgZGlzcGxheSBsaXN0XHJcblx0ICogcmVjZWl2ZXMgbW91c2UgZXZlbnRzIG9yIG90aGVyIHVzZXIgaW5wdXQgZXZlbnRzLiBJZlxyXG5cdCAqIDxjb2RlPm1vdXNlRW5hYmxlZDwvY29kZT4gaXMgc2V0IHRvIDxjb2RlPmZhbHNlPC9jb2RlPiwgdGhlIGluc3RhbmNlIGRvZXNcclxuXHQgKiBub3QgcmVjZWl2ZSBhbnkgbW91c2UgZXZlbnRzKG9yIG90aGVyIHVzZXIgaW5wdXQgZXZlbnRzIGxpa2Uga2V5Ym9hcmRcclxuXHQgKiBldmVudHMpLiBBbnkgY2hpbGRyZW4gb2YgdGhpcyBpbnN0YW5jZSBvbiB0aGUgZGlzcGxheSBsaXN0IGFyZSBub3RcclxuXHQgKiBhZmZlY3RlZC4gVG8gY2hhbmdlIHRoZSA8Y29kZT5tb3VzZUVuYWJsZWQ8L2NvZGU+IGJlaGF2aW9yIGZvciBhbGxcclxuXHQgKiBjaGlsZHJlbiBvZiBhbiBvYmplY3Qgb24gdGhlIGRpc3BsYXkgbGlzdCwgdXNlXHJcblx0ICogPGNvZGU+Zmxhc2guZGlzcGxheS5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLm1vdXNlQ2hpbGRyZW48L2NvZGU+LlxyXG5cdCAqXHJcblx0ICogPHA+IE5vIGV2ZW50IGlzIGRpc3BhdGNoZWQgYnkgc2V0dGluZyB0aGlzIHByb3BlcnR5LiBZb3UgbXVzdCB1c2UgdGhlXHJcblx0ICogPGNvZGU+YWRkRXZlbnRMaXN0ZW5lcigpPC9jb2RlPiBtZXRob2QgdG8gY3JlYXRlIGludGVyYWN0aXZlXHJcblx0ICogZnVuY3Rpb25hbGl0eS48L3A+XHJcblx0ICovXHJcblx0cHVibGljIGdldCBtb3VzZUVuYWJsZWQoKTpib29sZWFuXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2V4cGxpY2l0TW91c2VFbmFibGVkO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBtb3VzZUVuYWJsZWQodmFsdWU6Ym9vbGVhbilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fZXhwbGljaXRNb3VzZUVuYWJsZWQgPT0gdmFsdWUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9leHBsaWNpdE1vdXNlRW5hYmxlZCA9IHZhbHVlO1xyXG5cclxuXHRcdHRoaXMuX3BVcGRhdGVJbXBsaWNpdE1vdXNlRW5hYmxlZCh0aGlzLl9wUGFyZW50PyB0aGlzLl9wUGFyZW50Lm1vdXNlQ2hpbGRyZW4gOiB0cnVlKTtcclxuXHR9XHJcblxyXG5cclxuXHQvKipcclxuXHQgKiBJbmRpY2F0ZXMgdGhlIHggY29vcmRpbmF0ZSBvZiB0aGUgbW91c2Ugb3IgdXNlciBpbnB1dCBkZXZpY2UgcG9zaXRpb24sIGluXHJcblx0ICogcGl4ZWxzLlxyXG5cdCAqXHJcblx0ICogPHA+PGI+Tm90ZTwvYj46IEZvciBhIERpc3BsYXlPYmplY3QgdGhhdCBoYXMgYmVlbiByb3RhdGVkLCB0aGUgcmV0dXJuZWQgeFxyXG5cdCAqIGNvb3JkaW5hdGUgd2lsbCByZWZsZWN0IHRoZSBub24tcm90YXRlZCBvYmplY3QuPC9wPlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgbW91c2VYKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX21vdXNlWDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluZGljYXRlcyB0aGUgeSBjb29yZGluYXRlIG9mIHRoZSBtb3VzZSBvciB1c2VyIGlucHV0IGRldmljZSBwb3NpdGlvbiwgaW5cclxuXHQgKiBwaXhlbHMuXHJcblx0ICpcclxuXHQgKiA8cD48Yj5Ob3RlPC9iPjogRm9yIGEgRGlzcGxheU9iamVjdCB0aGF0IGhhcyBiZWVuIHJvdGF0ZWQsIHRoZSByZXR1cm5lZCB5XHJcblx0ICogY29vcmRpbmF0ZSB3aWxsIHJlZmxlY3QgdGhlIG5vbi1yb3RhdGVkIG9iamVjdC48L3A+XHJcblx0ICovXHJcblx0cHVibGljIGdldCBtb3VzZVkoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fbW91c2VZO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSW5kaWNhdGVzIHRoZSBpbnN0YW5jZSBuYW1lIG9mIHRoZSBEaXNwbGF5T2JqZWN0LiBUaGUgb2JqZWN0IGNhbiBiZVxyXG5cdCAqIGlkZW50aWZpZWQgaW4gdGhlIGNoaWxkIGxpc3Qgb2YgaXRzIHBhcmVudCBkaXNwbGF5IG9iamVjdCBjb250YWluZXIgYnlcclxuXHQgKiBjYWxsaW5nIHRoZSA8Y29kZT5nZXRDaGlsZEJ5TmFtZSgpPC9jb2RlPiBtZXRob2Qgb2YgdGhlIGRpc3BsYXkgb2JqZWN0XHJcblx0ICogY29udGFpbmVyLlxyXG5cdCAqXHJcblx0ICogQHRocm93cyBJbGxlZ2FsT3BlcmF0aW9uRXJyb3IgSWYgeW91IGFyZSBhdHRlbXB0aW5nIHRvIHNldCB0aGlzIHByb3BlcnR5XHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb24gYW4gb2JqZWN0IHRoYXQgd2FzIHBsYWNlZCBvbiB0aGUgdGltZWxpbmVcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbiB0aGUgRmxhc2ggYXV0aG9yaW5nIHRvb2wuXHJcblx0ICovXHJcblx0cHVibGljIG5hbWU6c3RyaW5nO1xyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBvcmllbnRhdGlvbk1vZGU6c3RyaW5nID0gT3JpZW50YXRpb25Nb2RlLkRFRkFVTFQ7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluZGljYXRlcyB0aGUgRGlzcGxheU9iamVjdENvbnRhaW5lciBvYmplY3QgdGhhdCBjb250YWlucyB0aGlzIGRpc3BsYXlcclxuXHQgKiBvYmplY3QuIFVzZSB0aGUgPGNvZGU+cGFyZW50PC9jb2RlPiBwcm9wZXJ0eSB0byBzcGVjaWZ5IGEgcmVsYXRpdmUgcGF0aCB0b1xyXG5cdCAqIGRpc3BsYXkgb2JqZWN0cyB0aGF0IGFyZSBhYm92ZSB0aGUgY3VycmVudCBkaXNwbGF5IG9iamVjdCBpbiB0aGUgZGlzcGxheVxyXG5cdCAqIGxpc3QgaGllcmFyY2h5LlxyXG5cdCAqXHJcblx0ICogPHA+WW91IGNhbiB1c2UgPGNvZGU+cGFyZW50PC9jb2RlPiB0byBtb3ZlIHVwIG11bHRpcGxlIGxldmVscyBpbiB0aGVcclxuXHQgKiBkaXNwbGF5IGxpc3QgYXMgaW4gdGhlIGZvbGxvd2luZzo8L3A+XHJcblx0ICpcclxuXHQgKiBAdGhyb3dzIFNlY3VyaXR5RXJyb3IgVGhlIHBhcmVudCBkaXNwbGF5IG9iamVjdCBiZWxvbmdzIHRvIGEgc2VjdXJpdHlcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgc2FuZGJveCB0byB3aGljaCB5b3UgZG8gbm90IGhhdmUgYWNjZXNzLiBZb3UgY2FuXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIGF2b2lkIHRoaXMgc2l0dWF0aW9uIGJ5IGhhdmluZyB0aGUgcGFyZW50IG1vdmllIGNhbGxcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgdGhlIDxjb2RlPlNlY3VyaXR5LmFsbG93RG9tYWluKCk8L2NvZGU+IG1ldGhvZC5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHBhcmVudCgpOkRpc3BsYXlPYmplY3RDb250YWluZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcFBhcmVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCBwYXJ0aXRpb24oKTpQYXJ0aXRpb25cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fZXhwbGljaXRQYXJ0aXRpb247XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHBhcnRpdGlvbih2YWx1ZTpQYXJ0aXRpb24pXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX2V4cGxpY2l0UGFydGl0aW9uID09IHZhbHVlKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0aWYgKHRoaXMuX3BTY2VuZSAmJiB0aGlzLl9leHBsaWNpdFBhcnRpdGlvbilcclxuXHRcdFx0dGhpcy5fcFNjZW5lLmlVbnJlZ2lzdGVyUGFydGl0aW9uKHRoaXMuX2V4cGxpY2l0UGFydGl0aW9uKTtcclxuXHJcblx0XHR0aGlzLl9leHBsaWNpdFBhcnRpdGlvbiA9IHZhbHVlO1xyXG5cclxuXHRcdGlmICh0aGlzLl9wU2NlbmUgJiYgdmFsdWUpXHJcblx0XHRcdHRoaXMuX3BTY2VuZS5pUmVnaXN0ZXJQYXJ0aXRpb24odmFsdWUpO1xyXG5cclxuXHRcdHRoaXMuX3BVcGRhdGVJbXBsaWNpdFBhcnRpdGlvbih0aGlzLl9wUGFyZW50PyB0aGlzLl9wUGFyZW50Ll9pQXNzaWduZWRQYXJ0aXRpb24gOiBudWxsKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCBwYXJ0aXRpb25Ob2RlKCk6RW50aXR5Tm9kZVxyXG5cdHtcclxuXHRcdGlmICghdGhpcy5fcGFydGl0aW9uTm9kZSlcclxuXHRcdFx0dGhpcy5fcGFydGl0aW9uTm9kZSA9IHRoaXMucENyZWF0ZUVudGl0eVBhcnRpdGlvbk5vZGUoKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fcGFydGl0aW9uTm9kZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCBwaWNraW5nQ29sbGlkZXIoKTpJUGlja2luZ0NvbGxpZGVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BQaWNraW5nQ29sbGlkZXI7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHBpY2tpbmdDb2xsaWRlcih2YWx1ZTpJUGlja2luZ0NvbGxpZGVyKVxyXG5cdHtcclxuXHRcdHRoaXMuX3BQaWNraW5nQ29sbGlkZXIgPSB2YWx1ZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERlZmluZXMgdGhlIGxvY2FsIHBvaW50IGFyb3VuZCB3aGljaCB0aGUgb2JqZWN0IHJvdGF0ZXMuXHJcblx0ICovXHJcblx0cHVibGljIGdldCBwaXZvdCgpOlZlY3RvcjNEXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3Bpdm90O1xyXG5cdH1cclxuXHJcblxyXG5cdHB1YmxpYyBzZXQgcGl2b3QocGl2b3Q6VmVjdG9yM0QpXHJcblx0e1xyXG5cdFx0dGhpcy5fcGl2b3QgPSBwaXZvdC5jbG9uZSgpO1xyXG5cclxuXHRcdHRoaXMuaW52YWxpZGF0ZVBpdm90KCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBGb3IgYSBkaXNwbGF5IG9iamVjdCBpbiBhIGxvYWRlZCBTV0YgZmlsZSwgdGhlIDxjb2RlPnJvb3Q8L2NvZGU+IHByb3BlcnR5XHJcblx0ICogaXMgdGhlIHRvcC1tb3N0IGRpc3BsYXkgb2JqZWN0IGluIHRoZSBwb3J0aW9uIG9mIHRoZSBkaXNwbGF5IGxpc3QncyB0cmVlXHJcblx0ICogc3RydWN0dXJlIHJlcHJlc2VudGVkIGJ5IHRoYXQgU1dGIGZpbGUuIEZvciBhIEJpdG1hcCBvYmplY3QgcmVwcmVzZW50aW5nIGFcclxuXHQgKiBsb2FkZWQgaW1hZ2UgZmlsZSwgdGhlIDxjb2RlPnJvb3Q8L2NvZGU+IHByb3BlcnR5IGlzIHRoZSBCaXRtYXAgb2JqZWN0XHJcblx0ICogaXRzZWxmLiBGb3IgdGhlIGluc3RhbmNlIG9mIHRoZSBtYWluIGNsYXNzIG9mIHRoZSBmaXJzdCBTV0YgZmlsZSBsb2FkZWQsXHJcblx0ICogdGhlIDxjb2RlPnJvb3Q8L2NvZGU+IHByb3BlcnR5IGlzIHRoZSBkaXNwbGF5IG9iamVjdCBpdHNlbGYuIFRoZVxyXG5cdCAqIDxjb2RlPnJvb3Q8L2NvZGU+IHByb3BlcnR5IG9mIHRoZSBTdGFnZSBvYmplY3QgaXMgdGhlIFN0YWdlIG9iamVjdCBpdHNlbGYuXHJcblx0ICogVGhlIDxjb2RlPnJvb3Q8L2NvZGU+IHByb3BlcnR5IGlzIHNldCB0byA8Y29kZT5udWxsPC9jb2RlPiBmb3IgYW55IGRpc3BsYXlcclxuXHQgKiBvYmplY3QgdGhhdCBoYXMgbm90IGJlZW4gYWRkZWQgdG8gdGhlIGRpc3BsYXkgbGlzdCwgdW5sZXNzIGl0IGhhcyBiZWVuXHJcblx0ICogYWRkZWQgdG8gYSBkaXNwbGF5IG9iamVjdCBjb250YWluZXIgdGhhdCBpcyBvZmYgdGhlIGRpc3BsYXkgbGlzdCBidXQgdGhhdFxyXG5cdCAqIGlzIGEgY2hpbGQgb2YgdGhlIHRvcC1tb3N0IGRpc3BsYXkgb2JqZWN0IGluIGEgbG9hZGVkIFNXRiBmaWxlLlxyXG5cdCAqXHJcblx0ICogPHA+Rm9yIGV4YW1wbGUsIGlmIHlvdSBjcmVhdGUgYSBuZXcgU3ByaXRlIG9iamVjdCBieSBjYWxsaW5nIHRoZVxyXG5cdCAqIDxjb2RlPlNwcml0ZSgpPC9jb2RlPiBjb25zdHJ1Y3RvciBtZXRob2QsIGl0cyA8Y29kZT5yb290PC9jb2RlPiBwcm9wZXJ0eVxyXG5cdCAqIGlzIDxjb2RlPm51bGw8L2NvZGU+IHVudGlsIHlvdSBhZGQgaXQgdG8gdGhlIGRpc3BsYXkgbGlzdChvciB0byBhIGRpc3BsYXlcclxuXHQgKiBvYmplY3QgY29udGFpbmVyIHRoYXQgaXMgb2ZmIHRoZSBkaXNwbGF5IGxpc3QgYnV0IHRoYXQgaXMgYSBjaGlsZCBvZiB0aGVcclxuXHQgKiB0b3AtbW9zdCBkaXNwbGF5IG9iamVjdCBpbiBhIFNXRiBmaWxlKS48L3A+XHJcblx0ICpcclxuXHQgKiA8cD5Gb3IgYSBsb2FkZWQgU1dGIGZpbGUsIGV2ZW4gdGhvdWdoIHRoZSBMb2FkZXIgb2JqZWN0IHVzZWQgdG8gbG9hZCB0aGVcclxuXHQgKiBmaWxlIG1heSBub3QgYmUgb24gdGhlIGRpc3BsYXkgbGlzdCwgdGhlIHRvcC1tb3N0IGRpc3BsYXkgb2JqZWN0IGluIHRoZVxyXG5cdCAqIFNXRiBmaWxlIGhhcyBpdHMgPGNvZGU+cm9vdDwvY29kZT4gcHJvcGVydHkgc2V0IHRvIGl0c2VsZi4gVGhlIExvYWRlclxyXG5cdCAqIG9iamVjdCBkb2VzIG5vdCBoYXZlIGl0cyA8Y29kZT5yb290PC9jb2RlPiBwcm9wZXJ0eSBzZXQgdW50aWwgaXQgaXMgYWRkZWRcclxuXHQgKiBhcyBhIGNoaWxkIG9mIGEgZGlzcGxheSBvYmplY3QgZm9yIHdoaWNoIHRoZSA8Y29kZT5yb290PC9jb2RlPiBwcm9wZXJ0eSBpc1xyXG5cdCAqIHNldC48L3A+XHJcblx0ICovXHJcblx0cHVibGljIGdldCByb290KCk6RGlzcGxheU9iamVjdENvbnRhaW5lclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9yb290O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSW5kaWNhdGVzIHRoZSByb3RhdGlvbiBvZiB0aGUgRGlzcGxheU9iamVjdCBpbnN0YW5jZSwgaW4gZGVncmVlcywgZnJvbSBpdHNcclxuXHQgKiBvcmlnaW5hbCBvcmllbnRhdGlvbi4gVmFsdWVzIGZyb20gMCB0byAxODAgcmVwcmVzZW50IGNsb2Nrd2lzZSByb3RhdGlvbjtcclxuXHQgKiB2YWx1ZXMgZnJvbSAwIHRvIC0xODAgcmVwcmVzZW50IGNvdW50ZXJjbG9ja3dpc2Ugcm90YXRpb24uIFZhbHVlcyBvdXRzaWRlXHJcblx0ICogdGhpcyByYW5nZSBhcmUgYWRkZWQgdG8gb3Igc3VidHJhY3RlZCBmcm9tIDM2MCB0byBvYnRhaW4gYSB2YWx1ZSB3aXRoaW5cclxuXHQgKiB0aGUgcmFuZ2UuIEZvciBleGFtcGxlLCB0aGUgc3RhdGVtZW50IDxjb2RlPm15X3ZpZGVvLnJvdGF0aW9uID0gNDUwPC9jb2RlPlxyXG5cdCAqIGlzIHRoZSBzYW1lIGFzIDxjb2RlPiBteV92aWRlby5yb3RhdGlvbiA9IDkwPC9jb2RlPi5cclxuXHQgKi9cclxuXHRwdWJsaWMgcm90YXRpb246bnVtYmVyOyAvL1RPRE9cclxuXHJcblx0LyoqXHJcblx0ICogSW5kaWNhdGVzIHRoZSB4LWF4aXMgcm90YXRpb24gb2YgdGhlIERpc3BsYXlPYmplY3QgaW5zdGFuY2UsIGluIGRlZ3JlZXMsXHJcblx0ICogZnJvbSBpdHMgb3JpZ2luYWwgb3JpZW50YXRpb24gcmVsYXRpdmUgdG8gdGhlIDNEIHBhcmVudCBjb250YWluZXIuIFZhbHVlc1xyXG5cdCAqIGZyb20gMCB0byAxODAgcmVwcmVzZW50IGNsb2Nrd2lzZSByb3RhdGlvbjsgdmFsdWVzIGZyb20gMCB0byAtMTgwXHJcblx0ICogcmVwcmVzZW50IGNvdW50ZXJjbG9ja3dpc2Ugcm90YXRpb24uIFZhbHVlcyBvdXRzaWRlIHRoaXMgcmFuZ2UgYXJlIGFkZGVkXHJcblx0ICogdG8gb3Igc3VidHJhY3RlZCBmcm9tIDM2MCB0byBvYnRhaW4gYSB2YWx1ZSB3aXRoaW4gdGhlIHJhbmdlLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgcm90YXRpb25YKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3JvdGF0aW9uWCpNYXRoQ29uc3RzLlJBRElBTlNfVE9fREVHUkVFUztcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgcm90YXRpb25YKHZhbDpudW1iZXIpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMucm90YXRpb25YID09IHZhbClcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX3JvdGF0aW9uWCA9IHZhbCpNYXRoQ29uc3RzLkRFR1JFRVNfVE9fUkFESUFOUztcclxuXHJcblx0XHR0aGlzLmludmFsaWRhdGVSb3RhdGlvbigpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSW5kaWNhdGVzIHRoZSB5LWF4aXMgcm90YXRpb24gb2YgdGhlIERpc3BsYXlPYmplY3QgaW5zdGFuY2UsIGluIGRlZ3JlZXMsXHJcblx0ICogZnJvbSBpdHMgb3JpZ2luYWwgb3JpZW50YXRpb24gcmVsYXRpdmUgdG8gdGhlIDNEIHBhcmVudCBjb250YWluZXIuIFZhbHVlc1xyXG5cdCAqIGZyb20gMCB0byAxODAgcmVwcmVzZW50IGNsb2Nrd2lzZSByb3RhdGlvbjsgdmFsdWVzIGZyb20gMCB0byAtMTgwXHJcblx0ICogcmVwcmVzZW50IGNvdW50ZXJjbG9ja3dpc2Ugcm90YXRpb24uIFZhbHVlcyBvdXRzaWRlIHRoaXMgcmFuZ2UgYXJlIGFkZGVkXHJcblx0ICogdG8gb3Igc3VidHJhY3RlZCBmcm9tIDM2MCB0byBvYnRhaW4gYSB2YWx1ZSB3aXRoaW4gdGhlIHJhbmdlLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgcm90YXRpb25ZKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3JvdGF0aW9uWSpNYXRoQ29uc3RzLlJBRElBTlNfVE9fREVHUkVFUztcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgcm90YXRpb25ZKHZhbDpudW1iZXIpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMucm90YXRpb25ZID09IHZhbClcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX3JvdGF0aW9uWSA9IHZhbCpNYXRoQ29uc3RzLkRFR1JFRVNfVE9fUkFESUFOUztcclxuXHJcblx0XHR0aGlzLmludmFsaWRhdGVSb3RhdGlvbigpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSW5kaWNhdGVzIHRoZSB6LWF4aXMgcm90YXRpb24gb2YgdGhlIERpc3BsYXlPYmplY3QgaW5zdGFuY2UsIGluIGRlZ3JlZXMsXHJcblx0ICogZnJvbSBpdHMgb3JpZ2luYWwgb3JpZW50YXRpb24gcmVsYXRpdmUgdG8gdGhlIDNEIHBhcmVudCBjb250YWluZXIuIFZhbHVlc1xyXG5cdCAqIGZyb20gMCB0byAxODAgcmVwcmVzZW50IGNsb2Nrd2lzZSByb3RhdGlvbjsgdmFsdWVzIGZyb20gMCB0byAtMTgwXHJcblx0ICogcmVwcmVzZW50IGNvdW50ZXJjbG9ja3dpc2Ugcm90YXRpb24uIFZhbHVlcyBvdXRzaWRlIHRoaXMgcmFuZ2UgYXJlIGFkZGVkXHJcblx0ICogdG8gb3Igc3VidHJhY3RlZCBmcm9tIDM2MCB0byBvYnRhaW4gYSB2YWx1ZSB3aXRoaW4gdGhlIHJhbmdlLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgcm90YXRpb25aKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3JvdGF0aW9uWipNYXRoQ29uc3RzLlJBRElBTlNfVE9fREVHUkVFUztcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgcm90YXRpb25aKHZhbDpudW1iZXIpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMucm90YXRpb25aID09IHZhbClcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX3JvdGF0aW9uWiA9IHZhbCpNYXRoQ29uc3RzLkRFR1JFRVNfVE9fUkFESUFOUztcclxuXHJcblx0XHR0aGlzLmludmFsaWRhdGVSb3RhdGlvbigpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGN1cnJlbnQgc2NhbGluZyBncmlkIHRoYXQgaXMgaW4gZWZmZWN0LiBJZiBzZXQgdG8gPGNvZGU+bnVsbDwvY29kZT4sXHJcblx0ICogdGhlIGVudGlyZSBkaXNwbGF5IG9iamVjdCBpcyBzY2FsZWQgbm9ybWFsbHkgd2hlbiBhbnkgc2NhbGUgdHJhbnNmb3JtYXRpb25cclxuXHQgKiBpcyBhcHBsaWVkLlxyXG5cdCAqXHJcblx0ICogPHA+V2hlbiB5b3UgZGVmaW5lIHRoZSA8Y29kZT5zY2FsZTlHcmlkPC9jb2RlPiBwcm9wZXJ0eSwgdGhlIGRpc3BsYXlcclxuXHQgKiBvYmplY3QgaXMgZGl2aWRlZCBpbnRvIGEgZ3JpZCB3aXRoIG5pbmUgcmVnaW9ucyBiYXNlZCBvbiB0aGVcclxuXHQgKiA8Y29kZT5zY2FsZTlHcmlkPC9jb2RlPiByZWN0YW5nbGUsIHdoaWNoIGRlZmluZXMgdGhlIGNlbnRlciByZWdpb24gb2YgdGhlXHJcblx0ICogZ3JpZC4gVGhlIGVpZ2h0IG90aGVyIHJlZ2lvbnMgb2YgdGhlIGdyaWQgYXJlIHRoZSBmb2xsb3dpbmcgYXJlYXM6IDwvcD5cclxuXHQgKlxyXG5cdCAqIDx1bD5cclxuXHQgKiAgIDxsaT5UaGUgdXBwZXItbGVmdCBjb3JuZXIgb3V0c2lkZSBvZiB0aGUgcmVjdGFuZ2xlPC9saT5cclxuXHQgKiAgIDxsaT5UaGUgYXJlYSBhYm92ZSB0aGUgcmVjdGFuZ2xlIDwvbGk+XHJcblx0ICogICA8bGk+VGhlIHVwcGVyLXJpZ2h0IGNvcm5lciBvdXRzaWRlIG9mIHRoZSByZWN0YW5nbGU8L2xpPlxyXG5cdCAqICAgPGxpPlRoZSBhcmVhIHRvIHRoZSBsZWZ0IG9mIHRoZSByZWN0YW5nbGU8L2xpPlxyXG5cdCAqICAgPGxpPlRoZSBhcmVhIHRvIHRoZSByaWdodCBvZiB0aGUgcmVjdGFuZ2xlPC9saT5cclxuXHQgKiAgIDxsaT5UaGUgbG93ZXItbGVmdCBjb3JuZXIgb3V0c2lkZSBvZiB0aGUgcmVjdGFuZ2xlPC9saT5cclxuXHQgKiAgIDxsaT5UaGUgYXJlYSBiZWxvdyB0aGUgcmVjdGFuZ2xlPC9saT5cclxuXHQgKiAgIDxsaT5UaGUgbG93ZXItcmlnaHQgY29ybmVyIG91dHNpZGUgb2YgdGhlIHJlY3RhbmdsZTwvbGk+XHJcblx0ICogPC91bD5cclxuXHQgKlxyXG5cdCAqIDxwPllvdSBjYW4gdGhpbmsgb2YgdGhlIGVpZ2h0IHJlZ2lvbnMgb3V0c2lkZSBvZiB0aGUgY2VudGVyKGRlZmluZWQgYnlcclxuXHQgKiB0aGUgcmVjdGFuZ2xlKSBhcyBiZWluZyBsaWtlIGEgcGljdHVyZSBmcmFtZSB0aGF0IGhhcyBzcGVjaWFsIHJ1bGVzXHJcblx0ICogYXBwbGllZCB0byBpdCB3aGVuIHNjYWxlZC48L3A+XHJcblx0ICpcclxuXHQgKiA8cD5XaGVuIHRoZSA8Y29kZT5zY2FsZTlHcmlkPC9jb2RlPiBwcm9wZXJ0eSBpcyBzZXQgYW5kIGEgZGlzcGxheSBvYmplY3RcclxuXHQgKiBpcyBzY2FsZWQsIGFsbCB0ZXh0IGFuZCBncmFkaWVudHMgYXJlIHNjYWxlZCBub3JtYWxseTsgaG93ZXZlciwgZm9yIG90aGVyXHJcblx0ICogdHlwZXMgb2Ygb2JqZWN0cyB0aGUgZm9sbG93aW5nIHJ1bGVzIGFwcGx5OjwvcD5cclxuXHQgKlxyXG5cdCAqIDx1bD5cclxuXHQgKiAgIDxsaT5Db250ZW50IGluIHRoZSBjZW50ZXIgcmVnaW9uIGlzIHNjYWxlZCBub3JtYWxseS4gPC9saT5cclxuXHQgKiAgIDxsaT5Db250ZW50IGluIHRoZSBjb3JuZXJzIGlzIG5vdCBzY2FsZWQuIDwvbGk+XHJcblx0ICogICA8bGk+Q29udGVudCBpbiB0aGUgdG9wIGFuZCBib3R0b20gcmVnaW9ucyBpcyBzY2FsZWQgaG9yaXpvbnRhbGx5IG9ubHkuXHJcblx0ICogQ29udGVudCBpbiB0aGUgbGVmdCBhbmQgcmlnaHQgcmVnaW9ucyBpcyBzY2FsZWQgdmVydGljYWxseSBvbmx5LjwvbGk+XHJcblx0ICogICA8bGk+QWxsIGZpbGxzKGluY2x1ZGluZyBiaXRtYXBzLCB2aWRlbywgYW5kIGdyYWRpZW50cykgYXJlIHN0cmV0Y2hlZCB0b1xyXG5cdCAqIGZpdCB0aGVpciBzaGFwZXMuPC9saT5cclxuXHQgKiA8L3VsPlxyXG5cdCAqXHJcblx0ICogPHA+SWYgYSBkaXNwbGF5IG9iamVjdCBpcyByb3RhdGVkLCBhbGwgc3Vic2VxdWVudCBzY2FsaW5nIGlzIG5vcm1hbChhbmRcclxuXHQgKiB0aGUgPGNvZGU+c2NhbGU5R3JpZDwvY29kZT4gcHJvcGVydHkgaXMgaWdub3JlZCkuPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+Rm9yIGV4YW1wbGUsIGNvbnNpZGVyIHRoZSBmb2xsb3dpbmcgZGlzcGxheSBvYmplY3QgYW5kIGEgcmVjdGFuZ2xlIHRoYXRcclxuXHQgKiBpcyBhcHBsaWVkIGFzIHRoZSBkaXNwbGF5IG9iamVjdCdzIDxjb2RlPnNjYWxlOUdyaWQ8L2NvZGU+OjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPkEgY29tbW9uIHVzZSBmb3Igc2V0dGluZyA8Y29kZT5zY2FsZTlHcmlkPC9jb2RlPiBpcyB0byBzZXQgdXAgYSBkaXNwbGF5XHJcblx0ICogb2JqZWN0IHRvIGJlIHVzZWQgYXMgYSBjb21wb25lbnQsIGluIHdoaWNoIGVkZ2UgcmVnaW9ucyByZXRhaW4gdGhlIHNhbWVcclxuXHQgKiB3aWR0aCB3aGVuIHRoZSBjb21wb25lbnQgaXMgc2NhbGVkLjwvcD5cclxuXHQgKlxyXG5cdCAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciBJZiB5b3UgcGFzcyBhbiBpbnZhbGlkIGFyZ3VtZW50IHRvIHRoZSBtZXRob2QuXHJcblx0ICovXHJcblx0cHVibGljIHNjYWxlOUdyaWQ6UmVjdGFuZ2xlO1xyXG5cclxuXHQvKipcclxuXHQgKiBJbmRpY2F0ZXMgdGhlIGhvcml6b250YWwgc2NhbGUocGVyY2VudGFnZSkgb2YgdGhlIG9iamVjdCBhcyBhcHBsaWVkIGZyb21cclxuXHQgKiB0aGUgcmVnaXN0cmF0aW9uIHBvaW50LiBUaGUgZGVmYXVsdCByZWdpc3RyYXRpb24gcG9pbnQgaXMoMCwwKS4gMS4wXHJcblx0ICogZXF1YWxzIDEwMCUgc2NhbGUuXHJcblx0ICpcclxuXHQgKiA8cD5TY2FsaW5nIHRoZSBsb2NhbCBjb29yZGluYXRlIHN5c3RlbSBjaGFuZ2VzIHRoZSA8Y29kZT54PC9jb2RlPiBhbmRcclxuXHQgKiA8Y29kZT55PC9jb2RlPiBwcm9wZXJ0eSB2YWx1ZXMsIHdoaWNoIGFyZSBkZWZpbmVkIGluIHdob2xlIHBpeGVscy4gPC9wPlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgc2NhbGVYKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BTY2FsZVg7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHNjYWxlWCh2YWw6bnVtYmVyKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9wU2NhbGVYID09IHZhbClcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX3BTY2FsZVggPSB2YWw7XHJcblxyXG5cdFx0dGhpcy5pbnZhbGlkYXRlU2NhbGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluZGljYXRlcyB0aGUgdmVydGljYWwgc2NhbGUocGVyY2VudGFnZSkgb2YgYW4gb2JqZWN0IGFzIGFwcGxpZWQgZnJvbSB0aGVcclxuXHQgKiByZWdpc3RyYXRpb24gcG9pbnQgb2YgdGhlIG9iamVjdC4gVGhlIGRlZmF1bHQgcmVnaXN0cmF0aW9uIHBvaW50IGlzKDAsMCkuXHJcblx0ICogMS4wIGlzIDEwMCUgc2NhbGUuXHJcblx0ICpcclxuXHQgKiA8cD5TY2FsaW5nIHRoZSBsb2NhbCBjb29yZGluYXRlIHN5c3RlbSBjaGFuZ2VzIHRoZSA8Y29kZT54PC9jb2RlPiBhbmRcclxuXHQgKiA8Y29kZT55PC9jb2RlPiBwcm9wZXJ0eSB2YWx1ZXMsIHdoaWNoIGFyZSBkZWZpbmVkIGluIHdob2xlIHBpeGVscy4gPC9wPlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgc2NhbGVZKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BTY2FsZVk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHNjYWxlWSh2YWw6bnVtYmVyKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9wU2NhbGVZID09IHZhbClcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX3BTY2FsZVkgPSB2YWw7XHJcblxyXG5cdFx0dGhpcy5pbnZhbGlkYXRlU2NhbGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluZGljYXRlcyB0aGUgZGVwdGggc2NhbGUocGVyY2VudGFnZSkgb2YgYW4gb2JqZWN0IGFzIGFwcGxpZWQgZnJvbSB0aGVcclxuXHQgKiByZWdpc3RyYXRpb24gcG9pbnQgb2YgdGhlIG9iamVjdC4gVGhlIGRlZmF1bHQgcmVnaXN0cmF0aW9uIHBvaW50IGlzKDAsMCkuXHJcblx0ICogMS4wIGlzIDEwMCUgc2NhbGUuXHJcblx0ICpcclxuXHQgKiA8cD5TY2FsaW5nIHRoZSBsb2NhbCBjb29yZGluYXRlIHN5c3RlbSBjaGFuZ2VzIHRoZSA8Y29kZT54PC9jb2RlPixcclxuXHQgKiA8Y29kZT55PC9jb2RlPiBhbmQgPGNvZGU+ejwvY29kZT4gcHJvcGVydHkgdmFsdWVzLCB3aGljaCBhcmUgZGVmaW5lZCBpblxyXG5cdCAqIHdob2xlIHBpeGVscy4gPC9wPlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgc2NhbGVaKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BTY2FsZVo7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHNjYWxlWih2YWw6bnVtYmVyKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9wU2NhbGVaID09IHZhbClcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX3BTY2FsZVogPSB2YWw7XHJcblxyXG5cdFx0dGhpcy5pbnZhbGlkYXRlU2NhbGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCBzY2VuZSgpOlNjZW5lXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BTY2VuZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCBzY2VuZVBvc2l0aW9uKCk6VmVjdG9yM0RcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fc2NlbmVQb3NpdGlvbkRpcnR5KSB7XHJcblx0XHRcdGlmICghdGhpcy5fcGl2b3RaZXJvICYmIHRoaXMuYWxpZ25tZW50TW9kZSA9PSBBbGlnbm1lbnRNb2RlLlBJVk9UX1BPSU5UKSB7XHJcblx0XHRcdFx0dmFyIHBpdm90U2NhbGU6VmVjdG9yM0QgPSBuZXcgVmVjdG9yM0QodGhpcy5fcGl2b3QueC90aGlzLl9wU2NhbGVYLCB0aGlzLl9waXZvdC55L3RoaXMuX3BTY2FsZVksIHRoaXMuX3Bpdm90LnovdGhpcy5fcFNjYWxlWilcclxuXHRcdFx0XHRcdHRoaXMuX3NjZW5lUG9zaXRpb24gPSB0aGlzLnNjZW5lVHJhbnNmb3JtLnRyYW5zZm9ybVZlY3RvcihwaXZvdFNjYWxlKTtcclxuXHRcdFx0XHQvL3RoaXMuX3NjZW5lUG9zaXRpb24uZGVjcmVtZW50QnkobmV3IFZlY3RvcjNEKHRoaXMuX3Bpdm90LngqdGhpcy5fcFNjYWxlWCwgdGhpcy5fcGl2b3QueSp0aGlzLl9wU2NhbGVZLCB0aGlzLl9waXZvdC56KnRoaXMuX3BTY2FsZVopKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLnNjZW5lVHJhbnNmb3JtLmNvcHlDb2x1bW5UbygzLCB0aGlzLl9zY2VuZVBvc2l0aW9uKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5fc2NlbmVQb3NpdGlvbkRpcnR5ID0gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcy5fc2NlbmVQb3NpdGlvbjtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXQgc2NlbmVUcmFuc2Zvcm0oKTpNYXRyaXgzRFxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9wU2NlbmVUcmFuc2Zvcm1EaXJ0eSlcclxuXHRcdFx0dGhpcy5wVXBkYXRlU2NlbmVUcmFuc2Zvcm0oKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fcFNjZW5lVHJhbnNmb3JtO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIHNjcm9sbCByZWN0YW5nbGUgYm91bmRzIG9mIHRoZSBkaXNwbGF5IG9iamVjdC4gVGhlIGRpc3BsYXkgb2JqZWN0IGlzXHJcblx0ICogY3JvcHBlZCB0byB0aGUgc2l6ZSBkZWZpbmVkIGJ5IHRoZSByZWN0YW5nbGUsIGFuZCBpdCBzY3JvbGxzIHdpdGhpbiB0aGVcclxuXHQgKiByZWN0YW5nbGUgd2hlbiB5b3UgY2hhbmdlIHRoZSA8Y29kZT54PC9jb2RlPiBhbmQgPGNvZGU+eTwvY29kZT4gcHJvcGVydGllc1xyXG5cdCAqIG9mIHRoZSA8Y29kZT5zY3JvbGxSZWN0PC9jb2RlPiBvYmplY3QuXHJcblx0ICpcclxuXHQgKiA8cD5UaGUgcHJvcGVydGllcyBvZiB0aGUgPGNvZGU+c2Nyb2xsUmVjdDwvY29kZT4gUmVjdGFuZ2xlIG9iamVjdCB1c2UgdGhlXHJcblx0ICogZGlzcGxheSBvYmplY3QncyBjb29yZGluYXRlIHNwYWNlIGFuZCBhcmUgc2NhbGVkIGp1c3QgbGlrZSB0aGUgb3ZlcmFsbFxyXG5cdCAqIGRpc3BsYXkgb2JqZWN0LiBUaGUgY29ybmVyIGJvdW5kcyBvZiB0aGUgY3JvcHBlZCB3aW5kb3cgb24gdGhlIHNjcm9sbGluZ1xyXG5cdCAqIGRpc3BsYXkgb2JqZWN0IGFyZSB0aGUgb3JpZ2luIG9mIHRoZSBkaXNwbGF5IG9iamVjdCgwLDApIGFuZCB0aGUgcG9pbnRcclxuXHQgKiBkZWZpbmVkIGJ5IHRoZSB3aWR0aCBhbmQgaGVpZ2h0IG9mIHRoZSByZWN0YW5nbGUuIFRoZXkgYXJlIG5vdCBjZW50ZXJlZFxyXG5cdCAqIGFyb3VuZCB0aGUgb3JpZ2luLCBidXQgdXNlIHRoZSBvcmlnaW4gdG8gZGVmaW5lIHRoZSB1cHBlci1sZWZ0IGNvcm5lciBvZlxyXG5cdCAqIHRoZSBhcmVhLiBBIHNjcm9sbGVkIGRpc3BsYXkgb2JqZWN0IGFsd2F5cyBzY3JvbGxzIGluIHdob2xlIHBpeGVsXHJcblx0ICogaW5jcmVtZW50cy4gPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+WW91IGNhbiBzY3JvbGwgYW4gb2JqZWN0IGxlZnQgYW5kIHJpZ2h0IGJ5IHNldHRpbmcgdGhlIDxjb2RlPng8L2NvZGU+XHJcblx0ICogcHJvcGVydHkgb2YgdGhlIDxjb2RlPnNjcm9sbFJlY3Q8L2NvZGU+IFJlY3RhbmdsZSBvYmplY3QuIFlvdSBjYW4gc2Nyb2xsXHJcblx0ICogYW4gb2JqZWN0IHVwIGFuZCBkb3duIGJ5IHNldHRpbmcgdGhlIDxjb2RlPnk8L2NvZGU+IHByb3BlcnR5IG9mIHRoZVxyXG5cdCAqIDxjb2RlPnNjcm9sbFJlY3Q8L2NvZGU+IFJlY3RhbmdsZSBvYmplY3QuIElmIHRoZSBkaXNwbGF5IG9iamVjdCBpcyByb3RhdGVkXHJcblx0ICogOTDCsCBhbmQgeW91IHNjcm9sbCBpdCBsZWZ0IGFuZCByaWdodCwgdGhlIGRpc3BsYXkgb2JqZWN0IGFjdHVhbGx5IHNjcm9sbHNcclxuXHQgKiB1cCBhbmQgZG93bi48L3A+XHJcblx0ICovXHJcblx0cHVibGljIHNjcm9sbFJlY3Q6UmVjdGFuZ2xlO1xyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgc2hhZGVyUGlja2luZ0RldGFpbHMoKTpib29sZWFuXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3NoYWRlclBpY2tpbmdEZXRhaWxzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGJvdW5kc1Zpc2libGUoKTpib29sZWFuXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2JvdW5kc1Zpc2libGU7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IGJvdW5kc1Zpc2libGUodmFsdWU6Ym9vbGVhbilcclxuXHR7XHJcblx0XHRpZiAodmFsdWUgPT0gdGhpcy5fYm91bmRzVmlzaWJsZSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX2JvdW5kc1Zpc2libGUgPSB2YWx1ZTtcclxuXHJcblx0XHR0aGlzLl9wYXJ0aXRpb25Ob2RlLmJvdW5kc1Zpc2libGUgPSB2YWx1ZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFuIG9iamVjdCB3aXRoIHByb3BlcnRpZXMgcGVydGFpbmluZyB0byBhIGRpc3BsYXkgb2JqZWN0J3MgbWF0cml4LCBjb2xvclxyXG5cdCAqIHRyYW5zZm9ybSwgYW5kIHBpeGVsIGJvdW5kcy4gVGhlIHNwZWNpZmljIHByb3BlcnRpZXMgIC0gIG1hdHJpeCxcclxuXHQgKiBjb2xvclRyYW5zZm9ybSwgYW5kIHRocmVlIHJlYWQtb25seSBwcm9wZXJ0aWVzXHJcblx0ICogKDxjb2RlPmNvbmNhdGVuYXRlZE1hdHJpeDwvY29kZT4sIDxjb2RlPmNvbmNhdGVuYXRlZENvbG9yVHJhbnNmb3JtPC9jb2RlPixcclxuXHQgKiBhbmQgPGNvZGU+cGl4ZWxCb3VuZHM8L2NvZGU+KSAgLSAgYXJlIGRlc2NyaWJlZCBpbiB0aGUgZW50cnkgZm9yIHRoZVxyXG5cdCAqIFRyYW5zZm9ybSBjbGFzcy5cclxuXHQgKlxyXG5cdCAqIDxwPkVhY2ggb2YgdGhlIHRyYW5zZm9ybSBvYmplY3QncyBwcm9wZXJ0aWVzIGlzIGl0c2VsZiBhbiBvYmplY3QuIFRoaXNcclxuXHQgKiBjb25jZXB0IGlzIGltcG9ydGFudCBiZWNhdXNlIHRoZSBvbmx5IHdheSB0byBzZXQgbmV3IHZhbHVlcyBmb3IgdGhlIG1hdHJpeFxyXG5cdCAqIG9yIGNvbG9yVHJhbnNmb3JtIG9iamVjdHMgaXMgdG8gY3JlYXRlIGEgbmV3IG9iamVjdCBhbmQgY29weSB0aGF0IG9iamVjdFxyXG5cdCAqIGludG8gdGhlIHRyYW5zZm9ybS5tYXRyaXggb3IgdHJhbnNmb3JtLmNvbG9yVHJhbnNmb3JtIHByb3BlcnR5LjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPkZvciBleGFtcGxlLCB0byBpbmNyZWFzZSB0aGUgPGNvZGU+dHg8L2NvZGU+IHZhbHVlIG9mIGEgZGlzcGxheVxyXG5cdCAqIG9iamVjdCdzIG1hdHJpeCwgeW91IG11c3QgbWFrZSBhIGNvcHkgb2YgdGhlIGVudGlyZSBtYXRyaXggb2JqZWN0LCB0aGVuXHJcblx0ICogY29weSB0aGUgbmV3IG9iamVjdCBpbnRvIHRoZSBtYXRyaXggcHJvcGVydHkgb2YgdGhlIHRyYW5zZm9ybSBvYmplY3Q6PC9wPlxyXG5cdCAqIDxwcmUgeG1sOnNwYWNlPVwicHJlc2VydmVcIj48Y29kZT4gcHVibGljIG15TWF0cml4Ok1hdHJpeCA9XHJcblx0ICogbXlEaXNwbGF5T2JqZWN0LnRyYW5zZm9ybS5tYXRyaXg7IG15TWF0cml4LnR4ICs9IDEwO1xyXG5cdCAqIG15RGlzcGxheU9iamVjdC50cmFuc2Zvcm0ubWF0cml4ID0gbXlNYXRyaXg7IDwvY29kZT48L3ByZT5cclxuXHQgKlxyXG5cdCAqIDxwPllvdSBjYW5ub3QgZGlyZWN0bHkgc2V0IHRoZSA8Y29kZT50eDwvY29kZT4gcHJvcGVydHkuIFRoZSBmb2xsb3dpbmdcclxuXHQgKiBjb2RlIGhhcyBubyBlZmZlY3Qgb24gPGNvZGU+bXlEaXNwbGF5T2JqZWN0PC9jb2RlPjogPC9wPlxyXG5cdCAqIDxwcmUgeG1sOnNwYWNlPVwicHJlc2VydmVcIj48Y29kZT4gbXlEaXNwbGF5T2JqZWN0LnRyYW5zZm9ybS5tYXRyaXgudHggKz1cclxuXHQgKiAxMDsgPC9jb2RlPjwvcHJlPlxyXG5cdCAqXHJcblx0ICogPHA+WW91IGNhbiBhbHNvIGNvcHkgYW4gZW50aXJlIHRyYW5zZm9ybSBvYmplY3QgYW5kIGFzc2lnbiBpdCB0byBhbm90aGVyXHJcblx0ICogZGlzcGxheSBvYmplY3QncyB0cmFuc2Zvcm0gcHJvcGVydHkuIEZvciBleGFtcGxlLCB0aGUgZm9sbG93aW5nIGNvZGVcclxuXHQgKiBjb3BpZXMgdGhlIGVudGlyZSB0cmFuc2Zvcm0gb2JqZWN0IGZyb20gPGNvZGU+bXlPbGREaXNwbGF5T2JqPC9jb2RlPiB0b1xyXG5cdCAqIDxjb2RlPm15TmV3RGlzcGxheU9iajwvY29kZT46PC9wPlxyXG5cdCAqIDxjb2RlPm15TmV3RGlzcGxheU9iai50cmFuc2Zvcm0gPSBteU9sZERpc3BsYXlPYmoudHJhbnNmb3JtOzwvY29kZT5cclxuXHQgKlxyXG5cdCAqIDxwPlRoZSByZXN1bHRpbmcgZGlzcGxheSBvYmplY3QsIDxjb2RlPm15TmV3RGlzcGxheU9iajwvY29kZT4sIG5vdyBoYXMgdGhlXHJcblx0ICogc2FtZSB2YWx1ZXMgZm9yIGl0cyBtYXRyaXgsIGNvbG9yIHRyYW5zZm9ybSwgYW5kIHBpeGVsIGJvdW5kcyBhcyB0aGUgb2xkXHJcblx0ICogZGlzcGxheSBvYmplY3QsIDxjb2RlPm15T2xkRGlzcGxheU9iajwvY29kZT4uPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+Tm90ZSB0aGF0IEFJUiBmb3IgVFYgZGV2aWNlcyB1c2UgaGFyZHdhcmUgYWNjZWxlcmF0aW9uLCBpZiBpdCBpc1xyXG5cdCAqIGF2YWlsYWJsZSwgZm9yIGNvbG9yIHRyYW5zZm9ybXMuPC9wPlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgdHJhbnNmb3JtKCk6VHJhbnNmb3JtXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3RyYW5zZm9ybTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFdoZXRoZXIgb3Igbm90IHRoZSBkaXNwbGF5IG9iamVjdCBpcyB2aXNpYmxlLiBEaXNwbGF5IG9iamVjdHMgdGhhdCBhcmUgbm90XHJcblx0ICogdmlzaWJsZSBhcmUgZGlzYWJsZWQuIEZvciBleGFtcGxlLCBpZiA8Y29kZT52aXNpYmxlPWZhbHNlPC9jb2RlPiBmb3IgYW5cclxuXHQgKiBJbnRlcmFjdGl2ZU9iamVjdCBpbnN0YW5jZSwgaXQgY2Fubm90IGJlIGNsaWNrZWQuXHJcblx0ICovXHJcblx0cHVibGljIGdldCB2aXNpYmxlKCk6Ym9vbGVhblxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9leHBsaWNpdFZpc2liaWxpdHk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHZpc2libGUodmFsdWU6Ym9vbGVhbilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fZXhwbGljaXRWaXNpYmlsaXR5ID09IHZhbHVlKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fZXhwbGljaXRWaXNpYmlsaXR5ID0gdmFsdWU7XHJcblxyXG5cdFx0dGhpcy5fcFVwZGF0ZUltcGxpY2l0VmlzaWJpbGl0eSh0aGlzLl9wUGFyZW50PyB0aGlzLl9wUGFyZW50Ll9pSXNWaXNpYmxlKCkgOiB0cnVlKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluZGljYXRlcyB0aGUgd2lkdGggb2YgdGhlIGRpc3BsYXkgb2JqZWN0LCBpbiBwaXhlbHMuIFRoZSB3aWR0aCBpc1xyXG5cdCAqIGNhbGN1bGF0ZWQgYmFzZWQgb24gdGhlIGJvdW5kcyBvZiB0aGUgY29udGVudCBvZiB0aGUgZGlzcGxheSBvYmplY3QuIFdoZW5cclxuXHQgKiB5b3Ugc2V0IHRoZSA8Y29kZT53aWR0aDwvY29kZT4gcHJvcGVydHksIHRoZSA8Y29kZT5zY2FsZVg8L2NvZGU+IHByb3BlcnR5XHJcblx0ICogaXMgYWRqdXN0ZWQgYWNjb3JkaW5nbHksIGFzIHNob3duIGluIHRoZSBmb2xsb3dpbmcgY29kZTpcclxuXHQgKlxyXG5cdCAqIDxwPkV4Y2VwdCBmb3IgVGV4dEZpZWxkIGFuZCBWaWRlbyBvYmplY3RzLCBhIGRpc3BsYXkgb2JqZWN0IHdpdGggbm9cclxuXHQgKiBjb250ZW50KHN1Y2ggYXMgYW4gZW1wdHkgc3ByaXRlKSBoYXMgYSB3aWR0aCBvZiAwLCBldmVuIGlmIHlvdSB0cnkgdG8gc2V0XHJcblx0ICogPGNvZGU+d2lkdGg8L2NvZGU+IHRvIGEgZGlmZmVyZW50IHZhbHVlLjwvcD5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHdpZHRoKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX3BCb3VuZHNJbnZhbGlkKVxyXG5cdFx0XHR0aGlzLnBVcGRhdGVCb3VuZHMoKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fd2lkdGg7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHdpZHRoKHZhbDpudW1iZXIpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX3dpZHRoID09IHZhbClcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX3dpZHRoID09IHZhbDtcclxuXHJcblx0XHR0aGlzLl9wU2NhbGVYID0gdmFsL3RoaXMuYm91bmRzLmFhYmIud2lkdGg7XHJcblxyXG5cdFx0dGhpcy5pbnZhbGlkYXRlU2NhbGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCB3b3JsZEJvdW5kcygpOkJvdW5kaW5nVm9sdW1lQmFzZVxyXG5cdHtcclxuXHRcdC8vIFNpbmNlIHRoaXMgZ2V0dGVyIGlzIGludm9rZWQgZXZlcnkgaXRlcmF0aW9uIG9mIHRoZSByZW5kZXIgbG9vcCwgYW5kXHJcblx0XHQvLyB0aGUgcHJlZmFiIGNvbnN0cnVjdCBjb3VsZCBhZmZlY3QgdGhlIGJvdW5kcyBvZiB0aGUgZW50aXR5LCB0aGUgcHJlZmFiIGlzXHJcblx0XHQvLyB2YWxpZGF0ZWQgaGVyZSB0byBnaXZlIGl0IGEgY2hhbmNlIHRvIHJlYnVpbGQuXHJcblx0XHRpZiAodGhpcy5faVNvdXJjZVByZWZhYilcclxuXHRcdFx0dGhpcy5faVNvdXJjZVByZWZhYi5faVZhbGlkYXRlKCk7XHJcblxyXG5cdFx0aWYgKHRoaXMuX3dvcmxkQm91bmRzSW52YWxpZCkge1xyXG5cdFx0XHR0aGlzLl93b3JsZEJvdW5kc0ludmFsaWQgPSBmYWxzZTtcclxuXHRcdFx0dGhpcy5fd29ybGRCb3VuZHMudHJhbnNmb3JtRnJvbSh0aGlzLmJvdW5kcywgdGhpcy5zY2VuZVRyYW5zZm9ybSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX3dvcmxkQm91bmRzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSW5kaWNhdGVzIHRoZSA8aT54PC9pPiBjb29yZGluYXRlIG9mIHRoZSBEaXNwbGF5T2JqZWN0IGluc3RhbmNlIHJlbGF0aXZlXHJcblx0ICogdG8gdGhlIGxvY2FsIGNvb3JkaW5hdGVzIG9mIHRoZSBwYXJlbnQgRGlzcGxheU9iamVjdENvbnRhaW5lci4gSWYgdGhlXHJcblx0ICogb2JqZWN0IGlzIGluc2lkZSBhIERpc3BsYXlPYmplY3RDb250YWluZXIgdGhhdCBoYXMgdHJhbnNmb3JtYXRpb25zLCBpdCBpc1xyXG5cdCAqIGluIHRoZSBsb2NhbCBjb29yZGluYXRlIHN5c3RlbSBvZiB0aGUgZW5jbG9zaW5nIERpc3BsYXlPYmplY3RDb250YWluZXIuXHJcblx0ICogVGh1cywgZm9yIGEgRGlzcGxheU9iamVjdENvbnRhaW5lciByb3RhdGVkIDkwwrAgY291bnRlcmNsb2Nrd2lzZSwgdGhlXHJcblx0ICogRGlzcGxheU9iamVjdENvbnRhaW5lcidzIGNoaWxkcmVuIGluaGVyaXQgYSBjb29yZGluYXRlIHN5c3RlbSB0aGF0IGlzXHJcblx0ICogcm90YXRlZCA5MMKwIGNvdW50ZXJjbG9ja3dpc2UuIFRoZSBvYmplY3QncyBjb29yZGluYXRlcyByZWZlciB0byB0aGVcclxuXHQgKiByZWdpc3RyYXRpb24gcG9pbnQgcG9zaXRpb24uXHJcblx0ICovXHJcblx0cHVibGljIGdldCB4KCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3g7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHgodmFsOm51bWJlcilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5feCA9PSB2YWwpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl94ID0gdmFsO1xyXG5cclxuXHRcdHRoaXMuaW52YWxpZGF0ZVBvc2l0aW9uKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJbmRpY2F0ZXMgdGhlIDxpPnk8L2k+IGNvb3JkaW5hdGUgb2YgdGhlIERpc3BsYXlPYmplY3QgaW5zdGFuY2UgcmVsYXRpdmVcclxuXHQgKiB0byB0aGUgbG9jYWwgY29vcmRpbmF0ZXMgb2YgdGhlIHBhcmVudCBEaXNwbGF5T2JqZWN0Q29udGFpbmVyLiBJZiB0aGVcclxuXHQgKiBvYmplY3QgaXMgaW5zaWRlIGEgRGlzcGxheU9iamVjdENvbnRhaW5lciB0aGF0IGhhcyB0cmFuc2Zvcm1hdGlvbnMsIGl0IGlzXHJcblx0ICogaW4gdGhlIGxvY2FsIGNvb3JkaW5hdGUgc3lzdGVtIG9mIHRoZSBlbmNsb3NpbmcgRGlzcGxheU9iamVjdENvbnRhaW5lci5cclxuXHQgKiBUaHVzLCBmb3IgYSBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIHJvdGF0ZWQgOTDCsCBjb3VudGVyY2xvY2t3aXNlLCB0aGVcclxuXHQgKiBEaXNwbGF5T2JqZWN0Q29udGFpbmVyJ3MgY2hpbGRyZW4gaW5oZXJpdCBhIGNvb3JkaW5hdGUgc3lzdGVtIHRoYXQgaXNcclxuXHQgKiByb3RhdGVkIDkwwrAgY291bnRlcmNsb2Nrd2lzZS4gVGhlIG9iamVjdCdzIGNvb3JkaW5hdGVzIHJlZmVyIHRvIHRoZVxyXG5cdCAqIHJlZ2lzdHJhdGlvbiBwb2ludCBwb3NpdGlvbi5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHkoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5feTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgeSh2YWw6bnVtYmVyKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl95ID09IHZhbClcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX3kgPSB2YWw7XHJcblxyXG5cdFx0dGhpcy5pbnZhbGlkYXRlUG9zaXRpb24oKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluZGljYXRlcyB0aGUgeiBjb29yZGluYXRlIHBvc2l0aW9uIGFsb25nIHRoZSB6LWF4aXMgb2YgdGhlIERpc3BsYXlPYmplY3RcclxuXHQgKiBpbnN0YW5jZSByZWxhdGl2ZSB0byB0aGUgM0QgcGFyZW50IGNvbnRhaW5lci4gVGhlIHogcHJvcGVydHkgaXMgdXNlZCBmb3JcclxuXHQgKiAzRCBjb29yZGluYXRlcywgbm90IHNjcmVlbiBvciBwaXhlbCBjb29yZGluYXRlcy5cclxuXHQgKlxyXG5cdCAqIDxwPldoZW4geW91IHNldCBhIDxjb2RlPno8L2NvZGU+IHByb3BlcnR5IGZvciBhIGRpc3BsYXkgb2JqZWN0IHRvXHJcblx0ICogc29tZXRoaW5nIG90aGVyIHRoYW4gdGhlIGRlZmF1bHQgdmFsdWUgb2YgPGNvZGU+MDwvY29kZT4sIGEgY29ycmVzcG9uZGluZ1xyXG5cdCAqIE1hdHJpeDNEIG9iamVjdCBpcyBhdXRvbWF0aWNhbGx5IGNyZWF0ZWQuIGZvciBhZGp1c3RpbmcgYSBkaXNwbGF5IG9iamVjdCdzXHJcblx0ICogcG9zaXRpb24gYW5kIG9yaWVudGF0aW9uIGluIHRocmVlIGRpbWVuc2lvbnMuIFdoZW4gd29ya2luZyB3aXRoIHRoZVxyXG5cdCAqIHotYXhpcywgdGhlIGV4aXN0aW5nIGJlaGF2aW9yIG9mIHggYW5kIHkgcHJvcGVydGllcyBjaGFuZ2VzIGZyb20gc2NyZWVuIG9yXHJcblx0ICogcGl4ZWwgY29vcmRpbmF0ZXMgdG8gcG9zaXRpb25zIHJlbGF0aXZlIHRvIHRoZSAzRCBwYXJlbnQgY29udGFpbmVyLjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPkZvciBleGFtcGxlLCBhIGNoaWxkIG9mIHRoZSA8Y29kZT5fcm9vdDwvY29kZT4gYXQgcG9zaXRpb24geCA9IDEwMCwgeSA9XHJcblx0ICogMTAwLCB6ID0gMjAwIGlzIG5vdCBkcmF3biBhdCBwaXhlbCBsb2NhdGlvbigxMDAsMTAwKS4gVGhlIGNoaWxkIGlzIGRyYXduXHJcblx0ICogd2hlcmV2ZXIgdGhlIDNEIHByb2plY3Rpb24gY2FsY3VsYXRpb24gcHV0cyBpdC4gVGhlIGNhbGN1bGF0aW9uIGlzOjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPjxjb2RlPih4fn5jYW1lcmFGb2NhbExlbmd0aC9jYW1lcmFSZWxhdGl2ZVpQb3NpdGlvbixcclxuXHQgKiB5fn5jYW1lcmFGb2NhbExlbmd0aC9jYW1lcmFSZWxhdGl2ZVpQb3NpdGlvbik8L2NvZGU+PC9wPlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgeigpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl96O1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCB6KHZhbDpudW1iZXIpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX3ogPT0gdmFsKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5feiA9IHZhbDtcclxuXHJcblx0XHR0aGlzLmludmFsaWRhdGVQb3NpdGlvbigpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHpPZmZzZXQoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fek9mZnNldDtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgek9mZnNldCh2YWx1ZTpudW1iZXIpXHJcblx0e1xyXG5cdFx0dGhpcy5fek9mZnNldCA9IHZhbHVlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhIG5ldyA8Y29kZT5EaXNwbGF5T2JqZWN0PC9jb2RlPiBpbnN0YW5jZS5cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcigpXHJcblx0e1xyXG5cdFx0c3VwZXIoKTtcclxuXHJcblx0XHQvLyBDYWNoZWQgdmVjdG9yIG9mIHRyYW5zZm9ybWF0aW9uIGNvbXBvbmVudHMgdXNlZCB3aGVuXHJcblx0XHQvLyByZWNvbXBvc2luZyB0aGUgdHJhbnNmb3JtIG1hdHJpeCBpbiB1cGRhdGVUcmFuc2Zvcm0oKVxyXG5cclxuXHRcdHRoaXMuX3RyYW5zZm9ybUNvbXBvbmVudHMgPSBuZXcgQXJyYXk8VmVjdG9yM0Q+KDMpOy8vX3RyYW5zZm9ybUNvbXBvbmVudHMgPSBuZXcgVmVjdG9yLjxWZWN0b3IzRD4oMywgdHJ1ZSk7XHJcblxyXG5cdFx0dGhpcy5fdHJhbnNmb3JtQ29tcG9uZW50c1swXSA9IHRoaXMuX3BvcztcclxuXHRcdHRoaXMuX3RyYW5zZm9ybUNvbXBvbmVudHNbMV0gPSB0aGlzLl9yb3Q7XHJcblx0XHR0aGlzLl90cmFuc2Zvcm1Db21wb25lbnRzWzJdID0gdGhpcy5fc2NhO1xyXG5cclxuXHRcdC8vY3JlYXRpb24gb2YgYXNzb2NpYXRlZCB0cmFuc2Zvcm0gb2JqZWN0XHJcblx0XHR0aGlzLl90cmFuc2Zvcm0gPSBuZXcgVHJhbnNmb3JtKHRoaXMpO1xyXG5cclxuXHRcdHRoaXMuX21hdHJpeDNELmlkZW50aXR5KCk7XHJcblxyXG5cdFx0dGhpcy5fZmxpcFkuYXBwZW5kU2NhbGUoMSwgLTEsIDEpO1xyXG5cclxuXHRcdHRoaXMuX3BCb3VuZHMgPSB0aGlzLnBDcmVhdGVEZWZhdWx0Qm91bmRpbmdWb2x1bWUoKTtcclxuXHJcblx0XHR0aGlzLl93b3JsZEJvdW5kcyA9IHRoaXMucENyZWF0ZURlZmF1bHRCb3VuZGluZ1ZvbHVtZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgYWRkRXZlbnRMaXN0ZW5lcih0eXBlOnN0cmluZywgbGlzdGVuZXI6RnVuY3Rpb24pXHJcblx0e1xyXG5cdFx0c3VwZXIuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcik7XHJcblxyXG5cdFx0c3dpdGNoICh0eXBlKSB7XHJcblx0XHRcdGNhc2UgRGlzcGxheU9iamVjdEV2ZW50LlBPU0lUSU9OX0NIQU5HRUQ6XHJcblx0XHRcdFx0dGhpcy5fbGlzdGVuVG9Qb3NpdGlvbkNoYW5nZWQgPSB0cnVlO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIERpc3BsYXlPYmplY3RFdmVudC5ST1RBVElPTl9DSEFOR0VEOlxyXG5cdFx0XHRcdHRoaXMuX2xpc3RlblRvUm90YXRpb25DaGFuZ2VkID0gdHJ1ZTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSBEaXNwbGF5T2JqZWN0RXZlbnQuU0NBTEVfQ0hBTkdFRDpcclxuXHRcdFx0XHR0aGlzLl9saXN0ZW5Ub1NjYWxlQ2hhbmdlZCA9IHRydWU7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBjbG9uZSgpOkRpc3BsYXlPYmplY3RcclxuXHR7XHJcblx0XHR2YXIgY2xvbmU6RGlzcGxheU9iamVjdCA9IG5ldyBEaXNwbGF5T2JqZWN0KCk7XHJcblx0XHRjbG9uZS5waXZvdCA9IHRoaXMucGl2b3Q7XHJcblx0XHRjbG9uZS5faU1hdHJpeDNEID0gdGhpcy5faU1hdHJpeDNEO1xyXG5cdFx0Y2xvbmUubmFtZSA9IG5hbWU7XHJcblxyXG5cdFx0Ly8gdG9kbzogaW1wbGVtZW50IGZvciBhbGwgc3VidHlwZXNcclxuXHRcdHJldHVybiBjbG9uZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGRpc3Bvc2UoKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLnBhcmVudClcclxuXHRcdFx0dGhpcy5wYXJlbnQucmVtb3ZlQ2hpbGQodGhpcyk7XHJcblxyXG5cdFx0d2hpbGUgKHRoaXMuX3BSZW5kZXJhYmxlcy5sZW5ndGgpXHJcblx0XHRcdHRoaXMuX3BSZW5kZXJhYmxlc1swXS5kaXNwb3NlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAaW5oZXJpdERvY1xyXG5cdCAqL1xyXG5cdHB1YmxpYyBkaXNwb3NlQXNzZXQoKVxyXG5cdHtcclxuXHRcdHRoaXMuZGlzcG9zZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyBhIHJlY3RhbmdsZSB0aGF0IGRlZmluZXMgdGhlIGFyZWEgb2YgdGhlIGRpc3BsYXkgb2JqZWN0IHJlbGF0aXZlXHJcblx0ICogdG8gdGhlIGNvb3JkaW5hdGUgc3lzdGVtIG9mIHRoZSA8Y29kZT50YXJnZXRDb29yZGluYXRlU3BhY2U8L2NvZGU+IG9iamVjdC5cclxuXHQgKiBDb25zaWRlciB0aGUgZm9sbG93aW5nIGNvZGUsIHdoaWNoIHNob3dzIGhvdyB0aGUgcmVjdGFuZ2xlIHJldHVybmVkIGNhblxyXG5cdCAqIHZhcnkgZGVwZW5kaW5nIG9uIHRoZSA8Y29kZT50YXJnZXRDb29yZGluYXRlU3BhY2U8L2NvZGU+IHBhcmFtZXRlciB0aGF0XHJcblx0ICogeW91IHBhc3MgdG8gdGhlIG1ldGhvZDpcclxuXHQgKlxyXG5cdCAqIDxwPjxiPk5vdGU6PC9iPiBVc2UgdGhlIDxjb2RlPmxvY2FsVG9HbG9iYWwoKTwvY29kZT4gYW5kXHJcblx0ICogPGNvZGU+Z2xvYmFsVG9Mb2NhbCgpPC9jb2RlPiBtZXRob2RzIHRvIGNvbnZlcnQgdGhlIGRpc3BsYXkgb2JqZWN0J3MgbG9jYWxcclxuXHQgKiBjb29yZGluYXRlcyB0byBkaXNwbGF5IGNvb3JkaW5hdGVzLCBvciBkaXNwbGF5IGNvb3JkaW5hdGVzIHRvIGxvY2FsXHJcblx0ICogY29vcmRpbmF0ZXMsIHJlc3BlY3RpdmVseS48L3A+XHJcblx0ICpcclxuXHQgKiA8cD5UaGUgPGNvZGU+Z2V0Qm91bmRzKCk8L2NvZGU+IG1ldGhvZCBpcyBzaW1pbGFyIHRvIHRoZVxyXG5cdCAqIDxjb2RlPmdldFJlY3QoKTwvY29kZT4gbWV0aG9kOyBob3dldmVyLCB0aGUgUmVjdGFuZ2xlIHJldHVybmVkIGJ5IHRoZVxyXG5cdCAqIDxjb2RlPmdldEJvdW5kcygpPC9jb2RlPiBtZXRob2QgaW5jbHVkZXMgYW55IHN0cm9rZXMgb24gc2hhcGVzLCB3aGVyZWFzXHJcblx0ICogdGhlIFJlY3RhbmdsZSByZXR1cm5lZCBieSB0aGUgPGNvZGU+Z2V0UmVjdCgpPC9jb2RlPiBtZXRob2QgZG9lcyBub3QuIEZvclxyXG5cdCAqIGFuIGV4YW1wbGUsIHNlZSB0aGUgZGVzY3JpcHRpb24gb2YgdGhlIDxjb2RlPmdldFJlY3QoKTwvY29kZT4gbWV0aG9kLjwvcD5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB0YXJnZXRDb29yZGluYXRlU3BhY2UgVGhlIGRpc3BsYXkgb2JqZWN0IHRoYXQgZGVmaW5lcyB0aGVcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvb3JkaW5hdGUgc3lzdGVtIHRvIHVzZS5cclxuXHQgKiBAcmV0dXJuIFRoZSByZWN0YW5nbGUgdGhhdCBkZWZpbmVzIHRoZSBhcmVhIG9mIHRoZSBkaXNwbGF5IG9iamVjdCByZWxhdGl2ZVxyXG5cdCAqICAgICAgICAgdG8gdGhlIDxjb2RlPnRhcmdldENvb3JkaW5hdGVTcGFjZTwvY29kZT4gb2JqZWN0J3MgY29vcmRpbmF0ZVxyXG5cdCAqICAgICAgICAgc3lzdGVtLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXRCb3VuZHModGFyZ2V0Q29vcmRpbmF0ZVNwYWNlOkRpc3BsYXlPYmplY3QpOlJlY3RhbmdsZVxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9ib3VuZHM7IC8vVE9ET1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyBhIHJlY3RhbmdsZSB0aGF0IGRlZmluZXMgdGhlIGJvdW5kYXJ5IG9mIHRoZSBkaXNwbGF5IG9iamVjdCwgYmFzZWRcclxuXHQgKiBvbiB0aGUgY29vcmRpbmF0ZSBzeXN0ZW0gZGVmaW5lZCBieSB0aGUgPGNvZGU+dGFyZ2V0Q29vcmRpbmF0ZVNwYWNlPC9jb2RlPlxyXG5cdCAqIHBhcmFtZXRlciwgZXhjbHVkaW5nIGFueSBzdHJva2VzIG9uIHNoYXBlcy4gVGhlIHZhbHVlcyB0aGF0IHRoZVxyXG5cdCAqIDxjb2RlPmdldFJlY3QoKTwvY29kZT4gbWV0aG9kIHJldHVybnMgYXJlIHRoZSBzYW1lIG9yIHNtYWxsZXIgdGhhbiB0aG9zZVxyXG5cdCAqIHJldHVybmVkIGJ5IHRoZSA8Y29kZT5nZXRCb3VuZHMoKTwvY29kZT4gbWV0aG9kLlxyXG5cdCAqXHJcblx0ICogPHA+PGI+Tm90ZTo8L2I+IFVzZSA8Y29kZT5sb2NhbFRvR2xvYmFsKCk8L2NvZGU+IGFuZFxyXG5cdCAqIDxjb2RlPmdsb2JhbFRvTG9jYWwoKTwvY29kZT4gbWV0aG9kcyB0byBjb252ZXJ0IHRoZSBkaXNwbGF5IG9iamVjdCdzIGxvY2FsXHJcblx0ICogY29vcmRpbmF0ZXMgdG8gU3RhZ2UgY29vcmRpbmF0ZXMsIG9yIFN0YWdlIGNvb3JkaW5hdGVzIHRvIGxvY2FsXHJcblx0ICogY29vcmRpbmF0ZXMsIHJlc3BlY3RpdmVseS48L3A+XHJcblx0ICpcclxuXHQgKiBAcGFyYW0gdGFyZ2V0Q29vcmRpbmF0ZVNwYWNlIFRoZSBkaXNwbGF5IG9iamVjdCB0aGF0IGRlZmluZXMgdGhlXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb29yZGluYXRlIHN5c3RlbSB0byB1c2UuXHJcblx0ICogQHJldHVybiBUaGUgcmVjdGFuZ2xlIHRoYXQgZGVmaW5lcyB0aGUgYXJlYSBvZiB0aGUgZGlzcGxheSBvYmplY3QgcmVsYXRpdmVcclxuXHQgKiAgICAgICAgIHRvIHRoZSA8Y29kZT50YXJnZXRDb29yZGluYXRlU3BhY2U8L2NvZGU+IG9iamVjdCdzIGNvb3JkaW5hdGVcclxuXHQgKiAgICAgICAgIHN5c3RlbS5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0UmVjdCh0YXJnZXRDb29yZGluYXRlU3BhY2U6RGlzcGxheU9iamVjdCk6UmVjdGFuZ2xlXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2JvdW5kczsgLy9UT0RPXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDb252ZXJ0cyB0aGUgPGNvZGU+cG9pbnQ8L2NvZGU+IG9iamVjdCBmcm9tIHRoZSBTdGFnZShnbG9iYWwpIGNvb3JkaW5hdGVzXHJcblx0ICogdG8gdGhlIGRpc3BsYXkgb2JqZWN0J3MobG9jYWwpIGNvb3JkaW5hdGVzLlxyXG5cdCAqXHJcblx0ICogPHA+VG8gdXNlIHRoaXMgbWV0aG9kLCBmaXJzdCBjcmVhdGUgYW4gaW5zdGFuY2Ugb2YgdGhlIFBvaW50IGNsYXNzLiBUaGVcclxuXHQgKiA8aT54PC9pPiBhbmQgPGk+eTwvaT4gdmFsdWVzIHRoYXQgeW91IGFzc2lnbiByZXByZXNlbnQgZ2xvYmFsIGNvb3JkaW5hdGVzXHJcblx0ICogYmVjYXVzZSB0aGV5IHJlbGF0ZSB0byB0aGUgb3JpZ2luKDAsMCkgb2YgdGhlIG1haW4gZGlzcGxheSBhcmVhLiBUaGVuXHJcblx0ICogcGFzcyB0aGUgUG9pbnQgaW5zdGFuY2UgYXMgdGhlIHBhcmFtZXRlciB0byB0aGVcclxuXHQgKiA8Y29kZT5nbG9iYWxUb0xvY2FsKCk8L2NvZGU+IG1ldGhvZC4gVGhlIG1ldGhvZCByZXR1cm5zIGEgbmV3IFBvaW50IG9iamVjdFxyXG5cdCAqIHdpdGggPGk+eDwvaT4gYW5kIDxpPnk8L2k+IHZhbHVlcyB0aGF0IHJlbGF0ZSB0byB0aGUgb3JpZ2luIG9mIHRoZSBkaXNwbGF5XHJcblx0ICogb2JqZWN0IGluc3RlYWQgb2YgdGhlIG9yaWdpbiBvZiB0aGUgU3RhZ2UuPC9wPlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHBvaW50IEFuIG9iamVjdCBjcmVhdGVkIHdpdGggdGhlIFBvaW50IGNsYXNzLiBUaGUgUG9pbnQgb2JqZWN0XHJcblx0ICogICAgICAgICAgICAgIHNwZWNpZmllcyB0aGUgPGk+eDwvaT4gYW5kIDxpPnk8L2k+IGNvb3JkaW5hdGVzIGFzXHJcblx0ICogICAgICAgICAgICAgIHByb3BlcnRpZXMuXHJcblx0ICogQHJldHVybiBBIFBvaW50IG9iamVjdCB3aXRoIGNvb3JkaW5hdGVzIHJlbGF0aXZlIHRvIHRoZSBkaXNwbGF5IG9iamVjdC5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2xvYmFsVG9Mb2NhbChwb2ludDpQb2ludCk6UG9pbnRcclxuXHR7XHJcblx0XHRyZXR1cm4gcG9pbnQ7IC8vVE9ET1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ29udmVydHMgYSB0d28tZGltZW5zaW9uYWwgcG9pbnQgZnJvbSB0aGUgU3RhZ2UoZ2xvYmFsKSBjb29yZGluYXRlcyB0byBhXHJcblx0ICogdGhyZWUtZGltZW5zaW9uYWwgZGlzcGxheSBvYmplY3Qncyhsb2NhbCkgY29vcmRpbmF0ZXMuXHJcblx0ICpcclxuXHQgKiA8cD5UbyB1c2UgdGhpcyBtZXRob2QsIGZpcnN0IGNyZWF0ZSBhbiBpbnN0YW5jZSBvZiB0aGUgUG9pbnQgY2xhc3MuIFRoZSB4XHJcblx0ICogYW5kIHkgdmFsdWVzIHRoYXQgeW91IGFzc2lnbiB0byB0aGUgUG9pbnQgb2JqZWN0IHJlcHJlc2VudCBnbG9iYWxcclxuXHQgKiBjb29yZGluYXRlcyBiZWNhdXNlIHRoZXkgYXJlIHJlbGF0aXZlIHRvIHRoZSBvcmlnaW4oMCwwKSBvZiB0aGUgbWFpblxyXG5cdCAqIGRpc3BsYXkgYXJlYS4gVGhlbiBwYXNzIHRoZSBQb2ludCBvYmplY3QgdG8gdGhlXHJcblx0ICogPGNvZGU+Z2xvYmFsVG9Mb2NhbDNEKCk8L2NvZGU+IG1ldGhvZCBhcyB0aGUgPGNvZGU+cG9pbnQ8L2NvZGU+IHBhcmFtZXRlci5cclxuXHQgKiBUaGUgbWV0aG9kIHJldHVybnMgdGhyZWUtZGltZW5zaW9uYWwgY29vcmRpbmF0ZXMgYXMgYSBWZWN0b3IzRCBvYmplY3RcclxuXHQgKiBjb250YWluaW5nIDxjb2RlPng8L2NvZGU+LCA8Y29kZT55PC9jb2RlPiwgYW5kIDxjb2RlPno8L2NvZGU+IHZhbHVlcyB0aGF0XHJcblx0ICogYXJlIHJlbGF0aXZlIHRvIHRoZSBvcmlnaW4gb2YgdGhlIHRocmVlLWRpbWVuc2lvbmFsIGRpc3BsYXkgb2JqZWN0LjwvcD5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBwb2ludCBBIHR3byBkaW1lbnNpb25hbCBQb2ludCBvYmplY3QgcmVwcmVzZW50aW5nIGdsb2JhbCB4IGFuZCB5XHJcblx0ICogICAgICAgICAgICAgIGNvb3JkaW5hdGVzLlxyXG5cdCAqIEByZXR1cm4gQSBWZWN0b3IzRCBvYmplY3Qgd2l0aCBjb29yZGluYXRlcyByZWxhdGl2ZSB0byB0aGVcclxuXHQgKiAgICAgICAgIHRocmVlLWRpbWVuc2lvbmFsIGRpc3BsYXkgb2JqZWN0LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnbG9iYWxUb0xvY2FsM0QocG9pbnQ6UG9pbnQpOlZlY3RvcjNEXHJcblx0e1xyXG5cdFx0cmV0dXJuIG5ldyBWZWN0b3IzRCgpOyAvL1RPRE9cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEV2YWx1YXRlcyB0aGUgYm91bmRpbmcgYm94IG9mIHRoZSBkaXNwbGF5IG9iamVjdCB0byBzZWUgaWYgaXQgb3ZlcmxhcHMgb3JcclxuXHQgKiBpbnRlcnNlY3RzIHdpdGggdGhlIGJvdW5kaW5nIGJveCBvZiB0aGUgPGNvZGU+b2JqPC9jb2RlPiBkaXNwbGF5IG9iamVjdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmogVGhlIGRpc3BsYXkgb2JqZWN0IHRvIHRlc3QgYWdhaW5zdC5cclxuXHQgKiBAcmV0dXJuIDxjb2RlPnRydWU8L2NvZGU+IGlmIHRoZSBib3VuZGluZyBib3hlcyBvZiB0aGUgZGlzcGxheSBvYmplY3RzXHJcblx0ICogICAgICAgICBpbnRlcnNlY3Q7IDxjb2RlPmZhbHNlPC9jb2RlPiBpZiBub3QuXHJcblx0ICovXHJcblx0cHVibGljIGhpdFRlc3RPYmplY3Qob2JqOkRpc3BsYXlPYmplY3QpOmJvb2xlYW5cclxuXHR7XHJcblx0XHRyZXR1cm4gZmFsc2U7IC8vVE9ET1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRXZhbHVhdGVzIHRoZSBkaXNwbGF5IG9iamVjdCB0byBzZWUgaWYgaXQgb3ZlcmxhcHMgb3IgaW50ZXJzZWN0cyB3aXRoIHRoZVxyXG5cdCAqIHBvaW50IHNwZWNpZmllZCBieSB0aGUgPGNvZGU+eDwvY29kZT4gYW5kIDxjb2RlPnk8L2NvZGU+IHBhcmFtZXRlcnMuIFRoZVxyXG5cdCAqIDxjb2RlPng8L2NvZGU+IGFuZCA8Y29kZT55PC9jb2RlPiBwYXJhbWV0ZXJzIHNwZWNpZnkgYSBwb2ludCBpbiB0aGVcclxuXHQgKiBjb29yZGluYXRlIHNwYWNlIG9mIHRoZSBTdGFnZSwgbm90IHRoZSBkaXNwbGF5IG9iamVjdCBjb250YWluZXIgdGhhdFxyXG5cdCAqIGNvbnRhaW5zIHRoZSBkaXNwbGF5IG9iamVjdCh1bmxlc3MgdGhhdCBkaXNwbGF5IG9iamVjdCBjb250YWluZXIgaXMgdGhlXHJcblx0ICogU3RhZ2UpLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHggICAgICAgICBUaGUgPGk+eDwvaT4gY29vcmRpbmF0ZSB0byB0ZXN0IGFnYWluc3QgdGhpcyBvYmplY3QuXHJcblx0ICogQHBhcmFtIHkgICAgICAgICBUaGUgPGk+eTwvaT4gY29vcmRpbmF0ZSB0byB0ZXN0IGFnYWluc3QgdGhpcyBvYmplY3QuXHJcblx0ICogQHBhcmFtIHNoYXBlRmxhZyBXaGV0aGVyIHRvIGNoZWNrIGFnYWluc3QgdGhlIGFjdHVhbCBwaXhlbHMgb2YgdGhlIG9iamVjdFxyXG5cdCAqICAgICAgICAgICAgICAgICAoPGNvZGU+dHJ1ZTwvY29kZT4pIG9yIHRoZSBib3VuZGluZyBib3hcclxuXHQgKiAgICAgICAgICAgICAgICAgKDxjb2RlPmZhbHNlPC9jb2RlPikuXHJcblx0ICogQHJldHVybiA8Y29kZT50cnVlPC9jb2RlPiBpZiB0aGUgZGlzcGxheSBvYmplY3Qgb3ZlcmxhcHMgb3IgaW50ZXJzZWN0c1xyXG5cdCAqICAgICAgICAgd2l0aCB0aGUgc3BlY2lmaWVkIHBvaW50OyA8Y29kZT5mYWxzZTwvY29kZT4gb3RoZXJ3aXNlLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBoaXRUZXN0UG9pbnQoeDpudW1iZXIsIHk6bnVtYmVyLCBzaGFwZUZsYWc6Ym9vbGVhbiA9IGZhbHNlKTpib29sZWFuXHJcblx0e1xyXG5cdFx0cmV0dXJuIGZhbHNlOyAvL1RPRE9cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBpbmhlcml0RG9jXHJcblx0ICovXHJcblx0cHVibGljIGlzSW50ZXJzZWN0aW5nUmF5KHJheVBvc2l0aW9uOlZlY3RvcjNELCByYXlEaXJlY3Rpb246VmVjdG9yM0QpOmJvb2xlYW5cclxuXHR7XHJcblx0XHR2YXIgbG9jYWxSYXlQb3NpdGlvbjpWZWN0b3IzRCA9IHRoaXMuaW52ZXJzZVNjZW5lVHJhbnNmb3JtLnRyYW5zZm9ybVZlY3RvcihyYXlQb3NpdGlvbik7XHJcblx0XHR2YXIgbG9jYWxSYXlEaXJlY3Rpb246VmVjdG9yM0QgPSB0aGlzLmludmVyc2VTY2VuZVRyYW5zZm9ybS5kZWx0YVRyYW5zZm9ybVZlY3RvcihyYXlEaXJlY3Rpb24pO1xyXG5cdFx0dmFyIHBpY2tpbmdDb2xsaXNpb25WTzpQaWNraW5nQ29sbGlzaW9uVk8gPSB0aGlzLl9pUGlja2luZ0NvbGxpc2lvblZPO1xyXG5cclxuXHRcdGlmICghcGlja2luZ0NvbGxpc2lvblZPLmxvY2FsTm9ybWFsKVxyXG5cdFx0XHRwaWNraW5nQ29sbGlzaW9uVk8ubG9jYWxOb3JtYWwgPSBuZXcgVmVjdG9yM0QoKTtcclxuXHJcblx0XHR2YXIgcmF5RW50cnlEaXN0YW5jZTpudW1iZXIgPSB0aGlzLmJvdW5kcy5yYXlJbnRlcnNlY3Rpb24obG9jYWxSYXlQb3NpdGlvbiwgbG9jYWxSYXlEaXJlY3Rpb24sIHBpY2tpbmdDb2xsaXNpb25WTy5sb2NhbE5vcm1hbCk7XHJcblxyXG5cdFx0aWYgKHJheUVudHJ5RGlzdGFuY2UgPCAwKVxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblxyXG5cdFx0cGlja2luZ0NvbGxpc2lvblZPLnJheUVudHJ5RGlzdGFuY2UgPSByYXlFbnRyeURpc3RhbmNlO1xyXG5cdFx0cGlja2luZ0NvbGxpc2lvblZPLmxvY2FsUmF5UG9zaXRpb24gPSBsb2NhbFJheVBvc2l0aW9uO1xyXG5cdFx0cGlja2luZ0NvbGxpc2lvblZPLmxvY2FsUmF5RGlyZWN0aW9uID0gbG9jYWxSYXlEaXJlY3Rpb247XHJcblx0XHRwaWNraW5nQ29sbGlzaW9uVk8ucmF5UG9zaXRpb24gPSByYXlQb3NpdGlvbjtcclxuXHRcdHBpY2tpbmdDb2xsaXNpb25WTy5yYXlEaXJlY3Rpb24gPSByYXlEaXJlY3Rpb247XHJcblx0XHRwaWNraW5nQ29sbGlzaW9uVk8ucmF5T3JpZ2luSXNJbnNpZGVCb3VuZHMgPSByYXlFbnRyeURpc3RhbmNlID09IDA7XHJcblxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDb252ZXJ0cyBhIHRocmVlLWRpbWVuc2lvbmFsIHBvaW50IG9mIHRoZSB0aHJlZS1kaW1lbnNpb25hbCBkaXNwbGF5XHJcblx0ICogb2JqZWN0J3MobG9jYWwpIGNvb3JkaW5hdGVzIHRvIGEgdHdvLWRpbWVuc2lvbmFsIHBvaW50IGluIHRoZSBTdGFnZVxyXG5cdCAqIChnbG9iYWwpIGNvb3JkaW5hdGVzLlxyXG5cdCAqXHJcblx0ICogPHA+Rm9yIGV4YW1wbGUsIHlvdSBjYW4gb25seSB1c2UgdHdvLWRpbWVuc2lvbmFsIGNvb3JkaW5hdGVzKHgseSkgdG8gZHJhd1xyXG5cdCAqIHdpdGggdGhlIDxjb2RlPmRpc3BsYXkuR3JhcGhpY3M8L2NvZGU+IG1ldGhvZHMuIFRvIGRyYXcgYVxyXG5cdCAqIHRocmVlLWRpbWVuc2lvbmFsIG9iamVjdCwgeW91IG5lZWQgdG8gbWFwIHRoZSB0aHJlZS1kaW1lbnNpb25hbFxyXG5cdCAqIGNvb3JkaW5hdGVzIG9mIGEgZGlzcGxheSBvYmplY3QgdG8gdHdvLWRpbWVuc2lvbmFsIGNvb3JkaW5hdGVzLiBGaXJzdCxcclxuXHQgKiBjcmVhdGUgYW4gaW5zdGFuY2Ugb2YgdGhlIFZlY3RvcjNEIGNsYXNzIHRoYXQgaG9sZHMgdGhlIHgtLCB5LSwgYW5kIHotXHJcblx0ICogY29vcmRpbmF0ZXMgb2YgdGhlIHRocmVlLWRpbWVuc2lvbmFsIGRpc3BsYXkgb2JqZWN0LiBUaGVuIHBhc3MgdGhlXHJcblx0ICogVmVjdG9yM0Qgb2JqZWN0IHRvIHRoZSA8Y29kZT5sb2NhbDNEVG9HbG9iYWwoKTwvY29kZT4gbWV0aG9kIGFzIHRoZVxyXG5cdCAqIDxjb2RlPnBvaW50M2Q8L2NvZGU+IHBhcmFtZXRlci4gVGhlIG1ldGhvZCByZXR1cm5zIGEgdHdvLWRpbWVuc2lvbmFsIFBvaW50XHJcblx0ICogb2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgd2l0aCB0aGUgR3JhcGhpY3MgQVBJIHRvIGRyYXcgdGhlXHJcblx0ICogdGhyZWUtZGltZW5zaW9uYWwgb2JqZWN0LjwvcD5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBwb2ludDNkIEEgVmVjdG9yM0Qgb2JqZWN0IGNvbnRhaW5pbmcgZWl0aGVyIGEgdGhyZWUtZGltZW5zaW9uYWxcclxuXHQgKiAgICAgICAgICAgICAgICBwb2ludCBvciB0aGUgY29vcmRpbmF0ZXMgb2YgdGhlIHRocmVlLWRpbWVuc2lvbmFsIGRpc3BsYXlcclxuXHQgKiAgICAgICAgICAgICAgICBvYmplY3QuXHJcblx0ICogQHJldHVybiBBIHR3by1kaW1lbnNpb25hbCBwb2ludCByZXByZXNlbnRpbmcgYSB0aHJlZS1kaW1lbnNpb25hbCBwb2ludCBpblxyXG5cdCAqICAgICAgICAgdHdvLWRpbWVuc2lvbmFsIHNwYWNlLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBsb2NhbDNEVG9HbG9iYWwocG9pbnQzZDpWZWN0b3IzRCk6UG9pbnRcclxuXHR7XHJcblx0XHRyZXR1cm4gbmV3IFBvaW50KCk7IC8vVE9ET1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUm90YXRlcyB0aGUgM2Qgb2JqZWN0IGFyb3VuZCB0byBmYWNlIGEgcG9pbnQgZGVmaW5lZCByZWxhdGl2ZSB0byB0aGUgbG9jYWwgY29vcmRpbmF0ZXMgb2YgdGhlIHBhcmVudCA8Y29kZT5PYmplY3RDb250YWluZXIzRDwvY29kZT4uXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gICAgdGFyZ2V0ICAgICAgICBUaGUgdmVjdG9yIGRlZmluaW5nIHRoZSBwb2ludCB0byBiZSBsb29rZWQgYXRcclxuXHQgKiBAcGFyYW0gICAgdXBBeGlzICAgICAgICBBbiBvcHRpb25hbCB2ZWN0b3IgdXNlZCB0byBkZWZpbmUgdGhlIGRlc2lyZWQgdXAgb3JpZW50YXRpb24gb2YgdGhlIDNkIG9iamVjdCBhZnRlciByb3RhdGlvbiBoYXMgb2NjdXJyZWRcclxuXHQgKi9cclxuXHRwdWJsaWMgbG9va0F0KHRhcmdldDpWZWN0b3IzRCwgdXBBeGlzOlZlY3RvcjNEID0gbnVsbClcclxuXHR7XHJcblxyXG5cdFx0dmFyIHlBeGlzOlZlY3RvcjNEO1xyXG5cdFx0dmFyIHpBeGlzOlZlY3RvcjNEO1xyXG5cdFx0dmFyIHhBeGlzOlZlY3RvcjNEO1xyXG5cdFx0dmFyIHJhdzpBcnJheTxudW1iZXI+O1xyXG5cclxuXHRcdGlmICh1cEF4aXMgPT0gbnVsbClcclxuXHRcdFx0dXBBeGlzID0gVmVjdG9yM0QuWV9BWElTO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHR1cEF4aXMubm9ybWFsaXplKCk7XHJcblxyXG5cdFx0ekF4aXMgPSB0YXJnZXQuc3VidHJhY3QodGhpcy5faU1hdHJpeDNELnBvc2l0aW9uKTtcclxuXHRcdHpBeGlzLm5vcm1hbGl6ZSgpO1xyXG5cclxuXHRcdHhBeGlzID0gdXBBeGlzLmNyb3NzUHJvZHVjdCh6QXhpcyk7XHJcblx0XHR4QXhpcy5ub3JtYWxpemUoKTtcclxuXHJcblx0XHRpZiAoeEF4aXMubGVuZ3RoIDwgMC4wNSkge1xyXG5cdFx0XHR4QXhpcy54ID0gdXBBeGlzLnk7XHJcblx0XHRcdHhBeGlzLnkgPSB1cEF4aXMueDtcclxuXHRcdFx0eEF4aXMueiA9IDA7XHJcblx0XHRcdHhBeGlzLm5vcm1hbGl6ZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHlBeGlzID0gekF4aXMuY3Jvc3NQcm9kdWN0KHhBeGlzKTtcclxuXHJcblx0XHRyYXcgPSBNYXRyaXgzRFV0aWxzLlJBV19EQVRBX0NPTlRBSU5FUjtcclxuXHJcblx0XHRyYXdbMF0gPSB4QXhpcy54O1xyXG5cdFx0cmF3WzFdID0geEF4aXMueTtcclxuXHRcdHJhd1syXSA9IHhBeGlzLno7XHJcblx0XHRyYXdbM10gPSAwO1xyXG5cclxuXHRcdHJhd1s0XSA9IHlBeGlzLng7XHJcblx0XHRyYXdbNV0gPSB5QXhpcy55O1xyXG5cdFx0cmF3WzZdID0geUF4aXMuejtcclxuXHRcdHJhd1s3XSA9IDA7XHJcblxyXG5cdFx0cmF3WzhdID0gekF4aXMueDtcclxuXHRcdHJhd1s5XSA9IHpBeGlzLnk7XHJcblx0XHRyYXdbMTBdID0gekF4aXMuejtcclxuXHRcdHJhd1sxMV0gPSAwO1xyXG5cclxuXHRcdHZhciBtOk1hdHJpeDNEID0gbmV3IE1hdHJpeDNEKCk7XHJcblx0XHRtLmNvcHlSYXdEYXRhRnJvbShyYXcpO1xyXG5cclxuXHRcdHZhciB2ZWM6VmVjdG9yM0QgPSBtLmRlY29tcG9zZSgpWzFdO1xyXG5cclxuXHRcdHRoaXMuX3JvdGF0aW9uWCA9IHZlYy54O1xyXG5cdFx0dGhpcy5fcm90YXRpb25ZID0gdmVjLnk7XHJcblx0XHR0aGlzLl9yb3RhdGlvblogPSB2ZWMuejtcclxuXHJcblx0XHR0aGlzLmludmFsaWRhdGVSb3RhdGlvbigpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ29udmVydHMgdGhlIDxjb2RlPnBvaW50PC9jb2RlPiBvYmplY3QgZnJvbSB0aGUgZGlzcGxheSBvYmplY3Qncyhsb2NhbClcclxuXHQgKiBjb29yZGluYXRlcyB0byB0aGUgU3RhZ2UoZ2xvYmFsKSBjb29yZGluYXRlcy5cclxuXHQgKlxyXG5cdCAqIDxwPlRoaXMgbWV0aG9kIGFsbG93cyB5b3UgdG8gY29udmVydCBhbnkgZ2l2ZW4gPGk+eDwvaT4gYW5kIDxpPnk8L2k+XHJcblx0ICogY29vcmRpbmF0ZXMgZnJvbSB2YWx1ZXMgdGhhdCBhcmUgcmVsYXRpdmUgdG8gdGhlIG9yaWdpbigwLDApIG9mIGFcclxuXHQgKiBzcGVjaWZpYyBkaXNwbGF5IG9iamVjdChsb2NhbCBjb29yZGluYXRlcykgdG8gdmFsdWVzIHRoYXQgYXJlIHJlbGF0aXZlIHRvXHJcblx0ICogdGhlIG9yaWdpbiBvZiB0aGUgU3RhZ2UoZ2xvYmFsIGNvb3JkaW5hdGVzKS48L3A+XHJcblx0ICpcclxuXHQgKiA8cD5UbyB1c2UgdGhpcyBtZXRob2QsIGZpcnN0IGNyZWF0ZSBhbiBpbnN0YW5jZSBvZiB0aGUgUG9pbnQgY2xhc3MuIFRoZVxyXG5cdCAqIDxpPng8L2k+IGFuZCA8aT55PC9pPiB2YWx1ZXMgdGhhdCB5b3UgYXNzaWduIHJlcHJlc2VudCBsb2NhbCBjb29yZGluYXRlc1xyXG5cdCAqIGJlY2F1c2UgdGhleSByZWxhdGUgdG8gdGhlIG9yaWdpbiBvZiB0aGUgZGlzcGxheSBvYmplY3QuPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+WW91IHRoZW4gcGFzcyB0aGUgUG9pbnQgaW5zdGFuY2UgdGhhdCB5b3UgY3JlYXRlZCBhcyB0aGUgcGFyYW1ldGVyIHRvXHJcblx0ICogdGhlIDxjb2RlPmxvY2FsVG9HbG9iYWwoKTwvY29kZT4gbWV0aG9kLiBUaGUgbWV0aG9kIHJldHVybnMgYSBuZXcgUG9pbnRcclxuXHQgKiBvYmplY3Qgd2l0aCA8aT54PC9pPiBhbmQgPGk+eTwvaT4gdmFsdWVzIHRoYXQgcmVsYXRlIHRvIHRoZSBvcmlnaW4gb2YgdGhlXHJcblx0ICogU3RhZ2UgaW5zdGVhZCBvZiB0aGUgb3JpZ2luIG9mIHRoZSBkaXNwbGF5IG9iamVjdC48L3A+XHJcblx0ICpcclxuXHQgKiBAcGFyYW0gcG9pbnQgVGhlIG5hbWUgb3IgaWRlbnRpZmllciBvZiBhIHBvaW50IGNyZWF0ZWQgd2l0aCB0aGUgUG9pbnRcclxuXHQgKiAgICAgICAgICAgICAgY2xhc3MsIHNwZWNpZnlpbmcgdGhlIDxpPng8L2k+IGFuZCA8aT55PC9pPiBjb29yZGluYXRlcyBhc1xyXG5cdCAqICAgICAgICAgICAgICBwcm9wZXJ0aWVzLlxyXG5cdCAqIEByZXR1cm4gQSBQb2ludCBvYmplY3Qgd2l0aCBjb29yZGluYXRlcyByZWxhdGl2ZSB0byB0aGUgU3RhZ2UuXHJcblx0ICovXHJcblx0cHVibGljIGxvY2FsVG9HbG9iYWwocG9pbnQ6UG9pbnQpOlBvaW50XHJcblx0e1xyXG5cdFx0cmV0dXJuIG5ldyBQb2ludCgpOyAvL1RPRE9cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1vdmVzIHRoZSAzZCBvYmplY3QgZGlyZWN0bHkgdG8gYSBwb2ludCBpbiBzcGFjZVxyXG5cdCAqXHJcblx0ICogQHBhcmFtICAgIGR4ICAgICAgICBUaGUgYW1vdW50IG9mIG1vdmVtZW50IGFsb25nIHRoZSBsb2NhbCB4IGF4aXMuXHJcblx0ICogQHBhcmFtICAgIGR5ICAgICAgICBUaGUgYW1vdW50IG9mIG1vdmVtZW50IGFsb25nIHRoZSBsb2NhbCB5IGF4aXMuXHJcblx0ICogQHBhcmFtICAgIGR6ICAgICAgICBUaGUgYW1vdW50IG9mIG1vdmVtZW50IGFsb25nIHRoZSBsb2NhbCB6IGF4aXMuXHJcblx0ICovXHJcblxyXG5cdHB1YmxpYyBtb3ZlVG8oZHg6bnVtYmVyLCBkeTpudW1iZXIsIGR6Om51bWJlcilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5feCA9PSBkeCAmJiB0aGlzLl95ID09IGR5ICYmIHRoaXMuX3ogPT0gZHopXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl94ID0gZHg7XHJcblx0XHR0aGlzLl95ID0gZHk7XHJcblx0XHR0aGlzLl96ID0gZHo7XHJcblxyXG5cdFx0dGhpcy5pbnZhbGlkYXRlUG9zaXRpb24oKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1vdmVzIHRoZSBsb2NhbCBwb2ludCBhcm91bmQgd2hpY2ggdGhlIG9iamVjdCByb3RhdGVzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICAgIGR4ICAgICAgICBUaGUgYW1vdW50IG9mIG1vdmVtZW50IGFsb25nIHRoZSBsb2NhbCB4IGF4aXMuXHJcblx0ICogQHBhcmFtICAgIGR5ICAgICAgICBUaGUgYW1vdW50IG9mIG1vdmVtZW50IGFsb25nIHRoZSBsb2NhbCB5IGF4aXMuXHJcblx0ICogQHBhcmFtICAgIGR6ICAgICAgICBUaGUgYW1vdW50IG9mIG1vdmVtZW50IGFsb25nIHRoZSBsb2NhbCB6IGF4aXMuXHJcblx0ICovXHJcblx0cHVibGljIG1vdmVQaXZvdChkeDpudW1iZXIsIGR5Om51bWJlciwgZHo6bnVtYmVyKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9waXZvdCA9PSBudWxsKVxyXG5cdFx0XHR0aGlzLl9waXZvdCA9IG5ldyBWZWN0b3IzRCgpO1xyXG5cclxuXHRcdHRoaXMuX3Bpdm90LnggKz0gZHg7XHJcblx0XHR0aGlzLl9waXZvdC55ICs9IGR5O1xyXG5cdFx0dGhpcy5fcGl2b3QueiArPSBkejtcclxuXHJcblx0XHR0aGlzLmludmFsaWRhdGVQaXZvdCgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUm90YXRlcyB0aGUgM2Qgb2JqZWN0IGFyb3VuZCBpdCdzIGxvY2FsIHgtYXhpc1xyXG5cdCAqXHJcblx0ICogQHBhcmFtICAgIGFuZ2xlICAgICAgICBUaGUgYW1vdW50IG9mIHJvdGF0aW9uIGluIGRlZ3JlZXNcclxuXHQgKi9cclxuXHRwdWJsaWMgcGl0Y2goYW5nbGU6bnVtYmVyKVxyXG5cdHtcclxuXHRcdHRoaXMucm90YXRlKFZlY3RvcjNELlhfQVhJUywgYW5nbGUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0UmVuZGVyU2NlbmVUcmFuc2Zvcm0oY2FtZXJhOkNhbWVyYSk6TWF0cml4M0RcclxuXHR7XHJcblx0XHRpZiAodGhpcy5vcmllbnRhdGlvbk1vZGUgPT0gT3JpZW50YXRpb25Nb2RlLkNBTUVSQV9QTEFORSkge1xyXG5cdFx0XHR2YXIgY29tcHM6QXJyYXk8VmVjdG9yM0Q+ID0gY2FtZXJhLnNjZW5lVHJhbnNmb3JtLmRlY29tcG9zZSgpO1xyXG5cdFx0XHR2YXIgc2NhbGU6VmVjdG9yM0QgPSBjb21wc1syXTtcclxuXHRcdFx0Y29tcHNbMF0gPSB0aGlzLnNjZW5lUG9zaXRpb247XHJcblx0XHRcdHNjYWxlLnggPSB0aGlzLl9wU2NhbGVYO1xyXG5cdFx0XHRzY2FsZS55ID0gdGhpcy5fcFNjYWxlWTtcclxuXHRcdFx0c2NhbGUueiA9IHRoaXMuX3BTY2FsZVo7XHJcblx0XHRcdHRoaXMuX29yaWVudGF0aW9uTWF0cml4LnJlY29tcG9zZShjb21wcyk7XHJcblxyXG5cdFx0XHQvL2FkZCBpbiBjYXNlIG9mIHBpdm90XHJcblx0XHRcdGlmICghdGhpcy5fcGl2b3RaZXJvICYmIHRoaXMuYWxpZ25tZW50TW9kZSA9PSBBbGlnbm1lbnRNb2RlLlBJVk9UX1BPSU5UKVxyXG5cdFx0XHRcdHRoaXMuX29yaWVudGF0aW9uTWF0cml4LnByZXBlbmRUcmFuc2xhdGlvbigtdGhpcy5fcGl2b3QueC90aGlzLl9wU2NhbGVYLCAtdGhpcy5fcGl2b3QueS90aGlzLl9wU2NhbGVZLCAtdGhpcy5fcGl2b3Quei90aGlzLl9wU2NhbGVaKTtcclxuXHJcblx0XHRcdHJldHVybiB0aGlzLl9vcmllbnRhdGlvbk1hdHJpeDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcy5zY2VuZVRyYW5zZm9ybTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJvdGF0ZXMgdGhlIDNkIG9iamVjdCBhcm91bmQgaXQncyBsb2NhbCB6LWF4aXNcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAgICBhbmdsZSAgICAgICAgVGhlIGFtb3VudCBvZiByb3RhdGlvbiBpbiBkZWdyZWVzXHJcblx0ICovXHJcblx0cHVibGljIHJvbGwoYW5nbGU6bnVtYmVyKVxyXG5cdHtcclxuXHRcdHRoaXMucm90YXRlKFZlY3RvcjNELlpfQVhJUywgYW5nbGUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUm90YXRlcyB0aGUgM2Qgb2JqZWN0IGFyb3VuZCBhbiBheGlzIGJ5IGEgZGVmaW5lZCBhbmdsZVxyXG5cdCAqXHJcblx0ICogQHBhcmFtICAgIGF4aXMgICAgICAgIFRoZSB2ZWN0b3IgZGVmaW5pbmcgdGhlIGF4aXMgb2Ygcm90YXRpb25cclxuXHQgKiBAcGFyYW0gICAgYW5nbGUgICAgICAgIFRoZSBhbW91bnQgb2Ygcm90YXRpb24gaW4gZGVncmVlc1xyXG5cdCAqL1xyXG5cdHB1YmxpYyByb3RhdGUoYXhpczpWZWN0b3IzRCwgYW5nbGU6bnVtYmVyKVxyXG5cdHtcclxuXHRcdHZhciBtOk1hdHJpeDNEID0gbmV3IE1hdHJpeDNEKCk7XHJcblx0XHRtLnByZXBlbmRSb3RhdGlvbihhbmdsZSwgYXhpcyk7XHJcblxyXG5cdFx0dmFyIHZlYzpWZWN0b3IzRCA9IG0uZGVjb21wb3NlKClbMV07XHJcblxyXG5cdFx0dGhpcy5fcm90YXRpb25YICs9IHZlYy54O1xyXG5cdFx0dGhpcy5fcm90YXRpb25ZICs9IHZlYy55O1xyXG5cdFx0dGhpcy5fcm90YXRpb25aICs9IHZlYy56O1xyXG5cclxuXHRcdHRoaXMuaW52YWxpZGF0ZVJvdGF0aW9uKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSb3RhdGVzIHRoZSAzZCBvYmplY3QgZGlyZWN0bHkgdG8gYSBldWxlciBhbmdsZVxyXG5cdCAqXHJcblx0ICogQHBhcmFtICAgIGF4ICAgICAgICBUaGUgYW5nbGUgaW4gZGVncmVlcyBvZiB0aGUgcm90YXRpb24gYXJvdW5kIHRoZSB4IGF4aXMuXHJcblx0ICogQHBhcmFtICAgIGF5ICAgICAgICBUaGUgYW5nbGUgaW4gZGVncmVlcyBvZiB0aGUgcm90YXRpb24gYXJvdW5kIHRoZSB5IGF4aXMuXHJcblx0ICogQHBhcmFtICAgIGF6ICAgICAgICBUaGUgYW5nbGUgaW4gZGVncmVlcyBvZiB0aGUgcm90YXRpb24gYXJvdW5kIHRoZSB6IGF4aXMuXHJcblx0ICovXHJcblx0cHVibGljIHJvdGF0ZVRvKGF4Om51bWJlciwgYXk6bnVtYmVyLCBhejpudW1iZXIpXHJcblx0e1xyXG5cdFx0dGhpcy5fcm90YXRpb25YID0gYXgqTWF0aENvbnN0cy5ERUdSRUVTX1RPX1JBRElBTlM7XHJcblx0XHR0aGlzLl9yb3RhdGlvblkgPSBheSpNYXRoQ29uc3RzLkRFR1JFRVNfVE9fUkFESUFOUztcclxuXHRcdHRoaXMuX3JvdGF0aW9uWiA9IGF6Kk1hdGhDb25zdHMuREVHUkVFU19UT19SQURJQU5TO1xyXG5cclxuXHRcdHRoaXMuaW52YWxpZGF0ZVJvdGF0aW9uKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyByZW1vdmVFdmVudExpc3RlbmVyKHR5cGU6c3RyaW5nLCBsaXN0ZW5lcjpGdW5jdGlvbilcclxuXHR7XHJcblx0XHRzdXBlci5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKTtcclxuXHJcblx0XHRpZiAodGhpcy5oYXNFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHN3aXRjaCAodHlwZSkge1xyXG5cdFx0XHRjYXNlIERpc3BsYXlPYmplY3RFdmVudC5QT1NJVElPTl9DSEFOR0VEOlxyXG5cdFx0XHRcdHRoaXMuX2xpc3RlblRvUG9zaXRpb25DaGFuZ2VkID0gZmFsc2U7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIERpc3BsYXlPYmplY3RFdmVudC5ST1RBVElPTl9DSEFOR0VEOlxyXG5cdFx0XHRcdHRoaXMuX2xpc3RlblRvUm90YXRpb25DaGFuZ2VkID0gZmFsc2U7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIERpc3BsYXlPYmplY3RFdmVudC5TQ0FMRV9DSEFOR0VEOlxyXG5cdFx0XHRcdHRoaXMuX2xpc3RlblRvU2NhbGVDaGFuZ2VkID0gZmFsc2U7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNb3ZlcyB0aGUgM2Qgb2JqZWN0IGFsb25nIGEgdmVjdG9yIGJ5IGEgZGVmaW5lZCBsZW5ndGhcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAgICBheGlzICAgICAgICBUaGUgdmVjdG9yIGRlZmluaW5nIHRoZSBheGlzIG9mIG1vdmVtZW50XHJcblx0ICogQHBhcmFtICAgIGRpc3RhbmNlICAgIFRoZSBsZW5ndGggb2YgdGhlIG1vdmVtZW50XHJcblx0ICovXHJcblx0cHVibGljIHRyYW5zbGF0ZShheGlzOlZlY3RvcjNELCBkaXN0YW5jZTpudW1iZXIpXHJcblx0e1xyXG5cdFx0dmFyIHg6bnVtYmVyID0gYXhpcy54LCB5Om51bWJlciA9IGF4aXMueSwgejpudW1iZXIgPSBheGlzLno7XHJcblx0XHR2YXIgbGVuOm51bWJlciA9IGRpc3RhbmNlL01hdGguc3FydCh4KnggKyB5KnkgKyB6KnopO1xyXG5cclxuXHRcdHRoaXMuX3ggKz0geCpsZW47XHJcblx0XHR0aGlzLl95ICs9IHkqbGVuO1xyXG5cdFx0dGhpcy5feiArPSB6KmxlbjtcclxuXHJcblx0XHR0aGlzLmludmFsaWRhdGVQb3NpdGlvbigpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTW92ZXMgdGhlIDNkIG9iamVjdCBhbG9uZyBhIHZlY3RvciBieSBhIGRlZmluZWQgbGVuZ3RoXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gICAgYXhpcyAgICAgICAgVGhlIHZlY3RvciBkZWZpbmluZyB0aGUgYXhpcyBvZiBtb3ZlbWVudFxyXG5cdCAqIEBwYXJhbSAgICBkaXN0YW5jZSAgICBUaGUgbGVuZ3RoIG9mIHRoZSBtb3ZlbWVudFxyXG5cdCAqL1xyXG5cdHB1YmxpYyB0cmFuc2xhdGVMb2NhbChheGlzOlZlY3RvcjNELCBkaXN0YW5jZTpudW1iZXIpXHJcblx0e1xyXG5cdFx0dmFyIHg6bnVtYmVyID0gYXhpcy54LCB5Om51bWJlciA9IGF4aXMueSwgejpudW1iZXIgPSBheGlzLno7XHJcblx0XHR2YXIgbGVuOm51bWJlciA9IGRpc3RhbmNlL01hdGguc3FydCh4KnggKyB5KnkgKyB6KnopO1xyXG5cclxuXHRcdHRoaXMuX2lNYXRyaXgzRC5wcmVwZW5kVHJhbnNsYXRpb24oeCpsZW4sIHkqbGVuLCB6Kmxlbik7XHJcblxyXG5cdFx0dGhpcy5fbWF0cml4M0QuY29weUNvbHVtblRvKDMsIHRoaXMuX3Bvcyk7XHJcblxyXG5cdFx0dGhpcy5feCA9IHRoaXMuX3Bvcy54O1xyXG5cdFx0dGhpcy5feSA9IHRoaXMuX3Bvcy55O1xyXG5cdFx0dGhpcy5feiA9IHRoaXMuX3Bvcy56O1xyXG5cclxuXHRcdHRoaXMuaW52YWxpZGF0ZVBvc2l0aW9uKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSb3RhdGVzIHRoZSAzZCBvYmplY3QgYXJvdW5kIGl0J3MgbG9jYWwgeS1heGlzXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gICAgYW5nbGUgICAgICAgIFRoZSBhbW91bnQgb2Ygcm90YXRpb24gaW4gZGVncmVlc1xyXG5cdCAqL1xyXG5cdHB1YmxpYyB5YXcoYW5nbGU6bnVtYmVyKVxyXG5cdHtcclxuXHRcdHRoaXMucm90YXRlKFZlY3RvcjNELllfQVhJUywgYW5nbGUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQGludGVybmFsXHJcblx0ICovXHJcblx0cHVibGljIF9pQ29udHJvbGxlcjpDb250cm9sbGVyQmFzZTtcclxuXHJcblx0LyoqXHJcblx0ICogQGludGVybmFsXHJcblx0ICovXHJcblx0cHVibGljIGdldCBfaUFzc2lnbmVkUGFydGl0aW9uKCk6UGFydGl0aW9uXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BJbXBsaWNpdFBhcnRpdGlvbjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSB0cmFuc2Zvcm1hdGlvbiBvZiB0aGUgM2Qgb2JqZWN0LCByZWxhdGl2ZSB0byB0aGUgbG9jYWwgY29vcmRpbmF0ZXMgb2YgdGhlIHBhcmVudCA8Y29kZT5PYmplY3RDb250YWluZXIzRDwvY29kZT4uXHJcblx0ICpcclxuXHQgKiBAaW50ZXJuYWxcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IF9pTWF0cml4M0QoKTpNYXRyaXgzRFxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9tYXRyaXgzRERpcnR5KVxyXG5cdFx0XHR0aGlzLl9wVXBkYXRlTWF0cml4M0QoKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fbWF0cml4M0Q7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IF9pTWF0cml4M0QodmFsOk1hdHJpeDNEKVxyXG5cdHtcclxuXHJcblx0XHQvLyBUT0RPOiBGcm9tIEFTMyAtIERvIHdlIHN0aWxsIG5lZWQgdGhpcyBpbiBKUyA/XHJcblx0XHQvL3JpZGljdWxvdXMgbWF0cml4IGVycm9yXHJcblx0XHQvKlxyXG5cdFx0aWYgKCF2YWwucmF3RGF0YVswXSkge1xyXG5cclxuXHRcdFx0dmFyIHJhdzpudW1iZXJbXSA9IE1hdHJpeDNEVXRpbHMuUkFXX0RBVEFfQ09OVEFJTkVSO1xyXG5cdFx0XHR2YWwuY29weVJhd0RhdGFUbyhyYXcpO1xyXG5cdFx0XHRyYXdbMF0gPSB0aGlzLl9zbWFsbGVzdE51bWJlcjtcclxuXHRcdFx0dmFsLmNvcHlSYXdEYXRhRnJvbShyYXcpO1xyXG5cdFx0fVxyXG5cdFx0Ly8qL1xyXG5cdFx0dmFyIGVsZW1lbnRzOkFycmF5PFZlY3RvcjNEPiA9IHZhbC5kZWNvbXBvc2UoKTtcclxuXHRcdHZhciB2ZWM6VmVjdG9yM0Q7XHJcblxyXG5cdFx0dmVjID0gZWxlbWVudHNbMF07XHJcblxyXG5cdFx0aWYgKHRoaXMuX3ggIT0gdmVjLnggfHwgdGhpcy5feSAhPSB2ZWMueSB8fCB0aGlzLl96ICE9IHZlYy56KSB7XHJcblx0XHRcdHRoaXMuX3ggPSB2ZWMueDtcclxuXHRcdFx0dGhpcy5feSA9IHZlYy55O1xyXG5cdFx0XHR0aGlzLl96ID0gdmVjLno7XHJcblxyXG5cdFx0XHR0aGlzLmludmFsaWRhdGVQb3NpdGlvbigpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZlYyA9IGVsZW1lbnRzWzFdO1xyXG5cclxuXHRcdGlmICh0aGlzLl9yb3RhdGlvblggIT0gdmVjLnggfHwgdGhpcy5fcm90YXRpb25ZICE9IHZlYy55IHx8IHRoaXMuX3JvdGF0aW9uWiAhPSB2ZWMueikge1xyXG5cdFx0XHR0aGlzLl9yb3RhdGlvblggPSB2ZWMueDtcclxuXHRcdFx0dGhpcy5fcm90YXRpb25ZID0gdmVjLnk7XHJcblx0XHRcdHRoaXMuX3JvdGF0aW9uWiA9IHZlYy56O1xyXG5cclxuXHRcdFx0dGhpcy5pbnZhbGlkYXRlUm90YXRpb24oKTtcclxuXHRcdH1cclxuXHJcblx0XHR2ZWMgPSBlbGVtZW50c1syXTtcclxuXHJcblx0XHRpZiAodGhpcy5fcFNjYWxlWCAhPSB2ZWMueCB8fCB0aGlzLl9wU2NhbGVZICE9IHZlYy55IHx8IHRoaXMuX3BTY2FsZVogIT0gdmVjLnopIHtcclxuXHRcdFx0dGhpcy5fcFNjYWxlWCA9IHZlYy54O1xyXG5cdFx0XHR0aGlzLl9wU2NhbGVZID0gdmVjLnk7XHJcblx0XHRcdHRoaXMuX3BTY2FsZVogPSB2ZWMuejtcclxuXHJcblx0XHRcdHRoaXMuaW52YWxpZGF0ZVNjYWxlKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAaW50ZXJuYWxcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IF9pUGlja2luZ0NvbGxpc2lvblZPKCk6UGlja2luZ0NvbGxpc2lvblZPXHJcblx0e1xyXG5cdFx0aWYgKCF0aGlzLl9wUGlja2luZ0NvbGxpc2lvblZPKVxyXG5cdFx0XHR0aGlzLl9wUGlja2luZ0NvbGxpc2lvblZPID0gbmV3IFBpY2tpbmdDb2xsaXNpb25WTyh0aGlzKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fcFBpY2tpbmdDb2xsaXNpb25WTztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBpbnRlcm5hbFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBpU2V0UGFyZW50KHZhbHVlOkRpc3BsYXlPYmplY3RDb250YWluZXIpXHJcblx0e1xyXG5cdFx0dGhpcy5fcFBhcmVudCA9IHZhbHVlO1xyXG5cclxuXHRcdGlmICh2YWx1ZSkge1xyXG5cdFx0XHR0aGlzLl9wVXBkYXRlSW1wbGljaXRNb3VzZUVuYWJsZWQodmFsdWUubW91c2VDaGlsZHJlbik7XHJcblx0XHRcdHRoaXMuX3BVcGRhdGVJbXBsaWNpdFZpc2liaWxpdHkodmFsdWUuX2lJc1Zpc2libGUoKSk7XHJcblx0XHRcdHRoaXMuX3BVcGRhdGVJbXBsaWNpdFBhcnRpdGlvbih2YWx1ZS5faUFzc2lnbmVkUGFydGl0aW9uKTtcclxuXHRcdFx0dGhpcy5faVNldFNjZW5lKHZhbHVlLl9wU2NlbmUpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5fcFVwZGF0ZUltcGxpY2l0TW91c2VFbmFibGVkKHRydWUpO1xyXG5cdFx0XHR0aGlzLl9wVXBkYXRlSW1wbGljaXRWaXNpYmlsaXR5KHRydWUpO1xyXG5cdFx0XHR0aGlzLl9wVXBkYXRlSW1wbGljaXRQYXJ0aXRpb24obnVsbCk7XHJcblxyXG5cdFx0XHR0aGlzLl9pU2V0U2NlbmUobnVsbCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAcHJvdGVjdGVkXHJcblx0ICovXHJcblx0cHVibGljIHBDcmVhdGVEZWZhdWx0Qm91bmRpbmdWb2x1bWUoKTpCb3VuZGluZ1ZvbHVtZUJhc2VcclxuXHR7XHJcblx0XHQvLyBwb2ludCBsaWdodHMgc2hvdWxkIGJlIHVzaW5nIHNwaGVyZSBib3VuZHNcclxuXHRcdC8vIGRpcmVjdGlvbmFsIGxpZ2h0cyBzaG91bGQgYmUgdXNpbmcgbnVsbCBib3VuZHNcclxuXHRcdHJldHVybiBuZXcgQXhpc0FsaWduZWRCb3VuZGluZ0JveCgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHByb3RlY3RlZFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBwQ3JlYXRlRW50aXR5UGFydGl0aW9uTm9kZSgpOkVudGl0eU5vZGVcclxuXHR7XHJcblx0XHR0aHJvdyBuZXcgQWJzdHJhY3RNZXRob2RFcnJvcigpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHByb3RlY3RlZFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBwSW52YWxpZGF0ZUJvdW5kcygpXHJcblx0e1xyXG5cdFx0dGhpcy5fcEJvdW5kc0ludmFsaWQgPSB0cnVlO1xyXG5cdFx0dGhpcy5fd29ybGRCb3VuZHNJbnZhbGlkID0gdHJ1ZTtcclxuXHJcblxyXG5cdFx0aWYgKHRoaXMuaXNFbnRpdHkpXHJcblx0XHRcdHRoaXMuaW52YWxpZGF0ZVBhcnRpdGlvbigpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHByb3RlY3RlZFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBwSW52YWxpZGF0ZVNjZW5lVHJhbnNmb3JtKClcclxuXHR7XHJcblx0XHR0aGlzLl9wU2NlbmVUcmFuc2Zvcm1EaXJ0eSA9ICF0aGlzLl9wSWdub3JlVHJhbnNmb3JtO1xyXG5cdFx0dGhpcy5faW52ZXJzZVNjZW5lVHJhbnNmb3JtRGlydHkgPSAhdGhpcy5fcElnbm9yZVRyYW5zZm9ybTtcclxuXHRcdHRoaXMuX3NjZW5lUG9zaXRpb25EaXJ0eSA9ICF0aGlzLl9wSWdub3JlVHJhbnNmb3JtO1xyXG5cclxuXHRcdHRoaXMuX3dvcmxkQm91bmRzSW52YWxpZCA9ICF0aGlzLl9wSWdub3JlVHJhbnNmb3JtO1xyXG5cclxuXHRcdGlmICh0aGlzLmlzRW50aXR5KVxyXG5cdFx0XHR0aGlzLmludmFsaWRhdGVQYXJ0aXRpb24oKTtcclxuXHJcblx0XHRpZiAodGhpcy5fbGlzdGVuVG9TY2VuZVRyYW5zZm9ybUNoYW5nZWQpXHJcblx0XHRcdHRoaXMubm90aWZ5U2NlbmVUcmFuc2Zvcm1DaGFuZ2UoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwcm90ZWN0ZWRcclxuXHQgKi9cclxuXHRwdWJsaWMgcFVwZGF0ZUJvdW5kcygpXHJcblx0e1xyXG5cdFx0dGhpcy5fd2lkdGggPSB0aGlzLl9wQm91bmRzLmFhYmIud2lkdGgqdGhpcy5fcFNjYWxlWDtcclxuXHRcdHRoaXMuX2hlaWdodCA9IHRoaXMuX3BCb3VuZHMuYWFiYi5oZWlnaHQqdGhpcy5fcFNjYWxlWTtcclxuXHRcdHRoaXMuX2RlcHRoID0gdGhpcy5fcEJvdW5kcy5hYWJiLmRlcHRoKnRoaXMuX3BTY2FsZVo7XHJcblxyXG5cdFx0dGhpcy5fcEJvdW5kc0ludmFsaWQgPSBmYWxzZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwcm90ZWN0ZWRcclxuXHQgKi9cclxuXHRwdWJsaWMgX3BVcGRhdGVJbXBsaWNpdE1vdXNlRW5hYmxlZCh2YWx1ZTpib29sZWFuKVxyXG5cdHtcclxuXHRcdHRoaXMuX3BJbXBsaWNpdE1vdXNlRW5hYmxlZCA9IHRoaXMuX2V4cGxpY2l0TW91c2VFbmFibGVkICYmIHZhbHVlO1xyXG5cclxuXHRcdC8vIElmIHRoZXJlIGlzIGEgcGFyZW50IGFuZCB0aGlzIGNoaWxkIGRvZXMgbm90IGhhdmUgYSBwaWNraW5nIGNvbGxpZGVyLCB1c2UgaXRzIHBhcmVudCdzIHBpY2tpbmcgY29sbGlkZXIuXHJcblx0XHRpZiAodGhpcy5fcEltcGxpY2l0TW91c2VFbmFibGVkICYmIHRoaXMuX3BQYXJlbnQgJiYgIXRoaXMuX3BQaWNraW5nQ29sbGlkZXIpXHJcblx0XHRcdHRoaXMuX3BQaWNraW5nQ29sbGlkZXIgPSAgdGhpcy5fcFBhcmVudC5fcFBpY2tpbmdDb2xsaWRlcjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwcm90ZWN0ZWRcclxuXHQgKi9cclxuXHRwdWJsaWMgX3BVcGRhdGVJbXBsaWNpdFBhcnRpdGlvbih2YWx1ZTpQYXJ0aXRpb24pXHJcblx0e1xyXG5cdFx0Ly8gYXNzaWduIHBhcmVudCBpbXBsaWNpdCBwYXJ0aXRpb24gaWYgbm8gZXhwbGljaXQgb25lIGlzIGdpdmVuXHJcblx0XHR0aGlzLl9wSW1wbGljaXRQYXJ0aXRpb24gPSB0aGlzLl9leHBsaWNpdFBhcnRpdGlvbiB8fCB2YWx1ZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwcm90ZWN0ZWRcclxuXHQgKi9cclxuXHRwdWJsaWMgX3BVcGRhdGVJbXBsaWNpdFZpc2liaWxpdHkodmFsdWU6Ym9vbGVhbilcclxuXHR7XHJcblx0XHR0aGlzLl9wSW1wbGljaXRWaXNpYmlsaXR5ID0gdGhpcy5fZXhwbGljaXRWaXNpYmlsaXR5ICYmIHZhbHVlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHByb3RlY3RlZFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBfcFVwZGF0ZU1hdHJpeDNEKClcclxuXHR7XHJcblxyXG5cdFx0dGhpcy5fcG9zLnggPSB0aGlzLl94O1xyXG5cdFx0dGhpcy5fcG9zLnkgPSB0aGlzLl95O1xyXG5cdFx0dGhpcy5fcG9zLnogPSB0aGlzLl96O1xyXG5cclxuXHRcdHRoaXMuX3JvdC54ID0gdGhpcy5fcm90YXRpb25YO1xyXG5cdFx0dGhpcy5fcm90LnkgPSB0aGlzLl9yb3RhdGlvblk7XHJcblx0XHR0aGlzLl9yb3QueiA9IHRoaXMuX3JvdGF0aW9uWjtcclxuXHJcblx0XHR0aGlzLl9zY2EueCA9IHRoaXMuX3BTY2FsZVg7XHJcblx0XHR0aGlzLl9zY2EueSA9IHRoaXMuX3BTY2FsZVk7XHJcblx0XHR0aGlzLl9zY2EueiA9IHRoaXMuX3BTY2FsZVo7XHJcblxyXG5cdFx0dGhpcy5fbWF0cml4M0QucmVjb21wb3NlKHRoaXMuX3RyYW5zZm9ybUNvbXBvbmVudHMpO1xyXG5cclxuXHRcdGlmICghdGhpcy5fcGl2b3RaZXJvKSB7XHJcblx0XHRcdHRoaXMuX21hdHJpeDNELnByZXBlbmRUcmFuc2xhdGlvbigtdGhpcy5fcGl2b3QueC90aGlzLl9wU2NhbGVYLCAtdGhpcy5fcGl2b3QueS90aGlzLl9wU2NhbGVZLCAtdGhpcy5fcGl2b3Quei90aGlzLl9wU2NhbGVaKTtcclxuXHRcdFx0aWYgKHRoaXMuYWxpZ25tZW50TW9kZSAhPSBBbGlnbm1lbnRNb2RlLlBJVk9UX1BPSU5UKVxyXG5cdFx0XHRcdHRoaXMuX21hdHJpeDNELmFwcGVuZFRyYW5zbGF0aW9uKHRoaXMuX3Bpdm90LngsIHRoaXMuX3Bpdm90LnksIHRoaXMuX3Bpdm90LnopO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX21hdHJpeDNERGlydHkgPSBmYWxzZTtcclxuXHRcdHRoaXMuX3Bvc2l0aW9uRGlydHkgPSBmYWxzZTtcclxuXHRcdHRoaXMuX3JvdGF0aW9uRGlydHkgPSBmYWxzZTtcclxuXHRcdHRoaXMuX3NjYWxlRGlydHkgPSBmYWxzZTtcclxuXHRcdHRoaXMuX3Bpdm90RGlydHkgPSBmYWxzZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwcm90ZWN0ZWRcclxuXHQgKi9cclxuXHRwdWJsaWMgcFVwZGF0ZVNjZW5lVHJhbnNmb3JtKClcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fcFBhcmVudCAmJiAhdGhpcy5fcFBhcmVudC5faUlzUm9vdCkge1xyXG5cdFx0XHR0aGlzLl9wU2NlbmVUcmFuc2Zvcm0uY29weUZyb20odGhpcy5fcFBhcmVudC5zY2VuZVRyYW5zZm9ybSk7XHJcblx0XHRcdHRoaXMuX3BTY2VuZVRyYW5zZm9ybS5wcmVwZW5kKHRoaXMuX2lNYXRyaXgzRCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLl9wU2NlbmVUcmFuc2Zvcm0uY29weUZyb20odGhpcy5faU1hdHJpeDNEKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLl9wU2NlbmVUcmFuc2Zvcm1EaXJ0eSA9IGZhbHNlO1xyXG5cdH1cclxuXHJcblx0cHVibGljIF9pQWRkUmVuZGVyYWJsZShyZW5kZXJhYmxlOklSZW5kZXJhYmxlKTpJUmVuZGVyYWJsZVxyXG5cdHtcclxuXHRcdHRoaXMuX3BSZW5kZXJhYmxlcy5wdXNoKHJlbmRlcmFibGUpO1xyXG5cclxuXHRcdHJldHVybiByZW5kZXJhYmxlO1xyXG5cdH1cclxuXHJcblxyXG5cdHB1YmxpYyBfaVJlbW92ZVJlbmRlcmFibGUocmVuZGVyYWJsZTpJUmVuZGVyYWJsZSk6SVJlbmRlcmFibGVcclxuXHR7XHJcblx0XHR2YXIgaW5kZXg6bnVtYmVyID0gdGhpcy5fcFJlbmRlcmFibGVzLmluZGV4T2YocmVuZGVyYWJsZSk7XHJcblxyXG5cdFx0dGhpcy5fcFJlbmRlcmFibGVzLnNwbGljZShpbmRleCwgMSk7XHJcblxyXG5cdFx0cmV0dXJuIHJlbmRlcmFibGU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiAvL1RPRE9cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzaG9ydGVzdENvbGxpc2lvbkRpc3RhbmNlXHJcblx0ICogQHBhcmFtIGZpbmRDbG9zZXN0XHJcblx0ICogQHJldHVybnMge2Jvb2xlYW59XHJcblx0ICpcclxuXHQgKiBAaW50ZXJuYWxcclxuXHQgKi9cclxuXHRwdWJsaWMgX2lUZXN0Q29sbGlzaW9uKHNob3J0ZXN0Q29sbGlzaW9uRGlzdGFuY2U6bnVtYmVyLCBmaW5kQ2xvc2VzdDpib29sZWFuKTpib29sZWFuXHJcblx0e1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgX2lJbnRlcm5hbFVwZGF0ZSgpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX2lDb250cm9sbGVyKVxyXG5cdFx0XHR0aGlzLl9pQ29udHJvbGxlci51cGRhdGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBpbnRlcm5hbFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBfaUlzVmlzaWJsZSgpOmJvb2xlYW5cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcEltcGxpY2l0VmlzaWJpbGl0eTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBpbnRlcm5hbFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBfaUlzTW91c2VFbmFibGVkKCk6Ym9vbGVhblxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9wSW1wbGljaXRNb3VzZUVuYWJsZWQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAaW50ZXJuYWxcclxuXHQgKi9cclxuXHRwdWJsaWMgX2lTZXRTY2VuZSh2YWx1ZTpTY2VuZSlcclxuXHR7XHJcblx0XHQvLyB0ZXN0IHRvIHNlZSBpZiB3ZSdyZSBzd2l0Y2hpbmcgcm9vdHMgd2hpbGUgd2UncmUgYWxyZWFkeSB1c2luZyBhIHNjZW5lIHBhcnRpdGlvblxyXG5cdFx0LypcclxuXHRcdGlmICh2YWx1ZSA9PSBudWxsKVxyXG5cdFx0XHR0aGlzLl9vbGRTY2VuZSA9IHRoaXMuX3BTY2VuZTtcclxuXHJcblx0XHRpZiAodGhpcy5fZXhwbGljaXRQYXJ0aXRpb24gJiYgdGhpcy5fb2xkU2NlbmUgJiYgdGhpcy5fb2xkU2NlbmUgIT0gdGhpcy5fcFNjZW5lKVxyXG5cdFx0XHR0aGlzLnBhcnRpdGlvbiA9IG51bGw7XHJcblxyXG5cdFx0aWYgKHZhbHVlKVxyXG5cdFx0XHR0aGlzLl9vbGRTY2VuZSA9IG51bGw7XHJcblxyXG5cdFx0Ly8gZW5kIG9mIHN0dXBpZCBwYXJ0aXRpb24gdGVzdCBjb2RlXHJcblx0XHQvLyovXHJcblxyXG5cdFx0aWYgKHRoaXMuX3BTY2VuZSA9PSB2YWx1ZSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX3BVcGRhdGVTY2VuZSh2YWx1ZSk7XHJcblxyXG5cdFx0aWYgKCF0aGlzLl9wU2NlbmVUcmFuc2Zvcm1EaXJ0eSAmJiAhdGhpcy5fcElnbm9yZVRyYW5zZm9ybSlcclxuXHRcdFx0dGhpcy5wSW52YWxpZGF0ZVNjZW5lVHJhbnNmb3JtKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAcHJvdGVjdGVkXHJcblx0ICovXHJcblx0cHVibGljIF9wVXBkYXRlU2NlbmUodmFsdWU6U2NlbmUpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX3BTY2VuZSkge1xyXG5cdFx0XHR0aGlzLl9wU2NlbmUuZGlzcGF0Y2hFdmVudChuZXcgU2NlbmVFdmVudChTY2VuZUV2ZW50LlJFTU9WRURfRlJPTV9TQ0VORSwgdGhpcykpO1xyXG5cclxuXHRcdFx0Ly91bnJlZ2lzdGVyIGVudGl0eSBmcm9tIGN1cnJlbnQgc2NlbmVcclxuXHRcdFx0dGhpcy5fcFNjZW5lLmlVbnJlZ2lzdGVyRW50aXR5KHRoaXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX3BTY2VuZSA9IHZhbHVlO1xyXG5cclxuXHRcdGlmICh2YWx1ZSkge1xyXG5cdFx0XHR2YWx1ZS5kaXNwYXRjaEV2ZW50KG5ldyBTY2VuZUV2ZW50KFNjZW5lRXZlbnQuQURERURfVE9fU0NFTkUsIHRoaXMpKTtcclxuXHJcblx0XHRcdC8vcmVnaXN0ZXIgZW50aXR5IHdpdGggbmV3IHNjZW5lXHJcblx0XHRcdHZhbHVlLmlSZWdpc3RlckVudGl0eSh0aGlzKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLm5vdGlmeVNjZW5lQ2hhbmdlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgbm90aWZ5UG9zaXRpb25DaGFuZ2VkKClcclxuXHR7XHJcblx0XHRpZiAoIXRoaXMuX3Bvc2l0aW9uQ2hhbmdlZClcclxuXHRcdFx0dGhpcy5fcG9zaXRpb25DaGFuZ2VkID0gbmV3IERpc3BsYXlPYmplY3RFdmVudChEaXNwbGF5T2JqZWN0RXZlbnQuUE9TSVRJT05fQ0hBTkdFRCwgdGhpcyk7XHJcblxyXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KHRoaXMuX3Bvc2l0aW9uQ2hhbmdlZCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgbm90aWZ5Um90YXRpb25DaGFuZ2VkKClcclxuXHR7XHJcblx0XHRpZiAoIXRoaXMuX3JvdGF0aW9uQ2hhbmdlZClcclxuXHRcdFx0dGhpcy5fcm90YXRpb25DaGFuZ2VkID0gbmV3IERpc3BsYXlPYmplY3RFdmVudChEaXNwbGF5T2JqZWN0RXZlbnQuUk9UQVRJT05fQ0hBTkdFRCwgdGhpcyk7XHJcblxyXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KHRoaXMuX3JvdGF0aW9uQ2hhbmdlZCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgbm90aWZ5U2NhbGVDaGFuZ2VkKClcclxuXHR7XHJcblx0XHRpZiAoIXRoaXMuX3NjYWxlQ2hhbmdlZClcclxuXHRcdFx0dGhpcy5fc2NhbGVDaGFuZ2VkID0gbmV3IERpc3BsYXlPYmplY3RFdmVudChEaXNwbGF5T2JqZWN0RXZlbnQuU0NBTEVfQ0hBTkdFRCwgdGhpcyk7XHJcblxyXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KHRoaXMuX3NjYWxlQ2hhbmdlZCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgbm90aWZ5U2NlbmVDaGFuZ2UoKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9saXN0ZW5Ub1NjZW5lQ2hhbmdlZCkge1xyXG5cdFx0XHRpZiAoIXRoaXMuX3NjZW5lY2hhbmdlZClcclxuXHRcdFx0XHR0aGlzLl9zY2VuZWNoYW5nZWQgPSBuZXcgRGlzcGxheU9iamVjdEV2ZW50KERpc3BsYXlPYmplY3RFdmVudC5TQ0VORV9DSEFOR0VELCB0aGlzKTtcclxuXHJcblx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudCh0aGlzLl9zY2VuZWNoYW5nZWQpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIG5vdGlmeVNjZW5lVHJhbnNmb3JtQ2hhbmdlKClcclxuXHR7XHJcblx0XHRpZiAoIXRoaXMuX3NjZW5lVHJhbnNmb3JtQ2hhbmdlZClcclxuXHRcdFx0dGhpcy5fc2NlbmVUcmFuc2Zvcm1DaGFuZ2VkID0gbmV3IERpc3BsYXlPYmplY3RFdmVudChEaXNwbGF5T2JqZWN0RXZlbnQuU0NFTkVUUkFOU0ZPUk1fQ0hBTkdFRCwgdGhpcyk7XHJcblxyXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KHRoaXMuX3NjZW5lVHJhbnNmb3JtQ2hhbmdlZCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJbnZhbGlkYXRlcyB0aGUgM0QgdHJhbnNmb3JtYXRpb24gbWF0cml4LCBjYXVzaW5nIGl0IHRvIGJlIHVwZGF0ZWQgdXBvbiB0aGUgbmV4dCByZXF1ZXN0XHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaW52YWxpZGF0ZU1hdHJpeDNEKCk6dm9pZFxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9tYXRyaXgzRERpcnR5KVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fbWF0cml4M0REaXJ0eSA9IHRydWU7XHJcblxyXG5cdFx0aWYgKCF0aGlzLl9wU2NlbmVUcmFuc2Zvcm1EaXJ0eSAmJiAhdGhpcy5fcElnbm9yZVRyYW5zZm9ybSlcclxuXHRcdFx0dGhpcy5wSW52YWxpZGF0ZVNjZW5lVHJhbnNmb3JtKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaW52YWxpZGF0ZVBhcnRpdGlvbigpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX2lBc3NpZ25lZFBhcnRpdGlvbilcclxuXHRcdFx0dGhpcy5faUFzc2lnbmVkUGFydGl0aW9uLmlNYXJrRm9yVXBkYXRlKHRoaXMpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIGludmFsaWRhdGVQaXZvdCgpXHJcblx0e1xyXG5cdFx0dGhpcy5fcGl2b3RaZXJvID0gKHRoaXMuX3Bpdm90LnggPT0gMCkgJiYgKHRoaXMuX3Bpdm90LnkgPT0gMCkgJiYgKHRoaXMuX3Bpdm90LnogPT0gMCk7XHJcblxyXG5cdFx0aWYgKHRoaXMuX3Bpdm90RGlydHkpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9waXZvdERpcnR5ID0gdHJ1ZTtcclxuXHJcblx0XHR0aGlzLmludmFsaWRhdGVNYXRyaXgzRCgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIGludmFsaWRhdGVQb3NpdGlvbigpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX3Bvc2l0aW9uRGlydHkpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9wb3NpdGlvbkRpcnR5ID0gdHJ1ZTtcclxuXHJcblx0XHR0aGlzLmludmFsaWRhdGVNYXRyaXgzRCgpO1xyXG5cclxuXHRcdGlmICh0aGlzLl9saXN0ZW5Ub1Bvc2l0aW9uQ2hhbmdlZClcclxuXHRcdFx0dGhpcy5ub3RpZnlQb3NpdGlvbkNoYW5nZWQoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBpbnZhbGlkYXRlUm90YXRpb24oKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9yb3RhdGlvbkRpcnR5KVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fcm90YXRpb25EaXJ0eSA9IHRydWU7XHJcblxyXG5cdFx0dGhpcy5pbnZhbGlkYXRlTWF0cml4M0QoKTtcclxuXHJcblx0XHRpZiAodGhpcy5fbGlzdGVuVG9Sb3RhdGlvbkNoYW5nZWQpXHJcblx0XHRcdHRoaXMubm90aWZ5Um90YXRpb25DaGFuZ2VkKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaW52YWxpZGF0ZVNjYWxlKClcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fc2NhbGVEaXJ0eSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX3NjYWxlRGlydHkgPSB0cnVlO1xyXG5cclxuXHRcdHRoaXMuaW52YWxpZGF0ZU1hdHJpeDNEKCk7XHJcblxyXG5cdFx0aWYgKHRoaXMuX2xpc3RlblRvU2NhbGVDaGFuZ2VkKVxyXG5cdFx0XHR0aGlzLm5vdGlmeVNjYWxlQ2hhbmdlZCgpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0ID0gRGlzcGxheU9iamVjdDsiXX0=