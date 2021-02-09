import { TriangleElements } from '@awayjs/graphics';

/**
 * @class away.base.TriangleElements
 */
export class SkyboxElements extends TriangleElements {
	public static assetType: string = '[asset SkyboxElements]';

	public get assetType(): string {
		return SkyboxElements.assetType;
	}
}

import { Stage, ContextGLDrawMode, ContextGLProgramType, IContextGL,
	ShaderRegisterCache, ShaderRegisterData, ShaderRegisterElement } from '@awayjs/stage';

import { RenderGroup } from '@awayjs/renderer';

import { Matrix3D, Vector3D } from '@awayjs/core';

import { _Stage_TriangleElements } from '@awayjs/graphics';

import { ShaderBase, _Render_RenderableBase, _Render_ElementsBase } from '@awayjs/renderer';

/**
 * @class away.pool.LineMaterialPool
 */
export class _Render_SkyboxElements extends _Render_ElementsBase {
	public _includeDependencies(shader: ShaderBase): void {
	}

	/**
     * @inheritDoc
     */
	public _getVertexCode(shader: ShaderBase, registerCache: ShaderRegisterCache,
		sharedRegisters: ShaderRegisterData): string {
		let code: string = '';

		//get the projection coordinates
		const position: ShaderRegisterElement =
			(shader.globalPosDependencies > 0) ?
				sharedRegisters.globalPositionVertex :
				sharedRegisters.animatedPosition;

		//reserving vertex constants for projection matrix
		const viewMatrixReg: ShaderRegisterElement = registerCache.getFreeVertexConstant();
		registerCache.getFreeVertexConstant();
		registerCache.getFreeVertexConstant();
		registerCache.getFreeVertexConstant();
		shader.viewMatrixIndex = viewMatrixReg.index * 4;

		const scenePosition: ShaderRegisterElement = registerCache.getFreeVertexConstant();
		shader.scenePositionIndex = scenePosition.index * 4;

		const skyboxScale: ShaderRegisterElement = registerCache.getFreeVertexConstant();

		const temp: ShaderRegisterElement = registerCache.getFreeVertexVectorTemp();

		code += 'mul ' + temp + ', ' + position + ', ' + skyboxScale + '\n' +
            'add ' + temp + ', ' + temp + ', ' + scenePosition + '\n';

		if (shader.projectionDependencies > 0) {
			sharedRegisters.projectionFragment = registerCache.getFreeVarying();
			code += 'm44 ' + temp + ', ' + temp + ', ' + viewMatrixReg + '\n' +
                'mov ' + sharedRegisters.projectionFragment + ', ' + temp + '\n' +
                'mov op, ' + temp + '\n';
		} else {
			code += 'm44 op, ' + temp + ', ' + viewMatrixReg + '\n';
		}

		return code;
	}

	public _getFragmentCode(shader: ShaderBase, registerCache: ShaderRegisterCache,
		sharedRegisters: ShaderRegisterData): string {
		return '';
	}
}

/**
 *
 * @class away.pool._Stage_SkyboxElements
 */
export class _Stage_SkyboxElements extends _Stage_TriangleElements {
	private _skyboxProjection: Matrix3D = new Matrix3D();

	public draw(renderable: _Render_RenderableBase, shader: ShaderBase, count: number, offset: number): void {
		let index: number = shader.scenePositionIndex;
		const camPos: Vector3D = shader.view.projection.transform.matrix3D.position;
		shader.vertexConstantData[index++] = 2 * camPos.x;
		shader.vertexConstantData[index++] = 2 * camPos.y;
		shader.vertexConstantData[index++] = 2 * camPos.z;
		shader.vertexConstantData[index++] = 1;
		shader.vertexConstantData[index++] = shader.vertexConstantData[index++] =
			shader.vertexConstantData[index++] = shader.view.projection.far / Math.sqrt(3);
		shader.vertexConstantData[index] = 1;

		const near: Vector3D = new Vector3D();

		this._skyboxProjection.copyFrom(shader.view.viewMatrix3D);
		this._skyboxProjection.copyRowTo(2, near);

		const cx: number = near.x;
		const cy: number = near.y;
		const cz: number = near.z;
		const cw: number =
			-(near.x * camPos.x + near.y * camPos.y + near.z * camPos.z + Math.sqrt(cx * cx + cy * cy + cz * cz));

		const signX: number = cx >= 0 ? 1 : -1;
		const signY: number = cy >= 0 ? 1 : -1;

		const p: Vector3D = new Vector3D(signX, signY, 1, 1);

		const inverse: Matrix3D = this._skyboxProjection.clone();
		inverse.invert();

		const q: Vector3D = inverse.transformVector(p);

		this._skyboxProjection.copyRowTo(3, p);

		const a: number = (q.x * p.x + q.y * p.y + q.z * p.z + q.w * p.w) / (cx * q.x + cy * q.y + cz * q.z + cw * q.w);

		this._skyboxProjection.copyRowFrom(2, new Vector3D(cx * a, cy * a, cz * a, cw * a));

		//set constants
		if (shader.sceneMatrixIndex >= 0)
			shader.sceneMatrix.copyFrom(renderable.renderSceneTransform, true);

		shader.viewMatrix.copyFrom(this._skyboxProjection, true);

		const context: IContextGL = this._stage.context;
		context.setProgramConstantsFromArray(ContextGLProgramType.VERTEX, shader.vertexConstantData);
		context.setProgramConstantsFromArray(ContextGLProgramType.FRAGMENT, shader.fragmentConstantData);

		if (this._indices)
			this.getIndexBufferGL().draw(ContextGLDrawMode.TRIANGLES, 0, this.numIndices);
		else
			this._stage.context.drawVertices(ContextGLDrawMode.TRIANGLES, offset, count || this.numVertices);
	}
}

RenderGroup.registerElements(_Render_SkyboxElements, SkyboxElements);
Stage.registerAbstraction(_Stage_SkyboxElements, SkyboxElements);
