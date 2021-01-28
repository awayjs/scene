import { AssetEvent } from '@awayjs/core';
import { BasicMaterial, ImageTexture2D, TextureBase } from '@awayjs/materials';
import { RenderGroup, _Render_ElementsBase, _Render_MaterialBase } from '@awayjs/renderer';
import { BlendMode, ImageBase } from '@awayjs/stage';
import { _GLSLShader_ImageTexture2D } from './GLSLImageTexture';
import { GLSLPassBase } from './GLSLPassBase';
import { GLSLShaderBase } from './GLSLShaderBase';

export class BasicGLSLMaterial extends BasicMaterial {
	constructor(image?: ImageBase, alpha?: number);
	constructor(color?: number, alpha?: number);
	constructor(imageColor: any = null, alpha: number = 1) {
		super(imageColor, alpha);

		if (imageColor instanceof ImageBase)
			this.texture._images[0] = imageColor;
	}
}

/**
 * RenderMaterialObject forms an abstract base class for the default shaded materials provided by Stage,
 * using material methods to define their appearance.
 */
export class _Render_BasicGlslMaterial extends _Render_MaterialBase {
	protected _material: BasicGLSLMaterial;
	protected _texture: TextureBase;
	private _pass: GLSLPassBase;

	constructor(material: BasicGLSLMaterial, renderElements: _Render_ElementsBase) {
		super(material, renderElements);

		this._material = material;
		this._pass = new GLSLPassBase(this, renderElements);
		this._pAddPass(<any> this._pass);
	}

	public onClear(event: AssetEvent): void {
		super.onClear(event);

		this._material = null;
	}

	/**
     * @inheritDoc
     */
	public _pUpdateRender(): void {
		super._pUpdateRender();

		this.requiresBlending = (
			this._material.blendMode != BlendMode.NORMAL ||
			this._material.alphaBlending ||
			(this._material.colorTransform && this._material.colorTransform.alphaMultiplier < 1));
		this._pass.preserveAlpha = this._material.preserveAlpha;//this._pRequiresBlending;
		this._pass.shader.setBlendMode(
			(this._material.blendMode == BlendMode.NORMAL && this.requiresBlending)
				? BlendMode.LAYER
				: this._material.blendMode
		);

		//@ts-ignore
		this._updateImages();
		//this._pass.forceSeparateMVP = false;
	}

	public _updateAnimation() {
		//@ts-ignore
		if (this._invalidRender) {
			this._pUpdateRender();
		}
	}
}

RenderGroup.registerDefaultMaterial(_Render_BasicGlslMaterial, BasicGLSLMaterial);

GLSLShaderBase.registerAbstraction(_GLSLShader_ImageTexture2D, ImageTexture2D);