import { ImageCube } from "@awayjs/core/lib/image/ImageCube";
import { SamplerCube } from "@awayjs/core/lib/image/SamplerCube";
import { Matrix3D } from "@awayjs/core/lib/geom/Matrix3D";
import { LightBase } from "../display/LightBase";
import { IEntity } from "../display/IEntity";
export declare class LightProbe extends LightBase implements IEntity {
    static assetType: string;
    diffuseMap: ImageCube;
    diffuseSampler: SamplerCube;
    specularMap: ImageCube;
    specularSampler: SamplerCube;
    constructor(diffuseMap: ImageCube, specularMap?: ImageCube);
    readonly assetType: string;
    iGetObjectProjectionMatrix(entity: IEntity, cameraTransform: Matrix3D, target?: Matrix3D): Matrix3D;
}
