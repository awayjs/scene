import { EventDispatcher } from '@awayjs/core';
import { MaterialBase } from '@awayjs/materials';
import {
	IPass,
	ISimplePass,
	PassEvent,
	_Render_ElementsBase,
	_Render_RenderableBase,
} from '@awayjs/renderer';

import {
	ProgramWebGL,
	Stage,
} from '@awayjs/stage';

import { _Render_BasicGlslMaterial } from './BasicGlslMaterial';
import { _GLSLShader_ImageTexture2D } from './GLSLImageTexture';
import { GLSLShaderBase } from './GLSLShaderBase';
import { BLOCK_TYPE, DATA_TYPE, IShaderVaraint, ShaderDefinition } from './GLSLShaderGenerator';

export interface IUniform {
	type: string;
	size?: number;
	name: string;
	data?: number[] | Float32Array,
	_location?: WebGLUniformLocation
}

const enum BASIC_SHADER_U {
	SAMPLER = 'fs0',
	COLOR_TRANSFORM = 'fc',
	VERTEX_CONSTANT = 'vc'
}

const FRAG = new ShaderDefinition([
	'precision highp float;',
	{
		type: BLOCK_TYPE.UNIFORM,
		is: DATA_TYPE.SAMPLER,
		name: BASIC_SHADER_U.SAMPLER,
		ignoreForUpload: true,
	},
	{
		type: BLOCK_TYPE.UNIFORM,
		is: DATA_TYPE.VEC4,
		size: 2,
		name: BASIC_SHADER_U.COLOR_TRANSFORM,
		data: new Float32Array([1, 1, 1, 1, 0, 0, 0, 0]),
		def: 'colorTransform' },
	`
	varying vec2 vUV;

	void main() {
		vec4 color = texture2D(fs0, vUV);	
	`,
	{
		def: 'colorTransform',
		body:
	`
		if(color.w > 0.0) {
			color.xyz = color.xyz / color.www;
		}
		color = color * fc[0] + fc[1];
		color.xyz = color.xyz * color.www;
	` },
	`	
		gl_FragColor = color;
	}
	`
]);

const VERT = new ShaderDefinition([
	'precision highp float;',
	{
		type: BLOCK_TYPE.UNIFORM,
		is: DATA_TYPE.VEC4,
		name: BASIC_SHADER_U.VERTEX_CONSTANT,
		size: 6,
		data: new Float32Array(6 * 4)
	},
	{
		type: BLOCK_TYPE.ATTR,
		is: DATA_TYPE.VEC4,
		name: 'va0',
	},
	{
		type: BLOCK_TYPE.ATTR,
		is: DATA_TYPE.VEC4,
		name: 'va1',
	},
	`
	varying vec2 vUV;

	void main() {

		vUV.x = dot(va1, vc[0]);
		vUV.y = dot(va1, vc[1]);

		vec4 outpos;

		outpos.x = dot(va0, vc[2]);
		outpos.y = dot(va0, vc[3]);
		outpos.z = dot(va0, vc[4]);
		outpos.w = dot(va0, vc[5]);

		outpos.z = outpos.z * 2.0 - outpos.w;

		gl_Position = outpos;
	}
	`
]);

export class GLSLPassBase extends EventDispatcher implements ISimplePass {
	protected _renderMaterial: _Render_BasicGlslMaterial;
	protected _renderElements: _Render_ElementsBase;
	protected _texture: _GLSLShader_ImageTexture2D;
	protected _stage: Stage;

	protected _shader: GLSLShaderBase;
	public name = 'GLSLPassBase';

	private _preserveAlpha: boolean = true;
	private _forceSeparateMVP: boolean = false;

	private _fragUniforms: IUniform[] = [
		{
			name: 'fc', type: '4f', data: new Float32Array(4 * 2)
		},
		{
			name: 'fs0', type: '1i', data:[0],
		}
	];

	private _vertUniforms: IUniform[] = [
		{
			name: 'vc', type: '4f', data: new Float32Array(4 * 6)
		},
	]

	private _fragVariant: IShaderVaraint;
	private _vertVariant: IShaderVaraint;

	private _lastProgFocusId = -1;

	get fragUniforms() {
		return this._fragUniforms;
	}

	get vertUniforms() {
		return this._vertUniforms;
	}

	get vertexCode(): string {
		return this._vertVariant.body;
	}

	get fragmentCode(): string {
		return this._fragVariant.body;
	}

	public get shader(): GLSLShaderBase {
		return this._shader;
	}

	/**
	 * Indicates whether the output alpha value should remain unchanged compared to the material's original alpha.
	 */
	public get preserveAlpha(): boolean {
		return this._preserveAlpha;
	}

	public set preserveAlpha(value: boolean) {
		if (this._preserveAlpha == value)
			return;

		this._preserveAlpha = value;

		this.invalidate();
	}

