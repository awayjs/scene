import { AssetBase } from "@awayjs/core/lib/library/AssetBase";
import { Scene } from "../../display/Scene";
import { LightBase } from "../../display/LightBase";
import { IRenderer } from "../../IRenderer";
import { Camera } from "../../display/Camera";
import { TextureBase } from "../../textures/TextureBase";
export declare class ShadowMapperBase extends AssetBase {
    _depthMap: TextureBase;
    _pDepthMapSize: number;
    _pLight: LightBase;
    _explicitDepthMap: boolean;
    private _autoUpdateShadows;
    _iShadowsInvalid: boolean;
    autoUpdateShadows: boolean;
    updateShadows(): void;
    iSetDepthMap(depthMap: TextureBase): void;
    light: LightBase;
    readonly depthMap: TextureBase;
    depthMapSize: number;
    dispose(): void;
    pCreateDepthTexture(): TextureBase;
    iRenderDepthMap(camera: Camera, scene: Scene, renderer: IRenderer): void;
    pUpdateDepthProjection(camera: Camera): void;
    pDrawDepthMap(scene: Scene, target: TextureBase, renderer: IRenderer): void;
    _pSetDepthMapSize(value: any): void;
}
