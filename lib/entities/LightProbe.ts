import Matrix3D						= require("awayjs-core/lib/geom/Matrix3D");
import Vector3D						= require("awayjs-core/lib/geom/Vector3D");
import Error						= require("awayjs-core/lib/errors/Error");

import LightBase					= require("awayjs-display/lib/base/LightBase");
import BoundsType					= require("awayjs-display/lib/bounds/BoundsType");
import Partition					= require("awayjs-display/lib/partition/Partition");
import EntityNode					= require("awayjs-display/lib/partition/EntityNode");
import LightProbeNode				= require("awayjs-display/lib/partition/LightProbeNode");
import IRendererPool				= require("awayjs-display/lib/pool/IRendererPool");
import Camera						= require("awayjs-display/lib/entities/Camera");
import IEntity						= require("awayjs-display/lib/entities/IEntity");
import CubeTextureBase				= require("awayjs-core/lib/textures/CubeTextureBase");

class LightProbe extends LightBase implements IEntity
{
	private _diffuseMap:CubeTextureBase;
	private _specularMap:CubeTextureBase;

	constructor(diffuseMap:CubeTextureBase, specularMap:CubeTextureBase = null)
	{
		super();

		this._pIsEntity = true;

		this._diffuseMap = diffuseMap;
		this._specularMap = specularMap;

		//default bounds type
		this._boundsType = BoundsType.NULL;
	}

	public get diffuseMap():CubeTextureBase
	{
		return this._diffuseMap;
	}

	public set diffuseMap(value:CubeTextureBase)
	{
		this._diffuseMap = value;
	}

	public get specularMap():CubeTextureBase
	{
		return this._specularMap;
	}

	public set specularMap(value:CubeTextureBase)
	{
		this._specularMap = value;
	}

	//@override
	public iGetObjectProjectionMatrix(entity:IEntity, camera:Camera, target:Matrix3D = null):Matrix3D
	{
		throw new Error("Object projection matrices are not supported for LightProbe objects!");
	}

	public _iCollectRenderables(rendererPool:IRendererPool)
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