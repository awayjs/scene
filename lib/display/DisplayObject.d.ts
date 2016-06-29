import { BlendMode } from "@awayjs/core/lib/image/BlendMode";
import { Box } from "@awayjs/core/lib/geom/Box";
import { ColorTransform } from "@awayjs/core/lib/geom/ColorTransform";
import { Sphere } from "@awayjs/core/lib/geom/Sphere";
import { Matrix3D } from "@awayjs/core/lib/geom/Matrix3D";
import { Point } from "@awayjs/core/lib/geom/Point";
import { Rectangle } from "@awayjs/core/lib/geom/Rectangle";
import { Vector3D } from "@awayjs/core/lib/geom/Vector3D";
import { AssetBase } from "@awayjs/core/lib/library/AssetBase";
import { LoaderInfo } from "@awayjs/core/lib/library/LoaderInfo";
import { EventBase } from "@awayjs/core/lib/events/EventBase";
import { IDisplayObjectAdapter } from "../adapters/IDisplayObjectAdapter";
import { DisplayObjectContainer } from "../display/DisplayObjectContainer";
import { Scene } from "../display/Scene";
import { ControllerBase } from "../controllers/ControllerBase";
import { IBitmapDrawable } from "../base/IBitmapDrawable";
import { Transform } from "../base/Transform";
import { PartitionBase } from "../partition/PartitionBase";
import { IPickingCollider } from "../pick/IPickingCollider";
import { PickingCollision } from "../pick/PickingCollision";
import { IEntity } from "../display/IEntity";
import { PrefabBase } from "../prefabs/PrefabBase";
import { ITraverser } from "../ITraverser";
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
export declare class DisplayObject extends AssetBase implements IBitmapDrawable, IEntity {
    _iIsRoot: boolean;
    _adapter: IDisplayObjectAdapter;
    private _queuedEvents;
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
    _pIsEntity: boolean;
    _pIsContainer: boolean;
    _sessionID: number;
    _depthID: number;
    private _explicitPartition;
    _pImplicitPartition: PartitionBase;
    private _sceneTransformChanged;
    private _sceneChanged;
    private _transform;
    private _inverseSceneTransform;
    private _inverseSceneTransformDirty;
    private _scenePosition;
    private _scenePositionDirty;
    private _explicitVisibility;
    private _explicitMaskId;
    _explicitMasks: Array<DisplayObject>;
    _pImplicitVisibility: boolean;
    _pImplicitMaskId: number;
    _pImplicitMasks: Array<Array<DisplayObject>>;
    _pImplicitMaskIds: Array<Array<number>>;
    private _explicitMouseEnabled;
    _pImplicitMouseEnabled: boolean;
    _pImplicitColorTransform: ColorTransform;
    private _listenToSceneTransformChanged;
    private _listenToSceneChanged;
    private _matrix3DDirty;
    private _positionDirty;
    private _rotationDirty;
    private _skewDirty;
    private _scaleDirty;
    private _eulers;
    _width: number;
    _height: number;
    _depth: number;
    private _pivot;
    private _pivotScale;
    private _orientationMatrix;
    private _pickingCollider;
    private _pickingCollision;
    private _shaderPickingDetails;
    _boundsType: string;
    _iSourcePrefab: PrefabBase;
    private _inheritColorTransform;
    private _maskMode;
    _hierarchicalPropsDirty: number;
    private _tempVector3D;
    /**
     * adapter is used to provide MovieClip to scripts taken from different platforms
     * setter typically managed by factory
     */
    adapter: IDisplayObjectAdapter;
    inheritColorTransform: boolean;
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
    readonly index: number;
    /**
     *
     */
    readonly inverseSceneTransform: Matrix3D;
    /**
     *
     */
    readonly isEntity: boolean;
    /**
     *
     */
    readonly isContainer: boolean;
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
    readonly loaderInfo: LoaderInfo;
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
    maskMode: boolean;
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
    readonly mouseX: number;
    /**
     * Indicates the y coordinate of the mouse or user input device position, in
     * pixels.
     *
     * <p><b>Note</b>: For a DisplayObject that has been rotated, the returned y
     * coordinate will reflect the non-rotated object.</p>
     */
    readonly mouseY: number;
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
    readonly parent: DisplayObjectContainer;
    /**
     *
     */
    partition: PartitionBase;
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
    readonly root: DisplayObjectContainer;
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
     * Indicates the horizontal skew(angle) of the object as applied from
     * the registration point. The default registration point is(0,0).
     */
    skewX: number;
    /**
     * Indicates the vertical skew(angle) of an object as applied from the
     * registration point of the object. The default registration point is(0,0).
     */
    skewY: number;
    /**
     * Indicates the depth skew(angle) of an object as applied from the
     * registration point of the object. The default registration point is(0,0).
     */
    skewZ: number;
    /**
     *
     */
    readonly scene: Scene;
    /**
     *
     */
    readonly scenePosition: Vector3D;
    readonly sceneTransform: Matrix3D;
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
    readonly shaderPickingDetails: boolean;
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
    readonly transform: Transform;
    /**
     * Whether or not the display object is visible. Display objects that are not
     * visible are disabled. For example, if <code>visible=false</code> for an
     * InteractiveObject instance, it cannot be clicked.
     */
    visible: boolean;
    masks: Array<DisplayObject>;
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
    addEventListener(type: string, listener: (event: EventBase) => void): void;
    /**
     *
     */
    clone(): DisplayObject;
    copyTo(newInstance: DisplayObject): void;
    /**
     *
     */
    dispose(): void;
    disposeValues(): void;
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
    globalToLocal(point: Point, target?: Point): Point;
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
     * @param maskFlag Whether to check against the object when it is used as mask
     *                 (<code>false</code>).
     * @return <code>true</code> if the display object overlaps or intersects
     *         with the specified point; <code>false</code> otherwise.
     */
    hitTestPoint(x: number, y: number, shapeFlag?: boolean, masksFlag?: boolean): boolean;
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
    localToGlobal(point: Point, target?: Point): Point;
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
     * Moves the local point around which the object rotates.
     *
     * @param    dx        The amount of movement along the local x axis.
     * @param    dy        The amount of movement along the local y axis.
     * @param    dz        The amount of movement along the local z axis.
     */
    movePivot(dx: number, dy: number, dz: number): void;
    reset(): void;
    /**
     *
     */
    getRenderSceneTransform(cameraTransform: Matrix3D): Matrix3D;
    /**
     *
     */
    removeEventListener(type: string, listener: (event: EventBase) => void): void;
    /**
     * @internal
     */
    _iController: ControllerBase;
    /**
     * @internal
     */
    readonly _iAssignedPartition: PartitionBase;
    /**
     * @internal
     */
    readonly _iPickingCollision: PickingCollision;
    /**
     * @internal
     */
    iSetParent(value: DisplayObjectContainer): void;
    pInvalidateHierarchicalProperties(propDirty: number): boolean;
    /**
     * @protected
     */
    _iSetScene(scene: Scene, partition: PartitionBase): void;
    /**
     * @protected
     */
    pUpdateSceneTransform(): void;
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
    _iAssignedMaskId(): number;
    /**
     * @internal
     */
    _iAssignedMasks(): Array<Array<DisplayObject>>;
    _iMasksConfig(): Array<Array<number>>;
    _iAssignedColorTransform(): ColorTransform;
    /**
     * @internal
     */
    _iIsMouseEnabled(): boolean;
    _acceptTraverser(collector: ITraverser): void;
    /**
     * Invalidates the 3D transformation matrix, causing it to be updated upon the next request
     *
     * @private
     */
    private _onInvalidateMatrix3D(event);
    /**
     * @private
     */
    private _onInvalidateColorTransform(event);
    _pInvalidateBounds(): void;
    _pUpdateBoxBounds(): void;
    _pUpdateSphereBounds(): void;
    private queueDispatch(event);
    private _setScaleX(val);
    private _setScaleY(val);
    private _setScaleZ(val);
    _updateMouseEnabled(): void;
    private _updateVisible();
    private _updateMaskId();
    private _updateMasks();
    private _updateColorTransform();
    _updateMaskMode(): void;
    clear(): void;
    invalidatePartitionBounds(): void;
    _hitTestPointInternal(x: number, y: number, shapeFlag: boolean, masksFlag: boolean): boolean;
}
