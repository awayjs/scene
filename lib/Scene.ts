import {Vector3D, getTimer} from "@awayjs/core";

import { View, PickingCollision, BasicPartition, PartitionBase, TabPicker, RaycastPicker, PickGroup } from '@awayjs/view';
import {DefaultRenderer, RendererBase} from "@awayjs/renderer";

import {TouchPoint} from "./base/TouchPoint";
import {Camera} from "./display/Camera";
import {CameraEvent} from "./events/CameraEvent";
import {MouseManager} from "./managers/MouseManager";
import { DisplayObjectContainer } from './display/DisplayObjectContainer';
import { DisplayObject } from './display/DisplayObject';


export class Scene
{

	/*
	 *************************************************************************************************************************
	 * Development Notes
	 *************************************************************************************************************************
	 *
	 * ShareContext     - this is not being used at the moment integration with other frameworks is not yet implemented or tested
	 *                    and ( _localPos / _globalPos ) position of view are the same for the moment
	 *
	 * Background
	 *                  - this is currently not being included in our tests and is currently disabled
	 *
	 ******************clear********************************************************************************************************
	 */

	private _camera:Camera;
	private _renderer:RendererBase;
	private _partition:PartitionBase;
	private _view:View;
	private _pickGroup:PickGroup;

	private _time:number = 0;
	private _deltaTime:number = 0;

	private _onProjectionChangedDelegate:(event:CameraEvent) => void;
	private _mouseManager:MouseManager;
	private _mousePicker:RaycastPicker;
	private _tabPicker:TabPicker;

	public _mouseX:number;
	public _mouseY:number;
	public _touchPoints:Array<TouchPoint> = new Array<TouchPoint>();

	public get partition():PartitionBase
	{
		return this._partition;
	}

	public set partition(value:PartitionBase)
	{
		if (this._partition == value)
			return;

		this._partition = value;
		this._renderer.partition = value;
		this._mousePicker = this._pickGroup.getRaycastPicker(this._partition);
		this._tabPicker = this._pickGroup.getTabPicker(this._partition);
		this._mousePicker.findClosestCollision = true;

		if (this._camera) {
			this._partition.invalidateEntity(this._camera);
			this._camera.partition = this._partition;
		}

		this._mousePicker = this._pickGroup.getRaycastPicker(this._partition);
		this._tabPicker = this._pickGroup.getTabPicker(this._partition);
		this._mousePicker.findClosestCollision = true;

		this._partition.root.partition = this._partition;
	}

	public get view():View
	{
		return this._view;
	}

	public set view(value:View)
	{
		if (this._view == value)
			return;

		if (this._view)
			this._mouseManager.unregisterContainer(this._view.stage.container);

		this._view = value;
		this._renderer.view = value;
		this._pickGroup = PickGroup.getInstance(this._view);

		this._mouseManager = MouseManager.getInstance(this._pickGroup);
		this._mouseManager.registerContainer(this._view.stage.container);
		this._mouseManager.registerScene(this);

		if (this._camera)
			this._view.projection = this._camera.projection;
	}

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
	constructor(renderer:RendererBase = null, camera:Camera = null)
	{
		this._onProjectionChangedDelegate = (event:CameraEvent) => this._onProjectionChanged(event);

		this.camera = camera || new Camera();
		this.renderer = renderer || new DefaultRenderer(new BasicPartition(new DisplayObjectContainer()));
		
//			if (this._shareContext)
//				this._mouse3DManager.addViewLayer(this);
	}

	public layeredView:boolean; //TODO: something to enable this correctly

	public disableMouseEvents:boolean; //TODO: hack to ignore mouseevents on certain views
	
	public get root():DisplayObjectContainer
	{
		return <DisplayObjectContainer> this._partition.root;
	}

	public get mouseX():number
	{
		return this._mouseX;
	}

	public get mouseY():number
	{
		return this._mouseY;
	}

	public get touchPoints():Array<TouchPoint>
	{
		return this._touchPoints;
	}

	public getLocalMouseX(entity:DisplayObject):number
	{
		return entity.transform.inverseConcatenatedMatrix3D.transformVector(this._renderer.view.unproject(this._mouseX, this._mouseY, 1000)).x;
	}

	public getLocalMouseY(entity:DisplayObject):number
	{
		return entity.transform.inverseConcatenatedMatrix3D.transformVector(this._renderer.view.unproject(this._mouseX, this._mouseY, 1000)).y;
	}

	public getLocalTouchPoints(entity:DisplayObject):Array<TouchPoint>
	{
		var localPosition:Vector3D;
		var localTouchPoints:Array<TouchPoint> = new Array<TouchPoint>();

		var len:number = this._touchPoints.length;
		for (var i:number = 0; i < len; i++) {
			localPosition = entity.transform.inverseConcatenatedMatrix3D.transformVector(this._renderer.view.unproject(this._touchPoints[i].x, this._touchPoints[i].y, 1000));
			localTouchPoints.push(new TouchPoint(localPosition.x, localPosition.y, this._touchPoints[i].id));
		}

		return localTouchPoints;
	}

