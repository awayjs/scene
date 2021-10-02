import { Matrix, AssetBase, Point, Rectangle, ColorTransform, ColorUtils } from '@awayjs/core';

import { ImageSampler, AttributesBuffer, Float2Attributes, AttributesView, BitmapImage2D, Stage } from '@awayjs/stage';

import { Style, TriangleElements } from '@awayjs/renderer';

import { GraphicsPath, Shape, GraphicsFactoryFills, GraphicsFactoryHelper, MaterialManager } from '@awayjs/graphics';

import { MaterialBase, MethodMaterial } from '@awayjs/materials';

import { TesselatedFontChar } from './TesselatedFontChar';
import { IFontTable } from './IFontTable';
import { TextFormat } from './TextFormat';
import { TextShape } from './TextShape';

import { TextField } from '../display/TextField';
import { Settings } from '../Settings';
import { FNTGeneratorCanvas } from './FNTGeneratorCanvas';

const ONCE_EMIT_TABLE: StringMap<boolean> = Object.create(null);
function once(obj: any, key = '') {
	const has = ONCE_EMIT_TABLE[obj._id + key];

	ONCE_EMIT_TABLE[obj._id + key] = true;
	return !has;
}

interface ICharEntry {
	x: number;
	y: number;
	char: TesselatedFontChar;
	selected?: boolean;
	shape?: TextShape;
}

/**
 * GraphicBase wraps a TriangleElements as a scene graph instantiation. A GraphicBase is owned by a Sprite object.
 *
 *
 * @see away.base.TriangleElements
 * @see away.entities.Sprite
 *
 * @class away.base.GraphicBase
 */
export class TesselatedFontTable extends AssetBase implements IFontTable {
	public static assetType: string = '[asset TesselatedFontTable]';
	public static DEFAULT_SPACE = 14;

	public font: any;

	/*internal*/ _font_chars_dic: StringMap<TesselatedFontChar>;
	/*internal*/ _current_size: number;
	/*internal*/ _size_multiply: number;

	private _font_chars: Array<TesselatedFontChar>;
	private _font_em_size: number;

	private _whitespace_width: number;

	private _offset_x: number;
	private _offset_y: number;
	private _ascent: number;
	private _descent: number;
	private _charDictDirty: Boolean;
	private _usesCurves: boolean;
	private _opentype_font: any;
	private _glyphIdxToChar: any;

	private _fntSizeLimit: number=-1;
	private _fnt_channels: BitmapImage2D[];

	/**
	 * Creates a new TesselatedFont object
	 * If a opentype_font object is passed, the chars will get tessellated whenever requested.
	 * If no opentype font object is passed, it is expected that tesselated chars
	 */
	constructor(opentype_font: any = null) {
		super();
		this._font_chars = [];
		this._font_chars_dic = Object.create(null);
		this._current_size = 0;
		this._size_multiply = 0;
		this._ascent = 0;
		this._descent = 0;
		this._usesCurves = false;
		this._glyphIdxToChar = {};
		this._fnt_channels = [];

		// default size
		this._font_em_size = 32;

		if (opentype_font) {
			this._opentype_font = opentype_font;
			/*
            console.log("head.yMax ",opentype_font);

			 console.log("head.yMax "+opentype_font.tables.head.yMax);
			 console.log("head.yMin "+opentype_font.tables.head.yMin);
			 console.log("font.numGlyphs "+opentype_font.numGlyphs);
			 console.log('Ascender', opentype_font.tables.hhea.ascender);
			 console.log('Descender', opentype_font.tables.hhea.descender);
			 console.log('Typo Ascender', opentype_font.tables.os2.sTypoAscender);
			 console.log('Typo Descender', opentype_font.tables.os2.sTypoDescender);
			 */
			this._font_em_size = 72;//2048;
			this._ascent = opentype_font.tables.hhea.ascender / (this._opentype_font.unitsPerEm / 72);
			this._descent = -2 + opentype_font.tables.hhea.descender / (this._opentype_font.unitsPerEm / 72);
			this._current_size = 0;
			this._size_multiply = 0;

			const thisGlyph = this._opentype_font.charToGlyph(String.fromCharCode(32));
			if (thisGlyph) {
				//this._whitespace_width = thisGlyph.advanceWidth / (this._opentype_font.unitsPerEm / 72);
			}
			return;
		}
	}

	public addFNTChannel(mat: BitmapImage2D) {
		this._fnt_channels.push(mat);
	}

	public getGlyphCount(): number {
		return this._font_chars.length;
	}

	public generateFNTData (stage: Stage): void {
		// already exist
		if (this._fntSizeLimit > 0) {
			return;
		}

		const generator = new FNTGeneratorCanvas(stage, false);
		const bitmaps = generator.generate(this.font, this._font_em_size, this._current_size, 4);

		if (bitmaps && bitmaps.length > 0) {
			/**
			 * Random value, anyway we render real font dimension ;)
			 */
			this._fntSizeLimit = this._current_size * 4;
		}
	}

