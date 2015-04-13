declare module "awayjs-display/lib/animators/IAnimationSet" {
	import IAsset = require("awayjs-core/lib/library/IAsset");
	import AnimationNodeBase = require("awayjs-display/lib/animators/nodes/AnimationNodeBase");
	/**
	 * Provides an interface for data set classes that hold animation data for use in animator classes.
	 *
	 * @see away.animators.AnimatorBase
	 */
	interface IAnimationSet extends IAsset {
	    /**
	     * Check to determine whether a state is registered in the animation set under the given name.
	     *
	     * @param stateName The name of the animation state object to be checked.
	     */
	    hasAnimation(name: string): boolean;
	    /**
	     * Retrieves the animation state object registered in the animation data set under the given name.
	     *
	     * @param stateName The name of the animation state object to be retrieved.
	     */
	    getAnimation(name: string): AnimationNodeBase;
	    /**
	     * Indicates whether the properties of the animation data contained within the set combined with
	     * the vertex registers aslready in use on shading materials allows the animation data to utilise
	     * GPU calls.
	     */
	    usesCPU: boolean;
	    /**
	     * Called by the material to reset the GPU indicator before testing whether register space in the shader
	     * is available for running GPU-based animation code.
	     *
	     * @private
	     */
	    resetGPUCompatibility(): any;
	    /**
	     * Called by the animator to void the GPU indicator when register space in the shader
	     * is no longer available for running GPU-based animation code.
	     *
	     * @private
	     */
	    cancelGPUCompatibility(): any;
	}
	export = IAnimationSet;
	
}

declare module "awayjs-display/lib/animators/IAnimator" {
	import IAsset = require("awayjs-core/lib/library/IAsset");
	import IAnimationSet = require("awayjs-display/lib/animators/IAnimationSet");
	import SubGeometryBase = require("awayjs-core/lib/data/SubGeometryBase");
	import IRenderable = require("awayjs-display/lib/pool/IRenderable");
	import IEntity = require("awayjs-display/lib/entities/IEntity");
	/**
	 * Provides an interface for animator classes that control animation output from a data set subtype of <code>AnimationSetBase</code>.
	 *
	 * @see away.animators.IAnimationSet
	 */
	interface IAnimator extends IAsset {
	    /**
	     *
	     */
	    animationSet: IAnimationSet;
	    /**
	     *
	     */
	    clone(): IAnimator;
	    /**
	     *
	     */
	    dispose(): any;
	    /**
	     * Used by the entity object to which the animator is applied, registers the owner for internal use.
	     *
	     * @private
	     */
	    addOwner(mesh: IEntity): any;
	    /**
	     * Used by the mesh object from which the animator is removed, unregisters the owner for internal use.
	     *
	     * @private
	     */
	    removeOwner(mesh: IEntity): any;
	    /**
	     * //TODO
	     *
	     * @param sourceSubGeometry
	     */
	    getRenderableSubGeometry(renderable: IRenderable, sourceSubGeometry: SubGeometryBase): SubGeometryBase;
	}
	export = IAnimator;
	
}

declare module "awayjs-display/lib/animators/nodes/AnimationNodeBase" {
	import IAsset = require("awayjs-core/lib/library/IAsset");
	import AssetBase = require("awayjs-core/lib/library/AssetBase");
	/**
	 * Provides an abstract base class for nodes in an animation blend tree.
	 */
	class AnimationNodeBase extends AssetBase implements IAsset {
	    static assetType: string;
	    _pStateClass: any;
	    stateClass: any;
	    /**
	     * Creates a new <code>AnimationNodeBase</code> object.
	     */
	    constructor();
	    /**
	     * @inheritDoc
	     */
	    dispose(): void;
	    /**
	     * @inheritDoc
	     */
	    assetType: string;
	}
	export = AnimationNodeBase;
	
}

declare module "awayjs-display/lib/base/AlignmentMode" {
	/**
	 *
	 */
	class AlignmentMode {
	    /**
	     *
	     */
	    static REGISTRATION_POINT: string;
	    /**
	     *
	     */
	    static PIVOT_POINT: string;
	}
	export = AlignmentMode;
	
}

declare module "awayjs-display/lib/base/CurveSubMesh" {
	import CurveSubGeometry = require("awayjs-core/lib/data/CurveSubGeometry");
	import ISubMesh = require("awayjs-display/lib/base/ISubMesh");
	import SubMeshBase = require("awayjs-display/lib/base/SubMeshBase");
	import IRendererPool = require("awayjs-display/lib/pool/IRendererPool");
	import Mesh = require("awayjs-display/lib/entities/Mesh");
	import MaterialBase = require("awayjs-display/lib/materials/MaterialBase");
	/**
	 * CurveSubMesh wraps a CurveSubGeometry as a scene graph instantiation. A CurveSubMesh is owned by a Mesh object.
	 *
	 *
	 * @see away.base.CurveSubGeometry
	 * @see away.entities.Mesh
	 *
	 * @class away.base.CurveSubMesh
	 */
	class CurveSubMesh extends SubMeshBase implements ISubMesh {
	    static assetType: string;
	    static geometryType: string;
	    private _subGeometry;
	    /**
	     *
	     */
	    assetType: string;
	    /**
	     * The TriangleSubGeometry object which provides the geometry data for this CurveSubMesh.
	     */
	    subGeometry: CurveSubGeometry;
	    /**
	     * Creates a new CurveSubMesh object
	     * @param subGeometry The TriangleSubGeometry object which provides the geometry data for this CurveSubMesh.
	     * @param parentMesh The Mesh object to which this CurveSubMesh belongs.
	     * @param material An optional material used to render this CurveSubMesh.
	     */
	    constructor(subGeometry: CurveSubGeometry, parentMesh: Mesh, material?: MaterialBase);
	    /**
	     *
	     */
	    dispose(): void;
	    _iCollectRenderable(rendererPool: IRendererPool): void;
	}
	export = CurveSubMesh;
	
}

declare module "awayjs-display/lib/base/DisplayObject" {
	import BlendMode = require("awayjs-core/lib/data/BlendMode");
	import Box = require("awayjs-core/lib/geom/Box");
	import Sphere = require("awayjs-core/lib/geom/Sphere");
	import Matrix3D = require("awayjs-core/lib/geom/Matrix3D");
	import Point = require("awayjs-core/lib/geom/Point");
	import Rectangle = require("awayjs-core/lib/geom/Rectangle");
	import Vector3D = require("awayjs-core/lib/geom/Vector3D");
	import AssetBase = require("awayjs-core/lib/library/AssetBase");
	import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
	import Scene = require("awayjs-display/lib/containers/Scene");
	import ControllerBase = require("awayjs-display/lib/controllers/ControllerBase");
	import LoaderInfo = require("awayjs-display/lib/base/LoaderInfo");
	import IBitmapDrawable = require("awayjs-display/lib/base/IBitmapDrawable");
	import Transform = require("awayjs-display/lib/base/Transform");
	import EntityNode = require("awayjs-display/lib/partition/EntityNode");
	import Partition = require("awayjs-display/lib/partition/Partition");
	import IPickingCollider = require("awayjs-display/lib/pick/IPickingCollider");
	import PickingCollisionVO = require("awayjs-display/lib/pick/PickingCollisionVO");
	import IRenderable = require("awayjs-display/lib/pool/IRenderable");
	import Camera = require("awayjs-display/lib/entities/Camera");
	import PrefabBase = require("awayjs-display/lib/prefabs/PrefabBase");
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
	class DisplayObject extends AssetBase implements IBitmapDrawable {
	    private _loaderInfo;
	    private _mouseX;
	    private _mouseY;
	    private _root;
	    private _bounds;
	    _pBoxBounds: Box;
	    private _boxBoundsInvalid;
	    _pSphereBounds: Sphere;
	    private _sphereBoundsInvalid;
	    private _debugVisible;
	    _pName: string;
	    _pScene: Scene;
	    _pParent: DisplayObjectContainer;
	    _pSceneTransform: Matrix3D;
	    _pSceneTransformDirty: boolean;
	    _pIsEntity: boolean;
	    _iMaskID: number;
	    _iMasks: DisplayObject[];
	    private _explicitPartition;
	    _pImplicitPartition: Partition;
	    private _sceneTransformChanged;
	    private _scenechanged;
	    private _transform;
	    private _matrix3D;
	    private _matrix3DDirty;
	    private _inverseSceneTransform;
	    private _inverseSceneTransformDirty;
	    private _scenePosition;
	    private _scenePositionDirty;
	    private _explicitVisibility;
	    _pImplicitVisibility: boolean;
	    private _explicitMouseEnabled;
	    _pImplicitMouseEnabled: boolean;
	    private _listenToSceneTransformChanged;
	    private _listenToSceneChanged;
	    private _positionDirty;
	    private _rotationDirty;
	    private _scaleDirty;
	    private _positionChanged;
	    private _rotationChanged;
	    private _scaleChanged;
	    private _rotationX;
	    private _rotationY;
	    private _rotationZ;
	    private _eulers;
	    private _flipY;
	    private _listenToPositionChanged;
	    private _listenToRotationChanged;
	    private _listenToScaleChanged;
	    private _zOffset;
	    _width: number;
	    _height: number;
	    _depth: number;
	    _pScaleX: number;
	    _pScaleY: number;
	    _pScaleZ: number;
	    private _x;
	    private _y;
	    private _z;
	    private _pivot;
	    private _pivotScale;
	    private _orientationMatrix;
	    private _pivotZero;
	    private _pivotDirty;
	    private _pos;
	    private _rot;
	    private _sca;
	    private _transformComponents;
	    _pIgnoreTransform: boolean;
	    private _shaderPickingDetails;
	    _pPickingCollisionVO: PickingCollisionVO;
	    _boundsType: string;
	    _pPickingCollider: IPickingCollider;
	    _pRenderables: Array<IRenderable>;
	    private _entityNodes;
	    _iSourcePrefab: PrefabBase;
	    /**
	     *
	     */
	    alignmentMode: string;
	    /**
	     * Indicates the alpha transparency value of the object specified. Valid
	     * values are 0(fully transparent) to 1(fully opaque). The default value is
	     * 1. Display objects with <code>alpha</code> set to 0 <i>are</i> active,
	     * even though they are invisible.
	     */
	    alpha: number;
	    /**
	     * A value from the BlendMode class that specifies which blend mode to use. A
	     * bitmap can be drawn internally in two ways. If you have a blend mode
	     * enabled or an external clipping mask, the bitmap is drawn by adding a
	     * bitmap-filled square shape to the vector render. If you attempt to set
	     * this property to an invalid value, Flash runtimes set the value to
	     * <code>BlendMode.NORMAL</code>.
	     *
	     * <p>The <code>blendMode</code> property affects each pixel of the display
	     * object. Each pixel is composed of three constituent colors(red, green,
	     * and blue), and each constituent color has a value between 0x00 and 0xFF.
	     * Flash Player or Adobe AIR compares each constituent color of one pixel in
	     * the movie clip with the corresponding color of the pixel in the
	     * background. For example, if <code>blendMode</code> is set to
	     * <code>BlendMode.LIGHTEN</code>, Flash Player or Adobe AIR compares the red
	     * value of the display object with the red value of the background, and uses
	     * the lighter of the two as the value for the red component of the displayed
	     * color.</p>
	     *
	     * <p>The following table describes the <code>blendMode</code> settings. The
	     * BlendMode class defines string values you can use. The illustrations in
	     * the table show <code>blendMode</code> values applied to a circular display
	     * object(2) superimposed on another display object(1).</p>
	     */
	    blendMode: BlendMode;
	    /**
	     *
	     */
	    boundsType: string;
	    /**
	     * If set to <code>true</code>, NME will use the software renderer to cache
	     * an internal bitmap representation of the display object. For native targets,
	     * this is often much slower than the default hardware renderer. When you
	     * are using the Flash target, this caching may increase performance for display
	     * objects that contain complex vector content.
	     *
	     * <p>All vector data for a display object that has a cached bitmap is drawn
	     * to the bitmap instead of the main display. If
	     * <code>cacheAsBitmapMatrix</code> is null or unsupported, the bitmap is
	     * then copied to the main display as unstretched, unrotated pixels snapped
	     * to the nearest pixel boundaries. Pixels are mapped 1 to 1 with the parent
	     * object. If the bounds of the bitmap change, the bitmap is recreated
	     * instead of being stretched.</p>
	     *
	     * <p>If <code>cacheAsBitmapMatrix</code> is non-null and supported, the
	     * object is drawn to the off-screen bitmap using that matrix and the
	     * stretched and/or rotated results of that rendering are used to draw the
	     * object to the main display.</p>
	     *
	     * <p>No internal bitmap is created unless the <code>cacheAsBitmap</code>
	     * property is set to <code>true</code>.</p>
	     *
	     * <p>After you set the <code>cacheAsBitmap</code> property to
	     * <code>true</code>, the rendering does not change, however the display
	     * object performs pixel snapping automatically. The animation speed can be
	     * significantly faster depending on the complexity of the vector content.
	     * </p>
	     *
	     * <p>The <code>cacheAsBitmap</code> property is automatically set to
	     * <code>true</code> whenever you apply a filter to a display object(when
	     * its <code>filter</code> array is not empty), and if a display object has a
	     * filter applied to it, <code>cacheAsBitmap</code> is reported as
	     * <code>true</code> for that display object, even if you set the property to
	     * <code>false</code>. If you clear all filters for a display object, the
	     * <code>cacheAsBitmap</code> setting changes to what it was last set to.</p>
	     *
	     * <p>A display object does not use a bitmap even if the
	     * <code>cacheAsBitmap</code> property is set to <code>true</code> and
	     * instead renders from vector data in the following cases:</p>
	     *
	     * <ul>
	     *   <li>The bitmap is too large. In AIR 1.5 and Flash Player 10, the maximum
	     * size for a bitmap image is 8,191 pixels in width or height, and the total
	     * number of pixels cannot exceed 16,777,215 pixels.(So, if a bitmap image
	     * is 8,191 pixels wide, it can only be 2,048 pixels high.) In Flash Player 9
	     * and earlier, the limitation is is 2880 pixels in height and 2,880 pixels
	     * in width.</li>
	     *   <li>The bitmap fails to allocate(out of memory error). </li>
	     * </ul>
	     *
	     * <p>The <code>cacheAsBitmap</code> property is best used with movie clips
	     * that have mostly static content and that do not scale and rotate
	     * frequently. With such movie clips, <code>cacheAsBitmap</code> can lead to
	     * performance increases when the movie clip is translated(when its <i>x</i>
	     * and <i>y</i> position is changed).</p>
	     */
	    cacheAsBitmap: boolean;
	    /**
	     *
	     */
	    castsShadows: boolean;
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
	    depth: number;
	    /**
	     * Defines the rotation of the 3d object as a <code>Vector3D</code> object containing euler angles for rotation around x, y and z axis.
	     */
	    eulers: Vector3D;
	    /**
	     * An object that can contain any extra data.
	     */
	    extra: Object;
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
	    height: number;
	    /**
	     * Indicates the instance container index of the DisplayObject. The object can be
	     * identified in the child list of its parent display object container by
	     * calling the <code>getChildByIndex()</code> method of the display object
	     * container.
	     *
	     * <p>If the DisplayObject has no parent container, index defaults to 0.</p>
	     */
	    index: number;
	    /**
	     *
	     */
	    inverseSceneTransform: Matrix3D;
	    /**
	     *
	     */
	    ignoreTransform: boolean;
	    /**
	     *
	     */
	    isEntity: boolean;
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
	    loaderInfo: LoaderInfo;
	    /**
	     * The calling display object is masked by the specified <code>mask</code>
	     * object. To ensure that masking works when the Stage is scaled, the
	     * <code>mask</code> display object must be in an active part of the display
	     * list. The <code>mask</code> object itself is not drawn. Set
	     * <code>mask</code> to <code>null</code> to remove the mask.
	     *
	     * <p>To be able to scale a mask object, it must be on the display list. To
	     * be able to drag a mask Sprite object(by calling its
	     * <code>startDrag()</code> method), it must be on the display list. To call
	     * the <code>startDrag()</code> method for a mask sprite based on a
	     * <code>mouseDown</code> event being dispatched by the sprite, set the
	     * sprite's <code>buttonMode</code> property to <code>true</code>.</p>
	     *
	     * <p>When display objects are cached by setting the
	     * <code>cacheAsBitmap</code> property to <code>true</code> an the
	     * <code>cacheAsBitmapMatrix</code> property to a Matrix object, both the
	     * mask and the display object being masked must be part of the same cached
	     * bitmap. Thus, if the display object is cached, then the mask must be a
	     * child of the display object. If an ancestor of the display object on the
	     * display list is cached, then the mask must be a child of that ancestor or
	     * one of its descendents. If more than one ancestor of the masked object is
	     * cached, then the mask must be a descendent of the cached container closest
	     * to the masked object in the display list.</p>
	     *
	     * <p><b>Note:</b> A single <code>mask</code> object cannot be used to mask
	     * more than one calling display object. When the <code>mask</code> is
	     * assigned to a second display object, it is removed as the mask of the
	     * first object, and that object's <code>mask</code> property becomes
	     * <code>null</code>.</p>
	     */
	    mask: DisplayObject;
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
	    mouseEnabled: boolean;
	    /**
	     * Indicates the x coordinate of the mouse or user input device position, in
	     * pixels.
	     *
	     * <p><b>Note</b>: For a DisplayObject that has been rotated, the returned x
	     * coordinate will reflect the non-rotated object.</p>
	     */
	    mouseX: number;
	    /**
	     * Indicates the y coordinate of the mouse or user input device position, in
	     * pixels.
	     *
	     * <p><b>Note</b>: For a DisplayObject that has been rotated, the returned y
	     * coordinate will reflect the non-rotated object.</p>
	     */
	    mouseY: number;
	    /**
	     * Indicates the instance name of the DisplayObject. The object can be
	     * identified in the child list of its parent display object container by
	     * calling the <code>getChildByName()</code> method of the display object
	     * container.
	     *
	     * @throws IllegalOperationError If you are attempting to set this property
	     *                               on an object that was placed on the timeline
	     *                               in the Flash authoring tool.
	     */
	    name: string;
	    /**
	     *
	     */
	    orientationMode: string;
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
	    parent: DisplayObjectContainer;
	    /**
	     *
	     */
	    partition: Partition;
	    /**
	     *
	     */
	    pickingCollider: IPickingCollider;
	    /**
	     * Defines the local point around which the object rotates.
	     */
	    pivot: Vector3D;
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
	    root: DisplayObjectContainer;
	    /**
	     * Indicates the rotation of the DisplayObject instance, in degrees, from its
	     * original orientation. Values from 0 to 180 represent clockwise rotation;
	     * values from 0 to -180 represent counterclockwise rotation. Values outside
	     * this range are added to or subtracted from 360 to obtain a value within
	     * the range. For example, the statement <code>my_video.rotation = 450</code>
	     * is the same as <code> my_video.rotation = 90</code>.
	     */
	    rotation: number;
	    /**
	     * Indicates the x-axis rotation of the DisplayObject instance, in degrees,
	     * from its original orientation relative to the 3D parent container. Values
	     * from 0 to 180 represent clockwise rotation; values from 0 to -180
	     * represent counterclockwise rotation. Values outside this range are added
	     * to or subtracted from 360 to obtain a value within the range.
	     */
	    rotationX: number;
	    /**
	     * Indicates the y-axis rotation of the DisplayObject instance, in degrees,
	     * from its original orientation relative to the 3D parent container. Values
	     * from 0 to 180 represent clockwise rotation; values from 0 to -180
	     * represent counterclockwise rotation. Values outside this range are added
	     * to or subtracted from 360 to obtain a value within the range.
	     */
	    rotationY: number;
	    /**
	     * Indicates the z-axis rotation of the DisplayObject instance, in degrees,
	     * from its original orientation relative to the 3D parent container. Values
	     * from 0 to 180 represent clockwise rotation; values from 0 to -180
	     * represent counterclockwise rotation. Values outside this range are added
	     * to or subtracted from 360 to obtain a value within the range.
	     */
	    rotationZ: number;
	    /**
	     * The current scaling grid that is in effect. If set to <code>null</code>,
	     * the entire display object is scaled normally when any scale transformation
	     * is applied.
	     *
	     * <p>When you define the <code>scale9Grid</code> property, the display
	     * object is divided into a grid with nine regions based on the
	     * <code>scale9Grid</code> rectangle, which defines the center region of the
	     * grid. The eight other regions of the grid are the following areas: </p>
	     *
	     * <ul>
	     *   <li>The upper-left corner outside of the rectangle</li>
	     *   <li>The area above the rectangle </li>
	     *   <li>The upper-right corner outside of the rectangle</li>
	     *   <li>The area to the left of the rectangle</li>
	     *   <li>The area to the right of the rectangle</li>
	     *   <li>The lower-left corner outside of the rectangle</li>
	     *   <li>The area below the rectangle</li>
	     *   <li>The lower-right corner outside of the rectangle</li>
	     * </ul>
	     *
	     * <p>You can think of the eight regions outside of the center(defined by
	     * the rectangle) as being like a picture frame that has special rules
	     * applied to it when scaled.</p>
	     *
	     * <p>When the <code>scale9Grid</code> property is set and a display object
	     * is scaled, all text and gradients are scaled normally; however, for other
	     * types of objects the following rules apply:</p>
	     *
	     * <ul>
	     *   <li>Content in the center region is scaled normally. </li>
	     *   <li>Content in the corners is not scaled. </li>
	     *   <li>Content in the top and bottom regions is scaled horizontally only.
	     * Content in the left and right regions is scaled vertically only.</li>
	     *   <li>All fills(including bitmaps, video, and gradients) are stretched to
	     * fit their shapes.</li>
	     * </ul>
	     *
	     * <p>If a display object is rotated, all subsequent scaling is normal(and
	     * the <code>scale9Grid</code> property is ignored).</p>
	     *
	     * <p>For example, consider the following display object and a rectangle that
	     * is applied as the display object's <code>scale9Grid</code>:</p>
	     *
	     * <p>A common use for setting <code>scale9Grid</code> is to set up a display
	     * object to be used as a component, in which edge regions retain the same
	     * width when the component is scaled.</p>
	     *
	     * @throws ArgumentError If you pass an invalid argument to the method.
	     */
	    scale9Grid: Rectangle;
	    /**
	     * Indicates the horizontal scale(percentage) of the object as applied from
	     * the registration point. The default registration point is(0,0). 1.0
	     * equals 100% scale.
	     *
	     * <p>Scaling the local coordinate system changes the <code>x</code> and
	     * <code>y</code> property values, which are defined in whole pixels. </p>
	     */
	    scaleX: number;
	    /**
	     * Indicates the vertical scale(percentage) of an object as applied from the
	     * registration point of the object. The default registration point is(0,0).
	     * 1.0 is 100% scale.
	     *
	     * <p>Scaling the local coordinate system changes the <code>x</code> and
	     * <code>y</code> property values, which are defined in whole pixels. </p>
	     */
	    scaleY: number;
	    /**
	     * Indicates the depth scale(percentage) of an object as applied from the
	     * registration point of the object. The default registration point is(0,0).
	     * 1.0 is 100% scale.
	     *
	     * <p>Scaling the local coordinate system changes the <code>x</code>,
	     * <code>y</code> and <code>z</code> property values, which are defined in
	     * whole pixels. </p>
	     */
	    scaleZ: number;
	    /**
	     *
	     */
	    scene: Scene;
	    /**
	     *
	     */
	    scenePosition: Vector3D;
	    sceneTransform: Matrix3D;
	    /**
	     * The scroll rectangle bounds of the display object. The display object is
	     * cropped to the size defined by the rectangle, and it scrolls within the
	     * rectangle when you change the <code>x</code> and <code>y</code> properties
	     * of the <code>scrollRect</code> object.
	     *
	     * <p>The properties of the <code>scrollRect</code> Rectangle object use the
	     * display object's coordinate space and are scaled just like the overall
	     * display object. The corner bounds of the cropped window on the scrolling
	     * display object are the origin of the display object(0,0) and the point
	     * defined by the width and height of the rectangle. They are not centered
	     * around the origin, but use the origin to define the upper-left corner of
	     * the area. A scrolled display object always scrolls in whole pixel
	     * increments. </p>
	     *
	     * <p>You can scroll an object left and right by setting the <code>x</code>
	     * property of the <code>scrollRect</code> Rectangle object. You can scroll
	     * an object up and down by setting the <code>y</code> property of the
	     * <code>scrollRect</code> Rectangle object. If the display object is rotated
	     * 90° and you scroll it left and right, the display object actually scrolls
	     * up and down.</p>
	     */
	    scrollRect: Rectangle;
	    /**
	     *
	     */
	    shaderPickingDetails: boolean;
	    /**
	     *
	     */
	    debugVisible: boolean;
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
	    transform: Transform;
	    /**
	     * Whether or not the display object is visible. Display objects that are not
	     * visible are disabled. For example, if <code>visible=false</code> for an
	     * InteractiveObject instance, it cannot be clicked.
	     */
	    visible: boolean;
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
	    width: number;
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
	    x: number;
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
	    y: number;
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
	    z: number;
	    /**
	     *
	     */
	    zOffset: number;
	    /**
	     * Creates a new <code>DisplayObject</code> instance.
	     */
	    constructor();
	    /**
	     *
	     */
	    addEventListener(type: string, listener: Function): void;
	    /**
	     *
	     */
	    clone(): DisplayObject;
	    /**
	     *
	     */
	    dispose(): void;
	    /**
	     * @inheritDoc
	     */
	    disposeAsset(): void;
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
	    getBounds(targetCoordinateSpace: DisplayObject): Rectangle;
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
	    getRect(targetCoordinateSpace?: DisplayObject): Rectangle;
	    getBox(targetCoordinateSpace?: DisplayObject): Box;
	    getSphere(targetCoordinateSpace?: DisplayObject): Sphere;
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
	    globalToLocal(point: Point): Point;
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
	    globalToLocal3D(position: Vector3D): Vector3D;
	    /**
	     * Evaluates the bounding box of the display object to see if it overlaps or
	     * intersects with the bounding box of the <code>obj</code> display object.
	     *
	     * @param obj The display object to test against.
	     * @return <code>true</code> if the bounding boxes of the display objects
	     *         intersect; <code>false</code> if not.
	     */
	    hitTestObject(obj: DisplayObject): boolean;
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
	    hitTestPoint(x: number, y: number, shapeFlag?: boolean): boolean;
	    /**
	     * Rotates the 3d object around to face a point defined relative to the local coordinates of the parent <code>ObjectContainer3D</code>.
	     *
	     * @param    target        The vector defining the point to be looked at
	     * @param    upAxis        An optional vector used to define the desired up orientation of the 3d object after rotation has occurred
	     */
	    lookAt(target: Vector3D, upAxis?: Vector3D): void;
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
	    localToGlobal(point: Point): Point;
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
	    localToGlobal3D(position: Vector3D): Vector3D;
	    /**
	     * Moves the 3d object directly to a point in space
	     *
	     * @param    dx        The amount of movement along the local x axis.
	     * @param    dy        The amount of movement along the local y axis.
	     * @param    dz        The amount of movement along the local z axis.
	     */
	    moveTo(dx: number, dy: number, dz: number): void;
	    /**
	     * Moves the local point around which the object rotates.
	     *
	     * @param    dx        The amount of movement along the local x axis.
	     * @param    dy        The amount of movement along the local y axis.
	     * @param    dz        The amount of movement along the local z axis.
	     */
	    movePivot(dx: number, dy: number, dz: number): void;
	    /**
	     * Rotates the 3d object around it's local x-axis
	     *
	     * @param    angle        The amount of rotation in degrees
	     */
	    pitch(angle: number): void;
	    /**
	     *
	     */
	    getRenderSceneTransform(camera: Camera): Matrix3D;
	    /**
	     * Rotates the 3d object around it's local z-axis
	     *
	     * @param    angle        The amount of rotation in degrees
	     */
	    roll(angle: number): void;
	    /**
	     * Rotates the 3d object around an axis by a defined angle
	     *
	     * @param    axis        The vector defining the axis of rotation
	     * @param    angle        The amount of rotation in degrees
	     */
	    rotate(axis: Vector3D, angle: number): void;
	    /**
	     * Rotates the 3d object directly to a euler angle
	     *
	     * @param    ax        The angle in degrees of the rotation around the x axis.
	     * @param    ay        The angle in degrees of the rotation around the y axis.
	     * @param    az        The angle in degrees of the rotation around the z axis.
	     */
	    rotateTo(ax: number, ay: number, az: number): void;
	    /**
	     *
	     */
	    removeEventListener(type: string, listener: Function): void;
	    /**
	     * Moves the 3d object along a vector by a defined length
	     *
	     * @param    axis        The vector defining the axis of movement
	     * @param    distance    The length of the movement
	     */
	    translate(axis: Vector3D, distance: number): void;
	    /**
	     * Moves the 3d object along a vector by a defined length
	     *
	     * @param    axis        The vector defining the axis of movement
	     * @param    distance    The length of the movement
	     */
	    translateLocal(axis: Vector3D, distance: number): void;
	    /**
	     * Rotates the 3d object around it's local y-axis
	     *
	     * @param    angle        The amount of rotation in degrees
	     */
	    yaw(angle: number): void;
	    /**
	     * @internal
	     */
	    _iController: ControllerBase;
	    /**
	     * @internal
	     */
	    _iAssignedPartition: Partition;
	    /**
	     * The transformation of the 3d object, relative to the local coordinates of the parent <code>ObjectContainer3D</code>.
	     *
	     * @internal
	     */
	    _iMatrix3D: Matrix3D;
	    /**
	     * @internal
	     */
	    _iPickingCollisionVO: PickingCollisionVO;
	    /**
	     * @internal
	     */
	    iSetParent(value: DisplayObjectContainer): void;
	    /**
	     * @protected
	     */
	    pInvalidateSceneTransform(): void;
	    /**
	     * @protected
	     */
	    _pUpdateImplicitMouseEnabled(value: boolean): void;
	    /**
	     * @protected
	     */
	    _pUpdateImplicitPartition(partition: Partition, scene: Scene): void;
	    /**
	     * @protected
	     */
	    _pUpdateImplicitVisibility(value: boolean): void;
	    /**
	     * @protected
	     */
	    _pUpdateMatrix3D(): void;
	    /**
	     * @protected
	     */
	    pUpdateSceneTransform(): void;
	    _iAddRenderable(renderable: IRenderable): IRenderable;
	    _iRemoveRenderable(renderable: IRenderable): IRenderable;
	    /**
	     * //TODO
	     *
	     * @param shortestCollisionDistance
	     * @param findClosest
	     * @returns {boolean}
	     *
	     * @internal
	     */
	    _iTestCollision(shortestCollisionDistance: number, findClosest: boolean): boolean;
	    /**
	     *
	     */
	    _iInternalUpdate(): void;
	    /**
	     * @internal
	     */
	    _iIsVisible(): boolean;
	    /**
	     * @internal
	     */
	    _iIsMouseEnabled(): boolean;
	    /**
	     * @internal
	     */
	    _iSetScene(value: Scene): void;
	    /**
	     * @private
	     */
	    private notifyPositionChanged();
	    /**
	     * @private
	     */
	    private notifyRotationChanged();
	    /**
	     * @private
	     */
	    private notifyScaleChanged();
	    /**
	     * @private
	     */
	    private notifySceneChange();
	    /**
	     * @private
	     */
	    private notifySceneTransformChange();
	    /**
	     * Invalidates the 3D transformation matrix, causing it to be updated upon the next request
	     *
	     * @private
	     */
	    private invalidateMatrix3D();
	    /**
	     * @private
	     */
	    invalidatePartition(): void;
	    /**
	     * @private
	     */
	    private invalidatePivot();
	    /**
	     * @private
	     */
	    private invalidatePosition();
	    /**
	     * @private
	     */
	    private invalidateRotation();
	    /**
	     * @private
	     */
	    private invalidateScale();
	    _iAddEntityNode(entityNode: EntityNode): EntityNode;
	    _iRemoveEntityNode(entityNode: EntityNode): EntityNode;
	    _pRegisterEntity(partition: Partition): void;
	    _pUnregisterEntity(partition: Partition): void;
	    _pInvalidateBounds(): void;
	    _pUpdateBoxBounds(): void;
	    _pUpdateSphereBounds(): void;
	}
	export = DisplayObject;
	
}

