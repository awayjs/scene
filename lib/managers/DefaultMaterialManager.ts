import BitmapImage2D				= require("awayjs-core/lib/data/BitmapImage2D");

import IRenderableOwner				= require("awayjs-display/lib/base/IRenderableOwner");
import LineSubMesh					= require("awayjs-display/lib/base/LineSubMesh");
import MaterialBase					= require("awayjs-display/lib/materials/MaterialBase");
import BasicMaterial				= require("awayjs-display/lib/materials/BasicMaterial");
import Single2DTexture				= require("awayjs-display/lib/textures/Single2DTexture");

class DefaultMaterialManager
{
	private static _defaultBitmapImage2D:BitmapImage2D;
	private static _defaultTriangleMaterial:BasicMaterial;
	private static _defaultLineMaterial:BasicMaterial;
	private static _defaultTexture:Single2DTexture;

	public static getDefaultMaterial(renderableOwner:IRenderableOwner = null):MaterialBase
	{
		if (renderableOwner != null && renderableOwner.isAsset(LineSubMesh)) {
			if (!DefaultMaterialManager._defaultLineMaterial)
				DefaultMaterialManager.createDefaultLineMaterial();

			return DefaultMaterialManager._defaultLineMaterial;
		} else {
			if (!DefaultMaterialManager._defaultTriangleMaterial)
				DefaultMaterialManager.createDefaultTriangleMaterial();

			return DefaultMaterialManager._defaultTriangleMaterial;
		}
	}

	public static getDefaultTexture(renderableOwner:IRenderableOwner = null):Single2DTexture
	{
		if (!DefaultMaterialManager._defaultTexture)
			DefaultMaterialManager.createDefaultTexture();

		return DefaultMaterialManager._defaultTexture;
	}

	private static createDefaultTexture()
	{
		DefaultMaterialManager._defaultBitmapImage2D = DefaultMaterialManager.createCheckeredBitmapImage2D();
		DefaultMaterialManager._defaultTexture = new Single2DTexture(DefaultMaterialManager._defaultBitmapImage2D);
		DefaultMaterialManager._defaultTexture.name = "defaultTexture";
	}

	public static createCheckeredBitmapImage2D():BitmapImage2D
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

		return b;
	}

	private static createDefaultTriangleMaterial()
	{
		if (!DefaultMaterialManager._defaultTexture)
			DefaultMaterialManager.createDefaultTexture();

		DefaultMaterialManager._defaultTriangleMaterial = new BasicMaterial(DefaultMaterialManager._defaultTexture);
		DefaultMaterialManager._defaultTriangleMaterial.mipmap = false;
		DefaultMaterialManager._defaultTriangleMaterial.smooth = false;
		DefaultMaterialManager._defaultTriangleMaterial.name = "defaultTriangleMaterial";
	}

	private static createDefaultLineMaterial()
	{
		DefaultMaterialManager._defaultLineMaterial = new BasicMaterial();
		DefaultMaterialManager._defaultLineMaterial.name = "defaultLineMaterial";
	}
}

export = DefaultMaterialManager;