	/**
	 *
	 */
	public get renderer():RendererBase
	{
		return this._renderer;
	}

	public set renderer(value:RendererBase)
	{
		if (this._renderer == value)
			return;

		if (this._renderer)
			this._renderer.dispose();

		this._renderer = value;

		this.view = this._renderer.view;
		this.partition = this._renderer.partition;
	}

	/**
	 *
	 * @returns {Camera3D}
	 */
	public get camera():Camera
	{
		return this._camera;
	}

	/**
	 * Set camera that's used to render the scene for this view
	 */
	public set camera(value:Camera)
	{
		if (this._camera == value)
			return;

		if (this._camera)
			this._camera.removeEventListener(CameraEvent.PROJECTION_CHANGED, this._onProjectionChangedDelegate);

		this._camera = value;

		this._camera.addEventListener(CameraEvent.PROJECTION_CHANGED, this._onProjectionChangedDelegate);

		if (this._view)
			this._view.projection = this._camera.projection;
		
		if (this._partition) {
			this._partition.invalidateEntity(this._camera);
			this._camera.partition = this._partition;
		}
	}
	
	/**
	 *
	 * @returns {number}
	 */
	public get deltaTime():number
	{
		return this._deltaTime;
	}

	/**
	 *
	 */
	public get mousePicker():RaycastPicker
	{
		return this._mousePicker;
	}

	
	/**
	 *
	 */
	public get tabPicker():TabPicker
	{
		return this._tabPicker;
	}

	/**
	 *
	 * @returns {number}
	 */
	public get renderedFacesCount():number
	{
		return 0; //TODO
		//return this._pEntityCollector._pNumTriangles;//numTriangles;
	}

	public beforeRenderCallback:Function;
	
	/** 
	 * Renders the view.
	 */
	public render():void
	{
		this._updateTime();

		// update picking
		if (!this.disableMouseEvents) {
			if (this.forceMouseMove && !this._mouseManager._iUpdateDirty)
				this._mouseManager._iCollision = this.getViewCollision(this._mouseX, this._mouseY, this._renderer.view);

			this._mouseManager.fireMouseEvents(this.forceMouseMove);
			//_touch3DManager.fireTouchEvents();
		}
		if(this.beforeRenderCallback){
			this.beforeRenderCallback();
		}
		//_touch3DManager.updateCollider();

		//render the contents of the scene
		this._renderer.render();
	}

	/**
	 *
	 */
	private _updateTime():void
	{
		var time:number = getTimer();

		if (this._time == 0)
			this._time = time;

		this._deltaTime = time - this._time;
		this._time = time;
	}

	/**
	 *
	 */
	public dispose():void
	{
		this._renderer.dispose();

		// TODO: imeplement mouseManager / touch3DManager
		this._mouseManager.unregisterScene(this);

		//this._touch3DManager.disableTouchListeners(this);
		//this._touch3DManager.dispose();

		this._mouseManager = null;
		//this._touch3DManager = null;

		this._renderer = null;
	}

	/**
	 *
	 */
	private _onProjectionChanged(event:CameraEvent):void
	{
		if (this._renderer)
			this._renderer.view.projection = this._camera.projection;
	}

	/* TODO: implement Touch3DManager
	 public get touchPicker():IPicker
	 {
	 return this._touch3DManager.touchPicker;
	 }
	 */
	/* TODO: implement Touch3DManager
	 public set touchPicker( value:IPicker)
	 {
	 this._touch3DManager.touchPicker = value;
	 }
	 */

	public forceMouseMove:boolean;

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
	public updateCollider():void
	{
		if (!this.disableMouseEvents) {
			// if (!this._renderer.shareContext) {
				this._mouseManager._iCollision = this.getViewCollision(this._mouseX, this._mouseY, this._renderer.view);
			// } else {
			// 	var collidingObject:PickingCollision = this.getViewCollision(this._mouseX, this._mouseY, this);
			//
			// 	if (this.layeredView || this._mouseManager._iCollision == null || collidingObject.rayEntryDistance < this._mouseManager._iCollision.rayEntryDistance)
			// 		this._mouseManager._iCollision = collidingObject;
			// }
		}
	}
	
	public getViewCollision(x:number, y:number, view:View):PickingCollision
	{
		//update ray
		var rayPosition:Vector3D = view.unproject(x, y, 0);
		var rayDirection:Vector3D = view.unproject(x, y, 1).subtract(rayPosition);

		return this._mousePicker.getCollision(rayPosition, rayDirection);
	}
}