declare module "awayjs-display/lib/base/IBitmapDrawable" {
	/**
	 * The IBitmapDrawable interface is implemented by objects that can be passed as the
	 * source parameter of the <code>draw()</code> method of the BitmapData class. These
	 * objects are of type BitmapData or DisplayObject.
	 *
	 * @see away.base.BitmapData#draw()
	 * @see away.base.BitmapData
	 * @see away.base.DisplayObject
	 */
	interface IBitmapDrawable {
	}
	export = IBitmapDrawable;
	
}

declare module "awayjs-display/lib/base/IRenderObjectOwner" {
	import IAsset = require("awayjs-core/lib/library/IAsset");
	import IAnimationSet = require("awayjs-display/lib/animators/IAnimationSet");
	import IRenderObject = require("awayjs-display/lib/pool/IRenderObject");
	import IRenderablePool = require("awayjs-display/lib/pool/IRenderablePool");
	import IRenderableOwner = require("awayjs-display/lib/base/IRenderableOwner");
	import LightPickerBase = require("awayjs-display/lib/materials/lightpickers/LightPickerBase");
	/**
	 * IRenderObjectOwner provides an interface for objects that can use materials.
	 *
	 * @interface away.base.IRenderObjectOwner
	 */
	interface IRenderObjectOwner extends IAsset {
	    alphaThreshold: number;
	    mipmap: boolean;
	    smooth: boolean;
	    blendMode: string;
	    lightPicker: LightPickerBase;
	    animationSet: IAnimationSet;
	    iOwners: Array<IRenderableOwner>;
	    _iAddRenderObject(renderObject: IRenderObject): IRenderObject;
	    _iRemoveRenderObject(renderObject: IRenderObject): IRenderObject;
	    /**
	     *
	     * @param renderer
	     *
	     * @internal
	     */
	    getRenderObject(renderablePool: IRenderablePool): IRenderObject;
	}
	export = IRenderObjectOwner;
	
}

declare module "awayjs-display/lib/base/IRenderableOwner" {
	import UVTransform = require("awayjs-core/lib/geom/UVTransform");
	import IAsset = require("awayjs-core/lib/library/IAsset");
	import IAnimator = require("awayjs-display/lib/animators/IAnimator");
	import IRenderable = require("awayjs-display/lib/pool/IRenderable");
	import IRendererPool = require("awayjs-display/lib/pool/IRendererPool");
	/**
	 * IRenderableOwner provides an interface for objects that can use materials.
	 *
	 * @interface away.base.IRenderableOwner
	 */
	interface IRenderableOwner extends IAsset {
	    /**
	     * The animation used by the material owner to assemble the vertex code.
	     */
	    animator: IAnimator;
	    /**
	     *
	     */
	    uvTransform: UVTransform;
	    /**
	     *
	     * @param renderable
	     * @private
	     */
	    _iAddRenderable(renderable: IRenderable): IRenderable;
	    /**
	     *
	     * @param renderable
	     * @private
	     */
	    _iRemoveRenderable(renderable: IRenderable): IRenderable;
	    /**
	     *
	     * @param renderer
	     * @private
	     */
	    _iCollectRenderable(rendererPool: IRendererPool): any;
	}
	export = IRenderableOwner;
	
}

declare module "awayjs-display/lib/base/ISubMesh" {
	import IRenderableOwner = require("awayjs-display/lib/base/IRenderableOwner");
	import MaterialBase = require("awayjs-display/lib/materials/MaterialBase");
	import SubGeometryBase = require("awayjs-core/lib/data/SubGeometryBase");
	import Mesh = require("awayjs-display/lib/entities/Mesh");
	/**
	 * ISubMesh is an interface for object SubMesh that is used to
	 * apply a material to a SubGeometry class
	 *
	 * @class away.base.ISubMesh
	 */
	interface ISubMesh extends IRenderableOwner {
	    subGeometry: SubGeometryBase;
	    parentMesh: Mesh;
	    material: MaterialBase;
	    _iIndex: number;
	    _iInvalidateRenderableGeometry(): any;
	    _iGetExplicitMaterial(): MaterialBase;
	}
	export = ISubMesh;
	
}

declare module "awayjs-display/lib/base/ISubMeshClass" {
	import ISubMesh = require("awayjs-display/lib/base/ISubMesh");
	import MaterialBase = require("awayjs-display/lib/materials/MaterialBase");
	import SubGeometryBase = require("awayjs-core/lib/data/SubGeometryBase");
	import Mesh = require("awayjs-display/lib/entities/Mesh");
	/**
	 * ISubMeshClass is an interface for the constructable class definition ISubMesh that is used to
	 * apply a material to a SubGeometry class
	 *
	 * @class away.base.ISubMeshClass
	 */
	interface ISubMeshClass {
	    geometryType: string;
	    /**
	     *
	     */
	    new (subGeometry: SubGeometryBase, parentMesh: Mesh, material?: MaterialBase): ISubMesh;
	}
	export = ISubMeshClass;
	
}

declare module "awayjs-display/lib/base/LightBase" {
	import Matrix3D = require("awayjs-core/lib/geom/Matrix3D");
	import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
	import Camera = require("awayjs-display/lib/entities/Camera");
	import IEntity = require("awayjs-display/lib/entities/IEntity");
	import ShadowMapperBase = require("awayjs-display/lib/materials/shadowmappers/ShadowMapperBase");
	class LightBase extends DisplayObjectContainer {
	    static assetType: string;
	    private _color;
	    private _colorR;
	    private _colorG;
	    private _colorB;
	    private _ambientColor;
	    private _ambient;
	    _iAmbientR: number;
	    _iAmbientG: number;
	    _iAmbientB: number;
	    private _specular;
	    _iSpecularR: number;
	    _iSpecularG: number;
	    _iSpecularB: number;
	    private _diffuse;
	    _iDiffuseR: number;
	    _iDiffuseG: number;
	    _iDiffuseB: number;
	    private _castsShadows;
	    private _shadowMapper;
	    constructor();
	    castsShadows: boolean;
	    pCreateShadowMapper(): ShadowMapperBase;
	    specular: number;
	    diffuse: number;
	    color: number;
	    ambient: number;
	    ambientColor: number;
	    private updateAmbient();
	    iGetObjectProjectionMatrix(entity: IEntity, camera: Camera, target?: Matrix3D): Matrix3D;
	    assetType: string;
	    private updateSpecular();
	    private updateDiffuse();
	    shadowMapper: ShadowMapperBase;
	}
	export = LightBase;
	
}

declare module "awayjs-display/lib/base/LineSubMesh" {
	import LineSubGeometry = require("awayjs-core/lib/data/LineSubGeometry");
	import ISubMesh = require("awayjs-display/lib/base/ISubMesh");
	import SubMeshBase = require("awayjs-display/lib/base/SubMeshBase");
	import IRendererPool = require("awayjs-display/lib/pool/IRendererPool");
	import Mesh = require("awayjs-display/lib/entities/Mesh");
	import MaterialBase = require("awayjs-display/lib/materials/MaterialBase");
	/**
	 * LineSubMesh wraps a LineSubGeometry as a scene graph instantiation. A LineSubMesh is owned by a Mesh object.
	 *
	 *
	 * @see away.base.LineSubGeometry
	 * @see away.entities.Mesh
	 *
	 * @class away.base.LineSubMesh
	 */
	class LineSubMesh extends SubMeshBase implements ISubMesh {
	    static assetType: string;
	    static geometryType: string;
	    private _subGeometry;
	    /**
	     *
	     */
	    assetType: string;
	    /**
	     * The LineSubGeometry object which provides the geometry data for this LineSubMesh.
	     */
	    subGeometry: LineSubGeometry;
	    /**
	     * Creates a new LineSubMesh object
	     * @param subGeometry The LineSubGeometry object which provides the geometry data for this LineSubMesh.
	     * @param parentMesh The Mesh object to which this LineSubMesh belongs.
	     * @param material An optional material used to render this LineSubMesh.
	     */
	    constructor(subGeometry: LineSubGeometry, parentMesh: Mesh, material?: MaterialBase);
	    /**
	     *
	     */
	    dispose(): void;
	    _iCollectRenderable(rendererPool: IRendererPool): void;
	}
	export = LineSubMesh;
	
}

declare module "awayjs-display/lib/base/LoaderInfo" {
	import EventDispatcher = require("awayjs-core/lib/events/EventDispatcher");
	import ByteArray = require("awayjs-core/lib/utils/ByteArray");
	import Loader = require("awayjs-display/lib/containers/Loader");
	import DisplayObject = require("awayjs-display/lib/base/DisplayObject");
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
	class LoaderInfo extends EventDispatcher {
	    private _bytes;
	    private _bytesLoaded;
	    private _bytesTotal;
	    private _content;
	    private _contentType;
	    private _loader;
	    private _url;
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
	    bytes: ByteArray;
	    /**
	     * The number of bytes that are loaded for the media. When this number equals
	     * the value of <code>bytesTotal</code>, all of the bytes are loaded.
	     */
	    bytesLoaded: number;
	    /**
	     * The number of compressed bytes in the entire media file.
	     *
	     * <p>Before the first <code>progress</code> event is dispatched by this
	     * LoaderInfo object's corresponding Loader object, <code>bytesTotal</code>
	     * is 0. After the first <code>progress</code> event from the Loader object,
	     * <code>bytesTotal</code> reflects the actual number of bytes to be
	     * downloaded.</p>
	     */
	    bytesTotal: number;
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
	    content: DisplayObject;
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
	    contentType: string;
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
	    loader: Loader;
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
	    url: string;
	}
	export = LoaderInfo;
	
}

declare module "awayjs-display/lib/base/OrientationMode" {
	class OrientationMode {
	    /**
	     *
	     */
	    static DEFAULT: string;
	    /**
	     *
	     */
	    static CAMERA_PLANE: string;
	    /**
	     *
	     */
	    static CAMERA_POSITION: string;
	}
	export = OrientationMode;
	
}

declare module "awayjs-display/lib/base/SubMeshBase" {
	import Matrix3D = require("awayjs-core/lib/geom/Matrix3D");
	import UVTransform = require("awayjs-core/lib/geom/UVTransform");
	import AssetBase = require("awayjs-core/lib/library/AssetBase");
	import IAnimator = require("awayjs-display/lib/animators/IAnimator");
	import IRenderable = require("awayjs-display/lib/pool/IRenderable");
	import IRendererPool = require("awayjs-display/lib/pool/IRendererPool");
	import Camera = require("awayjs-display/lib/entities/Camera");
	import Mesh = require("awayjs-display/lib/entities/Mesh");
	import MaterialBase = require("awayjs-display/lib/materials/MaterialBase");
	/**
	 * SubMeshBase wraps a TriangleSubGeometry as a scene graph instantiation. A SubMeshBase is owned by a Mesh object.
	 *
	 *
	 * @see away.base.TriangleSubGeometry
	 * @see away.entities.Mesh
	 *
	 * @class away.base.SubMeshBase
	 */
	class SubMeshBase extends AssetBase {
	    _pParentMesh: Mesh;
	    _uvTransform: UVTransform;
	    _iIndex: number;
	    _material: MaterialBase;
	    private _renderables;
	    /**
	     * The animator object that provides the state for the TriangleSubMesh's animation.
	     */
	    animator: IAnimator;
	    /**
	     * The material used to render the current TriangleSubMesh. If set to null, its parent Mesh's material will be used instead.
	     */
	    material: MaterialBase;
	    /**
	     * The scene transform object that transforms from model to world space.
	     */
	    sceneTransform: Matrix3D;
	    /**
	     * The entity that that initially provided the IRenderable to the render pipeline (ie: the owning Mesh object).
	     */
	    parentMesh: Mesh;
	    /**
	     *
	     */
	    uvTransform: UVTransform;
	    /**
	     * Creates a new SubMeshBase object
	     */
	    constructor();
	    /**
	     *
	     */
	    dispose(): void;
	    /**
	     *
	     * @param camera
	     * @returns {away.geom.Matrix3D}
	     */
	    getRenderSceneTransform(camera: Camera): Matrix3D;
	    _iAddRenderable(renderable: IRenderable): IRenderable;
	    _iRemoveRenderable(renderable: IRenderable): IRenderable;
	    _iInvalidateRenderableGeometry(): void;
	    _iCollectRenderable(rendererPool: IRendererPool): void;
	    _iGetExplicitMaterial(): MaterialBase;
	}
	export = SubMeshBase;
	
}

declare module "awayjs-display/lib/base/Transform" {
	import ColorTransform = require("awayjs-core/lib/geom/ColorTransform");
	import Matrix = require("awayjs-core/lib/geom/Matrix");
	import Matrix3D = require("awayjs-core/lib/geom/Matrix3D");
	import Rectangle = require("awayjs-core/lib/geom/Rectangle");
	import Vector3D = require("awayjs-core/lib/geom/Vector3D");
	import PerspectiveProjection = require("awayjs-core/lib/projections/PerspectiveProjection");
	import DisplayObject = require("awayjs-display/lib/base/DisplayObject");
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
	class Transform {
	    private _displayObject;
	    private _concatenatedColorTransform;
	    private _concatenatedMatrix;
	    private _pixelBounds;
	    _position: Vector3D;
	    /**
	     *
	     */
	    backVector: Vector3D;
	    /**
	     * A ColorTransform object containing values that universally adjust the
	     * colors in the display object.
	     *
	     * @throws TypeError The colorTransform is null when being set
	     */
	    colorTransform: ColorTransform;
	    /**
	     * A ColorTransform object representing the combined color transformations
	     * applied to the display object and all of its parent objects, back to the
	     * root level. If different color transformations have been applied at
	     * different levels, all of those transformations are concatenated into one
	     * ColorTransform object for this property.
	     */
	    concatenatedColorTransform: ColorTransform;
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
	    concatenatedMatrix: Matrix;
	    /**
	     *
	     */
	    downVector: Vector3D;
	    /**
	     *
	     */
	    forwardVector: Vector3D;
	    /**
	     *
	     */
	    leftVector: Vector3D;
	    /**
	     * A Matrix object containing values that alter the scaling, rotation, and
	     * translation of the display object.
	     *
	     * <p>If the <code>matrix</code> property is set to a value(not
	     * <code>null</code>), the <code>matrix3D</code> property is
	     * <code>null</code>. And if the <code>matrix3D</code> property is set to a
	     * value(not <code>null</code>), the <code>matrix</code> property is
	     * <code>null</code>.</p>
	     *
	     * @throws TypeError The matrix is null when being set
	     */
	    matrix: Matrix;
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
	    matrix3D: Matrix3D;
	    /**
	     * Provides access to the PerspectiveProjection object of a three-dimensional
	     * display object. The PerspectiveProjection object can be used to modify the
	     * perspective transformation of the stage or to assign a perspective
	     * transformation to all the three-dimensional children of a display object.
	     *
	     * <p>Based on the field of view and aspect ratio(dimensions) of the stage,
	     * a default PerspectiveProjection object is assigned to the root object.</p>
	     */
	    perspectiveProjection: PerspectiveProjection;
	    /**
	     * A Rectangle object that defines the bounding rectangle of the display
	     * object on the stage.
	     */
	    pixelBounds: Rectangle;
	    /**
	     * Defines the position of the 3d object, relative to the local coordinates of the parent <code>ObjectContainer3D</code>.
	     */
	    position: Vector3D;
	    /**
	     *
	     */
	    rightVector: Vector3D;
	    /**
	     * Defines the rotation of the 3d object, relative to the local coordinates of the parent <code>ObjectContainer3D</code>.
	     */
	    rotation: Vector3D;
	    /**
	     * Defines the scale of the 3d object, relative to the local coordinates of the parent <code>ObjectContainer3D</code>.
	     */
	    scale: Vector3D;
	    /**
	     *
	     */
	    upVector: Vector3D;
	    constructor(displayObject: DisplayObject);
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
	    getRelativeMatrix3D(relativeTo: DisplayObject): Matrix3D;
	    /**
	     * Moves the 3d object forwards along it's local z axis
	     *
	     * @param    distance    The length of the movement
	     */
	    moveForward(distance: number): void;
	    /**
	     * Moves the 3d object backwards along it's local z axis
	     *
	     * @param    distance    The length of the movement
	     */
	    moveBackward(distance: number): void;
	    /**
	     * Moves the 3d object backwards along it's local x axis
	     *
	     * @param    distance    The length of the movement
	     */
	    moveLeft(distance: number): void;
	    /**
	     * Moves the 3d object forwards along it's local x axis
	     *
	     * @param    distance    The length of the movement
	     */
	    moveRight(distance: number): void;
	    /**
	     * Moves the 3d object forwards along it's local y axis
	     *
	     * @param    distance    The length of the movement
	     */
	    moveUp(distance: number): void;
	    /**
	     * Moves the 3d object backwards along it's local y axis
	     *
	     * @param    distance    The length of the movement
	     */
	    moveDown(distance: number): void;
	}
	export = Transform;
	
}

declare module "awayjs-display/lib/base/TriangleSubMesh" {
	import TriangleSubGeometry = require("awayjs-core/lib/data/TriangleSubGeometry");
	import ISubMesh = require("awayjs-display/lib/base/ISubMesh");
	import SubMeshBase = require("awayjs-display/lib/base/SubMeshBase");
	import IRendererPool = require("awayjs-display/lib/pool/IRendererPool");
	import Mesh = require("awayjs-display/lib/entities/Mesh");
	import MaterialBase = require("awayjs-display/lib/materials/MaterialBase");
	/**
	 * TriangleSubMesh wraps a TriangleSubGeometry as a scene graph instantiation. A TriangleSubMesh is owned by a Mesh object.
	 *
	 *
	 * @see away.base.TriangleSubGeometry
	 * @see away.entities.Mesh
	 *
	 * @class away.base.TriangleSubMesh
	 */
	class TriangleSubMesh extends SubMeshBase implements ISubMesh {
	    static assetType: string;
	    static geometryType: string;
	    private _subGeometry;
	    /**
	     *
	     */
	    assetType: string;
	    /**
	     * The TriangleSubGeometry object which provides the geometry data for this TriangleSubMesh.
	     */
	    subGeometry: TriangleSubGeometry;
	    /**
	     * Creates a new TriangleSubMesh object
	     * @param subGeometry The TriangleSubGeometry object which provides the geometry data for this TriangleSubMesh.
	     * @param parentMesh The Mesh object to which this TriangleSubMesh belongs.
	     * @param material An optional material used to render this TriangleSubMesh.
	     */
	    constructor(subGeometry: TriangleSubGeometry, parentMesh: Mesh, material?: MaterialBase);
	    /**
	     *
	     */
	    dispose(): void;
	    _iCollectRenderable(rendererPool: IRendererPool): void;
	}
	export = TriangleSubMesh;
	
}

declare module "awayjs-display/lib/bounds/AxisAlignedBoundingBox" {
	import Plane3D = require("awayjs-core/lib/geom/Plane3D");
	import Vector3D = require("awayjs-core/lib/geom/Vector3D");
	import BoundingVolumeBase = require("awayjs-display/lib/bounds/BoundingVolumeBase");
	import IEntity = require("awayjs-display/lib/entities/IEntity");
	import Mesh = require("awayjs-display/lib/entities/Mesh");
	/**
	 * AxisAlignedBoundingBox represents a bounding box volume that has its planes aligned to the local coordinate axes of the bounded object.
	 * This is useful for most meshes.
	 */
	class AxisAlignedBoundingBox extends BoundingVolumeBase {
	    private _box;
	    private _x;
	    private _y;
	    private _z;
	    private _width;
	    private _height;
	    private _depth;
	    private _centerX;
	    private _centerY;
	    private _centerZ;
	    private _halfExtentsX;
	    private _halfExtentsY;
	    private _halfExtentsZ;
	    private _prefab;
	    /**
	     * Creates a new <code>AxisAlignedBoundingBox</code> object.
	     */
	    constructor(entity: IEntity);
	    /**
	     * @inheritDoc
	     */
	    nullify(): void;
	    /**
	     * @inheritDoc
	     */
	    isInFrustum(planes: Array<Plane3D>, numPlanes: number): boolean;
	    rayIntersection(position: Vector3D, direction: Vector3D, targetNormal: Vector3D): number;
	    classifyToPlane(plane: Plane3D): number;
	    _pUpdate(): void;
	    _pCreateBoundsPrimitive(): Mesh;
	}
	export = AxisAlignedBoundingBox;
	
}

declare module "awayjs-display/lib/bounds/BoundingSphere" {
	import Plane3D = require("awayjs-core/lib/geom/Plane3D");
	import Vector3D = require("awayjs-core/lib/geom/Vector3D");
	import BoundingVolumeBase = require("awayjs-display/lib/bounds/BoundingVolumeBase");
	import IEntity = require("awayjs-display/lib/entities/IEntity");
	import Mesh = require("awayjs-display/lib/entities/Mesh");
	class BoundingSphere extends BoundingVolumeBase {
	    private _sphere;
	    private _radius;
	    private _centerX;
	    private _centerY;
	    private _centerZ;
	    private _prefab;
	    constructor(entity: IEntity);
	    nullify(): void;
	    isInFrustum(planes: Array<Plane3D>, numPlanes: number): boolean;
	    rayIntersection(position: Vector3D, direction: Vector3D, targetNormal: Vector3D): number;
	    classifyToPlane(plane: Plane3D): number;
	    _pUpdate(): void;
	    _pCreateBoundsPrimitive(): Mesh;
	}
	export = BoundingSphere;
	
}

declare module "awayjs-display/lib/bounds/BoundingVolumeBase" {
	import Plane3D = require("awayjs-core/lib/geom/Plane3D");
	import Vector3D = require("awayjs-core/lib/geom/Vector3D");
	import IEntity = require("awayjs-display/lib/entities/IEntity");
	import Mesh = require("awayjs-display/lib/entities/Mesh");
	class BoundingVolumeBase {
	    _pEntity: IEntity;
	    _pBoundsPrimitive: Mesh;
	    _pInvalidated: boolean;
	    constructor(entity: any);
	    boundsPrimitive: IEntity;
	    nullify(): void;
	    isInFrustum(planes: Array<Plane3D>, numPlanes: number): boolean;
	    clone(): BoundingVolumeBase;
	    rayIntersection(position: Vector3D, direction: Vector3D, targetNormal: Vector3D): number;
	    classifyToPlane(plane: Plane3D): number;
	    _pUpdate(): void;
	    invalidate(): void;
	    _pCreateBoundsPrimitive(): Mesh;
	}
	export = BoundingVolumeBase;
	
}

declare module "awayjs-display/lib/bounds/BoundsType" {
	/**
	 *
	 */
	class BoundsType {
	    /**
	     *
	     */
	    static SPHERE: string;
	    /**
	     *
	     */
	    static AXIS_ALIGNED_BOX: string;
	    /**
	     *
	     */
	    static NULL: string;
	}
	export = BoundsType;
	
}

declare module "awayjs-display/lib/bounds/NullBounds" {
	import Plane3D = require("awayjs-core/lib/geom/Plane3D");
	import BoundingVolumeBase = require("awayjs-display/lib/bounds/BoundingVolumeBase");
	class NullBounds extends BoundingVolumeBase {
	    private _alwaysIn;
	    constructor(alwaysIn?: boolean);
	    clone(): BoundingVolumeBase;
	    isInFrustum(planes: Array<Plane3D>, numPlanes: number): boolean;
	    classifyToPlane(plane: Plane3D): number;
	}
	export = NullBounds;
	
}

declare module "awayjs-display/lib/containers/DisplayObjectContainer" {
	import Point = require("awayjs-core/lib/geom/Point");
	import IAsset = require("awayjs-core/lib/library/IAsset");
	import DisplayObject = require("awayjs-display/lib/base/DisplayObject");
	import Partition = require("awayjs-display/lib/partition/Partition");
	import Scene = require("awayjs-display/lib/containers/Scene");
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
	class DisplayObjectContainer extends DisplayObject implements IAsset {
	    static assetType: string;
	    private _mouseChildren;
	    private _children;
	    _iIsRoot: boolean;
	    /**
	     *
	     */
	    assetType: string;
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
	    mouseChildren: boolean;
	    /**
	     * Returns the number of children of this object.
	     */
	    numChildren: number;
	    /**
	     * Determines whether the children of the object are tab enabled. Enables or
	     * disables tabbing for the children of the object. The default is
	     * <code>true</code>.
	     *
	     * <p><b>Note:</b> Do not use the <code>tabChildren</code> property with
	     * Flex. Instead, use the
	     * <code>mx.core.UIComponent.hasFocusableChildren</code> property.</p>
	     *
	     * @throws IllegalOperationError Calling this property of the Stage object
	     *                               throws an exception. The Stage object does
	     *                               not implement this property.
	     */
	    tabChildren: boolean;
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
	    constructor();
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
	    addChild(child: DisplayObject): DisplayObject;
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
	    addChildAt(child: DisplayObject, index: number): DisplayObject;
	    addChildren(...childarray: Array<DisplayObject>): void;
	    /**
	     *
	     */
	    clone(): DisplayObject;
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
	    contains(child: DisplayObject): boolean;
	    /**
	     *
	     */
	    disposeWithChildren(): void;
	    /**
	     * Returns the child display object instance that exists at the specified
	     * index.
	     *
	     * @param index The index position of the child object.
	     * @return The child display object at the specified index position.
	     * @throws RangeError    Throws if the index does not exist in the child
	     *                       list.
	     */
	    getChildAt(index: number): DisplayObject;
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
	    getChildByName(name: string): DisplayObject;
	    /**
	     * Returns the index position of a <code>child</code> DisplayObject instance.
	     *
	     * @param child The DisplayObject instance to identify.
	     * @return The index position of the child display object to identify.
	     * @throws ArgumentError Throws if the child parameter is not a child of this
	     *                       object.
	     */
	    getChildIndex(child: DisplayObject): number;
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
	    getObjectsUnderPoint(point: Point): Array<DisplayObject>;
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
	    removeChild(child: DisplayObject): DisplayObject;
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
	    removeChildAt(index: number): DisplayObject;
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
	    removeChildren(beginIndex?: number, endIndex?: number): void;
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
	    setChildIndex(child: DisplayObject, index: number): void;
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
	    swapChildren(child1: DisplayObject, child2: DisplayObject): void;
	    /**
	     * Swaps the z-order(front-to-back order) of the child objects at the two
	     * specified index positions in the child list. All other child objects in
	     * the display object container remain in the same index positions.
	     *
	     * @param index1 The index position of the first child object.
	     * @param index2 The index position of the second child object.
	     * @throws RangeError If either index does not exist in the child list.
	     */
	    swapChildrenAt(index1: number, index2: number): void;
	    /**
	     * @protected
	     */
	    pInvalidateSceneTransform(): void;
	    /**
	     * @protected
	     */
	    _pUpdateImplicitMouseEnabled(value: boolean): void;
	    /**
	     * @protected
	     */
	    _pUpdateImplicitVisibility(value: boolean): void;
	    /**
	     * @protected
	     */
	    _pUpdateImplicitPartition(value: Partition, scene: Scene): void;
	    /**
	     * @private
	     *
	     * @param child
	     */
	    private removeChildInternal(child);
	}
	export = DisplayObjectContainer;
	
}

declare module "awayjs-display/lib/containers/Loader" {
	import AssetLoaderContext = require("awayjs-core/lib/library/AssetLoaderContext");
	import AssetLoaderToken = require("awayjs-core/lib/library/AssetLoaderToken");
	import URLRequest = require("awayjs-core/lib/net/URLRequest");
	import ParserBase = require("awayjs-core/lib/parsers/ParserBase");
	import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
	import DisplayObject = require("awayjs-display/lib/base/DisplayObject");
	import LoaderInfo = require("awayjs-display/lib/base/LoaderInfo");
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
	class Loader extends DisplayObjectContainer {
	    /**
	     * Dispatched when any asset finishes parsing. Also see specific events for each
	     * individual asset type (meshes, materials et c.)
	     *
	     * @eventType AssetEvent
	     */
	    /**
	     * Dispatched when a full resource (including dependencies) finishes loading.
	     *
	     * @eventType LoaderEvent
	     */
	    private _loadingSessions;
	    private _useAssetLib;
	    private _assetLibId;
	    private _onResourceCompleteDelegate;
	    private _onAssetCompleteDelegate;
	    private _content;
	    private _contentLoaderInfo;
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
	    content: DisplayObject;
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
	    contentLoaderInfo: LoaderInfo;
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
	    constructor(useAssetLibrary?: boolean, assetLibraryId?: string);
	    /**
	     * Cancels a <code>load()</code> method operation that is currently in
	     * progress for the Loader instance.
	     *
	     */
	    close(): void;
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
	    load(request: URLRequest, context?: AssetLoaderContext, ns?: string, parser?: ParserBase): AssetLoaderToken;
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
	    loadData(data: any, context?: AssetLoaderContext, ns?: string, parser?: ParserBase): AssetLoaderToken;
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
	    unload(): void;
	    /**
	     * Enables a specific parser.
	     * When no specific parser is set for a loading/parsing opperation,
	     * loader3d can autoselect the correct parser to use.
	     * A parser must have been enabled, to be considered when autoselecting the parser.
	     *
	     * @param parserClass The parser class to enable.
	     * @see away.parsers.Parsers
	     */
	    static enableParser(parserClass: Object): void;
	    /**
	     * Enables a list of parsers.
	     * When no specific parser is set for a loading/parsing opperation,
	     * loader3d can autoselect the correct parser to use.
	     * A parser must have been enabled, to be considered when autoselecting the parser.
	     *
	     * @param parserClasses A Vector of parser classes to enable.
	     * @see away.parsers.Parsers
	     */
	    static enableParsers(parserClasses: Array<Object>): void;
	    private removeListeners(dispatcher);
	    private onAssetComplete(event);
	    /**
	     * Called when an error occurs during loading
	     */
	    private onLoadError(event);
	    /**
	     * Called when a an error occurs during parsing
	     */
	    private onParseError(event);
	    /**
	     * Called when the resource and all of its dependencies was retrieved.
	     */
	    private onResourceComplete(event);
	}
	export = Loader;
	
}

declare module "awayjs-display/lib/containers/Scene" {
	import EventDispatcher = require("awayjs-core/lib/events/EventDispatcher");
	import DisplayObject = require("awayjs-display/lib/base/DisplayObject");
	import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
	import Partition = require("awayjs-display/lib/partition/Partition");
	import CollectorBase = require("awayjs-display/lib/traverse/CollectorBase");
	class Scene extends EventDispatcher {
	    private _expandedPartitions;
	    private _partitions;
	    private _partition;
	    _iSceneGraphRoot: DisplayObjectContainer;
	    _iCollectionMark: number;
	    constructor();
	    traversePartitions(traverser: CollectorBase): void;
	    partition: Partition;
	    contains(child: DisplayObject): boolean;
	    addChild(child: DisplayObject): DisplayObject;
	    removeChild(child: DisplayObject): void;
	    removeChildAt(index: number): void;
	    getChildAt(index: number): DisplayObject;
	    numChildren: number;
	    /**
	     * @internal
	     */
	    _iRegisterPartition(partition: Partition): void;
	    /**
	     * @internal
	     */
	    _iUnregisterPartition(partition: Partition): void;
	}
	export = Scene;
	
}

