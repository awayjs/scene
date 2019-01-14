import {Matrix} from "@awayjs/core";

import {PartitionBase, EntityNode} from "@awayjs/view";

import {GraphicsPathCommand, GraphicsFillStyle, GradientFillStyle, BitmapFillStyle, GraphicsStrokeStyle, Graphics, GraphicsPath} from "@awayjs/graphics";

import {Sprite} from "./Sprite";

export class MorphSprite extends Sprite
{

	public static assetType:string = "[asset MorphSprite]";
	private static _morphSprites:Array<MorphSprite> = new Array<MorphSprite>();

	public start:GraphicsPath[];
	public end:GraphicsPath[];
	public ratioCache:any;

	//todo: move to colorutils
	private static interpolateColor(start:number, end:number, ratio:number){

		var a:number = ( start & 0xff000000 ) >>> 24;
		var r:number = ( start & 0xff0000 ) >>> 16;
		var g:number = ( start & 0xff00 ) >>> 8;
		var b:number = start & 0xff;
		var a2:number = ( end & 0xff000000 ) >>> 24;
		var r2:number = ( end & 0xff0000 ) >>> 16;
		var g2:number = ( end & 0xff00 ) >>> 8;
		var b2:number = end & 0xff;

		var rs=1-ratio;
		var re=ratio;

		return (((a*rs+a2*re) << 24) | ((r*rs+r2*re) << 16) | ((g*rs+g2*re) << 8) | (b*rs+b2*re));


	}

	public get assetType():string
	{
		return MorphSprite.assetType;
	}

	public reset(){
		super.reset();
		this.setRatio(0);
	}

