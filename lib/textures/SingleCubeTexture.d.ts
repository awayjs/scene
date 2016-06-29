import { SamplerCube } from "@awayjs/core/lib/image/SamplerCube";
import { ImageCube } from "@awayjs/core/lib/image/ImageCube";
import { TextureBase } from "../textures/TextureBase";
export declare class SingleCubeTexture extends TextureBase {
    static assetType: string;
    /**
     *
     * @returns {string}
     */
    readonly assetType: string;
    /**
     *
     * @returns {Image2D}
     */
    samplerCube: SamplerCube;
    /**
     *
     * @returns {ImageCube}
     */
    imageCube: ImageCube;
    constructor(imageCube?: ImageCube);
}
