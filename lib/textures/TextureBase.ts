import ImageBase					= require("awayjs-core/lib/data/ImageBase");
import SamplerBase					= require("awayjs-core/lib/data/SamplerBase");
import IAsset						= require("awayjs-core/lib/library/IAsset");
import AssetBase					= require("awayjs-core/lib/library/AssetBase");
import AbstractMethodError			= require("awayjs-core/lib/errors/AbstractMethodError");

import IRenderOwner					= require("awayjs-display/lib/base/IRenderOwner");
import ITextureVO					= require("awayjs-display/lib/pool/ITextureVO");
import MaterialBase					= require("awayjs-display/lib/materials/MaterialBase");

/**
 *
 */
class TextureBase extends AssetBase implements IAsset
{
	private _owners:Array<IRenderOwner> = new Array<IRenderOwner>();
	private _counts:Array<number> = new Array<number>();
	private _textureVO:Array<ITextureVO> = new Array<ITextureVO>();

	public _images:Array<ImageBase> = new Array<ImageBase>();

	/**
	 *
	 */
	constructor()
	{
		super();
	}

	/**
	 *
	 */
	public invalidateContent():void
	{
		var len:number = this._textureVO.length;
		for (var i:number = 0; i < len; i++)
			this._textureVO[i].invalidate();
	}

	/**
	 *
	 * @private
	 */
	public invalidateSize():void
	{
		while (this._textureVO.length)
			this._textureVO[0].dispose();
	}

	/**
	 * @inheritDoc
	 */
	public dispose()
	{
		while (this._textureVO.length)
			this._textureVO[0].dispose();
	}


	public _iAddTextureVO(textureVO:ITextureVO):ITextureVO
	{
		this._textureVO.push(textureVO);

		return textureVO;
	}

	public _iRemoveTextureVO(textureVO:ITextureVO):ITextureVO
	{
		this._textureVO.splice(this._textureVO.indexOf(textureVO), 1);

		return textureVO;
	}

	public iAddOwner(owner:IRenderOwner)
	{
		//a texture can be used more than once in the same owner, so we check for this
		var index:number = this._owners.indexOf(owner);

		if (index != -1) {
			this._counts[index]++;
		} else {
			this._owners.push(owner);
			this._counts.push(1);

			//add images
			var len:number = this._images.length;
			for (var i:number = 0; i< len; i++)
				owner._iAddImage(this._images[i]);
		}

		//add samplers
		var len:number = this._images.length;
		for (var i:number = 0; i< len; i++)
			owner._iAddSampler(this._images[i].createSampler(), this, i);
	}

	public iRemoveOwner(owner:IRenderOwner)
	{
		var index:number = this._owners.indexOf(owner);

		if (this._counts[index] != 1) {
			this._counts[index]--;
		} else {
			this._owners.splice(index, 1);
			this._counts.splice(index, 1);

			//remove images
			var len:number = this._images.length;
			for (var i:number = 0; i< len; i++)
				owner._iRemoveImage(this._images[i]);
		}

		//add samplers
		var len:number = this._images.length;
		for (var i:number = 0; i< len; i++)
			owner._iRemoveSampler(this, i);
	}

	/**
	 *
	 */
	public iAddImage(image:ImageBase, index:number)
	{
		this._images[index] = image;

		var len:number = this._owners.length;
		for (var i:number = 0; i < len; i++) {
			this._owners[i]._iAddImage(image);
			this._owners[i]._iAddSampler(image.createSampler(), this, index);
		}
	}

	/**
	 *
	 */
	public iRemoveImage(index:number)
	{
		var image:ImageBase = this._images[index];

		var len:number = this._owners.length;
		for (var i:number = 0; i < len; i++) {
			this._owners[i]._iRemoveImage(image);
			this._owners[i]._iRemoveSampler(this, index);
		}
	}
}

export = TextureBase;