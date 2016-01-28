import AbstractMethodError			= require("awayjs-core/lib/errors/AbstractMethodError");
import AssetEvent					= require("awayjs-core/lib/events/AssetEvent");
import Matrix3D						= require("awayjs-core/lib/geom/Matrix3D");
import Matrix						= require("awayjs-core/lib/geom/Matrix");
import ColorTransform				= require("awayjs-core/lib/geom/ColorTransform");
import AssetBase					= require("awayjs-core/lib/library/AssetBase");

import IAnimator					= require("awayjs-display/lib/animators/IAnimator");
import Camera						= require("awayjs-display/lib/entities/Camera");
import Mesh							= require("awayjs-display/lib/entities/Mesh");
import RenderableOwnerEvent			= require("awayjs-display/lib/events/RenderableOwnerEvent");
import MaterialBase					= require("awayjs-display/lib/materials/MaterialBase");
import Style						= require("awayjs-display/lib/base/Style");
import StyleEvent					= require("awayjs-display/lib/events/StyleEvent");

/**
 * SubMeshBase wraps a TriangleSubGeometry as a scene graph instantiation. A SubMeshBase is owned by a Mesh object.
 *
 *
 * @see away.base.TriangleSubGeometry
 * @see away.entities.Mesh
 *
 * @class away.base.SubMeshBase
 */
class SubMeshBase extends AssetBase
{
	public _uvTransform:Matrix;

	public _iIndex:number = 0;

	private _style:Style;
	public _material:MaterialBase;
	private _onInvalidatePropertiesDelegate:(event:StyleEvent) => void;

	//TODO test shader picking
//		public get shaderPickingDetails():boolean
//		{
//
//			return this.sourceEntity.shaderPickingDetails;
//		}

	/**
	 * The animator object that provides the state for the TriangleSubMesh's animation.
	 */
	public get animator():IAnimator
	{
		return this.parentMesh.animator;
	}

	/**
	 * The material used to render the current TriangleSubMesh. If set to null, its parent Mesh's material will be used instead.
	 */
	public get material():MaterialBase
	{
		return this._material || this.parentMesh.material;
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
	 * The style used to render the current TriangleSubMesh. If set to null, its parent Mesh's style will be used instead.
	 */
	public get style():Style
	{
		return this._style || this.parentMesh.style;
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

		this.invalidateRenderOwner();
	}

	/**
	 * The scene transform object that transforms from model to world space.
	 */
	public get sceneTransform():Matrix3D
	{
		return this.parentMesh.sceneTransform;
	}

	/**
	 * The entity that that initially provided the IRenderable to the render pipeline (ie: the owning Mesh object).
	 */
	public parentMesh:Mesh;

	/**
	 *
	 */
	public get uvTransform():Matrix
	{
		return this._uvTransform || this.parentMesh.uvTransform;
	}

	public set uvTransform(value:Matrix)
	{
		this._uvTransform = value;
	}


	/**
	 * Creates a new SubMeshBase object
	 */
	constructor(parentMesh:Mesh, material:MaterialBase = null, style:Style = null)
	{
		super();

		this._onInvalidatePropertiesDelegate = (event:StyleEvent) => this._onInvalidateProperties(event);

		this.parentMesh = parentMesh;
		this.style = style;
		this.material = material;

	}

	/**
	 *
	 */
	public dispose()
	{
		super.dispose();

		this.style = null;
		this.parentMesh = null;
	}

	/**
	 *
	 * @param camera
	 * @returns {away.geom.Matrix3D}
	 */
	public getRenderSceneTransform(camera:Camera):Matrix3D
	{
		return this.parentMesh.getRenderSceneTransform(camera);
	}

	public invalidateGeometry()
	{
		this.dispatchEvent(new RenderableOwnerEvent(RenderableOwnerEvent.INVALIDATE_GEOMETRY, this));
	}

	public invalidateRenderOwner()
	{
		this.dispatchEvent(new RenderableOwnerEvent(RenderableOwnerEvent.INVALIDATE_RENDER_OWNER, this));
	}

	public _iGetExplicitMaterial():MaterialBase
	{
		return this._material;
	}

	public _iGetExplicitStyle():Style
	{
		return this._style;
	}

	public _iGetExplicitUVTransform():Matrix
	{
		return this._uvTransform;
	}

	private _onInvalidateProperties(event:StyleEvent)
	{
		this.invalidateRenderOwner();
	}

}

export = SubMeshBase;