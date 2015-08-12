import IEntity						= require("awayjs-display/lib/entities/IEntity");
import EntityNode					= require("awayjs-display/lib/partition/EntityNode");
import PartitionBase				= require("awayjs-display/lib/partition/PartitionBase");
import EntityNodePool				= require("awayjs-display/lib/pool/EntityNodePool");

/**
 * IEntityNodeClass is an interface for the constructable class definition EntityNode that is used to
 * create node objects in the partition pipeline that represent the contents of a Entity
 *
 * @class away.pool.IEntityNodeClass
 */
interface IEntityNodeClass
{
	/**
	 *
	 */
	new(pool:EntityNodePool, entity:IEntity, partition:PartitionBase):EntityNode;
}

export = IEntityNodeClass;