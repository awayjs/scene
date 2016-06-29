import { AssetBase } from "@awayjs/core/lib/library/AssetBase";
import { TesselatedFontChar } from "../text/TesselatedFontChar";
import { IFontTable } from "../text/IFontTable";
import { AttributesBuffer } from "@awayjs/core/lib/attributes/AttributesBuffer";
/**
 * GraphicBase wraps a TriangleElements as a scene graph instantiation. A GraphicBase is owned by a Sprite object.
 *
 *
 * @see away.base.TriangleElements
 * @see away.entities.Sprite
 *
 * @class away.base.GraphicBase
 */
export declare class TesselatedFontTable extends AssetBase implements IFontTable {
    static assetType: string;
    private _font_chars;
    _font_chars_dic: Object;
    private _font_em_size;
    private _whitespace_width;
    private _offset_x;
    private _offset_y;
    private _ascent;
    private _descent;
    _current_size: number;
    _size_multiply: number;
    private _charDictDirty;
    private _opentype_font;
    /**
     * Creates a new TesselatedFont object
     * If a opentype_font object is passed, the chars will get tessellated whenever requested.
     * If no opentype font object is passed, it is expected that tesselated chars
     */
    constructor(opentype_font?: any);
    changeOpenTypeFont(newOpenTypeFont: any, tesselateAllOld?: boolean): void;
    initFontSize(font_size: number): void;
    getCharVertCnt(char_code: string): number;
    getCharWidth(char_code: string): number;
    getLineHeight(): number;
    readonly assetType: string;
    /**
     *
     */
    dispose(): void;
    ascent: number;
    descent: number;
    offset_x: number;
    offset_y: number;
    get_font_chars(): Array<TesselatedFontChar>;
    get_font_em_size(): number;
    set_whitespace_width(value: number): void;
    get_whitespace_width(): number;
    set_font_em_size(font_em_size: number): void;
    /**
     *
     */
    getChar(name: string): TesselatedFontChar;
    /**
     *
     */
    setChar(name: string, char_width: number, fills_data?: AttributesBuffer, stroke_data?: AttributesBuffer): void;
    buildTextRuns(textRuns: Array<Array<number>>, output_verts: Array<Array<number>>): void;
}
