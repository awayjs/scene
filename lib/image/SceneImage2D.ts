
import { ContainerNode, View } from '@awayjs/view';
import { MaterialBase, MethodMaterial } from '@awayjs/materials';
import { DisplayObjectContainer } from '../display/DisplayObjectContainer';
import { DisplayObject } from '../display/DisplayObject';
import { Billboard } from '../display/Billboard';
import { Settings } from '../Settings';

import {
	ColorTransform,
	Matrix,
	Rectangle,
	Point,
	PerspectiveProjection,
	CoordinateSystem,
	Vector3D,
	Transform,
	ColorUtils
} from '@awayjs/core';

import { Stage,
	BitmapImage2D,
	_Stage_BitmapImage2D,
	BlendMode,
	ContextWebGL,
	Image2D
} from '@awayjs/stage';

import { DefaultRenderer, RenderGroup, Style } from '@awayjs/renderer';

// empty matrix for transform reset
const TMP_POINT = new Point(0,0);

/**
 *
 */
export class SceneImage2D extends BitmapImage2D {
	public static assetType: string = '[image SceneImage2D]';

	public static getImage(
		width: number, height: number, transparent: boolean = true,
		fillColor: number = 0xffffffff,
		powerOfTwo: boolean = true, stage: Stage = null, msaa = false
	) {
		const result = new SceneImage2D(
			width,
			height,
			transparent,
			fillColor,
			powerOfTwo,
			stage
		);

		if (!msaa) {
			result._msaaNeedDrop = true;
			result._antialiasQuality = 0;
		} else {
			result._enforceMSAASupport = true;
		}

		return result;
	}

	public static tryStoreImage(image: Image2D, stage: Stage): void {
		stage.filterManager.pushTemp(image);
	}

	private static getTemp(width: number, height: number, stage: Stage, msaa = false) {
		const image = stage.filterManager.popTemp(width, height, msaa && Settings.ALLOW_FORCE_MSAA > 1);

		image.antialiasQuality = msaa ? Settings.ALLOW_FORCE_MSAA : 0;
		return image;
	}

	private static _renderer: DefaultRenderer;
	private static _billboardRenderer: DefaultRenderer;
	private static _view: View;
	private static _billboardView: View;
	private static _root: DisplayObjectContainer;
	private static _rootNode: ContainerNode;
	private static _billboardRoot: DisplayObjectContainer;
	private static _billboard: Billboard;

	private _imageDataDirty: boolean;

	private _asyncRead: Promise<boolean>;

	private _initalFillColor: number = null;

	private _lastUsedFill: number = null;

	private _internalSync: boolean = false;

	protected _msaaNeedDrop: boolean = false;

	protected _enforceMSAASupport: boolean = false;

	protected _dropMSAA() {
		if (this._msaaNeedDrop || !this.canUseMSAAInternaly) {
			return;
		}

		this._enforceMSAASupport = false;
		this._msaaNeedDrop = true;

		// force dispose texture and buffers
		// MSAA not stored in pool
		if (this.wasUpload) {
			// super unload not call sync, we call it
			super.unload();
		}

		console.debug(
			'[SceneImage2D Experemental] Drop MSAA support because a setPixel* operation called after upload.',
			this.id
		);
	}

	public get canUseMSAAInternaly () {
		if (this._enforceMSAASupport) {
			return true;
		}

		let minW = Settings.MSAA_MINIMAL_IMAGE_SIZE;
		let minH = Settings.MSAA_MINIMAL_IMAGE_SIZE;

		if (this._stage) {
			minH = Math.min(this._stage.height, minH);
			minW = Math.min(this._stage.width, minW);
		}

		return (
			this.width >= minW &&
			this.height >= minH &&
			!this._msaaNeedDrop
		);
	}

	/*private*/ _antialiasQuality: number = Settings.ALLOW_FORCE_MSAA;
	public get antialiasQuality() {
		return this.canUseMSAAInternaly ? this._antialiasQuality : 0;
	}

