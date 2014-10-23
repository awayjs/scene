import IEntity						= require("awayjs-display/lib/entities/IEntity");

/**
 * @class away.pool.EntityListItem
 */
class EntityListItem
{
	/**
	 *
	 */
	public entity:IEntity;

	/**
	 *
	 */
	public next:EntityListItem;
}

export = EntityListItem;