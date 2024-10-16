import { AssetBase } from '@awayjs/core';
import { IMaterial } from '@awayjs/renderer';
import { IFontTable } from './IFontTable';
import { FontStyleName } from './FontStyleName';
import { TextFormatAlign } from './TextFormatAlign';
import { Font } from './Font';
import { TesselatedFontTable } from './TesselatedFontTable';
import { DefaultFontManager } from '../managers/DefaultFontManager';
import { FontLookUpMode } from './FontLookUpMode';
import { DeviceFontManager } from '../managers/DeviceFontManager';

/**
 * The TextFormat class represents character formatting information. Use the
 * TextFormat class to create specific text formatting for text fields. You
 * can apply text formatting to both static and dynamic text fields. The
 * properties of the TextFormat class apply to device and embedded fonts.
 * However, for embedded fonts, bold and italic text actually require specific
 * fonts. If you want to display bold or italic text with an embedded font,
 * you need to embed the bold and italic variations of that font.
 *
 * <p> You must use the constructor <code>new TextFormat()</code> to create a
 * TextFormat object before setting its properties. When you apply a
 * TextFormat object to a text field using the
 * <code>TextField.defaultTextFormat</code> property or the
 * <code>TextField.setTextFormat()</code> method, only its defined properties
 * are applied. Use the <code>TextField.defaultTextFormat</code> property to
 * apply formatting BEFORE you add text to the <code>TextField</code>, and the
 * <code>setTextFormat()</code> method to add formatting AFTER you add text to
 * the <code>TextField</code>. The TextFormat properties are <code>null</code>
 * by default because if you don't provide values for the properties, Flash
 * Player uses its own default formatting. The default formatting that Flash
 * Player uses for each property(if property's value is <code>null</code>) is
 * as follows:</p>
 *
 * <p>The default formatting for each property is also described in each
 * property description.</p>
 */

const PUBLIC_FIELDS = [
	'font', 'align', 'leftMargin',
	'rightMargin', 'indent',
	'size', 'color',
	'bold', 'italic',
	'underline', 'leading',
	'letterSpacing'
];

export class TextFormat extends AssetBase {
	public static assetType: string = '[asset TextFormat]';

	public fontLookUpMode: FontLookUpMode = FontLookUpMode.DEFAULT;

	// flag marked that format is changed.
	_updateID: number = 0;
	public get updateID() {
		return this._updateID;
	}

	private _fontTableDirty: boolean = true;
	/**
     * return true if a certain property was set for this format.
     *
     * @param property_name
     */
	public hasPropertySet(property_name: string) {
		return this['_' + property_name] !== null;
	}

	/**
     * paragraph props
     * the textformat on the first char of a paragraph will be used for all the chars in the paragrahp
     * */

	/**
	 * Indicates the alignment of the paragraph. Valid values are TextFormatAlign
	 * constants.
	 *
	 * @default TextFormatAlign.LEFT
	 * @throws ArgumentError The <code>align</code> specified is not a member of
	 *                       flash.text.TextFormatAlign.
	 */
	private _align: string;
	public get align(): string {
		return this._align ? this._align : TextFormatAlign.LEFT;
	}

	public set align(value: string) {
		if (this._align !== value) {
			this._updateID++;
		}

		this._align = value;
	}

	/**
	 * Indicates the block indentation in pixels. Block indentation is applied to
	 * an entire block of text; that is, to all lines of the text. In contrast,
	 * normal indentation(<code>TextFormat.indent</code>) affects only the first
	 * line of each paragraph. If this property is <code>null</code>, the
	 * TextFormat object does not specify block indentation(block indentation is
	 * 0).
	 */
	//todo: not used with in tesselated-font-table yet (flash-pro offers this as paragraph-properties)
	private _blockIndent: number;
	public get blockIndent(): number {
		return this._blockIndent ? this._blockIndent : 0;
	}

	public set blockIndent(value: number) {
		if (this._blockIndent !== value) {
			this._updateID++;
		}

		this._blockIndent = value;
	}

	/**
	 * The left margin of the paragraph, in pixels. The default value is
	 * <code>null</code>, which indicates that the left margin is 0 pixels.
	 */
	//todo: not used with in tesselated-font-table yet (flash-pro offers this as paragraph-properties)
	private _leftMargin: number;
	public get leftMargin(): number {
		return this._leftMargin ? this._leftMargin : 0;
	}

	public set leftMargin(value: number) {
		if (value !== this._leftMargin) {
			this._updateID++;
		}

		this._leftMargin = value;
	}

