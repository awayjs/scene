import Sampler2D				= require("awayjs-core/lib/data/Sampler2D");
import Image2D					= require("awayjs-core/lib/data/Image2D");
import Rectangle				= require("awayjs-core/lib/geom/Rectangle");
import Error					= require("awayjs-core/lib/errors/Error");
import ImageUtils				= require("awayjs-core/lib/utils/ImageUtils");

import TextureBase				= require("awayjs-display/lib/textures/TextureBase");

class Single2DTexture extends TextureBase
{
	public static assetType:string = "[texture Single2DTexture]";

	private _sampler2D:Sampler2D;

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
	public get sampler2D():Sampler2D
	{
		return this._sampler2D;
	}

	public set sampler2D(value:Sampler2D)
	{
		if (this._sampler2D == value)
			return;

		if (!ImageUtils.isImage2DValid(value.image2D))
			throw new Error("Invalid sampler2DData: Width and height must be power of 2 and cannot exceed 2048");

		this._sampler2D = value;

		this._setSize(this._sampler2D.rect.width, this._sampler2D.rect.height);

		this.invalidateContent();
	}

	constructor(source:Sampler2D);
	constructor(source:Image2D);
	constructor(source:any)
	{
		super();

		if (source instanceof Image2D)
			this.sampler2D = new Sampler2D(source);
		else
			this.sampler2D = source;

	}
}

export = Single2DTexture;