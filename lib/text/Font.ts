import {AssetBase} from "@awayjs/core";

import {IFontTable} from "./IFontTable";
import {TesselatedFontTable} from "./TesselatedFontTable";
import {BitmapFontTable} from "./BitmapFontTable";
import { FontStyleName } from './FontStyleName';

/**
 * Font is a container for FontTables.
 *
 *
 *
 */
export class Font extends AssetBase
{
	public static assetType:string = "[asset Font]";

	private _font_styles:Array<IFontTable> = [];

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
	}

	// ------------ dummys for as3web:
	public fontName:string=null;

	public static registerFont(any){
		
	}
	// ------------
	public get font_styles():Array<IFontTable>
	{
		return this._font_styles;
	}
	/**
	 *
	 */
	public get assetType():string
	{
		return Font.assetType;
	}
	/**
	 *
	 */
	public dispose():void
	{

		var len:number = this._font_styles.length;
		for (var i:number = 0; i < len; ++i) {
			this._font_styles[i].dispose();
		}
		this._font_styles.length=0;
	}
	/**
	 *Get a font-table for a specific name, or create one if it does not exists.
	 */
	public get_font_table(style_name:FontStyleName, assetType:string=TesselatedFontTable.assetType, openTypeFont:any=null):IFontTable
	{
		var len:number = this._font_styles.length;

		//console.log("font name", this.name, style_name);
		for (var i:number = 0; i < len; ++i) {
			if((this._font_styles[i].assetType==assetType)&&(this._font_styles[i].name==style_name)){
				return this._font_styles[i];
			}
		}
		var font_style:IFontTable=null;
		if(assetType==TesselatedFontTable.assetType){
			font_style = new TesselatedFontTable(openTypeFont);
		}
		else if(assetType==BitmapFontTable.assetType){
			font_style = new BitmapFontTable();
		}
		font_style.name=<string>style_name;
		this._font_styles.push(font_style);
		return font_style;
	}

}