	public generateFNTTextures(padding: number, fontSize: number, texSize: number): Shape[] {
		console.log('generateFNTTextures');
		if (fontSize) {
			this._fntSizeLimit = fontSize * 0.5; //why half?
			this.initFontSize(fontSize);

		}

		if (this._opentype_font) {
			// 	if this was loaded from opentype,
			//	we make sure all glyphs are tesselated first
			for (let g: number = 0; g < this._opentype_font.glyphs.length;g++) {
				const thisGlyph = this._opentype_font.charToGlyph(
					String.fromCharCode(this._opentype_font.glyphs.glyphs[g].unicode));
				if (thisGlyph) {
					const thisPath = thisGlyph.getPath();
					const awayPath: GraphicsPath = new GraphicsPath();
					let i = 0;
					const len = thisPath.commands.length;
					let startx: number = 0;
					let starty: number = 0;
					const y_offset = this._ascent;
					for (i = 0;i < len;i++) {
						const cmd = thisPath.commands[i];
						//console.log("cmd", cmd.type, cmd.x, cmd.y, cmd.x1, cmd.y1, cmd.x2, cmd.y2);
						if (cmd.type === 'M') {
							awayPath.moveTo(cmd.x, cmd.y + y_offset);
							startx = cmd.x;
							starty = cmd.y + y_offset;
						} else if (cmd.type === 'L') {
							awayPath.lineTo(cmd.x, cmd.y + y_offset);
						} else if (cmd.type === 'Q') {
							awayPath.curveTo(cmd.x1, cmd.y1 + y_offset, cmd.x, cmd.y + y_offset);
						} else if (cmd.type === 'C') {
							awayPath.cubicCurveTo(cmd.x1, cmd.y1 + y_offset, cmd.x2,
								cmd.y2 + y_offset, cmd.x, cmd.y + y_offset);
						} else if (cmd.type === 'Z') {	awayPath.lineTo(startx, starty);}
					}
					const t_font_char: TesselatedFontChar = new TesselatedFontChar(null, null, awayPath);
					t_font_char.char_width = (thisGlyph.advanceWidth * (1 / thisGlyph.path.unitsPerEm * 72));
					t_font_char.fill_data = GraphicsFactoryFills.pathToAttributesBuffer(awayPath, true);
					if (!t_font_char.fill_data) {
						console.log('error tesselating opentype glyph', this._opentype_font.glyphs.glyphs[g]);
						//return null;
					} else {
						this._font_chars.push(t_font_char);
						this._font_chars_dic[this._opentype_font.glyphs.glyphs[g].unicode] = t_font_char;

					}
					//console.log("unicode:",this._opentype_font.glyphs.glyphs[g].unicode);
					//console.log("name:",this._opentype_font.glyphs.glyphs[g].name);

				} else {
					console.log('no char found for', this._opentype_font.glyphs.glyphs[g]);
				}
			}
		}
		let char_vertices: AttributesBuffer;
		let x: number = 0;
		let y: number = 0;
		let buffer: Float32Array;
		let v: number;
		const glyph_verts: number[][] = [[]];
		let channel_idx: number = 0;
		let maxSize = 0;
		const allChars: any[] = [];

		let maxy: number = Number.MIN_VALUE;
		let maxx: number = Number.MIN_VALUE;
		let miny: number = Number.MAX_VALUE;
		let minx: number = Number.MAX_VALUE;
		let tmpx: number = 0;
		let tmpy: number = 0;

		// 	step1: loop over all chars, get their bounds and sort them by there height
		//	done without applying any font-scale to the glyphdata
		let allAreas: number = 0;
		for (let i: number = 0; i < this._font_chars.length;i++) {
			char_vertices = this._font_chars[i].fill_data;
			//console.log("got the glyph from opentype", this._opentype_font.glyphs.glyphs[g]);
			buffer = new Float32Array(char_vertices.buffer);
			maxy = Number.MIN_VALUE;
			maxx = Number.MIN_VALUE;
			miny = Number.MAX_VALUE;
			minx = Number.MAX_VALUE;
			tmpx = 0;
			tmpy = 0;
			for (v = 0; v < char_vertices.count; v++) {
				tmpx = (buffer[v * 2]);
				tmpy = (buffer[v * 2 + 1]);
				if (tmpx < minx)	minx = tmpx;
				if (tmpx > maxx)	maxx = tmpx;
				if (tmpy < miny)	miny = tmpy;
				if (tmpy > maxy)	maxy = tmpy;
			}
			this._font_chars[i].fnt_rect = new Rectangle(
				(minx) / (this._font_chars[i].char_width),
				(miny) / (this._font_em_size),
				(maxx - minx) / (this._font_chars[i].char_width),
				(maxy - miny) / (this._font_em_size));

			allAreas += (maxx - minx + padding + padding) * (maxy - miny + padding + padding);
			allChars[allChars.length] = {
				idx:i,
				minx:minx,
				miny:miny,
				width:maxx - minx,
				height:maxy - miny
			};
		}
		allChars.sort(function(a,b) {
			return a.height > b.height ? -1 : 1;
		});

		// now allChars contains all glyphs sorted by height

		let curHeight: number = 0;
		maxSize = texSize;
		let size_multiply: number = 1;
		if (fontSize) {
			this.initFontSize(fontSize);
			size_multiply = this._size_multiply;
		} else {
			// 	figure out the optiomal fontSize so that the glyphs fill the texture

			//	imagine the spaces needed by all glyphs would be a perfect quat
			//	compare the width of that quat with the available width to have a first guess at fontSize

			// 	make the size slightly bigger as the estimate and check if all glyphs will fit
			//	if they do not fit, slightly reduce the scale.
			// 	repeat until all glyphs fit

			size_multiply = maxSize / (Math.sqrt(allAreas)) * 1.2;
			let invalid: boolean = true;
			let curCharHeight: number = 0;
			while (invalid) {
				invalid = false;
				x = 0;
				y = padding;
				for (let i: number = 0; i < allChars.length;i++) {
					curCharHeight = allChars[i].height * size_multiply;
					tmpx = 0;
					tmpy = 0;
					x += padding;
					if (x + allChars[i].width * size_multiply + padding >= maxSize) {
						x = padding;
						y += curHeight + padding * 2;
						curHeight = 0;
					}
					if (curCharHeight > curHeight) {
						curHeight = curCharHeight;
					}
					if (y + curCharHeight + padding * 2 >= maxSize) {
						invalid = true;
						size_multiply = size_multiply * 0.995;
						break;
					}
					x += (allChars[i].width) * size_multiply + padding;
				}
			}
		}

		this._fntSizeLimit = size_multiply * this._font_em_size * 0.5; //why half?

		// collect the glyph-data:

		let font_char: TesselatedFontChar;
		x = 0;
		y = padding;
		for (let i: number = 0; i < allChars.length;i++) {

			font_char = this._font_chars[allChars[i].idx];
			char_vertices = font_char.fill_data;
			buffer = new Float32Array(char_vertices.buffer);
			minx = allChars[i].minx;
			maxx = Number.MIN_VALUE;
			miny = allChars[i].miny;
			maxy = Number.MIN_VALUE;
			tmpx = 0;
			tmpy = 0;
			x += padding;

			if (x + allChars[i].width * size_multiply + padding >= maxSize) {
				x = padding;
				y += curHeight + padding * 2;
				curHeight = 0;
			}
			allChars[i].height *= size_multiply;
			if (allChars[i].height > curHeight) {
				curHeight = allChars[i].height;
			}
			if (y + curHeight + padding * 2 >= maxSize) {
				x = padding;
				y = padding;
				curHeight = 0;
				channel_idx++;
				glyph_verts[channel_idx] = [];
			}
			font_char.fnt_channel = channel_idx;
			for (v = 0; v < char_vertices.count; v++) {
				tmpx = ((buffer[v * 2] - minx) * size_multiply) + x;
				tmpy = ((buffer[v * 2 + 1] - miny) * size_multiply) + y;
				glyph_verts[channel_idx][glyph_verts[channel_idx].length] = tmpx;
				glyph_verts[channel_idx][glyph_verts[channel_idx].length] = tmpy;
				if (tmpx > maxx) {
					maxx = tmpx;
				}
				if (tmpy > maxy) {
					maxy = tmpy;
				}
			}
			font_char.fnt_uv = new Rectangle(
				x / maxSize, 1 - (y / maxSize),
				(maxx - x) / maxSize, ((maxy - y) / maxSize));

			//this._drawDebugRect(glyph_verts[channel_idx], x, maxx, y, maxy);

			x += (allChars[i].width) * size_multiply + padding;

		}
		const shapes: Shape[] = [];
		for (let i: number = 0; i < glyph_verts.length;i++) {
			const attr_length: number = 2;//(tess_fontTable.usesCurves)?3:2;
			const attributesView: AttributesView = new AttributesView(Float32Array, attr_length);
			attributesView.set(glyph_verts[i]);
			const vertexBuffer: AttributesBuffer = attributesView.attributesBuffer.cloneBufferView();
			attributesView.dispose();
			const elements = new TriangleElements(vertexBuffer);
			elements.setPositions(new Float2Attributes(vertexBuffer));
			const shape = Shape.getShape(elements);

			const sampler: ImageSampler = new ImageSampler();
			shape.style = new Style();

			const color = 0xFFFFFF;
			const alpha = 1;
			const obj = MaterialManager.get_material_for_color(color, alpha);

			shape.material = obj.material;
			if (obj.colorPos) {
				shape.style.addSamplerAt(sampler, shape.material.getTextureAt(0));
				(<MaterialBase> shape.material).animateUVs = true;
				shape.style.uvMatrix = new Matrix(0, 0, 0, 0, obj.colorPos.x, obj.colorPos.y);
			}
			shapes[i] = shape;
		}
		return shapes;

	}

