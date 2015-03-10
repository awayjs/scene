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
	public static registerSubMeshClass(subMeshClass:ISubMeshClass)
	{
		SubMeshPool.subMeshClassPool[subMeshClass.geometryType] = subMeshClass;
	}

	/**
	 *
	 * @param subGeometry
	 */
	public static getSubMeshClass(subGeometry:SubGeometryBase):ISubMeshClass
	{
		return SubMeshPool.subMeshClassPool[subGeometry.assetType];
	}

	public static main = SubMeshPool.addDefaults();

	public static addDefaults()
	{
		SubMeshPool.registerSubMeshClass(LineSubMesh);
		SubMeshPool.registerSubMeshClass(TriangleSubMesh);
		SubMeshPool.registerSubMeshClass(CurveSubMesh);
	}
}

export = SubMeshPool;