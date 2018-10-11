import {IEntity, IView, PartitionBase, RenderableContainerNode} from "@awayjs/renderer";

import {DisplayObjectContainer} from "./display/DisplayObjectContainer";

export class Scene extends DisplayObjectContainer
{
	public static assetType:string = "[asset Scene]";


	/**
	 *
	 */
	public get assetType():string
	{
		return Scene.assetType;
	}

	constructor()
	{
		super();

		this.mouseEnabled = false;
	}
}

PartitionBase.registerAbstraction(RenderableContainerNode, Scene);