import RenderableListItem				= require("awayjs-display/lib/pool/RenderableListItem");

/**
 * @class away.pool.RenderableListItemPool
 */
class RenderableListItemPool
{
	private _pool:Array<RenderableListItem> = new Array<RenderableListItem>();
	private _index:number = 0;
	private _poolSize:number = 0;

	/**
	 *
	 */
	public getItem():RenderableListItem
	{
		var item:RenderableListItem;
		if (this._index == this._poolSize) {
			item = new RenderableListItem();
			this._pool[this._index++] = item;
			++this._poolSize;
		} else {
			item = this._pool[this._index++];
		}
		return item;
	}

	/**
	 *
	 */
	public freeAll()
	{
		var item:RenderableListItem;
		var len:number = this._pool.length;
		for (var i:number = 0; i < len; i++) {
			item = this._pool[i];
			item.renderable = null;
			item.next = null;
		}

		this._index = 0;
	}

	public dispose()
	{
		this._pool.length = 0;
	}
}

export = RenderableListItemPool;