	public getRatio(size: number): number {
		return this._size_multiply;
	}

	public hasChar(char_code: string): boolean {
		let has = !!this._font_chars_dic[char_code];

		if (!has && this._opentype_font) {
			has = !!this._opentype_font.charToGlyph(String.fromCharCode(parseInt(char_code)));
		}

		return has;
	}

	public changeOpenTypeFont(newOpenTypeFont: any, tesselateAllOld: boolean = true) {
		if ((tesselateAllOld) && (this._opentype_font)) {
			//todo: make sure all available chars are tesselated
		}
		// todo: when updating a font we must take care that they are compatible in terms of em_size
		this._opentype_font = newOpenTypeFont;
		this._ascent = newOpenTypeFont.ascender;// * (1024 / newOpenTypeFont.unitsPerEm);
		this._descent = newOpenTypeFont.descender ;//* (1024 / newOpenTypeFont.unitsPerEm);
		this._font_em_size = newOpenTypeFont.unitsPerEm;

		const space = this.getChar('32');
		if (space) {
			this._whitespace_width = space.char_width;
		}
		//console.log('changeOpenTypeFont', this._ascent, this._descent, this._font_em_size);
	}

	public initFontSize(font_size: number) {
		if (this._current_size === font_size) {
			return;
		}

		this._current_size = font_size;
		this._size_multiply = font_size / this._font_em_size;

		if (!this._size_multiply) {
			debugger;
		}
	}