	/**
	 * Indicates whether the screen projection should be calculated by forcing a separate scene matrix and
	 * view-projection matrix. This is used to prevent rounding errors when using multiple passes with different
	 * projection code.
	 */
	public get forceSeparateMVP(): boolean {
		return this._forceSeparateMVP;
	}

	public set forceSeparateMVP(value: boolean) {
		if (this._forceSeparateMVP == value)
			return;

		this._forceSeparateMVP = value;

		this.invalidate();
	}

	/**
	 * Creates a new PassBase object.
	 */
	constructor(renderMaterial: _Render_BasicGlslMaterial, renderElements: _Render_ElementsBase) {
		super();

		this._renderMaterial = renderMaterial;
		this._renderElements = renderElements;
		this._stage = renderElements.stage;

		this._shader = new GLSLShaderBase(
			renderElements,
			renderMaterial,
			this,
			this._stage
		);
	}

	public updateProgram() {
		const defines = ['colorTransform'];

		this._fragVariant = FRAG.generate(defines);
		this._vertVariant = VERT.generate(defines);

		this.name = 'GLSLPassBase_' + this._fragVariant.cacheKey;
	}

	_includeDependencies(_shader: GLSLShaderBase): void {
		//
	}

	/**
	 * Marks the shader program as invalid, so it will be recompiled before the next render.
	 */
	public invalidate(): void {
		this._shader.invalidateProgram();

		const texture = this._renderMaterial.material.getTextureAt(0);
		this._texture = texture ? texture.getAbstraction<_GLSLShader_ImageTexture2D>(this._shader) : null;

		this.dispatchEvent(new PassEvent(PassEvent.INVALIDATE, <IPass> <any> this));
	}

	/**
	 * Cleans up any resources used by the current object.
	 */
	public dispose(): void {
		this._renderMaterial = null;
		this._renderElements = null;
		this._stage = null;

		if (this._shader) {
			this._shader.dispose();
			this._shader = null;
		}
	}

	public _setRenderState(renderState: _Render_RenderableBase): void {
		this._shader._setRenderState(renderState);

		const mat = <MaterialBase> this._renderMaterial.material;
		const ct = renderState.sourceEntity._iAssignedColorTransform();

		if (ct && mat.useColorTransform) {
			const data = this.setUWhenExist(BASIC_SHADER_U.COLOR_TRANSFORM, ct._rawData);

			// ColorTransfrom require mapping
			for (let i = 4; i < 8 && data; i++) {
				data[i] /= 0xff;
			}

		} else {
			this.setUWhenExist(BASIC_SHADER_U.COLOR_TRANSFORM, null);
		}

	}

	public _activate(): void {
		this._shader._activate();
		this._texture.activate();
	}

	public _deactivate(): void {
		this._shader._deactivate();
	}
	/*
	public _includeDependencies(shader: IShaderBase): void {
		shader.alphaThreshold = (<MaterialBase> this._renderMaterial.material).alphaThreshold;
		shader.useImageRect = (<MaterialBase> this._renderMaterial.material).imageRect;
		shader.usesCurves = (<MaterialBase> this._renderMaterial.material).curves;
		shader.useBothSides = (<MaterialBase> this._renderMaterial.material).bothSides;
		shader.usesUVTransform = (<MaterialBase> this._renderMaterial.material).animateUVs;
		shader.usesColorTransform = (<MaterialBase> this._renderMaterial.material).useColorTransform;

		if (this._forceSeparateMVP)
			this._shader.globalPosDependencies++;
	}
	*/

	public _initConstantData(): void {

	}

	public syncUniforms() {
		const prog = <ProgramWebGL> this._shader.programData.program;
		const focusChanged = this._lastProgFocusId !== prog.focusId;

		const vertUniforms = this._vertVariant.uniforms;
		const fragUniforms = this._fragVariant.uniforms;

		for (const key in vertUniforms) {
			const u = vertUniforms[key];

			if (!u.ignoreForUpload && (u.wasChanged || focusChanged)) {
				prog.uploadUniform(key, u.data);
			}
		}

		for (const key in fragUniforms) {
			const u = fragUniforms[key];

			if (!u.ignoreForUpload && (u.wasChanged || focusChanged)) {
				prog.uploadUniform(key, u.data);
			}
		}

		this._lastProgFocusId = prog.focusId;
	}

	private setUWhenExist (name: string, data: any = null, clone = true): number[] | Float32Array {
		const fu = this._fragVariant.uniforms[name];
		const vu = this._vertVariant.uniforms[name];

		if (fu) {
			(data) ? fu.set(data, clone) : fu.reset();
			return fu.data;
		}

		if (vu) {
			(data) ? vu.set(data, clone) : vu.reset();
			return vu.data;
		}

		return null;
	}
}