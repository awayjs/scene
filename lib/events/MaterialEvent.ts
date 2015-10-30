import Event					= require("awayjs-core/lib/events/Event");

class MaterialEvent extends Event
{
	public static TEXTURE_CHANGED:string = "textureChanged";

	constructor(type:string)
	{
		super(type);
	}
}

export = MaterialEvent;