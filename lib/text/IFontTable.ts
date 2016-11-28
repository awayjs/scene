import {IAsset} from "@awayjs/core";

/**
 */
export interface IFontTable extends IAsset
{
	initFontSize(font_size:number);
	fallbackTable:IFontTable;
	getCharWidth(char_code:string);
	hasChar(char_code:string);
	getCharVertCnt(char_code:string);
	getLineHeight();
	
}