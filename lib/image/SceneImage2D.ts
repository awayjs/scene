import {
	ColorTransform,
	Matrix,
	Rectangle,
	Point,
	PerspectiveProjection,
	CoordinateSystem,
	Vector3D,
	Transform
} from '@awayjs/core';

import { Stage,
	BitmapImage2D,
	_Stage_BitmapImage2D,
	BlendMode,
	ContextWebGL,
	ContextGLBlendFactor,
	ContextGLTriangleFace
} from '@awayjs/stage';

import { DefaultRenderer, RenderGroup, RendererType, Style } from '@awayjs/renderer';

import { DisplayObject } from '../display/DisplayObject';
import { DisplayObjectContainer } from '../display/DisplayObjectContainer';
import { SceneGraphPartition } from '../partition/SceneGraphPartition';

import { View } from '@awayjs/view';
import { MethodMaterial } from '@awayjs/materials';
import { Billboard } from '../display/Billboard';

// empty matrix for transfrorm reset
const TMP_COLOR_MATRIX = new ColorTransform();
const TMP_RAW: number[] = [];
const TMP_POINT = new Point(0,0);
const TMP_RECT = new Rectangle();

/**
 *
 */
export class SceneImage2D extends BitmapImage2D {
	public static assetType: string = '[image SceneImage2D]';
	private static MAX_POOL_SIZE = 30;
	private static MAX_GROW_SIZE = 300; // x10 of start value
	private static _pool: SceneImage2D[] = [];

	public static getImage(
		width: number, height: number, transparent: boolean = true,
		fillColor: number = 0xffffffff, powerOfTwo: boolean = true, stage: Stage = null) {

		let index = -1;
		for (let i = 0; i < this._pool.length; i++) {
			const e = this._pool[i];

			if ((!stage || e._stage === stage)
				&& e.width === width
				&& e.height === height
				&& e.transparent === transparent
				&& e.powerOfTwo === powerOfTwo
			) {
				index = i;
				break;
			}
		}

		if (index > -1) {
			const e = this._pool.splice(index, 1)[0];

			if (fillColor !== null)
				e.fillRect(e.rect, fillColor);
			return e;
		} else {
			if (this._pool.length === this.MAX_POOL_SIZE && this.MAX_POOL_SIZE < this.MAX_GROW_SIZE) {

				// GROW POOL WHEN THERE ARE NOT needed image size
				this.MAX_POOL_SIZE += this .MAX_POOL_SIZE * 0.25 | 0;
			}
		}

		return new SceneImage2D(
			width,
			height,
			transparent,
			fillColor,
			powerOfTwo,
			stage
		);
	}

	public static tryStoreImage(image: SceneImage2D, force = false): boolean {
		if (this._pool.length <= this.MAX_POOL_SIZE || force) {
			this._pool.push(image);
			return true;
		}

		return false;
	}

	private static TMP_STEP = [128, 256, 512, 1024, 2048];
	private static getTemp(width: number, height: number, stage: Stage) {

		const max = Math.max(width, height);

		let size = this.TMP_STEP[0];

		for (let i = 0; i < this.TMP_STEP.length; i++) {
			if (max <= this.TMP_STEP[i]) {
				size = this.TMP_STEP[i];
				break;
			}
		}

		return this.getImage(size, size, true, null, true, stage);
	}

	private static _renderer: DefaultRenderer;
	private static _billboardRenderer: DefaultRenderer;
	private static _root: DisplayObjectContainer;
	private static _billboardRoot: DisplayObjectContainer;
	private static _billboard: Billboard;

	// regions that already updated by getPixel, getPixels methods
	private _updateRegions: Rectangle[] = [];

	private _dirtyRegions: Rectangle[] = [];
	private _maxDirtyArea: Rectangle = null;
	// when all SceneImageBitmap is updated
	private _fullDirty: boolean = false;
	// legacy
	private _imageDataDirty: boolean;

	protected syncData(): boolean {
		this.applySymbol();

		// update data from pixels from GPU
		if (!this._imageDataDirty) {
			return false;
		}

		const internalData = this._data || (this._data = new Uint8ClampedArray(this.width * this.height * 4));

		this._stage.setRenderTarget(this, false);

		const gl = (this._stage.context as ContextWebGL)._gl;

		// copy to self data, update it
		gl.readPixels(0, 0, this.rect.width, this.rect.height, gl.RGBA, gl.UNSIGNED_BYTE, internalData);

		this._stage.setRenderTarget(null);
		this.resetDirty();
		return true;
	}

