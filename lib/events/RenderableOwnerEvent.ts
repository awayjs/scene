import Event						= require("awayjs-core/lib/events/Event");

import IRenderOwner			= require("awayjs-display/lib/base/IRenderOwner");

/**
 * Dispatched to notify changes in a sub geometry object's state.
 *
 * @class away.events.RenderableOwnerEvent
 * @see away.core.base.Geometry
 */
class RenderableOwnerEvent extends Event
{
	/**
	 * Dispatched when a Renderable owners's render object owner has been updated.
	 */
	public static RENDER_OWNER_UPDATED:string = "renderOwnerUpdated";

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
	public clone():Event
	{
		return new RenderableOwnerEvent(this.type, this._renderOwner);
	}
}

export = RenderableOwnerEvent;