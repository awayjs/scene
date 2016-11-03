import {Box}							from "@awayjs/core/lib/geom/Box";
import {Matrix3D}						from "@awayjs/core/lib/geom/Matrix3D";
import {Vector3D}						from "@awayjs/core/lib/geom/Vector3D";

import {TraverserBase}					from "@awayjs/graphics/lib/base/TraverserBase";
import {IEntity}						from "@awayjs/graphics/lib/base/IEntity";

import {DisplayObject}						from "../display/DisplayObject";
import {LightBase}					from "../display/LightBase";
import {BoundsType}					from "../bounds/BoundsType";
import {CubeMapShadowMapper}			from "../shadowmappers/CubeMapShadowMapper";

export class PointLight extends LightBase implements IEntity
{
	public static traverseName:string = TraverserBase.addEntityName("applyPointLight");
	
	public static assetType:string = "[light PointLight]";

	public _pRadius:number = 90000;
	public _pFallOff:number = 100000;
	public _pFallOffFactor:number;

	constructor()
	{
		super();

		this._pIsEntity = true;

		this._pFallOffFactor = 1/(this._pFallOff*this._pFallOff - this._pRadius*this._pRadius);

		//default bounds type
		this._boundsType = BoundsType.SPHERE;
	}
	
	public get traverseName():string
	{
		return PointLight.traverseName;
	}
	
	public get assetType():string
	{
		return PointLight.assetType;
	}

	public pCreateShadowMapper():CubeMapShadowMapper
	{
		return new CubeMapShadowMapper();
	}

	public get radius():number
	{
		return this._pRadius;
	}

	public set radius(value:number)
	{
		this._pRadius = value;

		if (this._pRadius < 0) {
			this._pRadius = 0;
		} else if (this._pRadius > this._pFallOff) {
			this._pFallOff = this._pRadius;
			this._pInvalidateBounds();
		}
		this._pFallOffFactor = 1/( this._pFallOff*this._pFallOff - this._pRadius*this._pRadius );
	}

	public iFallOffFactor():number
	{
		return this._pFallOffFactor;
	}

	public get fallOff():number
	{
		return this._pFallOff;
	}

	public set fallOff(value:number)
	{
		this._pFallOff = value;

		if (this._pFallOff < 0)
			this._pFallOff = 0;

		if (this._pFallOff < this._pRadius)
			this._pRadius = this._pFallOff;

		this._pFallOffFactor = 1/( this._pFallOff*this._pFallOff - this._pRadius*this._pRadius);
		this._pInvalidateBounds();
	}

	public _pUpdateSphereBounds():void
	{
		super._pUpdateSphereBounds();

		this._pSphereBounds.radius = this._pFallOff;
	}

	public iGetObjectProjectionMatrix(displayObject:DisplayObject, cameraTransform:Matrix3D, target:Matrix3D = null):Matrix3D
	{
		if (!target)
			target = new Matrix3D();
		
		var m:Matrix3D = Matrix3D.CALCULATION_MATRIX;

		// todo: do not use lookAt on Light
		m.copyFrom(displayObject.getRenderSceneTransform(cameraTransform));
		m.append(this._pParent.inverseSceneTransform);
		this.lookAt(m.position);

		m.copyFrom(displayObject.getRenderSceneTransform(cameraTransform));
		m.append(this.inverseSceneTransform);

		var box:Box = displayObject.getBox();
		var v1:Vector3D = m.deltaTransformVector(new Vector3D(box.left, box.bottom, box.front));
		var v2:Vector3D = m.deltaTransformVector(new Vector3D(box.right, box.top, box.back));
		var d1:number = v1.x*v1.x + v1.y*v1.y + v1.z*v1.z;
		var d2:number = v2.x*v2.x + v2.y*v2.y + v2.z*v2.z;
		var d:number = Math.sqrt(d1 > d2? d1 : d2);
		var zMin:number;
		var zMax:number;

		var z:number = m._rawData[14];
		zMin = z - d;
		zMax = z + d;

		var targetData:Float32Array = target._rawData;

		targetData[5] = targetData[0] = zMin/d;
		targetData[10] = zMax/(zMax - zMin);
		targetData[11] = 1;
		targetData[1] = targetData[2] = targetData[3] = targetData[4] = targetData[6] = targetData[7] = targetData[8] = targetData[9] = targetData[12] = targetData[13] = targetData[15] = 0;
		targetData[14] = -zMin*targetData[10];
		
		target.prepend(m);

		return target;
	}
}