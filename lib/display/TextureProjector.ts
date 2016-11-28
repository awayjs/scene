import {ProjectionEvent, Matrix3D, PerspectiveProjection} from "@awayjs/core";

import {TraverserBase, Image2D, TextureBase} from "@awayjs/graphics";

import {HierarchicalProperties} from "../base/HierarchicalProperties";

import {DisplayObjectContainer} from "./DisplayObjectContainer";

/**
 * TextureProjector is an object in the scene that can be used to project textures onto geometry. To do so,
 * the object's material must have a ProjectiveTextureMethod method added to it with a TextureProjector object
 * passed in the constructor.
 * This can be used for various effects apart from acting like a normal projector, such as projecting fake shadows
 * unto a surface, the impact of light coming through a stained glass window, ...
 *
 * @see away3d.materials.methods.ProjectiveTextureMethod
 */
export class TextureProjector extends DisplayObjectContainer
{
	public static traverseName:string = TraverserBase.addEntityName("applyTextureProjector");

	public static assetType:string = "[asset TextureProjector]";
	
	private _projection:PerspectiveProjection;
	private _viewProjectionInvalid:boolean = true;
	private _viewProjection:Matrix3D = new Matrix3D();
	private _texture:TextureBase;
	private _onProjectionMatrixChangedDelegate:(event:ProjectionEvent) => void;
	
	/**
	 * Creates a new TextureProjector object.
	 * @param texture The texture to be projected on the geometry. Since any point that is projected out of the range
	 * of the projector's cone is clamped to the texture's edges, the edges should be entirely neutral.
	 */
	constructor(texture:TextureBase)
	{
		super();
		
		this._onProjectionMatrixChangedDelegate = (event:ProjectionEvent) => this.onProjectionMatrixChanged(event);
		
		this._projection = new PerspectiveProjection();
		//this._projection.preserveFocalLength = true;
		this._projection.addEventListener(ProjectionEvent.MATRIX_CHANGED, this._onProjectionMatrixChangedDelegate);
		this._texture = texture;

		var width:number = (<Image2D> texture.getImageAt(0)).width;
		var height:number = (<Image2D> texture.getImageAt(0)).height;
		this._projection._iAspectRatio = width/height;
		this._projection._iUpdateScissorRect(0, 0, width, height);
		this._projection._iUpdateViewport(0, 0, width, height);
	}
	
	/**
	 * The aspect ratio of the texture or projection. By default this is the same aspect ratio of the texture (width/height)
	 */
	public get aspectRatio():number
	{
		return this._projection._iAspectRatio;
	}
	
	public set aspectRatio(value:number)
	{
		this._projection._iAspectRatio = value;
	}
	
	/**
	 * The vertical field of view of the projection, or the angle of the cone.
	 */
	public get fieldOfView():number
	{
		return this._projection.fieldOfView;
	}
	
	public set fieldOfView(value:number)
	{
		this._projection.fieldOfView = value;
	}


	/**
	 * The focal length of the projection, or the distance to the viewing plance from the camera.
	 */
	public get focalLength():number
	{
		return this._projection.focalLength;
	}

	public set focalLength(value:number)
	{
		this._projection.focalLength = value;
	}


	public get traverseName():string
	{
		return TextureProjector.traverseName;
	}
	
	public get assetType():string
	{
		return TextureProjector.assetType;
	}
	
	/**
	 * The texture to be projected on the geometry.
	 * IMPORTANT: Since any point that is projected out of the range of the projector's cone is clamped to the texture's edges,
	 * the edges should be entirely neutral. Depending on the blend mode, the neutral color is:
	 * White for MULTIPLY,
	 * Black for ADD,
	 * Transparent for MIX
	 */
	public get texture():TextureBase
	{
		return this._texture;
	}
	
	public set texture(value:TextureBase)
	{
		if (value == this._texture)
			return;

		this._texture = value;
	}
	
	/**
	 * The matrix that projects a point in scene space into the texture coordinates.
	 */
	public get viewProjection():Matrix3D
	{
		if (this._viewProjectionInvalid) {
			this._viewProjection.copyFrom(this.inverseSceneTransform);
			this._viewProjection.append(this._projection.matrix);
			this._viewProjectionInvalid = false;
		}
		return this._viewProjection;
	}
	
	/**
	 * @inheritDoc
	 */
	public pInvalidateHierarchicalProperties(propDirty:number):boolean
	{
		if (super.pInvalidateHierarchicalProperties(propDirty))
			return true;

		if (propDirty & HierarchicalProperties.SCENE_TRANSFORM)
			this._viewProjectionInvalid = true;
		
		return false;
	}


	private onProjectionMatrixChanged(event:ProjectionEvent):void
	{
		this._viewProjectionInvalid = true;
	}
}