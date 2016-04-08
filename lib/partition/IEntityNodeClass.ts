import IEntity						from "awayjs-display/lib/display/IEntity";
import EntityNode					from "awayjs-display/lib/partition/EntityNode";
import PartitionBase				from "awayjs-display/lib/partition/PartitionBase";

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
	new(entity:IEntity, pool:PartitionBase):EntityNode;
}

export default IEntityNodeClass;