declare module "awayjs-display/lib/containers/View" {
	import Vector3D = require("awayjs-core/lib/geom/Vector3D");
	import Scene = require("awayjs-display/lib/containers/Scene");
	import IPicker = require("awayjs-display/lib/pick/IPicker");
	import IRenderer = require("awayjs-display/lib/render/IRenderer");
	import CollectorBase = require("awayjs-display/lib/traverse/CollectorBase");
	import Camera = require("awayjs-display/lib/entities/Camera");
	class View {
	    _pScene: Scene;
	    _pCamera: Camera;
	    _pEntityCollector: CollectorBase;
	    _pRenderer: IRenderer;
	    private _aspectRatio;
	    private _width;
	    private _height;
	    private _time;
	    private _deltaTime;
	    private _backgroundColor;
	    private _backgroundAlpha;
	    private _viewportDirty;
	    private _scissorDirty;
	    private _onScenePartitionChangedDelegate;
	    private _onProjectionChangedDelegate;
	    private _onViewportUpdatedDelegate;
	    private _onScissorUpdatedDelegate;
	    private _mouseManager;
	    private _mousePicker;
	    private _htmlElement;
	    private _shareContext;
	    _pMouseX: number;
	    _pMouseY: number;
	    constructor(renderer: IRenderer, scene?: Scene, camera?: Camera);
	    /**
	     *
	     * @param e
	     */
	    private onScenePartitionChanged(event);
	    layeredView: boolean;
	    mouseX: number;
	    mouseY: number;
	    /**
	     *
	     */
	    htmlElement: HTMLDivElement;
	    /**
	     *
	     */
	    renderer: IRenderer;
	    /**
	     *
	     */
	    shareContext: boolean;
	    /**
	     *
	     */
	    backgroundColor: number;
	    /**
	     *
	     * @returns {number}
	     */
	    /**
	     *
	     * @param value
	     */
	    backgroundAlpha: number;
	    /**
	     *
	     * @returns {Camera3D}
	     */
	    /**
	     * Set camera that's used to render the scene for this viewport
	     */
	    camera: Camera;
	    /**
	     *
	     * @returns {away.containers.Scene3D}
	     */
	    /**
	     * Set the scene that's used to render for this viewport
	     */
	    scene: Scene;
	    /**
	     *
	     * @returns {number}
	     */
	    deltaTime: number;
	    /**
	     *
	     */
	    width: number;
	    /**
	     *
	     */
	    height: number;
	    /**
	     *
	     */
	    mousePicker: IPicker;
	    /**
	     *
	     */
	    x: number;
	    /**
	     *
	     */
	    y: number;
	    /**
	     *
	     */
	    visible: boolean;
	    /**
	     *
	     * @returns {number}
	     */
	    renderedFacesCount: number;
	    /**
	     * Renders the view.
	     */
	    render(): void;
	    /**
	     *
	     */
	    pUpdateTime(): void;
	    /**
	     *
	     */
	    dispose(): void;
	    /**
	     *
	     */
	    iEntityCollector: CollectorBase;
	    /**
	     *
	     */
	    private onProjectionChanged(event);
	    /**
	     *
	     */
	    private onViewportUpdated(event);
	    /**
	     *
	     */
	    private onScissorUpdated(event);
	    project(point3d: Vector3D): Vector3D;
	    unproject(sX: number, sY: number, sZ: number): Vector3D;
	    getRay(sX: number, sY: number, sZ: number): Vector3D;
	    forceMouseMove: boolean;
	    updateCollider(): void;
	}
	export = View;
	
}

declare module "awayjs-display/lib/controllers/ControllerBase" {
	import DisplayObject = require("awayjs-display/lib/base/DisplayObject");
	class ControllerBase {
	    _pAutoUpdate: boolean;
	    _pTargetObject: DisplayObject;
	    constructor(targetObject?: DisplayObject);
	    pNotifyUpdate(): void;
	    targetObject: DisplayObject;
	    autoUpdate: boolean;
	    update(interpolate?: boolean): void;
	}
	export = ControllerBase;
	
}

declare module "awayjs-display/lib/controllers/FirstPersonController" {
	import ControllerBase = require("awayjs-display/lib/controllers/ControllerBase");
	import DisplayObject = require("awayjs-display/lib/base/DisplayObject");
	/**
	 * Extended camera used to hover round a specified target object.
	 *
	 * @see    away3d.containers.View3D
	 */
	class FirstPersonController extends ControllerBase {
	    _iCurrentPanAngle: number;
	    _iCurrentTiltAngle: number;
	    private _panAngle;
	    private _tiltAngle;
	    private _minTiltAngle;
	    private _maxTiltAngle;
	    private _steps;
	    private _walkIncrement;
	    private _strafeIncrement;
	    private _wrapPanAngle;
	    fly: boolean;
	    /**
	     * Fractional step taken each time the <code>hover()</code> method is called. Defaults to 8.
	     *
	     * Affects the speed at which the <code>tiltAngle</code> and <code>panAngle</code> resolve to their targets.
	     *
	     * @see    #tiltAngle
	     * @see    #panAngle
	     */
	    steps: number;
	    /**
	     * Rotation of the camera in degrees around the y axis. Defaults to 0.
	     */
	    panAngle: number;
	    /**
	     * Elevation angle of the camera in degrees. Defaults to 90.
	     */
	    tiltAngle: number;
	    /**
	     * Minimum bounds for the <code>tiltAngle</code>. Defaults to -90.
	     *
	     * @see    #tiltAngle
	     */
	    minTiltAngle: number;
	    /**
	     * Maximum bounds for the <code>tiltAngle</code>. Defaults to 90.
	     *
	     * @see    #tiltAngle
	     */
	    maxTiltAngle: number;
	    /**
	     * Defines whether the value of the pan angle wraps when over 360 degrees or under 0 degrees. Defaults to false.
	     */
	    wrapPanAngle: boolean;
	    /**
	     * Creates a new <code>HoverController</code> object.
	     */
	    constructor(targetObject?: DisplayObject, panAngle?: number, tiltAngle?: number, minTiltAngle?: number, maxTiltAngle?: number, steps?: number, wrapPanAngle?: boolean);
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
	    update(interpolate?: boolean): void;
	    incrementWalk(val: number): void;
	    incrementStrafe(val: number): void;
	}
	export = FirstPersonController;
	
}

declare module "awayjs-display/lib/controllers/FollowController" {
	import DisplayObject = require("awayjs-display/lib/base/DisplayObject");
	import HoverController = require("awayjs-display/lib/controllers/HoverController");
	/**
	 * Controller used to follow behind an object on the XZ plane, with an optional
	 * elevation (tiltAngle).
	 *
	 * @see    away3d.containers.View3D
	 */
	class FollowController extends HoverController {
	    constructor(targetObject?: DisplayObject, lookAtObject?: DisplayObject, tiltAngle?: number, distance?: number);
	    update(interpolate?: boolean): void;
	}
	export = FollowController;
	
}

declare module "awayjs-display/lib/controllers/HoverController" {
	import DisplayObject = require("awayjs-display/lib/base/DisplayObject");
	import LookAtController = require("awayjs-display/lib/controllers/LookAtController");
	/**
	 * Extended camera used to hover round a specified target object.
	 *
	 * @see    away.containers.View
	 */
	class HoverController extends LookAtController {
	    _iCurrentPanAngle: number;
	    _iCurrentTiltAngle: number;
	    private _panAngle;
	    private _tiltAngle;
	    private _distance;
	    private _minPanAngle;
	    private _maxPanAngle;
	    private _minTiltAngle;
	    private _maxTiltAngle;
	    private _steps;
	    private _yFactor;
	    private _wrapPanAngle;
	    private _upAxis;
	    /**
	     * Fractional step taken each time the <code>hover()</code> method is called. Defaults to 8.
	     *
	     * Affects the speed at which the <code>tiltAngle</code> and <code>panAngle</code> resolve to their targets.
	     *
	     * @see    #tiltAngle
	     * @see    #panAngle
	     */
	    steps: number;
	    /**
	     * Rotation of the camera in degrees around the y axis. Defaults to 0.
	     */
	    panAngle: number;
	    /**
	     * Elevation angle of the camera in degrees. Defaults to 90.
	     */
	    tiltAngle: number;
	    /**
	     * Distance between the camera and the specified target. Defaults to 1000.
	     */
	    distance: number;
	    /**
	     * Minimum bounds for the <code>panAngle</code>. Defaults to -Infinity.
	     *
	     * @see    #panAngle
	     */
	    minPanAngle: number;
	    /**
	     * Maximum bounds for the <code>panAngle</code>. Defaults to Infinity.
	     *
	     * @see    #panAngle
	     */
	    maxPanAngle: number;
	    /**
	     * Minimum bounds for the <code>tiltAngle</code>. Defaults to -90.
	     *
	     * @see    #tiltAngle
	     */
	    minTiltAngle: number;
	    /**
	     * Maximum bounds for the <code>tiltAngle</code>. Defaults to 90.
	     *
	     * @see    #tiltAngle
	     */
	    maxTiltAngle: number;
	    /**
	     * Fractional difference in distance between the horizontal camera orientation and vertical camera orientation. Defaults to 2.
	     *
	     * @see    #distance
	     */
	    yFactor: number;
	    /**
	     * Defines whether the value of the pan angle wraps when over 360 degrees or under 0 degrees. Defaults to false.
	     */
	    wrapPanAngle: boolean;
	    /**
	     * Creates a new <code>HoverController</code> object.
	     */
	    constructor(targetObject?: DisplayObject, lookAtObject?: DisplayObject, panAngle?: number, tiltAngle?: number, distance?: number, minTiltAngle?: number, maxTiltAngle?: number, minPanAngle?: number, maxPanAngle?: number, steps?: number, yFactor?: number, wrapPanAngle?: boolean);
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
	    update(interpolate?: boolean): void;
	}
	export = HoverController;
	
}

declare module "awayjs-display/lib/controllers/LookAtController" {
	import Vector3D = require("awayjs-core/lib/geom/Vector3D");
	import DisplayObject = require("awayjs-display/lib/base/DisplayObject");
	import ControllerBase = require("awayjs-display/lib/controllers/ControllerBase");
	class LookAtController extends ControllerBase {
	    _pLookAtPosition: Vector3D;
	    _pLookAtObject: DisplayObject;
	    _pOrigin: Vector3D;
	    private _onLookAtObjectChangedDelegate;
	    constructor(targetObject?: DisplayObject, lookAtObject?: DisplayObject);
	    lookAtPosition: Vector3D;
	    lookAtObject: DisplayObject;
	    update(interpolate?: boolean): void;
	    private onLookAtObjectChanged(event);
	}
	export = LookAtController;
	
}

declare module "awayjs-display/lib/controllers/SpringController" {
	import Vector3D = require("awayjs-core/lib/geom/Vector3D");
	import DisplayObject = require("awayjs-display/lib/base/DisplayObject");
	import LookAtController = require("awayjs-display/lib/controllers/LookAtController");
	/**
	 * Uses spring physics to animate the target object towards a position that is
	 * defined as the lookAtTarget object's position plus the vector defined by the
	 * positionOffset property.
	 */
	class SpringController extends LookAtController {
	    private _velocity;
	    private _dv;
	    private _stretch;
	    private _force;
	    private _acceleration;
	    private _desiredPosition;
	    /**
	     * Stiffness of the spring, how hard is it to extend. The higher it is, the more "fixed" the cam will be.
	     * A number between 1 and 20 is recommended.
	     */
	    stiffness: number;
	    /**
	     * Damping is the spring internal friction, or how much it resists the "boinggggg" effect. Too high and you'll lose it!
	     * A number between 1 and 20 is recommended.
	     */
	    damping: number;
	    /**
	     * Mass of the camera, if over 120 and it'll be very heavy to move.
	     */
	    mass: number;
	    /**
	     * Offset of spring center from target in target object space, ie: Where the camera should ideally be in the target object space.
	     */
	    positionOffset: Vector3D;
	    constructor(targetObject?: DisplayObject, lookAtObject?: DisplayObject, stiffness?: number, mass?: number, damping?: number);
	    update(interpolate?: boolean): void;
	}
	export = SpringController;
	
}

declare module "awayjs-display/lib/draw/CapsStyle" {
	/**
	 * The CapsStyle class is an enumeration of constant values that specify the
	 * caps style to use in drawing lines. The constants are provided for use as
	 * values in the <code>caps</code> parameter of the
	 * <code>flash.display.Graphics.lineStyle()</code> method. You can specify the
	 * following three types of caps:
	 */
	class CapsStyle {
	    /**
	     * Used to specify round caps in the <code>caps</code> parameter of the
	     * <code>flash.display.Graphics.lineStyle()</code> method.
	     */
	    static ROUND: string;
	    /**
	     * Used to specify no caps in the <code>caps</code> parameter of the
	     * <code>flash.display.Graphics.lineStyle()</code> method.
	     */
	    static NONE: string;
	    /**
	     * Used to specify square caps in the <code>caps</code> parameter of the
	     * <code>flash.display.Graphics.lineStyle()</code> method.
	     */
	    static SQUARE: string;
	}
	export = CapsStyle;
	
}

declare module "awayjs-display/lib/draw/GradientType" {
	/**
	 * The GradientType class provides values for the <code>type</code> parameter
	 * in the <code>beginGradientFill()</code> and
	 * <code>lineGradientStyle()</code> methods of the flash.display.Graphics
	 * class.
	 */
	class GradientType {
	    /**
	     * Value used to specify a linear gradient fill.
	     */
	    static LINEAR: string;
	    /**
	     * Value used to specify a radial gradient fill.
	     */
	    static RADIAL: string;
	}
	export = GradientType;
	
}

declare module "awayjs-display/lib/draw/Graphics" {
	import BitmapData = require("awayjs-core/lib/data/BitmapData");
	import Matrix = require("awayjs-core/lib/geom/Matrix");
	import CapsStyle = require("awayjs-display/lib/draw/CapsStyle");
	import GradientType = require("awayjs-display/lib/draw/GradientType");
	import GraphicsPathWinding = require("awayjs-display/lib/draw/GraphicsPathWinding");
	import IGraphicsData = require("awayjs-display/lib/draw/IGraphicsData");
	import InterpolationMethod = require("awayjs-display/lib/draw/InterpolationMethod");
	import JointStyle = require("awayjs-display/lib/draw/JointStyle");
	import LineScaleMode = require("awayjs-display/lib/draw/LineScaleMode");
	import TriangleCulling = require("awayjs-display/lib/draw/TriangleCulling");
	import SpreadMethod = require("awayjs-display/lib/draw/SpreadMethod");
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
	class Graphics {
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
	    beginBitmapFill(bitmap: BitmapData, matrix?: Matrix, repeat?: boolean, smooth?: boolean): void;
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
	    beginFill(color: number, alpha?: number): void;
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
	    beginGradientFill(type: GradientType, colors: Array<number>, alphas: Array<number>, ratios: Array<number>, matrix?: Matrix, spreadMethod?: string, interpolationMethod?: string, focalPointRatio?: number): void;
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
	    /**
	     * Clears the graphics that were drawn to this Graphics object, and resets
	     * fill and line style settings.
	     *
	     */
	    clear(): void;
	    /**
	     * Copies all of drawing commands from the source Graphics object into the
	     * calling Graphics object.
	     *
	     * @param sourceGraphics The Graphics object from which to copy the drawing
	     *                       commands.
	     */
	    copyFrom(sourceGraphics: Graphics): void;
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
	    cubicCurveTo(controlX1: number, controlY1: number, controlX2: number, controlY2: number, anchorX: number, anchorY: number): void;
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
	    curveTo(controlX: number, controlY: number, anchorX: number, anchorY: number): void;
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
	    drawCircle(x: number, y: number, radius: number): void;
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
	    drawEllipse(x: number, y: number, width: number, height: number): void;
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
	    drawGraphicsData(graphicsData: Array<IGraphicsData>): void;
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
	    drawPath(commands: Array<number>, data: Array<number>, winding: GraphicsPathWinding): void;
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
	    drawRect(x: number, y: number, width: number, height: number): void;
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
	    drawRoundRect(x: number, y: number, width: number, height: number, ellipseWidth: number, ellipseHeight?: number): void;
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
	    drawTriangles(vertices: Array<number>, indices?: Array<number>, uvtData?: Array<number>, culling?: TriangleCulling): void;
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
	    endFill(): void;
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
	    lineBitmapStyle(bitmap: BitmapData, matrix?: Matrix, repeat?: boolean, smooth?: boolean): void;
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
	    lineGradientStyle(type: GradientType, colors: Array<number>, alphas: Array<number>, ratios: Array<number>, matrix?: Matrix, spreadMethod?: SpreadMethod, interpolationMethod?: InterpolationMethod, focalPointRatio?: number): void;
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
	    lineStyle(thickness?: number, color?: number, alpha?: number, pixelHinting?: boolean, scaleMode?: LineScaleMode, caps?: CapsStyle, joints?: JointStyle, miterLimit?: number): void;
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
	    lineTo(x: number, y: number): void;
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
	    moveTo(x: number, y: number): void;
	}
	export = Graphics;
	
}

declare module "awayjs-display/lib/draw/GraphicsPathWinding" {
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
	class GraphicsPathWinding {
	    static EVEN_ODD: string;
	    static NON_ZERO: string;
	}
	export = GraphicsPathWinding;
	
}

declare module "awayjs-display/lib/draw/IGraphicsData" {
	/**
	 * This interface is used to define objects that can be used as parameters in the
	 * <code>away.base.Graphics</code> methods, including fills, strokes, and paths. Use
	 * the implementor classes of this interface to create and manage drawing property
	 * data, and to reuse the same data for different instances. Then, use the methods of
	 * the Graphics class to render the drawing objects.
	 *
	 * @see away.base.Graphics.drawGraphicsData()
	 * @see away.base.Graphics.readGraphicsData()
	 */
	interface IGraphicsData {
	}
	export = IGraphicsData;
	
}

declare module "awayjs-display/lib/draw/InterpolationMethod" {
	/**
	 * The InterpolationMethod class provides values for the
	 * <code>interpolationMethod</code> parameter in the
	 * <code>Graphics.beginGradientFill()</code> and
	 * <code>Graphics.lineGradientStyle()</code> methods. This parameter
	 * determines the RGB space to use when rendering the gradient.
	 */
	class InterpolationMethod {
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
	    static LINEAR_RGB: string;
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
	    static RGB: string;
	}
	export = InterpolationMethod;
	
}

declare module "awayjs-display/lib/draw/JointStyle" {
	/**
	 * The JointStyle class is an enumeration of constant values that specify the
	 * joint style to use in drawing lines. These constants are provided for use
	 * as values in the <code>joints</code> parameter of the
	 * <code>flash.display.Graphics.lineStyle()</code> method. The method supports
	 * three types of joints: miter, round, and bevel, as the following example
	 * shows:
	 */
	class JointStyle {
	    /**
	     * Specifies beveled joints in the <code>joints</code> parameter of the
	     * <code>flash.display.Graphics.lineStyle()</code> method.
	     */
	    static BEVEL: string;
	    /**
	     * Specifies mitered joints in the <code>joints</code> parameter of the
	     * <code>flash.display.Graphics.lineStyle()</code> method.
	     */
	    static MITER: string;
	    /**
	     * Specifies round joints in the <code>joints</code> parameter of the
	     * <code>flash.display.Graphics.lineStyle()</code> method.
	     */
	    static ROUND: string;
	}
	export = JointStyle;
	
}

declare module "awayjs-display/lib/draw/LineScaleMode" {
	/**
	 * The LineScaleMode class provides values for the <code>scaleMode</code>
	 * parameter in the <code>Graphics.lineStyle()</code> method.
	 */
	class LineScaleMode {
	    /**
	     * With this setting used as the <code>scaleMode</code> parameter of the
	     * <code>lineStyle()</code> method, the thickness of the line scales
	     * <i>only</i> vertically. For example, consider the following circles, drawn
	     * with a one-pixel line, and each with the <code>scaleMode</code> parameter
	     * set to <code>LineScaleMode.VERTICAL</code>. The circle on the left is
	     * scaled only vertically, and the circle on the right is scaled both
	     * vertically and horizontally.
	     */
	    static HORIZONTAL: string;
	    /**
	     * With this setting used as the <code>scaleMode</code> parameter of the
	     * <code>lineStyle()</code> method, the thickness of the line never scales.
	     */
	    static NONE: string;
	    /**
	     * With this setting used as the <code>scaleMode</code> parameter of the
	     * <code>lineStyle()</code> method, the thickness of the line always scales
	     * when the object is scaled(the default).
	     */
	    static NORMAL: string;
	    /**
	     * With this setting used as the <code>scaleMode</code> parameter of the
	     * <code>lineStyle()</code> method, the thickness of the line scales
	     * <i>only</i> horizontally. For example, consider the following circles,
	     * drawn with a one-pixel line, and each with the <code>scaleMode</code>
	     * parameter set to <code>LineScaleMode.HORIZONTAL</code>. The circle on the
	     * left is scaled only horizontally, and the circle on the right is scaled
	     * both vertically and horizontally.
	     */
	    static VERTICAL: string;
	}
	export = LineScaleMode;
	
}

declare module "awayjs-display/lib/draw/PixelSnapping" {
	/**
	 * The PixelSnapping class is an enumeration of constant values for setting
	 * the pixel snapping options by using the <code>pixelSnapping</code> property
	 * of a Bitmap object.
	 */
	class PixelSnapping {
	    /**
	     * A constant value used in the <code>pixelSnapping</code> property of a
	     * Bitmap object to specify that the bitmap image is always snapped to the
	     * nearest pixel, independent of any transformation.
	     */
	    static ALWAYS: string;
	    /**
	     * A constant value used in the <code>pixelSnapping</code> property of a
	     * Bitmap object to specify that the bitmap image is snapped to the nearest
	     * pixel if it is drawn with no rotation or skew and it is drawn at a scale
	     * factor of 99.9% to 100.1%. If these conditions are satisfied, the image is
	     * drawn at 100% scale, snapped to the nearest pixel. Internally, this
	     * setting allows the image to be drawn as fast as possible by using the
	     * vector renderer.
	     */
	    static AUTO: string;
	    /**
	     * A constant value used in the <code>pixelSnapping</code> property of a
	     * Bitmap object to specify that no pixel snapping occurs.
	     */
	    static NEVER: string;
	}
	export = PixelSnapping;
	
}

declare module "awayjs-display/lib/draw/SpreadMethod" {
	/**
	 * The SpreadMethod class provides values for the <code>spreadMethod</code>
	 * parameter in the <code>beginGradientFill()</code> and
	 * <code>lineGradientStyle()</code> methods of the Graphics class.
	 *
	 * <p>The following example shows the same gradient fill using various spread
	 * methods:</p>
	 */
	class SpreadMethod {
	    /**
	     * Specifies that the gradient use the <i>pad</i> spread method.
	     */
	    static PAD: string;
	    /**
	     * Specifies that the gradient use the <i>reflect</i> spread method.
	     */
	    static REFLECT: string;
	    /**
	     * Specifies that the gradient use the <i>repeat</i> spread method.
	     */
	    static REPEAT: string;
	}
	export = SpreadMethod;
	
}

declare module "awayjs-display/lib/draw/TriangleCulling" {
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
	class TriangleCulling {
	    /**
	     * Specifies culling of all triangles facing toward the current view point.
	     */
	    static NEGATIVE: string;
	    /**
	     * Specifies no culling. All triangles in the path are rendered.
	     */
	    static NONE: string;
	    /**
	     * Specifies culling of all triangles facing away from the current view
	     * point. This is also known as backface culling.
	     */
	    static POSITIVE: string;
	}
	export = TriangleCulling;
	
}

declare module "awayjs-display/lib/entities/Billboard" {
	import BitmapData = require("awayjs-core/lib/data/BitmapData");
	import UVTransform = require("awayjs-core/lib/geom/UVTransform");
	import IAnimator = require("awayjs-display/lib/animators/IAnimator");
	import DisplayObject = require("awayjs-display/lib/base/DisplayObject");
	import IRenderableOwner = require("awayjs-display/lib/base/IRenderableOwner");
	import Partition = require("awayjs-display/lib/partition/Partition");
	import IRendererPool = require("awayjs-display/lib/pool/IRendererPool");
	import IEntity = require("awayjs-display/lib/entities/IEntity");
	import MaterialBase = require("awayjs-display/lib/materials/MaterialBase");
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
	class Billboard extends DisplayObject implements IEntity, IRenderableOwner {
	    static assetType: string;
	    private _animator;
	    private _billboardWidth;
	    private _billboardHeight;
	    private _material;
	    private _uvTransform;
	    private onSizeChangedDelegate;
	    /**
	     * Defines the animator of the mesh. Act on the mesh's geometry. Defaults to null
	     */
	    animator: IAnimator;
	    /**
	     *
	     */
	    assetType: string;
	    /**
	     * The BitmapData object being referenced.
	     */
	    bitmapData: BitmapData;
	    /**
	     *
	     */
	    billboardHeight: number;
	    /**
	     *
	     */
	    billboardWidth: number;
	    /**
	     *
	     */
	    material: MaterialBase;
	    /**
	     * Controls whether or not the Billboard object is snapped to the nearest pixel.
	     * This value is ignored in the native and HTML5 targets.
	     * The PixelSnapping class includes possible values:
	     * <ul>
	     *   <li><code>PixelSnapping.NEVER</code> - No pixel snapping occurs.</li>
	     *   <li><code>PixelSnapping.ALWAYS</code> - The image is always snapped to
	     * the nearest pixel, independent of transformation.</li>
	     *   <li><code>PixelSnapping.AUTO</code> - The image is snapped to the
	     * nearest pixel if it is drawn with no rotation or skew and it is drawn at a
	     * scale factor of 99.9% to 100.1%. If these conditions are satisfied, the
	     * bitmap image is drawn at 100% scale, snapped to the nearest pixel.
	     * When targeting Flash Player, this value allows the image to be drawn as fast
	     * as possible using the internal vector renderer.</li>
	     * </ul>
	     */
	    pixelSnapping: string;
	    /**
	     * Controls whether or not the bitmap is smoothed when scaled. If
	     * <code>true</code>, the bitmap is smoothed when scaled. If
	     * <code>false</code>, the bitmap is not smoothed when scaled.
	     */
	    smoothing: boolean;
	    /**
	     *
	     */
	    uvTransform: UVTransform;
	    constructor(material: MaterialBase, pixelSnapping?: string, smoothing?: boolean);
	    /**
	     * @protected
	     */
	    _pUpdateBoxBounds(): void;
	    /**
	     * //TODO
	     *
	     * @param shortestCollisionDistance
	     * @param findClosest
	     * @returns {boolean}
	     *
	     * @internal
	     */
	    _iTestCollision(shortestCollisionDistance: number, findClosest: boolean): boolean;
	    /**
	     * @private
	     */
	    private onSizeChanged(event);
	    _iCollectRenderables(rendererPool: IRendererPool): void;
	    _iCollectRenderable(rendererPool: IRendererPool): void;
	    _pRegisterEntity(partition: Partition): void;
	    _pUnregisterEntity(partition: Partition): void;
	}
	export = Billboard;
	
}

declare module "awayjs-display/lib/entities/Camera" {
	import Matrix3D = require("awayjs-core/lib/geom/Matrix3D");
	import Plane3D = require("awayjs-core/lib/geom/Plane3D");
	import Vector3D = require("awayjs-core/lib/geom/Vector3D");
	import IProjection = require("awayjs-core/lib/projections/IProjection");
	import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
	import Partition = require("awayjs-display/lib/partition/Partition");
	import IEntity = require("awayjs-display/lib/entities/IEntity");
	import IRendererPool = require("awayjs-display/lib/pool/IRendererPool");
	class Camera extends DisplayObjectContainer implements IEntity {
	    static assetType: string;
	    private _viewProjection;
	    private _viewProjectionDirty;
	    private _projection;
	    private _frustumPlanes;
	    private _frustumPlanesDirty;
	    private _onProjectionMatrixChangedDelegate;
	    constructor(projection?: IProjection);
	    assetType: string;
	    private onProjectionMatrixChanged(event);
	    frustumPlanes: Array<Plane3D>;
	    private updateFrustum();
	    /**
	     * @protected
	     */
	    pInvalidateSceneTransform(): void;
	    /**
	     *
	     */
	    projection: IProjection;
	    /**
	     *
	     */
	    viewProjection: Matrix3D;
	    /**
	     * Calculates the ray in scene space from the camera to the given normalized coordinates in screen space.
	     *
	     * @param nX The normalised x coordinate in screen space, -1 corresponds to the left edge of the viewport, 1 to the right.
	     * @param nY The normalised y coordinate in screen space, -1 corresponds to the top edge of the viewport, 1 to the bottom.
	     * @param sZ The z coordinate in screen space, representing the distance into the screen.
	     * @return The ray from the camera to the scene space position of the given screen coordinates.
	     */
	    getRay(nX: number, nY: number, sZ: number): Vector3D;
	    /**
	     * Calculates the normalised position in screen space of the given scene position.
	     *
	     * @param point3d the position vector of the scene coordinates to be projected.
	     * @return The normalised screen position of the given scene coordinates.
	     */
	    project(point3d: Vector3D): Vector3D;
	    /**
	     * Calculates the scene position of the given normalized coordinates in screen space.
	     *
	     * @param nX The normalised x coordinate in screen space, minus the originX offset of the projection property.
	     * @param nY The normalised y coordinate in screen space, minus the originY offset of the projection property.
	     * @param sZ The z coordinate in screen space, representing the distance into the screen.
	     * @return The scene position of the given screen coordinates.
	     */
	    unproject(nX: number, nY: number, sZ: number): Vector3D;
	    _iCollectRenderables(rendererPool: IRendererPool): void;
	    _iCollectRenderable(rendererPool: IRendererPool): void;
	    _pRegisterEntity(partition: Partition): void;
	    _pUnregisterEntity(partition: Partition): void;
	}
	export = Camera;
	
}

declare module "awayjs-display/lib/entities/DirectionalLight" {
	import Matrix3D = require("awayjs-core/lib/geom/Matrix3D");
	import Vector3D = require("awayjs-core/lib/geom/Vector3D");
	import LightBase = require("awayjs-display/lib/base/LightBase");
	import Partition = require("awayjs-display/lib/partition/Partition");
	import IRendererPool = require("awayjs-display/lib/pool/IRendererPool");
	import Camera = require("awayjs-display/lib/entities/Camera");
	import IEntity = require("awayjs-display/lib/entities/IEntity");
	import DirectionalShadowMapper = require("awayjs-display/lib/materials/shadowmappers/DirectionalShadowMapper");
	class DirectionalLight extends LightBase implements IEntity {
	    private _direction;
	    private _tmpLookAt;
	    private _sceneDirection;
	    private _pAabbPoints;
	    private _projAABBPoints;
	    constructor(xDir?: number, yDir?: number, zDir?: number);
	    sceneDirection: Vector3D;
	    direction: Vector3D;
	    pUpdateSceneTransform(): void;
	    pCreateShadowMapper(): DirectionalShadowMapper;
	    iGetObjectProjectionMatrix(entity: IEntity, camera: Camera, target?: Matrix3D): Matrix3D;
	    _iCollectRenderables(rendererPool: IRendererPool): void;
	    _pRegisterEntity(partition: Partition): void;
	    _pUnregisterEntity(partition: Partition): void;
	    /**
	     * //TODO
	     *
	     * @protected
	     */
	    _pUpdateBoxBounds(): void;
	}
	export = DirectionalLight;
	
}

