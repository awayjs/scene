import { AssetBase } from "@awayjs/core/lib/library/AssetBase";
import { IFontTable } from "../text/IFontTable";
/**
 * Font is a container for FontTables.
 *
 *
 *
 */
export declare class Font extends AssetBase {
    static assetType: string;
    private _font_styles;
    /**
     * Creates a new TesselatedFont object
     */
    constructor();
    readonly font_styles: Array<IFontTable>;
    /**
     *
     */
    readonly assetType: string;
    /**
     *
     */
    dispose(): void;
    /**
     *Get a font-table for a specific name, or create one if it does not exists.
     */
    get_font_table(style_name: string, assetType?: string, openTypeFont?: any): IFontTable;
}
