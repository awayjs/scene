import SamplerCube				= require("awayjs-core/lib/data/SamplerCube");
import ImageCube				= require("awayjs-core/lib/data/ImageCube");

import TextureBase				= require("awayjs-display/lib/textures/TextureBase");


class SingleCubeTexture extends TextureBase
{
	public static assetType:string = "[texture SingleCubeTexture]";

	private _samplerCube:SamplerCube;

	/**
	 *
	 * @returns {string}
	 */
	public get assetType():string
	{
		return SingleCubeTexture.assetType;
	}

	/**
	 *
	 * @returns {BitmapData}
	 */
	public get samplerCube():SamplerCube
	{
		return this._samplerCube;
	}

	public set samplerCube(value:SamplerCube)
	{
		if (this._samplerCube == value)
			return;

		this._samplerCube = value;

		this.invalidateContent();
	}

	constructor(source:SamplerCube);
	constructor(source:ImageCube);
	constructor(source:any)
	{
		super();

		if (source instanceof ImageCube)
			this.samplerCube = new SamplerCube(source);
		else
			this.samplerCube = source;
	}
}

export = SingleCubeTexture;