import { ImageBase } from "@awayjs/core/lib/image/ImageBase";
import { SamplerBase } from "@awayjs/core/lib/image/SamplerBase";
import { Matrix } from "@awayjs/core/lib/geom/Matrix";
import { EventDispatcher } from "@awayjs/core/lib/events/EventDispatcher";
import { TextureBase } from "../textures/TextureBase";
/**
 *
 */
export declare class Style extends EventDispatcher {
    private _sampler;
    private _samplers;
    private _image;
    private _images;
    private _uvMatrix;
    private _color;
    sampler: SamplerBase;
    image: ImageBase;
    uvMatrix: Matrix;
    /**
     * The diffuse reflectivity color of the surface.
     */
    color: number;
    constructor();
    getImageAt(texture: TextureBase, index?: number): ImageBase;
    getSamplerAt(texture: TextureBase, index?: number): SamplerBase;
    addImageAt(image: ImageBase, texture: TextureBase, index?: number): void;
    addSamplerAt(sampler: SamplerBase, texture: TextureBase, index?: number): void;
    removeImageAt(texture: TextureBase, index?: number): void;
    removeSamplerAt(texture: TextureBase, index?: number): void;
    private _invalidateProperties();
}
