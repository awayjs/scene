import IAsset					= require("awayjs-core/lib/library/IAsset");
import AssetBase				= require("awayjs-core/lib/library/AssetBase");

import ITextureObject			= require("awayjs-display/lib/pool/ITextureObject");

/**
 *
 */
class TextureBase extends AssetBase implements IAsset
{
	private _textureObject:Array<ITextureObject> = new Array<ITextureObject>();

	public _width:number = 1;
	public _height:number = 1;

	get width():number
	{
		return this._width;
	}

	get height():number
	{
		return this._height;
	}

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
		var len:number = this._textureObject.length;
		for (var i:number = 0; i < len; i++)
			this._textureObject[i].invalidate();
	}

	/**
	 *
	 * @private
	 */
	public invalidateSize():void
	{
		while (this._textureObject.length)
			this._textureObject[0].dispose();
	}

	/**
	 * @inheritDoc
	 */
	public dispose()
	{
		while (this._textureObject.length)
			this._textureObject[0].dispose();
	}


	public _iAddTextureObject(textureObject:ITextureObject):ITextureObject
	{
		this._textureObject.push(textureObject);

		return textureObject;
	}

	public _iRemoveTextureObject(textureObject:ITextureObject):ITextureObject
	{
		this._textureObject.splice(this._textureObject.indexOf(textureObject), 1);

		return textureObject;
	}

	public _setSize(width:number, height:number)
	{
		this._width = width;
		this._height = height;
	}

}

export = TextureBase;