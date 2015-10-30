import Sampler2D				= require("awayjs-core/lib/data/Sampler2D");
import Image2D					= require("awayjs-core/lib/data/Image2D");
import Rectangle				= require("awayjs-core/lib/geom/Rectangle");
import Error					= require("awayjs-core/lib/errors/Error");
import ImageUtils				= require("awayjs-core/lib/utils/ImageUtils");

import TextureBase				= require("awayjs-display/lib/textures/TextureBase");

class Single2DTexture extends TextureBase
{
	public static assetType:string = "[texture Single2DTexture]";

	/**
	 *
	 * @returns {string}
	 */
	public get assetType():string
	{
		return Single2DTexture.assetType;
	}

	/**
	 *
	 * @returns {Image2D}
	 */
	public get image2D():Image2D
	{
		return <Image2D> this._images[0];
	}

	public set image2D(value:Image2D)
	{
		if (this._images[0] == value)
			return;

		if (!ImageUtils.isImage2DValid(value))
			throw new Error("Invalid image2DData: Width and height must be power of 2 and cannot exceed 2048");

		if (this._images[0])
			this.iRemoveImage(this._images[0]);

		this._images[0] = value;

		if (this._images[0])
			this.iAddImage(this._images[0]);


		this.invalidateContent();
	}

	constructor(image2D:Image2D)
	{
		super();

		this._images.length = 1;

		this.image2D = image2D;
	}

	public getImageAt(index:number):Image2D
	{
		return <Image2D> this._images[index];
	}

	public getSamplerAt(index:number):Sampler2D
	{
		return <Sampler2D> this._samplers[index] || (this._samplers[index] = new Sampler2D());
	}
}

export = Single2DTexture;