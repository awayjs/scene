import { Matrix3D } from "@awayjs/core/lib/geom/Matrix3D";
import { Plane3D } from "@awayjs/core/lib/geom/Plane3D";
import { Vector3D } from "@awayjs/core/lib/geom/Vector3D";
import { IProjection } from "@awayjs/core/lib/projections/IProjection";
import { IRenderer } from "../IRenderer";
import { DisplayObjectContainer } from "../display/DisplayObjectContainer";
import { IEntity } from "../display/IEntity";
export declare class Camera extends DisplayObjectContainer implements IEntity {
    static assetType: string;
    private _viewProjection;
    private _viewProjectionDirty;
    private _projection;
    private _frustumPlanes;
    private _frustumPlanesDirty;
    private _onProjectionMatrixChangedDelegate;
    constructor(projection?: IProjection);
    readonly assetType: string;
    private onProjectionMatrixChanged(event);
    readonly frustumPlanes: Array<Plane3D>;
    private updateFrustum();
    pInvalidateHierarchicalProperties(bitFlag: number): boolean;
    /**
     *
     */
    projection: IProjection;
    /**
     *
     */
    readonly viewProjection: Matrix3D;
    /**
     * Calculates the ray in scene space from the camera to the given normalized coordinates in screen space.
     *
     * @param nX The normalised x coordinate in screen space, -1 corresponds to the left edge of the viewport, 1 to the right.
     * @param nY The normalised y coordinate in screen space, -1 corresponds to the top edge of the viewport, 1 to the bottom.
     * @param sZ The z coordinate in screen space, representing the distance into the screen.
     * @return The ray from the camera to the scene space position of the given screen coordinates.
     */
    getRay(nX: number, nY: number, sZ: number): Vector3D;
    /**
     * Calculates the normalised position in screen space of the given scene position.
     *
     * @param point3d the position vector of the scene coordinates to be projected.
     * @return The normalised screen position of the given scene coordinates.
     */
    project(point3d: Vector3D): Vector3D;
    /**
     * Calculates the scene position of the given normalized coordinates in screen space.
     *
     * @param nX The normalised x coordinate in screen space, minus the originX offset of the projection property.
     * @param nY The normalised y coordinate in screen space, minus the originY offset of the projection property.
     * @param sZ The z coordinate in screen space, representing the distance into the screen.
     * @return The scene position of the given screen coordinates.
     */
    unproject(nX: number, nY: number, sZ: number): Vector3D;
    _applyRenderer(renderer: IRenderer): void;
}
