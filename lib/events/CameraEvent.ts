import EventBase				= require("awayjs-core/lib/events/EventBase");

import Camera					= require("awayjs-display/lib/entities/Camera");

/**
 * @class away.events.CameraEvent
 */
class CameraEvent extends EventBase
{
	public static PROJECTION_CHANGED:string = "projectionChanged";

	private _camera:Camera;

	constructor(type:string, camera:Camera)
	{
		super(type);

		this._camera = camera;
	}

	public get camera():Camera
	{
		return this._camera;
	}

	/**
	 * Clones the event.
	 * @return An exact duplicate of the current object.
	 */
	public clone():CameraEvent
	{
		return new CameraEvent(this.type, this._camera);
	}
}

export = CameraEvent;