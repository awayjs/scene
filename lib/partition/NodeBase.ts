import DisplayObject				= require("awayjs-display/lib/base/DisplayObject");
import Plane3D						= require("awayjs-core/lib/geom/Plane3D");
import Vector3D						= require("awayjs-core/lib/geom/Vector3D");
import AbstractMethodError			= require("awayjs-core/lib/errors/AbstractMethodError");

import CollectorBase				= require("awayjs-display/lib/traverse/CollectorBase");
import IEntity						= require("awayjs-display/lib/entities/IEntity");
import INode						= require("awayjs-display/lib/partition/INode");

/**
 * @class away.partition.NodeBase
 */
class NodeBase implements INode
{
	private _debugChildrenVisible:boolean;
	private _explicitDebugVisible:boolean;
	public _pImplicitDebugVisible:boolean;
	public _pChildNodes:Array<INode> = new Array<INode>();
	public _pNumChildNodes:number = 0;

	public _pDebugEntity:IEntity;

	public _iCollectionMark:number;// = 0;

	public numEntities:number = 0;

	public parent:INode;
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

		this._iUpdateImplicitDebugVisible(this.parent? this.parent.debugChildrenVisible : false);

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
	constructor()
	{
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

	public dispose()
	{
		this.parent = null;
		this._pChildNodes = null;
	}

	/**
	 *
	 * @param traverser
	 */
	public acceptTraverser(traverser:CollectorBase)
	{
		if (this.numEntities == 0 && !this._pImplicitDebugVisible)
			return;

		if (traverser.enterNode(this)) {
			for (var i:number = 0; i < this._pNumChildNodes; i++)
				this._pChildNodes[i].acceptTraverser(traverser);

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
	public iAddNode(node:INode)
	{
		node.parent = this;
		this.numEntities += node.numEntities;
		this._pChildNodes[ this._pNumChildNodes++ ] = node;

		node._iUpdateImplicitDebugVisible(this.debugChildrenVisible);

		var numEntities:number = node.numEntities;
		node = this;

		do {
			node.numEntities += numEntities;
		} while ((node = node.parent) != null);
	}

	/**
	 *
	 * @param node
	 * @internal
	 */
	public iRemoveNode(node:INode)
	{
		var index:number = this._pChildNodes.indexOf(node);
		this._pChildNodes[index] = this._pChildNodes[--this._pNumChildNodes];
		this._pChildNodes.pop();

		node._iUpdateImplicitDebugVisible(false);

		var numEntities:number = node.numEntities;
		node = this;

		do {
			node.numEntities -= numEntities;
		} while ((node = node.parent) != null);
	}

	public _iUpdateImplicitDebugVisible(value:boolean)
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