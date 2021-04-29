import { TriangleElements } from '@awayjs/renderer';

import { Shape } from '@awayjs/graphics';

import { MaterialBase } from '@awayjs/materials';

import { TextFormat } from './TextFormat';

export class TextShape {

	public verts: Array<Float32Array> = [];
	public format: TextFormat;
	public shape: Shape;
	public fntMaterial: MaterialBase;
	public elements: TriangleElements;
	public length: number = 0;

	constructor() {
		this.verts = [];
	}

	public addChunk(buffer: Float32Array) {
		this.length += buffer.length;
		this.verts.push(buffer);
	}

	public get tall() {
		return this.verts[this.verts.length - 1];
	}
}