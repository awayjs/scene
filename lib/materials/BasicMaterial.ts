import Matrix						= require("awayjs-core/lib/geom/Matrix");
import Matrix3D						= require("awayjs-core/lib/geom/Matrix3D");
import Matrix3DUtils				= require("awayjs-core/lib/geom/Matrix3DUtils");
import Texture2DBase				= require("awayjs-core/lib/textures/Texture2DBase");

import BlendMode					= require("awayjs-display/lib/base/BlendMode");
import MaterialBase					= require("awayjs-display/lib/materials/MaterialBase");
import TriangleSubGeometry			= require("awayjs-display/lib/base/TriangleSubGeometry");
import Camera						= require("awayjs-display/lib/entities/Camera");

/**
 * BasicMaterial forms an abstract base class for the default shaded materials provided by Stage,
 * using material methods to define their appearance.
 */
class BasicMaterial extends MaterialBase
{
	private _alphaBlending:boolean = false;
	private _alpha:number = 1;

	/**
	 * Creates a new BasicMaterial object.
	 *
	 * @param texture The texture used for the material's albedo color.
	 * @param smooth Indicates whether the texture should be filtered when sampled. Defaults to true.
	 * @param repeat Indicates whether the texture should be tiled when sampled. Defaults to false.
	 * @param mipmap Indicates whether or not any used textures should use mipmapping. Defaults to false.
	 */
	constructor(texture?:Texture2DBase, smooth?:boolean, repeat?:boolean, mipmap?:boolean);
	constructor(color?:number, alpha?:number);
	constructor(textureColor:any = null, smoothAlpha:any = null, repeat:boolean = false, mipmap:boolean = false)
	{
		super();

		if (textureColor instanceof Texture2DBase) {
			this.texture = <Texture2DBase> textureColor;

			this.smooth = (smoothAlpha == null)? true : false;
			this.repeat = repeat;
			this.mipmap = mipmap;
		} else {
			this.color = textureColor? Number(textureColor) : 0xCCCCCC;
			this.alpha = (smoothAlpha == null)? 1 : Number(smoothAlpha);
		}
	}

	/**
	 * The alpha of the surface.
	 */
	public get alpha():number
	{
		return this._alpha;
	}

	public set alpha(value:number)
	{
		if (value > 1)
			value = 1;
		else if (value < 0)
			value = 0;

		if (this._alpha == value)
			return;

		this._alpha = value;

		this._pInvalidateProperties();
	}

	/**
	 * Indicates whether or not the material has transparency. If binary transparency is sufficient, for
	 * example when using textures of foliage, consider using alphaThreshold instead.
	 */
	public get alphaBlending():boolean
	{
		return this._alphaBlending;
	}

	public set alphaBlending(value:boolean)
	{
		if (this._alphaBlending == value)
			return;

		this._alphaBlending = value;

		this._pInvalidateProperties();
	}
}

export = BasicMaterial;