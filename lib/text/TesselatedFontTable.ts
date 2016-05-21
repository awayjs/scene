import {AssetBase}					from "awayjs-core/lib/library/AssetBase";

import {ElementsBase}					from "../graphics/ElementsBase";
import {TriangleElements}				from "../graphics/TriangleElements";
import {TesselatedFontChar}			from "../text/TesselatedFontChar";
import {IFontTable}					from "../text/IFontTable";

/**
 * GraphicBase wraps a TriangleElements as a scene graph instantiation. A GraphicBase is owned by a Sprite object.
 *
 *
 * @see away.base.TriangleElements
 * @see away.entities.Sprite
 *
 * @class away.base.GraphicBase
 */
export class TesselatedFontTable extends AssetBase implements IFontTable
{
	public static assetType:string = "[asset TesselatedFontTable]";
	private _font_chars:Array<TesselatedFontChar>;
	public _font_chars_dic:Object;
	private _font_em_size:number;
	private _whitespace_width:number;
	private _offset_x:number;
	private _offset_y:number;
	private _ascent:number;
	private _descent:number;
	public _current_size:number;
	public _size_multiply:number;
	private _charDictDirty:Boolean;
	//TODO test shader picking
//		public get shaderPickingDetails():boolean
//		{
//
//			return this.sourceEntity.shaderPickingDetails;
//		}

	/**
	 * Creates a new TesselatedFont object
	 */
	constructor()
	{
		super();
		this._font_chars = [];
		this._font_chars_dic = new Object();
		this._ascent=0;
		this._descent=0;
		this._current_size=0;
		this._size_multiply=0;
		this._font_em_size=0;
	}

	public initFontSize(font_size:number)
	{
		if(this._current_size==font_size) return;
		this._current_size = font_size;
		this._size_multiply= font_size/this._font_em_size;
	}

	public getCharVertCnt(char_code:string):number
	{
		var tesselated_font_char:TesselatedFontChar = this._font_chars_dic[char_code];
		if(tesselated_font_char){
			return tesselated_font_char.elements.numVertices*3;
		}
		return 0;
	}
	public getCharWidth(char_code:string):number
	{
		var tesselated_font_char:TesselatedFontChar = this._font_chars_dic[char_code];
		if(tesselated_font_char){
			return tesselated_font_char.char_width*this._size_multiply;
		}
		return 0;
	}


	public getLineHeight():number
	{
		return 0;
	}

	public get assetType():string
	{
		return TesselatedFontTable.assetType;
	}
	/**
	 *
	 */
	public dispose():void
	{

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
	public get_font_chars():Array<TesselatedFontChar>
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
	public getChar(name:string):TesselatedFontChar
	{
		return this._font_chars_dic[name];
	}
	/**
	 *
	 */
	public setChar(name:string, elements:ElementsBase, char_width:number):void
	{
		var tesselated_font_char:TesselatedFontChar = new TesselatedFontChar(<TriangleElements> elements);
		tesselated_font_char.char_width=char_width;
		elements.name = name;
		this._font_chars.push(tesselated_font_char);
		this._font_chars_dic[name]=tesselated_font_char;
	}

}