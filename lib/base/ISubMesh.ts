import IRenderableOwner			= require("awayjs-display/lib/base/IRenderableOwner");
import MaterialBase				= require("awayjs-display/lib/materials/MaterialBase");
import SubGeometryBase			= require("awayjs-display/lib/base/SubGeometryBase");
import Mesh						= require("awayjs-display/lib/entities/Mesh");

/**
 * ISubMesh is an interface for object SubMesh that is used to
 * apply a material to a SubGeometry class
 *
 * @class away.base.ISubMesh
 */
interface ISubMesh extends IRenderableOwner
{
	subGeometry:SubGeometryBase;

	parentMesh:Mesh;

	material:MaterialBase;

	_iIndex:number;

	invalidateGeometry();

	_iGetExplicitMaterial():MaterialBase;
}

export = ISubMesh;