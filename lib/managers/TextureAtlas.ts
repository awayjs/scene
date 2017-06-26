/*import {IRenderable} from "../base/IRenderable";
import {LineElements} from "../elements/LineElements";
import {Sampler2D} from "../image/Sampler2D";
import {BitmapImageCube} from "../image/BitmapImageCube";
import {MaterialBase} from "../materials/MaterialBase";
import {BasicMaterial} from "../materials/BasicMaterial";
import {Single2DTexture} from "../textures/Single2DTexture";
import {SingleCubeTexture} from "../textures/SingleCubeTexture";
import {Shape} from "../base/Shape";
*/
import {Point} from "@awayjs/core";
import {BitmapImage2D, GradientFillStyle} from "@awayjs/graphics";
import {TextureBase} from "@awayjs/graphics";

export class TextureAtlas
{
	private static _allTextureAtlas:any={};
	private static _allGradients:any={};
	private static _allColors:any={};


	public static getTextureForColor(color:number):TextureBase
	{
		if(TextureAtlas._allColors.hasOwnProperty(color.toString())){
			var textObj=TextureAtlas._allColors[color.toString()];
			return textObj.texture;
			 
		}
		var textObj=new TextureAtlas();
		textObj._allColors[color.toString()];
		return textObj.texture;		
	}

	public static getTextureForGradient(color:number):TextureBase
	{
	}
	
	constructor(){
		this.bitmap = new BitmapImage2D(256, 256, false, 0x000000);

		this.availableRows=256;
		this.availableColors=0;
	}

	public availableRows:number=256;
	public gradient_row:number=-1;
	public color_row:number=255;
	public color_position:number=256;
	public availableGradients:number=256;
	public availableColors:number=0;
	public bitmap:BitmapImage2D;

	public fit_gradient():boolean{
		return (this.availableRows>0);		
	}
	public fit_color():boolean{
		if(this.availableColors>0)
			return true;
		return (this.availableRows>0);
	}
	public draw_gradient(gradient:GraphicsGradientFillStyle):number{

		if(this.availableRows<0){
			console.log("error in TextureAtlasManager.draw_color");
			return;
		}
		this.gradient_row++;
		this.availableRows--;
		var px:number;
		var color:number;
		
		for(px=0; px<255; px++){
			color=gradient.getColorAtPosition(px);
			this.bitmap.setPixel(this.gradient_row, px, color);
			this.bitmap.invalidate();
		}

		return this.availableRows;
	}
	public draw_color(color:number, alpha:number = 1):Point{
		this.color_position--;
		if(this.color_position<0){
			if(this.availableRows>0){
				this.color_row--;
				this.availableRows--;
				this.color_position=255;
			}
			else{
				console.log("error in TextureAtlasManager.draw_color");
			}			
		}
		this.bitmap.setPixel(this.color_position, this.color_row, color);
		
		return new Point(this.color_position/256, this.color_row/256);
	}
	

}