	public get data(): Uint8ClampedArray {
		this.syncData();
		// access to private
		return (this as any)._data;
	}

	/**
	 * Marks region as dirty for optiomisation for getPixel* methods
	 */
	private pushDirtyRegion(rect: Rectangle): void {
		this._imageDataDirty = true;

		if (this._fullDirty) {
			if (this._updateRegions && this._updateRegions.length) {
				this._updateRegions.length = 0;
			}
			return;
		}

		const eq = rect.equals(this._rect);

		if (!this._dirtyRegions) {
			this._dirtyRegions = [];
		}

		if (!eq) {
			this._dirtyRegions.push(rect);
		} else {
			this._dirtyRegions = [this._rect];
			this._fullDirty = true;
		}

		if (!this._maxDirtyArea || eq) {
			this._maxDirtyArea = rect.clone();
		} else {
			const rr = rect._rawData;
			const ma = this._maxDirtyArea;
			const mr = ma._rawData;

			mr[0] = rr[0] < mr[0] ? rr[0] : mr[0];
			mr[1] = rr[1] < mr[1] ? rr[1] : mr[1];

			ma.right = ma.right < rect.right ? ma.right : rect.right;
			ma.bottom = ma.bottom < rect.bottom ? ma.bottom : rect.bottom;

			//clamp
			if (mr[0] < 0) (mr[0] = 0);
			if (mr[1] < 0) (mr[1] = 0);
			if (mr[2] > this.width) (mr[2] = this.width);
			if (mr[3] > this.height) (mr[3] = this.height);
		}

		if (this._updateRegions) {
			for (let i = this._updateRegions.length - 1; i >= 0; i--) {
				if (this._updateRegions[i].intersects(rect)) {
					this._updateRegions.splice(i, 1);
				}
			}
		}

	}

	/**
	 *
	 */
	private resetDirty() {
		this._dirtyRegions = [];
		this._updateRegions = [];

		this._maxDirtyArea = null;
		this._fullDirty = false;

		this._imageDataDirty = false;
	}

	/**
	 *
	 * @returns {string}
	 */
	public get assetType(): string {
		return SceneImage2D.assetType;
	}

	/**
	 * Creates a BitmapImage2D object with a specified width and height. If you
	 * specify a value for the <code>fillColor</code> parameter, every pixel in
	 * the bitmap is set to that color.
	 *
	 * <p>By default, the bitmap is created as transparent, unless you pass
	 * the value <code>false</code> for the transparent parameter. After you
	 * create an opaque bitmap, you cannot change it to a transparent bitmap.
	 * Every pixel in an opaque bitmap uses only 24 bits of color channel
	 * information. If you define the bitmap as transparent, every pixel uses 32
	 * bits of color channel information, including an alpha transparency
	 * channel.</p>
	 *
	 * @param width       The width of the bitmap image in pixels.
	 * @param height      The height of the bitmap image in pixels.
	 * @param transparent Specifies whether the bitmap image supports per-pixel
	 *                    transparency. The default value is <code>true</code>
	 *                    (transparent). To create a fully transparent bitmap,
	 *                    set the value of the <code>transparent</code>
	 *                    parameter to <code>true</code> and the value of the
	 *                    <code>fillColor</code> parameter to 0x00000000(or to
	 *                    0). Setting the <code>transparent</code> property to
	 *                    <code>false</code> can result in minor improvements
	 *                    in rendering performance.
	 * @param fillColor   A 32-bit ARGB color value that you use to fill the
	 *                    bitmap image area. The default value is
	 *                    0xFFFFFFFF(solid white).
	 */
	constructor(
		width: number, height: number, transparent: boolean = true,
		fillColor: number = 0xffffffff, powerOfTwo: boolean = true, stage: Stage = null) {

		super(width, height, transparent, fillColor, powerOfTwo, stage);
	}

