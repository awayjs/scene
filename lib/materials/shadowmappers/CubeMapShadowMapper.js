"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ImageCube_1 = require("@awayjs/core/lib/image/ImageCube");
var Camera_1 = require("../../display/Camera");
var ShadowMapperBase_1 = require("../../materials/shadowmappers/ShadowMapperBase");
var SingleCubeTexture_1 = require("../../textures/SingleCubeTexture");
var CubeMapShadowMapper = (function (_super) {
    __extends(CubeMapShadowMapper, _super);
    function CubeMapShadowMapper() {
        _super.call(this);
        this._pDepthMapSize = 512;
        this._needsRender = new Array();
        this.initCameras();
    }
    CubeMapShadowMapper.prototype.initCameras = function () {
        this._depthCameras = new Array();
        this._projections = new Array();
        // posX, negX, posY, negY, posZ, negZ
        this.addCamera(0, 90, 0);
        this.addCamera(0, -90, 0);
        this.addCamera(-90, 0, 0);
        this.addCamera(90, 0, 0);
        this.addCamera(0, 0, 0);
        this.addCamera(0, 180, 0);
    };
    CubeMapShadowMapper.prototype.addCamera = function (rotationX, rotationY, rotationZ) {
        var cam = new Camera_1.Camera();
        cam.rotationX = rotationX;
        cam.rotationY = rotationY;
        cam.rotationZ = rotationZ;
        cam.projection.near = .01;
        var projection = cam.projection;
        projection.fieldOfView = 90;
        this._projections.push(projection);
        cam.projection._iAspectRatio = 1;
        this._depthCameras.push(cam);
    };
    //@override
    CubeMapShadowMapper.prototype.pCreateDepthTexture = function () {
        return new SingleCubeTexture_1.SingleCubeTexture(new ImageCube_1.ImageCube(this._pDepthMapSize));
    };
    //@override
    CubeMapShadowMapper.prototype.pUpdateDepthProjection = function (camera) {
        var light = (this._pLight);
        var maxDistance = light._pFallOff;
        var pos = this._pLight.scenePosition;
        // todo: faces outside frustum which are pointing away from camera need not be rendered!
        for (var i = 0; i < 6; ++i) {
            this._projections[i].far = maxDistance;
            this._depthCameras[i].transform.moveTo(pos.x, pos.y, pos.z);
            this._needsRender[i] = true;
        }
    };
    //@override
    CubeMapShadowMapper.prototype.pDrawDepthMap = function (scene, target, renderer) {
        for (var i = 0; i < 6; ++i)
            if (this._needsRender[i])
                renderer._iRender(this._depthCameras[i], scene, target.imageCube, null, i);
    };
    return CubeMapShadowMapper;
}(ShadowMapperBase_1.ShadowMapperBase));
exports.CubeMapShadowMapper = CubeMapShadowMapper;
