import { Camera } from "../../display/Camera";
import { DirectionalShadowMapper } from "../../materials/shadowmappers/DirectionalShadowMapper";
export declare class NearDirectionalShadowMapper extends DirectionalShadowMapper {
    private _coverageRatio;
    constructor(coverageRatio?: number);
    /**
     * A value between 0 and 1 to indicate the ratio of the view frustum that needs to be covered by the shadow map.
     */
    coverageRatio: number;
    pUpdateDepthProjection(camera: Camera): void;
}
