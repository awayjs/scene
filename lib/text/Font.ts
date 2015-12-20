import AssetBase					= require("awayjs-core/lib/library/AssetBase");

import FontTable					= require("awayjs-display/lib/text/TesselatedFontTable");

/**
 * SubMeshBase wraps a TriangleSubGeometry as a scene graph instantiation. A SubMeshBase is owned by a Mesh object.
 *
 *
 * @see away.base.TriangleSubGeometry
 * @see away.entities.Mesh
 *
 * @class away.base.SubMeshBase
 */
class Font extends AssetBase
{
	public static assetType:string = "[asset Font]";

	private _font_styles:Array<FontTable> = new Array<FontTable>();

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

	public get font_styles():Array<FontTable>
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
	public dispose()
	{

	}
	/**
	 *Get a font-table for a specific name, or create one if it does not exists.
	 */
	public get_font_table(style_name:string):FontTable
	{
		var len:number = this._font_styles.length;

		for (var i:number = 0; i < len; ++i) {
			if(this._font_styles[i].name==style_name)
				return this._font_styles[i];
		}
		var font_style:FontTable = new FontTable();
		font_style.name=style_name;
		this._font_styles.push(font_style);
		return font_style;
	}

}

export = Font;