	public getCharVertCnt(char_code: string): number {

		const t_font_char: TesselatedFontChar = this._font_chars_dic[char_code];
		if (t_font_char) {
			return t_font_char.fill_data.length;
		}

		return 0;
	}

	public getCharWidth(char_code: string): number {
		const space = this._whitespace_width * this._size_multiply || TesselatedFontTable.DEFAULT_SPACE;

		// SPACE
		if (char_code == '32') {
			return (space * 20 | 0) / 20;
		}

		// TAB
		if (char_code == '9') {
			// todo: temporary change this to 2.
			// need to implement textFormat tabstop
			return (space * 2 * 20) / 20;
		}

		let t_font_char = this.getChar(char_code, false);

		if (t_font_char) {
			return ((t_font_char.char_width * this._size_multiply * 20) | 0) / 20;
		} else if (char_code == '9679') {
			t_font_char = this.createPointGlyph_9679();
			return ((t_font_char.char_width * this._size_multiply * 20) | 0) / 20;
		}

		return 0;
	}

	public get usesCurves(): boolean {
		return this._usesCurves;
	}

	public getLineHeight(): number {
		// @todo: root evil for wrong linespace :(
		// i am still not sure if we use the correct version of this 3:
		return this._size_multiply * (this._ascent - this.descent); // used for sf
		//return this._size_multiply * this._font_em_size;	// used a long time for poki etc
		//return (this._ascent+this._descent)*this._size_multiply;	// used long ago for icycle
	}

	public getUnderLineHeight(): number {
		return this._size_multiply * (this._ascent - this.descent / 2);
	}

	public get assetType(): string {
		return TesselatedFontTable.assetType;
	}

	public dispose(): void {
		for (let i: number = 0; i < this._font_chars.length; i++) {
			this._font_chars[i].dispose();
		}
		this._font_chars.length = 0;
		this._font_chars_dic = null;
	}

	get fntSizeLimit(): number {
		return this._fntSizeLimit;
	}

	set fntSizeLimit(value: number) {
		this._fntSizeLimit = value;
	}

	get ascent(): number {
		return this._ascent;
	}

	set ascent(value: number) {
		this._ascent = value;
	}

	get descent(): number {
		return this._descent;
	}

	set descent(value: number) {
		this._descent = value;
	}

	get offset_x(): number {
		return this._offset_x;
	}

	set offset_x(value: number) {
		this._offset_x = value;
	}

	get offset_y(): number {
		return this._offset_y;
	}

	set offset_y(value: number) {
		this._offset_y = value;
	}

	public get_font_chars(): Array<TesselatedFontChar> {
		return this._font_chars;
	}

	public get_font_em_size(): number {
		return this._font_em_size;
	}

	public set_whitespace_width(value: number): void {
		this._whitespace_width = value;
	}

	public get_whitespace_width(): number {
		return this._whitespace_width;
	}

	public set_font_em_size(font_em_size: number): void {
		this._font_em_size = font_em_size;
	}

	public buildTextLineFromIndices(
		field: TextField,
		format: TextFormat,
		x: number, y: number,
		indices: number[],
		advance: number[]): Point {

		const textShape = field.getTextShapeForIdentifierAndFormat(format.color.toString(), format);
		const origin_x = x;
		const indicesCount = indices.length;
		const charEntries: ICharEntry[] = [];
		let textBuffSize: number = 0;

		y -= this._ascent * this._size_multiply;//this.getLineHeight();

		// loop over all the words and create the text data for it
		// each word provides its own start-x and start-y values, so we can just ignore whitespace-here
		for (let i = 0; i < indicesCount; i++) {
			const idx = indices[i];
			const charGlyph = this._glyphIdxToChar[idx];

			if (!charGlyph) {
				x += advance[i];
				//console.log("no glyph found at idx", idx, "todo: support fallback fonts");
				continue;
			}

			if (charGlyph.fill_data === null) {

				if (charGlyph.fill_data_path.commands[0][0] == 1
					&& charGlyph.fill_data_path.data[0][0] == 0
					&& charGlyph.fill_data_path.data[0][1] == 0) {

					charGlyph.fill_data_path.data[0].shift();
					charGlyph.fill_data_path.data[0].shift();
					charGlyph.fill_data_path.commands[0].shift();
					charGlyph.fill_data_path.commands[0][0] = 2;
				}

				charGlyph.fill_data = GraphicsFactoryFills.pathToAttributesBuffer(charGlyph.fill_data_path, true);
			}

			const charVertices = charGlyph.fill_data;

			if (charVertices) {
				charEntries.push({
					char: charGlyph, x, y, selected: false
				});

				textBuffSize += charVertices.buffer.byteLength / 4;
			}

			x += advance[i];// * size_multiply;
		}

		const buff = new Float32Array(textBuffSize);
		this._fillBuffer(buff, charEntries, false);
		textShape.addChunk(buff);

		return new Point(x - origin_x, this.getLineHeight());
	}

