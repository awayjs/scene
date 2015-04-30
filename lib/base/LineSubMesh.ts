import LineSubGeometry			= require("awayjs-core/lib/data/LineSubGeometry");
import IAssetClass				= require("awayjs-core/lib/library/IAssetClass");

import ISubMesh					= require("awayjs-display/lib/base/ISubMesh");
import SubMeshBase				= require("awayjs-display/lib/base/SubMeshBase");
import IRendererPool			= require("awayjs-display/lib/pool/IRendererPool");
import SubMeshPool				= require("awayjs-display/lib/pool/SubMeshPool");
import Mesh						= require("awayjs-display/lib/entities/Mesh");
import MaterialBase				= require("awayjs-display/lib/materials/MaterialBase");

/**
 * LineSubMesh wraps a LineSubGeometry as a scene graph instantiation. A LineSubMesh is owned by a Mesh object.
 *
 *
 * @see away.base.LineSubGeometry
 * @see away.entities.Mesh
 *
 * @class away.base.LineSubMesh
 */
class LineSubMesh extends SubMeshBase implements ISubMesh
{
	public static assetType:string = "[asset LineSubMesh]";

	public static assetClass:IAssetClass = LineSubGeometry;

	private _subGeometry:LineSubGeometry;

	/**
	 *
	 */
	public get assetType():string
	{
		return LineSubMesh.assetType;
	}

	/**
	 * The LineSubGeometry object which provides the geometry data for this LineSubMesh.
	 */
	public get subGeometry():LineSubGeometry
	{
		return this._subGeometry;
	}

	/**
	 * Creates a new LineSubMesh object
	 * @param subGeometry The LineSubGeometry object which provides the geometry data for this LineSubMesh.
	 * @param parentMesh The Mesh object to which this LineSubMesh belongs.
	 * @param material An optional material used to render this LineSubMesh.
	 */
	constructor(subGeometry:LineSubGeometry, parentMesh:Mesh, material:MaterialBase = null)
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
		this.material = null;

		super.dispose();
	}

	public _iCollectRenderable(rendererPool:IRendererPool)
	{
		rendererPool.applyLineSubMesh(this);
	}
}

export = LineSubMesh;