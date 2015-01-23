import Event						= require("awayjs-core/lib/events/Event");

import IRenderObjectOwner			= require("awayjs-display/lib/base/IRenderObjectOwner");

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
	public static RENDER_OBJECT_OWNER_UPDATED:string = "renderObjectOwnerUpdated";

	private _renderObjectOwner:IRenderObjectOwner;

	/**
	 * Create a new GeometryEvent
	 * @param type The event type.
	 * @param dataType An optional data type of the vertex data being updated.
	 */
	constructor(type:string, renderObjectOwner:IRenderObjectOwner)
	{
		super(type);

		this._renderObjectOwner = renderObjectOwner;
	}

	/**
	 * The renderobject owner of the renderable owner.
	 */
	public get renderObjectOwner():IRenderObjectOwner
	{
		return this._renderObjectOwner;
	}

	/**
	 * Clones the event.
	 *
	 * @return An exact duplicate of the current object.
	 */
	public clone():Event
	{
		return new RenderableOwnerEvent(this.type, this._renderObjectOwner);
	}
}

export = RenderableOwnerEvent;