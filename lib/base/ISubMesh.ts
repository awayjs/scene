import Matrix					= require("awayjs-core/lib/geom/Matrix");

import IRenderableOwner			= require("awayjs-display/lib/base/IRenderableOwner");
import MaterialBase				= require("awayjs-display/lib/materials/MaterialBase");
import SubGeometryBase			= require("awayjs-display/lib/base/SubGeometryBase");
import Mesh						= require("awayjs-display/lib/entities/Mesh");
import Style					= require("awayjs-display/lib/base/Style");

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

	_iGetExplicitStyle():Style;

	_iGetExplicitUVTransform():Matrix;
}

export = ISubMesh;