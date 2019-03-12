import {DisplayObjectContainer} from "./display/DisplayObjectContainer";
import { PartitionBase, EntityNode } from '@awayjs/renderer';

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

PartitionBase.registerAbstraction(EntityNode, Scene);