	public fillTextRun (tf: TextField, format: TextFormat, startWord: number, wordCnt: number) {
		const useFNT: boolean = this._fntSizeLimit >= 0 && this._fntSizeLimit >= format.size;

		if (useFNT) {
			return this.fillTextRunFNT(tf, format, startWord, wordCnt);
		}

		const textShape = this._queryShape(tf, format);

		let textShapeSelected: TextShape;
		let newFormat: TextFormat;

		const wordsCount = startWord + wordCnt;
		const size_multiply = this._size_multiply;

		let select_start = tf.selectionBeginIndex;
		let select_end = tf.selectionEndIndex;
		let start_x: number = 0;

		if (tf.selectable) {
			newFormat = format.clone();
			newFormat.color = 0xffffff;

			textShapeSelected = this._queryShape(tf, newFormat);

			if (newFormat.underline && (startWord + 1) < tf.words.length) {
				start_x = tf.words.get(startWord).x;
			}

			if (tf.selectionEndIndex < tf.selectionBeginIndex) {
				select_start = tf.selectionEndIndex;
				select_end = tf.selectionBeginIndex;
			}
		}

		let selectedBuffSize = 0;
		let textBuffSize = 0;

		const charEntries: ICharEntry[] = [];
		const selectedCharEntries: ICharEntry[] = [];
		const underlines: Float32Array[] = [];

		// loop over all the words and create the text data for it
		// each word provides its own start-x and start-y values, so we can just ignore whitespace-here
		for (let w = startWord; w < wordsCount; w += 1) {
			const word = tf.words.get(w);

			let x = word.x;
			const y = word.y;

			const startIdx = word.start;
			const charsCount = startIdx + word.len;

			for (let c = startIdx; c < charsCount; c++) {
				const curTShape = (tf.isInFocus && c >= select_start && c < select_end) ?
					textShapeSelected : textShape;

				const code = tf.chars_codes[c];

				if (code === 32 || code === 9) {
					continue;
				}

				const charGlyph = this.getChar(code, true);

				if (!charGlyph) {
					if (once(this, 'miss' + tf.chars_codes[c])) {
						console.debug('[TesselatedFontTable] Error: char not found in fontTable',
							tf.chars_codes[c], String.fromCharCode(tf.chars_codes[c]));
					}
					continue;
				}

				if (curTShape === textShapeSelected) {
					selectedCharEntries.push({
						char: charGlyph, x, y, selected: true
					});

					selectedBuffSize += charGlyph.fill_data.buffer.byteLength / 4;
				} else {
					charEntries.push({
						char: charGlyph, x, y, selected: false
					});
					textBuffSize += charGlyph.fill_data.buffer.byteLength / 4;
				}

				x += charGlyph.char_width * size_multiply;

			}

			const half_thickness: number = 0.25 * tf.internalScale.y;
			const topY: number = y + this.getUnderLineHeight() + half_thickness;
			const bottomY: number = y + this.getUnderLineHeight() - half_thickness;

			if (tf.selectable && newFormat.underline && (startWord + 1) < tf.words.length) {
				const underBuff = new Float32Array(12);

				underBuff[0] = start_x;
				underBuff[1] = bottomY;
				underBuff[2] = start_x;
				underBuff[3] = topY;
				underBuff[4] = x;
				underBuff[5] = topY;
				underBuff[6] = x;
				underBuff[7] = topY;
				underBuff[8] = x;
				underBuff[9] = bottomY;
				underBuff[10] = start_x;
				underBuff[11] = bottomY;

				underlines.push(underBuff);
			}

		} // for word

		// reallock buffers and fill
		if (textBuffSize > 0) {
			textBuffSize += underlines.length * 12;

			const buff = new Float32Array(textBuffSize);
			let offset = this._fillBuffer(buff, charEntries, false);

			for (const under of underlines) {
				buff.set(under, offset);
				offset += under.length;
			}

			textShape.addChunk(buff);
		}

		if (selectedBuffSize > 0) {
			const buff = new Float32Array(selectedBuffSize);

			this._fillBuffer(buff, selectedCharEntries, true);

			textShapeSelected.addChunk(buff);
		}

	}

