import { Sampler2D } from "@awayjs/core/lib/image/Sampler2D";
import { Image2D } from "@awayjs/core/lib/image/Image2D";
import { TextureBase } from "../textures/TextureBase";
export declare class Single2DTexture extends TextureBase {
    private _mappingMode;
    static assetType: string;
    /**
     *
     * @returns {string}
     */
    readonly assetType: string;
    mappingMode: string;
    /**
     *
     * @returns {Image2D}
     */
    sampler2D: Sampler2D;
    /**
     *
     * @returns {Image2D}
     */
    image2D: Image2D;
    constructor(image2D?: Image2D);
}
