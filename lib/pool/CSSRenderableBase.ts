import Matrix3D						= require("awayjs-core/lib/geom/Matrix3D");

import IRenderableOwner				= require("awayjs-display/lib/base/IRenderableOwner");
import IRenderable					= require("awayjs-display/lib/pool/IRenderable");
import IRenderablePool				= require("awayjs-display/lib/pool/IRenderablePool");
import IEntity						= require("awayjs-display/lib/entities/IEntity");

/**
 * @class away.pool.RenderableListItem
 */
class CSSRenderableBase implements IRenderable
{
	/**
	 *
	 */
	private _pool:IRenderablePool;

	/**
	 *
	 */
	public next:CSSRenderableBase;

	/**
	 *
	 */
	public materialId:number;

	/**
	 *
	 */
	public renderOrderId:number;

	/**
	 *
	 */
	public zIndex:number;

	/**
	 *
	 */
	public cascaded:boolean;

	/**
	 *
	 */
	public renderSceneTransform:Matrix3D;

	/**
	 *
	 */
	public sourceEntity:IEntity;

	/**
	 *
	 */
	public renderObjectId:number;

	/**
	 *
	 */
	public renderableOwner:IRenderableOwner;

	/**
	 *
	 */
	public htmlElement:HTMLElement;

	/**
	 *
	 * @param sourceEntity
	 * @param material
	 * @param animator
	 */
	constructor(pool:IRenderablePool, sourceEntity:IEntity, renderableOwner:IRenderableOwner)
	{
		//store a reference to the pool for later disposal
		this._pool = pool;

		this.sourceEntity = sourceEntity;

		this.renderableOwner = renderableOwner;
	}

	/**
	 *
	 */
	public dispose()
	{
		this._pool.disposeItem(this.renderableOwner);
	}

	/**
	 *
	 */
	public invalidateGeometry()
	{

	}

	/**
	 *
	 */
	public invalidateIndexData()
	{

	}

	/**
	 *
	 */
	public invalidateVertexData(dataType:string)
	{

	}
}

export = CSSRenderableBase;