import CurveSubGeometry			= require("awayjs-core/lib/data/CurveSubGeometry");
import IAssetClass				= require("awayjs-core/lib/library/IAssetClass");

import ISubMesh					= require("awayjs-display/lib/base/ISubMesh");
import SubMeshBase				= require("awayjs-display/lib/base/SubMeshBase");
import SubMeshPool				= require("awayjs-display/lib/pool/SubMeshPool");
import Mesh						= require("awayjs-display/lib/entities/Mesh");
import MaterialBase				= require("awayjs-display/lib/materials/MaterialBase");

/**
 * CurveSubMesh wraps a CurveSubGeometry as a scene graph instantiation. A CurveSubMesh is owned by a Mesh object.
 *
 *
 * @see away.base.CurveSubGeometry
 * @see away.entities.Mesh
 *
 * @class away.base.CurveSubMesh
 */
class CurveSubMesh extends SubMeshBase implements ISubMesh
{
	public static assetType:string = "[asset CurveSubMesh]";

	public static assetClass:IAssetClass = CurveSubGeometry;

	private _subGeometry:CurveSubGeometry;

	/**
	 *
	 */
	public get assetType():string
	{
		return CurveSubMesh.assetType;
	}

	/**
	 * The TriangleSubGeometry object which provides the geometry data for this CurveSubMesh.
	 */
	public get subGeometry():CurveSubGeometry
	{
		return this._subGeometry;
	}

	/**
	 * Creates a new CurveSubMesh object
	 * @param subGeometry The TriangleSubGeometry object which provides the geometry data for this CurveSubMesh.
	 * @param parentMesh The Mesh object to which this CurveSubMesh belongs.
	 * @param material An optional material used to render this CurveSubMesh.
	 */
	constructor(subGeometry:CurveSubGeometry, parentMesh:Mesh, material:MaterialBase = null)
	{
		super();

		this._pParentMesh = parentMesh;
		this._subGeometry = subGeometry;
		this.material = material;
	}

	/**
	 *
	 */
	public dispose()
	{
		super.dispose();
	}
}

export = CurveSubMesh;