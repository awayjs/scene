import { EventDispatcher } from '@awayjs/core';
import {
	IPass,
	PassEvent,
	_Render_ElementsBase,
	_Render_RenderableBase,
} from '@awayjs/renderer';

import {
	ShaderRegisterCache,
	ShaderRegisterData,
	Stage,
} from '@awayjs/stage';

import { _Render_BasicGlslMaterial } from './BasicGlslMaterial';
import { _GLSLShader_ImageTexture2D } from './GLSLImageTexture';
import { GLSLShaderBase } from './GLSLShaderBase';

const FRAG = `
precision highp float;

uniform vec4 fc[2];
vec4 ft0;
varying vec4 vi0;
uniform sampler2D fs0;

void main() {
    ft0 = vec4(texture2D(fs0, vec2(vi0)).xyzw);

	ft0.xyz = vec3(ft0.xyz / ft0.www);
    ft0 = vec4(ft0 * fc[0]);
    ft0 = vec4(ft0 + fc[1]);
	ft0.xyz = vec3(ft0.xyz * ft0.www);

    gl_FragColor = vec4(ft0);
}
`;

const VERT = `
precision highp float;

uniform float yflip;
uniform vec4 vc[6];
vec4 vt0;
attribute vec4 va0;
attribute vec4 va1;
varying vec4 vi0;
vec4 outpos;

void main() {
    vt0 = vec4(va0);
    vi0.x = dot(vec4(va1), vec4(vc[0]));
    vi0.y = dot(vec4(va1), vec4(vc[1]));
    vi0.zw = va1.ww;

	outpos.x = dot(vec4(vt0), vec4(vc[2]));
    outpos.y = dot(vec4(vt0), vec4(vc[3]));
    outpos.z = dot(vec4(vt0), vec4(vc[4]));
	outpos.w = dot(vec4(vt0), vec4(vc[5]));

    gl_Position = vec4(outpos.x, outpos.y, outpos.z*2.0 - outpos.w, outpos.w);
}
`;

export interface IUniform {
	type: '1i' | '4f' | '4f' | '3f' | '2f' | '1f',
	vector?: boolean;
	name: string;
	data: number[] | Float32Array,
	_location?: WebGLUniformLocation
}

export class GLSLPassBase extends EventDispatcher implements IPass {
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
			name: 'fc', type: '4f', data: new Float32Array(4 * 2), vector: true
		},
		{
			name: 'fs0', type: '1i', data:[0],
		}
	];

	private _vertUniforms: IUniform[] = [
		{
			name: 'vc', type: '4f', data: new Float32Array(4 * 6), vector: true
		},
	]

	get fragUniforms() {
		return this._fragUniforms;
	}

	get vertUniforms() {
		return this._vertUniforms;
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

	_getVertexCode(_registerCache: ShaderRegisterCache, _sharedRegisters: ShaderRegisterData): string {
		return VERT;
	}

	_getFragmentCode(_registerCache: ShaderRegisterCache, _sharedRegisters: ShaderRegisterData): string {
		return FRAG;
	}

	_getPostAnimationFragmentCode(_registerCache: ShaderRegisterCache, _sharedRegisters: ShaderRegisterData): string {
		throw new Error('Method not implemented.');
	}

	_getNormalVertexCode(_registerCache: ShaderRegisterCache, _sharedRegisters: ShaderRegisterData): string {
		throw new Error('Method not implemented.');
	}

	_getNormalFragmentCode(_registerCache: ShaderRegisterCache, _sharedRegisters: ShaderRegisterData): string {
		throw new Error('Method not implemented.');
	}

	_includeDependencies(_shader: any): void {
		throw new Error('Method not implemented.');
	}

	/**
	 * Marks the shader program as invalid, so it will be recompiled before the next render.
	 */
	public invalidate(): void {
		this._shader.invalidateProgram();

		const texture = this._renderMaterial.material.getTextureAt(0);
		this._texture = texture ? texture.getAbstraction<_GLSLShader_ImageTexture2D>(this._shader) : null;

		this.dispatchEvent(new PassEvent(PassEvent.INVALIDATE, this));
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

	/**
	 * Renders the current pass. Before calling pass, activatePass needs to be called with the same index.
	 * @param pass The pass used to render the renderable.
	 * @param renderable The IRenderable object to draw.
	 * @param stage The Stage object used for rendering.
	 * @param entityCollector The EntityCollector object that contains the visible scene data.
	 * @param viewProjection The view-projection matrix used to project to the screen. This is not the same as
	 * camera.viewProjection as it includes the scaling factors when rendering to textures.
	 *
	 * @internal
	 */
	public _setRenderState(renderState: _Render_RenderableBase): void {
		this._shader._setRenderState(renderState);
	}

	/**
	 * Sets the render state for the pass that is independent of the rendered object. This needs to be called before
	 * calling pass. Before activating a pass, the previously used pass needs to be deactivated.
	 * @param stage The Stage object which is currently used for rendering.
	 * @param camera The camera from which the scene is viewed.
	 * @private
	 */
	public _activate(): void {
		this._shader._activate();
		this._texture.activate();
	}

	/**
	 * Clears the render state for the pass. This needs to be called before activating another pass.
	 * @param stage The Stage used for rendering
	 *
	 * @private
	 */
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

}