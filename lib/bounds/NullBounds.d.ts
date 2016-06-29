import { Plane3D } from "@awayjs/core/lib/geom/Plane3D";
import { BoundingVolumeBase } from "../bounds/BoundingVolumeBase";
export declare class NullBounds extends BoundingVolumeBase {
    private _alwaysIn;
    constructor(alwaysIn?: boolean);
    clone(): BoundingVolumeBase;
    isInFrustum(planes: Array<Plane3D>, numPlanes: number): boolean;
    classifyToPlane(plane: Plane3D): number;
}
