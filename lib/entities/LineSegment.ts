import Matrix3D						= require("awayjs-core/lib/geom/Matrix3D");
import UVTransform					= require("awayjs-core/lib/geom/UVTransform");
import Vector3D						= require("awayjs-core/lib/geom/Vector3D");
import AssetType					= require("awayjs-core/lib/library/AssetType");

import IAnimator					= require("awayjs-display/lib/animators/IAnimator");
import DisplayObject				= require("awayjs-display/lib/base/DisplayObject");
import IRenderableOwner				= require("awayjs-display/lib/base/IRenderableOwner");
import EntityNode					= require("awayjs-display/lib/partition/EntityNode");
import IRendererPool				= require("awayjs-display/lib/pool/IRendererPool");
import MaterialEvent				= require("awayjs-display/lib/events/MaterialEvent");
import IEntity						= require("awayjs-display/lib/entities/IEntity");
import MaterialBase					= require("awayjs-display/lib/materials/MaterialBase");

/**
 * A Line Segment primitive.
 */
class LineSegment extends DisplayObject implements IEntity, IRenderableOwner
{
	private _animator:IAnimator;
	private _material:MaterialBase;
	private _uvTransform:UVTransform;

	public _startPosition:Vector3D;
	public _endPosition:Vector3D;
	public _halfThickness:number;


	/**
	 * Defines the animator of the line segment. Act on the line segment's geometry. Defaults to null
	 */
	public get animator():IAnimator
	{
		return this._animator;
	}

	/**
	 *
	 */
	public get assetType():string
	{
		return AssetType.LINE_SEGMENT;
	}

	/**
	 *
	 */
	public get startPostion():Vector3D
	{
		return this._startPosition;
	}

	public set startPosition(value:Vector3D)
	{
		if (this._startPosition == value)
			return;

		this._startPosition = value;

		this.notifyRenderableUpdate();
	}

	/**
	 *
	 */
	public get endPosition():Vector3D
	{
		return this._endPosition;
	}

	public set endPosition(value:Vector3D)
	{
		if (this._endPosition == value)
			return;

		this._endPosition = value;

		this.notifyRenderableUpdate();
	}

	/**
	 *
	 */
	public get material():MaterialBase
	{
		return this._material;
	}

	public set material(value:MaterialBase)
	{
		if (this.material)
			this.material.iRemoveOwner(this);

		this._material = value;

		if (this.material)
			this.material.iAddOwner(this);
	}

	/**
	 *
	 */
	public get thickness():number
	{
		return this._halfThickness*2;
	}

	public set thickness(value:number)
	{
		if (this._halfThickness == value)
			return;

		this._halfThickness = value*0.5;

		this.notifyRenderableUpdate();
	}

	/**
	 *
	 */
	public get uvTransform():UVTransform
	{
		return this._uvTransform;
	}

	public set uvTransform(value:UVTransform)
	{
		this._uvTransform = value;
	}

	/**
	 * Create a line segment
	 *
	 * @param startPosition Start position of the line segment
	 * @param endPosition Ending position of the line segment
	 * @param thickness Thickness of the line
	 */
	constructor(material:MaterialBase, startPosition:Vector3D, endPosition:Vector3D, thickness:number = 1)
	{
		super();

		this._pIsEntity = true;

		this.material = material;

		this._startPosition = startPosition;
		this._endPosition = endPosition;
		this._halfThickness = thickness*0.5;
	}

	public dispose()
	{
		this._startPosition = null;
		this._endPosition = null;
	}

	/**
	 * @protected
	 */
	public pCreateEntityPartitionNode():EntityNode
	{
		return new EntityNode(this);
	}

	/**
	 * @protected
	 */
	public pUpdateBounds()
	{
		this._pBounds.fromExtremes(this._startPosition.x, this._startPosition.y, this._startPosition.z, this._endPosition.x, this._endPosition.y, this._endPosition.z);

		super.pUpdateBounds();
	}

	/**
	 * @private
	 */
	private notifyRenderableUpdate()
	{
		var len:number = this._pRenderables.length;
		for (var i:number = 0; i < len; i++)
			this._pRenderables[i].invalidateGeometry(); //TODO improve performance by only using one geometry for all line segments
	}

	public _iCollectRenderables(rendererPool:IRendererPool)
	{
		// Since this getter is invoked every iteration of the render loop, and
		// the prefab construct could affect the sub-meshes, the prefab is
		// validated here to give it a chance to rebuild.
		if (this._iSourcePrefab)
			this._iSourcePrefab._iValidate();

		this._iCollectRenderable(rendererPool);
	}

	public _iCollectRenderable(rendererPool:IRendererPool)
	{
		rendererPool.applyLineSegment(this);
	}
}

export = LineSegment;