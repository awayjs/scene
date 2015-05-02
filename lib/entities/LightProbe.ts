import ImageCube					= require("awayjs-core/lib/data/ImageCube");
import Matrix3D						= require("awayjs-core/lib/geom/Matrix3D");
import Vector3D						= require("awayjs-core/lib/geom/Vector3D");
import Error						= require("awayjs-core/lib/errors/Error");

import IRenderer					= require("awayjs-display/lib/IRenderer");
import LightBase					= require("awayjs-display/lib/base/LightBase");
import BoundsType					= require("awayjs-display/lib/bounds/BoundsType");
import Partition					= require("awayjs-display/lib/partition/Partition");
import Camera						= require("awayjs-display/lib/entities/Camera");
import IEntity						= require("awayjs-display/lib/entities/IEntity");

class LightProbe extends LightBase implements IEntity
{
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
		throw new Error("Object projection matrices are not supported for LightProbe objects!");
	}

	public _applyRenderer(renderer:IRenderer)
	{
		//nothing to do here
	}

	public _pRegisterEntity(partition:Partition)
	{
		partition._iRegisterLightProbe(this);
	}

	public _pUnregisterEntity(partition:Partition)
	{
		partition._iUnregisterLightProbe(this);
	}
}

export = LightProbe;