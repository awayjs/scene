import IAsset					= require("awayjs-core/lib/library/IAsset");
import AssetBase				= require("awayjs-core/lib/library/AssetBase");

import ITextureVO			= require("awayjs-display/lib/pool/ITextureVO");

/**
 *
 */
class TextureBase extends AssetBase implements IAsset
{
	private _textureVO:Array<ITextureVO> = new Array<ITextureVO>();

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

	public _setSize(width:number, height:number)
	{
		this._width = width;
		this._height = height;
	}

}

export = TextureBase;