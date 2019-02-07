import {Shape, TriangleElements} from "@awayjs/graphics"
import {TextFormat} from "./TextFormat"
import { MaterialBase } from '../../../materials/dist';
export class TextShape
{

	public verts:number[];
	public format:TextFormat;
	public shape:Shape;
	public fntMaterial:MaterialBase;
	public elements:TriangleElements;
	constructor()
	{
		this.verts=[];
	}
}