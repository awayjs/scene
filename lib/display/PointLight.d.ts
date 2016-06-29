import { Matrix3D } from "@awayjs/core/lib/geom/Matrix3D";
import { LightBase } from "../display/LightBase";
import { IEntity } from "../display/IEntity";
import { CubeMapShadowMapper } from "../materials/shadowmappers/CubeMapShadowMapper";
export declare class PointLight extends LightBase implements IEntity {
    static assetType: string;
    _pRadius: number;
    _pFallOff: number;
    _pFallOffFactor: number;
    constructor();
    readonly assetType: string;
    pCreateShadowMapper(): CubeMapShadowMapper;
    radius: number;
    iFallOffFactor(): number;
    fallOff: number;
    _pUpdateSphereBounds(): void;
    iGetObjectProjectionMatrix(entity: IEntity, cameraTransform: Matrix3D, target?: Matrix3D): Matrix3D;
}