	/**
	 * The right margin of the paragraph, in pixels. The default value is
	 * <code>null</code>, which indicates that the right margin is 0 pixels.
	 */
	//todo: not used with in tesselated-font-table yet (flash-pro offers this as paragraph-properties)
	private _rightMargin: number;
	public get rightMargin(): number {
		return this._rightMargin ? this._rightMargin : 0;
	}

	public set rightMargin(value: number) {
		if (value !== this._rightMargin) {
			this._updateID++;
		}

		this._rightMargin = value;
	}

	/**
	 * Indicates the indentation from the left margin to the first character in
	 * the paragraph. The default value is <code>null</code>, which indicates
	 * that no indentation is used.
	 */
	//todo: not used with in tesselated-font-table yet (flash-pro offers this as paragraph-properties)
	private _indent: number;
	public get indent(): number {
		return this._indent ? this._indent : 0;
	}

	public set indent(value: number) {
		if (value !== this._indent) {
			this._updateID++;
		}

		this._indent = value;
	}

	/**
     * character props
     * these properties can actually be assigned to individual chars inside a paragraph
     * */

	/**
	 * Indicates the color of the text. A number containing three 8-bit RGB
	 * components; for example, 0xFF0000 is red, and 0x00FF00 is green. The
	 * default value is <code>null</code>, which means that Flash Player uses the
	 * color black(0x000000).
	 */
	private _color: number;
	public get color(): number {
		return (this._color !== null) ? this._color : 0x000000;
	}

	public set color(value: number) {
		if (value !== this._color) {
			this._updateID++;
		}

		this._color = value;
	}

	/**
	 * A Boolean value that indicates whether kerning is enabled
	 * (<code>true</code>) or disabled(<code>false</code>). Kerning adjusts the
	 * pixels between certain character pairs to improve readability, and should
	 * be used only when necessary, such as with headings in large fonts. Kerning
	 * is supported for embedded fonts only.
	 *
	 * <p>Certain fonts such as Verdana and monospaced fonts, such as Courier
	 * New, do not support kerning.</p>
	 *
	 * <p>The default value is <code>null</code>, which means that kerning is not
	 * enabled.</p>
	 */
	private _kerning: boolean;
	public get kerning(): boolean {
		return this._kerning ? this._kerning : false;
	}

	public set kerning(value: boolean) {
		if (value !== this._kerning) {
			this._updateID++;
		}

		this._kerning = value;
	}

	/**
	 * An integer representing the amount of vertical space(called
	 * <i>leading</i>) between lines. The default value is <code>null</code>,
	 * which indicates that the amount of leading used is 0.
	 */
	private _leading: number;
	public get leading(): number {
		return this._leading ? this._leading : 0;
	}

	public set leading(value: number) {
		if (value !== this._leading) {
			this._updateID++;
		}

		this._leading = value;
	}

	/**
	 * A number representing the amount of space that is uniformly distributed
	 * between all characters. The value specifies the number of pixels that are
	 * added to the advance after each character. The default value is
	 * <code>null</code>, which means that 0 pixels of letter spacing is used.
	 * You can use decimal values such as <code>1.75</code>.
	 */
	private _letterSpacing: number;
	public get letterSpacing(): number {
		return this._letterSpacing ? this._letterSpacing : 0;
	}

	public set letterSpacing(value: number) {
		if (value !== this._letterSpacing) {
			this._updateID++;
		}

		this._letterSpacing = value;
	}

	/**
	 * The size in pixels of text in this text format. The default value is
	 * <code>null</code>, which means that a size of 12 is used.
	 */
	private _size: number;
	public get size(): number {
		return this._size ? this._size : 12;
	}

	public set size(value: number) {
		if (value !== this._size) {
			this._updateID++;
		}

		this._size = value;
	}

	/**
     * props for defining font and font-style
     * */

	/**
	 * Specifies whether the text is boldface. The default value is
	 * <code>null</code>, which means no boldface is used. If the value is
	 * <code>true</code>, then the text is boldface.
	 */
	private _bold: boolean;
	public get bold(): boolean {
		return this._bold ? this._bold : false;
	}

	public set bold(value: boolean) {
		if (value !== this._bold) {
			this._updateID++;
		}

		this._bold = value;
		this._fontTableDirty = true;

	}

	/**
	 * Indicates whether text in this text format is italicized. The default
	 * value is <code>null</code>, which means no italics are used.
	 */
	private _italic: boolean;
	public get italic(): boolean {
		return this._italic ? this._italic : false;
	}

	public set italic(value: boolean) {
		if (value !== this._italic) {
			this._updateID++;
		}

		this._italic = value;
		this._fontTableDirty = true;
	}

