import { FNTGeneratorBase } from './FNTGeneratrorBase';
import { Font } from './Font';
import { BitmapImage2D, Stage } from '@awayjs/stage';
import { Rectangle } from '@awayjs/core';
import { GraphicsPathCommand } from '@awayjs/graphics';
import { TesselatedFontTable } from './TesselatedFontTable';
import { TesselatedFontChar } from './TesselatedFontChar';

class Bounds {
	left: number = Number.MAX_VALUE;
	right: number = Number.MIN_VALUE;
	top: number = Number.MAX_VALUE;
	bottom: number = Number.MIN_VALUE;

	grown (x: number, y: number) {
		if (x < this.left)
			this.left = x;

		if (x > this.right)
			this.right = x;

		if (y < this.top)
			this.top = y;

		if (y > this.bottom)
			this.bottom = y;
	}

	toRect(): Rectangle {
		return new Rectangle(this.left, this.top, this.right - this.left, this.bottom - this.top);
	}
}

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
		if (fillData.commands.length === 0) {
			return  null;
		}

		const path = new Path2D();
		const box = new Bounds();
		const data = fillData.data;
		const commands = fillData.commands;

		let pointer = 0;
		for (const command of commands) {
			switch (command) {
				case GraphicsPathCommand.MOVE_TO: {
					// flash path in twips, transform it
					const px = data[pointer++] / 20;
					const py = data[pointer++] / 20;

					box.grown(px, py);
					path.moveTo(px, py);
					break;
				}

				case GraphicsPathCommand.LINE_TO: {
					const px = data[pointer++] / 20;
					const py = data[pointer++] / 20;

					box.grown(px, py);
					path.lineTo(px, py);
					break;
				}

				case GraphicsPathCommand.CURVE_TO: {
					const cx = data[pointer++] / 20;
					const cy = data[pointer++] / 20;
					const dx = data[pointer++] / 20;
					const dy = data[pointer++] / 20;

					box.grown(cx, cy);
					box.grown(dx, dy);

					path.quadraticCurveTo(
						cx, cy,
						dx, dy
					);
				}
			}
		}

		return {
			path,
			char,
			rect: box.toRect(),
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

		patches.sort(FNTGeneratorCanvas.sortPatches);

		// TODO compute valid scale when fontSize is 0
		if (fontSize) {
			table.initFontSize(fontSize);
			scale = /* 20 *  table._size_multiply **/ size / table.get_font_em_size();
		}

		/**
		 * Render glyphs onto canvas
		 * We will render glyphs as white and background as black transparent
		 */
		context.save();
		context.clearRect(0, 0, size, size);
		context.fillStyle = '#fff';

		let tx = padding;
		let ty = padding;
		let maxHeight = 0;

		// pack glyph based on size
		for (const path of patches) {
			if (!path.path) {
				continue;
			}

			// if overflow - jump next location
			if (tx + path.rect.width + doublePad >= size / scale) {
				tx = padding;
				ty += maxHeight + doublePad;
				maxHeight = 0;
			}

			/**
			 * @todo Support multiple channel table data
			 */
			if (ty + path.rect.height > size / scale) {
				console.warn('[FNTGeneratorCanvas] Font image overflow, font will corrupted!');
			}

			maxHeight = Math.max(path.rect.height, maxHeight);

			context.setTransform(
				scale, 0, 0, scale,
				(tx - path.rect.x) * scale,
				(ty - path.rect.y) * scale
			);

			context.fill(path.path);
			//context.strokeRect(path.rect.x,path.rect.y, path.rect.width, path.rect.height);

			path.char.fnt_rect = new Rectangle(
				(path.rect.x) / path.char.char_width,
				(path.rect.y) / table.get_font_em_size(),
				path.rect.width / path.char.char_width,
				path.rect.height / table.get_font_em_size()
			);

			path.char.fnt_uv = new Rectangle(
				tx * scale / size,
				ty * scale / size,
				path.rect.width * scale / size,
				path.rect.height * scale / size);
			/*
			path.char.fnt_uv = new Rectangle(
				(tx - path.rect.x) * scale / size,
				1 - (ty - path.rect.y) * scale / scale,
				path.rect.width * scale / size,
				path.rect.height * scale / size
			);*/

			path.char.fnt_channel = 0;

			tx += path.rect.width + doublePad;
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

	public generate(font: Font, size: number, fontSize: number, padding: number): BitmapImage2D[] {
		const context = FNTGeneratorCanvas.getCanvasContext(size, size, this.debug);
		const bitmaps = [];

		for (const key in font.font_styles) {
			const table = <TesselatedFontTable> font.font_styles[key];
			// render table in context
			FNTGeneratorCanvas.render(
				table,
				context,
				size,
				fontSize,
				padding
			);

			const data = context.getImageData(0, 0, size, size);
			const image = new BitmapImage2D(size, size, true, 0, true, this._stage);

			image.setPixels(new Rectangle(0, 0, size, size), data.data);

			bitmaps.push(image);
			table.addFNTChannel(image);
		}

		if (!this.debug) {
			FNTGeneratorCanvas.freeCanvasContext(context);
		} else {
			this.canvas = context.canvas;
		}

		return bitmaps;
	}
}