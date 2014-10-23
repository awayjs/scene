import Event					= require("awayjs-core/lib/events/Event");

import DisplayObject			= require("awayjs-display/lib/base/DisplayObject");

class SceneEvent extends Event
{
	/**
	 *
	 */
	public static ADDED_TO_SCENE:string = "addedToScene";

	/**
	 *
	 */
	public static REMOVED_FROM_SCENE:string = "removedFromScene";

	/**
	 *
	 */
	public static PARTITION_CHANGED:string = "partitionChanged";

	/**
	 *
	 */
	public displayObject:DisplayObject;

	constructor(type:string, displayObject:DisplayObject)
	{
		super(type);

		this.displayObject = displayObject;
	}
}

export = SceneEvent;