import {IAsset} from "@awayjs/core";
import {TextField} from "../display/TextField";
import {TextFormat} from "./TextFormat";
/**
 */
export interface IFontTable extends IAsset
{
	font:any;
	getGlyphCount():number;
	initFontSize(font_size:number);
	fallbackTable:IFontTable;
	getCharWidth(char_code:string);
	hasChar(char_code:string);
	getCharVertCnt(char_code:string);
	getLineHeight();
	fillTextRun(tf:TextField, format:TextFormat, startWord:number, wordCnt:number);
	
}