	protected syncData(async = false): boolean | Promise<boolean> {

		if (async && this._asyncRead) {
			return this._asyncRead;
		}

		if (!async && this._asyncRead) {
			throw '[SceneImage2D] Synced read not allowed while async read is requested!';
		}

		this.applySymbol();

		// update data from pixels from GPU
		if (!this._imageDataDirty) {
			return async ? Promise.resolve(false) : false;
		}

		const context = <ContextWebGL> this._stage.context;

		this._stage.setRenderTarget(this, false);

		// when we call syncData, we already loose other data
		// not require apply symbol etc, because it already should be applied
		if (!this._data) {
			this._data = new Uint8ClampedArray(this.width * this.height * 4);
		}

		// mark that this internal call, avoid reqursion loop
		this._internalSync = true;
		this._asyncRead = context.drawToBitmapImage2D(this, false, async);
		this._internalSync = false;

		this._stage.setRenderTarget(null);

		if (!async) {
			this._imageDataDirty = false;
			// we store pixel buffer already as PMA.
			// we should prevent unpack what already is PMA
			this._unpackPMA = false;
			return true;
		}

		return this._asyncRead.then((_status: boolean) => {
			this._imageDataDirty = false;
			this._unpackPMA = false;
			this._asyncRead = null;

			return true;
		});
	}

	/* overide internal */getDataInternal (constructEmpty = true, skipSync = false) {

		// if sync called, check that this is requried
		if (!skipSync && this._imageDataDirty && !this._internalSync) {
			// sync data already should fill _data
			this.syncData(false);

			return this._data;
		}

		if (this._initalFillColor === null) {
			return super.getDataInternal(constructEmpty, true);
		}

		// disable empty buffer filling
		// and check that buffer is empyt (has now symbol or alpha)
		const data = super.getDataInternal(false, true);

		// if it empty, fill with initlal value
		if (!data) {

			// fill rect constuct buffer inside
			super.fillRect(this.rect, this._initalFillColor);
			this._initalFillColor = null;

			return this._data;
		}

		return data;
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

		super(width, height, transparent, null, powerOfTwo, stage);

		this._initalFillColor = fillColor;
		this._lastUsedFill = fillColor;
	}

	private createRenderer() {
		//create the projection
		const projection = new PerspectiveProjection();
		projection.coordinateSystem = CoordinateSystem.RIGHT_HANDED;
		projection.originX = -1;
		projection.originY = 1;
		projection.transform = new Transform();
		projection.transform.scaleTo(1, -1, 1);
		projection.transform.moveTo(0, 0, -1000);

		//create the view
		SceneImage2D._view = new View(projection, this._stage);
		SceneImage2D._root = new DisplayObjectContainer();
		SceneImage2D._rootNode = SceneImage2D._view.getNode(SceneImage2D._root);
		SceneImage2D._renderer = <DefaultRenderer> RenderGroup
			.getInstance(DefaultRenderer)
			.getRenderer(SceneImage2D._rootNode.partition);

		//set the view properties
		SceneImage2D._view.backgroundAlpha = 0;
		SceneImage2D._view.backgroundColor = 0x0;

		//set the renderer properties
		SceneImage2D._renderer.disableClear = true;
		SceneImage2D._renderer.renderableSorter = null;//new RenderableSort2D();
		//SceneImage2D._renderer.antiAlias = Settings.ALLOW_FORCE_MSAA;
	}

