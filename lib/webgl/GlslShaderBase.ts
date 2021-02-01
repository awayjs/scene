import {
	AbstractionBase,
	IAbstractionClass,
	IAbstractionPool,
	IAsset,
	IAssetClass,
} from '@awayjs/core';

import {
	_Render_MaterialBase,
	_Stage_ElementsBase,
	_Render_RenderableBase,
	_Render_ElementsBase,
} from '@awayjs/renderer';

import { IShaderBase } from '@awayjs/renderer';
import {
	Stage,
	ProgramData,
	ContextGLTriangleFace,
	ContextGLCompareMode,
	ContextGLBlendFactor,
	BlendMode,
	ProgramWebGL,
} from '@awayjs/stage';
import { View } from '@awayjs/view';
import { GLSLPassBase } from './GLSLPassBase';

export class GLSLShaderBase implements IAbstractionPool, IShaderBase  {

	private static _abstractionClassPool: Record<string, IAbstractionClass> = {};
	public readonly supportModernAPI = true;

	public viewMatrix: any;
	public sceneMatrix: any;

	/**
	 *
	 * @param imageObjectClass
	 */
	public static registerAbstraction(abstractionClass: IAbstractionClass, assetClass: IAssetClass): void {
		GLSLShaderBase._abstractionClassPool[assetClass.assetType] = abstractionClass;
	}

	id: number;

	renderElements: _Render_ElementsBase;
	stage: Stage;
	view: View;
	pass: GLSLPassBase;
	renderMaterial: _Render_MaterialBase;
	activeElements: _Stage_ElementsBase;
	usesPremultipliedAlpha: boolean;
	useBothSides: boolean;
	alphaThreshold: number;
	numUsedTextures: number;
	numUsedStreams: number;

	/**
	 * @deprecated NEED TO REFACT THIS!!
	 */
	readonly uvIndex: number = 1;

	private _invalidProgram: boolean = true;
	private _programData: ProgramData;
	public get programData(): ProgramData {
		if (this._invalidProgram) {
			this._updateProgram();
		}

		return this._programData;
	}

	public usesColorTransform: boolean = true;
	public usesUVTransform = true;
	public writeDepth = true;
	public depthCompareMode = ContextGLCompareMode.LESS_EQUAL;
	public usesBlending: boolean;

	private _blendFactorSource: ContextGLBlendFactor;
	private _blendFactorDest: ContextGLBlendFactor;

	constructor(
		renderElements: _Render_ElementsBase,
		renderMaterial: _Render_MaterialBase,
		pass: GLSLPassBase,
		stage: Stage
	) {
		this.id = AbstractionBase.ID_COUNT++;
		this.renderElements = renderElements;
		this.renderMaterial = renderMaterial;
		this.pass = pass;
		this.stage = stage;
		this.view = renderElements.renderGroup.view;
	}

	public reset(): void {
	}

	public setBlendMode(value: string): void {
		switch (value) {
			case BlendMode.NORMAL:
				this._blendFactorSource = ContextGLBlendFactor.ONE;
				this._blendFactorDest = ContextGLBlendFactor.ZERO;
				this.usesBlending = false;
				this.usesPremultipliedAlpha = false;
				break;

			case BlendMode.MULTIPLY:
				this._blendFactorSource = ContextGLBlendFactor.ZERO;
				this._blendFactorDest = ContextGLBlendFactor.SOURCE_COLOR;
				this.usesBlending = true;
				this.usesPremultipliedAlpha = true;
				break;

			case BlendMode.ADD:
				this._blendFactorSource = ContextGLBlendFactor.ONE;
				this._blendFactorDest = ContextGLBlendFactor.ONE;
				this.usesBlending = true;
				this.usesPremultipliedAlpha = true;
				break;

			case BlendMode.ALPHA:
				this._blendFactorSource = ContextGLBlendFactor.ZERO;
				this._blendFactorDest = ContextGLBlendFactor.SOURCE_ALPHA;
				this.usesBlending = true;
				this.usesPremultipliedAlpha = false;
				break;

			case BlendMode.LAYER:
			default:
				this._blendFactorSource = ContextGLBlendFactor.ONE;
				this._blendFactorDest = ContextGLBlendFactor.ONE_MINUS_SOURCE_ALPHA;
				this.usesBlending = true;
				this.usesPremultipliedAlpha = true;
		}
	}

	public _activate(): void {
		const stage = this.stage;

		if (!this._programData) {
			this._updateProgram();
		}

		const data = this._programData;

		if (!data.program) {
			const prog = <ProgramWebGL> stage.context.createProgram();

			prog.name = this.pass.name;
			prog.uploadRaw(data.fragmentString, data.vertexString);

			data.program = prog;
		}

		// redefine
		this.viewMatrix = this.pass.viewMatrix;

		//set program data
		stage.context.setProgram(data.program);
		stage.context.setCulling(ContextGLTriangleFace.NONE, this.view.projection.coordinateSystem);

		/*
		const pos = this.view.projection.transform.concatenatedMatrix3D.position;

		this.vertexConstantData[this.cameraPositionIndex] = pos.x;
		this.vertexConstantData[this.cameraPositionIndex + 1] = pos.y;
		this.vertexConstantData[this.cameraPositionIndex + 2] = pos.z;
		*/

		stage.context.setDepthTest((this.writeDepth && !this.usesBlending), this.depthCompareMode);

		stage.context.setBlendFactors(
			this._blendFactorSource,
			this._blendFactorDest
		);

		this.activeElements = null;
	}

	public _deactivate(): void {
		this.activeElements = null;
	}

	public _setRenderState(_renderState: _Render_RenderableBase): void {
	}

	public invalidateProgram() {
		this._invalidProgram = true;
	}

	public dispose(): void {
		this._programData.dispose();
		this._programData = null;
	}

	public requestAbstraction(asset: IAsset): IAbstractionClass {
		return GLSLShaderBase._abstractionClassPool[asset.assetType];
	}

	private _updateProgram() {
		this._invalidProgram = false;
		this.reset();

		this.pass.updateProgram();

		const frag = this.pass.fragmentCode;
		const ver = this.pass.vertexCode;

		const data = this.stage.getProgramData(frag, ver);

		if (data !== this._programData) {
			this._programData?.dispose();

			this._programData = data;
			this._programData.usages++;
		}
	}

	public syncUniforms() {
		this.pass.syncUniforms();
	}

}
