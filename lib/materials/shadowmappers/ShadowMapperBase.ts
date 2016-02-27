import AbstractMethodError			= require("awayjs-core/lib/errors/AbstractMethodError");
import AssetBase					= require("awayjs-core/lib/library/AssetBase");

import Scene						= require("awayjs-display/lib/display/Scene");
import LightBase					= require("awayjs-display/lib/display/LightBase");
import IRenderer					= require("awayjs-display/lib/IRenderer");
import Camera						= require("awayjs-display/lib/display/Camera");
import TextureBase					= require("awayjs-display/lib/textures/TextureBase");

class ShadowMapperBase extends AssetBase
{
	public _depthMap:TextureBase;
	public _pDepthMapSize:number = 2048;
	public _pLight:LightBase;
	public _explicitDepthMap:boolean;
	private _autoUpdateShadows:boolean = true;
	public _iShadowsInvalid:boolean;

	public get autoUpdateShadows():boolean
	{
		return this._autoUpdateShadows;
	}

	public set autoUpdateShadows(value:boolean)
	{
		this._autoUpdateShadows = value;
	}

	public updateShadows()
	{
		this._iShadowsInvalid = true;
	}

	public iSetDepthMap(depthMap:TextureBase)
	{
		if (this._depthMap && !this._explicitDepthMap)
			this._depthMap.dispose();

		this._depthMap = depthMap;
	}

	public get light():LightBase
	{
		return this._pLight;
	}

	public set light(value:LightBase)
	{
		this._pLight = value;
	}

	public get depthMap():TextureBase
	{
		if (!this._depthMap)
			this._depthMap = this.pCreateDepthTexture();

		return this._depthMap;
	}

	public get depthMapSize():number
	{
		return this._pDepthMapSize;
	}

	public set depthMapSize(value:number)
	{
		if (value == this._pDepthMapSize)
			return;

		this._pSetDepthMapSize(value);
	}

	public dispose()
	{
		if (this._depthMap && !this._explicitDepthMap)
			this._depthMap.dispose();

		this._depthMap = null;
	}

	public pCreateDepthTexture():TextureBase
	{
		throw new AbstractMethodError();
	}

	public iRenderDepthMap(camera:Camera, scene:Scene, renderer:IRenderer)
	{
		this._iShadowsInvalid = false;

		this.pUpdateDepthProjection(camera);

		if (!this._depthMap)
			this._depthMap = this.pCreateDepthTexture();

		this.pDrawDepthMap(scene, this._depthMap, renderer);
	}

	public pUpdateDepthProjection(camera:Camera)
	{
		throw new AbstractMethodError();
	}

	public pDrawDepthMap(scene:Scene, target:TextureBase, renderer:IRenderer)
	{
		throw new AbstractMethodError();
	}

	public _pSetDepthMapSize(value)
	{
		this._pDepthMapSize = value;

		if (this._explicitDepthMap) {
			throw Error("Cannot set depth map size for the current renderer.");
		} else if (this._depthMap) {
			this._depthMap.dispose();
			this._depthMap = null;
		}
	}
}

export = ShadowMapperBase;