import EventBase					= require("awayjs-core/lib/events/EventBase");

import Style						= require("awayjs-display/lib/base/Style");

class StyleEvent extends EventBase
{
	private _style:Style;

	/**
	 *
	 */
	public static INVALIDATE_PROPERTIES:string = "invalidateProperties";

	public get style():Style
	{
		return this._style;
	}

	constructor(type:string, style:Style)
	{
		super(type);

		this._style = style;
	}

	/**
	 * Clones the event.
	 * @return An exact duplicate of the current object.
	 */
	public clone():StyleEvent
	{
		return new StyleEvent(this.type, this._style);
	}
}

export = StyleEvent;