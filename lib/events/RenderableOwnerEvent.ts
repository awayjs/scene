import EventBase					= require("awayjs-core/lib/events/EventBase");

import IRenderableOwner					= require("awayjs-display/lib/base/IRenderableOwner");

/**
 * Dispatched to notify changes in a sub geometry object's state.
 *
 * @class away.events.RenderableOwnerEvent
 * @see away.core.base.Geometry
 */
class RenderableOwnerEvent extends EventBase
{
	/**
	 * Dispatched when a Renderable owners's render object owner has been updated.
	 */
	public static INVALIDATE_RENDER_OWNER:string = "invalidateRenderableOwner";

	/**
	 *
	 */
	public static INVALIDATE_GEOMETRY:string = "invalidateGeometry";

	private _renderableOwner:IRenderableOwner;

	/**
	 * Create a new GeometryEvent
	 * @param type The event type.
	 * @param dataType An optional data type of the vertex data being updated.
	 */
	constructor(type:string, renderableOwner:IRenderableOwner)
	{
		super(type);

		this._renderableOwner = renderableOwner;
	}

	/**
	 * The renderobject owner of the renderable owner.
	 */
	public get renderableOwner():IRenderableOwner
	{
		return this._renderableOwner;
	}

	/**
	 * Clones the event.
	 *
	 * @return An exact duplicate of the current object.
	 */
	public clone():RenderableOwnerEvent
	{
		return new RenderableOwnerEvent(this.type, this._renderableOwner);
	}
}

export = RenderableOwnerEvent;