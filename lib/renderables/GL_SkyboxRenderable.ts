import {AttributesBuffer} from "@awayjs/stage";

import {IEntity, MaterialStateBase, ShaderBase, RenderStateBase, RenderStatePool, ElementsStateBase} from "@awayjs/renderer";

import {TriangleElements} from "@awayjs/graphics";

import {Skybox} from "../display/Skybox";
import {SkyboxElements} from "../elements/SkyboxElements";

/**
 * @class away.pool.GL_SkyboxRenderable
 */
export class GL_SkyboxRenderable extends RenderStateBase
{
	/**
	 *
	 */
	private static _elements:SkyboxElements;

	/**
	 *
	 */
	private _skybox:Skybox;

	/**
	 * //TODO
	 *
	 * @param pool
	 * @param skybox
	 */
	constructor(skybox:Skybox, renderStatePool:RenderStatePool)
	{
		super(skybox, renderStatePool);

		this._skybox = skybox;
	}

	/**
	 * //TODO
	 *
	 * @returns {away.base.TriangleElements}
	 * @private
	 */
	protected _getElements():ElementsStateBase
{
		var elements:SkyboxElements = GL_SkyboxRenderable._elements;

		if (!elements) {
			elements = new SkyboxElements(new AttributesBuffer(11, 4));
			elements.autoDeriveNormals = false;
			elements.autoDeriveTangents = false;
			elements.setIndices(Array<number>(0, 1, 2, 2, 3, 0, 6, 5, 4, 4, 7, 6, 2, 6, 7, 7, 3, 2, 4, 5, 1, 1, 0, 4, 4, 0, 3, 3, 7, 4, 2, 1, 5, 5, 6, 2));
			elements.setPositions(Array<number>(-1, 1, -1, 1, 1, -1, 1, 1, 1, -1, 1, 1, -1, -1, -1, 1, -1, -1, 1, -1, 1, -1, -1, 1));
		}

		return <ElementsStateBase> this._stage.getAbstraction(elements);
	}

	protected _getMaterial():MaterialStateBase
	{
		return this._renderGroup.getMaterialStatePool(this.elementsGL.elements).getAbstraction(this._skybox);
	}

	public static _includeDependencies(shader:ShaderBase):void
	{

	}
}