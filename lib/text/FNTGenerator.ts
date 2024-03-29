import { Font } from './Font';
import { TesselatedFontTable } from './TesselatedFontTable';
import { PerspectiveProjection, CoordinateSystem, Transform, Vector3D } from '@awayjs/core';

import { Stage, BitmapImage2D } from '@awayjs/stage';

import { DefaultRenderer, RenderGroup } from '@awayjs/renderer';

import { DisplayObjectContainer } from '../display/DisplayObjectContainer';
import { View } from '@awayjs/view';
import { Sprite } from '../display/Sprite';
import { Shape } from '@awayjs/graphics';
import { FNTGeneratorBase } from './FNTGeneratrorBase';

export class FNTGenerator extends FNTGeneratorBase {
	private _view: View;
	private _root: DisplayObjectContainer;
	private _renderer: DefaultRenderer;

	constructor(stage: Stage) {
		super (stage);

		//create the projection
		const projection = new PerspectiveProjection();
		projection.coordinateSystem = CoordinateSystem.RIGHT_HANDED;
		projection.originX = -1;
		projection.originY = 1;
		projection.transform = new Transform();
		projection.transform.moveTo(0, 0, -1000);
		projection.transform.lookAt(new Vector3D());

		//create the view
		this._view = new View(projection, this._stage);
		this._root = new DisplayObjectContainer();
		this._renderer = <DefaultRenderer> RenderGroup
			.getInstance(DefaultRenderer)
			.getRenderer(this._view.getNode(this._root).partition);

		//set the view properties
		this._renderer.view.projection = projection;

		//set the renderer properties
		this._renderer.renderableSorter = null;//new RenderableSort2D();
	}

	public generate(font: Font, maxSize: number, fontSize: number, padding: number): BitmapImage2D[] {
		let outputBitmap: BitmapImage2D;
		const outputBitmaps: BitmapImage2D[] = [];
		let mipSize: number;
		//const pixelRatio: number = this._renderer.view.stage.context.pixelRatio;

		for (const key in font.font_styles) {

			const shapes: Shape[] =
				(<TesselatedFontTable>font.font_styles[key]).generateFNTTextures(padding, fontSize, maxSize);

			for (let s = 0; s < shapes.length; s++) {

				mipSize = maxSize;

				const fntRenderSprite: Sprite = new Sprite();
				fntRenderSprite.graphics.addShape(shapes[s]);
				this._root.removeChildren(0, this._root.numChildren);
				this._root.addChild(fntRenderSprite);

				// fntRenderSprite.x = -maxSize/2;
				// fntRenderSprite.y = -maxSize/2;
				this._renderer.view.projection.scale = 1000 / maxSize;

				let mipmapSelector = 0;
				const bitmapSize = (this._stage.glVersion == 1) ? maxSize * 2 : maxSize;
				outputBitmap = new BitmapImage2D(bitmapSize, bitmapSize, true, 0, true);

				outputBitmaps.push(outputBitmap);
				(<TesselatedFontTable>font.font_styles[key]).addFNTChannel(outputBitmap);

				while (mipSize >= 1) {

					this._view.backgroundAlpha = 0;//1;
					this._view.backgroundColor = 0;//ColorUtils.ARGBtoFloat32(1, (mipSize/maxSize)*255, 0,0);

					this._view.target = outputBitmap;
					this._renderer.render(true, 0, mipmapSelector);
					//this._scene.view.stage.context.configureBackBuffer(mipSize/2, mipSize/2, 0, true);

					//mipmapped framebuffers are not possible with WebGL1
					if (this._stage.glVersion == 1)
						break;

					//outputBitmaps.push(mipBitmap);
					mipSize *= 0.5;
					mipmapSelector++;
				}
			}
			//this._bitmapFontTable.addMaterial(mat);
		}

		return outputBitmaps;
	}

}