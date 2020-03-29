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

	private _blendStyle(startPath: GraphicsPath, endPath: GraphicsPath, newPath:GraphicsPath, ratio: number):void {
		const ratioStart = 1 - ratio;
		const ratioEnd = ratio;
	
		let color:number;
		let alpha:number;

		if (startPath.style.data_type != endPath.style.data_type){
			throw("Error in morph data - different styles of pathes");
		}

		switch(startPath.style.data_type){
			case GraphicsFillStyle.data_type:{
				const startStyle = (<GraphicsFillStyle>startPath.style);
				const endStyle = (<GraphicsFillStyle>endPath.style);
	
				alpha = ratioStart * startStyle.alpha + ratioEnd * endStyle.alpha;
				color = ColorUtils.interpolateFloat32Color(startStyle.color, endStyle.color, ratio);
				newPath.style=new GraphicsFillStyle(color, alpha);
				break;
			}
			case GradientFillStyle.data_type:{
				const newColors = [];
				const newRatios = [];
				const newAlphas = [];
				const startStyle = (<GradientFillStyle>startPath.style);
				const endStyle = (<GradientFillStyle>endPath.style);
				const clen = startStyle.colors.length;
	
				for(let c = 0; c < clen; c ++){
					newColors[newColors.length]= ColorUtils.interpolateFloat32Color(startStyle.colors[c], endStyle.colors[c], ratio);
					newAlphas[newAlphas.length]=ratioStart*startStyle.alphas[c] + ratioEnd*endStyle.alphas[c];
					newRatios[newRatios.length]=ratioStart*startStyle.ratios[c] + ratioEnd*endStyle.ratios[c];
				}

				//todo: interpolate uvtransform
				const startTrans = startStyle.matrix;
				const endTrans = endStyle.matrix;
				const newTrans = new Matrix();

				newTrans.a = startTrans.a*ratioStart + endTrans.a*ratioEnd;
				newTrans.b = startTrans.b*ratioStart + endTrans.b*ratioEnd;
				newTrans.c = startTrans.c*ratioStart + endTrans.c*ratioEnd;
				newTrans.d = startTrans.d*ratioStart + endTrans.d*ratioEnd;
				newTrans.tx = startTrans.tx*ratioStart + endTrans.tx*ratioEnd;
				newTrans.ty = startTrans.ty*ratioStart + endTrans.ty*ratioEnd;
				
				newPath.style = new GradientFillStyle(
						startStyle.type, 
						newColors, 
						newAlphas, 
						newRatios, 
						newTrans, 
						startStyle.spreadMethod, 
						startStyle.interpolationMethod, 
						startStyle.focalPointRatio);	
				break;
			}
			case BitmapFillStyle.data_type:{
				//todo
				console.warn("MorphSprite: BitmapFillStyle not implemented!");
				break;
			}
			case GraphicsStrokeStyle.data_type:{
				const startStyle = (<GraphicsStrokeStyle>startPath.style);
				const endStyle = (<GraphicsStrokeStyle>endPath.style);
				
				alpha = ratioStart * startStyle.alpha + ratioEnd * endStyle.alpha;
				color = ColorUtils.interpolateFloat32Color(startStyle.color, endStyle.color, ratio);
				
				const thickness = ratioStart * startStyle.thickness + ratioEnd * endStyle.thickness;

				newPath.style = new GraphicsStrokeStyle(
						color, 
						alpha, 
						thickness, 
						startStyle.jointstyle, 
						startStyle.capstyle, 
						startStyle.miter_limit, 
						startStyle.scaleMode);
				break;
			}
		}
	}
	
	private _blendContours(startPath: GraphicsPath, endPath: GraphicsPath, newPath: GraphicsPath, ratio: number): void {
		const ratioStart = 1 - ratio;
		const ratioEnd = ratio;

		let len_contours = startPath._commands.length;

		if (endPath._commands.length !== len_contours) {
			//len_contours = Math.min(endPath._commands.length, len_contours);
			throw ("Error in morph data - different number of contour");
		}

		for (let c = 0; c < len_contours; c++) {

			const startCmds = startPath._commands[c];
			const startData = startPath._data[c];
			const endCmds = endPath._commands[c];
			const endData = endPath._data[c];
			
			let startDataCnt = 0;
			let endDataCnt = 0;
			let startLastX = 0;
			let startLastY = 0;
			let endLastX = 0;
			let endLastY = 0;

			let len_cmds = startCmds.length;

			if (endCmds.length != len_cmds) {
				len_cmds = Math.min(endCmds.length, len_cmds);
				throw ("Error in morph data - different number of commands in contour");
			}
			for (let c2 = 0; c2 < len_cmds; c2++) {
				switch (startCmds[c2]) {
					case GraphicsPathCommand.MOVE_TO:
						if (endCmds[c2] != GraphicsPathCommand.MOVE_TO) {
							throw ("Error in morph data - both shapes must start with Move too command");
						}
						startLastX = startData[startDataCnt++];
						startLastY = startData[startDataCnt++];
						endLastX = endData[endDataCnt++];
						endLastY = endData[endDataCnt++];
						newPath.moveTo(ratioStart * startLastX + ratioEnd * endLastX, ratioStart * startLastY + ratioEnd * endLastY);
						break;
					case GraphicsPathCommand.LINE_TO:
						if (endCmds[c2] == GraphicsPathCommand.LINE_TO) {
							startLastX = startData[startDataCnt++];
							startLastY = startData[startDataCnt++];
							endLastX = endData[endDataCnt++];
							endLastY = endData[endDataCnt++];
							newPath.lineTo(ratioStart * startLastX + ratioEnd * endLastX, ratioStart * startLastY + ratioEnd * endLastY);
						}
						else if (endCmds[c2] == GraphicsPathCommand.CURVE_TO) {
							let ctrX = startLastX + (startData[startDataCnt++] - startLastX) / 2;
							let ctrY = startLastY + (startData[startDataCnt++] - startLastY) / 2;
							newPath.curveTo(ratioStart * ctrX + ratioEnd * endData[endDataCnt++], ratioStart * ctrY + ratioEnd * endData[endDataCnt++], ratioStart * startData[startDataCnt - 2] + ratioEnd * endData[endDataCnt++], ratioStart * startData[startDataCnt - 1] + ratioEnd * endData[endDataCnt++]);
							startLastX = startData[startDataCnt - 2];
							startLastY = startData[startDataCnt - 1];
							endLastX = endData[endDataCnt - 2];
							endLastY = endData[endDataCnt - 1];
						}
						break;
					case GraphicsPathCommand.CURVE_TO:
						if (endCmds[c2] == GraphicsPathCommand.LINE_TO) {
							let ctrX = endLastX + (endData[endDataCnt++] - endLastX) / 2;
							let ctrY = endLastY + (endData[endDataCnt++] - endLastY) / 2;
							newPath.curveTo(ratioStart * startData[startDataCnt++] + ratioEnd * ctrX, ratioStart * startData[startDataCnt++] + ratioEnd * ctrY, ratioStart * startData[startDataCnt++] + ratioEnd * endData[endDataCnt - 2], ratioStart * startData[startDataCnt++] + ratioEnd * endData[endDataCnt - 1]);
							startLastX = startData[startDataCnt - 2];
							startLastY = startData[startDataCnt - 1];
							endLastX = endData[endDataCnt - 2];
							endLastY = endData[endDataCnt - 1];
						}
						else if (endCmds[c2] == GraphicsPathCommand.CURVE_TO) {
							newPath.curveTo(ratioStart * startData[startDataCnt++] + ratioEnd * endData[endDataCnt++], ratioStart * startData[startDataCnt++] + ratioEnd * endData[endDataCnt++], ratioStart * startData[startDataCnt++] + ratioEnd * endData[endDataCnt++], ratioStart * startData[startDataCnt++] + ratioEnd * endData[endDataCnt++]);
							startLastX = startData[startDataCnt - 2];
							startLastY = startData[startDataCnt - 1];
							endLastX = endData[endDataCnt - 2];
							endLastY = endData[endDataCnt - 1];
						}
						break;
				}
			}
		}

		if(false) {
			console.log("");
		}
	}

	public setRatio(ratio:number){
		const lookupRatio = Math.round( ratio * 0xffffff).toString();

		if(this._ratio == lookupRatio){
			return;
		}

		this._ratio = lookupRatio;
		this._graphics.endFill(); //trigger a queue execution if one is needed
		this._graphics.clear();

		if(this._graphics.start.length!=this._graphics.end.length){
			throw("Error in morph data - different number of pathes");
		}

		const len = this._graphics.start.length;

		for(let i = 0; i < len; i++){
			const newPath = new GraphicsPath();
			const startPath = this._graphics.start[i];
			const endPath = this._graphics.end[i];

			this._blendStyle(startPath, endPath, newPath, ratio);
			this._blendContours(startPath, endPath, newPath, ratio);

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