	private createBillboardRenderer(): void {
		//create the projection
		const projection = new PerspectiveProjection();
		projection.coordinateSystem = CoordinateSystem.RIGHT_HANDED;
		projection.originX = -1;
		projection.originY = 1;
		projection.transform = new Transform();
		projection.transform.moveTo(0, 0, -1000);
		projection.transform.lookAt(new Vector3D());

		//create the view
		SceneImage2D._billboardView = new View(projection, this._stage);
		SceneImage2D._billboardRoot = new DisplayObjectContainer();
		SceneImage2D._billboardRenderer = <DefaultRenderer> RenderGroup
			.getInstance(DefaultRenderer)
			.getRenderer(SceneImage2D._billboardView.getNode(SceneImage2D._billboardRoot).partition);

		//SceneImage2D._billboardRoot.partition = SceneImage2D._billboardRenderer.partition;

		//SceneImage2D._renderer.antiAlias = Settings.ALLOW_FORCE_MSAA;
		//set the view properties
		SceneImage2D._billboardView.backgroundAlpha = 0;
		SceneImage2D._billboardView.backgroundColor = 0x0;

		//set the renderer properties
		SceneImage2D._billboardRenderer.disableClear = true;
		SceneImage2D._billboardRenderer.renderableSorter = null;//new RenderableSort2D();

		const mat: MethodMaterial = new MethodMaterial(new BitmapImage2D(128, 128, true, 0x0));
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
		this._clearFromDispose = true;

		this.dropAllReferences();
		this.unmarkToUnload();
		this.unuseWeakRef();

		// drop buffer, because is big
		this._data = null;
		this._locked = false;
		super.dispose();

		this._clearFromDispose = false;
	}

	public unload() {
		// query async unload
		if (this._imageDataDirty) {
			const t = this.syncData(true);

			// strict quard
			if (typeof t !== 'boolean') {
				t.then(() => super.unload());
				return;
			}
		}

		super.unload();
	}

	protected deepClone(from: BitmapImage2D) {
		this.copyPixels(from, this._rect, new Point(0,0));
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

		const argb = ColorUtils.float32ColorToARGB(color);
		const alpha = this._transparent ? argb[0] / 255 : 1;
		const isCrop = rect !== this._rect && !this._rect.equals(rect);

		this._stage.setRenderTarget(this, true, 0, 0, true);
		this._stage.setScissor(rect);

		// we shure that color is fully filled when there are not any crops
		this._lastUsedFill = isCrop ? null : color;

		this._stage.clear(
			(argb[1] / 0xff) * alpha,
			(argb[2] / 0xff) * alpha,
			(argb[3] / 0xff) * alpha,
			alpha
		);

		this._stage.setScissor(null);
		this._imageDataDirty = true;
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
	 * @param source The input bitmap image from which to copy pixels.
	 *                         The source image can be a different BitmapImage2D
	 *                         instance, or it can refer to the current
	 *                         BitmapImage2D instance.
	 * @param sourceRect       A rectangle that defines the area of the source
	 *                         image to use as input.
	 * @param destPoint        The destination point that represents the
	 *                         upper-left corner of the rectangular area where
	 *                         the new pixels are placed.
	 * @param alphaBitmapData  A secondary, alpha BitmapImage2D object source.
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

		this._lastUsedFill = null;
		this.dropAllReferences();
		this.unmarkToUnload();

		// need drop alpha from source when target is not has alpha
		mergeAlpha = this.transparent !== source.transparent || mergeAlpha;

		// CPU based copy, not require run GPU based copy
		// block is equal, one of image not uploaded yet
		// and source image no require SYNC
		if (!(<SceneImage2D>source)._imageDataDirty &&
			sourceRect.equals(this._rect) &&
			this._rect.equals(source.rect) &&
			!mergeAlpha && (!this.wasUpload || !source.wasUpload)
		) {
			const data = source.getDataInternal(true);

			// inline, instead of setPixels, because it use a lot of checks
			if (this._data) {
				this._data.set(data);
			} else {
				this._data = data.slice();
			}

			// we should sync this, because we can apply PMA twice, that not needed for us
			this._unpackPMA = (<any> source)._unpackPMA;
			// we should reset initial color, because not require fill it after copyPixel
			this._initalFillColor = null;
			this._imageDataDirty = false;
			this.invalidateGPU();
			return;
		}

		if (source.width * source.height <= Settings.CPU_COPY_PIXELS_COUNT && !mergeAlpha) {
			// todo Not implemented yet, need to implement and check performance change
			// 	i think that increase some small operation performance,
			// 	because copy by GPU required upload array to VRAM,
			// 	and games that use set/get pixels and copyPixels only for math process not required use GPU copy
		}

		if (this._initalFillColor !== null) {
			this.fillRect(this._rect, this._initalFillColor);
			this._initalFillColor = null;
		}

		let compositeSource: Image2D = source;

		// merge alpha with source
		if (alphaBitmapData) {
			compositeSource = this._stage.filterManager.popTemp(source.width, source.height);

			//this._stage.filterManager.copyPixels(source, compositeSource, source.rect, source.rect.topLeft);
			this._stage.filterManager.copyPixels(
				alphaBitmapData,
				compositeSource,
				new Rectangle(
					alphaPoint.x,
					alphaPoint.y,
					sourceRect.width,
					sourceRect.height
				),
				new Point(0,0)
			);

			this._stage.filterManager.copyPixels(
				source,
				compositeSource,
				source.rect,
				new Point(0,0),
				true,
				'alpha_back'
			);
		}

		this._stage.filterManager.copyPixels(
			compositeSource,
			this,
			sourceRect,
			destPoint,
			mergeAlpha
		);

		if (alphaBitmapData) {
			this._stage.filterManager.pushTemp(compositeSource);
		}

		this._imageDataDirty = true;
	}

