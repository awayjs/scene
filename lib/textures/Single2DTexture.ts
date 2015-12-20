import Sampler2D				= require("awayjs-core/lib/image/Sampler2D");
import Image2D					= require("awayjs-core/lib/image/Image2D");
import Rectangle				= require("awayjs-core/lib/geom/Rectangle");
import ErrorBase				= require("awayjs-core/lib/errors/ErrorBase");
import ImageUtils				= require("awayjs-core/lib/utils/ImageUtils");

import MappingMode				= require("awayjs-display/lib/textures/MappingMode");
import TextureBase				= require("awayjs-display/lib/textures/TextureBase");

class Single2DTexture extends TextureBase
{
	private _mappingMode:string;

	public static assetType:string = "[texture Single2DTexture]";

	/**
	 *
	 * @returns {string}
	 */
	public get assetType():string
	{
		return Single2DTexture.assetType;
	}

	public get mappingMode():string
	{
		return this._mappingMode;
	}

	public set mappingMode(value:string)
	{
		if (this._mappingMode == value)
			return;

		this._mappingMode = value;


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
			throw new ErrorBase("Invalid image2DData: Width and height must be power of 2 and cannot exceed 2048");

		if (this._images[0])
			this.iRemoveImage(0);

		if (value)
			this.iAddImage(value, 0);

		this.invalidate();
	}

	constructor(image2D:Image2D)
	{
		super();

		this._images.length = 1;

		this.image2D = image2D;

		this._mappingMode = MappingMode.NORMAL;
	}
}

export = Single2DTexture;