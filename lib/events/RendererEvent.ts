import EventBase				= require("awayjs-core/lib/events/EventBase");

class RendererEvent extends EventBase
{
	public static VIEWPORT_UPDATED:string = "viewportUpdated";
	public static SCISSOR_UPDATED:string = "scissorUpdated";

	constructor(type:string)
	{
		super(type);
	}
}

export = RendererEvent;