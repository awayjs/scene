import { AssetEvent, Box, Matrix, Vector3D } from '@awayjs/core';

import { IEntityTraverser, PartitionBase, EntityNode } from '@awayjs/view';

import { IMaterial } from '@awayjs/renderer';

import { Graphics, Shape } from '@awayjs/graphics';

import { DisplayObjectContainer } from './DisplayObjectContainer';
import { PrefabBase } from '../prefabs/PrefabBase';
import { DisplayObject } from './DisplayObject';
import { Stage } from '@awayjs/stage';
import { SceneImage2D } from '../image/SceneImage2D';

/**
 * Sprite is an instance of a Graphics, augmenting it with a presence in the scene graph, a material, and an animation
 * state. It consists out of Graphices, which in turn correspond to SubGeometries. Graphices allow different parts
 * of the graphics to be assigned different materials.
 */
export class Sprite extends DisplayObjectContainer {
	private _isEntity: boolean = false;

	public _iSourcePrefab: PrefabBase;

	private _isBitmapCacheUsed: boolean = false;
	private _bitmapCacheImage: SceneImage2D;
	private _bitmapCacheShape: Shape;
	private _bitmapCacheGraphics: Graphics;

	private static _sprites: Array<Sprite> = new Array<Sprite>();

	public static assetType: string = '[asset Sprite]';

	public static getNewSprite(graphics: Graphics = null, material: IMaterial = null): Sprite {
		if (Sprite._sprites.length) {
			const sprite: Sprite = Sprite._sprites.pop();
			sprite.graphics = graphics || Graphics.getGraphics();
			sprite.material = material;
			return sprite;
		}

		return new Sprite(graphics, material);
	}

	public static clearPool() {
		Sprite._sprites = [];
	}

	private _center: Vector3D;
	public _graphics: Graphics;
	protected _onGraphicsInvalidateDelegate: (event: AssetEvent) => void;

	/**
	 *
	 */
	public get assetType(): string {
		return Sprite.assetType;
	}

	/**
	 * Specifies the Graphics object belonging to this Sprite object, where
	 * drawing commands can occur.
	 */
	public get graphics(): Graphics {
		if (this._iSourcePrefab)
			this._iSourcePrefab._iValidate();

		if (this.isSlice9ScaledSprite) {
			//var comps:Array<Vector3D> = this.transform.concatenatedMatrix3D.decompose();

			this._graphics.updateSlice9(this.parent.scaleX, this.parent.scaleY);
		}

		return this._graphics;
	}

	public set graphics(value: Graphics) {
		if (value == null)
			throw new Error('Cannot have graphics set to null');

		this._setGraphics(value);
	}

	protected _setGraphics(value: Graphics): void {
		if (this._graphics == value) {
			return;
		}

		if (this._graphics) {
			this._graphics.removeEventListener(AssetEvent.INVALIDATE, this._onGraphicsInvalidateDelegate);
			this._graphics.usages--;

			//if (!this._graphics.usages)
			//	this.graphics.dispose();
		}

		this._graphics = value;

		this._graphics.usages++;

		this._onGraphicsInvalidate(null);
	}

	/**
	 * Create a new Sprite object.
	 *
	 * @param material    [optional]        The material with which to render the Sprite.
	 */
	constructor(graphics: Graphics = null, material: IMaterial = null) {
		super();

		this._onGraphicsInvalidateDelegate = (event: AssetEvent) => this._onGraphicsInvalidate(event);

		this.graphics = graphics || Graphics.getGraphics();

		this.material = material;
	}

	public _setParent(parent: DisplayObjectContainer): void {
		super._setParent(parent);

		if (parent)
			this._graphics.addEventListener(AssetEvent.INVALIDATE, this._onGraphicsInvalidateDelegate);
		else
			this._graphics.removeEventListener(AssetEvent.INVALIDATE, this._onGraphicsInvalidateDelegate);
	}

	public isEntity(): boolean {
		return Boolean(this._scrollRect || (this._graphics && this._graphics.count));
	}

	public dropBitmapCache() {
		this._bitmapCacheImage && this._bitmapCacheImage.dispose();
		this._bitmapCacheGraphics && this._bitmapCacheGraphics.dispose();
		this._bitmapCacheShape && this._bitmapCacheShape.dispose();

		this._isBitmapCacheUsed = false;
		this.cacheAsBitmap = false;
		this._bitmapCacheImage = null;
		this._bitmapCacheGraphics = null;
		this._bitmapCacheShape = null;
	}