	public threshold(
		source: BitmapImage2D,
		sourceRect: Rectangle,
		destPoint: Point,
		operation: string,
		threshold: number,
		color: number,
		mask: number,
		copySource: boolean
	): void {

		this._lastUsedFill = null;
		this.dropAllReferences();
		this.unmarkToUnload();

		this._stage.threshold(source, this, sourceRect, destPoint, operation, threshold, color, mask, copySource);
		this._imageDataDirty = true;
	}

	public applyFilter (source: BitmapImage2D, sourceRect: Rectangle, destPoint: Point, filter: any): boolean {
		if (!Settings.USE_UNSAFE_FILTERS || !filter || !filter.filterName) {
			return false;
		}

		this.dropAllReferences(false);

		const result = this._stage.filterManager.applyFilter (
			source,
			this,
			sourceRect,
			destPoint,
			filter.filterName, filter);

		this._imageDataDirty = result;
		return result;
	}

	public colorTransform(rect: Rectangle, colorTransform: ColorTransform): void {
		this.dropAllReferences();
		this.unmarkToUnload();

		this._lastUsedFill = null;

		this._stage.colorTransform(this, this, rect, colorTransform);

		this._imageDataDirty = true;
	}

	public setPixel(x: number, y: number, color: number) {
		// we can't upload buffer in MSAA texture after creating - only render it and get
		if (this.canUseMSAAInternaly) {
			this._dropMSAA();
		}

		super.setPixel(x, y, color);
	}

	public setPixel32(x: number, y: number, color: number) {
		// we can't upload buffer in MSAA texture after creating - only render it and get
		if (this.canUseMSAAInternaly) {
			this._dropMSAA();
		}

		super.setPixel32(x, y, color);
	}

	public setPixels(rect: Rectangle, buffer: Uint8ClampedArray) {
		// we can't upload buffer in MSAA texture after creating - only render it and get
		if (this.wasUpload && this.canUseMSAAInternaly) {
			this._dropMSAA();
		}

		super.setPixels(rect, buffer);
	}

	private _clearFromDispose = false;
	public clear() {
		// we call clear in parent class from dispose, call direct
		if (this._clearFromDispose) {
			super.clear();
			return;
		}

		// clear should drop abstraction, but we can't doing this if unloaded
		const t = this.syncData(true);

		// not require unload, we already doings this
		this.unmarkToUnload();
		this.lastUsedTime = -1;

		if (typeof t === 'boolean') {
			this.wasUpload = false;
			super.clear();
			return;
		}

		t.then(() => {
			this.wasUpload = false;
			super.clear();
		});
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

		this._lastUsedFill = null;
		this._imageDataDirty = true;
		this.invalidate();
	}

