import EntityListItem				= require("awayjs-display/lib/pool/EntityListItem");

/**
 * @class away.pool.EntityListItemPool
 */
class EntityListItemPool
{
	private _pool:Array<EntityListItem>;
	private _index:number = 0;
	private _poolSize:number = 0;

	/**
	 *
	 */
	constructor()
	{
		this._pool = new Array<EntityListItem>();
	}

	/**
	 *
	 */
	public getItem():EntityListItem
	{
		var item:EntityListItem;
		if (this._index == this._poolSize) {
			item = new EntityListItem();
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
		var item:EntityListItem;
		var len:number = this._pool.length;
		for (var i:number = 0; i < len; i++) {
			item = this._pool[i];
			item.entity = null;
			item.next = null;
		}

		this._index = 0;
	}

	public dispose()
	{
		this._pool.length = 0;
	}
}

export = EntityListItemPool;