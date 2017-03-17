import {Matrix3D, Plane3D, Vector3D, PerspectiveProjection, ProjectionBase, Transform} from "@awayjs/core";

import {Image2D, Single2DTexture} from "@awayjs/graphics";

import {DirectionalLight} from "../display/DirectionalLight";

import {IRenderer} from "../IRenderer";
import {IView} from "../IView";

import {ShadowMapperBase} from "./ShadowMapperBase";

export class DirectionalShadowMapper extends ShadowMapperBase
{
	protected _localFrustum:Array<number>;

	protected _lightOffset:number = 10000;
	protected _matrix:Matrix3D;
	protected _overallDepthProjection:PerspectiveProjection;
	protected _snap:number = 64;

	protected _cullPlanes:Array<Plane3D>;
	protected _minZ:number;
	protected _maxZ:number;

	constructor()
	{
		super();

		this._cullPlanes = [];
		this._overallDepthProjection = new PerspectiveProjection();
		this._overallDepthProjection.transform = new Transform();
		this._localFrustum = [];
		this._matrix = new Matrix3D();
	}

	public get snap():number
	{
		return this._snap;
	}

	public set snap(value:number)
	{
		this._snap = value;
	}

	public get lightOffset():number
	{
		return this._lightOffset;
	}

	public set lightOffset(value:number)
	{
		this._lightOffset = value;
	}

	//@arcane
	public get iDepthProjection():Matrix3D
	{
		return this._overallDepthProjection.viewMatrix3D;
	}

	//@arcane
	public get depth():number
	{
		return this._maxZ - this._minZ;
	}

	public iSetDepthMap(depthMap:Single2DTexture):void
	{
		if (this._depthMap == depthMap)
			return;

		super.iSetDepthMap(depthMap);

		if (this._depthMap) {
			this._explicitDepthMap = true;
			this._depthMapSize = depthMap.image2D.rect.width;
		} else {
			this._explicitDepthMap = false;
		}
	}

	protected _createDepthTexture():Single2DTexture
	{
		return new Single2DTexture(new Image2D(this._depthMapSize, this._depthMapSize));
	}

	//@override
	protected _drawDepthMap(view:IView, target:Single2DTexture, renderer:IRenderer):void
	{
		renderer.cullPlanes = this._cullPlanes;
		renderer._iRender(this._overallDepthProjection, view, target.image2D);
	}

	/**
	 *
	 * @param projection
	 * @private
	 */
	protected _updateCullPlanes(projection:ProjectionBase):void
	{
		var lightFrustumPlanes:Array<Plane3D> = this._overallDepthProjection.frustumPlanes;
		var viewFrustumPlanes:Array<Plane3D> = projection.frustumPlanes;
		this._cullPlanes.length = 4;

		this._cullPlanes[0] = lightFrustumPlanes[0];
		this._cullPlanes[1] = lightFrustumPlanes[1];
		this._cullPlanes[2] = lightFrustumPlanes[2];
		this._cullPlanes[3] = lightFrustumPlanes[3];

		var light:DirectionalLight = <DirectionalLight> this._light;
		var dir:Vector3D = light.sceneDirection;
		var dirX:number = dir.x;
		var dirY:number = dir.y;
		var dirZ:number = dir.z;
		var j:number = 4;
		for (var i:number = 0; i < 6; ++i) {
			var plane:Plane3D = viewFrustumPlanes[i];
			if (plane.a*dirX + plane.b*dirY + plane.c*dirZ < 0)
				this._cullPlanes[j++] = plane;
		}
	}

	/**
	 *
	 * @param projection
	 * @private
	 */
	protected _updateDepthProjection(projection:ProjectionBase):void
	{
		this._updateProjectionFromFrustumCorners(projection, projection.frustumCorners, this._matrix);
		this._overallDepthProjection.frustumMatrix3D = this._matrix;
		this._updateCullPlanes(projection);
	}

	/**
	 *
	 * @param projection
	 * @param matrix
	 * @private
	 */
	protected _updateProjectionFromFrustumCorners(projection:ProjectionBase, corners:Array<number>, matrix:Matrix3D):void
	{
		var dir:Vector3D;
		var x:number, y:number, z:number;
		var minX:number, minY:number;
		var maxX:number, maxY:number;
		var i:number;

		var position:Vector3D = projection.transform.concatenatedMatrix3D.position;
		var light:DirectionalLight = <DirectionalLight> this._light;
		dir = light.sceneDirection;
		this._overallDepthProjection.transform.matrix3D = this._light.transform.concatenatedMatrix3D;
		x = Math.floor((position.x - dir.x*this._lightOffset)/this._snap)*this._snap;
		y = Math.floor((position.y - dir.y*this._lightOffset)/this._snap)*this._snap;
		z = Math.floor((position.z - dir.z*this._lightOffset)/this._snap)*this._snap;
		this._overallDepthProjection.transform.moveTo(x, y, z);

		this._matrix.copyFrom(this._overallDepthProjection.transform.inverseConcatenatedMatrix3D);
		this._matrix.prepend(projection.transform.concatenatedMatrix3D);
		this._matrix.transformVectors(corners, this._localFrustum);

		minX = maxX = this._localFrustum[0];
		minY = maxY = this._localFrustum[1];
		this._maxZ = this._localFrustum[2];

		i = 3;
		while (i < 24) {
			x = this._localFrustum[i];
			y = this._localFrustum[i + 1];
			z = this._localFrustum[i + 2];
			if (x < minX)
				minX = x;
			if (x > maxX)
				maxX = x;
			if (y < minY)
				minY = y;
			if (y > maxY)
				maxY = y;
			if (z > this._maxZ)
				this._maxZ = z;
			i += 3;
		}

		this._minZ = 1;

		var w:number = maxX - minX;
		var h:number = maxY - minY;
		var d:number = 1/(this._maxZ - this._minZ);

		if (minX < 0)
			minX -= this._snap; // because int() rounds up for < 0

		if (minY < 0)
			minY -= this._snap;

		minX = Math.floor(minX/this._snap)*this._snap;
		minY = Math.floor(minY/this._snap)*this._snap;

		var snap2:number = 2*this._snap;
		w = Math.floor(w/snap2 + 2)*snap2;
		h = Math.floor(h/snap2 + 2)*snap2;

		maxX = minX + w;
		maxY = minY + h;

		w = 1/w;
		h = 1/h;

		var raw:Float32Array = matrix._rawData;
		
		raw[0] = 2*w;
		raw[5] = 2*h;
		raw[10] = d;
		raw[12] = -(maxX + minX)*w;
		raw[13] = -(maxY + minY)*h;
		raw[14] = -this._minZ*d;
		raw[15] = 1;
		raw[1] = raw[2] = raw[3] = raw[4] = raw[6] = raw[7] = raw[8] = raw[9] = raw[11] = 0;

		matrix.invalidatePosition();
	}
}