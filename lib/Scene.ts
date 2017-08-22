import {DisplayObject} from "./display/DisplayObject";
import {DisplayObjectContainer} from "./display/DisplayObjectContainer";

import {IView} from "./IView";

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
	public _iRegisterObject(displayObject:DisplayObject):void
	{
		this._objects[displayObject.id] = displayObject;

		var len:number = this._views.length;
		for (var i:number = 0; i < len; i++)
			this._views[i].registerObject(displayObject);
	}

	/**
	 * @internal
	 */
	public _iUnregisterObject(displayObject:DisplayObject):void
	{
		delete this._objects[displayObject.id];

		var len:number = this._views.length;
		for (var i:number = 0; i < len; i++)
			this._views[i].unRegisterObject(displayObject);
	}

	/**
	 * @internal
	 */
	public _iRegisterView(view:IView):void
	{
		this._views.push(view);

		for (var key in this._objects)
			view.registerObject(this._objects[key]);
	}

	/**
	 * @internal
	 */
	public _iUnregisterView(view:IView):void
	{
		this._views.splice(this._views.indexOf(view), 1);

		for (var key in this._objects)
			view.unRegisterObject(this._objects[key]);
	}
}