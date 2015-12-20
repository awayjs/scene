import EventBase				= require("awayjs-core/lib/events/EventBase");

import IRenderOwner					= require("awayjs-display/lib/base/IRenderOwner");

class RenderOwnerEvent extends EventBase
{
	public static INVALIDATE_TEXTURE:string = "invalidateTexture";

	public static INVALIDATE_ANIMATION:string = "invalidateAnimation";

	public static INVALIDATE_PASSES:string = "invalidatePasses";

	private _renderOwner:IRenderOwner;


	/**
	 * Create a new GeometryEvent
	 * @param type The event type.
	 * @param dataType An optional data type of the vertex data being updated.
	 */
	constructor(type:string, renderOwner:IRenderOwner)
	{
		super(type);

		this._renderOwner = renderOwner;
	}

	/**
	 * The renderobject owner of the renderable owner.
	 */
	public get renderOwner():IRenderOwner
	{
		return this._renderOwner;
	}

	/**
	 * Clones the event.
	 *
	 * @return An exact duplicate of the current object.
	 */
	public clone():RenderOwnerEvent
	{
		return new RenderOwnerEvent(this.type, this._renderOwner);
	}
}

export = RenderOwnerEvent;