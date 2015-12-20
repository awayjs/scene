import ImageCube					= require("awayjs-core/lib/image/ImageCube");
import Matrix3D						= require("awayjs-core/lib/geom/Matrix3D");
import Vector3D						= require("awayjs-core/lib/geom/Vector3D");
import ErrorBase					= require("awayjs-core/lib/errors/ErrorBase");

import LightBase					= require("awayjs-display/lib/base/LightBase");
import BoundsType					= require("awayjs-display/lib/bounds/BoundsType");
import Camera						= require("awayjs-display/lib/entities/Camera");
import IEntity						= require("awayjs-display/lib/entities/IEntity");

class LightProbe extends LightBase implements IEntity
{
	public static assetType:string = "[light LightProbe]";

	private _diffuseMap:ImageCube;
	private _specularMap:ImageCube;

	constructor(diffuseMap:ImageCube, specularMap:ImageCube = null)
	{
		super();

		this._pIsEntity = true;

		this._diffuseMap = diffuseMap;
		this._specularMap = specularMap;

		//default bounds type
		this._boundsType = BoundsType.NULL;
	}

	public get assetType():string
	{
		return LightProbe.assetType;
	}

	public get diffuseMap():ImageCube
	{
		return this._diffuseMap;
	}

	public set diffuseMap(value:ImageCube)
	{
		this._diffuseMap = value;
	}

	public get specularMap():ImageCube
	{
		return this._specularMap;
	}

	public set specularMap(value:ImageCube)
	{
		this._specularMap = value;
	}

	//@override
	public iGetObjectProjectionMatrix(entity:IEntity, camera:Camera, target:Matrix3D = null):Matrix3D
	{
		throw new ErrorBase("Object projection matrices are not supported for LightProbe objects!");
	}
}

export = LightProbe;