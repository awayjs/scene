import SamplerCube				= require("awayjs-core/lib/image/SamplerCube");
import ImageCube				= require("awayjs-core/lib/image/ImageCube");

import TextureBase				= require("awayjs-display/lib/textures/TextureBase");


class SingleCubeTexture extends TextureBase
{
	public static assetType:string = "[texture SingleCubeTexture]";

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
	 * @returns {ImageCube}
	 */
	public get imageCube():ImageCube
	{
		return <ImageCube> this._images[0];
	}

	public set imageCube(value:ImageCube)
	{
		if (this._images[0] == value)
			return;

		if (this._images[0])
			this.iRemoveImage(0);

		if (value)
			this.iAddImage(value, 0);


		this.invalidate();
	}

	
	constructor(imageCube:ImageCube)
	{
		super();

		this.imageCube = imageCube;
	}
}

export = SingleCubeTexture;