declare module "awayjs-display/lib/entities/IEntity" {
	import Box = require("awayjs-core/lib/geom/Box");
	import Matrix3D = require("awayjs-core/lib/geom/Matrix3D");
	import Sphere = require("awayjs-core/lib/geom/Sphere");
	import Vector3D = require("awayjs-core/lib/geom/Vector3D");
	import IAsset = require("awayjs-core/lib/library/IAsset");
	import DisplayObject = require("awayjs-display/lib/base/DisplayObject");
	import Transform = require("awayjs-display/lib/base/Transform");
	import Scene = require("awayjs-display/lib/containers/Scene");
	import ControllerBase = require("awayjs-display/lib/controllers/ControllerBase");
	import Camera = require("awayjs-display/lib/entities/Camera");
	import Partition = require("awayjs-display/lib/partition/Partition");
	import EntityNode = require("awayjs-display/lib/partition/EntityNode");
	import IPickingCollider = require("awayjs-display/lib/pick/IPickingCollider");
	import PickingCollisionVO = require("awayjs-display/lib/pick/PickingCollisionVO");
	import IRendererPool = require("awayjs-display/lib/pool/IRendererPool");
	interface IEntity extends IAsset {
	    x: number;
	    y: number;
	    z: number;
	    rotationX: number;
	    rotationY: number;
	    rotationZ: number;
	    scaleX: number;
	    scaleY: number;
	    scaleZ: number;
	    /**
	     *
	     */
	    debugVisible: boolean;
	    /**
	     *
	     */
	    boundsType: string;
	    /**
	     *
	     */
	    castsShadows: boolean;
	    /**
	     *
	     */
	    inverseSceneTransform: Matrix3D;
	    /**
	     *
	     */
	    pickingCollider: IPickingCollider;
	    /**
	     *
	     */
	    transform: Transform;
	    /**
	     *
	     */
	    scene: Scene;
	    /**
	     *
	     */
	    scenePosition: Vector3D;
	    /**
	     *
	     */
	    sceneTransform: Matrix3D;
	    /**
	     *
	     */
	    zOffset: number;
	    /**
	     *
	     * @param targetCoordinateSpace
	     */
	    getBox(targetCoordinateSpace?: DisplayObject): Box;
	    /**
	     *
	     * @param targetCoordinateSpace
	     */
	    getSphere(targetCoordinateSpace?: DisplayObject): Sphere;
	    /**
	     *
	     *
	     * @param target
	     * @param upAxis
	     */
	    lookAt(target: Vector3D, upAxis?: Vector3D): any;
	    /**
	     * @internal
	     */
	    _iPickingCollisionVO: PickingCollisionVO;
	    /**
	     * @internal
	     */
	    _iController: ControllerBase;
	    /**
	     * @internal
	     */
	    _iAssignedPartition: Partition;
	    /**
	     * @internal
	     */
	    _iMaskID: number;
	    /**
	     * //TODO
	     *
	     * @param shortestCollisionDistance
	     * @param findClosest
	     * @returns {boolean}
	     *
	     * @internal
	     */
	    _iTestCollision(shortestCollisionDistance: number, findClosest: boolean): boolean;
	    /**
	     * @internal
	     */
	    _iIsMouseEnabled(): boolean;
	    /**
	     * @internal
	     */
	    _iIsVisible(): boolean;
	    /**
	     * @internal
	     */
	    _iInternalUpdate(): any;
	    /**
	     *
	     * @param entityNode
	     * @private
	     */
	    _iAddEntityNode(entityNode: EntityNode): EntityNode;
	    /**
	     *
	     * @param entityNode
	     * @private
	     */
	    _iRemoveEntityNode(entityNode: EntityNode): EntityNode;
	    /**
	     * The transformation matrix that transforms from model to world space, adapted with any special operations needed to render.
	     * For example, assuring certain alignedness which is not inherent in the scene transform. By default, this would
	     * return the scene transform.
	     */
	    getRenderSceneTransform(camera: Camera): Matrix3D;
	    /**
	     *
	     * @param renderer
	     * @private
	     */
	    _iCollectRenderables(rendererPool: IRendererPool): any;
	}
	export = IEntity;
	
}

declare module "awayjs-display/lib/entities/LightProbe" {
	import Matrix3D = require("awayjs-core/lib/geom/Matrix3D");
	import LightBase = require("awayjs-display/lib/base/LightBase");
	import Partition = require("awayjs-display/lib/partition/Partition");
	import IRendererPool = require("awayjs-display/lib/pool/IRendererPool");
	import Camera = require("awayjs-display/lib/entities/Camera");
	import IEntity = require("awayjs-display/lib/entities/IEntity");
	import CubeTextureBase = require("awayjs-core/lib/textures/CubeTextureBase");
	class LightProbe extends LightBase implements IEntity {
	    private _diffuseMap;
	    private _specularMap;
	    constructor(diffuseMap: CubeTextureBase, specularMap?: CubeTextureBase);
	    diffuseMap: CubeTextureBase;
	    specularMap: CubeTextureBase;
	    iGetObjectProjectionMatrix(entity: IEntity, camera: Camera, target?: Matrix3D): Matrix3D;
	    _iCollectRenderables(rendererPool: IRendererPool): void;
	    _pRegisterEntity(partition: Partition): void;
	    _pUnregisterEntity(partition: Partition): void;
	}
	export = LightProbe;
	
}

declare module "awayjs-display/lib/entities/LineSegment" {
	import UVTransform = require("awayjs-core/lib/geom/UVTransform");
	import Vector3D = require("awayjs-core/lib/geom/Vector3D");
	import IAnimator = require("awayjs-display/lib/animators/IAnimator");
	import DisplayObject = require("awayjs-display/lib/base/DisplayObject");
	import IRenderableOwner = require("awayjs-display/lib/base/IRenderableOwner");
	import Partition = require("awayjs-display/lib/partition/Partition");
	import IRendererPool = require("awayjs-display/lib/pool/IRendererPool");
	import IEntity = require("awayjs-display/lib/entities/IEntity");
	import MaterialBase = require("awayjs-display/lib/materials/MaterialBase");
	/**
	 * A Line Segment primitive.
	 */
	class LineSegment extends DisplayObject implements IEntity, IRenderableOwner {
	    static assetType: string;
	    private _animator;
	    private _material;
	    private _uvTransform;
	    _startPosition: Vector3D;
	    _endPosition: Vector3D;
	    _halfThickness: number;
	    /**
	     * Defines the animator of the line segment. Act on the line segment's geometry. Defaults to null
	     */
	    animator: IAnimator;
	    /**
	     *
	     */
	    assetType: string;
	    /**
	     *
	     */
	    startPostion: Vector3D;
	    startPosition: Vector3D;
	    /**
	     *
	     */
	    endPosition: Vector3D;
	    /**
	     *
	     */
	    material: MaterialBase;
	    /**
	     *
	     */
	    thickness: number;
	    /**
	     *
	     */
	    uvTransform: UVTransform;
	    /**
	     * Create a line segment
	     *
	     * @param startPosition Start position of the line segment
	     * @param endPosition Ending position of the line segment
	     * @param thickness Thickness of the line
	     */
	    constructor(material: MaterialBase, startPosition: Vector3D, endPosition: Vector3D, thickness?: number);
	    dispose(): void;
	    /**
	     * @protected
	     */
	    _pUpdateBoxBounds(): void;
	    _pUpdateSphereBounds(): void;
	    /**
	     * @private
	     */
	    private notifyRenderableUpdate();
	    _iCollectRenderables(rendererPool: IRendererPool): void;
	    _iCollectRenderable(rendererPool: IRendererPool): void;
	    _pRegisterEntity(partition: Partition): void;
	    _pUnregisterEntity(partition: Partition): void;
	}
	export = LineSegment;
	
}

declare module "awayjs-display/lib/entities/Mesh" {
	import Geometry = require("awayjs-core/lib/data/Geometry");
	import SubGeometryBase = require("awayjs-core/lib/data/SubGeometryBase");
	import UVTransform = require("awayjs-core/lib/geom/UVTransform");
	import IAnimator = require("awayjs-display/lib/animators/IAnimator");
	import DisplayObject = require("awayjs-display/lib/base/DisplayObject");
	import ISubMesh = require("awayjs-display/lib/base/ISubMesh");
	import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
	import Partition = require("awayjs-display/lib/partition/Partition");
	import IRendererPool = require("awayjs-display/lib/pool/IRendererPool");
	import IEntity = require("awayjs-display/lib/entities/IEntity");
	import MaterialBase = require("awayjs-display/lib/materials/MaterialBase");
	/**
	 * Mesh is an instance of a Geometry, augmenting it with a presence in the scene graph, a material, and an animation
	 * state. It consists out of SubMeshes, which in turn correspond to SubGeometries. SubMeshes allow different parts
	 * of the geometry to be assigned different materials.
	 */
	class Mesh extends DisplayObjectContainer implements IEntity {
	    static assetType: string;
	    private _uvTransform;
	    private _subMeshes;
	    private _geometry;
	    private _material;
	    private _animator;
	    private _castsShadows;
	    private _shareAnimationGeometry;
	    private _onGeometryBoundsInvalidDelegate;
	    private _onSubGeometryAddedDelegate;
	    private _onSubGeometryRemovedDelegate;
	    /**
	     * Defines the animator of the mesh. Act on the mesh's geometry.  Default value is <code>null</code>.
	     */
	    animator: IAnimator;
	    /**
	     *
	     */
	    assetType: string;
	    /**
	     * Indicates whether or not the Mesh can cast shadows. Default value is <code>true</code>.
	     */
	    castsShadows: boolean;
	    /**
	     * The geometry used by the mesh that provides it with its shape.
	     */
	    geometry: Geometry;
	    /**
	     * The material with which to render the Mesh.
	     */
	    material: MaterialBase;
	    /**
	     * Indicates whether or not the mesh share the same animation geometry.
	     */
	    shareAnimationGeometry: boolean;
	    /**
	     * The SubMeshes out of which the Mesh consists. Every SubMesh can be assigned a material to override the Mesh's
	     * material.
	     */
	    subMeshes: Array<ISubMesh>;
	    /**
	     *
	     */
	    uvTransform: UVTransform;
	    /**
	     * Create a new Mesh object.
	     *
	     * @param geometry                    The geometry used by the mesh that provides it with its shape.
	     * @param material    [optional]        The material with which to render the Mesh.
	     */
	    constructor(geometry: Geometry, material?: MaterialBase);
	    /**
	     *
	     */
	    bakeTransformations(): void;
	    /**
	     * @inheritDoc
	     */
	    dispose(): void;
	    /**
	     * Disposes mesh including the animator and children. This is a merely a convenience method.
	     * @return
	     */
	    disposeWithAnimatorAndChildren(): void;
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
	    clone(): DisplayObject;
	    _iCopyToMesh(clone: Mesh): void;
	    /**
	     * //TODO
	     *
	     * @param subGeometry
	     * @returns {SubMeshBase}
	     */
	    getSubMeshFromSubGeometry(subGeometry: SubGeometryBase): ISubMesh;
	    /**
	     * //TODO
	     *
	     * @protected
	     */
	    _pUpdateBoxBounds(): void;
	    _pUpdateSphereBounds(): void;
	    /**
	     * //TODO
	     *
	     * @private
	     */
	    private onGeometryBoundsInvalid(event);
	    /**
	     * Called when a SubGeometry was added to the Geometry.
	     *
	     * @private
	     */
	    private onSubGeometryAdded(event);
	    /**
	     * Called when a SubGeometry was removed from the Geometry.
	     *
	     * @private
	     */
	    private onSubGeometryRemoved(event);
	    /**
	     * Adds a SubMeshBase wrapping a SubGeometry.
	     *
	     * @param subGeometry
	     */
	    private addSubMesh(subGeometry);
	    /**
	     * //TODO
	     *
	     * @param shortestCollisionDistance
	     * @param findClosest
	     * @returns {boolean}
	     *
	     * @internal
	     */
	    _iTestCollision(shortestCollisionDistance: number, findClosest: boolean): boolean;
	    /**
	     *
	     * @param renderer
	     *
	     * @internal
	     */
	    _iCollectRenderables(rendererPool: IRendererPool): void;
	    _iInvalidateRenderableGeometries(): void;
	    _pRegisterEntity(partition: Partition): void;
	    _pUnregisterEntity(partition: Partition): void;
	}
	export = Mesh;
	
}

declare module "awayjs-display/lib/entities/PointLight" {
	import Matrix3D = require("awayjs-core/lib/geom/Matrix3D");
	import LightBase = require("awayjs-display/lib/base/LightBase");
	import Partition = require("awayjs-display/lib/partition/Partition");
	import IRendererPool = require("awayjs-display/lib/pool/IRendererPool");
	import Camera = require("awayjs-display/lib/entities/Camera");
	import IEntity = require("awayjs-display/lib/entities/IEntity");
	import CubeMapShadowMapper = require("awayjs-display/lib/materials/shadowmappers/CubeMapShadowMapper");
	class PointLight extends LightBase implements IEntity {
	    _pRadius: number;
	    _pFallOff: number;
	    _pFallOffFactor: number;
	    constructor();
	    pCreateShadowMapper(): CubeMapShadowMapper;
	    radius: number;
	    iFallOffFactor(): number;
	    fallOff: number;
	    _pUpdateSphereBounds(): void;
	    iGetObjectProjectionMatrix(entity: IEntity, camera: Camera, target?: Matrix3D): Matrix3D;
	    _iCollectRenderables(rendererPool: IRendererPool): void;
	    _pRegisterEntity(partition: Partition): void;
	    _pUnregisterEntity(partition: Partition): void;
	}
	export = PointLight;
	
}

declare module "awayjs-display/lib/entities/Shape" {
	import DisplayObject = require("awayjs-display/lib/base/DisplayObject");
	import Graphics = require("awayjs-display/lib/draw/Graphics");
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
	class Shape extends DisplayObject {
	    private _graphics;
	    /**
	     * Specifies the Graphics object belonging to this Shape object, where vector
	     * drawing commands can occur.
	     */
	    graphics: Graphics;
	    /**
	     * Creates a new Shape object.
	     */
	    constructor();
	}
	export = Shape;
	
}

declare module "awayjs-display/lib/entities/Skybox" {
	import UVTransform = require("awayjs-core/lib/geom/UVTransform");
	import CubeTextureBase = require("awayjs-core/lib/textures/CubeTextureBase");
	import IAnimationSet = require("awayjs-display/lib/animators/IAnimationSet");
	import IAnimator = require("awayjs-display/lib/animators/IAnimator");
	import DisplayObject = require("awayjs-display/lib/base/DisplayObject");
	import IRenderableOwner = require("awayjs-display/lib/base/IRenderableOwner");
	import IRenderObjectOwner = require("awayjs-display/lib/base/IRenderObjectOwner");
	import Partition = require("awayjs-display/lib/partition/Partition");
	import IRenderable = require("awayjs-display/lib/pool/IRenderable");
	import IRenderablePool = require("awayjs-display/lib/pool/IRenderablePool");
	import IRenderObject = require("awayjs-display/lib/pool/IRenderObject");
	import IRendererPool = require("awayjs-display/lib/pool/IRendererPool");
	import IEntity = require("awayjs-display/lib/entities/IEntity");
	import LightPickerBase = require("awayjs-display/lib/materials/lightpickers/LightPickerBase");
	/**
	 * A Skybox class is used to render a sky in the scene. It's always considered static and 'at infinity', and as
	 * such it's always centered at the camera's position and sized to exactly fit within the camera's frustum, ensuring
	 * the sky box is always as large as possible without being clipped.
	 */
	class Skybox extends DisplayObject implements IEntity, IRenderableOwner, IRenderObjectOwner {
	    static assetType: string;
	    private _cubeMap;
	    _pAlphaThreshold: number;
	    private _animationSet;
	    _pLightPicker: LightPickerBase;
	    _pBlendMode: string;
	    private _renderObjects;
	    private _renderables;
	    private _uvTransform;
	    private _owners;
	    private _mipmap;
	    private _smooth;
	    private _material;
	    private _animator;
	    /**
	     * The minimum alpha value for which pixels should be drawn. This is used for transparency that is either
	     * invisible or entirely opaque, often used with textures for foliage, etc.
	     * Recommended values are 0 to disable alpha, or 0.5 to create smooth edges. Default value is 0 (disabled).
	     */
	    alphaThreshold: number;
	    /**
	     * Indicates whether or not the Skybox texture should use mipmapping. Defaults to false.
	     */
	    mipmap: boolean;
	    /**
	     * Indicates whether or not the Skybox texture should use smoothing. Defaults to true.
	     */
	    smooth: boolean;
	    /**
	     * The light picker used by the material to provide lights to the material if it supports lighting.
	     *
	     * @see LightPickerBase
	     * @see StaticLightPicker
	     */
	    lightPicker: LightPickerBase;
	    /**
	     *
	     */
	    animationSet: IAnimationSet;
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
	    blendMode: string;
	    _pInvalidateRenderObject(): void;
	    /**
	     * Marks the shader programs for all passes as invalid, so they will be recompiled before the next use.
	     *
	     * @private
	     */
	    _pIinvalidatePasses(): void;
	    /**
	     * A list of the IRenderableOwners that use this material
	     *
	     * @private
	     */
	    iOwners: Array<IRenderableOwner>;
	    animator: IAnimator;
	    /**
	     *
	     */
	    uvTransform: UVTransform;
	    /**
	    * The cube texture to use as the skybox.
	    */
	    cubeMap: CubeTextureBase;
	    /**
	     * Create a new Skybox object.
	     *
	     * @param material	The material with which to render the Skybox.
	     */
	    constructor(cubeMap?: CubeTextureBase);
	    assetType: string;
	    castsShadows: boolean;
	    /**
	     * Cleans up resources owned by the material, including passes. Textures are not owned by the material since they
	     * could be used by other materials and will not be disposed.
	     */
	    dispose(): void;
	    _iCollectRenderables(rendererPool: IRendererPool): void;
	    _iCollectRenderable(rendererPool: IRendererPool): void;
	    _iAddRenderObject(renderObject: IRenderObject): IRenderObject;
	    _iRemoveRenderObject(renderObject: IRenderObject): IRenderObject;
	    _iAddRenderable(renderable: IRenderable): IRenderable;
	    _iRemoveRenderable(renderable: IRenderable): IRenderable;
	    /**
	     *
	     * @param renderer
	     *
	     * @internal
	     */
	    getRenderObject(renderablePool: IRenderablePool): IRenderObject;
	    _pRegisterEntity(partition: Partition): void;
	    _pUnregisterEntity(partition: Partition): void;
	}
	export = Skybox;
	
}

declare module "awayjs-display/lib/entities/TextField" {
	import Rectangle = require("awayjs-core/lib/geom/Rectangle");
	import DisplayObject = require("awayjs-display/lib/base/DisplayObject");
	import AntiAliasType = require("awayjs-display/lib/text/AntiAliasType");
	import GridFitType = require("awayjs-display/lib/text/GridFitType");
	import TextFieldAutoSize = require("awayjs-display/lib/text/TextFieldAutoSize");
	import TextFieldType = require("awayjs-display/lib/text/TextFieldType");
	import TextFormat = require("awayjs-display/lib/text/TextFormat");
	import TextInteractionMode = require("awayjs-display/lib/text/TextInteractionMode");
	import TextLineMetrics = require("awayjs-display/lib/text/TextLineMetrics");
	import Mesh = require("awayjs-display/lib/entities/Mesh");
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
	class TextField extends Mesh {
	    static assetType: string;
	    private _bottomScrollV;
	    private _caretIndex;
	    private _length;
	    private _maxScrollH;
	    private _maxScrollV;
	    private _numLines;
	    private _selectionBeginIndex;
	    private _selectionEndIndex;
	    private _text;
	    private _textHeight;
	    private _textInteractionMode;
	    private _textWidth;
	    private _charBoundaries;
	    private _charIndexAtPoint;
	    private _firstCharInParagraph;
	    private _imageReference;
	    private _lineIndexAtPoint;
	    private _lineIndexOfChar;
	    private _lineLength;
	    private _lineMetrics;
	    private _lineOffset;
	    private _lineText;
	    private _paragraphLength;
	    private _textFormat;
	    /**
	     * When set to <code>true</code> and the text field is not in focus, Flash
	     * Player highlights the selection in the text field in gray. When set to
	     * <code>false</code> and the text field is not in focus, Flash Player does
	     * not highlight the selection in the text field.
	     *
	     * @default false
	     */
	    alwaysShowSelection: boolean;
	    /**
	     * The type of anti-aliasing used for this text field. Use
	     * <code>flash.text.AntiAliasType</code> constants for this property. You can
	     * control this setting only if the font is embedded(with the
	     * <code>embedFonts</code> property set to <code>true</code>). The default
	     * setting is <code>flash.text.AntiAliasType.NORMAL</code>.
	     *
	     * <p>To set values for this property, use the following string values:</p>
	     */
	    antiAliasType: AntiAliasType;
	    /**
	     * Controls automatic sizing and alignment of text fields. Acceptable values
	     * for the <code>TextFieldAutoSize</code> constants:
	     * <code>TextFieldAutoSize.NONE</code>(the default),
	     * <code>TextFieldAutoSize.LEFT</code>, <code>TextFieldAutoSize.RIGHT</code>,
	     * and <code>TextFieldAutoSize.CENTER</code>.
	     *
	     * <p>If <code>autoSize</code> is set to <code>TextFieldAutoSize.NONE</code>
	     * (the default) no resizing occurs.</p>
	     *
	     * <p>If <code>autoSize</code> is set to <code>TextFieldAutoSize.LEFT</code>,
	     * the text is treated as left-justified text, meaning that the left margin
	     * of the text field remains fixed and any resizing of a single line of the
	     * text field is on the right margin. If the text includes a line break(for
	     * example, <code>"\n"</code> or <code>"\r"</code>), the bottom is also
	     * resized to fit the next line of text. If <code>wordWrap</code> is also set
	     * to <code>true</code>, only the bottom of the text field is resized and the
	     * right side remains fixed.</p>
	     *
	     * <p>If <code>autoSize</code> is set to
	     * <code>TextFieldAutoSize.RIGHT</code>, the text is treated as
	     * right-justified text, meaning that the right margin of the text field
	     * remains fixed and any resizing of a single line of the text field is on
	     * the left margin. If the text includes a line break(for example,
	     * <code>"\n" or "\r")</code>, the bottom is also resized to fit the next
	     * line of text. If <code>wordWrap</code> is also set to <code>true</code>,
	     * only the bottom of the text field is resized and the left side remains
	     * fixed.</p>
	     *
	     * <p>If <code>autoSize</code> is set to
	     * <code>TextFieldAutoSize.CENTER</code>, the text is treated as
	     * center-justified text, meaning that any resizing of a single line of the
	     * text field is equally distributed to both the right and left margins. If
	     * the text includes a line break(for example, <code>"\n"</code> or
	     * <code>"\r"</code>), the bottom is also resized to fit the next line of
	     * text. If <code>wordWrap</code> is also set to <code>true</code>, only the
	     * bottom of the text field is resized and the left and right sides remain
	     * fixed.</p>
	     *
	     * @throws ArgumentError The <code>autoSize</code> specified is not a member
	     *                       of flash.text.TextFieldAutoSize.
	     */
	    autoSize: TextFieldAutoSize;
	    /**
	     *
	     * @returns {string}
	     */
	    assetType: string;
	    /**
	     * Specifies whether the text field has a background fill. If
	     * <code>true</code>, the text field has a background fill. If
	     * <code>false</code>, the text field has no background fill. Use the
	     * <code>backgroundColor</code> property to set the background color of a
	     * text field.
	     *
	     * @default false
	     */
	    background: boolean;
	    /**
	     * The color of the text field background. The default value is
	     * <code>0xFFFFFF</code>(white). This property can be retrieved or set, even
	     * if there currently is no background, but the color is visible only if the
	     * text field has the <code>background</code> property set to
	     * <code>true</code>.
	     */
	    backgroundColor: number;
	    /**
	     * Specifies whether the text field has a border. If <code>true</code>, the
	     * text field has a border. If <code>false</code>, the text field has no
	     * border. Use the <code>borderColor</code> property to set the border color.
	     *
	     * @default false
	     */
	    border: boolean;
	    /**
	     * The color of the text field border. The default value is
	     * <code>0x000000</code>(black). This property can be retrieved or set, even
	     * if there currently is no border, but the color is visible only if the text
	     * field has the <code>border</code> property set to <code>true</code>.
	     */
	    borderColor: number;
	    /**
	     * An integer(1-based index) that indicates the bottommost line that is
	     * currently visible in the specified text field. Think of the text field as
	     * a window onto a block of text. The <code>scrollV</code> property is the
	     * 1-based index of the topmost visible line in the window.
	     *
	     * <p>All the text between the lines indicated by <code>scrollV</code> and
	     * <code>bottomScrollV</code> is currently visible in the text field.</p>
	     */
	    bottomScrollV: number;
	    /**
	     * The index of the insertion point(caret) position. If no insertion point
	     * is displayed, the value is the position the insertion point would be if
	     * you restored focus to the field(typically where the insertion point last
	     * was, or 0 if the field has not had focus).
	     *
	     * <p>Selection span indexes are zero-based(for example, the first position
	     * is 0, the second position is 1, and so on).</p>
	     */
	    caretIndex: number;
	    /**
	     * A Boolean value that specifies whether extra white space(spaces, line
	     * breaks, and so on) in a text field with HTML text is removed. The default
	     * value is <code>false</code>. The <code>condenseWhite</code> property only
	     * affects text set with the <code>htmlText</code> property, not the
	     * <code>text</code> property. If you set text with the <code>text</code>
	     * property, <code>condenseWhite</code> is ignored.
	     *
	     * <p>If <code>condenseWhite</code> is set to <code>true</code>, use standard
	     * HTML commands such as <code><BR></code> and <code><P></code> to place line
	     * breaks in the text field.</p>
	     *
	     * <p>Set the <code>condenseWhite</code> property before setting the
	     * <code>htmlText</code> property.</p>
	     */
	    condenseWhite: boolean;
	    /**
	     * Specifies the format applied to newly inserted text, such as text entered
	     * by a user or text inserted with the <code>replaceSelectedText()</code>
	     * method.
	     *
	     * <p><b>Note:</b> When selecting characters to be replaced with
	     * <code>setSelection()</code> and <code>replaceSelectedText()</code>, the
	     * <code>defaultTextFormat</code> will be applied only if the text has been
	     * selected up to and including the last character. Here is an example:</p>
	     * <pre xml:space="preserve"> public my_txt:TextField new TextField();
	     * my_txt.text = "Flash Macintosh version"; public my_fmt:TextFormat = new
	     * TextFormat(); my_fmt.color = 0xFF0000; my_txt.defaultTextFormat = my_fmt;
	     * my_txt.setSelection(6,15); // partial text selected - defaultTextFormat
	     * not applied my_txt.setSelection(6,23); // text selected to end -
	     * defaultTextFormat applied my_txt.replaceSelectedText("Windows version");
	     * </pre>
	     *
	     * <p>When you access the <code>defaultTextFormat</code> property, the
	     * returned TextFormat object has all of its properties defined. No property
	     * is <code>null</code>.</p>
	     *
	     * <p><b>Note:</b> You can't set this property if a style sheet is applied to
	     * the text field.</p>
	     *
	     * @throws Error This method cannot be used on a text field with a style
	     *               sheet.
	     */
	    defaultTextFormat: TextFormat;
	    /**
	     * Specifies whether the text field is a password text field. If the value of
	     * this property is <code>true</code>, the text field is treated as a
	     * password text field and hides the input characters using asterisks instead
	     * of the actual characters. If <code>false</code>, the text field is not
	     * treated as a password text field. When password mode is enabled, the Cut
	     * and Copy commands and their corresponding keyboard shortcuts will not
	     * function. This security mechanism prevents an unscrupulous user from using
	     * the shortcuts to discover a password on an unattended computer.
	     *
	     * @default false
	     */
	    displayAsPassword: boolean;
	    /**
	     * Specifies whether to render by using embedded font outlines. If
	     * <code>false</code>, Flash Player renders the text field by using device
	     * fonts.
	     *
	     * <p>If you set the <code>embedFonts</code> property to <code>true</code>
	     * for a text field, you must specify a font for that text by using the
	     * <code>font</code> property of a TextFormat object applied to the text
	     * field. If the specified font is not embedded in the SWF file, the text is
	     * not displayed.</p>
	     *
	     * @default false
	     */
	    embedFonts: boolean;
	    /**
	     * The type of grid fitting used for this text field. This property applies
	     * only if the <code>flash.text.AntiAliasType</code> property of the text
	     * field is set to <code>flash.text.AntiAliasType.ADVANCED</code>.
	     *
	     * <p>The type of grid fitting used determines whether Flash Player forces
	     * strong horizontal and vertical lines to fit to a pixel or subpixel grid,
	     * or not at all.</p>
	     *
	     * <p>For the <code>flash.text.GridFitType</code> property, you can use the
	     * following string values:</p>
	     *
	     * @default pixel
	     */
	    gridFitType: GridFitType;
	    /**
	     * Contains the HTML representation of the text field contents.
	     *
	     * <p>Flash Player supports the following HTML tags:</p>
	     *
	     * <p>Flash Player and AIR also support explicit character codes, such as
	     * &#38;(ASCII ampersand) and &#x20AC;(Unicode € symbol). </p>
	     */
	    htmlText: string;
	    /**
	     * The number of characters in a text field. A character such as tab
	     * (<code>\t</code>) counts as one character.
	     */
	    length: number;
	    /**
	     * The maximum number of characters that the text field can contain, as
	     * entered by a user. A script can insert more text than
	     * <code>maxChars</code> allows; the <code>maxChars</code> property indicates
	     * only how much text a user can enter. If the value of this property is
	     * <code>0</code>, a user can enter an unlimited amount of text.
	     *
	     * @default 0
	     */
	    maxChars: number;
	    /**
	     * The maximum value of <code>scrollH</code>.
	     */
	    maxScrollH(): number;
	    /**
	     * The maximum value of <code>scrollV</code>.
	     */
	    maxScrollV(): number;
	    /**
	     * A Boolean value that indicates whether Flash Player automatically scrolls
	     * multiline text fields when the user clicks a text field and rolls the
	     * mouse wheel. By default, this value is <code>true</code>. This property is
	     * useful if you want to prevent mouse wheel scrolling of text fields, or
	     * implement your own text field scrolling.
	     */
	    mouseWheelEnabled: boolean;
	    /**
	     * Indicates whether field is a multiline text field. If the value is
	     * <code>true</code>, the text field is multiline; if the value is
	     * <code>false</code>, the text field is a single-line text field. In a field
	     * of type <code>TextFieldType.INPUT</code>, the <code>multiline</code> value
	     * determines whether the <code>Enter</code> key creates a new line(a value
	     * of <code>false</code>, and the <code>Enter</code> key is ignored). If you
	     * paste text into a <code>TextField</code> with a <code>multiline</code>
	     * value of <code>false</code>, newlines are stripped out of the text.
	     *
	     * @default false
	     */
	    multiline: boolean;
	    /**
	     * Defines the number of text lines in a multiline text field. If
	     * <code>wordWrap</code> property is set to <code>true</code>, the number of
	     * lines increases when text wraps.
	     */
	    numLines: number;
	    /**
	     * Indicates the set of characters that a user can enter into the text field.
	     * If the value of the <code>restrict</code> property is <code>null</code>,
	     * you can enter any character. If the value of the <code>restrict</code>
	     * property is an empty string, you cannot enter any character. If the value
	     * of the <code>restrict</code> property is a string of characters, you can
	     * enter only characters in the string into the text field. The string is
	     * scanned from left to right. You can specify a range by using the hyphen
	     * (-) character. Only user interaction is restricted; a script can put any
	     * text into the text field. <ph outputclass="flashonly">This property does
	     * not synchronize with the Embed font options in the Property inspector.
	     *
	     * <p>If the string begins with a caret(^) character, all characters are
	     * initially accepted and succeeding characters in the string are excluded
	     * from the set of accepted characters. If the string does not begin with a
	     * caret(^) character, no characters are initially accepted and succeeding
	     * characters in the string are included in the set of accepted
	     * characters.</p>
	     *
	     * <p>The following example allows only uppercase characters, spaces, and
	     * numbers to be entered into a text field:</p>
	     * <pre xml:space="preserve"> my_txt.restrict = "A-Z 0-9"; </pre>
	     *
	     * <p>The following example includes all characters, but excludes lowercase
	     * letters:</p>
	     * <pre xml:space="preserve"> my_txt.restrict = "^a-z"; </pre>
	     *
	     * <p>You can use a backslash to enter a ^ or - verbatim. The accepted
	     * backslash sequences are \-, \^ or \\. The backslash must be an actual
	     * character in the string, so when specified in ActionScript, a double
	     * backslash must be used. For example, the following code includes only the
	     * dash(-) and caret(^):</p>
	     * <pre xml:space="preserve"> my_txt.restrict = "\\-\\^"; </pre>
	     *
	     * <p>The ^ can be used anywhere in the string to toggle between including
	     * characters and excluding characters. The following code includes only
	     * uppercase letters, but excludes the uppercase letter Q:</p>
	     * <pre xml:space="preserve"> my_txt.restrict = "A-Z^Q"; </pre>
	     *
	     * <p>You can use the <code>\u</code> escape sequence to construct
	     * <code>restrict</code> strings. The following code includes only the
	     * characters from ASCII 32(space) to ASCII 126(tilde).</p>
	     * <pre xml:space="preserve"> my_txt.restrict = "\u0020-\u007E"; </pre>
	     *
	     * @default null
	     */
	    restrict: string;
	    /**
	     * The current horizontal scrolling position. If the <code>scrollH</code>
	     * property is 0, the text is not horizontally scrolled. This property value
	     * is an integer that represents the horizontal position in pixels.
	     *
	     * <p>The units of horizontal scrolling are pixels, whereas the units of
	     * vertical scrolling are lines. Horizontal scrolling is measured in pixels
	     * because most fonts you typically use are proportionally spaced; that is,
	     * the characters can have different widths. Flash Player performs vertical
	     * scrolling by line because users usually want to see a complete line of
	     * text rather than a partial line. Even if a line uses multiple fonts, the
	     * height of the line adjusts to fit the largest font in use.</p>
	     *
	     * <p><b>Note: </b>The <code>scrollH</code> property is zero-based, not
	     * 1-based like the <code>scrollV</code> vertical scrolling property.</p>
	     */
	    scrollH: number;
	    /**
	     * The vertical position of text in a text field. The <code>scrollV</code>
	     * property is useful for directing users to a specific paragraph in a long
	     * passage, or creating scrolling text fields.
	     *
	     * <p>The units of vertical scrolling are lines, whereas the units of
	     * horizontal scrolling are pixels. If the first line displayed is the first
	     * line in the text field, scrollV is set to 1(not 0). Horizontal scrolling
	     * is measured in pixels because most fonts are proportionally spaced; that
	     * is, the characters can have different widths. Flash performs vertical
	     * scrolling by line because users usually want to see a complete line of
	     * text rather than a partial line. Even if there are multiple fonts on a
	     * line, the height of the line adjusts to fit the largest font in use.</p>
	     */
	    scrollV: number;
	    /**
	     * A Boolean value that indicates whether the text field is selectable. The
	     * value <code>true</code> indicates that the text is selectable. The
	     * <code>selectable</code> property controls whether a text field is
	     * selectable, not whether a text field is editable. A dynamic text field can
	     * be selectable even if it is not editable. If a dynamic text field is not
	     * selectable, the user cannot select its text.
	     *
	     * <p>If <code>selectable</code> is set to <code>false</code>, the text in
	     * the text field does not respond to selection commands from the mouse or
	     * keyboard, and the text cannot be copied with the Copy command. If
	     * <code>selectable</code> is set to <code>true</code>, the text in the text
	     * field can be selected with the mouse or keyboard, and the text can be
	     * copied with the Copy command. You can select text this way even if the
	     * text field is a dynamic text field instead of an input text field. </p>
	     *
	     * @default true
	     */
	    selectable: boolean;
	    /**
	     * The zero-based character index value of the first character in the current
	     * selection. For example, the first character is 0, the second character is
	     * 1, and so on. If no text is selected, this property is the value of
	     * <code>caretIndex</code>.
	     */
	    selectionBeginIndex: number;
	    /**
	     * The zero-based character index value of the last character in the current
	     * selection. For example, the first character is 0, the second character is
	     * 1, and so on. If no text is selected, this property is the value of
	     * <code>caretIndex</code>.
	     */
	    selectionEndIndex: number;
	    /**
	     * The sharpness of the glyph edges in this text field. This property applies
	     * only if the <code>flash.text.AntiAliasType</code> property of the text
	     * field is set to <code>flash.text.AntiAliasType.ADVANCED</code>. The range
	     * for <code>sharpness</code> is a number from -400 to 400. If you attempt to
	     * set <code>sharpness</code> to a value outside that range, Flash sets the
	     * property to the nearest value in the range(either -400 or 400).
	     *
	     * @default 0
	     */
	    sharpness: number;
	    /**
	     * Attaches a style sheet to the text field. For information on creating
	     * style sheets, see the StyleSheet class and the <i>ActionScript 3.0
	     * Developer's Guide</i>.
	     *
	     * <p>You can change the style sheet associated with a text field at any
	     * time. If you change the style sheet in use, the text field is redrawn with
	     * the new style sheet. You can set the style sheet to <code>null</code> or
	     * <code>undefined</code> to remove the style sheet. If the style sheet in
	     * use is removed, the text field is redrawn without a style sheet. </p>
	     *
	     * <p><b>Note:</b> If the style sheet is removed, the contents of both
	     * <code>TextField.text</code> and <code> TextField.htmlText</code> change to
	     * incorporate the formatting previously applied by the style sheet. To
	     * preserve the original <code>TextField.htmlText</code> contents without the
	     * formatting, save the value in a variable before removing the style
	     * sheet.</p>
	     */
	    styleSheet: StyleSheet;
	    /**
	     * A string that is the current text in the text field. Lines are separated
	     * by the carriage return character(<code>'\r'</code>, ASCII 13). This
	     * property contains unformatted text in the text field, without HTML tags.
	     *
	     * <p>To get the text in HTML form, use the <code>htmlText</code>
	     * property.</p>
	     */
	    text: string;
	    textFormat: TextFormat;
	    /**
	     * The color of the text in a text field, in hexadecimal format. The
	     * hexadecimal color system uses six digits to represent color values. Each
	     * digit has 16 possible values or characters. The characters range from 0-9
	     * and then A-F. For example, black is <code>0x000000</code>; white is
	     * <code>0xFFFFFF</code>.
	     *
	     * @default 0(0x000000)
	     */
	    textColor: number;
	    /**
	     * The height of the text in pixels.
	     */
	    textHeight: number;
	    /**
	     * The interaction mode property, Default value is
	     * TextInteractionMode.NORMAL. On mobile platforms, the normal mode implies
	     * that the text can be scrolled but not selected. One can switch to the
	     * selectable mode through the in-built context menu on the text field. On
	     * Desktop, the normal mode implies that the text is in scrollable as well as
	     * selection mode.
	     */
	    textInteractionMode: TextInteractionMode;
	    /**
	     * The width of the text in pixels.
	     */
	    textWidth: number;
	    /**
	     * The thickness of the glyph edges in this text field. This property applies
	     * only when <code>AntiAliasType</code> is set to
	     * <code>AntiAliasType.ADVANCED</code>.
	     *
	     * <p>The range for <code>thickness</code> is a number from -200 to 200. If
	     * you attempt to set <code>thickness</code> to a value outside that range,
	     * the property is set to the nearest value in the range(either -200 or
	     * 200).</p>
	     *
	     * @default 0
	     */
	    thickness: number;
	    /**
	     * The type of the text field. Either one of the following TextFieldType
	     * constants: <code>TextFieldType.DYNAMIC</code>, which specifies a dynamic
	     * text field, which a user cannot edit, or <code>TextFieldType.INPUT</code>,
	     * which specifies an input text field, which a user can edit.
	     *
	     * @default dynamic
	     * @throws ArgumentError The <code>type</code> specified is not a member of
	     *                       flash.text.TextFieldType.
	     */
	    type: TextFieldType;
	    /**
	     * Specifies whether to copy and paste the text formatting along with the
	     * text. When set to <code>true</code>, Flash Player copies and pastes
	     * formatting(such as alignment, bold, and italics) when you copy and paste
	     * between text fields. Both the origin and destination text fields for the
	     * copy and paste procedure must have <code>useRichTextClipboard</code> set
	     * to <code>true</code>. The default value is <code>false</code>.
	     */
	    useRichTextClipboard: boolean;
	    /**
	     * A Boolean value that indicates whether the text field has word wrap. If
	     * the value of <code>wordWrap</code> is <code>true</code>, the text field
	     * has word wrap; if the value is <code>false</code>, the text field does not
	     * have word wrap. The default value is <code>false</code>.
	     */
	    wordWrap: boolean;
	    /**
	     * Creates a new TextField instance. After you create the TextField instance,
	     * call the <code>addChild()</code> or <code>addChildAt()</code> method of
	     * the parent DisplayObjectContainer object to add the TextField instance to
	     * the display list.
	     *
	     * <p>The default size for a text field is 100 x 100 pixels.</p>
	     */
	    constructor();
	    /**
	     * Reconstructs the Geometry for this Text-field.
	     */
	    reConstruct(): void;
	    /**
	     * Appends the string specified by the <code>newText</code> parameter to the
	     * end of the text of the text field. This method is more efficient than an
	     * addition assignment(<code>+=</code>) on a <code>text</code> property
	     * (such as <code>someTextField.text += moreText</code>), particularly for a
	     * text field that contains a significant amount of content.
	     *
	     * @param newText The string to append to the existing text.
	     */
	    appendText(newText: string): void;
	    /**
	     * *tells the Textfield that a paragraph is defined completly.
	     * e.g. the textfield will start a new line for future added text.
	     */
	    closeParagraph(): void;
	    /**
	     * Returns a rectangle that is the bounding box of the character.
	     *
	     * @param charIndex The zero-based index value for the character(for
	     *                  example, the first position is 0, the second position is
	     *                  1, and so on).
	     * @return A rectangle with <code>x</code> and <code>y</code> minimum and
	     *         maximum values defining the bounding box of the character.
	     */
	    getCharBoundaries(charIndex: number): Rectangle;
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
	    getCharIndexAtPoint(x: number, y: number): number;
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
	    getFirstCharInParagraph(charIndex: number): number;
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
	    getImageReference(id: string): DisplayObject;
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
	    getLineIndexAtPoint(x: number, y: number): number;
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
	    getLineIndexOfChar(charIndex: number): number;
	    /**
	     * Returns the number of characters in a specific text line.
	     *
	     * @param lineIndex The line number for which you want the length.
	     * @return The number of characters in the line.
	     * @throws RangeError The line number specified is out of range.
	     */
	    getLineLength(lineIndex: number): number;
	    /**
	     * Returns metrics information about a given text line.
	     *
	     * @param lineIndex The line number for which you want metrics information.
	     * @return A TextLineMetrics object.
	     * @throws RangeError The line number specified is out of range.
	     */
	    getLineMetrics(lineIndex: number): TextLineMetrics;
	    /**
	     * Returns the character index of the first character in the line that the
	     * <code>lineIndex</code> parameter specifies.
	     *
	     * @param lineIndex The zero-based index value of the line(for example, the
	     *                  first line is 0, the second line is 1, and so on).
	     * @return The zero-based index value of the first character in the line.
	     * @throws RangeError The line number specified is out of range.
	     */
	    getLineOffset(lineIndex: number): number;
	    /**
	     * Returns the text of the line specified by the <code>lineIndex</code>
	     * parameter.
	     *
	     * @param lineIndex The zero-based index value of the line(for example, the
	     *                  first line is 0, the second line is 1, and so on).
	     * @return The text string contained in the specified line.
	     * @throws RangeError The line number specified is out of range.
	     */
	    getLineText(lineIndex: number): string;
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
	    getParagraphLength(charIndex: number): number;
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
	    getTextFormat(beginIndex?: number, endIndex?: number): TextFormat;
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
	    replaceSelectedText(value: string): void;
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
	    replaceText(beginIndex: number, endIndex: number, newText: string): void;
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
	    setSelection(beginIndex: number, endIndex: number): void;
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
	    setTextFormat(format: TextFormat, beginIndex?: number, endIndex?: number): void;
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
	    static isFontCompatible(fontName: string, fontStyle: string): boolean;
	    clone(): DisplayObject;
	    _iCopyToTextField(clone: TextField): void;
	}
	export = TextField;
	
}

