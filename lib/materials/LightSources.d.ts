/**
 * Enumeration class for defining which lighting types affect the specific material
 * lighting component (diffuse and specular). This can be useful if, for example, you
 * want to use light probes for diffuse global lighting, but want specular reflections from
 * traditional light sources without those affecting the diffuse light.
 *
 * @see away.materials.ColorMaterial.diffuseLightSources
 * @see away.materials.ColorMaterial.specularLightSources
 * @see away.materials.TextureMaterial.diffuseLightSources
 * @see away.materials.TextureMaterial.specularLightSources
 */
export declare class LightSources {
    /**
     * Defines normal lights are to be used as the source for the lighting
     * component.
     */
    static LIGHTS: number;
    /**
     * Defines that global lighting probes are to be used as the source for the
     * lighting component.
     */
    static PROBES: number;
    /**
     * Defines that both normal and global lighting probes  are to be used as the
     * source for the lighting component. This is equivalent to LightSources.LIGHTS | LightSources.PROBES.
     */
    static ALL: number;
}
