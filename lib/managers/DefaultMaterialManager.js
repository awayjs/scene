"use strict";
var Sampler2D_1 = require("@awayjs/core/lib/image/Sampler2D");
var BitmapImage2D_1 = require("@awayjs/core/lib/image/BitmapImage2D");
var BitmapImageCube_1 = require("@awayjs/core/lib/image/BitmapImageCube");
var LineElements_1 = require("../graphics/LineElements");
var Skybox_1 = require("../display/Skybox");
var BasicMaterial_1 = require("../materials/BasicMaterial");
var Single2DTexture_1 = require("../textures/Single2DTexture");
var SingleCubeTexture_1 = require("../textures/SingleCubeTexture");
var Graphic_1 = require("../graphics/Graphic");
var DefaultMaterialManager = (function () {
    function DefaultMaterialManager() {
    }
    DefaultMaterialManager.getDefaultMaterial = function (renderable) {
        if (renderable === void 0) { renderable = null; }
        if (renderable != null && renderable.isAsset(Graphic_1.Graphic) && renderable.elements.isAsset(LineElements_1.LineElements)) {
            if (!DefaultMaterialManager._defaultColorMaterial)
                DefaultMaterialManager.createDefaultColorMaterial();
            return DefaultMaterialManager._defaultColorMaterial;
        }
        if (renderable != null && renderable.isAsset(Skybox_1.Skybox)) {
            if (!DefaultMaterialManager._defaultCubeTextureMaterial)
                DefaultMaterialManager.createDefaultCubeTextureMaterial();
            return DefaultMaterialManager._defaultCubeTextureMaterial;
        }
        if (!DefaultMaterialManager._defaultTextureMaterial)
            DefaultMaterialManager.createDefaultTextureMaterial();
        return DefaultMaterialManager._defaultTextureMaterial;
    };
    DefaultMaterialManager.getDefaultTexture = function (renderable) {
        if (renderable === void 0) { renderable = null; }
        if (renderable != null && renderable.isAsset(Skybox_1.Skybox)) {
            if (!DefaultMaterialManager._defaultCubeTexture)
                DefaultMaterialManager.createDefaultCubeTexture();
            return DefaultMaterialManager._defaultCubeTexture;
        }
        if (!DefaultMaterialManager._defaultTexture)
            DefaultMaterialManager.createDefaultTexture();
        return DefaultMaterialManager._defaultTexture;
    };
    DefaultMaterialManager.getDefaultImage2D = function () {
        if (!DefaultMaterialManager._defaultBitmapImage2D)
            DefaultMaterialManager.createDefaultImage2D();
        return DefaultMaterialManager._defaultBitmapImage2D;
    };
    DefaultMaterialManager.getDefaultImageCube = function () {
        if (!DefaultMaterialManager._defaultBitmapImageCube)
            DefaultMaterialManager.createDefaultImageCube();
        return DefaultMaterialManager._defaultBitmapImageCube;
    };
    DefaultMaterialManager.getDefaultSampler = function () {
        if (!DefaultMaterialManager._defaultSampler2D)
            DefaultMaterialManager.createDefaultSampler2D();
        return DefaultMaterialManager._defaultSampler2D;
    };
    DefaultMaterialManager.createDefaultTexture = function () {
        DefaultMaterialManager._defaultTexture = new Single2DTexture_1.Single2DTexture();
        DefaultMaterialManager._defaultTexture.name = "defaultTexture";
    };
    DefaultMaterialManager.createDefaultCubeTexture = function () {
        DefaultMaterialManager._defaultCubeTexture = new SingleCubeTexture_1.SingleCubeTexture();
        DefaultMaterialManager._defaultCubeTexture.name = "defaultCubeTexture";
    };
    DefaultMaterialManager.createDefaultImageCube = function () {
        if (!DefaultMaterialManager._defaultBitmapImage2D)
            DefaultMaterialManager.createDefaultImage2D();
        var b = new BitmapImageCube_1.BitmapImageCube(DefaultMaterialManager._defaultBitmapImage2D.width);
        for (var i = 0; i < 6; i++)
            b.draw(i, DefaultMaterialManager._defaultBitmapImage2D);
        DefaultMaterialManager._defaultBitmapImageCube = b;
    };
    DefaultMaterialManager.createDefaultImage2D = function () {
        var b = new BitmapImage2D_1.BitmapImage2D(8, 8, false, 0x000000);
        //create chekerboard
        var i, j;
        for (i = 0; i < 8; i++)
            for (j = 0; j < 8; j++)
                if ((j & 1) ^ (i & 1))
                    b.setPixel(i, j, 0XFFFFFF);
        DefaultMaterialManager._defaultBitmapImage2D = b;
    };
    DefaultMaterialManager.createDefaultTextureMaterial = function () {
        if (!DefaultMaterialManager._defaultTexture)
            DefaultMaterialManager.createDefaultTexture();
        DefaultMaterialManager._defaultTextureMaterial = new BasicMaterial_1.BasicMaterial();
        DefaultMaterialManager._defaultTextureMaterial.texture = DefaultMaterialManager._defaultTexture;
        DefaultMaterialManager._defaultTextureMaterial.name = "defaultTextureMaterial";
    };
    DefaultMaterialManager.createDefaultCubeTextureMaterial = function () {
        if (!DefaultMaterialManager._defaultCubeTexture)
            DefaultMaterialManager.createDefaultCubeTexture();
        DefaultMaterialManager._defaultCubeTextureMaterial = new BasicMaterial_1.BasicMaterial();
        DefaultMaterialManager._defaultCubeTextureMaterial.texture = DefaultMaterialManager._defaultCubeTexture;
        DefaultMaterialManager._defaultCubeTextureMaterial.name = "defaultCubeTextureMaterial";
    };
    DefaultMaterialManager.createDefaultColorMaterial = function () {
        DefaultMaterialManager._defaultColorMaterial = new BasicMaterial_1.BasicMaterial(0xFFFFFF);
        DefaultMaterialManager._defaultColorMaterial.name = "defaultColorMaterial";
    };
    DefaultMaterialManager.createDefaultSampler2D = function () {
        DefaultMaterialManager._defaultSampler2D = new Sampler2D_1.Sampler2D();
    };
    return DefaultMaterialManager;
}());
exports.DefaultMaterialManager = DefaultMaterialManager;
