import Image2D						= require("awayjs-core/lib/image/Image2D");

import MaterialBase					= require("awayjs-display/lib/materials/MaterialBase");
import Single2DTexture				= require("awayjs-display/lib/textures/Single2DTexture");
import TextureBase					= require("awayjs-display/lib/textures/TextureBase");

/**
 * BasicMaterial forms an abstract base class for the default shaded materials provided by Stage,
 * using material methods to define their appearance.
 */
class BasicMaterial extends MaterialBase
{
	public static assetType:string = "[materials BasicMaterial]";

    private _preserveAlpha:boolean = false;

	/**
	 *
	 */
	public get assetType():string
	{
		return BasicMaterial.assetType;
	}

	/**
	 * Creates a new BasicMaterial object.
	 *
	 * @param texture The texture used for the material's albedo color.
	 * @param smooth Indicates whether the texture should be filtered when sampled. Defaults to true.
	 * @param repeat Indicates whether the texture should be tiled when sampled. Defaults to false.
	 * @param mipmap Indicates whether or not any used textures should use mipmapping. Defaults to false.
	 */
	constructor(texture?:Image2D, smooth?:boolean, repeat?:boolean, mipmap?:boolean);
	constructor(texture?:TextureBase, smooth?:boolean, repeat?:boolean, mipmap?:boolean);
	constructor(color?:number, alpha?:number);
	constructor(textureColor:any = null, smoothAlpha:any = null, repeat:boolean = false, mipmap:boolean = false)
	{
		super();

		if (textureColor instanceof Image2D)
			textureColor = new Single2DTexture(textureColor);

		if (textureColor instanceof TextureBase) {
			this.texture = <TextureBase> textureColor;

			this.smooth = (smoothAlpha == null)? true : false;
			this.repeat = repeat;
			this.mipmap = mipmap;
		} else {
			this.color = textureColor? Number(textureColor) : 0xCCCCCC;
			this.alpha = (smoothAlpha == null)? 1 : Number(smoothAlpha);
		}
	}
    /**
     * Indicates whether alpha should be preserved - defaults to false
     */
    public get preserveAlpha():boolean
    {
        return this._preserveAlpha;
    }
    public set preserveAlpha(value:boolean)
    {
        if (this._preserveAlpha == value)
            return;

        this._preserveAlpha = value;

        this.invalidate();
    }
}

export = BasicMaterial;