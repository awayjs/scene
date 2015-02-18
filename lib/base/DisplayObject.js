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
            if (this._boxBoundsInvalid)
                this._pUpdateBoxBounds();
            return this._pBoxBounds.depth * this._pScaleZ;
        },
        set: function (val) {
            var scaleZ = val / this.getBox().depth;
            if (this._pScaleZ == scaleZ)
                return;
            this._pScaleZ = scaleZ;
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
            if (this._boxBoundsInvalid)
                this._pUpdateBoxBounds();
            return this._pBoxBounds.height * this._pScaleY;
        },
        set: function (val) {
            var scaleY = val / this.getBox().height;
            if (this._pScaleY == scaleY)
                return;
            this._pScaleY = scaleY;
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
            if (this._boxBoundsInvalid)
                this._pUpdateBoxBounds();
            return this._pBoxBounds.width * this._pScaleX;
        },
        set: function (val) {
            var scaleX = val / this.getBox().width;
            if (this._pScaleX == scaleX)
                return;
            this._pScaleX = scaleX;
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
        if (this._boxBoundsInvalid)
            this._pUpdateBoxBounds();
        return this._pBoxBounds;
    };
    DisplayObject.prototype.getSphere = function (targetCoordinateSpace) {
        if (targetCoordinateSpace === void 0) { targetCoordinateSpace = null; }
        if (this._iSourcePrefab)
            this._iSourcePrefab._iValidate();
        if (this._sphereBoundsInvalid)
            this._pUpdateSphereBounds();
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0Rpc3BsYXlPYmplY3QudHMiXSwibmFtZXMiOlsiRGlzcGxheU9iamVjdCIsIkRpc3BsYXlPYmplY3QuY29uc3RydWN0b3IiLCJEaXNwbGF5T2JqZWN0LmJvdW5kc1R5cGUiLCJEaXNwbGF5T2JqZWN0LmRlcHRoIiwiRGlzcGxheU9iamVjdC5ldWxlcnMiLCJEaXNwbGF5T2JqZWN0LmhlaWdodCIsIkRpc3BsYXlPYmplY3QuaW5kZXgiLCJEaXNwbGF5T2JqZWN0LmludmVyc2VTY2VuZVRyYW5zZm9ybSIsIkRpc3BsYXlPYmplY3QuaWdub3JlVHJhbnNmb3JtIiwiRGlzcGxheU9iamVjdC5pc0VudGl0eSIsIkRpc3BsYXlPYmplY3QubG9hZGVySW5mbyIsIkRpc3BsYXlPYmplY3QubW91c2VFbmFibGVkIiwiRGlzcGxheU9iamVjdC5tb3VzZVgiLCJEaXNwbGF5T2JqZWN0Lm1vdXNlWSIsIkRpc3BsYXlPYmplY3QucGFyZW50IiwiRGlzcGxheU9iamVjdC5wYXJ0aXRpb24iLCJEaXNwbGF5T2JqZWN0LnBpY2tpbmdDb2xsaWRlciIsIkRpc3BsYXlPYmplY3QucGl2b3QiLCJEaXNwbGF5T2JqZWN0LnJvb3QiLCJEaXNwbGF5T2JqZWN0LnJvdGF0aW9uWCIsIkRpc3BsYXlPYmplY3Qucm90YXRpb25ZIiwiRGlzcGxheU9iamVjdC5yb3RhdGlvbloiLCJEaXNwbGF5T2JqZWN0LnNjYWxlWCIsIkRpc3BsYXlPYmplY3Quc2NhbGVZIiwiRGlzcGxheU9iamVjdC5zY2FsZVoiLCJEaXNwbGF5T2JqZWN0LnNjZW5lIiwiRGlzcGxheU9iamVjdC5zY2VuZVBvc2l0aW9uIiwiRGlzcGxheU9iamVjdC5zY2VuZVRyYW5zZm9ybSIsIkRpc3BsYXlPYmplY3Quc2hhZGVyUGlja2luZ0RldGFpbHMiLCJEaXNwbGF5T2JqZWN0LmRlYnVnVmlzaWJsZSIsIkRpc3BsYXlPYmplY3QudHJhbnNmb3JtIiwiRGlzcGxheU9iamVjdC52aXNpYmxlIiwiRGlzcGxheU9iamVjdC53aWR0aCIsIkRpc3BsYXlPYmplY3QueCIsIkRpc3BsYXlPYmplY3QueSIsIkRpc3BsYXlPYmplY3QueiIsIkRpc3BsYXlPYmplY3Quek9mZnNldCIsIkRpc3BsYXlPYmplY3QuYWRkRXZlbnRMaXN0ZW5lciIsIkRpc3BsYXlPYmplY3QuY2xvbmUiLCJEaXNwbGF5T2JqZWN0LmRpc3Bvc2UiLCJEaXNwbGF5T2JqZWN0LmRpc3Bvc2VBc3NldCIsIkRpc3BsYXlPYmplY3QuZ2V0Qm91bmRzIiwiRGlzcGxheU9iamVjdC5nZXRSZWN0IiwiRGlzcGxheU9iamVjdC5nZXRCb3giLCJEaXNwbGF5T2JqZWN0LmdldFNwaGVyZSIsIkRpc3BsYXlPYmplY3QuZ2xvYmFsVG9Mb2NhbCIsIkRpc3BsYXlPYmplY3QuZ2xvYmFsVG9Mb2NhbDNEIiwiRGlzcGxheU9iamVjdC5oaXRUZXN0T2JqZWN0IiwiRGlzcGxheU9iamVjdC5oaXRUZXN0UG9pbnQiLCJEaXNwbGF5T2JqZWN0Lmxvb2tBdCIsIkRpc3BsYXlPYmplY3QubG9jYWxUb0dsb2JhbCIsIkRpc3BsYXlPYmplY3QubG9jYWxUb0dsb2JhbDNEIiwiRGlzcGxheU9iamVjdC5tb3ZlVG8iLCJEaXNwbGF5T2JqZWN0Lm1vdmVQaXZvdCIsIkRpc3BsYXlPYmplY3QucGl0Y2giLCJEaXNwbGF5T2JqZWN0LmdldFJlbmRlclNjZW5lVHJhbnNmb3JtIiwiRGlzcGxheU9iamVjdC5yb2xsIiwiRGlzcGxheU9iamVjdC5yb3RhdGUiLCJEaXNwbGF5T2JqZWN0LnJvdGF0ZVRvIiwiRGlzcGxheU9iamVjdC5yZW1vdmVFdmVudExpc3RlbmVyIiwiRGlzcGxheU9iamVjdC50cmFuc2xhdGUiLCJEaXNwbGF5T2JqZWN0LnRyYW5zbGF0ZUxvY2FsIiwiRGlzcGxheU9iamVjdC55YXciLCJEaXNwbGF5T2JqZWN0Ll9pQXNzaWduZWRQYXJ0aXRpb24iLCJEaXNwbGF5T2JqZWN0Ll9pTWF0cml4M0QiLCJEaXNwbGF5T2JqZWN0Ll9pUGlja2luZ0NvbGxpc2lvblZPIiwiRGlzcGxheU9iamVjdC5pU2V0UGFyZW50IiwiRGlzcGxheU9iamVjdC5wSW52YWxpZGF0ZVNjZW5lVHJhbnNmb3JtIiwiRGlzcGxheU9iamVjdC5fcFVwZGF0ZUltcGxpY2l0TW91c2VFbmFibGVkIiwiRGlzcGxheU9iamVjdC5fcFVwZGF0ZUltcGxpY2l0UGFydGl0aW9uIiwiRGlzcGxheU9iamVjdC5fcFVwZGF0ZUltcGxpY2l0VmlzaWJpbGl0eSIsIkRpc3BsYXlPYmplY3QuX3BVcGRhdGVNYXRyaXgzRCIsIkRpc3BsYXlPYmplY3QucFVwZGF0ZVNjZW5lVHJhbnNmb3JtIiwiRGlzcGxheU9iamVjdC5faUFkZFJlbmRlcmFibGUiLCJEaXNwbGF5T2JqZWN0Ll9pUmVtb3ZlUmVuZGVyYWJsZSIsIkRpc3BsYXlPYmplY3QuX2lUZXN0Q29sbGlzaW9uIiwiRGlzcGxheU9iamVjdC5faUludGVybmFsVXBkYXRlIiwiRGlzcGxheU9iamVjdC5faUlzVmlzaWJsZSIsIkRpc3BsYXlPYmplY3QuX2lJc01vdXNlRW5hYmxlZCIsIkRpc3BsYXlPYmplY3QuX2lTZXRTY2VuZSIsIkRpc3BsYXlPYmplY3Qubm90aWZ5UG9zaXRpb25DaGFuZ2VkIiwiRGlzcGxheU9iamVjdC5ub3RpZnlSb3RhdGlvbkNoYW5nZWQiLCJEaXNwbGF5T2JqZWN0Lm5vdGlmeVNjYWxlQ2hhbmdlZCIsIkRpc3BsYXlPYmplY3Qubm90aWZ5U2NlbmVDaGFuZ2UiLCJEaXNwbGF5T2JqZWN0Lm5vdGlmeVNjZW5lVHJhbnNmb3JtQ2hhbmdlIiwiRGlzcGxheU9iamVjdC5pbnZhbGlkYXRlTWF0cml4M0QiLCJEaXNwbGF5T2JqZWN0LmludmFsaWRhdGVQYXJ0aXRpb24iLCJEaXNwbGF5T2JqZWN0LmludmFsaWRhdGVQaXZvdCIsIkRpc3BsYXlPYmplY3QuaW52YWxpZGF0ZVBvc2l0aW9uIiwiRGlzcGxheU9iamVjdC5pbnZhbGlkYXRlUm90YXRpb24iLCJEaXNwbGF5T2JqZWN0LmludmFsaWRhdGVTY2FsZSIsIkRpc3BsYXlPYmplY3QuX2lBZGRFbnRpdHlOb2RlIiwiRGlzcGxheU9iamVjdC5faVJlbW92ZUVudGl0eU5vZGUiLCJEaXNwbGF5T2JqZWN0Ll9wUmVnaXN0ZXJFbnRpdHkiLCJEaXNwbGF5T2JqZWN0Ll9wVW5yZWdpc3RlckVudGl0eSIsIkRpc3BsYXlPYmplY3QuX3BJbnZhbGlkYXRlQm91bmRzIiwiRGlzcGxheU9iamVjdC5fcFVwZGF0ZUJveEJvdW5kcyIsIkRpc3BsYXlPYmplY3QuX3BVcGRhdGVTcGhlcmVCb3VuZHMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLElBQU8sR0FBRyxXQUFpQiwwQkFBMEIsQ0FBQyxDQUFDO0FBQ3ZELElBQU8sTUFBTSxXQUFnQiw2QkFBNkIsQ0FBQyxDQUFDO0FBQzVELElBQU8sVUFBVSxXQUFlLGlDQUFpQyxDQUFDLENBQUM7QUFDbkUsSUFBTyxRQUFRLFdBQWdCLCtCQUErQixDQUFDLENBQUM7QUFDaEUsSUFBTyxhQUFhLFdBQWMsb0NBQW9DLENBQUMsQ0FBQztBQUN4RSxJQUFPLEtBQUssV0FBZ0IsNEJBQTRCLENBQUMsQ0FBQztBQUUxRCxJQUFPLFFBQVEsV0FBZ0IsK0JBQStCLENBQUMsQ0FBQztBQUNoRSxJQUFPLGNBQWMsV0FBYyx3Q0FBd0MsQ0FBQyxDQUFDO0FBQzdFLElBQU8sbUJBQW1CLFdBQWEsNENBQTRDLENBQUMsQ0FBQztBQUtyRixJQUFPLGFBQWEsV0FBYyx1Q0FBdUMsQ0FBQyxDQUFDO0FBRTNFLElBQU8sZUFBZSxXQUFjLHlDQUF5QyxDQUFDLENBQUM7QUFFL0UsSUFBTyxTQUFTLFdBQWUsbUNBQW1DLENBQUMsQ0FBQztBQUlwRSxJQUFPLGtCQUFrQixXQUFhLDRDQUE0QyxDQUFDLENBQUM7QUFHcEYsSUFBTyxrQkFBa0IsV0FBYSw4Q0FBOEMsQ0FBQyxDQUFDO0FBQ3RGLElBQU8sVUFBVSxXQUFlLHNDQUFzQyxDQUFDLENBQUM7QUFHeEUsQUFpSUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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QUFDQSxTQUFTQSxFQUFFQSxDQUFDQTtRQUNuQkEsQ0FBQ0E7UUFFREEsS0FBS0EsR0FBR0EsS0FBS0EsQ0FBQ0EsWUFBWUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7UUFFbENBLEdBQUdBLEdBQUdBLGFBQWFBLENBQUNBLGtCQUFrQkEsQ0FBQ0E7UUFFdkNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBO1FBQ2pCQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNqQkEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDakJBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1FBRVhBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBO1FBQ2pCQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNqQkEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDakJBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1FBRVhBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBO1FBQ2pCQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNqQkEsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDbEJBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1FBRVpBLElBQUlBLENBQUNBLEdBQVlBLElBQUlBLFFBQVFBLEVBQUVBLENBQUNBO1FBQ2hDQSxDQUFDQSxDQUFD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QUNBLENBQUNBLENBQUNBO2dCQUNoQkEsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2hCQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFFaEJBLElBQUlBLENBQUNBLGtCQUFrQkEsRUFBRUEsQ0FBQ0E7WUFDM0JBLENBQUNBO1lBRURBLEdBQUdBLEdBQUdBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBRWxCQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxVQUFVQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxVQUFVQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDdEZBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO2dCQUN4QkEsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3hCQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFFeEJBLElBQUlBLENBQUNBLGtCQUFrQkEsRUFBRUEsQ0FBQ0E7WUFDM0JBLENBQUNBO1lBRURBLEdBQUdBLEdBQUdBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBRWxCQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxRQUFRQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxRQUFRQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDaEZBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLEdBQUdBLENB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QUdBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBO1FBQ3RCQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQTtRQUN0QkEsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7UUFFdEJBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBO1FBQzlCQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQTtRQUM5QkEsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0E7UUFFOUJBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBO1FBQzVCQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQTtRQUM1QkEsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7UUFFNUJBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLG9CQUFvQkEsQ0FBQ0EsQ0FBQ0E7UUFFcERBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBLENBQUNBO1lBQ3RCQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxrQkFBa0JBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLFFBQVFBLEVBQUVBLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLFFBQVFBLEVBQUVBLENBQUNBLElBQUlBLENBQUNB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QUFDQSxjQUFjQSxJQUFJQSxJQUFJQSxDQUFDQTtZQUMvQkEsSUFBSUEsQ0FBQ0EsY0FBY0EsR0FBR0EsSUFBSUEsTUFBTUEsRUFBRUEsQ0FBQ0E7SUFDckNBLENBQUNBO0lBQ0ZqRyxvQkFBQ0E7QUFBREEsQ0Exb0VBLEFBMG9FQ0EsRUExb0UyQixjQUFjLEVBMG9FekM7QUFFRCxBQUF1QixpQkFBZCxhQUFhLENBQUMiLCJmaWxlIjoiYmFzZS9EaXNwbGF5T2JqZWN0LmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCbGVuZE1vZGVcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2Jhc2UvQmxlbmRNb2RlXCIpO1xyXG5pbXBvcnQgQm94XHRcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9Cb3hcIik7XHJcbmltcG9ydCBTcGhlcmVcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9TcGhlcmVcIik7XHJcbmltcG9ydCBNYXRoQ29uc3RzXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL01hdGhDb25zdHNcIik7XHJcbmltcG9ydCBNYXRyaXgzRFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL01hdHJpeDNEXCIpO1xyXG5pbXBvcnQgTWF0cml4M0RVdGlsc1x0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vTWF0cml4M0RVdGlsc1wiKTtcclxuaW1wb3J0IFBvaW50XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vUG9pbnRcIik7XHJcbmltcG9ydCBSZWN0YW5nbGVcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vUmVjdGFuZ2xlXCIpO1xyXG5pbXBvcnQgVmVjdG9yM0RcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9WZWN0b3IzRFwiKTtcclxuaW1wb3J0IE5hbWVkQXNzZXRCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9OYW1lZEFzc2V0QmFzZVwiKTtcclxuaW1wb3J0IEFic3RyYWN0TWV0aG9kRXJyb3JcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXJyb3JzL0Fic3RyYWN0TWV0aG9kRXJyb3JcIik7XHJcblxyXG5pbXBvcnQgRGlzcGxheU9iamVjdENvbnRhaW5lclx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvY29udGFpbmVycy9EaXNwbGF5T2JqZWN0Q29udGFpbmVyXCIpO1xyXG5pbXBvcnQgU2NlbmVcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvY29udGFpbmVycy9TY2VuZVwiKTtcclxuaW1wb3J0IENvbnRyb2xsZXJCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvY29udHJvbGxlcnMvQ29udHJvbGxlckJhc2VcIik7XHJcbmltcG9ydCBBbGlnbm1lbnRNb2RlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9BbGlnbm1lbnRNb2RlXCIpO1xyXG5pbXBvcnQgTG9hZGVySW5mb1x0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9Mb2FkZXJJbmZvXCIpO1xyXG5pbXBvcnQgT3JpZW50YXRpb25Nb2RlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9PcmllbnRhdGlvbk1vZGVcIik7XHJcbmltcG9ydCBJQml0bWFwRHJhd2FibGVcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0lCaXRtYXBEcmF3YWJsZVwiKTtcclxuaW1wb3J0IFRyYW5zZm9ybVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9UcmFuc2Zvcm1cIik7XHJcbmltcG9ydCBFbnRpdHlOb2RlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vRW50aXR5Tm9kZVwiKTtcclxuaW1wb3J0IFBhcnRpdGlvblx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcGFydGl0aW9uL1BhcnRpdGlvblwiKTtcclxuaW1wb3J0IElQaWNraW5nQ29sbGlkZXJcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9waWNrL0lQaWNraW5nQ29sbGlkZXJcIik7XHJcbmltcG9ydCBQaWNraW5nQ29sbGlzaW9uVk9cdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcGljay9QaWNraW5nQ29sbGlzaW9uVk9cIik7XHJcbmltcG9ydCBJUmVuZGVyYWJsZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcG9vbC9JUmVuZGVyYWJsZVwiKTtcclxuaW1wb3J0IENhbWVyYVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9DYW1lcmFcIik7XHJcbmltcG9ydCBEaXNwbGF5T2JqZWN0RXZlbnRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZXZlbnRzL0Rpc3BsYXlPYmplY3RFdmVudFwiKTtcclxuaW1wb3J0IFNjZW5lRXZlbnRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2V2ZW50cy9TY2VuZUV2ZW50XCIpO1xyXG5pbXBvcnQgUHJlZmFiQmFzZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcHJlZmFicy9QcmVmYWJCYXNlXCIpO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBEaXNwbGF5T2JqZWN0IGNsYXNzIGlzIHRoZSBiYXNlIGNsYXNzIGZvciBhbGwgb2JqZWN0cyB0aGF0IGNhbiBiZVxyXG4gKiBwbGFjZWQgb24gdGhlIGRpc3BsYXkgbGlzdC4gVGhlIGRpc3BsYXkgbGlzdCBtYW5hZ2VzIGFsbCBvYmplY3RzIGRpc3BsYXllZFxyXG4gKiBpbiBmbGFzaC4gVXNlIHRoZSBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIGNsYXNzIHRvIGFycmFuZ2UgdGhlXHJcbiAqIGRpc3BsYXkgb2JqZWN0cyBpbiB0aGUgZGlzcGxheSBsaXN0LiBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIG9iamVjdHMgY2FuXHJcbiAqIGhhdmUgY2hpbGQgZGlzcGxheSBvYmplY3RzLCB3aGlsZSBvdGhlciBkaXNwbGF5IG9iamVjdHMsIHN1Y2ggYXMgU2hhcGUgYW5kXHJcbiAqIFRleHRGaWVsZCBvYmplY3RzLCBhcmUgXCJsZWFmXCIgbm9kZXMgdGhhdCBoYXZlIG9ubHkgcGFyZW50cyBhbmQgc2libGluZ3MsIG5vXHJcbiAqIGNoaWxkcmVuLlxyXG4gKlxyXG4gKiA8cD5UaGUgRGlzcGxheU9iamVjdCBjbGFzcyBzdXBwb3J0cyBiYXNpYyBmdW5jdGlvbmFsaXR5IGxpa2UgdGhlIDxpPng8L2k+XHJcbiAqIGFuZCA8aT55PC9pPiBwb3NpdGlvbiBvZiBhbiBvYmplY3QsIGFzIHdlbGwgYXMgbW9yZSBhZHZhbmNlZCBwcm9wZXJ0aWVzIG9mXHJcbiAqIHRoZSBvYmplY3Qgc3VjaCBhcyBpdHMgdHJhbnNmb3JtYXRpb24gbWF0cml4LiA8L3A+XHJcbiAqXHJcbiAqIDxwPkRpc3BsYXlPYmplY3QgaXMgYW4gYWJzdHJhY3QgYmFzZSBjbGFzczsgdGhlcmVmb3JlLCB5b3UgY2Fubm90IGNhbGxcclxuICogRGlzcGxheU9iamVjdCBkaXJlY3RseS4gSW52b2tpbmcgPGNvZGU+bmV3IERpc3BsYXlPYmplY3QoKTwvY29kZT4gdGhyb3dzIGFuXHJcbiAqIDxjb2RlPkFyZ3VtZW50RXJyb3I8L2NvZGU+IGV4Y2VwdGlvbi4gPC9wPlxyXG4gKlxyXG4gKiA8cD5BbGwgZGlzcGxheSBvYmplY3RzIGluaGVyaXQgZnJvbSB0aGUgRGlzcGxheU9iamVjdCBjbGFzcy48L3A+XHJcbiAqXHJcbiAqIDxwPlRoZSBEaXNwbGF5T2JqZWN0IGNsYXNzIGl0c2VsZiBkb2VzIG5vdCBpbmNsdWRlIGFueSBBUElzIGZvciByZW5kZXJpbmdcclxuICogY29udGVudCBvbnNjcmVlbi4gRm9yIHRoYXQgcmVhc29uLCBpZiB5b3Ugd2FudCBjcmVhdGUgYSBjdXN0b20gc3ViY2xhc3Mgb2ZcclxuICogdGhlIERpc3BsYXlPYmplY3QgY2xhc3MsIHlvdSB3aWxsIHdhbnQgdG8gZXh0ZW5kIG9uZSBvZiBpdHMgc3ViY2xhc3NlcyB0aGF0XHJcbiAqIGRvIGhhdmUgQVBJcyBmb3IgcmVuZGVyaW5nIGNvbnRlbnQgb25zY3JlZW4sIHN1Y2ggYXMgdGhlIFNoYXBlLCBTcHJpdGUsXHJcbiAqIEJpdG1hcCwgU2ltcGxlQnV0dG9uLCBUZXh0RmllbGQsIG9yIE1vdmllQ2xpcCBjbGFzcy48L3A+XHJcbiAqXHJcbiAqIDxwPlRoZSBEaXNwbGF5T2JqZWN0IGNsYXNzIGNvbnRhaW5zIHNldmVyYWwgYnJvYWRjYXN0IGV2ZW50cy4gTm9ybWFsbHksIHRoZVxyXG4gKiB0YXJnZXQgb2YgYW55IHBhcnRpY3VsYXIgZXZlbnQgaXMgYSBzcGVjaWZpYyBEaXNwbGF5T2JqZWN0IGluc3RhbmNlLiBGb3JcclxuICogZXhhbXBsZSwgdGhlIHRhcmdldCBvZiBhbiA8Y29kZT5hZGRlZDwvY29kZT4gZXZlbnQgaXMgdGhlIHNwZWNpZmljXHJcbiAqIERpc3BsYXlPYmplY3QgaW5zdGFuY2UgdGhhdCB3YXMgYWRkZWQgdG8gdGhlIGRpc3BsYXkgbGlzdC4gSGF2aW5nIGEgc2luZ2xlXHJcbiAqIHRhcmdldCByZXN0cmljdHMgdGhlIHBsYWNlbWVudCBvZiBldmVudCBsaXN0ZW5lcnMgdG8gdGhhdCB0YXJnZXQgYW5kIGluXHJcbiAqIHNvbWUgY2FzZXMgdGhlIHRhcmdldCdzIGFuY2VzdG9ycyBvbiB0aGUgZGlzcGxheSBsaXN0LiBXaXRoIGJyb2FkY2FzdFxyXG4gKiBldmVudHMsIGhvd2V2ZXIsIHRoZSB0YXJnZXQgaXMgbm90IGEgc3BlY2lmaWMgRGlzcGxheU9iamVjdCBpbnN0YW5jZSwgYnV0XHJcbiAqIHJhdGhlciBhbGwgRGlzcGxheU9iamVjdCBpbnN0YW5jZXMsIGluY2x1ZGluZyB0aG9zZSB0aGF0IGFyZSBub3Qgb24gdGhlXHJcbiAqIGRpc3BsYXkgbGlzdC4gVGhpcyBtZWFucyB0aGF0IHlvdSBjYW4gYWRkIGEgbGlzdGVuZXIgdG8gYW55IERpc3BsYXlPYmplY3RcclxuICogaW5zdGFuY2UgdG8gbGlzdGVuIGZvciBicm9hZGNhc3QgZXZlbnRzLiBJbiBhZGRpdGlvbiB0byB0aGUgYnJvYWRjYXN0XHJcbiAqIGV2ZW50cyBsaXN0ZWQgaW4gdGhlIERpc3BsYXlPYmplY3QgY2xhc3MncyBFdmVudHMgdGFibGUsIHRoZSBEaXNwbGF5T2JqZWN0XHJcbiAqIGNsYXNzIGFsc28gaW5oZXJpdHMgdHdvIGJyb2FkY2FzdCBldmVudHMgZnJvbSB0aGUgRXZlbnREaXNwYXRjaGVyIGNsYXNzOlxyXG4gKiA8Y29kZT5hY3RpdmF0ZTwvY29kZT4gYW5kIDxjb2RlPmRlYWN0aXZhdGU8L2NvZGU+LjwvcD5cclxuICpcclxuICogPHA+U29tZSBwcm9wZXJ0aWVzIHByZXZpb3VzbHkgdXNlZCBpbiB0aGUgQWN0aW9uU2NyaXB0IDEuMCBhbmQgMi4wXHJcbiAqIE1vdmllQ2xpcCwgVGV4dEZpZWxkLCBhbmQgQnV0dG9uIGNsYXNzZXMoc3VjaCBhcyA8Y29kZT5fYWxwaGE8L2NvZGU+LFxyXG4gKiA8Y29kZT5faGVpZ2h0PC9jb2RlPiwgPGNvZGU+X25hbWU8L2NvZGU+LCA8Y29kZT5fd2lkdGg8L2NvZGU+LFxyXG4gKiA8Y29kZT5feDwvY29kZT4sIDxjb2RlPl95PC9jb2RlPiwgYW5kIG90aGVycykgaGF2ZSBlcXVpdmFsZW50cyBpbiB0aGVcclxuICogQWN0aW9uU2NyaXB0IDMuMCBEaXNwbGF5T2JqZWN0IGNsYXNzIHRoYXQgYXJlIHJlbmFtZWQgc28gdGhhdCB0aGV5IG5vXHJcbiAqIGxvbmdlciBiZWdpbiB3aXRoIHRoZSB1bmRlcnNjb3JlKF8pIGNoYXJhY3Rlci48L3A+XHJcbiAqXHJcbiAqIDxwPkZvciBtb3JlIGluZm9ybWF0aW9uLCBzZWUgdGhlIFwiRGlzcGxheSBQcm9ncmFtbWluZ1wiIGNoYXB0ZXIgb2YgdGhlXHJcbiAqIDxpPkFjdGlvblNjcmlwdCAzLjAgRGV2ZWxvcGVyJ3MgR3VpZGU8L2k+LjwvcD5cclxuICogXHJcbiAqIEBldmVudCBhZGRlZCAgICAgICAgICAgIERpc3BhdGNoZWQgd2hlbiBhIGRpc3BsYXkgb2JqZWN0IGlzIGFkZGVkIHRvIHRoZVxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5IGxpc3QuIFRoZSBmb2xsb3dpbmcgbWV0aG9kcyB0cmlnZ2VyIHRoaXNcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQ6XHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPkRpc3BsYXlPYmplY3RDb250YWluZXIuYWRkQ2hpbGQoKTwvY29kZT4sXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPkRpc3BsYXlPYmplY3RDb250YWluZXIuYWRkQ2hpbGRBdCgpPC9jb2RlPi5cclxuICogQGV2ZW50IGFkZGVkVG9TY2VuZSAgICAgRGlzcGF0Y2hlZCB3aGVuIGEgZGlzcGxheSBvYmplY3QgaXMgYWRkZWQgdG8gdGhlIG9uXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIHNjZW5lIGRpc3BsYXkgbGlzdCwgZWl0aGVyIGRpcmVjdGx5IG9yIHRocm91Z2ggdGhlXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGFkZGl0aW9uIG9mIGEgc3ViIHRyZWUgaW4gd2hpY2ggdGhlIGRpc3BsYXkgb2JqZWN0XHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGlzIGNvbnRhaW5lZC4gVGhlIGZvbGxvd2luZyBtZXRob2RzIHRyaWdnZXIgdGhpc1xyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBldmVudDpcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+RGlzcGxheU9iamVjdENvbnRhaW5lci5hZGRDaGlsZCgpPC9jb2RlPixcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+RGlzcGxheU9iamVjdENvbnRhaW5lci5hZGRDaGlsZEF0KCk8L2NvZGU+LlxyXG4gKiBAZXZlbnQgZW50ZXJGcmFtZSAgICAgICBbYnJvYWRjYXN0IGV2ZW50XSBEaXNwYXRjaGVkIHdoZW4gdGhlIHBsYXloZWFkIGlzXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGVudGVyaW5nIGEgbmV3IGZyYW1lLiBJZiB0aGUgcGxheWhlYWQgaXMgbm90XHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIG1vdmluZywgb3IgaWYgdGhlcmUgaXMgb25seSBvbmUgZnJhbWUsIHRoaXMgZXZlbnRcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgaXMgZGlzcGF0Y2hlZCBjb250aW51b3VzbHkgaW4gY29uanVuY3Rpb24gd2l0aCB0aGVcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgZnJhbWUgcmF0ZS4gVGhpcyBldmVudCBpcyBhIGJyb2FkY2FzdCBldmVudCwgd2hpY2hcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgbWVhbnMgdGhhdCBpdCBpcyBkaXNwYXRjaGVkIGJ5IGFsbCBkaXNwbGF5IG9iamVjdHNcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgd2l0aCBhIGxpc3RlbmVyIHJlZ2lzdGVyZWQgZm9yIHRoaXMgZXZlbnQuXHJcbiAqIEBldmVudCBleGl0RnJhbWUgICAgICAgIFticm9hZGNhc3QgZXZlbnRdIERpc3BhdGNoZWQgd2hlbiB0aGUgcGxheWhlYWQgaXNcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgZXhpdGluZyB0aGUgY3VycmVudCBmcmFtZS4gQWxsIGZyYW1lIHNjcmlwdHMgaGF2ZVxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBiZWVuIHJ1bi4gSWYgdGhlIHBsYXloZWFkIGlzIG5vdCBtb3ZpbmcsIG9yIGlmXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIHRoZXJlIGlzIG9ubHkgb25lIGZyYW1lLCB0aGlzIGV2ZW50IGlzIGRpc3BhdGNoZWRcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgY29udGludW91c2x5IGluIGNvbmp1bmN0aW9uIHdpdGggdGhlIGZyYW1lIHJhdGUuXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIFRoaXMgZXZlbnQgaXMgYSBicm9hZGNhc3QgZXZlbnQsIHdoaWNoIG1lYW5zIHRoYXRcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgaXQgaXMgZGlzcGF0Y2hlZCBieSBhbGwgZGlzcGxheSBvYmplY3RzIHdpdGggYVxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lciByZWdpc3RlcmVkIGZvciB0aGlzIGV2ZW50LlxyXG4gKiBAZXZlbnQgZnJhbWVDb25zdHJ1Y3RlZCBbYnJvYWRjYXN0IGV2ZW50XSBEaXNwYXRjaGVkIGFmdGVyIHRoZSBjb25zdHJ1Y3RvcnNcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgb2YgZnJhbWUgZGlzcGxheSBvYmplY3RzIGhhdmUgcnVuIGJ1dCBiZWZvcmUgZnJhbWVcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgc2NyaXB0cyBoYXZlIHJ1bi4gSWYgdGhlIHBsYXloZWFkIGlzIG5vdCBtb3ZpbmcsIG9yXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGlmIHRoZXJlIGlzIG9ubHkgb25lIGZyYW1lLCB0aGlzIGV2ZW50IGlzXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoZWQgY29udGludW91c2x5IGluIGNvbmp1bmN0aW9uIHdpdGggdGhlXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGZyYW1lIHJhdGUuIFRoaXMgZXZlbnQgaXMgYSBicm9hZGNhc3QgZXZlbnQsIHdoaWNoXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIG1lYW5zIHRoYXQgaXQgaXMgZGlzcGF0Y2hlZCBieSBhbGwgZGlzcGxheSBvYmplY3RzXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIHdpdGggYSBsaXN0ZW5lciByZWdpc3RlcmVkIGZvciB0aGlzIGV2ZW50LlxyXG4gKiBAZXZlbnQgcmVtb3ZlZCAgICAgICAgICBEaXNwYXRjaGVkIHdoZW4gYSBkaXNwbGF5IG9iamVjdCBpcyBhYm91dCB0byBiZVxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVkIGZyb20gdGhlIGRpc3BsYXkgbGlzdC4gVHdvIG1ldGhvZHMgb2YgdGhlXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIERpc3BsYXlPYmplY3RDb250YWluZXIgY2xhc3MgZ2VuZXJhdGUgdGhpcyBldmVudDpcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+cmVtb3ZlQ2hpbGQoKTwvY29kZT4gYW5kXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPnJlbW92ZUNoaWxkQXQoKTwvY29kZT4uXHJcbiAqXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxwPlRoZSBmb2xsb3dpbmcgbWV0aG9kcyBvZiBhXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIERpc3BsYXlPYmplY3RDb250YWluZXIgb2JqZWN0IGFsc28gZ2VuZXJhdGUgdGhpc1xyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBldmVudCBpZiBhbiBvYmplY3QgbXVzdCBiZSByZW1vdmVkIHRvIG1ha2Ugcm9vbSBmb3JcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgdGhlIG5ldyBvYmplY3Q6IDxjb2RlPmFkZENoaWxkKCk8L2NvZGU+LFxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5hZGRDaGlsZEF0KCk8L2NvZGU+LCBhbmRcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+c2V0Q2hpbGRJbmRleCgpPC9jb2RlPi4gPC9wPlxyXG4gKiBAZXZlbnQgcmVtb3ZlZEZyb21TY2VuZSBEaXNwYXRjaGVkIHdoZW4gYSBkaXNwbGF5IG9iamVjdCBpcyBhYm91dCB0byBiZVxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVkIGZyb20gdGhlIGRpc3BsYXkgbGlzdCwgZWl0aGVyIGRpcmVjdGx5IG9yXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIHRocm91Z2ggdGhlIHJlbW92YWwgb2YgYSBzdWIgdHJlZSBpbiB3aGljaCB0aGVcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheSBvYmplY3QgaXMgY29udGFpbmVkLiBUd28gbWV0aG9kcyBvZiB0aGVcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgRGlzcGxheU9iamVjdENvbnRhaW5lciBjbGFzcyBnZW5lcmF0ZSB0aGlzIGV2ZW50OlxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5yZW1vdmVDaGlsZCgpPC9jb2RlPiBhbmRcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+cmVtb3ZlQ2hpbGRBdCgpPC9jb2RlPi5cclxuICpcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgPHA+VGhlIGZvbGxvd2luZyBtZXRob2RzIG9mIGFcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgRGlzcGxheU9iamVjdENvbnRhaW5lciBvYmplY3QgYWxzbyBnZW5lcmF0ZSB0aGlzXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50IGlmIGFuIG9iamVjdCBtdXN0IGJlIHJlbW92ZWQgdG8gbWFrZSByb29tIGZvclxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICB0aGUgbmV3IG9iamVjdDogPGNvZGU+YWRkQ2hpbGQoKTwvY29kZT4sXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPmFkZENoaWxkQXQoKTwvY29kZT4sIGFuZFxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5zZXRDaGlsZEluZGV4KCk8L2NvZGU+LiA8L3A+XHJcbiAqIEBldmVudCByZW5kZXIgICAgICAgICAgIFticm9hZGNhc3QgZXZlbnRdIERpc3BhdGNoZWQgd2hlbiB0aGUgZGlzcGxheSBsaXN0XHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGlzIGFib3V0IHRvIGJlIHVwZGF0ZWQgYW5kIHJlbmRlcmVkLiBUaGlzIGV2ZW50XHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVzIHRoZSBsYXN0IG9wcG9ydHVuaXR5IGZvciBvYmplY3RzIGxpc3RlbmluZ1xyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgdGhpcyBldmVudCB0byBtYWtlIGNoYW5nZXMgYmVmb3JlIHRoZSBkaXNwbGF5XHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3QgaXMgcmVuZGVyZWQuIFlvdSBtdXN0IGNhbGwgdGhlXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPmludmFsaWRhdGUoKTwvY29kZT4gbWV0aG9kIG9mIHRoZSBTY2VuZVxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3QgZWFjaCB0aW1lIHlvdSB3YW50IGEgPGNvZGU+cmVuZGVyPC9jb2RlPlxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBldmVudCB0byBiZSBkaXNwYXRjaGVkLiA8Y29kZT5SZW5kZXI8L2NvZGU+IGV2ZW50c1xyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBhcmUgZGlzcGF0Y2hlZCB0byBhbiBvYmplY3Qgb25seSBpZiB0aGVyZSBpcyBtdXR1YWxcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgdHJ1c3QgYmV0d2VlbiBpdCBhbmQgdGhlIG9iamVjdCB0aGF0IGNhbGxlZFxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5TY2VuZS5pbnZhbGlkYXRlKCk8L2NvZGU+LiBUaGlzIGV2ZW50IGlzIGFcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgYnJvYWRjYXN0IGV2ZW50LCB3aGljaCBtZWFucyB0aGF0IGl0IGlzIGRpc3BhdGNoZWRcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgYnkgYWxsIGRpc3BsYXkgb2JqZWN0cyB3aXRoIGEgbGlzdGVuZXIgcmVnaXN0ZXJlZFxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgdGhpcyBldmVudC5cclxuICpcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgPHA+PGI+Tm90ZTogPC9iPlRoaXMgZXZlbnQgaXMgbm90IGRpc3BhdGNoZWQgaWYgdGhlXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXkgaXMgbm90IHJlbmRlcmluZy4gVGhpcyBpcyB0aGUgY2FzZSB3aGVuIHRoZVxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50IGlzIGVpdGhlciBtaW5pbWl6ZWQgb3Igb2JzY3VyZWQuIDwvcD5cclxuICovXHJcbmNsYXNzIERpc3BsYXlPYmplY3QgZXh0ZW5kcyBOYW1lZEFzc2V0QmFzZSBpbXBsZW1lbnRzIElCaXRtYXBEcmF3YWJsZVxyXG57XHJcblx0cHJpdmF0ZSBfbG9hZGVySW5mbzpMb2FkZXJJbmZvO1xyXG5cdHByaXZhdGUgX21vdXNlWDpudW1iZXI7XHJcblx0cHJpdmF0ZSBfbW91c2VZOm51bWJlcjtcclxuXHRwcml2YXRlIF9yb290OkRpc3BsYXlPYmplY3RDb250YWluZXI7XHJcblx0cHJpdmF0ZSBfYm91bmRzOlJlY3RhbmdsZTtcclxuXHRwdWJsaWMgX3BCb3hCb3VuZHM6Qm94O1xyXG5cdHByaXZhdGUgX2JveEJvdW5kc0ludmFsaWQ6Ym9vbGVhbiA9IHRydWU7XHJcblx0cHVibGljIF9wU3BoZXJlQm91bmRzOlNwaGVyZTtcclxuXHRwcml2YXRlIF9zcGhlcmVCb3VuZHNJbnZhbGlkOmJvb2xlYW4gPSB0cnVlO1xyXG5cdHByaXZhdGUgX2RlYnVnVmlzaWJsZTpib29sZWFuO1xyXG5cclxuXHRwdWJsaWMgX3BTY2VuZTpTY2VuZTtcclxuXHRwdWJsaWMgX3BQYXJlbnQ6RGlzcGxheU9iamVjdENvbnRhaW5lcjtcclxuXHRwdWJsaWMgX3BTY2VuZVRyYW5zZm9ybTpNYXRyaXgzRCA9IG5ldyBNYXRyaXgzRCgpO1xyXG5cdHB1YmxpYyBfcFNjZW5lVHJhbnNmb3JtRGlydHk6Ym9vbGVhbiA9IHRydWU7XHJcblx0cHVibGljIF9wSXNFbnRpdHk6Ym9vbGVhbjtcclxuXHJcblx0cHJpdmF0ZSBfZXhwbGljaXRQYXJ0aXRpb246UGFydGl0aW9uO1xyXG5cdHB1YmxpYyBfcEltcGxpY2l0UGFydGl0aW9uOlBhcnRpdGlvbjtcclxuXHJcblx0cHJpdmF0ZSBfc2NlbmVUcmFuc2Zvcm1DaGFuZ2VkOkRpc3BsYXlPYmplY3RFdmVudDtcclxuXHRwcml2YXRlIF9zY2VuZWNoYW5nZWQ6RGlzcGxheU9iamVjdEV2ZW50O1xyXG5cdHByaXZhdGUgX3RyYW5zZm9ybTpUcmFuc2Zvcm07XHJcblx0cHJpdmF0ZSBfbWF0cml4M0Q6TWF0cml4M0QgPSBuZXcgTWF0cml4M0QoKTtcclxuXHRwcml2YXRlIF9tYXRyaXgzRERpcnR5OmJvb2xlYW4gPSB0cnVlO1xyXG5cclxuXHRwcml2YXRlIF9pbnZlcnNlU2NlbmVUcmFuc2Zvcm06TWF0cml4M0QgPSBuZXcgTWF0cml4M0QoKTtcclxuXHRwcml2YXRlIF9pbnZlcnNlU2NlbmVUcmFuc2Zvcm1EaXJ0eTpib29sZWFuID0gdHJ1ZTtcclxuXHRwcml2YXRlIF9zY2VuZVBvc2l0aW9uOlZlY3RvcjNEID0gbmV3IFZlY3RvcjNEKCk7XHJcblx0cHJpdmF0ZSBfc2NlbmVQb3NpdGlvbkRpcnR5OmJvb2xlYW4gPSB0cnVlO1xyXG5cdHByaXZhdGUgX2V4cGxpY2l0VmlzaWJpbGl0eTpib29sZWFuID0gdHJ1ZTtcclxuXHRwdWJsaWMgX3BJbXBsaWNpdFZpc2liaWxpdHk6Ym9vbGVhbiA9IHRydWU7XHJcblx0cHJpdmF0ZSBfZXhwbGljaXRNb3VzZUVuYWJsZWQ6Ym9vbGVhbiA9IHRydWU7XHJcblx0cHVibGljIF9wSW1wbGljaXRNb3VzZUVuYWJsZWQ6Ym9vbGVhbiA9IHRydWU7XHJcblx0cHJpdmF0ZSBfbGlzdGVuVG9TY2VuZVRyYW5zZm9ybUNoYW5nZWQ6Ym9vbGVhbjtcclxuXHRwcml2YXRlIF9saXN0ZW5Ub1NjZW5lQ2hhbmdlZDpib29sZWFuO1xyXG5cclxuXHRwcml2YXRlIF9wb3NpdGlvbkRpcnR5OmJvb2xlYW4gPSB0cnVlO1xyXG5cdHByaXZhdGUgX3JvdGF0aW9uRGlydHk6Ym9vbGVhbiA9IHRydWU7XHJcblx0cHJpdmF0ZSBfc2NhbGVEaXJ0eTpib29sZWFuID0gdHJ1ZTtcclxuXHJcblx0cHJpdmF0ZSBfcG9zaXRpb25DaGFuZ2VkOkRpc3BsYXlPYmplY3RFdmVudDtcclxuXHRwcml2YXRlIF9yb3RhdGlvbkNoYW5nZWQ6RGlzcGxheU9iamVjdEV2ZW50O1xyXG5cdHByaXZhdGUgX3NjYWxlQ2hhbmdlZDpEaXNwbGF5T2JqZWN0RXZlbnQ7XHJcblxyXG5cdHByaXZhdGUgX3JvdGF0aW9uWDpudW1iZXIgPSAwO1xyXG5cdHByaXZhdGUgX3JvdGF0aW9uWTpudW1iZXIgPSAwO1xyXG5cdHByaXZhdGUgX3JvdGF0aW9uWjpudW1iZXIgPSAwO1xyXG5cdHByaXZhdGUgX2V1bGVyczpWZWN0b3IzRCA9IG5ldyBWZWN0b3IzRCgpO1xyXG5cdHByaXZhdGUgX2ZsaXBZOk1hdHJpeDNEID0gbmV3IE1hdHJpeDNEKCk7XHJcblxyXG5cdHByaXZhdGUgX2xpc3RlblRvUG9zaXRpb25DaGFuZ2VkOmJvb2xlYW47XHJcblx0cHJpdmF0ZSBfbGlzdGVuVG9Sb3RhdGlvbkNoYW5nZWQ6Ym9vbGVhbjtcclxuXHRwcml2YXRlIF9saXN0ZW5Ub1NjYWxlQ2hhbmdlZDpib29sZWFuO1xyXG5cdHByaXZhdGUgX3pPZmZzZXQ6bnVtYmVyID0gMDtcclxuXHJcblx0cHVibGljIF9wU2NhbGVYOm51bWJlciA9IDE7XHJcblx0cHVibGljIF9wU2NhbGVZOm51bWJlciA9IDE7XHJcblx0cHVibGljIF9wU2NhbGVaOm51bWJlciA9IDE7XHJcblx0cHJpdmF0ZSBfeDpudW1iZXIgPSAwO1xyXG5cdHByaXZhdGUgX3k6bnVtYmVyID0gMDtcclxuXHRwcml2YXRlIF96Om51bWJlciA9IDA7XHJcblx0cHJpdmF0ZSBfcGl2b3Q6VmVjdG9yM0QgPSBuZXcgVmVjdG9yM0QoKTtcclxuXHRwcml2YXRlIF9vcmllbnRhdGlvbk1hdHJpeDpNYXRyaXgzRCA9IG5ldyBNYXRyaXgzRCgpO1xyXG5cdHByaXZhdGUgX3Bpdm90WmVybzpib29sZWFuID0gdHJ1ZTtcclxuXHRwcml2YXRlIF9waXZvdERpcnR5OmJvb2xlYW4gPSB0cnVlO1xyXG5cdHByaXZhdGUgX3BvczpWZWN0b3IzRCA9IG5ldyBWZWN0b3IzRCgpO1xyXG5cdHByaXZhdGUgX3JvdDpWZWN0b3IzRCA9IG5ldyBWZWN0b3IzRCgpO1xyXG5cdHByaXZhdGUgX3NjYTpWZWN0b3IzRCA9IG5ldyBWZWN0b3IzRCgpO1xyXG5cdHByaXZhdGUgX3RyYW5zZm9ybUNvbXBvbmVudHM6QXJyYXk8VmVjdG9yM0Q+O1xyXG5cclxuXHRwdWJsaWMgX3BJZ25vcmVUcmFuc2Zvcm06Ym9vbGVhbiA9IGZhbHNlO1xyXG5cclxuXHRwcml2YXRlIF9zaGFkZXJQaWNraW5nRGV0YWlsczpib29sZWFuO1xyXG5cclxuXHRwdWJsaWMgX3BQaWNraW5nQ29sbGlzaW9uVk86UGlja2luZ0NvbGxpc2lvblZPO1xyXG5cclxuXHRwdWJsaWMgX2JvdW5kc1R5cGU6c3RyaW5nO1xyXG5cclxuXHRwdWJsaWMgX3BQaWNraW5nQ29sbGlkZXI6SVBpY2tpbmdDb2xsaWRlcjtcclxuXHJcblx0cHVibGljIF9wUmVuZGVyYWJsZXM6QXJyYXk8SVJlbmRlcmFibGU+ID0gbmV3IEFycmF5PElSZW5kZXJhYmxlPigpO1xyXG5cdHByaXZhdGUgX2VudGl0eU5vZGVzOkFycmF5PEVudGl0eU5vZGU+ID0gbmV3IEFycmF5PEVudGl0eU5vZGU+KCk7XHJcblxyXG5cdHB1YmxpYyBfaVNvdXJjZVByZWZhYjpQcmVmYWJCYXNlO1xyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBhbGlnbm1lbnRNb2RlOnN0cmluZyA9IEFsaWdubWVudE1vZGUuUkVHSVNUUkFUSU9OX1BPSU5UO1xyXG5cclxuXHQvKipcclxuXHQgKiBJbmRpY2F0ZXMgdGhlIGFscGhhIHRyYW5zcGFyZW5jeSB2YWx1ZSBvZiB0aGUgb2JqZWN0IHNwZWNpZmllZC4gVmFsaWRcclxuXHQgKiB2YWx1ZXMgYXJlIDAoZnVsbHkgdHJhbnNwYXJlbnQpIHRvIDEoZnVsbHkgb3BhcXVlKS4gVGhlIGRlZmF1bHQgdmFsdWUgaXNcclxuXHQgKiAxLiBEaXNwbGF5IG9iamVjdHMgd2l0aCA8Y29kZT5hbHBoYTwvY29kZT4gc2V0IHRvIDAgPGk+YXJlPC9pPiBhY3RpdmUsXHJcblx0ICogZXZlbiB0aG91Z2ggdGhleSBhcmUgaW52aXNpYmxlLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBhbHBoYTpudW1iZXI7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEEgdmFsdWUgZnJvbSB0aGUgQmxlbmRNb2RlIGNsYXNzIHRoYXQgc3BlY2lmaWVzIHdoaWNoIGJsZW5kIG1vZGUgdG8gdXNlLiBBXHJcblx0ICogYml0bWFwIGNhbiBiZSBkcmF3biBpbnRlcm5hbGx5IGluIHR3byB3YXlzLiBJZiB5b3UgaGF2ZSBhIGJsZW5kIG1vZGVcclxuXHQgKiBlbmFibGVkIG9yIGFuIGV4dGVybmFsIGNsaXBwaW5nIG1hc2ssIHRoZSBiaXRtYXAgaXMgZHJhd24gYnkgYWRkaW5nIGFcclxuXHQgKiBiaXRtYXAtZmlsbGVkIHNxdWFyZSBzaGFwZSB0byB0aGUgdmVjdG9yIHJlbmRlci4gSWYgeW91IGF0dGVtcHQgdG8gc2V0XHJcblx0ICogdGhpcyBwcm9wZXJ0eSB0byBhbiBpbnZhbGlkIHZhbHVlLCBGbGFzaCBydW50aW1lcyBzZXQgdGhlIHZhbHVlIHRvXHJcblx0ICogPGNvZGU+QmxlbmRNb2RlLk5PUk1BTDwvY29kZT4uXHJcblx0ICpcclxuXHQgKiA8cD5UaGUgPGNvZGU+YmxlbmRNb2RlPC9jb2RlPiBwcm9wZXJ0eSBhZmZlY3RzIGVhY2ggcGl4ZWwgb2YgdGhlIGRpc3BsYXlcclxuXHQgKiBvYmplY3QuIEVhY2ggcGl4ZWwgaXMgY29tcG9zZWQgb2YgdGhyZWUgY29uc3RpdHVlbnQgY29sb3JzKHJlZCwgZ3JlZW4sXHJcblx0ICogYW5kIGJsdWUpLCBhbmQgZWFjaCBjb25zdGl0dWVudCBjb2xvciBoYXMgYSB2YWx1ZSBiZXR3ZWVuIDB4MDAgYW5kIDB4RkYuXHJcblx0ICogRmxhc2ggUGxheWVyIG9yIEFkb2JlIEFJUiBjb21wYXJlcyBlYWNoIGNvbnN0aXR1ZW50IGNvbG9yIG9mIG9uZSBwaXhlbCBpblxyXG5cdCAqIHRoZSBtb3ZpZSBjbGlwIHdpdGggdGhlIGNvcnJlc3BvbmRpbmcgY29sb3Igb2YgdGhlIHBpeGVsIGluIHRoZVxyXG5cdCAqIGJhY2tncm91bmQuIEZvciBleGFtcGxlLCBpZiA8Y29kZT5ibGVuZE1vZGU8L2NvZGU+IGlzIHNldCB0b1xyXG5cdCAqIDxjb2RlPkJsZW5kTW9kZS5MSUdIVEVOPC9jb2RlPiwgRmxhc2ggUGxheWVyIG9yIEFkb2JlIEFJUiBjb21wYXJlcyB0aGUgcmVkXHJcblx0ICogdmFsdWUgb2YgdGhlIGRpc3BsYXkgb2JqZWN0IHdpdGggdGhlIHJlZCB2YWx1ZSBvZiB0aGUgYmFja2dyb3VuZCwgYW5kIHVzZXNcclxuXHQgKiB0aGUgbGlnaHRlciBvZiB0aGUgdHdvIGFzIHRoZSB2YWx1ZSBmb3IgdGhlIHJlZCBjb21wb25lbnQgb2YgdGhlIGRpc3BsYXllZFxyXG5cdCAqIGNvbG9yLjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPlRoZSBmb2xsb3dpbmcgdGFibGUgZGVzY3JpYmVzIHRoZSA8Y29kZT5ibGVuZE1vZGU8L2NvZGU+IHNldHRpbmdzLiBUaGVcclxuXHQgKiBCbGVuZE1vZGUgY2xhc3MgZGVmaW5lcyBzdHJpbmcgdmFsdWVzIHlvdSBjYW4gdXNlLiBUaGUgaWxsdXN0cmF0aW9ucyBpblxyXG5cdCAqIHRoZSB0YWJsZSBzaG93IDxjb2RlPmJsZW5kTW9kZTwvY29kZT4gdmFsdWVzIGFwcGxpZWQgdG8gYSBjaXJjdWxhciBkaXNwbGF5XHJcblx0ICogb2JqZWN0KDIpIHN1cGVyaW1wb3NlZCBvbiBhbm90aGVyIGRpc3BsYXkgb2JqZWN0KDEpLjwvcD5cclxuXHQgKi9cclxuXHRwdWJsaWMgYmxlbmRNb2RlOkJsZW5kTW9kZTtcclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGJvdW5kc1R5cGUoKTpzdHJpbmdcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fYm91bmRzVHlwZTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgYm91bmRzVHlwZSh2YWx1ZTpzdHJpbmcpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX2JvdW5kc1R5cGUgPT0gdmFsdWUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9ib3VuZHNUeXBlID0gdmFsdWU7XHJcblxyXG5cdFx0dGhpcy5fcEludmFsaWRhdGVCb3VuZHMoKTtcclxuXHJcblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX2VudGl0eU5vZGVzLmxlbmd0aDtcclxuXHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IGxlbjsgaSsrKVxyXG5cdFx0XHR0aGlzLl9lbnRpdHlOb2Rlc1tpXS51cGRhdGVCb3VuZHMoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIElmIHNldCB0byA8Y29kZT50cnVlPC9jb2RlPiwgTk1FIHdpbGwgdXNlIHRoZSBzb2Z0d2FyZSByZW5kZXJlciB0byBjYWNoZVxyXG5cdCAqIGFuIGludGVybmFsIGJpdG1hcCByZXByZXNlbnRhdGlvbiBvZiB0aGUgZGlzcGxheSBvYmplY3QuIEZvciBuYXRpdmUgdGFyZ2V0cyxcclxuXHQgKiB0aGlzIGlzIG9mdGVuIG11Y2ggc2xvd2VyIHRoYW4gdGhlIGRlZmF1bHQgaGFyZHdhcmUgcmVuZGVyZXIuIFdoZW4geW91XHJcblx0ICogYXJlIHVzaW5nIHRoZSBGbGFzaCB0YXJnZXQsIHRoaXMgY2FjaGluZyBtYXkgaW5jcmVhc2UgcGVyZm9ybWFuY2UgZm9yIGRpc3BsYXlcclxuXHQgKiBvYmplY3RzIHRoYXQgY29udGFpbiBjb21wbGV4IHZlY3RvciBjb250ZW50LlxyXG5cdCAqXHJcblx0ICogPHA+QWxsIHZlY3RvciBkYXRhIGZvciBhIGRpc3BsYXkgb2JqZWN0IHRoYXQgaGFzIGEgY2FjaGVkIGJpdG1hcCBpcyBkcmF3blxyXG5cdCAqIHRvIHRoZSBiaXRtYXAgaW5zdGVhZCBvZiB0aGUgbWFpbiBkaXNwbGF5LiBJZlxyXG5cdCAqIDxjb2RlPmNhY2hlQXNCaXRtYXBNYXRyaXg8L2NvZGU+IGlzIG51bGwgb3IgdW5zdXBwb3J0ZWQsIHRoZSBiaXRtYXAgaXNcclxuXHQgKiB0aGVuIGNvcGllZCB0byB0aGUgbWFpbiBkaXNwbGF5IGFzIHVuc3RyZXRjaGVkLCB1bnJvdGF0ZWQgcGl4ZWxzIHNuYXBwZWRcclxuXHQgKiB0byB0aGUgbmVhcmVzdCBwaXhlbCBib3VuZGFyaWVzLiBQaXhlbHMgYXJlIG1hcHBlZCAxIHRvIDEgd2l0aCB0aGUgcGFyZW50XHJcblx0ICogb2JqZWN0LiBJZiB0aGUgYm91bmRzIG9mIHRoZSBiaXRtYXAgY2hhbmdlLCB0aGUgYml0bWFwIGlzIHJlY3JlYXRlZFxyXG5cdCAqIGluc3RlYWQgb2YgYmVpbmcgc3RyZXRjaGVkLjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPklmIDxjb2RlPmNhY2hlQXNCaXRtYXBNYXRyaXg8L2NvZGU+IGlzIG5vbi1udWxsIGFuZCBzdXBwb3J0ZWQsIHRoZVxyXG5cdCAqIG9iamVjdCBpcyBkcmF3biB0byB0aGUgb2ZmLXNjcmVlbiBiaXRtYXAgdXNpbmcgdGhhdCBtYXRyaXggYW5kIHRoZVxyXG5cdCAqIHN0cmV0Y2hlZCBhbmQvb3Igcm90YXRlZCByZXN1bHRzIG9mIHRoYXQgcmVuZGVyaW5nIGFyZSB1c2VkIHRvIGRyYXcgdGhlXHJcblx0ICogb2JqZWN0IHRvIHRoZSBtYWluIGRpc3BsYXkuPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+Tm8gaW50ZXJuYWwgYml0bWFwIGlzIGNyZWF0ZWQgdW5sZXNzIHRoZSA8Y29kZT5jYWNoZUFzQml0bWFwPC9jb2RlPlxyXG5cdCAqIHByb3BlcnR5IGlzIHNldCB0byA8Y29kZT50cnVlPC9jb2RlPi48L3A+XHJcblx0ICpcclxuXHQgKiA8cD5BZnRlciB5b3Ugc2V0IHRoZSA8Y29kZT5jYWNoZUFzQml0bWFwPC9jb2RlPiBwcm9wZXJ0eSB0b1xyXG5cdCAqIDxjb2RlPnRydWU8L2NvZGU+LCB0aGUgcmVuZGVyaW5nIGRvZXMgbm90IGNoYW5nZSwgaG93ZXZlciB0aGUgZGlzcGxheVxyXG5cdCAqIG9iamVjdCBwZXJmb3JtcyBwaXhlbCBzbmFwcGluZyBhdXRvbWF0aWNhbGx5LiBUaGUgYW5pbWF0aW9uIHNwZWVkIGNhbiBiZVxyXG5cdCAqIHNpZ25pZmljYW50bHkgZmFzdGVyIGRlcGVuZGluZyBvbiB0aGUgY29tcGxleGl0eSBvZiB0aGUgdmVjdG9yIGNvbnRlbnQuXHJcblx0ICogPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+VGhlIDxjb2RlPmNhY2hlQXNCaXRtYXA8L2NvZGU+IHByb3BlcnR5IGlzIGF1dG9tYXRpY2FsbHkgc2V0IHRvXHJcblx0ICogPGNvZGU+dHJ1ZTwvY29kZT4gd2hlbmV2ZXIgeW91IGFwcGx5IGEgZmlsdGVyIHRvIGEgZGlzcGxheSBvYmplY3Qod2hlblxyXG5cdCAqIGl0cyA8Y29kZT5maWx0ZXI8L2NvZGU+IGFycmF5IGlzIG5vdCBlbXB0eSksIGFuZCBpZiBhIGRpc3BsYXkgb2JqZWN0IGhhcyBhXHJcblx0ICogZmlsdGVyIGFwcGxpZWQgdG8gaXQsIDxjb2RlPmNhY2hlQXNCaXRtYXA8L2NvZGU+IGlzIHJlcG9ydGVkIGFzXHJcblx0ICogPGNvZGU+dHJ1ZTwvY29kZT4gZm9yIHRoYXQgZGlzcGxheSBvYmplY3QsIGV2ZW4gaWYgeW91IHNldCB0aGUgcHJvcGVydHkgdG9cclxuXHQgKiA8Y29kZT5mYWxzZTwvY29kZT4uIElmIHlvdSBjbGVhciBhbGwgZmlsdGVycyBmb3IgYSBkaXNwbGF5IG9iamVjdCwgdGhlXHJcblx0ICogPGNvZGU+Y2FjaGVBc0JpdG1hcDwvY29kZT4gc2V0dGluZyBjaGFuZ2VzIHRvIHdoYXQgaXQgd2FzIGxhc3Qgc2V0IHRvLjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPkEgZGlzcGxheSBvYmplY3QgZG9lcyBub3QgdXNlIGEgYml0bWFwIGV2ZW4gaWYgdGhlXHJcblx0ICogPGNvZGU+Y2FjaGVBc0JpdG1hcDwvY29kZT4gcHJvcGVydHkgaXMgc2V0IHRvIDxjb2RlPnRydWU8L2NvZGU+IGFuZFxyXG5cdCAqIGluc3RlYWQgcmVuZGVycyBmcm9tIHZlY3RvciBkYXRhIGluIHRoZSBmb2xsb3dpbmcgY2FzZXM6PC9wPlxyXG5cdCAqXHJcblx0ICogPHVsPlxyXG5cdCAqICAgPGxpPlRoZSBiaXRtYXAgaXMgdG9vIGxhcmdlLiBJbiBBSVIgMS41IGFuZCBGbGFzaCBQbGF5ZXIgMTAsIHRoZSBtYXhpbXVtXHJcblx0ICogc2l6ZSBmb3IgYSBiaXRtYXAgaW1hZ2UgaXMgOCwxOTEgcGl4ZWxzIGluIHdpZHRoIG9yIGhlaWdodCwgYW5kIHRoZSB0b3RhbFxyXG5cdCAqIG51bWJlciBvZiBwaXhlbHMgY2Fubm90IGV4Y2VlZCAxNiw3NzcsMjE1IHBpeGVscy4oU28sIGlmIGEgYml0bWFwIGltYWdlXHJcblx0ICogaXMgOCwxOTEgcGl4ZWxzIHdpZGUsIGl0IGNhbiBvbmx5IGJlIDIsMDQ4IHBpeGVscyBoaWdoLikgSW4gRmxhc2ggUGxheWVyIDlcclxuXHQgKiBhbmQgZWFybGllciwgdGhlIGxpbWl0YXRpb24gaXMgaXMgMjg4MCBwaXhlbHMgaW4gaGVpZ2h0IGFuZCAyLDg4MCBwaXhlbHNcclxuXHQgKiBpbiB3aWR0aC48L2xpPlxyXG5cdCAqICAgPGxpPlRoZSBiaXRtYXAgZmFpbHMgdG8gYWxsb2NhdGUob3V0IG9mIG1lbW9yeSBlcnJvcikuIDwvbGk+XHJcblx0ICogPC91bD5cclxuXHQgKlxyXG5cdCAqIDxwPlRoZSA8Y29kZT5jYWNoZUFzQml0bWFwPC9jb2RlPiBwcm9wZXJ0eSBpcyBiZXN0IHVzZWQgd2l0aCBtb3ZpZSBjbGlwc1xyXG5cdCAqIHRoYXQgaGF2ZSBtb3N0bHkgc3RhdGljIGNvbnRlbnQgYW5kIHRoYXQgZG8gbm90IHNjYWxlIGFuZCByb3RhdGVcclxuXHQgKiBmcmVxdWVudGx5LiBXaXRoIHN1Y2ggbW92aWUgY2xpcHMsIDxjb2RlPmNhY2hlQXNCaXRtYXA8L2NvZGU+IGNhbiBsZWFkIHRvXHJcblx0ICogcGVyZm9ybWFuY2UgaW5jcmVhc2VzIHdoZW4gdGhlIG1vdmllIGNsaXAgaXMgdHJhbnNsYXRlZCh3aGVuIGl0cyA8aT54PC9pPlxyXG5cdCAqIGFuZCA8aT55PC9pPiBwb3NpdGlvbiBpcyBjaGFuZ2VkKS48L3A+XHJcblx0ICovXHJcblx0cHVibGljIGNhY2hlQXNCaXRtYXA6Ym9vbGVhbjtcclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgY2FzdHNTaGFkb3dzOmJvb2xlYW4gPSB0cnVlO1xyXG5cclxuXHQvKipcclxuXHQgKiBJbmRpY2F0ZXMgdGhlIGRlcHRoIG9mIHRoZSBkaXNwbGF5IG9iamVjdCwgaW4gcGl4ZWxzLiBUaGUgZGVwdGggaXNcclxuXHQgKiBjYWxjdWxhdGVkIGJhc2VkIG9uIHRoZSBib3VuZHMgb2YgdGhlIGNvbnRlbnQgb2YgdGhlIGRpc3BsYXkgb2JqZWN0LiBXaGVuXHJcblx0ICogeW91IHNldCB0aGUgPGNvZGU+ZGVwdGg8L2NvZGU+IHByb3BlcnR5LCB0aGUgPGNvZGU+c2NhbGVaPC9jb2RlPiBwcm9wZXJ0eVxyXG5cdCAqIGlzIGFkanVzdGVkIGFjY29yZGluZ2x5LCBhcyBzaG93biBpbiB0aGUgZm9sbG93aW5nIGNvZGU6XHJcblx0ICpcclxuXHQgKiA8cD5FeGNlcHQgZm9yIFRleHRGaWVsZCBhbmQgVmlkZW8gb2JqZWN0cywgYSBkaXNwbGF5IG9iamVjdCB3aXRoIG5vXHJcblx0ICogY29udGVudCAoc3VjaCBhcyBhbiBlbXB0eSBzcHJpdGUpIGhhcyBhIGRlcHRoIG9mIDAsIGV2ZW4gaWYgeW91IHRyeSB0b1xyXG5cdCAqIHNldCA8Y29kZT5kZXB0aDwvY29kZT4gdG8gYSBkaWZmZXJlbnQgdmFsdWUuPC9wPlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgZGVwdGgoKTpudW1iZXJcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fYm94Qm91bmRzSW52YWxpZClcclxuXHRcdFx0dGhpcy5fcFVwZGF0ZUJveEJvdW5kcygpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLl9wQm94Qm91bmRzLmRlcHRoKnRoaXMuX3BTY2FsZVo7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IGRlcHRoKHZhbDpudW1iZXIpXHJcblx0e1xyXG5cdFx0dmFyIHNjYWxlWjpudW1iZXIgPSB2YWwvdGhpcy5nZXRCb3goKS5kZXB0aDtcclxuXHJcblx0XHRpZiAodGhpcy5fcFNjYWxlWiA9PSBzY2FsZVopXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9wU2NhbGVaID0gc2NhbGVaO1xyXG5cclxuXHRcdHRoaXMuaW52YWxpZGF0ZVNjYWxlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEZWZpbmVzIHRoZSByb3RhdGlvbiBvZiB0aGUgM2Qgb2JqZWN0IGFzIGEgPGNvZGU+VmVjdG9yM0Q8L2NvZGU+IG9iamVjdCBjb250YWluaW5nIGV1bGVyIGFuZ2xlcyBmb3Igcm90YXRpb24gYXJvdW5kIHgsIHkgYW5kIHogYXhpcy5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGV1bGVycygpOlZlY3RvcjNEXHJcblx0e1xyXG5cdFx0dGhpcy5fZXVsZXJzLnggPSB0aGlzLl9yb3RhdGlvblgqTWF0aENvbnN0cy5SQURJQU5TX1RPX0RFR1JFRVM7XHJcblx0XHR0aGlzLl9ldWxlcnMueSA9IHRoaXMuX3JvdGF0aW9uWSpNYXRoQ29uc3RzLlJBRElBTlNfVE9fREVHUkVFUztcclxuXHRcdHRoaXMuX2V1bGVycy56ID0gdGhpcy5fcm90YXRpb25aKk1hdGhDb25zdHMuUkFESUFOU19UT19ERUdSRUVTO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLl9ldWxlcnM7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IGV1bGVycyh2YWx1ZTpWZWN0b3IzRClcclxuXHR7XHJcblx0XHR0aGlzLl9yb3RhdGlvblggPSB2YWx1ZS54Kk1hdGhDb25zdHMuREVHUkVFU19UT19SQURJQU5TO1xyXG5cdFx0dGhpcy5fcm90YXRpb25ZID0gdmFsdWUueSpNYXRoQ29uc3RzLkRFR1JFRVNfVE9fUkFESUFOUztcclxuXHRcdHRoaXMuX3JvdGF0aW9uWiA9IHZhbHVlLnoqTWF0aENvbnN0cy5ERUdSRUVTX1RPX1JBRElBTlM7XHJcblxyXG5cdFx0dGhpcy5pbnZhbGlkYXRlUm90YXRpb24oKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFuIG9iamVjdCB0aGF0IGNhbiBjb250YWluIGFueSBleHRyYSBkYXRhLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBleHRyYTpPYmplY3Q7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFuIGluZGV4ZWQgYXJyYXkgdGhhdCBjb250YWlucyBlYWNoIGZpbHRlciBvYmplY3QgY3VycmVudGx5IGFzc29jaWF0ZWRcclxuXHQgKiB3aXRoIHRoZSBkaXNwbGF5IG9iamVjdC4gVGhlIGZsYXNoLmZpbHRlcnMgcGFja2FnZSBjb250YWlucyBzZXZlcmFsXHJcblx0ICogY2xhc3NlcyB0aGF0IGRlZmluZSBzcGVjaWZpYyBmaWx0ZXJzIHlvdSBjYW4gdXNlLlxyXG5cdCAqXHJcblx0ICogPHA+RmlsdGVycyBjYW4gYmUgYXBwbGllZCBpbiBGbGFzaCBQcm9mZXNzaW9uYWwgYXQgZGVzaWduIHRpbWUsIG9yIGF0IHJ1blxyXG5cdCAqIHRpbWUgYnkgdXNpbmcgQWN0aW9uU2NyaXB0IGNvZGUuIFRvIGFwcGx5IGEgZmlsdGVyIGJ5IHVzaW5nIEFjdGlvblNjcmlwdCxcclxuXHQgKiB5b3UgbXVzdCBtYWtlIGEgdGVtcG9yYXJ5IGNvcHkgb2YgdGhlIGVudGlyZSA8Y29kZT5maWx0ZXJzPC9jb2RlPiBhcnJheSxcclxuXHQgKiBtb2RpZnkgdGhlIHRlbXBvcmFyeSBhcnJheSwgdGhlbiBhc3NpZ24gdGhlIHZhbHVlIG9mIHRoZSB0ZW1wb3JhcnkgYXJyYXlcclxuXHQgKiBiYWNrIHRvIHRoZSA8Y29kZT5maWx0ZXJzPC9jb2RlPiBhcnJheS4gWW91IGNhbm5vdCBkaXJlY3RseSBhZGQgYSBuZXdcclxuXHQgKiBmaWx0ZXIgb2JqZWN0IHRvIHRoZSA8Y29kZT5maWx0ZXJzPC9jb2RlPiBhcnJheS48L3A+XHJcblx0ICpcclxuXHQgKiA8cD5UbyBhZGQgYSBmaWx0ZXIgYnkgdXNpbmcgQWN0aW9uU2NyaXB0LCBwZXJmb3JtIHRoZSBmb2xsb3dpbmcgc3RlcHNcclxuXHQgKiAoYXNzdW1lIHRoYXQgdGhlIHRhcmdldCBkaXNwbGF5IG9iamVjdCBpcyBuYW1lZFxyXG5cdCAqIDxjb2RlPm15RGlzcGxheU9iamVjdDwvY29kZT4pOjwvcD5cclxuXHQgKlxyXG5cdCAqIDxvbD5cclxuXHQgKiAgIDxsaT5DcmVhdGUgYSBuZXcgZmlsdGVyIG9iamVjdCBieSB1c2luZyB0aGUgY29uc3RydWN0b3IgbWV0aG9kIG9mIHlvdXJcclxuXHQgKiBjaG9zZW4gZmlsdGVyIGNsYXNzLjwvbGk+XHJcblx0ICogICA8bGk+QXNzaWduIHRoZSB2YWx1ZSBvZiB0aGUgPGNvZGU+bXlEaXNwbGF5T2JqZWN0LmZpbHRlcnM8L2NvZGU+IGFycmF5XHJcblx0ICogdG8gYSB0ZW1wb3JhcnkgYXJyYXksIHN1Y2ggYXMgb25lIG5hbWVkIDxjb2RlPm15RmlsdGVyczwvY29kZT4uPC9saT5cclxuXHQgKiAgIDxsaT5BZGQgdGhlIG5ldyBmaWx0ZXIgb2JqZWN0IHRvIHRoZSA8Y29kZT5teUZpbHRlcnM8L2NvZGU+IHRlbXBvcmFyeVxyXG5cdCAqIGFycmF5LjwvbGk+XHJcblx0ICogICA8bGk+QXNzaWduIHRoZSB2YWx1ZSBvZiB0aGUgdGVtcG9yYXJ5IGFycmF5IHRvIHRoZVxyXG5cdCAqIDxjb2RlPm15RGlzcGxheU9iamVjdC5maWx0ZXJzPC9jb2RlPiBhcnJheS48L2xpPlxyXG5cdCAqIDwvb2w+XHJcblx0ICpcclxuXHQgKiA8cD5JZiB0aGUgPGNvZGU+ZmlsdGVyczwvY29kZT4gYXJyYXkgaXMgdW5kZWZpbmVkLCB5b3UgZG8gbm90IG5lZWQgdG8gdXNlXHJcblx0ICogYSB0ZW1wb3JhcnkgYXJyYXkuIEluc3RlYWQsIHlvdSBjYW4gZGlyZWN0bHkgYXNzaWduIGFuIGFycmF5IGxpdGVyYWwgdGhhdFxyXG5cdCAqIGNvbnRhaW5zIG9uZSBvciBtb3JlIGZpbHRlciBvYmplY3RzIHRoYXQgeW91IGNyZWF0ZS4gVGhlIGZpcnN0IGV4YW1wbGUgaW5cclxuXHQgKiB0aGUgRXhhbXBsZXMgc2VjdGlvbiBhZGRzIGEgZHJvcCBzaGFkb3cgZmlsdGVyIGJ5IHVzaW5nIGNvZGUgdGhhdCBoYW5kbGVzXHJcblx0ICogYm90aCBkZWZpbmVkIGFuZCB1bmRlZmluZWQgPGNvZGU+ZmlsdGVyczwvY29kZT4gYXJyYXlzLjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPlRvIG1vZGlmeSBhbiBleGlzdGluZyBmaWx0ZXIgb2JqZWN0LCB5b3UgbXVzdCB1c2UgdGhlIHRlY2huaXF1ZSBvZlxyXG5cdCAqIG1vZGlmeWluZyBhIGNvcHkgb2YgdGhlIDxjb2RlPmZpbHRlcnM8L2NvZGU+IGFycmF5OjwvcD5cclxuXHQgKlxyXG5cdCAqIDxvbD5cclxuXHQgKiAgIDxsaT5Bc3NpZ24gdGhlIHZhbHVlIG9mIHRoZSA8Y29kZT5maWx0ZXJzPC9jb2RlPiBhcnJheSB0byBhIHRlbXBvcmFyeVxyXG5cdCAqIGFycmF5LCBzdWNoIGFzIG9uZSBuYW1lZCA8Y29kZT5teUZpbHRlcnM8L2NvZGU+LjwvbGk+XHJcblx0ICogICA8bGk+TW9kaWZ5IHRoZSBwcm9wZXJ0eSBieSB1c2luZyB0aGUgdGVtcG9yYXJ5IGFycmF5LFxyXG5cdCAqIDxjb2RlPm15RmlsdGVyczwvY29kZT4uIEZvciBleGFtcGxlLCB0byBzZXQgdGhlIHF1YWxpdHkgcHJvcGVydHkgb2YgdGhlXHJcblx0ICogZmlyc3QgZmlsdGVyIGluIHRoZSBhcnJheSwgeW91IGNvdWxkIHVzZSB0aGUgZm9sbG93aW5nIGNvZGU6XHJcblx0ICogPGNvZGU+bXlGaWx0ZXJzWzBdLnF1YWxpdHkgPSAxOzwvY29kZT48L2xpPlxyXG5cdCAqICAgPGxpPkFzc2lnbiB0aGUgdmFsdWUgb2YgdGhlIHRlbXBvcmFyeSBhcnJheSB0byB0aGUgPGNvZGU+ZmlsdGVyczwvY29kZT5cclxuXHQgKiBhcnJheS48L2xpPlxyXG5cdCAqIDwvb2w+XHJcblx0ICpcclxuXHQgKiA8cD5BdCBsb2FkIHRpbWUsIGlmIGEgZGlzcGxheSBvYmplY3QgaGFzIGFuIGFzc29jaWF0ZWQgZmlsdGVyLCBpdCBpc1xyXG5cdCAqIG1hcmtlZCB0byBjYWNoZSBpdHNlbGYgYXMgYSB0cmFuc3BhcmVudCBiaXRtYXAuIEZyb20gdGhpcyBwb2ludCBmb3J3YXJkLFxyXG5cdCAqIGFzIGxvbmcgYXMgdGhlIGRpc3BsYXkgb2JqZWN0IGhhcyBhIHZhbGlkIGZpbHRlciBsaXN0LCB0aGUgcGxheWVyIGNhY2hlc1xyXG5cdCAqIHRoZSBkaXNwbGF5IG9iamVjdCBhcyBhIGJpdG1hcC4gVGhpcyBzb3VyY2UgYml0bWFwIGlzIHVzZWQgYXMgYSBzb3VyY2VcclxuXHQgKiBpbWFnZSBmb3IgdGhlIGZpbHRlciBlZmZlY3RzLiBFYWNoIGRpc3BsYXkgb2JqZWN0IHVzdWFsbHkgaGFzIHR3byBiaXRtYXBzOlxyXG5cdCAqIG9uZSB3aXRoIHRoZSBvcmlnaW5hbCB1bmZpbHRlcmVkIHNvdXJjZSBkaXNwbGF5IG9iamVjdCBhbmQgYW5vdGhlciBmb3IgdGhlXHJcblx0ICogZmluYWwgaW1hZ2UgYWZ0ZXIgZmlsdGVyaW5nLiBUaGUgZmluYWwgaW1hZ2UgaXMgdXNlZCB3aGVuIHJlbmRlcmluZy4gQXNcclxuXHQgKiBsb25nIGFzIHRoZSBkaXNwbGF5IG9iamVjdCBkb2VzIG5vdCBjaGFuZ2UsIHRoZSBmaW5hbCBpbWFnZSBkb2VzIG5vdCBuZWVkXHJcblx0ICogdXBkYXRpbmcuPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+VGhlIGZsYXNoLmZpbHRlcnMgcGFja2FnZSBpbmNsdWRlcyBjbGFzc2VzIGZvciBmaWx0ZXJzLiBGb3IgZXhhbXBsZSwgdG9cclxuXHQgKiBjcmVhdGUgYSBEcm9wU2hhZG93IGZpbHRlciwgeW91IHdvdWxkIHdyaXRlOjwvcD5cclxuXHQgKlxyXG5cdCAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciBXaGVuIDxjb2RlPmZpbHRlcnM8L2NvZGU+IGluY2x1ZGVzIGEgU2hhZGVyRmlsdGVyXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIGFuZCB0aGUgc2hhZGVyIG91dHB1dCB0eXBlIGlzIG5vdCBjb21wYXRpYmxlIHdpdGhcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgdGhpcyBvcGVyYXRpb24odGhlIHNoYWRlciBtdXN0IHNwZWNpZnkgYVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5waXhlbDQ8L2NvZGU+IG91dHB1dCkuXHJcblx0ICogQHRocm93cyBBcmd1bWVudEVycm9yIFdoZW4gPGNvZGU+ZmlsdGVyczwvY29kZT4gaW5jbHVkZXMgYSBTaGFkZXJGaWx0ZXJcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgYW5kIHRoZSBzaGFkZXIgZG9lc24ndCBzcGVjaWZ5IGFueSBpbWFnZSBpbnB1dCBvclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICB0aGUgZmlyc3QgaW5wdXQgaXMgbm90IGFuIDxjb2RlPmltYWdlNDwvY29kZT4gaW5wdXQuXHJcblx0ICogQHRocm93cyBBcmd1bWVudEVycm9yIFdoZW4gPGNvZGU+ZmlsdGVyczwvY29kZT4gaW5jbHVkZXMgYSBTaGFkZXJGaWx0ZXJcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgYW5kIHRoZSBzaGFkZXIgc3BlY2lmaWVzIGFuIGltYWdlIGlucHV0IHRoYXQgaXNuJ3RcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZWQuXHJcblx0ICogQHRocm93cyBBcmd1bWVudEVycm9yIFdoZW4gPGNvZGU+ZmlsdGVyczwvY29kZT4gaW5jbHVkZXMgYSBTaGFkZXJGaWx0ZXIsIGFcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgQnl0ZUFycmF5IG9yIFZlY3Rvci48TnVtYmVyPiBpbnN0YW5jZSBhcyBhIHNoYWRlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBpbnB1dCwgYW5kIHRoZSA8Y29kZT53aWR0aDwvY29kZT4gYW5kXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPmhlaWdodDwvY29kZT4gcHJvcGVydGllcyBhcmVuJ3Qgc3BlY2lmaWVkIGZvclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICB0aGUgU2hhZGVySW5wdXQgb2JqZWN0LCBvciB0aGUgc3BlY2lmaWVkIHZhbHVlc1xyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBkb24ndCBtYXRjaCB0aGUgYW1vdW50IG9mIGRhdGEgaW4gdGhlIGlucHV0IGRhdGEuXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIFNlZSB0aGUgPGNvZGU+U2hhZGVySW5wdXQuaW5wdXQ8L2NvZGU+IHByb3BlcnR5IGZvclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBtb3JlIGluZm9ybWF0aW9uLlxyXG5cdCAqL1xyXG4vL1x0XHRwdWJsaWMgZmlsdGVyczpBcnJheTxEeW5hbWljPjtcclxuXHJcblx0LyoqXHJcblx0ICogSW5kaWNhdGVzIHRoZSBoZWlnaHQgb2YgdGhlIGRpc3BsYXkgb2JqZWN0LCBpbiBwaXhlbHMuIFRoZSBoZWlnaHQgaXNcclxuXHQgKiBjYWxjdWxhdGVkIGJhc2VkIG9uIHRoZSBib3VuZHMgb2YgdGhlIGNvbnRlbnQgb2YgdGhlIGRpc3BsYXkgb2JqZWN0LiBXaGVuXHJcblx0ICogeW91IHNldCB0aGUgPGNvZGU+aGVpZ2h0PC9jb2RlPiBwcm9wZXJ0eSwgdGhlIDxjb2RlPnNjYWxlWTwvY29kZT4gcHJvcGVydHlcclxuXHQgKiBpcyBhZGp1c3RlZCBhY2NvcmRpbmdseSwgYXMgc2hvd24gaW4gdGhlIGZvbGxvd2luZyBjb2RlOlxyXG5cdCAqXHJcblx0ICogPHA+RXhjZXB0IGZvciBUZXh0RmllbGQgYW5kIFZpZGVvIG9iamVjdHMsIGEgZGlzcGxheSBvYmplY3Qgd2l0aCBub1xyXG5cdCAqIGNvbnRlbnQgKHN1Y2ggYXMgYW4gZW1wdHkgc3ByaXRlKSBoYXMgYSBoZWlnaHQgb2YgMCwgZXZlbiBpZiB5b3UgdHJ5IHRvXHJcblx0ICogc2V0IDxjb2RlPmhlaWdodDwvY29kZT4gdG8gYSBkaWZmZXJlbnQgdmFsdWUuPC9wPlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgaGVpZ2h0KCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX2JveEJvdW5kc0ludmFsaWQpXHJcblx0XHRcdHRoaXMuX3BVcGRhdGVCb3hCb3VuZHMoKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fcEJveEJvdW5kcy5oZWlnaHQqdGhpcy5fcFNjYWxlWTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgaGVpZ2h0KHZhbDpudW1iZXIpXHJcblx0e1xyXG5cdFx0dmFyIHNjYWxlWTpudW1iZXIgPSB2YWwvdGhpcy5nZXRCb3goKS5oZWlnaHQ7XHJcblxyXG5cdFx0aWYgKHRoaXMuX3BTY2FsZVkgPT0gc2NhbGVZKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fcFNjYWxlWSA9IHNjYWxlWTtcclxuXHJcblx0XHR0aGlzLmludmFsaWRhdGVTY2FsZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSW5kaWNhdGVzIHRoZSBpbnN0YW5jZSBjb250YWluZXIgaW5kZXggb2YgdGhlIERpc3BsYXlPYmplY3QuIFRoZSBvYmplY3QgY2FuIGJlXHJcblx0ICogaWRlbnRpZmllZCBpbiB0aGUgY2hpbGQgbGlzdCBvZiBpdHMgcGFyZW50IGRpc3BsYXkgb2JqZWN0IGNvbnRhaW5lciBieVxyXG5cdCAqIGNhbGxpbmcgdGhlIDxjb2RlPmdldENoaWxkQnlJbmRleCgpPC9jb2RlPiBtZXRob2Qgb2YgdGhlIGRpc3BsYXkgb2JqZWN0XHJcblx0ICogY29udGFpbmVyLlxyXG5cdCAqXHJcblx0ICogPHA+SWYgdGhlIERpc3BsYXlPYmplY3QgaGFzIG5vIHBhcmVudCBjb250YWluZXIsIGluZGV4IGRlZmF1bHRzIHRvIDAuPC9wPlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgaW5kZXgoKTpudW1iZXJcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fcFBhcmVudClcclxuXHRcdFx0cmV0dXJuIHRoaXMuX3BQYXJlbnQuZ2V0Q2hpbGRJbmRleCh0aGlzKTtcclxuXHJcblx0XHRyZXR1cm4gMDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCBpbnZlcnNlU2NlbmVUcmFuc2Zvcm0oKTpNYXRyaXgzRFxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9pbnZlcnNlU2NlbmVUcmFuc2Zvcm1EaXJ0eSkge1xyXG5cdFx0XHR0aGlzLl9pbnZlcnNlU2NlbmVUcmFuc2Zvcm0uY29weUZyb20odGhpcy5zY2VuZVRyYW5zZm9ybSk7XHJcblx0XHRcdHRoaXMuX2ludmVyc2VTY2VuZVRyYW5zZm9ybS5pbnZlcnQoKTtcclxuXHRcdFx0dGhpcy5faW52ZXJzZVNjZW5lVHJhbnNmb3JtRGlydHkgPSBmYWxzZTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzLl9pbnZlcnNlU2NlbmVUcmFuc2Zvcm07XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgaWdub3JlVHJhbnNmb3JtKCk6Ym9vbGVhblxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9wSWdub3JlVHJhbnNmb3JtO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBpZ25vcmVUcmFuc2Zvcm0odmFsdWU6Ym9vbGVhbilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fcElnbm9yZVRyYW5zZm9ybSA9PSB2YWx1ZSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX3BJZ25vcmVUcmFuc2Zvcm0gPSB2YWx1ZTtcclxuXHJcblx0XHRpZiAodmFsdWUpIHtcclxuXHRcdFx0dGhpcy5fcFNjZW5lVHJhbnNmb3JtLmlkZW50aXR5KCk7XHJcblx0XHRcdHRoaXMuX3NjZW5lUG9zaXRpb24uc2V0VG8oMCwgMCwgMCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5wSW52YWxpZGF0ZVNjZW5lVHJhbnNmb3JtKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgaXNFbnRpdHkoKVxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9wSXNFbnRpdHk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIGEgTG9hZGVySW5mbyBvYmplY3QgY29udGFpbmluZyBpbmZvcm1hdGlvbiBhYm91dCBsb2FkaW5nIHRoZSBmaWxlXHJcblx0ICogdG8gd2hpY2ggdGhpcyBkaXNwbGF5IG9iamVjdCBiZWxvbmdzLiBUaGUgPGNvZGU+bG9hZGVySW5mbzwvY29kZT4gcHJvcGVydHlcclxuXHQgKiBpcyBkZWZpbmVkIG9ubHkgZm9yIHRoZSByb290IGRpc3BsYXkgb2JqZWN0IG9mIGEgU1dGIGZpbGUgb3IgZm9yIGEgbG9hZGVkXHJcblx0ICogQml0bWFwKG5vdCBmb3IgYSBCaXRtYXAgdGhhdCBpcyBkcmF3biB3aXRoIEFjdGlvblNjcmlwdCkuIFRvIGZpbmQgdGhlXHJcblx0ICogPGNvZGU+bG9hZGVySW5mbzwvY29kZT4gb2JqZWN0IGFzc29jaWF0ZWQgd2l0aCB0aGUgU1dGIGZpbGUgdGhhdCBjb250YWluc1xyXG5cdCAqIGEgZGlzcGxheSBvYmplY3QgbmFtZWQgPGNvZGU+bXlEaXNwbGF5T2JqZWN0PC9jb2RlPiwgdXNlXHJcblx0ICogPGNvZGU+bXlEaXNwbGF5T2JqZWN0LnJvb3QubG9hZGVySW5mbzwvY29kZT4uXHJcblx0ICpcclxuXHQgKiA8cD5BIGxhcmdlIFNXRiBmaWxlIGNhbiBtb25pdG9yIGl0cyBkb3dubG9hZCBieSBjYWxsaW5nXHJcblx0ICogPGNvZGU+dGhpcy5yb290LmxvYWRlckluZm8uYWRkRXZlbnRMaXN0ZW5lcihFdmVudC5DT01QTEVURSxcclxuXHQgKiBmdW5jKTwvY29kZT4uPC9wPlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgbG9hZGVySW5mbygpOkxvYWRlckluZm9cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fbG9hZGVySW5mbztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBjYWxsaW5nIGRpc3BsYXkgb2JqZWN0IGlzIG1hc2tlZCBieSB0aGUgc3BlY2lmaWVkIDxjb2RlPm1hc2s8L2NvZGU+XHJcblx0ICogb2JqZWN0LiBUbyBlbnN1cmUgdGhhdCBtYXNraW5nIHdvcmtzIHdoZW4gdGhlIFN0YWdlIGlzIHNjYWxlZCwgdGhlXHJcblx0ICogPGNvZGU+bWFzazwvY29kZT4gZGlzcGxheSBvYmplY3QgbXVzdCBiZSBpbiBhbiBhY3RpdmUgcGFydCBvZiB0aGUgZGlzcGxheVxyXG5cdCAqIGxpc3QuIFRoZSA8Y29kZT5tYXNrPC9jb2RlPiBvYmplY3QgaXRzZWxmIGlzIG5vdCBkcmF3bi4gU2V0XHJcblx0ICogPGNvZGU+bWFzazwvY29kZT4gdG8gPGNvZGU+bnVsbDwvY29kZT4gdG8gcmVtb3ZlIHRoZSBtYXNrLlxyXG5cdCAqXHJcblx0ICogPHA+VG8gYmUgYWJsZSB0byBzY2FsZSBhIG1hc2sgb2JqZWN0LCBpdCBtdXN0IGJlIG9uIHRoZSBkaXNwbGF5IGxpc3QuIFRvXHJcblx0ICogYmUgYWJsZSB0byBkcmFnIGEgbWFzayBTcHJpdGUgb2JqZWN0KGJ5IGNhbGxpbmcgaXRzXHJcblx0ICogPGNvZGU+c3RhcnREcmFnKCk8L2NvZGU+IG1ldGhvZCksIGl0IG11c3QgYmUgb24gdGhlIGRpc3BsYXkgbGlzdC4gVG8gY2FsbFxyXG5cdCAqIHRoZSA8Y29kZT5zdGFydERyYWcoKTwvY29kZT4gbWV0aG9kIGZvciBhIG1hc2sgc3ByaXRlIGJhc2VkIG9uIGFcclxuXHQgKiA8Y29kZT5tb3VzZURvd248L2NvZGU+IGV2ZW50IGJlaW5nIGRpc3BhdGNoZWQgYnkgdGhlIHNwcml0ZSwgc2V0IHRoZVxyXG5cdCAqIHNwcml0ZSdzIDxjb2RlPmJ1dHRvbk1vZGU8L2NvZGU+IHByb3BlcnR5IHRvIDxjb2RlPnRydWU8L2NvZGU+LjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPldoZW4gZGlzcGxheSBvYmplY3RzIGFyZSBjYWNoZWQgYnkgc2V0dGluZyB0aGVcclxuXHQgKiA8Y29kZT5jYWNoZUFzQml0bWFwPC9jb2RlPiBwcm9wZXJ0eSB0byA8Y29kZT50cnVlPC9jb2RlPiBhbiB0aGVcclxuXHQgKiA8Y29kZT5jYWNoZUFzQml0bWFwTWF0cml4PC9jb2RlPiBwcm9wZXJ0eSB0byBhIE1hdHJpeCBvYmplY3QsIGJvdGggdGhlXHJcblx0ICogbWFzayBhbmQgdGhlIGRpc3BsYXkgb2JqZWN0IGJlaW5nIG1hc2tlZCBtdXN0IGJlIHBhcnQgb2YgdGhlIHNhbWUgY2FjaGVkXHJcblx0ICogYml0bWFwLiBUaHVzLCBpZiB0aGUgZGlzcGxheSBvYmplY3QgaXMgY2FjaGVkLCB0aGVuIHRoZSBtYXNrIG11c3QgYmUgYVxyXG5cdCAqIGNoaWxkIG9mIHRoZSBkaXNwbGF5IG9iamVjdC4gSWYgYW4gYW5jZXN0b3Igb2YgdGhlIGRpc3BsYXkgb2JqZWN0IG9uIHRoZVxyXG5cdCAqIGRpc3BsYXkgbGlzdCBpcyBjYWNoZWQsIHRoZW4gdGhlIG1hc2sgbXVzdCBiZSBhIGNoaWxkIG9mIHRoYXQgYW5jZXN0b3Igb3JcclxuXHQgKiBvbmUgb2YgaXRzIGRlc2NlbmRlbnRzLiBJZiBtb3JlIHRoYW4gb25lIGFuY2VzdG9yIG9mIHRoZSBtYXNrZWQgb2JqZWN0IGlzXHJcblx0ICogY2FjaGVkLCB0aGVuIHRoZSBtYXNrIG11c3QgYmUgYSBkZXNjZW5kZW50IG9mIHRoZSBjYWNoZWQgY29udGFpbmVyIGNsb3Nlc3RcclxuXHQgKiB0byB0aGUgbWFza2VkIG9iamVjdCBpbiB0aGUgZGlzcGxheSBsaXN0LjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPjxiPk5vdGU6PC9iPiBBIHNpbmdsZSA8Y29kZT5tYXNrPC9jb2RlPiBvYmplY3QgY2Fubm90IGJlIHVzZWQgdG8gbWFza1xyXG5cdCAqIG1vcmUgdGhhbiBvbmUgY2FsbGluZyBkaXNwbGF5IG9iamVjdC4gV2hlbiB0aGUgPGNvZGU+bWFzazwvY29kZT4gaXNcclxuXHQgKiBhc3NpZ25lZCB0byBhIHNlY29uZCBkaXNwbGF5IG9iamVjdCwgaXQgaXMgcmVtb3ZlZCBhcyB0aGUgbWFzayBvZiB0aGVcclxuXHQgKiBmaXJzdCBvYmplY3QsIGFuZCB0aGF0IG9iamVjdCdzIDxjb2RlPm1hc2s8L2NvZGU+IHByb3BlcnR5IGJlY29tZXNcclxuXHQgKiA8Y29kZT5udWxsPC9jb2RlPi48L3A+XHJcblx0ICovXHJcblx0cHVibGljIG1hc2s6RGlzcGxheU9iamVjdDtcclxuXHJcblx0LyoqXHJcblx0ICogU3BlY2lmaWVzIHdoZXRoZXIgdGhpcyBvYmplY3QgcmVjZWl2ZXMgbW91c2UsIG9yIG90aGVyIHVzZXIgaW5wdXQsXHJcblx0ICogbWVzc2FnZXMuIFRoZSBkZWZhdWx0IHZhbHVlIGlzIDxjb2RlPnRydWU8L2NvZGU+LCB3aGljaCBtZWFucyB0aGF0IGJ5XHJcblx0ICogZGVmYXVsdCBhbnkgSW50ZXJhY3RpdmVPYmplY3QgaW5zdGFuY2UgdGhhdCBpcyBvbiB0aGUgZGlzcGxheSBsaXN0XHJcblx0ICogcmVjZWl2ZXMgbW91c2UgZXZlbnRzIG9yIG90aGVyIHVzZXIgaW5wdXQgZXZlbnRzLiBJZlxyXG5cdCAqIDxjb2RlPm1vdXNlRW5hYmxlZDwvY29kZT4gaXMgc2V0IHRvIDxjb2RlPmZhbHNlPC9jb2RlPiwgdGhlIGluc3RhbmNlIGRvZXNcclxuXHQgKiBub3QgcmVjZWl2ZSBhbnkgbW91c2UgZXZlbnRzKG9yIG90aGVyIHVzZXIgaW5wdXQgZXZlbnRzIGxpa2Uga2V5Ym9hcmRcclxuXHQgKiBldmVudHMpLiBBbnkgY2hpbGRyZW4gb2YgdGhpcyBpbnN0YW5jZSBvbiB0aGUgZGlzcGxheSBsaXN0IGFyZSBub3RcclxuXHQgKiBhZmZlY3RlZC4gVG8gY2hhbmdlIHRoZSA8Y29kZT5tb3VzZUVuYWJsZWQ8L2NvZGU+IGJlaGF2aW9yIGZvciBhbGxcclxuXHQgKiBjaGlsZHJlbiBvZiBhbiBvYmplY3Qgb24gdGhlIGRpc3BsYXkgbGlzdCwgdXNlXHJcblx0ICogPGNvZGU+Zmxhc2guZGlzcGxheS5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLm1vdXNlQ2hpbGRyZW48L2NvZGU+LlxyXG5cdCAqXHJcblx0ICogPHA+IE5vIGV2ZW50IGlzIGRpc3BhdGNoZWQgYnkgc2V0dGluZyB0aGlzIHByb3BlcnR5LiBZb3UgbXVzdCB1c2UgdGhlXHJcblx0ICogPGNvZGU+YWRkRXZlbnRMaXN0ZW5lcigpPC9jb2RlPiBtZXRob2QgdG8gY3JlYXRlIGludGVyYWN0aXZlXHJcblx0ICogZnVuY3Rpb25hbGl0eS48L3A+XHJcblx0ICovXHJcblx0cHVibGljIGdldCBtb3VzZUVuYWJsZWQoKTpib29sZWFuXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2V4cGxpY2l0TW91c2VFbmFibGVkO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBtb3VzZUVuYWJsZWQodmFsdWU6Ym9vbGVhbilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fZXhwbGljaXRNb3VzZUVuYWJsZWQgPT0gdmFsdWUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9leHBsaWNpdE1vdXNlRW5hYmxlZCA9IHZhbHVlO1xyXG5cclxuXHRcdHRoaXMuX3BVcGRhdGVJbXBsaWNpdE1vdXNlRW5hYmxlZCh0aGlzLl9wUGFyZW50PyB0aGlzLl9wUGFyZW50Lm1vdXNlQ2hpbGRyZW4gOiB0cnVlKTtcclxuXHR9XHJcblxyXG5cclxuXHQvKipcclxuXHQgKiBJbmRpY2F0ZXMgdGhlIHggY29vcmRpbmF0ZSBvZiB0aGUgbW91c2Ugb3IgdXNlciBpbnB1dCBkZXZpY2UgcG9zaXRpb24sIGluXHJcblx0ICogcGl4ZWxzLlxyXG5cdCAqXHJcblx0ICogPHA+PGI+Tm90ZTwvYj46IEZvciBhIERpc3BsYXlPYmplY3QgdGhhdCBoYXMgYmVlbiByb3RhdGVkLCB0aGUgcmV0dXJuZWQgeFxyXG5cdCAqIGNvb3JkaW5hdGUgd2lsbCByZWZsZWN0IHRoZSBub24tcm90YXRlZCBvYmplY3QuPC9wPlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgbW91c2VYKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX21vdXNlWDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluZGljYXRlcyB0aGUgeSBjb29yZGluYXRlIG9mIHRoZSBtb3VzZSBvciB1c2VyIGlucHV0IGRldmljZSBwb3NpdGlvbiwgaW5cclxuXHQgKiBwaXhlbHMuXHJcblx0ICpcclxuXHQgKiA8cD48Yj5Ob3RlPC9iPjogRm9yIGEgRGlzcGxheU9iamVjdCB0aGF0IGhhcyBiZWVuIHJvdGF0ZWQsIHRoZSByZXR1cm5lZCB5XHJcblx0ICogY29vcmRpbmF0ZSB3aWxsIHJlZmxlY3QgdGhlIG5vbi1yb3RhdGVkIG9iamVjdC48L3A+XHJcblx0ICovXHJcblx0cHVibGljIGdldCBtb3VzZVkoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fbW91c2VZO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSW5kaWNhdGVzIHRoZSBpbnN0YW5jZSBuYW1lIG9mIHRoZSBEaXNwbGF5T2JqZWN0LiBUaGUgb2JqZWN0IGNhbiBiZVxyXG5cdCAqIGlkZW50aWZpZWQgaW4gdGhlIGNoaWxkIGxpc3Qgb2YgaXRzIHBhcmVudCBkaXNwbGF5IG9iamVjdCBjb250YWluZXIgYnlcclxuXHQgKiBjYWxsaW5nIHRoZSA8Y29kZT5nZXRDaGlsZEJ5TmFtZSgpPC9jb2RlPiBtZXRob2Qgb2YgdGhlIGRpc3BsYXkgb2JqZWN0XHJcblx0ICogY29udGFpbmVyLlxyXG5cdCAqXHJcblx0ICogQHRocm93cyBJbGxlZ2FsT3BlcmF0aW9uRXJyb3IgSWYgeW91IGFyZSBhdHRlbXB0aW5nIHRvIHNldCB0aGlzIHByb3BlcnR5XHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb24gYW4gb2JqZWN0IHRoYXQgd2FzIHBsYWNlZCBvbiB0aGUgdGltZWxpbmVcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbiB0aGUgRmxhc2ggYXV0aG9yaW5nIHRvb2wuXHJcblx0ICovXHJcblx0cHVibGljIG5hbWU6c3RyaW5nO1xyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBvcmllbnRhdGlvbk1vZGU6c3RyaW5nID0gT3JpZW50YXRpb25Nb2RlLkRFRkFVTFQ7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluZGljYXRlcyB0aGUgRGlzcGxheU9iamVjdENvbnRhaW5lciBvYmplY3QgdGhhdCBjb250YWlucyB0aGlzIGRpc3BsYXlcclxuXHQgKiBvYmplY3QuIFVzZSB0aGUgPGNvZGU+cGFyZW50PC9jb2RlPiBwcm9wZXJ0eSB0byBzcGVjaWZ5IGEgcmVsYXRpdmUgcGF0aCB0b1xyXG5cdCAqIGRpc3BsYXkgb2JqZWN0cyB0aGF0IGFyZSBhYm92ZSB0aGUgY3VycmVudCBkaXNwbGF5IG9iamVjdCBpbiB0aGUgZGlzcGxheVxyXG5cdCAqIGxpc3QgaGllcmFyY2h5LlxyXG5cdCAqXHJcblx0ICogPHA+WW91IGNhbiB1c2UgPGNvZGU+cGFyZW50PC9jb2RlPiB0byBtb3ZlIHVwIG11bHRpcGxlIGxldmVscyBpbiB0aGVcclxuXHQgKiBkaXNwbGF5IGxpc3QgYXMgaW4gdGhlIGZvbGxvd2luZzo8L3A+XHJcblx0ICpcclxuXHQgKiBAdGhyb3dzIFNlY3VyaXR5RXJyb3IgVGhlIHBhcmVudCBkaXNwbGF5IG9iamVjdCBiZWxvbmdzIHRvIGEgc2VjdXJpdHlcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgc2FuZGJveCB0byB3aGljaCB5b3UgZG8gbm90IGhhdmUgYWNjZXNzLiBZb3UgY2FuXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIGF2b2lkIHRoaXMgc2l0dWF0aW9uIGJ5IGhhdmluZyB0aGUgcGFyZW50IG1vdmllIGNhbGxcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgdGhlIDxjb2RlPlNlY3VyaXR5LmFsbG93RG9tYWluKCk8L2NvZGU+IG1ldGhvZC5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHBhcmVudCgpOkRpc3BsYXlPYmplY3RDb250YWluZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fcFBhcmVudDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCBwYXJ0aXRpb24oKTpQYXJ0aXRpb25cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fZXhwbGljaXRQYXJ0aXRpb247XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHBhcnRpdGlvbih2YWx1ZTpQYXJ0aXRpb24pXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX2V4cGxpY2l0UGFydGl0aW9uID09IHZhbHVlKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fZXhwbGljaXRQYXJ0aXRpb24gPSB2YWx1ZTtcclxuXHJcblx0XHR0aGlzLl9wVXBkYXRlSW1wbGljaXRQYXJ0aXRpb24odGhpcy5fcFBhcmVudD8gdGhpcy5fcFBhcmVudC5faUFzc2lnbmVkUGFydGl0aW9uIDogbnVsbCwgdGhpcy5fcFNjZW5lKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCBwaWNraW5nQ29sbGlkZXIoKTpJUGlja2luZ0NvbGxpZGVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BQaWNraW5nQ29sbGlkZXI7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHBpY2tpbmdDb2xsaWRlcih2YWx1ZTpJUGlja2luZ0NvbGxpZGVyKVxyXG5cdHtcclxuXHRcdHRoaXMuX3BQaWNraW5nQ29sbGlkZXIgPSB2YWx1ZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERlZmluZXMgdGhlIGxvY2FsIHBvaW50IGFyb3VuZCB3aGljaCB0aGUgb2JqZWN0IHJvdGF0ZXMuXHJcblx0ICovXHJcblx0cHVibGljIGdldCBwaXZvdCgpOlZlY3RvcjNEXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3Bpdm90O1xyXG5cdH1cclxuXHJcblxyXG5cdHB1YmxpYyBzZXQgcGl2b3QocGl2b3Q6VmVjdG9yM0QpXHJcblx0e1xyXG5cdFx0dGhpcy5fcGl2b3QgPSBwaXZvdC5jbG9uZSgpO1xyXG5cclxuXHRcdHRoaXMuaW52YWxpZGF0ZVBpdm90KCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBGb3IgYSBkaXNwbGF5IG9iamVjdCBpbiBhIGxvYWRlZCBTV0YgZmlsZSwgdGhlIDxjb2RlPnJvb3Q8L2NvZGU+IHByb3BlcnR5XHJcblx0ICogaXMgdGhlIHRvcC1tb3N0IGRpc3BsYXkgb2JqZWN0IGluIHRoZSBwb3J0aW9uIG9mIHRoZSBkaXNwbGF5IGxpc3QncyB0cmVlXHJcblx0ICogc3RydWN0dXJlIHJlcHJlc2VudGVkIGJ5IHRoYXQgU1dGIGZpbGUuIEZvciBhIEJpdG1hcCBvYmplY3QgcmVwcmVzZW50aW5nIGFcclxuXHQgKiBsb2FkZWQgaW1hZ2UgZmlsZSwgdGhlIDxjb2RlPnJvb3Q8L2NvZGU+IHByb3BlcnR5IGlzIHRoZSBCaXRtYXAgb2JqZWN0XHJcblx0ICogaXRzZWxmLiBGb3IgdGhlIGluc3RhbmNlIG9mIHRoZSBtYWluIGNsYXNzIG9mIHRoZSBmaXJzdCBTV0YgZmlsZSBsb2FkZWQsXHJcblx0ICogdGhlIDxjb2RlPnJvb3Q8L2NvZGU+IHByb3BlcnR5IGlzIHRoZSBkaXNwbGF5IG9iamVjdCBpdHNlbGYuIFRoZVxyXG5cdCAqIDxjb2RlPnJvb3Q8L2NvZGU+IHByb3BlcnR5IG9mIHRoZSBTY2VuZSBvYmplY3QgaXMgdGhlIFNjZW5lIG9iamVjdCBpdHNlbGYuXHJcblx0ICogVGhlIDxjb2RlPnJvb3Q8L2NvZGU+IHByb3BlcnR5IGlzIHNldCB0byA8Y29kZT5udWxsPC9jb2RlPiBmb3IgYW55IGRpc3BsYXlcclxuXHQgKiBvYmplY3QgdGhhdCBoYXMgbm90IGJlZW4gYWRkZWQgdG8gdGhlIGRpc3BsYXkgbGlzdCwgdW5sZXNzIGl0IGhhcyBiZWVuXHJcblx0ICogYWRkZWQgdG8gYSBkaXNwbGF5IG9iamVjdCBjb250YWluZXIgdGhhdCBpcyBvZmYgdGhlIGRpc3BsYXkgbGlzdCBidXQgdGhhdFxyXG5cdCAqIGlzIGEgY2hpbGQgb2YgdGhlIHRvcC1tb3N0IGRpc3BsYXkgb2JqZWN0IGluIGEgbG9hZGVkIFNXRiBmaWxlLlxyXG5cdCAqXHJcblx0ICogPHA+Rm9yIGV4YW1wbGUsIGlmIHlvdSBjcmVhdGUgYSBuZXcgU3ByaXRlIG9iamVjdCBieSBjYWxsaW5nIHRoZVxyXG5cdCAqIDxjb2RlPlNwcml0ZSgpPC9jb2RlPiBjb25zdHJ1Y3RvciBtZXRob2QsIGl0cyA8Y29kZT5yb290PC9jb2RlPiBwcm9wZXJ0eVxyXG5cdCAqIGlzIDxjb2RlPm51bGw8L2NvZGU+IHVudGlsIHlvdSBhZGQgaXQgdG8gdGhlIGRpc3BsYXkgbGlzdChvciB0byBhIGRpc3BsYXlcclxuXHQgKiBvYmplY3QgY29udGFpbmVyIHRoYXQgaXMgb2ZmIHRoZSBkaXNwbGF5IGxpc3QgYnV0IHRoYXQgaXMgYSBjaGlsZCBvZiB0aGVcclxuXHQgKiB0b3AtbW9zdCBkaXNwbGF5IG9iamVjdCBpbiBhIFNXRiBmaWxlKS48L3A+XHJcblx0ICpcclxuXHQgKiA8cD5Gb3IgYSBsb2FkZWQgU1dGIGZpbGUsIGV2ZW4gdGhvdWdoIHRoZSBMb2FkZXIgb2JqZWN0IHVzZWQgdG8gbG9hZCB0aGVcclxuXHQgKiBmaWxlIG1heSBub3QgYmUgb24gdGhlIGRpc3BsYXkgbGlzdCwgdGhlIHRvcC1tb3N0IGRpc3BsYXkgb2JqZWN0IGluIHRoZVxyXG5cdCAqIFNXRiBmaWxlIGhhcyBpdHMgPGNvZGU+cm9vdDwvY29kZT4gcHJvcGVydHkgc2V0IHRvIGl0c2VsZi4gVGhlIExvYWRlclxyXG5cdCAqIG9iamVjdCBkb2VzIG5vdCBoYXZlIGl0cyA8Y29kZT5yb290PC9jb2RlPiBwcm9wZXJ0eSBzZXQgdW50aWwgaXQgaXMgYWRkZWRcclxuXHQgKiBhcyBhIGNoaWxkIG9mIGEgZGlzcGxheSBvYmplY3QgZm9yIHdoaWNoIHRoZSA8Y29kZT5yb290PC9jb2RlPiBwcm9wZXJ0eSBpc1xyXG5cdCAqIHNldC48L3A+XHJcblx0ICovXHJcblx0cHVibGljIGdldCByb290KCk6RGlzcGxheU9iamVjdENvbnRhaW5lclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9yb290O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSW5kaWNhdGVzIHRoZSByb3RhdGlvbiBvZiB0aGUgRGlzcGxheU9iamVjdCBpbnN0YW5jZSwgaW4gZGVncmVlcywgZnJvbSBpdHNcclxuXHQgKiBvcmlnaW5hbCBvcmllbnRhdGlvbi4gVmFsdWVzIGZyb20gMCB0byAxODAgcmVwcmVzZW50IGNsb2Nrd2lzZSByb3RhdGlvbjtcclxuXHQgKiB2YWx1ZXMgZnJvbSAwIHRvIC0xODAgcmVwcmVzZW50IGNvdW50ZXJjbG9ja3dpc2Ugcm90YXRpb24uIFZhbHVlcyBvdXRzaWRlXHJcblx0ICogdGhpcyByYW5nZSBhcmUgYWRkZWQgdG8gb3Igc3VidHJhY3RlZCBmcm9tIDM2MCB0byBvYnRhaW4gYSB2YWx1ZSB3aXRoaW5cclxuXHQgKiB0aGUgcmFuZ2UuIEZvciBleGFtcGxlLCB0aGUgc3RhdGVtZW50IDxjb2RlPm15X3ZpZGVvLnJvdGF0aW9uID0gNDUwPC9jb2RlPlxyXG5cdCAqIGlzIHRoZSBzYW1lIGFzIDxjb2RlPiBteV92aWRlby5yb3RhdGlvbiA9IDkwPC9jb2RlPi5cclxuXHQgKi9cclxuXHRwdWJsaWMgcm90YXRpb246bnVtYmVyOyAvL1RPRE9cclxuXHJcblx0LyoqXHJcblx0ICogSW5kaWNhdGVzIHRoZSB4LWF4aXMgcm90YXRpb24gb2YgdGhlIERpc3BsYXlPYmplY3QgaW5zdGFuY2UsIGluIGRlZ3JlZXMsXHJcblx0ICogZnJvbSBpdHMgb3JpZ2luYWwgb3JpZW50YXRpb24gcmVsYXRpdmUgdG8gdGhlIDNEIHBhcmVudCBjb250YWluZXIuIFZhbHVlc1xyXG5cdCAqIGZyb20gMCB0byAxODAgcmVwcmVzZW50IGNsb2Nrd2lzZSByb3RhdGlvbjsgdmFsdWVzIGZyb20gMCB0byAtMTgwXHJcblx0ICogcmVwcmVzZW50IGNvdW50ZXJjbG9ja3dpc2Ugcm90YXRpb24uIFZhbHVlcyBvdXRzaWRlIHRoaXMgcmFuZ2UgYXJlIGFkZGVkXHJcblx0ICogdG8gb3Igc3VidHJhY3RlZCBmcm9tIDM2MCB0byBvYnRhaW4gYSB2YWx1ZSB3aXRoaW4gdGhlIHJhbmdlLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgcm90YXRpb25YKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3JvdGF0aW9uWCpNYXRoQ29uc3RzLlJBRElBTlNfVE9fREVHUkVFUztcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgcm90YXRpb25YKHZhbDpudW1iZXIpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMucm90YXRpb25YID09IHZhbClcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX3JvdGF0aW9uWCA9IHZhbCpNYXRoQ29uc3RzLkRFR1JFRVNfVE9fUkFESUFOUztcclxuXHJcblx0XHR0aGlzLmludmFsaWRhdGVSb3RhdGlvbigpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSW5kaWNhdGVzIHRoZSB5LWF4aXMgcm90YXRpb24gb2YgdGhlIERpc3BsYXlPYmplY3QgaW5zdGFuY2UsIGluIGRlZ3JlZXMsXHJcblx0ICogZnJvbSBpdHMgb3JpZ2luYWwgb3JpZW50YXRpb24gcmVsYXRpdmUgdG8gdGhlIDNEIHBhcmVudCBjb250YWluZXIuIFZhbHVlc1xyXG5cdCAqIGZyb20gMCB0byAxODAgcmVwcmVzZW50IGNsb2Nrd2lzZSByb3RhdGlvbjsgdmFsdWVzIGZyb20gMCB0byAtMTgwXHJcblx0ICogcmVwcmVzZW50IGNvdW50ZXJjbG9ja3dpc2Ugcm90YXRpb24uIFZhbHVlcyBvdXRzaWRlIHRoaXMgcmFuZ2UgYXJlIGFkZGVkXHJcblx0ICogdG8gb3Igc3VidHJhY3RlZCBmcm9tIDM2MCB0byBvYnRhaW4gYSB2YWx1ZSB3aXRoaW4gdGhlIHJhbmdlLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgcm90YXRpb25ZKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3JvdGF0aW9uWSpNYXRoQ29uc3RzLlJBRElBTlNfVE9fREVHUkVFUztcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgcm90YXRpb25ZKHZhbDpudW1iZXIpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMucm90YXRpb25ZID09IHZhbClcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX3JvdGF0aW9uWSA9IHZhbCpNYXRoQ29uc3RzLkRFR1JFRVNfVE9fUkFESUFOUztcclxuXHJcblx0XHR0aGlzLmludmFsaWRhdGVSb3RhdGlvbigpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSW5kaWNhdGVzIHRoZSB6LWF4aXMgcm90YXRpb24gb2YgdGhlIERpc3BsYXlPYmplY3QgaW5zdGFuY2UsIGluIGRlZ3JlZXMsXHJcblx0ICogZnJvbSBpdHMgb3JpZ2luYWwgb3JpZW50YXRpb24gcmVsYXRpdmUgdG8gdGhlIDNEIHBhcmVudCBjb250YWluZXIuIFZhbHVlc1xyXG5cdCAqIGZyb20gMCB0byAxODAgcmVwcmVzZW50IGNsb2Nrd2lzZSByb3RhdGlvbjsgdmFsdWVzIGZyb20gMCB0byAtMTgwXHJcblx0ICogcmVwcmVzZW50IGNvdW50ZXJjbG9ja3dpc2Ugcm90YXRpb24uIFZhbHVlcyBvdXRzaWRlIHRoaXMgcmFuZ2UgYXJlIGFkZGVkXHJcblx0ICogdG8gb3Igc3VidHJhY3RlZCBmcm9tIDM2MCB0byBvYnRhaW4gYSB2YWx1ZSB3aXRoaW4gdGhlIHJhbmdlLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgcm90YXRpb25aKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3JvdGF0aW9uWipNYXRoQ29uc3RzLlJBRElBTlNfVE9fREVHUkVFUztcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgcm90YXRpb25aKHZhbDpudW1iZXIpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMucm90YXRpb25aID09IHZhbClcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX3JvdGF0aW9uWiA9IHZhbCpNYXRoQ29uc3RzLkRFR1JFRVNfVE9fUkFESUFOUztcclxuXHJcblx0XHR0aGlzLmludmFsaWRhdGVSb3RhdGlvbigpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGN1cnJlbnQgc2NhbGluZyBncmlkIHRoYXQgaXMgaW4gZWZmZWN0LiBJZiBzZXQgdG8gPGNvZGU+bnVsbDwvY29kZT4sXHJcblx0ICogdGhlIGVudGlyZSBkaXNwbGF5IG9iamVjdCBpcyBzY2FsZWQgbm9ybWFsbHkgd2hlbiBhbnkgc2NhbGUgdHJhbnNmb3JtYXRpb25cclxuXHQgKiBpcyBhcHBsaWVkLlxyXG5cdCAqXHJcblx0ICogPHA+V2hlbiB5b3UgZGVmaW5lIHRoZSA8Y29kZT5zY2FsZTlHcmlkPC9jb2RlPiBwcm9wZXJ0eSwgdGhlIGRpc3BsYXlcclxuXHQgKiBvYmplY3QgaXMgZGl2aWRlZCBpbnRvIGEgZ3JpZCB3aXRoIG5pbmUgcmVnaW9ucyBiYXNlZCBvbiB0aGVcclxuXHQgKiA8Y29kZT5zY2FsZTlHcmlkPC9jb2RlPiByZWN0YW5nbGUsIHdoaWNoIGRlZmluZXMgdGhlIGNlbnRlciByZWdpb24gb2YgdGhlXHJcblx0ICogZ3JpZC4gVGhlIGVpZ2h0IG90aGVyIHJlZ2lvbnMgb2YgdGhlIGdyaWQgYXJlIHRoZSBmb2xsb3dpbmcgYXJlYXM6IDwvcD5cclxuXHQgKlxyXG5cdCAqIDx1bD5cclxuXHQgKiAgIDxsaT5UaGUgdXBwZXItbGVmdCBjb3JuZXIgb3V0c2lkZSBvZiB0aGUgcmVjdGFuZ2xlPC9saT5cclxuXHQgKiAgIDxsaT5UaGUgYXJlYSBhYm92ZSB0aGUgcmVjdGFuZ2xlIDwvbGk+XHJcblx0ICogICA8bGk+VGhlIHVwcGVyLXJpZ2h0IGNvcm5lciBvdXRzaWRlIG9mIHRoZSByZWN0YW5nbGU8L2xpPlxyXG5cdCAqICAgPGxpPlRoZSBhcmVhIHRvIHRoZSBsZWZ0IG9mIHRoZSByZWN0YW5nbGU8L2xpPlxyXG5cdCAqICAgPGxpPlRoZSBhcmVhIHRvIHRoZSByaWdodCBvZiB0aGUgcmVjdGFuZ2xlPC9saT5cclxuXHQgKiAgIDxsaT5UaGUgbG93ZXItbGVmdCBjb3JuZXIgb3V0c2lkZSBvZiB0aGUgcmVjdGFuZ2xlPC9saT5cclxuXHQgKiAgIDxsaT5UaGUgYXJlYSBiZWxvdyB0aGUgcmVjdGFuZ2xlPC9saT5cclxuXHQgKiAgIDxsaT5UaGUgbG93ZXItcmlnaHQgY29ybmVyIG91dHNpZGUgb2YgdGhlIHJlY3RhbmdsZTwvbGk+XHJcblx0ICogPC91bD5cclxuXHQgKlxyXG5cdCAqIDxwPllvdSBjYW4gdGhpbmsgb2YgdGhlIGVpZ2h0IHJlZ2lvbnMgb3V0c2lkZSBvZiB0aGUgY2VudGVyKGRlZmluZWQgYnlcclxuXHQgKiB0aGUgcmVjdGFuZ2xlKSBhcyBiZWluZyBsaWtlIGEgcGljdHVyZSBmcmFtZSB0aGF0IGhhcyBzcGVjaWFsIHJ1bGVzXHJcblx0ICogYXBwbGllZCB0byBpdCB3aGVuIHNjYWxlZC48L3A+XHJcblx0ICpcclxuXHQgKiA8cD5XaGVuIHRoZSA8Y29kZT5zY2FsZTlHcmlkPC9jb2RlPiBwcm9wZXJ0eSBpcyBzZXQgYW5kIGEgZGlzcGxheSBvYmplY3RcclxuXHQgKiBpcyBzY2FsZWQsIGFsbCB0ZXh0IGFuZCBncmFkaWVudHMgYXJlIHNjYWxlZCBub3JtYWxseTsgaG93ZXZlciwgZm9yIG90aGVyXHJcblx0ICogdHlwZXMgb2Ygb2JqZWN0cyB0aGUgZm9sbG93aW5nIHJ1bGVzIGFwcGx5OjwvcD5cclxuXHQgKlxyXG5cdCAqIDx1bD5cclxuXHQgKiAgIDxsaT5Db250ZW50IGluIHRoZSBjZW50ZXIgcmVnaW9uIGlzIHNjYWxlZCBub3JtYWxseS4gPC9saT5cclxuXHQgKiAgIDxsaT5Db250ZW50IGluIHRoZSBjb3JuZXJzIGlzIG5vdCBzY2FsZWQuIDwvbGk+XHJcblx0ICogICA8bGk+Q29udGVudCBpbiB0aGUgdG9wIGFuZCBib3R0b20gcmVnaW9ucyBpcyBzY2FsZWQgaG9yaXpvbnRhbGx5IG9ubHkuXHJcblx0ICogQ29udGVudCBpbiB0aGUgbGVmdCBhbmQgcmlnaHQgcmVnaW9ucyBpcyBzY2FsZWQgdmVydGljYWxseSBvbmx5LjwvbGk+XHJcblx0ICogICA8bGk+QWxsIGZpbGxzKGluY2x1ZGluZyBiaXRtYXBzLCB2aWRlbywgYW5kIGdyYWRpZW50cykgYXJlIHN0cmV0Y2hlZCB0b1xyXG5cdCAqIGZpdCB0aGVpciBzaGFwZXMuPC9saT5cclxuXHQgKiA8L3VsPlxyXG5cdCAqXHJcblx0ICogPHA+SWYgYSBkaXNwbGF5IG9iamVjdCBpcyByb3RhdGVkLCBhbGwgc3Vic2VxdWVudCBzY2FsaW5nIGlzIG5vcm1hbChhbmRcclxuXHQgKiB0aGUgPGNvZGU+c2NhbGU5R3JpZDwvY29kZT4gcHJvcGVydHkgaXMgaWdub3JlZCkuPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+Rm9yIGV4YW1wbGUsIGNvbnNpZGVyIHRoZSBmb2xsb3dpbmcgZGlzcGxheSBvYmplY3QgYW5kIGEgcmVjdGFuZ2xlIHRoYXRcclxuXHQgKiBpcyBhcHBsaWVkIGFzIHRoZSBkaXNwbGF5IG9iamVjdCdzIDxjb2RlPnNjYWxlOUdyaWQ8L2NvZGU+OjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPkEgY29tbW9uIHVzZSBmb3Igc2V0dGluZyA8Y29kZT5zY2FsZTlHcmlkPC9jb2RlPiBpcyB0byBzZXQgdXAgYSBkaXNwbGF5XHJcblx0ICogb2JqZWN0IHRvIGJlIHVzZWQgYXMgYSBjb21wb25lbnQsIGluIHdoaWNoIGVkZ2UgcmVnaW9ucyByZXRhaW4gdGhlIHNhbWVcclxuXHQgKiB3aWR0aCB3aGVuIHRoZSBjb21wb25lbnQgaXMgc2NhbGVkLjwvcD5cclxuXHQgKlxyXG5cdCAqIEB0aHJvd3MgQXJndW1lbnRFcnJvciBJZiB5b3UgcGFzcyBhbiBpbnZhbGlkIGFyZ3VtZW50IHRvIHRoZSBtZXRob2QuXHJcblx0ICovXHJcblx0cHVibGljIHNjYWxlOUdyaWQ6UmVjdGFuZ2xlO1xyXG5cclxuXHQvKipcclxuXHQgKiBJbmRpY2F0ZXMgdGhlIGhvcml6b250YWwgc2NhbGUocGVyY2VudGFnZSkgb2YgdGhlIG9iamVjdCBhcyBhcHBsaWVkIGZyb21cclxuXHQgKiB0aGUgcmVnaXN0cmF0aW9uIHBvaW50LiBUaGUgZGVmYXVsdCByZWdpc3RyYXRpb24gcG9pbnQgaXMoMCwwKS4gMS4wXHJcblx0ICogZXF1YWxzIDEwMCUgc2NhbGUuXHJcblx0ICpcclxuXHQgKiA8cD5TY2FsaW5nIHRoZSBsb2NhbCBjb29yZGluYXRlIHN5c3RlbSBjaGFuZ2VzIHRoZSA8Y29kZT54PC9jb2RlPiBhbmRcclxuXHQgKiA8Y29kZT55PC9jb2RlPiBwcm9wZXJ0eSB2YWx1ZXMsIHdoaWNoIGFyZSBkZWZpbmVkIGluIHdob2xlIHBpeGVscy4gPC9wPlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgc2NhbGVYKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BTY2FsZVg7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHNjYWxlWCh2YWw6bnVtYmVyKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9wU2NhbGVYID09IHZhbClcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX3BTY2FsZVggPSB2YWw7XHJcblxyXG5cdFx0dGhpcy5pbnZhbGlkYXRlU2NhbGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluZGljYXRlcyB0aGUgdmVydGljYWwgc2NhbGUocGVyY2VudGFnZSkgb2YgYW4gb2JqZWN0IGFzIGFwcGxpZWQgZnJvbSB0aGVcclxuXHQgKiByZWdpc3RyYXRpb24gcG9pbnQgb2YgdGhlIG9iamVjdC4gVGhlIGRlZmF1bHQgcmVnaXN0cmF0aW9uIHBvaW50IGlzKDAsMCkuXHJcblx0ICogMS4wIGlzIDEwMCUgc2NhbGUuXHJcblx0ICpcclxuXHQgKiA8cD5TY2FsaW5nIHRoZSBsb2NhbCBjb29yZGluYXRlIHN5c3RlbSBjaGFuZ2VzIHRoZSA8Y29kZT54PC9jb2RlPiBhbmRcclxuXHQgKiA8Y29kZT55PC9jb2RlPiBwcm9wZXJ0eSB2YWx1ZXMsIHdoaWNoIGFyZSBkZWZpbmVkIGluIHdob2xlIHBpeGVscy4gPC9wPlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgc2NhbGVZKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BTY2FsZVk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHNjYWxlWSh2YWw6bnVtYmVyKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9wU2NhbGVZID09IHZhbClcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX3BTY2FsZVkgPSB2YWw7XHJcblxyXG5cdFx0dGhpcy5pbnZhbGlkYXRlU2NhbGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluZGljYXRlcyB0aGUgZGVwdGggc2NhbGUocGVyY2VudGFnZSkgb2YgYW4gb2JqZWN0IGFzIGFwcGxpZWQgZnJvbSB0aGVcclxuXHQgKiByZWdpc3RyYXRpb24gcG9pbnQgb2YgdGhlIG9iamVjdC4gVGhlIGRlZmF1bHQgcmVnaXN0cmF0aW9uIHBvaW50IGlzKDAsMCkuXHJcblx0ICogMS4wIGlzIDEwMCUgc2NhbGUuXHJcblx0ICpcclxuXHQgKiA8cD5TY2FsaW5nIHRoZSBsb2NhbCBjb29yZGluYXRlIHN5c3RlbSBjaGFuZ2VzIHRoZSA8Y29kZT54PC9jb2RlPixcclxuXHQgKiA8Y29kZT55PC9jb2RlPiBhbmQgPGNvZGU+ejwvY29kZT4gcHJvcGVydHkgdmFsdWVzLCB3aGljaCBhcmUgZGVmaW5lZCBpblxyXG5cdCAqIHdob2xlIHBpeGVscy4gPC9wPlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgc2NhbGVaKCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BTY2FsZVo7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHNjYWxlWih2YWw6bnVtYmVyKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9wU2NhbGVaID09IHZhbClcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX3BTY2FsZVogPSB2YWw7XHJcblxyXG5cdFx0dGhpcy5pbnZhbGlkYXRlU2NhbGUoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCBzY2VuZSgpOlNjZW5lXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BTY2VuZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGdldCBzY2VuZVBvc2l0aW9uKCk6VmVjdG9yM0RcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fc2NlbmVQb3NpdGlvbkRpcnR5KSB7XHJcblx0XHRcdGlmICghdGhpcy5fcGl2b3RaZXJvICYmIHRoaXMuYWxpZ25tZW50TW9kZSA9PSBBbGlnbm1lbnRNb2RlLlBJVk9UX1BPSU5UKSB7XHJcblx0XHRcdFx0dmFyIHBpdm90U2NhbGU6VmVjdG9yM0QgPSBuZXcgVmVjdG9yM0QodGhpcy5fcGl2b3QueC90aGlzLl9wU2NhbGVYLCB0aGlzLl9waXZvdC55L3RoaXMuX3BTY2FsZVksIHRoaXMuX3Bpdm90LnovdGhpcy5fcFNjYWxlWilcclxuXHRcdFx0XHRcdHRoaXMuX3NjZW5lUG9zaXRpb24gPSB0aGlzLnNjZW5lVHJhbnNmb3JtLnRyYW5zZm9ybVZlY3RvcihwaXZvdFNjYWxlKTtcclxuXHRcdFx0XHQvL3RoaXMuX3NjZW5lUG9zaXRpb24uZGVjcmVtZW50QnkobmV3IFZlY3RvcjNEKHRoaXMuX3Bpdm90LngqdGhpcy5fcFNjYWxlWCwgdGhpcy5fcGl2b3QueSp0aGlzLl9wU2NhbGVZLCB0aGlzLl9waXZvdC56KnRoaXMuX3BTY2FsZVopKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLnNjZW5lVHJhbnNmb3JtLmNvcHlDb2x1bW5UbygzLCB0aGlzLl9zY2VuZVBvc2l0aW9uKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5fc2NlbmVQb3NpdGlvbkRpcnR5ID0gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcy5fc2NlbmVQb3NpdGlvbjtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXQgc2NlbmVUcmFuc2Zvcm0oKTpNYXRyaXgzRFxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9wU2NlbmVUcmFuc2Zvcm1EaXJ0eSlcclxuXHRcdFx0dGhpcy5wVXBkYXRlU2NlbmVUcmFuc2Zvcm0oKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fcFNjZW5lVHJhbnNmb3JtO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIHNjcm9sbCByZWN0YW5nbGUgYm91bmRzIG9mIHRoZSBkaXNwbGF5IG9iamVjdC4gVGhlIGRpc3BsYXkgb2JqZWN0IGlzXHJcblx0ICogY3JvcHBlZCB0byB0aGUgc2l6ZSBkZWZpbmVkIGJ5IHRoZSByZWN0YW5nbGUsIGFuZCBpdCBzY3JvbGxzIHdpdGhpbiB0aGVcclxuXHQgKiByZWN0YW5nbGUgd2hlbiB5b3UgY2hhbmdlIHRoZSA8Y29kZT54PC9jb2RlPiBhbmQgPGNvZGU+eTwvY29kZT4gcHJvcGVydGllc1xyXG5cdCAqIG9mIHRoZSA8Y29kZT5zY3JvbGxSZWN0PC9jb2RlPiBvYmplY3QuXHJcblx0ICpcclxuXHQgKiA8cD5UaGUgcHJvcGVydGllcyBvZiB0aGUgPGNvZGU+c2Nyb2xsUmVjdDwvY29kZT4gUmVjdGFuZ2xlIG9iamVjdCB1c2UgdGhlXHJcblx0ICogZGlzcGxheSBvYmplY3QncyBjb29yZGluYXRlIHNwYWNlIGFuZCBhcmUgc2NhbGVkIGp1c3QgbGlrZSB0aGUgb3ZlcmFsbFxyXG5cdCAqIGRpc3BsYXkgb2JqZWN0LiBUaGUgY29ybmVyIGJvdW5kcyBvZiB0aGUgY3JvcHBlZCB3aW5kb3cgb24gdGhlIHNjcm9sbGluZ1xyXG5cdCAqIGRpc3BsYXkgb2JqZWN0IGFyZSB0aGUgb3JpZ2luIG9mIHRoZSBkaXNwbGF5IG9iamVjdCgwLDApIGFuZCB0aGUgcG9pbnRcclxuXHQgKiBkZWZpbmVkIGJ5IHRoZSB3aWR0aCBhbmQgaGVpZ2h0IG9mIHRoZSByZWN0YW5nbGUuIFRoZXkgYXJlIG5vdCBjZW50ZXJlZFxyXG5cdCAqIGFyb3VuZCB0aGUgb3JpZ2luLCBidXQgdXNlIHRoZSBvcmlnaW4gdG8gZGVmaW5lIHRoZSB1cHBlci1sZWZ0IGNvcm5lciBvZlxyXG5cdCAqIHRoZSBhcmVhLiBBIHNjcm9sbGVkIGRpc3BsYXkgb2JqZWN0IGFsd2F5cyBzY3JvbGxzIGluIHdob2xlIHBpeGVsXHJcblx0ICogaW5jcmVtZW50cy4gPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+WW91IGNhbiBzY3JvbGwgYW4gb2JqZWN0IGxlZnQgYW5kIHJpZ2h0IGJ5IHNldHRpbmcgdGhlIDxjb2RlPng8L2NvZGU+XHJcblx0ICogcHJvcGVydHkgb2YgdGhlIDxjb2RlPnNjcm9sbFJlY3Q8L2NvZGU+IFJlY3RhbmdsZSBvYmplY3QuIFlvdSBjYW4gc2Nyb2xsXHJcblx0ICogYW4gb2JqZWN0IHVwIGFuZCBkb3duIGJ5IHNldHRpbmcgdGhlIDxjb2RlPnk8L2NvZGU+IHByb3BlcnR5IG9mIHRoZVxyXG5cdCAqIDxjb2RlPnNjcm9sbFJlY3Q8L2NvZGU+IFJlY3RhbmdsZSBvYmplY3QuIElmIHRoZSBkaXNwbGF5IG9iamVjdCBpcyByb3RhdGVkXHJcblx0ICogOTDCsCBhbmQgeW91IHNjcm9sbCBpdCBsZWZ0IGFuZCByaWdodCwgdGhlIGRpc3BsYXkgb2JqZWN0IGFjdHVhbGx5IHNjcm9sbHNcclxuXHQgKiB1cCBhbmQgZG93bi48L3A+XHJcblx0ICovXHJcblx0cHVibGljIHNjcm9sbFJlY3Q6UmVjdGFuZ2xlO1xyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgc2hhZGVyUGlja2luZ0RldGFpbHMoKTpib29sZWFuXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3NoYWRlclBpY2tpbmdEZXRhaWxzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGRlYnVnVmlzaWJsZSgpOmJvb2xlYW5cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fZGVidWdWaXNpYmxlO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBkZWJ1Z1Zpc2libGUodmFsdWU6Ym9vbGVhbilcclxuXHR7XHJcblx0XHRpZiAodmFsdWUgPT0gdGhpcy5fZGVidWdWaXNpYmxlKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fZGVidWdWaXNpYmxlID0gdmFsdWU7XHJcblxyXG5cdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9lbnRpdHlOb2Rlcy5sZW5ndGg7XHJcblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBsZW47IGkrKylcclxuXHRcdFx0dGhpcy5fZW50aXR5Tm9kZXNbaV0uZGVidWdWaXNpYmxlID0gdGhpcy5fZGVidWdWaXNpYmxlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQW4gb2JqZWN0IHdpdGggcHJvcGVydGllcyBwZXJ0YWluaW5nIHRvIGEgZGlzcGxheSBvYmplY3QncyBtYXRyaXgsIGNvbG9yXHJcblx0ICogdHJhbnNmb3JtLCBhbmQgcGl4ZWwgYm91bmRzLiBUaGUgc3BlY2lmaWMgcHJvcGVydGllcyAgLSAgbWF0cml4LFxyXG5cdCAqIGNvbG9yVHJhbnNmb3JtLCBhbmQgdGhyZWUgcmVhZC1vbmx5IHByb3BlcnRpZXNcclxuXHQgKiAoPGNvZGU+Y29uY2F0ZW5hdGVkTWF0cml4PC9jb2RlPiwgPGNvZGU+Y29uY2F0ZW5hdGVkQ29sb3JUcmFuc2Zvcm08L2NvZGU+LFxyXG5cdCAqIGFuZCA8Y29kZT5waXhlbEJvdW5kczwvY29kZT4pICAtICBhcmUgZGVzY3JpYmVkIGluIHRoZSBlbnRyeSBmb3IgdGhlXHJcblx0ICogVHJhbnNmb3JtIGNsYXNzLlxyXG5cdCAqXHJcblx0ICogPHA+RWFjaCBvZiB0aGUgdHJhbnNmb3JtIG9iamVjdCdzIHByb3BlcnRpZXMgaXMgaXRzZWxmIGFuIG9iamVjdC4gVGhpc1xyXG5cdCAqIGNvbmNlcHQgaXMgaW1wb3J0YW50IGJlY2F1c2UgdGhlIG9ubHkgd2F5IHRvIHNldCBuZXcgdmFsdWVzIGZvciB0aGUgbWF0cml4XHJcblx0ICogb3IgY29sb3JUcmFuc2Zvcm0gb2JqZWN0cyBpcyB0byBjcmVhdGUgYSBuZXcgb2JqZWN0IGFuZCBjb3B5IHRoYXQgb2JqZWN0XHJcblx0ICogaW50byB0aGUgdHJhbnNmb3JtLm1hdHJpeCBvciB0cmFuc2Zvcm0uY29sb3JUcmFuc2Zvcm0gcHJvcGVydHkuPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+Rm9yIGV4YW1wbGUsIHRvIGluY3JlYXNlIHRoZSA8Y29kZT50eDwvY29kZT4gdmFsdWUgb2YgYSBkaXNwbGF5XHJcblx0ICogb2JqZWN0J3MgbWF0cml4LCB5b3UgbXVzdCBtYWtlIGEgY29weSBvZiB0aGUgZW50aXJlIG1hdHJpeCBvYmplY3QsIHRoZW5cclxuXHQgKiBjb3B5IHRoZSBuZXcgb2JqZWN0IGludG8gdGhlIG1hdHJpeCBwcm9wZXJ0eSBvZiB0aGUgdHJhbnNmb3JtIG9iamVjdDo8L3A+XHJcblx0ICogPHByZSB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiPjxjb2RlPiBwdWJsaWMgbXlNYXRyaXg6TWF0cml4ID1cclxuXHQgKiBteURpc3BsYXlPYmplY3QudHJhbnNmb3JtLm1hdHJpeDsgbXlNYXRyaXgudHggKz0gMTA7XHJcblx0ICogbXlEaXNwbGF5T2JqZWN0LnRyYW5zZm9ybS5tYXRyaXggPSBteU1hdHJpeDsgPC9jb2RlPjwvcHJlPlxyXG5cdCAqXHJcblx0ICogPHA+WW91IGNhbm5vdCBkaXJlY3RseSBzZXQgdGhlIDxjb2RlPnR4PC9jb2RlPiBwcm9wZXJ0eS4gVGhlIGZvbGxvd2luZ1xyXG5cdCAqIGNvZGUgaGFzIG5vIGVmZmVjdCBvbiA8Y29kZT5teURpc3BsYXlPYmplY3Q8L2NvZGU+OiA8L3A+XHJcblx0ICogPHByZSB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiPjxjb2RlPiBteURpc3BsYXlPYmplY3QudHJhbnNmb3JtLm1hdHJpeC50eCArPVxyXG5cdCAqIDEwOyA8L2NvZGU+PC9wcmU+XHJcblx0ICpcclxuXHQgKiA8cD5Zb3UgY2FuIGFsc28gY29weSBhbiBlbnRpcmUgdHJhbnNmb3JtIG9iamVjdCBhbmQgYXNzaWduIGl0IHRvIGFub3RoZXJcclxuXHQgKiBkaXNwbGF5IG9iamVjdCdzIHRyYW5zZm9ybSBwcm9wZXJ0eS4gRm9yIGV4YW1wbGUsIHRoZSBmb2xsb3dpbmcgY29kZVxyXG5cdCAqIGNvcGllcyB0aGUgZW50aXJlIHRyYW5zZm9ybSBvYmplY3QgZnJvbSA8Y29kZT5teU9sZERpc3BsYXlPYmo8L2NvZGU+IHRvXHJcblx0ICogPGNvZGU+bXlOZXdEaXNwbGF5T2JqPC9jb2RlPjo8L3A+XHJcblx0ICogPGNvZGU+bXlOZXdEaXNwbGF5T2JqLnRyYW5zZm9ybSA9IG15T2xkRGlzcGxheU9iai50cmFuc2Zvcm07PC9jb2RlPlxyXG5cdCAqXHJcblx0ICogPHA+VGhlIHJlc3VsdGluZyBkaXNwbGF5IG9iamVjdCwgPGNvZGU+bXlOZXdEaXNwbGF5T2JqPC9jb2RlPiwgbm93IGhhcyB0aGVcclxuXHQgKiBzYW1lIHZhbHVlcyBmb3IgaXRzIG1hdHJpeCwgY29sb3IgdHJhbnNmb3JtLCBhbmQgcGl4ZWwgYm91bmRzIGFzIHRoZSBvbGRcclxuXHQgKiBkaXNwbGF5IG9iamVjdCwgPGNvZGU+bXlPbGREaXNwbGF5T2JqPC9jb2RlPi48L3A+XHJcblx0ICpcclxuXHQgKiA8cD5Ob3RlIHRoYXQgQUlSIGZvciBUViBkZXZpY2VzIHVzZSBoYXJkd2FyZSBhY2NlbGVyYXRpb24sIGlmIGl0IGlzXHJcblx0ICogYXZhaWxhYmxlLCBmb3IgY29sb3IgdHJhbnNmb3Jtcy48L3A+XHJcblx0ICovXHJcblx0cHVibGljIGdldCB0cmFuc2Zvcm0oKTpUcmFuc2Zvcm1cclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5fdHJhbnNmb3JtO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogV2hldGhlciBvciBub3QgdGhlIGRpc3BsYXkgb2JqZWN0IGlzIHZpc2libGUuIERpc3BsYXkgb2JqZWN0cyB0aGF0IGFyZSBub3RcclxuXHQgKiB2aXNpYmxlIGFyZSBkaXNhYmxlZC4gRm9yIGV4YW1wbGUsIGlmIDxjb2RlPnZpc2libGU9ZmFsc2U8L2NvZGU+IGZvciBhblxyXG5cdCAqIEludGVyYWN0aXZlT2JqZWN0IGluc3RhbmNlLCBpdCBjYW5ub3QgYmUgY2xpY2tlZC5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHZpc2libGUoKTpib29sZWFuXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2V4cGxpY2l0VmlzaWJpbGl0eTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgdmlzaWJsZSh2YWx1ZTpib29sZWFuKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9leHBsaWNpdFZpc2liaWxpdHkgPT0gdmFsdWUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9leHBsaWNpdFZpc2liaWxpdHkgPSB2YWx1ZTtcclxuXHJcblx0XHR0aGlzLl9wVXBkYXRlSW1wbGljaXRWaXNpYmlsaXR5KHRoaXMuX3BQYXJlbnQ/IHRoaXMuX3BQYXJlbnQuX2lJc1Zpc2libGUoKSA6IHRydWUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSW5kaWNhdGVzIHRoZSB3aWR0aCBvZiB0aGUgZGlzcGxheSBvYmplY3QsIGluIHBpeGVscy4gVGhlIHdpZHRoIGlzXHJcblx0ICogY2FsY3VsYXRlZCBiYXNlZCBvbiB0aGUgYm91bmRzIG9mIHRoZSBjb250ZW50IG9mIHRoZSBkaXNwbGF5IG9iamVjdC4gV2hlblxyXG5cdCAqIHlvdSBzZXQgdGhlIDxjb2RlPndpZHRoPC9jb2RlPiBwcm9wZXJ0eSwgdGhlIDxjb2RlPnNjYWxlWDwvY29kZT4gcHJvcGVydHlcclxuXHQgKiBpcyBhZGp1c3RlZCBhY2NvcmRpbmdseSwgYXMgc2hvd24gaW4gdGhlIGZvbGxvd2luZyBjb2RlOlxyXG5cdCAqXHJcblx0ICogPHA+RXhjZXB0IGZvciBUZXh0RmllbGQgYW5kIFZpZGVvIG9iamVjdHMsIGEgZGlzcGxheSBvYmplY3Qgd2l0aCBub1xyXG5cdCAqIGNvbnRlbnQoc3VjaCBhcyBhbiBlbXB0eSBzcHJpdGUpIGhhcyBhIHdpZHRoIG9mIDAsIGV2ZW4gaWYgeW91IHRyeSB0byBzZXRcclxuXHQgKiA8Y29kZT53aWR0aDwvY29kZT4gdG8gYSBkaWZmZXJlbnQgdmFsdWUuPC9wPlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgd2lkdGgoKTpudW1iZXJcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fYm94Qm91bmRzSW52YWxpZClcclxuXHRcdFx0dGhpcy5fcFVwZGF0ZUJveEJvdW5kcygpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLl9wQm94Qm91bmRzLndpZHRoKnRoaXMuX3BTY2FsZVg7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHdpZHRoKHZhbDpudW1iZXIpXHJcblx0e1xyXG5cdFx0dmFyIHNjYWxlWDpudW1iZXIgPSB2YWwvdGhpcy5nZXRCb3goKS53aWR0aDtcclxuXHJcblx0XHRpZiAodGhpcy5fcFNjYWxlWCA9PSBzY2FsZVgpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9wU2NhbGVYID0gc2NhbGVYO1xyXG5cclxuXHRcdHRoaXMuaW52YWxpZGF0ZVNjYWxlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJbmRpY2F0ZXMgdGhlIDxpPng8L2k+IGNvb3JkaW5hdGUgb2YgdGhlIERpc3BsYXlPYmplY3QgaW5zdGFuY2UgcmVsYXRpdmVcclxuXHQgKiB0byB0aGUgbG9jYWwgY29vcmRpbmF0ZXMgb2YgdGhlIHBhcmVudCBEaXNwbGF5T2JqZWN0Q29udGFpbmVyLiBJZiB0aGVcclxuXHQgKiBvYmplY3QgaXMgaW5zaWRlIGEgRGlzcGxheU9iamVjdENvbnRhaW5lciB0aGF0IGhhcyB0cmFuc2Zvcm1hdGlvbnMsIGl0IGlzXHJcblx0ICogaW4gdGhlIGxvY2FsIGNvb3JkaW5hdGUgc3lzdGVtIG9mIHRoZSBlbmNsb3NpbmcgRGlzcGxheU9iamVjdENvbnRhaW5lci5cclxuXHQgKiBUaHVzLCBmb3IgYSBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIHJvdGF0ZWQgOTDCsCBjb3VudGVyY2xvY2t3aXNlLCB0aGVcclxuXHQgKiBEaXNwbGF5T2JqZWN0Q29udGFpbmVyJ3MgY2hpbGRyZW4gaW5oZXJpdCBhIGNvb3JkaW5hdGUgc3lzdGVtIHRoYXQgaXNcclxuXHQgKiByb3RhdGVkIDkwwrAgY291bnRlcmNsb2Nrd2lzZS4gVGhlIG9iamVjdCdzIGNvb3JkaW5hdGVzIHJlZmVyIHRvIHRoZVxyXG5cdCAqIHJlZ2lzdHJhdGlvbiBwb2ludCBwb3NpdGlvbi5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IHgoKTpudW1iZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5feDtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgeCh2YWw6bnVtYmVyKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl94ID09IHZhbClcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX3ggPSB2YWw7XHJcblxyXG5cdFx0dGhpcy5pbnZhbGlkYXRlUG9zaXRpb24oKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluZGljYXRlcyB0aGUgPGk+eTwvaT4gY29vcmRpbmF0ZSBvZiB0aGUgRGlzcGxheU9iamVjdCBpbnN0YW5jZSByZWxhdGl2ZVxyXG5cdCAqIHRvIHRoZSBsb2NhbCBjb29yZGluYXRlcyBvZiB0aGUgcGFyZW50IERpc3BsYXlPYmplY3RDb250YWluZXIuIElmIHRoZVxyXG5cdCAqIG9iamVjdCBpcyBpbnNpZGUgYSBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIHRoYXQgaGFzIHRyYW5zZm9ybWF0aW9ucywgaXQgaXNcclxuXHQgKiBpbiB0aGUgbG9jYWwgY29vcmRpbmF0ZSBzeXN0ZW0gb2YgdGhlIGVuY2xvc2luZyBEaXNwbGF5T2JqZWN0Q29udGFpbmVyLlxyXG5cdCAqIFRodXMsIGZvciBhIERpc3BsYXlPYmplY3RDb250YWluZXIgcm90YXRlZCA5MMKwIGNvdW50ZXJjbG9ja3dpc2UsIHRoZVxyXG5cdCAqIERpc3BsYXlPYmplY3RDb250YWluZXIncyBjaGlsZHJlbiBpbmhlcml0IGEgY29vcmRpbmF0ZSBzeXN0ZW0gdGhhdCBpc1xyXG5cdCAqIHJvdGF0ZWQgOTDCsCBjb3VudGVyY2xvY2t3aXNlLiBUaGUgb2JqZWN0J3MgY29vcmRpbmF0ZXMgcmVmZXIgdG8gdGhlXHJcblx0ICogcmVnaXN0cmF0aW9uIHBvaW50IHBvc2l0aW9uLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgeSgpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl95O1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCB5KHZhbDpudW1iZXIpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX3kgPT0gdmFsKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5feSA9IHZhbDtcclxuXHJcblx0XHR0aGlzLmludmFsaWRhdGVQb3NpdGlvbigpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSW5kaWNhdGVzIHRoZSB6IGNvb3JkaW5hdGUgcG9zaXRpb24gYWxvbmcgdGhlIHotYXhpcyBvZiB0aGUgRGlzcGxheU9iamVjdFxyXG5cdCAqIGluc3RhbmNlIHJlbGF0aXZlIHRvIHRoZSAzRCBwYXJlbnQgY29udGFpbmVyLiBUaGUgeiBwcm9wZXJ0eSBpcyB1c2VkIGZvclxyXG5cdCAqIDNEIGNvb3JkaW5hdGVzLCBub3Qgc2NyZWVuIG9yIHBpeGVsIGNvb3JkaW5hdGVzLlxyXG5cdCAqXHJcblx0ICogPHA+V2hlbiB5b3Ugc2V0IGEgPGNvZGU+ejwvY29kZT4gcHJvcGVydHkgZm9yIGEgZGlzcGxheSBvYmplY3QgdG9cclxuXHQgKiBzb21ldGhpbmcgb3RoZXIgdGhhbiB0aGUgZGVmYXVsdCB2YWx1ZSBvZiA8Y29kZT4wPC9jb2RlPiwgYSBjb3JyZXNwb25kaW5nXHJcblx0ICogTWF0cml4M0Qgb2JqZWN0IGlzIGF1dG9tYXRpY2FsbHkgY3JlYXRlZC4gZm9yIGFkanVzdGluZyBhIGRpc3BsYXkgb2JqZWN0J3NcclxuXHQgKiBwb3NpdGlvbiBhbmQgb3JpZW50YXRpb24gaW4gdGhyZWUgZGltZW5zaW9ucy4gV2hlbiB3b3JraW5nIHdpdGggdGhlXHJcblx0ICogei1heGlzLCB0aGUgZXhpc3RpbmcgYmVoYXZpb3Igb2YgeCBhbmQgeSBwcm9wZXJ0aWVzIGNoYW5nZXMgZnJvbSBzY3JlZW4gb3JcclxuXHQgKiBwaXhlbCBjb29yZGluYXRlcyB0byBwb3NpdGlvbnMgcmVsYXRpdmUgdG8gdGhlIDNEIHBhcmVudCBjb250YWluZXIuPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+Rm9yIGV4YW1wbGUsIGEgY2hpbGQgb2YgdGhlIDxjb2RlPl9yb290PC9jb2RlPiBhdCBwb3NpdGlvbiB4ID0gMTAwLCB5ID1cclxuXHQgKiAxMDAsIHogPSAyMDAgaXMgbm90IGRyYXduIGF0IHBpeGVsIGxvY2F0aW9uKDEwMCwxMDApLiBUaGUgY2hpbGQgaXMgZHJhd25cclxuXHQgKiB3aGVyZXZlciB0aGUgM0QgcHJvamVjdGlvbiBjYWxjdWxhdGlvbiBwdXRzIGl0LiBUaGUgY2FsY3VsYXRpb24gaXM6PC9wPlxyXG5cdCAqXHJcblx0ICogPHA+PGNvZGU+KHh+fmNhbWVyYUZvY2FsTGVuZ3RoL2NhbWVyYVJlbGF0aXZlWlBvc2l0aW9uLFxyXG5cdCAqIHl+fmNhbWVyYUZvY2FsTGVuZ3RoL2NhbWVyYVJlbGF0aXZlWlBvc2l0aW9uKTwvY29kZT48L3A+XHJcblx0ICovXHJcblx0cHVibGljIGdldCB6KCk6bnVtYmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3o7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHoodmFsOm51bWJlcilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5feiA9PSB2YWwpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl96ID0gdmFsO1xyXG5cclxuXHRcdHRoaXMuaW52YWxpZGF0ZVBvc2l0aW9uKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQgek9mZnNldCgpOm51bWJlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl96T2Zmc2V0O1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCB6T2Zmc2V0KHZhbHVlOm51bWJlcilcclxuXHR7XHJcblx0XHR0aGlzLl96T2Zmc2V0ID0gdmFsdWU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGEgbmV3IDxjb2RlPkRpc3BsYXlPYmplY3Q8L2NvZGU+IGluc3RhbmNlLlxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKClcclxuXHR7XHJcblx0XHRzdXBlcigpO1xyXG5cclxuXHRcdC8vIENhY2hlZCB2ZWN0b3Igb2YgdHJhbnNmb3JtYXRpb24gY29tcG9uZW50cyB1c2VkIHdoZW5cclxuXHRcdC8vIHJlY29tcG9zaW5nIHRoZSB0cmFuc2Zvcm0gbWF0cml4IGluIHVwZGF0ZVRyYW5zZm9ybSgpXHJcblxyXG5cdFx0dGhpcy5fdHJhbnNmb3JtQ29tcG9uZW50cyA9IG5ldyBBcnJheTxWZWN0b3IzRD4oMyk7XHJcblxyXG5cdFx0dGhpcy5fdHJhbnNmb3JtQ29tcG9uZW50c1swXSA9IHRoaXMuX3BvcztcclxuXHRcdHRoaXMuX3RyYW5zZm9ybUNvbXBvbmVudHNbMV0gPSB0aGlzLl9yb3Q7XHJcblx0XHR0aGlzLl90cmFuc2Zvcm1Db21wb25lbnRzWzJdID0gdGhpcy5fc2NhO1xyXG5cclxuXHRcdC8vY3JlYXRpb24gb2YgYXNzb2NpYXRlZCB0cmFuc2Zvcm0gb2JqZWN0XHJcblx0XHR0aGlzLl90cmFuc2Zvcm0gPSBuZXcgVHJhbnNmb3JtKHRoaXMpO1xyXG5cclxuXHRcdHRoaXMuX21hdHJpeDNELmlkZW50aXR5KCk7XHJcblxyXG5cdFx0dGhpcy5fZmxpcFkuYXBwZW5kU2NhbGUoMSwgLTEsIDEpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgYWRkRXZlbnRMaXN0ZW5lcih0eXBlOnN0cmluZywgbGlzdGVuZXI6RnVuY3Rpb24pXHJcblx0e1xyXG5cdFx0c3VwZXIuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcik7XHJcblxyXG5cdFx0c3dpdGNoICh0eXBlKSB7XHJcblx0XHRcdGNhc2UgRGlzcGxheU9iamVjdEV2ZW50LlBPU0lUSU9OX0NIQU5HRUQ6XHJcblx0XHRcdFx0dGhpcy5fbGlzdGVuVG9Qb3NpdGlvbkNoYW5nZWQgPSB0cnVlO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIERpc3BsYXlPYmplY3RFdmVudC5ST1RBVElPTl9DSEFOR0VEOlxyXG5cdFx0XHRcdHRoaXMuX2xpc3RlblRvUm90YXRpb25DaGFuZ2VkID0gdHJ1ZTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSBEaXNwbGF5T2JqZWN0RXZlbnQuU0NBTEVfQ0hBTkdFRDpcclxuXHRcdFx0XHR0aGlzLl9saXN0ZW5Ub1NjYWxlQ2hhbmdlZCA9IHRydWU7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgRGlzcGxheU9iamVjdEV2ZW50LlNDRU5FX0NIQU5HRUQ6XHJcblx0XHRcdFx0dGhpcy5fbGlzdGVuVG9TY2VuZUNoYW5nZWQgPSB0cnVlO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIERpc3BsYXlPYmplY3RFdmVudC5TQ0VORVRSQU5TRk9STV9DSEFOR0VEOlxyXG5cdFx0XHRcdHRoaXMuX2xpc3RlblRvU2NlbmVUcmFuc2Zvcm1DaGFuZ2VkID0gdHJ1ZTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICovXHJcblx0cHVibGljIGNsb25lKCk6RGlzcGxheU9iamVjdFxyXG5cdHtcclxuXHRcdHZhciBjbG9uZTpEaXNwbGF5T2JqZWN0ID0gbmV3IERpc3BsYXlPYmplY3QoKTtcclxuXHRcdGNsb25lLnBpdm90ID0gdGhpcy5waXZvdDtcclxuXHRcdGNsb25lLl9pTWF0cml4M0QgPSB0aGlzLl9pTWF0cml4M0Q7XHJcblx0XHRjbG9uZS5uYW1lID0gbmFtZTtcclxuXHJcblx0XHQvLyB0b2RvOiBpbXBsZW1lbnQgZm9yIGFsbCBzdWJ0eXBlc1xyXG5cdFx0cmV0dXJuIGNsb25lO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZGlzcG9zZSgpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMucGFyZW50KVxyXG5cdFx0XHR0aGlzLnBhcmVudC5yZW1vdmVDaGlsZCh0aGlzKTtcclxuXHJcblx0XHR3aGlsZSAodGhpcy5fcFJlbmRlcmFibGVzLmxlbmd0aClcclxuXHRcdFx0dGhpcy5fcFJlbmRlcmFibGVzWzBdLmRpc3Bvc2UoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBpbmhlcml0RG9jXHJcblx0ICovXHJcblx0cHVibGljIGRpc3Bvc2VBc3NldCgpXHJcblx0e1xyXG5cdFx0dGhpcy5kaXNwb3NlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIGEgcmVjdGFuZ2xlIHRoYXQgZGVmaW5lcyB0aGUgYXJlYSBvZiB0aGUgZGlzcGxheSBvYmplY3QgcmVsYXRpdmVcclxuXHQgKiB0byB0aGUgY29vcmRpbmF0ZSBzeXN0ZW0gb2YgdGhlIDxjb2RlPnRhcmdldENvb3JkaW5hdGVTcGFjZTwvY29kZT4gb2JqZWN0LlxyXG5cdCAqIENvbnNpZGVyIHRoZSBmb2xsb3dpbmcgY29kZSwgd2hpY2ggc2hvd3MgaG93IHRoZSByZWN0YW5nbGUgcmV0dXJuZWQgY2FuXHJcblx0ICogdmFyeSBkZXBlbmRpbmcgb24gdGhlIDxjb2RlPnRhcmdldENvb3JkaW5hdGVTcGFjZTwvY29kZT4gcGFyYW1ldGVyIHRoYXRcclxuXHQgKiB5b3UgcGFzcyB0byB0aGUgbWV0aG9kOlxyXG5cdCAqXHJcblx0ICogPHA+PGI+Tm90ZTo8L2I+IFVzZSB0aGUgPGNvZGU+bG9jYWxUb0dsb2JhbCgpPC9jb2RlPiBhbmRcclxuXHQgKiA8Y29kZT5nbG9iYWxUb0xvY2FsKCk8L2NvZGU+IG1ldGhvZHMgdG8gY29udmVydCB0aGUgZGlzcGxheSBvYmplY3QncyBsb2NhbFxyXG5cdCAqIGNvb3JkaW5hdGVzIHRvIGRpc3BsYXkgY29vcmRpbmF0ZXMsIG9yIGRpc3BsYXkgY29vcmRpbmF0ZXMgdG8gbG9jYWxcclxuXHQgKiBjb29yZGluYXRlcywgcmVzcGVjdGl2ZWx5LjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPlRoZSA8Y29kZT5nZXRCb3VuZHMoKTwvY29kZT4gbWV0aG9kIGlzIHNpbWlsYXIgdG8gdGhlXHJcblx0ICogPGNvZGU+Z2V0UmVjdCgpPC9jb2RlPiBtZXRob2Q7IGhvd2V2ZXIsIHRoZSBSZWN0YW5nbGUgcmV0dXJuZWQgYnkgdGhlXHJcblx0ICogPGNvZGU+Z2V0Qm91bmRzKCk8L2NvZGU+IG1ldGhvZCBpbmNsdWRlcyBhbnkgc3Ryb2tlcyBvbiBzaGFwZXMsIHdoZXJlYXNcclxuXHQgKiB0aGUgUmVjdGFuZ2xlIHJldHVybmVkIGJ5IHRoZSA8Y29kZT5nZXRSZWN0KCk8L2NvZGU+IG1ldGhvZCBkb2VzIG5vdC4gRm9yXHJcblx0ICogYW4gZXhhbXBsZSwgc2VlIHRoZSBkZXNjcmlwdGlvbiBvZiB0aGUgPGNvZGU+Z2V0UmVjdCgpPC9jb2RlPiBtZXRob2QuPC9wPlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHRhcmdldENvb3JkaW5hdGVTcGFjZSBUaGUgZGlzcGxheSBvYmplY3QgdGhhdCBkZWZpbmVzIHRoZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29vcmRpbmF0ZSBzeXN0ZW0gdG8gdXNlLlxyXG5cdCAqIEByZXR1cm4gVGhlIHJlY3RhbmdsZSB0aGF0IGRlZmluZXMgdGhlIGFyZWEgb2YgdGhlIGRpc3BsYXkgb2JqZWN0IHJlbGF0aXZlXHJcblx0ICogICAgICAgICB0byB0aGUgPGNvZGU+dGFyZ2V0Q29vcmRpbmF0ZVNwYWNlPC9jb2RlPiBvYmplY3QncyBjb29yZGluYXRlXHJcblx0ICogICAgICAgICBzeXN0ZW0uXHJcblx0ICovXHJcblx0cHVibGljIGdldEJvdW5kcyh0YXJnZXRDb29yZGluYXRlU3BhY2U6RGlzcGxheU9iamVjdCk6UmVjdGFuZ2xlXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2JvdW5kczsgLy9UT0RPXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIGEgcmVjdGFuZ2xlIHRoYXQgZGVmaW5lcyB0aGUgYm91bmRhcnkgb2YgdGhlIGRpc3BsYXkgb2JqZWN0LCBiYXNlZFxyXG5cdCAqIG9uIHRoZSBjb29yZGluYXRlIHN5c3RlbSBkZWZpbmVkIGJ5IHRoZSA8Y29kZT50YXJnZXRDb29yZGluYXRlU3BhY2U8L2NvZGU+XHJcblx0ICogcGFyYW1ldGVyLCBleGNsdWRpbmcgYW55IHN0cm9rZXMgb24gc2hhcGVzLiBUaGUgdmFsdWVzIHRoYXQgdGhlXHJcblx0ICogPGNvZGU+Z2V0UmVjdCgpPC9jb2RlPiBtZXRob2QgcmV0dXJucyBhcmUgdGhlIHNhbWUgb3Igc21hbGxlciB0aGFuIHRob3NlXHJcblx0ICogcmV0dXJuZWQgYnkgdGhlIDxjb2RlPmdldEJvdW5kcygpPC9jb2RlPiBtZXRob2QuXHJcblx0ICpcclxuXHQgKiA8cD48Yj5Ob3RlOjwvYj4gVXNlIDxjb2RlPmxvY2FsVG9HbG9iYWwoKTwvY29kZT4gYW5kXHJcblx0ICogPGNvZGU+Z2xvYmFsVG9Mb2NhbCgpPC9jb2RlPiBtZXRob2RzIHRvIGNvbnZlcnQgdGhlIGRpc3BsYXkgb2JqZWN0J3MgbG9jYWxcclxuXHQgKiBjb29yZGluYXRlcyB0byBTY2VuZSBjb29yZGluYXRlcywgb3IgU2NlbmUgY29vcmRpbmF0ZXMgdG8gbG9jYWxcclxuXHQgKiBjb29yZGluYXRlcywgcmVzcGVjdGl2ZWx5LjwvcD5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB0YXJnZXRDb29yZGluYXRlU3BhY2UgVGhlIGRpc3BsYXkgb2JqZWN0IHRoYXQgZGVmaW5lcyB0aGVcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvb3JkaW5hdGUgc3lzdGVtIHRvIHVzZS5cclxuXHQgKiBAcmV0dXJuIFRoZSByZWN0YW5nbGUgdGhhdCBkZWZpbmVzIHRoZSBhcmVhIG9mIHRoZSBkaXNwbGF5IG9iamVjdCByZWxhdGl2ZVxyXG5cdCAqICAgICAgICAgdG8gdGhlIDxjb2RlPnRhcmdldENvb3JkaW5hdGVTcGFjZTwvY29kZT4gb2JqZWN0J3MgY29vcmRpbmF0ZVxyXG5cdCAqICAgICAgICAgc3lzdGVtLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXRSZWN0KHRhcmdldENvb3JkaW5hdGVTcGFjZTpEaXNwbGF5T2JqZWN0ID0gbnVsbCk6UmVjdGFuZ2xlXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX2JvdW5kczsgLy9UT0RPXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0Qm94KHRhcmdldENvb3JkaW5hdGVTcGFjZTpEaXNwbGF5T2JqZWN0ID0gbnVsbCk6Qm94XHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX2lTb3VyY2VQcmVmYWIpXHJcblx0XHRcdHRoaXMuX2lTb3VyY2VQcmVmYWIuX2lWYWxpZGF0ZSgpO1xyXG5cclxuXHRcdC8vVE9ETyB0YXJnZXRDb29yZGluYXRlU3BhY2VcclxuXHRcdGlmICh0aGlzLl9ib3hCb3VuZHNJbnZhbGlkKVxyXG5cdFx0XHR0aGlzLl9wVXBkYXRlQm94Qm91bmRzKCk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX3BCb3hCb3VuZHM7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0U3BoZXJlKHRhcmdldENvb3JkaW5hdGVTcGFjZTpEaXNwbGF5T2JqZWN0ID0gbnVsbCk6U3BoZXJlXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX2lTb3VyY2VQcmVmYWIpXHJcblx0XHRcdHRoaXMuX2lTb3VyY2VQcmVmYWIuX2lWYWxpZGF0ZSgpO1xyXG5cclxuXHRcdGlmICh0aGlzLl9zcGhlcmVCb3VuZHNJbnZhbGlkKVxyXG5cdFx0XHR0aGlzLl9wVXBkYXRlU3BoZXJlQm91bmRzKCk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX3BTcGhlcmVCb3VuZHM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDb252ZXJ0cyB0aGUgPGNvZGU+cG9pbnQ8L2NvZGU+IG9iamVjdCBmcm9tIHRoZSBTY2VuZShnbG9iYWwpIGNvb3JkaW5hdGVzXHJcblx0ICogdG8gdGhlIGRpc3BsYXkgb2JqZWN0J3MobG9jYWwpIGNvb3JkaW5hdGVzLlxyXG5cdCAqXHJcblx0ICogPHA+VG8gdXNlIHRoaXMgbWV0aG9kLCBmaXJzdCBjcmVhdGUgYW4gaW5zdGFuY2Ugb2YgdGhlIFBvaW50IGNsYXNzLiBUaGVcclxuXHQgKiA8aT54PC9pPiBhbmQgPGk+eTwvaT4gdmFsdWVzIHRoYXQgeW91IGFzc2lnbiByZXByZXNlbnQgZ2xvYmFsIGNvb3JkaW5hdGVzXHJcblx0ICogYmVjYXVzZSB0aGV5IHJlbGF0ZSB0byB0aGUgb3JpZ2luKDAsMCkgb2YgdGhlIG1haW4gZGlzcGxheSBhcmVhLiBUaGVuXHJcblx0ICogcGFzcyB0aGUgUG9pbnQgaW5zdGFuY2UgYXMgdGhlIHBhcmFtZXRlciB0byB0aGVcclxuXHQgKiA8Y29kZT5nbG9iYWxUb0xvY2FsKCk8L2NvZGU+IG1ldGhvZC4gVGhlIG1ldGhvZCByZXR1cm5zIGEgbmV3IFBvaW50IG9iamVjdFxyXG5cdCAqIHdpdGggPGk+eDwvaT4gYW5kIDxpPnk8L2k+IHZhbHVlcyB0aGF0IHJlbGF0ZSB0byB0aGUgb3JpZ2luIG9mIHRoZSBkaXNwbGF5XHJcblx0ICogb2JqZWN0IGluc3RlYWQgb2YgdGhlIG9yaWdpbiBvZiB0aGUgU2NlbmUuPC9wPlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHBvaW50IEFuIG9iamVjdCBjcmVhdGVkIHdpdGggdGhlIFBvaW50IGNsYXNzLiBUaGUgUG9pbnQgb2JqZWN0XHJcblx0ICogICAgICAgICAgICAgIHNwZWNpZmllcyB0aGUgPGk+eDwvaT4gYW5kIDxpPnk8L2k+IGNvb3JkaW5hdGVzIGFzXHJcblx0ICogICAgICAgICAgICAgIHByb3BlcnRpZXMuXHJcblx0ICogQHJldHVybiBBIFBvaW50IG9iamVjdCB3aXRoIGNvb3JkaW5hdGVzIHJlbGF0aXZlIHRvIHRoZSBkaXNwbGF5IG9iamVjdC5cclxuXHQgKi9cclxuXHRwdWJsaWMgZ2xvYmFsVG9Mb2NhbChwb2ludDpQb2ludCk6UG9pbnRcclxuXHR7XHJcblx0XHRyZXR1cm4gcG9pbnQ7IC8vVE9ET1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ29udmVydHMgYSB0d28tZGltZW5zaW9uYWwgcG9pbnQgZnJvbSB0aGUgU2NlbmUoZ2xvYmFsKSBjb29yZGluYXRlcyB0byBhXHJcblx0ICogdGhyZWUtZGltZW5zaW9uYWwgZGlzcGxheSBvYmplY3Qncyhsb2NhbCkgY29vcmRpbmF0ZXMuXHJcblx0ICpcclxuXHQgKiA8cD5UbyB1c2UgdGhpcyBtZXRob2QsIGZpcnN0IGNyZWF0ZSBhbiBpbnN0YW5jZSBvZiB0aGUgVmVjdG9yM0QgY2xhc3MuIFRoZSB4LFxyXG5cdCAqIHkgYW5kIHogdmFsdWVzIHRoYXQgeW91IGFzc2lnbiB0byB0aGUgVmVjdG9yM0Qgb2JqZWN0IHJlcHJlc2VudCBnbG9iYWxcclxuXHQgKiBjb29yZGluYXRlcyBiZWNhdXNlIHRoZXkgYXJlIHJlbGF0aXZlIHRvIHRoZSBvcmlnaW4oMCwwLDApIG9mIHRoZSBzY2VuZS4gVGhlblxyXG5cdCAqIHBhc3MgdGhlIFZlY3RvcjNEIG9iamVjdCB0byB0aGUgPGNvZGU+Z2xvYmFsVG9Mb2NhbDNEKCk8L2NvZGU+IG1ldGhvZCBhcyB0aGVcclxuXHQgKiA8Y29kZT5wb3NpdGlvbjwvY29kZT4gcGFyYW1ldGVyLlxyXG5cdCAqIFRoZSBtZXRob2QgcmV0dXJucyB0aHJlZS1kaW1lbnNpb25hbCBjb29yZGluYXRlcyBhcyBhIFZlY3RvcjNEIG9iamVjdFxyXG5cdCAqIGNvbnRhaW5pbmcgPGNvZGU+eDwvY29kZT4sIDxjb2RlPnk8L2NvZGU+LCBhbmQgPGNvZGU+ejwvY29kZT4gdmFsdWVzIHRoYXRcclxuXHQgKiBhcmUgcmVsYXRpdmUgdG8gdGhlIG9yaWdpbiBvZiB0aGUgdGhyZWUtZGltZW5zaW9uYWwgZGlzcGxheSBvYmplY3QuPC9wPlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHBvaW50IEEgVmVjdG9yM0Qgb2JqZWN0IHJlcHJlc2VudGluZyBnbG9iYWwgeCwgeSBhbmQgeiBjb29yZGluYXRlcyBpblxyXG5cdCAqICAgICAgICAgICAgICB0aGUgc2NlbmUuXHJcblx0ICogQHJldHVybiBBIFZlY3RvcjNEIG9iamVjdCB3aXRoIGNvb3JkaW5hdGVzIHJlbGF0aXZlIHRvIHRoZSB0aHJlZS1kaW1lbnNpb25hbFxyXG5cdCAqICAgICAgICAgZGlzcGxheSBvYmplY3QuXHJcblx0ICovXHJcblx0cHVibGljIGdsb2JhbFRvTG9jYWwzRChwb3NpdGlvbjpWZWN0b3IzRCk6VmVjdG9yM0RcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5pbnZlcnNlU2NlbmVUcmFuc2Zvcm0udHJhbnNmb3JtVmVjdG9yKHBvc2l0aW9uKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEV2YWx1YXRlcyB0aGUgYm91bmRpbmcgYm94IG9mIHRoZSBkaXNwbGF5IG9iamVjdCB0byBzZWUgaWYgaXQgb3ZlcmxhcHMgb3JcclxuXHQgKiBpbnRlcnNlY3RzIHdpdGggdGhlIGJvdW5kaW5nIGJveCBvZiB0aGUgPGNvZGU+b2JqPC9jb2RlPiBkaXNwbGF5IG9iamVjdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvYmogVGhlIGRpc3BsYXkgb2JqZWN0IHRvIHRlc3QgYWdhaW5zdC5cclxuXHQgKiBAcmV0dXJuIDxjb2RlPnRydWU8L2NvZGU+IGlmIHRoZSBib3VuZGluZyBib3hlcyBvZiB0aGUgZGlzcGxheSBvYmplY3RzXHJcblx0ICogICAgICAgICBpbnRlcnNlY3Q7IDxjb2RlPmZhbHNlPC9jb2RlPiBpZiBub3QuXHJcblx0ICovXHJcblx0cHVibGljIGhpdFRlc3RPYmplY3Qob2JqOkRpc3BsYXlPYmplY3QpOmJvb2xlYW5cclxuXHR7XHJcblx0XHRyZXR1cm4gZmFsc2U7IC8vVE9ET1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRXZhbHVhdGVzIHRoZSBkaXNwbGF5IG9iamVjdCB0byBzZWUgaWYgaXQgb3ZlcmxhcHMgb3IgaW50ZXJzZWN0cyB3aXRoIHRoZVxyXG5cdCAqIHBvaW50IHNwZWNpZmllZCBieSB0aGUgPGNvZGU+eDwvY29kZT4gYW5kIDxjb2RlPnk8L2NvZGU+IHBhcmFtZXRlcnMuIFRoZVxyXG5cdCAqIDxjb2RlPng8L2NvZGU+IGFuZCA8Y29kZT55PC9jb2RlPiBwYXJhbWV0ZXJzIHNwZWNpZnkgYSBwb2ludCBpbiB0aGVcclxuXHQgKiBjb29yZGluYXRlIHNwYWNlIG9mIHRoZSBTY2VuZSwgbm90IHRoZSBkaXNwbGF5IG9iamVjdCBjb250YWluZXIgdGhhdFxyXG5cdCAqIGNvbnRhaW5zIHRoZSBkaXNwbGF5IG9iamVjdCh1bmxlc3MgdGhhdCBkaXNwbGF5IG9iamVjdCBjb250YWluZXIgaXMgdGhlXHJcblx0ICogU2NlbmUpLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHggICAgICAgICBUaGUgPGk+eDwvaT4gY29vcmRpbmF0ZSB0byB0ZXN0IGFnYWluc3QgdGhpcyBvYmplY3QuXHJcblx0ICogQHBhcmFtIHkgICAgICAgICBUaGUgPGk+eTwvaT4gY29vcmRpbmF0ZSB0byB0ZXN0IGFnYWluc3QgdGhpcyBvYmplY3QuXHJcblx0ICogQHBhcmFtIHNoYXBlRmxhZyBXaGV0aGVyIHRvIGNoZWNrIGFnYWluc3QgdGhlIGFjdHVhbCBwaXhlbHMgb2YgdGhlIG9iamVjdFxyXG5cdCAqICAgICAgICAgICAgICAgICAoPGNvZGU+dHJ1ZTwvY29kZT4pIG9yIHRoZSBib3VuZGluZyBib3hcclxuXHQgKiAgICAgICAgICAgICAgICAgKDxjb2RlPmZhbHNlPC9jb2RlPikuXHJcblx0ICogQHJldHVybiA8Y29kZT50cnVlPC9jb2RlPiBpZiB0aGUgZGlzcGxheSBvYmplY3Qgb3ZlcmxhcHMgb3IgaW50ZXJzZWN0c1xyXG5cdCAqICAgICAgICAgd2l0aCB0aGUgc3BlY2lmaWVkIHBvaW50OyA8Y29kZT5mYWxzZTwvY29kZT4gb3RoZXJ3aXNlLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBoaXRUZXN0UG9pbnQoeDpudW1iZXIsIHk6bnVtYmVyLCBzaGFwZUZsYWc6Ym9vbGVhbiA9IGZhbHNlKTpib29sZWFuXHJcblx0e1xyXG5cdFx0cmV0dXJuIGZhbHNlOyAvL1RPRE9cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJvdGF0ZXMgdGhlIDNkIG9iamVjdCBhcm91bmQgdG8gZmFjZSBhIHBvaW50IGRlZmluZWQgcmVsYXRpdmUgdG8gdGhlIGxvY2FsIGNvb3JkaW5hdGVzIG9mIHRoZSBwYXJlbnQgPGNvZGU+T2JqZWN0Q29udGFpbmVyM0Q8L2NvZGU+LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICAgIHRhcmdldCAgICAgICAgVGhlIHZlY3RvciBkZWZpbmluZyB0aGUgcG9pbnQgdG8gYmUgbG9va2VkIGF0XHJcblx0ICogQHBhcmFtICAgIHVwQXhpcyAgICAgICAgQW4gb3B0aW9uYWwgdmVjdG9yIHVzZWQgdG8gZGVmaW5lIHRoZSBkZXNpcmVkIHVwIG9yaWVudGF0aW9uIG9mIHRoZSAzZCBvYmplY3QgYWZ0ZXIgcm90YXRpb24gaGFzIG9jY3VycmVkXHJcblx0ICovXHJcblx0cHVibGljIGxvb2tBdCh0YXJnZXQ6VmVjdG9yM0QsIHVwQXhpczpWZWN0b3IzRCA9IG51bGwpXHJcblx0e1xyXG5cclxuXHRcdHZhciB5QXhpczpWZWN0b3IzRDtcclxuXHRcdHZhciB6QXhpczpWZWN0b3IzRDtcclxuXHRcdHZhciB4QXhpczpWZWN0b3IzRDtcclxuXHRcdHZhciByYXc6QXJyYXk8bnVtYmVyPjtcclxuXHJcblx0XHRpZiAodXBBeGlzID09IG51bGwpXHJcblx0XHRcdHVwQXhpcyA9IFZlY3RvcjNELllfQVhJUztcclxuXHRcdGVsc2VcclxuXHRcdFx0dXBBeGlzLm5vcm1hbGl6ZSgpO1xyXG5cclxuXHRcdHpBeGlzID0gdGFyZ2V0LnN1YnRyYWN0KHRoaXMuX2lNYXRyaXgzRC5wb3NpdGlvbik7XHJcblx0XHR6QXhpcy5ub3JtYWxpemUoKTtcclxuXHJcblx0XHR4QXhpcyA9IHVwQXhpcy5jcm9zc1Byb2R1Y3QoekF4aXMpO1xyXG5cdFx0eEF4aXMubm9ybWFsaXplKCk7XHJcblxyXG5cdFx0aWYgKHhBeGlzLmxlbmd0aCA8IDAuMDUpIHtcclxuXHRcdFx0eEF4aXMueCA9IHVwQXhpcy55O1xyXG5cdFx0XHR4QXhpcy55ID0gdXBBeGlzLng7XHJcblx0XHRcdHhBeGlzLnogPSAwO1xyXG5cdFx0XHR4QXhpcy5ub3JtYWxpemUoKTtcclxuXHRcdH1cclxuXHJcblx0XHR5QXhpcyA9IHpBeGlzLmNyb3NzUHJvZHVjdCh4QXhpcyk7XHJcblxyXG5cdFx0cmF3ID0gTWF0cml4M0RVdGlscy5SQVdfREFUQV9DT05UQUlORVI7XHJcblxyXG5cdFx0cmF3WzBdID0geEF4aXMueDtcclxuXHRcdHJhd1sxXSA9IHhBeGlzLnk7XHJcblx0XHRyYXdbMl0gPSB4QXhpcy56O1xyXG5cdFx0cmF3WzNdID0gMDtcclxuXHJcblx0XHRyYXdbNF0gPSB5QXhpcy54O1xyXG5cdFx0cmF3WzVdID0geUF4aXMueTtcclxuXHRcdHJhd1s2XSA9IHlBeGlzLno7XHJcblx0XHRyYXdbN10gPSAwO1xyXG5cclxuXHRcdHJhd1s4XSA9IHpBeGlzLng7XHJcblx0XHRyYXdbOV0gPSB6QXhpcy55O1xyXG5cdFx0cmF3WzEwXSA9IHpBeGlzLno7XHJcblx0XHRyYXdbMTFdID0gMDtcclxuXHJcblx0XHR2YXIgbTpNYXRyaXgzRCA9IG5ldyBNYXRyaXgzRCgpO1xyXG5cdFx0bS5jb3B5UmF3RGF0YUZyb20ocmF3KTtcclxuXHJcblx0XHR2YXIgdmVjOlZlY3RvcjNEID0gbS5kZWNvbXBvc2UoKVsxXTtcclxuXHJcblx0XHR0aGlzLl9yb3RhdGlvblggPSB2ZWMueDtcclxuXHRcdHRoaXMuX3JvdGF0aW9uWSA9IHZlYy55O1xyXG5cdFx0dGhpcy5fcm90YXRpb25aID0gdmVjLno7XHJcblxyXG5cdFx0dGhpcy5pbnZhbGlkYXRlUm90YXRpb24oKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnZlcnRzIHRoZSA8Y29kZT5wb2ludDwvY29kZT4gb2JqZWN0IGZyb20gdGhlIGRpc3BsYXkgb2JqZWN0J3MobG9jYWwpXHJcblx0ICogY29vcmRpbmF0ZXMgdG8gdGhlIFNjZW5lKGdsb2JhbCkgY29vcmRpbmF0ZXMuXHJcblx0ICpcclxuXHQgKiA8cD5UaGlzIG1ldGhvZCBhbGxvd3MgeW91IHRvIGNvbnZlcnQgYW55IGdpdmVuIDxpPng8L2k+IGFuZCA8aT55PC9pPlxyXG5cdCAqIGNvb3JkaW5hdGVzIGZyb20gdmFsdWVzIHRoYXQgYXJlIHJlbGF0aXZlIHRvIHRoZSBvcmlnaW4oMCwwKSBvZiBhXHJcblx0ICogc3BlY2lmaWMgZGlzcGxheSBvYmplY3QobG9jYWwgY29vcmRpbmF0ZXMpIHRvIHZhbHVlcyB0aGF0IGFyZSByZWxhdGl2ZSB0b1xyXG5cdCAqIHRoZSBvcmlnaW4gb2YgdGhlIFNjZW5lKGdsb2JhbCBjb29yZGluYXRlcykuPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+VG8gdXNlIHRoaXMgbWV0aG9kLCBmaXJzdCBjcmVhdGUgYW4gaW5zdGFuY2Ugb2YgdGhlIFBvaW50IGNsYXNzLiBUaGVcclxuXHQgKiA8aT54PC9pPiBhbmQgPGk+eTwvaT4gdmFsdWVzIHRoYXQgeW91IGFzc2lnbiByZXByZXNlbnQgbG9jYWwgY29vcmRpbmF0ZXNcclxuXHQgKiBiZWNhdXNlIHRoZXkgcmVsYXRlIHRvIHRoZSBvcmlnaW4gb2YgdGhlIGRpc3BsYXkgb2JqZWN0LjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPllvdSB0aGVuIHBhc3MgdGhlIFBvaW50IGluc3RhbmNlIHRoYXQgeW91IGNyZWF0ZWQgYXMgdGhlIHBhcmFtZXRlciB0b1xyXG5cdCAqIHRoZSA8Y29kZT5sb2NhbFRvR2xvYmFsKCk8L2NvZGU+IG1ldGhvZC4gVGhlIG1ldGhvZCByZXR1cm5zIGEgbmV3IFBvaW50XHJcblx0ICogb2JqZWN0IHdpdGggPGk+eDwvaT4gYW5kIDxpPnk8L2k+IHZhbHVlcyB0aGF0IHJlbGF0ZSB0byB0aGUgb3JpZ2luIG9mIHRoZVxyXG5cdCAqIFNjZW5lIGluc3RlYWQgb2YgdGhlIG9yaWdpbiBvZiB0aGUgZGlzcGxheSBvYmplY3QuPC9wPlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHBvaW50IFRoZSBuYW1lIG9yIGlkZW50aWZpZXIgb2YgYSBwb2ludCBjcmVhdGVkIHdpdGggdGhlIFBvaW50XHJcblx0ICogICAgICAgICAgICAgIGNsYXNzLCBzcGVjaWZ5aW5nIHRoZSA8aT54PC9pPiBhbmQgPGk+eTwvaT4gY29vcmRpbmF0ZXMgYXNcclxuXHQgKiAgICAgICAgICAgICAgcHJvcGVydGllcy5cclxuXHQgKiBAcmV0dXJuIEEgUG9pbnQgb2JqZWN0IHdpdGggY29vcmRpbmF0ZXMgcmVsYXRpdmUgdG8gdGhlIFNjZW5lLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBsb2NhbFRvR2xvYmFsKHBvaW50OlBvaW50KTpQb2ludFxyXG5cdHtcclxuXHRcdHJldHVybiBuZXcgUG9pbnQoKTsgLy9UT0RPXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDb252ZXJ0cyBhIHRocmVlLWRpbWVuc2lvbmFsIHBvaW50IG9mIHRoZSB0aHJlZS1kaW1lbnNpb25hbCBkaXNwbGF5XHJcblx0ICogb2JqZWN0J3MobG9jYWwpIGNvb3JkaW5hdGVzIHRvIGEgdGhyZWUtZGltZW5zaW9uYWwgcG9pbnQgaW4gdGhlIFNjZW5lXHJcblx0ICogKGdsb2JhbCkgY29vcmRpbmF0ZXMuXHJcblx0ICpcclxuXHQgKiA8cD5UaGlzIG1ldGhvZCBhbGxvd3MgeW91IHRvIGNvbnZlcnQgYW55IGdpdmVuIDxpPng8L2k+LCA8aT55PC9pPiBhbmRcclxuXHQgKiA8aT56PC9pPiBjb29yZGluYXRlcyBmcm9tIHZhbHVlcyB0aGF0IGFyZSByZWxhdGl2ZSB0byB0aGUgb3JpZ2luKDAsMCwwKSBvZlxyXG5cdCAqIGEgc3BlY2lmaWMgZGlzcGxheSBvYmplY3QobG9jYWwgY29vcmRpbmF0ZXMpIHRvIHZhbHVlcyB0aGF0IGFyZSByZWxhdGl2ZSB0b1xyXG5cdCAqIHRoZSBvcmlnaW4gb2YgdGhlIFNjZW5lKGdsb2JhbCBjb29yZGluYXRlcykuPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+VG8gdXNlIHRoaXMgbWV0aG9kLCBmaXJzdCBjcmVhdGUgYW4gaW5zdGFuY2Ugb2YgdGhlIFBvaW50IGNsYXNzLiBUaGVcclxuXHQgKiA8aT54PC9pPiBhbmQgPGk+eTwvaT4gdmFsdWVzIHRoYXQgeW91IGFzc2lnbiByZXByZXNlbnQgbG9jYWwgY29vcmRpbmF0ZXNcclxuXHQgKiBiZWNhdXNlIHRoZXkgcmVsYXRlIHRvIHRoZSBvcmlnaW4gb2YgdGhlIGRpc3BsYXkgb2JqZWN0LjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPllvdSB0aGVuIHBhc3MgdGhlIFZlY3RvcjNEIGluc3RhbmNlIHRoYXQgeW91IGNyZWF0ZWQgYXMgdGhlIHBhcmFtZXRlciB0b1xyXG5cdCAqIHRoZSA8Y29kZT5sb2NhbFRvR2xvYmFsM0QoKTwvY29kZT4gbWV0aG9kLiBUaGUgbWV0aG9kIHJldHVybnMgYSBuZXdcclxuXHQgKiBWZWN0b3IzRCBvYmplY3Qgd2l0aCA8aT54PC9pPiwgPGk+eTwvaT4gYW5kIDxpPno8L2k+IHZhbHVlcyB0aGF0IHJlbGF0ZSB0b1xyXG5cdCAqIHRoZSBvcmlnaW4gb2YgdGhlIFNjZW5lIGluc3RlYWQgb2YgdGhlIG9yaWdpbiBvZiB0aGUgZGlzcGxheSBvYmplY3QuPC9wPlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHBvc2l0aW9uIEEgVmVjdG9yM0Qgb2JqZWN0IGNvbnRhaW5pbmcgZWl0aGVyIGEgdGhyZWUtZGltZW5zaW9uYWxcclxuXHQgKiAgICAgICAgICAgICAgICBwb3NpdGlvbiBvciB0aGUgY29vcmRpbmF0ZXMgb2YgdGhlIHRocmVlLWRpbWVuc2lvbmFsXHJcblx0ICogICAgICAgICAgICAgICAgZGlzcGxheSBvYmplY3QuXHJcblx0ICogQHJldHVybiBBIFZlY3RvcjNEIG9iamVjdCByZXByZXNlbnRpbmcgYSB0aHJlZS1kaW1lbnNpb25hbCBwb3NpdGlvbiBpblxyXG5cdCAqICAgICAgICAgdGhlIFNjZW5lLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBsb2NhbFRvR2xvYmFsM0QocG9zaXRpb246VmVjdG9yM0QpOlZlY3RvcjNEXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuc2NlbmVUcmFuc2Zvcm0udHJhbnNmb3JtVmVjdG9yKHBvc2l0aW9uKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1vdmVzIHRoZSAzZCBvYmplY3QgZGlyZWN0bHkgdG8gYSBwb2ludCBpbiBzcGFjZVxyXG5cdCAqXHJcblx0ICogQHBhcmFtICAgIGR4ICAgICAgICBUaGUgYW1vdW50IG9mIG1vdmVtZW50IGFsb25nIHRoZSBsb2NhbCB4IGF4aXMuXHJcblx0ICogQHBhcmFtICAgIGR5ICAgICAgICBUaGUgYW1vdW50IG9mIG1vdmVtZW50IGFsb25nIHRoZSBsb2NhbCB5IGF4aXMuXHJcblx0ICogQHBhcmFtICAgIGR6ICAgICAgICBUaGUgYW1vdW50IG9mIG1vdmVtZW50IGFsb25nIHRoZSBsb2NhbCB6IGF4aXMuXHJcblx0ICovXHJcblxyXG5cdHB1YmxpYyBtb3ZlVG8oZHg6bnVtYmVyLCBkeTpudW1iZXIsIGR6Om51bWJlcilcclxuXHR7XHJcblx0XHRpZiAodGhpcy5feCA9PSBkeCAmJiB0aGlzLl95ID09IGR5ICYmIHRoaXMuX3ogPT0gZHopXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl94ID0gZHg7XHJcblx0XHR0aGlzLl95ID0gZHk7XHJcblx0XHR0aGlzLl96ID0gZHo7XHJcblxyXG5cdFx0dGhpcy5pbnZhbGlkYXRlUG9zaXRpb24oKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1vdmVzIHRoZSBsb2NhbCBwb2ludCBhcm91bmQgd2hpY2ggdGhlIG9iamVjdCByb3RhdGVzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICAgIGR4ICAgICAgICBUaGUgYW1vdW50IG9mIG1vdmVtZW50IGFsb25nIHRoZSBsb2NhbCB4IGF4aXMuXHJcblx0ICogQHBhcmFtICAgIGR5ICAgICAgICBUaGUgYW1vdW50IG9mIG1vdmVtZW50IGFsb25nIHRoZSBsb2NhbCB5IGF4aXMuXHJcblx0ICogQHBhcmFtICAgIGR6ICAgICAgICBUaGUgYW1vdW50IG9mIG1vdmVtZW50IGFsb25nIHRoZSBsb2NhbCB6IGF4aXMuXHJcblx0ICovXHJcblx0cHVibGljIG1vdmVQaXZvdChkeDpudW1iZXIsIGR5Om51bWJlciwgZHo6bnVtYmVyKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9waXZvdCA9PSBudWxsKVxyXG5cdFx0XHR0aGlzLl9waXZvdCA9IG5ldyBWZWN0b3IzRCgpO1xyXG5cclxuXHRcdHRoaXMuX3Bpdm90LnggKz0gZHg7XHJcblx0XHR0aGlzLl9waXZvdC55ICs9IGR5O1xyXG5cdFx0dGhpcy5fcGl2b3QueiArPSBkejtcclxuXHJcblx0XHR0aGlzLmludmFsaWRhdGVQaXZvdCgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUm90YXRlcyB0aGUgM2Qgb2JqZWN0IGFyb3VuZCBpdCdzIGxvY2FsIHgtYXhpc1xyXG5cdCAqXHJcblx0ICogQHBhcmFtICAgIGFuZ2xlICAgICAgICBUaGUgYW1vdW50IG9mIHJvdGF0aW9uIGluIGRlZ3JlZXNcclxuXHQgKi9cclxuXHRwdWJsaWMgcGl0Y2goYW5nbGU6bnVtYmVyKVxyXG5cdHtcclxuXHRcdHRoaXMucm90YXRlKFZlY3RvcjNELlhfQVhJUywgYW5nbGUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0UmVuZGVyU2NlbmVUcmFuc2Zvcm0oY2FtZXJhOkNhbWVyYSk6TWF0cml4M0RcclxuXHR7XHJcblx0XHRpZiAodGhpcy5vcmllbnRhdGlvbk1vZGUgPT0gT3JpZW50YXRpb25Nb2RlLkNBTUVSQV9QTEFORSkge1xyXG5cdFx0XHR2YXIgY29tcHM6QXJyYXk8VmVjdG9yM0Q+ID0gY2FtZXJhLnNjZW5lVHJhbnNmb3JtLmRlY29tcG9zZSgpO1xyXG5cdFx0XHR2YXIgc2NhbGU6VmVjdG9yM0QgPSBjb21wc1syXTtcclxuXHRcdFx0Y29tcHNbMF0gPSB0aGlzLnNjZW5lUG9zaXRpb247XHJcblx0XHRcdHNjYWxlLnggPSB0aGlzLl9wU2NhbGVYO1xyXG5cdFx0XHRzY2FsZS55ID0gdGhpcy5fcFNjYWxlWTtcclxuXHRcdFx0c2NhbGUueiA9IHRoaXMuX3BTY2FsZVo7XHJcblx0XHRcdHRoaXMuX29yaWVudGF0aW9uTWF0cml4LnJlY29tcG9zZShjb21wcyk7XHJcblxyXG5cdFx0XHQvL2FkZCBpbiBjYXNlIG9mIHBpdm90XHJcblx0XHRcdGlmICghdGhpcy5fcGl2b3RaZXJvICYmIHRoaXMuYWxpZ25tZW50TW9kZSA9PSBBbGlnbm1lbnRNb2RlLlBJVk9UX1BPSU5UKVxyXG5cdFx0XHRcdHRoaXMuX29yaWVudGF0aW9uTWF0cml4LnByZXBlbmRUcmFuc2xhdGlvbigtdGhpcy5fcGl2b3QueC90aGlzLl9wU2NhbGVYLCAtdGhpcy5fcGl2b3QueS90aGlzLl9wU2NhbGVZLCAtdGhpcy5fcGl2b3Quei90aGlzLl9wU2NhbGVaKTtcclxuXHJcblx0XHRcdHJldHVybiB0aGlzLl9vcmllbnRhdGlvbk1hdHJpeDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcy5zY2VuZVRyYW5zZm9ybTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJvdGF0ZXMgdGhlIDNkIG9iamVjdCBhcm91bmQgaXQncyBsb2NhbCB6LWF4aXNcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAgICBhbmdsZSAgICAgICAgVGhlIGFtb3VudCBvZiByb3RhdGlvbiBpbiBkZWdyZWVzXHJcblx0ICovXHJcblx0cHVibGljIHJvbGwoYW5nbGU6bnVtYmVyKVxyXG5cdHtcclxuXHRcdHRoaXMucm90YXRlKFZlY3RvcjNELlpfQVhJUywgYW5nbGUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUm90YXRlcyB0aGUgM2Qgb2JqZWN0IGFyb3VuZCBhbiBheGlzIGJ5IGEgZGVmaW5lZCBhbmdsZVxyXG5cdCAqXHJcblx0ICogQHBhcmFtICAgIGF4aXMgICAgICAgIFRoZSB2ZWN0b3IgZGVmaW5pbmcgdGhlIGF4aXMgb2Ygcm90YXRpb25cclxuXHQgKiBAcGFyYW0gICAgYW5nbGUgICAgICAgIFRoZSBhbW91bnQgb2Ygcm90YXRpb24gaW4gZGVncmVlc1xyXG5cdCAqL1xyXG5cdHB1YmxpYyByb3RhdGUoYXhpczpWZWN0b3IzRCwgYW5nbGU6bnVtYmVyKVxyXG5cdHtcclxuXHRcdHZhciBtOk1hdHJpeDNEID0gbmV3IE1hdHJpeDNEKCk7XHJcblx0XHRtLnByZXBlbmRSb3RhdGlvbihhbmdsZSwgYXhpcyk7XHJcblxyXG5cdFx0dmFyIHZlYzpWZWN0b3IzRCA9IG0uZGVjb21wb3NlKClbMV07XHJcblxyXG5cdFx0dGhpcy5fcm90YXRpb25YICs9IHZlYy54O1xyXG5cdFx0dGhpcy5fcm90YXRpb25ZICs9IHZlYy55O1xyXG5cdFx0dGhpcy5fcm90YXRpb25aICs9IHZlYy56O1xyXG5cclxuXHRcdHRoaXMuaW52YWxpZGF0ZVJvdGF0aW9uKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSb3RhdGVzIHRoZSAzZCBvYmplY3QgZGlyZWN0bHkgdG8gYSBldWxlciBhbmdsZVxyXG5cdCAqXHJcblx0ICogQHBhcmFtICAgIGF4ICAgICAgICBUaGUgYW5nbGUgaW4gZGVncmVlcyBvZiB0aGUgcm90YXRpb24gYXJvdW5kIHRoZSB4IGF4aXMuXHJcblx0ICogQHBhcmFtICAgIGF5ICAgICAgICBUaGUgYW5nbGUgaW4gZGVncmVlcyBvZiB0aGUgcm90YXRpb24gYXJvdW5kIHRoZSB5IGF4aXMuXHJcblx0ICogQHBhcmFtICAgIGF6ICAgICAgICBUaGUgYW5nbGUgaW4gZGVncmVlcyBvZiB0aGUgcm90YXRpb24gYXJvdW5kIHRoZSB6IGF4aXMuXHJcblx0ICovXHJcblx0cHVibGljIHJvdGF0ZVRvKGF4Om51bWJlciwgYXk6bnVtYmVyLCBhejpudW1iZXIpXHJcblx0e1xyXG5cdFx0dGhpcy5fcm90YXRpb25YID0gYXgqTWF0aENvbnN0cy5ERUdSRUVTX1RPX1JBRElBTlM7XHJcblx0XHR0aGlzLl9yb3RhdGlvblkgPSBheSpNYXRoQ29uc3RzLkRFR1JFRVNfVE9fUkFESUFOUztcclxuXHRcdHRoaXMuX3JvdGF0aW9uWiA9IGF6Kk1hdGhDb25zdHMuREVHUkVFU19UT19SQURJQU5TO1xyXG5cclxuXHRcdHRoaXMuaW52YWxpZGF0ZVJvdGF0aW9uKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyByZW1vdmVFdmVudExpc3RlbmVyKHR5cGU6c3RyaW5nLCBsaXN0ZW5lcjpGdW5jdGlvbilcclxuXHR7XHJcblx0XHRzdXBlci5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKTtcclxuXHJcblx0XHRpZiAodGhpcy5oYXNFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHN3aXRjaCAodHlwZSkge1xyXG5cdFx0XHRjYXNlIERpc3BsYXlPYmplY3RFdmVudC5QT1NJVElPTl9DSEFOR0VEOlxyXG5cdFx0XHRcdHRoaXMuX2xpc3RlblRvUG9zaXRpb25DaGFuZ2VkID0gZmFsc2U7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIERpc3BsYXlPYmplY3RFdmVudC5ST1RBVElPTl9DSEFOR0VEOlxyXG5cdFx0XHRcdHRoaXMuX2xpc3RlblRvUm90YXRpb25DaGFuZ2VkID0gZmFsc2U7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIERpc3BsYXlPYmplY3RFdmVudC5TQ0FMRV9DSEFOR0VEOlxyXG5cdFx0XHRcdHRoaXMuX2xpc3RlblRvU2NhbGVDaGFuZ2VkID0gZmFsc2U7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNb3ZlcyB0aGUgM2Qgb2JqZWN0IGFsb25nIGEgdmVjdG9yIGJ5IGEgZGVmaW5lZCBsZW5ndGhcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAgICBheGlzICAgICAgICBUaGUgdmVjdG9yIGRlZmluaW5nIHRoZSBheGlzIG9mIG1vdmVtZW50XHJcblx0ICogQHBhcmFtICAgIGRpc3RhbmNlICAgIFRoZSBsZW5ndGggb2YgdGhlIG1vdmVtZW50XHJcblx0ICovXHJcblx0cHVibGljIHRyYW5zbGF0ZShheGlzOlZlY3RvcjNELCBkaXN0YW5jZTpudW1iZXIpXHJcblx0e1xyXG5cdFx0dmFyIHg6bnVtYmVyID0gYXhpcy54LCB5Om51bWJlciA9IGF4aXMueSwgejpudW1iZXIgPSBheGlzLno7XHJcblx0XHR2YXIgbGVuOm51bWJlciA9IGRpc3RhbmNlL01hdGguc3FydCh4KnggKyB5KnkgKyB6KnopO1xyXG5cclxuXHRcdHRoaXMuX3ggKz0geCpsZW47XHJcblx0XHR0aGlzLl95ICs9IHkqbGVuO1xyXG5cdFx0dGhpcy5feiArPSB6KmxlbjtcclxuXHJcblx0XHR0aGlzLmludmFsaWRhdGVQb3NpdGlvbigpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTW92ZXMgdGhlIDNkIG9iamVjdCBhbG9uZyBhIHZlY3RvciBieSBhIGRlZmluZWQgbGVuZ3RoXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gICAgYXhpcyAgICAgICAgVGhlIHZlY3RvciBkZWZpbmluZyB0aGUgYXhpcyBvZiBtb3ZlbWVudFxyXG5cdCAqIEBwYXJhbSAgICBkaXN0YW5jZSAgICBUaGUgbGVuZ3RoIG9mIHRoZSBtb3ZlbWVudFxyXG5cdCAqL1xyXG5cdHB1YmxpYyB0cmFuc2xhdGVMb2NhbChheGlzOlZlY3RvcjNELCBkaXN0YW5jZTpudW1iZXIpXHJcblx0e1xyXG5cdFx0dmFyIHg6bnVtYmVyID0gYXhpcy54LCB5Om51bWJlciA9IGF4aXMueSwgejpudW1iZXIgPSBheGlzLno7XHJcblx0XHR2YXIgbGVuOm51bWJlciA9IGRpc3RhbmNlL01hdGguc3FydCh4KnggKyB5KnkgKyB6KnopO1xyXG5cclxuXHRcdHRoaXMuX2lNYXRyaXgzRC5wcmVwZW5kVHJhbnNsYXRpb24oeCpsZW4sIHkqbGVuLCB6Kmxlbik7XHJcblxyXG5cdFx0dGhpcy5fbWF0cml4M0QuY29weUNvbHVtblRvKDMsIHRoaXMuX3Bvcyk7XHJcblxyXG5cdFx0dGhpcy5feCA9IHRoaXMuX3Bvcy54O1xyXG5cdFx0dGhpcy5feSA9IHRoaXMuX3Bvcy55O1xyXG5cdFx0dGhpcy5feiA9IHRoaXMuX3Bvcy56O1xyXG5cclxuXHRcdHRoaXMuaW52YWxpZGF0ZVBvc2l0aW9uKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSb3RhdGVzIHRoZSAzZCBvYmplY3QgYXJvdW5kIGl0J3MgbG9jYWwgeS1heGlzXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gICAgYW5nbGUgICAgICAgIFRoZSBhbW91bnQgb2Ygcm90YXRpb24gaW4gZGVncmVlc1xyXG5cdCAqL1xyXG5cdHB1YmxpYyB5YXcoYW5nbGU6bnVtYmVyKVxyXG5cdHtcclxuXHRcdHRoaXMucm90YXRlKFZlY3RvcjNELllfQVhJUywgYW5nbGUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQGludGVybmFsXHJcblx0ICovXHJcblx0cHVibGljIF9pQ29udHJvbGxlcjpDb250cm9sbGVyQmFzZTtcclxuXHJcblx0LyoqXHJcblx0ICogQGludGVybmFsXHJcblx0ICovXHJcblx0cHVibGljIGdldCBfaUFzc2lnbmVkUGFydGl0aW9uKCk6UGFydGl0aW9uXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BJbXBsaWNpdFBhcnRpdGlvbjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSB0cmFuc2Zvcm1hdGlvbiBvZiB0aGUgM2Qgb2JqZWN0LCByZWxhdGl2ZSB0byB0aGUgbG9jYWwgY29vcmRpbmF0ZXMgb2YgdGhlIHBhcmVudCA8Y29kZT5PYmplY3RDb250YWluZXIzRDwvY29kZT4uXHJcblx0ICpcclxuXHQgKiBAaW50ZXJuYWxcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IF9pTWF0cml4M0QoKTpNYXRyaXgzRFxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9tYXRyaXgzRERpcnR5KVxyXG5cdFx0XHR0aGlzLl9wVXBkYXRlTWF0cml4M0QoKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fbWF0cml4M0Q7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IF9pTWF0cml4M0QodmFsOk1hdHJpeDNEKVxyXG5cdHtcclxuXHJcblx0XHQvLyBUT0RPOiBGcm9tIEFTMyAtIERvIHdlIHN0aWxsIG5lZWQgdGhpcyBpbiBKUyA/XHJcblx0XHQvL3JpZGljdWxvdXMgbWF0cml4IGVycm9yXHJcblx0XHQvKlxyXG5cdFx0aWYgKCF2YWwucmF3RGF0YVswXSkge1xyXG5cclxuXHRcdFx0dmFyIHJhdzpudW1iZXJbXSA9IE1hdHJpeDNEVXRpbHMuUkFXX0RBVEFfQ09OVEFJTkVSO1xyXG5cdFx0XHR2YWwuY29weVJhd0RhdGFUbyhyYXcpO1xyXG5cdFx0XHRyYXdbMF0gPSB0aGlzLl9zbWFsbGVzdE51bWJlcjtcclxuXHRcdFx0dmFsLmNvcHlSYXdEYXRhRnJvbShyYXcpO1xyXG5cdFx0fVxyXG5cdFx0Ly8qL1xyXG5cdFx0dmFyIGVsZW1lbnRzOkFycmF5PFZlY3RvcjNEPiA9IHZhbC5kZWNvbXBvc2UoKTtcclxuXHRcdHZhciB2ZWM6VmVjdG9yM0Q7XHJcblxyXG5cdFx0dmVjID0gZWxlbWVudHNbMF07XHJcblxyXG5cdFx0aWYgKHRoaXMuX3ggIT0gdmVjLnggfHwgdGhpcy5feSAhPSB2ZWMueSB8fCB0aGlzLl96ICE9IHZlYy56KSB7XHJcblx0XHRcdHRoaXMuX3ggPSB2ZWMueDtcclxuXHRcdFx0dGhpcy5feSA9IHZlYy55O1xyXG5cdFx0XHR0aGlzLl96ID0gdmVjLno7XHJcblxyXG5cdFx0XHR0aGlzLmludmFsaWRhdGVQb3NpdGlvbigpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZlYyA9IGVsZW1lbnRzWzFdO1xyXG5cclxuXHRcdGlmICh0aGlzLl9yb3RhdGlvblggIT0gdmVjLnggfHwgdGhpcy5fcm90YXRpb25ZICE9IHZlYy55IHx8IHRoaXMuX3JvdGF0aW9uWiAhPSB2ZWMueikge1xyXG5cdFx0XHR0aGlzLl9yb3RhdGlvblggPSB2ZWMueDtcclxuXHRcdFx0dGhpcy5fcm90YXRpb25ZID0gdmVjLnk7XHJcblx0XHRcdHRoaXMuX3JvdGF0aW9uWiA9IHZlYy56O1xyXG5cclxuXHRcdFx0dGhpcy5pbnZhbGlkYXRlUm90YXRpb24oKTtcclxuXHRcdH1cclxuXHJcblx0XHR2ZWMgPSBlbGVtZW50c1syXTtcclxuXHJcblx0XHRpZiAodGhpcy5fcFNjYWxlWCAhPSB2ZWMueCB8fCB0aGlzLl9wU2NhbGVZICE9IHZlYy55IHx8IHRoaXMuX3BTY2FsZVogIT0gdmVjLnopIHtcclxuXHRcdFx0dGhpcy5fcFNjYWxlWCA9IHZlYy54O1xyXG5cdFx0XHR0aGlzLl9wU2NhbGVZID0gdmVjLnk7XHJcblx0XHRcdHRoaXMuX3BTY2FsZVogPSB2ZWMuejtcclxuXHJcblx0XHRcdHRoaXMuaW52YWxpZGF0ZVNjYWxlKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAaW50ZXJuYWxcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IF9pUGlja2luZ0NvbGxpc2lvblZPKCk6UGlja2luZ0NvbGxpc2lvblZPXHJcblx0e1xyXG5cdFx0aWYgKCF0aGlzLl9wUGlja2luZ0NvbGxpc2lvblZPKVxyXG5cdFx0XHR0aGlzLl9wUGlja2luZ0NvbGxpc2lvblZPID0gbmV3IFBpY2tpbmdDb2xsaXNpb25WTyh0aGlzKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fcFBpY2tpbmdDb2xsaXNpb25WTztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBpbnRlcm5hbFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBpU2V0UGFyZW50KHZhbHVlOkRpc3BsYXlPYmplY3RDb250YWluZXIpXHJcblx0e1xyXG5cdFx0dGhpcy5fcFBhcmVudCA9IHZhbHVlO1xyXG5cclxuXHRcdGlmICh2YWx1ZSkge1xyXG5cdFx0XHR0aGlzLl9wVXBkYXRlSW1wbGljaXRNb3VzZUVuYWJsZWQodmFsdWUubW91c2VDaGlsZHJlbik7XHJcblx0XHRcdHRoaXMuX3BVcGRhdGVJbXBsaWNpdFZpc2liaWxpdHkodmFsdWUuX2lJc1Zpc2libGUoKSk7XHJcblx0XHRcdHRoaXMuX3BVcGRhdGVJbXBsaWNpdFBhcnRpdGlvbih2YWx1ZS5faUFzc2lnbmVkUGFydGl0aW9uLCB2YWx1ZS5fcFNjZW5lKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuX3BVcGRhdGVJbXBsaWNpdE1vdXNlRW5hYmxlZCh0cnVlKTtcclxuXHRcdFx0dGhpcy5fcFVwZGF0ZUltcGxpY2l0VmlzaWJpbGl0eSh0cnVlKTtcclxuXHRcdFx0dGhpcy5fcFVwZGF0ZUltcGxpY2l0UGFydGl0aW9uKG51bGwsIG51bGwpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHByb3RlY3RlZFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBwSW52YWxpZGF0ZVNjZW5lVHJhbnNmb3JtKClcclxuXHR7XHJcblx0XHR0aGlzLl9wU2NlbmVUcmFuc2Zvcm1EaXJ0eSA9ICF0aGlzLl9wSWdub3JlVHJhbnNmb3JtO1xyXG5cdFx0dGhpcy5faW52ZXJzZVNjZW5lVHJhbnNmb3JtRGlydHkgPSAhdGhpcy5fcElnbm9yZVRyYW5zZm9ybTtcclxuXHRcdHRoaXMuX3NjZW5lUG9zaXRpb25EaXJ0eSA9ICF0aGlzLl9wSWdub3JlVHJhbnNmb3JtO1xyXG5cclxuXHRcdGlmICh0aGlzLmlzRW50aXR5KVxyXG5cdFx0XHR0aGlzLmludmFsaWRhdGVQYXJ0aXRpb24oKTtcclxuXHJcblx0XHRpZiAodGhpcy5fbGlzdGVuVG9TY2VuZVRyYW5zZm9ybUNoYW5nZWQpXHJcblx0XHRcdHRoaXMubm90aWZ5U2NlbmVUcmFuc2Zvcm1DaGFuZ2UoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwcm90ZWN0ZWRcclxuXHQgKi9cclxuXHRwdWJsaWMgX3BVcGRhdGVJbXBsaWNpdE1vdXNlRW5hYmxlZCh2YWx1ZTpib29sZWFuKVxyXG5cdHtcclxuXHRcdHRoaXMuX3BJbXBsaWNpdE1vdXNlRW5hYmxlZCA9IHRoaXMuX2V4cGxpY2l0TW91c2VFbmFibGVkICYmIHZhbHVlO1xyXG5cclxuXHRcdC8vIElmIHRoZXJlIGlzIGEgcGFyZW50IGFuZCB0aGlzIGNoaWxkIGRvZXMgbm90IGhhdmUgYSBwaWNraW5nIGNvbGxpZGVyLCB1c2UgaXRzIHBhcmVudCdzIHBpY2tpbmcgY29sbGlkZXIuXHJcblx0XHRpZiAodGhpcy5fcEltcGxpY2l0TW91c2VFbmFibGVkICYmIHRoaXMuX3BQYXJlbnQgJiYgIXRoaXMuX3BQaWNraW5nQ29sbGlkZXIpXHJcblx0XHRcdHRoaXMuX3BQaWNraW5nQ29sbGlkZXIgPSAgdGhpcy5fcFBhcmVudC5fcFBpY2tpbmdDb2xsaWRlcjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwcm90ZWN0ZWRcclxuXHQgKi9cclxuXHRwdWJsaWMgX3BVcGRhdGVJbXBsaWNpdFBhcnRpdGlvbihwYXJ0aXRpb246UGFydGl0aW9uLCBzY2VuZTpTY2VuZSlcclxuXHR7XHJcblx0XHR2YXIgc2NlbmVDaGFuZ2VkOmJvb2xlYW4gPSB0aGlzLl9wU2NlbmUgIT0gc2NlbmU7XHJcblxyXG5cdFx0aWYgKHNjZW5lQ2hhbmdlZCAmJiB0aGlzLl9wU2NlbmUpXHJcblx0XHRcdHRoaXMuX3BTY2VuZS5kaXNwYXRjaEV2ZW50KG5ldyBTY2VuZUV2ZW50KFNjZW5lRXZlbnQuUkVNT1ZFRF9GUk9NX1NDRU5FLCB0aGlzKSk7XHJcblxyXG5cdFx0aWYgKHRoaXMuX3BTY2VuZSAmJiB0aGlzLl9wSW1wbGljaXRQYXJ0aXRpb24pIHtcclxuXHRcdFx0Ly91bnJlZ2lzdGVyIHBhcnRpdGlvbiBmcm9tIGN1cnJlbnQgc2NlbmVcclxuXHRcdFx0dGhpcy5fcFNjZW5lLl9pVW5yZWdpc3RlclBhcnRpdGlvbih0aGlzLl9wSW1wbGljaXRQYXJ0aXRpb24pO1xyXG5cclxuXHRcdFx0Ly91bnJlZ2lzdGVyIGVudGl0eSBmcm9tIGN1cnJlbnQgcGFydGl0aW9uXHJcblx0XHRcdGlmICh0aGlzLl9wSXNFbnRpdHkpXHJcblx0XHRcdFx0dGhpcy5fcFVucmVnaXN0ZXJFbnRpdHkodGhpcy5fcEltcGxpY2l0UGFydGl0aW9uKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBhc3NpZ24gcGFyZW50IGltcGxpY2l0IHBhcnRpdGlvbiBpZiBubyBleHBsaWNpdCBvbmUgaXMgZ2l2ZW5cclxuXHRcdHRoaXMuX3BJbXBsaWNpdFBhcnRpdGlvbiA9IHRoaXMuX2V4cGxpY2l0UGFydGl0aW9uIHx8IHBhcnRpdGlvbjtcclxuXHJcblx0XHQvL2Fzc2lnbiBzY2VuZVxyXG5cdFx0aWYgKHNjZW5lQ2hhbmdlZClcclxuXHRcdFx0dGhpcy5fcFNjZW5lID0gc2NlbmU7XHJcblxyXG5cdFx0aWYgKHRoaXMuX3BTY2VuZSAmJiB0aGlzLl9wSW1wbGljaXRQYXJ0aXRpb24pIHtcclxuXHRcdFx0Ly9yZWdpc3RlciBwYXJ0aXRpb24gd2l0aCBzY2VuZVxyXG5cdFx0XHR0aGlzLl9wU2NlbmUuX2lSZWdpc3RlclBhcnRpdGlvbih0aGlzLl9wSW1wbGljaXRQYXJ0aXRpb24pO1xyXG5cclxuXHRcdFx0Ly9yZWdpc3RlciBlbnRpdHkgd2l0aCBuZXcgcGFydGl0aW9uXHJcblx0XHRcdGlmICh0aGlzLl9wSXNFbnRpdHkpXHJcblx0XHRcdFx0dGhpcy5fcFJlZ2lzdGVyRW50aXR5KHRoaXMuX3BJbXBsaWNpdFBhcnRpdGlvbik7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHNjZW5lQ2hhbmdlZCAmJiB0aGlzLl9wU2NlbmUpXHJcblx0XHRcdHRoaXMuX3BTY2VuZS5kaXNwYXRjaEV2ZW50KG5ldyBTY2VuZUV2ZW50KFNjZW5lRXZlbnQuQURERURfVE9fU0NFTkUsIHRoaXMpKTtcclxuXHJcblx0XHRpZiAoc2NlbmVDaGFuZ2VkKSB7XHJcblx0XHRcdGlmICghdGhpcy5fcFNjZW5lVHJhbnNmb3JtRGlydHkgJiYgIXRoaXMuX3BJZ25vcmVUcmFuc2Zvcm0pXHJcblx0XHRcdFx0dGhpcy5wSW52YWxpZGF0ZVNjZW5lVHJhbnNmb3JtKCk7XHJcblxyXG5cdFx0XHRpZiAodGhpcy5fbGlzdGVuVG9TY2VuZUNoYW5nZWQpXHJcblx0XHRcdFx0dGhpcy5ub3RpZnlTY2VuZUNoYW5nZSgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHByb3RlY3RlZFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBfcFVwZGF0ZUltcGxpY2l0VmlzaWJpbGl0eSh2YWx1ZTpib29sZWFuKVxyXG5cdHtcclxuXHRcdHRoaXMuX3BJbXBsaWNpdFZpc2liaWxpdHkgPSB0aGlzLl9leHBsaWNpdFZpc2liaWxpdHkgJiYgdmFsdWU7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAcHJvdGVjdGVkXHJcblx0ICovXHJcblx0cHVibGljIF9wVXBkYXRlTWF0cml4M0QoKVxyXG5cdHtcclxuXHJcblx0XHR0aGlzLl9wb3MueCA9IHRoaXMuX3g7XHJcblx0XHR0aGlzLl9wb3MueSA9IHRoaXMuX3k7XHJcblx0XHR0aGlzLl9wb3MueiA9IHRoaXMuX3o7XHJcblxyXG5cdFx0dGhpcy5fcm90LnggPSB0aGlzLl9yb3RhdGlvblg7XHJcblx0XHR0aGlzLl9yb3QueSA9IHRoaXMuX3JvdGF0aW9uWTtcclxuXHRcdHRoaXMuX3JvdC56ID0gdGhpcy5fcm90YXRpb25aO1xyXG5cclxuXHRcdHRoaXMuX3NjYS54ID0gdGhpcy5fcFNjYWxlWDtcclxuXHRcdHRoaXMuX3NjYS55ID0gdGhpcy5fcFNjYWxlWTtcclxuXHRcdHRoaXMuX3NjYS56ID0gdGhpcy5fcFNjYWxlWjtcclxuXHJcblx0XHR0aGlzLl9tYXRyaXgzRC5yZWNvbXBvc2UodGhpcy5fdHJhbnNmb3JtQ29tcG9uZW50cyk7XHJcblxyXG5cdFx0aWYgKCF0aGlzLl9waXZvdFplcm8pIHtcclxuXHRcdFx0dGhpcy5fbWF0cml4M0QucHJlcGVuZFRyYW5zbGF0aW9uKC10aGlzLl9waXZvdC54L3RoaXMuX3BTY2FsZVgsIC10aGlzLl9waXZvdC55L3RoaXMuX3BTY2FsZVksIC10aGlzLl9waXZvdC56L3RoaXMuX3BTY2FsZVopO1xyXG5cdFx0XHRpZiAodGhpcy5hbGlnbm1lbnRNb2RlICE9IEFsaWdubWVudE1vZGUuUElWT1RfUE9JTlQpXHJcblx0XHRcdFx0dGhpcy5fbWF0cml4M0QuYXBwZW5kVHJhbnNsYXRpb24odGhpcy5fcGl2b3QueCwgdGhpcy5fcGl2b3QueSwgdGhpcy5fcGl2b3Queik7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5fbWF0cml4M0REaXJ0eSA9IGZhbHNlO1xyXG5cdFx0dGhpcy5fcG9zaXRpb25EaXJ0eSA9IGZhbHNlO1xyXG5cdFx0dGhpcy5fcm90YXRpb25EaXJ0eSA9IGZhbHNlO1xyXG5cdFx0dGhpcy5fc2NhbGVEaXJ0eSA9IGZhbHNlO1xyXG5cdFx0dGhpcy5fcGl2b3REaXJ0eSA9IGZhbHNlO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHByb3RlY3RlZFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBwVXBkYXRlU2NlbmVUcmFuc2Zvcm0oKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9wUGFyZW50ICYmICF0aGlzLl9wUGFyZW50Ll9pSXNSb290KSB7XHJcblx0XHRcdHRoaXMuX3BTY2VuZVRyYW5zZm9ybS5jb3B5RnJvbSh0aGlzLl9wUGFyZW50LnNjZW5lVHJhbnNmb3JtKTtcclxuXHRcdFx0dGhpcy5fcFNjZW5lVHJhbnNmb3JtLnByZXBlbmQodGhpcy5faU1hdHJpeDNEKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuX3BTY2VuZVRyYW5zZm9ybS5jb3B5RnJvbSh0aGlzLl9pTWF0cml4M0QpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX3BTY2VuZVRyYW5zZm9ybURpcnR5ID0gZmFsc2U7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgX2lBZGRSZW5kZXJhYmxlKHJlbmRlcmFibGU6SVJlbmRlcmFibGUpOklSZW5kZXJhYmxlXHJcblx0e1xyXG5cdFx0dGhpcy5fcFJlbmRlcmFibGVzLnB1c2gocmVuZGVyYWJsZSk7XHJcblxyXG5cdFx0cmV0dXJuIHJlbmRlcmFibGU7XHJcblx0fVxyXG5cclxuXHJcblx0cHVibGljIF9pUmVtb3ZlUmVuZGVyYWJsZShyZW5kZXJhYmxlOklSZW5kZXJhYmxlKTpJUmVuZGVyYWJsZVxyXG5cdHtcclxuXHRcdHZhciBpbmRleDpudW1iZXIgPSB0aGlzLl9wUmVuZGVyYWJsZXMuaW5kZXhPZihyZW5kZXJhYmxlKTtcclxuXHJcblx0XHR0aGlzLl9wUmVuZGVyYWJsZXMuc3BsaWNlKGluZGV4LCAxKTtcclxuXHJcblx0XHRyZXR1cm4gcmVuZGVyYWJsZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIC8vVE9ET1xyXG5cdCAqXHJcblx0ICogQHBhcmFtIHNob3J0ZXN0Q29sbGlzaW9uRGlzdGFuY2VcclxuXHQgKiBAcGFyYW0gZmluZENsb3Nlc3RcclxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuXHQgKlxyXG5cdCAqIEBpbnRlcm5hbFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBfaVRlc3RDb2xsaXNpb24oc2hvcnRlc3RDb2xsaXNpb25EaXN0YW5jZTpudW1iZXIsIGZpbmRDbG9zZXN0OmJvb2xlYW4pOmJvb2xlYW5cclxuXHR7XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBfaUludGVybmFsVXBkYXRlKClcclxuXHR7XHJcblx0XHRpZiAodGhpcy5faUNvbnRyb2xsZXIpXHJcblx0XHRcdHRoaXMuX2lDb250cm9sbGVyLnVwZGF0ZSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQGludGVybmFsXHJcblx0ICovXHJcblx0cHVibGljIF9pSXNWaXNpYmxlKCk6Ym9vbGVhblxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLl9wSW1wbGljaXRWaXNpYmlsaXR5O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQGludGVybmFsXHJcblx0ICovXHJcblx0cHVibGljIF9pSXNNb3VzZUVuYWJsZWQoKTpib29sZWFuXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BJbXBsaWNpdE1vdXNlRW5hYmxlZDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBpbnRlcm5hbFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBfaVNldFNjZW5lKHZhbHVlOlNjZW5lKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9wU2NlbmUgPT0gdmFsdWUpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9wVXBkYXRlSW1wbGljaXRQYXJ0aXRpb24odGhpcy5fcFBhcmVudD8gdGhpcy5fcFBhcmVudC5faUFzc2lnbmVkUGFydGl0aW9uIDogbnVsbCwgdmFsdWUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIG5vdGlmeVBvc2l0aW9uQ2hhbmdlZCgpXHJcblx0e1xyXG5cdFx0aWYgKCF0aGlzLl9wb3NpdGlvbkNoYW5nZWQpXHJcblx0XHRcdHRoaXMuX3Bvc2l0aW9uQ2hhbmdlZCA9IG5ldyBEaXNwbGF5T2JqZWN0RXZlbnQoRGlzcGxheU9iamVjdEV2ZW50LlBPU0lUSU9OX0NIQU5HRUQsIHRoaXMpO1xyXG5cclxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCh0aGlzLl9wb3NpdGlvbkNoYW5nZWQpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIG5vdGlmeVJvdGF0aW9uQ2hhbmdlZCgpXHJcblx0e1xyXG5cdFx0aWYgKCF0aGlzLl9yb3RhdGlvbkNoYW5nZWQpXHJcblx0XHRcdHRoaXMuX3JvdGF0aW9uQ2hhbmdlZCA9IG5ldyBEaXNwbGF5T2JqZWN0RXZlbnQoRGlzcGxheU9iamVjdEV2ZW50LlJPVEFUSU9OX0NIQU5HRUQsIHRoaXMpO1xyXG5cclxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCh0aGlzLl9yb3RhdGlvbkNoYW5nZWQpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIG5vdGlmeVNjYWxlQ2hhbmdlZCgpXHJcblx0e1xyXG5cdFx0aWYgKCF0aGlzLl9zY2FsZUNoYW5nZWQpXHJcblx0XHRcdHRoaXMuX3NjYWxlQ2hhbmdlZCA9IG5ldyBEaXNwbGF5T2JqZWN0RXZlbnQoRGlzcGxheU9iamVjdEV2ZW50LlNDQUxFX0NIQU5HRUQsIHRoaXMpO1xyXG5cclxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCh0aGlzLl9zY2FsZUNoYW5nZWQpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIG5vdGlmeVNjZW5lQ2hhbmdlKClcclxuXHR7XHJcblx0XHRpZiAoIXRoaXMuX3NjZW5lY2hhbmdlZClcclxuXHRcdFx0dGhpcy5fc2NlbmVjaGFuZ2VkID0gbmV3IERpc3BsYXlPYmplY3RFdmVudChEaXNwbGF5T2JqZWN0RXZlbnQuU0NFTkVfQ0hBTkdFRCwgdGhpcyk7XHJcblxyXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KHRoaXMuX3NjZW5lY2hhbmdlZCk7XHJcbn1cclxuXHJcblx0LyoqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIG5vdGlmeVNjZW5lVHJhbnNmb3JtQ2hhbmdlKClcclxuXHR7XHJcblx0XHRpZiAoIXRoaXMuX3NjZW5lVHJhbnNmb3JtQ2hhbmdlZClcclxuXHRcdFx0dGhpcy5fc2NlbmVUcmFuc2Zvcm1DaGFuZ2VkID0gbmV3IERpc3BsYXlPYmplY3RFdmVudChEaXNwbGF5T2JqZWN0RXZlbnQuU0NFTkVUUkFOU0ZPUk1fQ0hBTkdFRCwgdGhpcyk7XHJcblxyXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KHRoaXMuX3NjZW5lVHJhbnNmb3JtQ2hhbmdlZCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJbnZhbGlkYXRlcyB0aGUgM0QgdHJhbnNmb3JtYXRpb24gbWF0cml4LCBjYXVzaW5nIGl0IHRvIGJlIHVwZGF0ZWQgdXBvbiB0aGUgbmV4dCByZXF1ZXN0XHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaW52YWxpZGF0ZU1hdHJpeDNEKCk6dm9pZFxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9tYXRyaXgzRERpcnR5KVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fbWF0cml4M0REaXJ0eSA9IHRydWU7XHJcblxyXG5cdFx0aWYgKCF0aGlzLl9wU2NlbmVUcmFuc2Zvcm1EaXJ0eSAmJiAhdGhpcy5fcElnbm9yZVRyYW5zZm9ybSlcclxuXHRcdFx0dGhpcy5wSW52YWxpZGF0ZVNjZW5lVHJhbnNmb3JtKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBpbnZhbGlkYXRlUGFydGl0aW9uKClcclxuXHR7XHJcblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX2VudGl0eU5vZGVzLmxlbmd0aDtcclxuXHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IGxlbjsgaSsrKVxyXG5cdFx0XHR0aGlzLl9lbnRpdHlOb2Rlc1tpXS5pbnZhbGlkYXRlUGFydGl0aW9uKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaW52YWxpZGF0ZVBpdm90KClcclxuXHR7XHJcblx0XHR0aGlzLl9waXZvdFplcm8gPSAodGhpcy5fcGl2b3QueCA9PSAwKSAmJiAodGhpcy5fcGl2b3QueSA9PSAwKSAmJiAodGhpcy5fcGl2b3QueiA9PSAwKTtcclxuXHJcblx0XHRpZiAodGhpcy5fcGl2b3REaXJ0eSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX3Bpdm90RGlydHkgPSB0cnVlO1xyXG5cclxuXHRcdHRoaXMuaW52YWxpZGF0ZU1hdHJpeDNEKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaW52YWxpZGF0ZVBvc2l0aW9uKClcclxuXHR7XHJcblx0XHRpZiAodGhpcy5fcG9zaXRpb25EaXJ0eSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuX3Bvc2l0aW9uRGlydHkgPSB0cnVlO1xyXG5cclxuXHRcdHRoaXMuaW52YWxpZGF0ZU1hdHJpeDNEKCk7XHJcblxyXG5cdFx0aWYgKHRoaXMuX2xpc3RlblRvUG9zaXRpb25DaGFuZ2VkKVxyXG5cdFx0XHR0aGlzLm5vdGlmeVBvc2l0aW9uQ2hhbmdlZCgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIGludmFsaWRhdGVSb3RhdGlvbigpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuX3JvdGF0aW9uRGlydHkpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLl9yb3RhdGlvbkRpcnR5ID0gdHJ1ZTtcclxuXHJcblx0XHR0aGlzLmludmFsaWRhdGVNYXRyaXgzRCgpO1xyXG5cclxuXHRcdGlmICh0aGlzLl9saXN0ZW5Ub1JvdGF0aW9uQ2hhbmdlZClcclxuXHRcdFx0dGhpcy5ub3RpZnlSb3RhdGlvbkNoYW5nZWQoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBpbnZhbGlkYXRlU2NhbGUoKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLl9zY2FsZURpcnR5KVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5fc2NhbGVEaXJ0eSA9IHRydWU7XHJcblxyXG5cdFx0dGhpcy5pbnZhbGlkYXRlTWF0cml4M0QoKTtcclxuXHJcblx0XHRpZiAodGhpcy5fbGlzdGVuVG9TY2FsZUNoYW5nZWQpXHJcblx0XHRcdHRoaXMubm90aWZ5U2NhbGVDaGFuZ2VkKCk7XHJcblx0fVxyXG5cclxuXHJcblx0cHVibGljIF9pQWRkRW50aXR5Tm9kZShlbnRpdHlOb2RlOkVudGl0eU5vZGUpOkVudGl0eU5vZGVcclxuXHR7XHJcblx0XHR0aGlzLl9lbnRpdHlOb2Rlcy5wdXNoKGVudGl0eU5vZGUpO1xyXG5cclxuXHRcdHJldHVybiBlbnRpdHlOb2RlO1xyXG5cdH1cclxuXHJcblxyXG5cdHB1YmxpYyBfaVJlbW92ZUVudGl0eU5vZGUoZW50aXR5Tm9kZTpFbnRpdHlOb2RlKTpFbnRpdHlOb2RlXHJcblx0e1xyXG5cdFx0dmFyIGluZGV4Om51bWJlciA9IHRoaXMuX2VudGl0eU5vZGVzLmluZGV4T2YoZW50aXR5Tm9kZSk7XHJcblxyXG5cdFx0dGhpcy5fZW50aXR5Tm9kZXMuc3BsaWNlKGluZGV4LCAxKTtcclxuXHJcblx0XHRyZXR1cm4gZW50aXR5Tm9kZTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBfcFJlZ2lzdGVyRW50aXR5KHBhcnRpdGlvbjpQYXJ0aXRpb24pXHJcblx0e1xyXG5cdFx0dGhyb3cgbmV3IEFic3RyYWN0TWV0aG9kRXJyb3IoKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBfcFVucmVnaXN0ZXJFbnRpdHkocGFydGl0aW9uOlBhcnRpdGlvbilcclxuXHR7XHJcblx0XHR0aHJvdyBuZXcgQWJzdHJhY3RNZXRob2RFcnJvcigpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIF9wSW52YWxpZGF0ZUJvdW5kcygpXHJcblx0e1xyXG5cdFx0dGhpcy5fYm94Qm91bmRzSW52YWxpZCA9IHRydWU7XHJcblx0XHR0aGlzLl9zcGhlcmVCb3VuZHNJbnZhbGlkID0gdHJ1ZTtcclxuXHJcblx0XHRpZiAodGhpcy5pc0VudGl0eSlcclxuXHRcdFx0dGhpcy5pbnZhbGlkYXRlUGFydGl0aW9uKCk7XHJcblx0fVxyXG5cdFxyXG5cdHB1YmxpYyBfcFVwZGF0ZUJveEJvdW5kcygpXHJcblx0e1xyXG5cdFx0dGhpcy5fYm94Qm91bmRzSW52YWxpZCA9IGZhbHNlO1xyXG5cdFx0XHJcblx0XHRpZiAodGhpcy5fcEJveEJvdW5kcyA9PSBudWxsKVxyXG5cdFx0XHR0aGlzLl9wQm94Qm91bmRzID0gbmV3IEJveCgpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIF9wVXBkYXRlU3BoZXJlQm91bmRzKClcclxuXHR7XHJcblx0XHR0aGlzLl9zcGhlcmVCb3VuZHNJbnZhbGlkID0gZmFsc2U7XHJcblxyXG5cdFx0aWYgKHRoaXMuX3BTcGhlcmVCb3VuZHMgPT0gbnVsbClcclxuXHRcdFx0dGhpcy5fcFNwaGVyZUJvdW5kcyA9IG5ldyBTcGhlcmUoKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCA9IERpc3BsYXlPYmplY3Q7Il19