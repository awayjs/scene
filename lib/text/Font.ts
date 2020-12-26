import { AssetBase } from '@awayjs/core';

import { IFontTable } from './IFontTable';
import { TesselatedFontTable } from './TesselatedFontTable';
import { BitmapFontTable } from './BitmapFontTable';
import { FontStyleName } from './FontStyleName';
/**
 * Font is a container for FontTables.
 *
 *
 *
 */
export class Font extends AssetBase {
	public static assetType: string = '[asset Font]';

	private static _emptyFontTable: TesselatedFontTable;
	public static get emptyFontTable(): TesselatedFontTable {
		if (!this._emptyFontTable) {
			this._emptyFontTable = new TesselatedFontTable();
		}
		return this._emptyFontTable;
	}

	private _font_styles: StringMap<IFontTable> = {};

	/**
   * Creates a new TesselatedFont object
   */
	constructor() {
		super();
	}

	public fontName: string = null;
	public regularFontStyle: IFontTable = null;

	// ------------ dummys for as3web:

	public static registerFont(any) {}
	// ------------
	public get font_styles(): StringMap<IFontTable> {
		return this._font_styles;
	}

	/**
   *
   */
	public get assetType(): string {
		return Font.assetType;
	}

	/**
   *
   */
	public dispose(): void {
		for (const key in this._font_styles) {
			this._font_styles[key].dispose();
		}
		this._font_styles = null;
	}

	public replace_font_table(style_name: FontStyleName, table: IFontTable) {
		this._font_styles[style_name] = table;
	}

	public create_font_table(
		style_name: FontStyleName,
		assetType: string = TesselatedFontTable.assetType,
		openTypeFont: any = null): IFontTable {

		const existingTable = this.get_font_table(style_name, assetType, openTypeFont);
		if (existingTable) {
			console.warn(`[Font] - create_font_table - ${style_name} - already exists`);
		}

		let font_style: IFontTable = null;
		if (assetType == TesselatedFontTable.assetType) {
			font_style = new TesselatedFontTable(openTypeFont);
		} else if (assetType == BitmapFontTable.assetType) {
			font_style = new BitmapFontTable();
		}
		font_style.name = style_name;
		font_style.font = this;
		this._font_styles[style_name] = font_style;
		return font_style;
	}

	/**
   *Get a font-table for a specific name, or create one if it does not exists.
   */
	public get_font_table(
		style_name: FontStyleName,
		assetType: string = TesselatedFontTable.assetType,
		openTypeFont: any = null,
		returnDifferentStyle: boolean = false
	): IFontTable {

		const table = this._font_styles[style_name];
		if (table) {
			if (table.assetType != assetType) {
				throw ('[Font] - get_font_table - existing table has wrong assetType');
			}
			return table;
		}
		console.log("font style not found return different");
		if (returnDifferentStyle && Object.keys(this._font_styles).length > 0) {
			for (const key in this._font_styles){
				
				console.log("font style not found return different", key);
				return this._font_styles[key];
			}
		}
		return null;
	}
}
