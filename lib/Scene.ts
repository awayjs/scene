import { Vector3D, getTimer } from '@awayjs/core';

import {
	View,
	PickingCollision,
	BasicPartition,
	PartitionBase,
	TabPicker,
	RaycastPicker,
	PickGroup,
} from '@awayjs/view';
import { RendererBase, RenderGroup, RendererType } from '@awayjs/renderer';

import { TouchPoint } from './base/TouchPoint';
import { Camera } from './display/Camera';
import { CameraEvent } from './events/CameraEvent';
import { MouseManager } from './managers/MouseManager';
import { DisplayObjectContainer } from './display/DisplayObjectContainer';
import { DisplayObject } from './display/DisplayObject';
import { MaterialManager } from '@awayjs/graphics';
import { MethodMaterial, ImageTexture2D } from '@awayjs/materials';

export class Scene {

	/*
	 ***************************************************************************
	 * Development Notes
	 ***************************************************************************
	 *
	 * ShareContext - this is not being used at the moment integration with other
	 * frameworks is not yet implemented or tested
	 * and ( _localPos / _globalPos ) position of view are the same for the moment
	 *
	 * Background - this is currently not being included in our tests and
	 * is currently disabled
	 *
	 ***************************************************************************
	 */

	private _rendererType: RendererType;
	private _camera: Camera;
	private _renderer: RendererBase;
	private _partition: PartitionBase;
	private _view: View;
	private _pickGroup: PickGroup;

	private _time: number = 0;
	private _deltaTime: number = 0;

	private _onProjectionChangedDelegate: (event: CameraEvent) => void;
	private _mouseManager: MouseManager;
	private _mousePicker: RaycastPicker;
	private _tabPicker: TabPicker;

	public _mouseX: number;
	public _mouseY: number;
	public _touchPoints: Array<TouchPoint> = new Array<TouchPoint>();

	public get partition(): PartitionBase {
		return this._partition;
	}

	public set partition(value: PartitionBase) {
		if (this._partition == value)
			return;

		this._partition = value;
		this._mousePicker = this._pickGroup.getRaycastPicker(this._partition);
		this._tabPicker = this._pickGroup.getTabPicker(this._partition);
		this._mousePicker.findClosestCollision = true;

		if (this._camera) {
			this._camera.clear();
			this._partition.invalidateEntity(this._camera);
			this._camera.partition = this._partition;
		}

		this._mousePicker = this._pickGroup.getRaycastPicker(this._partition);
		this._tabPicker = this._pickGroup.getTabPicker(this._partition);
		this._mousePicker.findClosestCollision = true;

		this._partition.root.partition = this._partition;

		//this._disposeRenderer();
	}

	public get view(): View {
		return this._view;
	}

