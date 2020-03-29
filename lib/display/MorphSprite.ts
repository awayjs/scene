import {Matrix, ColorUtils} from "@awayjs/core";

import {PartitionBase, EntityNode} from "@awayjs/view";

import {GraphicsPathCommand, GraphicsFillStyle, GradientFillStyle, BitmapFillStyle, GraphicsStrokeStyle, Graphics, GraphicsPath} from "@awayjs/graphics";

import {Sprite} from "./Sprite";
import { IMaterial } from '@awayjs/renderer';

export class MorphSprite extends Sprite
{

	public static assetType:string = "[asset MorphSprite]";
	private static _morphSprites:Array<MorphSprite> = new Array<MorphSprite>();

	public static getNewMorphSprite(graphics:Graphics = null, material:IMaterial = null):MorphSprite
	{
		if (MorphSprite._morphSprites.length) {
			var sprite:MorphSprite = MorphSprite._morphSprites.pop();
			sprite.graphics = graphics || Graphics.getGraphics();
			sprite.material = material;
			return sprite;
		}

		return new MorphSprite(graphics, material);
	}

	private _ratio:string;

	public get assetType():string
	{
		return MorphSprite.assetType;
	}

	public reset(){
		super.reset();
		this.setRatio(0);
	}

	public setRatio(ratio:number){
		var lookupRatio:string=Math.round(ratio*0xffffff).toString();

		
		if(this._ratio == lookupRatio){
			return;
		}

		this._ratio = lookupRatio;
		this._graphics.endFill(); //trigger a queue execution if one is needed
		this._graphics.clear();

		
		if(this._graphics.start.length!=this._graphics.end.length){
			throw("Error in morph data - different number of pathes");
		}

		const len=this._graphics.start.length;
		const ratioStart=1-ratio;
		const ratioEnd=ratio;
		let newPath:GraphicsPath;
		let startPath:GraphicsPath;
		let endPath:GraphicsPath;
		let alpha:number;
		let color:number;

		for(let i:number=0; i<len; i++){
			newPath=new GraphicsPath();
			startPath=this._graphics.start[i];
			endPath=this._graphics.end[i];
			if (startPath.style.data_type != endPath.style.data_type){
				throw("Error in morph data - different styles of pathes");
			}
			switch(startPath.style.data_type){
				case GraphicsFillStyle.data_type:
					alpha=ratioStart*(<GraphicsFillStyle>startPath.style).alpha + ratioEnd*(<GraphicsFillStyle>endPath.style).alpha;
					color=ColorUtils.interpolateFloat32Color((<GraphicsFillStyle>startPath.style).color, (<GraphicsFillStyle>endPath.style).color, ratio);
					newPath.style=new GraphicsFillStyle(color, alpha);
					break;
				case GradientFillStyle.data_type:
					let newColors=[];
					let newRatios=[];
					let newAlphas=[];
					let startStyle:GradientFillStyle=(<GradientFillStyle>startPath.style);
					let endStyle:GradientFillStyle=(<GradientFillStyle>endPath.style);
					let clen=startStyle.colors.length;
					for(let c:number=0; c<clen; c++){
						newColors[newColors.length]= ColorUtils.interpolateFloat32Color(startStyle.colors[c], endStyle.colors[c], ratio);
						newAlphas[newAlphas.length]=ratioStart*startStyle.alphas[c] + ratioEnd*endStyle.alphas[c];
						newRatios[newRatios.length]=ratioStart*startStyle.ratios[c] + ratioEnd*endStyle.ratios[c];
					}
					//todo: interpolate uvtransform
					let transform:Matrix=startStyle.matrix;
					let transformb:Matrix=endStyle.matrix;
					let transformnew:Matrix=new Matrix();
					transformnew.a=transform.a*ratioStart + transformb.a*ratioEnd;
					transformnew.b=transform.b*ratioStart + transformb.b*ratioEnd;
					transformnew.c=transform.c*ratioStart + transformb.c*ratioEnd;
					transformnew.d=transform.d*ratioStart + transformb.d*ratioEnd;
					transformnew.tx=transform.tx*ratioStart + transformb.tx*ratioEnd;
					transformnew.ty=transform.ty*ratioStart + transformb.ty*ratioEnd;
					newPath.style=new GradientFillStyle(startStyle.type, newColors, newAlphas, newRatios, transformnew, startStyle.spreadMethod, startStyle.interpolationMethod, startStyle.focalPointRatio);
					break;
				case BitmapFillStyle.data_type:
					//todo
					console.warn("MorphSprite: BitmapFillStyle not implemented!");
					break;
				case GraphicsStrokeStyle.data_type:
					let startStrokeStyle:GraphicsStrokeStyle=(<GraphicsStrokeStyle>startPath.style);
					let endSStroketyle:GraphicsStrokeStyle=(<GraphicsStrokeStyle>endPath.style);
					alpha=ratioStart*startStrokeStyle.alpha + ratioEnd*endSStroketyle.alpha;
					color=ColorUtils.interpolateFloat32Color(startStrokeStyle.color, endSStroketyle.color, ratio);
					let thickness=ratioStart*startStrokeStyle.thickness + ratioEnd*endSStroketyle.thickness;;

					newPath.style=new GraphicsStrokeStyle(color, alpha, thickness, startStrokeStyle.jointstyle, startStrokeStyle.capstyle, startStrokeStyle.miter_limit, startStrokeStyle.scaleMode);
					break;
			}
			let startDataCnt=0;
			let endDataCnt=0;
			let startLastX=0;
			let startLastY=0;
			let endLastX=0;
			let endLastY=0;
			let len_contours=startPath._commands.length;
			if(endPath._commands.length!=len_contours) {
				len_contours=Math.min(endPath._commands.length, len_contours);
				throw("Error in morph data - different number of contour");
			}
			for(let c:number=0; c < len_contours; c++){
				let startCmds=startPath._commands[c];
				let startData=startPath._data[c];
				let endCmds=endPath._commands[c];
				let endData=endPath._data[c];
				let len_cmds=startCmds.length;
				if(endCmds.length!=len_cmds){
					len_cmds=Math.min(endCmds.length, len_cmds);
					throw("Error in morph data - different number of commands in contour");
				}

				for(let c2:number=0; c2<len_cmds; c2++){

					switch(startCmds[c2]){
						case GraphicsPathCommand.MOVE_TO:
							if(endCmds[c2]!=GraphicsPathCommand.MOVE_TO){
								throw("Error in morph data - both shapes must start with Move too command");
							}
							startLastX=startData[startDataCnt++];
							startLastY=startData[startDataCnt++];
							endLastX=endData[endDataCnt++];
							endLastY=endData[endDataCnt++];
							newPath.moveTo(ratioStart * startLastX + ratioEnd * endLastX,ratioStart * startLastY + ratioEnd * endLastY);
							break;
						case GraphicsPathCommand.LINE_TO:
							if(endCmds[c2]==GraphicsPathCommand.LINE_TO){
								startLastX=startData[startDataCnt++];
								startLastY=startData[startDataCnt++];
								endLastX=endData[endDataCnt++];
								endLastY=endData[endDataCnt++];
								newPath.lineTo(ratioStart * startLastX + ratioEnd * endLastX,ratioStart * startLastY + ratioEnd * endLastY);
							}
							else if(endCmds[c2]==GraphicsPathCommand.CURVE_TO){
								let ctrX=startLastX+(startData[startDataCnt++]-startLastX)/2;
								let ctrY=startLastY+(startData[startDataCnt++]-startLastY)/2;

								newPath.curveTo(ratioStart * ctrX + ratioEnd * endData[endDataCnt++],
									ratioStart * ctrY + ratioEnd * endData[endDataCnt++],
									ratioStart * startData[startDataCnt-2] + ratioEnd * endData[endDataCnt++],
									ratioStart * startData[startDataCnt-1] + ratioEnd * endData[endDataCnt++]
								)
								startLastX=startData[startDataCnt-2];
								startLastY=startData[startDataCnt-1];
								endLastX=endData[endDataCnt-2];
								endLastY=endData[endDataCnt-1];

							}
							break;
						case GraphicsPathCommand.CURVE_TO:
							if(endCmds[c2]==GraphicsPathCommand.LINE_TO){
								let ctrX=endLastX+(endData[endDataCnt++]-endLastX)/2;
								let ctrY=endLastY+(endData[endDataCnt++]-endLastY)/2;

								newPath.curveTo(ratioStart * startData[startDataCnt++] + ratioEnd * ctrX,
									ratioStart * startData[startDataCnt++] + ratioEnd * ctrY,
									ratioStart * startData[startDataCnt++] + ratioEnd * endData[endDataCnt-2],
									ratioStart * startData[startDataCnt++] + ratioEnd * endData[endDataCnt-1]
								)
								startLastX=startData[startDataCnt-2];
								startLastY=startData[startDataCnt-1];
								endLastX=endData[endDataCnt-2];
								endLastY=endData[endDataCnt-1];
							}
							else if(endCmds[c2]==GraphicsPathCommand.CURVE_TO){

								newPath.curveTo(ratioStart * startData[startDataCnt++] + ratioEnd * endData[endDataCnt++],
									ratioStart * startData[startDataCnt++] + ratioEnd * endData[endDataCnt++],
									ratioStart * startData[startDataCnt++] + ratioEnd * endData[endDataCnt++],
									ratioStart * startData[startDataCnt++] + ratioEnd * endData[endDataCnt++]
								)
								startLastX=startData[startDataCnt-2];
								startLastY=startData[startDataCnt-1];
								endLastX=endData[endDataCnt-2];
								endLastY=endData[endDataCnt-1];
							}
							break;
					}
				}
			}
			this._graphics.add_queued_path(newPath);
		}		
		this._graphics.endFill();
	}
	
	/**
	 * @inheritDoc
	 */
	public dispose():void
	{
		this.disposeValues();

		MorphSprite._morphSprites.push(this);
	}

	public clone():Sprite
	{
		var newInstance:MorphSprite = MorphSprite.getNewMorphSprite();

		this.copyTo(newInstance);


		return newInstance;
	}
}

PartitionBase.registerAbstraction(EntityNode, MorphSprite);