	private createRenderer() {
		//create the projection
		const projection = new PerspectiveProjection();
		projection.coordinateSystem = CoordinateSystem.RIGHT_HANDED;
		projection.originX = -1;
		projection.originY = 1;

		//create the view
		SceneImage2D._root = new DisplayObjectContainer();
		SceneImage2D._renderer = <DefaultRenderer> RenderGroup.getInstance(
			new View(projection, this._stage, null, null, null, true),
			RendererType.DEFAULT)
			.getRenderer(new SceneGraphPartition(SceneImage2D._root));

		SceneImage2D._root.partition = SceneImage2D._renderer.partition;

		//setup the projection
		SceneImage2D._renderer.disableClear = true;
		SceneImage2D._renderer.view.backgroundAlpha = 0;
		SceneImage2D._renderer.view.projection = projection;
		SceneImage2D._renderer.view.projection.transform = new Transform();
		SceneImage2D._renderer.view.projection.transform.moveTo(0, 0, -1000);
		SceneImage2D._renderer.view.projection.transform.lookAt(new Vector3D());

		SceneImage2D._renderer.renderableSorter = null;//new RenderableSort2D();

	}

	private createBillboardRenderer(): void {
		//create the projection
		const projection = new PerspectiveProjection();
		projection.coordinateSystem = CoordinateSystem.RIGHT_HANDED;
		projection.originX = -1;
		projection.originY = 1;

		//create the view
		SceneImage2D._billboardRoot = new DisplayObjectContainer();
		SceneImage2D._billboardRenderer = <DefaultRenderer> RenderGroup.getInstance(
			new View(projection,this._stage, null, null, null, true),
			RendererType.DEFAULT)
			.getRenderer(new SceneGraphPartition(SceneImage2D._billboardRoot));

		SceneImage2D._billboardRoot.partition = SceneImage2D._billboardRenderer.partition;

		//setup the projection
		SceneImage2D._billboardRenderer.disableClear = true;
		SceneImage2D._billboardRenderer.view.backgroundAlpha = 0;
		SceneImage2D._billboardRenderer.view.projection = projection;
		SceneImage2D._billboardRenderer.view.projection.transform = new Transform();
		SceneImage2D._billboardRenderer.view.projection.transform.moveTo(0, 0, -1000);
		SceneImage2D._billboardRenderer.view.projection.transform.lookAt(new Vector3D());

		SceneImage2D._billboardRenderer.renderableSorter = null;//new RenderableSort2D();

		const mat: MethodMaterial = new MethodMaterial(new BitmapImage2D(128, 128, true, 0x0));
		//mat.colorTransform = new ColorTransform(argb[1]/255, argb[2]/255, argb[3]/255);
		mat.bothSides = true;
		mat.alphaBlending = true;

		SceneImage2D._billboard = new Billboard(mat);
		SceneImage2D._billboard.style = new Style();

		SceneImage2D._billboardRoot.addChild(SceneImage2D._billboard);
	}

	/**
	 * Frees memory that is used to store the BitmapImage2D object.
	 *
	 * <p>When the <code>dispose()</code> method is called on an image, the width
	 * and height of the image are set to 0. All subsequent calls to methods or
	 * properties of this BitmapImage2D instance fail, and an exception is thrown.
	 * </p>
	 *
	 * <p><code>BitmapImage2D.dispose()</code> releases the memory occupied by the
	 * actual bitmap data, immediately(a bitmap can consume up to 64 MB of
	 * memory). After using <code>BitmapImage2D.dispose()</code>, the BitmapImage2D
	 * object is no longer usable and an exception may be thrown if
	 * you call functions on the BitmapImage2D object. However,
	 * <code>BitmapImage2D.dispose()</code> does not garbage collect the BitmapImage2D
	 * object(approximately 128 bytes); the memory occupied by the actual
	 * BitmapImage2D object is released at the time the BitmapImage2D object is
	 * collected by the garbage collector.</p>
	 *
	 */
	public dispose(): void {
		this.dropAllReferences();
		this.unmarkToUnload();
		this.unuseWeakRef();

		this._dirtyRegions = null;
		this._updateRegions = null;
		this._maxDirtyArea = null;

		// drop buffer, because is big
		this._data = null;
		this._locked = false;

		if (!SceneImage2D.tryStoreImage(this, false)) {
			super.dispose();
		}

		//todo
	}

	public unload() {
		this.syncData();
		super.unload();
	}

	protected deepClone(from: BitmapImage2D) {
		this.copyPixels(from, this._rect, new Point(0,0));
	}

	public clone(): SceneImage2D {
		const clone = SceneImage2D.getImage(this.width, this.height, this.transparent, null, false, this._stage);
		this.addNestedReference(clone);

		return clone;
	}

