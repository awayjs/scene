import { AssetEvent } from '@awayjs/core';
import { BasicMaterial } from '@awayjs/materials';
import { RenderGroup, _Render_ElementsBase, _Render_MaterialBase } from '@awayjs/renderer';
import { BlendMode } from '@awayjs/stage';

export class BasicGlslMaterial extends BasicMaterial {

}

/**
 * RenderMaterialObject forms an abstract base class for the default shaded materials provided by Stage,
 * using material methods to define their appearance.
 */
export class _Render_BasicGlslMaterial extends _Render_MaterialBase {
	private _basicMaterial: BasicMaterial;
	private _pass: BasicMaterialPass;

	constructor(material: BasicMaterial, renderElements: _Render_ElementsBase) {
		super(material, renderElements);

		this._basicMaterial = material;

		this._pAddPass(this._pass = new BasicMaterialPass(this, renderElements));
	}

	public onClear(event: AssetEvent): void {
		super.onClear(event);

		this._basicMaterial = null;
	}

	/**
     * @inheritDoc
     */
	public _pUpdateRender(): void {
		super._pUpdateRender();

		this.requiresBlending = (
			this._basicMaterial.blendMode != BlendMode.NORMAL ||
			this._basicMaterial.alphaBlending ||
			(this._basicMaterial.colorTransform && this._basicMaterial.colorTransform.alphaMultiplier < 1));
		this._pass.preserveAlpha = this._basicMaterial.preserveAlpha;//this._pRequiresBlending;
		this._pass.shader.setBlendMode(
			(this._basicMaterial.blendMode == BlendMode.NORMAL && this.requiresBlending)
				? BlendMode.LAYER
				: this._basicMaterial.blendMode
		);
		//this._pass.forceSeparateMVP = false;
	}
}

RenderGroup.registerDefaultMaterial(_Render_BasicGlslMaterial, BasicGlslMaterial);