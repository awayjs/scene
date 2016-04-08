import IAsset						from "awayjs-core/lib/library/IAsset";
import ImageBase					from "awayjs-core/lib/image/ImageBase";
import SamplerBase					from "awayjs-core/lib/image/SamplerBase";

import IAnimationSet				from "awayjs-display/lib/animators/IAnimationSet";
import IRenderable					from "awayjs-display/lib/base/IRenderable";
import LightPickerBase				from "awayjs-display/lib/materials/lightpickers/LightPickerBase";
import TextureBase					from "awayjs-display/lib/textures/TextureBase";
import Style						from "awayjs-display/lib/base/Style";

/**
 * ISurface provides an interface for objects that define the properties of a renderable's surface.
 *
 * @interface away.base.ISurface
 */
interface ISurface extends IAsset
{
	alphaThreshold:number;

	style:Style;

	curves:boolean;

	imageRect:boolean;

	blendMode:string;

	lightPicker:LightPickerBase;

	animationSet:IAnimationSet;

	iOwners:Array<IRenderable>;

	getNumTextures():number;

	getTextureAt(index:number):TextureBase;

	addTexture(texture:TextureBase);

	removeTexture(texture:TextureBase);
}

export default ISurface;