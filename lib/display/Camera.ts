import {Vector3D, ProjectionBase, PerspectiveProjection} from "@awayjs/core";

import {PartitionBase, BoundingVolumeType, IPartitionTraverser, EntityNode} from "@awayjs/view";

import {CameraEvent} from "../events/CameraEvent";

import {DisplayObjectContainer} from "./DisplayObjectContainer";

export class Camera extends DisplayObjectContainer
{
	public static assetType:string = "[asset Camera]";

	private _projection:ProjectionBase;

	constructor(projection:ProjectionBase = null)
	{
		super();

		this._projection = projection || new PerspectiveProjection();
		this._projection.transform = this._transform;
		this.z = -1000;
	}

	public isEntity():boolean
	{
		return true;
	}

	//@override
	public get assetType():string
	{
		return Camera.assetType;
	}

	/**
	 *
	 */
	public get projection():ProjectionBase
	{
		return this._projection;
	}

	public set projection(value:ProjectionBase)
	{
		if (this._projection == value)
			return;

		if (!value)
			throw new Error("Projection cannot be null!");

		this._projection.transform = null;

		this._projection = value;

		this._projection.transform = this._transform;

		this.dispatchEvent(new CameraEvent(CameraEvent.PROJECTION_CHANGED, this));
	}

	/**
	 * Calculates the normalised position in screen space of the given scene position.
	 *
	 * @param point3d the position vector of the scene coordinates to be projected.
	 * @return The normalised screen position of the given scene coordinates.
	 */
	public project(position:Vector3D, target:Vector3D = null):Vector3D
	{
		return this._projection.project(this._transform.inverseConcatenatedMatrix3D.transformVector(position, target), target);
	}

	/**
	 * Calculates the scene position of the given normalized coordinates in screen space.
	 *
	 * @param nX The normalised x coordinate in screen space, minus the originX offset of the projection property.
	 * @param nY The normalised y coordinate in screen space, minus the originY offset of the projection property.
	 * @param sZ The z coordinate in screen space, representing the distance into the screen.
	 * @return The scene position of the given screen coordinates.
	 */
	public unproject(nX:number, nY:number, sZ:number, target:Vector3D = null):Vector3D
	{
        return this._transform.concatenatedMatrix3D.transformVector(this._projection.unproject(nX, nY, sZ, target));
	}

	protected _getDefaultBoundingVolume():BoundingVolumeType
	{
		return BoundingVolumeType.NULL;
	}
}

/**
 * @class away.partition.CameraNode
 */
export class CameraNode extends EntityNode
{
	/**
	 * @inheritDoc
	 */
	public acceptTraverser(traverser:IPartitionTraverser):void
	{
		// todo: dead end for now, if it has a debug sprite, then sure accept that
	}
}

PartitionBase.registerAbstraction(CameraNode, Camera);