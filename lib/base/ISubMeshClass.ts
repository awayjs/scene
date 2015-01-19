import ISubMesh					= require("awayjs-display/lib/base/ISubMesh");
import MaterialBase				= require("awayjs-display/lib/materials/MaterialBase");
import SubGeometryBase			= require("awayjs-display/lib/base/SubGeometryBase");
import Mesh						= require("awayjs-display/lib/entities/Mesh");

/**
 * ISubMeshClass is an interface for the constructable class definition ISubMesh that is used to
 * apply a material to a SubGeometry class
 *
 * @class away.base.ISubMeshClass
 */
interface ISubMeshClass
{
	/**
	 *
	 */
	new(subGeometry:SubGeometryBase, parentMesh:Mesh, material?:MaterialBase):ISubMesh;
}

export = ISubMeshClass;