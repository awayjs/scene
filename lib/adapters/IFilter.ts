export interface IFilter{
	type: number;

	alpha?:number;
	colors?: number[];
	ratios?: number[];
	blurX?: number;
	blurY?: number;
	angle?: number;
	distance?: number;
	strength?: number;
	inner?: boolean;
	knockout?: boolean;
	compositeSource?: boolean;
	onTop?: boolean;
	quality?: number;
	
	matrixX?: number;
	matrixY?: number;
	divisor?: number;
	bias?: number;
	matrix?: number[];
	color?: number;
	clamp?: boolean;
	preserveAlpha?: boolean;
}