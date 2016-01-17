import EventBase				= require("awayjs-core/lib/events/EventBase");

import SubGeometryBase			= require("awayjs-display/lib/base/SubGeometryBase");


/**
* Dispatched to notify changes in a geometry object's state.
*
* @class away.events.TextureEvent
* @see away3d.core.base.Geometry
*/
class TextureEvent extends EventBase
{
	/**
	 * Dispatched when a TriangleSubGeometry was added to the dispatching Geometry.
	 */
	public static SUB_GEOMETRY_ADDED:string = "subGeometryAdded";

	/**
	 * Dispatched when a TriangleSubGeometry was removed from the dispatching Geometry.
	 */
	public static SUB_GEOMETRY_REMOVED:string = "subGeometryRemoved";

	/**
	 *
	 */
	public static BOUNDS_INVALID:string = "boundsInvalid";

	private _subGeometry:SubGeometryBase;

	/**
	 * Create a new TextureEvent
	 * @param type The event type.
	 * @param subGeometry An optional TriangleSubGeometry object that is the subject of this event.
	 */
	constructor(type:string, subGeometry:SubGeometryBase = null)
	{
		super(type);

		this._subGeometry = subGeometry;
	}

	/**
	 * The TriangleSubGeometry object that is the subject of this event, if appropriate.
	 */
	public get subGeometry():SubGeometryBase
	{
		return this._subGeometry;
	}

	/**
	 * Clones the event.
	 * @return An exact duplicate of the current object.
	 */
	public clone():TextureEvent
	{
		return new TextureEvent(this.type, this._subGeometry);
	}
}

export = TextureEvent;