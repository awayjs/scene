import BitmapImage2D				= require("awayjs-core/lib/data/BitmapImage2D");
import BitmapImageCube				= require("awayjs-core/lib/data/BitmapImageCube");

import IRenderableOwner				= require("awayjs-display/lib/base/IRenderableOwner");
import LineSubMesh					= require("awayjs-display/lib/base/LineSubMesh");
import Skybox						= require("awayjs-display/lib/entities/Skybox");
import MaterialBase					= require("awayjs-display/lib/materials/MaterialBase");
import BasicMaterial				= require("awayjs-display/lib/materials/BasicMaterial");
import Single2DTexture				= require("awayjs-display/lib/textures/Single2DTexture");
import SingleCubeTexture			= require("awayjs-display/lib/textures/SingleCubeTexture");
import TextureBase					= require("awayjs-display/lib/textures/TextureBase");

class DefaultMaterialManager
{
	private static _defaultBitmapImage2D:BitmapImage2D;
	private static _defaultBitmapImageCube:BitmapImageCube;
	private static _defaultCubeTextureMaterial:BasicMaterial;
	private static _defaultTextureMaterial:BasicMaterial;
	private static _defaultColorMaterial:BasicMaterial;
	private static _defaultTexture:Single2DTexture;
	private static _defaultCubeTexture:SingleCubeTexture;

	public static getDefaultMaterial(renderableOwner:IRenderableOwner = null):MaterialBase
	{
		if (renderableOwner != null && renderableOwner.isAsset(LineSubMesh)) {
			if (!DefaultMaterialManager._defaultColorMaterial)
				DefaultMaterialManager.createDefaultColorMaterial();

			return DefaultMaterialManager._defaultColorMaterial;
		}

		if (renderableOwner != null && renderableOwner.isAsset(Skybox)) {
			if (!DefaultMaterialManager._defaultCubeTextureMaterial)
				DefaultMaterialManager.createDefaultCubeTextureMaterial();

			return DefaultMaterialManager._defaultCubeTextureMaterial;
		}

		if (!DefaultMaterialManager._defaultTextureMaterial)
			DefaultMaterialManager.createDefaultTextureMaterial();

		return DefaultMaterialManager._defaultTextureMaterial;
	}

	public static getDefaultTexture(renderableOwner:IRenderableOwner = null):TextureBase
	{
		if (renderableOwner != null && renderableOwner.isAsset(Skybox)) {
			if (!DefaultMaterialManager._defaultCubeTexture)
				DefaultMaterialManager.createDefaultCubeTexture();

			return DefaultMaterialManager._defaultCubeTexture;
		}

		if (!DefaultMaterialManager._defaultTexture)
			DefaultMaterialManager.createDefaultTexture();

		return DefaultMaterialManager._defaultTexture;
	}

	private static createDefaultTexture()
	{
		if (!DefaultMaterialManager._defaultBitmapImage2D)
			DefaultMaterialManager.createCheckeredBitmapImage2D();

		DefaultMaterialManager._defaultTexture = new Single2DTexture(DefaultMaterialManager._defaultBitmapImage2D);
		DefaultMaterialManager._defaultTexture.name = "defaultTexture";
	}

	private static createDefaultCubeTexture()
	{
		if (!DefaultMaterialManager._defaultBitmapImageCube)
			DefaultMaterialManager.createCheckeredBitmapImageCube();

		DefaultMaterialManager._defaultCubeTexture = new SingleCubeTexture(DefaultMaterialManager._defaultBitmapImageCube);
		DefaultMaterialManager._defaultCubeTexture.name = "defaultCubeTexture";
	}

	private static createCheckeredBitmapImageCube()
	{
		if (!DefaultMaterialManager._defaultBitmapImage2D)
			DefaultMaterialManager.createCheckeredBitmapImage2D();

		var b = new BitmapImageCube(DefaultMaterialManager._defaultBitmapImage2D.width);

		for (var i:number = 0; i < 6; i++)
			b.draw(i, DefaultMaterialManager._defaultBitmapImage2D);

		DefaultMaterialManager._defaultBitmapImageCube = b;
	}

	private static createCheckeredBitmapImage2D()
	{
		var b:BitmapImage2D = new BitmapImage2D(8, 8, false, 0x000000);

		//create chekerboard
		var i:number, j:number;
		for (i = 0; i < 8; i++) {
			for (j = 0; j < 8; j++) {
				if ((j & 1) ^ (i & 1)) {
					b.setPixel(i, j, 0XFFFFFF);
				}
			}
		}

		DefaultMaterialManager._defaultBitmapImage2D = b;
	}

	private static createDefaultTextureMaterial()
	{
		if (!DefaultMaterialManager._defaultTexture)
			DefaultMaterialManager.createDefaultTexture();

		DefaultMaterialManager._defaultTextureMaterial = new BasicMaterial(DefaultMaterialManager._defaultTexture);
		DefaultMaterialManager._defaultTextureMaterial.mipmap = false;
		DefaultMaterialManager._defaultTextureMaterial.smooth = false;
		DefaultMaterialManager._defaultTextureMaterial.name = "defaultTextureMaterial";
	}

	private static createDefaultCubeTextureMaterial()
	{
		if (!DefaultMaterialManager._defaultCubeTexture)
			DefaultMaterialManager.createDefaultCubeTexture();

		DefaultMaterialManager._defaultCubeTextureMaterial = new BasicMaterial(DefaultMaterialManager._defaultCubeTexture);
		DefaultMaterialManager._defaultCubeTextureMaterial.mipmap = false;
		DefaultMaterialManager._defaultCubeTextureMaterial.smooth = false;
		DefaultMaterialManager._defaultCubeTextureMaterial.name = "defaultCubeTextureMaterial";
	}

	private static createDefaultColorMaterial()
	{
		DefaultMaterialManager._defaultColorMaterial = new BasicMaterial();
		DefaultMaterialManager._defaultColorMaterial.name = "defaultColorMaterial";
	}
}

export = DefaultMaterialManager;