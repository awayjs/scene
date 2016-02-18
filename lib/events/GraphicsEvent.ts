import EventBase				= require("awayjs-core/lib/events/EventBase");

import Graphic					= require("awayjs-display/lib/graphics/Graphic");


/**
* Dispatched to notify changes in a geometry object's state.
*
* @class away.events.GraphicsEvent
* @see away3d.core.base.Graphics
*/
class GraphicsEvent extends EventBase
{
	/**
	 *
	 */
	public static BOUNDS_INVALID:string = "boundsInvalid";

	/**
	 * Clones the event.
	 * @return An exact duplicate of the current object.
	 */
	public clone():GraphicsEvent
	{
		return new GraphicsEvent(this.type);
	}
}

export = GraphicsEvent;