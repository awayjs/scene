import ImageCube					= require("awayjs-core/lib/image/ImageCube");
import SamplerCube					= require("awayjs-core/lib/image/SamplerCube");
import Matrix3D						= require("awayjs-core/lib/geom/Matrix3D");
import Vector3D						= require("awayjs-core/lib/geom/Vector3D");
import ErrorBase					= require("awayjs-core/lib/errors/ErrorBase");

import LightBase					= require("awayjs-display/lib/display/LightBase");
import BoundsType					= require("awayjs-display/lib/bounds/BoundsType");
import Camera						= require("awayjs-display/lib/display/Camera");
import IEntity						= require("awayjs-display/lib/display/IEntity");

class LightProbe extends LightBase implements IEntity
{
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

	public get assetType():string
	{
		return LightProbe.assetType;
	}

	//@override
	public iGetObjectProjectionMatrix(entity:IEntity, camera:Camera, target:Matrix3D = null):Matrix3D
	{
		throw new ErrorBase("Object projection matrices are not supported for LightProbe objects!");
	}
}

export = LightProbe;