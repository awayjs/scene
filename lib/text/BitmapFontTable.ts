import {AssetBase} from "@awayjs/core";

import {IMaterial} from "@awayjs/renderer";

import {BitmapFontChar} from "./BitmapFontChar";
import {IFontTable} from "./IFontTable";
import {TextFormat} from "./TextFormat";
import {TextField} from "../display/TextField";

/**
 * GraphicBase wraps a TriangleElements as a scene graph instantiation. A GraphicBase is owned by a Sprite object.
 *
 *
 * @see away.base.TriangleElements
 * @see away.entities.Sprite
 *
 * @class away.base.GraphicBase
 */
export class BitmapFontTable extends AssetBase implements IFontTable
{
	public static assetType:string = "[asset BitmapFontTable]";
	private _font_chars:Array<BitmapFontChar>;
	public _init_size:number;
	public _current_size:number;
	public _size_multiply:number;
	private _materials:Array<IMaterial>;
	public _font_chars_dic:Object;
	private _font_em_size:number;
	private _whitespace_width:number;
	private _offset_x:number;
	private _offset_y:number;
	private _ascent:number;
	private _descent:number;
	private _texture_width:number;
	private _texture_height:number;
	private _charDictDirty:Boolean;
	public font:any;
	public fallbackTable:IFontTable;
	public _adjust_size:number;

	/**
	 * Creates a new TesselatedFont object
	 */
	constructor()
	{
		super();
		this._font_chars = [];
		this._materials = [];
		this._font_chars_dic = new Object();
		this._ascent=0;
		this._descent=0;
		this._current_size=0;
		this._size_multiply=0;
		this._init_size=0;
		this._texture_width=0;
		this._texture_height=0;
		this._adjust_size=0;
	}

	public getGlyphCount():number{
        return this._font_chars.length;
    }
	public get assetType():string
	{
		return BitmapFontTable.assetType;
	}

	public initFontSize(font_size:number)
	{
		if(this.fallbackTable)
			this.fallbackTable.initFontSize(font_size);
		if(this._adjust_size)
			font_size*=this._adjust_size;
		if(this._current_size==font_size) return;
		this._current_size = font_size;
		this._size_multiply= font_size/this._init_size;
	}

	public getCharDataCanvas(char_code:string):Array<number>
	{
		var this_char:BitmapFontChar=this._font_chars_dic[char_code];
		if(this_char){
			//console.log("this_char found");
			return [this_char.x, this_char.y, this_char.width, this_char.height, this_char.x_offset*this._size_multiply, this_char.y_offset*this._size_multiply];
		}
		//console.log("this_char not found" + char_code);
		return [];
	}
	public getCharData(char_code:string):Array<number>
	{
		var this_char:BitmapFontChar=this._font_chars_dic[char_code];
		if(this_char){
			var realheight:number=(this_char.height/this._init_size)*this._current_size;
			var realWidth:number=(this_char.width/this._init_size)*this._current_size;
			//console.log("this_char found");
			return [this_char.x/this._texture_width, this_char.y/this._texture_height, this_char.width/this._texture_width, this_char.height/this._texture_height, this_char.x_offset*this._size_multiply, this_char.y_offset*this._size_multiply, realheight, realWidth];
		}
		//console.log("this_char not found" + char_code);
		return [];
	}
	public getCharVertCnt(char_code:string):number
	{
		return 6*4;
	}

	get texture_width():number {
		return this._texture_width;
	}

	set texture_width(value:number){
		this._texture_width=value;
	}
	get texture_height():number {
		return this._texture_height;
	}

	set texture_height(value:number){
		this._texture_height=value;
	}

	public hasChar(char_code:string):boolean
	{
		return this._font_chars_dic[char_code]!=null;
	}
	public getCharWidth(char_code:string):number
	{
		var this_char:BitmapFontChar=this._font_chars_dic[char_code];
		if(this_char)
			return this._size_multiply*(this_char.x_advance);
		return 0;

	}

	public fillTextRun(tf:TextField, format:TextFormat, startWord:number, wordCnt:number) {


	}

	public getLineHeight():number
	{
		return this._current_size;
	}

	/**
	 *
	 */
	public dispose()
	{

		var len:number = this._materials.length;
		for (var i:number = 0; i < len; ++i) {
			this._materials[i].dispose();
		}
		this._materials.length=0;
		this._font_chars.length=0;
		this._font_chars_dic=null;

	}
	
	public addMaterial(material:IMaterial)
	{
		this._materials.push(material);
	}
	
	public getMaterial(idx:number=0):IMaterial
	{
		return this._materials[idx];
	}
	
	get ascent():number {
		return this._ascent;
	}

	set ascent(value:number){
		this._ascent=value;
	}
	get descent():number {
		return this._descent;
	}

	set descent(value:number){
		this._descent=value;
	}

	get offset_x():number {
		return this._offset_x;
	}

	set offset_x(value:number){
		this._offset_x=value;
	}
	get offset_y():number {
		return this._offset_y;
	}

	set offset_y(value:number){
		this._offset_y=value;
	}
	public get_font_chars():Array<BitmapFontChar>
	{
		return this._font_chars
	}
	public get_font_em_size():number
	{
		return this._font_em_size
	}
	public set_whitespace_width(value:number):void
	{
		this._whitespace_width=value;
	}
	public get_whitespace_width():number
	{
		return this._whitespace_width
	}
	public set_font_em_size(font_em_size:number):void
	{
		this._font_em_size=font_em_size;
	}
	/**
	 *
	 */
	public getChar(name:string):BitmapFontChar
	{
		return this._font_chars_dic[name];
	}
	/**
	 *
	 */
	public setChar(id:string, x:number,y:number, width:number,  height:number, xoff:number, yoff:number, xadv:number, page:number, channel: number):void
	{
		var bitmap_font_char:BitmapFontChar = new BitmapFontChar(id, x, y, width, height, xoff, yoff, xadv, page, channel);
		this._font_chars.push(bitmap_font_char);
		this._font_chars_dic[id]=bitmap_font_char;
	}

}