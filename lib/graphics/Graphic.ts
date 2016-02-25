import AbstractMethodError			= require("awayjs-core/lib/errors/AbstractMethodError");
import AssetEvent					= require("awayjs-core/lib/events/AssetEvent");
import Matrix3D						= require("awayjs-core/lib/geom/Matrix3D");
import Matrix						= require("awayjs-core/lib/geom/Matrix");
import ColorTransform				= require("awayjs-core/lib/geom/ColorTransform");
import AssetBase					= require("awayjs-core/lib/library/AssetBase");

import IAnimator					= require("awayjs-display/lib/animators/IAnimator");
import Camera						= require("awayjs-display/lib/display/Camera");
import Mesh							= require("awayjs-display/lib/display/Mesh");
import RenderableEvent			= require("awayjs-display/lib/events/RenderableEvent");
import MaterialBase					= require("awayjs-display/lib/materials/MaterialBase");
import Style						= require("awayjs-display/lib/base/Style");
import StyleEvent					= require("awayjs-display/lib/events/StyleEvent");
import IRenderable 			= require("awayjs-display/lib/base/IRenderable");
import Graphics						= require("awayjs-display/lib/graphics/Graphics");
import ElementsBase					= require("awayjs-display/lib/graphics/ElementsBase");
import IPickingCollider = require("awayjs-display/lib/pick/IPickingCollider");
import PickingCollisionVO = require("awayjs-display/lib/pick/PickingCollisionVO");
import DisplayObject = require("awayjs-display/lib/display/DisplayObject");

/**
 * Graphic wraps a Elements as a scene graph instantiation. A Graphic is owned by a Mesh object.
 *
 *
 * @see away.base.ElementsBase
 * @see away.entities.Mesh
 *
 * @class away.base.Graphic
 */
class Graphic extends AssetBase implements IRenderable
{
	public static _available:Array<Graphic> = new Array<Graphic>();

	public static assetType:string = "[asset Graphic]";

	public _iIndex:number = 0;

	private _style:Style;
	private _material:MaterialBase;
	private _onInvalidatePropertiesDelegate:(event:StyleEvent) => void;

	public parent:Graphics;

	/**
	 * The Elements object which provides the geometry data for this Graphic.
	 */
	public elements:ElementsBase;

	/**
	 *
	 */
	public get assetType():string
	{
		return Graphic.assetType;
	}


	/**
	 *
	 */
	public get animator():IAnimator
	{
		return this.parent.animator;
	}


	/**
	 *
	 */
	public get pickingCollider():IPickingCollider
	{
		return this.parent.sourceEntity.pickingCollider;
	}

	/**
	 * @internal
	 */
	public get _iPickingCollisionVO():PickingCollisionVO
	{
		return this.parent.sourceEntity._iPickingCollisionVO;
	}

	/**
	 * @internal
	 */
	public _iIsMouseEnabled():boolean
	{
		return this.parent.sourceEntity._iIsMouseEnabled();
	}

	/**
	 * @internal
	 */
	public _iAssignedMasks():Array<Array<DisplayObject>>
	{
		return this.parent.sourceEntity._iAssignedMasks();
	}


	//TODO test shader picking
//		public get shaderPickingDetails():boolean
//		{
//
//			return this.sourceEntity.shaderPickingDetails;
//		}

	/**
	 * The material used to render the current TriangleGraphic. If set to null, its parent Mesh's material will be used instead.
	 */
	public get material():MaterialBase
	{
		return this._material || this.parent.material;
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
	 * The style used to render the current TriangleGraphic. If set to null, its parent Mesh's style will be used instead.
	 */
	public get style():Style
	{
		return this._style || this.parent.style;
	}

	public set style(value:Style)
	{
		if (this._style == value)
			return;

		if (this._style)
			this._style.removeEventListener(StyleEvent.INVALIDATE_PROPERTIES, this._onInvalidatePropertiesDelegate);

		this._style = value;

		if (this._style)
			this._style.addEventListener(StyleEvent.INVALIDATE_PROPERTIES, this._onInvalidatePropertiesDelegate);

		this.invalidateSurface();
	}


	/**
	 * Creates a new Graphic object
	 */
	constructor(index:number, parent:Graphics, elements:ElementsBase, material:MaterialBase = null, style:Style = null)
	{
		super();

		this._onInvalidatePropertiesDelegate = (event:StyleEvent) => this._onInvalidateProperties(event);

		this._iIndex = index;
		this.parent = parent;
		this.elements = elements;
		this.material = material;
		this.style = style;
	}

	/**
	 *
	 */
	public dispose()
	{
		super.dispose();

		this.parent.removeGraphic(this);
		this.parent = null;

		Graphic._available.push(this);
	}

	public invalidateElements()
	{
		this.dispatchEvent(new RenderableEvent(RenderableEvent.INVALIDATE_ELEMENTS, this));
	}

	public invalidateSurface()
	{
		this.dispatchEvent(new RenderableEvent(RenderableEvent.INVALIDATE_RENDER_OWNER, this));
	}

	public _iGetExplicitMaterial():MaterialBase
	{
		return this._material;
	}

	public _iGetExplicitStyle():Style
	{
		return this._style;
	}

	private _onInvalidateProperties(event:StyleEvent)
	{
		this.invalidateSurface();
	}

	/**
	 * //TODO
	 *
	 * @param shortestCollisionDistance
	 * @param findClosest
	 * @returns {boolean}
	 *
	 * @internal
	 */
	public _iTestCollision(shortestCollisionDistance:number):boolean
	{
		return this.elements._iTestCollision(this.pickingCollider, this.material, this._iPickingCollisionVO, shortestCollisionDistance)
	}

}

export = Graphic;