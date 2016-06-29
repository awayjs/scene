import { Image2D } from "@awayjs/core/lib/image/Image2D";
import { MaterialBase } from "../materials/MaterialBase";
import { TextureBase } from "../textures/TextureBase";
/**
 * BasicMaterial forms an abstract base class for the default shaded materials provided by Stage,
 * using material methods to define their appearance.
 */
export declare class BasicMaterial extends MaterialBase {
    static assetType: string;
    private _preserveAlpha;
    private _texture;
    /**
     *
     */
    readonly assetType: string;
    /**
     * Creates a new BasicMaterial object.
     *
     * @param texture The texture used for the material's albedo color.
     * @param smooth Indicates whether the texture should be filtered when sampled. Defaults to true.
     * @param repeat Indicates whether the texture should be tiled when sampled. Defaults to false.
     * @param mipmap Indicates whether or not any used textures should use mipmapping. Defaults to false.
     */
    constructor(image?: Image2D, alpha?: number);
    constructor(color?: number, alpha?: number);
    /**
     * Indicates whether alpha should be preserved - defaults to false
     */
    preserveAlpha: boolean;
    /**
     * The texture object to use for the albedo colour.
     */
    texture: TextureBase;
}
