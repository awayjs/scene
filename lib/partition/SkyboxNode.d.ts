import { Plane3D } from "@awayjs/core/lib/geom/Plane3D";
import { EntityNode } from "../partition/EntityNode";
/**
 * SkyboxNode is a space partitioning leaf node that contains a Skybox object.
 *
 * @class away.partition.SkyboxNode
 */
export declare class SkyboxNode extends EntityNode {
    /**
     *
     * @param planes
     * @param numPlanes
     * @returns {boolean}
     */
    isInFrustum(planes: Array<Plane3D>, numPlanes: number): boolean;
    /**
     *
     * @returns {boolean}
     */
    isCastingShadow(): boolean;
}
