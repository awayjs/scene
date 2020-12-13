import { TesselatedFontTable } from '../text/TesselatedFontTable';
import { Font } from '../text/Font';
import { AssetBase } from '@awayjs/core';
import { FontStyleName } from '../text/FontStyleName';
import { IFontTable } from '../text/IFontTable';
export class DefaultFontManager {
	private static _default_font: Font;
	private static _registered_fonts: any = {};
	private static _registered_fonts_by_className: any = {};
	private static _namespaces: string[] = [];

	public static shared_fonts_ns: string;

	public static deviceFont: Font=null;

	public static getDefaultFont(): Font {
		if (!this._default_font) {
			this.setDefaultFont();
		}

		return this._default_font;
	}

	public static applySharedFonts(ns: string) {
		if (ns === this.shared_fonts_ns) {
			return;
		}

		if (!this._registered_fonts[ns]) {
			this._registered_fonts[ns] = {};
		}

		if (!this._registered_fonts[this.shared_fonts_ns]) {
			this._registered_fonts[this.shared_fonts_ns] = {};
		}

		if (!this._default_font) {
			if (this._registered_fonts[this.shared_fonts_ns]['arial']) {
				this._default_font = this._registered_fonts[this.shared_fonts_ns]['arial'];
			}
		}

		const fontsInSharedSWF = this._registered_fonts[this.shared_fonts_ns];
		for (const key in fontsInSharedSWF) {
			if (!this._registered_fonts[ns][key]) {
				this._registered_fonts[ns][key] = fontsInSharedSWF[key];
			} else {
				const len = this._registered_fonts[this.shared_fonts_ns][key].font_styles.length;

				for (let i = 0; i < len; i++) {
					const fontStyle = this._registered_fonts[this.shared_fonts_ns][key].font_styles[i];
					const oldTable = this._registered_fonts[ns][key].get_font_table(fontStyle.name, TesselatedFontTable.assetType, null, false);

					if (!oldTable) {
						this._registered_fonts[ns][key].font_styles.push(fontStyle);
					} else if (!oldTable.getGlyphCount()) {
						this._registered_fonts[ns][key].replace_font_table(fontStyle.name, fontStyle);
					}
				}
			}

			if (this._registered_fonts[ns][key].font) {
				this._registered_fonts[ns][key] = fontsInSharedSWF[key];
			}
		}
	}

	public static defineFont(fontName: string, ns: string = AssetBase.DEFAULT_NAMESPACE) {
		this._registered_fonts || (this._registered_fonts = {});
		this._registered_fonts[ns] || (this._registered_fonts[ns] = {});

		//console.warn("defineFont", fontName, ns);
		// stop grouping by fontName - needed for SF
		//fontName = (fontName + '').toLowerCase().replace(/bold|italic|regular/g, '').trim();
		//const alias = fontName.replace(/ |-/g, '');

		let font: Font = this._registered_fonts[ns][fontName] ;//|| this._registered_fonts[ns][alias];

		if (font) {
			return font;
		}

		if (this._namespaces.indexOf(ns) === -1) {
			this._namespaces.push(ns);
		}

		font = new Font();
		font.name = fontName;

		if (!this._default_font) {
			//this.deviceFont = this._default_font = font;
		}

		this._registered_fonts[ns][fontName] = font;

		// stop grouping by fontName - needed for SF
		//this._registered_fonts[ns][alias] = font;

		return font;
	}

	public static registerFontForClassName(font: Font, className: string) {
		this._registered_fonts_by_className[className] = font;
	}

	public static getFont(fontName: string, namespace: string = undefined): Font {
		//console.warn("get font", fontName, DefaultFontManager._registered_fonts);
		if (!fontName) {
			return this.getDefaultFont();
		}
		// hack for dynamic fonts: first check if reguested font-name is a classname that was registered
		if (this._registered_fonts_by_className[fontName]) {
			return this._registered_fonts_by_className[fontName];
		}

		const ns = namespace || AssetBase.DEFAULT_NAMESPACE;

		// stop grouping by fontName - needed for SF
		//fontName = (fontName + '').toLowerCase().replace(/bold|italic|regular|-/g, '').trim();

		this._registered_fonts || (this._registered_fonts = {});
		this._registered_fonts[ns] || (this._registered_fonts[ns] = {});

		const font: Font = this._registered_fonts[ns][fontName];

		if (font) {
			return font;
		} else if (this._namespaces.length > 0 && !namespace) {
			// lookup over all NS
			for (const ns of this._namespaces) {
				if (this._registered_fonts[ns][fontName]) {
					return this._registered_fonts[ns][fontName];
				}
			}
		}
		//console.log("no font found for");
		return this.getDefaultFont();
	}

	public static getFontTable(fontName: string, namespace: string = undefined): IFontTable {
		if (!fontName) {
			return this.getDefaultFont().get_font_table(FontStyleName.STANDART);
		}
	}

	private static setDefaultFont(font: Font = null): void {
		this.deviceFont = this._default_font = (font || new Font());

		/*
		var allchars=[];
		//allchars[cnt1++] = ['33',[0,0,226,67,0,192,11,68,127,127,0,0,0,128,177,67,0,80,137,68,127,127,0,0,0,0,212,67,0,192,204,68,127,127,0,0,0,0,212,67,0,192,204,68,127,127,0,0,0,128,177,67,0,80,137,68,127,127,0,0,0,0,129,67,0,192,204,68,127,127,0,0,0,0,129,67,0,192,204,68,127,127,0,0,0,128,177,67,0,80,137,68,127,127,0,0,0,0,100,67,0,192,11,68,127,127,0,0,0,0,100,67,0,192,11,68,127,127,0,0,0,128,177,67,0,80,137,68,127,127,0,0,0,0,226,67,0,192,11,68,127,127,0,0,0,0,221,67,0,0,0,69,127,127,0,0,0,0,170,67,0,208,242,68,127,127,0,0,0,0,110,67,0,0,0,69,127,127,0,0,0,0,110,67,0,0,0,69,127,127,0,0,0,0,170,67,0,208,242,68,127,127,0,0,0,0,110,67,0,160,229,68,127,127,0,0,0,0,110,67,0,160,229,68,127,127,0,0,0,0,170,67,0,208,242,68,127,127,0,0,0,0,221,67,0,160,229,68,127,127,0,0,0,0,221,67,0,160,229,68,127,127,0,0,0,0,170,67,0,208,242,68,127,127,0,0,0,0,221,67,0,0,0,69,127,127]]
		var i:number=0;
		for(i=0; i<cnt1;i++){
			var vertexBuffer:AttributesBuffer = new AttributesBuffer(20, allchars[i][1].length / 20);
			vertexBuffer.bufferView = new Uint8Array(<ArrayBuffer> allchars[i][1]);

			var curve_elements:TriangleElements = new TriangleElements(vertexBuffer);

			curve_elements.setPositions(new Float2Attributes(vertexBuffer));
			curve_elements.setCustomAttributes("curves", new Float3Attributes(vertexBuffer));

			//add UVs if they exist in the data
			if (attr_count == 28)
				curve_elements.setUVs(new Float2Attributes(vertexBuffer));

			new_font_style.setChar(font_style_char.toString(), curve_elements, char_width);
			DefaultFontManager._default_font_table = new TesselatedFontTable();
		}
		*/
		//DefaultFontManager._default_font_table.
	}

	public static clearAll() {
		this._default_font = null;
		this._registered_fonts = {};
		this.shared_fonts_ns = null;
	}

}