	private _cacheKey (color: number = 0xffffff, channel: number = -1) {
		const fnt = channel >= 0;
		return `${color}${fnt}${fnt ? channel : 0}`;
	}

	/**
	 * Query shape from TextField cache
	 * @param tf
	 * @param format
	 * @param channel - FNT channel, -1 for regular font
	 * @private
	 */
	private _queryShape (tf: TextField, format: TextFormat, channel = -1): TextShape {
		const textShape = tf.getTextShapeForIdentifierAndFormat(this._cacheKey(format.color, channel), format);

		if (channel >= 0 && !textShape.fntMaterial) {
			const argb = ColorUtils.float32ColorToARGB(format.color);
			const mat = new MethodMaterial(this._fnt_channels[channel]);

			mat.colorTransform = new ColorTransform(argb[1] / 255, argb[2] / 255, argb[3] / 255);
			mat.bothSides = true;
			mat.alphaBlending = true;
			mat.useColorTransform = true;
			mat.style.sampler = new ImageSampler(false, true, true);

			textShape.fntMaterial = mat;
		}

		return textShape;
	}

	/**
	 * Fill text run but use FNT Texture.
	 */
	public fillTextRunFNT (tf: TextField, format: TextFormat, startWord: number, wordCnt: number) {
		const textShape: TextShape = this._queryShape(tf, format, 0);
		const charShapesCache: Record<string, TextShape> = {};
		const charShapesSelectedCache: Record<string, TextShape> = {};
		const wordsCount = startWord + wordCnt;
		const size_multiply = this._size_multiply;

		let textShapeSelected: TextShape;

		let select_start = tf.selectionBeginIndex;
		let select_end = tf.selectionEndIndex;
		let start_x: number = 0;

		if (tf.selectable) {
			const newFormat = format.clone();
			newFormat.color = 0xffffff;

			textShapeSelected = this._queryShape(tf, newFormat, 0);
			charShapesSelectedCache[textShapeSelected.cacheId] = textShapeSelected;

			if (newFormat.underline && (startWord + 1) < tf.words.length) {
				start_x = tf.words.get(startWord).x;
			}

			if (tf.selectionEndIndex < tf.selectionBeginIndex) {
				select_start = tf.selectionEndIndex;
				select_end = tf.selectionBeginIndex;
			}
		}

		charShapesCache[textShape.cacheId] = textShape;

		const shapeArray = new Map<TextShape, {
			uv: number [],
			pos: number []
		}>();

		const underlines: Float32Array[] = [];

		// loop over all the words and create the text data for it
		// each word provides its own start-x and start-y values, so we can just ignore whitespace-here
		for (let w = startWord; w < wordsCount; w += 1) {
			const word = tf.words.get(w);

			let x = word.x;
			const y = word.y;

			const startIdx = word.start;
			const charsCount = startIdx + word.len;

			let preFilledShape: TextShape = null;
			let target: any = null;
			let color: number = 0;
			let fntID: number = -1;

			for (let c = startIdx; c < charsCount; c++) {
				// space codes
				if (tf.chars_codes[c] === 32 || tf.chars_codes[c] === 9) {
					continue;
				}

				const charGlyph = this.getChar(tf.chars_codes[c], false);

				if (!charGlyph) {
					if (once(this, 'miss' + tf.chars_codes[c])) {
						console.debug('[TesselatedFontTable] Error: char not found in fontTable',
							tf.chars_codes[c], String.fromCharCode(tf.chars_codes[c]));
					}
					continue;
				}

				const selected = (tf.isInFocus && c >= select_start && c < select_end);
				let baseShape = textShape;
				let cacheStore = charShapesCache;

				if (selected) {
					baseShape = textShapeSelected;
					cacheStore = charShapesSelectedCache;
				}

				const curFormat = baseShape.format;
				let cacheId = preFilledShape ? preFilledShape.cacheId : '';

				if (!cacheId || color !== curFormat.color || charGlyph.fnt_channel !== fntID) {
					cacheId = this._cacheKey(curFormat.color, charGlyph.fnt_channel);
					color = curFormat.color;
					fntID = charGlyph.fnt_channel;
				}

				let fntFilledShape = preFilledShape && preFilledShape.cacheId !== cacheId
					? cacheStore[cacheId]
					: preFilledShape;

				if (!fntFilledShape) {
					fntFilledShape = this._queryShape(tf, curFormat, charGlyph.fnt_channel);
					cacheStore[fntFilledShape.cacheId] = fntFilledShape;
				}

				if (preFilledShape !== fntFilledShape || !target) {
					// FNT is very little, has 6 vertices per shape (instead of 300 ++)
					// fill it directly
					target = shapeArray.get(fntFilledShape) || {
						uv: [],
						pos: []
					};

					shapeArray.set(fntFilledShape, target);
					preFilledShape = fntFilledShape;
				}

				this._emitCharFNT (target, charGlyph, x, y);

				x += charGlyph.char_width * size_multiply;
			}

			/*
			todo Generate underline for regular shape

			const half_thickness: number = 0.25 * tf.internalScale.y;
			const topY: number = y + this.getUnderLineHeight() + half_thickness;
			const bottomY: number = y + this.getUnderLineHeight() - half_thickness;

			if (tf.selectable && newFormat.underline && (startWord + 1) < tf.words.length) {
				const underBuff = new Float32Array(12);

				underBuff[0] = start_x;
				underBuff[1] = bottomY;
				underBuff[2] = start_x;
				underBuff[3] = topY;
				underBuff[4] = x;
				underBuff[5] = topY;
				underBuff[6] = x;
				underBuff[7] = topY;
				underBuff[8] = x;
				underBuff[9] = bottomY;
				underBuff[10] = start_x;
				underBuff[11] = bottomY;

				underlines.push(underBuff);
			}
			*/

		} // for word

		// oh, es5... iterating over map won't working
		const shapes = Array.from(shapeArray.keys());

		for (const shape of shapes) {
			const values = shapeArray.get(shape);

			shape.addChunk(
				new Float32Array(values.pos),
				new Float32Array(values.uv)
			);
		}
	}