	public generateBitmapCache(rect: Box, stage: Stage) {
		this._isBitmapCacheUsed = false;

		const PADDING = 8;

		const width = Math.ceil(rect.width) + PADDING;
		const height = Math.ceil(rect.height) + PADDING;
		const x = Math.floor(rect.x) - PADDING / 2;
		const y = Math.floor(rect.y) - PADDING / 2;

		if (!this._bitmapCacheGraphics) {
			this._bitmapCacheGraphics = Graphics.getGraphics();
		}

		const graphics = this._bitmapCacheGraphics;

		if (
			!this._bitmapCacheImage ||
			this._bitmapCacheImage.width !== width ||
			this._bitmapCacheImage.height !== height
		) {
			if (this._bitmapCacheImage) {
				this._bitmapCacheImage.dispose();
			}

			if (this._bitmapCacheShape) {
				this._bitmapCacheShape.dispose();
				this._bitmapCacheShape = null;
			}

			this._bitmapCacheImage = SceneImage2D.getImage(
				width,
				height,
				true,
				0,
				false,
				stage,
				false
			);
		}

		const m = new Matrix(1, 0, 0, 1, -x, -y);

		this._bitmapCacheImage.draw(this, m);

		m.rawData[4] = x;
		m.rawData[5] = y;

		if (!this._bitmapCacheShape) {
			graphics.beginBitmapFill(this._bitmapCacheImage, m, false, true);
			graphics.drawRect(x, y, width, height);
			graphics.endFill();

			this._bitmapCacheShape = graphics.getShapeAt(0);
		}

		this._isBitmapCacheUsed = true;
		this.cacheAsBitmap = true;
	}

	/**
	 * @inheritDoc
	 */
	public dispose(): void {
		this.disposeValues();

		Sprite._sprites.push(this);
	}

	/**
	 * @inheritDoc
	 */
	public disposeValues(): void {
		super.disposeValues();
	}

	/**
	 * Clones this Sprite instance along with all it's children, while re-using the same
	 * material, graphics and animation set. The returned result will be a copy of this sprite,
	 * containing copies of all of it's children.
	 *
	 * Properties that are re-used (i.e. not cloned) by the new copy include name,
	 * graphics, and material. Properties that are cloned or created anew for the copy
	 * include subSpritees, children of the sprite, and the animator.
	 *
	 * If you want to copy just the sprite, reusing it's graphics and material while not
	 * cloning it's children, the simplest way is to create a new sprite manually:
	 *
	 * <code>
	 * var clone : Sprite = new Sprite(original.graphics, original.material);
	 * </code>
	 */
	public clone(): Sprite {
		const newInstance: Sprite = Sprite.getNewSprite();

		this.copyTo(newInstance);

		return newInstance;
	}

	public copyTo(sprite: Sprite, cloneShapes: boolean = false): void {
		super.copyTo(sprite);

		sprite._iSourcePrefab = this._iSourcePrefab;

		this._graphics.copyTo(sprite._graphics, cloneShapes);
	}

	/**
	 *
	 */
	public _iInternalUpdate(): void {
		super._iInternalUpdate();

		// if(this.parent)
		// 	this._graphics.updateScale(view);
	}

	/**
	 * //TODO
	 *
	 * @private
	 */
	protected _onGraphicsInvalidate(event: AssetEvent): void {
		const isEntity: boolean = this.isEntity();

		if (this._isEntity != isEntity) {
			if (!isEntity)
				this._clearEntity();

			this._isEntity = isEntity;
		}

		this.invalidate();
	}

	/**
	 *
	 * @param renderer
	 *
	 * @internal
	 */
	public _acceptTraverser(traverser: IEntityTraverser): void {
		super._acceptTraverser(traverser);

		// PickEnity is bounds
		if (this._isBitmapCacheUsed) {
			this._bitmapCacheGraphics._acceptTraverser(traverser);
			return;
		}

		this.graphics._acceptTraverser(traverser);
	}

	/**
	 *
	 */
	public bakeTransformations(): void {
		this._graphics.applyTransformation(this.transform.matrix3D);
		this.transform.clearMatrix3D();
	}
}

DisplayObject._scrollRectSpriteClass = Sprite;
PartitionBase.registerAbstraction(EntityNode, Sprite);