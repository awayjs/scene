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
	MAT3 = 'mat3',
	MAT4 = 'mat4',
	SAMPLER = 'sampler2D'
}

const DATA_EL_SIZE = {
	[DATA_TYPE.VEC4] : 4,
	[DATA_TYPE.VEC3] : 3,
	[DATA_TYPE.VEC2] : 2,
	[DATA_TYPE.FLOAT]: 1,
	[DATA_TYPE.MAT3]: 9,
	[DATA_TYPE.MAT4]: 16,
	[DATA_TYPE.SAMPLER]: 1,
};

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

export class ShaderDefinition {
	private _cache: Record<string, {
		body: string,
		uniforms: Record<string, IUniformBlock>,
		attrs: Record<string, IAttrBlock>
	}> = {};

	private _deifines: string[] = [];

	public get defines() {
		return this._deifines;
	}

	constructor(
		protected _declare: Array<IUniformBlock | IAttrBlock | ITextBlock | string>
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
		const uniforms: Record<string, IUniformBlock> = {};
		const attrs: Record<string, IAttrBlock> = {};

		for (const block of this._declare) {
			if (typeof block === 'string') {
				source.push(block);
				continue;
			}

			if (block.def && !defines.includes(block.def)) {
				continue;
			}

			if (block.body) {
				source.push(block.body);
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

				uniforms[block.name] = block;
			}
		}

		this._cache[key] = {
			body: source.join('\n'),
			attrs,
			uniforms
		};

		return this._cache[key];
	}
}