	public set view(value: View) {
		if (this._view == value)
			return;

		if (this._view) {
			if (this._renderer) {
				RenderGroup.clearInstance(this._view, this._rendererType);
				this._renderer = null;
			}

			PickGroup.clearInstance(this._view);

			this._mouseManager.unregisterContainer(this._view.stage.container);
			this._mouseManager.unregisterScene(this);
		}

		this._view = value;
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
	constructor(
		partition: PartitionBase = null, camera: Camera = null, view: View = null, rendererType: RendererType = null) {

		this._onProjectionChangedDelegate = (event: CameraEvent) => this._onProjectionChanged(event);

		this._rendererType = rendererType || RendererType.DEFAULT;
		this.view = view || new View();
		this.partition = partition || new BasicPartition(new DisplayObjectContainer());
		this.camera = camera || new Camera();

		//			if (this._shareContext)
		//				this._mouse3DManager.addViewLayer(this);
	}

	public layeredView: boolean; //TODO: something to enable this correctly

	public disableMouseEvents: boolean; //TODO: hack to ignore mouseevents on certain views

	public forceMouseMove: boolean;

	public get renderer(): RendererBase {
		if (!this._renderer)
			this._renderer = RenderGroup.getInstance(this._view, this._rendererType).getRenderer(this._partition);

		return this._renderer;
	}

	public get root(): DisplayObjectContainer {
		return <DisplayObjectContainer> this._partition.root;
	}

	public get mouseX(): number {
		return this._mouseX;
	}

	public get mouseY(): number {
		return this._mouseY;
	}

	public get touchPoints(): Array<TouchPoint> {
		return this._touchPoints;
	}

	public getLocalMouseX(entity: DisplayObject): number {
		return entity
			.transform
			.inverseConcatenatedMatrix3D
			.transformVector(
				this._renderer.view.unproject(
					this._mouseX, this._mouseY, 1000))
			.x;
	}

	public getLocalMouseY(entity: DisplayObject): number {
		return entity
			.transform
			.inverseConcatenatedMatrix3D
			.transformVector(
				this._renderer.view.unproject(
					this._mouseX, this._mouseY, 1000))
			.y;
	}

	public getLocalTouchPoints(entity: DisplayObject): Array<TouchPoint> {
		let localPosition: Vector3D;
		const localTouchPoints: Array<TouchPoint> = new Array<TouchPoint>();

		const len: number = this._touchPoints.length;
		for (let i: number = 0; i < len; i++) {
			localPosition = entity
				.transform
				.inverseConcatenatedMatrix3D
				.transformVector(
					this._renderer.view.unproject(
						this._touchPoints[i].x, this._touchPoints[i].y, 1000));

			localTouchPoints.push(new TouchPoint(localPosition.x, localPosition.y, this._touchPoints[i].id));
		}

		return localTouchPoints;
	}

	/**
	 *
	 */
	public get rendererType(): RendererType {
		return this._rendererType;
	}

	public set rendererType(value: RendererType) {
		if (this._rendererType == value)
			return;

		if (this._renderer) {
			RenderGroup.clearInstance(this._view, this._rendererType);
			this._renderer = null;
		}

		this._rendererType = value;
	}

	/**
	 *
	 * @returns {Camera3D}
	 */
	public get camera(): Camera {
		return this._camera;
	}

	/**
	 * Set camera that's used to render the scene for this view
	 */
	public set camera(value: Camera) {
		if (this._camera == value)
			return;

		if (this._camera) {
			this._camera.clear();
			this._camera.removeEventListener(CameraEvent.PROJECTION_CHANGED, this._onProjectionChangedDelegate);
		}

		this._camera = value;

		this._camera.addEventListener(CameraEvent.PROJECTION_CHANGED, this._onProjectionChangedDelegate);

		if (this._view)
			this._view.projection = this._camera.projection;

		this._partition.invalidateEntity(this._camera);
		this._camera.partition = this._partition;
	}

	/**
	 *
	 * @returns {number}
	 */
	public get deltaTime(): number {
		return this._deltaTime;
	}

	public get mouseManager(): MouseManager {
		return this._mouseManager;
	}

	/**
	 *
	 */
	public get mousePicker(): RaycastPicker {
		return this._mousePicker;
	}

	/**
	 *
	 */
	public get tabPicker(): TabPicker {
		return this._tabPicker;
	}

	/**
	 *
	 * @returns {number}
	 */
	public get renderedFacesCount(): number {
		return 0; //TODO
		//return this._pEntityCollector._pNumTriangles;//numTriangles;
	}

	public beforeRenderCallback: Function;

	public fireMouseEvents() {
		if (!this.disableMouseEvents)
			this._mouseManager.fireMouseEvents(this);

	}

	/**
	 * Renders the view.
	 */
	public render(fireMousEvents: boolean = true): void {
		this._updateTime();

		// update picking
		if (fireMousEvents && !this.disableMouseEvents)
			this._mouseManager.fireMouseEvents(this);

		if (this.beforeRenderCallback)
			this.beforeRenderCallback();

		const stage = this._view.stage;

		stage.onRenderBegin && stage.onRenderBegin();

		//render the contents of the scene
		this.renderer.render();

		stage.onRenderEnd && stage.onRenderEnd();
	}

	/**
	 *
	 */
	private _updateTime(): void {
		const time: number = getTimer();

		if (this._time == 0)
			this._time = time;

		this._deltaTime = time - this._time;
		this._time = time;
	}

	/**
	 *
	 */
	public dispose(): void {
		if (this._renderer) {
			RenderGroup.clearInstance(this._view, this._rendererType);
			this._renderer = null;
		}

		// TODO: imeplement mouseManager / touch3DManager
		this._mouseManager.unregisterScene(this);

		//this._touch3DManager.disableTouchListeners(this);
		//this._touch3DManager.dispose();

		this._mouseManager = null;
		//this._touch3DManager = null;
	}

	/**
	 *
	 */
	private _onProjectionChanged(event: CameraEvent): void {
		this._view.projection = this._camera.projection;
	}

	public getViewCollision(x: number, y: number): PickingCollision {
		//update ray
		const rayPosition: Vector3D = this._view.unproject(x, y, 0);
		const rayDirection: Vector3D = this._view.unproject(x, y, 1).subtract(rayPosition);

		return this._mousePicker.getCollision(rayPosition, rayDirection);
	}
}

MaterialManager.materialClass = MethodMaterial;
MaterialManager.textureClass = ImageTexture2D;