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
	ContextGLBlendFactor,
	ContextGLTriangleFace,
	ImageUtils
} from '@awayjs/stage';

import { DefaultRenderer, RenderGroup, RendererType, Style } from '@awayjs/renderer';

import { DisplayObject } from '../display/DisplayObject';
import { DisplayObjectContainer } from '../display/DisplayObjectContainer';

import { BasicPartition, ContainerNode, NodePool, View } from '@awayjs/view';
import { MaterialBase, MethodMaterial } from '@awayjs/materials';
import { Billboard } from '../display/Billboard';
import { Settings } from '../Settings';

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
		fillColor: number = 0xffffffff,
		powerOfTwo: boolean = true, stage: Stage = null, msaa = false) {

		if (width > ImageUtils.MAX_SIZE || height > ImageUtils.MAX_SIZE) {
			throw `Try to create image greater that ${ImageUtils.MAX_SIZE}, ${width}x${height}`;
		}

		let index = -1;
		for (let i = 0; i < this._pool.length; i++) {
			const e = this._pool[i];

			if ((!stage || e._stage === stage)
				&& e.width === width
				&& e.height === height
				&& e.transparent === transparent
				&& e.powerOfTwo === powerOfTwo
				&& (msaa === e.canUseMSAAInternaly)
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

	public static tryStoreImage(image: SceneImage2D, force = false): boolean {
		if (this._pool.length <= this.MAX_POOL_SIZE || force) {
			this._pool.push(image);
			return true;
		}

		return false;
	}

	private static TMP_STEP = [128, 256, 512, 1024, 2048, 4096];
	private static getTemp(width: number, height: number, stage: Stage, msaa = false) {

		const max = Math.max(width, height);

		let size = this.TMP_STEP[0];

		for (let i = 0; i < this.TMP_STEP.length; i++) {
			if (max <= this.TMP_STEP[i]) {
				size = this.TMP_STEP[i];
				break;
			}
		}

		return this.getImage(size, size, true, null, true, stage, msaa);
	}

	private static _renderer: DefaultRenderer;
	private static _billboardRenderer: DefaultRenderer;
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

		//create the view
		SceneImage2D._root = new DisplayObjectContainer();
		SceneImage2D._rootNode = NodePool.getRootNode(SceneImage2D._root, BasicPartition);
		SceneImage2D._renderer =
			<DefaultRenderer> RenderGroup.getInstance(
				new View(projection, this._stage, null, null, null, true),
				RendererType.DEFAULT
			).getRenderer(SceneImage2D._rootNode.partition);

		//SceneImage2D._root.partition = SceneImage2D._renderer.partition;

		//SceneImage2D._renderer.antiAlias = Settings.ALLOW_FORCE_MSAA;
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
			new View(projection,this._stage, null, null, null, true), RendererType.DEFAULT)
			.getRenderer(NodePool.getRootNode(SceneImage2D._billboardRoot, BasicPartition).partition);

		//SceneImage2D._billboardRoot.partition = SceneImage2D._billboardRenderer.partition;

		//SceneImage2D._renderer.antiAlias = Settings.ALLOW_FORCE_MSAA;
		//setup the projection
		SceneImage2D._billboardRenderer.disableClear = true;
		SceneImage2D._billboardRenderer.view.backgroundAlpha = 0;
		SceneImage2D._billboardRenderer.view.projection = projection;
		SceneImage2D._billboardRenderer.view.projection.transform = new Transform();
		SceneImage2D._billboardRenderer.view.projection.transform.moveTo(0, 0, -1000);
		SceneImage2D._billboardRenderer.view.projection.transform.lookAt(new Vector3D());

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
		this.dropAllReferences();
		this.unmarkToUnload();
		this.unuseWeakRef();

		// drop buffer, because is big
		this._data = null;
		this._locked = false;

		if (!this.wasUpload || !SceneImage2D.tryStoreImage(this, false)) {
			super.dispose();
		}

		//todo
	}

	public unload() {
		// query asynce unload
		const t = this.syncData(true);

		// strict quard
		if (typeof t !== 'boolean') {
			t.then(() => super.unload());
			return;
		}

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

		const argb = ColorUtils.float32ColorToARGB(color);
		const alpha = this._transparent ? argb[0] / 255 : 1;
		const isCrop = rect !== this._rect && !this._rect.equals(rect);

		this._stage.setRenderTarget(this, true);
		this._stage.setScissor(rect);

		// we shure that color is fully filled when there are not any crops
		this._lastUsedFill = isCrop ? null : color;

		this._stage.clear(
			(argb[1] / 0xff) * alpha | 0,
			(argb[2] / 0xff) * alpha | 0,
			(argb[3] / 0xff) * alpha | 0,
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

		this._lastUsedFill = null;
		this.dropAllReferences();
		this.unmarkToUnload();

		this._stage.context.setCulling(ContextGLTriangleFace.NONE);
		this._stage.context.setBlendFactors(ContextGLBlendFactor.ONE, ContextGLBlendFactor.ONE_MINUS_SOURCE_ALPHA);

		// need drop alpha from source when target is not has alpha
		mergeAlpha = this.transparent !== source.transparent || mergeAlpha;

		if (this._initalFillColor !== null) {
			this.fillRect(this._rect, this._initalFillColor);
			this._initalFillColor = null;
		}

		if (source !== this) {
			this._stage.copyPixels(source, this, sourceRect, destPoint, alphaBitmapData, alphaPoint, mergeAlpha);
		} else {
			const tmp = SceneImage2D.getTemp(source.width, source.height, this._stage, false);

			if (tmp._antialiasQuality > 0) {
				throw 'Using MSAA texture for copy pixel!';
			}

			TMP_POINT.setTo(0,0);
			TMP_RECT.setTo(0,0, sourceRect.width, sourceRect.height);

			this._stage.copyPixels(source, tmp, sourceRect, TMP_POINT, alphaBitmapData, alphaPoint, false);
			this._stage.copyPixels(tmp, this, TMP_RECT, destPoint, alphaBitmapData, alphaPoint, mergeAlpha);
			// push temp back

			SceneImage2D.tryStoreImage(tmp, true);
		}

		this._imageDataDirty = true;
	}

	public threshold(
		source: BitmapImage2D, sourceRect: Rectangle, destPoint: Point,
		operation: string, threshold: number, color: number, mask: number, copySource: boolean): void {

		this._lastUsedFill = null;
		this.dropAllReferences();
		this.unmarkToUnload();

		this._stage.context.setCulling(ContextGLTriangleFace.NONE);
		this._stage.context.setBlendFactors(ContextGLBlendFactor.ONE, ContextGLBlendFactor.ZERO);

		const renderToSelf = source === this;

		if (!renderToSelf) {
			this._stage.threshold(source, this, sourceRect, destPoint, operation, threshold, color, mask, copySource);
		} else {
			const tmp = SceneImage2D.getTemp(source.width, source.height, this._stage);

			TMP_POINT.setTo(0,0);
			TMP_RECT.setTo(0,0, sourceRect.width, sourceRect.height);

			this._stage.threshold(source, tmp, sourceRect, TMP_POINT, operation, threshold, color, mask, copySource);
			this._stage.copyPixels(tmp, this, TMP_RECT, destPoint, null, null, false);

			// push temp back
			SceneImage2D.tryStoreImage(tmp, true);
		}

		this._imageDataDirty = true;
	}

	public colorTransform(rect: Rectangle, colorTransform: ColorTransform): void {

		this._lastUsedFill = null;
		this.dropAllReferences();
		this.unmarkToUnload();

		this._stage.context.setCulling(ContextGLTriangleFace.NONE);
		this._stage.context.setBlendFactors(ContextGLBlendFactor.ONE, ContextGLBlendFactor.ZERO);

		const tmp = SceneImage2D.getTemp(rect.x + rect.width, rect.y + rect.height, this._stage);

		this._stage.colorTransform(this, tmp, rect, colorTransform);
		this._stage.copyPixels(tmp, this, rect, new Point(0,0), null, null, false);

		this._imageDataDirty = true;

		SceneImage2D.tryStoreImage(tmp, true);
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

		if (this._initalFillColor !== null) {
			this.fillRect(this._rect, this._initalFillColor);
			this._initalFillColor = null;
		}

		const renderer = SceneImage2D._billboardRenderer;
		const root = SceneImage2D._billboardRoot;
		const billboard = SceneImage2D._billboard;

		billboard.sampler.smooth = smoothing;

		renderer.disableClear = true;
		renderer.view.target = this;
		renderer.view.projection.scale = 1000 / this.rect.height;

		billboard.material.style.image = source;
		billboard.material.blendMode = this._mapBlendMode(blendMode);
		(<MaterialBase> billboard.material).useColorTransform = !!colorTransform;

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

	private fastScaledNativeCopy(
		from: SceneImage2D, to: SceneImage2D, sourceRect: Rectangle = null) {

		const context = <ContextWebGL> this._stage.context;
		const tex = context._texContext;

		this._stage.setScissor(null);
		this._stage.setRenderTarget(from, false);

		const target = to.getAbstraction<_Stage_BitmapImage2D>(this._stage).getTexture();

		tex.unsafeCopyToTexture(<any>target, sourceRect || to._rect, TMP_POINT, true);
	}

	private _drawAsDisplay(
		source: DisplayObject, matrix?: Matrix, colorTransform?: ColorTransform,
		blendMode?: string, clipRect?: Rectangle, smoothing?: boolean) {

		if (!SceneImage2D._renderer)
			this.createRenderer();

		// if need use MSAA, we create temporary image and draw to it
		const internal = this.canUseMSAAInternaly;
		const nativeMSAA = (
			this._stage.context.glVersion === 2 && // can be used because a webgl2
			Settings.ALLOW_FORCE_MSAA > 1 && // because a quality is more that 1
			!internal); // and not internal
		const emulatedMSAA = (
			!nativeMSAA && // doesn't suport real MSAA
			Settings.ALLOW_APPROXIMATION > 1 // allowed to use approximation
			&& !internal); // and not internal MSAA

		let target: SceneImage2D = this;
		let scaleRatio = 1;

		// lazy filling
		if (!nativeMSAA && !emulatedMSAA  && this._initalFillColor !== null) {
			this.fillRect(this._rect, this._initalFillColor);
			this._initalFillColor = null;
		}

		if (nativeMSAA) {
			target = SceneImage2D.getTemp(this.width, this.height, this._stage, true);

			if (this._lastUsedFill !== null) {
				target.fillRect(target._rect, this._lastUsedFill);
			} else {
				// copy from source to tmp
				TMP_POINT.setTo(0,0);
				// we cant use mergeAlpha = false, becasue RT is MSAA
				// MSAA texture is immutable
				//target.fillRect(target._rect, 0x0);
				this._stage.copyPixels(this, target, this._rect, TMP_POINT, null, null, true);
			}

		} else if (emulatedMSAA) {

			scaleRatio = Settings.ALLOW_APPROXIMATION;
			target = SceneImage2D.getTemp(
				this.width * scaleRatio,
				this.height * scaleRatio, this._stage, false);

			if (this._lastUsedFill !== null) {
				target.fillRect(target._rect, this._lastUsedFill);
			} else {
				// copy from source to tmp
				// BUT FOR THIS REQUIRED THAT SAMPLER IS LINEAR
				this.fastScaledNativeCopy(this, target, this._rect);
			}
		}

		const root = SceneImage2D._root;
		const rootNode = SceneImage2D._rootNode;
		const renderer = SceneImage2D._renderer;

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
			m._rawData[13] = this._rect.height - matrix.ty;

			root.transform.invalidateComponents();

		} else {
			root.transform.rotateTo(0,0,0);
			root.transform.scaleTo(1, -1, 1);
			root.transform.moveTo(0, this._rect.height,0);
		}

		renderer.antiAlias = (internal ? this.antialiasQuality :  target._antialiasQuality) || 0;
		renderer.view.target = target;

		renderer.view.projection.scale = 1000 / this._rect.height;

		if (emulatedMSAA) {

			const thisRatio = (this._rect.width / this._rect.height);
			const targetRatio = 1; // TMP should be quad;

			// because we render a rect with ratio !=1 in rect with ratio === 1, apply needed
			renderer.view.projection.ratio = thisRatio / targetRatio;

			renderer.view.x = 0;
			renderer.view.y = 0;
			renderer.view.width = target.width;
			renderer.view.height = target.height;
		} else {

			// shift view, because target can be more
			renderer.view.projection.ratio = (this._rect.width / this._rect.height);
			renderer.view.x = -(target.width - this.width);
			renderer.view.y = -(target.height - this.height);
			renderer.view.width = this.width;
			renderer.view.height = this.height;
		}

		var sourceNode: ContainerNode = rootNode.addChildAt(source, 0);
		sourceNode.transformDisabled = true;

		root.transform.colorTransform = colorTransform;

		blendMode = blendMode || (<string>source.blendMode) || '';
		root.blendMode = this._mapBlendMode(blendMode);

		//save snapshot if unlocked
		//if (!this._locked)
		//SceneImage2D.scene.view.target=this;
		//SceneImage2D.scene.renderer.disableClear = !this._locked;

		//render
		renderer.render();

		renderer.antiAlias = 0;

		rootNode.removeChildAt(0);
		if (nativeMSAA) {
			// becasue we copy MSAA into no msaa, it should passed as BLIT
			this._stage.copyPixels(target, this,  this._rect, TMP_POINT, null, null, false);

			// clean before push
			// should works without this, but i don't know why bugged
			target.fillRect(target._rect, 0x0);

			SceneImage2D.tryStoreImage(target, true);

		} else if (emulatedMSAA) {

			// copy with downsale
			this.fastScaledNativeCopy(target, this, target._rect);

			// clean before push
			// should works without this, but i don't know why bugged
			target.fillRect(target._rect, 0x0);
			SceneImage2D.tryStoreImage(target, true);
		}

		//SceneImage2D.scene.dispose();
		//SceneImage2D.scene=null;

	}
}

Stage.registerAbstraction(_Stage_BitmapImage2D, SceneImage2D);