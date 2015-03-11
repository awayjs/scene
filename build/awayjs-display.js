require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"awayjs-display/lib/animators/IAnimationSet":[function(require,module,exports){



},{}],"awayjs-display/lib/animators/IAnimator":[function(require,module,exports){



},{}],"awayjs-display/lib/animators/nodes/AnimationNodeBase":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AssetBase = require("awayjs-core/lib/library/AssetBase");
/**
 * Provides an abstract base class for nodes in an animation blend tree.
 */
var AnimationNodeBase = (function (_super) {
    __extends(AnimationNodeBase, _super);
    /**
     * Creates a new <code>AnimationNodeBase</code> object.
     */
    function AnimationNodeBase() {
        _super.call(this);
    }
    Object.defineProperty(AnimationNodeBase.prototype, "stateClass", {
        get: function () {
            return this._pStateClass;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @inheritDoc
     */
    AnimationNodeBase.prototype.dispose = function () {
    };
    Object.defineProperty(AnimationNodeBase.prototype, "assetType", {
        /**
         * @inheritDoc
         */
        get: function () {
            return AnimationNodeBase.assetType;
        },
        enumerable: true,
        configurable: true
    });
    AnimationNodeBase.assetType = "[asset AnimationNodeBase]";
    return AnimationNodeBase;
})(AssetBase);
module.exports = AnimationNodeBase;


},{"awayjs-core/lib/library/AssetBase":undefined}],"awayjs-display/lib/base/AlignmentMode":[function(require,module,exports){
/**
 *
 */
var AlignmentMode = (function () {
    function AlignmentMode() {
    }
    /**
     *
     */
    AlignmentMode.REGISTRATION_POINT = "registrationPoint";
    /**
     *
     */
    AlignmentMode.PIVOT_POINT = "pivot";
    return AlignmentMode;
})();
module.exports = AlignmentMode;


},{}],"awayjs-display/lib/base/CurveSubMesh":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CurveSubGeometry = require("awayjs-core/lib/data/CurveSubGeometry");
var SubMeshBase = require("awayjs-display/lib/base/SubMeshBase");
/**
 * CurveSubMesh wraps a CurveSubGeometry as a scene graph instantiation. A CurveSubMesh is owned by a Mesh object.
 *
 *
 * @see away.base.CurveSubGeometry
 * @see away.entities.Mesh
 *
 * @class away.base.CurveSubMesh
 */
var CurveSubMesh = (function (_super) {
    __extends(CurveSubMesh, _super);
    /**
     * Creates a new CurveSubMesh object
     * @param subGeometry The TriangleSubGeometry object which provides the geometry data for this CurveSubMesh.
     * @param parentMesh The Mesh object to which this CurveSubMesh belongs.
     * @param material An optional material used to render this CurveSubMesh.
     */
    function CurveSubMesh(subGeometry, parentMesh, material) {
        if (material === void 0) { material = null; }
        _super.call(this);
        this._pParentMesh = parentMesh;
        this._subGeometry = subGeometry;
        this.material = material;
    }
    Object.defineProperty(CurveSubMesh.prototype, "assetType", {
        /**
         *
         */
        get: function () {
            return CurveSubMesh.assetType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CurveSubMesh.prototype, "subGeometry", {
        /**
         * The TriangleSubGeometry object which provides the geometry data for this CurveSubMesh.
         */
        get: function () {
            return this._subGeometry;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     */
    CurveSubMesh.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    CurveSubMesh.prototype._iCollectRenderable = function (rendererPool) {
        rendererPool.applyCurveSubMesh(this);
    };
    CurveSubMesh.assetType = "[asset CurveSubMesh]";
    CurveSubMesh.geometryType = CurveSubGeometry.assetType;
    return CurveSubMesh;
})(SubMeshBase);
module.exports = CurveSubMesh;


},{"awayjs-core/lib/data/CurveSubGeometry":undefined,"awayjs-display/lib/base/SubMeshBase":"awayjs-display/lib/base/SubMeshBase"}],"awayjs-display/lib/base/DisplayObject":[function(require,module,exports){
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


},{"awayjs-core/lib/errors/AbstractMethodError":undefined,"awayjs-core/lib/geom/Box":undefined,"awayjs-core/lib/geom/MathConsts":undefined,"awayjs-core/lib/geom/Matrix3D":undefined,"awayjs-core/lib/geom/Matrix3DUtils":undefined,"awayjs-core/lib/geom/Point":undefined,"awayjs-core/lib/geom/Sphere":undefined,"awayjs-core/lib/geom/Vector3D":undefined,"awayjs-core/lib/library/AssetBase":undefined,"awayjs-display/lib/base/AlignmentMode":"awayjs-display/lib/base/AlignmentMode","awayjs-display/lib/base/OrientationMode":"awayjs-display/lib/base/OrientationMode","awayjs-display/lib/base/Transform":"awayjs-display/lib/base/Transform","awayjs-display/lib/events/DisplayObjectEvent":"awayjs-display/lib/events/DisplayObjectEvent","awayjs-display/lib/events/SceneEvent":"awayjs-display/lib/events/SceneEvent","awayjs-display/lib/pick/PickingCollisionVO":"awayjs-display/lib/pick/PickingCollisionVO"}],"awayjs-display/lib/base/IBitmapDrawable":[function(require,module,exports){



},{}],"awayjs-display/lib/base/IMaterialOwner":[function(require,module,exports){



},{}],"awayjs-display/lib/base/IRenderObjectOwner":[function(require,module,exports){



},{}],"awayjs-display/lib/base/IRenderableOwner":[function(require,module,exports){



},{}],"awayjs-display/lib/base/ISubMeshClass":[function(require,module,exports){



},{}],"awayjs-display/lib/base/ISubMesh":[function(require,module,exports){



},{}],"awayjs-display/lib/base/LightBase":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AbstractMethodError = require("awayjs-core/lib/errors/AbstractMethodError");
var DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
var LightEvent = require("awayjs-display/lib/events/LightEvent");
var LightBase = (function (_super) {
    __extends(LightBase, _super);
    function LightBase() {
        _super.call(this);
        this._color = 0xffffff;
        this._colorR = 1;
        this._colorG = 1;
        this._colorB = 1;
        this._ambientColor = 0xffffff;
        this._ambient = 0;
        this._iAmbientR = 0;
        this._iAmbientG = 0;
        this._iAmbientB = 0;
        this._specular = 1;
        this._iSpecularR = 1;
        this._iSpecularG = 1;
        this._iSpecularB = 1;
        this._diffuse = 1;
        this._iDiffuseR = 1;
        this._iDiffuseG = 1;
        this._iDiffuseB = 1;
        this._castsShadows = false;
    }
    Object.defineProperty(LightBase.prototype, "castsShadows", {
        get: function () {
            return this._castsShadows;
        },
        set: function (value) {
            if (this._castsShadows == value)
                return;
            this._castsShadows = value;
            if (value) {
                if (this._shadowMapper == null)
                    this._shadowMapper = this.pCreateShadowMapper();
                this._shadowMapper.light = this;
            }
            else {
                this._shadowMapper.dispose();
                this._shadowMapper = null;
            }
            //*/
            this.dispatchEvent(new LightEvent(LightEvent.CASTS_SHADOW_CHANGE));
        },
        enumerable: true,
        configurable: true
    });
    LightBase.prototype.pCreateShadowMapper = function () {
        throw new AbstractMethodError();
    };
    Object.defineProperty(LightBase.prototype, "specular", {
        get: function () {
            return this._specular;
        },
        set: function (value) {
            if (value < 0)
                value = 0;
            this._specular = value;
            this.updateSpecular();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LightBase.prototype, "diffuse", {
        get: function () {
            return this._diffuse;
        },
        set: function (value) {
            if (value < 0)
                value = 0;
            this._diffuse = value;
            this.updateDiffuse();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LightBase.prototype, "color", {
        get: function () {
            return this._color;
        },
        set: function (value) {
            this._color = value;
            this._colorR = ((this._color >> 16) & 0xff) / 0xff;
            this._colorG = ((this._color >> 8) & 0xff) / 0xff;
            this._colorB = (this._color & 0xff) / 0xff;
            this.updateDiffuse();
            this.updateSpecular();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LightBase.prototype, "ambient", {
        get: function () {
            return this._ambient;
        },
        set: function (value) {
            if (value < 0)
                value = 0;
            else if (value > 1)
                value = 1;
            this._ambient = value;
            this.updateAmbient();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LightBase.prototype, "ambientColor", {
        get: function () {
            return this._ambientColor;
        },
        set: function (value) {
            this._ambientColor = value;
            this.updateAmbient();
        },
        enumerable: true,
        configurable: true
    });
    LightBase.prototype.updateAmbient = function () {
        this._iAmbientR = ((this._ambientColor >> 16) & 0xff) / 0xff * this._ambient;
        this._iAmbientG = ((this._ambientColor >> 8) & 0xff) / 0xff * this._ambient;
        this._iAmbientB = (this._ambientColor & 0xff) / 0xff * this._ambient;
    };
    LightBase.prototype.iGetObjectProjectionMatrix = function (entity, camera, target) {
        if (target === void 0) { target = null; }
        throw new AbstractMethodError();
    };
    Object.defineProperty(LightBase.prototype, "assetType", {
        //@override
        get: function () {
            return LightBase.assetType;
        },
        enumerable: true,
        configurable: true
    });
    LightBase.prototype.updateSpecular = function () {
        this._iSpecularR = this._colorR * this._specular;
        this._iSpecularG = this._colorG * this._specular;
        this._iSpecularB = this._colorB * this._specular;
    };
    LightBase.prototype.updateDiffuse = function () {
        this._iDiffuseR = this._colorR * this._diffuse;
        this._iDiffuseG = this._colorG * this._diffuse;
        this._iDiffuseB = this._colorB * this._diffuse;
    };
    Object.defineProperty(LightBase.prototype, "shadowMapper", {
        get: function () {
            return this._shadowMapper;
        },
        set: function (value) {
            this._shadowMapper = value;
            this._shadowMapper.light = this;
        },
        enumerable: true,
        configurable: true
    });
    LightBase.assetType = "[asset Light]";
    return LightBase;
})(DisplayObjectContainer);
module.exports = LightBase;


},{"awayjs-core/lib/errors/AbstractMethodError":undefined,"awayjs-display/lib/containers/DisplayObjectContainer":"awayjs-display/lib/containers/DisplayObjectContainer","awayjs-display/lib/events/LightEvent":"awayjs-display/lib/events/LightEvent"}],"awayjs-display/lib/base/LineSubMesh":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var LineSubGeometry = require("awayjs-core/lib/data/LineSubGeometry");
var SubMeshBase = require("awayjs-display/lib/base/SubMeshBase");
/**
 * LineSubMesh wraps a LineSubGeometry as a scene graph instantiation. A LineSubMesh is owned by a Mesh object.
 *
 *
 * @see away.base.LineSubGeometry
 * @see away.entities.Mesh
 *
 * @class away.base.LineSubMesh
 */
var LineSubMesh = (function (_super) {
    __extends(LineSubMesh, _super);
    /**
     * Creates a new LineSubMesh object
     * @param subGeometry The LineSubGeometry object which provides the geometry data for this LineSubMesh.
     * @param parentMesh The Mesh object to which this LineSubMesh belongs.
     * @param material An optional material used to render this LineSubMesh.
     */
    function LineSubMesh(subGeometry, parentMesh, material) {
        if (material === void 0) { material = null; }
        _super.call(this);
        this._pParentMesh = parentMesh;
        this._subGeometry = subGeometry;
        this.material = material;
    }
    Object.defineProperty(LineSubMesh.prototype, "assetType", {
        /**
         *
         */
        get: function () {
            return LineSubMesh.assetType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineSubMesh.prototype, "subGeometry", {
        /**
         * The LineSubGeometry object which provides the geometry data for this LineSubMesh.
         */
        get: function () {
            return this._subGeometry;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     */
    LineSubMesh.prototype.dispose = function () {
        this.material = null;
        _super.prototype.dispose.call(this);
    };
    LineSubMesh.prototype._iCollectRenderable = function (rendererPool) {
        rendererPool.applyLineSubMesh(this);
    };
    LineSubMesh.assetType = "[asset LineSubMesh]";
    LineSubMesh.geometryType = LineSubGeometry.assetType;
    return LineSubMesh;
})(SubMeshBase);
module.exports = LineSubMesh;


},{"awayjs-core/lib/data/LineSubGeometry":undefined,"awayjs-display/lib/base/SubMeshBase":"awayjs-display/lib/base/SubMeshBase"}],"awayjs-display/lib/base/LoaderInfo":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EventDispatcher = require("awayjs-core/lib/events/EventDispatcher");
/**
 * The LoaderInfo class provides information about a loaded SWF file or a
 * loaded image file(JPEG, GIF, or PNG). LoaderInfo objects are available for
 * any display object. The information provided includes load progress, the
 * URLs of the loader and loaded content, the number of bytes total for the
 * media, and the nominal height and width of the media.
 *
 * <p>You can access LoaderInfo objects in two ways: </p>
 *
 * <ul>
 *   <li>The <code>contentLoaderInfo</code> property of a flash.display.Loader
 * object -  The <code>contentLoaderInfo</code> property is always available
 * for any Loader object. For a Loader object that has not called the
 * <code>load()</code> or <code>loadBytes()</code> method, or that has not
 * sufficiently loaded, attempting to access many of the properties of the
 * <code>contentLoaderInfo</code> property throws an error.</li>
 *   <li>The <code>loaderInfo</code> property of a display object. </li>
 * </ul>
 *
 * <p>The <code>contentLoaderInfo</code> property of a Loader object provides
 * information about the content that the Loader object is loading, whereas
 * the <code>loaderInfo</code> property of a DisplayObject provides
 * information about the root SWF file for that display object. </p>
 *
 * <p>When you use a Loader object to load a display object(such as a SWF
 * file or a bitmap), the <code>loaderInfo</code> property of the display
 * object is the same as the <code>contentLoaderInfo</code> property of the
 * Loader object(<code>DisplayObject.loaderInfo =
 * Loader.contentLoaderInfo</code>). Because the instance of the main class of
 * the SWF file has no Loader object, the <code>loaderInfo</code> property is
 * the only way to access the LoaderInfo for the instance of the main class of
 * the SWF file.</p>
 *
 * <p>The following diagram shows the different uses of the LoaderInfo
 * object - for the instance of the main class of the SWF file, for the
 * <code>contentLoaderInfo</code> property of a Loader object, and for the
 * <code>loaderInfo</code> property of a loaded object:</p>
 *
 * <p>When a loading operation is not complete, some properties of the
 * <code>contentLoaderInfo</code> property of a Loader object are not
 * available. You can obtain some properties, such as
 * <code>bytesLoaded</code>, <code>bytesTotal</code>, <code>url</code>,
 * <code>loaderURL</code>, and <code>applicationDomain</code>. When the
 * <code>loaderInfo</code> object dispatches the <code>init</code> event, you
 * can access all properties of the <code>loaderInfo</code> object and the
 * loaded image or SWF file.</p>
 *
 * <p><b>Note:</b> All properties of LoaderInfo objects are read-only.</p>
 *
 * <p>The <code>EventDispatcher.dispatchEvent()</code> method is not
 * applicable to LoaderInfo objects. If you call <code>dispatchEvent()</code>
 * on a LoaderInfo object, an IllegalOperationError exception is thrown.</p>
 *
 * @event complete   Dispatched when data has loaded successfully. In other
 *                   words, it is dispatched when all the content has been
 *                   downloaded and the loading has finished. The
 *                   <code>complete</code> event is always dispatched after
 *                   the <code>init</code> event. The <code>init</code> event
 *                   is dispatched when the object is ready to access, though
 *                   the content may still be downloading.
 * @event httpStatus Dispatched when a network request is made over HTTP and
 *                   an HTTP status code can be detected.
 * @event init       Dispatched when the properties and methods of a loaded
 *                   SWF file are accessible and ready for use. The content,
 *                   however, can still be downloading. A LoaderInfo object
 *                   dispatches the <code>init</code> event when the following
 *                   conditions exist:
 *                   <ul>
 *                     <li>All properties and methods associated with the
 *                   loaded object and those associated with the LoaderInfo
 *                   object are accessible.</li>
 *                     <li>The constructors for all child objects have
 *                   completed.</li>
 *                     <li>All ActionScript code in the first frame of the
 *                   loaded SWF's main timeline has been executed.</li>
 *                   </ul>
 *
 *                   <p>For example, an <code>Event.INIT</code> is dispatched
 *                   when the first frame of a movie or animation is loaded.
 *                   The movie is then accessible and can be added to the
 *                   display list. The complete movie, however, can take
 *                   longer to download. The <code>Event.COMPLETE</code> is
 *                   only dispatched once the full movie is loaded.</p>
 *
 *                   <p>The <code>init</code> event always precedes the
 *                   <code>complete</code> event.</p>
 * @event ioError    Dispatched when an input or output error occurs that
 *                   causes a load operation to fail.
 * @event open       Dispatched when a load operation starts.
 * @event progress   Dispatched when data is received as the download
 *                   operation progresses.
 * @event unload     Dispatched by a LoaderInfo object whenever a loaded
 *                   object is removed by using the <code>unload()</code>
 *                   method of the Loader object, or when a second load is
 *                   performed by the same Loader object and the original
 *                   content is removed prior to the load beginning.
 */
var LoaderInfo = (function (_super) {
    __extends(LoaderInfo, _super);
    function LoaderInfo() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(LoaderInfo.prototype, "bytes", {
        /**
         * The bytes associated with a LoaderInfo object.
         *
         * @throws SecurityError If the object accessing this API is prevented from
         *                       accessing the loaded object due to security
         *                       restrictions. This situation can occur, for
         *                       instance, when a Loader object attempts to access
         *                       the <code>contentLoaderInfo.content</code> property
         *                       and it is not granted security permission to access
         *                       the loaded content.
         *
         *                       <p>For more information related to security, see the
         *                       Flash Player Developer Center Topic: <a
         *                       href="http://www.adobe.com/go/devnet_security_en"
         *                       scope="external">Security</a>.</p>
         */
        get: function () {
            return this._bytes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoaderInfo.prototype, "bytesLoaded", {
        /**
         * The number of bytes that are loaded for the media. When this number equals
         * the value of <code>bytesTotal</code>, all of the bytes are loaded.
         */
        get: function () {
            return this._bytesLoaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoaderInfo.prototype, "bytesTotal", {
        /**
         * The number of compressed bytes in the entire media file.
         *
         * <p>Before the first <code>progress</code> event is dispatched by this
         * LoaderInfo object's corresponding Loader object, <code>bytesTotal</code>
         * is 0. After the first <code>progress</code> event from the Loader object,
         * <code>bytesTotal</code> reflects the actual number of bytes to be
         * downloaded.</p>
         */
        get: function () {
            return this._bytesTotal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoaderInfo.prototype, "content", {
        /**
         * The loaded object associated with this LoaderInfo object.
         *
         * @throws SecurityError If the object accessing this API is prevented from
         *                       accessing the loaded object due to security
         *                       restrictions. This situation can occur, for
         *                       instance, when a Loader object attempts to access
         *                       the <code>contentLoaderInfo.content</code> property
         *                       and it is not granted security permission to access
         *                       the loaded content.
         *
         *                       <p>For more information related to security, see the
         *                       Flash Player Developer Center Topic: <a
         *                       href="http://www.adobe.com/go/devnet_security_en"
         *                       scope="external">Security</a>.</p>
         */
        get: function () {
            return this._content;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoaderInfo.prototype, "contentType", {
        /**
         * The MIME type of the loaded file. The value is <code>null</code> if not
         * enough of the file has loaded in order to determine the type. The
         * following list gives the possible values:
         * <ul>
         *   <li><code>"application/x-shockwave-flash"</code></li>
         *   <li><code>"image/jpeg"</code></li>
         *   <li><code>"image/gif"</code></li>
         *   <li><code>"image/png"</code></li>
         * </ul>
         */
        get: function () {
            return this._contentType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoaderInfo.prototype, "loader", {
        /**
         * The Loader object associated with this LoaderInfo object. If this
         * LoaderInfo object is the <code>loaderInfo</code> property of the instance
         * of the main class of the SWF file, no Loader object is associated.
         *
         * @throws SecurityError If the object accessing this API is prevented from
         *                       accessing the Loader object because of security
         *                       restrictions. This can occur, for instance, when a
         *                       loaded SWF file attempts to access its
         *                       <code>loaderInfo.loader</code> property and it is
         *                       not granted security permission to access the
         *                       loading SWF file.
         *
         *                       <p>For more information related to security, see the
         *                       Flash Player Developer Center Topic: <a
         *                       href="http://www.adobe.com/go/devnet_security_en"
         *                       scope="external">Security</a>.</p>
         */
        get: function () {
            return this._loader;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoaderInfo.prototype, "url", {
        /**
         * The URL of the media being loaded.
         *
         * <p>Before the first <code>progress</code> event is dispatched by this
         * LoaderInfo object's corresponding Loader object, the value of the
         * <code>url</code> property might reflect only the initial URL specified in
         * the call to the <code>load()</code> method of the Loader object. After the
         * first <code>progress</code> event, the <code>url</code> property reflects
         * the media's final URL, after any redirects and relative URLs are
         * resolved.</p>
         *
         * <p>In some cases, the value of the <code>url</code> property is truncated;
         * see the <code>isURLInaccessible</code> property for details.</p>
         */
        get: function () {
            return this._url;
        },
        enumerable: true,
        configurable: true
    });
    return LoaderInfo;
})(EventDispatcher);
module.exports = LoaderInfo;


},{"awayjs-core/lib/events/EventDispatcher":undefined}],"awayjs-display/lib/base/OrientationMode":[function(require,module,exports){
var OrientationMode = (function () {
    function OrientationMode() {
    }
    /**
     *
     */
    OrientationMode.DEFAULT = "default";
    /**
     *
     */
    OrientationMode.CAMERA_PLANE = "cameraPlane";
    /**
     *
     */
    OrientationMode.CAMERA_POSITION = "cameraPosition";
    return OrientationMode;
})();
module.exports = OrientationMode;


},{}],"awayjs-display/lib/base/SubMeshBase":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AbstractMethodError = require("awayjs-core/lib/errors/AbstractMethodError");
var AssetBase = require("awayjs-core/lib/library/AssetBase");
/**
 * SubMeshBase wraps a TriangleSubGeometry as a scene graph instantiation. A SubMeshBase is owned by a Mesh object.
 *
 *
 * @see away.base.TriangleSubGeometry
 * @see away.entities.Mesh
 *
 * @class away.base.SubMeshBase
 */
var SubMeshBase = (function (_super) {
    __extends(SubMeshBase, _super);
    /**
     * Creates a new SubMeshBase object
     */
    function SubMeshBase() {
        _super.call(this);
        this._iIndex = 0;
        this._renderables = new Array();
    }
    Object.defineProperty(SubMeshBase.prototype, "animator", {
        //TODO test shader picking
        //		public get shaderPickingDetails():boolean
        //		{
        //
        //			return this.sourceEntity.shaderPickingDetails;
        //		}
        /**
         * The animator object that provides the state for the TriangleSubMesh's animation.
         */
        get: function () {
            return this._pParentMesh.animator;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SubMeshBase.prototype, "material", {
        /**
         * The material used to render the current TriangleSubMesh. If set to null, its parent Mesh's material will be used instead.
         */
        get: function () {
            return this._material || this._pParentMesh.material;
        },
        set: function (value) {
            if (this.material)
                this.material.iRemoveOwner(this);
            this._material = value;
            if (this.material)
                this.material.iAddOwner(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SubMeshBase.prototype, "sceneTransform", {
        /**
         * The scene transform object that transforms from model to world space.
         */
        get: function () {
            return this._pParentMesh.sceneTransform;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SubMeshBase.prototype, "parentMesh", {
        /**
         * The entity that that initially provided the IRenderable to the render pipeline (ie: the owning Mesh object).
         */
        get: function () {
            return this._pParentMesh;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SubMeshBase.prototype, "uvTransform", {
        /**
         *
         */
        get: function () {
            return this._uvTransform || this._pParentMesh.uvTransform;
        },
        set: function (value) {
            this._uvTransform = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     */
    SubMeshBase.prototype.dispose = function () {
        this.material = null;
        var len = this._renderables.length;
        for (var i = 0; i < len; i++)
            this._renderables[i].dispose();
        this._renderables = new Array();
    };
    /**
     *
     * @param camera
     * @returns {away.geom.Matrix3D}
     */
    SubMeshBase.prototype.getRenderSceneTransform = function (camera) {
        return this._pParentMesh.getRenderSceneTransform(camera);
    };
    SubMeshBase.prototype._iAddRenderable = function (renderable) {
        this._renderables.push(renderable);
        return renderable;
    };
    SubMeshBase.prototype._iRemoveRenderable = function (renderable) {
        var index = this._renderables.indexOf(renderable);
        this._renderables.splice(index, 1);
        return renderable;
    };
    SubMeshBase.prototype._iInvalidateRenderableGeometry = function () {
        var len = this._renderables.length;
        for (var i = 0; i < len; i++)
            this._renderables[i].invalidateGeometry();
    };
    SubMeshBase.prototype._iCollectRenderable = function (rendererPool) {
        throw new AbstractMethodError();
    };
    SubMeshBase.prototype._iGetExplicitMaterial = function () {
        return this._material;
    };
    return SubMeshBase;
})(AssetBase);
module.exports = SubMeshBase;


},{"awayjs-core/lib/errors/AbstractMethodError":undefined,"awayjs-core/lib/library/AssetBase":undefined}],"awayjs-display/lib/base/Transform":[function(require,module,exports){
var Matrix3D = require("awayjs-core/lib/geom/Matrix3D");
var Matrix3DUtils = require("awayjs-core/lib/geom/Matrix3DUtils");
var Vector3D = require("awayjs-core/lib/geom/Vector3D");
/**
 * The Transform class provides access to color adjustment properties and two-
 * or three-dimensional transformation objects that can be applied to a
 * display object. During the transformation, the color or the orientation and
 * position of a display object is adjusted(offset) from the current values
 * or coordinates to new values or coordinates. The Transform class also
 * collects data about color and two-dimensional matrix transformations that
 * are applied to a display object and all of its parent objects. You can
 * access these combined transformations through the
 * <code>concatenatedColorTransform</code> and <code>concatenatedMatrix</code>
 * properties.
 *
 * <p>To apply color transformations: create a ColorTransform object, set the
 * color adjustments using the object's methods and properties, and then
 * assign the <code>colorTransformation</code> property of the
 * <code>transform</code> property of the display object to the new
 * ColorTransformation object.</p>
 *
 * <p>To apply two-dimensional transformations: create a Matrix object, set
 * the matrix's two-dimensional transformation, and then assign the
 * <code>transform.matrix</code> property of the display object to the new
 * Matrix object.</p>
 *
 * <p>To apply three-dimensional transformations: start with a
 * three-dimensional display object. A three-dimensional display object has a
 * <code>z</code> property value other than zero. You do not need to create
 * the Matrix3D object. For all three-dimensional objects, a Matrix3D object
 * is created automatically when you assign a <code>z</code> value to a
 * display object. You can access the display object's Matrix3D object through
 * the display object's <code>transform</code> property. Using the methods of
 * the Matrix3D class, you can add to or modify the existing transformation
 * settings. Also, you can create a custom Matrix3D object, set the custom
 * Matrix3D object's transformation elements, and then assign the new Matrix3D
 * object to the display object using the <code>transform.matrix</code>
 * property.</p>
 *
 * <p>To modify a perspective projection of the stage or root object: use the
 * <code>transform.matrix</code> property of the root display object to gain
 * access to the PerspectiveProjection object. Or, apply different perspective
 * projection properties to a display object by setting the perspective
 * projection properties of the display object's parent. The child display
 * object inherits the new properties. Specifically, create a
 * PerspectiveProjection object and set its properties, then assign the
 * PerspectiveProjection object to the <code>perspectiveProjection</code>
 * property of the parent display object's <code>transform</code> property.
 * The specified projection transformation then applies to all the display
 * object's three-dimensional children.</p>
 *
 * <p>Since both PerspectiveProjection and Matrix3D objects perform
 * perspective transformations, do not assign both to a display object at the
 * same time. Use the PerspectiveProjection object for focal length and
 * projection center changes. For more control over the perspective
 * transformation, create a perspective projection Matrix3D object.</p>
 */
var Transform = (function () {
    function Transform(displayObject) {
        this._position = new Vector3D();
        this._displayObject = displayObject;
    }
    Object.defineProperty(Transform.prototype, "backVector", {
        /**
         *
         */
        get: function () {
            var director = Matrix3DUtils.getForward(this._displayObject._iMatrix3D);
            director.negate();
            return director;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "concatenatedColorTransform", {
        /**
         * A ColorTransform object representing the combined color transformations
         * applied to the display object and all of its parent objects, back to the
         * root level. If different color transformations have been applied at
         * different levels, all of those transformations are concatenated into one
         * ColorTransform object for this property.
         */
        get: function () {
            return this._concatenatedColorTransform; //TODO
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "concatenatedMatrix", {
        /**
         * A Matrix object representing the combined transformation matrixes of the
         * display object and all of its parent objects, back to the root level. If
         * different transformation matrixes have been applied at different levels,
         * all of those matrixes are concatenated into one matrix for this property.
         * Also, for resizeable SWF content running in the browser, this property
         * factors in the difference between stage coordinates and window coordinates
         * due to window resizing. Thus, the property converts local coordinates to
         * window coordinates, which may not be the same coordinate space as that of
         * the Stage.
         */
        get: function () {
            return this._concatenatedMatrix; //TODO
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "downVector", {
        /**
         *
         */
        get: function () {
            var director = Matrix3DUtils.getUp(this._displayObject._iMatrix3D);
            director.negate();
            return director;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "forwardVector", {
        /**
         *
         */
        get: function () {
            return Matrix3DUtils.getForward(this._displayObject._iMatrix3D);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "leftVector", {
        /**
         *
         */
        get: function () {
            var director = Matrix3DUtils.getRight(this._displayObject._iMatrix3D);
            director.negate();
            return director;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "matrix3D", {
        /**
         * Provides access to the Matrix3D object of a three-dimensional display
         * object. The Matrix3D object represents a transformation matrix that
         * determines the display object's position and orientation. A Matrix3D
         * object can also perform perspective projection.
         *
         * <p>If the <code>matrix</code> property is set to a value(not
         * <code>null</code>), the <code>matrix3D</code> property is
         * <code>null</code>. And if the <code>matrix3D</code> property is set to a
         * value(not <code>null</code>), the <code>matrix</code> property is
         * <code>null</code>.</p>
         */
        get: function () {
            return this._displayObject._iMatrix3D;
        },
        set: function (val) {
            this._displayObject._iMatrix3D = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "pixelBounds", {
        /**
         * A Rectangle object that defines the bounding rectangle of the display
         * object on the stage.
         */
        get: function () {
            return this._pixelBounds;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "position", {
        /**
         * Defines the position of the 3d object, relative to the local coordinates of the parent <code>ObjectContainer3D</code>.
         */
        get: function () {
            return this._displayObject._iMatrix3D.position;
        },
        set: function (value) {
            this._displayObject.x = value.x;
            this._displayObject.y = value.y;
            this._displayObject.z = value.z;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "rightVector", {
        /**
         *
         */
        get: function () {
            return Matrix3DUtils.getRight(this._displayObject._iMatrix3D);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "rotation", {
        /**
         * Defines the rotation of the 3d object, relative to the local coordinates of the parent <code>ObjectContainer3D</code>.
         */
        get: function () {
            return new Vector3D(this._displayObject.rotationX, this._displayObject.rotationY, this._displayObject.rotationZ);
        },
        set: function (value) {
            this._displayObject.rotationX = value.x;
            this._displayObject.rotationY = value.y;
            this._displayObject.rotationZ = value.z;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "scale", {
        /**
         * Defines the scale of the 3d object, relative to the local coordinates of the parent <code>ObjectContainer3D</code>.
         */
        get: function () {
            return new Vector3D(this._displayObject.scaleX, this._displayObject.scaleY, this._displayObject.scaleZ);
        },
        set: function (value) {
            this._displayObject.scaleX = value.x;
            this._displayObject.scaleY = value.y;
            this._displayObject.scaleZ = value.z;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "upVector", {
        /**
         *
         */
        get: function () {
            return Matrix3DUtils.getUp(this._displayObject._iMatrix3D);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns a Matrix3D object, which can transform the space of a specified
     * display object in relation to the current display object's space. You can
     * use the <code>getRelativeMatrix3D()</code> method to move one
     * three-dimensional display object relative to another three-dimensional
     * display object.
     *
     * @param relativeTo The display object relative to which the transformation
     *                   occurs. To get a Matrix3D object relative to the stage,
     *                   set the parameter to the <code>root</code> or
     *                   <code>stage</code> object. To get the world-relative
     *                   matrix of the display object, set the parameter to a
     *                   display object that has a perspective transformation
     *                   applied to it.
     * @return A Matrix3D object that can be used to transform the space from the
     *         <code>relativeTo</code> display object to the current display
     *         object space.
     */
    Transform.prototype.getRelativeMatrix3D = function (relativeTo) {
        return new Matrix3D(); //TODO
    };
    /**
     * Moves the 3d object forwards along it's local z axis
     *
     * @param    distance    The length of the movement
     */
    Transform.prototype.moveForward = function (distance) {
        this._displayObject.translateLocal(Vector3D.Z_AXIS, distance);
    };
    /**
     * Moves the 3d object backwards along it's local z axis
     *
     * @param    distance    The length of the movement
     */
    Transform.prototype.moveBackward = function (distance) {
        this._displayObject.translateLocal(Vector3D.Z_AXIS, -distance);
    };
    /**
     * Moves the 3d object backwards along it's local x axis
     *
     * @param    distance    The length of the movement
     */
    Transform.prototype.moveLeft = function (distance) {
        this._displayObject.translateLocal(Vector3D.X_AXIS, -distance);
    };
    /**
     * Moves the 3d object forwards along it's local x axis
     *
     * @param    distance    The length of the movement
     */
    Transform.prototype.moveRight = function (distance) {
        this._displayObject.translateLocal(Vector3D.X_AXIS, distance);
    };
    /**
     * Moves the 3d object forwards along it's local y axis
     *
     * @param    distance    The length of the movement
     */
    Transform.prototype.moveUp = function (distance) {
        this._displayObject.translateLocal(Vector3D.Y_AXIS, distance);
    };
    /**
     * Moves the 3d object backwards along it's local y axis
     *
     * @param    distance    The length of the movement
     */
    Transform.prototype.moveDown = function (distance) {
        this._displayObject.translateLocal(Vector3D.Y_AXIS, -distance);
    };
    return Transform;
})();
module.exports = Transform;


},{"awayjs-core/lib/geom/Matrix3D":undefined,"awayjs-core/lib/geom/Matrix3DUtils":undefined,"awayjs-core/lib/geom/Vector3D":undefined}],"awayjs-display/lib/base/TriangleSubMesh":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TriangleSubGeometry = require("awayjs-core/lib/data/TriangleSubGeometry");
var SubMeshBase = require("awayjs-display/lib/base/SubMeshBase");
/**
 * TriangleSubMesh wraps a TriangleSubGeometry as a scene graph instantiation. A TriangleSubMesh is owned by a Mesh object.
 *
 *
 * @see away.base.TriangleSubGeometry
 * @see away.entities.Mesh
 *
 * @class away.base.TriangleSubMesh
 */
var TriangleSubMesh = (function (_super) {
    __extends(TriangleSubMesh, _super);
    /**
     * Creates a new TriangleSubMesh object
     * @param subGeometry The TriangleSubGeometry object which provides the geometry data for this TriangleSubMesh.
     * @param parentMesh The Mesh object to which this TriangleSubMesh belongs.
     * @param material An optional material used to render this TriangleSubMesh.
     */
    function TriangleSubMesh(subGeometry, parentMesh, material) {
        if (material === void 0) { material = null; }
        _super.call(this);
        this._pParentMesh = parentMesh;
        this._subGeometry = subGeometry;
        this.material = material;
    }
    Object.defineProperty(TriangleSubMesh.prototype, "assetType", {
        /**
         *
         */
        get: function () {
            return TriangleSubMesh.assetType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TriangleSubMesh.prototype, "subGeometry", {
        /**
         * The TriangleSubGeometry object which provides the geometry data for this TriangleSubMesh.
         */
        get: function () {
            return this._subGeometry;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     */
    TriangleSubMesh.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    TriangleSubMesh.prototype._iCollectRenderable = function (rendererPool) {
        rendererPool.applyTriangleSubMesh(this);
    };
    TriangleSubMesh.assetType = "[asset TriangleSubMesh]";
    TriangleSubMesh.geometryType = TriangleSubGeometry.assetType;
    return TriangleSubMesh;
})(SubMeshBase);
module.exports = TriangleSubMesh;


},{"awayjs-core/lib/data/TriangleSubGeometry":undefined,"awayjs-display/lib/base/SubMeshBase":"awayjs-display/lib/base/SubMeshBase"}],"awayjs-display/lib/bounds/AxisAlignedBoundingBox":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Matrix3DUtils = require("awayjs-core/lib/geom/Matrix3DUtils");
var PlaneClassification = require("awayjs-core/lib/geom/PlaneClassification");
var BoundingVolumeBase = require("awayjs-display/lib/bounds/BoundingVolumeBase");
var PrimitiveCubePrefab = require("awayjs-display/lib/prefabs/PrimitiveCubePrefab");
/**
 * AxisAlignedBoundingBox represents a bounding box volume that has its planes aligned to the local coordinate axes of the bounded object.
 * This is useful for most meshes.
 */
var AxisAlignedBoundingBox = (function (_super) {
    __extends(AxisAlignedBoundingBox, _super);
    /**
     * Creates a new <code>AxisAlignedBoundingBox</code> object.
     */
    function AxisAlignedBoundingBox(entity) {
        _super.call(this, entity);
        this._x = 0;
        this._y = 0;
        this._z = 0;
        this._width = 0;
        this._height = 0;
        this._depth = 0;
        this._centerX = 0;
        this._centerY = 0;
        this._centerZ = 0;
        this._halfExtentsX = 0;
        this._halfExtentsY = 0;
        this._halfExtentsZ = 0;
    }
    /**
     * @inheritDoc
     */
    AxisAlignedBoundingBox.prototype.nullify = function () {
        this._x = this._y = this._z = 0;
        this._width = this._height = this._depth = 0;
        this._centerX = this._centerY = this._centerZ = 0;
        this._halfExtentsX = this._halfExtentsY = this._halfExtentsZ = 0;
    };
    /**
     * @inheritDoc
     */
    AxisAlignedBoundingBox.prototype.isInFrustum = function (planes, numPlanes) {
        if (this._pInvalidated)
            this._pUpdate();
        for (var i = 0; i < numPlanes; ++i) {
            var plane = planes[i];
            var a = plane.a;
            var b = plane.b;
            var c = plane.c;
            var flippedExtentX = a < 0 ? -this._halfExtentsX : this._halfExtentsX;
            var flippedExtentY = b < 0 ? -this._halfExtentsY : this._halfExtentsY;
            var flippedExtentZ = c < 0 ? -this._halfExtentsZ : this._halfExtentsZ;
            var projDist = a * (this._centerX + flippedExtentX) + b * (this._centerY + flippedExtentY) + c * (this._centerZ + flippedExtentZ) - plane.d;
            if (projDist < 0)
                return false;
        }
        return true;
    };
    AxisAlignedBoundingBox.prototype.rayIntersection = function (position, direction, targetNormal) {
        if (this._pInvalidated)
            this._pUpdate();
        return this._box.rayIntersection(position, direction, targetNormal);
    };
    AxisAlignedBoundingBox.prototype.classifyToPlane = function (plane) {
        var a = plane.a;
        var b = plane.b;
        var c = plane.c;
        var centerDistance = a * this._centerX + b * this._centerY + c * this._centerZ - plane.d;
        if (a < 0)
            a = -a;
        if (b < 0)
            b = -b;
        if (c < 0)
            c = -c;
        var boundOffset = a * this._halfExtentsX + b * this._halfExtentsY + c * this._halfExtentsZ;
        return centerDistance > boundOffset ? PlaneClassification.FRONT : centerDistance < -boundOffset ? PlaneClassification.BACK : PlaneClassification.INTERSECT;
    };
    AxisAlignedBoundingBox.prototype._pUpdate = function () {
        _super.prototype._pUpdate.call(this);
        this._box = this._pEntity.getBox();
        var matrix = this._pEntity.sceneTransform;
        var hx = this._box.width / 2;
        var hy = this._box.height / 2;
        var hz = this._box.depth / 2;
        var cx = this._box.x + hx;
        var cy = this._box.y + hy;
        var cz = this._box.z + hz;
        var raw = Matrix3DUtils.RAW_DATA_CONTAINER;
        matrix.copyRawDataTo(raw);
        var m11 = raw[0], m12 = raw[4], m13 = raw[8], m14 = raw[12];
        var m21 = raw[1], m22 = raw[5], m23 = raw[9], m24 = raw[13];
        var m31 = raw[2], m32 = raw[6], m33 = raw[10], m34 = raw[14];
        this._centerX = cx * m11 + cy * m12 + cz * m13 + m14;
        this._centerY = cx * m21 + cy * m22 + cz * m23 + m24;
        this._centerZ = cx * m31 + cy * m32 + cz * m33 + m34;
        this._halfExtentsX = Math.abs(hx * m11 + hy * m12 + hz * m13);
        this._halfExtentsY = Math.abs(hx * m21 + hy * m22 + hz * m23);
        this._halfExtentsZ = Math.abs(hx * m31 + hy * m32 + hz * m33);
        if (this._prefab) {
            this._prefab.width = this._box.width;
            this._prefab.height = this._box.height;
            this._prefab.depth = this._box.depth;
            this._pBoundsPrimitive.transform.matrix3D = matrix;
        }
        this._width = this._halfExtentsX * 2;
        this._height = this._halfExtentsY * 2;
        this._depth = this._halfExtentsZ * 2;
        this._x = this._centerX - this._halfExtentsX;
        this._y = this._centerY - this._halfExtentsY;
        this._z = this._centerZ - this._halfExtentsZ;
    };
    AxisAlignedBoundingBox.prototype._pCreateBoundsPrimitive = function () {
        this._prefab = new PrimitiveCubePrefab();
        this._prefab.geometryType = "lineSubGeometry";
        return this._prefab.getNewObject();
    };
    return AxisAlignedBoundingBox;
})(BoundingVolumeBase);
module.exports = AxisAlignedBoundingBox;


},{"awayjs-core/lib/geom/Matrix3DUtils":undefined,"awayjs-core/lib/geom/PlaneClassification":undefined,"awayjs-display/lib/bounds/BoundingVolumeBase":"awayjs-display/lib/bounds/BoundingVolumeBase","awayjs-display/lib/prefabs/PrimitiveCubePrefab":"awayjs-display/lib/prefabs/PrimitiveCubePrefab"}],"awayjs-display/lib/bounds/BoundingSphere":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var PlaneClassification = require("awayjs-core/lib/geom/PlaneClassification");
var BoundingVolumeBase = require("awayjs-display/lib/bounds/BoundingVolumeBase");
var PrimitiveSpherePrefab = require("awayjs-display/lib/prefabs/PrimitiveSpherePrefab");
var BoundingSphere = (function (_super) {
    __extends(BoundingSphere, _super);
    function BoundingSphere(entity) {
        _super.call(this, entity);
        this._radius = 0;
        this._centerX = 0;
        this._centerY = 0;
        this._centerZ = 0;
    }
    BoundingSphere.prototype.nullify = function () {
        this._centerX = this._centerY = this._centerZ = 0;
        this._radius = 0;
    };
    BoundingSphere.prototype.isInFrustum = function (planes, numPlanes) {
        if (this._pInvalidated)
            this._pUpdate();
        for (var i = 0; i < numPlanes; ++i) {
            var plane = planes[i];
            var flippedExtentX = plane.a < 0 ? -this._radius : this._radius;
            var flippedExtentY = plane.b < 0 ? -this._radius : this._radius;
            var flippedExtentZ = plane.c < 0 ? -this._radius : this._radius;
            var projDist = plane.a * (this._centerX + flippedExtentX) + plane.b * (this._centerY + flippedExtentY) + plane.c * (this._centerZ + flippedExtentZ) - plane.d;
            if (projDist < 0) {
                return false;
            }
        }
        return true;
    };
    BoundingSphere.prototype.rayIntersection = function (position, direction, targetNormal) {
        if (this._pInvalidated)
            this._pUpdate();
        return this._sphere.rayIntersection(position, direction, targetNormal);
    };
    //@override
    BoundingSphere.prototype.classifyToPlane = function (plane) {
        var a = plane.a;
        var b = plane.b;
        var c = plane.c;
        var dd = a * this._centerX + b * this._centerY + c * this._centerZ - plane.d;
        if (a < 0)
            a = -a;
        if (b < 0)
            b = -b;
        if (c < 0)
            c = -c;
        var rr = (a + b + c) * this._radius;
        return dd > rr ? PlaneClassification.FRONT : dd < -rr ? PlaneClassification.BACK : PlaneClassification.INTERSECT;
    };
    BoundingSphere.prototype._pUpdate = function () {
        _super.prototype._pUpdate.call(this);
        this._sphere = this._pEntity.getSphere();
        var matrix = this._pEntity.sceneTransform;
        var cx = this._sphere.x;
        var cy = this._sphere.y;
        var cz = this._sphere.z;
        var r = this._sphere.radius;
        var raw = new Array(16);
        matrix.copyRawDataTo(raw);
        var m11 = raw[0], m12 = raw[4], m13 = raw[8], m14 = raw[12];
        var m21 = raw[1], m22 = raw[5], m23 = raw[9], m24 = raw[13];
        var m31 = raw[2], m32 = raw[6], m33 = raw[10], m34 = raw[14];
        this._centerX = cx * m11 + cy * m12 + cz * m13 + m14;
        this._centerY = cx * m21 + cy * m22 + cz * m23 + m24;
        this._centerZ = cx * m31 + cy * m32 + cz * m33 + m34;
        var rx = m11 + m12 + m13;
        var ry = m21 + m22 + m23;
        var rz = m31 + m32 + m33;
        this._radius = r * Math.sqrt((rx * rx + ry * ry + rz * rz) / 3);
        if (this._prefab) {
            this._prefab.radius = r;
            this._pBoundsPrimitive.x = cx;
            this._pBoundsPrimitive.y = cy;
            this._pBoundsPrimitive.z = cz;
            this._pBoundsPrimitive.transform.matrix3D = matrix;
        }
    };
    BoundingSphere.prototype._pCreateBoundsPrimitive = function () {
        this._prefab = new PrimitiveSpherePrefab();
        this._prefab.geometryType = "lineSubGeometry";
        return this._prefab.getNewObject();
    };
    return BoundingSphere;
})(BoundingVolumeBase);
module.exports = BoundingSphere;


},{"awayjs-core/lib/geom/PlaneClassification":undefined,"awayjs-display/lib/bounds/BoundingVolumeBase":"awayjs-display/lib/bounds/BoundingVolumeBase","awayjs-display/lib/prefabs/PrimitiveSpherePrefab":"awayjs-display/lib/prefabs/PrimitiveSpherePrefab"}],"awayjs-display/lib/bounds/BoundingVolumeBase":[function(require,module,exports){
var AbstractMethodError = require("awayjs-core/lib/errors/AbstractMethodError");
var BoundingVolumeBase = (function () {
    function BoundingVolumeBase(entity) {
        this._pInvalidated = true;
        this._pEntity = entity;
    }
    Object.defineProperty(BoundingVolumeBase.prototype, "boundsPrimitive", {
        get: function () {
            if (this._pBoundsPrimitive == null) {
                this._pBoundsPrimitive = this._pCreateBoundsPrimitive();
                this._pUpdate();
            }
            return this._pBoundsPrimitive;
        },
        enumerable: true,
        configurable: true
    });
    BoundingVolumeBase.prototype.nullify = function () {
        throw new AbstractMethodError();
    };
    BoundingVolumeBase.prototype.isInFrustum = function (planes, numPlanes) {
        throw new AbstractMethodError();
    };
    BoundingVolumeBase.prototype.clone = function () {
        throw new AbstractMethodError();
    };
    BoundingVolumeBase.prototype.rayIntersection = function (position, direction, targetNormal) {
        return -1;
    };
    BoundingVolumeBase.prototype.classifyToPlane = function (plane) {
        throw new AbstractMethodError();
    };
    BoundingVolumeBase.prototype._pUpdate = function () {
        this._pInvalidated = false;
    };
    BoundingVolumeBase.prototype.invalidate = function () {
        this._pInvalidated = true;
    };
    BoundingVolumeBase.prototype._pCreateBoundsPrimitive = function () {
        throw new AbstractMethodError();
    };
    return BoundingVolumeBase;
})();
module.exports = BoundingVolumeBase;


},{"awayjs-core/lib/errors/AbstractMethodError":undefined}],"awayjs-display/lib/bounds/BoundsType":[function(require,module,exports){
/**
 *
 */
var BoundsType = (function () {
    function BoundsType() {
    }
    /**
     *
     */
    BoundsType.SPHERE = "sphere";
    /**
     *
     */
    BoundsType.AXIS_ALIGNED_BOX = "axisAlignedBox";
    /**
     *
     */
    BoundsType.NULL = "null";
    return BoundsType;
})();
module.exports = BoundsType;


},{}],"awayjs-display/lib/bounds/NullBounds":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var PlaneClassification = require("awayjs-core/lib/geom/PlaneClassification");
var BoundingVolumeBase = require("awayjs-display/lib/bounds/BoundingVolumeBase");
var NullBounds = (function (_super) {
    __extends(NullBounds, _super);
    function NullBounds(alwaysIn) {
        if (alwaysIn === void 0) { alwaysIn = true; }
        _super.call(this, null);
        this._alwaysIn = alwaysIn;
    }
    //@override
    NullBounds.prototype.clone = function () {
        return new NullBounds(this._alwaysIn);
    };
    //@override
    NullBounds.prototype.isInFrustum = function (planes, numPlanes) {
        return this._alwaysIn;
    };
    NullBounds.prototype.classifyToPlane = function (plane) {
        return PlaneClassification.INTERSECT;
    };
    return NullBounds;
})(BoundingVolumeBase);
module.exports = NullBounds;


},{"awayjs-core/lib/geom/PlaneClassification":undefined,"awayjs-display/lib/bounds/BoundingVolumeBase":"awayjs-display/lib/bounds/BoundingVolumeBase"}],"awayjs-display/lib/containers/DisplayObjectContainer":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ArgumentError = require("awayjs-core/lib/errors/ArgumentError");
var Error = require("awayjs-core/lib/errors/Error");
var RangeError = require("awayjs-core/lib/errors/RangeError");
var DisplayObject = require("awayjs-display/lib/base/DisplayObject");
/**
 * The DisplayObjectContainer class is the base class for all objects that can
 * serve as display object containers on the display list. The display list
 * manages all objects displayed in the Flash runtimes. Use the
 * DisplayObjectContainer class to arrange the display objects in the display
 * list. Each DisplayObjectContainer object has its own child list for
 * organizing the z-order of the objects. The z-order is the front-to-back
 * order that determines which object is drawn in front, which is behind, and
 * so on.
 *
 * <p>DisplayObject is an abstract base class; therefore, you cannot call
 * DisplayObject directly. Invoking <code>new DisplayObject()</code> throws an
 * <code>ArgumentError</code> exception.</p>
 * The DisplayObjectContainer class is an abstract base class for all objects
 * that can contain child objects. It cannot be instantiated directly; calling
 * the <code>new DisplayObjectContainer()</code> constructor throws an
 * <code>ArgumentError</code> exception.
 *
 * <p>For more information, see the "Display Programming" chapter of the
 * <i>ActionScript 3.0 Developer's Guide</i>.</p>
 */
var DisplayObjectContainer = (function (_super) {
    __extends(DisplayObjectContainer, _super);
    /**
     * Calling the <code>new DisplayObjectContainer()</code> constructor throws
     * an <code>ArgumentError</code> exception. You <i>can</i>, however, call
     * constructors for the following subclasses of DisplayObjectContainer:
     * <ul>
     *   <li><code>new Loader()</code></li>
     *   <li><code>new Sprite()</code></li>
     *   <li><code>new MovieClip()</code></li>
     * </ul>
     */
    function DisplayObjectContainer() {
        _super.call(this);
        this._mouseChildren = true;
        this._children = new Array();
    }
    Object.defineProperty(DisplayObjectContainer.prototype, "assetType", {
        /**
         *
         */
        get: function () {
            return DisplayObjectContainer.assetType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObjectContainer.prototype, "mouseChildren", {
        /**
         * Determines whether or not the children of the object are mouse, or user
         * input device, enabled. If an object is enabled, a user can interact with
         * it by using a mouse or user input device. The default is
         * <code>true</code>.
         *
         * <p>This property is useful when you create a button with an instance of
         * the Sprite class(instead of using the SimpleButton class). When you use a
         * Sprite instance to create a button, you can choose to decorate the button
         * by using the <code>addChild()</code> method to add additional Sprite
         * instances. This process can cause unexpected behavior with mouse events
         * because the Sprite instances you add as children can become the target
         * object of a mouse event when you expect the parent instance to be the
         * target object. To ensure that the parent instance serves as the target
         * objects for mouse events, you can set the <code>mouseChildren</code>
         * property of the parent instance to <code>false</code>.</p>
         *
         * <p> No event is dispatched by setting this property. You must use the
         * <code>addEventListener()</code> method to create interactive
         * functionality.</p>
         */
        get: function () {
            return this._mouseChildren;
        },
        set: function (value) {
            if (this._mouseChildren == value)
                return;
            this._mouseChildren = value;
            this._pUpdateImplicitMouseEnabled(this._pParent ? this._pParent.mouseChildren : true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObjectContainer.prototype, "numChildren", {
        /**
         * Returns the number of children of this object.
         */
        get: function () {
            return this._children.length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Adds a child DisplayObject instance to this DisplayObjectContainer
     * instance. The child is added to the front(top) of all other children in
     * this DisplayObjectContainer instance.(To add a child to a specific index
     * position, use the <code>addChildAt()</code> method.)
     *
     * <p>If you add a child object that already has a different display object
     * container as a parent, the object is removed from the child list of the
     * other display object container. </p>
     *
     * <p><b>Note:</b> The command <code>stage.addChild()</code> can cause
     * problems with a published SWF file, including security problems and
     * conflicts with other loaded SWF files. There is only one Stage within a
     * Flash runtime instance, no matter how many SWF files you load into the
     * runtime. So, generally, objects should not be added to the Stage,
     * directly, at all. The only object the Stage should contain is the root
     * object. Create a DisplayObjectContainer to contain all of the items on the
     * display list. Then, if necessary, add that DisplayObjectContainer instance
     * to the Stage.</p>
     *
     * @param child The DisplayObject instance to add as a child of this
     *              DisplayObjectContainer instance.
     * @return The DisplayObject instance that you pass in the <code>child</code>
     *         parameter.
     * @throws ArgumentError Throws if the child is the same as the parent. Also
     *                       throws if the caller is a child(or grandchild etc.)
     *                       of the child being added.
     * @event added Dispatched when a display object is added to the display
     *              list.
     */
    DisplayObjectContainer.prototype.addChild = function (child) {
        if (child == null)
            throw new Error("Parameter child cannot be null.");
        //if child already has a parent, remove it.
        if (child._pParent)
            child._pParent.removeChildInternal(child);
        child.iSetParent(this);
        this._children.push(child);
        return child;
    };
    /**
     * Adds a child DisplayObject instance to this DisplayObjectContainer
     * instance. The child is added at the index position specified. An index of
     * 0 represents the back(bottom) of the display list for this
     * DisplayObjectContainer object.
     *
     * <p>For example, the following example shows three display objects, labeled
     * a, b, and c, at index positions 0, 2, and 1, respectively:</p>
     *
     * <p>If you add a child object that already has a different display object
     * container as a parent, the object is removed from the child list of the
     * other display object container. </p>
     *
     * @param child The DisplayObject instance to add as a child of this
     *              DisplayObjectContainer instance.
     * @param index The index position to which the child is added. If you
     *              specify a currently occupied index position, the child object
     *              that exists at that position and all higher positions are
     *              moved up one position in the child list.
     * @return The DisplayObject instance that you pass in the <code>child</code>
     *         parameter.
     * @throws ArgumentError Throws if the child is the same as the parent. Also
     *                       throws if the caller is a child(or grandchild etc.)
     *                       of the child being added.
     * @throws RangeError    Throws if the index position does not exist in the
     *                       child list.
     * @event added Dispatched when a display object is added to the display
     *              list.
     */
    DisplayObjectContainer.prototype.addChildAt = function (child, index /*int*/) {
        return child;
    };
    DisplayObjectContainer.prototype.addChildren = function () {
        var childarray = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            childarray[_i - 0] = arguments[_i];
        }
        var len = childarray.length;
        for (var i = 0; i < len; i++)
            this.addChild(childarray[i]);
    };
    /**
     *
     */
    DisplayObjectContainer.prototype.clone = function () {
        var clone = new DisplayObjectContainer();
        clone.pivot = this.pivot;
        clone._iMatrix3D = this._iMatrix3D;
        clone.partition = this.partition;
        clone.name = name;
        var len = this._children.length;
        for (var i = 0; i < len; ++i)
            clone.addChild(this._children[i].clone());
        // todo: implement for all subtypes
        return clone;
    };
    /**
     * Determines whether the specified display object is a child of the
     * DisplayObjectContainer instance or the instance itself. The search
     * includes the entire display list including this DisplayObjectContainer
     * instance. Grandchildren, great-grandchildren, and so on each return
     * <code>true</code>.
     *
     * @param child The child object to test.
     * @return <code>true</code> if the <code>child</code> object is a child of
     *         the DisplayObjectContainer or the container itself; otherwise
     *         <code>false</code>.
     */
    DisplayObjectContainer.prototype.contains = function (child) {
        return this._children.indexOf(child) >= 0;
    };
    /**
     *
     */
    DisplayObjectContainer.prototype.disposeWithChildren = function () {
        this.dispose();
        while (this.numChildren > 0)
            this.getChildAt(0).dispose();
    };
    /**
     * Returns the child display object instance that exists at the specified
     * index.
     *
     * @param index The index position of the child object.
     * @return The child display object at the specified index position.
     * @throws RangeError    Throws if the index does not exist in the child
     *                       list.
     */
    DisplayObjectContainer.prototype.getChildAt = function (index /*int*/) {
        var child = this._children[index];
        if (child == null)
            throw new RangeError("Index does not exist in the child list of the caller");
        return child;
    };
    /**
     * Returns the child display object that exists with the specified name. If
     * more that one child display object has the specified name, the method
     * returns the first object in the child list.
     *
     * <p>The <code>getChildAt()</code> method is faster than the
     * <code>getChildByName()</code> method. The <code>getChildAt()</code> method
     * accesses a child from a cached array, whereas the
     * <code>getChildByName()</code> method has to traverse a linked list to
     * access a child.</p>
     *
     * @param name The name of the child to return.
     * @return The child display object with the specified name.
     */
    DisplayObjectContainer.prototype.getChildByName = function (name) {
        var len = this._children.length;
        for (var i = 0; i < len; ++i)
            if (this._children[i].name == name)
                return this._children[i];
        return null;
    };
    /**
     * Returns the index position of a <code>child</code> DisplayObject instance.
     *
     * @param child The DisplayObject instance to identify.
     * @return The index position of the child display object to identify.
     * @throws ArgumentError Throws if the child parameter is not a child of this
     *                       object.
     */
    DisplayObjectContainer.prototype.getChildIndex = function (child) {
        var childIndex = this._children.indexOf(child);
        if (childIndex == -1)
            throw new ArgumentError("Child parameter is not a child of the caller");
        return childIndex;
    };
    /**
     * Returns an array of objects that lie under the specified point and are
     * children(or grandchildren, and so on) of this DisplayObjectContainer
     * instance. Any child objects that are inaccessible for security reasons are
     * omitted from the returned array. To determine whether this security
     * restriction affects the returned array, call the
     * <code>areInaccessibleObjectsUnderPoint()</code> method.
     *
     * <p>The <code>point</code> parameter is in the coordinate space of the
     * Stage, which may differ from the coordinate space of the display object
     * container(unless the display object container is the Stage). You can use
     * the <code>globalToLocal()</code> and the <code>localToGlobal()</code>
     * methods to convert points between these coordinate spaces.</p>
     *
     * @param point The point under which to look.
     * @return An array of objects that lie under the specified point and are
     *         children(or grandchildren, and so on) of this
     *         DisplayObjectContainer instance.
     */
    DisplayObjectContainer.prototype.getObjectsUnderPoint = function (point) {
        return new Array();
    };
    /**
     * Removes the specified <code>child</code> DisplayObject instance from the
     * child list of the DisplayObjectContainer instance. The <code>parent</code>
     * property of the removed child is set to <code>null</code> , and the object
     * is garbage collected if no other references to the child exist. The index
     * positions of any display objects above the child in the
     * DisplayObjectContainer are decreased by 1.
     *
     * <p>The garbage collector reallocates unused memory space. When a variable
     * or object is no longer actively referenced or stored somewhere, the
     * garbage collector sweeps through and wipes out the memory space it used to
     * occupy if no other references to it exist.</p>
     *
     * @param child The DisplayObject instance to remove.
     * @return The DisplayObject instance that you pass in the <code>child</code>
     *         parameter.
     * @throws ArgumentError Throws if the child parameter is not a child of this
     *                       object.
     */
    DisplayObjectContainer.prototype.removeChild = function (child) {
        if (child == null)
            throw new Error("Parameter child cannot be null");
        this.removeChildInternal(child);
        child.iSetParent(null);
        return child;
    };
    /**
     * Removes a child DisplayObject from the specified <code>index</code>
     * position in the child list of the DisplayObjectContainer. The
     * <code>parent</code> property of the removed child is set to
     * <code>null</code>, and the object is garbage collected if no other
     * references to the child exist. The index positions of any display objects
     * above the child in the DisplayObjectContainer are decreased by 1.
     *
     * <p>The garbage collector reallocates unused memory space. When a variable
     * or object is no longer actively referenced or stored somewhere, the
     * garbage collector sweeps through and wipes out the memory space it used to
     * occupy if no other references to it exist.</p>
     *
     * @param index The child index of the DisplayObject to remove.
     * @return The DisplayObject instance that was removed.
     * @throws RangeError    Throws if the index does not exist in the child
     *                       list.
     * @throws SecurityError This child display object belongs to a sandbox to
     *                       which the calling object does not have access. You
     *                       can avoid this situation by having the child movie
     *                       call the <code>Security.allowDomain()</code> method.
     */
    DisplayObjectContainer.prototype.removeChildAt = function (index /*int*/) {
        return this.removeChild(this._children[index]);
    };
    /**
     * Removes all <code>child</code> DisplayObject instances from the child list
     * of the DisplayObjectContainer instance. The <code>parent</code> property
     * of the removed children is set to <code>null</code>, and the objects are
     * garbage collected if no other references to the children exist.
     *
     * The garbage collector reallocates unused memory space. When a variable or
     * object is no longer actively referenced or stored somewhere, the garbage
     * collector sweeps through and wipes out the memory space it used to occupy
     * if no other references to it exist.
     *
     * @param beginIndex The beginning position. A value smaller than 0 throws a RangeError.
     * @param endIndex The ending position. A value smaller than 0 throws a RangeError.
     * @throws RangeError    Throws if the beginIndex or endIndex positions do
     *                       not exist in the child list.
     */
    DisplayObjectContainer.prototype.removeChildren = function (beginIndex, endIndex) {
        if (beginIndex === void 0) { beginIndex = 0; }
        if (endIndex === void 0) { endIndex = 2147483647; }
        if (beginIndex < 0)
            throw new RangeError("beginIndex is out of range of the child list");
        if (endIndex > this._children.length)
            throw new RangeError("endIndex is out of range of the child list");
        for (var i = beginIndex; i < endIndex; i++)
            this.removeChild(this._children[i]);
    };
    /**
     * Changes the position of an existing child in the display object container.
     * This affects the layering of child objects. For example, the following
     * example shows three display objects, labeled a, b, and c, at index
     * positions 0, 1, and 2, respectively:
     *
     * <p>When you use the <code>setChildIndex()</code> method and specify an
     * index position that is already occupied, the only positions that change
     * are those in between the display object's former and new position. All
     * others will stay the same. If a child is moved to an index LOWER than its
     * current index, all children in between will INCREASE by 1 for their index
     * reference. If a child is moved to an index HIGHER than its current index,
     * all children in between will DECREASE by 1 for their index reference. For
     * example, if the display object container in the previous example is named
     * <code>container</code>, you can swap the position of the display objects
     * labeled a and b by calling the following code:</p>
     *
     * <p>This code results in the following arrangement of objects:</p>
     *
     * @param child The child DisplayObject instance for which you want to change
     *              the index number.
     * @param index The resulting index number for the <code>child</code> display
     *              object.
     * @throws ArgumentError Throws if the child parameter is not a child of this
     *                       object.
     * @throws RangeError    Throws if the index does not exist in the child
     *                       list.
     */
    DisplayObjectContainer.prototype.setChildIndex = function (child, index /*int*/) {
        //TODO
    };
    /**
     * Swaps the z-order (front-to-back order) of the two specified child
     * objects. All other child objects in the display object container remain in
     * the same index positions.
     *
     * @param child1 The first child object.
     * @param child2 The second child object.
     * @throws ArgumentError Throws if either child parameter is not a child of
     *                       this object.
     */
    DisplayObjectContainer.prototype.swapChildren = function (child1, child2) {
        //TODO
    };
    /**
     * Swaps the z-order(front-to-back order) of the child objects at the two
     * specified index positions in the child list. All other child objects in
     * the display object container remain in the same index positions.
     *
     * @param index1 The index position of the first child object.
     * @param index2 The index position of the second child object.
     * @throws RangeError If either index does not exist in the child list.
     */
    DisplayObjectContainer.prototype.swapChildrenAt = function (index1 /*int*/, index2 /*int*/) {
        //TODO
    };
    /**
     * @protected
     */
    DisplayObjectContainer.prototype.pInvalidateSceneTransform = function () {
        _super.prototype.pInvalidateSceneTransform.call(this);
        var len = this._children.length;
        for (var i = 0; i < len; ++i)
            this._children[i].pInvalidateSceneTransform();
    };
    /**
     * @protected
     */
    DisplayObjectContainer.prototype._pUpdateImplicitMouseEnabled = function (value) {
        _super.prototype._pUpdateImplicitMouseEnabled.call(this, value);
        var len = this._children.length;
        for (var i = 0; i < len; ++i)
            this._children[i]._pUpdateImplicitMouseEnabled(this._mouseChildren);
    };
    /**
     * @protected
     */
    DisplayObjectContainer.prototype._pUpdateImplicitVisibility = function (value) {
        _super.prototype._pUpdateImplicitVisibility.call(this, value);
        var len = this._children.length;
        for (var i = 0; i < len; ++i)
            this._children[i]._pUpdateImplicitVisibility(this._pImplicitVisibility);
    };
    /**
     * @protected
     */
    DisplayObjectContainer.prototype._pUpdateImplicitPartition = function (value, scene) {
        _super.prototype._pUpdateImplicitPartition.call(this, value, scene);
        var len = this._children.length;
        for (var i = 0; i < len; ++i)
            this._children[i]._pUpdateImplicitPartition(this._pImplicitPartition, scene);
    };
    /**
     * @private
     *
     * @param child
     */
    DisplayObjectContainer.prototype.removeChildInternal = function (child) {
        this._children.splice(this.getChildIndex(child), 1);
        return child;
    };
    DisplayObjectContainer.assetType = "[asset DisplayObjectContainer]";
    return DisplayObjectContainer;
})(DisplayObject);
module.exports = DisplayObjectContainer;


},{"awayjs-core/lib/errors/ArgumentError":undefined,"awayjs-core/lib/errors/Error":undefined,"awayjs-core/lib/errors/RangeError":undefined,"awayjs-display/lib/base/DisplayObject":"awayjs-display/lib/base/DisplayObject"}],"awayjs-display/lib/containers/Loader":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AssetLibraryBundle = require("awayjs-core/lib/library/AssetLibraryBundle");
var AssetLoader = require("awayjs-core/lib/library/AssetLoader");
var AssetEvent = require("awayjs-core/lib/events/AssetEvent");
var IOErrorEvent = require("awayjs-core/lib/events/IOErrorEvent");
var LoaderEvent = require("awayjs-core/lib/events/LoaderEvent");
var ParserEvent = require("awayjs-core/lib/events/ParserEvent");
var DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
/**
 * The Loader class is used to load SWF files or image(JPG, PNG, or GIF)
 * files. Use the <code>load()</code> method to initiate loading. The loaded
 * display object is added as a child of the Loader object.
 *
 * <p>Use the URLLoader class to load text or binary data.</p>
 *
 * <p>The Loader class overrides the following methods that it inherits,
 * because a Loader object can only have one child display object - the
 * display object that it loads. Calling the following methods throws an
 * exception: <code>addChild()</code>, <code>addChildAt()</code>,
 * <code>removeChild()</code>, <code>removeChildAt()</code>, and
 * <code>setChildIndex()</code>. To remove a loaded display object, you must
 * remove the <i>Loader</i> object from its parent DisplayObjectContainer
 * child array. </p>
 *
 * <p><b>Note:</b> The ActionScript 2.0 MovieClipLoader and LoadVars classes
 * are not used in ActionScript 3.0. The Loader and URLLoader classes replace
 * them.</p>
 *
 * <p>When you use the Loader class, consider the Flash Player and Adobe AIR
 * security model: </p>
 *
 * <ul>
 *   <li>You can load content from any accessible source. </li>
 *   <li>Loading is not allowed if the calling SWF file is in a network
 * sandbox and the file to be loaded is local. </li>
 *   <li>If the loaded content is a SWF file written with ActionScript 3.0, it
 * cannot be cross-scripted by a SWF file in another security sandbox unless
 * that cross-scripting arrangement was approved through a call to the
 * <code>System.allowDomain()</code> or the
 * <code>System.allowInsecureDomain()</code> method in the loaded content
 * file.</li>
 *   <li>If the loaded content is an AVM1 SWF file(written using ActionScript
 * 1.0 or 2.0), it cannot be cross-scripted by an AVM2 SWF file(written using
 * ActionScript 3.0). However, you can communicate between the two SWF files
 * by using the LocalConnection class.</li>
 *   <li>If the loaded content is an image, its data cannot be accessed by a
 * SWF file outside of the security sandbox, unless the domain of that SWF
 * file was included in a URL policy file at the origin domain of the
 * image.</li>
 *   <li>Movie clips in the local-with-file-system sandbox cannot script movie
 * clips in the local-with-networking sandbox, and the reverse is also
 * prevented. </li>
 *   <li>You cannot connect to commonly reserved ports. For a complete list of
 * blocked ports, see "Restricting Networking APIs" in the <i>ActionScript 3.0
 * Developer's Guide</i>. </li>
 * </ul>
 *
 * <p>However, in AIR, content in the <code>application</code> security
 * sandbox(content installed with the AIR application) are not restricted by
 * these security limitations.</p>
 *
 * <p>For more information related to security, see the Flash Player Developer
 * Center Topic: <a href="http://www.adobe.com/go/devnet_security_en"
 * scope="external">Security</a>.</p>
 *
 * <p>When loading a SWF file from an untrusted source(such as a domain other
 * than that of the Loader object's root SWF file), you may want to define a
 * mask for the Loader object, to prevent the loaded content(which is a child
 * of the Loader object) from drawing to portions of the Stage outside of that
 * mask, as shown in the following code:</p>
 */
var Loader = (function (_super) {
    __extends(Loader, _super);
    /**
     * Creates a Loader object that you can use to load files, such as SWF, JPEG,
     * GIF, or PNG files. Call the <code>load()</code> method to load the asset
     * as a child of the Loader instance. You can then add the Loader object to
     * the display list(for instance, by using the <code>addChild()</code>
     * method of a DisplayObjectContainer instance). The asset appears on the
     * Stage as it loads.
     *
     * <p>You can also use a Loader instance "offlist," that is without adding it
     * to a display object container on the display list. In this mode, the
     * Loader instance might be used to load a SWF file that contains additional
     * modules of an application. </p>
     *
     * <p>To detect when the SWF file is finished loading, you can use the events
     * of the LoaderInfo object associated with the
     * <code>contentLoaderInfo</code> property of the Loader object. At that
     * point, the code in the module SWF file can be executed to initialize and
     * start the module. In the offlist mode, a Loader instance might also be
     * used to load a SWF file that contains components or media assets. Again,
     * you can use the LoaderInfo object event notifications to detect when the
     * components are finished loading. At that point, the application can start
     * using the components and media assets in the library of the SWF file by
     * instantiating the ActionScript 3.0 classes that represent those components
     * and assets.</p>
     *
     * <p>To determine the status of a Loader object, monitor the following
     * events that the LoaderInfo object associated with the
     * <code>contentLoaderInfo</code> property of the Loader object:</p>
     *
     * <ul>
     *   <li>The <code>open</code> event is dispatched when loading begins.</li>
     *   <li>The <code>ioError</code> or <code>securityError</code> event is
     * dispatched if the file cannot be loaded or if an error occured during the
     * load process. </li>
     *   <li>The <code>progress</code> event fires continuously while the file is
     * being loaded.</li>
     *   <li>The <code>complete</code> event is dispatched when a file completes
     * downloading, but before the loaded movie clip's methods and properties are
     * available. </li>
     *   <li>The <code>init</code> event is dispatched after the properties and
     * methods of the loaded SWF file are accessible, so you can begin
     * manipulating the loaded SWF file. This event is dispatched before the
     * <code>complete</code> handler. In streaming SWF files, the
     * <code>init</code> event can occur significantly earlier than the
     * <code>complete</code> event. For most purposes, use the <code>init</code>
     * handler.</li>
     * </ul>
     */
    function Loader(useAssetLibrary, assetLibraryId) {
        var _this = this;
        if (useAssetLibrary === void 0) { useAssetLibrary = true; }
        if (assetLibraryId === void 0) { assetLibraryId = null; }
        _super.call(this);
        this._loadingSessions = new Array();
        this._useAssetLib = useAssetLibrary;
        this._assetLibId = assetLibraryId;
        this._onResourceCompleteDelegate = function (event) { return _this.onResourceComplete(event); };
        this._onAssetCompleteDelegate = function (event) { return _this.onAssetComplete(event); };
    }
    Object.defineProperty(Loader.prototype, "content", {
        /**
         * Contains the root display object of the SWF file or image(JPG, PNG, or
         * GIF) file that was loaded by using the <code>load()</code> or
         * <code>loadBytes()</code> methods.
         *
         * @throws SecurityError The loaded SWF file or image file belongs to a
         *                       security sandbox to which you do not have access.
         *                       For a loaded SWF file, you can avoid this situation
         *                       by having the file call the
         *                       <code>Security.allowDomain()</code> method or by
         *                       having the loading file specify a
         *                       <code>loaderContext</code> parameter with its
         *                       <code>securityDomain</code> property set to
         *                       <code>SecurityDomain.currentDomain</code> when you
         *                       call the <code>load()</code> or
         *                       <code>loadBytes()</code> method.
         */
        get: function () {
            return this._content;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Loader.prototype, "contentLoaderInfo", {
        /**
         * Returns a LoaderInfo object corresponding to the object being loaded.
         * LoaderInfo objects are shared between the Loader object and the loaded
         * content object. The LoaderInfo object supplies loading progress
         * information and statistics about the loaded file.
         *
         * <p>Events related to the load are dispatched by the LoaderInfo object
         * referenced by the <code>contentLoaderInfo</code> property of the Loader
         * object. The <code>contentLoaderInfo</code> property is set to a valid
         * LoaderInfo object, even before the content is loaded, so that you can add
         * event listeners to the object prior to the load.</p>
         *
         * <p>To detect uncaught errors that happen in a loaded SWF, use the
         * <code>Loader.uncaughtErrorEvents</code> property, not the
         * <code>Loader.contentLoaderInfo.uncaughtErrorEvents</code> property.</p>
         */
        get: function () {
            return this._contentLoaderInfo;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Cancels a <code>load()</code> method operation that is currently in
     * progress for the Loader instance.
     *
     */
    Loader.prototype.close = function () {
        if (this._useAssetLib) {
            var lib;
            lib = AssetLibraryBundle.getInstance(this._assetLibId);
            lib.stopAllLoadingSessions();
            this._loadingSessions = null;
            return;
        }
        var i /*int*/;
        var length = this._loadingSessions.length;
        for (i = 0; i < length; i++) {
            this.removeListeners(this._loadingSessions[i]);
            this._loadingSessions[i].stop();
            this._loadingSessions[i] = null;
        }
        this._loadingSessions = null;
    };
    /**
     * Loads a SWF, JPEG, progressive JPEG, unanimated GIF, or PNG file into an
     * object that is a child of this Loader object. If you load an animated GIF
     * file, only the first frame is displayed. As the Loader object can contain
     * only a single child, issuing a subsequent <code>load()</code> request
     * terminates the previous request, if still pending, and commences a new
     * load.
     *
     * <p><b>Note</b>: In AIR 1.5 and Flash Player 10, the maximum size for a
     * loaded image is 8,191 pixels in width or height, and the total number of
     * pixels cannot exceed 16,777,215 pixels.(So, if an loaded image is 8,191
     * pixels wide, it can only be 2,048 pixels high.) In Flash Player 9 and
     * earlier and AIR 1.1 and earlier, the limitation is 2,880 pixels in height
     * and 2,880 pixels in width.</p>
     *
     * <p>A SWF file or image loaded into a Loader object inherits the position,
     * rotation, and scale properties of the parent display objects of the Loader
     * object. </p>
     *
     * <p>Use the <code>unload()</code> method to remove movies or images loaded
     * with this method, or to cancel a load operation that is in progress.</p>
     *
     * <p>You can prevent a SWF file from using this method by setting the
     * <code>allowNetworking</code> parameter of the the <code>object</code> and
     * <code>embed</code> tags in the HTML page that contains the SWF
     * content.</p>
     *
     * <p>When you use this method, consider the Flash Player security model,
     * which is described in the Loader class description. </p>
     *
     * <p> In Flash Player 10 and later, if you use a multipart Content-Type(for
     * example "multipart/form-data") that contains an upload(indicated by a
     * "filename" parameter in a "content-disposition" header within the POST
     * body), the POST operation is subject to the security rules applied to
     * uploads:</p>
     *
     * <ul>
     *   <li>The POST operation must be performed in response to a user-initiated
     * action, such as a mouse click or key press.</li>
     *   <li>If the POST operation is cross-domain(the POST target is not on the
     * same server as the SWF file that is sending the POST request), the target
     * server must provide a URL policy file that permits cross-domain
     * access.</li>
     * </ul>
     *
     * <p>Also, for any multipart Content-Type, the syntax must be valid
     * (according to the RFC2046 standard). If the syntax appears to be invalid,
     * the POST operation is subject to the security rules applied to
     * uploads.</p>
     *
     * <p>For more information related to security, see the Flash Player
     * Developer Center Topic: <a
     * href="http://www.adobe.com/go/devnet_security_en"
     * scope="external">Security</a>.</p>
     *
     * @param request The absolute or relative URL of the SWF, JPEG, GIF, or PNG
     *                file to be loaded. A relative path must be relative to the
     *                main SWF file. Absolute URLs must include the protocol
     *                reference, such as http:// or file:///. Filenames cannot
     *                include disk drive specifications.
     * @param context A LoaderContext object, which has properties that define
     *                the following:
     *                <ul>
     *                  <li>Whether or not to check for the existence of a policy
     *                file upon loading the object</li>
     *                  <li>The ApplicationDomain for the loaded object</li>
     *                  <li>The SecurityDomain for the loaded object</li>
     *                  <li>The ImageDecodingPolicy for the loaded image
     *                object</li>
     *                </ul>
     *
     *                <p>If the <code>context</code> parameter is not specified
     *                or refers to a null object, the loaded content remains in
     *                its own security domain.</p>
     *
     *                <p>For complete details, see the description of the
     *                properties in the <a
     *                href="../system/LoaderContext.html">LoaderContext</a>
     *                class.</p>
     * @param ns      An optional namespace string under which the file is to be
     *                loaded, allowing the differentiation of two resources with
     *                identical assets.
     * @param parser  An optional parser object for translating the loaded data
     *                into a usable resource. If not provided, AssetLoader will
     *                attempt to auto-detect the file type.
     * @throws IOError               The <code>digest</code> property of the
     *                               <code>request</code> object is not
     *                               <code>null</code>. You should only set the
     *                               <code>digest</code> property of a URLRequest
     *                               object when calling the
     *                               <code>URLLoader.load()</code> method when
     *                               loading a SWZ file(an Adobe platform
     *                               component).
     * @throws IllegalOperationError If the <code>requestedContentParent</code>
     *                               property of the <code>context</code>
     *                               parameter is a <code>Loader</code>.
     * @throws IllegalOperationError If the <code>LoaderContext.parameters</code>
     *                               parameter is set to non-null and has some
     *                               values which are not Strings.
     * @throws SecurityError         The value of
     *                               <code>LoaderContext.securityDomain</code>
     *                               must be either <code>null</code> or
     *                               <code>SecurityDomain.currentDomain</code>.
     *                               This reflects the fact that you can only
     *                               place the loaded media in its natural
     *                               security sandbox or your own(the latter
     *                               requires a policy file).
     * @throws SecurityError         Local SWF files may not set
     *                               LoaderContext.securityDomain to anything
     *                               other than <code>null</code>. It is not
     *                               permitted to import non-local media into a
     *                               local sandbox, or to place other local media
     *                               in anything other than its natural sandbox.
     * @throws SecurityError         You cannot connect to commonly reserved
     *                               ports. For a complete list of blocked ports,
     *                               see "Restricting Networking APIs" in the
     *                               <i>ActionScript 3.0 Developer's Guide</i>.
     * @throws SecurityError         If the <code>applicationDomain</code> or
     *                               <code>securityDomain</code> properties of
     *                               the <code>context</code> parameter are from
     *                               a disallowed domain.
     * @throws SecurityError         If a local SWF file is attempting to use the
     *                               <code>securityDomain</code> property of the
     *                               <code>context</code> parameter.
     * @event asyncError    Dispatched by the <code>contentLoaderInfo</code>
     *                      object if the
     *                      <code>LoaderContext.requestedContentParent</code>
     *                      property has been specified and it is not possible to
     *                      add the loaded content as a child to the specified
     *                      DisplayObjectContainer. This could happen if the
     *                      loaded content is a
     *                      <code>flash.display.AVM1Movie</code> or if the
     *                      <code>addChild()</code> call to the
     *                      requestedContentParent throws an error.
     * @event complete      Dispatched by the <code>contentLoaderInfo</code>
     *                      object when the file has completed loading. The
     *                      <code>complete</code> event is always dispatched
     *                      after the <code>init</code> event.
     * @event httpStatus    Dispatched by the <code>contentLoaderInfo</code>
     *                      object when a network request is made over HTTP and
     *                      Flash Player can detect the HTTP status code.
     * @event init          Dispatched by the <code>contentLoaderInfo</code>
     *                      object when the properties and methods of the loaded
     *                      SWF file are accessible. The <code>init</code> event
     *                      always precedes the <code>complete</code> event.
     * @event ioError       Dispatched by the <code>contentLoaderInfo</code>
     *                      object when an input or output error occurs that
     *                      causes a load operation to fail.
     * @event open          Dispatched by the <code>contentLoaderInfo</code>
     *                      object when the loading operation starts.
     * @event progress      Dispatched by the <code>contentLoaderInfo</code>
     *                      object as data is received while load operation
     *                      progresses.
     * @event securityError Dispatched by the <code>contentLoaderInfo</code>
     *                      object if a SWF file in the local-with-filesystem
     *                      sandbox attempts to load content in the
     *                      local-with-networking sandbox, or vice versa.
     * @event securityError Dispatched by the <code>contentLoaderInfo</code>
     *                      object if the
     *                      <code>LoaderContext.requestedContentParent</code>
     *                      property has been specified and the security sandbox
     *                      of the
     *                      <code>LoaderContext.requestedContentParent</code>
     *                      does not have access to the loaded SWF.
     * @event unload        Dispatched by the <code>contentLoaderInfo</code>
     *                      object when a loaded object is removed.
     */
    Loader.prototype.load = function (request, context, ns, parser) {
        if (context === void 0) { context = null; }
        if (ns === void 0) { ns = null; }
        if (parser === void 0) { parser = null; }
        var token;
        if (this._useAssetLib) {
            var lib;
            lib = AssetLibraryBundle.getInstance(this._assetLibId);
            token = lib.load(request, context, ns, parser);
        }
        else {
            var loader = new AssetLoader();
            this._loadingSessions.push(loader);
            token = loader.load(request, context, ns, parser);
        }
        token.addEventListener(LoaderEvent.RESOURCE_COMPLETE, this._onResourceCompleteDelegate);
        token.addEventListener(AssetEvent.ASSET_COMPLETE, this._onAssetCompleteDelegate);
        // Error are handled separately (see documentation for addErrorHandler)
        token._iLoader._iAddErrorHandler(this.onLoadError);
        token._iLoader._iAddParseErrorHandler(this.onParseError);
        return token;
    };
    /**
     * Loads from binary data stored in a ByteArray object.
     *
     * <p>The <code>loadBytes()</code> method is asynchronous. You must wait for
     * the "init" event before accessing the properties of a loaded object.</p>
     *
     * <p>When you use this method, consider the Flash Player security model,
     * which is described in the Loader class description. </p>
     *
     * @param bytes   A ByteArray object. The contents of the ByteArray can be
     *                any of the file formats supported by the Loader class: SWF,
     *                GIF, JPEG, or PNG.
     * @param context A LoaderContext object. Only the
     *                <code>applicationDomain</code> property of the
     *                LoaderContext object applies; the
     *                <code>checkPolicyFile</code> and
     *                <code>securityDomain</code> properties of the LoaderContext
     *                object do not apply.
     *
     *                <p>If the <code>context</code> parameter is not specified
     *                or refers to a null object, the content is loaded into the
     *                current security domain -  a process referred to as "import
     *                loading" in Flash Player security documentation.
     *                Specifically, if the loading SWF file trusts the remote SWF
     *                by incorporating the remote SWF into its code, then the
     *                loading SWF can import it directly into its own security
     *                domain.</p>
     *
     *                <p>For more information related to security, see the Flash
     *                Player Developer Center Topic: <a
     *                href="http://www.adobe.com/go/devnet_security_en"
     *                scope="external">Security</a>.</p>
     * @throws ArgumentError         If the <code>length</code> property of the
     *                               ByteArray object is not greater than 0.
     * @throws IllegalOperationError If the <code>checkPolicyFile</code> or
     *                               <code>securityDomain</code> property of the
     *                               <code>context</code> parameter are non-null.
     * @throws IllegalOperationError If the <code>requestedContentParent</code>
     *                               property of the <code>context</code>
     *                               parameter is a <code>Loader</code>.
     * @throws IllegalOperationError If the <code>LoaderContext.parameters</code>
     *                               parameter is set to non-null and has some
     *                               values which are not Strings.
     * @throws SecurityError         If the provided
     *                               <code>applicationDomain</code> property of
     *                               the <code>context</code> property is from a
     *                               disallowed domain.
     * @throws SecurityError         You cannot connect to commonly reserved
     *                               ports. For a complete list of blocked ports,
     *                               see "Restricting Networking APIs" in the
     *                               <i>ActionScript 3.0 Developer's Guide</i>.
     * @event asyncError    Dispatched by the <code>contentLoaderInfo</code>
     *                      object if the
     *                      <code>LoaderContext.requestedContentParent</code>
     *                      property has been specified and it is not possible to
     *                      add the loaded content as a child to the specified
     *                      DisplayObjectContainer. This could happen if the
     *                      loaded content is a
     *                      <code>flash.display.AVM1Movie</code> or if the
     *                      <code>addChild()</code> call to the
     *                      requestedContentParent throws an error.
     * @event complete      Dispatched by the <code>contentLoaderInfo</code>
     *                      object when the operation is complete. The
     *                      <code>complete</code> event is always dispatched
     *                      after the <code>init</code> event.
     * @event init          Dispatched by the <code>contentLoaderInfo</code>
     *                      object when the properties and methods of the loaded
     *                      data are accessible. The <code>init</code> event
     *                      always precedes the <code>complete</code> event.
     * @event ioError       Dispatched by the <code>contentLoaderInfo</code>
     *                      object when the runtime cannot parse the data in the
     *                      byte array.
     * @event open          Dispatched by the <code>contentLoaderInfo</code>
     *                      object when the operation starts.
     * @event progress      Dispatched by the <code>contentLoaderInfo</code>
     *                      object as data is transfered in memory.
     * @event securityError Dispatched by the <code>contentLoaderInfo</code>
     *                      object if the
     *                      <code>LoaderContext.requestedContentParent</code>
     *                      property has been specified and the security sandbox
     *                      of the
     *                      <code>LoaderContext.requestedContentParent</code>
     *                      does not have access to the loaded SWF.
     * @event unload        Dispatched by the <code>contentLoaderInfo</code>
     *                      object when a loaded object is removed.
     */
    Loader.prototype.loadData = function (data, context, ns, parser) {
        if (context === void 0) { context = null; }
        if (ns === void 0) { ns = null; }
        if (parser === void 0) { parser = null; }
        var token;
        if (this._useAssetLib) {
            var lib;
            lib = AssetLibraryBundle.getInstance(this._assetLibId);
            token = lib.loadData(data, context, ns, parser);
        }
        else {
            var loader = new AssetLoader();
            this._loadingSessions.push(loader);
            token = loader.loadData(data, '', context, ns, parser);
        }
        token.addEventListener(LoaderEvent.RESOURCE_COMPLETE, this._onResourceCompleteDelegate);
        token.addEventListener(AssetEvent.ASSET_COMPLETE, this._onAssetCompleteDelegate);
        // Error are handled separately (see documentation for addErrorHandler)
        token._iLoader._iAddErrorHandler(this.onLoadError);
        token._iLoader._iAddParseErrorHandler(this.onParseError);
        return token;
    };
    /**
     * Removes a child of this Loader object that was loaded by using the
     * <code>load()</code> method. The <code>property</code> of the associated
     * LoaderInfo object is reset to <code>null</code>. The child is not
     * necessarily destroyed because other objects might have references to it;
     * however, it is no longer a child of the Loader object.
     *
     * <p>As a best practice, before you unload a child SWF file, you should
     * explicitly close any streams in the child SWF file's objects, such as
     * LocalConnection, NetConnection, NetStream, and Sound objects. Otherwise,
     * audio in the child SWF file might continue to play, even though the child
     * SWF file was unloaded. To close streams in the child SWF file, add an
     * event listener to the child that listens for the <code>unload</code>
     * event. When the parent calls <code>Loader.unload()</code>, the
     * <code>unload</code> event is dispatched to the child. The following code
     * shows how you might do this:</p>
     * <pre xml:space="preserve"> public closeAllStreams(evt:Event) {
     * myNetStream.close(); mySound.close(); myNetConnection.close();
     * myLocalConnection.close(); }
     * myMovieClip.loaderInfo.addEventListener(Event.UNLOAD,
     * closeAllStreams);</pre>
     *
     */
    Loader.prototype.unload = function () {
        //TODO
    };
    /**
     * Enables a specific parser.
     * When no specific parser is set for a loading/parsing opperation,
     * loader3d can autoselect the correct parser to use.
     * A parser must have been enabled, to be considered when autoselecting the parser.
     *
     * @param parserClass The parser class to enable.
     * @see away.parsers.Parsers
     */
    Loader.enableParser = function (parserClass) {
        AssetLoader.enableParser(parserClass);
    };
    /**
     * Enables a list of parsers.
     * When no specific parser is set for a loading/parsing opperation,
     * loader3d can autoselect the correct parser to use.
     * A parser must have been enabled, to be considered when autoselecting the parser.
     *
     * @param parserClasses A Vector of parser classes to enable.
     * @see away.parsers.Parsers
     */
    Loader.enableParsers = function (parserClasses) {
        AssetLoader.enableParsers(parserClasses);
    };
    Loader.prototype.removeListeners = function (dispatcher) {
        dispatcher.removeEventListener(LoaderEvent.RESOURCE_COMPLETE, this._onResourceCompleteDelegate);
        dispatcher.removeEventListener(AssetEvent.ASSET_COMPLETE, this._onAssetCompleteDelegate);
    };
    Loader.prototype.onAssetComplete = function (event) {
        this.dispatchEvent(event);
    };
    /**
     * Called when an error occurs during loading
     */
    Loader.prototype.onLoadError = function (event) {
        if (this.hasEventListener(IOErrorEvent.IO_ERROR)) {
            this.dispatchEvent(event);
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * Called when a an error occurs during parsing
     */
    Loader.prototype.onParseError = function (event) {
        if (this.hasEventListener(ParserEvent.PARSE_ERROR)) {
            this.dispatchEvent(event);
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * Called when the resource and all of its dependencies was retrieved.
     */
    Loader.prototype.onResourceComplete = function (event) {
        this._content = event.content;
        if (this._content)
            this.addChild(this._content);
        this.dispatchEvent(event);
    };
    return Loader;
})(DisplayObjectContainer);
module.exports = Loader;


},{"awayjs-core/lib/events/AssetEvent":undefined,"awayjs-core/lib/events/IOErrorEvent":undefined,"awayjs-core/lib/events/LoaderEvent":undefined,"awayjs-core/lib/events/ParserEvent":undefined,"awayjs-core/lib/library/AssetLibraryBundle":undefined,"awayjs-core/lib/library/AssetLoader":undefined,"awayjs-display/lib/containers/DisplayObjectContainer":"awayjs-display/lib/containers/DisplayObjectContainer"}],"awayjs-display/lib/containers/Scene":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EventDispatcher = require("awayjs-core/lib/events/EventDispatcher");
var DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
var SceneEvent = require("awayjs-display/lib/events/SceneEvent");
var NodeBase = require("awayjs-display/lib/partition/NodeBase");
var Partition = require("awayjs-display/lib/partition/Partition");
var Scene = (function (_super) {
    __extends(Scene, _super);
    function Scene() {
        _super.call(this);
        this._expandedPartitions = new Array();
        this._partitions = new Array();
        this._iCollectionMark = 0;
        this._partition = new Partition(new NodeBase());
        this._iSceneGraphRoot = new DisplayObjectContainer();
        this._iSceneGraphRoot._iSetScene(this);
        this._iSceneGraphRoot._iIsRoot = true;
        this._iSceneGraphRoot.partition = this._partition;
    }
    Scene.prototype.traversePartitions = function (traverser) {
        var i = 0;
        var len = this._partitions.length;
        traverser.scene = this;
        this._iCollectionMark++;
        while (i < len)
            this._partitions[i++].traverse(traverser);
    };
    Object.defineProperty(Scene.prototype, "partition", {
        get: function () {
            return this._iSceneGraphRoot.partition;
        },
        set: function (value) {
            this._iSceneGraphRoot.partition = value;
            this.dispatchEvent(new SceneEvent(SceneEvent.PARTITION_CHANGED, this._iSceneGraphRoot));
        },
        enumerable: true,
        configurable: true
    });
    Scene.prototype.contains = function (child) {
        return this._iSceneGraphRoot.contains(child);
    };
    Scene.prototype.addChild = function (child) {
        return this._iSceneGraphRoot.addChild(child);
    };
    Scene.prototype.removeChild = function (child) {
        this._iSceneGraphRoot.removeChild(child);
    };
    Scene.prototype.removeChildAt = function (index) {
        this._iSceneGraphRoot.removeChildAt(index);
    };
    Scene.prototype.getChildAt = function (index) {
        return this._iSceneGraphRoot.getChildAt(index);
    };
    Object.defineProperty(Scene.prototype, "numChildren", {
        get: function () {
            return this._iSceneGraphRoot.numChildren;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @internal
     */
    Scene.prototype._iRegisterPartition = function (partition) {
        this._expandedPartitions.push(partition);
        //ensure duplicates are not found in partitions array
        if (this._partitions.indexOf(partition) == -1)
            this._partitions.push(partition);
    };
    /**
     * @internal
     */
    Scene.prototype._iUnregisterPartition = function (partition) {
        this._expandedPartitions.splice(this._expandedPartitions.indexOf(partition), 1);
        //if no more partition references found, remove from partitions array
        if (this._expandedPartitions.indexOf(partition) == -1)
            this._partitions.splice(this._partitions.indexOf(partition), 1);
    };
    return Scene;
})(EventDispatcher);
module.exports = Scene;


},{"awayjs-core/lib/events/EventDispatcher":undefined,"awayjs-display/lib/containers/DisplayObjectContainer":"awayjs-display/lib/containers/DisplayObjectContainer","awayjs-display/lib/events/SceneEvent":"awayjs-display/lib/events/SceneEvent","awayjs-display/lib/partition/NodeBase":"awayjs-display/lib/partition/NodeBase","awayjs-display/lib/partition/Partition":"awayjs-display/lib/partition/Partition"}],"awayjs-display/lib/containers/View":[function(require,module,exports){
var getTimer = require("awayjs-core/lib/utils/getTimer");
var Scene = require("awayjs-display/lib/containers/Scene");
var RaycastPicker = require("awayjs-display/lib/pick/RaycastPicker");
var Camera = require("awayjs-display/lib/entities/Camera");
var CameraEvent = require("awayjs-display/lib/events/CameraEvent");
var SceneEvent = require("awayjs-display/lib/events/SceneEvent");
var RendererEvent = require("awayjs-display/lib/events/RendererEvent");
var MouseManager = require("awayjs-display/lib/managers/MouseManager");
var View = (function () {
    /*
     ***********************************************************************
     * Disabled / Not yet implemented
     ***********************************************************************
     *
     * private _background:away.textures.Texture2DBase;
     *
     * public _pTouch3DManager:away.managers.Touch3DManager;
     *
     */
    function View(renderer, scene, camera) {
        var _this = this;
        if (scene === void 0) { scene = null; }
        if (camera === void 0) { camera = null; }
        this._width = 0;
        this._height = 0;
        this._time = 0;
        this._deltaTime = 0;
        this._backgroundColor = 0x000000;
        this._backgroundAlpha = 1;
        this._viewportDirty = true;
        this._scissorDirty = true;
        this._mousePicker = new RaycastPicker();
        this._onScenePartitionChangedDelegate = function (event) { return _this.onScenePartitionChanged(event); };
        this._onProjectionChangedDelegate = function (event) { return _this.onProjectionChanged(event); };
        this._onViewportUpdatedDelegate = function (event) { return _this.onViewportUpdated(event); };
        this._onScissorUpdatedDelegate = function (event) { return _this.onScissorUpdated(event); };
        this.scene = scene || new Scene();
        this.camera = camera || new Camera();
        this.renderer = renderer;
        //make sure document border is zero
        document.body.style.margin = "0px";
        this._htmlElement = document.createElement("div");
        this._htmlElement.style.position = "absolute";
        document.body.appendChild(this._htmlElement);
        this._mouseManager = MouseManager.getInstance();
        this._mouseManager.registerView(this);
        //			if (this._shareContext)
        //				this._mouse3DManager.addViewLayer(this);
    }
    /**
     *
     * @param e
     */
    View.prototype.onScenePartitionChanged = function (event) {
        if (this._pCamera)
            this._pScene.partition._iRegisterCamera(this._pCamera);
    };
    Object.defineProperty(View.prototype, "mouseX", {
        get: function () {
            return this._pMouseX;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "mouseY", {
        get: function () {
            return this._pMouseY;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "htmlElement", {
        /**
         *
         */
        get: function () {
            return this._htmlElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "renderer", {
        /**
         *
         */
        get: function () {
            return this._pRenderer;
        },
        set: function (value) {
            if (this._pRenderer == value)
                return;
            if (this._pRenderer) {
                this._pRenderer.dispose();
                this._pRenderer.removeEventListener(RendererEvent.VIEWPORT_UPDATED, this._onViewportUpdatedDelegate);
                this._pRenderer.removeEventListener(RendererEvent.SCISSOR_UPDATED, this._onScissorUpdatedDelegate);
            }
            this._pRenderer = value;
            this._pRenderer.addEventListener(RendererEvent.VIEWPORT_UPDATED, this._onViewportUpdatedDelegate);
            this._pRenderer.addEventListener(RendererEvent.SCISSOR_UPDATED, this._onScissorUpdatedDelegate);
            //reset entity collector
            this._pEntityCollector = this._pRenderer._iCreateEntityCollector();
            if (this._pCamera)
                this._pEntityCollector.camera = this._pCamera;
            //reset back buffer
            this._pRenderer._iBackgroundR = ((this._backgroundColor >> 16) & 0xff) / 0xff;
            this._pRenderer._iBackgroundG = ((this._backgroundColor >> 8) & 0xff) / 0xff;
            this._pRenderer._iBackgroundB = (this._backgroundColor & 0xff) / 0xff;
            this._pRenderer._iBackgroundAlpha = this._backgroundAlpha;
            this._pRenderer.width = this._width;
            this._pRenderer.height = this._height;
            this._pRenderer.shareContext = this._shareContext;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "shareContext", {
        /**
         *
         */
        get: function () {
            return this._shareContext;
        },
        set: function (value) {
            if (this._shareContext == value)
                return;
            this._shareContext = value;
            if (this._pRenderer)
                this._pRenderer.shareContext = this._shareContext;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "backgroundColor", {
        /**
         *
         */
        get: function () {
            return this._backgroundColor;
        },
        set: function (value) {
            if (this._backgroundColor == value)
                return;
            this._backgroundColor = value;
            this._pRenderer._iBackgroundR = ((value >> 16) & 0xff) / 0xff;
            this._pRenderer._iBackgroundG = ((value >> 8) & 0xff) / 0xff;
            this._pRenderer._iBackgroundB = (value & 0xff) / 0xff;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "backgroundAlpha", {
        /**
         *
         * @returns {number}
         */
        get: function () {
            return this._backgroundAlpha;
        },
        /**
         *
         * @param value
         */
        set: function (value) {
            if (value > 1)
                value = 1;
            else if (value < 0)
                value = 0;
            if (this._backgroundAlpha == value)
                return;
            this._pRenderer._iBackgroundAlpha = this._backgroundAlpha = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "camera", {
        /**
         *
         * @returns {Camera3D}
         */
        get: function () {
            return this._pCamera;
        },
        /**
         * Set camera that's used to render the scene for this viewport
         */
        set: function (value) {
            if (this._pCamera == value)
                return;
            if (this._pCamera)
                this._pCamera.removeEventListener(CameraEvent.PROJECTION_CHANGED, this._onProjectionChangedDelegate);
            this._pCamera = value;
            if (this._pEntityCollector)
                this._pEntityCollector.camera = this._pCamera;
            if (this._pScene)
                this._pScene.partition._iRegisterCamera(this._pCamera);
            this._pCamera.addEventListener(CameraEvent.PROJECTION_CHANGED, this._onProjectionChangedDelegate);
            this._scissorDirty = true;
            this._viewportDirty = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "scene", {
        /**
         *
         * @returns {away.containers.Scene3D}
         */
        get: function () {
            return this._pScene;
        },
        /**
         * Set the scene that's used to render for this viewport
         */
        set: function (value) {
            if (this._pScene == value)
                return;
            if (this._pScene)
                this._pScene.removeEventListener(SceneEvent.PARTITION_CHANGED, this._onScenePartitionChangedDelegate);
            this._pScene = value;
            this._pScene.addEventListener(SceneEvent.PARTITION_CHANGED, this._onScenePartitionChangedDelegate);
            if (this._pCamera)
                this._pScene.partition._iRegisterCamera(this._pCamera);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "deltaTime", {
        /**
         *
         * @returns {number}
         */
        get: function () {
            return this._deltaTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "width", {
        /**
         *
         */
        get: function () {
            return this._width;
        },
        set: function (value) {
            if (this._width == value)
                return;
            this._width = value;
            this._aspectRatio = this._width / this._height;
            this._pCamera.projection._iAspectRatio = this._aspectRatio;
            this._pRenderer.width = value;
            this._htmlElement.style.width = value + "px";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "height", {
        /**
         *
         */
        get: function () {
            return this._height;
        },
        set: function (value) {
            if (this._height == value)
                return;
            this._height = value;
            this._aspectRatio = this._width / this._height;
            this._pCamera.projection._iAspectRatio = this._aspectRatio;
            this._pRenderer.height = value;
            this._htmlElement.style.height = value + "px";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "mousePicker", {
        /**
         *
         */
        get: function () {
            return this._mousePicker;
        },
        set: function (value) {
            if (this._mousePicker == value)
                return;
            if (value == null)
                this._mousePicker = new RaycastPicker();
            else
                this._mousePicker = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "x", {
        /**
         *
         */
        get: function () {
            return this._pRenderer.x;
        },
        set: function (value) {
            if (this._pRenderer.x == value)
                return;
            this._pRenderer.x == value;
            this._htmlElement.style.left = value + "px";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "y", {
        /**
         *
         */
        get: function () {
            return this._pRenderer.y;
        },
        set: function (value) {
            if (this._pRenderer.y == value)
                return;
            this._pRenderer.y == value;
            this._htmlElement.style.top = value + "px";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "visible", {
        /**
         *
         */
        get: function () {
            return (this._htmlElement.style.visibility == "visible");
        },
        set: function (value) {
            this._htmlElement.style.visibility = value ? "visible" : "hidden";
            //TODO transfer visible property to associated context (if one exists)
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "renderedFacesCount", {
        /**
         *
         * @returns {number}
         */
        get: function () {
            return 0; //TODO
            //return this._pEntityCollector._pNumTriangles;//numTriangles;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Renders the view.
     */
    View.prototype.render = function () {
        this.pUpdateTime();
        //update view and size data
        this._pCamera.projection._iAspectRatio = this._aspectRatio;
        if (this._scissorDirty) {
            this._scissorDirty = false;
            this._pCamera.projection._iUpdateScissorRect(this._pRenderer.scissorRect.x, this._pRenderer.scissorRect.y, this._pRenderer.scissorRect.width, this._pRenderer.scissorRect.height);
        }
        if (this._viewportDirty) {
            this._viewportDirty = false;
            this._pCamera.projection._iUpdateViewport(this._pRenderer.viewPort.x, this._pRenderer.viewPort.y, this._pRenderer.viewPort.width, this._pRenderer.viewPort.height);
        }
        // update picking
        if (!this._shareContext) {
            if (this.forceMouseMove && this._htmlElement == this._mouseManager._iActiveDiv && !this._mouseManager._iUpdateDirty)
                this._mouseManager._iCollidingObject = this.mousePicker.getViewCollision(this._pMouseX, this._pMouseY, this);
            this._mouseManager.fireMouseEvents(this.forceMouseMove);
        }
        //_touch3DManager.updateCollider();
        //clear entity collector ready for collection
        this._pEntityCollector.clear();
        // collect stuff to render
        this._pScene.traversePartitions(this._pEntityCollector);
        //render the contents of the entity collector
        this._pRenderer.render(this._pEntityCollector);
    };
    /**
     *
     */
    View.prototype.pUpdateTime = function () {
        var time = getTimer();
        if (this._time == 0)
            this._time = time;
        this._deltaTime = time - this._time;
        this._time = time;
    };
    /**
     *
     */
    View.prototype.dispose = function () {
        this._pRenderer.dispose();
        // TODO: imeplement mouseManager / touch3DManager
        this._mouseManager.unregisterView(this);
        //this._touch3DManager.disableTouchListeners(this);
        //this._touch3DManager.dispose();
        this._mouseManager = null;
        //this._touch3DManager = null;
        this._pRenderer = null;
        this._pEntityCollector = null;
    };
    Object.defineProperty(View.prototype, "iEntityCollector", {
        /**
         *
         */
        get: function () {
            return this._pEntityCollector;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     */
    View.prototype.onProjectionChanged = function (event) {
        this._scissorDirty = true;
        this._viewportDirty = true;
    };
    /**
     *
     */
    View.prototype.onViewportUpdated = function (event) {
        this._viewportDirty = true;
    };
    /**
     *
     */
    View.prototype.onScissorUpdated = function (event) {
        this._scissorDirty = true;
    };
    View.prototype.project = function (point3d) {
        var v = this._pCamera.project(point3d);
        v.x = v.x * this._pRenderer.viewPort.width / 2 + this._width * this._pCamera.projection.originX;
        v.y = v.y * this._pRenderer.viewPort.height / 2 + this._height * this._pCamera.projection.originY;
        return v;
    };
    View.prototype.unproject = function (sX, sY, sZ) {
        return this._pCamera.unproject(2 * (sX - this._width * this._pCamera.projection.originX) / this._pRenderer.viewPort.width, 2 * (sY - this._height * this._pCamera.projection.originY) / this._pRenderer.viewPort.height, sZ);
    };
    View.prototype.getRay = function (sX, sY, sZ) {
        return this._pCamera.getRay((sX * 2 - this._width) / this._width, (sY * 2 - this._height) / this._height, sZ);
    };
    /*TODO: implement Background
     public get background():away.textures.Texture2DBase
     {
     return this._background;
     }
     */
    /*TODO: implement Background
     public set background( value:away.textures.Texture2DBase )
     {
     this._background = value;
     this._renderer.background = _background;
     }
     */
    // TODO: required dependency stageGL
    View.prototype.updateCollider = function () {
        if (!this._shareContext) {
            if (this._htmlElement == this._mouseManager._iActiveDiv)
                this._mouseManager._iCollidingObject = this.mousePicker.getViewCollision(this._pMouseX, this._pMouseY, this);
        }
        else {
            var collidingObject = this.mousePicker.getViewCollision(this._pMouseX, this._pMouseY, this);
            if (this.layeredView || this._mouseManager._iCollidingObject == null || collidingObject.rayEntryDistance < this._mouseManager._iCollidingObject.rayEntryDistance)
                this._mouseManager._iCollidingObject = collidingObject;
        }
    };
    return View;
})();
module.exports = View;


},{"awayjs-core/lib/utils/getTimer":undefined,"awayjs-display/lib/containers/Scene":"awayjs-display/lib/containers/Scene","awayjs-display/lib/entities/Camera":"awayjs-display/lib/entities/Camera","awayjs-display/lib/events/CameraEvent":"awayjs-display/lib/events/CameraEvent","awayjs-display/lib/events/RendererEvent":"awayjs-display/lib/events/RendererEvent","awayjs-display/lib/events/SceneEvent":"awayjs-display/lib/events/SceneEvent","awayjs-display/lib/managers/MouseManager":"awayjs-display/lib/managers/MouseManager","awayjs-display/lib/pick/RaycastPicker":"awayjs-display/lib/pick/RaycastPicker"}],"awayjs-display/lib/controllers/ControllerBase":[function(require,module,exports){
var AbstractMethodError = require("awayjs-core/lib/errors/AbstractMethodError");
var ControllerBase = (function () {
    function ControllerBase(targetObject) {
        if (targetObject === void 0) { targetObject = null; }
        this._pAutoUpdate = true;
        this.targetObject = targetObject;
    }
    ControllerBase.prototype.pNotifyUpdate = function () {
        if (this._pTargetObject && this._pAutoUpdate) {
            this._pTargetObject.invalidatePartition();
        }
    };
    Object.defineProperty(ControllerBase.prototype, "targetObject", {
        get: function () {
            return this._pTargetObject;
        },
        set: function (val) {
            if (this._pTargetObject == val) {
                return;
            }
            if (this._pTargetObject && this._pAutoUpdate) {
                this._pTargetObject._iController = null;
            }
            this._pTargetObject = val;
            if (this._pTargetObject && this._pAutoUpdate) {
                this._pTargetObject._iController = this;
            }
            this.pNotifyUpdate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ControllerBase.prototype, "autoUpdate", {
        get: function () {
            return this._pAutoUpdate;
        },
        set: function (val) {
            if (this._pAutoUpdate == val) {
                return;
            }
            this._pAutoUpdate = val;
            if (this._pTargetObject) {
                if (this._pTargetObject) {
                    this._pTargetObject._iController = this;
                }
                else {
                    this._pTargetObject._iController = null;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    ControllerBase.prototype.update = function (interpolate) {
        if (interpolate === void 0) { interpolate = true; }
        throw new AbstractMethodError();
    };
    return ControllerBase;
})();
module.exports = ControllerBase;


},{"awayjs-core/lib/errors/AbstractMethodError":undefined}],"awayjs-display/lib/controllers/FirstPersonController":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MathConsts = require("awayjs-core/lib/geom/MathConsts");
var ControllerBase = require("awayjs-display/lib/controllers/ControllerBase");
/**
 * Extended camera used to hover round a specified target object.
 *
 * @see    away3d.containers.View3D
 */
var FirstPersonController = (function (_super) {
    __extends(FirstPersonController, _super);
    /**
     * Creates a new <code>HoverController</code> object.
     */
    function FirstPersonController(targetObject, panAngle, tiltAngle, minTiltAngle, maxTiltAngle, steps, wrapPanAngle) {
        if (targetObject === void 0) { targetObject = null; }
        if (panAngle === void 0) { panAngle = 0; }
        if (tiltAngle === void 0) { tiltAngle = 90; }
        if (minTiltAngle === void 0) { minTiltAngle = -90; }
        if (maxTiltAngle === void 0) { maxTiltAngle = 90; }
        if (steps === void 0) { steps = 8; }
        if (wrapPanAngle === void 0) { wrapPanAngle = false; }
        _super.call(this, targetObject);
        this._iCurrentPanAngle = 0;
        this._iCurrentTiltAngle = 90;
        this._panAngle = 0;
        this._tiltAngle = 90;
        this._minTiltAngle = -90;
        this._maxTiltAngle = 90;
        this._steps = 8;
        this._walkIncrement = 0;
        this._strafeIncrement = 0;
        this._wrapPanAngle = false;
        this.fly = false;
        this.panAngle = panAngle;
        this.tiltAngle = tiltAngle;
        this.minTiltAngle = minTiltAngle;
        this.maxTiltAngle = maxTiltAngle;
        this.steps = steps;
        this.wrapPanAngle = wrapPanAngle;
        //values passed in contrustor are applied immediately
        this._iCurrentPanAngle = this._panAngle;
        this._iCurrentTiltAngle = this._tiltAngle;
    }
    Object.defineProperty(FirstPersonController.prototype, "steps", {
        /**
         * Fractional step taken each time the <code>hover()</code> method is called. Defaults to 8.
         *
         * Affects the speed at which the <code>tiltAngle</code> and <code>panAngle</code> resolve to their targets.
         *
         * @see    #tiltAngle
         * @see    #panAngle
         */
        get: function () {
            return this._steps;
        },
        set: function (val) {
            val = (val < 1) ? 1 : val;
            if (this._steps == val)
                return;
            this._steps = val;
            this.pNotifyUpdate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FirstPersonController.prototype, "panAngle", {
        /**
         * Rotation of the camera in degrees around the y axis. Defaults to 0.
         */
        get: function () {
            return this._panAngle;
        },
        set: function (val) {
            if (this._panAngle == val)
                return;
            this._panAngle = val;
            this.pNotifyUpdate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FirstPersonController.prototype, "tiltAngle", {
        /**
         * Elevation angle of the camera in degrees. Defaults to 90.
         */
        get: function () {
            return this._tiltAngle;
        },
        set: function (val) {
            val = Math.max(this._minTiltAngle, Math.min(this._maxTiltAngle, val));
            if (this._tiltAngle == val)
                return;
            this._tiltAngle = val;
            this.pNotifyUpdate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FirstPersonController.prototype, "minTiltAngle", {
        /**
         * Minimum bounds for the <code>tiltAngle</code>. Defaults to -90.
         *
         * @see    #tiltAngle
         */
        get: function () {
            return this._minTiltAngle;
        },
        set: function (val) {
            if (this._minTiltAngle == val)
                return;
            this._minTiltAngle = val;
            this.tiltAngle = Math.max(this._minTiltAngle, Math.min(this._maxTiltAngle, this._tiltAngle));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FirstPersonController.prototype, "maxTiltAngle", {
        /**
         * Maximum bounds for the <code>tiltAngle</code>. Defaults to 90.
         *
         * @see    #tiltAngle
         */
        get: function () {
            return this._maxTiltAngle;
        },
        set: function (val) {
            if (this._maxTiltAngle == val)
                return;
            this._maxTiltAngle = val;
            this.tiltAngle = Math.max(this._minTiltAngle, Math.min(this._maxTiltAngle, this._tiltAngle));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FirstPersonController.prototype, "wrapPanAngle", {
        /**
         * Defines whether the value of the pan angle wraps when over 360 degrees or under 0 degrees. Defaults to false.
         */
        get: function () {
            return this._wrapPanAngle;
        },
        set: function (val) {
            if (this._wrapPanAngle == val)
                return;
            this._wrapPanAngle = val;
            this.pNotifyUpdate();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Updates the current tilt angle and pan angle values.
     *
     * Values are calculated using the defined <code>tiltAngle</code>, <code>panAngle</code> and <code>steps</code> variables.
     *
     * @param interpolate   If the update to a target pan- or tiltAngle is interpolated. Default is true.
     *
     * @see    #tiltAngle
     * @see    #panAngle
     * @see    #steps
     */
    FirstPersonController.prototype.update = function (interpolate) {
        if (interpolate === void 0) { interpolate = true; }
        if (this._tiltAngle != this._iCurrentTiltAngle || this._panAngle != this._iCurrentPanAngle) {
            this.pNotifyUpdate();
            if (this._wrapPanAngle) {
                if (this._panAngle < 0) {
                    this._iCurrentPanAngle += this._panAngle % 360 + 360 - this._panAngle;
                    this._panAngle = this._panAngle % 360 + 360;
                }
                else {
                    this._iCurrentPanAngle += this._panAngle % 360 - this._panAngle;
                    this._panAngle = this._panAngle % 360;
                }
                while (this._panAngle - this._iCurrentPanAngle < -180)
                    this._iCurrentPanAngle -= 360;
                while (this._panAngle - this._iCurrentPanAngle > 180)
                    this._iCurrentPanAngle += 360;
            }
            if (interpolate) {
                this._iCurrentTiltAngle += (this._tiltAngle - this._iCurrentTiltAngle) / (this.steps + 1);
                this._iCurrentPanAngle += (this._panAngle - this._iCurrentPanAngle) / (this.steps + 1);
            }
            else {
                this._iCurrentTiltAngle = this._tiltAngle;
                this._iCurrentPanAngle = this._panAngle;
            }
            //snap coords if angle differences are close
            if ((Math.abs(this.tiltAngle - this._iCurrentTiltAngle) < 0.01) && (Math.abs(this._panAngle - this._iCurrentPanAngle) < 0.01)) {
                this._iCurrentTiltAngle = this._tiltAngle;
                this._iCurrentPanAngle = this._panAngle;
            }
        }
        this.targetObject.rotationX = this._iCurrentTiltAngle;
        this.targetObject.rotationY = this._iCurrentPanAngle;
        if (this._walkIncrement) {
            if (this.fly) {
                this.targetObject.transform.moveForward(this._walkIncrement);
            }
            else {
                this.targetObject.x += this._walkIncrement * Math.sin(this._panAngle * MathConsts.DEGREES_TO_RADIANS);
                this.targetObject.z += this._walkIncrement * Math.cos(this._panAngle * MathConsts.DEGREES_TO_RADIANS);
            }
            this._walkIncrement = 0;
        }
        if (this._strafeIncrement) {
            this.targetObject.transform.moveRight(this._strafeIncrement);
            this._strafeIncrement = 0;
        }
    };
    FirstPersonController.prototype.incrementWalk = function (val) {
        if (val == 0)
            return;
        this._walkIncrement += val;
        this.pNotifyUpdate();
    };
    FirstPersonController.prototype.incrementStrafe = function (val) {
        if (val == 0)
            return;
        this._strafeIncrement += val;
        this.pNotifyUpdate();
    };
    return FirstPersonController;
})(ControllerBase);
module.exports = FirstPersonController;


},{"awayjs-core/lib/geom/MathConsts":undefined,"awayjs-display/lib/controllers/ControllerBase":"awayjs-display/lib/controllers/ControllerBase"}],"awayjs-display/lib/controllers/FollowController":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var HoverController = require("awayjs-display/lib/controllers/HoverController");
/**
 * Controller used to follow behind an object on the XZ plane, with an optional
 * elevation (tiltAngle).
 *
 * @see    away3d.containers.View3D
 */
var FollowController = (function (_super) {
    __extends(FollowController, _super);
    function FollowController(targetObject, lookAtObject, tiltAngle, distance) {
        if (targetObject === void 0) { targetObject = null; }
        if (lookAtObject === void 0) { lookAtObject = null; }
        if (tiltAngle === void 0) { tiltAngle = 45; }
        if (distance === void 0) { distance = 700; }
        _super.call(this, targetObject, lookAtObject, 0, tiltAngle, distance);
    }
    FollowController.prototype.update = function (interpolate) {
        if (interpolate === void 0) { interpolate = true; }
        interpolate = interpolate; // unused: prevents warning
        if (!this.lookAtObject)
            return;
        this.panAngle = this._pLookAtObject.rotationY - 180;
        _super.prototype.update.call(this);
    };
    return FollowController;
})(HoverController);
module.exports = FollowController;


},{"awayjs-display/lib/controllers/HoverController":"awayjs-display/lib/controllers/HoverController"}],"awayjs-display/lib/controllers/HoverController":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MathConsts = require("awayjs-core/lib/geom/MathConsts");
var Vector3D = require("awayjs-core/lib/geom/Vector3D");
var LookAtController = require("awayjs-display/lib/controllers/LookAtController");
/**
 * Extended camera used to hover round a specified target object.
 *
 * @see    away.containers.View
 */
var HoverController = (function (_super) {
    __extends(HoverController, _super);
    /**
     * Creates a new <code>HoverController</code> object.
     */
    function HoverController(targetObject, lookAtObject, panAngle, tiltAngle, distance, minTiltAngle, maxTiltAngle, minPanAngle, maxPanAngle, steps, yFactor, wrapPanAngle) {
        if (targetObject === void 0) { targetObject = null; }
        if (lookAtObject === void 0) { lookAtObject = null; }
        if (panAngle === void 0) { panAngle = 0; }
        if (tiltAngle === void 0) { tiltAngle = 90; }
        if (distance === void 0) { distance = 1000; }
        if (minTiltAngle === void 0) { minTiltAngle = -90; }
        if (maxTiltAngle === void 0) { maxTiltAngle = 90; }
        if (minPanAngle === void 0) { minPanAngle = null; }
        if (maxPanAngle === void 0) { maxPanAngle = null; }
        if (steps === void 0) { steps = 8; }
        if (yFactor === void 0) { yFactor = 2; }
        if (wrapPanAngle === void 0) { wrapPanAngle = false; }
        _super.call(this, targetObject, lookAtObject);
        this._iCurrentPanAngle = 0;
        this._iCurrentTiltAngle = 90;
        this._panAngle = 0;
        this._tiltAngle = 90;
        this._distance = 1000;
        this._minPanAngle = -Infinity;
        this._maxPanAngle = Infinity;
        this._minTiltAngle = -90;
        this._maxTiltAngle = 90;
        this._steps = 8;
        this._yFactor = 2;
        this._wrapPanAngle = false;
        this._upAxis = new Vector3D();
        this.distance = distance;
        this.panAngle = panAngle;
        this.tiltAngle = tiltAngle;
        this.minPanAngle = (minPanAngle != null) ? minPanAngle : -Infinity;
        this.maxPanAngle = (maxPanAngle != null) ? maxPanAngle : Infinity;
        this.minTiltAngle = minTiltAngle;
        this.maxTiltAngle = maxTiltAngle;
        this.steps = steps;
        this.yFactor = yFactor;
        this.wrapPanAngle = wrapPanAngle;
        //values passed in contrustor are applied immediately
        this._iCurrentPanAngle = this._panAngle;
        this._iCurrentTiltAngle = this._tiltAngle;
    }
    Object.defineProperty(HoverController.prototype, "steps", {
        /**
         * Fractional step taken each time the <code>hover()</code> method is called. Defaults to 8.
         *
         * Affects the speed at which the <code>tiltAngle</code> and <code>panAngle</code> resolve to their targets.
         *
         * @see    #tiltAngle
         * @see    #panAngle
         */
        get: function () {
            return this._steps;
        },
        set: function (val) {
            val = (val < 1) ? 1 : val;
            if (this._steps == val)
                return;
            this._steps = val;
            this.pNotifyUpdate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HoverController.prototype, "panAngle", {
        /**
         * Rotation of the camera in degrees around the y axis. Defaults to 0.
         */
        get: function () {
            return this._panAngle;
        },
        set: function (val) {
            val = Math.max(this._minPanAngle, Math.min(this._maxPanAngle, val));
            if (this._panAngle == val)
                return;
            this._panAngle = val;
            this.pNotifyUpdate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HoverController.prototype, "tiltAngle", {
        /**
         * Elevation angle of the camera in degrees. Defaults to 90.
         */
        get: function () {
            return this._tiltAngle;
        },
        set: function (val) {
            val = Math.max(this._minTiltAngle, Math.min(this._maxTiltAngle, val));
            if (this._tiltAngle == val)
                return;
            this._tiltAngle = val;
            this.pNotifyUpdate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HoverController.prototype, "distance", {
        /**
         * Distance between the camera and the specified target. Defaults to 1000.
         */
        get: function () {
            return this._distance;
        },
        set: function (val) {
            if (this._distance == val)
                return;
            this._distance = val;
            this.pNotifyUpdate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HoverController.prototype, "minPanAngle", {
        /**
         * Minimum bounds for the <code>panAngle</code>. Defaults to -Infinity.
         *
         * @see    #panAngle
         */
        get: function () {
            return this._minPanAngle;
        },
        set: function (val) {
            if (this._minPanAngle == val)
                return;
            this._minPanAngle = val;
            this.panAngle = Math.max(this._minPanAngle, Math.min(this._maxPanAngle, this._panAngle));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HoverController.prototype, "maxPanAngle", {
        /**
         * Maximum bounds for the <code>panAngle</code>. Defaults to Infinity.
         *
         * @see    #panAngle
         */
        get: function () {
            return this._maxPanAngle;
        },
        set: function (val) {
            if (this._maxPanAngle == val)
                return;
            this._maxPanAngle = val;
            this.panAngle = Math.max(this._minPanAngle, Math.min(this._maxPanAngle, this._panAngle));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HoverController.prototype, "minTiltAngle", {
        /**
         * Minimum bounds for the <code>tiltAngle</code>. Defaults to -90.
         *
         * @see    #tiltAngle
         */
        get: function () {
            return this._minTiltAngle;
        },
        set: function (val) {
            if (this._minTiltAngle == val)
                return;
            this._minTiltAngle = val;
            this.tiltAngle = Math.max(this._minTiltAngle, Math.min(this._maxTiltAngle, this._tiltAngle));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HoverController.prototype, "maxTiltAngle", {
        /**
         * Maximum bounds for the <code>tiltAngle</code>. Defaults to 90.
         *
         * @see    #tiltAngle
         */
        get: function () {
            return this._maxTiltAngle;
        },
        set: function (val) {
            if (this._maxTiltAngle == val)
                return;
            this._maxTiltAngle = val;
            this.tiltAngle = Math.max(this._minTiltAngle, Math.min(this._maxTiltAngle, this._tiltAngle));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HoverController.prototype, "yFactor", {
        /**
         * Fractional difference in distance between the horizontal camera orientation and vertical camera orientation. Defaults to 2.
         *
         * @see    #distance
         */
        get: function () {
            return this._yFactor;
        },
        set: function (val) {
            if (this._yFactor == val)
                return;
            this._yFactor = val;
            this.pNotifyUpdate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HoverController.prototype, "wrapPanAngle", {
        /**
         * Defines whether the value of the pan angle wraps when over 360 degrees or under 0 degrees. Defaults to false.
         */
        get: function () {
            return this._wrapPanAngle;
        },
        set: function (val) {
            if (this._wrapPanAngle == val)
                return;
            this._wrapPanAngle = val;
            this.pNotifyUpdate();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Updates the current tilt angle and pan angle values.
     *
     * Values are calculated using the defined <code>tiltAngle</code>, <code>panAngle</code> and <code>steps</code> variables.
     *
     * @param interpolate   If the update to a target pan- or tiltAngle is interpolated. Default is true.
     *
     * @see    #tiltAngle
     * @see    #panAngle
     * @see    #steps
     */
    HoverController.prototype.update = function (interpolate) {
        if (interpolate === void 0) { interpolate = true; }
        if (this._tiltAngle != this._iCurrentTiltAngle || this._panAngle != this._iCurrentPanAngle) {
            this.pNotifyUpdate();
            if (this._wrapPanAngle) {
                if (this._panAngle < 0) {
                    this._iCurrentPanAngle += this._panAngle % 360 + 360 - this._panAngle;
                    this._panAngle = this._panAngle % 360 + 360;
                }
                else {
                    this._iCurrentPanAngle += this._panAngle % 360 - this._panAngle;
                    this._panAngle = this._panAngle % 360;
                }
                while (this._panAngle - this._iCurrentPanAngle < -180)
                    this._iCurrentPanAngle -= 360;
                while (this._panAngle - this._iCurrentPanAngle > 180)
                    this._iCurrentPanAngle += 360;
            }
            if (interpolate) {
                this._iCurrentTiltAngle += (this._tiltAngle - this._iCurrentTiltAngle) / (this.steps + 1);
                this._iCurrentPanAngle += (this._panAngle - this._iCurrentPanAngle) / (this.steps + 1);
            }
            else {
                this._iCurrentPanAngle = this._panAngle;
                this._iCurrentTiltAngle = this._tiltAngle;
            }
            //snap coords if angle differences are close
            if ((Math.abs(this.tiltAngle - this._iCurrentTiltAngle) < 0.01) && (Math.abs(this._panAngle - this._iCurrentPanAngle) < 0.01)) {
                this._iCurrentTiltAngle = this._tiltAngle;
                this._iCurrentPanAngle = this._panAngle;
            }
        }
        var pos = (this.lookAtObject) ? this.lookAtObject.transform.position : (this.lookAtPosition) ? this.lookAtPosition : this._pOrigin;
        this.targetObject.x = pos.x + this.distance * Math.sin(this._iCurrentPanAngle * MathConsts.DEGREES_TO_RADIANS) * Math.cos(this._iCurrentTiltAngle * MathConsts.DEGREES_TO_RADIANS);
        this.targetObject.y = pos.y + this.distance * Math.sin(this._iCurrentTiltAngle * MathConsts.DEGREES_TO_RADIANS) * this.yFactor;
        this.targetObject.z = pos.z + this.distance * Math.cos(this._iCurrentPanAngle * MathConsts.DEGREES_TO_RADIANS) * Math.cos(this._iCurrentTiltAngle * MathConsts.DEGREES_TO_RADIANS);
        this._upAxis.x = -Math.sin(this._iCurrentPanAngle * MathConsts.DEGREES_TO_RADIANS) * Math.sin(this._iCurrentTiltAngle * MathConsts.DEGREES_TO_RADIANS);
        this._upAxis.y = Math.cos(this._iCurrentTiltAngle * MathConsts.DEGREES_TO_RADIANS);
        this._upAxis.z = -Math.cos(this._iCurrentPanAngle * MathConsts.DEGREES_TO_RADIANS) * Math.sin(this._iCurrentTiltAngle * MathConsts.DEGREES_TO_RADIANS);
        if (this._pTargetObject) {
            if (this._pLookAtPosition)
                this._pTargetObject.lookAt(this._pLookAtPosition, this._upAxis);
            else if (this._pLookAtObject)
                this._pTargetObject.lookAt(this._pLookAtObject.scene ? this._pLookAtObject.scenePosition : this._pLookAtObject.transform.position, this._upAxis);
        }
    };
    return HoverController;
})(LookAtController);
module.exports = HoverController;


},{"awayjs-core/lib/geom/MathConsts":undefined,"awayjs-core/lib/geom/Vector3D":undefined,"awayjs-display/lib/controllers/LookAtController":"awayjs-display/lib/controllers/LookAtController"}],"awayjs-display/lib/controllers/LookAtController":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Vector3D = require("awayjs-core/lib/geom/Vector3D");
var ControllerBase = require("awayjs-display/lib/controllers/ControllerBase");
var DisplayObjectEvent = require("awayjs-display/lib/events/DisplayObjectEvent");
var LookAtController = (function (_super) {
    __extends(LookAtController, _super);
    function LookAtController(targetObject, lookAtObject) {
        var _this = this;
        if (targetObject === void 0) { targetObject = null; }
        if (lookAtObject === void 0) { lookAtObject = null; }
        _super.call(this, targetObject);
        this._pOrigin = new Vector3D(0.0, 0.0, 0.0);
        this._onLookAtObjectChangedDelegate = function (event) { return _this.onLookAtObjectChanged(event); };
        if (lookAtObject)
            this.lookAtObject = lookAtObject;
        else
            this.lookAtPosition = new Vector3D();
    }
    Object.defineProperty(LookAtController.prototype, "lookAtPosition", {
        get: function () {
            return this._pLookAtPosition;
        },
        set: function (val) {
            if (this._pLookAtObject) {
                this._pLookAtObject.removeEventListener(DisplayObjectEvent.SCENETRANSFORM_CHANGED, this._onLookAtObjectChangedDelegate);
                this._pLookAtObject = null;
            }
            this._pLookAtPosition = val;
            this.pNotifyUpdate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LookAtController.prototype, "lookAtObject", {
        get: function () {
            return this._pLookAtObject;
        },
        set: function (val) {
            if (this._pLookAtPosition)
                this._pLookAtPosition = null;
            if (this._pLookAtObject == val)
                return;
            if (this._pLookAtObject)
                this._pLookAtObject.removeEventListener(DisplayObjectEvent.SCENETRANSFORM_CHANGED, this._onLookAtObjectChangedDelegate);
            this._pLookAtObject = val;
            if (this._pLookAtObject)
                this._pLookAtObject.addEventListener(DisplayObjectEvent.SCENETRANSFORM_CHANGED, this._onLookAtObjectChangedDelegate);
            this.pNotifyUpdate();
        },
        enumerable: true,
        configurable: true
    });
    //@override
    LookAtController.prototype.update = function (interpolate) {
        if (interpolate === void 0) { interpolate = true; }
        if (this._pTargetObject) {
            if (this._pLookAtPosition)
                this._pTargetObject.lookAt(this._pLookAtPosition);
            else if (this._pLookAtObject)
                this._pTargetObject.lookAt(this._pLookAtObject.scene ? this._pLookAtObject.scenePosition : this._pLookAtObject.transform.position);
        }
    };
    LookAtController.prototype.onLookAtObjectChanged = function (event) {
        this.pNotifyUpdate();
    };
    return LookAtController;
})(ControllerBase);
module.exports = LookAtController;


},{"awayjs-core/lib/geom/Vector3D":undefined,"awayjs-display/lib/controllers/ControllerBase":"awayjs-display/lib/controllers/ControllerBase","awayjs-display/lib/events/DisplayObjectEvent":"awayjs-display/lib/events/DisplayObjectEvent"}],"awayjs-display/lib/controllers/SpringController":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Vector3D = require("awayjs-core/lib/geom/Vector3D");
var LookAtController = require("awayjs-display/lib/controllers/LookAtController");
/**
 * Uses spring physics to animate the target object towards a position that is
 * defined as the lookAtTarget object's position plus the vector defined by the
 * positionOffset property.
 */
var SpringController = (function (_super) {
    __extends(SpringController, _super);
    function SpringController(targetObject, lookAtObject, stiffness, mass, damping) {
        if (targetObject === void 0) { targetObject = null; }
        if (lookAtObject === void 0) { lookAtObject = null; }
        if (stiffness === void 0) { stiffness = 1; }
        if (mass === void 0) { mass = 40; }
        if (damping === void 0) { damping = 4; }
        _super.call(this, targetObject, lookAtObject);
        /**
         * Offset of spring center from target in target object space, ie: Where the camera should ideally be in the target object space.
         */
        this.positionOffset = new Vector3D(0, 500, -1000);
        this.stiffness = stiffness;
        this.damping = damping;
        this.mass = mass;
        this._velocity = new Vector3D();
        this._dv = new Vector3D();
        this._stretch = new Vector3D();
        this._force = new Vector3D();
        this._acceleration = new Vector3D();
        this._desiredPosition = new Vector3D();
    }
    SpringController.prototype.update = function (interpolate) {
        if (interpolate === void 0) { interpolate = true; }
        var offs;
        if (!this._pLookAtObject || !this._pTargetObject)
            return;
        offs = this._pLookAtObject.transform.matrix3D.deltaTransformVector(this.positionOffset);
        this._desiredPosition.x = this._pLookAtObject.x + offs.x;
        this._desiredPosition.y = this._pLookAtObject.y + offs.y;
        this._desiredPosition.z = this._pLookAtObject.z + offs.z;
        this._stretch = this._pTargetObject.transform.position.add(this._desiredPosition);
        this._stretch.scaleBy(-this.stiffness);
        this._dv.copyFrom(this._velocity);
        this._dv.scaleBy(this.damping);
        this._force.x = this._stretch.x - this._dv.x;
        this._force.y = this._stretch.y - this._dv.y;
        this._force.z = this._stretch.z - this._dv.z;
        this._acceleration.copyFrom(this._force);
        this._acceleration.scaleBy(1 / this.mass);
        this._velocity.incrementBy(this._acceleration);
        this._pTargetObject.transform.position = this._pTargetObject.transform.position.add(this._velocity);
        _super.prototype.update.call(this);
    };
    return SpringController;
})(LookAtController);
module.exports = SpringController;


},{"awayjs-core/lib/geom/Vector3D":undefined,"awayjs-display/lib/controllers/LookAtController":"awayjs-display/lib/controllers/LookAtController"}],"awayjs-display/lib/draw/CapsStyle":[function(require,module,exports){
/**
 * The CapsStyle class is an enumeration of constant values that specify the
 * caps style to use in drawing lines. The constants are provided for use as
 * values in the <code>caps</code> parameter of the
 * <code>flash.display.Graphics.lineStyle()</code> method. You can specify the
 * following three types of caps:
 */
var CapsStyle = (function () {
    function CapsStyle() {
    }
    /**
     * Used to specify round caps in the <code>caps</code> parameter of the
     * <code>flash.display.Graphics.lineStyle()</code> method.
     */
    CapsStyle.ROUND = "round";
    /**
     * Used to specify no caps in the <code>caps</code> parameter of the
     * <code>flash.display.Graphics.lineStyle()</code> method.
     */
    CapsStyle.NONE = "none";
    /**
     * Used to specify square caps in the <code>caps</code> parameter of the
     * <code>flash.display.Graphics.lineStyle()</code> method.
     */
    CapsStyle.SQUARE = "square";
    return CapsStyle;
})();
module.exports = CapsStyle;


},{}],"awayjs-display/lib/draw/GradientType":[function(require,module,exports){
/**
 * The GradientType class provides values for the <code>type</code> parameter
 * in the <code>beginGradientFill()</code> and
 * <code>lineGradientStyle()</code> methods of the flash.display.Graphics
 * class.
 */
var GradientType = (function () {
    function GradientType() {
    }
    /**
     * Value used to specify a linear gradient fill.
     */
    GradientType.LINEAR = "linear";
    /**
     * Value used to specify a radial gradient fill.
     */
    GradientType.RADIAL = "radial";
    return GradientType;
})();
module.exports = GradientType;


},{}],"awayjs-display/lib/draw/GraphicsPathWinding":[function(require,module,exports){
/**
 * The GraphicsPathWinding class provides values for the
 * <code>flash.display.GraphicsPath.winding</code> property and the
 * <code>flash.display.Graphics.drawPath()</code> method to determine the
 * direction to draw a path. A clockwise path is positively wound, and a
 * counter-clockwise path is negatively wound:
 *
 * <p> When paths intersect or overlap, the winding direction determines the
 * rules for filling the areas created by the intersection or overlap:</p>
 */
var GraphicsPathWinding = (function () {
    function GraphicsPathWinding() {
    }
    GraphicsPathWinding.EVEN_ODD = "evenOdd";
    GraphicsPathWinding.NON_ZERO = "nonZero";
    return GraphicsPathWinding;
})();
module.exports = GraphicsPathWinding;


},{}],"awayjs-display/lib/draw/Graphics":[function(require,module,exports){
/**
 * The Graphics class contains a set of methods that you can use to create a
 * vector shape. Display objects that support drawing include Sprite and Shape
 * objects. Each of these classes includes a <code>graphics</code> property
 * that is a Graphics object. The following are among those helper functions
 * provided for ease of use: <code>drawRect()</code>,
 * <code>drawRoundRect()</code>, <code>drawCircle()</code>, and
 * <code>drawEllipse()</code>.
 *
 * <p>You cannot create a Graphics object directly from ActionScript code. If
 * you call <code>new Graphics()</code>, an exception is thrown.</p>
 *
 * <p>The Graphics class is final; it cannot be subclassed.</p>
 */
var Graphics = (function () {
    function Graphics() {
    }
    /**
     * Fills a drawing area with a bitmap image. The bitmap can be repeated or
     * tiled to fill the area. The fill remains in effect until you call the
     * <code>beginFill()</code>, <code>beginBitmapFill()</code>,
     * <code>beginGradientFill()</code>, or <code>beginShaderFill()</code>
     * method. Calling the <code>clear()</code> method clears the fill.
     *
     * <p>The application renders the fill whenever three or more points are
     * drawn, or when the <code>endFill()</code> method is called. </p>
     *
     * @param bitmap A transparent or opaque bitmap image that contains the bits
     *               to be displayed.
     * @param matrix A matrix object(of the flash.geom.Matrix class), which you
     *               can use to define transformations on the bitmap. For
     *               example, you can use the following matrix to rotate a bitmap
     *               by 45 degrees(pi/4 radians):
     * @param repeat If <code>true</code>, the bitmap image repeats in a tiled
     *               pattern. If <code>false</code>, the bitmap image does not
     *               repeat, and the edges of the bitmap are used for any fill
     *               area that extends beyond the bitmap.
     *
     *               <p>For example, consider the following bitmap(a 20 x
     *               20-pixel checkerboard pattern):</p>
     *
     *               <p>When <code>repeat</code> is set to <code>true</code>(as
     *               in the following example), the bitmap fill repeats the
     *               bitmap:</p>
     *
     *               <p>When <code>repeat</code> is set to <code>false</code>,
     *               the bitmap fill uses the edge pixels for the fill area
     *               outside the bitmap:</p>
     * @param smooth If <code>false</code>, upscaled bitmap images are rendered
     *               by using a nearest-neighbor algorithm and look pixelated. If
     *               <code>true</code>, upscaled bitmap images are rendered by
     *               using a bilinear algorithm. Rendering by using the nearest
     *               neighbor algorithm is faster.
     */
    Graphics.prototype.beginBitmapFill = function (bitmap, matrix, repeat, smooth) {
        if (matrix === void 0) { matrix = null; }
        if (repeat === void 0) { repeat = true; }
        if (smooth === void 0) { smooth = false; }
    };
    /**
     * Specifies a simple one-color fill that subsequent calls to other Graphics
     * methods(such as <code>lineTo()</code> or <code>drawCircle()</code>) use
     * when drawing. The fill remains in effect until you call the
     * <code>beginFill()</code>, <code>beginBitmapFill()</code>,
     * <code>beginGradientFill()</code>, or <code>beginShaderFill()</code>
     * method. Calling the <code>clear()</code> method clears the fill.
     *
     * <p>The application renders the fill whenever three or more points are
     * drawn, or when the <code>endFill()</code> method is called.</p>
     *
     * @param color The color of the fill(0xRRGGBB).
     * @param alpha The alpha value of the fill(0.0 to 1.0).
     */
    Graphics.prototype.beginFill = function (color /*int*/, alpha) {
        if (alpha === void 0) { alpha = 1; }
    };
    /**
     * Specifies a gradient fill used by subsequent calls to other Graphics
     * methods(such as <code>lineTo()</code> or <code>drawCircle()</code>) for
     * the object. The fill remains in effect until you call the
     * <code>beginFill()</code>, <code>beginBitmapFill()</code>,
     * <code>beginGradientFill()</code>, or <code>beginShaderFill()</code>
     * method. Calling the <code>clear()</code> method clears the fill.
     *
     * <p>The application renders the fill whenever three or more points are
     * drawn, or when the <code>endFill()</code> method is called. </p>
     *
     * @param type                A value from the GradientType class that
     *                            specifies which gradient type to use:
     *                            <code>GradientType.LINEAR</code> or
     *                            <code>GradientType.RADIAL</code>.
     * @param colors              An array of RGB hexadecimal color values used
     *                            in the gradient; for example, red is 0xFF0000,
     *                            blue is 0x0000FF, and so on. You can specify
     *                            up to 15 colors. For each color, specify a
     *                            corresponding value in the alphas and ratios
     *                            parameters.
     * @param alphas              An array of alpha values for the corresponding
     *                            colors in the colors array; valid values are 0
     *                            to 1. If the value is less than 0, the default
     *                            is 0. If the value is greater than 1, the
     *                            default is 1.
     * @param ratios              An array of color distribution ratios; valid
     *                            values are 0-255. This value defines the
     *                            percentage of the width where the color is
     *                            sampled at 100%. The value 0 represents the
     *                            left position in the gradient box, and 255
     *                            represents the right position in the gradient
     *                            box.
     * @param matrix              A transformation matrix as defined by the
     *                            flash.geom.Matrix class. The flash.geom.Matrix
     *                            class includes a
     *                            <code>createGradientBox()</code> method, which
     *                            lets you conveniently set up the matrix for use
     *                            with the <code>beginGradientFill()</code>
     *                            method.
     * @param spreadMethod        A value from the SpreadMethod class that
     *                            specifies which spread method to use, either:
     *                            <code>SpreadMethod.PAD</code>,
     *                            <code>SpreadMethod.REFLECT</code>, or
     *                            <code>SpreadMethod.REPEAT</code>.
     *
     *                            <p>For example, consider a simple linear
     *                            gradient between two colors:</p>
     *
     *                            <p>This example uses
     *                            <code>SpreadMethod.PAD</code> for the spread
     *                            method, and the gradient fill looks like the
     *                            following:</p>
     *
     *                            <p>If you use <code>SpreadMethod.REFLECT</code>
     *                            for the spread method, the gradient fill looks
     *                            like the following:</p>
     *
     *                            <p>If you use <code>SpreadMethod.REPEAT</code>
     *                            for the spread method, the gradient fill looks
     *                            like the following:</p>
     * @param interpolationMethod A value from the InterpolationMethod class that
     *                            specifies which value to use:
     *                            <code>InterpolationMethod.LINEAR_RGB</code> or
     *                            <code>InterpolationMethod.RGB</code>
     *
     *                            <p>For example, consider a simple linear
     *                            gradient between two colors(with the
     *                            <code>spreadMethod</code> parameter set to
     *                            <code>SpreadMethod.REFLECT</code>). The
     *                            different interpolation methods affect the
     *                            appearance as follows: </p>
     * @param focalPointRatio     A number that controls the location of the
     *                            focal point of the gradient. 0 means that the
     *                            focal point is in the center. 1 means that the
     *                            focal point is at one border of the gradient
     *                            circle. -1 means that the focal point is at the
     *                            other border of the gradient circle. A value
     *                            less than -1 or greater than 1 is rounded to -1
     *                            or 1. For example, the following example shows
     *                            a <code>focalPointRatio</code> set to 0.75:
     * @throws ArgumentError If the <code>type</code> parameter is not valid.
     */
    Graphics.prototype.beginGradientFill = function (type, colors, alphas, ratios, matrix, spreadMethod, interpolationMethod, focalPointRatio) {
        if (matrix === void 0) { matrix = null; }
        if (spreadMethod === void 0) { spreadMethod = "pad"; }
        if (interpolationMethod === void 0) { interpolationMethod = "rgb"; }
        if (focalPointRatio === void 0) { focalPointRatio = 0; }
    };
    /**
     * Specifies a shader fill used by subsequent calls to other Graphics methods
     * (such as <code>lineTo()</code> or <code>drawCircle()</code>) for the
     * object. The fill remains in effect until you call the
     * <code>beginFill()</code>, <code>beginBitmapFill()</code>,
     * <code>beginGradientFill()</code>, or <code>beginShaderFill()</code>
     * method. Calling the <code>clear()</code> method clears the fill.
     *
     * <p>The application renders the fill whenever three or more points are
     * drawn, or when the <code>endFill()</code> method is called.</p>
     *
     * <p>Shader fills are not supported under GPU rendering; filled areas will
     * be colored cyan.</p>
     *
     * @param shader The shader to use for the fill. This Shader instance is not
     *               required to specify an image input. However, if an image
     *               input is specified in the shader, the input must be provided
     *               manually. To specify the input, set the <code>input</code>
     *               property of the corresponding ShaderInput property of the
     *               <code>Shader.data</code> property.
     *
     *               <p>When you pass a Shader instance as an argument the shader
     *               is copied internally. The drawing fill operation uses that
     *               internal copy, not a reference to the original shader. Any
     *               changes made to the shader, such as changing a parameter
     *               value, input, or bytecode, are not applied to the copied
     *               shader that's used for the fill.</p>
     * @param matrix A matrix object(of the flash.geom.Matrix class), which you
     *               can use to define transformations on the shader. For
     *               example, you can use the following matrix to rotate a shader
     *               by 45 degrees(pi/4 radians):
     *
     *               <p>The coordinates received in the shader are based on the
     *               matrix that is specified for the <code>matrix</code>
     *               parameter. For a default(<code>null</code>) matrix, the
     *               coordinates in the shader are local pixel coordinates which
     *               can be used to sample an input.</p>
     * @throws ArgumentError When the shader output type is not compatible with
     *                       this operation(the shader must specify a
     *                       <code>pixel3</code> or <code>pixel4</code> output).
     * @throws ArgumentError When the shader specifies an image input that isn't
     *                       provided.
     * @throws ArgumentError When a ByteArray or Vector.<Number> instance is used
     *                       as an input and the <code>width</code> and
     *                       <code>height</code> properties aren't specified for
     *                       the ShaderInput, or the specified values don't match
     *                       the amount of data in the input object. See the
     *                       <code>ShaderInput.input</code> property for more
     *                       information.
     */
    //		public beginShaderFill(shader:Shader, matrix:Matrix = null)
    //		{
    //
    //		}
    /**
     * Clears the graphics that were drawn to this Graphics object, and resets
     * fill and line style settings.
     *
     */
    Graphics.prototype.clear = function () {
    };
    /**
     * Copies all of drawing commands from the source Graphics object into the
     * calling Graphics object.
     *
     * @param sourceGraphics The Graphics object from which to copy the drawing
     *                       commands.
     */
    Graphics.prototype.copyFrom = function (sourceGraphics) {
    };
    /**
     * Draws a cubic Bezier curve from the current drawing position to the
     * specified anchor point. Cubic Bezier curves consist of two anchor points
     * and two control points. The curve interpolates the two anchor points and
     * curves toward the two control points.
     *
     * The four points you use to draw a cubic Bezier curve with the
     * <code>cubicCurveTo()</code> method are as follows:
     *
     * <ul>
     *   <li>The current drawing position is the first anchor point. </li>
     *   <li>The anchorX and anchorY parameters specify the second anchor point.
     *   </li>
     *   <li>The <code>controlX1</code> and <code>controlY1</code> parameters
     *   specify the first control point.</li>
     *   <li>The <code>controlX2</code> and <code>controlY2</code> parameters
     *   specify the second control point.</li>
     * </ul>
     *
     * If you call the <code>cubicCurveTo()</code> method before calling the
     * <code>moveTo()</code> method, your curve starts at position (0, 0).
     *
     * If the <code>cubicCurveTo()</code> method succeeds, the Flash runtime sets
     * the current drawing position to (<code>anchorX</code>,
     * <code>anchorY</code>). If the <code>cubicCurveTo()</code> method fails,
     * the current drawing position remains unchanged.
     *
     * If your movie clip contains content created with the Flash drawing tools,
     * the results of calls to the <code>cubicCurveTo()</code> method are drawn
     * underneath that content.
     *
     * @param controlX1 Specifies the horizontal position of the first control
     *                  point relative to the registration point of the parent
     *                  display object.
     * @param controlY1 Specifies the vertical position of the first control
     *                  point relative to the registration point of the parent
     *                  display object.
     * @param controlX2 Specifies the horizontal position of the second control
     *                  point relative to the registration point of the parent
     *                  display object.
     * @param controlY2 Specifies the vertical position of the second control
     *                  point relative to the registration point of the parent
     *                  display object.
     * @param anchorX   Specifies the horizontal position of the anchor point
     *                  relative to the registration point of the parent display
     *                  object.
     * @param anchorY   Specifies the vertical position of the anchor point
     *                  relative to the registration point of the parent display
     *                  object.
     */
    Graphics.prototype.cubicCurveTo = function (controlX1, controlY1, controlX2, controlY2, anchorX, anchorY) {
    };
    /**
     * Draws a curve using the current line style from the current drawing
     * position to(anchorX, anchorY) and using the control point that
     * (<code>controlX</code>, <code>controlY</code>) specifies. The current
     * drawing position is then set to(<code>anchorX</code>,
     * <code>anchorY</code>). If the movie clip in which you are drawing contains
     * content created with the Flash drawing tools, calls to the
     * <code>curveTo()</code> method are drawn underneath this content. If you
     * call the <code>curveTo()</code> method before any calls to the
     * <code>moveTo()</code> method, the default of the current drawing position
     * is(0, 0). If any of the parameters are missing, this method fails and the
     * current drawing position is not changed.
     *
     * <p>The curve drawn is a quadratic Bezier curve. Quadratic Bezier curves
     * consist of two anchor points and one control point. The curve interpolates
     * the two anchor points and curves toward the control point. </p>
     *
     * @param controlX A number that specifies the horizontal position of the
     *                 control point relative to the registration point of the
     *                 parent display object.
     * @param controlY A number that specifies the vertical position of the
     *                 control point relative to the registration point of the
     *                 parent display object.
     * @param anchorX  A number that specifies the horizontal position of the
     *                 next anchor point relative to the registration point of
     *                 the parent display object.
     * @param anchorY  A number that specifies the vertical position of the next
     *                 anchor point relative to the registration point of the
     *                 parent display object.
     */
    Graphics.prototype.curveTo = function (controlX, controlY, anchorX, anchorY) {
    };
    /**
     * Draws a circle. Set the line style, fill, or both before you call the
     * <code>drawCircle()</code> method, by calling the <code>linestyle()</code>,
     * <code>lineGradientStyle()</code>, <code>beginFill()</code>,
     * <code>beginGradientFill()</code>, or <code>beginBitmapFill()</code>
     * method.
     *
     * @param x      The <i>x</i> location of the center of the circle relative
     *               to the registration point of the parent display object(in
     *               pixels).
     * @param y      The <i>y</i> location of the center of the circle relative
     *               to the registration point of the parent display object(in
     *               pixels).
     * @param radius The radius of the circle(in pixels).
     */
    Graphics.prototype.drawCircle = function (x, y, radius) {
    };
    /**
     * Draws an ellipse. Set the line style, fill, or both before you call the
     * <code>drawEllipse()</code> method, by calling the
     * <code>linestyle()</code>, <code>lineGradientStyle()</code>,
     * <code>beginFill()</code>, <code>beginGradientFill()</code>, or
     * <code>beginBitmapFill()</code> method.
     *
     * @param x      The <i>x</i> location of the top-left of the bounding-box of
     *               the ellipse relative to the registration point of the parent
     *               display object(in pixels).
     * @param y      The <i>y</i> location of the top left of the bounding-box of
     *               the ellipse relative to the registration point of the parent
     *               display object(in pixels).
     * @param width  The width of the ellipse(in pixels).
     * @param height The height of the ellipse(in pixels).
     */
    Graphics.prototype.drawEllipse = function (x, y, width, height) {
    };
    /**
     * Submits a series of IGraphicsData instances for drawing. This method
     * accepts a Vector containing objects including paths, fills, and strokes
     * that implement the IGraphicsData interface. A Vector of IGraphicsData
     * instances can refer to a part of a shape, or a complex fully defined set
     * of data for rendering a complete shape.
     *
     * <p> Graphics paths can contain other graphics paths. If the
     * <code>graphicsData</code> Vector includes a path, that path and all its
     * sub-paths are rendered during this operation. </p>
     *
     */
    Graphics.prototype.drawGraphicsData = function (graphicsData) {
    };
    /**
     * Submits a series of commands for drawing. The <code>drawPath()</code>
     * method uses vector arrays to consolidate individual <code>moveTo()</code>,
     * <code>lineTo()</code>, and <code>curveTo()</code> drawing commands into a
     * single call. The <code>drawPath()</code> method parameters combine drawing
     * commands with x- and y-coordinate value pairs and a drawing direction. The
     * drawing commands are values from the GraphicsPathCommand class. The x- and
     * y-coordinate value pairs are Numbers in an array where each pair defines a
     * coordinate location. The drawing direction is a value from the
     * GraphicsPathWinding class.
     *
     * <p> Generally, drawings render faster with <code>drawPath()</code> than
     * with a series of individual <code>lineTo()</code> and
     * <code>curveTo()</code> methods. </p>
     *
     * <p> The <code>drawPath()</code> method uses a uses a floating computation
     * so rotation and scaling of shapes is more accurate and gives better
     * results. However, curves submitted using the <code>drawPath()</code>
     * method can have small sub-pixel alignment errors when used in conjunction
     * with the <code>lineTo()</code> and <code>curveTo()</code> methods. </p>
     *
     * <p> The <code>drawPath()</code> method also uses slightly different rules
     * for filling and drawing lines. They are: </p>
     *
     * <ul>
     *   <li>When a fill is applied to rendering a path:
     * <ul>
     *   <li>A sub-path of less than 3 points is not rendered.(But note that the
     * stroke rendering will still occur, consistent with the rules for strokes
     * below.)</li>
     *   <li>A sub-path that isn't closed(the end point is not equal to the
     * begin point) is implicitly closed.</li>
     * </ul>
     * </li>
     *   <li>When a stroke is applied to rendering a path:
     * <ul>
     *   <li>The sub-paths can be composed of any number of points.</li>
     *   <li>The sub-path is never implicitly closed.</li>
     * </ul>
     * </li>
     * </ul>
     *
     * @param winding Specifies the winding rule using a value defined in the
     *                GraphicsPathWinding class.
     */
    Graphics.prototype.drawPath = function (commands, data, winding) {
    };
    /**
     * Draws a rectangle. Set the line style, fill, or both before you call the
     * <code>drawRect()</code> method, by calling the <code>linestyle()</code>,
     * <code>lineGradientStyle()</code>, <code>beginFill()</code>,
     * <code>beginGradientFill()</code>, or <code>beginBitmapFill()</code>
     * method.
     *
     * @param x      A number indicating the horizontal position relative to the
     *               registration point of the parent display object(in pixels).
     * @param y      A number indicating the vertical position relative to the
     *               registration point of the parent display object(in pixels).
     * @param width  The width of the rectangle(in pixels).
     * @param height The height of the rectangle(in pixels).
     * @throws ArgumentError If the <code>width</code> or <code>height</code>
     *                       parameters are not a number
     *                      (<code>Number.NaN</code>).
     */
    Graphics.prototype.drawRect = function (x, y, width, height) {
    };
    /**
     * Draws a rounded rectangle. Set the line style, fill, or both before you
     * call the <code>drawRoundRect()</code> method, by calling the
     * <code>linestyle()</code>, <code>lineGradientStyle()</code>,
     * <code>beginFill()</code>, <code>beginGradientFill()</code>, or
     * <code>beginBitmapFill()</code> method.
     *
     * @param x             A number indicating the horizontal position relative
     *                      to the registration point of the parent display
     *                      object(in pixels).
     * @param y             A number indicating the vertical position relative to
     *                      the registration point of the parent display object
     *                     (in pixels).
     * @param width         The width of the round rectangle(in pixels).
     * @param height        The height of the round rectangle(in pixels).
     * @param ellipseWidth  The width of the ellipse used to draw the rounded
     *                      corners(in pixels).
     * @param ellipseHeight The height of the ellipse used to draw the rounded
     *                      corners(in pixels). Optional; if no value is
     *                      specified, the default value matches that provided
     *                      for the <code>ellipseWidth</code> parameter.
     * @throws ArgumentError If the <code>width</code>, <code>height</code>,
     *                       <code>ellipseWidth</code> or
     *                       <code>ellipseHeight</code> parameters are not a
     *                       number(<code>Number.NaN</code>).
     */
    Graphics.prototype.drawRoundRect = function (x, y, width, height, ellipseWidth, ellipseHeight) {
        if (ellipseHeight === void 0) { ellipseHeight = NaN; }
    };
    //public drawRoundRectComplex(x:Float, y:Float, width:Float, height:Float, topLeftRadius:Float, topRightRadius:Float, bottomLeftRadius:Float, bottomRightRadius:Float):Void;
    /**
     * Renders a set of triangles, typically to distort bitmaps and give them a
     * three-dimensional appearance. The <code>drawTriangles()</code> method maps
     * either the current fill, or a bitmap fill, to the triangle faces using a
     * set of(u,v) coordinates.
     *
     * <p> Any type of fill can be used, but if the fill has a transform matrix
     * that transform matrix is ignored. </p>
     *
     * <p> A <code>uvtData</code> parameter improves texture mapping when a
     * bitmap fill is used. </p>
     *
     * @param culling Specifies whether to render triangles that face in a
     *                specified direction. This parameter prevents the rendering
     *                of triangles that cannot be seen in the current view. This
     *                parameter can be set to any value defined by the
     *                TriangleCulling class.
     */
    Graphics.prototype.drawTriangles = function (vertices, indices, uvtData, culling) {
        if (indices === void 0) { indices = null; }
        if (uvtData === void 0) { uvtData = null; }
        if (culling === void 0) { culling = null; }
    };
    /**
     * Applies a fill to the lines and curves that were added since the last call
     * to the <code>beginFill()</code>, <code>beginGradientFill()</code>, or
     * <code>beginBitmapFill()</code> method. Flash uses the fill that was
     * specified in the previous call to the <code>beginFill()</code>,
     * <code>beginGradientFill()</code>, or <code>beginBitmapFill()</code>
     * method. If the current drawing position does not equal the previous
     * position specified in a <code>moveTo()</code> method and a fill is
     * defined, the path is closed with a line and then filled.
     *
     */
    Graphics.prototype.endFill = function () {
    };
    /**
     * Specifies a bitmap to use for the line stroke when drawing lines.
     *
     * <p>The bitmap line style is used for subsequent calls to Graphics methods
     * such as the <code>lineTo()</code> method or the <code>drawCircle()</code>
     * method. The line style remains in effect until you call the
     * <code>lineStyle()</code> or <code>lineGradientStyle()</code> methods, or
     * the <code>lineBitmapStyle()</code> method again with different parameters.
     * </p>
     *
     * <p>You can call the <code>lineBitmapStyle()</code> method in the middle of
     * drawing a path to specify different styles for different line segments
     * within a path. </p>
     *
     * <p>Call the <code>lineStyle()</code> method before you call the
     * <code>lineBitmapStyle()</code> method to enable a stroke, or else the
     * value of the line style is <code>undefined</code>.</p>
     *
     * <p>Calls to the <code>clear()</code> method set the line style back to
     * <code>undefined</code>. </p>
     *
     * @param bitmap The bitmap to use for the line stroke.
     * @param matrix An optional transformation matrix as defined by the
     *               flash.geom.Matrix class. The matrix can be used to scale or
     *               otherwise manipulate the bitmap before applying it to the
     *               line style.
     * @param repeat Whether to repeat the bitmap in a tiled fashion.
     * @param smooth Whether smoothing should be applied to the bitmap.
     */
    Graphics.prototype.lineBitmapStyle = function (bitmap, matrix, repeat, smooth) {
        if (matrix === void 0) { matrix = null; }
        if (repeat === void 0) { repeat = true; }
        if (smooth === void 0) { smooth = false; }
    };
    /**
     * Specifies a gradient to use for the stroke when drawing lines.
     *
     * <p>The gradient line style is used for subsequent calls to Graphics
     * methods such as the <code>lineTo()</code> methods or the
     * <code>drawCircle()</code> method. The line style remains in effect until
     * you call the <code>lineStyle()</code> or <code>lineBitmapStyle()</code>
     * methods, or the <code>lineGradientStyle()</code> method again with
     * different parameters. </p>
     *
     * <p>You can call the <code>lineGradientStyle()</code> method in the middle
     * of drawing a path to specify different styles for different line segments
     * within a path. </p>
     *
     * <p>Call the <code>lineStyle()</code> method before you call the
     * <code>lineGradientStyle()</code> method to enable a stroke, or else the
     * value of the line style is <code>undefined</code>.</p>
     *
     * <p>Calls to the <code>clear()</code> method set the line style back to
     * <code>undefined</code>. </p>
     *
     * @param type                A value from the GradientType class that
     *                            specifies which gradient type to use, either
     *                            GradientType.LINEAR or GradientType.RADIAL.
     * @param colors              An array of RGB hexadecimal color values used
     *                            in the gradient; for example, red is 0xFF0000,
     *                            blue is 0x0000FF, and so on. You can specify
     *                            up to 15 colors. For each color, specify a
     *                            corresponding value in the alphas and ratios
     *                            parameters.
     * @param alphas              An array of alpha values for the corresponding
     *                            colors in the colors array; valid values are 0
     *                            to 1. If the value is less than 0, the default
     *                            is 0. If the value is greater than 1, the
     *                            default is 1.
     * @param ratios              An array of color distribution ratios; valid
     *                            values are 0-255. This value defines the
     *                            percentage of the width where the color is
     *                            sampled at 100%. The value 0 represents the
     *                            left position in the gradient box, and 255
     *                            represents the right position in the gradient
     *                            box.
     * @param matrix              A transformation matrix as defined by the
     *                            flash.geom.Matrix class. The flash.geom.Matrix
     *                            class includes a
     *                            <code>createGradientBox()</code> method, which
     *                            lets you conveniently set up the matrix for use
     *                            with the <code>lineGradientStyle()</code>
     *                            method.
     * @param spreadMethod        A value from the SpreadMethod class that
     *                            specifies which spread method to use:
     * @param interpolationMethod A value from the InterpolationMethod class that
     *                            specifies which value to use. For example,
     *                            consider a simple linear gradient between two
     *                            colors(with the <code>spreadMethod</code>
     *                            parameter set to
     *                            <code>SpreadMethod.REFLECT</code>). The
     *                            different interpolation methods affect the
     *                            appearance as follows:
     * @param focalPointRatio     A number that controls the location of the
     *                            focal point of the gradient. The value 0 means
     *                            the focal point is in the center. The value 1
     *                            means the focal point is at one border of the
     *                            gradient circle. The value -1 means that the
     *                            focal point is at the other border of the
     *                            gradient circle. Values less than -1 or greater
     *                            than 1 are rounded to -1 or 1. The following
     *                            image shows a gradient with a
     *                            <code>focalPointRatio</code> of -0.75:
     */
    Graphics.prototype.lineGradientStyle = function (type, colors, alphas, ratios, matrix, spreadMethod, interpolationMethod, focalPointRatio) {
        if (matrix === void 0) { matrix = null; }
        if (spreadMethod === void 0) { spreadMethod = null; }
        if (interpolationMethod === void 0) { interpolationMethod = null; }
        if (focalPointRatio === void 0) { focalPointRatio = 0; }
    };
    /**
     * Specifies a shader to use for the line stroke when drawing lines.
     *
     * <p>The shader line style is used for subsequent calls to Graphics methods
     * such as the <code>lineTo()</code> method or the <code>drawCircle()</code>
     * method. The line style remains in effect until you call the
     * <code>lineStyle()</code> or <code>lineGradientStyle()</code> methods, or
     * the <code>lineBitmapStyle()</code> method again with different parameters.
     * </p>
     *
     * <p>You can call the <code>lineShaderStyle()</code> method in the middle of
     * drawing a path to specify different styles for different line segments
     * within a path. </p>
     *
     * <p>Call the <code>lineStyle()</code> method before you call the
     * <code>lineShaderStyle()</code> method to enable a stroke, or else the
     * value of the line style is <code>undefined</code>.</p>
     *
     * <p>Calls to the <code>clear()</code> method set the line style back to
     * <code>undefined</code>. </p>
     *
     * @param shader The shader to use for the line stroke.
     * @param matrix An optional transformation matrix as defined by the
     *               flash.geom.Matrix class. The matrix can be used to scale or
     *               otherwise manipulate the bitmap before applying it to the
     *               line style.
     */
    //		public lineShaderStyle(shader:Shader, matrix:Matrix = null)
    //		{
    //
    //		}
    /**
     * Specifies a line style used for subsequent calls to Graphics methods such
     * as the <code>lineTo()</code> method or the <code>drawCircle()</code>
     * method. The line style remains in effect until you call the
     * <code>lineGradientStyle()</code> method, the
     * <code>lineBitmapStyle()</code> method, or the <code>lineStyle()</code>
     * method with different parameters.
     *
     * <p>You can call the <code>lineStyle()</code> method in the middle of
     * drawing a path to specify different styles for different line segments
     * within the path.</p>
     *
     * <p><b>Note: </b>Calls to the <code>clear()</code> method set the line
     * style back to <code>undefined</code>.</p>
     *
     * <p><b>Note: </b>Flash Lite 4 supports only the first three parameters
     * (<code>thickness</code>, <code>color</code>, and <code>alpha</code>).</p>
     *
     * @param thickness    An integer that indicates the thickness of the line in
     *                     points; valid values are 0-255. If a number is not
     *                     specified, or if the parameter is undefined, a line is
     *                     not drawn. If a value of less than 0 is passed, the
     *                     default is 0. The value 0 indicates hairline
     *                     thickness; the maximum thickness is 255. If a value
     *                     greater than 255 is passed, the default is 255.
     * @param color        A hexadecimal color value of the line; for example,
     *                     red is 0xFF0000, blue is 0x0000FF, and so on. If a
     *                     value is not indicated, the default is 0x000000
     *                    (black). Optional.
     * @param alpha        A number that indicates the alpha value of the color
     *                     of the line; valid values are 0 to 1. If a value is
     *                     not indicated, the default is 1(solid). If the value
     *                     is less than 0, the default is 0. If the value is
     *                     greater than 1, the default is 1.
     * @param pixelHinting(Not supported in Flash Lite 4) A Boolean value that
     *                     specifies whether to hint strokes to full pixels. This
     *                     affects both the position of anchors of a curve and
     *                     the line stroke size itself. With
     *                     <code>pixelHinting</code> set to <code>true</code>,
     *                     line widths are adjusted to full pixel widths. With
     *                     <code>pixelHinting</code> set to <code>false</code>,
     *                     disjoints can appear for curves and straight lines.
     *                     For example, the following illustrations show how
     *                     Flash Player or Adobe AIR renders two rounded
     *                     rectangles that are identical, except that the
     *                     <code>pixelHinting</code> parameter used in the
     *                     <code>lineStyle()</code> method is set differently
     *                    (the images are scaled by 200%, to emphasize the
     *                     difference):
     *
     *                     <p>If a value is not supplied, the line does not use
     *                     pixel hinting.</p>
     * @param scaleMode   (Not supported in Flash Lite 4) A value from the
     *                     LineScaleMode class that specifies which scale mode to
     *                     use:
     *                     <ul>
     *                       <li> <code>LineScaleMode.NORMAL</code> - Always
     *                     scale the line thickness when the object is scaled
     *                    (the default). </li>
     *                       <li> <code>LineScaleMode.NONE</code> - Never scale
     *                     the line thickness. </li>
     *                       <li> <code>LineScaleMode.VERTICAL</code> - Do not
     *                     scale the line thickness if the object is scaled
     *                     vertically <i>only</i>. For example, consider the
     *                     following circles, drawn with a one-pixel line, and
     *                     each with the <code>scaleMode</code> parameter set to
     *                     <code>LineScaleMode.VERTICAL</code>. The circle on the
     *                     left is scaled vertically only, and the circle on the
     *                     right is scaled both vertically and horizontally:
     *                     </li>
     *                       <li> <code>LineScaleMode.HORIZONTAL</code> - Do not
     *                     scale the line thickness if the object is scaled
     *                     horizontally <i>only</i>. For example, consider the
     *                     following circles, drawn with a one-pixel line, and
     *                     each with the <code>scaleMode</code> parameter set to
     *                     <code>LineScaleMode.HORIZONTAL</code>. The circle on
     *                     the left is scaled horizontally only, and the circle
     *                     on the right is scaled both vertically and
     *                     horizontally:   </li>
     *                     </ul>
     * @param caps        (Not supported in Flash Lite 4) A value from the
     *                     CapsStyle class that specifies the type of caps at the
     *                     end of lines. Valid values are:
     *                     <code>CapsStyle.NONE</code>,
     *                     <code>CapsStyle.ROUND</code>, and
     *                     <code>CapsStyle.SQUARE</code>. If a value is not
     *                     indicated, Flash uses round caps.
     *
     *                     <p>For example, the following illustrations show the
     *                     different <code>capsStyle</code> settings. For each
     *                     setting, the illustration shows a blue line with a
     *                     thickness of 30(for which the <code>capsStyle</code>
     *                     applies), and a superimposed black line with a
     *                     thickness of 1(for which no <code>capsStyle</code>
     *                     applies): </p>
     * @param joints      (Not supported in Flash Lite 4) A value from the
     *                     JointStyle class that specifies the type of joint
     *                     appearance used at angles. Valid values are:
     *                     <code>JointStyle.BEVEL</code>,
     *                     <code>JointStyle.MITER</code>, and
     *                     <code>JointStyle.ROUND</code>. If a value is not
     *                     indicated, Flash uses round joints.
     *
     *                     <p>For example, the following illustrations show the
     *                     different <code>joints</code> settings. For each
     *                     setting, the illustration shows an angled blue line
     *                     with a thickness of 30(for which the
     *                     <code>jointStyle</code> applies), and a superimposed
     *                     angled black line with a thickness of 1(for which no
     *                     <code>jointStyle</code> applies): </p>
     *
     *                     <p><b>Note:</b> For <code>joints</code> set to
     *                     <code>JointStyle.MITER</code>, you can use the
     *                     <code>miterLimit</code> parameter to limit the length
     *                     of the miter.</p>
     * @param miterLimit  (Not supported in Flash Lite 4) A number that
     *                     indicates the limit at which a miter is cut off. Valid
     *                     values range from 1 to 255(and values outside that
     *                     range are rounded to 1 or 255). This value is only
     *                     used if the <code>jointStyle</code> is set to
     *                     <code>"miter"</code>. The <code>miterLimit</code>
     *                     value represents the length that a miter can extend
     *                     beyond the point at which the lines meet to form a
     *                     joint. The value expresses a factor of the line
     *                     <code>thickness</code>. For example, with a
     *                     <code>miterLimit</code> factor of 2.5 and a
     *                     <code>thickness</code> of 10 pixels, the miter is cut
     *                     off at 25 pixels.
     *
     *                     <p>For example, consider the following angled lines,
     *                     each drawn with a <code>thickness</code> of 20, but
     *                     with <code>miterLimit</code> set to 1, 2, and 4.
     *                     Superimposed are black reference lines showing the
     *                     meeting points of the joints:</p>
     *
     *                     <p>Notice that a given <code>miterLimit</code> value
     *                     has a specific maximum angle for which the miter is
     *                     cut off. The following table lists some examples:</p>
     */
    Graphics.prototype.lineStyle = function (thickness, color, alpha, pixelHinting, scaleMode, caps, joints, miterLimit) {
        if (thickness === void 0) { thickness = 0; }
        if (color === void 0) { color = 0; }
        if (alpha === void 0) { alpha = 1; }
        if (pixelHinting === void 0) { pixelHinting = false; }
        if (scaleMode === void 0) { scaleMode = null; }
        if (caps === void 0) { caps = null; }
        if (joints === void 0) { joints = null; }
        if (miterLimit === void 0) { miterLimit = 3; }
    };
    /**
     * Draws a line using the current line style from the current drawing
     * position to(<code>x</code>, <code>y</code>); the current drawing position
     * is then set to(<code>x</code>, <code>y</code>). If the display object in
     * which you are drawing contains content that was created with the Flash
     * drawing tools, calls to the <code>lineTo()</code> method are drawn
     * underneath the content. If you call <code>lineTo()</code> before any calls
     * to the <code>moveTo()</code> method, the default position for the current
     * drawing is(<i>0, 0</i>). If any of the parameters are missing, this
     * method fails and the current drawing position is not changed.
     *
     * @param x A number that indicates the horizontal position relative to the
     *          registration point of the parent display object(in pixels).
     * @param y A number that indicates the vertical position relative to the
     *          registration point of the parent display object(in pixels).
     */
    Graphics.prototype.lineTo = function (x, y) {
    };
    /**
     * Moves the current drawing position to(<code>x</code>, <code>y</code>). If
     * any of the parameters are missing, this method fails and the current
     * drawing position is not changed.
     *
     * @param x A number that indicates the horizontal position relative to the
     *          registration point of the parent display object(in pixels).
     * @param y A number that indicates the vertical position relative to the
     *          registration point of the parent display object(in pixels).
     */
    Graphics.prototype.moveTo = function (x, y) {
    };
    return Graphics;
})();
module.exports = Graphics;


},{}],"awayjs-display/lib/draw/IGraphicsData":[function(require,module,exports){



},{}],"awayjs-display/lib/draw/InterpolationMethod":[function(require,module,exports){
/**
 * The InterpolationMethod class provides values for the
 * <code>interpolationMethod</code> parameter in the
 * <code>Graphics.beginGradientFill()</code> and
 * <code>Graphics.lineGradientStyle()</code> methods. This parameter
 * determines the RGB space to use when rendering the gradient.
 */
var InterpolationMethod = (function () {
    function InterpolationMethod() {
    }
    /**
     * Specifies that the RGB interpolation method should be used. This means
     * that the gradient is rendered with exponential sRGB(standard RGB) space.
     * The sRGB space is a W3C-endorsed standard that defines a non-linear
     * conversion between red, green, and blue component values and the actual
     * intensity of the visible component color.
     *
     * <p>For example, consider a simple linear gradient between two colors(with
     * the <code>spreadMethod</code> parameter set to
     * <code>SpreadMethod.REFLECT</code>). The different interpolation methods
     * affect the appearance as follows: </p>
     */
    InterpolationMethod.LINEAR_RGB = "linearRGB";
    /**
     * Specifies that the RGB interpolation method should be used. This means
     * that the gradient is rendered with exponential sRGB(standard RGB) space.
     * The sRGB space is a W3C-endorsed standard that defines a non-linear
     * conversion between red, green, and blue component values and the actual
     * intensity of the visible component color.
     *
     * <p>For example, consider a simple linear gradient between two colors(with
     * the <code>spreadMethod</code> parameter set to
     * <code>SpreadMethod.REFLECT</code>). The different interpolation methods
     * affect the appearance as follows: </p>
     */
    InterpolationMethod.RGB = "rgb";
    return InterpolationMethod;
})();
module.exports = InterpolationMethod;


},{}],"awayjs-display/lib/draw/JointStyle":[function(require,module,exports){
/**
 * The JointStyle class is an enumeration of constant values that specify the
 * joint style to use in drawing lines. These constants are provided for use
 * as values in the <code>joints</code> parameter of the
 * <code>flash.display.Graphics.lineStyle()</code> method. The method supports
 * three types of joints: miter, round, and bevel, as the following example
 * shows:
 */
var JointStyle = (function () {
    function JointStyle() {
    }
    /**
     * Specifies beveled joints in the <code>joints</code> parameter of the
     * <code>flash.display.Graphics.lineStyle()</code> method.
     */
    JointStyle.BEVEL = "bevel";
    /**
     * Specifies mitered joints in the <code>joints</code> parameter of the
     * <code>flash.display.Graphics.lineStyle()</code> method.
     */
    JointStyle.MITER = "miter";
    /**
     * Specifies round joints in the <code>joints</code> parameter of the
     * <code>flash.display.Graphics.lineStyle()</code> method.
     */
    JointStyle.ROUND = "round";
    return JointStyle;
})();
module.exports = JointStyle;


},{}],"awayjs-display/lib/draw/LineScaleMode":[function(require,module,exports){
/**
 * The LineScaleMode class provides values for the <code>scaleMode</code>
 * parameter in the <code>Graphics.lineStyle()</code> method.
 */
var LineScaleMode = (function () {
    function LineScaleMode() {
    }
    /**
     * With this setting used as the <code>scaleMode</code> parameter of the
     * <code>lineStyle()</code> method, the thickness of the line scales
     * <i>only</i> vertically. For example, consider the following circles, drawn
     * with a one-pixel line, and each with the <code>scaleMode</code> parameter
     * set to <code>LineScaleMode.VERTICAL</code>. The circle on the left is
     * scaled only vertically, and the circle on the right is scaled both
     * vertically and horizontally.
     */
    LineScaleMode.HORIZONTAL = "horizontal";
    /**
     * With this setting used as the <code>scaleMode</code> parameter of the
     * <code>lineStyle()</code> method, the thickness of the line never scales.
     */
    LineScaleMode.NONE = "none";
    /**
     * With this setting used as the <code>scaleMode</code> parameter of the
     * <code>lineStyle()</code> method, the thickness of the line always scales
     * when the object is scaled(the default).
     */
    LineScaleMode.NORMAL = "normal";
    /**
     * With this setting used as the <code>scaleMode</code> parameter of the
     * <code>lineStyle()</code> method, the thickness of the line scales
     * <i>only</i> horizontally. For example, consider the following circles,
     * drawn with a one-pixel line, and each with the <code>scaleMode</code>
     * parameter set to <code>LineScaleMode.HORIZONTAL</code>. The circle on the
     * left is scaled only horizontally, and the circle on the right is scaled
     * both vertically and horizontally.
     */
    LineScaleMode.VERTICAL = "vertical";
    return LineScaleMode;
})();
module.exports = LineScaleMode;


},{}],"awayjs-display/lib/draw/PixelSnapping":[function(require,module,exports){
/**
 * The PixelSnapping class is an enumeration of constant values for setting
 * the pixel snapping options by using the <code>pixelSnapping</code> property
 * of a Bitmap object.
 */
var PixelSnapping = (function () {
    function PixelSnapping() {
    }
    /**
     * A constant value used in the <code>pixelSnapping</code> property of a
     * Bitmap object to specify that the bitmap image is always snapped to the
     * nearest pixel, independent of any transformation.
     */
    PixelSnapping.ALWAYS = "always";
    /**
     * A constant value used in the <code>pixelSnapping</code> property of a
     * Bitmap object to specify that the bitmap image is snapped to the nearest
     * pixel if it is drawn with no rotation or skew and it is drawn at a scale
     * factor of 99.9% to 100.1%. If these conditions are satisfied, the image is
     * drawn at 100% scale, snapped to the nearest pixel. Internally, this
     * setting allows the image to be drawn as fast as possible by using the
     * vector renderer.
     */
    PixelSnapping.AUTO = "auto";
    /**
     * A constant value used in the <code>pixelSnapping</code> property of a
     * Bitmap object to specify that no pixel snapping occurs.
     */
    PixelSnapping.NEVER = "never";
    return PixelSnapping;
})();
module.exports = PixelSnapping;


},{}],"awayjs-display/lib/draw/SpreadMethod":[function(require,module,exports){
/**
 * The SpreadMethod class provides values for the <code>spreadMethod</code>
 * parameter in the <code>beginGradientFill()</code> and
 * <code>lineGradientStyle()</code> methods of the Graphics class.
 *
 * <p>The following example shows the same gradient fill using various spread
 * methods:</p>
 */
var SpreadMethod = (function () {
    function SpreadMethod() {
    }
    /**
     * Specifies that the gradient use the <i>pad</i> spread method.
     */
    SpreadMethod.PAD = "pad";
    /**
     * Specifies that the gradient use the <i>reflect</i> spread method.
     */
    SpreadMethod.REFLECT = "reflect";
    /**
     * Specifies that the gradient use the <i>repeat</i> spread method.
     */
    SpreadMethod.REPEAT = "repeat";
    return SpreadMethod;
})();
module.exports = SpreadMethod;


},{}],"awayjs-display/lib/draw/TriangleCulling":[function(require,module,exports){
/**
 * Defines codes for culling algorithms that determine which triangles not to
 * render when drawing triangle paths.
 *
 * <p> The terms <code>POSITIVE</code> and <code>NEGATIVE</code> refer to the
 * sign of a triangle's normal along the z-axis. The normal is a 3D vector
 * that is perpendicular to the surface of the triangle. </p>
 *
 * <p> A triangle whose vertices 0, 1, and 2 are arranged in a clockwise order
 * has a positive normal value. That is, its normal points in a positive
 * z-axis direction, away from the current view point. When the
 * <code>TriangleCulling.POSITIVE</code> algorithm is used, triangles with
 * positive normals are not rendered. Another term for this is backface
 * culling. </p>
 *
 * <p> A triangle whose vertices are arranged in a counter-clockwise order has
 * a negative normal value. That is, its normal points in a negative z-axis
 * direction, toward the current view point. When the
 * <code>TriangleCulling.NEGATIVE</code> algorithm is used, triangles with
 * negative normals will not be rendered. </p>
 */
var TriangleCulling = (function () {
    function TriangleCulling() {
    }
    /**
     * Specifies culling of all triangles facing toward the current view point.
     */
    TriangleCulling.NEGATIVE = "negative";
    /**
     * Specifies no culling. All triangles in the path are rendered.
     */
    TriangleCulling.NONE = "none";
    /**
     * Specifies culling of all triangles facing away from the current view
     * point. This is also known as backface culling.
     */
    TriangleCulling.POSITIVE = "positive";
    return TriangleCulling;
})();
module.exports = TriangleCulling;


},{}],"awayjs-display/lib/entities/Billboard":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var DisplayObject = require("awayjs-display/lib/base/DisplayObject");
var BoundsType = require("awayjs-display/lib/bounds/BoundsType");
var MaterialEvent = require("awayjs-display/lib/events/MaterialEvent");
/**
 * The Billboard class represents display objects that represent bitmap images.
 * These can be images that you load with the <code>flash.Assets</code> or
 * <code>flash.display.Loader</code> classes, or they can be images that you
 * create with the <code>Billboard()</code> constructor.
 *
 * <p>The <code>Billboard()</code> constructor allows you to create a Billboard
 * object that contains a reference to a BitmapData object. After you create a
 * Billboard object, use the <code>addChild()</code> or <code>addChildAt()</code>
 * method of the parent DisplayObjectContainer instance to place the bitmap on
 * the display list.</p>
 *
 * <p>A Billboard object can share its BitmapData reference among several Billboard
 * objects, independent of translation or rotation properties. Because you can
 * create multiple Billboard objects that reference the same BitmapData object,
 * multiple display objects can use the same complex BitmapData object without
 * incurring the memory overhead of a BitmapData object for each display
 * object instance.</p>
 *
 * <p>A BitmapData object can be drawn to the screen by a Billboard object in one
 * of two ways: by using the default hardware renderer with a single hardware surface,
 * or by using the slower software renderer when 3D acceleration is not available.</p>
 *
 * <p>If you would prefer to perform a batch rendering command, rather than using a
 * single surface for each Billboard object, you can also draw to the screen using the
 * <code>drawTiles()</code> or <code>drawTriangles()</code> methods which are
 * available to <code>flash.display.Tilesheet</code> and <code>flash.display.Graphics
 * objects.</code></p>
 *
 * <p><b>Note:</b> The Billboard class is not a subclass of the InteractiveObject
 * class, so it cannot dispatch mouse events. However, you can use the
 * <code>addEventListener()</code> method of the display object container that
 * contains the Billboard object.</p>
 */
var Billboard = (function (_super) {
    __extends(Billboard, _super);
    function Billboard(material, pixelSnapping, smoothing) {
        var _this = this;
        if (pixelSnapping === void 0) { pixelSnapping = "auto"; }
        if (smoothing === void 0) { smoothing = false; }
        _super.call(this);
        this._pIsEntity = true;
        this.onSizeChangedDelegate = function (event) { return _this.onSizeChanged(event); };
        this.material = material;
        this._billboardWidth = material.width;
        this._billboardHeight = material.height;
        //default bounds type
        this._boundsType = BoundsType.AXIS_ALIGNED_BOX;
    }
    Object.defineProperty(Billboard.prototype, "animator", {
        /**
         * Defines the animator of the mesh. Act on the mesh's geometry. Defaults to null
         */
        get: function () {
            return this._animator;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Billboard.prototype, "assetType", {
        /**
         *
         */
        get: function () {
            return Billboard.assetType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Billboard.prototype, "billboardHeight", {
        /**
         *
         */
        get: function () {
            return this._billboardHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Billboard.prototype, "billboardWidth", {
        /**
         *
         */
        get: function () {
            return this._billboardWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Billboard.prototype, "material", {
        /**
         *
         */
        get: function () {
            return this._material;
        },
        set: function (value) {
            if (value == this._material)
                return;
            if (this._material) {
                this._material.iRemoveOwner(this);
                this._material.removeEventListener(MaterialEvent.SIZE_CHANGED, this.onSizeChangedDelegate);
            }
            this._material = value;
            if (this._material) {
                this._material.iAddOwner(this);
                this._material.addEventListener(MaterialEvent.SIZE_CHANGED, this.onSizeChangedDelegate);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Billboard.prototype, "uvTransform", {
        /**
         *
         */
        get: function () {
            return this._uvTransform;
        },
        set: function (value) {
            this._uvTransform = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @protected
     */
    Billboard.prototype._pUpdateBoxBounds = function () {
        _super.prototype._pUpdateBoxBounds.call(this);
        this._pBoxBounds.width = this._billboardWidth;
        this._pBoxBounds.height = this._billboardHeight;
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
    Billboard.prototype._iTestCollision = function (shortestCollisionDistance, findClosest) {
        return this._pPickingCollider.testBillboardCollision(this, this._pPickingCollisionVO, shortestCollisionDistance);
    };
    /**
     * @private
     */
    Billboard.prototype.onSizeChanged = function (event) {
        this._billboardWidth = this._material.width;
        this._billboardHeight = this._material.height;
        this._pInvalidateBounds();
        var len = this._pRenderables.length;
        for (var i = 0; i < len; i++)
            this._pRenderables[i].invalidateGeometry();
    };
    Billboard.prototype._iCollectRenderables = function (rendererPool) {
        // Since this getter is invoked every iteration of the render loop, and
        // the prefab construct could affect the sub-meshes, the prefab is
        // validated here to give it a chance to rebuild.
        if (this._iSourcePrefab)
            this._iSourcePrefab._iValidate();
        this._iCollectRenderable(rendererPool);
    };
    Billboard.prototype._iCollectRenderable = function (rendererPool) {
        rendererPool.applyBillboard(this);
    };
    Billboard.prototype._pRegisterEntity = function (partition) {
        partition._iRegisterEntity(this);
    };
    Billboard.prototype._pUnregisterEntity = function (partition) {
        partition._iUnregisterEntity(this);
    };
    Billboard.assetType = "[asset Billboard]";
    return Billboard;
})(DisplayObject);
module.exports = Billboard;


},{"awayjs-display/lib/base/DisplayObject":"awayjs-display/lib/base/DisplayObject","awayjs-display/lib/bounds/BoundsType":"awayjs-display/lib/bounds/BoundsType","awayjs-display/lib/events/MaterialEvent":"awayjs-display/lib/events/MaterialEvent"}],"awayjs-display/lib/entities/Camera":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Matrix3D = require("awayjs-core/lib/geom/Matrix3D");
var Plane3D = require("awayjs-core/lib/geom/Plane3D");
var ProjectionEvent = require("awayjs-core/lib/events/ProjectionEvent");
var PerspectiveProjection = require("awayjs-core/lib/projections/PerspectiveProjection");
var BoundsType = require("awayjs-display/lib/bounds/BoundsType");
var DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
var CameraEvent = require("awayjs-display/lib/events/CameraEvent");
var Camera = (function (_super) {
    __extends(Camera, _super);
    function Camera(projection) {
        var _this = this;
        if (projection === void 0) { projection = null; }
        _super.call(this);
        this._viewProjection = new Matrix3D();
        this._viewProjectionDirty = true;
        this._frustumPlanesDirty = true;
        this._pIsEntity = true;
        this._onProjectionMatrixChangedDelegate = function (event) { return _this.onProjectionMatrixChanged(event); };
        this._projection = projection || new PerspectiveProjection();
        this._projection.addEventListener(ProjectionEvent.MATRIX_CHANGED, this._onProjectionMatrixChangedDelegate);
        this._frustumPlanes = [];
        for (var i = 0; i < 6; ++i)
            this._frustumPlanes[i] = new Plane3D();
        this.z = -1000;
        //default bounds type
        this._boundsType = BoundsType.NULL;
    }
    Object.defineProperty(Camera.prototype, "assetType", {
        //@override
        get: function () {
            return Camera.assetType;
        },
        enumerable: true,
        configurable: true
    });
    Camera.prototype.onProjectionMatrixChanged = function (event) {
        this._viewProjectionDirty = true;
        this._frustumPlanesDirty = true;
        this.dispatchEvent(event);
    };
    Object.defineProperty(Camera.prototype, "frustumPlanes", {
        get: function () {
            if (this._frustumPlanesDirty)
                this.updateFrustum();
            return this._frustumPlanes;
        },
        enumerable: true,
        configurable: true
    });
    Camera.prototype.updateFrustum = function () {
        var a, b, c;
        //var d : Number;
        var c11, c12, c13, c14;
        var c21, c22, c23, c24;
        var c31, c32, c33, c34;
        var c41, c42, c43, c44;
        var p;
        var raw = new Array(16);
        ;
        var invLen;
        this.viewProjection.copyRawDataTo(raw);
        c11 = raw[0];
        c12 = raw[4];
        c13 = raw[8];
        c14 = raw[12];
        c21 = raw[1];
        c22 = raw[5];
        c23 = raw[9];
        c24 = raw[13];
        c31 = raw[2];
        c32 = raw[6];
        c33 = raw[10];
        c34 = raw[14];
        c41 = raw[3];
        c42 = raw[7];
        c43 = raw[11];
        c44 = raw[15];
        // left plane
        p = this._frustumPlanes[0];
        a = c41 + c11;
        b = c42 + c12;
        c = c43 + c13;
        invLen = 1 / Math.sqrt(a * a + b * b + c * c);
        p.a = a * invLen;
        p.b = b * invLen;
        p.c = c * invLen;
        p.d = -(c44 + c14) * invLen;
        // right plane
        p = this._frustumPlanes[1];
        a = c41 - c11;
        b = c42 - c12;
        c = c43 - c13;
        invLen = 1 / Math.sqrt(a * a + b * b + c * c);
        p.a = a * invLen;
        p.b = b * invLen;
        p.c = c * invLen;
        p.d = (c14 - c44) * invLen;
        // bottom
        p = this._frustumPlanes[2];
        a = c41 + c21;
        b = c42 + c22;
        c = c43 + c23;
        invLen = 1 / Math.sqrt(a * a + b * b + c * c);
        p.a = a * invLen;
        p.b = b * invLen;
        p.c = c * invLen;
        p.d = -(c44 + c24) * invLen;
        // top
        p = this._frustumPlanes[3];
        a = c41 - c21;
        b = c42 - c22;
        c = c43 - c23;
        invLen = 1 / Math.sqrt(a * a + b * b + c * c);
        p.a = a * invLen;
        p.b = b * invLen;
        p.c = c * invLen;
        p.d = (c24 - c44) * invLen;
        // near
        p = this._frustumPlanes[4];
        a = c31;
        b = c32;
        c = c33;
        invLen = 1 / Math.sqrt(a * a + b * b + c * c);
        p.a = a * invLen;
        p.b = b * invLen;
        p.c = c * invLen;
        p.d = -c34 * invLen;
        // far
        p = this._frustumPlanes[5];
        a = c41 - c31;
        b = c42 - c32;
        c = c43 - c33;
        invLen = 1 / Math.sqrt(a * a + b * b + c * c);
        p.a = a * invLen;
        p.b = b * invLen;
        p.c = c * invLen;
        p.d = (c34 - c44) * invLen;
        this._frustumPlanesDirty = false;
    };
    /**
     * @protected
     */
    Camera.prototype.pInvalidateSceneTransform = function () {
        _super.prototype.pInvalidateSceneTransform.call(this);
        this._viewProjectionDirty = true;
        this._frustumPlanesDirty = true;
    };
    Object.defineProperty(Camera.prototype, "projection", {
        /**
         *
         */
        get: function () {
            return this._projection;
        },
        set: function (value) {
            if (this._projection == value)
                return;
            if (!value)
                throw new Error("Projection cannot be null!");
            this._projection.removeEventListener(ProjectionEvent.MATRIX_CHANGED, this._onProjectionMatrixChangedDelegate);
            this._projection = value;
            this._projection.addEventListener(ProjectionEvent.MATRIX_CHANGED, this._onProjectionMatrixChangedDelegate);
            this.dispatchEvent(new CameraEvent(CameraEvent.PROJECTION_CHANGED, this));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "viewProjection", {
        /**
         *
         */
        get: function () {
            if (this._viewProjectionDirty) {
                this._viewProjection.copyFrom(this.inverseSceneTransform);
                this._viewProjection.append(this._projection.matrix);
                this._viewProjectionDirty = false;
            }
            return this._viewProjection;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Calculates the ray in scene space from the camera to the given normalized coordinates in screen space.
     *
     * @param nX The normalised x coordinate in screen space, -1 corresponds to the left edge of the viewport, 1 to the right.
     * @param nY The normalised y coordinate in screen space, -1 corresponds to the top edge of the viewport, 1 to the bottom.
     * @param sZ The z coordinate in screen space, representing the distance into the screen.
     * @return The ray from the camera to the scene space position of the given screen coordinates.
     */
    Camera.prototype.getRay = function (nX, nY, sZ) {
        return this.sceneTransform.deltaTransformVector(this._projection.unproject(nX, nY, sZ));
    };
    /**
     * Calculates the normalised position in screen space of the given scene position.
     *
     * @param point3d the position vector of the scene coordinates to be projected.
     * @return The normalised screen position of the given scene coordinates.
     */
    Camera.prototype.project = function (point3d) {
        return this._projection.project(this.inverseSceneTransform.transformVector(point3d));
    };
    /**
     * Calculates the scene position of the given normalized coordinates in screen space.
     *
     * @param nX The normalised x coordinate in screen space, minus the originX offset of the projection property.
     * @param nY The normalised y coordinate in screen space, minus the originY offset of the projection property.
     * @param sZ The z coordinate in screen space, representing the distance into the screen.
     * @return The scene position of the given screen coordinates.
     */
    Camera.prototype.unproject = function (nX, nY, sZ) {
        return this.sceneTransform.transformVector(this._projection.unproject(nX, nY, sZ));
    };
    Camera.prototype._iCollectRenderables = function (rendererPool) {
        // Since this getter is invoked every iteration of the render loop, and
        // the prefab construct could affect the sub-meshes, the prefab is
        // validated here to give it a chance to rebuild.
        if (this._iSourcePrefab)
            this._iSourcePrefab._iValidate();
        this._iCollectRenderable(rendererPool);
    };
    Camera.prototype._iCollectRenderable = function (rendererPool) {
        //nothing to do here
    };
    Camera.prototype._pRegisterEntity = function (partition) {
        partition._iRegisterCamera(this);
    };
    Camera.prototype._pUnregisterEntity = function (partition) {
        partition._iUnregisterCamera(this);
    };
    Camera.assetType = "[asset Camera]";
    return Camera;
})(DisplayObjectContainer);
module.exports = Camera;


},{"awayjs-core/lib/events/ProjectionEvent":undefined,"awayjs-core/lib/geom/Matrix3D":undefined,"awayjs-core/lib/geom/Plane3D":undefined,"awayjs-core/lib/projections/PerspectiveProjection":undefined,"awayjs-display/lib/bounds/BoundsType":"awayjs-display/lib/bounds/BoundsType","awayjs-display/lib/containers/DisplayObjectContainer":"awayjs-display/lib/containers/DisplayObjectContainer","awayjs-display/lib/events/CameraEvent":"awayjs-display/lib/events/CameraEvent"}],"awayjs-display/lib/entities/DirectionalLight":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Matrix3D = require("awayjs-core/lib/geom/Matrix3D");
var Vector3D = require("awayjs-core/lib/geom/Vector3D");
var LightBase = require("awayjs-display/lib/base/LightBase");
var BoundsType = require("awayjs-display/lib/bounds/BoundsType");
var DirectionalShadowMapper = require("awayjs-display/lib/materials/shadowmappers/DirectionalShadowMapper");
var DirectionalLight = (function (_super) {
    __extends(DirectionalLight, _super);
    function DirectionalLight(xDir, yDir, zDir) {
        if (xDir === void 0) { xDir = 0; }
        if (yDir === void 0) { yDir = -1; }
        if (zDir === void 0) { zDir = 1; }
        _super.call(this);
        this._pAabbPoints = new Array(24);
        this._pIsEntity = true;
        this.direction = new Vector3D(xDir, yDir, zDir);
        this._sceneDirection = new Vector3D();
        //default bounds type
        this._boundsType = BoundsType.NULL;
    }
    Object.defineProperty(DirectionalLight.prototype, "sceneDirection", {
        get: function () {
            if (this._pSceneTransformDirty)
                this.pUpdateSceneTransform();
            return this._sceneDirection;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DirectionalLight.prototype, "direction", {
        get: function () {
            return this._direction;
        },
        set: function (value) {
            this._direction = value;
            if (!this._tmpLookAt)
                this._tmpLookAt = new Vector3D();
            this._tmpLookAt.x = this.x + this._direction.x;
            this._tmpLookAt.y = this.y + this._direction.y;
            this._tmpLookAt.z = this.z + this._direction.z;
            this.lookAt(this._tmpLookAt);
        },
        enumerable: true,
        configurable: true
    });
    //@override
    DirectionalLight.prototype.pUpdateSceneTransform = function () {
        _super.prototype.pUpdateSceneTransform.call(this);
        this.sceneTransform.copyColumnTo(2, this._sceneDirection);
        this._sceneDirection.normalize();
    };
    //@override
    DirectionalLight.prototype.pCreateShadowMapper = function () {
        return new DirectionalShadowMapper();
    };
    //override
    DirectionalLight.prototype.iGetObjectProjectionMatrix = function (entity, camera, target) {
        if (target === void 0) { target = null; }
        var raw = new Array();
        var m = new Matrix3D();
        m.copyFrom(entity.getRenderSceneTransform(camera));
        m.append(this.inverseSceneTransform);
        if (!this._projAABBPoints)
            this._projAABBPoints = [];
        m.transformVectors(this._pAabbPoints, this._projAABBPoints);
        var xMin = Infinity, xMax = -Infinity;
        var yMin = Infinity, yMax = -Infinity;
        var zMin = Infinity, zMax = -Infinity;
        var d;
        for (var i = 0; i < 24;) {
            d = this._projAABBPoints[i++];
            if (d < xMin)
                xMin = d;
            if (d > xMax)
                xMax = d;
            d = this._projAABBPoints[i++];
            if (d < yMin)
                yMin = d;
            if (d > yMax)
                yMax = d;
            d = this._projAABBPoints[i++];
            if (d < zMin)
                zMin = d;
            if (d > zMax)
                zMax = d;
        }
        var invXRange = 1 / (xMax - xMin);
        var invYRange = 1 / (yMax - yMin);
        var invZRange = 1 / (zMax - zMin);
        raw[0] = 2 * invXRange;
        raw[5] = 2 * invYRange;
        raw[10] = invZRange;
        raw[12] = -(xMax + xMin) * invXRange;
        raw[13] = -(yMax + yMin) * invYRange;
        raw[14] = -zMin * invZRange;
        raw[1] = raw[2] = raw[3] = raw[4] = raw[6] = raw[7] = raw[8] = raw[9] = raw[11] = 0;
        raw[15] = 1;
        if (!target)
            target = new Matrix3D();
        target.copyRawDataFrom(raw);
        target.prepend(m);
        return target;
    };
    DirectionalLight.prototype._iCollectRenderables = function (rendererPool) {
        //nothing to do here
    };
    DirectionalLight.prototype._pRegisterEntity = function (partition) {
        partition._iRegisterDirectionalLight(this);
    };
    DirectionalLight.prototype._pUnregisterEntity = function (partition) {
        partition._iUnregisterDirectionalLight(this);
    };
    /**
     * //TODO
     *
     * @protected
     */
    DirectionalLight.prototype._pUpdateBoxBounds = function () {
        _super.prototype._pUpdateBoxBounds.call(this);
        //update points
        var minX = this._pBoxBounds.x;
        var minY = this._pBoxBounds.y - this._pBoxBounds.height;
        var minZ = this._pBoxBounds.z;
        var maxX = this._pBoxBounds.x + this._pBoxBounds.width;
        var maxY = this._pBoxBounds.y;
        var maxZ = this._pBoxBounds.z + this._pBoxBounds.depth;
        this._pAabbPoints[0] = minX;
        this._pAabbPoints[1] = minY;
        this._pAabbPoints[2] = minZ;
        this._pAabbPoints[3] = maxX;
        this._pAabbPoints[4] = minY;
        this._pAabbPoints[5] = minZ;
        this._pAabbPoints[6] = minX;
        this._pAabbPoints[7] = maxY;
        this._pAabbPoints[8] = minZ;
        this._pAabbPoints[9] = maxX;
        this._pAabbPoints[10] = maxY;
        this._pAabbPoints[11] = minZ;
        this._pAabbPoints[12] = minX;
        this._pAabbPoints[13] = minY;
        this._pAabbPoints[14] = maxZ;
        this._pAabbPoints[15] = maxX;
        this._pAabbPoints[16] = minY;
        this._pAabbPoints[17] = maxZ;
        this._pAabbPoints[18] = minX;
        this._pAabbPoints[19] = maxY;
        this._pAabbPoints[20] = maxZ;
        this._pAabbPoints[21] = maxX;
        this._pAabbPoints[22] = maxY;
        this._pAabbPoints[23] = maxZ;
    };
    return DirectionalLight;
})(LightBase);
module.exports = DirectionalLight;


},{"awayjs-core/lib/geom/Matrix3D":undefined,"awayjs-core/lib/geom/Vector3D":undefined,"awayjs-display/lib/base/LightBase":"awayjs-display/lib/base/LightBase","awayjs-display/lib/bounds/BoundsType":"awayjs-display/lib/bounds/BoundsType","awayjs-display/lib/materials/shadowmappers/DirectionalShadowMapper":"awayjs-display/lib/materials/shadowmappers/DirectionalShadowMapper"}],"awayjs-display/lib/entities/IEntity":[function(require,module,exports){



},{}],"awayjs-display/lib/entities/LightProbe":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Error = require("awayjs-core/lib/errors/Error");
var LightBase = require("awayjs-display/lib/base/LightBase");
var BoundsType = require("awayjs-display/lib/bounds/BoundsType");
var LightProbe = (function (_super) {
    __extends(LightProbe, _super);
    function LightProbe(diffuseMap, specularMap) {
        if (specularMap === void 0) { specularMap = null; }
        _super.call(this);
        this._pIsEntity = true;
        this._diffuseMap = diffuseMap;
        this._specularMap = specularMap;
        //default bounds type
        this._boundsType = BoundsType.NULL;
    }
    Object.defineProperty(LightProbe.prototype, "diffuseMap", {
        get: function () {
            return this._diffuseMap;
        },
        set: function (value) {
            this._diffuseMap = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LightProbe.prototype, "specularMap", {
        get: function () {
            return this._specularMap;
        },
        set: function (value) {
            this._specularMap = value;
        },
        enumerable: true,
        configurable: true
    });
    //@override
    LightProbe.prototype.iGetObjectProjectionMatrix = function (entity, camera, target) {
        if (target === void 0) { target = null; }
        throw new Error("Object projection matrices are not supported for LightProbe objects!");
    };
    LightProbe.prototype._iCollectRenderables = function (rendererPool) {
        //nothing to do here
    };
    LightProbe.prototype._pRegisterEntity = function (partition) {
        partition._iRegisterLightProbe(this);
    };
    LightProbe.prototype._pUnregisterEntity = function (partition) {
        partition._iUnregisterLightProbe(this);
    };
    return LightProbe;
})(LightBase);
module.exports = LightProbe;


},{"awayjs-core/lib/errors/Error":undefined,"awayjs-display/lib/base/LightBase":"awayjs-display/lib/base/LightBase","awayjs-display/lib/bounds/BoundsType":"awayjs-display/lib/bounds/BoundsType"}],"awayjs-display/lib/entities/LineSegment":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var DisplayObject = require("awayjs-display/lib/base/DisplayObject");
var BoundsType = require("awayjs-display/lib/bounds/BoundsType");
/**
 * A Line Segment primitive.
 */
var LineSegment = (function (_super) {
    __extends(LineSegment, _super);
    /**
     * Create a line segment
     *
     * @param startPosition Start position of the line segment
     * @param endPosition Ending position of the line segment
     * @param thickness Thickness of the line
     */
    function LineSegment(material, startPosition, endPosition, thickness) {
        if (thickness === void 0) { thickness = 1; }
        _super.call(this);
        this._pIsEntity = true;
        this.material = material;
        this._startPosition = startPosition;
        this._endPosition = endPosition;
        this._halfThickness = thickness * 0.5;
        //default bounds type
        this._boundsType = BoundsType.AXIS_ALIGNED_BOX;
    }
    Object.defineProperty(LineSegment.prototype, "animator", {
        /**
         * Defines the animator of the line segment. Act on the line segment's geometry. Defaults to null
         */
        get: function () {
            return this._animator;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineSegment.prototype, "assetType", {
        /**
         *
         */
        get: function () {
            return LineSegment.assetType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineSegment.prototype, "startPostion", {
        /**
         *
         */
        get: function () {
            return this._startPosition;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineSegment.prototype, "startPosition", {
        set: function (value) {
            if (this._startPosition == value)
                return;
            this._startPosition = value;
            this.notifyRenderableUpdate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineSegment.prototype, "endPosition", {
        /**
         *
         */
        get: function () {
            return this._endPosition;
        },
        set: function (value) {
            if (this._endPosition == value)
                return;
            this._endPosition = value;
            this.notifyRenderableUpdate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineSegment.prototype, "material", {
        /**
         *
         */
        get: function () {
            return this._material;
        },
        set: function (value) {
            if (this.material)
                this.material.iRemoveOwner(this);
            this._material = value;
            if (this.material)
                this.material.iAddOwner(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineSegment.prototype, "thickness", {
        /**
         *
         */
        get: function () {
            return this._halfThickness * 2;
        },
        set: function (value) {
            if (this._halfThickness == value)
                return;
            this._halfThickness = value * 0.5;
            this.notifyRenderableUpdate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineSegment.prototype, "uvTransform", {
        /**
         *
         */
        get: function () {
            return this._uvTransform;
        },
        set: function (value) {
            this._uvTransform = value;
        },
        enumerable: true,
        configurable: true
    });
    LineSegment.prototype.dispose = function () {
        this._startPosition = null;
        this._endPosition = null;
    };
    /**
     * @protected
     */
    LineSegment.prototype._pUpdateBoxBounds = function () {
        _super.prototype._pUpdateBoxBounds.call(this);
        this._pBoxBounds.x = Math.min(this._startPosition.x, this._endPosition.x);
        this._pBoxBounds.y = Math.min(this._startPosition.y, this._endPosition.y);
        this._pBoxBounds.z = Math.min(this._startPosition.z, this._endPosition.z);
        this._pBoxBounds.width = Math.abs(this._startPosition.x - this._endPosition.x);
        this._pBoxBounds.height = Math.abs(this._startPosition.y - this._endPosition.y);
        this._pBoxBounds.depth = Math.abs(this._startPosition.z - this._endPosition.z);
    };
    LineSegment.prototype._pUpdateSphereBounds = function () {
        _super.prototype._pUpdateSphereBounds.call(this);
        this._pUpdateBoxBounds();
        var halfWidth = (this._endPosition.x - this._startPosition.x) / 2;
        var halfHeight = (this._endPosition.y - this._startPosition.y) / 2;
        var halfDepth = (this._endPosition.z - this._startPosition.z) / 2;
        this._pSphereBounds.x = this._startPosition.x + halfWidth;
        this._pSphereBounds.y = this._startPosition.y + halfHeight;
        this._pSphereBounds.z = this._startPosition.z + halfDepth;
        this._pSphereBounds.radius = Math.sqrt(halfWidth * halfWidth + halfHeight * halfHeight + halfDepth * halfDepth);
    };
    /**
     * @private
     */
    LineSegment.prototype.notifyRenderableUpdate = function () {
        var len = this._pRenderables.length;
        for (var i = 0; i < len; i++)
            this._pRenderables[i].invalidateGeometry();
    };
    LineSegment.prototype._iCollectRenderables = function (rendererPool) {
        // Since this getter is invoked every iteration of the render loop, and
        // the prefab construct could affect the sub-meshes, the prefab is
        // validated here to give it a chance to rebuild.
        if (this._iSourcePrefab)
            this._iSourcePrefab._iValidate();
        this._iCollectRenderable(rendererPool);
    };
    LineSegment.prototype._iCollectRenderable = function (rendererPool) {
        rendererPool.applyLineSegment(this);
    };
    LineSegment.prototype._pRegisterEntity = function (partition) {
        partition._iRegisterEntity(this);
    };
    LineSegment.prototype._pUnregisterEntity = function (partition) {
        partition._iUnregisterEntity(this);
    };
    LineSegment.assetType = "[asset LineSegment]";
    return LineSegment;
})(DisplayObject);
module.exports = LineSegment;


},{"awayjs-display/lib/base/DisplayObject":"awayjs-display/lib/base/DisplayObject","awayjs-display/lib/bounds/BoundsType":"awayjs-display/lib/bounds/BoundsType"}],"awayjs-display/lib/entities/Mesh":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Geometry = require("awayjs-core/lib/data/Geometry");
var GeometryEvent = require("awayjs-core/lib/events/GeometryEvent");
var BoundsType = require("awayjs-display/lib/bounds/BoundsType");
var DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
var SubMeshPool = require("awayjs-display/lib/pool/SubMeshPool");
/**
 * Mesh is an instance of a Geometry, augmenting it with a presence in the scene graph, a material, and an animation
 * state. It consists out of SubMeshes, which in turn correspond to SubGeometries. SubMeshes allow different parts
 * of the geometry to be assigned different materials.
 */
var Mesh = (function (_super) {
    __extends(Mesh, _super);
    /**
     * Create a new Mesh object.
     *
     * @param geometry                    The geometry used by the mesh that provides it with its shape.
     * @param material    [optional]        The material with which to render the Mesh.
     */
    function Mesh(geometry, material) {
        var _this = this;
        if (material === void 0) { material = null; }
        _super.call(this);
        this._castsShadows = true;
        this._shareAnimationGeometry = true;
        this._pIsEntity = true;
        this._subMeshes = new Array();
        this._onGeometryBoundsInvalidDelegate = function (event) { return _this.onGeometryBoundsInvalid(event); };
        this._onSubGeometryAddedDelegate = function (event) { return _this.onSubGeometryAdded(event); };
        this._onSubGeometryRemovedDelegate = function (event) { return _this.onSubGeometryRemoved(event); };
        //this should never happen, but if people insist on trying to create their meshes before they have geometry to fill it, it becomes necessary
        this.geometry = geometry || new Geometry();
        this.material = material;
        //default bounds type
        this._boundsType = BoundsType.AXIS_ALIGNED_BOX;
    }
    Object.defineProperty(Mesh.prototype, "animator", {
        /**
         * Defines the animator of the mesh. Act on the mesh's geometry.  Default value is <code>null</code>.
         */
        get: function () {
            return this._animator;
        },
        set: function (value) {
            if (this._animator)
                this._animator.removeOwner(this);
            this._animator = value;
            var len = this._subMeshes.length;
            var subMesh;
            for (var i = 0; i < len; ++i) {
                subMesh = this._subMeshes[i];
                // cause material to be unregistered and registered again to work with the new animation type (if possible)
                if (subMesh.material) {
                    subMesh.material.iRemoveOwner(subMesh);
                    subMesh.material.iAddOwner(subMesh);
                }
                //invalidate any existing renderables in case they need to pull new geometry
                subMesh._iInvalidateRenderableGeometry();
            }
            if (this._animator)
                this._animator.addOwner(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mesh.prototype, "assetType", {
        /**
         *
         */
        get: function () {
            return Mesh.assetType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mesh.prototype, "castsShadows", {
        /**
         * Indicates whether or not the Mesh can cast shadows. Default value is <code>true</code>.
         */
        get: function () {
            return this._castsShadows;
        },
        set: function (value) {
            this._castsShadows = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mesh.prototype, "geometry", {
        /**
         * The geometry used by the mesh that provides it with its shape.
         */
        get: function () {
            if (this._iSourcePrefab)
                this._iSourcePrefab._iValidate();
            return this._geometry;
        },
        set: function (value) {
            var i;
            if (this._geometry) {
                this._geometry.removeEventListener(GeometryEvent.BOUNDS_INVALID, this._onGeometryBoundsInvalidDelegate);
                this._geometry.removeEventListener(GeometryEvent.SUB_GEOMETRY_ADDED, this._onSubGeometryAddedDelegate);
                this._geometry.removeEventListener(GeometryEvent.SUB_GEOMETRY_REMOVED, this._onSubGeometryRemovedDelegate);
                for (i = 0; i < this._subMeshes.length; ++i)
                    this._subMeshes[i].dispose();
                this._subMeshes.length = 0;
            }
            this._geometry = value;
            if (this._geometry) {
                this._geometry.addEventListener(GeometryEvent.BOUNDS_INVALID, this._onGeometryBoundsInvalidDelegate);
                this._geometry.addEventListener(GeometryEvent.SUB_GEOMETRY_ADDED, this._onSubGeometryAddedDelegate);
                this._geometry.addEventListener(GeometryEvent.SUB_GEOMETRY_REMOVED, this._onSubGeometryRemovedDelegate);
                var subGeoms = this._geometry.subGeometries;
                for (i = 0; i < subGeoms.length; ++i)
                    this.addSubMesh(subGeoms[i]);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mesh.prototype, "material", {
        /**
         * The material with which to render the Mesh.
         */
        get: function () {
            return this._material;
        },
        set: function (value) {
            if (value == this._material)
                return;
            var i;
            var len = this._subMeshes.length;
            var subMesh;
            for (i = 0; i < len; i++)
                if (this._material && (subMesh = this._subMeshes[i]).material == this._material)
                    this._material.iRemoveOwner(subMesh);
            this._material = value;
            for (i = 0; i < len; i++)
                if (this._material && (subMesh = this._subMeshes[i]).material == this._material)
                    this._material.iAddOwner(subMesh);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mesh.prototype, "shareAnimationGeometry", {
        /**
         * Indicates whether or not the mesh share the same animation geometry.
         */
        get: function () {
            return this._shareAnimationGeometry;
        },
        set: function (value) {
            this._shareAnimationGeometry = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mesh.prototype, "subMeshes", {
        /**
         * The SubMeshes out of which the Mesh consists. Every SubMesh can be assigned a material to override the Mesh's
         * material.
         */
        get: function () {
            // Since this getter is invoked every iteration of the render loop, and
            // the prefab construct could affect the sub-meshes, the prefab is
            // validated here to give it a chance to rebuild.
            if (this._iSourcePrefab)
                this._iSourcePrefab._iValidate();
            return this._subMeshes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mesh.prototype, "uvTransform", {
        /**
         *
         */
        get: function () {
            return this._uvTransform;
        },
        set: function (value) {
            this._uvTransform = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     */
    Mesh.prototype.bakeTransformations = function () {
        this.geometry.applyTransformation(this._iMatrix3D);
        this._iMatrix3D.identity();
    };
    /**
     * @inheritDoc
     */
    Mesh.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.material = null;
        this.geometry = null;
    };
    /**
     * Disposes mesh including the animator and children. This is a merely a convenience method.
     * @return
     */
    Mesh.prototype.disposeWithAnimatorAndChildren = function () {
        this.disposeWithChildren();
        if (this._animator)
            this._animator.dispose();
    };
    /**
     * Clones this Mesh instance along with all it's children, while re-using the same
     * material, geometry and animation set. The returned result will be a copy of this mesh,
     * containing copies of all of it's children.
     *
     * Properties that are re-used (i.e. not cloned) by the new copy include name,
     * geometry, and material. Properties that are cloned or created anew for the copy
     * include subMeshes, children of the mesh, and the animator.
     *
     * If you want to copy just the mesh, reusing it's geometry and material while not
     * cloning it's children, the simplest way is to create a new mesh manually:
     *
     * <code>
     * var clone : Mesh = new Mesh(original.geometry, original.material);
     * </code>
     */
    Mesh.prototype.clone = function () {
        var clone = new Mesh(this._geometry, this._material);
        clone._iMatrix3D = this._iMatrix3D;
        clone.pivot = this.pivot;
        clone.partition = this.partition;
        clone.boundsType = this.boundsType;
        clone.name = this.name;
        clone.castsShadows = this.castsShadows;
        clone.shareAnimationGeometry = this.shareAnimationGeometry;
        clone.mouseEnabled = this.mouseEnabled;
        clone.mouseChildren = this.mouseChildren;
        //this is of course no proper cloning
        //maybe use this instead?: http://blog.another-d-mention.ro/programming/how-to-clone-duplicate-an-object-in-actionscript-3/
        clone.extra = this.extra;
        clone._iMasks = this._iMasks;
        clone._iMaskID = this._iMaskID;
        var len = this._subMeshes.length;
        for (var i = 0; i < len; ++i)
            clone._subMeshes[i].material = this._subMeshes[i]._iGetExplicitMaterial();
        len = this.numChildren;
        var obj;
        for (i = 0; i < len; ++i) {
            obj = this.getChildAt(i).clone();
            clone.addChild(obj);
        }
        if (this._animator)
            clone.animator = this._animator.clone();
        return clone;
    };
    /**
     * //TODO
     *
     * @param subGeometry
     * @returns {SubMeshBase}
     */
    Mesh.prototype.getSubMeshFromSubGeometry = function (subGeometry) {
        return this._subMeshes[this._geometry.subGeometries.indexOf(subGeometry)];
    };
    /**
     * //TODO
     *
     * @protected
     */
    Mesh.prototype._pUpdateBoxBounds = function () {
        _super.prototype._pUpdateBoxBounds.call(this);
        var i, j, p, len;
        var subGeoms = this._geometry.subGeometries;
        var subGeom;
        var boundingPositions;
        var numSubGeoms = subGeoms.length;
        var minX, minY, minZ;
        var maxX, maxY, maxZ;
        if (numSubGeoms > 0) {
            i = 0;
            subGeom = subGeoms[0];
            boundingPositions = subGeom.getBoundingPositions();
            minX = maxX = boundingPositions[i];
            minY = maxY = boundingPositions[i + 1];
            minZ = maxZ = boundingPositions[i + 2];
            for (j = 0; j < numSubGeoms; j++) {
                subGeom = subGeoms[j];
                boundingPositions = subGeom.getBoundingPositions();
                len = boundingPositions.length;
                for (i = 0; i < len; i += 3) {
                    p = boundingPositions[i];
                    if (p < minX)
                        minX = p;
                    else if (p > maxX)
                        maxX = p;
                    p = boundingPositions[i + 1];
                    if (p < minY)
                        minY = p;
                    else if (p > maxY)
                        maxY = p;
                    p = boundingPositions[i + 2];
                    if (p < minZ)
                        minZ = p;
                    else if (p > maxZ)
                        maxZ = p;
                }
            }
            this._pBoxBounds.width = maxX - (this._pBoxBounds.x = minX);
            this._pBoxBounds.height = maxY - (this._pBoxBounds.y = minY);
            this._pBoxBounds.depth = maxZ - (this._pBoxBounds.z = minZ);
        }
        else {
            this._pBoxBounds.setEmpty();
        }
    };
    Mesh.prototype._pUpdateSphereBounds = function () {
        _super.prototype._pUpdateSphereBounds.call(this);
        var box = this.getBox();
        var centerX = box.x + box.width / 2;
        var centerY = box.y + box.height / 2;
        var centerZ = box.z + box.depth / 2;
        var i, j, p, len;
        var subGeoms = this._geometry.subGeometries;
        var subGeom;
        var boundingPositions;
        var numSubGeoms = subGeoms.length;
        var maxRadiusSquared = 0;
        var radiusSquared;
        var distanceX;
        var distanceY;
        var distanceZ;
        if (numSubGeoms > 0) {
            i = 0;
            subGeom = subGeoms[0];
            boundingPositions = subGeom.getBoundingPositions();
            for (j = 0; j < numSubGeoms; j++) {
                subGeom = subGeoms[j];
                boundingPositions = subGeom.getBoundingPositions();
                len = boundingPositions.length;
                for (i = 0; i < len; i += 3) {
                    distanceX = boundingPositions[i] - centerX;
                    distanceY = boundingPositions[i + 1] - centerY;
                    distanceZ = boundingPositions[i + 2] - centerZ;
                    radiusSquared = distanceX * distanceX + distanceY * distanceY + distanceZ * distanceZ;
                    if (maxRadiusSquared < radiusSquared)
                        maxRadiusSquared = radiusSquared;
                }
            }
        }
        this._pSphereBounds.x = centerX;
        this._pSphereBounds.y = centerY;
        this._pSphereBounds.z = centerZ;
        this._pSphereBounds.radius = Math.sqrt(maxRadiusSquared);
    };
    /**
     * //TODO
     *
     * @private
     */
    Mesh.prototype.onGeometryBoundsInvalid = function (event) {
        this._pInvalidateBounds();
    };
    /**
     * Called when a SubGeometry was added to the Geometry.
     *
     * @private
     */
    Mesh.prototype.onSubGeometryAdded = function (event) {
        this.addSubMesh(event.subGeometry);
    };
    /**
     * Called when a SubGeometry was removed from the Geometry.
     *
     * @private
     */
    Mesh.prototype.onSubGeometryRemoved = function (event) {
        var subMesh;
        var subGeom = event.subGeometry;
        var len = this._subMeshes.length;
        var i;
        for (i = 0; i < len; ++i) {
            subMesh = this._subMeshes[i];
            if (subMesh.subGeometry == subGeom) {
                subMesh.dispose();
                this._subMeshes.splice(i, 1);
                break;
            }
        }
        --len;
        for (; i < len; ++i)
            this._subMeshes[i]._iIndex = i;
    };
    /**
     * Adds a SubMeshBase wrapping a SubGeometry.
     *
     * @param subGeometry
     */
    Mesh.prototype.addSubMesh = function (subGeometry) {
        var SubMeshClass = SubMeshPool.getSubMeshClass(subGeometry);
        var subMesh = new SubMeshClass(subGeometry, this, null);
        var len = this._subMeshes.length;
        subMesh._iIndex = len;
        this._subMeshes[len] = subMesh;
        this._pInvalidateBounds();
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
    Mesh.prototype._iTestCollision = function (shortestCollisionDistance, findClosest) {
        return this._pPickingCollider.testMeshCollision(this, this._pPickingCollisionVO, shortestCollisionDistance, findClosest);
    };
    /**
     *
     * @param renderer
     *
     * @internal
     */
    Mesh.prototype._iCollectRenderables = function (rendererPool) {
        // Since this getter is invoked every iteration of the render loop, and
        // the prefab construct could affect the sub-meshes, the prefab is
        // validated here to give it a chance to rebuild.
        if (this._iSourcePrefab)
            this._iSourcePrefab._iValidate();
        var len = this._subMeshes.length;
        for (var i = 0; i < len; i++)
            this._subMeshes[i]._iCollectRenderable(rendererPool);
    };
    Mesh.prototype._iInvalidateRenderableGeometries = function () {
        var len = this._subMeshes.length;
        for (var i = 0; i < len; ++i)
            this._subMeshes[i]._iInvalidateRenderableGeometry();
    };
    Mesh.prototype._pRegisterEntity = function (partition) {
        partition._iRegisterEntity(this);
    };
    Mesh.prototype._pUnregisterEntity = function (partition) {
        partition._iUnregisterEntity(this);
    };
    Mesh.assetType = "[asset Mesh]";
    return Mesh;
})(DisplayObjectContainer);
module.exports = Mesh;


},{"awayjs-core/lib/data/Geometry":undefined,"awayjs-core/lib/events/GeometryEvent":undefined,"awayjs-display/lib/bounds/BoundsType":"awayjs-display/lib/bounds/BoundsType","awayjs-display/lib/containers/DisplayObjectContainer":"awayjs-display/lib/containers/DisplayObjectContainer","awayjs-display/lib/pool/SubMeshPool":"awayjs-display/lib/pool/SubMeshPool"}],"awayjs-display/lib/entities/PointLight":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Matrix3D = require("awayjs-core/lib/geom/Matrix3D");
var Vector3D = require("awayjs-core/lib/geom/Vector3D");
var LightBase = require("awayjs-display/lib/base/LightBase");
var BoundsType = require("awayjs-display/lib/bounds/BoundsType");
var CubeMapShadowMapper = require("awayjs-display/lib/materials/shadowmappers/CubeMapShadowMapper");
var PointLight = (function (_super) {
    __extends(PointLight, _super);
    function PointLight() {
        _super.call(this);
        this._pRadius = 90000;
        this._pFallOff = 100000;
        this._pIsEntity = true;
        this._pFallOffFactor = 1 / (this._pFallOff * this._pFallOff - this._pRadius * this._pRadius);
        //default bounds type
        this._boundsType = BoundsType.SPHERE;
    }
    PointLight.prototype.pCreateShadowMapper = function () {
        return new CubeMapShadowMapper();
    };
    Object.defineProperty(PointLight.prototype, "radius", {
        get: function () {
            return this._pRadius;
        },
        set: function (value) {
            this._pRadius = value;
            if (this._pRadius < 0) {
                this._pRadius = 0;
            }
            else if (this._pRadius > this._pFallOff) {
                this._pFallOff = this._pRadius;
                this._pInvalidateBounds();
            }
            this._pFallOffFactor = 1 / (this._pFallOff * this._pFallOff - this._pRadius * this._pRadius);
        },
        enumerable: true,
        configurable: true
    });
    PointLight.prototype.iFallOffFactor = function () {
        return this._pFallOffFactor;
    };
    Object.defineProperty(PointLight.prototype, "fallOff", {
        get: function () {
            return this._pFallOff;
        },
        set: function (value) {
            this._pFallOff = value;
            if (this._pFallOff < 0)
                this._pFallOff = 0;
            if (this._pFallOff < this._pRadius)
                this._pRadius = this._pFallOff;
            this._pFallOffFactor = 1 / (this._pFallOff * this._pFallOff - this._pRadius * this._pRadius);
            this._pInvalidateBounds();
        },
        enumerable: true,
        configurable: true
    });
    PointLight.prototype._pUpdateSphereBounds = function () {
        _super.prototype._pUpdateSphereBounds.call(this);
        this._pSphereBounds.radius = this._pFallOff;
    };
    PointLight.prototype.iGetObjectProjectionMatrix = function (entity, camera, target) {
        if (target === void 0) { target = null; }
        var raw = new Array(16);
        var m = new Matrix3D();
        // todo: do not use lookAt on Light
        m.copyFrom(entity.getRenderSceneTransform(camera));
        m.append(this._pParent.inverseSceneTransform);
        this.lookAt(m.position);
        m.copyFrom(entity.getRenderSceneTransform(camera));
        m.append(this.inverseSceneTransform);
        var box = entity.getBox();
        var v1 = m.deltaTransformVector(new Vector3D(box.left, box.bottom, box.front));
        var v2 = m.deltaTransformVector(new Vector3D(box.right, box.top, box.back));
        var d1 = v1.x * v1.x + v1.y * v1.y + v1.z * v1.z;
        var d2 = v2.x * v2.x + v2.y * v2.y + v2.z * v2.z;
        var d = Math.sqrt(d1 > d2 ? d1 : d2);
        var zMin;
        var zMax;
        var z = m.rawData[14];
        zMin = z - d;
        zMax = z + d;
        raw[5] = raw[0] = zMin / d;
        raw[10] = zMax / (zMax - zMin);
        raw[11] = 1;
        raw[1] = raw[2] = raw[3] = raw[4] = raw[6] = raw[7] = raw[8] = raw[9] = raw[12] = raw[13] = raw[15] = 0;
        raw[14] = -zMin * raw[10];
        if (!target)
            target = new Matrix3D();
        target.copyRawDataFrom(raw);
        target.prepend(m);
        return target;
    };
    PointLight.prototype._iCollectRenderables = function (rendererPool) {
        //nothing to do here
    };
    PointLight.prototype._pRegisterEntity = function (partition) {
        partition._iRegisterPointLight(this);
    };
    PointLight.prototype._pUnregisterEntity = function (partition) {
        partition._iUnregisterPointLight(this);
    };
    return PointLight;
})(LightBase);
module.exports = PointLight;


},{"awayjs-core/lib/geom/Matrix3D":undefined,"awayjs-core/lib/geom/Vector3D":undefined,"awayjs-display/lib/base/LightBase":"awayjs-display/lib/base/LightBase","awayjs-display/lib/bounds/BoundsType":"awayjs-display/lib/bounds/BoundsType","awayjs-display/lib/materials/shadowmappers/CubeMapShadowMapper":"awayjs-display/lib/materials/shadowmappers/CubeMapShadowMapper"}],"awayjs-display/lib/entities/Shape":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var DisplayObject = require("awayjs-display/lib/base/DisplayObject");
/**
 * This class is used to create lightweight shapes using the ActionScript
 * drawing application program interface(API). The Shape class includes a
 * <code>graphics</code> property, which lets you access methods from the
 * Graphics class.
 *
 * <p>The Sprite class also includes a <code>graphics</code>property, and it
 * includes other features not available to the Shape class. For example, a
 * Sprite object is a display object container, whereas a Shape object is not
 * (and cannot contain child display objects). For this reason, Shape objects
 * consume less memory than Sprite objects that contain the same graphics.
 * However, a Sprite object supports user input events, while a Shape object
 * does not.</p>
 */
var Shape = (function (_super) {
    __extends(Shape, _super);
    /**
     * Creates a new Shape object.
     */
    function Shape() {
        _super.call(this);
    }
    Object.defineProperty(Shape.prototype, "graphics", {
        /**
         * Specifies the Graphics object belonging to this Shape object, where vector
         * drawing commands can occur.
         */
        get: function () {
            return this._graphics;
        },
        enumerable: true,
        configurable: true
    });
    return Shape;
})(DisplayObject);
module.exports = Shape;


},{"awayjs-display/lib/base/DisplayObject":"awayjs-display/lib/base/DisplayObject"}],"awayjs-display/lib/entities/Skybox":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BlendMode = require("awayjs-core/lib/data/BlendMode");
var DisplayObject = require("awayjs-display/lib/base/DisplayObject");
var BoundsType = require("awayjs-display/lib/bounds/BoundsType");
/**
 * A Skybox class is used to render a sky in the scene. It's always considered static and 'at infinity', and as
 * such it's always centered at the camera's position and sized to exactly fit within the camera's frustum, ensuring
 * the sky box is always as large as possible without being clipped.
 */
var Skybox = (function (_super) {
    __extends(Skybox, _super);
    /**
     * Create a new Skybox object.
     *
     * @param material	The material with which to render the Skybox.
     */
    function Skybox(cubeMap) {
        if (cubeMap === void 0) { cubeMap = null; }
        _super.call(this);
        this._pAlphaThreshold = 0;
        this._pBlendMode = BlendMode.NORMAL;
        this._renderObjects = new Array();
        this._renderables = new Array();
        this._mipmap = false;
        this._smooth = true;
        this._pIsEntity = true;
        this._owners = new Array(this);
        this.cubeMap = cubeMap;
        //default bounds type
        this._boundsType = BoundsType.NULL;
    }
    Object.defineProperty(Skybox.prototype, "alphaThreshold", {
        /**
         * The minimum alpha value for which pixels should be drawn. This is used for transparency that is either
         * invisible or entirely opaque, often used with textures for foliage, etc.
         * Recommended values are 0 to disable alpha, or 0.5 to create smooth edges. Default value is 0 (disabled).
         */
        get: function () {
            return this._pAlphaThreshold;
        },
        set: function (value) {
            if (value < 0)
                value = 0;
            else if (value > 1)
                value = 1;
            if (this._pAlphaThreshold == value)
                return;
            this._pAlphaThreshold = value;
            this._pIinvalidatePasses();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Skybox.prototype, "mipmap", {
        /**
         * Indicates whether or not the Skybox texture should use mipmapping. Defaults to false.
         */
        get: function () {
            return this._mipmap;
        },
        set: function (value) {
            if (this._mipmap == value)
                return;
            this._mipmap = value;
            this._pIinvalidatePasses();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Skybox.prototype, "smooth", {
        /**
         * Indicates whether or not the Skybox texture should use smoothing. Defaults to true.
         */
        get: function () {
            return this._smooth;
        },
        set: function (value) {
            if (this._smooth == value)
                return;
            this._smooth = value;
            this._pIinvalidatePasses();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Skybox.prototype, "lightPicker", {
        /**
         * The light picker used by the material to provide lights to the material if it supports lighting.
         *
         * @see LightPickerBase
         * @see StaticLightPicker
         */
        get: function () {
            return this._pLightPicker;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Skybox.prototype, "animationSet", {
        /**
         *
         */
        get: function () {
            return this._animationSet;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Skybox.prototype, "blendMode", {
        /**
         * The blend mode to use when drawing this renderable. The following blend modes are supported:
         * <ul>
         * <li>BlendMode.NORMAL: No blending, unless the material inherently needs it</li>
         * <li>BlendMode.LAYER: Force blending. This will draw the object the same as NORMAL, but without writing depth writes.</li>
         * <li>BlendMode.MULTIPLY</li>
         * <li>BlendMode.ADD</li>
         * <li>BlendMode.ALPHA</li>
         * </ul>
         */
        get: function () {
            return this._pBlendMode;
        },
        set: function (value) {
            if (this._pBlendMode == value)
                return;
            this._pBlendMode = value;
            this._pInvalidateRenderObject();
        },
        enumerable: true,
        configurable: true
    });
    Skybox.prototype._pInvalidateRenderObject = function () {
        var len = this._renderObjects.length;
        for (var i = 0; i < len; i++)
            this._renderObjects[i].invalidateRenderObject();
    };
    /**
     * Marks the shader programs for all passes as invalid, so they will be recompiled before the next use.
     *
     * @private
     */
    Skybox.prototype._pIinvalidatePasses = function () {
        var len = this._renderObjects.length;
        for (var i = 0; i < len; i++)
            this._renderObjects[i].invalidatePasses();
    };
    Object.defineProperty(Skybox.prototype, "iOwners", {
        /**
         * A list of the IRenderableOwners that use this material
         *
         * @private
         */
        get: function () {
            return this._owners;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Skybox.prototype, "animator", {
        get: function () {
            return this._animator;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Skybox.prototype, "uvTransform", {
        /**
         *
         */
        get: function () {
            return this._uvTransform;
        },
        set: function (value) {
            this._uvTransform = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Skybox.prototype, "cubeMap", {
        /**
        * The cube texture to use as the skybox.
        */
        get: function () {
            return this._cubeMap;
        },
        set: function (value) {
            if (value && this._cubeMap && (value.format != this._cubeMap.format))
                this._pInvalidateRenderObject();
            this._cubeMap = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Skybox.prototype, "assetType", {
        get: function () {
            return Skybox.assetType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Skybox.prototype, "castsShadows", {
        get: function () {
            return false; //TODO
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Cleans up resources owned by the material, including passes. Textures are not owned by the material since they
     * could be used by other materials and will not be disposed.
     */
    Skybox.prototype.dispose = function () {
        var i;
        var len;
        len = this._renderObjects.length;
        for (i = 0; i < len; i++)
            this._renderObjects[i].dispose();
        this._renderObjects = new Array();
        var len = this._renderables.length;
        for (var i = 0; i < len; i++)
            this._renderables[i].dispose();
        this._renderables = new Array();
    };
    Skybox.prototype._iCollectRenderables = function (rendererPool) {
        //skybox do not get collected in the standard entity list
    };
    Skybox.prototype._iCollectRenderable = function (rendererPool) {
    };
    Skybox.prototype._iAddRenderObject = function (renderObject) {
        this._renderObjects.push(renderObject);
        return renderObject;
    };
    Skybox.prototype._iRemoveRenderObject = function (renderObject) {
        this._renderObjects.splice(this._renderObjects.indexOf(renderObject), 1);
        return renderObject;
    };
    Skybox.prototype._iAddRenderable = function (renderable) {
        this._renderables.push(renderable);
        return renderable;
    };
    Skybox.prototype._iRemoveRenderable = function (renderable) {
        var index = this._renderables.indexOf(renderable);
        this._renderables.splice(index, 1);
        return renderable;
    };
    /**
     *
     * @param renderer
     *
     * @internal
     */
    Skybox.prototype.getRenderObject = function (renderablePool) {
        return renderablePool.getSkyboxRenderObject(this);
    };
    Skybox.prototype._pRegisterEntity = function (partition) {
        partition._iRegisterSkybox(this);
    };
    Skybox.prototype._pUnregisterEntity = function (partition) {
        partition._iUnregisterSkybox(this);
    };
    Skybox.assetType = "[asset Skybox]";
    return Skybox;
})(DisplayObject);
module.exports = Skybox;


},{"awayjs-core/lib/data/BlendMode":undefined,"awayjs-display/lib/base/DisplayObject":"awayjs-display/lib/base/DisplayObject","awayjs-display/lib/bounds/BoundsType":"awayjs-display/lib/bounds/BoundsType"}],"awayjs-display/lib/entities/TextField":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Mesh = require("awayjs-display/lib/entities/Mesh");
var Geometry = require("awayjs-core/lib/data/Geometry");
var CurveSubGeometry = require("awayjs-core/lib/data/CurveSubGeometry");
/**
 * The TextField class is used to create display objects for text display and
 * input. <ph outputclass="flexonly">You can use the TextField class to
 * perform low-level text rendering. However, in Flex, you typically use the
 * Label, Text, TextArea, and TextInput controls to process text. <ph
 * outputclass="flashonly">You can give a text field an instance name in the
 * Property inspector and use the methods and properties of the TextField
 * class to manipulate it with ActionScript. TextField instance names are
 * displayed in the Movie Explorer and in the Insert Target Path dialog box in
 * the Actions panel.
 *
 * <p>To create a text field dynamically, use the <code>TextField()</code>
 * constructor.</p>
 *
 * <p>The methods of the TextField class let you set, select, and manipulate
 * text in a dynamic or input text field that you create during authoring or
 * at runtime. </p>
 *
 * <p>ActionScript provides several ways to format your text at runtime. The
 * TextFormat class lets you set character and paragraph formatting for
 * TextField objects. You can apply Cascading Style Sheets(CSS) styles to
 * text fields by using the <code>TextField.styleSheet</code> property and the
 * StyleSheet class. You can use CSS to style built-in HTML tags, define new
 * formatting tags, or apply styles. You can assign HTML formatted text, which
 * optionally uses CSS styles, directly to a text field. HTML text that you
 * assign to a text field can contain embedded media(movie clips, SWF files,
 * GIF files, PNG files, and JPEG files). The text wraps around the embedded
 * media in the same way that a web browser wraps text around media embedded
 * in an HTML document. </p>
 *
 * <p>Flash Player supports a subset of HTML tags that you can use to format
 * text. See the list of supported HTML tags in the description of the
 * <code>htmlText</code> property.</p>
 *
 * @event change                    Dispatched after a control value is
 *                                  modified, unlike the
 *                                  <code>textInput</code> event, which is
 *                                  dispatched before the value is modified.
 *                                  Unlike the W3C DOM Event Model version of
 *                                  the <code>change</code> event, which
 *                                  dispatches the event only after the
 *                                  control loses focus, the ActionScript 3.0
 *                                  version of the <code>change</code> event
 *                                  is dispatched any time the control
 *                                  changes. For example, if a user types text
 *                                  into a text field, a <code>change</code>
 *                                  event is dispatched after every keystroke.
 * @event link                      Dispatched when a user clicks a hyperlink
 *                                  in an HTML-enabled text field, where the
 *                                  URL begins with "event:". The remainder of
 *                                  the URL after "event:" is placed in the
 *                                  text property of the LINK event.
 *
 *                                  <p><b>Note:</b> The default behavior,
 *                                  adding the text to the text field, occurs
 *                                  only when Flash Player generates the
 *                                  event, which in this case happens when a
 *                                  user attempts to input text. You cannot
 *                                  put text into a text field by sending it
 *                                  <code>textInput</code> events.</p>
 * @event scroll                    Dispatched by a TextField object
 *                                  <i>after</i> the user scrolls.
 * @event textInput                 Flash Player dispatches the
 *                                  <code>textInput</code> event when a user
 *                                  enters one or more characters of text.
 *                                  Various text input methods can generate
 *                                  this event, including standard keyboards,
 *                                  input method editors(IMEs), voice or
 *                                  speech recognition systems, and even the
 *                                  act of pasting plain text with no
 *                                  formatting or style information.
 * @event textInteractionModeChange Flash Player dispatches the
 *                                  <code>textInteractionModeChange</code>
 *                                  event when a user changes the interaction
 *                                  mode of a text field. for example on
 *                                  Android, one can toggle from NORMAL mode
 *                                  to SELECTION mode using context menu
 *                                  options
 */
var TextField = (function (_super) {
    __extends(TextField, _super);
    /**
     * Creates a new TextField instance. After you create the TextField instance,
     * call the <code>addChild()</code> or <code>addChildAt()</code> method of
     * the parent DisplayObjectContainer object to add the TextField instance to
     * the display list.
     *
     * <p>The default size for a text field is 100 x 100 pixels.</p>
     */
    function TextField() {
        _super.call(this, new Geometry());
        this._text = "";
    }
    Object.defineProperty(TextField.prototype, "assetType", {
        /**
         *
         * @returns {string}
         */
        get: function () {
            return TextField.assetType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "bottomScrollV", {
        /**
         * An integer(1-based index) that indicates the bottommost line that is
         * currently visible in the specified text field. Think of the text field as
         * a window onto a block of text. The <code>scrollV</code> property is the
         * 1-based index of the topmost visible line in the window.
         *
         * <p>All the text between the lines indicated by <code>scrollV</code> and
         * <code>bottomScrollV</code> is currently visible in the text field.</p>
         */
        get: function () {
            return this._bottomScrollV;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "caretIndex", {
        /**
         * The index of the insertion point(caret) position. If no insertion point
         * is displayed, the value is the position the insertion point would be if
         * you restored focus to the field(typically where the insertion point last
         * was, or 0 if the field has not had focus).
         *
         * <p>Selection span indexes are zero-based(for example, the first position
         * is 0, the second position is 1, and so on).</p>
         */
        get: function () {
            return this._caretIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "length", {
        /**
         * The number of characters in a text field. A character such as tab
         * (<code>\t</code>) counts as one character.
         */
        get: function () {
            return this._length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * The maximum value of <code>scrollH</code>.
     */
    TextField.prototype.maxScrollH = function () {
        return this._maxScrollH;
    };
    /**
     * The maximum value of <code>scrollV</code>.
     */
    TextField.prototype.maxScrollV = function () {
        return this._maxScrollV;
    };
    Object.defineProperty(TextField.prototype, "numLines", {
        /**
         * Defines the number of text lines in a multiline text field. If
         * <code>wordWrap</code> property is set to <code>true</code>, the number of
         * lines increases when text wraps.
         */
        get: function () {
            return this._numLines;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "selectionBeginIndex", {
        /**
         * The zero-based character index value of the first character in the current
         * selection. For example, the first character is 0, the second character is
         * 1, and so on. If no text is selected, this property is the value of
         * <code>caretIndex</code>.
         */
        get: function () {
            return this._selectionBeginIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "selectionEndIndex", {
        /**
         * The zero-based character index value of the last character in the current
         * selection. For example, the first character is 0, the second character is
         * 1, and so on. If no text is selected, this property is the value of
         * <code>caretIndex</code>.
         */
        get: function () {
            return this._selectionEndIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "text", {
        /**
         * A string that is the current text in the text field. Lines are separated
         * by the carriage return character(<code>'\r'</code>, ASCII 13). This
         * property contains unformatted text in the text field, without HTML tags.
         *
         * <p>To get the text in HTML form, use the <code>htmlText</code>
         * property.</p>
         */
        get: function () {
            return this._text;
        },
        set: function (value) {
            if (this._text == value)
                return;
            this._text = value;
            this.reConstruct();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "textFormat", {
        get: function () {
            return this._textFormat;
        },
        set: function (value) {
            if (this._textFormat == value)
                return;
            this._textFormat = value;
            this.reConstruct();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "textHeight", {
        /**
         * The height of the text in pixels.
         */
        get: function () {
            return this._textHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "textInteractionMode", {
        /**
         * The interaction mode property, Default value is
         * TextInteractionMode.NORMAL. On mobile platforms, the normal mode implies
         * that the text can be scrolled but not selected. One can switch to the
         * selectable mode through the in-built context menu on the text field. On
         * Desktop, the normal mode implies that the text is in scrollable as well as
         * selection mode.
         */
        get: function () {
            return this._textInteractionMode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "textWidth", {
        /**
         * The width of the text in pixels.
         */
        get: function () {
            return this._textWidth;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Reconstructs the Geometry for this Text-field.
     */
    TextField.prototype.reConstruct = function () {
        for (var i = this.geometry.subGeometries.length - 1; i >= 0; i--)
            this.geometry.removeSubGeometry(this.geometry.subGeometries[i]);
        if (this._textFormat == null) {
            return;
        }
        if (this._text == "") {
            return;
        }
        var indices = new Array();
        var positions = new Array();
        var curveData = new Array();
        var uvs = new Array();
        var char_scale = this._textFormat.size / this._textFormat.font_table.get_font_em_size();
        var tri_idx_offset = 0;
        var tri_cnt = 0;
        var x_offset = 0;
        var y_offset = 0;
        var prev_char = null;
        for (var i = 0; i < this.text.length; i++) {
            var this_char = this._textFormat.font_table.get_subgeo_for_char(this._text.charCodeAt(i).toString());
            if (this_char != null) {
                var this_subGeom = this_char.subgeom;
                if (this_subGeom != null) {
                    tri_cnt = 0;
                    var indices2 = this_subGeom.indices;
                    var positions2 = this_subGeom.positions;
                    var curveData2 = this_subGeom.curves;
                    for (var v = 0; v < indices2.length; v++) {
                        indices.push(indices2[v] + tri_idx_offset);
                        tri_cnt++;
                    }
                    tri_idx_offset += tri_cnt;
                    for (v = 0; v < positions2.length / 3; v++) {
                        positions.push((positions2[v * 3] * char_scale) + x_offset);
                        positions.push((positions2[v * 3 + 1] * char_scale * -1) + y_offset);
                        positions.push(positions2[v * 3 + 2]);
                        curveData.push(curveData2[v * 2]);
                        curveData.push(curveData2[v * 2 + 1]);
                        uvs.push(this._textFormat.uv_values[0]);
                        uvs.push(this._textFormat.uv_values[1]);
                    }
                    // find kerning value that has been set for this char_code on previous char (if non exists, kerning_value will stay 0)
                    var kerning_value = 0;
                    if (prev_char != null) {
                        for (var k = 0; k < prev_char.kerningCharCodes.length; k++) {
                            if (prev_char.kerningCharCodes[k] == this._text.charCodeAt(i)) {
                                kerning_value = prev_char.kerningValues[k];
                                break;
                            }
                        }
                    }
                    x_offset += ((this_char.char_width + kerning_value) * char_scale) + this._textFormat.letterSpacing;
                }
                else {
                    // if no char-geometry was found, we insert a "space"
                    x_offset += this._textFormat.font_table.get_font_em_size() * char_scale;
                }
            }
            else {
                // if no char-geometry was found, we insert a "space"
                x_offset += this._textFormat.font_table.get_font_em_size() * char_scale;
            }
        }
        var curve_sub_geom = new CurveSubGeometry(true);
        curve_sub_geom.updateIndices(indices);
        curve_sub_geom.updatePositions(positions);
        curve_sub_geom.updateCurves(curveData);
        curve_sub_geom.updateUVs(uvs);
        this.geometry.addSubGeometry(curve_sub_geom);
        this.subMeshes[0].material = this._textFormat.material;
    };
    /**
     * Appends the string specified by the <code>newText</code> parameter to the
     * end of the text of the text field. This method is more efficient than an
     * addition assignment(<code>+=</code>) on a <code>text</code> property
     * (such as <code>someTextField.text += moreText</code>), particularly for a
     * text field that contains a significant amount of content.
     *
     * @param newText The string to append to the existing text.
     */
    TextField.prototype.appendText = function (newText) {
        this._text += newText;
    };
    /**
     * *tells the Textfield that a paragraph is defined completly.
     * e.g. the textfield will start a new line for future added text.
     */
    TextField.prototype.closeParagraph = function () {
        //TODO
    };
    /**
     * Returns a rectangle that is the bounding box of the character.
     *
     * @param charIndex The zero-based index value for the character(for
     *                  example, the first position is 0, the second position is
     *                  1, and so on).
     * @return A rectangle with <code>x</code> and <code>y</code> minimum and
     *         maximum values defining the bounding box of the character.
     */
    TextField.prototype.getCharBoundaries = function (charIndex) {
        return this._charBoundaries;
    };
    /**
     * Returns the zero-based index value of the character at the point specified
     * by the <code>x</code> and <code>y</code> parameters.
     *
     * @param x The <i>x</i> coordinate of the character.
     * @param y The <i>y</i> coordinate of the character.
     * @return The zero-based index value of the character(for example, the
     *         first position is 0, the second position is 1, and so on). Returns
     *         -1 if the point is not over any character.
     */
    TextField.prototype.getCharIndexAtPoint = function (x, y) {
        return this._charIndexAtPoint;
    };
    /**
     * Given a character index, returns the index of the first character in the
     * same paragraph.
     *
     * @param charIndex The zero-based index value of the character(for example,
     *                  the first character is 0, the second character is 1, and
     *                  so on).
     * @return The zero-based index value of the first character in the same
     *         paragraph.
     * @throws RangeError The character index specified is out of range.
     */
    TextField.prototype.getFirstCharInParagraph = function (charIndex /*int*/) {
        return this._firstCharInParagraph;
    };
    /**
     * Returns a DisplayObject reference for the given <code>id</code>, for an
     * image or SWF file that has been added to an HTML-formatted text field by
     * using an <code><img></code> tag. The <code><img></code> tag is in the
     * following format:
     *
     * <p><pre xml:space="preserve"><code> <img src = 'filename.jpg' id =
     * 'instanceName' ></code></pre></p>
     *
     * @param id The <code>id</code> to match(in the <code>id</code> attribute
     *           of the <code><img></code> tag).
     * @return The display object corresponding to the image or SWF file with the
     *         matching <code>id</code> attribute in the <code><img></code> tag
     *         of the text field. For media loaded from an external source, this
     *         object is a Loader object, and, once loaded, the media object is a
     *         child of that Loader object. For media embedded in the SWF file,
     *         it is the loaded object. If no <code><img></code> tag with the
     *         matching <code>id</code> exists, the method returns
     *         <code>null</code>.
     */
    TextField.prototype.getImageReference = function (id) {
        return this._imageReference;
    };
    /**
     * Returns the zero-based index value of the line at the point specified by
     * the <code>x</code> and <code>y</code> parameters.
     *
     * @param x The <i>x</i> coordinate of the line.
     * @param y The <i>y</i> coordinate of the line.
     * @return The zero-based index value of the line(for example, the first
     *         line is 0, the second line is 1, and so on). Returns -1 if the
     *         point is not over any line.
     */
    TextField.prototype.getLineIndexAtPoint = function (x, y) {
        return this._lineIndexAtPoint;
    };
    /**
     * Returns the zero-based index value of the line containing the character
     * specified by the <code>charIndex</code> parameter.
     *
     * @param charIndex The zero-based index value of the character(for example,
     *                  the first character is 0, the second character is 1, and
     *                  so on).
     * @return The zero-based index value of the line.
     * @throws RangeError The character index specified is out of range.
     */
    TextField.prototype.getLineIndexOfChar = function (charIndex /*int*/) {
        return this._lineIndexOfChar;
    };
    /**
     * Returns the number of characters in a specific text line.
     *
     * @param lineIndex The line number for which you want the length.
     * @return The number of characters in the line.
     * @throws RangeError The line number specified is out of range.
     */
    TextField.prototype.getLineLength = function (lineIndex /*int*/) {
        return this._lineLength;
    };
    /**
     * Returns metrics information about a given text line.
     *
     * @param lineIndex The line number for which you want metrics information.
     * @return A TextLineMetrics object.
     * @throws RangeError The line number specified is out of range.
     */
    TextField.prototype.getLineMetrics = function (lineIndex /*int*/) {
        return this._lineMetrics;
    };
    /**
     * Returns the character index of the first character in the line that the
     * <code>lineIndex</code> parameter specifies.
     *
     * @param lineIndex The zero-based index value of the line(for example, the
     *                  first line is 0, the second line is 1, and so on).
     * @return The zero-based index value of the first character in the line.
     * @throws RangeError The line number specified is out of range.
     */
    TextField.prototype.getLineOffset = function (lineIndex /*int*/) {
        return this._lineOffset;
    };
    /**
     * Returns the text of the line specified by the <code>lineIndex</code>
     * parameter.
     *
     * @param lineIndex The zero-based index value of the line(for example, the
     *                  first line is 0, the second line is 1, and so on).
     * @return The text string contained in the specified line.
     * @throws RangeError The line number specified is out of range.
     */
    TextField.prototype.getLineText = function (lineIndex /*int*/) {
        return this._lineText;
    };
    /**
     * Given a character index, returns the length of the paragraph containing
     * the given character. The length is relative to the first character in the
     * paragraph(as returned by <code>getFirstCharInParagraph()</code>), not to
     * the character index passed in.
     *
     * @param charIndex The zero-based index value of the character(for example,
     *                  the first character is 0, the second character is 1, and
     *                  so on).
     * @return Returns the number of characters in the paragraph.
     * @throws RangeError The character index specified is out of range.
     */
    TextField.prototype.getParagraphLength = function (charIndex /*int*/) {
        return this._paragraphLength;
    };
    /**
     * Returns a TextFormat object that contains formatting information for the
     * range of text that the <code>beginIndex</code> and <code>endIndex</code>
     * parameters specify. Only properties that are common to the entire text
     * specified are set in the resulting TextFormat object. Any property that is
     * <i>mixed</i>, meaning that it has different values at different points in
     * the text, has a value of <code>null</code>.
     *
     * <p>If you do not specify values for these parameters, this method is
     * applied to all the text in the text field. </p>
     *
     * <p>The following table describes three possible usages:</p>
     *
     * @return The TextFormat object that represents the formatting properties
     *         for the specified text.
     * @throws RangeError The <code>beginIndex</code> or <code>endIndex</code>
     *                    specified is out of range.
     */
    TextField.prototype.getTextFormat = function (beginIndex, endIndex) {
        if (beginIndex === void 0) { beginIndex = -1; }
        if (endIndex === void 0) { endIndex = -1; }
        return this._textFormat;
    };
    /**
     * Replaces the current selection with the contents of the <code>value</code>
     * parameter. The text is inserted at the position of the current selection,
     * using the current default character format and default paragraph format.
     * The text is not treated as HTML.
     *
     * <p>You can use the <code>replaceSelectedText()</code> method to insert and
     * delete text without disrupting the character and paragraph formatting of
     * the rest of the text.</p>
     *
     * <p><b>Note:</b> This method does not work if a style sheet is applied to
     * the text field.</p>
     *
     * @param value The string to replace the currently selected text.
     * @throws Error This method cannot be used on a text field with a style
     *               sheet.
     */
    TextField.prototype.replaceSelectedText = function (value) {
    };
    /**
     * Replaces the range of characters that the <code>beginIndex</code> and
     * <code>endIndex</code> parameters specify with the contents of the
     * <code>newText</code> parameter. As designed, the text from
     * <code>beginIndex</code> to <code>endIndex-1</code> is replaced.
     *
     * <p><b>Note:</b> This method does not work if a style sheet is applied to
     * the text field.</p>
     *
     * @param beginIndex The zero-based index value for the start position of the
     *                   replacement range.
     * @param endIndex   The zero-based index position of the first character
     *                   after the desired text span.
     * @param newText    The text to use to replace the specified range of
     *                   characters.
     * @throws Error This method cannot be used on a text field with a style
     *               sheet.
     */
    TextField.prototype.replaceText = function (beginIndex /*int*/, endIndex /*int*/, newText) {
    };
    /**
     * Sets as selected the text designated by the index values of the first and
     * last characters, which are specified with the <code>beginIndex</code> and
     * <code>endIndex</code> parameters. If the two parameter values are the
     * same, this method sets the insertion point, as if you set the
     * <code>caretIndex</code> property.
     *
     * @param beginIndex The zero-based index value of the first character in the
     *                   selection(for example, the first character is 0, the
     *                   second character is 1, and so on).
     * @param endIndex   The zero-based index value of the last character in the
     *                   selection.
     */
    TextField.prototype.setSelection = function (beginIndex /*int*/, endIndex /*int*/) {
    };
    /**
     * Applies the text formatting that the <code>format</code> parameter
     * specifies to the specified text in a text field. The value of
     * <code>format</code> must be a TextFormat object that specifies the desired
     * text formatting changes. Only the non-null properties of
     * <code>format</code> are applied to the text field. Any property of
     * <code>format</code> that is set to <code>null</code> is not applied. By
     * default, all of the properties of a newly created TextFormat object are
     * set to <code>null</code>.
     *
     * <p><b>Note:</b> This method does not work if a style sheet is applied to
     * the text field.</p>
     *
     * <p>The <code>setTextFormat()</code> method changes the text formatting
     * applied to a range of characters or to the entire body of text in a text
     * field. To apply the properties of format to all text in the text field, do
     * not specify values for <code>beginIndex</code> and <code>endIndex</code>.
     * To apply the properties of the format to a range of text, specify values
     * for the <code>beginIndex</code> and the <code>endIndex</code> parameters.
     * You can use the <code>length</code> property to determine the index
     * values.</p>
     *
     * <p>The two types of formatting information in a TextFormat object are
     * character level formatting and paragraph level formatting. Each character
     * in a text field can have its own character formatting settings, such as
     * font name, font size, bold, and italic.</p>
     *
     * <p>For paragraphs, the first character of the paragraph is examined for
     * the paragraph formatting settings for the entire paragraph. Examples of
     * paragraph formatting settings are left margin, right margin, and
     * indentation.</p>
     *
     * <p>Any text inserted manually by the user, or replaced by the
     * <code>replaceSelectedText()</code> method, receives the default text field
     * formatting for new text, and not the formatting specified for the text
     * insertion point. To set the default formatting for new text, use
     * <code>defaultTextFormat</code>.</p>
     *
     * @param format A TextFormat object that contains character and paragraph
     *               formatting information.
     * @throws Error      This method cannot be used on a text field with a style
     *                    sheet.
     * @throws RangeError The <code>beginIndex</code> or <code>endIndex</code>
     *                    specified is out of range.
     */
    TextField.prototype.setTextFormat = function (format, beginIndex, endIndex) {
        if (beginIndex === void 0) { beginIndex = -1; }
        if (endIndex === void 0) { endIndex = -1; }
    };
    /**
     * Returns true if an embedded font is available with the specified
     * <code>fontName</code> and <code>fontStyle</code> where
     * <code>Font.fontType</code> is <code>flash.text.FontType.EMBEDDED</code>.
     * Starting with Flash Player 10, two kinds of embedded fonts can appear in a
     * SWF file. Normal embedded fonts are only used with TextField objects. CFF
     * embedded fonts are only used with the flash.text.engine classes. The two
     * types are distinguished by the <code>fontType</code> property of the
     * <code>Font</code> class, as returned by the <code>enumerateFonts()</code>
     * function.
     *
     * <p>TextField cannot use a font of type <code>EMBEDDED_CFF</code>. If
     * <code>embedFonts</code> is set to <code>true</code> and the only font
     * available at run time with the specified name and style is of type
     * <code>EMBEDDED_CFF</code>, Flash Player fails to render the text, as if no
     * embedded font were available with the specified name and style.</p>
     *
     * <p>If both <code>EMBEDDED</code> and <code>EMBEDDED_CFF</code> fonts are
     * available with the same name and style, the <code>EMBEDDED</code> font is
     * selected and text renders with the <code>EMBEDDED</code> font.</p>
     *
     * @param fontName  The name of the embedded font to check.
     * @param fontStyle Specifies the font style to check. Use
     *                  <code>flash.text.FontStyle</code>
     * @return <code>true</code> if a compatible embedded font is available,
     *         otherwise <code>false</code>.
     * @throws ArgumentError The <code>fontStyle</code> specified is not a member
     *                       of <code>flash.text.FontStyle</code>.
     */
    TextField.isFontCompatible = function (fontName, fontStyle) {
        return false;
    };
    TextField.assetType = "[asset TextField]";
    return TextField;
})(Mesh);
module.exports = TextField;


},{"awayjs-core/lib/data/CurveSubGeometry":undefined,"awayjs-core/lib/data/Geometry":undefined,"awayjs-display/lib/entities/Mesh":"awayjs-display/lib/entities/Mesh"}],"awayjs-display/lib/errors/CastError":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Error = require("awayjs-core/lib/errors/Error");
var CastError = (function (_super) {
    __extends(CastError, _super);
    function CastError(message) {
        _super.call(this, message);
    }
    return CastError;
})(Error);
module.exports = CastError;


},{"awayjs-core/lib/errors/Error":undefined}],"awayjs-display/lib/events/CameraEvent":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Event = require("awayjs-core/lib/events/Event");
/**
 * @class away.events.CameraEvent
 */
var CameraEvent = (function (_super) {
    __extends(CameraEvent, _super);
    function CameraEvent(type, camera) {
        _super.call(this, type);
        this._camera = camera;
    }
    Object.defineProperty(CameraEvent.prototype, "camera", {
        get: function () {
            return this._camera;
        },
        enumerable: true,
        configurable: true
    });
    CameraEvent.PROJECTION_CHANGED = "projectionChanged";
    return CameraEvent;
})(Event);
module.exports = CameraEvent;


},{"awayjs-core/lib/events/Event":undefined}],"awayjs-display/lib/events/DisplayObjectEvent":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Event = require("awayjs-core/lib/events/Event");
var DisplayObjectEvent = (function (_super) {
    __extends(DisplayObjectEvent, _super);
    function DisplayObjectEvent(type, object) {
        _super.call(this, type);
        this.object = object;
    }
    DisplayObjectEvent.VISIBLITY_UPDATED = "visiblityUpdated";
    DisplayObjectEvent.SCENETRANSFORM_CHANGED = "scenetransformChanged";
    DisplayObjectEvent.SCENE_CHANGED = "sceneChanged";
    DisplayObjectEvent.POSITION_CHANGED = "positionChanged";
    DisplayObjectEvent.ROTATION_CHANGED = "rotationChanged";
    DisplayObjectEvent.SCALE_CHANGED = "scaleChanged";
    return DisplayObjectEvent;
})(Event);
module.exports = DisplayObjectEvent;


},{"awayjs-core/lib/events/Event":undefined}],"awayjs-display/lib/events/LightEvent":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Event = require("awayjs-core/lib/events/Event");
var LightEvent = (function (_super) {
    __extends(LightEvent, _super);
    function LightEvent(type) {
        _super.call(this, type);
    }
    //@override
    LightEvent.prototype.clone = function () {
        return new LightEvent(this.type);
    };
    LightEvent.CASTS_SHADOW_CHANGE = "castsShadowChange";
    return LightEvent;
})(Event);
module.exports = LightEvent;


},{"awayjs-core/lib/events/Event":undefined}],"awayjs-display/lib/events/MaterialEvent":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Event = require("awayjs-core/lib/events/Event");
var MaterialEvent = (function (_super) {
    __extends(MaterialEvent, _super);
    function MaterialEvent(type) {
        _super.call(this, type);
    }
    MaterialEvent.SIZE_CHANGED = "sizeChanged";
    return MaterialEvent;
})(Event);
module.exports = MaterialEvent;


},{"awayjs-core/lib/events/Event":undefined}],"awayjs-display/lib/events/MouseEvent":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Event = require("awayjs-core/lib/events/Event");
/**
 * A MouseEvent is dispatched when a mouse event occurs over a mouseEnabled object in View.
 * TODO: we don't have screenZ data, tho this should be easy to implement
 */
var MouseEvent = (function (_super) {
    __extends(MouseEvent, _super);
    /**
     * Create a new MouseEvent object.
     * @param type The type of the MouseEvent.
     */
    function MouseEvent(type) {
        _super.call(this, type);
        // Private.
        this._iAllowedToPropagate = true;
    }
    Object.defineProperty(MouseEvent.prototype, "bubbles", {
        /**
         * @inheritDoc
         */
        get: function () {
            var doesBubble = this._iAllowedToPropagate;
            this._iAllowedToPropagate = true;
            // Don't bubble if propagation has been stopped.
            return doesBubble;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @inheritDoc
     */
    MouseEvent.prototype.stopPropagation = function () {
        this._iAllowedToPropagate = false;
        if (this._iParentEvent)
            this._iParentEvent.stopPropagation();
    };
    /**
     * @inheritDoc
     */
    MouseEvent.prototype.stopImmediatePropagation = function () {
        this._iAllowedToPropagate = false;
        if (this._iParentEvent)
            this._iParentEvent.stopImmediatePropagation();
    };
    /**
     * Creates a copy of the MouseEvent object and sets the value of each property to match that of the original.
     */
    MouseEvent.prototype.clone = function () {
        var result = new MouseEvent(this.type);
        /* TODO: Debug / test - look into isDefaultPrevented
         if (isDefaultPrevented())
         result.preventDefault();
         */
        result.screenX = this.screenX;
        result.screenY = this.screenY;
        result.view = this.view;
        result.object = this.object;
        result.renderableOwner = this.renderableOwner;
        result.material = this.material;
        result.uv = this.uv;
        result.localPosition = this.localPosition;
        result.localNormal = this.localNormal;
        result.index = this.index;
        result.subGeometryIndex = this.subGeometryIndex;
        result.delta = this.delta;
        result.ctrlKey = this.ctrlKey;
        result.shiftKey = this.shiftKey;
        result._iParentEvent = this;
        result._iAllowedToPropagate = this._iAllowedToPropagate;
        return result;
    };
    Object.defineProperty(MouseEvent.prototype, "scenePosition", {
        /**
         * The position in scene space where the event took place
         */
        get: function () {
            return this.object.sceneTransform.transformVector(this.localPosition);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MouseEvent.prototype, "sceneNormal", {
        /**
         * The normal in scene space where the event took place
         */
        get: function () {
            var sceneNormal = this.object.sceneTransform.deltaTransformVector(this.localNormal);
            sceneNormal.normalize();
            return sceneNormal;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Defines the value of the type property of a mouseOver3d event object.
     */
    MouseEvent.MOUSE_OVER = "mouseOver3d";
    /**
     * Defines the value of the type property of a mouseOut3d event object.
     */
    MouseEvent.MOUSE_OUT = "mouseOut3d";
    /**
     * Defines the value of the type property of a mouseUp3d event object.
     */
    MouseEvent.MOUSE_UP = "mouseUp3d";
    /**
     * Defines the value of the type property of a mouseDown3d event object.
     */
    MouseEvent.MOUSE_DOWN = "mouseDown3d";
    /**
     * Defines the value of the type property of a mouseMove3d event object.
     */
    MouseEvent.MOUSE_MOVE = "mouseMove3d";
    /**
     * Defines the value of the type property of a rollOver3d event object.
     */
    //		public static ROLL_OVER : string = "rollOver3d";
    /**
     * Defines the value of the type property of a rollOut3d event object.
     */
    //		public static ROLL_OUT : string = "rollOut3d";
    /**
     * Defines the value of the type property of a click3d event object.
     */
    MouseEvent.CLICK = "click3d";
    /**
     * Defines the value of the type property of a doubleClick3d event object.
     */
    MouseEvent.DOUBLE_CLICK = "doubleClick3d";
    /**
     * Defines the value of the type property of a mouseWheel3d event object.
     */
    MouseEvent.MOUSE_WHEEL = "mouseWheel3d";
    return MouseEvent;
})(Event);
module.exports = MouseEvent;


},{"awayjs-core/lib/events/Event":undefined}],"awayjs-display/lib/events/RenderableOwnerEvent":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Event = require("awayjs-core/lib/events/Event");
/**
 * Dispatched to notify changes in a sub geometry object's state.
 *
 * @class away.events.RenderableOwnerEvent
 * @see away.core.base.Geometry
 */
var RenderableOwnerEvent = (function (_super) {
    __extends(RenderableOwnerEvent, _super);
    /**
     * Create a new GeometryEvent
     * @param type The event type.
     * @param dataType An optional data type of the vertex data being updated.
     */
    function RenderableOwnerEvent(type, renderObjectOwner) {
        _super.call(this, type);
        this._renderObjectOwner = renderObjectOwner;
    }
    Object.defineProperty(RenderableOwnerEvent.prototype, "renderObjectOwner", {
        /**
         * The renderobject owner of the renderable owner.
         */
        get: function () {
            return this._renderObjectOwner;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Clones the event.
     *
     * @return An exact duplicate of the current object.
     */
    RenderableOwnerEvent.prototype.clone = function () {
        return new RenderableOwnerEvent(this.type, this._renderObjectOwner);
    };
    /**
     * Dispatched when a Renderable owners's render object owner has been updated.
     */
    RenderableOwnerEvent.RENDER_OBJECT_OWNER_UPDATED = "renderObjectOwnerUpdated";
    return RenderableOwnerEvent;
})(Event);
module.exports = RenderableOwnerEvent;


},{"awayjs-core/lib/events/Event":undefined}],"awayjs-display/lib/events/RendererEvent":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Event = require("awayjs-core/lib/events/Event");
var RendererEvent = (function (_super) {
    __extends(RendererEvent, _super);
    function RendererEvent(type) {
        _super.call(this, type);
    }
    RendererEvent.VIEWPORT_UPDATED = "viewportUpdated";
    RendererEvent.SCISSOR_UPDATED = "scissorUpdated";
    return RendererEvent;
})(Event);
module.exports = RendererEvent;


},{"awayjs-core/lib/events/Event":undefined}],"awayjs-display/lib/events/ResizeEvent":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Event = require("awayjs-core/lib/events/Event");
var ResizeEvent = (function (_super) {
    __extends(ResizeEvent, _super);
    function ResizeEvent(type, oldHeight, oldWidth) {
        if (oldHeight === void 0) { oldHeight = NaN; }
        if (oldWidth === void 0) { oldWidth = NaN; }
        _super.call(this, type);
        this._oldHeight = oldHeight;
        this._oldWidth = oldWidth;
    }
    Object.defineProperty(ResizeEvent.prototype, "oldHeight", {
        get: function () {
            return this._oldHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResizeEvent.prototype, "oldWidth", {
        get: function () {
            return this._oldWidth;
        },
        enumerable: true,
        configurable: true
    });
    ResizeEvent.RESIZE = "resize";
    return ResizeEvent;
})(Event);
module.exports = ResizeEvent;


},{"awayjs-core/lib/events/Event":undefined}],"awayjs-display/lib/events/SceneEvent":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Event = require("awayjs-core/lib/events/Event");
var SceneEvent = (function (_super) {
    __extends(SceneEvent, _super);
    function SceneEvent(type, displayObject) {
        _super.call(this, type);
        this.displayObject = displayObject;
    }
    /**
     *
     */
    SceneEvent.ADDED_TO_SCENE = "addedToScene";
    /**
     *
     */
    SceneEvent.REMOVED_FROM_SCENE = "removedFromScene";
    /**
     *
     */
    SceneEvent.PARTITION_CHANGED = "partitionChanged";
    return SceneEvent;
})(Event);
module.exports = SceneEvent;


},{"awayjs-core/lib/events/Event":undefined}],"awayjs-display/lib/managers/DefaultMaterialManager":[function(require,module,exports){
var BitmapData = require("awayjs-core/lib/data/BitmapData");
var BitmapTexture = require("awayjs-core/lib/textures/BitmapTexture");
var LineSubMesh = require("awayjs-display/lib/base/LineSubMesh");
var BasicMaterial = require("awayjs-display/lib/materials/BasicMaterial");
var DefaultMaterialManager = (function () {
    function DefaultMaterialManager() {
    }
    DefaultMaterialManager.getDefaultMaterial = function (renderableOwner) {
        if (renderableOwner === void 0) { renderableOwner = null; }
        if (renderableOwner != null && renderableOwner.isAsset(LineSubMesh)) {
            if (!DefaultMaterialManager._defaultLineMaterial)
                DefaultMaterialManager.createDefaultLineMaterial();
            return DefaultMaterialManager._defaultLineMaterial;
        }
        else {
            if (!DefaultMaterialManager._defaultTriangleMaterial)
                DefaultMaterialManager.createDefaultTriangleMaterial();
            return DefaultMaterialManager._defaultTriangleMaterial;
        }
    };
    DefaultMaterialManager.getDefaultTexture = function (renderableOwner) {
        if (renderableOwner === void 0) { renderableOwner = null; }
        if (!DefaultMaterialManager._defaultTexture)
            DefaultMaterialManager.createDefaultTexture();
        return DefaultMaterialManager._defaultTexture;
    };
    DefaultMaterialManager.createDefaultTexture = function () {
        DefaultMaterialManager._defaultBitmapData = DefaultMaterialManager.createCheckeredBitmapData();
        DefaultMaterialManager._defaultTexture = new BitmapTexture(DefaultMaterialManager._defaultBitmapData);
        DefaultMaterialManager._defaultTexture.name = "defaultTexture";
    };
    DefaultMaterialManager.createCheckeredBitmapData = function () {
        var b = new BitmapData(8, 8, false, 0x000000);
        //create chekerboard
        var i, j;
        for (i = 0; i < 8; i++) {
            for (j = 0; j < 8; j++) {
                if ((j & 1) ^ (i & 1)) {
                    b.setPixel(i, j, 0XFFFFFF);
                }
            }
        }
        return b;
    };
    DefaultMaterialManager.createDefaultTriangleMaterial = function () {
        if (!DefaultMaterialManager._defaultTexture)
            DefaultMaterialManager.createDefaultTexture();
        DefaultMaterialManager._defaultTriangleMaterial = new BasicMaterial(DefaultMaterialManager._defaultTexture);
        DefaultMaterialManager._defaultTriangleMaterial.mipmap = false;
        DefaultMaterialManager._defaultTriangleMaterial.smooth = false;
        DefaultMaterialManager._defaultTriangleMaterial.name = "defaultTriangleMaterial";
    };
    DefaultMaterialManager.createDefaultLineMaterial = function () {
        DefaultMaterialManager._defaultLineMaterial = new BasicMaterial();
        DefaultMaterialManager._defaultLineMaterial.name = "defaultLineMaterial";
    };
    return DefaultMaterialManager;
})();
module.exports = DefaultMaterialManager;


},{"awayjs-core/lib/data/BitmapData":undefined,"awayjs-core/lib/textures/BitmapTexture":undefined,"awayjs-display/lib/base/LineSubMesh":"awayjs-display/lib/base/LineSubMesh","awayjs-display/lib/materials/BasicMaterial":"awayjs-display/lib/materials/BasicMaterial"}],"awayjs-display/lib/managers/MouseManager":[function(require,module,exports){
var Vector3D = require("awayjs-core/lib/geom/Vector3D");
var AwayMouseEvent = require("awayjs-display/lib/events/MouseEvent");
/**
 * MouseManager enforces a singleton pattern and is not intended to be instanced.
 * it provides a manager class for detecting mouse hits on scene objects and sending out mouse events.
 */
var MouseManager = (function () {
    /**
     * Creates a new <code>MouseManager</code> object.
     */
    function MouseManager() {
        var _this = this;
        this._viewLookup = new Array();
        this._nullVector = new Vector3D();
        this._queuedEvents = new Array();
        this._mouseUp = new AwayMouseEvent(AwayMouseEvent.MOUSE_UP);
        this._mouseClick = new AwayMouseEvent(AwayMouseEvent.CLICK);
        this._mouseOut = new AwayMouseEvent(AwayMouseEvent.MOUSE_OUT);
        this._mouseDown = new AwayMouseEvent(AwayMouseEvent.MOUSE_DOWN);
        this._mouseMove = new AwayMouseEvent(AwayMouseEvent.MOUSE_MOVE);
        this._mouseOver = new AwayMouseEvent(AwayMouseEvent.MOUSE_OVER);
        this._mouseWheel = new AwayMouseEvent(AwayMouseEvent.MOUSE_WHEEL);
        this._mouseDoubleClick = new AwayMouseEvent(AwayMouseEvent.DOUBLE_CLICK);
        this.onClickDelegate = function (event) { return _this.onClick(event); };
        this.onDoubleClickDelegate = function (event) { return _this.onDoubleClick(event); };
        this.onMouseDownDelegate = function (event) { return _this.onMouseDown(event); };
        this.onMouseMoveDelegate = function (event) { return _this.onMouseMove(event); };
        this.onMouseUpDelegate = function (event) { return _this.onMouseUp(event); };
        this.onMouseWheelDelegate = function (event) { return _this.onMouseWheel(event); };
        this.onMouseOverDelegate = function (event) { return _this.onMouseOver(event); };
        this.onMouseOutDelegate = function (event) { return _this.onMouseOut(event); };
    }
    MouseManager.getInstance = function () {
        if (this._instance)
            return this._instance;
        return (this._instance = new MouseManager());
    };
    MouseManager.prototype.fireMouseEvents = function (forceMouseMove) {
        // If colliding object has changed, queue over/out events.
        if (this._iCollidingObject != this._previousCollidingObject) {
            if (this._previousCollidingObject)
                this.queueDispatch(this._mouseOut, this._mouseMoveEvent, this._previousCollidingObject);
            if (this._iCollidingObject)
                this.queueDispatch(this._mouseOver, this._mouseMoveEvent);
        }
        // Fire mouse move events here if forceMouseMove is on.
        if (forceMouseMove && this._iCollidingObject)
            this.queueDispatch(this._mouseMove, this._mouseMoveEvent);
        var event;
        var dispatcher;
        // Dispatch all queued events.
        var len = this._queuedEvents.length;
        for (var i = 0; i < len; ++i) {
            // Only dispatch from first implicitly enabled object ( one that is not a child of a mouseChildren = false hierarchy ).
            event = this._queuedEvents[i];
            dispatcher = event.object;
            while (dispatcher && !dispatcher._iIsMouseEnabled())
                dispatcher = dispatcher.parent;
            if (dispatcher)
                dispatcher.dispatchEvent(event);
        }
        this._queuedEvents.length = 0;
        this._previousCollidingObject = this._iCollidingObject;
        this._iUpdateDirty = false;
    };
    //		public addViewLayer(view:View)
    //		{
    //			var stg:Stage = view.stage;
    //
    //			// Add instance to mouse3dmanager to fire mouse events for multiple views
    //			if (!view.stageGL.mouse3DManager)
    //				view.stageGL.mouse3DManager = this;
    //
    //			if (!hasKey(view))
    //				_view3Ds[view] = 0;
    //
    //			_childDepth = 0;
    //			traverseDisplayObjects(stg);
    //			_viewCount = _childDepth;
    //		}
    MouseManager.prototype.registerView = function (view) {
        view.htmlElement.addEventListener("click", this.onClickDelegate);
        view.htmlElement.addEventListener("dblclick", this.onDoubleClickDelegate);
        view.htmlElement.addEventListener("mousedown", this.onMouseDownDelegate);
        view.htmlElement.addEventListener("mousemove", this.onMouseMoveDelegate);
        view.htmlElement.addEventListener("mouseup", this.onMouseUpDelegate);
        view.htmlElement.addEventListener("mousewheel", this.onMouseWheelDelegate);
        view.htmlElement.addEventListener("mouseover", this.onMouseOverDelegate);
        view.htmlElement.addEventListener("mouseout", this.onMouseOutDelegate);
        this._viewLookup.push(view);
    };
    MouseManager.prototype.unregisterView = function (view) {
        view.htmlElement.removeEventListener("click", this.onClickDelegate);
        view.htmlElement.removeEventListener("dblclick", this.onDoubleClickDelegate);
        view.htmlElement.removeEventListener("mousedown", this.onMouseDownDelegate);
        view.htmlElement.removeEventListener("mousemove", this.onMouseMoveDelegate);
        view.htmlElement.removeEventListener("mouseup", this.onMouseUpDelegate);
        view.htmlElement.removeEventListener("mousewheel", this.onMouseWheelDelegate);
        view.htmlElement.removeEventListener("mouseover", this.onMouseOverDelegate);
        view.htmlElement.removeEventListener("mouseout", this.onMouseOutDelegate);
        this._viewLookup.slice(this._viewLookup.indexOf(view), 1);
    };
    // ---------------------------------------------------------------------
    // Private.
    // ---------------------------------------------------------------------
    MouseManager.prototype.queueDispatch = function (event, sourceEvent, collider) {
        if (collider === void 0) { collider = null; }
        // 2D properties.
        if (sourceEvent) {
            event.ctrlKey = sourceEvent.ctrlKey;
            event.altKey = sourceEvent.altKey;
            event.shiftKey = sourceEvent.shiftKey;
            event.screenX = sourceEvent.clientX;
            event.screenY = sourceEvent.clientY;
        }
        if (collider == null)
            collider = this._iCollidingObject;
        // 3D properties.
        if (collider) {
            // Object.
            event.object = collider.displayObject;
            event.renderableOwner = collider.renderableOwner;
            // UV.
            event.uv = collider.uv;
            // Position.
            event.localPosition = collider.localPosition ? collider.localPosition.clone() : null;
            // Normal.
            event.localNormal = collider.localNormal ? collider.localNormal.clone() : null;
            // Face index.
            event.index = collider.index;
        }
        else {
            // Set all to null.
            event.uv = null;
            event.object = null;
            event.localPosition = this._nullVector;
            event.localNormal = this._nullVector;
            event.index = 0;
            event.subGeometryIndex = 0;
        }
        // Store event to be dispatched later.
        this._queuedEvents.push(event);
    };
    // ---------------------------------------------------------------------
    // Listeners.
    // ---------------------------------------------------------------------
    MouseManager.prototype.onMouseMove = function (event) {
        this.updateColliders(event);
        if (this._iCollidingObject)
            this.queueDispatch(this._mouseMove, this._mouseMoveEvent = event);
    };
    MouseManager.prototype.onMouseOut = function (event) {
        this._iActiveDiv = null;
        this.updateColliders(event);
        if (this._iCollidingObject)
            this.queueDispatch(this._mouseOut, event);
    };
    MouseManager.prototype.onMouseOver = function (event) {
        this._iActiveDiv = event.target;
        this.updateColliders(event);
        if (this._iCollidingObject)
            this.queueDispatch(this._mouseOver, event);
    };
    MouseManager.prototype.onClick = function (event) {
        this.updateColliders(event);
        if (this._iCollidingObject)
            this.queueDispatch(this._mouseClick, event);
    };
    MouseManager.prototype.onDoubleClick = function (event) {
        this.updateColliders(event);
        if (this._iCollidingObject)
            this.queueDispatch(this._mouseDoubleClick, event);
    };
    MouseManager.prototype.onMouseDown = function (event) {
        this._iActiveDiv = event.target;
        this.updateColliders(event);
        if (this._iCollidingObject)
            this.queueDispatch(this._mouseDown, event);
    };
    MouseManager.prototype.onMouseUp = function (event) {
        this.updateColliders(event);
        if (this._iCollidingObject)
            this.queueDispatch(this._mouseUp, event);
    };
    MouseManager.prototype.onMouseWheel = function (event) {
        this.updateColliders(event);
        if (this._iCollidingObject)
            this.queueDispatch(this._mouseWheel, event);
    };
    MouseManager.prototype.updateColliders = function (event) {
        if (this._iUpdateDirty)
            return;
        var view;
        var bounds;
        var mouseX = event.clientX;
        var mouseY = event.clientY;
        var len = this._viewLookup.length;
        for (var i = 0; i < len; i++) {
            view = this._viewLookup[i];
            bounds = view.htmlElement.getBoundingClientRect();
            if (mouseX < bounds.left || mouseX > bounds.right || mouseY < bounds.top || mouseY > bounds.bottom) {
                view._pMouseX = null;
                view._pMouseY = null;
            }
            else {
                view._pMouseX = mouseX + bounds.left;
                view._pMouseY = mouseY + bounds.top;
                view.updateCollider();
                if (view.layeredView && this._iCollidingObject)
                    break;
            }
        }
        this._iUpdateDirty = true;
    };
    return MouseManager;
})();
module.exports = MouseManager;


},{"awayjs-core/lib/geom/Vector3D":undefined,"awayjs-display/lib/events/MouseEvent":"awayjs-display/lib/events/MouseEvent"}],"awayjs-display/lib/materials/BasicMaterial":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Texture2DBase = require("awayjs-core/lib/textures/Texture2DBase");
var MaterialBase = require("awayjs-display/lib/materials/MaterialBase");
/**
 * BasicMaterial forms an abstract base class for the default shaded materials provided by Stage,
 * using material methods to define their appearance.
 */
var BasicMaterial = (function (_super) {
    __extends(BasicMaterial, _super);
    function BasicMaterial(textureColor, smoothAlpha, repeat, mipmap) {
        if (textureColor === void 0) { textureColor = null; }
        if (smoothAlpha === void 0) { smoothAlpha = null; }
        if (repeat === void 0) { repeat = false; }
        if (mipmap === void 0) { mipmap = false; }
        _super.call(this);
        this._preserveAlpha = false;
        if (textureColor instanceof Texture2DBase) {
            this.texture = textureColor;
            this.smooth = (smoothAlpha == null) ? true : false;
            this.repeat = repeat;
            this.mipmap = mipmap;
        }
        else {
            this.color = textureColor ? Number(textureColor) : 0xCCCCCC;
            this.alpha = (smoothAlpha == null) ? 1 : Number(smoothAlpha);
        }
    }
    Object.defineProperty(BasicMaterial.prototype, "preserveAlpha", {
        /**
         * Indicates whether alpha should be preserved - defaults to false
         */
        get: function () {
            return this._preserveAlpha;
        },
        set: function (value) {
            if (this._preserveAlpha == value)
                return;
            this._preserveAlpha = value;
            this._pInvalidateRenderObject();
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     * @param renderer
     *
     * @internal
     */
    BasicMaterial.prototype.getRenderObject = function (renderablePool) {
        return renderablePool.getMaterialRenderObject(this);
    };
    return BasicMaterial;
})(MaterialBase);
module.exports = BasicMaterial;


},{"awayjs-core/lib/textures/Texture2DBase":undefined,"awayjs-display/lib/materials/MaterialBase":"awayjs-display/lib/materials/MaterialBase"}],"awayjs-display/lib/materials/CSSMaterialBase":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MaterialBase = require("awayjs-display/lib/materials/MaterialBase");
var ImageTexture = require("awayjs-core/lib/textures/ImageTexture");
/**
 * MaterialBase forms an abstract base class for any material.
 * A material consists of several passes, each of which constitutes at least one render call. Several passes could
 * be used for special effects (render lighting for many lights in several passes, render an outline in a separate
 * pass) or to provide additional render-to-texture passes (rendering diffuse light to texture for texture-space
 * subsurface scattering, or rendering a depth map for specialized self-shadowing).
 *
 * Away3D provides default materials trough SinglePassMaterialBase and MultiPassMaterialBase, which use modular
 * methods to build the shader code. MaterialBase can be extended to build specific and high-performant custom
 * shaders, or entire new material frameworks.
 */
var CSSMaterialBase = (function (_super) {
    __extends(CSSMaterialBase, _super);
    /**
     * Creates a new MaterialBase object.
     */
    function CSSMaterialBase(texture, smooth, repeat) {
        if (texture === void 0) { texture = null; }
        if (smooth === void 0) { smooth = true; }
        if (repeat === void 0) { repeat = false; }
        _super.call(this);
        this._iMaterialId = Number(this.id);
        this.texture = texture;
        this.smooth = smooth;
        this.repeat = repeat;
    }
    Object.defineProperty(CSSMaterialBase.prototype, "imageElement", {
        get: function () {
            return this._imageElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CSSMaterialBase.prototype, "imageStyle", {
        get: function () {
            return this._imageStyle;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CSSMaterialBase.prototype, "texture", {
        /**
         * The texture object to use for the albedo colour.
         */
        get: function () {
            return this._pTexture;
        },
        set: function (value) {
            if (this._pTexture == value)
                return;
            this._pTexture = value;
            if (value instanceof ImageTexture) {
                this._imageElement = value.htmlImageElement;
                var node = document.createElement("style");
                node.type = "text/css";
                document.getElementsByTagName("head")[0].appendChild(node);
                var sheet = document.styleSheets[document.styleSheets.length - 1];
                sheet.insertRule(".material" + this.id + "{ }", 0);
                var style = sheet.cssRules[0].style;
                style.backgroundImage = "url(" + this._imageElement.src + ")";
                style.backgroundSize = "100% 100%";
                style.position = "absolute";
                style.width = this._imageElement.width + "px";
                style.height = this._imageElement.height + "px";
                style.transformOrigin = style["-webkit-transform-origin"] = style["-moz-transform-origin"] = style["-o-transform-origin"] = style["-ms-transform-origin"] = "0% 0%";
                this._pHeight = this._imageElement.height;
                this._pWidth = this._imageElement.width;
                this._pNotifySizeChanged();
            }
        },
        enumerable: true,
        configurable: true
    });
    return CSSMaterialBase;
})(MaterialBase);
module.exports = CSSMaterialBase;


},{"awayjs-core/lib/textures/ImageTexture":undefined,"awayjs-display/lib/materials/MaterialBase":"awayjs-display/lib/materials/MaterialBase"}],"awayjs-display/lib/materials/CurveMaterial":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Texture2DBase = require("awayjs-core/lib/textures/Texture2DBase");
var MaterialBase = require("awayjs-display/lib/materials/MaterialBase");
/**
 * BasicMaterial forms an abstract base class for the default shaded materials provided by Stage,
 * using material methods to define their appearance.
 */
var CurveMaterial = (function (_super) {
    __extends(CurveMaterial, _super);
    function CurveMaterial(textureColor, smoothAlpha, repeat, mipmap) {
        if (textureColor === void 0) { textureColor = null; }
        if (smoothAlpha === void 0) { smoothAlpha = null; }
        if (repeat === void 0) { repeat = false; }
        if (mipmap === void 0) { mipmap = false; }
        _super.call(this);
        this._preserveAlpha = false;
        if (textureColor instanceof Texture2DBase) {
            this.texture = textureColor;
            this.smooth = (smoothAlpha == null) ? true : false;
            this.repeat = repeat;
            this.mipmap = mipmap;
        }
        else {
            this.color = textureColor ? Number(textureColor) : 0xCCCCCC;
            this.alpha = (smoothAlpha == null) ? 1 : Number(smoothAlpha);
        }
    }
    Object.defineProperty(CurveMaterial.prototype, "preserveAlpha", {
        /**
         * Indicates whether alpha should be preserved - defaults to false
         */
        get: function () {
            return this._preserveAlpha;
        },
        set: function (value) {
            if (this._preserveAlpha == value)
                return;
            this._preserveAlpha = value;
            this._pInvalidateRenderObject();
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     * @param renderer
     *
     * @internal
     */
    CurveMaterial.prototype.getRenderObject = function (renderablePool) {
        return renderablePool.getMaterialRenderObject(this);
    };
    return CurveMaterial;
})(MaterialBase);
module.exports = CurveMaterial;


},{"awayjs-core/lib/textures/Texture2DBase":undefined,"awayjs-display/lib/materials/MaterialBase":"awayjs-display/lib/materials/MaterialBase"}],"awayjs-display/lib/materials/LightSources":[function(require,module,exports){
/**
 * Enumeration class for defining which lighting types affect the specific material
 * lighting component (diffuse and specular). This can be useful if, for example, you
 * want to use light probes for diffuse global lighting, but want specular reflections from
 * traditional light sources without those affecting the diffuse light.
 *
 * @see away.materials.ColorMaterial.diffuseLightSources
 * @see away.materials.ColorMaterial.specularLightSources
 * @see away.materials.TextureMaterial.diffuseLightSources
 * @see away.materials.TextureMaterial.specularLightSources
 */
var LightSources = (function () {
    function LightSources() {
    }
    /**
     * Defines normal lights are to be used as the source for the lighting
     * component.
     */
    LightSources.LIGHTS = 0x01;
    /**
     * Defines that global lighting probes are to be used as the source for the
     * lighting component.
     */
    LightSources.PROBES = 0x02;
    /**
     * Defines that both normal and global lighting probes  are to be used as the
     * source for the lighting component. This is equivalent to LightSources.LIGHTS | LightSources.PROBES.
     */
    LightSources.ALL = 0x03;
    return LightSources;
})();
module.exports = LightSources;


},{}],"awayjs-display/lib/materials/MaterialBase":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BlendMode = require("awayjs-core/lib/data/BlendMode");
var ColorTransform = require("awayjs-core/lib/geom/ColorTransform");
var AbstractMethodError = require("awayjs-core/lib/errors/AbstractMethodError");
var Event = require("awayjs-core/lib/events/Event");
var AssetBase = require("awayjs-core/lib/library/AssetBase");
var MaterialEvent = require("awayjs-display/lib/events/MaterialEvent");
var RenderableOwnerEvent = require("awayjs-display/lib/events/RenderableOwnerEvent");
/**
 * MaterialBase forms an abstract base class for any material.
 * A material consists of several passes, each of which constitutes at least one render call. Several passes could
 * be used for special effects (render lighting for many lights in several passes, render an outline in a separate
 * pass) or to provide additional render-to-texture passes (rendering diffuse light to texture for texture-space
 * subsurface scattering, or rendering a depth map for specialized self-shadowing).
 *
 * Away3D provides default materials trough SinglePassMaterialBase and TriangleMaterial, which use modular
 * methods to build the shader code. MaterialBase can be extended to build specific and high-performant custom
 * shaders, or entire new material frameworks.
 */
var MaterialBase = (function (_super) {
    __extends(MaterialBase, _super);
    /**
     * Creates a new MaterialBase object.
     */
    function MaterialBase() {
        var _this = this;
        _super.call(this);
        this._alphaBlending = false;
        this._alpha = 1;
        this._renderObjects = new Array();
        this._pAlphaThreshold = 0;
        this._pAnimateUVs = false;
        this._enableLightFallOff = true;
        this._specularLightSources = 0x01;
        this._diffuseLightSources = 0x03;
        /**
         * An id for this material used to sort the renderables by shader program, which reduces Program state changes.
         *
         * @private
         */
        this._iMaterialId = 0;
        this._iBaseScreenPassIndex = 0;
        this._bothSides = false; // update
        this._pBlendMode = BlendMode.NORMAL;
        this._mipmap = true;
        this._smooth = true;
        this._repeat = false;
        this._color = 0xFFFFFF;
        this._pHeight = 1;
        this._pWidth = 1;
        this._iMaterialId = Number(this.id);
        this._owners = new Array();
        this._onLightChangeDelegate = function (event) { return _this.onLightsChange(event); };
        this.alphaPremultiplied = false; //TODO: work out why this is different for WebGL
    }
    Object.defineProperty(MaterialBase.prototype, "assetType", {
        /**
         *
         */
        get: function () {
            return MaterialBase.assetType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterialBase.prototype, "alpha", {
        /**
         * The alpha of the surface.
         */
        get: function () {
            return this._alpha;
        },
        set: function (value) {
            if (value > 1)
                value = 1;
            else if (value < 0)
                value = 0;
            if (this._alpha == value)
                return;
            this._alpha = value;
            if (this._colorTransform == null)
                this._colorTransform = new ColorTransform();
            this._colorTransform.alphaMultiplier = value;
            this._pInvalidateRenderObject();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterialBase.prototype, "colorTransform", {
        /**
         * The ColorTransform object to transform the colour of the material with. Defaults to null.
         */
        get: function () {
            return this._colorTransform;
        },
        set: function (value) {
            this._colorTransform = value;
            this._pInvalidateRenderObject();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterialBase.prototype, "alphaBlending", {
        /**
         * Indicates whether or not the material has transparency. If binary transparency is sufficient, for
         * example when using textures of foliage, consider using alphaThreshold instead.
         */
        get: function () {
            return this._alphaBlending;
        },
        set: function (value) {
            if (this._alphaBlending == value)
                return;
            this._alphaBlending = value;
            this._pInvalidateRenderObject();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterialBase.prototype, "height", {
        /**
         *
         */
        get: function () {
            return this._pHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterialBase.prototype, "animationSet", {
        /**
         *
         */
        get: function () {
            return this._animationSet;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterialBase.prototype, "lightPicker", {
        /**
         * The light picker used by the material to provide lights to the material if it supports lighting.
         *
         * @see LightPickerBase
         * @see StaticLightPicker
         */
        get: function () {
            return this._pLightPicker;
        },
        set: function (value) {
            if (this._pLightPicker == value)
                return;
            if (this._pLightPicker)
                this._pLightPicker.removeEventListener(Event.CHANGE, this._onLightChangeDelegate);
            this._pLightPicker = value;
            if (this._pLightPicker)
                this._pLightPicker.addEventListener(Event.CHANGE, this._onLightChangeDelegate);
            this._pInvalidateRenderObject();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterialBase.prototype, "mipmap", {
        /**
         * Indicates whether or not any used textures should use mipmapping. Defaults to true.
         */
        get: function () {
            return this._mipmap;
        },
        set: function (value) {
            if (this._mipmap == value)
                return;
            this._mipmap = value;
            this._pInvalidatePasses();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterialBase.prototype, "smooth", {
        /**
         * Indicates whether or not any used textures should use smoothing. Defaults to true.
         */
        get: function () {
            return this._smooth;
        },
        set: function (value) {
            if (this._smooth == value)
                return;
            this._smooth = value;
            this._pInvalidatePasses();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterialBase.prototype, "repeat", {
        /**
         * Indicates whether or not any used textures should be tiled. If set to false, texture samples are clamped to
         * the texture's borders when the uv coordinates are outside the [0, 1] interval. Defaults to false.
         */
        get: function () {
            return this._repeat;
        },
        set: function (value) {
            if (this._repeat == value)
                return;
            this._repeat = value;
            this._pInvalidatePasses();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterialBase.prototype, "color", {
        /**
         * The diffuse reflectivity color of the surface.
         */
        get: function () {
            return this._color;
        },
        set: function (value) {
            if (this._color == value)
                return;
            this._color = value;
            this._pInvalidatePasses();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterialBase.prototype, "texture", {
        /**
         * The texture object to use for the albedo colour.
         */
        get: function () {
            return this._pTexture;
        },
        set: function (value) {
            if (this._pTexture == value)
                return;
            this._pTexture = value;
            this._pInvalidatePasses();
            this._pHeight = this._pTexture.height;
            this._pWidth = this._pTexture.width;
            this._pNotifySizeChanged();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterialBase.prototype, "animateUVs", {
        /**
         * Specifies whether or not the UV coordinates should be animated using a transformation matrix.
         */
        get: function () {
            return this._pAnimateUVs;
        },
        set: function (value) {
            if (this._pAnimateUVs == value)
                return;
            this._pAnimateUVs = value;
            this._pInvalidatePasses();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterialBase.prototype, "enableLightFallOff", {
        /**
         * Whether or not to use fallOff and radius properties for lights. This can be used to improve performance and
         * compatibility for constrained mode.
         */
        get: function () {
            return this._enableLightFallOff;
        },
        set: function (value) {
            if (this._enableLightFallOff == value)
                return;
            this._enableLightFallOff = value;
            this._pInvalidatePasses();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterialBase.prototype, "diffuseLightSources", {
        /**
         * Define which light source types to use for diffuse reflections. This allows choosing between regular lights
         * and/or light probes for diffuse reflections.
         *
         * @see away3d.materials.LightSources
         */
        get: function () {
            return this._diffuseLightSources;
        },
        set: function (value) {
            if (this._diffuseLightSources == value)
                return;
            this._diffuseLightSources = value;
            this._pInvalidatePasses();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterialBase.prototype, "specularLightSources", {
        /**
         * Define which light source types to use for specular reflections. This allows choosing between regular lights
         * and/or light probes for specular reflections.
         *
         * @see away3d.materials.LightSources
         */
        get: function () {
            return this._specularLightSources;
        },
        set: function (value) {
            if (this._specularLightSources == value)
                return;
            this._specularLightSources = value;
            this._pInvalidatePasses();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Cleans up resources owned by the material, including passes. Textures are not owned by the material since they
     * could be used by other materials and will not be disposed.
     */
    MaterialBase.prototype.dispose = function () {
        var i;
        var len;
        len = this._renderObjects.length;
        for (i = 0; i < len; i++)
            this._renderObjects[i].dispose();
        this._renderObjects = new Array();
    };
    Object.defineProperty(MaterialBase.prototype, "bothSides", {
        /**
         * Defines whether or not the material should cull triangles facing away from the camera.
         */
        get: function () {
            return this._bothSides;
        },
        set: function (value) {
            if (this._bothSides = value)
                return;
            this._bothSides = value;
            this._pInvalidatePasses();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterialBase.prototype, "blendMode", {
        /**
         * The blend mode to use when drawing this renderable. The following blend modes are supported:
         * <ul>
         * <li>BlendMode.NORMAL: No blending, unless the material inherently needs it</li>
         * <li>BlendMode.LAYER: Force blending. This will draw the object the same as NORMAL, but without writing depth writes.</li>
         * <li>BlendMode.MULTIPLY</li>
         * <li>BlendMode.ADD</li>
         * <li>BlendMode.ALPHA</li>
         * </ul>
         */
        get: function () {
            return this._pBlendMode;
        },
        set: function (value) {
            if (this._pBlendMode == value)
                return;
            this._pBlendMode = value;
            this._pInvalidateRenderObject();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterialBase.prototype, "alphaPremultiplied", {
        /**
         * Indicates whether visible textures (or other pixels) used by this material have
         * already been premultiplied. Toggle this if you are seeing black halos around your
         * blended alpha edges.
         */
        get: function () {
            return this._alphaPremultiplied;
        },
        set: function (value) {
            if (this._alphaPremultiplied == value)
                return;
            this._alphaPremultiplied = value;
            this._pInvalidatePasses();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterialBase.prototype, "alphaThreshold", {
        /**
         * The minimum alpha value for which pixels should be drawn. This is used for transparency that is either
         * invisible or entirely opaque, often used with textures for foliage, etc.
         * Recommended values are 0 to disable alpha, or 0.5 to create smooth edges. Default value is 0 (disabled).
         */
        get: function () {
            return this._pAlphaThreshold;
        },
        set: function (value) {
            if (value < 0)
                value = 0;
            else if (value > 1)
                value = 1;
            if (this._pAlphaThreshold == value)
                return;
            this._pAlphaThreshold = value;
            this._pInvalidatePasses();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterialBase.prototype, "width", {
        /**
         *
         */
        get: function () {
            return this._pWidth;
        },
        enumerable: true,
        configurable: true
    });
    //
    // MATERIAL MANAGEMENT
    //
    /**
     * Mark an IRenderableOwner as owner of this material.
     * Assures we're not using the same material across renderables with different animations, since the
     * Programs depend on animation. This method needs to be called when a material is assigned.
     *
     * @param owner The IRenderableOwner that had this material assigned
     *
     * @internal
     */
    MaterialBase.prototype.iAddOwner = function (owner) {
        this._owners.push(owner);
        var animationSet;
        var animator = owner.animator;
        if (animator)
            animationSet = animator.animationSet;
        if (owner.animator) {
            if (this._animationSet && animationSet != this._animationSet) {
                throw new Error("A Material instance cannot be shared across material owners with different animation sets");
            }
            else {
                if (this._animationSet != animationSet) {
                    this._animationSet = animationSet;
                    this.invalidateAnimation();
                }
            }
        }
        owner.dispatchEvent(new RenderableOwnerEvent(RenderableOwnerEvent.RENDER_OBJECT_OWNER_UPDATED, this));
    };
    /**
     * Removes an IRenderableOwner as owner.
     * @param owner
     *
     * @internal
     */
    MaterialBase.prototype.iRemoveOwner = function (owner) {
        this._owners.splice(this._owners.indexOf(owner), 1);
        if (this._owners.length == 0) {
            this._animationSet = null;
            this.invalidateAnimation();
        }
        owner.dispatchEvent(new RenderableOwnerEvent(RenderableOwnerEvent.RENDER_OBJECT_OWNER_UPDATED, this));
    };
    Object.defineProperty(MaterialBase.prototype, "iOwners", {
        /**
         * A list of the IRenderableOwners that use this material
         *
         * @private
         */
        get: function () {
            return this._owners;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Marks the shader programs for all passes as invalid, so they will be recompiled before the next use.
     *
     * @private
     */
    MaterialBase.prototype._pInvalidatePasses = function () {
        var len = this._renderObjects.length;
        for (var i = 0; i < len; i++)
            this._renderObjects[i].invalidatePasses();
    };
    MaterialBase.prototype.invalidateAnimation = function () {
        var len = this._renderObjects.length;
        for (var i = 0; i < len; i++)
            this._renderObjects[i].invalidateAnimation();
    };
    MaterialBase.prototype._pInvalidateRenderObject = function () {
        var len = this._renderObjects.length;
        for (var i = 0; i < len; i++)
            this._renderObjects[i].invalidateRenderObject();
    };
    /**
     * Called when the light picker's configuration changed.
     */
    MaterialBase.prototype.onLightsChange = function (event) {
        this._pInvalidateRenderObject();
    };
    MaterialBase.prototype._pNotifySizeChanged = function () {
        if (!this._sizeChanged)
            this._sizeChanged = new MaterialEvent(MaterialEvent.SIZE_CHANGED);
        this.dispatchEvent(this._sizeChanged);
    };
    MaterialBase.prototype._iAddRenderObject = function (renderObject) {
        this._renderObjects.push(renderObject);
        return renderObject;
    };
    MaterialBase.prototype._iRemoveRenderObject = function (renderObject) {
        this._renderObjects.splice(this._renderObjects.indexOf(renderObject), 1);
        return renderObject;
    };
    /**
     *
     * @param renderer
     *
     * @internal
     */
    MaterialBase.prototype.getRenderObject = function (renderablePool) {
        throw new AbstractMethodError();
    };
    MaterialBase.assetType = "[asset Material]";
    return MaterialBase;
})(AssetBase);
module.exports = MaterialBase;


},{"awayjs-core/lib/data/BlendMode":undefined,"awayjs-core/lib/errors/AbstractMethodError":undefined,"awayjs-core/lib/events/Event":undefined,"awayjs-core/lib/geom/ColorTransform":undefined,"awayjs-core/lib/library/AssetBase":undefined,"awayjs-display/lib/events/MaterialEvent":"awayjs-display/lib/events/MaterialEvent","awayjs-display/lib/events/RenderableOwnerEvent":"awayjs-display/lib/events/RenderableOwnerEvent"}],"awayjs-display/lib/materials/lightpickers/LightPickerBase":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AssetBase = require("awayjs-core/lib/library/AssetBase");
/**
 * LightPickerBase provides an abstract base clase for light picker classes. These classes are responsible for
 * feeding materials with relevant lights. Usually, StaticLightPicker can be used, but LightPickerBase can be
 * extended to provide more application-specific dynamic selection of lights.
 *
 * @see StaticLightPicker
 */
var LightPickerBase = (function (_super) {
    __extends(LightPickerBase, _super);
    /**
     * Creates a new LightPickerBase object.
     */
    function LightPickerBase() {
        _super.call(this);
        this._pNumPointLights = 0;
        this._pNumDirectionalLights = 0;
        this._pNumCastingPointLights = 0;
        this._pNumCastingDirectionalLights = 0;
        this._pNumLightProbes = 0;
    }
    /**
     * Disposes resources used by the light picker.
     */
    LightPickerBase.prototype.dispose = function () {
    };
    Object.defineProperty(LightPickerBase.prototype, "assetType", {
        /**
         * @inheritDoc
         */
        get: function () {
            return LightPickerBase.assetType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LightPickerBase.prototype, "numDirectionalLights", {
        /**
         * The maximum amount of directional lights that will be provided.
         */
        get: function () {
            return this._pNumDirectionalLights;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LightPickerBase.prototype, "numPointLights", {
        /**
         * The maximum amount of point lights that will be provided.
         */
        get: function () {
            return this._pNumPointLights;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LightPickerBase.prototype, "numCastingDirectionalLights", {
        /**
         * The maximum amount of directional lights that cast shadows.
         */
        get: function () {
            return this._pNumCastingDirectionalLights;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LightPickerBase.prototype, "numCastingPointLights", {
        /**
         * The amount of point lights that cast shadows.
         */
        get: function () {
            return this._pNumCastingPointLights;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LightPickerBase.prototype, "numLightProbes", {
        /**
         * The maximum amount of light probes that will be provided.
         */
        get: function () {
            return this._pNumLightProbes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LightPickerBase.prototype, "pointLights", {
        /**
         * The collected point lights to be used for shading.
         */
        get: function () {
            return this._pPointLights;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LightPickerBase.prototype, "directionalLights", {
        /**
         * The collected directional lights to be used for shading.
         */
        get: function () {
            return this._pDirectionalLights;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LightPickerBase.prototype, "castingPointLights", {
        /**
         * The collected point lights that cast shadows to be used for shading.
         */
        get: function () {
            return this._pCastingPointLights;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LightPickerBase.prototype, "castingDirectionalLights", {
        /**
         * The collected directional lights that cast shadows to be used for shading.
         */
        get: function () {
            return this._pCastingDirectionalLights;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LightPickerBase.prototype, "lightProbes", {
        /**
         * The collected light probes to be used for shading.
         */
        get: function () {
            return this._pLightProbes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LightPickerBase.prototype, "lightProbeWeights", {
        /**
         * The weights for each light probe, defining their influence on the object.
         */
        get: function () {
            return this._pLightProbeWeights;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LightPickerBase.prototype, "allPickedLights", {
        /**
         * A collection of all the collected lights.
         */
        get: function () {
            return this._pAllPickedLights;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Updates set of lights for a given renderable and EntityCollector. Always call super.collectLights() after custom overridden code.
     */
    LightPickerBase.prototype.collectLights = function (renderable) {
        this.updateProbeWeights(renderable);
    };
    /**
     * Updates the weights for the light probes, based on the renderable's position relative to them.
     * @param renderable The renderble for which to calculate the light probes' influence.
     */
    LightPickerBase.prototype.updateProbeWeights = function (renderable) {
        // todo: this will cause the same calculations to occur per TriangleSubMesh. See if this can be improved.
        var objectPos = renderable.sourceEntity.scenePosition;
        var lightPos;
        var rx = objectPos.x, ry = objectPos.y, rz = objectPos.z;
        var dx, dy, dz;
        var w, total = 0;
        var i;
        for (i = 0; i < this._pNumLightProbes; ++i) {
            lightPos = this._pLightProbes[i].scenePosition;
            dx = rx - lightPos.x;
            dy = ry - lightPos.y;
            dz = rz - lightPos.z;
            // weight is inversely proportional to square of distance
            w = dx * dx + dy * dy + dz * dz;
            // just... huge if at the same spot
            w = w > .00001 ? 1 / w : 50000000;
            this._pLightProbeWeights[i] = w;
            total += w;
        }
        // normalize
        total = 1 / total;
        for (i = 0; i < this._pNumLightProbes; ++i)
            this._pLightProbeWeights[i] *= total;
    };
    LightPickerBase.assetType = "[asset LightPicker]";
    return LightPickerBase;
})(AssetBase);
module.exports = LightPickerBase;


},{"awayjs-core/lib/library/AssetBase":undefined}],"awayjs-display/lib/materials/lightpickers/StaticLightPicker":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Event = require("awayjs-core/lib/events/Event");
var DirectionalLight = require("awayjs-display/lib/entities/DirectionalLight");
var LightProbe = require("awayjs-display/lib/entities/LightProbe");
var PointLight = require("awayjs-display/lib/entities/PointLight");
var LightEvent = require("awayjs-display/lib/events/LightEvent");
var LightPickerBase = require("awayjs-display/lib/materials/lightpickers/LightPickerBase");
/**
 * StaticLightPicker is a light picker that provides a static set of lights. The lights can be reassigned, but
 * if the configuration changes (number of directional lights, point lights, etc), a material recompilation may
 * occur.
 */
var StaticLightPicker = (function (_super) {
    __extends(StaticLightPicker, _super);
    /**
     * Creates a new StaticLightPicker object.
     * @param lights The lights to be used for shading.
     */
    function StaticLightPicker(lights) {
        var _this = this;
        _super.call(this);
        this._onCastShadowChangeDelegate = function (event) { return _this.onCastShadowChange(event); };
        this.lights = lights;
    }
    Object.defineProperty(StaticLightPicker.prototype, "lights", {
        /**
         * The lights used for shading.
         */
        get: function () {
            return this._lights;
        },
        set: function (value) {
            var numPointLights = 0;
            var numDirectionalLights = 0;
            var numCastingPointLights = 0;
            var numCastingDirectionalLights = 0;
            var numLightProbes = 0;
            var light;
            if (this._lights)
                this.clearListeners();
            this._lights = value;
            this._pAllPickedLights = value;
            this._pPointLights = new Array();
            this._pCastingPointLights = new Array();
            this._pDirectionalLights = new Array();
            this._pCastingDirectionalLights = new Array();
            this._pLightProbes = new Array();
            var len = value.length;
            for (var i = 0; i < len; ++i) {
                light = value[i];
                light.addEventListener(LightEvent.CASTS_SHADOW_CHANGE, this._onCastShadowChangeDelegate);
                if (light instanceof PointLight) {
                    if (light.castsShadows)
                        this._pCastingPointLights[numCastingPointLights++] = light;
                    else
                        this._pPointLights[numPointLights++] = light;
                }
                else if (light instanceof DirectionalLight) {
                    if (light.castsShadows)
                        this._pCastingDirectionalLights[numCastingDirectionalLights++] = light;
                    else
                        this._pDirectionalLights[numDirectionalLights++] = light;
                }
                else if (light instanceof LightProbe) {
                    this._pLightProbes[numLightProbes++] = light;
                }
            }
            if (this._pNumDirectionalLights == numDirectionalLights && this._pNumPointLights == numPointLights && this._pNumLightProbes == numLightProbes && this._pNumCastingPointLights == numCastingPointLights && this._pNumCastingDirectionalLights == numCastingDirectionalLights)
                return;
            this._pNumDirectionalLights = numDirectionalLights;
            this._pNumCastingDirectionalLights = numCastingDirectionalLights;
            this._pNumPointLights = numPointLights;
            this._pNumCastingPointLights = numCastingPointLights;
            this._pNumLightProbes = numLightProbes;
            // MUST HAVE MULTIPLE OF 4 ELEMENTS!
            this._pLightProbeWeights = new Array(Math.ceil(numLightProbes / 4) * 4);
            // notify material lights have changed
            this.dispatchEvent(new Event(Event.CHANGE));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Remove configuration change listeners on the lights.
     */
    StaticLightPicker.prototype.clearListeners = function () {
        var len = this._lights.length;
        for (var i = 0; i < len; ++i)
            this._lights[i].removeEventListener(LightEvent.CASTS_SHADOW_CHANGE, this._onCastShadowChangeDelegate);
    };
    /**
     * Notifies the material of a configuration change.
     */
    StaticLightPicker.prototype.onCastShadowChange = function (event) {
        // TODO: Assign to special caster collections, just append it to the lights in SinglePass
        // But keep seperated in multipass
        var light = event.target;
        if (light instanceof PointLight)
            this.updatePointCasting(light);
        else if (light instanceof DirectionalLight)
            this.updateDirectionalCasting(light);
        this.dispatchEvent(new Event(Event.CHANGE));
    };
    /**
     * Called when a directional light's shadow casting configuration changes.
     */
    StaticLightPicker.prototype.updateDirectionalCasting = function (light) {
        var dl = light;
        if (light.castsShadows) {
            --this._pNumDirectionalLights;
            ++this._pNumCastingDirectionalLights;
            this._pDirectionalLights.splice(this._pDirectionalLights.indexOf(dl), 1);
            this._pCastingDirectionalLights.push(light);
        }
        else {
            ++this._pNumDirectionalLights;
            --this._pNumCastingDirectionalLights;
            this._pCastingDirectionalLights.splice(this._pCastingDirectionalLights.indexOf(dl), 1);
            this._pDirectionalLights.push(light);
        }
    };
    /**
     * Called when a point light's shadow casting configuration changes.
     */
    StaticLightPicker.prototype.updatePointCasting = function (light) {
        var pl = light;
        if (light.castsShadows) {
            --this._pNumPointLights;
            ++this._pNumCastingPointLights;
            this._pPointLights.splice(this._pPointLights.indexOf(pl), 1);
            this._pCastingPointLights.push(light);
        }
        else {
            ++this._pNumPointLights;
            --this._pNumCastingPointLights;
            this._pCastingPointLights.splice(this._pCastingPointLights.indexOf(pl), 1);
            this._pPointLights.push(light);
        }
    };
    return StaticLightPicker;
})(LightPickerBase);
module.exports = StaticLightPicker;


},{"awayjs-core/lib/events/Event":undefined,"awayjs-display/lib/entities/DirectionalLight":"awayjs-display/lib/entities/DirectionalLight","awayjs-display/lib/entities/LightProbe":"awayjs-display/lib/entities/LightProbe","awayjs-display/lib/entities/PointLight":"awayjs-display/lib/entities/PointLight","awayjs-display/lib/events/LightEvent":"awayjs-display/lib/events/LightEvent","awayjs-display/lib/materials/lightpickers/LightPickerBase":"awayjs-display/lib/materials/lightpickers/LightPickerBase"}],"awayjs-display/lib/materials/shadowmappers/CascadeShadowMapper":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Matrix3DUtils = require("awayjs-core/lib/geom/Matrix3DUtils");
var Rectangle = require("awayjs-core/lib/geom/Rectangle");
var Event = require("awayjs-core/lib/events/Event");
var EventDispatcher = require("awayjs-core/lib/events/EventDispatcher");
var FreeMatrixProjection = require("awayjs-core/lib/projections/FreeMatrixProjection");
var Camera = require("awayjs-display/lib/entities/Camera");
var DirectionalShadowMapper = require("awayjs-display/lib/materials/shadowmappers/DirectionalShadowMapper");
var CascadeShadowMapper = (function (_super) {
    __extends(CascadeShadowMapper, _super);
    function CascadeShadowMapper(numCascades) {
        if (numCascades === void 0) { numCascades = 3; }
        _super.call(this);
        this._pScissorRectsInvalid = true;
        if (numCascades < 1 || numCascades > 4)
            throw new Error("numCascades must be an integer between 1 and 4");
        this._numCascades = numCascades;
        this._changeDispatcher = new EventDispatcher(this);
        this.init();
    }
    CascadeShadowMapper.prototype.getSplitRatio = function (index /*uint*/) {
        return this._splitRatios[index];
    };
    CascadeShadowMapper.prototype.setSplitRatio = function (index /*uint*/, value) {
        if (value < 0)
            value = 0;
        else if (value > 1)
            value = 1;
        if (index >= this._numCascades)
            throw new Error("index must be smaller than the number of cascades!");
        this._splitRatios[index] = value;
    };
    CascadeShadowMapper.prototype.getDepthProjections = function (partition /*uint*/) {
        return this._depthCameras[partition].viewProjection;
    };
    CascadeShadowMapper.prototype.init = function () {
        this._splitRatios = new Array(this._numCascades);
        this._nearPlaneDistances = new Array(this._numCascades);
        var s = 1;
        for (var i = this._numCascades - 1; i >= 0; --i) {
            this._splitRatios[i] = s;
            s *= .4;
        }
        this._texOffsetsX = Array(-1, 1, -1, 1);
        this._texOffsetsY = Array(1, 1, -1, -1);
        this._pScissorRects = new Array(4);
        this._depthLenses = new Array();
        this._depthCameras = new Array();
        for (i = 0; i < this._numCascades; ++i) {
            this._depthLenses[i] = new FreeMatrixProjection();
            this._depthCameras[i] = new Camera(this._depthLenses[i]);
        }
    };
    CascadeShadowMapper.prototype._pSetDepthMapSize = function (value /*uint*/) {
        _super.prototype._pSetDepthMapSize.call(this, value);
        this.invalidateScissorRects();
    };
    CascadeShadowMapper.prototype.invalidateScissorRects = function () {
        this._pScissorRectsInvalid = true;
    };
    Object.defineProperty(CascadeShadowMapper.prototype, "numCascades", {
        get: function () {
            return this._numCascades;
        },
        set: function (value /*int*/) {
            if (value == this._numCascades)
                return;
            if (value < 1 || value > 4)
                throw new Error("numCascades must be an integer between 1 and 4");
            this._numCascades = value;
            this.invalidateScissorRects();
            this.init();
            this.dispatchEvent(new Event(Event.CHANGE));
        },
        enumerable: true,
        configurable: true
    });
    CascadeShadowMapper.prototype.pDrawDepthMap = function (target, scene, renderer) {
        if (this._pScissorRectsInvalid)
            this.updateScissorRects();
        this._pCasterCollector.cullPlanes = this._pCullPlanes;
        this._pCasterCollector.camera = this._pOverallDepthCamera;
        this._pCasterCollector.clear();
        scene.traversePartitions(this._pCasterCollector);
        renderer._iRenderCascades(this._pCasterCollector, target, this._numCascades, this._pScissorRects, this._depthCameras);
    };
    CascadeShadowMapper.prototype.updateScissorRects = function () {
        var half = this._pDepthMapSize * .5;
        this._pScissorRects[0] = new Rectangle(0, 0, half, half);
        this._pScissorRects[1] = new Rectangle(half, 0, half, half);
        this._pScissorRects[2] = new Rectangle(0, half, half, half);
        this._pScissorRects[3] = new Rectangle(half, half, half, half);
        this._pScissorRectsInvalid = false;
    };
    CascadeShadowMapper.prototype.pUpdateDepthProjection = function (viewCamera) {
        var matrix;
        var projection = viewCamera.projection;
        var projectionNear = projection.near;
        var projectionRange = projection.far - projectionNear;
        this.pUpdateProjectionFromFrustumCorners(viewCamera, viewCamera.projection.frustumCorners, this._pMatrix);
        this._pMatrix.appendScale(.96, .96, 1);
        this._pOverallDepthProjection.matrix = this._pMatrix;
        this.pUpdateCullPlanes(viewCamera);
        for (var i = 0; i < this._numCascades; ++i) {
            matrix = this._depthLenses[i].matrix;
            this._nearPlaneDistances[i] = projectionNear + this._splitRatios[i] * projectionRange;
            this._depthCameras[i].transform.matrix3D = this._pOverallDepthCamera.transform.matrix3D;
            this.updateProjectionPartition(matrix, this._splitRatios[i], this._texOffsetsX[i], this._texOffsetsY[i]);
            this._depthLenses[i].matrix = matrix;
        }
    };
    CascadeShadowMapper.prototype.updateProjectionPartition = function (matrix, splitRatio, texOffsetX, texOffsetY) {
        var raw = Matrix3DUtils.RAW_DATA_CONTAINER;
        var xN, yN, zN;
        var xF, yF, zF;
        var minX = Number.POSITIVE_INFINITY, minY = Number.POSITIVE_INFINITY, minZ;
        var maxX = Number.NEGATIVE_INFINITY, maxY = Number.NEGATIVE_INFINITY, maxZ = Number.NEGATIVE_INFINITY;
        var i = 0;
        while (i < 12) {
            xN = this._pLocalFrustum[i];
            yN = this._pLocalFrustum[i + 1];
            zN = this._pLocalFrustum[i + 2];
            xF = xN + (this._pLocalFrustum[i + 12] - xN) * splitRatio;
            yF = yN + (this._pLocalFrustum[i + 13] - yN) * splitRatio;
            zF = zN + (this._pLocalFrustum[i + 14] - zN) * splitRatio;
            if (xN < minX)
                minX = xN;
            if (xN > maxX)
                maxX = xN;
            if (yN < minY)
                minY = yN;
            if (yN > maxY)
                maxY = yN;
            if (zN > maxZ)
                maxZ = zN;
            if (xF < minX)
                minX = xF;
            if (xF > maxX)
                maxX = xF;
            if (yF < minY)
                minY = yF;
            if (yF > maxY)
                maxY = yF;
            if (zF > maxZ)
                maxZ = zF;
            i += 3;
        }
        minZ = 1;
        var w = (maxX - minX);
        var h = (maxY - minY);
        var d = 1 / (maxZ - minZ);
        if (minX < 0)
            minX -= this._pSnap; // because int() rounds up for < 0
        if (minY < 0)
            minY -= this._pSnap;
        minX = Math.floor(minX / this._pSnap) * this._pSnap;
        minY = Math.floor(minY / this._pSnap) * this._pSnap;
        var snap2 = 2 * this._pSnap;
        w = Math.floor(w / snap2 + 1) * snap2;
        h = Math.floor(h / snap2 + 1) * snap2;
        maxX = minX + w;
        maxY = minY + h;
        w = 1 / w;
        h = 1 / h;
        raw[0] = 2 * w;
        raw[5] = 2 * h;
        raw[10] = d;
        raw[12] = -(maxX + minX) * w;
        raw[13] = -(maxY + minY) * h;
        raw[14] = -minZ * d;
        raw[15] = 1;
        raw[1] = raw[2] = raw[3] = raw[4] = raw[6] = raw[7] = raw[8] = raw[9] = raw[11] = 0;
        matrix.copyRawDataFrom(raw);
        matrix.appendScale(.96, .96, 1);
        matrix.appendTranslation(texOffsetX, texOffsetY, 0);
        matrix.appendScale(.5, .5, 1);
    };
    CascadeShadowMapper.prototype.addEventListener = function (type, listener) {
        this._changeDispatcher.addEventListener(type, listener);
    };
    CascadeShadowMapper.prototype.removeEventListener = function (type, listener) {
        this._changeDispatcher.removeEventListener(type, listener);
    };
    CascadeShadowMapper.prototype.dispatchEvent = function (event) {
        return this._changeDispatcher.dispatchEvent(event);
    };
    CascadeShadowMapper.prototype.hasEventListener = function (type) {
        return this._changeDispatcher.hasEventListener(type);
    };
    Object.defineProperty(CascadeShadowMapper.prototype, "_iNearPlaneDistances", {
        get: function () {
            return this._nearPlaneDistances;
        },
        enumerable: true,
        configurable: true
    });
    return CascadeShadowMapper;
})(DirectionalShadowMapper);
module.exports = CascadeShadowMapper;


},{"awayjs-core/lib/events/Event":undefined,"awayjs-core/lib/events/EventDispatcher":undefined,"awayjs-core/lib/geom/Matrix3DUtils":undefined,"awayjs-core/lib/geom/Rectangle":undefined,"awayjs-core/lib/projections/FreeMatrixProjection":undefined,"awayjs-display/lib/entities/Camera":"awayjs-display/lib/entities/Camera","awayjs-display/lib/materials/shadowmappers/DirectionalShadowMapper":"awayjs-display/lib/materials/shadowmappers/DirectionalShadowMapper"}],"awayjs-display/lib/materials/shadowmappers/CubeMapShadowMapper":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var PartialImplementationError = require("awayjs-core/lib/errors/PartialImplementationError");
var Camera = require("awayjs-display/lib/entities/Camera");
var ShadowMapperBase = require("awayjs-display/lib/materials/shadowmappers/ShadowMapperBase");
var CubeMapShadowMapper = (function (_super) {
    __extends(CubeMapShadowMapper, _super);
    function CubeMapShadowMapper() {
        _super.call(this);
        this._pDepthMapSize = 512;
        this._needsRender = new Array();
        this.initCameras();
    }
    CubeMapShadowMapper.prototype.initCameras = function () {
        this._depthCameras = new Array();
        this._projections = new Array();
        // posX, negX, posY, negY, posZ, negZ
        this.addCamera(0, 90, 0);
        this.addCamera(0, -90, 0);
        this.addCamera(-90, 0, 0);
        this.addCamera(90, 0, 0);
        this.addCamera(0, 0, 0);
        this.addCamera(0, 180, 0);
    };
    CubeMapShadowMapper.prototype.addCamera = function (rotationX, rotationY, rotationZ) {
        var cam = new Camera();
        cam.rotationX = rotationX;
        cam.rotationY = rotationY;
        cam.rotationZ = rotationZ;
        cam.projection.near = .01;
        var projection = cam.projection;
        projection.fieldOfView = 90;
        this._projections.push(projection);
        cam.projection._iAspectRatio = 1;
        this._depthCameras.push(cam);
    };
    //@override
    CubeMapShadowMapper.prototype.pCreateDepthTexture = function () {
        throw new PartialImplementationError();
        /*
         return new RenderCubeTexture( this._depthMapSize );
         */
    };
    //@override
    CubeMapShadowMapper.prototype.pUpdateDepthProjection = function (viewCamera) {
        var light = (this._pLight);
        var maxDistance = light._pFallOff;
        var pos = this._pLight.scenePosition;
        for (var i = 0; i < 6; ++i) {
            this._projections[i].far = maxDistance;
            this._depthCameras[i].transform.position = pos;
            this._needsRender[i] = true;
        }
    };
    //@override
    CubeMapShadowMapper.prototype.pDrawDepthMap = function (target, scene, renderer) {
        for (var i = 0; i < 6; ++i) {
            if (this._needsRender[i]) {
                this._pCasterCollector.camera = this._depthCameras[i];
                this._pCasterCollector.clear();
                scene.traversePartitions(this._pCasterCollector);
                renderer._iRender(this._pCasterCollector, target, null, i);
            }
        }
    };
    return CubeMapShadowMapper;
})(ShadowMapperBase);
module.exports = CubeMapShadowMapper;


},{"awayjs-core/lib/errors/PartialImplementationError":undefined,"awayjs-display/lib/entities/Camera":"awayjs-display/lib/entities/Camera","awayjs-display/lib/materials/shadowmappers/ShadowMapperBase":"awayjs-display/lib/materials/shadowmappers/ShadowMapperBase"}],"awayjs-display/lib/materials/shadowmappers/DirectionalShadowMapper":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Matrix3D = require("awayjs-core/lib/geom/Matrix3D");
var FreeMatrixProjection = require("awayjs-core/lib/projections/FreeMatrixProjection");
var Camera = require("awayjs-display/lib/entities/Camera");
var ShadowMapperBase = require("awayjs-display/lib/materials/shadowmappers/ShadowMapperBase");
var DirectionalShadowMapper = (function (_super) {
    __extends(DirectionalShadowMapper, _super);
    function DirectionalShadowMapper() {
        _super.call(this);
        this._pLightOffset = 10000;
        this._pSnap = 64;
        this._pCullPlanes = [];
        this._pOverallDepthProjection = new FreeMatrixProjection();
        this._pOverallDepthCamera = new Camera(this._pOverallDepthProjection);
        this._pLocalFrustum = [];
        this._pMatrix = new Matrix3D();
    }
    Object.defineProperty(DirectionalShadowMapper.prototype, "snap", {
        get: function () {
            return this._pSnap;
        },
        set: function (value) {
            this._pSnap = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DirectionalShadowMapper.prototype, "lightOffset", {
        get: function () {
            return this._pLightOffset;
        },
        set: function (value) {
            this._pLightOffset = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DirectionalShadowMapper.prototype, "iDepthProjection", {
        //@arcane
        get: function () {
            return this._pOverallDepthCamera.viewProjection;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DirectionalShadowMapper.prototype, "depth", {
        //@arcane
        get: function () {
            return this._pMaxZ - this._pMinZ;
        },
        enumerable: true,
        configurable: true
    });
    //@override
    DirectionalShadowMapper.prototype.pDrawDepthMap = function (target, scene, renderer) {
        this._pCasterCollector.camera = this._pOverallDepthCamera;
        this._pCasterCollector.cullPlanes = this._pCullPlanes;
        this._pCasterCollector.clear();
        scene.traversePartitions(this._pCasterCollector);
        renderer._iRender(this._pCasterCollector, target);
    };
    //@protected
    DirectionalShadowMapper.prototype.pUpdateCullPlanes = function (viewCamera) {
        var lightFrustumPlanes = this._pOverallDepthCamera.frustumPlanes;
        var viewFrustumPlanes = viewCamera.frustumPlanes;
        this._pCullPlanes.length = 4;
        this._pCullPlanes[0] = lightFrustumPlanes[0];
        this._pCullPlanes[1] = lightFrustumPlanes[1];
        this._pCullPlanes[2] = lightFrustumPlanes[2];
        this._pCullPlanes[3] = lightFrustumPlanes[3];
        var light = this._pLight;
        var dir = light.sceneDirection;
        var dirX = dir.x;
        var dirY = dir.y;
        var dirZ = dir.z;
        var j = 4;
        for (var i = 0; i < 6; ++i) {
            var plane = viewFrustumPlanes[i];
            if (plane.a * dirX + plane.b * dirY + plane.c * dirZ < 0)
                this._pCullPlanes[j++] = plane;
        }
    };
    //@override
    DirectionalShadowMapper.prototype.pUpdateDepthProjection = function (viewCamera) {
        this.pUpdateProjectionFromFrustumCorners(viewCamera, viewCamera.projection.frustumCorners, this._pMatrix);
        this._pOverallDepthProjection.matrix = this._pMatrix;
        this.pUpdateCullPlanes(viewCamera);
    };
    DirectionalShadowMapper.prototype.pUpdateProjectionFromFrustumCorners = function (viewCamera, corners, matrix) {
        var raw = new Array();
        var dir;
        var x, y, z;
        var minX, minY;
        var maxX, maxY;
        var i;
        var light = this._pLight;
        dir = light.sceneDirection;
        this._pOverallDepthCamera.transform.matrix3D = this._pLight.sceneTransform;
        x = Math.floor((viewCamera.x - dir.x * this._pLightOffset) / this._pSnap) * this._pSnap;
        y = Math.floor((viewCamera.y - dir.y * this._pLightOffset) / this._pSnap) * this._pSnap;
        z = Math.floor((viewCamera.z - dir.z * this._pLightOffset) / this._pSnap) * this._pSnap;
        this._pOverallDepthCamera.x = x;
        this._pOverallDepthCamera.y = y;
        this._pOverallDepthCamera.z = z;
        this._pMatrix.copyFrom(this._pOverallDepthCamera.inverseSceneTransform);
        this._pMatrix.prepend(viewCamera.sceneTransform);
        this._pMatrix.transformVectors(corners, this._pLocalFrustum);
        minX = maxX = this._pLocalFrustum[0];
        minY = maxY = this._pLocalFrustum[1];
        this._pMaxZ = this._pLocalFrustum[2];
        i = 3;
        while (i < 24) {
            x = this._pLocalFrustum[i];
            y = this._pLocalFrustum[i + 1];
            z = this._pLocalFrustum[i + 2];
            if (x < minX)
                minX = x;
            if (x > maxX)
                maxX = x;
            if (y < minY)
                minY = y;
            if (y > maxY)
                maxY = y;
            if (z > this._pMaxZ)
                this._pMaxZ = z;
            i += 3;
        }
        this._pMinZ = 1;
        var w = maxX - minX;
        var h = maxY - minY;
        var d = 1 / (this._pMaxZ - this._pMinZ);
        if (minX < 0)
            minX -= this._pSnap; // because int() rounds up for < 0
        if (minY < 0)
            minY -= this._pSnap;
        minX = Math.floor(minX / this._pSnap) * this._pSnap;
        minY = Math.floor(minY / this._pSnap) * this._pSnap;
        var snap2 = 2 * this._pSnap;
        w = Math.floor(w / snap2 + 2) * snap2;
        h = Math.floor(h / snap2 + 2) * snap2;
        maxX = minX + w;
        maxY = minY + h;
        w = 1 / w;
        h = 1 / h;
        raw[0] = 2 * w;
        raw[5] = 2 * h;
        raw[10] = d;
        raw[12] = -(maxX + minX) * w;
        raw[13] = -(maxY + minY) * h;
        raw[14] = -this._pMinZ * d;
        raw[15] = 1;
        raw[1] = raw[2] = raw[3] = raw[4] = raw[6] = raw[7] = raw[8] = raw[9] = raw[11] = 0;
        matrix.copyRawDataFrom(raw);
    };
    return DirectionalShadowMapper;
})(ShadowMapperBase);
module.exports = DirectionalShadowMapper;


},{"awayjs-core/lib/geom/Matrix3D":undefined,"awayjs-core/lib/projections/FreeMatrixProjection":undefined,"awayjs-display/lib/entities/Camera":"awayjs-display/lib/entities/Camera","awayjs-display/lib/materials/shadowmappers/ShadowMapperBase":"awayjs-display/lib/materials/shadowmappers/ShadowMapperBase"}],"awayjs-display/lib/materials/shadowmappers/NearDirectionalShadowMapper":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var DirectionalShadowMapper = require("awayjs-display/lib/materials/shadowmappers/DirectionalShadowMapper");
var NearDirectionalShadowMapper = (function (_super) {
    __extends(NearDirectionalShadowMapper, _super);
    function NearDirectionalShadowMapper(coverageRatio) {
        if (coverageRatio === void 0) { coverageRatio = .5; }
        _super.call(this);
        this.coverageRatio = coverageRatio;
    }
    Object.defineProperty(NearDirectionalShadowMapper.prototype, "coverageRatio", {
        /**
         * A value between 0 and 1 to indicate the ratio of the view frustum that needs to be covered by the shadow map.
         */
        get: function () {
            return this._coverageRatio;
        },
        set: function (value) {
            if (value > 1)
                value = 1;
            else if (value < 0)
                value = 0;
            this._coverageRatio = value;
        },
        enumerable: true,
        configurable: true
    });
    NearDirectionalShadowMapper.prototype.pUpdateDepthProjection = function (viewCamera) {
        var corners = viewCamera.projection.frustumCorners;
        for (var i = 0; i < 12; ++i) {
            var v = corners[i];
            this._pLocalFrustum[i] = v;
            this._pLocalFrustum[i + 12] = v + (corners[i + 12] - v) * this._coverageRatio;
        }
        this.pUpdateProjectionFromFrustumCorners(viewCamera, this._pLocalFrustum, this._pMatrix);
        this._pOverallDepthProjection.matrix = this._pMatrix;
    };
    return NearDirectionalShadowMapper;
})(DirectionalShadowMapper);
module.exports = NearDirectionalShadowMapper;


},{"awayjs-display/lib/materials/shadowmappers/DirectionalShadowMapper":"awayjs-display/lib/materials/shadowmappers/DirectionalShadowMapper"}],"awayjs-display/lib/materials/shadowmappers/ShadowMapperBase":[function(require,module,exports){
var AbstractMethodError = require("awayjs-core/lib/errors/AbstractMethodError");
var ShadowCasterCollector = require("awayjs-display/lib/traverse/ShadowCasterCollector");
var RenderTexture = require("awayjs-core/lib/textures/RenderTexture");
var ShadowMapperBase = (function () {
    function ShadowMapperBase() {
        this._pDepthMapSize = 2048;
        this._autoUpdateShadows = true;
        this._pCasterCollector = this.pCreateCasterCollector();
    }
    ShadowMapperBase.prototype.pCreateCasterCollector = function () {
        return new ShadowCasterCollector();
    };
    Object.defineProperty(ShadowMapperBase.prototype, "autoUpdateShadows", {
        get: function () {
            return this._autoUpdateShadows;
        },
        set: function (value) {
            this._autoUpdateShadows = value;
        },
        enumerable: true,
        configurable: true
    });
    ShadowMapperBase.prototype.updateShadows = function () {
        this._iShadowsInvalid = true;
    };
    ShadowMapperBase.prototype.iSetDepthMap = function (depthMap) {
        if (this._depthMap == depthMap)
            return;
        if (this._depthMap && !this._explicitDepthMap)
            this._depthMap.dispose();
        this._depthMap = depthMap;
        if (this._depthMap) {
            this._explicitDepthMap = true;
            this._pDepthMapSize = this._depthMap.size;
        }
        else {
            this._explicitDepthMap = false;
        }
    };
    Object.defineProperty(ShadowMapperBase.prototype, "light", {
        get: function () {
            return this._pLight;
        },
        set: function (value) {
            this._pLight = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShadowMapperBase.prototype, "depthMap", {
        get: function () {
            if (!this._depthMap)
                this._depthMap = this.pCreateDepthTexture();
            return this._depthMap;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShadowMapperBase.prototype, "depthMapSize", {
        get: function () {
            return this._pDepthMapSize;
        },
        set: function (value) {
            if (value == this._pDepthMapSize)
                return;
            this._pSetDepthMapSize(value);
        },
        enumerable: true,
        configurable: true
    });
    ShadowMapperBase.prototype.dispose = function () {
        this._pCasterCollector = null;
        if (this._depthMap && !this._explicitDepthMap)
            this._depthMap.dispose();
        this._depthMap = null;
    };
    ShadowMapperBase.prototype.pCreateDepthTexture = function () {
        return new RenderTexture(this._pDepthMapSize, this._pDepthMapSize);
    };
    ShadowMapperBase.prototype.iRenderDepthMap = function (entityCollector, renderer) {
        this._iShadowsInvalid = false;
        this.pUpdateDepthProjection(entityCollector.camera);
        if (!this._depthMap)
            this._depthMap = this.pCreateDepthTexture();
        this.pDrawDepthMap(this._depthMap, entityCollector.scene, renderer);
    };
    ShadowMapperBase.prototype.pUpdateDepthProjection = function (viewCamera) {
        throw new AbstractMethodError();
    };
    ShadowMapperBase.prototype.pDrawDepthMap = function (target, scene, renderer) {
        throw new AbstractMethodError();
    };
    ShadowMapperBase.prototype._pSetDepthMapSize = function (value) {
        this._pDepthMapSize = value;
        if (this._explicitDepthMap) {
            throw Error("Cannot set depth map size for the current renderer.");
        }
        else if (this._depthMap) {
            this._depthMap.dispose();
            this._depthMap = null;
        }
    };
    return ShadowMapperBase;
})();
module.exports = ShadowMapperBase;


},{"awayjs-core/lib/errors/AbstractMethodError":undefined,"awayjs-core/lib/textures/RenderTexture":undefined,"awayjs-display/lib/traverse/ShadowCasterCollector":"awayjs-display/lib/traverse/ShadowCasterCollector"}],"awayjs-display/lib/partition/CameraNode":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EntityNode = require("awayjs-display/lib/partition/EntityNode");
/**
 * @class away.partition.CameraNode
 */
var CameraNode = (function (_super) {
    __extends(CameraNode, _super);
    function CameraNode(pool, camera, partition) {
        _super.call(this, pool, camera, partition);
    }
    /**
     * @inheritDoc
     */
    CameraNode.prototype.acceptTraverser = function (traverser) {
        // todo: dead end for now, if it has a debug mesh, then sure accept that
    };
    CameraNode.id = "cameraNode";
    return CameraNode;
})(EntityNode);
module.exports = CameraNode;


},{"awayjs-display/lib/partition/EntityNode":"awayjs-display/lib/partition/EntityNode"}],"awayjs-display/lib/partition/DirectionalLightNode":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EntityNode = require("awayjs-display/lib/partition/EntityNode");
/**
 * @class away.partition.DirectionalLightNode
 */
var DirectionalLightNode = (function (_super) {
    __extends(DirectionalLightNode, _super);
    /**
     *
     * @param directionalLight
     */
    function DirectionalLightNode(pool, directionalLight, partition) {
        _super.call(this, pool, directionalLight, partition);
        this._directionalLight = directionalLight;
    }
    /**
     * @inheritDoc
     */
    DirectionalLightNode.prototype.acceptTraverser = function (traverser) {
        if (traverser.enterNode(this))
            traverser.applyDirectionalLight(this._directionalLight);
    };
    /**
     *
     * @returns {boolean}
     */
    DirectionalLightNode.prototype.isCastingShadow = function () {
        return false;
    };
    DirectionalLightNode.id = "directionalLightNode";
    return DirectionalLightNode;
})(EntityNode);
module.exports = DirectionalLightNode;


},{"awayjs-display/lib/partition/EntityNode":"awayjs-display/lib/partition/EntityNode"}],"awayjs-display/lib/partition/EntityNode":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Vector3D = require("awayjs-core/lib/geom/Vector3D");
var AxisAlignedBoundingBox = require("awayjs-display/lib/bounds/AxisAlignedBoundingBox");
var BoundingSphere = require("awayjs-display/lib/bounds/BoundingSphere");
var BoundsType = require("awayjs-display/lib/bounds/BoundsType");
var NullBounds = require("awayjs-display/lib/bounds/NullBounds");
var NodeBase = require("awayjs-display/lib/partition/NodeBase");
/**
 * @class away.partition.EntityNode
 */
var EntityNode = (function (_super) {
    __extends(EntityNode, _super);
    function EntityNode(pool, entity, partition) {
        _super.call(this);
        this._pool = pool;
        this._entity = entity;
        this._partition = partition;
        this._iNumEntities = 1;
        this.updateBounds();
        this.debugVisible = this._entity.debugVisible;
    }
    Object.defineProperty(EntityNode.prototype, "entity", {
        get: function () {
            return this._entity;
        },
        enumerable: true,
        configurable: true
    });
    EntityNode.prototype.removeFromParent = function () {
        if (this._iParent)
            this._iParent.iRemoveNode(this);
        this._iParent = null;
    };
    /**
     *
     * @returns {boolean}
     */
    EntityNode.prototype.isCastingShadow = function () {
        return this.entity.castsShadows;
    };
    /**
     *
     * @param planes
     * @param numPlanes
     * @returns {boolean}
     */
    EntityNode.prototype.isInFrustum = function (planes, numPlanes) {
        if (!this._entity._iIsVisible())
            return false;
        return this._bounds.isInFrustum(planes, numPlanes);
    };
    /**
     * @inheritDoc
     */
    EntityNode.prototype.acceptTraverser = function (traverser) {
        if (traverser.enterNode(this)) {
            traverser.applyEntity(this._entity);
            if (this._pImplicitDebugVisible && traverser.isEntityCollector)
                traverser.applyEntity(this._pDebugEntity);
        }
    };
    /**
     * @inheritDoc
     */
    EntityNode.prototype.isIntersectingRay = function (rayPosition, rayDirection) {
        if (!this._entity._iIsVisible())
            return false;
        var pickingCollisionVO = this._entity._iPickingCollisionVO;
        pickingCollisionVO.localRayPosition = this._entity.inverseSceneTransform.transformVector(rayPosition);
        pickingCollisionVO.localRayDirection = this._entity.inverseSceneTransform.deltaTransformVector(rayDirection);
        if (!pickingCollisionVO.localNormal)
            pickingCollisionVO.localNormal = new Vector3D();
        var rayEntryDistance = this._bounds.rayIntersection(pickingCollisionVO.localRayPosition, pickingCollisionVO.localRayDirection, pickingCollisionVO.localNormal);
        if (rayEntryDistance < 0)
            return false;
        pickingCollisionVO.rayEntryDistance = rayEntryDistance;
        pickingCollisionVO.rayPosition = rayPosition;
        pickingCollisionVO.rayDirection = rayDirection;
        pickingCollisionVO.rayOriginIsInsideBounds = rayEntryDistance == 0;
        return true;
    };
    /**
     *
     * @protected
     */
    EntityNode.prototype._pCreateDebugEntity = function () {
        return this._bounds.boundsPrimitive;
    };
    EntityNode.prototype.invalidatePartition = function () {
        this._bounds.invalidate();
        this._partition.iMarkForUpdate(this);
    };
    EntityNode.prototype.updateBounds = function () {
        if (this._entity.boundsType == BoundsType.AXIS_ALIGNED_BOX)
            this._bounds = new AxisAlignedBoundingBox(this._entity);
        else if (this._entity.boundsType == BoundsType.SPHERE)
            this._bounds = new BoundingSphere(this._entity);
        else if (this._entity.boundsType == BoundsType.NULL)
            this._bounds = new NullBounds();
        this.updateDebugEntity();
    };
    EntityNode.id = "entityNode";
    return EntityNode;
})(NodeBase);
module.exports = EntityNode;


},{"awayjs-core/lib/geom/Vector3D":undefined,"awayjs-display/lib/bounds/AxisAlignedBoundingBox":"awayjs-display/lib/bounds/AxisAlignedBoundingBox","awayjs-display/lib/bounds/BoundingSphere":"awayjs-display/lib/bounds/BoundingSphere","awayjs-display/lib/bounds/BoundsType":"awayjs-display/lib/bounds/BoundsType","awayjs-display/lib/bounds/NullBounds":"awayjs-display/lib/bounds/NullBounds","awayjs-display/lib/partition/NodeBase":"awayjs-display/lib/partition/NodeBase"}],"awayjs-display/lib/partition/LightProbeNode":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EntityNode = require("awayjs-display/lib/partition/EntityNode");
/**
 * @class away.partition.LightProbeNode
 */
var LightProbeNode = (function (_super) {
    __extends(LightProbeNode, _super);
    /**
     *
     * @param lightProbe
     */
    function LightProbeNode(pool, lightProbe, partition) {
        _super.call(this, pool, lightProbe, partition);
        this._lightProbe = lightProbe;
    }
    /**
     * @inheritDoc
     */
    LightProbeNode.prototype.acceptTraverser = function (traverser) {
        if (traverser.enterNode(this))
            traverser.applyLightProbe(this._lightProbe);
    };
    /**
     *
     * @returns {boolean}
     */
    LightProbeNode.prototype.isCastingShadow = function () {
        return false;
    };
    LightProbeNode.id = "lightProbeNode";
    return LightProbeNode;
})(EntityNode);
module.exports = LightProbeNode;


},{"awayjs-display/lib/partition/EntityNode":"awayjs-display/lib/partition/EntityNode"}],"awayjs-display/lib/partition/NodeBase":[function(require,module,exports){
var AbstractMethodError = require("awayjs-core/lib/errors/AbstractMethodError");
/**
 * @class away.partition.NodeBase
 */
var NodeBase = (function () {
    /**
     *
     */
    function NodeBase() {
        this._pNumChildNodes = 0;
        this._iNumEntities = 0;
        this._pChildNodes = new Array();
    }
    Object.defineProperty(NodeBase.prototype, "debugVisible", {
        /**
         *
         */
        get: function () {
            return this._explicitDebugVisible;
        },
        set: function (value) {
            if (this._explicitDebugVisible == value)
                return;
            this._explicitDebugVisible = value;
            this._iUpdateImplicitDebugVisible(this._iParent ? this._iParent.debugChildrenVisible : false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NodeBase.prototype, "debugChildrenVisible", {
        get: function () {
            return this._debugChildrenVisible;
        },
        set: function (value) {
            if (this._debugChildrenVisible == value)
                return;
            this._debugChildrenVisible = value;
            for (var i = 0; i < this._pNumChildNodes; ++i)
                this._pChildNodes[i]._iUpdateImplicitDebugVisible(this._debugChildrenVisible);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NodeBase.prototype, "parent", {
        /**
         *
         */
        get: function () {
            return this._iParent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NodeBase.prototype, "_pNumEntities", {
        /**
         *
         * @protected
         */
        get: function () {
            return this._iNumEntities;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     * @param planes
     * @param numPlanes
     * @returns {boolean}
     * @internal
     */
    NodeBase.prototype.isInFrustum = function (planes, numPlanes) {
        return true;
    };
    /**
     *
     * @param rayPosition
     * @param rayDirection
     * @returns {boolean}
     */
    NodeBase.prototype.isIntersectingRay = function (rayPosition, rayDirection) {
        return true;
    };
    /**
     *
     * @returns {boolean}
     */
    NodeBase.prototype.isCastingShadow = function () {
        return true;
    };
    /**
     *
     * @param entity
     * @returns {away.partition.NodeBase}
     */
    NodeBase.prototype.findPartitionForEntity = function (entity) {
        return this;
    };
    /**
     *
     * @param traverser
     */
    NodeBase.prototype.acceptTraverser = function (traverser) {
        if (this._pNumEntities == 0 && !this._pImplicitDebugVisible)
            return;
        if (traverser.enterNode(this)) {
            var i = 0;
            while (i < this._pNumChildNodes)
                this._pChildNodes[i++].acceptTraverser(traverser);
            if (this._pImplicitDebugVisible && traverser.isEntityCollector)
                traverser.applyEntity(this._pDebugEntity);
        }
    };
    /**
     *
     * @protected
     */
    NodeBase.prototype.applyDebugEntity = function (traverser) {
        if (this._pDebugEntity == null)
            this._pDebugEntity = this._pCreateDebugEntity();
        traverser.applyEntity(this._pDebugEntity);
    };
    /**
     *
     * @param node
     * @internal
     */
    NodeBase.prototype.iAddNode = function (node) {
        node._iParent = this;
        this._iNumEntities += node._pNumEntities;
        this._pChildNodes[this._pNumChildNodes++] = node;
        node._iUpdateImplicitDebugVisible(this.debugChildrenVisible);
        var numEntities = node._pNumEntities;
        node = this;
        do {
            node._iNumEntities += numEntities;
        } while ((node = node._iParent) != null);
    };
    /**
     *
     * @param node
     * @internal
     */
    NodeBase.prototype.iRemoveNode = function (node) {
        var index = this._pChildNodes.indexOf(node);
        this._pChildNodes[index] = this._pChildNodes[--this._pNumChildNodes];
        this._pChildNodes.pop();
        node._iUpdateImplicitDebugVisible(false);
        var numEntities = node._pNumEntities;
        node = this;
        do {
            node._pNumEntities -= numEntities;
        } while ((node = node._iParent) != null);
    };
    NodeBase.prototype._iUpdateImplicitDebugVisible = function (value) {
        if (this._pImplicitDebugVisible == this._explicitDebugVisible || value)
            return;
        this._pImplicitDebugVisible = this._explicitDebugVisible || value;
        for (var i = 0; i < this._pNumChildNodes; ++i)
            this._pChildNodes[i]._iUpdateImplicitDebugVisible(this._debugChildrenVisible);
        if (this._pImplicitDebugVisible) {
            this._pDebugEntity = this._pCreateDebugEntity();
        }
        else {
            //this._pDebugEntity.dispose();
            this._pDebugEntity = null;
        }
    };
    NodeBase.prototype.updateDebugEntity = function () {
        if (this._pImplicitDebugVisible) {
            //this._pDebugEntity.dispose();
            this._pDebugEntity = this._pCreateDebugEntity();
        }
    };
    NodeBase.prototype._pCreateDebugEntity = function () {
        throw new AbstractMethodError();
    };
    return NodeBase;
})();
module.exports = NodeBase;


},{"awayjs-core/lib/errors/AbstractMethodError":undefined}],"awayjs-display/lib/partition/NullNode":[function(require,module,exports){
/**
 * @class away.partition.NullNode
 */
var NullNode = (function () {
    function NullNode() {
    }
    return NullNode;
})();
module.exports = NullNode;


},{}],"awayjs-display/lib/partition/Partition":[function(require,module,exports){
var CameraNode = require("awayjs-display/lib/partition/CameraNode");
var DirectionalLightNode = require("awayjs-display/lib/partition/DirectionalLightNode");
var EntityNode = require("awayjs-display/lib/partition/EntityNode");
var LightProbeNode = require("awayjs-display/lib/partition/LightProbeNode");
var PointLightNode = require("awayjs-display/lib/partition/PointLightNode");
var SkyboxNode = require("awayjs-display/lib/partition/SkyboxNode");
var NullNode = require("awayjs-display/lib/partition/NullNode");
var EntityNodePool = require("awayjs-display/lib/pool/EntityNodePool");
/**
 * @class away.partition.Partition
 */
var Partition = (function () {
    function Partition(rootNode) {
        this._updatesMade = false;
        this._rootNode = rootNode || new NullNode();
        this._cameraNodePool = new EntityNodePool(CameraNode, this);
        this._directionalLightNodePool = new EntityNodePool(DirectionalLightNode, this);
        this._entityNodePool = new EntityNodePool(EntityNode, this);
        this._lightProbeNodePool = new EntityNodePool(LightProbeNode, this);
        this._pointLightNodePool = new EntityNodePool(PointLightNode, this);
        this._skyboxNodePool = new EntityNodePool(SkyboxNode, this);
    }
    Object.defineProperty(Partition.prototype, "rootNode", {
        get: function () {
            return this._rootNode;
        },
        enumerable: true,
        configurable: true
    });
    Partition.prototype.traverse = function (traverser) {
        if (this._updatesMade)
            this.updateEntities();
        this._rootNode.acceptTraverser(traverser);
    };
    Partition.prototype.iMarkForUpdate = function (node) {
        var t = this._updateQueue;
        while (t) {
            if (node == t)
                return;
            t = t._iUpdateQueueNext;
        }
        node._iUpdateQueueNext = this._updateQueue;
        this._updateQueue = node;
        this._updatesMade = true;
    };
    Partition.prototype.iRemoveEntity = function (node) {
        var t;
        node.removeFromParent();
        if (node == this._updateQueue) {
            this._updateQueue = node._iUpdateQueueNext;
        }
        else {
            t = this._updateQueue;
            while (t && t._iUpdateQueueNext != node)
                t = t._iUpdateQueueNext;
            if (t)
                t._iUpdateQueueNext = node._iUpdateQueueNext;
        }
        node._iUpdateQueueNext = null;
        if (!this._updateQueue)
            this._updatesMade = false;
    };
    Partition.prototype.updateEntities = function () {
        var node = this._updateQueue;
        var targetNode;
        var t;
        this._updateQueue = null;
        this._updatesMade = false;
        do {
            targetNode = this._rootNode.findPartitionForEntity(node.entity);
            if (node.parent != targetNode) {
                if (node)
                    node.removeFromParent();
                targetNode.iAddNode(node);
            }
            t = node._iUpdateQueueNext;
            node._iUpdateQueueNext = null;
            //required for controllers with autoUpdate set to true
            node.entity._iInternalUpdate();
        } while ((node = t) != null);
    };
    /**
     * @internal
     */
    Partition.prototype._iRegisterCamera = function (camera) {
        this.iMarkForUpdate(this._cameraNodePool.getItem(camera));
    };
    /**
     * @internal
     */
    Partition.prototype._iRegisterDirectionalLight = function (directionalLight) {
        this.iMarkForUpdate(this._directionalLightNodePool.getItem(directionalLight));
    };
    /**
     * @internal
     */
    Partition.prototype._iRegisterEntity = function (entity) {
        this.iMarkForUpdate(this._entityNodePool.getItem(entity));
    };
    /**
     * @internal
     */
    Partition.prototype._iRegisterLightProbe = function (lightProbe) {
        this.iMarkForUpdate(this._lightProbeNodePool.getItem(lightProbe));
    };
    /**
     * @internal
     */
    Partition.prototype._iRegisterPointLight = function (pointLight) {
        this.iMarkForUpdate(this._pointLightNodePool.getItem(pointLight));
    };
    /**
     * @internal
     */
    Partition.prototype._iRegisterSkybox = function (skybox) {
        this.iMarkForUpdate(this._skyboxNodePool.getItem(skybox));
    };
    /**
     * @internal
     */
    Partition.prototype._iUnregisterCamera = function (camera) {
        this.iRemoveEntity(this._cameraNodePool.disposeItem(camera));
    };
    /**
     * @internal
     */
    Partition.prototype._iUnregisterDirectionalLight = function (directionalLight) {
        this.iRemoveEntity(this._directionalLightNodePool.disposeItem(directionalLight));
    };
    /**
     * @internal
     */
    Partition.prototype._iUnregisterEntity = function (entity) {
        this.iRemoveEntity(this._entityNodePool.disposeItem(entity));
    };
    /**
     * @internal
     */
    Partition.prototype._iUnregisterLightProbe = function (lightProbe) {
        this.iRemoveEntity(this._lightProbeNodePool.disposeItem(lightProbe));
    };
    /**
     * @internal
     */
    Partition.prototype._iUnregisterPointLight = function (pointLight) {
        this.iRemoveEntity(this._pointLightNodePool.disposeItem(pointLight));
    };
    /**
     * @internal
     */
    Partition.prototype._iUnregisterSkybox = function (skybox) {
        this.iRemoveEntity(this._skyboxNodePool.disposeItem(skybox));
    };
    return Partition;
})();
module.exports = Partition;


},{"awayjs-display/lib/partition/CameraNode":"awayjs-display/lib/partition/CameraNode","awayjs-display/lib/partition/DirectionalLightNode":"awayjs-display/lib/partition/DirectionalLightNode","awayjs-display/lib/partition/EntityNode":"awayjs-display/lib/partition/EntityNode","awayjs-display/lib/partition/LightProbeNode":"awayjs-display/lib/partition/LightProbeNode","awayjs-display/lib/partition/NullNode":"awayjs-display/lib/partition/NullNode","awayjs-display/lib/partition/PointLightNode":"awayjs-display/lib/partition/PointLightNode","awayjs-display/lib/partition/SkyboxNode":"awayjs-display/lib/partition/SkyboxNode","awayjs-display/lib/pool/EntityNodePool":"awayjs-display/lib/pool/EntityNodePool"}],"awayjs-display/lib/partition/PointLightNode":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EntityNode = require("awayjs-display/lib/partition/EntityNode");
/**
 * @class away.partition.PointLightNode
 */
var PointLightNode = (function (_super) {
    __extends(PointLightNode, _super);
    /**
     *
     * @param pointLight
     */
    function PointLightNode(pool, pointLight, partition) {
        _super.call(this, pool, pointLight, partition);
        this._pointLight = pointLight;
    }
    /**
     * @inheritDoc
     */
    PointLightNode.prototype.acceptTraverser = function (traverser) {
        if (traverser.enterNode(this))
            traverser.applyPointLight(this._pointLight);
    };
    /**
     *
     * @returns {boolean}
     */
    PointLightNode.prototype.isCastingShadow = function () {
        return false;
    };
    PointLightNode.id = "pointLightNode";
    return PointLightNode;
})(EntityNode);
module.exports = PointLightNode;


},{"awayjs-display/lib/partition/EntityNode":"awayjs-display/lib/partition/EntityNode"}],"awayjs-display/lib/partition/SkyboxNode":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EntityNode = require("awayjs-display/lib/partition/EntityNode");
/**
 * SkyboxNode is a space partitioning leaf node that contains a Skybox object.
 *
 * @class away.partition.SkyboxNode
 */
var SkyboxNode = (function (_super) {
    __extends(SkyboxNode, _super);
    /**
     * Creates a new SkyboxNode object.
     * @param skyBox The Skybox to be contained in the node.
     */
    function SkyboxNode(pool, skyBox, partition) {
        _super.call(this, pool, skyBox, partition);
        this._skyBox = skyBox;
    }
    /**
     * @inheritDoc
     */
    SkyboxNode.prototype.acceptTraverser = function (traverser) {
        if (traverser.enterNode(this))
            traverser.applySkybox(this._skyBox);
    };
    /**
     *
     * @param planes
     * @param numPlanes
     * @returns {boolean}
     */
    SkyboxNode.prototype.isInFrustum = function (planes, numPlanes) {
        if (!this._skyBox._iIsVisible)
            return false;
        //a skybox is always in view unless its visibility is set to false
        return true;
    };
    SkyboxNode.id = "skyboxNode";
    return SkyboxNode;
})(EntityNode);
module.exports = SkyboxNode;


},{"awayjs-display/lib/partition/EntityNode":"awayjs-display/lib/partition/EntityNode"}],"awayjs-display/lib/pick/IPicker":[function(require,module,exports){



},{}],"awayjs-display/lib/pick/IPickingCollider":[function(require,module,exports){



},{}],"awayjs-display/lib/pick/PickingCollisionVO":[function(require,module,exports){
/**
 * Value object for a picking collision returned by a picking collider. Created as unique objects on display objects
 *
 * @see away.base.DisplayObject#pickingCollisionVO
 * @see away.core.pick.IPickingCollider
 *
 * @class away.pick.PickingCollisionVO
 */
var PickingCollisionVO = (function () {
    /**
     * Creates a new <code>PickingCollisionVO</code> object.
     *
     * @param entity The entity to which this collision object belongs.
     */
    function PickingCollisionVO(displayObject) {
        this.displayObject = displayObject;
    }
    return PickingCollisionVO;
})();
module.exports = PickingCollisionVO;


},{}],"awayjs-display/lib/pick/RaycastPicker":[function(require,module,exports){
var Vector3D = require("awayjs-core/lib/geom/Vector3D");
var RaycastCollector = require("awayjs-display/lib/traverse/RaycastCollector");
/**
 * Picks a 3d object from a view or scene by 3D raycast calculations.
 * Performs an initial coarse boundary calculation to return a subset of entities whose bounding volumes intersect with the specified ray,
 * then triggers an optional picking collider on individual entity objects to further determine the precise values of the picking ray collision.
 *
 * @class away.pick.RaycastPicker
 */
var RaycastPicker = (function () {
    /**
     * Creates a new <code>RaycastPicker</code> object.
     *
     * @param findClosestCollision Determines whether the picker searches for the closest bounds collision along the ray,
     * or simply returns the first collision encountered. Defaults to false.
     */
    function RaycastPicker(findClosestCollision) {
        if (findClosestCollision === void 0) { findClosestCollision = false; }
        this._ignoredEntities = [];
        this._onlyMouseEnabled = true;
        this._numEntities = 0;
        this._raycastCollector = new RaycastCollector();
        this._findClosestCollision = findClosestCollision;
        this._entities = new Array();
    }
    Object.defineProperty(RaycastPicker.prototype, "onlyMouseEnabled", {
        /**
         * @inheritDoc
         */
        get: function () {
            return this._onlyMouseEnabled;
        },
        set: function (value) {
            this._onlyMouseEnabled = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @inheritDoc
     */
    RaycastPicker.prototype.getViewCollision = function (x, y, view) {
        //update ray
        var rayPosition = view.unproject(x, y, 0);
        var rayDirection = view.unproject(x, y, 1).subtract(rayPosition);
        return this.getSceneCollision(rayPosition, rayDirection, view.scene);
    };
    /**
     * @inheritDoc
     */
    RaycastPicker.prototype.getSceneCollision = function (rayPosition, rayDirection, scene) {
        //clear collector
        this._raycastCollector.clear();
        //setup ray vectors
        this._raycastCollector.rayPosition = rayPosition;
        this._raycastCollector.rayDirection = rayDirection;
        // collect entities to test
        scene.traversePartitions(this._raycastCollector);
        this._numEntities = 0;
        var node = this._raycastCollector.entityHead;
        var entity;
        while (node) {
            if (!this.isIgnored(entity = node.entity))
                this._entities[this._numEntities++] = entity;
            node = node.next;
        }
        //early out if no collisions detected
        if (!this._numEntities)
            return null;
        return this.getPickingCollisionVO(this._raycastCollector);
    };
    //		public getEntityCollision(position:Vector3D, direction:Vector3D, entities:Array<IEntity>):PickingCollisionVO
    //		{
    //			this._numEntities = 0;
    //
    //			var entity:IEntity;
    //			var l:number = entities.length;
    //
    //			for (var c:number = 0; c < l; c++) {
    //				entity = entities[c];
    //
    //				if (entity.isIntersectingRay(position, direction))
    //					this._entities[this._numEntities++] = entity;
    //			}
    //
    //			return this.getPickingCollisionVO(this._raycastCollector);
    //		}
    RaycastPicker.prototype.setIgnoreList = function (entities) {
        this._ignoredEntities = entities;
    };
    RaycastPicker.prototype.isIgnored = function (entity) {
        if (this._onlyMouseEnabled && !entity._iIsMouseEnabled())
            return true;
        var len = this._ignoredEntities.length;
        for (var i = 0; i < len; i++)
            if (this._ignoredEntities[i] == entity)
                return true;
        return false;
    };
    RaycastPicker.prototype.sortOnNearT = function (entity1, entity2) {
        return entity1._iPickingCollisionVO.rayEntryDistance > entity2._iPickingCollisionVO.rayEntryDistance ? 1 : -1;
    };
    RaycastPicker.prototype.getPickingCollisionVO = function (collector) {
        // trim before sorting
        this._entities.length = this._numEntities;
        // Sort entities from closest to furthest.
        this._entities = this._entities.sort(this.sortOnNearT); // TODO - test sort filter in JS
        // ---------------------------------------------------------------------
        // Evaluate triangle collisions when needed.
        // Replaces collision data provided by bounds collider with more precise data.
        // ---------------------------------------------------------------------
        var shortestCollisionDistance = Number.MAX_VALUE;
        var bestCollisionVO;
        var pickingCollisionVO;
        var entity;
        var i;
        for (i = 0; i < this._numEntities; ++i) {
            entity = this._entities[i];
            pickingCollisionVO = entity._iPickingCollisionVO;
            if (entity.pickingCollider) {
                // If a collision exists, update the collision data and stop all checks.
                if ((bestCollisionVO == null || pickingCollisionVO.rayEntryDistance < bestCollisionVO.rayEntryDistance) && entity._iTestCollision(shortestCollisionDistance, this._findClosestCollision)) {
                    shortestCollisionDistance = pickingCollisionVO.rayEntryDistance;
                    bestCollisionVO = pickingCollisionVO;
                    if (!this._findClosestCollision) {
                        this.updateLocalPosition(pickingCollisionVO);
                        return pickingCollisionVO;
                    }
                }
            }
            else if (bestCollisionVO == null || pickingCollisionVO.rayEntryDistance < bestCollisionVO.rayEntryDistance) {
                // Note: a bounds collision with a ray origin inside its bounds is ONLY ever used
                // to enable the detection of a corresponsding triangle collision.
                // Therefore, bounds collisions with a ray origin inside its bounds can be ignored
                // if it has been established that there is NO triangle collider to test
                if (!pickingCollisionVO.rayOriginIsInsideBounds) {
                    this.updateLocalPosition(pickingCollisionVO);
                    return pickingCollisionVO;
                }
            }
        }
        return bestCollisionVO;
    };
    RaycastPicker.prototype.updateLocalPosition = function (pickingCollisionVO) {
        var collisionPos = (pickingCollisionVO.localPosition == null) ? (pickingCollisionVO.localPosition = new Vector3D()) : pickingCollisionVO.localPosition;
        var rayDir = pickingCollisionVO.localRayDirection;
        var rayPos = pickingCollisionVO.localRayPosition;
        var t = pickingCollisionVO.rayEntryDistance;
        collisionPos.x = rayPos.x + t * rayDir.x;
        collisionPos.y = rayPos.y + t * rayDir.y;
        collisionPos.z = rayPos.z + t * rayDir.z;
    };
    RaycastPicker.prototype.dispose = function () {
        //TODO
    };
    return RaycastPicker;
})();
module.exports = RaycastPicker;


},{"awayjs-core/lib/geom/Vector3D":undefined,"awayjs-display/lib/traverse/RaycastCollector":"awayjs-display/lib/traverse/RaycastCollector"}],"awayjs-display/lib/pool/CSSBillboardRenderable":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CSSRenderableBase = require("awayjs-display/lib/pool/CSSRenderableBase");
/**
 * @class away.pool.RenderableListItem
 */
var CSSBillboardRenderable = (function (_super) {
    __extends(CSSBillboardRenderable, _super);
    function CSSBillboardRenderable(pool, billboard) {
        _super.call(this, pool, billboard, billboard);
        var div = document.createElement("div");
        div.onmousedown = function (event) { return false; };
        this.htmlElement = div;
        var style = div.style;
        style.position = "absolute";
        style.transformOrigin = style["-webkit-transform-origin"] = style["-moz-transform-origin"] = style["-o-transform-origin"] = style["-ms-transform-origin"] = "0% 0%";
        var img = document.createElement("div");
        div.appendChild(img);
        img.className = "material" + billboard.material.id;
    }
    CSSBillboardRenderable.id = "billboard";
    return CSSBillboardRenderable;
})(CSSRenderableBase);
module.exports = CSSBillboardRenderable;


},{"awayjs-display/lib/pool/CSSRenderableBase":"awayjs-display/lib/pool/CSSRenderableBase"}],"awayjs-display/lib/pool/CSSLineSegmentRenderable":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CSSRenderableBase = require("awayjs-display/lib/pool/CSSRenderableBase");
/**
 * @class away.pool.RenderableListItem
 */
var CSSLineSegmentRenderable = (function (_super) {
    __extends(CSSLineSegmentRenderable, _super);
    function CSSLineSegmentRenderable(pool, lineSegment) {
        _super.call(this, pool, lineSegment, lineSegment);
        var div = document.createElement("div");
        div.onmousedown = function (event) { return false; };
        this.htmlElement = div;
        var style = div.style;
        style.position = "absolute";
        style.transformOrigin = style["-webkit-transform-origin"] = style["-moz-transform-origin"] = style["-o-transform-origin"] = style["-ms-transform-origin"] = "0% 0%";
        var img = document.createElement("div");
        div.appendChild(img);
        img.className = "material" + lineSegment.material.id;
    }
    CSSLineSegmentRenderable.id = "lineSegment";
    return CSSLineSegmentRenderable;
})(CSSRenderableBase);
module.exports = CSSLineSegmentRenderable;


},{"awayjs-display/lib/pool/CSSRenderableBase":"awayjs-display/lib/pool/CSSRenderableBase"}],"awayjs-display/lib/pool/CSSRenderableBase":[function(require,module,exports){
/**
 * @class away.pool.RenderableListItem
 */
var CSSRenderableBase = (function () {
    /**
     *
     * @param sourceEntity
     * @param material
     * @param animator
     */
    function CSSRenderableBase(pool, sourceEntity, renderableOwner) {
        //store a reference to the pool for later disposal
        this._pool = pool;
        this.sourceEntity = sourceEntity;
        this.renderableOwner = renderableOwner;
    }
    /**
     *
     */
    CSSRenderableBase.prototype.dispose = function () {
        this._pool.disposeItem(this.renderableOwner);
    };
    /**
     *
     */
    CSSRenderableBase.prototype.invalidateGeometry = function () {
    };
    /**
     *
     */
    CSSRenderableBase.prototype.invalidateIndexData = function () {
    };
    /**
     *
     */
    CSSRenderableBase.prototype.invalidateVertexData = function (dataType) {
    };
    return CSSRenderableBase;
})();
module.exports = CSSRenderableBase;


},{}],"awayjs-display/lib/pool/CSSSkyboxRenderable":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CSSRenderableBase = require("awayjs-display/lib/pool/CSSRenderableBase");
/**
 * @class away.pool.CSSSkyboxRenderable
 */
var CSSSkyboxRenderable = (function (_super) {
    __extends(CSSSkyboxRenderable, _super);
    function CSSSkyboxRenderable(pool, skyBox) {
        _super.call(this, pool, skyBox, skyBox);
        var div = document.createElement("div");
        div.onmousedown = function (event) { return false; };
        this.htmlElement = div;
        var style = div.style;
        var img;
        //create the six images that make up the skybox
        style.position = "absolute";
        style.transformOrigin = style["-webkit-transform-origin"] = style["-moz-transform-origin"] = style["-o-transform-origin"] = style["-ms-transform-origin"] = "0% 0%";
        img = document.createElement("div");
        div.appendChild(img);
        img.className = "material" + skyBox.id;
    }
    CSSSkyboxRenderable.id = "skybox";
    return CSSSkyboxRenderable;
})(CSSRenderableBase);
module.exports = CSSSkyboxRenderable;


},{"awayjs-display/lib/pool/CSSRenderableBase":"awayjs-display/lib/pool/CSSRenderableBase"}],"awayjs-display/lib/pool/EntityListItemPool":[function(require,module,exports){
var EntityListItem = require("awayjs-display/lib/pool/EntityListItem");
/**
 * @class away.pool.EntityListItemPool
 */
var EntityListItemPool = (function () {
    /**
     *
     */
    function EntityListItemPool() {
        this._index = 0;
        this._poolSize = 0;
        this._pool = new Array();
    }
    /**
     *
     */
    EntityListItemPool.prototype.getItem = function () {
        var item;
        if (this._index == this._poolSize) {
            item = new EntityListItem();
            this._pool[this._index++] = item;
            ++this._poolSize;
        }
        else {
            item = this._pool[this._index++];
        }
        return item;
    };
    /**
     *
     */
    EntityListItemPool.prototype.freeAll = function () {
        this._index = 0;
    };
    EntityListItemPool.prototype.dispose = function () {
        this._pool.length = 0;
    };
    return EntityListItemPool;
})();
module.exports = EntityListItemPool;


},{"awayjs-display/lib/pool/EntityListItem":"awayjs-display/lib/pool/EntityListItem"}],"awayjs-display/lib/pool/EntityListItem":[function(require,module,exports){
/**
 * @class away.pool.EntityListItem
 */
var EntityListItem = (function () {
    function EntityListItem() {
    }
    return EntityListItem;
})();
module.exports = EntityListItem;


},{}],"awayjs-display/lib/pool/EntityNodePool":[function(require,module,exports){
/**
 * @class away.pool.EntityNodePool
 */
var EntityNodePool = (function () {
    /**
     * //TODO
     *
     * @param entityNodeClass
     */
    function EntityNodePool(entityNodeClass, partition) {
        this._entityNodePool = new Object();
        this._entityNodeClass = entityNodeClass;
        this._partition = partition;
    }
    /**
     * //TODO
     *
     * @param entity
     * @returns EntityNode
     */
    EntityNodePool.prototype.getItem = function (entity) {
        return (this._entityNodePool[entity.id] || (this._entityNodePool[entity.id] = entity._iAddEntityNode(new this._entityNodeClass(this, entity, this._partition))));
    };
    /**
     * //TODO
     *
     * @param entity
     */
    EntityNodePool.prototype.disposeItem = function (entity) {
        var entityNode = this._entityNodePool[entity.id];
        if (entityNode) {
            entity._iRemoveEntityNode(entityNode);
            this._entityNodePool[entity.id] = null;
        }
        return entityNode;
    };
    return EntityNodePool;
})();
module.exports = EntityNodePool;


},{}],"awayjs-display/lib/pool/IEntityNodeClass":[function(require,module,exports){



},{}],"awayjs-display/lib/pool/IRenderObject":[function(require,module,exports){



},{}],"awayjs-display/lib/pool/IRenderablePool":[function(require,module,exports){



},{}],"awayjs-display/lib/pool/IRenderable":[function(require,module,exports){



},{}],"awayjs-display/lib/pool/IRendererPool":[function(require,module,exports){



},{}],"awayjs-display/lib/pool/SubMeshPool":[function(require,module,exports){
var LineSubMesh = require("awayjs-display/lib/base/LineSubMesh");
var TriangleSubMesh = require("awayjs-display/lib/base/TriangleSubMesh");
var CurveSubMesh = require("awayjs-display/lib/base/CurveSubMesh");
/**
 * @class away.pool.SubMeshPool
 */
var SubMeshPool = (function () {
    function SubMeshPool() {
    }
    /**
     *
     * @param subMeshClass
     */
    SubMeshPool.registerSubMeshClass = function (subMeshClass) {
        SubMeshPool.subMeshClassPool[subMeshClass.geometryType] = subMeshClass;
    };
    /**
     *
     * @param subGeometry
     */
    SubMeshPool.getSubMeshClass = function (subGeometry) {
        return SubMeshPool.subMeshClassPool[subGeometry.assetType];
    };
    SubMeshPool.addDefaults = function () {
        SubMeshPool.registerSubMeshClass(LineSubMesh);
        SubMeshPool.registerSubMeshClass(TriangleSubMesh);
        SubMeshPool.registerSubMeshClass(CurveSubMesh);
    };
    SubMeshPool.subMeshClassPool = new Object();
    SubMeshPool.main = SubMeshPool.addDefaults();
    return SubMeshPool;
})();
module.exports = SubMeshPool;


},{"awayjs-display/lib/base/CurveSubMesh":"awayjs-display/lib/base/CurveSubMesh","awayjs-display/lib/base/LineSubMesh":"awayjs-display/lib/base/LineSubMesh","awayjs-display/lib/base/TriangleSubMesh":"awayjs-display/lib/base/TriangleSubMesh"}],"awayjs-display/lib/prefabs/PrefabBase":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AssetBase = require("awayjs-core/lib/library/AssetBase");
var AbstractMethodError = require("awayjs-core/lib/errors/AbstractMethodError");
/**
 * PrefabBase is an abstract base class for prefabs, which are prebuilt display objects that allow easy cloning and updating
 */
var PrefabBase = (function (_super) {
    __extends(PrefabBase, _super);
    //		public _pBatchObjects:Array<BatchObject> = new Array<BatchObject>();
    /**
     * Creates a new PrefabBase object.
     */
    function PrefabBase() {
        _super.call(this);
        this._pObjects = new Array();
    }
    /**
     * Returns a display object generated from this prefab
     */
    PrefabBase.prototype.getNewObject = function () {
        var object = this._pCreateObject();
        this._pObjects.push(object);
        return object;
    };
    //		public getNewBatchObject():BatchObject
    //		{
    //			var object:BatchObject = this._pCreateBatchObject();
    //
    //			this._pBatchObjects.push(object);
    //
    //			return object;
    //		}
    PrefabBase.prototype._pCreateObject = function () {
        throw new AbstractMethodError();
    };
    PrefabBase.prototype._iValidate = function () {
        // To be overridden when necessary
    };
    return PrefabBase;
})(AssetBase);
module.exports = PrefabBase;


},{"awayjs-core/lib/errors/AbstractMethodError":undefined,"awayjs-core/lib/library/AssetBase":undefined}],"awayjs-display/lib/prefabs/PrimitiveCapsulePrefab":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var PrimitivePrefabBase = require("awayjs-display/lib/prefabs/PrimitivePrefabBase");
/**
 * A Capsule primitive mesh.
 */
var PrimitiveCapsulePrefab = (function (_super) {
    __extends(PrimitiveCapsulePrefab, _super);
    /**
     * Creates a new Capsule object.
     * @param radius The radius of the capsule.
     * @param height The height of the capsule.
     * @param segmentsW Defines the number of horizontal segments that make up the capsule. Defaults to 16.
     * @param segmentsH Defines the number of vertical segments that make up the capsule. Defaults to 15. Must be uneven value.
     * @param yUp Defines whether the capsule poles should lay on the Y-axis (true) or on the Z-axis (false).
     */
    function PrimitiveCapsulePrefab(radius, height, segmentsW, segmentsH, yUp) {
        if (radius === void 0) { radius = 50; }
        if (height === void 0) { height = 100; }
        if (segmentsW === void 0) { segmentsW = 16; }
        if (segmentsH === void 0) { segmentsH = 15; }
        if (yUp === void 0) { yUp = true; }
        _super.call(this);
        this._numVertices = 0;
        this._radius = radius;
        this._height = height;
        this._segmentsW = segmentsW;
        this._segmentsH = (segmentsH % 2 == 0) ? segmentsH + 1 : segmentsH;
        this._yUp = yUp;
    }
    Object.defineProperty(PrimitiveCapsulePrefab.prototype, "radius", {
        /**
         * The radius of the capsule.
         */
        get: function () {
            return this._radius;
        },
        set: function (value) {
            this._radius = value;
            this._pInvalidateGeometry();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitiveCapsulePrefab.prototype, "height", {
        /**
         * The height of the capsule.
         */
        get: function () {
            return this._height;
        },
        set: function (value) {
            this._height = value;
            this._pInvalidateGeometry();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitiveCapsulePrefab.prototype, "segmentsW", {
        /**
         * Defines the number of horizontal segments that make up the capsule. Defaults to 16.
         */
        get: function () {
            return this._segmentsW;
        },
        set: function (value) {
            this._segmentsW = value;
            this._pInvalidateGeometry();
            this._pInvalidateUVs();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitiveCapsulePrefab.prototype, "segmentsH", {
        /**
         * Defines the number of vertical segments that make up the capsule. Defaults to 15. Must be uneven.
         */
        get: function () {
            return this._segmentsH;
        },
        set: function (value) {
            this._segmentsH = (value % 2 == 0) ? value + 1 : value;
            this._pInvalidateGeometry();
            this._pInvalidateUVs();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitiveCapsulePrefab.prototype, "yUp", {
        /**
         * Defines whether the capsule poles should lay on the Y-axis (true) or on the Z-axis (false).
         */
        get: function () {
            return this._yUp;
        },
        set: function (value) {
            this._yUp = value;
            this._pInvalidateGeometry();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @inheritDoc
     */
    PrimitiveCapsulePrefab.prototype._pBuildGeometry = function (target, geometryType) {
        var indices /*uint*/;
        var positions;
        var normals;
        var tangents;
        var i;
        var j;
        var triIndex = 0;
        var index = 0;
        var startIndex;
        var comp1, comp2, t1, t2;
        var numIndices = 0;
        if (geometryType == "triangleSubGeometry") {
            var triangleGeometry = target;
            // evaluate target number of vertices, triangles and indices
            this._numVertices = (this._segmentsH + 1) * (this._segmentsW + 1); // segmentsH + 1 because of closure, segmentsW + 1 because of closure
            numIndices = (this._segmentsH - 1) * this._segmentsW * 6; // each level has segmentH quads, each of 2 triangles
            // need to initialize raw arrays or can be reused?
            if (this._numVertices == triangleGeometry.numVertices) {
                indices = triangleGeometry.indices;
                positions = triangleGeometry.positions;
                normals = triangleGeometry.vertexNormals;
                tangents = triangleGeometry.vertexTangents;
            }
            else {
                indices = new Array(numIndices);
                positions = new Array(this._numVertices * 3);
                normals = new Array(this._numVertices * 3);
                tangents = new Array(this._numVertices * 3);
                this._pInvalidateUVs();
            }
            for (j = 0; j <= this._segmentsH; ++j) {
                var horangle = Math.PI * j / this._segmentsH;
                var z = -this._radius * Math.cos(horangle);
                var ringradius = this._radius * Math.sin(horangle);
                startIndex = index;
                for (i = 0; i <= this._segmentsW; ++i) {
                    var verangle = 2 * Math.PI * i / this._segmentsW;
                    var x = ringradius * Math.cos(verangle);
                    var offset = j > this._segmentsH / 2 ? this._height / 2 : -this._height / 2;
                    var y = ringradius * Math.sin(verangle);
                    var normLen = 1 / Math.sqrt(x * x + y * y + z * z);
                    var tanLen = Math.sqrt(y * y + x * x);
                    if (this._yUp) {
                        t1 = 0;
                        t2 = tanLen > .007 ? x / tanLen : 0;
                        comp1 = -z;
                        comp2 = y;
                    }
                    else {
                        t1 = tanLen > .007 ? x / tanLen : 0;
                        t2 = 0;
                        comp1 = y;
                        comp2 = z;
                    }
                    if (i == this._segmentsW) {
                        positions[index] = positions[startIndex];
                        positions[index + 1] = positions[startIndex + 1];
                        positions[index + 2] = positions[startIndex + 2];
                        normals[index] = (normals[startIndex] + (x * normLen)) * .5;
                        normals[index + 1] = (normals[startIndex + 1] + (comp1 * normLen)) * .5;
                        normals[index + 2] = (normals[startIndex + 2] + (comp2 * normLen)) * .5;
                        tangents[index] = (tangents[startIndex] + (tanLen > .007 ? -y / tanLen : 1)) * .5;
                        tangents[index + 1] = (tangents[startIndex + 1] + t1) * .5;
                        tangents[index + 2] = (tangents[startIndex + 2] + t2) * .5;
                    }
                    else {
                        // vertex
                        positions[index] = x;
                        positions[index + 1] = (this._yUp) ? comp1 - offset : comp1;
                        positions[index + 2] = (this._yUp) ? comp2 : comp2 + offset;
                        // normal
                        normals[index] = x * normLen;
                        normals[index + 1] = comp1 * normLen;
                        normals[index + 2] = comp2 * normLen;
                        // tangent
                        tangents[index] = tanLen > .007 ? -y / tanLen : 1;
                        tangents[index + 1] = t1;
                        tangents[index + 2] = t2;
                    }
                    if (i > 0 && j > 0) {
                        var a = (this._segmentsW + 1) * j + i;
                        var b = (this._segmentsW + 1) * j + i - 1;
                        var c = (this._segmentsW + 1) * (j - 1) + i - 1;
                        var d = (this._segmentsW + 1) * (j - 1) + i;
                        if (j == this._segmentsH) {
                            positions[index] = positions[startIndex];
                            positions[index + 1] = positions[startIndex + 1];
                            positions[index + 2] = positions[startIndex + 2];
                            indices[triIndex++] = a;
                            indices[triIndex++] = c;
                            indices[triIndex++] = d;
                        }
                        else if (j == 1) {
                            indices[triIndex++] = a;
                            indices[triIndex++] = b;
                            indices[triIndex++] = c;
                        }
                        else {
                            indices[triIndex++] = a;
                            indices[triIndex++] = b;
                            indices[triIndex++] = c;
                            indices[triIndex++] = a;
                            indices[triIndex++] = c;
                            indices[triIndex++] = d;
                        }
                    }
                    index += 3;
                }
            }
            // build real data from raw data
            triangleGeometry.updateIndices(indices);
            triangleGeometry.updatePositions(positions);
            triangleGeometry.updateVertexNormals(normals);
            triangleGeometry.updateVertexTangents(tangents);
        }
        else if (geometryType == "lineSubGeometry") {
        }
    };
    /**
     * @inheritDoc
     */
    PrimitiveCapsulePrefab.prototype._pBuildUVs = function (target, geometryType) {
        var i, j;
        var uvs;
        if (geometryType == "triangleSubGeometry") {
            var triangleGeometry = target;
            // need to initialize raw array or can be reused?
            if (triangleGeometry.uvs && this._numVertices == triangleGeometry.numVertices) {
                uvs = triangleGeometry.uvs;
            }
            else {
                uvs = new Array(this._numVertices * 2);
            }
            // current uv component index
            var index = 0;
            for (j = 0; j <= this._segmentsH; ++j) {
                for (i = 0; i <= this._segmentsW; ++i) {
                    // revolution vertex
                    uvs[index++] = (i / this._segmentsW) * triangleGeometry.scaleU;
                    uvs[index++] = (j / this._segmentsH) * triangleGeometry.scaleV;
                }
            }
            // build real data from raw data
            triangleGeometry.updateUVs(uvs);
        }
        else if (geometryType == "lineSubGeometry") {
        }
    };
    return PrimitiveCapsulePrefab;
})(PrimitivePrefabBase);
module.exports = PrimitiveCapsulePrefab;


},{"awayjs-display/lib/prefabs/PrimitivePrefabBase":"awayjs-display/lib/prefabs/PrimitivePrefabBase"}],"awayjs-display/lib/prefabs/PrimitiveConePrefab":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var PrimitiveCylinderPrefab = require("awayjs-display/lib/prefabs/PrimitiveCylinderPrefab");
/**
 * A UV Cone primitive mesh.
 */
var PrimitiveConePrefab = (function (_super) {
    __extends(PrimitiveConePrefab, _super);
    /**
     * Creates a new Cone object.
     * @param radius The radius of the bottom end of the cone
     * @param height The height of the cone
     * @param segmentsW Defines the number of horizontal segments that make up the cone. Defaults to 16.
     * @param segmentsH Defines the number of vertical segments that make up the cone. Defaults to 1.
     * @param yUp Defines whether the cone poles should lay on the Y-axis (true) or on the Z-axis (false).
     */
    function PrimitiveConePrefab(radius, height, segmentsW, segmentsH, closed, yUp) {
        if (radius === void 0) { radius = 50; }
        if (height === void 0) { height = 100; }
        if (segmentsW === void 0) { segmentsW = 16; }
        if (segmentsH === void 0) { segmentsH = 1; }
        if (closed === void 0) { closed = true; }
        if (yUp === void 0) { yUp = true; }
        _super.call(this, 0, radius, height, segmentsW, segmentsH, false, closed, true, yUp);
    }
    Object.defineProperty(PrimitiveConePrefab.prototype, "radius", {
        /**
         * The radius of the bottom end of the cone.
         */
        get: function () {
            return this._pBottomRadius;
        },
        set: function (value) {
            this._pBottomRadius = value;
            this._pInvalidateGeometry();
        },
        enumerable: true,
        configurable: true
    });
    return PrimitiveConePrefab;
})(PrimitiveCylinderPrefab);
module.exports = PrimitiveConePrefab;


},{"awayjs-display/lib/prefabs/PrimitiveCylinderPrefab":"awayjs-display/lib/prefabs/PrimitiveCylinderPrefab"}],"awayjs-display/lib/prefabs/PrimitiveCubePrefab":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var PrimitivePrefabBase = require("awayjs-display/lib/prefabs/PrimitivePrefabBase");
/**
 * A Cube primitive prefab.
 */
var PrimitiveCubePrefab = (function (_super) {
    __extends(PrimitiveCubePrefab, _super);
    /**
     * Creates a new Cube object.
     * @param width The size of the cube along its X-axis.
     * @param height The size of the cube along its Y-axis.
     * @param depth The size of the cube along its Z-axis.
     * @param segmentsW The number of segments that make up the cube along the X-axis.
     * @param segmentsH The number of segments that make up the cube along the Y-axis.
     * @param segmentsD The number of segments that make up the cube along the Z-axis.
     * @param tile6 The type of uv mapping to use. When true, a texture will be subdivided in a 2x3 grid, each used for a single face. When false, the entire image is mapped on each face.
     */
    function PrimitiveCubePrefab(width, height, depth, segmentsW, segmentsH, segmentsD, tile6) {
        if (width === void 0) { width = 100; }
        if (height === void 0) { height = 100; }
        if (depth === void 0) { depth = 100; }
        if (segmentsW === void 0) { segmentsW = 1; }
        if (segmentsH === void 0) { segmentsH = 1; }
        if (segmentsD === void 0) { segmentsD = 1; }
        if (tile6 === void 0) { tile6 = true; }
        _super.call(this);
        this._width = width;
        this._height = height;
        this._depth = depth;
        this._segmentsW = segmentsW;
        this._segmentsH = segmentsH;
        this._segmentsD = segmentsD;
        this._tile6 = tile6;
    }
    Object.defineProperty(PrimitiveCubePrefab.prototype, "width", {
        /**
         * The size of the cube along its X-axis.
         */
        get: function () {
            return this._width;
        },
        set: function (value) {
            this._width = value;
            this._pInvalidateGeometry();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitiveCubePrefab.prototype, "height", {
        /**
         * The size of the cube along its Y-axis.
         */
        get: function () {
            return this._height;
        },
        set: function (value) {
            this._height = value;
            this._pInvalidateGeometry();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitiveCubePrefab.prototype, "depth", {
        /**
         * The size of the cube along its Z-axis.
         */
        get: function () {
            return this._depth;
        },
        set: function (value) {
            this._depth = value;
            this._pInvalidateGeometry();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitiveCubePrefab.prototype, "tile6", {
        /**
         * The type of uv mapping to use. When false, the entire image is mapped on each face.
         * When true, a texture will be subdivided in a 3x2 grid, each used for a single face.
         * Reading the tiles from left to right, top to bottom they represent the faces of the
         * cube in the following order: bottom, top, back, left, front, right. This creates
         * several shared edges (between the top, front, left and right faces) which simplifies
         * texture painting.
         */
        get: function () {
            return this._tile6;
        },
        set: function (value) {
            this._tile6 = value;
            this._pInvalidateGeometry();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitiveCubePrefab.prototype, "segmentsW", {
        /**
         * The number of segments that make up the cube along the X-axis. Defaults to 1.
         */
        get: function () {
            return this._segmentsW;
        },
        set: function (value) {
            this._segmentsW = value;
            this._pInvalidateGeometry();
            this._pInvalidateUVs();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitiveCubePrefab.prototype, "segmentsH", {
        /**
         * The number of segments that make up the cube along the Y-axis. Defaults to 1.
         */
        get: function () {
            return this._segmentsH;
        },
        set: function (value) {
            this._segmentsH = value;
            this._pInvalidateGeometry();
            this._pInvalidateUVs();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitiveCubePrefab.prototype, "segmentsD", {
        /**
         * The number of segments that make up the cube along the Z-axis. Defaults to 1.
         */
        get: function () {
            return this._segmentsD;
        },
        set: function (value) {
            this._segmentsD = value;
            this._pInvalidateGeometry();
            this._pInvalidateUVs();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @inheritDoc
     */
    PrimitiveCubePrefab.prototype._pBuildGeometry = function (target, geometryType) {
        var indices /*uint*/;
        var positions;
        var normals;
        var tangents;
        var tl, tr, bl, br;
        var i, j, inc = 0;
        var vidx, fidx; // indices
        var hw, hh, hd; // halves
        var dw, dh, dd; // deltas
        var outer_pos;
        var numIndices;
        var numVertices;
        // half cube dimensions
        hw = this._width / 2;
        hh = this._height / 2;
        hd = this._depth / 2;
        if (geometryType == "triangleSubGeometry") {
            var triangleGeometry = target;
            numVertices = ((this._segmentsW + 1) * (this._segmentsH + 1) + (this._segmentsW + 1) * (this._segmentsD + 1) + (this._segmentsH + 1) * (this._segmentsD + 1)) * 2;
            numIndices = ((this._segmentsW * this._segmentsH + this._segmentsW * this._segmentsD + this._segmentsH * this._segmentsD) * 12);
            if (numVertices == triangleGeometry.numVertices && triangleGeometry.indices != null) {
                indices = triangleGeometry.indices;
                positions = triangleGeometry.positions;
                normals = triangleGeometry.vertexNormals;
                tangents = triangleGeometry.vertexTangents;
            }
            else {
                indices = new Array(numIndices);
                positions = new Array(numVertices * 3);
                normals = new Array(numVertices * 3);
                tangents = new Array(numVertices * 3);
                this._pInvalidateUVs();
            }
            vidx = 0;
            fidx = 0;
            // Segment dimensions
            dw = this._width / this._segmentsW;
            dh = this._height / this._segmentsH;
            dd = this._depth / this._segmentsD;
            for (i = 0; i <= this._segmentsW; i++) {
                outer_pos = -hw + i * dw;
                for (j = 0; j <= this._segmentsH; j++) {
                    // front
                    positions[vidx] = outer_pos;
                    positions[vidx + 1] = -hh + j * dh;
                    positions[vidx + 2] = -hd;
                    normals[vidx] = 0;
                    normals[vidx + 1] = 0;
                    normals[vidx + 2] = -1;
                    tangents[vidx] = 1;
                    tangents[vidx + 1] = 0;
                    tangents[vidx + 2] = 0;
                    vidx += 3;
                    // back
                    positions[vidx] = outer_pos;
                    positions[vidx + 1] = -hh + j * dh;
                    positions[vidx + 2] = hd;
                    normals[vidx] = 0;
                    normals[vidx + 1] = 0;
                    normals[vidx + 2] = 1;
                    tangents[vidx] = -1;
                    tangents[vidx + 1] = 0;
                    tangents[vidx + 2] = 0;
                    vidx += 3;
                    if (i && j) {
                        tl = 2 * ((i - 1) * (this._segmentsH + 1) + (j - 1));
                        tr = 2 * (i * (this._segmentsH + 1) + (j - 1));
                        bl = tl + 2;
                        br = tr + 2;
                        indices[fidx++] = tl;
                        indices[fidx++] = bl;
                        indices[fidx++] = br;
                        indices[fidx++] = tl;
                        indices[fidx++] = br;
                        indices[fidx++] = tr;
                        indices[fidx++] = tr + 1;
                        indices[fidx++] = br + 1;
                        indices[fidx++] = bl + 1;
                        indices[fidx++] = tr + 1;
                        indices[fidx++] = bl + 1;
                        indices[fidx++] = tl + 1;
                    }
                }
            }
            inc += 2 * (this._segmentsW + 1) * (this._segmentsH + 1);
            for (i = 0; i <= this._segmentsW; i++) {
                outer_pos = -hw + i * dw;
                for (j = 0; j <= this._segmentsD; j++) {
                    // top
                    positions[vidx] = outer_pos;
                    positions[vidx + 1] = hh;
                    positions[vidx + 2] = -hd + j * dd;
                    normals[vidx] = 0;
                    normals[vidx + 1] = 1;
                    normals[vidx + 2] = 0;
                    tangents[vidx] = 1;
                    tangents[vidx + 1] = 0;
                    tangents[vidx + 2] = 0;
                    vidx += 3;
                    // bottom
                    positions[vidx] = outer_pos;
                    positions[vidx + 1] = -hh;
                    positions[vidx + 2] = -hd + j * dd;
                    normals[vidx] = 0;
                    normals[vidx + 1] = -1;
                    normals[vidx + 2] = 0;
                    tangents[vidx] = 1;
                    tangents[vidx + 1] = 0;
                    tangents[vidx + 2] = 0;
                    vidx += 3;
                    if (i && j) {
                        tl = inc + 2 * ((i - 1) * (this._segmentsD + 1) + (j - 1));
                        tr = inc + 2 * (i * (this._segmentsD + 1) + (j - 1));
                        bl = tl + 2;
                        br = tr + 2;
                        indices[fidx++] = tl;
                        indices[fidx++] = bl;
                        indices[fidx++] = br;
                        indices[fidx++] = tl;
                        indices[fidx++] = br;
                        indices[fidx++] = tr;
                        indices[fidx++] = tr + 1;
                        indices[fidx++] = br + 1;
                        indices[fidx++] = bl + 1;
                        indices[fidx++] = tr + 1;
                        indices[fidx++] = bl + 1;
                        indices[fidx++] = tl + 1;
                    }
                }
            }
            inc += 2 * (this._segmentsW + 1) * (this._segmentsD + 1);
            for (i = 0; i <= this._segmentsD; i++) {
                outer_pos = hd - i * dd;
                for (j = 0; j <= this._segmentsH; j++) {
                    // left
                    positions[vidx] = -hw;
                    positions[vidx + 1] = -hh + j * dh;
                    positions[vidx + 2] = outer_pos;
                    normals[vidx] = -1;
                    normals[vidx + 1] = 0;
                    normals[vidx + 2] = 0;
                    tangents[vidx] = 0;
                    tangents[vidx + 1] = 0;
                    tangents[vidx + 2] = -1;
                    vidx += 3;
                    // right
                    positions[vidx] = hw;
                    positions[vidx + 1] = -hh + j * dh;
                    positions[vidx + 2] = outer_pos;
                    normals[vidx] = 1;
                    normals[vidx + 1] = 0;
                    normals[vidx + 2] = 0;
                    tangents[vidx] = 0;
                    tangents[vidx + 1] = 0;
                    tangents[vidx + 2] = 1;
                    vidx += 3;
                    if (i && j) {
                        tl = inc + 2 * ((i - 1) * (this._segmentsH + 1) + (j - 1));
                        tr = inc + 2 * (i * (this._segmentsH + 1) + (j - 1));
                        bl = tl + 2;
                        br = tr + 2;
                        indices[fidx++] = tl;
                        indices[fidx++] = bl;
                        indices[fidx++] = br;
                        indices[fidx++] = tl;
                        indices[fidx++] = br;
                        indices[fidx++] = tr;
                        indices[fidx++] = tr + 1;
                        indices[fidx++] = br + 1;
                        indices[fidx++] = bl + 1;
                        indices[fidx++] = tr + 1;
                        indices[fidx++] = bl + 1;
                        indices[fidx++] = tl + 1;
                    }
                }
            }
            triangleGeometry.updateIndices(indices);
            triangleGeometry.updatePositions(positions);
            triangleGeometry.updateVertexNormals(normals);
            triangleGeometry.updateVertexTangents(tangents);
        }
        else if (geometryType == "lineSubGeometry") {
            var lineGeometry = target;
            var numSegments = this._segmentsH * 4 + this._segmentsW * 4 + this._segmentsD * 4;
            var startPositions;
            var endPositions;
            var thickness;
            if (lineGeometry.indices != null && numSegments == lineGeometry.numSegments) {
                startPositions = lineGeometry.startPositions;
                endPositions = lineGeometry.endPositions;
                thickness = lineGeometry.thickness;
            }
            else {
                startPositions = new Array(numSegments * 3);
                endPositions = new Array(numSegments * 3);
                thickness = new Array(numSegments);
            }
            vidx = 0;
            fidx = 0;
            for (i = 0; i < this._segmentsH; ++i) {
                startPositions[vidx] = -hw;
                startPositions[vidx + 1] = i * this._height / this._segmentsH - hh;
                startPositions[vidx + 2] = -hd;
                endPositions[vidx] = hw;
                endPositions[vidx + 1] = i * this._height / this._segmentsH - hh;
                endPositions[vidx + 2] = -hd;
                thickness[fidx++] = 1;
                vidx += 3;
                startPositions[vidx] = -hw;
                startPositions[vidx + 1] = hh - i * this._height / this._segmentsH;
                startPositions[vidx + 2] = hd;
                endPositions[vidx] = hw;
                endPositions[vidx + 1] = hh - i * this._height / this._segmentsH;
                endPositions[vidx + 2] = hd;
                thickness[fidx++] = 1;
                vidx += 3;
            }
            for (i = 0; i < this._segmentsW; ++i) {
                startPositions[vidx] = i * this._width / this._segmentsW - hw;
                startPositions[vidx + 1] = -hh;
                startPositions[vidx + 2] = -hd;
                endPositions[vidx] = i * this._width / this._segmentsW - hw;
                endPositions[vidx + 1] = hh;
                endPositions[vidx + 2] = -hd;
                thickness[fidx++] = 1;
                vidx += 3;
                startPositions[vidx] = hw - i * this._width / this._segmentsW;
                startPositions[vidx + 1] = -hh;
                startPositions[vidx + 2] = hd;
                endPositions[vidx] = hw - i * this._width / this._segmentsW;
                endPositions[vidx + 1] = hh;
                endPositions[vidx + 2] = hd;
                thickness[fidx++] = 1;
                vidx += 3;
            }
            for (i = 0; i < this._segmentsH; ++i) {
                startPositions[vidx] = -hw;
                startPositions[vidx + 1] = i * this._height / this._segmentsH - hh;
                startPositions[vidx + 2] = -hd;
                endPositions[vidx] = -hw;
                endPositions[vidx + 1] = i * this._height / this._segmentsH - hh;
                endPositions[vidx + 2] = hd;
                thickness[fidx++] = 1;
                vidx += 3;
                startPositions[vidx] = hw;
                startPositions[vidx + 1] = hh - i * this._height / this._segmentsH;
                startPositions[vidx + 2] = -hd;
                endPositions[vidx] = hw;
                endPositions[vidx + 1] = hh - i * this._height / this._segmentsH;
                endPositions[vidx + 2] = hd;
                thickness[fidx++] = 1;
                vidx += 3;
            }
            for (i = 0; i < this._segmentsD; ++i) {
                startPositions[vidx] = hw;
                startPositions[vidx + 1] = -hh;
                startPositions[vidx + 2] = i * this._depth / this._segmentsD - hd;
                endPositions[vidx] = hw;
                endPositions[vidx + 1] = hh;
                endPositions[vidx + 2] = i * this._depth / this._segmentsD - hd;
                thickness[fidx++] = 1;
                vidx += 3;
                startPositions[vidx] = -hw;
                startPositions[vidx + 1] = -hh;
                startPositions[vidx + 2] = hd - i * this._depth / this._segmentsD;
                endPositions[vidx] = -hw;
                endPositions[vidx + 1] = hh;
                endPositions[vidx + 2] = hd - i * this._depth / this._segmentsD;
                thickness[fidx++] = 1;
                vidx += 3;
            }
            for (i = 0; i < this._segmentsD; ++i) {
                startPositions[vidx] = -hw;
                startPositions[vidx + 1] = -hh;
                startPositions[vidx + 2] = hd - i * this._depth / this._segmentsD;
                endPositions[vidx] = hw;
                endPositions[vidx + 1] = -hh;
                endPositions[vidx + 2] = hd - i * this._depth / this._segmentsD;
                thickness[fidx++] = 1;
                vidx += 3;
                startPositions[vidx] = -hw;
                startPositions[vidx + 1] = hh;
                startPositions[vidx + 2] = i * this._depth / this._segmentsD - hd;
                endPositions[vidx] = hw;
                endPositions[vidx + 1] = hh;
                endPositions[vidx + 2] = i * this._depth / this._segmentsD - hd;
                thickness[fidx++] = 1;
                vidx += 3;
            }
            for (i = 0; i < this._segmentsW; ++i) {
                startPositions[vidx] = hw - i * this._width / this._segmentsW;
                startPositions[vidx + 1] = -hh;
                startPositions[vidx + 2] = -hd;
                endPositions[vidx] = hw - i * this._width / this._segmentsW;
                endPositions[vidx + 1] = -hh;
                endPositions[vidx + 2] = hd;
                thickness[fidx++] = 1;
                vidx += 3;
                startPositions[vidx] = i * this._width / this._segmentsW - hw;
                startPositions[vidx + 1] = hh;
                startPositions[vidx + 2] = -hd;
                endPositions[vidx] = i * this._width / this._segmentsW - hw;
                endPositions[vidx + 1] = hh;
                endPositions[vidx + 2] = hd;
                thickness[fidx++] = 1;
                vidx += 3;
            }
            // build real data from raw data
            lineGeometry.updatePositions(startPositions, endPositions);
            lineGeometry.updateThickness(thickness);
        }
    };
    /**
     * @inheritDoc
     */
    PrimitiveCubePrefab.prototype._pBuildUVs = function (target, geometryType) {
        var i, j, index;
        var uvs;
        var u_tile_dim, v_tile_dim;
        var u_tile_step, v_tile_step;
        var tl0u, tl0v;
        var tl1u, tl1v;
        var du, dv;
        var numVertices;
        if (geometryType == "triangleSubGeometry") {
            numVertices = ((this._segmentsW + 1) * (this._segmentsH + 1) + (this._segmentsW + 1) * (this._segmentsD + 1) + (this._segmentsH + 1) * (this._segmentsD + 1)) * 2;
            var triangleGeometry = target;
            if (numVertices == triangleGeometry.numVertices && triangleGeometry.uvs != null) {
                uvs = triangleGeometry.uvs;
            }
            else {
                uvs = new Array(numVertices * 2);
            }
            if (this._tile6) {
                u_tile_dim = u_tile_step = 1 / 3;
                v_tile_dim = v_tile_step = 1 / 2;
            }
            else {
                u_tile_dim = v_tile_dim = 1;
                u_tile_step = v_tile_step = 0;
            }
            // Create planes two and two, the same way that they were
            // constructed in the buildGeometry() function. First calculate
            // the top-left UV coordinate for both planes, and then loop
            // over the points, calculating the UVs from these numbers.
            // When tile6 is true, the layout is as follows:
            //       .-----.-----.-----. (1,1)
            //       | Bot |  T  | Bak |
            //       |-----+-----+-----|
            //       |  L  |  F  |  R  |
            // (0,0)'-----'-----'-----'
            index = 0;
            // FRONT / BACK
            tl0u = 1 * u_tile_step;
            tl0v = 1 * v_tile_step;
            tl1u = 2 * u_tile_step;
            tl1v = 0 * v_tile_step;
            du = u_tile_dim / this._segmentsW;
            dv = v_tile_dim / this._segmentsH;
            for (i = 0; i <= this._segmentsW; i++) {
                for (j = 0; j <= this._segmentsH; j++) {
                    uvs[index++] = (tl0u + i * du) * triangleGeometry.scaleU;
                    uvs[index++] = (tl0v + (v_tile_dim - j * dv)) * triangleGeometry.scaleV;
                    uvs[index++] = (tl1u + (u_tile_dim - i * du)) * triangleGeometry.scaleU;
                    uvs[index++] = (tl1v + (v_tile_dim - j * dv)) * triangleGeometry.scaleV;
                }
            }
            // TOP / BOTTOM
            tl0u = 1 * u_tile_step;
            tl0v = 0 * v_tile_step;
            tl1u = 0 * u_tile_step;
            tl1v = 0 * v_tile_step;
            du = u_tile_dim / this._segmentsW;
            dv = v_tile_dim / this._segmentsD;
            for (i = 0; i <= this._segmentsW; i++) {
                for (j = 0; j <= this._segmentsD; j++) {
                    uvs[index++] = (tl0u + i * du) * triangleGeometry.scaleU;
                    uvs[index++] = (tl0v + (v_tile_dim - j * dv)) * triangleGeometry.scaleV;
                    uvs[index++] = (tl1u + i * du) * triangleGeometry.scaleU;
                    uvs[index++] = (tl1v + j * dv) * triangleGeometry.scaleV;
                }
            }
            // LEFT / RIGHT
            tl0u = 0 * u_tile_step;
            tl0v = 1 * v_tile_step;
            tl1u = 2 * u_tile_step;
            tl1v = 1 * v_tile_step;
            du = u_tile_dim / this._segmentsD;
            dv = v_tile_dim / this._segmentsH;
            for (i = 0; i <= this._segmentsD; i++) {
                for (j = 0; j <= this._segmentsH; j++) {
                    uvs[index++] = (tl0u + i * du) * triangleGeometry.scaleU;
                    uvs[index++] = (tl0v + (v_tile_dim - j * dv)) * triangleGeometry.scaleV;
                    uvs[index++] = (tl1u + (u_tile_dim - i * du)) * triangleGeometry.scaleU;
                    uvs[index++] = (tl1v + (v_tile_dim - j * dv)) * triangleGeometry.scaleV;
                }
            }
            triangleGeometry.updateUVs(uvs);
        }
        else if (geometryType == "lineSubGeometry") {
        }
    };
    return PrimitiveCubePrefab;
})(PrimitivePrefabBase);
module.exports = PrimitiveCubePrefab;


},{"awayjs-display/lib/prefabs/PrimitivePrefabBase":"awayjs-display/lib/prefabs/PrimitivePrefabBase"}],"awayjs-display/lib/prefabs/PrimitiveCylinderPrefab":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var PrimitivePrefabBase = require("awayjs-display/lib/prefabs/PrimitivePrefabBase");
/**
 * A Cylinder primitive mesh.
 */
var PrimitiveCylinderPrefab = (function (_super) {
    __extends(PrimitiveCylinderPrefab, _super);
    /**
     * Creates a new Cylinder object.
     * @param topRadius The radius of the top end of the cylinder.
     * @param bottomRadius The radius of the bottom end of the cylinder
     * @param height The radius of the bottom end of the cylinder
     * @param segmentsW Defines the number of horizontal segments that make up the cylinder. Defaults to 16.
     * @param segmentsH Defines the number of vertical segments that make up the cylinder. Defaults to 1.
     * @param topClosed Defines whether the top end of the cylinder is closed (true) or open.
     * @param bottomClosed Defines whether the bottom end of the cylinder is closed (true) or open.
     * @param yUp Defines whether the cone poles should lay on the Y-axis (true) or on the Z-axis (false).
     */
    function PrimitiveCylinderPrefab(topRadius, bottomRadius, height, segmentsW, segmentsH, topClosed, bottomClosed, surfaceClosed, yUp) {
        if (topRadius === void 0) { topRadius = 50; }
        if (bottomRadius === void 0) { bottomRadius = 50; }
        if (height === void 0) { height = 100; }
        if (segmentsW === void 0) { segmentsW = 16; }
        if (segmentsH === void 0) { segmentsH = 1; }
        if (topClosed === void 0) { topClosed = true; }
        if (bottomClosed === void 0) { bottomClosed = true; }
        if (surfaceClosed === void 0) { surfaceClosed = true; }
        if (yUp === void 0) { yUp = true; }
        _super.call(this);
        this._numVertices = 0;
        this._topRadius = topRadius;
        this._pBottomRadius = bottomRadius;
        this._height = height;
        this._pSegmentsW = segmentsW;
        this._pSegmentsH = segmentsH;
        this._topClosed = topClosed;
        this._bottomClosed = bottomClosed;
        this._surfaceClosed = surfaceClosed;
        this._yUp = yUp;
    }
    Object.defineProperty(PrimitiveCylinderPrefab.prototype, "topRadius", {
        /**
         * The radius of the top end of the cylinder.
         */
        get: function () {
            return this._topRadius;
        },
        set: function (value) {
            this._topRadius = value;
            this._pInvalidateGeometry();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitiveCylinderPrefab.prototype, "bottomRadius", {
        /**
         * The radius of the bottom end of the cylinder.
         */
        get: function () {
            return this._pBottomRadius;
        },
        set: function (value) {
            this._pBottomRadius = value;
            this._pInvalidateGeometry();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitiveCylinderPrefab.prototype, "height", {
        /**
         * The radius of the top end of the cylinder.
         */
        get: function () {
            return this._height;
        },
        set: function (value) {
            this._height = value;
            this._pInvalidateGeometry();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitiveCylinderPrefab.prototype, "segmentsW", {
        /**
         * Defines the number of horizontal segments that make up the cylinder. Defaults to 16.
         */
        get: function () {
            return this._pSegmentsW;
        },
        set: function (value) {
            this.setSegmentsW(value);
        },
        enumerable: true,
        configurable: true
    });
    PrimitiveCylinderPrefab.prototype.setSegmentsW = function (value) {
        this._pSegmentsW = value;
        this._pInvalidateGeometry();
        this._pInvalidateUVs();
    };
    Object.defineProperty(PrimitiveCylinderPrefab.prototype, "segmentsH", {
        /**
         * Defines the number of vertical segments that make up the cylinder. Defaults to 1.
         */
        get: function () {
            return this._pSegmentsH;
        },
        set: function (value) {
            this.setSegmentsH(value);
        },
        enumerable: true,
        configurable: true
    });
    PrimitiveCylinderPrefab.prototype.setSegmentsH = function (value) {
        this._pSegmentsH = value;
        this._pInvalidateGeometry();
        this._pInvalidateUVs();
    };
    Object.defineProperty(PrimitiveCylinderPrefab.prototype, "topClosed", {
        /**
         * Defines whether the top end of the cylinder is closed (true) or open.
         */
        get: function () {
            return this._topClosed;
        },
        set: function (value) {
            this._topClosed = value;
            this._pInvalidateGeometry();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitiveCylinderPrefab.prototype, "bottomClosed", {
        /**
         * Defines whether the bottom end of the cylinder is closed (true) or open.
         */
        get: function () {
            return this._bottomClosed;
        },
        set: function (value) {
            this._bottomClosed = value;
            this._pInvalidateGeometry();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitiveCylinderPrefab.prototype, "yUp", {
        /**
         * Defines whether the cylinder poles should lay on the Y-axis (true) or on the Z-axis (false).
         */
        get: function () {
            return this._yUp;
        },
        set: function (value) {
            this._yUp = value;
            this._pInvalidateGeometry();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @inheritDoc
     */
    PrimitiveCylinderPrefab.prototype._pBuildGeometry = function (target, geometryType) {
        var indices /*uint*/;
        var positions;
        var normals;
        var tangents;
        var i;
        var j;
        var x;
        var y;
        var z;
        var vidx;
        var fidx;
        var radius;
        var revolutionAngle;
        var dr;
        var latNormElev;
        var latNormBase;
        var numIndices = 0;
        var comp1;
        var comp2;
        var startIndex = 0;
        var nextVertexIndex = 0;
        var centerVertexIndex = 0;
        var t1;
        var t2;
        // reset utility variables
        this._numVertices = 0;
        // evaluate revolution steps
        var revolutionAngleDelta = 2 * Math.PI / this._pSegmentsW;
        if (geometryType == "triangleSubGeometry") {
            var triangleGeometry = target;
            // evaluate target number of vertices, triangles and indices
            if (this._surfaceClosed) {
                this._numVertices += (this._pSegmentsH + 1) * (this._pSegmentsW + 1); // segmentsH + 1 because of closure, segmentsW + 1 because of UV unwrapping
                numIndices += this._pSegmentsH * this._pSegmentsW * 6; // each level has segmentW quads, each of 2 triangles
            }
            if (this._topClosed) {
                this._numVertices += 2 * (this._pSegmentsW + 1); // segmentsW + 1 because of unwrapping
                numIndices += this._pSegmentsW * 3; // one triangle for each segment
            }
            if (this._bottomClosed) {
                this._numVertices += 2 * (this._pSegmentsW + 1);
                numIndices += this._pSegmentsW * 3;
            }
            // need to initialize raw arrays or can be reused?
            if (this._numVertices == triangleGeometry.numVertices) {
                indices = triangleGeometry.indices;
                positions = triangleGeometry.positions;
                normals = triangleGeometry.vertexNormals;
                tangents = triangleGeometry.vertexTangents;
            }
            else {
                indices = new Array(numIndices);
                positions = new Array(this._numVertices * 3);
                normals = new Array(this._numVertices * 3);
                tangents = new Array(this._numVertices * 3);
                this._pInvalidateUVs();
            }
            vidx = 0;
            fidx = 0;
            // top
            if (this._topClosed && this._topRadius > 0) {
                z = -0.5 * this._height;
                // central vertex
                if (this._yUp) {
                    t1 = 1;
                    t2 = 0;
                    comp1 = -z;
                    comp2 = 0;
                }
                else {
                    t1 = 0;
                    t2 = -1;
                    comp1 = 0;
                    comp2 = z;
                }
                positions[vidx] = 0;
                positions[vidx + 1] = comp1;
                positions[vidx + 2] = comp2;
                normals[vidx] = 0;
                normals[vidx + 1] = t1;
                normals[vidx + 2] = t2;
                tangents[vidx] = 1;
                tangents[vidx + 1] = 0;
                tangents[vidx + 2] = 0;
                vidx += 3;
                nextVertexIndex += 1;
                for (i = 0; i <= this._pSegmentsW; ++i) {
                    // revolution vertex
                    revolutionAngle = i * revolutionAngleDelta;
                    x = this._topRadius * Math.cos(revolutionAngle);
                    y = this._topRadius * Math.sin(revolutionAngle);
                    if (this._yUp) {
                        comp1 = -z;
                        comp2 = y;
                    }
                    else {
                        comp1 = y;
                        comp2 = z;
                    }
                    if (i == this._pSegmentsW) {
                        positions[vidx] = positions[startIndex + 3];
                        positions[vidx + 1] = positions[startIndex + 4];
                        positions[vidx + 2] = positions[startIndex + 5];
                    }
                    else {
                        positions[vidx] = x;
                        positions[vidx + 1] = comp1;
                        positions[vidx + 2] = comp2;
                    }
                    normals[vidx] = 0;
                    normals[vidx + 1] = t1;
                    normals[vidx + 2] = t2;
                    tangents[vidx] = 1;
                    tangents[vidx + 1] = 0;
                    tangents[vidx + 2] = 0;
                    vidx += 3;
                    if (i > 0) {
                        // add triangle
                        indices[fidx++] = nextVertexIndex - 1;
                        indices[fidx++] = centerVertexIndex;
                        indices[fidx++] = nextVertexIndex;
                    }
                    nextVertexIndex += 1;
                }
            }
            // bottom
            if (this._bottomClosed && this._pBottomRadius > 0) {
                z = 0.5 * this._height;
                startIndex = nextVertexIndex * 3;
                centerVertexIndex = nextVertexIndex;
                // central vertex
                if (this._yUp) {
                    t1 = -1;
                    t2 = 0;
                    comp1 = -z;
                    comp2 = 0;
                }
                else {
                    t1 = 0;
                    t2 = 1;
                    comp1 = 0;
                    comp2 = z;
                }
                if (i > 0) {
                    positions[vidx] = 0;
                    positions[vidx + 1] = comp1;
                    positions[vidx + 2] = comp2;
                    normals[vidx] = 0;
                    normals[vidx + 1] = t1;
                    normals[vidx + 2] = t2;
                    tangents[vidx] = 1;
                    tangents[vidx + 1] = 0;
                    tangents[vidx + 2] = 0;
                    vidx += 3;
                }
                nextVertexIndex += 1;
                for (i = 0; i <= this._pSegmentsW; ++i) {
                    // revolution vertex
                    revolutionAngle = i * revolutionAngleDelta;
                    x = this._pBottomRadius * Math.cos(revolutionAngle);
                    y = this._pBottomRadius * Math.sin(revolutionAngle);
                    if (this._yUp) {
                        comp1 = -z;
                        comp2 = y;
                    }
                    else {
                        comp1 = y;
                        comp2 = z;
                    }
                    if (i == this._pSegmentsW) {
                        positions[vidx] = positions[startIndex + 3];
                        positions[vidx + 1] = positions[startIndex + 4];
                        positions[vidx + 2] = positions[startIndex + 5];
                    }
                    else {
                        positions[vidx] = x;
                        positions[vidx + 1] = comp1;
                        positions[vidx + 2] = comp2;
                    }
                    normals[vidx] = 0;
                    normals[vidx + 1] = t1;
                    normals[vidx + 2] = t2;
                    tangents[vidx] = 1;
                    tangents[vidx + 1] = 0;
                    tangents[vidx + 2] = 0;
                    vidx += 3;
                    if (i > 0) {
                        // add triangle
                        indices[fidx++] = nextVertexIndex - 1;
                        indices[fidx++] = nextVertexIndex;
                        indices[fidx++] = centerVertexIndex;
                    }
                    nextVertexIndex += 1;
                }
            }
            // The normals on the lateral surface all have the same incline, i.e.
            // the "elevation" component (Y or Z depending on yUp) is constant.
            // Same principle goes for the "base" of these vectors, which will be
            // calculated such that a vector [base,elev] will be a unit vector.
            dr = (this._pBottomRadius - this._topRadius);
            latNormElev = dr / this._height;
            latNormBase = (latNormElev == 0) ? 1 : this._height / dr;
            // lateral surface
            if (this._surfaceClosed) {
                var a;
                var b;
                var c;
                var d;
                var na0, na1, naComp1, naComp2;
                for (j = 0; j <= this._pSegmentsH; ++j) {
                    radius = this._topRadius - ((j / this._pSegmentsH) * (this._topRadius - this._pBottomRadius));
                    z = -(this._height / 2) + (j / this._pSegmentsH * this._height);
                    startIndex = nextVertexIndex * 3;
                    for (i = 0; i <= this._pSegmentsW; ++i) {
                        // revolution vertex
                        revolutionAngle = i * revolutionAngleDelta;
                        x = radius * Math.cos(revolutionAngle);
                        y = radius * Math.sin(revolutionAngle);
                        na0 = latNormBase * Math.cos(revolutionAngle);
                        na1 = latNormBase * Math.sin(revolutionAngle);
                        if (this._yUp) {
                            t1 = 0;
                            t2 = -na0;
                            comp1 = -z;
                            comp2 = y;
                            naComp1 = latNormElev;
                            naComp2 = na1;
                        }
                        else {
                            t1 = -na0;
                            t2 = 0;
                            comp1 = y;
                            comp2 = z;
                            naComp1 = na1;
                            naComp2 = latNormElev;
                        }
                        if (i == this._pSegmentsW) {
                            positions[vidx] = positions[startIndex];
                            positions[vidx + 1] = positions[startIndex + 1];
                            positions[vidx + 2] = positions[startIndex + 2];
                            normals[vidx] = na0;
                            normals[vidx + 1] = latNormElev;
                            normals[vidx + 2] = na1;
                            tangents[vidx] = na1;
                            tangents[vidx + 1] = t1;
                            tangents[vidx + 2] = t2;
                        }
                        else {
                            positions[vidx] = x;
                            positions[vidx + 1] = comp1;
                            positions[vidx + 2] = comp2;
                            normals[vidx] = na0;
                            normals[vidx + 1] = naComp1;
                            normals[vidx + 2] = naComp2;
                            tangents[vidx] = -na1;
                            tangents[vidx + 1] = t1;
                            tangents[vidx + 2] = t2;
                        }
                        vidx += 3;
                        // close triangle
                        if (i > 0 && j > 0) {
                            a = nextVertexIndex; // current
                            b = nextVertexIndex - 1; // previous
                            c = b - this._pSegmentsW - 1; // previous of last level
                            d = a - this._pSegmentsW - 1; // current of last level
                            indices[fidx++] = a;
                            indices[fidx++] = b;
                            indices[fidx++] = c;
                            indices[fidx++] = a;
                            indices[fidx++] = c;
                            indices[fidx++] = d;
                        }
                        nextVertexIndex++;
                    }
                }
            }
            // build real data from raw data
            triangleGeometry.updateIndices(indices);
            triangleGeometry.updatePositions(positions);
            triangleGeometry.updateVertexNormals(normals);
            triangleGeometry.updateVertexTangents(tangents);
        }
        else if (geometryType == "lineSubGeometry") {
            var lineGeometry = target;
            var numSegments = (this._pSegmentsH + 1) * (this._pSegmentsW) + this._pSegmentsW;
            var startPositions;
            var endPositions;
            var thickness;
            if (lineGeometry.indices != null && numSegments == lineGeometry.numSegments) {
                startPositions = lineGeometry.startPositions;
                endPositions = lineGeometry.endPositions;
                thickness = lineGeometry.thickness;
            }
            else {
                startPositions = new Array(numSegments * 3);
                endPositions = new Array(numSegments * 3);
                thickness = new Array(numSegments);
            }
            vidx = 0;
            fidx = 0;
            for (j = 0; j <= this._pSegmentsH; ++j) {
                radius = this._topRadius - ((j / this._pSegmentsH) * (this._topRadius - this._pBottomRadius));
                z = this._height * (j / this._pSegmentsH - 0.5);
                for (i = 0; i <= this._pSegmentsW; ++i) {
                    // revolution vertex
                    revolutionAngle = i * revolutionAngleDelta;
                    x = radius * Math.cos(revolutionAngle);
                    y = radius * Math.sin(revolutionAngle);
                    if (this._yUp) {
                        comp1 = -z;
                        comp2 = y;
                    }
                    else {
                        comp1 = y;
                        comp2 = z;
                    }
                    if (i > 0) {
                        endPositions[vidx] = x;
                        endPositions[vidx + 1] = comp1;
                        endPositions[vidx + 2] = comp2;
                        thickness[fidx++] = 1;
                        vidx += 3;
                        //vertical lines
                        startPositions[vidx] = endPositions[vidx - this._pSegmentsW * 6];
                        startPositions[vidx + 1] = endPositions[vidx + 1 - this._pSegmentsW * 6];
                        startPositions[vidx + 2] = endPositions[vidx + 2 - this._pSegmentsW * 6];
                        endPositions[vidx] = x;
                        endPositions[vidx + 1] = comp1;
                        endPositions[vidx + 2] = comp2;
                        thickness[fidx++] = 1;
                        vidx += 3;
                    }
                    if (i < this._pSegmentsW) {
                        startPositions[vidx] = x;
                        startPositions[vidx + 1] = comp1;
                        startPositions[vidx + 2] = comp2;
                    }
                }
            }
            // build real data from raw data
            lineGeometry.updatePositions(startPositions, endPositions);
            lineGeometry.updateThickness(thickness);
        }
    };
    /**
     * @inheritDoc
     */
    PrimitiveCylinderPrefab.prototype._pBuildUVs = function (target, geometryType) {
        var i;
        var j;
        var x;
        var y;
        var revolutionAngle;
        var uvs;
        if (geometryType == "triangleSubGeometry") {
            var triangleGeometry = target;
            // need to initialize raw array or can be reused?
            if (triangleGeometry.uvs && this._numVertices == triangleGeometry.numVertices) {
                uvs = triangleGeometry.uvs;
            }
            else {
                uvs = new Array(this._numVertices * 2);
            }
            // evaluate revolution steps
            var revolutionAngleDelta = 2 * Math.PI / this._pSegmentsW;
            // current uv component index
            var index = 0;
            // top
            if (this._topClosed) {
                uvs[index++] = 0.5 * triangleGeometry.scaleU; // central vertex
                uvs[index++] = 0.5 * triangleGeometry.scaleV;
                for (i = 0; i <= this._pSegmentsW; ++i) {
                    revolutionAngle = i * revolutionAngleDelta;
                    x = 0.5 + 0.5 * -Math.cos(revolutionAngle);
                    y = 0.5 + 0.5 * Math.sin(revolutionAngle);
                    uvs[index++] = x * triangleGeometry.scaleU; // revolution vertex
                    uvs[index++] = y * triangleGeometry.scaleV;
                }
            }
            // bottom
            if (this._bottomClosed) {
                uvs[index++] = 0.5 * triangleGeometry.scaleU; // central vertex
                uvs[index++] = 0.5 * triangleGeometry.scaleV;
                for (i = 0; i <= this._pSegmentsW; ++i) {
                    revolutionAngle = i * revolutionAngleDelta;
                    x = 0.5 + 0.5 * Math.cos(revolutionAngle);
                    y = 0.5 + 0.5 * Math.sin(revolutionAngle);
                    uvs[index++] = x * triangleGeometry.scaleU; // revolution vertex
                    uvs[index++] = y * triangleGeometry.scaleV;
                }
            }
            // lateral surface
            if (this._surfaceClosed) {
                for (j = 0; j <= this._pSegmentsH; ++j) {
                    for (i = 0; i <= this._pSegmentsW; ++i) {
                        // revolution vertex
                        uvs[index++] = (i / this._pSegmentsW) * triangleGeometry.scaleU;
                        uvs[index++] = (j / this._pSegmentsH) * triangleGeometry.scaleV;
                    }
                }
            }
            // build real data from raw data
            triangleGeometry.updateUVs(uvs);
        }
        else if (geometryType == "lineSubGeometry") {
        }
    };
    return PrimitiveCylinderPrefab;
})(PrimitivePrefabBase);
module.exports = PrimitiveCylinderPrefab;


},{"awayjs-display/lib/prefabs/PrimitivePrefabBase":"awayjs-display/lib/prefabs/PrimitivePrefabBase"}],"awayjs-display/lib/prefabs/PrimitivePlanePrefab":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var PrimitivePrefabBase = require("awayjs-display/lib/prefabs/PrimitivePrefabBase");
/**
 * A Plane primitive mesh.
 */
var PrimitivePlanePrefab = (function (_super) {
    __extends(PrimitivePlanePrefab, _super);
    /**
     * Creates a new Plane object.
     * @param width The width of the plane.
     * @param height The height of the plane.
     * @param segmentsW The number of segments that make up the plane along the X-axis.
     * @param segmentsH The number of segments that make up the plane along the Y or Z-axis.
     * @param yUp Defines whether the normal vector of the plane should point along the Y-axis (true) or Z-axis (false).
     * @param doubleSided Defines whether the plane will be visible from both sides, with correct vertex normals.
     */
    function PrimitivePlanePrefab(width, height, segmentsW, segmentsH, yUp, doubleSided) {
        if (width === void 0) { width = 100; }
        if (height === void 0) { height = 100; }
        if (segmentsW === void 0) { segmentsW = 1; }
        if (segmentsH === void 0) { segmentsH = 1; }
        if (yUp === void 0) { yUp = true; }
        if (doubleSided === void 0) { doubleSided = false; }
        _super.call(this);
        this._segmentsW = segmentsW;
        this._segmentsH = segmentsH;
        this._yUp = yUp;
        this._width = width;
        this._height = height;
        this._doubleSided = doubleSided;
    }
    Object.defineProperty(PrimitivePlanePrefab.prototype, "segmentsW", {
        /**
         * The number of segments that make up the plane along the X-axis. Defaults to 1.
         */
        get: function () {
            return this._segmentsW;
        },
        set: function (value) {
            this._segmentsW = value;
            this._pInvalidateGeometry();
            this._pInvalidateUVs();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitivePlanePrefab.prototype, "segmentsH", {
        /**
         * The number of segments that make up the plane along the Y or Z-axis, depending on whether yUp is true or
         * false, respectively. Defaults to 1.
         */
        get: function () {
            return this._segmentsH;
        },
        set: function (value) {
            this._segmentsH = value;
            this._pInvalidateGeometry();
            this._pInvalidateUVs();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitivePlanePrefab.prototype, "yUp", {
        /**
         *  Defines whether the normal vector of the plane should point along the Y-axis (true) or Z-axis (false). Defaults to true.
         */
        get: function () {
            return this._yUp;
        },
        set: function (value) {
            this._yUp = value;
            this._pInvalidateGeometry();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitivePlanePrefab.prototype, "doubleSided", {
        /**
         * Defines whether the plane will be visible from both sides, with correct vertex normals (as opposed to bothSides on Material). Defaults to false.
         */
        get: function () {
            return this._doubleSided;
        },
        set: function (value) {
            this._doubleSided = value;
            this._pInvalidateGeometry();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitivePlanePrefab.prototype, "width", {
        /**
         * The width of the plane.
         */
        get: function () {
            return this._width;
        },
        set: function (value) {
            this._width = value;
            this._pInvalidateGeometry();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitivePlanePrefab.prototype, "height", {
        /**
         * The height of the plane.
         */
        get: function () {
            return this._height;
        },
        set: function (value) {
            this._height = value;
            this._pInvalidateGeometry();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @inheritDoc
     */
    PrimitivePlanePrefab.prototype._pBuildGeometry = function (target, geometryType) {
        var indices /*uint*/;
        var x, y;
        var numIndices;
        var base;
        var tw = this._segmentsW + 1;
        var numVertices;
        var vidx, fidx; // indices
        var xi;
        var yi;
        if (geometryType == "triangleSubGeometry") {
            var triangleGeometry = target;
            var numVertices = (this._segmentsH + 1) * tw;
            var positions;
            var normals;
            var tangents;
            if (this._doubleSided)
                numVertices *= 2;
            numIndices = this._segmentsH * this._segmentsW * 6;
            if (this._doubleSided)
                numIndices *= 2;
            if (triangleGeometry.indices != null && numIndices == triangleGeometry.indices.length) {
                indices = triangleGeometry.indices;
            }
            else {
                indices = new Array(numIndices);
                this._pInvalidateUVs();
            }
            if (numVertices == triangleGeometry.numVertices) {
                positions = triangleGeometry.positions;
                normals = triangleGeometry.vertexNormals;
                tangents = triangleGeometry.vertexTangents;
            }
            else {
                positions = new Array(numVertices * 3);
                normals = new Array(numVertices * 3);
                tangents = new Array(numVertices * 3);
                this._pInvalidateUVs();
            }
            fidx = 0;
            vidx = 0;
            for (yi = 0; yi <= this._segmentsH; ++yi) {
                for (xi = 0; xi <= this._segmentsW; ++xi) {
                    x = (xi / this._segmentsW - .5) * this._width;
                    y = (yi / this._segmentsH - .5) * this._height;
                    positions[vidx] = x;
                    if (this._yUp) {
                        positions[vidx + 1] = 0;
                        positions[vidx + 2] = y;
                    }
                    else {
                        positions[vidx + 1] = y;
                        positions[vidx + 2] = 0;
                    }
                    normals[vidx] = 0;
                    if (this._yUp) {
                        normals[vidx + 1] = 1;
                        normals[vidx + 2] = 0;
                    }
                    else {
                        normals[vidx + 1] = 0;
                        normals[vidx + 2] = -1;
                    }
                    tangents[vidx] = 1;
                    tangents[vidx + 1] = 0;
                    tangents[vidx + 2] = 0;
                    vidx += 3;
                    // add vertex with same position, but with inverted normal & tangent
                    if (this._doubleSided) {
                        for (var i = vidx; i < vidx + 3; ++i) {
                            positions[i] = positions[i - 3];
                            normals[i] = -normals[i - 3];
                            tangents[i] = -tangents[i - 3];
                        }
                        vidx += 3;
                    }
                    if (xi != this._segmentsW && yi != this._segmentsH) {
                        base = xi + yi * tw;
                        var mult = this._doubleSided ? 2 : 1;
                        indices[fidx++] = base * mult;
                        indices[fidx++] = (base + tw) * mult;
                        indices[fidx++] = (base + tw + 1) * mult;
                        indices[fidx++] = base * mult;
                        indices[fidx++] = (base + tw + 1) * mult;
                        indices[fidx++] = (base + 1) * mult;
                        if (this._doubleSided) {
                            indices[fidx++] = (base + tw + 1) * mult + 1;
                            indices[fidx++] = (base + tw) * mult + 1;
                            indices[fidx++] = base * mult + 1;
                            indices[fidx++] = (base + 1) * mult + 1;
                            indices[fidx++] = (base + tw + 1) * mult + 1;
                            indices[fidx++] = base * mult + 1;
                        }
                    }
                }
            }
            triangleGeometry.updateIndices(indices);
            triangleGeometry.updatePositions(positions);
            triangleGeometry.updateVertexNormals(normals);
            triangleGeometry.updateVertexTangents(tangents);
        }
        else if (geometryType == "lineSubGeometry") {
            var lineGeometry = target;
            var numSegments = (this._segmentsH + 1) + tw;
            var startPositions;
            var endPositions;
            var thickness;
            var hw = this._width / 2;
            var hh = this._height / 2;
            if (lineGeometry.indices != null && numSegments == lineGeometry.numSegments) {
                startPositions = lineGeometry.startPositions;
                endPositions = lineGeometry.endPositions;
                thickness = lineGeometry.thickness;
            }
            else {
                startPositions = new Array(numSegments * 3);
                endPositions = new Array(numSegments * 3);
                thickness = new Array(numSegments);
            }
            fidx = 0;
            vidx = 0;
            for (yi = 0; yi <= this._segmentsH; ++yi) {
                startPositions[vidx] = -hw;
                startPositions[vidx + 1] = 0;
                startPositions[vidx + 2] = yi * this._height - hh;
                endPositions[vidx] = hw;
                endPositions[vidx + 1] = 0;
                endPositions[vidx + 2] = yi * this._height - hh;
                thickness[fidx++] = 1;
                vidx += 3;
            }
            for (xi = 0; xi <= this._segmentsW; ++xi) {
                startPositions[vidx] = xi * this._width - hw;
                startPositions[vidx + 1] = 0;
                startPositions[vidx + 2] = -hh;
                endPositions[vidx] = xi * this._width - hw;
                endPositions[vidx + 1] = 0;
                endPositions[vidx + 2] = hh;
                thickness[fidx++] = 1;
                vidx += 3;
            }
            // build real data from raw data
            lineGeometry.updatePositions(startPositions, endPositions);
            lineGeometry.updateThickness(thickness);
        }
    };
    /**
     * @inheritDoc
     */
    PrimitivePlanePrefab.prototype._pBuildUVs = function (target, geometryType) {
        var uvs;
        var numVertices;
        if (geometryType == "triangleSubGeometry") {
            numVertices = (this._segmentsH + 1) * (this._segmentsW + 1);
            if (this._doubleSided)
                numVertices *= 2;
            var triangleGeometry = target;
            if (triangleGeometry.uvs && numVertices == triangleGeometry.numVertices) {
                uvs = triangleGeometry.uvs;
            }
            else {
                uvs = new Array(numVertices * 2);
                this._pInvalidateGeometry();
            }
            var index = 0;
            for (var yi = 0; yi <= this._segmentsH; ++yi) {
                for (var xi = 0; xi <= this._segmentsW; ++xi) {
                    uvs[index] = (xi / this._segmentsW) * triangleGeometry.scaleU;
                    uvs[index + 1] = (1 - yi / this._segmentsH) * triangleGeometry.scaleV;
                    index += 2;
                    if (this._doubleSided) {
                        uvs[index] = (xi / this._segmentsW) * triangleGeometry.scaleU;
                        uvs[index + 1] = (1 - yi / this._segmentsH) * triangleGeometry.scaleV;
                        index += 2;
                    }
                }
            }
            triangleGeometry.updateUVs(uvs);
        }
        else if (geometryType == "lineSubGeometry") {
        }
    };
    return PrimitivePlanePrefab;
})(PrimitivePrefabBase);
module.exports = PrimitivePlanePrefab;


},{"awayjs-display/lib/prefabs/PrimitivePrefabBase":"awayjs-display/lib/prefabs/PrimitivePrefabBase"}],"awayjs-display/lib/prefabs/PrimitivePolygonPrefab":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var PrimitiveCylinderPrefab = require("awayjs-display/lib/prefabs/PrimitiveCylinderPrefab");
/**
 * A UV RegularPolygon primitive mesh.
 */
var PrimitivePolygonPrefab = (function (_super) {
    __extends(PrimitivePolygonPrefab, _super);
    /**
     * Creates a new RegularPolygon disc object.
     * @param radius The radius of the regular polygon
     * @param sides Defines the number of sides of the regular polygon.
     * @param yUp Defines whether the regular polygon should lay on the Y-axis (true) or on the Z-axis (false).
     */
    function PrimitivePolygonPrefab(radius, sides, yUp) {
        if (radius === void 0) { radius = 100; }
        if (sides === void 0) { sides = 16; }
        if (yUp === void 0) { yUp = true; }
        _super.call(this, radius, 0, 0, sides, 1, true, false, false, yUp);
    }
    Object.defineProperty(PrimitivePolygonPrefab.prototype, "radius", {
        /**
         * The radius of the regular polygon.
         */
        get: function () {
            return this._pBottomRadius;
        },
        set: function (value) {
            this._pBottomRadius = value;
            this._pInvalidateGeometry();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitivePolygonPrefab.prototype, "sides", {
        /**
         * The number of sides of the regular polygon.
         */
        get: function () {
            return this._pSegmentsW;
        },
        set: function (value) {
            this.setSegmentsW(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitivePolygonPrefab.prototype, "subdivisions", {
        /**
         * The number of subdivisions from the edge to the center of the regular polygon.
         */
        get: function () {
            return this._pSegmentsH;
        },
        set: function (value) {
            this.setSegmentsH(value);
        },
        enumerable: true,
        configurable: true
    });
    return PrimitivePolygonPrefab;
})(PrimitiveCylinderPrefab);
module.exports = PrimitivePolygonPrefab;


},{"awayjs-display/lib/prefabs/PrimitiveCylinderPrefab":"awayjs-display/lib/prefabs/PrimitiveCylinderPrefab"}],"awayjs-display/lib/prefabs/PrimitivePrefabBase":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Geometry = require("awayjs-core/lib/data/Geometry");
var TriangleSubGeometry = require("awayjs-core/lib/data/TriangleSubGeometry");
var LineSubGeometry = require("awayjs-core/lib/data/LineSubGeometry");
var AbstractMethodError = require("awayjs-core/lib/errors/AbstractMethodError");
var Mesh = require("awayjs-display/lib/entities/Mesh");
var PrefabBase = require("awayjs-display/lib/prefabs/PrefabBase");
/**
 * PrimitivePrefabBase is an abstract base class for polytope prefabs, which are simple pre-built geometric shapes
 */
var PrimitivePrefabBase = (function (_super) {
    __extends(PrimitivePrefabBase, _super);
    /**
     * Creates a new PrimitivePrefabBase object.
     *
     * @param material The material with which to render the object
     */
    function PrimitivePrefabBase(material, geometryType) {
        if (material === void 0) { material = null; }
        if (geometryType === void 0) { geometryType = "triangleSubGeometry"; }
        _super.call(this);
        this._geomDirty = true;
        this._uvDirty = true;
        this._geometryTypeDirty = true;
        this._geometry = new Geometry();
        this._material = material;
        this._geometryType = geometryType;
    }
    Object.defineProperty(PrimitivePrefabBase.prototype, "assetType", {
        /**
         *
         */
        get: function () {
            return PrimitivePrefabBase.assetType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitivePrefabBase.prototype, "geometryType", {
        /**
         *
         */
        get: function () {
            return this._geometryType;
        },
        set: function (value) {
            if (this._geometryType == value)
                return;
            this._geometryType = value;
            this.invalidateGeometryType();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitivePrefabBase.prototype, "geometry", {
        get: function () {
            this._iValidate();
            return this._geometry;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitivePrefabBase.prototype, "material", {
        /**
         * The material with which to render the primitive.
         */
        get: function () {
            return this._material;
        },
        set: function (value) {
            if (value == this._material)
                return;
            this._material = value;
            var len = this._pObjects.length;
            for (var i = 0; i < len; i++)
                this._pObjects[i].material = this._material;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Builds the primitive's geometry when invalid. This method should not be called directly. The calling should
     * be triggered by the invalidateGeometry method (and in turn by updateGeometry).
     */
    PrimitivePrefabBase.prototype._pBuildGeometry = function (target, geometryType) {
        throw new AbstractMethodError();
    };
    /**
     * Builds the primitive's uv coordinates when invalid. This method should not be called directly. The calling
     * should be triggered by the invalidateUVs method (and in turn by updateUVs).
     */
    PrimitivePrefabBase.prototype._pBuildUVs = function (target, geometryType) {
        throw new AbstractMethodError();
    };
    /**
     * Invalidates the primitive's geometry type, causing it to be updated when requested.
     */
    PrimitivePrefabBase.prototype.invalidateGeometryType = function () {
        this._geometryTypeDirty = true;
        this._geomDirty = true;
        this._uvDirty = true;
    };
    /**
     * Invalidates the primitive's geometry, causing it to be updated when requested.
     */
    PrimitivePrefabBase.prototype._pInvalidateGeometry = function () {
        this._geomDirty = true;
    };
    /**
     * Invalidates the primitive's uv coordinates, causing them to be updated when requested.
     */
    PrimitivePrefabBase.prototype._pInvalidateUVs = function () {
        this._uvDirty = true;
    };
    /**
     * Updates the subgeometry when invalid.
     */
    PrimitivePrefabBase.prototype.updateGeometryType = function () {
        //remove any existing sub geometry
        if (this._subGeometry)
            this._geometry.removeSubGeometry(this._subGeometry);
        if (this._geometryType == "triangleSubGeometry") {
            var triangleGeometry = new TriangleSubGeometry(true);
            triangleGeometry.autoDeriveNormals = false;
            triangleGeometry.autoDeriveTangents = false;
            triangleGeometry.autoDeriveUVs = false;
            this._geometry.addSubGeometry(triangleGeometry);
            this._subGeometry = triangleGeometry;
        }
        else if (this._geometryType == "lineSubGeometry") {
            this._geometry.addSubGeometry(this._subGeometry = new LineSubGeometry());
        }
        this._geometryTypeDirty = false;
    };
    /**
     * Updates the geometry when invalid.
     */
    PrimitivePrefabBase.prototype.updateGeometry = function () {
        this._pBuildGeometry(this._subGeometry, this._geometryType);
        this._geomDirty = false;
    };
    /**
     * Updates the uv coordinates when invalid.
     */
    PrimitivePrefabBase.prototype.updateUVs = function () {
        this._pBuildUVs(this._subGeometry, this._geometryType);
        this._uvDirty = false;
    };
    PrimitivePrefabBase.prototype._iValidate = function () {
        if (this._geometryTypeDirty)
            this.updateGeometryType();
        if (this._geomDirty)
            this.updateGeometry();
        if (this._uvDirty)
            this.updateUVs();
    };
    PrimitivePrefabBase.prototype._pCreateObject = function () {
        var mesh = new Mesh(this._geometry, this._material);
        mesh._iSourcePrefab = this;
        return mesh;
    };
    PrimitivePrefabBase.assetType = "[asset PrimitivePrefab]";
    return PrimitivePrefabBase;
})(PrefabBase);
module.exports = PrimitivePrefabBase;


},{"awayjs-core/lib/data/Geometry":undefined,"awayjs-core/lib/data/LineSubGeometry":undefined,"awayjs-core/lib/data/TriangleSubGeometry":undefined,"awayjs-core/lib/errors/AbstractMethodError":undefined,"awayjs-display/lib/entities/Mesh":"awayjs-display/lib/entities/Mesh","awayjs-display/lib/prefabs/PrefabBase":"awayjs-display/lib/prefabs/PrefabBase"}],"awayjs-display/lib/prefabs/PrimitiveSpherePrefab":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var PrimitivePrefabBase = require("awayjs-display/lib/prefabs/PrimitivePrefabBase");
/**
 * A UV Sphere primitive mesh.
 */
var PrimitiveSpherePrefab = (function (_super) {
    __extends(PrimitiveSpherePrefab, _super);
    /**
     * Creates a new Sphere object.
     *
     * @param radius The radius of the sphere.
     * @param segmentsW Defines the number of horizontal segments that make up the sphere.
     * @param segmentsH Defines the number of vertical segments that make up the sphere.
     * @param yUp Defines whether the sphere poles should lay on the Y-axis (true) or on the Z-axis (false).
     */
    function PrimitiveSpherePrefab(radius, segmentsW, segmentsH, yUp) {
        if (radius === void 0) { radius = 50; }
        if (segmentsW === void 0) { segmentsW = 16; }
        if (segmentsH === void 0) { segmentsH = 12; }
        if (yUp === void 0) { yUp = true; }
        _super.call(this);
        this._radius = radius;
        this._segmentsW = segmentsW;
        this._segmentsH = segmentsH;
        this._yUp = yUp;
    }
    Object.defineProperty(PrimitiveSpherePrefab.prototype, "radius", {
        /**
         * The radius of the sphere.
         */
        get: function () {
            return this._radius;
        },
        set: function (value) {
            this._radius = value;
            this._pInvalidateGeometry();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitiveSpherePrefab.prototype, "segmentsW", {
        /**
         * Defines the number of horizontal segments that make up the sphere. Defaults to 16.
         */
        get: function () {
            return this._segmentsW;
        },
        set: function (value) {
            this._segmentsW = value;
            this._pInvalidateGeometry();
            this._pInvalidateUVs();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitiveSpherePrefab.prototype, "segmentsH", {
        /**
         * Defines the number of vertical segments that make up the sphere. Defaults to 12.
         */
        get: function () {
            return this._segmentsH;
        },
        set: function (value) {
            this._segmentsH = value;
            this._pInvalidateGeometry();
            this._pInvalidateUVs();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitiveSpherePrefab.prototype, "yUp", {
        /**
         * Defines whether the sphere poles should lay on the Y-axis (true) or on the Z-axis (false).
         */
        get: function () {
            return this._yUp;
        },
        set: function (value) {
            this._yUp = value;
            this._pInvalidateGeometry();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @inheritDoc
     */
    PrimitiveSpherePrefab.prototype._pBuildGeometry = function (target, geometryType) {
        var indices /*uint*/;
        var positions;
        var normals;
        var tangents;
        var i;
        var j;
        var vidx, fidx; // indices
        var comp1;
        var comp2;
        var numVertices;
        if (geometryType == "triangleSubGeometry") {
            var triangleGeometry = target;
            numVertices = (this._segmentsH + 1) * (this._segmentsW + 1);
            if (numVertices == triangleGeometry.numVertices && triangleGeometry.indices != null) {
                indices = triangleGeometry.indices;
                positions = triangleGeometry.positions;
                normals = triangleGeometry.vertexNormals;
                tangents = triangleGeometry.vertexTangents;
            }
            else {
                indices = new Array((this._segmentsH - 1) * this._segmentsW * 6);
                positions = new Array(numVertices * 3);
                normals = new Array(numVertices * 3);
                tangents = new Array(numVertices * 3);
                this._pInvalidateUVs();
            }
            vidx = 0;
            fidx = 0;
            var startIndex;
            var t1;
            var t2;
            for (j = 0; j <= this._segmentsH; ++j) {
                startIndex = vidx;
                var horangle = Math.PI * j / this._segmentsH;
                var z = -this._radius * Math.cos(horangle);
                var ringradius = this._radius * Math.sin(horangle);
                for (i = 0; i <= this._segmentsW; ++i) {
                    var verangle = 2 * Math.PI * i / this._segmentsW;
                    var x = ringradius * Math.cos(verangle);
                    var y = ringradius * Math.sin(verangle);
                    var normLen = 1 / Math.sqrt(x * x + y * y + z * z);
                    var tanLen = Math.sqrt(y * y + x * x);
                    if (this._yUp) {
                        t1 = 0;
                        t2 = tanLen > .007 ? x / tanLen : 0;
                        comp1 = -z;
                        comp2 = y;
                    }
                    else {
                        t1 = tanLen > .007 ? x / tanLen : 0;
                        t2 = 0;
                        comp1 = y;
                        comp2 = z;
                    }
                    if (i == this._segmentsW) {
                        positions[vidx] = positions[startIndex];
                        positions[vidx + 1] = positions[startIndex + 1];
                        positions[vidx + 2] = positions[startIndex + 2];
                        normals[vidx] = normals[startIndex] + (x * normLen) * .5;
                        normals[vidx + 1] = normals[startIndex + 1] + (comp1 * normLen) * .5;
                        normals[vidx + 2] = normals[startIndex + 2] + (comp2 * normLen) * .5;
                        tangents[vidx] = tanLen > .007 ? -y / tanLen : 1;
                        tangents[vidx + 1] = t1;
                        tangents[vidx + 2] = t2;
                    }
                    else {
                        positions[vidx] = x;
                        positions[vidx + 1] = comp1;
                        positions[vidx + 2] = comp2;
                        normals[vidx] = x * normLen;
                        normals[vidx + 1] = comp1 * normLen;
                        normals[vidx + 2] = comp2 * normLen;
                        tangents[vidx] = tanLen > .007 ? -y / tanLen : 1;
                        tangents[vidx + 1] = t1;
                        tangents[vidx + 2] = t2;
                    }
                    if (i > 0 && j > 0) {
                        var a = (this._segmentsW + 1) * j + i;
                        var b = (this._segmentsW + 1) * j + i - 1;
                        var c = (this._segmentsW + 1) * (j - 1) + i - 1;
                        var d = (this._segmentsW + 1) * (j - 1) + i;
                        if (j == this._segmentsH) {
                            positions[vidx] = positions[startIndex];
                            positions[vidx + 1] = positions[startIndex + 1];
                            positions[vidx + 2] = positions[startIndex + 2];
                            indices[fidx++] = a;
                            indices[fidx++] = c;
                            indices[fidx++] = d;
                        }
                        else if (j == 1) {
                            indices[fidx++] = a;
                            indices[fidx++] = b;
                            indices[fidx++] = c;
                        }
                        else {
                            indices[fidx++] = a;
                            indices[fidx++] = b;
                            indices[fidx++] = c;
                            indices[fidx++] = a;
                            indices[fidx++] = c;
                            indices[fidx++] = d;
                        }
                    }
                    vidx += 3;
                }
            }
            triangleGeometry.updateIndices(indices);
            triangleGeometry.updatePositions(positions);
            triangleGeometry.updateVertexNormals(normals);
            triangleGeometry.updateVertexTangents(tangents);
        }
        else if (geometryType == "lineSubGeometry") {
            var lineGeometry = target;
            var numSegments = (this._segmentsH - 1) * this._segmentsW * 2;
            var startPositions;
            var endPositions;
            var thickness;
            if (lineGeometry.indices != null && numSegments == lineGeometry.numSegments) {
                startPositions = lineGeometry.startPositions;
                endPositions = lineGeometry.endPositions;
                thickness = lineGeometry.thickness;
            }
            else {
                startPositions = new Array(numSegments * 3);
                endPositions = new Array(numSegments * 3);
                thickness = new Array(numSegments);
            }
            vidx = 0;
            fidx = 0;
            for (j = 0; j <= this._segmentsH; ++j) {
                var horangle = Math.PI * j / this._segmentsH;
                var z = -this._radius * Math.cos(horangle);
                var ringradius = this._radius * Math.sin(horangle);
                for (i = 0; i <= this._segmentsW; ++i) {
                    var verangle = 2 * Math.PI * i / this._segmentsW;
                    var x = ringradius * Math.cos(verangle);
                    var y = ringradius * Math.sin(verangle);
                    if (this._yUp) {
                        comp1 = -z;
                        comp2 = y;
                    }
                    else {
                        comp1 = y;
                        comp2 = z;
                    }
                    if (i > 0 && j > 0) {
                        //horizonal lines
                        if (j < this._segmentsH) {
                            endPositions[vidx] = x;
                            endPositions[vidx + 1] = comp1;
                            endPositions[vidx + 2] = comp2;
                            thickness[fidx++] = 1;
                            vidx += 3;
                        }
                        //vertical lines
                        startPositions[vidx] = endPositions[vidx - this._segmentsW * 6];
                        startPositions[vidx + 1] = endPositions[vidx + 1 - this._segmentsW * 6];
                        startPositions[vidx + 2] = endPositions[vidx + 2 - this._segmentsW * 6];
                        endPositions[vidx] = x;
                        endPositions[vidx + 1] = comp1;
                        endPositions[vidx + 2] = comp2;
                        thickness[fidx++] = 1;
                        vidx += 3;
                    }
                    if (i < this._segmentsW && j > 0 && j < this._segmentsH) {
                        startPositions[vidx] = x;
                        startPositions[vidx + 1] = comp1;
                        startPositions[vidx + 2] = comp2;
                    }
                }
            }
            // build real data from raw data
            lineGeometry.updatePositions(startPositions, endPositions);
            lineGeometry.updateThickness(thickness);
        }
    };
    /**
     * @inheritDoc
     */
    PrimitiveSpherePrefab.prototype._pBuildUVs = function (target, geometryType) {
        var i, j;
        var numVertices = (this._segmentsH + 1) * (this._segmentsW + 1);
        var uvs;
        if (geometryType == "triangleSubGeometry") {
            numVertices = (this._segmentsH + 1) * (this._segmentsW + 1);
            var triangleGeometry = target;
            if (numVertices == triangleGeometry.numVertices && triangleGeometry.uvs != null) {
                uvs = triangleGeometry.uvs;
            }
            else {
                uvs = new Array(numVertices * 2);
            }
            var index = 0;
            for (j = 0; j <= this._segmentsH; ++j) {
                for (i = 0; i <= this._segmentsW; ++i) {
                    uvs[index++] = (i / this._segmentsW) * triangleGeometry.scaleU;
                    uvs[index++] = (j / this._segmentsH) * triangleGeometry.scaleV;
                }
            }
            triangleGeometry.updateUVs(uvs);
        }
        else if (geometryType == "lineSubGeometry") {
        }
    };
    return PrimitiveSpherePrefab;
})(PrimitivePrefabBase);
module.exports = PrimitiveSpherePrefab;


},{"awayjs-display/lib/prefabs/PrimitivePrefabBase":"awayjs-display/lib/prefabs/PrimitivePrefabBase"}],"awayjs-display/lib/prefabs/PrimitiveTorusPrefab":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var PrimitivePrefabBase = require("awayjs-display/lib/prefabs/PrimitivePrefabBase");
/**
 * A UV Cylinder primitive mesh.
 */
var PrimitiveTorusPrefab = (function (_super) {
    __extends(PrimitiveTorusPrefab, _super);
    /**
     * Creates a new <code>Torus</code> object.
     * @param radius The radius of the torus.
     * @param tuebRadius The radius of the inner tube of the torus.
     * @param segmentsR Defines the number of horizontal segments that make up the torus.
     * @param segmentsT Defines the number of vertical segments that make up the torus.
     * @param yUp Defines whether the torus poles should lay on the Y-axis (true) or on the Z-axis (false).
     */
    function PrimitiveTorusPrefab(radius, tubeRadius, segmentsR, segmentsT, yUp) {
        if (radius === void 0) { radius = 50; }
        if (tubeRadius === void 0) { tubeRadius = 50; }
        if (segmentsR === void 0) { segmentsR = 16; }
        if (segmentsT === void 0) { segmentsT = 8; }
        if (yUp === void 0) { yUp = true; }
        _super.call(this);
        this._numVertices = 0;
        this._radius = radius;
        this._tubeRadius = tubeRadius;
        this._segmentsR = segmentsR;
        this._segmentsT = segmentsT;
        this._yUp = yUp;
    }
    Object.defineProperty(PrimitiveTorusPrefab.prototype, "radius", {
        /**
         * The radius of the torus.
         */
        get: function () {
            return this._radius;
        },
        set: function (value) {
            this._radius = value;
            this._pInvalidateGeometry();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitiveTorusPrefab.prototype, "tubeRadius", {
        /**
         * The radius of the inner tube of the torus.
         */
        get: function () {
            return this._tubeRadius;
        },
        set: function (value) {
            this._tubeRadius = value;
            this._pInvalidateGeometry();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitiveTorusPrefab.prototype, "segmentsR", {
        /**
         * Defines the number of horizontal segments that make up the torus. Defaults to 16.
         */
        get: function () {
            return this._segmentsR;
        },
        set: function (value) {
            this._segmentsR = value;
            this._pInvalidateGeometry();
            this._pInvalidateUVs();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitiveTorusPrefab.prototype, "segmentsT", {
        /**
         * Defines the number of vertical segments that make up the torus. Defaults to 8.
         */
        get: function () {
            return this._segmentsT;
        },
        set: function (value) {
            this._segmentsT = value;
            this._pInvalidateGeometry();
            this._pInvalidateUVs();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitiveTorusPrefab.prototype, "yUp", {
        /**
         * Defines whether the torus poles should lay on the Y-axis (true) or on the Z-axis (false).
         */
        get: function () {
            return this._yUp;
        },
        set: function (value) {
            this._yUp = value;
            this._pInvalidateGeometry();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @inheritDoc
     */
    PrimitiveTorusPrefab.prototype._pBuildGeometry = function (target, geometryType) {
        var indices /*uint*/;
        var positions;
        var normals;
        var tangents;
        var i, j;
        var x, y, z, nx, ny, nz, revolutionAngleR, revolutionAngleT;
        var vidx;
        var fidx;
        var numIndices = 0;
        if (geometryType == "triangleSubGeometry") {
            var triangleGeometry = target;
            // evaluate target number of vertices, triangles and indices
            this._numVertices = (this._segmentsT + 1) * (this._segmentsR + 1); // segmentsT + 1 because of closure, segmentsR + 1 because of closure
            numIndices = this._segmentsT * this._segmentsR * 6; // each level has segmentR quads, each of 2 triangles
            // need to initialize raw arrays or can be reused?
            if (this._numVertices == triangleGeometry.numVertices) {
                indices = triangleGeometry.indices;
                positions = triangleGeometry.positions;
                normals = triangleGeometry.vertexNormals;
                tangents = triangleGeometry.vertexTangents;
            }
            else {
                indices = new Array(numIndices);
                positions = new Array(this._numVertices * 3);
                normals = new Array(this._numVertices * 3);
                tangents = new Array(this._numVertices * 3);
                this._pInvalidateUVs();
            }
            vidx = 0;
            fidx = 0;
            // evaluate revolution steps
            var revolutionAngleDeltaR = 2 * Math.PI / this._segmentsR;
            var revolutionAngleDeltaT = 2 * Math.PI / this._segmentsT;
            var comp1, comp2;
            var t1, t2, n1, n2;
            var startIndex = 0;
            var nextVertexIndex = 0;
            // surface
            var a, b, c, d, length;
            for (j = 0; j <= this._segmentsT; ++j) {
                startIndex = nextVertexIndex * 3;
                for (i = 0; i <= this._segmentsR; ++i) {
                    // revolution vertex
                    revolutionAngleR = i * revolutionAngleDeltaR;
                    revolutionAngleT = j * revolutionAngleDeltaT;
                    length = Math.cos(revolutionAngleT);
                    nx = length * Math.cos(revolutionAngleR);
                    ny = length * Math.sin(revolutionAngleR);
                    nz = Math.sin(revolutionAngleT);
                    x = this._radius * Math.cos(revolutionAngleR) + this._tubeRadius * nx;
                    y = this._radius * Math.sin(revolutionAngleR) + this._tubeRadius * ny;
                    z = (j == this._segmentsT) ? 0 : this._tubeRadius * nz;
                    if (this._yUp) {
                        n1 = -nz;
                        n2 = ny;
                        t1 = 0;
                        t2 = (length ? nx / length : x / this._radius);
                        comp1 = -z;
                        comp2 = y;
                    }
                    else {
                        n1 = ny;
                        n2 = nz;
                        t1 = (length ? nx / length : x / this._radius);
                        t2 = 0;
                        comp1 = y;
                        comp2 = z;
                    }
                    if (i == this._segmentsR) {
                        positions[vidx] = x;
                        positions[vidx + 1] = positions[startIndex + 1];
                        positions[vidx + 2] = positions[startIndex + 2];
                    }
                    else {
                        positions[vidx] = x;
                        positions[vidx + 1] = comp1;
                        positions[vidx + 2] = comp2;
                    }
                    normals[vidx] = nx;
                    normals[vidx + 1] = n1;
                    normals[vidx + 2] = n2;
                    tangents[vidx] = -(length ? ny / length : y / this._radius);
                    tangents[vidx + 1] = t1;
                    tangents[vidx + 2] = t2;
                    vidx += 3;
                    // close triangle
                    if (i > 0 && j > 0) {
                        a = nextVertexIndex; // current
                        b = nextVertexIndex - 1; // previous
                        c = b - this._segmentsR - 1; // previous of last level
                        d = a - this._segmentsR - 1; // current of last level
                        indices[fidx++] = a;
                        indices[fidx++] = b;
                        indices[fidx++] = c;
                        indices[fidx++] = a;
                        indices[fidx++] = c;
                        indices[fidx++] = d;
                    }
                    nextVertexIndex++;
                }
            }
            // build real data from raw data
            triangleGeometry.updateIndices(indices);
            triangleGeometry.updatePositions(positions);
            triangleGeometry.updateVertexNormals(normals);
            triangleGeometry.updateVertexTangents(tangents);
        }
        else if (geometryType == "lineSubGeometry") {
        }
    };
    /**
     * @inheritDoc
     */
    PrimitiveTorusPrefab.prototype._pBuildUVs = function (target, geometryType) {
        var i, j;
        var uvs;
        if (geometryType == "triangleSubGeometry") {
            var triangleGeometry = target;
            // need to initialize raw array or can be reused?
            if (triangleGeometry.uvs && this._numVertices == triangleGeometry.numVertices) {
                uvs = triangleGeometry.uvs;
            }
            else {
                uvs = new Array(this._numVertices * 2);
            }
            // current uv component index
            var index = 0;
            for (j = 0; j <= this._segmentsT; ++j) {
                for (i = 0; i <= this._segmentsR; ++i) {
                    // revolution vertex
                    uvs[index++] = (i / this._segmentsR) * triangleGeometry.scaleU;
                    uvs[index++] = (j / this._segmentsT) * triangleGeometry.scaleV;
                }
            }
            // build real data from raw data
            triangleGeometry.updateUVs(uvs);
        }
        else if (geometryType == "lineSubGeometry") {
        }
    };
    return PrimitiveTorusPrefab;
})(PrimitivePrefabBase);
module.exports = PrimitiveTorusPrefab;


},{"awayjs-display/lib/prefabs/PrimitivePrefabBase":"awayjs-display/lib/prefabs/PrimitivePrefabBase"}],"awayjs-display/lib/render/CSSDefaultRenderer":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Matrix3D = require("awayjs-core/lib/geom/Matrix3D");
var CoordinateSystem = require("awayjs-core/lib/projections/CoordinateSystem");
var CSSRendererBase = require("awayjs-display/lib/render/CSSRendererBase");
var CSSEntityCollector = require("awayjs-display/lib/traverse/CSSEntityCollector");
/**
 * The DefaultRenderer class provides the default rendering method. It renders the scene graph objects using the
 * materials assigned to them.
 *
 * @class away.render.DefaultRenderer
 */
var CSSDefaultRenderer = (function (_super) {
    __extends(CSSDefaultRenderer, _super);
    /**
     * Creates a new CSSDefaultRenderer object.
     */
    function CSSDefaultRenderer() {
        _super.call(this);
        this._contextMatrix = new Matrix3D();
        this._skyboxProjection = new Matrix3D();
        this._transform = new Matrix3D();
        //create container for the renderer
        this._container = document.createElement("div");
        this._container.style.overflow = "hidden";
        this._container.style.position = "absolute";
        //add container to body
        document.body.appendChild(this._container);
        //create conxtext for the renderer
        this._context = document.createElement("div");
        this._contextStyle = this._context.style;
        this._contextStyle.position = "absolute";
        this._contextStyle.transformStyle = this._contextStyle["-webkit-transform-style"] = this._contextStyle["-moz-transform-style"] = this._contextStyle["-o-transform-style"] = this._contextStyle["-ms-transform-style"] = "preserve-3d";
        this._contextStyle.transformOrigin = this._contextStyle["-webkit-transform-origin"] = this._contextStyle["-moz-transform-origin"] = this._contextStyle["-o-transform-origin"] = this._contextStyle["-ms-transform-origin"] = "0% 0%";
        //add context to container
        this._container.appendChild(this._context);
    }
    /**
     *
     * @param entityCollector
     */
    CSSDefaultRenderer.prototype.render = function (entityCollector) {
        _super.prototype.render.call(this, entityCollector);
        if (this._pBackBufferInvalid)
            this.pUpdateBackBuffer();
        this._iRender(entityCollector);
        this._pBackBufferInvalid = false;
    };
    /**
     * @inheritDoc
     */
    CSSDefaultRenderer.prototype.pDraw = function (entityCollector) {
        //			if (entityCollector.skyBox) {
        //				if (this._activeMaterial)
        //					this._activeMaterial.iDeactivate(this._pStageGL);
        //
        //				this._activeMaterial = null;
        //
        //				this._pContext.setDepthTest(false, away.gl.ContextGLCompareMode.ALWAYS);
        //				this.drawSkybox(entityCollector);
        //
        //			}
        //
        //			var which:number = target? DefaultRenderer.SCREEN_PASSES : DefaultRenderer.ALL_PASSES;
        var sheet = document.styleSheets[document.styleSheets.length - 1];
        for (var i = 0; i < sheet.cssRules.length; i++) {
            var style = sheet.cssRules[i].style;
            style.transform = style["-webkit-transform"] = style["-moz-transform"] = style["-o-transform"] = style["-ms-transform"] = (entityCollector.camera.projection.coordinateSystem == CoordinateSystem.RIGHT_HANDED) ? "" : "scale3d(1, -1, 1) translateY(-" + style.height + ")";
        }
        this.drawRenderables(this._renderableHead, entityCollector);
        //			if (this._activeMaterial)
        //				this._activeMaterial.iDeactivate(this._pStageGL);
        this._activeMaterial = null;
    };
    /**
     * Updates the backbuffer properties.
     */
    CSSDefaultRenderer.prototype.pUpdateBackBuffer = function () {
        this._container.style.width = this._width + "px";
        this._container.style.height = this._height + "px";
        this._container.style.clip = "rect(0px, " + this._width + "px, " + this._height + "px, 0px)";
        //update context matrix
        this._contextMatrix.rawData[0] = this._width / 2;
        this._contextMatrix.rawData[5] = -this._height / 2;
        this._contextMatrix.rawData[10] = -1; //fix for innaccurate z-sort
        this._contextMatrix.rawData[12] = this._width / 2;
        this._contextMatrix.rawData[13] = this._height / 2;
        //update context tranform
        this._contextStyle.transform = this._contextStyle["-webkit-transform"] = this._contextStyle["-moz-transform"] = this._contextStyle["-o-transform"] = this._contextStyle["-ms-transform"] = this._contextMatrix.toString();
        this._pBackBufferInvalid = false;
    };
    /**
     * Draw the skybox if present.
     * @param entityCollector The EntityCollector containing all potentially visible information.
     */
    CSSDefaultRenderer.prototype.drawSkybox = function (entityCollector) {
        //TODO
    };
    /**
     * Draw a list of renderables.
     * @param renderables The renderables to draw.
     * @param entityCollector The EntityCollector containing all potentially visible information.
     */
    CSSDefaultRenderer.prototype.drawRenderables = function (item, entityCollector) {
        var viewProjection = entityCollector.camera.viewProjection.clone();
        while (item) {
            //this._activeMaterial = <CSSMaterialBase> item.materialOwner.material;
            //serialise transform and apply to html element
            this._transform.copyRawDataFrom(item.renderSceneTransform.rawData);
            this._transform.append(viewProjection);
            var style = item.htmlElement.style;
            style.transform = style["-webkit-transform"] = style["-moz-transform"] = style["-o-transform"] = style["-ms-transform"] = this._transform.toString();
            style.transformStyle = style["-webkit-transform-style"] = style["-moz-transform-style"] = style["-o-transform-style"] = style["-ms-transform-style"] = "preserve-3d";
            //check if child requires adding to the view
            if (!this._context.contains(item.htmlElement))
                this._context.appendChild(item.htmlElement);
            item = item.next;
        }
        //			var numPasses:number;
        //			var j:number;
        //			var camera:away.entities.Camera = entityCollector.camera;
        //			var item2:away.render.CSSRenderableBase;
        //
        //			while (item) {
        //				this._activeMaterial = item.material;
        //
        //				this._activeMaterial.iUpdateMaterial(this._pContext);
        //
        //				numPasses = this._activeMaterial._iNumPasses;
        //
        //				j = 0;
        //
        //				do {
        //					item2 = item;
        //
        //					var rttMask:number = this._activeMaterial.iPassRendersToTexture(j)? 1 : 2;
        //
        //					if ((rttMask & which) != 0) {
        //						this._activeMaterial.iActivatePass(j, this._pStageGL, camera);
        //
        //						do {
        //							this._activeMaterial.iRenderPass(j, item2, this._pStageGL, entityCollector);
        //
        //							item2 = item2.next;
        //
        //						} while (item2 && item2.material == this._activeMaterial);
        //
        //						this._activeMaterial.iDeactivatePass(j, this._pStageGL);
        //
        //					} else {
        //						do {
        //							item2 = item2.next;
        //
        //						} while (item2 && item2.renderable.material == this._activeMaterial);
        //					}
        //				} while (++j < numPasses);
        //
        //				item = item2;
        //			}
    };
    CSSDefaultRenderer.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        //TODO
    };
    CSSDefaultRenderer.prototype._iCreateEntityCollector = function () {
        return new CSSEntityCollector();
    };
    return CSSDefaultRenderer;
})(CSSRendererBase);
module.exports = CSSDefaultRenderer;


},{"awayjs-core/lib/geom/Matrix3D":undefined,"awayjs-core/lib/projections/CoordinateSystem":undefined,"awayjs-display/lib/render/CSSRendererBase":"awayjs-display/lib/render/CSSRendererBase","awayjs-display/lib/traverse/CSSEntityCollector":"awayjs-display/lib/traverse/CSSEntityCollector"}],"awayjs-display/lib/render/CSSRendererBase":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Point = require("awayjs-core/lib/geom/Point");
var Rectangle = require("awayjs-core/lib/geom/Rectangle");
var AbstractMethodError = require("awayjs-core/lib/errors/AbstractMethodError");
var EventDispatcher = require("awayjs-core/lib/events/EventDispatcher");
var RendererEvent = require("awayjs-display/lib/events/RendererEvent");
/**
 * RendererBase forms an abstract base class for classes that are used in the rendering pipeline to render the
 * contents of a partition
 *
 * @class away.render.RendererBase
 */
var CSSRendererBase = (function (_super) {
    __extends(CSSRendererBase, _super);
    /**
     * Creates a new RendererBase object.
     */
    function CSSRendererBase(renderToTexture, forceSoftware, profile) {
        if (renderToTexture === void 0) { renderToTexture = false; }
        if (forceSoftware === void 0) { forceSoftware = false; }
        if (profile === void 0) { profile = "baseline"; }
        _super.call(this);
        this._backgroundR = 0;
        this._backgroundG = 0;
        this._backgroundB = 0;
        this._backgroundAlpha = 1;
        this._shareContext = false;
        this._pBackBufferInvalid = true;
        this._depthTextureInvalid = true;
        this._viewPort = new Rectangle();
        this._scissorRect = new Rectangle();
        this._localPos = new Point();
        this._globalPos = new Point();
        //this._billboardRenderablePool = RenderablePool.getPool(CSSBillboardRenderable);
        //this._lineSegmentRenderablePool = RenderablePool.getPool(CSSLineSegmentRenderable);
        this._viewPort = new Rectangle();
        if (this._width == 0)
            this.width = window.innerWidth;
        if (this._height == 0)
            this.height = window.innerHeight;
    }
    Object.defineProperty(CSSRendererBase.prototype, "viewPort", {
        /**
         * A viewPort rectangle equivalent of the StageGL size and position.
         */
        get: function () {
            return this._viewPort;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CSSRendererBase.prototype, "scissorRect", {
        /**
         * A scissor rectangle equivalent of the view size and position.
         */
        get: function () {
            return this._scissorRect;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CSSRendererBase.prototype, "x", {
        /**
         *
         */
        get: function () {
            return this._localPos.x;
        },
        set: function (value) {
            if (this.x == value)
                return;
            this.updateGlobalPos();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CSSRendererBase.prototype, "y", {
        /**
         *
         */
        get: function () {
            return this._localPos.y;
        },
        set: function (value) {
            if (this.y == value)
                return;
            this._globalPos.y = this._localPos.y = value;
            this.updateGlobalPos();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CSSRendererBase.prototype, "width", {
        /**
         *
         */
        get: function () {
            return this._width;
        },
        set: function (value) {
            if (this._width == value)
                return;
            this._width = value;
            this._scissorRect.width = value;
            this._viewPort.width = value;
            this._pBackBufferInvalid = true;
            this._depthTextureInvalid = true;
            this.notifyViewportUpdate();
            this.notifyScissorUpdate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CSSRendererBase.prototype, "height", {
        /**
         *
         */
        get: function () {
            return this._height;
        },
        set: function (value) {
            if (this._height == value)
                return;
            this._height = value;
            this._scissorRect.height = value;
            this._viewPort.height = value;
            this._pBackBufferInvalid = true;
            this._depthTextureInvalid = true;
            this.notifyViewportUpdate();
            this.notifyScissorUpdate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CSSRendererBase.prototype, "_iBackgroundR", {
        /**
         * The background color's red component, used when clearing.
         *
         * @private
         */
        get: function () {
            return this._backgroundR;
        },
        set: function (value) {
            if (this._backgroundR == value)
                return;
            this._backgroundR = value;
            this._pBackBufferInvalid = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CSSRendererBase.prototype, "_iBackgroundG", {
        /**
         * The background color's green component, used when clearing.
         *
         * @private
         */
        get: function () {
            return this._backgroundG;
        },
        set: function (value) {
            if (this._backgroundG == value)
                return;
            this._backgroundG = value;
            this._pBackBufferInvalid = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CSSRendererBase.prototype, "_iBackgroundB", {
        /**
         * The background color's blue component, used when clearing.
         *
         * @private
         */
        get: function () {
            return this._backgroundB;
        },
        set: function (value) {
            if (this._backgroundB == value)
                return;
            this._backgroundB = value;
            this._pBackBufferInvalid = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CSSRendererBase.prototype, "shareContext", {
        get: function () {
            return this._shareContext;
        },
        set: function (value) {
            if (this._shareContext == value)
                return;
            this._shareContext = value;
            this.updateGlobalPos();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Disposes the resources used by the RendererBase.
     */
    CSSRendererBase.prototype.dispose = function () {
        /*
         if (_backgroundImageRenderer) {
         _backgroundImageRenderer.dispose();
         _backgroundImageRenderer = null;
         }
         */
    };
    CSSRendererBase.prototype.render = function (entityCollector) {
        this._viewportDirty = false;
        this._scissorDirty = false;
    };
    /**
     * Renders the potentially visible geometry to the back buffer or texture.
     * @param entityCollector The EntityCollector object containing the potentially visible geometry.
     * @param scissorRect
     */
    CSSRendererBase.prototype._iRender = function (entityCollector, target, scissorRect, surfaceSelector) {
        if (target === void 0) { target = null; }
        if (scissorRect === void 0) { scissorRect = null; }
        if (surfaceSelector === void 0) { surfaceSelector = 0; }
        if (!entityCollector.entityHead)
            return;
        this.pExecuteRender(entityCollector, scissorRect);
    };
    CSSRendererBase.prototype._iRenderCascades = function (entityCollector, target, numCascades, scissorRects, cameras) {
    };
    CSSRendererBase.prototype.pCollectRenderables = function (entityCollector) {
        ////reset head values
        //this._renderableHead = null;
        //
        ////grab entity head
        //var item:EntityListItem = entityCollector.entityHead;
        //
        ////set temp values for entry point and camera forward vector
        //this._pCamera = entityCollector.camera;
        //this._iEntryPoint = this._pCamera.scenePosition;
        //this._pCameraForward = this._pCamera.transform.forwardVector;
        //
        ////iterate through all entities
        //while (item) {
        //	//item.entity._iCollectRenderables(this);
        //	item = item.next;
        //}
    };
    /**
     * Renders the potentially visible geometry to the back buffer or texture. Only executed if everything is set up.
     * @param entityCollector The EntityCollector object containing the potentially visible geometry.
     * @param scissorRect
     */
    CSSRendererBase.prototype.pExecuteRender = function (entityCollector, scissorRect) {
        if (scissorRect === void 0) { scissorRect = null; }
        this.pCollectRenderables(entityCollector);
        this.pDraw(entityCollector);
    };
    /**
     * Performs the actual drawing of dom objects to the target.
     *
     * @param entityCollector The EntityCollector object containing the potentially visible dom objects.
     */
    CSSRendererBase.prototype.pDraw = function (entityCollector) {
        throw new AbstractMethodError();
    };
    Object.defineProperty(CSSRendererBase.prototype, "_iBackgroundAlpha", {
        get: function () {
            return this._backgroundAlpha;
        },
        set: function (value) {
            if (this._backgroundAlpha == value)
                return;
            this._backgroundAlpha = value;
            this._pBackBufferInvalid = true;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     * @param billboard
     */
    CSSRendererBase.prototype.applyBillboard = function (billboard) {
        //this._applyRenderable(<CSSRenderableBase> this._billboardRenderablePool.getItem(billboard));
    };
    /**
     *
     * @param lineSubMesh
     */
    CSSRendererBase.prototype.applyLineSubMesh = function (lineSubMesh) {
        //this._applyRenderable(<CSSRenderableBase> this._billboardRenderablePool.getItem(lineSegment));
    };
    /**
     *
     * @param skybox
     */
    CSSRendererBase.prototype.applySkybox = function (skybox) {
    };
    /**
     *
     * @param triangleSubMesh
     */
    CSSRendererBase.prototype.applyTriangleSubMesh = function (triangleSubMesh) {
    };
    /**
     *
     * @param renderable
     * @private
     */
    CSSRendererBase.prototype._applyRenderable = function (renderable) {
        var material; // = <CSSMaterialBase> renderable.renderableOwner.material;
        var entity = renderable.sourceEntity;
        var position = entity.scenePosition;
        if (material) {
            //set ids for faster referencing
            renderable.materialId = material._iMaterialId;
            //				renderable.renderOrderId = material._iRenderOrderId;
            renderable.cascaded = false;
            // project onto camera's z-axis
            position = this._iEntryPoint.subtract(position);
            renderable.zIndex = entity.zOffset - position.dotProduct(this._pCameraForward);
            //store reference to scene transform
            renderable.renderSceneTransform = renderable.sourceEntity.getRenderSceneTransform(this._pCamera);
            //store reference to next item in list
            renderable.next = this._renderableHead;
            this._renderableHead = renderable;
        }
    };
    /**
     * @private
     */
    CSSRendererBase.prototype.notifyScissorUpdate = function () {
        if (this._scissorDirty)
            return;
        this._scissorDirty = true;
        if (!this._scissorUpdated)
            this._scissorUpdated = new RendererEvent(RendererEvent.SCISSOR_UPDATED);
        this.dispatchEvent(this._scissorUpdated);
    };
    /**
     * @private
     */
    CSSRendererBase.prototype.notifyViewportUpdate = function () {
        if (this._viewportDirty)
            return;
        this._viewportDirty = true;
        if (!this._viewPortUpdated)
            this._viewPortUpdated = new RendererEvent(RendererEvent.VIEWPORT_UPDATED);
        this.dispatchEvent(this._viewPortUpdated);
    };
    /**
     *
     */
    CSSRendererBase.prototype.updateGlobalPos = function () {
        this._viewPort.x = this._globalPos.x;
        this._viewPort.y = this._globalPos.y;
        this.notifyViewportUpdate();
        this.notifyScissorUpdate();
    };
    CSSRendererBase.prototype._iCreateEntityCollector = function () {
        throw new AbstractMethodError();
    };
    return CSSRendererBase;
})(EventDispatcher);
module.exports = CSSRendererBase;


},{"awayjs-core/lib/errors/AbstractMethodError":undefined,"awayjs-core/lib/events/EventDispatcher":undefined,"awayjs-core/lib/geom/Point":undefined,"awayjs-core/lib/geom/Rectangle":undefined,"awayjs-display/lib/events/RendererEvent":"awayjs-display/lib/events/RendererEvent"}],"awayjs-display/lib/render/IRenderer":[function(require,module,exports){



},{}],"awayjs-display/lib/sort/IEntitySorter":[function(require,module,exports){



},{}],"awayjs-display/lib/sort/RenderableMergeSort":[function(require,module,exports){
/**
 * @class away.sort.RenderableMergeSort
 */
var RenderableMergeSort = (function () {
    function RenderableMergeSort() {
    }
    RenderableMergeSort.prototype.sortBlendedRenderables = function (head) {
        var headB;
        var fast;
        var slow;
        if (!head || !head.next) {
            return head;
        }
        // split in two sublists
        slow = head;
        fast = head.next;
        while (fast) {
            fast = fast.next;
            if (fast) {
                slow = slow.next;
                fast = fast.next;
            }
        }
        headB = slow.next;
        slow.next = null;
        // recurse
        head = this.sortBlendedRenderables(head);
        headB = this.sortBlendedRenderables(headB);
        // merge sublists while respecting order
        var result;
        var curr;
        var l;
        if (!head)
            return headB;
        if (!headB)
            return head;
        while (head && headB) {
            if (head.zIndex < headB.zIndex) {
                l = head;
                head = head.next;
            }
            else {
                l = headB;
                headB = headB.next;
            }
            if (!result)
                result = l;
            else
                curr.next = l;
            curr = l;
        }
        if (head)
            curr.next = head;
        else if (headB)
            curr.next = headB;
        return result;
    };
    RenderableMergeSort.prototype.sortOpaqueRenderables = function (head) {
        var headB;
        var fast, slow;
        if (!head || !head.next) {
            return head;
        }
        // split in two sublists
        slow = head;
        fast = head.next;
        while (fast) {
            fast = fast.next;
            if (fast) {
                slow = slow.next;
                fast = fast.next;
            }
        }
        headB = slow.next;
        slow.next = null;
        // recurse
        head = this.sortOpaqueRenderables(head);
        headB = this.sortOpaqueRenderables(headB);
        // merge sublists while respecting order
        var result;
        var curr;
        var l;
        var cmp = 0;
        if (!head)
            return headB;
        if (!headB)
            return head;
        while (head && headB && head != null && headB != null) {
            // first sort per render order id (reduces program3D switches),
            // then on render object id (reduces setting props),
            // then on zIndex (reduces overdraw)
            var aid = head.renderOrderId;
            var bid = headB.renderOrderId;
            if (aid == bid) {
                var ma = head.renderObjectId;
                var mb = headB.renderObjectId;
                if (ma == mb) {
                    if (head.zIndex < headB.zIndex)
                        cmp = 1;
                    else
                        cmp = -1;
                }
                else if (ma > mb) {
                    cmp = 1;
                }
                else {
                    cmp = -1;
                }
            }
            else if (aid > bid) {
                cmp = 1;
            }
            else {
                cmp = -1;
            }
            if (cmp < 0) {
                l = head;
                head = head.next;
            }
            else {
                l = headB;
                headB = headB.next;
            }
            if (!result) {
                result = l;
                curr = l;
            }
            else {
                curr.next = l;
                curr = l;
            }
        }
        if (head)
            curr.next = head;
        else if (headB)
            curr.next = headB;
        return result;
    };
    return RenderableMergeSort;
})();
module.exports = RenderableMergeSort;


},{}],"awayjs-display/lib/sort/RenderableNullSort":[function(require,module,exports){
/**
 * @class away.sort.NullSort
 */
var RenderableNullSort = (function () {
    function RenderableNullSort() {
    }
    RenderableNullSort.prototype.sortBlendedRenderables = function (head) {
        return head;
    };
    RenderableNullSort.prototype.sortOpaqueRenderables = function (head) {
        return head;
    };
    return RenderableNullSort;
})();
module.exports = RenderableNullSort;


},{}],"awayjs-display/lib/text/AntiAliasType":[function(require,module,exports){
/**
 * The AntiAliasType class provides values for anti-aliasing in the
 * away.text.TextField class.
 */
var AntiAliasType = (function () {
    function AntiAliasType() {
    }
    /**
     * Sets anti-aliasing to advanced anti-aliasing. Advanced anti-aliasing
     * allows font faces to be rendered at very high quality at small sizes. It
     * is best used with applications that have a lot of small text. Advanced
     * anti-aliasing is not recommended for very large fonts(larger than 48
     * points). This constant is used for the <code>antiAliasType</code> property
     * in the TextField class. Use the syntax
     * <code>AntiAliasType.ADVANCED</code>.
     */
    AntiAliasType.ADVANCED = "advanced";
    /**
     * Sets anti-aliasing to the anti-aliasing that is used in Flash Player 7 and
     * earlier. This setting is recommended for applications that do not have a
     * lot of text. This constant is used for the <code>antiAliasType</code>
     * property in the TextField class. Use the syntax
     * <code>AntiAliasType.NORMAL</code>.
     */
    AntiAliasType.NORMAL = "normal";
    return AntiAliasType;
})();
module.exports = AntiAliasType;


},{}],"awayjs-display/lib/text/Font":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AssetBase = require("awayjs-core/lib/library/AssetBase");
var FontTable = require("awayjs-display/lib/text/TesselatedFontTable");
/**
 * SubMeshBase wraps a TriangleSubGeometry as a scene graph instantiation. A SubMeshBase is owned by a Mesh object.
 *
 *
 * @see away.base.TriangleSubGeometry
 * @see away.entities.Mesh
 *
 * @class away.base.SubMeshBase
 */
var Font = (function (_super) {
    __extends(Font, _super);
    //TODO test shader picking
    //		public get shaderPickingDetails():boolean
    //		{
    //
    //			return this.sourceEntity.shaderPickingDetails;
    //		}
    /**
     * Creates a new TesselatedFont object
     */
    function Font() {
        _super.call(this);
        this._font_styles = new Array();
    }
    Object.defineProperty(Font.prototype, "assetType", {
        /**
         *
         */
        get: function () {
            return Font.assetType;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     */
    Font.prototype.dispose = function () {
    };
    /**
     *Get a font-table for a specific name, or create one if it does not exists.
     */
    Font.prototype.get_font_table = function (style_name) {
        var len = this._font_styles.length;
        for (var i = 0; i < len; ++i) {
            if (this._font_styles[i].name == style_name)
                return this._font_styles[i];
        }
        var font_style = new FontTable();
        font_style.name = style_name;
        this._font_styles.push(font_style);
        return font_style;
    };
    Font.assetType = "[asset Font]";
    return Font;
})(AssetBase);
module.exports = Font;


},{"awayjs-core/lib/library/AssetBase":undefined,"awayjs-display/lib/text/TesselatedFontTable":"awayjs-display/lib/text/TesselatedFontTable"}],"awayjs-display/lib/text/GridFitType":[function(require,module,exports){
/**
 * The GridFitType class defines values for grid fitting in the TextField class.
 */
var GridFitType = (function () {
    function GridFitType() {
    }
    /**
     * Doesn't set grid fitting. Horizontal and vertical lines in the glyphs are
     * not forced to the pixel grid. This constant is used in setting the
     * <code>gridFitType</code> property of the TextField class. This is often a
     * good setting for animation or for large font sizes. Use the syntax
     * <code>GridFitType.NONE</code>.
     */
    GridFitType.NONE = "none";
    /**
     * Fits strong horizontal and vertical lines to the pixel grid. This constant
     * is used in setting the <code>gridFitType</code> property of the TextField
     * class. This setting only works for left-justified text fields and acts
     * like the <code>GridFitType.SUBPIXEL</code> constant in static text. This
     * setting generally provides the best readability for left-aligned text. Use
     * the syntax <code>GridFitType.PIXEL</code>.
     */
    GridFitType.PIXEL = "pixel";
    /**
     * Fits strong horizontal and vertical lines to the sub-pixel grid on LCD
     * monitors. (Red, green, and blue are actual pixels on an LCD screen.) This
     * is often a good setting for right-aligned or center-aligned dynamic text,
     * and it is sometimes a useful tradeoff for animation vs. text quality. This
     * constant is used in setting the <code>gridFitType</code> property of the
     * TextField class. Use the syntax <code>GridFitType.SUBPIXEL</code>.
     */
    GridFitType.SUBPIXEL = "subpixel";
    return GridFitType;
})();
module.exports = GridFitType;


},{}],"awayjs-display/lib/text/TesselatedFontChar":[function(require,module,exports){
/**
 * The TextFormat class represents character formatting information. Use the
 * TextFormat class to create specific text formatting for text fields. You
 * can apply text formatting to both static and dynamic text fields. The
 * properties of the TextFormat class apply to device and embedded fonts.
 * However, for embedded fonts, bold and italic text actually require specific
 * fonts. If you want to display bold or italic text with an embedded font,
 * you need to embed the bold and italic variations of that font.
 *
 * <p> You must use the constructor <code>new TextFormat()</code> to create a
 * TextFormat object before setting its properties. When you apply a
 * TextFormat object to a text field using the
 * <code>TextField.defaultTextFormat</code> property or the
 * <code>TextField.setTextFormat()</code> method, only its defined properties
 * are applied. Use the <code>TextField.defaultTextFormat</code> property to
 * apply formatting BEFORE you add text to the <code>TextField</code>, and the
 * <code>setTextFormat()</code> method to add formatting AFTER you add text to
 * the <code>TextField</code>. The TextFormat properties are <code>null</code>
 * by default because if you don't provide values for the properties, Flash
 * Player uses its own default formatting. The default formatting that Flash
 * Player uses for each property(if property's value is <code>null</code>) is
 * as follows:</p>
 *
 * <p>The default formatting for each property is also described in each
 * property description.</p>
 */
var TesselatedFontChar = (function () {
    function TesselatedFontChar(subgeom) {
        /**
         * the char_codes that this geom has kerning set for
         */
        this.kerningCharCodes = new Array();
        /**
         * the kerning values per char_code
         */
        this.kerningValues = new Array();
        this.char_width = 0;
        this.subgeom = subgeom;
        if (this.subgeom != null) {
            var positions2 = this.subgeom.positions;
            for (var v = 0; v < positions2.length / 3; v++) {
                if (positions2[v * 3] > this.char_width)
                    this.char_width = positions2[v * 3];
            }
        }
    }
    return TesselatedFontChar;
})();
module.exports = TesselatedFontChar;


},{}],"awayjs-display/lib/text/TesselatedFontTable":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AssetBase = require("awayjs-core/lib/library/AssetBase");
var TesselatedFontChar = require("awayjs-display/lib/text/TesselatedFontChar");
/**
 * SubMeshBase wraps a TriangleSubGeometry as a scene graph instantiation. A SubMeshBase is owned by a Mesh object.
 *
 *
 * @see away.base.TriangleSubGeometry
 * @see away.entities.Mesh
 *
 * @class away.base.SubMeshBase
 */
var TesselatedFontTable = (function (_super) {
    __extends(TesselatedFontTable, _super);
    //TODO test shader picking
    //		public get shaderPickingDetails():boolean
    //		{
    //
    //			return this.sourceEntity.shaderPickingDetails;
    //		}
    /**
     * Creates a new TesselatedFont object
     */
    function TesselatedFontTable() {
        _super.call(this);
        this._font_chars = new Array();
        this._font_chars_dic = new Object();
    }
    /**
     *
     */
    TesselatedFontTable.prototype.dispose = function () {
    };
    TesselatedFontTable.prototype.get_font_chars = function () {
        return this._font_chars;
    };
    TesselatedFontTable.prototype.get_font_em_size = function () {
        return this._font_em_size;
    };
    TesselatedFontTable.prototype.set_font_em_size = function (font_em_size) {
        this._font_em_size = font_em_size;
    };
    /**
     *
     */
    TesselatedFontTable.prototype.get_subgeo_for_char = function (char) {
        return this._font_chars_dic[char];
    };
    /**
     *
     */
    TesselatedFontTable.prototype.set_subgeo_for_char = function (char, subgeo) {
        var tesselated_font_char = new TesselatedFontChar(subgeo);
        subgeo.name = char;
        this._font_chars.push(tesselated_font_char);
        this._font_chars_dic[char] = tesselated_font_char;
    };
    return TesselatedFontTable;
})(AssetBase);
module.exports = TesselatedFontTable;


},{"awayjs-core/lib/library/AssetBase":undefined,"awayjs-display/lib/text/TesselatedFontChar":"awayjs-display/lib/text/TesselatedFontChar"}],"awayjs-display/lib/text/TextFieldAutoSize":[function(require,module,exports){
/**
 * The TextFieldAutoSize class is an enumeration of constant values used in
 * setting the <code>autoSize</code> property of the TextField class.
 */
var TextFieldAutoSize = (function () {
    function TextFieldAutoSize() {
    }
    /**
     * Specifies that the text is to be treated as center-justified text. Any
     * resizing of a single line of a text field is equally distributed to both
     * the right and left sides.
     */
    TextFieldAutoSize.CENTER = "center";
    /**
     * Specifies that the text is to be treated as left-justified text, meaning
     * that the left side of the text field remains fixed and any resizing of a
     * single line is on the right side.
     */
    TextFieldAutoSize.LEFT = "left";
    /**
     * Specifies that no resizing is to occur.
     */
    TextFieldAutoSize.NONE = "none";
    /**
     * Specifies that the text is to be treated as right-justified text, meaning
     * that the right side of the text field remains fixed and any resizing of a
     * single line is on the left side.
     */
    TextFieldAutoSize.RIGHT = "right";
    return TextFieldAutoSize;
})();
module.exports = TextFieldAutoSize;


},{}],"awayjs-display/lib/text/TextFieldType":[function(require,module,exports){
/**
 * The TextFieldType class is an enumeration of constant values used in setting the
 * <code>type</code> property of the TextField class.
 *
 * @see away.entities.TextField#type
 */
var TextFieldType = (function () {
    function TextFieldType() {
    }
    /**
     * Used to specify a <code>dynamic</code> TextField.
     */
    TextFieldType.DYNAMIC = "dynamic";
    /**
     * Used to specify an <code>input</code> TextField.
     */
    TextFieldType.INPUT = "input";
    return TextFieldType;
})();
module.exports = TextFieldType;


},{}],"awayjs-display/lib/text/TextFormatAlign":[function(require,module,exports){
/**
 * The TextFormatAlign class provides values for text alignment in the
 * TextFormat class.
 */
var TextFormatAlign = (function () {
    function TextFormatAlign() {
        /**
         * Constant; centers the text in the text field. Use the syntax
         * <code>TextFormatAlign.CENTER</code>.
         */
        this.CENTER = "center";
        /**
         * Constant; justifies text within the text field. Use the syntax
         * <code>TextFormatAlign.JUSTIFY</code>.
         */
        this.JUSTIFY = "justify";
        /**
         * Constant; aligns text to the left within the text field. Use the syntax
         * <code>TextFormatAlign.LEFT</code>.
         */
        this.LEFT = "left";
        /**
         * Constant; aligns text to the right within the text field. Use the syntax
         * <code>TextFormatAlign.RIGHT</code>.
         */
        this.RIGHT = "right";
    }
    return TextFormatAlign;
})();
module.exports = TextFormatAlign;


},{}],"awayjs-display/lib/text/TextFormat":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AssetBase = require("awayjs-core/lib/library/AssetBase");
/**
 * The TextFormat class represents character formatting information. Use the
 * TextFormat class to create specific text formatting for text fields. You
 * can apply text formatting to both static and dynamic text fields. The
 * properties of the TextFormat class apply to device and embedded fonts.
 * However, for embedded fonts, bold and italic text actually require specific
 * fonts. If you want to display bold or italic text with an embedded font,
 * you need to embed the bold and italic variations of that font.
 *
 * <p> You must use the constructor <code>new TextFormat()</code> to create a
 * TextFormat object before setting its properties. When you apply a
 * TextFormat object to a text field using the
 * <code>TextField.defaultTextFormat</code> property or the
 * <code>TextField.setTextFormat()</code> method, only its defined properties
 * are applied. Use the <code>TextField.defaultTextFormat</code> property to
 * apply formatting BEFORE you add text to the <code>TextField</code>, and the
 * <code>setTextFormat()</code> method to add formatting AFTER you add text to
 * the <code>TextField</code>. The TextFormat properties are <code>null</code>
 * by default because if you don't provide values for the properties, Flash
 * Player uses its own default formatting. The default formatting that Flash
 * Player uses for each property(if property's value is <code>null</code>) is
 * as follows:</p>
 *
 * <p>The default formatting for each property is also described in each
 * property description.</p>
 */
var TextFormat = (function (_super) {
    __extends(TextFormat, _super);
    /**
     * Creates a TextFormat object with the specified properties. You can then
     * change the properties of the TextFormat object to change the formatting of
     * text fields.
     *
     * <p>Any parameter may be set to <code>null</code> to indicate that it is
     * not defined. All of the parameters are optional; any omitted parameters
     * are treated as <code>null</code>.</p>
     *
     * @param font        The name of a font for text as a string.
     * @param size        An integer that indicates the size in pixels.
     * @param color       The color of text using this text format. A number
     *                    containing three 8-bit RGB components; for example,
     *                    0xFF0000 is red, and 0x00FF00 is green.
     * @param bold        A Boolean value that indicates whether the text is
     *                    boldface.
     * @param italic      A Boolean value that indicates whether the text is
     *                    italicized.
     * @param underline   A Boolean value that indicates whether the text is
     *                    underlined.
     * @param url         The URL to which the text in this text format
     *                    hyperlinks. If <code>url</code> is an empty string, the
     *                    text does not have a hyperlink.
     * @param target      The target window where the hyperlink is displayed. If
     *                    the target window is an empty string, the text is
     *                    displayed in the default target window
     *                    <code>_self</code>. If the <code>url</code> parameter
     *                    is set to an empty string or to the value
     *                    <code>null</code>, you can get or set this property,
     *                    but the property will have no effect.
     * @param align       The alignment of the paragraph, as a TextFormatAlign
     *                    value.
     * @param leftMargin  Indicates the left margin of the paragraph, in pixels.
     * @param rightMargin Indicates the right margin of the paragraph, in pixels.
     * @param indent      An integer that indicates the indentation from the left
     *                    margin to the first character in the paragraph.
     * @param leading     A number that indicates the amount of leading vertical
     *                    space between lines.
     */
    function TextFormat(font, size, color, bold, italic, underline, url, link_target, align, leftMargin, rightMargin, indent, leading) {
        if (font === void 0) { font = "Times New Roman"; }
        if (size === void 0) { size = 12; }
        if (color === void 0) { color = 0x000000; }
        if (bold === void 0) { bold = false; }
        if (italic === void 0) { italic = false; }
        if (underline === void 0) { underline = false; }
        if (url === void 0) { url = ""; }
        if (link_target === void 0) { link_target = ""; }
        if (align === void 0) { align = "left"; }
        if (leftMargin === void 0) { leftMargin = 0; }
        if (rightMargin === void 0) { rightMargin = 0; }
        if (indent === void 0) { indent = 0; }
        if (leading === void 0) { leading = 0; }
        _super.call(this);
        /**
         * Specifies custom tab stops as an array of non-negative integers. Each tab
         * stop is specified in pixels. If custom tab stops are not specified
         * (<code>null</code>), the default tab stop is 4(average character width).
         */
        //todo: not used with in tesselated-font-table yet
        this.tabStops = new Array();
        this.font_name = font;
        this.size = size;
        this.bold = bold;
        this.italic = italic;
        this.underline = underline;
        this.url = url;
        this.link_target = link_target;
        this.align = align;
        this.leftMargin = leftMargin;
        this.rightMargin = rightMargin;
        this.indent = indent;
        this.leading = leading;
    }
    Object.defineProperty(TextFormat.prototype, "assetType", {
        /**
         *
         */
        get: function () {
            return TextFormat.assetType;
        },
        enumerable: true,
        configurable: true
    });
    TextFormat.assetType = "[asset TextFormat]";
    return TextFormat;
})(AssetBase);
module.exports = TextFormat;


},{"awayjs-core/lib/library/AssetBase":undefined}],"awayjs-display/lib/text/TextInteractionMode":[function(require,module,exports){
/**
 * A class that defines the Interactive mode of a text field object.
 *
 * @see away.entities.TextField#textInteractionMode
 */
var TextInteractionMode = (function () {
    function TextInteractionMode() {
    }
    /**
     * The text field's default interaction mode is NORMAL and it varies across
     * platform. On Desktop, the normal mode implies that the text field is in
     * scrollable + selection mode. On Mobile platforms like Android, normal mode
     * implies that the text field can only be scrolled but the text can not be
     * selected.
     */
    TextInteractionMode.NORMAL = "normal";
    /**
     * On mobile platforms like Android, the text field starts in normal mode
     * (which implies scroll and non-selectable mode). The user can switch to
     * selection mode through the in-built context menu of the text field object.
     */
    TextInteractionMode.SELECTION = "selection";
    return TextInteractionMode;
})();
module.exports = TextInteractionMode;


},{}],"awayjs-display/lib/text/TextLineMetrics":[function(require,module,exports){
/**
 * The TextLineMetrics class contains information about the text position and
 * measurements of a line of text within a text field. All measurements are in
 * pixels. Objects of this class are returned by the
 * <code>away.entities.TextField.getLineMetrics()</code> method.
 */
var TextLineMetrics = (function () {
    /**
     * Creates a TextLineMetrics object. The TextLineMetrics object contains
     * information about the text metrics of a line of text in a text field.
     * Objects of this class are returned by the
     * away.entities.TextField.getLineMetrics() method.
     *
     * @param x           The left position of the first character in pixels.
     * @param width       The width of the text of the selected lines (not
     *                    necessarily the complete text) in pixels.
     * @param height      The height of the text of the selected lines (not
     *                    necessarily the complete text) in pixels.
     * @param ascent      The length from the baseline to the top of the line
     *                    height in pixels.
     * @param descent     The length from the baseline to the bottom depth of
     *                    the line in pixels.
     * @param leading     The measurement of the vertical distance between the
     *                    lines of text.
     */
    function TextLineMetrics(x, width, height, ascent, descent, leading) {
        if (x === void 0) { x = NaN; }
        if (width === void 0) { width = NaN; }
        if (height === void 0) { height = NaN; }
        if (ascent === void 0) { ascent = NaN; }
        if (descent === void 0) { descent = NaN; }
        if (leading === void 0) { leading = NaN; }
    }
    return TextLineMetrics;
})();
module.exports = TextLineMetrics;


},{}],"awayjs-display/lib/traverse/CSSEntityCollector":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CollectorBase = require("awayjs-display/lib/traverse/CollectorBase");
/**
 * @class away.traverse.CSSEntityCollector
 */
var CSSEntityCollector = (function (_super) {
    __extends(CSSEntityCollector, _super);
    function CSSEntityCollector() {
        _super.call(this);
    }
    return CSSEntityCollector;
})(CollectorBase);
module.exports = CSSEntityCollector;


},{"awayjs-display/lib/traverse/CollectorBase":"awayjs-display/lib/traverse/CollectorBase"}],"awayjs-display/lib/traverse/CollectorBase":[function(require,module,exports){
var EntityListItemPool = require("awayjs-display/lib/pool/EntityListItemPool");
/**
 * @class away.traverse.CollectorBase
 */
var CollectorBase = (function () {
    function CollectorBase() {
        this._numCullPlanes = 0;
        this._pNumEntities = 0;
        this._pNumInteractiveEntities = 0;
        this._pEntityListItemPool = new EntityListItemPool();
    }
    Object.defineProperty(CollectorBase.prototype, "camera", {
        /**
         *
         */
        get: function () {
            return this._pCamera;
        },
        set: function (value) {
            this._pCamera = value;
            this._cullPlanes = this._pCamera.frustumPlanes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollectorBase.prototype, "cullPlanes", {
        /**
         *
         */
        get: function () {
            return this._customCullPlanes;
        },
        set: function (value) {
            this._customCullPlanes = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollectorBase.prototype, "entityHead", {
        /**
         *
         */
        get: function () {
            return this._pEntityHead;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollectorBase.prototype, "numEntities", {
        /**
         *
         */
        get: function () {
            return this._pNumEntities;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollectorBase.prototype, "numInteractiveEntities", {
        /**
         *
         */
        get: function () {
            return this._pNumInteractiveEntities;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     */
    CollectorBase.prototype.clear = function () {
        this._pNumEntities = this._pNumInteractiveEntities = 0;
        this._cullPlanes = this._customCullPlanes ? this._customCullPlanes : (this._pCamera ? this._pCamera.frustumPlanes : null);
        this._numCullPlanes = this._cullPlanes ? this._cullPlanes.length : 0;
        this._pEntityHead = null;
        this._pEntityListItemPool.freeAll();
    };
    /**
     *
     * @param node
     * @returns {boolean}
     */
    CollectorBase.prototype.enterNode = function (node) {
        var enter = this.scene._iCollectionMark != node._iCollectionMark && node.isInFrustum(this._cullPlanes, this._numCullPlanes);
        node._iCollectionMark = this.scene._iCollectionMark;
        return enter;
    };
    /**
     *
     * @param entity
     */
    CollectorBase.prototype.applyDirectionalLight = function (entity) {
        //don't do anything here
    };
    /**
     *
     * @param entity
     */
    CollectorBase.prototype.applyEntity = function (entity) {
        this._pNumEntities++;
        if (entity._iIsMouseEnabled())
            this._pNumInteractiveEntities++;
        var item = this._pEntityListItemPool.getItem();
        item.entity = entity;
        item.next = this._pEntityHead;
        this._pEntityHead = item;
    };
    /**
     *
     * @param entity
     */
    CollectorBase.prototype.applyLightProbe = function (entity) {
        //don't do anything here
    };
    /**
     *
     * @param entity
     */
    CollectorBase.prototype.applyPointLight = function (entity) {
        //don't do anything here
    };
    /**
     *
     * @param entity
     */
    CollectorBase.prototype.applySkybox = function (entity) {
        //don't do anything here
    };
    return CollectorBase;
})();
module.exports = CollectorBase;


},{"awayjs-display/lib/pool/EntityListItemPool":"awayjs-display/lib/pool/EntityListItemPool"}],"awayjs-display/lib/traverse/EntityCollector":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CollectorBase = require("awayjs-display/lib/traverse/CollectorBase");
/**
 * @class away.traverse.EntityCollector
 */
var EntityCollector = (function (_super) {
    __extends(EntityCollector, _super);
    function EntityCollector() {
        _super.call(this);
        this._pNumLights = 0;
        this._numDirectionalLights = 0;
        this._numPointLights = 0;
        this._numLightProbes = 0;
        this._pLights = new Array();
        this._directionalLights = new Array();
        this._pointLights = new Array();
        this._lightProbes = new Array();
        this.isEntityCollector = true;
    }
    Object.defineProperty(EntityCollector.prototype, "directionalLights", {
        /**
         *
         */
        get: function () {
            return this._directionalLights;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityCollector.prototype, "lightProbes", {
        /**
         *
         */
        get: function () {
            return this._lightProbes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityCollector.prototype, "lights", {
        /**
         *
         */
        get: function () {
            return this._pLights;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityCollector.prototype, "pointLights", {
        /**
         *
         */
        get: function () {
            return this._pointLights;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityCollector.prototype, "skyBox", {
        /**
         *
         */
        get: function () {
            return this._pSkybox;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     * @param entity
     */
    EntityCollector.prototype.applyDirectionalLight = function (entity) {
        this._directionalLights[this._numDirectionalLights++] = entity;
    };
    /**
     *
     * @param entity
     */
    EntityCollector.prototype.applyLightProbe = function (entity) {
        this._lightProbes[this._numLightProbes++] = entity;
    };
    /**
     *
     * @param entity
     */
    EntityCollector.prototype.applyPointLight = function (entity) {
        this._pointLights[this._numPointLights++] = entity;
    };
    /**
     *
     * @param entity
     */
    EntityCollector.prototype.applySkybox = function (entity) {
        this._pSkybox = entity;
    };
    /**
     *
     */
    EntityCollector.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this._pSkybox = null;
        if (this._pNumLights > 0)
            this._pLights.length = this._pNumLights = 0;
        if (this._numDirectionalLights > 0)
            this._directionalLights.length = this._numDirectionalLights = 0;
        if (this._numPointLights > 0)
            this._pointLights.length = this._numPointLights = 0;
        if (this._numLightProbes > 0)
            this._lightProbes.length = this._numLightProbes = 0;
    };
    return EntityCollector;
})(CollectorBase);
module.exports = EntityCollector;


},{"awayjs-display/lib/traverse/CollectorBase":"awayjs-display/lib/traverse/CollectorBase"}],"awayjs-display/lib/traverse/RaycastCollector":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Vector3D = require("awayjs-core/lib/geom/Vector3D");
var CollectorBase = require("awayjs-display/lib/traverse/CollectorBase");
/**
 * The RaycastCollector class is a traverser for scene partitions that collects all scene graph entities that are
 * considered intersecting with the defined ray.
 *
 * @see away.partition.Partition
 * @see away.entities.IEntity
 *
 * @class away.traverse.RaycastCollector
 */
var RaycastCollector = (function (_super) {
    __extends(RaycastCollector, _super);
    /**
     * Creates a new RaycastCollector object.
     */
    function RaycastCollector() {
        _super.call(this);
        this._rayPosition = new Vector3D();
        this._rayDirection = new Vector3D();
        this._iCollectionMark = 0;
    }
    Object.defineProperty(RaycastCollector.prototype, "rayPosition", {
        /**
         * Provides the starting position of the ray.
         */
        get: function () {
            return this._rayPosition;
        },
        set: function (value) {
            this._rayPosition = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RaycastCollector.prototype, "rayDirection", {
        /**
         * Provides the direction vector of the ray.
         */
        get: function () {
            return this._rayDirection;
        },
        set: function (value) {
            this._rayDirection = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns true if the current node is at least partly in the frustum. If so, the partition node knows to pass on the traverser to its children.
     *
     * @param node The Partition3DNode object to frustum-test.
     */
    RaycastCollector.prototype.enterNode = function (node) {
        return node.isIntersectingRay(this._rayPosition, this._rayDirection);
    };
    return RaycastCollector;
})(CollectorBase);
module.exports = RaycastCollector;


},{"awayjs-core/lib/geom/Vector3D":undefined,"awayjs-display/lib/traverse/CollectorBase":"awayjs-display/lib/traverse/CollectorBase"}],"awayjs-display/lib/traverse/ShadowCasterCollector":[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CollectorBase = require("awayjs-display/lib/traverse/CollectorBase");
/**
 * @class away.traverse.ShadowCasterCollector
 */
var ShadowCasterCollector = (function (_super) {
    __extends(ShadowCasterCollector, _super);
    function ShadowCasterCollector() {
        _super.call(this);
    }
    /**
     *
     */
    ShadowCasterCollector.prototype.enterNode = function (node) {
        var enter = this.scene._iCollectionMark != node._iCollectionMark && node.isCastingShadow();
        if (!enter) {
            node._iCollectionMark = this.scene._iCollectionMark;
            return false;
        }
        return _super.prototype.enterNode.call(this, node);
    };
    return ShadowCasterCollector;
})(CollectorBase);
module.exports = ShadowCasterCollector;


},{"awayjs-display/lib/traverse/CollectorBase":"awayjs-display/lib/traverse/CollectorBase"}],"awayjs-display/lib/utils/Cast":[function(require,module,exports){
var BitmapData = require("awayjs-core/lib/data/BitmapData");
var ByteArray = require("awayjs-core/lib/utils/ByteArray");
var CastError = require("awayjs-display/lib/errors/CastError");
var BitmapTexture = require("awayjs-core/lib/textures/BitmapTexture");
var ImageTexture = require("awayjs-core/lib/textures/ImageTexture");
/**
 * Helper class for casting assets to usable objects
 */
var Cast = (function () {
    function Cast() {
    }
    Cast.string = function (data) {
        if (typeof (data) == 'function')
            data = new data;
        if (typeof (data) == 'string')
            return data;
        return data;
    };
    Cast.byteArray = function (data) {
        if (typeof (data) == 'function')
            data = new data;
        if (data instanceof ByteArray)
            return data;
        return data;
    };
    //        public static xml(data:any):XML
    //        {
    //            if (typeof(data) == 'function')
    //                data = new data;
    //
    //            if (data is XML)
    //                return data;
    //
    //            return XML(data);
    //        }
    Cast.isHex = function (str) {
        var length = str.length;
        for (var i = 0; i < length; ++i) {
            if (this._hexChars.indexOf(str.charAt(i)) == -1)
                return false;
        }
        return true;
    };
    Cast.tryColor = function (data) {
        if (typeof (data) == 'number')
            return Math.floor(data);
        if (typeof (data) == 'string') {
            if (data == "random")
                return Math.floor(Math.random() * 0x1000000);
            if (this._colorNames == null) {
                this._colorNames = new Object();
                this._colorNames["steelblue"] = 0x4682B4;
                this._colorNames["royalblue"] = 0x041690;
                this._colorNames["cornflowerblue"] = 0x6495ED;
                this._colorNames["lightsteelblue"] = 0xB0C4DE;
                this._colorNames["mediumslateblue"] = 0x7B68EE;
                this._colorNames["slateblue"] = 0x6A5ACD;
                this._colorNames["darkslateblue"] = 0x483D8B;
                this._colorNames["midnightblue"] = 0x191970;
                this._colorNames["navy"] = 0x000080;
                this._colorNames["darkblue"] = 0x00008B;
                this._colorNames["mediumblue"] = 0x0000CD;
                this._colorNames["blue"] = 0x0000FF;
                this._colorNames["dodgerblue"] = 0x1E90FF;
                this._colorNames["deepskyblue"] = 0x00BFFF;
                this._colorNames["lightskyblue"] = 0x87CEFA;
                this._colorNames["skyblue"] = 0x87CEEB;
                this._colorNames["lightblue"] = 0xADD8E6;
                this._colorNames["powderblue"] = 0xB0E0E6;
                this._colorNames["azure"] = 0xF0FFFF;
                this._colorNames["lightcyan"] = 0xE0FFFF;
                this._colorNames["paleturquoise"] = 0xAFEEEE;
                this._colorNames["mediumturquoise"] = 0x48D1CC;
                this._colorNames["lightseagreen"] = 0x20B2AA;
                this._colorNames["darkcyan"] = 0x008B8B;
                this._colorNames["teal"] = 0x008080;
                this._colorNames["cadetblue"] = 0x5F9EA0;
                this._colorNames["darkturquoise"] = 0x00CED1;
                this._colorNames["aqua"] = 0x00FFFF;
                this._colorNames["cyan"] = 0x00FFFF;
                this._colorNames["turquoise"] = 0x40E0D0;
                this._colorNames["aquamarine"] = 0x7FFFD4;
                this._colorNames["mediumaquamarine"] = 0x66CDAA;
                this._colorNames["darkseagreen"] = 0x8FBC8F;
                this._colorNames["mediumseagreen"] = 0x3CB371;
                this._colorNames["seagreen"] = 0x2E8B57;
                this._colorNames["darkgreen"] = 0x006400;
                this._colorNames["green"] = 0x008000;
                this._colorNames["forestgreen"] = 0x228B22;
                this._colorNames["limegreen"] = 0x32CD32;
                this._colorNames["lime"] = 0x00FF00;
                this._colorNames["chartreuse"] = 0x7FFF00;
                this._colorNames["lawngreen"] = 0x7CFC00;
                this._colorNames["greenyellow"] = 0xADFF2F;
                this._colorNames["yellowgreen"] = 0x9ACD32;
                this._colorNames["palegreen"] = 0x98FB98;
                this._colorNames["lightgreen"] = 0x90EE90;
                this._colorNames["springgreen"] = 0x00FF7F;
                this._colorNames["mediumspringgreen"] = 0x00FA9A;
                this._colorNames["darkolivegreen"] = 0x556B2F;
                this._colorNames["olivedrab"] = 0x6B8E23;
                this._colorNames["olive"] = 0x808000;
                this._colorNames["darkkhaki"] = 0xBDB76B;
                this._colorNames["darkgoldenrod"] = 0xB8860B;
                this._colorNames["goldenrod"] = 0xDAA520;
                this._colorNames["gold"] = 0xFFD700;
                this._colorNames["yellow"] = 0xFFFF00;
                this._colorNames["khaki"] = 0xF0E68C;
                this._colorNames["palegoldenrod"] = 0xEEE8AA;
                this._colorNames["blanchedalmond"] = 0xFFEBCD;
                this._colorNames["moccasin"] = 0xFFE4B5;
                this._colorNames["wheat"] = 0xF5DEB3;
                this._colorNames["navajowhite"] = 0xFFDEAD;
                this._colorNames["burlywood"] = 0xDEB887;
                this._colorNames["tan"] = 0xD2B48C;
                this._colorNames["rosybrown"] = 0xBC8F8F;
                this._colorNames["sienna"] = 0xA0522D;
                this._colorNames["saddlebrown"] = 0x8B4513;
                this._colorNames["chocolate"] = 0xD2691E;
                this._colorNames["peru"] = 0xCD853F;
                this._colorNames["sandybrown"] = 0xF4A460;
                this._colorNames["darkred"] = 0x8B0000;
                this._colorNames["maroon"] = 0x800000;
                this._colorNames["brown"] = 0xA52A2A;
                this._colorNames["firebrick"] = 0xB22222;
                this._colorNames["indianred"] = 0xCD5C5C;
                this._colorNames["lightcoral"] = 0xF08080;
                this._colorNames["salmon"] = 0xFA8072;
                this._colorNames["darksalmon"] = 0xE9967A;
                this._colorNames["lightsalmon"] = 0xFFA07A;
                this._colorNames["coral"] = 0xFF7F50;
                this._colorNames["tomato"] = 0xFF6347;
                this._colorNames["darkorange"] = 0xFF8C00;
                this._colorNames["orange"] = 0xFFA500;
                this._colorNames["orangered"] = 0xFF4500;
                this._colorNames["crimson"] = 0xDC143C;
                this._colorNames["red"] = 0xFF0000;
                this._colorNames["deeppink"] = 0xFF1493;
                this._colorNames["fuchsia"] = 0xFF00FF;
                this._colorNames["magenta"] = 0xFF00FF;
                this._colorNames["hotpink"] = 0xFF69B4;
                this._colorNames["lightpink"] = 0xFFB6C1;
                this._colorNames["pink"] = 0xFFC0CB;
                this._colorNames["palevioletred"] = 0xDB7093;
                this._colorNames["mediumvioletred"] = 0xC71585;
                this._colorNames["purple"] = 0x800080;
                this._colorNames["darkmagenta"] = 0x8B008B;
                this._colorNames["mediumpurple"] = 0x9370DB;
                this._colorNames["blueviolet"] = 0x8A2BE2;
                this._colorNames["indigo"] = 0x4B0082;
                this._colorNames["darkviolet"] = 0x9400D3;
                this._colorNames["darkorchid"] = 0x9932CC;
                this._colorNames["mediumorchid"] = 0xBA55D3;
                this._colorNames["orchid"] = 0xDA70D6;
                this._colorNames["violet"] = 0xEE82EE;
                this._colorNames["plum"] = 0xDDA0DD;
                this._colorNames["thistle"] = 0xD8BFD8;
                this._colorNames["lavender"] = 0xE6E6FA;
                this._colorNames["ghostwhite"] = 0xF8F8FF;
                this._colorNames["aliceblue"] = 0xF0F8FF;
                this._colorNames["mintcream"] = 0xF5FFFA;
                this._colorNames["honeydew"] = 0xF0FFF0;
                this._colorNames["lightgoldenrodyellow"] = 0xFAFAD2;
                this._colorNames["lemonchiffon"] = 0xFFFACD;
                this._colorNames["cornsilk"] = 0xFFF8DC;
                this._colorNames["lightyellow"] = 0xFFFFE0;
                this._colorNames["ivory"] = 0xFFFFF0;
                this._colorNames["floralwhite"] = 0xFFFAF0;
                this._colorNames["linen"] = 0xFAF0E6;
                this._colorNames["oldlace"] = 0xFDF5E6;
                this._colorNames["antiquewhite"] = 0xFAEBD7;
                this._colorNames["bisque"] = 0xFFE4C4;
                this._colorNames["peachpuff"] = 0xFFDAB9;
                this._colorNames["papayawhip"] = 0xFFEFD5;
                this._colorNames["beige"] = 0xF5F5DC;
                this._colorNames["seashell"] = 0xFFF5EE;
                this._colorNames["lavenderblush"] = 0xFFF0F5;
                this._colorNames["mistyrose"] = 0xFFE4E1;
                this._colorNames["snow"] = 0xFFFAFA;
                this._colorNames["white"] = 0xFFFFFF;
                this._colorNames["whitesmoke"] = 0xF5F5F5;
                this._colorNames["gainsboro"] = 0xDCDCDC;
                this._colorNames["lightgrey"] = 0xD3D3D3;
                this._colorNames["silver"] = 0xC0C0C0;
                this._colorNames["darkgrey"] = 0xA9A9A9;
                this._colorNames["grey"] = 0x808080;
                this._colorNames["lightslategrey"] = 0x778899;
                this._colorNames["slategrey"] = 0x708090;
                this._colorNames["dimgrey"] = 0x696969;
                this._colorNames["darkslategrey"] = 0x2F4F4F;
                this._colorNames["black"] = 0x000000;
                this._colorNames["transparent"] = 0xFF000000;
            }
            if (this._colorNames[data] != null)
                return this._colorNames[data];
            if ((data.length == 6) && this.isHex(data))
                return parseInt("0x" + data);
        }
        return null;
    };
    Cast.color = function (data) {
        var result = this.tryColor(data);
        if (result == null)
            throw new CastError("Can't cast to color: " + data);
        return result;
    };
    Cast.tryClass = function (name) {
        if (this._notClasses[name])
            return name;
        var result = this._classes[name];
        if (result != null)
            return result;
        try {
            result = window[name];
            this._classes[name] = result;
            return result;
        }
        catch (e) {
        }
        this._notClasses[name] = true;
        return name;
    };
    Cast.bitmapData = function (data) {
        if (data == null)
            return null;
        if (typeof (data) == 'string')
            data = this.tryClass(data);
        if (typeof (data) == 'function') {
            try {
                data = new data();
            }
            catch (e) {
                data = new data(0, 0);
            }
        }
        if (data instanceof BitmapData)
            return data;
        if (data instanceof ImageTexture)
            data = data.htmlImageElement;
        if (data instanceof HTMLImageElement) {
            var imageElement = data;
            var bitmapData = new BitmapData(imageElement.width, imageElement.height, true, 0x0);
            bitmapData.draw(imageElement);
            return bitmapData;
        }
        throw new CastError("Can't cast to BitmapData: " + data);
    };
    Cast.bitmapTexture = function (data) {
        if (data == null)
            return null;
        if (typeof (data) == 'string')
            data = this.tryClass(data);
        if (typeof (data) == 'function') {
            try {
                data = new data();
            }
            catch (e) {
                data = new data(0, 0);
            }
        }
        if (data instanceof BitmapTexture)
            return data;
        try {
            var bmd = Cast.bitmapData(data);
            return new BitmapTexture(bmd);
        }
        catch (e) {
        }
        throw new CastError("Can't cast to BitmapTexture: " + data);
    };
    Cast._hexChars = "0123456789abcdefABCDEF";
    Cast._notClasses = new Object();
    Cast._classes = new Object();
    return Cast;
})();
module.exports = Cast;


},{"awayjs-core/lib/data/BitmapData":undefined,"awayjs-core/lib/textures/BitmapTexture":undefined,"awayjs-core/lib/textures/ImageTexture":undefined,"awayjs-core/lib/utils/ByteArray":undefined,"awayjs-display/lib/errors/CastError":"awayjs-display/lib/errors/CastError"}]},{},[])


//# sourceMappingURL=awayjs-display.js.map