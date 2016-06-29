import { Box } from "@awayjs/core/lib/geom/Box";
import { Plane3D } from "@awayjs/core/lib/geom/Plane3D";
import { Vector3D } from "@awayjs/core/lib/geom/Vector3D";
import { BoundingVolumeBase } from "../bounds/BoundingVolumeBase";
import { IEntity } from "../display/IEntity";
import { Sprite } from "../display/Sprite";
/**
 * AxisAlignedBoundingBox represents a bounding box volume that has its planes aligned to the local coordinate axes of the bounded object.
 * This is useful for most sprites.
 */
export declare class AxisAlignedBoundingBox extends BoundingVolumeBase {
    _box: Box;
    private _x;
    private _y;
    private _z;
    private _width;
    private _height;
    private _depth;
    private _centerX;
    private _centerY;
    private _centerZ;
    private _halfExtentsX;
    private _halfExtentsY;
    private _halfExtentsZ;
    private _prefab;
    /**
     * Creates a new <code>AxisAlignedBoundingBox</code> object.
     */
    constructor(entity: IEntity);
    /**
     * @inheritDoc
     */
    nullify(): void;
    /**
     * @inheritDoc
     */
    isInFrustum(planes: Array<Plane3D>, numPlanes: number): boolean;
    rayIntersection(position: Vector3D, direction: Vector3D, targetNormal: Vector3D): number;
    classifyToPlane(plane: Plane3D): number;
    _pUpdate(): void;
    _pCreateBoundsPrimitive(): Sprite;
}
