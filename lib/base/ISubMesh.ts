import IMaterialOwner			= require("awayjs-display/lib/base/IMaterialOwner");
import SubGeometryBase			= require("awayjs-display/lib/base/SubGeometryBase");
import Mesh						= require("awayjs-display/lib/entities/Mesh");
import MaterialBase				= require("awayjs-display/lib/materials/MaterialBase");

/**
 * ISubMesh is an interface for object SubMesh that is used to
 * apply a material to a SubGeometry class
 *
 * @class away.base.ISubMesh
 */
interface ISubMesh extends IMaterialOwner
{
	subGeometry:SubGeometryBase;

	parentMesh:Mesh;

	_iIndex:number;

	_iInvalidateRenderableGeometry();

	_iGetExplicitMaterial():MaterialBase;
}

export = ISubMesh;