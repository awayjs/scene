import {DisplayObject} from "./display/DisplayObject";
import {DisplayObjectContainer} from "./display/DisplayObjectContainer";

import {IView} from "./IView";

export class Scene extends DisplayObjectContainer
{
	public static assetType:string = "[asset Scene]";

	private _objects:Array<DisplayObject> = new Array<DisplayObject>();
	private _views:Array<IView> = new Array<IView>();
	public _iCollectionMark = 0;

	public get objects():Array<DisplayObject>
	{
		return this._objects;
	}


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
		this._objects.push(displayObject);

		var len:number = this._views.length;
		for (var i:number = 0; i < len; i++)
			this._views[i].registerObject(displayObject);
	}

	/**
	 * @internal
	 */
	public _iUnregisterObject(displayObject:DisplayObject):void
	{
		this._objects.splice(this._objects.indexOf(displayObject), 1);

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

		var len:number = this._objects.length;
		for (var i:number = 0; i < len; i++)
			view.registerObject(this._objects[i]);
	}

	/**
	 * @internal
	 */
	public _iUnregisterView(view:IView):void
	{
		this._views.splice(this._views.indexOf(view), 1);

		var len:number = this._objects.length;
		for (var i:number = 0; i < len; i++)
			view.unRegisterObject(this._objects[i]);
	}
}