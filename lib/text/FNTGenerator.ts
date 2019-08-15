import { Font } from './Font';
import { TesselatedFontTable } from './TesselatedFontTable';
import {ColorTransform, Matrix, Rectangle, Point, ColorUtils, PerspectiveProjection, CoordinateSystem} from "@awayjs/core";

import {Stage, ImageSampler, BitmapImage2D, _Stage_BitmapImage2D, BlendMode} from "@awayjs/stage";

import {DefaultRenderer} from "@awayjs/renderer";

import { MethodMaterial} from '@awayjs/materials';
import {DisplayObject} from "../display/DisplayObject";
import {DisplayObjectContainer} from "../display/DisplayObjectContainer";
import { SceneGraphPartition } from '../partition/SceneGraphPartition';

import {Scene} from "../Scene";
import { View, PickGroup } from '@awayjs/view';
import { Sprite } from '../display/Sprite';
import { Shape } from '@awayjs/graphics';

export class FNTGenerator
{

	private _scene:Scene;
	private _stage:Stage;

	constructor(stage)
	{
        this._stage=stage;
    }


	private createScene(root:DisplayObjectContainer, maxSize:number)
	{
		//create the projection
		var projection = new PerspectiveProjection();
		projection.coordinateSystem = CoordinateSystem.RIGHT_HANDED;
		//projection.originX = -1;
		//projection.originY = -1;

        //create the view
		this._scene = new Scene(new SceneGraphPartition(root));
		this._scene.camera.projection = projection;
		this._scene.disableMouseEvents = true;
		this._scene.view.width = maxSize;
        this._scene.view.height = maxSize;
		(<PerspectiveProjection>this._scene.camera.projection).fieldOfView = Math.atan(maxSize/1000/2)*360/Math.PI;
		//this._fillColor = this._fillColor;
		//this._scene.renderer.view.backgroundAlpha = 0;//this._transparent? ( this._fillColor & 0xff000000 ) >>> 24 : 1;
        //this._scene.renderer.view.backgroundColor = 0x00000000;
        this._scene.view.stage.container.style.display="NONE";
        

		this._scene.renderer.renderableSorter = null;//new RenderableSort2D();

	}
    public generate(font:Font, maxSize:number, fontSize:number, padding:number):any{
        
            var root:DisplayObjectContainer = new DisplayObjectContainer();
            
			if (!this._scene)
                this.createScene(root, maxSize);

            let outputBitmap:BitmapImage2D;
            var outputBitmaps:BitmapImage2D[]=[];
            var mipSize:number;
            var pixelRatio:number = this._scene.renderer.view.stage.context.pixelRatio;

            for(var i:number=0; i<font.font_styles.length; i++) {

                var shapes:Shape[] = (<TesselatedFontTable>font.font_styles[i]).generateFNTTextures(padding, fontSize, maxSize);

                for(var s = 0; s < shapes.length; s++) {

                    mipSize = maxSize;

                    var fntRenderSprite:Sprite=new Sprite();
                    fntRenderSprite.graphics.addShape(shapes[s]);
                    root.removeChildren(0, root.numChildren);
                    root.addChild(fntRenderSprite);
                    
                    fntRenderSprite.x = -maxSize/2;
                    fntRenderSprite.y = -maxSize/2;
                    this._scene.camera.projection.scale = 1000/maxSize;
                                          

                    while(mipSize >= 1) {

                        this._scene.renderer.view.width = mipSize/pixelRatio;
                        this._scene.renderer.view.height = mipSize/pixelRatio;
                        this._scene.renderer.view.backgroundAlpha = 0;
                        this._scene.renderer.view.backgroundColor = ColorUtils.ARGBtoFloat32(1, (mipSize/maxSize)*255, 0,0);
                        
                        var mipBitmap:BitmapImage2D = new BitmapImage2D(mipSize, mipSize, true, 0, true);

                        this._scene.view.clear();
                        this._scene.renderer.queueSnapshot(mipBitmap);
                        this._scene.renderer.render();

                        if (mipSize == maxSize) {
                            outputBitmap = mipBitmap
                            outputBitmaps.push(outputBitmap);
                            (<TesselatedFontTable>font.font_styles[i]).addFNTChannel(outputBitmap);
                        } else {
                            outputBitmap.addMipLevel(mipBitmap);
                        }

                        //outputBitmaps.push(mipBitmap);
                        mipSize *= 0.5;
                    }
                }
                //this._bitmapFontTable.addMaterial(mat);
            }


            return outputBitmaps;
    }

}