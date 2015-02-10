import Plane3D						= require("awayjs-core/lib/geom/Plane3D");
import Vector3D						= require("awayjs-core/lib/geom/Vector3D");
import AbstractMethodError			= require("awayjs-core/lib/errors/AbstractMethodError");

import CollectorBase				= require("awayjs-display/lib/traverse/CollectorBase");
import IEntity						= require("awayjs-display/lib/entities/IEntity");

/**
 * @class away.partition.NodeBase
 */
class NodeBase
{
	private _debugChildrenVisible:boolean;
	private _explicitDebugVisible:boolean;
	public _pImplicitDebugVisible:boolean;
	public _iParent:NodeBase;
	public _pChildNodes:Array<NodeBase>;
	public _pNumChildNodes:number = 0;

	public _pDebugEntity:IEntity;

	public _iNumEntities:number = 0;
	public _iCollectionMark:number;// = 0;

	/**
	 *
	 */
	public get debugVisible():boolean
	{
		return this._explicitDebugVisible;
	}

	public set debugVisible(value:boolean)
	{
		if (this._explicitDebugVisible == value)
			return;

		this._explicitDebugVisible = value;

		this._iUpdateImplicitDebugVisible(this._iParent? this._iParent.debugChildrenVisible : false);

	}

	public get debugChildrenVisible():boolean
	{
		return this._debugChildrenVisible;
	}

	public set debugChildrenVisible(value:boolean)
	{
		if (this._debugChildrenVisible == value)
			return;

		this._debugChildrenVisible = value;

		for (var i:number = 0; i < this._pNumChildNodes; ++i)
			this._pChildNodes[i]._iUpdateImplicitDebugVisible(this._debugChildrenVisible);
	}

	/**
	 *
	 */
	public get parent():NodeBase
	{
		return this._iParent;
	}

	/**
	 *
	 * @protected
	 */
	public get _pNumEntities():number
	{
		return this._iNumEntities;
	}

	/**
	 *
	 */
	constructor()
	{
		this._pChildNodes = new Array<NodeBase>();
	}

	/**
	 *
	 * @param planes
	 * @param numPlanes
	 * @returns {boolean}
	 * @internal
	 */
	public isInFrustum(planes:Array<Plane3D>, numPlanes:number):boolean
	{
		return true;
	}

	/**
	 *
	 * @param rayPosition
	 * @param rayDirection
	 * @returns {boolean}
	 */
	public isIntersectingRay(rayPosition:Vector3D, rayDirection:Vector3D):boolean
	{
		return true;
	}

	/**
	 *
	 * @returns {boolean}
	 */
	public isCastingShadow():boolean
	{
		return true;
	}

	/**
	 *
	 * @param entity
	 * @returns {away.partition.NodeBase}
	 */
	public findPartitionForEntity(entity:IEntity):NodeBase
	{
		return this;
	}

	/**
	 *
	 * @param traverser
	 */
	public acceptTraverser(traverser:CollectorBase)
	{
		if (this._pNumEntities == 0 && !this._pImplicitDebugVisible)
			return;

		if (traverser.enterNode(this)) {
			var i:number = 0;

			while (i < this._pNumChildNodes)
				this._pChildNodes[i++].acceptTraverser(traverser);

			if (this._pImplicitDebugVisible && traverser.isEntityCollector)
				traverser.applyEntity(this._pDebugEntity);
		}
	}

	/**
	 *
	 * @protected
	 */
	public applyDebugEntity(traverser:CollectorBase)
	{
		if (this._pDebugEntity == null)
			this._pDebugEntity = this._pCreateDebugEntity();

		traverser.applyEntity(this._pDebugEntity);
	}

	/**
	 *
	 * @param node
	 * @internal
	 */
	public iAddNode(node:NodeBase)
	{
		node._iParent = this;
		this._iNumEntities += node._pNumEntities;
		this._pChildNodes[ this._pNumChildNodes++ ] = node;

		node._iUpdateImplicitDebugVisible(this.debugChildrenVisible);

		var numEntities:number = node._pNumEntities;
		node = this;

		do {
			node._iNumEntities += numEntities;
		} while ((node = node._iParent) != null);
	}

	/**
	 *
	 * @param node
	 * @internal
	 */
	public iRemoveNode(node:NodeBase)
	{
		var index:number = this._pChildNodes.indexOf(node);
		this._pChildNodes[index] = this._pChildNodes[--this._pNumChildNodes];
		this._pChildNodes.pop();

		node._iUpdateImplicitDebugVisible(false);

		var numEntities:number = node._pNumEntities;
		node = this;

		do {
			node._pNumEntities -= numEntities;
		} while ((node = node._iParent) != null);
	}

	private _iUpdateImplicitDebugVisible(value:boolean)
	{
		if (this._pImplicitDebugVisible == this._explicitDebugVisible || value)
			return;

		this._pImplicitDebugVisible = this._explicitDebugVisible || value;

		for (var i:number = 0; i < this._pNumChildNodes; ++i)
			this._pChildNodes[i]._iUpdateImplicitDebugVisible(this._debugChildrenVisible);

		if (this._pImplicitDebugVisible) {
			this._pDebugEntity = this._pCreateDebugEntity();
		} else {
			//this._pDebugEntity.dispose();
			this._pDebugEntity = null;
		}
		
	}

	public updateDebugEntity()
	{
		if (this._pImplicitDebugVisible) {
			//this._pDebugEntity.dispose();
			this._pDebugEntity = this._pCreateDebugEntity();
		}
	}

	public _pCreateDebugEntity():IEntity
	{
		throw new AbstractMethodError();
	}
}

export = NodeBase;