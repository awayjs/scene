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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0Rpc3BsYXlPYmplY3QudHMiXSwibmFtZXMiOlsiRGlzcGxheU9iamVjdCIsIkRpc3BsYXlPYmplY3QuY29uc3RydWN0b3IiLCJEaXNwbGF5T2JqZWN0LmJvdW5kc1R5cGUiLCJEaXNwbGF5T2JqZWN0LmRlcHRoIiwiRGlzcGxheU9iamVjdC5ldWxlcnMiLCJEaXNwbGF5T2JqZWN0LmhlaWdodCIsIkRpc3BsYXlPYmplY3QuaW5kZXgiLCJEaXNwbGF5T2JqZWN0LmludmVyc2VTY2VuZVRyYW5zZm9ybSIsIkRpc3BsYXlPYmplY3QuaWdub3JlVHJhbnNmb3JtIiwiRGlzcGxheU9iamVjdC5pc0VudGl0eSIsIkRpc3BsYXlPYmplY3QubG9hZGVySW5mbyIsIkRpc3BsYXlPYmplY3QubW91c2VFbmFibGVkIiwiRGlzcGxheU9iamVjdC5tb3VzZVgiLCJEaXNwbGF5T2JqZWN0Lm1vdXNlWSIsIkRpc3BsYXlPYmplY3QucGFyZW50IiwiRGlzcGxheU9iamVjdC5wYXJ0aXRpb24iLCJEaXNwbGF5T2JqZWN0LnBpY2tpbmdDb2xsaWRlciIsIkRpc3BsYXlPYmplY3QucGl2b3QiLCJEaXNwbGF5T2JqZWN0LnJvb3QiLCJEaXNwbGF5T2JqZWN0LnJvdGF0aW9uWCIsIkRpc3BsYXlPYmplY3Qucm90YXRpb25ZIiwiRGlzcGxheU9iamVjdC5yb3RhdGlvbloiLCJEaXNwbGF5T2JqZWN0LnNjYWxlWCIsIkRpc3BsYXlPYmplY3Quc2NhbGVZIiwiRGlzcGxheU9iamVjdC5zY2FsZVoiLCJEaXNwbGF5T2JqZWN0LnNjZW5lIiwiRGlzcGxheU9iamVjdC5zY2VuZVBvc2l0aW9uIiwiRGlzcGxheU9iamVjdC5zY2VuZVRyYW5zZm9ybSIsIkRpc3BsYXlPYmplY3Quc2hhZGVyUGlja2luZ0RldGFpbHMiLCJEaXNwbGF5T2JqZWN0LmRlYnVnVmlzaWJsZSIsIkRpc3BsYXlPYmplY3QudHJhbnNmb3JtIiwiRGlzcGxheU9iamVjdC52aXNpYmxlIiwiRGlzcGxheU9iamVjdC53aWR0aCIsIkRpc3BsYXlPYmplY3QueCIsIkRpc3BsYXlPYmplY3QueSIsIkRpc3BsYXlPYmplY3QueiIsIkRpc3BsYXlPYmplY3Quek9mZnNldCIsIkRpc3BsYXlPYmplY3QuYWRkRXZlbnRMaXN0ZW5lciIsIkRpc3BsYXlPYmplY3QuY2xvbmUiLCJEaXNwbGF5T2JqZWN0LmRpc3Bvc2UiLCJEaXNwbGF5T2JqZWN0LmRpc3Bvc2VBc3NldCIsIkRpc3BsYXlPYmplY3QuZ2V0Qm91bmRzIiwiRGlzcGxheU9iamVjdC5nZXRSZWN0IiwiRGlzcGxheU9iamVjdC5nZXRCb3giLCJEaXNwbGF5T2JqZWN0LmdldFNwaGVyZSIsIkRpc3BsYXlPYmplY3QuZ2xvYmFsVG9Mb2NhbCIsIkRpc3BsYXlPYmplY3QuZ2xvYmFsVG9Mb2NhbDNEIiwiRGlzcGxheU9iamVjdC5oaXRUZXN0T2JqZWN0IiwiRGlzcGxheU9iamVjdC5oaXRUZXN0UG9pbnQiLCJEaXNwbGF5T2JqZWN0Lmxvb2tBdCIsIkRpc3BsYXlPYmplY3QubG9jYWxUb0dsb2JhbCIsIkRpc3BsYXlPYmplY3QubG9jYWxUb0dsb2JhbDNEIiwiRGlzcGxheU9iamVjdC5tb3ZlVG8iLCJEaXNwbGF5T2JqZWN0Lm1vdmVQaXZvdCIsIkRpc3BsYXlPYmplY3QucGl0Y2giLCJEaXNwbGF5T2JqZWN0LmdldFJlbmRlclNjZW5lVHJhbnNmb3JtIiwiRGlzcGxheU9iamVjdC5yb2xsIiwiRGlzcGxheU9iamVjdC5yb3RhdGUiLCJEaXNwbGF5T2JqZWN0LnJvdGF0ZVRvIiwiRGlzcGxheU9iamVjdC5yZW1vdmVFdmVudExpc3RlbmVyIiwiRGlzcGxheU9iamVjdC50cmFuc2xhdGUiLCJEaXNwbGF5T2JqZWN0LnRyYW5zbGF0ZUxvY2FsIiwiRGlzcGxheU9iamVjdC55YXciLCJEaXNwbGF5T2JqZWN0Ll9pQXNzaWduZWRQYXJ0aXRpb24iLCJEaXNwbGF5T2JqZWN0Ll9pTWF0cml4M0QiLCJEaXNwbGF5T2JqZWN0Ll9pUGlja2luZ0NvbGxpc2lvblZPIiwiRGlzcGxheU9iamVjdC5pU2V0UGFyZW50IiwiRGlzcGxheU9iamVjdC5wSW52YWxpZGF0ZVNjZW5lVHJhbnNmb3JtIiwiRGlzcGxheU9iamVjdC5fcFVwZGF0ZUltcGxpY2l0TW91c2VFbmFibGVkIiwiRGlzcGxheU9iamVjdC5fcFVwZGF0ZUltcGxpY2l0UGFydGl0aW9uIiwiRGlzcGxheU9iamVjdC5fcFVwZGF0ZUltcGxpY2l0VmlzaWJpbGl0eSIsIkRpc3BsYXlPYmplY3QuX3BVcGRhdGVNYXRyaXgzRCIsIkRpc3BsYXlPYmplY3QucFVwZGF0ZVNjZW5lVHJhbnNmb3JtIiwiRGlzcGxheU9iamVjdC5faUFkZFJlbmRlcmFibGUiLCJEaXNwbGF5T2JqZWN0Ll9pUmVtb3ZlUmVuZGVyYWJsZSIsIkRpc3BsYXlPYmplY3QuX2lUZXN0Q29sbGlzaW9uIiwiRGlzcGxheU9iamVjdC5faUludGVybmFsVXBkYXRlIiwiRGlzcGxheU9iamVjdC5faUlzVmlzaWJsZSIsIkRpc3BsYXlPYmplY3QuX2lJc01vdXNlRW5hYmxlZCIsIkRpc3BsYXlPYmplY3QuX2lTZXRTY2VuZSIsIkRpc3BsYXlPYmplY3Qubm90aWZ5UG9zaXRpb25DaGFuZ2VkIiwiRGlzcGxheU9iamVjdC5ub3RpZnlSb3RhdGlvbkNoYW5nZWQiLCJEaXNwbGF5T2JqZWN0Lm5vdGlmeVNjYWxlQ2hhbmdlZCIsIkRpc3BsYXlPYmplY3Qubm90aWZ5U2NlbmVDaGFuZ2UiLCJEaXNwbGF5T2JqZWN0Lm5vdGlmeVNjZW5lVHJhbnNmb3JtQ2hhbmdlIiwiRGlzcGxheU9iamVjdC5pbnZhbGlkYXRlTWF0cml4M0QiLCJEaXNwbGF5T2JqZWN0LmludmFsaWRhdGVQYXJ0aXRpb24iLCJEaXNwbGF5T2JqZWN0LmludmFsaWRhdGVQaXZvdCIsIkRpc3BsYXlPYmplY3QuaW52YWxpZGF0ZVBvc2l0aW9uIiwiRGlzcGxheU9iamVjdC5pbnZhbGlkYXRlUm90YXRpb24iLCJEaXNwbGF5T2JqZWN0LmludmFsaWRhdGVTY2FsZSIsIkRpc3BsYXlPYmplY3QuX2lBZGRFbnRpdHlOb2RlIiwiRGlzcGxheU9iamVjdC5faVJlbW92ZUVudGl0eU5vZGUiLCJEaXNwbGF5T2JqZWN0Ll9wUmVnaXN0ZXJFbnRpdHkiLCJEaXNwbGF5T2JqZWN0Ll9wVW5yZWdpc3RlckVudGl0eSIsIkRpc3BsYXlPYmplY3QuX3BJbnZhbGlkYXRlQm91bmRzIiwiRGlzcGxheU9iamVjdC5fcFVwZGF0ZUJveEJvdW5kcyIsIkRpc3BsYXlPYmplY3QuX3BVcGRhdGVTcGhlcmVCb3VuZHMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLElBQU8sR0FBRyxXQUFpQiwwQkFBMEIsQ0FBQyxDQUFDO0FBQ3ZELElBQU8sTUFBTSxXQUFnQiw2QkFBNkIsQ0FBQyxDQUFDO0FBQzVELElBQU8sVUFBVSxXQUFlLGlDQUFpQyxDQUFDLENBQUM7QUFDbkUsSUFBTyxRQUFRLFdBQWdCLCtCQUErQixDQUFDLENBQUM7QUFDaEUsSUFBTyxhQUFhLFdBQWMsb0NBQW9DLENBQUMsQ0FBQztBQUN4RSxJQUFPLEtBQUssV0FBZ0IsNEJBQTRCLENBQUMsQ0FBQztBQUUxRCxJQUFPLFFBQVEsV0FBZ0IsK0JBQStCLENBQUMsQ0FBQztBQUNoRSxJQUFPLGNBQWMsV0FBYyx3Q0FBd0MsQ0FBQyxDQUFDO0FBQzdFLElBQU8sbUJBQW1CLFdBQWEsNENBQTRDLENBQUMsQ0FBQztBQUtyRixJQUFPLGFBQWEsV0FBYyx1Q0FBdUMsQ0FBQyxDQUFDO0FBRTNFLElBQU8sZUFBZSxXQUFjLHlDQUF5QyxDQUFDLENBQUM7QUFFL0UsSUFBTyxTQUFTLFdBQWUsbUNBQW1DLENBQUMsQ0FBQztBQUlwRSxJQUFPLGtCQUFrQixXQUFhLDRDQUE0QyxDQUFDLENBQUM7QUFHcEYsSUFBTyxrQkFBa0IsV0FBYSw4Q0FBOEMsQ0FBQyxDQUFDO0FBQ3RGLElBQU8sVUFBVSxXQUFlLHNDQUFzQyxDQUFDLENBQUM7QUFHeEUsQUFpSUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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QUFDQSxTQUFTQSxFQUFFQSxDQUFDQTtRQUNuQkEsQ0FBQ0E7UUFFREEsS0FBS0EsR0FBR0EsS0FBS0EsQ0FBQ0EsWUFBWUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7UUFFbENBLEdBQUdBLEdBQUdBLGFBQWFBLENBQUNBLGtCQUFrQkEsQ0FBQ0E7UUFFdkNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBO1FBQ2pCQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNqQkEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDakJBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1FBRVhBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBO1FBQ2pCQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNqQkEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDakJBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1FBRVhBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBO1FBQ2pCQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNqQkEsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDbEJBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1FBRVpBLElBQUlBLENBQUNBLEdBQVlBLElBQUlBLFFBQVFBLEVBQUVBLENBQUNBO1FBQ2hDQSxDQUFDQSxDQUFD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QUNBLENBQUNBLENBQUNBO2dCQUNoQkEsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2hCQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFFaEJBLElBQUlBLENBQUNBLGtCQUFrQkEsRUFBRUEsQ0FBQ0E7WUFDM0JBLENBQUNBO1lBRURBLEdBQUdBLEdBQUdBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBRWxCQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxVQUFVQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxVQUFVQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDdEZBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO2dCQUN4QkEsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3hCQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFFeEJBLElBQUlBLENBQUNBLGtCQUFrQkEsRUFBRUEsQ0FBQ0E7WUFDM0JBLENBQUNBO1lBRURBLEdBQUdBLEdBQUdBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBRWxCQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxRQUFRQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxRQUFRQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDaEZBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO2dCQUN0QkEsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3RCQSxJQUFJQSxDQUFDQSxRQUFRQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFFdEJBLElBQUlBLENBQUNBLGVBQWVBLEVBQUVBLENBQUNBO1lBQ3hCQSxDQUFDQTtRQUNGQSxDQUFDQTs7O09BaERBaEU7SUFxRERBLHNCQUFXQSwrQ0FBb0JBO1FBSC9CQTs7V0FFR0E7YUFDSEE7WUFFQ2lFLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLG9CQUFvQkEsQ0FBQ0E7Z0JBQzlCQSxJQUFJQSxDQUFDQSxvQkFBb0JBLEdBQUdBLElBQUlBLGtCQUFrQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFFMURBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLG9CQUFvQkEsQ0FBQ0E7UUFDbENBLENBQUNBOzs7T0FBQWpFO0lBRURBOztPQUVHQTtJQUNJQSxrQ0FBVUEsR0FBakJBLFVBQWtCQSxLQUE0QkE7UUFFN0NrRSxJQUFJQSxDQUFDQSxRQUFRQSxHQUFHQSxLQUFLQSxDQUFDQTtRQUV0QkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDWEEsSUFBSUEsQ0FBQ0EsNEJBQTRCQSxDQUFDQSxLQUFLQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQTtZQUN2REEsSUFBSUEsQ0FBQ0EsMEJBQTBCQSxDQUFDQSxLQUFLQSxDQUFDQSxXQUFXQSxFQUFFQSxDQUFDQSxDQUFDQTtZQUNyREEsSUFBSUEsQ0FBQ0EseUJBQXlCQSxDQUFDQSxLQUFLQSxDQUFDQSxtQkFBbUJBLEVBQUVBLEtBQUtBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO1FBQzFFQSxDQUFDQTtRQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUNQQSxJQUFJQSxDQUFDQSw0QkFBNEJBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1lBQ3hDQSxJQUFJQSxDQUFDQSwwQkFBMEJBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1lBQ3RDQSxJQUFJQSxDQUFDQSx5QkFBeUJBLENBQUNBLElBQUlBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBO1FBQzVDQSxDQUFDQTtJQUNGQSxDQUFDQTtJQUVEbEU7O09BRUdBO0lBQ0lBLGlEQUF5QkEsR0FBaENBO1FBRUNtRSxJQUFJQSxDQUFDQSxxQkFBcUJBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBLGlCQUFpQkEsQ0FBQ0E7UUFDckRBLElBQUlBLENBQUNBLDJCQUEyQkEsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQTtRQUMzREEsSUFBSUEsQ0FBQ0EsbUJBQW1CQSxHQUFHQSxDQUFDQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBO1FBRW5EQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQTtZQUNqQkEsSUFBSUEsQ0FBQ0EsbUJBQW1CQSxFQUFFQSxDQUFDQTtRQUU1QkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsOEJBQThCQSxDQUFDQTtZQUN2Q0EsSUFBSUEsQ0FBQ0EsMEJBQTBCQSxFQUFFQSxDQUFDQTtJQUNwQ0EsQ0FBQ0E7SUFFRG5FOztPQUVHQTtJQUNJQSxvREFBNEJBLEdBQW5DQSxVQUFvQ0EsS0FBYUE7UUFFaERvRSxJQUFJQSxDQUFDQSxzQkFBc0JBLEdBQUdBLElBQUlBLENBQUNBLHFCQUFxQkEsSUFBSUEsS0FBS0EsQ0FBQ0E7UUFFbEVBLEFBQ0FBLDJHQUQyR0E7UUFDM0dBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLHNCQUFzQkEsSUFBSUEsSUFBSUEsQ0FBQ0EsUUFBUUEsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQTtZQUMzRUEsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxHQUFJQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxpQkFBaUJBLENBQUNBO0lBQzVEQSxDQUFDQTtJQUVEcEU7O09BRUdBO0lBQ0lBLGlEQUF5QkEsR0FBaENBLFVBQWlDQSxTQUFtQkEsRUFBRUEsS0FBV0E7UUFFaEVxRSxJQUFJQSxZQUFZQSxHQUFXQSxJQUFJQSxDQUFDQSxPQUFPQSxJQUFJQSxLQUFLQSxDQUFDQTtRQUVqREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsWUFBWUEsSUFBSUEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7WUFDaENBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLGFBQWFBLENBQUNBLElBQUlBLFVBQVVBLENBQUNBLFVBQVVBLENBQUNBLGtCQUFrQkEsRUFBRUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFFakZBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLElBQUlBLElBQUlBLENBQUNBLG1CQUFtQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDOUNBLEFBQ0FBLHlDQUR5Q0E7WUFDekNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLHFCQUFxQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxDQUFDQTtZQUU3REEsQUFDQUEsMENBRDBDQTtZQUMxQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0E7Z0JBQ25CQSxJQUFJQSxDQUFDQSxrQkFBa0JBLENBQUNBLElBQUlBLENBQUNBLG1CQUFtQkEsQ0FBQ0EsQ0FBQ0E7UUFDcERBLENBQUNBO1FBRURBLEFBQ0FBLCtEQUQrREE7UUFDL0RBLElBQUlBLENBQUNBLG1CQUFtQkEsR0FBR0EsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxJQUFJQSxTQUFTQSxDQUFDQTtRQUVoRUEsQUFDQUEsY0FEY0E7UUFDZEEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsWUFBWUEsQ0FBQ0E7WUFDaEJBLElBQUlBLENBQUNBLE9BQU9BLEdBQUdBLEtBQUtBLENBQUNBO1FBRXRCQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxJQUFJQSxJQUFJQSxDQUFDQSxtQkFBbUJBLENBQUNBLENBQUNBLENBQUNBO1lBQzlDQSxBQUNBQSwrQkFEK0JBO1lBQy9CQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxtQkFBbUJBLENBQUNBLElBQUlBLENBQUNBLG1CQUFtQkEsQ0FBQ0EsQ0FBQ0E7WUFFM0RBLEFBQ0FBLG9DQURvQ0E7WUFDcENBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBO2dCQUNuQkEsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxJQUFJQSxDQUFDQSxtQkFBbUJBLENBQUNBLENBQUNBO1FBQ2xEQSxDQUFDQTtRQUVEQSxFQUFFQSxDQUFDQSxDQUFDQSxZQUFZQSxJQUFJQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQTtZQUNoQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsYUFBYUEsQ0FBQ0EsSUFBSUEsVUFBVUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsY0FBY0EsRUFBRUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFFN0VBLEVBQUVBLENBQUNBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLENBQUNBO1lBQ2xCQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxxQkFBcUJBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLGlCQUFpQkEsQ0FBQ0E7Z0JBQzFEQSxJQUFJQSxDQUFDQSx5QkFBeUJBLEVBQUVBLENBQUNBO1lBRWxDQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxxQkFBcUJBLENBQUNBO2dCQUM5QkEsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxFQUFFQSxDQUFDQTtRQUMzQkEsQ0FBQ0E7SUFDRkEsQ0FBQ0E7SUFFRHJFOztPQUVHQTtJQUNJQSxrREFBMEJBLEdBQWpDQSxVQUFrQ0EsS0FBYUE7UUFFOUNzRSxJQUFJQSxDQUFDQSxvQkFBb0JBLEdBQUdBLElBQUlBLENBQUNBLG1CQUFtQkEsSUFBSUEsS0FBS0EsQ0FBQ0E7SUFDL0RBLENBQUNBO0lBRUR0RTs7T0FFR0E7SUFDSUEsd0NBQWdCQSxHQUF2QkE7UUFHQ3VFLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBO1FBQ3RCQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQTtRQUN0QkEsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7UUFFdEJBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBO1FBQzlCQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQTtRQUM5QkEsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0E7UUFFOUJBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBO1FBQzVCQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQTtRQUM1QkEsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7UUFFNUJBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLG9CQUFvQkEsQ0FBQ0EsQ0FBQ0E7UUFFcERBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBLENBQUNBO1lBQ3RCQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxrQkFBa0JBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLFFBQVFBLEVBQUVBLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLFFBQVFBLEVBQUVBLENBQUNBLElBQUlBLENBQUNB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QUFDQSxjQUFjQSxJQUFJQSxJQUFJQSxDQUFDQTtZQUMvQkEsSUFBSUEsQ0FBQ0EsY0FBY0EsR0FBR0EsSUFBSUEsTUFBTUEsRUFBRUEsQ0FBQ0E7SUFDckNBLENBQUNBO0lBQ0ZqRyxvQkFBQ0E7QUFBREEsQ0Exb0VBLEFBMG9FQ0EsRUExb0UyQixjQUFjLEVBMG9FekM7QUFFRCxBQUF1QixpQkFBZCxhQUFhLENBQUMiLCJmaWxlIjoiYmFzZS9EaXNwbGF5T2JqZWN0LmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCbGVuZE1vZGVcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2Jhc2UvQmxlbmRNb2RlXCIpO1xuaW1wb3J0IEJveFx0XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vQm94XCIpO1xuaW1wb3J0IFNwaGVyZVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1NwaGVyZVwiKTtcbmltcG9ydCBNYXRoQ29uc3RzXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL01hdGhDb25zdHNcIik7XG5pbXBvcnQgTWF0cml4M0RcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9NYXRyaXgzRFwiKTtcbmltcG9ydCBNYXRyaXgzRFV0aWxzXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9NYXRyaXgzRFV0aWxzXCIpO1xuaW1wb3J0IFBvaW50XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vUG9pbnRcIik7XG5pbXBvcnQgUmVjdGFuZ2xlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1JlY3RhbmdsZVwiKTtcbmltcG9ydCBWZWN0b3IzRFx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1ZlY3RvcjNEXCIpO1xuaW1wb3J0IE5hbWVkQXNzZXRCYXNlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbGlicmFyeS9OYW1lZEFzc2V0QmFzZVwiKTtcbmltcG9ydCBBYnN0cmFjdE1ldGhvZEVycm9yXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2Vycm9ycy9BYnN0cmFjdE1ldGhvZEVycm9yXCIpO1xuXG5pbXBvcnQgRGlzcGxheU9iamVjdENvbnRhaW5lclx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvY29udGFpbmVycy9EaXNwbGF5T2JqZWN0Q29udGFpbmVyXCIpO1xuaW1wb3J0IFNjZW5lXHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2NvbnRhaW5lcnMvU2NlbmVcIik7XG5pbXBvcnQgQ29udHJvbGxlckJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9jb250cm9sbGVycy9Db250cm9sbGVyQmFzZVwiKTtcbmltcG9ydCBBbGlnbm1lbnRNb2RlXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvYmFzZS9BbGlnbm1lbnRNb2RlXCIpO1xuaW1wb3J0IExvYWRlckluZm9cdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvTG9hZGVySW5mb1wiKTtcbmltcG9ydCBPcmllbnRhdGlvbk1vZGVcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL09yaWVudGF0aW9uTW9kZVwiKTtcbmltcG9ydCBJQml0bWFwRHJhd2FibGVcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9iYXNlL0lCaXRtYXBEcmF3YWJsZVwiKTtcbmltcG9ydCBUcmFuc2Zvcm1cdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2Jhc2UvVHJhbnNmb3JtXCIpO1xuaW1wb3J0IEVudGl0eU5vZGVcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3BhcnRpdGlvbi9FbnRpdHlOb2RlXCIpO1xuaW1wb3J0IFBhcnRpdGlvblx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcGFydGl0aW9uL1BhcnRpdGlvblwiKTtcbmltcG9ydCBJUGlja2luZ0NvbGxpZGVyXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcGljay9JUGlja2luZ0NvbGxpZGVyXCIpO1xuaW1wb3J0IFBpY2tpbmdDb2xsaXNpb25WT1x0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9waWNrL1BpY2tpbmdDb2xsaXNpb25WT1wiKTtcbmltcG9ydCBJUmVuZGVyYWJsZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcG9vbC9JUmVuZGVyYWJsZVwiKTtcbmltcG9ydCBDYW1lcmFcdFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvZW50aXRpZXMvQ2FtZXJhXCIpO1xuaW1wb3J0IERpc3BsYXlPYmplY3RFdmVudFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9ldmVudHMvRGlzcGxheU9iamVjdEV2ZW50XCIpO1xuaW1wb3J0IFNjZW5lRXZlbnRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2V2ZW50cy9TY2VuZUV2ZW50XCIpO1xuaW1wb3J0IFByZWZhYkJhc2VcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3ByZWZhYnMvUHJlZmFiQmFzZVwiKTtcblxuLyoqXG4gKiBUaGUgRGlzcGxheU9iamVjdCBjbGFzcyBpcyB0aGUgYmFzZSBjbGFzcyBmb3IgYWxsIG9iamVjdHMgdGhhdCBjYW4gYmVcbiAqIHBsYWNlZCBvbiB0aGUgZGlzcGxheSBsaXN0LiBUaGUgZGlzcGxheSBsaXN0IG1hbmFnZXMgYWxsIG9iamVjdHMgZGlzcGxheWVkXG4gKiBpbiBmbGFzaC4gVXNlIHRoZSBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIGNsYXNzIHRvIGFycmFuZ2UgdGhlXG4gKiBkaXNwbGF5IG9iamVjdHMgaW4gdGhlIGRpc3BsYXkgbGlzdC4gRGlzcGxheU9iamVjdENvbnRhaW5lciBvYmplY3RzIGNhblxuICogaGF2ZSBjaGlsZCBkaXNwbGF5IG9iamVjdHMsIHdoaWxlIG90aGVyIGRpc3BsYXkgb2JqZWN0cywgc3VjaCBhcyBTaGFwZSBhbmRcbiAqIFRleHRGaWVsZCBvYmplY3RzLCBhcmUgXCJsZWFmXCIgbm9kZXMgdGhhdCBoYXZlIG9ubHkgcGFyZW50cyBhbmQgc2libGluZ3MsIG5vXG4gKiBjaGlsZHJlbi5cbiAqXG4gKiA8cD5UaGUgRGlzcGxheU9iamVjdCBjbGFzcyBzdXBwb3J0cyBiYXNpYyBmdW5jdGlvbmFsaXR5IGxpa2UgdGhlIDxpPng8L2k+XG4gKiBhbmQgPGk+eTwvaT4gcG9zaXRpb24gb2YgYW4gb2JqZWN0LCBhcyB3ZWxsIGFzIG1vcmUgYWR2YW5jZWQgcHJvcGVydGllcyBvZlxuICogdGhlIG9iamVjdCBzdWNoIGFzIGl0cyB0cmFuc2Zvcm1hdGlvbiBtYXRyaXguIDwvcD5cbiAqXG4gKiA8cD5EaXNwbGF5T2JqZWN0IGlzIGFuIGFic3RyYWN0IGJhc2UgY2xhc3M7IHRoZXJlZm9yZSwgeW91IGNhbm5vdCBjYWxsXG4gKiBEaXNwbGF5T2JqZWN0IGRpcmVjdGx5LiBJbnZva2luZyA8Y29kZT5uZXcgRGlzcGxheU9iamVjdCgpPC9jb2RlPiB0aHJvd3MgYW5cbiAqIDxjb2RlPkFyZ3VtZW50RXJyb3I8L2NvZGU+IGV4Y2VwdGlvbi4gPC9wPlxuICpcbiAqIDxwPkFsbCBkaXNwbGF5IG9iamVjdHMgaW5oZXJpdCBmcm9tIHRoZSBEaXNwbGF5T2JqZWN0IGNsYXNzLjwvcD5cbiAqXG4gKiA8cD5UaGUgRGlzcGxheU9iamVjdCBjbGFzcyBpdHNlbGYgZG9lcyBub3QgaW5jbHVkZSBhbnkgQVBJcyBmb3IgcmVuZGVyaW5nXG4gKiBjb250ZW50IG9uc2NyZWVuLiBGb3IgdGhhdCByZWFzb24sIGlmIHlvdSB3YW50IGNyZWF0ZSBhIGN1c3RvbSBzdWJjbGFzcyBvZlxuICogdGhlIERpc3BsYXlPYmplY3QgY2xhc3MsIHlvdSB3aWxsIHdhbnQgdG8gZXh0ZW5kIG9uZSBvZiBpdHMgc3ViY2xhc3NlcyB0aGF0XG4gKiBkbyBoYXZlIEFQSXMgZm9yIHJlbmRlcmluZyBjb250ZW50IG9uc2NyZWVuLCBzdWNoIGFzIHRoZSBTaGFwZSwgU3ByaXRlLFxuICogQml0bWFwLCBTaW1wbGVCdXR0b24sIFRleHRGaWVsZCwgb3IgTW92aWVDbGlwIGNsYXNzLjwvcD5cbiAqXG4gKiA8cD5UaGUgRGlzcGxheU9iamVjdCBjbGFzcyBjb250YWlucyBzZXZlcmFsIGJyb2FkY2FzdCBldmVudHMuIE5vcm1hbGx5LCB0aGVcbiAqIHRhcmdldCBvZiBhbnkgcGFydGljdWxhciBldmVudCBpcyBhIHNwZWNpZmljIERpc3BsYXlPYmplY3QgaW5zdGFuY2UuIEZvclxuICogZXhhbXBsZSwgdGhlIHRhcmdldCBvZiBhbiA8Y29kZT5hZGRlZDwvY29kZT4gZXZlbnQgaXMgdGhlIHNwZWNpZmljXG4gKiBEaXNwbGF5T2JqZWN0IGluc3RhbmNlIHRoYXQgd2FzIGFkZGVkIHRvIHRoZSBkaXNwbGF5IGxpc3QuIEhhdmluZyBhIHNpbmdsZVxuICogdGFyZ2V0IHJlc3RyaWN0cyB0aGUgcGxhY2VtZW50IG9mIGV2ZW50IGxpc3RlbmVycyB0byB0aGF0IHRhcmdldCBhbmQgaW5cbiAqIHNvbWUgY2FzZXMgdGhlIHRhcmdldCdzIGFuY2VzdG9ycyBvbiB0aGUgZGlzcGxheSBsaXN0LiBXaXRoIGJyb2FkY2FzdFxuICogZXZlbnRzLCBob3dldmVyLCB0aGUgdGFyZ2V0IGlzIG5vdCBhIHNwZWNpZmljIERpc3BsYXlPYmplY3QgaW5zdGFuY2UsIGJ1dFxuICogcmF0aGVyIGFsbCBEaXNwbGF5T2JqZWN0IGluc3RhbmNlcywgaW5jbHVkaW5nIHRob3NlIHRoYXQgYXJlIG5vdCBvbiB0aGVcbiAqIGRpc3BsYXkgbGlzdC4gVGhpcyBtZWFucyB0aGF0IHlvdSBjYW4gYWRkIGEgbGlzdGVuZXIgdG8gYW55IERpc3BsYXlPYmplY3RcbiAqIGluc3RhbmNlIHRvIGxpc3RlbiBmb3IgYnJvYWRjYXN0IGV2ZW50cy4gSW4gYWRkaXRpb24gdG8gdGhlIGJyb2FkY2FzdFxuICogZXZlbnRzIGxpc3RlZCBpbiB0aGUgRGlzcGxheU9iamVjdCBjbGFzcydzIEV2ZW50cyB0YWJsZSwgdGhlIERpc3BsYXlPYmplY3RcbiAqIGNsYXNzIGFsc28gaW5oZXJpdHMgdHdvIGJyb2FkY2FzdCBldmVudHMgZnJvbSB0aGUgRXZlbnREaXNwYXRjaGVyIGNsYXNzOlxuICogPGNvZGU+YWN0aXZhdGU8L2NvZGU+IGFuZCA8Y29kZT5kZWFjdGl2YXRlPC9jb2RlPi48L3A+XG4gKlxuICogPHA+U29tZSBwcm9wZXJ0aWVzIHByZXZpb3VzbHkgdXNlZCBpbiB0aGUgQWN0aW9uU2NyaXB0IDEuMCBhbmQgMi4wXG4gKiBNb3ZpZUNsaXAsIFRleHRGaWVsZCwgYW5kIEJ1dHRvbiBjbGFzc2VzKHN1Y2ggYXMgPGNvZGU+X2FscGhhPC9jb2RlPixcbiAqIDxjb2RlPl9oZWlnaHQ8L2NvZGU+LCA8Y29kZT5fbmFtZTwvY29kZT4sIDxjb2RlPl93aWR0aDwvY29kZT4sXG4gKiA8Y29kZT5feDwvY29kZT4sIDxjb2RlPl95PC9jb2RlPiwgYW5kIG90aGVycykgaGF2ZSBlcXVpdmFsZW50cyBpbiB0aGVcbiAqIEFjdGlvblNjcmlwdCAzLjAgRGlzcGxheU9iamVjdCBjbGFzcyB0aGF0IGFyZSByZW5hbWVkIHNvIHRoYXQgdGhleSBub1xuICogbG9uZ2VyIGJlZ2luIHdpdGggdGhlIHVuZGVyc2NvcmUoXykgY2hhcmFjdGVyLjwvcD5cbiAqXG4gKiA8cD5Gb3IgbW9yZSBpbmZvcm1hdGlvbiwgc2VlIHRoZSBcIkRpc3BsYXkgUHJvZ3JhbW1pbmdcIiBjaGFwdGVyIG9mIHRoZVxuICogPGk+QWN0aW9uU2NyaXB0IDMuMCBEZXZlbG9wZXIncyBHdWlkZTwvaT4uPC9wPlxuICogXG4gKiBAZXZlbnQgYWRkZWQgICAgICAgICAgICBEaXNwYXRjaGVkIHdoZW4gYSBkaXNwbGF5IG9iamVjdCBpcyBhZGRlZCB0byB0aGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXkgbGlzdC4gVGhlIGZvbGxvd2luZyBtZXRob2RzIHRyaWdnZXIgdGhpc1xuICogICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQ6XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLmFkZENoaWxkKCk8L2NvZGU+LFxuICogICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+RGlzcGxheU9iamVjdENvbnRhaW5lci5hZGRDaGlsZEF0KCk8L2NvZGU+LlxuICogQGV2ZW50IGFkZGVkVG9TY2VuZSAgICAgRGlzcGF0Y2hlZCB3aGVuIGEgZGlzcGxheSBvYmplY3QgaXMgYWRkZWQgdG8gdGhlIG9uXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBzY2VuZSBkaXNwbGF5IGxpc3QsIGVpdGhlciBkaXJlY3RseSBvciB0aHJvdWdoIHRoZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgYWRkaXRpb24gb2YgYSBzdWIgdHJlZSBpbiB3aGljaCB0aGUgZGlzcGxheSBvYmplY3RcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGlzIGNvbnRhaW5lZC4gVGhlIGZvbGxvd2luZyBtZXRob2RzIHRyaWdnZXIgdGhpc1xuICogICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQ6XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLmFkZENoaWxkKCk8L2NvZGU+LFxuICogICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+RGlzcGxheU9iamVjdENvbnRhaW5lci5hZGRDaGlsZEF0KCk8L2NvZGU+LlxuICogQGV2ZW50IGVudGVyRnJhbWUgICAgICAgW2Jyb2FkY2FzdCBldmVudF0gRGlzcGF0Y2hlZCB3aGVuIHRoZSBwbGF5aGVhZCBpc1xuICogICAgICAgICAgICAgICAgICAgICAgICAgZW50ZXJpbmcgYSBuZXcgZnJhbWUuIElmIHRoZSBwbGF5aGVhZCBpcyBub3RcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIG1vdmluZywgb3IgaWYgdGhlcmUgaXMgb25seSBvbmUgZnJhbWUsIHRoaXMgZXZlbnRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGlzIGRpc3BhdGNoZWQgY29udGludW91c2x5IGluIGNvbmp1bmN0aW9uIHdpdGggdGhlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBmcmFtZSByYXRlLiBUaGlzIGV2ZW50IGlzIGEgYnJvYWRjYXN0IGV2ZW50LCB3aGljaFxuICogICAgICAgICAgICAgICAgICAgICAgICAgbWVhbnMgdGhhdCBpdCBpcyBkaXNwYXRjaGVkIGJ5IGFsbCBkaXNwbGF5IG9iamVjdHNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIHdpdGggYSBsaXN0ZW5lciByZWdpc3RlcmVkIGZvciB0aGlzIGV2ZW50LlxuICogQGV2ZW50IGV4aXRGcmFtZSAgICAgICAgW2Jyb2FkY2FzdCBldmVudF0gRGlzcGF0Y2hlZCB3aGVuIHRoZSBwbGF5aGVhZCBpc1xuICogICAgICAgICAgICAgICAgICAgICAgICAgZXhpdGluZyB0aGUgY3VycmVudCBmcmFtZS4gQWxsIGZyYW1lIHNjcmlwdHMgaGF2ZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgYmVlbiBydW4uIElmIHRoZSBwbGF5aGVhZCBpcyBub3QgbW92aW5nLCBvciBpZlxuICogICAgICAgICAgICAgICAgICAgICAgICAgdGhlcmUgaXMgb25seSBvbmUgZnJhbWUsIHRoaXMgZXZlbnQgaXMgZGlzcGF0Y2hlZFxuICogICAgICAgICAgICAgICAgICAgICAgICAgY29udGludW91c2x5IGluIGNvbmp1bmN0aW9uIHdpdGggdGhlIGZyYW1lIHJhdGUuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBUaGlzIGV2ZW50IGlzIGEgYnJvYWRjYXN0IGV2ZW50LCB3aGljaCBtZWFucyB0aGF0XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBpdCBpcyBkaXNwYXRjaGVkIGJ5IGFsbCBkaXNwbGF5IG9iamVjdHMgd2l0aCBhXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lciByZWdpc3RlcmVkIGZvciB0aGlzIGV2ZW50LlxuICogQGV2ZW50IGZyYW1lQ29uc3RydWN0ZWQgW2Jyb2FkY2FzdCBldmVudF0gRGlzcGF0Y2hlZCBhZnRlciB0aGUgY29uc3RydWN0b3JzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBvZiBmcmFtZSBkaXNwbGF5IG9iamVjdHMgaGF2ZSBydW4gYnV0IGJlZm9yZSBmcmFtZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgc2NyaXB0cyBoYXZlIHJ1bi4gSWYgdGhlIHBsYXloZWFkIGlzIG5vdCBtb3ZpbmcsIG9yXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBpZiB0aGVyZSBpcyBvbmx5IG9uZSBmcmFtZSwgdGhpcyBldmVudCBpc1xuICogICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2hlZCBjb250aW51b3VzbHkgaW4gY29uanVuY3Rpb24gd2l0aCB0aGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGZyYW1lIHJhdGUuIFRoaXMgZXZlbnQgaXMgYSBicm9hZGNhc3QgZXZlbnQsIHdoaWNoXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBtZWFucyB0aGF0IGl0IGlzIGRpc3BhdGNoZWQgYnkgYWxsIGRpc3BsYXkgb2JqZWN0c1xuICogICAgICAgICAgICAgICAgICAgICAgICAgd2l0aCBhIGxpc3RlbmVyIHJlZ2lzdGVyZWQgZm9yIHRoaXMgZXZlbnQuXG4gKiBAZXZlbnQgcmVtb3ZlZCAgICAgICAgICBEaXNwYXRjaGVkIHdoZW4gYSBkaXNwbGF5IG9iamVjdCBpcyBhYm91dCB0byBiZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlZCBmcm9tIHRoZSBkaXNwbGF5IGxpc3QuIFR3byBtZXRob2RzIG9mIHRoZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgRGlzcGxheU9iamVjdENvbnRhaW5lciBjbGFzcyBnZW5lcmF0ZSB0aGlzIGV2ZW50OlxuICogICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+cmVtb3ZlQ2hpbGQoKTwvY29kZT4gYW5kXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5yZW1vdmVDaGlsZEF0KCk8L2NvZGU+LlxuICpcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxwPlRoZSBmb2xsb3dpbmcgbWV0aG9kcyBvZiBhXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIG9iamVjdCBhbHNvIGdlbmVyYXRlIHRoaXNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50IGlmIGFuIG9iamVjdCBtdXN0IGJlIHJlbW92ZWQgdG8gbWFrZSByb29tIGZvclxuICogICAgICAgICAgICAgICAgICAgICAgICAgdGhlIG5ldyBvYmplY3Q6IDxjb2RlPmFkZENoaWxkKCk8L2NvZGU+LFxuICogICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+YWRkQ2hpbGRBdCgpPC9jb2RlPiwgYW5kXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5zZXRDaGlsZEluZGV4KCk8L2NvZGU+LiA8L3A+XG4gKiBAZXZlbnQgcmVtb3ZlZEZyb21TY2VuZSBEaXNwYXRjaGVkIHdoZW4gYSBkaXNwbGF5IG9iamVjdCBpcyBhYm91dCB0byBiZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlZCBmcm9tIHRoZSBkaXNwbGF5IGxpc3QsIGVpdGhlciBkaXJlY3RseSBvclxuICogICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3VnaCB0aGUgcmVtb3ZhbCBvZiBhIHN1YiB0cmVlIGluIHdoaWNoIHRoZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheSBvYmplY3QgaXMgY29udGFpbmVkLiBUd28gbWV0aG9kcyBvZiB0aGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIERpc3BsYXlPYmplY3RDb250YWluZXIgY2xhc3MgZ2VuZXJhdGUgdGhpcyBldmVudDpcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPnJlbW92ZUNoaWxkKCk8L2NvZGU+IGFuZFxuICogICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+cmVtb3ZlQ2hpbGRBdCgpPC9jb2RlPi5cbiAqXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICA8cD5UaGUgZm9sbG93aW5nIG1ldGhvZHMgb2YgYVxuICogICAgICAgICAgICAgICAgICAgICAgICAgRGlzcGxheU9iamVjdENvbnRhaW5lciBvYmplY3QgYWxzbyBnZW5lcmF0ZSB0aGlzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBldmVudCBpZiBhbiBvYmplY3QgbXVzdCBiZSByZW1vdmVkIHRvIG1ha2Ugcm9vbSBmb3JcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIHRoZSBuZXcgb2JqZWN0OiA8Y29kZT5hZGRDaGlsZCgpPC9jb2RlPixcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPmFkZENoaWxkQXQoKTwvY29kZT4sIGFuZFxuICogICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+c2V0Q2hpbGRJbmRleCgpPC9jb2RlPi4gPC9wPlxuICogQGV2ZW50IHJlbmRlciAgICAgICAgICAgW2Jyb2FkY2FzdCBldmVudF0gRGlzcGF0Y2hlZCB3aGVuIHRoZSBkaXNwbGF5IGxpc3RcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGlzIGFib3V0IHRvIGJlIHVwZGF0ZWQgYW5kIHJlbmRlcmVkLiBUaGlzIGV2ZW50XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlcyB0aGUgbGFzdCBvcHBvcnR1bml0eSBmb3Igb2JqZWN0cyBsaXN0ZW5pbmdcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGZvciB0aGlzIGV2ZW50IHRvIG1ha2UgY2hhbmdlcyBiZWZvcmUgdGhlIGRpc3BsYXlcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3QgaXMgcmVuZGVyZWQuIFlvdSBtdXN0IGNhbGwgdGhlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5pbnZhbGlkYXRlKCk8L2NvZGU+IG1ldGhvZCBvZiB0aGUgU2NlbmVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdCBlYWNoIHRpbWUgeW91IHdhbnQgYSA8Y29kZT5yZW5kZXI8L2NvZGU+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBldmVudCB0byBiZSBkaXNwYXRjaGVkLiA8Y29kZT5SZW5kZXI8L2NvZGU+IGV2ZW50c1xuICogICAgICAgICAgICAgICAgICAgICAgICAgYXJlIGRpc3BhdGNoZWQgdG8gYW4gb2JqZWN0IG9ubHkgaWYgdGhlcmUgaXMgbXV0dWFsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICB0cnVzdCBiZXR3ZWVuIGl0IGFuZCB0aGUgb2JqZWN0IHRoYXQgY2FsbGVkXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT5TY2VuZS5pbnZhbGlkYXRlKCk8L2NvZGU+LiBUaGlzIGV2ZW50IGlzIGFcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGJyb2FkY2FzdCBldmVudCwgd2hpY2ggbWVhbnMgdGhhdCBpdCBpcyBkaXNwYXRjaGVkXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBieSBhbGwgZGlzcGxheSBvYmplY3RzIHdpdGggYSBsaXN0ZW5lciByZWdpc3RlcmVkXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgdGhpcyBldmVudC5cbiAqXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICA8cD48Yj5Ob3RlOiA8L2I+VGhpcyBldmVudCBpcyBub3QgZGlzcGF0Y2hlZCBpZiB0aGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXkgaXMgbm90IHJlbmRlcmluZy4gVGhpcyBpcyB0aGUgY2FzZSB3aGVuIHRoZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudCBpcyBlaXRoZXIgbWluaW1pemVkIG9yIG9ic2N1cmVkLiA8L3A+XG4gKi9cbmNsYXNzIERpc3BsYXlPYmplY3QgZXh0ZW5kcyBOYW1lZEFzc2V0QmFzZSBpbXBsZW1lbnRzIElCaXRtYXBEcmF3YWJsZVxue1xuXHRwcml2YXRlIF9sb2FkZXJJbmZvOkxvYWRlckluZm87XG5cdHByaXZhdGUgX21vdXNlWDpudW1iZXI7XG5cdHByaXZhdGUgX21vdXNlWTpudW1iZXI7XG5cdHByaXZhdGUgX3Jvb3Q6RGlzcGxheU9iamVjdENvbnRhaW5lcjtcblx0cHJpdmF0ZSBfYm91bmRzOlJlY3RhbmdsZTtcblx0cHVibGljIF9wQm94Qm91bmRzOkJveDtcblx0cHJpdmF0ZSBfYm94Qm91bmRzSW52YWxpZDpib29sZWFuID0gdHJ1ZTtcblx0cHVibGljIF9wU3BoZXJlQm91bmRzOlNwaGVyZTtcblx0cHJpdmF0ZSBfc3BoZXJlQm91bmRzSW52YWxpZDpib29sZWFuID0gdHJ1ZTtcblx0cHJpdmF0ZSBfZGVidWdWaXNpYmxlOmJvb2xlYW47XG5cblx0cHVibGljIF9wU2NlbmU6U2NlbmU7XG5cdHB1YmxpYyBfcFBhcmVudDpEaXNwbGF5T2JqZWN0Q29udGFpbmVyO1xuXHRwdWJsaWMgX3BTY2VuZVRyYW5zZm9ybTpNYXRyaXgzRCA9IG5ldyBNYXRyaXgzRCgpO1xuXHRwdWJsaWMgX3BTY2VuZVRyYW5zZm9ybURpcnR5OmJvb2xlYW4gPSB0cnVlO1xuXHRwdWJsaWMgX3BJc0VudGl0eTpib29sZWFuO1xuXG5cdHByaXZhdGUgX2V4cGxpY2l0UGFydGl0aW9uOlBhcnRpdGlvbjtcblx0cHVibGljIF9wSW1wbGljaXRQYXJ0aXRpb246UGFydGl0aW9uO1xuXG5cdHByaXZhdGUgX3NjZW5lVHJhbnNmb3JtQ2hhbmdlZDpEaXNwbGF5T2JqZWN0RXZlbnQ7XG5cdHByaXZhdGUgX3NjZW5lY2hhbmdlZDpEaXNwbGF5T2JqZWN0RXZlbnQ7XG5cdHByaXZhdGUgX3RyYW5zZm9ybTpUcmFuc2Zvcm07XG5cdHByaXZhdGUgX21hdHJpeDNEOk1hdHJpeDNEID0gbmV3IE1hdHJpeDNEKCk7XG5cdHByaXZhdGUgX21hdHJpeDNERGlydHk6Ym9vbGVhbiA9IHRydWU7XG5cblx0cHJpdmF0ZSBfaW52ZXJzZVNjZW5lVHJhbnNmb3JtOk1hdHJpeDNEID0gbmV3IE1hdHJpeDNEKCk7XG5cdHByaXZhdGUgX2ludmVyc2VTY2VuZVRyYW5zZm9ybURpcnR5OmJvb2xlYW4gPSB0cnVlO1xuXHRwcml2YXRlIF9zY2VuZVBvc2l0aW9uOlZlY3RvcjNEID0gbmV3IFZlY3RvcjNEKCk7XG5cdHByaXZhdGUgX3NjZW5lUG9zaXRpb25EaXJ0eTpib29sZWFuID0gdHJ1ZTtcblx0cHJpdmF0ZSBfZXhwbGljaXRWaXNpYmlsaXR5OmJvb2xlYW4gPSB0cnVlO1xuXHRwdWJsaWMgX3BJbXBsaWNpdFZpc2liaWxpdHk6Ym9vbGVhbiA9IHRydWU7XG5cdHByaXZhdGUgX2V4cGxpY2l0TW91c2VFbmFibGVkOmJvb2xlYW4gPSB0cnVlO1xuXHRwdWJsaWMgX3BJbXBsaWNpdE1vdXNlRW5hYmxlZDpib29sZWFuID0gdHJ1ZTtcblx0cHJpdmF0ZSBfbGlzdGVuVG9TY2VuZVRyYW5zZm9ybUNoYW5nZWQ6Ym9vbGVhbjtcblx0cHJpdmF0ZSBfbGlzdGVuVG9TY2VuZUNoYW5nZWQ6Ym9vbGVhbjtcblxuXHRwcml2YXRlIF9wb3NpdGlvbkRpcnR5OmJvb2xlYW4gPSB0cnVlO1xuXHRwcml2YXRlIF9yb3RhdGlvbkRpcnR5OmJvb2xlYW4gPSB0cnVlO1xuXHRwcml2YXRlIF9zY2FsZURpcnR5OmJvb2xlYW4gPSB0cnVlO1xuXG5cdHByaXZhdGUgX3Bvc2l0aW9uQ2hhbmdlZDpEaXNwbGF5T2JqZWN0RXZlbnQ7XG5cdHByaXZhdGUgX3JvdGF0aW9uQ2hhbmdlZDpEaXNwbGF5T2JqZWN0RXZlbnQ7XG5cdHByaXZhdGUgX3NjYWxlQ2hhbmdlZDpEaXNwbGF5T2JqZWN0RXZlbnQ7XG5cblx0cHJpdmF0ZSBfcm90YXRpb25YOm51bWJlciA9IDA7XG5cdHByaXZhdGUgX3JvdGF0aW9uWTpudW1iZXIgPSAwO1xuXHRwcml2YXRlIF9yb3RhdGlvblo6bnVtYmVyID0gMDtcblx0cHJpdmF0ZSBfZXVsZXJzOlZlY3RvcjNEID0gbmV3IFZlY3RvcjNEKCk7XG5cdHByaXZhdGUgX2ZsaXBZOk1hdHJpeDNEID0gbmV3IE1hdHJpeDNEKCk7XG5cblx0cHJpdmF0ZSBfbGlzdGVuVG9Qb3NpdGlvbkNoYW5nZWQ6Ym9vbGVhbjtcblx0cHJpdmF0ZSBfbGlzdGVuVG9Sb3RhdGlvbkNoYW5nZWQ6Ym9vbGVhbjtcblx0cHJpdmF0ZSBfbGlzdGVuVG9TY2FsZUNoYW5nZWQ6Ym9vbGVhbjtcblx0cHJpdmF0ZSBfek9mZnNldDpudW1iZXIgPSAwO1xuXG5cdHB1YmxpYyBfcFNjYWxlWDpudW1iZXIgPSAxO1xuXHRwdWJsaWMgX3BTY2FsZVk6bnVtYmVyID0gMTtcblx0cHVibGljIF9wU2NhbGVaOm51bWJlciA9IDE7XG5cdHByaXZhdGUgX3g6bnVtYmVyID0gMDtcblx0cHJpdmF0ZSBfeTpudW1iZXIgPSAwO1xuXHRwcml2YXRlIF96Om51bWJlciA9IDA7XG5cdHByaXZhdGUgX3Bpdm90OlZlY3RvcjNEID0gbmV3IFZlY3RvcjNEKCk7XG5cdHByaXZhdGUgX29yaWVudGF0aW9uTWF0cml4Ok1hdHJpeDNEID0gbmV3IE1hdHJpeDNEKCk7XG5cdHByaXZhdGUgX3Bpdm90WmVybzpib29sZWFuID0gdHJ1ZTtcblx0cHJpdmF0ZSBfcGl2b3REaXJ0eTpib29sZWFuID0gdHJ1ZTtcblx0cHJpdmF0ZSBfcG9zOlZlY3RvcjNEID0gbmV3IFZlY3RvcjNEKCk7XG5cdHByaXZhdGUgX3JvdDpWZWN0b3IzRCA9IG5ldyBWZWN0b3IzRCgpO1xuXHRwcml2YXRlIF9zY2E6VmVjdG9yM0QgPSBuZXcgVmVjdG9yM0QoKTtcblx0cHJpdmF0ZSBfdHJhbnNmb3JtQ29tcG9uZW50czpBcnJheTxWZWN0b3IzRD47XG5cblx0cHVibGljIF9wSWdub3JlVHJhbnNmb3JtOmJvb2xlYW4gPSBmYWxzZTtcblxuXHRwcml2YXRlIF9zaGFkZXJQaWNraW5nRGV0YWlsczpib29sZWFuO1xuXG5cdHB1YmxpYyBfcFBpY2tpbmdDb2xsaXNpb25WTzpQaWNraW5nQ29sbGlzaW9uVk87XG5cblx0cHVibGljIF9ib3VuZHNUeXBlOnN0cmluZztcblxuXHRwdWJsaWMgX3BQaWNraW5nQ29sbGlkZXI6SVBpY2tpbmdDb2xsaWRlcjtcblxuXHRwdWJsaWMgX3BSZW5kZXJhYmxlczpBcnJheTxJUmVuZGVyYWJsZT4gPSBuZXcgQXJyYXk8SVJlbmRlcmFibGU+KCk7XG5cdHByaXZhdGUgX2VudGl0eU5vZGVzOkFycmF5PEVudGl0eU5vZGU+ID0gbmV3IEFycmF5PEVudGl0eU5vZGU+KCk7XG5cblx0cHVibGljIF9pU291cmNlUHJlZmFiOlByZWZhYkJhc2U7XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgYWxpZ25tZW50TW9kZTpzdHJpbmcgPSBBbGlnbm1lbnRNb2RlLlJFR0lTVFJBVElPTl9QT0lOVDtcblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHRoZSBhbHBoYSB0cmFuc3BhcmVuY3kgdmFsdWUgb2YgdGhlIG9iamVjdCBzcGVjaWZpZWQuIFZhbGlkXG5cdCAqIHZhbHVlcyBhcmUgMChmdWxseSB0cmFuc3BhcmVudCkgdG8gMShmdWxseSBvcGFxdWUpLiBUaGUgZGVmYXVsdCB2YWx1ZSBpc1xuXHQgKiAxLiBEaXNwbGF5IG9iamVjdHMgd2l0aCA8Y29kZT5hbHBoYTwvY29kZT4gc2V0IHRvIDAgPGk+YXJlPC9pPiBhY3RpdmUsXG5cdCAqIGV2ZW4gdGhvdWdoIHRoZXkgYXJlIGludmlzaWJsZS5cblx0ICovXG5cdHB1YmxpYyBhbHBoYTpudW1iZXI7XG5cblx0LyoqXG5cdCAqIEEgdmFsdWUgZnJvbSB0aGUgQmxlbmRNb2RlIGNsYXNzIHRoYXQgc3BlY2lmaWVzIHdoaWNoIGJsZW5kIG1vZGUgdG8gdXNlLiBBXG5cdCAqIGJpdG1hcCBjYW4gYmUgZHJhd24gaW50ZXJuYWxseSBpbiB0d28gd2F5cy4gSWYgeW91IGhhdmUgYSBibGVuZCBtb2RlXG5cdCAqIGVuYWJsZWQgb3IgYW4gZXh0ZXJuYWwgY2xpcHBpbmcgbWFzaywgdGhlIGJpdG1hcCBpcyBkcmF3biBieSBhZGRpbmcgYVxuXHQgKiBiaXRtYXAtZmlsbGVkIHNxdWFyZSBzaGFwZSB0byB0aGUgdmVjdG9yIHJlbmRlci4gSWYgeW91IGF0dGVtcHQgdG8gc2V0XG5cdCAqIHRoaXMgcHJvcGVydHkgdG8gYW4gaW52YWxpZCB2YWx1ZSwgRmxhc2ggcnVudGltZXMgc2V0IHRoZSB2YWx1ZSB0b1xuXHQgKiA8Y29kZT5CbGVuZE1vZGUuTk9STUFMPC9jb2RlPi5cblx0ICpcblx0ICogPHA+VGhlIDxjb2RlPmJsZW5kTW9kZTwvY29kZT4gcHJvcGVydHkgYWZmZWN0cyBlYWNoIHBpeGVsIG9mIHRoZSBkaXNwbGF5XG5cdCAqIG9iamVjdC4gRWFjaCBwaXhlbCBpcyBjb21wb3NlZCBvZiB0aHJlZSBjb25zdGl0dWVudCBjb2xvcnMocmVkLCBncmVlbixcblx0ICogYW5kIGJsdWUpLCBhbmQgZWFjaCBjb25zdGl0dWVudCBjb2xvciBoYXMgYSB2YWx1ZSBiZXR3ZWVuIDB4MDAgYW5kIDB4RkYuXG5cdCAqIEZsYXNoIFBsYXllciBvciBBZG9iZSBBSVIgY29tcGFyZXMgZWFjaCBjb25zdGl0dWVudCBjb2xvciBvZiBvbmUgcGl4ZWwgaW5cblx0ICogdGhlIG1vdmllIGNsaXAgd2l0aCB0aGUgY29ycmVzcG9uZGluZyBjb2xvciBvZiB0aGUgcGl4ZWwgaW4gdGhlXG5cdCAqIGJhY2tncm91bmQuIEZvciBleGFtcGxlLCBpZiA8Y29kZT5ibGVuZE1vZGU8L2NvZGU+IGlzIHNldCB0b1xuXHQgKiA8Y29kZT5CbGVuZE1vZGUuTElHSFRFTjwvY29kZT4sIEZsYXNoIFBsYXllciBvciBBZG9iZSBBSVIgY29tcGFyZXMgdGhlIHJlZFxuXHQgKiB2YWx1ZSBvZiB0aGUgZGlzcGxheSBvYmplY3Qgd2l0aCB0aGUgcmVkIHZhbHVlIG9mIHRoZSBiYWNrZ3JvdW5kLCBhbmQgdXNlc1xuXHQgKiB0aGUgbGlnaHRlciBvZiB0aGUgdHdvIGFzIHRoZSB2YWx1ZSBmb3IgdGhlIHJlZCBjb21wb25lbnQgb2YgdGhlIGRpc3BsYXllZFxuXHQgKiBjb2xvci48L3A+XG5cdCAqXG5cdCAqIDxwPlRoZSBmb2xsb3dpbmcgdGFibGUgZGVzY3JpYmVzIHRoZSA8Y29kZT5ibGVuZE1vZGU8L2NvZGU+IHNldHRpbmdzLiBUaGVcblx0ICogQmxlbmRNb2RlIGNsYXNzIGRlZmluZXMgc3RyaW5nIHZhbHVlcyB5b3UgY2FuIHVzZS4gVGhlIGlsbHVzdHJhdGlvbnMgaW5cblx0ICogdGhlIHRhYmxlIHNob3cgPGNvZGU+YmxlbmRNb2RlPC9jb2RlPiB2YWx1ZXMgYXBwbGllZCB0byBhIGNpcmN1bGFyIGRpc3BsYXlcblx0ICogb2JqZWN0KDIpIHN1cGVyaW1wb3NlZCBvbiBhbm90aGVyIGRpc3BsYXkgb2JqZWN0KDEpLjwvcD5cblx0ICovXG5cdHB1YmxpYyBibGVuZE1vZGU6QmxlbmRNb2RlO1xuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBib3VuZHNUeXBlKCk6c3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fYm91bmRzVHlwZTtcblx0fVxuXG5cdHB1YmxpYyBzZXQgYm91bmRzVHlwZSh2YWx1ZTpzdHJpbmcpXG5cdHtcblx0XHRpZiAodGhpcy5fYm91bmRzVHlwZSA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX2JvdW5kc1R5cGUgPSB2YWx1ZTtcblxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlQm91bmRzKCk7XG5cblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX2VudGl0eU5vZGVzLmxlbmd0aDtcblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBsZW47IGkrKylcblx0XHRcdHRoaXMuX2VudGl0eU5vZGVzW2ldLnVwZGF0ZUJvdW5kcygpO1xuXHR9XG5cblx0LyoqXG5cdCAqIElmIHNldCB0byA8Y29kZT50cnVlPC9jb2RlPiwgTk1FIHdpbGwgdXNlIHRoZSBzb2Z0d2FyZSByZW5kZXJlciB0byBjYWNoZVxuXHQgKiBhbiBpbnRlcm5hbCBiaXRtYXAgcmVwcmVzZW50YXRpb24gb2YgdGhlIGRpc3BsYXkgb2JqZWN0LiBGb3IgbmF0aXZlIHRhcmdldHMsXG5cdCAqIHRoaXMgaXMgb2Z0ZW4gbXVjaCBzbG93ZXIgdGhhbiB0aGUgZGVmYXVsdCBoYXJkd2FyZSByZW5kZXJlci4gV2hlbiB5b3Vcblx0ICogYXJlIHVzaW5nIHRoZSBGbGFzaCB0YXJnZXQsIHRoaXMgY2FjaGluZyBtYXkgaW5jcmVhc2UgcGVyZm9ybWFuY2UgZm9yIGRpc3BsYXlcblx0ICogb2JqZWN0cyB0aGF0IGNvbnRhaW4gY29tcGxleCB2ZWN0b3IgY29udGVudC5cblx0ICpcblx0ICogPHA+QWxsIHZlY3RvciBkYXRhIGZvciBhIGRpc3BsYXkgb2JqZWN0IHRoYXQgaGFzIGEgY2FjaGVkIGJpdG1hcCBpcyBkcmF3blxuXHQgKiB0byB0aGUgYml0bWFwIGluc3RlYWQgb2YgdGhlIG1haW4gZGlzcGxheS4gSWZcblx0ICogPGNvZGU+Y2FjaGVBc0JpdG1hcE1hdHJpeDwvY29kZT4gaXMgbnVsbCBvciB1bnN1cHBvcnRlZCwgdGhlIGJpdG1hcCBpc1xuXHQgKiB0aGVuIGNvcGllZCB0byB0aGUgbWFpbiBkaXNwbGF5IGFzIHVuc3RyZXRjaGVkLCB1bnJvdGF0ZWQgcGl4ZWxzIHNuYXBwZWRcblx0ICogdG8gdGhlIG5lYXJlc3QgcGl4ZWwgYm91bmRhcmllcy4gUGl4ZWxzIGFyZSBtYXBwZWQgMSB0byAxIHdpdGggdGhlIHBhcmVudFxuXHQgKiBvYmplY3QuIElmIHRoZSBib3VuZHMgb2YgdGhlIGJpdG1hcCBjaGFuZ2UsIHRoZSBiaXRtYXAgaXMgcmVjcmVhdGVkXG5cdCAqIGluc3RlYWQgb2YgYmVpbmcgc3RyZXRjaGVkLjwvcD5cblx0ICpcblx0ICogPHA+SWYgPGNvZGU+Y2FjaGVBc0JpdG1hcE1hdHJpeDwvY29kZT4gaXMgbm9uLW51bGwgYW5kIHN1cHBvcnRlZCwgdGhlXG5cdCAqIG9iamVjdCBpcyBkcmF3biB0byB0aGUgb2ZmLXNjcmVlbiBiaXRtYXAgdXNpbmcgdGhhdCBtYXRyaXggYW5kIHRoZVxuXHQgKiBzdHJldGNoZWQgYW5kL29yIHJvdGF0ZWQgcmVzdWx0cyBvZiB0aGF0IHJlbmRlcmluZyBhcmUgdXNlZCB0byBkcmF3IHRoZVxuXHQgKiBvYmplY3QgdG8gdGhlIG1haW4gZGlzcGxheS48L3A+XG5cdCAqXG5cdCAqIDxwPk5vIGludGVybmFsIGJpdG1hcCBpcyBjcmVhdGVkIHVubGVzcyB0aGUgPGNvZGU+Y2FjaGVBc0JpdG1hcDwvY29kZT5cblx0ICogcHJvcGVydHkgaXMgc2V0IHRvIDxjb2RlPnRydWU8L2NvZGU+LjwvcD5cblx0ICpcblx0ICogPHA+QWZ0ZXIgeW91IHNldCB0aGUgPGNvZGU+Y2FjaGVBc0JpdG1hcDwvY29kZT4gcHJvcGVydHkgdG9cblx0ICogPGNvZGU+dHJ1ZTwvY29kZT4sIHRoZSByZW5kZXJpbmcgZG9lcyBub3QgY2hhbmdlLCBob3dldmVyIHRoZSBkaXNwbGF5XG5cdCAqIG9iamVjdCBwZXJmb3JtcyBwaXhlbCBzbmFwcGluZyBhdXRvbWF0aWNhbGx5LiBUaGUgYW5pbWF0aW9uIHNwZWVkIGNhbiBiZVxuXHQgKiBzaWduaWZpY2FudGx5IGZhc3RlciBkZXBlbmRpbmcgb24gdGhlIGNvbXBsZXhpdHkgb2YgdGhlIHZlY3RvciBjb250ZW50LlxuXHQgKiA8L3A+XG5cdCAqXG5cdCAqIDxwPlRoZSA8Y29kZT5jYWNoZUFzQml0bWFwPC9jb2RlPiBwcm9wZXJ0eSBpcyBhdXRvbWF0aWNhbGx5IHNldCB0b1xuXHQgKiA8Y29kZT50cnVlPC9jb2RlPiB3aGVuZXZlciB5b3UgYXBwbHkgYSBmaWx0ZXIgdG8gYSBkaXNwbGF5IG9iamVjdCh3aGVuXG5cdCAqIGl0cyA8Y29kZT5maWx0ZXI8L2NvZGU+IGFycmF5IGlzIG5vdCBlbXB0eSksIGFuZCBpZiBhIGRpc3BsYXkgb2JqZWN0IGhhcyBhXG5cdCAqIGZpbHRlciBhcHBsaWVkIHRvIGl0LCA8Y29kZT5jYWNoZUFzQml0bWFwPC9jb2RlPiBpcyByZXBvcnRlZCBhc1xuXHQgKiA8Y29kZT50cnVlPC9jb2RlPiBmb3IgdGhhdCBkaXNwbGF5IG9iamVjdCwgZXZlbiBpZiB5b3Ugc2V0IHRoZSBwcm9wZXJ0eSB0b1xuXHQgKiA8Y29kZT5mYWxzZTwvY29kZT4uIElmIHlvdSBjbGVhciBhbGwgZmlsdGVycyBmb3IgYSBkaXNwbGF5IG9iamVjdCwgdGhlXG5cdCAqIDxjb2RlPmNhY2hlQXNCaXRtYXA8L2NvZGU+IHNldHRpbmcgY2hhbmdlcyB0byB3aGF0IGl0IHdhcyBsYXN0IHNldCB0by48L3A+XG5cdCAqXG5cdCAqIDxwPkEgZGlzcGxheSBvYmplY3QgZG9lcyBub3QgdXNlIGEgYml0bWFwIGV2ZW4gaWYgdGhlXG5cdCAqIDxjb2RlPmNhY2hlQXNCaXRtYXA8L2NvZGU+IHByb3BlcnR5IGlzIHNldCB0byA8Y29kZT50cnVlPC9jb2RlPiBhbmRcblx0ICogaW5zdGVhZCByZW5kZXJzIGZyb20gdmVjdG9yIGRhdGEgaW4gdGhlIGZvbGxvd2luZyBjYXNlczo8L3A+XG5cdCAqXG5cdCAqIDx1bD5cblx0ICogICA8bGk+VGhlIGJpdG1hcCBpcyB0b28gbGFyZ2UuIEluIEFJUiAxLjUgYW5kIEZsYXNoIFBsYXllciAxMCwgdGhlIG1heGltdW1cblx0ICogc2l6ZSBmb3IgYSBiaXRtYXAgaW1hZ2UgaXMgOCwxOTEgcGl4ZWxzIGluIHdpZHRoIG9yIGhlaWdodCwgYW5kIHRoZSB0b3RhbFxuXHQgKiBudW1iZXIgb2YgcGl4ZWxzIGNhbm5vdCBleGNlZWQgMTYsNzc3LDIxNSBwaXhlbHMuKFNvLCBpZiBhIGJpdG1hcCBpbWFnZVxuXHQgKiBpcyA4LDE5MSBwaXhlbHMgd2lkZSwgaXQgY2FuIG9ubHkgYmUgMiwwNDggcGl4ZWxzIGhpZ2guKSBJbiBGbGFzaCBQbGF5ZXIgOVxuXHQgKiBhbmQgZWFybGllciwgdGhlIGxpbWl0YXRpb24gaXMgaXMgMjg4MCBwaXhlbHMgaW4gaGVpZ2h0IGFuZCAyLDg4MCBwaXhlbHNcblx0ICogaW4gd2lkdGguPC9saT5cblx0ICogICA8bGk+VGhlIGJpdG1hcCBmYWlscyB0byBhbGxvY2F0ZShvdXQgb2YgbWVtb3J5IGVycm9yKS4gPC9saT5cblx0ICogPC91bD5cblx0ICpcblx0ICogPHA+VGhlIDxjb2RlPmNhY2hlQXNCaXRtYXA8L2NvZGU+IHByb3BlcnR5IGlzIGJlc3QgdXNlZCB3aXRoIG1vdmllIGNsaXBzXG5cdCAqIHRoYXQgaGF2ZSBtb3N0bHkgc3RhdGljIGNvbnRlbnQgYW5kIHRoYXQgZG8gbm90IHNjYWxlIGFuZCByb3RhdGVcblx0ICogZnJlcXVlbnRseS4gV2l0aCBzdWNoIG1vdmllIGNsaXBzLCA8Y29kZT5jYWNoZUFzQml0bWFwPC9jb2RlPiBjYW4gbGVhZCB0b1xuXHQgKiBwZXJmb3JtYW5jZSBpbmNyZWFzZXMgd2hlbiB0aGUgbW92aWUgY2xpcCBpcyB0cmFuc2xhdGVkKHdoZW4gaXRzIDxpPng8L2k+XG5cdCAqIGFuZCA8aT55PC9pPiBwb3NpdGlvbiBpcyBjaGFuZ2VkKS48L3A+XG5cdCAqL1xuXHRwdWJsaWMgY2FjaGVBc0JpdG1hcDpib29sZWFuO1xuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGNhc3RzU2hhZG93czpib29sZWFuID0gdHJ1ZTtcblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHRoZSBkZXB0aCBvZiB0aGUgZGlzcGxheSBvYmplY3QsIGluIHBpeGVscy4gVGhlIGRlcHRoIGlzXG5cdCAqIGNhbGN1bGF0ZWQgYmFzZWQgb24gdGhlIGJvdW5kcyBvZiB0aGUgY29udGVudCBvZiB0aGUgZGlzcGxheSBvYmplY3QuIFdoZW5cblx0ICogeW91IHNldCB0aGUgPGNvZGU+ZGVwdGg8L2NvZGU+IHByb3BlcnR5LCB0aGUgPGNvZGU+c2NhbGVaPC9jb2RlPiBwcm9wZXJ0eVxuXHQgKiBpcyBhZGp1c3RlZCBhY2NvcmRpbmdseSwgYXMgc2hvd24gaW4gdGhlIGZvbGxvd2luZyBjb2RlOlxuXHQgKlxuXHQgKiA8cD5FeGNlcHQgZm9yIFRleHRGaWVsZCBhbmQgVmlkZW8gb2JqZWN0cywgYSBkaXNwbGF5IG9iamVjdCB3aXRoIG5vXG5cdCAqIGNvbnRlbnQgKHN1Y2ggYXMgYW4gZW1wdHkgc3ByaXRlKSBoYXMgYSBkZXB0aCBvZiAwLCBldmVuIGlmIHlvdSB0cnkgdG9cblx0ICogc2V0IDxjb2RlPmRlcHRoPC9jb2RlPiB0byBhIGRpZmZlcmVudCB2YWx1ZS48L3A+XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGRlcHRoKCk6bnVtYmVyXG5cdHtcblx0XHRpZiAodGhpcy5fYm94Qm91bmRzSW52YWxpZClcblx0XHRcdHRoaXMuX3BVcGRhdGVCb3hCb3VuZHMoKTtcblxuXHRcdHJldHVybiB0aGlzLl9wQm94Qm91bmRzLmRlcHRoKnRoaXMuX3BTY2FsZVo7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGRlcHRoKHZhbDpudW1iZXIpXG5cdHtcblx0XHR2YXIgc2NhbGVaOm51bWJlciA9IHZhbC90aGlzLmdldEJveCgpLmRlcHRoO1xuXG5cdFx0aWYgKHRoaXMuX3BTY2FsZVogPT0gc2NhbGVaKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fcFNjYWxlWiA9IHNjYWxlWjtcblxuXHRcdHRoaXMuaW52YWxpZGF0ZVNjYWxlKCk7XG5cdH1cblxuXHQvKipcblx0ICogRGVmaW5lcyB0aGUgcm90YXRpb24gb2YgdGhlIDNkIG9iamVjdCBhcyBhIDxjb2RlPlZlY3RvcjNEPC9jb2RlPiBvYmplY3QgY29udGFpbmluZyBldWxlciBhbmdsZXMgZm9yIHJvdGF0aW9uIGFyb3VuZCB4LCB5IGFuZCB6IGF4aXMuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGV1bGVycygpOlZlY3RvcjNEXG5cdHtcblx0XHR0aGlzLl9ldWxlcnMueCA9IHRoaXMuX3JvdGF0aW9uWCpNYXRoQ29uc3RzLlJBRElBTlNfVE9fREVHUkVFUztcblx0XHR0aGlzLl9ldWxlcnMueSA9IHRoaXMuX3JvdGF0aW9uWSpNYXRoQ29uc3RzLlJBRElBTlNfVE9fREVHUkVFUztcblx0XHR0aGlzLl9ldWxlcnMueiA9IHRoaXMuX3JvdGF0aW9uWipNYXRoQ29uc3RzLlJBRElBTlNfVE9fREVHUkVFUztcblxuXHRcdHJldHVybiB0aGlzLl9ldWxlcnM7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGV1bGVycyh2YWx1ZTpWZWN0b3IzRClcblx0e1xuXHRcdHRoaXMuX3JvdGF0aW9uWCA9IHZhbHVlLngqTWF0aENvbnN0cy5ERUdSRUVTX1RPX1JBRElBTlM7XG5cdFx0dGhpcy5fcm90YXRpb25ZID0gdmFsdWUueSpNYXRoQ29uc3RzLkRFR1JFRVNfVE9fUkFESUFOUztcblx0XHR0aGlzLl9yb3RhdGlvblogPSB2YWx1ZS56Kk1hdGhDb25zdHMuREVHUkVFU19UT19SQURJQU5TO1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlUm90YXRpb24oKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBbiBvYmplY3QgdGhhdCBjYW4gY29udGFpbiBhbnkgZXh0cmEgZGF0YS5cblx0ICovXG5cdHB1YmxpYyBleHRyYTpPYmplY3Q7XG5cblx0LyoqXG5cdCAqIEFuIGluZGV4ZWQgYXJyYXkgdGhhdCBjb250YWlucyBlYWNoIGZpbHRlciBvYmplY3QgY3VycmVudGx5IGFzc29jaWF0ZWRcblx0ICogd2l0aCB0aGUgZGlzcGxheSBvYmplY3QuIFRoZSBmbGFzaC5maWx0ZXJzIHBhY2thZ2UgY29udGFpbnMgc2V2ZXJhbFxuXHQgKiBjbGFzc2VzIHRoYXQgZGVmaW5lIHNwZWNpZmljIGZpbHRlcnMgeW91IGNhbiB1c2UuXG5cdCAqXG5cdCAqIDxwPkZpbHRlcnMgY2FuIGJlIGFwcGxpZWQgaW4gRmxhc2ggUHJvZmVzc2lvbmFsIGF0IGRlc2lnbiB0aW1lLCBvciBhdCBydW5cblx0ICogdGltZSBieSB1c2luZyBBY3Rpb25TY3JpcHQgY29kZS4gVG8gYXBwbHkgYSBmaWx0ZXIgYnkgdXNpbmcgQWN0aW9uU2NyaXB0LFxuXHQgKiB5b3UgbXVzdCBtYWtlIGEgdGVtcG9yYXJ5IGNvcHkgb2YgdGhlIGVudGlyZSA8Y29kZT5maWx0ZXJzPC9jb2RlPiBhcnJheSxcblx0ICogbW9kaWZ5IHRoZSB0ZW1wb3JhcnkgYXJyYXksIHRoZW4gYXNzaWduIHRoZSB2YWx1ZSBvZiB0aGUgdGVtcG9yYXJ5IGFycmF5XG5cdCAqIGJhY2sgdG8gdGhlIDxjb2RlPmZpbHRlcnM8L2NvZGU+IGFycmF5LiBZb3UgY2Fubm90IGRpcmVjdGx5IGFkZCBhIG5ld1xuXHQgKiBmaWx0ZXIgb2JqZWN0IHRvIHRoZSA8Y29kZT5maWx0ZXJzPC9jb2RlPiBhcnJheS48L3A+XG5cdCAqXG5cdCAqIDxwPlRvIGFkZCBhIGZpbHRlciBieSB1c2luZyBBY3Rpb25TY3JpcHQsIHBlcmZvcm0gdGhlIGZvbGxvd2luZyBzdGVwc1xuXHQgKiAoYXNzdW1lIHRoYXQgdGhlIHRhcmdldCBkaXNwbGF5IG9iamVjdCBpcyBuYW1lZFxuXHQgKiA8Y29kZT5teURpc3BsYXlPYmplY3Q8L2NvZGU+KTo8L3A+XG5cdCAqXG5cdCAqIDxvbD5cblx0ICogICA8bGk+Q3JlYXRlIGEgbmV3IGZpbHRlciBvYmplY3QgYnkgdXNpbmcgdGhlIGNvbnN0cnVjdG9yIG1ldGhvZCBvZiB5b3VyXG5cdCAqIGNob3NlbiBmaWx0ZXIgY2xhc3MuPC9saT5cblx0ICogICA8bGk+QXNzaWduIHRoZSB2YWx1ZSBvZiB0aGUgPGNvZGU+bXlEaXNwbGF5T2JqZWN0LmZpbHRlcnM8L2NvZGU+IGFycmF5XG5cdCAqIHRvIGEgdGVtcG9yYXJ5IGFycmF5LCBzdWNoIGFzIG9uZSBuYW1lZCA8Y29kZT5teUZpbHRlcnM8L2NvZGU+LjwvbGk+XG5cdCAqICAgPGxpPkFkZCB0aGUgbmV3IGZpbHRlciBvYmplY3QgdG8gdGhlIDxjb2RlPm15RmlsdGVyczwvY29kZT4gdGVtcG9yYXJ5XG5cdCAqIGFycmF5LjwvbGk+XG5cdCAqICAgPGxpPkFzc2lnbiB0aGUgdmFsdWUgb2YgdGhlIHRlbXBvcmFyeSBhcnJheSB0byB0aGVcblx0ICogPGNvZGU+bXlEaXNwbGF5T2JqZWN0LmZpbHRlcnM8L2NvZGU+IGFycmF5LjwvbGk+XG5cdCAqIDwvb2w+XG5cdCAqXG5cdCAqIDxwPklmIHRoZSA8Y29kZT5maWx0ZXJzPC9jb2RlPiBhcnJheSBpcyB1bmRlZmluZWQsIHlvdSBkbyBub3QgbmVlZCB0byB1c2Vcblx0ICogYSB0ZW1wb3JhcnkgYXJyYXkuIEluc3RlYWQsIHlvdSBjYW4gZGlyZWN0bHkgYXNzaWduIGFuIGFycmF5IGxpdGVyYWwgdGhhdFxuXHQgKiBjb250YWlucyBvbmUgb3IgbW9yZSBmaWx0ZXIgb2JqZWN0cyB0aGF0IHlvdSBjcmVhdGUuIFRoZSBmaXJzdCBleGFtcGxlIGluXG5cdCAqIHRoZSBFeGFtcGxlcyBzZWN0aW9uIGFkZHMgYSBkcm9wIHNoYWRvdyBmaWx0ZXIgYnkgdXNpbmcgY29kZSB0aGF0IGhhbmRsZXNcblx0ICogYm90aCBkZWZpbmVkIGFuZCB1bmRlZmluZWQgPGNvZGU+ZmlsdGVyczwvY29kZT4gYXJyYXlzLjwvcD5cblx0ICpcblx0ICogPHA+VG8gbW9kaWZ5IGFuIGV4aXN0aW5nIGZpbHRlciBvYmplY3QsIHlvdSBtdXN0IHVzZSB0aGUgdGVjaG5pcXVlIG9mXG5cdCAqIG1vZGlmeWluZyBhIGNvcHkgb2YgdGhlIDxjb2RlPmZpbHRlcnM8L2NvZGU+IGFycmF5OjwvcD5cblx0ICpcblx0ICogPG9sPlxuXHQgKiAgIDxsaT5Bc3NpZ24gdGhlIHZhbHVlIG9mIHRoZSA8Y29kZT5maWx0ZXJzPC9jb2RlPiBhcnJheSB0byBhIHRlbXBvcmFyeVxuXHQgKiBhcnJheSwgc3VjaCBhcyBvbmUgbmFtZWQgPGNvZGU+bXlGaWx0ZXJzPC9jb2RlPi48L2xpPlxuXHQgKiAgIDxsaT5Nb2RpZnkgdGhlIHByb3BlcnR5IGJ5IHVzaW5nIHRoZSB0ZW1wb3JhcnkgYXJyYXksXG5cdCAqIDxjb2RlPm15RmlsdGVyczwvY29kZT4uIEZvciBleGFtcGxlLCB0byBzZXQgdGhlIHF1YWxpdHkgcHJvcGVydHkgb2YgdGhlXG5cdCAqIGZpcnN0IGZpbHRlciBpbiB0aGUgYXJyYXksIHlvdSBjb3VsZCB1c2UgdGhlIGZvbGxvd2luZyBjb2RlOlxuXHQgKiA8Y29kZT5teUZpbHRlcnNbMF0ucXVhbGl0eSA9IDE7PC9jb2RlPjwvbGk+XG5cdCAqICAgPGxpPkFzc2lnbiB0aGUgdmFsdWUgb2YgdGhlIHRlbXBvcmFyeSBhcnJheSB0byB0aGUgPGNvZGU+ZmlsdGVyczwvY29kZT5cblx0ICogYXJyYXkuPC9saT5cblx0ICogPC9vbD5cblx0ICpcblx0ICogPHA+QXQgbG9hZCB0aW1lLCBpZiBhIGRpc3BsYXkgb2JqZWN0IGhhcyBhbiBhc3NvY2lhdGVkIGZpbHRlciwgaXQgaXNcblx0ICogbWFya2VkIHRvIGNhY2hlIGl0c2VsZiBhcyBhIHRyYW5zcGFyZW50IGJpdG1hcC4gRnJvbSB0aGlzIHBvaW50IGZvcndhcmQsXG5cdCAqIGFzIGxvbmcgYXMgdGhlIGRpc3BsYXkgb2JqZWN0IGhhcyBhIHZhbGlkIGZpbHRlciBsaXN0LCB0aGUgcGxheWVyIGNhY2hlc1xuXHQgKiB0aGUgZGlzcGxheSBvYmplY3QgYXMgYSBiaXRtYXAuIFRoaXMgc291cmNlIGJpdG1hcCBpcyB1c2VkIGFzIGEgc291cmNlXG5cdCAqIGltYWdlIGZvciB0aGUgZmlsdGVyIGVmZmVjdHMuIEVhY2ggZGlzcGxheSBvYmplY3QgdXN1YWxseSBoYXMgdHdvIGJpdG1hcHM6XG5cdCAqIG9uZSB3aXRoIHRoZSBvcmlnaW5hbCB1bmZpbHRlcmVkIHNvdXJjZSBkaXNwbGF5IG9iamVjdCBhbmQgYW5vdGhlciBmb3IgdGhlXG5cdCAqIGZpbmFsIGltYWdlIGFmdGVyIGZpbHRlcmluZy4gVGhlIGZpbmFsIGltYWdlIGlzIHVzZWQgd2hlbiByZW5kZXJpbmcuIEFzXG5cdCAqIGxvbmcgYXMgdGhlIGRpc3BsYXkgb2JqZWN0IGRvZXMgbm90IGNoYW5nZSwgdGhlIGZpbmFsIGltYWdlIGRvZXMgbm90IG5lZWRcblx0ICogdXBkYXRpbmcuPC9wPlxuXHQgKlxuXHQgKiA8cD5UaGUgZmxhc2guZmlsdGVycyBwYWNrYWdlIGluY2x1ZGVzIGNsYXNzZXMgZm9yIGZpbHRlcnMuIEZvciBleGFtcGxlLCB0b1xuXHQgKiBjcmVhdGUgYSBEcm9wU2hhZG93IGZpbHRlciwgeW91IHdvdWxkIHdyaXRlOjwvcD5cblx0ICpcblx0ICogQHRocm93cyBBcmd1bWVudEVycm9yIFdoZW4gPGNvZGU+ZmlsdGVyczwvY29kZT4gaW5jbHVkZXMgYSBTaGFkZXJGaWx0ZXJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIGFuZCB0aGUgc2hhZGVyIG91dHB1dCB0eXBlIGlzIG5vdCBjb21wYXRpYmxlIHdpdGhcblx0ICogICAgICAgICAgICAgICAgICAgICAgIHRoaXMgb3BlcmF0aW9uKHRoZSBzaGFkZXIgbXVzdCBzcGVjaWZ5IGFcblx0ICogICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPnBpeGVsNDwvY29kZT4gb3V0cHV0KS5cblx0ICogQHRocm93cyBBcmd1bWVudEVycm9yIFdoZW4gPGNvZGU+ZmlsdGVyczwvY29kZT4gaW5jbHVkZXMgYSBTaGFkZXJGaWx0ZXJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIGFuZCB0aGUgc2hhZGVyIGRvZXNuJ3Qgc3BlY2lmeSBhbnkgaW1hZ2UgaW5wdXQgb3Jcblx0ICogICAgICAgICAgICAgICAgICAgICAgIHRoZSBmaXJzdCBpbnB1dCBpcyBub3QgYW4gPGNvZGU+aW1hZ2U0PC9jb2RlPiBpbnB1dC5cblx0ICogQHRocm93cyBBcmd1bWVudEVycm9yIFdoZW4gPGNvZGU+ZmlsdGVyczwvY29kZT4gaW5jbHVkZXMgYSBTaGFkZXJGaWx0ZXJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIGFuZCB0aGUgc2hhZGVyIHNwZWNpZmllcyBhbiBpbWFnZSBpbnB1dCB0aGF0IGlzbid0XG5cdCAqICAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlZC5cblx0ICogQHRocm93cyBBcmd1bWVudEVycm9yIFdoZW4gPGNvZGU+ZmlsdGVyczwvY29kZT4gaW5jbHVkZXMgYSBTaGFkZXJGaWx0ZXIsIGFcblx0ICogICAgICAgICAgICAgICAgICAgICAgIEJ5dGVBcnJheSBvciBWZWN0b3IuPE51bWJlcj4gaW5zdGFuY2UgYXMgYSBzaGFkZXJcblx0ICogICAgICAgICAgICAgICAgICAgICAgIGlucHV0LCBhbmQgdGhlIDxjb2RlPndpZHRoPC9jb2RlPiBhbmRcblx0ICogICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPmhlaWdodDwvY29kZT4gcHJvcGVydGllcyBhcmVuJ3Qgc3BlY2lmaWVkIGZvclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgdGhlIFNoYWRlcklucHV0IG9iamVjdCwgb3IgdGhlIHNwZWNpZmllZCB2YWx1ZXNcblx0ICogICAgICAgICAgICAgICAgICAgICAgIGRvbid0IG1hdGNoIHRoZSBhbW91bnQgb2YgZGF0YSBpbiB0aGUgaW5wdXQgZGF0YS5cblx0ICogICAgICAgICAgICAgICAgICAgICAgIFNlZSB0aGUgPGNvZGU+U2hhZGVySW5wdXQuaW5wdXQ8L2NvZGU+IHByb3BlcnR5IGZvclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgbW9yZSBpbmZvcm1hdGlvbi5cblx0ICovXG4vL1x0XHRwdWJsaWMgZmlsdGVyczpBcnJheTxEeW5hbWljPjtcblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHRoZSBoZWlnaHQgb2YgdGhlIGRpc3BsYXkgb2JqZWN0LCBpbiBwaXhlbHMuIFRoZSBoZWlnaHQgaXNcblx0ICogY2FsY3VsYXRlZCBiYXNlZCBvbiB0aGUgYm91bmRzIG9mIHRoZSBjb250ZW50IG9mIHRoZSBkaXNwbGF5IG9iamVjdC4gV2hlblxuXHQgKiB5b3Ugc2V0IHRoZSA8Y29kZT5oZWlnaHQ8L2NvZGU+IHByb3BlcnR5LCB0aGUgPGNvZGU+c2NhbGVZPC9jb2RlPiBwcm9wZXJ0eVxuXHQgKiBpcyBhZGp1c3RlZCBhY2NvcmRpbmdseSwgYXMgc2hvd24gaW4gdGhlIGZvbGxvd2luZyBjb2RlOlxuXHQgKlxuXHQgKiA8cD5FeGNlcHQgZm9yIFRleHRGaWVsZCBhbmQgVmlkZW8gb2JqZWN0cywgYSBkaXNwbGF5IG9iamVjdCB3aXRoIG5vXG5cdCAqIGNvbnRlbnQgKHN1Y2ggYXMgYW4gZW1wdHkgc3ByaXRlKSBoYXMgYSBoZWlnaHQgb2YgMCwgZXZlbiBpZiB5b3UgdHJ5IHRvXG5cdCAqIHNldCA8Y29kZT5oZWlnaHQ8L2NvZGU+IHRvIGEgZGlmZmVyZW50IHZhbHVlLjwvcD5cblx0ICovXG5cdHB1YmxpYyBnZXQgaGVpZ2h0KCk6bnVtYmVyXG5cdHtcblx0XHRpZiAodGhpcy5fYm94Qm91bmRzSW52YWxpZClcblx0XHRcdHRoaXMuX3BVcGRhdGVCb3hCb3VuZHMoKTtcblxuXHRcdHJldHVybiB0aGlzLl9wQm94Qm91bmRzLmhlaWdodCp0aGlzLl9wU2NhbGVZO1xuXHR9XG5cblx0cHVibGljIHNldCBoZWlnaHQodmFsOm51bWJlcilcblx0e1xuXHRcdHZhciBzY2FsZVk6bnVtYmVyID0gdmFsL3RoaXMuZ2V0Qm94KCkuaGVpZ2h0O1xuXG5cdFx0aWYgKHRoaXMuX3BTY2FsZVkgPT0gc2NhbGVZKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fcFNjYWxlWSA9IHNjYWxlWTtcblxuXHRcdHRoaXMuaW52YWxpZGF0ZVNjYWxlKCk7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHRoZSBpbnN0YW5jZSBjb250YWluZXIgaW5kZXggb2YgdGhlIERpc3BsYXlPYmplY3QuIFRoZSBvYmplY3QgY2FuIGJlXG5cdCAqIGlkZW50aWZpZWQgaW4gdGhlIGNoaWxkIGxpc3Qgb2YgaXRzIHBhcmVudCBkaXNwbGF5IG9iamVjdCBjb250YWluZXIgYnlcblx0ICogY2FsbGluZyB0aGUgPGNvZGU+Z2V0Q2hpbGRCeUluZGV4KCk8L2NvZGU+IG1ldGhvZCBvZiB0aGUgZGlzcGxheSBvYmplY3Rcblx0ICogY29udGFpbmVyLlxuXHQgKlxuXHQgKiA8cD5JZiB0aGUgRGlzcGxheU9iamVjdCBoYXMgbm8gcGFyZW50IGNvbnRhaW5lciwgaW5kZXggZGVmYXVsdHMgdG8gMC48L3A+XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGluZGV4KCk6bnVtYmVyXG5cdHtcblx0XHRpZiAodGhpcy5fcFBhcmVudClcblx0XHRcdHJldHVybiB0aGlzLl9wUGFyZW50LmdldENoaWxkSW5kZXgodGhpcyk7XG5cblx0XHRyZXR1cm4gMDtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBpbnZlcnNlU2NlbmVUcmFuc2Zvcm0oKTpNYXRyaXgzRFxuXHR7XG5cdFx0aWYgKHRoaXMuX2ludmVyc2VTY2VuZVRyYW5zZm9ybURpcnR5KSB7XG5cdFx0XHR0aGlzLl9pbnZlcnNlU2NlbmVUcmFuc2Zvcm0uY29weUZyb20odGhpcy5zY2VuZVRyYW5zZm9ybSk7XG5cdFx0XHR0aGlzLl9pbnZlcnNlU2NlbmVUcmFuc2Zvcm0uaW52ZXJ0KCk7XG5cdFx0XHR0aGlzLl9pbnZlcnNlU2NlbmVUcmFuc2Zvcm1EaXJ0eSA9IGZhbHNlO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5faW52ZXJzZVNjZW5lVHJhbnNmb3JtO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGlnbm9yZVRyYW5zZm9ybSgpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9wSWdub3JlVHJhbnNmb3JtO1xuXHR9XG5cblx0cHVibGljIHNldCBpZ25vcmVUcmFuc2Zvcm0odmFsdWU6Ym9vbGVhbilcblx0e1xuXHRcdGlmICh0aGlzLl9wSWdub3JlVHJhbnNmb3JtID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fcElnbm9yZVRyYW5zZm9ybSA9IHZhbHVlO1xuXG5cdFx0aWYgKHZhbHVlKSB7XG5cdFx0XHR0aGlzLl9wU2NlbmVUcmFuc2Zvcm0uaWRlbnRpdHkoKTtcblx0XHRcdHRoaXMuX3NjZW5lUG9zaXRpb24uc2V0VG8oMCwgMCwgMCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5wSW52YWxpZGF0ZVNjZW5lVHJhbnNmb3JtKCk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgaXNFbnRpdHkoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BJc0VudGl0eTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGEgTG9hZGVySW5mbyBvYmplY3QgY29udGFpbmluZyBpbmZvcm1hdGlvbiBhYm91dCBsb2FkaW5nIHRoZSBmaWxlXG5cdCAqIHRvIHdoaWNoIHRoaXMgZGlzcGxheSBvYmplY3QgYmVsb25ncy4gVGhlIDxjb2RlPmxvYWRlckluZm88L2NvZGU+IHByb3BlcnR5XG5cdCAqIGlzIGRlZmluZWQgb25seSBmb3IgdGhlIHJvb3QgZGlzcGxheSBvYmplY3Qgb2YgYSBTV0YgZmlsZSBvciBmb3IgYSBsb2FkZWRcblx0ICogQml0bWFwKG5vdCBmb3IgYSBCaXRtYXAgdGhhdCBpcyBkcmF3biB3aXRoIEFjdGlvblNjcmlwdCkuIFRvIGZpbmQgdGhlXG5cdCAqIDxjb2RlPmxvYWRlckluZm88L2NvZGU+IG9iamVjdCBhc3NvY2lhdGVkIHdpdGggdGhlIFNXRiBmaWxlIHRoYXQgY29udGFpbnNcblx0ICogYSBkaXNwbGF5IG9iamVjdCBuYW1lZCA8Y29kZT5teURpc3BsYXlPYmplY3Q8L2NvZGU+LCB1c2Vcblx0ICogPGNvZGU+bXlEaXNwbGF5T2JqZWN0LnJvb3QubG9hZGVySW5mbzwvY29kZT4uXG5cdCAqXG5cdCAqIDxwPkEgbGFyZ2UgU1dGIGZpbGUgY2FuIG1vbml0b3IgaXRzIGRvd25sb2FkIGJ5IGNhbGxpbmdcblx0ICogPGNvZGU+dGhpcy5yb290LmxvYWRlckluZm8uYWRkRXZlbnRMaXN0ZW5lcihFdmVudC5DT01QTEVURSxcblx0ICogZnVuYyk8L2NvZGU+LjwvcD5cblx0ICovXG5cdHB1YmxpYyBnZXQgbG9hZGVySW5mbygpOkxvYWRlckluZm9cblx0e1xuXHRcdHJldHVybiB0aGlzLl9sb2FkZXJJbmZvO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBjYWxsaW5nIGRpc3BsYXkgb2JqZWN0IGlzIG1hc2tlZCBieSB0aGUgc3BlY2lmaWVkIDxjb2RlPm1hc2s8L2NvZGU+XG5cdCAqIG9iamVjdC4gVG8gZW5zdXJlIHRoYXQgbWFza2luZyB3b3JrcyB3aGVuIHRoZSBTdGFnZSBpcyBzY2FsZWQsIHRoZVxuXHQgKiA8Y29kZT5tYXNrPC9jb2RlPiBkaXNwbGF5IG9iamVjdCBtdXN0IGJlIGluIGFuIGFjdGl2ZSBwYXJ0IG9mIHRoZSBkaXNwbGF5XG5cdCAqIGxpc3QuIFRoZSA8Y29kZT5tYXNrPC9jb2RlPiBvYmplY3QgaXRzZWxmIGlzIG5vdCBkcmF3bi4gU2V0XG5cdCAqIDxjb2RlPm1hc2s8L2NvZGU+IHRvIDxjb2RlPm51bGw8L2NvZGU+IHRvIHJlbW92ZSB0aGUgbWFzay5cblx0ICpcblx0ICogPHA+VG8gYmUgYWJsZSB0byBzY2FsZSBhIG1hc2sgb2JqZWN0LCBpdCBtdXN0IGJlIG9uIHRoZSBkaXNwbGF5IGxpc3QuIFRvXG5cdCAqIGJlIGFibGUgdG8gZHJhZyBhIG1hc2sgU3ByaXRlIG9iamVjdChieSBjYWxsaW5nIGl0c1xuXHQgKiA8Y29kZT5zdGFydERyYWcoKTwvY29kZT4gbWV0aG9kKSwgaXQgbXVzdCBiZSBvbiB0aGUgZGlzcGxheSBsaXN0LiBUbyBjYWxsXG5cdCAqIHRoZSA8Y29kZT5zdGFydERyYWcoKTwvY29kZT4gbWV0aG9kIGZvciBhIG1hc2sgc3ByaXRlIGJhc2VkIG9uIGFcblx0ICogPGNvZGU+bW91c2VEb3duPC9jb2RlPiBldmVudCBiZWluZyBkaXNwYXRjaGVkIGJ5IHRoZSBzcHJpdGUsIHNldCB0aGVcblx0ICogc3ByaXRlJ3MgPGNvZGU+YnV0dG9uTW9kZTwvY29kZT4gcHJvcGVydHkgdG8gPGNvZGU+dHJ1ZTwvY29kZT4uPC9wPlxuXHQgKlxuXHQgKiA8cD5XaGVuIGRpc3BsYXkgb2JqZWN0cyBhcmUgY2FjaGVkIGJ5IHNldHRpbmcgdGhlXG5cdCAqIDxjb2RlPmNhY2hlQXNCaXRtYXA8L2NvZGU+IHByb3BlcnR5IHRvIDxjb2RlPnRydWU8L2NvZGU+IGFuIHRoZVxuXHQgKiA8Y29kZT5jYWNoZUFzQml0bWFwTWF0cml4PC9jb2RlPiBwcm9wZXJ0eSB0byBhIE1hdHJpeCBvYmplY3QsIGJvdGggdGhlXG5cdCAqIG1hc2sgYW5kIHRoZSBkaXNwbGF5IG9iamVjdCBiZWluZyBtYXNrZWQgbXVzdCBiZSBwYXJ0IG9mIHRoZSBzYW1lIGNhY2hlZFxuXHQgKiBiaXRtYXAuIFRodXMsIGlmIHRoZSBkaXNwbGF5IG9iamVjdCBpcyBjYWNoZWQsIHRoZW4gdGhlIG1hc2sgbXVzdCBiZSBhXG5cdCAqIGNoaWxkIG9mIHRoZSBkaXNwbGF5IG9iamVjdC4gSWYgYW4gYW5jZXN0b3Igb2YgdGhlIGRpc3BsYXkgb2JqZWN0IG9uIHRoZVxuXHQgKiBkaXNwbGF5IGxpc3QgaXMgY2FjaGVkLCB0aGVuIHRoZSBtYXNrIG11c3QgYmUgYSBjaGlsZCBvZiB0aGF0IGFuY2VzdG9yIG9yXG5cdCAqIG9uZSBvZiBpdHMgZGVzY2VuZGVudHMuIElmIG1vcmUgdGhhbiBvbmUgYW5jZXN0b3Igb2YgdGhlIG1hc2tlZCBvYmplY3QgaXNcblx0ICogY2FjaGVkLCB0aGVuIHRoZSBtYXNrIG11c3QgYmUgYSBkZXNjZW5kZW50IG9mIHRoZSBjYWNoZWQgY29udGFpbmVyIGNsb3Nlc3Rcblx0ICogdG8gdGhlIG1hc2tlZCBvYmplY3QgaW4gdGhlIGRpc3BsYXkgbGlzdC48L3A+XG5cdCAqXG5cdCAqIDxwPjxiPk5vdGU6PC9iPiBBIHNpbmdsZSA8Y29kZT5tYXNrPC9jb2RlPiBvYmplY3QgY2Fubm90IGJlIHVzZWQgdG8gbWFza1xuXHQgKiBtb3JlIHRoYW4gb25lIGNhbGxpbmcgZGlzcGxheSBvYmplY3QuIFdoZW4gdGhlIDxjb2RlPm1hc2s8L2NvZGU+IGlzXG5cdCAqIGFzc2lnbmVkIHRvIGEgc2Vjb25kIGRpc3BsYXkgb2JqZWN0LCBpdCBpcyByZW1vdmVkIGFzIHRoZSBtYXNrIG9mIHRoZVxuXHQgKiBmaXJzdCBvYmplY3QsIGFuZCB0aGF0IG9iamVjdCdzIDxjb2RlPm1hc2s8L2NvZGU+IHByb3BlcnR5IGJlY29tZXNcblx0ICogPGNvZGU+bnVsbDwvY29kZT4uPC9wPlxuXHQgKi9cblx0cHVibGljIG1hc2s6RGlzcGxheU9iamVjdDtcblxuXHQvKipcblx0ICogU3BlY2lmaWVzIHdoZXRoZXIgdGhpcyBvYmplY3QgcmVjZWl2ZXMgbW91c2UsIG9yIG90aGVyIHVzZXIgaW5wdXQsXG5cdCAqIG1lc3NhZ2VzLiBUaGUgZGVmYXVsdCB2YWx1ZSBpcyA8Y29kZT50cnVlPC9jb2RlPiwgd2hpY2ggbWVhbnMgdGhhdCBieVxuXHQgKiBkZWZhdWx0IGFueSBJbnRlcmFjdGl2ZU9iamVjdCBpbnN0YW5jZSB0aGF0IGlzIG9uIHRoZSBkaXNwbGF5IGxpc3Rcblx0ICogcmVjZWl2ZXMgbW91c2UgZXZlbnRzIG9yIG90aGVyIHVzZXIgaW5wdXQgZXZlbnRzLiBJZlxuXHQgKiA8Y29kZT5tb3VzZUVuYWJsZWQ8L2NvZGU+IGlzIHNldCB0byA8Y29kZT5mYWxzZTwvY29kZT4sIHRoZSBpbnN0YW5jZSBkb2VzXG5cdCAqIG5vdCByZWNlaXZlIGFueSBtb3VzZSBldmVudHMob3Igb3RoZXIgdXNlciBpbnB1dCBldmVudHMgbGlrZSBrZXlib2FyZFxuXHQgKiBldmVudHMpLiBBbnkgY2hpbGRyZW4gb2YgdGhpcyBpbnN0YW5jZSBvbiB0aGUgZGlzcGxheSBsaXN0IGFyZSBub3Rcblx0ICogYWZmZWN0ZWQuIFRvIGNoYW5nZSB0aGUgPGNvZGU+bW91c2VFbmFibGVkPC9jb2RlPiBiZWhhdmlvciBmb3IgYWxsXG5cdCAqIGNoaWxkcmVuIG9mIGFuIG9iamVjdCBvbiB0aGUgZGlzcGxheSBsaXN0LCB1c2Vcblx0ICogPGNvZGU+Zmxhc2guZGlzcGxheS5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLm1vdXNlQ2hpbGRyZW48L2NvZGU+LlxuXHQgKlxuXHQgKiA8cD4gTm8gZXZlbnQgaXMgZGlzcGF0Y2hlZCBieSBzZXR0aW5nIHRoaXMgcHJvcGVydHkuIFlvdSBtdXN0IHVzZSB0aGVcblx0ICogPGNvZGU+YWRkRXZlbnRMaXN0ZW5lcigpPC9jb2RlPiBtZXRob2QgdG8gY3JlYXRlIGludGVyYWN0aXZlXG5cdCAqIGZ1bmN0aW9uYWxpdHkuPC9wPlxuXHQgKi9cblx0cHVibGljIGdldCBtb3VzZUVuYWJsZWQoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fZXhwbGljaXRNb3VzZUVuYWJsZWQ7XG5cdH1cblxuXHRwdWJsaWMgc2V0IG1vdXNlRW5hYmxlZCh2YWx1ZTpib29sZWFuKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2V4cGxpY2l0TW91c2VFbmFibGVkID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fZXhwbGljaXRNb3VzZUVuYWJsZWQgPSB2YWx1ZTtcblxuXHRcdHRoaXMuX3BVcGRhdGVJbXBsaWNpdE1vdXNlRW5hYmxlZCh0aGlzLl9wUGFyZW50PyB0aGlzLl9wUGFyZW50Lm1vdXNlQ2hpbGRyZW4gOiB0cnVlKTtcblx0fVxuXG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB0aGUgeCBjb29yZGluYXRlIG9mIHRoZSBtb3VzZSBvciB1c2VyIGlucHV0IGRldmljZSBwb3NpdGlvbiwgaW5cblx0ICogcGl4ZWxzLlxuXHQgKlxuXHQgKiA8cD48Yj5Ob3RlPC9iPjogRm9yIGEgRGlzcGxheU9iamVjdCB0aGF0IGhhcyBiZWVuIHJvdGF0ZWQsIHRoZSByZXR1cm5lZCB4XG5cdCAqIGNvb3JkaW5hdGUgd2lsbCByZWZsZWN0IHRoZSBub24tcm90YXRlZCBvYmplY3QuPC9wPlxuXHQgKi9cblx0cHVibGljIGdldCBtb3VzZVgoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9tb3VzZVg7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHRoZSB5IGNvb3JkaW5hdGUgb2YgdGhlIG1vdXNlIG9yIHVzZXIgaW5wdXQgZGV2aWNlIHBvc2l0aW9uLCBpblxuXHQgKiBwaXhlbHMuXG5cdCAqXG5cdCAqIDxwPjxiPk5vdGU8L2I+OiBGb3IgYSBEaXNwbGF5T2JqZWN0IHRoYXQgaGFzIGJlZW4gcm90YXRlZCwgdGhlIHJldHVybmVkIHlcblx0ICogY29vcmRpbmF0ZSB3aWxsIHJlZmxlY3QgdGhlIG5vbi1yb3RhdGVkIG9iamVjdC48L3A+XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IG1vdXNlWSgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX21vdXNlWTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgdGhlIGluc3RhbmNlIG5hbWUgb2YgdGhlIERpc3BsYXlPYmplY3QuIFRoZSBvYmplY3QgY2FuIGJlXG5cdCAqIGlkZW50aWZpZWQgaW4gdGhlIGNoaWxkIGxpc3Qgb2YgaXRzIHBhcmVudCBkaXNwbGF5IG9iamVjdCBjb250YWluZXIgYnlcblx0ICogY2FsbGluZyB0aGUgPGNvZGU+Z2V0Q2hpbGRCeU5hbWUoKTwvY29kZT4gbWV0aG9kIG9mIHRoZSBkaXNwbGF5IG9iamVjdFxuXHQgKiBjb250YWluZXIuXG5cdCAqXG5cdCAqIEB0aHJvd3MgSWxsZWdhbE9wZXJhdGlvbkVycm9yIElmIHlvdSBhcmUgYXR0ZW1wdGluZyB0byBzZXQgdGhpcyBwcm9wZXJ0eVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbiBhbiBvYmplY3QgdGhhdCB3YXMgcGxhY2VkIG9uIHRoZSB0aW1lbGluZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbiB0aGUgRmxhc2ggYXV0aG9yaW5nIHRvb2wuXG5cdCAqL1xuXHRwdWJsaWMgbmFtZTpzdHJpbmc7XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgb3JpZW50YXRpb25Nb2RlOnN0cmluZyA9IE9yaWVudGF0aW9uTW9kZS5ERUZBVUxUO1xuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgdGhlIERpc3BsYXlPYmplY3RDb250YWluZXIgb2JqZWN0IHRoYXQgY29udGFpbnMgdGhpcyBkaXNwbGF5XG5cdCAqIG9iamVjdC4gVXNlIHRoZSA8Y29kZT5wYXJlbnQ8L2NvZGU+IHByb3BlcnR5IHRvIHNwZWNpZnkgYSByZWxhdGl2ZSBwYXRoIHRvXG5cdCAqIGRpc3BsYXkgb2JqZWN0cyB0aGF0IGFyZSBhYm92ZSB0aGUgY3VycmVudCBkaXNwbGF5IG9iamVjdCBpbiB0aGUgZGlzcGxheVxuXHQgKiBsaXN0IGhpZXJhcmNoeS5cblx0ICpcblx0ICogPHA+WW91IGNhbiB1c2UgPGNvZGU+cGFyZW50PC9jb2RlPiB0byBtb3ZlIHVwIG11bHRpcGxlIGxldmVscyBpbiB0aGVcblx0ICogZGlzcGxheSBsaXN0IGFzIGluIHRoZSBmb2xsb3dpbmc6PC9wPlxuXHQgKlxuXHQgKiBAdGhyb3dzIFNlY3VyaXR5RXJyb3IgVGhlIHBhcmVudCBkaXNwbGF5IG9iamVjdCBiZWxvbmdzIHRvIGEgc2VjdXJpdHlcblx0ICogICAgICAgICAgICAgICAgICAgICAgIHNhbmRib3ggdG8gd2hpY2ggeW91IGRvIG5vdCBoYXZlIGFjY2Vzcy4gWW91IGNhblxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgYXZvaWQgdGhpcyBzaXR1YXRpb24gYnkgaGF2aW5nIHRoZSBwYXJlbnQgbW92aWUgY2FsbFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgdGhlIDxjb2RlPlNlY3VyaXR5LmFsbG93RG9tYWluKCk8L2NvZGU+IG1ldGhvZC5cblx0ICovXG5cdHB1YmxpYyBnZXQgcGFyZW50KCk6RGlzcGxheU9iamVjdENvbnRhaW5lclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BQYXJlbnQ7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgcGFydGl0aW9uKCk6UGFydGl0aW9uXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fZXhwbGljaXRQYXJ0aXRpb247XG5cdH1cblxuXHRwdWJsaWMgc2V0IHBhcnRpdGlvbih2YWx1ZTpQYXJ0aXRpb24pXG5cdHtcblx0XHRpZiAodGhpcy5fZXhwbGljaXRQYXJ0aXRpb24gPT0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9leHBsaWNpdFBhcnRpdGlvbiA9IHZhbHVlO1xuXG5cdFx0dGhpcy5fcFVwZGF0ZUltcGxpY2l0UGFydGl0aW9uKHRoaXMuX3BQYXJlbnQ/IHRoaXMuX3BQYXJlbnQuX2lBc3NpZ25lZFBhcnRpdGlvbiA6IG51bGwsIHRoaXMuX3BTY2VuZSk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgcGlja2luZ0NvbGxpZGVyKCk6SVBpY2tpbmdDb2xsaWRlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BQaWNraW5nQ29sbGlkZXI7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHBpY2tpbmdDb2xsaWRlcih2YWx1ZTpJUGlja2luZ0NvbGxpZGVyKVxuXHR7XG5cdFx0dGhpcy5fcFBpY2tpbmdDb2xsaWRlciA9IHZhbHVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIERlZmluZXMgdGhlIGxvY2FsIHBvaW50IGFyb3VuZCB3aGljaCB0aGUgb2JqZWN0IHJvdGF0ZXMuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHBpdm90KCk6VmVjdG9yM0Rcblx0e1xuXHRcdHJldHVybiB0aGlzLl9waXZvdDtcblx0fVxuXG5cblx0cHVibGljIHNldCBwaXZvdChwaXZvdDpWZWN0b3IzRClcblx0e1xuXHRcdHRoaXMuX3Bpdm90ID0gcGl2b3QuY2xvbmUoKTtcblxuXHRcdHRoaXMuaW52YWxpZGF0ZVBpdm90KCk7XG5cdH1cblxuXHQvKipcblx0ICogRm9yIGEgZGlzcGxheSBvYmplY3QgaW4gYSBsb2FkZWQgU1dGIGZpbGUsIHRoZSA8Y29kZT5yb290PC9jb2RlPiBwcm9wZXJ0eVxuXHQgKiBpcyB0aGUgdG9wLW1vc3QgZGlzcGxheSBvYmplY3QgaW4gdGhlIHBvcnRpb24gb2YgdGhlIGRpc3BsYXkgbGlzdCdzIHRyZWVcblx0ICogc3RydWN0dXJlIHJlcHJlc2VudGVkIGJ5IHRoYXQgU1dGIGZpbGUuIEZvciBhIEJpdG1hcCBvYmplY3QgcmVwcmVzZW50aW5nIGFcblx0ICogbG9hZGVkIGltYWdlIGZpbGUsIHRoZSA8Y29kZT5yb290PC9jb2RlPiBwcm9wZXJ0eSBpcyB0aGUgQml0bWFwIG9iamVjdFxuXHQgKiBpdHNlbGYuIEZvciB0aGUgaW5zdGFuY2Ugb2YgdGhlIG1haW4gY2xhc3Mgb2YgdGhlIGZpcnN0IFNXRiBmaWxlIGxvYWRlZCxcblx0ICogdGhlIDxjb2RlPnJvb3Q8L2NvZGU+IHByb3BlcnR5IGlzIHRoZSBkaXNwbGF5IG9iamVjdCBpdHNlbGYuIFRoZVxuXHQgKiA8Y29kZT5yb290PC9jb2RlPiBwcm9wZXJ0eSBvZiB0aGUgU2NlbmUgb2JqZWN0IGlzIHRoZSBTY2VuZSBvYmplY3QgaXRzZWxmLlxuXHQgKiBUaGUgPGNvZGU+cm9vdDwvY29kZT4gcHJvcGVydHkgaXMgc2V0IHRvIDxjb2RlPm51bGw8L2NvZGU+IGZvciBhbnkgZGlzcGxheVxuXHQgKiBvYmplY3QgdGhhdCBoYXMgbm90IGJlZW4gYWRkZWQgdG8gdGhlIGRpc3BsYXkgbGlzdCwgdW5sZXNzIGl0IGhhcyBiZWVuXG5cdCAqIGFkZGVkIHRvIGEgZGlzcGxheSBvYmplY3QgY29udGFpbmVyIHRoYXQgaXMgb2ZmIHRoZSBkaXNwbGF5IGxpc3QgYnV0IHRoYXRcblx0ICogaXMgYSBjaGlsZCBvZiB0aGUgdG9wLW1vc3QgZGlzcGxheSBvYmplY3QgaW4gYSBsb2FkZWQgU1dGIGZpbGUuXG5cdCAqXG5cdCAqIDxwPkZvciBleGFtcGxlLCBpZiB5b3UgY3JlYXRlIGEgbmV3IFNwcml0ZSBvYmplY3QgYnkgY2FsbGluZyB0aGVcblx0ICogPGNvZGU+U3ByaXRlKCk8L2NvZGU+IGNvbnN0cnVjdG9yIG1ldGhvZCwgaXRzIDxjb2RlPnJvb3Q8L2NvZGU+IHByb3BlcnR5XG5cdCAqIGlzIDxjb2RlPm51bGw8L2NvZGU+IHVudGlsIHlvdSBhZGQgaXQgdG8gdGhlIGRpc3BsYXkgbGlzdChvciB0byBhIGRpc3BsYXlcblx0ICogb2JqZWN0IGNvbnRhaW5lciB0aGF0IGlzIG9mZiB0aGUgZGlzcGxheSBsaXN0IGJ1dCB0aGF0IGlzIGEgY2hpbGQgb2YgdGhlXG5cdCAqIHRvcC1tb3N0IGRpc3BsYXkgb2JqZWN0IGluIGEgU1dGIGZpbGUpLjwvcD5cblx0ICpcblx0ICogPHA+Rm9yIGEgbG9hZGVkIFNXRiBmaWxlLCBldmVuIHRob3VnaCB0aGUgTG9hZGVyIG9iamVjdCB1c2VkIHRvIGxvYWQgdGhlXG5cdCAqIGZpbGUgbWF5IG5vdCBiZSBvbiB0aGUgZGlzcGxheSBsaXN0LCB0aGUgdG9wLW1vc3QgZGlzcGxheSBvYmplY3QgaW4gdGhlXG5cdCAqIFNXRiBmaWxlIGhhcyBpdHMgPGNvZGU+cm9vdDwvY29kZT4gcHJvcGVydHkgc2V0IHRvIGl0c2VsZi4gVGhlIExvYWRlclxuXHQgKiBvYmplY3QgZG9lcyBub3QgaGF2ZSBpdHMgPGNvZGU+cm9vdDwvY29kZT4gcHJvcGVydHkgc2V0IHVudGlsIGl0IGlzIGFkZGVkXG5cdCAqIGFzIGEgY2hpbGQgb2YgYSBkaXNwbGF5IG9iamVjdCBmb3Igd2hpY2ggdGhlIDxjb2RlPnJvb3Q8L2NvZGU+IHByb3BlcnR5IGlzXG5cdCAqIHNldC48L3A+XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHJvb3QoKTpEaXNwbGF5T2JqZWN0Q29udGFpbmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcm9vdDtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgdGhlIHJvdGF0aW9uIG9mIHRoZSBEaXNwbGF5T2JqZWN0IGluc3RhbmNlLCBpbiBkZWdyZWVzLCBmcm9tIGl0c1xuXHQgKiBvcmlnaW5hbCBvcmllbnRhdGlvbi4gVmFsdWVzIGZyb20gMCB0byAxODAgcmVwcmVzZW50IGNsb2Nrd2lzZSByb3RhdGlvbjtcblx0ICogdmFsdWVzIGZyb20gMCB0byAtMTgwIHJlcHJlc2VudCBjb3VudGVyY2xvY2t3aXNlIHJvdGF0aW9uLiBWYWx1ZXMgb3V0c2lkZVxuXHQgKiB0aGlzIHJhbmdlIGFyZSBhZGRlZCB0byBvciBzdWJ0cmFjdGVkIGZyb20gMzYwIHRvIG9idGFpbiBhIHZhbHVlIHdpdGhpblxuXHQgKiB0aGUgcmFuZ2UuIEZvciBleGFtcGxlLCB0aGUgc3RhdGVtZW50IDxjb2RlPm15X3ZpZGVvLnJvdGF0aW9uID0gNDUwPC9jb2RlPlxuXHQgKiBpcyB0aGUgc2FtZSBhcyA8Y29kZT4gbXlfdmlkZW8ucm90YXRpb24gPSA5MDwvY29kZT4uXG5cdCAqL1xuXHRwdWJsaWMgcm90YXRpb246bnVtYmVyOyAvL1RPRE9cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHRoZSB4LWF4aXMgcm90YXRpb24gb2YgdGhlIERpc3BsYXlPYmplY3QgaW5zdGFuY2UsIGluIGRlZ3JlZXMsXG5cdCAqIGZyb20gaXRzIG9yaWdpbmFsIG9yaWVudGF0aW9uIHJlbGF0aXZlIHRvIHRoZSAzRCBwYXJlbnQgY29udGFpbmVyLiBWYWx1ZXNcblx0ICogZnJvbSAwIHRvIDE4MCByZXByZXNlbnQgY2xvY2t3aXNlIHJvdGF0aW9uOyB2YWx1ZXMgZnJvbSAwIHRvIC0xODBcblx0ICogcmVwcmVzZW50IGNvdW50ZXJjbG9ja3dpc2Ugcm90YXRpb24uIFZhbHVlcyBvdXRzaWRlIHRoaXMgcmFuZ2UgYXJlIGFkZGVkXG5cdCAqIHRvIG9yIHN1YnRyYWN0ZWQgZnJvbSAzNjAgdG8gb2J0YWluIGEgdmFsdWUgd2l0aGluIHRoZSByYW5nZS5cblx0ICovXG5cdHB1YmxpYyBnZXQgcm90YXRpb25YKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcm90YXRpb25YKk1hdGhDb25zdHMuUkFESUFOU19UT19ERUdSRUVTO1xuXHR9XG5cblx0cHVibGljIHNldCByb3RhdGlvblgodmFsOm51bWJlcilcblx0e1xuXHRcdGlmICh0aGlzLnJvdGF0aW9uWCA9PSB2YWwpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9yb3RhdGlvblggPSB2YWwqTWF0aENvbnN0cy5ERUdSRUVTX1RPX1JBRElBTlM7XG5cblx0XHR0aGlzLmludmFsaWRhdGVSb3RhdGlvbigpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB0aGUgeS1heGlzIHJvdGF0aW9uIG9mIHRoZSBEaXNwbGF5T2JqZWN0IGluc3RhbmNlLCBpbiBkZWdyZWVzLFxuXHQgKiBmcm9tIGl0cyBvcmlnaW5hbCBvcmllbnRhdGlvbiByZWxhdGl2ZSB0byB0aGUgM0QgcGFyZW50IGNvbnRhaW5lci4gVmFsdWVzXG5cdCAqIGZyb20gMCB0byAxODAgcmVwcmVzZW50IGNsb2Nrd2lzZSByb3RhdGlvbjsgdmFsdWVzIGZyb20gMCB0byAtMTgwXG5cdCAqIHJlcHJlc2VudCBjb3VudGVyY2xvY2t3aXNlIHJvdGF0aW9uLiBWYWx1ZXMgb3V0c2lkZSB0aGlzIHJhbmdlIGFyZSBhZGRlZFxuXHQgKiB0byBvciBzdWJ0cmFjdGVkIGZyb20gMzYwIHRvIG9idGFpbiBhIHZhbHVlIHdpdGhpbiB0aGUgcmFuZ2UuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHJvdGF0aW9uWSgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3JvdGF0aW9uWSpNYXRoQ29uc3RzLlJBRElBTlNfVE9fREVHUkVFUztcblx0fVxuXG5cdHB1YmxpYyBzZXQgcm90YXRpb25ZKHZhbDpudW1iZXIpXG5cdHtcblx0XHRpZiAodGhpcy5yb3RhdGlvblkgPT0gdmFsKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fcm90YXRpb25ZID0gdmFsKk1hdGhDb25zdHMuREVHUkVFU19UT19SQURJQU5TO1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlUm90YXRpb24oKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgdGhlIHotYXhpcyByb3RhdGlvbiBvZiB0aGUgRGlzcGxheU9iamVjdCBpbnN0YW5jZSwgaW4gZGVncmVlcyxcblx0ICogZnJvbSBpdHMgb3JpZ2luYWwgb3JpZW50YXRpb24gcmVsYXRpdmUgdG8gdGhlIDNEIHBhcmVudCBjb250YWluZXIuIFZhbHVlc1xuXHQgKiBmcm9tIDAgdG8gMTgwIHJlcHJlc2VudCBjbG9ja3dpc2Ugcm90YXRpb247IHZhbHVlcyBmcm9tIDAgdG8gLTE4MFxuXHQgKiByZXByZXNlbnQgY291bnRlcmNsb2Nrd2lzZSByb3RhdGlvbi4gVmFsdWVzIG91dHNpZGUgdGhpcyByYW5nZSBhcmUgYWRkZWRcblx0ICogdG8gb3Igc3VidHJhY3RlZCBmcm9tIDM2MCB0byBvYnRhaW4gYSB2YWx1ZSB3aXRoaW4gdGhlIHJhbmdlLlxuXHQgKi9cblx0cHVibGljIGdldCByb3RhdGlvblooKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9yb3RhdGlvbloqTWF0aENvbnN0cy5SQURJQU5TX1RPX0RFR1JFRVM7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHJvdGF0aW9uWih2YWw6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHRoaXMucm90YXRpb25aID09IHZhbClcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3JvdGF0aW9uWiA9IHZhbCpNYXRoQ29uc3RzLkRFR1JFRVNfVE9fUkFESUFOUztcblxuXHRcdHRoaXMuaW52YWxpZGF0ZVJvdGF0aW9uKCk7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIGN1cnJlbnQgc2NhbGluZyBncmlkIHRoYXQgaXMgaW4gZWZmZWN0LiBJZiBzZXQgdG8gPGNvZGU+bnVsbDwvY29kZT4sXG5cdCAqIHRoZSBlbnRpcmUgZGlzcGxheSBvYmplY3QgaXMgc2NhbGVkIG5vcm1hbGx5IHdoZW4gYW55IHNjYWxlIHRyYW5zZm9ybWF0aW9uXG5cdCAqIGlzIGFwcGxpZWQuXG5cdCAqXG5cdCAqIDxwPldoZW4geW91IGRlZmluZSB0aGUgPGNvZGU+c2NhbGU5R3JpZDwvY29kZT4gcHJvcGVydHksIHRoZSBkaXNwbGF5XG5cdCAqIG9iamVjdCBpcyBkaXZpZGVkIGludG8gYSBncmlkIHdpdGggbmluZSByZWdpb25zIGJhc2VkIG9uIHRoZVxuXHQgKiA8Y29kZT5zY2FsZTlHcmlkPC9jb2RlPiByZWN0YW5nbGUsIHdoaWNoIGRlZmluZXMgdGhlIGNlbnRlciByZWdpb24gb2YgdGhlXG5cdCAqIGdyaWQuIFRoZSBlaWdodCBvdGhlciByZWdpb25zIG9mIHRoZSBncmlkIGFyZSB0aGUgZm9sbG93aW5nIGFyZWFzOiA8L3A+XG5cdCAqXG5cdCAqIDx1bD5cblx0ICogICA8bGk+VGhlIHVwcGVyLWxlZnQgY29ybmVyIG91dHNpZGUgb2YgdGhlIHJlY3RhbmdsZTwvbGk+XG5cdCAqICAgPGxpPlRoZSBhcmVhIGFib3ZlIHRoZSByZWN0YW5nbGUgPC9saT5cblx0ICogICA8bGk+VGhlIHVwcGVyLXJpZ2h0IGNvcm5lciBvdXRzaWRlIG9mIHRoZSByZWN0YW5nbGU8L2xpPlxuXHQgKiAgIDxsaT5UaGUgYXJlYSB0byB0aGUgbGVmdCBvZiB0aGUgcmVjdGFuZ2xlPC9saT5cblx0ICogICA8bGk+VGhlIGFyZWEgdG8gdGhlIHJpZ2h0IG9mIHRoZSByZWN0YW5nbGU8L2xpPlxuXHQgKiAgIDxsaT5UaGUgbG93ZXItbGVmdCBjb3JuZXIgb3V0c2lkZSBvZiB0aGUgcmVjdGFuZ2xlPC9saT5cblx0ICogICA8bGk+VGhlIGFyZWEgYmVsb3cgdGhlIHJlY3RhbmdsZTwvbGk+XG5cdCAqICAgPGxpPlRoZSBsb3dlci1yaWdodCBjb3JuZXIgb3V0c2lkZSBvZiB0aGUgcmVjdGFuZ2xlPC9saT5cblx0ICogPC91bD5cblx0ICpcblx0ICogPHA+WW91IGNhbiB0aGluayBvZiB0aGUgZWlnaHQgcmVnaW9ucyBvdXRzaWRlIG9mIHRoZSBjZW50ZXIoZGVmaW5lZCBieVxuXHQgKiB0aGUgcmVjdGFuZ2xlKSBhcyBiZWluZyBsaWtlIGEgcGljdHVyZSBmcmFtZSB0aGF0IGhhcyBzcGVjaWFsIHJ1bGVzXG5cdCAqIGFwcGxpZWQgdG8gaXQgd2hlbiBzY2FsZWQuPC9wPlxuXHQgKlxuXHQgKiA8cD5XaGVuIHRoZSA8Y29kZT5zY2FsZTlHcmlkPC9jb2RlPiBwcm9wZXJ0eSBpcyBzZXQgYW5kIGEgZGlzcGxheSBvYmplY3Rcblx0ICogaXMgc2NhbGVkLCBhbGwgdGV4dCBhbmQgZ3JhZGllbnRzIGFyZSBzY2FsZWQgbm9ybWFsbHk7IGhvd2V2ZXIsIGZvciBvdGhlclxuXHQgKiB0eXBlcyBvZiBvYmplY3RzIHRoZSBmb2xsb3dpbmcgcnVsZXMgYXBwbHk6PC9wPlxuXHQgKlxuXHQgKiA8dWw+XG5cdCAqICAgPGxpPkNvbnRlbnQgaW4gdGhlIGNlbnRlciByZWdpb24gaXMgc2NhbGVkIG5vcm1hbGx5LiA8L2xpPlxuXHQgKiAgIDxsaT5Db250ZW50IGluIHRoZSBjb3JuZXJzIGlzIG5vdCBzY2FsZWQuIDwvbGk+XG5cdCAqICAgPGxpPkNvbnRlbnQgaW4gdGhlIHRvcCBhbmQgYm90dG9tIHJlZ2lvbnMgaXMgc2NhbGVkIGhvcml6b250YWxseSBvbmx5LlxuXHQgKiBDb250ZW50IGluIHRoZSBsZWZ0IGFuZCByaWdodCByZWdpb25zIGlzIHNjYWxlZCB2ZXJ0aWNhbGx5IG9ubHkuPC9saT5cblx0ICogICA8bGk+QWxsIGZpbGxzKGluY2x1ZGluZyBiaXRtYXBzLCB2aWRlbywgYW5kIGdyYWRpZW50cykgYXJlIHN0cmV0Y2hlZCB0b1xuXHQgKiBmaXQgdGhlaXIgc2hhcGVzLjwvbGk+XG5cdCAqIDwvdWw+XG5cdCAqXG5cdCAqIDxwPklmIGEgZGlzcGxheSBvYmplY3QgaXMgcm90YXRlZCwgYWxsIHN1YnNlcXVlbnQgc2NhbGluZyBpcyBub3JtYWwoYW5kXG5cdCAqIHRoZSA8Y29kZT5zY2FsZTlHcmlkPC9jb2RlPiBwcm9wZXJ0eSBpcyBpZ25vcmVkKS48L3A+XG5cdCAqXG5cdCAqIDxwPkZvciBleGFtcGxlLCBjb25zaWRlciB0aGUgZm9sbG93aW5nIGRpc3BsYXkgb2JqZWN0IGFuZCBhIHJlY3RhbmdsZSB0aGF0XG5cdCAqIGlzIGFwcGxpZWQgYXMgdGhlIGRpc3BsYXkgb2JqZWN0J3MgPGNvZGU+c2NhbGU5R3JpZDwvY29kZT46PC9wPlxuXHQgKlxuXHQgKiA8cD5BIGNvbW1vbiB1c2UgZm9yIHNldHRpbmcgPGNvZGU+c2NhbGU5R3JpZDwvY29kZT4gaXMgdG8gc2V0IHVwIGEgZGlzcGxheVxuXHQgKiBvYmplY3QgdG8gYmUgdXNlZCBhcyBhIGNvbXBvbmVudCwgaW4gd2hpY2ggZWRnZSByZWdpb25zIHJldGFpbiB0aGUgc2FtZVxuXHQgKiB3aWR0aCB3aGVuIHRoZSBjb21wb25lbnQgaXMgc2NhbGVkLjwvcD5cblx0ICpcblx0ICogQHRocm93cyBBcmd1bWVudEVycm9yIElmIHlvdSBwYXNzIGFuIGludmFsaWQgYXJndW1lbnQgdG8gdGhlIG1ldGhvZC5cblx0ICovXG5cdHB1YmxpYyBzY2FsZTlHcmlkOlJlY3RhbmdsZTtcblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHRoZSBob3Jpem9udGFsIHNjYWxlKHBlcmNlbnRhZ2UpIG9mIHRoZSBvYmplY3QgYXMgYXBwbGllZCBmcm9tXG5cdCAqIHRoZSByZWdpc3RyYXRpb24gcG9pbnQuIFRoZSBkZWZhdWx0IHJlZ2lzdHJhdGlvbiBwb2ludCBpcygwLDApLiAxLjBcblx0ICogZXF1YWxzIDEwMCUgc2NhbGUuXG5cdCAqXG5cdCAqIDxwPlNjYWxpbmcgdGhlIGxvY2FsIGNvb3JkaW5hdGUgc3lzdGVtIGNoYW5nZXMgdGhlIDxjb2RlPng8L2NvZGU+IGFuZFxuXHQgKiA8Y29kZT55PC9jb2RlPiBwcm9wZXJ0eSB2YWx1ZXMsIHdoaWNoIGFyZSBkZWZpbmVkIGluIHdob2xlIHBpeGVscy4gPC9wPlxuXHQgKi9cblx0cHVibGljIGdldCBzY2FsZVgoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wU2NhbGVYO1xuXHR9XG5cblx0cHVibGljIHNldCBzY2FsZVgodmFsOm51bWJlcilcblx0e1xuXHRcdGlmICh0aGlzLl9wU2NhbGVYID09IHZhbClcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3BTY2FsZVggPSB2YWw7XG5cblx0XHR0aGlzLmludmFsaWRhdGVTY2FsZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB0aGUgdmVydGljYWwgc2NhbGUocGVyY2VudGFnZSkgb2YgYW4gb2JqZWN0IGFzIGFwcGxpZWQgZnJvbSB0aGVcblx0ICogcmVnaXN0cmF0aW9uIHBvaW50IG9mIHRoZSBvYmplY3QuIFRoZSBkZWZhdWx0IHJlZ2lzdHJhdGlvbiBwb2ludCBpcygwLDApLlxuXHQgKiAxLjAgaXMgMTAwJSBzY2FsZS5cblx0ICpcblx0ICogPHA+U2NhbGluZyB0aGUgbG9jYWwgY29vcmRpbmF0ZSBzeXN0ZW0gY2hhbmdlcyB0aGUgPGNvZGU+eDwvY29kZT4gYW5kXG5cdCAqIDxjb2RlPnk8L2NvZGU+IHByb3BlcnR5IHZhbHVlcywgd2hpY2ggYXJlIGRlZmluZWQgaW4gd2hvbGUgcGl4ZWxzLiA8L3A+XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHNjYWxlWSgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BTY2FsZVk7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHNjYWxlWSh2YWw6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3BTY2FsZVkgPT0gdmFsKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fcFNjYWxlWSA9IHZhbDtcblxuXHRcdHRoaXMuaW52YWxpZGF0ZVNjYWxlKCk7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHRoZSBkZXB0aCBzY2FsZShwZXJjZW50YWdlKSBvZiBhbiBvYmplY3QgYXMgYXBwbGllZCBmcm9tIHRoZVxuXHQgKiByZWdpc3RyYXRpb24gcG9pbnQgb2YgdGhlIG9iamVjdC4gVGhlIGRlZmF1bHQgcmVnaXN0cmF0aW9uIHBvaW50IGlzKDAsMCkuXG5cdCAqIDEuMCBpcyAxMDAlIHNjYWxlLlxuXHQgKlxuXHQgKiA8cD5TY2FsaW5nIHRoZSBsb2NhbCBjb29yZGluYXRlIHN5c3RlbSBjaGFuZ2VzIHRoZSA8Y29kZT54PC9jb2RlPixcblx0ICogPGNvZGU+eTwvY29kZT4gYW5kIDxjb2RlPno8L2NvZGU+IHByb3BlcnR5IHZhbHVlcywgd2hpY2ggYXJlIGRlZmluZWQgaW5cblx0ICogd2hvbGUgcGl4ZWxzLiA8L3A+XG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHNjYWxlWigpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BTY2FsZVo7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHNjYWxlWih2YWw6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3BTY2FsZVogPT0gdmFsKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fcFNjYWxlWiA9IHZhbDtcblxuXHRcdHRoaXMuaW52YWxpZGF0ZVNjYWxlKCk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgc2NlbmUoKTpTY2VuZVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3BTY2VuZTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBzY2VuZVBvc2l0aW9uKCk6VmVjdG9yM0Rcblx0e1xuXHRcdGlmICh0aGlzLl9zY2VuZVBvc2l0aW9uRGlydHkpIHtcblx0XHRcdGlmICghdGhpcy5fcGl2b3RaZXJvICYmIHRoaXMuYWxpZ25tZW50TW9kZSA9PSBBbGlnbm1lbnRNb2RlLlBJVk9UX1BPSU5UKSB7XG5cdFx0XHRcdHZhciBwaXZvdFNjYWxlOlZlY3RvcjNEID0gbmV3IFZlY3RvcjNEKHRoaXMuX3Bpdm90LngvdGhpcy5fcFNjYWxlWCwgdGhpcy5fcGl2b3QueS90aGlzLl9wU2NhbGVZLCB0aGlzLl9waXZvdC56L3RoaXMuX3BTY2FsZVopXG5cdFx0XHRcdFx0dGhpcy5fc2NlbmVQb3NpdGlvbiA9IHRoaXMuc2NlbmVUcmFuc2Zvcm0udHJhbnNmb3JtVmVjdG9yKHBpdm90U2NhbGUpO1xuXHRcdFx0XHQvL3RoaXMuX3NjZW5lUG9zaXRpb24uZGVjcmVtZW50QnkobmV3IFZlY3RvcjNEKHRoaXMuX3Bpdm90LngqdGhpcy5fcFNjYWxlWCwgdGhpcy5fcGl2b3QueSp0aGlzLl9wU2NhbGVZLCB0aGlzLl9waXZvdC56KnRoaXMuX3BTY2FsZVopKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuc2NlbmVUcmFuc2Zvcm0uY29weUNvbHVtblRvKDMsIHRoaXMuX3NjZW5lUG9zaXRpb24pO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLl9zY2VuZVBvc2l0aW9uRGlydHkgPSBmYWxzZTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuX3NjZW5lUG9zaXRpb247XG5cdH1cblxuXHRwdWJsaWMgZ2V0IHNjZW5lVHJhbnNmb3JtKCk6TWF0cml4M0Rcblx0e1xuXHRcdGlmICh0aGlzLl9wU2NlbmVUcmFuc2Zvcm1EaXJ0eSlcblx0XHRcdHRoaXMucFVwZGF0ZVNjZW5lVHJhbnNmb3JtKCk7XG5cblx0XHRyZXR1cm4gdGhpcy5fcFNjZW5lVHJhbnNmb3JtO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBzY3JvbGwgcmVjdGFuZ2xlIGJvdW5kcyBvZiB0aGUgZGlzcGxheSBvYmplY3QuIFRoZSBkaXNwbGF5IG9iamVjdCBpc1xuXHQgKiBjcm9wcGVkIHRvIHRoZSBzaXplIGRlZmluZWQgYnkgdGhlIHJlY3RhbmdsZSwgYW5kIGl0IHNjcm9sbHMgd2l0aGluIHRoZVxuXHQgKiByZWN0YW5nbGUgd2hlbiB5b3UgY2hhbmdlIHRoZSA8Y29kZT54PC9jb2RlPiBhbmQgPGNvZGU+eTwvY29kZT4gcHJvcGVydGllc1xuXHQgKiBvZiB0aGUgPGNvZGU+c2Nyb2xsUmVjdDwvY29kZT4gb2JqZWN0LlxuXHQgKlxuXHQgKiA8cD5UaGUgcHJvcGVydGllcyBvZiB0aGUgPGNvZGU+c2Nyb2xsUmVjdDwvY29kZT4gUmVjdGFuZ2xlIG9iamVjdCB1c2UgdGhlXG5cdCAqIGRpc3BsYXkgb2JqZWN0J3MgY29vcmRpbmF0ZSBzcGFjZSBhbmQgYXJlIHNjYWxlZCBqdXN0IGxpa2UgdGhlIG92ZXJhbGxcblx0ICogZGlzcGxheSBvYmplY3QuIFRoZSBjb3JuZXIgYm91bmRzIG9mIHRoZSBjcm9wcGVkIHdpbmRvdyBvbiB0aGUgc2Nyb2xsaW5nXG5cdCAqIGRpc3BsYXkgb2JqZWN0IGFyZSB0aGUgb3JpZ2luIG9mIHRoZSBkaXNwbGF5IG9iamVjdCgwLDApIGFuZCB0aGUgcG9pbnRcblx0ICogZGVmaW5lZCBieSB0aGUgd2lkdGggYW5kIGhlaWdodCBvZiB0aGUgcmVjdGFuZ2xlLiBUaGV5IGFyZSBub3QgY2VudGVyZWRcblx0ICogYXJvdW5kIHRoZSBvcmlnaW4sIGJ1dCB1c2UgdGhlIG9yaWdpbiB0byBkZWZpbmUgdGhlIHVwcGVyLWxlZnQgY29ybmVyIG9mXG5cdCAqIHRoZSBhcmVhLiBBIHNjcm9sbGVkIGRpc3BsYXkgb2JqZWN0IGFsd2F5cyBzY3JvbGxzIGluIHdob2xlIHBpeGVsXG5cdCAqIGluY3JlbWVudHMuIDwvcD5cblx0ICpcblx0ICogPHA+WW91IGNhbiBzY3JvbGwgYW4gb2JqZWN0IGxlZnQgYW5kIHJpZ2h0IGJ5IHNldHRpbmcgdGhlIDxjb2RlPng8L2NvZGU+XG5cdCAqIHByb3BlcnR5IG9mIHRoZSA8Y29kZT5zY3JvbGxSZWN0PC9jb2RlPiBSZWN0YW5nbGUgb2JqZWN0LiBZb3UgY2FuIHNjcm9sbFxuXHQgKiBhbiBvYmplY3QgdXAgYW5kIGRvd24gYnkgc2V0dGluZyB0aGUgPGNvZGU+eTwvY29kZT4gcHJvcGVydHkgb2YgdGhlXG5cdCAqIDxjb2RlPnNjcm9sbFJlY3Q8L2NvZGU+IFJlY3RhbmdsZSBvYmplY3QuIElmIHRoZSBkaXNwbGF5IG9iamVjdCBpcyByb3RhdGVkXG5cdCAqIDkwwrAgYW5kIHlvdSBzY3JvbGwgaXQgbGVmdCBhbmQgcmlnaHQsIHRoZSBkaXNwbGF5IG9iamVjdCBhY3R1YWxseSBzY3JvbGxzXG5cdCAqIHVwIGFuZCBkb3duLjwvcD5cblx0ICovXG5cdHB1YmxpYyBzY3JvbGxSZWN0OlJlY3RhbmdsZTtcblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgc2hhZGVyUGlja2luZ0RldGFpbHMoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fc2hhZGVyUGlja2luZ0RldGFpbHM7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgZGVidWdWaXNpYmxlKCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2RlYnVnVmlzaWJsZTtcblx0fVxuXG5cdHB1YmxpYyBzZXQgZGVidWdWaXNpYmxlKHZhbHVlOmJvb2xlYW4pXG5cdHtcblx0XHRpZiAodmFsdWUgPT0gdGhpcy5fZGVidWdWaXNpYmxlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fZGVidWdWaXNpYmxlID0gdmFsdWU7XG5cblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX2VudGl0eU5vZGVzLmxlbmd0aDtcblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBsZW47IGkrKylcblx0XHRcdHRoaXMuX2VudGl0eU5vZGVzW2ldLmRlYnVnVmlzaWJsZSA9IHRoaXMuX2RlYnVnVmlzaWJsZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBbiBvYmplY3Qgd2l0aCBwcm9wZXJ0aWVzIHBlcnRhaW5pbmcgdG8gYSBkaXNwbGF5IG9iamVjdCdzIG1hdHJpeCwgY29sb3Jcblx0ICogdHJhbnNmb3JtLCBhbmQgcGl4ZWwgYm91bmRzLiBUaGUgc3BlY2lmaWMgcHJvcGVydGllcyAgLSAgbWF0cml4LFxuXHQgKiBjb2xvclRyYW5zZm9ybSwgYW5kIHRocmVlIHJlYWQtb25seSBwcm9wZXJ0aWVzXG5cdCAqICg8Y29kZT5jb25jYXRlbmF0ZWRNYXRyaXg8L2NvZGU+LCA8Y29kZT5jb25jYXRlbmF0ZWRDb2xvclRyYW5zZm9ybTwvY29kZT4sXG5cdCAqIGFuZCA8Y29kZT5waXhlbEJvdW5kczwvY29kZT4pICAtICBhcmUgZGVzY3JpYmVkIGluIHRoZSBlbnRyeSBmb3IgdGhlXG5cdCAqIFRyYW5zZm9ybSBjbGFzcy5cblx0ICpcblx0ICogPHA+RWFjaCBvZiB0aGUgdHJhbnNmb3JtIG9iamVjdCdzIHByb3BlcnRpZXMgaXMgaXRzZWxmIGFuIG9iamVjdC4gVGhpc1xuXHQgKiBjb25jZXB0IGlzIGltcG9ydGFudCBiZWNhdXNlIHRoZSBvbmx5IHdheSB0byBzZXQgbmV3IHZhbHVlcyBmb3IgdGhlIG1hdHJpeFxuXHQgKiBvciBjb2xvclRyYW5zZm9ybSBvYmplY3RzIGlzIHRvIGNyZWF0ZSBhIG5ldyBvYmplY3QgYW5kIGNvcHkgdGhhdCBvYmplY3Rcblx0ICogaW50byB0aGUgdHJhbnNmb3JtLm1hdHJpeCBvciB0cmFuc2Zvcm0uY29sb3JUcmFuc2Zvcm0gcHJvcGVydHkuPC9wPlxuXHQgKlxuXHQgKiA8cD5Gb3IgZXhhbXBsZSwgdG8gaW5jcmVhc2UgdGhlIDxjb2RlPnR4PC9jb2RlPiB2YWx1ZSBvZiBhIGRpc3BsYXlcblx0ICogb2JqZWN0J3MgbWF0cml4LCB5b3UgbXVzdCBtYWtlIGEgY29weSBvZiB0aGUgZW50aXJlIG1hdHJpeCBvYmplY3QsIHRoZW5cblx0ICogY29weSB0aGUgbmV3IG9iamVjdCBpbnRvIHRoZSBtYXRyaXggcHJvcGVydHkgb2YgdGhlIHRyYW5zZm9ybSBvYmplY3Q6PC9wPlxuXHQgKiA8cHJlIHhtbDpzcGFjZT1cInByZXNlcnZlXCI+PGNvZGU+IHB1YmxpYyBteU1hdHJpeDpNYXRyaXggPVxuXHQgKiBteURpc3BsYXlPYmplY3QudHJhbnNmb3JtLm1hdHJpeDsgbXlNYXRyaXgudHggKz0gMTA7XG5cdCAqIG15RGlzcGxheU9iamVjdC50cmFuc2Zvcm0ubWF0cml4ID0gbXlNYXRyaXg7IDwvY29kZT48L3ByZT5cblx0ICpcblx0ICogPHA+WW91IGNhbm5vdCBkaXJlY3RseSBzZXQgdGhlIDxjb2RlPnR4PC9jb2RlPiBwcm9wZXJ0eS4gVGhlIGZvbGxvd2luZ1xuXHQgKiBjb2RlIGhhcyBubyBlZmZlY3Qgb24gPGNvZGU+bXlEaXNwbGF5T2JqZWN0PC9jb2RlPjogPC9wPlxuXHQgKiA8cHJlIHhtbDpzcGFjZT1cInByZXNlcnZlXCI+PGNvZGU+IG15RGlzcGxheU9iamVjdC50cmFuc2Zvcm0ubWF0cml4LnR4ICs9XG5cdCAqIDEwOyA8L2NvZGU+PC9wcmU+XG5cdCAqXG5cdCAqIDxwPllvdSBjYW4gYWxzbyBjb3B5IGFuIGVudGlyZSB0cmFuc2Zvcm0gb2JqZWN0IGFuZCBhc3NpZ24gaXQgdG8gYW5vdGhlclxuXHQgKiBkaXNwbGF5IG9iamVjdCdzIHRyYW5zZm9ybSBwcm9wZXJ0eS4gRm9yIGV4YW1wbGUsIHRoZSBmb2xsb3dpbmcgY29kZVxuXHQgKiBjb3BpZXMgdGhlIGVudGlyZSB0cmFuc2Zvcm0gb2JqZWN0IGZyb20gPGNvZGU+bXlPbGREaXNwbGF5T2JqPC9jb2RlPiB0b1xuXHQgKiA8Y29kZT5teU5ld0Rpc3BsYXlPYmo8L2NvZGU+OjwvcD5cblx0ICogPGNvZGU+bXlOZXdEaXNwbGF5T2JqLnRyYW5zZm9ybSA9IG15T2xkRGlzcGxheU9iai50cmFuc2Zvcm07PC9jb2RlPlxuXHQgKlxuXHQgKiA8cD5UaGUgcmVzdWx0aW5nIGRpc3BsYXkgb2JqZWN0LCA8Y29kZT5teU5ld0Rpc3BsYXlPYmo8L2NvZGU+LCBub3cgaGFzIHRoZVxuXHQgKiBzYW1lIHZhbHVlcyBmb3IgaXRzIG1hdHJpeCwgY29sb3IgdHJhbnNmb3JtLCBhbmQgcGl4ZWwgYm91bmRzIGFzIHRoZSBvbGRcblx0ICogZGlzcGxheSBvYmplY3QsIDxjb2RlPm15T2xkRGlzcGxheU9iajwvY29kZT4uPC9wPlxuXHQgKlxuXHQgKiA8cD5Ob3RlIHRoYXQgQUlSIGZvciBUViBkZXZpY2VzIHVzZSBoYXJkd2FyZSBhY2NlbGVyYXRpb24sIGlmIGl0IGlzXG5cdCAqIGF2YWlsYWJsZSwgZm9yIGNvbG9yIHRyYW5zZm9ybXMuPC9wPlxuXHQgKi9cblx0cHVibGljIGdldCB0cmFuc2Zvcm0oKTpUcmFuc2Zvcm1cblx0e1xuXHRcdHJldHVybiB0aGlzLl90cmFuc2Zvcm07XG5cdH1cblxuXHQvKipcblx0ICogV2hldGhlciBvciBub3QgdGhlIGRpc3BsYXkgb2JqZWN0IGlzIHZpc2libGUuIERpc3BsYXkgb2JqZWN0cyB0aGF0IGFyZSBub3Rcblx0ICogdmlzaWJsZSBhcmUgZGlzYWJsZWQuIEZvciBleGFtcGxlLCBpZiA8Y29kZT52aXNpYmxlPWZhbHNlPC9jb2RlPiBmb3IgYW5cblx0ICogSW50ZXJhY3RpdmVPYmplY3QgaW5zdGFuY2UsIGl0IGNhbm5vdCBiZSBjbGlja2VkLlxuXHQgKi9cblx0cHVibGljIGdldCB2aXNpYmxlKCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2V4cGxpY2l0VmlzaWJpbGl0eTtcblx0fVxuXG5cdHB1YmxpYyBzZXQgdmlzaWJsZSh2YWx1ZTpib29sZWFuKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2V4cGxpY2l0VmlzaWJpbGl0eSA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX2V4cGxpY2l0VmlzaWJpbGl0eSA9IHZhbHVlO1xuXG5cdFx0dGhpcy5fcFVwZGF0ZUltcGxpY2l0VmlzaWJpbGl0eSh0aGlzLl9wUGFyZW50PyB0aGlzLl9wUGFyZW50Ll9pSXNWaXNpYmxlKCkgOiB0cnVlKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgdGhlIHdpZHRoIG9mIHRoZSBkaXNwbGF5IG9iamVjdCwgaW4gcGl4ZWxzLiBUaGUgd2lkdGggaXNcblx0ICogY2FsY3VsYXRlZCBiYXNlZCBvbiB0aGUgYm91bmRzIG9mIHRoZSBjb250ZW50IG9mIHRoZSBkaXNwbGF5IG9iamVjdC4gV2hlblxuXHQgKiB5b3Ugc2V0IHRoZSA8Y29kZT53aWR0aDwvY29kZT4gcHJvcGVydHksIHRoZSA8Y29kZT5zY2FsZVg8L2NvZGU+IHByb3BlcnR5XG5cdCAqIGlzIGFkanVzdGVkIGFjY29yZGluZ2x5LCBhcyBzaG93biBpbiB0aGUgZm9sbG93aW5nIGNvZGU6XG5cdCAqXG5cdCAqIDxwPkV4Y2VwdCBmb3IgVGV4dEZpZWxkIGFuZCBWaWRlbyBvYmplY3RzLCBhIGRpc3BsYXkgb2JqZWN0IHdpdGggbm9cblx0ICogY29udGVudChzdWNoIGFzIGFuIGVtcHR5IHNwcml0ZSkgaGFzIGEgd2lkdGggb2YgMCwgZXZlbiBpZiB5b3UgdHJ5IHRvIHNldFxuXHQgKiA8Y29kZT53aWR0aDwvY29kZT4gdG8gYSBkaWZmZXJlbnQgdmFsdWUuPC9wPlxuXHQgKi9cblx0cHVibGljIGdldCB3aWR0aCgpOm51bWJlclxuXHR7XG5cdFx0aWYgKHRoaXMuX2JveEJvdW5kc0ludmFsaWQpXG5cdFx0XHR0aGlzLl9wVXBkYXRlQm94Qm91bmRzKCk7XG5cblx0XHRyZXR1cm4gdGhpcy5fcEJveEJvdW5kcy53aWR0aCp0aGlzLl9wU2NhbGVYO1xuXHR9XG5cblx0cHVibGljIHNldCB3aWR0aCh2YWw6bnVtYmVyKVxuXHR7XG5cdFx0dmFyIHNjYWxlWDpudW1iZXIgPSB2YWwvdGhpcy5nZXRCb3goKS53aWR0aDtcblxuXHRcdGlmICh0aGlzLl9wU2NhbGVYID09IHNjYWxlWClcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3BTY2FsZVggPSBzY2FsZVg7XG5cblx0XHR0aGlzLmludmFsaWRhdGVTY2FsZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB0aGUgPGk+eDwvaT4gY29vcmRpbmF0ZSBvZiB0aGUgRGlzcGxheU9iamVjdCBpbnN0YW5jZSByZWxhdGl2ZVxuXHQgKiB0byB0aGUgbG9jYWwgY29vcmRpbmF0ZXMgb2YgdGhlIHBhcmVudCBEaXNwbGF5T2JqZWN0Q29udGFpbmVyLiBJZiB0aGVcblx0ICogb2JqZWN0IGlzIGluc2lkZSBhIERpc3BsYXlPYmplY3RDb250YWluZXIgdGhhdCBoYXMgdHJhbnNmb3JtYXRpb25zLCBpdCBpc1xuXHQgKiBpbiB0aGUgbG9jYWwgY29vcmRpbmF0ZSBzeXN0ZW0gb2YgdGhlIGVuY2xvc2luZyBEaXNwbGF5T2JqZWN0Q29udGFpbmVyLlxuXHQgKiBUaHVzLCBmb3IgYSBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIHJvdGF0ZWQgOTDCsCBjb3VudGVyY2xvY2t3aXNlLCB0aGVcblx0ICogRGlzcGxheU9iamVjdENvbnRhaW5lcidzIGNoaWxkcmVuIGluaGVyaXQgYSBjb29yZGluYXRlIHN5c3RlbSB0aGF0IGlzXG5cdCAqIHJvdGF0ZWQgOTDCsCBjb3VudGVyY2xvY2t3aXNlLiBUaGUgb2JqZWN0J3MgY29vcmRpbmF0ZXMgcmVmZXIgdG8gdGhlXG5cdCAqIHJlZ2lzdHJhdGlvbiBwb2ludCBwb3NpdGlvbi5cblx0ICovXG5cdHB1YmxpYyBnZXQgeCgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3g7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHgodmFsOm51bWJlcilcblx0e1xuXHRcdGlmICh0aGlzLl94ID09IHZhbClcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3ggPSB2YWw7XG5cblx0XHR0aGlzLmludmFsaWRhdGVQb3NpdGlvbigpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB0aGUgPGk+eTwvaT4gY29vcmRpbmF0ZSBvZiB0aGUgRGlzcGxheU9iamVjdCBpbnN0YW5jZSByZWxhdGl2ZVxuXHQgKiB0byB0aGUgbG9jYWwgY29vcmRpbmF0ZXMgb2YgdGhlIHBhcmVudCBEaXNwbGF5T2JqZWN0Q29udGFpbmVyLiBJZiB0aGVcblx0ICogb2JqZWN0IGlzIGluc2lkZSBhIERpc3BsYXlPYmplY3RDb250YWluZXIgdGhhdCBoYXMgdHJhbnNmb3JtYXRpb25zLCBpdCBpc1xuXHQgKiBpbiB0aGUgbG9jYWwgY29vcmRpbmF0ZSBzeXN0ZW0gb2YgdGhlIGVuY2xvc2luZyBEaXNwbGF5T2JqZWN0Q29udGFpbmVyLlxuXHQgKiBUaHVzLCBmb3IgYSBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIHJvdGF0ZWQgOTDCsCBjb3VudGVyY2xvY2t3aXNlLCB0aGVcblx0ICogRGlzcGxheU9iamVjdENvbnRhaW5lcidzIGNoaWxkcmVuIGluaGVyaXQgYSBjb29yZGluYXRlIHN5c3RlbSB0aGF0IGlzXG5cdCAqIHJvdGF0ZWQgOTDCsCBjb3VudGVyY2xvY2t3aXNlLiBUaGUgb2JqZWN0J3MgY29vcmRpbmF0ZXMgcmVmZXIgdG8gdGhlXG5cdCAqIHJlZ2lzdHJhdGlvbiBwb2ludCBwb3NpdGlvbi5cblx0ICovXG5cdHB1YmxpYyBnZXQgeSgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3k7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHkodmFsOm51bWJlcilcblx0e1xuXHRcdGlmICh0aGlzLl95ID09IHZhbClcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3kgPSB2YWw7XG5cblx0XHR0aGlzLmludmFsaWRhdGVQb3NpdGlvbigpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB0aGUgeiBjb29yZGluYXRlIHBvc2l0aW9uIGFsb25nIHRoZSB6LWF4aXMgb2YgdGhlIERpc3BsYXlPYmplY3Rcblx0ICogaW5zdGFuY2UgcmVsYXRpdmUgdG8gdGhlIDNEIHBhcmVudCBjb250YWluZXIuIFRoZSB6IHByb3BlcnR5IGlzIHVzZWQgZm9yXG5cdCAqIDNEIGNvb3JkaW5hdGVzLCBub3Qgc2NyZWVuIG9yIHBpeGVsIGNvb3JkaW5hdGVzLlxuXHQgKlxuXHQgKiA8cD5XaGVuIHlvdSBzZXQgYSA8Y29kZT56PC9jb2RlPiBwcm9wZXJ0eSBmb3IgYSBkaXNwbGF5IG9iamVjdCB0b1xuXHQgKiBzb21ldGhpbmcgb3RoZXIgdGhhbiB0aGUgZGVmYXVsdCB2YWx1ZSBvZiA8Y29kZT4wPC9jb2RlPiwgYSBjb3JyZXNwb25kaW5nXG5cdCAqIE1hdHJpeDNEIG9iamVjdCBpcyBhdXRvbWF0aWNhbGx5IGNyZWF0ZWQuIGZvciBhZGp1c3RpbmcgYSBkaXNwbGF5IG9iamVjdCdzXG5cdCAqIHBvc2l0aW9uIGFuZCBvcmllbnRhdGlvbiBpbiB0aHJlZSBkaW1lbnNpb25zLiBXaGVuIHdvcmtpbmcgd2l0aCB0aGVcblx0ICogei1heGlzLCB0aGUgZXhpc3RpbmcgYmVoYXZpb3Igb2YgeCBhbmQgeSBwcm9wZXJ0aWVzIGNoYW5nZXMgZnJvbSBzY3JlZW4gb3Jcblx0ICogcGl4ZWwgY29vcmRpbmF0ZXMgdG8gcG9zaXRpb25zIHJlbGF0aXZlIHRvIHRoZSAzRCBwYXJlbnQgY29udGFpbmVyLjwvcD5cblx0ICpcblx0ICogPHA+Rm9yIGV4YW1wbGUsIGEgY2hpbGQgb2YgdGhlIDxjb2RlPl9yb290PC9jb2RlPiBhdCBwb3NpdGlvbiB4ID0gMTAwLCB5ID1cblx0ICogMTAwLCB6ID0gMjAwIGlzIG5vdCBkcmF3biBhdCBwaXhlbCBsb2NhdGlvbigxMDAsMTAwKS4gVGhlIGNoaWxkIGlzIGRyYXduXG5cdCAqIHdoZXJldmVyIHRoZSAzRCBwcm9qZWN0aW9uIGNhbGN1bGF0aW9uIHB1dHMgaXQuIFRoZSBjYWxjdWxhdGlvbiBpczo8L3A+XG5cdCAqXG5cdCAqIDxwPjxjb2RlPih4fn5jYW1lcmFGb2NhbExlbmd0aC9jYW1lcmFSZWxhdGl2ZVpQb3NpdGlvbixcblx0ICogeX5+Y2FtZXJhRm9jYWxMZW5ndGgvY2FtZXJhUmVsYXRpdmVaUG9zaXRpb24pPC9jb2RlPjwvcD5cblx0ICovXG5cdHB1YmxpYyBnZXQgeigpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3o7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHoodmFsOm51bWJlcilcblx0e1xuXHRcdGlmICh0aGlzLl96ID09IHZhbClcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3ogPSB2YWw7XG5cblx0XHR0aGlzLmludmFsaWRhdGVQb3NpdGlvbigpO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHpPZmZzZXQoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl96T2Zmc2V0O1xuXHR9XG5cblx0cHVibGljIHNldCB6T2Zmc2V0KHZhbHVlOm51bWJlcilcblx0e1xuXHRcdHRoaXMuX3pPZmZzZXQgPSB2YWx1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGEgbmV3IDxjb2RlPkRpc3BsYXlPYmplY3Q8L2NvZGU+IGluc3RhbmNlLlxuXHQgKi9cblx0Y29uc3RydWN0b3IoKVxuXHR7XG5cdFx0c3VwZXIoKTtcblxuXHRcdC8vIENhY2hlZCB2ZWN0b3Igb2YgdHJhbnNmb3JtYXRpb24gY29tcG9uZW50cyB1c2VkIHdoZW5cblx0XHQvLyByZWNvbXBvc2luZyB0aGUgdHJhbnNmb3JtIG1hdHJpeCBpbiB1cGRhdGVUcmFuc2Zvcm0oKVxuXG5cdFx0dGhpcy5fdHJhbnNmb3JtQ29tcG9uZW50cyA9IG5ldyBBcnJheTxWZWN0b3IzRD4oMyk7XG5cblx0XHR0aGlzLl90cmFuc2Zvcm1Db21wb25lbnRzWzBdID0gdGhpcy5fcG9zO1xuXHRcdHRoaXMuX3RyYW5zZm9ybUNvbXBvbmVudHNbMV0gPSB0aGlzLl9yb3Q7XG5cdFx0dGhpcy5fdHJhbnNmb3JtQ29tcG9uZW50c1syXSA9IHRoaXMuX3NjYTtcblxuXHRcdC8vY3JlYXRpb24gb2YgYXNzb2NpYXRlZCB0cmFuc2Zvcm0gb2JqZWN0XG5cdFx0dGhpcy5fdHJhbnNmb3JtID0gbmV3IFRyYW5zZm9ybSh0aGlzKTtcblxuXHRcdHRoaXMuX21hdHJpeDNELmlkZW50aXR5KCk7XG5cblx0XHR0aGlzLl9mbGlwWS5hcHBlbmRTY2FsZSgxLCAtMSwgMSk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBhZGRFdmVudExpc3RlbmVyKHR5cGU6c3RyaW5nLCBsaXN0ZW5lcjpGdW5jdGlvbilcblx0e1xuXHRcdHN1cGVyLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpO1xuXG5cdFx0c3dpdGNoICh0eXBlKSB7XG5cdFx0XHRjYXNlIERpc3BsYXlPYmplY3RFdmVudC5QT1NJVElPTl9DSEFOR0VEOlxuXHRcdFx0XHR0aGlzLl9saXN0ZW5Ub1Bvc2l0aW9uQ2hhbmdlZCA9IHRydWU7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBEaXNwbGF5T2JqZWN0RXZlbnQuUk9UQVRJT05fQ0hBTkdFRDpcblx0XHRcdFx0dGhpcy5fbGlzdGVuVG9Sb3RhdGlvbkNoYW5nZWQgPSB0cnVlO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgRGlzcGxheU9iamVjdEV2ZW50LlNDQUxFX0NIQU5HRUQ6XG5cdFx0XHRcdHRoaXMuX2xpc3RlblRvU2NhbGVDaGFuZ2VkID0gdHJ1ZTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIERpc3BsYXlPYmplY3RFdmVudC5TQ0VORV9DSEFOR0VEOlxuXHRcdFx0XHR0aGlzLl9saXN0ZW5Ub1NjZW5lQ2hhbmdlZCA9IHRydWU7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBEaXNwbGF5T2JqZWN0RXZlbnQuU0NFTkVUUkFOU0ZPUk1fQ0hBTkdFRDpcblx0XHRcdFx0dGhpcy5fbGlzdGVuVG9TY2VuZVRyYW5zZm9ybUNoYW5nZWQgPSB0cnVlO1xuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBjbG9uZSgpOkRpc3BsYXlPYmplY3Rcblx0e1xuXHRcdHZhciBjbG9uZTpEaXNwbGF5T2JqZWN0ID0gbmV3IERpc3BsYXlPYmplY3QoKTtcblx0XHRjbG9uZS5waXZvdCA9IHRoaXMucGl2b3Q7XG5cdFx0Y2xvbmUuX2lNYXRyaXgzRCA9IHRoaXMuX2lNYXRyaXgzRDtcblx0XHRjbG9uZS5uYW1lID0gbmFtZTtcblxuXHRcdC8vIHRvZG86IGltcGxlbWVudCBmb3IgYWxsIHN1YnR5cGVzXG5cdFx0cmV0dXJuIGNsb25lO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZGlzcG9zZSgpXG5cdHtcblx0XHRpZiAodGhpcy5wYXJlbnQpXG5cdFx0XHR0aGlzLnBhcmVudC5yZW1vdmVDaGlsZCh0aGlzKTtcblxuXHRcdHdoaWxlICh0aGlzLl9wUmVuZGVyYWJsZXMubGVuZ3RoKVxuXHRcdFx0dGhpcy5fcFJlbmRlcmFibGVzWzBdLmRpc3Bvc2UoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAaW5oZXJpdERvY1xuXHQgKi9cblx0cHVibGljIGRpc3Bvc2VBc3NldCgpXG5cdHtcblx0XHR0aGlzLmRpc3Bvc2UoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGEgcmVjdGFuZ2xlIHRoYXQgZGVmaW5lcyB0aGUgYXJlYSBvZiB0aGUgZGlzcGxheSBvYmplY3QgcmVsYXRpdmVcblx0ICogdG8gdGhlIGNvb3JkaW5hdGUgc3lzdGVtIG9mIHRoZSA8Y29kZT50YXJnZXRDb29yZGluYXRlU3BhY2U8L2NvZGU+IG9iamVjdC5cblx0ICogQ29uc2lkZXIgdGhlIGZvbGxvd2luZyBjb2RlLCB3aGljaCBzaG93cyBob3cgdGhlIHJlY3RhbmdsZSByZXR1cm5lZCBjYW5cblx0ICogdmFyeSBkZXBlbmRpbmcgb24gdGhlIDxjb2RlPnRhcmdldENvb3JkaW5hdGVTcGFjZTwvY29kZT4gcGFyYW1ldGVyIHRoYXRcblx0ICogeW91IHBhc3MgdG8gdGhlIG1ldGhvZDpcblx0ICpcblx0ICogPHA+PGI+Tm90ZTo8L2I+IFVzZSB0aGUgPGNvZGU+bG9jYWxUb0dsb2JhbCgpPC9jb2RlPiBhbmRcblx0ICogPGNvZGU+Z2xvYmFsVG9Mb2NhbCgpPC9jb2RlPiBtZXRob2RzIHRvIGNvbnZlcnQgdGhlIGRpc3BsYXkgb2JqZWN0J3MgbG9jYWxcblx0ICogY29vcmRpbmF0ZXMgdG8gZGlzcGxheSBjb29yZGluYXRlcywgb3IgZGlzcGxheSBjb29yZGluYXRlcyB0byBsb2NhbFxuXHQgKiBjb29yZGluYXRlcywgcmVzcGVjdGl2ZWx5LjwvcD5cblx0ICpcblx0ICogPHA+VGhlIDxjb2RlPmdldEJvdW5kcygpPC9jb2RlPiBtZXRob2QgaXMgc2ltaWxhciB0byB0aGVcblx0ICogPGNvZGU+Z2V0UmVjdCgpPC9jb2RlPiBtZXRob2Q7IGhvd2V2ZXIsIHRoZSBSZWN0YW5nbGUgcmV0dXJuZWQgYnkgdGhlXG5cdCAqIDxjb2RlPmdldEJvdW5kcygpPC9jb2RlPiBtZXRob2QgaW5jbHVkZXMgYW55IHN0cm9rZXMgb24gc2hhcGVzLCB3aGVyZWFzXG5cdCAqIHRoZSBSZWN0YW5nbGUgcmV0dXJuZWQgYnkgdGhlIDxjb2RlPmdldFJlY3QoKTwvY29kZT4gbWV0aG9kIGRvZXMgbm90LiBGb3Jcblx0ICogYW4gZXhhbXBsZSwgc2VlIHRoZSBkZXNjcmlwdGlvbiBvZiB0aGUgPGNvZGU+Z2V0UmVjdCgpPC9jb2RlPiBtZXRob2QuPC9wPlxuXHQgKlxuXHQgKiBAcGFyYW0gdGFyZ2V0Q29vcmRpbmF0ZVNwYWNlIFRoZSBkaXNwbGF5IG9iamVjdCB0aGF0IGRlZmluZXMgdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29vcmRpbmF0ZSBzeXN0ZW0gdG8gdXNlLlxuXHQgKiBAcmV0dXJuIFRoZSByZWN0YW5nbGUgdGhhdCBkZWZpbmVzIHRoZSBhcmVhIG9mIHRoZSBkaXNwbGF5IG9iamVjdCByZWxhdGl2ZVxuXHQgKiAgICAgICAgIHRvIHRoZSA8Y29kZT50YXJnZXRDb29yZGluYXRlU3BhY2U8L2NvZGU+IG9iamVjdCdzIGNvb3JkaW5hdGVcblx0ICogICAgICAgICBzeXN0ZW0uXG5cdCAqL1xuXHRwdWJsaWMgZ2V0Qm91bmRzKHRhcmdldENvb3JkaW5hdGVTcGFjZTpEaXNwbGF5T2JqZWN0KTpSZWN0YW5nbGVcblx0e1xuXHRcdHJldHVybiB0aGlzLl9ib3VuZHM7IC8vVE9ET1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgYSByZWN0YW5nbGUgdGhhdCBkZWZpbmVzIHRoZSBib3VuZGFyeSBvZiB0aGUgZGlzcGxheSBvYmplY3QsIGJhc2VkXG5cdCAqIG9uIHRoZSBjb29yZGluYXRlIHN5c3RlbSBkZWZpbmVkIGJ5IHRoZSA8Y29kZT50YXJnZXRDb29yZGluYXRlU3BhY2U8L2NvZGU+XG5cdCAqIHBhcmFtZXRlciwgZXhjbHVkaW5nIGFueSBzdHJva2VzIG9uIHNoYXBlcy4gVGhlIHZhbHVlcyB0aGF0IHRoZVxuXHQgKiA8Y29kZT5nZXRSZWN0KCk8L2NvZGU+IG1ldGhvZCByZXR1cm5zIGFyZSB0aGUgc2FtZSBvciBzbWFsbGVyIHRoYW4gdGhvc2Vcblx0ICogcmV0dXJuZWQgYnkgdGhlIDxjb2RlPmdldEJvdW5kcygpPC9jb2RlPiBtZXRob2QuXG5cdCAqXG5cdCAqIDxwPjxiPk5vdGU6PC9iPiBVc2UgPGNvZGU+bG9jYWxUb0dsb2JhbCgpPC9jb2RlPiBhbmRcblx0ICogPGNvZGU+Z2xvYmFsVG9Mb2NhbCgpPC9jb2RlPiBtZXRob2RzIHRvIGNvbnZlcnQgdGhlIGRpc3BsYXkgb2JqZWN0J3MgbG9jYWxcblx0ICogY29vcmRpbmF0ZXMgdG8gU2NlbmUgY29vcmRpbmF0ZXMsIG9yIFNjZW5lIGNvb3JkaW5hdGVzIHRvIGxvY2FsXG5cdCAqIGNvb3JkaW5hdGVzLCByZXNwZWN0aXZlbHkuPC9wPlxuXHQgKlxuXHQgKiBAcGFyYW0gdGFyZ2V0Q29vcmRpbmF0ZVNwYWNlIFRoZSBkaXNwbGF5IG9iamVjdCB0aGF0IGRlZmluZXMgdGhlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29vcmRpbmF0ZSBzeXN0ZW0gdG8gdXNlLlxuXHQgKiBAcmV0dXJuIFRoZSByZWN0YW5nbGUgdGhhdCBkZWZpbmVzIHRoZSBhcmVhIG9mIHRoZSBkaXNwbGF5IG9iamVjdCByZWxhdGl2ZVxuXHQgKiAgICAgICAgIHRvIHRoZSA8Y29kZT50YXJnZXRDb29yZGluYXRlU3BhY2U8L2NvZGU+IG9iamVjdCdzIGNvb3JkaW5hdGVcblx0ICogICAgICAgICBzeXN0ZW0uXG5cdCAqL1xuXHRwdWJsaWMgZ2V0UmVjdCh0YXJnZXRDb29yZGluYXRlU3BhY2U6RGlzcGxheU9iamVjdCA9IG51bGwpOlJlY3RhbmdsZVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2JvdW5kczsgLy9UT0RPXG5cdH1cblxuXHRwdWJsaWMgZ2V0Qm94KHRhcmdldENvb3JkaW5hdGVTcGFjZTpEaXNwbGF5T2JqZWN0ID0gbnVsbCk6Qm94XG5cdHtcblx0XHRpZiAodGhpcy5faVNvdXJjZVByZWZhYilcblx0XHRcdHRoaXMuX2lTb3VyY2VQcmVmYWIuX2lWYWxpZGF0ZSgpO1xuXG5cdFx0Ly9UT0RPIHRhcmdldENvb3JkaW5hdGVTcGFjZVxuXHRcdGlmICh0aGlzLl9ib3hCb3VuZHNJbnZhbGlkKVxuXHRcdFx0dGhpcy5fcFVwZGF0ZUJveEJvdW5kcygpO1xuXG5cdFx0cmV0dXJuIHRoaXMuX3BCb3hCb3VuZHM7XG5cdH1cblxuXHRwdWJsaWMgZ2V0U3BoZXJlKHRhcmdldENvb3JkaW5hdGVTcGFjZTpEaXNwbGF5T2JqZWN0ID0gbnVsbCk6U3BoZXJlXG5cdHtcblx0XHRpZiAodGhpcy5faVNvdXJjZVByZWZhYilcblx0XHRcdHRoaXMuX2lTb3VyY2VQcmVmYWIuX2lWYWxpZGF0ZSgpO1xuXG5cdFx0aWYgKHRoaXMuX3NwaGVyZUJvdW5kc0ludmFsaWQpXG5cdFx0XHR0aGlzLl9wVXBkYXRlU3BoZXJlQm91bmRzKCk7XG5cblx0XHRyZXR1cm4gdGhpcy5fcFNwaGVyZUJvdW5kcztcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyB0aGUgPGNvZGU+cG9pbnQ8L2NvZGU+IG9iamVjdCBmcm9tIHRoZSBTY2VuZShnbG9iYWwpIGNvb3JkaW5hdGVzXG5cdCAqIHRvIHRoZSBkaXNwbGF5IG9iamVjdCdzKGxvY2FsKSBjb29yZGluYXRlcy5cblx0ICpcblx0ICogPHA+VG8gdXNlIHRoaXMgbWV0aG9kLCBmaXJzdCBjcmVhdGUgYW4gaW5zdGFuY2Ugb2YgdGhlIFBvaW50IGNsYXNzLiBUaGVcblx0ICogPGk+eDwvaT4gYW5kIDxpPnk8L2k+IHZhbHVlcyB0aGF0IHlvdSBhc3NpZ24gcmVwcmVzZW50IGdsb2JhbCBjb29yZGluYXRlc1xuXHQgKiBiZWNhdXNlIHRoZXkgcmVsYXRlIHRvIHRoZSBvcmlnaW4oMCwwKSBvZiB0aGUgbWFpbiBkaXNwbGF5IGFyZWEuIFRoZW5cblx0ICogcGFzcyB0aGUgUG9pbnQgaW5zdGFuY2UgYXMgdGhlIHBhcmFtZXRlciB0byB0aGVcblx0ICogPGNvZGU+Z2xvYmFsVG9Mb2NhbCgpPC9jb2RlPiBtZXRob2QuIFRoZSBtZXRob2QgcmV0dXJucyBhIG5ldyBQb2ludCBvYmplY3Rcblx0ICogd2l0aCA8aT54PC9pPiBhbmQgPGk+eTwvaT4gdmFsdWVzIHRoYXQgcmVsYXRlIHRvIHRoZSBvcmlnaW4gb2YgdGhlIGRpc3BsYXlcblx0ICogb2JqZWN0IGluc3RlYWQgb2YgdGhlIG9yaWdpbiBvZiB0aGUgU2NlbmUuPC9wPlxuXHQgKlxuXHQgKiBAcGFyYW0gcG9pbnQgQW4gb2JqZWN0IGNyZWF0ZWQgd2l0aCB0aGUgUG9pbnQgY2xhc3MuIFRoZSBQb2ludCBvYmplY3Rcblx0ICogICAgICAgICAgICAgIHNwZWNpZmllcyB0aGUgPGk+eDwvaT4gYW5kIDxpPnk8L2k+IGNvb3JkaW5hdGVzIGFzXG5cdCAqICAgICAgICAgICAgICBwcm9wZXJ0aWVzLlxuXHQgKiBAcmV0dXJuIEEgUG9pbnQgb2JqZWN0IHdpdGggY29vcmRpbmF0ZXMgcmVsYXRpdmUgdG8gdGhlIGRpc3BsYXkgb2JqZWN0LlxuXHQgKi9cblx0cHVibGljIGdsb2JhbFRvTG9jYWwocG9pbnQ6UG9pbnQpOlBvaW50XG5cdHtcblx0XHRyZXR1cm4gcG9pbnQ7IC8vVE9ET1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIGEgdHdvLWRpbWVuc2lvbmFsIHBvaW50IGZyb20gdGhlIFNjZW5lKGdsb2JhbCkgY29vcmRpbmF0ZXMgdG8gYVxuXHQgKiB0aHJlZS1kaW1lbnNpb25hbCBkaXNwbGF5IG9iamVjdCdzKGxvY2FsKSBjb29yZGluYXRlcy5cblx0ICpcblx0ICogPHA+VG8gdXNlIHRoaXMgbWV0aG9kLCBmaXJzdCBjcmVhdGUgYW4gaW5zdGFuY2Ugb2YgdGhlIFZlY3RvcjNEIGNsYXNzLiBUaGUgeCxcblx0ICogeSBhbmQgeiB2YWx1ZXMgdGhhdCB5b3UgYXNzaWduIHRvIHRoZSBWZWN0b3IzRCBvYmplY3QgcmVwcmVzZW50IGdsb2JhbFxuXHQgKiBjb29yZGluYXRlcyBiZWNhdXNlIHRoZXkgYXJlIHJlbGF0aXZlIHRvIHRoZSBvcmlnaW4oMCwwLDApIG9mIHRoZSBzY2VuZS4gVGhlblxuXHQgKiBwYXNzIHRoZSBWZWN0b3IzRCBvYmplY3QgdG8gdGhlIDxjb2RlPmdsb2JhbFRvTG9jYWwzRCgpPC9jb2RlPiBtZXRob2QgYXMgdGhlXG5cdCAqIDxjb2RlPnBvc2l0aW9uPC9jb2RlPiBwYXJhbWV0ZXIuXG5cdCAqIFRoZSBtZXRob2QgcmV0dXJucyB0aHJlZS1kaW1lbnNpb25hbCBjb29yZGluYXRlcyBhcyBhIFZlY3RvcjNEIG9iamVjdFxuXHQgKiBjb250YWluaW5nIDxjb2RlPng8L2NvZGU+LCA8Y29kZT55PC9jb2RlPiwgYW5kIDxjb2RlPno8L2NvZGU+IHZhbHVlcyB0aGF0XG5cdCAqIGFyZSByZWxhdGl2ZSB0byB0aGUgb3JpZ2luIG9mIHRoZSB0aHJlZS1kaW1lbnNpb25hbCBkaXNwbGF5IG9iamVjdC48L3A+XG5cdCAqXG5cdCAqIEBwYXJhbSBwb2ludCBBIFZlY3RvcjNEIG9iamVjdCByZXByZXNlbnRpbmcgZ2xvYmFsIHgsIHkgYW5kIHogY29vcmRpbmF0ZXMgaW5cblx0ICogICAgICAgICAgICAgIHRoZSBzY2VuZS5cblx0ICogQHJldHVybiBBIFZlY3RvcjNEIG9iamVjdCB3aXRoIGNvb3JkaW5hdGVzIHJlbGF0aXZlIHRvIHRoZSB0aHJlZS1kaW1lbnNpb25hbFxuXHQgKiAgICAgICAgIGRpc3BsYXkgb2JqZWN0LlxuXHQgKi9cblx0cHVibGljIGdsb2JhbFRvTG9jYWwzRChwb3NpdGlvbjpWZWN0b3IzRCk6VmVjdG9yM0Rcblx0e1xuXHRcdHJldHVybiB0aGlzLmludmVyc2VTY2VuZVRyYW5zZm9ybS50cmFuc2Zvcm1WZWN0b3IocG9zaXRpb24pO1xuXHR9XG5cblx0LyoqXG5cdCAqIEV2YWx1YXRlcyB0aGUgYm91bmRpbmcgYm94IG9mIHRoZSBkaXNwbGF5IG9iamVjdCB0byBzZWUgaWYgaXQgb3ZlcmxhcHMgb3Jcblx0ICogaW50ZXJzZWN0cyB3aXRoIHRoZSBib3VuZGluZyBib3ggb2YgdGhlIDxjb2RlPm9iajwvY29kZT4gZGlzcGxheSBvYmplY3QuXG5cdCAqXG5cdCAqIEBwYXJhbSBvYmogVGhlIGRpc3BsYXkgb2JqZWN0IHRvIHRlc3QgYWdhaW5zdC5cblx0ICogQHJldHVybiA8Y29kZT50cnVlPC9jb2RlPiBpZiB0aGUgYm91bmRpbmcgYm94ZXMgb2YgdGhlIGRpc3BsYXkgb2JqZWN0c1xuXHQgKiAgICAgICAgIGludGVyc2VjdDsgPGNvZGU+ZmFsc2U8L2NvZGU+IGlmIG5vdC5cblx0ICovXG5cdHB1YmxpYyBoaXRUZXN0T2JqZWN0KG9iajpEaXNwbGF5T2JqZWN0KTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gZmFsc2U7IC8vVE9ET1xuXHR9XG5cblx0LyoqXG5cdCAqIEV2YWx1YXRlcyB0aGUgZGlzcGxheSBvYmplY3QgdG8gc2VlIGlmIGl0IG92ZXJsYXBzIG9yIGludGVyc2VjdHMgd2l0aCB0aGVcblx0ICogcG9pbnQgc3BlY2lmaWVkIGJ5IHRoZSA8Y29kZT54PC9jb2RlPiBhbmQgPGNvZGU+eTwvY29kZT4gcGFyYW1ldGVycy4gVGhlXG5cdCAqIDxjb2RlPng8L2NvZGU+IGFuZCA8Y29kZT55PC9jb2RlPiBwYXJhbWV0ZXJzIHNwZWNpZnkgYSBwb2ludCBpbiB0aGVcblx0ICogY29vcmRpbmF0ZSBzcGFjZSBvZiB0aGUgU2NlbmUsIG5vdCB0aGUgZGlzcGxheSBvYmplY3QgY29udGFpbmVyIHRoYXRcblx0ICogY29udGFpbnMgdGhlIGRpc3BsYXkgb2JqZWN0KHVubGVzcyB0aGF0IGRpc3BsYXkgb2JqZWN0IGNvbnRhaW5lciBpcyB0aGVcblx0ICogU2NlbmUpLlxuXHQgKlxuXHQgKiBAcGFyYW0geCAgICAgICAgIFRoZSA8aT54PC9pPiBjb29yZGluYXRlIHRvIHRlc3QgYWdhaW5zdCB0aGlzIG9iamVjdC5cblx0ICogQHBhcmFtIHkgICAgICAgICBUaGUgPGk+eTwvaT4gY29vcmRpbmF0ZSB0byB0ZXN0IGFnYWluc3QgdGhpcyBvYmplY3QuXG5cdCAqIEBwYXJhbSBzaGFwZUZsYWcgV2hldGhlciB0byBjaGVjayBhZ2FpbnN0IHRoZSBhY3R1YWwgcGl4ZWxzIG9mIHRoZSBvYmplY3Rcblx0ICogICAgICAgICAgICAgICAgICg8Y29kZT50cnVlPC9jb2RlPikgb3IgdGhlIGJvdW5kaW5nIGJveFxuXHQgKiAgICAgICAgICAgICAgICAgKDxjb2RlPmZhbHNlPC9jb2RlPikuXG5cdCAqIEByZXR1cm4gPGNvZGU+dHJ1ZTwvY29kZT4gaWYgdGhlIGRpc3BsYXkgb2JqZWN0IG92ZXJsYXBzIG9yIGludGVyc2VjdHNcblx0ICogICAgICAgICB3aXRoIHRoZSBzcGVjaWZpZWQgcG9pbnQ7IDxjb2RlPmZhbHNlPC9jb2RlPiBvdGhlcndpc2UuXG5cdCAqL1xuXHRwdWJsaWMgaGl0VGVzdFBvaW50KHg6bnVtYmVyLCB5Om51bWJlciwgc2hhcGVGbGFnOmJvb2xlYW4gPSBmYWxzZSk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIGZhbHNlOyAvL1RPRE9cblx0fVxuXG5cdC8qKlxuXHQgKiBSb3RhdGVzIHRoZSAzZCBvYmplY3QgYXJvdW5kIHRvIGZhY2UgYSBwb2ludCBkZWZpbmVkIHJlbGF0aXZlIHRvIHRoZSBsb2NhbCBjb29yZGluYXRlcyBvZiB0aGUgcGFyZW50IDxjb2RlPk9iamVjdENvbnRhaW5lcjNEPC9jb2RlPi5cblx0ICpcblx0ICogQHBhcmFtICAgIHRhcmdldCAgICAgICAgVGhlIHZlY3RvciBkZWZpbmluZyB0aGUgcG9pbnQgdG8gYmUgbG9va2VkIGF0XG5cdCAqIEBwYXJhbSAgICB1cEF4aXMgICAgICAgIEFuIG9wdGlvbmFsIHZlY3RvciB1c2VkIHRvIGRlZmluZSB0aGUgZGVzaXJlZCB1cCBvcmllbnRhdGlvbiBvZiB0aGUgM2Qgb2JqZWN0IGFmdGVyIHJvdGF0aW9uIGhhcyBvY2N1cnJlZFxuXHQgKi9cblx0cHVibGljIGxvb2tBdCh0YXJnZXQ6VmVjdG9yM0QsIHVwQXhpczpWZWN0b3IzRCA9IG51bGwpXG5cdHtcblxuXHRcdHZhciB5QXhpczpWZWN0b3IzRDtcblx0XHR2YXIgekF4aXM6VmVjdG9yM0Q7XG5cdFx0dmFyIHhBeGlzOlZlY3RvcjNEO1xuXHRcdHZhciByYXc6QXJyYXk8bnVtYmVyPjtcblxuXHRcdGlmICh1cEF4aXMgPT0gbnVsbClcblx0XHRcdHVwQXhpcyA9IFZlY3RvcjNELllfQVhJUztcblx0XHRlbHNlXG5cdFx0XHR1cEF4aXMubm9ybWFsaXplKCk7XG5cblx0XHR6QXhpcyA9IHRhcmdldC5zdWJ0cmFjdCh0aGlzLl9pTWF0cml4M0QucG9zaXRpb24pO1xuXHRcdHpBeGlzLm5vcm1hbGl6ZSgpO1xuXG5cdFx0eEF4aXMgPSB1cEF4aXMuY3Jvc3NQcm9kdWN0KHpBeGlzKTtcblx0XHR4QXhpcy5ub3JtYWxpemUoKTtcblxuXHRcdGlmICh4QXhpcy5sZW5ndGggPCAwLjA1KSB7XG5cdFx0XHR4QXhpcy54ID0gdXBBeGlzLnk7XG5cdFx0XHR4QXhpcy55ID0gdXBBeGlzLng7XG5cdFx0XHR4QXhpcy56ID0gMDtcblx0XHRcdHhBeGlzLm5vcm1hbGl6ZSgpO1xuXHRcdH1cblxuXHRcdHlBeGlzID0gekF4aXMuY3Jvc3NQcm9kdWN0KHhBeGlzKTtcblxuXHRcdHJhdyA9IE1hdHJpeDNEVXRpbHMuUkFXX0RBVEFfQ09OVEFJTkVSO1xuXG5cdFx0cmF3WzBdID0geEF4aXMueDtcblx0XHRyYXdbMV0gPSB4QXhpcy55O1xuXHRcdHJhd1syXSA9IHhBeGlzLno7XG5cdFx0cmF3WzNdID0gMDtcblxuXHRcdHJhd1s0XSA9IHlBeGlzLng7XG5cdFx0cmF3WzVdID0geUF4aXMueTtcblx0XHRyYXdbNl0gPSB5QXhpcy56O1xuXHRcdHJhd1s3XSA9IDA7XG5cblx0XHRyYXdbOF0gPSB6QXhpcy54O1xuXHRcdHJhd1s5XSA9IHpBeGlzLnk7XG5cdFx0cmF3WzEwXSA9IHpBeGlzLno7XG5cdFx0cmF3WzExXSA9IDA7XG5cblx0XHR2YXIgbTpNYXRyaXgzRCA9IG5ldyBNYXRyaXgzRCgpO1xuXHRcdG0uY29weVJhd0RhdGFGcm9tKHJhdyk7XG5cblx0XHR2YXIgdmVjOlZlY3RvcjNEID0gbS5kZWNvbXBvc2UoKVsxXTtcblxuXHRcdHRoaXMuX3JvdGF0aW9uWCA9IHZlYy54O1xuXHRcdHRoaXMuX3JvdGF0aW9uWSA9IHZlYy55O1xuXHRcdHRoaXMuX3JvdGF0aW9uWiA9IHZlYy56O1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlUm90YXRpb24oKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyB0aGUgPGNvZGU+cG9pbnQ8L2NvZGU+IG9iamVjdCBmcm9tIHRoZSBkaXNwbGF5IG9iamVjdCdzKGxvY2FsKVxuXHQgKiBjb29yZGluYXRlcyB0byB0aGUgU2NlbmUoZ2xvYmFsKSBjb29yZGluYXRlcy5cblx0ICpcblx0ICogPHA+VGhpcyBtZXRob2QgYWxsb3dzIHlvdSB0byBjb252ZXJ0IGFueSBnaXZlbiA8aT54PC9pPiBhbmQgPGk+eTwvaT5cblx0ICogY29vcmRpbmF0ZXMgZnJvbSB2YWx1ZXMgdGhhdCBhcmUgcmVsYXRpdmUgdG8gdGhlIG9yaWdpbigwLDApIG9mIGFcblx0ICogc3BlY2lmaWMgZGlzcGxheSBvYmplY3QobG9jYWwgY29vcmRpbmF0ZXMpIHRvIHZhbHVlcyB0aGF0IGFyZSByZWxhdGl2ZSB0b1xuXHQgKiB0aGUgb3JpZ2luIG9mIHRoZSBTY2VuZShnbG9iYWwgY29vcmRpbmF0ZXMpLjwvcD5cblx0ICpcblx0ICogPHA+VG8gdXNlIHRoaXMgbWV0aG9kLCBmaXJzdCBjcmVhdGUgYW4gaW5zdGFuY2Ugb2YgdGhlIFBvaW50IGNsYXNzLiBUaGVcblx0ICogPGk+eDwvaT4gYW5kIDxpPnk8L2k+IHZhbHVlcyB0aGF0IHlvdSBhc3NpZ24gcmVwcmVzZW50IGxvY2FsIGNvb3JkaW5hdGVzXG5cdCAqIGJlY2F1c2UgdGhleSByZWxhdGUgdG8gdGhlIG9yaWdpbiBvZiB0aGUgZGlzcGxheSBvYmplY3QuPC9wPlxuXHQgKlxuXHQgKiA8cD5Zb3UgdGhlbiBwYXNzIHRoZSBQb2ludCBpbnN0YW5jZSB0aGF0IHlvdSBjcmVhdGVkIGFzIHRoZSBwYXJhbWV0ZXIgdG9cblx0ICogdGhlIDxjb2RlPmxvY2FsVG9HbG9iYWwoKTwvY29kZT4gbWV0aG9kLiBUaGUgbWV0aG9kIHJldHVybnMgYSBuZXcgUG9pbnRcblx0ICogb2JqZWN0IHdpdGggPGk+eDwvaT4gYW5kIDxpPnk8L2k+IHZhbHVlcyB0aGF0IHJlbGF0ZSB0byB0aGUgb3JpZ2luIG9mIHRoZVxuXHQgKiBTY2VuZSBpbnN0ZWFkIG9mIHRoZSBvcmlnaW4gb2YgdGhlIGRpc3BsYXkgb2JqZWN0LjwvcD5cblx0ICpcblx0ICogQHBhcmFtIHBvaW50IFRoZSBuYW1lIG9yIGlkZW50aWZpZXIgb2YgYSBwb2ludCBjcmVhdGVkIHdpdGggdGhlIFBvaW50XG5cdCAqICAgICAgICAgICAgICBjbGFzcywgc3BlY2lmeWluZyB0aGUgPGk+eDwvaT4gYW5kIDxpPnk8L2k+IGNvb3JkaW5hdGVzIGFzXG5cdCAqICAgICAgICAgICAgICBwcm9wZXJ0aWVzLlxuXHQgKiBAcmV0dXJuIEEgUG9pbnQgb2JqZWN0IHdpdGggY29vcmRpbmF0ZXMgcmVsYXRpdmUgdG8gdGhlIFNjZW5lLlxuXHQgKi9cblx0cHVibGljIGxvY2FsVG9HbG9iYWwocG9pbnQ6UG9pbnQpOlBvaW50XG5cdHtcblx0XHRyZXR1cm4gbmV3IFBvaW50KCk7IC8vVE9ET1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIGEgdGhyZWUtZGltZW5zaW9uYWwgcG9pbnQgb2YgdGhlIHRocmVlLWRpbWVuc2lvbmFsIGRpc3BsYXlcblx0ICogb2JqZWN0J3MobG9jYWwpIGNvb3JkaW5hdGVzIHRvIGEgdGhyZWUtZGltZW5zaW9uYWwgcG9pbnQgaW4gdGhlIFNjZW5lXG5cdCAqIChnbG9iYWwpIGNvb3JkaW5hdGVzLlxuXHQgKlxuXHQgKiA8cD5UaGlzIG1ldGhvZCBhbGxvd3MgeW91IHRvIGNvbnZlcnQgYW55IGdpdmVuIDxpPng8L2k+LCA8aT55PC9pPiBhbmRcblx0ICogPGk+ejwvaT4gY29vcmRpbmF0ZXMgZnJvbSB2YWx1ZXMgdGhhdCBhcmUgcmVsYXRpdmUgdG8gdGhlIG9yaWdpbigwLDAsMCkgb2Zcblx0ICogYSBzcGVjaWZpYyBkaXNwbGF5IG9iamVjdChsb2NhbCBjb29yZGluYXRlcykgdG8gdmFsdWVzIHRoYXQgYXJlIHJlbGF0aXZlIHRvXG5cdCAqIHRoZSBvcmlnaW4gb2YgdGhlIFNjZW5lKGdsb2JhbCBjb29yZGluYXRlcykuPC9wPlxuXHQgKlxuXHQgKiA8cD5UbyB1c2UgdGhpcyBtZXRob2QsIGZpcnN0IGNyZWF0ZSBhbiBpbnN0YW5jZSBvZiB0aGUgUG9pbnQgY2xhc3MuIFRoZVxuXHQgKiA8aT54PC9pPiBhbmQgPGk+eTwvaT4gdmFsdWVzIHRoYXQgeW91IGFzc2lnbiByZXByZXNlbnQgbG9jYWwgY29vcmRpbmF0ZXNcblx0ICogYmVjYXVzZSB0aGV5IHJlbGF0ZSB0byB0aGUgb3JpZ2luIG9mIHRoZSBkaXNwbGF5IG9iamVjdC48L3A+XG5cdCAqXG5cdCAqIDxwPllvdSB0aGVuIHBhc3MgdGhlIFZlY3RvcjNEIGluc3RhbmNlIHRoYXQgeW91IGNyZWF0ZWQgYXMgdGhlIHBhcmFtZXRlciB0b1xuXHQgKiB0aGUgPGNvZGU+bG9jYWxUb0dsb2JhbDNEKCk8L2NvZGU+IG1ldGhvZC4gVGhlIG1ldGhvZCByZXR1cm5zIGEgbmV3XG5cdCAqIFZlY3RvcjNEIG9iamVjdCB3aXRoIDxpPng8L2k+LCA8aT55PC9pPiBhbmQgPGk+ejwvaT4gdmFsdWVzIHRoYXQgcmVsYXRlIHRvXG5cdCAqIHRoZSBvcmlnaW4gb2YgdGhlIFNjZW5lIGluc3RlYWQgb2YgdGhlIG9yaWdpbiBvZiB0aGUgZGlzcGxheSBvYmplY3QuPC9wPlxuXHQgKlxuXHQgKiBAcGFyYW0gcG9zaXRpb24gQSBWZWN0b3IzRCBvYmplY3QgY29udGFpbmluZyBlaXRoZXIgYSB0aHJlZS1kaW1lbnNpb25hbFxuXHQgKiAgICAgICAgICAgICAgICBwb3NpdGlvbiBvciB0aGUgY29vcmRpbmF0ZXMgb2YgdGhlIHRocmVlLWRpbWVuc2lvbmFsXG5cdCAqICAgICAgICAgICAgICAgIGRpc3BsYXkgb2JqZWN0LlxuXHQgKiBAcmV0dXJuIEEgVmVjdG9yM0Qgb2JqZWN0IHJlcHJlc2VudGluZyBhIHRocmVlLWRpbWVuc2lvbmFsIHBvc2l0aW9uIGluXG5cdCAqICAgICAgICAgdGhlIFNjZW5lLlxuXHQgKi9cblx0cHVibGljIGxvY2FsVG9HbG9iYWwzRChwb3NpdGlvbjpWZWN0b3IzRCk6VmVjdG9yM0Rcblx0e1xuXHRcdHJldHVybiB0aGlzLnNjZW5lVHJhbnNmb3JtLnRyYW5zZm9ybVZlY3Rvcihwb3NpdGlvbik7XG5cdH1cblxuXHQvKipcblx0ICogTW92ZXMgdGhlIDNkIG9iamVjdCBkaXJlY3RseSB0byBhIHBvaW50IGluIHNwYWNlXG5cdCAqXG5cdCAqIEBwYXJhbSAgICBkeCAgICAgICAgVGhlIGFtb3VudCBvZiBtb3ZlbWVudCBhbG9uZyB0aGUgbG9jYWwgeCBheGlzLlxuXHQgKiBAcGFyYW0gICAgZHkgICAgICAgIFRoZSBhbW91bnQgb2YgbW92ZW1lbnQgYWxvbmcgdGhlIGxvY2FsIHkgYXhpcy5cblx0ICogQHBhcmFtICAgIGR6ICAgICAgICBUaGUgYW1vdW50IG9mIG1vdmVtZW50IGFsb25nIHRoZSBsb2NhbCB6IGF4aXMuXG5cdCAqL1xuXG5cdHB1YmxpYyBtb3ZlVG8oZHg6bnVtYmVyLCBkeTpudW1iZXIsIGR6Om51bWJlcilcblx0e1xuXHRcdGlmICh0aGlzLl94ID09IGR4ICYmIHRoaXMuX3kgPT0gZHkgJiYgdGhpcy5feiA9PSBkeilcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3ggPSBkeDtcblx0XHR0aGlzLl95ID0gZHk7XG5cdFx0dGhpcy5feiA9IGR6O1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlUG9zaXRpb24oKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBNb3ZlcyB0aGUgbG9jYWwgcG9pbnQgYXJvdW5kIHdoaWNoIHRoZSBvYmplY3Qgcm90YXRlcy5cblx0ICpcblx0ICogQHBhcmFtICAgIGR4ICAgICAgICBUaGUgYW1vdW50IG9mIG1vdmVtZW50IGFsb25nIHRoZSBsb2NhbCB4IGF4aXMuXG5cdCAqIEBwYXJhbSAgICBkeSAgICAgICAgVGhlIGFtb3VudCBvZiBtb3ZlbWVudCBhbG9uZyB0aGUgbG9jYWwgeSBheGlzLlxuXHQgKiBAcGFyYW0gICAgZHogICAgICAgIFRoZSBhbW91bnQgb2YgbW92ZW1lbnQgYWxvbmcgdGhlIGxvY2FsIHogYXhpcy5cblx0ICovXG5cdHB1YmxpYyBtb3ZlUGl2b3QoZHg6bnVtYmVyLCBkeTpudW1iZXIsIGR6Om51bWJlcilcblx0e1xuXHRcdGlmICh0aGlzLl9waXZvdCA9PSBudWxsKVxuXHRcdFx0dGhpcy5fcGl2b3QgPSBuZXcgVmVjdG9yM0QoKTtcblxuXHRcdHRoaXMuX3Bpdm90LnggKz0gZHg7XG5cdFx0dGhpcy5fcGl2b3QueSArPSBkeTtcblx0XHR0aGlzLl9waXZvdC56ICs9IGR6O1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlUGl2b3QoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSb3RhdGVzIHRoZSAzZCBvYmplY3QgYXJvdW5kIGl0J3MgbG9jYWwgeC1heGlzXG5cdCAqXG5cdCAqIEBwYXJhbSAgICBhbmdsZSAgICAgICAgVGhlIGFtb3VudCBvZiByb3RhdGlvbiBpbiBkZWdyZWVzXG5cdCAqL1xuXHRwdWJsaWMgcGl0Y2goYW5nbGU6bnVtYmVyKVxuXHR7XG5cdFx0dGhpcy5yb3RhdGUoVmVjdG9yM0QuWF9BWElTLCBhbmdsZSk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXRSZW5kZXJTY2VuZVRyYW5zZm9ybShjYW1lcmE6Q2FtZXJhKTpNYXRyaXgzRFxuXHR7XG5cdFx0aWYgKHRoaXMub3JpZW50YXRpb25Nb2RlID09IE9yaWVudGF0aW9uTW9kZS5DQU1FUkFfUExBTkUpIHtcblx0XHRcdHZhciBjb21wczpBcnJheTxWZWN0b3IzRD4gPSBjYW1lcmEuc2NlbmVUcmFuc2Zvcm0uZGVjb21wb3NlKCk7XG5cdFx0XHR2YXIgc2NhbGU6VmVjdG9yM0QgPSBjb21wc1syXTtcblx0XHRcdGNvbXBzWzBdID0gdGhpcy5zY2VuZVBvc2l0aW9uO1xuXHRcdFx0c2NhbGUueCA9IHRoaXMuX3BTY2FsZVg7XG5cdFx0XHRzY2FsZS55ID0gdGhpcy5fcFNjYWxlWTtcblx0XHRcdHNjYWxlLnogPSB0aGlzLl9wU2NhbGVaO1xuXHRcdFx0dGhpcy5fb3JpZW50YXRpb25NYXRyaXgucmVjb21wb3NlKGNvbXBzKTtcblxuXHRcdFx0Ly9hZGQgaW4gY2FzZSBvZiBwaXZvdFxuXHRcdFx0aWYgKCF0aGlzLl9waXZvdFplcm8gJiYgdGhpcy5hbGlnbm1lbnRNb2RlID09IEFsaWdubWVudE1vZGUuUElWT1RfUE9JTlQpXG5cdFx0XHRcdHRoaXMuX29yaWVudGF0aW9uTWF0cml4LnByZXBlbmRUcmFuc2xhdGlvbigtdGhpcy5fcGl2b3QueC90aGlzLl9wU2NhbGVYLCAtdGhpcy5fcGl2b3QueS90aGlzLl9wU2NhbGVZLCAtdGhpcy5fcGl2b3Quei90aGlzLl9wU2NhbGVaKTtcblxuXHRcdFx0cmV0dXJuIHRoaXMuX29yaWVudGF0aW9uTWF0cml4O1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLnNjZW5lVHJhbnNmb3JtO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJvdGF0ZXMgdGhlIDNkIG9iamVjdCBhcm91bmQgaXQncyBsb2NhbCB6LWF4aXNcblx0ICpcblx0ICogQHBhcmFtICAgIGFuZ2xlICAgICAgICBUaGUgYW1vdW50IG9mIHJvdGF0aW9uIGluIGRlZ3JlZXNcblx0ICovXG5cdHB1YmxpYyByb2xsKGFuZ2xlOm51bWJlcilcblx0e1xuXHRcdHRoaXMucm90YXRlKFZlY3RvcjNELlpfQVhJUywgYW5nbGUpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJvdGF0ZXMgdGhlIDNkIG9iamVjdCBhcm91bmQgYW4gYXhpcyBieSBhIGRlZmluZWQgYW5nbGVcblx0ICpcblx0ICogQHBhcmFtICAgIGF4aXMgICAgICAgIFRoZSB2ZWN0b3IgZGVmaW5pbmcgdGhlIGF4aXMgb2Ygcm90YXRpb25cblx0ICogQHBhcmFtICAgIGFuZ2xlICAgICAgICBUaGUgYW1vdW50IG9mIHJvdGF0aW9uIGluIGRlZ3JlZXNcblx0ICovXG5cdHB1YmxpYyByb3RhdGUoYXhpczpWZWN0b3IzRCwgYW5nbGU6bnVtYmVyKVxuXHR7XG5cdFx0dmFyIG06TWF0cml4M0QgPSBuZXcgTWF0cml4M0QoKTtcblx0XHRtLnByZXBlbmRSb3RhdGlvbihhbmdsZSwgYXhpcyk7XG5cblx0XHR2YXIgdmVjOlZlY3RvcjNEID0gbS5kZWNvbXBvc2UoKVsxXTtcblxuXHRcdHRoaXMuX3JvdGF0aW9uWCArPSB2ZWMueDtcblx0XHR0aGlzLl9yb3RhdGlvblkgKz0gdmVjLnk7XG5cdFx0dGhpcy5fcm90YXRpb25aICs9IHZlYy56O1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlUm90YXRpb24oKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSb3RhdGVzIHRoZSAzZCBvYmplY3QgZGlyZWN0bHkgdG8gYSBldWxlciBhbmdsZVxuXHQgKlxuXHQgKiBAcGFyYW0gICAgYXggICAgICAgIFRoZSBhbmdsZSBpbiBkZWdyZWVzIG9mIHRoZSByb3RhdGlvbiBhcm91bmQgdGhlIHggYXhpcy5cblx0ICogQHBhcmFtICAgIGF5ICAgICAgICBUaGUgYW5nbGUgaW4gZGVncmVlcyBvZiB0aGUgcm90YXRpb24gYXJvdW5kIHRoZSB5IGF4aXMuXG5cdCAqIEBwYXJhbSAgICBheiAgICAgICAgVGhlIGFuZ2xlIGluIGRlZ3JlZXMgb2YgdGhlIHJvdGF0aW9uIGFyb3VuZCB0aGUgeiBheGlzLlxuXHQgKi9cblx0cHVibGljIHJvdGF0ZVRvKGF4Om51bWJlciwgYXk6bnVtYmVyLCBhejpudW1iZXIpXG5cdHtcblx0XHR0aGlzLl9yb3RhdGlvblggPSBheCpNYXRoQ29uc3RzLkRFR1JFRVNfVE9fUkFESUFOUztcblx0XHR0aGlzLl9yb3RhdGlvblkgPSBheSpNYXRoQ29uc3RzLkRFR1JFRVNfVE9fUkFESUFOUztcblx0XHR0aGlzLl9yb3RhdGlvblogPSBheipNYXRoQ29uc3RzLkRFR1JFRVNfVE9fUkFESUFOUztcblxuXHRcdHRoaXMuaW52YWxpZGF0ZVJvdGF0aW9uKCk7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyByZW1vdmVFdmVudExpc3RlbmVyKHR5cGU6c3RyaW5nLCBsaXN0ZW5lcjpGdW5jdGlvbilcblx0e1xuXHRcdHN1cGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpO1xuXG5cdFx0aWYgKHRoaXMuaGFzRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikpXG5cdFx0XHRyZXR1cm47XG5cblx0XHRzd2l0Y2ggKHR5cGUpIHtcblx0XHRcdGNhc2UgRGlzcGxheU9iamVjdEV2ZW50LlBPU0lUSU9OX0NIQU5HRUQ6XG5cdFx0XHRcdHRoaXMuX2xpc3RlblRvUG9zaXRpb25DaGFuZ2VkID0gZmFsc2U7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIERpc3BsYXlPYmplY3RFdmVudC5ST1RBVElPTl9DSEFOR0VEOlxuXHRcdFx0XHR0aGlzLl9saXN0ZW5Ub1JvdGF0aW9uQ2hhbmdlZCA9IGZhbHNlO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSBEaXNwbGF5T2JqZWN0RXZlbnQuU0NBTEVfQ0hBTkdFRDpcblx0XHRcdFx0dGhpcy5fbGlzdGVuVG9TY2FsZUNoYW5nZWQgPSBmYWxzZTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIE1vdmVzIHRoZSAzZCBvYmplY3QgYWxvbmcgYSB2ZWN0b3IgYnkgYSBkZWZpbmVkIGxlbmd0aFxuXHQgKlxuXHQgKiBAcGFyYW0gICAgYXhpcyAgICAgICAgVGhlIHZlY3RvciBkZWZpbmluZyB0aGUgYXhpcyBvZiBtb3ZlbWVudFxuXHQgKiBAcGFyYW0gICAgZGlzdGFuY2UgICAgVGhlIGxlbmd0aCBvZiB0aGUgbW92ZW1lbnRcblx0ICovXG5cdHB1YmxpYyB0cmFuc2xhdGUoYXhpczpWZWN0b3IzRCwgZGlzdGFuY2U6bnVtYmVyKVxuXHR7XG5cdFx0dmFyIHg6bnVtYmVyID0gYXhpcy54LCB5Om51bWJlciA9IGF4aXMueSwgejpudW1iZXIgPSBheGlzLno7XG5cdFx0dmFyIGxlbjpudW1iZXIgPSBkaXN0YW5jZS9NYXRoLnNxcnQoeCp4ICsgeSp5ICsgeip6KTtcblxuXHRcdHRoaXMuX3ggKz0geCpsZW47XG5cdFx0dGhpcy5feSArPSB5Kmxlbjtcblx0XHR0aGlzLl96ICs9IHoqbGVuO1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlUG9zaXRpb24oKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBNb3ZlcyB0aGUgM2Qgb2JqZWN0IGFsb25nIGEgdmVjdG9yIGJ5IGEgZGVmaW5lZCBsZW5ndGhcblx0ICpcblx0ICogQHBhcmFtICAgIGF4aXMgICAgICAgIFRoZSB2ZWN0b3IgZGVmaW5pbmcgdGhlIGF4aXMgb2YgbW92ZW1lbnRcblx0ICogQHBhcmFtICAgIGRpc3RhbmNlICAgIFRoZSBsZW5ndGggb2YgdGhlIG1vdmVtZW50XG5cdCAqL1xuXHRwdWJsaWMgdHJhbnNsYXRlTG9jYWwoYXhpczpWZWN0b3IzRCwgZGlzdGFuY2U6bnVtYmVyKVxuXHR7XG5cdFx0dmFyIHg6bnVtYmVyID0gYXhpcy54LCB5Om51bWJlciA9IGF4aXMueSwgejpudW1iZXIgPSBheGlzLno7XG5cdFx0dmFyIGxlbjpudW1iZXIgPSBkaXN0YW5jZS9NYXRoLnNxcnQoeCp4ICsgeSp5ICsgeip6KTtcblxuXHRcdHRoaXMuX2lNYXRyaXgzRC5wcmVwZW5kVHJhbnNsYXRpb24oeCpsZW4sIHkqbGVuLCB6Kmxlbik7XG5cblx0XHR0aGlzLl9tYXRyaXgzRC5jb3B5Q29sdW1uVG8oMywgdGhpcy5fcG9zKTtcblxuXHRcdHRoaXMuX3ggPSB0aGlzLl9wb3MueDtcblx0XHR0aGlzLl95ID0gdGhpcy5fcG9zLnk7XG5cdFx0dGhpcy5feiA9IHRoaXMuX3Bvcy56O1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlUG9zaXRpb24oKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSb3RhdGVzIHRoZSAzZCBvYmplY3QgYXJvdW5kIGl0J3MgbG9jYWwgeS1heGlzXG5cdCAqXG5cdCAqIEBwYXJhbSAgICBhbmdsZSAgICAgICAgVGhlIGFtb3VudCBvZiByb3RhdGlvbiBpbiBkZWdyZWVzXG5cdCAqL1xuXHRwdWJsaWMgeWF3KGFuZ2xlOm51bWJlcilcblx0e1xuXHRcdHRoaXMucm90YXRlKFZlY3RvcjNELllfQVhJUywgYW5nbGUpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHVibGljIF9pQ29udHJvbGxlcjpDb250cm9sbGVyQmFzZTtcblxuXHQvKipcblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IF9pQXNzaWduZWRQYXJ0aXRpb24oKTpQYXJ0aXRpb25cblx0e1xuXHRcdHJldHVybiB0aGlzLl9wSW1wbGljaXRQYXJ0aXRpb247XG5cdH1cblxuXHQvKipcblx0ICogVGhlIHRyYW5zZm9ybWF0aW9uIG9mIHRoZSAzZCBvYmplY3QsIHJlbGF0aXZlIHRvIHRoZSBsb2NhbCBjb29yZGluYXRlcyBvZiB0aGUgcGFyZW50IDxjb2RlPk9iamVjdENvbnRhaW5lcjNEPC9jb2RlPi5cblx0ICpcblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IF9pTWF0cml4M0QoKTpNYXRyaXgzRFxuXHR7XG5cdFx0aWYgKHRoaXMuX21hdHJpeDNERGlydHkpXG5cdFx0XHR0aGlzLl9wVXBkYXRlTWF0cml4M0QoKTtcblxuXHRcdHJldHVybiB0aGlzLl9tYXRyaXgzRDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgX2lNYXRyaXgzRCh2YWw6TWF0cml4M0QpXG5cdHtcblxuXHRcdC8vIFRPRE86IEZyb20gQVMzIC0gRG8gd2Ugc3RpbGwgbmVlZCB0aGlzIGluIEpTID9cblx0XHQvL3JpZGljdWxvdXMgbWF0cml4IGVycm9yXG5cdFx0Lypcblx0XHRpZiAoIXZhbC5yYXdEYXRhWzBdKSB7XG5cblx0XHRcdHZhciByYXc6bnVtYmVyW10gPSBNYXRyaXgzRFV0aWxzLlJBV19EQVRBX0NPTlRBSU5FUjtcblx0XHRcdHZhbC5jb3B5UmF3RGF0YVRvKHJhdyk7XG5cdFx0XHRyYXdbMF0gPSB0aGlzLl9zbWFsbGVzdE51bWJlcjtcblx0XHRcdHZhbC5jb3B5UmF3RGF0YUZyb20ocmF3KTtcblx0XHR9XG5cdFx0Ly8qL1xuXHRcdHZhciBlbGVtZW50czpBcnJheTxWZWN0b3IzRD4gPSB2YWwuZGVjb21wb3NlKCk7XG5cdFx0dmFyIHZlYzpWZWN0b3IzRDtcblxuXHRcdHZlYyA9IGVsZW1lbnRzWzBdO1xuXG5cdFx0aWYgKHRoaXMuX3ggIT0gdmVjLnggfHwgdGhpcy5feSAhPSB2ZWMueSB8fCB0aGlzLl96ICE9IHZlYy56KSB7XG5cdFx0XHR0aGlzLl94ID0gdmVjLng7XG5cdFx0XHR0aGlzLl95ID0gdmVjLnk7XG5cdFx0XHR0aGlzLl96ID0gdmVjLno7XG5cblx0XHRcdHRoaXMuaW52YWxpZGF0ZVBvc2l0aW9uKCk7XG5cdFx0fVxuXG5cdFx0dmVjID0gZWxlbWVudHNbMV07XG5cblx0XHRpZiAodGhpcy5fcm90YXRpb25YICE9IHZlYy54IHx8IHRoaXMuX3JvdGF0aW9uWSAhPSB2ZWMueSB8fCB0aGlzLl9yb3RhdGlvblogIT0gdmVjLnopIHtcblx0XHRcdHRoaXMuX3JvdGF0aW9uWCA9IHZlYy54O1xuXHRcdFx0dGhpcy5fcm90YXRpb25ZID0gdmVjLnk7XG5cdFx0XHR0aGlzLl9yb3RhdGlvblogPSB2ZWMuejtcblxuXHRcdFx0dGhpcy5pbnZhbGlkYXRlUm90YXRpb24oKTtcblx0XHR9XG5cblx0XHR2ZWMgPSBlbGVtZW50c1syXTtcblxuXHRcdGlmICh0aGlzLl9wU2NhbGVYICE9IHZlYy54IHx8IHRoaXMuX3BTY2FsZVkgIT0gdmVjLnkgfHwgdGhpcy5fcFNjYWxlWiAhPSB2ZWMueikge1xuXHRcdFx0dGhpcy5fcFNjYWxlWCA9IHZlYy54O1xuXHRcdFx0dGhpcy5fcFNjYWxlWSA9IHZlYy55O1xuXHRcdFx0dGhpcy5fcFNjYWxlWiA9IHZlYy56O1xuXG5cdFx0XHR0aGlzLmludmFsaWRhdGVTY2FsZSgpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHB1YmxpYyBnZXQgX2lQaWNraW5nQ29sbGlzaW9uVk8oKTpQaWNraW5nQ29sbGlzaW9uVk9cblx0e1xuXHRcdGlmICghdGhpcy5fcFBpY2tpbmdDb2xsaXNpb25WTylcblx0XHRcdHRoaXMuX3BQaWNraW5nQ29sbGlzaW9uVk8gPSBuZXcgUGlja2luZ0NvbGxpc2lvblZPKHRoaXMpO1xuXG5cdFx0cmV0dXJuIHRoaXMuX3BQaWNraW5nQ29sbGlzaW9uVk87XG5cdH1cblxuXHQvKipcblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwdWJsaWMgaVNldFBhcmVudCh2YWx1ZTpEaXNwbGF5T2JqZWN0Q29udGFpbmVyKVxuXHR7XG5cdFx0dGhpcy5fcFBhcmVudCA9IHZhbHVlO1xuXG5cdFx0aWYgKHZhbHVlKSB7XG5cdFx0XHR0aGlzLl9wVXBkYXRlSW1wbGljaXRNb3VzZUVuYWJsZWQodmFsdWUubW91c2VDaGlsZHJlbik7XG5cdFx0XHR0aGlzLl9wVXBkYXRlSW1wbGljaXRWaXNpYmlsaXR5KHZhbHVlLl9pSXNWaXNpYmxlKCkpO1xuXHRcdFx0dGhpcy5fcFVwZGF0ZUltcGxpY2l0UGFydGl0aW9uKHZhbHVlLl9pQXNzaWduZWRQYXJ0aXRpb24sIHZhbHVlLl9wU2NlbmUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9wVXBkYXRlSW1wbGljaXRNb3VzZUVuYWJsZWQodHJ1ZSk7XG5cdFx0XHR0aGlzLl9wVXBkYXRlSW1wbGljaXRWaXNpYmlsaXR5KHRydWUpO1xuXHRcdFx0dGhpcy5fcFVwZGF0ZUltcGxpY2l0UGFydGl0aW9uKG51bGwsIG51bGwpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBAcHJvdGVjdGVkXG5cdCAqL1xuXHRwdWJsaWMgcEludmFsaWRhdGVTY2VuZVRyYW5zZm9ybSgpXG5cdHtcblx0XHR0aGlzLl9wU2NlbmVUcmFuc2Zvcm1EaXJ0eSA9ICF0aGlzLl9wSWdub3JlVHJhbnNmb3JtO1xuXHRcdHRoaXMuX2ludmVyc2VTY2VuZVRyYW5zZm9ybURpcnR5ID0gIXRoaXMuX3BJZ25vcmVUcmFuc2Zvcm07XG5cdFx0dGhpcy5fc2NlbmVQb3NpdGlvbkRpcnR5ID0gIXRoaXMuX3BJZ25vcmVUcmFuc2Zvcm07XG5cblx0XHRpZiAodGhpcy5pc0VudGl0eSlcblx0XHRcdHRoaXMuaW52YWxpZGF0ZVBhcnRpdGlvbigpO1xuXG5cdFx0aWYgKHRoaXMuX2xpc3RlblRvU2NlbmVUcmFuc2Zvcm1DaGFuZ2VkKVxuXHRcdFx0dGhpcy5ub3RpZnlTY2VuZVRyYW5zZm9ybUNoYW5nZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwcm90ZWN0ZWRcblx0ICovXG5cdHB1YmxpYyBfcFVwZGF0ZUltcGxpY2l0TW91c2VFbmFibGVkKHZhbHVlOmJvb2xlYW4pXG5cdHtcblx0XHR0aGlzLl9wSW1wbGljaXRNb3VzZUVuYWJsZWQgPSB0aGlzLl9leHBsaWNpdE1vdXNlRW5hYmxlZCAmJiB2YWx1ZTtcblxuXHRcdC8vIElmIHRoZXJlIGlzIGEgcGFyZW50IGFuZCB0aGlzIGNoaWxkIGRvZXMgbm90IGhhdmUgYSBwaWNraW5nIGNvbGxpZGVyLCB1c2UgaXRzIHBhcmVudCdzIHBpY2tpbmcgY29sbGlkZXIuXG5cdFx0aWYgKHRoaXMuX3BJbXBsaWNpdE1vdXNlRW5hYmxlZCAmJiB0aGlzLl9wUGFyZW50ICYmICF0aGlzLl9wUGlja2luZ0NvbGxpZGVyKVxuXHRcdFx0dGhpcy5fcFBpY2tpbmdDb2xsaWRlciA9ICB0aGlzLl9wUGFyZW50Ll9wUGlja2luZ0NvbGxpZGVyO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwcm90ZWN0ZWRcblx0ICovXG5cdHB1YmxpYyBfcFVwZGF0ZUltcGxpY2l0UGFydGl0aW9uKHBhcnRpdGlvbjpQYXJ0aXRpb24sIHNjZW5lOlNjZW5lKVxuXHR7XG5cdFx0dmFyIHNjZW5lQ2hhbmdlZDpib29sZWFuID0gdGhpcy5fcFNjZW5lICE9IHNjZW5lO1xuXG5cdFx0aWYgKHNjZW5lQ2hhbmdlZCAmJiB0aGlzLl9wU2NlbmUpXG5cdFx0XHR0aGlzLl9wU2NlbmUuZGlzcGF0Y2hFdmVudChuZXcgU2NlbmVFdmVudChTY2VuZUV2ZW50LlJFTU9WRURfRlJPTV9TQ0VORSwgdGhpcykpO1xuXG5cdFx0aWYgKHRoaXMuX3BTY2VuZSAmJiB0aGlzLl9wSW1wbGljaXRQYXJ0aXRpb24pIHtcblx0XHRcdC8vdW5yZWdpc3RlciBwYXJ0aXRpb24gZnJvbSBjdXJyZW50IHNjZW5lXG5cdFx0XHR0aGlzLl9wU2NlbmUuX2lVbnJlZ2lzdGVyUGFydGl0aW9uKHRoaXMuX3BJbXBsaWNpdFBhcnRpdGlvbik7XG5cblx0XHRcdC8vdW5yZWdpc3RlciBlbnRpdHkgZnJvbSBjdXJyZW50IHBhcnRpdGlvblxuXHRcdFx0aWYgKHRoaXMuX3BJc0VudGl0eSlcblx0XHRcdFx0dGhpcy5fcFVucmVnaXN0ZXJFbnRpdHkodGhpcy5fcEltcGxpY2l0UGFydGl0aW9uKTtcblx0XHR9XG5cblx0XHQvLyBhc3NpZ24gcGFyZW50IGltcGxpY2l0IHBhcnRpdGlvbiBpZiBubyBleHBsaWNpdCBvbmUgaXMgZ2l2ZW5cblx0XHR0aGlzLl9wSW1wbGljaXRQYXJ0aXRpb24gPSB0aGlzLl9leHBsaWNpdFBhcnRpdGlvbiB8fCBwYXJ0aXRpb247XG5cblx0XHQvL2Fzc2lnbiBzY2VuZVxuXHRcdGlmIChzY2VuZUNoYW5nZWQpXG5cdFx0XHR0aGlzLl9wU2NlbmUgPSBzY2VuZTtcblxuXHRcdGlmICh0aGlzLl9wU2NlbmUgJiYgdGhpcy5fcEltcGxpY2l0UGFydGl0aW9uKSB7XG5cdFx0XHQvL3JlZ2lzdGVyIHBhcnRpdGlvbiB3aXRoIHNjZW5lXG5cdFx0XHR0aGlzLl9wU2NlbmUuX2lSZWdpc3RlclBhcnRpdGlvbih0aGlzLl9wSW1wbGljaXRQYXJ0aXRpb24pO1xuXG5cdFx0XHQvL3JlZ2lzdGVyIGVudGl0eSB3aXRoIG5ldyBwYXJ0aXRpb25cblx0XHRcdGlmICh0aGlzLl9wSXNFbnRpdHkpXG5cdFx0XHRcdHRoaXMuX3BSZWdpc3RlckVudGl0eSh0aGlzLl9wSW1wbGljaXRQYXJ0aXRpb24pO1xuXHRcdH1cblxuXHRcdGlmIChzY2VuZUNoYW5nZWQgJiYgdGhpcy5fcFNjZW5lKVxuXHRcdFx0dGhpcy5fcFNjZW5lLmRpc3BhdGNoRXZlbnQobmV3IFNjZW5lRXZlbnQoU2NlbmVFdmVudC5BRERFRF9UT19TQ0VORSwgdGhpcykpO1xuXG5cdFx0aWYgKHNjZW5lQ2hhbmdlZCkge1xuXHRcdFx0aWYgKCF0aGlzLl9wU2NlbmVUcmFuc2Zvcm1EaXJ0eSAmJiAhdGhpcy5fcElnbm9yZVRyYW5zZm9ybSlcblx0XHRcdFx0dGhpcy5wSW52YWxpZGF0ZVNjZW5lVHJhbnNmb3JtKCk7XG5cblx0XHRcdGlmICh0aGlzLl9saXN0ZW5Ub1NjZW5lQ2hhbmdlZClcblx0XHRcdFx0dGhpcy5ub3RpZnlTY2VuZUNoYW5nZSgpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBAcHJvdGVjdGVkXG5cdCAqL1xuXHRwdWJsaWMgX3BVcGRhdGVJbXBsaWNpdFZpc2liaWxpdHkodmFsdWU6Ym9vbGVhbilcblx0e1xuXHRcdHRoaXMuX3BJbXBsaWNpdFZpc2liaWxpdHkgPSB0aGlzLl9leHBsaWNpdFZpc2liaWxpdHkgJiYgdmFsdWU7XG5cdH1cblxuXHQvKipcblx0ICogQHByb3RlY3RlZFxuXHQgKi9cblx0cHVibGljIF9wVXBkYXRlTWF0cml4M0QoKVxuXHR7XG5cblx0XHR0aGlzLl9wb3MueCA9IHRoaXMuX3g7XG5cdFx0dGhpcy5fcG9zLnkgPSB0aGlzLl95O1xuXHRcdHRoaXMuX3Bvcy56ID0gdGhpcy5fejtcblxuXHRcdHRoaXMuX3JvdC54ID0gdGhpcy5fcm90YXRpb25YO1xuXHRcdHRoaXMuX3JvdC55ID0gdGhpcy5fcm90YXRpb25ZO1xuXHRcdHRoaXMuX3JvdC56ID0gdGhpcy5fcm90YXRpb25aO1xuXG5cdFx0dGhpcy5fc2NhLnggPSB0aGlzLl9wU2NhbGVYO1xuXHRcdHRoaXMuX3NjYS55ID0gdGhpcy5fcFNjYWxlWTtcblx0XHR0aGlzLl9zY2EueiA9IHRoaXMuX3BTY2FsZVo7XG5cblx0XHR0aGlzLl9tYXRyaXgzRC5yZWNvbXBvc2UodGhpcy5fdHJhbnNmb3JtQ29tcG9uZW50cyk7XG5cblx0XHRpZiAoIXRoaXMuX3Bpdm90WmVybykge1xuXHRcdFx0dGhpcy5fbWF0cml4M0QucHJlcGVuZFRyYW5zbGF0aW9uKC10aGlzLl9waXZvdC54L3RoaXMuX3BTY2FsZVgsIC10aGlzLl9waXZvdC55L3RoaXMuX3BTY2FsZVksIC10aGlzLl9waXZvdC56L3RoaXMuX3BTY2FsZVopO1xuXHRcdFx0aWYgKHRoaXMuYWxpZ25tZW50TW9kZSAhPSBBbGlnbm1lbnRNb2RlLlBJVk9UX1BPSU5UKVxuXHRcdFx0XHR0aGlzLl9tYXRyaXgzRC5hcHBlbmRUcmFuc2xhdGlvbih0aGlzLl9waXZvdC54LCB0aGlzLl9waXZvdC55LCB0aGlzLl9waXZvdC56KTtcblx0XHR9XG5cblx0XHR0aGlzLl9tYXRyaXgzRERpcnR5ID0gZmFsc2U7XG5cdFx0dGhpcy5fcG9zaXRpb25EaXJ0eSA9IGZhbHNlO1xuXHRcdHRoaXMuX3JvdGF0aW9uRGlydHkgPSBmYWxzZTtcblx0XHR0aGlzLl9zY2FsZURpcnR5ID0gZmFsc2U7XG5cdFx0dGhpcy5fcGl2b3REaXJ0eSA9IGZhbHNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwcm90ZWN0ZWRcblx0ICovXG5cdHB1YmxpYyBwVXBkYXRlU2NlbmVUcmFuc2Zvcm0oKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3BQYXJlbnQgJiYgIXRoaXMuX3BQYXJlbnQuX2lJc1Jvb3QpIHtcblx0XHRcdHRoaXMuX3BTY2VuZVRyYW5zZm9ybS5jb3B5RnJvbSh0aGlzLl9wUGFyZW50LnNjZW5lVHJhbnNmb3JtKTtcblx0XHRcdHRoaXMuX3BTY2VuZVRyYW5zZm9ybS5wcmVwZW5kKHRoaXMuX2lNYXRyaXgzRCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX3BTY2VuZVRyYW5zZm9ybS5jb3B5RnJvbSh0aGlzLl9pTWF0cml4M0QpO1xuXHRcdH1cblxuXHRcdHRoaXMuX3BTY2VuZVRyYW5zZm9ybURpcnR5ID0gZmFsc2U7XG5cdH1cblxuXHRwdWJsaWMgX2lBZGRSZW5kZXJhYmxlKHJlbmRlcmFibGU6SVJlbmRlcmFibGUpOklSZW5kZXJhYmxlXG5cdHtcblx0XHR0aGlzLl9wUmVuZGVyYWJsZXMucHVzaChyZW5kZXJhYmxlKTtcblxuXHRcdHJldHVybiByZW5kZXJhYmxlO1xuXHR9XG5cblxuXHRwdWJsaWMgX2lSZW1vdmVSZW5kZXJhYmxlKHJlbmRlcmFibGU6SVJlbmRlcmFibGUpOklSZW5kZXJhYmxlXG5cdHtcblx0XHR2YXIgaW5kZXg6bnVtYmVyID0gdGhpcy5fcFJlbmRlcmFibGVzLmluZGV4T2YocmVuZGVyYWJsZSk7XG5cblx0XHR0aGlzLl9wUmVuZGVyYWJsZXMuc3BsaWNlKGluZGV4LCAxKTtcblxuXHRcdHJldHVybiByZW5kZXJhYmxlO1xuXHR9XG5cblx0LyoqXG5cdCAqIC8vVE9ET1xuXHQgKlxuXHQgKiBAcGFyYW0gc2hvcnRlc3RDb2xsaXNpb25EaXN0YW5jZVxuXHQgKiBAcGFyYW0gZmluZENsb3Nlc3Rcblx0ICogQHJldHVybnMge2Jvb2xlYW59XG5cdCAqXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHVibGljIF9pVGVzdENvbGxpc2lvbihzaG9ydGVzdENvbGxpc2lvbkRpc3RhbmNlOm51bWJlciwgZmluZENsb3Nlc3Q6Ym9vbGVhbik6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgX2lJbnRlcm5hbFVwZGF0ZSgpXG5cdHtcblx0XHRpZiAodGhpcy5faUNvbnRyb2xsZXIpXG5cdFx0XHR0aGlzLl9pQ29udHJvbGxlci51cGRhdGUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHB1YmxpYyBfaUlzVmlzaWJsZSgpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9wSW1wbGljaXRWaXNpYmlsaXR5O1xuXHR9XG5cblx0LyoqXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHVibGljIF9pSXNNb3VzZUVuYWJsZWQoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcEltcGxpY2l0TW91c2VFbmFibGVkO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHVibGljIF9pU2V0U2NlbmUodmFsdWU6U2NlbmUpXG5cdHtcblx0XHRpZiAodGhpcy5fcFNjZW5lID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fcFVwZGF0ZUltcGxpY2l0UGFydGl0aW9uKHRoaXMuX3BQYXJlbnQ/IHRoaXMuX3BQYXJlbnQuX2lBc3NpZ25lZFBhcnRpdGlvbiA6IG51bGwsIHZhbHVlKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0cHJpdmF0ZSBub3RpZnlQb3NpdGlvbkNoYW5nZWQoKVxuXHR7XG5cdFx0aWYgKCF0aGlzLl9wb3NpdGlvbkNoYW5nZWQpXG5cdFx0XHR0aGlzLl9wb3NpdGlvbkNoYW5nZWQgPSBuZXcgRGlzcGxheU9iamVjdEV2ZW50KERpc3BsYXlPYmplY3RFdmVudC5QT1NJVElPTl9DSEFOR0VELCB0aGlzKTtcblxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCh0aGlzLl9wb3NpdGlvbkNoYW5nZWQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRwcml2YXRlIG5vdGlmeVJvdGF0aW9uQ2hhbmdlZCgpXG5cdHtcblx0XHRpZiAoIXRoaXMuX3JvdGF0aW9uQ2hhbmdlZClcblx0XHRcdHRoaXMuX3JvdGF0aW9uQ2hhbmdlZCA9IG5ldyBEaXNwbGF5T2JqZWN0RXZlbnQoRGlzcGxheU9iamVjdEV2ZW50LlJPVEFUSU9OX0NIQU5HRUQsIHRoaXMpO1xuXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KHRoaXMuX3JvdGF0aW9uQ2hhbmdlZCk7XG5cdH1cblxuXHQvKipcblx0ICogQHByaXZhdGVcblx0ICovXG5cdHByaXZhdGUgbm90aWZ5U2NhbGVDaGFuZ2VkKClcblx0e1xuXHRcdGlmICghdGhpcy5fc2NhbGVDaGFuZ2VkKVxuXHRcdFx0dGhpcy5fc2NhbGVDaGFuZ2VkID0gbmV3IERpc3BsYXlPYmplY3RFdmVudChEaXNwbGF5T2JqZWN0RXZlbnQuU0NBTEVfQ0hBTkdFRCwgdGhpcyk7XG5cblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQodGhpcy5fc2NhbGVDaGFuZ2VkKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0cHJpdmF0ZSBub3RpZnlTY2VuZUNoYW5nZSgpXG5cdHtcblx0XHRpZiAoIXRoaXMuX3NjZW5lY2hhbmdlZClcblx0XHRcdHRoaXMuX3NjZW5lY2hhbmdlZCA9IG5ldyBEaXNwbGF5T2JqZWN0RXZlbnQoRGlzcGxheU9iamVjdEV2ZW50LlNDRU5FX0NIQU5HRUQsIHRoaXMpO1xuXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KHRoaXMuX3NjZW5lY2hhbmdlZCk7XG59XG5cblx0LyoqXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRwcml2YXRlIG5vdGlmeVNjZW5lVHJhbnNmb3JtQ2hhbmdlKClcblx0e1xuXHRcdGlmICghdGhpcy5fc2NlbmVUcmFuc2Zvcm1DaGFuZ2VkKVxuXHRcdFx0dGhpcy5fc2NlbmVUcmFuc2Zvcm1DaGFuZ2VkID0gbmV3IERpc3BsYXlPYmplY3RFdmVudChEaXNwbGF5T2JqZWN0RXZlbnQuU0NFTkVUUkFOU0ZPUk1fQ0hBTkdFRCwgdGhpcyk7XG5cblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQodGhpcy5fc2NlbmVUcmFuc2Zvcm1DaGFuZ2VkKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbnZhbGlkYXRlcyB0aGUgM0QgdHJhbnNmb3JtYXRpb24gbWF0cml4LCBjYXVzaW5nIGl0IHRvIGJlIHVwZGF0ZWQgdXBvbiB0aGUgbmV4dCByZXF1ZXN0XG5cdCAqXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRwcml2YXRlIGludmFsaWRhdGVNYXRyaXgzRCgpOnZvaWRcblx0e1xuXHRcdGlmICh0aGlzLl9tYXRyaXgzRERpcnR5KVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fbWF0cml4M0REaXJ0eSA9IHRydWU7XG5cblx0XHRpZiAoIXRoaXMuX3BTY2VuZVRyYW5zZm9ybURpcnR5ICYmICF0aGlzLl9wSWdub3JlVHJhbnNmb3JtKVxuXHRcdFx0dGhpcy5wSW52YWxpZGF0ZVNjZW5lVHJhbnNmb3JtKCk7XG5cdH1cblxuXHQvKipcblx0ICogQHByaXZhdGVcblx0ICovXG5cdHB1YmxpYyBpbnZhbGlkYXRlUGFydGl0aW9uKClcblx0e1xuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fZW50aXR5Tm9kZXMubGVuZ3RoO1xuXHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IGxlbjsgaSsrKVxuXHRcdFx0dGhpcy5fZW50aXR5Tm9kZXNbaV0uaW52YWxpZGF0ZVBhcnRpdGlvbigpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRwcml2YXRlIGludmFsaWRhdGVQaXZvdCgpXG5cdHtcblx0XHR0aGlzLl9waXZvdFplcm8gPSAodGhpcy5fcGl2b3QueCA9PSAwKSAmJiAodGhpcy5fcGl2b3QueSA9PSAwKSAmJiAodGhpcy5fcGl2b3QueiA9PSAwKTtcblxuXHRcdGlmICh0aGlzLl9waXZvdERpcnR5KVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fcGl2b3REaXJ0eSA9IHRydWU7XG5cblx0XHR0aGlzLmludmFsaWRhdGVNYXRyaXgzRCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRwcml2YXRlIGludmFsaWRhdGVQb3NpdGlvbigpXG5cdHtcblx0XHRpZiAodGhpcy5fcG9zaXRpb25EaXJ0eSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3Bvc2l0aW9uRGlydHkgPSB0cnVlO1xuXG5cdFx0dGhpcy5pbnZhbGlkYXRlTWF0cml4M0QoKTtcblxuXHRcdGlmICh0aGlzLl9saXN0ZW5Ub1Bvc2l0aW9uQ2hhbmdlZClcblx0XHRcdHRoaXMubm90aWZ5UG9zaXRpb25DaGFuZ2VkKCk7XG5cdH1cblxuXHQvKipcblx0ICogQHByaXZhdGVcblx0ICovXG5cdHByaXZhdGUgaW52YWxpZGF0ZVJvdGF0aW9uKClcblx0e1xuXHRcdGlmICh0aGlzLl9yb3RhdGlvbkRpcnR5KVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fcm90YXRpb25EaXJ0eSA9IHRydWU7XG5cblx0XHR0aGlzLmludmFsaWRhdGVNYXRyaXgzRCgpO1xuXG5cdFx0aWYgKHRoaXMuX2xpc3RlblRvUm90YXRpb25DaGFuZ2VkKVxuXHRcdFx0dGhpcy5ub3RpZnlSb3RhdGlvbkNoYW5nZWQoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0cHJpdmF0ZSBpbnZhbGlkYXRlU2NhbGUoKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3NjYWxlRGlydHkpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9zY2FsZURpcnR5ID0gdHJ1ZTtcblxuXHRcdHRoaXMuaW52YWxpZGF0ZU1hdHJpeDNEKCk7XG5cblx0XHRpZiAodGhpcy5fbGlzdGVuVG9TY2FsZUNoYW5nZWQpXG5cdFx0XHR0aGlzLm5vdGlmeVNjYWxlQ2hhbmdlZCgpO1xuXHR9XG5cblxuXHRwdWJsaWMgX2lBZGRFbnRpdHlOb2RlKGVudGl0eU5vZGU6RW50aXR5Tm9kZSk6RW50aXR5Tm9kZVxuXHR7XG5cdFx0dGhpcy5fZW50aXR5Tm9kZXMucHVzaChlbnRpdHlOb2RlKTtcblxuXHRcdHJldHVybiBlbnRpdHlOb2RlO1xuXHR9XG5cblxuXHRwdWJsaWMgX2lSZW1vdmVFbnRpdHlOb2RlKGVudGl0eU5vZGU6RW50aXR5Tm9kZSk6RW50aXR5Tm9kZVxuXHR7XG5cdFx0dmFyIGluZGV4Om51bWJlciA9IHRoaXMuX2VudGl0eU5vZGVzLmluZGV4T2YoZW50aXR5Tm9kZSk7XG5cblx0XHR0aGlzLl9lbnRpdHlOb2Rlcy5zcGxpY2UoaW5kZXgsIDEpO1xuXG5cdFx0cmV0dXJuIGVudGl0eU5vZGU7XG5cdH1cblxuXHRwdWJsaWMgX3BSZWdpc3RlckVudGl0eShwYXJ0aXRpb246UGFydGl0aW9uKVxuXHR7XG5cdFx0dGhyb3cgbmV3IEFic3RyYWN0TWV0aG9kRXJyb3IoKTtcblx0fVxuXG5cdHB1YmxpYyBfcFVucmVnaXN0ZXJFbnRpdHkocGFydGl0aW9uOlBhcnRpdGlvbilcblx0e1xuXHRcdHRocm93IG5ldyBBYnN0cmFjdE1ldGhvZEVycm9yKCk7XG5cdH1cblxuXHRwdWJsaWMgX3BJbnZhbGlkYXRlQm91bmRzKClcblx0e1xuXHRcdHRoaXMuX2JveEJvdW5kc0ludmFsaWQgPSB0cnVlO1xuXHRcdHRoaXMuX3NwaGVyZUJvdW5kc0ludmFsaWQgPSB0cnVlO1xuXG5cdFx0aWYgKHRoaXMuaXNFbnRpdHkpXG5cdFx0XHR0aGlzLmludmFsaWRhdGVQYXJ0aXRpb24oKTtcblx0fVxuXHRcblx0cHVibGljIF9wVXBkYXRlQm94Qm91bmRzKClcblx0e1xuXHRcdHRoaXMuX2JveEJvdW5kc0ludmFsaWQgPSBmYWxzZTtcblx0XHRcblx0XHRpZiAodGhpcy5fcEJveEJvdW5kcyA9PSBudWxsKVxuXHRcdFx0dGhpcy5fcEJveEJvdW5kcyA9IG5ldyBCb3goKTtcblx0fVxuXG5cdHB1YmxpYyBfcFVwZGF0ZVNwaGVyZUJvdW5kcygpXG5cdHtcblx0XHR0aGlzLl9zcGhlcmVCb3VuZHNJbnZhbGlkID0gZmFsc2U7XG5cblx0XHRpZiAodGhpcy5fcFNwaGVyZUJvdW5kcyA9PSBudWxsKVxuXHRcdFx0dGhpcy5fcFNwaGVyZUJvdW5kcyA9IG5ldyBTcGhlcmUoKTtcblx0fVxufVxuXG5leHBvcnQgPSBEaXNwbGF5T2JqZWN0OyJdfQ==