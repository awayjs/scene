import { Plane3D } from "@awayjs/core/lib/geom/Plane3D";
import { Vector3D } from "@awayjs/core/lib/geom/Vector3D";
import { BoundingVolumeBase } from "../bounds/BoundingVolumeBase";
import { IEntity } from "../display/IEntity";
import { Sprite } from "../display/Sprite";
export declare class BoundingSphere extends BoundingVolumeBase {
    private _sphere;
    private _radius;
    private _centerX;
    private _centerY;
    private _centerZ;
    private _prefab;
    constructor(entity: IEntity);
    nullify(): void;
    isInFrustum(planes: Array<Plane3D>, numPlanes: number): boolean;
    rayIntersection(position: Vector3D, direction: Vector3D, targetNormal: Vector3D): number;
    classifyToPlane(plane: Plane3D): number;
    _pUpdate(): void;
    _pCreateBoundsPrimitive(): Sprite;
}