	/**
	 * Fills a rectangular area of pixels with a specified ARGB color.
	 *
	 * @param rect  The rectangular area to fill.
	 * @param color The ARGB color value that fills the area. ARGB colors are
	 *              often specified in hexadecimal format; for example,
	 *              0xFF336699.
	 * @throws TypeError The rect is null.
	 */
	public fillRect(rect: Rectangle, color: number): void {
		this.dropAllReferences();

		if (!SceneImage2D._renderer)
			this.createRenderer();

		//set target and scale value
		SceneImage2D._renderer.view.target = this;
		SceneImage2D._renderer.view.projection.scale = 1000 / this.rect.height;

		const alpha = this._transparent ? (color >> 24 & 0xff) / 255 : 1;
		const rgb = color & 0xffffff;

		//make sure we are setup on view
		SceneImage2D._renderer.view.x = rect.x;
		SceneImage2D._renderer.view.y = rect.y;
		SceneImage2D._renderer.view.width = rect.width;
		SceneImage2D._renderer.view.height = rect.height;
		SceneImage2D._renderer.view.backgroundAlpha = alpha;
		SceneImage2D._renderer.view.backgroundColor = rgb;
		SceneImage2D._renderer.view.clear(true, true);

		this.pushDirtyRegion(rect);
	}

	/**
	 * Provides a fast routine to perform pixel manipulation between images with
	 * no stretching, rotation, or color effects. This method copies a
	 * rectangular area of a source image to a rectangular area of the same size
	 * at the destination point of the destination BitmapImage2D object.
	 *
	 * <p>If you include the <code>alphaBitmap</code> and <code>alphaPoint</code>
	 * parameters, you can use a secondary image as an alpha source for the
	 * source image. If the source image has alpha data, both sets of alpha data
	 * are used to composite pixels from the source image to the destination
	 * image. The <code>alphaPoint</code> parameter is the point in the alpha
	 * image that corresponds to the upper-left corner of the source rectangle.
	 * Any pixels outside the intersection of the source image and alpha image
	 * are not copied to the destination image.</p>
	 *
	 * <p>The <code>mergeAlpha</code> property controls whether or not the alpha
	 * channel is used when a transparent image is copied onto another
	 * transparent image. To copy pixels with the alpha channel data, set the
	 * <code>mergeAlpha</code> property to <code>true</code>. By default, the
	 * <code>mergeAlpha</code> property is <code>false</code>.</p>
	 *
	 * @param sourceBitmapImage2D The input bitmap image from which to copy pixels.
	 *                         The source image can be a different BitmapImage2D
	 *                         instance, or it can refer to the current
	 *                         BitmapImage2D instance.
	 * @param sourceRect       A rectangle that defines the area of the source
	 *                         image to use as input.
	 * @param destPoint        The destination point that represents the
	 *                         upper-left corner of the rectangular area where
	 *                         the new pixels are placed.
	 * @param alphaBitmapImage2D  A secondary, alpha BitmapImage2D object source.
	 * @param alphaPoint       The point in the alpha BitmapImage2D object source
	 *                         that corresponds to the upper-left corner of the
	 *                         <code>sourceRect</code> parameter.
	 * @param mergeAlpha       To use the alpha channel, set the value to
	 *                         <code>true</code>. To copy pixels with no alpha
	 *                         channel, set the value to <code>false</code>.
	 * @throws TypeError The sourceBitmapImage2D, sourceRect, destPoint are null.
	 */
	public copyPixels(
		source: BitmapImage2D, sourceRect: Rectangle, destPoint: Point,
		alphaBitmapData?: BitmapImage2D, alphaPoint?: Point, mergeAlpha?: boolean): void {

		this.dropAllReferences();
		this.unmarkToUnload();

		this._stage.context.setCulling(ContextGLTriangleFace.NONE);
		this._stage.context.setBlendFactors(ContextGLBlendFactor.ONE, ContextGLBlendFactor.ONE_MINUS_SOURCE_ALPHA);

		// need drop alpha from source when target is not has alpha
		mergeAlpha = this.transparent !== source.transparent || mergeAlpha;

		if (source !== this) {
			this._stage.copyPixels(source, this, sourceRect, destPoint, alphaBitmapData, alphaPoint, mergeAlpha);
		} else {
			const tmp = SceneImage2D.getTemp(source.width, source.height, this._stage);

			TMP_POINT.setTo(0,0);
			TMP_RECT.setTo(0,0, sourceRect.width, sourceRect.height);

			this._stage.copyPixels(source, tmp, sourceRect, TMP_POINT, alphaBitmapData, alphaPoint, false);
			this._stage.copyPixels(tmp, this, TMP_RECT, destPoint, alphaBitmapData, alphaPoint, mergeAlpha);
			// push temp back

			SceneImage2D.tryStoreImage(tmp, true);
		}

		this.pushDirtyRegion(new Rectangle(destPoint.x, destPoint.y, sourceRect.width, sourceRect.height));
	}

