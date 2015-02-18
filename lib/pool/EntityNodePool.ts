import IEntity						= require("awayjs-display/lib/entities/IEntity");
import EntityNode					= require("awayjs-display/lib/partition/EntityNode");
import Partition					= require("awayjs-display/lib/partition/Partition");
import IEntityNodeClass				= require("awayjs-display/lib/pool/IEntityNodeClass");

/**
 * @class away.pool.EntityNodePool
 */
class EntityNodePool
{
	private _entityNodePool:Object = new Object();
	private _entityNodeClass:IEntityNodeClass;
	private _partition:Partition;

	/**
	 * //TODO
	 *
	 * @param entityNodeClass
	 */
	constructor(entityNodeClass:IEntityNodeClass, partition:Partition)
	{
		this._entityNodeClass = entityNodeClass;
		this._partition = partition;
	}

	/**
	 * //TODO
	 *
	 * @param entity
	 * @returns EntityNode
	 */
	public getItem(entity:IEntity):EntityNode
	{
		return (this._entityNodePool[entity.id] || (this._entityNodePool[entity.id] = entity._iAddEntityNode(new this._entityNodeClass(this, entity, this._partition))));
	}

	/**
	 * //TODO
	 *
	 * @param entity
	 */
	public disposeItem(entity:IEntity):EntityNode
	{
		var entityNode:EntityNode = this._entityNodePool[entity.id];

		if (entityNode) {
			entity._iRemoveEntityNode(entityNode);

			this._entityNodePool[entity.id] = null;
		}

		return entityNode;
	}
}

export = EntityNodePool;