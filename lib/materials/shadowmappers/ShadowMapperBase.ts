import AbstractMethodError			= require("awayjs-core/lib/errors/AbstractMethodError");
import AssetBase					= require("awayjs-core/lib/library/AssetBase");

import Scene						= require("awayjs-display/lib/containers/Scene");
import LightBase					= require("awayjs-display/lib/base/LightBase");
import IRenderer					= require("awayjs-display/lib/IRenderer");
import EntityCollector				= require("awayjs-display/lib/traverse/EntityCollector");
import ShadowCasterCollector		= require("awayjs-display/lib/traverse/ShadowCasterCollector");
import Camera						= require("awayjs-display/lib/entities/Camera");
import TextureBase					= require("awayjs-display/lib/textures/TextureBase");

class ShadowMapperBase extends AssetBase
{

	public _pCasterCollector:ShadowCasterCollector;

	public _depthMap:TextureBase;
	public _pDepthMapSize:number = 2048;
	public _pLight:LightBase;
	public _explicitDepthMap:boolean;
	private _autoUpdateShadows:boolean = true;
	public _iShadowsInvalid:boolean;

	constructor()
	{
		super();

		this._pCasterCollector = this.pCreateCasterCollector();
	}

	public pCreateCasterCollector()
	{
		return new ShadowCasterCollector();
	}

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
		this._pCasterCollector = null;

		if (this._depthMap && !this._explicitDepthMap)
			this._depthMap.dispose();

		this._depthMap = null;
	}

	public pCreateDepthTexture():TextureBase
	{
		throw new AbstractMethodError();
	}

	public iRenderDepthMap(entityCollector:EntityCollector, renderer:IRenderer)
	{
		this._iShadowsInvalid = false;

		this.pUpdateDepthProjection(entityCollector.camera);

		if (!this._depthMap)
			this._depthMap = this.pCreateDepthTexture();

		this.pDrawDepthMap(this._depthMap, entityCollector.scene, renderer);
	}

	public pUpdateDepthProjection(viewCamera:Camera)
	{
		throw new AbstractMethodError();
	}

	public pDrawDepthMap(target:TextureBase, scene:Scene, renderer:IRenderer)
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