"use strict";
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
var LightSources = (function () {
    function LightSources() {
    }
    /**
     * Defines normal lights are to be used as the source for the lighting
     * component.
     */
    LightSources.LIGHTS = 0x01;
    /**
     * Defines that global lighting probes are to be used as the source for the
     * lighting component.
     */
    LightSources.PROBES = 0x02;
    /**
     * Defines that both normal and global lighting probes  are to be used as the
     * source for the lighting component. This is equivalent to LightSources.LIGHTS | LightSources.PROBES.
     */
    LightSources.ALL = 0x03;
    return LightSources;
}());
exports.LightSources = LightSources;
