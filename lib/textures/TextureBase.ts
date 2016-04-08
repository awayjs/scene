import ImageBase					from "awayjs-core/lib/image/ImageBase";
import SamplerBase					from "awayjs-core/lib/image/SamplerBase";
import AssetBase					from "awayjs-core/lib/library/AssetBase";
import AbstractMethodError			from "awayjs-core/lib/errors/AbstractMethodError";

import ISurface						from "awayjs-display/lib/base/ISurface";
/**
 *
 */
class TextureBase extends AssetBase
{
	public _numImages:number = 0;
	public _images:Array<ImageBase> = new Array<ImageBase>();
	public _samplers:Array<SamplerBase> = new Array<SamplerBase>();

	/**
	 *
	 */
	constructor()
	{
		super();
	}

	public getNumImages():number
	{
		return this._numImages;
	}

	public setNumImages(value:number)
	{
		if (this._numImages == value)
			return;

		this._numImages = value;

		this._images.length = value;
		this._samplers.length = value;

		this.invalidate();
	}

	public getImageAt(index:number):ImageBase
	{
		return this._images[index];
	}

	public setImageAt(image:ImageBase, index:number)
	{
		this._images[index] = image;

		this.invalidate();
	}

	public getSamplerAt(index:number):SamplerBase
	{
		return this._samplers[index];
	}

	public setSamplerAt(sampler:SamplerBase, index:number)
	{
		this._samplers[index] = sampler;

		this.invalidate();
	}
}

export default TextureBase;