import {ProjectionBase} from "@awayjs/core";

import {DirectionalShadowMapper} from "./DirectionalShadowMapper";

export class NearDirectionalShadowMapper extends DirectionalShadowMapper
{
	private _coverageRatio:number;

	constructor(coverageRatio:number = .5)
	{
		super();

		this.coverageRatio = coverageRatio;
	}

	/**
	 * A value between 0 and 1 to indicate the ratio of the view frustum that needs to be covered by the shadow map.
	 */
	public get coverageRatio():number
	{
		return this._coverageRatio;
	}

	public set coverageRatio(value:number)
	{
		if (value > 1)
			value = 1;
		else if (value < 0)
			value = 0;

		this._coverageRatio = value;
	}

	protected _updateDepthProjection(projection:ProjectionBase):void
	{
		var corners:Array<number> = projection.frustumCorners;

		for (var i:number /*int*/ = 0; i < 12; ++i) {
			var v:number = corners[i];
			this._localFrustum[i] = v;
			this._localFrustum[i + 12] = v + (corners[i + 12] - v)*this._coverageRatio;
		}

		this._updateProjectionFromFrustumCorners(projection, this._localFrustum, this._matrix);
		this._overallDepthProjection.frustumMatrix3D = this._matrix;
	}
}