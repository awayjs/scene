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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0Rpc3BsYXlPYmplY3QudHMiXSwibmFtZXMiOlsiRGlzcGxheU9iamVjdCIsIkRpc3BsYXlPYmplY3QuY29uc3RydWN0b3IiLCJEaXNwbGF5T2JqZWN0LmJvdW5kcyIsIkRpc3BsYXlPYmplY3QuZGVwdGgiLCJEaXNwbGF5T2JqZWN0LmV1bGVycyIsIkRpc3BsYXlPYmplY3QuaGVpZ2h0IiwiRGlzcGxheU9iamVjdC5pbmRleCIsIkRpc3BsYXlPYmplY3QuaW52ZXJzZVNjZW5lVHJhbnNmb3JtIiwiRGlzcGxheU9iamVjdC5pZ25vcmVUcmFuc2Zvcm0iLCJEaXNwbGF5T2JqZWN0LmlzRW50aXR5IiwiRGlzcGxheU9iamVjdC5sb2FkZXJJbmZvIiwiRGlzcGxheU9iamVjdC5tb3VzZUVuYWJsZWQiLCJEaXNwbGF5T2JqZWN0Lm1vdXNlWCIsIkRpc3BsYXlPYmplY3QubW91c2VZIiwiRGlzcGxheU9iamVjdC5wYXJlbnQiLCJEaXNwbGF5T2JqZWN0LnBhcnRpdGlvbiIsIkRpc3BsYXlPYmplY3QucGFydGl0aW9uTm9kZSIsIkRpc3BsYXlPYmplY3QucGlja2luZ0NvbGxpZGVyIiwiRGlzcGxheU9iamVjdC5waXZvdCIsIkRpc3BsYXlPYmplY3Qucm9vdCIsIkRpc3BsYXlPYmplY3Qucm90YXRpb25YIiwiRGlzcGxheU9iamVjdC5yb3RhdGlvblkiLCJEaXNwbGF5T2JqZWN0LnJvdGF0aW9uWiIsIkRpc3BsYXlPYmplY3Quc2NhbGVYIiwiRGlzcGxheU9iamVjdC5zY2FsZVkiLCJEaXNwbGF5T2JqZWN0LnNjYWxlWiIsIkRpc3BsYXlPYmplY3Quc2NlbmUiLCJEaXNwbGF5T2JqZWN0LnNjZW5lUG9zaXRpb24iLCJEaXNwbGF5T2JqZWN0LnNjZW5lVHJhbnNmb3JtIiwiRGlzcGxheU9iamVjdC5zaGFkZXJQaWNraW5nRGV0YWlscyIsIkRpc3BsYXlPYmplY3QuYm91bmRzVmlzaWJsZSIsIkRpc3BsYXlPYmplY3QudHJhbnNmb3JtIiwiRGlzcGxheU9iamVjdC52aXNpYmxlIiwiRGlzcGxheU9iamVjdC53aWR0aCIsIkRpc3BsYXlPYmplY3Qud29ybGRCb3VuZHMiLCJEaXNwbGF5T2JqZWN0LngiLCJEaXNwbGF5T2JqZWN0LnkiLCJEaXNwbGF5T2JqZWN0LnoiLCJEaXNwbGF5T2JqZWN0LnpPZmZzZXQiLCJEaXNwbGF5T2JqZWN0LmFkZEV2ZW50TGlzdGVuZXIiLCJEaXNwbGF5T2JqZWN0LmNsb25lIiwiRGlzcGxheU9iamVjdC5kaXNwb3NlIiwiRGlzcGxheU9iamVjdC5kaXNwb3NlQXNzZXQiLCJEaXNwbGF5T2JqZWN0LmdldEJvdW5kcyIsIkRpc3BsYXlPYmplY3QuZ2V0UmVjdCIsIkRpc3BsYXlPYmplY3QuZ2xvYmFsVG9Mb2NhbCIsIkRpc3BsYXlPYmplY3QuZ2xvYmFsVG9Mb2NhbDNEIiwiRGlzcGxheU9iamVjdC5oaXRUZXN0T2JqZWN0IiwiRGlzcGxheU9iamVjdC5oaXRUZXN0UG9pbnQiLCJEaXNwbGF5T2JqZWN0LmlzSW50ZXJzZWN0aW5nUmF5IiwiRGlzcGxheU9iamVjdC5sb2NhbDNEVG9HbG9iYWwiLCJEaXNwbGF5T2JqZWN0Lmxvb2tBdCIsIkRpc3BsYXlPYmplY3QubG9jYWxUb0dsb2JhbCIsIkRpc3BsYXlPYmplY3QubW92ZVRvIiwiRGlzcGxheU9iamVjdC5tb3ZlUGl2b3QiLCJEaXNwbGF5T2JqZWN0LnBpdGNoIiwiRGlzcGxheU9iamVjdC5nZXRSZW5kZXJTY2VuZVRyYW5zZm9ybSIsIkRpc3BsYXlPYmplY3Qucm9sbCIsIkRpc3BsYXlPYmplY3Qucm90YXRlIiwiRGlzcGxheU9iamVjdC5yb3RhdGVUbyIsIkRpc3BsYXlPYmplY3QucmVtb3ZlRXZlbnRMaXN0ZW5lciIsIkRpc3BsYXlPYmplY3QudHJhbnNsYXRlIiwiRGlzcGxheU9iamVjdC50cmFuc2xhdGVMb2NhbCIsIkRpc3BsYXlPYmplY3QueWF3IiwiRGlzcGxheU9iamVjdC5faUFzc2lnbmVkUGFydGl0aW9uIiwiRGlzcGxheU9iamVjdC5faU1hdHJpeDNEIiwiRGlzcGxheU9iamVjdC5faVBpY2tpbmdDb2xsaXNpb25WTyIsIkRpc3BsYXlPYmplY3QuaVNldFBhcmVudCIsIkRpc3BsYXlPYmplY3QucENyZWF0ZURlZmF1bHRCb3VuZGluZ1ZvbHVtZSIsIkRpc3BsYXlPYmplY3QucENyZWF0ZUVudGl0eVBhcnRpdGlvbk5vZGUiLCJEaXNwbGF5T2JqZWN0LnBJbnZhbGlkYXRlQm91bmRzIiwiRGlzcGxheU9iamVjdC5wSW52YWxpZGF0ZVNjZW5lVHJhbnNmb3JtIiwiRGlzcGxheU9iamVjdC5wVXBkYXRlQm91bmRzIiwiRGlzcGxheU9iamVjdC5fcFVwZGF0ZUltcGxpY2l0TW91c2VFbmFibGVkIiwiRGlzcGxheU9iamVjdC5fcFVwZGF0ZUltcGxpY2l0UGFydGl0aW9uIiwiRGlzcGxheU9iamVjdC5fcFVwZGF0ZUltcGxpY2l0VmlzaWJpbGl0eSIsIkRpc3BsYXlPYmplY3QuX3BVcGRhdGVNYXRyaXgzRCIsIkRpc3BsYXlPYmplY3QucFVwZGF0ZVNjZW5lVHJhbnNmb3JtIiwiRGlzcGxheU9iamVjdC5faUFkZFJlbmRlcmFibGUiLCJEaXNwbGF5T2JqZWN0Ll9pUmVtb3ZlUmVuZGVyYWJsZSIsIkRpc3BsYXlPYmplY3QuX2lUZXN0Q29sbGlzaW9uIiwiRGlzcGxheU9iamVjdC5faUludGVybmFsVXBkYXRlIiwiRGlzcGxheU9iamVjdC5faUlzVmlzaWJsZSIsIkRpc3BsYXlPYmplY3QuX2lJc01vdXNlRW5hYmxlZCIsIkRpc3BsYXlPYmplY3QuX2lTZXRTY2VuZSIsIkRpc3BsYXlPYmplY3QuX3BVcGRhdGVTY2VuZSIsIkRpc3BsYXlPYmplY3Qubm90aWZ5UG9zaXRpb25DaGFuZ2VkIiwiRGlzcGxheU9iamVjdC5ub3RpZnlSb3RhdGlvbkNoYW5nZWQiLCJEaXNwbGF5T2JqZWN0Lm5vdGlmeVNjYWxlQ2hhbmdlZCIsIkRpc3BsYXlPYmplY3Qubm90aWZ5U2NlbmVDaGFuZ2UiLCJEaXNwbGF5T2JqZWN0Lm5vdGlmeVNjZW5lVHJhbnNmb3JtQ2hhbmdlIiwiRGlzcGxheU9iamVjdC5pbnZhbGlkYXRlTWF0cml4M0QiLCJEaXNwbGF5T2JqZWN0LmludmFsaWRhdGVQYXJ0aXRpb24iLCJEaXNwbGF5T2JqZWN0LmludmFsaWRhdGVQaXZvdCIsIkRpc3BsYXlPYmplY3QuaW52YWxpZGF0ZVBvc2l0aW9uIiwiRGlzcGxheU9iamVjdC5pbnZhbGlkYXRlUm90YXRpb24iLCJEaXNwbGF5T2JqZWN0LmludmFsaWRhdGVTY2FsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTyxzQkFBc0IsV0FBVywrQ0FBK0MsQ0FBQyxDQUFDO0FBRXpGLElBQU8sVUFBVSxXQUFjLGlDQUFpQyxDQUFDLENBQUM7QUFDbEUsSUFBTyxRQUFRLFdBQWUsK0JBQStCLENBQUMsQ0FBQztBQUMvRCxJQUFPLGFBQWEsV0FBYSxvQ0FBb0MsQ0FBQyxDQUFDO0FBQ3ZFLElBQU8sS0FBSyxXQUFlLDRCQUE0QixDQUFDLENBQUM7QUFFekQsSUFBTyxRQUFRLFdBQWUsK0JBQStCLENBQUMsQ0FBQztBQUMvRCxJQUFPLGNBQWMsV0FBYSx3Q0FBd0MsQ0FBQyxDQUFDO0FBQzVFLElBQU8sbUJBQW1CLFdBQVksNENBQTRDLENBQUMsQ0FBQztBQUtwRixJQUFPLGFBQWEsV0FBYSx1Q0FBdUMsQ0FBQyxDQUFDO0FBRzFFLElBQU8sZUFBZSxXQUFhLHlDQUF5QyxDQUFDLENBQUM7QUFFOUUsSUFBTyxTQUFTLFdBQWMsbUNBQW1DLENBQUMsQ0FBQztBQUluRSxJQUFPLGtCQUFrQixXQUFZLDRDQUE0QyxDQUFDLENBQUM7QUFHbkYsSUFBTyxrQkFBa0IsV0FBWSw4Q0FBOEMsQ0FBQyxDQUFDO0FBQ3JGLElBQU8sVUFBVSxXQUFjLHNDQUFzQyxDQUFDLENBQUM7QUFHdkUsQUFpSUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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QUdBLENBQUNBLENBQUNBO1lBQ1pBLEtBQUtBLENBQUNBLFNBQVNBLEVBQUVBLENBQUNBO1FBQ25CQSxDQUFDQTtRQUVEQSxLQUFLQSxHQUFHQSxLQUFLQSxDQUFDQSxZQUFZQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtRQUVsQ0EsR0FBR0EsR0FBR0EsYUFBYUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQTtRQUV2Q0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDakJBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBO1FBQ2pCQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNqQkEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7UUFFWEEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDakJBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBO1FBQ2pCQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNqQkEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7UUFFWEEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDakJBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBO1FBQ2pCQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNsQkEsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7UUFFWkEsSUFBSUEsQ0FBQ0EsR0FBWUEsSUFBSUEsUUFBUUEs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QkFFaEJBLElBQUlBLENBQUNBLGtCQUFrQkEsRUFBRUEsQ0FBQ0E7WUFDM0JBLENBQUNBO1lBRURBLEdBQUdBLEdBQUdBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBRWxCQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxVQUFVQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxVQUFVQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDdEZBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO2dCQUN4QkEsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3hCQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFFeEJBLElBQUlBLENBQUNBLGtCQUFrQkEsRUFBRUEsQ0FBQ0E7WUFDM0JBLENBQUNBO1lBRURBLEdBQUdBLEdBQUdBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBRWxCQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxRQUFRQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxRQUFRQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDaEZBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO2dCQUN0QkEsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3RCQSxJQUFJQSxDQUFDQSxRQUFRQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtn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IiwiZmlsZSI6ImJhc2UvRGlzcGxheU9iamVjdC5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQXhpc0FsaWduZWRCb3VuZGluZ0JveFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2JvdW5kcy9BeGlzQWxpZ25lZEJvdW5kaW5nQm94XCIpO1xuaW1wb3J0IEJvdW5kaW5nVm9sdW1lQmFzZVx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvYm91bmRzL0JvdW5kaW5nVm9sdW1lQmFzZVwiKTtcbmltcG9ydCBNYXRoQ29uc3RzXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9NYXRoQ29uc3RzXCIpO1xuaW1wb3J0IE1hdHJpeDNEXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL01hdHJpeDNEXCIpO1xuaW1wb3J0IE1hdHJpeDNEVXRpbHNcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9NYXRyaXgzRFV0aWxzXCIpO1xuaW1wb3J0IFBvaW50XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1BvaW50XCIpO1xuaW1wb3J0IFJlY3RhbmdsZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vUmVjdGFuZ2xlXCIpO1xuaW1wb3J0IFZlY3RvcjNEXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1ZlY3RvcjNEXCIpO1xuaW1wb3J0IE5hbWVkQXNzZXRCYXNlXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvTmFtZWRBc3NldEJhc2VcIik7XG5pbXBvcnQgQWJzdHJhY3RNZXRob2RFcnJvclx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXJyb3JzL0Fic3RyYWN0TWV0aG9kRXJyb3JcIik7XG5cbmltcG9ydCBEaXNwbGF5T2JqZWN0Q29udGFpbmVyXHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvY29udGFpbmVycy9EaXNwbGF5T2JqZWN0Q29udGFpbmVyXCIpO1xuaW1wb3J0IFNjZW5lXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9jb250YWluZXJzL1NjZW5lXCIpO1xuaW1wb3J0IENvbnRyb2xsZXJCYXNlXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2NvbnRyb2xsZXJzL0NvbnRyb2xsZXJCYXNlXCIpO1xuaW1wb3J0IEFsaWdubWVudE1vZGVcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9BbGlnbm1lbnRNb2RlXCIpO1xuaW1wb3J0IEJsZW5kTW9kZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvQmxlbmRNb2RlXCIpO1xuaW1wb3J0IExvYWRlckluZm9cdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0xvYWRlckluZm9cIik7XG5pbXBvcnQgT3JpZW50YXRpb25Nb2RlXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvT3JpZW50YXRpb25Nb2RlXCIpO1xuaW1wb3J0IElCaXRtYXBEcmF3YWJsZVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0lCaXRtYXBEcmF3YWJsZVwiKTtcbmltcG9ydCBUcmFuc2Zvcm1cdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL1RyYW5zZm9ybVwiKTtcbmltcG9ydCBFbnRpdHlOb2RlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcGFydGl0aW9uL0VudGl0eU5vZGVcIik7XG5pbXBvcnQgUGFydGl0aW9uXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcGFydGl0aW9uL1BhcnRpdGlvblwiKTtcbmltcG9ydCBJUGlja2luZ0NvbGxpZGVyXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3BpY2svSVBpY2tpbmdDb2xsaWRlclwiKTtcbmltcG9ydCBQaWNraW5nQ29sbGlzaW9uVk9cdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3BpY2svUGlja2luZ0NvbGxpc2lvblZPXCIpO1xuaW1wb3J0IElSZW5kZXJhYmxlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcG9vbC9JUmVuZGVyYWJsZVwiKTtcbmltcG9ydCBDYW1lcmFcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2VudGl0aWVzL0NhbWVyYVwiKTtcbmltcG9ydCBEaXNwbGF5T2JqZWN0RXZlbnRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2V2ZW50cy9EaXNwbGF5T2JqZWN0RXZlbnRcIik7XG5pbXBvcnQgU2NlbmVFdmVudFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2V2ZW50cy9TY2VuZUV2ZW50XCIpO1xuaW1wb3J0IFByZWZhYkJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wcmVmYWJzL1ByZWZhYkJhc2VcIik7XG5cbi8qKlxuICogVGhlIERpc3BsYXlPYmplY3QgY2xhc3MgaXMgdGhlIGJhc2UgY2xhc3MgZm9yIGFsbCBvYmplY3RzIHRoYXQgY2FuIGJlXG4gKiBwbGFjZWQgb24gdGhlIGRpc3BsYXkgbGlzdC4gVGhlIGRpc3BsYXkgbGlzdCBtYW5hZ2VzIGFsbCBvYmplY3RzIGRpc3BsYXllZFxuICogaW4gZmxhc2guIFVzZSB0aGUgRGlzcGxheU9iamVjdENvbnRhaW5lciBjbGFzcyB0byBhcnJhbmdlIHRoZVxuICogZGlzcGxheSBvYmplY3RzIGluIHRoZSBkaXNwbGF5IGxpc3QuIERpc3BsYXlPYmplY3RDb250YWluZXIgb2JqZWN0cyBjYW5cbiAqIGhhdmUgY2hpbGQgZGlzcGxheSBvYmplY3RzLCB3aGlsZSBvdGhlciBkaXNwbGF5IG9iamVjdHMsIHN1Y2ggYXMgU2hhcGUgYW5kXG4gKiBUZXh0RmllbGQgb2JqZWN0cywgYXJlIFwibGVhZlwiIG5vZGVzIHRoYXQgaGF2ZSBvbmx5IHBhcmVudHMgYW5kIHNpYmxpbmdzLCBub1xuICogY2hpbGRyZW4uXG4gKlxuICogPHA+VGhlIERpc3BsYXlPYmplY3QgY2xhc3Mgc3VwcG9ydHMgYmFzaWMgZnVuY3Rpb25hbGl0eSBsaWtlIHRoZSA8aT54PC9pPlxuICogYW5kIDxpPnk8L2k+IHBvc2l0aW9uIG9mIGFuIG9iamVjdCwgYXMgd2VsbCBhcyBtb3JlIGFkdmFuY2VkIHByb3BlcnRpZXMgb2ZcbiAqIHRoZSBvYmplY3Qgc3VjaCBhcyBpdHMgdHJhbnNmb3JtYXRpb24gbWF0cml4LiA8L3A+XG4gKlxuICogPHA+RGlzcGxheU9iamVjdCBpcyBhbiBhYnN0cmFjdCBiYXNlIGNsYXNzOyB0aGVyZWZvcmUsIHlvdSBjYW5ub3QgY2FsbFxuICogRGlzcGxheU9iamVjdCBkaXJlY3RseS4gSW52b2tpbmcgPGNvZGU+bmV3IERpc3BsYXlPYmplY3QoKTwvY29kZT4gdGhyb3dzIGFuXG4gKiA8Y29kZT5Bcmd1bWVudEVycm9yPC9jb2RlPiBleGNlcHRpb24uIDwvcD5cbiAqXG4gKiA8cD5BbGwgZGlzcGxheSBvYmplY3RzIGluaGVyaXQgZnJvbSB0aGUgRGlzcGxheU9iamVjdCBjbGFzcy48L3A+XG4gKlxuICogPHA+VGhlIERpc3BsYXlPYmplY3QgY2xhc3MgaXRzZWxmIGRvZXMgbm90IGluY2x1ZGUgYW55IEFQSXMgZm9yIHJlbmRlcmluZ1xuICogY29udGVudCBvbnNjcmVlbi4gRm9yIHRoYXQgcmVhc29uLCBpZiB5b3Ugd2FudCBjcmVhdGUgYSBjdXN0b20gc3ViY2xhc3Mgb2ZcbiAqIHRoZSBEaXNwbGF5T2JqZWN0IGNsYXNzLCB5b3Ugd2lsbCB3YW50IHRvIGV4dGVuZCBvbmUgb2YgaXRzIHN1YmNsYXNzZXMgdGhhdFxuICogZG8gaGF2ZSBBUElzIGZvciByZW5kZXJpbmcgY29udGVudCBvbnNjcmVlbiwgc3VjaCBhcyB0aGUgU2hhcGUsIFNwcml0ZSxcbiAqIEJpdG1hcCwgU2ltcGxlQnV0dG9uLCBUZXh0RmllbGQsIG9yIE1vdmllQ2xpcCBjbGFzcy48L3A+XG4gKlxuICogPHA+VGhlIERpc3BsYXlPYmplY3QgY2xhc3MgY29udGFpbnMgc2V2ZXJhbCBicm9hZGNhc3QgZXZlbnRzLiBOb3JtYWxseSwgdGhlXG4gKiB0YXJnZXQgb2YgYW55IHBhcnRpY3VsYXIgZXZlbnQgaXMgYSBzcGVjaWZpYyBEaXNwbGF5T2JqZWN0IGluc3RhbmNlLiBGb3JcbiAqIGV4YW1wbGUsIHRoZSB0YXJnZXQgb2YgYW4gPGNvZGU+YWRkZWQ8L2NvZGU+IGV2ZW50IGlzIHRoZSBzcGVjaWZpY1xuICogRGlzcGxheU9iamVjdCBpbnN0YW5jZSB0aGF0IHdhcyBhZGRlZCB0byB0aGUgZGlzcGxheSBsaXN0LiBIYXZpbmcgYSBzaW5nbGVcbiAqIHRhcmdldCByZXN0cmljdHMgdGhlIHBsYWNlbWVudCBvZiBldmVudCBsaXN0ZW5lcnMgdG8gdGhhdCB0YXJnZXQgYW5kIGluXG4gKiBzb21lIGNhc2VzIHRoZSB0YXJnZXQncyBhbmNlc3RvcnMgb24gdGhlIGRpc3BsYXkgbGlzdC4gV2l0aCBicm9hZGNhc3RcbiAqIGV2ZW50cywgaG93ZXZlciwgdGhlIHRhcmdldCBpcyBub3QgYSBzcGVjaWZpYyBEaXNwbGF5T2JqZWN0IGluc3RhbmNlLCBidXRcbiAqIHJhdGhlciBhbGwgRGlzcGxheU9iamVjdCBpbnN0YW5jZXMsIGluY2x1ZGluZyB0aG9zZSB0aGF0IGFyZSBub3Qgb24gdGhlXG4gKiBkaXNwbGF5IGxpc3QuIFRoaXMgbWVhbnMgdGhhdCB5b3UgY2FuIGFkZCBhIGxpc3RlbmVyIHRvIGFueSBEaXNwbGF5T2JqZWN0XG4gKiBpbnN0YW5jZSB0byBsaXN0ZW4gZm9yIGJyb2FkY2FzdCBldmVudHMuIEluIGFkZGl0aW9uIHRvIHRoZSBicm9hZGNhc3RcbiAqIGV2ZW50cyBsaXN0ZWQgaW4gdGhlIERpc3BsYXlPYmplY3QgY2xhc3MncyBFdmVudHMgdGFibGUsIHRoZSBEaXNwbGF5T2JqZWN0XG4gKiBjbGFzcyBhbHNvIGluaGVyaXRzIHR3byBicm9hZGNhc3QgZXZlbnRzIGZyb20gdGhlIEV2ZW50RGlzcGF0Y2hlciBjbGFzczpcbiAqIDxjb2RlPmFjdGl2YXRlPC9jb2RlPiBhbmQgPGNvZGU+ZGVhY3RpdmF0ZTwvY29kZT4uPC9wPlxuICpcbiAqIDxwPlNvbWUgcHJvcGVydGllcyBwcmV2aW91c2x5IHVzZWQgaW4gdGhlIEFjdGlvblNjcmlwdCAxLjAgYW5kIDIuMFxuICogTW92aWVDbGlwLCBUZXh0RmllbGQsIGFuZCBCdXR0b24gY2xhc3NlcyhzdWNoIGFzIDxjb2RlPl9hbHBoYTwvY29kZT4sXG4gKiA8Y29kZT5faGVpZ2h0PC9jb2RlPiwgPGNvZGU+X25hbWU8L2NvZGU+LCA8Y29kZT5fd2lkdGg8L2NvZGU+LFxuICogPGNvZGU+X3g8L2NvZGU+LCA8Y29kZT5feTwvY29kZT4sIGFuZCBvdGhlcnMpIGhhdmUgZXF1aXZhbGVudHMgaW4gdGhlXG4gKiBBY3Rpb25TY3JpcHQgMy4wIERpc3BsYXlPYmplY3QgY2xhc3MgdGhhdCBhcmUgcmVuYW1lZCBzbyB0aGF0IHRoZXkgbm9cbiAqIGxvbmdlciBiZWdpbiB3aXRoIHRoZSB1bmRlcnNjb3JlKF8pIGNoYXJhY3Rlci48L3A+XG4gKlxuICogPHA+Rm9yIG1vcmUgaW5mb3JtYXRpb24sIHNlZSB0aGUgXCJEaXNwbGF5IFByb2dyYW1taW5nXCIgY2hhcHRlciBvZiB0aGVcbiAqIDxpPkFjdGlvblNjcmlwdCAzLjAgRGV2ZWxvcGVyJ3MgR3VpZGU8L2k+LjwvcD5cbiAqIFxuICogQGV2ZW50IGFkZGVkICAgICAgICAgICAgRGlzcGF0Y2hlZCB3aGVuIGEgZGlzcGxheSBvYmplY3QgaXMgYWRkZWQgdG8gdGhlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5IGxpc3QuIFRoZSBmb2xsb3dpbmcgbWV0aG9kcyB0cmlnZ2VyIHRoaXNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50OlxuICogICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+RGlzcGxheU9iamVjdENvbnRhaW5lci5hZGRDaGlsZCgpPC9jb2RlPixcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPkRpc3BsYXlPYmplY3RDb250YWluZXIuYWRkQ2hpbGRBdCgpPC9jb2RlPi5cbiAqIEBldmVudCBhZGRlZFRvU3RhZ2UgICAgIERpc3BhdGNoZWQgd2hlbiBhIGRpc3BsYXkgb2JqZWN0IGlzIGFkZGVkIHRvIHRoZSBvblxuICogICAgICAgICAgICAgICAgICAgICAgICAgc3RhZ2UgZGlzcGxheSBsaXN0LCBlaXRoZXIgZGlyZWN0bHkgb3IgdGhyb3VnaCB0aGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGFkZGl0aW9uIG9mIGEgc3ViIHRyZWUgaW4gd2hpY2ggdGhlIGRpc3BsYXkgb2JqZWN0XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBpcyBjb250YWluZWQuIFRoZSBmb2xsb3dpbmcgbWV0aG9kcyB0cmlnZ2VyIHRoaXNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50OlxuICogICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+RGlzcGxheU9iamVjdENvbnRhaW5lci5hZGRDaGlsZCgpPC9jb2RlPixcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPkRpc3BsYXlPYmplY3RDb250YWluZXIuYWRkQ2hpbGRBdCgpPC9jb2RlPi5cbiAqIEBldmVudCBlbnRlckZyYW1lICAgICAgIFticm9hZGNhc3QgZXZlbnRdIERpc3BhdGNoZWQgd2hlbiB0aGUgcGxheWhlYWQgaXNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGVudGVyaW5nIGEgbmV3IGZyYW1lLiBJZiB0aGUgcGxheWhlYWQgaXMgbm90XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBtb3ZpbmcsIG9yIGlmIHRoZXJlIGlzIG9ubHkgb25lIGZyYW1lLCB0aGlzIGV2ZW50XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBpcyBkaXNwYXRjaGVkIGNvbnRpbnVvdXNseSBpbiBjb25qdW5jdGlvbiB3aXRoIHRoZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgZnJhbWUgcmF0ZS4gVGhpcyBldmVudCBpcyBhIGJyb2FkY2FzdCBldmVudCwgd2hpY2hcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIG1lYW5zIHRoYXQgaXQgaXMgZGlzcGF0Y2hlZCBieSBhbGwgZGlzcGxheSBvYmplY3RzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICB3aXRoIGEgbGlzdGVuZXIgcmVnaXN0ZXJlZCBmb3IgdGhpcyBldmVudC5cbiAqIEBldmVudCBleGl0RnJhbWUgICAgICAgIFticm9hZGNhc3QgZXZlbnRdIERpc3BhdGNoZWQgd2hlbiB0aGUgcGxheWhlYWQgaXNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGV4aXRpbmcgdGhlIGN1cnJlbnQgZnJhbWUuIEFsbCBmcmFtZSBzY3JpcHRzIGhhdmVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGJlZW4gcnVuLiBJZiB0aGUgcGxheWhlYWQgaXMgbm90IG1vdmluZywgb3IgaWZcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIHRoZXJlIGlzIG9ubHkgb25lIGZyYW1lLCB0aGlzIGV2ZW50IGlzIGRpc3BhdGNoZWRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVvdXNseSBpbiBjb25qdW5jdGlvbiB3aXRoIHRoZSBmcmFtZSByYXRlLlxuICogICAgICAgICAgICAgICAgICAgICAgICAgVGhpcyBldmVudCBpcyBhIGJyb2FkY2FzdCBldmVudCwgd2hpY2ggbWVhbnMgdGhhdFxuICogICAgICAgICAgICAgICAgICAgICAgICAgaXQgaXMgZGlzcGF0Y2hlZCBieSBhbGwgZGlzcGxheSBvYmplY3RzIHdpdGggYVxuICogICAgICAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXIgcmVnaXN0ZXJlZCBmb3IgdGhpcyBldmVudC5cbiAqIEBldmVudCBmcmFtZUNvbnN0cnVjdGVkIFticm9hZGNhc3QgZXZlbnRdIERpc3BhdGNoZWQgYWZ0ZXIgdGhlIGNvbnN0cnVjdG9yc1xuICogICAgICAgICAgICAgICAgICAgICAgICAgb2YgZnJhbWUgZGlzcGxheSBvYmplY3RzIGhhdmUgcnVuIGJ1dCBiZWZvcmUgZnJhbWVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIHNjcmlwdHMgaGF2ZSBydW4uIElmIHRoZSBwbGF5aGVhZCBpcyBub3QgbW92aW5nLCBvclxuICogICAgICAgICAgICAgICAgICAgICAgICAgaWYgdGhlcmUgaXMgb25seSBvbmUgZnJhbWUsIHRoaXMgZXZlbnQgaXNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoZWQgY29udGludW91c2x5IGluIGNvbmp1bmN0aW9uIHdpdGggdGhlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBmcmFtZSByYXRlLiBUaGlzIGV2ZW50IGlzIGEgYnJvYWRjYXN0IGV2ZW50LCB3aGljaFxuICogICAgICAgICAgICAgICAgICAgICAgICAgbWVhbnMgdGhhdCBpdCBpcyBkaXNwYXRjaGVkIGJ5IGFsbCBkaXNwbGF5IG9iamVjdHNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIHdpdGggYSBsaXN0ZW5lciByZWdpc3RlcmVkIGZvciB0aGlzIGV2ZW50LlxuICogQGV2ZW50IHJlbW92ZWQgICAgICAgICAgRGlzcGF0Y2hlZCB3aGVuIGEgZGlzcGxheSBvYmplY3QgaXMgYWJvdXQgdG8gYmVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZWQgZnJvbSB0aGUgZGlzcGxheSBsaXN0LiBUd28gbWV0aG9kcyBvZiB0aGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIERpc3BsYXlPYmplY3RDb250YWluZXIgY2xhc3MgZ2VuZXJhdGUgdGhpcyBldmVudDpcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPnJlbW92ZUNoaWxkKCk8L2NvZGU+IGFuZFxuICogICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+cmVtb3ZlQ2hpbGRBdCgpPC9jb2RlPi5cbiAqXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICA8cD5UaGUgZm9sbG93aW5nIG1ldGhvZHMgb2YgYVxuICogICAgICAgICAgICAgICAgICAgICAgICAgRGlzcGxheU9iamVjdENvbnRhaW5lciBvYmplY3QgYWxzbyBnZW5lcmF0ZSB0aGlzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBldmVudCBpZiBhbiBvYmplY3QgbXVzdCBiZSByZW1vdmVkIHRvIG1ha2Ugcm9vbSBmb3JcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIHRoZSBuZXcgb2JqZWN0OiA8Y29kZT5hZGRDaGlsZCgpPC9jb2RlPixcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPmFkZENoaWxkQXQoKTwvY29kZT4sIGFuZFxuICogICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+c2V0Q2hpbGRJbmRleCgpPC9jb2RlPi4gPC9wPlxuICogQGV2ZW50IHJlbW92ZWRGcm9tU3RhZ2UgRGlzcGF0Y2hlZCB3aGVuIGEgZGlzcGxheSBvYmplY3QgaXMgYWJvdXQgdG8gYmVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZWQgZnJvbSB0aGUgZGlzcGxheSBsaXN0LCBlaXRoZXIgZGlyZWN0bHkgb3JcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIHRocm91Z2ggdGhlIHJlbW92YWwgb2YgYSBzdWIgdHJlZSBpbiB3aGljaCB0aGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXkgb2JqZWN0IGlzIGNvbnRhaW5lZC4gVHdvIG1ldGhvZHMgb2YgdGhlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIGNsYXNzIGdlbmVyYXRlIHRoaXMgZXZlbnQ6XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5yZW1vdmVDaGlsZCgpPC9jb2RlPiBhbmRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPnJlbW92ZUNoaWxkQXQoKTwvY29kZT4uXG4gKlxuICogICAgICAgICAgICAgICAgICAgICAgICAgPHA+VGhlIGZvbGxvd2luZyBtZXRob2RzIG9mIGFcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIERpc3BsYXlPYmplY3RDb250YWluZXIgb2JqZWN0IGFsc28gZ2VuZXJhdGUgdGhpc1xuICogICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQgaWYgYW4gb2JqZWN0IG11c3QgYmUgcmVtb3ZlZCB0byBtYWtlIHJvb20gZm9yXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICB0aGUgbmV3IG9iamVjdDogPGNvZGU+YWRkQ2hpbGQoKTwvY29kZT4sXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5hZGRDaGlsZEF0KCk8L2NvZGU+LCBhbmRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPnNldENoaWxkSW5kZXgoKTwvY29kZT4uIDwvcD5cbiAqIEBldmVudCByZW5kZXIgICAgICAgICAgIFticm9hZGNhc3QgZXZlbnRdIERpc3BhdGNoZWQgd2hlbiB0aGUgZGlzcGxheSBsaXN0XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBpcyBhYm91dCB0byBiZSB1cGRhdGVkIGFuZCByZW5kZXJlZC4gVGhpcyBldmVudFxuICogICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXMgdGhlIGxhc3Qgb3Bwb3J0dW5pdHkgZm9yIG9iamVjdHMgbGlzdGVuaW5nXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgdGhpcyBldmVudCB0byBtYWtlIGNoYW5nZXMgYmVmb3JlIHRoZSBkaXNwbGF5XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBsaXN0IGlzIHJlbmRlcmVkLiBZb3UgbXVzdCBjYWxsIHRoZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+aW52YWxpZGF0ZSgpPC9jb2RlPiBtZXRob2Qgb2YgdGhlIFN0YWdlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3QgZWFjaCB0aW1lIHlvdSB3YW50IGEgPGNvZGU+cmVuZGVyPC9jb2RlPlxuICogICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQgdG8gYmUgZGlzcGF0Y2hlZC4gPGNvZGU+UmVuZGVyPC9jb2RlPiBldmVudHNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGFyZSBkaXNwYXRjaGVkIHRvIGFuIG9iamVjdCBvbmx5IGlmIHRoZXJlIGlzIG11dHVhbFxuICogICAgICAgICAgICAgICAgICAgICAgICAgdHJ1c3QgYmV0d2VlbiBpdCBhbmQgdGhlIG9iamVjdCB0aGF0IGNhbGxlZFxuICogICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+U3RhZ2UuaW52YWxpZGF0ZSgpPC9jb2RlPi4gVGhpcyBldmVudCBpcyBhXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBicm9hZGNhc3QgZXZlbnQsIHdoaWNoIG1lYW5zIHRoYXQgaXQgaXMgZGlzcGF0Y2hlZFxuICogICAgICAgICAgICAgICAgICAgICAgICAgYnkgYWxsIGRpc3BsYXkgb2JqZWN0cyB3aXRoIGEgbGlzdGVuZXIgcmVnaXN0ZXJlZFxuICogICAgICAgICAgICAgICAgICAgICAgICAgZm9yIHRoaXMgZXZlbnQuXG4gKlxuICogICAgICAgICAgICAgICAgICAgICAgICAgPHA+PGI+Tm90ZTogPC9iPlRoaXMgZXZlbnQgaXMgbm90IGRpc3BhdGNoZWQgaWYgdGhlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5IGlzIG5vdCByZW5kZXJpbmcuIFRoaXMgaXMgdGhlIGNhc2Ugd2hlbiB0aGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgaXMgZWl0aGVyIG1pbmltaXplZCBvciBvYnNjdXJlZC4gPC9wPlxuICovXG5jbGFzcyBEaXNwbGF5T2JqZWN0IGV4dGVuZHMgTmFtZWRBc3NldEJhc2UgaW1wbGVtZW50cyBJQml0bWFwRHJhd2FibGVcbntcblx0cHJpdmF0ZSBfbG9hZGVySW5mbzpMb2FkZXJJbmZvO1xuXHRwcml2YXRlIF9tb3VzZVg6bnVtYmVyO1xuXHRwcml2YXRlIF9tb3VzZVk6bnVtYmVyO1xuXHRwcml2YXRlIF9yb290OkRpc3BsYXlPYmplY3RDb250YWluZXI7XG5cdHByaXZhdGUgX2JvdW5kczpSZWN0YW5nbGU7XG5cdHByaXZhdGUgX2JvdW5kc1Zpc2libGU6Ym9vbGVhbjtcblx0cHJpdmF0ZSBfZGVwdGg6bnVtYmVyO1xuXHRwcml2YXRlIF9oZWlnaHQ6bnVtYmVyO1xuXHRwcml2YXRlIF93aWR0aDpudW1iZXI7XG5cblx0cHVibGljIF9wU2NlbmU6U2NlbmU7XG5cdHB1YmxpYyBfcFBhcmVudDpEaXNwbGF5T2JqZWN0Q29udGFpbmVyO1xuXHRwdWJsaWMgX3BTY2VuZVRyYW5zZm9ybTpNYXRyaXgzRCA9IG5ldyBNYXRyaXgzRCgpO1xuXHRwdWJsaWMgX3BTY2VuZVRyYW5zZm9ybURpcnR5OmJvb2xlYW4gPSB0cnVlO1xuXHRwdWJsaWMgX3BJc0VudGl0eTpib29sZWFuO1xuXG5cdHByaXZhdGUgX2V4cGxpY2l0UGFydGl0aW9uOlBhcnRpdGlvbjtcblx0cHVibGljIF9wSW1wbGljaXRQYXJ0aXRpb246UGFydGl0aW9uO1xuXHRwcml2YXRlIF9wYXJ0aXRpb25Ob2RlOkVudGl0eU5vZGU7XG5cblx0cHJpdmF0ZSBfc2NlbmVUcmFuc2Zvcm1DaGFuZ2VkOkRpc3BsYXlPYmplY3RFdmVudDtcblx0cHJpdmF0ZSBfc2NlbmVjaGFuZ2VkOkRpc3BsYXlPYmplY3RFdmVudDtcblx0cHJpdmF0ZSBfdHJhbnNmb3JtOlRyYW5zZm9ybTtcblx0cHJpdmF0ZSBfbWF0cml4M0Q6TWF0cml4M0QgPSBuZXcgTWF0cml4M0QoKTtcblx0cHJpdmF0ZSBfbWF0cml4M0REaXJ0eTpib29sZWFuID0gdHJ1ZTtcblxuXHRwcml2YXRlIF9pbnZlcnNlU2NlbmVUcmFuc2Zvcm06TWF0cml4M0QgPSBuZXcgTWF0cml4M0QoKTtcblx0cHJpdmF0ZSBfaW52ZXJzZVNjZW5lVHJhbnNmb3JtRGlydHk6Ym9vbGVhbiA9IHRydWU7XG5cdHByaXZhdGUgX3NjZW5lUG9zaXRpb246VmVjdG9yM0QgPSBuZXcgVmVjdG9yM0QoKTtcblx0cHJpdmF0ZSBfc2NlbmVQb3NpdGlvbkRpcnR5OmJvb2xlYW4gPSB0cnVlO1xuXHRwcml2YXRlIF9leHBsaWNpdFZpc2liaWxpdHk6Ym9vbGVhbiA9IHRydWU7XG5cdHB1YmxpYyBfcEltcGxpY2l0VmlzaWJpbGl0eTpib29sZWFuID0gdHJ1ZTtcblx0cHJpdmF0ZSBfZXhwbGljaXRNb3VzZUVuYWJsZWQ6Ym9vbGVhbiA9IHRydWU7XG5cdHB1YmxpYyBfcEltcGxpY2l0TW91c2VFbmFibGVkOmJvb2xlYW4gPSB0cnVlO1xuXHRwcml2YXRlIF9saXN0ZW5Ub1NjZW5lVHJhbnNmb3JtQ2hhbmdlZDpib29sZWFuO1xuXHRwcml2YXRlIF9saXN0ZW5Ub1NjZW5lQ2hhbmdlZDpib29sZWFuO1xuXG5cdHByaXZhdGUgX3Bvc2l0aW9uRGlydHk6Ym9vbGVhbiA9IHRydWU7XG5cdHByaXZhdGUgX3JvdGF0aW9uRGlydHk6Ym9vbGVhbiA9IHRydWU7XG5cdHByaXZhdGUgX3NjYWxlRGlydHk6Ym9vbGVhbiA9IHRydWU7XG5cblx0cHJpdmF0ZSBfcG9zaXRpb25DaGFuZ2VkOkRpc3BsYXlPYmplY3RFdmVudDtcblx0cHJpdmF0ZSBfcm90YXRpb25DaGFuZ2VkOkRpc3BsYXlPYmplY3RFdmVudDtcblx0cHJpdmF0ZSBfc2NhbGVDaGFuZ2VkOkRpc3BsYXlPYmplY3RFdmVudDtcblxuXHRwcml2YXRlIF9yb3RhdGlvblg6bnVtYmVyID0gMDtcblx0cHJpdmF0ZSBfcm90YXRpb25ZOm51bWJlciA9IDA7XG5cdHByaXZhdGUgX3JvdGF0aW9uWjpudW1iZXIgPSAwO1xuXHRwcml2YXRlIF9ldWxlcnM6VmVjdG9yM0QgPSBuZXcgVmVjdG9yM0QoKTtcblx0cHJpdmF0ZSBfZmxpcFk6TWF0cml4M0QgPSBuZXcgTWF0cml4M0QoKTtcblxuXHRwcml2YXRlIF9saXN0ZW5Ub1Bvc2l0aW9uQ2hhbmdlZDpib29sZWFuO1xuXHRwcml2YXRlIF9saXN0ZW5Ub1JvdGF0aW9uQ2hhbmdlZDpib29sZWFuO1xuXHRwcml2YXRlIF9saXN0ZW5Ub1NjYWxlQ2hhbmdlZDpib29sZWFuO1xuXHRwcml2YXRlIF96T2Zmc2V0Om51bWJlciA9IDA7XG5cblx0cHVibGljIF9wU2NhbGVYOm51bWJlciA9IDE7XG5cdHB1YmxpYyBfcFNjYWxlWTpudW1iZXIgPSAxO1xuXHRwdWJsaWMgX3BTY2FsZVo6bnVtYmVyID0gMTtcblx0cHJpdmF0ZSBfeDpudW1iZXIgPSAwO1xuXHRwcml2YXRlIF95Om51bWJlciA9IDA7XG5cdHByaXZhdGUgX3o6bnVtYmVyID0gMDtcblx0cHJpdmF0ZSBfcGl2b3Q6VmVjdG9yM0QgPSBuZXcgVmVjdG9yM0QoKTtcblx0cHJpdmF0ZSBfb3JpZW50YXRpb25NYXRyaXg6TWF0cml4M0QgPSBuZXcgTWF0cml4M0QoKTtcblx0cHJpdmF0ZSBfcGl2b3RaZXJvOmJvb2xlYW4gPSB0cnVlO1xuXHRwcml2YXRlIF9waXZvdERpcnR5OmJvb2xlYW4gPSB0cnVlO1xuXHRwcml2YXRlIF9wb3M6VmVjdG9yM0QgPSBuZXcgVmVjdG9yM0QoKTtcblx0cHJpdmF0ZSBfcm90OlZlY3RvcjNEID0gbmV3IFZlY3RvcjNEKCk7XG5cdHByaXZhdGUgX3NjYTpWZWN0b3IzRCA9IG5ldyBWZWN0b3IzRCgpO1xuXHRwcml2YXRlIF90cmFuc2Zvcm1Db21wb25lbnRzOkFycmF5PFZlY3RvcjNEPjtcblxuXHRwdWJsaWMgX3BJZ25vcmVUcmFuc2Zvcm06Ym9vbGVhbiA9IGZhbHNlO1xuXG5cdHByaXZhdGUgX3NoYWRlclBpY2tpbmdEZXRhaWxzOmJvb2xlYW47XG5cblx0cHVibGljIF9wUGlja2luZ0NvbGxpc2lvblZPOlBpY2tpbmdDb2xsaXNpb25WTztcblxuXHRwdWJsaWMgX3BCb3VuZHM6Qm91bmRpbmdWb2x1bWVCYXNlO1xuXHRwdWJsaWMgX3BCb3VuZHNJbnZhbGlkOmJvb2xlYW4gPSB0cnVlO1xuXHRwcml2YXRlIF93b3JsZEJvdW5kczpCb3VuZGluZ1ZvbHVtZUJhc2U7XG5cdHByaXZhdGUgX3dvcmxkQm91bmRzSW52YWxpZDpib29sZWFuID0gdHJ1ZTtcblxuXHRwdWJsaWMgX3BQaWNraW5nQ29sbGlkZXI6SVBpY2tpbmdDb2xsaWRlcjtcblxuXHRwdWJsaWMgX3BSZW5kZXJhYmxlczpBcnJheTxJUmVuZGVyYWJsZT4gPSBuZXcgQXJyYXk8SVJlbmRlcmFibGU+KCk7XG5cblx0cHVibGljIF9pU291cmNlUHJlZmFiOlByZWZhYkJhc2U7XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgYWxpZ25tZW50TW9kZTpzdHJpbmcgPSBBbGlnbm1lbnRNb2RlLlJFR0lTVFJBVElPTl9QT0lOVDtcblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHRoZSBhbHBoYSB0cmFuc3BhcmVuY3kgdmFsdWUgb2YgdGhlIG9iamVjdCBzcGVjaWZpZWQuIFZhbGlkXG5cdCAqIHZhbHVlcyBhcmUgMChmdWxseSB0cmFuc3BhcmVudCkgdG8gMShmdWxseSBvcGFxdWUpLiBUaGUgZGVmYXVsdCB2YWx1ZSBpc1xuXHQgKiAxLiBEaXNwbGF5IG9iamVjdHMgd2l0aCA8Y29kZT5hbHBoYTwvY29kZT4gc2V0IHRvIDAgPGk+YXJlPC9pPiBhY3RpdmUsXG5cdCAqIGV2ZW4gdGhvdWdoIHRoZXkgYXJlIGludmlzaWJsZS5cblx0ICovXG5cdHB1YmxpYyBhbHBoYTpudW1iZXI7XG5cblx0LyoqXG5cdCAqIEEgdmFsdWUgZnJvbSB0aGUgQmxlbmRNb2RlIGNsYXNzIHRoYXQgc3BlY2lmaWVzIHdoaWNoIGJsZW5kIG1vZGUgdG8gdXNlLiBBXG5cdCAqIGJpdG1hcCBjYW4gYmUgZHJhd24gaW50ZXJuYWxseSBpbiB0d28gd2F5cy4gSWYgeW91IGhhdmUgYSBibGVuZCBtb2RlXG5cdCAqIGVuYWJsZWQgb3IgYW4gZXh0ZXJuYWwgY2xpcHBpbmcgbWFzaywgdGhlIGJpdG1hcCBpcyBkcmF3biBieSBhZGRpbmcgYVxuXHQgKiBiaXRtYXAtZmlsbGVkIHNxdWFyZSBzaGFwZSB0byB0aGUgdmVjdG9yIHJlbmRlci4gSWYgeW91IGF0dGVtcHQgdG8gc2V0XG5cdCAqIHRoaXMgcHJvcGVydHkgdG8gYW4gaW52YWxpZCB2YWx1ZSwgRmxhc2ggcnVudGltZXMgc2V0IHRoZSB2YWx1ZSB0b1xuXHQgKiA8Y29kZT5CbGVuZE1vZGUuTk9STUFMPC9jb2RlPi5cblx0ICpcblx0ICogPHA+VGhlIDxjb2RlPmJsZW5kTW9kZTwvY29kZT4gcHJvcGVydHkgYWZmZWN0cyBlYWNoIHBpeGVsIG9mIHRoZSBkaXNwbGF5XG5cdCAqIG9iamVjdC4gRWFjaCBwaXhlbCBpcyBjb21wb3NlZCBvZiB0aHJlZSBjb25zdGl0dWVudCBjb2xvcnMocmVkLCBncmVlbixcblx0ICogYW5kIGJsdWUpLCBhbmQgZWFjaCBjb25zdGl0dWVudCBjb2xvciBoYXMgYSB2YWx1ZSBiZXR3ZWVuIDB4MDAgYW5kIDB4RkYuXG5cdCAqIEZsYXNoIFBsYXllciBvciBBZG9iZSBBSVIgY29tcGFyZXMgZWFjaCBjb25zdGl0dWVudCBjb2xvciBvZiBvbmUgcGl4ZWwgaW5cblx0ICogdGhlIG1vdmllIGNsaXAgd2l0aCB0aGUgY29ycmVzcG9uZGluZyBjb2xvciBvZiB0aGUgcGl4ZWwgaW4gdGhlXG5cdCAqIGJhY2tncm91bmQuIEZvciBleGFtcGxlLCBpZiA8Y29kZT5ibGVuZE1vZGU8L2NvZGU+IGlzIHNldCB0b1xuXHQgKiA8Y29kZT5CbGVuZE1vZGUuTElHSFRFTjwvY29kZT4sIEZsYXNoIFBsYXllciBvciBBZG9iZSBBSVIgY29tcGFyZXMgdGhlIHJlZFxuXHQgKiB2YWx1ZSBvZiB0aGUgZGlzcGxheSBvYmplY3Qgd2l0aCB0aGUgcmVkIHZhbHVlIG9mIHRoZSBiYWNrZ3JvdW5kLCBhbmQgdXNlc1xuXHQgKiB0aGUgbGlnaHRlciBvZiB0aGUgdHdvIGFzIHRoZSB2YWx1ZSBmb3IgdGhlIHJlZCBjb21wb25lbnQgb2YgdGhlIGRpc3BsYXllZFxuXHQgKiBjb2xvci48L3A+XG5cdCAqXG5cdCAqIDxwPlRoZSBmb2xsb3dpbmcgdGFibGUgZGVzY3JpYmVzIHRoZSA8Y29kZT5ibGVuZE1vZGU8L2NvZGU+IHNldHRpbmdzLiBUaGVcblx0ICogQmxlbmRNb2RlIGNsYXNzIGRlZmluZXMgc3RyaW5nIHZhbHVlcyB5b3UgY2FuIHVzZS4gVGhlIGlsbHVzdHJhdGlvbnMgaW5cblx0ICogdGhlIHRhYmxlIHNob3cgPGNvZGU+YmxlbmRNb2RlPC9jb2RlPiB2YWx1ZXMgYXBwbGllZCB0byBhIGNpcmN1bGFyIGRpc3BsYXlcblx0ICogb2JqZWN0KDIpIHN1cGVyaW1wb3NlZCBvbiBhbm90aGVyIGRpc3BsYXkgb2JqZWN0KDEpLjwvcD5cblx0ICovXG5cdHB1YmxpYyBibGVuZE1vZGU6QmxlbmRNb2RlO1xuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBib3VuZHMoKTpCb3VuZGluZ1ZvbHVtZUJhc2Vcblx0e1xuXHRcdGlmICh0aGlzLl9wQm91bmRzSW52YWxpZClcblx0XHRcdHRoaXMucFVwZGF0ZUJvdW5kcygpO1xuXG5cdFx0cmV0dXJuIHRoaXMuX3BCb3VuZHM7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGJvdW5kcyh2YWx1ZTpCb3VuZGluZ1ZvbHVtZUJhc2UpXG5cdHtcblx0XHRpZiAodGhpcy5fcEJvdW5kcyA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3BCb3VuZHMgPSB2YWx1ZTtcblxuXHRcdHRoaXMuX3dvcmxkQm91bmRzID0gdmFsdWUuY2xvbmUoKTtcblxuXHRcdHRoaXMucEludmFsaWRhdGVCb3VuZHMoKTtcblxuXHRcdGlmICh0aGlzLl9ib3VuZHNWaXNpYmxlKVxuXHRcdFx0dGhpcy5fcGFydGl0aW9uTm9kZS5faVVwZGF0ZUVudGl0eUJvdW5kcygpO1xuXHR9XG5cblx0LyoqXG5cdCAqIElmIHNldCB0byA8Y29kZT50cnVlPC9jb2RlPiwgTk1FIHdpbGwgdXNlIHRoZSBzb2Z0d2FyZSByZW5kZXJlciB0byBjYWNoZVxuXHQgKiBhbiBpbnRlcm5hbCBiaXRtYXAgcmVwcmVzZW50YXRpb24gb2YgdGhlIGRpc3BsYXkgb2JqZWN0LiBGb3IgbmF0aXZlIHRhcmdldHMsXG5cdCAqIHRoaXMgaXMgb2Z0ZW4gbXVjaCBzbG93ZXIgdGhhbiB0aGUgZGVmYXVsdCBoYXJkd2FyZSByZW5kZXJlci4gV2hlbiB5b3Vcblx0ICogYXJlIHVzaW5nIHRoZSBGbGFzaCB0YXJnZXQsIHRoaXMgY2FjaGluZyBtYXkgaW5jcmVhc2UgcGVyZm9ybWFuY2UgZm9yIGRpc3BsYXlcblx0ICogb2JqZWN0cyB0aGF0IGNvbnRhaW4gY29tcGxleCB2ZWN0b3IgY29udGVudC5cblx0ICpcblx0ICogPHA+QWxsIHZlY3RvciBkYXRhIGZvciBhIGRpc3BsYXkgb2JqZWN0IHRoYXQgaGFzIGEgY2FjaGVkIGJpdG1hcCBpcyBkcmF3blxuXHQgKiB0byB0aGUgYml0bWFwIGluc3RlYWQgb2YgdGhlIG1haW4gZGlzcGxheS4gSWZcblx0ICogPGNvZGU+Y2FjaGVBc0JpdG1hcE1hdHJpeDwvY29kZT4gaXMgbnVsbCBvciB1bnN1cHBvcnRlZCwgdGhlIGJpdG1hcCBpc1xuXHQgKiB0aGVuIGNvcGllZCB0byB0aGUgbWFpbiBkaXNwbGF5IGFzIHVuc3RyZXRjaGVkLCB1bnJvdGF0ZWQgcGl4ZWxzIHNuYXBwZWRcblx0ICogdG8gdGhlIG5lYXJlc3QgcGl4ZWwgYm91bmRhcmllcy4gUGl4ZWxzIGFyZSBtYXBwZWQgMSB0byAxIHdpdGggdGhlIHBhcmVudFxuXHQgKiBvYmplY3QuIElmIHRoZSBib3VuZHMgb2YgdGhlIGJpdG1hcCBjaGFuZ2UsIHRoZSBiaXRtYXAgaXMgcmVjcmVhdGVkXG5cdCAqIGluc3RlYWQgb2YgYmVpbmcgc3RyZXRjaGVkLjwvcD5cblx0ICpcblx0ICogPHA+SWYgPGNvZGU+Y2FjaGVBc0JpdG1hcE1hdHJpeDwvY29kZT4gaXMgbm9uLW51bGwgYW5kIHN1cHBvcnRlZCwgdGhlXG5cdCAqIG9iamVjdCBpcyBkcmF3biB0byB0aGUgb2ZmLXNjcmVlbiBiaXRtYXAgdXNpbmcgdGhhdCBtYXRyaXggYW5kIHRoZVxuXHQgKiBzdHJldGNoZWQgYW5kL29yIHJvdGF0ZWQgcmVzdWx0cyBvZiB0aGF0IHJlbmRlcmluZyBhcmUgdXNlZCB0byBkcmF3IHRoZVxuXHQgKiBvYmplY3QgdG8gdGhlIG1haW4gZGlzcGxheS48L3A+XG5cdCAqXG5cdCAqIDxwPk5vIGludGVybmFsIGJpdG1hcCBpcyBjcmVhdGVkIHVubGVzcyB0aGUgPGNvZGU+Y2FjaGVBc0JpdG1hcDwvY29kZT5cblx0ICogcHJvcGVydHkgaXMgc2V0IHRvIDxjb2RlPnRydWU8L2NvZGU+LjwvcD5cblx0ICpcblx0ICogPHA+QWZ0ZXIgeW91IHNldCB0aGUgPGNvZGU+Y2FjaGVBc0JpdG1hcDwvY29kZT4gcHJvcGVydHkgdG9cblx0ICogPGNvZGU+dHJ1ZTwvY29kZT4sIHRoZSByZW5kZXJpbmcgZG9lcyBub3QgY2hhbmdlLCBob3dldmVyIHRoZSBkaXNwbGF5XG5cdCAqIG9iamVjdCBwZXJmb3JtcyBwaXhlbCBzbmFwcGluZyBhdXRvbWF0aWNhbGx5LiBUaGUgYW5pbWF0aW9uIHNwZWVkIGNhbiBiZVxuXHQgKiBzaWduaWZpY2FudGx5IGZhc3RlciBkZXBlbmRpbmcgb24gdGhlIGNvbXBsZXhpdHkgb2YgdGhlIHZlY3RvciBjb250ZW50LlxuXHQgKiA8L3A+XG5cdCAqXG5cdCAqIDxwPlRoZSA8Y29kZT5jYWNoZUFzQml0bWFwPC9jb2RlPiBwcm9wZXJ0eSBpcyBhdXRvbWF0aWNhbGx5IHNldCB0b1xuXHQgKiA8Y29kZT50cnVlPC9jb2RlPiB3aGVuZXZlciB5b3UgYXBwbHkgYSBmaWx0ZXIgdG8gYSBkaXNwbGF5IG9iamVjdCh3aGVuXG5cdCAqIGl0cyA8Y29kZT5maWx0ZXI8L2NvZGU+IGFycmF5IGlzIG5vdCBlbXB0eSksIGFuZCBpZiBhIGRpc3BsYXkgb2JqZWN0IGhhcyBhXG5cdCAqIGZpbHRlciBhcHBsaWVkIHRvIGl0LCA8Y29kZT5jYWNoZUFzQml0bWFwPC9jb2RlPiBpcyByZXBvcnRlZCBhc1xuXHQgKiA8Y29kZT50cnVlPC9jb2RlPiBmb3IgdGhhdCBkaXNwbGF5IG9iamVjdCwgZXZlbiBpZiB5b3Ugc2V0IHRoZSBwcm9wZXJ0eSB0b1xuXHQgKiA8Y29kZT5mYWxzZTwvY29kZT4uIElmIHlvdSBjbGVhciBhbGwgZmlsdGVycyBmb3IgYSBkaXNwbGF5IG9iamVjdCwgdGhlXG5cdCAqIDxjb2RlPmNhY2hlQXNCaXRtYXA8L2NvZGU+IHNldHRpbmcgY2hhbmdlcyB0byB3aGF0IGl0IHdhcyBsYXN0IHNldCB0by48L3A+XG5cdCAqXG5cdCAqIDxwPkEgZGlzcGxheSBvYmplY3QgZG9lcyBub3QgdXNlIGEgYml0bWFwIGV2ZW4gaWYgdGhlXG5cdCAqIDxjb2RlPmNhY2hlQXNCaXRtYXA8L2NvZGU+IHByb3BlcnR5IGlzIHNldCB0byA8Y29kZT50cnVlPC9jb2RlPiBhbmRcblx0ICogaW5zdGVhZCByZW5kZXJzIGZyb20gdmVjdG9yIGRhdGEgaW4gdGhlIGZvbGxvd2luZyBjYXNlczo8L3A+XG5cdCAqXG5cdCAqIDx1bD5cblx0ICogICA8bGk+VGhlIGJpdG1hcCBpcyB0b28gbGFyZ2UuIEluIEFJUiAxLjUgYW5kIEZsYXNoIFBsYXllciAxMCwgdGhlIG1heGltdW1cblx0ICogc2l6ZSBmb3IgYSBiaXRtYXAgaW1hZ2UgaXMgOCwxOTEgcGl4ZWxzIGluIHdpZHRoIG9yIGhlaWdodCwgYW5kIHRoZSB0b3RhbFxuXHQgKiBudW1iZXIgb2YgcGl4ZWxzIGNhbm5vdCBleGNlZWQgMTYsNzc3LDIxNSBwaXhlbHMuKFNvLCBpZiBhIGJpdG1hcCBpbWFnZVxuXHQgKiBpcyA4LDE5MSBwaXhlbHMgd2lkZSwgaXQgY2FuIG9ubHkgYmUgMiwwNDggcGl4ZWxzIGhpZ2guKSBJbiBGbGFzaCBQbGF5ZXIgOVxuXHQgKiBhbmQgZWFybGllciwgdGhlIGxpbWl0YXRpb24gaXMgaXMgMjg4MCBwaXhlbHMgaW4gaGVpZ2h0IGFuZCAyLDg4MCBwaXhlbHNcblx0ICogaW4gd2lkdGguPC9saT5cblx0ICogICA8bGk+VGhlIGJpdG1hcCBmYWlscyB0byBhbGxvY2F0ZShvdXQgb2YgbWVtb3J5IGVycm9yKS4gPC9saT5cblx0ICogPC91bD5cblx0ICpcblx0ICogPHA+VGhlIDxjb2RlPmNhY2hlQXNCaXRtYXA8L2NvZGU+IHByb3BlcnR5IGlzIGJlc3QgdXNlZCB3aXRoIG1vdmllIGNsaXBzXG5cdCAqIHRoYXQgaGF2ZSBtb3N0bHkgc3RhdGljIGNvbnRlbnQgYW5kIHRoYXQgZG8gbm90IHNjYWxlIGFuZCByb3RhdGVcblx0ICogZnJlcXVlbnRseS4gV2l0aCBzdWNoIG1vdmllIGNsaXBzLCA8Y29kZT5jYWNoZUFzQml0bWFwPC9jb2RlPiBjYW4gbGVhZCB0b1xuXHQgKiBwZXJmb3JtYW5jZSBpbmNyZWFzZXMgd2hlbiB0aGUgbW92aWUgY2xpcCBpcyB0cmFuc2xhdGVkKHdoZW4gaXRzIDxpPng8L2k+XG5cdCAqIGFuZCA8aT55PC9pPiBwb3NpdGlvbiBpcyBjaGFuZ2VkKS48L3A+XG5cdCAqL1xuXHRwdWJsaWMgY2FjaGVBc0JpdG1hcDpib29sZWFuO1xuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGNhc3RzU2hhZG93czpib29sZWFuID0gdHJ1ZTtcblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHRoZSBkZXB0aCBvZiB0aGUgZGlzcGxheSBvYmplY3QsIGluIHBpeGVscy4gVGhlIGRlcHRoIGlzXG5cdCAqIGNhbGN1bGF0ZWQgYmFzZWQgb24gdGhlIGJvdW5kcyBvZiB0aGUgY29udGVudCBvZiB0aGUgZGlzcGxheSBvYmplY3QuIFdoZW5cblx0ICogeW91IHNldCB0aGUgPGNvZGU+ZGVwdGg8L2NvZGU+IHByb3BlcnR5LCB0aGUgPGNvZGU+c2NhbGVaPC9jb2RlPiBwcm9wZXJ0eVxuXHQgKiBpcyBhZGp1c3RlZCBhY2NvcmRpbmdseSwgYXMgc2hvd24gaW4gdGhlIGZvbGxvd2luZyBjb2RlOlxuXHQgKlxuXHQgKiA8cD5FeGNlcHQgZm9yIFRleHRGaWVsZCBhbmQgVmlkZW8gb2JqZWN0cywgYSBkaXNwbGF5IG9iamVjdCB3aXRoIG5vXG5cdCAqIGNvbnRlbnQgKHN1Y2ggYXMgYW4gZW1wdHkgc3ByaXRlKSBoYXMgYSBkZXB0aCBvZiAwLCBldmVuIGlmIHlvdSB0cnkgdG9cblx0ICogc2V0IDxjb2RlPmRlcHRoPC9jb2RlPiB0byBhIGRpZmZlcmVudCB2YWx1ZS48L3A+XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGRlcHRoKCk6bnVtYmVyXG5cdHtcblx0XHRpZiAodGhpcy5fcEJvdW5kc0ludmFsaWQpXG5cdFx0XHR0aGlzLnBVcGRhdGVCb3VuZHMoKTtcblxuXHRcdHJldHVybiB0aGlzLl9kZXB0aDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgZGVwdGgodmFsOm51bWJlcilcblx0e1xuXHRcdGlmICh0aGlzLl9kZXB0aCA9PSB2YWwpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9kZXB0aCA9PSB2YWw7XG5cblx0XHR0aGlzLl9wU2NhbGVaID0gdmFsL3RoaXMuYm91bmRzLmFhYmIuZGVwdGg7XG5cblx0XHR0aGlzLmludmFsaWRhdGVTY2FsZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIERlZmluZXMgdGhlIHJvdGF0aW9uIG9mIHRoZSAzZCBvYmplY3QgYXMgYSA8Y29kZT5WZWN0b3IzRDwvY29kZT4gb2JqZWN0IGNvbnRhaW5pbmcgZXVsZXIgYW5nbGVzIGZvciByb3RhdGlvbiBhcm91bmQgeCwgeSBhbmQgeiBheGlzLlxuXHQgKi9cblx0cHVibGljIGdldCBldWxlcnMoKTpWZWN0b3IzRFxuXHR7XG5cdFx0dGhpcy5fZXVsZXJzLnggPSB0aGlzLl9yb3RhdGlvblgqTWF0aENvbnN0cy5SQURJQU5TX1RPX0RFR1JFRVM7XG5cdFx0dGhpcy5fZXVsZXJzLnkgPSB0aGlzLl9yb3RhdGlvblkqTWF0aENvbnN0cy5SQURJQU5TX1RPX0RFR1JFRVM7XG5cdFx0dGhpcy5fZXVsZXJzLnogPSB0aGlzLl9yb3RhdGlvbloqTWF0aENvbnN0cy5SQURJQU5TX1RPX0RFR1JFRVM7XG5cblx0XHRyZXR1cm4gdGhpcy5fZXVsZXJzO1xuXHR9XG5cblx0cHVibGljIHNldCBldWxlcnModmFsdWU6VmVjdG9yM0QpXG5cdHtcblx0XHR0aGlzLl9yb3RhdGlvblggPSB2YWx1ZS54Kk1hdGhDb25zdHMuREVHUkVFU19UT19SQURJQU5TO1xuXHRcdHRoaXMuX3JvdGF0aW9uWSA9IHZhbHVlLnkqTWF0aENvbnN0cy5ERUdSRUVTX1RPX1JBRElBTlM7XG5cdFx0dGhpcy5fcm90YXRpb25aID0gdmFsdWUueipNYXRoQ29uc3RzLkRFR1JFRVNfVE9fUkFESUFOUztcblxuXHRcdHRoaXMuaW52YWxpZGF0ZVJvdGF0aW9uKCk7XG5cdH1cblxuXHQvKipcblx0ICogQW4gb2JqZWN0IHRoYXQgY2FuIGNvbnRhaW4gYW55IGV4dHJhIGRhdGEuXG5cdCAqL1xuXHRwdWJsaWMgZXh0cmE6T2JqZWN0O1xuXG5cdC8qKlxuXHQgKiBBbiBpbmRleGVkIGFycmF5IHRoYXQgY29udGFpbnMgZWFjaCBmaWx0ZXIgb2JqZWN0IGN1cnJlbnRseSBhc3NvY2lhdGVkXG5cdCAqIHdpdGggdGhlIGRpc3BsYXkgb2JqZWN0LiBUaGUgZmxhc2guZmlsdGVycyBwYWNrYWdlIGNvbnRhaW5zIHNldmVyYWxcblx0ICogY2xhc3NlcyB0aGF0IGRlZmluZSBzcGVjaWZpYyBmaWx0ZXJzIHlvdSBjYW4gdXNlLlxuXHQgKlxuXHQgKiA8cD5GaWx0ZXJzIGNhbiBiZSBhcHBsaWVkIGluIEZsYXNoIFByb2Zlc3Npb25hbCBhdCBkZXNpZ24gdGltZSwgb3IgYXQgcnVuXG5cdCAqIHRpbWUgYnkgdXNpbmcgQWN0aW9uU2NyaXB0IGNvZGUuIFRvIGFwcGx5IGEgZmlsdGVyIGJ5IHVzaW5nIEFjdGlvblNjcmlwdCxcblx0ICogeW91IG11c3QgbWFrZSBhIHRlbXBvcmFyeSBjb3B5IG9mIHRoZSBlbnRpcmUgPGNvZGU+ZmlsdGVyczwvY29kZT4gYXJyYXksXG5cdCAqIG1vZGlmeSB0aGUgdGVtcG9yYXJ5IGFycmF5LCB0aGVuIGFzc2lnbiB0aGUgdmFsdWUgb2YgdGhlIHRlbXBvcmFyeSBhcnJheVxuXHQgKiBiYWNrIHRvIHRoZSA8Y29kZT5maWx0ZXJzPC9jb2RlPiBhcnJheS4gWW91IGNhbm5vdCBkaXJlY3RseSBhZGQgYSBuZXdcblx0ICogZmlsdGVyIG9iamVjdCB0byB0aGUgPGNvZGU+ZmlsdGVyczwvY29kZT4gYXJyYXkuPC9wPlxuXHQgKlxuXHQgKiA8cD5UbyBhZGQgYSBmaWx0ZXIgYnkgdXNpbmcgQWN0aW9uU2NyaXB0LCBwZXJmb3JtIHRoZSBmb2xsb3dpbmcgc3RlcHNcblx0ICogKGFzc3VtZSB0aGF0IHRoZSB0YXJnZXQgZGlzcGxheSBvYmplY3QgaXMgbmFtZWRcblx0ICogPGNvZGU+bXlEaXNwbGF5T2JqZWN0PC9jb2RlPik6PC9wPlxuXHQgKlxuXHQgKiA8b2w+XG5cdCAqICAgPGxpPkNyZWF0ZSBhIG5ldyBmaWx0ZXIgb2JqZWN0IGJ5IHVzaW5nIHRoZSBjb25zdHJ1Y3RvciBtZXRob2Qgb2YgeW91clxuXHQgKiBjaG9zZW4gZmlsdGVyIGNsYXNzLjwvbGk+XG5cdCAqICAgPGxpPkFzc2lnbiB0aGUgdmFsdWUgb2YgdGhlIDxjb2RlPm15RGlzcGxheU9iamVjdC5maWx0ZXJzPC9jb2RlPiBhcnJheVxuXHQgKiB0byBhIHRlbXBvcmFyeSBhcnJheSwgc3VjaCBhcyBvbmUgbmFtZWQgPGNvZGU+bXlGaWx0ZXJzPC9jb2RlPi48L2xpPlxuXHQgKiAgIDxsaT5BZGQgdGhlIG5ldyBmaWx0ZXIgb2JqZWN0IHRvIHRoZSA8Y29kZT5teUZpbHRlcnM8L2NvZGU+IHRlbXBvcmFyeVxuXHQgKiBhcnJheS48L2xpPlxuXHQgKiAgIDxsaT5Bc3NpZ24gdGhlIHZhbHVlIG9mIHRoZSB0ZW1wb3JhcnkgYXJyYXkgdG8gdGhlXG5cdCAqIDxjb2RlPm15RGlzcGxheU9iamVjdC5maWx0ZXJzPC9jb2RlPiBhcnJheS48L2xpPlxuXHQgKiA8L29sPlxuXHQgKlxuXHQgKiA8cD5JZiB0aGUgPGNvZGU+ZmlsdGVyczwvY29kZT4gYXJyYXkgaXMgdW5kZWZpbmVkLCB5b3UgZG8gbm90IG5lZWQgdG8gdXNlXG5cdCAqIGEgdGVtcG9yYXJ5IGFycmF5LiBJbnN0ZWFkLCB5b3UgY2FuIGRpcmVjdGx5IGFzc2lnbiBhbiBhcnJheSBsaXRlcmFsIHRoYXRcblx0ICogY29udGFpbnMgb25lIG9yIG1vcmUgZmlsdGVyIG9iamVjdHMgdGhhdCB5b3UgY3JlYXRlLiBUaGUgZmlyc3QgZXhhbXBsZSBpblxuXHQgKiB0aGUgRXhhbXBsZXMgc2VjdGlvbiBhZGRzIGEgZHJvcCBzaGFkb3cgZmlsdGVyIGJ5IHVzaW5nIGNvZGUgdGhhdCBoYW5kbGVzXG5cdCAqIGJvdGggZGVmaW5lZCBhbmQgdW5kZWZpbmVkIDxjb2RlPmZpbHRlcnM8L2NvZGU+IGFycmF5cy48L3A+XG5cdCAqXG5cdCAqIDxwPlRvIG1vZGlmeSBhbiBleGlzdGluZyBmaWx0ZXIgb2JqZWN0LCB5b3UgbXVzdCB1c2UgdGhlIHRlY2huaXF1ZSBvZlxuXHQgKiBtb2RpZnlpbmcgYSBjb3B5IG9mIHRoZSA8Y29kZT5maWx0ZXJzPC9jb2RlPiBhcnJheTo8L3A+XG5cdCAqXG5cdCAqIDxvbD5cblx0ICogICA8bGk+QXNzaWduIHRoZSB2YWx1ZSBvZiB0aGUgPGNvZGU+ZmlsdGVyczwvY29kZT4gYXJyYXkgdG8gYSB0ZW1wb3Jhcnlcblx0ICogYXJyYXksIHN1Y2ggYXMgb25lIG5hbWVkIDxjb2RlPm15RmlsdGVyczwvY29kZT4uPC9saT5cblx0ICogICA8bGk+TW9kaWZ5IHRoZSBwcm9wZXJ0eSBieSB1c2luZyB0aGUgdGVtcG9yYXJ5IGFycmF5LFxuXHQgKiA8Y29kZT5teUZpbHRlcnM8L2NvZGU+LiBGb3IgZXhhbXBsZSwgdG8gc2V0IHRoZSBxdWFsaXR5IHByb3BlcnR5IG9mIHRoZVxuXHQgKiBmaXJzdCBmaWx0ZXIgaW4gdGhlIGFycmF5LCB5b3UgY291bGQgdXNlIHRoZSBmb2xsb3dpbmcgY29kZTpcblx0ICogPGNvZGU+bXlGaWx0ZXJzWzBdLnF1YWxpdHkgPSAxOzwvY29kZT48L2xpPlxuXHQgKiAgIDxsaT5Bc3NpZ24gdGhlIHZhbHVlIG9mIHRoZSB0ZW1wb3JhcnkgYXJyYXkgdG8gdGhlIDxjb2RlPmZpbHRlcnM8L2NvZGU+XG5cdCAqIGFycmF5LjwvbGk+XG5cdCAqIDwvb2w+XG5cdCAqXG5cdCAqIDxwPkF0IGxvYWQgdGltZSwgaWYgYSBkaXNwbGF5IG9iamVjdCBoYXMgYW4gYXNzb2NpYXRlZCBmaWx0ZXIsIGl0IGlzXG5cdCAqIG1hcmtlZCB0byBjYWNoZSBpdHNlbGYgYXMgYSB0cmFuc3BhcmVudCBiaXRtYXAuIEZyb20gdGhpcyBwb2ludCBmb3J3YXJkLFxuXHQgKiBhcyBsb25nIGFzIHRoZSBkaXNwbGF5IG9iamVjdCBoYXMgYSB2YWxpZCBmaWx0ZXIgbGlzdCwgdGhlIHBsYXllciBjYWNoZXNcblx0ICogdGhlIGRpc3BsYXkgb2JqZWN0IGFzIGEgYml0bWFwLiBUaGlzIHNvdXJjZSBiaXRtYXAgaXMgdXNlZCBhcyBhIHNvdXJjZVxuXHQgKiBpbWFnZSBmb3IgdGhlIGZpbHRlciBlZmZlY3RzLiBFYWNoIGRpc3BsYXkgb2JqZWN0IHVzdWFsbHkgaGFzIHR3byBiaXRtYXBzOlxuXHQgKiBvbmUgd2l0aCB0aGUgb3JpZ2luYWwgdW5maWx0ZXJlZCBzb3VyY2UgZGlzcGxheSBvYmplY3QgYW5kIGFub3RoZXIgZm9yIHRoZVxuXHQgKiBmaW5hbCBpbWFnZSBhZnRlciBmaWx0ZXJpbmcuIFRoZSBmaW5hbCBpbWFnZSBpcyB1c2VkIHdoZW4gcmVuZGVyaW5nLiBBc1xuXHQgKiBsb25nIGFzIHRoZSBkaXNwbGF5IG9iamVjdCBkb2VzIG5vdCBjaGFuZ2UsIHRoZSBmaW5hbCBpbWFnZSBkb2VzIG5vdCBuZWVkXG5cdCAqIHVwZGF0aW5nLjwvcD5cblx0ICpcblx0ICogPHA+VGhlIGZsYXNoLmZpbHRlcnMgcGFja2FnZSBpbmNsdWRlcyBjbGFzc2VzIGZvciBmaWx0ZXJzLiBGb3IgZXhhbXBsZSwgdG9cblx0ICogY3JlYXRlIGEgRHJvcFNoYWRvdyBmaWx0ZXIsIHlvdSB3b3VsZCB3cml0ZTo8L3A+XG5cdCAqXG5cdCAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciBXaGVuIDxjb2RlPmZpbHRlcnM8L2NvZGU+IGluY2x1ZGVzIGEgU2hhZGVyRmlsdGVyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBhbmQgdGhlIHNoYWRlciBvdXRwdXQgdHlwZSBpcyBub3QgY29tcGF0aWJsZSB3aXRoXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICB0aGlzIG9wZXJhdGlvbih0aGUgc2hhZGVyIG11c3Qgc3BlY2lmeSBhXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5waXhlbDQ8L2NvZGU+IG91dHB1dCkuXG5cdCAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciBXaGVuIDxjb2RlPmZpbHRlcnM8L2NvZGU+IGluY2x1ZGVzIGEgU2hhZGVyRmlsdGVyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBhbmQgdGhlIHNoYWRlciBkb2Vzbid0IHNwZWNpZnkgYW55IGltYWdlIGlucHV0IG9yXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICB0aGUgZmlyc3QgaW5wdXQgaXMgbm90IGFuIDxjb2RlPmltYWdlNDwvY29kZT4gaW5wdXQuXG5cdCAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciBXaGVuIDxjb2RlPmZpbHRlcnM8L2NvZGU+IGluY2x1ZGVzIGEgU2hhZGVyRmlsdGVyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBhbmQgdGhlIHNoYWRlciBzcGVjaWZpZXMgYW4gaW1hZ2UgaW5wdXQgdGhhdCBpc24ndFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZWQuXG5cdCAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciBXaGVuIDxjb2RlPmZpbHRlcnM8L2NvZGU+IGluY2x1ZGVzIGEgU2hhZGVyRmlsdGVyLCBhXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBCeXRlQXJyYXkgb3IgVmVjdG9yLjxOdW1iZXI+IGluc3RhbmNlIGFzIGEgc2hhZGVyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBpbnB1dCwgYW5kIHRoZSA8Y29kZT53aWR0aDwvY29kZT4gYW5kXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5oZWlnaHQ8L2NvZGU+IHByb3BlcnRpZXMgYXJlbid0IHNwZWNpZmllZCBmb3Jcblx0ICogICAgICAgICAgICAgICAgICAgICAgIHRoZSBTaGFkZXJJbnB1dCBvYmplY3QsIG9yIHRoZSBzcGVjaWZpZWQgdmFsdWVzXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBkb24ndCBtYXRjaCB0aGUgYW1vdW50IG9mIGRhdGEgaW4gdGhlIGlucHV0IGRhdGEuXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBTZWUgdGhlIDxjb2RlPlNoYWRlcklucHV0LmlucHV0PC9jb2RlPiBwcm9wZXJ0eSBmb3Jcblx0ICogICAgICAgICAgICAgICAgICAgICAgIG1vcmUgaW5mb3JtYXRpb24uXG5cdCAqL1xuLy9cdFx0cHVibGljIGZpbHRlcnM6QXJyYXk8RHluYW1pYz47XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB0aGUgaGVpZ2h0IG9mIHRoZSBkaXNwbGF5IG9iamVjdCwgaW4gcGl4ZWxzLiBUaGUgaGVpZ2h0IGlzXG5cdCAqIGNhbGN1bGF0ZWQgYmFzZWQgb24gdGhlIGJvdW5kcyBvZiB0aGUgY29udGVudCBvZiB0aGUgZGlzcGxheSBvYmplY3QuIFdoZW5cblx0ICogeW91IHNldCB0aGUgPGNvZGU+aGVpZ2h0PC9jb2RlPiBwcm9wZXJ0eSwgdGhlIDxjb2RlPnNjYWxlWTwvY29kZT4gcHJvcGVydHlcblx0ICogaXMgYWRqdXN0ZWQgYWNjb3JkaW5nbHksIGFzIHNob3duIGluIHRoZSBmb2xsb3dpbmcgY29kZTpcblx0ICpcblx0ICogPHA+RXhjZXB0IGZvciBUZXh0RmllbGQgYW5kIFZpZGVvIG9iamVjdHMsIGEgZGlzcGxheSBvYmplY3Qgd2l0aCBub1xuXHQgKiBjb250ZW50IChzdWNoIGFzIGFuIGVtcHR5IHNwcml0ZSkgaGFzIGEgaGVpZ2h0IG9mIDAsIGV2ZW4gaWYgeW91IHRyeSB0b1xuXHQgKiBzZXQgPGNvZGU+aGVpZ2h0PC9jb2RlPiB0byBhIGRpZmZlcmVudCB2YWx1ZS48L3A+XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGhlaWdodCgpOm51bWJlclxuXHR7XG5cdFx0aWYgKHRoaXMuX3BCb3VuZHNJbnZhbGlkKVxuXHRcdFx0dGhpcy5wVXBkYXRlQm91bmRzKCk7XG5cblx0XHRyZXR1cm4gdGhpcy5faGVpZ2h0O1xuXHR9XG5cblx0cHVibGljIHNldCBoZWlnaHQodmFsOm51bWJlcilcblx0e1xuXHRcdGlmICh0aGlzLl9oZWlnaHQgPT0gdmFsKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5faGVpZ2h0ID09IHZhbDtcblxuXHRcdHRoaXMuX3BTY2FsZVkgPSB2YWwvdGhpcy5ib3VuZHMuYWFiYi5oZWlnaHQ7XG5cblx0XHR0aGlzLmludmFsaWRhdGVTY2FsZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB0aGUgaW5zdGFuY2UgY29udGFpbmVyIGluZGV4IG9mIHRoZSBEaXNwbGF5T2JqZWN0LiBUaGUgb2JqZWN0IGNhbiBiZVxuXHQgKiBpZGVudGlmaWVkIGluIHRoZSBjaGlsZCBsaXN0IG9mIGl0cyBwYXJlbnQgZGlzcGxheSBvYmplY3QgY29udGFpbmVyIGJ5XG5cdCAqIGNhbGxpbmcgdGhlIDxjb2RlPmdldENoaWxkQnlJbmRleCgpPC9jb2RlPiBtZXRob2Qgb2YgdGhlIGRpc3BsYXkgb2JqZWN0XG5cdCAqIGNvbnRhaW5lci5cblx0ICpcblx0ICogPHA+SWYgdGhlIERpc3BsYXlPYmplY3QgaGFzIG5vIHBhcmVudCBjb250YWluZXIsIGluZGV4IGRlZmF1bHRzIHRvIDAuPC9wPlxuXHQgKi9cblx0cHVibGljIGdldCBpbmRleCgpOm51bWJlclxuXHR7XG5cdFx0aWYgKHRoaXMuX3BQYXJlbnQpXG5cdFx0XHRyZXR1cm4gdGhpcy5fcFBhcmVudC5nZXRDaGlsZEluZGV4KHRoaXMpO1xuXG5cdFx0cmV0dXJuIDA7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgaW52ZXJzZVNjZW5lVHJhbnNmb3JtKCk6TWF0cml4M0Rcblx0e1xuXHRcdGlmICh0aGlzLl9pbnZlcnNlU2NlbmVUcmFuc2Zvcm1EaXJ0eSkge1xuXHRcdFx0dGhpcy5faW52ZXJzZVNjZW5lVHJhbnNmb3JtLmNvcHlGcm9tKHRoaXMuc2NlbmVUcmFuc2Zvcm0pO1xuXHRcdFx0dGhpcy5faW52ZXJzZVNjZW5lVHJhbnNmb3JtLmludmVydCgpO1xuXHRcdFx0dGhpcy5faW52ZXJzZVNjZW5lVHJhbnNmb3JtRGlydHkgPSBmYWxzZTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuX2ludmVyc2VTY2VuZVRyYW5zZm9ybTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBpZ25vcmVUcmFuc2Zvcm0oKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcElnbm9yZVRyYW5zZm9ybTtcblx0fVxuXG5cdHB1YmxpYyBzZXQgaWdub3JlVHJhbnNmb3JtKHZhbHVlOmJvb2xlYW4pXG5cdHtcblx0XHRpZiAodGhpcy5fcElnbm9yZVRyYW5zZm9ybSA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3BJZ25vcmVUcmFuc2Zvcm0gPSB2YWx1ZTtcblxuXHRcdGlmICh2YWx1ZSkge1xuXHRcdFx0dGhpcy5fcFNjZW5lVHJhbnNmb3JtLmlkZW50aXR5KCk7XG5cdFx0XHR0aGlzLl9zY2VuZVBvc2l0aW9uLnNldFRvKDAsIDAsIDApO1xuXHRcdH1cblxuXHRcdHRoaXMucEludmFsaWRhdGVTY2VuZVRyYW5zZm9ybSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGlzRW50aXR5KClcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wSXNFbnRpdHk7XG5cdH1cblx0LyoqXG5cdCAqIFJldHVybnMgYSBMb2FkZXJJbmZvIG9iamVjdCBjb250YWluaW5nIGluZm9ybWF0aW9uIGFib3V0IGxvYWRpbmcgdGhlIGZpbGVcblx0ICogdG8gd2hpY2ggdGhpcyBkaXNwbGF5IG9iamVjdCBiZWxvbmdzLiBUaGUgPGNvZGU+bG9hZGVySW5mbzwvY29kZT4gcHJvcGVydHlcblx0ICogaXMgZGVmaW5lZCBvbmx5IGZvciB0aGUgcm9vdCBkaXNwbGF5IG9iamVjdCBvZiBhIFNXRiBmaWxlIG9yIGZvciBhIGxvYWRlZFxuXHQgKiBCaXRtYXAobm90IGZvciBhIEJpdG1hcCB0aGF0IGlzIGRyYXduIHdpdGggQWN0aW9uU2NyaXB0KS4gVG8gZmluZCB0aGVcblx0ICogPGNvZGU+bG9hZGVySW5mbzwvY29kZT4gb2JqZWN0IGFzc29jaWF0ZWQgd2l0aCB0aGUgU1dGIGZpbGUgdGhhdCBjb250YWluc1xuXHQgKiBhIGRpc3BsYXkgb2JqZWN0IG5hbWVkIDxjb2RlPm15RGlzcGxheU9iamVjdDwvY29kZT4sIHVzZVxuXHQgKiA8Y29kZT5teURpc3BsYXlPYmplY3Qucm9vdC5sb2FkZXJJbmZvPC9jb2RlPi5cblx0ICpcblx0ICogPHA+QSBsYXJnZSBTV0YgZmlsZSBjYW4gbW9uaXRvciBpdHMgZG93bmxvYWQgYnkgY2FsbGluZ1xuXHQgKiA8Y29kZT50aGlzLnJvb3QubG9hZGVySW5mby5hZGRFdmVudExpc3RlbmVyKEV2ZW50LkNPTVBMRVRFLFxuXHQgKiBmdW5jKTwvY29kZT4uPC9wPlxuXHQgKi9cblx0cHVibGljIGdldCBsb2FkZXJJbmZvKCk6TG9hZGVySW5mb1xuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2xvYWRlckluZm87XG5cdH1cblxuXHQvKipcblx0ICogVGhlIGNhbGxpbmcgZGlzcGxheSBvYmplY3QgaXMgbWFza2VkIGJ5IHRoZSBzcGVjaWZpZWQgPGNvZGU+bWFzazwvY29kZT5cblx0ICogb2JqZWN0LiBUbyBlbnN1cmUgdGhhdCBtYXNraW5nIHdvcmtzIHdoZW4gdGhlIFN0YWdlIGlzIHNjYWxlZCwgdGhlXG5cdCAqIDxjb2RlPm1hc2s8L2NvZGU+IGRpc3BsYXkgb2JqZWN0IG11c3QgYmUgaW4gYW4gYWN0aXZlIHBhcnQgb2YgdGhlIGRpc3BsYXlcblx0ICogbGlzdC4gVGhlIDxjb2RlPm1hc2s8L2NvZGU+IG9iamVjdCBpdHNlbGYgaXMgbm90IGRyYXduLiBTZXRcblx0ICogPGNvZGU+bWFzazwvY29kZT4gdG8gPGNvZGU+bnVsbDwvY29kZT4gdG8gcmVtb3ZlIHRoZSBtYXNrLlxuXHQgKlxuXHQgKiA8cD5UbyBiZSBhYmxlIHRvIHNjYWxlIGEgbWFzayBvYmplY3QsIGl0IG11c3QgYmUgb24gdGhlIGRpc3BsYXkgbGlzdC4gVG9cblx0ICogYmUgYWJsZSB0byBkcmFnIGEgbWFzayBTcHJpdGUgb2JqZWN0KGJ5IGNhbGxpbmcgaXRzXG5cdCAqIDxjb2RlPnN0YXJ0RHJhZygpPC9jb2RlPiBtZXRob2QpLCBpdCBtdXN0IGJlIG9uIHRoZSBkaXNwbGF5IGxpc3QuIFRvIGNhbGxcblx0ICogdGhlIDxjb2RlPnN0YXJ0RHJhZygpPC9jb2RlPiBtZXRob2QgZm9yIGEgbWFzayBzcHJpdGUgYmFzZWQgb24gYVxuXHQgKiA8Y29kZT5tb3VzZURvd248L2NvZGU+IGV2ZW50IGJlaW5nIGRpc3BhdGNoZWQgYnkgdGhlIHNwcml0ZSwgc2V0IHRoZVxuXHQgKiBzcHJpdGUncyA8Y29kZT5idXR0b25Nb2RlPC9jb2RlPiBwcm9wZXJ0eSB0byA8Y29kZT50cnVlPC9jb2RlPi48L3A+XG5cdCAqXG5cdCAqIDxwPldoZW4gZGlzcGxheSBvYmplY3RzIGFyZSBjYWNoZWQgYnkgc2V0dGluZyB0aGVcblx0ICogPGNvZGU+Y2FjaGVBc0JpdG1hcDwvY29kZT4gcHJvcGVydHkgdG8gPGNvZGU+dHJ1ZTwvY29kZT4gYW4gdGhlXG5cdCAqIDxjb2RlPmNhY2hlQXNCaXRtYXBNYXRyaXg8L2NvZGU+IHByb3BlcnR5IHRvIGEgTWF0cml4IG9iamVjdCwgYm90aCB0aGVcblx0ICogbWFzayBhbmQgdGhlIGRpc3BsYXkgb2JqZWN0IGJlaW5nIG1hc2tlZCBtdXN0IGJlIHBhcnQgb2YgdGhlIHNhbWUgY2FjaGVkXG5cdCAqIGJpdG1hcC4gVGh1cywgaWYgdGhlIGRpc3BsYXkgb2JqZWN0IGlzIGNhY2hlZCwgdGhlbiB0aGUgbWFzayBtdXN0IGJlIGFcblx0ICogY2hpbGQgb2YgdGhlIGRpc3BsYXkgb2JqZWN0LiBJZiBhbiBhbmNlc3RvciBvZiB0aGUgZGlzcGxheSBvYmplY3Qgb24gdGhlXG5cdCAqIGRpc3BsYXkgbGlzdCBpcyBjYWNoZWQsIHRoZW4gdGhlIG1hc2sgbXVzdCBiZSBhIGNoaWxkIG9mIHRoYXQgYW5jZXN0b3Igb3Jcblx0ICogb25lIG9mIGl0cyBkZXNjZW5kZW50cy4gSWYgbW9yZSB0aGFuIG9uZSBhbmNlc3RvciBvZiB0aGUgbWFza2VkIG9iamVjdCBpc1xuXHQgKiBjYWNoZWQsIHRoZW4gdGhlIG1hc2sgbXVzdCBiZSBhIGRlc2NlbmRlbnQgb2YgdGhlIGNhY2hlZCBjb250YWluZXIgY2xvc2VzdFxuXHQgKiB0byB0aGUgbWFza2VkIG9iamVjdCBpbiB0aGUgZGlzcGxheSBsaXN0LjwvcD5cblx0ICpcblx0ICogPHA+PGI+Tm90ZTo8L2I+IEEgc2luZ2xlIDxjb2RlPm1hc2s8L2NvZGU+IG9iamVjdCBjYW5ub3QgYmUgdXNlZCB0byBtYXNrXG5cdCAqIG1vcmUgdGhhbiBvbmUgY2FsbGluZyBkaXNwbGF5IG9iamVjdC4gV2hlbiB0aGUgPGNvZGU+bWFzazwvY29kZT4gaXNcblx0ICogYXNzaWduZWQgdG8gYSBzZWNvbmQgZGlzcGxheSBvYmplY3QsIGl0IGlzIHJlbW92ZWQgYXMgdGhlIG1hc2sgb2YgdGhlXG5cdCAqIGZpcnN0IG9iamVjdCwgYW5kIHRoYXQgb2JqZWN0J3MgPGNvZGU+bWFzazwvY29kZT4gcHJvcGVydHkgYmVjb21lc1xuXHQgKiA8Y29kZT5udWxsPC9jb2RlPi48L3A+XG5cdCAqL1xuXHRwdWJsaWMgbWFzazpEaXNwbGF5T2JqZWN0O1xuXG5cdC8qKlxuXHQgKiBTcGVjaWZpZXMgd2hldGhlciB0aGlzIG9iamVjdCByZWNlaXZlcyBtb3VzZSwgb3Igb3RoZXIgdXNlciBpbnB1dCxcblx0ICogbWVzc2FnZXMuIFRoZSBkZWZhdWx0IHZhbHVlIGlzIDxjb2RlPnRydWU8L2NvZGU+LCB3aGljaCBtZWFucyB0aGF0IGJ5XG5cdCAqIGRlZmF1bHQgYW55IEludGVyYWN0aXZlT2JqZWN0IGluc3RhbmNlIHRoYXQgaXMgb24gdGhlIGRpc3BsYXkgbGlzdFxuXHQgKiByZWNlaXZlcyBtb3VzZSBldmVudHMgb3Igb3RoZXIgdXNlciBpbnB1dCBldmVudHMuIElmXG5cdCAqIDxjb2RlPm1vdXNlRW5hYmxlZDwvY29kZT4gaXMgc2V0IHRvIDxjb2RlPmZhbHNlPC9jb2RlPiwgdGhlIGluc3RhbmNlIGRvZXNcblx0ICogbm90IHJlY2VpdmUgYW55IG1vdXNlIGV2ZW50cyhvciBvdGhlciB1c2VyIGlucHV0IGV2ZW50cyBsaWtlIGtleWJvYXJkXG5cdCAqIGV2ZW50cykuIEFueSBjaGlsZHJlbiBvZiB0aGlzIGluc3RhbmNlIG9uIHRoZSBkaXNwbGF5IGxpc3QgYXJlIG5vdFxuXHQgKiBhZmZlY3RlZC4gVG8gY2hhbmdlIHRoZSA8Y29kZT5tb3VzZUVuYWJsZWQ8L2NvZGU+IGJlaGF2aW9yIGZvciBhbGxcblx0ICogY2hpbGRyZW4gb2YgYW4gb2JqZWN0IG9uIHRoZSBkaXNwbGF5IGxpc3QsIHVzZVxuXHQgKiA8Y29kZT5mbGFzaC5kaXNwbGF5LkRpc3BsYXlPYmplY3RDb250YWluZXIubW91c2VDaGlsZHJlbjwvY29kZT4uXG5cdCAqXG5cdCAqIDxwPiBObyBldmVudCBpcyBkaXNwYXRjaGVkIGJ5IHNldHRpbmcgdGhpcyBwcm9wZXJ0eS4gWW91IG11c3QgdXNlIHRoZVxuXHQgKiA8Y29kZT5hZGRFdmVudExpc3RlbmVyKCk8L2NvZGU+IG1ldGhvZCB0byBjcmVhdGUgaW50ZXJhY3RpdmVcblx0ICogZnVuY3Rpb25hbGl0eS48L3A+XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IG1vdXNlRW5hYmxlZCgpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9leHBsaWNpdE1vdXNlRW5hYmxlZDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgbW91c2VFbmFibGVkKHZhbHVlOmJvb2xlYW4pXG5cdHtcblx0XHRpZiAodGhpcy5fZXhwbGljaXRNb3VzZUVuYWJsZWQgPT0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9leHBsaWNpdE1vdXNlRW5hYmxlZCA9IHZhbHVlO1xuXG5cdFx0dGhpcy5fcFVwZGF0ZUltcGxpY2l0TW91c2VFbmFibGVkKHRoaXMuX3BQYXJlbnQ/IHRoaXMuX3BQYXJlbnQubW91c2VDaGlsZHJlbiA6IHRydWUpO1xuXHR9XG5cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHRoZSB4IGNvb3JkaW5hdGUgb2YgdGhlIG1vdXNlIG9yIHVzZXIgaW5wdXQgZGV2aWNlIHBvc2l0aW9uLCBpblxuXHQgKiBwaXhlbHMuXG5cdCAqXG5cdCAqIDxwPjxiPk5vdGU8L2I+OiBGb3IgYSBEaXNwbGF5T2JqZWN0IHRoYXQgaGFzIGJlZW4gcm90YXRlZCwgdGhlIHJldHVybmVkIHhcblx0ICogY29vcmRpbmF0ZSB3aWxsIHJlZmxlY3QgdGhlIG5vbi1yb3RhdGVkIG9iamVjdC48L3A+XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IG1vdXNlWCgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX21vdXNlWDtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgdGhlIHkgY29vcmRpbmF0ZSBvZiB0aGUgbW91c2Ugb3IgdXNlciBpbnB1dCBkZXZpY2UgcG9zaXRpb24sIGluXG5cdCAqIHBpeGVscy5cblx0ICpcblx0ICogPHA+PGI+Tm90ZTwvYj46IEZvciBhIERpc3BsYXlPYmplY3QgdGhhdCBoYXMgYmVlbiByb3RhdGVkLCB0aGUgcmV0dXJuZWQgeVxuXHQgKiBjb29yZGluYXRlIHdpbGwgcmVmbGVjdCB0aGUgbm9uLXJvdGF0ZWQgb2JqZWN0LjwvcD5cblx0ICovXG5cdHB1YmxpYyBnZXQgbW91c2VZKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fbW91c2VZO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB0aGUgaW5zdGFuY2UgbmFtZSBvZiB0aGUgRGlzcGxheU9iamVjdC4gVGhlIG9iamVjdCBjYW4gYmVcblx0ICogaWRlbnRpZmllZCBpbiB0aGUgY2hpbGQgbGlzdCBvZiBpdHMgcGFyZW50IGRpc3BsYXkgb2JqZWN0IGNvbnRhaW5lciBieVxuXHQgKiBjYWxsaW5nIHRoZSA8Y29kZT5nZXRDaGlsZEJ5TmFtZSgpPC9jb2RlPiBtZXRob2Qgb2YgdGhlIGRpc3BsYXkgb2JqZWN0XG5cdCAqIGNvbnRhaW5lci5cblx0ICpcblx0ICogQHRocm93cyBJbGxlZ2FsT3BlcmF0aW9uRXJyb3IgSWYgeW91IGFyZSBhdHRlbXB0aW5nIHRvIHNldCB0aGlzIHByb3BlcnR5XG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uIGFuIG9iamVjdCB0aGF0IHdhcyBwbGFjZWQgb24gdGhlIHRpbWVsaW5lXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluIHRoZSBGbGFzaCBhdXRob3JpbmcgdG9vbC5cblx0ICovXG5cdHB1YmxpYyBuYW1lOnN0cmluZztcblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBvcmllbnRhdGlvbk1vZGU6c3RyaW5nID0gT3JpZW50YXRpb25Nb2RlLkRFRkFVTFQ7XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB0aGUgRGlzcGxheU9iamVjdENvbnRhaW5lciBvYmplY3QgdGhhdCBjb250YWlucyB0aGlzIGRpc3BsYXlcblx0ICogb2JqZWN0LiBVc2UgdGhlIDxjb2RlPnBhcmVudDwvY29kZT4gcHJvcGVydHkgdG8gc3BlY2lmeSBhIHJlbGF0aXZlIHBhdGggdG9cblx0ICogZGlzcGxheSBvYmplY3RzIHRoYXQgYXJlIGFib3ZlIHRoZSBjdXJyZW50IGRpc3BsYXkgb2JqZWN0IGluIHRoZSBkaXNwbGF5XG5cdCAqIGxpc3QgaGllcmFyY2h5LlxuXHQgKlxuXHQgKiA8cD5Zb3UgY2FuIHVzZSA8Y29kZT5wYXJlbnQ8L2NvZGU+IHRvIG1vdmUgdXAgbXVsdGlwbGUgbGV2ZWxzIGluIHRoZVxuXHQgKiBkaXNwbGF5IGxpc3QgYXMgaW4gdGhlIGZvbGxvd2luZzo8L3A+XG5cdCAqXG5cdCAqIEB0aHJvd3MgU2VjdXJpdHlFcnJvciBUaGUgcGFyZW50IGRpc3BsYXkgb2JqZWN0IGJlbG9uZ3MgdG8gYSBzZWN1cml0eVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgc2FuZGJveCB0byB3aGljaCB5b3UgZG8gbm90IGhhdmUgYWNjZXNzLiBZb3UgY2FuXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBhdm9pZCB0aGlzIHNpdHVhdGlvbiBieSBoYXZpbmcgdGhlIHBhcmVudCBtb3ZpZSBjYWxsXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICB0aGUgPGNvZGU+U2VjdXJpdHkuYWxsb3dEb21haW4oKTwvY29kZT4gbWV0aG9kLlxuXHQgKi9cblx0cHVibGljIGdldCBwYXJlbnQoKTpEaXNwbGF5T2JqZWN0Q29udGFpbmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcFBhcmVudDtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBwYXJ0aXRpb24oKTpQYXJ0aXRpb25cblx0e1xuXHRcdHJldHVybiB0aGlzLl9leHBsaWNpdFBhcnRpdGlvbjtcblx0fVxuXG5cdHB1YmxpYyBzZXQgcGFydGl0aW9uKHZhbHVlOlBhcnRpdGlvbilcblx0e1xuXHRcdGlmICh0aGlzLl9leHBsaWNpdFBhcnRpdGlvbiA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdGlmICh0aGlzLl9wU2NlbmUgJiYgdGhpcy5fZXhwbGljaXRQYXJ0aXRpb24pXG5cdFx0XHR0aGlzLl9wU2NlbmUuaVVucmVnaXN0ZXJQYXJ0aXRpb24odGhpcy5fZXhwbGljaXRQYXJ0aXRpb24pO1xuXG5cdFx0dGhpcy5fZXhwbGljaXRQYXJ0aXRpb24gPSB2YWx1ZTtcblxuXHRcdGlmICh0aGlzLl9wU2NlbmUgJiYgdmFsdWUpXG5cdFx0XHR0aGlzLl9wU2NlbmUuaVJlZ2lzdGVyUGFydGl0aW9uKHZhbHVlKTtcblxuXHRcdHRoaXMuX3BVcGRhdGVJbXBsaWNpdFBhcnRpdGlvbih0aGlzLl9wUGFyZW50PyB0aGlzLl9wUGFyZW50Ll9pQXNzaWduZWRQYXJ0aXRpb24gOiBudWxsKTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBwYXJ0aXRpb25Ob2RlKCk6RW50aXR5Tm9kZVxuXHR7XG5cdFx0aWYgKCF0aGlzLl9wYXJ0aXRpb25Ob2RlKVxuXHRcdFx0dGhpcy5fcGFydGl0aW9uTm9kZSA9IHRoaXMucENyZWF0ZUVudGl0eVBhcnRpdGlvbk5vZGUoKTtcblxuXHRcdHJldHVybiB0aGlzLl9wYXJ0aXRpb25Ob2RlO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHBpY2tpbmdDb2xsaWRlcigpOklQaWNraW5nQ29sbGlkZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wUGlja2luZ0NvbGxpZGVyO1xuXHR9XG5cblx0cHVibGljIHNldCBwaWNraW5nQ29sbGlkZXIodmFsdWU6SVBpY2tpbmdDb2xsaWRlcilcblx0e1xuXHRcdHRoaXMuX3BQaWNraW5nQ29sbGlkZXIgPSB2YWx1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBEZWZpbmVzIHRoZSBsb2NhbCBwb2ludCBhcm91bmQgd2hpY2ggdGhlIG9iamVjdCByb3RhdGVzLlxuXHQgKi9cblx0cHVibGljIGdldCBwaXZvdCgpOlZlY3RvcjNEXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcGl2b3Q7XG5cdH1cblxuXG5cdHB1YmxpYyBzZXQgcGl2b3QocGl2b3Q6VmVjdG9yM0QpXG5cdHtcblx0XHR0aGlzLl9waXZvdCA9IHBpdm90LmNsb25lKCk7XG5cblx0XHR0aGlzLmludmFsaWRhdGVQaXZvdCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEZvciBhIGRpc3BsYXkgb2JqZWN0IGluIGEgbG9hZGVkIFNXRiBmaWxlLCB0aGUgPGNvZGU+cm9vdDwvY29kZT4gcHJvcGVydHlcblx0ICogaXMgdGhlIHRvcC1tb3N0IGRpc3BsYXkgb2JqZWN0IGluIHRoZSBwb3J0aW9uIG9mIHRoZSBkaXNwbGF5IGxpc3QncyB0cmVlXG5cdCAqIHN0cnVjdHVyZSByZXByZXNlbnRlZCBieSB0aGF0IFNXRiBmaWxlLiBGb3IgYSBCaXRtYXAgb2JqZWN0IHJlcHJlc2VudGluZyBhXG5cdCAqIGxvYWRlZCBpbWFnZSBmaWxlLCB0aGUgPGNvZGU+cm9vdDwvY29kZT4gcHJvcGVydHkgaXMgdGhlIEJpdG1hcCBvYmplY3Rcblx0ICogaXRzZWxmLiBGb3IgdGhlIGluc3RhbmNlIG9mIHRoZSBtYWluIGNsYXNzIG9mIHRoZSBmaXJzdCBTV0YgZmlsZSBsb2FkZWQsXG5cdCAqIHRoZSA8Y29kZT5yb290PC9jb2RlPiBwcm9wZXJ0eSBpcyB0aGUgZGlzcGxheSBvYmplY3QgaXRzZWxmLiBUaGVcblx0ICogPGNvZGU+cm9vdDwvY29kZT4gcHJvcGVydHkgb2YgdGhlIFN0YWdlIG9iamVjdCBpcyB0aGUgU3RhZ2Ugb2JqZWN0IGl0c2VsZi5cblx0ICogVGhlIDxjb2RlPnJvb3Q8L2NvZGU+IHByb3BlcnR5IGlzIHNldCB0byA8Y29kZT5udWxsPC9jb2RlPiBmb3IgYW55IGRpc3BsYXlcblx0ICogb2JqZWN0IHRoYXQgaGFzIG5vdCBiZWVuIGFkZGVkIHRvIHRoZSBkaXNwbGF5IGxpc3QsIHVubGVzcyBpdCBoYXMgYmVlblxuXHQgKiBhZGRlZCB0byBhIGRpc3BsYXkgb2JqZWN0IGNvbnRhaW5lciB0aGF0IGlzIG9mZiB0aGUgZGlzcGxheSBsaXN0IGJ1dCB0aGF0XG5cdCAqIGlzIGEgY2hpbGQgb2YgdGhlIHRvcC1tb3N0IGRpc3BsYXkgb2JqZWN0IGluIGEgbG9hZGVkIFNXRiBmaWxlLlxuXHQgKlxuXHQgKiA8cD5Gb3IgZXhhbXBsZSwgaWYgeW91IGNyZWF0ZSBhIG5ldyBTcHJpdGUgb2JqZWN0IGJ5IGNhbGxpbmcgdGhlXG5cdCAqIDxjb2RlPlNwcml0ZSgpPC9jb2RlPiBjb25zdHJ1Y3RvciBtZXRob2QsIGl0cyA8Y29kZT5yb290PC9jb2RlPiBwcm9wZXJ0eVxuXHQgKiBpcyA8Y29kZT5udWxsPC9jb2RlPiB1bnRpbCB5b3UgYWRkIGl0IHRvIHRoZSBkaXNwbGF5IGxpc3Qob3IgdG8gYSBkaXNwbGF5XG5cdCAqIG9iamVjdCBjb250YWluZXIgdGhhdCBpcyBvZmYgdGhlIGRpc3BsYXkgbGlzdCBidXQgdGhhdCBpcyBhIGNoaWxkIG9mIHRoZVxuXHQgKiB0b3AtbW9zdCBkaXNwbGF5IG9iamVjdCBpbiBhIFNXRiBmaWxlKS48L3A+XG5cdCAqXG5cdCAqIDxwPkZvciBhIGxvYWRlZCBTV0YgZmlsZSwgZXZlbiB0aG91Z2ggdGhlIExvYWRlciBvYmplY3QgdXNlZCB0byBsb2FkIHRoZVxuXHQgKiBmaWxlIG1heSBub3QgYmUgb24gdGhlIGRpc3BsYXkgbGlzdCwgdGhlIHRvcC1tb3N0IGRpc3BsYXkgb2JqZWN0IGluIHRoZVxuXHQgKiBTV0YgZmlsZSBoYXMgaXRzIDxjb2RlPnJvb3Q8L2NvZGU+IHByb3BlcnR5IHNldCB0byBpdHNlbGYuIFRoZSBMb2FkZXJcblx0ICogb2JqZWN0IGRvZXMgbm90IGhhdmUgaXRzIDxjb2RlPnJvb3Q8L2NvZGU+IHByb3BlcnR5IHNldCB1bnRpbCBpdCBpcyBhZGRlZFxuXHQgKiBhcyBhIGNoaWxkIG9mIGEgZGlzcGxheSBvYmplY3QgZm9yIHdoaWNoIHRoZSA8Y29kZT5yb290PC9jb2RlPiBwcm9wZXJ0eSBpc1xuXHQgKiBzZXQuPC9wPlxuXHQgKi9cblx0cHVibGljIGdldCByb290KCk6RGlzcGxheU9iamVjdENvbnRhaW5lclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3Jvb3Q7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHRoZSByb3RhdGlvbiBvZiB0aGUgRGlzcGxheU9iamVjdCBpbnN0YW5jZSwgaW4gZGVncmVlcywgZnJvbSBpdHNcblx0ICogb3JpZ2luYWwgb3JpZW50YXRpb24uIFZhbHVlcyBmcm9tIDAgdG8gMTgwIHJlcHJlc2VudCBjbG9ja3dpc2Ugcm90YXRpb247XG5cdCAqIHZhbHVlcyBmcm9tIDAgdG8gLTE4MCByZXByZXNlbnQgY291bnRlcmNsb2Nrd2lzZSByb3RhdGlvbi4gVmFsdWVzIG91dHNpZGVcblx0ICogdGhpcyByYW5nZSBhcmUgYWRkZWQgdG8gb3Igc3VidHJhY3RlZCBmcm9tIDM2MCB0byBvYnRhaW4gYSB2YWx1ZSB3aXRoaW5cblx0ICogdGhlIHJhbmdlLiBGb3IgZXhhbXBsZSwgdGhlIHN0YXRlbWVudCA8Y29kZT5teV92aWRlby5yb3RhdGlvbiA9IDQ1MDwvY29kZT5cblx0ICogaXMgdGhlIHNhbWUgYXMgPGNvZGU+IG15X3ZpZGVvLnJvdGF0aW9uID0gOTA8L2NvZGU+LlxuXHQgKi9cblx0cHVibGljIHJvdGF0aW9uOm51bWJlcjsgLy9UT0RPXG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB0aGUgeC1heGlzIHJvdGF0aW9uIG9mIHRoZSBEaXNwbGF5T2JqZWN0IGluc3RhbmNlLCBpbiBkZWdyZWVzLFxuXHQgKiBmcm9tIGl0cyBvcmlnaW5hbCBvcmllbnRhdGlvbiByZWxhdGl2ZSB0byB0aGUgM0QgcGFyZW50IGNvbnRhaW5lci4gVmFsdWVzXG5cdCAqIGZyb20gMCB0byAxODAgcmVwcmVzZW50IGNsb2Nrd2lzZSByb3RhdGlvbjsgdmFsdWVzIGZyb20gMCB0byAtMTgwXG5cdCAqIHJlcHJlc2VudCBjb3VudGVyY2xvY2t3aXNlIHJvdGF0aW9uLiBWYWx1ZXMgb3V0c2lkZSB0aGlzIHJhbmdlIGFyZSBhZGRlZFxuXHQgKiB0byBvciBzdWJ0cmFjdGVkIGZyb20gMzYwIHRvIG9idGFpbiBhIHZhbHVlIHdpdGhpbiB0aGUgcmFuZ2UuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHJvdGF0aW9uWCgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3JvdGF0aW9uWCpNYXRoQ29uc3RzLlJBRElBTlNfVE9fREVHUkVFUztcblx0fVxuXG5cdHB1YmxpYyBzZXQgcm90YXRpb25YKHZhbDpudW1iZXIpXG5cdHtcblx0XHRpZiAodGhpcy5yb3RhdGlvblggPT0gdmFsKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fcm90YXRpb25YID0gdmFsKk1hdGhDb25zdHMuREVHUkVFU19UT19SQURJQU5TO1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlUm90YXRpb24oKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgdGhlIHktYXhpcyByb3RhdGlvbiBvZiB0aGUgRGlzcGxheU9iamVjdCBpbnN0YW5jZSwgaW4gZGVncmVlcyxcblx0ICogZnJvbSBpdHMgb3JpZ2luYWwgb3JpZW50YXRpb24gcmVsYXRpdmUgdG8gdGhlIDNEIHBhcmVudCBjb250YWluZXIuIFZhbHVlc1xuXHQgKiBmcm9tIDAgdG8gMTgwIHJlcHJlc2VudCBjbG9ja3dpc2Ugcm90YXRpb247IHZhbHVlcyBmcm9tIDAgdG8gLTE4MFxuXHQgKiByZXByZXNlbnQgY291bnRlcmNsb2Nrd2lzZSByb3RhdGlvbi4gVmFsdWVzIG91dHNpZGUgdGhpcyByYW5nZSBhcmUgYWRkZWRcblx0ICogdG8gb3Igc3VidHJhY3RlZCBmcm9tIDM2MCB0byBvYnRhaW4gYSB2YWx1ZSB3aXRoaW4gdGhlIHJhbmdlLlxuXHQgKi9cblx0cHVibGljIGdldCByb3RhdGlvblkoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9yb3RhdGlvblkqTWF0aENvbnN0cy5SQURJQU5TX1RPX0RFR1JFRVM7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHJvdGF0aW9uWSh2YWw6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHRoaXMucm90YXRpb25ZID09IHZhbClcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3JvdGF0aW9uWSA9IHZhbCpNYXRoQ29uc3RzLkRFR1JFRVNfVE9fUkFESUFOUztcblxuXHRcdHRoaXMuaW52YWxpZGF0ZVJvdGF0aW9uKCk7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHRoZSB6LWF4aXMgcm90YXRpb24gb2YgdGhlIERpc3BsYXlPYmplY3QgaW5zdGFuY2UsIGluIGRlZ3JlZXMsXG5cdCAqIGZyb20gaXRzIG9yaWdpbmFsIG9yaWVudGF0aW9uIHJlbGF0aXZlIHRvIHRoZSAzRCBwYXJlbnQgY29udGFpbmVyLiBWYWx1ZXNcblx0ICogZnJvbSAwIHRvIDE4MCByZXByZXNlbnQgY2xvY2t3aXNlIHJvdGF0aW9uOyB2YWx1ZXMgZnJvbSAwIHRvIC0xODBcblx0ICogcmVwcmVzZW50IGNvdW50ZXJjbG9ja3dpc2Ugcm90YXRpb24uIFZhbHVlcyBvdXRzaWRlIHRoaXMgcmFuZ2UgYXJlIGFkZGVkXG5cdCAqIHRvIG9yIHN1YnRyYWN0ZWQgZnJvbSAzNjAgdG8gb2J0YWluIGEgdmFsdWUgd2l0aGluIHRoZSByYW5nZS5cblx0ICovXG5cdHB1YmxpYyBnZXQgcm90YXRpb25aKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcm90YXRpb25aKk1hdGhDb25zdHMuUkFESUFOU19UT19ERUdSRUVTO1xuXHR9XG5cblx0cHVibGljIHNldCByb3RhdGlvbloodmFsOm51bWJlcilcblx0e1xuXHRcdGlmICh0aGlzLnJvdGF0aW9uWiA9PSB2YWwpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9yb3RhdGlvblogPSB2YWwqTWF0aENvbnN0cy5ERUdSRUVTX1RPX1JBRElBTlM7XG5cblx0XHR0aGlzLmludmFsaWRhdGVSb3RhdGlvbigpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBjdXJyZW50IHNjYWxpbmcgZ3JpZCB0aGF0IGlzIGluIGVmZmVjdC4gSWYgc2V0IHRvIDxjb2RlPm51bGw8L2NvZGU+LFxuXHQgKiB0aGUgZW50aXJlIGRpc3BsYXkgb2JqZWN0IGlzIHNjYWxlZCBub3JtYWxseSB3aGVuIGFueSBzY2FsZSB0cmFuc2Zvcm1hdGlvblxuXHQgKiBpcyBhcHBsaWVkLlxuXHQgKlxuXHQgKiA8cD5XaGVuIHlvdSBkZWZpbmUgdGhlIDxjb2RlPnNjYWxlOUdyaWQ8L2NvZGU+IHByb3BlcnR5LCB0aGUgZGlzcGxheVxuXHQgKiBvYmplY3QgaXMgZGl2aWRlZCBpbnRvIGEgZ3JpZCB3aXRoIG5pbmUgcmVnaW9ucyBiYXNlZCBvbiB0aGVcblx0ICogPGNvZGU+c2NhbGU5R3JpZDwvY29kZT4gcmVjdGFuZ2xlLCB3aGljaCBkZWZpbmVzIHRoZSBjZW50ZXIgcmVnaW9uIG9mIHRoZVxuXHQgKiBncmlkLiBUaGUgZWlnaHQgb3RoZXIgcmVnaW9ucyBvZiB0aGUgZ3JpZCBhcmUgdGhlIGZvbGxvd2luZyBhcmVhczogPC9wPlxuXHQgKlxuXHQgKiA8dWw+XG5cdCAqICAgPGxpPlRoZSB1cHBlci1sZWZ0IGNvcm5lciBvdXRzaWRlIG9mIHRoZSByZWN0YW5nbGU8L2xpPlxuXHQgKiAgIDxsaT5UaGUgYXJlYSBhYm92ZSB0aGUgcmVjdGFuZ2xlIDwvbGk+XG5cdCAqICAgPGxpPlRoZSB1cHBlci1yaWdodCBjb3JuZXIgb3V0c2lkZSBvZiB0aGUgcmVjdGFuZ2xlPC9saT5cblx0ICogICA8bGk+VGhlIGFyZWEgdG8gdGhlIGxlZnQgb2YgdGhlIHJlY3RhbmdsZTwvbGk+XG5cdCAqICAgPGxpPlRoZSBhcmVhIHRvIHRoZSByaWdodCBvZiB0aGUgcmVjdGFuZ2xlPC9saT5cblx0ICogICA8bGk+VGhlIGxvd2VyLWxlZnQgY29ybmVyIG91dHNpZGUgb2YgdGhlIHJlY3RhbmdsZTwvbGk+XG5cdCAqICAgPGxpPlRoZSBhcmVhIGJlbG93IHRoZSByZWN0YW5nbGU8L2xpPlxuXHQgKiAgIDxsaT5UaGUgbG93ZXItcmlnaHQgY29ybmVyIG91dHNpZGUgb2YgdGhlIHJlY3RhbmdsZTwvbGk+XG5cdCAqIDwvdWw+XG5cdCAqXG5cdCAqIDxwPllvdSBjYW4gdGhpbmsgb2YgdGhlIGVpZ2h0IHJlZ2lvbnMgb3V0c2lkZSBvZiB0aGUgY2VudGVyKGRlZmluZWQgYnlcblx0ICogdGhlIHJlY3RhbmdsZSkgYXMgYmVpbmcgbGlrZSBhIHBpY3R1cmUgZnJhbWUgdGhhdCBoYXMgc3BlY2lhbCBydWxlc1xuXHQgKiBhcHBsaWVkIHRvIGl0IHdoZW4gc2NhbGVkLjwvcD5cblx0ICpcblx0ICogPHA+V2hlbiB0aGUgPGNvZGU+c2NhbGU5R3JpZDwvY29kZT4gcHJvcGVydHkgaXMgc2V0IGFuZCBhIGRpc3BsYXkgb2JqZWN0XG5cdCAqIGlzIHNjYWxlZCwgYWxsIHRleHQgYW5kIGdyYWRpZW50cyBhcmUgc2NhbGVkIG5vcm1hbGx5OyBob3dldmVyLCBmb3Igb3RoZXJcblx0ICogdHlwZXMgb2Ygb2JqZWN0cyB0aGUgZm9sbG93aW5nIHJ1bGVzIGFwcGx5OjwvcD5cblx0ICpcblx0ICogPHVsPlxuXHQgKiAgIDxsaT5Db250ZW50IGluIHRoZSBjZW50ZXIgcmVnaW9uIGlzIHNjYWxlZCBub3JtYWxseS4gPC9saT5cblx0ICogICA8bGk+Q29udGVudCBpbiB0aGUgY29ybmVycyBpcyBub3Qgc2NhbGVkLiA8L2xpPlxuXHQgKiAgIDxsaT5Db250ZW50IGluIHRoZSB0b3AgYW5kIGJvdHRvbSByZWdpb25zIGlzIHNjYWxlZCBob3Jpem9udGFsbHkgb25seS5cblx0ICogQ29udGVudCBpbiB0aGUgbGVmdCBhbmQgcmlnaHQgcmVnaW9ucyBpcyBzY2FsZWQgdmVydGljYWxseSBvbmx5LjwvbGk+XG5cdCAqICAgPGxpPkFsbCBmaWxscyhpbmNsdWRpbmcgYml0bWFwcywgdmlkZW8sIGFuZCBncmFkaWVudHMpIGFyZSBzdHJldGNoZWQgdG9cblx0ICogZml0IHRoZWlyIHNoYXBlcy48L2xpPlxuXHQgKiA8L3VsPlxuXHQgKlxuXHQgKiA8cD5JZiBhIGRpc3BsYXkgb2JqZWN0IGlzIHJvdGF0ZWQsIGFsbCBzdWJzZXF1ZW50IHNjYWxpbmcgaXMgbm9ybWFsKGFuZFxuXHQgKiB0aGUgPGNvZGU+c2NhbGU5R3JpZDwvY29kZT4gcHJvcGVydHkgaXMgaWdub3JlZCkuPC9wPlxuXHQgKlxuXHQgKiA8cD5Gb3IgZXhhbXBsZSwgY29uc2lkZXIgdGhlIGZvbGxvd2luZyBkaXNwbGF5IG9iamVjdCBhbmQgYSByZWN0YW5nbGUgdGhhdFxuXHQgKiBpcyBhcHBsaWVkIGFzIHRoZSBkaXNwbGF5IG9iamVjdCdzIDxjb2RlPnNjYWxlOUdyaWQ8L2NvZGU+OjwvcD5cblx0ICpcblx0ICogPHA+QSBjb21tb24gdXNlIGZvciBzZXR0aW5nIDxjb2RlPnNjYWxlOUdyaWQ8L2NvZGU+IGlzIHRvIHNldCB1cCBhIGRpc3BsYXlcblx0ICogb2JqZWN0IHRvIGJlIHVzZWQgYXMgYSBjb21wb25lbnQsIGluIHdoaWNoIGVkZ2UgcmVnaW9ucyByZXRhaW4gdGhlIHNhbWVcblx0ICogd2lkdGggd2hlbiB0aGUgY29tcG9uZW50IGlzIHNjYWxlZC48L3A+XG5cdCAqXG5cdCAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciBJZiB5b3UgcGFzcyBhbiBpbnZhbGlkIGFyZ3VtZW50IHRvIHRoZSBtZXRob2QuXG5cdCAqL1xuXHRwdWJsaWMgc2NhbGU5R3JpZDpSZWN0YW5nbGU7XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB0aGUgaG9yaXpvbnRhbCBzY2FsZShwZXJjZW50YWdlKSBvZiB0aGUgb2JqZWN0IGFzIGFwcGxpZWQgZnJvbVxuXHQgKiB0aGUgcmVnaXN0cmF0aW9uIHBvaW50LiBUaGUgZGVmYXVsdCByZWdpc3RyYXRpb24gcG9pbnQgaXMoMCwwKS4gMS4wXG5cdCAqIGVxdWFscyAxMDAlIHNjYWxlLlxuXHQgKlxuXHQgKiA8cD5TY2FsaW5nIHRoZSBsb2NhbCBjb29yZGluYXRlIHN5c3RlbSBjaGFuZ2VzIHRoZSA8Y29kZT54PC9jb2RlPiBhbmRcblx0ICogPGNvZGU+eTwvY29kZT4gcHJvcGVydHkgdmFsdWVzLCB3aGljaCBhcmUgZGVmaW5lZCBpbiB3aG9sZSBwaXhlbHMuIDwvcD5cblx0ICovXG5cdHB1YmxpYyBnZXQgc2NhbGVYKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcFNjYWxlWDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgc2NhbGVYKHZhbDpudW1iZXIpXG5cdHtcblx0XHRpZiAodGhpcy5fcFNjYWxlWCA9PSB2YWwpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9wU2NhbGVYID0gdmFsO1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlU2NhbGUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgdGhlIHZlcnRpY2FsIHNjYWxlKHBlcmNlbnRhZ2UpIG9mIGFuIG9iamVjdCBhcyBhcHBsaWVkIGZyb20gdGhlXG5cdCAqIHJlZ2lzdHJhdGlvbiBwb2ludCBvZiB0aGUgb2JqZWN0LiBUaGUgZGVmYXVsdCByZWdpc3RyYXRpb24gcG9pbnQgaXMoMCwwKS5cblx0ICogMS4wIGlzIDEwMCUgc2NhbGUuXG5cdCAqXG5cdCAqIDxwPlNjYWxpbmcgdGhlIGxvY2FsIGNvb3JkaW5hdGUgc3lzdGVtIGNoYW5nZXMgdGhlIDxjb2RlPng8L2NvZGU+IGFuZFxuXHQgKiA8Y29kZT55PC9jb2RlPiBwcm9wZXJ0eSB2YWx1ZXMsIHdoaWNoIGFyZSBkZWZpbmVkIGluIHdob2xlIHBpeGVscy4gPC9wPlxuXHQgKi9cblx0cHVibGljIGdldCBzY2FsZVkoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wU2NhbGVZO1xuXHR9XG5cblx0cHVibGljIHNldCBzY2FsZVkodmFsOm51bWJlcilcblx0e1xuXHRcdGlmICh0aGlzLl9wU2NhbGVZID09IHZhbClcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3BTY2FsZVkgPSB2YWw7XG5cblx0XHR0aGlzLmludmFsaWRhdGVTY2FsZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB0aGUgZGVwdGggc2NhbGUocGVyY2VudGFnZSkgb2YgYW4gb2JqZWN0IGFzIGFwcGxpZWQgZnJvbSB0aGVcblx0ICogcmVnaXN0cmF0aW9uIHBvaW50IG9mIHRoZSBvYmplY3QuIFRoZSBkZWZhdWx0IHJlZ2lzdHJhdGlvbiBwb2ludCBpcygwLDApLlxuXHQgKiAxLjAgaXMgMTAwJSBzY2FsZS5cblx0ICpcblx0ICogPHA+U2NhbGluZyB0aGUgbG9jYWwgY29vcmRpbmF0ZSBzeXN0ZW0gY2hhbmdlcyB0aGUgPGNvZGU+eDwvY29kZT4sXG5cdCAqIDxjb2RlPnk8L2NvZGU+IGFuZCA8Y29kZT56PC9jb2RlPiBwcm9wZXJ0eSB2YWx1ZXMsIHdoaWNoIGFyZSBkZWZpbmVkIGluXG5cdCAqIHdob2xlIHBpeGVscy4gPC9wPlxuXHQgKi9cblx0cHVibGljIGdldCBzY2FsZVooKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wU2NhbGVaO1xuXHR9XG5cblx0cHVibGljIHNldCBzY2FsZVoodmFsOm51bWJlcilcblx0e1xuXHRcdGlmICh0aGlzLl9wU2NhbGVaID09IHZhbClcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3BTY2FsZVogPSB2YWw7XG5cblx0XHR0aGlzLmludmFsaWRhdGVTY2FsZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHNjZW5lKCk6U2NlbmVcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wU2NlbmU7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgc2NlbmVQb3NpdGlvbigpOlZlY3RvcjNEXG5cdHtcblx0XHRpZiAodGhpcy5fc2NlbmVQb3NpdGlvbkRpcnR5KSB7XG5cdFx0XHRpZiAoIXRoaXMuX3Bpdm90WmVybyAmJiB0aGlzLmFsaWdubWVudE1vZGUgPT0gQWxpZ25tZW50TW9kZS5QSVZPVF9QT0lOVCkge1xuXHRcdFx0XHR2YXIgcGl2b3RTY2FsZTpWZWN0b3IzRCA9IG5ldyBWZWN0b3IzRCh0aGlzLl9waXZvdC54L3RoaXMuX3BTY2FsZVgsIHRoaXMuX3Bpdm90LnkvdGhpcy5fcFNjYWxlWSwgdGhpcy5fcGl2b3Quei90aGlzLl9wU2NhbGVaKVxuXHRcdFx0XHRcdHRoaXMuX3NjZW5lUG9zaXRpb24gPSB0aGlzLnNjZW5lVHJhbnNmb3JtLnRyYW5zZm9ybVZlY3RvcihwaXZvdFNjYWxlKTtcblx0XHRcdFx0Ly90aGlzLl9zY2VuZVBvc2l0aW9uLmRlY3JlbWVudEJ5KG5ldyBWZWN0b3IzRCh0aGlzLl9waXZvdC54KnRoaXMuX3BTY2FsZVgsIHRoaXMuX3Bpdm90LnkqdGhpcy5fcFNjYWxlWSwgdGhpcy5fcGl2b3Queip0aGlzLl9wU2NhbGVaKSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLnNjZW5lVHJhbnNmb3JtLmNvcHlDb2x1bW5UbygzLCB0aGlzLl9zY2VuZVBvc2l0aW9uKTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5fc2NlbmVQb3NpdGlvbkRpcnR5ID0gZmFsc2U7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLl9zY2VuZVBvc2l0aW9uO1xuXHR9XG5cblx0cHVibGljIGdldCBzY2VuZVRyYW5zZm9ybSgpOk1hdHJpeDNEXG5cdHtcblx0XHRpZiAodGhpcy5fcFNjZW5lVHJhbnNmb3JtRGlydHkpXG5cdFx0XHR0aGlzLnBVcGRhdGVTY2VuZVRyYW5zZm9ybSgpO1xuXG5cdFx0cmV0dXJuIHRoaXMuX3BTY2VuZVRyYW5zZm9ybTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgc2Nyb2xsIHJlY3RhbmdsZSBib3VuZHMgb2YgdGhlIGRpc3BsYXkgb2JqZWN0LiBUaGUgZGlzcGxheSBvYmplY3QgaXNcblx0ICogY3JvcHBlZCB0byB0aGUgc2l6ZSBkZWZpbmVkIGJ5IHRoZSByZWN0YW5nbGUsIGFuZCBpdCBzY3JvbGxzIHdpdGhpbiB0aGVcblx0ICogcmVjdGFuZ2xlIHdoZW4geW91IGNoYW5nZSB0aGUgPGNvZGU+eDwvY29kZT4gYW5kIDxjb2RlPnk8L2NvZGU+IHByb3BlcnRpZXNcblx0ICogb2YgdGhlIDxjb2RlPnNjcm9sbFJlY3Q8L2NvZGU+IG9iamVjdC5cblx0ICpcblx0ICogPHA+VGhlIHByb3BlcnRpZXMgb2YgdGhlIDxjb2RlPnNjcm9sbFJlY3Q8L2NvZGU+IFJlY3RhbmdsZSBvYmplY3QgdXNlIHRoZVxuXHQgKiBkaXNwbGF5IG9iamVjdCdzIGNvb3JkaW5hdGUgc3BhY2UgYW5kIGFyZSBzY2FsZWQganVzdCBsaWtlIHRoZSBvdmVyYWxsXG5cdCAqIGRpc3BsYXkgb2JqZWN0LiBUaGUgY29ybmVyIGJvdW5kcyBvZiB0aGUgY3JvcHBlZCB3aW5kb3cgb24gdGhlIHNjcm9sbGluZ1xuXHQgKiBkaXNwbGF5IG9iamVjdCBhcmUgdGhlIG9yaWdpbiBvZiB0aGUgZGlzcGxheSBvYmplY3QoMCwwKSBhbmQgdGhlIHBvaW50XG5cdCAqIGRlZmluZWQgYnkgdGhlIHdpZHRoIGFuZCBoZWlnaHQgb2YgdGhlIHJlY3RhbmdsZS4gVGhleSBhcmUgbm90IGNlbnRlcmVkXG5cdCAqIGFyb3VuZCB0aGUgb3JpZ2luLCBidXQgdXNlIHRoZSBvcmlnaW4gdG8gZGVmaW5lIHRoZSB1cHBlci1sZWZ0IGNvcm5lciBvZlxuXHQgKiB0aGUgYXJlYS4gQSBzY3JvbGxlZCBkaXNwbGF5IG9iamVjdCBhbHdheXMgc2Nyb2xscyBpbiB3aG9sZSBwaXhlbFxuXHQgKiBpbmNyZW1lbnRzLiA8L3A+XG5cdCAqXG5cdCAqIDxwPllvdSBjYW4gc2Nyb2xsIGFuIG9iamVjdCBsZWZ0IGFuZCByaWdodCBieSBzZXR0aW5nIHRoZSA8Y29kZT54PC9jb2RlPlxuXHQgKiBwcm9wZXJ0eSBvZiB0aGUgPGNvZGU+c2Nyb2xsUmVjdDwvY29kZT4gUmVjdGFuZ2xlIG9iamVjdC4gWW91IGNhbiBzY3JvbGxcblx0ICogYW4gb2JqZWN0IHVwIGFuZCBkb3duIGJ5IHNldHRpbmcgdGhlIDxjb2RlPnk8L2NvZGU+IHByb3BlcnR5IG9mIHRoZVxuXHQgKiA8Y29kZT5zY3JvbGxSZWN0PC9jb2RlPiBSZWN0YW5nbGUgb2JqZWN0LiBJZiB0aGUgZGlzcGxheSBvYmplY3QgaXMgcm90YXRlZFxuXHQgKiA5MMKwIGFuZCB5b3Ugc2Nyb2xsIGl0IGxlZnQgYW5kIHJpZ2h0LCB0aGUgZGlzcGxheSBvYmplY3QgYWN0dWFsbHkgc2Nyb2xsc1xuXHQgKiB1cCBhbmQgZG93bi48L3A+XG5cdCAqL1xuXHRwdWJsaWMgc2Nyb2xsUmVjdDpSZWN0YW5nbGU7XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHNoYWRlclBpY2tpbmdEZXRhaWxzKCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3NoYWRlclBpY2tpbmdEZXRhaWxzO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGJvdW5kc1Zpc2libGUoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fYm91bmRzVmlzaWJsZTtcblx0fVxuXG5cdHB1YmxpYyBzZXQgYm91bmRzVmlzaWJsZSh2YWx1ZTpib29sZWFuKVxuXHR7XG5cdFx0aWYgKHZhbHVlID09IHRoaXMuX2JvdW5kc1Zpc2libGUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9ib3VuZHNWaXNpYmxlID0gdmFsdWU7XG5cblx0XHR0aGlzLl9wYXJ0aXRpb25Ob2RlLmJvdW5kc1Zpc2libGUgPSB2YWx1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBbiBvYmplY3Qgd2l0aCBwcm9wZXJ0aWVzIHBlcnRhaW5pbmcgdG8gYSBkaXNwbGF5IG9iamVjdCdzIG1hdHJpeCwgY29sb3Jcblx0ICogdHJhbnNmb3JtLCBhbmQgcGl4ZWwgYm91bmRzLiBUaGUgc3BlY2lmaWMgcHJvcGVydGllcyAgLSAgbWF0cml4LFxuXHQgKiBjb2xvclRyYW5zZm9ybSwgYW5kIHRocmVlIHJlYWQtb25seSBwcm9wZXJ0aWVzXG5cdCAqICg8Y29kZT5jb25jYXRlbmF0ZWRNYXRyaXg8L2NvZGU+LCA8Y29kZT5jb25jYXRlbmF0ZWRDb2xvclRyYW5zZm9ybTwvY29kZT4sXG5cdCAqIGFuZCA8Y29kZT5waXhlbEJvdW5kczwvY29kZT4pICAtICBhcmUgZGVzY3JpYmVkIGluIHRoZSBlbnRyeSBmb3IgdGhlXG5cdCAqIFRyYW5zZm9ybSBjbGFzcy5cblx0ICpcblx0ICogPHA+RWFjaCBvZiB0aGUgdHJhbnNmb3JtIG9iamVjdCdzIHByb3BlcnRpZXMgaXMgaXRzZWxmIGFuIG9iamVjdC4gVGhpc1xuXHQgKiBjb25jZXB0IGlzIGltcG9ydGFudCBiZWNhdXNlIHRoZSBvbmx5IHdheSB0byBzZXQgbmV3IHZhbHVlcyBmb3IgdGhlIG1hdHJpeFxuXHQgKiBvciBjb2xvclRyYW5zZm9ybSBvYmplY3RzIGlzIHRvIGNyZWF0ZSBhIG5ldyBvYmplY3QgYW5kIGNvcHkgdGhhdCBvYmplY3Rcblx0ICogaW50byB0aGUgdHJhbnNmb3JtLm1hdHJpeCBvciB0cmFuc2Zvcm0uY29sb3JUcmFuc2Zvcm0gcHJvcGVydHkuPC9wPlxuXHQgKlxuXHQgKiA8cD5Gb3IgZXhhbXBsZSwgdG8gaW5jcmVhc2UgdGhlIDxjb2RlPnR4PC9jb2RlPiB2YWx1ZSBvZiBhIGRpc3BsYXlcblx0ICogb2JqZWN0J3MgbWF0cml4LCB5b3UgbXVzdCBtYWtlIGEgY29weSBvZiB0aGUgZW50aXJlIG1hdHJpeCBvYmplY3QsIHRoZW5cblx0ICogY29weSB0aGUgbmV3IG9iamVjdCBpbnRvIHRoZSBtYXRyaXggcHJvcGVydHkgb2YgdGhlIHRyYW5zZm9ybSBvYmplY3Q6PC9wPlxuXHQgKiA8cHJlIHhtbDpzcGFjZT1cInByZXNlcnZlXCI+PGNvZGU+IHB1YmxpYyBteU1hdHJpeDpNYXRyaXggPVxuXHQgKiBteURpc3BsYXlPYmplY3QudHJhbnNmb3JtLm1hdHJpeDsgbXlNYXRyaXgudHggKz0gMTA7XG5cdCAqIG15RGlzcGxheU9iamVjdC50cmFuc2Zvcm0ubWF0cml4ID0gbXlNYXRyaXg7IDwvY29kZT48L3ByZT5cblx0ICpcblx0ICogPHA+WW91IGNhbm5vdCBkaXJlY3RseSBzZXQgdGhlIDxjb2RlPnR4PC9jb2RlPiBwcm9wZXJ0eS4gVGhlIGZvbGxvd2luZ1xuXHQgKiBjb2RlIGhhcyBubyBlZmZlY3Qgb24gPGNvZGU+bXlEaXNwbGF5T2JqZWN0PC9jb2RlPjogPC9wPlxuXHQgKiA8cHJlIHhtbDpzcGFjZT1cInByZXNlcnZlXCI+PGNvZGU+IG15RGlzcGxheU9iamVjdC50cmFuc2Zvcm0ubWF0cml4LnR4ICs9XG5cdCAqIDEwOyA8L2NvZGU+PC9wcmU+XG5cdCAqXG5cdCAqIDxwPllvdSBjYW4gYWxzbyBjb3B5IGFuIGVudGlyZSB0cmFuc2Zvcm0gb2JqZWN0IGFuZCBhc3NpZ24gaXQgdG8gYW5vdGhlclxuXHQgKiBkaXNwbGF5IG9iamVjdCdzIHRyYW5zZm9ybSBwcm9wZXJ0eS4gRm9yIGV4YW1wbGUsIHRoZSBmb2xsb3dpbmcgY29kZVxuXHQgKiBjb3BpZXMgdGhlIGVudGlyZSB0cmFuc2Zvcm0gb2JqZWN0IGZyb20gPGNvZGU+bXlPbGREaXNwbGF5T2JqPC9jb2RlPiB0b1xuXHQgKiA8Y29kZT5teU5ld0Rpc3BsYXlPYmo8L2NvZGU+OjwvcD5cblx0ICogPGNvZGU+bXlOZXdEaXNwbGF5T2JqLnRyYW5zZm9ybSA9IG15T2xkRGlzcGxheU9iai50cmFuc2Zvcm07PC9jb2RlPlxuXHQgKlxuXHQgKiA8cD5UaGUgcmVzdWx0aW5nIGRpc3BsYXkgb2JqZWN0LCA8Y29kZT5teU5ld0Rpc3BsYXlPYmo8L2NvZGU+LCBub3cgaGFzIHRoZVxuXHQgKiBzYW1lIHZhbHVlcyBmb3IgaXRzIG1hdHJpeCwgY29sb3IgdHJhbnNmb3JtLCBhbmQgcGl4ZWwgYm91bmRzIGFzIHRoZSBvbGRcblx0ICogZGlzcGxheSBvYmplY3QsIDxjb2RlPm15T2xkRGlzcGxheU9iajwvY29kZT4uPC9wPlxuXHQgKlxuXHQgKiA8cD5Ob3RlIHRoYXQgQUlSIGZvciBUViBkZXZpY2VzIHVzZSBoYXJkd2FyZSBhY2NlbGVyYXRpb24sIGlmIGl0IGlzXG5cdCAqIGF2YWlsYWJsZSwgZm9yIGNvbG9yIHRyYW5zZm9ybXMuPC9wPlxuXHQgKi9cblx0cHVibGljIGdldCB0cmFuc2Zvcm0oKTpUcmFuc2Zvcm1cblx0e1xuXHRcdHJldHVybiB0aGlzLl90cmFuc2Zvcm07XG5cdH1cblxuXHQvKipcblx0ICogV2hldGhlciBvciBub3QgdGhlIGRpc3BsYXkgb2JqZWN0IGlzIHZpc2libGUuIERpc3BsYXkgb2JqZWN0cyB0aGF0IGFyZSBub3Rcblx0ICogdmlzaWJsZSBhcmUgZGlzYWJsZWQuIEZvciBleGFtcGxlLCBpZiA8Y29kZT52aXNpYmxlPWZhbHNlPC9jb2RlPiBmb3IgYW5cblx0ICogSW50ZXJhY3RpdmVPYmplY3QgaW5zdGFuY2UsIGl0IGNhbm5vdCBiZSBjbGlja2VkLlxuXHQgKi9cblx0cHVibGljIGdldCB2aXNpYmxlKCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2V4cGxpY2l0VmlzaWJpbGl0eTtcblx0fVxuXG5cdHB1YmxpYyBzZXQgdmlzaWJsZSh2YWx1ZTpib29sZWFuKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2V4cGxpY2l0VmlzaWJpbGl0eSA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX2V4cGxpY2l0VmlzaWJpbGl0eSA9IHZhbHVlO1xuXG5cdFx0dGhpcy5fcFVwZGF0ZUltcGxpY2l0VmlzaWJpbGl0eSh0aGlzLl9wUGFyZW50PyB0aGlzLl9wUGFyZW50Ll9pSXNWaXNpYmxlKCkgOiB0cnVlKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgdGhlIHdpZHRoIG9mIHRoZSBkaXNwbGF5IG9iamVjdCwgaW4gcGl4ZWxzLiBUaGUgd2lkdGggaXNcblx0ICogY2FsY3VsYXRlZCBiYXNlZCBvbiB0aGUgYm91bmRzIG9mIHRoZSBjb250ZW50IG9mIHRoZSBkaXNwbGF5IG9iamVjdC4gV2hlblxuXHQgKiB5b3Ugc2V0IHRoZSA8Y29kZT53aWR0aDwvY29kZT4gcHJvcGVydHksIHRoZSA8Y29kZT5zY2FsZVg8L2NvZGU+IHByb3BlcnR5XG5cdCAqIGlzIGFkanVzdGVkIGFjY29yZGluZ2x5LCBhcyBzaG93biBpbiB0aGUgZm9sbG93aW5nIGNvZGU6XG5cdCAqXG5cdCAqIDxwPkV4Y2VwdCBmb3IgVGV4dEZpZWxkIGFuZCBWaWRlbyBvYmplY3RzLCBhIGRpc3BsYXkgb2JqZWN0IHdpdGggbm9cblx0ICogY29udGVudChzdWNoIGFzIGFuIGVtcHR5IHNwcml0ZSkgaGFzIGEgd2lkdGggb2YgMCwgZXZlbiBpZiB5b3UgdHJ5IHRvIHNldFxuXHQgKiA8Y29kZT53aWR0aDwvY29kZT4gdG8gYSBkaWZmZXJlbnQgdmFsdWUuPC9wPlxuXHQgKi9cblx0cHVibGljIGdldCB3aWR0aCgpOm51bWJlclxuXHR7XG5cdFx0aWYgKHRoaXMuX3BCb3VuZHNJbnZhbGlkKVxuXHRcdFx0dGhpcy5wVXBkYXRlQm91bmRzKCk7XG5cblx0XHRyZXR1cm4gdGhpcy5fd2lkdGg7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHdpZHRoKHZhbDpudW1iZXIpXG5cdHtcblx0XHRpZiAodGhpcy5fd2lkdGggPT0gdmFsKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fd2lkdGggPT0gdmFsO1xuXG5cdFx0dGhpcy5fcFNjYWxlWCA9IHZhbC90aGlzLmJvdW5kcy5hYWJiLndpZHRoO1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlU2NhbGUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCB3b3JsZEJvdW5kcygpOkJvdW5kaW5nVm9sdW1lQmFzZVxuXHR7XG5cdFx0Ly8gU2luY2UgdGhpcyBnZXR0ZXIgaXMgaW52b2tlZCBldmVyeSBpdGVyYXRpb24gb2YgdGhlIHJlbmRlciBsb29wLCBhbmRcblx0XHQvLyB0aGUgcHJlZmFiIGNvbnN0cnVjdCBjb3VsZCBhZmZlY3QgdGhlIGJvdW5kcyBvZiB0aGUgZW50aXR5LCB0aGUgcHJlZmFiIGlzXG5cdFx0Ly8gdmFsaWRhdGVkIGhlcmUgdG8gZ2l2ZSBpdCBhIGNoYW5jZSB0byByZWJ1aWxkLlxuXHRcdGlmICh0aGlzLl9pU291cmNlUHJlZmFiKVxuXHRcdFx0dGhpcy5faVNvdXJjZVByZWZhYi5faVZhbGlkYXRlKCk7XG5cblx0XHRpZiAodGhpcy5fd29ybGRCb3VuZHNJbnZhbGlkKSB7XG5cdFx0XHR0aGlzLl93b3JsZEJvdW5kc0ludmFsaWQgPSBmYWxzZTtcblx0XHRcdHRoaXMuX3dvcmxkQm91bmRzLnRyYW5zZm9ybUZyb20odGhpcy5ib3VuZHMsIHRoaXMuc2NlbmVUcmFuc2Zvcm0pO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLl93b3JsZEJvdW5kcztcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgdGhlIDxpPng8L2k+IGNvb3JkaW5hdGUgb2YgdGhlIERpc3BsYXlPYmplY3QgaW5zdGFuY2UgcmVsYXRpdmVcblx0ICogdG8gdGhlIGxvY2FsIGNvb3JkaW5hdGVzIG9mIHRoZSBwYXJlbnQgRGlzcGxheU9iamVjdENvbnRhaW5lci4gSWYgdGhlXG5cdCAqIG9iamVjdCBpcyBpbnNpZGUgYSBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIHRoYXQgaGFzIHRyYW5zZm9ybWF0aW9ucywgaXQgaXNcblx0ICogaW4gdGhlIGxvY2FsIGNvb3JkaW5hdGUgc3lzdGVtIG9mIHRoZSBlbmNsb3NpbmcgRGlzcGxheU9iamVjdENvbnRhaW5lci5cblx0ICogVGh1cywgZm9yIGEgRGlzcGxheU9iamVjdENvbnRhaW5lciByb3RhdGVkIDkwwrAgY291bnRlcmNsb2Nrd2lzZSwgdGhlXG5cdCAqIERpc3BsYXlPYmplY3RDb250YWluZXIncyBjaGlsZHJlbiBpbmhlcml0IGEgY29vcmRpbmF0ZSBzeXN0ZW0gdGhhdCBpc1xuXHQgKiByb3RhdGVkIDkwwrAgY291bnRlcmNsb2Nrd2lzZS4gVGhlIG9iamVjdCdzIGNvb3JkaW5hdGVzIHJlZmVyIHRvIHRoZVxuXHQgKiByZWdpc3RyYXRpb24gcG9pbnQgcG9zaXRpb24uXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHgoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl94O1xuXHR9XG5cblx0cHVibGljIHNldCB4KHZhbDpudW1iZXIpXG5cdHtcblx0XHRpZiAodGhpcy5feCA9PSB2YWwpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl94ID0gdmFsO1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlUG9zaXRpb24oKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgdGhlIDxpPnk8L2k+IGNvb3JkaW5hdGUgb2YgdGhlIERpc3BsYXlPYmplY3QgaW5zdGFuY2UgcmVsYXRpdmVcblx0ICogdG8gdGhlIGxvY2FsIGNvb3JkaW5hdGVzIG9mIHRoZSBwYXJlbnQgRGlzcGxheU9iamVjdENvbnRhaW5lci4gSWYgdGhlXG5cdCAqIG9iamVjdCBpcyBpbnNpZGUgYSBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIHRoYXQgaGFzIHRyYW5zZm9ybWF0aW9ucywgaXQgaXNcblx0ICogaW4gdGhlIGxvY2FsIGNvb3JkaW5hdGUgc3lzdGVtIG9mIHRoZSBlbmNsb3NpbmcgRGlzcGxheU9iamVjdENvbnRhaW5lci5cblx0ICogVGh1cywgZm9yIGEgRGlzcGxheU9iamVjdENvbnRhaW5lciByb3RhdGVkIDkwwrAgY291bnRlcmNsb2Nrd2lzZSwgdGhlXG5cdCAqIERpc3BsYXlPYmplY3RDb250YWluZXIncyBjaGlsZHJlbiBpbmhlcml0IGEgY29vcmRpbmF0ZSBzeXN0ZW0gdGhhdCBpc1xuXHQgKiByb3RhdGVkIDkwwrAgY291bnRlcmNsb2Nrd2lzZS4gVGhlIG9iamVjdCdzIGNvb3JkaW5hdGVzIHJlZmVyIHRvIHRoZVxuXHQgKiByZWdpc3RyYXRpb24gcG9pbnQgcG9zaXRpb24uXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHkoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl95O1xuXHR9XG5cblx0cHVibGljIHNldCB5KHZhbDpudW1iZXIpXG5cdHtcblx0XHRpZiAodGhpcy5feSA9PSB2YWwpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl95ID0gdmFsO1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlUG9zaXRpb24oKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgdGhlIHogY29vcmRpbmF0ZSBwb3NpdGlvbiBhbG9uZyB0aGUgei1heGlzIG9mIHRoZSBEaXNwbGF5T2JqZWN0XG5cdCAqIGluc3RhbmNlIHJlbGF0aXZlIHRvIHRoZSAzRCBwYXJlbnQgY29udGFpbmVyLiBUaGUgeiBwcm9wZXJ0eSBpcyB1c2VkIGZvclxuXHQgKiAzRCBjb29yZGluYXRlcywgbm90IHNjcmVlbiBvciBwaXhlbCBjb29yZGluYXRlcy5cblx0ICpcblx0ICogPHA+V2hlbiB5b3Ugc2V0IGEgPGNvZGU+ejwvY29kZT4gcHJvcGVydHkgZm9yIGEgZGlzcGxheSBvYmplY3QgdG9cblx0ICogc29tZXRoaW5nIG90aGVyIHRoYW4gdGhlIGRlZmF1bHQgdmFsdWUgb2YgPGNvZGU+MDwvY29kZT4sIGEgY29ycmVzcG9uZGluZ1xuXHQgKiBNYXRyaXgzRCBvYmplY3QgaXMgYXV0b21hdGljYWxseSBjcmVhdGVkLiBmb3IgYWRqdXN0aW5nIGEgZGlzcGxheSBvYmplY3Qnc1xuXHQgKiBwb3NpdGlvbiBhbmQgb3JpZW50YXRpb24gaW4gdGhyZWUgZGltZW5zaW9ucy4gV2hlbiB3b3JraW5nIHdpdGggdGhlXG5cdCAqIHotYXhpcywgdGhlIGV4aXN0aW5nIGJlaGF2aW9yIG9mIHggYW5kIHkgcHJvcGVydGllcyBjaGFuZ2VzIGZyb20gc2NyZWVuIG9yXG5cdCAqIHBpeGVsIGNvb3JkaW5hdGVzIHRvIHBvc2l0aW9ucyByZWxhdGl2ZSB0byB0aGUgM0QgcGFyZW50IGNvbnRhaW5lci48L3A+XG5cdCAqXG5cdCAqIDxwPkZvciBleGFtcGxlLCBhIGNoaWxkIG9mIHRoZSA8Y29kZT5fcm9vdDwvY29kZT4gYXQgcG9zaXRpb24geCA9IDEwMCwgeSA9XG5cdCAqIDEwMCwgeiA9IDIwMCBpcyBub3QgZHJhd24gYXQgcGl4ZWwgbG9jYXRpb24oMTAwLDEwMCkuIFRoZSBjaGlsZCBpcyBkcmF3blxuXHQgKiB3aGVyZXZlciB0aGUgM0QgcHJvamVjdGlvbiBjYWxjdWxhdGlvbiBwdXRzIGl0LiBUaGUgY2FsY3VsYXRpb24gaXM6PC9wPlxuXHQgKlxuXHQgKiA8cD48Y29kZT4oeH5+Y2FtZXJhRm9jYWxMZW5ndGgvY2FtZXJhUmVsYXRpdmVaUG9zaXRpb24sXG5cdCAqIHl+fmNhbWVyYUZvY2FsTGVuZ3RoL2NhbWVyYVJlbGF0aXZlWlBvc2l0aW9uKTwvY29kZT48L3A+XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHooKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl96O1xuXHR9XG5cblx0cHVibGljIHNldCB6KHZhbDpudW1iZXIpXG5cdHtcblx0XHRpZiAodGhpcy5feiA9PSB2YWwpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl96ID0gdmFsO1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlUG9zaXRpb24oKTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCB6T2Zmc2V0KCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fek9mZnNldDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgek9mZnNldCh2YWx1ZTpudW1iZXIpXG5cdHtcblx0XHR0aGlzLl96T2Zmc2V0ID0gdmFsdWU7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlcyBhIG5ldyA8Y29kZT5EaXNwbGF5T2JqZWN0PC9jb2RlPiBpbnN0YW5jZS5cblx0ICovXG5cdGNvbnN0cnVjdG9yKClcblx0e1xuXHRcdHN1cGVyKCk7XG5cblx0XHQvLyBDYWNoZWQgdmVjdG9yIG9mIHRyYW5zZm9ybWF0aW9uIGNvbXBvbmVudHMgdXNlZCB3aGVuXG5cdFx0Ly8gcmVjb21wb3NpbmcgdGhlIHRyYW5zZm9ybSBtYXRyaXggaW4gdXBkYXRlVHJhbnNmb3JtKClcblxuXHRcdHRoaXMuX3RyYW5zZm9ybUNvbXBvbmVudHMgPSBuZXcgQXJyYXk8VmVjdG9yM0Q+KDMpOy8vX3RyYW5zZm9ybUNvbXBvbmVudHMgPSBuZXcgVmVjdG9yLjxWZWN0b3IzRD4oMywgdHJ1ZSk7XG5cblx0XHR0aGlzLl90cmFuc2Zvcm1Db21wb25lbnRzWzBdID0gdGhpcy5fcG9zO1xuXHRcdHRoaXMuX3RyYW5zZm9ybUNvbXBvbmVudHNbMV0gPSB0aGlzLl9yb3Q7XG5cdFx0dGhpcy5fdHJhbnNmb3JtQ29tcG9uZW50c1syXSA9IHRoaXMuX3NjYTtcblxuXHRcdC8vY3JlYXRpb24gb2YgYXNzb2NpYXRlZCB0cmFuc2Zvcm0gb2JqZWN0XG5cdFx0dGhpcy5fdHJhbnNmb3JtID0gbmV3IFRyYW5zZm9ybSh0aGlzKTtcblxuXHRcdHRoaXMuX21hdHJpeDNELmlkZW50aXR5KCk7XG5cblx0XHR0aGlzLl9mbGlwWS5hcHBlbmRTY2FsZSgxLCAtMSwgMSk7XG5cblx0XHR0aGlzLl9wQm91bmRzID0gdGhpcy5wQ3JlYXRlRGVmYXVsdEJvdW5kaW5nVm9sdW1lKCk7XG5cblx0XHR0aGlzLl93b3JsZEJvdW5kcyA9IHRoaXMucENyZWF0ZURlZmF1bHRCb3VuZGluZ1ZvbHVtZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgYWRkRXZlbnRMaXN0ZW5lcih0eXBlOnN0cmluZywgbGlzdGVuZXI6RnVuY3Rpb24pXG5cdHtcblx0XHRzdXBlci5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKTtcblxuXHRcdHN3aXRjaCAodHlwZSkge1xuXHRcdFx0Y2FzZSBEaXNwbGF5T2JqZWN0RXZlbnQuUE9TSVRJT05fQ0hBTkdFRDpcblx0XHRcdFx0dGhpcy5fbGlzdGVuVG9Qb3NpdGlvbkNoYW5nZWQgPSB0cnVlO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgRGlzcGxheU9iamVjdEV2ZW50LlJPVEFUSU9OX0NIQU5HRUQ6XG5cdFx0XHRcdHRoaXMuX2xpc3RlblRvUm90YXRpb25DaGFuZ2VkID0gdHJ1ZTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIERpc3BsYXlPYmplY3RFdmVudC5TQ0FMRV9DSEFOR0VEOlxuXHRcdFx0XHR0aGlzLl9saXN0ZW5Ub1NjYWxlQ2hhbmdlZCA9IHRydWU7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGNsb25lKCk6RGlzcGxheU9iamVjdFxuXHR7XG5cdFx0dmFyIGNsb25lOkRpc3BsYXlPYmplY3QgPSBuZXcgRGlzcGxheU9iamVjdCgpO1xuXHRcdGNsb25lLnBpdm90ID0gdGhpcy5waXZvdDtcblx0XHRjbG9uZS5faU1hdHJpeDNEID0gdGhpcy5faU1hdHJpeDNEO1xuXHRcdGNsb25lLm5hbWUgPSBuYW1lO1xuXG5cdFx0Ly8gdG9kbzogaW1wbGVtZW50IGZvciBhbGwgc3VidHlwZXNcblx0XHRyZXR1cm4gY2xvbmU7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBkaXNwb3NlKClcblx0e1xuXHRcdGlmICh0aGlzLnBhcmVudClcblx0XHRcdHRoaXMucGFyZW50LnJlbW92ZUNoaWxkKHRoaXMpO1xuXG5cdFx0d2hpbGUgKHRoaXMuX3BSZW5kZXJhYmxlcy5sZW5ndGgpXG5cdFx0XHR0aGlzLl9wUmVuZGVyYWJsZXNbMF0uZGlzcG9zZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBpbmhlcml0RG9jXG5cdCAqL1xuXHRwdWJsaWMgZGlzcG9zZUFzc2V0KClcblx0e1xuXHRcdHRoaXMuZGlzcG9zZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgYSByZWN0YW5nbGUgdGhhdCBkZWZpbmVzIHRoZSBhcmVhIG9mIHRoZSBkaXNwbGF5IG9iamVjdCByZWxhdGl2ZVxuXHQgKiB0byB0aGUgY29vcmRpbmF0ZSBzeXN0ZW0gb2YgdGhlIDxjb2RlPnRhcmdldENvb3JkaW5hdGVTcGFjZTwvY29kZT4gb2JqZWN0LlxuXHQgKiBDb25zaWRlciB0aGUgZm9sbG93aW5nIGNvZGUsIHdoaWNoIHNob3dzIGhvdyB0aGUgcmVjdGFuZ2xlIHJldHVybmVkIGNhblxuXHQgKiB2YXJ5IGRlcGVuZGluZyBvbiB0aGUgPGNvZGU+dGFyZ2V0Q29vcmRpbmF0ZVNwYWNlPC9jb2RlPiBwYXJhbWV0ZXIgdGhhdFxuXHQgKiB5b3UgcGFzcyB0byB0aGUgbWV0aG9kOlxuXHQgKlxuXHQgKiA8cD48Yj5Ob3RlOjwvYj4gVXNlIHRoZSA8Y29kZT5sb2NhbFRvR2xvYmFsKCk8L2NvZGU+IGFuZFxuXHQgKiA8Y29kZT5nbG9iYWxUb0xvY2FsKCk8L2NvZGU+IG1ldGhvZHMgdG8gY29udmVydCB0aGUgZGlzcGxheSBvYmplY3QncyBsb2NhbFxuXHQgKiBjb29yZGluYXRlcyB0byBkaXNwbGF5IGNvb3JkaW5hdGVzLCBvciBkaXNwbGF5IGNvb3JkaW5hdGVzIHRvIGxvY2FsXG5cdCAqIGNvb3JkaW5hdGVzLCByZXNwZWN0aXZlbHkuPC9wPlxuXHQgKlxuXHQgKiA8cD5UaGUgPGNvZGU+Z2V0Qm91bmRzKCk8L2NvZGU+IG1ldGhvZCBpcyBzaW1pbGFyIHRvIHRoZVxuXHQgKiA8Y29kZT5nZXRSZWN0KCk8L2NvZGU+IG1ldGhvZDsgaG93ZXZlciwgdGhlIFJlY3RhbmdsZSByZXR1cm5lZCBieSB0aGVcblx0ICogPGNvZGU+Z2V0Qm91bmRzKCk8L2NvZGU+IG1ldGhvZCBpbmNsdWRlcyBhbnkgc3Ryb2tlcyBvbiBzaGFwZXMsIHdoZXJlYXNcblx0ICogdGhlIFJlY3RhbmdsZSByZXR1cm5lZCBieSB0aGUgPGNvZGU+Z2V0UmVjdCgpPC9jb2RlPiBtZXRob2QgZG9lcyBub3QuIEZvclxuXHQgKiBhbiBleGFtcGxlLCBzZWUgdGhlIGRlc2NyaXB0aW9uIG9mIHRoZSA8Y29kZT5nZXRSZWN0KCk8L2NvZGU+IG1ldGhvZC48L3A+XG5cdCAqXG5cdCAqIEBwYXJhbSB0YXJnZXRDb29yZGluYXRlU3BhY2UgVGhlIGRpc3BsYXkgb2JqZWN0IHRoYXQgZGVmaW5lcyB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb29yZGluYXRlIHN5c3RlbSB0byB1c2UuXG5cdCAqIEByZXR1cm4gVGhlIHJlY3RhbmdsZSB0aGF0IGRlZmluZXMgdGhlIGFyZWEgb2YgdGhlIGRpc3BsYXkgb2JqZWN0IHJlbGF0aXZlXG5cdCAqICAgICAgICAgdG8gdGhlIDxjb2RlPnRhcmdldENvb3JkaW5hdGVTcGFjZTwvY29kZT4gb2JqZWN0J3MgY29vcmRpbmF0ZVxuXHQgKiAgICAgICAgIHN5c3RlbS5cblx0ICovXG5cdHB1YmxpYyBnZXRCb3VuZHModGFyZ2V0Q29vcmRpbmF0ZVNwYWNlOkRpc3BsYXlPYmplY3QpOlJlY3RhbmdsZVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2JvdW5kczsgLy9UT0RPXG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhIHJlY3RhbmdsZSB0aGF0IGRlZmluZXMgdGhlIGJvdW5kYXJ5IG9mIHRoZSBkaXNwbGF5IG9iamVjdCwgYmFzZWRcblx0ICogb24gdGhlIGNvb3JkaW5hdGUgc3lzdGVtIGRlZmluZWQgYnkgdGhlIDxjb2RlPnRhcmdldENvb3JkaW5hdGVTcGFjZTwvY29kZT5cblx0ICogcGFyYW1ldGVyLCBleGNsdWRpbmcgYW55IHN0cm9rZXMgb24gc2hhcGVzLiBUaGUgdmFsdWVzIHRoYXQgdGhlXG5cdCAqIDxjb2RlPmdldFJlY3QoKTwvY29kZT4gbWV0aG9kIHJldHVybnMgYXJlIHRoZSBzYW1lIG9yIHNtYWxsZXIgdGhhbiB0aG9zZVxuXHQgKiByZXR1cm5lZCBieSB0aGUgPGNvZGU+Z2V0Qm91bmRzKCk8L2NvZGU+IG1ldGhvZC5cblx0ICpcblx0ICogPHA+PGI+Tm90ZTo8L2I+IFVzZSA8Y29kZT5sb2NhbFRvR2xvYmFsKCk8L2NvZGU+IGFuZFxuXHQgKiA8Y29kZT5nbG9iYWxUb0xvY2FsKCk8L2NvZGU+IG1ldGhvZHMgdG8gY29udmVydCB0aGUgZGlzcGxheSBvYmplY3QncyBsb2NhbFxuXHQgKiBjb29yZGluYXRlcyB0byBTdGFnZSBjb29yZGluYXRlcywgb3IgU3RhZ2UgY29vcmRpbmF0ZXMgdG8gbG9jYWxcblx0ICogY29vcmRpbmF0ZXMsIHJlc3BlY3RpdmVseS48L3A+XG5cdCAqXG5cdCAqIEBwYXJhbSB0YXJnZXRDb29yZGluYXRlU3BhY2UgVGhlIGRpc3BsYXkgb2JqZWN0IHRoYXQgZGVmaW5lcyB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb29yZGluYXRlIHN5c3RlbSB0byB1c2UuXG5cdCAqIEByZXR1cm4gVGhlIHJlY3RhbmdsZSB0aGF0IGRlZmluZXMgdGhlIGFyZWEgb2YgdGhlIGRpc3BsYXkgb2JqZWN0IHJlbGF0aXZlXG5cdCAqICAgICAgICAgdG8gdGhlIDxjb2RlPnRhcmdldENvb3JkaW5hdGVTcGFjZTwvY29kZT4gb2JqZWN0J3MgY29vcmRpbmF0ZVxuXHQgKiAgICAgICAgIHN5c3RlbS5cblx0ICovXG5cdHB1YmxpYyBnZXRSZWN0KHRhcmdldENvb3JkaW5hdGVTcGFjZTpEaXNwbGF5T2JqZWN0KTpSZWN0YW5nbGVcblx0e1xuXHRcdHJldHVybiB0aGlzLl9ib3VuZHM7IC8vVE9ET1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIHRoZSA8Y29kZT5wb2ludDwvY29kZT4gb2JqZWN0IGZyb20gdGhlIFN0YWdlKGdsb2JhbCkgY29vcmRpbmF0ZXNcblx0ICogdG8gdGhlIGRpc3BsYXkgb2JqZWN0J3MobG9jYWwpIGNvb3JkaW5hdGVzLlxuXHQgKlxuXHQgKiA8cD5UbyB1c2UgdGhpcyBtZXRob2QsIGZpcnN0IGNyZWF0ZSBhbiBpbnN0YW5jZSBvZiB0aGUgUG9pbnQgY2xhc3MuIFRoZVxuXHQgKiA8aT54PC9pPiBhbmQgPGk+eTwvaT4gdmFsdWVzIHRoYXQgeW91IGFzc2lnbiByZXByZXNlbnQgZ2xvYmFsIGNvb3JkaW5hdGVzXG5cdCAqIGJlY2F1c2UgdGhleSByZWxhdGUgdG8gdGhlIG9yaWdpbigwLDApIG9mIHRoZSBtYWluIGRpc3BsYXkgYXJlYS4gVGhlblxuXHQgKiBwYXNzIHRoZSBQb2ludCBpbnN0YW5jZSBhcyB0aGUgcGFyYW1ldGVyIHRvIHRoZVxuXHQgKiA8Y29kZT5nbG9iYWxUb0xvY2FsKCk8L2NvZGU+IG1ldGhvZC4gVGhlIG1ldGhvZCByZXR1cm5zIGEgbmV3IFBvaW50IG9iamVjdFxuXHQgKiB3aXRoIDxpPng8L2k+IGFuZCA8aT55PC9pPiB2YWx1ZXMgdGhhdCByZWxhdGUgdG8gdGhlIG9yaWdpbiBvZiB0aGUgZGlzcGxheVxuXHQgKiBvYmplY3QgaW5zdGVhZCBvZiB0aGUgb3JpZ2luIG9mIHRoZSBTdGFnZS48L3A+XG5cdCAqXG5cdCAqIEBwYXJhbSBwb2ludCBBbiBvYmplY3QgY3JlYXRlZCB3aXRoIHRoZSBQb2ludCBjbGFzcy4gVGhlIFBvaW50IG9iamVjdFxuXHQgKiAgICAgICAgICAgICAgc3BlY2lmaWVzIHRoZSA8aT54PC9pPiBhbmQgPGk+eTwvaT4gY29vcmRpbmF0ZXMgYXNcblx0ICogICAgICAgICAgICAgIHByb3BlcnRpZXMuXG5cdCAqIEByZXR1cm4gQSBQb2ludCBvYmplY3Qgd2l0aCBjb29yZGluYXRlcyByZWxhdGl2ZSB0byB0aGUgZGlzcGxheSBvYmplY3QuXG5cdCAqL1xuXHRwdWJsaWMgZ2xvYmFsVG9Mb2NhbChwb2ludDpQb2ludCk6UG9pbnRcblx0e1xuXHRcdHJldHVybiBwb2ludDsgLy9UT0RPXG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydHMgYSB0d28tZGltZW5zaW9uYWwgcG9pbnQgZnJvbSB0aGUgU3RhZ2UoZ2xvYmFsKSBjb29yZGluYXRlcyB0byBhXG5cdCAqIHRocmVlLWRpbWVuc2lvbmFsIGRpc3BsYXkgb2JqZWN0J3MobG9jYWwpIGNvb3JkaW5hdGVzLlxuXHQgKlxuXHQgKiA8cD5UbyB1c2UgdGhpcyBtZXRob2QsIGZpcnN0IGNyZWF0ZSBhbiBpbnN0YW5jZSBvZiB0aGUgUG9pbnQgY2xhc3MuIFRoZSB4XG5cdCAqIGFuZCB5IHZhbHVlcyB0aGF0IHlvdSBhc3NpZ24gdG8gdGhlIFBvaW50IG9iamVjdCByZXByZXNlbnQgZ2xvYmFsXG5cdCAqIGNvb3JkaW5hdGVzIGJlY2F1c2UgdGhleSBhcmUgcmVsYXRpdmUgdG8gdGhlIG9yaWdpbigwLDApIG9mIHRoZSBtYWluXG5cdCAqIGRpc3BsYXkgYXJlYS4gVGhlbiBwYXNzIHRoZSBQb2ludCBvYmplY3QgdG8gdGhlXG5cdCAqIDxjb2RlPmdsb2JhbFRvTG9jYWwzRCgpPC9jb2RlPiBtZXRob2QgYXMgdGhlIDxjb2RlPnBvaW50PC9jb2RlPiBwYXJhbWV0ZXIuXG5cdCAqIFRoZSBtZXRob2QgcmV0dXJucyB0aHJlZS1kaW1lbnNpb25hbCBjb29yZGluYXRlcyBhcyBhIFZlY3RvcjNEIG9iamVjdFxuXHQgKiBjb250YWluaW5nIDxjb2RlPng8L2NvZGU+LCA8Y29kZT55PC9jb2RlPiwgYW5kIDxjb2RlPno8L2NvZGU+IHZhbHVlcyB0aGF0XG5cdCAqIGFyZSByZWxhdGl2ZSB0byB0aGUgb3JpZ2luIG9mIHRoZSB0aHJlZS1kaW1lbnNpb25hbCBkaXNwbGF5IG9iamVjdC48L3A+XG5cdCAqXG5cdCAqIEBwYXJhbSBwb2ludCBBIHR3byBkaW1lbnNpb25hbCBQb2ludCBvYmplY3QgcmVwcmVzZW50aW5nIGdsb2JhbCB4IGFuZCB5XG5cdCAqICAgICAgICAgICAgICBjb29yZGluYXRlcy5cblx0ICogQHJldHVybiBBIFZlY3RvcjNEIG9iamVjdCB3aXRoIGNvb3JkaW5hdGVzIHJlbGF0aXZlIHRvIHRoZVxuXHQgKiAgICAgICAgIHRocmVlLWRpbWVuc2lvbmFsIGRpc3BsYXkgb2JqZWN0LlxuXHQgKi9cblx0cHVibGljIGdsb2JhbFRvTG9jYWwzRChwb2ludDpQb2ludCk6VmVjdG9yM0Rcblx0e1xuXHRcdHJldHVybiBuZXcgVmVjdG9yM0QoKTsgLy9UT0RPXG5cdH1cblxuXHQvKipcblx0ICogRXZhbHVhdGVzIHRoZSBib3VuZGluZyBib3ggb2YgdGhlIGRpc3BsYXkgb2JqZWN0IHRvIHNlZSBpZiBpdCBvdmVybGFwcyBvclxuXHQgKiBpbnRlcnNlY3RzIHdpdGggdGhlIGJvdW5kaW5nIGJveCBvZiB0aGUgPGNvZGU+b2JqPC9jb2RlPiBkaXNwbGF5IG9iamVjdC5cblx0ICpcblx0ICogQHBhcmFtIG9iaiBUaGUgZGlzcGxheSBvYmplY3QgdG8gdGVzdCBhZ2FpbnN0LlxuXHQgKiBAcmV0dXJuIDxjb2RlPnRydWU8L2NvZGU+IGlmIHRoZSBib3VuZGluZyBib3hlcyBvZiB0aGUgZGlzcGxheSBvYmplY3RzXG5cdCAqICAgICAgICAgaW50ZXJzZWN0OyA8Y29kZT5mYWxzZTwvY29kZT4gaWYgbm90LlxuXHQgKi9cblx0cHVibGljIGhpdFRlc3RPYmplY3Qob2JqOkRpc3BsYXlPYmplY3QpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiBmYWxzZTsgLy9UT0RPXG5cdH1cblxuXHQvKipcblx0ICogRXZhbHVhdGVzIHRoZSBkaXNwbGF5IG9iamVjdCB0byBzZWUgaWYgaXQgb3ZlcmxhcHMgb3IgaW50ZXJzZWN0cyB3aXRoIHRoZVxuXHQgKiBwb2ludCBzcGVjaWZpZWQgYnkgdGhlIDxjb2RlPng8L2NvZGU+IGFuZCA8Y29kZT55PC9jb2RlPiBwYXJhbWV0ZXJzLiBUaGVcblx0ICogPGNvZGU+eDwvY29kZT4gYW5kIDxjb2RlPnk8L2NvZGU+IHBhcmFtZXRlcnMgc3BlY2lmeSBhIHBvaW50IGluIHRoZVxuXHQgKiBjb29yZGluYXRlIHNwYWNlIG9mIHRoZSBTdGFnZSwgbm90IHRoZSBkaXNwbGF5IG9iamVjdCBjb250YWluZXIgdGhhdFxuXHQgKiBjb250YWlucyB0aGUgZGlzcGxheSBvYmplY3QodW5sZXNzIHRoYXQgZGlzcGxheSBvYmplY3QgY29udGFpbmVyIGlzIHRoZVxuXHQgKiBTdGFnZSkuXG5cdCAqXG5cdCAqIEBwYXJhbSB4ICAgICAgICAgVGhlIDxpPng8L2k+IGNvb3JkaW5hdGUgdG8gdGVzdCBhZ2FpbnN0IHRoaXMgb2JqZWN0LlxuXHQgKiBAcGFyYW0geSAgICAgICAgIFRoZSA8aT55PC9pPiBjb29yZGluYXRlIHRvIHRlc3QgYWdhaW5zdCB0aGlzIG9iamVjdC5cblx0ICogQHBhcmFtIHNoYXBlRmxhZyBXaGV0aGVyIHRvIGNoZWNrIGFnYWluc3QgdGhlIGFjdHVhbCBwaXhlbHMgb2YgdGhlIG9iamVjdFxuXHQgKiAgICAgICAgICAgICAgICAgKDxjb2RlPnRydWU8L2NvZGU+KSBvciB0aGUgYm91bmRpbmcgYm94XG5cdCAqICAgICAgICAgICAgICAgICAoPGNvZGU+ZmFsc2U8L2NvZGU+KS5cblx0ICogQHJldHVybiA8Y29kZT50cnVlPC9jb2RlPiBpZiB0aGUgZGlzcGxheSBvYmplY3Qgb3ZlcmxhcHMgb3IgaW50ZXJzZWN0c1xuXHQgKiAgICAgICAgIHdpdGggdGhlIHNwZWNpZmllZCBwb2ludDsgPGNvZGU+ZmFsc2U8L2NvZGU+IG90aGVyd2lzZS5cblx0ICovXG5cdHB1YmxpYyBoaXRUZXN0UG9pbnQoeDpudW1iZXIsIHk6bnVtYmVyLCBzaGFwZUZsYWc6Ym9vbGVhbiA9IGZhbHNlKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gZmFsc2U7IC8vVE9ET1xuXHR9XG5cblx0LyoqXG5cdCAqIEBpbmhlcml0RG9jXG5cdCAqL1xuXHRwdWJsaWMgaXNJbnRlcnNlY3RpbmdSYXkocmF5UG9zaXRpb246VmVjdG9yM0QsIHJheURpcmVjdGlvbjpWZWN0b3IzRCk6Ym9vbGVhblxuXHR7XG5cdFx0dmFyIGxvY2FsUmF5UG9zaXRpb246VmVjdG9yM0QgPSB0aGlzLmludmVyc2VTY2VuZVRyYW5zZm9ybS50cmFuc2Zvcm1WZWN0b3IocmF5UG9zaXRpb24pO1xuXHRcdHZhciBsb2NhbFJheURpcmVjdGlvbjpWZWN0b3IzRCA9IHRoaXMuaW52ZXJzZVNjZW5lVHJhbnNmb3JtLmRlbHRhVHJhbnNmb3JtVmVjdG9yKHJheURpcmVjdGlvbik7XG5cdFx0dmFyIHBpY2tpbmdDb2xsaXNpb25WTzpQaWNraW5nQ29sbGlzaW9uVk8gPSB0aGlzLl9pUGlja2luZ0NvbGxpc2lvblZPO1xuXG5cdFx0aWYgKCFwaWNraW5nQ29sbGlzaW9uVk8ubG9jYWxOb3JtYWwpXG5cdFx0XHRwaWNraW5nQ29sbGlzaW9uVk8ubG9jYWxOb3JtYWwgPSBuZXcgVmVjdG9yM0QoKTtcblxuXHRcdHZhciByYXlFbnRyeURpc3RhbmNlOm51bWJlciA9IHRoaXMuYm91bmRzLnJheUludGVyc2VjdGlvbihsb2NhbFJheVBvc2l0aW9uLCBsb2NhbFJheURpcmVjdGlvbiwgcGlja2luZ0NvbGxpc2lvblZPLmxvY2FsTm9ybWFsKTtcblxuXHRcdGlmIChyYXlFbnRyeURpc3RhbmNlIDwgMClcblx0XHRcdHJldHVybiBmYWxzZTtcblxuXHRcdHBpY2tpbmdDb2xsaXNpb25WTy5yYXlFbnRyeURpc3RhbmNlID0gcmF5RW50cnlEaXN0YW5jZTtcblx0XHRwaWNraW5nQ29sbGlzaW9uVk8ubG9jYWxSYXlQb3NpdGlvbiA9IGxvY2FsUmF5UG9zaXRpb247XG5cdFx0cGlja2luZ0NvbGxpc2lvblZPLmxvY2FsUmF5RGlyZWN0aW9uID0gbG9jYWxSYXlEaXJlY3Rpb247XG5cdFx0cGlja2luZ0NvbGxpc2lvblZPLnJheVBvc2l0aW9uID0gcmF5UG9zaXRpb247XG5cdFx0cGlja2luZ0NvbGxpc2lvblZPLnJheURpcmVjdGlvbiA9IHJheURpcmVjdGlvbjtcblx0XHRwaWNraW5nQ29sbGlzaW9uVk8ucmF5T3JpZ2luSXNJbnNpZGVCb3VuZHMgPSByYXlFbnRyeURpc3RhbmNlID09IDA7XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBhIHRocmVlLWRpbWVuc2lvbmFsIHBvaW50IG9mIHRoZSB0aHJlZS1kaW1lbnNpb25hbCBkaXNwbGF5XG5cdCAqIG9iamVjdCdzKGxvY2FsKSBjb29yZGluYXRlcyB0byBhIHR3by1kaW1lbnNpb25hbCBwb2ludCBpbiB0aGUgU3RhZ2Vcblx0ICogKGdsb2JhbCkgY29vcmRpbmF0ZXMuXG5cdCAqXG5cdCAqIDxwPkZvciBleGFtcGxlLCB5b3UgY2FuIG9ubHkgdXNlIHR3by1kaW1lbnNpb25hbCBjb29yZGluYXRlcyh4LHkpIHRvIGRyYXdcblx0ICogd2l0aCB0aGUgPGNvZGU+ZGlzcGxheS5HcmFwaGljczwvY29kZT4gbWV0aG9kcy4gVG8gZHJhdyBhXG5cdCAqIHRocmVlLWRpbWVuc2lvbmFsIG9iamVjdCwgeW91IG5lZWQgdG8gbWFwIHRoZSB0aHJlZS1kaW1lbnNpb25hbFxuXHQgKiBjb29yZGluYXRlcyBvZiBhIGRpc3BsYXkgb2JqZWN0IHRvIHR3by1kaW1lbnNpb25hbCBjb29yZGluYXRlcy4gRmlyc3QsXG5cdCAqIGNyZWF0ZSBhbiBpbnN0YW5jZSBvZiB0aGUgVmVjdG9yM0QgY2xhc3MgdGhhdCBob2xkcyB0aGUgeC0sIHktLCBhbmQgei1cblx0ICogY29vcmRpbmF0ZXMgb2YgdGhlIHRocmVlLWRpbWVuc2lvbmFsIGRpc3BsYXkgb2JqZWN0LiBUaGVuIHBhc3MgdGhlXG5cdCAqIFZlY3RvcjNEIG9iamVjdCB0byB0aGUgPGNvZGU+bG9jYWwzRFRvR2xvYmFsKCk8L2NvZGU+IG1ldGhvZCBhcyB0aGVcblx0ICogPGNvZGU+cG9pbnQzZDwvY29kZT4gcGFyYW1ldGVyLiBUaGUgbWV0aG9kIHJldHVybnMgYSB0d28tZGltZW5zaW9uYWwgUG9pbnRcblx0ICogb2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgd2l0aCB0aGUgR3JhcGhpY3MgQVBJIHRvIGRyYXcgdGhlXG5cdCAqIHRocmVlLWRpbWVuc2lvbmFsIG9iamVjdC48L3A+XG5cdCAqXG5cdCAqIEBwYXJhbSBwb2ludDNkIEEgVmVjdG9yM0Qgb2JqZWN0IGNvbnRhaW5pbmcgZWl0aGVyIGEgdGhyZWUtZGltZW5zaW9uYWxcblx0ICogICAgICAgICAgICAgICAgcG9pbnQgb3IgdGhlIGNvb3JkaW5hdGVzIG9mIHRoZSB0aHJlZS1kaW1lbnNpb25hbCBkaXNwbGF5XG5cdCAqICAgICAgICAgICAgICAgIG9iamVjdC5cblx0ICogQHJldHVybiBBIHR3by1kaW1lbnNpb25hbCBwb2ludCByZXByZXNlbnRpbmcgYSB0aHJlZS1kaW1lbnNpb25hbCBwb2ludCBpblxuXHQgKiAgICAgICAgIHR3by1kaW1lbnNpb25hbCBzcGFjZS5cblx0ICovXG5cdHB1YmxpYyBsb2NhbDNEVG9HbG9iYWwocG9pbnQzZDpWZWN0b3IzRCk6UG9pbnRcblx0e1xuXHRcdHJldHVybiBuZXcgUG9pbnQoKTsgLy9UT0RPXG5cdH1cblxuXHQvKipcblx0ICogUm90YXRlcyB0aGUgM2Qgb2JqZWN0IGFyb3VuZCB0byBmYWNlIGEgcG9pbnQgZGVmaW5lZCByZWxhdGl2ZSB0byB0aGUgbG9jYWwgY29vcmRpbmF0ZXMgb2YgdGhlIHBhcmVudCA8Y29kZT5PYmplY3RDb250YWluZXIzRDwvY29kZT4uXG5cdCAqXG5cdCAqIEBwYXJhbSAgICB0YXJnZXQgICAgICAgIFRoZSB2ZWN0b3IgZGVmaW5pbmcgdGhlIHBvaW50IHRvIGJlIGxvb2tlZCBhdFxuXHQgKiBAcGFyYW0gICAgdXBBeGlzICAgICAgICBBbiBvcHRpb25hbCB2ZWN0b3IgdXNlZCB0byBkZWZpbmUgdGhlIGRlc2lyZWQgdXAgb3JpZW50YXRpb24gb2YgdGhlIDNkIG9iamVjdCBhZnRlciByb3RhdGlvbiBoYXMgb2NjdXJyZWRcblx0ICovXG5cdHB1YmxpYyBsb29rQXQodGFyZ2V0OlZlY3RvcjNELCB1cEF4aXM6VmVjdG9yM0QgPSBudWxsKVxuXHR7XG5cblx0XHR2YXIgeUF4aXM6VmVjdG9yM0Q7XG5cdFx0dmFyIHpBeGlzOlZlY3RvcjNEO1xuXHRcdHZhciB4QXhpczpWZWN0b3IzRDtcblx0XHR2YXIgcmF3OkFycmF5PG51bWJlcj47XG5cblx0XHRpZiAodXBBeGlzID09IG51bGwpXG5cdFx0XHR1cEF4aXMgPSBWZWN0b3IzRC5ZX0FYSVM7XG5cdFx0ZWxzZVxuXHRcdFx0dXBBeGlzLm5vcm1hbGl6ZSgpO1xuXG5cdFx0ekF4aXMgPSB0YXJnZXQuc3VidHJhY3QodGhpcy5faU1hdHJpeDNELnBvc2l0aW9uKTtcblx0XHR6QXhpcy5ub3JtYWxpemUoKTtcblxuXHRcdHhBeGlzID0gdXBBeGlzLmNyb3NzUHJvZHVjdCh6QXhpcyk7XG5cdFx0eEF4aXMubm9ybWFsaXplKCk7XG5cblx0XHRpZiAoeEF4aXMubGVuZ3RoIDwgMC4wNSkge1xuXHRcdFx0eEF4aXMueCA9IHVwQXhpcy55O1xuXHRcdFx0eEF4aXMueSA9IHVwQXhpcy54O1xuXHRcdFx0eEF4aXMueiA9IDA7XG5cdFx0XHR4QXhpcy5ub3JtYWxpemUoKTtcblx0XHR9XG5cblx0XHR5QXhpcyA9IHpBeGlzLmNyb3NzUHJvZHVjdCh4QXhpcyk7XG5cblx0XHRyYXcgPSBNYXRyaXgzRFV0aWxzLlJBV19EQVRBX0NPTlRBSU5FUjtcblxuXHRcdHJhd1swXSA9IHhBeGlzLng7XG5cdFx0cmF3WzFdID0geEF4aXMueTtcblx0XHRyYXdbMl0gPSB4QXhpcy56O1xuXHRcdHJhd1szXSA9IDA7XG5cblx0XHRyYXdbNF0gPSB5QXhpcy54O1xuXHRcdHJhd1s1XSA9IHlBeGlzLnk7XG5cdFx0cmF3WzZdID0geUF4aXMuejtcblx0XHRyYXdbN10gPSAwO1xuXG5cdFx0cmF3WzhdID0gekF4aXMueDtcblx0XHRyYXdbOV0gPSB6QXhpcy55O1xuXHRcdHJhd1sxMF0gPSB6QXhpcy56O1xuXHRcdHJhd1sxMV0gPSAwO1xuXG5cdFx0dmFyIG06TWF0cml4M0QgPSBuZXcgTWF0cml4M0QoKTtcblx0XHRtLmNvcHlSYXdEYXRhRnJvbShyYXcpO1xuXG5cdFx0dmFyIHZlYzpWZWN0b3IzRCA9IG0uZGVjb21wb3NlKClbMV07XG5cblx0XHR0aGlzLl9yb3RhdGlvblggPSB2ZWMueDtcblx0XHR0aGlzLl9yb3RhdGlvblkgPSB2ZWMueTtcblx0XHR0aGlzLl9yb3RhdGlvblogPSB2ZWMuejtcblxuXHRcdHRoaXMuaW52YWxpZGF0ZVJvdGF0aW9uKCk7XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydHMgdGhlIDxjb2RlPnBvaW50PC9jb2RlPiBvYmplY3QgZnJvbSB0aGUgZGlzcGxheSBvYmplY3Qncyhsb2NhbClcblx0ICogY29vcmRpbmF0ZXMgdG8gdGhlIFN0YWdlKGdsb2JhbCkgY29vcmRpbmF0ZXMuXG5cdCAqXG5cdCAqIDxwPlRoaXMgbWV0aG9kIGFsbG93cyB5b3UgdG8gY29udmVydCBhbnkgZ2l2ZW4gPGk+eDwvaT4gYW5kIDxpPnk8L2k+XG5cdCAqIGNvb3JkaW5hdGVzIGZyb20gdmFsdWVzIHRoYXQgYXJlIHJlbGF0aXZlIHRvIHRoZSBvcmlnaW4oMCwwKSBvZiBhXG5cdCAqIHNwZWNpZmljIGRpc3BsYXkgb2JqZWN0KGxvY2FsIGNvb3JkaW5hdGVzKSB0byB2YWx1ZXMgdGhhdCBhcmUgcmVsYXRpdmUgdG9cblx0ICogdGhlIG9yaWdpbiBvZiB0aGUgU3RhZ2UoZ2xvYmFsIGNvb3JkaW5hdGVzKS48L3A+XG5cdCAqXG5cdCAqIDxwPlRvIHVzZSB0aGlzIG1ldGhvZCwgZmlyc3QgY3JlYXRlIGFuIGluc3RhbmNlIG9mIHRoZSBQb2ludCBjbGFzcy4gVGhlXG5cdCAqIDxpPng8L2k+IGFuZCA8aT55PC9pPiB2YWx1ZXMgdGhhdCB5b3UgYXNzaWduIHJlcHJlc2VudCBsb2NhbCBjb29yZGluYXRlc1xuXHQgKiBiZWNhdXNlIHRoZXkgcmVsYXRlIHRvIHRoZSBvcmlnaW4gb2YgdGhlIGRpc3BsYXkgb2JqZWN0LjwvcD5cblx0ICpcblx0ICogPHA+WW91IHRoZW4gcGFzcyB0aGUgUG9pbnQgaW5zdGFuY2UgdGhhdCB5b3UgY3JlYXRlZCBhcyB0aGUgcGFyYW1ldGVyIHRvXG5cdCAqIHRoZSA8Y29kZT5sb2NhbFRvR2xvYmFsKCk8L2NvZGU+IG1ldGhvZC4gVGhlIG1ldGhvZCByZXR1cm5zIGEgbmV3IFBvaW50XG5cdCAqIG9iamVjdCB3aXRoIDxpPng8L2k+IGFuZCA8aT55PC9pPiB2YWx1ZXMgdGhhdCByZWxhdGUgdG8gdGhlIG9yaWdpbiBvZiB0aGVcblx0ICogU3RhZ2UgaW5zdGVhZCBvZiB0aGUgb3JpZ2luIG9mIHRoZSBkaXNwbGF5IG9iamVjdC48L3A+XG5cdCAqXG5cdCAqIEBwYXJhbSBwb2ludCBUaGUgbmFtZSBvciBpZGVudGlmaWVyIG9mIGEgcG9pbnQgY3JlYXRlZCB3aXRoIHRoZSBQb2ludFxuXHQgKiAgICAgICAgICAgICAgY2xhc3MsIHNwZWNpZnlpbmcgdGhlIDxpPng8L2k+IGFuZCA8aT55PC9pPiBjb29yZGluYXRlcyBhc1xuXHQgKiAgICAgICAgICAgICAgcHJvcGVydGllcy5cblx0ICogQHJldHVybiBBIFBvaW50IG9iamVjdCB3aXRoIGNvb3JkaW5hdGVzIHJlbGF0aXZlIHRvIHRoZSBTdGFnZS5cblx0ICovXG5cdHB1YmxpYyBsb2NhbFRvR2xvYmFsKHBvaW50OlBvaW50KTpQb2ludFxuXHR7XG5cdFx0cmV0dXJuIG5ldyBQb2ludCgpOyAvL1RPRE9cblx0fVxuXG5cdC8qKlxuXHQgKiBNb3ZlcyB0aGUgM2Qgb2JqZWN0IGRpcmVjdGx5IHRvIGEgcG9pbnQgaW4gc3BhY2Vcblx0ICpcblx0ICogQHBhcmFtICAgIGR4ICAgICAgICBUaGUgYW1vdW50IG9mIG1vdmVtZW50IGFsb25nIHRoZSBsb2NhbCB4IGF4aXMuXG5cdCAqIEBwYXJhbSAgICBkeSAgICAgICAgVGhlIGFtb3VudCBvZiBtb3ZlbWVudCBhbG9uZyB0aGUgbG9jYWwgeSBheGlzLlxuXHQgKiBAcGFyYW0gICAgZHogICAgICAgIFRoZSBhbW91bnQgb2YgbW92ZW1lbnQgYWxvbmcgdGhlIGxvY2FsIHogYXhpcy5cblx0ICovXG5cblx0cHVibGljIG1vdmVUbyhkeDpudW1iZXIsIGR5Om51bWJlciwgZHo6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3ggPT0gZHggJiYgdGhpcy5feSA9PSBkeSAmJiB0aGlzLl96ID09IGR6KVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5feCA9IGR4O1xuXHRcdHRoaXMuX3kgPSBkeTtcblx0XHR0aGlzLl96ID0gZHo7XG5cblx0XHR0aGlzLmludmFsaWRhdGVQb3NpdGlvbigpO1xuXHR9XG5cblx0LyoqXG5cdCAqIE1vdmVzIHRoZSBsb2NhbCBwb2ludCBhcm91bmQgd2hpY2ggdGhlIG9iamVjdCByb3RhdGVzLlxuXHQgKlxuXHQgKiBAcGFyYW0gICAgZHggICAgICAgIFRoZSBhbW91bnQgb2YgbW92ZW1lbnQgYWxvbmcgdGhlIGxvY2FsIHggYXhpcy5cblx0ICogQHBhcmFtICAgIGR5ICAgICAgICBUaGUgYW1vdW50IG9mIG1vdmVtZW50IGFsb25nIHRoZSBsb2NhbCB5IGF4aXMuXG5cdCAqIEBwYXJhbSAgICBkeiAgICAgICAgVGhlIGFtb3VudCBvZiBtb3ZlbWVudCBhbG9uZyB0aGUgbG9jYWwgeiBheGlzLlxuXHQgKi9cblx0cHVibGljIG1vdmVQaXZvdChkeDpudW1iZXIsIGR5Om51bWJlciwgZHo6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3Bpdm90ID09IG51bGwpXG5cdFx0XHR0aGlzLl9waXZvdCA9IG5ldyBWZWN0b3IzRCgpO1xuXG5cdFx0dGhpcy5fcGl2b3QueCArPSBkeDtcblx0XHR0aGlzLl9waXZvdC55ICs9IGR5O1xuXHRcdHRoaXMuX3Bpdm90LnogKz0gZHo7XG5cblx0XHR0aGlzLmludmFsaWRhdGVQaXZvdCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJvdGF0ZXMgdGhlIDNkIG9iamVjdCBhcm91bmQgaXQncyBsb2NhbCB4LWF4aXNcblx0ICpcblx0ICogQHBhcmFtICAgIGFuZ2xlICAgICAgICBUaGUgYW1vdW50IG9mIHJvdGF0aW9uIGluIGRlZ3JlZXNcblx0ICovXG5cdHB1YmxpYyBwaXRjaChhbmdsZTpudW1iZXIpXG5cdHtcblx0XHR0aGlzLnJvdGF0ZShWZWN0b3IzRC5YX0FYSVMsIGFuZ2xlKTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldFJlbmRlclNjZW5lVHJhbnNmb3JtKGNhbWVyYTpDYW1lcmEpOk1hdHJpeDNEXG5cdHtcblx0XHRpZiAodGhpcy5vcmllbnRhdGlvbk1vZGUgPT0gT3JpZW50YXRpb25Nb2RlLkNBTUVSQV9QTEFORSkge1xuXHRcdFx0dmFyIGNvbXBzOkFycmF5PFZlY3RvcjNEPiA9IGNhbWVyYS5zY2VuZVRyYW5zZm9ybS5kZWNvbXBvc2UoKTtcblx0XHRcdHZhciBzY2FsZTpWZWN0b3IzRCA9IGNvbXBzWzJdO1xuXHRcdFx0Y29tcHNbMF0gPSB0aGlzLnNjZW5lUG9zaXRpb247XG5cdFx0XHRzY2FsZS54ID0gdGhpcy5fcFNjYWxlWDtcblx0XHRcdHNjYWxlLnkgPSB0aGlzLl9wU2NhbGVZO1xuXHRcdFx0c2NhbGUueiA9IHRoaXMuX3BTY2FsZVo7XG5cdFx0XHR0aGlzLl9vcmllbnRhdGlvbk1hdHJpeC5yZWNvbXBvc2UoY29tcHMpO1xuXG5cdFx0XHQvL2FkZCBpbiBjYXNlIG9mIHBpdm90XG5cdFx0XHRpZiAoIXRoaXMuX3Bpdm90WmVybyAmJiB0aGlzLmFsaWdubWVudE1vZGUgPT0gQWxpZ25tZW50TW9kZS5QSVZPVF9QT0lOVClcblx0XHRcdFx0dGhpcy5fb3JpZW50YXRpb25NYXRyaXgucHJlcGVuZFRyYW5zbGF0aW9uKC10aGlzLl9waXZvdC54L3RoaXMuX3BTY2FsZVgsIC10aGlzLl9waXZvdC55L3RoaXMuX3BTY2FsZVksIC10aGlzLl9waXZvdC56L3RoaXMuX3BTY2FsZVopO1xuXG5cdFx0XHRyZXR1cm4gdGhpcy5fb3JpZW50YXRpb25NYXRyaXg7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMuc2NlbmVUcmFuc2Zvcm07XG5cdH1cblxuXHQvKipcblx0ICogUm90YXRlcyB0aGUgM2Qgb2JqZWN0IGFyb3VuZCBpdCdzIGxvY2FsIHotYXhpc1xuXHQgKlxuXHQgKiBAcGFyYW0gICAgYW5nbGUgICAgICAgIFRoZSBhbW91bnQgb2Ygcm90YXRpb24gaW4gZGVncmVlc1xuXHQgKi9cblx0cHVibGljIHJvbGwoYW5nbGU6bnVtYmVyKVxuXHR7XG5cdFx0dGhpcy5yb3RhdGUoVmVjdG9yM0QuWl9BWElTLCBhbmdsZSk7XG5cdH1cblxuXHQvKipcblx0ICogUm90YXRlcyB0aGUgM2Qgb2JqZWN0IGFyb3VuZCBhbiBheGlzIGJ5IGEgZGVmaW5lZCBhbmdsZVxuXHQgKlxuXHQgKiBAcGFyYW0gICAgYXhpcyAgICAgICAgVGhlIHZlY3RvciBkZWZpbmluZyB0aGUgYXhpcyBvZiByb3RhdGlvblxuXHQgKiBAcGFyYW0gICAgYW5nbGUgICAgICAgIFRoZSBhbW91bnQgb2Ygcm90YXRpb24gaW4gZGVncmVlc1xuXHQgKi9cblx0cHVibGljIHJvdGF0ZShheGlzOlZlY3RvcjNELCBhbmdsZTpudW1iZXIpXG5cdHtcblx0XHR2YXIgbTpNYXRyaXgzRCA9IG5ldyBNYXRyaXgzRCgpO1xuXHRcdG0ucHJlcGVuZFJvdGF0aW9uKGFuZ2xlLCBheGlzKTtcblxuXHRcdHZhciB2ZWM6VmVjdG9yM0QgPSBtLmRlY29tcG9zZSgpWzFdO1xuXG5cdFx0dGhpcy5fcm90YXRpb25YICs9IHZlYy54O1xuXHRcdHRoaXMuX3JvdGF0aW9uWSArPSB2ZWMueTtcblx0XHR0aGlzLl9yb3RhdGlvblogKz0gdmVjLno7XG5cblx0XHR0aGlzLmludmFsaWRhdGVSb3RhdGlvbigpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJvdGF0ZXMgdGhlIDNkIG9iamVjdCBkaXJlY3RseSB0byBhIGV1bGVyIGFuZ2xlXG5cdCAqXG5cdCAqIEBwYXJhbSAgICBheCAgICAgICAgVGhlIGFuZ2xlIGluIGRlZ3JlZXMgb2YgdGhlIHJvdGF0aW9uIGFyb3VuZCB0aGUgeCBheGlzLlxuXHQgKiBAcGFyYW0gICAgYXkgICAgICAgIFRoZSBhbmdsZSBpbiBkZWdyZWVzIG9mIHRoZSByb3RhdGlvbiBhcm91bmQgdGhlIHkgYXhpcy5cblx0ICogQHBhcmFtICAgIGF6ICAgICAgICBUaGUgYW5nbGUgaW4gZGVncmVlcyBvZiB0aGUgcm90YXRpb24gYXJvdW5kIHRoZSB6IGF4aXMuXG5cdCAqL1xuXHRwdWJsaWMgcm90YXRlVG8oYXg6bnVtYmVyLCBheTpudW1iZXIsIGF6Om51bWJlcilcblx0e1xuXHRcdHRoaXMuX3JvdGF0aW9uWCA9IGF4Kk1hdGhDb25zdHMuREVHUkVFU19UT19SQURJQU5TO1xuXHRcdHRoaXMuX3JvdGF0aW9uWSA9IGF5Kk1hdGhDb25zdHMuREVHUkVFU19UT19SQURJQU5TO1xuXHRcdHRoaXMuX3JvdGF0aW9uWiA9IGF6Kk1hdGhDb25zdHMuREVHUkVFU19UT19SQURJQU5TO1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlUm90YXRpb24oKTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIHJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZTpzdHJpbmcsIGxpc3RlbmVyOkZ1bmN0aW9uKVxuXHR7XG5cdFx0c3VwZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcik7XG5cblx0XHRpZiAodGhpcy5oYXNFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSlcblx0XHRcdHJldHVybjtcblxuXHRcdHN3aXRjaCAodHlwZSkge1xuXHRcdFx0Y2FzZSBEaXNwbGF5T2JqZWN0RXZlbnQuUE9TSVRJT05fQ0hBTkdFRDpcblx0XHRcdFx0dGhpcy5fbGlzdGVuVG9Qb3NpdGlvbkNoYW5nZWQgPSBmYWxzZTtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgRGlzcGxheU9iamVjdEV2ZW50LlJPVEFUSU9OX0NIQU5HRUQ6XG5cdFx0XHRcdHRoaXMuX2xpc3RlblRvUm90YXRpb25DaGFuZ2VkID0gZmFsc2U7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIERpc3BsYXlPYmplY3RFdmVudC5TQ0FMRV9DSEFOR0VEOlxuXHRcdFx0XHR0aGlzLl9saXN0ZW5Ub1NjYWxlQ2hhbmdlZCA9IGZhbHNlO1xuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogTW92ZXMgdGhlIDNkIG9iamVjdCBhbG9uZyBhIHZlY3RvciBieSBhIGRlZmluZWQgbGVuZ3RoXG5cdCAqXG5cdCAqIEBwYXJhbSAgICBheGlzICAgICAgICBUaGUgdmVjdG9yIGRlZmluaW5nIHRoZSBheGlzIG9mIG1vdmVtZW50XG5cdCAqIEBwYXJhbSAgICBkaXN0YW5jZSAgICBUaGUgbGVuZ3RoIG9mIHRoZSBtb3ZlbWVudFxuXHQgKi9cblx0cHVibGljIHRyYW5zbGF0ZShheGlzOlZlY3RvcjNELCBkaXN0YW5jZTpudW1iZXIpXG5cdHtcblx0XHR2YXIgeDpudW1iZXIgPSBheGlzLngsIHk6bnVtYmVyID0gYXhpcy55LCB6Om51bWJlciA9IGF4aXMuejtcblx0XHR2YXIgbGVuOm51bWJlciA9IGRpc3RhbmNlL01hdGguc3FydCh4KnggKyB5KnkgKyB6KnopO1xuXG5cdFx0dGhpcy5feCArPSB4Kmxlbjtcblx0XHR0aGlzLl95ICs9IHkqbGVuO1xuXHRcdHRoaXMuX3ogKz0geipsZW47XG5cblx0XHR0aGlzLmludmFsaWRhdGVQb3NpdGlvbigpO1xuXHR9XG5cblx0LyoqXG5cdCAqIE1vdmVzIHRoZSAzZCBvYmplY3QgYWxvbmcgYSB2ZWN0b3IgYnkgYSBkZWZpbmVkIGxlbmd0aFxuXHQgKlxuXHQgKiBAcGFyYW0gICAgYXhpcyAgICAgICAgVGhlIHZlY3RvciBkZWZpbmluZyB0aGUgYXhpcyBvZiBtb3ZlbWVudFxuXHQgKiBAcGFyYW0gICAgZGlzdGFuY2UgICAgVGhlIGxlbmd0aCBvZiB0aGUgbW92ZW1lbnRcblx0ICovXG5cdHB1YmxpYyB0cmFuc2xhdGVMb2NhbChheGlzOlZlY3RvcjNELCBkaXN0YW5jZTpudW1iZXIpXG5cdHtcblx0XHR2YXIgeDpudW1iZXIgPSBheGlzLngsIHk6bnVtYmVyID0gYXhpcy55LCB6Om51bWJlciA9IGF4aXMuejtcblx0XHR2YXIgbGVuOm51bWJlciA9IGRpc3RhbmNlL01hdGguc3FydCh4KnggKyB5KnkgKyB6KnopO1xuXG5cdFx0dGhpcy5faU1hdHJpeDNELnByZXBlbmRUcmFuc2xhdGlvbih4KmxlbiwgeSpsZW4sIHoqbGVuKTtcblxuXHRcdHRoaXMuX21hdHJpeDNELmNvcHlDb2x1bW5UbygzLCB0aGlzLl9wb3MpO1xuXG5cdFx0dGhpcy5feCA9IHRoaXMuX3Bvcy54O1xuXHRcdHRoaXMuX3kgPSB0aGlzLl9wb3MueTtcblx0XHR0aGlzLl96ID0gdGhpcy5fcG9zLno7XG5cblx0XHR0aGlzLmludmFsaWRhdGVQb3NpdGlvbigpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJvdGF0ZXMgdGhlIDNkIG9iamVjdCBhcm91bmQgaXQncyBsb2NhbCB5LWF4aXNcblx0ICpcblx0ICogQHBhcmFtICAgIGFuZ2xlICAgICAgICBUaGUgYW1vdW50IG9mIHJvdGF0aW9uIGluIGRlZ3JlZXNcblx0ICovXG5cdHB1YmxpYyB5YXcoYW5nbGU6bnVtYmVyKVxuXHR7XG5cdFx0dGhpcy5yb3RhdGUoVmVjdG9yM0QuWV9BWElTLCBhbmdsZSk7XG5cdH1cblxuXHQvKipcblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwdWJsaWMgX2lDb250cm9sbGVyOkNvbnRyb2xsZXJCYXNlO1xuXG5cdC8qKlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHB1YmxpYyBnZXQgX2lBc3NpZ25lZFBhcnRpdGlvbigpOlBhcnRpdGlvblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BJbXBsaWNpdFBhcnRpdGlvbjtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgdHJhbnNmb3JtYXRpb24gb2YgdGhlIDNkIG9iamVjdCwgcmVsYXRpdmUgdG8gdGhlIGxvY2FsIGNvb3JkaW5hdGVzIG9mIHRoZSBwYXJlbnQgPGNvZGU+T2JqZWN0Q29udGFpbmVyM0Q8L2NvZGU+LlxuXHQgKlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHB1YmxpYyBnZXQgX2lNYXRyaXgzRCgpOk1hdHJpeDNEXG5cdHtcblx0XHRpZiAodGhpcy5fbWF0cml4M0REaXJ0eSlcblx0XHRcdHRoaXMuX3BVcGRhdGVNYXRyaXgzRCgpO1xuXG5cdFx0cmV0dXJuIHRoaXMuX21hdHJpeDNEO1xuXHR9XG5cblx0cHVibGljIHNldCBfaU1hdHJpeDNEKHZhbDpNYXRyaXgzRClcblx0e1xuXG5cdFx0Ly8gVE9ETzogRnJvbSBBUzMgLSBEbyB3ZSBzdGlsbCBuZWVkIHRoaXMgaW4gSlMgP1xuXHRcdC8vcmlkaWN1bG91cyBtYXRyaXggZXJyb3Jcblx0XHQvKlxuXHRcdGlmICghdmFsLnJhd0RhdGFbMF0pIHtcblxuXHRcdFx0dmFyIHJhdzpudW1iZXJbXSA9IE1hdHJpeDNEVXRpbHMuUkFXX0RBVEFfQ09OVEFJTkVSO1xuXHRcdFx0dmFsLmNvcHlSYXdEYXRhVG8ocmF3KTtcblx0XHRcdHJhd1swXSA9IHRoaXMuX3NtYWxsZXN0TnVtYmVyO1xuXHRcdFx0dmFsLmNvcHlSYXdEYXRhRnJvbShyYXcpO1xuXHRcdH1cblx0XHQvLyovXG5cdFx0dmFyIGVsZW1lbnRzOkFycmF5PFZlY3RvcjNEPiA9IHZhbC5kZWNvbXBvc2UoKTtcblx0XHR2YXIgdmVjOlZlY3RvcjNEO1xuXG5cdFx0dmVjID0gZWxlbWVudHNbMF07XG5cblx0XHRpZiAodGhpcy5feCAhPSB2ZWMueCB8fCB0aGlzLl95ICE9IHZlYy55IHx8IHRoaXMuX3ogIT0gdmVjLnopIHtcblx0XHRcdHRoaXMuX3ggPSB2ZWMueDtcblx0XHRcdHRoaXMuX3kgPSB2ZWMueTtcblx0XHRcdHRoaXMuX3ogPSB2ZWMuejtcblxuXHRcdFx0dGhpcy5pbnZhbGlkYXRlUG9zaXRpb24oKTtcblx0XHR9XG5cblx0XHR2ZWMgPSBlbGVtZW50c1sxXTtcblxuXHRcdGlmICh0aGlzLl9yb3RhdGlvblggIT0gdmVjLnggfHwgdGhpcy5fcm90YXRpb25ZICE9IHZlYy55IHx8IHRoaXMuX3JvdGF0aW9uWiAhPSB2ZWMueikge1xuXHRcdFx0dGhpcy5fcm90YXRpb25YID0gdmVjLng7XG5cdFx0XHR0aGlzLl9yb3RhdGlvblkgPSB2ZWMueTtcblx0XHRcdHRoaXMuX3JvdGF0aW9uWiA9IHZlYy56O1xuXG5cdFx0XHR0aGlzLmludmFsaWRhdGVSb3RhdGlvbigpO1xuXHRcdH1cblxuXHRcdHZlYyA9IGVsZW1lbnRzWzJdO1xuXG5cdFx0aWYgKHRoaXMuX3BTY2FsZVggIT0gdmVjLnggfHwgdGhpcy5fcFNjYWxlWSAhPSB2ZWMueSB8fCB0aGlzLl9wU2NhbGVaICE9IHZlYy56KSB7XG5cdFx0XHR0aGlzLl9wU2NhbGVYID0gdmVjLng7XG5cdFx0XHR0aGlzLl9wU2NhbGVZID0gdmVjLnk7XG5cdFx0XHR0aGlzLl9wU2NhbGVaID0gdmVjLno7XG5cblx0XHRcdHRoaXMuaW52YWxpZGF0ZVNjYWxlKCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHVibGljIGdldCBfaVBpY2tpbmdDb2xsaXNpb25WTygpOlBpY2tpbmdDb2xsaXNpb25WT1xuXHR7XG5cdFx0aWYgKCF0aGlzLl9wUGlja2luZ0NvbGxpc2lvblZPKVxuXHRcdFx0dGhpcy5fcFBpY2tpbmdDb2xsaXNpb25WTyA9IG5ldyBQaWNraW5nQ29sbGlzaW9uVk8odGhpcyk7XG5cblx0XHRyZXR1cm4gdGhpcy5fcFBpY2tpbmdDb2xsaXNpb25WTztcblx0fVxuXG5cdC8qKlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHB1YmxpYyBpU2V0UGFyZW50KHZhbHVlOkRpc3BsYXlPYmplY3RDb250YWluZXIpXG5cdHtcblx0XHR0aGlzLl9wUGFyZW50ID0gdmFsdWU7XG5cblx0XHRpZiAodmFsdWUpIHtcblx0XHRcdHRoaXMuX3BVcGRhdGVJbXBsaWNpdE1vdXNlRW5hYmxlZCh2YWx1ZS5tb3VzZUNoaWxkcmVuKTtcblx0XHRcdHRoaXMuX3BVcGRhdGVJbXBsaWNpdFZpc2liaWxpdHkodmFsdWUuX2lJc1Zpc2libGUoKSk7XG5cdFx0XHR0aGlzLl9wVXBkYXRlSW1wbGljaXRQYXJ0aXRpb24odmFsdWUuX2lBc3NpZ25lZFBhcnRpdGlvbik7XG5cdFx0XHR0aGlzLl9pU2V0U2NlbmUodmFsdWUuX3BTY2VuZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX3BVcGRhdGVJbXBsaWNpdE1vdXNlRW5hYmxlZCh0cnVlKTtcblx0XHRcdHRoaXMuX3BVcGRhdGVJbXBsaWNpdFZpc2liaWxpdHkodHJ1ZSk7XG5cdFx0XHR0aGlzLl9wVXBkYXRlSW1wbGljaXRQYXJ0aXRpb24obnVsbCk7XG5cblx0XHRcdHRoaXMuX2lTZXRTY2VuZShudWxsKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQHByb3RlY3RlZFxuXHQgKi9cblx0cHVibGljIHBDcmVhdGVEZWZhdWx0Qm91bmRpbmdWb2x1bWUoKTpCb3VuZGluZ1ZvbHVtZUJhc2Vcblx0e1xuXHRcdC8vIHBvaW50IGxpZ2h0cyBzaG91bGQgYmUgdXNpbmcgc3BoZXJlIGJvdW5kc1xuXHRcdC8vIGRpcmVjdGlvbmFsIGxpZ2h0cyBzaG91bGQgYmUgdXNpbmcgbnVsbCBib3VuZHNcblx0XHRyZXR1cm4gbmV3IEF4aXNBbGlnbmVkQm91bmRpbmdCb3goKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcHJvdGVjdGVkXG5cdCAqL1xuXHRwdWJsaWMgcENyZWF0ZUVudGl0eVBhcnRpdGlvbk5vZGUoKTpFbnRpdHlOb2RlXG5cdHtcblx0XHR0aHJvdyBuZXcgQWJzdHJhY3RNZXRob2RFcnJvcigpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwcm90ZWN0ZWRcblx0ICovXG5cdHB1YmxpYyBwSW52YWxpZGF0ZUJvdW5kcygpXG5cdHtcblx0XHR0aGlzLl9wQm91bmRzSW52YWxpZCA9IHRydWU7XG5cdFx0dGhpcy5fd29ybGRCb3VuZHNJbnZhbGlkID0gdHJ1ZTtcblxuXG5cdFx0aWYgKHRoaXMuaXNFbnRpdHkpXG5cdFx0XHR0aGlzLmludmFsaWRhdGVQYXJ0aXRpb24oKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcHJvdGVjdGVkXG5cdCAqL1xuXHRwdWJsaWMgcEludmFsaWRhdGVTY2VuZVRyYW5zZm9ybSgpXG5cdHtcblx0XHR0aGlzLl9wU2NlbmVUcmFuc2Zvcm1EaXJ0eSA9ICF0aGlzLl9wSWdub3JlVHJhbnNmb3JtO1xuXHRcdHRoaXMuX2ludmVyc2VTY2VuZVRyYW5zZm9ybURpcnR5ID0gIXRoaXMuX3BJZ25vcmVUcmFuc2Zvcm07XG5cdFx0dGhpcy5fc2NlbmVQb3NpdGlvbkRpcnR5ID0gIXRoaXMuX3BJZ25vcmVUcmFuc2Zvcm07XG5cblx0XHR0aGlzLl93b3JsZEJvdW5kc0ludmFsaWQgPSAhdGhpcy5fcElnbm9yZVRyYW5zZm9ybTtcblxuXHRcdGlmICh0aGlzLmlzRW50aXR5KVxuXHRcdFx0dGhpcy5pbnZhbGlkYXRlUGFydGl0aW9uKCk7XG5cblx0XHRpZiAodGhpcy5fbGlzdGVuVG9TY2VuZVRyYW5zZm9ybUNoYW5nZWQpXG5cdFx0XHR0aGlzLm5vdGlmeVNjZW5lVHJhbnNmb3JtQ2hhbmdlKCk7XG5cdH1cblxuXHQvKipcblx0ICogQHByb3RlY3RlZFxuXHQgKi9cblx0cHVibGljIHBVcGRhdGVCb3VuZHMoKVxuXHR7XG5cdFx0dGhpcy5fd2lkdGggPSB0aGlzLl9wQm91bmRzLmFhYmIud2lkdGgqdGhpcy5fcFNjYWxlWDtcblx0XHR0aGlzLl9oZWlnaHQgPSB0aGlzLl9wQm91bmRzLmFhYmIuaGVpZ2h0KnRoaXMuX3BTY2FsZVk7XG5cdFx0dGhpcy5fZGVwdGggPSB0aGlzLl9wQm91bmRzLmFhYmIuZGVwdGgqdGhpcy5fcFNjYWxlWjtcblxuXHRcdHRoaXMuX3BCb3VuZHNJbnZhbGlkID0gZmFsc2U7XG5cdH1cblxuXHQvKipcblx0ICogQHByb3RlY3RlZFxuXHQgKi9cblx0cHVibGljIF9wVXBkYXRlSW1wbGljaXRNb3VzZUVuYWJsZWQodmFsdWU6Ym9vbGVhbilcblx0e1xuXHRcdHRoaXMuX3BJbXBsaWNpdE1vdXNlRW5hYmxlZCA9IHRoaXMuX2V4cGxpY2l0TW91c2VFbmFibGVkICYmIHZhbHVlO1xuXG5cdFx0Ly8gSWYgdGhlcmUgaXMgYSBwYXJlbnQgYW5kIHRoaXMgY2hpbGQgZG9lcyBub3QgaGF2ZSBhIHBpY2tpbmcgY29sbGlkZXIsIHVzZSBpdHMgcGFyZW50J3MgcGlja2luZyBjb2xsaWRlci5cblx0XHRpZiAodGhpcy5fcEltcGxpY2l0TW91c2VFbmFibGVkICYmIHRoaXMuX3BQYXJlbnQgJiYgIXRoaXMuX3BQaWNraW5nQ29sbGlkZXIpXG5cdFx0XHR0aGlzLl9wUGlja2luZ0NvbGxpZGVyID0gIHRoaXMuX3BQYXJlbnQuX3BQaWNraW5nQ29sbGlkZXI7XG5cdH1cblxuXHQvKipcblx0ICogQHByb3RlY3RlZFxuXHQgKi9cblx0cHVibGljIF9wVXBkYXRlSW1wbGljaXRQYXJ0aXRpb24odmFsdWU6UGFydGl0aW9uKVxuXHR7XG5cdFx0Ly8gYXNzaWduIHBhcmVudCBpbXBsaWNpdCBwYXJ0aXRpb24gaWYgbm8gZXhwbGljaXQgb25lIGlzIGdpdmVuXG5cdFx0dGhpcy5fcEltcGxpY2l0UGFydGl0aW9uID0gdGhpcy5fZXhwbGljaXRQYXJ0aXRpb24gfHwgdmFsdWU7XG5cdH1cblxuXHQvKipcblx0ICogQHByb3RlY3RlZFxuXHQgKi9cblx0cHVibGljIF9wVXBkYXRlSW1wbGljaXRWaXNpYmlsaXR5KHZhbHVlOmJvb2xlYW4pXG5cdHtcblx0XHR0aGlzLl9wSW1wbGljaXRWaXNpYmlsaXR5ID0gdGhpcy5fZXhwbGljaXRWaXNpYmlsaXR5ICYmIHZhbHVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwcm90ZWN0ZWRcblx0ICovXG5cdHB1YmxpYyBfcFVwZGF0ZU1hdHJpeDNEKClcblx0e1xuXG5cdFx0dGhpcy5fcG9zLnggPSB0aGlzLl94O1xuXHRcdHRoaXMuX3Bvcy55ID0gdGhpcy5feTtcblx0XHR0aGlzLl9wb3MueiA9IHRoaXMuX3o7XG5cblx0XHR0aGlzLl9yb3QueCA9IHRoaXMuX3JvdGF0aW9uWDtcblx0XHR0aGlzLl9yb3QueSA9IHRoaXMuX3JvdGF0aW9uWTtcblx0XHR0aGlzLl9yb3QueiA9IHRoaXMuX3JvdGF0aW9uWjtcblxuXHRcdHRoaXMuX3NjYS54ID0gdGhpcy5fcFNjYWxlWDtcblx0XHR0aGlzLl9zY2EueSA9IHRoaXMuX3BTY2FsZVk7XG5cdFx0dGhpcy5fc2NhLnogPSB0aGlzLl9wU2NhbGVaO1xuXG5cdFx0dGhpcy5fbWF0cml4M0QucmVjb21wb3NlKHRoaXMuX3RyYW5zZm9ybUNvbXBvbmVudHMpO1xuXG5cdFx0aWYgKCF0aGlzLl9waXZvdFplcm8pIHtcblx0XHRcdHRoaXMuX21hdHJpeDNELnByZXBlbmRUcmFuc2xhdGlvbigtdGhpcy5fcGl2b3QueC90aGlzLl9wU2NhbGVYLCAtdGhpcy5fcGl2b3QueS90aGlzLl9wU2NhbGVZLCAtdGhpcy5fcGl2b3Quei90aGlzLl9wU2NhbGVaKTtcblx0XHRcdGlmICh0aGlzLmFsaWdubWVudE1vZGUgIT0gQWxpZ25tZW50TW9kZS5QSVZPVF9QT0lOVClcblx0XHRcdFx0dGhpcy5fbWF0cml4M0QuYXBwZW5kVHJhbnNsYXRpb24odGhpcy5fcGl2b3QueCwgdGhpcy5fcGl2b3QueSwgdGhpcy5fcGl2b3Queik7XG5cdFx0fVxuXG5cdFx0dGhpcy5fbWF0cml4M0REaXJ0eSA9IGZhbHNlO1xuXHRcdHRoaXMuX3Bvc2l0aW9uRGlydHkgPSBmYWxzZTtcblx0XHR0aGlzLl9yb3RhdGlvbkRpcnR5ID0gZmFsc2U7XG5cdFx0dGhpcy5fc2NhbGVEaXJ0eSA9IGZhbHNlO1xuXHRcdHRoaXMuX3Bpdm90RGlydHkgPSBmYWxzZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcHJvdGVjdGVkXG5cdCAqL1xuXHRwdWJsaWMgcFVwZGF0ZVNjZW5lVHJhbnNmb3JtKClcblx0e1xuXHRcdGlmICh0aGlzLl9wUGFyZW50ICYmICF0aGlzLl9wUGFyZW50Ll9pSXNSb290KSB7XG5cdFx0XHR0aGlzLl9wU2NlbmVUcmFuc2Zvcm0uY29weUZyb20odGhpcy5fcFBhcmVudC5zY2VuZVRyYW5zZm9ybSk7XG5cdFx0XHR0aGlzLl9wU2NlbmVUcmFuc2Zvcm0ucHJlcGVuZCh0aGlzLl9pTWF0cml4M0QpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9wU2NlbmVUcmFuc2Zvcm0uY29weUZyb20odGhpcy5faU1hdHJpeDNEKTtcblx0XHR9XG5cblx0XHR0aGlzLl9wU2NlbmVUcmFuc2Zvcm1EaXJ0eSA9IGZhbHNlO1xuXHR9XG5cblx0cHVibGljIF9pQWRkUmVuZGVyYWJsZShyZW5kZXJhYmxlOklSZW5kZXJhYmxlKTpJUmVuZGVyYWJsZVxuXHR7XG5cdFx0dGhpcy5fcFJlbmRlcmFibGVzLnB1c2gocmVuZGVyYWJsZSk7XG5cblx0XHRyZXR1cm4gcmVuZGVyYWJsZTtcblx0fVxuXG5cblx0cHVibGljIF9pUmVtb3ZlUmVuZGVyYWJsZShyZW5kZXJhYmxlOklSZW5kZXJhYmxlKTpJUmVuZGVyYWJsZVxuXHR7XG5cdFx0dmFyIGluZGV4Om51bWJlciA9IHRoaXMuX3BSZW5kZXJhYmxlcy5pbmRleE9mKHJlbmRlcmFibGUpO1xuXG5cdFx0dGhpcy5fcFJlbmRlcmFibGVzLnNwbGljZShpbmRleCwgMSk7XG5cblx0XHRyZXR1cm4gcmVuZGVyYWJsZTtcblx0fVxuXG5cdC8qKlxuXHQgKiAvL1RPRE9cblx0ICpcblx0ICogQHBhcmFtIHNob3J0ZXN0Q29sbGlzaW9uRGlzdGFuY2Vcblx0ICogQHBhcmFtIGZpbmRDbG9zZXN0XG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxuXHQgKlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHB1YmxpYyBfaVRlc3RDb2xsaXNpb24oc2hvcnRlc3RDb2xsaXNpb25EaXN0YW5jZTpudW1iZXIsIGZpbmRDbG9zZXN0OmJvb2xlYW4pOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIF9pSW50ZXJuYWxVcGRhdGUoKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2lDb250cm9sbGVyKVxuXHRcdFx0dGhpcy5faUNvbnRyb2xsZXIudXBkYXRlKCk7XG5cdH1cblxuXHQvKipcblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwdWJsaWMgX2lJc1Zpc2libGUoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcEltcGxpY2l0VmlzaWJpbGl0eTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHB1YmxpYyBfaUlzTW91c2VFbmFibGVkKCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BJbXBsaWNpdE1vdXNlRW5hYmxlZDtcblx0fVxuXG5cdC8qKlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHB1YmxpYyBfaVNldFNjZW5lKHZhbHVlOlNjZW5lKVxuXHR7XG5cdFx0Ly8gdGVzdCB0byBzZWUgaWYgd2UncmUgc3dpdGNoaW5nIHJvb3RzIHdoaWxlIHdlJ3JlIGFscmVhZHkgdXNpbmcgYSBzY2VuZSBwYXJ0aXRpb25cblx0XHQvKlxuXHRcdGlmICh2YWx1ZSA9PSBudWxsKVxuXHRcdFx0dGhpcy5fb2xkU2NlbmUgPSB0aGlzLl9wU2NlbmU7XG5cblx0XHRpZiAodGhpcy5fZXhwbGljaXRQYXJ0aXRpb24gJiYgdGhpcy5fb2xkU2NlbmUgJiYgdGhpcy5fb2xkU2NlbmUgIT0gdGhpcy5fcFNjZW5lKVxuXHRcdFx0dGhpcy5wYXJ0aXRpb24gPSBudWxsO1xuXG5cdFx0aWYgKHZhbHVlKVxuXHRcdFx0dGhpcy5fb2xkU2NlbmUgPSBudWxsO1xuXG5cdFx0Ly8gZW5kIG9mIHN0dXBpZCBwYXJ0aXRpb24gdGVzdCBjb2RlXG5cdFx0Ly8qL1xuXG5cdFx0aWYgKHRoaXMuX3BTY2VuZSA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3BVcGRhdGVTY2VuZSh2YWx1ZSk7XG5cblx0XHRpZiAoIXRoaXMuX3BTY2VuZVRyYW5zZm9ybURpcnR5ICYmICF0aGlzLl9wSWdub3JlVHJhbnNmb3JtKVxuXHRcdFx0dGhpcy5wSW52YWxpZGF0ZVNjZW5lVHJhbnNmb3JtKCk7XG5cdH1cblxuXHQvKipcblx0ICogQHByb3RlY3RlZFxuXHQgKi9cblx0cHVibGljIF9wVXBkYXRlU2NlbmUodmFsdWU6U2NlbmUpXG5cdHtcblx0XHRpZiAodGhpcy5fcFNjZW5lKSB7XG5cdFx0XHR0aGlzLl9wU2NlbmUuZGlzcGF0Y2hFdmVudChuZXcgU2NlbmVFdmVudChTY2VuZUV2ZW50LlJFTU9WRURfRlJPTV9TQ0VORSwgdGhpcykpO1xuXG5cdFx0XHQvL3VucmVnaXN0ZXIgZW50aXR5IGZyb20gY3VycmVudCBzY2VuZVxuXHRcdFx0dGhpcy5fcFNjZW5lLmlVbnJlZ2lzdGVyRW50aXR5KHRoaXMpO1xuXHRcdH1cblxuXHRcdHRoaXMuX3BTY2VuZSA9IHZhbHVlO1xuXG5cdFx0aWYgKHZhbHVlKSB7XG5cdFx0XHR2YWx1ZS5kaXNwYXRjaEV2ZW50KG5ldyBTY2VuZUV2ZW50KFNjZW5lRXZlbnQuQURERURfVE9fU0NFTkUsIHRoaXMpKTtcblxuXHRcdFx0Ly9yZWdpc3RlciBlbnRpdHkgd2l0aCBuZXcgc2NlbmVcblx0XHRcdHZhbHVlLmlSZWdpc3RlckVudGl0eSh0aGlzKTtcblx0XHR9XG5cblx0XHR0aGlzLm5vdGlmeVNjZW5lQ2hhbmdlKCk7XG5cdH1cblxuXHQvKipcblx0ICogQHByaXZhdGVcblx0ICovXG5cdHByaXZhdGUgbm90aWZ5UG9zaXRpb25DaGFuZ2VkKClcblx0e1xuXHRcdGlmICghdGhpcy5fcG9zaXRpb25DaGFuZ2VkKVxuXHRcdFx0dGhpcy5fcG9zaXRpb25DaGFuZ2VkID0gbmV3IERpc3BsYXlPYmplY3RFdmVudChEaXNwbGF5T2JqZWN0RXZlbnQuUE9TSVRJT05fQ0hBTkdFRCwgdGhpcyk7XG5cblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQodGhpcy5fcG9zaXRpb25DaGFuZ2VkKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0cHJpdmF0ZSBub3RpZnlSb3RhdGlvbkNoYW5nZWQoKVxuXHR7XG5cdFx0aWYgKCF0aGlzLl9yb3RhdGlvbkNoYW5nZWQpXG5cdFx0XHR0aGlzLl9yb3RhdGlvbkNoYW5nZWQgPSBuZXcgRGlzcGxheU9iamVjdEV2ZW50KERpc3BsYXlPYmplY3RFdmVudC5ST1RBVElPTl9DSEFOR0VELCB0aGlzKTtcblxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCh0aGlzLl9yb3RhdGlvbkNoYW5nZWQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRwcml2YXRlIG5vdGlmeVNjYWxlQ2hhbmdlZCgpXG5cdHtcblx0XHRpZiAoIXRoaXMuX3NjYWxlQ2hhbmdlZClcblx0XHRcdHRoaXMuX3NjYWxlQ2hhbmdlZCA9IG5ldyBEaXNwbGF5T2JqZWN0RXZlbnQoRGlzcGxheU9iamVjdEV2ZW50LlNDQUxFX0NIQU5HRUQsIHRoaXMpO1xuXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KHRoaXMuX3NjYWxlQ2hhbmdlZCk7XG5cdH1cblxuXHQvKipcblx0ICogQHByaXZhdGVcblx0ICovXG5cdHByaXZhdGUgbm90aWZ5U2NlbmVDaGFuZ2UoKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2xpc3RlblRvU2NlbmVDaGFuZ2VkKSB7XG5cdFx0XHRpZiAoIXRoaXMuX3NjZW5lY2hhbmdlZClcblx0XHRcdFx0dGhpcy5fc2NlbmVjaGFuZ2VkID0gbmV3IERpc3BsYXlPYmplY3RFdmVudChEaXNwbGF5T2JqZWN0RXZlbnQuU0NFTkVfQ0hBTkdFRCwgdGhpcyk7XG5cblx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudCh0aGlzLl9zY2VuZWNoYW5nZWQpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0cHJpdmF0ZSBub3RpZnlTY2VuZVRyYW5zZm9ybUNoYW5nZSgpXG5cdHtcblx0XHRpZiAoIXRoaXMuX3NjZW5lVHJhbnNmb3JtQ2hhbmdlZClcblx0XHRcdHRoaXMuX3NjZW5lVHJhbnNmb3JtQ2hhbmdlZCA9IG5ldyBEaXNwbGF5T2JqZWN0RXZlbnQoRGlzcGxheU9iamVjdEV2ZW50LlNDRU5FVFJBTlNGT1JNX0NIQU5HRUQsIHRoaXMpO1xuXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KHRoaXMuX3NjZW5lVHJhbnNmb3JtQ2hhbmdlZCk7XG5cdH1cblxuXHQvKipcblx0ICogSW52YWxpZGF0ZXMgdGhlIDNEIHRyYW5zZm9ybWF0aW9uIG1hdHJpeCwgY2F1c2luZyBpdCB0byBiZSB1cGRhdGVkIHVwb24gdGhlIG5leHQgcmVxdWVzdFxuXHQgKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0cHJpdmF0ZSBpbnZhbGlkYXRlTWF0cml4M0QoKTp2b2lkXG5cdHtcblx0XHRpZiAodGhpcy5fbWF0cml4M0REaXJ0eSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX21hdHJpeDNERGlydHkgPSB0cnVlO1xuXG5cdFx0aWYgKCF0aGlzLl9wU2NlbmVUcmFuc2Zvcm1EaXJ0eSAmJiAhdGhpcy5fcElnbm9yZVRyYW5zZm9ybSlcblx0XHRcdHRoaXMucEludmFsaWRhdGVTY2VuZVRyYW5zZm9ybSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRwcml2YXRlIGludmFsaWRhdGVQYXJ0aXRpb24oKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2lBc3NpZ25lZFBhcnRpdGlvbilcblx0XHRcdHRoaXMuX2lBc3NpZ25lZFBhcnRpdGlvbi5pTWFya0ZvclVwZGF0ZSh0aGlzKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0cHJpdmF0ZSBpbnZhbGlkYXRlUGl2b3QoKVxuXHR7XG5cdFx0dGhpcy5fcGl2b3RaZXJvID0gKHRoaXMuX3Bpdm90LnggPT0gMCkgJiYgKHRoaXMuX3Bpdm90LnkgPT0gMCkgJiYgKHRoaXMuX3Bpdm90LnogPT0gMCk7XG5cblx0XHRpZiAodGhpcy5fcGl2b3REaXJ0eSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3Bpdm90RGlydHkgPSB0cnVlO1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlTWF0cml4M0QoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0cHJpdmF0ZSBpbnZhbGlkYXRlUG9zaXRpb24oKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3Bvc2l0aW9uRGlydHkpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9wb3NpdGlvbkRpcnR5ID0gdHJ1ZTtcblxuXHRcdHRoaXMuaW52YWxpZGF0ZU1hdHJpeDNEKCk7XG5cblx0XHRpZiAodGhpcy5fbGlzdGVuVG9Qb3NpdGlvbkNoYW5nZWQpXG5cdFx0XHR0aGlzLm5vdGlmeVBvc2l0aW9uQ2hhbmdlZCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRwcml2YXRlIGludmFsaWRhdGVSb3RhdGlvbigpXG5cdHtcblx0XHRpZiAodGhpcy5fcm90YXRpb25EaXJ0eSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3JvdGF0aW9uRGlydHkgPSB0cnVlO1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlTWF0cml4M0QoKTtcblxuXHRcdGlmICh0aGlzLl9saXN0ZW5Ub1JvdGF0aW9uQ2hhbmdlZClcblx0XHRcdHRoaXMubm90aWZ5Um90YXRpb25DaGFuZ2VkKCk7XG5cdH1cblxuXHQvKipcblx0ICogQHByaXZhdGVcblx0ICovXG5cdHByaXZhdGUgaW52YWxpZGF0ZVNjYWxlKClcblx0e1xuXHRcdGlmICh0aGlzLl9zY2FsZURpcnR5KVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fc2NhbGVEaXJ0eSA9IHRydWU7XG5cblx0XHR0aGlzLmludmFsaWRhdGVNYXRyaXgzRCgpO1xuXG5cdFx0aWYgKHRoaXMuX2xpc3RlblRvU2NhbGVDaGFuZ2VkKVxuXHRcdFx0dGhpcy5ub3RpZnlTY2FsZUNoYW5nZWQoKTtcblx0fVxufVxuXG5leHBvcnQgPSBEaXNwbGF5T2JqZWN0OyJdfQ==