	private static _mapSupportedBlendMode(blendMode: string = ''): string {
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
		blendMode?: string, _clipRect?: Rectangle, smoothing?: boolean
	) {

		if (!SceneImage2D._billboardRenderer) {
			this.createBillboardRenderer();
		}

		if (this._initalFillColor !== null) {
			this.fillRect(this._rect, this._initalFillColor);
			this._initalFillColor = null;
		}

		const stage = this._stage;
		const mappedBlend = SceneImage2D._mapSupportedBlendMode(blendMode);
		const supportNativeBlend = !blendMode || mappedBlend !== BlendMode.LAYER || blendMode == BlendMode.LAYER;
		const useTmp = (!supportNativeBlend || this === source);
		const target = useTmp ?
			stage.filterManager.popTemp(this.width, this.height, false)
			: this;

		const renderer = SceneImage2D._billboardRenderer;
		const root = SceneImage2D._billboardRoot;
		const billboard = SceneImage2D._billboard;

		billboard.sampler.smooth = smoothing;

		renderer.disableClear = !useTmp;
		renderer.view.target = target;
		renderer.view.projection.scale = 1000 / target.height;

		billboard.material.style.image = source;

		// not all blend modes can be used for rendering
		billboard.material.blendMode = !useTmp ? SceneImage2D._mapSupportedBlendMode(blendMode) : BlendMode.LAYER;

		(<MaterialBase> billboard.material).useColorTransform = !!colorTransform;

		if (matrix) {
			const m = root.transform.matrix3D;

			m.identity();

			m._rawData[0] = matrix.a;
			m._rawData[1] = -matrix.b;
			m._rawData[4] = matrix.c;
			m._rawData[5] = -matrix.d;
			m._rawData[12] = matrix.tx;
			m._rawData[13] = target.height - matrix.ty;

			root.transform.invalidateComponents();
		} else {

			root.transform.rotateTo(0,0,0);
			root.transform.scaleTo(1, -1, 1);
			root.transform.moveTo(0, target.height,0);
		}

		root.transform.colorTransform = colorTransform;

		//render
		renderer.render();

		//
		if (useTmp) {
			stage.filterManager.copyPixels(
				target,
				this,
				this.rect,
				TMP_POINT,
				true,
				blendMode
			);

			stage.filterManager.pushTemp(target);
		}

	}

