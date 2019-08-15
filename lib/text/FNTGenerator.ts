import { Font } from './Font';
import { TesselatedFontTable } from './TesselatedFontTable';
import {ColorTransform, Matrix, Rectangle, Point, ColorUtils, PerspectiveProjection, CoordinateSystem, Transform, Vector3D} from "@awayjs/core";

import {Stage, ImageSampler, BitmapImage2D, _Stage_BitmapImage2D, BlendMode} from "@awayjs/stage";

import {DefaultRenderer, RenderGroup, RendererType} from "@awayjs/renderer";

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
    private _root:DisplayObjectContainer;
	private _renderer:DefaultRenderer;
	private _stage:Stage;

	constructor(stage)
	{
        this._stage = stage;

		//create the projection
		var projection = new PerspectiveProjection();
		projection.coordinateSystem = CoordinateSystem.RIGHT_HANDED;
		projection.originX = -1;
		projection.originY = 1;

        //create the view
        this._root = new DisplayObjectContainer()
        this._renderer = <DefaultRenderer> RenderGroup.getInstance(new View(), RendererType.DEFAULT).getRenderer(new SceneGraphPartition(this._root));
        this._root.partition = this._renderer.partition;

        //setup the projection
        this._renderer.view.projection = projection;
        this._renderer.view.projection.transform = new Transform();
		this._renderer.view.projection.transform.moveTo(0, 0, -1000);
		this._renderer.view.projection.transform.lookAt(new Vector3D());
        
        //hide the html container
        this._renderer.view.stage.container.style.display = "NONE";
        

		this._renderer.renderableSorter = null;//new RenderableSort2D();

    }

    public generate(font:Font, maxSize:number, fontSize:number, padding:number):any
    {
            let outputBitmap:BitmapImage2D;
            var outputBitmaps:BitmapImage2D[]=[];
            var mipSize:number;
            var pixelRatio:number = this._renderer.view.stage.context.pixelRatio;

            for(var i:number=0; i<font.font_styles.length; i++) {

                var shapes:Shape[] = (<TesselatedFontTable>font.font_styles[i]).generateFNTTextures(padding, fontSize, maxSize);

                for(var s = 0; s < shapes.length; s++) {

                    mipSize = maxSize;

                    var fntRenderSprite:Sprite=new Sprite();
                    fntRenderSprite.graphics.addShape(shapes[s]);
                    this._root.removeChildren(0, this._root.numChildren);
                    this._root.addChild(fntRenderSprite);
                    
                    // fntRenderSprite.x = -maxSize/2;
                    // fntRenderSprite.y = -maxSize/2;
                    this._renderer.view.projection.scale = 1000/maxSize;
                                          

                    while(mipSize >= 1) {

                        this._renderer.view.width = mipSize/pixelRatio;
                        this._renderer.view.height = mipSize/pixelRatio;
                        this._renderer.view.backgroundAlpha = 0;
                        this._renderer.view.backgroundColor = ColorUtils.ARGBtoFloat32(1, (mipSize/maxSize)*255, 0,0);
                        
                        var mipBitmap:BitmapImage2D = new BitmapImage2D(mipSize, mipSize, true, 0, true);

                        this._renderer.queueSnapshot(mipBitmap);
                        //this._scene.view.stage.context.configureBackBuffer(mipSize/2, mipSize/2, 0, true);
                        this._renderer.render();

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