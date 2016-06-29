import { ImageBase } from "@awayjs/core/lib/image/ImageBase";
import { ColorTransform } from "@awayjs/core/lib/geom/ColorTransform";
import { AssetBase } from "@awayjs/core/lib/library/AssetBase";
import { IAnimationSet } from "../animators/IAnimationSet";
import { ISurface } from "../base/ISurface";
import { IRenderable } from "../base/IRenderable";
import { LightPickerBase } from "../materials/lightpickers/LightPickerBase";
import { TextureBase } from "../textures/TextureBase";
import { Style } from "../base/Style";
/**
 * MaterialBase forms an abstract base class for any material.
 * A material consists of several passes, each of which constitutes at least one render call. Several passes could
 * be used for special effects (render lighting for many lights in several passes, render an outline in a separate
 * pass) or to provide additional render-to-texture passes (rendering diffuse light to texture for texture-space
 * subsurface scattering, or rendering a depth map for specialized self-shadowing).
 *
 * Away3D provides default materials trough SinglePassMaterialBase and TriangleMaterial, which use modular
 * methods to build the shader code. MaterialBase can be extended to build specific and high-performant custom
 * shaders, or entire new material frameworks.
 */
export declare class MaterialBase extends AssetBase implements ISurface {
    private _textures;
    private _colorTransform;
    private _pUseColorTransform;
    private _alphaBlending;
    private _alpha;
    _pAlphaThreshold: number;
    _pAnimateUVs: boolean;
    private _enableLightFallOff;
    private _specularLightSources;
    private _diffuseLightSources;
    private _onInvalidatePropertiesDelegate;
    private _style;
    /**
     * An object to contain any extra data.
     */
    extra: Object;
    /**
     * A value that can be used by materials that only work with a given type of renderer. The renderer can test the
     * classification to choose which render path to use. For example, a deferred material could set this value so
     * that the deferred renderer knows not to take the forward rendering path.
     *
     * @private
     */
    _iClassification: string;
    _iBaseScreenPassIndex: number;
    private _bothSides;
    private _animationSet;
    /**
     * A list of material owners, renderables or custom Entities.
     */
    private _owners;
    private _alphaPremultiplied;
    _pBlendMode: string;
    private _imageRect;
    private _curves;
    _pLightPicker: LightPickerBase;
    private _onLightChangeDelegate;
    private _onTextureInvalidateDelegate;
    /**
     * Creates a new MaterialBase object.
     */
    constructor(image?: ImageBase, alpha?: number);
    constructor(color?: number, alpha?: number);
    /**
     * The alpha of the surface.
     */
    alpha: number;
    /**
     * The ColorTransform object to transform the colour of the material with. Defaults to null.
     */
    colorTransform: ColorTransform;
    /**
     * Indicates whether or not the material has transparency. If binary transparency is sufficient, for
     * example when using textures of foliage, consider using alphaThreshold instead.
     */
    alphaBlending: boolean;
    /**
     *
     */
    readonly animationSet: IAnimationSet;
    /**
     * The light picker used by the material to provide lights to the material if it supports lighting.
     *
     * @see LightPickerBase
     * @see StaticLightPicker
     */
    lightPicker: LightPickerBase;
    /**
     * Indicates whether material should use curves. Defaults to false.
     */
    curves: boolean;
    /**
     * Indicates whether or not any used textures should use an atlas. Defaults to false.
     */
    imageRect: boolean;
    /**
     * The style used to render the current TriangleGraphic. If set to null, its parent Sprite's style will be used instead.
     */
    style: Style;
    /**
     * Specifies whether or not the UV coordinates should be animated using a transformation matrix.
     */
    animateUVs: boolean;
    /**
     * Specifies whether or not the UV coordinates should be animated using a transformation matrix.
     */
    useColorTransform: boolean;
    /**
     * Whether or not to use fallOff and radius properties for lights. This can be used to improve performance and
     * compatibility for constrained mode.
     */
    enableLightFallOff: boolean;
    /**
     * Define which light source types to use for diffuse reflections. This allows choosing between regular lights
     * and/or light probes for diffuse reflections.
     *
     * @see away3d.materials.LightSources
     */
    diffuseLightSources: number;
    /**
     * Define which light source types to use for specular reflections. This allows choosing between regular lights
     * and/or light probes for specular reflections.
     *
     * @see away3d.materials.LightSources
     */
    specularLightSources: number;
    /**
     * Defines whether or not the material should cull triangles facing away from the camera.
     */
    bothSides: boolean;
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
     * Indicates whether visible textures (or other pixels) used by this material have
     * already been premultiplied. Toggle this if you are seeing black halos around your
     * blended alpha edges.
     */
    alphaPremultiplied: boolean;
    /**
     * The minimum alpha value for which pixels should be drawn. This is used for transparency that is either
     * invisible or entirely opaque, often used with textures for foliage, etc.
     * Recommended values are 0 to disable alpha, or 0.5 to create smooth edges. Default value is 0 (disabled).
     */
    alphaThreshold: number;
    /**
     * Mark an IRenderable as owner of this material.
     * Assures we're not using the same material across renderables with different animations, since the
     * Programs depend on animation. This method needs to be called when a material is assigned.
     *
     * @param owner The IRenderable that had this material assigned
     *
     * @internal
     */
    iAddOwner(owner: IRenderable): void;
    /**
     * Removes an IRenderable as owner.
     * @param owner
     *
     * @internal
     */
    iRemoveOwner(owner: IRenderable): void;
    /**
     * A list of the IRenderables that use this material
     *
     * @private
     */
    readonly iOwners: Array<IRenderable>;
    getNumTextures(): number;
    getTextureAt(index: number): TextureBase;
    /**
     * Marks the shader programs for all passes as invalid, so they will be recompiled before the next use.
     *
     * @private
     */
    invalidatePasses(): void;
    private invalidateAnimation();
    invalidateSurfaces(): void;
    /**
     * Called when the light picker's configuration changed.
     */
    private onLightsChange(event);
    invalidateTexture(): void;
    addTextureAt(texture: TextureBase, index: number): void;
    addTexture(texture: TextureBase): void;
    removeTexture(texture: TextureBase): void;
    private onTextureInvalidate(event?);
    private _onInvalidateProperties(event);
}
