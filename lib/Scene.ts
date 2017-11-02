import {IEntity, IView} from "@awayjs/graphics";

import {DisplayObjectContainer} from "./display/DisplayObjectContainer";

export class Scene extends DisplayObjectContainer
{
	public static assetType:string = "[asset Scene]";

	private _objects:Object = new Object();
	private _views:Array<IView> = new Array<IView>();
	public _iCollectionMark = 0;


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
		this._iIsRoot = true;
		this._iIsPartition = true;

		this._pScene = this;
		this._pPartition = this;
	}

	/**
	 * @internal
	 */
	public _invalidateEntity(entity:IEntity):void
	{
		this._objects[entity.id] = entity;

		var len:number = this._views.length;
		for (var i:number = 0; i < len; i++)
			this._views[i].invalidateEntity(entity);
	}

	/**
	 * @internal
	 */
	public _clearEntity(entity:IEntity):void
	{
		delete this._objects[entity.id];

		var len:number = this._views.length;
		for (var i:number = 0; i < len; i++)
			this._views[i].clearEntity(entity);
	}

	/**
	 * @internal
	 */
	public _addView(view:IView):void
	{
		this._views.push(view);

		for (var key in this._objects)
			view.invalidateEntity(this._objects[key]);
	}

	/**
	 * @internal
	 */
	public _removeView(view:IView):void
	{
		this._views.splice(this._views.indexOf(view), 1);

		for (var key in this._objects)
			view.clearEntity(this._objects[key]);
	}
}