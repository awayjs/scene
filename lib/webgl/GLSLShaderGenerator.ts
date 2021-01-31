export const enum BLOCK_TYPE {
	UNIFORM = 'uniform',
	ATTR = 'attribute',
	BODY = 'body',
}

export const enum DATA_TYPE {
	VEC4 = 'vec4',
	VEC3 = 'vec3',
	VEC2 = 'vec2',
	FLOAT = 'float',
	MAT2 = 'mat3',
	MAT3 = 'mat3',
	MAT4 = 'mat4',
	SAMPLER = 'sampler2D'
}

export interface IShaderBlock {
	type?: BLOCK_TYPE;
	body?: string;
	def?: string
}

export interface IUniformBlock extends IShaderBlock {
	type: BLOCK_TYPE.UNIFORM;
	data?: number[] | Float32Array;
	is: DATA_TYPE;
	size?: number;
	name: string;
	wasChanged?: boolean;
	ignoreForUpload?: boolean;
}

export interface IAttrBlock extends IShaderBlock {
	type: BLOCK_TYPE.ATTR;
	is: DATA_TYPE;
	name: string;
}

export interface ITextBlock {
	type?: BLOCK_TYPE.BODY;
	body?: string;
	def?: string
}

export interface IShaderVaraint {
	body: string,
	uniforms: Record<string, GLSLUniform>,
	attrs: Record<string, IAttrBlock>,
	cacheKey: string;
}

export class GLSLUniform implements IUniformBlock {
	readonly type: BLOCK_TYPE.UNIFORM;
	private _data?: number[] | Float32Array;
	public is: DATA_TYPE;
	public size: number = 1;
	public name: string;
	public wasChanged: boolean = true;
	public def?: string;
	public ignoreForUpload: boolean = false;

	private _default: number[] | Float32Array;
	private _updatedAfterReset = false;

	constructor (simple: Omit<IUniformBlock, 'type' | 'skip'>) {

		this._default = simple.data?.slice();
		this._data = simple.data?.slice();
		this.name = simple.name;
		this.def = simple.def;
		this.size = simple.size;
		this.is = simple.is;
		this.ignoreForUpload = !!simple.ignoreForUpload;
	}

	reset() {
		if (this._default && this._updatedAfterReset) {
			this._data = this._default.slice();
		}
	}

	set data (data: number[] | Float32Array) {
		this.set(data, true);
	}

	get data() {
		return this._data;
	}

	set (newData: number | number[] | Float32Array, useCopy = true): boolean {
		const value = typeof newData === 'number' ? [newData] : newData;
		const inconsistence = this._data && this._data.length !== value.length;

		if (!this._data || inconsistence) {
			if (inconsistence && this._data) {
				// eslint-disable-next-line max-len
				console.warn(`[GLSLUniform] Inconsistented data length of ${this.name} of type ${this.is}. Expected: ${this._data.length}, Actual: ${value.length}`);
			}

			this._data = (useCopy ? value.slice() : value);

			this.wasChanged = true;
			this._updatedAfterReset = true;
			return true;
		}

		this.wasChanged = false;

		for (let i = 0; i < this._data.length; i++) {
			this.wasChanged = this._data[i] !== newData[i];
			this._data[i] = newData[i];
		}

		this._updatedAfterReset = this.wasChanged;
		return this.wasChanged;
	}
}

export class ShaderDefinition {
	private _cache: Record<string, IShaderVaraint> = {};

	private _deifines: string[] = [];

	public get defines() {
		return this._deifines;
	}

	constructor(
		protected _declare: Array<IUniformBlock | GLSLUniform | IAttrBlock | ITextBlock | string>
	) {
		this.validate();
	}

	protected validate() {
		this._deifines = [];

		this._declare.forEach((e) =>  {
			if (typeof e === 'string' || !e.def) return;

			if (!this._deifines.includes(e.def))
				this._deifines.push(e.def);
		});
	}

	generate(defines: string[] = []) {
		let key = defines.join('_');
		let entry = this._cache[key];

		if (entry) {
			return entry;
		}

		defines = defines.filter((e) => this._deifines.includes(e));
		key = defines.join('_');

		entry = this._cache[key];

		if (entry) {
			return entry;
		}

		const source: string[] = [];
		const uniforms: Record<string, GLSLUniform> = {};
		const attrs: Record<string, IAttrBlock> = {};

		for (let i = 0; i < this._declare.length; i++) {
			let block = this._declare[i];

			if (typeof block === 'string') {
				source.push(block);
				continue;
			}

			if (block.def && !defines.includes(block.def)) {
				continue;
			}

			if (block.type === BLOCK_TYPE.ATTR) {
				source.push(`${block.type} ${block.is} ${block.name};`);
				attrs[block.name] = block;
			}

			if (block.type === BLOCK_TYPE.UNIFORM) {
				const size = +block.size > 1 ? `[${+block.size}]` : '';
				source.push(
					`${block.type} ${block.is} ${block.name}${size};`);

				if (!(block  instanceof GLSLUniform)) {
					block = new GLSLUniform(block);
				}

				uniforms[block.name] = <GLSLUniform> block;
				continue;
			}

			if (block.body) {
				source.push(block.body);
			}
		}

		this._cache[key] = {
			body: source.join('\n'),
			attrs,
			uniforms,
			cacheKey: key
		};

		return this._cache[key];
	}
}