import {Transform, TransformEvent, Box, ColorTransform, Sphere, MathConsts, Matrix3D, Point, Rectangle, Vector3D, AssetBase, LoaderInfo, EventBase} from "@awayjs/core";

import {BlendMode} from "@awayjs/stage";

import { PartitionBase, BoundingBox, BoundingSphere, BoundingVolumeType, BasicPartition, PickGroup, IEntityTraverser, IPickingEntity, IPartitionEntity } from '@awayjs/view';

import {IAnimator, IMaterial, Style, StyleEvent, IRenderEntity} from "@awayjs/renderer";

import { ElementsType } from '@awayjs/graphics';

import {HierarchicalProperties} from "../base/HierarchicalProperties";
import {DisplayObjectContainer} from "../display/DisplayObjectContainer";
import {ControllerBase} from "../controllers/ControllerBase";
import {AlignmentMode} from "../base/AlignmentMode";
import {OrientationMode} from "../base/OrientationMode";
import {IBitmapDrawable} from "../base/IBitmapDrawable";
import {DisplayObjectEvent} from "../events/DisplayObjectEvent";
import {FocusEvent} from "../events/FocusEvent";

import { PrimitiveCubePrefab } from '../prefabs/PrimitiveCubePrefab';
import { PrimitiveSpherePrefab } from '../prefabs/PrimitiveSpherePrefab';
import { PrimitivePrefabBase } from '../prefabs/PrimitivePrefabBase';

