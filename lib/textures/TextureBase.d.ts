import { ImageBase } from "@awayjs/core/lib/image/ImageBase";
import { SamplerBase } from "@awayjs/core/lib/image/SamplerBase";
import { AssetBase } from "@awayjs/core/lib/library/AssetBase";
/**
 *
 */
export declare class TextureBase extends AssetBase {
    _numImages: number;
    _images: Array<ImageBase>;
    _samplers: Array<SamplerBase>;
    /**
     *
     */
    constructor();
    getNumImages(): number;
    setNumImages(value: number): void;
    getImageAt(index: number): ImageBase;
    setImageAt(image: ImageBase, index: number): void;
    getSamplerAt(index: number): SamplerBase;
    setSamplerAt(sampler: SamplerBase, index: number): void;
}