	/**
	 * Indicates whether the text that uses this text format is underlined
	 * (<code>true</code>) or not(<code>false</code>). This underlining is
	 * similar to that produced by the <code><U></code> tag, but the latter is
	 * not true underlining, because it does not skip descenders correctly. The
	 * default value is <code>null</code>, which indicates that underlining is
	 * not used.
	 */
	private _underline: boolean;
	public get underline(): boolean {
		return this._underline ? this._underline : false;
	}

	public set underline(value: boolean) {
		if (value !== this._underline) {
			this._updateID++;
		}

		this._underline = value;
	}

	/**
	 * The name of the font-style for text in this text format, as a string.
	 * To be valid, for use with curve-rendering, the textFormat must have a Font-table assigned.
	 * The font-style can be used to get a Font-table, from a Font-object.
	 */
	/**
	 * The font-table that provides the subgeos for the chars
	 */
	private _font_table: IFontTable;
	public get font_table(): IFontTable {

		if (!this._font_table || this._fontTableDirty)
			this.update_font_table();

		return this._font_table;
	}

	public set font_table(value: IFontTable) {
		// setting fonttable does not change bold / izalic
		// font_table is only ever set in parser or when using label-data
		// after using "bold" or "itaic" font_table should never be set directly
		this._font_table = value;
		this._fontTableDirty = false;
	}

	/**
	 * The material to use for texturing geometry generated for this text-format.
	 * this material will be used by the TextField
	 */
	public material: IMaterial;

	/**
	 * The uv-values of the colors in textureatlas.
	 * The lenght migth be 4 in future to support bitmap-fills and gradients, but for now it will should always be 2
	 */
	public uv_values: Array<number>;

	/**
	 * The name of the font for text in this text format, as a string.
	 * To be valid, for use with curve-rendering, the textFormat must have a Font-table assigned.
	 * The font-name can be used to get a Font-object from the AssetLibrary.
	 * A Font object provides a list of Font-table, corresponding to font-table names.
	 */
	private _font: Font;

	public get font_name(): string {
		return this.font?.name;
	}

	public set font_name(value: string) {
		if (this.font?.name == value)
			return;

		if (this.fontLookUpMode == FontLookUpMode.DEFAULT) {
			this._font = DefaultFontManager.getFont(value);
		} else if (this.fontLookUpMode == FontLookUpMode.DEVICE) {
			this._font = DeviceFontManager.getDeviceFont(value);
		} else if (this.fontLookUpMode == FontLookUpMode.EMBED_CFF) {
			this._font = DefaultFontManager.getFont_CFF(value);
		}

		this._fontTableDirty = true;
		this._updateID++;
	}

	public update_font_table() {

		this._fontTableDirty = false;
		let stylename = FontStyleName.STANDART;
		if (this._italic && !this._bold)
			stylename = FontStyleName.ITALIC;
		else if (!this._italic && this._bold)
			stylename = FontStyleName.BOLD;
		else if (this._italic && this._bold)
			stylename = FontStyleName.BOLDITALIC;

		if (this._font) {
			const font_table = this._font.get_font_table(stylename, TesselatedFontTable.assetType, null, true);

			// if we have a font-table, and we switch to invalid style,
			// we just keep the existing font-table
			if (this._font_table && !font_table)
				return;

			this._font_table = font_table ? font_table : Font.emptyFontTable;
		}
	}

	public get font(): Font {
		return this._font;
	}

	public set font(value: Font) {
		if (this._font == value)
			return;

		this._font = value;

		this._fontTableDirty = true;
		this._updateID++;
	}

	/**
	 * Specifies custom tab stops as an array of non-negative integers. Each tab
	 * stop is specified in pixels. If custom tab stops are not specified
	 * (<code>null</code>), the default tab stop is 4(average character width).
	 */
	//todo: not used with in tesselated-font-table yet
	public tabStops: Array<number /*int*/> = [];

	/**
	 * Indicates that the text is part of a bulleted list. In a bulleted list,
	 * each paragraph of text is indented. To the left of the first line of each
	 * paragraph, a bullet symbol is displayed. The default value is
	 * <code>null</code>, which means no bulleted list is used.
	 */
	//todo: not used with in tesselated-font-table yet (flash-pro does not output this directly)
	public bullet: boolean;

	/**
	 * Indicates the target window where the hyperlink is displayed. If the
	 * target window is an empty string, the text is displayed in the default
	 * target window <code>_self</code>. You can choose a custom name or one of
	 * the following four names: <code>_self</code> specifies the current frame
	 * in the current window, <code>_blank</code> specifies a new window,
	 * <code>_parent</code> specifies the parent of the current frame, and
	 * <code>_top</code> specifies the top-level frame in the current window. If
	 * the <code>TextFormat.url</code> property is an empty string or
	 * <code>null</code>, you can get or set this property, but the property will
	 * have no effect.
	 */
	//todo: not used with in tesselated-font-table yet
	public link_target: string;

