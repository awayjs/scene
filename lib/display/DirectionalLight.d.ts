import { Matrix3D } from "@awayjs/core/lib/geom/Matrix3D";
import { Vector3D } from "@awayjs/core/lib/geom/Vector3D";
import { LightBase } from "../display/LightBase";
import { IEntity } from "../display/IEntity";
import { DirectionalShadowMapper } from "../materials/shadowmappers/DirectionalShadowMapper";
export declare class DirectionalLight extends LightBase implements IEntity {
    static assetType: string;
    private _direction;
    private _tmpLookAt;
    private _sceneDirection;
    private _pAabbPoints;
    private _projAABBPoints;
    constructor(xDir?: number, yDir?: number, zDir?: number);
    readonly assetType: string;
    readonly sceneDirection: Vector3D;
    direction: Vector3D;
    pUpdateSceneTransform(): void;
    pCreateShadowMapper(): DirectionalShadowMapper;
    iGetObjectProjectionMatrix(entity: IEntity, cameraTransform: Matrix3D, target?: Matrix3D): Matrix3D;
    /**
     * //TODO
     *
     * @protected
     */
    _pUpdateBoxBounds(): void;
}
