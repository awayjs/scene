import {AssetEvent, Matrix3D, ProjectionBase} from "@awayjs/core";

import {RenderStateBase, TextureStateBase, ShaderBase, MaterialStatePool} from "@awayjs/renderer";

import {BlendMode, ContextGLCompareMode, ShaderRegisterCache, ShaderRegisterData} from "@awayjs/stage";

import {GL_MaterialPassBase} from "@awayjs/materials";

import {Skybox} from "../display/Skybox";


/**
 * GL_SkyboxMaterial forms an abstract base class for the default shaded materials provided by Stage,
 * using material methods to define their appearance.
 */
export class GL_SkyboxMaterial extends GL_MaterialPassBase
{
	public _skybox:Skybox;
	public _texture:TextureStateBase;

	constructor(skybox:Skybox, materialStatePool:MaterialStatePool)
	{
		super(skybox, materialStatePool);

		this._skybox = skybox;

		this._shader = new ShaderBase(materialStatePool, this, this, this._stage);

		this._texture = <TextureStateBase> this._shader.getAbstraction(this._skybox.texture);

		this._pAddPass(this);
	}

	public onClear(event:AssetEvent):void
	{
		super.onClear(event);

		this._texture.onClear(new AssetEvent(AssetEvent.CLEAR, this._skybox.texture));
		this._texture = null;

		this._skybox = null;
	}

	/**
	 * @inheritDoc
	 */
	public _pUpdateRender():void
	{
		super._pUpdateRender();

		this.requiresBlending = (this._material.blendMode != BlendMode.NORMAL);

		this.shader.setBlendMode((this._material.blendMode == BlendMode.NORMAL && this.requiresBlending)? BlendMode.LAYER : this._material.blendMode);
	}

	public _includeDependencies(shader:ShaderBase):void
	{
		super._includeDependencies(shader);

		shader.usesPositionFragment = true;
	}

	/**
	 * @inheritDoc
	 */
	public _getFragmentCode(registerCache:ShaderRegisterCache, sharedRegisters:ShaderRegisterData):string
	{
		return this._texture._getFragmentCode(sharedRegisters.shadedTarget, registerCache, sharedRegisters, sharedRegisters.positionVarying);
	}


	public _setRenderState(renderable:RenderStateBase, projection:ProjectionBase):void
	{
		super._setRenderState(renderable, projection);

		this._texture._setRenderState(renderable);
	}
	/**
	 * @inheritDoc
	 */
	public _activate(projection:ProjectionBase):void
	{
		super._activate(projection);

		this._stage.context.setDepthTest(false, ContextGLCompareMode.LESS);

		this._texture.activate();
	}
}