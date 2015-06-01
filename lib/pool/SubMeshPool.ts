import SubGeometryBase				= require("awayjs-display/lib/base/SubGeometryBase");
import LineSubGeometry				= require("awayjs-display/lib/base/LineSubGeometry");
import TriangleSubGeometry			= require("awayjs-display/lib/base/TriangleSubGeometry");
import CurveSubGeometry				= require("awayjs-display/lib/base/CurveSubGeometry");

import ISubMeshClass				= require("awayjs-display/lib/base/ISubMeshClass");
import LineSubMesh					= require("awayjs-display/lib/base/LineSubMesh");
import TriangleSubMesh				= require("awayjs-display/lib/base/TriangleSubMesh");
import CurveSubMesh					= require("awayjs-display/lib/base/CurveSubMesh");

/**
 * @class away.pool.SubMeshPool
 */
class SubMeshPool
{
	private static classPool:Object = new Object();

	/**
	 *
	 * @param subMeshClass
	 */
	public static registerClass(subMeshClass:ISubMeshClass)
	{
		SubMeshPool.classPool[subMeshClass.assetClass.assetType] = subMeshClass;
	}

	/**
	 *
	 * @param subGeometry
	 */
	public static getClass(subGeometry:SubGeometryBase):ISubMeshClass
	{
		return SubMeshPool.classPool[subGeometry.assetType];
	}

	private static main = SubMeshPool.addDefaults();

	private static addDefaults()
	{
		SubMeshPool.registerClass(LineSubMesh);
		SubMeshPool.registerClass(TriangleSubMesh);
		SubMeshPool.registerClass(CurveSubMesh);
	}
}

export = SubMeshPool;