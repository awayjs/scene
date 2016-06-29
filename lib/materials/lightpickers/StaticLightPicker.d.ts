import { LightPickerBase } from "../../materials/lightpickers/LightPickerBase";
/**
 * StaticLightPicker is a light picker that provides a static set of lights. The lights can be reassigned, but
 * if the configuration changes (number of directional lights, point lights, etc), a material recompilation may
 * occur.
 */
export declare class StaticLightPicker extends LightPickerBase {
    private _lights;
    private _onCastShadowChangeDelegate;
    /**
     * Creates a new StaticLightPicker object.
     * @param lights The lights to be used for shading.
     */
    constructor(lights: any);
    /**
     * The lights used for shading.
     */
    lights: Array<any>;
    /**
     * Remove configuration change listeners on the lights.
     */
    private clearListeners();
    /**
     * Notifies the material of a configuration change.
     */
    private onCastShadowChange(event);
    /**
     * Called when a directional light's shadow casting configuration changes.
     */
    private updateDirectionalCasting(light);
    /**
     * Called when a point light's shadow casting configuration changes.
     */
    private updatePointCasting(light);
}