/**
 * The DisplayObject class is the base class for all objects that can be
 * placed on the display list. The display list manages all objects displayed
 * in flash. Use the DisplayObjectContainer class to arrange the
 * display objects in the display list. DisplayObjectContainer objects can
 * have child display objects, while other display objects, such as Shape and
 * TextField objects, are "leaf" nodes that have only parents and siblings, no
 * children.
 *
 * <p>The DisplayObject class supports fbasic functionality like the <i>x</i>
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
 * <code>_height</code>, <code>_pName</code>, <code>_width</code>,
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
export class DisplayObject extends AssetBase implements IBitmapDrawable, IRenderEntity, IPickingEntity
{

	private _partition:PartitionBase;

	private _animator:IAnimator;
	public _material:IMaterial;
	public _style:Style;
	private _queuedEvents:Array<EventBase> = new Array<EventBase>();
	private _loaderInfo:LoaderInfo;
	private _mouseX:number;
	private _mouseY:number;
	private _root:DisplayObjectContainer;
	private _boundsVisible:boolean;
	private _boundsPrefab:PrimitivePrefabBase;
	private _boundsPrefabDirty:boolean;
	private _boundsPrimitive:DisplayObject;
	private _boundsPrimitiveDirty:boolean;
	private _pickObjectDirty:boolean;
	private _pName:string;

	protected _parent:DisplayObjectContainer;
	private _concatenatedMatrix3D:Matrix3D = new Matrix3D();
	private _tempTransform:Matrix3D;
	public _sessionID:number = -1;
	public _depthID:number = -16384;

	public _implicitPartition:PartitionBase;

	private _sceneTransformChanged:DisplayObjectEvent;
	private _sceneChanged:DisplayObjectEvent;
	protected _transform:Transform;
	
	private _scenePosition:Vector3D = new Vector3D();
	private _scenePositionDirty:boolean;
	private _explicitVisibility:boolean = true;
	private _explicitMaskId:number = -1;
	public _explicitMasks:Array<DisplayObject>;
	private _implicitVisibility:boolean = true;
	public _implicitMaskId:number = -1;
	public _maskOwners:Array<IPartitionEntity>;
	private _explicitMouseEnabled:boolean = true;
	private _implicitMouseEnabled:boolean = true;
	public _pImplicitColorTransform:ColorTransform;
	private _listenToSceneTransformChanged:boolean;
	private _matrix3DDirty:boolean;

	private _eulers:Vector3D;

	public _registrationMatrix3D:Matrix3D;
	private _orientationMatrix:Matrix3D = new Matrix3D();

	private _defaultBoundingVolume:BoundingVolumeType;

	private _isDragEntity:boolean;

	public cursorType:string;

	protected _isInFocus:boolean;
	protected _tabEnabled:boolean;
	protected _tabIndex:number;

    private _inheritColorTransform:boolean = true;
	private _maskMode:boolean = false;
	private _pickObject:DisplayObjectContainer;

	private _renderMode:boolean = true;

	public _hierarchicalPropsDirty:number;

	private _onInvalidatePropertiesDelegate:(event:StyleEvent) => void;

	public isSlice9ScaledMC:boolean=false;
	public isSlice9ScaledSprite:boolean=false;
	public instanceID:string="";
	public addedOnFrame:number=0;
    public avm1Symbol:any;
    
    public static focusEvent:FocusEvent=new FocusEvent(FocusEvent.FOCUS_IN);

	// this is needed for AVM1 - todo: maybe do this on adapters ?
	public placeObjectTag:any=null;
	public getScriptPrecedence(): number[] {
      if (!this._parent) {
        return [];
      }
      var result = this._parent.getScriptPrecedence();
      if (this.placeObjectTag) {
        result.push(this.placeObjectTag.actionBlocksPrecedence);
      }
      return result;
    }
	public dispatchFrameEvents(events:any[]) {
		this.dispatchEvent(events[0]);//ENTER_FRAME
		this.dispatchEvent(events[1]);//EXIT_FRAME

	}
	public dispatchEnterFrame(event:any) {
		this.dispatchEvent(event);//ENTER_FRAME
	}
	public dispatchExitFrame(event:any) {
		this.dispatchEvent(event);//Exit
	}
	public getMouseCursor():string
	{
		return "initial";
	}

	public get tabEnabled():boolean
	{
		return this._tabEnabled;
	}
	public set tabEnabled(value:boolean)
	{
		this._tabEnabled=value;
	}
	public get tabIndex():number
	{
		return this._tabIndex;
	}
	public set tabIndex(value:number)
	{
		this._tabIndex=value;
	}
	public get isInFocus():boolean
	{
		return this._isInFocus;
	}
	public set isInFocus(value:boolean)
	{
		this._isInFocus=value;
    }
    
	public setFocus(value:boolean, fromMouseDown:boolean=false, sendSoftKeyEvent:boolean=true ){
        if(this._isInFocus==value)
            return;
        this._isInFocus=value;
        if(this._isInFocus)
            DisplayObject.focusEvent.type=FocusEvent.FOCUS_IN;
        else            
            DisplayObject.focusEvent.type=FocusEvent.FOCUS_OUT;
        this.dispatchEnterFrame(DisplayObject.focusEvent)
	}

    public get inheritColorTransform():boolean
    {
        return this._inheritColorTransform;
    }

    public set inheritColorTransform(value:boolean)
    {
		if (this._inheritColorTransform == value)
			return;

        this._inheritColorTransform = value;

		this._invalidateHierarchicalProperties(HierarchicalProperties.COLOR_TRANSFORM);
    }

	/**
	 *
	 */
	public alignmentMode:string = AlignmentMode.REGISTRATION_POINT;

	/**
	 * Indicates the alpha transparency value of the object specified. Valid
	 * values are 0(fully transparent) to 1(fully opaque). The default value is
	 * 1. Display objects with <code>alpha</code> set to 0 <i>are</i> active,
	 * even though they are invisible.
	 */
	public get alpha():number
    {
        return this._transform.colorTransform.alphaMultiplier;
    }

    public set alpha(value:number)
    {
        this._transform.colorTransform.alphaMultiplier = value;

		this._transform.invalidateColorTransform();
    }

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
	public blendMode:BlendMode;

	/**
	 *
	 */
	public get defaultBoundingVolume():BoundingVolumeType
	{
		return this._defaultBoundingVolume;
	}

	public set defaultBoundingVolume(value:BoundingVolumeType)
	{
		if (this._defaultBoundingVolume == value)
			return;

		this._defaultBoundingVolume = value;

		if (this._boundsPrimitive) {
			this._boundsPrimitive.dispose();
			this._boundsPrimitive = null;
		}

		this.invalidate();
	}

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
	public cacheAsBitmap:boolean;

	/**
	 *
	 */
	public castsShadows:boolean = true;

	/**
	 * Defines the rotation of the 3d object as a <code>Vector3D</code> object containing euler angles for rotation around x, y and z axis.
	 */
	public get eulers():Vector3D
	{
		if (!this._eulers)
			this._eulers = new Vector3D();

		this._eulers.x = this.rotationX;
		this._eulers.y = this.rotationY;
		this._eulers.z = this.rotationZ;

		return this._eulers;
	}

	public set eulers(value:Vector3D)
	{
		// previously this was using the setters for rotationX etc
		// but because this will convert from radians to degree, i changed it to update directly
		this._transform.rotation.x = value.x;
		this._transform.rotation.y = value.y;
		this._transform.rotation.z = value.z;

		this._transform.invalidateMatrix3D();
	}

	/**
	 * An object that can contain any extra data.
	 */
	public extra:Object;

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
	 * Indicates the instance container index of the DisplayObject. The object can be
	 * identified in the child list of its parent display object container by
	 * calling the <code>getChildByIndex()</code> method of the display object
	 * container.
	 *
	 * <p>If the DisplayObject has no parent container, index defaults to 0.</p>
	 */
	public get index():number
	{
		if (this._parent)
			return this._parent.getChildIndex(this);

		return 0;
	}

	public get isRenderable():boolean
	{
		return this._renderMode && this._iAssignedColorTransform()._isRenderable();
	}

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
	public get loaderInfo():LoaderInfo
	{
		return this._loaderInfo;
	}

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
	public set mask(value:DisplayObject){
		if(value){
			value.maskMode=true;
		}
		if(!this.masks)this.masks=[];
		this.masks.push(value);
	}

	public get maskMode():boolean
	{
		return this._maskMode;
	}

	public set maskMode(value:boolean)
	{
		if (this._maskMode == value)
			return;

		if (this._implicitPartition)
			this._implicitPartition.clearEntity(this);
				
		this._maskMode = value;

		if (this._implicitPartition && this.isEntity())
			this._implicitPartition.invalidateEntity(this);

		this._explicitMaskId = value? this.id : -1;

		this._updateMaskMode();
	}

	public get pickObject():DisplayObjectContainer
	{
		if (this._pickObject && this._pickObjectDirty)
			this._updatePickObject();

		return this._pickObject;
	}

	public set pickObject(value:DisplayObjectContainer)
	{
		if (this._pickObject == value)
			return;

		if (this._pickObject)
			this._pickObject.partition = null;

		this._pickObject = value.clone();

		if (this._pickObject) {
			this._pickObject.partition = new BasicPartition(this._pickObject);
			this._pickObject.mouseChildren = false;
			this._pickObject.mouseEnabled = false;

			this._updatePickObject();
		}
	}

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
	public get mouseEnabled():boolean
	{
		return this._explicitMouseEnabled;
	}

	public set mouseEnabled(value:boolean)
	{
		if (this._explicitMouseEnabled == value)
			return;

		this._explicitMouseEnabled = value;
	}


	/**
	 * Indicates the x coordinate of the mouse or user input device position, in
	 * pixels.
	 *
	 * <p><b>Note</b>: For a DisplayObject that has been rotated, the returned x
	 * coordinate will reflect the non-rotated object.</p>
	 */
	public get mouseX():number
	{
		return this._mouseX;
	}

	/**
	 * Indicates the y coordinate of the mouse or user input device position, in
	 * pixels.
	 *
	 * <p><b>Note</b>: For a DisplayObject that has been rotated, the returned y
	 * coordinate will reflect the non-rotated object.</p>
	 */
	public get mouseY():number
	{
		return this._mouseY;
	}

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
	public get name() :string
    {
        return this._pName;
    }

    public set name(value : string)
    {
        this._pName = value;
    }

	/**
	 *
	 */
	public orientationMode:string = OrientationMode.DEFAULT;

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
	public get parent():DisplayObjectContainer
	{
		return this._parent;
	}

	/**
	 *
	 */
	public get partition():PartitionBase
	{
		return this._partition;
	}

	public set partition(value:PartitionBase)
	{
		if (this._partition == value)
			return;

		if (this._partition && this._partition.parent)
			this._partition.parent.removeChild(this._partition);

		this._partition = value;

		this._setPartition(this._parent? this._parent._implicitPartition : null);
	}

	/**
	 * Defines the local point around which the object rotates.
	 */
	public get registrationPoint():Vector3D
	{
		if (this._registrationMatrix3D)
			return new Vector3D(-this._registrationMatrix3D._rawData[12]*this.scaleX, -this._registrationMatrix3D._rawData[13]*this.scaleY, -this._registrationMatrix3D._rawData[14]*this.scaleZ);
		
		return null;
	}


	public set registrationPoint(value:Vector3D)
	{
		if (!value) {
			if (!this._registrationMatrix3D)
				return;

			this._registrationMatrix3D._rawData[12] = 0;
			this._registrationMatrix3D._rawData[13] = 0;
			this._registrationMatrix3D._rawData[14] = 0;

			if (this._registrationMatrix3D.isIdentity())
				this._registrationMatrix3D = null;
		} else {
			if (!this._registrationMatrix3D)
				this._registrationMatrix3D = new Matrix3D();

			this._registrationMatrix3D._rawData[12] = -value.x/this._transform.scale.x;
			this._registrationMatrix3D._rawData[13] = -value.y/this._transform.scale.y;
			this._registrationMatrix3D._rawData[14] = -value.z/this._transform.scale.z;
		}

		this._registrationMatrix3D.invalidatePosition();

		this._invalidateHierarchicalProperties(HierarchicalProperties.SCENE_TRANSFORM);
	}

	/**
	 * Defines the local scale.
	 */
	public get registrationScale():Vector3D
	{
		if (this._registrationMatrix3D)
			return new Vector3D(this._registrationMatrix3D._rawData[0], this._registrationMatrix3D._rawData[5], this._registrationMatrix3D._rawData[10]);

		return null;
	}


	public set registrationScale(value:Vector3D)
	{
		if (!value) {
			if (!this._registrationMatrix3D)
				return;

			this._registrationMatrix3D._rawData[0] = 1;
			this._registrationMatrix3D._rawData[5] = 1;
			this._registrationMatrix3D._rawData[10] = 1;

			if (this._registrationMatrix3D.isIdentity())
				this._registrationMatrix3D = null;
		} else {
			if (!this._registrationMatrix3D)
				this._registrationMatrix3D = new Matrix3D();

			this._registrationMatrix3D._rawData[0] = value.x;
			this._registrationMatrix3D._rawData[5] = value.y;
			this._registrationMatrix3D._rawData[10] = value.z;
		}

		this._invalidateHierarchicalProperties(HierarchicalProperties.SCENE_TRANSFORM);
	}


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
	public get root():DisplayObjectContainer
	{
		return this._root;
	}

	/**
	 * Indicates the rotation of the DisplayObject instance, in degrees, from its
	 * original orientation. Values from 0 to 180 represent clockwise rotation;
	 * values from 0 to -180 represent counterclockwise rotation. Values outside
	 * this range are added to or subtracted from 360 to obtain a value within
	 * the range. For example, the statement <code>my_video.rotation = 450</code>
	 * is the same as <code> my_video.rotation = 90</code>.
	 */
	public rotation:number; //TODO

	/**
	 * Indicates the x-axis rotation of the DisplayObject instance, in degrees,
	 * from its original orientation relative to the 3D parent container. Values
	 * from 0 to 180 represent clockwise rotation; values from 0 to -180
	 * represent counterclockwise rotation. Values outside this range are added
	 * to or subtracted from 360 to obtain a value within the range.
	 */
	public get rotationX():number
	{
		return this._transform.rotation.x*MathConsts.RADIANS_TO_DEGREES;
	}

	public set rotationX(val:number)
	{
		if (this.rotationX == val)
			return;

		this._transform.rotation.x = val*MathConsts.DEGREES_TO_RADIANS;

		this._transform.invalidateMatrix3D();
	}

	/**
	 * Indicates the y-axis rotation of the DisplayObject instance, in degrees,
	 * from its original orientation relative to the 3D parent container. Values
	 * from 0 to 180 represent clockwise rotation; values from 0 to -180
	 * represent counterclockwise rotation. Values outside this range are added
	 * to or subtracted from 360 to obtain a value within the range.
	 */
	public get rotationY():number
	{
		return this._transform.rotation.y*MathConsts.RADIANS_TO_DEGREES;
	}

	public set rotationY(val:number)
	{
		if (this.rotationY == val)
			return;

		this._transform.rotation.y = val*MathConsts.DEGREES_TO_RADIANS;

		this._transform.invalidateMatrix3D();
	}

	/**
	 * Indicates the z-axis rotation of the DisplayObject instance, in degrees,
	 * from its original orientation relative to the 3D parent container. Values
	 * from 0 to 180 represent clockwise rotation; values from 0 to -180
	 * represent counterclockwise rotation. Values outside this range are added
	 * to or subtracted from 360 to obtain a value within the range.
	 */
	public get rotationZ():number
	{
		return this._transform.rotation.z*MathConsts.RADIANS_TO_DEGREES;
	}

	public set rotationZ(val:number)
	{
		if (this.rotationZ == val)
			return;

		this._transform.rotation.z = val*MathConsts.DEGREES_TO_RADIANS;

		this._transform.invalidateMatrix3D();
	}

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
	public scale9Grid:Rectangle;

	/**
	 * Indicates the horizontal scale(percentage) of the object as applied from
	 * the registration point. The default registration point is(0,0). 1.0
	 * equals 100% scale.
	 *
	 * <p>Scaling the local coordinate system changes the <code>x</code> and
	 * <code>y</code> property values, which are defined in whole pixels. </p>
	 */
	public get scaleX():number
	{
		return this._transform.scale.x;
	}

	public set scaleX(val:number)
	{
		//this._updateAbsoluteDimension();

		this._setScaleX(val);
	}

	/**
	 * Indicates the vertical scale(percentage) of an object as applied from the
	 * registration point of the object. The default registration point is(0,0).
	 * 1.0 is 100% scale.
	 *
	 * <p>Scaling the local coordinate system changes the <code>x</code> and
	 * <code>y</code> property values, which are defined in whole pixels. </p>
	 */
	public get scaleY():number
	{
		return this._transform.scale.y;
	}

	public set scaleY(val:number)
	{
		//this._updateAbsoluteDimension();

		this._setScaleY(val);
	}

	/**
	 * Indicates the depth scale(percentage) of an object as applied from the
	 * registration point of the object. The default registration point is(0,0).
	 * 1.0 is 100% scale.
	 *
	 * <p>Scaling the local coordinate system changes the <code>x</code>,
	 * <code>y</code> and <code>z</code> property values, which are defined in
	 * whole pixels. </p>
	 */
	public get scaleZ():number
	{
		return this._transform.scale.z;
	}

	public set scaleZ(val:number)
	{
		//this._updateAbsoluteDimension();
		
		this._setScaleZ(val);
	}

	/**
	 * Indicates the horizontal skew(angle) of the object as applied from
	 * the registration point. The default registration point is(0,0).
	 */
	public get skewX():number
	{
		return this._transform.skew.x;
	}

	public set skewX(val:number)
	{
		if (this.skewX == val)
			return;

		this._transform.skew.x = val;

		this._transform.invalidateMatrix3D();
	}

	/**
	 * Indicates the vertical skew(angle) of an object as applied from the
	 * registration point of the object. The default registration point is(0,0).
	 */
	public get skewY():number
	{
		return this._transform.skew.y;
	}

	public set skewY(val:number)
	{
		if (this.skewY == val)
			return;

		this._transform.skew.y = val;

		this._transform.invalidateMatrix3D();
	}

	/**
	 * Indicates the depth skew(angle) of an object as applied from the
	 * registration point of the object. The default registration point is(0,0).
	 */
	public get skewZ():number
	{
		return this._transform.skew.z;
	}

	public set skewZ(val:number)
	{
		if (this.skewZ == val)
			return;

		this._transform.skew.z = val;

		this._transform.invalidateMatrix3D();
	}

	/**
	 *
	 */
	public get scenePosition():Vector3D
	{
		if (this._scenePositionDirty) {
			if (this._registrationMatrix3D && this.alignmentMode == AlignmentMode.REGISTRATION_POINT) {
				this._scenePosition.x = -this._registrationMatrix3D._rawData[12];
				this._scenePosition.y = -this._registrationMatrix3D._rawData[13];
				this._scenePosition.z = -this._registrationMatrix3D._rawData[14];
				this._scenePosition = this._transform.concatenatedMatrix3D.transformVector(this._scenePosition, this._scenePosition);
				//this._scenePosition.decrementBy(new Vector3D(this._registrationPoint.x*this._scaleX, this._registrationPoint.y*this._scaleY, this._registrationPoint.z*this._scaleZ));
			} else {
				this._transform.concatenatedMatrix3D.copyColumnTo(3, this._scenePosition);
			}

			this._scenePositionDirty = false;
		}
		return this._scenePosition;
	}

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
	public scrollRect:Rectangle;


	/**
	 * Defines the animator of the display object.  Default value is <code>null</code>.
	 */
	public get animator():IAnimator
	{
		return this._animator;
	}

	public set animator(value:IAnimator)
	{
		if (this._animator)
			this._animator.removeOwner(this);

		this._animator = value;

		if (this._animator)
			this._animator.addOwner(this);
	}

	/**
	 *
	 */
	public get material():IMaterial
	{
		return this._material;
	}

	public set material(value:IMaterial)
	{
		if (this._material == value)
			return;

		if (this._material)
			this._material.iRemoveOwner(this);
		
		this._material = value;

		if (this._material)
			this._material.iAddOwner(this);

		this.invalidateMaterial();
	}

	/**
	 *
	 */
	public get style():Style
	{
		return this._style;
	}

	public set style(value:Style)
	{
		if (this._style == value)
			return;

		if (this._style)
			this._style.removeEventListener(StyleEvent.INVALIDATE_PROPERTIES, this._onInvalidatePropertiesDelegate);

		this._style = value;

		if (this._style)
			this._style.addEventListener(StyleEvent.INVALIDATE_PROPERTIES, this._onInvalidatePropertiesDelegate);

		this.invalidateStyle();
	}

	/**
	 *
	 */
	public get boundsVisible():boolean
	{
		return this._boundsVisible;
	}

	public set boundsVisible(value:boolean)
	{
		if (value == this._boundsVisible)
			return;

		this._boundsVisible = value;

		if (this._boundsVisible && !this.partition)
			this.partition = new BasicPartition(this);

		this.invalidate();
	}

	public getBoundsPrimitive(pickGroup:PickGroup):DisplayObject
	{
		if (this._boundsPrimitive == null) {
			switch (this._defaultBoundingVolume) {
				case BoundingVolumeType.BOX:
				case BoundingVolumeType.BOX_BOUNDS:
				case BoundingVolumeType.BOX_BOUNDS_FAST:
				case BoundingVolumeType.BOX_FAST:
					this._boundsPrefab = new PrimitiveCubePrefab(null, ElementsType.LINE);
					this._boundsPrimitive = this._boundsPrefab.getNewObject();
					break;
				case BoundingVolumeType.SPHERE:
				case BoundingVolumeType.SPHERE_BOUNDS:
				case BoundingVolumeType.SPHERE_BOUNDS_FAST:
				case BoundingVolumeType.SPHERE_FAST:
					this._boundsPrefab = new PrimitiveSpherePrefab(null, ElementsType.LINE);
					this._boundsPrimitive = this._boundsPrefab.getNewObject();
					break;
				default:
			}

			this._boundsPrefabDirty = true;
			this._boundsPrimitiveDirty = true;
		}

		if (this._boundsPrefabDirty)
			this._updateBoundsPrefab(pickGroup);

		if (this._boundsPrimitiveDirty)
			this._updateBoundsPrimitive();

		return this._boundsPrimitive;
	}

	

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
	public get transform():Transform
	{
		return this._transform;
	}

	/**
	 * Whether or not the display object is visible. Display objects that are not
	 * visible are disabled. For example, if <code>visible=false</code> for an
	 * InteractiveObject instance, it cannot be clicked.
	 */
	public get visible():boolean
	{
		return this._explicitVisibility;
	}

	public set visible(value:boolean)
	{
		if (this._explicitVisibility == value)
			return;

		this._explicitVisibility = value;

		this._invalidateHierarchicalProperties(HierarchicalProperties.VISIBLE);
	}

	public get masks():Array<DisplayObject>
	{
		return this._explicitMasks;
	}

	public set masks(value:Array<DisplayObject>)
	{
		if (this._explicitMasks == value)
			return;

		this._explicitMasks = value;

		//make sure maskMode is set to true for all masks
		if (value != null && value.length) {
			var len:number = value.length;
			for (var i:number = 0; i < len; i++)
				value[i].maskMode = true;
		}

		this._invalidateHierarchicalProperties(HierarchicalProperties.MASKS);
	}

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
	public get x():number
	{
		return this._transform.position.x;
	}

	public set x(val:number)
	{
		if (this._transform.position.x == val)
			return;

		this._transform.matrix3D._rawData[12] = val;

		this._transform.invalidatePosition();
	}

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
	public get y():number
	{
		return this._transform.position.y;
	}

	public set y(val:number)
	{
		if (this._transform.position.y == val)
			return;

		this._transform.matrix3D._rawData[13] = val;

		this._transform.invalidatePosition();
	}

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
	public get z():number
	{
		return this._transform.position.z;
	}

	public set z(val:number)
	{
		if (this._transform.position.z == val)
			return;

		this._transform.matrix3D._rawData[14] = val;

		this._transform.invalidatePosition();
	}

	/**
	 *
	 */
	public zOffset:number = 0;

	/**
	 * Creates a new <code>DisplayObject</code> instance.
	 */
	constructor()
	{
		super();

		this.cursorType="";
		this._isInFocus=false;
		this._tabEnabled=false;
		this._tabIndex=-1;
		//global debug bounding boxes:
		//this._boundsVisible=true;
		this._onInvalidatePropertiesDelegate = (event:StyleEvent) => this._onInvalidateProperties(event);

		//creation of associated transform object
		this._transform = new Transform(null, this._concatenatedMatrix3D);

		//setup transform listeners
		this._transform.addEventListener(TransformEvent.INVALIDATE_MATRIX3D, (event:TransformEvent) => this._onInvalidateMatrix3D(event));
		this._transform.addEventListener(TransformEvent.UPDATE_CONCATENATED_MATRIX3D, (event:TransformEvent) => this._onUpdateConcatenatedMatrix3D(event));
		this._transform.addEventListener(TransformEvent.INVALIDATE_COLOR_TRANSFORM, (event:TransformEvent) => this._onInvalidateColorTransform(event));

		//bounding volume dictonary

		//default bounds type
		this._defaultBoundingVolume = this._getDefaultBoundingVolume();
	}

	
	public isEntity():boolean
	{
		return false;
	}

	/**
	 *
	 */
	public addEventListener(type:string, listener:(event:EventBase) => void):void
	{
		super.addEventListener(type, listener);

		switch (type) {
			case DisplayObjectEvent.SCENETRANSFORM_CHANGED:
				this._listenToSceneTransformChanged = true;
                break;
		}
	}

	/**
	 *
	 */
	public clone():DisplayObject
	{
		var newInstance:DisplayObject = new DisplayObject();

		this.copyTo(newInstance);

		return newInstance;
	}

	public copyTo(displayObject:DisplayObject):void
	{
		displayObject.defaultBoundingVolume = this._defaultBoundingVolume;

		if (this._registrationMatrix3D)
			displayObject._registrationMatrix3D = this._registrationMatrix3D.clone();

		displayObject.pickObject = this._pickObject;
		displayObject.boundsVisible = this._boundsVisible;
		displayObject.name = this._pName;
		displayObject.mouseEnabled = this._explicitMouseEnabled;
		displayObject.extra = this.extra;
		displayObject.maskMode = this._maskMode;
		displayObject.castsShadows = this.castsShadows;
		displayObject.isSlice9ScaledMC = this.isSlice9ScaledMC;
		displayObject.assetNamespace = this.assetNamespace;
        displayObject._symbol = this._symbol;
        displayObject.avm1Symbol = this.avm1Symbol;
        
		if (this._explicitMasks)
			displayObject.masks = this._explicitMasks;

		this._transform.copyRawDataTo(displayObject._transform);
	}

	/**
	 *
	 */
	public dispose():void
	{
		this.disposeValues();
	}

	public disposeValues():void
	{
		if (this._parent)
			this._parent.removeChild(this);

		//if (this._adapter) {
		//	this._adapter.dispose();
		//	this._adapter = null;
		//}

		//this._pos = null;
		//this._rot = null;
		//this._sca = null;
		//this._ske = null;
		//this._transformComponents = null;
		//this._transform.dispose();
		//this._transform = null;
		//
		//this._matrix3D = null;
		//this._concatenatedMatrix3D = null;
		//this._inverseSceneTransform = null;

		this._explicitMasks = null;

		if (this._partition) {
			this._partition.dispose();
			this._partition = null;
		}

	}

	/**
	 * Rotates the 3d object around to face a point defined relative to the local coordinates of the parent <code>ObjectContainer3D</code>.
	 *
	 * @param    target        The vector defining the point to be looked at
	 * @param    upAxis        An optional vector used to define the desired up orientation of the 3d object after rotation has occurred
	 */
	public lookAt(scenePosition:Vector3D, upAxis:Vector3D = null):void
	{
		this.transform.lookAt(scenePosition, upAxis);
	}

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
	public localToGlobal3D(position:Vector3D):Vector3D
	{
		return this._transform.concatenatedMatrix3D.transformVector(position);
	}

	/**
	 * Moves the local point around which the object rotates.
	 *
	 * @param    dx        The amount of movement along the local x axis.
	 * @param    dy        The amount of movement along the local y axis.
	 * @param    dz        The amount of movement along the local z axis.
	 */
	public movePivot(dx:number, dy:number, dz:number):void
	{
		if (dx == 0 && dy == 0 && dz == 0)
			return;

		if (!this._registrationMatrix3D)
			this._registrationMatrix3D = new Matrix3D();

		this._registrationMatrix3D._rawData[12] -= dx/this._transform.scale.x;
		this._registrationMatrix3D._rawData[13] -= dy/this._transform.scale.y;
		this._registrationMatrix3D._rawData[14] -= dz/this._transform.scale.z;

		this._invalidateHierarchicalProperties(HierarchicalProperties.SCENE_TRANSFORM);
	}

	public reset():void
	{
		this.visible = true;

		this._transform.clearMatrix3D();

		this._transform.clearColorTransform();

		//this.name="";
		this.masks = null;

		this.maskMode = false;
	}
	/**
	 *
	 */
	public getRenderSceneTransform(cameraTransform:Matrix3D):Matrix3D
	{
		if (this.orientationMode == OrientationMode.CAMERA_PLANE) {
			var comps:Array<Vector3D> = cameraTransform.decompose();
			comps[0].copyFrom(this.scenePosition);
			comps[3].copyFrom(this._transform.scale);
			this._orientationMatrix.recompose(comps);

			//add in case of registration point
			if (this._registrationMatrix3D) {
				this._orientationMatrix.prepend(this._registrationMatrix3D);

				if (this.alignmentMode != AlignmentMode.REGISTRATION_POINT)
					this._orientationMatrix.appendTranslation(-this._registrationMatrix3D._rawData[12]*this._transform.scale.x, -this._registrationMatrix3D._rawData[13]*this._transform.scale.y, -this._registrationMatrix3D._rawData[14]*this._transform.scale.z);
			}

			return this._orientationMatrix;
		}
		return this._transform.concatenatedMatrix3D;
	}

	/**
	 *
	 */
	public removeEventListener(type:string, listener:(event:EventBase) => void):void
	{
		super.removeEventListener(type, listener);

		if (this.hasEventListener(type))
			return;

		switch (type) {
			case DisplayObjectEvent.SCENETRANSFORM_CHANGED:
				this._listenToSceneTransformChanged = true;
				break;
		}
	}

	/**
	 * @internal
	 */
	public _iController:ControllerBase;

	/**
	 * @internal
	 */
	public _setParent(parent:DisplayObjectContainer):void
	{
		if (!parent && this._partition) //if there is a new parent, the addChild(partition) will remove from the previous partition
			this._parent._implicitPartition.removeChild(this._partition);

		this._parent = parent;

        this._setPartition(parent? parent._implicitPartition : null);

		this._invalidateHierarchicalProperties(HierarchicalProperties.ALL);
	}

	public _invalidateHierarchicalProperties(propDirty:number):boolean
	{
		var newPropDirty:number = (this._hierarchicalPropsDirty ^ propDirty) & propDirty;
		if (!newPropDirty)
			return true;

		this._hierarchicalPropsDirty |= propDirty;

		if (newPropDirty & HierarchicalProperties.SCENE_TRANSFORM) {
			this.transform.invalidateConcatenatedMatrix3D();
			
			this._scenePositionDirty = true;
			this._boundsPrimitiveDirty = true;
			this._pickObjectDirty = true;

			if (this._implicitPartition && this.isEntity())
				this._implicitPartition.invalidateEntity(this);

			if (this._listenToSceneTransformChanged)
				this.queueDispatch(this._sceneTransformChanged || (this._sceneTransformChanged = new DisplayObjectEvent(DisplayObjectEvent.SCENETRANSFORM_CHANGED, this)));
		}

		return false;
	}

	/**
	 * @protected
	 */
	public _setPartition(parentPartition:PartitionBase):boolean
	{
		if (parentPartition && this._partition == null)
			this._partition = parentPartition.getPartition(this) || this._partition;

		//add partition as a child of parentPartition
		if (this._partition && parentPartition)
			parentPartition.addChild(this._partition);

		var partition:PartitionBase = this._partition || parentPartition;

		if (this._implicitPartition == partition)
			return true;
		
		//unregister object from current partition container
		if (this._implicitPartition && this.isEntity())
			this._implicitPartition.clearEntity(this);

		// assign parent partition if _partition is false
		this._implicitPartition = partition;

		if (this._implicitPartition && this.isEntity()) //register object with scene
			this._implicitPartition.invalidateEntity(this);
		else //gc abstraction objects
			this.clear();

		this.dispatchEvent(new DisplayObjectEvent(DisplayObjectEvent.PARTITION_CHANGED, this));

		return false;
	}

	/**
	 * @protected
	 */
	public _onUpdateConcatenatedMatrix3D(event:TransformEvent):void
	{
		// call getBoxBounds() if absolute size need to update transform
		// if (this._absoluteDimension) {
		// 	var box:Box = this.getBoxBounds();
		// 	if(box){
		// 		if (this._width != null)
		// 			this._setScaleX(this._width/box.width);
					
		// 		if (this._height != null)
		// 			this._setScaleY(this._height/box.height);

		// 		if (this._depth != null)
		// 			this._setScaleZ(this._depth/box.depth);
		// 	}
		// }

		this._concatenatedMatrix3D.copyFrom(this._transform.matrix3D);

		if (this._registrationMatrix3D) {

			this._concatenatedMatrix3D.prepend(this._registrationMatrix3D);
			if (this.alignmentMode != AlignmentMode.REGISTRATION_POINT)
				this._concatenatedMatrix3D.appendTranslation(-this._registrationMatrix3D._rawData[12]*this._transform.scale.x, -this._registrationMatrix3D._rawData[13]*this._transform.scale.y, -this._registrationMatrix3D._rawData[14]*this._transform.scale.z);
		}

		if (this._parent)
			this._concatenatedMatrix3D.append(this._parent._transform.concatenatedMatrix3D);

		this._matrix3DDirty = false;

		this._hierarchicalPropsDirty ^= HierarchicalProperties.SCENE_TRANSFORM;

		if (this._iController)
			this._iController.updateController();
	}

	/**
	 *
	 */
	public _iInternalUpdate():void
	{
		if (this._iController)
			this._iController.update();

		// Dispatch all queued events.
		var len:number = this._queuedEvents.length;
		for (var i:number = 0; i < len; ++i)
			this.dispatchEvent(this._queuedEvents[i]);

		this._queuedEvents.length = 0;
	}

	/**
	 * @internal
	 */
	public _iIsVisible():boolean
	{
		if (this._hierarchicalPropsDirty & HierarchicalProperties.VISIBLE)
			this._updateVisible();

		return this._implicitVisibility;
	}

	/**
	 * @internal
	 */
	public get maskId():number
	{
		if (this._hierarchicalPropsDirty & HierarchicalProperties.MASK_ID)
			this._updateMaskId();

		return this._implicitMaskId;
	}

	/**
	 * @internal
	 */
	public get maskOwners():Array<IPartitionEntity>
	{
		if (this._hierarchicalPropsDirty & HierarchicalProperties.MASKS)
			this._updateMaskOwners();

		return this._maskOwners;
	}

	public _iAssignedColorTransform():ColorTransform
	{
		if (this._hierarchicalPropsDirty & HierarchicalProperties.COLOR_TRANSFORM)
			this._updateColorTransform();

		return this._pImplicitColorTransform || (this._pImplicitColorTransform = new ColorTransform());
	}

	public _startDrag():void
	{
		this._isDragEntity = true;
	}

	public _stopDrag():void
	{
		this._isDragEntity = false;
	}

	public isDragEntity():boolean
	{
		return this._isDragEntity;
	}

	/**
	 * @internal
	 */
	public _iIsMouseEnabled():boolean
	{
		if (this._hierarchicalPropsDirty & HierarchicalProperties.MOUSE_ENABLED)
			this._updateMouseEnabled();

		return this._implicitMouseEnabled && this._explicitMouseEnabled;
	}

	public isDescendant(displayObject:DisplayObject):boolean
	{
		var parent:DisplayObject = this;
		while (parent.parent) {
			parent = parent.parent;
			if (parent == displayObject)
				return true;		
		}

		return false;
	}
	
	public isAncestor(displayObject:DisplayObject):boolean
	{
		return displayObject.isDescendant(this);
	}

	public _acceptTraverser(traverser:IEntityTraverser):void
	{
		//nothing to do here
	}

	/**
	 * Invalidates the 3D transformation matrix, causing it to be updated upon the next request
	 *
	 * @private
	 */
	private _onInvalidateMatrix3D(event:TransformEvent):void
	{
		if (this._matrix3DDirty)
			return;

		this._matrix3DDirty = true;

		this._invalidateHierarchicalProperties(HierarchicalProperties.SCENE_TRANSFORM);
	}

	/**
	 * @private
	 */
	private _onInvalidateColorTransform(event:TransformEvent):void
	{
		this._invalidateHierarchicalProperties(HierarchicalProperties.COLOR_TRANSFORM);
	}

	private queueDispatch(event:EventBase):void
	{
		// Store event to be dispatched later.
		this._queuedEvents.push(event);
	}

	protected _setScaleX(val:number):void
	{
		if (this.scaleX == val)
			return;

		this._transform.scale.x = val;

		this._transform.invalidateMatrix3D();
	}

	protected _setScaleY(val:number):void
	{
		if (this.scaleY == val)
			return;

		this._transform.scale.y = val;

		this._transform.invalidateMatrix3D();
	}

	protected _setScaleZ(val:number):void
	{
		if (this.scaleZ == val)
			return;

		this._transform.scale.z = val;

		this._transform.invalidateMatrix3D();
	}

	public _updateMouseEnabled():void
	{
		this._implicitMouseEnabled = (this._parent)? this._parent.mouseChildren && this._parent._implicitMouseEnabled : true;

		this._hierarchicalPropsDirty ^= HierarchicalProperties.MOUSE_ENABLED;
	}

	private _updateVisible():void
	{
		this._implicitVisibility = (this._parent)? this._explicitVisibility && this._parent._iIsVisible() : this._explicitVisibility;

		this._hierarchicalPropsDirty ^= HierarchicalProperties.VISIBLE;
	}

	private _updateMaskId():void
	{
		this._implicitMaskId = (this._parent && this._parent.maskId != -1)? this._parent.maskId : this._explicitMaskId;

		this._hierarchicalPropsDirty ^= HierarchicalProperties.MASK_ID;
	}

	private _updateMaskOwners():void
	{
		this._maskOwners = (this._parent && this._parent.maskOwners)? this._explicitMasks? this._parent.maskOwners.concat([this]) : this._parent.maskOwners.concat() : (this._explicitMasks != null)? [this] : null;

		this._hierarchicalPropsDirty ^= HierarchicalProperties.MASKS;
	}

	private _updateColorTransform():void
	{
		if (!this._pImplicitColorTransform)
			this._pImplicitColorTransform = new ColorTransform();

		if (this._inheritColorTransform && this._parent && this._parent._iAssignedColorTransform()) {
			this._pImplicitColorTransform.copyFrom(this._parent._iAssignedColorTransform());
			
			this._pImplicitColorTransform.prepend(this._transform.colorTransform);
		} else {
			this._pImplicitColorTransform.copyFrom(this._transform.colorTransform);
		}

		this._hierarchicalPropsDirty ^= HierarchicalProperties.COLOR_TRANSFORM;
	}

	private _updateBoundsPrefab(pickGroup:PickGroup):void
	{
		if (this._boundsPrefab instanceof PrimitiveCubePrefab) {
			var box:Box = (<BoundingBox> pickGroup.getBoundsPicker(this.partition).getBoundingVolume(null, this._defaultBoundingVolume)).getBox();

			//TODO: if box is null, no prefab should be visible
			if (box == null)
				return;

			this._boundsPrefab.width = box.width;
			this._boundsPrefab.height = box.height;
			this._boundsPrefab.depth = box.depth;

			this._boundsPrimitive.registrationPoint = new Vector3D(-(box.x + box.width/2)*this._boundsPrimitive.transform.scale.x, -(box.y + box.height/2)*this._boundsPrimitive.transform.scale.y, -(box.z + box.depth/2)*this._boundsPrimitive.transform.scale.z);

		} else if (this._boundsPrefab instanceof PrimitiveSpherePrefab) {
			var sphere:Sphere = (<BoundingSphere> pickGroup.getBoundsPicker(this.partition).getBoundingVolume(null, this._defaultBoundingVolume)).getSphere();
			console.log(sphere)
			if (sphere == null)
				return;
			
			this._boundsPrefab.radius = sphere.radius;

			this._boundsPrimitive.registrationPoint = new Vector3D(-sphere.x*this._boundsPrimitive.transform.scale.x, -sphere.y*this._boundsPrimitive.transform.scale.y, -sphere.z*this._boundsPrimitive.transform.scale.z);
		}
	}

	private _updatePickObject():void
	{
		this._pickObject.transform.matrix3D = this.transform.concatenatedMatrix3D;
	}

	private _updateBoundsPrimitive():void
	{
		this._boundsPrimitiveDirty = false;

		this._boundsPrimitive.transform.matrix3D = this.transform.concatenatedMatrix3D;
	}

	public _updateMaskMode():void
	{
		if (this.maskMode)
			this.mouseEnabled = false;

		this._invalidateHierarchicalProperties(HierarchicalProperties.MASK_ID);
	}

	public invalidate():void
	{
		super.invalidate();

		if (this._implicitPartition && this.isEntity())
			this._implicitPartition.invalidateEntity(this);
	}

	public clear():void
	{
		super.clear();

		var i:number;

		this._pImplicitColorTransform = null;
		this._maskOwners = null;
	}

	public invalidateMaterial():void
	{
		//TODO: herarchical materials and/or Styles?
	}
	
	public invalidateStyle():void
	{
		//TODO: herarchical materials and/or Styles?
	}

	public invalidateElements():void
	{
		//TODO: herarchical elements?
	}

	public _onInvalidateProperties(event:StyleEvent = null):void
	{
		this.invalidateStyle();
	}

	protected _getDefaultBoundingVolume():BoundingVolumeType
	{
		return BoundingVolumeType.BOX_BOUNDS_FAST;
	}

	// private _updateAbsoluteDimension():void
	// {
	// 	this._absoluteDimension = Boolean(this._width != null || this._height != null || this._depth != null);
	// }
}