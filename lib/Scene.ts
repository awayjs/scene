import { Vector3D, getTimer } from '@awayjs/core';

import {
	View,
	BasicPartition,
	PartitionBase,
	TabPicker,
	RaycastPicker,
	PickGroup,
	NodePool,
	INode,
	ContainerNode,
} from '@awayjs/view';
import { RendererBase, RenderGroup, RendererType } from '@awayjs/renderer';

import { Camera } from './display/Camera';
import { CameraEvent } from './events/CameraEvent';
import { MouseManager } from './managers/MouseManager';
import { DisplayObjectContainer } from './display/DisplayObjectContainer';
import { DisplayObject } from './display/DisplayObject';
import { MaterialManager } from '@awayjs/graphics';
import { MethodMaterial, ImageTexture2D } from '@awayjs/materials';
import { TouchPoint } from '@awayjs/stage';

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

	public get partition(): PartitionBase {
		return this._partition;
	}

	public set partition(value: PartitionBase) {
		if (this._partition == value)
			return;

		if (this._mousePicker)
			this._mouseManager.unregisterPicker(this._mousePicker);

		this._partition = value;
		this._mousePicker = this._pickGroup.getRaycastPicker(this._partition);
		this._tabPicker = this._pickGroup.getTabPicker(this._partition);
		this._mousePicker.findClosestCollision = true;

		this._mouseManager.registerPicker(this._mousePicker);

		if (this._camera) {
			this._camera.clear();
			this._partition.invalidateEntity(this._camera);
			//this._camera.partition = this._partition;
		}

		//this._partition.root.partition = this._partition;

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

			if (this._mousePicker)
				this._mouseManager.unregisterPicker(this._mousePicker);
		}

		this._view = value;
		this._pickGroup = PickGroup.getInstance(this._view);

		this._mouseManager = MouseManager.getInstance(this._view.stage);

		if (this._mousePicker)
			this._mouseManager.registerPicker(this._mousePicker);

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
		this.partition = partition || NodePool.getRootNode(new DisplayObjectContainer(), BasicPartition).partition;
		this.camera = camera || new Camera();

		//			if (this._shareContext)
		//				this._mouse3DManager.addViewLayer(this);
	}

	public disableMouseEvents: boolean; //TODO: hack to ignore mouseevents on certain views

	public get renderer(): RendererBase {
		if (!this._renderer)
			this._renderer = RenderGroup.getInstance(this._view, this._rendererType).getRenderer(this._partition);

		return this._renderer;
	}

	public get mouseX(): number {
		return this._mouseX;
	}

	public get mouseY(): number {
		return this._mouseY;
	}

	public getLocalMouseX(node: ContainerNode): number {
		return node
			.getInverseMatrix3D()
			.transformVector(
				this._view.unproject(
					this._view.stage.screenX, this._view.stage.screenY, 1000))
			.x;
	}

	public getLocalMouseY(node: ContainerNode): number {
		return node
			.getInverseMatrix3D()
			.transformVector(
				this._view.unproject(
					this._view.stage.screenX, this._view.stage.screenY, 1000))
			.y;
	}

	public getLocalTouchPoints(node: ContainerNode): Array<TouchPoint> {
		let localPosition: Vector3D;
		const localTouchPoints: Array<TouchPoint> = new Array<TouchPoint>();

		const len: number = this._view.stage.touchPoints.length;
		for (let i: number = 0; i < len; i++) {
			localPosition = node
				.getInverseMatrix3D()
				.transformVector(
					this._view.unproject(
						this._view.stage.touchPoints[i].x, this._view.stage.touchPoints[i].y, 1000));

			localTouchPoints.push(new TouchPoint(localPosition.x, localPosition.y, this._view.stage.touchPoints[i].id));
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
		//this._camera.partition = this._partition;
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
			this._mouseManager.fireMouseEvents(this._mousePicker);
	}

	/**
	 * Renders the view.
	 */
	public render(fireMousEvents: boolean = true): void {
		this._updateTime();

		// update picking
		if (fireMousEvents && !this.disableMouseEvents)
			this._mouseManager.fireMouseEvents(this._mousePicker);

		if (this.beforeRenderCallback)
			this.beforeRenderCallback();

		const stage = this._view.stage;

		//render the contents of the scene
		this.renderer.render();
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

		this._mouseManager.dispose();

		this._mouseManager = null;
	}

	/**
	 *
	 */
	private _onProjectionChanged(event: CameraEvent): void {
		this._view.projection = this._camera.projection;
	}
}

MaterialManager.materialClass = MethodMaterial;
MaterialManager.textureClass = ImageTexture2D;