declare module "awayjs-display/lib/errors/CastError" {
	import Error = require("awayjs-core/lib/errors/Error");
	class CastError extends Error {
	    constructor(message: string);
	}
	export = CastError;
	
}

declare module "awayjs-display/lib/events/CameraEvent" {
	import Event = require("awayjs-core/lib/events/Event");
	import Camera = require("awayjs-display/lib/entities/Camera");
	/**
	 * @class away.events.CameraEvent
	 */
	class CameraEvent extends Event {
	    static PROJECTION_CHANGED: string;
	    private _camera;
	    constructor(type: string, camera: Camera);
	    camera: Camera;
	}
	export = CameraEvent;
	
}

declare module "awayjs-display/lib/events/DisplayObjectEvent" {
	import Event = require("awayjs-core/lib/events/Event");
	import DisplayObject = require("awayjs-display/lib/base/DisplayObject");
	class DisplayObjectEvent extends Event {
	    static VISIBLITY_UPDATED: string;
	    static SCENETRANSFORM_CHANGED: string;
	    static SCENE_CHANGED: string;
	    static POSITION_CHANGED: string;
	    static ROTATION_CHANGED: string;
	    static SCALE_CHANGED: string;
	    object: DisplayObject;
	    constructor(type: string, object: DisplayObject);
	}
	export = DisplayObjectEvent;
	
}

declare module "awayjs-display/lib/events/LightEvent" {
	import Event = require("awayjs-core/lib/events/Event");
	class LightEvent extends Event {
	    static CASTS_SHADOW_CHANGE: string;
	    constructor(type: string);
	    clone(): Event;
	}
	export = LightEvent;
	
}

declare module "awayjs-display/lib/events/MaterialEvent" {
	import Event = require("awayjs-core/lib/events/Event");
	class MaterialEvent extends Event {
	    static SIZE_CHANGED: string;
	    constructor(type: string);
	}
	export = MaterialEvent;
	
}

declare module "awayjs-display/lib/events/MouseEvent" {
	import Point = require("awayjs-core/lib/geom/Point");
	import Vector3D = require("awayjs-core/lib/geom/Vector3D");
	import Event = require("awayjs-core/lib/events/Event");
	import DisplayObject = require("awayjs-display/lib/base/DisplayObject");
	import IRenderableOwner = require("awayjs-display/lib/base/IRenderableOwner");
	import View = require("awayjs-display/lib/containers/View");
	import MaterialBase = require("awayjs-display/lib/materials/MaterialBase");
	/**
	 * A MouseEvent is dispatched when a mouse event occurs over a mouseEnabled object in View.
	 * TODO: we don't have screenZ data, tho this should be easy to implement
	 */
	class MouseEvent extends Event {
	    _iAllowedToPropagate: boolean;
	    _iParentEvent: MouseEvent;
	    /**
	     * Defines the value of the type property of a mouseOver3d event object.
	     */
	    static MOUSE_OVER: string;
	    /**
	     * Defines the value of the type property of a mouseOut3d event object.
	     */
	    static MOUSE_OUT: string;
	    /**
	     * Defines the value of the type property of a mouseUp3d event object.
	     */
	    static MOUSE_UP: string;
	    /**
	     * Defines the value of the type property of a mouseDown3d event object.
	     */
	    static MOUSE_DOWN: string;
	    /**
	     * Defines the value of the type property of a mouseMove3d event object.
	     */
	    static MOUSE_MOVE: string;
	    /**
	     * Defines the value of the type property of a rollOver3d event object.
	     */
	    /**
	     * Defines the value of the type property of a rollOut3d event object.
	     */
	    /**
	     * Defines the value of the type property of a click3d event object.
	     */
	    static CLICK: string;
	    /**
	     * Defines the value of the type property of a doubleClick3d event object.
	     */
	    static DOUBLE_CLICK: string;
	    /**
	     * Defines the value of the type property of a mouseWheel3d event object.
	     */
	    static MOUSE_WHEEL: string;
	    /**
	     * The horizontal coordinate at which the event occurred in view coordinates.
	     */
	    screenX: number;
	    /**
	     * The vertical coordinate at which the event occurred in view coordinates.
	     */
	    screenY: number;
	    /**
	     * The view object inside which the event took place.
	     */
	    view: View;
	    /**
	     * The 3d object inside which the event took place.
	     */
	    object: DisplayObject;
	    /**
	     * The renderable owner inside which the event took place.
	     */
	    renderableOwner: IRenderableOwner;
	    /**
	     * The material of the 3d element inside which the event took place.
	     */
	    material: MaterialBase;
	    /**
	     * The uv coordinate inside the draw primitive where the event took place.
	     */
	    uv: Point;
	    /**
	     * The index of the face where the event took place.
	     */
	    index: number;
	    /**
	     * The index of the subGeometry where the event took place.
	     */
	    subGeometryIndex: number;
	    /**
	     * The position in object space where the event took place
	     */
	    localPosition: Vector3D;
	    /**
	     * The normal in object space where the event took place
	     */
	    localNormal: Vector3D;
	    /**
	     * Indicates whether the Control key is active (true) or inactive (false).
	     */
	    ctrlKey: boolean;
	    /**
	     * Indicates whether the Alt key is active (true) or inactive (false).
	     */
	    altKey: boolean;
	    /**
	     * Indicates whether the Shift key is active (true) or inactive (false).
	     */
	    shiftKey: boolean;
	    /**
	     * Indicates how many lines should be scrolled for each unit the user rotates the mouse wheel.
	     */
	    delta: number;
	    /**
	     * Create a new MouseEvent object.
	     * @param type The type of the MouseEvent.
	     */
	    constructor(type: string);
	    /**
	     * @inheritDoc
	     */
	    bubbles: boolean;
	    /**
	     * @inheritDoc
	     */
	    stopPropagation(): void;
	    /**
	     * @inheritDoc
	     */
	    stopImmediatePropagation(): void;
	    /**
	     * Creates a copy of the MouseEvent object and sets the value of each property to match that of the original.
	     */
	    clone(): Event;
	    /**
	     * The position in scene space where the event took place
	     */
	    scenePosition: Vector3D;
	    /**
	     * The normal in scene space where the event took place
	     */
	    sceneNormal: Vector3D;
	}
	export = MouseEvent;
	
}

declare module "awayjs-display/lib/events/RenderableOwnerEvent" {
	import Event = require("awayjs-core/lib/events/Event");
	import IRenderObjectOwner = require("awayjs-display/lib/base/IRenderObjectOwner");
	/**
	 * Dispatched to notify changes in a sub geometry object's state.
	 *
	 * @class away.events.RenderableOwnerEvent
	 * @see away.core.base.Geometry
	 */
	class RenderableOwnerEvent extends Event {
	    /**
	     * Dispatched when a Renderable owners's render object owner has been updated.
	     */
	    static RENDER_OBJECT_OWNER_UPDATED: string;
	    private _renderObjectOwner;
	    /**
	     * Create a new GeometryEvent
	     * @param type The event type.
	     * @param dataType An optional data type of the vertex data being updated.
	     */
	    constructor(type: string, renderObjectOwner: IRenderObjectOwner);
	    /**
	     * The renderobject owner of the renderable owner.
	     */
	    renderObjectOwner: IRenderObjectOwner;
	    /**
	     * Clones the event.
	     *
	     * @return An exact duplicate of the current object.
	     */
	    clone(): Event;
	}
	export = RenderableOwnerEvent;
	
}

declare module "awayjs-display/lib/events/RendererEvent" {
	import Event = require("awayjs-core/lib/events/Event");
	class RendererEvent extends Event {
	    static VIEWPORT_UPDATED: string;
	    static SCISSOR_UPDATED: string;
	    constructor(type: string);
	}
	export = RendererEvent;
	
}

declare module "awayjs-display/lib/events/ResizeEvent" {
	import Event = require("awayjs-core/lib/events/Event");
	class ResizeEvent extends Event {
	    static RESIZE: string;
	    private _oldHeight;
	    private _oldWidth;
	    constructor(type: string, oldHeight?: number, oldWidth?: number);
	    oldHeight: number;
	    oldWidth: number;
	}
	export = ResizeEvent;
	
}

declare module "awayjs-display/lib/events/SceneEvent" {
	import Event = require("awayjs-core/lib/events/Event");
	import DisplayObject = require("awayjs-display/lib/base/DisplayObject");
	class SceneEvent extends Event {
	    /**
	     *
	     */
	    static ADDED_TO_SCENE: string;
	    /**
	     *
	     */
	    static REMOVED_FROM_SCENE: string;
	    /**
	     *
	     */
	    static PARTITION_CHANGED: string;
	    /**
	     *
	     */
	    displayObject: DisplayObject;
	    constructor(type: string, displayObject: DisplayObject);
	}
	export = SceneEvent;
	
}

declare module "awayjs-display/lib/managers/DefaultMaterialManager" {
	import BitmapData = require("awayjs-core/lib/data/BitmapData");
	import BitmapTexture = require("awayjs-core/lib/textures/BitmapTexture");
	import IRenderableOwner = require("awayjs-display/lib/base/IRenderableOwner");
	import MaterialBase = require("awayjs-display/lib/materials/MaterialBase");
	class DefaultMaterialManager {
	    private static _defaultBitmapData;
	    private static _defaultTriangleMaterial;
	    private static _defaultLineMaterial;
	    private static _defaultTexture;
	    static getDefaultMaterial(renderableOwner?: IRenderableOwner): MaterialBase;
	    static getDefaultTexture(renderableOwner?: IRenderableOwner): BitmapTexture;
	    private static createDefaultTexture();
	    static createCheckeredBitmapData(): BitmapData;
	    private static createDefaultTriangleMaterial();
	    private static createDefaultLineMaterial();
	}
	export = DefaultMaterialManager;
	
}

declare module "awayjs-display/lib/managers/MouseManager" {
	import View = require("awayjs-display/lib/containers/View");
	import PickingCollisionVO = require("awayjs-display/lib/pick/PickingCollisionVO");
	/**
	 * MouseManager enforces a singleton pattern and is not intended to be instanced.
	 * it provides a manager class for detecting mouse hits on scene objects and sending out mouse events.
	 */
	class MouseManager {
	    private static _instance;
	    private _viewLookup;
	    _iActiveDiv: HTMLDivElement;
	    _iUpdateDirty: boolean;
	    _iCollidingObject: PickingCollisionVO;
	    private _nullVector;
	    private _previousCollidingObject;
	    private _queuedEvents;
	    private _mouseMoveEvent;
	    private _mouseUp;
	    private _mouseClick;
	    private _mouseOut;
	    private _mouseDown;
	    private _mouseMove;
	    private _mouseOver;
	    private _mouseWheel;
	    private _mouseDoubleClick;
	    private onClickDelegate;
	    private onDoubleClickDelegate;
	    private onMouseDownDelegate;
	    private onMouseMoveDelegate;
	    private onMouseUpDelegate;
	    private onMouseWheelDelegate;
	    private onMouseOverDelegate;
	    private onMouseOutDelegate;
	    /**
	     * Creates a new <code>MouseManager</code> object.
	     */
	    constructor();
	    static getInstance(): MouseManager;
	    fireMouseEvents(forceMouseMove: boolean): void;
	    registerView(view: View): void;
	    unregisterView(view: View): void;
	    private queueDispatch(event, sourceEvent, collider?);
	    private onMouseMove(event);
	    private onMouseOut(event);
	    private onMouseOver(event);
	    private onClick(event);
	    private onDoubleClick(event);
	    private onMouseDown(event);
	    private onMouseUp(event);
	    private onMouseWheel(event);
	    private updateColliders(event);
	}
	export = MouseManager;
	
}

declare module "awayjs-display/lib/materials/BasicMaterial" {
	import Texture2DBase = require("awayjs-core/lib/textures/Texture2DBase");
	import IRenderObjectOwner = require("awayjs-display/lib/base/IRenderObjectOwner");
	import MaterialBase = require("awayjs-display/lib/materials/MaterialBase");
	import IRenderablePool = require("awayjs-display/lib/pool/IRenderablePool");
	import IRenderObject = require("awayjs-display/lib/pool/IRenderObject");
	/**
	 * BasicMaterial forms an abstract base class for the default shaded materials provided by Stage,
	 * using material methods to define their appearance.
	 */
	class BasicMaterial extends MaterialBase implements IRenderObjectOwner {
	    private _preserveAlpha;
	    /**
	     * Creates a new BasicMaterial object.
	     *
	     * @param texture The texture used for the material's albedo color.
	     * @param smooth Indicates whether the texture should be filtered when sampled. Defaults to true.
	     * @param repeat Indicates whether the texture should be tiled when sampled. Defaults to false.
	     * @param mipmap Indicates whether or not any used textures should use mipmapping. Defaults to false.
	     */
	    constructor(texture?: Texture2DBase, smooth?: boolean, repeat?: boolean, mipmap?: boolean);
	    constructor(color?: number, alpha?: number);
	    /**
	     * Indicates whether alpha should be preserved - defaults to false
	     */
	    preserveAlpha: boolean;
	    /**
	     *
	     * @param renderer
	     *
	     * @internal
	     */
	    getRenderObject(renderablePool: IRenderablePool): IRenderObject;
	}
	export = BasicMaterial;
	
}

declare module "awayjs-display/lib/materials/CSSMaterialBase" {
	import MaterialBase = require("awayjs-display/lib/materials/MaterialBase");
	import Texture2DBase = require("awayjs-core/lib/textures/Texture2DBase");
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
	class CSSMaterialBase extends MaterialBase {
	    private _imageElement;
	    private _imageStyle;
	    imageElement: HTMLImageElement;
	    imageStyle: MSStyleCSSProperties;
	    /**
	     * The texture object to use for the albedo colour.
	     */
	    texture: Texture2DBase;
	    /**
	     * Creates a new MaterialBase object.
	     */
	    constructor(texture?: Texture2DBase, smooth?: boolean, repeat?: boolean);
	}
	export = CSSMaterialBase;
	
}

declare module "awayjs-display/lib/materials/CurveMaterial" {
	import Texture2DBase = require("awayjs-core/lib/textures/Texture2DBase");
	import IRenderObjectOwner = require("awayjs-display/lib/base/IRenderObjectOwner");
	import MaterialBase = require("awayjs-display/lib/materials/MaterialBase");
	import IRenderablePool = require("awayjs-display/lib/pool/IRenderablePool");
	import IRenderObject = require("awayjs-display/lib/pool/IRenderObject");
	/**
	 * BasicMaterial forms an abstract base class for the default shaded materials provided by Stage,
	 * using material methods to define their appearance.
	 */
	class CurveMaterial extends MaterialBase implements IRenderObjectOwner {
	    private _preserveAlpha;
	    /**
	     * Creates a new BasicMaterial object.
	     *
	     * @param texture The texture used for the material's albedo color.
	     * @param smooth Indicates whether the texture should be filtered when sampled. Defaults to true.
	     * @param repeat Indicates whether the texture should be tiled when sampled. Defaults to false.
	     * @param mipmap Indicates whether or not any used textures should use mipmapping. Defaults to false.
	     */
	    constructor(texture?: Texture2DBase, smooth?: boolean, repeat?: boolean, mipmap?: boolean);
	    constructor(color?: number, alpha?: number);
	    /**
	     * Indicates whether alpha should be preserved - defaults to false
	     */
	    preserveAlpha: boolean;
	    /**
	     *
	     * @param renderer
	     *
	     * @internal
	     */
	    getRenderObject(renderablePool: IRenderablePool): IRenderObject;
	}
	export = CurveMaterial;
	
}

declare module "awayjs-display/lib/materials/LightSources" {
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
	class LightSources {
	    /**
	     * Defines normal lights are to be used as the source for the lighting
	     * component.
	     */
	    static LIGHTS: number;
	    /**
	     * Defines that global lighting probes are to be used as the source for the
	     * lighting component.
	     */
	    static PROBES: number;
	    /**
	     * Defines that both normal and global lighting probes  are to be used as the
	     * source for the lighting component. This is equivalent to LightSources.LIGHTS | LightSources.PROBES.
	     */
	    static ALL: number;
	}
	export = LightSources;
	
}

declare module "awayjs-display/lib/materials/MaterialBase" {
	import ColorTransform = require("awayjs-core/lib/geom/ColorTransform");
	import AssetBase = require("awayjs-core/lib/library/AssetBase");
	import Texture2DBase = require("awayjs-core/lib/textures/Texture2DBase");
	import IAnimationSet = require("awayjs-display/lib/animators/IAnimationSet");
	import IRenderObjectOwner = require("awayjs-display/lib/base/IRenderObjectOwner");
	import IRenderableOwner = require("awayjs-display/lib/base/IRenderableOwner");
	import IRenderObject = require("awayjs-display/lib/pool/IRenderObject");
	import IRenderablePool = require("awayjs-display/lib/pool/IRenderablePool");
	import LightPickerBase = require("awayjs-display/lib/materials/lightpickers/LightPickerBase");
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
	class MaterialBase extends AssetBase implements IRenderObjectOwner {
	    static assetType: string;
	    private _colorTransform;
	    private _alphaBlending;
	    private _alpha;
	    private _sizeChanged;
	    private _renderObjects;
	    _pAlphaThreshold: number;
	    _pAnimateUVs: boolean;
	    private _enableLightFallOff;
	    private _specularLightSources;
	    private _diffuseLightSources;
	    /**
	     * An object to contain any extra data.
	     */
	    extra: Object;
	    /**
	     * A value that can be used by materials that only work with a given type of renderer. The renderer can test the
	     * classification to choose which render path to use. For example, a deferred material could set this value so
	     * that the deferred renderer knows not to take the forward rendering path.
	     *
	     * @private
	     */
	    _iClassification: string;
	    /**
	     * An id for this material used to sort the renderables by shader program, which reduces Program state changes.
	     *
	     * @private
	     */
	    _iMaterialId: number;
	    _iBaseScreenPassIndex: number;
	    private _bothSides;
	    private _animationSet;
	    /**
	     * A list of material owners, renderables or custom Entities.
	     */
	    private _owners;
	    private _alphaPremultiplied;
	    _pBlendMode: string;
	    private _mipmap;
	    private _smooth;
	    private _repeat;
	    private _color;
	    _pTexture: Texture2DBase;
	    _pLightPicker: LightPickerBase;
	    _pHeight: number;
	    _pWidth: number;
	    private _onLightChangeDelegate;
	    /**
	     *
	     */
	    assetType: string;
	    /**
	     * Creates a new MaterialBase object.
	     */
	    constructor();
	    /**
	     * The alpha of the surface.
	     */
	    alpha: number;
	    /**
	     * The ColorTransform object to transform the colour of the material with. Defaults to null.
	     */
	    colorTransform: ColorTransform;
	    /**
	     * Indicates whether or not the material has transparency. If binary transparency is sufficient, for
	     * example when using textures of foliage, consider using alphaThreshold instead.
	     */
	    alphaBlending: boolean;
	    /**
	     *
	     */
	    height: number;
	    /**
	     *
	     */
	    animationSet: IAnimationSet;
	    /**
	     * The light picker used by the material to provide lights to the material if it supports lighting.
	     *
	     * @see LightPickerBase
	     * @see StaticLightPicker
	     */
	    lightPicker: LightPickerBase;
	    /**
	     * Indicates whether or not any used textures should use mipmapping. Defaults to true.
	     */
	    mipmap: boolean;
	    /**
	     * Indicates whether or not any used textures should use smoothing. Defaults to true.
	     */
	    smooth: boolean;
	    /**
	     * Indicates whether or not any used textures should be tiled. If set to false, texture samples are clamped to
	     * the texture's borders when the uv coordinates are outside the [0, 1] interval. Defaults to false.
	     */
	    repeat: boolean;
	    /**
	     * The diffuse reflectivity color of the surface.
	     */
	    color: number;
	    /**
	     * The texture object to use for the albedo colour.
	     */
	    texture: Texture2DBase;
	    /**
	     * Specifies whether or not the UV coordinates should be animated using a transformation matrix.
	     */
	    animateUVs: boolean;
	    /**
	     * Whether or not to use fallOff and radius properties for lights. This can be used to improve performance and
	     * compatibility for constrained mode.
	     */
	    enableLightFallOff: boolean;
	    /**
	     * Define which light source types to use for diffuse reflections. This allows choosing between regular lights
	     * and/or light probes for diffuse reflections.
	     *
	     * @see away3d.materials.LightSources
	     */
	    diffuseLightSources: number;
	    /**
	     * Define which light source types to use for specular reflections. This allows choosing between regular lights
	     * and/or light probes for specular reflections.
	     *
	     * @see away3d.materials.LightSources
	     */
	    specularLightSources: number;
	    /**
	     * Cleans up resources owned by the material, including passes. Textures are not owned by the material since they
	     * could be used by other materials and will not be disposed.
	     */
	    dispose(): void;
	    /**
	     * Defines whether or not the material should cull triangles facing away from the camera.
	     */
	    bothSides: boolean;
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
	    blendMode: string;
	    /**
	     * Indicates whether visible textures (or other pixels) used by this material have
	     * already been premultiplied. Toggle this if you are seeing black halos around your
	     * blended alpha edges.
	     */
	    alphaPremultiplied: boolean;
	    /**
	     * The minimum alpha value for which pixels should be drawn. This is used for transparency that is either
	     * invisible or entirely opaque, often used with textures for foliage, etc.
	     * Recommended values are 0 to disable alpha, or 0.5 to create smooth edges. Default value is 0 (disabled).
	     */
	    alphaThreshold: number;
	    /**
	     *
	     */
	    width: number;
	    /**
	     * Mark an IRenderableOwner as owner of this material.
	     * Assures we're not using the same material across renderables with different animations, since the
	     * Programs depend on animation. This method needs to be called when a material is assigned.
	     *
	     * @param owner The IRenderableOwner that had this material assigned
	     *
	     * @internal
	     */
	    iAddOwner(owner: IRenderableOwner): void;
	    /**
	     * Removes an IRenderableOwner as owner.
	     * @param owner
	     *
	     * @internal
	     */
	    iRemoveOwner(owner: IRenderableOwner): void;
	    /**
	     * A list of the IRenderableOwners that use this material
	     *
	     * @private
	     */
	    iOwners: Array<IRenderableOwner>;
	    /**
	     * Marks the shader programs for all passes as invalid, so they will be recompiled before the next use.
	     *
	     * @private
	     */
	    _pInvalidatePasses(): void;
	    private invalidateAnimation();
	    _pInvalidateRenderObject(): void;
	    /**
	     * Called when the light picker's configuration changed.
	     */
	    private onLightsChange(event);
	    _pNotifySizeChanged(): void;
	    _iAddRenderObject(renderObject: IRenderObject): IRenderObject;
	    _iRemoveRenderObject(renderObject: IRenderObject): IRenderObject;
	    /**
	     *
	     * @param renderer
	     *
	     * @internal
	     */
	    getRenderObject(renderablePool: IRenderablePool): IRenderObject;
	}
	export = MaterialBase;
	
}

