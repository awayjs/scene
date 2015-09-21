import SubGeometryBase				= require("awayjs-display/lib/base/SubGeometryBase");
import LineSubGeometry				= require("awayjs-display/lib/base/LineSubGeometry");
import TriangleSubGeometry			= require("awayjs-display/lib/base/TriangleSubGeometry");
import CurveSubGeometry				= require("awayjs-display/lib/base/CurveSubGeometry");

import ISubMesh						= require("awayjs-display/lib/base/ISubMesh");
import ISubMeshClass				= require("awayjs-display/lib/base/ISubMeshClass");
import LineSubMesh					= require("awayjs-display/lib/base/LineSubMesh");
import TriangleSubMesh				= require("awayjs-display/lib/base/TriangleSubMesh");
import CurveSubMesh					= require("awayjs-display/lib/base/CurveSubMesh");
import MaterialBase					= require("awayjs-display/lib/materials/MaterialBase");
import Mesh							= require("awayjs-display/lib/entities/Mesh");

/**
 * @class away.pool.SubMeshPool
 */
class SubMeshPool
{
	private static classPool:Object = new Object();

	public static getNewSubMesh(subGeometry:SubGeometryBase, parentMesh:Mesh, material:MaterialBase = null):ISubMesh
	{
		var subMeshClass:ISubMeshClass = SubMeshPool.classPool[subGeometry.assetType];

		if (!subMeshClass._available.length)
			return new subMeshClass(subGeometry, parentMesh, material);

		var newSubMesh:ISubMesh = subMeshClass._available.pop();

		newSubMesh.subGeometry = subGeometry;
		newSubMesh.parentMesh = parentMesh;
		newSubMesh.material = material;

		return newSubMesh;
	}

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