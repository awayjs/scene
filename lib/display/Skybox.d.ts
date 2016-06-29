import { ImageCube } from "@awayjs/core/lib/image/ImageCube";
import { ITraverser } from "../ITraverser";
import { IAnimationSet } from "../animators/IAnimationSet";
import { IAnimator } from "../animators/IAnimator";
import { DisplayObject } from "../display/DisplayObject";
import { IRenderable } from "../base/IRenderable";
import { ISurface } from "../base/ISurface";
import { IEntity } from "../display/IEntity";
import { LightPickerBase } from "../materials/lightpickers/LightPickerBase";
import { SingleCubeTexture } from "../textures/SingleCubeTexture";
import { TextureBase } from "../textures/TextureBase";
import { Style } from "../base/Style";
import { IPickingCollider } from "../pick/IPickingCollider";
import { PickingCollision } from "../pick/PickingCollision";
/**
 * A Skybox class is used to render a sky in the scene. It's always considered static and 'at infinity', and as
 * such it's always centered at the camera's position and sized to exactly fit within the camera's frustum, ensuring
 * the sky box is always as large as possible without being clipped.
 */
export declare class Skybox extends DisplayObject implements IEntity, IRenderable, ISurface {
    private _textures;
    static assetType: string;
    private _texture;
    _pAlphaThreshold: number;
    private _animationSet;
    _pLightPicker: LightPickerBase;
    _pBlendMode: string;
    private _owners;
    private _curves;
    private _imageRect;
    private _onInvalidatePropertiesDelegate;
    private _style;
    private _animator;
    private _onTextureInvalidateDelegate;
    /**
     * The minimum alpha value for which pixels should be drawn. This is used for transparency that is either
     * invisible or entirely opaque, often used with textures for foliage, etc.
     * Recommended values are 0 to disable alpha, or 0.5 to create smooth edges. Default value is 0 (disabled).
     */
    alphaThreshold: number;
    /**
     * Indicates whether skybox should use curves. Defaults to false.
     */
    curves: boolean;
    /**
     * Indicates whether or not the Skybox texture should use imageRects. Defaults to false.
     */
    imageRect: boolean;
    /**
     * The light picker used by the material to provide lights to the material if it supports lighting.
     *
     * @see LightPickerBase
     * @see StaticLightPicker
     */
    readonly lightPicker: LightPickerBase;
    /**
     *
     */
    readonly animationSet: IAnimationSet;
    /**
     * The blend mode to use when drawing this renderable. The following blend modes are supported:
     * <ul>
     * <li>BlendMode.NORMAL: No blending, unless the material inherently needs it</li>
     * <li>BlendMode.LAYER: Force blending. This will draw the object the same as NORMAL, but without writing depth writes.</li>
     * <li>BlendMode.MULTIPLY</li>
     * <li>BlendMode.ADD</li>
     * <li>BlendMode.ALPHA</li>
     * </ul>
     */
    blendMode: string;
    /**
     * A list of the IRenderables that use this material
     *
     * @private
     */
    readonly iOwners: Array<IRenderable>;
    readonly animator: IAnimator;
    /**
    * The cube texture to use as the skybox.
    */
    texture: SingleCubeTexture;
    getNumTextures(): number;
    getTextureAt(index: number): TextureBase;
    /**
     *
     */
    readonly style: Style;
    /**
     * Create a new Skybox object.
     *
     * @param material	The material with which to render the Skybox.
     */
    constructor(image?: ImageCube);
    readonly assetType: string;
    /**
     * Marks the shader programs for all passes as invalid, so they will be recompiled before the next use.
     *
     * @private
     */
    invalidatePasses(): void;
    invalidateElements(): void;
    invalidateSurface(): void;
    addTexture(texture: TextureBase): void;
    removeTexture(texture: TextureBase): void;
    private onTextureInvalidate(event?);
    private _onInvalidateProperties(event);
    _acceptTraverser(traverser: ITraverser): void;
    /**
     * //TODO
     *
     * @param shortestCollisionDistance
     * @returns {boolean}
     *
     * @internal
     */
    _iTestCollision(pickingCollision: PickingCollision, pickingCollider: IPickingCollider): boolean;
}
