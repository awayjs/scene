import SubGeometryBase				= require("awayjs-core/lib/data/SubGeometryBase");
import LineSubGeometry				= require("awayjs-core/lib/data/LineSubGeometry");
import TriangleSubGeometry			= require("awayjs-core/lib/data/TriangleSubGeometry");
import CurveSubGeometry				= require("awayjs-core/lib/data/CurveSubGeometry");

import ISubMeshClass				= require("awayjs-display/lib/base/ISubMeshClass");
import LineSubMesh					= require("awayjs-display/lib/base/LineSubMesh");
import TriangleSubMesh				= require("awayjs-display/lib/base/TriangleSubMesh");
import CurveSubMesh					= require("awayjs-display/lib/base/CurveSubMesh");

/**
 * @class away.pool.SubMeshPool
 */
class SubMeshPool
{
	private static subMeshClassPool:Object = new Object();

	/**
	 *
	 * @param subMeshClass
	 */
	public static addSubMeshClass(subMeshClass:ISubMeshClass, subGeometryType:string):string
	{
		SubMeshPool.subMeshClassPool[subGeometryType] = subMeshClass;

		return subGeometryType;
	}

	/**
	 *
	 * @param subGeometry
	 */
	public static getSubMeshClass(subGeometry:SubGeometryBase):ISubMeshClass
	{
		return SubMeshPool.subMeshClassPool[subGeometry.subGeometryType];
	}

	public static defaultSubMeshTypes =
		[SubMeshPool.addSubMeshClass(LineSubMesh, LineSubGeometry.SUB_GEOMETRY_TYPE),
		SubMeshPool.addSubMeshClass(TriangleSubMesh, TriangleSubGeometry.SUB_GEOMETRY_TYPE),
		SubMeshPool.addSubMeshClass(CurveSubMesh, CurveSubGeometry.SUB_GEOMETRY_TYPE)];
}

export = SubMeshPool;