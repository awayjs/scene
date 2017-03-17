import {AbstractMethodError, AssetBase, ProjectionBase} from "@awayjs/core";

import {TextureBase} from "@awayjs/graphics";

import {LightBase} from "../display/LightBase";

import {IRenderer} from "../IRenderer";
import {IView} from "../IView";


export class ShadowMapperBase extends AssetBase
{
	protected _depthMap:TextureBase;
	protected _depthMapSize:number = 2048;
	protected _light:LightBase;
	protected _explicitDepthMap:boolean;
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

	public updateShadows():void
	{
		this._iShadowsInvalid = true;
	}

	public iSetDepthMap(depthMap:TextureBase):void
	{
		if (this._depthMap && !this._explicitDepthMap)
			this._depthMap.dispose();

		this._depthMap = depthMap;
	}

	public get light():LightBase
	{
		return this._light;
	}

	public set light(value:LightBase)
	{
		this._light = value;
	}

	public get depthMap():TextureBase
	{
		if (!this._depthMap)
			this._depthMap = this._createDepthTexture();

		return this._depthMap;
	}

	public get depthMapSize():number
	{
		return this._depthMapSize;
	}

	public set depthMapSize(value:number)
	{
		if (value == this._depthMapSize)
			return;

		this._setDepthMapSize(value);
	}

	public dispose():void
	{
		if (this._depthMap && !this._explicitDepthMap)
			this._depthMap.dispose();

		this._depthMap = null;
	}

	protected _createDepthTexture():TextureBase
	{
		throw new AbstractMethodError();
	}

	public iRenderDepthMap(view:IView, renderer:IRenderer):void
	{
		this._iShadowsInvalid = false;

		this._updateDepthProjection(view.camera.projection);

		if (!this._depthMap)
			this._depthMap = this._createDepthTexture();

		this._drawDepthMap(view, this._depthMap, renderer);
	}

	protected _updateDepthProjection(projection:ProjectionBase):void
	{
		throw new AbstractMethodError();
	}

	protected _drawDepthMap(view:IView, target:TextureBase, renderer:IRenderer):void
	{
		throw new AbstractMethodError();
	}

	protected _setDepthMapSize(value):void
	{
		this._depthMapSize = value;

		if (this._explicitDepthMap) {
			throw Error("Cannot set depth map size for the current renderer.");
		} else if (this._depthMap) {
			this._depthMap.dispose();
			this._depthMap = null;
		}
	}
}