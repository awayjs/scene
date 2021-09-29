import { TriangleElements } from '@awayjs/renderer';

import { Shape } from '@awayjs/graphics';

import { MaterialBase } from '@awayjs/materials';

import { TextFormat } from './TextFormat';

export class TextShape {

	public verts: Array<Float32Array> = [];
	public uvs: Array<Float32Array> = [];
	public format: TextFormat;
	public shape: Shape;
	public fntMaterial: MaterialBase;
	public elements: TriangleElements;

	private _length: number = 0;
	public get length() {
		return this._length;
	}

	public set length(val: number) {
		if (val > this._length) {
			return;
		}

		const verts = this.verts;
		const uvs = this.uvs;

		if (val === 0) {
			this._length = 0;
			verts.length = 0;
			uvs.length = 0;
			return;
		}

		let index = 0;
		let size = val;

		while (index < verts.length && size > 0) {
			size -= verts[index].length;
			index++;
		}

		if (size < 0) {
			// resize buffer
			verts[index - 1] = verts[index - 1].subarray(0, size + verts[index - 1].length);

			if (uvs[index - 1]) {
				uvs[index - 1] = uvs[index - 1].subarray(0, size + uvs[index - 1].length);
			}
		}

		verts.length = index;
		this._length = val;
	}

	public get hasUV() {
		return this.uvs.length > 0;
	}

	constructor() {
		this.verts = [];
		this.uvs = [];
	}

	public addChunk(buffer: Float32Array, uvs?: Float32Array) {
		if (this.verts.length !== this.uvs.length && uvs) {
			throw 'You can\'t mix TextShape with UV and without in same place';
		}

		if (uvs && buffer.length !== uvs.length) {
			throw 'Position buffer and UV buffer should  has equal size';
		}

		this._length += buffer.length;

		this.verts.push(buffer);

		if (uvs) {
			this.uvs.push(buffer);
		}
	}

	public get tall() {
		return this.verts[this.verts.length - 1];
	}
}