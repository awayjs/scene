import { IAsset } from "@awayjs/core/lib/library/IAsset";
/**
 */
export interface IFontTable extends IAsset {
    initFontSize(font_size: number): any;
    getCharWidth(char_code: string): any;
    getCharVertCnt(char_code: string): any;
    getLineHeight(): any;
}