	private _drawAsDisplay(
		source: DisplayObject, matrix?: Matrix, colorTransform?: ColorTransform,
		blendMode: string = '', _clipRect?: Rectangle, _smoothing?: boolean
	) {
		// default global blend mode
		blendMode = blendMode || BlendMode.LAYER;

		if (!SceneImage2D._renderer) {
			this.createRenderer();
		}

		const root = SceneImage2D._root;
		const rootNode = SceneImage2D._rootNode;
		const renderer = SceneImage2D._renderer;

		// when we should use MSAA, we will create temporary image and draw to it
		const internal = this.canUseMSAAInternaly;
		const nativeMSAA = (
			!source.isAsset(Billboard) &&
			this._stage.context.glVersion === 2 && // can be used because a webgl2
			Settings.ALLOW_FORCE_MSAA > 1 && // because a quality is more that 1
			!internal); // and not internal

		// target image for rendering.
		let target: Image2D = this;

		// we should run compositor when blendMode !== LAYER (default)
		// or when we use MSAA + fill is not flat.
		const useBlend = blendMode !== BlendMode.LAYER || this._lastUsedFill === null;

		const useTemp = useBlend || nativeMSAA;

		// lazy filling
		// we require fill image with initial color, because we not doing this immediate
		// and when blend is required, because we should blend with vald color
		if ((!nativeMSAA || useBlend) && this._initalFillColor !== null) {
			this.fillRect(this._rect, this._initalFillColor);
			this._initalFillColor = null;
		}

		if (useTemp) {
			target = SceneImage2D.getTemp(this.width, this.height, this._stage, nativeMSAA);

			// because target image is stupid filled - it not require merging
			// BUT when blend is required - we shpuld skip color clear and use empty TMP
			if (!useBlend && this._lastUsedFill !== null) {
				// bitmap was filled plain, go clear TMP to this color too
				renderer.disableClear = false;
				renderer.view.backgroundColor = this._lastUsedFill & 0xffffff;
				renderer.view.backgroundAlpha = this._transparent ? (this._lastUsedFill >>> 24 & 0xff) / 0xff : 1;
			} else {
				// we clear TMP and render to it, prepare to composing
				renderer.disableClear = false;
				renderer.view.backgroundColor = 0x0;
				renderer.view.backgroundAlpha = 0;

				// copy from source to tmp
				// TMP_POINT.setTo(0,0);
				// this._stage.copyPixels(this, target, this._rect, TMP_POINT, null, null, false);
			}
		}

		const transform = renderer.view.projection.transform;
		const mat3d = transform.matrix3D;
		mat3d.identity();

		if (matrix) {
			const raw = mat3d._rawData;
			raw[0] = matrix.a;
			raw[1] = matrix.b;
			raw[4] = matrix.c;
			raw[5] = matrix.d;
			raw[10] = 1;
			raw[12] = matrix.tx;
			raw[13] = matrix.ty;
		}

		// todo By this line we flip normals, and cull will be broken
		// 	NEED FIX THIS ASAP, or flip cull state
		mat3d.appendScale(1, -1, 1);
		mat3d.appendTranslation(0, this._rect.height, 1000);

		mat3d.invert();
		transform.matrix3D = mat3d;

		renderer.antiAlias = (internal ? this.antialiasQuality :  (<any>target).antialiasQuality) || 0;

		renderer.view.target = target;
		renderer.view.projection.scale = 1000 / this._rect.height;

		// shift view, because target can be more
		renderer.view.projection.ratio = (this._rect.width / this._rect.height);
		renderer.view.x = -(target.width - this.width);
		renderer.view.y = -(target.height - this.height);
		renderer.view.width = this.width;
		renderer.view.height = this.height;

		const sourceNode: ContainerNode = rootNode.addChildAt(source, 0);
		const transformDisabled = sourceNode.transformDisabled;

		sourceNode.transformDisabled = true;
		// color transform should be enabled!
		sourceNode.colorTransformDisabled = false;

		root.transform.colorTransform = colorTransform;
		// anyway we not support this =))
		root.blendMode = SceneImage2D._mapSupportedBlendMode(blendMode);

		//save snapshot if unlocked
		//if (!this._locked)
		//SceneImage2D.scene.view.target=this;
		//SceneImage2D.scene.renderer.disableClear = !this._locked;

		renderer.render();

		// reset render to default value
		renderer.antiAlias = 0;
		renderer.disableClear = true;

		rootNode.removeChildAt(0);

		sourceNode.transformDisabled = transformDisabled;

		if (useTemp) {
			// because we copy MSAA into no msaa, it should passed as BLIT
			this._stage.filterManager.copyPixels(
				target,
				this,
				this._rect,
				TMP_POINT,
				useBlend,
				blendMode // apply blend mode if this needed.
			);

			SceneImage2D.tryStoreImage(target, this._stage);
		}
	}

	public reset() {}

	public clone(): SceneImage2D {
		const image = SceneImage2D.getImage(
			this.width,
			this.height,
			this.transparent,
			null,
			false,
			this._stage,
			false
		);

		image.deepClone(this);
		return  image;
	}
}

Stage.registerAbstraction(_Stage_BitmapImage2D, SceneImage2D);