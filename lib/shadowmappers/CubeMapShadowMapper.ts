import {Vector3D, PerspectiveProjection, ProjectionBase} from "@awayjs/core";

import {ImageCube, SingleCubeTexture} from "@awayjs/graphics";

import {PointLight} from "../display/PointLight";

import {IRenderer} from "../IRenderer";
import {IView} from "../IView";

import {ShadowMapperBase}				from "./ShadowMapperBase";

export class CubeMapShadowMapper extends ShadowMapperBase
{
	private _depthProjections:Array<PerspectiveProjection>;
	private _needsRender:Array<boolean>;

	constructor()
	{
		super();

		this._depthMapSize = 512;
		this._needsRender = new Array();
		this.initCameras();
	}

	private initCameras():void
	{
		this._depthProjections = new Array();

		// posX, negX, posY, negY, posZ, negZ
		this.addProjection(0, 90, 0);
		this.addProjection(0, -90, 0);
		this.addProjection(-90, 0, 0);
		this.addProjection(90, 0, 0);
		this.addProjection(0, 0, 0);
		this.addProjection(0, 180, 0);
	}

	private addProjection(rotationX:number, rotationY:number, rotationZ:number):void
	{
		var projection:PerspectiveProjection = new PerspectiveProjection();
		projection.transform.rotateTo(rotationX, rotationY, rotationZ);
		projection.near = .01;
		projection.fieldOfView = 90;
		this._depthProjections.push(projection);
	}

	/**
	 *
	 * @returns {SingleCubeTexture}
	 * @private
	 */
	protected _createDepthTexture():SingleCubeTexture
	{
		 return new SingleCubeTexture(new ImageCube(this._depthMapSize));
	}

	/**
	 *
	 * @param projection
	 * @private
	 */
	protected _updateDepthProjection(projection:ProjectionBase):void
	{
		var light:PointLight = <PointLight>(this._light);
		var maxDistance:number = light._pFallOff;
		var pos:Vector3D = this._light.scenePosition;

		// todo: faces outside frustum which are pointing away from camera need not be rendered!
		for (var i:number = 0; i < 6; ++i) {
			this._depthProjections[i].far = maxDistance;
			this._depthProjections[i].transform.moveTo(pos.x, pos.y, pos.z);
			this._needsRender[i] = true;
		}
	}

	/**
	 *
	 * @param view
	 * @param target
	 * @param renderer
	 * @private
	 */
	protected _drawDepthMap(view:IView, target:SingleCubeTexture, renderer:IRenderer):void
	{
		for (var i:number = 0; i < 6; ++i)
			if (this._needsRender[i])
				renderer._iRender(this._depthProjections[i], view, target.imageCube, null, i)
	}
}