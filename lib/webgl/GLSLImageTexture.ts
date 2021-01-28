
import { ImageSampler, ShaderRegisterCache, ShaderRegisterData, ShaderRegisterElement } from '@awayjs/stage';

import { _Render_RenderableBase } from '@awayjs/renderer';
import { _Shader_ImageTexture } from '@awayjs/materials';

/**
 *
 * @class away.pool.GL_SingleImageTexture
 */
export class _GLSLShader_ImageTexture2D extends _Shader_ImageTexture {

	protected _imageIndex = 0;
	protected _textureIndex = 0;

	public _getFragmentCode(
		_targetReg: ShaderRegisterElement,
		_regCache: ShaderRegisterCache,
		_sharedReg: ShaderRegisterData,
		_inputReg: ShaderRegisterElement): string {

		return '';
	}

	public activate(): void {
		super.activate();

		const sampler: ImageSampler = <ImageSampler> this._shader.renderMaterial.samplers[this._imageIndex];

		if (this._shader.useImageRect) {
			const index: number = this._samplerIndex;
			const data: Float32Array = this._shader.fragmentConstantData;
			if (!sampler.imageRect) {
				data[index] = 1;
				data[index + 1] = 1;
				data[index + 2] = 0;
				data[index + 3] = 0;
			} else {
				data[index] = sampler.imageRect.width;
				data[index + 1] = sampler.imageRect.height;
				data[index + 2] = sampler.imageRect.x;
				data[index + 3] = sampler.imageRect.y;

			}
		}
	}

	public _setRenderState(renderState: _Render_RenderableBase): void {
		super._setRenderState(renderState);

		const sampler: ImageSampler = renderState.samplers[this._imageIndex];

		if (this._shader.useImageRect && sampler) {
			const index: number = this._samplerIndex;
			const data: Float32Array = this._shader.fragmentConstantData;
			if (!sampler.imageRect) {
				data[index] = 1;
				data[index + 1] = 1;
				data[index + 2] = 0;
				data[index + 3] = 0;
			} else {
				data[index] = sampler.imageRect.width;
				data[index + 1] = sampler.imageRect.height;
				data[index + 2] = sampler.imageRect.x;
				data[index + 3] = sampler.imageRect.y;
			}
		}
	}
}