	private _emitCharFNT (
		target: {uv: number[], pos: number[]},
		charGlyph: TesselatedFontChar,
		x: number,
		y: number
	) {
		const scale = this._size_multiply;
		const size = this._font_em_size * scale;
		const rect = charGlyph.fnt_rect;
		const uv = charGlyph.fnt_uv;
		const width = charGlyph.char_width * scale;

		if (!rect) {
			// empty chars not have data
			return;
		}

		const x1 = x + width * rect.x * 20;
		const x2 = x1 + width * rect.width * 20;
		const y1 = y + size * rect.y * 20;
		const y2 = y1 + size * rect.height * 20;

		target.pos.push(
			x1, y1, x1, y2, x2, y1,
			x2, y1, x1, y2, x2, y2
		);

		target.uv.push(
			uv.x, uv.y, uv.x, uv.bottom, uv.right, uv.y,
			uv.right, uv.y, uv.x, uv.bottom, uv.right, uv.bottom
		);
	}

	public createPointGlyph_9679(): TesselatedFontChar {
		const verts: number[] = [];
		GraphicsFactoryHelper.drawElipse(
			this._font_em_size / 2, this._font_em_size / 2,
			this._font_em_size / 8, this._font_em_size / 8,
			verts, 0, 360, 5, false);

		const attributesView: AttributesView = new AttributesView(Float32Array, 2);
		attributesView.set(verts);
		const attributesBuffer: AttributesBuffer = attributesView.attributesBuffer.cloneBufferView();
		attributesView.dispose();
		const t_font_char: TesselatedFontChar = new TesselatedFontChar(attributesBuffer, null, null);
		t_font_char.char_width = this._font_em_size;
		this._font_chars.push(t_font_char);
		this._font_chars_dic['9679'] = t_font_char;
		return t_font_char;
	}

	private getCharOpenType (name: string): TesselatedFontChar {
		if (!this._opentype_font) {
			return null;
		}
		const thisGlyph = this._opentype_font.charToGlyph(String.fromCharCode(parseInt(name)));

		if (!thisGlyph) {
			return  null;
		}
		//console.log("got the glyph from opentype");
		const thisPath = thisGlyph.getPath();
		const awayPath: GraphicsPath = new GraphicsPath();
		let i = 0;
		const len = thisPath.commands.length;

		//awayPath.lineTo(0, 0);
		//awayPath.moveTo(0,0);//-100);
		//awayPath.curveTo(100, 250, 200,0);
		//awayPath.lineTo(150, 100);
		//awayPath.moveTo(0,20);
		//awayPath.curveTo(100, 270, 200,20);
		//awayPath.moveTo(0,-20);
		//awayPath.moveTo(0,-10);
		//awayPath.curveTo(100, -110, 200,-10);

		let startx: number = 0;
		let starty: number = 0;
		const y_offset = this._ascent;
		//40 = 66
		const scale = (this._opentype_font.unitsPerEm / 72);
		for (i = 0; i < len; i++) {
			const cmd = thisPath.commands[i];
			//console.log("cmd", cmd.type, cmd.x, cmd.y, cmd.x1, cmd.y1, cmd.x2, cmd.y2);
			if (cmd.type === 'M') {
				awayPath.moveTo(scale * cmd.x, scale * cmd.y + y_offset);
				startx = scale * cmd.x;
				starty = scale * cmd.y + y_offset;
			} else if (cmd.type === 'L') {
				awayPath.lineTo(scale * cmd.x, scale * cmd.y + y_offset);
			} else if (cmd.type === 'Q') {
				awayPath.curveTo(scale * cmd.x1, scale * cmd.y1 + y_offset,
					scale * cmd.x, scale * cmd.y + y_offset);
			} else if (cmd.type === 'C') {
				const mergedX = cmd.x1 + (cmd.x2 - cmd.x1) / 2;
				const mergedY = cmd.y1 + (cmd.y2 - cmd.y1) / 2;
				awayPath.curveTo(scale * cmd.x1, scale * cmd.y1 + y_offset,
					scale * mergedX, scale * mergedY + y_offset);
				awayPath.curveTo(scale * cmd.x2, scale * cmd.y2 + y_offset,
					scale * cmd.x, scale * cmd.y + y_offset);
			} else if (cmd.type === 'Z') {	awayPath.lineTo(startx, starty);}
		}

		const t_font_char = new TesselatedFontChar(null, null, awayPath);
		t_font_char.char_width = thisGlyph.advanceWidth;//(1 / thisGlyph.path.unitsPerEm * 72);
		t_font_char.fill_data = GraphicsFactoryFills.pathToAttributesBuffer(
			awayPath,
			true,
			null,
			scale * Settings.FONT_TESSELATION_QUALITY
		);
		t_font_char.lastTesselatedScale = scale;

		if (!t_font_char.fill_data) {
			if (once(this, 'tess' + name)) {
				console.debug('[TesselatedFontTable] Error:tesselating opentype glyph:',
					name.charCodeAt(0));
			}
			return null;
		}

		this._font_chars.push(t_font_char);
		this._font_chars_dic[name] = t_font_char;
	}