	public threshold(
		source: BitmapImage2D, sourceRect: Rectangle, destPoint: Point,
		operation: string, threshold: number, color: number, mask: number, copySource: boolean): void {

		this.dropAllReferences();
		this.unmarkToUnload();

		this._stage.context.setCulling(ContextGLTriangleFace.NONE);
		this._stage.context.setBlendFactors(ContextGLBlendFactor.ONE, ContextGLBlendFactor.ZERO);
		this._stage.threshold(source, this, sourceRect, destPoint, operation, threshold, color, mask, copySource);

		this.pushDirtyRegion(new Rectangle(destPoint.x, destPoint.y, sourceRect.width, sourceRect.height));
		this._imageDataDirty = true;
	}

	public colorTransform(rect: Rectangle, colorTransform: ColorTransform): void {
		this.dropAllReferences();
		this.unmarkToUnload();

		this._stage.context.setCulling(ContextGLTriangleFace.NONE);
		this._stage.context.setBlendFactors(ContextGLBlendFactor.ONE, ContextGLBlendFactor.ZERO);

		const tmp = SceneImage2D.getTemp(rect.x + rect.width, rect.y + rect.height, this._stage);

		this._stage.colorTransform(this, tmp, rect, colorTransform);
		this._stage.copyPixels(tmp, this, rect, new Point(0,0), null, null, false);

		this.pushDirtyRegion(new Rectangle(rect.x, rect.y, rect.width, rect.height));

		this._imageDataDirty = true;

		SceneImage2D.tryStoreImage(tmp, true);
	}

	/**
	 * @inheritdoc
	 */
	public getPixel32(x: number, y: number): number {
		this.syncData();

		return super.getPixel32(x, y);
	}

	/**
	 * @inheritdoc
	 */
	public getPixel(x: number, y: number): number {
		const result = this.getPixel32(x, y);

		return result & 0x00ffffff;
	}

