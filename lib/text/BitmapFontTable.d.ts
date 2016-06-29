import { AssetBase } from "@awayjs/core/lib/library/AssetBase";
import { BitmapFontChar } from "../text/BitmapFontChar";
import { IFontTable } from "../text/IFontTable";
import { BitmapImage2D } from "@awayjs/core/lib/image/BitmapImage2D";
/**
 * GraphicBase wraps a TriangleElements as a scene graph instantiation. A GraphicBase is owned by a Sprite object.
 *
 *
 * @see away.base.TriangleElements
 * @see away.entities.Sprite
 *
 * @class away.base.GraphicBase
 */
export declare class BitmapFontTable extends AssetBase implements IFontTable {
    static assetType: string;
    private _font_chars;
    _init_size: number;
    _current_size: number;
    _size_multiply: number;
    private _bitmap_pages;
    _font_chars_dic: Object;
    private _font_em_size;
    private _whitespace_width;
    private _offset_x;
    private _offset_y;
    private _ascent;
    private _descent;
    private _charDictDirty;
    /**
     * Creates a new TesselatedFont object
     */
    constructor();
    readonly assetType: string;
    initFontSize(font_size: number): void;
    getCharDataCanvas(char_code: string): Array<number>;
    getCharData(char_code: string): Array<number>;
    getCharVertCnt(char_code: string): number;
    getCharWidth(char_code: string): number;
    getLineHeight(): number;
    /**
     *
     */
    dispose(): void;
    add_page(image: BitmapImage2D): void;
    get_page(idx?: number): BitmapImage2D;
    ascent: number;
    descent: number;
    offset_x: number;
    offset_y: number;
    get_font_chars(): Array<BitmapFontChar>;
    get_font_em_size(): number;
    set_whitespace_width(value: number): void;
    get_whitespace_width(): number;
    set_font_em_size(font_em_size: number): void;
    /**
     *
     */
    getChar(name: string): BitmapFontChar;
    /**
     *
     */
    setChar(id: string, x: number, y: number, width: number, height: number, xoff: number, yoff: number, xadv: number, page: number, channel: number): void;
}
