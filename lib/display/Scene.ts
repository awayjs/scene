import ITraverser					= require("awayjs-display/lib/ITraverser");
import DisplayObject				= require("awayjs-display/lib/display/DisplayObject");
import DisplayObjectContainer		= require("awayjs-display/lib/display/DisplayObjectContainer");
import BasicPartition				= require("awayjs-display/lib/partition/BasicPartition");
import PartitionBase				= require("awayjs-display/lib/partition/PartitionBase");

class Scene extends DisplayObjectContainer
{
	private _expandedPartitions:Array<PartitionBase> = new Array<PartitionBase>();
	private _partitions:Array<PartitionBase> = new Array<PartitionBase>();

	public _iCollectionMark = 0;

	constructor(partition:PartitionBase = null)
	{
		super();

		this.partition = partition || new BasicPartition();

		this._iIsRoot = true;
		this._pScene = this;
	}

	public traversePartitions(traverser:ITraverser)
	{
		var i:number = 0;
		var len:number = this._partitions.length;

		while (i < len)
			this._partitions[i++].traverse(traverser);
	}

	/**
	 * @internal
	 */
	public _iRegisterPartition(partition:PartitionBase)
	{
		this._expandedPartitions.push(partition);

		//ensure duplicates are not found in partitions array
		if (this._partitions.indexOf(partition) == -1)
			this._partitions.push(partition);
	}

	/**
	 * @internal
	 */
	public _iUnregisterPartition(partition:PartitionBase)
	{
		this._expandedPartitions.splice(this._expandedPartitions.indexOf(partition), 1);

		//if no more partition references found, remove from partitions array
		if (this._expandedPartitions.indexOf(partition) == -1)
			this._partitions.splice(this._partitions.indexOf(partition), 1);
	}
}

export = Scene;