	/**
	 * Draws the <code>source</code> display object onto the bitmap image, using
	 * the NME software renderer. You can specify <code>matrix</code>,
	 * <code>colorTransform</code>, <code>blendMode</code>, and a destination
	 * <code>clipRect</code> parameter to control how the rendering performs.
	 * Optionally, you can specify whether the bitmap should be smoothed when
	 * scaled(this works only if the source object is a BitmapImage2D object).
	 *
	 * <p>The source display object does not use any of its applied
	 * transformations for this call. It is treated as it exists in the library
	 * or file, with no matrix transform, no color transform, and no blend mode.
	 * To draw a display object(such as a movie clip) by using its own transform
	 * properties, you can copy its <code>transform</code> property object to the
	 * <code>transform</code> property of the Bitmap object that uses the
	 * BitmapImage2D object.</p>
	 *
	 * @param source         The display object or BitmapImage2D object to draw to
	 *                       the BitmapImage2D object.(The DisplayObject and
	 *                       BitmapImage2D classes implement the IBitmapDrawable
	 *                       interface.)
	 * @param matrix         A Matrix object used to scale, rotate, or translate
	 *                       the coordinates of the bitmap. If you do not want to
	 *                       apply a matrix transformation to the image, set this
	 *                       parameter to an identity matrix, created with the
	 *                       default <code>new Matrix()</code> constructor, or
	 *                       pass a <code>null</code> value.
	 * @param colorTransform A ColorTransform object that you use to adjust the
	 *                       color values of the bitmap. If no object is
	 *                       supplied, the bitmap image's colors are not
	 *                       transformed. If you must pass this parameter but you
	 *                       do not want to transform the image, set this
	 *                       parameter to a ColorTransform object created with
	 *                       the default <code>new ColorTransform()</code>
	 *                       constructor.
	 * @param blendMode      A string value, from the flash.display.BlendMode
	 *                       class, specifying the blend mode to be applied to
	 *                       the resulting bitmap.
	 * @param clipRect       A Rectangle object that defines the area of the
	 *                       source object to draw. If you do not supply this
	 *                       value, no clipping occurs and the entire source
	 *                       object is drawn.
	 * @param smoothing      A Boolean value that determines whether a BitmapImage2D
	 *                       object is smoothed when scaled or rotated, due to a
	 *                       scaling or rotation in the <code>matrix</code>
	 *                       parameter. The <code>smoothing</code> parameter only
	 *                       applies if the <code>source</code> parameter is a
	 *                       BitmapImage2D object. With <code>smoothing</code> set
	 *                       to <code>false</code>, the rotated or scaled
	 *                       BitmapImage2D image can appear pixelated or jagged. For
	 *                       example, the following two images use the same
	 *                       BitmapImage2D object for the <code>source</code>
	 *                       parameter, but the <code>smoothing</code> parameter
	 *                       is set to <code>true</code> on the left and
	 *                       <code>false</code> on the right:
	 *
	 *                       <p>Drawing a bitmap with <code>smoothing</code> set
	 *                       to <code>true</code> takes longer than doing so with
	 *                       <code>smoothing</code> set to
	 *                       <code>false</code>.</p>
	 * @throws ArgumentError The <code>source</code> parameter is not a
	 *                       BitmapImage2D or DisplayObject object.
	 * @throws ArgumentError The source is null or not a valid IBitmapDrawable
	 *                       object.
	 * @throws SecurityError The <code>source</code> object and(in the case of a
	 *                       Sprite or MovieClip object) all of its child objects
	 *                       do not come from the same domain as the caller, or
	 *                       are not in a content that is accessible to the
	 *                       caller by having called the
	 *                       <code>Security.allowDomain()</code> method. This
	 *                       restriction does not apply to AIR content in the
	 *                       application security sandbox.
	 */

	/* eslint-disable */
	public draw(source: DisplayObject, matrix?: Matrix, colorTransform?: ColorTransform, blendMode?: string, clipRect?: Rectangle, smoothing?: boolean);
	public draw(source: BitmapImage2D, matrix?: Matrix, colorTransform?: ColorTransform, blendMode?: string, clipRect?: Rectangle, smoothing?: boolean);
	public draw(source: any, matrix?: Matrix, colorTransform?: ColorTransform, blendMode?: string, clipRect?: Rectangle, smoothing?: boolean): void 
	{
	/* eslint-enable */

		this.dropAllReferences();
		this.unmarkToUnload();

		if (source instanceof DisplayObject) {
			this._drawAsDisplay(source, matrix, colorTransform, blendMode, clipRect, smoothing);
		} else {
			this._drawAsBitmap(source, matrix, colorTransform, blendMode, clipRect, smoothing);
		}

		//TODO implement passing real updated region
		this.pushDirtyRegion(this._rect);
		this._imageDataDirty = true;
	}

	private _mapBlendMode(blendMode: string = ''): string {
		switch (blendMode) {
			case null:
			case '':
			case BlendMode.NORMAL:
			case BlendMode.LAYER:
				return BlendMode.LAYER;
			case BlendMode.MULTIPLY:
			case BlendMode.ADD:
			case BlendMode.ALPHA:
				return blendMode;
		}

		//console.debug("[ImageBitmap] Unsupport BlendMode", blendMode);
		return BlendMode.LAYER;
	}

	private _drawAsBitmap(
		source: BitmapImage2D, matrix?: Matrix, colorTransform?: ColorTransform,
		blendMode?: string, clipRect?: Rectangle, smoothing?: boolean) {

		if (!SceneImage2D._billboardRenderer)
			this.createBillboardRenderer();

		const renderer = SceneImage2D._billboardRenderer;
		const root = SceneImage2D._billboardRoot;
		const billboard = SceneImage2D._billboard;

		renderer.disableClear = true;
		renderer.view.target = this;
		renderer.view.projection.scale = 1000 / this.rect.height;

		billboard.material.style.image = source;
		billboard.material.blendMode = this._mapBlendMode(blendMode);

		if (matrix) {
			const m = root.transform.matrix3D;

			m.identity();

			m._rawData[0] = matrix.a;
			m._rawData[1] = -matrix.b;
			m._rawData[4] = matrix.c;
			m._rawData[5] = -matrix.d;
			m._rawData[12] = matrix.tx;
			m._rawData[13] = this.rect.height - matrix.ty;

			root.transform.invalidateComponents();
		} else {

			root.transform.rotateTo(0,0,0);
			root.transform.scaleTo(1, -1, 1);
			root.transform.moveTo(0, this.rect.height,0);
		}

		root.transform.colorTransform = colorTransform;

		//render
		renderer.render();
	}

