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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0Rpc3BsYXlPYmplY3QudHMiXSwibmFtZXMiOlsiRGlzcGxheU9iamVjdCIsIkRpc3BsYXlPYmplY3QuY29uc3RydWN0b3IiLCJEaXNwbGF5T2JqZWN0LmJvdW5kcyIsIkRpc3BsYXlPYmplY3QuZGVwdGgiLCJEaXNwbGF5T2JqZWN0LmV1bGVycyIsIkRpc3BsYXlPYmplY3QuaGVpZ2h0IiwiRGlzcGxheU9iamVjdC5pbmRleCIsIkRpc3BsYXlPYmplY3QuaW52ZXJzZVNjZW5lVHJhbnNmb3JtIiwiRGlzcGxheU9iamVjdC5pZ25vcmVUcmFuc2Zvcm0iLCJEaXNwbGF5T2JqZWN0LmlzRW50aXR5IiwiRGlzcGxheU9iamVjdC5sb2FkZXJJbmZvIiwiRGlzcGxheU9iamVjdC5tb3VzZUVuYWJsZWQiLCJEaXNwbGF5T2JqZWN0Lm1vdXNlWCIsIkRpc3BsYXlPYmplY3QubW91c2VZIiwiRGlzcGxheU9iamVjdC5wYXJlbnQiLCJEaXNwbGF5T2JqZWN0LnBhcnRpdGlvbiIsIkRpc3BsYXlPYmplY3QucGFydGl0aW9uTm9kZSIsIkRpc3BsYXlPYmplY3QucGlja2luZ0NvbGxpZGVyIiwiRGlzcGxheU9iamVjdC5waXZvdCIsIkRpc3BsYXlPYmplY3Qucm9vdCIsIkRpc3BsYXlPYmplY3Qucm90YXRpb25YIiwiRGlzcGxheU9iamVjdC5yb3RhdGlvblkiLCJEaXNwbGF5T2JqZWN0LnJvdGF0aW9uWiIsIkRpc3BsYXlPYmplY3Quc2NhbGVYIiwiRGlzcGxheU9iamVjdC5zY2FsZVkiLCJEaXNwbGF5T2JqZWN0LnNjYWxlWiIsIkRpc3BsYXlPYmplY3Quc2NlbmUiLCJEaXNwbGF5T2JqZWN0LnNjZW5lUG9zaXRpb24iLCJEaXNwbGF5T2JqZWN0LnNjZW5lVHJhbnNmb3JtIiwiRGlzcGxheU9iamVjdC5zaGFkZXJQaWNraW5nRGV0YWlscyIsIkRpc3BsYXlPYmplY3QuYm91bmRzVmlzaWJsZSIsIkRpc3BsYXlPYmplY3QudHJhbnNmb3JtIiwiRGlzcGxheU9iamVjdC52aXNpYmxlIiwiRGlzcGxheU9iamVjdC53aWR0aCIsIkRpc3BsYXlPYmplY3Qud29ybGRCb3VuZHMiLCJEaXNwbGF5T2JqZWN0LngiLCJEaXNwbGF5T2JqZWN0LnkiLCJEaXNwbGF5T2JqZWN0LnoiLCJEaXNwbGF5T2JqZWN0LnpPZmZzZXQiLCJEaXNwbGF5T2JqZWN0LmFkZEV2ZW50TGlzdGVuZXIiLCJEaXNwbGF5T2JqZWN0LmNsb25lIiwiRGlzcGxheU9iamVjdC5kaXNwb3NlIiwiRGlzcGxheU9iamVjdC5kaXNwb3NlQXNzZXQiLCJEaXNwbGF5T2JqZWN0LmdldEJvdW5kcyIsIkRpc3BsYXlPYmplY3QuZ2V0UmVjdCIsIkRpc3BsYXlPYmplY3QuZ2xvYmFsVG9Mb2NhbCIsIkRpc3BsYXlPYmplY3QuZ2xvYmFsVG9Mb2NhbDNEIiwiRGlzcGxheU9iamVjdC5oaXRUZXN0T2JqZWN0IiwiRGlzcGxheU9iamVjdC5oaXRUZXN0UG9pbnQiLCJEaXNwbGF5T2JqZWN0LmlzSW50ZXJzZWN0aW5nUmF5IiwiRGlzcGxheU9iamVjdC5sb29rQXQiLCJEaXNwbGF5T2JqZWN0LmxvY2FsVG9HbG9iYWwiLCJEaXNwbGF5T2JqZWN0LmxvY2FsVG9HbG9iYWwzRCIsIkRpc3BsYXlPYmplY3QubW92ZVRvIiwiRGlzcGxheU9iamVjdC5tb3ZlUGl2b3QiLCJEaXNwbGF5T2JqZWN0LnBpdGNoIiwiRGlzcGxheU9iamVjdC5nZXRSZW5kZXJTY2VuZVRyYW5zZm9ybSIsIkRpc3BsYXlPYmplY3Qucm9sbCIsIkRpc3BsYXlPYmplY3Qucm90YXRlIiwiRGlzcGxheU9iamVjdC5yb3RhdGVUbyIsIkRpc3BsYXlPYmplY3QucmVtb3ZlRXZlbnRMaXN0ZW5lciIsIkRpc3BsYXlPYmplY3QudHJhbnNsYXRlIiwiRGlzcGxheU9iamVjdC50cmFuc2xhdGVMb2NhbCIsIkRpc3BsYXlPYmplY3QueWF3IiwiRGlzcGxheU9iamVjdC5faUFzc2lnbmVkUGFydGl0aW9uIiwiRGlzcGxheU9iamVjdC5faU1hdHJpeDNEIiwiRGlzcGxheU9iamVjdC5faVBpY2tpbmdDb2xsaXNpb25WTyIsIkRpc3BsYXlPYmplY3QuaVNldFBhcmVudCIsIkRpc3BsYXlPYmplY3QucENyZWF0ZURlZmF1bHRCb3VuZGluZ1ZvbHVtZSIsIkRpc3BsYXlPYmplY3QucENyZWF0ZUVudGl0eVBhcnRpdGlvbk5vZGUiLCJEaXNwbGF5T2JqZWN0LnBJbnZhbGlkYXRlQm91bmRzIiwiRGlzcGxheU9iamVjdC5wSW52YWxpZGF0ZVNjZW5lVHJhbnNmb3JtIiwiRGlzcGxheU9iamVjdC5wVXBkYXRlQm91bmRzIiwiRGlzcGxheU9iamVjdC5fcFVwZGF0ZUltcGxpY2l0TW91c2VFbmFibGVkIiwiRGlzcGxheU9iamVjdC5fcFVwZGF0ZUltcGxpY2l0UGFydGl0aW9uIiwiRGlzcGxheU9iamVjdC5fcFVwZGF0ZUltcGxpY2l0VmlzaWJpbGl0eSIsIkRpc3BsYXlPYmplY3QuX3BVcGRhdGVNYXRyaXgzRCIsIkRpc3BsYXlPYmplY3QucFVwZGF0ZVNjZW5lVHJhbnNmb3JtIiwiRGlzcGxheU9iamVjdC5faUFkZFJlbmRlcmFibGUiLCJEaXNwbGF5T2JqZWN0Ll9pUmVtb3ZlUmVuZGVyYWJsZSIsIkRpc3BsYXlPYmplY3QuX2lUZXN0Q29sbGlzaW9uIiwiRGlzcGxheU9iamVjdC5faUludGVybmFsVXBkYXRlIiwiRGlzcGxheU9iamVjdC5faUlzVmlzaWJsZSIsIkRpc3BsYXlPYmplY3QuX2lJc01vdXNlRW5hYmxlZCIsIkRpc3BsYXlPYmplY3QuX2lTZXRTY2VuZSIsIkRpc3BsYXlPYmplY3QuX3BVcGRhdGVTY2VuZSIsIkRpc3BsYXlPYmplY3Qubm90aWZ5UG9zaXRpb25DaGFuZ2VkIiwiRGlzcGxheU9iamVjdC5ub3RpZnlSb3RhdGlvbkNoYW5nZWQiLCJEaXNwbGF5T2JqZWN0Lm5vdGlmeVNjYWxlQ2hhbmdlZCIsIkRpc3BsYXlPYmplY3Qubm90aWZ5U2NlbmVDaGFuZ2UiLCJEaXNwbGF5T2JqZWN0Lm5vdGlmeVNjZW5lVHJhbnNmb3JtQ2hhbmdlIiwiRGlzcGxheU9iamVjdC5pbnZhbGlkYXRlTWF0cml4M0QiLCJEaXNwbGF5T2JqZWN0LmludmFsaWRhdGVQYXJ0aXRpb24iLCJEaXNwbGF5T2JqZWN0LmludmFsaWRhdGVQaXZvdCIsIkRpc3BsYXlPYmplY3QuaW52YWxpZGF0ZVBvc2l0aW9uIiwiRGlzcGxheU9iamVjdC5pbnZhbGlkYXRlUm90YXRpb24iLCJEaXNwbGF5T2JqZWN0LmludmFsaWRhdGVTY2FsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTyxzQkFBc0IsV0FBVywrQ0FBK0MsQ0FBQyxDQUFDO0FBRXpGLElBQU8sVUFBVSxXQUFjLGlDQUFpQyxDQUFDLENBQUM7QUFDbEUsSUFBTyxRQUFRLFdBQWUsK0JBQStCLENBQUMsQ0FBQztBQUMvRCxJQUFPLGFBQWEsV0FBYSxvQ0FBb0MsQ0FBQyxDQUFDO0FBQ3ZFLElBQU8sS0FBSyxXQUFlLDRCQUE0QixDQUFDLENBQUM7QUFFekQsSUFBTyxRQUFRLFdBQWUsK0JBQStCLENBQUMsQ0FBQztBQUMvRCxJQUFPLGNBQWMsV0FBYSx3Q0FBd0MsQ0FBQyxDQUFDO0FBQzVFLElBQU8sbUJBQW1CLFdBQVksNENBQTRDLENBQUMsQ0FBQztBQUtwRixJQUFPLGFBQWEsV0FBYSx1Q0FBdUMsQ0FBQyxDQUFDO0FBRzFFLElBQU8sZUFBZSxXQUFhLHlDQUF5QyxDQUFDLENBQUM7QUFFOUUsSUFBTyxTQUFTLFdBQWMsbUNBQW1DLENBQUMsQ0FBQztBQUluRSxJQUFPLGtCQUFrQixXQUFZLDRDQUE0QyxDQUFDLENBQUM7QUFHbkYsSUFBTyxrQkFBa0IsV0FBWSw4Q0FBOEMsQ0FBQyxDQUFDO0FBQ3JGLElBQU8sVUFBVSxXQUFjLHNDQUFzQyxDQUFDLENBQUM7QUFHdkUsQUFpSUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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QUFDQTtRQUVsQ0EsR0FBR0EsR0FBR0EsYUFBYUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQTtRQUV2Q0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDakJBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBO1FBQ2pCQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNqQkEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7UUFFWEEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDakJBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBO1FBQ2pCQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNqQkEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7UUFFWEEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDakJBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBO1FBQ2pCQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNsQkEsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7UUFFWkEsSUFBSUEsQ0FBQ0EsR0FBWUEsSUFBSUEsUUFBUUEsRUFBRUEsQ0FBQ0E7UUFDaENBLENBQUNBLENBQUNBLGVBQWVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1FBRXZCQSxJQUFJQSxHQUFHQSxHQUFZQSxDQUFDQSxDQUFDQSxTQUFTQSxFQUFFQSxDQUFDQSxDQUFD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S0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7WUFDeEJBLEtBQUtBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBO1lBQ3hCQSxLQUFLQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQTtZQUN4QkEsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxTQUFTQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtZQUV6Q0EsQUFDQUEsc0JBRHNCQTtZQUN0QkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsSUFBSUEsSUFBSUEsQ0FBQ0EsYUFBYUEsSUFBSUEsYUFBYUEsQ0FBQ0EsV0FBV0EsQ0FBQ0E7Z0JBQ3ZFQSxJQUFJQSxDQUFDQSxrQkFBa0JBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsRUFBRUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsRUFBRUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7WUFFdElBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLGtCQUFrQkEsQ0FBQ0E7UUFDaENBLENBQUNBO1FBRURBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLGNBQWNBLENBQUNBO0lBQzVCQSxDQUFDQTtJQUVEeEQ7Ozs7T0FJR0E7SUFDSUEsNEJBQUlBLEdBQVhBLFVBQVlBLEtBQVlBO1FBRXZCeUQsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsTUFBTUEsRUFBRUEsS0FBS0EsQ0FBQ0EsQ0FBQ0E7SUFDckNBLENBQUNBO0lBRUR6RDs7Ozs7T0FLR0E7SUFDSUEsOEJBQU1BLEdBQWJBLFVBQWNBLElBQWFBLEVBQUVBLEtBQVlB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LEVBQUVBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO2dCQUVoQkEsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxFQUFFQSxDQUFDQTtZQUMzQkEsQ0FBQ0E7WUFFREEsR0FBR0EsR0FBR0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFFbEJBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLFVBQVVBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLFVBQVVBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUN0RkEsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3hCQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDeEJBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO2dCQUV4QkEsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxFQUFFQSxDQUFDQTtZQUMzQkEsQ0FBQ0E7WUFFREEsR0FBR0EsR0FBR0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFFbEJBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLFFBQVFBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLFFBQVFBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUNoRkEsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3RCQSxJQUFJQSxDQUFDQSxRQUFRQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDdEJBLElBQUlBLENBQUNB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QUFjLEVBa3JFekM7QUFFRCxBQUF1QixpQkFBZCxhQUFhLENBQUMiLCJmaWxlIjoiYmFzZS9EaXNwbGF5T2JqZWN0LmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBeGlzQWxpZ25lZEJvdW5kaW5nQm94XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvYm91bmRzL0F4aXNBbGlnbmVkQm91bmRpbmdCb3hcIik7XHJcbmltcG9ydCBCb3VuZGluZ1ZvbHVtZUJhc2VcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2JvdW5kcy9Cb3VuZGluZ1ZvbHVtZUJhc2VcIik7XHJcbmltcG9ydCBNYXRoQ29uc3RzXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9NYXRoQ29uc3RzXCIpO1xyXG5pbXBvcnQgTWF0cml4M0RcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vTWF0cml4M0RcIik7XHJcbmltcG9ydCBNYXRyaXgzRFV0aWxzXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vTWF0cml4M0RVdGlsc1wiKTtcclxuaW1wb3J0IFBvaW50XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1BvaW50XCIpO1xyXG5pbXBvcnQgUmVjdGFuZ2xlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9SZWN0YW5nbGVcIik7XHJcbmltcG9ydCBWZWN0b3IzRFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9WZWN0b3IzRFwiKTtcclxuaW1wb3J0IE5hbWVkQXNzZXRCYXNlXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2xpYnJhcnkvTmFtZWRBc3NldEJhc2VcIik7XHJcbmltcG9ydCBBYnN0cmFjdE1ldGhvZEVycm9yXHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9lcnJvcnMvQWJzdHJhY3RNZXRob2RFcnJvclwiKTtcclxuXHJcbmltcG9ydCBEaXNwbGF5T2JqZWN0Q29udGFpbmVyXHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvY29udGFpbmVycy9EaXNwbGF5T2JqZWN0Q29udGFpbmVyXCIpO1xyXG5pbXBvcnQgU2NlbmVcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2NvbnRhaW5lcnMvU2NlbmVcIik7XHJcbmltcG9ydCBDb250cm9sbGVyQmFzZVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9jb250cm9sbGVycy9Db250cm9sbGVyQmFzZVwiKTtcclxuaW1wb3J0IEFsaWdubWVudE1vZGVcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9BbGlnbm1lbnRNb2RlXCIpO1xyXG5pbXBvcnQgQmxlbmRNb2RlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9CbGVuZE1vZGVcIik7XHJcbmltcG9ydCBMb2FkZXJJbmZvXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9Mb2FkZXJJbmZvXCIpO1xyXG5pbXBvcnQgT3JpZW50YXRpb25Nb2RlXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvT3JpZW50YXRpb25Nb2RlXCIpO1xyXG5pbXBvcnQgSUJpdG1hcERyYXdhYmxlXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvSUJpdG1hcERyYXdhYmxlXCIpO1xyXG5pbXBvcnQgVHJhbnNmb3JtXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9UcmFuc2Zvcm1cIik7XHJcbmltcG9ydCBFbnRpdHlOb2RlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcGFydGl0aW9uL0VudGl0eU5vZGVcIik7XHJcbmltcG9ydCBQYXJ0aXRpb25cdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vUGFydGl0aW9uXCIpO1xyXG5pbXBvcnQgSVBpY2tpbmdDb2xsaWRlclx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9waWNrL0lQaWNraW5nQ29sbGlkZXJcIik7XHJcbmltcG9ydCBQaWNraW5nQ29sbGlzaW9uVk9cdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3BpY2svUGlja2luZ0NvbGxpc2lvblZPXCIpO1xyXG5pbXBvcnQgSVJlbmRlcmFibGVcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wb29sL0lSZW5kZXJhYmxlXCIpO1xyXG5pbXBvcnQgQ2FtZXJhXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9DYW1lcmFcIik7XHJcbmltcG9ydCBEaXNwbGF5T2JqZWN0RXZlbnRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2V2ZW50cy9EaXNwbGF5T2JqZWN0RXZlbnRcIik7XHJcbmltcG9ydCBTY2VuZUV2ZW50XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZXZlbnRzL1NjZW5lRXZlbnRcIik7XHJcbmltcG9ydCBQcmVmYWJCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcHJlZmFicy9QcmVmYWJCYXNlXCIpO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBEaXNwbGF5T2JqZWN0IGNsYXNzIGlzIHRoZSBiYXNlIGNsYXNzIGZvciBhbGwgb2JqZWN0cyB0aGF0IGNhbiBiZVxyXG4gKiBwbGFjZWQgb24gdGhlIGRpc3BsYXkgbGlzdC4gVGhlIGRpc3BsYXkgbGlzdCBtYW5hZ2VzIGFsbCBvYmplY3RzIGRpc3BsYXllZFxyXG4gKiBpbiBmbGFzaC4gVXNlIHRoZSBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIGNsYXNzIHRvIGFycmFuZ2UgdGhlXHJcbiAqIGRpc3BsYXkgb2JqZWN0cyBpbiB0aGUgZGlzcGxheSBsaXN0LiBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIG9iamVjdHMgY2FuXHJcbiAqIGhhdmUgY2hpbGQgZGlzcGxheSBvYmplY3RzLCB3aGlsZSBvdGhlciBkaXNwbGF5IG9iamVjdHMsIHN1Y2ggYXMgU2hhcGUgYW5kXHJcbiAqIFRleHRGaWVsZCBvYmplY3RzLCBhcmUgXCJsZWFmXCIgbm9kZXMgdGhhdCBoYXZlIG9ubHkgcGFyZW50cyBhbmQgc2libGluZ3MsIG5vXHJcbiAqIGNoaWxkcmVuLlxyXG4gKlxyXG4gKiA8cD5UaGUgRGlzcGxheU9iamVjdCBjbGFzcyBzdXBwb3J0cyBiYXNpYyBmdW5jdGlvbmFsaXR5IGxpa2UgdGhlIDxpPng8L2k+XHJcbiAqIGFuZCA8aT55PC9pPiBwb3NpdGlvbiBvZiBhbiBvYmplY3QsIGFzIHdlbGwgYXMgbW9yZSBhZHZhbmNlZCBwcm9wZXJ0aWVzIG9mXHJcbiAqIHRoZSBvYmplY3Qgc3VjaCBhcyBpdHMgdHJhbnNmb3JtYXRpb24gbWF0cml4LiA8L3A+XHJcbiAqXHJcbiAqIDxwPkRpc3BsYXlPYmplY3QgaXMgYW4gYWJzdHJhY3QgYmFzZSBjbGFzczsgdGhlcmVmb3JlLCB5b3UgY2Fubm90IGNhbGxcclxuICogRGlzcGxheU9iamVjdCBkaXJlY3RseS4gSW52b2tpbmcgPGNvZGU+bmV3IERpc3BsYXlPYmplY3QoKTwvY29kZT4gdGhyb3dzIGFuXHJcbiAqIDxjb2RlPkFyZ3VtZW50RXJyb3I8L2NvZGU+IGV4Y2VwdGlvbi4gPC9wPlxyXG4gKlxyXG4gKiA8cD5BbGwgZGlzcGxheSBvYmplY3RzIGluaGVyaXQgZnJvbSB0aGUgRGlzcGxheU9iamVjdCBjbGFzcy48L3A+XHJcbiAqXHJcbiAqIDxwPlRoZSBEaXNwbGF5T2JqZWN0IGNsYXNzIGl0c2VsZiBkb2VzIG5vdCBpbmNsdWRlIGFueSBBUElzIGZvciByZW5kZXJpbmdcclxuICogY29udGVudCBvbnNjcmVlbi4gRm9yIHRoYXQgcmVhc29uLCBpZiB5b3Ugd2FudCBjcmVhdGUgYSBjdXN0b20gc3ViY2xhc3Mgb2ZcclxuICogdGhlIERpc3BsYXlPYmplY3QgY2xhc3MsIHlvdSB3aWxsIHdhbnQgdG8gZXh0ZW5kIG9uZSBvZiBpdHMgc3ViY2xhc3NlcyB0aGF0XHJcbiAqIGRvIGhhdmUgQVBJcyBmb3IgcmVuZGVyaW5nIGNvbnRlbnQgb25zY3JlZW4sIHN1Y2ggYXMgdGhlIFNoYXBlLCBTcHJpdGUsXHJcbiAqIEJpdG1hcCwgU2ltcGxlQnV0dG9uLCBUZXh0RmllbGQsIG9yIE1vdmllQ2xpcCBjbGFzcy48L3A+XHJcbiAqXHJcbiAqIDxwPlRoZSBEaXNwbGF5T2JqZWN0IGNsYXNzIGNvbnRhaW5zIHNldmVyYWwgYnJvYWRjYXN0IGV2ZW50cy4gTm9ybWFsbHksIHRoZVxyXG4gKiB0YXJnZXQgb2YgYW55IHBhcnRpY3VsYXIgZXZlbnQgaXMgYSBzcGVjaWZpYyBEaXNwbGF5T2JqZWN0IGluc3RhbmNlLiBGb3JcclxuICogZXhhbXBsZSwgdGhlIHRhcmdldCBvZiBhbiA8Y29kZT5hZGRlZDwvY29kZT4gZXZlbnQgaXMgdGhlIHNwZWNpZmljXHJcbiAqIERpc3BsYXlPYmplY3QgaW5zdGFuY2UgdGhhdCB3YXMgYWRkZWQgdG8gdGhlIGRpc3BsYXkgbGlzdC4gSGF2aW5nIGEgc2luZ2xlXHJcbiAqIHRhcmdldCByZXN0cmljdHMgdGhlIHBsYWNlbWVudCBvZiBldmVudCBsaXN0ZW5lcnMgdG8gdGhhdCB0YXJnZXQgYW5kIGluXHJcbiAqIHNvbWUgY2FzZXMgdGhlIHRhcmdldCdzIGFuY2VzdG9ycyBvbiB0aGUgZGlzcGxheSBsaXN0LiBXaXRoIGJyb2FkY2FzdFxyXG4gKiBldmVudHMsIGhvd2V2ZXIsIHRoZSB0YXJnZXQgaXMgbm90IGEgc3BlY2lmaWMgRGlzcGxheU9iamVjdCBpbnN0YW5jZSwgYnV0XHJcbiAqIHJhdGhlciBhbGwgRGlzcGxheU9iamVjdCBpbnN0YW5jZXMsIGluY2x1ZGluZyB0aG9zZSB0aGF0IGFyZSBub3Qgb24gdGhlXHJcbiAqIGRpc3BsYXkgbGlzdC4gVGhpcyBtZWFucyB0aGF0IHlvdSBjYW4gYWRkIGEgbGlzdGVuZXIgdG8gYW55IERpc3BsYXlPYmplY3RcclxuICogaW5zdGFuY2UgdG8gbGlzdGVuIGZvciBicm9hZGNhc3QgZXZlbnRzLiBJbiBhZGRpdGlvbiB0byB0aGUgYnJvYWRjYXN0XHJcbiAqIGV2ZW50cyBsaXN0ZWQgaW4gdGhlIERpc3BsYXlPYmplY3QgY2xhc3MncyBFdmVudHMgdGFibGUsIHRoZSBEaXNwbGF5T2JqZWN0XHJcbiAqIGNsYXNzIGFsc28gaW5oZXJpdHMgdHdvIGJyb2FkY2FzdCBldmVudHMgZnJvbSB0aGUgRXZlbnREaXNwYXRjaGVyIGNsYXNzOlxyXG4gKiA8Y29kZT5hY3RpdmF0ZTwvY29kZT4gYW5kIDxjb2RlPmRlYWN0aXZhdGU8L2NvZGU+LjwvcD5cclxuICpcclxuICogPHA+U29tZSBwcm9wZXJ0aWVzIHByZXZpb3VzbHkgdXNlZCBpbiB0aGUgQWN0aW9uU2NyaXB0IDEuMCBhbmQgMi4wXHJcbiAqIE1vdmllQ2xpcCwgVGV4dEZpZWxkLCBhbmQgQnV0dG9uIGNsYXNzZXMoc3VjaCBhcyA8Y29kZT5fYWxwaGE8L2NvZGU+LFxyXG4gKiA8Y29kZT5faGVpZ2h0PC9jb2RlPiwgPGNvZGU+X25hbWU8L2NvZGU+LCA8Y29kZT5fd2lkdGg8L2NvZGU+LFxyXG4gKiA8Y29kZT5feDwvY29kZT4sIDxjb2RlPl95PC9jb2RlPiwgYW5kIG90aGVycykgaGF2ZSBlcXVpdmFsZW50cyBpbiB0aGVcclxuICogQWN0aW9uU2NyaXB0IDMuMCBEaXNwbGF5T2JqZWN0IGNsYXNzIHRoYXQgYXJlIHJlbmFtZWQgc28gdGhhdCB0aGV5IG5vXHJcbiAqIGxvbmdlciBiZWdpbiB3aXRoIHRoZSB1bmRlcnNjb3JlKF8pIGNoYXJhY3Rlci48L3A+XHJcbiAqXHJcbiAqIDxwPkZvciBtb3JlIGluZm9ybWF0aW9uLCBzZWUgdGhlIFwiRGlzcGxheSBQcm9ncmFtbWluZ1wiIGNoYXB0ZXIgb2YgdGhlXHJcbiAqIDxpPkFjdGlvblNjcmlwdCAzLjAgRGV2ZWxvcGVyJ3MgR3VpZGU8L2k+LjwvcD5cclxuICogXHJcbiAqIEBldmVudCBhZGRlZCAgICAgICAgICAgIERpc3BhdGNoZWQgd2hlbiBhIGRpc3BsYXkgb2JqZWN0IGlzIGFkZGVkIHRvIHRoZVxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5IGxpc3QuIFRoZSBmb2xsb3dpbmcgbWV0aG9kcyB0cmlnZ2VyIHRoaXNcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQ6XHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPkRpc3BsYXlPYmplY3RDb250YWluZXIuYWRkQ2hpbGQoKTwvY29kZT4sXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPkRpc3BsYXlPYmplY3RDb250YWluZXIuYWRkQ2hpbGRBdCgpPC9jb2RlPi5cclxuICogQGV2ZW50IGFkZGVkVG9TY2VuZSAgICAgRGlzcGF0Y2hlZCB3aGVuIGEgZGlzcGxheSBvYmplY3QgaXMgYWRkZWQgdG8gdGhlIG9uXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIHNjZW5lIGRpc3BsYXkgbGlzdCwgZWl0aGVyIGRpcmVjdGx5IG9yIHRocm91Z2ggdGhlXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGFkZGl0aW9uIG9mIGEgc3ViIHRyZWUgaW4gd2hpY2ggdGhlIGRpc3BsYXkgb2JqZWN0XHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGlzIGNvbnRhaW5lZC4gVGhlIGZvbGxvd2luZyBtZXRob2RzIHRyaWdnZXIgdGhpc1xyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBldmVudDpcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+RGlzcGxheU9iamVjdENvbnRhaW5lci5hZGRDaGlsZCgpPC9jb2RlPixcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+RGlzcGxheU9iamVjdENvbnRhaW5lci5hZGRDaGlsZEF0KCk8L2NvZGU+LlxyXG4gKiBAZXZlbnQgZW50ZXJGcmFtZSAgICAgICBbYnJvYWRjYXN0IGV2ZW50XSBEaXNwYXRjaGVkIHdoZW4gdGhlIHBsYXloZWFkIGlzXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGVudGVyaW5nIGEgbmV3IGZyYW1lLiBJZiB0aGUgcGxheWhlYWQgaXMgbm90XHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIG1vdmluZywgb3IgaWYgdGhlcmUgaXMgb25seSBvbmUgZnJhbWUsIHRoaXMgZXZlbnRcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgaXMgZGlzcGF0Y2hlZCBjb250aW51b3VzbHkgaW4gY29uanVuY3Rpb24gd2l0aCB0aGVcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgZnJhbWUgcmF0ZS4gVGhpcyBldmVudCBpcyBhIGJyb2FkY2FzdCBldmVudCwgd2hpY2hcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgbWVhbnMgdGhhdCBpdCBpcyBkaXNwYXRjaGVkIGJ5IGFsbCBkaXNwbGF5IG9iamVjdHNcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgd2l0aCBhIGxpc3RlbmVyIHJlZ2lzdGVyZWQgZm9yIHRoaXMgZXZlbnQuXHJcbiAqIEBldmVudCBleGl0RnJhbWUgICAgICAgIFticm9hZGNhc3QgZXZlbnRdIERpc3BhdGNoZWQgd2hlbiB0aGUgcGxheWhlYWQgaXNcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgZXhpdGluZyB0aGUgY3VycmVudCBmcmFtZS4gQWxsIGZyYW1lIHNjcmlwdHMgaGF2ZVxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBiZWVuIHJ1bi4gSWYgdGhlIHBsYXloZWFkIGlzIG5vdCBtb3ZpbmcsIG9yIGlmXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIHRoZXJlIGlzIG9ubHkgb25lIGZyYW1lLCB0aGlzIGV2ZW50IGlzIGRpc3BhdGNoZWRcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgY29udGludW91c2x5IGluIGNvbmp1bmN0aW9uIHdpdGggdGhlIGZyYW1lIHJhdGUuXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIFRoaXMgZXZlbnQgaXMgYSBicm9hZGNhc3QgZXZlbnQsIHdoaWNoIG1lYW5zIHRoYXRcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgaXQgaXMgZGlzcGF0Y2hlZCBieSBhbGwgZGlzcGxheSBvYmplY3RzIHdpdGggYVxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lciByZWdpc3RlcmVkIGZvciB0aGlzIGV2ZW50LlxyXG4gKiBAZXZlbnQgZnJhbWVDb25zdHJ1Y3RlZCBbYnJvYWRjYXN0IGV2ZW50XSBEaXNwYXRjaGVkIGFmdGVyIHRoZSBjb25zdHJ1Y3RvcnNcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgb2YgZnJhbWUgZGlzcGxheSBvYmplY3RzIGhhdmUgcnVuIGJ1dCBiZWZvcmUgZnJhbWVcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgc2NyaXB0cyBoYXZlIHJ1bi4gSWYgdGhlIHBsYXloZWFkIGlzIG5vdCBtb3ZpbmcsIG9yXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGlmIHRoZXJlIGlzIG9ubHkgb25lIGZyYW1lLCB0aGlzIGV2ZW50IGlzXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoZWQgY29udGludW91c2x5IGluIGNvbmp1bmN0aW9uIHdpdGggdGhlXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGZyYW1lIHJhdGUuIFRoaXMgZXZlbnQgaXMgYSBicm9hZGNhc3QgZXZlbnQsIHdoaWNoXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIG1lYW5zIHRoYXQgaXQgaXMgZGlzcGF0Y2hlZCBieSBhbGwgZGlzcGxheSBvYmplY3RzXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIHdpdGggYSBsaXN0ZW5lciByZWdpc3RlcmVkIGZvciB0aGlzIGV2ZW50LlxyXG4gKiBAZXZlbnQgcmVtb3ZlZCAgICAgICAgICBEaXNwYXRjaGVkIHdoZW4gYSBkaXNwbGF5IG9iamVjdCBpcyBhYm91dCB0byBiZVxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVkIGZyb20gdGhlIGRpc3BsYXkgbGlzdC4gVHdvIG1ldGhvZHMgb2YgdGhlXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIERpc3BsYXlPYmplY3RDb250YWluZXIgY2xhc3MgZ2VuZXJhdGUgdGhpcyBldmVudDpcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+cmVtb3ZlQ2hpbGQoKTwvY29kZT4gYW5kXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPnJlbW92ZUNoaWxkQXQoKTwvY29kZT4uXHJcbiAqXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxwPlRoZSBmb2xsb3dpbmcgbWV0aG9kcyBvZiBhXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIERpc3BsYXlPYmplY3RDb250YWluZXIgb2JqZWN0IGFsc28gZ2VuZXJhdGUgdGhpc1xyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBldmVudCBpZiBhbiBvYmplY3QgbXVzdCBiZSByZW1vdmVkIHRvIG1ha2Ugcm9vbSBmb3JcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgdGhlIG5ldyBvYmplY3Q6IDxjb2RlPmFkZENoaWxkKCk8L2NvZGU+LFxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5hZGRDaGlsZEF0KCk8L2NvZGU+LCBhbmRcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+c2V0Q2hpbGRJbmRleCgpPC9jb2RlPi4gPC9wPlxyXG4gKiBAZXZlbnQgcmVtb3ZlZEZyb21TY2VuZSBEaXNwYXRjaGVkIHdoZW4gYSBkaXNwbGF5IG9iamVjdCBpcyBhYm91dCB0byBiZVxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVkIGZyb20gdGhlIGRpc3BsYXkgbGlzdCwgZWl0aGVyIGRpcmVjdGx5IG9yXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIHRocm91Z2ggdGhlIHJlbW92YWwgb2YgYSBzdWIgdHJlZSBpbiB3aGljaCB0aGVcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheSBvYmplY3QgaXMgY29udGFpbmVkLiBUd28gbWV0aG9kcyBvZiB0aGVcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgRGlzcGxheU9iamVjdENvbnRhaW5lciBjbGFzcyBnZW5lcmF0ZSB0aGlzIGV2ZW50OlxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5yZW1vdmVDaGlsZCgpPC9jb2RlPiBhbmRcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+cmVtb3ZlQ2hpbGRBdCgpPC9jb2RlPi5cclxuICpcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgPHA+VGhlIGZvbGxvd2luZyBtZXRob2RzIG9mIGFcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgRGlzcGxheU9iamVjdENvbnRhaW5lciBvYmplY3QgYWxzbyBnZW5lcmF0ZSB0aGlzXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50IGlmIGFuIG9iamVjdCBtdXN0IGJlIHJlbW92ZWQgdG8gbWFrZSByb29tIGZvclxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICB0aGUgbmV3IG9iamVjdDogPGNvZGU+YWRkQ2hpbGQoKTwvY29kZT4sXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPmFkZENoaWxkQXQoKTwvY29kZT4sIGFuZFxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5zZXRDaGlsZEluZGV4KCk8L2NvZGU+LiA8L3A+XHJcbiAqIEBldmVudCByZW5kZXIgICAgICAgICAgIFticm9hZGNhc3QgZXZlbnRdIERpc3BhdGNoZWQgd2hlbiB0aGUgZGlzcGxheSBsaXN0XHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGlzIGFib3V0IHRvIGJlIHVwZGF0ZWQgYW5kIHJlbmRlcmVkLiBUaGlzIGV2ZW50XHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVzIHRoZSBsYXN0IG9wcG9ydHVuaXR5IGZvciBvYmplY3RzIGxpc3RlbmluZ1xyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgdGhpcyBldmVudCB0byBtYWtlIGNoYW5nZXMgYmVmb3JlIHRoZSBkaXNwbGF5XHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3QgaXMgcmVuZGVyZWQuIFlvdSBtdXN0IGNhbGwgdGhlXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPmludmFsaWRhdGUoKTwvY29kZT4gbWV0aG9kIG9mIHRoZSBTY2VuZVxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3QgZWFjaCB0aW1lIHlvdSB3YW50IGEgPGNvZGU+cmVuZGVyPC9jb2RlPlxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBldmVudCB0byBiZSBkaXNwYXRjaGVkLiA8Y29kZT5SZW5kZXI8L2NvZGU+IGV2ZW50c1xyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBhcmUgZGlzcGF0Y2hlZCB0byBhbiBvYmplY3Qgb25seSBpZiB0aGVyZSBpcyBtdXR1YWxcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgdHJ1c3QgYmV0d2VlbiBpdCBhbmQgdGhlIG9iamVjdCB0aGF0IGNhbGxlZFxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5TY2VuZS5pbnZhbGlkYXRlKCk8L2NvZGU+LiBUaGlzIGV2ZW50IGlzIGFcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgYnJvYWRjYXN0IGV2ZW50LCB3aGljaCBtZWFucyB0aGF0IGl0IGlzIGRpc3BhdGNoZWRcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgYnkgYWxsIGRpc3BsYXkgb2JqZWN0cyB3aXRoIGEgbGlzdGVuZXIgcmVnaXN0ZXJlZFxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgdGhpcyBldmVudC5cclxuICpcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgPHA+PGI+Tm90ZTogPC9iPlRoaXMgZXZlbnQgaXMgbm90IGRpc3BhdGNoZWQgaWYgdGhlXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXkgaXMgbm90IHJlbmRlcmluZy4gVGhpcyBpcyB0aGUgY2FzZSB3aGVuIHRoZVxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50IGlzIGVpdGhlciBtaW5pbWl6ZWQgb3Igb2JzY3VyZWQuIDwvcD5cclxuICovXHJcbmNsYXNzIERpc3BsYXlPYmplY3QgZXh0ZW5kcyBOYW1lZEFzc2V0QmFzZSBpbXBsZW1lbnRzIElCaXRtYXBEcmF3YWJsZVxyXG57XHJcblx0cHJpdmF0ZSBfbG9hZGVySW5mbzpMb2FkZXJJbmZvO1xyXG5cdHByaXZhdGUgX21vdXNlWDpudW1iZXI7XHJcblx0cHJpdmF0ZSBfbW91c2VZOm51bWJlcjtcclxuXHRwcml2YXRlIF9yb290OkRpc3BsYXlPYmplY3RDb250YWluZXI7XHJcblx0cHJpdmF0ZSBfYm91bmRzOlJlY3RhbmdsZTtcclxuXHRwcml2YXRlIF9ib3VuZHNWaXNpYmxlOmJvb2xlYW47XHJcblx0cHJpdmF0ZSBfZGVwdGg6bnVtYmVyO1xyXG5cdHByaXZhdGUgX2hlaWdodDpudW1iZXI7XHJcblx0cHJpdmF0ZSBfd2lkdGg6bnVtYmVyO1xyXG5cclxuXHRwdWJsaWMgX3BTY2VuZTpTY2VuZTtcclxuXHRwdWJsaWMgX3BQYXJlbnQ6RGlzcGxheU9iamVjdENvbnRhaW5lcjtcclxuXHRwdWJsaWMgX3BTY2VuZVRyYW5zZm9ybTpNYXRyaXgzRCA9IG5ldyBNYXRyaXgzRCgpO1xyXG5cdHB1YmxpYyBfcFNjZW5lVHJhbnNmb3JtRGlydHk6Ym9vbGVhbiA9IHRydWU7XHJcblx0cHVibGljIF9wSXNFbnRpdHk6Ym9vbGVhbjtcclxuXHJcblx0cHJpdmF0ZSBfZXhwbGljaXRQYXJ0aXRpb246UGFydGl0aW9uO1xyXG5cdHB1YmxpYyBfcEltcGxpY2l0UGFydGl0aW9uOlBhcnRpdGlvbjtcclxuXHRwcml2YXRlIF9wYXJ0aXRpb25Ob2RlOkVudGl0eU5vZGU7XHJcblxyXG5cdHByaXZhdGUgX3NjZW5lVHJhbnNmb3JtQ2hhbmdlZDpEaXNwbGF5T2JqZWN0RXZlbnQ7XHJcblx0cHJpdmF0ZSBfc2NlbmVjaGFuZ2VkOkRpc3BsYXlPYmplY3RFdmVudDtcclxuXHRwcml2YXRlIF90cmFuc2Zvcm06VHJhbnNmb3JtO1xyXG5cdHByaXZhdGUgX21hdHJpeDNEOk1hdHJpeDNEID0gbmV3IE1hdHJpeDNEKCk7XHJcblx0cHJpdmF0ZSBfbWF0cml4M0REaXJ0eTpib29sZWFuID0gdHJ1ZTtcclxuXHJcblx0cHJpdmF0ZSBfaW52ZXJzZVNjZW5lVHJhbnNmb3JtOk1hdHJpeDNEID0gbmV3IE1hdHJpeDNEKCk7XHJcblx0cHJpdmF0ZSBfaW52ZXJzZVNjZW5lVHJhbnNmb3JtRGlydHk6Ym9vbGVhbiA9IHRydWU7XHJcblx0cHJpdmF0ZSBfc2NlbmVQb3NpdGlvbjpWZWN0b3IzRCA9IG5ldyBWZWN0b3IzRCgpO1xyXG5cdHByaXZhdGUgX3NjZW5lUG9zaXRpb25EaXJ0eTpib29sZWFuID0gdHJ1ZTtcclxuXHRwcml2YXRlIF9leHBsaWNpdFZpc2liaWxpdHk6Ym9vbGVhbiA9IHRydWU7XHJcblx0cHVibGljIF9wSW1wbGljaXRWaXNpYmlsaXR5OmJvb2xlYW4gPSB0cnVlO1xyXG5cdHByaXZhdGUgX2V4cGxpY2l0TW91c2VFbmFibGVkOmJvb2xlYW4gPSB0cnVlO1xyXG5cdHB1YmxpYyBfcEltcGxpY2l0TW91c2VFbmFibGVkOmJvb2xlYW4gPSB0cnVlO1xyXG5cdHByaXZhdGUgX2xpc3RlblRvU2NlbmVUcmFuc2Zvcm1DaGFuZ2VkOmJvb2xlYW47XHJcblx0cHJpdmF0ZSBfbGlzdGVuVG9TY2VuZUNoYW5nZWQ6Ym9vbGVhbjtcclxuXHJcblx0cHJpdmF0ZSBfcG9zaXRpb25EaXJ0eTpib29sZWFuID0gdHJ1ZTtcclxuXHRwcml2YXRlIF9yb3RhdGlvbkRpcnR5OmJvb2xlYW4gPSB0cnVlO1xyXG5cdHByaXZhdGUgX3NjYWxlRGlydHk6Ym9vbGVhbiA9IHRydWU7XHJcblxyXG5cdHByaXZhdGUgX3Bvc2l0aW9uQ2hhbmdlZDpEaXNwbGF5T2JqZWN0RXZlbnQ7XHJcblx0cHJpdmF0ZSBfcm90YXRpb25DaGFuZ2VkOkRpc3BsYXlPYmplY3RFdmVudDtcclxuXHRwcml2YXRlIF9zY2FsZUNoYW5nZWQ6RGlzcGxheU9iamVjdEV2ZW50O1xyXG5cclxuXHRwcml2YXRlIF9yb3RhdGlvblg6bnVtYmVyID0gMDtcclxuXHRwcml2YXRlIF9yb3RhdGlvblk6bnVtYmVyID0gMDtcclxuXHRwcml2YXRlIF9yb3RhdGlvblo6bnVtYmVyID0gMDtcclxuXHRwcml2YXRlIF9ldWxlcnM6VmVjdG9yM0QgPSBuZXcgVmVjdG9yM0QoKTtcclxuXHRwcml2YXRlIF9mbGlwWTpNYXRyaXgzRCA9IG5ldyBNYXRyaXgzRCgpO1xyXG5cclxuXHRwcml2YXRlIF9saXN0ZW5Ub1Bvc2l0aW9uQ2hhbmdlZDpib29sZWFuO1xyXG5cdHByaXZhdGUgX2xpc3RlblRvUm90YXRpb25DaGFuZ2VkOmJvb2xlYW47XHJcblx0cHJpdmF0ZSBfbGlzdGVuVG9TY2FsZUNoYW5nZWQ6Ym9vbGVhbjtcclxuXHRwcml2YXRlIF96T2Zmc2V0Om51bWJlciA9IDA7XHJcblxyXG5cdHB1YmxpYyBfcFNjYWxlWDpudW1iZXIgPSAxO1xyXG5cdHB1YmxpYyBfcFNjYWxlWTpudW1iZXIgPSAxO1xyXG5cdHB1YmxpYyBfcFNjYWxlWjpudW1iZXIgPSAxO1xyXG5cdHByaXZhdGUgX3g6bnVtYmVyID0gMDtcclxuXHRwcml2YXRlIF95Om51bWJlciA9IDA7XHJcblx0cHJpdmF0ZSBfejpudW1iZXIgPSAwO1xyXG5cdHByaXZhdGUgX3Bpdm90OlZlY3RvcjNEID0gbmV3IFZlY3RvcjNEKCk7XHJcblx0cHJpdmF0ZSBfb3JpZW50YXRpb25NYXRyaXg6TWF0cml4M0QgPSBuZXcgTWF0cml4M0QoKTtcclxuXHRwcml2YXRlIF9waXZvdFplcm86Ym9vbGVhbiA9IHRydWU7XHJcblx0cHJpdmF0ZSBfcGl2b3REaXJ0eTpib29sZWFuID0gdHJ1ZTtcclxuXHRwcml2YXRlIF9wb3M6VmVjdG9yM0QgPSBuZXcgVmVjdG9yM0QoKTtcclxuXHRwcml2YXRlIF9yb3Q6VmVjdG9yM0QgPSBuZXcgVmVjdG9yM0QoKTtcclxuXHRwcml2YXRlIF9zY2E6VmVjdG9yM0QgPSBuZXcgVmVjdG9yM0QoKTtcclxuXHRwcml2YXRlIF90cmFuc2Zvcm1Db21wb25lbnRzOkFycmF5PFZlY3RvcjNEPjtcclxuXHJcblx0cHVibGljIF9wSWdub3JlVHJhbnNmb3JtOmJvb2xlYW4gPSBmYWxzZTtcclxuXHJcblx0cHJpdmF0ZSBfc2hhZGVyUGlja2luZ0RldGFpbHM6Ym9vbGVhbjtcclxuXHJcblx0cHVibGljIF9wUGlja2luZ0NvbGxpc2lvblZPOlBpY2tpbmdDb2xsaXNpb25WTztcclxuXHJcblx0cHVibGljIF9wQm91bmRzOkJvdW5kaW5nVm9sdW1lQmFzZTtcclxuXHRwdWJsaWMgX3BCb3VuZHNJbnZhbGlkOmJvb2xlYW4gPSB0cnVlO1xyXG5cdHByaXZhdGUgX3dvcmxkQm91bmRzOkJvdW5kaW5nVm9sdW1lQmFzZTtcclxuXHRwcml2YXRlIF93b3JsZEJvdW5kc0ludmFsaWQ6Ym9vbGVhbiA9IHRydWU7XHJcblxyXG5cdHB1YmxpYyBfcFBpY2tpbmdDb2xsaWRlcjpJUGlja2luZ0NvbGxpZGVyO1xyXG5cclxuXHRwdWJsaWMgX3BSZW5kZXJhYmxlczpBcnJheTxJUmVuZGVyYWJsZT4gPSBuZXcgQXJyYXk8SVJlbmRlcmFibGU+KCk7XHJcblxyXG5cdHB1YmxpYyBfaVNvdXJjZVByZWZhYjpQcmVmYWJCYXNlO1xyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBhbGlnbm1lbnRNb2RlOnN0cmluZyA9IEFsaWdubWVudE1vZGUuUkVHSVNUUkFUSU9OX1BPSU5UO1xyXG5cclxuXHQvKipcclxuXHQgKiBJbmRpY2F0ZXMgdGhlIGFscGhhIHRyYW5zcGFyZW5jeSB2YWx1ZSBvZiB0aGUgb2JqZWN0IHNwZWNpZmllZC4gVmFsaWRcclxuXHQgKiB2YWx1ZXMgYXJlIDAoZnVsbHkgdHJhbnNwYXJlbnQpIHRvIDEoZnVsbHkgb3BhcXVlKS4gVGhlIGRlZmF1bHQgdmFsdWUgaXNcclxuXHQgKiAxLiBEaXNwbGF5IG9iamVjdHMgd2l0aCA8Y29kZT5hbHBoYTwvY29kZT4gc2V0IHRvIDAgPGk+YXJlPC9pPiBhY3RpdmUsXHJcblx0ICogZXZlbiB0aG91Z2ggdGhleSBhcmUgaW52aXNpYmxlLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBhbHBoYTpudW1iZXI7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEEgdmFsdWUgZnJvbSB0aGUgQmxlbmRNb2RlIGNsYXNzIHRoYXQgc3BlY2lmaWVzIHdoaWNoIGJsZW5kIG1vZGUgdG8gdXNlLiBBXHJcblx0ICogYml0bWFwIGNhbiBiZSBkcmF3biBpbnRlcm5hbGx5IGluIHR3byB3YXlzLiBJZiB5b3UgaGF2ZSBhIGJsZW5kIG1vZGVcclxuXHQgKiBlbmFibGVkIG9yIGFuIGV4dGVybmFsIGNsaXBwaW5nIG1hc2ssIHRoZSBiaXRtYXAgaXMgZHJhd24gYnkgYWRkaW5nIGFcclxuXHQgKiBiaXRtYXAtZmlsbGVkIHNxdWFyZSBzaGFwZSB0byB0aGUgdmVjdG9yIHJlbmRlci4gSWYgeW91IGF0dGVtcHQgdG8gc2V0XHJcblx0ICogdGhpcyBwcm9wZXJ0eSB0byBhbiBpbnZhbGlkIHZhbHVlLCBGbGFzaCBydW50aW1lcyBzZXQgdGhlIHZhbHVlIHRvXHJcblx0ICogPGNvZGU+QmxlbmRNb2RlLk5PUk1BTDwvY29kZT4uXHJcblx0ICpcclxuXHQgKiA8cD5UaGUgPGNvZGU+YmxlbmRNb2RlPC9jb2RlPiBwcm9wZXJ0eSBhZmZlY3RzIGVhY2ggcGl4ZWwgb2YgdGhlIGRpc3BsYXlcclxuXHQgKiBvYmplY3QuIEVhY2ggcGl4ZWwgaXMgY29tcG9zZWQgb2YgdGhyZWUgY29uc3RpdHVlbnQgY29sb3JzKHJlZCwgZ3JlZW4sXHJcblx0ICogYW5kIGJsdWUpLCBhbmQgZWFjaCBjb25zdGl0dWVudCBjb2xvciBoYXMgYSB2YWx1ZSBiZXR3ZWVuIDB4MDAgYW5kIDB4RkYuXHJcblx0ICogRmxhc2ggUGxheWVyIG9yIEFkb2JlIEFJUiBjb21wYXJlcyBlYWNoIGNvbnN0aXR1ZW50IGNvbG9yIG9mIG9uZSBwaXhlbCBpblxyXG5cdCAqIHRoZSBtb3ZpZSBjbGlwIHdpdGggdGhlIGNvcnJlc3BvbmRpbmcgY29sb3Igb2YgdGhlIHBpeGVsIGluIHRoZVxyXG5cdCAqIGJhY2tncm91bmQuIEZvciBleGFtcGxlLCBpZiA8Y29kZT5ibGVuZE1vZGU8L2NvZGU+IGlzIHNldCB0b1xyXG5cdCAqIDxjb2RlPkJsZW5kTW9kZS5MSUdIVEVOPC9jb2RlPiwgRmxhc2ggUGxheWVyIG9yIEFkb2JlIEFJUiBjb21wYXJlcyB0aGUgcmVkXHJcblx0ICogdmFsdWUgb2YgdGhlIGRpc3BsYXkgb2JqZWN0IHdpdGggdGhlIHJlZCB2YWx1ZSBvZiB0aGUgYmFja2dyb3VuZCwgYW5kIHVzZXNcclxuXHQgKiB0aGUgbGlnaHRlciBvZiB0aGUgdHdvIGFzIHRoZSB2YWx1ZSBmb3IgdGhlIHJlZCBjb21wb25lbnQgb2YgdGhlIGRpc3BsYXllZFxyXG5cdCAqIGNvbG9yLjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPlRoZSBmb2xsb3dpbmcgdGFibGUgZGVzY3JpYmVzIHRoZSA8Y29kZT5ibGVuZE1vZGU8L2NvZGU+IHNldHRpbmdzLiBUaGVcclxuXHQgKiBCbGVuZE1vZGUgY2xhc3MgZGVmaW5lcyBzdHJpbmcgdmFsdWVzIHlvdSBjYW4gdXNlLiBUaGUgaWxsdXN0cmF0aW9ucyBpblxyXG5cdCAqIHRoZSB0YWJsZSBzaG93IDxjb2RlPmJsZW5kTW9kZTwvY29kZT4gdmFsdWVzIGFwcGxpZWQgdG8gYSBjaXJjdWxhciBkaXNwbGF5XHJcblx0ICogb2JqZWN0KDIpIHN1cGVyaW1wb3NlZCBvbiBhbm90aGVyIGRpc3BsYXkgb2JqZWN0KDEpLjwvcD5cclxuXHQgKi9cclxuXHRwdWJsaWMgYmxlbmRNb2RlOkJsZW5kTW9kZTtcclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGJvdW5kcygpOkJvdW5kaW5nVm9sdW1lQmFzZVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9wQm91bmRzSW52YWxpZClcclxuXHRcdFx0dGhpcy5wVXBkYXRlQm91bmRzKCk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX3BCb3VuZHM7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IGJvdW5kcyh2YWx1ZTpCb3VuZGluZ1ZvbHVtZUJhc2UpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX3BCb3VuZHMgPT0gdmFsdWUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9wQm91bmRzID0gdmFsdWU7XHJcblxyXG5cdFx0dGhpcy5fd29ybGRCb3VuZHMgPSB2YWx1ZS5jbG9uZSgpO1xyXG5cclxuXHRcdHRoaXMucEludmFsaWRhdGVCb3VuZHMoKTtcclxuXHJcblx0XHRpZiAodGhpcy5fYm91bmRzVmlzaWJsZSlcclxuXHRcdFx0dGhpcy5fcGFydGl0aW9uTm9kZS5faVVwZGF0ZUVudGl0eUJvdW5kcygpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSWYgc2V0IHRvIDxjb2RlPnRydWU8L2NvZGU+LCBOTUUgd2lsbCB1c2UgdGhlIHNvZnR3YXJlIHJlbmRlcmVyIHRvIGNhY2hlXHJcblx0ICogYW4gaW50ZXJuYWwgYml0bWFwIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBkaXNwbGF5IG9iamVjdC4gRm9yIG5hdGl2ZSB0YXJnZXRzLFxyXG5cdCAqIHRoaXMgaXMgb2Z0ZW4gbXVjaCBzbG93ZXIgdGhhbiB0aGUgZGVmYXVsdCBoYXJkd2FyZSByZW5kZXJlci4gV2hlbiB5b3VcclxuXHQgKiBhcmUgdXNpbmcgdGhlIEZsYXNoIHRhcmdldCwgdGhpcyBjYWNoaW5nIG1heSBpbmNyZWFzZSBwZXJmb3JtYW5jZSBmb3IgZGlzcGxheVxyXG5cdCAqIG9iamVjdHMgdGhhdCBjb250YWluIGNvbXBsZXggdmVjdG9yIGNvbnRlbnQuXHJcblx0ICpcclxuXHQgKiA8cD5BbGwgdmVjdG9yIGRhdGEgZm9yIGEgZGlzcGxheSBvYmplY3QgdGhhdCBoYXMgYSBjYWNoZWQgYml0bWFwIGlzIGRyYXduXHJcblx0ICogdG8gdGhlIGJpdG1hcCBpbnN0ZWFkIG9mIHRoZSBtYWluIGRpc3BsYXkuIElmXHJcblx0ICogPGNvZGU+Y2FjaGVBc0JpdG1hcE1hdHJpeDwvY29kZT4gaXMgbnVsbCBvciB1bnN1cHBvcnRlZCwgdGhlIGJpdG1hcCBpc1xyXG5cdCAqIHRoZW4gY29waWVkIHRvIHRoZSBtYWluIGRpc3BsYXkgYXMgdW5zdHJldGNoZWQsIHVucm90YXRlZCBwaXhlbHMgc25hcHBlZFxyXG5cdCAqIHRvIHRoZSBuZWFyZXN0IHBpeGVsIGJvdW5kYXJpZXMuIFBpeGVscyBhcmUgbWFwcGVkIDEgdG8gMSB3aXRoIHRoZSBwYXJlbnRcclxuXHQgKiBvYmplY3QuIElmIHRoZSBib3VuZHMgb2YgdGhlIGJpdG1hcCBjaGFuZ2UsIHRoZSBiaXRtYXAgaXMgcmVjcmVhdGVkXHJcblx0ICogaW5zdGVhZCBvZiBiZWluZyBzdHJldGNoZWQuPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+SWYgPGNvZGU+Y2FjaGVBc0JpdG1hcE1hdHJpeDwvY29kZT4gaXMgbm9uLW51bGwgYW5kIHN1cHBvcnRlZCwgdGhlXHJcblx0ICogb2JqZWN0IGlzIGRyYXduIHRvIHRoZSBvZmYtc2NyZWVuIGJpdG1hcCB1c2luZyB0aGF0IG1hdHJpeCBhbmQgdGhlXHJcblx0ICogc3RyZXRjaGVkIGFuZC9vciByb3RhdGVkIHJlc3VsdHMgb2YgdGhhdCByZW5kZXJpbmcgYXJlIHVzZWQgdG8gZHJhdyB0aGVcclxuXHQgKiBvYmplY3QgdG8gdGhlIG1haW4gZGlzcGxheS48L3A+XHJcblx0ICpcclxuXHQgKiA8cD5ObyBpbnRlcm5hbCBiaXRtYXAgaXMgY3JlYXRlZCB1bmxlc3MgdGhlIDxjb2RlPmNhY2hlQXNCaXRtYXA8L2NvZGU+XHJcblx0ICogcHJvcGVydHkgaXMgc2V0IHRvIDxjb2RlPnRydWU8L2NvZGU+LjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPkFmdGVyIHlvdSBzZXQgdGhlIDxjb2RlPmNhY2hlQXNCaXRtYXA8L2NvZGU+IHByb3BlcnR5IHRvXHJcblx0ICogPGNvZGU+dHJ1ZTwvY29kZT4sIHRoZSByZW5kZXJpbmcgZG9lcyBub3QgY2hhbmdlLCBob3dldmVyIHRoZSBkaXNwbGF5XHJcblx0ICogb2JqZWN0IHBlcmZvcm1zIHBpeGVsIHNuYXBwaW5nIGF1dG9tYXRpY2FsbHkuIFRoZSBhbmltYXRpb24gc3BlZWQgY2FuIGJlXHJcblx0ICogc2lnbmlmaWNhbnRseSBmYXN0ZXIgZGVwZW5kaW5nIG9uIHRoZSBjb21wbGV4aXR5IG9mIHRoZSB2ZWN0b3IgY29udGVudC5cclxuXHQgKiA8L3A+XHJcblx0ICpcclxuXHQgKiA8cD5UaGUgPGNvZGU+Y2FjaGVBc0JpdG1hcDwvY29kZT4gcHJvcGVydHkgaXMgYXV0b21hdGljYWxseSBzZXQgdG9cclxuXHQgKiA8Y29kZT50cnVlPC9jb2RlPiB3aGVuZXZlciB5b3UgYXBwbHkgYSBmaWx0ZXIgdG8gYSBkaXNwbGF5IG9iamVjdCh3aGVuXHJcblx0ICogaXRzIDxjb2RlPmZpbHRlcjwvY29kZT4gYXJyYXkgaXMgbm90IGVtcHR5KSwgYW5kIGlmIGEgZGlzcGxheSBvYmplY3QgaGFzIGFcclxuXHQgKiBmaWx0ZXIgYXBwbGllZCB0byBpdCwgPGNvZGU+Y2FjaGVBc0JpdG1hcDwvY29kZT4gaXMgcmVwb3J0ZWQgYXNcclxuXHQgKiA8Y29kZT50cnVlPC9jb2RlPiBmb3IgdGhhdCBkaXNwbGF5IG9iamVjdCwgZXZlbiBpZiB5b3Ugc2V0IHRoZSBwcm9wZXJ0eSB0b1xyXG5cdCAqIDxjb2RlPmZhbHNlPC9jb2RlPi4gSWYgeW91IGNsZWFyIGFsbCBmaWx0ZXJzIGZvciBhIGRpc3BsYXkgb2JqZWN0LCB0aGVcclxuXHQgKiA8Y29kZT5jYWNoZUFzQml0bWFwPC9jb2RlPiBzZXR0aW5nIGNoYW5nZXMgdG8gd2hhdCBpdCB3YXMgbGFzdCBzZXQgdG8uPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+QSBkaXNwbGF5IG9iamVjdCBkb2VzIG5vdCB1c2UgYSBiaXRtYXAgZXZlbiBpZiB0aGVcclxuXHQgKiA8Y29kZT5jYWNoZUFzQml0bWFwPC9jb2RlPiBwcm9wZXJ0eSBpcyBzZXQgdG8gPGNvZGU+dHJ1ZTwvY29kZT4gYW5kXHJcblx0ICogaW5zdGVhZCByZW5kZXJzIGZyb20gdmVjdG9yIGRhdGEgaW4gdGhlIGZvbGxvd2luZyBjYXNlczo8L3A+XHJcblx0ICpcclxuXHQgKiA8dWw+XHJcblx0ICogICA8bGk+VGhlIGJpdG1hcCBpcyB0b28gbGFyZ2UuIEluIEFJUiAxLjUgYW5kIEZsYXNoIFBsYXllciAxMCwgdGhlIG1heGltdW1cclxuXHQgKiBzaXplIGZvciBhIGJpdG1hcCBpbWFnZSBpcyA4LDE5MSBwaXhlbHMgaW4gd2lkdGggb3IgaGVpZ2h0LCBhbmQgdGhlIHRvdGFsXHJcblx0ICogbnVtYmVyIG9mIHBpeGVscyBjYW5ub3QgZXhjZWVkIDE2LDc3NywyMTUgcGl4ZWxzLihTbywgaWYgYSBiaXRtYXAgaW1hZ2VcclxuXHQgKiBpcyA4LDE5MSBwaXhlbHMgd2lkZSwgaXQgY2FuIG9ubHkgYmUgMiwwNDggcGl4ZWxzIGhpZ2guKSBJbiBGbGFzaCBQbGF5ZXIgOVxyXG5cdCAqIGFuZCBlYXJsaWVyLCB0aGUgbGltaXRhdGlvbiBpcyBpcyAyODgwIHBpeGVscyBpbiBoZWlnaHQgYW5kIDIsODgwIHBpeGVsc1xyXG5cdCAqIGluIHdpZHRoLjwvbGk+XHJcblx0ICogICA8bGk+VGhlIGJpdG1hcCBmYWlscyB0byBhbGxvY2F0ZShvdXQgb2YgbWVtb3J5IGVycm9yKS4gPC9saT5cclxuXHQgKiA8L3VsPlxyXG5cdCAqXHJcblx0ICogPHA+VGhlIDxjb2RlPmNhY2hlQXNCaXRtYXA8L2NvZGU+IHByb3BlcnR5IGlzIGJlc3QgdXNlZCB3aXRoIG1vdmllIGNsaXBzXHJcblx0ICogdGhhdCBoYXZlIG1vc3RseSBzdGF0aWMgY29udGVudCBhbmQgdGhhdCBkbyBub3Qgc2NhbGUgYW5kIHJvdGF0ZVxyXG5cdCAqIGZyZXF1ZW50bHkuIFdpdGggc3VjaCBtb3ZpZSBjbGlwcywgPGNvZGU+Y2FjaGVBc0JpdG1hcDwvY29kZT4gY2FuIGxlYWQgdG9cclxuXHQgKiBwZXJmb3JtYW5jZSBpbmNyZWFzZXMgd2hlbiB0aGUgbW92aWUgY2xpcCBpcyB0cmFuc2xhdGVkKHdoZW4gaXRzIDxpPng8L2k+XHJcblx0ICogYW5kIDxpPnk8L2k+IHBvc2l0aW9uIGlzIGNoYW5nZWQpLjwvcD5cclxuXHQgKi9cclxuXHRwdWJsaWMgY2FjaGVBc0JpdG1hcDpib29sZWFuO1xyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBjYXN0c1NoYWRvd3M6Ym9vbGVhbiA9IHRydWU7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluZGljYXRlcyB0aGUgZGVwdGggb2YgdGhlIGRpc3BsYXkgb2JqZWN0LCBpbiBwaXhlbHMuIFRoZSBkZXB0aCBpc1xyXG5cdCAqIGNhbGN1bGF0ZWQgYmFzZWQgb24gdGhlIGJvdW5kcyBvZiB0aGUgY29udGVudCBvZiB0aGUgZGlzcGxheSBvYmplY3QuIFdoZW5cclxuXHQgKiB5b3Ugc2V0IHRoZSA8Y29kZT5kZXB0aDwvY29kZT4gcHJvcGVydHksIHRoZSA8Y29kZT5zY2FsZVo8L2NvZGU+IHByb3BlcnR5XHJcblx0ICogaXMgYWRqdXN0ZWQgYWNjb3JkaW5nbHksIGFzIHNob3duIGluIHRoZSBmb2xsb3dpbmcgY29kZTpcclxuXHQgKlxyXG5cdCAqIDxwPkV4Y2VwdCBmb3IgVGV4dEZpZWxkIGFuZCBWaWRlbyBvYmplY3RzLCBhIGRpc3BsYXkgb2JqZWN0IHdpdGggbm9cclxuXHQgKiBjb250ZW50IChzdWNoIGFzIGFuIGVtcHR5IHNwcml0ZSkgaGFzIGEgZGVwdGggb2YgMCwgZXZlbiBpZiB5b3UgdHJ5IHRvXHJcblx0ICogc2V0IDxjb2RlPmRlcHRoPC9jb2RlPiB0byBhIGRpZmZlcmVudCB2YWx1ZS48L3A+XHJcblx0ICovXHJcblx0cHVibGljIGdldCBkZXB0aCgpOm51bWJlclxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9wQm91bmRzSW52YWxpZClcclxuXHRcdFx0dGhpcy5wVXBkYXRlQm91bmRzKCk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX2RlcHRoO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBkZXB0aCh2YWw6bnVtYmVyKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9kZXB0aCA9PSB2YWwpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9kZXB0aCA9PSB2YWw7XHJcblxyXG5cdFx0dGhpcy5fcFNjYWxlWiA9IHZhbC90aGlzLmJvdW5kcy5hYWJiLmRlcHRoO1xyXG5cclxuXHRcdHRoaXMuaW52YWxpZGF0ZVNjYWxlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEZWZpbmVzIHRoZSByb3RhdGlvbiBvZiB0aGUgM2Qgb2JqZWN0IGFzIGEgPGNvZGU+VmVjdG9yM0Q8L2NvZGU+IG9iamVjdCBjb250YWluaW5nIGV1bGVyIGFuZ2xlcyBmb3Igcm90YXRpb24gYXJvdW5kIHgsIHkgYW5kIHogYXhpcy5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGV1bGVycygpOlZlY3RvcjNEXHJcblx0e1xyXG5cdFx0dGhpcy5fZXVsZXJzLnggPSB0aGlzLl9yb3RhdGlvblgqTWF0aENvbnN0cy5SQURJQU5TX1RPX0RFR1JFRVM7XHJcblx0XHR0aGlzLl9ldWxlcnMueSA9IHRoaXMuX3JvdGF0aW9uWSpNYXRoQ29uc3RzLlJBRElBTlNfVE9fREVHUkVFUztcclxuXHRcdHRoaXMuX2V1bGVycy56ID0gdGhpcy5fcm90YXRpb25aKk1hdGhDb25zdHMuUkFESUFOU19UT19ERUdSRUVTO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLl9ldWxlcnM7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IGV1bGVycyh2YWx1ZTpWZWN0b3IzRClcclxuXHR7XHJcblx0XHR0aGlzLl9yb3RhdGlvblggPSB2YWx1ZS54Kk1hdGhDb25zdHMuREVHUkVFU19UT19SQURJQU5TO1xyXG5cdFx0dGhpcy5fcm90YXRpb25ZID0gdmFsdWUueSpNYXRoQ29uc3RzLkRFR1JFRVNfVE9fUkFESUFOUztcclxuXHRcdHRoaXMuX3JvdGF0aW9uWiA9IHZhbHVlLnoqTWF0aENvbnN0cy5ERUdSRUVTX1RPX1JBRElBTlM7XHJcblxyXG5cdFx0dGhpcy5pbnZhbGlkYXRlUm90YXRpb24oKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFuIG9iamVjdCB0aGF0IGNhbiBjb250YWluIGFueSBleHRyYSBkYXRhLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBleHRyYTpPYmplY3Q7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFuIGluZGV4ZWQgYXJyYXkgdGhhdCBjb250YWlucyBlYWNoIGZpbHRlciBvYmplY3QgY3VycmVudGx5IGFzc29jaWF0ZWRcclxuXHQgKiB3aXRoIHRoZSBkaXNwbGF5IG9iamVjdC4gVGhlIGZsYXNoLmZpbHRlcnMgcGFja2FnZSBjb250YWlucyBzZXZlcmFsXHJcblx0ICogY2xhc3NlcyB0aGF0IGRlZmluZSBzcGVjaWZpYyBmaWx0ZXJzIHlvdSBjYW4gdXNlLlxyXG5cdCAqXHJcblx0ICogPHA+RmlsdGVycyBjYW4gYmUgYXBwbGllZCBpbiBGbGFzaCBQcm9mZXNzaW9uYWwgYXQgZGVzaWduIHRpbWUsIG9yIGF0IHJ1blxyXG5cdCAqIHRpbWUgYnkgdXNpbmcgQWN0aW9uU2NyaXB0IGNvZGUuIFRvIGFwcGx5IGEgZmlsdGVyIGJ5IHVzaW5nIEFjdGlvblNjcmlwdCxcclxuXHQgKiB5b3UgbXVzdCBtYWtlIGEgdGVtcG9yYXJ5IGNvcHkgb2YgdGhlIGVudGlyZSA8Y29kZT5maWx0ZXJzPC9jb2RlPiBhcnJheSxcclxuXHQgKiBtb2RpZnkgdGhlIHRlbXBvcmFyeSBhcnJheSwgdGhlbiBhc3NpZ24gdGhlIHZhbHVlIG9mIHRoZSB0ZW1wb3JhcnkgYXJyYXlcclxuXHQgKiBiYWNrIHRvIHRoZSA8Y29kZT5maWx0ZXJzPC9jb2RlPiBhcnJheS4gWW91IGNhbm5vdCBkaXJlY3RseSBhZGQgYSBuZXdcclxuXHQgKiBmaWx0ZXIgb2JqZWN0IHRvIHRoZSA8Y29kZT5maWx0ZXJzPC9jb2RlPiBhcnJheS48L3A+XHJcblx0ICpcclxuXHQgKiA8cD5UbyBhZGQgYSBmaWx0ZXIgYnkgdXNpbmcgQWN0aW9uU2NyaXB0LCBwZXJmb3JtIHRoZSBmb2xsb3dpbmcgc3RlcHNcclxuXHQgKiAoYXNzdW1lIHRoYXQgdGhlIHRhcmdldCBkaXNwbGF5IG9iamVjdCBpcyBuYW1lZFxyXG5cdCAqIDxjb2RlPm15RGlzcGxheU9iamVjdDwvY29kZT4pOjwvcD5cclxuXHQgKlxyXG5cdCAqIDxvbD5cclxuXHQgKiAgIDxsaT5DcmVhdGUgYSBuZXcgZmlsdGVyIG9iamVjdCBieSB1c2luZyB0aGUgY29uc3RydWN0b3IgbWV0aG9kIG9mIHlvdXJcclxuXHQgKiBjaG9zZW4gZmlsdGVyIGNsYXNzLjwvbGk+XHJcblx0ICogICA8bGk+QXNzaWduIHRoZSB2YWx1ZSBvZiB0aGUgPGNvZGU+bXlEaXNwbGF5T2JqZWN0LmZpbHRlcnM8L2NvZGU+IGFycmF5XHJcblx0ICogdG8gYSB0ZW1wb3JhcnkgYXJyYXksIHN1Y2ggYXMgb25lIG5hbWVkIDxjb2RlPm15RmlsdGVyczwvY29kZT4uPC9saT5cclxuXHQgKiAgIDxsaT5BZGQgdGhlIG5ldyBmaWx0ZXIgb2JqZWN0IHRvIHRoZSA8Y29kZT5teUZpbHRlcnM8L2NvZGU+IHRlbXBvcmFyeVxyXG5cdCAqIGFycmF5LjwvbGk+XHJcblx0ICogICA8bGk+QXNzaWduIHRoZSB2YWx1ZSBvZiB0aGUgdGVtcG9yYXJ5IGFycmF5IHRvIHRoZVxyXG5cdCAqIDxjb2RlPm15RGlzcGxheU9iamVjdC5maWx0ZXJzPC9jb2RlPiBhcnJheS48L2xpPlxyXG5cdCAqIDwvb2w+XHJcblx0ICpcclxuXHQgKiA8cD5JZiB0aGUgPGNvZGU+ZmlsdGVyczwvY29kZT4gYXJyYXkgaXMgdW5kZWZpbmVkLCB5b3UgZG8gbm90IG5lZWQgdG8gdXNlXHJcblx0ICogYSB0ZW1wb3JhcnkgYXJyYXkuIEluc3RlYWQsIHlvdSBjYW4gZGlyZWN0bHkgYXNzaWduIGFuIGFycmF5IGxpdGVyYWwgdGhhdFxyXG5cdCAqIGNvbnRhaW5zIG9uZSBvciBtb3JlIGZpbHRlciBvYmplY3RzIHRoYXQgeW91IGNyZWF0ZS4gVGhlIGZpcnN0IGV4YW1wbGUgaW5cclxuXHQgKiB0aGUgRXhhbXBsZXMgc2VjdGlvbiBhZGRzIGEgZHJvcCBzaGFkb3cgZmlsdGVyIGJ5IHVzaW5nIGNvZGUgdGhhdCBoYW5kbGVzXHJcblx0ICogYm90aCBkZWZpbmVkIGFuZCB1bmRlZmluZWQgPGNvZGU+ZmlsdGVyczwvY29kZT4gYXJyYXlzLjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPlRvIG1vZGlmeSBhbiBleGlzdGluZyBmaWx0ZXIgb2JqZWN0LCB5b3UgbXVzdCB1c2UgdGhlIHRlY2huaXF1ZSBvZlxyXG5cdCAqIG1vZGlmeWluZyBhIGNvcHkgb2YgdGhlIDxjb2RlPmZpbHRlcnM8L2NvZGU+IGFycmF5OjwvcD5cclxuXHQgKlxyXG5cdCAqIDxvbD5cclxuXHQgKiAgIDxsaT5Bc3NpZ24gdGhlIHZhbHVlIG9mIHRoZSA8Y29kZT5maWx0ZXJzPC9jb2RlPiBhcnJheSB0byBhIHRlbXBvcmFyeVxyXG5cdCAqIGFycmF5LCBzdWNoIGFzIG9uZSBuYW1lZCA8Y29kZT5teUZpbHRlcnM8L2NvZGU+LjwvbGk+XHJcblx0ICogICA8bGk+TW9kaWZ5IHRoZSBwcm9wZXJ0eSBieSB1c2luZyB0aGUgdGVtcG9yYXJ5IGFycmF5LFxyXG5cdCAqIDxjb2RlPm15RmlsdGVyczwvY29kZT4uIEZvciBleGFtcGxlLCB0byBzZXQgdGhlIHF1YWxpdHkgcHJvcGVydHkgb2YgdGhlXHJcblx0ICogZmlyc3QgZmlsdGVyIGluIHRoZSBhcnJheSwgeW91IGNvdWxkIHVzZSB0aGUgZm9sbG93aW5nIGNvZGU6XHJcblx0ICogPGNvZGU+bXlGaWx0ZXJzWzBdLnF1YWxpdHkgPSAxOzwvY29kZT48L2xpPlxyXG5cdCAqICAgPGxpPkFzc2lnbiB0aGUgdmFsdWUgb2YgdGhlIHRlbXBvcmFyeSBhcnJheSB0byB0aGUgPGNvZGU+ZmlsdGVyczwvY29kZT5cclxuXHQgKiBhcnJheS48L2xpPlxyXG5cdCAqIDwvb2w+XHJcblx0ICpcclxuXHQgKiA8cD5BdCBsb2FkIHRpbWUsIGlmIGEgZGlzcGxheSBvYmplY3QgaGFzIGFuIGFzc29jaWF0ZWQgZmlsdGVyLCBpdCBpc1xyXG5cdCAqIG1hcmtlZCB0byBjYWNoZSBpdHNlbGYgYXMgYSB0cmFuc3BhcmVudCBiaXRtYXAuIEZyb20gdGhpcyBwb2ludCBmb3J3YXJkLFxyXG5cdCAqIGFzIGxvbmcgYXMgdGhlIGRpc3BsYXkgb2JqZWN0IGhhcyBhIHZhbGlkIGZpbHRlciBsaXN0LCB0aGUgcGxheWVyIGNhY2hlc1xyXG5cdCAqIHRoZSBkaXNwbGF5IG9iamVjdCBhcyBhIGJpdG1hcC4gVGhpcyBzb3VyY2UgYml0bWFwIGlzIHVzZWQgYXMgYSBzb3VyY2VcclxuXHQgKiBpbWFnZSBmb3IgdGhlIGZpbHRlciBlZmZlY3RzLiBFYWNoIGRpc3BsYXkgb2JqZWN0IHVzdWFsbHkgaGFzIHR3byBiaXRtYXBzOlxyXG5cdCAqIG9uZSB3aXRoIHRoZSBvcmlnaW5hbCB1bmZpbHRlcmVkIHNvdXJjZSBkaXNwbGF5IG9iamVjdCBhbmQgYW5vdGhlciBmb3IgdGhlXHJcblx0ICogZmluYWwgaW1hZ2UgYWZ0ZXIgZmlsdGVyaW5nLiBUaGUgZmluYWwgaW1hZ2UgaXMgdXNlZCB3aGVuIHJlbmRlcmluZy4gQXNcclxuXHQgKiBsb25nIGFzIHRoZSBkaXNwbGF5IG9iamVjdCBkb2VzIG5vdCBjaGFuZ2UsIHRoZSBmaW5hbCBpbWFnZSBkb2VzIG5vdCBuZWVkXHJcblx0ICogdXBkYXRpbmcuPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+VGhlIGZsYXNoLmZpbHRlcnMgcGFja2FnZSBpbmNsdWRlcyBjbGFzc2VzIGZvciBmaWx0ZXJzLiBGb3IgZXhhbXBsZSwgdG9cclxuXHQgKiBjcmVhdGUgYSBEcm9wU2hhZG93IGZpbHRlciwgeW91IHdvdWxkIHdyaXRlOjwvcD5cclxuXHQgKlxyXG5cdCAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciBXaGVuIDxjb2RlPmZpbHRlcnM8L2NvZGU+IGluY2x1ZGVzIGEgU2hhZGVyRmlsdGVyXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIGFuZCB0aGUgc2hhZGVyIG91dHB1dCB0eXBlIGlzIG5vdCBjb21wYXRpYmxlIHdpdGhcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgdGhpcyBvcGVyYXRpb24odGhlIHNoYWRlciBtdXN0IHNwZWNpZnkgYVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5waXhlbDQ8L2NvZGU+IG91dHB1dCkuXHJcblx0ICogQHRocm93cyBBcmd1bWVudEVycm9yIFdoZW4gPGNvZGU+ZmlsdGVyczwvY29kZT4gaW5jbHVkZXMgYSBTaGFkZXJGaWx0ZXJcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgYW5kIHRoZSBzaGFkZXIgZG9lc24ndCBzcGVjaWZ5IGFueSBpbWFnZSBpbnB1dCBvclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICB0aGUgZmlyc3QgaW5wdXQgaXMgbm90IGFuIDxjb2RlPmltYWdlNDwvY29kZT4gaW5wdXQuXHJcblx0ICogQHRocm93cyBBcmd1bWVudEVycm9yIFdoZW4gPGNvZGU+ZmlsdGVyczwvY29kZT4gaW5jbHVkZXMgYSBTaGFkZXJGaWx0ZXJcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgYW5kIHRoZSBzaGFkZXIgc3BlY2lmaWVzIGFuIGltYWdlIGlucHV0IHRoYXQgaXNuJ3RcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZWQuXHJcblx0ICogQHRocm93cyBBcmd1bWVudEVycm9yIFdoZW4gPGNvZGU+ZmlsdGVyczwvY29kZT4gaW5jbHVkZXMgYSBTaGFkZXJGaWx0ZXIsIGFcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgQnl0ZUFycmF5IG9yIFZlY3Rvci48TnVtYmVyPiBpbnN0YW5jZSBhcyBhIHNoYWRlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBpbnB1dCwgYW5kIHRoZSA8Y29kZT53aWR0aDwvY29kZT4gYW5kXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPmhlaWdodDwvY29kZT4gcHJvcGVydGllcyBhcmVuJ3Qgc3BlY2lmaWVkIGZvclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICB0aGUgU2hhZGVySW5wdXQgb2JqZWN0LCBvciB0aGUgc3BlY2lmaWVkIHZhbHVlc1xyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBkb24ndCBtYXRjaCB0aGUgYW1vdW50IG9mIGRhdGEgaW4gdGhlIGlucHV0IGRhdGEuXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIFNlZSB0aGUgPGNvZGU+U2hhZGVySW5wdXQuaW5wdXQ8L2NvZGU+IHByb3BlcnR5IGZvclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBtb3JlIGluZm9ybWF0aW9uLlxyXG5cdCAqL1xyXG4vL1x0XHRwdWJsaWMgZmlsdGVyczpBcnJheTxEeW5hbWljPjtcclxuXHJcblx0LyoqXHJcblx0ICogSW5kaWNhdGVzIHRoZSBoZWlnaHQgb2YgdGhlIGRpc3BsYXkgb2JqZWN0LCBpbiBwaXhlbHMuIFRoZSBoZWlnaHQgaXNcclxuXHQgKiBjYWxjdWxhdGVkIGJhc2VkIG9uIHRoZSBib3VuZHMgb2YgdGhlIGNvbnRlbnQgb2YgdGhlIGRpc3BsYXkgb2JqZWN0LiBXaGVuXHJcblx0ICogeW91IHNldCB0aGUgPGNvZGU+aGVpZ2h0PC9jb2RlPiBwcm9wZXJ0eSwgdGhlIDxjb2RlPnNjYWxlWTwvY29kZT4gcHJvcGVydHlcclxuXHQgKiBpcyBhZGp1c3RlZCBhY2NvcmRpbmdseSwgYXMgc2hvd24gaW4gdGhlIGZvbGxvd2luZyBjb2RlOlxyXG5cdCAqXHJcblx0ICogPHA+RXhjZXB0IGZvciBUZXh0RmllbGQgYW5kIFZpZGVvIG9iamVjdHMsIGEgZGlzcGxheSBvYmplY3Qgd2l0aCBub1xyXG5cdCAqIGNvbnRlbnQgKHN1Y2ggYXMgYW4gZW1wdHkgc3ByaXRlKSBoYXMgYSBoZWlnaHQgb2YgMCwgZXZlbiBpZiB5b3UgdHJ5IHRvXHJcblx0ICogc2V0IDxjb2RlPmhlaWdodDwvY29kZT4gdG8gYSBkaWZmZXJlbnQgdmFsdWUuPC9wPlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgaGVpZ2h0KCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX3BCb3VuZHNJbnZhbGlkKVxyXG5cdFx0XHR0aGlzLnBVcGRhdGVCb3VuZHMoKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5faGVpZ2h0O1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBoZWlnaHQodmFsOm51bWJlcilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5faGVpZ2h0ID09IHZhbClcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX2hlaWdodCA9PSB2YWw7XHJcblxyXG5cdFx0dGhpcy5fcFNjYWxlWSA9IHZhbC90aGlzLmJvdW5kcy5hYWJiLmhlaWdodDtcclxuXHJcblx0XHR0aGlzLmludmFsaWRhdGVTY2FsZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSW5kaWNhdGVzIHRoZSBpbnN0YW5jZSBjb250YWluZXIgaW5kZXggb2YgdGhlIERpc3BsYXlPYmplY3QuIFRoZSBvYmplY3QgY2FuIGJlXHJcblx0ICogaWRlbnRpZmllZCBpbiB0aGUgY2hpbGQgbGlzdCBvZiBpdHMgcGFyZW50IGRpc3BsYXkgb2JqZWN0IGNvbnRhaW5lciBieVxyXG5cdCAqIGNhbGxpbmcgdGhlIDxjb2RlPmdldENoaWxkQnlJbmRleCgpPC9jb2RlPiBtZXRob2Qgb2YgdGhlIGRpc3BsYXkgb2JqZWN0XHJcblx0ICogY29udGFpbmVyLlxyXG5cdCAqXHJcblx0ICogPHA+SWYgdGhlIERpc3BsYXlPYmplY3QgaGFzIG5vIHBhcmVudCBjb250YWluZXIsIGluZGV4IGRlZmF1bHRzIHRvIDAuPC9wPlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgaW5kZXgoKTpudW1iZXJcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fcFBhcmVudClcclxuXHRcdFx0cmV0dXJuIHRoaXMuX3BQYXJlbnQuZ2V0Q2hpbGRJbmRleCh0aGlzKTtcclxuXHJcblx0XHRyZXR1cm4gMDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCBpbnZlcnNlU2NlbmVUcmFuc2Zvcm0oKTpNYXRyaXgzRFxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9pbnZlcnNlU2NlbmVUcmFuc2Zvcm1EaXJ0eSkge1xyXG5cdFx0XHR0aGlzLl9pbnZlcnNlU2NlbmVUcmFuc2Zvcm0uY29weUZyb20odGhpcy5zY2VuZVRyYW5zZm9ybSk7XHJcblx0XHRcdHRoaXMuX2ludmVyc2VTY2VuZVRyYW5zZm9ybS5pbnZlcnQoKTtcclxuXHRcdFx0dGhpcy5faW52ZXJzZVNjZW5lVHJhbnNmb3JtRGlydHkgPSBmYWxzZTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzLl9pbnZlcnNlU2NlbmVUcmFuc2Zvcm07XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgaWdub3JlVHJhbnNmb3JtKCk6Ym9vbGVhblxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9wSWdub3JlVHJhbnNmb3JtO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBpZ25vcmVUcmFuc2Zvcm0odmFsdWU6Ym9vbGVhbilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fcElnbm9yZVRyYW5zZm9ybSA9PSB2YWx1ZSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX3BJZ25vcmVUcmFuc2Zvcm0gPSB2YWx1ZTtcclxuXHJcblx0XHRpZiAodmFsdWUpIHtcclxuXHRcdFx0dGhpcy5fcFNjZW5lVHJhbnNmb3JtLmlkZW50aXR5KCk7XHJcblx0XHRcdHRoaXMuX3NjZW5lUG9zaXRpb24uc2V0VG8oMCwgMCwgMCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5wSW52YWxpZGF0ZVNjZW5lVHJhbnNmb3JtKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgaXNFbnRpdHkoKVxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9wSXNFbnRpdHk7XHJcblx0fVxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgYSBMb2FkZXJJbmZvIG9iamVjdCBjb250YWluaW5nIGluZm9ybWF0aW9uIGFib3V0IGxvYWRpbmcgdGhlIGZpbGVcclxuXHQgKiB0byB3aGljaCB0aGlzIGRpc3BsYXkgb2JqZWN0IGJlbG9uZ3MuIFRoZSA8Y29kZT5sb2FkZXJJbmZvPC9jb2RlPiBwcm9wZXJ0eVxyXG5cdCAqIGlzIGRlZmluZWQgb25seSBmb3IgdGhlIHJvb3QgZGlzcGxheSBvYmplY3Qgb2YgYSBTV0YgZmlsZSBvciBmb3IgYSBsb2FkZWRcclxuXHQgKiBCaXRtYXAobm90IGZvciBhIEJpdG1hcCB0aGF0IGlzIGRyYXduIHdpdGggQWN0aW9uU2NyaXB0KS4gVG8gZmluZCB0aGVcclxuXHQgKiA8Y29kZT5sb2FkZXJJbmZvPC9jb2RlPiBvYmplY3QgYXNzb2NpYXRlZCB3aXRoIHRoZSBTV0YgZmlsZSB0aGF0IGNvbnRhaW5zXHJcblx0ICogYSBkaXNwbGF5IG9iamVjdCBuYW1lZCA8Y29kZT5teURpc3BsYXlPYmplY3Q8L2NvZGU+LCB1c2VcclxuXHQgKiA8Y29kZT5teURpc3BsYXlPYmplY3Qucm9vdC5sb2FkZXJJbmZvPC9jb2RlPi5cclxuXHQgKlxyXG5cdCAqIDxwPkEgbGFyZ2UgU1dGIGZpbGUgY2FuIG1vbml0b3IgaXRzIGRvd25sb2FkIGJ5IGNhbGxpbmdcclxuXHQgKiA8Y29kZT50aGlzLnJvb3QubG9hZGVySW5mby5hZGRFdmVudExpc3RlbmVyKEV2ZW50LkNPTVBMRVRFLFxyXG5cdCAqIGZ1bmMpPC9jb2RlPi48L3A+XHJcblx0ICovXHJcblx0cHVibGljIGdldCBsb2FkZXJJbmZvKCk6TG9hZGVySW5mb1xyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9sb2FkZXJJbmZvO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGNhbGxpbmcgZGlzcGxheSBvYmplY3QgaXMgbWFza2VkIGJ5IHRoZSBzcGVjaWZpZWQgPGNvZGU+bWFzazwvY29kZT5cclxuXHQgKiBvYmplY3QuIFRvIGVuc3VyZSB0aGF0IG1hc2tpbmcgd29ya3Mgd2hlbiB0aGUgU3RhZ2UgaXMgc2NhbGVkLCB0aGVcclxuXHQgKiA8Y29kZT5tYXNrPC9jb2RlPiBkaXNwbGF5IG9iamVjdCBtdXN0IGJlIGluIGFuIGFjdGl2ZSBwYXJ0IG9mIHRoZSBkaXNwbGF5XHJcblx0ICogbGlzdC4gVGhlIDxjb2RlPm1hc2s8L2NvZGU+IG9iamVjdCBpdHNlbGYgaXMgbm90IGRyYXduLiBTZXRcclxuXHQgKiA8Y29kZT5tYXNrPC9jb2RlPiB0byA8Y29kZT5udWxsPC9jb2RlPiB0byByZW1vdmUgdGhlIG1hc2suXHJcblx0ICpcclxuXHQgKiA8cD5UbyBiZSBhYmxlIHRvIHNjYWxlIGEgbWFzayBvYmplY3QsIGl0IG11c3QgYmUgb24gdGhlIGRpc3BsYXkgbGlzdC4gVG9cclxuXHQgKiBiZSBhYmxlIHRvIGRyYWcgYSBtYXNrIFNwcml0ZSBvYmplY3QoYnkgY2FsbGluZyBpdHNcclxuXHQgKiA8Y29kZT5zdGFydERyYWcoKTwvY29kZT4gbWV0aG9kKSwgaXQgbXVzdCBiZSBvbiB0aGUgZGlzcGxheSBsaXN0LiBUbyBjYWxsXHJcblx0ICogdGhlIDxjb2RlPnN0YXJ0RHJhZygpPC9jb2RlPiBtZXRob2QgZm9yIGEgbWFzayBzcHJpdGUgYmFzZWQgb24gYVxyXG5cdCAqIDxjb2RlPm1vdXNlRG93bjwvY29kZT4gZXZlbnQgYmVpbmcgZGlzcGF0Y2hlZCBieSB0aGUgc3ByaXRlLCBzZXQgdGhlXHJcblx0ICogc3ByaXRlJ3MgPGNvZGU+YnV0dG9uTW9kZTwvY29kZT4gcHJvcGVydHkgdG8gPGNvZGU+dHJ1ZTwvY29kZT4uPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+V2hlbiBkaXNwbGF5IG9iamVjdHMgYXJlIGNhY2hlZCBieSBzZXR0aW5nIHRoZVxyXG5cdCAqIDxjb2RlPmNhY2hlQXNCaXRtYXA8L2NvZGU+IHByb3BlcnR5IHRvIDxjb2RlPnRydWU8L2NvZGU+IGFuIHRoZVxyXG5cdCAqIDxjb2RlPmNhY2hlQXNCaXRtYXBNYXRyaXg8L2NvZGU+IHByb3BlcnR5IHRvIGEgTWF0cml4IG9iamVjdCwgYm90aCB0aGVcclxuXHQgKiBtYXNrIGFuZCB0aGUgZGlzcGxheSBvYmplY3QgYmVpbmcgbWFza2VkIG11c3QgYmUgcGFydCBvZiB0aGUgc2FtZSBjYWNoZWRcclxuXHQgKiBiaXRtYXAuIFRodXMsIGlmIHRoZSBkaXNwbGF5IG9iamVjdCBpcyBjYWNoZWQsIHRoZW4gdGhlIG1hc2sgbXVzdCBiZSBhXHJcblx0ICogY2hpbGQgb2YgdGhlIGRpc3BsYXkgb2JqZWN0LiBJZiBhbiBhbmNlc3RvciBvZiB0aGUgZGlzcGxheSBvYmplY3Qgb24gdGhlXHJcblx0ICogZGlzcGxheSBsaXN0IGlzIGNhY2hlZCwgdGhlbiB0aGUgbWFzayBtdXN0IGJlIGEgY2hpbGQgb2YgdGhhdCBhbmNlc3RvciBvclxyXG5cdCAqIG9uZSBvZiBpdHMgZGVzY2VuZGVudHMuIElmIG1vcmUgdGhhbiBvbmUgYW5jZXN0b3Igb2YgdGhlIG1hc2tlZCBvYmplY3QgaXNcclxuXHQgKiBjYWNoZWQsIHRoZW4gdGhlIG1hc2sgbXVzdCBiZSBhIGRlc2NlbmRlbnQgb2YgdGhlIGNhY2hlZCBjb250YWluZXIgY2xvc2VzdFxyXG5cdCAqIHRvIHRoZSBtYXNrZWQgb2JqZWN0IGluIHRoZSBkaXNwbGF5IGxpc3QuPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+PGI+Tm90ZTo8L2I+IEEgc2luZ2xlIDxjb2RlPm1hc2s8L2NvZGU+IG9iamVjdCBjYW5ub3QgYmUgdXNlZCB0byBtYXNrXHJcblx0ICogbW9yZSB0aGFuIG9uZSBjYWxsaW5nIGRpc3BsYXkgb2JqZWN0LiBXaGVuIHRoZSA8Y29kZT5tYXNrPC9jb2RlPiBpc1xyXG5cdCAqIGFzc2lnbmVkIHRvIGEgc2Vjb25kIGRpc3BsYXkgb2JqZWN0LCBpdCBpcyByZW1vdmVkIGFzIHRoZSBtYXNrIG9mIHRoZVxyXG5cdCAqIGZpcnN0IG9iamVjdCwgYW5kIHRoYXQgb2JqZWN0J3MgPGNvZGU+bWFzazwvY29kZT4gcHJvcGVydHkgYmVjb21lc1xyXG5cdCAqIDxjb2RlPm51bGw8L2NvZGU+LjwvcD5cclxuXHQgKi9cclxuXHRwdWJsaWMgbWFzazpEaXNwbGF5T2JqZWN0O1xyXG5cclxuXHQvKipcclxuXHQgKiBTcGVjaWZpZXMgd2hldGhlciB0aGlzIG9iamVjdCByZWNlaXZlcyBtb3VzZSwgb3Igb3RoZXIgdXNlciBpbnB1dCxcclxuXHQgKiBtZXNzYWdlcy4gVGhlIGRlZmF1bHQgdmFsdWUgaXMgPGNvZGU+dHJ1ZTwvY29kZT4sIHdoaWNoIG1lYW5zIHRoYXQgYnlcclxuXHQgKiBkZWZhdWx0IGFueSBJbnRlcmFjdGl2ZU9iamVjdCBpbnN0YW5jZSB0aGF0IGlzIG9uIHRoZSBkaXNwbGF5IGxpc3RcclxuXHQgKiByZWNlaXZlcyBtb3VzZSBldmVudHMgb3Igb3RoZXIgdXNlciBpbnB1dCBldmVudHMuIElmXHJcblx0ICogPGNvZGU+bW91c2VFbmFibGVkPC9jb2RlPiBpcyBzZXQgdG8gPGNvZGU+ZmFsc2U8L2NvZGU+LCB0aGUgaW5zdGFuY2UgZG9lc1xyXG5cdCAqIG5vdCByZWNlaXZlIGFueSBtb3VzZSBldmVudHMob3Igb3RoZXIgdXNlciBpbnB1dCBldmVudHMgbGlrZSBrZXlib2FyZFxyXG5cdCAqIGV2ZW50cykuIEFueSBjaGlsZHJlbiBvZiB0aGlzIGluc3RhbmNlIG9uIHRoZSBkaXNwbGF5IGxpc3QgYXJlIG5vdFxyXG5cdCAqIGFmZmVjdGVkLiBUbyBjaGFuZ2UgdGhlIDxjb2RlPm1vdXNlRW5hYmxlZDwvY29kZT4gYmVoYXZpb3IgZm9yIGFsbFxyXG5cdCAqIGNoaWxkcmVuIG9mIGFuIG9iamVjdCBvbiB0aGUgZGlzcGxheSBsaXN0LCB1c2VcclxuXHQgKiA8Y29kZT5mbGFzaC5kaXNwbGF5LkRpc3BsYXlPYmplY3RDb250YWluZXIubW91c2VDaGlsZHJlbjwvY29kZT4uXHJcblx0ICpcclxuXHQgKiA8cD4gTm8gZXZlbnQgaXMgZGlzcGF0Y2hlZCBieSBzZXR0aW5nIHRoaXMgcHJvcGVydHkuIFlvdSBtdXN0IHVzZSB0aGVcclxuXHQgKiA8Y29kZT5hZGRFdmVudExpc3RlbmVyKCk8L2NvZGU+IG1ldGhvZCB0byBjcmVhdGUgaW50ZXJhY3RpdmVcclxuXHQgKiBmdW5jdGlvbmFsaXR5LjwvcD5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IG1vdXNlRW5hYmxlZCgpOmJvb2xlYW5cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fZXhwbGljaXRNb3VzZUVuYWJsZWQ7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IG1vdXNlRW5hYmxlZCh2YWx1ZTpib29sZWFuKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9leHBsaWNpdE1vdXNlRW5hYmxlZCA9PSB2YWx1ZSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX2V4cGxpY2l0TW91c2VFbmFibGVkID0gdmFsdWU7XHJcblxyXG5cdFx0dGhpcy5fcFVwZGF0ZUltcGxpY2l0TW91c2VFbmFibGVkKHRoaXMuX3BQYXJlbnQ/IHRoaXMuX3BQYXJlbnQubW91c2VDaGlsZHJlbiA6IHRydWUpO1xyXG5cdH1cclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIEluZGljYXRlcyB0aGUgeCBjb29yZGluYXRlIG9mIHRoZSBtb3VzZSBvciB1c2VyIGlucHV0IGRldmljZSBwb3NpdGlvbiwgaW5cclxuXHQgKiBwaXhlbHMuXHJcblx0ICpcclxuXHQgKiA8cD48Yj5Ob3RlPC9iPjogRm9yIGEgRGlzcGxheU9iamVjdCB0aGF0IGhhcyBiZWVuIHJvdGF0ZWQsIHRoZSByZXR1cm5lZCB4XHJcblx0ICogY29vcmRpbmF0ZSB3aWxsIHJlZmxlY3QgdGhlIG5vbi1yb3RhdGVkIG9iamVjdC48L3A+XHJcblx0ICovXHJcblx0cHVibGljIGdldCBtb3VzZVgoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fbW91c2VYO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSW5kaWNhdGVzIHRoZSB5IGNvb3JkaW5hdGUgb2YgdGhlIG1vdXNlIG9yIHVzZXIgaW5wdXQgZGV2aWNlIHBvc2l0aW9uLCBpblxyXG5cdCAqIHBpeGVscy5cclxuXHQgKlxyXG5cdCAqIDxwPjxiPk5vdGU8L2I+OiBGb3IgYSBEaXNwbGF5T2JqZWN0IHRoYXQgaGFzIGJlZW4gcm90YXRlZCwgdGhlIHJldHVybmVkIHlcclxuXHQgKiBjb29yZGluYXRlIHdpbGwgcmVmbGVjdCB0aGUgbm9uLXJvdGF0ZWQgb2JqZWN0LjwvcD5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IG1vdXNlWSgpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9tb3VzZVk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJbmRpY2F0ZXMgdGhlIGluc3RhbmNlIG5hbWUgb2YgdGhlIERpc3BsYXlPYmplY3QuIFRoZSBvYmplY3QgY2FuIGJlXHJcblx0ICogaWRlbnRpZmllZCBpbiB0aGUgY2hpbGQgbGlzdCBvZiBpdHMgcGFyZW50IGRpc3BsYXkgb2JqZWN0IGNvbnRhaW5lciBieVxyXG5cdCAqIGNhbGxpbmcgdGhlIDxjb2RlPmdldENoaWxkQnlOYW1lKCk8L2NvZGU+IG1ldGhvZCBvZiB0aGUgZGlzcGxheSBvYmplY3RcclxuXHQgKiBjb250YWluZXIuXHJcblx0ICpcclxuXHQgKiBAdGhyb3dzIElsbGVnYWxPcGVyYXRpb25FcnJvciBJZiB5b3UgYXJlIGF0dGVtcHRpbmcgdG8gc2V0IHRoaXMgcHJvcGVydHlcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbiBhbiBvYmplY3QgdGhhdCB3YXMgcGxhY2VkIG9uIHRoZSB0aW1lbGluZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluIHRoZSBGbGFzaCBhdXRob3JpbmcgdG9vbC5cclxuXHQgKi9cclxuXHRwdWJsaWMgbmFtZTpzdHJpbmc7XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIG9yaWVudGF0aW9uTW9kZTpzdHJpbmcgPSBPcmllbnRhdGlvbk1vZGUuREVGQVVMVDtcclxuXHJcblx0LyoqXHJcblx0ICogSW5kaWNhdGVzIHRoZSBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIG9iamVjdCB0aGF0IGNvbnRhaW5zIHRoaXMgZGlzcGxheVxyXG5cdCAqIG9iamVjdC4gVXNlIHRoZSA8Y29kZT5wYXJlbnQ8L2NvZGU+IHByb3BlcnR5IHRvIHNwZWNpZnkgYSByZWxhdGl2ZSBwYXRoIHRvXHJcblx0ICogZGlzcGxheSBvYmplY3RzIHRoYXQgYXJlIGFib3ZlIHRoZSBjdXJyZW50IGRpc3BsYXkgb2JqZWN0IGluIHRoZSBkaXNwbGF5XHJcblx0ICogbGlzdCBoaWVyYXJjaHkuXHJcblx0ICpcclxuXHQgKiA8cD5Zb3UgY2FuIHVzZSA8Y29kZT5wYXJlbnQ8L2NvZGU+IHRvIG1vdmUgdXAgbXVsdGlwbGUgbGV2ZWxzIGluIHRoZVxyXG5cdCAqIGRpc3BsYXkgbGlzdCBhcyBpbiB0aGUgZm9sbG93aW5nOjwvcD5cclxuXHQgKlxyXG5cdCAqIEB0aHJvd3MgU2VjdXJpdHlFcnJvciBUaGUgcGFyZW50IGRpc3BsYXkgb2JqZWN0IGJlbG9uZ3MgdG8gYSBzZWN1cml0eVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBzYW5kYm94IHRvIHdoaWNoIHlvdSBkbyBub3QgaGF2ZSBhY2Nlc3MuIFlvdSBjYW5cclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgYXZvaWQgdGhpcyBzaXR1YXRpb24gYnkgaGF2aW5nIHRoZSBwYXJlbnQgbW92aWUgY2FsbFxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICB0aGUgPGNvZGU+U2VjdXJpdHkuYWxsb3dEb21haW4oKTwvY29kZT4gbWV0aG9kLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgcGFyZW50KCk6RGlzcGxheU9iamVjdENvbnRhaW5lclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9wUGFyZW50O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHBhcnRpdGlvbigpOlBhcnRpdGlvblxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9leHBsaWNpdFBhcnRpdGlvbjtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgcGFydGl0aW9uKHZhbHVlOlBhcnRpdGlvbilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fZXhwbGljaXRQYXJ0aXRpb24gPT0gdmFsdWUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHRpZiAodGhpcy5fcFNjZW5lICYmIHRoaXMuX2V4cGxpY2l0UGFydGl0aW9uKVxyXG5cdFx0XHR0aGlzLl9wU2NlbmUuaVVucmVnaXN0ZXJQYXJ0aXRpb24odGhpcy5fZXhwbGljaXRQYXJ0aXRpb24pO1xyXG5cclxuXHRcdHRoaXMuX2V4cGxpY2l0UGFydGl0aW9uID0gdmFsdWU7XHJcblxyXG5cdFx0aWYgKHRoaXMuX3BTY2VuZSAmJiB2YWx1ZSlcclxuXHRcdFx0dGhpcy5fcFNjZW5lLmlSZWdpc3RlclBhcnRpdGlvbih2YWx1ZSk7XHJcblxyXG5cdFx0dGhpcy5fcFVwZGF0ZUltcGxpY2l0UGFydGl0aW9uKHRoaXMuX3BQYXJlbnQ/IHRoaXMuX3BQYXJlbnQuX2lBc3NpZ25lZFBhcnRpdGlvbiA6IG51bGwpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHBhcnRpdGlvbk5vZGUoKTpFbnRpdHlOb2RlXHJcblx0e1xyXG5cdFx0aWYgKCF0aGlzLl9wYXJ0aXRpb25Ob2RlKVxyXG5cdFx0XHR0aGlzLl9wYXJ0aXRpb25Ob2RlID0gdGhpcy5wQ3JlYXRlRW50aXR5UGFydGl0aW9uTm9kZSgpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLl9wYXJ0aXRpb25Ob2RlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHBpY2tpbmdDb2xsaWRlcigpOklQaWNraW5nQ29sbGlkZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcFBpY2tpbmdDb2xsaWRlcjtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgcGlja2luZ0NvbGxpZGVyKHZhbHVlOklQaWNraW5nQ29sbGlkZXIpXHJcblx0e1xyXG5cdFx0dGhpcy5fcFBpY2tpbmdDb2xsaWRlciA9IHZhbHVlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRGVmaW5lcyB0aGUgbG9jYWwgcG9pbnQgYXJvdW5kIHdoaWNoIHRoZSBvYmplY3Qgcm90YXRlcy5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHBpdm90KCk6VmVjdG9yM0RcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcGl2b3Q7XHJcblx0fVxyXG5cclxuXHJcblx0cHVibGljIHNldCBwaXZvdChwaXZvdDpWZWN0b3IzRClcclxuXHR7XHJcblx0XHR0aGlzLl9waXZvdCA9IHBpdm90LmNsb25lKCk7XHJcblxyXG5cdFx0dGhpcy5pbnZhbGlkYXRlUGl2b3QoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEZvciBhIGRpc3BsYXkgb2JqZWN0IGluIGEgbG9hZGVkIFNXRiBmaWxlLCB0aGUgPGNvZGU+cm9vdDwvY29kZT4gcHJvcGVydHlcclxuXHQgKiBpcyB0aGUgdG9wLW1vc3QgZGlzcGxheSBvYmplY3QgaW4gdGhlIHBvcnRpb24gb2YgdGhlIGRpc3BsYXkgbGlzdCdzIHRyZWVcclxuXHQgKiBzdHJ1Y3R1cmUgcmVwcmVzZW50ZWQgYnkgdGhhdCBTV0YgZmlsZS4gRm9yIGEgQml0bWFwIG9iamVjdCByZXByZXNlbnRpbmcgYVxyXG5cdCAqIGxvYWRlZCBpbWFnZSBmaWxlLCB0aGUgPGNvZGU+cm9vdDwvY29kZT4gcHJvcGVydHkgaXMgdGhlIEJpdG1hcCBvYmplY3RcclxuXHQgKiBpdHNlbGYuIEZvciB0aGUgaW5zdGFuY2Ugb2YgdGhlIG1haW4gY2xhc3Mgb2YgdGhlIGZpcnN0IFNXRiBmaWxlIGxvYWRlZCxcclxuXHQgKiB0aGUgPGNvZGU+cm9vdDwvY29kZT4gcHJvcGVydHkgaXMgdGhlIGRpc3BsYXkgb2JqZWN0IGl0c2VsZi4gVGhlXHJcblx0ICogPGNvZGU+cm9vdDwvY29kZT4gcHJvcGVydHkgb2YgdGhlIFNjZW5lIG9iamVjdCBpcyB0aGUgU2NlbmUgb2JqZWN0IGl0c2VsZi5cclxuXHQgKiBUaGUgPGNvZGU+cm9vdDwvY29kZT4gcHJvcGVydHkgaXMgc2V0IHRvIDxjb2RlPm51bGw8L2NvZGU+IGZvciBhbnkgZGlzcGxheVxyXG5cdCAqIG9iamVjdCB0aGF0IGhhcyBub3QgYmVlbiBhZGRlZCB0byB0aGUgZGlzcGxheSBsaXN0LCB1bmxlc3MgaXQgaGFzIGJlZW5cclxuXHQgKiBhZGRlZCB0byBhIGRpc3BsYXkgb2JqZWN0IGNvbnRhaW5lciB0aGF0IGlzIG9mZiB0aGUgZGlzcGxheSBsaXN0IGJ1dCB0aGF0XHJcblx0ICogaXMgYSBjaGlsZCBvZiB0aGUgdG9wLW1vc3QgZGlzcGxheSBvYmplY3QgaW4gYSBsb2FkZWQgU1dGIGZpbGUuXHJcblx0ICpcclxuXHQgKiA8cD5Gb3IgZXhhbXBsZSwgaWYgeW91IGNyZWF0ZSBhIG5ldyBTcHJpdGUgb2JqZWN0IGJ5IGNhbGxpbmcgdGhlXHJcblx0ICogPGNvZGU+U3ByaXRlKCk8L2NvZGU+IGNvbnN0cnVjdG9yIG1ldGhvZCwgaXRzIDxjb2RlPnJvb3Q8L2NvZGU+IHByb3BlcnR5XHJcblx0ICogaXMgPGNvZGU+bnVsbDwvY29kZT4gdW50aWwgeW91IGFkZCBpdCB0byB0aGUgZGlzcGxheSBsaXN0KG9yIHRvIGEgZGlzcGxheVxyXG5cdCAqIG9iamVjdCBjb250YWluZXIgdGhhdCBpcyBvZmYgdGhlIGRpc3BsYXkgbGlzdCBidXQgdGhhdCBpcyBhIGNoaWxkIG9mIHRoZVxyXG5cdCAqIHRvcC1tb3N0IGRpc3BsYXkgb2JqZWN0IGluIGEgU1dGIGZpbGUpLjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPkZvciBhIGxvYWRlZCBTV0YgZmlsZSwgZXZlbiB0aG91Z2ggdGhlIExvYWRlciBvYmplY3QgdXNlZCB0byBsb2FkIHRoZVxyXG5cdCAqIGZpbGUgbWF5IG5vdCBiZSBvbiB0aGUgZGlzcGxheSBsaXN0LCB0aGUgdG9wLW1vc3QgZGlzcGxheSBvYmplY3QgaW4gdGhlXHJcblx0ICogU1dGIGZpbGUgaGFzIGl0cyA8Y29kZT5yb290PC9jb2RlPiBwcm9wZXJ0eSBzZXQgdG8gaXRzZWxmLiBUaGUgTG9hZGVyXHJcblx0ICogb2JqZWN0IGRvZXMgbm90IGhhdmUgaXRzIDxjb2RlPnJvb3Q8L2NvZGU+IHByb3BlcnR5IHNldCB1bnRpbCBpdCBpcyBhZGRlZFxyXG5cdCAqIGFzIGEgY2hpbGQgb2YgYSBkaXNwbGF5IG9iamVjdCBmb3Igd2hpY2ggdGhlIDxjb2RlPnJvb3Q8L2NvZGU+IHByb3BlcnR5IGlzXHJcblx0ICogc2V0LjwvcD5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHJvb3QoKTpEaXNwbGF5T2JqZWN0Q29udGFpbmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3Jvb3Q7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJbmRpY2F0ZXMgdGhlIHJvdGF0aW9uIG9mIHRoZSBEaXNwbGF5T2JqZWN0IGluc3RhbmNlLCBpbiBkZWdyZWVzLCBmcm9tIGl0c1xyXG5cdCAqIG9yaWdpbmFsIG9yaWVudGF0aW9uLiBWYWx1ZXMgZnJvbSAwIHRvIDE4MCByZXByZXNlbnQgY2xvY2t3aXNlIHJvdGF0aW9uO1xyXG5cdCAqIHZhbHVlcyBmcm9tIDAgdG8gLTE4MCByZXByZXNlbnQgY291bnRlcmNsb2Nrd2lzZSByb3RhdGlvbi4gVmFsdWVzIG91dHNpZGVcclxuXHQgKiB0aGlzIHJhbmdlIGFyZSBhZGRlZCB0byBvciBzdWJ0cmFjdGVkIGZyb20gMzYwIHRvIG9idGFpbiBhIHZhbHVlIHdpdGhpblxyXG5cdCAqIHRoZSByYW5nZS4gRm9yIGV4YW1wbGUsIHRoZSBzdGF0ZW1lbnQgPGNvZGU+bXlfdmlkZW8ucm90YXRpb24gPSA0NTA8L2NvZGU+XHJcblx0ICogaXMgdGhlIHNhbWUgYXMgPGNvZGU+IG15X3ZpZGVvLnJvdGF0aW9uID0gOTA8L2NvZGU+LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyByb3RhdGlvbjpudW1iZXI7IC8vVE9ET1xyXG5cclxuXHQvKipcclxuXHQgKiBJbmRpY2F0ZXMgdGhlIHgtYXhpcyByb3RhdGlvbiBvZiB0aGUgRGlzcGxheU9iamVjdCBpbnN0YW5jZSwgaW4gZGVncmVlcyxcclxuXHQgKiBmcm9tIGl0cyBvcmlnaW5hbCBvcmllbnRhdGlvbiByZWxhdGl2ZSB0byB0aGUgM0QgcGFyZW50IGNvbnRhaW5lci4gVmFsdWVzXHJcblx0ICogZnJvbSAwIHRvIDE4MCByZXByZXNlbnQgY2xvY2t3aXNlIHJvdGF0aW9uOyB2YWx1ZXMgZnJvbSAwIHRvIC0xODBcclxuXHQgKiByZXByZXNlbnQgY291bnRlcmNsb2Nrd2lzZSByb3RhdGlvbi4gVmFsdWVzIG91dHNpZGUgdGhpcyByYW5nZSBhcmUgYWRkZWRcclxuXHQgKiB0byBvciBzdWJ0cmFjdGVkIGZyb20gMzYwIHRvIG9idGFpbiBhIHZhbHVlIHdpdGhpbiB0aGUgcmFuZ2UuXHJcblx0ICovXHJcblx0cHVibGljIGdldCByb3RhdGlvblgoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcm90YXRpb25YKk1hdGhDb25zdHMuUkFESUFOU19UT19ERUdSRUVTO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCByb3RhdGlvblgodmFsOm51bWJlcilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5yb3RhdGlvblggPT0gdmFsKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fcm90YXRpb25YID0gdmFsKk1hdGhDb25zdHMuREVHUkVFU19UT19SQURJQU5TO1xyXG5cclxuXHRcdHRoaXMuaW52YWxpZGF0ZVJvdGF0aW9uKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJbmRpY2F0ZXMgdGhlIHktYXhpcyByb3RhdGlvbiBvZiB0aGUgRGlzcGxheU9iamVjdCBpbnN0YW5jZSwgaW4gZGVncmVlcyxcclxuXHQgKiBmcm9tIGl0cyBvcmlnaW5hbCBvcmllbnRhdGlvbiByZWxhdGl2ZSB0byB0aGUgM0QgcGFyZW50IGNvbnRhaW5lci4gVmFsdWVzXHJcblx0ICogZnJvbSAwIHRvIDE4MCByZXByZXNlbnQgY2xvY2t3aXNlIHJvdGF0aW9uOyB2YWx1ZXMgZnJvbSAwIHRvIC0xODBcclxuXHQgKiByZXByZXNlbnQgY291bnRlcmNsb2Nrd2lzZSByb3RhdGlvbi4gVmFsdWVzIG91dHNpZGUgdGhpcyByYW5nZSBhcmUgYWRkZWRcclxuXHQgKiB0byBvciBzdWJ0cmFjdGVkIGZyb20gMzYwIHRvIG9idGFpbiBhIHZhbHVlIHdpdGhpbiB0aGUgcmFuZ2UuXHJcblx0ICovXHJcblx0cHVibGljIGdldCByb3RhdGlvblkoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcm90YXRpb25ZKk1hdGhDb25zdHMuUkFESUFOU19UT19ERUdSRUVTO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCByb3RhdGlvblkodmFsOm51bWJlcilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5yb3RhdGlvblkgPT0gdmFsKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fcm90YXRpb25ZID0gdmFsKk1hdGhDb25zdHMuREVHUkVFU19UT19SQURJQU5TO1xyXG5cclxuXHRcdHRoaXMuaW52YWxpZGF0ZVJvdGF0aW9uKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJbmRpY2F0ZXMgdGhlIHotYXhpcyByb3RhdGlvbiBvZiB0aGUgRGlzcGxheU9iamVjdCBpbnN0YW5jZSwgaW4gZGVncmVlcyxcclxuXHQgKiBmcm9tIGl0cyBvcmlnaW5hbCBvcmllbnRhdGlvbiByZWxhdGl2ZSB0byB0aGUgM0QgcGFyZW50IGNvbnRhaW5lci4gVmFsdWVzXHJcblx0ICogZnJvbSAwIHRvIDE4MCByZXByZXNlbnQgY2xvY2t3aXNlIHJvdGF0aW9uOyB2YWx1ZXMgZnJvbSAwIHRvIC0xODBcclxuXHQgKiByZXByZXNlbnQgY291bnRlcmNsb2Nrd2lzZSByb3RhdGlvbi4gVmFsdWVzIG91dHNpZGUgdGhpcyByYW5nZSBhcmUgYWRkZWRcclxuXHQgKiB0byBvciBzdWJ0cmFjdGVkIGZyb20gMzYwIHRvIG9idGFpbiBhIHZhbHVlIHdpdGhpbiB0aGUgcmFuZ2UuXHJcblx0ICovXHJcblx0cHVibGljIGdldCByb3RhdGlvblooKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcm90YXRpb25aKk1hdGhDb25zdHMuUkFESUFOU19UT19ERUdSRUVTO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCByb3RhdGlvbloodmFsOm51bWJlcilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5yb3RhdGlvblogPT0gdmFsKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fcm90YXRpb25aID0gdmFsKk1hdGhDb25zdHMuREVHUkVFU19UT19SQURJQU5TO1xyXG5cclxuXHRcdHRoaXMuaW52YWxpZGF0ZVJvdGF0aW9uKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgY3VycmVudCBzY2FsaW5nIGdyaWQgdGhhdCBpcyBpbiBlZmZlY3QuIElmIHNldCB0byA8Y29kZT5udWxsPC9jb2RlPixcclxuXHQgKiB0aGUgZW50aXJlIGRpc3BsYXkgb2JqZWN0IGlzIHNjYWxlZCBub3JtYWxseSB3aGVuIGFueSBzY2FsZSB0cmFuc2Zvcm1hdGlvblxyXG5cdCAqIGlzIGFwcGxpZWQuXHJcblx0ICpcclxuXHQgKiA8cD5XaGVuIHlvdSBkZWZpbmUgdGhlIDxjb2RlPnNjYWxlOUdyaWQ8L2NvZGU+IHByb3BlcnR5LCB0aGUgZGlzcGxheVxyXG5cdCAqIG9iamVjdCBpcyBkaXZpZGVkIGludG8gYSBncmlkIHdpdGggbmluZSByZWdpb25zIGJhc2VkIG9uIHRoZVxyXG5cdCAqIDxjb2RlPnNjYWxlOUdyaWQ8L2NvZGU+IHJlY3RhbmdsZSwgd2hpY2ggZGVmaW5lcyB0aGUgY2VudGVyIHJlZ2lvbiBvZiB0aGVcclxuXHQgKiBncmlkLiBUaGUgZWlnaHQgb3RoZXIgcmVnaW9ucyBvZiB0aGUgZ3JpZCBhcmUgdGhlIGZvbGxvd2luZyBhcmVhczogPC9wPlxyXG5cdCAqXHJcblx0ICogPHVsPlxyXG5cdCAqICAgPGxpPlRoZSB1cHBlci1sZWZ0IGNvcm5lciBvdXRzaWRlIG9mIHRoZSByZWN0YW5nbGU8L2xpPlxyXG5cdCAqICAgPGxpPlRoZSBhcmVhIGFib3ZlIHRoZSByZWN0YW5nbGUgPC9saT5cclxuXHQgKiAgIDxsaT5UaGUgdXBwZXItcmlnaHQgY29ybmVyIG91dHNpZGUgb2YgdGhlIHJlY3RhbmdsZTwvbGk+XHJcblx0ICogICA8bGk+VGhlIGFyZWEgdG8gdGhlIGxlZnQgb2YgdGhlIHJlY3RhbmdsZTwvbGk+XHJcblx0ICogICA8bGk+VGhlIGFyZWEgdG8gdGhlIHJpZ2h0IG9mIHRoZSByZWN0YW5nbGU8L2xpPlxyXG5cdCAqICAgPGxpPlRoZSBsb3dlci1sZWZ0IGNvcm5lciBvdXRzaWRlIG9mIHRoZSByZWN0YW5nbGU8L2xpPlxyXG5cdCAqICAgPGxpPlRoZSBhcmVhIGJlbG93IHRoZSByZWN0YW5nbGU8L2xpPlxyXG5cdCAqICAgPGxpPlRoZSBsb3dlci1yaWdodCBjb3JuZXIgb3V0c2lkZSBvZiB0aGUgcmVjdGFuZ2xlPC9saT5cclxuXHQgKiA8L3VsPlxyXG5cdCAqXHJcblx0ICogPHA+WW91IGNhbiB0aGluayBvZiB0aGUgZWlnaHQgcmVnaW9ucyBvdXRzaWRlIG9mIHRoZSBjZW50ZXIoZGVmaW5lZCBieVxyXG5cdCAqIHRoZSByZWN0YW5nbGUpIGFzIGJlaW5nIGxpa2UgYSBwaWN0dXJlIGZyYW1lIHRoYXQgaGFzIHNwZWNpYWwgcnVsZXNcclxuXHQgKiBhcHBsaWVkIHRvIGl0IHdoZW4gc2NhbGVkLjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPldoZW4gdGhlIDxjb2RlPnNjYWxlOUdyaWQ8L2NvZGU+IHByb3BlcnR5IGlzIHNldCBhbmQgYSBkaXNwbGF5IG9iamVjdFxyXG5cdCAqIGlzIHNjYWxlZCwgYWxsIHRleHQgYW5kIGdyYWRpZW50cyBhcmUgc2NhbGVkIG5vcm1hbGx5OyBob3dldmVyLCBmb3Igb3RoZXJcclxuXHQgKiB0eXBlcyBvZiBvYmplY3RzIHRoZSBmb2xsb3dpbmcgcnVsZXMgYXBwbHk6PC9wPlxyXG5cdCAqXHJcblx0ICogPHVsPlxyXG5cdCAqICAgPGxpPkNvbnRlbnQgaW4gdGhlIGNlbnRlciByZWdpb24gaXMgc2NhbGVkIG5vcm1hbGx5LiA8L2xpPlxyXG5cdCAqICAgPGxpPkNvbnRlbnQgaW4gdGhlIGNvcm5lcnMgaXMgbm90IHNjYWxlZC4gPC9saT5cclxuXHQgKiAgIDxsaT5Db250ZW50IGluIHRoZSB0b3AgYW5kIGJvdHRvbSByZWdpb25zIGlzIHNjYWxlZCBob3Jpem9udGFsbHkgb25seS5cclxuXHQgKiBDb250ZW50IGluIHRoZSBsZWZ0IGFuZCByaWdodCByZWdpb25zIGlzIHNjYWxlZCB2ZXJ0aWNhbGx5IG9ubHkuPC9saT5cclxuXHQgKiAgIDxsaT5BbGwgZmlsbHMoaW5jbHVkaW5nIGJpdG1hcHMsIHZpZGVvLCBhbmQgZ3JhZGllbnRzKSBhcmUgc3RyZXRjaGVkIHRvXHJcblx0ICogZml0IHRoZWlyIHNoYXBlcy48L2xpPlxyXG5cdCAqIDwvdWw+XHJcblx0ICpcclxuXHQgKiA8cD5JZiBhIGRpc3BsYXkgb2JqZWN0IGlzIHJvdGF0ZWQsIGFsbCBzdWJzZXF1ZW50IHNjYWxpbmcgaXMgbm9ybWFsKGFuZFxyXG5cdCAqIHRoZSA8Y29kZT5zY2FsZTlHcmlkPC9jb2RlPiBwcm9wZXJ0eSBpcyBpZ25vcmVkKS48L3A+XHJcblx0ICpcclxuXHQgKiA8cD5Gb3IgZXhhbXBsZSwgY29uc2lkZXIgdGhlIGZvbGxvd2luZyBkaXNwbGF5IG9iamVjdCBhbmQgYSByZWN0YW5nbGUgdGhhdFxyXG5cdCAqIGlzIGFwcGxpZWQgYXMgdGhlIGRpc3BsYXkgb2JqZWN0J3MgPGNvZGU+c2NhbGU5R3JpZDwvY29kZT46PC9wPlxyXG5cdCAqXHJcblx0ICogPHA+QSBjb21tb24gdXNlIGZvciBzZXR0aW5nIDxjb2RlPnNjYWxlOUdyaWQ8L2NvZGU+IGlzIHRvIHNldCB1cCBhIGRpc3BsYXlcclxuXHQgKiBvYmplY3QgdG8gYmUgdXNlZCBhcyBhIGNvbXBvbmVudCwgaW4gd2hpY2ggZWRnZSByZWdpb25zIHJldGFpbiB0aGUgc2FtZVxyXG5cdCAqIHdpZHRoIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBzY2FsZWQuPC9wPlxyXG5cdCAqXHJcblx0ICogQHRocm93cyBBcmd1bWVudEVycm9yIElmIHlvdSBwYXNzIGFuIGludmFsaWQgYXJndW1lbnQgdG8gdGhlIG1ldGhvZC5cclxuXHQgKi9cclxuXHRwdWJsaWMgc2NhbGU5R3JpZDpSZWN0YW5nbGU7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluZGljYXRlcyB0aGUgaG9yaXpvbnRhbCBzY2FsZShwZXJjZW50YWdlKSBvZiB0aGUgb2JqZWN0IGFzIGFwcGxpZWQgZnJvbVxyXG5cdCAqIHRoZSByZWdpc3RyYXRpb24gcG9pbnQuIFRoZSBkZWZhdWx0IHJlZ2lzdHJhdGlvbiBwb2ludCBpcygwLDApLiAxLjBcclxuXHQgKiBlcXVhbHMgMTAwJSBzY2FsZS5cclxuXHQgKlxyXG5cdCAqIDxwPlNjYWxpbmcgdGhlIGxvY2FsIGNvb3JkaW5hdGUgc3lzdGVtIGNoYW5nZXMgdGhlIDxjb2RlPng8L2NvZGU+IGFuZFxyXG5cdCAqIDxjb2RlPnk8L2NvZGU+IHByb3BlcnR5IHZhbHVlcywgd2hpY2ggYXJlIGRlZmluZWQgaW4gd2hvbGUgcGl4ZWxzLiA8L3A+XHJcblx0ICovXHJcblx0cHVibGljIGdldCBzY2FsZVgoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcFNjYWxlWDtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgc2NhbGVYKHZhbDpudW1iZXIpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX3BTY2FsZVggPT0gdmFsKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fcFNjYWxlWCA9IHZhbDtcclxuXHJcblx0XHR0aGlzLmludmFsaWRhdGVTY2FsZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSW5kaWNhdGVzIHRoZSB2ZXJ0aWNhbCBzY2FsZShwZXJjZW50YWdlKSBvZiBhbiBvYmplY3QgYXMgYXBwbGllZCBmcm9tIHRoZVxyXG5cdCAqIHJlZ2lzdHJhdGlvbiBwb2ludCBvZiB0aGUgb2JqZWN0LiBUaGUgZGVmYXVsdCByZWdpc3RyYXRpb24gcG9pbnQgaXMoMCwwKS5cclxuXHQgKiAxLjAgaXMgMTAwJSBzY2FsZS5cclxuXHQgKlxyXG5cdCAqIDxwPlNjYWxpbmcgdGhlIGxvY2FsIGNvb3JkaW5hdGUgc3lzdGVtIGNoYW5nZXMgdGhlIDxjb2RlPng8L2NvZGU+IGFuZFxyXG5cdCAqIDxjb2RlPnk8L2NvZGU+IHByb3BlcnR5IHZhbHVlcywgd2hpY2ggYXJlIGRlZmluZWQgaW4gd2hvbGUgcGl4ZWxzLiA8L3A+XHJcblx0ICovXHJcblx0cHVibGljIGdldCBzY2FsZVkoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcFNjYWxlWTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgc2NhbGVZKHZhbDpudW1iZXIpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX3BTY2FsZVkgPT0gdmFsKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fcFNjYWxlWSA9IHZhbDtcclxuXHJcblx0XHR0aGlzLmludmFsaWRhdGVTY2FsZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSW5kaWNhdGVzIHRoZSBkZXB0aCBzY2FsZShwZXJjZW50YWdlKSBvZiBhbiBvYmplY3QgYXMgYXBwbGllZCBmcm9tIHRoZVxyXG5cdCAqIHJlZ2lzdHJhdGlvbiBwb2ludCBvZiB0aGUgb2JqZWN0LiBUaGUgZGVmYXVsdCByZWdpc3RyYXRpb24gcG9pbnQgaXMoMCwwKS5cclxuXHQgKiAxLjAgaXMgMTAwJSBzY2FsZS5cclxuXHQgKlxyXG5cdCAqIDxwPlNjYWxpbmcgdGhlIGxvY2FsIGNvb3JkaW5hdGUgc3lzdGVtIGNoYW5nZXMgdGhlIDxjb2RlPng8L2NvZGU+LFxyXG5cdCAqIDxjb2RlPnk8L2NvZGU+IGFuZCA8Y29kZT56PC9jb2RlPiBwcm9wZXJ0eSB2YWx1ZXMsIHdoaWNoIGFyZSBkZWZpbmVkIGluXHJcblx0ICogd2hvbGUgcGl4ZWxzLiA8L3A+XHJcblx0ICovXHJcblx0cHVibGljIGdldCBzY2FsZVooKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcFNjYWxlWjtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgc2NhbGVaKHZhbDpudW1iZXIpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX3BTY2FsZVogPT0gdmFsKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fcFNjYWxlWiA9IHZhbDtcclxuXHJcblx0XHR0aGlzLmludmFsaWRhdGVTY2FsZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHNjZW5lKCk6U2NlbmVcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcFNjZW5lO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHNjZW5lUG9zaXRpb24oKTpWZWN0b3IzRFxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9zY2VuZVBvc2l0aW9uRGlydHkpIHtcclxuXHRcdFx0aWYgKCF0aGlzLl9waXZvdFplcm8gJiYgdGhpcy5hbGlnbm1lbnRNb2RlID09IEFsaWdubWVudE1vZGUuUElWT1RfUE9JTlQpIHtcclxuXHRcdFx0XHR2YXIgcGl2b3RTY2FsZTpWZWN0b3IzRCA9IG5ldyBWZWN0b3IzRCh0aGlzLl9waXZvdC54L3RoaXMuX3BTY2FsZVgsIHRoaXMuX3Bpdm90LnkvdGhpcy5fcFNjYWxlWSwgdGhpcy5fcGl2b3Quei90aGlzLl9wU2NhbGVaKVxyXG5cdFx0XHRcdFx0dGhpcy5fc2NlbmVQb3NpdGlvbiA9IHRoaXMuc2NlbmVUcmFuc2Zvcm0udHJhbnNmb3JtVmVjdG9yKHBpdm90U2NhbGUpO1xyXG5cdFx0XHRcdC8vdGhpcy5fc2NlbmVQb3NpdGlvbi5kZWNyZW1lbnRCeShuZXcgVmVjdG9yM0QodGhpcy5fcGl2b3QueCp0aGlzLl9wU2NhbGVYLCB0aGlzLl9waXZvdC55KnRoaXMuX3BTY2FsZVksIHRoaXMuX3Bpdm90LnoqdGhpcy5fcFNjYWxlWikpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuc2NlbmVUcmFuc2Zvcm0uY29weUNvbHVtblRvKDMsIHRoaXMuX3NjZW5lUG9zaXRpb24pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLl9zY2VuZVBvc2l0aW9uRGlydHkgPSBmYWxzZTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzLl9zY2VuZVBvc2l0aW9uO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGdldCBzY2VuZVRyYW5zZm9ybSgpOk1hdHJpeDNEXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX3BTY2VuZVRyYW5zZm9ybURpcnR5KVxyXG5cdFx0XHR0aGlzLnBVcGRhdGVTY2VuZVRyYW5zZm9ybSgpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLl9wU2NlbmVUcmFuc2Zvcm07XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgc2Nyb2xsIHJlY3RhbmdsZSBib3VuZHMgb2YgdGhlIGRpc3BsYXkgb2JqZWN0LiBUaGUgZGlzcGxheSBvYmplY3QgaXNcclxuXHQgKiBjcm9wcGVkIHRvIHRoZSBzaXplIGRlZmluZWQgYnkgdGhlIHJlY3RhbmdsZSwgYW5kIGl0IHNjcm9sbHMgd2l0aGluIHRoZVxyXG5cdCAqIHJlY3RhbmdsZSB3aGVuIHlvdSBjaGFuZ2UgdGhlIDxjb2RlPng8L2NvZGU+IGFuZCA8Y29kZT55PC9jb2RlPiBwcm9wZXJ0aWVzXHJcblx0ICogb2YgdGhlIDxjb2RlPnNjcm9sbFJlY3Q8L2NvZGU+IG9iamVjdC5cclxuXHQgKlxyXG5cdCAqIDxwPlRoZSBwcm9wZXJ0aWVzIG9mIHRoZSA8Y29kZT5zY3JvbGxSZWN0PC9jb2RlPiBSZWN0YW5nbGUgb2JqZWN0IHVzZSB0aGVcclxuXHQgKiBkaXNwbGF5IG9iamVjdCdzIGNvb3JkaW5hdGUgc3BhY2UgYW5kIGFyZSBzY2FsZWQganVzdCBsaWtlIHRoZSBvdmVyYWxsXHJcblx0ICogZGlzcGxheSBvYmplY3QuIFRoZSBjb3JuZXIgYm91bmRzIG9mIHRoZSBjcm9wcGVkIHdpbmRvdyBvbiB0aGUgc2Nyb2xsaW5nXHJcblx0ICogZGlzcGxheSBvYmplY3QgYXJlIHRoZSBvcmlnaW4gb2YgdGhlIGRpc3BsYXkgb2JqZWN0KDAsMCkgYW5kIHRoZSBwb2ludFxyXG5cdCAqIGRlZmluZWQgYnkgdGhlIHdpZHRoIGFuZCBoZWlnaHQgb2YgdGhlIHJlY3RhbmdsZS4gVGhleSBhcmUgbm90IGNlbnRlcmVkXHJcblx0ICogYXJvdW5kIHRoZSBvcmlnaW4sIGJ1dCB1c2UgdGhlIG9yaWdpbiB0byBkZWZpbmUgdGhlIHVwcGVyLWxlZnQgY29ybmVyIG9mXHJcblx0ICogdGhlIGFyZWEuIEEgc2Nyb2xsZWQgZGlzcGxheSBvYmplY3QgYWx3YXlzIHNjcm9sbHMgaW4gd2hvbGUgcGl4ZWxcclxuXHQgKiBpbmNyZW1lbnRzLiA8L3A+XHJcblx0ICpcclxuXHQgKiA8cD5Zb3UgY2FuIHNjcm9sbCBhbiBvYmplY3QgbGVmdCBhbmQgcmlnaHQgYnkgc2V0dGluZyB0aGUgPGNvZGU+eDwvY29kZT5cclxuXHQgKiBwcm9wZXJ0eSBvZiB0aGUgPGNvZGU+c2Nyb2xsUmVjdDwvY29kZT4gUmVjdGFuZ2xlIG9iamVjdC4gWW91IGNhbiBzY3JvbGxcclxuXHQgKiBhbiBvYmplY3QgdXAgYW5kIGRvd24gYnkgc2V0dGluZyB0aGUgPGNvZGU+eTwvY29kZT4gcHJvcGVydHkgb2YgdGhlXHJcblx0ICogPGNvZGU+c2Nyb2xsUmVjdDwvY29kZT4gUmVjdGFuZ2xlIG9iamVjdC4gSWYgdGhlIGRpc3BsYXkgb2JqZWN0IGlzIHJvdGF0ZWRcclxuXHQgKiA5MMKwIGFuZCB5b3Ugc2Nyb2xsIGl0IGxlZnQgYW5kIHJpZ2h0LCB0aGUgZGlzcGxheSBvYmplY3QgYWN0dWFsbHkgc2Nyb2xsc1xyXG5cdCAqIHVwIGFuZCBkb3duLjwvcD5cclxuXHQgKi9cclxuXHRwdWJsaWMgc2Nyb2xsUmVjdDpSZWN0YW5nbGU7XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCBzaGFkZXJQaWNraW5nRGV0YWlscygpOmJvb2xlYW5cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fc2hhZGVyUGlja2luZ0RldGFpbHM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgYm91bmRzVmlzaWJsZSgpOmJvb2xlYW5cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fYm91bmRzVmlzaWJsZTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgYm91bmRzVmlzaWJsZSh2YWx1ZTpib29sZWFuKVxyXG5cdHtcclxuXHRcdGlmICh2YWx1ZSA9PSB0aGlzLl9ib3VuZHNWaXNpYmxlKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fYm91bmRzVmlzaWJsZSA9IHZhbHVlO1xyXG5cclxuXHRcdHRoaXMuX3BhcnRpdGlvbk5vZGUuYm91bmRzVmlzaWJsZSA9IHZhbHVlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQW4gb2JqZWN0IHdpdGggcHJvcGVydGllcyBwZXJ0YWluaW5nIHRvIGEgZGlzcGxheSBvYmplY3QncyBtYXRyaXgsIGNvbG9yXHJcblx0ICogdHJhbnNmb3JtLCBhbmQgcGl4ZWwgYm91bmRzLiBUaGUgc3BlY2lmaWMgcHJvcGVydGllcyAgLSAgbWF0cml4LFxyXG5cdCAqIGNvbG9yVHJhbnNmb3JtLCBhbmQgdGhyZWUgcmVhZC1vbmx5IHByb3BlcnRpZXNcclxuXHQgKiAoPGNvZGU+Y29uY2F0ZW5hdGVkTWF0cml4PC9jb2RlPiwgPGNvZGU+Y29uY2F0ZW5hdGVkQ29sb3JUcmFuc2Zvcm08L2NvZGU+LFxyXG5cdCAqIGFuZCA8Y29kZT5waXhlbEJvdW5kczwvY29kZT4pICAtICBhcmUgZGVzY3JpYmVkIGluIHRoZSBlbnRyeSBmb3IgdGhlXHJcblx0ICogVHJhbnNmb3JtIGNsYXNzLlxyXG5cdCAqXHJcblx0ICogPHA+RWFjaCBvZiB0aGUgdHJhbnNmb3JtIG9iamVjdCdzIHByb3BlcnRpZXMgaXMgaXRzZWxmIGFuIG9iamVjdC4gVGhpc1xyXG5cdCAqIGNvbmNlcHQgaXMgaW1wb3J0YW50IGJlY2F1c2UgdGhlIG9ubHkgd2F5IHRvIHNldCBuZXcgdmFsdWVzIGZvciB0aGUgbWF0cml4XHJcblx0ICogb3IgY29sb3JUcmFuc2Zvcm0gb2JqZWN0cyBpcyB0byBjcmVhdGUgYSBuZXcgb2JqZWN0IGFuZCBjb3B5IHRoYXQgb2JqZWN0XHJcblx0ICogaW50byB0aGUgdHJhbnNmb3JtLm1hdHJpeCBvciB0cmFuc2Zvcm0uY29sb3JUcmFuc2Zvcm0gcHJvcGVydHkuPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+Rm9yIGV4YW1wbGUsIHRvIGluY3JlYXNlIHRoZSA8Y29kZT50eDwvY29kZT4gdmFsdWUgb2YgYSBkaXNwbGF5XHJcblx0ICogb2JqZWN0J3MgbWF0cml4LCB5b3UgbXVzdCBtYWtlIGEgY29weSBvZiB0aGUgZW50aXJlIG1hdHJpeCBvYmplY3QsIHRoZW5cclxuXHQgKiBjb3B5IHRoZSBuZXcgb2JqZWN0IGludG8gdGhlIG1hdHJpeCBwcm9wZXJ0eSBvZiB0aGUgdHJhbnNmb3JtIG9iamVjdDo8L3A+XHJcblx0ICogPHByZSB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiPjxjb2RlPiBwdWJsaWMgbXlNYXRyaXg6TWF0cml4ID1cclxuXHQgKiBteURpc3BsYXlPYmplY3QudHJhbnNmb3JtLm1hdHJpeDsgbXlNYXRyaXgudHggKz0gMTA7XHJcblx0ICogbXlEaXNwbGF5T2JqZWN0LnRyYW5zZm9ybS5tYXRyaXggPSBteU1hdHJpeDsgPC9jb2RlPjwvcHJlPlxyXG5cdCAqXHJcblx0ICogPHA+WW91IGNhbm5vdCBkaXJlY3RseSBzZXQgdGhlIDxjb2RlPnR4PC9jb2RlPiBwcm9wZXJ0eS4gVGhlIGZvbGxvd2luZ1xyXG5cdCAqIGNvZGUgaGFzIG5vIGVmZmVjdCBvbiA8Y29kZT5teURpc3BsYXlPYmplY3Q8L2NvZGU+OiA8L3A+XHJcblx0ICogPHByZSB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiPjxjb2RlPiBteURpc3BsYXlPYmplY3QudHJhbnNmb3JtLm1hdHJpeC50eCArPVxyXG5cdCAqIDEwOyA8L2NvZGU+PC9wcmU+XHJcblx0ICpcclxuXHQgKiA8cD5Zb3UgY2FuIGFsc28gY29weSBhbiBlbnRpcmUgdHJhbnNmb3JtIG9iamVjdCBhbmQgYXNzaWduIGl0IHRvIGFub3RoZXJcclxuXHQgKiBkaXNwbGF5IG9iamVjdCdzIHRyYW5zZm9ybSBwcm9wZXJ0eS4gRm9yIGV4YW1wbGUsIHRoZSBmb2xsb3dpbmcgY29kZVxyXG5cdCAqIGNvcGllcyB0aGUgZW50aXJlIHRyYW5zZm9ybSBvYmplY3QgZnJvbSA8Y29kZT5teU9sZERpc3BsYXlPYmo8L2NvZGU+IHRvXHJcblx0ICogPGNvZGU+bXlOZXdEaXNwbGF5T2JqPC9jb2RlPjo8L3A+XHJcblx0ICogPGNvZGU+bXlOZXdEaXNwbGF5T2JqLnRyYW5zZm9ybSA9IG15T2xkRGlzcGxheU9iai50cmFuc2Zvcm07PC9jb2RlPlxyXG5cdCAqXHJcblx0ICogPHA+VGhlIHJlc3VsdGluZyBkaXNwbGF5IG9iamVjdCwgPGNvZGU+bXlOZXdEaXNwbGF5T2JqPC9jb2RlPiwgbm93IGhhcyB0aGVcclxuXHQgKiBzYW1lIHZhbHVlcyBmb3IgaXRzIG1hdHJpeCwgY29sb3IgdHJhbnNmb3JtLCBhbmQgcGl4ZWwgYm91bmRzIGFzIHRoZSBvbGRcclxuXHQgKiBkaXNwbGF5IG9iamVjdCwgPGNvZGU+bXlPbGREaXNwbGF5T2JqPC9jb2RlPi48L3A+XHJcblx0ICpcclxuXHQgKiA8cD5Ob3RlIHRoYXQgQUlSIGZvciBUViBkZXZpY2VzIHVzZSBoYXJkd2FyZSBhY2NlbGVyYXRpb24sIGlmIGl0IGlzXHJcblx0ICogYXZhaWxhYmxlLCBmb3IgY29sb3IgdHJhbnNmb3Jtcy48L3A+XHJcblx0ICovXHJcblx0cHVibGljIGdldCB0cmFuc2Zvcm0oKTpUcmFuc2Zvcm1cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fdHJhbnNmb3JtO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogV2hldGhlciBvciBub3QgdGhlIGRpc3BsYXkgb2JqZWN0IGlzIHZpc2libGUuIERpc3BsYXkgb2JqZWN0cyB0aGF0IGFyZSBub3RcclxuXHQgKiB2aXNpYmxlIGFyZSBkaXNhYmxlZC4gRm9yIGV4YW1wbGUsIGlmIDxjb2RlPnZpc2libGU9ZmFsc2U8L2NvZGU+IGZvciBhblxyXG5cdCAqIEludGVyYWN0aXZlT2JqZWN0IGluc3RhbmNlLCBpdCBjYW5ub3QgYmUgY2xpY2tlZC5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHZpc2libGUoKTpib29sZWFuXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2V4cGxpY2l0VmlzaWJpbGl0eTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgdmlzaWJsZSh2YWx1ZTpib29sZWFuKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9leHBsaWNpdFZpc2liaWxpdHkgPT0gdmFsdWUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9leHBsaWNpdFZpc2liaWxpdHkgPSB2YWx1ZTtcclxuXHJcblx0XHR0aGlzLl9wVXBkYXRlSW1wbGljaXRWaXNpYmlsaXR5KHRoaXMuX3BQYXJlbnQ/IHRoaXMuX3BQYXJlbnQuX2lJc1Zpc2libGUoKSA6IHRydWUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSW5kaWNhdGVzIHRoZSB3aWR0aCBvZiB0aGUgZGlzcGxheSBvYmplY3QsIGluIHBpeGVscy4gVGhlIHdpZHRoIGlzXHJcblx0ICogY2FsY3VsYXRlZCBiYXNlZCBvbiB0aGUgYm91bmRzIG9mIHRoZSBjb250ZW50IG9mIHRoZSBkaXNwbGF5IG9iamVjdC4gV2hlblxyXG5cdCAqIHlvdSBzZXQgdGhlIDxjb2RlPndpZHRoPC9jb2RlPiBwcm9wZXJ0eSwgdGhlIDxjb2RlPnNjYWxlWDwvY29kZT4gcHJvcGVydHlcclxuXHQgKiBpcyBhZGp1c3RlZCBhY2NvcmRpbmdseSwgYXMgc2hvd24gaW4gdGhlIGZvbGxvd2luZyBjb2RlOlxyXG5cdCAqXHJcblx0ICogPHA+RXhjZXB0IGZvciBUZXh0RmllbGQgYW5kIFZpZGVvIG9iamVjdHMsIGEgZGlzcGxheSBvYmplY3Qgd2l0aCBub1xyXG5cdCAqIGNvbnRlbnQoc3VjaCBhcyBhbiBlbXB0eSBzcHJpdGUpIGhhcyBhIHdpZHRoIG9mIDAsIGV2ZW4gaWYgeW91IHRyeSB0byBzZXRcclxuXHQgKiA8Y29kZT53aWR0aDwvY29kZT4gdG8gYSBkaWZmZXJlbnQgdmFsdWUuPC9wPlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgd2lkdGgoKTpudW1iZXJcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fcEJvdW5kc0ludmFsaWQpXHJcblx0XHRcdHRoaXMucFVwZGF0ZUJvdW5kcygpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLl93aWR0aDtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgd2lkdGgodmFsOm51bWJlcilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fd2lkdGggPT0gdmFsKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fd2lkdGggPT0gdmFsO1xyXG5cclxuXHRcdHRoaXMuX3BTY2FsZVggPSB2YWwvdGhpcy5ib3VuZHMuYWFiYi53aWR0aDtcclxuXHJcblx0XHR0aGlzLmludmFsaWRhdGVTY2FsZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHdvcmxkQm91bmRzKCk6Qm91bmRpbmdWb2x1bWVCYXNlXHJcblx0e1xyXG5cdFx0Ly8gU2luY2UgdGhpcyBnZXR0ZXIgaXMgaW52b2tlZCBldmVyeSBpdGVyYXRpb24gb2YgdGhlIHJlbmRlciBsb29wLCBhbmRcclxuXHRcdC8vIHRoZSBwcmVmYWIgY29uc3RydWN0IGNvdWxkIGFmZmVjdCB0aGUgYm91bmRzIG9mIHRoZSBlbnRpdHksIHRoZSBwcmVmYWIgaXNcclxuXHRcdC8vIHZhbGlkYXRlZCBoZXJlIHRvIGdpdmUgaXQgYSBjaGFuY2UgdG8gcmVidWlsZC5cclxuXHRcdGlmICh0aGlzLl9pU291cmNlUHJlZmFiKVxyXG5cdFx0XHR0aGlzLl9pU291cmNlUHJlZmFiLl9pVmFsaWRhdGUoKTtcclxuXHJcblx0XHRpZiAodGhpcy5fd29ybGRCb3VuZHNJbnZhbGlkKSB7XHJcblx0XHRcdHRoaXMuX3dvcmxkQm91bmRzSW52YWxpZCA9IGZhbHNlO1xyXG5cdFx0XHR0aGlzLl93b3JsZEJvdW5kcy50cmFuc2Zvcm1Gcm9tKHRoaXMuYm91bmRzLCB0aGlzLnNjZW5lVHJhbnNmb3JtKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fd29ybGRCb3VuZHM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJbmRpY2F0ZXMgdGhlIDxpPng8L2k+IGNvb3JkaW5hdGUgb2YgdGhlIERpc3BsYXlPYmplY3QgaW5zdGFuY2UgcmVsYXRpdmVcclxuXHQgKiB0byB0aGUgbG9jYWwgY29vcmRpbmF0ZXMgb2YgdGhlIHBhcmVudCBEaXNwbGF5T2JqZWN0Q29udGFpbmVyLiBJZiB0aGVcclxuXHQgKiBvYmplY3QgaXMgaW5zaWRlIGEgRGlzcGxheU9iamVjdENvbnRhaW5lciB0aGF0IGhhcyB0cmFuc2Zvcm1hdGlvbnMsIGl0IGlzXHJcblx0ICogaW4gdGhlIGxvY2FsIGNvb3JkaW5hdGUgc3lzdGVtIG9mIHRoZSBlbmNsb3NpbmcgRGlzcGxheU9iamVjdENvbnRhaW5lci5cclxuXHQgKiBUaHVzLCBmb3IgYSBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIHJvdGF0ZWQgOTDCsCBjb3VudGVyY2xvY2t3aXNlLCB0aGVcclxuXHQgKiBEaXNwbGF5T2JqZWN0Q29udGFpbmVyJ3MgY2hpbGRyZW4gaW5oZXJpdCBhIGNvb3JkaW5hdGUgc3lzdGVtIHRoYXQgaXNcclxuXHQgKiByb3RhdGVkIDkwwrAgY291bnRlcmNsb2Nrd2lzZS4gVGhlIG9iamVjdCdzIGNvb3JkaW5hdGVzIHJlZmVyIHRvIHRoZVxyXG5cdCAqIHJlZ2lzdHJhdGlvbiBwb2ludCBwb3NpdGlvbi5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHgoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5feDtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgeCh2YWw6bnVtYmVyKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl94ID09IHZhbClcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX3ggPSB2YWw7XHJcblxyXG5cdFx0dGhpcy5pbnZhbGlkYXRlUG9zaXRpb24oKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluZGljYXRlcyB0aGUgPGk+eTwvaT4gY29vcmRpbmF0ZSBvZiB0aGUgRGlzcGxheU9iamVjdCBpbnN0YW5jZSByZWxhdGl2ZVxyXG5cdCAqIHRvIHRoZSBsb2NhbCBjb29yZGluYXRlcyBvZiB0aGUgcGFyZW50IERpc3BsYXlPYmplY3RDb250YWluZXIuIElmIHRoZVxyXG5cdCAqIG9iamVjdCBpcyBpbnNpZGUgYSBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIHRoYXQgaGFzIHRyYW5zZm9ybWF0aW9ucywgaXQgaXNcclxuXHQgKiBpbiB0aGUgbG9jYWwgY29vcmRpbmF0ZSBzeXN0ZW0gb2YgdGhlIGVuY2xvc2luZyBEaXNwbGF5T2JqZWN0Q29udGFpbmVyLlxyXG5cdCAqIFRodXMsIGZvciBhIERpc3BsYXlPYmplY3RDb250YWluZXIgcm90YXRlZCA5MMKwIGNvdW50ZXJjbG9ja3dpc2UsIHRoZVxyXG5cdCAqIERpc3BsYXlPYmplY3RDb250YWluZXIncyBjaGlsZHJlbiBpbmhlcml0IGEgY29vcmRpbmF0ZSBzeXN0ZW0gdGhhdCBpc1xyXG5cdCAqIHJvdGF0ZWQgOTDCsCBjb3VudGVyY2xvY2t3aXNlLiBUaGUgb2JqZWN0J3MgY29vcmRpbmF0ZXMgcmVmZXIgdG8gdGhlXHJcblx0ICogcmVnaXN0cmF0aW9uIHBvaW50IHBvc2l0aW9uLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgeSgpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl95O1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCB5KHZhbDpudW1iZXIpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX3kgPT0gdmFsKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5feSA9IHZhbDtcclxuXHJcblx0XHR0aGlzLmludmFsaWRhdGVQb3NpdGlvbigpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSW5kaWNhdGVzIHRoZSB6IGNvb3JkaW5hdGUgcG9zaXRpb24gYWxvbmcgdGhlIHotYXhpcyBvZiB0aGUgRGlzcGxheU9iamVjdFxyXG5cdCAqIGluc3RhbmNlIHJlbGF0aXZlIHRvIHRoZSAzRCBwYXJlbnQgY29udGFpbmVyLiBUaGUgeiBwcm9wZXJ0eSBpcyB1c2VkIGZvclxyXG5cdCAqIDNEIGNvb3JkaW5hdGVzLCBub3Qgc2NyZWVuIG9yIHBpeGVsIGNvb3JkaW5hdGVzLlxyXG5cdCAqXHJcblx0ICogPHA+V2hlbiB5b3Ugc2V0IGEgPGNvZGU+ejwvY29kZT4gcHJvcGVydHkgZm9yIGEgZGlzcGxheSBvYmplY3QgdG9cclxuXHQgKiBzb21ldGhpbmcgb3RoZXIgdGhhbiB0aGUgZGVmYXVsdCB2YWx1ZSBvZiA8Y29kZT4wPC9jb2RlPiwgYSBjb3JyZXNwb25kaW5nXHJcblx0ICogTWF0cml4M0Qgb2JqZWN0IGlzIGF1dG9tYXRpY2FsbHkgY3JlYXRlZC4gZm9yIGFkanVzdGluZyBhIGRpc3BsYXkgb2JqZWN0J3NcclxuXHQgKiBwb3NpdGlvbiBhbmQgb3JpZW50YXRpb24gaW4gdGhyZWUgZGltZW5zaW9ucy4gV2hlbiB3b3JraW5nIHdpdGggdGhlXHJcblx0ICogei1heGlzLCB0aGUgZXhpc3RpbmcgYmVoYXZpb3Igb2YgeCBhbmQgeSBwcm9wZXJ0aWVzIGNoYW5nZXMgZnJvbSBzY3JlZW4gb3JcclxuXHQgKiBwaXhlbCBjb29yZGluYXRlcyB0byBwb3NpdGlvbnMgcmVsYXRpdmUgdG8gdGhlIDNEIHBhcmVudCBjb250YWluZXIuPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+Rm9yIGV4YW1wbGUsIGEgY2hpbGQgb2YgdGhlIDxjb2RlPl9yb290PC9jb2RlPiBhdCBwb3NpdGlvbiB4ID0gMTAwLCB5ID1cclxuXHQgKiAxMDAsIHogPSAyMDAgaXMgbm90IGRyYXduIGF0IHBpeGVsIGxvY2F0aW9uKDEwMCwxMDApLiBUaGUgY2hpbGQgaXMgZHJhd25cclxuXHQgKiB3aGVyZXZlciB0aGUgM0QgcHJvamVjdGlvbiBjYWxjdWxhdGlvbiBwdXRzIGl0LiBUaGUgY2FsY3VsYXRpb24gaXM6PC9wPlxyXG5cdCAqXHJcblx0ICogPHA+PGNvZGU+KHh+fmNhbWVyYUZvY2FsTGVuZ3RoL2NhbWVyYVJlbGF0aXZlWlBvc2l0aW9uLFxyXG5cdCAqIHl+fmNhbWVyYUZvY2FsTGVuZ3RoL2NhbWVyYVJlbGF0aXZlWlBvc2l0aW9uKTwvY29kZT48L3A+XHJcblx0ICovXHJcblx0cHVibGljIGdldCB6KCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3o7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHoodmFsOm51bWJlcilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5feiA9PSB2YWwpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl96ID0gdmFsO1xyXG5cclxuXHRcdHRoaXMuaW52YWxpZGF0ZVBvc2l0aW9uKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgek9mZnNldCgpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl96T2Zmc2V0O1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCB6T2Zmc2V0KHZhbHVlOm51bWJlcilcclxuXHR7XHJcblx0XHR0aGlzLl96T2Zmc2V0ID0gdmFsdWU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGEgbmV3IDxjb2RlPkRpc3BsYXlPYmplY3Q8L2NvZGU+IGluc3RhbmNlLlxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKClcclxuXHR7XHJcblx0XHRzdXBlcigpO1xyXG5cclxuXHRcdC8vIENhY2hlZCB2ZWN0b3Igb2YgdHJhbnNmb3JtYXRpb24gY29tcG9uZW50cyB1c2VkIHdoZW5cclxuXHRcdC8vIHJlY29tcG9zaW5nIHRoZSB0cmFuc2Zvcm0gbWF0cml4IGluIHVwZGF0ZVRyYW5zZm9ybSgpXHJcblxyXG5cdFx0dGhpcy5fdHJhbnNmb3JtQ29tcG9uZW50cyA9IG5ldyBBcnJheTxWZWN0b3IzRD4oMyk7Ly9fdHJhbnNmb3JtQ29tcG9uZW50cyA9IG5ldyBWZWN0b3IuPFZlY3RvcjNEPigzLCB0cnVlKTtcclxuXHJcblx0XHR0aGlzLl90cmFuc2Zvcm1Db21wb25lbnRzWzBdID0gdGhpcy5fcG9zO1xyXG5cdFx0dGhpcy5fdHJhbnNmb3JtQ29tcG9uZW50c1sxXSA9IHRoaXMuX3JvdDtcclxuXHRcdHRoaXMuX3RyYW5zZm9ybUNvbXBvbmVudHNbMl0gPSB0aGlzLl9zY2E7XHJcblxyXG5cdFx0Ly9jcmVhdGlvbiBvZiBhc3NvY2lhdGVkIHRyYW5zZm9ybSBvYmplY3RcclxuXHRcdHRoaXMuX3RyYW5zZm9ybSA9IG5ldyBUcmFuc2Zvcm0odGhpcyk7XHJcblxyXG5cdFx0dGhpcy5fbWF0cml4M0QuaWRlbnRpdHkoKTtcclxuXHJcblx0XHR0aGlzLl9mbGlwWS5hcHBlbmRTY2FsZSgxLCAtMSwgMSk7XHJcblxyXG5cdFx0dGhpcy5fcEJvdW5kcyA9IHRoaXMucENyZWF0ZURlZmF1bHRCb3VuZGluZ1ZvbHVtZSgpO1xyXG5cclxuXHRcdHRoaXMuX3dvcmxkQm91bmRzID0gdGhpcy5wQ3JlYXRlRGVmYXVsdEJvdW5kaW5nVm9sdW1lKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBhZGRFdmVudExpc3RlbmVyKHR5cGU6c3RyaW5nLCBsaXN0ZW5lcjpGdW5jdGlvbilcclxuXHR7XHJcblx0XHRzdXBlci5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKTtcclxuXHJcblx0XHRzd2l0Y2ggKHR5cGUpIHtcclxuXHRcdFx0Y2FzZSBEaXNwbGF5T2JqZWN0RXZlbnQuUE9TSVRJT05fQ0hBTkdFRDpcclxuXHRcdFx0XHR0aGlzLl9saXN0ZW5Ub1Bvc2l0aW9uQ2hhbmdlZCA9IHRydWU7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgRGlzcGxheU9iamVjdEV2ZW50LlJPVEFUSU9OX0NIQU5HRUQ6XHJcblx0XHRcdFx0dGhpcy5fbGlzdGVuVG9Sb3RhdGlvbkNoYW5nZWQgPSB0cnVlO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIERpc3BsYXlPYmplY3RFdmVudC5TQ0FMRV9DSEFOR0VEOlxyXG5cdFx0XHRcdHRoaXMuX2xpc3RlblRvU2NhbGVDaGFuZ2VkID0gdHJ1ZTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGNsb25lKCk6RGlzcGxheU9iamVjdFxyXG5cdHtcclxuXHRcdHZhciBjbG9uZTpEaXNwbGF5T2JqZWN0ID0gbmV3IERpc3BsYXlPYmplY3QoKTtcclxuXHRcdGNsb25lLnBpdm90ID0gdGhpcy5waXZvdDtcclxuXHRcdGNsb25lLl9pTWF0cml4M0QgPSB0aGlzLl9pTWF0cml4M0Q7XHJcblx0XHRjbG9uZS5uYW1lID0gbmFtZTtcclxuXHJcblx0XHQvLyB0b2RvOiBpbXBsZW1lbnQgZm9yIGFsbCBzdWJ0eXBlc1xyXG5cdFx0cmV0dXJuIGNsb25lO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZGlzcG9zZSgpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMucGFyZW50KVxyXG5cdFx0XHR0aGlzLnBhcmVudC5yZW1vdmVDaGlsZCh0aGlzKTtcclxuXHJcblx0XHR3aGlsZSAodGhpcy5fcFJlbmRlcmFibGVzLmxlbmd0aClcclxuXHRcdFx0dGhpcy5fcFJlbmRlcmFibGVzWzBdLmRpc3Bvc2UoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBpbmhlcml0RG9jXHJcblx0ICovXHJcblx0cHVibGljIGRpc3Bvc2VBc3NldCgpXHJcblx0e1xyXG5cdFx0dGhpcy5kaXNwb3NlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIGEgcmVjdGFuZ2xlIHRoYXQgZGVmaW5lcyB0aGUgYXJlYSBvZiB0aGUgZGlzcGxheSBvYmplY3QgcmVsYXRpdmVcclxuXHQgKiB0byB0aGUgY29vcmRpbmF0ZSBzeXN0ZW0gb2YgdGhlIDxjb2RlPnRhcmdldENvb3JkaW5hdGVTcGFjZTwvY29kZT4gb2JqZWN0LlxyXG5cdCAqIENvbnNpZGVyIHRoZSBmb2xsb3dpbmcgY29kZSwgd2hpY2ggc2hvd3MgaG93IHRoZSByZWN0YW5nbGUgcmV0dXJuZWQgY2FuXHJcblx0ICogdmFyeSBkZXBlbmRpbmcgb24gdGhlIDxjb2RlPnRhcmdldENvb3JkaW5hdGVTcGFjZTwvY29kZT4gcGFyYW1ldGVyIHRoYXRcclxuXHQgKiB5b3UgcGFzcyB0byB0aGUgbWV0aG9kOlxyXG5cdCAqXHJcblx0ICogPHA+PGI+Tm90ZTo8L2I+IFVzZSB0aGUgPGNvZGU+bG9jYWxUb0dsb2JhbCgpPC9jb2RlPiBhbmRcclxuXHQgKiA8Y29kZT5nbG9iYWxUb0xvY2FsKCk8L2NvZGU+IG1ldGhvZHMgdG8gY29udmVydCB0aGUgZGlzcGxheSBvYmplY3QncyBsb2NhbFxyXG5cdCAqIGNvb3JkaW5hdGVzIHRvIGRpc3BsYXkgY29vcmRpbmF0ZXMsIG9yIGRpc3BsYXkgY29vcmRpbmF0ZXMgdG8gbG9jYWxcclxuXHQgKiBjb29yZGluYXRlcywgcmVzcGVjdGl2ZWx5LjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPlRoZSA8Y29kZT5nZXRCb3VuZHMoKTwvY29kZT4gbWV0aG9kIGlzIHNpbWlsYXIgdG8gdGhlXHJcblx0ICogPGNvZGU+Z2V0UmVjdCgpPC9jb2RlPiBtZXRob2Q7IGhvd2V2ZXIsIHRoZSBSZWN0YW5nbGUgcmV0dXJuZWQgYnkgdGhlXHJcblx0ICogPGNvZGU+Z2V0Qm91bmRzKCk8L2NvZGU+IG1ldGhvZCBpbmNsdWRlcyBhbnkgc3Ryb2tlcyBvbiBzaGFwZXMsIHdoZXJlYXNcclxuXHQgKiB0aGUgUmVjdGFuZ2xlIHJldHVybmVkIGJ5IHRoZSA8Y29kZT5nZXRSZWN0KCk8L2NvZGU+IG1ldGhvZCBkb2VzIG5vdC4gRm9yXHJcblx0ICogYW4gZXhhbXBsZSwgc2VlIHRoZSBkZXNjcmlwdGlvbiBvZiB0aGUgPGNvZGU+Z2V0UmVjdCgpPC9jb2RlPiBtZXRob2QuPC9wPlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHRhcmdldENvb3JkaW5hdGVTcGFjZSBUaGUgZGlzcGxheSBvYmplY3QgdGhhdCBkZWZpbmVzIHRoZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29vcmRpbmF0ZSBzeXN0ZW0gdG8gdXNlLlxyXG5cdCAqIEByZXR1cm4gVGhlIHJlY3RhbmdsZSB0aGF0IGRlZmluZXMgdGhlIGFyZWEgb2YgdGhlIGRpc3BsYXkgb2JqZWN0IHJlbGF0aXZlXHJcblx0ICogICAgICAgICB0byB0aGUgPGNvZGU+dGFyZ2V0Q29vcmRpbmF0ZVNwYWNlPC9jb2RlPiBvYmplY3QncyBjb29yZGluYXRlXHJcblx0ICogICAgICAgICBzeXN0ZW0uXHJcblx0ICovXHJcblx0cHVibGljIGdldEJvdW5kcyh0YXJnZXRDb29yZGluYXRlU3BhY2U6RGlzcGxheU9iamVjdCk6UmVjdGFuZ2xlXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2JvdW5kczsgLy9UT0RPXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIGEgcmVjdGFuZ2xlIHRoYXQgZGVmaW5lcyB0aGUgYm91bmRhcnkgb2YgdGhlIGRpc3BsYXkgb2JqZWN0LCBiYXNlZFxyXG5cdCAqIG9uIHRoZSBjb29yZGluYXRlIHN5c3RlbSBkZWZpbmVkIGJ5IHRoZSA8Y29kZT50YXJnZXRDb29yZGluYXRlU3BhY2U8L2NvZGU+XHJcblx0ICogcGFyYW1ldGVyLCBleGNsdWRpbmcgYW55IHN0cm9rZXMgb24gc2hhcGVzLiBUaGUgdmFsdWVzIHRoYXQgdGhlXHJcblx0ICogPGNvZGU+Z2V0UmVjdCgpPC9jb2RlPiBtZXRob2QgcmV0dXJucyBhcmUgdGhlIHNhbWUgb3Igc21hbGxlciB0aGFuIHRob3NlXHJcblx0ICogcmV0dXJuZWQgYnkgdGhlIDxjb2RlPmdldEJvdW5kcygpPC9jb2RlPiBtZXRob2QuXHJcblx0ICpcclxuXHQgKiA8cD48Yj5Ob3RlOjwvYj4gVXNlIDxjb2RlPmxvY2FsVG9HbG9iYWwoKTwvY29kZT4gYW5kXHJcblx0ICogPGNvZGU+Z2xvYmFsVG9Mb2NhbCgpPC9jb2RlPiBtZXRob2RzIHRvIGNvbnZlcnQgdGhlIGRpc3BsYXkgb2JqZWN0J3MgbG9jYWxcclxuXHQgKiBjb29yZGluYXRlcyB0byBTY2VuZSBjb29yZGluYXRlcywgb3IgU2NlbmUgY29vcmRpbmF0ZXMgdG8gbG9jYWxcclxuXHQgKiBjb29yZGluYXRlcywgcmVzcGVjdGl2ZWx5LjwvcD5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB0YXJnZXRDb29yZGluYXRlU3BhY2UgVGhlIGRpc3BsYXkgb2JqZWN0IHRoYXQgZGVmaW5lcyB0aGVcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvb3JkaW5hdGUgc3lzdGVtIHRvIHVzZS5cclxuXHQgKiBAcmV0dXJuIFRoZSByZWN0YW5nbGUgdGhhdCBkZWZpbmVzIHRoZSBhcmVhIG9mIHRoZSBkaXNwbGF5IG9iamVjdCByZWxhdGl2ZVxyXG5cdCAqICAgICAgICAgdG8gdGhlIDxjb2RlPnRhcmdldENvb3JkaW5hdGVTcGFjZTwvY29kZT4gb2JqZWN0J3MgY29vcmRpbmF0ZVxyXG5cdCAqICAgICAgICAgc3lzdGVtLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXRSZWN0KHRhcmdldENvb3JkaW5hdGVTcGFjZTpEaXNwbGF5T2JqZWN0KTpSZWN0YW5nbGVcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fYm91bmRzOyAvL1RPRE9cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnZlcnRzIHRoZSA8Y29kZT5wb2ludDwvY29kZT4gb2JqZWN0IGZyb20gdGhlIFNjZW5lKGdsb2JhbCkgY29vcmRpbmF0ZXNcclxuXHQgKiB0byB0aGUgZGlzcGxheSBvYmplY3Qncyhsb2NhbCkgY29vcmRpbmF0ZXMuXHJcblx0ICpcclxuXHQgKiA8cD5UbyB1c2UgdGhpcyBtZXRob2QsIGZpcnN0IGNyZWF0ZSBhbiBpbnN0YW5jZSBvZiB0aGUgUG9pbnQgY2xhc3MuIFRoZVxyXG5cdCAqIDxpPng8L2k+IGFuZCA8aT55PC9pPiB2YWx1ZXMgdGhhdCB5b3UgYXNzaWduIHJlcHJlc2VudCBnbG9iYWwgY29vcmRpbmF0ZXNcclxuXHQgKiBiZWNhdXNlIHRoZXkgcmVsYXRlIHRvIHRoZSBvcmlnaW4oMCwwKSBvZiB0aGUgbWFpbiBkaXNwbGF5IGFyZWEuIFRoZW5cclxuXHQgKiBwYXNzIHRoZSBQb2ludCBpbnN0YW5jZSBhcyB0aGUgcGFyYW1ldGVyIHRvIHRoZVxyXG5cdCAqIDxjb2RlPmdsb2JhbFRvTG9jYWwoKTwvY29kZT4gbWV0aG9kLiBUaGUgbWV0aG9kIHJldHVybnMgYSBuZXcgUG9pbnQgb2JqZWN0XHJcblx0ICogd2l0aCA8aT54PC9pPiBhbmQgPGk+eTwvaT4gdmFsdWVzIHRoYXQgcmVsYXRlIHRvIHRoZSBvcmlnaW4gb2YgdGhlIGRpc3BsYXlcclxuXHQgKiBvYmplY3QgaW5zdGVhZCBvZiB0aGUgb3JpZ2luIG9mIHRoZSBTY2VuZS48L3A+XHJcblx0ICpcclxuXHQgKiBAcGFyYW0gcG9pbnQgQW4gb2JqZWN0IGNyZWF0ZWQgd2l0aCB0aGUgUG9pbnQgY2xhc3MuIFRoZSBQb2ludCBvYmplY3RcclxuXHQgKiAgICAgICAgICAgICAgc3BlY2lmaWVzIHRoZSA8aT54PC9pPiBhbmQgPGk+eTwvaT4gY29vcmRpbmF0ZXMgYXNcclxuXHQgKiAgICAgICAgICAgICAgcHJvcGVydGllcy5cclxuXHQgKiBAcmV0dXJuIEEgUG9pbnQgb2JqZWN0IHdpdGggY29vcmRpbmF0ZXMgcmVsYXRpdmUgdG8gdGhlIGRpc3BsYXkgb2JqZWN0LlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnbG9iYWxUb0xvY2FsKHBvaW50OlBvaW50KTpQb2ludFxyXG5cdHtcclxuXHRcdHJldHVybiBwb2ludDsgLy9UT0RPXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDb252ZXJ0cyBhIHR3by1kaW1lbnNpb25hbCBwb2ludCBmcm9tIHRoZSBTY2VuZShnbG9iYWwpIGNvb3JkaW5hdGVzIHRvIGFcclxuXHQgKiB0aHJlZS1kaW1lbnNpb25hbCBkaXNwbGF5IG9iamVjdCdzKGxvY2FsKSBjb29yZGluYXRlcy5cclxuXHQgKlxyXG5cdCAqIDxwPlRvIHVzZSB0aGlzIG1ldGhvZCwgZmlyc3QgY3JlYXRlIGFuIGluc3RhbmNlIG9mIHRoZSBWZWN0b3IzRCBjbGFzcy4gVGhlIHgsXHJcblx0ICogeSBhbmQgeiB2YWx1ZXMgdGhhdCB5b3UgYXNzaWduIHRvIHRoZSBWZWN0b3IzRCBvYmplY3QgcmVwcmVzZW50IGdsb2JhbFxyXG5cdCAqIGNvb3JkaW5hdGVzIGJlY2F1c2UgdGhleSBhcmUgcmVsYXRpdmUgdG8gdGhlIG9yaWdpbigwLDAsMCkgb2YgdGhlIHNjZW5lLiBUaGVuXHJcblx0ICogcGFzcyB0aGUgVmVjdG9yM0Qgb2JqZWN0IHRvIHRoZSA8Y29kZT5nbG9iYWxUb0xvY2FsM0QoKTwvY29kZT4gbWV0aG9kIGFzIHRoZVxyXG5cdCAqIDxjb2RlPnBvc2l0aW9uPC9jb2RlPiBwYXJhbWV0ZXIuXHJcblx0ICogVGhlIG1ldGhvZCByZXR1cm5zIHRocmVlLWRpbWVuc2lvbmFsIGNvb3JkaW5hdGVzIGFzIGEgVmVjdG9yM0Qgb2JqZWN0XHJcblx0ICogY29udGFpbmluZyA8Y29kZT54PC9jb2RlPiwgPGNvZGU+eTwvY29kZT4sIGFuZCA8Y29kZT56PC9jb2RlPiB2YWx1ZXMgdGhhdFxyXG5cdCAqIGFyZSByZWxhdGl2ZSB0byB0aGUgb3JpZ2luIG9mIHRoZSB0aHJlZS1kaW1lbnNpb25hbCBkaXNwbGF5IG9iamVjdC48L3A+XHJcblx0ICpcclxuXHQgKiBAcGFyYW0gcG9pbnQgQSBWZWN0b3IzRCBvYmplY3QgcmVwcmVzZW50aW5nIGdsb2JhbCB4LCB5IGFuZCB6IGNvb3JkaW5hdGVzIGluXHJcblx0ICogICAgICAgICAgICAgIHRoZSBzY2VuZS5cclxuXHQgKiBAcmV0dXJuIEEgVmVjdG9yM0Qgb2JqZWN0IHdpdGggY29vcmRpbmF0ZXMgcmVsYXRpdmUgdG8gdGhlIHRocmVlLWRpbWVuc2lvbmFsXHJcblx0ICogICAgICAgICBkaXNwbGF5IG9iamVjdC5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2xvYmFsVG9Mb2NhbDNEKHBvc2l0aW9uOlZlY3RvcjNEKTpWZWN0b3IzRFxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLmludmVyc2VTY2VuZVRyYW5zZm9ybS50cmFuc2Zvcm1WZWN0b3IocG9zaXRpb24pO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRXZhbHVhdGVzIHRoZSBib3VuZGluZyBib3ggb2YgdGhlIGRpc3BsYXkgb2JqZWN0IHRvIHNlZSBpZiBpdCBvdmVybGFwcyBvclxyXG5cdCAqIGludGVyc2VjdHMgd2l0aCB0aGUgYm91bmRpbmcgYm94IG9mIHRoZSA8Y29kZT5vYmo8L2NvZGU+IGRpc3BsYXkgb2JqZWN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIG9iaiBUaGUgZGlzcGxheSBvYmplY3QgdG8gdGVzdCBhZ2FpbnN0LlxyXG5cdCAqIEByZXR1cm4gPGNvZGU+dHJ1ZTwvY29kZT4gaWYgdGhlIGJvdW5kaW5nIGJveGVzIG9mIHRoZSBkaXNwbGF5IG9iamVjdHNcclxuXHQgKiAgICAgICAgIGludGVyc2VjdDsgPGNvZGU+ZmFsc2U8L2NvZGU+IGlmIG5vdC5cclxuXHQgKi9cclxuXHRwdWJsaWMgaGl0VGVzdE9iamVjdChvYmo6RGlzcGxheU9iamVjdCk6Ym9vbGVhblxyXG5cdHtcclxuXHRcdHJldHVybiBmYWxzZTsgLy9UT0RPXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBFdmFsdWF0ZXMgdGhlIGRpc3BsYXkgb2JqZWN0IHRvIHNlZSBpZiBpdCBvdmVybGFwcyBvciBpbnRlcnNlY3RzIHdpdGggdGhlXHJcblx0ICogcG9pbnQgc3BlY2lmaWVkIGJ5IHRoZSA8Y29kZT54PC9jb2RlPiBhbmQgPGNvZGU+eTwvY29kZT4gcGFyYW1ldGVycy4gVGhlXHJcblx0ICogPGNvZGU+eDwvY29kZT4gYW5kIDxjb2RlPnk8L2NvZGU+IHBhcmFtZXRlcnMgc3BlY2lmeSBhIHBvaW50IGluIHRoZVxyXG5cdCAqIGNvb3JkaW5hdGUgc3BhY2Ugb2YgdGhlIFNjZW5lLCBub3QgdGhlIGRpc3BsYXkgb2JqZWN0IGNvbnRhaW5lciB0aGF0XHJcblx0ICogY29udGFpbnMgdGhlIGRpc3BsYXkgb2JqZWN0KHVubGVzcyB0aGF0IGRpc3BsYXkgb2JqZWN0IGNvbnRhaW5lciBpcyB0aGVcclxuXHQgKiBTY2VuZSkuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0geCAgICAgICAgIFRoZSA8aT54PC9pPiBjb29yZGluYXRlIHRvIHRlc3QgYWdhaW5zdCB0aGlzIG9iamVjdC5cclxuXHQgKiBAcGFyYW0geSAgICAgICAgIFRoZSA8aT55PC9pPiBjb29yZGluYXRlIHRvIHRlc3QgYWdhaW5zdCB0aGlzIG9iamVjdC5cclxuXHQgKiBAcGFyYW0gc2hhcGVGbGFnIFdoZXRoZXIgdG8gY2hlY2sgYWdhaW5zdCB0aGUgYWN0dWFsIHBpeGVscyBvZiB0aGUgb2JqZWN0XHJcblx0ICogICAgICAgICAgICAgICAgICg8Y29kZT50cnVlPC9jb2RlPikgb3IgdGhlIGJvdW5kaW5nIGJveFxyXG5cdCAqICAgICAgICAgICAgICAgICAoPGNvZGU+ZmFsc2U8L2NvZGU+KS5cclxuXHQgKiBAcmV0dXJuIDxjb2RlPnRydWU8L2NvZGU+IGlmIHRoZSBkaXNwbGF5IG9iamVjdCBvdmVybGFwcyBvciBpbnRlcnNlY3RzXHJcblx0ICogICAgICAgICB3aXRoIHRoZSBzcGVjaWZpZWQgcG9pbnQ7IDxjb2RlPmZhbHNlPC9jb2RlPiBvdGhlcndpc2UuXHJcblx0ICovXHJcblx0cHVibGljIGhpdFRlc3RQb2ludCh4Om51bWJlciwgeTpudW1iZXIsIHNoYXBlRmxhZzpib29sZWFuID0gZmFsc2UpOmJvb2xlYW5cclxuXHR7XHJcblx0XHRyZXR1cm4gZmFsc2U7IC8vVE9ET1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQGluaGVyaXREb2NcclxuXHQgKi9cclxuXHRwdWJsaWMgaXNJbnRlcnNlY3RpbmdSYXkocmF5UG9zaXRpb246VmVjdG9yM0QsIHJheURpcmVjdGlvbjpWZWN0b3IzRCk6Ym9vbGVhblxyXG5cdHtcclxuXHRcdHZhciBsb2NhbFJheVBvc2l0aW9uOlZlY3RvcjNEID0gdGhpcy5pbnZlcnNlU2NlbmVUcmFuc2Zvcm0udHJhbnNmb3JtVmVjdG9yKHJheVBvc2l0aW9uKTtcclxuXHRcdHZhciBsb2NhbFJheURpcmVjdGlvbjpWZWN0b3IzRCA9IHRoaXMuaW52ZXJzZVNjZW5lVHJhbnNmb3JtLmRlbHRhVHJhbnNmb3JtVmVjdG9yKHJheURpcmVjdGlvbik7XHJcblx0XHR2YXIgcGlja2luZ0NvbGxpc2lvblZPOlBpY2tpbmdDb2xsaXNpb25WTyA9IHRoaXMuX2lQaWNraW5nQ29sbGlzaW9uVk87XHJcblxyXG5cdFx0aWYgKCFwaWNraW5nQ29sbGlzaW9uVk8ubG9jYWxOb3JtYWwpXHJcblx0XHRcdHBpY2tpbmdDb2xsaXNpb25WTy5sb2NhbE5vcm1hbCA9IG5ldyBWZWN0b3IzRCgpO1xyXG5cclxuXHRcdHZhciByYXlFbnRyeURpc3RhbmNlOm51bWJlciA9IHRoaXMuYm91bmRzLnJheUludGVyc2VjdGlvbihsb2NhbFJheVBvc2l0aW9uLCBsb2NhbFJheURpcmVjdGlvbiwgcGlja2luZ0NvbGxpc2lvblZPLmxvY2FsTm9ybWFsKTtcclxuXHJcblx0XHRpZiAocmF5RW50cnlEaXN0YW5jZSA8IDApXHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHJcblx0XHRwaWNraW5nQ29sbGlzaW9uVk8ucmF5RW50cnlEaXN0YW5jZSA9IHJheUVudHJ5RGlzdGFuY2U7XHJcblx0XHRwaWNraW5nQ29sbGlzaW9uVk8ubG9jYWxSYXlQb3NpdGlvbiA9IGxvY2FsUmF5UG9zaXRpb247XHJcblx0XHRwaWNraW5nQ29sbGlzaW9uVk8ubG9jYWxSYXlEaXJlY3Rpb24gPSBsb2NhbFJheURpcmVjdGlvbjtcclxuXHRcdHBpY2tpbmdDb2xsaXNpb25WTy5yYXlQb3NpdGlvbiA9IHJheVBvc2l0aW9uO1xyXG5cdFx0cGlja2luZ0NvbGxpc2lvblZPLnJheURpcmVjdGlvbiA9IHJheURpcmVjdGlvbjtcclxuXHRcdHBpY2tpbmdDb2xsaXNpb25WTy5yYXlPcmlnaW5Jc0luc2lkZUJvdW5kcyA9IHJheUVudHJ5RGlzdGFuY2UgPT0gMDtcclxuXHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJvdGF0ZXMgdGhlIDNkIG9iamVjdCBhcm91bmQgdG8gZmFjZSBhIHBvaW50IGRlZmluZWQgcmVsYXRpdmUgdG8gdGhlIGxvY2FsIGNvb3JkaW5hdGVzIG9mIHRoZSBwYXJlbnQgPGNvZGU+T2JqZWN0Q29udGFpbmVyM0Q8L2NvZGU+LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICAgIHRhcmdldCAgICAgICAgVGhlIHZlY3RvciBkZWZpbmluZyB0aGUgcG9pbnQgdG8gYmUgbG9va2VkIGF0XHJcblx0ICogQHBhcmFtICAgIHVwQXhpcyAgICAgICAgQW4gb3B0aW9uYWwgdmVjdG9yIHVzZWQgdG8gZGVmaW5lIHRoZSBkZXNpcmVkIHVwIG9yaWVudGF0aW9uIG9mIHRoZSAzZCBvYmplY3QgYWZ0ZXIgcm90YXRpb24gaGFzIG9jY3VycmVkXHJcblx0ICovXHJcblx0cHVibGljIGxvb2tBdCh0YXJnZXQ6VmVjdG9yM0QsIHVwQXhpczpWZWN0b3IzRCA9IG51bGwpXHJcblx0e1xyXG5cclxuXHRcdHZhciB5QXhpczpWZWN0b3IzRDtcclxuXHRcdHZhciB6QXhpczpWZWN0b3IzRDtcclxuXHRcdHZhciB4QXhpczpWZWN0b3IzRDtcclxuXHRcdHZhciByYXc6QXJyYXk8bnVtYmVyPjtcclxuXHJcblx0XHRpZiAodXBBeGlzID09IG51bGwpXHJcblx0XHRcdHVwQXhpcyA9IFZlY3RvcjNELllfQVhJUztcclxuXHRcdGVsc2VcclxuXHRcdFx0dXBBeGlzLm5vcm1hbGl6ZSgpO1xyXG5cclxuXHRcdHpBeGlzID0gdGFyZ2V0LnN1YnRyYWN0KHRoaXMuX2lNYXRyaXgzRC5wb3NpdGlvbik7XHJcblx0XHR6QXhpcy5ub3JtYWxpemUoKTtcclxuXHJcblx0XHR4QXhpcyA9IHVwQXhpcy5jcm9zc1Byb2R1Y3QoekF4aXMpO1xyXG5cdFx0eEF4aXMubm9ybWFsaXplKCk7XHJcblxyXG5cdFx0aWYgKHhBeGlzLmxlbmd0aCA8IDAuMDUpIHtcclxuXHRcdFx0eEF4aXMueCA9IHVwQXhpcy55O1xyXG5cdFx0XHR4QXhpcy55ID0gdXBBeGlzLng7XHJcblx0XHRcdHhBeGlzLnogPSAwO1xyXG5cdFx0XHR4QXhpcy5ub3JtYWxpemUoKTtcclxuXHRcdH1cclxuXHJcblx0XHR5QXhpcyA9IHpBeGlzLmNyb3NzUHJvZHVjdCh4QXhpcyk7XHJcblxyXG5cdFx0cmF3ID0gTWF0cml4M0RVdGlscy5SQVdfREFUQV9DT05UQUlORVI7XHJcblxyXG5cdFx0cmF3WzBdID0geEF4aXMueDtcclxuXHRcdHJhd1sxXSA9IHhBeGlzLnk7XHJcblx0XHRyYXdbMl0gPSB4QXhpcy56O1xyXG5cdFx0cmF3WzNdID0gMDtcclxuXHJcblx0XHRyYXdbNF0gPSB5QXhpcy54O1xyXG5cdFx0cmF3WzVdID0geUF4aXMueTtcclxuXHRcdHJhd1s2XSA9IHlBeGlzLno7XHJcblx0XHRyYXdbN10gPSAwO1xyXG5cclxuXHRcdHJhd1s4XSA9IHpBeGlzLng7XHJcblx0XHRyYXdbOV0gPSB6QXhpcy55O1xyXG5cdFx0cmF3WzEwXSA9IHpBeGlzLno7XHJcblx0XHRyYXdbMTFdID0gMDtcclxuXHJcblx0XHR2YXIgbTpNYXRyaXgzRCA9IG5ldyBNYXRyaXgzRCgpO1xyXG5cdFx0bS5jb3B5UmF3RGF0YUZyb20ocmF3KTtcclxuXHJcblx0XHR2YXIgdmVjOlZlY3RvcjNEID0gbS5kZWNvbXBvc2UoKVsxXTtcclxuXHJcblx0XHR0aGlzLl9yb3RhdGlvblggPSB2ZWMueDtcclxuXHRcdHRoaXMuX3JvdGF0aW9uWSA9IHZlYy55O1xyXG5cdFx0dGhpcy5fcm90YXRpb25aID0gdmVjLno7XHJcblxyXG5cdFx0dGhpcy5pbnZhbGlkYXRlUm90YXRpb24oKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnZlcnRzIHRoZSA8Y29kZT5wb2ludDwvY29kZT4gb2JqZWN0IGZyb20gdGhlIGRpc3BsYXkgb2JqZWN0J3MobG9jYWwpXHJcblx0ICogY29vcmRpbmF0ZXMgdG8gdGhlIFNjZW5lKGdsb2JhbCkgY29vcmRpbmF0ZXMuXHJcblx0ICpcclxuXHQgKiA8cD5UaGlzIG1ldGhvZCBhbGxvd3MgeW91IHRvIGNvbnZlcnQgYW55IGdpdmVuIDxpPng8L2k+IGFuZCA8aT55PC9pPlxyXG5cdCAqIGNvb3JkaW5hdGVzIGZyb20gdmFsdWVzIHRoYXQgYXJlIHJlbGF0aXZlIHRvIHRoZSBvcmlnaW4oMCwwKSBvZiBhXHJcblx0ICogc3BlY2lmaWMgZGlzcGxheSBvYmplY3QobG9jYWwgY29vcmRpbmF0ZXMpIHRvIHZhbHVlcyB0aGF0IGFyZSByZWxhdGl2ZSB0b1xyXG5cdCAqIHRoZSBvcmlnaW4gb2YgdGhlIFNjZW5lKGdsb2JhbCBjb29yZGluYXRlcykuPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+VG8gdXNlIHRoaXMgbWV0aG9kLCBmaXJzdCBjcmVhdGUgYW4gaW5zdGFuY2Ugb2YgdGhlIFBvaW50IGNsYXNzLiBUaGVcclxuXHQgKiA8aT54PC9pPiBhbmQgPGk+eTwvaT4gdmFsdWVzIHRoYXQgeW91IGFzc2lnbiByZXByZXNlbnQgbG9jYWwgY29vcmRpbmF0ZXNcclxuXHQgKiBiZWNhdXNlIHRoZXkgcmVsYXRlIHRvIHRoZSBvcmlnaW4gb2YgdGhlIGRpc3BsYXkgb2JqZWN0LjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPllvdSB0aGVuIHBhc3MgdGhlIFBvaW50IGluc3RhbmNlIHRoYXQgeW91IGNyZWF0ZWQgYXMgdGhlIHBhcmFtZXRlciB0b1xyXG5cdCAqIHRoZSA8Y29kZT5sb2NhbFRvR2xvYmFsKCk8L2NvZGU+IG1ldGhvZC4gVGhlIG1ldGhvZCByZXR1cm5zIGEgbmV3IFBvaW50XHJcblx0ICogb2JqZWN0IHdpdGggPGk+eDwvaT4gYW5kIDxpPnk8L2k+IHZhbHVlcyB0aGF0IHJlbGF0ZSB0byB0aGUgb3JpZ2luIG9mIHRoZVxyXG5cdCAqIFNjZW5lIGluc3RlYWQgb2YgdGhlIG9yaWdpbiBvZiB0aGUgZGlzcGxheSBvYmplY3QuPC9wPlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHBvaW50IFRoZSBuYW1lIG9yIGlkZW50aWZpZXIgb2YgYSBwb2ludCBjcmVhdGVkIHdpdGggdGhlIFBvaW50XHJcblx0ICogICAgICAgICAgICAgIGNsYXNzLCBzcGVjaWZ5aW5nIHRoZSA8aT54PC9pPiBhbmQgPGk+eTwvaT4gY29vcmRpbmF0ZXMgYXNcclxuXHQgKiAgICAgICAgICAgICAgcHJvcGVydGllcy5cclxuXHQgKiBAcmV0dXJuIEEgUG9pbnQgb2JqZWN0IHdpdGggY29vcmRpbmF0ZXMgcmVsYXRpdmUgdG8gdGhlIFNjZW5lLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBsb2NhbFRvR2xvYmFsKHBvaW50OlBvaW50KTpQb2ludFxyXG5cdHtcclxuXHRcdHJldHVybiBuZXcgUG9pbnQoKTsgLy9UT0RPXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDb252ZXJ0cyBhIHRocmVlLWRpbWVuc2lvbmFsIHBvaW50IG9mIHRoZSB0aHJlZS1kaW1lbnNpb25hbCBkaXNwbGF5XHJcblx0ICogb2JqZWN0J3MobG9jYWwpIGNvb3JkaW5hdGVzIHRvIGEgdGhyZWUtZGltZW5zaW9uYWwgcG9pbnQgaW4gdGhlIFNjZW5lXHJcblx0ICogKGdsb2JhbCkgY29vcmRpbmF0ZXMuXHJcblx0ICpcclxuXHQgKiA8cD5UaGlzIG1ldGhvZCBhbGxvd3MgeW91IHRvIGNvbnZlcnQgYW55IGdpdmVuIDxpPng8L2k+LCA8aT55PC9pPiBhbmRcclxuXHQgKiA8aT56PC9pPiBjb29yZGluYXRlcyBmcm9tIHZhbHVlcyB0aGF0IGFyZSByZWxhdGl2ZSB0byB0aGUgb3JpZ2luKDAsMCwwKSBvZlxyXG5cdCAqIGEgc3BlY2lmaWMgZGlzcGxheSBvYmplY3QobG9jYWwgY29vcmRpbmF0ZXMpIHRvIHZhbHVlcyB0aGF0IGFyZSByZWxhdGl2ZSB0b1xyXG5cdCAqIHRoZSBvcmlnaW4gb2YgdGhlIFNjZW5lKGdsb2JhbCBjb29yZGluYXRlcykuPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+VG8gdXNlIHRoaXMgbWV0aG9kLCBmaXJzdCBjcmVhdGUgYW4gaW5zdGFuY2Ugb2YgdGhlIFBvaW50IGNsYXNzLiBUaGVcclxuXHQgKiA8aT54PC9pPiBhbmQgPGk+eTwvaT4gdmFsdWVzIHRoYXQgeW91IGFzc2lnbiByZXByZXNlbnQgbG9jYWwgY29vcmRpbmF0ZXNcclxuXHQgKiBiZWNhdXNlIHRoZXkgcmVsYXRlIHRvIHRoZSBvcmlnaW4gb2YgdGhlIGRpc3BsYXkgb2JqZWN0LjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPllvdSB0aGVuIHBhc3MgdGhlIFZlY3RvcjNEIGluc3RhbmNlIHRoYXQgeW91IGNyZWF0ZWQgYXMgdGhlIHBhcmFtZXRlciB0b1xyXG5cdCAqIHRoZSA8Y29kZT5sb2NhbFRvR2xvYmFsM0QoKTwvY29kZT4gbWV0aG9kLiBUaGUgbWV0aG9kIHJldHVybnMgYSBuZXdcclxuXHQgKiBWZWN0b3IzRCBvYmplY3Qgd2l0aCA8aT54PC9pPiwgPGk+eTwvaT4gYW5kIDxpPno8L2k+IHZhbHVlcyB0aGF0IHJlbGF0ZSB0b1xyXG5cdCAqIHRoZSBvcmlnaW4gb2YgdGhlIFNjZW5lIGluc3RlYWQgb2YgdGhlIG9yaWdpbiBvZiB0aGUgZGlzcGxheSBvYmplY3QuPC9wPlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHBvc2l0aW9uIEEgVmVjdG9yM0Qgb2JqZWN0IGNvbnRhaW5pbmcgZWl0aGVyIGEgdGhyZWUtZGltZW5zaW9uYWxcclxuXHQgKiAgICAgICAgICAgICAgICBwb3NpdGlvbiBvciB0aGUgY29vcmRpbmF0ZXMgb2YgdGhlIHRocmVlLWRpbWVuc2lvbmFsXHJcblx0ICogICAgICAgICAgICAgICAgZGlzcGxheSBvYmplY3QuXHJcblx0ICogQHJldHVybiBBIFZlY3RvcjNEIG9iamVjdCByZXByZXNlbnRpbmcgYSB0aHJlZS1kaW1lbnNpb25hbCBwb3NpdGlvbiBpblxyXG5cdCAqICAgICAgICAgdGhlIFNjZW5lLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBsb2NhbFRvR2xvYmFsM0QocG9zaXRpb246VmVjdG9yM0QpOlZlY3RvcjNEXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuc2NlbmVUcmFuc2Zvcm0udHJhbnNmb3JtVmVjdG9yKHBvc2l0aW9uKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1vdmVzIHRoZSAzZCBvYmplY3QgZGlyZWN0bHkgdG8gYSBwb2ludCBpbiBzcGFjZVxyXG5cdCAqXHJcblx0ICogQHBhcmFtICAgIGR4ICAgICAgICBUaGUgYW1vdW50IG9mIG1vdmVtZW50IGFsb25nIHRoZSBsb2NhbCB4IGF4aXMuXHJcblx0ICogQHBhcmFtICAgIGR5ICAgICAgICBUaGUgYW1vdW50IG9mIG1vdmVtZW50IGFsb25nIHRoZSBsb2NhbCB5IGF4aXMuXHJcblx0ICogQHBhcmFtICAgIGR6ICAgICAgICBUaGUgYW1vdW50IG9mIG1vdmVtZW50IGFsb25nIHRoZSBsb2NhbCB6IGF4aXMuXHJcblx0ICovXHJcblxyXG5cdHB1YmxpYyBtb3ZlVG8oZHg6bnVtYmVyLCBkeTpudW1iZXIsIGR6Om51bWJlcilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5feCA9PSBkeCAmJiB0aGlzLl95ID09IGR5ICYmIHRoaXMuX3ogPT0gZHopXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl94ID0gZHg7XHJcblx0XHR0aGlzLl95ID0gZHk7XHJcblx0XHR0aGlzLl96ID0gZHo7XHJcblxyXG5cdFx0dGhpcy5pbnZhbGlkYXRlUG9zaXRpb24oKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1vdmVzIHRoZSBsb2NhbCBwb2ludCBhcm91bmQgd2hpY2ggdGhlIG9iamVjdCByb3RhdGVzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICAgIGR4ICAgICAgICBUaGUgYW1vdW50IG9mIG1vdmVtZW50IGFsb25nIHRoZSBsb2NhbCB4IGF4aXMuXHJcblx0ICogQHBhcmFtICAgIGR5ICAgICAgICBUaGUgYW1vdW50IG9mIG1vdmVtZW50IGFsb25nIHRoZSBsb2NhbCB5IGF4aXMuXHJcblx0ICogQHBhcmFtICAgIGR6ICAgICAgICBUaGUgYW1vdW50IG9mIG1vdmVtZW50IGFsb25nIHRoZSBsb2NhbCB6IGF4aXMuXHJcblx0ICovXHJcblx0cHVibGljIG1vdmVQaXZvdChkeDpudW1iZXIsIGR5Om51bWJlciwgZHo6bnVtYmVyKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9waXZvdCA9PSBudWxsKVxyXG5cdFx0XHR0aGlzLl9waXZvdCA9IG5ldyBWZWN0b3IzRCgpO1xyXG5cclxuXHRcdHRoaXMuX3Bpdm90LnggKz0gZHg7XHJcblx0XHR0aGlzLl9waXZvdC55ICs9IGR5O1xyXG5cdFx0dGhpcy5fcGl2b3QueiArPSBkejtcclxuXHJcblx0XHR0aGlzLmludmFsaWRhdGVQaXZvdCgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUm90YXRlcyB0aGUgM2Qgb2JqZWN0IGFyb3VuZCBpdCdzIGxvY2FsIHgtYXhpc1xyXG5cdCAqXHJcblx0ICogQHBhcmFtICAgIGFuZ2xlICAgICAgICBUaGUgYW1vdW50IG9mIHJvdGF0aW9uIGluIGRlZ3JlZXNcclxuXHQgKi9cclxuXHRwdWJsaWMgcGl0Y2goYW5nbGU6bnVtYmVyKVxyXG5cdHtcclxuXHRcdHRoaXMucm90YXRlKFZlY3RvcjNELlhfQVhJUywgYW5nbGUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0UmVuZGVyU2NlbmVUcmFuc2Zvcm0oY2FtZXJhOkNhbWVyYSk6TWF0cml4M0RcclxuXHR7XHJcblx0XHRpZiAodGhpcy5vcmllbnRhdGlvbk1vZGUgPT0gT3JpZW50YXRpb25Nb2RlLkNBTUVSQV9QTEFORSkge1xyXG5cdFx0XHR2YXIgY29tcHM6QXJyYXk8VmVjdG9yM0Q+ID0gY2FtZXJhLnNjZW5lVHJhbnNmb3JtLmRlY29tcG9zZSgpO1xyXG5cdFx0XHR2YXIgc2NhbGU6VmVjdG9yM0QgPSBjb21wc1syXTtcclxuXHRcdFx0Y29tcHNbMF0gPSB0aGlzLnNjZW5lUG9zaXRpb247XHJcblx0XHRcdHNjYWxlLnggPSB0aGlzLl9wU2NhbGVYO1xyXG5cdFx0XHRzY2FsZS55ID0gdGhpcy5fcFNjYWxlWTtcclxuXHRcdFx0c2NhbGUueiA9IHRoaXMuX3BTY2FsZVo7XHJcblx0XHRcdHRoaXMuX29yaWVudGF0aW9uTWF0cml4LnJlY29tcG9zZShjb21wcyk7XHJcblxyXG5cdFx0XHQvL2FkZCBpbiBjYXNlIG9mIHBpdm90XHJcblx0XHRcdGlmICghdGhpcy5fcGl2b3RaZXJvICYmIHRoaXMuYWxpZ25tZW50TW9kZSA9PSBBbGlnbm1lbnRNb2RlLlBJVk9UX1BPSU5UKVxyXG5cdFx0XHRcdHRoaXMuX29yaWVudGF0aW9uTWF0cml4LnByZXBlbmRUcmFuc2xhdGlvbigtdGhpcy5fcGl2b3QueC90aGlzLl9wU2NhbGVYLCAtdGhpcy5fcGl2b3QueS90aGlzLl9wU2NhbGVZLCAtdGhpcy5fcGl2b3Quei90aGlzLl9wU2NhbGVaKTtcclxuXHJcblx0XHRcdHJldHVybiB0aGlzLl9vcmllbnRhdGlvbk1hdHJpeDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcy5zY2VuZVRyYW5zZm9ybTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJvdGF0ZXMgdGhlIDNkIG9iamVjdCBhcm91bmQgaXQncyBsb2NhbCB6LWF4aXNcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAgICBhbmdsZSAgICAgICAgVGhlIGFtb3VudCBvZiByb3RhdGlvbiBpbiBkZWdyZWVzXHJcblx0ICovXHJcblx0cHVibGljIHJvbGwoYW5nbGU6bnVtYmVyKVxyXG5cdHtcclxuXHRcdHRoaXMucm90YXRlKFZlY3RvcjNELlpfQVhJUywgYW5nbGUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUm90YXRlcyB0aGUgM2Qgb2JqZWN0IGFyb3VuZCBhbiBheGlzIGJ5IGEgZGVmaW5lZCBhbmdsZVxyXG5cdCAqXHJcblx0ICogQHBhcmFtICAgIGF4aXMgICAgICAgIFRoZSB2ZWN0b3IgZGVmaW5pbmcgdGhlIGF4aXMgb2Ygcm90YXRpb25cclxuXHQgKiBAcGFyYW0gICAgYW5nbGUgICAgICAgIFRoZSBhbW91bnQgb2Ygcm90YXRpb24gaW4gZGVncmVlc1xyXG5cdCAqL1xyXG5cdHB1YmxpYyByb3RhdGUoYXhpczpWZWN0b3IzRCwgYW5nbGU6bnVtYmVyKVxyXG5cdHtcclxuXHRcdHZhciBtOk1hdHJpeDNEID0gbmV3IE1hdHJpeDNEKCk7XHJcblx0XHRtLnByZXBlbmRSb3RhdGlvbihhbmdsZSwgYXhpcyk7XHJcblxyXG5cdFx0dmFyIHZlYzpWZWN0b3IzRCA9IG0uZGVjb21wb3NlKClbMV07XHJcblxyXG5cdFx0dGhpcy5fcm90YXRpb25YICs9IHZlYy54O1xyXG5cdFx0dGhpcy5fcm90YXRpb25ZICs9IHZlYy55O1xyXG5cdFx0dGhpcy5fcm90YXRpb25aICs9IHZlYy56O1xyXG5cclxuXHRcdHRoaXMuaW52YWxpZGF0ZVJvdGF0aW9uKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSb3RhdGVzIHRoZSAzZCBvYmplY3QgZGlyZWN0bHkgdG8gYSBldWxlciBhbmdsZVxyXG5cdCAqXHJcblx0ICogQHBhcmFtICAgIGF4ICAgICAgICBUaGUgYW5nbGUgaW4gZGVncmVlcyBvZiB0aGUgcm90YXRpb24gYXJvdW5kIHRoZSB4IGF4aXMuXHJcblx0ICogQHBhcmFtICAgIGF5ICAgICAgICBUaGUgYW5nbGUgaW4gZGVncmVlcyBvZiB0aGUgcm90YXRpb24gYXJvdW5kIHRoZSB5IGF4aXMuXHJcblx0ICogQHBhcmFtICAgIGF6ICAgICAgICBUaGUgYW5nbGUgaW4gZGVncmVlcyBvZiB0aGUgcm90YXRpb24gYXJvdW5kIHRoZSB6IGF4aXMuXHJcblx0ICovXHJcblx0cHVibGljIHJvdGF0ZVRvKGF4Om51bWJlciwgYXk6bnVtYmVyLCBhejpudW1iZXIpXHJcblx0e1xyXG5cdFx0dGhpcy5fcm90YXRpb25YID0gYXgqTWF0aENvbnN0cy5ERUdSRUVTX1RPX1JBRElBTlM7XHJcblx0XHR0aGlzLl9yb3RhdGlvblkgPSBheSpNYXRoQ29uc3RzLkRFR1JFRVNfVE9fUkFESUFOUztcclxuXHRcdHRoaXMuX3JvdGF0aW9uWiA9IGF6Kk1hdGhDb25zdHMuREVHUkVFU19UT19SQURJQU5TO1xyXG5cclxuXHRcdHRoaXMuaW52YWxpZGF0ZVJvdGF0aW9uKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyByZW1vdmVFdmVudExpc3RlbmVyKHR5cGU6c3RyaW5nLCBsaXN0ZW5lcjpGdW5jdGlvbilcclxuXHR7XHJcblx0XHRzdXBlci5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKTtcclxuXHJcblx0XHRpZiAodGhpcy5oYXNFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHN3aXRjaCAodHlwZSkge1xyXG5cdFx0XHRjYXNlIERpc3BsYXlPYmplY3RFdmVudC5QT1NJVElPTl9DSEFOR0VEOlxyXG5cdFx0XHRcdHRoaXMuX2xpc3RlblRvUG9zaXRpb25DaGFuZ2VkID0gZmFsc2U7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIERpc3BsYXlPYmplY3RFdmVudC5ST1RBVElPTl9DSEFOR0VEOlxyXG5cdFx0XHRcdHRoaXMuX2xpc3RlblRvUm90YXRpb25DaGFuZ2VkID0gZmFsc2U7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIERpc3BsYXlPYmplY3RFdmVudC5TQ0FMRV9DSEFOR0VEOlxyXG5cdFx0XHRcdHRoaXMuX2xpc3RlblRvU2NhbGVDaGFuZ2VkID0gZmFsc2U7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNb3ZlcyB0aGUgM2Qgb2JqZWN0IGFsb25nIGEgdmVjdG9yIGJ5IGEgZGVmaW5lZCBsZW5ndGhcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAgICBheGlzICAgICAgICBUaGUgdmVjdG9yIGRlZmluaW5nIHRoZSBheGlzIG9mIG1vdmVtZW50XHJcblx0ICogQHBhcmFtICAgIGRpc3RhbmNlICAgIFRoZSBsZW5ndGggb2YgdGhlIG1vdmVtZW50XHJcblx0ICovXHJcblx0cHVibGljIHRyYW5zbGF0ZShheGlzOlZlY3RvcjNELCBkaXN0YW5jZTpudW1iZXIpXHJcblx0e1xyXG5cdFx0dmFyIHg6bnVtYmVyID0gYXhpcy54LCB5Om51bWJlciA9IGF4aXMueSwgejpudW1iZXIgPSBheGlzLno7XHJcblx0XHR2YXIgbGVuOm51bWJlciA9IGRpc3RhbmNlL01hdGguc3FydCh4KnggKyB5KnkgKyB6KnopO1xyXG5cclxuXHRcdHRoaXMuX3ggKz0geCpsZW47XHJcblx0XHR0aGlzLl95ICs9IHkqbGVuO1xyXG5cdFx0dGhpcy5feiArPSB6KmxlbjtcclxuXHJcblx0XHR0aGlzLmludmFsaWRhdGVQb3NpdGlvbigpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTW92ZXMgdGhlIDNkIG9iamVjdCBhbG9uZyBhIHZlY3RvciBieSBhIGRlZmluZWQgbGVuZ3RoXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gICAgYXhpcyAgICAgICAgVGhlIHZlY3RvciBkZWZpbmluZyB0aGUgYXhpcyBvZiBtb3ZlbWVudFxyXG5cdCAqIEBwYXJhbSAgICBkaXN0YW5jZSAgICBUaGUgbGVuZ3RoIG9mIHRoZSBtb3ZlbWVudFxyXG5cdCAqL1xyXG5cdHB1YmxpYyB0cmFuc2xhdGVMb2NhbChheGlzOlZlY3RvcjNELCBkaXN0YW5jZTpudW1iZXIpXHJcblx0e1xyXG5cdFx0dmFyIHg6bnVtYmVyID0gYXhpcy54LCB5Om51bWJlciA9IGF4aXMueSwgejpudW1iZXIgPSBheGlzLno7XHJcblx0XHR2YXIgbGVuOm51bWJlciA9IGRpc3RhbmNlL01hdGguc3FydCh4KnggKyB5KnkgKyB6KnopO1xyXG5cclxuXHRcdHRoaXMuX2lNYXRyaXgzRC5wcmVwZW5kVHJhbnNsYXRpb24oeCpsZW4sIHkqbGVuLCB6Kmxlbik7XHJcblxyXG5cdFx0dGhpcy5fbWF0cml4M0QuY29weUNvbHVtblRvKDMsIHRoaXMuX3Bvcyk7XHJcblxyXG5cdFx0dGhpcy5feCA9IHRoaXMuX3Bvcy54O1xyXG5cdFx0dGhpcy5feSA9IHRoaXMuX3Bvcy55O1xyXG5cdFx0dGhpcy5feiA9IHRoaXMuX3Bvcy56O1xyXG5cclxuXHRcdHRoaXMuaW52YWxpZGF0ZVBvc2l0aW9uKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSb3RhdGVzIHRoZSAzZCBvYmplY3QgYXJvdW5kIGl0J3MgbG9jYWwgeS1heGlzXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gICAgYW5nbGUgICAgICAgIFRoZSBhbW91bnQgb2Ygcm90YXRpb24gaW4gZGVncmVlc1xyXG5cdCAqL1xyXG5cdHB1YmxpYyB5YXcoYW5nbGU6bnVtYmVyKVxyXG5cdHtcclxuXHRcdHRoaXMucm90YXRlKFZlY3RvcjNELllfQVhJUywgYW5nbGUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQGludGVybmFsXHJcblx0ICovXHJcblx0cHVibGljIF9pQ29udHJvbGxlcjpDb250cm9sbGVyQmFzZTtcclxuXHJcblx0LyoqXHJcblx0ICogQGludGVybmFsXHJcblx0ICovXHJcblx0cHVibGljIGdldCBfaUFzc2lnbmVkUGFydGl0aW9uKCk6UGFydGl0aW9uXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BJbXBsaWNpdFBhcnRpdGlvbjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSB0cmFuc2Zvcm1hdGlvbiBvZiB0aGUgM2Qgb2JqZWN0LCByZWxhdGl2ZSB0byB0aGUgbG9jYWwgY29vcmRpbmF0ZXMgb2YgdGhlIHBhcmVudCA8Y29kZT5PYmplY3RDb250YWluZXIzRDwvY29kZT4uXHJcblx0ICpcclxuXHQgKiBAaW50ZXJuYWxcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IF9pTWF0cml4M0QoKTpNYXRyaXgzRFxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9tYXRyaXgzRERpcnR5KVxyXG5cdFx0XHR0aGlzLl9wVXBkYXRlTWF0cml4M0QoKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fbWF0cml4M0Q7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IF9pTWF0cml4M0QodmFsOk1hdHJpeDNEKVxyXG5cdHtcclxuXHJcblx0XHQvLyBUT0RPOiBGcm9tIEFTMyAtIERvIHdlIHN0aWxsIG5lZWQgdGhpcyBpbiBKUyA/XHJcblx0XHQvL3JpZGljdWxvdXMgbWF0cml4IGVycm9yXHJcblx0XHQvKlxyXG5cdFx0aWYgKCF2YWwucmF3RGF0YVswXSkge1xyXG5cclxuXHRcdFx0dmFyIHJhdzpudW1iZXJbXSA9IE1hdHJpeDNEVXRpbHMuUkFXX0RBVEFfQ09OVEFJTkVSO1xyXG5cdFx0XHR2YWwuY29weVJhd0RhdGFUbyhyYXcpO1xyXG5cdFx0XHRyYXdbMF0gPSB0aGlzLl9zbWFsbGVzdE51bWJlcjtcclxuXHRcdFx0dmFsLmNvcHlSYXdEYXRhRnJvbShyYXcpO1xyXG5cdFx0fVxyXG5cdFx0Ly8qL1xyXG5cdFx0dmFyIGVsZW1lbnRzOkFycmF5PFZlY3RvcjNEPiA9IHZhbC5kZWNvbXBvc2UoKTtcclxuXHRcdHZhciB2ZWM6VmVjdG9yM0Q7XHJcblxyXG5cdFx0dmVjID0gZWxlbWVudHNbMF07XHJcblxyXG5cdFx0aWYgKHRoaXMuX3ggIT0gdmVjLnggfHwgdGhpcy5feSAhPSB2ZWMueSB8fCB0aGlzLl96ICE9IHZlYy56KSB7XHJcblx0XHRcdHRoaXMuX3ggPSB2ZWMueDtcclxuXHRcdFx0dGhpcy5feSA9IHZlYy55O1xyXG5cdFx0XHR0aGlzLl96ID0gdmVjLno7XHJcblxyXG5cdFx0XHR0aGlzLmludmFsaWRhdGVQb3NpdGlvbigpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZlYyA9IGVsZW1lbnRzWzFdO1xyXG5cclxuXHRcdGlmICh0aGlzLl9yb3RhdGlvblggIT0gdmVjLnggfHwgdGhpcy5fcm90YXRpb25ZICE9IHZlYy55IHx8IHRoaXMuX3JvdGF0aW9uWiAhPSB2ZWMueikge1xyXG5cdFx0XHR0aGlzLl9yb3RhdGlvblggPSB2ZWMueDtcclxuXHRcdFx0dGhpcy5fcm90YXRpb25ZID0gdmVjLnk7XHJcblx0XHRcdHRoaXMuX3JvdGF0aW9uWiA9IHZlYy56O1xyXG5cclxuXHRcdFx0dGhpcy5pbnZhbGlkYXRlUm90YXRpb24oKTtcclxuXHRcdH1cclxuXHJcblx0XHR2ZWMgPSBlbGVtZW50c1syXTtcclxuXHJcblx0XHRpZiAodGhpcy5fcFNjYWxlWCAhPSB2ZWMueCB8fCB0aGlzLl9wU2NhbGVZICE9IHZlYy55IHx8IHRoaXMuX3BTY2FsZVogIT0gdmVjLnopIHtcclxuXHRcdFx0dGhpcy5fcFNjYWxlWCA9IHZlYy54O1xyXG5cdFx0XHR0aGlzLl9wU2NhbGVZID0gdmVjLnk7XHJcblx0XHRcdHRoaXMuX3BTY2FsZVogPSB2ZWMuejtcclxuXHJcblx0XHRcdHRoaXMuaW52YWxpZGF0ZVNjYWxlKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAaW50ZXJuYWxcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IF9pUGlja2luZ0NvbGxpc2lvblZPKCk6UGlja2luZ0NvbGxpc2lvblZPXHJcblx0e1xyXG5cdFx0aWYgKCF0aGlzLl9wUGlja2luZ0NvbGxpc2lvblZPKVxyXG5cdFx0XHR0aGlzLl9wUGlja2luZ0NvbGxpc2lvblZPID0gbmV3IFBpY2tpbmdDb2xsaXNpb25WTyh0aGlzKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fcFBpY2tpbmdDb2xsaXNpb25WTztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBpbnRlcm5hbFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBpU2V0UGFyZW50KHZhbHVlOkRpc3BsYXlPYmplY3RDb250YWluZXIpXHJcblx0e1xyXG5cdFx0dGhpcy5fcFBhcmVudCA9IHZhbHVlO1xyXG5cclxuXHRcdGlmICh2YWx1ZSkge1xyXG5cdFx0XHR0aGlzLl9wVXBkYXRlSW1wbGljaXRNb3VzZUVuYWJsZWQodmFsdWUubW91c2VDaGlsZHJlbik7XHJcblx0XHRcdHRoaXMuX3BVcGRhdGVJbXBsaWNpdFZpc2liaWxpdHkodmFsdWUuX2lJc1Zpc2libGUoKSk7XHJcblx0XHRcdHRoaXMuX3BVcGRhdGVJbXBsaWNpdFBhcnRpdGlvbih2YWx1ZS5faUFzc2lnbmVkUGFydGl0aW9uKTtcclxuXHRcdFx0dGhpcy5faVNldFNjZW5lKHZhbHVlLl9wU2NlbmUpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5fcFVwZGF0ZUltcGxpY2l0TW91c2VFbmFibGVkKHRydWUpO1xyXG5cdFx0XHR0aGlzLl9wVXBkYXRlSW1wbGljaXRWaXNpYmlsaXR5KHRydWUpO1xyXG5cdFx0XHR0aGlzLl9wVXBkYXRlSW1wbGljaXRQYXJ0aXRpb24obnVsbCk7XHJcblxyXG5cdFx0XHR0aGlzLl9pU2V0U2NlbmUobnVsbCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAcHJvdGVjdGVkXHJcblx0ICovXHJcblx0cHVibGljIHBDcmVhdGVEZWZhdWx0Qm91bmRpbmdWb2x1bWUoKTpCb3VuZGluZ1ZvbHVtZUJhc2VcclxuXHR7XHJcblx0XHQvLyBwb2ludCBsaWdodHMgc2hvdWxkIGJlIHVzaW5nIHNwaGVyZSBib3VuZHNcclxuXHRcdC8vIGRpcmVjdGlvbmFsIGxpZ2h0cyBzaG91bGQgYmUgdXNpbmcgbnVsbCBib3VuZHNcclxuXHRcdHJldHVybiBuZXcgQXhpc0FsaWduZWRCb3VuZGluZ0JveCgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHByb3RlY3RlZFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBwQ3JlYXRlRW50aXR5UGFydGl0aW9uTm9kZSgpOkVudGl0eU5vZGVcclxuXHR7XHJcblx0XHR0aHJvdyBuZXcgQWJzdHJhY3RNZXRob2RFcnJvcigpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHByb3RlY3RlZFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBwSW52YWxpZGF0ZUJvdW5kcygpXHJcblx0e1xyXG5cdFx0dGhpcy5fcEJvdW5kc0ludmFsaWQgPSB0cnVlO1xyXG5cdFx0dGhpcy5fd29ybGRCb3VuZHNJbnZhbGlkID0gdHJ1ZTtcclxuXHJcblxyXG5cdFx0aWYgKHRoaXMuaXNFbnRpdHkpXHJcblx0XHRcdHRoaXMuaW52YWxpZGF0ZVBhcnRpdGlvbigpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHByb3RlY3RlZFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBwSW52YWxpZGF0ZVNjZW5lVHJhbnNmb3JtKClcclxuXHR7XHJcblx0XHR0aGlzLl9wU2NlbmVUcmFuc2Zvcm1EaXJ0eSA9ICF0aGlzLl9wSWdub3JlVHJhbnNmb3JtO1xyXG5cdFx0dGhpcy5faW52ZXJzZVNjZW5lVHJhbnNmb3JtRGlydHkgPSAhdGhpcy5fcElnbm9yZVRyYW5zZm9ybTtcclxuXHRcdHRoaXMuX3NjZW5lUG9zaXRpb25EaXJ0eSA9ICF0aGlzLl9wSWdub3JlVHJhbnNmb3JtO1xyXG5cclxuXHRcdHRoaXMuX3dvcmxkQm91bmRzSW52YWxpZCA9ICF0aGlzLl9wSWdub3JlVHJhbnNmb3JtO1xyXG5cclxuXHRcdGlmICh0aGlzLmlzRW50aXR5KVxyXG5cdFx0XHR0aGlzLmludmFsaWRhdGVQYXJ0aXRpb24oKTtcclxuXHJcblx0XHRpZiAodGhpcy5fbGlzdGVuVG9TY2VuZVRyYW5zZm9ybUNoYW5nZWQpXHJcblx0XHRcdHRoaXMubm90aWZ5U2NlbmVUcmFuc2Zvcm1DaGFuZ2UoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwcm90ZWN0ZWRcclxuXHQgKi9cclxuXHRwdWJsaWMgcFVwZGF0ZUJvdW5kcygpXHJcblx0e1xyXG5cdFx0dGhpcy5fd2lkdGggPSB0aGlzLl9wQm91bmRzLmFhYmIud2lkdGgqdGhpcy5fcFNjYWxlWDtcclxuXHRcdHRoaXMuX2hlaWdodCA9IHRoaXMuX3BCb3VuZHMuYWFiYi5oZWlnaHQqdGhpcy5fcFNjYWxlWTtcclxuXHRcdHRoaXMuX2RlcHRoID0gdGhpcy5fcEJvdW5kcy5hYWJiLmRlcHRoKnRoaXMuX3BTY2FsZVo7XHJcblxyXG5cdFx0dGhpcy5fcEJvdW5kc0ludmFsaWQgPSBmYWxzZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwcm90ZWN0ZWRcclxuXHQgKi9cclxuXHRwdWJsaWMgX3BVcGRhdGVJbXBsaWNpdE1vdXNlRW5hYmxlZCh2YWx1ZTpib29sZWFuKVxyXG5cdHtcclxuXHRcdHRoaXMuX3BJbXBsaWNpdE1vdXNlRW5hYmxlZCA9IHRoaXMuX2V4cGxpY2l0TW91c2VFbmFibGVkICYmIHZhbHVlO1xyXG5cclxuXHRcdC8vIElmIHRoZXJlIGlzIGEgcGFyZW50IGFuZCB0aGlzIGNoaWxkIGRvZXMgbm90IGhhdmUgYSBwaWNraW5nIGNvbGxpZGVyLCB1c2UgaXRzIHBhcmVudCdzIHBpY2tpbmcgY29sbGlkZXIuXHJcblx0XHRpZiAodGhpcy5fcEltcGxpY2l0TW91c2VFbmFibGVkICYmIHRoaXMuX3BQYXJlbnQgJiYgIXRoaXMuX3BQaWNraW5nQ29sbGlkZXIpXHJcblx0XHRcdHRoaXMuX3BQaWNraW5nQ29sbGlkZXIgPSAgdGhpcy5fcFBhcmVudC5fcFBpY2tpbmdDb2xsaWRlcjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwcm90ZWN0ZWRcclxuXHQgKi9cclxuXHRwdWJsaWMgX3BVcGRhdGVJbXBsaWNpdFBhcnRpdGlvbih2YWx1ZTpQYXJ0aXRpb24pXHJcblx0e1xyXG5cdFx0Ly8gYXNzaWduIHBhcmVudCBpbXBsaWNpdCBwYXJ0aXRpb24gaWYgbm8gZXhwbGljaXQgb25lIGlzIGdpdmVuXHJcblx0XHR0aGlzLl9wSW1wbGljaXRQYXJ0aXRpb24gPSB0aGlzLl9leHBsaWNpdFBhcnRpdGlvbiB8fCB2YWx1ZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwcm90ZWN0ZWRcclxuXHQgKi9cclxuXHRwdWJsaWMgX3BVcGRhdGVJbXBsaWNpdFZpc2liaWxpdHkodmFsdWU6Ym9vbGVhbilcclxuXHR7XHJcblx0XHR0aGlzLl9wSW1wbGljaXRWaXNpYmlsaXR5ID0gdGhpcy5fZXhwbGljaXRWaXNpYmlsaXR5ICYmIHZhbHVlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHByb3RlY3RlZFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBfcFVwZGF0ZU1hdHJpeDNEKClcclxuXHR7XHJcblxyXG5cdFx0dGhpcy5fcG9zLnggPSB0aGlzLl94O1xyXG5cdFx0dGhpcy5fcG9zLnkgPSB0aGlzLl95O1xyXG5cdFx0dGhpcy5fcG9zLnogPSB0aGlzLl96O1xyXG5cclxuXHRcdHRoaXMuX3JvdC54ID0gdGhpcy5fcm90YXRpb25YO1xyXG5cdFx0dGhpcy5fcm90LnkgPSB0aGlzLl9yb3RhdGlvblk7XHJcblx0XHR0aGlzLl9yb3QueiA9IHRoaXMuX3JvdGF0aW9uWjtcclxuXHJcblx0XHR0aGlzLl9zY2EueCA9IHRoaXMuX3BTY2FsZVg7XHJcblx0XHR0aGlzLl9zY2EueSA9IHRoaXMuX3BTY2FsZVk7XHJcblx0XHR0aGlzLl9zY2EueiA9IHRoaXMuX3BTY2FsZVo7XHJcblxyXG5cdFx0dGhpcy5fbWF0cml4M0QucmVjb21wb3NlKHRoaXMuX3RyYW5zZm9ybUNvbXBvbmVudHMpO1xyXG5cclxuXHRcdGlmICghdGhpcy5fcGl2b3RaZXJvKSB7XHJcblx0XHRcdHRoaXMuX21hdHJpeDNELnByZXBlbmRUcmFuc2xhdGlvbigtdGhpcy5fcGl2b3QueC90aGlzLl9wU2NhbGVYLCAtdGhpcy5fcGl2b3QueS90aGlzLl9wU2NhbGVZLCAtdGhpcy5fcGl2b3Quei90aGlzLl9wU2NhbGVaKTtcclxuXHRcdFx0aWYgKHRoaXMuYWxpZ25tZW50TW9kZSAhPSBBbGlnbm1lbnRNb2RlLlBJVk9UX1BPSU5UKVxyXG5cdFx0XHRcdHRoaXMuX21hdHJpeDNELmFwcGVuZFRyYW5zbGF0aW9uKHRoaXMuX3Bpdm90LngsIHRoaXMuX3Bpdm90LnksIHRoaXMuX3Bpdm90LnopO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX21hdHJpeDNERGlydHkgPSBmYWxzZTtcclxuXHRcdHRoaXMuX3Bvc2l0aW9uRGlydHkgPSBmYWxzZTtcclxuXHRcdHRoaXMuX3JvdGF0aW9uRGlydHkgPSBmYWxzZTtcclxuXHRcdHRoaXMuX3NjYWxlRGlydHkgPSBmYWxzZTtcclxuXHRcdHRoaXMuX3Bpdm90RGlydHkgPSBmYWxzZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwcm90ZWN0ZWRcclxuXHQgKi9cclxuXHRwdWJsaWMgcFVwZGF0ZVNjZW5lVHJhbnNmb3JtKClcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fcFBhcmVudCAmJiAhdGhpcy5fcFBhcmVudC5faUlzUm9vdCkge1xyXG5cdFx0XHR0aGlzLl9wU2NlbmVUcmFuc2Zvcm0uY29weUZyb20odGhpcy5fcFBhcmVudC5zY2VuZVRyYW5zZm9ybSk7XHJcblx0XHRcdHRoaXMuX3BTY2VuZVRyYW5zZm9ybS5wcmVwZW5kKHRoaXMuX2lNYXRyaXgzRCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLl9wU2NlbmVUcmFuc2Zvcm0uY29weUZyb20odGhpcy5faU1hdHJpeDNEKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLl9wU2NlbmVUcmFuc2Zvcm1EaXJ0eSA9IGZhbHNlO1xyXG5cdH1cclxuXHJcblx0cHVibGljIF9pQWRkUmVuZGVyYWJsZShyZW5kZXJhYmxlOklSZW5kZXJhYmxlKTpJUmVuZGVyYWJsZVxyXG5cdHtcclxuXHRcdHRoaXMuX3BSZW5kZXJhYmxlcy5wdXNoKHJlbmRlcmFibGUpO1xyXG5cclxuXHRcdHJldHVybiByZW5kZXJhYmxlO1xyXG5cdH1cclxuXHJcblxyXG5cdHB1YmxpYyBfaVJlbW92ZVJlbmRlcmFibGUocmVuZGVyYWJsZTpJUmVuZGVyYWJsZSk6SVJlbmRlcmFibGVcclxuXHR7XHJcblx0XHR2YXIgaW5kZXg6bnVtYmVyID0gdGhpcy5fcFJlbmRlcmFibGVzLmluZGV4T2YocmVuZGVyYWJsZSk7XHJcblxyXG5cdFx0dGhpcy5fcFJlbmRlcmFibGVzLnNwbGljZShpbmRleCwgMSk7XHJcblxyXG5cdFx0cmV0dXJuIHJlbmRlcmFibGU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiAvL1RPRE9cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBzaG9ydGVzdENvbGxpc2lvbkRpc3RhbmNlXHJcblx0ICogQHBhcmFtIGZpbmRDbG9zZXN0XHJcblx0ICogQHJldHVybnMge2Jvb2xlYW59XHJcblx0ICpcclxuXHQgKiBAaW50ZXJuYWxcclxuXHQgKi9cclxuXHRwdWJsaWMgX2lUZXN0Q29sbGlzaW9uKHNob3J0ZXN0Q29sbGlzaW9uRGlzdGFuY2U6bnVtYmVyLCBmaW5kQ2xvc2VzdDpib29sZWFuKTpib29sZWFuXHJcblx0e1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgX2lJbnRlcm5hbFVwZGF0ZSgpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX2lDb250cm9sbGVyKVxyXG5cdFx0XHR0aGlzLl9pQ29udHJvbGxlci51cGRhdGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBpbnRlcm5hbFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBfaUlzVmlzaWJsZSgpOmJvb2xlYW5cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcEltcGxpY2l0VmlzaWJpbGl0eTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBpbnRlcm5hbFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBfaUlzTW91c2VFbmFibGVkKCk6Ym9vbGVhblxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9wSW1wbGljaXRNb3VzZUVuYWJsZWQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAaW50ZXJuYWxcclxuXHQgKi9cclxuXHRwdWJsaWMgX2lTZXRTY2VuZSh2YWx1ZTpTY2VuZSlcclxuXHR7XHJcblx0XHQvLyB0ZXN0IHRvIHNlZSBpZiB3ZSdyZSBzd2l0Y2hpbmcgcm9vdHMgd2hpbGUgd2UncmUgYWxyZWFkeSB1c2luZyBhIHNjZW5lIHBhcnRpdGlvblxyXG5cdFx0LypcclxuXHRcdGlmICh2YWx1ZSA9PSBudWxsKVxyXG5cdFx0XHR0aGlzLl9vbGRTY2VuZSA9IHRoaXMuX3BTY2VuZTtcclxuXHJcblx0XHRpZiAodGhpcy5fZXhwbGljaXRQYXJ0aXRpb24gJiYgdGhpcy5fb2xkU2NlbmUgJiYgdGhpcy5fb2xkU2NlbmUgIT0gdGhpcy5fcFNjZW5lKVxyXG5cdFx0XHR0aGlzLnBhcnRpdGlvbiA9IG51bGw7XHJcblxyXG5cdFx0aWYgKHZhbHVlKVxyXG5cdFx0XHR0aGlzLl9vbGRTY2VuZSA9IG51bGw7XHJcblxyXG5cdFx0Ly8gZW5kIG9mIHN0dXBpZCBwYXJ0aXRpb24gdGVzdCBjb2RlXHJcblx0XHQvLyovXHJcblxyXG5cdFx0aWYgKHRoaXMuX3BTY2VuZSA9PSB2YWx1ZSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX3BVcGRhdGVTY2VuZSh2YWx1ZSk7XHJcblxyXG5cdFx0aWYgKCF0aGlzLl9wU2NlbmVUcmFuc2Zvcm1EaXJ0eSAmJiAhdGhpcy5fcElnbm9yZVRyYW5zZm9ybSlcclxuXHRcdFx0dGhpcy5wSW52YWxpZGF0ZVNjZW5lVHJhbnNmb3JtKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAcHJvdGVjdGVkXHJcblx0ICovXHJcblx0cHVibGljIF9wVXBkYXRlU2NlbmUodmFsdWU6U2NlbmUpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX3BTY2VuZSkge1xyXG5cdFx0XHR0aGlzLl9wU2NlbmUuZGlzcGF0Y2hFdmVudChuZXcgU2NlbmVFdmVudChTY2VuZUV2ZW50LlJFTU9WRURfRlJPTV9TQ0VORSwgdGhpcykpO1xyXG5cclxuXHRcdFx0Ly91bnJlZ2lzdGVyIGVudGl0eSBmcm9tIGN1cnJlbnQgc2NlbmVcclxuXHRcdFx0dGhpcy5fcFNjZW5lLmlVbnJlZ2lzdGVyRW50aXR5KHRoaXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX3BTY2VuZSA9IHZhbHVlO1xyXG5cclxuXHRcdGlmICh2YWx1ZSkge1xyXG5cdFx0XHR2YWx1ZS5kaXNwYXRjaEV2ZW50KG5ldyBTY2VuZUV2ZW50KFNjZW5lRXZlbnQuQURERURfVE9fU0NFTkUsIHRoaXMpKTtcclxuXHJcblx0XHRcdC8vcmVnaXN0ZXIgZW50aXR5IHdpdGggbmV3IHNjZW5lXHJcblx0XHRcdHZhbHVlLmlSZWdpc3RlckVudGl0eSh0aGlzKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLm5vdGlmeVNjZW5lQ2hhbmdlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgbm90aWZ5UG9zaXRpb25DaGFuZ2VkKClcclxuXHR7XHJcblx0XHRpZiAoIXRoaXMuX3Bvc2l0aW9uQ2hhbmdlZClcclxuXHRcdFx0dGhpcy5fcG9zaXRpb25DaGFuZ2VkID0gbmV3IERpc3BsYXlPYmplY3RFdmVudChEaXNwbGF5T2JqZWN0RXZlbnQuUE9TSVRJT05fQ0hBTkdFRCwgdGhpcyk7XHJcblxyXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KHRoaXMuX3Bvc2l0aW9uQ2hhbmdlZCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgbm90aWZ5Um90YXRpb25DaGFuZ2VkKClcclxuXHR7XHJcblx0XHRpZiAoIXRoaXMuX3JvdGF0aW9uQ2hhbmdlZClcclxuXHRcdFx0dGhpcy5fcm90YXRpb25DaGFuZ2VkID0gbmV3IERpc3BsYXlPYmplY3RFdmVudChEaXNwbGF5T2JqZWN0RXZlbnQuUk9UQVRJT05fQ0hBTkdFRCwgdGhpcyk7XHJcblxyXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KHRoaXMuX3JvdGF0aW9uQ2hhbmdlZCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgbm90aWZ5U2NhbGVDaGFuZ2VkKClcclxuXHR7XHJcblx0XHRpZiAoIXRoaXMuX3NjYWxlQ2hhbmdlZClcclxuXHRcdFx0dGhpcy5fc2NhbGVDaGFuZ2VkID0gbmV3IERpc3BsYXlPYmplY3RFdmVudChEaXNwbGF5T2JqZWN0RXZlbnQuU0NBTEVfQ0hBTkdFRCwgdGhpcyk7XHJcblxyXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KHRoaXMuX3NjYWxlQ2hhbmdlZCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgbm90aWZ5U2NlbmVDaGFuZ2UoKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9saXN0ZW5Ub1NjZW5lQ2hhbmdlZCkge1xyXG5cdFx0XHRpZiAoIXRoaXMuX3NjZW5lY2hhbmdlZClcclxuXHRcdFx0XHR0aGlzLl9zY2VuZWNoYW5nZWQgPSBuZXcgRGlzcGxheU9iamVjdEV2ZW50KERpc3BsYXlPYmplY3RFdmVudC5TQ0VORV9DSEFOR0VELCB0aGlzKTtcclxuXHJcblx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudCh0aGlzLl9zY2VuZWNoYW5nZWQpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIG5vdGlmeVNjZW5lVHJhbnNmb3JtQ2hhbmdlKClcclxuXHR7XHJcblx0XHRpZiAoIXRoaXMuX3NjZW5lVHJhbnNmb3JtQ2hhbmdlZClcclxuXHRcdFx0dGhpcy5fc2NlbmVUcmFuc2Zvcm1DaGFuZ2VkID0gbmV3IERpc3BsYXlPYmplY3RFdmVudChEaXNwbGF5T2JqZWN0RXZlbnQuU0NFTkVUUkFOU0ZPUk1fQ0hBTkdFRCwgdGhpcyk7XHJcblxyXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KHRoaXMuX3NjZW5lVHJhbnNmb3JtQ2hhbmdlZCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJbnZhbGlkYXRlcyB0aGUgM0QgdHJhbnNmb3JtYXRpb24gbWF0cml4LCBjYXVzaW5nIGl0IHRvIGJlIHVwZGF0ZWQgdXBvbiB0aGUgbmV4dCByZXF1ZXN0XHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaW52YWxpZGF0ZU1hdHJpeDNEKCk6dm9pZFxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9tYXRyaXgzRERpcnR5KVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fbWF0cml4M0REaXJ0eSA9IHRydWU7XHJcblxyXG5cdFx0aWYgKCF0aGlzLl9wU2NlbmVUcmFuc2Zvcm1EaXJ0eSAmJiAhdGhpcy5fcElnbm9yZVRyYW5zZm9ybSlcclxuXHRcdFx0dGhpcy5wSW52YWxpZGF0ZVNjZW5lVHJhbnNmb3JtKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaW52YWxpZGF0ZVBhcnRpdGlvbigpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX2lBc3NpZ25lZFBhcnRpdGlvbilcclxuXHRcdFx0dGhpcy5faUFzc2lnbmVkUGFydGl0aW9uLmlNYXJrRm9yVXBkYXRlKHRoaXMpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIGludmFsaWRhdGVQaXZvdCgpXHJcblx0e1xyXG5cdFx0dGhpcy5fcGl2b3RaZXJvID0gKHRoaXMuX3Bpdm90LnggPT0gMCkgJiYgKHRoaXMuX3Bpdm90LnkgPT0gMCkgJiYgKHRoaXMuX3Bpdm90LnogPT0gMCk7XHJcblxyXG5cdFx0aWYgKHRoaXMuX3Bpdm90RGlydHkpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9waXZvdERpcnR5ID0gdHJ1ZTtcclxuXHJcblx0XHR0aGlzLmludmFsaWRhdGVNYXRyaXgzRCgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIGludmFsaWRhdGVQb3NpdGlvbigpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX3Bvc2l0aW9uRGlydHkpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9wb3NpdGlvbkRpcnR5ID0gdHJ1ZTtcclxuXHJcblx0XHR0aGlzLmludmFsaWRhdGVNYXRyaXgzRCgpO1xyXG5cclxuXHRcdGlmICh0aGlzLl9saXN0ZW5Ub1Bvc2l0aW9uQ2hhbmdlZClcclxuXHRcdFx0dGhpcy5ub3RpZnlQb3NpdGlvbkNoYW5nZWQoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBpbnZhbGlkYXRlUm90YXRpb24oKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9yb3RhdGlvbkRpcnR5KVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fcm90YXRpb25EaXJ0eSA9IHRydWU7XHJcblxyXG5cdFx0dGhpcy5pbnZhbGlkYXRlTWF0cml4M0QoKTtcclxuXHJcblx0XHRpZiAodGhpcy5fbGlzdGVuVG9Sb3RhdGlvbkNoYW5nZWQpXHJcblx0XHRcdHRoaXMubm90aWZ5Um90YXRpb25DaGFuZ2VkKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaW52YWxpZGF0ZVNjYWxlKClcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fc2NhbGVEaXJ0eSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX3NjYWxlRGlydHkgPSB0cnVlO1xyXG5cclxuXHRcdHRoaXMuaW52YWxpZGF0ZU1hdHJpeDNEKCk7XHJcblxyXG5cdFx0aWYgKHRoaXMuX2xpc3RlblRvU2NhbGVDaGFuZ2VkKVxyXG5cdFx0XHR0aGlzLm5vdGlmeVNjYWxlQ2hhbmdlZCgpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0ID0gRGlzcGxheU9iamVjdDsiXX0=