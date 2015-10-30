import SamplerCube				= require("awayjs-core/lib/data/SamplerCube");
import ImageCube				= require("awayjs-core/lib/data/ImageCube");

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
			this.iRemoveImage(this._images[0]);

		this._images[0] = value;

		if (this._images[0])
			this.iAddImage(this._images[0]);


		this.invalidateContent();
	}

	
	constructor(imageCube:ImageCube)
	{
		super();

		this.imageCube = imageCube;
	}


	public getImageAt(index:number):ImageCube
	{
		return <ImageCube> this._images[index];
	}

	public getSamplerAt(index:number):SamplerCube
	{
		return <SamplerCube> this._samplers[index] || (this._samplers[index] = new SamplerCube());
	}
}

export = SingleCubeTexture;