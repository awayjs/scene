import Event					= require("awayjs-core/lib/events/Event");

import DisplayObject			= require("awayjs-display/lib/base/DisplayObject");

class DisplayObjectEvent extends Event
{
	public static VISIBLITY_UPDATED:string = "visiblityUpdated";
	public static SCENETRANSFORM_CHANGED:string = "scenetransformChanged";
	public static SCENE_CHANGED:string = "sceneChanged";
	public static POSITION_CHANGED:string = "positionChanged";
	public static ROTATION_CHANGED:string = "rotationChanged";
	public static SKEW_CHANGED:string = "skewChanged";
	public static SCALE_CHANGED:string = "scaleChanged";

	/**
	 *
	 */
	public static PARTITION_CHANGED:string = "partitionChanged";

	public object:DisplayObject;

	constructor(type:string, object:DisplayObject)
	{
		super(type);
		this.object = object;
	}
}

export = DisplayObjectEvent;