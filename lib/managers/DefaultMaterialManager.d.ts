import { Sampler2D } from "@awayjs/core/lib/image/Sampler2D";
import { BitmapImage2D } from "@awayjs/core/lib/image/BitmapImage2D";
import { BitmapImageCube } from "@awayjs/core/lib/image/BitmapImageCube";
import { IRenderable } from "../base/IRenderable";
import { MaterialBase } from "../materials/MaterialBase";
import { TextureBase } from "../textures/TextureBase";
export declare class DefaultMaterialManager {
    private static _defaultSampler2D;
    private static _defaultBitmapImage2D;
    private static _defaultBitmapImageCube;
    private static _defaultCubeTextureMaterial;
    private static _defaultTextureMaterial;
    private static _defaultColorMaterial;
    private static _defaultTexture;
    private static _defaultCubeTexture;
    static getDefaultMaterial(renderable?: IRenderable): MaterialBase;
    static getDefaultTexture(renderable?: IRenderable): TextureBase;
    static getDefaultImage2D(): BitmapImage2D;
    static getDefaultImageCube(): BitmapImageCube;
    static getDefaultSampler(): Sampler2D;
    private static createDefaultTexture();
    private static createDefaultCubeTexture();
    private static createDefaultImageCube();
    private static createDefaultImage2D();
    private static createDefaultTextureMaterial();
    private static createDefaultCubeTextureMaterial();
    private static createDefaultColorMaterial();
    private static createDefaultSampler2D();
}
