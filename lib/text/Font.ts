import {AssetBase}					from "awayjs-core/lib/library/AssetBase";

import {IFontTable}					from "../text/IFontTable";
import {TesselatedFontTable}		from "../text/TesselatedFontTable";
import {BitmapFontTable}			from "../text/BitmapFontTable";

/**
 * GraphicBase wraps a TriangleElements as a scene graph instantiation. A GraphicBase is owned by a Sprite object.
 *
 *
 * @see away.base.TriangleElements
 * @see away.entities.Sprite
 *
 * @class away.base.GraphicBase
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

	}
	/**
	 *Get a font-table for a specific name, or create one if it does not exists.
	 */
	public get_font_table(style_name:string, assetType:string=TesselatedFontTable.assetType):IFontTable
	{
		var len:number = this._font_styles.length;

		for (var i:number = 0; i < len; ++i) {
			if((this._font_styles[i].assetType==assetType)&&(this._font_styles[i].name==style_name)){
				return this._font_styles[i];
			}
		}
		var font_style:IFontTable=null;
		if(assetType==TesselatedFontTable.assetType){
			font_style = new TesselatedFontTable();
		}
		else if(assetType==BitmapFontTable.assetType){
			font_style = new BitmapFontTable();
		}
		font_style.name=style_name;
		this._font_styles.push(font_style);
		return font_style;
	}

}