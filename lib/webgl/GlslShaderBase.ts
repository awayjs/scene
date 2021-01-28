import {
	AbstractionBase,
	ColorTransform,
	IAbstractionClass,
	IAbstractionPool,
	IAsset,
	IAssetClass,
	Matrix,
	Matrix3D,
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
	vertexConstantData: any;
	fragmentConstantData: any;
	viewMatrix: any;
	sceneMatrix: any;

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
	usesColorTransform: boolean;
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

	/**
	 *
	 *
	 * @param renderable
	 * @param stage
	 * @param camera
	 */
	public _setRenderState(renderState: _Render_RenderableBase): void {

		//const viewMatrixIndex = 8;
		const uvMatrixIndex = 0;
		const colorTransformIndex = 0;

		let rawData: Float32Array;

		if (this.usesUVTransform) {
			const uvMatrix: Matrix = renderState.uvMatrix;

			if (uvMatrix) {
				//transpose
				rawData = uvMatrix.rawData;
				this.vertexConstantData[uvMatrixIndex] = rawData[0];
				this.vertexConstantData[uvMatrixIndex + 1] = rawData[2];
				this.vertexConstantData[uvMatrixIndex + 3] = rawData[4];
				this.vertexConstantData[uvMatrixIndex + 4] = rawData[1];
				this.vertexConstantData[uvMatrixIndex + 5] = rawData[3];
				this.vertexConstantData[uvMatrixIndex + 7] = rawData[5];
			} else {
				this.vertexConstantData[uvMatrixIndex] = 1;
				this.vertexConstantData[uvMatrixIndex + 1] = 0;
				this.vertexConstantData[uvMatrixIndex + 3] = 0;
				this.vertexConstantData[uvMatrixIndex + 4] = 0;
				this.vertexConstantData[uvMatrixIndex + 5] = 1;
				this.vertexConstantData[uvMatrixIndex + 7] = 0;
			}
		}
		if (this.usesColorTransform) {

			const colorTransform: ColorTransform = renderState.sourceEntity._iAssignedColorTransform();

			if (colorTransform) {
				//TODO: AWDParser to write normalised color offsets
				rawData = colorTransform._rawData;
				this.fragmentConstantData[colorTransformIndex] = rawData[0];
				this.fragmentConstantData[colorTransformIndex + 1] = rawData[1];
				this.fragmentConstantData[colorTransformIndex + 2] = rawData[2];
				this.fragmentConstantData[colorTransformIndex + 3] = rawData[3];
				this.fragmentConstantData[colorTransformIndex + 4] = rawData[4] / 255;
				this.fragmentConstantData[colorTransformIndex + 5] = rawData[5] / 255;
				this.fragmentConstantData[colorTransformIndex + 6] = rawData[6] / 255;
				this.fragmentConstantData[colorTransformIndex + 7] = rawData[7] / 255;
			} else {
				this.fragmentConstantData[colorTransformIndex] = 1;
				this.fragmentConstantData[colorTransformIndex + 1] = 1;
				this.fragmentConstantData[colorTransformIndex + 2] = 1;
				this.fragmentConstantData[colorTransformIndex + 3] = 1;
				this.fragmentConstantData[colorTransformIndex + 4] = 0;
				this.fragmentConstantData[colorTransformIndex + 5] = 0;
				this.fragmentConstantData[colorTransformIndex + 6] = 0;
				this.fragmentConstantData[colorTransformIndex + 7] = 0;
			}
		}
	}

	/**
     * Initializes the unchanging constant data for this shader object.
     */
	protected _initConstantData(): void {

		//Updates the amount of used register indices.
		let usedVC = 0;
		let usedFC = 0;

		this.pass.vertUniforms.forEach(u => {
			if (u.type !== '1i') {
				usedVC += u.data.length;
			}
		});

		this.pass.fragUniforms.forEach(u => {
			if (u.type !== '1i') {
				usedFC += u.data.length;
			}
		});

		this.numUsedStreams = 0;
		this.numUsedTextures = this.pass.fragUniforms.filter((e) => e.type === '1i').length;

		if (!this.vertexConstantData || this.vertexConstantData.length !== usedVC)
			this.vertexConstantData = new Float32Array(usedVC);

		if (!this.fragmentConstantData || this.fragmentConstantData.length !== usedFC)
			this.fragmentConstantData = new Float32Array(usedFC);

		const viewMatrix = 8;
		const uvMatrix = 0;
		const colorTransform = 0;

		//Initialies viewMatrix
		if (viewMatrix >= 0) {

			const data = new Float32Array(this.vertexConstantData.buffer, viewMatrix * 4, 16);

			if (!this.viewMatrix) {
				this.viewMatrix = new Matrix3D(data);
			} else {
				this.viewMatrix._rawData = data;
			}

		} else if (this.viewMatrix) {
			this.viewMatrix = null;
		}

		//Initializes the default UV transformation matrix.
		if (uvMatrix >= 0) {
			this.vertexConstantData[uvMatrix] = 1;
			this.vertexConstantData[uvMatrix + 1] = 0;
			this.vertexConstantData[uvMatrix + 2] = 0;
			this.vertexConstantData[uvMatrix + 3] = 0;
			this.vertexConstantData[uvMatrix + 4] = 0;
			this.vertexConstantData[uvMatrix + 5] = 1;
			this.vertexConstantData[uvMatrix + 6] = 0;
			this.vertexConstantData[uvMatrix + 7] = 0;
		}

		//Initializes the default colorTransform.
		if (colorTransform >= 0) {
			this.fragmentConstantData[colorTransform] = 1;
			this.fragmentConstantData[colorTransform + 1] = 1;
			this.fragmentConstantData[colorTransform + 2] = 1;
			this.fragmentConstantData[colorTransform + 3] = 1;
			this.fragmentConstantData[colorTransform + 4] = 0;
			this.fragmentConstantData[colorTransform + 5] = 0;
			this.fragmentConstantData[colorTransform + 6] = 0;
			this.fragmentConstantData[colorTransform + 7] = 0;
		}

		// init constant data in pass
		this.pass._initConstantData();
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

		this._initConstantData();

		const frag = this.pass._getFragmentCode(null, null);
		const ver = this.pass._getVertexCode(null, null);

		const data = this.stage.getProgramData(frag, ver);

		if (data !== this._programData) {
			this._programData?.dispose();

			this._programData = data;
			this._programData.usages++;
		}
	}

}