declare module "awayjs-display/lib/materials/lightpickers/LightPickerBase" {
	import AssetBase = require("awayjs-core/lib/library/AssetBase");
	import IAsset = require("awayjs-core/lib/library/IAsset");
	import LightBase = require("awayjs-display/lib/base/LightBase");
	import IRenderable = require("awayjs-display/lib/pool/IRenderable");
	import DirectionalLight = require("awayjs-display/lib/entities/DirectionalLight");
	import LightProbe = require("awayjs-display/lib/entities/LightProbe");
	import PointLight = require("awayjs-display/lib/entities/PointLight");
	/**
	 * LightPickerBase provides an abstract base clase for light picker classes. These classes are responsible for
	 * feeding materials with relevant lights. Usually, StaticLightPicker can be used, but LightPickerBase can be
	 * extended to provide more application-specific dynamic selection of lights.
	 *
	 * @see StaticLightPicker
	 */
	class LightPickerBase extends AssetBase implements IAsset {
	    static assetType: string;
	    _pNumPointLights: number;
	    _pNumDirectionalLights: number;
	    _pNumCastingPointLights: number;
	    _pNumCastingDirectionalLights: number;
	    _pNumLightProbes: number;
	    _pAllPickedLights: Array<LightBase>;
	    _pPointLights: Array<PointLight>;
	    _pCastingPointLights: Array<PointLight>;
	    _pDirectionalLights: Array<DirectionalLight>;
	    _pCastingDirectionalLights: Array<DirectionalLight>;
	    _pLightProbes: Array<LightProbe>;
	    _pLightProbeWeights: Array<number>;
	    /**
	     * Creates a new LightPickerBase object.
	     */
	    constructor();
	    /**
	     * Disposes resources used by the light picker.
	     */
	    dispose(): void;
	    /**
	     * @inheritDoc
	     */
	    assetType: string;
	    /**
	     * The maximum amount of directional lights that will be provided.
	     */
	    numDirectionalLights: number;
	    /**
	     * The maximum amount of point lights that will be provided.
	     */
	    numPointLights: number;
	    /**
	     * The maximum amount of directional lights that cast shadows.
	     */
	    numCastingDirectionalLights: number;
	    /**
	     * The amount of point lights that cast shadows.
	     */
	    numCastingPointLights: number;
	    /**
	     * The maximum amount of light probes that will be provided.
	     */
	    numLightProbes: number;
	    /**
	     * The collected point lights to be used for shading.
	     */
	    pointLights: Array<PointLight>;
	    /**
	     * The collected directional lights to be used for shading.
	     */
	    directionalLights: Array<DirectionalLight>;
	    /**
	     * The collected point lights that cast shadows to be used for shading.
	     */
	    castingPointLights: Array<PointLight>;
	    /**
	     * The collected directional lights that cast shadows to be used for shading.
	     */
	    castingDirectionalLights: Array<DirectionalLight>;
	    /**
	     * The collected light probes to be used for shading.
	     */
	    lightProbes: Array<LightProbe>;
	    /**
	     * The weights for each light probe, defining their influence on the object.
	     */
	    lightProbeWeights: Array<number>;
	    /**
	     * A collection of all the collected lights.
	     */
	    allPickedLights: Array<LightBase>;
	    /**
	     * Updates set of lights for a given renderable and EntityCollector. Always call super.collectLights() after custom overridden code.
	     */
	    collectLights(renderable: IRenderable): void;
	    /**
	     * Updates the weights for the light probes, based on the renderable's position relative to them.
	     * @param renderable The renderble for which to calculate the light probes' influence.
	     */
	    private updateProbeWeights(renderable);
	}
	export = LightPickerBase;
	
}

declare module "awayjs-display/lib/materials/lightpickers/StaticLightPicker" {
	import LightPickerBase = require("awayjs-display/lib/materials/lightpickers/LightPickerBase");
	/**
	 * StaticLightPicker is a light picker that provides a static set of lights. The lights can be reassigned, but
	 * if the configuration changes (number of directional lights, point lights, etc), a material recompilation may
	 * occur.
	 */
	class StaticLightPicker extends LightPickerBase {
	    private _lights;
	    private _onCastShadowChangeDelegate;
	    /**
	     * Creates a new StaticLightPicker object.
	     * @param lights The lights to be used for shading.
	     */
	    constructor(lights: any);
	    /**
	     * The lights used for shading.
	     */
	    lights: Array<any>;
	    /**
	     * Remove configuration change listeners on the lights.
	     */
	    private clearListeners();
	    /**
	     * Notifies the material of a configuration change.
	     */
	    private onCastShadowChange(event);
	    /**
	     * Called when a directional light's shadow casting configuration changes.
	     */
	    private updateDirectionalCasting(light);
	    /**
	     * Called when a point light's shadow casting configuration changes.
	     */
	    private updatePointCasting(light);
	}
	export = StaticLightPicker;
	
}

declare module "awayjs-display/lib/materials/shadowmappers/CascadeShadowMapper" {
	import Matrix3D = require("awayjs-core/lib/geom/Matrix3D");
	import Rectangle = require("awayjs-core/lib/geom/Rectangle");
	import Event = require("awayjs-core/lib/events/Event");
	import IEventDispatcher = require("awayjs-core/lib/events/IEventDispatcher");
	import Scene = require("awayjs-display/lib/containers/Scene");
	import IRenderer = require("awayjs-display/lib/render/IRenderer");
	import Camera = require("awayjs-display/lib/entities/Camera");
	import DirectionalShadowMapper = require("awayjs-display/lib/materials/shadowmappers/DirectionalShadowMapper");
	import RenderTexture = require("awayjs-core/lib/textures/RenderTexture");
	class CascadeShadowMapper extends DirectionalShadowMapper implements IEventDispatcher {
	    _pScissorRects: Rectangle[];
	    private _pScissorRectsInvalid;
	    private _splitRatios;
	    private _numCascades;
	    private _depthCameras;
	    private _depthLenses;
	    private _texOffsetsX;
	    private _texOffsetsY;
	    private _changeDispatcher;
	    private _nearPlaneDistances;
	    constructor(numCascades?: number);
	    getSplitRatio(index: number): number;
	    setSplitRatio(index: number, value: number): void;
	    getDepthProjections(partition: number): Matrix3D;
	    private init();
	    _pSetDepthMapSize(value: number): void;
	    private invalidateScissorRects();
	    numCascades: number;
	    pDrawDepthMap(target: RenderTexture, scene: Scene, renderer: IRenderer): void;
	    private updateScissorRects();
	    pUpdateDepthProjection(viewCamera: Camera): void;
	    private updateProjectionPartition(matrix, splitRatio, texOffsetX, texOffsetY);
	    addEventListener(type: string, listener: Function): void;
	    removeEventListener(type: string, listener: Function): void;
	    dispatchEvent(event: Event): void;
	    hasEventListener(type: string): boolean;
	    _iNearPlaneDistances: Array<number>;
	}
	export = CascadeShadowMapper;
	
}

declare module "awayjs-display/lib/materials/shadowmappers/CubeMapShadowMapper" {
	import Scene = require("awayjs-display/lib/containers/Scene");
	import Camera = require("awayjs-display/lib/entities/Camera");
	import ShadowMapperBase = require("awayjs-display/lib/materials/shadowmappers/ShadowMapperBase");
	import IRenderer = require("awayjs-display/lib/render/IRenderer");
	import RenderTexture = require("awayjs-core/lib/textures/RenderTexture");
	import TextureBase = require("awayjs-core/lib/textures/TextureBase");
	class CubeMapShadowMapper extends ShadowMapperBase {
	    private _depthCameras;
	    private _projections;
	    private _needsRender;
	    constructor();
	    private initCameras();
	    private addCamera(rotationX, rotationY, rotationZ);
	    pCreateDepthTexture(): TextureBase;
	    pUpdateDepthProjection(viewCamera: Camera): void;
	    pDrawDepthMap(target: RenderTexture, scene: Scene, renderer: IRenderer): void;
	}
	export = CubeMapShadowMapper;
	
}

declare module "awayjs-display/lib/materials/shadowmappers/DirectionalShadowMapper" {
	import Matrix3D = require("awayjs-core/lib/geom/Matrix3D");
	import Plane3D = require("awayjs-core/lib/geom/Plane3D");
	import FreeMatrixProjection = require("awayjs-core/lib/projections/FreeMatrixProjection");
	import Scene = require("awayjs-display/lib/containers/Scene");
	import IRenderer = require("awayjs-display/lib/render/IRenderer");
	import Camera = require("awayjs-display/lib/entities/Camera");
	import ShadowMapperBase = require("awayjs-display/lib/materials/shadowmappers/ShadowMapperBase");
	import TextureBase = require("awayjs-core/lib/textures/TextureBase");
	class DirectionalShadowMapper extends ShadowMapperBase {
	    _pOverallDepthCamera: Camera;
	    _pLocalFrustum: Array<number>;
	    _pLightOffset: number;
	    _pMatrix: Matrix3D;
	    _pOverallDepthProjection: FreeMatrixProjection;
	    _pSnap: number;
	    _pCullPlanes: Array<Plane3D>;
	    _pMinZ: number;
	    _pMaxZ: number;
	    constructor();
	    snap: number;
	    lightOffset: number;
	    iDepthProjection: Matrix3D;
	    depth: number;
	    pDrawDepthMap(target: TextureBase, scene: Scene, renderer: IRenderer): void;
	    pUpdateCullPlanes(viewCamera: Camera): void;
	    pUpdateDepthProjection(viewCamera: Camera): void;
	    pUpdateProjectionFromFrustumCorners(viewCamera: Camera, corners: Array<number>, matrix: Matrix3D): void;
	}
	export = DirectionalShadowMapper;
	
}

declare module "awayjs-display/lib/materials/shadowmappers/NearDirectionalShadowMapper" {
	import Camera = require("awayjs-display/lib/entities/Camera");
	import DirectionalShadowMapper = require("awayjs-display/lib/materials/shadowmappers/DirectionalShadowMapper");
	class NearDirectionalShadowMapper extends DirectionalShadowMapper {
	    private _coverageRatio;
	    constructor(coverageRatio?: number);
	    /**
	     * A value between 0 and 1 to indicate the ratio of the view frustum that needs to be covered by the shadow map.
	     */
	    coverageRatio: number;
	    pUpdateDepthProjection(viewCamera: Camera): void;
	}
	export = NearDirectionalShadowMapper;
	
}

declare module "awayjs-display/lib/materials/shadowmappers/ShadowMapperBase" {
	import Scene = require("awayjs-display/lib/containers/Scene");
	import LightBase = require("awayjs-display/lib/base/LightBase");
	import IRenderer = require("awayjs-display/lib/render/IRenderer");
	import EntityCollector = require("awayjs-display/lib/traverse/EntityCollector");
	import ShadowCasterCollector = require("awayjs-display/lib/traverse/ShadowCasterCollector");
	import Camera = require("awayjs-display/lib/entities/Camera");
	import TextureBase = require("awayjs-core/lib/textures/TextureBase");
	class ShadowMapperBase {
	    _pCasterCollector: ShadowCasterCollector;
	    private _depthMap;
	    _pDepthMapSize: number;
	    _pLight: LightBase;
	    private _explicitDepthMap;
	    private _autoUpdateShadows;
	    _iShadowsInvalid: boolean;
	    constructor();
	    pCreateCasterCollector(): ShadowCasterCollector;
	    autoUpdateShadows: boolean;
	    updateShadows(): void;
	    iSetDepthMap(depthMap: TextureBase): void;
	    light: LightBase;
	    depthMap: TextureBase;
	    depthMapSize: number;
	    dispose(): void;
	    pCreateDepthTexture(): TextureBase;
	    iRenderDepthMap(entityCollector: EntityCollector, renderer: IRenderer): void;
	    pUpdateDepthProjection(viewCamera: Camera): void;
	    pDrawDepthMap(target: TextureBase, scene: Scene, renderer: IRenderer): void;
	    _pSetDepthMapSize(value: any): void;
	}
	export = ShadowMapperBase;
	
}

declare module "awayjs-display/lib/partition/CameraNode" {
	import EntityNode = require("awayjs-display/lib/partition/EntityNode");
	import Partition = require("awayjs-display/lib/partition/Partition");
	import CollectorBase = require("awayjs-display/lib/traverse/CollectorBase");
	import IEntity = require("awayjs-display/lib/entities/IEntity");
	import EntityNodePool = require("awayjs-display/lib/pool/EntityNodePool");
	/**
	 * @class away.partition.CameraNode
	 */
	class CameraNode extends EntityNode {
	    static id: string;
	    constructor(pool: EntityNodePool, camera: IEntity, partition: Partition);
	    /**
	     * @inheritDoc
	     */
	    acceptTraverser(traverser: CollectorBase): void;
	}
	export = CameraNode;
	
}

declare module "awayjs-display/lib/partition/DirectionalLightNode" {
	import EntityNode = require("awayjs-display/lib/partition/EntityNode");
	import Partition = require("awayjs-display/lib/partition/Partition");
	import CollectorBase = require("awayjs-display/lib/traverse/CollectorBase");
	import IEntity = require("awayjs-display/lib/entities/IEntity");
	import EntityNodePool = require("awayjs-display/lib/pool/EntityNodePool");
	/**
	 * @class away.partition.DirectionalLightNode
	 */
	class DirectionalLightNode extends EntityNode {
	    static id: string;
	    private _directionalLight;
	    /**
	     *
	     * @param directionalLight
	     */
	    constructor(pool: EntityNodePool, directionalLight: IEntity, partition: Partition);
	    /**
	     * @inheritDoc
	     */
	    acceptTraverser(traverser: CollectorBase): void;
	    /**
	     *
	     * @returns {boolean}
	     */
	    isCastingShadow(): boolean;
	}
	export = DirectionalLightNode;
	
}

declare module "awayjs-display/lib/partition/EntityNode" {
	import Plane3D = require("awayjs-core/lib/geom/Plane3D");
	import Vector3D = require("awayjs-core/lib/geom/Vector3D");
	import Partition = require("awayjs-display/lib/partition/Partition");
	import NodeBase = require("awayjs-display/lib/partition/NodeBase");
	import CollectorBase = require("awayjs-display/lib/traverse/CollectorBase");
	import IEntity = require("awayjs-display/lib/entities/IEntity");
	import EntityNodePool = require("awayjs-display/lib/pool/EntityNodePool");
	/**
	 * @class away.partition.EntityNode
	 */
	class EntityNode extends NodeBase {
	    static id: string;
	    private _pool;
	    private _entity;
	    private _partition;
	    private _bounds;
	    _iUpdateQueueNext: EntityNode;
	    constructor(pool: EntityNodePool, entity: IEntity, partition: Partition);
	    entity: IEntity;
	    removeFromParent(): void;
	    /**
	     *
	     * @returns {boolean}
	     */
	    isCastingShadow(): boolean;
	    /**
	     *
	     * @param planes
	     * @param numPlanes
	     * @returns {boolean}
	     */
	    isInFrustum(planes: Array<Plane3D>, numPlanes: number): boolean;
	    /**
	     * @inheritDoc
	     */
	    acceptTraverser(traverser: CollectorBase): void;
	    /**
	     * @inheritDoc
	     */
	    isIntersectingRay(rayPosition: Vector3D, rayDirection: Vector3D): boolean;
	    /**
	     *
	     * @protected
	     */
	    _pCreateDebugEntity(): IEntity;
	    invalidatePartition(): void;
	    updateBounds(): void;
	}
	export = EntityNode;
	
}

declare module "awayjs-display/lib/partition/LightProbeNode" {
	import EntityNode = require("awayjs-display/lib/partition/EntityNode");
	import Partition = require("awayjs-display/lib/partition/Partition");
	import CollectorBase = require("awayjs-display/lib/traverse/CollectorBase");
	import IEntity = require("awayjs-display/lib/entities/IEntity");
	import EntityNodePool = require("awayjs-display/lib/pool/EntityNodePool");
	/**
	 * @class away.partition.LightProbeNode
	 */
	class LightProbeNode extends EntityNode {
	    static id: string;
	    private _lightProbe;
	    /**
	     *
	     * @param lightProbe
	     */
	    constructor(pool: EntityNodePool, lightProbe: IEntity, partition: Partition);
	    /**
	     * @inheritDoc
	     */
	    acceptTraverser(traverser: CollectorBase): void;
	    /**
	     *
	     * @returns {boolean}
	     */
	    isCastingShadow(): boolean;
	}
	export = LightProbeNode;
	
}

declare module "awayjs-display/lib/partition/NodeBase" {
	import Plane3D = require("awayjs-core/lib/geom/Plane3D");
	import Vector3D = require("awayjs-core/lib/geom/Vector3D");
	import CollectorBase = require("awayjs-display/lib/traverse/CollectorBase");
	import IEntity = require("awayjs-display/lib/entities/IEntity");
	/**
	 * @class away.partition.NodeBase
	 */
	class NodeBase {
	    private _debugChildrenVisible;
	    private _explicitDebugVisible;
	    _pImplicitDebugVisible: boolean;
	    _iParent: NodeBase;
	    _pChildNodes: Array<NodeBase>;
	    _pNumChildNodes: number;
	    _pDebugEntity: IEntity;
	    _iNumEntities: number;
	    _iCollectionMark: number;
	    /**
	     *
	     */
	    debugVisible: boolean;
	    debugChildrenVisible: boolean;
	    /**
	     *
	     */
	    parent: NodeBase;
	    /**
	     *
	     * @protected
	     */
	    _pNumEntities: number;
	    /**
	     *
	     */
	    constructor();
	    /**
	     *
	     * @param planes
	     * @param numPlanes
	     * @returns {boolean}
	     * @internal
	     */
	    isInFrustum(planes: Array<Plane3D>, numPlanes: number): boolean;
	    /**
	     *
	     * @param rayPosition
	     * @param rayDirection
	     * @returns {boolean}
	     */
	    isIntersectingRay(rayPosition: Vector3D, rayDirection: Vector3D): boolean;
	    /**
	     *
	     * @returns {boolean}
	     */
	    isCastingShadow(): boolean;
	    /**
	     *
	     * @param entity
	     * @returns {away.partition.NodeBase}
	     */
	    findPartitionForEntity(entity: IEntity): NodeBase;
	    /**
	     *
	     * @param traverser
	     */
	    acceptTraverser(traverser: CollectorBase): void;
	    /**
	     *
	     * @protected
	     */
	    applyDebugEntity(traverser: CollectorBase): void;
	    /**
	     *
	     * @param node
	     * @internal
	     */
	    iAddNode(node: NodeBase): void;
	    /**
	     *
	     * @param node
	     * @internal
	     */
	    iRemoveNode(node: NodeBase): void;
	    private _iUpdateImplicitDebugVisible(value);
	    updateDebugEntity(): void;
	    _pCreateDebugEntity(): IEntity;
	}
	export = NodeBase;
	
}

declare module "awayjs-display/lib/partition/NullNode" {
	/**
	 * @class away.partition.NullNode
	 */
	class NullNode {
	    constructor();
	}
	export = NullNode;
	
}

declare module "awayjs-display/lib/partition/Partition" {
	import Camera = require("awayjs-display/lib/entities/Camera");
	import DirectionalLight = require("awayjs-display/lib/entities/DirectionalLight");
	import IEntity = require("awayjs-display/lib/entities/IEntity");
	import LightProbe = require("awayjs-display/lib/entities/LightProbe");
	import PointLight = require("awayjs-display/lib/entities/PointLight");
	import Skybox = require("awayjs-display/lib/entities/Skybox");
	import EntityNode = require("awayjs-display/lib/partition/EntityNode");
	import NodeBase = require("awayjs-display/lib/partition/NodeBase");
	import CollectorBase = require("awayjs-display/lib/traverse/CollectorBase");
	/**
	 * @class away.partition.Partition
	 */
	class Partition {
	    private _cameraNodePool;
	    private _directionalLightNodePool;
	    private _entityNodePool;
	    private _lightProbeNodePool;
	    private _pointLightNodePool;
	    private _skyboxNodePool;
	    _rootNode: NodeBase;
	    private _updatesMade;
	    private _updateQueue;
	    constructor(rootNode: NodeBase);
	    rootNode: NodeBase;
	    traverse(traverser: CollectorBase): void;
	    iMarkForUpdate(node: EntityNode): void;
	    iRemoveEntity(node: EntityNode): void;
	    private updateEntities();
	    /**
	     * @internal
	     */
	    _iRegisterCamera(camera: Camera): void;
	    /**
	     * @internal
	     */
	    _iRegisterDirectionalLight(directionalLight: DirectionalLight): void;
	    /**
	     * @internal
	     */
	    _iRegisterEntity(entity: IEntity): void;
	    /**
	     * @internal
	     */
	    _iRegisterLightProbe(lightProbe: LightProbe): void;
	    /**
	     * @internal
	     */
	    _iRegisterPointLight(pointLight: PointLight): void;
	    /**
	     * @internal
	     */
	    _iRegisterSkybox(skybox: Skybox): void;
	    /**
	     * @internal
	     */
	    _iUnregisterCamera(camera: Camera): void;
	    /**
	     * @internal
	     */
	    _iUnregisterDirectionalLight(directionalLight: DirectionalLight): void;
	    /**
	     * @internal
	     */
	    _iUnregisterEntity(entity: IEntity): void;
	    /**
	     * @internal
	     */
	    _iUnregisterLightProbe(lightProbe: LightProbe): void;
	    /**
	     * @internal
	     */
	    _iUnregisterPointLight(pointLight: PointLight): void;
	    /**
	     * @internal
	     */
	    _iUnregisterSkybox(skybox: Skybox): void;
	}
	export = Partition;
	
}

declare module "awayjs-display/lib/partition/PointLightNode" {
	import EntityNode = require("awayjs-display/lib/partition/EntityNode");
	import Partition = require("awayjs-display/lib/partition/Partition");
	import CollectorBase = require("awayjs-display/lib/traverse/CollectorBase");
	import IEntity = require("awayjs-display/lib/entities/IEntity");
	import EntityNodePool = require("awayjs-display/lib/pool/EntityNodePool");
	/**
	 * @class away.partition.PointLightNode
	 */
	class PointLightNode extends EntityNode {
	    static id: string;
	    private _pointLight;
	    /**
	     *
	     * @param pointLight
	     */
	    constructor(pool: EntityNodePool, pointLight: IEntity, partition: Partition);
	    /**
	     * @inheritDoc
	     */
	    acceptTraverser(traverser: CollectorBase): void;
	    /**
	     *
	     * @returns {boolean}
	     */
	    isCastingShadow(): boolean;
	}
	export = PointLightNode;
	
}

declare module "awayjs-display/lib/partition/SkyboxNode" {
	import Plane3D = require("awayjs-core/lib/geom/Plane3D");
	import EntityNode = require("awayjs-display/lib/partition/EntityNode");
	import Partition = require("awayjs-display/lib/partition/Partition");
	import CollectorBase = require("awayjs-display/lib/traverse/CollectorBase");
	import IEntity = require("awayjs-display/lib/entities/IEntity");
	import EntityNodePool = require("awayjs-display/lib/pool/EntityNodePool");
	/**
	 * SkyboxNode is a space partitioning leaf node that contains a Skybox object.
	 *
	 * @class away.partition.SkyboxNode
	 */
	class SkyboxNode extends EntityNode {
	    static id: string;
	    private _skyBox;
	    /**
	     * Creates a new SkyboxNode object.
	     * @param skyBox The Skybox to be contained in the node.
	     */
	    constructor(pool: EntityNodePool, skyBox: IEntity, partition: Partition);
	    /**
	     * @inheritDoc
	     */
	    acceptTraverser(traverser: CollectorBase): void;
	    /**
	     *
	     * @param planes
	     * @param numPlanes
	     * @returns {boolean}
	     */
	    isInFrustum(planes: Array<Plane3D>, numPlanes: number): boolean;
	}
	export = SkyboxNode;
	
}

declare module "awayjs-display/lib/pick/IPicker" {
	import Vector3D = require("awayjs-core/lib/geom/Vector3D");
	import Scene = require("awayjs-display/lib/containers/Scene");
	import View = require("awayjs-display/lib/containers/View");
	import PickingCollisionVO = require("awayjs-display/lib/pick/PickingCollisionVO");
	/**
	 * Provides an interface for picking objects that can pick 3d objects from a view or scene.
	 *
	 * @interface away.pick.IPicker
	 */
	interface IPicker {
	    /**
	     * Gets the collision object from the screen coordinates of the picking ray.
	     *
	     * @param x The x coordinate of the picking ray in screen-space.
	     * @param y The y coordinate of the picking ray in screen-space.
	     * @param view The view on which the picking object acts.
	     */
	    getViewCollision(x: number, y: number, view: View): PickingCollisionVO;
	    /**
	     * Gets the collision object from the scene position and direction of the picking ray.
	     *
	     * @param position The position of the picking ray in scene-space.
	     * @param direction The direction of the picking ray in scene-space.
	     * @param scene The scene on which the picking object acts.
	     */
	    getSceneCollision(position: Vector3D, direction: Vector3D, scene: Scene): PickingCollisionVO;
	    /**
	     * Determines whether the picker takes account of the mouseEnabled properties of entities. Defaults to true.
	     */
	    onlyMouseEnabled: boolean;
	    /**
	     * Disposes memory used by the IPicker object
	     */
	    dispose(): any;
	}
	export = IPicker;
	
}

declare module "awayjs-display/lib/pick/IPickingCollider" {
	import Vector3D = require("awayjs-core/lib/geom/Vector3D");
	import PickingCollisionVO = require("awayjs-display/lib/pick/PickingCollisionVO");
	import IEntity = require("awayjs-display/lib/entities/IEntity");
	/**
	 * Provides an interface for picking colliders that can be assigned to individual entities in a scene for specific picking behaviour.
	 * Used with the <code>RaycastPicker</code> picking object.
	 *
	 * @see away.entities.Entity#pickingCollider
	 * @see away.pick.RaycastPicker
	 *
	 * @interface away.pick.IPickingCollider
	 */
	interface IPickingCollider {
	    /**
	     * Sets the position and direction of a picking ray in local coordinates to the entity.
	     *
	     * @param localDirection The position vector in local coordinates
	     * @param localPosition The direction vector in local coordinates
	     */
	    setLocalRay(localPosition: Vector3D, localDirection: Vector3D): any;
	    /**
	     * Tests a <code>Billboard</code> object for a collision with the picking ray.
	     *
	     * @param entity The entity instance to be tested.
	     * @param pickingCollisionVO The collision object used to store the collision results
	     * @param shortestCollisionDistance The current value of the shortest distance to a detected collision along the ray.
	     */
	    testBillboardCollision(entity: IEntity, pickingCollisionVO: PickingCollisionVO, shortestCollisionDistance: number): boolean;
	    /**
	     * Tests a <code>Mesh</code> object for a collision with the picking ray.
	     *
	     * @param entity The entity instance to be tested.
	     * @param pickingCollisionVO The collision object used to store the collision results
	     * @param shortestCollisionDistance The current value of the shortest distance to a detected collision along the ray.
	     * @param findClosest
	     */
	    testMeshCollision(entity: IEntity, pickingCollisionVO: PickingCollisionVO, shortestCollisionDistance: number, findClosest: boolean): boolean;
	}
	export = IPickingCollider;
	
}

declare module "awayjs-display/lib/pick/PickingCollisionVO" {
	import Point = require("awayjs-core/lib/geom/Point");
	import Vector3D = require("awayjs-core/lib/geom/Vector3D");
	import DisplayObject = require("awayjs-display/lib/base/DisplayObject");
	import IRenderableOwner = require("awayjs-display/lib/base/IRenderableOwner");
	/**
	 * Value object for a picking collision returned by a picking collider. Created as unique objects on display objects
	 *
	 * @see away.base.DisplayObject#pickingCollisionVO
	 * @see away.core.pick.IPickingCollider
	 *
	 * @class away.pick.PickingCollisionVO
	 */
	class PickingCollisionVO {
	    /**
	     * The display object to which this collision object belongs.
	     */
	    displayObject: DisplayObject;
	    /**
	     * The local position of the collision on the entity's surface.
	     */
	    localPosition: Vector3D;
	    /**
	     * The local normal vector at the position of the collision.
	     */
	    localNormal: Vector3D;
	    /**
	     * The uv coordinate at the position of the collision.
	     */
	    uv: Point;
	    /**
	     * The index of the face where the event took pl ace.
	     */
	    index: number;
	    /**
	     * The index of the subGeometry where the event took place.
	     */
	    /**
	     * The starting position of the colliding ray in local coordinates.
	     */
	    localRayPosition: Vector3D;
	    /**
	     * The direction of the colliding ray in local coordinates.
	     */
	    localRayDirection: Vector3D;
	    /**
	     * The starting position of the colliding ray in scene coordinates.
	     */
	    rayPosition: Vector3D;
	    /**
	     * The direction of the colliding ray in scene coordinates.
	     */
	    rayDirection: Vector3D;
	    /**
	     * Determines if the ray position is contained within the entity bounds.
	     *
	     * @see away3d.entities.Entity#bounds
	     */
	    rayOriginIsInsideBounds: boolean;
	    /**
	     * The distance along the ray from the starting position to the calculated intersection entry point with the entity.
	     */
	    rayEntryDistance: number;
	    /**
	     * The material ownwer associated with a collision.
	     */
	    renderableOwner: IRenderableOwner;
	    /**
	     * Creates a new <code>PickingCollisionVO</code> object.
	     *
	     * @param entity The entity to which this collision object belongs.
	     */
	    constructor(displayObject: DisplayObject);
	}
	export = PickingCollisionVO;
	
}

declare module "awayjs-display/lib/pick/RaycastPicker" {
	import Vector3D = require("awayjs-core/lib/geom/Vector3D");
	import Scene = require("awayjs-display/lib/containers/Scene");
	import View = require("awayjs-display/lib/containers/View");
	import IPicker = require("awayjs-display/lib/pick/IPicker");
	import PickingCollisionVO = require("awayjs-display/lib/pick/PickingCollisionVO");
	/**
	 * Picks a 3d object from a view or scene by 3D raycast calculations.
	 * Performs an initial coarse boundary calculation to return a subset of entities whose bounding volumes intersect with the specified ray,
	 * then triggers an optional picking collider on individual entity objects to further determine the precise values of the picking ray collision.
	 *
	 * @class away.pick.RaycastPicker
	 */
	class RaycastPicker implements IPicker {
	    private _findClosestCollision;
	    private _raycastCollector;
	    private _ignoredEntities;
	    private _onlyMouseEnabled;
	    private _entities;
	    private _numEntities;
	    private _hasCollisions;
	    /**
	     * @inheritDoc
	     */
	    onlyMouseEnabled: boolean;
	    /**
	     * Creates a new <code>RaycastPicker</code> object.
	     *
	     * @param findClosestCollision Determines whether the picker searches for the closest bounds collision along the ray,
	     * or simply returns the first collision encountered. Defaults to false.
	     */
	    constructor(findClosestCollision?: boolean);
	    /**
	     * @inheritDoc
	     */
	    getViewCollision(x: number, y: number, view: View): PickingCollisionVO;
	    /**
	     * @inheritDoc
	     */
	    getSceneCollision(rayPosition: Vector3D, rayDirection: Vector3D, scene: Scene): PickingCollisionVO;
	    setIgnoreList(entities: any): void;
	    private isIgnored(entity);
	    private sortOnNearT(entity1, entity2);
	    private getPickingCollisionVO(collector);
	    private updateLocalPosition(pickingCollisionVO);
	    dispose(): void;
	}
	export = RaycastPicker;
	
}

