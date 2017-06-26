import {Shape, TriangleElements} from "@awayjs/graphics"
import {TextFormat} from "./TextFormat"
export class TextShape
{

	public verts:number[];
	public format:TextFormat;
	public shape:Shape;
	public elements:TriangleElements;
	constructor()
	{
		this.verts=[];
	}
}