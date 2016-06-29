import { Plane3D } from "@awayjs/core/lib/geom/Plane3D";
import { Vector3D } from "@awayjs/core/lib/geom/Vector3D";
import { IEntity } from "../display/IEntity";
import { Sprite } from "../display/Sprite";
export declare class BoundingVolumeBase {
    _pEntity: IEntity;
    _pBoundsPrimitive: Sprite;
    _pInvalidated: boolean;
    constructor(entity: any);
    dispose(): void;
    readonly boundsPrimitive: IEntity;
    nullify(): void;
    isInFrustum(planes: Array<Plane3D>, numPlanes: number): boolean;
    clone(): BoundingVolumeBase;
    rayIntersection(position: Vector3D, direction: Vector3D, targetNormal: Vector3D): number;
    classifyToPlane(plane: Plane3D): number;
    _pUpdate(): void;
    invalidate(): void;
    _pCreateBoundsPrimitive(): Sprite;
}
