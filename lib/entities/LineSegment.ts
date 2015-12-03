import ImageBase					= require("awayjs-core/lib/data/ImageBase");
import SamplerBase					= require("awayjs-core/lib/data/SamplerBase");
import Matrix3D						= require("awayjs-core/lib/geom/Matrix3D");
import UVTransform					= require("awayjs-core/lib/geom/UVTransform");
import ColorTransform				= require("awayjs-core/lib/geom/ColorTransform");
import Vector3D						= require("awayjs-core/lib/geom/Vector3D");

import IRenderer					= require("awayjs-display/lib/IRenderer");
import IAnimator					= require("awayjs-display/lib/animators/IAnimator");
import DisplayObject				= require("awayjs-display/lib/base/DisplayObject");
import IRenderableOwner				= require("awayjs-display/lib/base/IRenderableOwner");
import BoundsType					= require("awayjs-display/lib/bounds/BoundsType");
import MaterialEvent				= require("awayjs-display/lib/events/MaterialEvent");
import IEntity						= require("awayjs-display/lib/entities/IEntity");
import MaterialBase					= require("awayjs-display/lib/materials/MaterialBase");
import TextureBase					= require("awayjs-display/lib/textures/TextureBase");

/**
 * A Line Segment primitive.
 */
class LineSegment extends DisplayObject implements IEntity, IRenderableOwner
{
	private _images:Array<ImageBase> = new Array<ImageBase>();
	private _samplers:Array<SamplerBase> = new Array<SamplerBase>();

	public static assetType:string = "[asset LineSegment]";

	private _animator:IAnimator;
	private _material:MaterialBase;
	private _uvTransform:UVTransform;
	private _colorTransform:ColorTransform;

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
		return LineSegment.assetType;
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
	 *
	 */
	public get colorTransform():ColorTransform
	{
		return this._colorTransform;// || this._pParentMesh._colorTransform;
	}

	public set colorTransform(value:ColorTransform)
	{
		this._colorTransform = value;
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

		//default bounds type
		this._boundsType = BoundsType.AXIS_ALIGNED_BOX;
	}

	public dispose()
	{
		this._startPosition = null;
		this._endPosition = null;
	}


	public getImageAt(index:number):ImageBase
	{
		return this._images[index];
	}

	public addImageAt(image:ImageBase, index:number)
	{
		this._images[index] = image;
	}

	public removeImageAt(image:ImageBase, index:number)
	{
		this._images[index] = null;
	}


	public getSamplerAt(index:number):SamplerBase
	{
		return this._samplers[index];
	}

	public addSamplerAt(sampler:SamplerBase, index:number)
	{
		this._samplers[index] = sampler;
	}

	public removeSamplerAt(index:number)
	{
		this._samplers[index] = null;
	}

	/**
	 * @protected
	 */
	public _pUpdateBoxBounds()
	{
		super._pUpdateBoxBounds();

		this._pBoxBounds.x = Math.min(this._startPosition.x, this._endPosition.x);
		this._pBoxBounds.y = Math.min(this._startPosition.y, this._endPosition.y);
		this._pBoxBounds.z = Math.min(this._startPosition.z, this._endPosition.z);
		this._pBoxBounds.width = Math.abs(this._startPosition.x - this._endPosition.x);
		this._pBoxBounds.height = Math.abs(this._startPosition.y - this._endPosition.y);
		this._pBoxBounds.depth = Math.abs(this._startPosition.z - this._endPosition.z);
	}

	public _pUpdateSphereBounds()
	{
		super._pUpdateSphereBounds();

		this._pUpdateBoxBounds();

		var halfWidth:number = (this._endPosition.x - this._startPosition.x)/2;
		var halfHeight:number = (this._endPosition.y - this._startPosition.y)/2;
		var halfDepth:number = (this._endPosition.z - this._startPosition.z)/2;
		this._pSphereBounds.x = this._startPosition.x + halfWidth;
		this._pSphereBounds.y = this._startPosition.y + halfHeight;
		this._pSphereBounds.z = this._startPosition.z + halfDepth;
		this._pSphereBounds.radius = Math.sqrt(halfWidth*halfWidth + halfHeight*halfHeight + halfDepth*halfDepth);
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

	public _applyRenderer(renderer:IRenderer)
	{
		// Since this getter is invoked every iteration of the render loop, and
		// the prefab construct could affect the sub-meshes, the prefab is
		// validated here to give it a chance to rebuild.
		if (this._iSourcePrefab)
			this._iSourcePrefab._iValidate();

		renderer._iApplyRenderableOwner(this);
	}
}

export = LineSegment;