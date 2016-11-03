import {Matrix3D}						from "@awayjs/core/lib/geom/Matrix3D";
import {ErrorBase}					from "@awayjs/core/lib/errors/ErrorBase";

import {TraverserBase}					from "@awayjs/graphics/lib/base/TraverserBase";
import {ImageCube}					from "@awayjs/graphics/lib/image/ImageCube";
import {SamplerCube}					from "@awayjs/graphics/lib/image/SamplerCube";
import {IEntity}					from "@awayjs/graphics/lib/base/IEntity";

import {LightBase}					from "../display/LightBase";
import {BoundsType}					from "../bounds/BoundsType";

export class LightProbe extends LightBase implements IEntity
{
	public static traverseName:string = TraverserBase.addEntityName("applyLightProbe");
	
	public static assetType:string = "[light LightProbe]";

	public diffuseMap:ImageCube;

	public diffuseSampler:SamplerCube = new SamplerCube();

	public specularMap:ImageCube;

	public specularSampler:SamplerCube = new SamplerCube();

	constructor(diffuseMap:ImageCube, specularMap:ImageCube = null)
	{
		super();

		this._pIsEntity = true;

		this.diffuseMap = diffuseMap;
		this.specularMap = specularMap;

		//default bounds type
		this._boundsType = BoundsType.NULL;
	}

	public get traverseName():string
	{
		return LightProbe.traverseName;
	}
	
	public get assetType():string
	{
		return LightProbe.assetType;
	}

	//@override
	public iGetObjectProjectionMatrix(entity:IEntity, cameraTransform:Matrix3D, target:Matrix3D = null):Matrix3D
	{
		throw new ErrorBase("Object projection matrices are not supported for LightProbe objects!");
	}
}