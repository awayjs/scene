import {ProjectionEvent, Matrix3D, PerspectiveProjection} from "@awayjs/core";

import {TraverserBase, Image2D, TextureBase} from "@awayjs/graphics";

import {HierarchicalProperties} from "../base/HierarchicalProperties";
import {TextureProjectorEvent} from "../events/TextureProjectorEvent";

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
	private _texture:TextureBase;
	
	/**
	 * Creates a new TextureProjector object.
	 * @param texture The texture to be projected on the geometry. Since any point that is projected out of the range
	 * of the projector's cone is clamped to the texture's edges, the edges should be entirely neutral.
	 */
	constructor(texture:TextureBase)
	{
		super();
		
		this._projection = new PerspectiveProjection();
		this._projection.transform = this._transform;

		this._texture = texture;

		var width:number = (<Image2D> texture.getImageAt(0)).width;
		var height:number = (<Image2D> texture.getImageAt(0)).height;
		this._projection.setViewRect(0, 0, width, height);
		this._projection.setStageRect(0, 0, width, height);
	}
	
	/**
	 *
	 */
	public get projection():PerspectiveProjection
	{
		return this._projection;
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

		var width:number = (<Image2D> value.getImageAt(0)).width;
		var height:number = (<Image2D> value.getImageAt(0)).height;
		this._projection.setViewRect(0, 0, width, height);
		this._projection.setStageRect(0, 0, width, height);

		this.dispatchEvent(new TextureProjectorEvent(TextureProjectorEvent.TEXTURE_CHANGE));
	}
}