	public setRatio(ratio:number){
		if(!this.ratioCache)
			this.ratioCache={};
		var lookupRatio:string=Math.round(ratio*0xffffff).toString();

		if(this.ratioCache[lookupRatio]){
			this.graphics.clear();
			this.graphics.copyFrom(this.ratioCache[lookupRatio]);
			return;
		}
		if(this.start.length!=this.end.length){
			throw("Error in morph data - different number of pathes");
		}
		var len=this.start.length;
		var ratioStart=1-ratio;
		var ratioEnd=ratio;
		var newGraphics:Graphics=Graphics.getGraphics(null);
		var newPath:GraphicsPath;
		var startPath:GraphicsPath;
		var endPath:GraphicsPath;
		for(var i:number=0; i<len; i++){
			newPath=new GraphicsPath();
			startPath=this.start[i];
			endPath=this.end[i];
			if (startPath.style.data_type != endPath.style.data_type){
				throw("Error in morph data - different styles of pathes");
			}
			switch(startPath.style.data_type){
				case GraphicsFillStyle.data_type:
					var alpha=ratioStart*(<GraphicsFillStyle>startPath.style).alpha + ratioEnd*(<GraphicsFillStyle>endPath.style).alpha;
					var color=MorphSprite.interpolateColor((<GraphicsFillStyle>startPath.style).color, (<GraphicsFillStyle>endPath.style).color, ratio);
					newPath.style=new GraphicsFillStyle(color, alpha);
					break;
				case GradientFillStyle.data_type:
					var newColors=[];
					var newRatios=[];
					var newAlphas=[];
					var startStyle:GradientFillStyle=(<GradientFillStyle>startPath.style);
					var endStyle:GradientFillStyle=(<GradientFillStyle>endPath.style);
					var clen=startStyle.colors.length;
					for(var c:number=0; c<clen; c++){
						newColors[newColors.length]= MorphSprite.interpolateColor(startStyle.colors[c], endStyle.colors[c], ratio);
						newAlphas[newAlphas.length]=ratioStart*startStyle.alphas[c] + ratioEnd*endStyle.alphas[c];
						newRatios[newRatios.length]=ratioStart*startStyle.ratios[c] + ratioEnd*endStyle.ratios[c];
					}
					//todo: interpolate uvtransform
					var transform:Matrix=startStyle.matrix;
					var transformb:Matrix=endStyle.matrix;
					var transformnew:Matrix=new Matrix();
					transformnew.a=transform.a*ratioStart + transformb.a*ratioEnd;
					transformnew.b=transform.b*ratioStart + transformb.b*ratioEnd;
					transformnew.c=transform.c*ratioStart + transformb.c*ratioEnd;
					transformnew.d=transform.d*ratioStart + transformb.d*ratioEnd;
					transformnew.tx=transform.tx*ratioStart + transformb.tx*ratioEnd;
					transformnew.ty=transform.ty*ratioStart + transformb.ty*ratioEnd;
					newPath.style=new GradientFillStyle(startStyle.type, newColors, newAlphas, newRatios, transformnew, startStyle.spreadMethod, startStyle.interpolationMethod, startStyle.focalPointRatio);
					break;
				case BitmapFillStyle.data_type:
					//newPath.style=new BitmapFillStyle();
					break;
				case GraphicsStrokeStyle.data_type:
					var startStrokeStyle:GraphicsStrokeStyle=(<GraphicsStrokeStyle>startPath.style);
					var endSStroketyle:GraphicsStrokeStyle=(<GraphicsStrokeStyle>endPath.style);
					var alpha=ratioStart*startStrokeStyle.alpha + ratioEnd*endSStroketyle.alpha;
					var color=MorphSprite.interpolateColor(startStrokeStyle.color, endSStroketyle.color, ratio);
					var thickness=ratioStart*startStrokeStyle.thickness + ratioEnd*endSStroketyle.thickness;;

					newPath.style=new GraphicsStrokeStyle(color, alpha, thickness, startStrokeStyle.jointstyle, startStrokeStyle.capstyle, startStrokeStyle.miter_limit, startStrokeStyle.scaleMode);
					break;
			}
			var startDataCnt=0;
			var endDataCnt=0;
			var startLastX=0;
			var startLastY=0;
			var endLastX=0;
			var endLastY=0;
			var len_contours=startPath._commands.length;
			startPath=this.start[0];
			endPath=this.end[0];
			if(endPath._commands.length!=len_contours) {
				len_contours=Math.min(endPath._commands.length, len_contours);
				//throw("Error in morph data - different number of contour");
			}
			for(var c:number=0; c < len_contours; c++){
				var startCmds=startPath._commands[c];
				var startData=startPath._data[c];
				var endCmds=endPath._commands[c];
				var endData=endPath._data[c];
				var len_cmds=startCmds.length;
				if(endCmds.length!=len_cmds){
					len_cmds=Math.min(endCmds.length, len_cmds);
					//throw("Error in morph data - different number of commands in contour");
				}
				//console.log("start", startData);
				//console.log("end", endData);

				for(var c2:number=0; c2<len_cmds; c2++){

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
								var ctrX=startLastX+(startData[startDataCnt++]-startLastX)/2;
								var ctrY=startLastY+(startData[startDataCnt++]-startLastY)/2;

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
								var ctrX=endLastX+(endData[endDataCnt++]-endLastX)/2;
								var ctrY=endLastY+(endData[endDataCnt++]-endLastY)/2;

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
			newGraphics.add_queued_path(newPath);
			//console.log(endPath);
			//console.log(startPath);

		}
		/*
		var newPath:GraphicsPath=new GraphicsPath();
		newPath.moveTo(50,50);
		newPath.lineTo(50,100);
		newPath.lineTo(100,100);
		newPath.lineTo(100,50);
		newPath.lineTo(50,50);
		newPath.style=this.end[0].style;
		newGraphics.add_queued_path(newPath);
		*/

		newGraphics.endFill();
		this.graphics.clear();
		this.graphics.copyFrom(newGraphics);
		this.ratioCache[lookupRatio]=newGraphics;

	}

	public clone():Sprite
	{
		var newInstance:MorphSprite = (MorphSprite._morphSprites.length)? MorphSprite._morphSprites.pop() : new MorphSprite();

		this.copyTo(newInstance);


		return newInstance;
	}

	public copyTo(sprite:Sprite, cloneShapes:boolean = false):void
	{
		super.copyTo(sprite, cloneShapes);

		if(!this.ratioCache)
			this.ratioCache={};
		(<MorphSprite>sprite).ratioCache=this.ratioCache;
		(<MorphSprite>sprite).start=this.start;
		(<MorphSprite>sprite).end=this.end;
	}
}

PartitionBase.registerAbstraction(EntityNode, MorphSprite);