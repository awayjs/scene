import Plane3D						= require("awayjs-core/lib/geom/Plane3D");

import Scene						= require("awayjs-display/lib/containers/Scene");
import RenderableListItem				= require("awayjs-display/lib/pool/RenderableListItem");
import RenderableListItemPool			= require("awayjs-display/lib/pool/RenderableListItemPool");
import NodeBase						= require("awayjs-display/lib/partition/NodeBase");
import Camera						= require("awayjs-display/lib/entities/Camera");
import IEntity						= require("awayjs-display/lib/entities/IEntity");
import INode						= require("awayjs-display/lib/partition/INode");
import IRenderableOwner = require("awayjs-display/lib/base/IRenderableOwner");

/**
 * @class away.traverse.CollectorBase
 */
class CollectorBase
{
	public scene:Scene;

	public _pRenderableHead:RenderableListItem;
	public _pRenderableListItemPool:RenderableListItemPool;
	public _pCamera:Camera;
	private _customCullPlanes:Array<Plane3D>;
	private _cullPlanes:Array<Plane3D>;
	private _numCullPlanes:number = 0;

	public isEntityCollector:boolean;

	constructor()
	{
		this._pRenderableListItemPool = new RenderableListItemPool();
	}

	/**
	 *
	 */
	public get camera():Camera
	{
		return this._pCamera;
	}

	public set camera(value:Camera)
	{
		this._pCamera = value;
		this._cullPlanes = this._pCamera.frustumPlanes;
	}

	/**
	 *
	 */
	public get cullPlanes():Array<Plane3D>
	{
		return this._customCullPlanes;
	}

	public set cullPlanes(value:Array<Plane3D>)
	{
		this._customCullPlanes = value;
	}

	/**
	 *
	 */
	public get renderableHead():RenderableListItem
	{
		return this._pRenderableHead;
	}

	/**
	 *
	 */
	public clear()
	{
		this._cullPlanes = this._customCullPlanes? this._customCullPlanes : ( this._pCamera? this._pCamera.frustumPlanes : null );
		this._numCullPlanes = this._cullPlanes? this._cullPlanes.length : 0;
		this._pRenderableHead = null;
		this._pRenderableListItemPool.freeAll();
	}

	/**
	 *
	 * @param node
	 * @returns {boolean}
	 */
	public enterNode(node:INode):boolean
	{
		var enter:boolean = this.scene._iCollectionMark != node._iCollectionMark && node.isInFrustum(this._cullPlanes, this._numCullPlanes);

		node._iCollectionMark = this.scene._iCollectionMark;

		return enter;
	}

	/**
	 *
	 * @param entity
	 */
	public applyDirectionalLight(entity:IEntity)
	{
		//don't do anything here
	}

	/**
	 *
	 * @param entity
	 */
	public applyRenderable(renderable:IRenderableOwner)
	{
		var item:RenderableListItem = this._pRenderableListItemPool.getItem();
		item.renderable = renderable;

		item.next = this._pRenderableHead;
		this._pRenderableHead = item;
	}

	/**
	 *
	 * @param entity
	 */
	public applyLightProbe(entity:IEntity)
	{
		//don't do anything here
	}

	/**
	 *
	 * @param entity
	 */
	public applyPointLight(entity:IEntity)
	{
		//don't do anything here
	}

	/**
	 *
	 * @param entity
	 */
	public applySkybox(entity:IEntity)
	{
		//don't do anything here
	}
}

export = CollectorBase;