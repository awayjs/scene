import ImageBase					= require("awayjs-core/lib/image/ImageBase");
import SamplerBase					= require("awayjs-core/lib/image/SamplerBase");
import AssetBase					= require("awayjs-core/lib/library/AssetBase");
import AbstractMethodError			= require("awayjs-core/lib/errors/AbstractMethodError");

import IRenderOwner					= require("awayjs-display/lib/base/IRenderOwner");
import MaterialBase					= require("awayjs-display/lib/materials/MaterialBase");

/**
 *
 */
class TextureBase extends AssetBase
{
	private _owners:Array<IRenderOwner> = new Array<IRenderOwner>();
	private _counts:Array<number> = new Array<number>();

	public _images:Array<ImageBase> = new Array<ImageBase>();

	/**
	 *
	 */
	constructor()
	{
		super();
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