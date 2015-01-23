import Texture2DBase				= require("awayjs-core/lib/textures/Texture2DBase");

import IRenderObjectOwner			= require("awayjs-display/lib/base/IRenderObjectOwner");
import MaterialBase					= require("awayjs-display/lib/materials/MaterialBase");
import IRenderablePool				= require("awayjs-display/lib/pool/IRenderablePool");
import IRenderObject				= require("awayjs-display/lib/pool/IRenderObject");

/**
 * BasicMaterial forms an abstract base class for the default shaded materials provided by Stage,
 * using material methods to define their appearance.
 */
class BasicMaterial extends MaterialBase implements IRenderObjectOwner
{
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
	 *
	 * @param renderer
	 *
	 * @internal
	 */
	public getRenderObject(renderablePool:IRenderablePool):IRenderObject
	{
		return renderablePool.getMaterialRenderObject(this);
	}
}

export = BasicMaterial;