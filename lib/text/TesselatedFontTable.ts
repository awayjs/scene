import AssetBase					= require("awayjs-core/lib/library/AssetBase");

import ElementsBase					= require("awayjs-display/lib/graphics/ElementsBase");
import TriangleElements				= require("awayjs-display/lib/graphics/TriangleElements");
import TesselatedFontChar			= require("awayjs-display/lib/text/TesselatedFontChar");

/**
 * GraphicBase wraps a TriangleElements as a scene graph instantiation. A GraphicBase is owned by a Sprite object.
 *
 *
 * @see away.base.TriangleElements
 * @see away.entities.Sprite
 *
 * @class away.base.GraphicBase
 */
class TesselatedFontTable extends AssetBase
{
	private _font_chars:Array<TesselatedFontChar>;
	public _font_chars_dic:Object;
	private _font_em_size:number;
	private _whitespace_width:number;
	private _offset_x:number;
	private _offset_y:number;
	private _ascent:number;
	private _descent:number;
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
		this._font_chars = new Array<TesselatedFontChar>();
		this._font_chars_dic = new Object();
		this._ascent=0;
		this._descent=0;
	}

	/**
	 *
	 */
	public dispose()
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

export = TesselatedFontTable;