declare module "awayjs-display/lib/pool/CSSBillboardRenderable" {
	import CSSRenderableBase = require("awayjs-display/lib/pool/CSSRenderableBase");
	import IRenderablePool = require("awayjs-display/lib/pool/IRenderablePool");
	import Billboard = require("awayjs-display/lib/entities/Billboard");
	/**
	 * @class away.pool.RenderableListItem
	 */
	class CSSBillboardRenderable extends CSSRenderableBase {
	    static id: string;
	    constructor(pool: IRenderablePool, billboard: Billboard);
	}
	export = CSSBillboardRenderable;
	
}

declare module "awayjs-display/lib/pool/CSSLineSegmentRenderable" {
	import CSSRenderableBase = require("awayjs-display/lib/pool/CSSRenderableBase");
	import IRenderablePool = require("awayjs-display/lib/pool/IRenderablePool");
	import LineSegment = require("awayjs-display/lib/entities/LineSegment");
	/**
	 * @class away.pool.RenderableListItem
	 */
	class CSSLineSegmentRenderable extends CSSRenderableBase {
	    static id: string;
	    constructor(pool: IRenderablePool, lineSegment: LineSegment);
	}
	export = CSSLineSegmentRenderable;
	
}

declare module "awayjs-display/lib/pool/CSSRenderableBase" {
	import Matrix3D = require("awayjs-core/lib/geom/Matrix3D");
	import IRenderableOwner = require("awayjs-display/lib/base/IRenderableOwner");
	import IRenderable = require("awayjs-display/lib/pool/IRenderable");
	import IRenderablePool = require("awayjs-display/lib/pool/IRenderablePool");
	import IEntity = require("awayjs-display/lib/entities/IEntity");
	/**
	 * @class away.pool.RenderableListItem
	 */
	class CSSRenderableBase implements IRenderable {
	    /**
	     *
	     */
	    private _pool;
	    /**
	     *
	     */
	    next: CSSRenderableBase;
	    /**
	     *
	     */
	    materialId: number;
	    /**
	     *
	     */
	    renderOrderId: number;
	    /**
	     *
	     */
	    zIndex: number;
	    /**
	     *
	     */
	    cascaded: boolean;
	    /**
	     *
	     */
	    renderSceneTransform: Matrix3D;
	    /**
	     *
	     */
	    sourceEntity: IEntity;
	    /**
	     *
	     */
	    renderObjectId: number;
	    /**
	     *
	     */
	    renderableOwner: IRenderableOwner;
	    /**
	     *
	     */
	    htmlElement: HTMLElement;
	    /**
	     *
	     * @param sourceEntity
	     * @param material
	     * @param animator
	     */
	    constructor(pool: IRenderablePool, sourceEntity: IEntity, renderableOwner: IRenderableOwner);
	    /**
	     *
	     */
	    dispose(): void;
	    /**
	     *
	     */
	    invalidateGeometry(): void;
	    /**
	     *
	     */
	    invalidateIndexData(): void;
	    /**
	     *
	     */
	    invalidateVertexData(dataType: string): void;
	}
	export = CSSRenderableBase;
	
}

declare module "awayjs-display/lib/pool/CSSSkyboxRenderable" {
	import CSSRenderableBase = require("awayjs-display/lib/pool/CSSRenderableBase");
	import IRenderablePool = require("awayjs-display/lib/pool/IRenderablePool");
	import Skybox = require("awayjs-display/lib/entities/Skybox");
	/**
	 * @class away.pool.CSSSkyboxRenderable
	 */
	class CSSSkyboxRenderable extends CSSRenderableBase {
	    static id: string;
	    constructor(pool: IRenderablePool, skyBox: Skybox);
	}
	export = CSSSkyboxRenderable;
	
}

declare module "awayjs-display/lib/pool/EntityListItem" {
	import IEntity = require("awayjs-display/lib/entities/IEntity");
	/**
	 * @class away.pool.EntityListItem
	 */
	class EntityListItem {
	    /**
	     *
	     */
	    entity: IEntity;
	    /**
	     *
	     */
	    next: EntityListItem;
	}
	export = EntityListItem;
	
}

declare module "awayjs-display/lib/pool/EntityListItemPool" {
	import EntityListItem = require("awayjs-display/lib/pool/EntityListItem");
	/**
	 * @class away.pool.EntityListItemPool
	 */
	class EntityListItemPool {
	    private _pool;
	    private _index;
	    private _poolSize;
	    /**
	     *
	     */
	    constructor();
	    /**
	     *
	     */
	    getItem(): EntityListItem;
	    /**
	     *
	     */
	    freeAll(): void;
	    dispose(): void;
	}
	export = EntityListItemPool;
	
}

declare module "awayjs-display/lib/pool/EntityNodePool" {
	import IEntity = require("awayjs-display/lib/entities/IEntity");
	import EntityNode = require("awayjs-display/lib/partition/EntityNode");
	import Partition = require("awayjs-display/lib/partition/Partition");
	import IEntityNodeClass = require("awayjs-display/lib/pool/IEntityNodeClass");
	/**
	 * @class away.pool.EntityNodePool
	 */
	class EntityNodePool {
	    private _entityNodePool;
	    private _entityNodeClass;
	    private _partition;
	    /**
	     * //TODO
	     *
	     * @param entityNodeClass
	     */
	    constructor(entityNodeClass: IEntityNodeClass, partition: Partition);
	    /**
	     * //TODO
	     *
	     * @param entity
	     * @returns EntityNode
	     */
	    getItem(entity: IEntity): EntityNode;
	    /**
	     * //TODO
	     *
	     * @param entity
	     */
	    disposeItem(entity: IEntity): EntityNode;
	}
	export = EntityNodePool;
	
}

declare module "awayjs-display/lib/pool/IEntityNodeClass" {
	import IEntity = require("awayjs-display/lib/entities/IEntity");
	import EntityNode = require("awayjs-display/lib/partition/EntityNode");
	import Partition = require("awayjs-display/lib/partition/Partition");
	import EntityNodePool = require("awayjs-display/lib/pool/EntityNodePool");
	/**
	 * IEntityNodeClass is an interface for the constructable class definition EntityNode that is used to
	 * create node objects in the partition pipeline that represent the contents of a Entity
	 *
	 * @class away.pool.IEntityNodeClass
	 */
	interface IEntityNodeClass {
	    /**
	     *
	     */
	    id: string;
	    /**
	     *
	     */
	    new (pool: EntityNodePool, entity: IEntity, partition: Partition): EntityNode;
	}
	export = IEntityNodeClass;
	
}

declare module "awayjs-display/lib/pool/IRenderObject" {
	/**
	 * IRenderPass provides an abstract base class for material shader passes. A material pass constitutes at least
	 * a render call per required renderable.
	 */
	interface IRenderObject {
	    /**
	     *
	     */
	    dispose(): any;
	    /**
	     *
	     */
	    invalidateRenderObject(): any;
	    /**
	     *
	     */
	    invalidatePasses(): any;
	    /**
	     *
	     */
	    invalidateAnimation(): any;
	}
	export = IRenderObject;
	
}

declare module "awayjs-display/lib/pool/IRenderable" {
	import IEntity = require("awayjs-display/lib/entities/IEntity");
	/**
	 * IRenderable is an interface for classes that are used in the rendering pipeline to render the
	 * contents of a partition
	 *
	 * @class away.render.IRenderable
	 */
	interface IRenderable {
	    /**
	     *
	     */
	    next: IRenderable;
	    /**
	     *
	     */
	    sourceEntity: IEntity;
	    /**
	     *
	     */
	    renderObjectId: number;
	    /**
	     *
	     */
	    renderOrderId: number;
	    /**
	     *
	     */
	    zIndex: number;
	    /**
	     *
	     */
	    dispose(): any;
	    /**
	     *
	     */
	    invalidateGeometry(): any;
	    /**
	     *
	     */
	    invalidateIndexData(): any;
	    /**
	     *
	     */
	    invalidateVertexData(dataType: string): any;
	}
	export = IRenderable;
	
}

declare module "awayjs-display/lib/pool/IRenderablePool" {
	import IRenderableOwner = require("awayjs-display/lib/base/IRenderableOwner");
	import IRenderObject = require("awayjs-display/lib/pool/IRenderObject");
	import MaterialBase = require("awayjs-display/lib/materials/MaterialBase");
	import Skybox = require("awayjs-display/lib/entities/Skybox");
	/**
	 * IRenderPass provides an abstract base class for material shader passes. A material pass constitutes at least
	 * a render call per required renderable.
	 */
	interface IRenderablePool {
	    getMaterialRenderObject(material: MaterialBase): IRenderObject;
	    getSkyboxRenderObject(skybox: Skybox): IRenderObject;
	    disposeItem(renderableOwner: IRenderableOwner): any;
	}
	export = IRenderablePool;
	
}

declare module "awayjs-display/lib/pool/IRendererPool" {
	import LineSubMesh = require("awayjs-display/lib/base/LineSubMesh");
	import TriangleSubMesh = require("awayjs-display/lib/base/TriangleSubMesh");
	import CurveSubMesh = require("awayjs-display/lib/base/CurveSubMesh");
	import Billboard = require("awayjs-display/lib/entities/Billboard");
	import LineSegment = require("awayjs-display/lib/entities/LineSegment");
	/**
	 * IRenderer is an interface for classes that are used in the rendering pipeline to render the
	 * contents of a partition
	 *
	 * @class away.render.IRenderer
	 */
	interface IRendererPool {
	    /**
	     *
	     * @param billboard
	     */
	    applyBillboard(billboard: Billboard): any;
	    /**
	     *
	     * @param triangleSubMesh
	     */
	    applyLineSegment(lineSegment: LineSegment): any;
	    /**
	     *
	     * @param triangleSubMesh
	     */
	    applyLineSubMesh(lineSubMesh: LineSubMesh): any;
	    /**
	     *
	     * @param triangleSubMesh
	     */
	    applyTriangleSubMesh(triangleSubMesh: TriangleSubMesh): any;
	    /**
	     *
	     * @param curveSubMesh
	     */
	    applyCurveSubMesh(curveSubMesh: CurveSubMesh): any;
	}
	export = IRendererPool;
	
}

declare module "awayjs-display/lib/pool/SubMeshPool" {
	import SubGeometryBase = require("awayjs-core/lib/data/SubGeometryBase");
	import ISubMeshClass = require("awayjs-display/lib/base/ISubMeshClass");
	/**
	 * @class away.pool.SubMeshPool
	 */
	class SubMeshPool {
	    private static subMeshClassPool;
	    /**
	     *
	     * @param subMeshClass
	     */
	    static registerSubMeshClass(subMeshClass: ISubMeshClass): void;
	    /**
	     *
	     * @param subGeometry
	     */
	    static getSubMeshClass(subGeometry: SubGeometryBase): ISubMeshClass;
	    static main: void;
	    static addDefaults(): void;
	}
	export = SubMeshPool;
	
}

declare module "awayjs-display/lib/prefabs/PrefabBase" {
	import AssetBase = require("awayjs-core/lib/library/AssetBase");
	import DisplayObject = require("awayjs-display/lib/base/DisplayObject");
	/**
	 * PrefabBase is an abstract base class for prefabs, which are prebuilt display objects that allow easy cloning and updating
	 */
	class PrefabBase extends AssetBase {
	    _pObjects: Array<DisplayObject>;
	    /**
	     * Creates a new PrefabBase object.
	     */
	    constructor();
	    /**
	     * Returns a display object generated from this prefab
	     */
	    getNewObject(): DisplayObject;
	    _pCreateObject(): DisplayObject;
	    _iValidate(): void;
	}
	export = PrefabBase;
	
}

declare module "awayjs-display/lib/prefabs/PrimitiveCapsulePrefab" {
	import IAsset = require("awayjs-core/lib/library/IAsset");
	import SubGeometryBase = require("awayjs-core/lib/data/SubGeometryBase");
	import PrimitivePrefabBase = require("awayjs-display/lib/prefabs/PrimitivePrefabBase");
	/**
	 * A Capsule primitive mesh.
	 */
	class PrimitiveCapsulePrefab extends PrimitivePrefabBase implements IAsset {
	    private _radius;
	    private _height;
	    private _segmentsW;
	    private _segmentsH;
	    private _yUp;
	    private _numVertices;
	    /**
	     * The radius of the capsule.
	     */
	    radius: number;
	    /**
	     * The height of the capsule.
	     */
	    height: number;
	    /**
	     * Defines the number of horizontal segments that make up the capsule. Defaults to 16.
	     */
	    segmentsW: number;
	    /**
	     * Defines the number of vertical segments that make up the capsule. Defaults to 15. Must be uneven.
	     */
	    segmentsH: number;
	    /**
	     * Defines whether the capsule poles should lay on the Y-axis (true) or on the Z-axis (false).
	     */
	    yUp: boolean;
	    /**
	     * Creates a new Capsule object.
	     * @param radius The radius of the capsule.
	     * @param height The height of the capsule.
	     * @param segmentsW Defines the number of horizontal segments that make up the capsule. Defaults to 16.
	     * @param segmentsH Defines the number of vertical segments that make up the capsule. Defaults to 15. Must be uneven value.
	     * @param yUp Defines whether the capsule poles should lay on the Y-axis (true) or on the Z-axis (false).
	     */
	    constructor(radius?: number, height?: number, segmentsW?: number, segmentsH?: number, yUp?: boolean);
	    /**
	     * @inheritDoc
	     */
	    _pBuildGeometry(target: SubGeometryBase, geometryType: string): void;
	    /**
	     * @inheritDoc
	     */
	    _pBuildUVs(target: SubGeometryBase, geometryType: string): void;
	}
	export = PrimitiveCapsulePrefab;
	
}

declare module "awayjs-display/lib/prefabs/PrimitiveConePrefab" {
	import IAsset = require("awayjs-core/lib/library/IAsset");
	import PrimitiveCylinderPrefab = require("awayjs-display/lib/prefabs/PrimitiveCylinderPrefab");
	/**
	 * A UV Cone primitive mesh.
	 */
	class PrimitiveConePrefab extends PrimitiveCylinderPrefab implements IAsset {
	    /**
	     * The radius of the bottom end of the cone.
	     */
	    radius: number;
	    /**
	     * Creates a new Cone object.
	     * @param radius The radius of the bottom end of the cone
	     * @param height The height of the cone
	     * @param segmentsW Defines the number of horizontal segments that make up the cone. Defaults to 16.
	     * @param segmentsH Defines the number of vertical segments that make up the cone. Defaults to 1.
	     * @param yUp Defines whether the cone poles should lay on the Y-axis (true) or on the Z-axis (false).
	     */
	    constructor(radius?: number, height?: number, segmentsW?: number, segmentsH?: number, closed?: boolean, yUp?: boolean);
	}
	export = PrimitiveConePrefab;
	
}

declare module "awayjs-display/lib/prefabs/PrimitiveCubePrefab" {
	import IAsset = require("awayjs-core/lib/library/IAsset");
	import SubGeometryBase = require("awayjs-core/lib/data/SubGeometryBase");
	import PrimitivePrefabBase = require("awayjs-display/lib/prefabs/PrimitivePrefabBase");
	/**
	 * A Cube primitive prefab.
	 */
	class PrimitiveCubePrefab extends PrimitivePrefabBase implements IAsset {
	    private _width;
	    private _height;
	    private _depth;
	    private _tile6;
	    private _segmentsW;
	    private _segmentsH;
	    private _segmentsD;
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
	    constructor(width?: number, height?: number, depth?: number, segmentsW?: number, segmentsH?: number, segmentsD?: number, tile6?: boolean);
	    /**
	     * The size of the cube along its X-axis.
	     */
	    width: number;
	    /**
	     * The size of the cube along its Y-axis.
	     */
	    height: number;
	    /**
	     * The size of the cube along its Z-axis.
	     */
	    depth: number;
	    /**
	     * The type of uv mapping to use. When false, the entire image is mapped on each face.
	     * When true, a texture will be subdivided in a 3x2 grid, each used for a single face.
	     * Reading the tiles from left to right, top to bottom they represent the faces of the
	     * cube in the following order: bottom, top, back, left, front, right. This creates
	     * several shared edges (between the top, front, left and right faces) which simplifies
	     * texture painting.
	     */
	    tile6: boolean;
	    /**
	     * The number of segments that make up the cube along the X-axis. Defaults to 1.
	     */
	    segmentsW: number;
	    /**
	     * The number of segments that make up the cube along the Y-axis. Defaults to 1.
	     */
	    segmentsH: number;
	    /**
	     * The number of segments that make up the cube along the Z-axis. Defaults to 1.
	     */
	    segmentsD: number;
	    /**
	     * @inheritDoc
	     */
	    _pBuildGeometry(target: SubGeometryBase, geometryType: string): void;
	    /**
	     * @inheritDoc
	     */
	    _pBuildUVs(target: SubGeometryBase, geometryType: string): void;
	}
	export = PrimitiveCubePrefab;
	
}

declare module "awayjs-display/lib/prefabs/PrimitiveCylinderPrefab" {
	import IAsset = require("awayjs-core/lib/library/IAsset");
	import SubGeometryBase = require("awayjs-core/lib/data/SubGeometryBase");
	import PrimitivePrefabBase = require("awayjs-display/lib/prefabs/PrimitivePrefabBase");
	/**
	 * A Cylinder primitive mesh.
	 */
	class PrimitiveCylinderPrefab extends PrimitivePrefabBase implements IAsset {
	    _pBottomRadius: number;
	    _pSegmentsW: number;
	    _pSegmentsH: number;
	    private _topRadius;
	    private _height;
	    private _topClosed;
	    private _bottomClosed;
	    private _surfaceClosed;
	    private _yUp;
	    private _numVertices;
	    /**
	     * The radius of the top end of the cylinder.
	     */
	    topRadius: number;
	    /**
	     * The radius of the bottom end of the cylinder.
	     */
	    bottomRadius: number;
	    /**
	     * The radius of the top end of the cylinder.
	     */
	    height: number;
	    /**
	     * Defines the number of horizontal segments that make up the cylinder. Defaults to 16.
	     */
	    segmentsW: number;
	    setSegmentsW(value: number): void;
	    /**
	     * Defines the number of vertical segments that make up the cylinder. Defaults to 1.
	     */
	    segmentsH: number;
	    setSegmentsH(value: number): void;
	    /**
	     * Defines whether the top end of the cylinder is closed (true) or open.
	     */
	    topClosed: boolean;
	    /**
	     * Defines whether the bottom end of the cylinder is closed (true) or open.
	     */
	    bottomClosed: boolean;
	    /**
	     * Defines whether the cylinder poles should lay on the Y-axis (true) or on the Z-axis (false).
	     */
	    yUp: boolean;
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
	    constructor(topRadius?: number, bottomRadius?: number, height?: number, segmentsW?: number, segmentsH?: number, topClosed?: boolean, bottomClosed?: boolean, surfaceClosed?: boolean, yUp?: boolean);
	    /**
	     * @inheritDoc
	     */
	    _pBuildGeometry(target: SubGeometryBase, geometryType: string): void;
	    /**
	     * @inheritDoc
	     */
	    _pBuildUVs(target: SubGeometryBase, geometryType: string): void;
	}
	export = PrimitiveCylinderPrefab;
	
}

declare module "awayjs-display/lib/prefabs/PrimitivePlanePrefab" {
	import IAsset = require("awayjs-core/lib/library/IAsset");
	import SubGeometryBase = require("awayjs-core/lib/data/SubGeometryBase");
	import PrimitivePrefabBase = require("awayjs-display/lib/prefabs/PrimitivePrefabBase");
	/**
	 * A Plane primitive mesh.
	 */
	class PrimitivePlanePrefab extends PrimitivePrefabBase implements IAsset {
	    private _segmentsW;
	    private _segmentsH;
	    private _yUp;
	    private _width;
	    private _height;
	    private _doubleSided;
	    /**
	     * Creates a new Plane object.
	     * @param width The width of the plane.
	     * @param height The height of the plane.
	     * @param segmentsW The number of segments that make up the plane along the X-axis.
	     * @param segmentsH The number of segments that make up the plane along the Y or Z-axis.
	     * @param yUp Defines whether the normal vector of the plane should point along the Y-axis (true) or Z-axis (false).
	     * @param doubleSided Defines whether the plane will be visible from both sides, with correct vertex normals.
	     */
	    constructor(width?: number, height?: number, segmentsW?: number, segmentsH?: number, yUp?: boolean, doubleSided?: boolean);
	    /**
	     * The number of segments that make up the plane along the X-axis. Defaults to 1.
	     */
	    segmentsW: number;
	    /**
	     * The number of segments that make up the plane along the Y or Z-axis, depending on whether yUp is true or
	     * false, respectively. Defaults to 1.
	     */
	    segmentsH: number;
	    /**
	     *  Defines whether the normal vector of the plane should point along the Y-axis (true) or Z-axis (false). Defaults to true.
	     */
	    yUp: boolean;
	    /**
	     * Defines whether the plane will be visible from both sides, with correct vertex normals (as opposed to bothSides on Material). Defaults to false.
	     */
	    doubleSided: boolean;
	    /**
	     * The width of the plane.
	     */
	    width: number;
	    /**
	     * The height of the plane.
	     */
	    height: number;
	    /**
	     * @inheritDoc
	     */
	    _pBuildGeometry(target: SubGeometryBase, geometryType: string): void;
	    /**
	     * @inheritDoc
	     */
	    _pBuildUVs(target: SubGeometryBase, geometryType: string): void;
	}
	export = PrimitivePlanePrefab;
	
}

declare module "awayjs-display/lib/prefabs/PrimitivePolygonPrefab" {
	import IAsset = require("awayjs-core/lib/library/IAsset");
	import PrimitiveCylinderPrefab = require("awayjs-display/lib/prefabs/PrimitiveCylinderPrefab");
	/**
	 * A UV RegularPolygon primitive mesh.
	 */
	class PrimitivePolygonPrefab extends PrimitiveCylinderPrefab implements IAsset {
	    /**
	     * The radius of the regular polygon.
	     */
	    radius: number;
	    /**
	     * The number of sides of the regular polygon.
	     */
	    sides: number;
	    /**
	     * The number of subdivisions from the edge to the center of the regular polygon.
	     */
	    subdivisions: number;
	    /**
	     * Creates a new RegularPolygon disc object.
	     * @param radius The radius of the regular polygon
	     * @param sides Defines the number of sides of the regular polygon.
	     * @param yUp Defines whether the regular polygon should lay on the Y-axis (true) or on the Z-axis (false).
	     */
	    constructor(radius?: number, sides?: number, yUp?: boolean);
	}
	export = PrimitivePolygonPrefab;
	
}

declare module "awayjs-display/lib/prefabs/PrimitivePrefabBase" {
	import Geometry = require("awayjs-core/lib/data/Geometry");
	import SubGeometryBase = require("awayjs-core/lib/data/SubGeometryBase");
	import DisplayObject = require("awayjs-display/lib/base/DisplayObject");
	import MaterialBase = require("awayjs-display/lib/materials/MaterialBase");
	import PrefabBase = require("awayjs-display/lib/prefabs/PrefabBase");
	/**
	 * PrimitivePrefabBase is an abstract base class for polytope prefabs, which are simple pre-built geometric shapes
	 */
	class PrimitivePrefabBase extends PrefabBase {
	    static assetType: string;
	    _geomDirty: boolean;
	    _uvDirty: boolean;
	    private _material;
	    private _geometry;
	    private _subGeometry;
	    private _geometryType;
	    private _geometryTypeDirty;
	    /**
	     *
	     */
	    assetType: string;
	    /**
	     *
	     */
	    geometryType: string;
	    geometry: Geometry;
	    /**
	     * The material with which to render the primitive.
	     */
	    material: MaterialBase;
	    /**
	     * Creates a new PrimitivePrefabBase object.
	     *
	     * @param material The material with which to render the object
	     */
	    constructor(material?: MaterialBase, geometryType?: string);
	    /**
	     * Builds the primitive's geometry when invalid. This method should not be called directly. The calling should
	     * be triggered by the invalidateGeometry method (and in turn by updateGeometry).
	     */
	    _pBuildGeometry(target: SubGeometryBase, geometryType: string): void;
	    /**
	     * Builds the primitive's uv coordinates when invalid. This method should not be called directly. The calling
	     * should be triggered by the invalidateUVs method (and in turn by updateUVs).
	     */
	    _pBuildUVs(target: SubGeometryBase, geometryType: string): void;
	    /**
	     * Invalidates the primitive's geometry type, causing it to be updated when requested.
	     */
	    invalidateGeometryType(): void;
	    /**
	     * Invalidates the primitive's geometry, causing it to be updated when requested.
	     */
	    _pInvalidateGeometry(): void;
	    /**
	     * Invalidates the primitive's uv coordinates, causing them to be updated when requested.
	     */
	    _pInvalidateUVs(): void;
	    /**
	     * Updates the subgeometry when invalid.
	     */
	    private updateGeometryType();
	    /**
	     * Updates the geometry when invalid.
	     */
	    private updateGeometry();
	    /**
	     * Updates the uv coordinates when invalid.
	     */
	    private updateUVs();
	    _iValidate(): void;
	    _pCreateObject(): DisplayObject;
	}
	export = PrimitivePrefabBase;
	
}

declare module "awayjs-display/lib/prefabs/PrimitiveSpherePrefab" {
	import IAsset = require("awayjs-core/lib/library/IAsset");
	import SubGeometryBase = require("awayjs-core/lib/data/SubGeometryBase");
	import PrimitivePrefabBase = require("awayjs-display/lib/prefabs/PrimitivePrefabBase");
	/**
	 * A UV Sphere primitive mesh.
	 */
	class PrimitiveSpherePrefab extends PrimitivePrefabBase implements IAsset {
	    private _radius;
	    private _segmentsW;
	    private _segmentsH;
	    private _yUp;
	    /**
	     * The radius of the sphere.
	     */
	    radius: number;
	    /**
	     * Defines the number of horizontal segments that make up the sphere. Defaults to 16.
	     */
	    segmentsW: number;
	    /**
	     * Defines the number of vertical segments that make up the sphere. Defaults to 12.
	     */
	    segmentsH: number;
	    /**
	     * Defines whether the sphere poles should lay on the Y-axis (true) or on the Z-axis (false).
	     */
	    yUp: boolean;
	    /**
	     * Creates a new Sphere object.
	     *
	     * @param radius The radius of the sphere.
	     * @param segmentsW Defines the number of horizontal segments that make up the sphere.
	     * @param segmentsH Defines the number of vertical segments that make up the sphere.
	     * @param yUp Defines whether the sphere poles should lay on the Y-axis (true) or on the Z-axis (false).
	     */
	    constructor(radius?: number, segmentsW?: number, segmentsH?: number, yUp?: boolean);
	    /**
	     * @inheritDoc
	     */
	    _pBuildGeometry(target: SubGeometryBase, geometryType: string): void;
	    /**
	     * @inheritDoc
	     */
	    _pBuildUVs(target: SubGeometryBase, geometryType: string): void;
	}
	export = PrimitiveSpherePrefab;
	
}

declare module "awayjs-display/lib/prefabs/PrimitiveTorusPrefab" {
	import IAsset = require("awayjs-core/lib/library/IAsset");
	import SubGeometryBase = require("awayjs-core/lib/data/SubGeometryBase");
	import PrimitivePrefabBase = require("awayjs-display/lib/prefabs/PrimitivePrefabBase");
	/**
	 * A UV Cylinder primitive mesh.
	 */
	class PrimitiveTorusPrefab extends PrimitivePrefabBase implements IAsset {
	    private _radius;
	    private _tubeRadius;
	    private _segmentsR;
	    private _segmentsT;
	    private _yUp;
	    private _numVertices;
	    /**
	     * The radius of the torus.
	     */
	    radius: number;
	    /**
	     * The radius of the inner tube of the torus.
	     */
	    tubeRadius: number;
	    /**
	     * Defines the number of horizontal segments that make up the torus. Defaults to 16.
	     */
	    segmentsR: number;
	    /**
	     * Defines the number of vertical segments that make up the torus. Defaults to 8.
	     */
	    segmentsT: number;
	    /**
	     * Defines whether the torus poles should lay on the Y-axis (true) or on the Z-axis (false).
	     */
	    yUp: boolean;
	    /**
	     * Creates a new <code>Torus</code> object.
	     * @param radius The radius of the torus.
	     * @param tuebRadius The radius of the inner tube of the torus.
	     * @param segmentsR Defines the number of horizontal segments that make up the torus.
	     * @param segmentsT Defines the number of vertical segments that make up the torus.
	     * @param yUp Defines whether the torus poles should lay on the Y-axis (true) or on the Z-axis (false).
	     */
	    constructor(radius?: number, tubeRadius?: number, segmentsR?: number, segmentsT?: number, yUp?: boolean);
	    /**
	     * @inheritDoc
	     */
	    _pBuildGeometry(target: SubGeometryBase, geometryType: string): void;
	    /**
	     * @inheritDoc
	     */
	    _pBuildUVs(target: SubGeometryBase, geometryType: string): void;
	}
	export = PrimitiveTorusPrefab;
	
}

declare module "awayjs-display/lib/render/CSSDefaultRenderer" {
	import CSSRendererBase = require("awayjs-display/lib/render/CSSRendererBase");
	import IRenderer = require("awayjs-display/lib/render/IRenderer");
	import EntityCollector = require("awayjs-display/lib/traverse/EntityCollector");
	import CollectorBase = require("awayjs-display/lib/traverse/CollectorBase");
	/**
	 * The DefaultRenderer class provides the default rendering method. It renders the scene graph objects using the
	 * materials assigned to them.
	 *
	 * @class away.render.DefaultRenderer
	 */
	class CSSDefaultRenderer extends CSSRendererBase implements IRenderer {
	    private _container;
	    private _context;
	    private _contextStyle;
	    private _contextMatrix;
	    private _activeMaterial;
	    private _skyboxProjection;
	    private _transform;
	    /**
	     * Creates a new CSSDefaultRenderer object.
	     */
	    constructor();
	    /**
	     *
	     * @param entityCollector
	     */
	    render(entityCollector: CollectorBase): void;
	    /**
	     * @inheritDoc
	     */
	    pDraw(entityCollector: EntityCollector): void;
	    /**
	     * Updates the backbuffer properties.
	     */
	    pUpdateBackBuffer(): void;
	    /**
	     * Draw the skybox if present.
	     * @param entityCollector The EntityCollector containing all potentially visible information.
	     */
	    private drawSkybox(entityCollector);
	    /**
	     * Draw a list of renderables.
	     * @param renderables The renderables to draw.
	     * @param entityCollector The EntityCollector containing all potentially visible information.
	     */
	    private drawRenderables(item, entityCollector);
	    dispose(): void;
	    _iCreateEntityCollector(): CollectorBase;
	}
	export = CSSDefaultRenderer;
	
}