	private _drawAsDisplay(
		source: DisplayObject, matrix?: Matrix, colorTransform?: ColorTransform,
		blendMode?: string, clipRect?: Rectangle, smoothing?: boolean) {

		if (!SceneImage2D._renderer)
			this.createRenderer();

		const root = SceneImage2D._root;
		const renderer = SceneImage2D._renderer;

		const oldParent = source.parent;
		const depth = source._depthID;
		const index = oldParent ? oldParent.getChildIndex(source) : 0;
		const oldVisible = source.visible;

		const sTrans = source.transform;

		// clone TRS separatenly, because matrix saving/restoring is bugged, ex
		// this works for all knowed cases

		for (let i = 0; i < 4; i++) {
			TMP_RAW[0 + i] = sTrans.position._rawData[i];
			TMP_RAW[4 + i] = sTrans.rotation._rawData[i];
			TMP_RAW[8 + i] = sTrans.scale._rawData[i];
		}

		// same as matrix
		TMP_COLOR_MATRIX.copyRawDataFrom(source.transform.colorTransform._rawData);

		// need correcting a root because maybe flipped around Z
		const zFlip = source.transform.matrix3D._rawData[10];

		if (matrix) {

			const m = root.transform.matrix3D;
			m.identity();

			m._rawData[0] = matrix.a;
			m._rawData[1] = -matrix.b;
			m._rawData[4] = matrix.c;
			m._rawData[5] = -matrix.d;
			m._rawData[10] = zFlip;
			m._rawData[12] = matrix.tx;
			m._rawData[13] = this.rect.height - matrix.ty;

			root.transform.invalidateComponents();

		} else {
			root.transform.rotateTo(0,0,0);
			root.transform.scaleTo(1, -1, 1);
			root.transform.moveTo(0, this.rect.height,0);
		}
		//root.transform.colorTransform = colorTransform;

		renderer.view.target = this;
		renderer.view.projection.scale = 1000 / this.rect.height;

		renderer.view.x = 0;
		renderer.view.y = 0;
		renderer.view.width = this.width;
		renderer.view.height = this.height;

		root.transform.colorTransform = colorTransform;
		root.removeChildren(0, root.numChildren);
		root.addChild(source);

		source.transform.matrix3D = null;
		source.visible = true;
		source.transform.colorTransform = null;

		blendMode = blendMode || (<string>source.blendMode) || '';
		root.blendMode = this._mapBlendMode(blendMode);

		//save snapshot if unlocked
		//if (!this._locked)
		//SceneImage2D.scene.view.target=this;
		//SceneImage2D.scene.renderer.disableClear = !this._locked;

		//render
		renderer.render();

		source.visible = oldVisible;
		//source.transform.matrix3D = TMP_MATRIX3D;

		sTrans.moveTo(TMP_RAW[0 + 0], TMP_RAW[0 + 1], TMP_RAW[0 + 2]);
		sTrans.rotateTo(TMP_RAW[4 + 0], TMP_RAW[4 + 1], TMP_RAW[4 + 2]);
		sTrans.scaleTo(TMP_RAW[8 + 0], TMP_RAW[8 + 1], TMP_RAW[8 + 2]);

		source.transform.colorTransform = TMP_COLOR_MATRIX;

		if (oldParent) {
			if (oldParent.adapter && oldParent.adapter != oldParent &&
				source.adapter && source.adapter != source && (<any>oldParent.adapter).addChildAt) {
				(<any>oldParent.adapter).addChildAt(source.adapter, index);

			} else {
				oldParent.addChildAtDepth(source, depth, true);
			}

		}

		//SceneImage2D.scene.dispose();
		//SceneImage2D.scene=null;

	}
}

Stage.registerAbstraction(_Stage_BitmapImage2D, SceneImage2D);