import { AssetBase } from "@awayjs/core/lib/library/AssetBase";
import { IEntity } from "../../display/IEntity";
import { LightBase } from "../../display/LightBase";
import { DirectionalLight } from "../../display/DirectionalLight";
import { LightProbe } from "../../display/LightProbe";
import { PointLight } from "../../display/PointLight";
/**
 * LightPickerBase provides an abstract base clase for light picker classes. These classes are responsible for
 * feeding materials with relevant lights. Usually, StaticLightPicker can be used, but LightPickerBase can be
 * extended to provide more application-specific dynamic selection of lights.
 *
 * @see StaticLightPicker
 */
export declare class LightPickerBase extends AssetBase {
    static assetType: string;
    _pNumPointLights: number;
    _pNumDirectionalLights: number;
    _pNumCastingPointLights: number;
    _pNumCastingDirectionalLights: number;
    _pNumLightProbes: number;
    _pAllPickedLights: Array<LightBase>;
    _pPointLights: Array<PointLight>;
    _pCastingPointLights: Array<PointLight>;
    _pDirectionalLights: Array<DirectionalLight>;
    _pCastingDirectionalLights: Array<DirectionalLight>;
    _pLightProbes: Array<LightProbe>;
    _pLightProbeWeights: Array<number>;
    /**
     * Creates a new LightPickerBase object.
     */
    constructor();
    /**
     * Disposes resources used by the light picker.
     */
    dispose(): void;
    /**
     * @inheritDoc
     */
    readonly assetType: string;
    /**
     * The maximum amount of directional lights that will be provided.
     */
    readonly numDirectionalLights: number;
    /**
     * The maximum amount of point lights that will be provided.
     */
    readonly numPointLights: number;
    /**
     * The maximum amount of directional lights that cast shadows.
     */
    readonly numCastingDirectionalLights: number;
    /**
     * The amount of point lights that cast shadows.
     */
    readonly numCastingPointLights: number;
    /**
     * The maximum amount of light probes that will be provided.
     */
    readonly numLightProbes: number;
    /**
     * The collected point lights to be used for shading.
     */
    readonly pointLights: Array<PointLight>;
    /**
     * The collected directional lights to be used for shading.
     */
    readonly directionalLights: Array<DirectionalLight>;
    /**
     * The collected point lights that cast shadows to be used for shading.
     */
    readonly castingPointLights: Array<PointLight>;
    /**
     * The collected directional lights that cast shadows to be used for shading.
     */
    readonly castingDirectionalLights: Array<DirectionalLight>;
    /**
     * The collected light probes to be used for shading.
     */
    readonly lightProbes: Array<LightProbe>;
    /**
     * The weights for each light probe, defining their influence on the object.
     */
    readonly lightProbeWeights: Array<number>;
    /**
     * A collection of all the collected lights.
     */
    readonly allPickedLights: Array<LightBase>;
    /**
     * Updates set of lights for a given renderable and EntityCollector. Always call super.collectLights() after custom overridden code.
     */
    collectLights(entity: IEntity): void;
    /**
     * Updates the weights for the light probes, based on the renderable's position relative to them.
     * @param renderable The renderble for which to calculate the light probes' influence.
     */
    private updateProbeWeights(entity);
}