declare module "awayjs-display/lib/render/CSSRendererBase" {
	import Rectangle = require("awayjs-core/lib/geom/Rectangle");
	import Vector3D = require("awayjs-core/lib/geom/Vector3D");
	import EventDispatcher = require("awayjs-core/lib/events/EventDispatcher");
	import LineSubMesh = require("awayjs-display/lib/base/LineSubMesh");
	import TriangleSubMesh = require("awayjs-display/lib/base/TriangleSubMesh");
	import CSSRenderableBase = require("awayjs-display/lib/pool/CSSRenderableBase");
	import IEntitySorter = require("awayjs-display/lib/sort/IEntitySorter");
	import CSSEntityCollector = require("awayjs-display/lib/traverse/CSSEntityCollector");
	import EntityCollector = require("awayjs-display/lib/traverse/EntityCollector");
	import CollectorBase = require("awayjs-display/lib/traverse/CollectorBase");
	import Billboard = require("awayjs-display/lib/entities/Billboard");
	import Camera = require("awayjs-display/lib/entities/Camera");
	import Skybox = require("awayjs-display/lib/entities/Skybox");
	import TextureBase = require("awayjs-core/lib/textures/TextureBase");
	/**
	 * RendererBase forms an abstract base class for classes that are used in the rendering pipeline to render the
	 * contents of a partition
	 *
	 * @class away.render.RendererBase
	 */
	class CSSRendererBase extends EventDispatcher {
	    private _billboardRenderablePool;
	    private _lineSegmentRenderablePool;
	    _pCamera: Camera;
	    _iEntryPoint: Vector3D;
	    _pCameraForward: Vector3D;
	    private _backgroundR;
	    private _backgroundG;
	    private _backgroundB;
	    private _backgroundAlpha;
	    private _shareContext;
	    _pBackBufferInvalid: boolean;
	    _depthTextureInvalid: boolean;
	    _renderableHead: CSSRenderableBase;
	    _width: number;
	    _height: number;
	    private _viewPort;
	    private _viewportDirty;
	    private _scissorRect;
	    private _scissorDirty;
	    private _localPos;
	    private _globalPos;
	    private _scissorUpdated;
	    private _viewPortUpdated;
	    /**
	     * A viewPort rectangle equivalent of the StageGL size and position.
	     */
	    viewPort: Rectangle;
	    /**
	     * A scissor rectangle equivalent of the view size and position.
	     */
	    scissorRect: Rectangle;
	    /**
	     *
	     */
	    x: number;
	    /**
	     *
	     */
	    y: number;
	    /**
	     *
	     */
	    width: number;
	    /**
	     *
	     */
	    height: number;
	    /**
	     *
	     */
	    renderableSorter: IEntitySorter;
	    /**
	     * Creates a new RendererBase object.
	     */
	    constructor(renderToTexture?: boolean, forceSoftware?: boolean, profile?: string);
	    /**
	     * The background color's red component, used when clearing.
	     *
	     * @private
	     */
	    _iBackgroundR: number;
	    /**
	     * The background color's green component, used when clearing.
	     *
	     * @private
	     */
	    _iBackgroundG: number;
	    /**
	     * The background color's blue component, used when clearing.
	     *
	     * @private
	     */
	    _iBackgroundB: number;
	    shareContext: boolean;
	    /**
	     * Disposes the resources used by the RendererBase.
	     */
	    dispose(): void;
	    render(entityCollector: CollectorBase): void;
	    /**
	     * Renders the potentially visible geometry to the back buffer or texture.
	     * @param entityCollector The EntityCollector object containing the potentially visible geometry.
	     * @param scissorRect
	     */
	    _iRender(entityCollector: EntityCollector, target?: TextureBase, scissorRect?: Rectangle, surfaceSelector?: number): void;
	    _iRenderCascades(entityCollector: CollectorBase, target: TextureBase, numCascades: number, scissorRects: Array<Rectangle>, cameras: Array<Camera>): void;
	    pCollectRenderables(entityCollector: CollectorBase): void;
	    /**
	     * Renders the potentially visible geometry to the back buffer or texture. Only executed if everything is set up.
	     * @param entityCollector The EntityCollector object containing the potentially visible geometry.
	     * @param scissorRect
	     */
	    pExecuteRender(entityCollector: CSSEntityCollector, scissorRect?: Rectangle): void;
	    /**
	     * Performs the actual drawing of dom objects to the target.
	     *
	     * @param entityCollector The EntityCollector object containing the potentially visible dom objects.
	     */
	    pDraw(entityCollector: CSSEntityCollector): void;
	    _iBackgroundAlpha: number;
	    /**
	     *
	     * @param billboard
	     */
	    applyBillboard(billboard: Billboard): void;
	    /**
	     *
	     * @param lineSubMesh
	     */
	    applyLineSubMesh(lineSubMesh: LineSubMesh): void;
	    /**
	     *
	     * @param skybox
	     */
	    applySkybox(skybox: Skybox): void;
	    /**
	     *
	     * @param triangleSubMesh
	     */
	    applyTriangleSubMesh(triangleSubMesh: TriangleSubMesh): void;
	    /**
	     *
	     * @param renderable
	     * @private
	     */
	    private _applyRenderable(renderable);
	    /**
	     * @private
	     */
	    private notifyScissorUpdate();
	    /**
	     * @private
	     */
	    private notifyViewportUpdate();
	    /**
	     *
	     */
	    updateGlobalPos(): void;
	    _iCreateEntityCollector(): CollectorBase;
	}
	export = CSSRendererBase;
	
}

declare module "awayjs-display/lib/render/IRenderer" {
	import IEventDispatcher = require("awayjs-core/lib/events/IEventDispatcher");
	import Rectangle = require("awayjs-core/lib/geom/Rectangle");
	import IEntitySorter = require("awayjs-display/lib/sort/IEntitySorter");
	import CollectorBase = require("awayjs-display/lib/traverse/CollectorBase");
	import Camera = require("awayjs-display/lib/entities/Camera");
	import TextureBase = require("awayjs-core/lib/textures/TextureBase");
	/**
	 * IRenderer is an interface for classes that are used in the rendering pipeline to render the
	 * contents of a partition
	 *
	 * @class away.render.IRenderer
	 */
	interface IRenderer extends IEventDispatcher {
	    /**
	     *
	     */
	    renderableSorter: IEntitySorter;
	    /**
	     *
	     */
	    shareContext: boolean;
	    /**
	     *
	     */
	    x: number;
	    /**
	     *
	     */
	    y: number;
	    /**
	     *
	     */
	    width: number;
	    /**
	     *
	     */
	    height: number;
	    /**
	     *
	     */
	    viewPort: Rectangle;
	    /**
	     *
	     */
	    scissorRect: Rectangle;
	    /**
	     *
	     */
	    dispose(): any;
	    /**
	     *
	     * @param entityCollector
	     */
	    render(entityCollector: CollectorBase): any;
	    /**
	     * @internal
	     */
	    _iBackgroundR: number;
	    /**
	     * @internal
	     */
	    _iBackgroundG: number;
	    /**
	     * @internal
	     */
	    _iBackgroundB: number;
	    /**
	     * @internal
	     */
	    _iBackgroundAlpha: number;
	    /**
	     * @internal
	     */
	    _iCreateEntityCollector(): CollectorBase;
	    _iRender(entityCollector: CollectorBase, target?: TextureBase, scissorRect?: Rectangle, surfaceSelector?: number): any;
	    _iRenderCascades(entityCollector: CollectorBase, target: TextureBase, numCascades: number, scissorRects: Array<Rectangle>, cameras: Array<Camera>): any;
	}
	export = IRenderer;
	
}

declare module "awayjs-display/lib/sort/IEntitySorter" {
	import IRenderable = require("awayjs-display/lib/pool/IRenderable");
	/**
	 * @interface away.sort.IEntitySorter
	 */
	interface IEntitySorter {
	    sortBlendedRenderables(head: IRenderable): IRenderable;
	    sortOpaqueRenderables(head: IRenderable): IRenderable;
	}
	export = IEntitySorter;
	
}

declare module "awayjs-display/lib/sort/RenderableMergeSort" {
	import IRenderable = require("awayjs-display/lib/pool/IRenderable");
	import IEntitySorter = require("awayjs-display/lib/sort/IEntitySorter");
	/**
	 * @class away.sort.RenderableMergeSort
	 */
	class RenderableMergeSort implements IEntitySorter {
	    sortBlendedRenderables(head: IRenderable): IRenderable;
	    sortOpaqueRenderables(head: IRenderable): IRenderable;
	}
	export = RenderableMergeSort;
	
}

declare module "awayjs-display/lib/sort/RenderableNullSort" {
	import IRenderable = require("awayjs-display/lib/pool/IRenderable");
	import IEntitySorter = require("awayjs-display/lib/sort/IEntitySorter");
	/**
	 * @class away.sort.NullSort
	 */
	class RenderableNullSort implements IEntitySorter {
	    sortBlendedRenderables(head: IRenderable): IRenderable;
	    sortOpaqueRenderables(head: IRenderable): IRenderable;
	}
	export = RenderableNullSort;
	
}

declare module "awayjs-display/lib/text/AntiAliasType" {
	/**
	 * The AntiAliasType class provides values for anti-aliasing in the
	 * away.text.TextField class.
	 */
	class AntiAliasType {
	    /**
	     * Sets anti-aliasing to advanced anti-aliasing. Advanced anti-aliasing
	     * allows font faces to be rendered at very high quality at small sizes. It
	     * is best used with applications that have a lot of small text. Advanced
	     * anti-aliasing is not recommended for very large fonts(larger than 48
	     * points). This constant is used for the <code>antiAliasType</code> property
	     * in the TextField class. Use the syntax
	     * <code>AntiAliasType.ADVANCED</code>.
	     */
	    static ADVANCED: string;
	    /**
	     * Sets anti-aliasing to the anti-aliasing that is used in Flash Player 7 and
	     * earlier. This setting is recommended for applications that do not have a
	     * lot of text. This constant is used for the <code>antiAliasType</code>
	     * property in the TextField class. Use the syntax
	     * <code>AntiAliasType.NORMAL</code>.
	     */
	    static NORMAL: string;
	}
	export = AntiAliasType;
	
}

declare module "awayjs-display/lib/text/Font" {
	import AssetBase = require("awayjs-core/lib/library/AssetBase");
	import IAsset = require("awayjs-core/lib/library/IAsset");
	import FontTable = require("awayjs-display/lib/text/TesselatedFontTable");
	/**
	 * SubMeshBase wraps a TriangleSubGeometry as a scene graph instantiation. A SubMeshBase is owned by a Mesh object.
	 *
	 *
	 * @see away.base.TriangleSubGeometry
	 * @see away.entities.Mesh
	 *
	 * @class away.base.SubMeshBase
	 */
	class Font extends AssetBase implements IAsset {
	    static assetType: string;
	    private _font_styles;
	    /**
	     * Creates a new TesselatedFont object
	     */
	    constructor();
	    /**
	     *
	     */
	    assetType: string;
	    /**
	     *
	     */
	    dispose(): void;
	    /**
	     *Get a font-table for a specific name, or create one if it does not exists.
	     */
	    get_font_table(style_name: string): FontTable;
	}
	export = Font;
	
}

declare module "awayjs-display/lib/text/GridFitType" {
	/**
	 * The GridFitType class defines values for grid fitting in the TextField class.
	 */
	class GridFitType {
	    /**
	     * Doesn't set grid fitting. Horizontal and vertical lines in the glyphs are
	     * not forced to the pixel grid. This constant is used in setting the
	     * <code>gridFitType</code> property of the TextField class. This is often a
	     * good setting for animation or for large font sizes. Use the syntax
	     * <code>GridFitType.NONE</code>.
	     */
	    static NONE: string;
	    /**
	     * Fits strong horizontal and vertical lines to the pixel grid. This constant
	     * is used in setting the <code>gridFitType</code> property of the TextField
	     * class. This setting only works for left-justified text fields and acts
	     * like the <code>GridFitType.SUBPIXEL</code> constant in static text. This
	     * setting generally provides the best readability for left-aligned text. Use
	     * the syntax <code>GridFitType.PIXEL</code>.
	     */
	    static PIXEL: string;
	    /**
	     * Fits strong horizontal and vertical lines to the sub-pixel grid on LCD
	     * monitors. (Red, green, and blue are actual pixels on an LCD screen.) This
	     * is often a good setting for right-aligned or center-aligned dynamic text,
	     * and it is sometimes a useful tradeoff for animation vs. text quality. This
	     * constant is used in setting the <code>gridFitType</code> property of the
	     * TextField class. Use the syntax <code>GridFitType.SUBPIXEL</code>.
	     */
	    static SUBPIXEL: string;
	}
	export = GridFitType;
	
}

declare module "awayjs-display/lib/text/TesselatedFontChar" {
	import CurveSubGeometry = require("awayjs-core/lib/data/CurveSubGeometry");
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
	class TesselatedFontChar {
	    /**
	     * The width of the char
	     */
	    char_width: number;
	    /**
	     * SubGeometry for this char
	     */
	    subgeom: CurveSubGeometry;
	    /**
	     * the char_codes that this geom has kerning set for
	     */
	    kerningCharCodes: Array<number>;
	    /**
	     * the kerning values per char_code
	     */
	    kerningValues: Array<number>;
	    constructor(subgeom: CurveSubGeometry);
	}
	export = TesselatedFontChar;
	
}

declare module "awayjs-display/lib/text/TesselatedFontTable" {
	import AssetBase = require("awayjs-core/lib/library/AssetBase");
	import SubGeometryBase = require("awayjs-core/lib/data/SubGeometryBase");
	import TesselatedFontChar = require("awayjs-display/lib/text/TesselatedFontChar");
	/**
	 * SubMeshBase wraps a TriangleSubGeometry as a scene graph instantiation. A SubMeshBase is owned by a Mesh object.
	 *
	 *
	 * @see away.base.TriangleSubGeometry
	 * @see away.entities.Mesh
	 *
	 * @class away.base.SubMeshBase
	 */
	class TesselatedFontTable extends AssetBase {
	    private _font_chars;
	    private _font_chars_dic;
	    private _font_em_size;
	    private _charDictDirty;
	    /**
	     * Creates a new TesselatedFont object
	     */
	    constructor();
	    /**
	     *
	     */
	    dispose(): void;
	    get_font_chars(): Array<TesselatedFontChar>;
	    get_font_em_size(): number;
	    set_font_em_size(font_em_size: number): void;
	    /**
	     *
	     */
	    get_subgeo_for_char(char: string): TesselatedFontChar;
	    /**
	     *
	     */
	    set_subgeo_for_char(char: string, subgeo: SubGeometryBase): void;
	}
	export = TesselatedFontTable;
	
}

declare module "awayjs-display/lib/text/TextFieldAutoSize" {
	/**
	 * The TextFieldAutoSize class is an enumeration of constant values used in
	 * setting the <code>autoSize</code> property of the TextField class.
	 */
	class TextFieldAutoSize {
	    /**
	     * Specifies that the text is to be treated as center-justified text. Any
	     * resizing of a single line of a text field is equally distributed to both
	     * the right and left sides.
	     */
	    static CENTER: string;
	    /**
	     * Specifies that the text is to be treated as left-justified text, meaning
	     * that the left side of the text field remains fixed and any resizing of a
	     * single line is on the right side.
	     */
	    static LEFT: string;
	    /**
	     * Specifies that no resizing is to occur.
	     */
	    static NONE: string;
	    /**
	     * Specifies that the text is to be treated as right-justified text, meaning
	     * that the right side of the text field remains fixed and any resizing of a
	     * single line is on the left side.
	     */
	    static RIGHT: string;
	}
	export = TextFieldAutoSize;
	
}

declare module "awayjs-display/lib/text/TextFieldType" {
	/**
	 * The TextFieldType class is an enumeration of constant values used in setting the
	 * <code>type</code> property of the TextField class.
	 *
	 * @see away.entities.TextField#type
	 */
	class TextFieldType {
	    /**
	     * Used to specify a <code>dynamic</code> TextField.
	     */
	    static DYNAMIC: string;
	    /**
	     * Used to specify an <code>input</code> TextField.
	     */
	    static INPUT: string;
	}
	export = TextFieldType;
	
}

declare module "awayjs-display/lib/text/TextFormat" {
	import AssetBase = require("awayjs-core/lib/library/AssetBase");
	import IAsset = require("awayjs-core/lib/library/IAsset");
	import TesselatedFontTable = require("awayjs-display/lib/text/TesselatedFontTable");
	import MaterialBase = require("awayjs-display/lib/materials/MaterialBase");
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
	class TextFormat extends AssetBase implements IAsset {
	    static assetType: string;
	    /**
	     * Indicates the alignment of the paragraph. Valid values are TextFormatAlign
	     * constants.
	     *
	     * @default TextFormatAlign.LEFT
	     * @throws ArgumentError The <code>align</code> specified is not a member of
	     *                       flash.text.TextFormatAlign.
	     */
	    align: string;
	    /**
	     * Indicates the block indentation in pixels. Block indentation is applied to
	     * an entire block of text; that is, to all lines of the text. In contrast,
	     * normal indentation(<code>TextFormat.indent</code>) affects only the first
	     * line of each paragraph. If this property is <code>null</code>, the
	     * TextFormat object does not specify block indentation(block indentation is
	     * 0).
	     */
	    blockIndent: number;
	    /**
	     * Specifies whether the text is boldface. The default value is
	     * <code>null</code>, which means no boldface is used. If the value is
	     * <code>true</code>, then the text is boldface.
	     */
	    bold: boolean;
	    /**
	     * Indicates that the text is part of a bulleted list. In a bulleted list,
	     * each paragraph of text is indented. To the left of the first line of each
	     * paragraph, a bullet symbol is displayed. The default value is
	     * <code>null</code>, which means no bulleted list is used.
	     */
	    bullet: boolean;
	    /**
	     * Indicates the color of the text. A number containing three 8-bit RGB
	     * components; for example, 0xFF0000 is red, and 0x00FF00 is green. The
	     * default value is <code>null</code>, which means that Flash Player uses the
	     * color black(0x000000).
	     */
	    color: boolean;
	    /**
	     * The material to use for texturing geometry generated for this text-format. this material will be used by the  TextField
	     */
	    material: MaterialBase;
	    /**
	     * The uv-values of the colors in textureatlas.
	     * The lenght migth be 4 in future to support bitmap-fills and gradients, but for now it will should always be 2
	     */
	    uv_values: Array<number>;
	    /**
	     * The name of the font for text in this text format, as a string.
	     * To be valid, for use with curve-rendering, the textFormat must have a Font-table assigned.
	     * The font-name can be used to get a Font-object from the AssetLibrary.
	     * A Font object provides a list of Font-table, corresponding to font-table names.
	     */
	    font_name: string;
	    /**
	     * The name of the font-style for text in this text format, as a string.
	     * To be valid, for use with curve-rendering, the textFormat must have a Font-table assigned.
	     * The font-style can be used to get a Font-table, from a Font-object.
	     */
	    font_style: string;
	    /**
	     * The font-table that provides the subgeos for the chars
	     */
	    font_table: TesselatedFontTable;
	    /**
	     * Indicates the indentation from the left margin to the first character in
	     * the paragraph. The default value is <code>null</code>, which indicates
	     * that no indentation is used.
	     */
	    indent: number;
	    /**
	     * Indicates whether text in this text format is italicized. The default
	     * value is <code>null</code>, which means no italics are used.
	     */
	    italic: boolean;
	    /**
	     * A Boolean value that indicates whether kerning is enabled
	     * (<code>true</code>) or disabled(<code>false</code>). Kerning adjusts the
	     * pixels between certain character pairs to improve readability, and should
	     * be used only when necessary, such as with headings in large fonts. Kerning
	     * is supported for embedded fonts only.
	     *
	     * <p>Certain fonts such as Verdana and monospaced fonts, such as Courier
	     * New, do not support kerning.</p>
	     *
	     * <p>The default value is <code>null</code>, which means that kerning is not
	     * enabled.</p>
	     */
	    kerning: boolean;
	    /**
	     * An integer representing the amount of vertical space(called
	     * <i>leading</i>) between lines. The default value is <code>null</code>,
	     * which indicates that the amount of leading used is 0.
	     */
	    leading: number;
	    /**
	     * The left margin of the paragraph, in pixels. The default value is
	     * <code>null</code>, which indicates that the left margin is 0 pixels.
	     */
	    leftMargin: number;
	    /**
	     * A number representing the amount of space that is uniformly distributed
	     * between all characters. The value specifies the number of pixels that are
	     * added to the advance after each character. The default value is
	     * <code>null</code>, which means that 0 pixels of letter spacing is used.
	     * You can use decimal values such as <code>1.75</code>.
	     */
	    letterSpacing: number;
	    /**
	     * The right margin of the paragraph, in pixels. The default value is
	     * <code>null</code>, which indicates that the right margin is 0 pixels.
	     */
	    rightMargin: number;
	    /**
	     * The size in pixels of text in this text format. The default value is
	     * <code>null</code>, which means that a size of 12 is used.
	     */
	    size: number;
	    /**
	     * Specifies custom tab stops as an array of non-negative integers. Each tab
	     * stop is specified in pixels. If custom tab stops are not specified
	     * (<code>null</code>), the default tab stop is 4(average character width).
	     */
	    tabStops: Array<number>;
	    /**
	     * Indicates the target window where the hyperlink is displayed. If the
	     * target window is an empty string, the text is displayed in the default
	     * target window <code>_self</code>. You can choose a custom name or one of
	     * the following four names: <code>_self</code> specifies the current frame
	     * in the current window, <code>_blank</code> specifies a new window,
	     * <code>_parent</code> specifies the parent of the current frame, and
	     * <code>_top</code> specifies the top-level frame in the current window. If
	     * the <code>TextFormat.url</code> property is an empty string or
	     * <code>null</code>, you can get or set this property, but the property will
	     * have no effect.
	     */
	    link_target: string;
	    /**
	     * Indicates whether the text that uses this text format is underlined
	     * (<code>true</code>) or not(<code>false</code>). This underlining is
	     * similar to that produced by the <code><U></code> tag, but the latter is
	     * not true underlining, because it does not skip descenders correctly. The
	     * default value is <code>null</code>, which indicates that underlining is
	     * not used.
	     */
	    underline: boolean;
	    /**
	     * Indicates the target URL for the text in this text format. If the
	     * <code>url</code> property is an empty string, the text does not have a
	     * hyperlink. The default value is <code>null</code>, which indicates that
	     * the text does not have a hyperlink.
	     *
	     * <p><b>Note:</b> The text with the assigned text format must be set with
	     * the <code>htmlText</code> property for the hyperlink to work.</p>
	     */
	    url: string;
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
	    constructor(font?: string, size?: number, color?: number, bold?: boolean, italic?: boolean, underline?: boolean, url?: string, link_target?: string, align?: string, leftMargin?: number, rightMargin?: number, indent?: number, leading?: number);
	    /**
	     *
	     */
	    assetType: string;
	}
	export = TextFormat;
	
}

declare module "awayjs-display/lib/text/TextFormatAlign" {
	/**
	 * The TextFormatAlign class provides values for text alignment in the
	 * TextFormat class.
	 */
	class TextFormatAlign {
	    /**
	     * Constant; centers the text in the text field. Use the syntax
	     * <code>TextFormatAlign.CENTER</code>.
	     */
	    CENTER: string;
	    /**
	     * Constant; justifies text within the text field. Use the syntax
	     * <code>TextFormatAlign.JUSTIFY</code>.
	     */
	    JUSTIFY: string;
	    /**
	     * Constant; aligns text to the left within the text field. Use the syntax
	     * <code>TextFormatAlign.LEFT</code>.
	     */
	    LEFT: string;
	    /**
	     * Constant; aligns text to the right within the text field. Use the syntax
	     * <code>TextFormatAlign.RIGHT</code>.
	     */
	    RIGHT: string;
	}
	export = TextFormatAlign;
	
}

declare module "awayjs-display/lib/text/TextInteractionMode" {
	/**
	 * A class that defines the Interactive mode of a text field object.
	 *
	 * @see away.entities.TextField#textInteractionMode
	 */
	class TextInteractionMode {
	    /**
	     * The text field's default interaction mode is NORMAL and it varies across
	     * platform. On Desktop, the normal mode implies that the text field is in
	     * scrollable + selection mode. On Mobile platforms like Android, normal mode
	     * implies that the text field can only be scrolled but the text can not be
	     * selected.
	     */
	    static NORMAL: string;
	    /**
	     * On mobile platforms like Android, the text field starts in normal mode
	     * (which implies scroll and non-selectable mode). The user can switch to
	     * selection mode through the in-built context menu of the text field object.
	     */
	    static SELECTION: string;
	}
	export = TextInteractionMode;
	
}

declare module "awayjs-display/lib/text/TextLineMetrics" {
	/**
	 * The TextLineMetrics class contains information about the text position and
	 * measurements of a line of text within a text field. All measurements are in
	 * pixels. Objects of this class are returned by the
	 * <code>away.entities.TextField.getLineMetrics()</code> method.
	 */
	class TextLineMetrics {
	    /**
	     * The ascent value of the text is the length from the baseline to the top of
	     * the line height in pixels.
	     */
	    ascent: number;
	    /**
	     * The descent value of the text is the length from the baseline to the
	     * bottom depth of the line in pixels.
	     */
	    descent: number;
	    /**
	     * The height value of the text of the selected lines (not necessarily the
	     * complete text) in pixels. The height of the text line does not include the
	     * gutter height.
	     */
	    height: number;
	    /**
	     * The leading value is the measurement of the vertical distance between the
	     * lines of text.
	     */
	    leading: number;
	    /**
	     * The width value is the width of the text of the selected lines (not
	     * necessarily the complete text) in pixels. The width of the text line is
	     * not the same as the width of the text field. The width of the text line is
	     * relative to the text field width, minus the gutter width of 4 pixels
	     * (2 pixels on each side).
	     */
	    width: number;
	    /**
	     * The x value is the left position of the first character in pixels. This
	     * value includes the margin, indent (if any), and gutter widths.
	     */
	    x: number;
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
	    constructor(x?: number, width?: number, height?: number, ascent?: number, descent?: number, leading?: number);
	}
	export = TextLineMetrics;
	
}

declare module "awayjs-display/lib/traverse/CSSEntityCollector" {
	import CollectorBase = require("awayjs-display/lib/traverse/CollectorBase");
	/**
	 * @class away.traverse.CSSEntityCollector
	 */
	class CSSEntityCollector extends CollectorBase {
	    constructor();
	}
	export = CSSEntityCollector;
	
}

declare module "awayjs-display/lib/traverse/CollectorBase" {
	import Plane3D = require("awayjs-core/lib/geom/Plane3D");
	import Scene = require("awayjs-display/lib/containers/Scene");
	import EntityListItem = require("awayjs-display/lib/pool/EntityListItem");
	import EntityListItemPool = require("awayjs-display/lib/pool/EntityListItemPool");
	import NodeBase = require("awayjs-display/lib/partition/NodeBase");
	import Camera = require("awayjs-display/lib/entities/Camera");
	import IEntity = require("awayjs-display/lib/entities/IEntity");
	/**
	 * @class away.traverse.CollectorBase
	 */
	class CollectorBase {
	    scene: Scene;
	    _pEntityHead: EntityListItem;
	    _pEntityListItemPool: EntityListItemPool;
	    _pCamera: Camera;
	    private _customCullPlanes;
	    private _cullPlanes;
	    private _numCullPlanes;
	    _pNumEntities: number;
	    _pNumInteractiveEntities: number;
	    isEntityCollector: boolean;
	    constructor();
	    /**
	     *
	     */
	    camera: Camera;
	    /**
	     *
	     */
	    cullPlanes: Array<Plane3D>;
	    /**
	     *
	     */
	    entityHead: EntityListItem;
	    /**
	     *
	     */
	    numEntities: number;
	    /**
	     *
	     */
	    numInteractiveEntities: number;
	    /**
	     *
	     */
	    clear(): void;
	    /**
	     *
	     * @param node
	     * @returns {boolean}
	     */
	    enterNode(node: NodeBase): boolean;
	    /**
	     *
	     * @param entity
	     */
	    applyDirectionalLight(entity: IEntity): void;
	    /**
	     *
	     * @param entity
	     */
	    applyEntity(entity: IEntity): void;
	    /**
	     *
	     * @param entity
	     */
	    applyLightProbe(entity: IEntity): void;
	    /**
	     *
	     * @param entity
	     */
	    applyPointLight(entity: IEntity): void;
	    /**
	     *
	     * @param entity
	     */
	    applySkybox(entity: IEntity): void;
	}
	export = CollectorBase;
	
}

declare module "awayjs-display/lib/traverse/EntityCollector" {
	import LightBase = require("awayjs-display/lib/base/LightBase");
	import CollectorBase = require("awayjs-display/lib/traverse/CollectorBase");
	import DirectionalLight = require("awayjs-display/lib/entities/DirectionalLight");
	import IEntity = require("awayjs-display/lib/entities/IEntity");
	import LightProbe = require("awayjs-display/lib/entities/LightProbe");
	import PointLight = require("awayjs-display/lib/entities/PointLight");
	import Skybox = require("awayjs-display/lib/entities/Skybox");
	/**
	 * @class away.traverse.EntityCollector
	 */
	class EntityCollector extends CollectorBase {
	    _pSkybox: Skybox;
	    _pLights: Array<LightBase>;
	    private _directionalLights;
	    private _pointLights;
	    private _lightProbes;
	    _pNumLights: number;
	    private _numDirectionalLights;
	    private _numPointLights;
	    private _numLightProbes;
	    /**
	     *
	     */
	    directionalLights: Array<DirectionalLight>;
	    /**
	     *
	     */
	    lightProbes: Array<LightProbe>;
	    /**
	     *
	     */
	    lights: Array<LightBase>;
	    /**
	     *
	     */
	    pointLights: Array<PointLight>;
	    /**
	     *
	     */
	    skyBox: Skybox;
	    constructor();
	    /**
	     *
	     * @param entity
	     */
	    applyDirectionalLight(entity: IEntity): void;
	    /**
	     *
	     * @param entity
	     */
	    applyLightProbe(entity: IEntity): void;
	    /**
	     *
	     * @param entity
	     */
	    applyPointLight(entity: IEntity): void;
	    /**
	     *
	     * @param entity
	     */
	    applySkybox(entity: IEntity): void;
	    /**
	     *
	     */
	    clear(): void;
	}
	export = EntityCollector;
	
}

declare module "awayjs-display/lib/traverse/RaycastCollector" {
	import Vector3D = require("awayjs-core/lib/geom/Vector3D");
	import NodeBase = require("awayjs-display/lib/partition/NodeBase");
	import CollectorBase = require("awayjs-display/lib/traverse/CollectorBase");
	/**
	 * The RaycastCollector class is a traverser for scene partitions that collects all scene graph entities that are
	 * considered intersecting with the defined ray.
	 *
	 * @see away.partition.Partition
	 * @see away.entities.IEntity
	 *
	 * @class away.traverse.RaycastCollector
	 */
	class RaycastCollector extends CollectorBase {
	    private _rayPosition;
	    private _rayDirection;
	    _iCollectionMark: number;
	    /**
	     * Provides the starting position of the ray.
	     */
	    rayPosition: Vector3D;
	    /**
	     * Provides the direction vector of the ray.
	     */
	    rayDirection: Vector3D;
	    /**
	     * Creates a new RaycastCollector object.
	     */
	    constructor();
	    /**
	     * Returns true if the current node is at least partly in the frustum. If so, the partition node knows to pass on the traverser to its children.
	     *
	     * @param node The Partition3DNode object to frustum-test.
	     */
	    enterNode(node: NodeBase): boolean;
	}
	export = RaycastCollector;
	
}

declare module "awayjs-display/lib/traverse/ShadowCasterCollector" {
	import NodeBase = require("awayjs-display/lib/partition/NodeBase");
	import CollectorBase = require("awayjs-display/lib/traverse/CollectorBase");
	/**
	 * @class away.traverse.ShadowCasterCollector
	 */
	class ShadowCasterCollector extends CollectorBase {
	    constructor();
	    /**
	     *
	     */
	    enterNode(node: NodeBase): boolean;
	}
	export = ShadowCasterCollector;
	
}

declare module "awayjs-display/lib/utils/Cast" {
	import BitmapData = require("awayjs-core/lib/data/BitmapData");
	import ByteArray = require("awayjs-core/lib/utils/ByteArray");
	import BitmapTexture = require("awayjs-core/lib/textures/BitmapTexture");
	/**
	 * Helper class for casting assets to usable objects
	 */
	class Cast {
	    private static _colorNames;
	    private static _hexChars;
	    private static _notClasses;
	    private static _classes;
	    static string(data: any): string;
	    static byteArray(data: any): ByteArray;
	    private static isHex(str);
	    static tryColor(data: any): number;
	    static color(data: any): number;
	    static tryClass(name: string): any;
	    static bitmapData(data: any): BitmapData;
	    static bitmapTexture(data: any): BitmapTexture;
	}
	export = Cast;
	
}