	/**
	 * Indicates the target URL for the text in this text format. If the
	 * <code>url</code> property is an empty string, the text does not have a
	 * hyperlink. The default value is <code>null</code>, which indicates that
	 * the text does not have a hyperlink.
	 *
	 * <p><b>Note:</b> The text with the assigned text format must be set with
	 * the <code>htmlText</code> property for the hyperlink to work.</p>
	 */
	//todo: not used with in tesselated-font-table yet
	public url: string;

	/**
	 * Creates a TextFormat object with the specified properties. You can then
	 * change the properties of the TextFormat object to change the formatting of
	 * text fields.
	 *
	 * <p>Any parameter may be set to <code>null</code> to indicate that it is
	 * not defined. All of the parameters are optional; any omitted parameters
	 * are treated as <code>null</code>.</p>
	 *
	 * @param font        The name of a font for text as a string.
	 * @param size        An integer that indicates the size in pixels.
	 * @param color       The color of text using this text format. A number
	 *                    containing three 8-bit RGB components; for example,
	 *                    0xFF0000 is red, and 0x00FF00 is green.
	 * @param bold        A Boolean value that indicates whether the text is
	 *                    boldface.
	 * @param italic      A Boolean value that indicates whether the text is
	 *                    italicized.
	 * @param underline   A Boolean value that indicates whether the text is
	 *                    underlined.
	 * @param url         The URL to which the text in this text format
	 *                    hyperlinks. If <code>url</code> is an empty string, the
	 *                    text does not have a hyperlink.
	 * @param target      The target window where the hyperlink is displayed. If
	 *                    the target window is an empty string, the text is
	 *                    displayed in the default target window
	 *                    <code>_self</code>. If the <code>url</code> parameter
	 *                    is set to an empty string or to the value
	 *                    <code>null</code>, you can get or set this property,
	 *                    but the property will have no effect.
	 * @param align       The alignment of the paragraph, as a TextFormatAlign
	 *                    value.
	 * @param leftMargin  Indicates the left margin of the paragraph, in pixels.
	 * @param rightMargin Indicates the right margin of the paragraph, in pixels.
	 * @param indent      An integer that indicates the indentation from the left
	 *                    margin to the first character in the paragraph.
	 * @param leading     A number that indicates the amount of leading vertical
	 *                    space between lines.
	 */
	constructor(
		font: Font | string = '_sans', size: number = null, color: number = null, bold: boolean = null,
		italic: boolean = null, underline: boolean = null, url: string = null,
		link_target: string = null, align: string = null,
		leftMargin: number = null, rightMargin: number = null, indent: number = null, leading: number = null) {
		super();

		this._size = size;
		this._color = color;
		this._bold = bold;
		this._italic = italic;
		this._underline = underline;
		this.url = url; // not really used yet
		this.link_target = link_target; // not really used yet
		this._align = align;
		this._leftMargin = leftMargin;
		this._rightMargin = rightMargin;
		this._indent = indent;
		this._leading = leading;

		if (typeof font === 'string') {
			this.font_name = font;
		} else  {
			this.font = font;
		}
	}

	public clone(): TextFormat {
		const clonedFormat: TextFormat = new TextFormat(
			this._font, this._size, this._color, this._bold,
			this._italic, this._underline,this.url, this.link_target,
			this._align, this._leftMargin, this._rightMargin, this._indent, this._leading);
		clonedFormat.font_table = this._font_table; //investigate why this needs to be copied
		return clonedFormat;
	}

	public equal(format: TextFormat) {
		for (const field of PUBLIC_FIELDS) {
			if (this[field] !== format[field]) {
				return false;
			}
		}

		return true;
	}

	public applyToFormat(format: TextFormat): boolean {

		let change = false;
		for (const field of PUBLIC_FIELDS) {
			if (this['_' + field] !== null && format[field] !== this['_' + field]) {
				change = true;
				format[field] = this['_' + field];
			}
		}
		return change;
	}

	/**
	 * Merge this format with other format by this rules:
	 * if both formats have same property-valu8e, property value persists
	 * if both formats have different property-value, property-value becomes null
	 * Used by Textfield.getTextFormat
	 * @param format
	 */
	public mergeFormat(format: TextFormat) {
		for (const field of PUBLIC_FIELDS) {
			if (this['_' + field] !== format[field]) {
				this['_' + field] = null;
			}
		}
	}

	/**
	 *
	 */
	public get assetType(): string {
		return TextFormat.assetType;
	}
}