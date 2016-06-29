import { Scene } from "../../display/Scene";
import { Camera } from "../../display/Camera";
import { ShadowMapperBase } from "../../materials/shadowmappers/ShadowMapperBase";
import { IRenderer } from "../../IRenderer";
import { SingleCubeTexture } from "../../textures/SingleCubeTexture";
export declare class CubeMapShadowMapper extends ShadowMapperBase {
    private _depthCameras;
    private _projections;
    private _needsRender;
    constructor();
    private initCameras();
    private addCamera(rotationX, rotationY, rotationZ);
    pCreateDepthTexture(): SingleCubeTexture;
    pUpdateDepthProjection(camera: Camera): void;
    pDrawDepthMap(scene: Scene, target: SingleCubeTexture, renderer: IRenderer): void;
}
