import { FNTGeneratorBase } from './FNTGeneratrorBase';
import { Font } from './Font';
import { BitmapImage2D, Stage } from '@awayjs/stage';
import { FNTGenerator } from './FNTGenerator';
import { Rectangle } from '@awayjs/core';
import { Shape, GraphicsPath, GraphicsPathCommand } from '@awayjs/graphics';
import { TesselatedFontTable } from './TesselatedFontTable';
import { TesselatedFontChar } from './TesselatedFontChar';

const addMaxPoint = (rect: Rectangle, x: number, y: number): Rectangle => {
	if (x > rect.right)
		rect.width = x - rect.x;
	if (x < rect.x)
		rect.x = x;

	if (y > rect.bottom)
		rect.height = y - rect.y;
	if (y < rect.y)
		rect.y = y;

	return rect;
};

interface IPathContainer {
	path: Path2D;
	rect: Rectangle;
	char?: TesselatedFontChar;
}

export class FNTGeneratorCanvas extends FNTGeneratorBase {
	private static getCanvasContext (
		width: number = 100,
		height: number = 100,
		debug: boolean = false
	): CanvasRenderingContext2D {
		const canvas = ('OffscreenCanvas' in self && !debug)
			? new self.OffscreenCanvas(width, height)
			: document.createElement('canvas');

		canvas.width = width;
		canvas.height = height;

		return canvas.getContext('2d', { desynchronized: true, alpha: true }) as CanvasRenderingContext2D;
	}

	private static freeCanvasContext (ctx: CanvasRenderingContext2D) {
		if (ctx.canvas instanceof self.OffscreenCanvas) {
			return;
		}

		// safari bug with canvas leaks
		ctx.canvas.width = 0;
		ctx.canvas.height = 0;
	}

	private static transformChar (char: TesselatedFontChar): IPathContainer {
		const fillData = char.fill_data_path;

		// empty command
		if (fillData.commands[0].length === 0 && fillData.commands.length === 1) {
			return  null;
		}

		const path = new Path2D();
		const rect = new Rectangle(Infinity, Infinity, -Infinity, -Infinity);

		for (let i = 0; i < fillData.commands.length; i++) {
			const data = fillData.data[i];
			const commands = fillData.commands[i];

			let pointer = 0;
			for (const command of commands) {
				switch (command) {
					case GraphicsPathCommand.MOVE_TO: {
						// flash path in twips, transform it
						const px = data[pointer++] / 20;
						const py = data[pointer++] / 20;

						addMaxPoint(rect, px, py);
						path.moveTo(px, py);
						break;
					}

					case GraphicsPathCommand.LINE_TO: {
						const px = data[pointer++] / 20;
						const py = data[pointer++] / 20;

						addMaxPoint(rect, px, py);
						path.lineTo(px, py);
						break;
					}

					case GraphicsPathCommand.CURVE_TO: {
						const cx = data[pointer++] / 20;
						const cy = data[pointer++] / 20;
						const dx = data[pointer++] / 20;
						const dy = data[pointer++] / 20;

						addMaxPoint(rect, cx, cy);
						addMaxPoint(rect, cx, cy);

						path.quadraticCurveTo(
							cx, cy,
							dx, dy
						);
					}
				}
			}
			//path.closePath();
		}

		return {
			path, rect, char
		};
	}

	private static sortPatches (a: IPathContainer, b: IPathContainer): number {
		return  a.rect.height - b.rect.height;
	}

	private static render(
		table: TesselatedFontTable,
		context: CanvasRenderingContext2D,
		size: number,
		fontSize: number = 0,
		padding: number = 0
	): void {
		const chars = table.get_font_chars();
		const patches: IPathContainer[] = [];
		const doublePad = padding * 2;

		let totalArea: number = 0;
		let scale: number = 1;

		for (const char of chars) {
			const path = FNTGeneratorCanvas.transformChar(char);

			if (!path) {
				continue;
			}

			totalArea += (doublePad + path.rect.width) * (doublePad + path.rect.height);

			patches.push(path);
		}

		//patches.sort(FNTGeneratorCanvas.sortPatches);

		// TODO compute valid size when font size is 0

		if (size) {
			table.initFontSize(fontSize);
			scale = table.get_font_em_size() / size;
		}

		/**
		 * Render glyphs onto canvas
		 * We will render glyphs as white and background as black transparent
		 */
		context.save();
		context.clearRect(0, 0, size, size);
		context.fillStyle = '#000';

		let tx = padding;
		let ty = padding;
		let maxHeight = 0;

		// pack glyph based on size
		for (const path of patches) {
			if (!path.path) {
				continue;
			}

			path.char.fnt_uv = new Rectangle(
				(tx - path.rect.x) * scale,
				(ty - path.rect.y) * scale,
				path.rect.width * scale,
				path.rect.height * scale
			);

			context.setTransform(scale, 0, 0, scale, (tx - path.rect.x) * scale, (ty - path.rect.y) * scale);
			context.fill(path.path);

			maxHeight = Math.max(path.rect.height, maxHeight);

			// next location
			const vx = tx + path.rect.width + doublePad;
			const vy = ty + maxHeight + doublePad;

			// if overflow - jump next location
			if (vx >= size) {
				maxHeight = 0;
				tx = padding;
				ty = vy;
			} else {
				tx = vx;
			}
		}

		context.restore();
	}

	/**
	 * Debug mode.
	 * Prevent OffscreenCanvas and prevent canvas clear.
	 * Store canvas
	 */
	public debug: boolean = false;

	/**
	 * Store canvas used for caching. Only in debug mode
	 */
	public canvas: HTMLCanvasElement;

	constructor(stage: Stage, debug = false) {
		super(stage);

		this.debug = debug;
	}

	public generate(font: Font, maxSize: number, fontSize: number, padding: number): BitmapImage2D[] {
		const size = maxSize * 2;
		const context = FNTGeneratorCanvas.getCanvasContext(size, size, this.debug);
		const bitmaps = [];

		for (const key in font.font_styles) {
			// render table in context
			FNTGeneratorCanvas.render(
				<TesselatedFontTable> font.font_styles[key],
				context,
				size,
				fontSize,
				padding
			);

			const data = context.getImageData(0, 0, size, size);
			const image = new BitmapImage2D(size, size, true, 0, true, this._stage);

			image.setPixels(new Rectangle(0, 0, size, size), data.data);

			bitmaps.push(image);
		}

		if (!this.debug) {
			FNTGeneratorCanvas.freeCanvasContext(context);
		} else {
			this.canvas = context.canvas;
		}

		return bitmaps;
	}
}