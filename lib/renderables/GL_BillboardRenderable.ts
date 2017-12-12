import {AssetEvent, Rectangle} from "@awayjs/core";

import {AttributesBuffer} from "@awayjs/stage";

import {IEntity, ITexture, MaterialUtils, ElementsStateBase, MaterialStateBase, RenderStateBase, RenderStatePool} from "@awayjs/renderer";

import {TriangleElements} from "@awayjs/graphics";

import {Billboard} from "../display/Billboard";

/**
 * @class away.pool.RenderableListItem
 */
export class GL_BillboardRenderable extends RenderStateBase
{
	private static _samplerElements:Object = new Object();

	/**
	 *
	 */
	private _billboard:Billboard;

	public _id:string;

	/**
	 * //TODO
	 *
	 * @param pool
	 * @param billboard
	 */
	constructor(billboard:Billboard, renderStatePool:RenderStatePool)
	{
		super(billboard, renderStatePool);

		this._billboard = billboard;
	}

	public onClear(event:AssetEvent):void
	{
		super.onClear(event);

		this._billboard = null;
	}

	/**
	 * //TODO
	 *
	 * @returns {away.base.TriangleElements}
	 */
	protected _getElements():ElementsStateBase
	{
		var texture:ITexture = this._billboard.material.getTextureAt(0);

		var width:number = this._billboard.billboardWidth;
		var height:number = this._billboard.billboardHeight;
		var billboardRect:Rectangle = this._billboard.billboardRect;

		var id:string = width.toString() + height.toString() + billboardRect.toString();

		this._id = id;

		var elements:TriangleElements = GL_BillboardRenderable._samplerElements[id];


		if (!elements) {
			elements = GL_BillboardRenderable._samplerElements[id] = new TriangleElements(new AttributesBuffer(11, 4));
			elements.autoDeriveNormals = false;
			elements.autoDeriveTangents = false;
			elements.setIndices(Array<number>(0, 1, 2, 0, 2, 3));
			elements.setPositions(Array<number>(-billboardRect.x, height-billboardRect.y, 0, width-billboardRect.x, height-billboardRect.y, 0, width-billboardRect.x, -billboardRect.y, 0, -billboardRect.x, -billboardRect.y, 0));
			elements.setNormals(Array<number>(1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0));
			elements.setTangents(Array<number>(0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1));
			elements.setUVs(Array<number>(0, 1, 1, 1, 1, 0, 0, 0));
		} else {
			elements.setPositions(Array<number>(-billboardRect.x, height-billboardRect.y, 0, width-billboardRect.x, height-billboardRect.y, 0, width-billboardRect.x, -billboardRect.y, 0, -billboardRect.x, -billboardRect.y, 0));
		}

		return <ElementsStateBase> this._stage.getAbstraction(elements);
	}

	protected _getMaterial():MaterialStateBase
	{
		return this._renderGroup.getMaterialStatePool(this.elementsGL.elements).getAbstraction(this._billboard.material || MaterialUtils.getDefaultColorMaterial());
	}

}