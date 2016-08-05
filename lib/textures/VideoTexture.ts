import {Sampler2D}				from "@awayjs/core/lib/image/Sampler2D";
import {Image2D}					from "@awayjs/core/lib/image/Image2D";
import {ErrorBase}				from "@awayjs/core/lib/errors/ErrorBase";
import {ImageUtils}				from "@awayjs/core/lib/utils/ImageUtils";
import {Single2DTexture}				from "../textures/Single2DTexture";

import {MappingMode}				from "../textures/MappingMode";
import {TextureBase}				from "../textures/TextureBase";

export class VideoTexture extends Single2DTexture
{
	public static assetType:string = "[texture VideoTexture]";

	/**
	 *
	 * @returns {string}
	 */
	public get assetType():string
	{
		return Single2DTexture.assetType;
	}



	constructor()
	{
		super();

	}
}