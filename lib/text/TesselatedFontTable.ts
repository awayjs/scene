
import NamedAssetBase				= require("awayjs-core/lib/library/NamedAssetBase");


import IAsset						= require("awayjs-core/lib/library/IAsset");
import SubGeometryBase						= require("awayjs-core/lib/data/SubGeometryBase");

/**
 * SubMeshBase wraps a TriangleSubGeometry as a scene graph instantiation. A SubMeshBase is owned by a Mesh object.
 *
 *
 * @see away.base.TriangleSubGeometry
 * @see away.entities.Mesh
 *
 * @class away.base.SubMeshBase
 */
class TesselatedFontTable extends NamedAssetBase
{
	private _font_chars:Array<SubGeometryBase>;
	private _font_chars_dic:Object;
	private _font_em_size:number;
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
		this._font_chars = new Array<SubGeometryBase>();
		this._font_chars_dic = new Object();
	}

	/**
	 *
	 */
	public dispose()
	{

	}

	public get_font_chars():Array<SubGeometryBase>
	{
		return this._font_chars
	}
	public get_font_em_size():number
	{
		return this._font_em_size
	}
	public set_font_em_size(font_em_size:number):void
	{
		this._font_em_size=font_em_size;
	}
	/**
	 *
	 */
	public get_subgeo_for_char(char:string):SubGeometryBase
	{
		return this._font_chars_dic[char];
	}
	/**
	 *
	 */
	public set_subgeo_for_char(char:string, subgeo:SubGeometryBase):void
	{
		subgeo.name=char;
		this._font_chars.push(subgeo);
		this._font_chars_dic[char]=subgeo;
	}

}

export = TesselatedFontTable;