	public getChar(name: string | number, tesselation = true): TesselatedFontChar {
		name = '' + name;

		const fontChar: TesselatedFontChar = this._font_chars_dic[name];

		if (!tesselation && fontChar) {
			return  fontChar;
		}

		if (!fontChar) {
			if (this._opentype_font) {
				return this.getCharOpenType(name);
			}

			if (name == '9679') {
				return this.createPointGlyph_9679();
			}
		}

		// tesselation pass
		const scale = this._size_multiply;
		const qualityStepScale = Math.max(0.01, Math.round(scale * 100) / 100);

		if (fontChar.fill_data_path === null) {
			return null;
		}

		// we already has buffer with tesselation scale ratio
		if (!(fontChar.fill_data == null && fontChar.stroke_data == null)
			&& fontChar.lastTesselatedScale >= qualityStepScale
		) {
			return;
		}

		const path = fontChar.fill_data_path;

		// 	hack for messed up "X": remove the first command if it is moveTo that points to 0,0
		//	change the new first command to moveTo
		if (path.commands[0][0] == 1 && path.data[0][0] == 0 && path.data[0][1] == 0) {
			path.data[0].shift();
			path.data[0].shift();
			path.commands[0].shift();
			path.commands[0][0] = 2;
		}

		if (fontChar.fill_data) {
			// it not have dispose, but clear will drop abstraction if it exist
			fontChar.fill_data.clear();
		}

		fontChar.fill_data = GraphicsFactoryFills.pathToAttributesBuffer(
			fontChar.fill_data_path,
			true,
			null,
			qualityStepScale * Settings.FONT_TESSELATION_QUALITY
		);

		if (fontChar.lastTesselatedScale > 0) {
			console.debug(
				'[TesselatedFontTable] Retesselate char from scale:',
				fontChar.lastTesselatedScale, qualityStepScale, String.fromCharCode(+name)
			);
		}

		fontChar.lastTesselatedScale = qualityStepScale;

		if (!fontChar.fill_data) {
			if (once(this, 'tess' + name)) {
				console.debug('[TesselatedFontTable] Error:tesselating glyph:', name.charCodeAt(0));
			}
			return null;
		}

		return fontChar;
	}

	public setChar(
		name: string, char_width: number, fills_data: AttributesBuffer = null,
		stroke_data: AttributesBuffer = null, uses_curves: boolean = false,
		glyph_idx: number = 0, fill_data_path: GraphicsPath = null): void {

		char_width = Math.floor(char_width * 20) / 20;
		//console.log("adding char", name, String.fromCharCode(parseInt(name)));
		if ((fills_data == null) && (stroke_data == null) && (fill_data_path == null))
			throw (`TesselatedFontTable: trying to create a TesselatedFontChar with no data 
				(fills_data, stroke_data and fill_data_path is null)`);
		if (this._font_chars.length > 0) {
			if (uses_curves != this._usesCurves) {
				throw (`TesselatedFontTable: Can not set different types of graphic-glyphs
					(curves vs non-cuves) on the same FontTable!`);
			}
		} else {
			this._usesCurves = uses_curves;
		}
		const t_font_char: TesselatedFontChar = new TesselatedFontChar(fills_data, stroke_data, fill_data_path);
		t_font_char.char_width = char_width;
		t_font_char.glyph_idx = glyph_idx;
		t_font_char.name = name;
		this._glyphIdxToChar[glyph_idx] = t_font_char;

		this._font_chars.push(t_font_char);
		this._font_chars_dic[name] = t_font_char;
	}

	private _fillBuffer(
		buffer: Float32Array,
		chars: ICharEntry[],
		selection: boolean = false
	): number {

		const scale = this._size_multiply;

		let offset = 0;
		for (const entry of chars) {
			if (entry.selected !== selection) {
				continue;
			}

			const { x, y, char } = entry;
			const view = new Float32Array(char.fill_data.buffer);
			const count = view.length;

			for (let v = 0; v < count; v += 2) {
				buffer[offset + v + 0] = view[v + 0] * scale + x;
				buffer[offset + v + 1] = view[v + 1] * scale + y;
			}

			offset += view.length;
		}

		return offset;
	}
}